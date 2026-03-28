---
title: "I went down a rabbit hole customizing my GitHub profile"
date: "03/2026"
excerpt: "What started as a quick README update turned into building a full Python font randomizer and learning GitHub Actions from scratch."
---
<p>I went down a pretty large rabbit hole today while trying to customize my GitHub profile. I ended up making a font randomizer in Python for the header and learning how to create a GitHub workflow so I could have an interactive guest book (yes you can and should sign it).</p>

<p>I'm pretty proud of how it turned out and I learned a lot more than I expected! The font cycler alone took way longer than anticipated — getting Pillow to handle 30+ fonts consistently across frame sizes was its own puzzle. Then debugging the scramble animation between each font was another few hours of iteration.</p>

<p>The guest book workflow was a completely different challenge. GitHub Actions feels like magic once it clicks — a YAML file that runs on issue events and commits back to your repo automatically. Wild that you can do that for free.</p>

<p>If you want to make your own, I documented everything in the repo. Go check it out: <a href="https://github.com/JacobiGlenn/Name_FontCycler" class="clean-link" target="_blank">github.com/JacobiGlenn/Name_FontCycler</a></p>
