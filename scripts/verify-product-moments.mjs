import { spawn } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9226;
const profile = mkdtempSync(join(tmpdir(), "asyyl-moments-"));
const chromeProcess = spawn(chrome, [
  "--headless=new",
  "--disable-gpu",
  `--remote-debugging-port=${port}`,
  `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: "ignore" });

async function waitForEndpoint() {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/list`);
      if (response.ok) return response.json();
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error("Chrome DevTools endpoint did not start");
}

const pages = await waitForEndpoint();
const page = pages.find((entry) => entry.type === "page");
if (!page) throw new Error("No Chrome page target found");

const socket = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

let nextId = 0;
const pending = new Map();
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  const waiter = pending.get(message.id);
  if (!waiter) return;
  pending.delete(message.id);
  if (message.error) waiter.reject(new Error(message.error.message));
  else waiter.resolve(message.result);
});

function command(method, params = {}) {
  const id = ++nextId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

async function evaluate(expression, awaitPromise = false) {
  const result = await command("Runtime.evaluate", { expression, awaitPromise, returnByValue: true });
  return result.result.value;
}

async function navigate(path, motion = "no-preference") {
  await command("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: motion }],
  });
  await command("Page.navigate", { url: `http://localhost:4000${path}` });
  await new Promise((resolve) => setTimeout(resolve, 800));
}

async function verify(path, selector, expected, wait) {
  await navigate(path);
  await evaluate(`document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({ block: "center" })`);
  await new Promise((resolve) => setTimeout(resolve, wait));
  const animated = await evaluate(`document.querySelector(${JSON.stringify(selector)})?.textContent ?? ""`);
  if (!animated.includes(expected)) throw new Error(`${path} animation did not finish: ${animated}`);

  await navigate(path, "reduce");
  const reduced = await evaluate(`document.querySelector(${JSON.stringify(selector)})?.textContent ?? ""`);
  if (!reduced.includes(expected)) throw new Error(`${path} reduced-motion state is incomplete: ${reduced}`);
}

try {
  await command("Page.enable");
  await command("Emulation.setDeviceMetricsOverride", {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await verify("/sms/", '[data-signature="typed-search"]', "Habibu", 900);
  await verify("/bms/", '[data-signature="ledger-count"]', "Difference ₦0.00", 1600);
  const heroMetrics = await evaluate(`(() => {
    const grid = document.querySelector("main > section > div");
    const copy = grid?.firstElementChild;
    const visual = grid?.lastElementChild;
    return {
      copyHeight: copy?.getBoundingClientRect().height,
      visualTop: visual?.getBoundingClientRect().top,
    };
  })()`);
  console.log("Verified SMS typing and BMS ledger signatures in normal and reduced motion.");
  console.log(`BMS mobile hero metrics: ${JSON.stringify(heroMetrics)}`);
  await command("Browser.close");
} finally {
  socket.close();
  chromeProcess.kill();
  await new Promise((resolve) => setTimeout(resolve, 250));
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
}
