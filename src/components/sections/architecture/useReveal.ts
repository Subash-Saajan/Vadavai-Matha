"use client";

import { useEffect, type RefObject } from "react";
import { gsap } from "@/lib/gsap";

/**
 * The house reveal, shared by every band of /architecture.
 *
 * Marker class is `.reveal-item`, exactly as the home sections use. GSAP sets
 * the hidden state inline rather than in CSS — deliberate: a client with JS off
 * still sees the copy, where a CSS `.reveal-up` would hide it forever.
 */
export function useReveal(root: RefObject<HTMLElement | null>, lang: string) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const items = root.current?.querySelectorAll<HTMLElement>(".reveal-item");
      items?.forEach((el, i) => {
        if (reduced) {
          gsap.set(el, { opacity: 1, y: 0 });
          return;
        }
        gsap.fromTo(
          el,
          { y: 42, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
            // Stagger within a row, but never let a long list cascade so far
            // that the last item is still waiting when it is already in view.
            delay: (i % 4) * 0.08,
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [root, lang]);
}
