import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Factory, ShipWheel, Wrench } from "lucide-react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  companyHighlights,
  companyInfo,
  companyProfileRows,
} from "@/data/company";
import { publicAssetPath } from "@/lib/paths";

const values = [
  {
    title: "Fiberglass boatbuilding",
    text: "The company grew from speed boat building experience into full-time fiberglass boat manufacturing.",
    icon: ShipWheel,
  },
  {
    title: "Workshop facilities",
    text: "Facilities include fiberglass moulding, welding, woodworking machinery, and spray painting.",
    icon: Factory,
  },
  {
    title: "Marine service",
    text: "The company profile covers boat repair, boat service, and marine engine sales and service.",
    icon: Wrench,
  },
];

export default function AboutPage() {
  return (
    <main className="bg-cream text-ink">
      <SiteHeader />
      <section className="relative min-h-[72svh] overflow-hidden pt-28">
        <Image
          src={publicAssetPath("/images/freykraft-hero-still-life.png")}
          alt="Freycraft Marine Industries profile background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(247,243,236,0.97)_0%,rgba(247,243,236,0.88)_45%,rgba(247,243,236,0.2)_100%)]"
        />
        <div className="relative mx-auto flex min-h-[58svh] max-w-7xl items-center px-5 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-olive">
              About Freycraft
            </p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-none text-ink sm:text-7xl">
              Fiberglass boatbuilding with Sabah roots.
            </h1>
            <p className="mt-6 max-w-[650px] text-lg leading-8 text-ink/76">
              {companyInfo.displayName} began with speed boat construction
              experience and was incorporated in Malaysia on{" "}
              {companyInfo.incorporated}. The profile supplied for this site
              highlights fiberglass boat manufacturing, marine engine support,
              and boat repair services.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-16 sm:px-8 md:grid-cols-3 lg:px-10">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <article
              key={value.title}
              className="rounded-[8px] border border-ink/10 bg-white/56 p-6 shadow-sm"
            >
              <Icon aria-hidden="true" className="size-7 text-terracotta" />
              <h2 className="mt-6 font-serif text-3xl font-semibold text-ink">
                {value.title}
              </h2>
              <p className="mt-4 leading-7 text-ink/70">{value.text}</p>
            </article>
          );
        })}
      </section>

      <section className="border-y border-ink/10 bg-sand">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[0.7fr_1fr] lg:px-10">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="text-sm font-semibold uppercase text-olive">
              Company profile
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-ink">
              Key information from the supplied company record.
            </h2>
            <Link
              href="/contact"
              className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-[8px] bg-ink px-5 text-sm font-semibold text-cream transition hover:bg-terracotta"
            >
              Contact the company
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <dl className="grid gap-3">
            {companyProfileRows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 rounded-[8px] border border-ink/10 bg-cream/72 p-4 sm:grid-cols-[190px_1fr]"
              >
                <dt className="text-sm font-semibold uppercase text-olive">
                  {label}
                </dt>
                <dd className="text-sm leading-7 text-ink/74">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4 lg:px-10">
        {companyHighlights.map((item) => (
          <article
            key={item.label}
            className="rounded-[8px] border border-ink/10 bg-white/58 p-5"
          >
            <p className="text-sm font-semibold uppercase text-olive">
              {item.label}
            </p>
            <p className="mt-4 text-sm leading-7 text-ink/70">{item.value}</p>
          </article>
        ))}
      </section>
      <SiteFooter />
    </main>
  );
}
