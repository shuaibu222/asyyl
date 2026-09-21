import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { gzipSync } from "node:zlib";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT ?? 4000);
const mimeTypes = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};
const compressible = new Set([".css", ".html", ".js", ".json", ".svg", ".txt", ".xml"]);

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
    const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
    let filePath = join(root, safePath);
    const fileStats = await stat(filePath).catch(() => null);
    if (fileStats?.isDirectory() || pathname.endsWith("/")) filePath = join(filePath, "index.html");

    const body = await readFile(filePath);
    const extension = extname(filePath);
    const accepts = request.headers["accept-encoding"] ?? "";
    let payload = body;

    if (compressible.has(extension) && accepts.includes("gzip")) {
      payload = gzipSync(body);
      response.setHeader("Content-Encoding", "gzip");
    }

    response.setHeader("Content-Type", mimeTypes[extension] ?? "application/octet-stream");
    response.setHeader("Cache-Control", extension === ".html" ? "no-cache" : "public, max-age=31536000, immutable");
    response.setHeader("Vary", "Accept-Encoding");
    response.end(payload);
  } catch {
    response.statusCode = 404;
    response.end();
  }
}).listen(port, () => console.log(`Serving out on http://localhost:${port}`));
