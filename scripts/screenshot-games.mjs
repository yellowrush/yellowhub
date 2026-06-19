/**
 * Generate webp screenshots for all 5 games using Puppeteer.
 *
 * Usage:
 *   NODE_PATH=<workspace>/node_modules node scripts/screenshot-games.mjs
 *
 * Output: public/games/screenshots/{gameId}.webp
 */
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const require = createRequire(import.meta.url);
const puppeteer = require('puppeteer');

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const gamesDir = join(projectRoot, 'public', 'games');
const outDir = join(gamesDir, 'screenshots');

const games = [
  { id: 'dragUp',  file: 'dragUp.html',           waitMs: 2000 },
  { id: 'alignUp', file: 'alignUp/index.html',    waitMs: 2500 },
  { id: 'catUp',   file: 'catUp.html',             waitMs: 2000 },
  { id: 'findUp',  file: 'findUp.html',            waitMs: 2000 },
  { id: 'lineUp',  file: 'lineUp.html',            waitMs: 2000 },
];

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  for (const game of games) {
    const filePath = join(gamesDir, game.file);
    const fileUrl = `file:///${filePath.replace(/\\/g, '/')}`;
    const outPath = join(outDir, `${game.id}.webp`);

    console.log(`Capturing ${game.id}…`);

    const page = await browser.newPage();
    await page.setViewport({ width: 420, height: 600, deviceScaleFactor: 2 });

    try {
      await page.goto(fileUrl, { waitUntil: 'networkidle0', timeout: 15000 });
    } catch (e) {
      console.log(`  (timeout waiting for ${game.id}, capturing anyway)`);
    }

    // Extra wait for game canvas to render
    await new Promise((r) => setTimeout(r, game.waitMs));

    await page.screenshot({
      path: outPath,
      type: 'webp',
      quality: 85,
      clip: { x: 0, y: 0, width: 420, height: 600 },
    });

    console.log(`  → saved ${outPath}`);
    await page.close();
  }

  await browser.close();
  console.log('Done! All screenshots generated.');
}

main().catch((err) => {
  console.error('Screenshot generation failed:', err);
  process.exit(1);
});
