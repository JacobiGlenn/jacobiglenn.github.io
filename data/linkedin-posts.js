/**
 * LinkedIn Posts Data
 * -------------------
 * Manually maintained. Each object represents one post card in the carousel.
 *
 * Fields:
 *   id       – unique string identifier
 *   date     – display string, e.g. "Mar 2026"
 *   text     – full post text (supports basic HTML like <a> tags)
 *   media    – array of media items (images or videos), shown in the popup
 *              { type: 'image', src: 'assets/linkedin/filename.jpg', alt: '...' }
 *              { type: 'video', src: 'https://www.youtube.com/embed/VIDEO_ID' }
 *   thumb    – optional thumbnail URL for the card face (defaults to first media image)
 *
 * To add a post: copy an existing object, give it a new id, fill in fields.
 * To delete a post: remove its object from the array.
 * Order: newest first (top of array = leftmost card in carousel).
 */
window.__LINKEDIN_POSTS = [
  {
    id: 'li-font-cycler',
    date: 'Mar 2026',
    text: 'I went down a pretty large rabbit hole today while trying to customize my GitHub profile. I ended up making a font randomizer in Python for the header and learning how to create a GitHub workflow so I could have an interactive guest book (yes you can and should sign it). I\'m pretty proud of how it turned out and I learned a lot more than I expected! Go check it out: <a href="https://github.com/JacobiGlenn/Name_FontCycler" class="clean-link" target="_blank">github.com/JacobiGlenn/Name_FontCycler</a>',
    media: [
      { type: 'video', src: 'https://www.youtube.com/embed/JknUSpljYZo' }
    ],
    thumb: ''
  },
  {
    id: 'li-pocketzot-win',
    date: 'Mar 2026',
    text: 'Excited to share that PocketZot won Best Neuro Hack at IrvineHacks 2026! 36 hours, a fine-tuned AI model, a walking anteater mascot, and a lot of energy drinks. So grateful for the team — this one was special.',
    media: [
      { type: 'image', src: 'assets/linkedin/pocketzot-win.jpg', alt: 'PocketZot team at IrvineHacks 2026' }
    ],
    thumb: 'assets/linkedin/pocketzot-win.jpg'
  },
  {
    id: 'li-webjam-win',
    date: 'Nov 2025',
    text: 'Zotletics (formerly Anteater Gym Service) just won Best Healthcare App at ICSSC Webjam 2025! We built a fitness platform that generates workout plans tailored to the actual equipment at each UCI campus gym. Super proud of this one — it started as a simple idea and turned into something genuinely useful.',
    media: [
      { type: 'image', src: 'assets/linkedin/webjam-win.jpg', alt: 'Zotletics team at ICSSC Webjam 2025' }
    ],
    thumb: 'assets/linkedin/webjam-win.jpg'
  },
  {
    id: 'li-collide-announcement',
    date: 'Mar 2026',
    text: 'Been working on something I\'m really excited about — [CollIDE]. It\'s a collaborative code editor built for teams, with real-time presence, per-user AI assistants that share a global awareness of the codebase, and conflict-prevention tooling. The core idea: AI coding tools are built for individuals. CollIDE is built for teams. More details coming soon.',
    media: [],
    thumb: ''
  },
  {
    id: 'li-code-ninjas-robotics',
    date: 'Feb 2026',
    text: 'Started teaching robotics at Code Ninjas Irvine this month! Working with LEGO SPIKE Prime — watching students go from "what is a variable" to building a working line-following robot in the same session is genuinely one of the coolest things I\'ve experienced. Teaching solidifies what you know in a way nothing else does.',
    media: [
      { type: 'image', src: 'assets/linkedin/code-ninjas-robotics.jpg', alt: 'Code Ninjas Irvine robotics class' }
    ],
    thumb: 'assets/linkedin/code-ninjas-robotics.jpg'
  }
];
