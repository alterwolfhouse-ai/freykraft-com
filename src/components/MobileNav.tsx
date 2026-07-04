"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { navItems } from "@/data/storefront";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-expanded={open}
        className="inline-flex size-11 items-center justify-center text-ink transition hover:text-terracotta"
      >
        <Menu aria-hidden="true" className="size-6" />
      </button>

      <div
        className={["fk-mobile-overlay", open ? "is-open" : ""].join(" ")}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-hairline px-5 py-4 sm:px-8">
          <BrandMark />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex size-11 items-center justify-center text-ink transition hover:text-terracotta"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
        </div>
        <nav
          className="flex flex-1 flex-col justify-center gap-1 px-7 pb-16"
          aria-label="Mobile navigation"
        >
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="fk-mobile-link border-b border-hairline-soft py-4 font-serif text-3xl font-medium text-ink transition hover:text-terracotta"
              style={{ "--fk-i": index } as React.CSSProperties}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <p className="px-7 pb-10 text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Maker-led home decor &amp; gifts
        </p>
      </div>
    </div>
  );
}
