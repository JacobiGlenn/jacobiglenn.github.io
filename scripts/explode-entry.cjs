'use strict';
/**
 * Remove the newest LinkedIn post or YouTube video.
 *
 * Usage:
 *   npm run explode:youtube
 *   npm run explode:linkedin
 *
 * Newest-first files: this deletes the first object in the array.
 * A LinkedIn image saved as assets/linkedin/li-<id>.<ext> is removed with the post.
 * It will not delete a photo you named yourself.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TARGETS = {
  youtube: {
    file: path.join(ROOT, 'data', 'youtube-videos.js'),
    marker: 'export const YOUTUBE_VIDEOS = [',
  },
  linkedin: {
    file: path.join(ROOT, 'data', 'linkedin-posts.js'),
    marker: 'export const LINKEDIN_POSTS = [',
  },
};

function removeNewest(src, marker) {
  const idx = src.indexOf(marker);
  if (idx < 0) return null;
  const start = src.indexOf('{', idx + marker.length);
  if (start < 0) return null;
  let i = start;
  let depth = 0;
  let quote = null;
  while (i < src.length) {
    const c = src[i];
    if (quote) {
      if (c === '\\') i += 2;
      else {
        if (c === quote) quote = null;
        i += 1;
      }
      continue;
    }
    if (c === '"' || c === "'" || c === '`') {
      quote = c;
      i += 1;
      continue;
    }
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) {
        i += 1;
        break;
      }
    }
    i += 1;
  }
  let end = i;
  if (src[end] === ',') end += 1;
  if (src[end] === '\r') end += 1;
  if (src[end] === '\n') end += 1;
  const lineBreak = src.lastIndexOf('\n', start);
  const from = lineBreak >= idx ? lineBreak + 1 : start;
  return { next: src.slice(0, from) + src.slice(end), block: src.slice(from, end) };
}

function linkedInAsset(block) {
  const match = block.match(/assets\/linkedin\/(li-\d+)\.(?:jpe?g|png|webp|gif)/);
  return match ? match[0] : null;
}

const which = process.argv[2];
const target = TARGETS[which];
if (!target) {
  console.error('Usage: node scripts/explode-entry.cjs <youtube|linkedin>');
  process.exit(1);
}

const original = fs.readFileSync(target.file, 'utf8');
const removed = removeNewest(original, target.marker);
if (!removed) {
  console.error('Nothing to remove in', path.relative(ROOT, target.file));
  process.exit(1);
}

fs.writeFileSync(target.file, removed.next, 'utf8');
const idMatch = removed.block.match(/id:\s*["']([^"']+)["']/);
console.log('Removed', idMatch ? idMatch[1] : 'the newest entry', 'from', path.relative(ROOT, target.file));

if (which === 'linkedin') {
  const asset = linkedInAsset(removed.block);
  if (asset) {
    const abs = path.join(ROOT, asset);
    if (fs.existsSync(abs)) {
      fs.unlinkSync(abs);
      console.log('Deleted', asset);
    }
  }
}
