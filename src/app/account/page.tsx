import Link from "next/link";
import { CircleUserRound, LockKeyhole, PackageCheck } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function AccountPage() {
  return (
    <main className="bg-cream text-ink">
      <SiteHeader />
      <section className="mx-auto grid min-h-[82svh] max-w-7xl gap-8 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[0.8fr_0.58fr] lg:px-10">
        <div className="flex flex-col justify-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-[8px] border border-olive/20 bg-white/60 px-4 py-2 text-sm font-semibold uppercase text-olive">
            <CircleUserRound aria-hidden="true" className="size-4" />
            Account
          </p>
          <h1 className="mt-6 max-w-[720px] font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl">
            Save carts, track orders, and manage launch access.
          </h1>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <article className="rounded-[8px] border border-ink/10 bg-white/58 p-5">
              <PackageCheck
                aria-hidden="true"
                className="size-6 text-terracotta"
              />
              <h2 className="mt-5 font-serif text-2xl font-semibold text-ink">
                Order history
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/68">
                Keep product purchases, gift notes, and delivery preferences in
                one place.
              </p>
            </article>
            <article className="rounded-[8px] border border-ink/10 bg-white/58 p-5">
              <LockKeyhole
                aria-hidden="true"
                className="size-6 text-terracotta"
              />
              <h2 className="mt-5 font-serif text-2xl font-semibold text-ink">
                Early access
              </h2>
              <p className="mt-3 text-sm leading-6 text-ink/68">
                Use the account path for launch sale codes and wishlisted
                collections.
              </p>
            </article>
          </div>
        </div>
        <form className="self-center rounded-[8px] border border-ink/10 bg-white/72 p-5 shadow-sm backdrop-blur">
          <h2 className="font-serif text-3xl font-semibold text-ink">
            Sign in
          </h2>
          <label className="mt-6 block text-sm font-semibold text-ink">
            Email
            <input
              name="email"
              type="email"
              className="mt-2 h-12 w-full rounded-[8px] border border-ink/12 bg-cream px-4 text-base outline-none transition focus:border-olive"
              placeholder="you@example.com"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-ink">
            Password
            <input
              name="password"
              type="password"
              className="mt-2 h-12 w-full rounded-[8px] border border-ink/12 bg-cream px-4 text-base outline-none transition focus:border-olive"
              placeholder="Password"
            />
          </label>
          <button
            type="button"
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[8px] bg-ink px-5 text-sm font-semibold text-cream transition hover:bg-terracotta"
          >
            Continue
          </button>
          <Link
            href="/contact"
            className="mt-4 inline-flex w-full justify-center text-sm font-semibold text-terracotta transition hover:text-terracotta-dark"
          >
            Need account help?
          </Link>
        </form>
      </section>
      <SiteFooter />
    </main>
  );
}
