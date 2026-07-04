import Image from "next/image";
import Link from "next/link";
import { publicAssetPath } from "@/lib/paths";

type BrandMarkProps = {
  inverse?: boolean;
  large?: boolean;
};

export function BrandMark({ inverse = false, large = false }: BrandMarkProps) {
  return (
    <Link
      href="/"
      className="group flex min-w-0 items-center gap-3"
      aria-label="Freykraft home"
    >
      <Image
        src={publicAssetPath(
          large ? "/images/freykraft-logo.png" : "/images/freykraft-mark.png",
        )}
        alt=""
        aria-hidden="true"
        width={large ? 64 : 46}
        height={large ? 68 : 38}
        priority
        className="shrink-0 transition-transform duration-500 group-hover:scale-105"
      />
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
