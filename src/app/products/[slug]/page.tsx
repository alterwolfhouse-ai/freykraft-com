import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { categories, formatPrice, getCategory } from "@/data/storefront";
import { publicAssetPath } from "@/lib/paths";

type ProductCategoryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: ProductCategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.name} | Freykraft`,
    description: category.intro,
  };
}

export default async function ProductCategoryPage({
  params,
}: ProductCategoryPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);

  if (!category) {
    notFound();
  }

  const leadProduct = category.products[0];

  return (
    <main className="bg-bg text-ink">
      <SiteHeader />

      <section className="mx-auto grid max-w-[1600px] gap-10 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[1.08fr_0.72fr] lg:px-12">
        <div>
          <Link href="/products" className="fk-link text-muted">
            <ArrowLeft aria-hidden="true" className="size-4" />
            All products
          </Link>
          <div className="fk-image-frame mt-7 aspect-[5/4] bg-sand">
            <Image
              src={publicAssetPath(category.image)}
              alt={`${category.name} collection`}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 90vw"
              className="object-cover"
            />
            <span className="absolute bottom-4 left-4 font-mono text-[11px] text-ink/50">
              freykraft / {category.slug}
            </span>
            <span className="absolute right-4 top-4 text-[11px] font-medium uppercase tracking-[0.16em] text-ink/45">
              Collection view
            </span>
          </div>
        </div>

        <aside className="border-hairline lg:border-l lg:pl-12">
          <p className="fk-eyebrow">{category.kicker}</p>
          <h1 className="mt-4 font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
            {category.headline}
          </h1>
          <p className="fk-copy mt-6 text-base">{category.intro}</p>
          <p className="mt-6 text-xl text-ink">
            {formatPrice(leadProduct.priceCents)}
          </p>

          <dl className="mt-8 border-t border-hairline">
            {[
              ["Collection", category.name],
              ["Featured", leadProduct.name],
              ["Offer", category.offer],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid gap-3 border-b border-hairline-soft py-4 sm:grid-cols-[120px_1fr]"
              >
                <dt className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">
                  {label}
                </dt>
                <dd className="text-sm leading-6 text-ink">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row lg:flex-col">
            <Link href="/#early-access" className="fk-button fk-button-primary">
              <Mail aria-hidden="true" className="size-4" />
              Join early access
            </Link>
            <Link href="/contact" className="fk-button fk-button-secondary">
              Ask about gifting
            </Link>
          </div>
        </aside>
      </section>

      <section className="border-t border-hairline bg-sand/70">
        <div className="mx-auto max-w-[1600px] px-5 py-16 sm:px-8 lg:px-12">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="fk-eyebrow">{category.name}</p>
              <h2 className="mt-2 font-serif text-4xl font-medium text-ink">
                Collection products
              </h2>
            </div>
            <Link href="/products" className="fk-link text-ink">
              Browse all
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <div className="grid gap-9 md:grid-cols-2">
            {category.products.map((product) => (
              <ProductCard
                key={product.slug}
                product={{
                  ...product,
                  category: category.name,
                  categorySlug: category.slug,
                  image: category.image,
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
