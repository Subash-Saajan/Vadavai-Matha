"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Phones fire resize when the address bar shows/hides; refreshing every
  // ScrollTrigger mid-scroll makes pinned stages jump. Width changes
  // (rotation, real resizes) still refresh normally.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
