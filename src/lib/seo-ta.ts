import type { RouteKey } from "./seo";

/**
 * Tamil search copy, one entry per route.
 *
 * Kept out of `seo.ts` so the English table stays readable, and typed as a
 * Partial on purpose: any route without an entry simply falls back to the
 * English copy (see `routeCopy`). A missing translation degrades to English —
 * it can never produce a blank <title>.
 *
 * Same rule as the English table: NO INVENTED FACTS. Every claim here — 1685,
 * the two naves, the 6–15 August feast, the 1926 "Little Rome" title, the 1745
 * baptism — is one the shrine has published. Terminology follows
 * .claude/skills/tamil-localize/reference/glossary.md (village = வடக்கன்குளம்,
 * Our Lady's lead title = பரலோக மாதா, Little Rome = சின்ன ரோமாபுரி).
 */
export type RouteCopy = {
  title: string;
  fullTitle: string;
  description: string;
  crumb: string;
};

export const ROUTES_TA: Partial<Record<RouteKey, RouteCopy>> = {};
