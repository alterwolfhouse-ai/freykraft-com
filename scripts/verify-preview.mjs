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
  { name: "mobile", width: 390, height: 844 },
];

const routes = [
  "/",
  "/products",
  "/products/tabletop",
  "/about",
  "/contact",
  "/blogs",
];

await mkdir(screenshotDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

function pageUrl(route) {
  return new URL(route, url).toString();
}

try {
  const results = [];

  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      deviceScaleFactor: viewport.name === "mobile" ? 2 : 1,
      isMobile: viewport.name === "mobile",
    });

    await page.goto(pageUrl("/"), { waitUntil: "networkidle0" });

    const diagnostics = await page.evaluate(() => {
      const body = document.documentElement;
      const h1 = document.querySelector("h1");
      const header = document.querySelector("header");
      const navLabels = Array.from(document.querySelectorAll("nav a")).map(
        (element) => element.textContent?.trim(),
      );
      const heroImages = Array.from(document.querySelectorAll("main img")).map(
        (image) => {
          const rect = image.getBoundingClientRect();
          return {
            alt: image.getAttribute("alt"),
            complete: image.complete,
            width: image.naturalWidth,
            height: image.naturalHeight,
            visible:
              rect.width > 1 &&
              rect.height > 1 &&
              rect.top < window.innerHeight * 1.25 &&
              rect.bottom > -120,
          };
        },
      );
      const productCards = document.querySelectorAll(".fk-product-card").length;
      const imageFrames = document.querySelectorAll(".fk-image-frame").length;
      const bodyText = document.body.textContent ?? "";

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
          height: rect.height,
        };
      }

      return {
        title: document.title,
        horizontalOverflow: Math.ceil(body.scrollWidth - window.innerWidth),
        h1Text: h1?.textContent?.replace(/\s+/g, " ").trim(),
        header: rectFor(header),
        navLabels,
        heroImages,
        productCards,
        imageFrames,
        hasPasswordInput: Boolean(
          document.querySelector("input[type='password']"),
        ),
        forbiddenTextFound: [
          "/cart",
          "/account",
          "godfreyyin",
          "+60 12",
          "Continue checkout",
          "Launch savings",
        ].filter((text) => bodyText.includes(text)),
        cartLinks: Array.from(document.querySelectorAll("a[href]")).filter(
          (anchor) => {
            const href = anchor.getAttribute("href") ?? "";
            return href === "/cart" || href === "/account";
          },
        ).length,
        mainScrollSnapType: getComputedStyle(
          document.querySelector("main") ?? document.body,
        ).scrollSnapType,
      };
    });

    if (!diagnostics.title.includes("Freykraft")) {
      throw new Error(`${viewport.name}: document title is missing Freykraft`);
    }

    if (!diagnostics.h1Text?.includes("Objects made slowly")) {
      throw new Error(`${viewport.name}: homepage H1 did not render`);
    }

    if (diagnostics.horizontalOverflow > 1) {
      throw new Error(
        `${viewport.name}: horizontal overflow ${diagnostics.horizontalOverflow}px`,
      );
    }

    if (!diagnostics.header || diagnostics.header.height > 96) {
      throw new Error(`${viewport.name}: header did not render compactly`);
    }

    for (const label of ["Home", "About", "Products", "Blogs", "Contact"]) {
      if (!diagnostics.navLabels.includes(label)) {
        throw new Error(`${viewport.name}: missing ${label} nav item`);
      }
    }

    if (diagnostics.productCards < 8 || diagnostics.imageFrames < 10) {
      throw new Error(`${viewport.name}: gallery/product sections are missing`);
    }

    if (diagnostics.hasPasswordInput || diagnostics.cartLinks > 0) {
      throw new Error(`${viewport.name}: fake commerce/account surface found`);
    }

    if (diagnostics.forbiddenTextFound.length > 0) {
      throw new Error(
        `${viewport.name}: forbidden launch text found: ${diagnostics.forbiddenTextFound.join(
          ", ",
        )}`,
      );
    }

    const unloaded = diagnostics.heroImages.filter(
      (image) =>
        image.visible &&
        (!image.complete || image.width < 50 || image.height < 50),
    );
    if (unloaded.length) {
      throw new Error(`${viewport.name}: ${unloaded.length} images failed`);
    }

    if (diagnostics.mainScrollSnapType !== "none") {
      throw new Error(
        `${viewport.name}: old snap-scroll shell is still active`,
      );
    }

    const screenshotPath = path.join(
      screenshotDir,
      `freykraft-${viewport.name}-hero.png`,
    );
    await page.screenshot({ path: screenshotPath });

    const sectionScreenshots = [];
    for (const section of ["craft", "story", "featured", "launch"]) {
      await page.evaluate((sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({
          block: "start",
          inline: "nearest",
        });
      }, section);
      await new Promise((resolve) => setTimeout(resolve, 900));

      const sectionDiagnostics = await page.evaluate((sectionId) => {
        const visibleImages = Array.from(
          document.querySelectorAll(`#${sectionId} img`),
        ).filter((image) => {
          const rect = image.getBoundingClientRect();
          return (
            rect.width > 1 &&
            rect.height > 1 &&
            rect.top < window.innerHeight &&
            rect.bottom > 0
          );
        });

        return {
          section: sectionId,
          visibleImages: visibleImages.length,
          unloadedImages: visibleImages.filter(
            (image) =>
              !image.complete ||
              image.naturalWidth < 50 ||
              image.naturalHeight < 50,
          ).length,
          horizontalOverflow: Math.ceil(
            document.documentElement.scrollWidth - window.innerWidth,
          ),
        };
      }, section);

      if (sectionDiagnostics.unloadedImages > 0) {
        throw new Error(
          `${viewport.name}/${section}: visible images did not load`,
        );
      }

      if (sectionDiagnostics.horizontalOverflow > 1) {
        throw new Error(
          `${viewport.name}/${section}: horizontal overflow ${sectionDiagnostics.horizontalOverflow}px`,
        );
      }

      const sectionScreenshotPath = path.join(
        screenshotDir,
        `freykraft-${viewport.name}-${section}.png`,
      );
      await page.screenshot({ path: sectionScreenshotPath });
      sectionScreenshots.push({
        screenshot: sectionScreenshotPath,
        diagnostics: sectionDiagnostics,
      });
    }

    results.push({
      viewport: viewport.name,
      screenshot: screenshotPath,
      sectionScreenshots,
      diagnostics,
    });

    await page.close();
  }

  const routePage = await browser.newPage();
  await routePage.setViewport({ width: 1280, height: 900 });
  for (const route of routes) {
    await routePage.goto(pageUrl(route), { waitUntil: "networkidle0" });
    const routeDiagnostics = await routePage.evaluate(() => ({
      route: location.pathname,
      h1: document
        .querySelector("h1")
        ?.textContent?.replace(/\s+/g, " ")
        .trim(),
      cards: document.querySelectorAll(".fk-panel, .fk-product-card").length,
      imageFrames: document.querySelectorAll(".fk-image-frame").length,
      horizontalOverflow: Math.ceil(
        document.documentElement.scrollWidth - window.innerWidth,
      ),
    }));

    if (!routeDiagnostics.h1) {
      throw new Error(`${route}: missing H1`);
    }

    if (routeDiagnostics.horizontalOverflow > 1) {
      throw new Error(
        `${route}: horizontal overflow ${routeDiagnostics.horizontalOverflow}px`,
      );
    }

    results.push(routeDiagnostics);
  }
  await routePage.close();

  const formPage = await browser.newPage();
  await formPage.setViewport({ width: 1280, height: 900 });
  await formPage.goto(pageUrl("/"), { waitUntil: "networkidle0" });
  const email = `qa+${Date.now()}@freykraft.test`;
  await formPage.type("input[type='email']", email);
  await formPage.click("button[type='submit']");
  await formPage.waitForFunction(
    () =>
      document.body.textContent?.includes("You are on the early access list."),
    { timeout: 10000 },
  );
  await formPage.close();

  results.push({ formSubmission: "passed", email });
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
}
