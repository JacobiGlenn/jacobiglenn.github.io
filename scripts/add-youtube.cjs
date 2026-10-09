'use strict';
/**
 * Add a YouTube video to data/youtube-videos.js from a URL.
 *
 * Usage:
 *   npm run add:youtube -- https://youtu.be/VIDEO_ID
 *   npm run add:youtube -- "https://www.youtube.com/watch?v=VIDEO_ID"
 *
 * Pulls the title (oEmbed), the description, and the publish month from the
 * public watch page. The card thumbnail is YouTube's own image, built from
 * the video id at render time, so nothing is downloaded.
 *
 * Undo the newest entry with: npm run explode:youtube
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'data', 'youtube-videos.js');
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function fetchText(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) {
      reject(new Error('Too many redirects'));
      return;
    }
    https.get(url, { headers: { 'User-Agent': UA, Accept: 'text/html,application/json' } }, (res) => {
      const code = res.statusCode || 0;
      if (code >= 300 && code < 400 && res.headers.location) {
        res.resume();
        resolve(fetchText(new URL(res.headers.location, url).href, redirects + 1));
        return;
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        if (code !== 200) {
          reject(new Error(`Request failed (${code})`));
          return;
        }
        resolve(Buffer.concat(chunks).toString('utf8'));
      });
    }).on('error', reject);
  });
}

function extractVideoId(input) {
  const match = String(input).match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function readJsonString(html, key) {
  const token = `"${key}":"`;
  const at = html.indexOf(token);
  if (at < 0) return '';
  let i = at + token.length;
  let out = '';
  while (i < html.length) {
    const c = html[i];
    if (c === '\\') {
      const n = html[i + 1];
      if (n === 'n') out += '\n';
      else if (n === 'r') out += '';
      else if (n === 't') out += ' ';
      else if (n === 'u') {
        out += String.fromCharCode(parseInt(html.slice(i + 2, i + 6), 16));
        i += 6;
        continue;
      } else if (n) out += n;
      i += 2;
      continue;
    }
    if (c === '"') break;
    out += c;
    i += 1;
  }
  return out;
}

function formatDate(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'America/Los_Angeles',
  });
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

function flattenDescription(text) {
  return text.replace(/\s+/g, ' ').trim();
}

async function main() {
  const rawUrl = process.argv[2];
  if (!rawUrl) {
    console.error('Usage: npm run add:youtube -- <youtube-url>');
    process.exit(1);
  }
  const videoId = extractVideoId(rawUrl);
  if (!videoId) {
    console.error('Could not find a video id in that URL.');
    process.exit(1);
  }

  const original = fs.readFileSync(DATA_FILE, 'utf8');
  if (original.includes(`videoId: '${videoId}'`) || original.includes(`videoId: "${videoId}"`)) {
    console.error(`Already in data/youtube-videos.js (${videoId}).`);
    process.exit(1);
  }

  let title = `YouTube video ${videoId}`;
  let description = '';
  let date = formatDate('');

  try {
    const oembed = JSON.parse(await fetchText(
      `https://www.youtube.com/oembed?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${videoId}`)}&format=json`,
    ));
    if (oembed.title) title = oembed.title;
    console.log('Title:', title);
  } catch (err) {
    console.warn('Could not fetch the title:', err.message);
  }

  try {
    const html = await fetchText(`https://www.youtube.com/watch?v=${videoId}`);
    const short = readJsonString(html, 'shortDescription');
    description = flattenDescription(short);
    const published = readJsonString(html, 'publishDate');
    if (published) date = formatDate(published);
    if (description) console.log('Description:', description.slice(0, 120) + (description.length > 120 ? '...' : ''));
    else console.warn('No public description. The field was left blank.');
  } catch (err) {
    console.warn('Could not read the watch page:', err.message);
  }

  const id = 'yt-' + (slugify(title) || videoId);
  const entry = `  {
    id: ${JSON.stringify(id)},
    videoId: ${JSON.stringify(videoId)},
    date: ${JSON.stringify(date)},
    title: ${JSON.stringify(title)},
    description: ${JSON.stringify(description)}
  }`;

  const insertAfter = 'export const YOUTUBE_VIDEOS = [';
  const idx = original.indexOf(insertAfter);
  if (idx === -1) {
    console.error('Could not find export const YOUTUBE_VIDEOS = [ in', DATA_FILE);
    process.exit(1);
  }
  const insertAt = idx + insertAfter.length;
  const rest = original.slice(insertAt);
  const needsComma = rest.trimStart().startsWith('{') || rest.trimStart().startsWith('//');
  const updated = original.slice(0, insertAt) + '\n' + entry + (needsComma ? ',' : '') + rest;
  fs.writeFileSync(DATA_FILE, updated, 'utf8');
  console.log('');
  console.log('Added', id, `(${date})`);
  console.log('Thumbnail comes from YouTube: https://i.ytimg.com/vi/' + videoId + '/hqdefault.jpg');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
