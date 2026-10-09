/**
 * YouTube Videos Data
 * -------------------
 * Manages the YouTube section on the Blog page.
 * Thumbnails load automatically from YouTube — no API key needed.
 * For view/like counts, add your YouTube Data API key below (optional).
 *
 * To add a video:  npm run add:youtube -- <url>
 * To undo that:   npm run explode:youtube
 * To delete one:  remove its object from the array
 *
 * Fields:
 *   id          – unique string, no spaces
 *   videoId     – the YouTube video ID (the part after "v=" or "youtu.be/")
 *   date        – display string, e.g. "Mar 2026"
 *   title       – card + modal title
 *   description – shown in the modal below the embed
 */

export const YOUTUBE_VIDEOS = [
  {
    id: 'yt-minecraft-python',
    videoId: 'puTp9szMQqE',
    date: 'Mar 2026',
    title: 'How I Coded Anime in Minecraft (With Python)',
    description: 'A selenium script that lets you watch anime while playing the game and see subtitles on screen'
  },
];
