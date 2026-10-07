/**
 * Run the Vite app, then: node scripts/capture-portfolio-screens.cjs
 * PORTFOLIO_URL defaults to http://127.0.0.1:5173
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const assets = path.join(root, 'assets');
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5173';

async function afterBoot(page) {
  await page.locator('.boot-hold').waitFor({ state: 'detached', timeout: 8000 }).catch(() => {});
}

async function shot(page, route, file, fullPage = false) {
  await page.goto(`${base}${route}`, { waitUntil: 'domcontentloaded' });
  await afterBoot(page);
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(assets, file), type: 'png', fullPage });
}

async function main() {
  if (!fs.existsSync(assets)) fs.mkdirSync(assets, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });

  await shot(page, '/', 'dev-site-home.png');
  await shot(page, '/portfolio/dev', 'dev-site-developer.png');
  await shot(page, '/portfolio/dev/dev-example', 'dev-site-project-detail.png', true);
  await shot(page, '/experience', 'dev-site-experience.png', true);
  await shot(page, '/blog', 'dev-site-blog.png', true);

  await browser.close();
  console.log('Wrote PNGs to assets/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
