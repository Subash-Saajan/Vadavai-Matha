"use client";

import { useSyncExternalStore } from "react";
import { SCHEDULE } from "@/lib/contact";

export type ShrineState = "mass" | "open" | "closed";

export type ShrineStatus = {
  state: ShrineState;
  /** Minutes until the next Mass begins. */
  minsToNextMass: number;
  /** "05:00" — raw, so the caller can render it in the reader's language. */
  nextMassAt: string;
  /** True when the next Mass is tomorrow morning rather than later today. */
  nextMassIsTomorrow: boolean;
};

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

/**
 * The wall clock in Vadakkankulam, wherever the visitor happens to be.
 * `Intl` gives us the shrine's local time without shipping a timezone library.
 */
function nowInIST(): { weekday: number; minutes: number } {
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
    weekday: days.indexOf(get("weekday")),
    minutes: hour * 60 + Number(get("minute")),
  };
}

function compute(): ShrineStatus {
  const { weekday, minutes } = nowInIST();
  const isSunday = weekday === 0;
  const masses = (isSunday ? SCHEDULE.sundayMass : SCHEDULE.weekdayMass).map(toMinutes);

  const inMass = masses.some(
    (start) => minutes >= start && minutes < start + SCHEDULE.massDurationMins,
  );

  const chapelOpen =
    minutes >= toMinutes(SCHEDULE.chapel.open) && minutes < toMinutes(SCHEDULE.chapel.close);

  const upcoming = masses.find((start) => start > minutes);
  const nextMassIsTomorrow = upcoming === undefined;

  // Tomorrow's first Mass is at 5:00 either way, but a Saturday night rolls
  // into the Sunday schedule.
  const tomorrowIsSunday = (weekday + 1) % 7 === 0;
  const tomorrowFirst = toMinutes(
    (tomorrowIsSunday ? SCHEDULE.sundayMass : SCHEDULE.weekdayMass)[0],
  );

  const nextStart = upcoming ?? tomorrowFirst;
  const minsToNextMass = nextMassIsTomorrow
    ? 24 * 60 - minutes + nextStart
    : nextStart - minutes;

  const hhmm = `${String(Math.floor(nextStart / 60)).padStart(2, "0")}:${String(
    nextStart % 60,
  ).padStart(2, "0")}`;

  return {
    state: inMass ? "mass" : chapelOpen ? "open" : "closed",
    minsToNextMass,
    nextMassAt: hhmm,
    nextMassIsTomorrow,
  };
}

/* ── The clock, as an external store ───────────────────────────────────────
   Time is not React state; it is a system outside React that changes on its
   own. Modelling it with `useSyncExternalStore` rather than setState-in-effect
   gets us three things: the server snapshot is `null`, so SSR emits a neutral
   placeholder and hydration cannot mismatch; the snapshot is referentially
   stable between ticks, so nothing re-renders needlessly; and one interval is
   shared however many components read the status.                            */

let cache: ShrineStatus | null = null;
let cacheKey = "";
let timer: ReturnType<typeof setInterval> | null = null;
const listeners = new Set<() => void>();

function recompute(): void {
  const next = compute();
  const key = `${next.state}|${next.minsToNextMass}`;
  if (key === cacheKey) return; // same minute-ish; keep the old object identity
  cacheKey = key;
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
/** During SSR there is no "now" worth baking into the HTML. */
const getServerSnapshot = (): ShrineStatus | null => null;

/**
 * The shrine's status, or `null` on the server and for the first client paint.
 *
 * Callers must render a neutral placeholder for `null`. The same hours also
 * appear as plain text further down the page, so a visitor with JavaScript
 * disabled still learns when Mass is said.
 */
export function useShrineStatus(): ShrineStatus | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
