import Link from "next/link";
import { FileText } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { companyInfo } from "@/data/company";

const sections = [
  {
    title: "Use of this website",
    text: "The website provides general store information, product details, and contact paths. Content, pricing, and availability may be updated at any time.",
  },
  {
    title: "Early access and pricing",
    text: "The website currently provides early-access product previews. Product availability, prices, and public launch terms may change before commerce opens.",
  },
  {
    title: "Information accuracy",
    text: "Product images, colors, and descriptions are provided as accurately as possible, though natural materials and handmade pieces may vary.",
  },
  {
    title: "Intellectual property",
    text: "Site copy, design, images, logos, and other materials may not be copied or reused without permission from the relevant rights holder.",
  },
  {
    title: "Contact",
    text: `For terms-related questions, contact ${companyInfo.email}.`,
  },
];

export const metadata = {
  title: "Terms and Conditions",
  description: "Website terms and conditions for Freykraft.",
};

export default function TermsPage() {
  return (
    <main className="bg-bg text-ink">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-20 pt-32 sm:px-8 lg:px-10">
        <p className="fk-eyebrow inline-flex items-center gap-2">
          <FileText aria-hidden="true" className="size-4" />
          Terms
        </p>
        <h1 className="mt-6 font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
          Terms and Conditions
        </h1>
        <p className="mt-5 text-sm text-muted">Last updated: July 3, 2026</p>
        <div className="mt-10 grid gap-4">
          {sections.map((section) => (
            <article key={section.title} className="fk-panel p-6">
              <h2 className="font-serif text-2xl font-medium text-ink">
                {section.title}
              </h2>
              <p className="fk-copy mt-3">{section.text}</p>
            </article>
          ))}
        </div>
        <Link href="/privacy" className="fk-link mt-8 text-terracotta">
          Read the Privacy Policy
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
