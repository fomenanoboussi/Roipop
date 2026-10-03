import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function floodFillTransparent(inputPath, outputPath, options = {}) {
  const {
    threshold = 240,       // Brightness threshold for background
    colorDistance = 30,    // Color distance tolerance from corner pixel
    feather = 2,
    customCrop = null
  } = options;

  let image = sharp(inputPath);
  if (customCrop) {
    image = image.extract(customCrop);
  }

  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  // Visited array
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Corner sample colors
  const getPixel = (x, y) => {
    const idx = (y * width + x) * channels;
    return [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
  };

  const setAlpha = (x, y, alpha) => {
    const idx = (y * width + x) * channels;
    data[idx + 3] = alpha;
  };

  // Add perimeter pixels to queue if they look like background
  const isBgCandidate = (r, g, b) => {
    // If high luminance or close to white/light gray
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > threshold || (r > 230 && g > 230 && b > 230);
  };

  // Enqueue borders
  for (let x = 0; x < width; x++) {
    queue.push(x, 0);
    queue.push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    queue.push(0, y);
    queue.push(width - 1, y);
  }

  // BFS Flood fill
  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];
    const pos = y * width + x;

    if (visited[pos]) continue;
    visited[pos] = 1;

    const [r, g, b] = getPixel(x, y);

    if (isBgCandidate(r, g, b)) {
      setAlpha(x, y, 0); // make transparent

      // Neighbors
      if (x > 0 && !visited[pos - 1]) {
        queue.push(x - 1, y);
      }
      if (x < width - 1 && !visited[pos + 1]) {
        queue.push(x + 1, y);
      }
      if (y > 0 && !visited[pos - width]) {
        queue.push(x, y - 1);
      }
      if (y < height - 1 && !visited[pos + width]) {
        queue.push(x, y + 1);
      }
    }
  }

  // Feathering / Edge smoothing:
  // For pixels bordering a 0 alpha pixel, soften alpha if light
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * channels;
      const alpha = data[idx + 3];
      if (alpha > 0) {
        // check neighbors
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
  const imagesDir = '/app/applet/src/assets/images';

  // 1. CROKS
  await floodFillTransparent(
    `${imagesDir}/product_croks_caramel.jpg`,
    `${imagesDir}/product_croks_caramel_transparent.png`,
    { threshold: 235 }
  );

  // 2. ROI POP 25KG
  await floodFillTransparent(
    `${imagesDir}/product_roi_pop_25kg.jpg`,
    `${imagesDir}/product_roi_pop_25kg_transparent.png`,
    { threshold: 230 }
  );

  // 3. ROI POP 100% Naturel
  await floodFillTransparent(
    `${imagesDir}/product_roi_pop_naturel.jpg`,
    `${imagesDir}/product_roi_pop_naturel_transparent.png`,
    { threshold: 232 }
  );

  // 4. DU ROI Huile 30ml
  await floodFillTransparent(
    `${imagesDir}/product_du_roi_huile_30ml.jpg`,
    `${imagesDir}/product_du_roi_huile_30ml_transparent.png`,
    { threshold: 230 }
  );
}

run().catch(console.error);
