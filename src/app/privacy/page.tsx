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
    text: "Submitted information is used to respond to inquiries, send launch and early access updates, and understand interest in the store.",
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
  description: "Privacy policy for Freykraft.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-bg text-ink">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-5 pb-20 pt-32 sm:px-8 lg:px-10">
        <p className="fk-eyebrow inline-flex items-center gap-2">
          <ShieldCheck aria-hidden="true" className="size-4" />
          Privacy
        </p>
        <h1 className="mt-6 font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
          Privacy Policy
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
        <Link href="/terms" className="fk-link mt-8 text-terracotta">
          Read the Terms and Conditions
        </Link>
      </section>
      <SiteFooter />
    </main>
  );
}
