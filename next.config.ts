import type { NextConfig } from "next";

const isStaticExport = process.env.STATIC_EXPORT === "true";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
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
