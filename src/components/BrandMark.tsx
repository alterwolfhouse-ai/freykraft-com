type BrandMarkProps = {
  inverse?: boolean;
};

export function BrandMark({ inverse = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3" aria-label="Freykraft">
      <div
        className={[
          "grid size-10 place-items-center border text-[18px] font-semibold",
          inverse
            ? "border-cream/70 bg-cream/10 text-cream"
            : "border-terracotta/40 bg-cream text-terracotta"
        ].join(" ")}
      >
        F
      </div>
      <div className="leading-none">
        <div
          className={[
            "font-serif text-[22px] font-semibold",
            inverse ? "text-cream" : "text-ink"
          ].join(" ")}
        >
          Freykraft
        </div>
        <div
          className={[
            "mt-1 text-[11px] uppercase",
            inverse ? "text-cream/75" : "text-taupe"
          ].join(" ")}
        >
          Modern Artisan
        </div>
      </div>
    </div>
  );
}
