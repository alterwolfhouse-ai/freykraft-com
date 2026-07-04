import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import {
  categories,
  featuredProducts,
  formatPrice,
  heroSlides,
} from "@/data/storefront";
import { publicAssetPath } from "@/lib/paths";

const marqueeText =
  "Hand-thrown ceramics / Woven wool / Small-batch gifts / Natural materials / Maker-led home decor / ";

export function HomeExperience() {
  const featured = featuredProducts[0];

  return (
    <main className="bg-bg text-ink">
      <Hero />
      <CraftGrid />
      <ManifestoBand />
      <FeaturedPiece product={featured} />
      <LaunchGrid />
      <SiteFooter />
    </main>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92svh] overflow-hidden border-b border-hairline pt-24"
    >
      <div
        aria-hidden="true"
        className="fk-field-lines absolute left-[-16rem] top-[-12rem] size-[34rem] opacity-70"
      />
      <div className="mx-auto grid min-h-[calc(92svh-6rem)] max-w-[1600px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
        <div className="relative z-10 mx-auto max-w-[840px] text-center lg:mx-0 lg:text-left">
          <p className="fk-eyebrow">
            Handcrafted home decor - small batch - USA
          </p>
          <div className="mt-7 grid grid-cols-3 gap-2 lg:hidden">
            {[
              "/images/freykraft-tabletop-ceramics.webp",
              "/images/freykraft-textiles-throws.webp",
              "/images/freykraft-hero-still-life.webp",
            ].map((image, index) => (
              <div key={image} className="fk-image-frame aspect-square">
                <Image
                  src={publicAssetPath(image)}
                  alt={`Freykraft mobile hero ${index + 1}`}
                  fill
                  priority
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <h1 className="mt-7 font-serif text-5xl font-medium leading-[1.04] text-ink sm:text-7xl lg:text-8xl">
            Objects made{" "}
            <em className="font-normal text-terracotta">slowly,</em> to be lived
            with.
          </h1>
          <p className="fk-copy mx-auto mt-7 max-w-[48ch] text-lg lg:mx-0">
            {heroSlides[0].text}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row lg:justify-start">
            <Link href="/products" className="fk-button fk-button-primary">
              Preview the collection
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link href="#early-access" className="fk-link text-ink">
              Join early access
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div id="early-access" className="mx-auto mt-10 scroll-mt-28 lg:mx-0">
            <EmailCaptureForm />
          </div>
        </div>

        <div className="relative hidden min-h-[520px] lg:block">
          <div className="fk-image-frame absolute left-0 top-8 aspect-[4/5] w-[42%] shadow-[0_34px_64px_-30px_rgba(31,29,26,0.4)]">
            <Image
              src={publicAssetPath("/images/freykraft-tabletop-ceramics.webp")}
              alt="Freykraft tabletop ceramics"
              fill
              priority
              sizes="(min-width: 1024px) 28vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="fk-image-frame absolute right-0 top-0 aspect-[4/5] w-[45%] shadow-[0_34px_64px_-30px_rgba(31,29,26,0.38)]">
            <Image
              src={publicAssetPath("/images/freykraft-textiles-throws.webp")}
              alt="Freykraft woven textiles"
              fill
              priority
              sizes="(min-width: 1024px) 30vw, 45vw"
              className="object-cover"
            />
          </div>
          <div className="fk-image-frame absolute bottom-0 left-[24%] aspect-[5/4] w-[54%] shadow-[0_40px_80px_-42px_rgba(31,29,26,0.5)]">
            <Image
              src={publicAssetPath("/images/freykraft-hero-still-life.webp")}
              alt="Freykraft home decor still life"
              fill
              priority
              sizes="(min-width: 1024px) 34vw, 55vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-hairline bg-bg/72 py-4">
        <div className="fk-marquee flex w-max whitespace-nowrap font-serif text-xl italic text-ink/45">
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
          <span>{marqueeText}</span>
        </div>
      </div>
    </section>
  );
}

function CraftGrid() {
  return (
    <section
      id="craft"
      className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12"
    >
      <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="fk-eyebrow">Shop by craft</p>
          <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
            Product stories, grouped by material.
          </h2>
        </div>
        <Link href="/products" className="fk-link text-ink">
          All pieces
          <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>

      <div className="grid gap-9 md:grid-cols-2 xl:grid-cols-5">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/products/${category.slug}`}
            className="group block"
          >
            <span className="fk-image-frame block aspect-[4/5]">
              <Image
                src={publicAssetPath(category.image)}
                alt={`${category.name} collection`}
                fill
                sizes="(min-width: 1280px) 18vw, (min-width: 768px) 45vw, 90vw"
                className="object-cover"
              />
            </span>
            <span className="mt-4 flex items-baseline justify-between gap-4 px-0.5 text-ink transition group-hover:text-terracotta">
              <span className="font-serif text-[22px] font-medium">
                {category.name}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                {category.products.length} pieces
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ManifestoBand() {
  return (
    <section
      id="story"
      className="relative overflow-hidden bg-forest text-cream"
    >
      <div
        aria-hidden="true"
        className="fk-field-lines absolute bottom-[-15rem] left-[-10rem] size-[36rem] opacity-30"
      />
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:px-12">
        <div>
          <p className="fk-eyebrow text-sandstone">Our craft</p>
          <h2 className="mt-5 max-w-[18ch] font-serif text-5xl font-medium leading-tight text-sand sm:text-6xl">
            Natural materials. Finished by human hands.
          </h2>
          <p className="mt-6 max-w-[58ch] text-base font-light leading-8 text-sand/72">
            Freykraft curates ceramics, textiles, wall art, furniture, and gifts
            that carry maker detail into everyday rooms.
          </p>
          <Link href="/about" className="fk-link mt-8 text-sandstone">
            Read the profile
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="fk-image-frame min-h-[420px] border-sand/20 bg-forest-dark">
          <Image
            src={publicAssetPath("/images/freykraft-furniture-rugs.webp")}
            alt="Freykraft small furniture and rugs"
            fill
            sizes="(min-width: 1024px) 42vw, 90vw"
            className="object-cover opacity-90"
          />
        </div>
      </div>
    </section>
  );
}

function FeaturedPiece({
  product,
}: {
  product: (typeof featuredProducts)[number];
}) {
  return (
    <section
      id="featured"
      className="mx-auto grid max-w-[1600px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.95fr_0.75fr] lg:items-center lg:px-12"
    >
      <div className="fk-image-frame aspect-[5/4]">
        <Image
          src={publicAssetPath(product.image)}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 52vw, 90vw"
          className="object-cover"
        />
      </div>
      <div>
        <p className="fk-eyebrow">Featured piece</p>
        <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-ink sm:text-5xl">
          {product.name}
        </h2>
        <p className="mt-3 text-xl text-ink">
          {formatPrice(product.priceCents)}
        </p>
        <p className="fk-copy mt-5 max-w-[44ch] text-base">
          {product.description}
        </p>
        <dl className="mt-8 border-t border-hairline">
          {[
            ["Collection", product.category],
            ["Launch note", product.badge ?? "Small batch"],
            ["Status", "Early-access preview"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-baseline justify-between gap-8 border-b border-hairline-soft py-3"
            >
              <dt className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                {label}
              </dt>
              <dd className="text-sm text-ink">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href={`/products/${product.categorySlug}`}
            className="fk-button fk-button-secondary"
          >
            View collection
          </Link>
          <Link href="/#early-access" className="fk-link text-muted">
            Join early access
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function LaunchGrid() {
  return (
    <section id="launch" className="border-t border-hairline bg-sand/70">
      <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="fk-eyebrow">Launch edit</p>
            <h2 className="mt-3 font-serif text-4xl font-medium text-ink sm:text-5xl">
              Featured products
            </h2>
          </div>
          <Link href="/products" className="fk-button fk-button-primary">
            Browse all
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.slug} product={product} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
