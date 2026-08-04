"use client";

import { useSyncExternalStore } from "react";

/* ── A FLIGHT RECORDER, BECAUSE THE CRASH TAKES THE EVIDENCE WITH IT ───────
   When WebKit kills a page there is no console, no error handler, no unload
   event and no chance to send anything anywhere — the process holding all of
   those is the one that died. Every instrument tried so far has therefore been
   indirect: measure the page at rest, reason about what a phone would do with
   it, ship a change, ask. Three rounds of that produced three fixes to things
   that turned out not to be the cause. /diagnostics settled one question by
   measuring on the device instead of arguing; this settles the rest.

   `localStorage` survives the kill. It is synchronous, so a value written
   before the process dies is on disk when the next page load reads it. That
   makes it possible to record what the page was doing right up to the moment
   it stopped, then read the tail back afterwards — the last entry IS the
   answer, and there is no other way to get it off the device.

   What it records, every HEARTBEAT_MS, is measured rather than assumed:

     · decoded image bytes — every <img> in the DOM, naturalWidth × naturalHeight
       × 4, summed. The real figure, not a prediction from `sizes` and an
       assumed pixel ratio, which is where the earlier numbers went wrong.
     · canvas backing stores — width × height × 4 of every <canvas>.
     · how many images exist, and how many have actually decoded.
     · scroll position, so a death can be tied to a place on the page.
     · elapsed milliseconds and a requestAnimationFrame counter. If frames stop
       advancing while the clock keeps running, the page froze before it died,
       which is a runaway loop and not memory at all — a distinction none of
       the earlier measurements could make.

   OFF unless `?bb=1` is in the URL. The flag is remembered in sessionStorage so
   it survives the crash and the reload after it, and every visitor without it
   pays one `sessionStorage.getItem`. */

const KEY = "vm-blackbox";
const FLAG = "vm-blackbox-on";
/* ── 400 ms WAS TOO COARSE: THE FIRST RUN RECORDED ONE ROW ─────────────────
   `start` was written and the first beat never arrived, which means the page
   died inside 400 ms of hydrating. That is already the single most useful
   fact this investigation has produced — it rules out anything gradual, and
   every image change made so far was aimed at something gradual — but one row
   cannot say WHICH operation was in flight.

   40 ms, driven off requestAnimationFrame rather than a timer, gives about ten
   samples in the window where it dies AND makes the frame counter meaningful:
   a beat that is late is a main thread that was blocked, and the gap says by
   how long. A timer cannot show that, because a blocked thread delays the
   timer too and the two are indistinguishable. */
const HEARTBEAT_MS = 40;
/** Enough tail to see the last few seconds; small enough to write cheaply. */
const MAX_ENTRIES = 120;

export type Entry = {
  /** ms since the recorder started */
  t: number;
  label: string;
  /** decoded image bytes across every <img> in the document */
  imgMB?: number;
  /** canvas backing stores */
  canvasMB?: number;
  /** images in DOM / of those, decoded */
  imgs?: string;
  scrollY?: number;
  /** rAF ticks since start — flat while the clock advances means a freeze */
  frames?: number;
  note?: string;
};

export function bbOn(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (new URLSearchParams(window.location.search).get("bb") === "1") {
      sessionStorage.setItem(FLAG, "1");
      return true;
    }
    return sessionStorage.getItem(FLAG) === "1";
  } catch {
    return false;
  }
}

/* Read once and cached, for two reasons. `useSyncExternalStore` requires a
   snapshot that is referentially stable or it re-renders forever, and this
   record is a single artefact of a single dead page — re-reading it as the
   reader scrolls would be meaningless anyway. */
const EMPTY: Entry[] = [];
let cached: Entry[] | null = null;
const noSubscribe = () => () => {};

/** The record of the page that died, safe to read during render. */
export function useFlightRecord(): Entry[] {
  return useSyncExternalStore(
    noSubscribe,
    () => (cached ??= bbRead()),
    () => EMPTY,
  );
}

export function bbRead(): Entry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as Entry[];
  } catch {
    return [];
  }
}

export function bbClear() {
  try {
    localStorage.removeItem(KEY);
    sessionStorage.removeItem(FLAG);
  } catch {}
  cached = EMPTY;
}

/** Live decoded-pixel accounting, straight off the DOM. */
function measure() {
  let bytes = 0,
    decoded = 0;
  const imgs = document.querySelectorAll("img");
  imgs.forEach((im) => {
    // naturalWidth is 0 until the bitmap exists, which is exactly the
    // distinction we want: bytes counts what has actually been decoded.
    if (im.naturalWidth > 0) {
      bytes += im.naturalWidth * im.naturalHeight * 4;
      decoded++;
    }
  });
  let cbytes = 0;
  document.querySelectorAll("canvas").forEach((c) => {
    cbytes += c.width * c.height * 4;
  });
  return {
    imgMB: +(bytes / 1048576).toFixed(1),
    canvasMB: +(cbytes / 1048576).toFixed(1),
    imgs: `${decoded}/${imgs.length}`,
  };
}

let started = false;
let t0 = 0;
let log: Entry[] = [];
let rafCount = 0;

function flush() {
  try {
    localStorage.setItem(KEY, JSON.stringify(log.slice(-MAX_ENTRIES)));
  } catch {}
}

/** Record a one-off event (hero mode chosen, a section revealed, …). */
export function bbMark(label: string, note?: string) {
  if (!started) return;
  log.push({ t: Math.round(performance.now() - t0), label, note, ...measure(), frames: rafCount });
  flush();
}

/**
 * Begins recording. Safe to call more than once; only the first starts it.
 * Returns a stop function for React cleanup.
 */
export function bbStart(): () => void {
  if (started || !bbOn()) return () => {};
  started = true;
  t0 = performance.now();
  log = [
    {
      t: 0,
      label: "start",
      note: `${innerWidth}x${innerHeight} dpr${devicePixelRatio}`,
      // The first run left this row's columns blank because it never measured.
      // The state at hydration is exactly what we most want to see.
      ...measure(),
      frames: 0,
    },
  ];
  flush();

  /* Beats ride requestAnimationFrame, not setInterval. A frame callback that
     arrives 300 ms after the last one is proof the main thread was blocked for
     300 ms; a setInterval that fires late is indistinguishable from one that
     was merely scheduled late. `gap` carries that number. */
  let raf = 0;
  let lastBeat = 0;
  let lastFrame = 0;
  const tick = () => {
    rafCount++;
    const now = performance.now() - t0;
    if (now - lastBeat >= HEARTBEAT_MS) {
      const gap = Math.round(now - lastFrame);
      log.push({
        t: Math.round(now),
        label: gap > 120 ? `STALL ${gap}ms` : "beat",
        scrollY: Math.round(window.scrollY),
        frames: rafCount,
        ...measure(),
      });
      flush();
      lastBeat = now;
    }
    lastFrame = now;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);

  return () => {
    cancelAnimationFrame(raf);
    started = false;
  };
}
