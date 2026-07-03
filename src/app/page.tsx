import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import { ExternalLink, Mail } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { EmailCaptureForm } from "@/components/EmailCaptureForm";
import {
  earlyAccessBenefits,
  launchPreview,
  trustSignals
} from "@/data/launch";

const socialLinks = [
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    icon: ExternalLink
  },
  {
    label: "Pinterest",
    href: process.env.NEXT_PUBLIC_PINTEREST_URL,
    icon: ExternalLink
  }
].filter((link): link is { label: string; href: string; icon: LucideIcon } =>
  Boolean(link.href)
);

export default function Home() {
  return (
    <main className="bg-cream text-ink">
      <section className="relative min-h-[84svh] overflow-hidden">
        <Image
          src="/images/freykraft-hero-still-life.png"
          alt="Handcrafted ceramic, wood, linen, and woven decor arranged in a warm modern interior."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_50%]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,243,236,0.96)_0%,rgba(247,243,236,0.9)_34%,rgba(247,243,236,0.48)_62%,rgba(247,243,236,0.12)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[84svh] w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <header className="flex items-center justify-between gap-5">
            <BrandMark />
            <a
              href="mailto:hello@freykraft.com"
              className="inline-flex size-11 items-center justify-center border border-ink/15 bg-cream/80 text-ink backdrop-blur transition hover:border-terracotta hover:text-terracotta"
              aria-label="Email Freykraft"
              title="Email Freykraft"
            >
              <Mail aria-hidden="true" className="size-5" />
            </a>
          </header>

          <div className="flex flex-1 items-center py-12">
            <div className="max-w-3xl">
              <p className="mb-5 text-sm font-semibold uppercase text-olive">
                Launching soon
              </p>
              <h1 className="max-w-[760px] font-serif text-6xl font-semibold leading-[0.92] text-ink sm:text-7xl md:text-8xl lg:text-9xl">
                Freykraft
              </h1>
              <p className="mt-6 max-w-[640px] text-lg leading-8 text-ink/82 sm:text-xl">
                Handcrafted gifts and home decor, selected for warm rooms,
                natural materials, and maker-led stories.
              </p>
              <div className="mt-8">
                <EmailCaptureForm />
              </div>
            </div>
          </div>

          <div className="grid gap-3 border-t border-ink/12 pt-4 text-sm text-ink/78 sm:grid-cols-3">
            {trustSignals.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-2">
                  <Icon aria-hidden="true" className="size-4 text-terracotta" />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-sand">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <p className="text-sm font-semibold uppercase text-olive">
              First collection
            </p>
            <h2 className="mt-3 max-w-[560px] font-serif text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Modern artisan pieces for everyday rituals.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {launchPreview.map((item) => (
              <div
                key={item}
                className="border border-ink/10 bg-cream p-5 text-base font-medium text-ink shadow-sm"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto grid max-w-7xl gap-5 px-5 py-14 sm:px-8 md:grid-cols-3 lg:px-10">
          {earlyAccessBenefits.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.label} className="border-l-2 border-terracotta pl-5">
                <Icon aria-hidden="true" className="mb-5 size-6 text-terracotta" />
                <h3 className="font-serif text-2xl font-semibold text-ink">
                  {item.label}
                </h3>
                <p className="mt-3 text-base leading-7 text-ink/72">{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-ink/10 bg-ink text-cream">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <BrandMark inverse />
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="inline-flex size-11 items-center justify-center border border-cream/20 text-cream transition hover:border-terracotta hover:text-terracotta"
                  aria-label={link.label}
                  title={link.label}
                >
                  <Icon aria-hidden="true" className="size-5" />
                </a>
              );
            })}
            <a
              href="mailto:hello@freykraft.com"
              className="inline-flex items-center gap-2 border border-cream/20 px-4 py-3 text-sm font-semibold text-cream transition hover:border-terracotta hover:text-terracotta"
            >
              <Mail aria-hidden="true" className="size-4" />
              hello@freykraft.com
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
