'use strict';
/**
 * Writes generated/experience.json from data/experience.json.
 * If data/linkedin/Positions.csv exists (LinkedIn data export), merge
 * company/title/dates/location/description onto matching overlay records.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'data', 'experience.json');
const CSV = path.join(ROOT, 'data', 'linkedin', 'Positions.csv');
const OUT = path.join(ROOT, 'generated', 'experience.json');

function keyOf(company, title) {
  return `${company}|${title}`.toLowerCase().replace(/\s+/g, ' ').trim();
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          cur += '"';
          i++;
        } else inQuotes = false;
      } else cur += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ',') {
      row.push(cur);
      cur = '';
    } else if (c === '\n') {
      row.push(cur);
      rows.push(row);
      row = [];
      cur = '';
    } else if (c !== '\r') cur += c;
  }
  if (cur.length || row.length) {
    row.push(cur);
    rows.push(row);
  }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => {
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = (r[i] || '').trim();
    });
    return obj;
  });
}

function parseLinkedInDate(s) {
  if (!s) return '';
  const d = new Date(s);
  if (!Number.isNaN(d.getTime())) {
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  return s;
}

function main() {
  if (!fs.existsSync(SRC)) {
    console.error('Missing', SRC);
    process.exit(1);
  }
  const base = JSON.parse(fs.readFileSync(SRC, 'utf8'));
  if (fs.existsSync(CSV)) {
    const positions = parseCsv(fs.readFileSync(CSV, 'utf8'));
    const byKey = new Map(base.jobs.map((j) => [keyOf(j.company, j.title), j]));
    for (const p of positions) {
      const company = p['Company Name'] || p.Company || p.company || '';
      const title = p.Title || p.Position || p.title || '';
      if (!company || !title) continue;
      const k = keyOf(company, title);
      const start = parseLinkedInDate(p['Started On'] || p.StartedOn || p.start);
      const endRaw = p['Finished On'] || p.FinishedOn || p.end || '';
      const end = endRaw ? parseLinkedInDate(endRaw) : 'Present';
      const location = p.Location || p.location || '';
      const desc = p.Description || p.description || '';
      const existing = byKey.get(k);
      const dateLabel = start ? `${start} – ${end}` : existing?.dateLabel || '';
      if (existing) {
        existing.company = company;
        existing.title = title;
        if (location) existing.location = location;
        if (dateLabel) existing.dateLabel = dateLabel;
        if (start) existing.start = start;
        existing.end = end;
        if (desc && (!existing.bullets || !existing.bullets.length)) {
          existing.bullets = desc.split(/\n+/).filter(Boolean);
        }
      } else {
        base.jobs.push({
          id: k.replace(/[^a-z0-9]+/g, '-').slice(0, 40),
          company,
          title,
          location,
          start,
          end,
          dateLabel,
          dateSort: 0,
          bullets: desc.split(/\n+/).filter(Boolean),
          tags: [],
          category: 'tech',
          logo: { bg: '#1a241c', color: '#c5f240', letter: company.slice(0, 2).toUpperCase() },
          photos: [],
        });
      }
    }
    console.log('Merged LinkedIn Positions.csv');
  }
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(base, null, 2), 'utf8');
  console.log('Wrote', path.relative(ROOT, OUT));
}

main();
