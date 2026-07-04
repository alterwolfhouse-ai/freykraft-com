import Link from "next/link";
import { Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { companyInfo } from "@/data/company";

const contactOptions = [
  {
    label: "Email",
    value: companyInfo.email,
    href: `mailto:${companyInfo.email}`,
    icon: Mail,
  },
  {
    label: "Response",
    value: "1-2 business days",
    href: `mailto:${companyInfo.email}`,
    icon: Clock3,
  },
  {
    label: "Studio",
    value: "About the brand",
    href: "/about",
    icon: MapPin,
  },
];

const mailtoHref = `mailto:${companyInfo.email}?subject=${encodeURIComponent(
  "Freykraft early access inquiry",
)}&body=${encodeURIComponent(
  "Hello Freykraft studio,\n\nI would like to ask about early access.\n\nName:\nEmail:\nMessage:",
)}`;

export default function ContactPage() {
  return (
    <main className="bg-bg text-ink">
      <SiteHeader />
      <section className="mx-auto grid min-h-[80svh] max-w-[1600px] gap-12 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[0.88fr_0.62fr] lg:px-12">
        <div className="flex flex-col justify-center">
          <p className="fk-eyebrow">Contact Us</p>
          <h1 className="mt-5 max-w-[760px] font-serif text-5xl font-medium leading-tight text-ink sm:text-6xl">
            Questions, early access, and gifting help.
          </h1>
          <p className="fk-copy mt-6 max-w-[620px] text-lg">
            Reach out about product details, gifting recommendations, or early
            access to the first Freykraft collection.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Link
                  key={option.label}
                  href={option.href}
                  className="fk-panel p-5 transition hover:border-terracotta"
                >
                  <Icon aria-hidden="true" className="size-5 text-terracotta" />
                  <span className="mt-5 block text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
                    {option.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-body">
                    {option.value}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        <aside className="fk-panel self-center p-6">
          <MessageCircle
            aria-hidden="true"
            className="size-7 text-terracotta"
          />
          <h2 className="mt-5 font-serif text-3xl font-medium text-ink">
            Send a note
          </h2>
          <p className="fk-copy mt-4 text-base">
            Send a direct note for product questions, gifting support, or first
            collection access.
          </p>
          <a
            href={mailtoHref}
            className="fk-button fk-button-primary mt-7 w-full"
          >
            Email Freykraft
            <Mail aria-hidden="true" className="size-4" />
          </a>
          <p className="mt-4 text-xs leading-6 text-muted">
            Direct contact: {companyInfo.email}
          </p>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
