import Link from "next/link";
import {
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { featuredProducts } from "@/data/storefront";

const cartItems = featuredProducts.slice(0, 3);

export default function CartPage() {
  const subtotal = cartItems.reduce(
    (total, product) => total + Number(product.price.replace("$", "")),
    0,
  );

  return (
    <main className="bg-cream text-ink">
      <SiteHeader />
      <section className="mx-auto min-h-[82svh] max-w-7xl px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        <p className="inline-flex items-center gap-2 rounded-[8px] border border-olive/20 bg-white/60 px-4 py-2 text-sm font-semibold uppercase text-olive">
          <ShoppingBag aria-hidden="true" className="size-4" />
          Cart
        </p>
        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.45fr]">
          <div>
            <h1 className="font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl">
              Review your launch edit.
            </h1>
            <div className="mt-8 grid gap-3">
              {cartItems.map((item) => (
                <article
                  key={item.slug}
                  className="grid gap-4 rounded-[8px] border border-ink/10 bg-white/62 p-4 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="text-sm font-semibold uppercase text-olive">
                      {item.category}
                    </p>
                    <h2 className="mt-2 font-serif text-2xl font-semibold text-ink">
                      {item.name}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-ink/66">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <div className="inline-flex h-10 items-center rounded-[8px] border border-ink/12 bg-cream">
                      <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center text-ink/70"
                        aria-label={`Decrease ${item.name}`}
                      >
                        <Minus aria-hidden="true" className="size-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold">
                        1
                      </span>
                      <button
                        type="button"
                        className="inline-flex size-10 items-center justify-center text-ink/70"
                        aria-label={`Increase ${item.name}`}
                      >
                        <Plus aria-hidden="true" className="size-4" />
                      </button>
                    </div>
                    <span className="text-lg font-semibold text-terracotta">
                      {item.price}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="h-fit rounded-[8px] border border-ink/10 bg-white/72 p-5 shadow-sm backdrop-blur">
            <ShieldCheck aria-hidden="true" className="size-7 text-olive" />
            <h2 className="mt-5 font-serif text-3xl font-semibold text-ink">
              Order summary
            </h2>
            <dl className="mt-6 grid gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/66">Subtotal</dt>
                <dd className="font-semibold">${subtotal}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/66">Launch savings</dt>
                <dd className="font-semibold text-olive">-$24</dd>
              </div>
              <div className="flex justify-between border-t border-ink/10 pt-3 text-base">
                <dt className="font-semibold">Estimated total</dt>
                <dd className="font-semibold">${subtotal - 24}</dd>
              </div>
            </dl>
            <Link
              href="/account"
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-semibold text-cream transition hover:bg-terracotta"
            >
              Continue checkout
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
