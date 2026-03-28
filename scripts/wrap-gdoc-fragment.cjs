const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const raw = fs.readFileSync(path.join(root, 'blog/welcome/gdoc-raw.txt'), 'utf8');
const inner = raw.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const out =
  '<details class="b-doc-details" style="border:1px solid #e5e7eb;border-radius:10px;padding:0 1rem 1rem;margin:0 0 1.25rem">' +
  '<summary style="cursor:pointer;padding:0.9rem 0;font-weight:800;color:#374151">Open the actual Google Doc paste (long, scrollable)</summary>' +
  '<pre class="b-doc-scroll">' +
  inner +
  '</pre></details>';
fs.writeFileSync(path.join(root, 'blog/welcome/_inject-fragment.html'), out, 'utf8');
console.log('Wrote blog/welcome/_inject-fragment.html');
