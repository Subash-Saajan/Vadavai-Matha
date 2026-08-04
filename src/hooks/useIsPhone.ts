"use client";

import { useSyncExternalStore } from "react";

/**
 * Is this a phone-width viewport?
 *
 * Modelled as an external store rather than `useState` + `useEffect`, for the
 * same two reasons as `usePrefersReducedMotion`: setting state synchronously
 * inside an effect cascades a second render (and is a lint error here), and a
 * store gives a stable server snapshot that hydration cannot mismatch on.
 *
 * ⚠ THE SERVER SNAPSHOT IS `true`, WHICH IS THE OPPOSITE OF THE USUAL CHOICE.
 * Callers use this to decide how much to render, and the two wrong answers are
 * not symmetrical. Guessing "desktop" on the server means every phone is served
 * the full-fat document and has to tear it down after hydration — which is
 * precisely the burst of decoded images that kills the tab, and it happens
 * before React is running to prevent it. Guessing "phone" means a desktop
 * briefly renders the lean version and fills it in a tick later, on a machine
 * with memory to spare. So it assumes the constrained device and lets the
 * roomy one correct it.
 *
 * 767px, matching `ResidentImage` and the `md:` breakpoint the layouts use.
 */

const QUERY = "(max-width: 767px)";

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;

/** See the note above: the constrained device is the safe assumption. */
const getServerSnapshot = () => true;

export function useIsPhone(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
