"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { publicAssetPath } from "@/lib/paths";

type Slide = {
  image: string;
  label: string;
  caption: string;
};

// TODO(codex — content pass): image work, pending uploads from the owner.
//  1. Add a DEDICATED urn photo (e.g. /images/freykraft-urns.webp) and point the
//     "Urns & Vessels" slide at it — right now it borrows freykraft-hero-sale.webp.
//  2. NO REPEATED IMAGES: each slide must use a unique photo, AND those photos should
//     not be the same shots reused lower on the page (CraftGrid categories, FeaturedPiece,
//     LaunchGrid cards currently reuse these category images). Source one distinct hero
//     image per category so nothing appears twice across the homepage.
//  3. Keep 5 slides / labels below; only swap the `image` paths once assets land.
const slides: Slide[] = [
  {
    image: "/images/freykraft-tabletop-ceramics.webp",
    label: "Ceramics",
    caption: "Hand-thrown ceramics with natural glaze.",
  },
  {
    image: "/images/freykraft-textiles-throws.webp",
    label: "Fabric & Textiles",
    caption: "Woven throws and tactile soft goods.",
  },
  {
    image: "/images/freykraft-hero-sale.webp",
    label: "Urns & Vessels",
    caption: "Sculptural urns and statement vessels.",
  },
  {
    image: "/images/freykraft-hero-still-life.webp",
    label: "Kitchenware",
    caption: "Handmade kitchenware for everyday rituals.",
  },
  {
    image: "/images/freykraft-wall-decor.webp",
    label: "Home Decor",
    caption: "Room-ready decor with maker detail.",
  },
];

const INTERVAL = 6500;

export function HeroSlideshow() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = slides[index];

  return (
    <div
      className="fk-hero-img fk-image-frame relative aspect-[16/9] w-full overflow-hidden shadow-[0_40px_80px_-42px_rgba(31,29,26,0.5)] lg:aspect-auto lg:h-[min(74svh,700px)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carousel"
      aria-label="Freykraft product categories"
    >
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className="absolute inset-0 transition-opacity duration-[1600ms] ease-out"
          style={{ opacity: i === index ? 1 : 0 }}
          aria-hidden={i !== index}
        >
          <Image
            src={publicAssetPath(slide.image)}
            alt={slide.caption}
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 46vw, 92vw"
            className={[
              "object-cover",
              i === index ? "fk-slide-active" : "",
            ].join(" ")}
          />
        </div>
      ))}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/55 via-ink/10 to-transparent" />

      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <span className="inline-block bg-bg/92 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-ink">
            {active.label}
          </span>
          <p className="mt-2 max-w-[26ch] text-sm font-light leading-snug text-sand drop-shadow-[0_1px_6px_rgba(31,29,26,0.55)]">
            {active.caption}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 pb-1">
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show ${slide.label}`}
              aria-current={i === index}
              className={[
                "h-1.5 rounded-full transition-all duration-300",
                i === index
                  ? "w-6 bg-sand"
                  : "w-1.5 bg-sand/55 hover:bg-sand/85",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
