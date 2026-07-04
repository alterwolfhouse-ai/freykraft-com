import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { categories, featuredProducts } from "@/data/storefront";

export default function ProductsPage() {
  return (
    <main className="bg-bg text-ink">
      <SiteHeader />
      <section className="mx-auto max-w-[1600px] px-5 pb-12 pt-32 sm:px-8 lg:px-12">
        <h1 className="font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
          Home Decor
        </h1>
        <p className="fk-copy mt-4 max-w-[54ch] text-lg">
          Artisan ceramics, textiles, wall art, small furniture, and giftable
          objects grouped into focused, room-ready collections.
        </p>
      </section>

      <section className="mx-auto flex max-w-[1600px] flex-col gap-10 px-5 pb-20 sm:px-8 lg:flex-row lg:px-12">
        <aside className="lg:sticky lg:top-28 lg:w-[220px] lg:self-start">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Category
          </p>
          <nav
            className="mt-4 flex gap-4 overflow-x-auto border-b border-hairline pb-6 lg:flex-col lg:items-start"
            aria-label="Product categories"
          >
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/products/${category.slug}`}
                className="shrink-0 border-b border-transparent pb-1 text-[15px] text-muted transition hover:border-terracotta hover:text-ink"
              >
                {category.name}
              </Link>
            ))}
          </nav>
          <p className="mt-7 text-sm font-light text-muted">
            {featuredProducts.length} pieces
          </p>
        </aside>

        <div className="grid flex-1 gap-9 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.slug} product={product} compact />
          ))}
        </div>
      </section>

      <section className="border-t border-hairline bg-sand/70">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-5 py-12 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <p className="fk-eyebrow">Exclusive early access</p>
            <h2 className="mt-2 font-serif text-4xl font-medium text-ink">
              Get the first collection note before public launch.
            </h2>
          </div>
          <Link href="/#early-access" className="fk-button fk-button-secondary">
            Join early access
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
