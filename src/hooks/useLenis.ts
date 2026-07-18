"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "@/lib/gsap";

export function useLenis() {
  useEffect(() => {
    // Desktop only. Lenis ships with `syncTouch: false`, so on a touch device it
    // was never smoothing anything — it just ran a rAF loop every frame and fed
    // ScrollTrigger a second scroll signal. Skipping it on touch costs nothing
    // visible and keeps the pinned /history stage on the browser's own scroll.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Expose the instance so components can scroll smoothly via Lenis
    // (a raw window.scrollTo would be reverted by Lenis on the next frame).
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}
