'use strict';
/**
 * Reads each blog/ subfolder for post.md, parses YAML frontmatter,
 * and writes generated/blog-data.js for index.html.
 *
 * Frontmatter fields:
 *   title    – Post title (required)
 *   date     – "MM/YYYY" format (required for sorting)
 *   cover    – Filename inside the post folder (e.g. "COVER.jpg"), optional
 *   excerpt  – Short teaser shown on the card (auto-generated from body if absent)
 */
const fs   = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT     = path.join(__dirname, '..');
const BLOG_DIR = path.join(ROOT, 'blog');
const OUT      = path.join(ROOT, 'generated', 'blog-data.js');

const COVER_NAMES = ['COVER.png', 'COVER.jpg', 'COVER.jpeg', 'COVER.webp', 'COVER.gif'];

function listDirs(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();
}

function parseDateSort(dateStr) {
  if (!dateStr) return 0;
  const parts = String(dateStr).split('/');
  return parseInt(parts[1] || 0) * 100 + parseInt(parts[0] || 0);
}

function formatDateDisplay(dateStr) {
  if (!dateStr) return '';
  const parts = String(dateStr).split('/');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[parseInt(parts[0]) - 1] || parts[0];
  return `${month} ${parts[1] || ''}`.trim();
}

function findCover(postDir, slug) {
  for (const name of COVER_NAMES) {
    if (fs.existsSync(path.join(postDir, name))) {
      return `blog/${slug}/${name}`;
    }
  }
  return '';
}

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function loadPost(slug) {
  const postDir = path.join(BLOG_DIR, slug);
  const mdPath  = path.join(postDir, 'post.md');
  if (!fs.existsSync(mdPath)) {
    console.warn('Missing post.md:', mdPath);
    return null;
  }
  const raw = fs.readFileSync(mdPath, 'utf8');
  const { data, content } = matter(raw);
  const bodyHtml = content.trim();

  const coverUrl = data.cover
    ? `blog/${slug}/${data.cover}`
    : findCover(postDir, slug);

  const excerptRaw = data.excerpt || stripHtml(bodyHtml).slice(0, 180).trim();
  const excerpt = excerptRaw.length >= 180 ? excerptRaw + '...' : excerptRaw;

  return {
    id:          slug,
    title:       data.title || slug,
    date:        data.date  || '',
    dateDisplay: formatDateDisplay(data.date),
    dateSort:    parseDateSort(data.date),
    coverUrl,
    excerpt,
    bodyHtml
  };
}

function main() {
  const slugs = listDirs(BLOG_DIR);
  const posts = slugs.map(loadPost).filter(Boolean);
  posts.sort((a, b) => b.dateSort - a.dateSort);

  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, 'window.__GENERATED_BLOG=' + JSON.stringify(posts) + ';', 'utf8');
  console.log('Wrote', path.relative(ROOT, OUT));
  console.log('Blog posts:', posts.map(p => p.id).join(', ') || '(none)');
}

main();
