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
    label: "Factory",
    value: "Factory and company inquiries",
    href: "/about",
    icon: MapPin,
  },
];

export default function ContactPage() {
  return (
    <main className="bg-cream text-ink">
      <SiteHeader />
      <section className="mx-auto grid min-h-[80svh] max-w-7xl gap-8 px-5 pb-16 pt-32 sm:px-8 lg:grid-cols-[0.82fr_0.68fr] lg:px-10">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase text-olive">
            Contact Us
          </p>
          <h1 className="mt-5 max-w-[720px] font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl">
            Marine manufacturing and service inquiries.
          </h1>
          <p className="mt-6 max-w-[620px] text-lg leading-8 text-ink/72">
            Reach out for company profile questions, fiberglass boat
            manufacturing, repair support, marine engine service, or factory
            inquiry routing.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Link
                  key={option.label}
                  href={option.href}
                  className="rounded-[8px] border border-ink/10 bg-white/60 p-4 transition hover:border-terracotta hover:bg-white"
                >
                  <Icon aria-hidden="true" className="size-5 text-terracotta" />
                  <span className="mt-4 block text-sm font-semibold text-ink">
                    {option.label}
                  </span>
                  <span className="mt-2 block text-sm leading-6 text-ink/68">
                    {option.value}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
        <form className="self-center rounded-[8px] border border-ink/10 bg-white/70 p-5 shadow-sm backdrop-blur">
          <MessageCircle
            aria-hidden="true"
            className="size-7 text-terracotta"
          />
          <h2 className="mt-5 font-serif text-3xl font-semibold text-ink">
            Send a note
          </h2>
          <label className="mt-6 block text-sm font-semibold text-ink">
            Name
            <input
              name="name"
              className="mt-2 h-12 w-full rounded-[8px] border border-ink/12 bg-cream px-4 text-base outline-none transition focus:border-olive"
              placeholder="Your name"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-ink">
            Email
            <input
              name="email"
              type="email"
              className="mt-2 h-12 w-full rounded-[8px] border border-ink/12 bg-cream px-4 text-base outline-none transition focus:border-olive"
              placeholder="you@example.com"
            />
          </label>
          <label className="mt-4 block text-sm font-semibold text-ink">
            Message
            <textarea
              name="message"
              rows={5}
              className="mt-2 w-full resize-none rounded-[8px] border border-ink/12 bg-cream px-4 py-3 text-base outline-none transition focus:border-olive"
              placeholder="Tell us what you need."
            />
          </label>
          <button
            type="button"
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[8px] bg-ink px-5 text-sm font-semibold text-cream transition hover:bg-terracotta"
          >
            Prepare message
          </button>
          <p className="mt-4 text-xs leading-6 text-ink/56">
            Direct contact: {companyInfo.phone} / {companyInfo.email}
          </p>
        </form>
      </section>
      <SiteFooter />
    </main>
  );
}
