import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/dishes');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const dishes = [
  ['chicken', 0, 0],
  ['beef', 418, 0],
  ['mutton', 836, 0],
  ['tikka', 0, 418],
  ['kabab', 418, 418],
  ['raita', 836, 418],
  ['salad', 0, 836],
  ['cola', 418, 836],
  ['mint', 836, 836],
];

async function run() {
  const input = path.resolve('public/food-menu.png');
  for (const [id, left, top] of dishes) {
    const outFile = path.join(outDir, `${id}.png`);
    await sharp(input)
      .extract({ left, top, width: 418, height: 418 })
      .toFile(outFile);
    console.log(`Saved: ${outFile}`);
  }
  console.log('All 9 dishes cropped successfully!');
}

run().catch(console.error);

