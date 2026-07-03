import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { categories, getCategory } from "@/data/storefront";
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
    title: `${category.name} | Freycraft`,
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

  return (
    <main className="bg-cream text-ink">
      <SiteHeader />
      <section className="relative min-h-[78svh] overflow-hidden pt-28 text-cream">
        <Image
          src={publicAssetPath(category.image)}
          alt={`${category.name} collection`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(43,38,34,0.9)_0%,rgba(43,38,34,0.68)_48%,rgba(43,38,34,0.18)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[60svh] max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm font-semibold text-cream/76 transition hover:text-white"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All products
            </Link>
            <p className="mt-8 text-sm font-semibold uppercase text-cream/72">
              {category.kicker}
            </p>
            <h1 className="mt-4 font-serif text-5xl font-semibold leading-none text-cream sm:text-7xl">
              {category.headline}
            </h1>
            <p className="mt-6 max-w-[620px] text-lg leading-8 text-cream/78">
              {category.intro}
            </p>
            <p className="mt-6 inline-flex rounded-[8px] border border-cream/20 bg-cream/10 px-4 py-3 text-sm font-semibold text-cream backdrop-blur">
              {category.offer}
            </p>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-olive">
              {category.name}
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-ink">
              Collection products
            </h2>
          </div>
          <Link
            href="/cart"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-[8px] bg-ink px-4 text-sm font-semibold text-cream transition hover:bg-terracotta"
          >
            <ShoppingBag aria-hidden="true" className="size-4" />
            Continue to cart
          </Link>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {category.products.map((product) => (
            <ProductCard
              key={product.slug}
              product={{ ...product, categorySlug: category.slug }}
            />
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
