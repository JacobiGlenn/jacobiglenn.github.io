---
title: "Design overhaul"
date: "10/2026"
banner: boot-anteater
excerpt: "The complete vision for what the site should have been. With huge inspo from Marathon, Watch Dogs, Cyberpunk, and Evangelion. It's all in react now too!"
---

<div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin:0 0 1.25rem">
  <span class="b-tag">Build log</span>
  <span class="b-tag b-tag--green">I love UI/UX</span>
  <span class="b-tag b-tag--amber">Folder pipeline</span>
  <span class="b-tag">Vite + React</span>
</div>

<p>I kept the first post up as a sort of time capsule for what the website used to be. I like to think that over time things will change and maybe I'll be able to vibecode less of the site to get what I want out of it and people can look back at the blogs to see the change. I like the idea of an actively updated blog list though."</p>

<p>TL;DR The old stack was a single, 4476 line, static page of HTML. I packed it full of a bunch of random junk like a Terminal boot, CRS mode, portfolio, experience, blogs, all jammed between animations buttons. So I rebuilt it as a Vite + React + TypeScript app, which is something I've seen used ALL over campus (like every club uses this stack so I thought it would be good practice). I did keep the folder-drop content system though because it's real nice.</p>

<h2>Mood board</h2>

<p>I am not going to pretend I art-directed this in Figma for six weeks. I looked at cool videogame HUDs and picked out what I liked. I went through Interfaces, overlays, and like... way too many fake operating systems. I ended up taking most of my inspiration from Bungie's Marathon, It's this really cool game stylistically that has many of the Cyberpunk elements I like, but not a lot of junk floating around (which is a maximalist problem many cyber esk stuff faces).</p>

<figure class="b-shot">
  <img src="/blog/design-overhaul/marathon-game-2.jpg" alt="Marathon exterior with neon signage" style="width:100%;display:block">
  <figcaption>Another Marathon still from the Bungie press kit. I wanted the site to have this like... otherworldly feel. Marathon nails this very ominous feeling within tech (when its not being super rebecca from cyberpunk) that I can only describe as BIG. Theres a word for it, I just dont rememebr, but it's that feeling of being afriad of something so big in an even bigger space, like the dead transfromers floating in the dark side of the moon.</figcaption>
</figure>

<p>On boot you can see the inspiration from Marathon with the black and green. I swear to god though if someone says squid game im gonna tweak. I wanted to make something that had a boot up screen and I was thinking of what is like a simple, quick one to do, cursor gave me some symbols as placeholders since they were along the margins and it just kinda stuck? I like that it also could be used in the MAGI system as well, even though It's not like a huge part of the website. I just coudn't find a reason to make it a bigger feature, even though I really wanted to.</p>

<figure class="b-shot">
  <img src="/blog/design-overhaul/cyberpunk-nettech.jpg" alt="NETTECH OS overlay, a fake desktop HUD in Cyberpunk neon" style="width:100%;display:block">
  <figcaption>NETTECH OS, a Cyberpunk 2077 Wallpaper Engine overlay by 幽霊 on Steam Workshop. This is another really cool Fake OS that comes with clipped panels, clocks, and widgets. This is the Watch Dogs ctOS cousin. Ubisoft's actual ctOS is lowkey ugly at times but this fits the vibe so well.</figcaption>
</figure>

<figure class="b-shot">
  <img src="/blog/design-overhaul/cyberpunk-hud.jpg" alt="NETTECH OS desktop with neon widgets and audio-reactive chrome" style="width:100%;display:block">
  <figcaption>Second NETTECH still from the same Workshop page, I think this might be an in game screenshot though. I really really like how this looks and this is the sorta terminal adjacent look that I really like. Im a big fan of thin lines and an ugly CRT glow, so this is right up my ally. Look around at the sit you are on, you can see how much I stole from this one singular image.</figcaption>
</figure>

<p>I am also really into a lot of the cyberpunk edgerunner promotional stuff, the glow of everything was a huge inspiration. I especially like the greens and the way the tech looks. The actual UI in the game is especially cool and it blends a lot of the elements I really like together.</p>

<figure class="b-split-fig">
  <img src="/blog/design-overhaul/cyberpunk-netrunner.jpg" alt="Cyberpunk 2077 netrunner combat with quickhack overlays on screen" style="width:100%;display:block">
  <figcaption>Netrunner combat overlay from IGN's Best Netrunner Build wiki. CD Projekt RED / Cyberpunk 2077. I love a lot of what this overlay looks like and you can see what I mean by those thin line UI's. Look at the previous image and this one, see where they overlap, and see where the site overlaps. That's the vibe I am going for. I think it has a unique aura.</figcaption>
</figure>

<p>One of the greates shows of all time, Neon Genesis Evangelion, has inspired me more than any piece of media to ever exist. I cannot even begin to tell you how much I love Evangelion. So of course the first images I saved were of the MAGI. In fact, my Canvas Student backgrounds for classes are Evangelion themed. The look of the MAGI and the Link tech is really cool to me and I wanted to incorperate some of the elements of those systems. While the systems themselves are rather busy (as needed by the show, don't trip here) I do think the way it uses the complementary UI elements is especially effective. Thats why I have the random BS in the margins like "0xC5" and so on. Functionally? Useless ( I did try to make them be little nav bars but it was busy and ugly ), but stylistically its real cool.</p>

<figure class="b-shot-sm">
  <img src="/blog/design-overhaul/eva-ui.jpg" alt="Neon Genesis Evangelion MAGI-style computer UI" style="width:100%;display:block">
  <figcaption>Evangelion computer UI. Pin on Pinterest. Blocky terminals, scanlines, text that looks printed for a military contractor. Condensed titles. Helped guide me to "Big Shoulders Display" for a font.</figcaption>
</figure>

<figure class="b-shot-sm">
  <img src="/blog/design-overhaul/eva-magi.jpg" alt="MAGI OS interface from Evangelion, three system cores on screen" style="width:100%;display:block">
  <figcaption>MAGI OS layout. Another Pin on Pinterest. Three cores, schematic junk, orange on black. Hazard tape UI. I like a lot of the supporting elemetns of this one specifically</figcaption>
</figure>

<h2>"Graphic design is my passion"</h2>

<p>If you know me, like... really know me. You know I am a big font guy. I have taken so many graphic design classes and I love love love talking about fonts. So this was obviously a like, 5 hour dilema. Especially since I coudn't steal the absolutely gorgous marathon weapon title font. God bless her soul she is so perfect. Regardless, I was not about to drop money on a licensed display face for a personal site that lives on GitHub Pages of all things. Adobe Fonts, Monotype, all of that is a future-me problem for when I have a salary and not ice cereal bi-weekly. Google Fonts is free and they load on pretty much everything so I dont really care. So go uh... big shoulder display.... and... IBM Plex! Cool. Good enough. Tektur is great though, I better NEVER hear any slander.</p>

<p>Font Stack</p>
<ul>
  <li><strong>Big Shoulders Display</strong> for titles. Condensed, a little athletic, reads as a headline without looking like Impact. Display weight 800 for my name.</li>
  <li><strong>Tektur</strong> for body UI. Geometric enough to feel designed, not so sci-fi that a paragraph becomes a science fair poster. (cursor wrote this when I asked it to create filler text and its lowk funny so I'm leaving it)</li>
  <li><strong>IBM Plex Mono</strong> for labels, dates, chips, code. This is a little boring but it does it's job, which pretty much sums up IBM as a company.</li>
</ul>

<p>Credits: all of those fonts are by their Google Fonts designers (Lucas de Groot adjacent families, Patryk Dworznik, IBM, etc.). I am not claiming I created any, all rights go to the respective creators.</p>

<h2>Old VS New</h2>

<p>The previous website was one super long index.HTML that housed everything. I would show and hide different pages to get them on screen. I though it was smart because it was faster but the maintenece when I wanted to add ANYTHING was so awful. So now its Vite 7, React 19, TypeScript, Tailwind v4, and React Router 7 instead of only HTML. Pages are files. The HUD is built with components (thank you CTC). Content is still folders. So overall I think it's pretty spiffy.</p>

<p>Did you just ask why not Next.js? Good question. This repo does not need a server or a database. GitHub Pages is free, the domain already pointed here, and Vite's static build is the whole product. HMR is instant. <code>npm run generate</code> dumps JSON. <code>npm run build</code> writes dist/. That is the pipeline. I just want to keep this easy and free for now (other than the GoDaddy domain fee but its like $5, sue me)</p>

<p>Tech Stack Overview</p>
<ul>
  <li><strong>Vite</strong> is the bundler and the local server.</li>

  <li><strong>TypeScript</strong> mostly for the experience section, and cards.</li>

  <li><strong>Tailwind v4</strong> keep all the UI stuff uniform, though most of the stuff I have is self made so this is very lightly used.</li>

  <li><strong>GitHub Pages + CNAME</strong> Hosting service. Custom domain through GoDaddy.</li>
</ul>

<h2>The folder system</h2>

<p><strong>Projects.</strong> Drop a folder in <code>devProjects/your-slug/</code> or <code>designProjects/your-slug/</code> with a <code>project.md</code>. Frontmatter is title, dates, GitHub, cover image, featured flag (everything is in a text file within the repo in case i forget). The rest of the file is HTML for the write-up. <code>npm run generate</code> walks those folders with gray-matter and writes <code>generated/projects.json</code>. The app imports that JSON.</p>

<p><strong>Blogs.</strong> Same idea under <code>blog/your-slug/post.md</code>. Optional cover image in the folder. Optional Google Doc fragment. Build writes <code>generated/blog.json</code>.</p>

<p><strong>Experience.</strong> <code>data/experience.json</code> plus a small merge script, because jobs are structured (tags, galleries, subroles).</p>

<p><strong>Social carousels.</strong> LinkedIn and YouTube still have helper scripts so I am not hand-editing dates in JSX. Still a import func though</p>

<p>I like the look of things now and the systems in place make it pretty easily scaleable, if you like anything feel free to use the code too. Thank you for reading and I will probably write another blog soon!</p>
