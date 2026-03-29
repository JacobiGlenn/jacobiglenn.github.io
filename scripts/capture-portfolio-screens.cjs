/**
 * Run with: npx serve   (in repo root)
 * Then:    node scripts/capture-portfolio-screens.cjs
 * First time: npx playwright install chromium
 */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const assets = path.join(root, 'assets');
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3000';

async function main() {
  if (!fs.existsSync(assets)) fs.mkdirSync(assets, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
  });

  {
    const page = await context.newPage();
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      try {
        localStorage.clear();
      } catch (_) {}
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(assets, 'dev-site-terminal.png'), type: 'png' });
    await page.close();
  }

  {
    const page = await context.newPage();
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.setItem('jacobiglenn_normal_visit', String(Date.now()));
      localStorage.setItem('jacobiglenn_last_user', 'portfolio-demo');
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(assets, 'dev-site-home.png'), type: 'png' });

    await page.locator('.nav-dropdown').hover();
    await page.waitForTimeout(250);
    await page.locator('a[data-page="page2"]').click();
    await page.waitForTimeout(400);
    await page.screenshot({ path: path.join(assets, 'dev-site-developer.png'), type: 'png' });

    await page.locator('.project-card[data-project="dev-example"]').click();
    await page.waitForTimeout(500);
    await page.locator('.content.show-project-detail').waitFor({ state: 'visible', timeout: 5000 });
    await page.screenshot({ path: path.join(assets, 'dev-site-project-detail.png'), type: 'png', fullPage: true });

    await page.locator('#project-detail-view .detail-back-btn').click();
    await page.waitForTimeout(350);
    await page.locator('a[data-page="page3"]').click();
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(assets, 'dev-site-experience.png'), type: 'png', fullPage: true });

    await page.locator('a[data-page="page4"]').click();
    await page.waitForTimeout(450);
    await page.screenshot({ path: path.join(assets, 'dev-site-blog.png'), type: 'png', fullPage: true });

    await page.locator('a[data-page="about"]').click();
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(assets, 'dev-site-about.png'), type: 'png', fullPage: true });

    await page.close();
  }

  await browser.close();
  console.log('Wrote PNGs to assets/');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
