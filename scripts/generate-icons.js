import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Minimal PNG encoder in pure Node.js
function createPng(width, height, r, g, b) {
  const bytesPerPixel = 4;
  const rowSize = width * bytesPerPixel;
  const rawData = Buffer.alloc(height * (rowSize + 1));

  let offset = 0;
  for (let y = 0; y < height; y++) {
    rawData[offset++] = 0; // Filter type: None
    const isEdge = y < 16 || y > height - 16;
    for (let x = 0; x < width; x++) {
      // Warm amber / golden gradient with soft inner badge
      const cx = width / 2;
      const cy = height / 2;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const maxR = width * 0.45;
      
      let pixelR = r;
      let pixelG = g;
      let pixelB = b;
      
      if (dist < maxR * 0.7) {
        // Inner warm center (clay handi highlight)
        pixelR = Math.min(255, r + 40);
        pixelG = Math.min(255, g + 25);
        pixelB = Math.max(0, b - 10);
      } else if (dist < maxR) {
        pixelR = Math.max(0, r - 30);
        pixelG = Math.max(0, g - 20);
        pixelB = Math.max(0, b - 10);
      }

      rawData[offset++] = pixelR; // R
      rawData[offset++] = pixelG; // G
      rawData[offset++] = pixelB; // B
      rawData[offset++] = 255;    // Alpha
    }
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdrData);
  const idatChunk = makeChunk('IDAT', deflated);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    table[n] = c;
  }

  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return (crc ^ (-1)) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(8 + len + 4);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate PWA icons with brand colors (Amber-600: #d97706 -> 217, 119, 6)
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), createPng(192, 192, 217, 119, 6));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), createPng(512, 512, 217, 119, 6));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), createPng(512, 512, 180, 83, 9));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), createPng(180, 180, 217, 119, 6));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), createPng(32, 32, 217, 119, 6));

console.log('Successfully generated PWA icon assets in /public');
