'use strict';
/**
 * Add a LinkedIn post to data/linkedin-posts.js
 *
 * Usage:
 *   npm run add:linkedin -- https://www.linkedin.com/feed/update/urn:li:activity:ID/
 *   npm run add:linkedin
 *
 * With a URL, the script reads the public post page (schema.org JSON-LD),
 * downloads the first image into assets/linkedin/, and prepends an entry.
 * With no URL, it falls back to the old prompt.
 *
 * LinkedIn has no keyless read API (oEmbed returns 404). This only works for
 * posts that are public. Connections-only posts come back without a body.
 * Native LinkedIn video is not a stable download, so those stay text-only
 * and you can drop an mp4 in afterwards.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'data', 'linkedin-posts.js');
const MEDIA_DIR = path.join(ROOT, 'assets', 'linkedin');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function fetchBuffer(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) {
      reject(new Error('Too many redirects'));
      return;
    }
    const req = https.get(url, {
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml,image/avif,image/webp,image/*,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
    }, (res) => {
      const code = res.statusCode || 0;
      if (code >= 300 && code < 400 && res.headers.location) {
        const next = new URL(res.headers.location, url).href;
        res.resume();
        resolve(fetchBuffer(next, redirects + 1));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        if (code !== 200) {
          reject(new Error(`Request failed (${code}) for ${url}`));
          return;
        }
        resolve({
          buffer,
          contentType: String(res.headers['content-type'] || ''),
        });
      });
    });
    req.on('error', reject);
  });
}

function extractActivityId(input) {
  const urn = String(input).match(/urn:li:activity:(\d+)/);
  if (urn) return urn[1];
  const slug = String(input).match(/activity-(\d+)/);
  if (slug) return slug[1];
  return null;
}

function parsePost(html) {
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let match;
  while ((match = re.exec(html))) {
    let data;
    try {
      data = JSON.parse(match[1]);
    } catch {
      continue;
    }
    const items = [];
    if (Array.isArray(data)) items.push(...data);
    else if (data && Array.isArray(data['@graph'])) items.push(...data['@graph']);
    else if (data) items.push(data);
    const post = items.find((item) => item && item['@type'] === 'SocialMediaPosting');
    if (post) return post;
  }
  return null;
}

function imageRank(url) {
  if (url.includes('high-res')) return 4;
  if (url.includes('1280')) return 3;
  if (url.includes('800')) return 2;
  if (url.includes('480')) return 1;
  return 0;
}

function imageCandidates(post) {
  const raw = post.image ? (Array.isArray(post.image) ? post.image : [post.image]) : [];
  const groups = new Map();
  for (const img of raw) {
    const url = typeof img === 'string' ? img : img && img.url;
    if (!url || /profile-displayphoto|profile-displaybackground|company-logo|static\.licdn\.com/.test(url)) continue;
    const idMatch = url.match(/\/dms\/image\/(?:v2\/)?([^/]+)\//);
    const id = idMatch ? idMatch[1] : url;
    const rank = imageRank(url);
    const prev = groups.get(id);
    if (!prev || rank > prev.rank) groups.set(id, { url, rank });
  }
  return [...groups.values()].map((group) => group.url);
}

function extFor(contentType, url) {
  if (/png/i.test(contentType) || /\.png(\?|$)/i.test(url)) return '.png';
  if (/webp/i.test(contentType) || /\.webp(\?|$)/i.test(url)) return '.webp';
  if (/gif/i.test(contentType) || /\.gif(\?|$)/i.test(url)) return '.gif';
  return '.jpg';
}

function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return currentMonthYear();
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Los_Angeles',
  });
}

function currentMonthYear() {
  return new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeAttr(str) {
  return escapeHtml(str).replace(/"/g, '&quot;');
}

function linkifyLine(line) {
  const re = /https?:\/\/[^\s]+/g;
  let out = '';
  let last = 0;
  let match;
  while ((match = re.exec(line))) {
    out += escapeHtml(line.slice(last, match.index));
    const url = match[0].replace(/[),.;]+$/, '');
    const trail = match[0].slice(url.length);
    out += `<a href="${escapeAttr(url)}" class="clean-link" target="_blank">${escapeHtml(url)}</a>${escapeHtml(trail)}`;
    last = match.index + match[0].length;
  }
  return out + escapeHtml(line.slice(last));
}

function labeledLink(line) {
  const match = line.match(/^(.{1,48}?):\s+(https?:\/\/\S+)$/);
  if (!match) return null;
  return { label: match[1].trim(), url: match[2].replace(/[),.;]+$/, '') };
}

function textToHtml(raw) {
  const blocks = String(raw).trim().split(/\n\s*\n/);
  return blocks.map((block) => {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean);
    const parts = [];
    let labeled = [];
    const flush = () => {
      if (!labeled.length) return;
      parts.push(labeled.map(({ label, url }) => (
        `<a href="${escapeAttr(url)}" class="clean-link" target="_blank">${escapeHtml(label)}</a>`
      )).join(' &nbsp;·&nbsp; '));
      labeled = [];
    };
    for (const line of lines) {
      const link = labeledLink(line);
      if (link) labeled.push(link);
      else {
        flush();
        parts.push(linkifyLine(line));
      }
    }
    flush();
    return parts.join('<br>');
  }).join('<br><br>');
}

function extractYouTubeId(url) {
  const match = String(url).match(/(?:youtu\.be\/|[?&]v=|\/embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function videoEmbed(post) {
  const raw = post.video ? (Array.isArray(post.video) ? post.video[0] : post.video) : null;
  if (!raw) return null;
  const url = raw.embedUrl || raw.contentUrl || '';
  const yt = extractYouTubeId(url);
  if (yt) return `https://www.youtube.com/embed/${yt}`;
  if (/\.(mp4|webm)(\?|$)/i.test(url)) return url;
  return null;
}

function prependEntry(entry) {
  const original = fs.readFileSync(DATA_FILE, 'utf8');
  const insertAfter = 'export const LINKEDIN_POSTS = [';
  const idx = original.indexOf(insertAfter);
  if (idx === -1) {
    console.error('Could not find export const LINKEDIN_POSTS = [ in', DATA_FILE);
    process.exit(1);
  }
  const insertAt = idx + insertAfter.length;
  const rest = original.slice(insertAt);
  const needsComma = rest.trimStart().startsWith('{');
  const updated = original.slice(0, insertAt) + '\n' + entry + (needsComma ? ',' : '') + rest;
  fs.writeFileSync(DATA_FILE, updated, 'utf8');
}

function renderEntry({ id, date, text, mediaArr, thumb }) {
  return `  {
    id: ${JSON.stringify(id)},
    date: ${JSON.stringify(date)},
    text: ${JSON.stringify(text)},
    media: ${mediaArr},
    thumb: ${thumb}
  }`;
}

async function importFromUrl(rawUrl) {
  const activityId = extractActivityId(rawUrl);
  if (!activityId) {
    console.error('Could not find a LinkedIn activity id in that URL.');
    console.error('Use a link like https://www.linkedin.com/feed/update/urn:li:activity:123/');
    console.error('or https://www.linkedin.com/posts/...-activity-123-xxxx');
    process.exit(1);
  }

  const original = fs.readFileSync(DATA_FILE, 'utf8');
  const id = `li-${activityId}`;
  if (original.includes(`id: '${id}'`) || original.includes(`id: "${id}"`)) {
    console.error(`Already in data/linkedin-posts.js (${id}).`);
    process.exit(1);
  }

  const pageUrl = `https://www.linkedin.com/feed/update/urn:li:activity:${activityId}/`;
  console.log('Fetching', pageUrl);
  let html;
  try {
    const res = await fetchBuffer(pageUrl);
    html = res.buffer.toString('utf8');
  } catch (err) {
    console.error('Could not load the public post page.');
    console.error(err.message);
    console.error('LinkedIn blocks some requests. Try again, or paste the post with: npm run add:linkedin');
    process.exit(1);
  }

  const post = parsePost(html);
  const body = post && (post.articleBody || post.headline);
  if (!post || !body) {
    console.error('This post did not include public text.');
    console.error('It is probably connections-only, or LinkedIn changed the guest page.');
    console.error('Paste it instead with: npm run add:linkedin');
    process.exit(1);
  }

  const date = post.datePublished ? formatDate(post.datePublished) : currentMonthYear();
  const text = textToHtml(body);
  const images = imageCandidates(post);
  const embed = videoEmbed(post);

  let mediaArr = '[]';
  let thumb = "''";

  if (images.length) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
    const destBase = path.join(MEDIA_DIR, id);
    try {
      const saved = await downloadImage(images[0], destBase);
      const alt = String(post.headline || body).replace(/\s+/g, ' ').trim().slice(0, 140);
      mediaArr = `[{ type: 'image', src: ${JSON.stringify(saved)}, alt: ${JSON.stringify(alt)} }]`;
      thumb = JSON.stringify(saved);
      console.log('Saved image', saved);
      if (images.length > 1) {
        console.log(`Post has ${images.length} images. The carousel shows the first one.`);
      }
    } catch (err) {
      console.warn('Could not download the image:', err.message);
    }
  } else if (embed && /^https:\/\/www\.youtube\.com\/embed\//.test(embed)) {
    mediaArr = `[{ type: 'video', src: ${JSON.stringify(embed)} }]`;
    console.log('Attached YouTube embed', embed);
  } else if (post.video) {
    console.warn('This post has a LinkedIn video. The public page does not give a file you can keep.');
    console.warn('Drop an mp4 in assets/linkedin/ and point media at it.');
  }

  prependEntry(renderEntry({ id, date, text, mediaArr, thumb }));
  console.log('');
  console.log('Added', id, `(${date})`);
  console.log(body.slice(0, 140).replace(/\s+/g, ' ') + (body.length > 140 ? '...' : ''));
}

async function downloadImage(url, destBase) {
  const res = await fetchBuffer(url);
  const ext = extFor(res.contentType, url);
  const dest = destBase + ext;
  fs.writeFileSync(dest, res.buffer);
  return path.relative(ROOT, dest).split(path.sep).join('/');
}

async function promptMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

  console.log('');
  console.log('── Add LinkedIn Post ─────────────────────────────────────────');
  console.log('No URL given. Tip: npm run add:linkedin -- <post-url>');
  console.log('Press Enter to accept defaults shown in [brackets].');
  console.log('');

  const defaultDate = currentMonthYear();
  const dateRaw = (await ask(`Date [${defaultDate}]: `)).trim();
  const date = dateRaw || defaultDate;

  console.log('');
  console.log('Paste your post text (paste it all on one line, or press Enter for placeholder):');
  const textRaw = (await ask('> ')).trim();
  const text = textRaw || '(fill in post text)';

  console.log('');
  const mediaChoice = (await ask('Media type? [none / image / video] (default: none): ')).trim().toLowerCase();

  let mediaArr = '[]';
  let thumb = "''";

  if (mediaChoice === 'image') {
    console.log('');
    console.log('Image path (e.g. assets/linkedin/filename.jpg)');
    console.log('Tip: put the image file in assets/linkedin/ first.');
    const src = (await ask('Path: ')).trim();
    const alt = (await ask('Alt text (optional): ')).trim();
    if (src) {
      mediaArr = `[{ type: 'image', src: ${JSON.stringify(src)}, alt: ${JSON.stringify(alt)} }]`;
      thumb = JSON.stringify(src);
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

  const id = 'li-' + slugify(text.slice(0, 40));
  prependEntry(renderEntry({ id, date, text, mediaArr, thumb }));

  console.log('');
  console.log('Added entry to data/linkedin-posts.js:');
  console.log('    id   :', id);
  console.log('    date :', date);
  console.log('    text :', text.slice(0, 60) + (text.length > 60 ? '...' : ''));
}

const arg = process.argv[2];
const run = arg ? importFromUrl(arg) : promptMode();
run.catch((err) => {
  console.error(err);
  process.exit(1);
});
