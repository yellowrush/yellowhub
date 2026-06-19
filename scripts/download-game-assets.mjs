/**
 * Downloads additional assets needed by games (CSS, worker.js, etc.)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = dirname(fileURLToPath(import.meta.url));
const gamesDir = join(__dirname, '..', 'public', 'games');

// Create subdirectories for games that need them
if (!existsSync(join(gamesDir, 'alignUp'))) {
  mkdirSync(join(gamesDir, 'alignUp'), { recursive: true });
}

function fetchGitHubFile(path, outputPath) {
  return new Promise((resolve, reject) => {
    const url = `https://api.github.com/repos/mpg-chong-huang/yellowrush/contents/game/${path}?ref=gh-pages`;
    const options = {
      headers: {
        'User-Agent': 'YellowHub-SSG-Builder/1.0',
        'Accept': 'application/vnd.github.v3+json'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.content) {
            const content = Buffer.from(json.content, 'base64').toString('utf8');
            writeFileSync(outputPath, content);
            console.log(`✅ Downloaded: ${path} → ${outputPath}`);
            resolve(content);
          } else {
            console.error(`❌ Error: ${json.message || JSON.stringify(json)}`);
            reject(new Error(json.message));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Download alignUp assets
await fetchGitHubFile('alignUp/index.processed.css', join(gamesDir, 'alignUp', 'index.processed.css'));
await fetchGitHubFile('alignUp/worker.js', join(gamesDir, 'alignUp', 'worker.js'));

// Also need to fix the alignUp HTML: it references ./worker.js and index.processed.css
// These are in /games/alignUp/ subfolder, so rename the main alignUp HTML
// Actually, we need to move alignUp.html into its own folder

// Move: rename alignUp.html -> alignUp/index.html, and fix paths
const alignUpHtml = readFileSync(join(gamesDir, 'alignUp.html'), 'utf8');
// The worker.js path is fine (./worker.js relative to alignUp/index.html)
writeFileSync(join(gamesDir, 'alignUp', 'index.html'), alignUpHtml, 'utf8');
console.log('✅ Moved alignUp.html → alignUp/index.html');

console.log('\n🎉 All alignUp assets ready!');
