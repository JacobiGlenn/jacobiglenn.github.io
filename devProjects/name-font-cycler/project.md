---
title: Python Name Font Cycler
description: "Python script that cycles your name through 30+ fonts with a scramble effect and exports a transparent GIF for GitHub READMEs."
github: https://github.com/JacobiGlenn/Name_FontCycler
kind: dev
cover: CARD.png
header: COVER.svg
date: "02/2026"
featured: true
---

<p class="project-detail-lead"><strong>Font Cycle Animation Maker for GitHub READMEs.</strong> Create eye-catching animated headers for your GitHub profile that cycle through dozens of fonts with a cool scramble effect in between.</p>

<h2 class="project-detail-h2">Tech stack</h2>
<div class="tech-stack">
  <a href="https://www.python.org" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--py">Python</a>
  <a href="https://python-pillow.org" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--ai">Pillow</a>
  <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--figma">Google Fonts</a>
  <a href="https://pages.github.com" target="_blank" rel="noopener noreferrer" class="tech-badge tech-badge--ghpages">GitHub</a>
</div>

<figure class="project-detail-fig" style="max-width:560px;background:#111;">
<img src="https://raw.githubusercontent.com/JacobiGlenn/Name_FontCycler/main/NameFontCycle.gif" width="550" alt="Animated header: name cycling through fonts" loading="lazy" decoding="async" style="display:block;margin:0 auto;max-width:100%;height:auto;">
<figcaption><code>NameFontCycle.gif</code> from the repository</figcaption>
</figure>

<h2 class="project-detail-h2">Features</h2>
<ul>
<li><strong>30+ Fonts</strong> – Cycles through a diverse mix of fonts (classic, techno, script, funny ones, and more!)</li>
<li><strong>Scramble Transition</strong> – 0.3 second glitch-style animation between each font</li>
<li><strong>Perfect for GitHub</strong> – Outputs a clean, transparent GIF that works anywhere</li>
<li><strong>Fully Customizable</strong> – Easy to modify fonts, colors, timing, and text</li>
</ul>

<h2 class="project-detail-h2">How to make your own</h2>

<h3 class="project-detail-h2" style="font-size:1.1rem;">Prerequisites</h3>
<ul>
<li>Python installed on your computer</li>
<li>Pillow library (<code>pip install pillow</code>)</li>
</ul>

<h3 class="project-detail-h2" style="font-size:1.1rem;">Instructions</h3>
<p><strong>1. Clone this repository</strong></p>
<div class="project-detail-code-wrap"><div class="project-detail-code-label">bash</div><pre class="project-detail-pre">git clone https://github.com/JacobiGlenn/Name_FontCycler.git
cd Name_FontCycler</pre></div>

<p><strong>2. Customize the text</strong></p>
<p>Open <code>font_cycle.py</code> and find line 7:</p>
<div class="project-detail-code-wrap"><div class="project-detail-code-label">font_cycle.py</div><pre class="project-detail-pre">text = "Jacobi Glenn"          # put your name here</pre></div>

<p><strong>3. (Optional) Add your own fonts</strong></p>
<p>Add more fonts to the <code>font_paths</code> list. You can use:</p>
<ul>
<li>Downloaded <code>.ttf</code> files in the <code>fonts</code> folder</li>
<li>Windows system fonts (e.g. <code>C:/Windows/Fonts/arial.ttf</code>)</li>
<li>Mac system fonts (e.g. <code>/System/Library/Fonts/Helvetica.ttc</code>)</li>
</ul>

<p><strong>4. Open PowerShell / Terminal</strong> and go to the project folder.</p>

<p><strong>5. Run the script</strong></p>
<div class="project-detail-code-wrap"><div class="project-detail-code-label">powershell</div><pre class="project-detail-pre">python font_cycle.py</pre></div>

<p><strong>6. Find your GIF</strong></p>
<p>The script generates <code>NameFontCycle.gif</code> in the main folder (that exact name). Add it to your GitHub profile repo and embed it in your README.</p>

<p><strong>7. Embed in your README</strong></p>
<div class="project-detail-code-wrap"><div class="project-detail-code-label">HTML</div><pre class="project-detail-pre">&lt;h1 align="center"&gt;
  &lt;img src="Assets/NameFontCycle.gif" alt="Jacob Glenn" width="550"&gt;
&lt;/h1&gt;</pre></div>

<h2 class="project-detail-h2">Customization options</h2>
<p>In the script you can tweak:</p>
<div class="project-detail-code-wrap"><div class="project-detail-code-label">font_cycle.py</div><pre class="project-detail-pre">text = "your name here"        # Your text
font_size = 70                 # Size of text
frame_duration = 1500          # Milliseconds per font (1.5 sec)
scramble_duration = 0.3        # Seconds of scramble between fonts
text_color = (255, 255, 255)   # White text
bg_color = (0, 0, 0, 0)        # Transparent background</pre></div>

<h2 class="project-detail-h2">Font list</h2>
<p>The script includes 33 fonts across 6 categories (add or remove as you like):</p>
<div style="overflow-x:auto;margin:1rem 0;">
<table style="width:100%;border-collapse:collapse;font-size:0.85rem;border:1px solid #ddd;">
<thead><tr style="background:#f5f5f5;"><th style="border:1px solid #ddd;padding:0.5rem;text-align:left;">Category</th><th style="border:1px solid #ddd;padding:0.5rem;text-align:left;">Fonts</th></tr></thead>
<tbody>
<tr><td style="border:1px solid #ddd;padding:0.45rem;vertical-align:top;"><strong>Classic/Professional</strong></td><td style="border:1px solid #ddd;padding:0.45rem;">Arial, Calibri, Verdana, Tahoma, Trebuchet MS, Times New Roman, Georgia, Carlito, Outfit, Basic</td></tr>
<tr><td style="border:1px solid #ddd;padding:0.45rem;vertical-align:top;"><strong>Classy</strong></td><td style="border:1px solid #ddd;padding:0.45rem;">STIXTwoText, CrimsonText, Georgia, Times New Roman</td></tr>
<tr><td style="border:1px solid #ddd;padding:0.45rem;vertical-align:top;"><strong>Typewriter</strong></td><td style="border:1px solid #ddd;padding:0.45rem;">Courier New, Consolas, ShareTechMono</td></tr>
<tr><td style="border:1px solid #ddd;padding:0.45rem;vertical-align:top;"><strong>Techno/Futuristic</strong></td><td style="border:1px solid #ddd;padding:0.45rem;">Audiowide, Quantico, Rajdhani</td></tr>
<tr><td style="border:1px solid #ddd;padding:0.45rem;vertical-align:top;"><strong>Fun</strong></td><td style="border:1px solid #ddd;padding:0.45rem;">Comic Sans, Bangers, PressStart2P, Unifont, Cooper Black, Algerian, Broadway</td></tr>
<tr><td style="border:1px solid #ddd;padding:0.45rem;vertical-align:top;"><strong>Script/Display</strong></td><td style="border:1px solid #ddd;padding:0.45rem;">Lobster, Pacifico, BebasNeue, Righteous, KronaOne, Limelight</td></tr>
</tbody>
</table>
</div>

<h2 class="project-detail-h2">Embed in your README (reminder)</h2>
<p>Once your GIF is in your profile repository, add something like:</p>
<div class="project-detail-code-wrap"><div class="project-detail-code-label">HTML</div><pre class="project-detail-pre">&lt;h1 align="center"&gt;
  &lt;img src="your-gif-name.gif" alt="Your Name" width="800"&gt;
&lt;/h1&gt;</pre></div>
<p>Put the GIF <strong>inside</strong> the README so it displays on your profile.</p>

<h2 class="project-detail-h2">Credits</h2>
<p><strong>Fonts:</strong> <a href="https://fonts.google.com" target="_blank" rel="noopener noreferrer" class="clean-link">Google Fonts</a>, <a href="https://learn.microsoft.com/en-us/typography/fonts/windows_11_font_list" target="_blank" rel="noopener noreferrer" class="clean-link">Microsoft</a> (Windows fonts), <a href="https://www.stixfonts.org/" target="_blank" rel="noopener noreferrer" class="clean-link">STIX Project</a>, and other open-source creators.</p>
<p><strong>Animation:</strong> Scramble effect via custom Python with <a href="https://python-pillow.org" target="_blank" rel="noopener noreferrer" class="clean-link">Pillow</a>. Inspiration from the <a href="https://readme-typing-svg.demolab.com" target="_blank" rel="noopener noreferrer" class="clean-link">typing-svg</a> generator.</p>

<h2 class="project-detail-h2">Reflection</h2>
<p>In my first year at UCI, I learned the basics of Python through ICS 31. Most of that work lived in the terminal, and I built small logic-heavy programs for class, including menu-based exercises and even an In-N-Out style drive-through app. This project was the first time I used Python to build something for myself outside the classroom.</p>
<p>While working on my GitHub README, I wanted a title animation that cycled my name through a bunch of fonts I actually liked. I could not find a tool online that did exactly what I had in mind, so I decided to make it myself. The project quickly became more ambitious than I expected. One of the biggest hurdles was getting fonts loaded and rendered reliably, and I spent a lot of time debugging paths, testing libraries, and figuring out how the animation should transition cleanly from one style to the next.</p>
<p>After a lot of trial and error, iteration, and long back-and-forth problem solving, I ended up with something I am genuinely proud of: a customizable Python tool that creates a polished, reusable GIF for GitHub profiles. Just as important, I documented the process carefully so other programmers could make their own versions without having to rediscover every step from scratch.</p>
<p>This project taught me Python in a much more practical way than class assignments alone. It pushed me to think about user experience, customization, file handling, and how to turn a personal idea into a real tool someone else could follow and use. It also showed me that my old brute-force approach to programming does not scale well. Now I take more time up front to define the goal, map out the moving parts, and think through the build before I start coding. That shift has made my work faster, cleaner, and much easier to ship.</p>
<p>This was a fun project, but more importantly it changed how I build. I learned how to design a feature, troubleshoot technical roadblocks, and turn a small creative idea into a finished product with a clear purpose.</p>

<p><strong>Repository:</strong> <a href="https://github.com/JacobiGlenn/Name_FontCycler" target="_blank" rel="noopener noreferrer" class="clean-link">github.com/JacobiGlenn/Name_FontCycler</a> — open source; fork and use for your own profile.</p>
