// Curated Unsplash photo URLs — peaceful church/spiritual imagery.
// All IDs verified to return HTTP 200. Replace with local photos later.
const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const images = {
  // Hero / large backdrops
  candlesBg: u("1518562180175-34a163b1a9a6"),
  stainedGlass: u("1473177104440-ffee2f376098"),
  archInterior: u("1542816417-0983c9c9ad53"),
  cathedralCeiling: u("1519972064555-542444e71b54"),
  sunlightInterior: u("1438032005730-c779502df39b"),
  candleLight: u("1507692049790-de58290a4334"),

  // Church exterior / architecture
  churchSpire: u("1547756536-cde3673fa2e5"),
  basilica: u("1577416412292-747c6607f055"),
  churchSunset: u("1503416997304-7f8bf166c121"),
  oldChapel: u("1519892300165-cb5542fb47c7"),
  churchTower: u("1502086223501-7ea6ecd79368"),

  // Devotion / detail
  rosary: u("1505236858219-8359eb29e329"),
  bible: u("1504052434569-70ad5836ab65"),
  hands: u("1490127252417-7c393f993ee4"),
  prayerHands: u("1490127252417-7c393f993ee4"),
  marian: u("1583468982228-19f19164aee2"),
  cross: u("1495107334309-fcf20504a5ab"),

  // Nature / peaceful
  sunRays: u("1502082553048-f009c37129b9"),
  goldenLight: u("1519681393784-d120267933ba"),
  sky: u("1495107334309-fcf20504a5ab"),
  doves: u("1508780709619-79562169bc64"),

  // Community
  pews: u("1520716963369-9b24de965de4"),
  mass: u("1551410224-699683e15636"),
  candlesLit: u("1542652694-40abf526446e"),
  altar: u("1542816417-0983c9c9ad53"),

  // Festival / celebration
  procession: u("1551410224-699683e15636"),
  flowers: u("1481349518771-20055b2a7b24"),
  lampLights: u("1481349518771-20055b2a7b24"),
};

export type ImageKey = keyof typeof images;
