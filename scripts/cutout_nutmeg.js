import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function floodFillTransparent(inputPath, outputPath, options = {}) {
  const {
    threshold = 232,
    feather = 2,
  } = options;

  let image = sharp(inputPath);

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  const visited = new Uint8Array(width * height);
  const queue = [];

  const getPixel = (x, y) => {
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  const setAlpha = (x, y, alpha) => {
    const idx = (y * width + x) * channels;
    data[idx + 3] = alpha;
  };

  const isBgCandidate = (r, g, b) => {
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > threshold || (r > 225 && g > 225 && b > 225);
  };

  for (let x = 0; x < width; x++) {
    queue.push(x, 0);
    queue.push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y);
    queue.push(width - 1, y);
  }

  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];
    const pos = y * width + x;

    if (visited[pos]) continue;
    visited[pos] = 1;

    const [r, g, b] = getPixel(x, y);

    if (isBgCandidate(r, g, b)) {
      setAlpha(x, y, 0);

      if (x > 0 && !visited[pos - 1]) queue.push(x - 1, y);
      if (x < width - 1 && !visited[pos + 1]) queue.push(x + 1, y);
      if (y > 0 && !visited[pos - width]) queue.push(x, y - 1);
      if (y < height - 1 && !visited[pos + width]) queue.push(x, y + 1);
    }
  }

  // Feathering
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * channels;
      const alpha = data[idx + 3];
      if (alpha > 0) {
        const n1 = data[((y - 1) * width + x) * channels + 3];
        const n2 = data[((y + 1) * width + x) * channels + 3];
        const n3 = data[(y * width + (x - 1)) * channels + 3];
        const n4 = data[(y * width + (x + 1)) * channels + 3];

        if (n1 === 0 || n2 === 0 || n3 === 0 || n4 === 0) {
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const lum = 0.299 * r + 0.587 * g + 0.114 * b;
          if (lum > 220) {
            data[idx + 3] = Math.max(0, Math.floor((255 - lum) * 4));
          }
        }
      }
    }
  }

  // Ensure target directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await sharp(data, {
    raw: {
      width,
      height,
      channels: 4,
    },
  })
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log(`Saved transparent cutout to ${outputPath}`);
}

async function run() {
  const input = '/app/applet/src/assets/images/noix_muscade_1791040126128.jpg';
  const output = '/app/applet/public/images/noix-de-muscade-en-poudre.png';
  await floodFillTransparent(input, output, { threshold: 235 });
}

run().catch(console.error);
