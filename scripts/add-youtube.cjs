'use strict';
/**
 * Add a YouTube video entry to data/youtube-videos.js
 *
 * Usage:
 *   node scripts/add-youtube.cjs <youtube-url>
 *   npm run add:youtube https://youtu.be/VIDEO_ID
 *
 * What it does:
 *   1. Extracts the video ID from the URL
 *   2. Fetches the real title from YouTube oEmbed (free, no API key)
 *   3. Prepends a new entry to data/youtube-videos.js
 *   4. You fill in the description afterwards if you want
 */

const https = require('https');
const fs    = require('fs');
const path  = require('path');

const ROOT     = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'data', 'youtube-videos.js');

// ── 1. Parse URL ──────────────────────────────────────────────────────────────
const rawUrl = process.argv[2];
if (!rawUrl) {
  console.error('Usage: node scripts/add-youtube.cjs <youtube-url>');
  console.error('  e.g. node scripts/add-youtube.cjs https://youtu.be/dQw4w9WgXcQ');
  process.exit(1);
}
const match = rawUrl.match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
if (!match) {
  console.error('Could not extract a video ID from:', rawUrl);
  process.exit(1);
}
const videoId = match[1];

// ── 2. Fetch real title via oEmbed (free, no API key needed) ──────────────────
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); }
        catch { reject(new Error('JSON parse failed')); }
      });
    }).on('error', reject);
  });
}

// ── 3. Build entry and prepend to file ───────────────────────────────────────
function currentMonthYear() {
  const d = new Date();
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }); // "Mar 2026"
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

async function main() {
  let title = `(auto-fill: YouTube video ${videoId})`;
  try {
    const oembed = await fetchJson(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    );
    if (oembed.title) title = oembed.title;
    console.log('✓ Fetched title from YouTube:', title);
  } catch {
    console.warn('⚠ Could not fetch oEmbed — title left as placeholder. Fill it in manually.');
  }

  const id    = 'yt-' + slugify(title);
  const date  = currentMonthYear();
  const entry = `  {
    id: ${JSON.stringify(id)},
    videoId: ${JSON.stringify(videoId)},
    date: ${JSON.stringify(date)},
    title: ${JSON.stringify(title)},
    description: ''
  }`;

  // Insert after `window.__YOUTUBE_VIDEOS = [`
  const original = fs.readFileSync(DATA_FILE, 'utf8');
  const insertAfter = 'window.__YOUTUBE_VIDEOS = [';
  const idx = original.indexOf(insertAfter);
  if (idx === -1) {
    console.error('Could not find window.__YOUTUBE_VIDEOS = [ in', DATA_FILE);
    process.exit(1);
  }

  const insertAt = idx + insertAfter.length;
  const needsComma = original.slice(insertAt).trimStart().startsWith('{') ||
                     original.slice(insertAt).trimStart().startsWith('//');
  const separator  = needsComma ? ',\n' : '\n';
  const updated    = original.slice(0, insertAt) + '\n' + entry + separator + original.slice(insertAt);
  fs.writeFileSync(DATA_FILE, updated, 'utf8');

  console.log('');
  console.log('✓ Added entry to data/youtube-videos.js:');
  console.log('    id      :', id);
  console.log('    videoId :', videoId);
  console.log('    title   :', title);
  console.log('    date    :', date);
  console.log('');
  console.log('Next steps:');
  console.log('  1. Open data/youtube-videos.js and fill in the description field');
  console.log('  2. git add . && git commit -m "add youtube: ' + title.slice(0,40) + '" && git push');
}

main().catch(e => { console.error(e); process.exit(1); });
