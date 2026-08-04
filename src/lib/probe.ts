/* ── A BISECT SWITCH, BECAUSE THE FAILURE LEAVES NO EVIDENCE ───────────────
   When iOS kills a page for memory the reader gets "This page couldn't load"
   and the developer gets nothing: no console (the process holding it is the
   one that died), no error event, no stack, nothing in a network panel. Remote
   Web Inspector does not help either — the inspector session dies with the
   WebContent process it was attached to.

   So the only instrument that works is the page itself, cut down a piece at a
   time on the actual phone that is failing. These flags do that, from the
   address bar, on the deployed site — no build, no cable, no Mac:

     ?probe=nofilm      the hero decodes nothing. The WebCodecs path is
                        skipped and the phone falls back to the WebP stills,
                        so neither the 11.7 MB film nor the video decoder is
                        involved.
     ?probe=stillonly   the hero is one picture. Implies `nofilm`, and the
                        frame sequence loads frame 0 and stops — the same
                        thing a reader who has asked for reduced motion gets.
     ?probe=noimages    every photograph that goes through ResidentImage is
                        left out. The page keeps its type, its layout and its
                        animation and holds almost no bitmaps.

   Combine them with commas: `?probe=stillonly,noimages` is the leanest the
   home page can be while still being the home page. Whichever flag makes the
   crash stop is the answer.

   ⚠ READ FROM AN EFFECT ONLY, NEVER DURING RENDER. Every page here is
   prerendered without a query string, so a render that branched on one would
   disagree with the server and break hydration for everybody — including the
   readers who never pass a flag. `typeof window` returning "undefined" is the
   backstop; the call sites are the real guarantee.

   This is diagnostic scaffolding. Delete it, and its three call sites, once
   the cause is found. */

import { useSyncExternalStore } from "react";

const FLAGS = ["nofilm", "stillonly", "noimages"] as const;

export type ProbeFlag = (typeof FLAGS)[number];

/**
 * Is this probe flag set on the current URL?
 *
 * Always false on the server and false for every visitor who has not typed a
 * flag, so a page with no `?probe=` behaves exactly as it did before.
 */
export function probe(flag: ProbeFlag): boolean {
  if (typeof window === "undefined") return false;
  const raw = new URLSearchParams(window.location.search).get("probe");
  if (!raw) return false;
  const set = raw.split(",").map((s) => s.trim());
  // `stillonly` is the stronger statement and implies `nofilm`, so a caller
  // asking "is the film off?" does not also have to know that.
  if (flag === "nofilm" && set.includes("stillonly")) return true;
  return set.includes(flag);
}

/* A URL cannot change without a navigation, so there is nothing to subscribe
   to — but reading the flag during render would disagree with the server for
   any URL that carries one. `useSyncExternalStore` is how the rest of this
   codebase resolves exactly that (see usePrefersReducedMotion): the server
   snapshot is a stable `false`, and React re-renders once with the real answer
   after hydration. It also keeps this out of an effect, where setting state
   synchronously is a lint error and a wasted render. */
const noSubscribe = () => () => {};

/** `probe`, as a hook that is safe to branch on during render. */
export function useProbe(flag: ProbeFlag): boolean {
  return useSyncExternalStore(
    noSubscribe,
    () => probe(flag),
    () => false,
  );
}
