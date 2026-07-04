import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatPrice, type Product } from "@/data/storefront";
import { publicAssetPath } from "@/lib/paths";

type ProductCardProps = {
  product: Product & {
    categorySlug?: string;
    category?: string;
    image?: string;
  };
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  const href = product.categorySlug
    ? `/products/${product.categorySlug}`
    : "/products";

  return (
    <article
      className={[
        "fk-product-card group flex h-full flex-col",
        compact ? "" : "max-w-full",
      ].join(" ")}
    >
      <Link
        href={href}
        className={[
          "fk-image-frame block",
          compact ? "aspect-[4/5]" : "aspect-[5/4] md:aspect-[4/5]",
        ].join(" ")}
      >
        {product.image ? (
          <Image
            src={publicAssetPath(product.image)}
            alt={product.name}
            fill
            sizes={compact ? "(min-width: 1024px) 25vw, 50vw" : "50vw"}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center bg-sand px-5 text-center font-mono text-[11px] text-muted">
            photo - {product.name.toLowerCase()}
          </div>
        )}
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-2 border border-ink bg-bg/95 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-ink opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
          View
        </span>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <Link
              href={href}
              className={[
                "font-serif font-medium leading-tight text-ink transition hover:text-terracotta",
                compact ? "text-[21px]" : "text-2xl",
              ].join(" ")}
            >
              {product.name}
            </Link>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
              {product.badge ?? product.category ?? "Artisan"}
            </p>
          </div>
          <span className="shrink-0 text-[15px] text-ink">
            {formatPrice(product.priceCents)}
          </span>
        </div>

        <p
          className={[
            "fk-copy mt-3",
            compact ? "hidden text-sm sm:block" : "text-base",
          ].join(" ")}
        >
          {product.description}
        </p>

        <Link
          href={href}
          className={[
            "mt-auto pt-5 text-terracotta",
            compact ? "hidden sm:inline-flex" : "inline-flex",
          ].join(" ")}
        >
          <span className="fk-link">
            View details
            <ArrowRight aria-hidden="true" className="size-4" />
          </span>
        </Link>
      </div>
    </article>
  );
}
