'use strict';
/**
 * Reads each devProjects and designProjects subfolder for project.md,
 * parses YAML frontmatter (gray-matter), and writes generated/projects-data.js
 * for index.html (PROJECT_PAGES + portfolio card HTML).
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'generated', 'projects-data.js');

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
  // URL-encode the SVG so it can be used directly in url() without base64 bloat
  return 'data:image/svg+xml,' + encodeURIComponent(raw);
}

function resolveUrl({ folderName, slug, projectDir, value, fallback }) {
  let rel = value;
  if (!rel && fallback) rel = fallback;
  if (!rel) rel = findDefaultCover(projectDir);
  if (!rel) return '';
  if (/^https?:\/\//i.test(rel)) return rel;
  if (rel.startsWith('assets/')) return rel;
  const relPath = `${folderName}/${slug}/${rel}`.replace(/\\/g, '/');
  // Inline SVG files as data URIs so they always render as CSS background-image
  if (rel.toLowerCase().endsWith('.svg')) {
    const absPath = path.join(ROOT, relPath);
    if (fs.existsSync(absPath)) return svgToDataUri(absPath);
  }
  return relPath;
}

function resolveCoverUrl({ folderName, slug, projectDir, cover }) {
  return resolveUrl({ folderName, slug, projectDir, value: cover });
}

function parseDateSort(dateStr) {
  // Parses "MM/YYYY" into a sortable number YYYYMM (higher = newer)
  if (!dateStr) return 0;
  const [mm, yyyy] = String(dateStr).split('/');
  return parseInt(yyyy || 0) * 100 + parseInt(mm || 0);
}

function formatDateLabel(dateStr, ongoing) {
  if (!dateStr) return '';
  return ongoing ? dateStr + ' – Present' : dateStr;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHeaderStyle(p, fallbackColor) {
  if (!p.coverUrl) return '';
  const size = p.coverSize || 'cover';
  return ` style="background: ${fallbackColor} url(&quot;${escapeHtml(p.coverUrl)}&quot;) center / ${size} no-repeat;"`;
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
  const bodyHtml = content.trim();
  const defaultKind = categoryKey === 'design' ? 'design' : 'dev';
  const coverUrl = resolveUrl({ folderName, slug, projectDir, value: data.cover });
  const headerUrl = resolveUrl({ folderName, slug, projectDir, value: data.header, fallback: data.cover });
  const dateLabel = formatDateLabel(data.date, data.ongoing);
  const dateSort = parseDateSort(data.date);
  return {
    id: slug,
    title: data.title || slug,
    description: data.description || '',
    github: data.github || '',
    kind: data.kind || defaultKind,
    galleryId: data.galleryId || '',
    coverUrl,
    coverSize: data.cover_size || '',
    headerUrl,
    dateLabel,
    dateSort,
    ongoing: !!data.ongoing,
    bodyHtml
  };
}

function buildDesignCard(p) {
  const galleryBtn = p.galleryId
    ? `<button type="button" class="design-gallery-trigger" data-gallery="${escapeHtml(p.galleryId)}" aria-label="View featured images"><span class="design-stack" aria-hidden="true"><span class="design-stack-layer"></span><span class="design-stack-layer"></span><span class="design-stack-layer"></span></span></button>`
    : '';
  const datePill = p.dateLabel ? `<span class="project-card-date">${escapeHtml(p.dateLabel)}</span>` : '';
  return `<article class="project-card" data-project="${escapeHtml(p.id)}"><div class="project-card-header"${buildHeaderStyle(p, '#ececec')}><div class="project-card-header-inner"><span class="project-card-name">${escapeHtml(p.title)}</span>${galleryBtn}</div></div>${datePill}<div class="project-card-desc">${escapeHtml(p.description)}</div></article>`;
}

function buildDevCard(p) {
  const gh = p.github
    ? `<a href="${escapeHtml(p.github)}" target="_blank" rel="noopener noreferrer" class="project-card-github" aria-label="View on GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg></a>`
    : '';
  const datePill = p.dateLabel ? `<span class="project-card-date">${escapeHtml(p.dateLabel)}</span>` : '';
  return `<article class="project-card" data-project="${escapeHtml(p.id)}"><div class="project-card-header"${buildHeaderStyle(p, '#4b5563')}><div class="project-card-header-inner"><span class="project-card-name">${escapeHtml(p.title)}</span>${gh}</div></div>${datePill}<div class="project-card-desc">${escapeHtml(p.description)}</div></article>`;
}

function main() {
  const designSlugs = listDirs(path.join(ROOT, 'designProjects'));
  const devSlugs = listDirs(path.join(ROOT, 'devProjects'));

  const designProjects = designSlugs.map((s) => loadProject('designProjects', 'design', s)).filter(Boolean);
  const devProjects = devSlugs.map((s) => loadProject('devProjects', 'dev', s)).filter(Boolean);

  // Sort newest first
  designProjects.sort((a, b) => b.dateSort - a.dateSort);
  devProjects.sort((a, b) => b.dateSort - a.dateSort);

  const PROJECT_PAGES = {};
  function addPages(list) {
    for (const p of list) {
      const entry = {
        title: p.title,
        kind: p.kind,
        bodyHtml: p.bodyHtml
      };
      if (p.github) entry.githubUrl = p.github;
      if (p.galleryId) entry.galleryId = p.galleryId;
      if (p.coverUrl) entry.coverUrl = p.coverUrl;
      if (p.headerUrl) entry.headerUrl = p.headerUrl;
      PROJECT_PAGES[p.id] = entry;
    }
  }
  addPages(designProjects);
  addPages(devProjects);

  const cardsHtml = {
    design: designProjects.map(buildDesignCard).join(''),
    dev: devProjects.map(buildDevCard).join('')
  };

  // Runtime-sortable card data so index.html can re-sort by current date
  const cardsData = {
    design: designProjects.map((p) => ({ id: p.id, dateSort: p.dateSort, ongoing: !!p.ongoing, html: buildDesignCard(p) })),
    dev:    devProjects.map((p)    => ({ id: p.id, dateSort: p.dateSort, ongoing: !!p.ongoing, html: buildDevCard(p) }))
  };

  const payload = { PROJECT_PAGES, cardsHtml, cardsData };
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, 'window.__GENERATED_PROJECTS=' + JSON.stringify(payload) + ';', 'utf8');
  console.log('Wrote', path.relative(ROOT, OUT));
  console.log('Projects:', Object.keys(PROJECT_PAGES).join(', ') || '(none)');
}

main();
