---
title: "Design overhaul, or: I threw out the one giant HTML file"
date: "10/2026"
banner: boot-anteater
excerpt: "Why I rebuilt jacobiglenn.com in React, stole the vibe from Marathon, Watch Dogs, Akira, Evangelion, and Neuromancer without paying for fonts, and made adding a blog post as boring as dropping a folder."
---

<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin:0 0 1.25rem">
  <span class="b-tag">Build log</span>
  <span class="b-tag b-tag--green">Fonts</span>
  <span class="b-tag b-tag--amber">Folder pipeline</span>
  <span class="b-tag">Vite + React</span>
</div>

<p>I kept the first post up as a time capsule of V1. This one is about tearing that machine apart on purpose. Same site, same domain, way less "paste it into index.html and pray."</p>

<p>The short version: the old stack was a single static page doing too many jobs. Terminal boot, CRS mode, portfolio, experience, blogs, all fighting in one file. It worked until I wanted to change the look without breaking the content pipeline. Then it got embarrassing. So I rebuilt it as a Vite + React + TypeScript app, kept the folder-drop content system, and aimed the chrome at a mix of Bungie Marathon terminals, Watch Dogs HUD junk, Cyberpunk neon, Akira's Neo-Tokyo, Evangelion's warning-tape UI, and the cold console-cowboy logic of Neuromancer. Not a cosplay of any of those. More like I sat in those palettes until the site stopped looking like a default Tailwind dashboard.</p>

<h2>The mood board I actually used</h2>

<p>I am not going to pretend I art-directed this in Figma for six weeks. I looked at HUDs. Not press-tour photos of guys in jackets. Interfaces, overlays, fake operating systems, the stuff that sits on top of the world.</p>

<figure class="b-shot">
  <img src="/blog/design-overhaul/marathon-game-2.jpg" alt="Marathon exterior with neon signage" style="width:100%;display:block">
  <figcaption>Another Marathon still from the same Wccftech piece / Bungie press kit. Tau Ceti as architecture. I wanted the site to feel like a facility you jack into, not a landing page with a stock gradient.</figcaption>
</figure>

<p>Marathon is still the boot. Terminals that are mostly black, a little signal, then they shut up. I tried a busy hex network first and it looked like I was trying too hard. The version that shipped is two lines and four marks.</p>

<figure class="b-shot">
  <img src="/blog/design-overhaul/cyberpunk-nettech.jpg" alt="NETTECH OS overlay, a fake desktop HUD in Cyberpunk neon" style="width:100%;display:block">
  <figcaption>NETTECH OS, a Cyberpunk 2077 Wallpaper Engine overlay by 幽霊 on Steam Workshop (file 3256967333). Fake OS, clipped panels, clocks, widgets. This is the Watch Dogs ctOS cousin: the screen as a machine you live inside. Ubisoft's actual ctOS wallpaper I wanted is a video file, so this is the still that shows the same idea.</figcaption>
</figure>

<figure class="b-shot">
  <img src="/blog/design-overhaul/cyberpunk-hud.jpg" alt="NETTECH OS desktop with neon widgets and audio-reactive chrome" style="width:100%;display:block">
  <figcaption>Second NETTECH still from the same Workshop page. Audio-reactive chrome, stacked modules. Island nav and the corner ticks on cards come from this family of fake operating systems, not from a wordmark on a white square.</figcaption>
</figure>

<p>Watch Dogs is in that stack even if the screenshot is a Cyberpunk skin. ctOS, DedSec, lime on charcoal, UI as architecture. Labels in mono. I still pulled back from full glitch-on-click. That was cute for ten minutes.</p>

<figure class="b-split-fig">
  <img src="/blog/design-overhaul/cyberpunk-netrunner.jpg" alt="Cyberpunk 2077 netrunner combat with quickhack overlays on screen" style="width:100%;display:block">
  <figcaption>Netrunner combat overlay from IGN's Best Netrunner Build wiki. CD Projekt RED / Cyberpunk 2077. Quickhacks, RAM, the city as a system you breach. That is Neuromancer leaking in through a game: ICE, decks, information as a place. Also the "do not make it beige" reminder. I did not rebuild Night City in CSS. I refused another gray SaaS portfolio.</figcaption>
</figure>

<figure class="b-split-fig">
  <img src="/blog/design-overhaul/edgerunners.jpg" alt="Cyberpunk Edgerunners neon city aesthetic still" style="display:block">
  <figcaption>Edgerunners aesthetic still, via Pinterest (ideas board cyberpunk-edgerunners-aesthetic). Trigger Studio / CDPR. Pink-cyan night, signage stacked until it hurts. Density. Akira lives here too: Neo-Tokyo piled on itself. I did not need a photo of a replica bike or a writer at a lectern.</figcaption>
</figure>

<p>Akira is the red-black "one object in a huge dark field" move. Boot glyphs, the name, a card. If the headline has to share the frame with a portrait, I already lost.</p>

<figure class="b-shot-sm">
  <img src="/blog/design-overhaul/eva-ui.jpg" alt="Neon Genesis Evangelion MAGI-style computer UI" style="width:100%;display:block">
  <figcaption>Evangelion computer UI. Pin: neon-genesis-evangelion-ui (Pinterest). Gainax / Khara. Blocky terminals, scanlines, text that looks printed for a military contractor. Condensed titles. That is why Big Shoulders Display even got a look.</figcaption>
</figure>

<figure class="b-shot-sm">
  <img src="/blog/design-overhaul/eva-magi.jpg" alt="MAGI OS interface from Evangelion, three system cores on screen" style="width:100%;display:block">
  <figcaption>MAGI OS layout. Pin 120049146304685119 on Pinterest. Three cores, schematic junk, orange on black. Hazard tape UI. That leaked into clip-paths and the "this interface is older than it should be" wear, without putting Unit-01 on a resume.</figcaption>
</figure>

<p>Evangelion is industrial sci-fi with feelings. Neuromancer is the book under all of this: console cowboy, black glass, a city you jack into. The screens above are the pictures. Gibson's face is not.</p>

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

<p>Now it is a real app that still deploys like a brochure. Vite 7, React 19, TypeScript, Tailwind v4, React Router 7. Pages are files. The HUD is components. Content is still folders. GitHub Pages still gets a static <code>dist</code> with a CNAME. I did not add a backend. I am not hosting a CMS. I am a student. If the laptop dies, the site is still markdown and JSON in git.</p>

<p>People ask why not Next.js. Fair. I like Next. PocketZot and Zotletics live there. This repo does not need a server, a database, or an edge function that bills me surprise money. GitHub Pages is free, the domain already pointed here, and Vite's static build is the whole product. HMR is instant. <code>npm run generate</code> dumps JSON. <code>npm run build</code> writes <code>dist/</code>. That is the pipeline. I did not want to teach myself App Router just to host a resume.</p>

<p>Here is what each piece actually does, because "I rewrote it in React" is not a tech stack:</p>
<ul>
  <li><strong>Vite 7</strong> is the bundler and the local server. It also runs the generate scripts on <code>npm run dev</code>, so a new blog folder shows up without me remembering a second command. Fast refresh means I can poke a HUD component and see it without a full reload, which is the opposite of editing a 4,000 line HTML file and praying the cache missed.</li>
  <li><strong>React 19</strong> is the UI. Routes mount pages. Island nav, boot overlay, lightboxes, the 4x4 grid, this header: components. If I delete the boot animation I am not hunting twenty functions that only the terminal used. We already did that cleanup. CLI, Readable mode, leftover Radix dialogs, old <code>generated/*-data.js</code>. Dead weight from a site that no longer exists.</li>
  <li><strong>TypeScript</strong> yells when a job card is missing a field or a blog post forgets a date. V1 stored everything on <code>window</code> and hoped. I still write messy HTML in the markdown bodies on purpose. The shell around them is typed. That split is the whole win.</li>
  <li><strong>Tailwind v4</strong> plus a small <code>index.css</code> for the stuff utilities should not own: boot glyphs, scanlines, lightbox fade, this radar. Theme tokens live in CSS (<code>--color-accent</code> is that lime). I am not maintaining a second design system. I am not paying for one either.</li>
  <li><strong>React Router 7</strong> is how you get here. <code>/blog/design-overhaul</code> is a route, not a <code>data-page</code> attribute and a hidden section. Back is a link. Refresh does not dump you on Home. That sounds boring until you have shipped the other way.</li>
  <li><strong>GitHub Pages + CNAME</strong> is still the host. Custom domain, static files, no Docker. The generate scripts (gray-matter over folders) write <code>generated/*.json</code> that the app imports. Same folder drop as V1. Different chrome.</li>
</ul>

<p>A request hits the site like this. GitHub serves <code>index.html</code>. Vite's built bundle boots React. Router reads the path. Layout paints the HUD and island nav. The page component reads JSON that a Node script already baked. Markdown bodies are already HTML strings. Images live next to the post folder and get copied as static assets. There is no database round trip. There is no "please wait, fetching posts." If generate did not run, the post does not exist. That is a feature. I cannot forget to deploy content separately from the app because they are the same commit.</p>

<p>Design can move without me rewriting every blog by hand. A new route is a page. I can throw away a boot animation without orphaning the experience timeline. Future Jacobi can restyle this in 2028 and the posts will still be there, which is the opposite of how V1 felt.</p>

<h2>The folder system, which is still the cool part</h2>

<p>This is the piece I would keep even if I rewrote the UI again tomorrow.</p>

<p><strong>Projects.</strong> Drop a folder in <code>devProjects/your-slug/</code> or <code>designProjects/your-slug/</code> with a <code>project.md</code>. Frontmatter is title, dates, GitHub, cover image, featured flag. The rest of the file is HTML for the write-up. <code>npm run generate</code> (or just <code>npm run dev</code>) walks those folders with gray-matter and writes <code>generated/projects.json</code>. The app imports that JSON. No admin panel. No "remember to copy the card markup."</p>

<p><strong>Blogs.</strong> Same idea under <code>blog/your-slug/post.md</code>. Optional cover image in the folder. Optional Google Doc fragment if I am messy. Build writes <code>generated/blog.json</code>. This post is that pipeline eating its own cooking: new folder, markdown, images sitting next to the file, generate, it shows up on /blog.</p>

<p><strong>Experience.</strong> <code>data/experience.json</code> plus a small merge script, because jobs are structured (tags, galleries, subroles) and I did not want to pretend that is a blog post.</p>

<p><strong>Social carousels.</strong> LinkedIn and YouTube still have helper scripts so I am not hand-editing dates in JSX. That is the only "CMS" I want.</p>

<p>Why it is cool: the design overhaul did not require migrating essays into a database. I changed the chrome. The writing stayed. When I add PocketZot 2 or another rant, I make a folder, I do not open twelve components. Future Jacobi can restyle this in 2028 and the posts will still be there, which is the opposite of how V1 felt.</p>

<h2>What I am still not doing</h2>

<p>I am not buying webfonts. I am not putting the terminal back. I am not chasing a perfect 1:1 Marathon HUD or a NERV splash screen, because then it stops being a portfolio and starts being a fan page. The site should look like I care, load fast enough on a library laptop, and let me publish without a ceremony.</p>

<p>If you are reading this because you clicked Blog from the island nav: hi. If you are a recruiter who skipped the puzzles on Home, also hi. The 4x4 grid is a joke. The folder pipeline is not.</p>
