"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { categories, heroSlides } from "@/data/storefront";
import { publicAssetPath } from "@/lib/paths";

export function HomeExperience() {
  const [transitionKeyword, setTransitionKeyword] = useState<string | null>(
    null,
  );
  const previousKeyword = useRef<string | null>(null);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-keyword]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const keyword = (active?.target as HTMLElement | undefined)?.dataset
          .keyword;
        if (keyword && previousKeyword.current !== keyword) {
          if (previousKeyword.current) {
            setTransitionKeyword(keyword);
          }
          previousKeyword.current = keyword;
        }
      },
      { threshold: [0.55, 0.72] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="h-svh snap-y snap-mandatory overflow-y-auto overflow-x-hidden bg-cream text-ink">
      <TransitionWord keyword={transitionKeyword} />
      <HeroCarousel />
      {categories.map((category, index) => (
        <section
          key={category.slug}
          id={category.slug}
          data-keyword={category.keyword}
          className="category-snap relative grid h-svh snap-start overflow-hidden bg-ink text-cream"
        >
          <Image
            src={publicAssetPath(category.image)}
            alt={`${category.name} collection`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className={[
              "absolute inset-0",
              index % 2 === 0
                ? "bg-[linear-gradient(90deg,rgba(43,38,34,0.88)_0%,rgba(43,38,34,0.68)_44%,rgba(43,38,34,0.22)_100%)]"
                : "bg-[linear-gradient(90deg,rgba(43,38,34,0.18)_0%,rgba(43,38,34,0.72)_52%,rgba(43,38,34,0.9)_100%)]",
            ].join(" ")}
          />
          <div
            className={[
              "relative mx-auto grid h-svh w-full max-w-7xl items-center gap-4 px-5 pb-5 pt-24 sm:gap-8 sm:px-8 sm:pb-10 sm:pt-28 lg:px-10",
              index % 2 === 0
                ? "lg:grid-cols-[0.88fr_0.72fr]"
                : "lg:grid-cols-[0.72fr_0.88fr]",
            ].join(" ")}
          >
            <div className={index % 2 === 0 ? "" : "lg:order-2"}>
              <p className="text-sm font-semibold uppercase text-cream/76">
                {category.kicker}
              </p>
              <h2 className="mt-3 max-w-[680px] font-serif text-4xl font-semibold leading-none text-cream sm:mt-4 sm:text-6xl lg:text-7xl">
                {category.headline}
              </h2>
              <p className="mt-4 max-w-[600px] text-sm leading-6 text-cream/78 sm:mt-6 sm:text-lg sm:leading-8">
                {category.intro}
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:mt-7 sm:flex-row sm:gap-3">
                <Link
                  href={`/products/${category.slug}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-terracotta px-5 text-sm font-semibold text-white transition hover:bg-terracotta-dark"
                >
                  Open {category.name}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex h-12 items-center justify-center rounded-[8px] border border-cream/35 px-5 text-sm font-semibold text-cream transition hover:bg-cream/10"
                >
                  See cart flow
                </Link>
              </div>
              <p className="mt-5 inline-flex rounded-[8px] border border-cream/20 bg-cream/10 px-4 py-3 text-sm font-semibold text-cream backdrop-blur">
                {category.offer}
              </p>
            </div>

            <div className={index % 2 === 0 ? "" : "lg:order-1"}>
              <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
                {category.products.map((product) => (
                  <div key={product.slug} className="min-w-[230px] sm:min-w-0">
                    <ProductCard
                      product={{ ...product, categorySlug: category.slug }}
                      compact
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
      <section
        data-keyword="Information"
        className="h-svh snap-start overflow-y-auto bg-ink pt-20"
      >
        <SiteFooter />
      </section>
    </main>
  );
}

function HeroCarousel() {
  return (
    <section
      data-keyword="Highlights"
      className="relative min-h-svh snap-start overflow-hidden bg-cream pt-24"
    >
      <div className="hero-slider absolute inset-0">
        {heroSlides.map((slide, index) => (
          <Image
            key={slide.image}
            src={publicAssetPath(slide.image)}
            alt={slide.headline}
            fill
            priority={index === 0}
            sizes="100vw"
            className="hero-slide object-cover"
            style={{ animationDelay: `${index * 5}s` }}
          />
        ))}
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,243,236,0.98)_0%,rgba(247,243,236,0.9)_36%,rgba(247,243,236,0.38)_70%,rgba(247,243,236,0.08)_100%)]"
      />
      <div className="relative mx-auto flex min-h-[calc(100svh-6rem)] max-w-7xl flex-col justify-center px-5 pb-10 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-[8px] border border-olive/20 bg-white/42 px-4 py-2 text-sm font-semibold uppercase text-olive backdrop-blur">
            <Sparkles aria-hidden="true" className="size-4" />
            Highlights
          </p>
          <h1 className="mt-6 max-w-[820px] font-serif text-6xl font-semibold leading-[0.93] text-ink sm:text-7xl lg:text-8xl">
            Freycraft
          </h1>
          <p className="mt-5 max-w-[660px] text-xl leading-9 text-ink/78">
            A marine industries profile and fast browsing experience for company
            highlights, service inquiries, and product discovery.
          </p>
          <div className="mt-8">
            <EmailCaptureForm />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-semibold text-cream transition hover:bg-terracotta"
            >
              Browse all products
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <a
              href="#tabletop"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-[8px] border border-ink/15 bg-white/50 px-5 text-sm font-semibold text-ink backdrop-blur transition hover:border-terracotta hover:text-terracotta"
            >
              Start section flow
              <ChevronDown aria-hidden="true" className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function TransitionWord({ keyword }: { keyword: string | null }) {
  if (!keyword) {
    return null;
  }

  const letters = Array.from(keyword);

  return (
    <div
      key={keyword}
      className="transition-word pointer-events-none fixed inset-0 z-40 grid place-items-center"
    >
      <span className="sr-only">{keyword}</span>
      <span className="transition-word__letters" aria-hidden="true">
        {letters.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={[
              "transition-letter",
              letter === " " ? "transition-letter-space" : "",
            ].join(" ")}
            style={{ animationDelay: `${index * 90}ms` }}
          >
            {letter}
          </span>
        ))}
      </span>
    </div>
  );
}
