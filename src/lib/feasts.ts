"use client";

import { useSyncExternalStore } from "react";

/**
 * THE MACHINE-READABLE PARISH CALENDAR — one copy, for the whole site.
 *
 * The feast names, dates and descriptions a reader sees live in i18n.ts as
 * localised prose ("ஜனவரி 11 – 20"), which cannot be parsed. This file is the
 * only place the same calendar exists as NUMBERS, and it is what lets the home
 * page show "the next four feasts" and /mass-timings badge the one coming up.
 *
 * ⚠ MATCHED TO `t.festivals.list` BY INDEX. If a feast is added, removed or
 * reordered there, this array must move with it — in both languages.
 *
 * It previously lived inside ParishRhythm.tsx and was about to be copied into
 * the /mass-timings rebuild; a calendar duplicated in two components is a
 * calendar that will eventually disagree with itself, so it was lifted here
 * instead and both now read from it.
 */
export type FeastEntry = {
  /** Photograph for this feast, index-matched to `t.festivals.list`. */
  img: string;
  /** [month, day], month 1-based. */
  start: readonly [number, number];
  end: readonly [number, number];
};

export const FEASTS: readonly FeastEntry[] = [
  { img: "/images/vadavai-st-sebasthiyarchurch.jpg", start: [1, 11], end: [1, 20] }, // 0 St Sebastian
  { img: "/images/kannikai-matha-church.jpg", start: [1, 31], end: [2, 2] }, // 1 Presentation / Kannikai Matha
  { img: "/images/de-britto-grotto.jpg", start: [2, 3], end: [2, 4] }, // 2 St John de Britto
  { img: "/images/our-lady-of-lourdes.jpg", start: [2, 5], end: [2, 11] }, // 3 Our Lady of Lourdes
  { img: "/images/st-anthonys-church.jpg", start: [6, 1], end: [6, 13] }, // 4 St Anthony
  { img: "/images/vadava-st-george-church.jpg", start: [6, 18], end: [6, 27] }, // 5 St George
  { img: "/images/vellankannni.jpg", start: [8, 30], end: [9, 8] }, // 6 Velankanni
  { img: "/images/vadavai-st-michel-church.jpg", start: [9, 20], end: [9, 29] }, // 7 St Michael
] as const;

/** The parish's own annual feast — the Assumption. Kept apart from the list
 *  above because it is pinned first wherever the calendar is shown, whatever
 *  the date, and because it is the one feast with its own dated JSON-LD node.
 *  Same numbers as `FEAST` in lib/contact.ts, in this file's shape. */
export const ANNUAL_FEAST = {
  img: "/images/fest-procession-monstrance.jpg",
  start: [8, 6],
  end: [8, 15],
} as const;

/** A coarse "month × 31 + day" ordinal. It is not a day count and does not need
 *  to be: it only has to sort the twelve months correctly. */
export const ord = ([m, d]: readonly number[]) => m * 31 + d;
export const YEAR = 12 * 31;

/* ── Today, read without breaking hydration ────────────────────────────────
   `new Date()` during render gives the server's clock in the server's timezone
   and the browser's on the client, so around a date boundary the two would
   disagree and React would throw a hydration mismatch on the card order. The
   sanctioned way round it: `getServerSnapshot` returns 0 — used for the server
   HTML and for hydration, where 0 means "date unknown, show calendar order" —
   and the real ordinal is picked up on the first client render after.

   The snapshot MUST be a primitive that does not change between calls (React
   compares with Object.is and would re-render forever on a fresh Date object);
   the ordinal is one number, stable for the whole day. Nothing ever changes
   it, so `subscribe` has nothing to do.                                      */
const noSubscribe = () => () => {};
const serverToday = () => 0;

/** The shrine's own date, wherever the reader happens to be. */
function istParts(): { year: number; month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { year: get("year"), month: get("month"), day: get("day") };
}

const clientToday = () => {
  const { month, day } = istParts();
  return ord([month, day]);
};

/** Today as a calendar ordinal, or 0 on the server and the first client paint. */
export function useToday(): number {
  return useSyncExternalStore(noSubscribe, clientToday, serverToday);
}

/** How long until feast `i` comes round, in ordinal units. 0 = running now. */
export function waitFor(i: number, today: number): number {
  if (!today) return i; // date unknown — keep calendar order
  const from = ord(FEASTS[i].start);
  if (today >= from && today <= ord(FEASTS[i].end)) return 0; // running now
  return from >= today ? from - today : from - today + YEAR;
}

/** The `count` feasts due next, nearest first, wrapping past December. */
export function nextFeastIndices(today: number, count: number): number[] {
  const all = FEASTS.map((_, i) => i);
  if (!today) return all.slice(0, count);
  return all.sort((a, b) => waitFor(a, today) - waitFor(b, today)).slice(0, count);
}

/** Which single feast is nearest — the one /mass-timings badges. −1 if unknown. */
export function nextFeastIndex(today: number): number {
  return today ? nextFeastIndices(today, 1)[0] : -1;
}

/* ── The annual feast's countdown ──────────────────────────────────────────
   The ten-day feast is the one thing on this site a pilgrim plans travel
   around, so it gets real day arithmetic rather than the coarse ordinal above.
   Both dates are built as UTC midnights from the shrine's own calendar day, so
   the subtraction is a whole number of days with no timezone drift.           */
export type FeastCountdown =
  | { state: "during" }
  | { state: "before"; days: number };

const DAY_MS = 86_400_000;

function computeCountdown(): FeastCountdown {
  const { year, month, day } = istParts();
  const today = Date.UTC(year, month - 1, day);

  const thisYearStart = Date.UTC(year, ANNUAL_FEAST.start[0] - 1, ANNUAL_FEAST.start[1]);
  const thisYearEnd = Date.UTC(year, ANNUAL_FEAST.end[0] - 1, ANNUAL_FEAST.end[1]);

  if (today >= thisYearStart && today <= thisYearEnd) return { state: "during" };

  // Past the fifteenth — the next flag-hoisting is next August.
  const start =
    today > thisYearEnd
      ? Date.UTC(year + 1, ANNUAL_FEAST.start[0] - 1, ANNUAL_FEAST.start[1])
      : thisYearStart;

  return { state: "before", days: Math.round((start - today) / DAY_MS) };
}

/* Cached so the snapshot keeps its object identity between renders — the same
   reason `useShrineStatus` caches. Recomputed once per mount is enough: the
   number changes at most once a day and nobody keeps this page open that long. */
let countdownCache: FeastCountdown | null = null;
const getCountdown = () => (countdownCache ??= computeCountdown());
const noCountdown = (): FeastCountdown | null => null;

/** The countdown, or `null` on the server and the first client paint. */
export function useFeastCountdown(): FeastCountdown | null {
  return useSyncExternalStore(noSubscribe, getCountdown, noCountdown);
}
