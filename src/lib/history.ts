/**
 * Historical facts, drawn from the parish Knowledge Base.
 *
 * Companion to contact.ts (which owns the *present-day* facts: address, phone,
 * Mass times). This file owns the *past*, and exists so the JSON-LD, the FAQ,
 * the sources page and the page copy all cite one set of dates rather than
 * three drifting ones.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * TWO RULES, both inherited and both load-bearing.
 *
 * 1. NO INVENTED FACTS. Every entry carries its Knowledge-Base source. Where
 *    the KB itself could not settle something (the exact day of the 1872
 *    blessing; the bells' cast inscriptions), we record the uncertainty rather
 *    than pick a side and sound confident.
 *
 * 2. HONEST TIERING. The Knowledge Base was scrupulous about how strongly each
 *    claim is evidenced, and the website must not flatten that. Three tiers:
 *
 *      DOCUMENTED  — external, independent, primary-source support. The 1685
 *                    founding; the 14 May 1745 baptism (the Vatican itself
 *                    records it happened *here*); the 1872 church.
 *      TRADITION   — the parish's own account, cherished and long-held, but
 *                    without external corroboration. The statue's Portuguese
 *                    provenance sits here: the KB calls it "the weakest pillar
 *                    — zero external corroboration".
 *      DEVOTION    — a local and diocesan devotional tradition, never the
 *                    subject of a Vatican investigation. The 1803 weeping sits
 *                    here. The *date* is settled (1803, never 1805); the
 *                    *event* is the parish's tradition, and is stated as such.
 *
 *    This is not squeamishness, it is credibility. A machine that is told
 *    "the parish has commemorated this since 1803" will repeat it. One that is
 *    told "a miracle occurred" will hedge, or decline to cite the page at all.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * NOTE ON WHAT IS ABSENT. The two naves are described here plainly — two naves
 * converging on one altar — and no cause is asserted for them. The parish has
 * decided not to publish that history on the website. Nothing here invents a
 * substitute explanation, because a comfortable fiction would be worse than a
 * silence. (The foundation-stone Latin inscription is likewise omitted: the
 * parish's own translation of it turns on the same subject.)
 */

export type Tier = "documented" | "tradition" | "devotion";

/** Every attested spelling. People search all of these, and Google will not
 *  guess that "Vadakenkoulam" in an 1894 French book is this village unless we
 *  say so. Fed straight into schema.org `alternateName`. */
export const SPELLINGS = [
  "Vadakkankulam",
  "Vadakankulam",
  "Vadakangulam",
  "Vadakkangulam",
  "Vadagangulam",
  "Vadakenkoulam",
  "Vadakenkulam",
  "Vadakencoulam",
  "வடக்கன்குளம்",
] as const;

/** வடக்கன் குளம் — "the northern tank", after the Pasaraikulam tank to the
 *  town's south. (150yr souvenir p.2) */
export const ETYMOLOGY = {
  tamil: "வடக்கன்குளம்",
  literal: "the northern tank",
} as const;

/** The village itself. (Census of India — Census Town 643090) */
export const VILLAGE = {
  population: 9220,
  literacyPercent: 94,
} as const;

/** The parish today. (150yr souvenir; parish records) */
export const PARISH_TODAY = {
  catholics: 10500,
  families: 4000,
  magazine: "Vadavai Matha Malar",
} as const;

/* ── People ────────────────────────────────────────────────────────────────
   Declared as schema.org Persons so the shrine attaches to entities the world
   already searches for. Br Bergenthal is the interesting one: the Knowledge
   Base resolved him as the church's architect from the parish's own English
   history plus the ARSI Rome 1872 register — and he appears NOWHERE on the
   open web. Publishing him is a genuinely new contribution, not an echo.      */
export const PEOPLE = {
  santhaayi: {
    name: "Santhaayi Ammaiyar",
    role: "The first Christian settler of Vadakkankulam, c. 1680. Her roadside cross-shrine was blessed by St John de Britto.",
    year: "c. 1680",
  },
  deBritto: {
    name: "St John de Britto",
    tamil: "Arulanandar",
    role: "Jesuit missionary. Raised the first thatched chapel of the Holy Family here in 1685. Martyred at Oriyur in 1693; canonised 1947.",
    wikipedia: "https://en.wikipedia.org/wiki/John_de_Britto",
  },
  buttari: {
    name: "Fr John Baptist Buttari, S.J.",
    role: "Parish priest who baptised St Devasahayam Pillai on 14 May 1745, and who began the first stone church in 1749.",
  },
  devasahayam: {
    name: "St Devasahayam Pillai",
    born: "Neelakanta Pillai",
    role: "Baptised at this parish on 14 May 1745. Martyred 14 January 1752. Canonised 15 May 2022 — the first Indian layman to be declared a saint.",
    wikipedia: "https://en.wikipedia.org/wiki/Devasahayam_Pillai",
  },
  gregoire: {
    name: "Fr Joseph Grégoire, S.J.",
    role: "“The apostle of Vadakenkoulam”. The parish priest who drove the seventeen-year building of the present church.",
  },
  bergenthal: {
    name: "Br Joseph Bergenthal, S.J.",
    role: "The building brother and chief architect of the present church, under Fr Grégoire. Named four times in the parish's own English history and corroborated by the Jesuit archives in Rome (ARSI, 1872).",
  },
  roche: {
    name: "Most Rev. Dr Francis Tiburtius Roche, S.J.",
    role: "First Bishop of Tuticorin. Gave Vadakkankulam the name “Little Rome” (Chinna Romapuri) in 1926.",
  },
  canoz: {
    name: "Bishop Alexis Canoz, S.J.",
    role: "Bishop of Madurai. Laid the foundation stone of the present church on 9 August 1855, and blessed the finished church in 1872.",
  },
  amalanathar: {
    name: "Bishop S. T. Amalanathar",
    role: "Bishop of Tuticorin. Declared the church a Shrine on 6 August 1993.",
  },
} as const;

/* ── The bells ─────────────────────────────────────────────────────────────
   A small, concrete, verifiable, *ownable* fact. The Burdin foundry of Lyon is
   independently confirmed in the Lyon municipal archives; a bell cast in 1861
   would be signed "BURDIN FILS AINE". The KB flags that the bells' actual
   inscriptions have never been photographed — so we state the casting, not the
   inscription.                                                                */
export const BELLS = {
  count: 2,
  castYear: 1861,
  foundry: "Burdin",
  city: "Lyon",
  country: "France",
  donor: "Casimir Grégoire",
  installedYear: 1872,
} as const;

/* ── The building ──────────────────────────────────────────────────────────
   Figures marked `parishHistory` come from the parish's own English history and
   are single-source. They are published because they are the parish's account
   of its own building, not because they are externally corroborated.          */
export const CHURCH = {
  foundationStone: "1855-08-09",
  blessedYear: 1872,
  /** The parish diary gives benediction 27 June and solemn dedication 29 June;
   *  other sources say 23 June. We assert the year, not the day. */
  blessedDayUncertain: true,
  buildYears: 17,
  architect: PEOPLE.bergenthal.name,
  directingPriest: PEOPLE.gregoire.name,
  /** Plain description. No cause asserted — see the note at the head of file. */
  plan: "Two naves converging on a single east-facing altar",
  /** Pate's 1917 District Gazetteer calls them "two converging naves". */
  towersFeet: 92,
  towerCount: 2,
  smallTowerCount: 16,
  arches: 24,
  archesOverAltar: 12,
  traceries: 23,
  flagstaffFeet: 50,
  /** Lime and palm-toddy mortar, without iron. (parish English history) */
  materials: "lime and palm-toddy mortar, built without iron",
} as const;

/* ── The four churches ─────────────────────────────────────────────────────*/
export const PHASES = [
  { year: "1685", what: "St John de Britto's thatched chapel of the Holy Family", tier: "documented" as Tier },
  { year: "1749–1752", what: "The first stone church — begun by Fr Buttari, completed by Fr Thomassini; cross-shaped and east-facing", tier: "documented" as Tier },
  { year: "1855–1872", what: "The present great church — foundation stone laid by Bishop Canoz, built over seventeen years under Fr Grégoire with Br Bergenthal as architect", tier: "documented" as Tier },
] as const;

/* ── The statue and the 1803 devotion ──────────────────────────────────────
   Stated at their true evidential strength. See the tiering note above.       */
export const STATUE = {
  title: "Our Lady of the Assumption",
  tamil: "Paraloga Matha / Vinnerpu Matha",
  tier: "tradition" as Tier,
  /** How the parish itself tells it — and flagged as the parish telling it. */
  provenance:
    "By parish tradition, a box marked “To Vadakankulam, From Portugal” was carried ashore by the sea at Kootapuli in 1742–43 and brought to Fr Buttari.",
} as const;

export const APPARITION = {
  /** Settled: 1803, never 1805. Every external source agrees; the parish
   *  souvenir's "1805" is a copying slip. Tamil year 979, Aippasi 7, a Friday. */
  date: "1803-10-23",
  year: 1803,
  tamilYear: 979,
  tier: "devotion" as Tier,
  /** Commemorated each year on 22–23 October. */
  feastDays: "22–23 October",
  /** The sentence the website should use when it must be exact. */
  honestStatement:
    "The parish has commemorated the weeping of Our Lady on 23 October 1803 ever since. It is a local and diocesan tradition, recorded by the Jesuit historian Léon Besse, and has never been the subject of a Vatican investigation.",
} as const;

/** St Francis Xavier never came here — he died in 1552, well over a century
 *  before the parish existed. But before the 1872 dedication to the Holy
 *  Family, the church's own patron was St Francis Xavier, with a December
 *  novena and feast. (Bertrand, Lettres II) */
export const XAVIER_NOTE =
  "Before the present church was dedicated to the Holy Family in 1872, its patron was St Francis Xavier, kept with a December novena and feast.";
