import { spawn } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const routes = [
  { name: "home", path: "/" },
  { name: "sms", path: "/sms/" },
  { name: "bms", path: "/bms/" },
  { name: "services", path: "/services/" },
  { name: "contact", path: "/contact/" },
];
const viewports = [
  { name: "375", width: 375, height: 812, deviceScaleFactor: 2, mobile: true },
  { name: "1440", width: 1440, height: 900, deviceScaleFactor: 1, mobile: false },
];
const chrome = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = 9227;
const profile = mkdtempSync(join(tmpdir(), "asyyl-review-"));
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
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
  return result.result.value;
}

async function key(key, code, windowsVirtualKeyCode, modifiers = 0) {
  const text = key === "Enter" ? "\r" : undefined;
  await command("Input.dispatchKeyEvent", { type: text ? "keyDown" : "rawKeyDown", key, code, windowsVirtualKeyCode, modifiers, text });
  await command("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode, modifiers });
}

async function verifyMobileMenu() {
  await command("Page.navigate", { url: "http://localhost:4000/" });
  await new Promise((resolve) => setTimeout(resolve, 1200));
  await evaluate("document.activeElement?.blur()");

  let tabs = 0;
  while (tabs < 8) {
    await key("Tab", "Tab", 9);
    tabs += 1;
    const isToggle = await evaluate('document.activeElement?.getAttribute("aria-controls") === "mobile-navigation"');
    if (isToggle) break;
  }
  const toggleReached = await evaluate('document.activeElement?.getAttribute("aria-controls") === "mobile-navigation"');
  if (!toggleReached) throw new Error("Keyboard could not reach the mobile menu toggle");

  await key("Enter", "Enter", 13);
  await new Promise((resolve) => setTimeout(resolve, 100));
  const openState = await evaluate(`(() => {
    const toggle = document.querySelector('[aria-controls="mobile-navigation"]');
    const header = document.querySelector("header");
    return {
      expanded: toggle?.getAttribute("aria-expanded"),
      label: toggle?.getAttribute("aria-label"),
      tone: header?.getAttribute("data-tone"),
      overflow: document.body.style.overflow,
    };
  })()`);
  if (openState.expanded !== "true" || openState.tone !== "dark" || openState.overflow !== "hidden") {
    throw new Error(`Invalid open menu state: ${JSON.stringify(openState)}`);
  }

  let menuTabs = 0;
  let onLastItem = false;
  while (menuTabs < 8 && !onLastItem) {
    await key("Tab", "Tab", 9);
    menuTabs += 1;
    onLastItem = await evaluate('document.activeElement?.getAttribute("href")?.startsWith("https://wa.me/") ?? false');
  }
  if (!onLastItem) throw new Error("Keyboard could not reach the last mobile link");
  await key("Tab", "Tab", 9);
  const forwardTabWrapped = await evaluate('document.activeElement?.getAttribute("aria-controls") === "mobile-navigation"');
  if (!forwardTabWrapped) {
    const focus = await evaluate('({ text: document.activeElement?.textContent?.trim() ?? "", html: document.activeElement?.outerHTML ?? "" })');
    throw new Error(`Mobile menu focus trap did not wrap to the toggle: ${JSON.stringify(focus)}`);
  }
  await key("Escape", "Escape", 27);
  const closedState = await evaluate(`(() => {
    const toggle = document.querySelector('[aria-controls="mobile-navigation"]');
    return {
      expanded: toggle?.getAttribute("aria-expanded"),
      focused: document.activeElement === toggle,
      label: toggle?.getAttribute("aria-label"),
    };
  })()`);
  if (closedState.expanded !== "false" || !closedState.focused) {
    throw new Error(`Invalid closed menu state: ${JSON.stringify(closedState)}`);
  }
  return { tabsToToggle: tabs, menuTabs, openState, forwardTabWrapped, closedState };
}

async function capture(route, viewport) {
  await command("Emulation.setDeviceMetricsOverride", viewport);
  await command("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await command("Page.navigate", { url: `http://localhost:4000${route.path}` });
  await new Promise((resolve) => setTimeout(resolve, 500));
  await evaluate("document.fonts.ready", true);
  await evaluate(`new Promise((resolve) => {
    let y = 0;
    const step = () => {
      y += 700;
      window.scrollTo(0, y);
      if (y < document.documentElement.scrollHeight) setTimeout(step, 35);
      else {
        window.scrollTo(0, 0);
        setTimeout(resolve, 200);
      }
    };
    step();
  })`, true);

  const checks = await evaluate(`(async () => {
    const root = document.documentElement;
    const interactive = [...document.querySelectorAll("a, button, summary")].filter((element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    });
    const smallTargets = interactive.map((element) => {
      const rect = element.getBoundingClientRect();
      return { text: element.textContent?.trim() ?? "", width: rect.width, height: rect.height };
    }).filter((target) => target.width < 44 || target.height < 44);
    const unreachable = interactive.filter((element) => element.tabIndex < 0).map((element) => element.textContent?.trim() ?? "");
    const hiddenReveals = [...document.querySelectorAll(".reveal-immediate")].filter((element) => Number(getComputedStyle(element).opacity) < 0.99).length;
    const headline = document.querySelector("h1");
    const headlineLines = headline
      ? Math.round(headline.getBoundingClientRect().height / Number.parseFloat(getComputedStyle(headline).lineHeight))
      : 0;
    const internalLinks = [...new Set([...document.querySelectorAll("a[href]")]
      .map((anchor) => anchor.href)
      .filter((href) => href.startsWith(location.origin)))];
    const unresolved = [];
    for (const href of internalLinks) {
      const url = new URL(href);
      const response = await fetch(url.pathname);
      if (!response.ok) unresolved.push(href);
      else if (url.hash) {
        const html = await response.text();
        const documentCopy = new DOMParser().parseFromString(html, "text/html");
        if (!documentCopy.getElementById(url.hash.slice(1))) unresolved.push(href);
      }
    }
    return {
      innerWidth: window.innerWidth,
      scrollWidth: root.scrollWidth,
      scrollHeight: root.scrollHeight,
      interactiveCount: interactive.length,
      smallTargets,
      unreachable,
      hiddenReveals,
      headlineLines,
      internalLinkCount: internalLinks.length,
      unresolved,
    };
  })()`, true);

  if (checks.innerWidth !== viewport.width || checks.scrollWidth > checks.innerWidth) {
    throw new Error(`${route.name}-${viewport.name} has horizontal overflow: ${JSON.stringify(checks)}`);
  }
  if (viewport.mobile && (checks.smallTargets.length || checks.unreachable.length)) {
    throw new Error(`${route.name}-${viewport.name} has inaccessible targets: ${JSON.stringify(checks)}`);
  }
  if (checks.hiddenReveals || checks.unresolved.length) {
    throw new Error(`${route.name}-${viewport.name} failed completeness/link checks: ${JSON.stringify(checks)}`);
  }
  if (route.name === "home" && viewport.mobile && checks.headlineLines > 4) {
    throw new Error(`${route.name}-${viewport.name} hero exceeds four lines: ${JSON.stringify(checks)}`);
  }
  if (route.name === "home" && !viewport.mobile && checks.headlineLines !== 3) {
    throw new Error(`${route.name}-${viewport.name} hero does not use the reviewed three-line composition: ${JSON.stringify(checks)}`);
  }

  const screenshot = await command("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    fromSurface: true,
    clip: { x: 0, y: 0, width: viewport.width, height: checks.scrollHeight, scale: 1 },
  });
  writeFileSync(`docs/review/${route.name}-${viewport.name}.png`, Buffer.from(screenshot.data, "base64"));
  return checks;
}

const results = {};
try {
  await command("Page.enable");
  await command("Emulation.setDeviceMetricsOverride", viewports[0]);
  results.mobileMenu = await verifyMobileMenu();
  for (const route of routes) {
    results[route.name] = {};
    for (const viewport of viewports) {
      results[route.name][viewport.name] = await capture(route, viewport);
    }
  }
  writeFileSync("docs/review/checks.json", `${JSON.stringify(results, null, 2)}\n`);
  console.log("Captured all routes and wrote docs/review/checks.json");
  await command("Browser.close");
} finally {
  socket.close();
  chromeProcess.kill();
  await new Promise((resolve) => setTimeout(resolve, 250));
  try {
    rmSync(profile, { recursive: true, force: true });
  } catch {}
}
