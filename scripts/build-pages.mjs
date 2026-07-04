import { spawnSync } from "node:child_process";
import { existsSync, renameSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const apiRoutes = path.join(root, "src", "app", "api");
const disabledApiRoutes = path.join(root, ".next-static-disabled-api");

rmSync(path.join(root, "out"), { recursive: true, force: true });
rmSync(path.join(root, ".next"), { recursive: true, force: true });
rmSync(disabledApiRoutes, { recursive: true, force: true });

const movedApiRoutes = existsSync(apiRoutes);

if (movedApiRoutes) {
  try {
    renameSync(apiRoutes, disabledApiRoutes);
  } catch (error) {
    if (error.code === "EPERM" || error.code === "EBUSY") {
      console.error(
        "\nCannot move src/app/api aside: the folder is locked, usually by a " +
          "running `next dev` server. Stop the dev server and retry.\n",
      );
      process.exit(1);
    }
    throw error;
  }
}

try {
  const result = spawnSync(process.execPath, [nextBin, "build"], {
    stdio: "inherit",
    env: {
      ...process.env,
      GITHUB_PAGES_BASE_PATH: process.env.GITHUB_PAGES_BASE_PATH ?? "",
      NEXT_PUBLIC_ASSET_BASE_PATH:
        process.env.NEXT_PUBLIC_ASSET_BASE_PATH ??
        process.env.GITHUB_PAGES_BASE_PATH ??
        "",
      STATIC_EXPORT: "true",
      NEXT_PUBLIC_STATIC_EXPORT: "true",
    },
  });

  if (result.status === 0) {
    writeFileSync(path.join(root, "out", ".nojekyll"), "");
  }

  process.exitCode = result.status ?? 0;
} finally {
  if (movedApiRoutes) {
    renameSync(disabledApiRoutes, apiRoutes);
  }
}
