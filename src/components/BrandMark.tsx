import Image from "next/image";
import Link from "next/link";
import { publicAssetPath } from "@/lib/paths";

type BrandMarkProps = {
  inverse?: boolean;
  large?: boolean;
};

/**
 * Flat vector monogram for small sizes. The photographic shield emblem
 * turns muddy below ~60px, so the header uses this crisp tile instead;
 * the full shield renders only at footer size via `large`.
 */
function MonogramTile() {
  return (
    <svg
      viewBox="0 0 48 48"
      width={40}
      height={40}
      aria-hidden="true"
      className="shrink-0 transition-transform duration-500 group-hover:scale-105"
    >
      <rect width="48" height="48" rx="3" fill="#2e4636" />
      <circle
        cx="33.5"
        cy="9.5"
        r="2.2"
        fill="none"
        stroke="#b5643c"
        strokeWidth="1.6"
      />
      <line
        x1="32.6"
        y1="11.6"
        x2="16"
        y2="40"
        stroke="#b5643c"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <text
        x="23"
        y="25.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="29"
        fontStyle="italic"
        fontWeight="600"
        fill="#f5f2ea"
        style={{ fontFamily: "var(--font-serif, Georgia, serif)" }}
      >
        F
      </text>
    </svg>
  );
}

export function BrandMark({ inverse = false, large = false }: BrandMarkProps) {
  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center gap-3"
      aria-label="Freykraft home"
    >
      {large ? (
        <Image
          src={publicAssetPath("/images/freykraft-logo.png")}
          alt=""
          aria-hidden="true"
          width={64}
          height={68}
          priority
          className="shrink-0 transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <MonogramTile />
      )}
      <span className="block leading-none">
        <span
          className={[
            "block font-serif font-semibold tracking-[0.01em]",
            large ? "text-[30px]" : "text-[24px]",
            inverse ? "text-cream" : "text-ink",
          ].join(" ")}
        >
          frey<em className="font-medium text-terracotta">Kraft</em>
        </span>
        {large && (
          <span className="mt-1.5 block text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
            Handicraft store
          </span>
        )}
      </span>
    </Link>
  );
}
