# jacobiglenn.com

Portfolio for Jacobi Glenn. A short boot splash plays, then you land on the main site (Home, Designer / Developer portfolios, Work Experience, Blog). The old command terminal is gone.

**Stack:** Vite + React, still static, still free on GitHub Pages. No extra hosting cost. Visitors get a `dist/` folder of HTML/JS/CSS, same as before — the build is just how the site is assembled.

Local: `npm install` then `npm run dev`. Production: push to `main` (GitHub Actions builds and deploys).

---

## How to add content (short)

Deeper notes live in the `*logic.txt` files. This is the cheat sheet.

### Projects

One folder per project under `devProjects/` or `designProjects/`. Add `project.md` (YAML on top, HTML write-up below) plus images (`COVER` / `CARD`). Run `npm run build:projects`. Commit the folder **and** `generated/projects.json`.

Set `draft: true` to keep a folder in git without publishing (CollIDE uses this).

Full walkthrough: [folderlogic.txt](folderlogic.txt)

### Blog articles

`blog/<slug>/post.md` then `npm run build:blog`. Commit the folder **and** `generated/blog.json`.

Full walkthrough: [bloglogic.txt](bloglogic.txt)

### LinkedIn posts and YouTube

No folder build. Edit `data/linkedin-posts.js` / `data/youtube-videos.js`, or:

- `npm run add:linkedin -- https://www.linkedin.com/feed/update/urn:li:activity:ID/`
- `npm run add:youtube -- https://youtu.be/VIDEO_ID`
- `npm run explode:linkedin` and `npm run explode:youtube` drop the newest entry if you added one twice

Images go in `assets/linkedin/`. YouTube thumbnails load from YouTube. Details: [bloglogic.txt](bloglogic.txt)

### Work experience

Source of truth: [data/experience.json](data/experience.json) (jobs, education, honors, photo galleries). Run `npm run build:experience`.

Optional: drop a LinkedIn data-export `Positions.csv` into `data/linkedin/` and rebuild. The CSV updates titles/dates; photos, skill chips, and galleries stay in the JSON overlay so they are not wiped.

Full walkthrough: [experiencelogic.txt](experiencelogic.txt)

### One command

`npm run build` regenerates projects, blog, and experience, then bundles the site.

---

## Docs

- [docs/STYLE.md](docs/STYLE.md) — type, color, motion, components

Readable mode (white / black / Arial) is the **Readable** control in the HUD.
