import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts, companyInfo } from "@/data/company";

export const metadata = {
  title: "Blogs",
  description:
    "Highlights, company stories, and marine industry notes from Freycraft Marine Industries.",
};

export default function BlogsPage() {
  return (
    <main className="bg-cream text-ink">
      <SiteHeader />
      <section className="mx-auto min-h-[72svh] max-w-7xl px-5 pb-12 pt-32 sm:px-8 lg:px-10">
        <p className="inline-flex items-center gap-2 rounded-[8px] border border-olive/20 bg-white/60 px-4 py-2 text-sm font-semibold uppercase text-olive">
          <Newspaper aria-hidden="true" className="size-4" />
          Blogs
        </p>
        <h1 className="mt-6 max-w-[860px] font-serif text-6xl font-semibold leading-none text-ink sm:text-8xl">
          Highlights
        </h1>
        <p className="mt-6 max-w-[700px] text-lg leading-8 text-ink/72">
          Company stories, workshop notes, and marine service updates for{" "}
          {companyInfo.displayName}.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="flex min-h-72 flex-col justify-between rounded-[8px] border border-ink/10 bg-white/62 p-5 shadow-sm"
            >
              <div>
                <p className="text-sm font-semibold uppercase text-olive">
                  {post.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-ink">
                  {post.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-ink/68">
                  {post.excerpt}
                </p>
              </div>
              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-terracotta transition hover:text-terracotta-dark"
              >
                Ask about this
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
