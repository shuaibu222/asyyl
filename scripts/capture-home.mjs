import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9225;
const profile = mkdtempSync(join(tmpdir(), "asyyl-capture-"));
const process = spawn(chrome, [
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

async function capture({ width, height, deviceScaleFactor, mobile, path }) {
  await command("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor,
    mobile,
  });
  await command("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await command("Page.navigate", { url: "http://localhost:4000/" });
  await new Promise((resolve) => setTimeout(resolve, 1000));
  await evaluate("document.fonts.ready", true);
  const layout = await evaluate(`({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight
  })`);
  if (layout.innerWidth !== width || layout.scrollWidth > layout.innerWidth) {
    throw new Error(`Invalid ${width}px layout: ${JSON.stringify(layout)}`);
  }
  await evaluate(`new Promise((resolve) => {
    let y = 0;
    const step = () => {
      y += 700;
      window.scrollTo(0, y);
      if (y < document.documentElement.scrollHeight) setTimeout(step, 40);
      else {
        window.scrollTo(0, 0);
        setTimeout(resolve, 250);
      }
    };
    step();
  })`, true);
  const screenshot = await command("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    fromSurface: true,
    clip: { x: 0, y: 0, width, height: layout.scrollHeight, scale: 1 },
  });
  writeFileSync(path, Buffer.from(screenshot.data, "base64"));
}

try {
  await command("Page.enable");
  await capture({ width: 375, height: 812, deviceScaleFactor: 2, mobile: true, path: "docs/review/home-375.png" });
  await capture({ width: 1440, height: 900, deviceScaleFactor: 1, mobile: false, path: "docs/review/home-1440.png" });
  await command("Browser.close");
} finally {
  socket.close();
  process.kill();
  await new Promise((resolve) => setTimeout(resolve, 250));
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
}
