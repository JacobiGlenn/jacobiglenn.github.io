---
title: This portfolio site
description: "The site you are on: one HTML file, GitHub Pages, and the write-up with real screenshots lives here."
github: https://github.com/JacobiGlenn/jacobiglenn.github.io
kind: dev
cover: COVER.png
---

<p class="project-detail-reader-note">This dev write-up is a little unusual: the &ldquo;project&rdquo; is the portfolio itself—the single page you are on right now. The screenshots below were captured from a local run so you can see the same UI in context.</p>
<p class="project-detail-lead"><strong>jacobiglenn.github.io</strong> is a static personal site hosted on <strong>GitHub Pages</strong> (<code>.nojekyll</code>, optional <code>CNAME</code>). Almost everything lives in one <code>index.html</code>: terminal intro, optional &ldquo;CRS&rdquo; glitch mode, portfolio navigation, design/dev case studies, and the project-detail view you are reading.</p>
<h2 class="project-detail-h2">Landing: four-panel terminal</h2>
<p>First visit (or after clearing site data) you get a retro terminal layout: prompt, ASCII art panel, log stream, and guide text. Type <code>Initialize</code> to start the flow; returning visitors within 24 hours can skip straight to the main shell unless the special <code>cGG</code> path runs.</p>
<figure class="project-detail-fig tall-img"><img src="assets/dev-site-terminal.png" width="1280" height="800" alt="Screenshot of the four-panel terminal landing screen" loading="lazy" decoding="async"><figcaption>Captured from local <code>npx serve</code> — the boot experience before the main portfolio.</figcaption></figure>
<h2 class="project-detail-h2">Main portfolio shell</h2>
<p>After the intro, the top bar stays fixed while you scroll: Home, Portfolios (Designer / Developer), Work Experience, Blog, About. The light content area below is where list pages and project cards render.</p>
<figure class="project-detail-fig tall-img"><img src="assets/dev-site-home.png" width="1280" height="800" alt="Screenshot of the Home page with navigation" loading="lazy" decoding="async"><figcaption>Home view with the shared nav — scroll stays under the bar.</figcaption></figure>
<h2 class="project-detail-h2">Developer tab and this card</h2>
<p>The Developer section lists projects as cards with a header strip (placeholder art), title, short blurb, and a GitHub icon. You opened this write-up from the card that points at this repository.</p>
<figure class="project-detail-fig tall-img"><img src="assets/dev-site-developer.png" width="1280" height="800" alt="Screenshot of the Developer portfolio page with project card" loading="lazy" decoding="async"><figcaption>Projects list — the card you clicked is the one describing this site.</figcaption></figure>
<h2 class="project-detail-h2">Actual code from this file</h2>
<p>Project metadata and long-form HTML for each case study now live under <code>designProjects/</code> and <code>devProjects/</code> as <code>project.md</code> files. A build step writes <code>generated/projects-data.js</code>, which <code>index.html</code> loads so cards and detail views stay in sync. Below is the shape of that generated file (trimmed).</p>
<div class="project-detail-code-wrap"><div class="project-detail-code-label">generated/projects-data.js</div><pre class="project-detail-pre">window.__GENERATED_PROJECTS = {
  PROJECT_PAGES: {
    &quot;design-example&quot;: { title, kind, galleryId, coverUrl, bodyHtml, ... },
    &quot;dev-example&quot;: { title, kind, githubUrl, coverUrl, bodyHtml, ... }
  },
  cardsHtml: { design: &quot;...&quot;, dev: &quot;...&quot; }
};</pre></div>
<p class="project-detail-code-caption">Card keys line up with <code>data-project</code> on each card and drive <code>openProjectDetail(id)</code>. Run <code>npm run build:projects</code> after editing a <code>project.md</code>.</p>
<h2 class="project-detail-h2">This article, full-page</h2>
<p>Project detail uses the gray hero strip, left-aligned title, full-width body, and centered figures—same layout you see scrolling here. The capture below is the long page including reader note, screenshots, and code block.</p>
<figure class="project-detail-fig tall-img"><img src="assets/dev-site-project-detail.png" width="1280" alt="Full-page screenshot of this portfolio project write-up" loading="lazy" decoding="async"><figcaption>Full-page capture of this write-up (scrollable in the browser).</figcaption></figure>
<h2 class="project-detail-h2">Shipping &amp; refresh</h2>
<p>Pushing to <code>main</code> updates GitHub Pages. To regenerate the PNGs in <code>assets/</code> after layout changes, run <code>npx serve</code> then <code>npm run screenshots</code> (Playwright loads the local site and saves captures).</p>
<p><strong>Repository:</strong> <a href="https://github.com/JacobiGlenn/jacobiglenn.github.io" target="_blank" rel="noopener noreferrer" class="clean-link">github.com/JacobiGlenn/jacobiglenn.github.io</a> — same site you are reading; fork or browse <code>index.html</code> on GitHub.</p>
