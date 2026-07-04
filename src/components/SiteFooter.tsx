import Link from "next/link";
import { Building2, Mail, MapPin } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";
import { companyInfo, footerLinks } from "@/data/company";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-bg text-ink">
      <div className="mx-auto grid max-w-[1600px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.15fr_0.85fr_0.75fr] lg:px-12">
        <div>
          <BrandMark />
          <p className="fk-copy mt-5 max-w-[520px] text-sm">
            {companyInfo.summary}
          </p>
          <p className="mt-3 text-xs leading-6 text-muted">
            {companyInfo.displayName} - Est. {companyInfo.established}
          </p>
        </div>

        <div>
          <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Information
          </h2>
          <div className="mt-4 grid gap-3 text-sm text-body">
            <p className="flex gap-3">
              <Building2 aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <span>{companyInfo.studio}</span>
            </p>
            <p className="flex gap-3">
              <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
              <span>{companyInfo.address}</span>
            </p>
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
          <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
            Site links
          </h2>
          <nav className="mt-4 grid gap-3 text-sm" aria-label="Footer links">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body transition hover:text-terracotta"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="border-t border-hairline px-5 py-4 text-xs text-muted sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          &copy; 2026 {companyInfo.displayName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
