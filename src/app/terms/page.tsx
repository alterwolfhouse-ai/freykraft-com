import Link from "next/link";
import { FileText } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { companyInfo } from "@/data/company";

const sections = [
  {
    title: "Use of this website",
    text: "The website provides general company information, contact paths, and draft product or service information. Content may be updated as company details are confirmed.",
  },
  {
    title: "Quotes and service requests",
    text: "Any boat manufacturing, repair, marine engine, or service request is subject to direct review, written quotation, availability, technical scope, and agreed commercial terms.",
  },
  {
    title: "Information accuracy",
    text: "Company profile information is based on material supplied for this site draft. Historical licence or profile details should be verified directly with the company before being treated as current.",
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
  description: "Website terms and conditions for Freycraft Marine Industries.",
};

export default function TermsPage() {
  return (
    <main className="bg-cream text-ink">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        <p className="inline-flex items-center gap-2 rounded-[8px] border border-olive/20 bg-white/60 px-4 py-2 text-sm font-semibold uppercase text-olive">
          <FileText aria-hidden="true" className="size-4" />
          Terms
        </p>
        <h1 className="mt-6 font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl">
          Terms and Conditions
        </h1>
        <p className="mt-5 text-sm text-ink/56">Last updated: July 3, 2026</p>
        <div className="mt-10 grid gap-4">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[8px] border border-ink/10 bg-white/62 p-5"
            >
              <h2 className="font-serif text-2xl font-semibold text-ink">
                {section.title}
              </h2>
              <p className="mt-3 leading-7 text-ink/70">{section.text}</p>
            </article>
          ))}
        </div>
        <Link
          href="/privacy"
          className="mt-8 inline-flex text-sm font-semibold text-terracotta transition hover:text-terracotta-dark"
        >
          Read the Privacy Policy
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
