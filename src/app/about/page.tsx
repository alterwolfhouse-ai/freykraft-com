import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Package, Palette } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  companyHighlights,
  companyInfo,
  companyProfileRows,
} from "@/data/company";
import { publicAssetPath } from "@/lib/paths";

const values = [
  {
    title: "Maker-led goods",
    text: "Every collection is shaped by artisan detail, from hand-thrown ceramics to handwoven textiles.",
    icon: Palette,
  },
  {
    title: "Natural materials",
    text: "We favor clay, linen, wool, alpaca, bamboo, and teak for warmth and tactile character.",
    icon: Leaf,
  },
  {
    title: "Considered gifting",
    text: "Candles, soaps, and small-batch objects are packed for meaningful, giftable moments.",
    icon: Package,
  },
];

export default function AboutPage() {
  return (
    <main className="bg-bg text-ink">
      <SiteHeader />
      <section className="mx-auto grid min-h-[78svh] max-w-[1600px] gap-12 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[0.82fr_1fr] lg:items-center lg:px-12">
        <div>
          <p className="fk-eyebrow">About Freykraft</p>
          <h1 className="mt-5 max-w-[760px] font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
            Maker-led home decor, made to feel personal.
          </h1>
          <p className="fk-copy mt-6 max-w-[650px] text-lg">
            {companyInfo.displayName} curates artisan ceramics, textiles, wall
            art, small furniture, and gifts into room-ready collections. Every
            piece is chosen for natural materials and maker-led detail, so your
            home feels considered rather than mass-made.
          </p>
          <Link href="/contact" className="fk-button fk-button-primary mt-9">
            Contact us
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="fk-image-frame aspect-[5/4]">
          <Image
            src={publicAssetPath("/images/freykraft-hero-still-life.webp")}
            alt="Freykraft home decor still life"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 90vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-5 px-5 py-16 sm:px-8 md:grid-cols-3 lg:px-12">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <article key={value.title} className="fk-panel p-6">
              <Icon aria-hidden="true" className="size-7 text-terracotta" />
              <h2 className="mt-6 font-serif text-3xl font-medium text-ink">
                {value.title}
              </h2>
              <p className="fk-copy mt-4">{value.text}</p>
            </article>
          );
        })}
      </section>

      <section className="border-y border-hairline bg-sand/70">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[0.7fr_1fr] lg:px-12">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="fk-eyebrow">Brand profile</p>
            <h2 className="mt-3 font-serif text-4xl font-medium text-ink">
              A quick look at what Freykraft is about.
            </h2>
          </div>
          <dl className="grid gap-0 border-t border-hairline bg-bg/35">
            {companyProfileRows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-3 border-b border-hairline-soft p-4 sm:grid-cols-[190px_1fr]"
              >
                <dt className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                  {label}
                </dt>
                <dd className="text-sm leading-7 text-body">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1600px] gap-5 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-12">
        {companyHighlights.map((item) => (
          <article key={item.label} className="fk-panel p-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
              {item.label}
            </p>
            <p className="fk-copy mt-4 text-sm">{item.value}</p>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
