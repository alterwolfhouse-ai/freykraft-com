import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://freykraft.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Freykraft - Handcrafted Home Decor and Gifts",
    template: "%s | Freykraft"
  },
  description:
    "Freykraft is a modern artisan store for handcrafted home decor, meaningful gifts, and maker-led design stories.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Freykraft - Handcrafted Home Decor and Gifts",
    description:
      "Join Freykraft for early access to handcrafted decor, gifts, and artisan stories.",
    url: siteUrl,
    siteName: "Freykraft",
    images: [
      {
        url: "/images/freykraft-hero-still-life.png",
        width: 1536,
        height: 1024,
        alt: "Handcrafted ceramic, wood, linen, and woven decor arranged in a warm modern interior."
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Freykraft - Handcrafted Home Decor and Gifts",
    description:
      "Early access is opening soon for Freykraft's handcrafted home decor and gift shop.",
    images: ["/images/freykraft-hero-still-life.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Script src="/freykraft-config.js" strategy="beforeInteractive" />
        {children}
      </body>
    </html>
  );
}
