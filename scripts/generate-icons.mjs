import { chromium } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../apps/web/public");
const svg = readFileSync(path.join(publicDir, "favicon.svg"), "utf8");

const browser = await chromium.launch();

async function renderSquarePng(size, outFile) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(
    `<html><body style="margin:0">${svg.replace('width="24" height="24"', `width="${size}" height="${size}"`)}</body></html>`,
  );
  await page.screenshot({ path: path.join(publicDir, outFile) });
  await page.close();
}

await renderSquarePng(32, "favicon-32.png");
await renderSquarePng(180, "apple-touch-icon.png");
await renderSquarePng(512, "icon-512.png");

const ogPage = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await ogPage.goto(`file://${path.join(__dirname, "og-image-template.html")}`);
await ogPage.screenshot({ path: path.join(publicDir, "og-image.png") });
await ogPage.close();

await browser.close();
console.log("Icons generated in apps/web/public/");
