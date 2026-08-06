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

/**
 * THE ONE BREAKPOINT MOTION IS DECIDED AT. Same 768px `useLenis` and
 * `useScrubVideo` already switch on, so a device is either "the desktop
 * build" everywhere or "the phone build" everywhere — never smoothed but
 * unparallaxed, or parallaxed but unsmoothed.
 *
 * ⚠ DECORATIVE SCROLL-SCRUBBED MOTION IS DESKTOP-ONLY, AND THIS IS THE SWITCH.
 *
 * The home page used to build every parallax on every device. That came to
 * roughly twenty-eight scrubbed ScrollTriggers on a phone — six gallery tiles
 * drifting plus six photographs panning inside them, five feast cards, two
 * backdrops, a counter-parallax, a façade zoom — each writing a transform on a
 * full-bleed image every frame, on top of the hero's canvas scrub and forty
 * entrance reveals. Desktop absorbs that; a mid-range Android does not, and
 * what the reader gets instead of depth is a page that stutters.
 *
 * So on a phone the decorative drifts do not exist — they are not merely
 * paused, they are never built, which also means no permanent compositor layer
 * per element. What survives on touch is what the reader actually came for:
 * the hero's frame scrub, the Chronicle's native swipe, the Verse lighting
 * word by word, and every entrance reveal.
 *
 * Wrap desktop-only motion in `gsap.matchMedia()` rather than an `if` on
 * `matchMedia(...).matches`: matchMedia BUILDS and REVERTS the tweens as the
 * query flips, so rotating a tablet or dragging a window across the breakpoint
 * lands on the right build instead of whichever one happened to mount.
 */
export const DESKTOP = "(min-width: 768px)";

/**
 * How far an entrance reveal travels, in pixels.
 *
 * 42px is right on a 1440px monitor and much too far on a 390px phone, where
 * it is more than a tenth of the screen: the copy visibly slides into place
 * rather than settling, and on a fast flick the reader meets a paragraph still
 * on its way. Read once, when the effect builds — a reveal that has already
 * played does not want re-deciding on rotation.
 */
export const revealY = (): number =>
  typeof window !== "undefined" && window.matchMedia(DESKTOP).matches ? 42 : 20;

/** Is this the phone build? Read once, when an effect builds — same rule as
 *  `revealY`: a reveal that has already played does not want re-deciding.
 *
 *  For picking BETWEEN two builds of the same tween. Motion that simply should
 *  not exist on a phone still belongs in `gsap.matchMedia(DESKTOP)`, which
 *  builds and reverts as the query flips. */
export const onPhone = (): boolean =>
  typeof window !== "undefined" && !window.matchMedia(DESKTOP).matches;

/* ── WHY A PHONE GETS ITS OWN REVEAL CLOCK ────────────────────────────────
   The entrance reveals were all authored against a monitor: fire at `top 88%`,
   run for a second, stagger a tenth of a second apart. On a desktop that is
   exactly right — the reader scrolls a wheel-notch at a time, so a paragraph
   has the whole second to settle before it is anywhere near the middle of the
   screen.

   A phone is a different machine entirely. The viewport is tall and narrow, so
   88% of it is 100px of travel rather than 40; and a thumb-flick moves the page
   at a speed a mouse wheel never reaches — most of a screen in a few hundred
   milliseconds. Put those together and the arithmetic is unkind: the block is
   still 100px below the fold when the reader flicks, so the tween starts late,
   and then it takes a full second (plus its stagger) while the block crosses
   the entire screen in less than half of that. What the reader actually meets
   is a photograph at 40% opacity sliding past the middle of their phone, and
   below it an empty box that has not been told to start yet. The page reads as
   though it is loading, when in truth everything arrived long ago.

   So on touch: fire the moment the element's top crosses the bottom edge, run
   roughly half as long, and cut the stagger down — and cap it, so the fourth
   item in a row is not still waiting when the row is already past. The reveal
   is then finished by the time the block reaches comfortable reading height at
   any scroll speed a thumb can produce. It is still a reveal, not a cut: the
   motion is there for anyone scrolling at a readerly pace.

   Desktop values are untouched — every helper takes the authored number and
   hands it straight back on a monitor. */

/**
 * Where an entrance reveal fires. `desktop` is the authored trigger point.
 *
 * ⚠ SCRUBBED triggers must NOT come through here. Their `start` is one end of
 * a position mapping, not a moment; moving it silently re-times the whole
 * tween. This is for `toggleActions` / `once` reveals only.
 */
export const revealStart = (desktop = "top 88%"): string =>
  onPhone() ? "top 96%" : desktop;

/** How long an entrance reveal runs. A phone gets a little over half. */
export const revealDuration = (desktop: number): number =>
  onPhone() ? Math.round(desktop * 55) / 100 : desktop;

/**
 * A bespoke reveal travel, shortened on touch by the same ratio `revealY`
 * uses (42 → 20). For the sections that slide a whole card rather than a line
 * of type: 80px is a fifth of a phone screen, and a card crossing that in half
 * a second is a swipe, not an entrance.
 */
export const revealTravel = (desktop: number): number =>
  onPhone() ? Math.round(desktop * 0.45) : desktop;

/** A tween's own `stagger`, shortened on touch. */
export const revealStagger = (desktop: number): number =>
  onPhone() ? Math.round(desktop * 45) / 100 : desktop;

/**
 * The per-item `delay` of a hand-rolled stagger — `delay: i * 0.1` becomes
 * `delay: revealDelay(i, 0.1)`. On a phone the step shortens AND stops
 * compounding after the fourth item, which is the one that used to arrive
 * half a second after the reader had already read it.
 */
export const revealDelay = (i: number, step = 0.1): number =>
  onPhone() ? Math.min(i, 3) * step * 0.45 : i * step;

export { gsap, ScrollTrigger, Draggable };
