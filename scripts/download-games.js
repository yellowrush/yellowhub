const fs = require('fs');
const path = require('path');
const https = require('https');

const games = ['dragUp', 'alignUp', 'catUp', 'findUp', 'lineUp'];
const outputDir = path.join(__dirname, '..', 'public', 'games');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log('Created directory:', outputDir);
}

let completed = 0;

games.forEach(game => {
  const url = `https://api.github.com/repos/mpg-chong-huang/yellowrush/contents/game/${game}/index.html?ref=gh-pages`;
  
  https.get(url, (res) => {
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
  });
});
