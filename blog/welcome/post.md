---
title: "Welcome to my website V1"
date: "03/2026"
banner: ascii-face
excerpt: "Build overview for OG version of this site. Some cool folder pipelines, Work Experience iterations, and the boot terminal stuff. This is also what blogs will look like."
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
  <span class="b-tag">Example tag</span>
  <span class="b-tag b-tag--green">I'll say like: Lessons learned</span>
  <span class="b-tag b-tag--amber">Or: Build log</span>
  <span class="b-tag">Design!!!</span>
  <span class="b-tag b-tag--red">You get the point</span>
</div>

<p style="font-size:1.18rem;line-height:1.8;color:#555;font-weight:500;margin:0 0 1rem">The face in the banner is not a GIF from the internet. It's a cooked requestAnimationFrame loop that I coudn't get the rotate. I built it after I gave up on making a real 3D globe. I thought a rotating globe in a terminal made out of ascii art would be cool but I'm no zuck, so...</p>

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Timeline Example:</h2>

<div class="b-timeline" style="margin:0 0 2rem">
  <div class="b-titem"><strong>Block1:</strong> one word typically</div>
  <div class="b-titem"><strong>Block2:</strong> med desc OOooOo</div>
  <div class="b-titem"><strong>Block3:</strong> Short desc.</div>
  <div class="b-titem" style="margin-bottom:0"><strong>Final:</strong> Fill this whole section with jargon</div>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Some History on me</h2>

<p style="margin:0 0 0.85rem">In my freshman year of high school I was deep into game development. Though my life goals were to be a pediatrician, not a software engineer. During that time I watched a YouTuber named Dani make silly 2D platformers in Unity (especially while he was working on Karlson) and I loved the humor. I was super inspired and wanted to make my own game, which led to yard work for a bunch of people in my town until I could afford a PC, then I got Unity and watched a million C# tutorials. I did not even pick up Python until senior year, all I did was code on unity.</p>

<p style="margin:0 0 0.85rem">All four years I took IT classes. That is what pulled me into the wider tech space: cybersecurity, terminals, ports, hardware, how networks behave. I passed the first half of CompTIA A+ and pretty miserably failed the second half. I am still hoping for a redemption arc and finishing the cert someday, but Network+ seems more enticing so idk.</p>

<p style="margin:0 0 0.85rem">I grew up in Tualatin, Oregon, a suburb ish area of Portland where the closest tech scene was a long long drive away. My town was also filled with mostly old retired people who were tech illiterate, so there wasn't much of a tech community there. My "version control" was a Google Doc where I pasted scripts whole. The tab title was literally cobi = best coder. I really thought that arrogance alone would carry me straight into fully polished AAA games. That arrogance never really left, but I do a better job hiding it now, ha!</p>

<p style="margin:0 0 1rem;font-size:0.92rem;color:#555">Below is the actual Google Doc that held all the code. I used to name every game GDC (game design class) plus a number and paste the movement script from the last project, so iterations and Frankensteins were always happening. The doc got mangled over time and bounced around the class. It is a mishmash of a couple YouTube tutorials and frustration from Unity's official car tutorial. So if you read it and you're like, oh wow this guy sucks, just know you're bullying a 15 year old who's trying his best.</p>

<!--BLOG_GDOC_FRAGMENT-->

<p style="margin:1.25rem 0 0.85rem">By senior year I was editing weekly news for the school's channel, airing every Wednesday to around 2,500 students. I ran social for our esports and tennis programs, stacked competitions and coursework, and still entered Oregon's regional programming challenge, codeORcreate, where I won Best Presentation. I thought I was super cracked but in reality I was just splitting my time up between too many things. It did teach me a lot about time management though.</p>

<p style="margin:0 0 0.85rem">The rest of the calendar was clubs: robotics (state champions my junior year but I wasn't reaaaalllyy apart of it at that point), game design club (we showed a project at the Oregon Game Project Challenge), LEAP Youth Alliance (drug-prevention coalition with town halls and volunteer events), Key Club, National Honor Society, feminism club, and a few more. Everything should be listed under high school section of my Linkedin</p>

<p style="margin:0 0 1.25rem">Since December 2019 I have run a personal YouTube channel, or used to, I ended it like a couple days ago because of the army. But for years I posted about two videos a week and streamed a lot on the side. Around 2024 that slowed to about one video a month. I planned to retire that channel in September and start a new one aimed at informational coding videos and project updates. That date came a lot faster than I wanted though. For the future, the carousel on this site's Blog page is set up for whatever I publish next.</p>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Why did I make a website </h2>

<p>I need a portfolio... </p>

<div class="b-split-3">
  <div class="b-card" style="border-left:4px solid #6366f1">
    <p style="font-size:0.75rem;color:#888;margin:0 0 0.3rem;text-transform:uppercase;letter-spacing:0.06em">Example goal card</p>
    <p style="font-weight:700;margin:0 0 0.35rem">I am cards</p>
    <p style="font-size:0.84rem;color:#555;margin:0">description!</p>
  </div>
  <div class="b-card" style="border-left:4px solid #6366f1">
    <p style="font-size:0.75rem;color:#888;margin:0 0 0.3rem;text-transform:uppercase;letter-spacing:0.06em">Example goal card</p>
    <p style="font-weight:700;margin:0 0 0.35rem">I are cards</p>
    <p style="font-size:0.84rem;color:#555;margin:0">descrr!</p>
  </div>
  <div class="b-card" style="border-left:4px solid #6366f1">
    <p style="font-size:0.75rem;color:#888;margin:0 0 0.3rem;text-transform:uppercase;letter-spacing:0.06em">Example goal cardq</p>
    <p style="font-weight:700;margin:0 0 0.35rem">I is cards</p>
    <p style="font-size:0.84rem;color:#555;margin:0">desc!</p>
  </div>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Folder system</h2>

<div class="b-split">
<div>
<p style="margin:0 0 0.85rem">Hardcoding everything in one HTML file meant every new case study was a surgery on the page. If I was going to keep adding projects, I needed a layout I could add to without touching unrelated sections (also keeps things simple).</p>
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

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">Work Experience tab</h2>

<img src="/assets/dev-site-experience.png" alt="Screenshot: Work Experience timeline (full page)" class="b-img-capped" loading="lazy" decoding="async">


<p>The photo stack is also really cool. For roles that have media attached, a stack of three overlapping photos sits in the dead space under the date. The cards fan out slightly using CSS rotation transforms. On hover, the back cards slide apart:</p>

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
<p style="font-size:0.9rem;margin:0 0 0.85rem">Clicking the stack opens the full gallery modal, the same lightbox used for the design portfolio.</p>
<p style="font-size:0.9rem;margin:0 0 0.85rem">The stack sits at <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">position: absolute; right: 0; top: 4.5rem</code> inside the experience body, which is <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">position: relative</code>. The text layout is completely unaffected, but the stack floats in the dead space under the date column.</p>
<p style="font-size:0.9rem;margin:0">Finding the right <code style="background:#f0f0f0;padding:0.1em 0.3em;border-radius:3px">top</code> value took forever but it looks neat on hover.</p>
</div>
</div>

<hr style="border:none;border-top:2px solid #f0f0f0;margin:2.5rem 0">

<h2 style="font-size:1.5rem;font-weight:900;color:#111;margin:0 0 1rem;letter-spacing:-0.02em">What is next</h2>

<p>When a project is worth explaining, it gets a folder and a write-up. I want to blog more to sharpen my writing and keep people posted on what I am shipping. Down the road I might add more tabs or sections; still figuring out the shape of that.

the tech stack is just html and markdown files, don't hit me with any complex bs questions</p>

<p> After you enter your name on the normal boot flow, close the UI upgrade popup with the <strong>X</strong> and you can wander into the glitched CRT layer. I hope to add more soon. Thanks for reading.</p>
