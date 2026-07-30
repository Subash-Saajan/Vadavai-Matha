"use client";

import { useSyncExternalStore } from "react";

/**
 * THE WALL CLOCK IN VADAKKANKULAM, wherever the reader happens to be.
 *
 * `useShrineStatus` (components/contact) answers "is Mass being said"; this
 * answers the two rawer questions /mass-timings needs — what minute of the day
 * is it, and what weekday. `Intl` gives us the shrine's own time without
 * shipping a timezone library.
 *
 * Both are external stores rather than state-in-an-effect, for the reasons set
 * out at length in useShrineStatus: the server snapshot is `null`, so the HTML
 * carries no clock and hydration cannot mismatch; the snapshot keeps its
 * identity between ticks, so nothing re-renders needlessly; and one interval is
 * shared however many components read it.
 *
 * ⚠ CALLERS MUST RENDER SOMETHING SENSIBLE FOR `null`. It is not an error
 * state — it is every server render and the first client paint.
 */

type Reading = { minutes: number; weekday: number };

function read(): Reading {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // `hour: "2-digit"` with hour12:false yields "24" at midnight in some engines.
  const hour = Number(get("hour")) % 24;

  return {
    minutes: hour * 60 + Number(get("minute")),
    weekday: days.indexOf(get("weekday")),
  };
}

let cache: Reading | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function recompute(): void {
  const next = read();
  if (cache && cache.minutes === next.minutes && cache.weekday === next.weekday) return;
  cache = next;
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void): () => void {
  recompute();
  listeners.add(onChange);
  timer ??= setInterval(recompute, 30_000);
  return () => {
    listeners.delete(onChange);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

const getSnapshot = () => cache;
const getServerSnapshot = (): Reading | null => null;

function useReading(): Reading | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Minutes past midnight at the shrine, or `null` before the clock is read. */
export function useIstMinutes(): number | null {
  return useReading()?.minutes ?? null;
}

/** 0 = Sunday … 6 = Saturday at the shrine, or `null` before the clock is read. */
export function useIstWeekday(): number | null {
  return useReading()?.weekday ?? null;
}
