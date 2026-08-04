"use client";

import { useSyncExternalStore } from "react";

/* ── READING BACK THE FLIGHT RECORDER ──────────────────────────────────────
   The recorder itself is an inline script in <head> — see
   components/BlackboxScript.tsx for why it cannot be a React effect. This
   module is the React side of it: the marks components emit, and the reader
   /diagnostics uses.

   When WebKit kills a page there is no console, no error handler and no unload
   event; the process holding all of them is the one that died. `localStorage`
   is synchronous, so whatever was written before the kill is on disk for the
   next page load to read. That is the only way to get anything off the device.

   OFF unless `?bb=1` is in the URL, remembered in sessionStorage so it
   survives the crash and the reload after it. Delete with lib/probe.ts and
   /diagnostics once the cause is settled. */

const KEY = "vm-blackbox";
const FLAG = "vm-blackbox-on";

export type Entry = {
  /** ms since the document started parsing */
  t: number;
  label: string;
  /** decoded image bytes across every <img> — measured, not predicted */
  imgMB?: number;
  /** canvas backing stores */
  canvasMB?: number;
  /** images decoded / images in the DOM */
  imgs?: string;
  /** elements in the document, so DOM growth is visible */
  el?: number;
  scrollY?: number;
  /** rAF ticks. Flat while `t` climbs means the main thread was blocked. */
  frames?: number;
  note?: string;
};

/* Read once and cached: `useSyncExternalStore` needs a referentially stable
   snapshot or it re-renders forever, and this is a single artefact of a single
   dead page — re-reading it as the reader scrolls would mean nothing. */
const EMPTY: Entry[] = [];
let cached: Entry[] | null = null;
let cachedPrev: Entry[] | null = null;
const noSubscribe = () => () => {};

/** The record of the page that died, safe to read during render. */
export function useFlightRecord(): Entry[] {
  return useSyncExternalStore(
    noSubscribe,
    () => (cached ??= bbRead()),
    () => EMPTY,
  );
}

/** The run before it, kept so one stray page load cannot lose the evidence. */
export function usePrevFlightRecord(): Entry[] {
  return useSyncExternalStore(
    noSubscribe,
    () => (cachedPrev ??= bbReadPrev()),
    () => EMPTY,
  );
}

function readKey(k: string): Entry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(k) || "[]") as Entry[];
  } catch {
    return [];
  }
}

export function bbRead(): Entry[] {
  return readKey(KEY);
}

/** The run before the current one — see the rotation note in BlackboxScript. */
export function bbReadPrev(): Entry[] {
  return readKey(`${KEY}-prev`);
}

export function bbClear() {
  try {
    localStorage.removeItem(KEY);
    localStorage.removeItem(`${KEY}-prev`);
    sessionStorage.removeItem(FLAG);
  } catch {}
  cached = EMPTY;
  cachedPrev = EMPTY;
}

/**
 * Record a one-off event — a hero path chosen, a buffer allocated.
 *
 * Forwarded to the inline recorder, which has been running since <head> and is
 * therefore already listening whenever a component calls this. A no-op when
 * the recorder is off, which is every visitor without `?bb=1`.
 */
export function bbMark(label: string, note?: string) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { __bb?: (l: string, n?: string) => void };
  w.__bb?.(label, note);
}

/**
 * Marks the hydration boundary and nothing else — the timeline belongs to the
 * inline recorder now. Kept as a function so SmoothScroll's call site reads
 * the same, and because the row itself is worth having: everything above it in
 * the record happened before React existed.
 */
export function bbStart(): () => void {
  bbMark("REACT hydrated");
  return () => {};
}
