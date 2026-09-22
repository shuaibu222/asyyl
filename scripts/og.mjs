import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const homeSource = await readFile(new URL("../content/home.ts", import.meta.url), "utf8");
const headlineMatch = homeSource.match(/hero:\s*\{[\s\S]*?headline:\s*"([^"]+)"/);
if (!headlineMatch) throw new Error("Could not read the home hero headline");

const words = headlineMatch[1].split(" ");
const groupSize = Math.ceil(words.length / 3);
const lines = [
  words.slice(0, groupSize).join(" "),
  words.slice(groupSize, groupSize * 2).join(" "),
  words.slice(groupSize * 2).join(" "),
];

const escapeXml = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const font = (await readFile(new URL("../public/fonts/AsyylSansDisplay-Bold.woff2", import.meta.url))).toString("base64");
const mark = await sharp(await readFile(new URL("../public/brand/asyyl-mark-white.svg", import.meta.url)))
  .resize(48, 48)
  .png()
  .toBuffer();

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <style>
    @font-face { font-family: Asyyl; src: url(data:font/woff2;base64,${font}); font-weight: 700; }
    text { font-family: Asyyl, sans-serif; font-weight: 700; letter-spacing: -3px; }
  </style>
  <rect width="1200" height="630" fill="#000000" />
  <text x="72" y="170" fill="#ffffff" font-size="86">
    <tspan x="72" dy="0">${escapeXml(lines[0])}</tspan>
    <tspan x="72" dy="92">${escapeXml(lines[1])}</tspan>
    <tspan x="72" dy="92">${escapeXml(lines[2])}</tspan>
  </text>
</svg>`;

const outputPath = fileURLToPath(new URL("../public/og.png", import.meta.url));

await sharp(Buffer.from(svg))
  .composite([{ input: mark, left: 72, top: 510 }])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();
if (metadata.width !== 1200 || metadata.height !== 630) throw new Error("OG image dimensions are incorrect");
console.log(`Generated public/og.png (${metadata.width}x${metadata.height})`);
