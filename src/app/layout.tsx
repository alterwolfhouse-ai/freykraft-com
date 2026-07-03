import type { Metadata } from "next";
import Script from "next/script";
import { publicAssetPath } from "@/lib/paths";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://freykraft.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Freycraft Marine Industries Sdn Bhd",
    template: "%s | Freycraft",
  },
  description:
    "Freycraft Marine Industries Sdn Bhd is a Sabah-based fiberglass boat builder, marine engine service provider, and boat repair company.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Freycraft Marine Industries Sdn Bhd",
    description:
      "Explore Freycraft Marine Industries company profile, marine services, and fiberglass boatbuilding highlights.",
    url: siteUrl,
    siteName: "Freycraft",
    images: [
      {
        url: "/images/freykraft-hero-still-life.png",
        width: 1536,
        height: 1024,
        alt: "Freycraft Marine Industries company profile image.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freycraft Marine Industries Sdn Bhd",
    description:
      "Fiberglass boatbuilding, marine engine service, and boat repair in Sabah.",
    images: ["/images/freykraft-hero-still-life.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script
          src={publicAssetPath("/freykraft-config.js")}
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
