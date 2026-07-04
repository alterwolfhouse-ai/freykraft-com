import type { Metadata } from "next";
import { Jost, Playfair_Display } from "next/font/google";
import Script from "next/script";
import { ScrollFX } from "@/components/ScrollFX";
import { publicAssetPath } from "@/lib/paths";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://freykraft.com";
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Freykraft",
  url: siteUrl,
  email: "hello@freykraft.com",
  description:
    "Maker-led home decor store offering artisan ceramics, textiles, wall art, small furniture, and giftable objects.",
};

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Freykraft - Maker-led home decor & gifts",
    template: "%s | Freykraft",
  },
  description:
    "Freykraft is a maker-led home decor store offering artisan ceramics, textiles, wall art, small furniture, and giftable objects shaped by natural materials.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Freykraft - Maker-led home decor & gifts",
    description:
      "Preview artisan ceramics, textiles, wall art, furniture, and gifts before the first Freykraft collection opens.",
    url: siteUrl,
    siteName: "Freykraft",
    images: [
      {
        url: "/images/freykraft-hero-still-life.webp",
        width: 1280,
        height: 683,
        alt: "Freykraft home decor still life.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freykraft - Maker-led home decor & gifts",
    description:
      "Artisan ceramics, textiles, wall art, furniture, and gifts, curated into room-ready collections.",
    images: ["/images/freykraft-hero-still-life.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.variable} ${playfair.variable}`}>
        <Script
          src={publicAssetPath("/freykraft-config.js")}
          strategy="beforeInteractive"
        />
        <Script
          id="freykraft-organization-jsonld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <ScrollFX />
        {children}
      </body>
    </html>
  );
}
