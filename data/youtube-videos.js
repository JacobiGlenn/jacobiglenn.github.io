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
    id: 'yt-minecraft-python',
    videoId: 'puTp9szMQqE',
    date: 'Mar 2026',
    title: 'How I Coded Anime in Minecraft (With Python)',
    description: 'A deep dive into using Python to render anime-style visuals inside Minecraft. Built with creative use of the Pillow library and block-rendering tricks.'
  },
];
