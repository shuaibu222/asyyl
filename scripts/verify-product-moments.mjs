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
const consoleIssues = [];
socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.method === "Runtime.consoleAPICalled" && ["error", "warning", "assert"].includes(message.params.type)) {
    consoleIssues.push(message.params.args.map((argument) => argument.value ?? argument.description ?? argument.type).join(" "));
  }
  if (message.method === "Runtime.exceptionThrown") {
    consoleIssues.push(message.params.exceptionDetails.exception?.description ?? message.params.exceptionDetails.text);
  }
  if (message.method === "Log.entryAdded" && ["error", "warning"].includes(message.params.entry.level)) {
    consoleIssues.push(message.params.entry.text);
  }
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
  consoleIssues.length = 0;
  await command("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: motion }],
  });
  await command("Page.navigate", { url: `http://localhost:4000${path}` });
  await new Promise((resolve) => setTimeout(resolve, 800));
}

function assertConsoleClean(path, motion) {
  if (consoleIssues.length > 0) {
    throw new Error(`${path} (${motion}) emitted console errors: ${consoleIssues.join(" | ")}`);
  }
}

async function verify(path, selector, validate, wait) {
  await navigate(path);
  await evaluate(`document.querySelector(${JSON.stringify(selector)})?.scrollIntoView({ block: "center" })`);
  await new Promise((resolve) => setTimeout(resolve, wait));
  await validate(`${path} animation`);
  assertConsoleClean(path, "normal");

  await navigate(path, "reduce");
  await validate(`${path} reduced-motion state`);
  assertConsoleClean(path, "reduced");
}

try {
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Log.enable");
  await command("Emulation.setDeviceMetricsOverride", {
    width: 375,
    height: 812,
    deviceScaleFactor: 2,
    mobile: true,
  });
  await verify("/sms/", '[data-signature="typed-search"]', async (label) => {
    const value = await evaluate('document.querySelector(\'[data-signature="typed-search"] span[aria-hidden="true"]\')?.textContent ?? ""');
    if (value !== "Habibu") throw new Error(`${label} did not finish: ${value}`);
  }, 900);
  await verify("/bms/", '[data-signature="ledger-count"]', async (label) => {
    const lines = await evaluate(`Array.from(document.querySelectorAll('[data-signature="ledger-count"] p'), (line) => line.textContent?.trim() ?? "")`);
    const expected = ["₦427,763,462.00 Dr", "₦427,763,462.00 Cr", "Difference ₦0.00"];
    if (JSON.stringify(lines) !== JSON.stringify(expected)) {
      throw new Error(`${label} is not exact: ${JSON.stringify(lines)}`);
    }
  }, 1600);

  for (const path of ["/", "/sms/", "/bms/", "/services/", "/contact/"]) {
    for (const motion of ["no-preference", "reduce"]) {
      await navigate(path, motion);
      assertConsoleClean(path, motion === "reduce" ? "reduced" : "normal");
    }
  }
  console.log("Verified exact SMS and BMS signatures in normal and reduced motion.");
  console.log("Verified a clean console on all five routes in normal and reduced-motion modes.");
  await command("Browser.close");
} finally {
  socket.close();
  chromeProcess.kill();
  await new Promise((resolve) => setTimeout(resolve, 250));
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
}
