import Link from "next/link";
import { ArrowRight, Newspaper } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { blogPosts, companyInfo } from "@/data/company";

export const metadata = {
  title: "Blogs",
  description:
    "Styling ideas, material notes, and gifting inspiration from Freykraft.",
};

export default function BlogsPage() {
  return (
    <main className="bg-bg text-ink">
      <SiteHeader />
      <section className="mx-auto min-h-[72svh] max-w-[1600px] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
        <p className="fk-eyebrow inline-flex items-center gap-2">
          <Newspaper aria-hidden="true" className="size-4" />
          Blogs
        </p>
        <h1 className="mt-6 max-w-[860px] font-serif text-6xl font-medium leading-tight text-ink sm:text-7xl">
          Highlights
        </h1>
        <p className="fk-copy mt-6 max-w-[700px] text-lg">
          Styling ideas, material notes, and gifting inspiration from{" "}
          {companyInfo.displayName}.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="fk-panel flex min-h-72 flex-col justify-between p-6"
            >
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                  {post.eyebrow}
                </p>
                <h2 className="mt-4 font-serif text-3xl font-medium leading-tight text-ink">
                  {post.title}
                </h2>
                <p className="fk-copy mt-4 text-sm">{post.excerpt}</p>
              </div>
              <Link href="/contact" className="fk-link mt-7 text-terracotta">
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
