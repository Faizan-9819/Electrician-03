"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scans the page for ".reveal" elements and fades each one in the first time
 * it enters the viewport. Mounted once near the root — see globals.css for
 * the actual transition (".reveal" / ".reveal-in" / ".reveal-d1".."d6").
 *
 * Re-runs on every pathname change: this component itself never unmounts
 * (it lives in the root layout), but a client-side navigation — e.g. the
 * language toggle switching between "/" and "/nl" — swaps in a whole new
 * page of fresh ".reveal" elements that were never observed. Without this,
 * they'd stay stuck at opacity:0 until a hard refresh re-ran the scan.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("reveal-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
