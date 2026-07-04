import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = path.join(process.cwd(), "out");
const port = Number(process.env.PAGES_VERIFY_PORT ?? 4173);
const basePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";
const chromePath =
  process.env.PUPPETEER_EXECUTABLE_PATH ??
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".txt", "text/plain; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".svg", "image/svg+xml"],
  [".webp", "image/webp"],
  [".avif", "image/avif"],
  [".ico", "image/x-icon"],
  [".xml", "application/xml; charset=utf-8"],
]);

const routes = [
  "/",
  "/products/",
  "/products/tabletop/",
  "/about/",
  "/blogs/",
  "/contact/",
  "/privacy/",
  "/terms/",
];

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://localhost:${port}`);
  let pathname = decodeURIComponent(requestUrl.pathname);

  if (basePath && pathname.startsWith(`${basePath}/`)) {
    pathname = pathname.slice(basePath.length);
  }

  if (basePath && pathname === basePath) {
    pathname = "/";
  }

  let filePath = path.join(root, pathname);

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  if (requestUrl.pathname.endsWith("/") || isDirectory(filePath)) {
    filePath = path.join(filePath, "index.html");
  }

  if (!existsSync(filePath)) {
    filePath = path.join(root, "404.html");
  }

  try {
    const body = await readFile(filePath);
    response.writeHead(200, {
      "content-type":
        mimeTypes.get(path.extname(filePath)) ?? "application/octet-stream",
    });
    response.end(body);
  } catch {
    response.writeHead(500);
    response.end("Error");
  }
});

await new Promise((resolve) => server.listen(port, resolve));

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

function pageUrl(route) {
  return `http://localhost:${port}${basePath}${route}`;
}

try {
  const results = [];
  const viewports = [
    { name: "desktop", width: 1440, height: 1000 },
    {
      name: "mobile",
      width: 390,
      height: 844,
      isMobile: true,
      deviceScaleFactor: 2,
    },
  ];

  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      isMobile: viewport.isMobile ?? false,
      deviceScaleFactor: viewport.deviceScaleFactor ?? 1,
    });
    await page.goto(pageUrl("/"), {
      waitUntil: "networkidle0",
    });

    const diagnostics = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      const navLabels = Array.from(document.querySelectorAll("nav a")).map(
        (element) => element.textContent?.trim(),
      );
      const visibleImages = Array.from(document.querySelectorAll("main img"))
        .filter((image) => {
          const rect = image.getBoundingClientRect();
          return (
            rect.width > 1 &&
            rect.height > 1 &&
            rect.top < window.innerHeight &&
            rect.bottom > 0
          );
        })
        .map((image) => ({
          complete: image.complete,
          width: image.naturalWidth,
          height: image.naturalHeight,
        }));
      const bodyText = document.body.textContent ?? "";

      return {
        title: document.title,
        horizontalOverflow: Math.ceil(
          document.documentElement.scrollWidth - window.innerWidth,
        ),
        h1Text: h1?.textContent?.replace(/\s+/g, " ").trim(),
        navLabels,
        unloadedImages: visibleImages.filter(
          (image) => !image.complete || image.width < 50 || image.height < 50,
        ).length,
        hasPasswordInput: Boolean(
          document.querySelector("input[type='password']"),
        ),
        cartLinks: Array.from(document.querySelectorAll("a[href]")).filter(
          (anchor) => {
            const href = anchor.getAttribute("href") ?? "";
            return href === "/cart" || href === "/account";
          },
        ).length,
        forbiddenTextFound: [
          "godfreyyin",
          "+60 12",
          "Continue checkout",
          "Launch savings",
        ].filter((text) => bodyText.includes(text)),
      };
    });

    if (!diagnostics.title.includes("Freykraft")) {
      throw new Error(`${viewport.name}: missing Freykraft title`);
    }

    if (!diagnostics.h1Text?.includes("Objects made slowly")) {
      throw new Error(`${viewport.name}: homepage H1 did not render`);
    }

    if (diagnostics.horizontalOverflow > 1) {
      throw new Error(
        `${viewport.name}: horizontal overflow ${diagnostics.horizontalOverflow}px`,
      );
    }

    for (const label of ["Home", "About", "Products", "Blogs", "Contact"]) {
      if (!diagnostics.navLabels.includes(label)) {
        throw new Error(`${viewport.name}: missing ${label} nav item`);
      }
    }

    if (
      diagnostics.hasPasswordInput ||
      diagnostics.cartLinks > 0 ||
      diagnostics.forbiddenTextFound.length > 0
    ) {
      throw new Error(`${viewport.name}: blocked Phase 1 surface found`);
    }

    if (diagnostics.unloadedImages > 0) {
      throw new Error(`${viewport.name}: visible images did not load`);
    }

    results.push({ viewport: viewport.name, diagnostics });
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

  const assetPage = await browser.newPage();
  for (const asset of ["/robots.txt", "/sitemap.xml"]) {
    const response = await assetPage.goto(pageUrl(asset), {
      waitUntil: "networkidle0",
    });
    if (!response?.ok()) {
      throw new Error(`${asset}: failed to resolve`);
    }
    results.push({ asset, status: response.status() });
  }
  await assetPage.close();

  const cname = (await readFile(path.join(root, "CNAME"), "utf8")).trim();
  if (cname !== "freykraft.com") {
    throw new Error(`CNAME: expected freykraft.com, received ${cname}`);
  }
  results.push({ asset: "/CNAME", value: cname });

  const formPage = await browser.newPage();
  await formPage.setViewport({ width: 1280, height: 900 });
  await formPage.goto(pageUrl("/"), {
    waitUntil: "networkidle0",
  });
  await formPage.type("input[type='email']", `qa+${Date.now()}@freykraft.test`);
  await formPage.click("button[type='submit']");
  await formPage.waitForFunction(
    () =>
      document.body.textContent?.includes(
        "Opening your email client for early access.",
      ) ||
      document.body.textContent?.includes("You are on the early access list."),
    { timeout: 10000 },
  );
  await formPage.close();

  results.push({ staticLeadPath: "passed" });
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  server.close();
}

function isDirectory(filePath) {
  return existsSync(filePath) && statSync(filePath).isDirectory();
}
