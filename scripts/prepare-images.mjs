// Converts raw screenshots into AVIF + WebP at fixed widths for <picture>.
// Usage: node scripts/prepare-images.mjs
// Reads scripts/images.manifest.json: [{ "src": "...png", "out": "public/screens/sms/dashboard", "widths": [1440, 800] }]
import sharp from 'sharp';
import { readFile, mkdir, access } from 'node:fs/promises';
import { dirname } from 'node:path';

const manifest = JSON.parse(await readFile(new URL(process.argv[2] ?? './images.manifest.json', import.meta.url), 'utf8'));

for (const item of manifest) {
  try { await access(item.src); } catch { console.log(`skip ${item.out} (missing source)`); continue; }
  const widths = item.widths ?? [1440, 800];
  await mkdir(dirname(item.out), { recursive: true });
  const meta = await sharp(item.src).metadata();
  for (const w of widths) {
    const width = Math.min(w, meta.width);
    const base = `${item.out}-${w}`;
    await sharp(item.src).resize({ width }).avif({ quality: 55, effort: 6 }).toFile(`${base}.avif`);
    await sharp(item.src).resize({ width }).webp({ quality: 82 }).toFile(`${base}.webp`);
  }
  console.log(`ok  ${item.out}  (${meta.width}x${meta.height})`);
}
