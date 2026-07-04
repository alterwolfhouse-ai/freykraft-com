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
      aria-label="Freykraft home"
    >
      <span
        className={[
          "fk-mark transition-transform duration-500 group-hover:scale-110",
          inverse ? "text-cream" : "text-ink",
        ].join(" ")}
        aria-hidden="true"
      />
      <span
        className={[
          "leading-none",
          compactOnMobile ? "hidden sm:block" : "block",
        ].join(" ")}
      >
        <span
          className={[
            "block font-serif text-[24px] font-semibold tracking-[0.01em]",
            inverse ? "text-cream" : "text-ink",
          ].join(" ")}
        >
          frey<em className="font-medium text-terracotta">Kraft</em>
        </span>
      </span>
    </Link>
  );
}
