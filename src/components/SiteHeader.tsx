import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";
import { navItems } from "@/data/storefront";

export function SiteHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-hairline bg-bg/92 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center gap-5 px-5 py-4 sm:px-8 lg:px-12">
        <BrandMark compactOnMobile />
        <nav
          className="ml-auto flex min-w-0 flex-1 items-center justify-start gap-7 overflow-x-auto lg:justify-end"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 border-b border-transparent pb-1 text-[12px] font-medium uppercase tracking-[0.16em] text-muted transition hover:border-terracotta hover:text-ink"
            >
              {item.label.replace(" Us", "")}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
