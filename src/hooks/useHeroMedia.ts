"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

/* ── WHICH OF THE THREE HEROES THIS DEVICE GETS ────────────────────────────
   There are two mobile implementations and they exist for opposite reasons.

   WebCodecs (`film`) is the right tool. It decodes exactly the one picture
   the scroll asks for and draws it to a canvas — about 2ms, in any
   direction, at whatever resolution you like, because decoding a single
   frame is cheap. Nothing else here comes close.

   It also kills iPhones. Safari 16.4–18.7 ships a PARTIAL WebCodecs
   implementation; on iOS the decode runs inside the GPU process, so a
   failure terminates every tab in the browser rather than just this one;
   and isConfigSupported() there is a prefix match on the codec string, so a
   config VideoToolbox will refuse still answers `supported: true` and the
   demotion below never fires on its own. Full WebCodecs lands in Safari
   26.0. See IOS_CRASH_FINDINGS.md for the evidence.

   So WebKit gets `mobileVideo` — a plain <video> scrubbed with currentTime.
   Measurably less fluid (a seek is 20–50ms against WebCodecs' ~2ms) but it
   is the one shape of this hero the site has ever run on an iPhone without
   the tab being killed.

   ⚠ TEST THE ENGINE, NEVER THE OS AND NEVER THE BROWSER NAME.
   Apple requires every browser on iOS to use WebKit, so Chrome, Firefox and
   Edge on an iPhone are all Safari underneath and all carry this bug —
   while Chrome on Android is Blink and is completely fine. Sniffing for
   "Safari" in the user agent gets iOS Chrome exactly wrong, and it is the
   one that would then crash.

   `GestureEvent` is WebKit-proprietary (it is what powers pinch-zoom
   gesturestart/gesturechange) and has never existed in Blink or Gecko, so
   it is present in every browser on iOS and in desktop Safari, and absent
   everywhere else. `navigator.vendor` is the belt-and-braces second signal:
   WebKit reports "Apple Computer, Inc." on every platform it ships on.

   When Safari 26+ is widespread this can be relaxed to let modern WebKit
   take the film — but do it on a positive version check, not by trusting
   isConfigSupported, which lies. */
const DESKTOP = "(min-width: 768px)";

export type HeroMode = "desktop" | "film" | "mobileVideo";

function isWebKit(): boolean {
  return (
    "GestureEvent" in window ||
    /apple/i.test(navigator.vendor ?? "")
  );
}

function subscribe(onChange: () => void): () => void {
  const mq = window.matchMedia(DESKTOP);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/* ── ?hero=film — TEMPORARY, FOR TESTING WEBCODECS ON AN ACTUAL iPHONE ─────
   The reason WebKit is kept off the film is PRECAUTIONARY, not measured. The
   iPhone tab kill turned out to be the Chronicle carousel's arc, not the hero
   — iPhones died just as reliably with no canvas, no decoder and no frames on
   the page at all. So the film has never actually been tried on an iPhone;
   it was ruled out on research (partial WebCodecs in Safari 16.4–18.7, an
   isConfigSupported that only prefix-matches the codec string, and a decoder
   living in the GPU process where a failure takes every tab down) rather than
   on evidence from the device.

   This flag lets one phone opt in without changing what anybody else gets. If
   an iPhone runs `?hero=film` cleanly — including a scroll all the way through
   the hero and back — the default below can move and this can go.

   Safe to read here: getServerSnapshot returns null, so SSR emits no media at
   all and there is nothing for a query string to disagree with. */
function forcedMode(): HeroMode | null {
  const v = new URLSearchParams(window.location.search).get("hero");
  return v === "film" || v === "mobileVideo" ? v : null;
}

/* Returns one of three stable strings, so useSyncExternalStore's identity
   check never loops. */
function getSnapshot(): HeroMode {
  if (window.matchMedia(DESKTOP).matches) return "desktop";
  const forced = forcedMode();
  if (forced) return forced;
  if (isWebKit()) return "mobileVideo";
  return "VideoDecoder" in window ? "film" : "mobileVideo";
}

/* Null during SSR and the hydrating render, so the server emits neither a
   <video> nor a <canvas> and there is nothing to mismatch — the poster
   carries the first paint on every device. React re-renders once with the
   real answer immediately after hydration. */
const getServerSnapshot = (): HeroMode | null => null;

export function useHeroMedia() {
  const detected = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  /* One-way. A decoder that errors mid-scroll must not be able to flip back
     and re-download the film, so this never resets. */
  const [filmFailed, setFilmFailed] = useState(false);
  const demoteFilm = useCallback(() => setFilmFailed(true), []);

  const mode: HeroMode | null =
    detected === "film" && filmFailed ? "mobileVideo" : detected;

  return { mode, demoteFilm };
}
