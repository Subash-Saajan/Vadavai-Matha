import type { Lang } from "./i18n";

/**
 * Clock times, written the way each language writes them.
 *
 * `Intl.DateTimeFormat` is not usable here: `ta-IN` renders the day period as
 * Latin "AM"/"PM", and `en-IN` lowercases it to "am". Neither matches this
 * site — English sets "5:00 AM", and Tamil puts the period *first*, as the
 * hand-written strings in i18n.ts already do ("காலை 5:00", "இரவு 8:00").
 *
 * Tamil period boundaries are chosen to agree with those existing strings:
 * evening (மாலை) runs to 8 PM, so Benediction at 19:00 reads "மாலை 7:00" and
 * the chapel closing at 20:00 reads "இரவு 8:00".
 */

const TAMIL_PERIODS = [
  [12, "காலை"], // morning
  [16, "மதியம்"], // midday
  [20, "மாலை"], // evening
  [24, "இரவு"], // night
] as const;

/** "05:00" → "5:00 AM" | "காலை 5:00" */
export function formatClock(hhmm: string, lang: Lang): string {
  const [h, m] = hhmm.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const minutes = String(m).padStart(2, "0");

  if (lang === "ta") {
    const period = TAMIL_PERIODS.find(([limit]) => h < limit)?.[1] ?? TAMIL_PERIODS[3][1];
    return `${period} ${hour12}:${minutes}`;
  }
  return `${hour12}:${minutes} ${h < 12 ? "AM" : "PM"}`;
}

/** Join a list of times: "5:00 AM · 6:10 AM" */
export function formatClockList(times: readonly string[], lang: Lang): string {
  return times.map((t) => formatClock(t, lang)).join(" · ");
}

export type GapUnits = { hour: string; minute: string; sep: string };

/**
 * A duration, in the units of the reader's language.
 * English abuts the unit ("2h 10m"); Tamil spaces it ("2 மணி 10 நிமிடம்").
 */
export function formatGap(totalMinutes: number, units: GapUnits): string {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const part = (n: number, unit: string) => `${n}${units.sep}${unit}`;

  if (h === 0) return part(m, units.minute);
  if (m === 0) return part(h, units.hour);
  return `${part(h, units.hour)} ${part(m, units.minute)}`;
}
