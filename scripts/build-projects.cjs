'use strict';
/**
 * Reads each devProjects and designProjects subfolder for project.md,
 * parses YAML frontmatter (gray-matter), and writes generated/projects.json.
 *
 * Optional frontmatter: featured: true — homepage shows up to 3 dev + 1 design featured.
 * Optional: draft: true — skip publishing (folder stays in repo).
 * Optional: wip: true — card shows a work-in-progress tag and will not open. Delete the line to publish.
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'generated', 'projects.json');
const COVER_NAMES = ['COVER.png', 'COVER.jpg', 'COVER.jpeg', 'COVER.webp', 'COVER.svg', 'COVER.gif'];

function listDirs(absDir) {
  if (!fs.existsSync(absDir)) return [];
  return fs
    .readdirSync(absDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();
}

function findDefaultCover(projectDir) {
  for (const name of COVER_NAMES) {
    if (fs.existsSync(path.join(projectDir, name))) return name;
  }
  return null;
}

function svgToDataUri(absPath) {
  const raw = fs.readFileSync(absPath, 'utf8');
  return 'data:image/svg+xml,' + encodeURIComponent(raw);
}

function resolveUrl({ folderName, slug, projectDir, value, fallback }) {
  let rel = value;
  if (!rel && fallback) rel = fallback;
  if (!rel) rel = findDefaultCover(projectDir);
  if (!rel) return '';
  if (/^https?:\/\//i.test(rel)) return rel;
  if (rel.startsWith('/')) return rel;
  if (rel.startsWith('assets/') || rel.startsWith('designProjects/') || rel.startsWith('devProjects/')) {
    return '/' + rel.replace(/\\/g, '/');
  }
  const relPath = `${folderName}/${slug}/${rel}`.replace(/\\/g, '/');
  if (rel.toLowerCase().endsWith('.svg')) {
    const absPath = path.join(ROOT, relPath);
    if (fs.existsSync(absPath)) return svgToDataUri(absPath);
  }
  return '/' + relPath;
}

function parseDateSort(dateStr) {
  if (!dateStr) return 0;
  const matches = [...String(dateStr).matchAll(/(\d{1,2})\s*\/\s*(\d{4})/g)];
  if (!matches.length) return 0;
  return Math.max(...matches.map((m) => parseInt(m[2], 10) * 100 + parseInt(m[1], 10)));
}

function formatDateLabel(dateStr, ongoing) {
  if (!dateStr) return '';
  const raw = String(dateStr).trim().replace(/\s+-\s+/g, ' – ');
  if (ongoing && !/present/i.test(raw)) return raw + ' – Present';
  return raw;
}

function loadProject(folderName, categoryKey, slug) {
  const projectDir = path.join(ROOT, folderName, slug);
  const mdPath = path.join(projectDir, 'project.md');
  if (!fs.existsSync(mdPath)) {
    console.warn('Missing project.md:', mdPath);
    return null;
  }
  const raw = fs.readFileSync(mdPath, 'utf8');
  const { data, content } = matter(raw);
  if (data.draft || data.published === false) return null;
  const defaultKind = categoryKey === 'design' ? 'design' : 'dev';
  return {
    id: slug,
    title: data.title || slug,
    description: data.description || '',
    github: data.github || '',
    kind: data.kind || defaultKind,
    galleryId: data.galleryId || '',
    coverUrl: resolveUrl({ folderName, slug, projectDir, value: data.cover }),
    coverSize: data.cover_size || '',
    coverBg: data.cover_bg || '',
    cardFit: data.card_fit || '',
    cardScale: Number(data.card_scale) || 0,
    headerUrl: resolveUrl({
      folderName,
      slug,
      projectDir,
      value: data.header,
      fallback: data.cover,
    }),
    dateLabel: formatDateLabel(data.date, data.ongoing),
    dateSort: parseDateSort(data.date),
    ongoing: !!data.ongoing,
    featured: !!data.featured,
    wip: !!data.wip,
    bodyHtml: content.trim(),
  };
}

function main() {
  const designProjects = listDirs(path.join(ROOT, 'designProjects'))
    .map((s) => loadProject('designProjects', 'design', s))
    .filter(Boolean)
    .sort((a, b) => b.dateSort - a.dateSort);
  const devProjects = listDirs(path.join(ROOT, 'devProjects'))
    .map((s) => loadProject('devProjects', 'dev', s))
    .filter(Boolean)
    .sort((a, b) => b.dateSort - a.dateSort);

  const payload = { design: designProjects, dev: devProjects };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2), 'utf8');
  console.log('Wrote', path.relative(ROOT, OUT));
  console.log(
    'Projects:',
    [...designProjects, ...devProjects].map((p) => p.id).join(', ') || '(none)',
  );
}

main();
