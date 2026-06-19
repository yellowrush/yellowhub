import fs from 'fs';
import path from 'path';
import https from 'https';

const games = ['dragUp', 'alignUp', 'catUp', 'findUp', 'lineUp'];
const outputDir = path.join(process.cwd(), 'public', 'games');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('Created directory:', outputDir);
}

let completed = 0;

games.forEach(game => {
  const url = `https://api.github.com/repos/mpg-chong-huang/yellowrush/contents/game/${game}/index.html?ref=gh-pages`;
  
  const options = new URL(url);
  const reqOptions = {
    hostname: options.hostname,
    path: options.pathname + options.search,
    method: 'GET',
    headers: {
      'User-Agent': 'YellowHub-App',
      'Accept': 'application/vnd.github.v3+json'
    }
  };
  
  https.request(reqOptions, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      try {
        const json = JSON.parse(data);
        if (json.content) {
          const html = Buffer.from(json.content, 'base64').toString('utf8');
          const outPath = path.join(outputDir, `${game}.html`);
          fs.writeFileSync(outPath, html, 'utf8');
          console.log(`Downloaded ${game}: ${html.length} bytes`);
        } else {
          console.error(`Error downloading ${game}:`, json.message || 'Unknown error');
          console.error('Response:', data.substring(0, 200));
        }
      } catch (e) {
        console.error(`Error processing ${game}:`, e.message);
        console.error('Response data:', data.substring(0, 200));
      }
      completed++;
      if (completed === games.length) {
        console.log('All downloads completed!');
      }
    });
  }).on('error', (e) => {
    console.error(`Request error for ${game}:`, e.message);
    completed++;
  }).end();
});
