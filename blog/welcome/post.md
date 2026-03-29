---
title: "Welcome to my website"
date: "03/2026"
banner: ascii-face
excerpt: "Build notes for this site: matrix rain I cut, JSONBin secrets in CI, STL-to-ASCII globe detour, folder pipelines, Work Experience iterations, and the boot terminal vs glitched CRT layer."
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
.b-img-capped { width: 100%; max-width: 40rem; display: block; margin: 0 auto 1.75rem; border-radius: 8px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); }
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
  <span class="b-tag b-tag--green">Lessons learned</span>
  <span class="b-tag b-tag--amber">Build log</span>
  <span class="b-tag">Design</span>
  <span class="b-tag b-tag--red">Bugs I actually hit</span>
</div>

<p style="font-size:1.18rem;line-height:1.8;color:#111;font-weight:500;margin:0 0 1rem">The face in the banner is not a GIF. It is a <code style="background:#f0f0f0;padding:0.1em 0.4em;border-radius:4px">requestAnimationFrame</code> loop that shifts each row of an ASCII portrait so it reads like a slow turn. I built it after I gave up on a real 3D globe (more on that below). It is a little extra, technically unnecessary, and arrived at through a weekend of failures, but it runs everywhere and it is mine.</p>

<p>This post is the long version of how the site came together: what I tried, what I threw away, and the bugs that only showed up after deploy. If you want the short version, use <strong>Work Experience</strong> and the project pages. This is the notebook in the margin.</p>

<p style="margin:0 0 1rem;color:#555;font-size:0.98rem"><strong>Where I am now:</strong> UC Irvine, double-majoring in Software Engineering and Computer Science. I am in the <strong>Army National Guard</strong>, teach at Code Ninjas, and design real healthcare tools at Commit the Change. The timeline below is mostly orientation; the college chunk is what matches day to day.</p>

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Timeline</h2>

<div class="b-timeline" style="margin:0 0 2rem">
  <div class="b-titem"><strong>Early years:</strong> Born in California.</div>
  <div class="b-titem"><strong>Spring 2018:</strong> Family moved to Oregon (Portland area).</div>
  <div class="b-titem"><strong>High school:</strong> I was in broadcasting, picked up design and social work for school programs, held part-time jobs, did robotics and game dev, hit competitions, and shipped the first small apps people actually used.</div>
  <div class="b-titem" style="margin-bottom:0"><strong>College (now):</strong> UC Irvine; enlisted in the Army; double major SE + CS; Commit the Change, Code Ninjas instruction, hackathons, and the projects on this site.</div>
</div>

<p style="margin:0 0 1.25rem;font-size:0.92rem;color:#555">On the military side, for anyone who wants the actual job title: I am a <strong>15H</strong> (aircraft pneudraulics repairer) working on <strong>UH-60 Black Hawk</strong> systems.</p>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Where I Started</h2>

<p style="margin:0 0 0.85rem">Freshman year of high school I was deep into game development and assumed I would become a pediatrician, not an engineer. I watched a YouTuber named Dani make silly 2D platformers in Unity (especially while he was working on Karlson) and I loved the humor. I was super inspired and wanted to make my own game, which led to yard work for neighbors until I could afford a PC, then Unity and C# tutorials. I did not seriously pick up Python until senior year. Before that it was mostly C#, stubbornness, and copy-paste from videos.</p>

<p style="margin:0 0 0.85rem">All four years I took IT classes. That is what pulled me into the wider tech space: cybersecurity, terminals, ports, hardware, how networks actually behave. I passed the first half of CompTIA A+ and never got around to the second exam. Then I moved to California and my exam ticket expired. I am still hoping for a redemption arc and finishing the cert someday.</p>

<p style="margin:0 0 0.85rem">I grew up in Tualatin, Oregon, a suburb of Portland where the closest tech scene was a long drive away. My "version control" was a Google Doc where I pasted scripts whole. The tab title was literally cobi = best coder. I really thought that confidence would carry me straight into fully polished AAA games. That confidence never really left, but I do a better job hiding it now, ha!</p>

<p style="margin:0 0 1rem;font-size:0.92rem;color:#555">Below is the actual Google Doc that held all the code. I used to name every game GDC (game design class) plus a number and paste the movement script from the last project, so iterations and Frankensteins were always happening. The doc got mangled over time and bounced around the class. It is a mishmash of a couple YouTube tutorials and frustration from Unity's official car tutorial. I entered the regional programming challenge and Oregon's statewide Oregon Game Project Challenge; we did not win, but I learned a lot, including my first time in Unreal Engine on a senior-year project.</p>

<!--BLOG_GDOC_FRAGMENT-->

<p style="margin:1.25rem 0 0.85rem">By senior year I was editing weekly news for the school's channel, airing every Wednesday to 2,500 students. I ran social for esports and tennis, stacked competition and coursework, and still entered Oregon's regional programming challenge, codeORcreate, where I won Best Presentation with an accessibility-focused public transit routing app judged by a panel of four. That was the first time I felt like I could actually make things people use.</p>

<p style="margin:0 0 0.85rem">The rest of the calendar was clubs: robotics (state champions my junior year), game design club (we showed a project at the Oregon Game Project Challenge), LEAP Youth Alliance (drug-prevention coalition with town halls and volunteer events), Key Club, National Honor Society, feminism club, and a few more. I am still not sure how that fit next to multiple jobs and sports.</p>

<p style="margin:0 0 1.25rem">Since December 2019 I have run a personal YouTube channel. For years I posted about two videos a week and streamed a lot on the side. Around 2024 that slowed to about one video a month. I am planning to retire that channel in September and start a new one aimed at informational coding videos and project updates. The carousel on this site's Blog page is set up for whatever I publish next.</p>

<div class="b-card" style="font-size:0.9rem;margin:0">
<strong style="color:#6366f1">Fast forward:</strong> UC Irvine, double major Software Engineering and Computer Science, Army National Guard, Code Ninjas instructor teaching JavaScript and Unity C# to kids, designing real healthcare tools at Commit the Change, and two hackathon wins in the same school year. The About page in the nav stays short (where I am from, goals, contact); current roles live in Work Experience and LinkedIn.
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">What I wanted this site to do</h2>

<p>I care about both design and engineering, and I get picky when something reads as generic. I did not want a Wix template with three cards and a stock photo. I wanted something that felt like me: clear for someone skimming for a job, a little stranger if you stay on the boot screen and poke around.</p>

<p style="margin:0 0 1.25rem;font-size:0.92rem;line-height:1.65;color:#444">The tools are different but the muscle is the same. When I design, I pay attention to how a developer would actually implement it. When I build, I make sure I understand the full design intent and why choices were made. On a team that means fewer handoffs that go sideways. Working solo I am a lot faster because I can run both sides in one head and keep a workflow that already matches how design and dev talk to each other.</p>

<div class="b-split-3">
  <div class="b-card" style="border-left:4px solid #6366f1">
    <p style="font-size:0.75rem;color:#888;margin:0 0 0.3rem;text-transform:uppercase;letter-spacing:0.06em">Design Goal</p>
    <p style="font-weight:700;margin:0 0 0.35rem">Two personalities, one site</p>
    <p style="font-size:0.84rem;color:#555;margin:0">Clean for recruiters. Weird for people who dig in. The terminal mode exists specifically for the second group.</p>
  </div>
  <div class="b-card" style="border-left:4px solid #10b981">
    <p style="font-size:0.75rem;color:#888;margin:0 0 0.3rem;text-transform:uppercase;letter-spacing:0.06em">Architecture Goal</p>
    <p style="font-weight:700;margin:0 0 0.35rem">Zero friction to expand</p>
    <p style="font-size:0.84rem;color:#555;margin:0">New project: create a folder, add <code style="background:#f0f0f0;padding:0.08em 0.25em;border-radius:3px">project.md</code> with frontmatter, run the build and the card in the grid is generated for you. No hand-editing HTML. If you like how this is set up, you can steal the pattern for your own site.</p>
  </div>
  <div class="b-card" style="border-left:4px solid #f59e0b">
    <p style="font-size:0.75rem;color:#888;margin:0 0 0.3rem;text-transform:uppercase;letter-spacing:0.06em">Open source</p>
    <p style="font-weight:700;margin:0 0 0.35rem">Fork-friendly</p>
    <p style="font-size:0.84rem;color:#555;margin:0">The repo is public so people can poke at the code, argue with my choices, and maybe take inspiration to make their own portfolio sites really rad. Static files on GitHub Pages, deployed via Actions on every push, with no backend or database at runtime.</p>
  </div>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1.5rem;letter-spacing:-0.02em">Rough build history</h2>

<div class="b-timeline">
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Early January 2026</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">Version zero: one giant HTML file</p>
    <p style="font-size:0.88rem;color:#555;margin:0">Every project lived as hand-pasted HTML inside <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">index.html</code>. One file kept growing. I could break the layout by editing the wrong div. Even when I hit the right spot it felt fragile. There was no real structure, just memory and luck.</p>
  </div>
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Mid-January 2026</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">Terminal vibe, and matrix rain I ended up cutting</p>
    <p style="font-size:0.88rem;color:#555;margin:0">I wanted something loud behind the boot UI, so I tried Matrix-style rain on a canvas. On a big external monitor it looked fine. On my laptop (Lenovo Legion) it was laggy, slow to boot, and honestly kind of ugly. Wrong tradeoff. I removed it.</p>
  </div>
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Late January 2026</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">Architecture overhaul: the folder system</p>
    <p style="font-size:0.88rem;color:#555;margin:0">I moved write-ups into per-project folders with <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">project.md</code> and a Node script that walks the tree, parses YAML with <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">gray-matter</code>, and emits one JS bundle the browser loads. That was the first time adding a project felt repeatable instead of scary.</p>
  </div>
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Early February 2026</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">Work experience, photo stacks, awards</p>
    <p style="font-size:0.88rem;color:#555;margin:0">The experience section went through six layout iterations. The current version uses a vertical timeline with fanning photo stacks that open the full gallery on click.</p>
  </div>
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Mid-February 2026</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">This site as a real pipeline</p>
    <p style="font-size:0.88rem;color:#555;margin:0">I started pushing seriously on this static setup in February: same folder idea extended to the blog (<code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">post.md</code> per entry, <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">npm run build:blog</code> to regenerate <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">generated/blog-data.js</code>), polish on the boot terminal, and tightening how cards and heroes resolve from frontmatter so new work is mostly “drop files, build, push.”</p>
  </div>
  <div class="b-titem">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">Late February 2026</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">Blog carousels, LinkedIn, YouTube, JSONBin</p>
    <p style="font-size:0.88rem;color:#555;margin:0">LinkedIn posts and YouTube rows are data-driven: <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">data/linkedin-posts.js</code> and <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">data/youtube-videos.js</code>, with helper scripts (<code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">scripts/add-linkedin.cjs</code>, <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">scripts/add-youtube.cjs</code>) so adding an entry is a small CLI flow instead of hand-editing giant objects. oEmbed fills card titles without a key; the Data API supplies views when a key is injected at deploy. Global likes go through JSONBin with secrets wired in GitHub Actions.</p>
  </div>
  <div class="b-titem" style="margin-bottom:0">
    <p style="font-size:0.72rem;color:#888;margin:0 0 0.15rem;letter-spacing:0.06em;text-transform:uppercase">March 2026</p>
    <p style="font-weight:800;font-size:1rem;margin:0 0 0.3rem">This post (and room to grow)</p>
    <p style="font-size:0.88rem;color:#555;margin:0">Still ongoing. I hope to add more posts on what I am building and keep the site in sync with projects and videos, and the pipelines are in place so it stays low-friction.</p>
  </div>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Matrix rain</h2>

<p style="margin:0 0 0.85rem">I put a full-screen canvas behind the terminal and drew falling green columns. It was fun to write and it looked sharp on a big external monitor. On the machine I actually use day to day it was laggy, took a long time to feel “ready,” and looked worse than I wanted. I wanted something a recruiter can open fast, with a path for people who want to dig deeper. Matrix rain failed both tests, so I deleted it.</p>

<div class="b-card" style="font-size:0.88rem;margin:0 0 1.25rem">
  <strong>What I kept instead:</strong> the ASCII face in a <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">&lt;pre&gt;</code>, same row-shift idea as the section below but light enough to load and read everywhere.
</div>

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:2.5rem 0 1rem;letter-spacing:-0.02em">The weekend I spent on a globe</h2>

<p>Before the face, I wanted a rotating “hacker globe” in ASCII. I went through countless open-source GitHub projects and could not get ASCII art to rotate in a way that felt right. Eventually I found an STL-to-ASCII pipeline where you could rotate the model, ported something like that in, and ended up with what you see in the boot flow. I said alright, good enough, and shipped it. It is not the rotating math globe I pictured, but it has its own weird charm and I still like how it looks.</p>

<pre style="background:#1a1a1a;color:#e0e0e0;padding:1rem 1.25rem;border-radius:8px;font-size:0.77rem;line-height:1.6;overflow-x:auto;margin:0 0 1.25rem;tab-size:2"><code><span style="color:#888">// The globe rotation algorithm,</span>
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

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Why everything lives in folders</h2>

<div class="b-split">
<div>
<p style="margin:0 0 0.85rem">Hardcoding everything in one HTML file meant every new case study was a surgery on the same page. I was going to keep shipping projects, so I needed a layout I could add to without touching unrelated sections.</p>
<p style="margin:0 0 0.85rem">What I do now is simple: one folder per project, a <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">project.md</code> with YAML at the top for title, dates, links, and HTML body below. Images sit next to the markdown with consistent names.</p>
<p style="margin:0">A Node script walks the folders, uses <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">gray-matter</code> for the frontmatter, and emits a single bundle the browser loads. Still static hosting. Still no database.</p>
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

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">How project cards sort</h2>

<p>Cards are not strictly chronological. I group them so placeholder examples stay visible while I build the real list, ongoing work sits in the middle, and older shipped work still shows up without burying the stuff I want people to click first. Inside each group it is newest first.</p>

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

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Work Experience (many drafts)</h2>

<img src="/assets/dev-site-experience.png" alt="Screenshot: Work Experience timeline (full page)" class="b-img-capped" loading="lazy" decoding="async">

<p>If anything on the site got redrawn over and over, it was this page. I wanted color and motion so it felt alive, but I was not sure how to bolt on effects that still scale when I add more roles. Real company logos would mean chasing assets and aspect ratios forever, so the “logos” on the timeline are mostly color, type, and simple shapes, easy to duplicate for the next job without a redesign.</p>

<p>What you see now is a vertical timeline with a saturated accent strip, those lettered blocks, tags, and a real paragraph per role. The photo stacks are plain images exported small, layered with absolute positioning, slight rotations, and a hover state that fans them out before you click into the lightbox. Same viewer as the design portfolio so I did not maintain two modal systems.</p>

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

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">YouTube on the blog page</h2>

<p style="font-size:0.9rem;margin:0 0 1rem">This section is separate from my long-running personal channel (since late 2019). The carousel on the Blog page reads from <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">data/youtube-videos.js</code> and opens a modal with an embed, description from the Data API when the key is present, oEmbed title on the card, and a global like counter backed by JSONBin.</p>

<p style="font-size:0.9rem;margin:0 0 1rem">The stock like UI kept lying to me (wrong video, stale counts, weird state when I closed and reopened modals fast), so I ended up calling the YouTube API myself, wiring view counts and a heart that syncs to one shared number per video. That was my first time minting an API key and shipping something that depends on it; I am usually the frontend person on a team, so the whole thing was a fun stretch.</p>

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

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">JSONBin and GitHub Actions bugs</h2>

<p>I wanted one like count per YouTube video for everyone who visits, not a number that only lived in local storage. Firebase wanted a card on file for the free tier. JSONBin did not, so I used their REST API and a single JSON blob.</p>

<p>It worked on my machine. After deploy, likes never stuck.</p>

<div style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:0 10px 10px 0;padding:1rem 1.25rem;margin:0 0 1rem">
<p style="font-weight:800;margin:0 0 0.5rem;font-size:0.95rem">What went wrong</p>
<p style="margin:0 0 0.75rem;font-size:0.88rem">Basically the formatting step screwed up how the secret was written out, so the file on disk was not the key I thought it was. I had to route the value through Node and <code style="background:#fef3c7;padding:0.1em 0.35em;border-radius:3px;font-family:monospace">JSON.stringify</code> so nothing got reinterpreted on the way. Total pain.</p>
<p style="margin:0;font-size:0.88rem">Every bad write came back <code style="background:#fef3c7;padding:0.1em 0.35em;border-radius:3px;font-family:monospace">401 Unauthorized</code>. The UI still looked fine locally, but nothing persisted server-side until the inject step was fixed.</p>
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

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Likes showing up on the wrong video</h2>

<p>After the key fix, I still saw weird UI: close a modal, open it again, count looked wrong. Open a second video, sometimes the heart state from the first one stuck around.</p>

<p>That was me not guarding async. A fetch for video A would finish after I had already opened video B, and the old callback would still touch the DOM.</p>

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

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Boot terminal</h2>

<p style="font-size:0.9rem;margin:0 0 1rem">This is one of my favorite parts of the site. I love ASCII art and the little “I am in a hacker movie” feeling you get from terminal UIs and tiny web games, so I went hard on easter eggs and boot animations. I also got ahead of myself and rushed a full CRT chrome pass first. After stepping back, I kept a proper command terminal for the real first screen and left the old CRT layer as a <strong>glitched</strong> alternate presentation, mostly for people who like poking under the hood.</p>

<img src="/assets/dev-site-terminal.png" alt="Screenshot: boot terminal with four panels" class="b-img-capped" loading="lazy" decoding="async">

<p style="font-size:0.9rem;margin:1.25rem 0 1rem">The first screen is a real (fake) shell. You type <code style="background:#f0f0f0;padding:0.1em 0.35em;border-radius:4px">Initialize</code> to run the boot animation. When it finishes, you are in a <strong>command phase</strong>: the site does not open until you type something.</p>

<p style="font-size:0.9rem">The bottom-right <strong>GUIDEBOOK</strong> panel lists the same commands as the in-terminal <code style="background:#f0f0f0;padding:0.1em 0.35em;border-radius:4px">HELP</code> output so nobody has to guess. Implemented commands today:</p>

<ul style="font-size:0.9rem;line-height:1.85;margin:0 0 1rem;padding-left:1.35rem">
  <li><strong>HELP</strong> (also <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">GUIDE</code>, <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">?</code>): prints the full list.</li>
  <li><strong>EXP</strong>: text-only walkthrough of my résumé order (Army National Guard through Dairy Queen). Then <strong>N</strong> / <strong>P</strong> step forward or back, <strong>Q</strong> returns to the command phase.</li>
  <li><strong>SPIN</strong>: temporarily multiplies how fast the ASCII portrait rotates (same renderer as the blog banner).</li>
  <li><strong>TIME</strong>: prints <code style="background:#f0f0f0;padding:0.08em 0.3em;border-radius:3px">Date.toString()</code> from your browser.</li>
  <li><strong>CLS</strong>: clears the transcript so the panel is readable again.</li>
</ul>

<p style="font-size:0.9rem;margin:0 0 1rem"><strong>Crucial:</strong> any line that is <em>not</em> one of those commands is treated as <strong>your name</strong>. That value personalizes the guest flow, is stored in <code style="background:#f0f0f0;padding:0.1em 0.35em;border-radius:4px">localStorage</code> for the next visit, and then the normal loading screen runs. If your name collides with a command, use your full name or a nickname.</p>

<p style="font-size:0.9rem;margin:0 0 1rem">Return visitors can skip the whole terminal when a recent normal-visit timestamp is still valid (same <code style="background:#f0f0f0;padding:0.1em 0.35em;border-radius:4px">localStorage</code> mechanism as before).</p>

<img src="/assets/dev-site-home.png" alt="Screenshot: home view (normal site after boot)" class="b-img-capped" loading="lazy" decoding="async">

<p style="font-size:0.9rem;margin:0 0 1rem">The <strong>crs</strong> / glitched layer keeps the CRT fantasy: scanlines, weird layout variants, an ASCII fish tank, a Flappy-style mini-game, and a horse mini-game inspired by the old “random button” energy. It is intentionally undocumented in the guidebook: a reward if you go looking.</p>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Stack</h2>

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

<p>No React. No Vue. No Webpack. No <code style="background:#f0f0f0;padding:0.1em 0.4em;border-radius:4px;font-size:0.9em">node_modules</code> at runtime. The entire site is one <code style="background:#f0f0f0;padding:0.1em 0.4em;border-radius:4px;font-size:0.9em">index.html</code> with everything inlined, so it stays wicked fast even on rough hardware, which is how I think more of the web ought to behave. Nav clicks are instant because there is no routing, no hydration, no bundle to parse. Pages swap by toggling CSS visibility on pre-rendered blocks already in the DOM.</p>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">What is next</h2>

<p>Right now the design tab still has a placeholder card, this is the only long post, and the social carousels are thin on purpose. I cared more about having the pipelines in place (markdown in folders, build scripts, deploy) than about filling every slot on day one.</p>

<p>When a project is worth explaining, it gets a folder and a write-up. I want to blog more to sharpen my writing and keep people posted on what I am shipping. Down the road I might add more tabs or sections; still figuring out the shape of that.</p>

<p style="margin:1.25rem 0 0;font-size:0.95rem;color:#4b5563;line-height:1.7">If something looks cached weird, <code style="background:#f0f0f0;padding:0.08em 0.35em;border-radius:4px">Ctrl+Shift+R</code> (hard refresh) clears it. After you enter your name on the normal boot flow, close the UI upgrade popup with the <strong>X</strong> and you can wander into the glitched CRT layer. I hope to add more soon. Thanks for reading.</p>
