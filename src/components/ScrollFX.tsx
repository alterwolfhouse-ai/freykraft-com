"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function ScrollFX() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("fk-js");

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    let observer: IntersectionObserver | undefined;

    if (reduced || !("IntersectionObserver" in window)) {
      for (const el of revealEls) {
        el.classList.add("is-inview");
      }
    } else {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-inview");
              observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
      );

      for (const el of revealEls) {
        observer.observe(el);
      }
    }

    const parallaxEls = reduced
      ? []
      : Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));

    let frame = 0;

    const update = () => {
      frame = 0;
      root.classList.toggle("fk-scrolled", window.scrollY > 12);

      const viewportMid = window.innerHeight / 2;
      for (const el of parallaxEls) {
        const rect = el.getBoundingClientRect();
        const offset = rect.top + rect.height / 2 - viewportMid;
        const strength = Number(el.dataset.parallax) || 0.08;
        el.style.setProperty("--fk-py", `${(-offset * strength).toFixed(1)}px`);
      }
    };

    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [pathname]);

  return null;
}
