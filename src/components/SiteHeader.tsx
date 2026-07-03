import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { navItems } from "@/data/storefront";

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto flex max-w-7xl items-center gap-3 rounded-[8px] border border-white/30 bg-cream/72 px-3 py-3 shadow-[0_18px_80px_rgba(43,38,34,0.13)] backdrop-blur-xl sm:px-4">
        <BrandMark compactOnMobile />
        <nav
          className="ml-auto flex min-w-0 flex-1 items-center gap-1 overflow-x-auto"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex h-10 shrink-0 items-center gap-2 rounded-[8px] px-2 text-sm font-semibold text-ink/76 transition hover:bg-white/60 hover:text-terracotta sm:px-3"
              >
                <Icon aria-hidden="true" className="size-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
