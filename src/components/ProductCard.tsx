import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/storefront";

type ProductCardProps = {
  product: Product & {
    categorySlug?: string;
    category?: string;
  };
  compact?: boolean;
};

export function ProductCard({ product, compact = false }: ProductCardProps) {
  return (
    <article
      className={[
        "group flex h-full flex-col justify-between rounded-[8px] border border-ink/10 bg-cream/88 shadow-sm backdrop-blur",
        compact ? "p-3 sm:p-4" : "p-4",
      ].join(" ")}
    >
      <div>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-[8px] bg-olive/10 px-3 py-1 text-xs font-semibold text-olive">
            {product.badge ?? product.category ?? "Artisan"}
          </span>
          <span className="text-sm font-semibold text-terracotta">
            {product.compareAt && (
              <span className="mr-2 text-taupe line-through">
                {product.compareAt}
              </span>
            )}
            {product.price}
          </span>
        </div>
        <h3
          className={[
            "font-serif font-semibold leading-tight text-ink",
            compact ? "text-xl sm:text-2xl" : "text-2xl",
          ].join(" ")}
        >
          {product.name}
        </h3>
        <p
          className={[
            "mt-3 leading-7 text-ink/70",
            compact ? "hidden text-sm sm:block" : "text-base",
          ].join(" ")}
        >
          {product.description}
        </p>
      </div>
      <Link
        href={`/products/${product.categorySlug ?? ""}`}
        className={[
          "mt-5 inline-flex items-center justify-center gap-2 rounded-[8px] bg-ink px-4 font-semibold text-cream transition hover:bg-terracotta",
          compact ? "h-10 text-xs sm:text-sm" : "h-11 text-sm",
        ].join(" ")}
      >
        <ShoppingBag aria-hidden="true" className="size-4" />
        View details
      </Link>
    </article>
  );
}
