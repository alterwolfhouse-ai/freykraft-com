import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer-core";

const url = process.env.PREVIEW_URL ?? "http://localhost:3000";
const chromePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const screenshotDir = path.join(process.cwd(), ".local", "verification");

const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 }
];

await mkdir(screenshotDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

try {
  const results = [];

  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.name === "mobile" ? 2 : 1,
      isMobile: viewport.name === "mobile"
    });
    await page.goto(url, { waitUntil: "networkidle0" });

    const diagnostics = await page.evaluate(() => {
      const heroImage = document.querySelector("img[alt^='Handcrafted']");
      const emailInput = document.querySelector("input[type='email']");
      const button = document.querySelector("button[type='submit']");
      const h1 = document.querySelector("h1");
      const body = document.documentElement;

      function rectFor(element) {
        if (!element) {
          return null;
        }

        const rect = element.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          right: rect.right,
          bottom: rect.bottom,
          width: rect.width,
          height: rect.height
        };
      }

      return {
        title: document.title,
        horizontalOverflow: Math.ceil(body.scrollWidth - window.innerWidth),
        heroImageLoaded:
          heroImage instanceof HTMLImageElement &&
          heroImage.complete &&
          heroImage.naturalWidth > 100,
        h1Text: h1?.textContent?.trim(),
        h1: rectFor(h1),
        formInput: rectFor(emailInput),
        submitButton: rectFor(button)
      };
    });

    if (!diagnostics.title.includes("Freykraft")) {
      throw new Error(`${viewport.name}: document title is missing Freykraft`);
    }

    if (!diagnostics.heroImageLoaded) {
      throw new Error(`${viewport.name}: hero image did not load`);
    }

    if (diagnostics.horizontalOverflow > 1) {
      throw new Error(
        `${viewport.name}: horizontal overflow ${diagnostics.horizontalOverflow}px`
      );
    }

    if (diagnostics.h1Text !== "Freykraft") {
      throw new Error(`${viewport.name}: H1 is not Freykraft`);
    }

    const screenshotPath = path.join(
      screenshotDir,
      `freykraft-${viewport.name}.png`
    );
    await page.screenshot({ path: screenshotPath, fullPage: true });

    results.push({
      viewport: viewport.name,
      screenshot: screenshotPath,
      diagnostics
    });

    await page.close();
  }

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(url, { waitUntil: "networkidle0" });
  const email = `qa+${Date.now()}@freykraft.test`;
  await page.type("input[type='email']", email);
  await page.click("button[type='submit']");
  await page.waitForFunction(
    () => document.body.textContent?.includes("You are on the early access list."),
    { timeout: 10000 }
  );
  await page.close();

  results.push({ formSubmission: "passed", email });
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
