"use client";

import { useEffect, type RefObject } from "react";
import {
  gsap,
  revealY,
  revealStart,
  revealDuration,
  revealDelay,
} from "@/lib/gsap";

/**
 * THE HOUSE REVEAL — used by every band of /architecture and /mass-timings.
 *
 * Marker class is `.reveal-item`, exactly as the home sections use. GSAP sets
 * the hidden state inline rather than in CSS — deliberate: a client with JS off
 * still sees the copy, where a CSS `.reveal-up` would hide it forever.
 *
 * It lived at components/sections/architecture/useReveal.ts, which still
 * re-exports it so that page's imports are untouched. It was lifted here when
 * /mass-timings was rebuilt and became the second page to need it.
 */
export function useReveal(root: RefObject<HTMLElement | null>, lang: string) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 42px on a monitor, 20px on a phone — see the note on `revealY`.
    const travel = revealY();

    const ctx = gsap.context(() => {
      const items = root.current?.querySelectorAll<HTMLElement>(".reveal-item");
      items?.forEach((el, i) => {
        if (reduced) {
          gsap.set(el, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          el,
          { y: travel, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(1),
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: revealStart("top 88%"),
              toggleActions: "play none none none",
            },
            // Stagger within a row, but never let a long list cascade so far
            // that the last item is still waiting when it is already in view.
            delay: revealDelay(i % 4, 0.08),
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [root, lang]);
}
