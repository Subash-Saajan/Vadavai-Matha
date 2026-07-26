/**
 * What each moment on the history page actually rests on.
 *
 * Generated from a citation audit that read every claim on /history against the
 * parish Knowledge Base AND the full text of the books themselves — Pate's
 * gazetteer, Bertrand's letters, Auguste Jean, Caldwell — then had every
 * citation adversarially attacked to catch quotes that were paraphrased,
 * misattributed, or simply not in the book. Only citations that survived that
 * attack are here.
 *
 * WHY THIS EXISTS. The research was already done; it just wasn't shown. A page
 * that asserts three centuries of history in one confident voice reads as
 * invention, however true it is. A page that says "Pate 1917" — and links you
 * to the page in the gazetteer — reads as history.
 *
 * THE TIER IS NOT DECORATION. It is the honest strength of the claim, and it is
 * the whole point:
 *   documented — external, independent, primary support. Someone outside this
 *                parish, with no reason to flatter it, wrote this down.
 *   tradition  — the parish's own account of itself. Cherished, long-held, and
 *                uncorroborated. We say so.
 *   devotion   — a local and diocesan devotional tradition, never the subject of
 *                a Vatican investigation. The 1803 weeping is here.
 * Never promote a tier to make a dot look stronger. The documented half of this
 * page is believed BECAUSE the rest is labelled honestly.
 *
 * THE PARISH'S OWN BOOKS ARE THE WEAKEST SUPPORT THERE IS — parish_english_history,
 * souvenir_150yr, history_2026, diocese_thoothukudi_page, catholictamil_182,
 * rosariancr_fatimagiri, bethany_sisters_healing_ministry, bishop_stephen_jubilee_2022.
 * They are ONE witness family, not several: they tell the same story because they
 * descend from the same telling, and they must never be stacked to look like
 * corroboration. A dot whose only witnesses are parish-side cannot wear a filled
 * gold "Documented" badge, however many of them there are.
 *
 * `keys` are ids in sources.ts. They resolve to /sources#<id>. A key that is not
 * in SOURCE_INDEX would render a chip pointing at a dead anchor, so the
 * generator filters them and the resolver skips them.
 *
 * AUTHORITY ORDER IS NOW ENFORCED IN CODE, NOT BY HAND. sources.ts declares the
 * order of authority in the order of its groups — the Holy See, the founder in his
 * own hand, the Jesuit archives, the outside record, the printed mission histories,
 * modern scholarship, and the parish's own books LAST — and promises its reader that
 * "citations.ts reads that order and sorts every citation by it". It didn't; nothing
 * sorted, and the chip rows were right only by hand and by luck. `sortKeys()` below
 * makes the promise structurally true: it orders ids by their position in
 * SOURCE_GROUPS (unknown ids last), and `citationsFor()` — what the page renders
 * through — returns keys already sorted. A careless hand-edit can no longer put the
 * parish's own jubilee book at the head of a chip row. The arrays below are still
 * written in authority order, because that is how you read them, but the page no
 * longer depends on that.
 *
 * The first pass of this file was machine-generated (scratchpad/gen_citations.py).
 * It is hand-maintained now — the corrections from CITATION_AUDIT.md live here, and
 * regenerating would throw them away.
 */

import { SOURCE_GROUPS } from "@/lib/sources";

export type Tier = "documented" | "tradition" | "devotion";

export type DotCitation = {
  tier: Tier;
  /** Source ids, strongest first. Empty is a finding, not a failure. */
  keys: string[];
  /** One sentence: what the sources actually establish here. */
  note: string;
  /**
   * The photo for this year, named explicitly.
   *
   * It used to be DERIVED from the dot's position (`<era>-<index+1>.jpg`), which
   * meant inserting a year silently slid every later photo onto the wrong year.
   * Naming it here breaks that coupling: dots can be added, cut or reordered and
   * each picture stays with the moment it was made for.
   */
  photo: string;
};

/**
 * id → its rank in the bibliography. Built by flattening SOURCE_GROUPS, so the
 * ranking lives in exactly one place: the order of sources.ts.
 */
const AUTHORITY_RANK: Map<string, number> = new Map(
  SOURCE_GROUPS.flatMap((g) => g.items).map((s, i) => [s.id, i] as const),
);

/**
 * Order source ids by authority — the order they appear in sources.ts, which runs
 * from the Holy See down to the parish's own books. Ids not in the bibliography
 * sort last (they render no chip anyway).
 *
 * This is the ranking sources.ts promises. Do not add a second one.
 */
export const sortKeys = (keys: string[]): string[] =>
  [...keys].sort(
    (a, b) =>
      (AUTHORITY_RANK.get(a) ?? Number.MAX_SAFE_INTEGER) -
      (AUTHORITY_RANK.get(b) ?? Number.MAX_SAFE_INTEGER),
  );

/**
 * Index-aligned with the `dots` array of each era in i18n.ts. If you add, remove
 * or reorder a dot there, you MUST do the same here — a citation attached to the
 * wrong year is worse than no citation at all.
 */
export const HISTORY_CITATIONS: Record<string, DotCitation[]> = {
  "clearing-in-the-forest": [
    // 0
    {
      tier: "documented",
      photo: "clearing-in-the-forest-1.jpg",
      keys: ["caldwell_1881"],
      note: "Caldwell (p.74) is the only witness here, and he corrects the page he is cited on: the twenty thousand Paravas of the thirty coastal villages were baptised by Fr Michael Vaz after the expedition of 1532, a decade before Xavier arrived. No source connects that coastal movement to Vadakkankulam — this dot is the scene, not yet the parish.",
    },
    // 1
    {
      tier: "documented",
      photo: "clearing-in-the-forest-7.jpg",
      keys: ["pate_gazetteer_1917", "cronin_1959"],
      note: "Cronin (1959, p.30) carries the whole dot: Christianity \"lay entrenched without the walls of India\" until de Nobili's party left Tuticorin for Madurai in November 1606, and it was to that inland mission that de Britto succeeded in 1683. He is a modern biographer, not a document, and none of this is about Vadakkankulam — the dot explains how a Jesuit came to be on a forest path in the far south, and claims nothing more.",
    },
    // 2
    {
      tier: "documented",
      photo: "clearing-in-the-forest-2.jpg",
      keys: ["bayly_1989", "hardgrave_1969"],
      note: "Upgraded from tradition (23 Jul 2026), and the upgrade is earned: TWO outside scholars, working from different sources for different purposes, independently put a woman founder at Vadakkankulam in 1680. Bayly (pp.405–406) works from the Jesuit manuscripts at the Madura Mission Archives and records \"a small shrine containing a cross\", calling her the actual founder of the village; Hardgrave, writing the social history of the Nadar community, gives the date flatly — \"In 1680, the first congregation of Nadars was started at Vadakkankulam … with the conversion of a Nadar woman; a church was built in 1685\". Neither is the parish talking about itself, so the shape of this moment — a woman, a cross, 1680, a village grown around her — is documented. Her NAME (Santhaayi Ammaiyar) and her origin at Thoppuvilai remain the parish's own record, which is why history_2026 stays on the row. Two things to keep straight. (1) Both scholars identify her by caste, as a Shanar/Nadar woman; the page tells her story without it, by the parish's standing decision, and the reference leaves carry the sentences as the books wrote them — the story is edited, the evidence is not. (2) Heideman 2001 was deliberately NOT added as a third chip: he is the source behind the Wikipedia line, but he is almost certainly downstream of Hardgrave, and we hold no words of his at all. Three chips where there are two witnesses is the stacking this file forbids. NEITHER Bayly NOR Hardgrave is on this disk — both leaves say so; the tier rests on what they wrote, not on our having opened them.",
    },
    // 3
    {
      tier: "tradition",
      photo: "clearing-in-the-forest-3.jpg",
      keys: ["pate_gazetteer_1917", "besse_moumas_typescript"],
      note: "Only de Britto's penetration as far south as Vadakkankulam (Pate, p.90) is external; the halting-place on the Travancore road, the cotton field and the priest on horseback are the parish's own memory, and Pate's dating also means the encounter cannot safely be put at 1680. Auguste Jean was removed from this dot: his earliest mention of the village is Fr Borghese in 1709 and he has nothing whatever on Santhaayi. BESSE READ (25 Jul 2026, Moumas typescript p.805) and he supplies the SETTING, flatly and without hedging: a missionary judged the locality convenient as 'a stopping place between Travancore and the Pandiyan kingdom' and resolved to build a residence there - 'Such was the origin of Vadakenkulam.' That is now the printed source behind this moment's frontier road. It says nothing of Santhaayi, the cotton field or the blessing, which remain the parish's own.",
    },
    // 4
    {
      tier: "documented",
      photo: "clearing-in-the-forest-4.jpg",
      keys: ["pate_gazetteer_1917", "besse_moumas_typescript", "neill_1985", "hardgrave_1969"],
      note: "Documented (24 Jul 2026). Three outside witnesses carry the core: Pate (p.90) and Neill both attest a congregation here by 1685, and Hardgrave, from the social history of the Nadars, states flatly that \"a church was built in 1685\" — so that a church rose here in that year is externally established, not parish memory. What the books do NOT carry, and the prose therefore drops: the DEDICATION (no source names one for the 1685 chapel — St Francis Xavier is documented only from the stone church of 1839, Holy Family only from the 1872 re-dedication) and the BUILDER (Pate has de Britto reach the village and be \"called back unexpectedly to Kumbakonam\", and Hardgrave names no builder, so de Britto's founding role is documented, not that he raised the chapel himself). \"Thatch\" is the parish's own ordinary detail, kept as colour. The 1934 Gazetteer Supplement was NOT added: it restates Pate and names the caste. BESSE READ (25 Jul 2026, Moumas typescript p.805): the mission's own historian records the attribution AND HEDGES IT - 'The Missionary who built a church in the new village IS SAID TO BE no other than Fr. John de Britto and the year 1685.' He will not assert it, and two sentences later he draws his own line - 'Here tradition is met with historic documents' - before producing the Annual Letter of 1701. So Besse confirms the 1685 attribution was already old and held in the mission's archives, but does NOT prove de Britto built it. The documented tier here still rests on Hardgrave for the church and Pate/Neill for the congregation, never on de Britto's authorship - which the prose deliberately does not claim. FRAMING (25 Jul 2026): the prose no longer says he 'came this far south' - that arrival belongs to the previous moment - but that these were the years the whole mission was in his charge, which is Pate's own sentence ('In 1683 Father John de Britto succeeded to the charge of the Madura Mission'). Better sourced than the arrival phrasing it replaced.",
    },
    // 5
    {
      tier: "tradition",
      photo: "clearing-in-the-forest-5.jpg",
      keys: ["pate_gazetteer_1917", "faber_1851", "bishop_stephen_jubilee_2022", "diocese_thoothukudi_page"],
      note: "The 'two hundred' is the parish's founding memory, and a full-corpus sweep (all 173 texts, 24 Jul 2026) found NO book behind the number: de Britto's own biographers (Faber, Boero, the 1854 Abrégé) never name the village, Bertrand's earliest mention is Borghese in 1709, and Dessal's 1905 history does not reach the founding. The figure's cleanest statement was the in-house compilation, now removed; the 150-Year Souvenir carries it too but only in a degraded, mis-paginated passage (garbled geography), so it is not chipped. What IS attested is the EVENT, not the count: Bishop Stephen's 2022 jubilee message has de Britto come to Vadakkankulam in 1686 and give baptism. Pate supplies the documented frame — a congregation \"definitely formed by 1685\" — but no number. So the dot is tradition: the founding is real and externally framed; the count of two hundred is the parish's own. CORRECTION (25 Jul 2026): an earlier sweep here searched only the book texts and missed _extraction/, and wrongly reported the figure as having no clean source. It has one: the Diocese of Thoothukudi's own parish page states 'He baptized more than 200 people in 1686' - now chipped. It is still parish-family, not outside corroboration, so the tier does not move. Note also that the diocese and Bishop Stephen both date the baptisms to 1686 and describe a RETURN, while History_2026 and the Souvenir put them in 1685 'on the same occasion' as the chapel, and Pate has de Britto called away to Kumbakonam rather than returning. The prose therefore says only 'not long after' and the year label straddles 1685-86; it must not assert either reading. SCALE (added 24 Jul 2026): Faber (1851, p.396) records de Britto baptising two thousand seven hundred catechumens in two months, prepared by catechists while the missionaries were driven out - which is why the parish's two hundred is KEPT rather than doubted: it is a modest, in-character number for this man, not an inflated boast. Faber is chipped for THAT clause only, never for the 200. The oft-quoted 8,000-in-18-months was deliberately NOT used: it is web-sourced (Wikipedia/clairval.com), belongs to 1690-92 in the Marava, and post-dates our baptisms by five years.",
    },
    // 6  (the prison letter of 3 Feb and the martyrdom of 4 Feb, merged into one moment 25 Jul 2026)
    {
      tier: "documented",
      photo: "clearing-in-the-forest-8.jpg",
      keys: ["debritto_prison_letter_1693", "maldonado_1697", "boero_1853", "faber_1851"],
      note: "Two moments made one: the prison letter of 3 February 1693 and the martyrdom the next morning, both at Oriyur. THE LETTER is its own citation, printed by Faber (1851, pp.445-446), who supplies the straw pen, the charcoal-and-spittle ink, the three days on a little milk, the aborted execution (the soldiers 'on the point of firing' before the Regulo sent him back), and the signature verbatim. THE DEATH of 4 February 1693 at age forty-five is documented at the highest level: the saint's own letter of the night before, a printed Latin martyrology of 1697 (Maldonado) whose title fixes the date, and Boero ('in eta di quarantacinque anni') - Faber and Boero descending from the same 17th-c. Jesuit dossier, corroborating rather than testing. FLAGGED, not chipped: the CANONISATION ('Rome would name him a saint') is a public act of the Church, 1947, in the standard references but NOT in our pre-1947 books; and that de Britto FOUNDED this mission is parish tradition, which is why Pate (who credits the conversion work to Fr Borghese) does not chip it. MISMATCH (file 21 J1): Faber says the ink was charcoal moistened with SPITTLE, Auguste Jean 1894 says diluted in WATER; the prose follows Faber. RELEVANCE: no de Britto biography names Vadakkankulam and the letter never mentions it (Oriyur is ~200 km away in the Marava); the tie to the village rests on Pate placing him here, on the 1685 church, and on the parish's living devotion to Arulanandar.",
    },
  ],
  "first-inland-parish": [
    // 0  (1698 — the first parish priest; UPGRADED from tradition and rewritten 25 Jul 2026)
    {
      tier: "documented",
      photo: "first-inland-parish-1.jpg",
      keys: ["besse_moumas_typescript", "neill_1985"],
      note: "Upgraded from tradition 25 Jul 2026. The old note said the first pastor rested on the parish's own register alone. He does not. Besse (Moumas typescript, p.805), writing from the mission's records, names Fr Bernard de Saa ordered to Vadakenkulam in 1698, and gives the village's origin on the same page: a residence set on the border between Travancore and the Pandiyan kingdom. What stays parish-side is only the claim that the roll of pastors has run unbroken ever since — and the page no longer calls this the first great inland parish, a phrase no source carries. The name still wobbles across parish sources (de Saa 1697 / de Souza 1698 / Ponnaiya); Besse settles it as de Saa, 1698 (mismatch 21 B1).",
    },
    // 1  (1700 — the ordeal of the first priest; NEW MOMENT 25 Jul 2026)
    {
      tier: "documented",
      photo: "first-inland-parish-1.jpg",
      keys: ["besse_moumas_typescript", "ferroli_1951"],
      note: "New moment, 25 Jul 2026, documented from a primary source. The beating and the queen's reprieve are told by de Saa himself, in his letter of 14 October 1713, printed by Ferroli (vol. II, 1951, p.354) and eyewitnessed by Fr Pierre Martin, who saw the marks of it in June 1700. Besse's typescript (p.805) corroborates an earlier persecution of the same priest from the Annual Letter of 1701. One source (the 1934 Gazetteer Supplement) frames the persecution as a caste quarrel and adds a figure of 1,635 baptisms that year; both are kept off the page — the caste framing per the parish's wish, the figure because we do not yet chip that source. The prose rests on de Saa's own account, in which the motive is treasure, not caste. PHOTO: reuses the dot-0 painting as a placeholder; a dedicated image for this moment is still to be made.",
    },
    // 2  (1709 — the name in a Jesuit letter; was dot 1)
    {
      tier: "documented",
      photo: "first-inland-parish-4.jpg",
      keys: ["auguste_jean_1894", "bertrand_1847"],
      note: "The 1709 Annual Letter, printed by Bertrand (vol. IV, p.100n) and followed by Auguste Jean (p.157), sets Fr Maria Xavier Borghese at the head of the district of Vadakencoulam and praises his admirable zeal. It is the earliest of these letters to survive in the printed mission histories; the earlier 1701 persecution reaches us only through Besse's typescript, at the moment before this one. The old note here called this 'the earliest document to name this place' — no longer true, now that de Saa (1698) and the 1701 letter stand ahead of it. Auguste Jean here follows Bertrand, not an independent witness.",
    },
    // 3  (1712–13 — eight hundred in two seasons; was dot 2)
    {
      tier: "documented",
      photo: "first-inland-parish-2.jpg",
      keys: ["besse_moumas_typescript"],
      note: "REPAIRED AND UPGRADED 25 Jul 2026. This was once the one keyless moment on the page, and its old note was wrong: it said the figure existed only in the parish's 2026 compilation. It does not. Besse (Moumas English typescript, p.822), writing from the mission's records, gives the church 'at least 4128 adults and a large number of children' in 1713, 'about 800 baptisms of adults, besides the children' across 1712 and 1713, and 85 more adults preparing in October 1713. The page's 'nearly eight hundred adults, besides their children' is a faithful rendering of that sentence, not an invention. Besse states it as a statistic and does NOT hedge it as he hedges the 1685 founding, so the tier is documented. The same 4,128 recurs in the 1934 Gazetteer Supplement (p.166) but is NOT stacked here as a second witness — it appears to descend from this same datum.",
    },
    // 4  (1714 — a residence on the frontier; was dot 3)
    {
      tier: "documented",
      photo: "first-inland-parish-3.jpg",
      keys: ["pate_gazetteer_1917", "caldwell_1881", "bertrand_1847"],
      note: "Clean and doubly independent: Fr Calini's letter of 1716, quoted by Pate, says the station \"had two years previously become a residence\", and Caldwell credits Fr Brandolini with founding the congregation in 1714. Bertrand's Vol IV adds the primary the others only summarise: the mission's own relation of 1714–16 speaks in the first person of an impostor who came \"into the church of Vadakencoulam where I then was\", deceiving the catechist who accompanied the priest — a resident missionary, a functioning church and an honoured catechist here in those very years, with Beschi the neighbouring district priest (pp.345–346). Neither source calls it the senior interior station or the first great inland parish — those are the page's own words, and they are not carried by these keys.",
    },
  ],
  "statue-and-the-saint": [
    // 0
    {
      tier: "tradition",
      photo: "statue-and-the-saint-1.jpg",
      keys: ["diocese_thoothukudi_page", "catholictamil_182"],
      note: "The weakest pillar on the page: the box from Portugal, the landing at Kootapuli and the three-way division of the images have zero external corroboration, and Kamanayakkanpatti tells a different origin story for its own image. Auguste Jean was removed — he has nothing about a box, Portugal, Kootapuli or a statue anywhere — so every key here is now parish-side, which is exactly what the tier says.",
    },
    // 1
    {
      tier: "documented",
      photo: "statue-and-the-saint-2.jpg",
      keys: ["vatican_news_canonisation", "osservatore_romano_2012", "mackenzie_1901", "auguste_jean_1894", "bertrand_1847"],
      note: "The strongest fact on the page, and now four-ways attested. The place comes from the Holy See (Vatican News) and the DATE — 14 May 1745, nine months' instruction — from L'Osservatore Romano, written by the cause's Vice-Postulator, not from the rite of canonisation, which recites only the name. Bertrand (1847) and Auguste Jean (1894) record the baptism here from the mission's own papers a century before any dossier existed (Auguste Jean follows Bertrand and is not a fully independent line). Added 25 Jul 2026: Mackenzie's Christianity in Travancore (1901, p.80) — a British administrator with no interest in the parish — is the outside witness, giving the man's standing (\"held office in the court of the Raja\"), his age (\"thirty-two years of age\") and the place. The prose no longer carries the canonisation forward-reference; that belongs to the Shrine era. Caste is off the page per the parish's rule: the Vatican biography's Nambudiri-father / Nair-mother parentage stays KB-side.",
    },
    // 2
    {
      tier: "documented",
      photo: "statue-and-the-saint-3.jpg",
      keys: ["auguste_jean_1894", "bertrand_lettres_1865", "parish_english_history", "souvenir_150yr"],
      note: "Upgraded to documented and reframed onto the building, 25 Jul 2026. Bertrand (1865), from the church's own archives, records that Buttari \"laid the foundations of its present church\", and Auguste Jean has Fr Thomassini \"complete\" it — a documented building event, carried by the printed mission histories (Auguste Jean follows Bertrand and is not an independent second witness). What is NOT documented is the specific year 1749 and the word \"kankol\": both come only from the parish jubilee souvenir, so the page keeps them as the parish's own reckoning and the tier does not rest on them. The fabric — broad bricks from Perungudi — is the parish's own English history (an earlier draft's \"stone\" is in no source). Note that Bertrand's \"present church\" (1865) is Buttari's brick church of 1752, later replaced by the 1872 building — not the church standing today.",
    },
    // 3
    {
      tier: "documented",
      photo: "statue-and-the-saint-7.jpg",
      keys: ["auguste_jean_1894", "bertrand_1847"],
      note: "The two Jesuit chroniclers give this dot different triggers, and the page follows Auguste Jean's (1894): the church timber running short, Devasahayam's errand to his old friend at the Travancore court, the quarrel over religion, the threat and the royal warrant. Bertrand's Vol IV (pp.386–387) instead makes the trigger a brahmin favourite's insult — \"renounce the Christian faith, or you will pay me with your head\" — and names \"M. Eustache-Benoît Lanoë\" (Eustachius De Lannoy) as the Frenchman who first spoke to Devasahayam of the faith, and to whom the prisoner later wrote from his chains. Two accounts of one event; neither is an independent second line — both retell the Jesuit tradition.",
    },
    // 4
    {
      tier: "documented",
      photo: "statue-and-the-saint-4.jpg",
      keys: ["besse_moumas_typescript", "bertrand_lettres_1865", "parish_english_history", "souvenir_150yr"],
      note: "Corrected and upgraded to documented, 25 Jul 2026. An earlier draft said the patron was not the Holy Family but St Francis Xavier — an over-reading of Bertrand, who records only a FEAST of St Francis Xavier here (the great December novena, Lettres vol. II, pp.182, 186–187), never a dedication. Besse (Moumas typescript, pp.843–844), from the mission's records, says the 1752 church was \"dedicated to the Holy Family\", \"just like the first\" — so the Holy Family title runs continuous from de Britto's chapel, and did not first arrive in 1872. So at its building this WAS a Holy Family church; St Francis Xavier was its patronal feast, not its dedication. What stays parish-side is the cross plan, the eastward orientation and the exact year 1752 (souvenir; two inscriptions once inside the old church, unseen). The August Assumption feast was removed from this moment — Besse dates it to Thomassini's time generally, not to the 1752 building. Auguste Jean was dropped too: his line here is Thomassini \"completing\" the church, told now at the previous moment.",
    },
    // 5
    {
      tier: "documented",
      photo: "statue-and-the-saint-5.jpg",
      keys: ["holy_see_canonisation_rite_2022", "auguste_jean_1894", "bertrand_1847", "diocese_thoothukudi_page"],
      note: "The execution of 14 January 1752 is documented in the near-contemporary Jesuit accounts, and Auguste Jean (vol. I, p.203) is the oldest witness that this church already held \"a part of his garment and the chains with which he was bound\". Bertrand's Vol IV (p.397) settles where the body went: gathered into the church of St Francis Xavier at Kottar, with the Te Deum sung in Cochin cathedral and the bishop's own panegyric — the garment and chains kept at Vadakkankulam are secondary relics beside that burial. Two of the dot's other details are not carried here: \"Kattadimalai\" appears in no historical source — the witnesses describe the Travancore lines at the Aralvaimozhi gap and never name the spot — and the head-turban relic is the diocese's modern account, which has quietly displaced the chains.",
    },
    // 6
    {
      tier: "documented",
      photo: "statue-and-the-saint-6.jpg",
      keys: ["caldwell_1881", "auguste_jean_1894", "bertrand_lettres_1865"],
      note: "The suppression of 1773 and the handover to Padroado priests from Goa are documented — though Caldwell's \"died one by one\" is Stuart's sentence two years earlier, so those two are one gazetteer witness and not two. Auguste Jean (p.230) settles the death of Thomassini, and the page now follows him: he had himself carried to Fr Antoine Douarte at Talai and died THERE in 1775, aged seventy-five, not at Vadakkankulam.",
    },
  ],
  "the-weeping-madonna": [
    // 0
    {
      tier: "documented",
      photo: "the-weeping-madonna-1.jpg",
      keys: ["krishnaswami_ayyar_1934", "caldwell_1881", "besse_moumas_typescript", "auguste_jean_1894", "ferroli_1951"],
      note: "Enriched 25 Jul 2026 with every reference that carries these years. The 63-year absence is Besse's own framing — the Moumas typescript (p.842) opens the era, \"During the 63 years between the death of Fr. Thomassini and the arrival of the new Jesuits in 1838…\". Caldwell has the old missionaries \"died one by one, and their places were supplied by native priests from Goa\" (Stuart 1879 carries the same sentence, so those two are one witness); Auguste Jean tells it from the Jesuit side. The upgrade is the 1934 Tinnevelly Gazetteer Supplement (p.169), a government record with no interest in the parish: Vadakkankulam \"became the sole centre of the inland mission with four divisional centres… Sendamangalam, Andipatti, Kamanayakkanpatti and Vadakkankulam itself\", served from Cochin until the 1837 handover — the village commanded the whole inland mission, it did not merely survive. Ferroli (1951) corroborates the jurisdiction, listing Vadakencollam among the four Madura-Mission churches \"under the Bishop of Cochin\". The gazetteer leaf is windowed to the sole-centre sentence: its neighbours carry the 1744 caste decree, kept off the site.",
    },
    // 1
    {
      tier: "documented",
      photo: "the-weeping-madonna-5.jpg",
      keys: ["besse_moumas_typescript", "bertrand_lettres_1865", "auguste_jean_1894"],
      note: "Bertrand's Lettres (vol. II, 1865) is the witness to the cult: ninety years after Thomassini's death he still writes in the present tense that the Christians \"venerate him as a saint, give his name to their children, and visit his tomb with an extreme devotion\", and that non-Christians invoke him for rain (Auguste Jean repeats him and is not a second witness). Besse's own typescript (Moumas) adds and corrects: the Christians \"raised a monument in their midst\", because Thomassini was NOT buried here — Besse has him dying and buried at Our Lady of Sands near Periatalai. So the tomb-shrine they visit is that monument, a cenotaph, not his grave. (The page's suppression dot, following Auguste Jean, has him dying at Talai; the burial place is a logged mismatch, both kept.)",
    },
    // 2
    {
      tier: "devotion",
      photo: "the-weeping-madonna-2.jpg",
      keys: ["dessal_gemert_1905", "besse_moumas_typescript", "diocese_thoothukudi_page", "catholictamil_182"],
      note: "Re-sourced 25 Jul 2026. The weeping is a devotional claim and the tier says so — but the old note here (\"one witness stands behind every account… Besse, never opened\") is now out of date. The moment is carried by the two EARLIEST printed witnesses, both on disk. Dessal (Lettres de Gemert, 1905), a Jesuit of this mission writing nine years before Besse and while the 1803 generation's grandchildren still lived, gives the whole scene: Saveri-Mouttou Pillai come from Tirunelveli to see \"Monsieur Birdelpech\", the statue \"dans une niche à double porte\" with both leaves open, the cloud, the tears, the outstretched hands. Besse's own typescript (Moumas, p.842) gives the same account independently and adds that \"all the other statues on the altar expressed compassion\". The diocese and the Tamil parish page (catholictamil) are the modern retellings — one witness family — but they no longer stand alone. It remains a recognised local devotion, never a Vatican-investigated apparition. The day is now given as 21 October — the reading with the most proof: both earliest printed witnesses (Dessal 1905, Besse/Moumas) give 21 October, and 21 October 1803 was a Friday, the one Gregorian date that matches the Tamil anchor of Aippasi 7, a Friday (23 October 1803 was a Sunday). The 23rd the diocese uses is the commemoration date; the village keeps the feast on the 22nd and 23rd (see the witnesses moment). The souvenir's stray \"1805\" is a copying slip, kept in the register.",
    },
    // 3
    {
      tier: "devotion",
      photo: "the-weeping-madonna-3.jpg",
      keys: ["dessal_gemert_1905", "besse_moumas_typescript", "catholictamil_182"],
      note: "Re-sourced 25 Jul 2026. The scene — the catechist wiping the tears, the bell rung at the wrong hour, the village hurrying in, the Parce Domine — is the parish's own (catholictamil), but the ENDING is now documented from both printed witnesses. Besse's typescript (Moumas, p.842): once they rang the bell and prayed, \"the statue of the Virgin and those of the other Saints resumed their customary aspect\"; Dessal (1905) has the same, the statue back \"à sa première pose\" and \"toutes les autres images des saints reprirent leur aspect accoutumé\". The old note here said Besse was never opened — no longer true; the typescript has been read.",
    },
    // 4
    {
      tier: "documented",
      photo: "the-weeping-madonna-4.jpg",
      keys: ["besse_moumas_typescript", "dessal_gemert_1905"],
      note: "Made documented and pared to what the printed record attests, 25 Jul 2026. Besse's typescript (Moumas, p.842) names the two witnesses Savarimuthu summoned — \"the catechist Yagapillai and Miss Henrietta Bilderbeck\", who \"saw for themselves the same phenomenon\". Dessal (1905) corroborates that the chronicler wrote the account from \"the honourable catechist and the other most trustworthy persons of the village\". Removed at the owner's direction, as not documented or out of scope for this moment: the parish-only extra catechists (Zacharias, Vyagappar), the same-day Cardoza declaration (parish tradition, and disputed — the register keeps both it and Dessal's counter-caution about the absent priest), and the 22–23 October feast date. The event date, the 21st, is given at the weeping moment.",
    },
    // 5
    {
      tier: "documented",
      // PLACEHOLDER — this painting is a colonial office in 1801, left unused when
      // the era was cut from 9 dots to 7. Needs its own: the village schoolmaster
      // composing the song. Prompt drafted for the owner.
      photo: "the-weeping-madonna-7.jpg",
      keys: ["dessal_gemert_1905"],
      note: "NEW DOT, 26 Jul 2026, and the strongest thing in the 1803 file: Dessal p.58 says the FIRST account was in verse, five stanzas, composed immediately after the event by the village schoolmaster, who had seen it himself and who p.59 identifies as a worshipper of Siva. Sebastian Pillai's prose came SECOND and \"reproduces the first exactly, paraphrases and completes it\", and he never claims to have been present. This corrects the page's own earlier framing, which made Sebastian Pillai the origin of the record — he is the second hand, not the first. Dessal alone carries it; the Moumas/Besse typescript, which otherwise tracks this account closely, has nothing about the song or the schoolmaster. \"A worshipper of Siva\" is the owner's chosen wording for Dessal's \"tout païen\" / \"sectateur de Siva\" — the point of the moment is that the first witness to set it down was not a Christian.",
    },
    // 6
    {
      tier: "documented",
      photo: "the-weeping-madonna-8.jpg",
      keys: ["besse_moumas_typescript", "cms_intelligencer_1880", "badley_directory_1886", "trento_2022"],
      note: "The family, at last, has outside witnesses — all of them Protestant, none with any reason to flatter a Catholic shrine. Trento (2022, p.285) identifies the village's Mr Bilderbeck from the parish's own 1915 genealogical manuscript as the merchant Christopher Bilderbeck (b. c.1758, d. 1817); the CMS Intelligencer's obituary (Aug. 1880, pp.512–513) records his son John as \"born in India… of a Roman Catholic family, and trained for the priesthood of that Church\"; Badley's Methodist directory supplies the birth year, 1809. Besse's typescript (Moumas, p.842 n.1) adds their standing: the Bilderbecks \"had farmed out the collection of tiryais (dues) of Nangunery\" — revenue-farmers, which makes the benefactor tradition materially plausible. Henriette, the witness of 1803, was his daughter (Besse and Dessal both call her \"Miss\"). The boon-story is cited, as tradition, on the era of the church they are remembered to have helped; the strong \"funded the great church\" claim is NOT made here — Christopher died in 1817, thirty-eight years before that foundation stone was laid.",
    },
    // 7
    {
      tier: "documented",
      // PLACEHOLDER — this painting is Rome, 1794, a Carmelite scholar; it was left
      // unused when this era was cut from 9 dots to 7. The dot needs its own picture:
      // 1838, the two French fathers in the village listening to old people who were
      // in the church that morning. Prompt drafted for the owner.
      photo: "the-weeping-madonna-6.jpg",
      keys: ["dessal_gemert_1905"],
      note: "NEW DOT, 26 Jul 2026. This was the strongest thing in the whole 1803 case and it was told nowhere — it sat only in the establishes-note of the Dessal leaf on the following dot, invisible unless a reader clicked the chip. Dessal 1905, p.62: when the Society returned in 1838 the first fathers to reach Vadakencoulam found the tradition alive around them, only thirty-five years from its source, with many who had seen the transformation still living, and they learned it by listening. ONE witness, and he is mission-side, writing in 1905 about what the 1838 fathers found — not a document made in 1838. It is tiered documented on the same footing as the dot that follows (the mission's own printed historians), not because anyone outside the mission recorded it. Besse does NOT corroborate it and says something close to the opposite of those sixty-three years generally: most of what happened \"has not come to our knowledge or have been more or less disfigured by tradition\" — that line is already the anchor on dot 0, and the contrast is deliberate. Adding this dot re-keyed everything after it: the books dot moved 6 → 7 in i18n (en AND ta), citations, historyNotes and refs_quotes.",
    },
    // 8
    {
      tier: "documented",
      // PLACEHOLDER — shares dot 9's picture until this dot has its own: the priest
      // with his hands on the statue, and the wire-and-rod replica. Prompt drafted.
      photo: "the-weeping-madonna-9.jpg",
      keys: ["dessal_gemert_1905"],
      note: "NEW DOT, 26 Jul 2026. Dessal pp.62–63, and the only occasion on record when anyone examined the statue: the village's wire-and-rod working replica was operated for him (\"On a bien voulu refaire le miracle pour nous\"; the operator tangled his strings several times), then he handled the statue itself and tried to straighten the head, lift the eyelids, roll the eyes, part the two hands carved from one piece and force the rigid arms — \"Peine perdue!\", the inertia of a dried tree-trunk — and gave up his \"fonctions usurpées d'inquisiteur de la Foi\" to kneel. Tiered documented because what it reports is what a named man did with his hands and what he found, not the miracle; he is nevertheless mission-side and openly devout, and the dot lets him say so. Dated 1905 from the printing; his visit is undated, near the 1903 centenary, so the prose says \"a hundred years after\" and no more.",
    },
    // 9
    {
      tier: "documented",
      photo: "the-weeping-madonna-9.jpg",
      keys: ["dessal_gemert_1905", "besse_1914", "besse_moumas_typescript"],
      note: "Rewritten and upgraded to documented, 25 Jul 2026. The old framing — \"the whole of that morning comes down a single line, Besse 1914, never opened\" — is dead. There are THREE independent printed witnesses. Besse's La Mission du Maduré (1914) is the famous one, still un-inspected in the French (four known copies), but it has now been read in the parish's own Moumas English typescript (p.842). Nine years earlier, Dessal printed the full account in Lettres de Gemert (1905) — on disk, its page shown here. And in 1930 a Malayalam life of Devasahayam, in another tradition entirely, recorded the same European laywoman and the same three signs (attested via Trento 2022; we do not hold it directly). Three hands, none copying the others — which is why the dot is now documented as a matter of RECORD, though the weeping itself stays a devotion. It was never a Vatican process.",
    },
  ],
  "great-two-nave-church": [
    // 0
    {
      tier: "documented",
      photo: "great-two-nave-church-1.jpg",
      keys: ["stuart_manual_1879", "bertrand_lettres_1865", "auguste_jean_1894"],
      note: "Rewritten on the eyewitness. Fr Martin's letter of 14 July 1838 (Bertrand, Lettres vol. II, Second Letter, pp.52–53) is a first-person account of the day the Jesuits came back to this village in June 1838 — the reception, the deputations from the neighbouring villages, the forty-five children baptised that afternoon — and every quoted phrase in the dot is his. Stuart's district manual independently names both fathers, Martin and Duranquet, arriving in 1838 to recommence the mission; Caldwell 1881 p.243 prints the same sentence and is Stuart copied, so he is NOT stacked here. Neill was dropped: his version is Besse retold, not a second witness, and he is in copyright. Auguste Jean is kept for one thing only — the church Buttari began and Thomassini finished, which is the building still standing when they returned. Two cautions: \"brick\" is the parish's own word (KB file 02 §3.4 calls the same building stone — unresolved, logged in file 21), and the growing congregation is a general statement, NOT the reason for the new church; the printed histories give a different reason, which this page does not tell. The leaf is windowed and lands on the deputations sentence rather than the reception sentence: the reception sentence's page-position runs its highlight back into the Callikoulam clause, which the caste guard refuses.",
    },
    // 1
    {
      tier: "documented",
      photo: "great-two-nave-church-6.jpg",
      keys: ["bertrand_lettres_1865"],
      note: "Bertrand's own journal is the witness and it is first-person: horseback at half past two in the morning, the church by eight on 23 November 1839, mass to open the novena of St Francis Xavier — the titular feast of this church at that date, which is worth remembering two eras earlier. The page has the parting inverted: the bishop asked BERTRAND to leave him, so that Bertrand could keep the novena here and then go inland to Palamcottah.",
    },
    // 2
    {
      tier: "tradition",
      photo: "great-two-nave-church-8.jpg",
      keys: ["auguste_jean_1894", "parish_english_history"],
      note: "Auguste Jean (p.301) attests only that Bishop Canoz visited Vadakenkoulam on his pastoral tour of 1848. The date of 21 June and — the whole point of the dot — the request that the people begin gathering money for a large new church are the parish's own history alone; no outside source remembers what he asked for.",
    },
    // 3
    {
      tier: "tradition",
      photo: "great-two-nave-church-9.jpg",
      keys: ["auguste_jean_1894", "trento_2022", "souvenir_150yr"],
      note: "The benefaction is the parish's own memory and is tiered as such: the twenty-seven childless years, the boon and the generous giving come from the parish compilation, and the souvenir's Tamil telling (\"within one year a male child\") is the same witness family retold, never corroboration. What the outside record contributes is the check, not the confirmation: Auguste Jean credits the church to Fr Grégoire's persevering energy and names no lay benefactor anywhere in his two volumes, and Trento's dates put Christopher Bilderbeck's death in 1817, thirty-eight years before the foundation stone — so the gift, if it happened as remembered, belonged to the old church or to his heirs. Besse, unread, is where the claim could still be settled, and the dot says so.",
    },
    // 4
    {
      tier: "tradition",
      photo: "great-two-nave-church-2.jpg",
      keys: ["parish_english_history", "diocese_thoothukudi_page"],
      note: "Auguste Jean was removed: he says nothing about 1855, the stone, or the motto. Bishop Canoz's blessing of the foundation stone on 9 August 1855 and the motto \"Templum sit duplex, ara sed una\" survive only in parish-side books (possibly one book counted twice), the Latin is textually corrupt where the page does not quote it, and history_2026 says only that a priest COMPOSED a verse — nobody has ever inspected the stone, so the page must not say the words were cut into it.",
    },
    // 5
    {
      tier: "documented",
      photo: "great-two-nave-church-3.jpg",
      keys: ["arsi_tolosana_1872", "auguste_jean_1894", "dessal_1902", "parish_english_history"],
      note: "Independently documented in Rome: the Society's own 1872 catalogue lists Fr Grégoire at Vadakencoulam with Br Joseph Bergenthal entered as \"Ædif. eccl.\" — builder of the church — in the very year it was blessed. But \"the apostle of Vadakenkoulam\" and \"probably without equal in the world\" are both Auguste Jean's phrases (p.446): ONE chronicler, not the several the page implies, and the chunam-and-toddy mortar is parish-side.",
    },
    // 6
    {
      tier: "tradition",
      photo: "great-two-nave-church-4.jpg",
      keys: ["bell_inscription_photograph", "archives_lyon_burdin", "parish_english_history", "catholictamil_182"],
      note: "Downgraded to tradition — the dot's own note called it single-witness parish tradition while it wore a Documented badge. The photograph of the bell now settles the one thing paper could not (the bronze reads \"…GRÉGOIRE DE VALENCE…\" and \"…ATEUR CASIMIR GRÉGOIRE\", naming the donor the parish souvenir disputes) and the Lyon archives confirm only that the Burdin foundry existed and exported widely; 1861, the crates to Madras and the hanging all rest on one Tamil parish page — and the bells hung in TWO ninety-two-foot towers, one in each, not in a single tower.",
    },
    // 7
    {
      tier: "documented",
      photo: "great-two-nave-church-10.jpg",
      keys: ["auguste_jean_1894", "dessal_1902"],
      note: "Auguste Jean's Nécrologe carries the tomb verbatim: the Christians of Vadakenkoulam raised a modest tomb beside their church to Fr Eugène Rossignol, dead on 25 January 1863 of the cholera he caught nursing the Christians of Callikoulam. The date of Fr Delpech's death, 16 January 1887, is DESSAL's alone — Auguste Jean says he died \"un samedi\", a Saturday, and 16 January 1887 was a Sunday — so the date must be attributed, not asserted.",
    },
    // 8
    {
      tier: "documented",
      photo: "great-two-nave-church-7.jpg",
      keys: ["stuart_manual_1879"],
      note: "Stuart's district manual (1879, p.62) is the entire dot, and it is the kind of witness this page is built on: a British official with no interest in flattering the parish, listing \"A Convent for Native Nuns at Vadakankulam\" among the mission's three convents around 1864 — the only one away from the fishery coast. No parish record dates a convent here so early; the outside source remembers the sisters that our own books forgot.",
    },
    // 9
    {
      tier: "documented",
      photo: "great-two-nave-church-5.jpg",
      keys: ["pate_gazetteer_1917", "auguste_jean_1894", "parish_english_history"],
      note: "The completion of \"the present handsome church… in 1872\" stands in a British government gazetteer — the single best external anchor on the page — and the plan of two converging naves meeting in a common chancel is described from outside the parish as well as within it. Keep the hedge: all three Jesuit witnesses say \"probably\" or \"perhaps\" without equal in the world, never flatly. The ninety-two-foot towers, the vegetable dyes and the \"Little Rome\" naming are parish-side, not documented.",
    },
    // 10
    {
      tier: "documented",
      photo: "great-two-nave-church-11.jpg",
      keys: ["auguste_jean_1894", "dessal_1902"],
      note: "Both chroniclers record Fr Grégoire sent home on his doctors' advice and dying in the crossing of the Red Sea, anointed by Fr Delpech — and they AGREE on the day, differing only on the year. Both give 19 September (Auguste Jean, pp.446–447: the 18th is the day the ship entered the Red Sea and he died \"le lendemain… vers 2 heures\"), Auguste Jean in 1873 and Dessal in 1875; the page's \"18 September\" is a misreading of Jean.",
    },
  ],
  "little-rome": [
    // 0
    {
      tier: "tradition",
      photo: "little-rome-1.jpg",
      keys: ["maalaimalar_2022", "souvenir_150yr", "catholictamil_182"],
      note: "The 1891 chariot is parish record — the souvenir and the Tamil page are one witness family, not two — and the souvenir is now chipped openly rather than hidden behind its retellings. That same souvenir refutes any implied continuity: the thirty-five-foot car was RETIRED and repurposed as the cradle of the Pilgrims' Mother, and the ther that processes today was newly designed in 2014. The crowd figure in the last sentence is the one thing here reported from OUTSIDE the parish — Maalaimalar, 5 Aug 2022 — so it carries its own chip.",
    },
    // 1
    {
      tier: "documented",
      photo: "little-rome-2.jpg",
      keys: ["arsi_tolosana_1914", "la_mission_du_madure_periodical", "pate_gazetteer_1917", "neill_1985"],
      note: "The best externally-evidenced strand on the page — Pate (writing within years, with Caussanel himself as informant), the Madras High Court of 1926, and the Jesuit catalogues. But every witness says the outcome was LITIGATION, not reconciliation: the page's \"true act of reconciliation\" is contradicted by all of them. The year 1910 and the two walls rest on Sivasubramanian alone.",
    },
    // 2
    {
      tier: "documented",
      photo: "little-rome-6.jpg",
      keys: ["arsi_tolosana_1914", "jemparc_book450", "la_mission_du_madure_periodical"],
      note: "Book 450 exists and is catalogued at Shembaganur, but the catalogue's date-range is the only thing supporting \"1881–1923\": Caussanel was ordained in 1884 and reached India in 1888, ARSI 1900 puts another priest here, ARSI 1921 puts him at Kallikulam, the parish's own list gives him 1910–1919, and 1914 is the ONE year a catalogue sets him at Vadakkankulam. The Jesuits' own magazine says what the book actually is — he wrote \"des diaires, une histoire du pays\" and \"recherche les vieux manuscrits et les déchiffre\" — a retrospective compilation from old manuscripts, not a diary kept day by day in place.",
    },
    // 3
    {
      tier: "documented",
      photo: "little-rome-3.jpg",
      keys: ["arsi_madurensis_1921", "catholic_directory_1924", "neill_1985"],
      note: "The Catholic Directory of 1924 independently places the parish under the new Diocese of Tuticorin and — for the first time — under non-Jesuit clergy; Neill supplies Bishop Roche as \"the first Indian bishop of the Latin rite\", which is why he is chipped here rather than on the 1926 dot. Two claims still have NO located source: that the parish was raised to a deanery, and the precise day \"12 June 1923\".",
    },
    // 4
    {
      tier: "tradition",
      photo: "little-rome-4.jpg",
      keys: ["catholic_directory_1924", "parish_english_history", "souvenir_150yr", "diocese_thoothukudi_page"],
      note: "The naming of Vadakkankulam \"Chinna Romapuri\" in 1926 is remembered only in parish and diocesan telling — one institutional witness family — and appears in no colonial or academic source, and in no 1926 document of any kind. The 1914 Roman catalogue and Neill were removed: a catalogue printed twelve years before the event, and a historian who never mentions the naming, are not evidence for it, and six chips on a claim with no document behind it is the exact stacking this file forbids.",
    },
    // 5
    {
      tier: "documented",
      photo: "little-rome-7.jpg",
      keys: ["la_mission_du_madure_periodical"],
      note: "The Jesuits' own magazine (1930, pp.7–8) is the single witness, and it is verbatim for the sacristan: brother of a vicar general and of a convent superior, still serving the church at eighty-two, given the Bene Merenti medal by Pius XI. It does NOT support the quotation as the page uses it — \"two priests and a bishop… what a happy mother!\" stands in a different paragraph, about Bishop Roche's own family (the next sentence sends a gold rosary to \"la mère de Mgr Roche\"), and the sacristan's family had no bishop in it.",
    },
    // 6
    {
      tier: "tradition",
      photo: "little-rome-5.jpg",
      keys: ["rosariancr_fatimagiri"],
      note: "One witness: the Rosarian congregation's own website (the Knowledge Base files that appear to corroborate it all trace back to that single URL). \"Servant of God\" is the order's own usage with no Holy See decree in evidence, and the \"rocky hill above the village\" and the spread of the Rosarians from here have no source at all; the Bethany Sisters' document was removed because it concerns 1970 and says nothing of 1944 or the Rosarians.",
    },
  ],
  "town-of-learning": [
    // 0
    {
      tier: "documented",
      photo: "town-of-learning-1.jpg",
      keys: ["arsi_tolosana_1900", "arsi_tolosana_1914", "stuart_manual_1879", "auguste_jean_1894"],
      note: "Properly external and doubly documented: ARSI 1900 sets down the priest of Vadakkankulam as chaplain of the convent of Indian nuns of the Seven Sorrows and director of its school, ARSI 1914 says the same under Fr Caussanel, and Auguste Jean names this village among the four houses the sisters kept beyond Trichinopoly. Stuart's manual (1879) is added because it pushes the women's religious life of this town back to about 1864 — earlier than this dot's own year, and earlier than any parish record claims.",
    },
    // 1
    {
      tier: "tradition",
      photo: "town-of-learning-2.jpg",
      keys: ["souvenir_150yr", "diocese_thoothukudi_page"],
      note: "The dates are the parish's souvenir alone — the inspector of 1921, needlework, embroidery, lace and dress-making from 1922, the tailoring school passing wholly to the sisters in 1966 — and history_2026 was removed because it contains none of them: not 1921, not 1922, not 1966, not lace. The school itself is not in doubt: the diocese still lists the R.C. Lace Industrial School and the Osanam Sewing Institute among this parish's works.",
    },
    // 2
    {
      tier: "tradition",
      photo: "town-of-learning-3.jpg",
      keys: ["bethany_sisters_healing_ministry"],
      note: "Downgraded from documented: all three keys were parish-side, and two of them carried nothing — neither history_2026 nor the diocesan page has 1970, Fr Gnanam, Misereor, the forty beds or the twenty-five to thirty villages, so both are gone. The dot now rests where it always rested: on the Bethany Sisters' own first-person account, written for the parish's own souvenir — which is tradition, exactly as the 1944 Rosarian dot is tradition for the same reason.",
    },
  ],
  "shrine-and-the-saint": [
    // 0
    {
      tier: "tradition",
      photo: "shrine-and-the-saint-1.jpg",
      keys: ["souvenir_150yr", "diocese_thoothukudi_page"],
      note: "The declaration of 6 August 1993 by Bishop S. T. Amalanathar is attested only by the parish and the diocese reporting their own act — one institutional witness family, and no decree text is held; the souvenir is the source of the date and is now chipped for it. Every 1993 witness says the HOLY FAMILY church was declared a shrine: the Marian title is the shrine's present style, first attested in 2022, and must not be back-dated twenty-nine years.",
    },
    // 1
    {
      tier: "tradition",
      photo: "shrine-and-the-saint-2.jpg",
      keys: ["souvenir_150yr", "catholictamil_182"],
      note: "history_2026 was removed — it contains no \"2014\", no chariot and no Calvary chapel — leaving the souvenir as the single parish witness for the new ther, the chapel and the two statues. The same souvenir says the 1891 car was retired and repurposed, so 2014 is a NEW chariot: the dot must not re-imply the hundred-year continuity that the 1891 dot correctly denies.",
    },
    // 2
    {
      tier: "tradition",
      photo: "shrine-and-the-saint-3.jpg",
      keys: [],
      note: "Deliberately without a key: the only witness for the flag-mast is the parish's own souvenir (p.9), and this is the one dot where the page shows its \"no source outside this parish\" label instead of dressing a parish claim as evidence. The blessing of 6 August 2021 stands; \"crowned a season of renovation\" and \"as the shrine prepared for its 150th year\" are unsupported, and a fifty-foot flagstaff stood here long before 2021.",
    },
    // 3
    {
      tier: "documented",
      photo: "shrine-and-the-saint-4.jpg",
      keys: ["vatican_news_canonisation", "osservatore_romano_2012", "pope_francis_homily_2022", "holy_see_canonisation_rite_2022", "auguste_jean_1894", "diocese_thoothukudi_page"],
      note: "The best-documented dot on the page: the canonisation of 15 May 2022 is a public act of the Holy See, and the baptism in this church is Vatican-recorded. The RELIC is not at that tier — the oldest and only primary witness (Auguste Jean 1894, vol. I, p.203) says the church holds \"a part of his garment and the chains with which he was bound\", not a turban; the head-cloth and the annual glass-case exposition are the diocese's account, and should be attributed to it.",
    },
    // 4
    {
      tier: "documented",
      photo: "shrine-and-the-saint-6.jpg",
      keys: ["osservatore_romano_2012", "pope_francis_homily_2022", "ccbi_patron_laity_2025"],
      note: "Every step of the chain is externally documented: L'Osservatore Romano (5 December 2012, written by the cause's Vice-Postulator) for the recognition of the martyrdom and Cardinal Amato's beatification at Nagercoil, the homily of 15 May 2022 for the canonisation itself, and the CCBI for the decree of 16 July 2025 naming him Patron of the Laity in India. Note what the last one is: the Conference of Catholic Bishops of India reporting a decree of the Dicastery for Divine Worship — the chip now reads \"CCBI 2025\", not \"Holy See 2025\".",
    },
    // 5
    {
      tier: "tradition",
      photo: "shrine-and-the-saint-5.jpg",
      keys: ["census_2011", "maalaimalar_2022", "diocese_thoothukudi_page"],
      note: "Both external keys REFUTE the head-count the dot asserts: the 2011 census puts the whole town at 9,220 people (and 94.28% literacy, which the page cites and never shows), and the diocese's own page gives about 7,350 Catholics in about 1,600 families against the parish's 10,500 in 4,000 — the figure must be attributed, not asserted. Maalaimalar (5 August 2022) is added as the only external, non-parish witness to the living cult: it reports the chariot procession at about 1 a.m. on 15 August drawing roughly a lakh of pilgrims, many of them from Kerala.",
    },
  ],
};

/** What a citation chip says — “Pate 1917”, not the full title. */
export const SOURCE_SHORT: Record<string, string> = {
  "archives_lyon_burdin": "Archives de Lyon (Burdin)",
  "arsi_madurensis_1921": "ARSI 1921",
  "arsi_tolosana_1872": "ARSI 1872",
  "arsi_tolosana_1900": "ARSI 1900",
  "arsi_tolosana_1914": "ARSI 1914",
  "auguste_jean_1894": "Auguste Jean 1894",
  "bayly_1989": "Bayly 1989",
  "bell_inscription_photograph": "The bell itself",
  "besse_moumas_typescript": "Besse (Moumas tr.)",
  "dessal_gemert_1905": "Dessal 1905",
  "bertrand_1847": "Bertrand 1847",
  "bertrand_lettres_1865": "Bertrand 1865",
  "besse_1914": "Besse 1914",
  "bethany_sisters_healing_ministry": "Bethany Sisters",
  "bishop_stephen_jubilee_2022": "Bishop Stephen 2022",
  "boero_1853": "Boero 1853",
  "caldwell_1881": "Caldwell 1881",
  "ferroli_1951": "Ferroli 1951",
  "catholic_directory_1924": "Catholic Directory 1924",
  "catholictamil_182": "CatholicTamil",
  "ccbi_patron_laity_2025": "CCBI 2025",
  "census_2011": "Census 2011",
  "cronin_1959": "Cronin 1959",
  "debritto_prison_letter_1693": "de Britto 1693",
  "dessal_1902": "Dessal 1902",
  "diocese_thoothukudi_page": "Diocese page",
  "faber_1851": "Faber 1851",
  "hardgrave_1969": "Hardgrave 1969",
  "holy_see_canonisation_rite_2022": "Holy See 2022",
  "india_orientalis_christiana_1794": "Paulinus 1794",
  "jemparc_book450": "The parish diary",
  "la_mission_du_madure_periodical": "Mission du Maduré",
  "maalaimalar_2022": "Maalaimalar 2022",
  "mackenzie_1901": "Mackenzie 1901",
  "krishnaswami_ayyar_1934": "Gazetteer Suppl. 1934",
  "maldonado_1697": "Maldonado 1697",
  "neill_1985": "Neill 1985",
  "osservatore_romano_2012": "Osservatore Romano",
  "parish_english_history": "Parish history (English)",
  "pate_gazetteer_1917": "Pate 1917",
  "pope_francis_homily_2022": "Pope Francis 2022",
  "rosariancr_fatimagiri": "Rosarians (CR)",
  "souvenir_150yr": "150-Year Souvenir",
  "stuart_manual_1879": "Stuart 1879",
  "vatican_news_canonisation": "Vatican News",
};

/**
 * Shown where a moment has NO citation at all.
 *
 * There is one: the flag-mast of 2021, which rests on the parish's own jubilee book
 * and on nothing else — and the parish's own book is not evidence for the parish's
 * own claims. Saying so plainly costs us one line and buys the other fifty-two
 * their credibility.
 */
export const NO_SOURCE_LABEL: Record<"en" | "ta", string> = {
  en: "The parish's own record. No source outside this parish.",
  ta: "பங்கின் சொந்தப் பதிவு. பங்கிற்கு வெளியே எந்த ஆதாரமும் இல்லை.",
};

/** How each tier is named to a reader. Shown beside the year. */
export const TIER_LABEL: Record<Tier, { en: string; ta: string }> = {
  documented: { en: "Documented", ta: "ஆவணப்படுத்தப்பட்டது" },
  tradition: { en: "Parish tradition", ta: "பங்கு மரபு" },
  devotion: { en: "Devotion", ta: "பக்தி மரபு" },
};

/**
 * The citation for one moment — with its keys already in authority order.
 *
 * The sort happens HERE, not in the page, so every consumer gets the strongest
 * witness first and the parish's own book last without having to know that this is
 * the rule. This is the promise sources.ts makes in its header; this is where it is
 * kept.
 */
export const citationsFor = (eraId: string, dotIndex: number): DotCitation | undefined => {
  const cite = HISTORY_CITATIONS[eraId]?.[dotIndex];
  if (!cite) return undefined;
  return { ...cite, keys: sortKeys(cite.keys) };
};
