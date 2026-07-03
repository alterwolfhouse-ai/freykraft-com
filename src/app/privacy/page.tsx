import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { companyInfo } from "@/data/company";

const sections = [
  {
    title: "Information we collect",
    text: "If you use a contact form or email capture form, the site may collect your name, email address, message, and campaign parameters included in the page URL.",
  },
  {
    title: "How information is used",
    text: "Submitted information is used to respond to inquiries, manage company communication, understand site interest, and support requested marine service or product discussions.",
  },
  {
    title: "Sharing",
    text: "Information is not sold. It may be shared only with service providers or company representatives needed to respond to the request.",
  },
  {
    title: "Retention",
    text: "Inquiry details may be retained while the request is active and for reasonable business record purposes unless deletion is requested and legally permissible.",
  },
  {
    title: "Contact",
    text: `For privacy questions or correction requests, contact ${companyInfo.email}.`,
  },
];

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Freycraft Marine Industries.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-cream text-ink">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-16 pt-32 sm:px-8 lg:px-10">
        <p className="inline-flex items-center gap-2 rounded-[8px] border border-olive/20 bg-white/60 px-4 py-2 text-sm font-semibold uppercase text-olive">
          <ShieldCheck aria-hidden="true" className="size-4" />
          Privacy
        </p>
        <h1 className="mt-6 font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl">
          Privacy Policy
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
          href="/terms"
          className="mt-8 inline-flex text-sm font-semibold text-terracotta transition hover:text-terracotta-dark"
        >
          Read the Terms and Conditions
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
