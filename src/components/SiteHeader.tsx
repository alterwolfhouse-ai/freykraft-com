import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { MobileNav } from "@/components/MobileNav";
import { navItems } from "@/data/storefront";

export function SiteHeader() {
  return (
    <header className="fk-header fixed left-0 right-0 top-0 z-50 border-b border-hairline bg-bg/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-5 px-5 py-3 sm:px-8 lg:px-12">
        <BrandMark />
        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="fk-navlink shrink-0 text-[12px] font-medium uppercase tracking-[0.16em] text-muted transition hover:text-ink"
            >
              {item.label.replace(" Us", "")}
            </Link>
          ))}
        </nav>
        <MobileNav />
      </div>
    </header>
  );
}
