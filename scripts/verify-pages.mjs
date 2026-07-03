import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync, statSync } from "node:fs";
import path from "node:path";
import puppeteer from "puppeteer-core";

const root = path.join(process.cwd(), "out");
const port = Number(process.env.PAGES_VERIFY_PORT ?? 4173);
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
  [".ico", "image/x-icon"]
]);

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://localhost:${port}`);
  let filePath = path.join(root, decodeURIComponent(requestUrl.pathname));

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
      "content-type": mimeTypes.get(path.extname(filePath)) ?? "application/octet-stream"
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
  args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

try {
  const results = [];
  const viewports = [
    { name: "desktop", width: 1440, height: 1000 },
    { name: "mobile", width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 }
  ];

  for (const viewport of viewports) {
    const page = await browser.newPage();
    await page.setViewport({
      width: viewport.width,
      height: viewport.height,
      isMobile: viewport.isMobile ?? false,
      deviceScaleFactor: viewport.deviceScaleFactor ?? 1
    });
    await page.goto(`http://localhost:${port}`, { waitUntil: "networkidle0" });

    const diagnostics = await page.evaluate(() => {
      const heroImage = document.querySelector("img[alt^='Handcrafted']");
      const h1 = document.querySelector("h1");
      return {
        title: document.title,
        horizontalOverflow: Math.ceil(
          document.documentElement.scrollWidth - window.innerWidth
        ),
        heroImageLoaded:
          heroImage instanceof HTMLImageElement &&
          heroImage.complete &&
          heroImage.naturalWidth > 100,
        h1Text: h1?.textContent?.trim()
      };
    });

    if (!diagnostics.title.includes("Freykraft")) {
      throw new Error(`${viewport.name}: missing Freykraft title`);
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

    results.push({ viewport: viewport.name, diagnostics });
    await page.close();
  }

  const page = await browser.newPage();
  await page.goto(`http://localhost:${port}`, { waitUntil: "networkidle0" });
  await page.type("input[type='email']", `qa+${Date.now()}@freykraft.test`);
  await page.click("button[type='submit']");
  await page.waitForFunction(
    () => document.body.textContent?.includes("Email capture needs a form endpoint"),
    { timeout: 10000 }
  );
  await page.close();

  results.push({ staticFormGuard: "passed" });
  console.log(JSON.stringify(results, null, 2));
} finally {
  await browser.close();
  server.close();
}

function isDirectory(filePath) {
  return existsSync(filePath) && statSync(filePath).isDirectory();
}
