---
title: "Design overhaul, or: I threw out the one giant HTML file"
date: "10/2026"
cover: cyberpunk-pga.jpg
excerpt: "Why I rebuilt jacobiglenn.com in React, stole the vibe from Marathon and Watch Dogs without paying for fonts, and made adding a blog post as boring as dropping a folder."
---

<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin:0 0 1.25rem">
  <span class="b-tag">Build log</span>
  <span class="b-tag b-tag--green">Fonts</span>
  <span class="b-tag b-tag--amber">Folder pipeline</span>
  <span class="b-tag">Vite + React</span>
</div>

<p>I kept the first post up as a time capsule of V1. This one is about tearing that machine apart on purpose. Same site, same domain, way less "paste it into index.html and pray."</p>

<p>The short version: the old stack was a single static page doing too many jobs. Terminal boot, CRS mode, portfolio, experience, blogs, all fighting in one file. It worked until I wanted to change the look without breaking the content pipeline. Then it got embarrassing. So I rebuilt it as a Vite + React + TypeScript app, kept the folder-drop content system, and aimed the chrome at a mix of Bungie Marathon terminals, Watch Dogs HUD junk, and a little Cyberpunk neon. Not a cosplay of any of those games. More like I sat in those palettes until the site stopped looking like a default Tailwind dashboard.</p>

<h2>The mood board I actually used</h2>

<p>I am not going to pretend I art-directed this in Figma for six weeks. I looked at games I already loved, stole the feeling, and then simplified until it felt like me.</p>

<figure>
  <img src="/blog/design-overhaul/marathon-logo.svg" alt="Marathon trilogy logo, the M that also shows up as a Reclaimer mark in Halo" width="280" style="max-width:280px;background:#111;padding:1.5rem;display:block;margin:0 auto">
  <figcaption>Marathon trilogy mark. Source: Wikimedia Commons, file Marathon Logo.svg. Original mark by Bungie, vector by Sierra-D421 on Halopedia. Simple shapes, lots of empty space. That is the boot now.</figcaption>
</figure>

<p>Marathon is the one that stuck for load-in. Those terminals are mostly black, a little amber, a couple of glyphs, and then they shut up. I tried a busy Watch Dogs hex network first and it looked like I was trying too hard. The version that shipped is two lines and four marks. If you blink you miss it, which is the point.</p>

<figure>
  <img src="/blog/design-overhaul/watch-dogs-logo.svg" alt="Watch Dogs wordmark" width="420" style="max-width:420px;background:#efe8d6;padding:1.25rem;display:block;margin:0 auto">
  <figcaption>Watch Dogs wordmark. Source: Wikimedia Commons, file Watch Dogs.svg. Ubisoft Montreal / Ubisoft. The ctOS grid, lime on charcoal, and the "everything is a panel" feeling came from here more than the logo itself.</figcaption>
</figure>

<p>Watch Dogs is where the lime-on-dark and the clipped island nav came from. I like how that game treats UI as architecture. Corners are cut. Labels are mono. You always feel like you are looking at a system, not a brochure. I still pulled back from the full DedSec glitch thing. Scramble-on-click was cute for about ten minutes and then it was just noise.</p>

<figure>
  <img src="/blog/design-overhaul/cyberpunk-pga.jpg" alt="Cyberpunk 2077 booth at Poznań Game Arena 2019" style="width:100%;display:block">
  <figcaption>Cyberpunk 2077 booth, Poznań Game Arena 2019. Photo by Wiktor Szczepaniak on Wikimedia Commons (PGA 2019 Cyberpunk 2077.jpg), CC BY-SA 4.0. Night City is louder than I wanted the site to be, but the density of signage and the yellow-green against black is in the palette.</figcaption>
</figure>

<p>Cyberpunk is the "do not make it beige" reminder. I did not rebuild Night City in CSS. I just refused to ship another gray SaaS portfolio. Cream type on near-black, one loud accent, done.</p>

<h2>Fonts, or: I am a broke college kid</h2>

<p>I was not about to drop money on a licensed display face for a personal site that also has to live on GitHub Pages. Adobe Fonts, Monotype, all of that is a future-me problem for when I have a salary and not a dining hall swipe. Google Fonts is free, they load, and if the CDN is slow the fallbacks are still readable. That is the whole business case.</p>

<p>The stack I landed on:</p>
<ul>
  <li><strong>Big Shoulders Display</strong> for titles. Condensed, a little athletic, reads as a headline without looking like Impact. Display weight 800 for my name.</li>
  <li><strong>Tektur</strong> for body UI. Geometric enough to feel designed, not so sci-fi that a paragraph becomes a science fair poster.</li>
  <li><strong>IBM Plex Mono</strong> for labels, dates, chips, code. I wanted something that looks like a terminal without being Courier New from 1998.</li>
</ul>

<p>The name cycler on Home cheats a little and pulls extra Google faces for the gag: Orbitron, Black Ops One, Share Tech Mono, Bungee, Russo One. Same reason. They are free, they look stupid in a good way, and they match the Python GIF I already use on GitHub. If a recruiter hates Bungee they can wait 2.2 seconds.</p>

<p>Credits, because I said I would: all of those fonts are by their Google Fonts designers (Lucas de Groot adjacent families, Patryk Dworznik, IBM, etc.). I am not claiming I drew them. I claimed a CSS import and went back to homework.</p>

<h2>What the old tech stack actually was</h2>

<p>V1 was honest. One <code>index.html</code>, a pile of CSS, generated JS hanging off <code>window</code>, a terminal you had to type through, and a 24 hour skip cookie. Adding a project meant a markdown file plus a build script that dumped JSON-as-JS. That part was good! The bad part was everything living in one document: routing by showing and hiding sections, photo popups fighting <code>position: fixed</code>, and any visual rewrite meaning I had to grope through a 4,000 line file hoping I did not delete the experience timeline.</p>

<p>It also trained me to ship "clever" before "clear." The terminal was fun. It was also a gate. People who just wanted the resume should not have to remember a command. I still like CLI energy. I do not need it as a bouncer.</p>

<h2>What I switched to, and why that is the future of this repo</h2>

<p>Now it is Vite 7, React 19, TypeScript, Tailwind v4, React Router. Pages are files. The HUD is components. Content is still folders. GitHub Pages still gets a static <code>dist</code> with a CNAME. I did not add a backend. I am not hosting a CMS. I am a student. If the laptop dies, the site is still markdown and JSON in git.</p>

<p>That split is the whole win. Design can move without me rewriting every blog by hand. A new route is a page, not a new <code>data-page</code> attribute. TypeScript yells when I forget a field on a job card. I can throw away a boot animation and not orphan twenty functions that only the terminal used. We already did that cleanup: CLI, Readable mode, leftover Radix dialogs, old <code>generated/*-data.js</code>. Dead weight from a site that no longer exists.</p>

<h2>The folder system, which is still the cool part</h2>

<p>This is the piece I would keep even if I rewrote the UI again tomorrow.</p>

<p><strong>Projects.</strong> Drop a folder in <code>devProjects/your-slug/</code> or <code>designProjects/your-slug/</code> with a <code>project.md</code>. Frontmatter is title, dates, GitHub, cover image, featured flag. The rest of the file is HTML for the write-up. <code>npm run generate</code> (or just <code>npm run dev</code>) walks those folders with gray-matter and writes <code>generated/projects.json</code>. The app imports that JSON. No admin panel. No "remember to copy the card markup."</p>

<p><strong>Blogs.</strong> Same idea under <code>blog/your-slug/post.md</code>. Optional cover image in the folder. Optional Google Doc fragment if I am messy. Build writes <code>generated/blog.json</code>. This post is that pipeline eating its own cooking: new folder, markdown, images sitting next to the file, generate, it shows up on /blog.</p>

<p><strong>Experience.</strong> <code>data/experience.json</code> plus a small merge script, because jobs are structured (tags, galleries, subroles) and I did not want to pretend that is a blog post.</p>

<p><strong>Social carousels.</strong> LinkedIn and YouTube still have helper scripts so I am not hand-editing dates in JSX. That is the only "CMS" I want.</p>

<p>Why it is cool: the design overhaul did not require migrating essays into a database. I changed the chrome. The writing stayed. When I add PocketZot 2 or another rant, I make a folder, I do not open twelve components. Future Jacobi can restyle this in 2028 and the posts will still be there, which is the opposite of how V1 felt.</p>

<h2>What I am still not doing</h2>

<p>I am not buying webfonts. I am not putting the terminal back. I am not chasing a perfect 1:1 Marathon HUD, because then it stops being a portfolio and starts being a fan page. The site should look like I care, load fast enough on a library laptop, and let me publish without a ceremony.</p>

<p>If you are reading this because you clicked Blog from the island nav: hi. If you are a recruiter who skipped the puzzles on Home, also hi. The 4x4 grid is a joke. The folder pipeline is not.</p>
