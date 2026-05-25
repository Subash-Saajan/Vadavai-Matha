// Curated devotional imagery — warm, intimate Catholic close-ups.
// We avoid European gothic architecture (cathedral vaults, basilicas, spires)
// and lean into universal devotional themes — candles, rosary, hands, sunlit
// sanctuaries, flowers — so the imagery reads as warmly Catholic without
// importing the wrong regional aesthetic for a Tamil Nadu parish.
//
// All photo IDs verified to return HTTP 200. Replace with real local photos
// of Vadakankulam in `/public/images/` when available.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // ── Atmospheric backdrops ──
  candlesBg: u("1518562180175-34a163b1a9a6"),       // warm candles in darkness
  stainedGlass: u("1473177104440-ffee2f376098"),    // coloured light through glass
  sunlightInterior: u("1438032005730-c779502df39b"),// sunlit sanctuary

  // ── Devotional close-ups (universal Catholic) ──
  candleLight: u("1507692049790-de58290a4334"),     // single candle
  candlesLit: u("1542652694-40abf526446e"),         // cluster of lit candles
  votiveCandles: u("1601121141461-9d6647bca1ed"),   // votive lights in rows
  prayerHands: u("1490127252417-7c393f993ee4"),     // hands in prayer
  hands: u("1490127252417-7c393f993ee4"),
  rosary: u("1505236858219-8359eb29e329"),          // rosary close-up
  bible: u("1504052434569-70ad5836ab65"),           // open scripture
  marian: u("1583468982228-19f19164aee2"),          // Marian iconography
  cross: u("1495107334309-fcf20504a5ab"),           // cross against sky

  // ── Sacred interiors (warm, NOT gothic European) ──
  altar: u("1542816417-0983c9c9ad53"),              // warm altar arch
  archInterior: u("1542816417-0983c9c9ad53"),
  pews: u("1520716963369-9b24de965de4"),            // empty pews, soft light
  // Was a gothic vault ceiling — remapped to warm sunlit interior so it
  // reads as a contemplative sanctuary rather than a European cathedral.
  cathedralCeiling: u("1438032005730-c779502df39b"),

  // ── Church exteriors (warm sunset / weathered chapel) ──
  churchSunset: u("1503416997304-7f8bf166c121"),    // sunset over a chapel
  oldChapel: u("1519892300165-cb5542fb47c7"),       // weathered colonial chapel
  // The next three were European basilica / spire / tower — remapped so the
  // history timeline and gallery hero stop looking like a Roman tour.
  basilica: u("1518562180175-34a163b1a9a6"),        // → candle atmosphere
  churchSpire: u("1519892300165-cb5542fb47c7"),     // → old chapel
  churchTower: u("1503416997304-7f8bf166c121"),     // → sunset chapel

  // ── Community / festival ──
  procession: u("1551410224-699683e15636"),         // candlelight procession
  mass: u("1551410224-699683e15636"),
  flowers: u("1481349518771-20055b2a7b24"),         // flower offering
  // Was a duplicate of `flowers` — now points at votive lights, closer to
  // the "lamp lights" idea (oil lamps / diyas at a feast).
  lampLights: u("1601121141461-9d6647bca1ed"),

  // ── Nature / peaceful (used sparingly) ──
  sunRays: u("1502082553048-f009c37129b9"),
  goldenLight: u("1519681393784-d120267933ba"),
  sky: u("1495107334309-fcf20504a5ab"),
  doves: u("1508780709619-79562169bc64"),
};

export type ImageKey = keyof typeof images;
