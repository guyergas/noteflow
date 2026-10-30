import sharp from 'sharp';
const svg = await (await import('node:fs/promises')).readFile('public/icon.svg');
for (const [name, size] of [['icon-192.png', 192], ['icon-512.png', 512], ['apple-touch-icon.png', 180]]) {
  await sharp(svg).resize(size, size).png().toFile(`public/${name}`);
}
// Maskable: full-bleed background with the mark inside the safe zone.
const mask = Buffer.from(svg.toString().replace('rx="112"', 'rx="0"'));
await sharp(mask).resize(512, 512).png().toFile('public/icon-maskable-512.png');
console.log('icons ok');
