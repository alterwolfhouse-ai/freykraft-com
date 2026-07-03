import Link from "next/link";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { companyInfo, footerLinks } from "@/data/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.15fr_0.85fr_0.75fr] lg:px-10">
        <div>
          <BrandMark inverse />
          <p className="mt-5 max-w-[520px] text-sm leading-7 text-cream/72">
            {companyInfo.summary}
          </p>
          <p className="mt-3 text-xs leading-6 text-cream/52">
            {companyInfo.displayName} ({companyInfo.registrationNumber}) -
            Incorporated {companyInfo.incorporated}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-cream/72">
            Information
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-cream/74">
            <p className="flex gap-3">
              <Building2 aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <span>{companyInfo.factory}</span>
            </p>
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <span>{companyInfo.address}</span>
            </p>
            <a
              href={`tel:${companyInfo.phone.replace(/\s/g, "")}`}
              className="flex gap-3 transition hover:text-terracotta"
            >
              <Phone aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <span>{companyInfo.phone}</span>
            </a>
            <a
              href={`mailto:${companyInfo.email}`}
              className="flex gap-3 transition hover:text-terracotta"
            >
              <Mail aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <span>{companyInfo.email}</span>
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase text-cream/72">
            Site links
          </h2>
          <nav className="mt-4 grid gap-3 text-sm" aria-label="Footer links">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/74 transition hover:text-terracotta"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-cream/10 px-5 py-4 text-xs text-cream/46 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          Copyright 2026 {companyInfo.displayName}. Company profile details are
          supplied for the site draft.
        </div>
      </div>
    </footer>
  );
}
