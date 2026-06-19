import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, '../public/favicon.ico');

// Minimal valid 16x16 32bpp ICO — warm teal color #19c8b9
const width = 16, height = 16;

// BMP info header (40 bytes)
const bmpHeader = Buffer.alloc(40);
bmpHeader.writeUInt32LE(40, 0);
bmpHeader.writeInt32LE(width, 4);
bmpHeader.writeInt32LE(height * 2, 8); // ICO: double height
bmpHeader.writeUInt16LE(1, 12);        // planes
bmpHeader.writeUInt16LE(32, 14);       // bits per pixel
bmpHeader.writeUInt32LE(0, 16);        // compression = none
bmpHeader.writeUInt32LE(width * height * 4, 20);

// Pixel data: 16x16 BGRA — warm teal #19c8b9
const pixelData = Buffer.alloc(width * height * 4);
for (let i = 0; i < width * height; i++) {
  pixelData[i * 4 + 0] = 0xb9; // B
  pixelData[i * 4 + 1] = 0xc8; // G
  pixelData[i * 4 + 2] = 0x19; // R
  pixelData[i * 4 + 3] = 0xff; // A
}

// AND mask — 16px wide = 2 bytes/row, padded to 4
const andMask = Buffer.alloc(height * 4);
const bmpData = Buffer.concat([bmpHeader, pixelData, andMask]);

// ICO ICONDIR header (6 bytes)
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);
icoHeader.writeUInt16LE(1, 2);  // type = ICO
icoHeader.writeUInt16LE(1, 4);  // 1 image

// ICONDIRENTRY (16 bytes)
const entry = Buffer.alloc(16);
entry.writeUInt8(width, 0);
entry.writeUInt8(height, 1);
entry.writeUInt8(0, 2);
entry.writeUInt8(0, 3);
entry.writeUInt16LE(1, 4);
entry.writeUInt16LE(32, 6);
entry.writeUInt32LE(bmpData.length, 8);
entry.writeUInt32LE(22, 12);  // offset = 6 + 16

const ico = Buffer.concat([icoHeader, entry, bmpData]);
writeFileSync(outPath, ico);
console.log(`favicon.ico written: ${ico.length} bytes → ${outPath}`);
