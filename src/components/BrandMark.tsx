import Link from "next/link";

type BrandMarkProps = {
  inverse?: boolean;
  compactOnMobile?: boolean;
};

export function BrandMark({
  inverse = false,
  compactOnMobile = false,
}: BrandMarkProps) {
  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center gap-3"
      aria-label="Freycraft home"
    >
      <span className="brand-orbit" aria-hidden="true">
        <span className="brand-cube">
          <span className="brand-face brand-face-front">F</span>
          <span className="brand-face brand-face-right" />
          <span className="brand-face brand-face-top" />
        </span>
      </span>
      <span
        className={[
          "leading-none",
          compactOnMobile ? "hidden sm:block" : "block",
        ].join(" ")}
      >
        <span
          className={[
            "block font-serif text-[22px] font-semibold",
            inverse ? "text-cream" : "text-ink",
          ].join(" ")}
        >
          Freycraft
        </span>
        <span
          className={[
            "mt-1 block text-[11px] uppercase",
            inverse ? "text-cream/75" : "text-taupe",
          ].join(" ")}
        >
          Marine Industries
        </span>
      </span>
    </Link>
  );
}
