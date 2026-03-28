---
title: "Welcome to my website"
date: "03/2026"
banner: ascii-face
excerpt: "The full story: failed matrix rain, a broken JSONBin key, a globe that never worked, and how a personal portfolio became something I'm genuinely proud of."
---

<style>
.b-split { display: grid; grid-template-columns: 1fr 1fr; gap: 1.75rem; align-items: start; margin: 0 0 1.75rem; }
.b-split-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin: 0 0 1.75rem; }
.b-card { background: #f8f9fa; border-radius: 10px; padding: 1.1rem 1.25rem; min-width: 0; }
.b-card--dark { background: #1a1a2e; color: #e0e0e0; border-radius: 10px; padding: 1.1rem 1.25rem; min-width: 0; }
.b-tag { display: inline-block; background: #ede9fe; color: #6366f1; font-size: 0.72rem; font-weight: 700; padding: 0.2em 0.65em; border-radius: 20px; letter-spacing: 0.04em; text-transform: uppercase; margin: 0 0.2rem 0.3rem 0; }
.b-tag--green { background: #d1fae5; color: #059669; }
.b-tag--amber { background: #fef3c7; color: #b45309; }
.b-tag--red { background: #fee2e2; color: #dc2626; }
.b-timeline { position: relative; padding-left: 1.75rem; }
.b-timeline::before { content:''; position:absolute; left:0; top:0; bottom:0; width:2px; background:#e5e7eb; border-radius:2px; }
.b-titem { position: relative; margin-bottom: 1.5rem; }
.b-titem::before { content:''; position:absolute; left:-1.75rem; top:0.25rem; width:10px; height:10px; border-radius:50%; background:#6366f1; transform:translateX(-4px); border:2px solid #fff; box-shadow:0 0 0 2px #6366f1; }
.b-quote { border-left: 4px solid #6366f1; padding: 0.6rem 1.25rem; margin: 0 0 1.5rem; background: #f5f3ff; border-radius: 0 8px 8px 0; font-style: italic; color: #4b5563; }
.b-fullimg { width: 100%; display: block; border-radius: 8px; margin: 0 0 1.75rem; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
pre, code { word-break: break-word; }
.b-doc-scroll { max-height: min(70vh, 560px); overflow: auto; background: #12121c; color: #dce0ec; font-family: Consolas, 'Courier New', monospace; font-size: 0.64rem; line-height: 1.4; padding: 1rem 1.15rem; border-radius: 8px; margin: 0 0 1rem; white-space: pre; tab-size: 2; border: 1px solid #2d2d40; }
details.b-doc-details summary { list-style: none; }
details.b-doc-details summary::-webkit-details-marker { display: none; }
@media (max-width: 700px) {
  .b-split, .b-split-3 { grid-template-columns: 1fr; }
  pre { font-size: 0.72rem !important; }
}
</style>

<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin:0 0 1.25rem">
  <span class="b-tag">Engineering</span>
  <span class="b-tag b-tag--green">Lessons Learned</span>
  <span class="b-tag b-tag--amber">War Stories</span>
  <span class="b-tag">Design</span>
  <span class="b-tag b-tag--red">Things That Broke</span>
</div>

<p style="font-size:1.18rem;line-height:1.8;color:#111;font-weight:500;margin:0 0 1rem">The spinning ASCII face on the banner above this post is not a GIF. It's a <code style="background:#f0f0f0;padding:0.1em 0.4em;border-radius:4px">requestAnimationFrame</code> loop, 60 frames per second, mathematically rotating a portrait like a globe. It's probably the best metaphor for how this whole site was built: technically unnecessary, genuinely interesting, and arrived at through a weekend of failures.</p>

<p>This post is the full story. The origin, the vision, the failed experiments, the actual technical problems I hit and how I solved them. It's not a portfolio overview. There are pages for that. This is the behind-the-scenes.</p>

<p style="margin:0 0 1rem;color:#555;font-size:0.98rem">If you only care about <strong>right now</strong>: I'm at UCI in Software Engineering and Computer Science, building and teaching on the side. The timeline below is a map; the college chapter is the one that matches what I'm doing today. High school is context, not coursework I'm still leading with.</p>

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Timeline</h2>

<div class="b-timeline" style="margin:0 0 2rem">
  <div class="b-titem"><strong>Early years</strong> — Born in California.</div>
  <div class="b-titem"><strong>Age 12</strong> — Family moved to Oregon (Portland area).</div>
  <div class="b-titem"><strong>High school</strong> — Tualatin: broadcasting, design and social for school teams, robotics and game dev, competitions, first apps people actually used. The next section goes deep; this line is just orientation.</div>
  <div class="b-titem"><strong>End of senior year</strong> — Enlisted in the Army National Guard.</div>
  <div class="b-titem" style="margin-bottom:0"><strong>College (now)</strong> — UC Irvine, SE + CS; Commit the Change, Code Ninjas instruction, Guard, hackathons, and the projects on this site.</div>
</div>

<p style="margin:0 0 1.25rem;font-size:0.92rem;color:#555">On the military side, for anyone who wants the actual job title: I am a <strong>15H</strong> (aircraft pneudraulics repairer) working on <strong>UH-60 Black Hawk</strong> systems. I keep MOS and platform off the short About page and the résumé-style Work Experience card on purpose — fewer places to keep in sync — so this post is where that detail lives.</p>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Where I Started</h2>

<p style="margin:0 0 0.85rem">Freshman year of high school I was deep into <strong>game development</strong> and still assumed I would become a <strong>pediatrician</strong>, not an engineer. I watched a YouTuber named <strong>Dani</strong> ship funny, polished games. I did <strong>yard work for neighbors</strong> until I could afford a PC, installed <strong>Unity</strong>, and lived in C# tutorials. I did not seriously pick up Python until <strong>senior year</strong>. Before that it was mostly C#, stubbornness, and copy-paste from videos.</p>

<p style="margin:0 0 0.85rem">All four years I took <strong>IT</strong> classes. That is what pulled me into the wider tech space: <strong>cybersecurity</strong>, terminals, ports, hardware, how networks actually behave. I passed the <strong>first half of CompTIA A+</strong> and never got around to finishing the second exam. The labs and theory still shaped how I think about systems.</p>

<p style="margin:0 0 0.85rem">I grew up in <strong>Tualatin, Oregon</strong>, a suburb of Portland where the closest tech scene was a long drive away. My "version control" was a <strong>Google Doc</strong> where I pasted scripts whole. The tab title was basically <strong>cobi = best coder</strong>. Objectively false, spiritually accurate.</p>

<p style="margin:0 0 1rem;font-size:0.92rem;color:#555">The dump below is the real flavor: duplicate camera controllers (one labeled broken clamps), old clunky movement, a CharacterController mash-up with crouch on <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">X</code>, and an FPS sprint script for a game we called Scotty Potty. I trimmed only the middle of the longest file so the page loads. Regenerate the HTML from <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">blog/welcome/gdoc-raw.txt</code> via <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">node scripts/wrap-gdoc-fragment.cjs</code> before <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">npm run build:blog</code>.</p>

<!--BLOG_GDOC_FRAGMENT-->

<p style="margin:1.25rem 0 0.85rem">By senior year I was editing weekly news for the school's channel, airing every Wednesday to 2,500 students. I ran social for esports and tennis, stacked competition and coursework, and still entered Oregon's regional programming challenge, codeORcreate, where I won Best Presentation with an accessibility-focused public transit routing app judged by a panel of four. That was the first time I felt like I could actually make things people use.</p>

<p style="margin:0 0 0.85rem">The rest of the calendar was clubs: <strong>robotics</strong> (state champions my junior year), <strong>game design club</strong> (we showed a project at the <strong>Oregon Game Project Challenge</strong>), <strong>LEAP Youth Alliance</strong> (drug-prevention coalition with town halls and volunteer events), <strong>Key Club</strong>, <strong>National Honor Society</strong>, <strong>feminism club</strong>, and a few more. I am still not sure how that fit next to multiple jobs and sports.</p>

<p style="margin:0 0 1.25rem">Since <strong>December 2019</strong> I have run a personal YouTube channel. For years I posted about <strong>two videos a week</strong> and streamed a lot on the side. Around <strong>2024</strong> that slowed to about <strong>one video a month</strong>. I am planning to <strong>retire that channel in September</strong> and start a new one aimed at <strong>informational coding videos and project updates</strong>. The carousel on this site's Blog page is set up for whatever I publish next.</p>

<div class="b-card" style="font-size:0.9rem;margin:0">
<strong style="color:#6366f1">Fast forward:</strong> UC Irvine, double major Software Engineering and Computer Science, Army National Guard, Code Ninjas instructor teaching JavaScript and Unity C# to kids, designing real healthcare tools at Commit the Change, and two hackathon wins in the same school year. The About page in the nav stays short (where I am from, goals, contact); current roles live in Work Experience and LinkedIn.
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">The Brief</h2>

<p>I've worked as a designer and as a developer. The tools are different but the goal is the same: make something that communicates clearly and looks like someone cared. I wanted a portfolio that didn't look like every other student portfolio. No Wix, no generic template, no "here are my three projects arranged in a grid please hire me."</p>

<div class="b-split-3">
  <div class="b-card" style="border-left:4px solid #6366f1">
    <p style="font-size:0.75rem;color:#888;margin:0 0 0.3rem;text-transform:uppercase;letter-spacing:0.06em">Design Goal</p>
    <p style="font-weight:700;margin:0 0 0.35rem">Two personalities, one site</p>
    <p style="font-size:0.84rem;color:#555;margin:0">Clean for recruiters. Weird for people who dig in. The terminal mode exists specifically for the second group.</p>
  </div>
  <div class="b-card" style="border-left:4px solid #10b981">
    <p style="font-size:0.75rem;color:#888;margin:0 0 0.3rem;text-transform:uppercase;letter-spacing:0.06em">Architecture Goal</p>
    <p style="font-weight:700;margin:0 0 0.35rem">Zero friction to expand</p>
    <p style="font-size:0.84rem;color:#555;margin:0">Adding a new project should be: create a folder, write a markdown file, push. No touching HTML.</p>
  </div>
  <div class="b-card" style="border-left:4px solid #f59e0b">
    <p style="font-size:0.75rem;color:#888;margin:0 0 0.3rem;text-transform:uppercase;letter-spacing:0.06em">Hosting Goal</p>
    <p style="font-weight:700;margin:0 0 0.35rem">Free forever</p>
    <p style="font-size:0.84rem;color:#555;margin:0">No backend. No database. No monthly bill. Static files on GitHub Pages, deployed via Actions on every push.</p>
  </div>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1.5rem;letter-spacing:-0.02em">How It Got Built</h2>

<div class="b-timeline">
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Early 2025</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">Version zero: one giant HTML file</p>
    <p style="font-size:0.88rem;color:#555;margin:0">All project content was hardcoded directly in <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">index.html</code>. Adding a project meant finding the right section of a 2,000-line file and pasting HTML into it by hand. Editing the wrong spot broke the layout. Editing the right spot still felt brittle. There was no system, just copy-paste and faith.</p>
  </div>
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Summer 2025</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">The terminal concept, and the Matrix rain disaster</p>
    <p style="font-size:0.88rem;color:#555;margin:0">The home screen needed something memorable. The plan: a Matrix-style falling character rain behind the UI. Dense green characters cascading down a black canvas. I built it. It animated. It looked incredible on my 4K monitor and like TV static on everything else.</p>
  </div>
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Fall 2025</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">Architecture overhaul: the folder system</p>
    <p style="font-size:0.88rem;color:#555;margin:0">Ripped out the hardcoded content, replaced it with a Node.js build script that reads <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">project.md</code> files from a folder structure. First time the site felt like a real system.</p>
  </div>
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Winter 2025</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">Work experience, photo stacks, awards</p>
    <p style="font-size:0.88rem;color:#555;margin:0">The experience section went through six layout iterations. The current version uses a vertical timeline with fanning photo stacks that open the full gallery on click.</p>
  </div>
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Early 2026</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">Blog, LinkedIn, YouTube, and the JSONBin saga</p>
    <p style="font-size:0.88rem;color:#555;margin:0">Added a full content pipeline: blog folder system with a build script, a LinkedIn carousel with local video thumbnail capture, YouTube with oEmbed title fetching, a global like counter, and a GitHub Actions workflow that injects API keys from secrets at deploy time.</p>
  </div>
  <div class="b-titem" style="margin-bottom:0">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">March 2026</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">This post</p>
    <p style="font-size:0.88rem;color:#555;margin:0">Still ongoing. Still adding to it. You're reading it on the blog page, which itself was built two weeks before this sentence was written.</p>
  </div>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">The Matrix Rain: A Cautionary Tale</h2>

<div class="b-split">
<div>
<p style="margin:0 0 0.85rem">The plan seemed bulletproof. A full-screen canvas element behind the terminal UI, rendering columns of green falling characters in the classic Matrix style. I wrote the canvas renderer in about two hours, tweaked the speed and opacity for another hour, and thought it looked amazing.</p>
<p style="margin:0 0 0.85rem">The problems arrived in order:</p>
<ol style="padding-left:1.5rem;margin:0 0 0.85rem;line-height:2.1;font-size:0.9rem">
  <li>On lower-DPI screens the characters blurred into smears</li>
  <li>The canvas overlapped the terminal panel's click targets on mobile</li>
  <li>Performance dropped to ~40fps on a 2019 MacBook</li>
  <li>With <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">z-index</code> management, the rain bled through the UI panels</li>
  <li>The aesthetic was derivative. It's the first thing every "hacker theme" portfolio does</li>
</ol>
<p style="margin:0">I killed it decisively. The Matrix rain was the obvious choice, and the obvious choice is rarely the right one.</p>
</div>
<div>
<div style="background:#0a0a0a;border-radius:10px;padding:1.25rem;font-family:'Courier New',monospace;font-size:0.77rem;color:#33ff66;line-height:1.6">
<span style="color:#888">// What I thought the canvas code would do:</span><br>
<span style="color:#33ff66">// look cool on every screen</span><br><br>
<span style="color:#888">// What it actually did on mobile:</span><br>
<span style="color:#f87171">▓▓▒▒░░</span><span style="color:#888"> blur</span><br>
<span style="color:#f87171">▒▒▒▓▓▓</span><span style="color:#888"> more blur</span><br>
<span style="color:#f87171">░▒▓█▓▒</span><span style="color:#888"> still blur</span><br>
<span style="color:#f87171">▓▒░░▒▓</span><span style="color:#888"> performance warning</span><br><br>
<span style="color:#ffd700">// Estimated: needs rethink</span><br>
<span style="color:#f87171">// Actual: needs deletion</span>
</div>
<div class="b-card" style="margin-top:1rem;font-size:0.85rem">
  <strong>What replaced it:</strong> The ASCII face. One <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">&lt;pre&gt;</code> element, monospace text, CSS scale transform. Works on every screen. Unique. Actually interesting to look at.
</div>
</div>
</div>

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:2.5rem 0 1rem;letter-spacing:-0.02em">The Globe That Never Worked</h2>

<p>Before the face, the terminal panel was supposed to have a rotating ASCII globe: a 3D sphere mapped to a character grid, lit from the side, rotating on the yaw axis. The math was right. The results were not.</p>

<div class="b-split">
<div>
<div style="background:#fef3c7;border-left:4px solid #f59e0b;padding:0.85rem 1.25rem;border-radius:0 8px 8px 0;font-size:0.87rem;margin:0 0 1rem">
  <strong>The core problem:</strong> A procedurally rendered ASCII sphere looks like a circle. At the resolution of a monospace grid, the character-to-character variation was too coarse to read as curvature. The "sphere" looked flat, like a disc with shadows. Increasing the grid resolution made it too large for the panel. Reducing it made it look like 12 characters arranged in a rough circle.
</div>
<p style="font-size:0.88rem;margin:0 0 0.85rem">I spent a full weekend on this. I tried different character sets (<code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">.,:;!|*#@</code> for brightness ramps), different rotation speeds, different lighting angles. Nothing looked like a globe.</p>
<div style="background:#d1fae5;border-left:4px solid #10b981;padding:0.85rem 1.25rem;border-radius:0 8px 8px 0;font-size:0.87rem">
  <strong>The pivot:</strong> Instead of generating a sphere, I applied the globe rotation algorithm to an existing ASCII portrait. Each row rotates horizontally by an amount proportional to <code style="background:#dcfce7;padding:0.1em 0.3em;border-radius:3px">cos(latitude)</code>, fast at the equator, still at the poles. The face appears to turn its head in 3D. Zero new geometry, zero new math, runs in ten lines.
</div>
</div>
<div>
<pre style="background:#1a1a1a;color:#e0e0e0;padding:1rem 1.25rem;border-radius:8px;font-size:0.77rem;line-height:1.6;overflow-x:auto;margin:0;tab-size:2"><code><span style="color:#888">// The globe rotation algorithm,</span>
<span style="color:#888">// applied to an ASCII face:</span>

for (let row = 0; row &lt; h; row++) {
  const y = (row - mid) / mid;
  <span style="color:#888">// -1 at bottom, +1 at top</span>

  const lat = y * (Math.PI / 2);
  const bandFactor = Math.cos(lat);
  <span style="color:#888">// 1.0 at equator, 0 at poles</span>

  const shift =
    Math.floor(phase * bandFactor) % width;

  <span style="color:#888">// Rotate the row left by shift chars</span>
  out += line.slice(shift)
           + line.slice(0, shift);
}</code></pre>
</div>
</div>

<div class="b-quote">
  Ten lines to replace a weekend of globe math. The real lesson: I was solving the wrong problem. I didn't need a globe. I needed something that felt alive.
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">The Architecture: Why Folders</h2>

<div class="b-split">
<div>
<p style="margin:0 0 0.85rem">The original hardcoded HTML structure had a fundamental problem: every new project required touching the same file, in the same fragile spots, with no safety net. The risk of breaking something unrelated was constant.</p>
<p style="margin:0 0 0.85rem">The solution I landed on is a dead-simple folder structure. Every project is a folder. The folder contains a <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">project.md</code> file with YAML frontmatter for metadata and HTML body for the project write-up. Images live next to the markdown file with predictable names.</p>
<p style="margin:0">A Node.js build script reads every folder, parses the frontmatter using <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">gray-matter</code>, and writes a single JS file. The browser loads that file on page load. No server. No API calls. No database.</p>
</div>
<div>
<pre style="background:#1a1a1a;color:#e0e0e0;padding:1rem 1.25rem;border-radius:8px;font-size:0.77rem;line-height:1.7;overflow-x:auto;margin:0;tab-size:2"><code>devProjects/
  pocketzot/
    project.md  <span style="color:#888">&lt;- write-up + metadata</span>
    COVER.png   <span style="color:#888">&lt;- card thumbnail</span>
    HEADER.png  <span style="color:#888">&lt;- detail hero</span>
  collide/
    project.md
    CARD.svg    <span style="color:#888">&lt;- SVG card art</span>
    COVER.svg   <span style="color:#888">&lt;- SVG hero banner</span>

blog/
  welcome/
    post.md     <span style="color:#888">&lt;- this post</span>

<span style="color:#888"># Add a project:</span>
<span style="color:#888"># 1. mkdir devProjects/my-new-thing</span>
<span style="color:#888"># 2. create project.md</span>
<span style="color:#888"># 3. npm run build &amp;&amp; git push</span>
<span style="color:#888"># Done. Card appears in the grid.</span></code></pre>
</div>
</div>

<details style="border:1px solid #e5e7eb;border-radius:8px;padding:0 1rem;margin:0 0 1.75rem;font-size:0.88rem">
  <summary style="cursor:pointer;padding:0.9rem 0;font-weight:700;color:#374151;list-style:none;display:flex;justify-content:space-between">What the frontmatter looks like <span style="color:#9ca3af">click to expand</span></summary>
  <div style="padding:0 0 1rem">
<pre style="background:#1a1a1a;color:#e0e0e0;padding:0.85rem 1rem;border-radius:6px;font-size:0.78rem;line-height:1.6;overflow-x:auto;margin:0.5rem 0 0;tab-size:2"><code>---
title: "PocketZot"
description: "A browser extension digital pet"
github: "https://github.com/antsuh1028/PocketZot"
cover: "COVER.png"    <span style="color:#888"># card thumbnail</span>
header: "HEADER.png"  <span style="color:#888"># detail hero (falls back to cover)</span>
date: "03/2026"       <span style="color:#888"># MM/YYYY, drives sort order</span>
ongoing: false        <span style="color:#888"># affects tier in the sort</span>
---

&lt;p&gt;Project write-up goes here as HTML.&lt;/p&gt;
&lt;p&gt;Tech stack, screenshots, code snippets, anything.&lt;/p&gt;</code></pre>
  </div>
</details>

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">The Card Sort Algorithm</h2>

<p>Project cards don't just sort by date. They sort by tier first, then by date within a tier. The four tiers exist because I have example projects I want at the top, active ones in the middle, and finished ones at the bottom, always newest-first within each group.</p>

<div style="overflow-x:auto;margin:0 0 1.75rem">
<table style="width:100%;border-collapse:collapse;font-size:0.86rem">
  <thead>
    <tr style="background:#f8f9fa">
      <th style="text-align:left;padding:0.65rem 1rem;border-bottom:2px solid #e5e7eb;color:#6366f1">Tier</th>
      <th style="text-align:left;padding:0.65rem 1rem;border-bottom:2px solid #e5e7eb">Condition</th>
      <th style="text-align:left;padding:0.65rem 1rem;border-bottom:2px solid #e5e7eb">Example</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding:0.6rem 1rem;border-bottom:1px solid #f0f0f0"><strong>1</strong></td><td style="padding:0.6rem 1rem;border-bottom:1px solid #f0f0f0"><code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">kind: example</code> in frontmatter</td><td style="padding:0.6rem 1rem;border-bottom:1px solid #f0f0f0;color:#888">Placeholder projects</td></tr>
    <tr><td style="padding:0.6rem 1rem;border-bottom:1px solid #f0f0f0"><strong>2</strong></td><td style="padding:0.6rem 1rem;border-bottom:1px solid #f0f0f0"><code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">ongoing: true</code> AND date = current month</td><td style="padding:0.6rem 1rem;border-bottom:1px solid #f0f0f0;color:#888">CollIDE, Zotletics</td></tr>
    <tr><td style="padding:0.6rem 1rem;border-bottom:1px solid #f0f0f0"><strong>3</strong></td><td style="padding:0.6rem 1rem;border-bottom:1px solid #f0f0f0"><code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">ongoing: true</code>, older date</td><td style="padding:0.6rem 1rem;border-bottom:1px solid #f0f0f0;color:#888">Active projects started earlier</td></tr>
    <tr><td style="padding:0.6rem 1rem"><strong>4</strong></td><td style="padding:0.6rem 1rem">Everything else, newest first</td><td style="padding:0.6rem 1rem;color:#888">PocketZot, Font Cycler</td></tr>
  </tbody>
</table>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">The Projects</h2>

<img src="assets/dev-site-project-detail.png" alt="Project detail view" class="b-fullimg">

<div class="b-split">
<div>
<p style="font-size:0.8rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#6366f1;margin:0 0 0.4rem">PocketZot / IrvineHacks 2026 Winner</p>
<p style="margin:0 0 0.75rem;font-size:0.9rem">A Chrome extension with a Shimeji-style anteater that walks around AI chat sites and classifies how you're using AI. My contributions were the physics engine, the sprite state machine, and the in-extension shop. My teammates built the backend, classifier, and database.</p>
<p style="margin:0 0 0.75rem;font-size:0.9rem">The physics was the part I dug into. The anteater has velocity, drag, gravity, and boundary conditions. You can grab it and throw it across the screen. When it hits a wall it bounces with a damped coefficient. When you let go mid-throw it keeps whatever momentum you gave it.</p>
<details style="border:1px solid #e5e7eb;border-radius:8px;padding:0 0.85rem;font-size:0.83rem">
  <summary style="cursor:pointer;padding:0.75rem 0;font-weight:700;list-style:none;display:flex;justify-content:space-between">Physics snippet <span style="color:#9ca3af">click to expand</span></summary>
  <div style="padding:0 0 0.75rem">
<pre style="background:#1a1a1a;color:#e0e0e0;padding:0.75rem;border-radius:6px;font-size:0.75rem;line-height:1.55;overflow-x:auto;margin:0.5rem 0 0;tab-size:2"><code><span style="color:#888">// Per-frame physics update</span>
this.vy += GRAVITY * dt;
this.vx *= Math.pow(DRAG, dt);
this.vy *= Math.pow(DRAG, dt);

this.x += this.vx * dt;
this.y += this.vy * dt;

<span style="color:#888">// Floor bounce</span>
if (this.y > floorY) {
  this.y = floorY;
  this.vy *= -BOUNCE_COEFF;
  if (Math.abs(this.vy) &lt; 10) {
    this.vy = 0;
    this.setState('idle');
  }
}</code></pre>
  </div>
</details>
</div>
<div>
<p style="font-size:0.8rem;font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:#6366f1;margin:0 0 0.4rem">[CollIDE] (Ongoing)</p>
<p style="margin:0 0 0.75rem;font-size:0.9rem">A collaborative IDE where every developer has their own AI assistant, but all those assistants share a read-only view of what the whole team is doing. The core thesis: AI tools are built for individuals. CollIDE is built for teams.</p>
<p style="margin:0 0 0.75rem;font-size:0.9rem">The card and banner artwork are entirely hand-drawn SVGs: colored cursors, live code text, comment bubbles. No image files. Getting all four cursors to sit within the viewBox without clipping took more coordinate recalculations than I care to count.</p>
<div class="b-card" style="font-size:0.83rem;margin:0">
  <strong>SVG Lesson:</strong> Everything drawn outside the <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">viewBox</code> is clipped. The fix is always the same: increase the viewBox padding, then recalculate every coordinate. There is no shortcut.
</div>
</div>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">The Work Experience Page</h2>

<img src="assets/dev-site-developer.png" alt="Developer portfolio grid" class="b-fullimg">

<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;margin:0 0 1.75rem">
<img src="assets/dev-site-experience.png" alt="Work Experience timeline on the site" style="width:100%;display:block;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
<img src="assets/dev-site-blog.png" alt="Blog section with post cards" style="width:100%;display:block;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
<img src="assets/dev-site-about.png" alt="About page with bio and contact" style="width:100%;display:block;border-radius:8px;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
</div>

<p>This page went through the most redesign iterations of anything on the site. The first version was a flat list. The second was a two-column grid. The third looked like a LinkedIn printout. The current version is a vertical timeline with a left accent line, company logo squares, tag chips, and a dedicated content block per role.</p>

<p>The detail that makes it work: the photo stack. For roles that have media attached, a stack of three overlapping photos sits in the dead space under the date. The cards fan out slightly using CSS rotation transforms. On hover, the back cards slide apart:</p>

<div class="b-split" style="align-items:center">
<pre style="background:#1a1a1a;color:#e0e0e0;padding:1rem 1.25rem;border-radius:8px;font-size:0.77rem;line-height:1.6;overflow-x:auto;margin:0;tab-size:2"><code><span style="color:#888">/* Three cards, fanned like a deck */</span>
.exp-photo-card--back2 {
  transform: rotate(6deg);
  z-index: 1;
}
.exp-photo-card--back1 {
  transform: rotate(3deg);
  z-index: 2;
}
.exp-photo-card--front { z-index: 3; }

<span style="color:#888">/* Fan out more on hover */</span>
.exp-photo-stack:hover .back2 {
  transform: rotate(10deg)
             translate(6px, 3px);
}
.exp-photo-stack:hover .back1 {
  transform: rotate(5deg)
             translate(3px, 1px);
}</code></pre>
<div>
<p style="font-size:0.9rem;margin:0 0 0.85rem">Clicking the stack opens the full gallery modal, the same lightbox used for the design portfolio. That reuse was intentional: one viewer, multiple use cases, no duplication of logic.</p>
<p style="font-size:0.9rem;margin:0 0 0.85rem">The stack sits at <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">position: absolute; right: 0; top: 4.5rem</code> inside the experience body, which is <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">position: relative</code>. The text layout is completely unaffected, but the stack floats in the dead space under the date column.</p>
<p style="font-size:0.9rem;margin:0">Finding the right <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">top</code> value took about eight adjustments. Eight.</p>
</div>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">YouTube Integration: Three Layers Deep</h2>

<p style="font-size:0.9rem;margin:0 0 1rem">This section is separate from my long-running personal channel (since late 2019). The carousel on the Blog page reads from <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">data/youtube-videos.js</code> and opens a modal with an embed, description pulled from the API when the key is present, oEmbed title on the card, and the JSONBin like counter. Right now the data file lists the videos I choose to feature (for example my Minecraft Python video); as I launch the new coding-focused channel, new IDs go in the same file.</p>

<div class="b-split-3" style="margin:0 0 1.25rem">
  <div class="b-card" style="border-top:3px solid #6366f1">
    <p style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#6366f1;margin:0 0 0.3rem">Layer 1</p>
    <p style="font-weight:700;margin:0 0 0.3rem;font-size:0.9rem">Static data</p>
    <p style="font-size:0.82rem;color:#666;margin:0">Title and date hardcoded in the JS file. Broke immediately. Video titles change on YouTube and the site wouldn't know.</p>
  </div>
  <div class="b-card" style="border-top:3px solid #10b981">
    <p style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#10b981;margin:0 0 0.3rem">Layer 2</p>
    <p style="font-weight:700;margin:0 0 0.3rem;font-size:0.9rem">oEmbed (free)</p>
    <p style="font-size:0.82rem;color:#666;margin:0">YouTube's free endpoint returns the real title with no API key. Card renders instantly with static data, then updates in place.</p>
  </div>
  <div class="b-card" style="border-top:3px solid #f59e0b">
    <p style="font-size:0.72rem;font-weight:800;text-transform:uppercase;letter-spacing:0.06em;color:#f59e0b;margin:0 0 0.3rem">Layer 3</p>
    <p style="font-weight:700;margin:0 0 0.3rem;font-size:0.9rem">Data API v3 (key)</p>
    <p style="font-size:0.82rem;color:#666;margin:0">View count, like ratio, publish date. Requires a key, restricted to the live domain, injected by CI at deploy time.</p>
  </div>
</div>

<pre style="background:#1a1a1a;color:#e0e0e0;padding:1rem 1.25rem;border-radius:8px;font-size:0.78rem;line-height:1.6;overflow-x:auto;margin:0 0 1.75rem;tab-size:2"><code><span style="color:#888">// Layer 2: oEmbed title fetch, free, no key required</span>
fetch(`https://www.youtube.com/oembed?url=...&format=json`)
  .then(r => r.json())
  .then(data => {
    el.querySelector('.yt-card-title').textContent = data.title;
  });

<span style="color:#888">// Layer 3: Full API for stats (only runs if API key is set)</span>
if (window.YOUTUBE_API_KEY) {
  fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet,statistics&key=${window.YOUTUBE_API_KEY}`)
    .then(r => r.json())
    .then(data => {
      const v = data.items?.[0];
      modal.querySelector('.yt-modal-title').textContent = v.snippet.title;
      modal.querySelector('.yt-views').textContent = formatViews(v.statistics.viewCount);
    });
}</code></pre>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">The JSONBin Disaster</h2>

<p>I wanted a global like counter on YouTube videos, one number shared across all visitors, not browser-local. Firebase required a credit card on the free tier. JSONBin.io did not. JSONBin stores a JSON object behind a REST API, completely free.</p>

<p>The implementation was clean. Local testing worked. I deployed. Likes stopped saving.</p>

<div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:0 10px 10px 0;padding:1rem 1.25rem;margin:0 0 1rem">
<p style="font-weight:800;margin:0 0 0.5rem;font-size:0.95rem">The Problem: Shell Variable Expansion</p>
<p style="margin:0 0 0.75rem;font-size:0.88rem">The JSONBin master key starts with <code style="background:#fef3c7;padding:0.1em 0.35em;border-radius:3px;font-family:monospace">$2a$10$J7Mgg...</code>, a bcrypt hash prefix. When the GitHub Actions workflow used <code style="background:#fef3c7;padding:0.1em 0.35em;border-radius:3px;font-family:monospace">echo</code> to write it to disk, bash expanded <code style="background:#fef3c7;padding:0.1em 0.35em;border-radius:3px;font-family:monospace">$2</code>, <code style="background:#fef3c7;padding:0.1em 0.35em;border-radius:3px;font-family:monospace">$10</code>, and <code style="background:#fef3c7;padding:0.1em 0.35em;border-radius:3px;font-family:monospace">$J</code> as shell variables. They're undefined in the workflow environment. They evaluate to empty strings. The key written to disk was <code style="background:#fef3c7;padding:0.1em 0.35em;border-radius:3px;font-family:monospace">"a..."</code> (completely garbage).</p>
<p style="margin:0;font-size:0.88rem">Every write request came back <code style="background:#fef3c7;padding:0.1em 0.35em;border-radius:3px;font-family:monospace">401 Unauthorized</code>. The site swallowed the error silently. The counter appeared to work, it incremented locally in the modal, but the count was never actually saved to JSONBin. On every reopen: zero.</p>
</div>

<div class="b-split">
<div>
<p style="font-size:0.78rem;font-weight:700;color:#dc2626;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 0.4rem">Broken workflow</p>
<pre style="background:#1a1a1a;color:#f87171;padding:0.85rem 1rem;border-radius:8px;font-size:0.77rem;line-height:1.5;overflow-x:auto;margin:0;tab-size:2"><code>- name: Inject API keys
  run: |
    echo "window.JSONBIN_KEY = \
'${{ secrets.JSONBIN_KEY }}';" \
    > data/api-config.js

# bash expands $2, $10, $J as vars
# all expand to empty string
# key becomes "a..." (garbage)
# every write fails silently</code></pre>
</div>
<div>
<p style="font-size:0.78rem;font-weight:700;color:#059669;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 0.4rem">Fixed workflow</p>
<pre style="background:#1a1a1a;color:#86efac;padding:0.85rem 1rem;border-radius:8px;font-size:0.77rem;line-height:1.5;overflow-x:auto;margin:0;tab-size:2"><code>- name: Inject API keys
  env:
    JSONBIN_KEY: ${{ secrets.JSONBIN_KEY }}
  run: |
    node -e "
    const fs = require('fs');
    fs.writeFileSync('data/api-config.js',
      'window.JSONBIN_KEY = '
      + JSON.stringify(process.env.JSONBIN_KEY)
      + ';'
    );"

# JSON.stringify handles all special chars
# key arrives on disk exactly as stored</code></pre>
</div>
</div>

<p style="margin:1rem 0 0;font-size:0.9rem">The fix: route the secret through an environment variable so GitHub replaces it before bash sees it, then use <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">JSON.stringify()</code> in Node to write it. Node doesn't do shell variable expansion. The dollar signs are treated as string content. Likes persist.</p>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">The Race Condition</h2>

<p>After fixing the key injection, a different bug appeared: opening a video modal, liking it, closing it, reopening it, count showed zero again. And opening a different video sometimes showed the previous video as "liked."</p>

<p>The cause was classic: asynchronous fetch callbacks don't know about state changes that happened after they started. The fetch for video A starts. User navigates to video B. The fetch for video A completes. Its callback updates the UI for whatever video is currently open, which is now video B.</p>

<details style="border:1px solid #e5e7eb;border-radius:8px;padding:0 1rem;margin:0 0 1.75rem;font-size:0.88rem">
  <summary style="cursor:pointer;padding:0.9rem 0;font-weight:700;list-style:none;display:flex;justify-content:space-between">The fix: captured ID pattern <span style="color:#9ca3af">click to expand</span></summary>
  <div style="padding:0 0 1rem">
<pre style="background:#1a1a1a;color:#e0e0e0;padding:0.85rem 1rem;border-radius:6px;font-size:0.78rem;line-height:1.6;overflow-x:auto;margin:0.5rem 0 0;tab-size:2"><code>function openYtModal(videoId) {
  _ytCurrentId = videoId;

  // Freeze the ID at fetch-time
  const capturedId = videoId;

  fbGetCount(videoId).then(count => {
    // By the time this fires, user may
    // have opened a different video.
    if (_ytCurrentId !== capturedId) return;

    // Safe: this is still the right video
    updateLikeButton(count);
  });
}</code></pre>
    <p style="margin:0.75rem 0 0;font-size:0.86rem">The closure captures <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">capturedId</code> at the moment the fetch starts. When the callback fires, it compares against the current <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">_ytCurrentId</code>. If they don't match, the user has moved on. Discard the result.</p>
  </div>
</details>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">The Terminal</h2>

<img src="assets/dev-site-terminal.png" alt="Boot terminal with four panels" class="b-fullimg">

<p style="font-size:0.9rem">The first screen is a real (fake) shell. You type <code style="background:#f0f0f0;padding:0.1em 0.35em;border-radius:4px">Initialize</code> to run the boot animation. When it finishes, you are in a <strong>command phase</strong>: the site does not open until you type something.</p>

<p style="font-size:0.9rem">The bottom-right <strong>GUIDEBOOK</strong> panel lists the same commands as the in-terminal <code style="background:#f0f0f0;padding:0.1em 0.35em;border-radius:4px">HELP</code> output so nobody has to guess. Implemented commands today:</p>

<ul style="font-size:0.9rem;line-height:1.85;margin:0 0 1rem;padding-left:1.35rem">
  <li><strong>HELP</strong> (also <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">GUIDE</code>, <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">?</code>): prints the full list.</li>
  <li><strong>EXP</strong>: text-only walkthrough of my résumé order (Army Guard through Dairy Queen). Then <strong>N</strong> / <strong>P</strong> step forward or back, <strong>Q</strong> returns to the command phase.</li>
  <li><strong>SPIN</strong>: temporarily multiplies how fast the ASCII portrait rotates (same renderer as the blog banner).</li>
  <li><strong>TIME</strong>: prints <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">Date.toString()</code> from your browser.</li>
  <li><strong>CLS</strong>: clears the transcript so the panel is readable again.</li>
</ul>

<p style="font-size:0.9rem;margin:0 0 1rem"><strong>Crucial:</strong> any line that is <em>not</em> one of those commands is treated as <strong>your name</strong>. That value personalizes the guest flow, is stored in <code style="background:#f0f0f0;padding:0.1em 0.35em;border-radius:4px">localStorage</code> for the next visit, and then the normal loading screen runs. If your name collides with a command, use your full name or a nickname.</p>

<p style="font-size:0.9rem;margin:0 0 1rem">Return visitors can skip the whole terminal when a recent normal-visit timestamp is still valid (same <code style="background:#f0f0f0;padding:0.1em 0.35em;border-radius:4px">localStorage</code> mechanism as before).</p>

<p style="font-size:0.9rem;margin:0 0 1rem">After you reach the main site, there is still a separate <strong>crs</strong> presentation layer (alternate layouts per page, extra experiments like the Flappy mini-game on Home). Turning that on is an easter egg from the keyboard, not documented in the guidebook, on purpose.</p>

<pre style="background:#1a1a1a;color:#e0e0e0;padding:1rem 1.25rem;border-radius:8px;font-size:0.78rem;line-height:1.6;overflow-x:auto;margin:0;tab-size:2"><code><span style="color:#888">// Simplified post-boot dispatch (conceptually)</span>
if (mode === 'exp') { handle N | P | Q; return; }
if (mode === 'postinit') {
  if (isHelp(cmd))   printHelp();
  else if (cmd === 'exp') openExpViewer();
  else if (cmd === 'spin') boostAsciiSpeed();
  else if (cmd === 'time') printDate();
  else if (cmd === 'cls')  clearTranscript();
  else openWebsiteWithName(raw);  <span style="color:#888">// default</span>
}</code></pre>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Everything the Site Runs On</h2>

<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.75rem;margin:0 0 1.75rem">
  <div class="b-card" style="text-align:center;padding:1rem 0.75rem">
    <div style="font-size:1.4rem;margin-bottom:0.35rem">🌐</div>
    <strong style="font-size:0.85rem">HTML/CSS/JS</strong>
    <p style="font-size:0.75rem;color:#888;margin:0.2rem 0 0">No framework</p>
  </div>
  <div class="b-card" style="text-align:center;padding:1rem 0.75rem">
    <div style="font-size:1.4rem;margin-bottom:0.35rem">⚙️</div>
    <strong style="font-size:0.85rem">Node.js</strong>
    <p style="font-size:0.75rem;color:#888;margin:0.2rem 0 0">Build scripts only</p>
  </div>
  <div class="b-card" style="text-align:center;padding:1rem 0.75rem">
    <div style="font-size:1.4rem;margin-bottom:0.35rem">📄</div>
    <strong style="font-size:0.85rem">gray-matter</strong>
    <p style="font-size:0.75rem;color:#888;margin:0.2rem 0 0">Frontmatter parsing</p>
  </div>
  <div class="b-card" style="text-align:center;padding:1rem 0.75rem">
    <div style="font-size:1.4rem;margin-bottom:0.35rem">🚀</div>
    <strong style="font-size:0.85rem">GitHub Pages</strong>
    <p style="font-size:0.75rem;color:#888;margin:0.2rem 0 0">Free static hosting</p>
  </div>
  <div class="b-card" style="text-align:center;padding:1rem 0.75rem">
    <div style="font-size:1.4rem;margin-bottom:0.35rem">🔐</div>
    <strong style="font-size:0.85rem">GitHub Actions</strong>
    <p style="font-size:0.75rem;color:#888;margin:0.2rem 0 0">CI/CD + secrets</p>
  </div>
  <div class="b-card" style="text-align:center;padding:1rem 0.75rem">
    <div style="font-size:1.4rem;margin-bottom:0.35rem">❤️</div>
    <strong style="font-size:0.85rem">JSONBin.io</strong>
    <p style="font-size:0.75rem;color:#888;margin:0.2rem 0 0">Global like counter</p>
  </div>
  <div class="b-card" style="text-align:center;padding:1rem 0.75rem">
    <div style="font-size:1.4rem;margin-bottom:0.35rem">▶️</div>
    <strong style="font-size:0.85rem">YouTube API</strong>
    <p style="font-size:0.75rem;color:#888;margin:0.2rem 0 0">Video metadata</p>
  </div>
  <div class="b-card" style="text-align:center;padding:1rem 0.75rem">
    <div style="font-size:1.4rem;margin-bottom:0.35rem">🔷</div>
    <strong style="font-size:0.85rem">SVG</strong>
    <p style="font-size:0.75rem;color:#888;margin:0.2rem 0 0">All custom artwork</p>
  </div>
  <div class="b-card" style="text-align:center;padding:1rem 0.75rem">
    <div style="font-size:1.4rem;margin-bottom:0.35rem">💾</div>
    <strong style="font-size:0.85rem">localStorage</strong>
    <p style="font-size:0.75rem;color:#888;margin:0.2rem 0 0">Terminal persistence</p>
  </div>
</div>

<p>No React. No Vue. No Webpack. No <code style="background:#f0f0f0;padding:0.1em 0.4em;border-radius:4px;font-size:0.9em">node_modules</code> at runtime. The entire site is one <code style="background:#f0f0f0;padding:0.1em 0.4em;border-radius:4px;font-size:0.9em">index.html</code> with everything inlined. Nav clicks are instant because there's no routing, no hydration, no bundle to parse. Pages swap by toggling CSS visibility on pre-rendered content blocks already in the DOM.</p>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">What's Next</h2>

<p>The design portfolio has one placeholder entry. The blog has one post. There's one YouTube video and five LinkedIn posts. This is a working scaffolding, not a finished product. That was the whole point. Every system is in place to expand without touching the core layout.</p>

<p>More projects ship as they get interesting enough to write about. More posts come when something is worth documenting. The boot terminal will keep gaining small quality-of-life commands as I think of them.</p>

<div class="b-quote" style="margin:1.5rem 0 0">
  If you made it here, try <code style="background:#ede9fe;padding:0.08em 0.35em;border-radius:4px">Initialize</code>, then <code style="background:#ede9fe;padding:0.08em 0.35em;border-radius:4px">EXP</code>, then your name. The guidebook in the corner is there so you never fly blind.
</div>
