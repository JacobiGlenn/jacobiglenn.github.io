/**
 * YouTube Videos Data
 * -------------------
 * Manages the YouTube section on the Blog page.
 * Thumbnails load automatically from YouTube — no API key needed.
 * For view/like counts, add your YouTube Data API key below (optional).
 *
 * HOW TO GET A FREE API KEY (optional, for stats):
 *   1. Go to console.cloud.google.com
 *   2. Create a project → Enable "YouTube Data API v3"
 *   3. Create credentials → API Key
 *   4. Restrict it to your site URL (Jacobi.github.io)
 *   5. Paste it into window.YOUTUBE_API_KEY below
 *
 * To add a video:  copy an object, add it to the TOP of the array (newest first)
 * To delete:       remove its object from the array
 *
 * Fields:
 *   id          – unique string, no spaces
 *   videoId     – the YouTube video ID (the part after "v=" or "youtu.be/")
 *   date        – display string, e.g. "Mar 2026"
 *   title       – card + modal title
 *   description – shown in the modal below the embed
 */

// Optional: paste your YouTube Data API key here to enable view/like counts
// Leave as empty string '' if you don't want stats
// API key is injected from data/api-config.js (gitignored).
// See .github/workflows/deploy.yml — key is stored as a GitHub secret.
// For local dev: create data/api-config.js manually (it's gitignored).
window.YOUTUBE_API_KEY = window.YOUTUBE_API_KEY || '';

window.__YOUTUBE_VIDEOS = [
  {
    id: 'yt-pocketzot-demo',
    videoId: 'puTp9szMQqE',
    date: 'Mar 2026',
    title: 'PocketZot — IrvineHacks 2026 Demo',
    description: 'Live demo of PocketZot, our Best Neuro Hack winner at IrvineHacks 2026. PocketZot is a Chrome Extension with a Shimeji-style UCI anteater mascot that walks around AI chat sites, reacts to your prompts, and rewards good prompting habits. Built in 36 hours with React, FastAPI, and a fine-tuned GPT-4o-mini model.'
  },
  {
    id: 'yt-filler-2',
    videoId: 'dQw4w9WgXcQ',
    date: 'Feb 2026',
    title: 'Filler Video 2 — Replace This',
    description: 'This is a filler entry. Replace videoId, title, date, and description with your real video info.'
  },
  {
    id: 'yt-filler-3',
    videoId: 'dQw4w9WgXcQ',
    date: 'Jan 2026',
    title: 'Filler Video 3 — Replace This',
    description: 'This is a filler entry. Replace videoId, title, date, and description with your real video info.'
  },
  {
    id: 'yt-filler-4',
    videoId: 'dQw4w9WgXcQ',
    date: 'Dec 2025',
    title: 'Filler Video 4 — Replace This',
    description: 'This is a filler entry. Replace videoId, title, date, and description with your real video info.'
  },
  {
    id: 'yt-filler-5',
    videoId: 'dQw4w9WgXcQ',
    date: 'Nov 2025',
    title: 'Filler Video 5 — Replace This',
    description: 'This is a filler entry. Replace videoId, title, date, and description with your real video info.'
  }
];
