import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3 } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { categories, featuredProducts } from "@/data/storefront";
import { publicAssetPath } from "@/lib/paths";

export default function ProductsPage() {
  return (
    <main className="bg-cream text-ink">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-5 pb-12 pt-32 sm:px-8 lg:px-10">
        <p className="inline-flex items-center gap-2 rounded-[8px] border border-olive/20 bg-white/60 px-4 py-2 text-sm font-semibold uppercase text-olive">
          <Layers3 aria-hidden="true" className="size-4" />
          Products
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[0.8fr_1fr] lg:items-end">
          <div>
            <h1 className="font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl">
              Browse by one focused category.
            </h1>
            <p className="mt-5 max-w-[620px] text-lg leading-8 text-ink/72">
              Each collection page keeps a single product family in view, so the
              shopper can compare without scrolling through unrelated items.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="group relative min-h-44 overflow-hidden rounded-[8px] bg-ink p-5 text-cream"
              >
                <Image
                  src={publicAssetPath(category.image)}
                  alt={`${category.name} category`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover opacity-54 transition group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="relative">
                  <span className="text-sm font-semibold uppercase text-cream/74">
                    {category.kicker}
                  </span>
                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    {category.name}
                  </h2>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                    Open collection
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="border-t border-ink/10 bg-sand">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-olive">
                Sale preview
              </p>
              <h2 className="mt-2 font-serif text-4xl font-semibold text-ink">
                Featured launch products
              </h2>
            </div>
            <Link
              href="/cart"
              className="inline-flex h-11 items-center justify-center rounded-[8px] border border-ink/14 px-4 text-sm font-semibold text-ink transition hover:border-terracotta hover:text-terracotta"
            >
              View cart journey
            </Link>
          </div>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.slug} product={product} compact />
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
