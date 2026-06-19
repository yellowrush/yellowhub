/**
 * Injects warm-color theme override CSS into all 5 game HTML files.
 * Each game gets a shared header bar + warm palette overrides.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const gamesDir = join(__dirname, '..', 'public', 'games');

// Warm theme CSS injection - inserted after <head> or before </head>
const warmThemeCSS = `
<style id="yellowhub-warm-theme">
/* ================================================
   YellowHub Warm Theme Overlay — animal-island-ui
   Primary palette: cream / warm brown / mint teal
   ================================================ */

:root {
  --warm-bg: #fdf6ec;
  --warm-bg2: #fff9f0;
  --warm-text: #794f27;
  --warm-text-light: #a8845e;
  --warm-accent: #19c8b9;
  --warm-accent-dark: #11a89b;
  --warm-shadow: #bdaea0;
  --warm-border: rgba(189, 174, 160, 0.4);
  --warm-card: rgba(255, 249, 240, 0.95);
  --warm-danger: #e05c5c;
  --warm-success: #5cb85c;
  --warm-btn-shadow: 0 4px 0 0 var(--warm-shadow);
}

/* --- YellowHub game header bar --- */
#yellowhub-header {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 9999 !important;
  height: 44px !important;
  background: var(--warm-bg) !important;
  border-bottom: 1px solid var(--warm-border) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  padding: 0 16px !important;
  font-family: 'Nunito', 'Avenir Next', Avenir, sans-serif !important;
  box-shadow: 0 2px 8px rgba(189, 174, 160, 0.2) !important;
}

#yellowhub-header a {
  text-decoration: none !important;
  color: var(--warm-text) !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
}

#yellowhub-header a:hover {
  color: var(--warm-accent) !important;
}

#yellowhub-header .header-title {
  color: var(--warm-text) !important;
  font-weight: 700 !important;
  font-size: 15px !important;
}

/* --- Warm body background for games without explicit bg --- */
body {
  font-family: 'Nunito', 'Avenir Next', Avenir, sans-serif !important;
}

/* --- dragUp & lineUp: override dark/gray backgrounds --- */
.level-list {
  background: var(--warm-bg) !important;
}

.level-list__item {
  background: var(--warm-bg2) !important;
  color: var(--warm-text) !important;
  border: 1px solid var(--warm-border) !important;
}

.level-list__item:hover {
  background: white !important;
  color: var(--warm-accent) !important;
  border-color: var(--warm-accent) !important;
}

.level-list__item.is-playing {
  background: var(--warm-accent) !important;
  color: white !important;
  border-color: var(--warm-accent-dark) !important;
}

.level-list__item__check {
  background: var(--warm-text) !important;
}

/* --- Buttons: override #09F, #BBB, #2ecc71 blue/gray/green to warm style --- */
.button,
button:not(#yellowhub-header button):not([class*="swal"]) {
  font-family: 'Nunito', 'Avenir Next', Avenir, sans-serif !important;
  background: var(--warm-bg2) !important;
  color: var(--warm-text) !important;
  border: 1px solid var(--warm-border) !important;
  border-radius: 8px !important;
  box-shadow: var(--warm-btn-shadow) !important;
  transition: transform 0.1s, box-shadow 0.1s !important;
}

.button:hover,
button:not(#yellowhub-header button):not([class*="swal"]):hover {
  background: var(--warm-accent) !important;
  color: white !important;
  border-color: var(--warm-accent-dark) !important;
  box-shadow: 0 5px 0 0 var(--warm-accent-dark) !important;
  transform: translateY(-1px) !important;
}

.button:active,
button:not(#yellowhub-header button):not([class*="swal"]):active {
  transform: translateY(2px) !important;
  box-shadow: 0 1px 0 0 var(--warm-shadow) !important;
}

.next-level-button {
  background: var(--warm-accent) !important;
}

.next-level-button:hover {
  background: var(--warm-accent-dark) !important;
}

/* --- lineUp: override dark navy background --- */
body[style*="background-color: #2c3e50"],
body[style*="background:#2c3e50"] {
  background-color: var(--warm-bg) !important;
}

section {
  background-color: var(--warm-bg2) !important;
}

/* --- findUp: override bright background colors to warm pastels --- */
.card-flipped-front {
  background: var(--warm-bg) !important;
}

/* --- alignUp: sidebar panel --- */
.sidebar h1,
.sidebar h2 {
  color: var(--warm-text) !important;
  font-family: 'Nunito', sans-serif !important;
}

.panel {
  background: var(--warm-bg2) !important;
  border: 1px solid var(--warm-border) !important;
  border-radius: 12px !important;
}

.start button {
  background: var(--warm-accent) !important;
  color: white !important;
  box-shadow: 0 4px 0 0 var(--warm-accent-dark) !important;
}

/* --- Radio buttons warm accent --- */
input[type="radio"]:checked {
  accent-color: var(--warm-accent) !important;
}

/* --- Make room for the header bar (44px) --- */
body {
  padding-top: 44px !important;
}

canvas {
  top: 44px !important;
}

/* --- Wrapper warm background --- */
.wrapper {
  background: var(--warm-bg) !important;
}
</style>
`;

// The game header bar HTML
const headerBar = (gameTitle) => `
<div id="yellowhub-header">
  <a href="javascript:window.close ? window.close() : history.back()">← 返回</a>
  <span class="header-title">🎮 ${gameTitle}</span>
  <a href="/" style="font-size:12px; opacity:0.6;">YellowHub</a>
</div>
`;

const games = [
  { file: 'dragUp.html',  title: 'Drag Up — 拖拽益智' },
  { file: 'alignUp.html', title: 'Align Up — 四子棋' },
  { file: 'catUp.html',   title: 'Cat Up — 小猫跳跳' },
  { file: 'findUp.html',  title: 'Find Up — 寻宝记忆' },
  { file: 'lineUp.html',  title: 'Line Up — 连线谜题' },
];

for (const game of games) {
  const filePath = join(gamesDir, game.file);
  let html = readFileSync(filePath, 'utf8');

  // Inject warm theme CSS before </head>
  if (html.includes('</head>')) {
    html = html.replace('</head>', `${warmThemeCSS}\n</head>`);
  } else {
    // No </head>: inject at start of file
    html = warmThemeCSS + '\n' + html;
  }

  // Inject header bar after <body> tag (or at start of body content)
  if (html.includes('<body>')) {
    html = html.replace('<body>', `<body>\n${headerBar(game.title)}`);
  } else if (html.match(/<body[^>]*>/)) {
    html = html.replace(/<body[^>]*>/, (m) => `${m}\n${headerBar(game.title)}`);
  } else {
    // No body tag — prepend after </head> or at start
    html = headerBar(game.title) + '\n' + html;
  }

  // Also inject Nunito font link if not already present
  if (!html.includes('Nunito')) {
    html = html.replace(
      '</head>',
      `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">\n</head>`
    );
  }

  writeFileSync(filePath, html, 'utf8');
  console.log(`✅ Themed: ${game.file}`);
}

console.log('\n🎨 All 5 games themed with warm YellowHub palette!');
