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

const escapeMarkup = (value) => value
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;");

const fontPath = fileURLToPath(new URL("../assets/fonts/AsyylSansDisplay-Bold.ttf", import.meta.url));
const mark = await sharp(await readFile(new URL("../public/brand/asyyl-mark-white.svg", import.meta.url)))
  .resize({ width: 48, height: 48, fit: "inside" })
  .png()
  .toBuffer();

const headline = await sharp({
  text: {
    text: `<span foreground="#ffffff">${lines.map(escapeMarkup).join("\n")}</span>`,
    font: "Asyyl Sans Display 86",
    fontfile: fontPath,
    width: 1056,
    height: 360,
    align: "left",
    rgba: true,
    spacing: 6,
  },
}).png().toBuffer();

const outputPath = fileURLToPath(new URL("../public/og.png", import.meta.url));

await sharp({
  create: {
    width: 1200,
    height: 630,
    channels: 4,
    background: "#000000",
  },
})
  .composite([
    { input: headline, left: 72, top: 70 },
    { input: mark, left: 72, top: 510 },
  ])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

const metadata = await sharp(outputPath).metadata();
if (metadata.width !== 1200 || metadata.height !== 630) throw new Error("OG image dimensions are incorrect");
console.log(`Generated public/og.png (${metadata.width}x${metadata.height})`);
