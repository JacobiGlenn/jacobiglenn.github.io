'use strict';
/**
 * Add a LinkedIn post entry to data/linkedin-posts.js
 *
 * Usage:
 *   node scripts/add-linkedin.cjs
 *   npm run add:linkedin
 *
 * What it does:
 *   Walks you through a short prompt sequence:
 *     - Post date (defaults to current month)
 *     - Post text (paste your LinkedIn text)
 *     - Media type: none / image / video
 *     - Media path or YouTube embed URL
 *   Then prepends a new entry to data/linkedin-posts.js.
 *   You can add/swap images in the file afterwards.
 */

const readline = require('readline');
const fs       = require('fs');
const path     = require('path');

const ROOT      = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'data', 'linkedin-posts.js');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = q => new Promise(resolve => rl.question(q, resolve));

function currentMonthYear() {
  const d = new Date();
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

function extractYouTubeId(url) {
  const m = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

async function main() {
  console.log('');
  console.log('── Add LinkedIn Post ─────────────────────────────────────────');
  console.log('Press Enter to accept defaults shown in [brackets].');
  console.log('');

  const defaultDate = currentMonthYear();
  const dateRaw = (await ask(`Date [${defaultDate}]: `)).trim();
  const date    = dateRaw || defaultDate;

  console.log('');
  console.log('Paste your post text (paste it all on one line, or press Enter for placeholder):');
  const textRaw = (await ask('> ')).trim();
  const text    = textRaw || '(fill in post text)';

  console.log('');
  const mediaChoice = (await ask('Media type? [none / image / video] (default: none): ')).trim().toLowerCase();

  let mediaArr = '[]';
  let thumb    = "''";

  if (mediaChoice === 'image') {
    console.log('');
    console.log('Image path (e.g. assets/linkedin/filename.jpg)');
    console.log('Tip: put the image file in assets/linkedin/ first.');
    const src = (await ask('Path: ')).trim();
    const alt = (await ask('Alt text (optional): ')).trim();
    if (src) {
      mediaArr = `[{ type: 'image', src: ${JSON.stringify(src)}, alt: ${JSON.stringify(alt)} }]`;
      thumb    = JSON.stringify(src);
    }
  } else if (mediaChoice === 'video') {
    console.log('');
    console.log('YouTube URL or embed URL:');
    const vidUrl = (await ask('URL: ')).trim();
    let embedSrc = vidUrl;
    const ytId = extractYouTubeId(vidUrl);
    if (ytId) embedSrc = `https://www.youtube.com/embed/${ytId}`;
    if (embedSrc) {
      mediaArr = `[{ type: 'video', src: ${JSON.stringify(embedSrc)} }]`;
    }
  }

  rl.close();

  const id    = 'li-' + slugify(text.slice(0, 40));
  const entry = `  {
    id: ${JSON.stringify(id)},
    date: ${JSON.stringify(date)},
    text: ${JSON.stringify(text)},
    media: ${mediaArr},
    thumb: ${thumb}
  }`;

  const original = fs.readFileSync(DATA_FILE, 'utf8');
  const insertAfter = 'window.__LINKEDIN_POSTS = [';
  const idx = original.indexOf(insertAfter);
  if (idx === -1) {
    console.error('Could not find window.__LINKEDIN_POSTS = [ in', DATA_FILE);
    process.exit(1);
  }

  const insertAt  = idx + insertAfter.length;
  const needsComma = original.slice(insertAt).trimStart().startsWith('{');
  const separator  = needsComma ? ',\n' : '\n';
  const updated    = original.slice(0, insertAt) + '\n' + entry + separator + original.slice(insertAt);
  fs.writeFileSync(DATA_FILE, updated, 'utf8');

  console.log('');
  console.log('✓ Added entry to data/linkedin-posts.js:');
  console.log('    id   :', id);
  console.log('    date :', date);
  console.log('    text :', text.slice(0, 60) + (text.length > 60 ? '...' : ''));
  console.log('');
  console.log('Next steps:');
  console.log('  1. If you have images, drop them in assets/linkedin/ and update the src in the file');
  console.log('  2. git add . && git commit -m "add linkedin post" && git push');
}

main().catch(e => { console.error(e); rl.close(); process.exit(1); });
