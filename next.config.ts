import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";
const pagesBasePath = process.env.GITHUB_PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        ...(pagesBasePath
          ? {
              assetPrefix: pagesBasePath,
              basePath: pagesBasePath
            }
          : {}),
        output: "export" as const,
        trailingSlash: true
      }
    : {}),
  images: {
    formats: ["image/avif", "image/webp"],
    ...(isStaticExport ? { unoptimized: true } : {})
  },
  poweredByHeader: false
};

export default nextConfig;
