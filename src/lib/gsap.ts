"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Draggable + InertiaPlugin are what make the Chronicle carousel feel like a
// real object rather than a scroll container: a throw carries momentum, decays
// on a physical curve and settles onto a snap point. Both have been free since
// GSAP 3.13 and are already in node_modules — no new dependency was added.
//
// ⚠ `gsap/dist/Draggable`, NOT `gsap/Draggable`, AND IT IS NOT A STYLE CHOICE.
// gsap's export map sends `gsap/<Name>` to `./types/<Name>.d.ts`, and the type
// file for this one plugin is `types/draggable.d.ts` — lower case. On a
// case-insensitive filesystem (Windows, macOS) TypeScript resolves the wrong
// casing of the same file and fails the build outright:
//
//   TS1149: File name '…/types/Draggable.d.ts' differs from already included
//           file name '…/types/draggable.d.ts' only in casing.
//
// The `./dist/*` entry carries no `types` field, so the ambient
// `declare module "gsap/dist/Draggable"` is used instead and nothing collides.
// ScrollTrigger and InertiaPlugin are unaffected — their type files are
// hyphenated (`scroll-trigger.d.ts`), so no case-insensitive match exists.
import { Draggable } from "gsap/dist/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Draggable, InertiaPlugin);
  // Phones fire resize when the address bar shows/hides; refreshing every
  // ScrollTrigger mid-scroll makes pinned stages jump. Width changes
  // (rotation, real resizes) still refresh normally.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

/**
 * USE THIS, NOT `useEffect`, FOR ANY EFFECT THAT PINS.
 *
 * ScrollTrigger's `pin` does not merely style an element — it WRAPS it in a
 * `.pin-spacer` div, so the pinned node stops being a child of the node React
 * still believes it is a child of. The only thing that puts it back is the
 * context's `revert()` in the effect cleanup, and that has to happen BEFORE
 * React touches the DOM.
 *
 * `useEffect` cleanups are passive: React runs them AFTER the mutation phase.
 * So on a route change React reaches the reparented element first and calls
 * `parent.removeChild(el)` on a node that is now inside the spacer —
 *
 *   NotFoundError: Failed to execute 'removeChild' on 'Node'
 *
 * which is fatal to the navigation. A LAYOUT effect's cleanup runs inside the
 * mutation phase, before the removal, so the spacer is already unwrapped by the
 * time React gets there. (This is exactly why GSAP's own `useGSAP` hook is
 * built on a layout effect.)
 *
 * The `typeof window` guard is the standard one: `useLayoutEffect` warns when
 * it is called during server rendering, where it would never fire anyway.
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { gsap, ScrollTrigger, Draggable };
