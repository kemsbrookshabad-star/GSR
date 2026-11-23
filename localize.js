// Downloads every CDN library used by the app into www/libs so the app works offline.
// Run automatically by the GitHub workflow. Manual: node localize.js   (needs internet)
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const root = path.join(__dirname, 'www'), libs = path.join(root, 'libs');
fs.mkdirSync(libs, { recursive: true });
const UA = 'Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Mobile Safari/537.36';
const hash = u => crypto.createHash('md5').update(u).digest('hex').slice(0, 10);
const done = {};
async function get(u, bin) {
  const r = await fetch(u, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(u + ' -> HTTP ' + r.status);
  return bin ? Buffer.from(await r.arrayBuffer()) : r.text();
}
function ext(u, def) { const e = path.extname(new URL(u).pathname).split('?')[0]; return e && e.length <= 6 ? e : def; }
async function asset(u) {                       // font files, images referenced from CSS
  if (done[u]) return done[u];
  const name = hash(u) + ext(u, '.bin');
  fs.writeFileSync(path.join(libs, name), await get(u, true));
  return (done[u] = name);
}
async function css(u) {
  if (done[u]) return done[u];
  let t = await get(u);
  for (const m of [...t.matchAll(/url\(([^)]+)\)/g)]) {
    const raw = m[1].replace(/["']/g, '').trim();
    if (raw.startsWith('data:')) continue;
    t = t.split(m[1]).join('"./' + (await asset(new URL(raw, u).href)) + '"');
  }
  const name = hash(u) + '.css';
  fs.writeFileSync(path.join(libs, name), t);
  return (done[u] = name);
}
async function js(u) {
  if (done[u]) return done[u];
  const name = hash(u) + '.js';
  fs.writeFileSync(path.join(libs, name), await get(u));
  return (done[u] = name);
}
(async () => {
  const file = path.join(root, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const urls = [...new Set([...html.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)].map(m => m[1]))];
  for (const u of urls) {
    try {
      const isCss = /\.css(\?|$)/i.test(u) || /fonts\.googleapis\.com\/css/i.test(u);
      if (/fonts\.gstatic\.com|^https?:\/\/(www\.)?anthropic/i.test(u)) continue;
      const f = isCss ? await css(u) : await js(u);
      html = html.split('"' + u + '"').join('"libs/' + f + '"');
      console.log('OK  ', u);
    } catch (e) { console.log('SKIP', u, e.message); }
  }
  if (process.env.REVOKE_URL) html = html.replace('window.SRN_REVOKE_URL=""', 'window.SRN_REVOKE_URL=' + JSON.stringify(process.env.REVOKE_URL));
  fs.writeFileSync(file, html);
  console.log('Done. The app now works offline.');
})();
