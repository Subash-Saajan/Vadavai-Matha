/**
 * SINGLE SOURCE OF TRUTH for every real-world fact about the shrine.
 *
 * The page, the JSON-LD, the Footer, llms.txt and the sitemap all read from
 * here. NAP (name / address / phone) drift across surfaces is the main reason
 * a place fails to consolidate into one entity in Google's Knowledge Graph and
 * in AI answers — so nothing below may be restated by hand anywhere else.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * RULE: every value here is VERIFIED against a cited source, or it does not
 * exist. Nothing is a placeholder. If the parish has not published it, it is
 * absent and the UI that would show it is gated off (see `config`).
 * ─────────────────────────────────────────────────────────────────────────
 */

/** Verified: OpenStreetMap node 8790034246 ("Holy Family Church, East St,
 *  Vadakkankulam"), cross-checked against the village centroid ~1.2 km NW. */
export const GEO = { lat: 8.2586167, lng: 77.6074224 } as const;

/** Verified: Thoothukudi diocese parish page + catholicchurches.in directory.
 *  Distinct from the religious houses' lines (see `religiousHouses`). */
export const PHONE = {
  /** As a Tamil Nadu caller would dial it. */
  display: "04637 230134",
  /** E.164, for tel: links and schema.org `telephone`. */
  e164: "+914637230134",
  /** Human-readable international form. */
  international: "+91 4637 230134",
} as const;

export const ADDRESS = {
  name: "Holy Family Shrine",
  /** The dedication; the Marian title under which she is venerated here. */
  patroness: "Our Lady of the Assumption",
  street: "East Street",
  locality: "Vadakkankulam",
  taluk: "Radhapuram",
  district: "Tirunelveli",
  region: "Tamil Nadu",
  postalCode: "627116",
  country: "India",
  countryCode: "IN",
  /** One canonical single-line form. Never retype this. */
  oneLine:
    "Holy Family Shrine, East Street, Vadakkankulam, Radhapuram Taluk, Tirunelveli District, Tamil Nadu 627116, India",
} as const;

/** Names this entity is known by. Order matters: `alternateName` in JSON-LD —
 *  and it is how Google learns that a search for "Paraloga Matha" or "Vadavai
 *  Matha" is a search for THIS place. The Marian devotional titles were only in
 *  prose before; naming them here is what lets the shrine actually rank for
 *  them. Vinnerpu Matha / Paraloga Matha both = "Our Lady of Heaven / of the
 *  Assumption", the title under which she is venerated here. */
export const ALIASES = [
  "Vadavai Matha",
  "Vadakankulam Matha",
  "Paraloga Matha",
  "Vinnerpu Matha",
  "Our Lady of Heaven",
  "Our Lady of the Assumption Shrine",
  "Our Lady of the Assumption, Vadakkankulam",
  "Chinna Romapuri",
  "Little Rome",
  "Holy Family Church",
] as const;

export const SITE_URL = process.env.SITE_URL ?? "https://littlerome.net";

/* ── Map deep links ────────────────────────────────────────────────────────
   VERIFIED 2026-07-12: the shrine's Google Business Profile does exist —
   "Holy Family Shrine Vadakkankulam", 4.8★ / 49 reviews, category "Catholic
   church". Its CID (the stable numeric id of the Google Maps place) is below.

   This matters far more than a convenience link. `google` and `SAME_AS` now
   point at the *entity itself* rather than at a coordinate search, which is
   the join Google needs to fuse three things it currently sees as separate:
   this website, the Maps place, and the Knowledge Graph node. Same reason it
   is in `sameAs` — that property is precisely "here is this thing, elsewhere".
   The listing is presently UNCLAIMED; claiming it does not change the CID.    */
const q = `${GEO.lat},${GEO.lng}`;

/** Stable Google Maps place id. Hex 0x65ae384d3c5bfb34 → decimal. */
export const GBP_CID = "7326855548154673972" as const;

export const MAP_LINKS = {
  /** The verified place card itself — not a coordinate search. */
  google: `https://maps.google.com/?cid=${GBP_CID}`,
  /** Opens turn-by-turn directions from the user's current location. */
  googleDirections: `https://www.google.com/maps/dir/?api=1&destination=${q}`,
  /** Apple Maps honours `daddr` for directions and `q` for the pin label. */
  apple: `https://maps.apple.com/?daddr=${q}&q=${encodeURIComponent(ADDRESS.name)}`,
  /** OpenStreetMap — the source of our coordinate, and a keyless fallback. */
  osm: `https://www.openstreetmap.org/node/8790034246`,
} as const;

/** Opening zoom for the map. A regional level (~district-wide) so the shrine's
 *  place in the far south is legible at a glance — Tirunelveli to the north and
 *  Nagercoil to the south both sit in frame, rather than opening at street
 *  level where only the village shows.
 *
 *  The map is rendered by us (MapLibre + OpenFreeMap tiles), not by a Google
 *  iframe: the Embed API forces "cooperative" gestures — the "use ctrl +
 *  scroll to zoom" bar — and offers no way to turn it off. See InteractiveMap. */
export const MAP_ZOOM = 10;

/* ── Worship schedule ──────────────────────────────────────────────────────
   Drives both the live "is the shrine open" status and the JSON-LD
   openingHoursSpecification. 24h "HH:MM" in Asia/Kolkata.                    */
export const SCHEDULE = {
  /** Monday–Saturday. */
  weekdayMass: ["05:00", "06:10"],
  /** Sunday. */
  sundayMass: ["05:00", "07:00", "09:30"],
  /** How long we consider a Mass to be in progress, for the live status. */
  massDurationMins: 45,
  /** Eucharistic adoration chapel, daily. The only hours we can assert. */
  chapel: { open: "09:00", close: "20:00" },
  /** Evening devotions, daily. Sundays begin earlier. */
  devotions: { rosary: "18:30", benediction: "19:00", sundayStart: "17:30" },
} as const;

/** The ten-day annual feast: flag-hoisting (kodiyetram) on 6 August through
 *  the Assumption on 15 August, when the chariot procession draws ~100,000. */
export const FEAST = { startMonth: 8, startDay: 6, endMonth: 8, endDay: 15 } as const;

/* ── Travel ────────────────────────────────────────────────────────────────
   Distances road-routed from the church coordinate and rounded. Station codes
   are Indian Railways'. Bus route numbers are deliberately absent: the parish
   has not published them and we will not guess.                              */
export const TRAVEL = {
  rail: [
    { name: "North Panakudi", code: "NPK", km: 15 },
    { name: "Valliyur", code: "VLY", km: 20 },
    { name: "Nagercoil Junction", code: "NCJ", km: 26 },
    { name: "Tirunelveli Junction", code: "TEN", km: 66 },
  ],
  road: [
    { name: "Nagercoil", km: 26, mins: 30 },
    { name: "Kanyakumari", km: 27, mins: 35 },
    { name: "Tirunelveli", km: 66, mins: 51 },
  ],
  air: [
    { name: "Thiruvananthapuram (TRV)", km: 95, mins: 120, note: "nearest international" },
    { name: "Thoothukudi (TCR)", km: 97, mins: 75, note: "nearest domestic" },
    { name: "Madurai (IXM)", km: 230, mins: 180, note: "" },
  ],
  highway: "NH-44",
} as const;

/* ── Who to call ───────────────────────────────────────────────────────────
   The religious houses are NOT the parish office. Labelling them clearly
   prevents mis-dials and keeps the parish's NAP unambiguous.                 */
export const PARISH_PRIEST = "Rev. Fr. Joseph Christian A." as const;

export const RELIGIOUS_HOUSES = [
  { name: "Rosarians House · Fatima Giri Ashram", phone: "04637 230180", e164: "+914637230180" },
  { name: "Servite Convent", phone: "04637 230176", e164: "+914637230176" },
  { name: "Bethany Convent", phone: "04637 230122", e164: "+914637230122" },
] as const;

export const DIOCESE = {
  name: "Diocese of Thoothukudi",
  address: "Bishop's House, 82 G.C. Road, Thoothukudi 628001",
  phone: "0461 2320035",
  e164: "+914612320035",
  contactUrl: "https://tuticorindiocese.org/contactus.htm",
  parishUrl: "https://tuticorindiocese.org/parish-vadakankulam-holy-family.htm",
} as const;

/** Every other place on the web that IS this same thing. Google and the AI
 *  crawlers use `sameAs` to reconcile duplicates into one entity, so the Maps
 *  place belongs here — it is the strongest of the three. */
export const SAME_AS = [
  MAP_LINKS.google,
  "https://en.wikipedia.org/wiki/Vadakkankulam",
  DIOCESE.parishUrl,
  MAP_LINKS.osm,
] as const;

/* ── Why a visitor is here ─────────────────────────────────────────────────
   Stable ids. Labels live in i18n so they translate; the id never does.      */
export const PURPOSES = [
  "visit",
  "mass-intention",
  "sacrament",
  "certificate",
  "sick-call",
  "offering",
  "other",
] as const;
export type Purpose = (typeof PURPOSES)[number];

/** A sick call is time-critical. It dials; it never opens a form. */
export const URGENT_PURPOSE: Purpose = "sick-call";
/** These jobs scroll somewhere instead of writing a message. */
export const NON_FORM_PURPOSES: readonly Purpose[] = ["visit", "sick-call", "offering"];

/* ── Gates for facts the parish has not published ──────────────────────────
   Referenced as full literals so Next can inline them at build time.
   Unset = the corresponding UI does not render at all. Nothing is faked.     */
export const config = {
  /** Digits, international, no "+". The verified 04637 line is a landline and
   *  cannot run WhatsApp, so this stays unset until the parish supplies one. */
  whatsapp: process.env.NEXT_PUBLIC_PARISH_WHATSAPP || "",
  /** A UPI VPA such as "parish@okaxis". Unset = offerings are in person. */
  upiVpa: process.env.NEXT_PUBLIC_PARISH_UPI_VPA || "",
  /** Optional. Without it the form skips the captcha entirely. */
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "",
} as const;

export const hasWhatsApp = config.whatsapp.length > 0;
export const hasUpi = config.upiVpa.length > 0;

/** Pre-fills the chat so the parish sees why someone is writing. */
export function whatsAppLink(message?: string): string {
  const base = `https://wa.me/${config.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function upiLink(): string {
  const params = new URLSearchParams({
    pa: config.upiVpa,
    pn: ADDRESS.name,
    cu: "INR",
  });
  return `upi://pay?${params.toString()}`;
}
