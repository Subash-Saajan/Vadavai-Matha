"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

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

    /* ── ONE CLOCK, NOT TWO. THIS IS WHY PINS STOPPED POPPING. ────────────────
       Lenis used to run its own `requestAnimationFrame` loop, separate from the
       one GSAP renders tweens on. Two loops means two rAF callbacks per frame in
       whatever order the browser happens to have registered them: Lenis moved
       the page and fired `ScrollTrigger.update` in one, GSAP drew the tweens in
       the other. Where nothing is pinned that costs a frame nobody notices.

       Where something IS pinned it is visible. The pin is applied inside
       ScrollTrigger's update — the section is switched to `position: fixed` and
       offset — while the tweens driven off that same scroll are drawn in the
       other callback, so for one frame the section had jumped and its contents
       had not. That single mismatched frame at the moment the lock engages is
       exactly the "pop".

       Driving `lenis.raf` from `gsap.ticker` puts the scroll, the pin and every
       tween on one clock in a fixed order, so there is no frame where they
       disagree. `gsap.ticker` counts in SECONDS and Lenis wants MILLISECONDS —
       hence the ×1000; getting that wrong makes the page feel frozen, not
       janky, which is a useful thing to recognise.                             */
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);

    // GSAP's lag smoothing exists to stop long tweens desynchronising when the
    // main thread stalls: it PRETENDS the dropped frames did not happen. On a
    // scroll-driven page that is the wrong trade — the scroll position is real
    // and moved during the stall, so faking the elapsed time makes everything
    // reading off it lurch to catch up. Off, the recovery is a frame late
    // instead of a jump.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // GSAP's own default, back as we found it.
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
}
