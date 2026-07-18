"use client";

import { useSyncExternalStore } from "react";

/**
 * Whether the visitor has asked their system to reduce motion.
 *
 * Needed as a React value — not only as a CSS media query — because a Tailwind
 * animation utility (`animate-ping`, `animate-spin`, …) cannot be switched off
 * from our own stylesheet: utilities live in `@layer utilities`, and for
 * `!important` declarations the cascade reverses layer order, so an unlayered
 * `animation: none !important` loses to them. The only reliable answer is to
 * not render the animated element.
 *
 * Modelled as an external store so the server snapshot is a stable `false` and
 * hydration cannot mismatch; React re-renders once the media query is read.
 */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/** Assume motion is welcome during SSR; the client corrects it immediately. */
const getServerSnapshot = () => false;

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
