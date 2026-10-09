---
title: F25
description: "Fashion 2025. A Pinterest-style app for rating outfits, shopping brands, and posting what you wore. Senior capstone, and my first time in Figma."
kind: design
cover: mark.jpg
header: pattern.jpg
card_fit: contain
cover_bg: "#000"
date: "02/2025"
wip: true
---

<p class="project-detail-lead"><strong>F25</strong> is Fashion 2025. A Pinterest-style app for rating outfits, shopping brands, and posting what you wore. It was my senior design project, and my first time working in Figma.</p>

<h2 class="project-detail-h2">The idea</h2>
<p>I stole the basic idea from a TikTok about an outfit rating app that gives you an outfit of the week. The game under that was Dress to Impress on Roblox, which had just blown up, and fashion social media was right there with it. So a search page, Pinterest style. You look up people, they post outfits, you rate them 1 to 5. You get a personal favorite of the week, and a friends one, which is just you and your friends averaged out. Then a shop, closer to Depop, where people buy and sell. Open a product and you can see it on actual people, plus similar stuff.</p>
<p>I love looking at clothes and getting inspiration. I hate TikTok and Instagram. I don't like the toxicity, and I don't like how fashion on there turned into "look what I can sell at the thrift" instead of "look at this cool thing I found and how I style it." I wanted the ads minimal, a brand post you click, and the money to come from the shop. If a lot of people ever downloaded it, I wanted at least half the proceeds to go to clothing drives. I've benefited from those. Low stakes. Everybody wears clothes. I was hoping it would push upcycling, and that a style tag on your profile would do some of the community work. You like grunge, it says grunge, and someone else who likes grunge has a reason to follow. A nudge to post, kind of like BeReal, so the weekly favorite is from something you actually wore. Pictures first. A 10 second video if I got there. iOS and Android.</p>
<p>I knew pretty much nothing about apps. I'm a designer at heart, and coding was the side thing I wanted to turn into the job. I can code games. I had not made an app, and I had not tried. I wanted to learn Swift, build a UI from scratch, and figure out how an app stores photos and gets them uploaded. The algorithm was a later problem. I didn't know where to start, so I drew it.</p>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/paper-nav.jpg" alt="Paper sketch of the F25 feed and a bottom bar with home, a hanger, plus, a dollar sign, and a face" loading="lazy" decoding="async">
</figure>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/board-wireframe.jpg" alt="Whiteboard wireframe of the F25 screens" loading="lazy" decoding="async">
</figure>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/board-screens.jpg" alt="Whiteboard sketches of outfit screens" loading="lazy" decoding="async">
</figure>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/board-pins.jpg" alt="Whiteboard layouts labeled pin, instr, TikTok, and trans fits" loading="lazy" decoding="async">
</figure>
<p>I talked to people about how to keep it inclusive. Trans fits is on the board, next to the Pinterest, Instagram, and TikTok layouts I was ripping off. The shop started as a dollar sign on paper. It turned into a tag.</p>

<h2 class="project-detail-h2">Home</h2>
<p>First day I made a Figma account and left with a plan: shop, explore, account, settings. Next time I got the outline done and made the buttons go to real screens, so I could see the app. I made icons for the home bar and I was really happy with them. Dark mode, because every social app I use is dark. Green, because not a lot of apps use it, and I wanted that to be what made it feel like itself. Molly helped me with a logo. I really like it. She was going to finish the digital copy the next week. Outsourcing.</p>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/nav-study.jpg" alt="Green F25 tab bar, home, hanger, plus, tag, and profile, set next to other app bars" loading="lazy" decoding="async">
</figure>
<p>F25 in the corner was the placeholder name, drawn a little like Instagram so I could change the feed from there later. I had also seen a color picker I wanted to try. The posts are set like Pinterest so each one has room to breathe, and the color of one doesn't run over the next. Search was a beta. I didn't love it. It worked for now.</p>
<p>The big post with the white box is the ad. This one was the new Balenciaga store in New York, laid out like the post they actually ran, and it links you out. The link sits where you can see it, so you know it isn't a normal post. From the company's side that isn't great, because then you can't trick the user. I think it's a feature I wish more apps had. Hit the link, go to the site. Hit the photo, just look at the photo. Pinterest drops an ad every three posts and every tap leaves. I didn't want that. Further down I put an H&M one the same way. There's a mix of post sizes I'm still not sure how to balance, or how to make anything automatic understand that balance. If Pinterest can do it I figured I could figure it out.</p>
<figure class="project-detail-fig project-detail-shot">
  <img src="/designProjects/f25/home-feed.jpg" alt="F25 home feed in Figma, green bar, Pinterest-style posts, and a Balenciaga ad with the link showing" loading="lazy" decoding="async">
</figure>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/phone.jpg" alt="The F25 home feed on my monitor, Balenciaga ad up top and the green tab bar" loading="lazy" decoding="async">
</figure>
<figure class="project-detail-fig project-detail-tall">
  <img src="/designProjects/f25/scroll.jpg" alt="Long F25 home frame with the tab bar mid-feed, a Balenciaga ad, and an H&M ad further down" loading="lazy" decoding="async">
</figure>

<h2 class="project-detail-h2">Wardrobe</h2>
<p>The hanger. This screen has a lot of moving parts, and I knew it would be hard to understand the first time.</p>
<figure class="project-detail-fig project-detail-shot">
  <img src="/designProjects/f25/wardrobe-empty.jpg" alt="Empty F25 wardrobe screen, a black canvas under a green header and a round green toolbar" loading="lazy" decoding="async">
</figure>
<p>It opens looking like a black screen, because nothing is on it yet. It's supposed to be a collage where you place pictures of clothes. I should have put a slightly smaller grey box there so you could tell what the canvas was. I only realized that while I was writing it down. The bottom bar goes round on this screen, to change the tone from home. The middle button adds photos, from your camera roll or from clothes you already picked. That's two jobs on one button. If I split every action out, the same problem just moves. I was hoping it would open an archive of everything you've uploaded, Apple Photos style: Saved, liked, uploads, and brands, with an add-clothing button next to the menu. Confusing. It was going to be tough to pull off. I had a vision.</p>
<figure class="project-detail-fig project-detail-shot">
  <img src="/designProjects/f25/wardrobe.jpg" alt="Wardrobe collage with a cap, rings, a necklace, a tee, a hoodie, sneakers, and cargo pants" loading="lazy" decoding="async">
</figure>
<p>Once the pieces are on there you can save the outfit to your wardrobe, as inspiration or as something you're planning to wear, or save it to your camera roll to share. Far left is the gallery of those collages. Far right saves. I'm still unsure if camera roll should live in the gallery or in this save menu.</p>
<figure class="project-detail-fig project-detail-wide">
  <img src="/designProjects/f25/save-outfit.jpg" alt="Save outfit to wardrobe dialog, Yes or No, then a Saved Successfully screen" loading="lazy" decoding="async">
</figure>

<h2 class="project-detail-h2">Posting</h2>
<p>Next class I got the feed to scroll and worked on the post button. Friends only, public, or video, and you can pull photos in from recents. I learned how to make the buttons work and not suck at their jobs. Figma has this thing where you press and hold the little plus and drag it onto the screen you want to open. Pretty hype.</p>
<figure class="project-detail-fig project-detail-wide">
  <img src="/designProjects/f25/publish.jpg" alt="F25 publish screens, friends only, public, or video, and a recents photo picker" loading="lazy" decoding="async">
</figure>
<figure class="project-detail-fig project-detail-shot">
  <img src="/designProjects/f25/gallery.jpg" alt="F25 gallery of saved outfit collages on a black screen with a round green toolbar" loading="lazy" decoding="async">
</figure>
<p>I mean it looks fine. Decent concept.</p>

<h2 class="project-detail-h2">Shop</h2>
<p>Shop was the other half, and the part I kept leaving for next class. Depop style. You buy and sell, and when you open a product you can see people wearing it. That's where I wanted the money to come from, brand posts and people actually purchasing, so the feed could stay quiet. The plan on a post was 1 to 5 stars. The screen I drew uses reactions, a save, and a link out to the site and the piece.</p>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/what-is.jpg" alt="What is F25: home feed, wardrobe collage, and a shop of clothes with prices" loading="lazy" decoding="async">
</figure>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/reactions.jpg" alt="Outfit post with reaction icons, counts, and links out to a website and the clothing" loading="lazy" decoding="async">
</figure>

<h2 class="project-detail-h2">The logo</h2>
<p>F25 was the codename, Fashion 2025. Molly's logo is super cool, the script f over the green 25, and I kept asking if it was weird to keep the name once the mark existed. I kept it.</p>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/mark.jpg" alt="F25 mark, a white script f over a green graffiti 25" loading="lazy" decoding="async">
</figure>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/mark-f.jpg" alt="Calligraphic lowercase f" loading="lazy" decoding="async">
</figure>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/pattern.jpg" alt="Green field tiled with the F25 name" loading="lazy" decoding="async">
</figure>

<h2 class="project-detail-h2">Proof of concept</h2>
<p>I learned a lot of Figma very fast, and I had more ideas than screens. Then I dropped the same home feed on an Android phone, an Android tablet, and an iPhone 16. Coding something like this would suck, and I had no idea how to make one UI work on all of them. If I was already struggling in Figma, that was the sign to slow down.</p>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/devices.jpg" alt="The same F25 home screen on an Android phone, an Android tablet, and an iPhone 16" loading="lazy" decoding="async">
</figure>
<p>So I simplified. A proof of concept and a write-up before any code. Every feature, every screen. A full Figma prototype I could present, and only then would I think about touching Swift. I also didn't know if I should pitch it before I could build it. I didn't have a way to program a real app outside of school. I had high hopes for it anyway. One language for iOS and Android was the other question I kept coming back to. Shop was still the goal for next time.</p>
<figure class="project-detail-fig">
  <img src="/designProjects/f25/flow.jpg" alt="Figma flow connecting wardrobe, gallery, home, search, publish, profile, and shop" loading="lazy" decoding="async">
</figure>
