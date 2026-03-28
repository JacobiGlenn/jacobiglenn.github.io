/**
 * LinkedIn Posts Data
 * -------------------
 * Add posts with:  npm run add:linkedin
 * Delete a post:   remove its object from the array below
 * Array is newest-first (leftmost card in the carousel).
 *
 * media types:
 *   { type: 'image', src: 'path/to/file.jpg', alt: 'description' }
 *   { type: 'video', src: 'https://www.youtube.com/embed/ID' }   ← YouTube
 *   { type: 'video', src: 'assets/linkedin/file.mp4' }           ← local mp4
 *
 * thumb: optional card background image (leave '' for video cards)
 */

window.__LINKEDIN_POSTS = [
  {
    id: 'li-irvinehacks-2026',
    date: 'Mar 2026',
    text: 'This weekend, my team and I took home "Best Neuro Hack" at IrvineHacks 2026, the largest collegiate hackathon in Orange County.<br><br>We built PocketZot, a digital pet built into a browser extension that analyzes how users interact with AI in real time. As you ask questions, PocketZot classifies your level of cognitive offloading and gives you a score. That score determines how much health you\'d lose and how many ants you earn, which you can use to buy accessories for your pet.<br><br>PocketZot helps students become more aware of how they\'re using AI — it highlights whether someone is prompting to understand the material or relying on AI to finish homework quickly. Our goal is to encourage healthier learning habits and more intentional prompting from students.<br><br>This project pushed me in a way no hackathon ever has and I learned so much this weekend! Huge thank you to the judges and the IrvineHacks coordinators for the thoughtful feedback and for creating such a supportive environment. And the biggest shoutouts to Evie Ngo, Candice Lu, and Anthony Suh for being the best team I\'ve been apart of — I\'m really proud of what we made!<br><br><a href="https://lnkd.in/gC_Mwc6d" class="clean-link" target="_blank">GitHub</a> &nbsp;·&nbsp; <a href="https://lnkd.in/gA6KJQTr" class="clean-link" target="_blank">Devpost</a> &nbsp;·&nbsp; <a href="https://lnkd.in/gFxknvd9" class="clean-link" target="_blank">Figma prototype</a> &nbsp;·&nbsp; <a href="https://lnkd.in/gZTWdtkS" class="clean-link" target="_blank">Video demo</a>',
    media: [{ type: 'image', src: 'assets/linkedin/irvinehacks.png', alt: 'PocketZot team at IrvineHacks 2026 with Best Neuro Hack award' }],
    thumb: 'assets/linkedin/irvinehacks.png'
  },
  {
    id: 'li-react-learning',
    date: 'Feb 2026',
    text: 'Yesterday I finally decided to stop putting off learning React and just build... something.<br><br>I started with the official React documentation (which says it teaches 80% of what React devs use daily — pretty sweet), then started experimenting. React is surprisingly welcoming. The starter template already gives you a full page to play with, so I began by poking around and ended up going down a rabbit hole trying to make a favicon. While in the CSS I noticed the default React webpage had a spinning logo in the center. A couple edits later and I had a list of emojis that spun — I also edited the CSS so they were a little bigger. I found an intuitive way to bind a button to an emoji randomization function and eventually ended up with what you see.<br><br>I was really happy and almost stopped there, but inspiration struck and I tried building a little pick-and-place interaction. Which, for a piece of history on me, was actually the first script I authentically wrote in C# when learning Unity game dev in high school. Re-making it in React was different in its own way, but I could feel the fifteen-year-old me laughing as I dug through the old Google doc where I pasted every line of code I ever wrote. It\'s a small project, but honestly a really fun one — and I\'m excited to keep using React in the future. I can already see all the possibilities!<br><br><a href="https://lnkd.in/gwF4T9ew" class="clean-link" target="_blank">GitHub Repo</a>',
    media: [{ type: 'video', src: 'assets/linkedin/react-demo.mp4' }],
    thumb: ''
  },
  {
    id: 'li-font-cycler',
    date: 'Feb 2026',
    text: 'I went down a pretty large rabbit hole today while trying to customize my GitHub profile. I ended up making a font randomizer in Python for the header and learning how to create a GitHub workflow so I could have an interactive guest book (yes you can and should sign it). I\'m pretty proud of how it turned out and I learned a lot more than I expected!<br><br><a href="https://lnkd.in/gjBe65rU" class="clean-link" target="_blank">Go check it out</a>',
    media: [{ type: 'video', src: 'assets/linkedin/font-cycler-demo.mp4' }],
    thumb: ''
  },
  {
    id: 'li-figma-workshop',
    date: 'Feb 2026',
    text: 'Last weekend I attended the "Design Your Valentine" workshop hosted by Figma@UCI. I learned how to strengthen my auto layout usage and utilize attributes more effectively — changing component images or color! I am becoming a better designer every day and I\'m really looking forward to more workshops like this to help boost my skills!<br><br>Thank you Figma@UCI for hosting such a great workshop! <a href="https://lnkd.in/g4yAQGaA" class="clean-link" target="_blank">Figma@UCI Instagram</a>',
    media: [{ type: 'image', src: 'assets/linkedin/figma-workshop.png', alt: 'Figma Valentines Workshop — photo strips and components demo' }],
    thumb: 'assets/linkedin/figma-workshop.png'
  },
  {
    id: 'li-webjam-2025',
    date: 'Nov 2025',
    text: 'Today my team and I won "Best Healthcare App" at the UCI ICSSC Webjam! I am extremely happy with how our app turned out — for my first Webjam and my first ReactJS experience, we actually did really well! I am so proud of our entire team and want to thank the UCI ICS Student Council for the wonderful experience. I will continue to work on this app over the school year and hopefully shoot for a late winter deployment!<br><br><a href="https://lnkd.in/g6cxhajq" class="clean-link" target="_blank">Devpost</a> &nbsp;·&nbsp; <a href="https://lnkd.in/gZr5uWBr" class="clean-link" target="_blank">GitHub</a> &nbsp;·&nbsp; <a href="https://lnkd.in/g6BnF6P8" class="clean-link" target="_blank">Try it out</a>',
    media: [{ type: 'image', src: 'assets/linkedin/webjam.png', alt: 'ICSSC Webjam 2025 results — Best Healthcare Project: Anteater Gym Service' }],
    thumb: 'assets/linkedin/webjam.png'
  }
];
