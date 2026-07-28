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
      keys: ["vatican_news_canonisation", "osservatore_romano_2012", "mackenzie_1901", "auguste_jean_1894", "bertrand_1847", "agur_1903"],
      note: "The strongest fact on the page, and now four-ways attested. The place comes from the Holy See (Vatican News) and the DATE — 14 May 1745, nine months' instruction — from L'Osservatore Romano, written by the cause's Vice-Postulator, not from the rite of canonisation, which recites only the name. Bertrand (1847) and Auguste Jean (1894) record the baptism here from the mission's own papers a century before any dossier existed (Auguste Jean follows Bertrand and is not a fully independent line). Added 25 Jul 2026: Mackenzie's Christianity in Travancore (1901, p.80) — a British administrator with no interest in the parish — is the outside witness, giving the man's standing (\"held office in the court of the Raja\"), his age (\"thirty-two years of age\") and the place. The prose no longer carries the canonisation forward-reference; that belongs to the Shrine era. Caste is off the page per the parish's rule: the Vatican biography's Nambudiri-father / Nair-mother parentage stays KB-side. ⭐ `agur_1903` ADDED 26 Jul 2026 — THE SAINT'S OWN WORDS, FROM A NON-CATHOLIC PEN. C. M. Agur's `Church History of Travancore` (1903, p.281) records what the waiting man said when Fr Buttari hesitated: \"There is no cause for delay. This is no compulsary baptism. I came here to receive the sacraments not by force, but by my own free will and desire. I shall even give up my life to maintain the Truth of which I received the light and of which I am convinced.\" The page now carries it, attributed in the prose to \"a Protestant historian of Travancore\" so the reader knows the quotation is not the parish quoting itself. ⚠ It is a NINETEENTH-CENTURY historian reporting an EIGHTEENTH-CENTURY conversation — he cites no document for it, so this is transmitted speech, not a minuted record, and the prose must never call it verbatim. ⚠ Agur spells the village at least three ways (Vadacancolam, Vadakkankulam, Vadakkanculam), which is why name-spelling sweeps missed him for months.",
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
      keys: ["holy_see_canonisation_rite_2022", "gnanapoo_tomb_photograph", "auguste_jean_1894", "bertrand_1847", "diocese_thoothukudi_page"],
      note: "⭐ HER TOMB WAS READ, 27 Jul 2026 — AND IT GAVE A DATE NO BOOK HERE HAD. The monument stands in the parish and is photographed (`146A9300.JPG`, in the picture folder since July, never opened). Its Tamil plaque names her as the wife of the martyr Devasahayam Pillai — ஞானப்பூ அம்மாள் — and gives **மறைவு: 1766**, the year of her death, which is now in the prose in both languages. An old black cross cut with INRI stands in the arch behind, plainly older than the tiled surround built around it since. ⚠ NAME NOTE, NOT A MISMATCH: the stone calls her “Gnanappu Ammal” (Ammal = lady) while the page says “Gnanapoo Theresa” — Theresa is her baptismal name from the written sources, Ammal the Tamil honorific on the grave. Both are right; do not ‘correct’ either. ✅ Chipped `gnanapoo_tomb_photograph`, archiveOnly, as with the bell, the decree and the priests’ plaques — the fourth object-source on this project. The execution of 14 January 1752 is documented in the near-contemporary Jesuit accounts, and Auguste Jean (vol. I, p.203) is the oldest witness that this church already held \"a part of his garment and the chains with which he was bound\". Bertrand's Vol IV (p.397) settles where the body went: gathered into the church of St Francis Xavier at Kottar, with the Te Deum sung in Cochin cathedral and the bishop's own panegyric — the garment and chains kept at Vadakkankulam are secondary relics beside that burial. Two of the dot's other details are not carried here: \"Kattadimalai\" appears in no historical source — the witnesses describe the Travancore lines at the Aralvaimozhi gap and never name the spot — and the head-turban relic is the diocese's modern account, which has quietly displaced the chains.",
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
      note: "NEW DOT, 26 Jul 2026, and the strongest thing in the 1803 file: Dessal p.58 says the FIRST account was in verse, five stanzas, composed immediately after the event by the village schoolmaster, who had seen it himself and whom p.59 identifies as a worshipper of Siva. ⚠ THE SONG'S OWN WORDS ARE NOT HELD, AND MUST NEVER BE SUPPLIED. Dessal states outright that he is printing \"la substance du chant et de son commentaire, abstraction faite de la poésie et du rythme\" — the substance, with the verse deliberately stripped out — so no book on this disk carries a line of it, and a full-corpus sweep for the stanzas (26 Jul) returned nothing in any language. The dot therefore says what the song was and what was built on it, quotes Dessal's own admission of what he left out, and closes by saying the verse did not survive. The one place it might still exist is BESSE'S OWN POINTER: La Gerbe du Maduré, July–August 1911, pp.135ff (AFSI Toulouse, cote FMd403), which Besse cites as the fuller discussion of the miracle and which nobody here has read — top of the archive-request list. Sebastian Pillai was dropped from the prose at the owner's instruction (the song carries the point; his name added nothing a reader needs), but he is not deleted from the record: he is the SECOND hand, his account \"reproduces the first exactly, paraphrases and completes it\", he never claims to have been present, and that correction is logged as Mismatch J5. \"A worshipper of Siva\" is the owner's chosen wording for Dessal's \"tout païen\" / \"sectateur de Siva\" — the point of the moment is that the first witness to set it down was not a Christian.",
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
      note: "Bertrand's own journal, first-person, and the whole dot is his: Lettres vol. II, Seventh Letter, to Fr Renault, Provincial of Lyon, dated Palamcottah, December 1839. Re-read whole 26 Jul 2026 and the dot was rebuilt on it. The letter's frame is the Vicar Apostolic's SIX-MONTH visitation of the mission, and it is here that the two men separated: \"Monseigneur voulut que je me séparasse de lui pour célébrer la grande neuvaine et la fête solennelle de saint François-Xavier à Vadakencoulam\", while the bishop went down to the coast alone — \"pendant que je célébrais la fête de saint François-Xavier à Vadakencoulam\" (p.169), which also settles that Bertrand kept the feast here and not merely the opening. The week's journal (p.174–175) supplies the whole grind verbatim, and MOST OF IT WAS CUT ON PURPOSE (owner, 26 Jul): the confessions to nine at night, the 2 a.m. masses, the hundred and thirty confessions, the burning sun and his closing \"il y a une limite à tout\" all happened at Viravanellour, Soganapéry and Putécalenviley, not here — a fine story about Bertrand and not a story about this village. The dot keeps only what is Vadakkankulam's: that the superior of the whole mission left his bishop to come and keep this village's feast, the night ride in, and the Mass that opened nine days of feast and the year's sacraments. The rest stays in the leaf, where a reader who wants it will find the page. IDENTIFICATION: Bertrand's \"Mgr de Drusipare\" is Bonnand — Neill p.280, \"On 8 November 1833 Fr Bonnand was consecrated as coadjutor of Pondicheri with the title of bishop of Drusipara\". He is NOT named in the prose and Neill is NOT chipped, because the dot does not turn on who the bishop was; the identification is recorded here and in KB file 06. The coast quarrel is described in the prose only as a dispute over churches that had reached the courts: the letter's own account of it is heavy with caste and with the Goa-jurisdiction schism, and neither belongs in the narrative. The leaf page (printed 175) was checked and is caste-clean, so it shows its scan un-windowed. NOT asserted in the prose: that St Francis Xavier was the church's titular at this date — that is the natural reading and KB 02 §4.1a argues it, but Mismatch I1 holds three competing readings of the titular, so the page says only that he kept the feast.",
    },
    // 2
    {
      tier: "documented",
      photo: "great-two-nave-church-8.jpg",
      keys: ["canoz_letter_1849", "auguste_jean_1894", "parish_english_history"],
      note: "UPGRADED tradition → documented, 26 Jul 2026, on the audit's #1 recommendation (KB file 20, B29). The dot used to rest on Auguste Jean p.301, who attests only that Canoz \"visited Vadakenkoulam\" — but CANOZ'S OWN LETTER is in the library and was never wired up: Lettres vol. I, Fifty-third Letter, Trichinopoly, March 1849, p.250 — \"je rentrai dans notre mission par Vadakencoulam, grande et bonne chrétienté dont je fis la visite\". First-person, from the bishop who would bless both the foundation stone in 1855 and the finished church in 1872. NOTE THE VOLUME: this is vol. I and needed a new source id; bertrand_lettres_1865 is vol. II. The same letter dates the visitation (on the road since January 1848), gives its scale (12,000+ confirmed, ~20,000 confessions) and puts Fr Grégoire in the bishop's party all year — the man who would then spend seventeen years building the church. WHAT CANOZ DOES NOT SAY: one word about money or a new church. The 21 June date and the request itself remain the parish's own memory alone, which is why they carry a reader-facing footnote rather than being asserted as his. The prose deliberately does not hedge them in the sentence — the footnote does that job.",
    },
    // 3
    {
      tier: "documented",
      photo: "great-two-nave-church-9.jpg",
      keys: ["canoz_biography_1891", "auguste_jean_1894", "trento_2022", "souvenir_150yr"],
      note: "⚠⚠ REVERSED WITHIN THE HOUR, 27 Jul 2026 — READ THIS BEFORE TOUCHING THE BILDERBECK GIFT AGAIN. I removed the family's thanksgiving gift from this dot on a misreading of the owner's instruction, and the owner corrected it immediately and unambiguously: **“I didn't tell you to remove. The money came from three places… they could have donated earlier and the church could have started later. No issues, but they donated.”** THE GIFT IS RESTORED, WORD FOR WORD, AND THE TWO CHIPS WITH IT (`trento_2022`, `souvenir_150yr`). ✅ WHAT ACTUALLY CHANGED IS THE DATE, WHICH IS ALL THE OWNER EVER ASKED FOR: this dot's year label was **`1838–1855`**, and that range was the whole problem — it forced the gift into a window that opens twenty-one years after Trento's date for Christopher Bilderbeck's death (1817), which is what made the dot look self-contradicting beside `the-weeping-madonna`'s “died here in 1817”. The label is now **`by 1855`**, which says only that the money was gathered before the stone was laid and asserts nothing about when any part of it was given. THE OWNER'S REASONING, AND IT IS SOUND: a benefactor may give years before the building starts. ⛔ **DO NOT RE-OPEN THIS AS A CHRONOLOGY PROBLEM.** It is settled, and settled by the owner, twice. The apparent conflict was an artefact of a date range this page had no need to assert. ⚠ Note for anyone tempted to go further: the parish's own account that this gift was the seed money the work began with is NOT in any source held here — the sources say only that the family contributed generously, and no figure exists anywhere. The prose therefore still says what was given and never how much, or that it came first. Earlier audit follows. TIER: tradition → DOCUMENTED, 26 Jul 2026, and it was EARNED BY REORDERING, not by promotion. The dot previously opened with four sentences of the boon, which no source outside this parish records, so the badge would have been describing the one claim no outsider wrote down. It now opens on the funding, whose spine is two external printed books: Canoz's 1891 biography for the bishop's eighteen years at two thousand francs a year, and Auguste Jean 1894 for Grégoire's persevering energy. Christopher as \"the European merchant\" is Trento, and \"past fifty\" is Trento's c.1758 against Badley/CMS's 1809. THE PARISH-ONLY STRAND IS STILL IN THERE and is deliberately placed third: the twenty-seven childless years, the prayer, the boon and the family's gift. A reader sees it is parish-side because the 150-Year Souvenir chip sits in the row. ⚠ IF ANYONE EVER REORDERS THIS DOT TO OPEN ON THE BILDERBECKS AGAIN, THE TIER MUST GO BACK TO TRADITION. The badge and the running order are tied together here, on purpose. ⭐ THE AMOUNT, FOUND 26 Jul 2026. The owner asked for a figure and I reported there was none; that was right for the family's gift and for the village's collection, and WRONG for the whole dot. The Canoz biography of 1891 has one: the bishop approved the plan and then \"pendant dix-huit ans, donna au moins deux mille francs par an pour sa construction\" — at least two thousand francs a year for eighteen years. It is printed, external to the parish, and it is the only figure anyone ever put on this building. Its leaf is windowed to the bare sentence because the page around it is the caste history of 1872–76. STILL TRUE: no source anywhere gives a figure for the Bilderbeck gift or the villagers' collection, so the prose still says what was given and never how much for those two. AGE ADDED 26 Jul 2026, and it is ARITHMETIC, not a stated fact: Trento gives Christopher Bilderbeck's birth as \"around 1758\"; Badley 1886 and the CMS obituary give his son John's birth as 1809; 1809 − 1758 = about fifty-one. Because the birth year is explicitly approximate, the prose says \"past fifty\" and NOT \"fifty-one\" — do not tighten it. The same arithmetic is what makes the twenty-seven years credible: 1809 − 27 = a marriage in 1782, when he was about twenty-four, which is unremarkable. ⚠ THE WIFE CANNOT BE FOUND. Swept 26 Jul across all three corpora: no name, no age, no birth year, no marriage record. The souvenir has \"Mr Jendrik and his wife\"; the shrine board has \"a French couple named Henrique\" (the husband's name used for the pair); history_2026 names only the husband; the family genealogy page gives Christopher and not her. The single source that touches her directly is the Trento footnote the project has decided not to publish. Closing this needs parish registers or Madras church records, not more reading — do not re-run the search. ⚠ ALSO KNOWN AND DELIBERATELY NOT ON THE PAGE (owner, 26 Jul): a strictly childless couple sits awkwardly beside Henriette, who is Christopher's daughter and is in the church at the 1803 weeping, six years before John. The owner's ruling is that the twenty-seven years holds and the tension is not to be raised in the prose. The likeliest reconciliation is that the boon belongs to about 1808 rather than to the 1803 apparition, which village memory has drawn together because the same family stands in both.\nSHAPED BY THE OWNER, 26 Jul 2026: the dot is now the whole answer to \"how was it paid for\" — the family's thanksgiving gift, the village's own seven years of saving, and Fr Grégoire driving it. ⚠ \"TWENTY-SEVEN YEARS\" STANDS WITH NO SOURCE ON THE SITE, BY THE OWNER'S EXPLICIT DECISION. Its only surviving witness we hold is the photographed shrine board (PIcs/Album 1/20260713_112102.jpg, \"childless for 27 years\"); history_2026 carried it and was struck 24 Jul, and vadavaimatha.net merely mirrors the parish. The owner was offered the board as a quote-only source like the bell inscription and declined, so the figure rests on the tradition badge alone. IT CAN BE CHIPPED THE DAY THE BOARD IS WIRED IN — do not quietly delete it, and do not quietly source it to history_2026. ⚠ NO MONEY FIGURE EXISTS ANYWHERE IN THE CORPUS, for the family's gift or for the village's collection — searched 26 Jul, the sources say only \"contributed generously\". The prose therefore says what was gathered and never how much. Grégoire's line is Auguste Jean's own and is properly chipped. Earlier audit, still standing:\nREWRITTEN 26 Jul 2026 after `_extraction/deep_bilderbeck_funding.md` was re-read. TWO CLAIMS WERE CUT BECAUSE NOTHING ON THE SITE CARRIES THEM ANY MORE. (1) \"Twenty-seven years without a child\" and the garbled name \"Hentriett Belderk\" came from history_2026, struck from the site 24 Jul; the souvenir does NOT have either. (2) \"What they gave toward the NEW BUILDING\" — the great-church attribution — came from the same struck compilation and from the diocesan page, which copies it. ⭐ THE PARISH'S OWN SHRINE BOARD (photographed, PIcs/Album 1/20260713_112102.jpg) puts the gift on the MATHA SHRINE, the chapel that holds the weeping statue, not on the great church: \"This Shrine was built as a token of gratitude to Mother Mary for granting a child to a French couple named Henrique who were childless for 27 years.\" That version is the only one that survives the chronology — a votive chapel after the son's birth in 1809 fits inside Christopher Bilderbeck's lifetime; a gift to a stone laid in 1855 does not, since Trento dates his death to 1817. The owner chose (26 Jul) to tell the shrine version but NOT to wire the board in as a source, so the prose now names no building at all (\"What they gave, they gave in thanksgiving\") and the reader-facing footnote carries the shrine point. The board photograph stays an open acquisition: the PIcs catalog says it needs re-shooting square-on before it could be cited the way the bell inscription is. Auguste Jean remains the outside check — persevering energy, no lay benefactor named in two volumes. The souvenir's ambiguous-match warning is CORRECT and not a bug: the jubilee book prints the boon story three times, on pages 3, 5 and 6.",
    },
    // 4
    {
      tier: "documented",
      photo: "great-two-nave-church-2.jpg",
      keys: ["katholische_missionen_1885", "canoz_biography_1891", "parish_english_history", "diocese_thoothukudi_page"],
      note: "⭐⭐ TIER tradition → DOCUMENTED, 26 Jul 2026, because the motto is NO LONGER PARISH-ONLY. `Die Katholischen Missionen`, the German Catholic monthly, March 1885, printed page 68, prints the whole distich with a German verse rendering under it — thirteen years after the church was blessed, in Freiburg, by people with no stake in this parish. The old note on this dot said the motto survived \"only in parish-side books\"; that was true until this book was read, and it is now false. THREE THINGS THE GERMAN PRINTING SETTLES. (1) It corrects the Latin: the parish books transcribe the second line as \"tribulis ingemnis\", which is not Latin and which this file previously flagged as textually corrupt; 1885 reads \"tribubus geminis\", for the twin tribes, and the parish text is plainly a garble of it. Logged as Mismatch J9. (2) It places the inscription AT THE ALTAR (\"Altare angebrachte\"), not on the foundation stone — which matters, because nobody has ever inspected the stone and this page must still not say the words were cut into it. (3) Its first line reads \"una sed omnibus Ara\", one altar FOR ALL, which is where the prose's \"and that one altar for all\" comes from — a documented phrase, and caste-free. ⚠ THE SECOND LINE IS THE CASTE LINE and stays out of the prose in both languages; the leaf carries it, windowed, as the evidence layer is entitled to. ⚠ STILL PARISH-ONLY INSIDE THIS DOCUMENTED DOT: the date 9 August 1855 itself. No outside source gives a day for the stone. The tier rests on the plan, the bishop's approval and the motto, all documented; the day is the parish's precision and is not separately attested. ⭐ NEW SOURCE 26 Jul 2026 — `canoz_biography_1891` (the 1891 life of Bishop Canoz, printed Paris, NOT a parish book). It dates the acceptance of the plan to 1854, a year before the stone, and says it cost Fr Grégoire effort: he \"parvint, non sans peine\". ⚠ ITS LEAF IS REFUSED BY THE CASTE GUARD AND THAT IS CORRECT — the biographer's sentence runs the 1854 acceptance and the caste settlement together in one breath, so there is no honest window and the chip falls back to /sources, exactly as it does on dot 9. The FACT is documented and stays; the PAGE cannot be reproduced. Do not re-anchor it to \"fix\" the build report. Note also that the corpus holds this book under THREE filenames (Anonyme_, Pere_, Peres_) which are byte-identical — one witness, never three. Earlier audit, still standing: Auguste Jean was removed: he says nothing about 1855, the stone, or the motto. Bishop Canoz's blessing of the foundation stone on 9 August 1855 and the motto \"Templum sit duplex, ara sed una\" survive only in parish-side books (possibly one book counted twice), the Latin is textually corrupt where the page does not quote it, and history_2026 says only that a priest COMPOSED a verse — nobody has ever inspected the stone, so the page must not say the words were cut into it.",
    },
    // 5
    {
      tier: "documented",
      photo: "great-two-nave-church-3.jpg",
      keys: ["arsi_tolosana_1872", "katholische_missionen_1885", "canoz_biography_1891", "auguste_jean_1894", "dessal_1902", "parish_english_history"],
      note: "Independently documented in Rome: the Society's own 1872 catalogue lists Fr Grégoire at Vadakencoulam with Br Joseph Bergenthal entered as \"Ædif. eccl.\" — builder of the church — in the very year it was blessed. But \"the apostle of Vadakenkoulam\" and \"probably without equal in the world\" are both Auguste Jean's phrases (p.446): ONE chronicler, not the several the page implies, and the chunam-and-toddy mortar is parish-side.",
    },
    // 6
    {
      tier: "documented",
      photo: "great-two-nave-church-4.jpg",
      keys: ["bell_inscription_photograph", "auguste_jean_1894", "parish_english_history", "catholictamil_182", "souvenir_150yr"],
      note: "⭐⭐ REBUILT ON THE OBJECT, 26 Jul 2026, and RE-UPGRADED tradition → documented — but for the opposite reason to last time. A full four-language sweep of all three corpora was run for the bells (cloche/Glocke/bell/campana, Casimir, Valence, Drôme, Burdin) and THE RESULT IS THAT ALMOST NOTHING IS IN THE BOOKS. The only printed mention of these bells anywhere near this village is Dessal's 1905 jubilee article, where the Virgin goes through the streets at the 1903 centenary “au son des cloches et des tam-tams” — atmospheric, not evidential. Auguste Jean's “two great bells” (p.467) are Trichinopoly’s and Dessal 1902’s bell drama is Tuticorin’s; both are known false leads and must never be imported. WHAT MAKES THIS DOCUMENTED IS THE BRONZE ITSELF: cast “Vve GRÉGOIRE, VALENCE (DRÔME)” + “…ATEUR CASIMIR GRÉGOIRE” — a primary document made in France in 1861 by the people who cast it, external to this parish in every sense. ⚠⚠ `archives_lyon_burdin` WAS REMOVED FROM THIS DOT AND ITS LEAF DELETED. It propped up “Lyon, by Burdin”, which the object refutes; keeping a chip that corroborates a refuted claim is worse than having no chip. DO NOT RESTORE IT. The Lyon/Burdin reading survives only in `catholictamil_182`, which is kept because the journey and the year 1861 rest on it alone — and its foundry claim is now flagged in its own leaf and is repeated nowhere on this site. Mismatch J10. ⭐ auguste_jean_1894 was ADDED for the convergence: he has Fr Joseph Grégoire born “à Valence en Dauphiné”, the same town whose foundry cast the bells and whose Grégoire paid for them. The dot states the three-fold coincidence and leaves the inference — that these were his own family’s gift — to the reader; the KB (file 04 §2.1) records it as inference, not fact. Parish-side and woven in: the year 1861, the crates and the sea (catholictamil), the bell in each of the two towers (parish English history), and the sweetness of the sound (souvenir). Superseded audit note follows. Downgraded to tradition — the dot's own note called it single-witness parish tradition while it wore a Documented badge. The photograph of the bell now settles the one thing paper could not (the bronze reads \"…GRÉGOIRE DE VALENCE…\" and \"…ATEUR CASIMIR GRÉGOIRE\", naming the donor the parish souvenir disputes) and the Lyon archives confirm only that the Burdin foundry existed and exported widely; 1861, the crates to Madras and the hanging all rest on one Tamil parish page — and the bells hung in TWO ninety-two-foot towers, one in each, not in a single tower.",
    },
    // 7
    {
      tier: "documented",
      photo: "great-two-nave-church-10.jpg",
      keys: ["tomb_plaques_photographs", "auguste_jean_1894", "dessal_1902"],
      note: "Re-read 26 Jul 2026 and both men are now Auguste Jean's, verbatim. Rossignol's inscription is exact: \"La piété des chrétiens de Vadakenkoulam a élevé, près de leur église, un modeste tombeau au P. Eugène Rossignol, mort le 25 janvier 1863. C'est en donnant ses soins aux chrétiens de Callikoulam, alors affligés du choléra, qu'il contracta la maladie dont il mourut.\" And Delpech's death is his too: \"Il mourut dans les bras du P. Pouget, à Vadakenkoulam, un samedi… la veille de la fête du très saint Nom de Jésus\" — and it was the FEVERS, not the cholera, which is Rossignol's. The Saturday and the eve of the Holy Name are now in the prose because they are Jean's own words; THE DATE IS STILL NOT, and must not be. ⚠ THE TAMIL DOT WAS CARRYING THE AUDIT NOTE AS PROSE — it ended \"Dessal gives 16 January 1887; Auguste Jean says only that it was a Saturday\", which is an editor's note written into the story, exactly what the English was cleaned of on 23 Jul. Rewritten 26 Jul. The date itself stays off both languages: Mismatch A9 flagged Dessal's printed digit as OCR-broken (\"1()\"), and on 26 Jul 2026 THE PAGE WAS RENDERED AND THE DIGIT READ: Dessal prints \"le 16 janvier 1887\", cleanly. That does not settle the date — it sharpens the conflict, because the pre-1913 calendar puts the Holy Name on Sunday 16 January 1887, whose eve is SATURDAY 15, and Auguste Jean says he died on a Saturday. So the two witnesses genuinely disagree by a day and neither can be quietly preferred; the page still gives the weekday and the feast instead of a number nobody can stand behind. Superseded audit follows. Auguste Jean's Nécrologe carries the tomb verbatim: the Christians of Vadakenkoulam raised a modest tomb beside their church to Fr Eugène Rossignol, dead on 25 January 1863 of the cholera he caught nursing the Christians of Callikoulam. The date of Fr Delpech's death, 16 January 1887, is DESSAL's alone — Auguste Jean says he died \"un samedi\", a Saturday, and 16 January 1887 was a Sunday — so the date must be attributed, not asserted.",
    },
    // 8
    {
      tier: "documented",
      photo: "great-two-nave-church-7.jpg",
      keys: ["stuart_manual_1879", "auguste_jean_1894"],
      note: "⭐ REBUILT 26 Jul 2026, and it resolves a contradiction the site was carrying without noticing. Stuart puts a convent of native nuns HERE about 1864; the Town of Learning era opens with the Sisters of Our Lady of the Seven Sorrows — a congregation Auguste Jean dates precisely to 21 OCTOBER 1876. Twelve years apart: they cannot be the same body, and nobody had spotted it because the two facts sat in different eras. Auguste Jean (p.416) explains it: the mission had been gathering Indian women into religious life under the Marie Réparatrice sisters SINCE 1859, and \"nearly twenty years passed\" before they were constituted as an order. The women here in 1864 belong to that earlier, unconstituted body — which is now what the dot says. Stuart also supplies the scale, newly used: SEVENTEEN Indian sisters and twelve European ones in the whole Tinnevelly mission, and this the only convent away from the fishery coast. ⚠ The Auguste Jean leaf is WINDOWED: the same chapter runs on into which communities could enter which congregation. ⚠ PAGE 416 WAS A HAND-VERIFIED OVERRIDE (Mismatch J3) because the build computed 444, against the page's own running head \"4 l6 DEUXIÈME PARTIE. CHAPITRE IV.\" — a garbled 416. THAT 28-PAGE GAP WAS THE SYMPTOM OF A BUG, NOT A ONE-OFF: Auguste Jean's manifest offset was 0 and should have been 28, so every un-overridden leaf in this book was printing a page number 28 too high. Fixed at source 26 Jul 2026 and the override is now merely belt-and-braces. Seven books were wrong the same way — see the source note on great-two-nave-church:11. ⚠ This anchor also exposed a real bug in build_references.py: clean_page de-hyphenated only \"-\n\", so in extractions that separate lines with a BLANK line — Auguste Jean's does throughout — words stayed broken (\"reli-\n\ngieuses\") and any anchor crossing one reported ANCHOR NOT FOUND. Fixed to \"-\n+\"; the site gained a leaf from the fix alone. Earlier audit follows. Stuart's district manual (1879, p.62) is the entire dot, and it is the kind of witness this page is built on: a British official with no interest in flattering the parish, listing \"A Convent for Native Nuns at Vadakankulam\" among the mission's three convents around 1864 — the only one away from the fishery coast. No parish record dates a convent here so early; the outside source remembers the sisters that our own books forgot.",
    },
    // 9
    {
      tier: "documented",
      photo: "great-two-nave-church-5.jpg",
      keys: ["pate_gazetteer_1917", "katholische_missionen_1885", "canoz_biography_1891", "auguste_jean_1894", "parish_english_history"],
      note: "The completion of \"the present handsome church… in 1872\" stands in a British government gazetteer — the single best external anchor on the page — and the plan of two converging naves meeting in a common chancel is described from outside the parish as well as within it. Keep the hedge: all three Jesuit witnesses say \"probably\" or \"perhaps\" without equal in the world, never flatly. The ninety-two-foot towers, the vegetable dyes and the \"Little Rome\" naming are parish-side, not documented.",
    },
    // 10
    {
      tier: "documented",
      // PLACEHOLDER — shares dot 9's picture. All eleven paintings for this era were
      // already spoken for when this dot was added; it needs its own: 27 June 1872, the
      // bishop received at the little chapel of St Aloysius. Prompt drafted for the owner.
      photo: "great-two-nave-church-5.jpg",
      keys: ["canoz_biography_1891", "parish_english_history"],
      note: "NEW DOT, 26 Jul 2026, at the owner's request — the era had the church finished and blessed in a single "
        + "clause and never told the opening at all. The record is FR GRÉGOIRE'S OWN PRIVATE NOTEBOOK, quoted at "
        + "length in the parish English history p.43: the bishop arriving on 27 June with Fr Verdier and Fr Boyer, the "
        + "reception at the chapel of St Aloysius, Frs Poughet, Guchen, Fernandez and Victor, the benediction at 5 p.m., "
        + "Br Bergenthal present at the blessing of the building he had drawn, the bishop's silver jubilee kept here, "
        + "and on 29 June the Pontifical Mass at which Canoz \"declared it dedicated to the Holy Family\". THAT LAST "
        + "CLAUSE IS THE TITULAR HINGE the KB has tracked for months (Mismatch I1): it dates the Holy Family dedication "
        + "this church still carries. Tiered documented because the spine — Canoz here on 29 June 1872 for the feast of "
        + "the Holy Apostles and his own twenty-fifth anniversary — is independently in the 1891 Canoz biography p.294, "
        + "printed in Paris. PARISH-SIDE AND WOVEN IN: the 27 June arrival, the names of the priests, the chapel of St "
        + "Aloysius and the 5 p.m. hour, all from Grégoire's notebook as the parish book transmits it. ⚠ NO ATTENDANCE "
        + "FIGURE EXISTS — swept 26 Jul across all three corpora; \"with great pomp\" is as quantitative as any source "
        + "gets, and nothing is to be invented. ⚠ The 1891 biography adds, on the same page, that the caste trouble "
        + "broke out that very week; that is the parish's excluded history and stays off the page. ⭐ ACQUISITION LEAD: "
        + "FR GUCHEN WAS IN THE CHURCH THAT DAY and later published Cinquante ans au Maduré (2 vols., Trichinopoly, "
        + "1887–89), which Bayly cites at II, pp.248–50 FOR THIS CHURCH. Not held; AFSI Toulouse FMd358. An eyewitness "
        + "of this ceremony who wrote a book about the building is the best unread source this era has.",
    },
    // 11
    {
      tier: "documented",
      photo: "great-two-nave-church-11.jpg",
      keys: ["auguste_jean_1894", "dessal_1902"],
      note: "⭐⭐ REBUILT 26 Jul 2026, AND A MISMATCH THIS SITE PUBLISHED FOR MONTHS TURNED OUT NOT TO EXIST. The dot was headed \"1873 or 1875\" and carried a reader-facing footnote saying the two chroniclers differed on the year. They do not. Dessal's footnote (p.166) was RENDERED FROM THE SCAN and prints, in clean type, \"il mourut dans la traversée de la mer Rouge, le 19 septembre 1873\" — the same year as Auguste Jean. Our extraction of that line reads \"18715\", and somebody (me) resolved the damaged glyph as 1875 and wrote a disagreement into the page. ⚠ THE LESSON, and it is worth keeping: A MISMATCH BETWEEN TWO SOURCES AND A MISMATCH BETWEEN TWO OCR GUESSES LOOK IDENTICAL IN THE EXTRACTED TEXT. Before logging a numeric disagreement in the register, render the page. Mismatch A8 is now marked DISSOLVED — not adjudicated in favour of one witness, but withdrawn, because there never were two witnesses. The same rendering incidentally CONFIRMS Dessal's \"16 janvier 1887\" for Fr Delpech's death (dot 7), whose digit the register had flagged as OCR-broken — so A9's conflict with Auguste Jean's \"un samedi\" is real and stands. ⭐ NEW LEAF, AND IT REPLACES A DUPLICATE. This dot and dot 7 were both anchored on the very same Dessal footnote — one page doing two jobs. Dot 11 now opens Dessal p.405 instead: FR VERDIER'S LETTER TO FR DELPECH, Tuticorin, 27 August 1873, whose postscript is the whole reason Delpech was on that ship — \"He will need a travelling companion; and perhaps Jesus will choose you for that office of charity.\" Three weeks later he was anointing Grégoire in the Red Sea. That letter is also the INDEPENDENT DATING that settles the year from inside Dessal's own book: a letter of August 1873 saying \"I know nothing definite yet\" cannot precede a death in 1875. The page is caste-clean throughout and shows its full scan un-windowed. ⚠ WHAT IS STILL A REAL DIVERGENCE: who sent him home. Auguste Jean — \"il accepta l'invitation de ses supérieurs\"; Dessal — \"sur l'avis des médecins\". The prose therefore says only \"they sent him home\" and names neither, and the footnote gives the reader both. ⚠ DELPECH IS NAMED ON DESSAL'S AUTHORITY, NOT JEAN'S: Auguste Jean says only \"le Père qui l'accompagnait\" administered Extreme Unction. Both Dessal pages name him. ⭐⭐ THE CAUSE OF HIS COLLAPSE IS NOW ON THE PAGE, ON THE OWNER'S EXPLICIT INSTRUCTION, 26 Jul 2026 — AND IT DOES NOT BREAK THE CASTE RULE. The dot as first written told the voyage and the death and left out why he collapsed, and the owner's objection was exactly right: without it this is a fine story about two priests and a ship and NOT a story about this village. What makes it the village's story is that the church broke apart on the day it opened and the grief of it killed the man who built it. AUGUSTE JEAN'S SENTENCE ON p.447 NAMES NO CASTE: \"prirent possession du nouveau sanctuaire. Obligé de témoigner devant la justice contre une partie de ses ouailles, le bon Père en ressentit une douleur qui lui fit perdre le manger et le dormir.\" The prose now carries all of it — the opening day, the split, the litigation, the evidence given against a part of his own flock, the lost eating and sleeping — and states NOTHING about what divided them. ⚠ THE LINE, PRECISELY, SO NOBODY MOVES IT BY ACCIDENT: the page may say THAT the congregation divided and went to law; it may NOT say what the division was about. The caste words are in the preceding sentence, on p.446, and stay out of both languages. ⚠ IT IS ALSO SAFE IN THE EVIDENCE LAYER, AND THIS WAS CHECKED, NOT ASSUMED: the leaf window opens on \"prirent possession…\" because the page break falls exactly between the caste clause and this sentence, so a reader who opens the book sees the quoted line and not the material it follows. If this anchor is ever moved earlier, that stops being true. ⚠ NOT ASSERTED, THOUGH TWO BOOKS INVITE IT: that the grief KILLED him. Jean gives the sequence and no verdict; the 1891 Canoz biography p.294 says a missionary \"en mourut de douleur\" of this same trouble but does not name him (Mismatch I5). The prose lays the sequence down in order and lets the reader draw the line. ⚠ Do not reword to imply the BUILDING did it — Jean's own structure is a contrast: the building cost him cares and fatigues, \"mais une peine bien plus sensible lui vint\" from what came after, and the dot keeps that hinge. ⚠ THE TAMIL DOT WAS AGAIN CARRYING THE AUDIT NOTE AS PROSE — it ended by telling the reader that the two chroniclers agreed on the day and differed on the year, the same fault cleaned out of dot 7 on this date, and by then the claim was false as well as editorial. Rewritten, and its title corrected from \"Fr Grégoire dies at sea\" to match the English \"The Red Sea\". Verbatim and newly used from Jean p.447: the extreme exhaustion from continual sleeplessness, the few drops of broth at supper, the eyes opened at six without speech, and \"vers 2 heures\". Delpech's return and death in this village is Dessal's footnote and ties the dot back to dot 7.",
    },
  ],
  "little-rome": [
    // 0  (1889 — Christmas night; NEW, and the era's new opening)
    {
      tier: "documented",
      // PLACEHOLDER — shares dot 1's picture. All seven paintings for this era were
      // already spoken for when this dot was added; it needs its own: the inside of
      // the church near midnight, the congregation barefoot on the flagstones in
      // white, one large candelabrum, the wax Infant with its arms out.
      photo: "little-rome-1.jpg",
      keys: ["the_month_1889", "etudes_1889"],
      note: "⭐⭐ NEW DOT AND NEW ERA OPENING, 26 Jul 2026, on the owner's ruling that the era widen from 1891 to 1889 so this could be told. The era used to open on an object (the 1891 ther); it now opens on an outsider walking into the finished church and writing down what he saw. THE SOURCE IS ONE EYEWITNESS ACCOUNT PRINTED TWICE, IN TWO LANGUAGES: \"A Visit to the Pearl Fishery Coast, Part the Fourth\", in `The Month` (the English Jesuit monthly), October 1889, and in `Études` vol.46, 1889 — the French original of the same narrative. Two printings of one witness, never two witnesses; they are chipped together because a reader who cannot read one can read the other, and the note says plainly that they are one voice. EVERYTHING IN THE PROSE IS HIS: the four o'clock arrival, the wide façade at the end of a long street decked with bunting, the two thousand people who received them with shouts, the church entered shortly before midnight, the Christians \"silently and stealthily as ghosts… draped in their long white cloths… barefoot over the flagstones\", the pale light of the large candelabrum on their faces, the wax figure of the Infant Jesus with its arms extended, and the two naves taking up the singing alternately, each led by its own catechist. ⚠ THE CASTE LINE, AND WHERE IT FALLS. The writer explains the two naves by the division and names the groups; that explanation and those names are OFF THE PAGE in both languages, exactly as everywhere else. What IS on the page is the thing he saw and not the thing he explained: the two naves singing in turn, each with its catechist, and then — his own sentence — that at the Communion \"every one rose from his knees… all distinctions were lost sight of at the Holy Table; they were all the children of God, of one heart, one soul.\" ⚠ HIS SENTENCE ENDS ON THE CASTE WORD (\"one caste\") AND THE PROSE STOPS BEFORE IT. That is a truncation, not a paraphrase, and it is honest: the clause quoted is his, unaltered, and the leaf carries the rest. DO NOT RESTORE THE FINAL WORDS TO THE PROSE. ⭐ WHY THIS MATTERS EVIDENTIALLY: an outside witness in 1888 saw the 1855 motto — one altar for all — actually happen at the Communion rail, TWENTY-TWO YEARS BEFORE THE PARTITION CAME DOWN. The page has never had that. ⚠ DATING: the visit is the Christmas of 1888; the account is published October 1889. The dot is headed 1889 for the printing, and the prose says \"that Christmas\" rather than giving a year, because the writer never dates the night himself. ⚠ THE SAME ARTICLE ALSO CARRIES the hereditary sacristan (used on dot 6) and the inspection of the Devasahayam relics (used on shrine-and-the-saint:3) — one page of one magazine now serving three dots across two eras, which is why it is worth wiring properly rather than quoting loose.",
    },
    // 1
    {
      tier: "documented",
      photo: "little-rome-1.jpg",
      keys: ["agur_1903", "maalaimalar_2022", "souvenir_150yr", "catholictamil_182"],
      note: "The 1891 chariot is parish record — the souvenir and the Tamil page are one witness family, not two — and the souvenir is now chipped openly rather than hidden behind its retellings. That same souvenir refutes any implied continuity: the thirty-five-foot car was RETIRED and repurposed as the cradle of the Pilgrims' Mother, and the ther that processes today was newly designed in 2014. The crowd figure in the last sentence is the one thing here reported from OUTSIDE the parish — Maalaimalar, 5 Aug 2022 — so it carries its own chip. ⭐ `agur_1903` ADDED 26 Jul 2026 and it is the second outside witness this dot has ever had: C. M. Agur's `Church History of Travancore` — a NON-CATHOLIC history — records the Assumption festival at this church \"where several inhabitants of Malabar are accustomed to go annually\". THE PILGRIMAGE FROM THE KERALA SIDE IS THEREFORE DOCUMENTED, and documented long before the 2022 newspaper the dot used to rest it on. ⚠ READ THE SCOPE CAREFULLY: the episode Agur is narrating is early-19th-century, so he attests the ANNUAL PILGRIMAGE as already established — he says NOTHING about the 1891 chariot, and the dot must never be worded as though he did. ⭐⭐ TIER tradition → DOCUMENTED, 26 Jul 2026, AND IT WAS EARNED BY REORDERING, NOT BY PROMOTION — the same manoeuvre as great-two-nave-church:3, and it carries the same warning. The dot used to OPEN on the carpentry: the village built a thirty-five-foot ther in 1891 of jackfruit, teak and neem, carved by local sculptors. NOTHING OUTSIDE THIS PARISH SAYS THAT, and nothing ever will — a full sweep of BOTH corpora on 26 Jul, in English, French and Tamil (ther/chariot/temple car/rath/sapram/தேர்), found every real hit in `Souvenir_150yr` and nowhere else. (The two Frykenberg \"temple car/chariot\" hits are a GLOSSARY ENTRY for Rath Yātra and have nothing to do with this village; the Études \"sapram\" is the 1889 visitor describing Indian night festivals in general, two years before this ther existed. Both checked and dismissed — do not re-chase them.) THE DOT NOW OPENS ON THE PROCESSION INSTEAD, and the procession is documented twice, from outside, a century apart: Agur 1903 for the annual pilgrimage from the Malabar side, Maalaimalar 2022 for the crowd. ⚠⚠ THE CORRECTION THAT MATTERS, RECORDED SO IT IS NOT LOST: AGUR SAYS NOTHING ABOUT A CART. His sentence is \"the Assumption Festival at Vadakkanculam church where several inhabitants of Malabar are accustomed to go annually\" — a festival and a pilgrimage, no ther, no car, no carving. AND HIS EPISODE IS EARLY-19th-CENTURY, decades BEFORE 1891, so it could not describe this cart even if it tried. The owner read him as documenting the cart; he does not. What he documents is that PEOPLE FROM KERALA WERE ALREADY COMING EVERY YEAR — which is a better fact anyway, because it makes the pilgrimage older than the object. ⚠ THE PROSE MUST NEVER SAY OR IMPLY THAT AGUR ATTESTS THE 1891 THER. The 1891 date, the thirty-five feet, the three woods and the local sculptors are the parish's own record and are written as such. ⚠⚠ IF ANYONE EVER REORDERS THIS DOT TO OPEN ON THE CHARIOT AGAIN, THE TIER MUST GO BACK TO `tradition`. Badge and running order are tied here, deliberately. ⚠ OPEN QUESTION, NOT ASSERTED: if the pilgrimage is that much older than 1891, something must have carried her before — but NO source we hold mentions an earlier car, so the page says nothing about one. ⓘ Noted and deliberately kept out of the prose: Agur dates that festival to the 5th of August, not the 15th. The parish's ten-day Perunkoor feast opens on the 6th and runs to the Assumption, so Agur may be recording the OPENING of the same ten-day feast still kept today. Suggestive, unprovable, and too good a coincidence to assert.",
    },
    // 2
    {
      tier: "documented",
      photo: "little-rome-2.jpg",
      keys: ["molony_1926", "arsi_tolosana_1914", "la_mission_du_madure_periodical", "pate_gazetteer_1917", "neill_1985"],
      note: "⭐⭐ REBUILT ON AN EYEWITNESS, 26 Jul 2026, and the eyewitness CORRECTED THE PAGE. `molony_1926` is new: Sir J. C. Molony, the district Collector, `A Book of South India` p.128. He came out to this village to see the parish priest because the man's reputation in the government office was that of one \"who mocked at Authority\" — Molony's own phrase is that he set out to track \"the dragon\" to his lair. THAT MAKES HIM THE ONLY OUTSIDE, SECULAR, FIRST-HAND WITNESS TO A PRIEST OF THIS PARISH, in the same class as Stuart and Pate. ⚠⚠ WHAT HE CORRECTS, AND IT MATTERS: the dot used to call Caussanel \"a fierce, ascetic priest who lived eighteen years on milk and bananas\". Molony ASKED HIM, and reports: \"For some eighteen years, he told me, he had not eaten solid food: he lived on milk and GRUEL. IN THIS THERE WAS NO IDEA OF PIOUS ASCETICISM: only so could he vanquish the devil of dyspepsia which plagued him.\" So (a) the EIGHTEEN YEARS is safe and now chipped — it is first-hand, \"he told me\", where before it rested on a badge; (b) \"bananas\" is the FRENCH CHAIN, not the eyewitness — R. P. Mahé's 1930 reproduction of Molony renders gruel as \"bananes\", though the Caussanel obituary independently says bananas too, so both readings survive (Mismatch J14); (c) THE WORD \"ASCETIC\" HAS BEEN REMOVED FROM THE PROSE IN BOTH LANGUAGES, because the only man who asked him says flatly it was a stomach complaint. The Jesuit obituary reads the same diet as mortification; the page now states the fact and lets it stand bare rather than choosing a motive. ⚠ DO NOT REINSTATE \"ascetic\" — its removal was a deliberate decision on the evidence. FROM MOLONY IN THE PROSE: the dragon and the Collector's low opinion, the eighteen years on milk and gruel with the dyspepsia reason, the knowledge of drugs and simples, doctor to the village as much as priest, and \"his affection for his wayward sheep seemed unaffected by their waywardness\". ⚠ CUT 27 Jul 2026 ON THE OWNER'S SECOND REQUEST TO SHORTEN THIS DOT: the French meal cooked from memory and watched \"with the anxious pride of an artist who has invited a critic to gaze upon his masterpiece\". It was the most charming line here, and it is NOT struck on evidence — Molony is unimpeached and the quote remains good. It went because this dot was half quotation, every other quote carries a chip, and the meal was the one passage about the priest entertaining a European rather than about the village. RESTORE IT FREELY if the dot is ever allowed to run longer; the wording is preserved in this note precisely so it is not lost. Also cut in the same pass: \"ten years superior of the Palamcottah district\" (obituary detail, not needed for any chip here — `arsi_tolosana_1914` rests on his PRESENCE in the village, which the prose still carries) and Molony's \"sand wastes\". ⚠ Molony is IN COPYRIGHT (d. 1961; UK life+70): the chip renders and the words are quoted, the page image is NOT reproduced — handled exactly as neill_1985. ⚠ Molony also describes the division in the church at length; that stays off the page in both languages, as everywhere. ⭐ A PORTRAIT OF CAUSSANEL NOW EXISTS: `Knowledge_Base/Historical_Images_From_Books/1930_Periodical_PORTRAIT_Fr_Adrien_Caussanel_SJ_1850-1930.png`, from his obituary — the dot could carry his face instead of a painting. Earlier audit, still standing: Pate wrote within years with Caussanel himself as informant; the year 1910 and the two walls rest on Sivasubramanian alone.",
    },
    // 3
    {
      tier: "documented",
      photo: "little-rome-6.jpg",
      keys: ["arsi_tolosana_1914", "jemparc_book450", "la_mission_du_madure_periodical"],
      note: "⭐⭐ SECOND PASS 27 Jul 2026 — THE BOOK-AS-OBJECT WAS REMOVED FROM THE PAGE at the owner's instruction (\"we no need to mention it is in this book etc etc … just the story abt this father\"). GONE FROM THE PROSE, DELIBERATELY, NOT BY OVERSIGHT: the catalogue number \"Book 450\", the archive name Shembaganur, the quoted catalogue title, the whole 1881–1923 correction, and the closing admission \"We have not read it\". The dot is now a portrait of the man doing the work. ⚠ CONSEQUENCES THAT WERE HANDLED AND MUST STAY HANDLED: (1) the dot's YEAR LABEL was \"1881–1923\" — the catalogue's wrong dates. With the correction gone from the body, that label would have asserted an error the page no longer refutes, so it is now `c.1905–1920` / `சுமார் 1905–1920`, which is what the obituary supports. DO NOT restore the old label without restoring the correction with it. (2) The TITLE was \"Book 450\", which named the very framing being cut; it is now \"The parish's own historian\". (3) `jemparc_book450` is held by ONE clause only — \"The book he made out of those papers outlived him, and is kept in the Society's archive still\". If a future tightening pass deletes that clause the chip is orphaned; delete the chip too, or keep the clause. ⚠ THE FULL CORRECTION AND ITS EVIDENCE ARE PRESERVED BELOW AND IN MISMATCH A14 — nothing was retracted, it simply stopped being page-facing. Restoring it is a paste job if the owner ever wants the forensics back. Previous pass follows. ⭐ RETOLD AS NARRATIVE 27 Jul 2026, at the owner's request (\"i need like a story\") — NO EVIDENCE CHANGED, only the order of telling. The dot used to OPEN on the catalogue title and then spend most of its length disproving it, so the forensics were the plot and the man was a footnote. It now opens on him: a Frenchman arriving about 1905 and quietly writing the parish's history down, the magazine's two phrases for what he was doing, the older papers he worked from, and only THEN the book on the shelf and the wrong dates — reduced to one clause and reframed as the clue rather than the subject. ⚠ EVERY GUARD BELOW STILL HOLDS AND MUST: the \"about\" at both ends is still there, Anakarai (not Kallikoulam) is still the named posting, and \"We have not read it\" still closes it. Do not let a future tightening pass delete the hedges just because the dot now reads as a story. ⚠ The dot's YEAR LABEL still displays the catalogue's wrong \"1881–1923\" while the body says both ends are wrong. That is deliberate and it reads well — the header quotes the catalogue, the story corrects it — but if it ever confuses a reader the honest label is \"c.1905–1920\". Earlier audit follows. ⭐ SHARPENED 26 Jul 2026 ON HIS OBITUARY, which was read in full for the first time (La Mission du Maduré 1930, printed p.30). NEITHER END OF THE CATALOGUE DATE TOUCHES HIS RESIDENCE HERE. In 1881 he was a Jesuit student in EUROPE — he entered the novitiate 31 Dec 1875, was ordained only in 1884 and landed in the Maduré in 1888. By 1923 he had left this parish. ⚠⚠ CORRECTED SAME DAY, HOURS AFTER FIRST WRITING: the prose briefly said he was at KALLIKOULAM in 1923, on the obituary's word. THE 1924 CATHOLIC DIRECTORY — a contemporary printed return covering 1 Oct 1922 to 30 Sept 1923, which we hold — CONTRADICTS THAT NAME: it lists \"Anakarti (Pettaikulam P.O., Tinnevelly Dt.) — Rev. A. CAUSSANEL, S.J. — Cath. 3,529; vills. 25\", while Kallikulam that year is under a Rev. Arulsami. The prose now names ANAKARAI and cites the directory, because a contemporary printed return outranks a 1930 obituary written from memory. Kallikulam is most likely the posting immediately BEFORE it (ARSI 1921 also has him there), so the two are probably sequential rather than contradictory — but that is inference, not evidence, and the page states only what the directory shows. Logged as Mismatch A18. The obituary's own sequence — Tuticorin to 1893, superior of the Palamcottah district 1893–1905, \"puis, c'est Viravanalour et Vadakenkoulam\", Kallikoulam by 1923 — puts him HERE from about 1905 to about 1920, which is what the prose now says. ⚠ THAT ALSO DISSOLVES WHAT LOOKED LIKE A FOUR-WAY CONFLICT (Mismatch A13): the parish roll's 1910–1919, ARSI's single 1914 pin and ARSI 1921 at Kallikulam are not rival claims, they are different slices of one continuous posting. ⚠ The first and last years here are still NOT fixed — the obituary gives no dates for the Vadakkankulam posting itself — so the prose says \"about\" at both ends and must keep saying it. Earlier audit, superseded in part: the catalogue's date-range was the only thing supporting \"1881–1923\"; ARSI 1900 puts another priest here, and 1914 is the ONE year a catalogue sets him at Vadakkankulam. The Jesuits' own magazine says what the book actually is — he wrote \"des diaires, une histoire du pays\" and \"recherche les vieux manuscrits et les déchiffre\" — a retrospective compilation from old manuscripts, not a diary kept day by day in place.",
    },
    // 4
    {
      tier: "documented",
      photo: "little-rome-3.jpg",
      keys: ["arsi_madurensis_1921", "catholic_directory_1924", "neill_1985"],
      note: "⭐ REBUILT 26 Jul 2026 ON THE DIRECTORY'S OWN PAGES, which had never been read past the parish line. ⚠ NEILL WAS VERIFIED AND SURVIVES — an earlier pass this session doubted the chip on the reasonable ground that his volume is subtitled 1707–1858 and cannot reach 1923. IT REACHES ANYWAY: in the passage on the Society's restoration he adds the forward aside \"the first Indian bishop of the Latin rite, Mgr Tiburtius Roche, consecrated as bishop of Tuticorin in 1923, was a Jesuit\" (index p.131). So the chip is sound, and it carries MORE than the old note claimed — not only that Roche was the first Indian Latin-rite bishop, but that he was a JESUIT, which the 1924 Directory independently confirms (\"Rt. Rev. Francis Tiburtius Roche, S.J.\"). Both facts are now in the prose, and the dot ends on the irony they create: the parish left Jesuit hands in the same year its new bishop was himself a Jesuit. ⭐ NEWLY IN THE PROSE, verbatim from the Directory's diocese header: the new see was still unfinished on paper — \"The Limits of this new Diocese are not yet quite determined. — It is impossible to give at present the number of Parishes that compose it.\" And it had only ONE district, the Fishery Coast (Catholics 67,112; Stations 20), inside which this INLAND parish is filed among the fishing villages — a real and documented incongruity, not a flourish. The parish entry itself was re-checked character by character against the page and is verbatim. ⚠ THE TWO UNSOURCED CLAIMS ARE NO LONGER ON THE PAGE: \"raised to a deanery\" and the precise day \"12 June 1923\" have both been absent from the prose for some time (the Directory shows a single undivided district in this first year, which is positive evidence AGAINST a deanery structure then) — the old note flagged them as live when they were not. They survive in the KB chronology (file 10) sourced to tuticorindiocese.org, and must NOT be promoted to the page without a contemporary document. ⚠ Roche's consecration date is 23 Sept 1923 per the KB, i.e. AFTER the erection — the prose therefore does not say the parish passed over \"under\" him, only that he was the first bishop.",
    },
    // 5
    {
      tier: "tradition",
      photo: "little-rome-4.jpg",
      keys: ["catholic_directory_1924", "auguste_jean_1894", "krishnaswami_ayyar_1934", "parish_english_history", "souvenir_150yr", "diocese_thoothukudi_page"],
      note: "⭐⭐⭐ REBUILT 27 Jul 2026 AS **THE** DOT ABOUT THE NAME, at the owner's instruction (\"work on the name little rome and put all the details in this dot\", and \"maybe that year is not the right year\"). ⭐ THE FINDING THAT CHANGES THE DOT: the strongest evidence for \"Little Rome\" is NOT about the church at all, and the page had never used it. `krishnaswami_ayyar_1934` (Tinnevelly Gazetteer Statistical Appendix / Supplement, the substitute text for p.406 ¶4) sets this village down with no motive to flatter it and records that, after **Kamanayakkanpatti**, Vadakkankulam was \"**the second centre of advance of the ancient Madura mission into Tinnevelly**\" in the closing years of the 17th century, and that \"**in course of time it became the chief centre of the mission in this district**\". ⚠ VERIFY-TRAP, RECORDED SO NOBODY REPEATS MY SCARE: in the OCR the sentence appears to open \"patti, the second centre of advance…\" and reads as though it describes some other village — \"patti\" is the TAIL OF KAMANAYAKKANPATTI wrapping across the line. The passage IS about Vadakkankulam. ⚠ THE SAME PARAGRAPH CONTINUES INTO CASTE (\"the original converts were Shanans and there is still a preponderance…\") — that clause is NOT quoted and must never be. ⭐ SECOND ADDITION: `auguste_jean_1894` — the mission's own historian, THIRTY YEARS BEFORE the naming, already called it \"une église probablement sans pareille au monde\". ⚠ Quote the first clause ONLY; the sentence runs straight on into the caste explanation of the two naves. ⚠⚠ SIX CHIPS NOW, AND THAT IS NOT THE STACKING THIS FILE FORBIDS — an earlier pass rightly stripped chips that were piled on the naming event itself. These six carry FOUR DIFFERENT CLAIMS: the naming (parish/diocese trio), Roche as first bishop (Directory 1924), the church without equal (Jean), and the village as chief centre of the mission (Gazetteer). If a later pass shortens this dot, chips must be dropped WITH the clauses they hold. ⚠ THE TIER STAYS `tradition`: the naming EVENT is still parish-remembered only, and file 31 proved that exhaustively. What changed is that the dot no longer rests on the naming alone — it now argues that the epithet describes something externally documented, so the exact year matters far less. THE YEAR LABEL IS LEFT AT 1926 and the prose hedges it (\"the village remembers it being given in 1926\"). Previous pass follows. ⭐ PROSE BROUGHT INTO LINE WITH THE TIER, 26 Jul 2026 — no new source, and there will not be one from anything we hold. The dot was tiered `tradition` while its prose asserted a documented scene (\"Bishop Roche came to see the Holy Family Church… Struck by the grandeur of the place, he called…\"). Both languages now say the village has kept the moment in its own memory, and let the name stand on its living use — which is itself verifiable, unlike the 1926 scene. ⚠ A first attempt at this rewrite put the archival caveat INTO the reading prose (\"No document we have found records the moment… the mission's own magazine for 1926 is one of the years missing\"). THE OWNER SAW IT ON THE PAGE AND OBJECTED, AND WAS RIGHT TO: the tier chip and these notes already carry that job, and a pilgrim reading the page does not need the confession. The prose no longer asserts a scene we cannot witness, but it does not apologise either. DO NOT PUT THE CAVEAT BACK INTO THE BODY TEXT. ⚠ THE TIER DID NOT MOVE AND THE CLAIM IS NOT DIMINISHED; the page merely stops stating as fact what file 31 proves has no witness. ⚠⚠ TWO CORRECTIONS TO HOW THE NEGATIVE IS PHRASED (details in file 31 addendum): (a) it is NOT true that the naming \"appears in no 1926 document of any kind\" — the truth is WE DO NOT HOLD THE 1926 DOCUMENT MOST LIKELY TO CARRY IT. `La Mission du Maduré` is held for 1912–16, 1921, 1922, 1924, 1927–33; 1917–20, 1923, 1925 AND 1926 are missing from the run. ⛔ THE GALLICA LEAD IS NOW CLOSED (27 Jul 2026): the BnF's issues API for the title record `ark:/12148/cb32816871d` reports `totalIssues=\"24\"` across exactly the years we already hold, so WE POSSESS THE ENTIRE DIGITISED RUN and 1925/1926 were never digitised at all — there is no 1926 issue to acquire, do not search for it again. ⭐ THE LEAD THAT REPLACES IT, found in a finding aid already on disk: AFSI Toulouse, Série FMd holds \"Lépicier (Alexis Henri Marie) Mgr : questionnaires, rapports, vers 1926\" — Cardinal Lépicier was made Apostolic Visitor to the East Indies dioceses on 11 June 1924 and toured India surveying them, so these are an outside papal visitor's systematic reports dated to the exact year. The same archive holds Roche's own dossier (\"Roche (Francis, Tiburtius Mgr), 1879-1898-1955\"). Both need a letter to Toulouse; see file 31 §Addendum. (b) DO NOT ARGUE FROM THE SILENCE OF THE NEIGHBOURING ISSUES: the periodical mentions this village 0 times in 1924, 1927, 1928, 1929, 1931, 1932 and 1933 (only 1930 has any, and those are the Caussanel obituary and the sacristan piece), so it simply was not covering this parish in that decade and its silence proves nothing. Earlier audit, still standing: the naming is remembered only in parish and diocesan telling — one institutional witness family — and appears in no colonial or academic source, and in no 1926 document of any kind. The 1914 Roman catalogue and Neill were removed: a catalogue printed twelve years before the event, and a historian who never mentions the naming, are not evidence for it, and six chips on a claim with no document behind it is the exact stacking this file forbids.",
    },
    // 6
    {
      tier: "documented",
      photo: "little-rome-7.jpg",
      keys: ["la_mission_du_madure_periodical", "the_month_1889"],
      note: "⭐ THE HINGE OF THE STORY RESTORED, 27 Jul 2026. `the_month_1889` was re-read at the page itself and the dot had been FLATTENING ITS BEST BEAT. The travellers were not simply lost: they were HEATHEN PILGRIMS WALKING TO A PAGODA, and in the morning THEY ASKED THE OLD MAN THE WAY ON TO IT. The source: \"the pilgrims, before leaving, inquired their way to the pagoda whither they were bound. Their host raised his eyes to Heaven, and making with great solemnity the sign of the Cross, began to speak to them in so delightful a manner of the God whom they knew not, that then and there they resolved…\" — the whole story turns on a question about one shrine being answered by another. The dot previously had only \"in the morning spoke to them of a God they had never heard of\", which discards the pagoda, the question, the raised eyes and the sign of the Cross. All are now in, both languages, along with the source's \"in a short time these strangers were the most fervent Christians in Vadakenkoulam\". ⚠ THE DOT IS NOW LONGER, DELIBERATELY, against the session's general trend of shortening — this is the one place on the page where the extra words buy a genuine turn rather than ornament. ⚠ LOGGED AS MISMATCH A20: the 1889 witness says the office had been hereditary \"for two centuries\" (→ c.1689) AND that the founding episode was \"in the commencement of the eighteenth century\", in the same paragraph. THE CONTRADICTION IS THE SOURCE'S OWN; the page reproduces both and must not harmonise them. ⭐⭐ THE MAN NOW HAS A FAMILY, 26 Jul 2026. The magazine forgot his name, and the dot used to end on that — a good line with nowhere to go. `the_month_1889` supplies what the name would have told us: FORTY YEARS EARLIER a visitor was told that the sacristanship of this church had been HEREDITARY IN ONE FAMILY FOR TWO CENTURIES, and was given the origin from the man himself — the two travellers lost in a tiger-wood early in the 1700s, the gods that did not answer, the bell heard far off, the hut, the old man with rice and bananas who spoke to them of a God they did not know, and the husband afterwards made sacristan, who \"deemed it no small privilege to ring the bell which had been the means of his salvation\". ⭐ AND THE LINE THAT CLOSES THE CIRCLE: \"the descendants of these good pilgrims are many in number; I have known several of them who are exemplary priests\" — which is exactly why the man honoured in 1930 was brother to a vicar general and to a convent superior. ⚠ CONVERGENCE, NOT IDENTIFICATION. Dessal 1905 has a Yagappa Pillai still serving as catechist here, the parish remembers a Yagapparpillai with sixty years' service and a Bene Merenti, and a man born about 1848 would be 57 in 1905 and 82 in 1930. THAT IS SUGGESTIVE AND IT IS NOT PROOF: Mismatch A14 (1930 vs 1935 for the medal) stays open, the prose names nobody, and the two must not be silently merged. ⭐⭐ THE OLD WARNING IN THIS NOTE IS NOW PROVED, NOT MERELY ARGUED. It said the Pope's \"two priests and a bishop… what a happy mother!\" belongs to BISHOP ROCHE'S family and not the sacristan's. The 1930 page was RENDERED on 26 Jul and settles it: the exclamation is the CAPTION OF A PHOTOGRAPH that interrupts the sacristan's sentence mid-clause, and the following printed page carries the same words in running text about Roche's own family, whose mother is then sent the gold rosary. A TEXT-ONLY READING WELDS CAPTION TO SENTENCE AND INVENTS A BISHOP FOR THIS VILLAGE'S FAMILY. Mismatch J13; the photograph is saved as `1930_Periodical_GROUP_Bishop_Roche_family_six_brothers_and_mother.png`.",
    },
    // 7
    {
      tier: "tradition",
      photo: "little-rome-5.jpg",
      keys: ["rosariancr_fatimagiri"],
      note: "⭐ FILLED OUT 27 Jul 2026 — STILL ONE WITNESS, but that witness had far more in it than the dot was using, and a full-corpus sweep first PROVED the negative: no book we hold attests this foundation at all (the Lamp 1930's \"Rosarians\" is an unrelated American usage; both ARSI/Directory hits for \"Susainather\" are different men of the 1920s). NEWLY ON THE DOT, all from the order's own history: the congregation was begun at Jaffna on 2 Feb 1928 by FR B. A. THOMAS OMI; it is THE FIRST CONTEMPLATIVE ORDER OF MEN FOUNDED IN ASIA; the monks reached Vadakkankulam on a stated day, 13 FEBRUARY 1944; Susainather had bought FOUR ACRES with the diocese's help and put up a chapel and quarters; and the house was blessed on the day of arrival BY BISHOP ROCHE HIMSELF. ⭐ THAT LAST FACT CLOSES THE ERA'S CIRCLE and the prose now says so: the bishop who blessed this house in 1944 is the same man who, eighteen years earlier, is remembered as calling the village Little Rome — and 1944 sits comfortably inside his episcopate (consecrated 1923, died 1955). ⚠ THE TIER DOES NOT MOVE AND THE CHIP COUNT DOES NOT MOVE. Everything above still comes from `rosariancr_fatimagiri` — richer detail from one witness is not corroboration, and it must not be mistaken for it. ⚠ \"Servant of God\" remains the order's own usage with NO Holy See decree in evidence; the prose therefore says \"whom the order honours as a Servant of God\" and must keep that attribution. ⚠ Still unsourced and still OFF the page: the \"rocky hill above the village\" and any claim that the Rosarians spread through India from here. Earlier audit: one witness — the Rosarian congregation's own website (the Knowledge Base files that appear to corroborate it all trace back to that single URL). \"Servant of God\" is the order's own usage with no Holy See decree in evidence, and the \"rocky hill above the village\" and the spread of the Rosarians from here have no source at all; the Bethany Sisters' document was removed because it concerns 1970 and says nothing of 1944 or the Rosarians.",
    },
  ],
  "town-of-learning": [
    // 0
    {
      tier: "documented",
      photo: "town-of-learning-1.jpg",
      keys: ["arsi_tolosana_1900", "arsi_tolosana_1914", "stuart_manual_1879", "auguste_jean_1894"],
      note: "⚠⚠ THE 1821 CMS GIRLS’ SCHOOL IS ON THIS DOT AT THE OWNER’S EXPLICIT INSTRUCTION (“keep the cms”, 27 Jul 2026) AND IT IS THE ONE CLAUSE HERE WITH NO HELD SOURCE. Everything else on this dot is doubly documented; this is not, and the distinction must not be lost. WHAT IT RESTS ON: a chain — a scholar’s reproduction of her own thesis material → **Appasamy, `Centenary History of the C.M.S. in Tirunelveli` (Palamcottah, 1923)**, WHICH THIS PROJECT DOES NOT HOLD. Nobody on this project has seen the page. ⚠ TWO HELD BOOKS WERE CHECKED AGAINST IT ON 27 JUL 2026 AND NEITHER CORROBORATES IT: (a) **Neill**, who covers Rhenius and Schmid at length, NEVER NAMES THIS VILLAGE ANYWHERE IN THE BOOK; (b) **Caldwell, `Records of the Early Tinnevelly Mission` (1881)**, whose index does carry “Vadakankulam, 152” — but the passage is **Ringeltaube** (LMS) passing through on his way into Travancore, a different mission and a different decade, and it says nothing of a school. So the held record places OTHER Protestant missionaries in this village, which makes 1821 plausible, but does not attest it. ✅ THE PROSE IS HEDGED ACCORDINGLY — “is said to have” and “are remembered as”, in both languages — and per the owner’s standing instruction the caveat lives HERE and not in the reading text. ⛔ IT IS DELIBERATELY UNCHIPPED: adding a key would dress a second-hand claim in the same clothes as the ARSI entries beside it. ⭐ TO SETTLE IT, ACQUIRE APPASAMY 1923 — a Palamcottah imprint, likely findable; that is the single book that would move this from reported to documented. ⚠ Note also (file `_extraction/deep_lace_economy.md`) that the lace craft itself is PROTESTANT in origin (Martha Mault, LMS, Nagercoil c.1819–30s → her daughter Eliza, who married Bishop Caldwell in 1844), so an 1821 CMS school teaching lace here fits the regional pattern exactly. Earlier audit follows. Properly external and doubly documented: ARSI 1900 sets down the priest of Vadakkankulam as chaplain of the convent of Indian nuns of the Seven Sorrows and director of its school, ARSI 1914 says the same under Fr Caussanel, and Auguste Jean names this village among the four houses the sisters kept beyond Trichinopoly. Stuart's manual (1879) is added because it pushes the women's religious life of this town back to about 1864 — earlier than this dot's own year, and earlier than any parish record claims.",
    },
    // 1
    {
      tier: "tradition",
      photo: "town-of-learning-2.jpg",
      keys: ["souvenir_150yr", "diocese_thoothukudi_page"],
      note: "⭐ RESEARCHED TO A FIRM NEGATIVE, 27 Jul 2026 — the tier cannot move, and here is why, so nobody spends another pass on it. The regional lace story is REAL, DEEP AND WELL DOCUMENTED — and it is PROTESTANT. Pillow/bobbin lace was brought to the far south by MRS MARTHA MAULT (London Missionary Society) at Nagercoil c.1819–30s to give convert women an income; her daughter ELIZA, who married Bishop Robert Caldwell in 1844, carried it into the Tinnevelly district, and that is the craft the trade came to call “Tinnevelly lace”. ⚠⚠ NO INDEPENDENT (NON-PARISH) SOURCE DATES OR DESCRIBES THE CATHOLIC LACE SCHOOL HERE BEFORE THE 20TH CENTURY — a dedicated research pass (22 Jun 2026, file `_extraction/deep_lace_economy.md`) established this and it was re-checked today. **The page must therefore never imply that this village originated Tinnevelly lace**; it taught it, a century after the Protestant missions did, and the prose correctly claims no more. ⭐ ONE UNUSED LEAD, DELIBERATELY NOT ACTED ON: the CMS missionaries Rhenius and Schmid are said to have opened a GIRLS’ SCHOOL AT VADAKKANKULAM IN 1821 — a century before the Catholic lace school and the earliest girls’ education attached to this village. ⚠ It reaches us only through a CHAIN (a scholar’s blog → Appasamy, `Centenary History of the C.M.S. in Tirunelveli`, 1923, NOT HELD), and Neill — who covers Rhenius and Schmid at length — never names this village at all, so there is no held source behind it. It is also Protestant history on a Catholic parish page, which is the owner’s call and not a writer’s. Earlier audit follows. The dates are the parish's souvenir alone — the inspector of 1921, needlework, embroidery, lace and dress-making from 1922, the tailoring school passing wholly to the sisters in 1966 — and history_2026 was removed because it contains none of them: not 1921, not 1922, not 1966, not lace. The school itself is not in doubt: the diocese still lists the R.C. Lace Industrial School and the Osanam Sewing Institute among this parish's works.",
    },
    // 2
    {
      tier: "tradition",
      photo: "town-of-learning-3.jpg",
      keys: ["bethany_sisters_healing_ministry"],
      note: "⭐ CHECKED EXTERNALLY 27 Jul 2026, and the congregation IS independently real: the Sisters of the Little Flower of Bethany were founded at Mangalore on 16 July 1921 and are a documented institute with published provincial histories. So a 1970 foundation by them is entirely plausible and in character. ⚠ BUT NOTHING OUTSIDE THE PARISH ATTESTS THIS HOUSE: no independent source was found for St Thomas Hospital at Vadakkankulam, for the four sisters of 27 July 1970, for Fr Maria Gnanam, for Misereor’s help, for the forty beds or for the twenty-five to thirty villages. THE TIER AND THE SINGLE CHIP THEREFORE STAND — exactly as with the 1944 Rosarian dot, a real congregation does not corroborate a particular house. Earlier audit follows. Downgraded from documented: all three keys were parish-side, and two of them carried nothing — neither history_2026 nor the diocesan page has 1970, Fr Gnanam, Misereor, the forty beds or the twenty-five to thirty villages, so both are gone. The dot now rests where it always rested: on the Bethany Sisters' own first-person account, written for the parish's own souvenir — which is tradition, exactly as the 1944 Rosarian dot is tradition for the same reason.",
    },
  ],
  "shrine-and-the-saint": [
    // 0
    {
      tier: "tradition",
      photo: "shrine-and-the-saint-1.jpg",
      keys: ["shrine_decree_photograph", "souvenir_150yr", "diocese_thoothukudi_page"],
      note: "⭐⭐ THE DECREE HAS BEEN FOUND, 27 Jul 2026 — AND IT WAS ON THIS DISK ALL ALONG. This note used to say flatly that no decree text is held. It is held: `20260713_111601.jpg` in the parish picture folder, catalogued 18 July and never opened by any pass since. THE DECREE'S OWN WORDS (Tamil): the Holy Family church at Vadakkankulam \"is from today raised to a diocesan shrine under canon 1230\" of the Church's law, and is declared to hold all the duties, rights and special character proper to a diocesan shrine under canons 1232–1234 and the `Directory on Popular Piety and Liturgy`; and \"this decree was announced on the 6th day of August 1993 at the Mass held in the Holy Family church, Vadakkankulam, by His Excellency Bishop S. T. Amalanathar\". ⭐ IT PROVES THE GUARD THIS NOTE ALREADY CARRIED: the decree names the HOLY FAMILY church, so the shrine's present Marian style genuinely cannot be back-dated to 1993 — that was an argument before and is now the document's own wording. ⚠ TWO LIMITS, AND THE TIER THEREFORE DOES NOT MOVE: (a) this is NOT the 1993 original — it is signed and sealed by a LATER bishop, A. Stephen, so it is a later attestation of the act, not the act's own paper; (b) it is still the diocese attesting the diocese, the same institutional witness family as before. What it adds is not independence but PRECISION: the canon, the wording and the title are now fixed rather than reported. ⚠ The photograph is chipped `archiveOnly`, exactly as `bell_inscription_photograph` — the object settles what the paper could not. Earlier audit follows. The declaration of 6 August 1993 by Bishop S. T. Amalanathar is attested only by the parish and the diocese reporting their own act — one institutional witness family, and no decree text is held; the souvenir is the source of the date and is now chipped for it. Every 1993 witness says the HOLY FAMILY church was declared a shrine: the Marian title is the shrine's present style, first attested in 2022, and must not be back-dated twenty-nine years.",
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
      keys: ["shrine_decree_photograph"],
      note: "⭐ NO LONGER THE PAGE’S ONLY KEYLESS DOT, 27 Jul 2026 — but only half of it is chipped, deliberately. THE 2021 ACT REMAINS UNCHIPPED: the consecration of the flag-mast, the date, Bishop Stephen Antony and Fr John Britto all still rest on the parish souvenir (p.9) alone, and no photograph of a dated inscription on the mast exists in the parish picture folder — checked 27 Jul 2026. WHAT IS NOW CHIPPED IS THE OTHER CLAUSE: the dot turns on a coincidence — that the mast was consecrated on the same day of the year the church was declared a shrine, twenty-eight years before — and THE 1993 HALF OF THAT COINCIDENCE IS NOW DOCUMENTED, by the shrine decree photographed in the parish (`shrine_decree_photograph`), which states the declaration was announced on 6 August 1993. So the dot’s point no longer rests entirely on parish memory: one of its two dates is on a sealed diocesan document. ✅ THE BISHOP’S NAME WAS QUERIED AND IS CORRECT AS PRINTED: he is Bishop STEPHEN ANTONY (Pillai), appointed to Tuticorin 17 Jan 2019 and ordained 24 Feb 2019 — verified against Catholic-Hierarchy 27 Jul 2026. ⚠ The 1993 decree seals him as “A. STEPHEN”, the Tamil initial-first form of the same name; DO NOT “correct” the prose to match the seal. Earlier audit follows. Deliberately without a key: the only witness for the flag-mast is the parish's own souvenir (p.9), and this is the one dot where the page shows its \"no source outside this parish\" label instead of dressing a parish claim as evidence. The blessing of 6 August 2021 stands; \"crowned a season of renovation\" and \"as the shrine prepared for its 150th year\" are unsupported, and a fifty-foot flagstaff stood here long before 2021.",
    },
    // 3
    {
      tier: "documented",
      photo: "shrine-and-the-saint-4.jpg",
      keys: ["vatican_news_canonisation", "osservatore_romano_2012", "pope_francis_homily_2022", "holy_see_canonisation_rite_2022", "the_month_1889", "etudes_1889", "auguste_jean_1894", "diocese_thoothukudi_page"],
      note: "The best-documented dot on the page: the canonisation of 15 May 2022 is a public act of the Holy See, and the baptism in this church is Vatican-recorded. The RELIC is not at that tier — the oldest and only primary witness (Auguste Jean 1894, vol. I, p.203) says the church holds \"a part of his garment and the chains with which he was bound\", not a turban; the head-cloth and the annual glass-case exposition are the diocese's account, and should be attributed to it. ⭐⭐ THAT LAST POINT IS NOW OVERTAKEN, 26 Jul 2026: THE TURBAN IS ATTESTED, AND FROM OUTSIDE. `the_month_1889` and `etudes_1889` — one eyewitness account printed in London and in Paris — record that at CHRISTMAS 1888, five years BEFORE Auguste Jean, a visiting party was shown the relics here: \"Vadakenkoulam possesses THE TURBAN he wore, and the chains taken off at his death; the reliquary containing them was opened for us, and we were allowed to inspect these precious relics.\" So the head-cloth is no longer the diocese's word alone, and the witness is an INSPECTION rather than a mention. ⭐ THE FRENCH NAMES THE PRIEST THE ENGLISH LEAVES ANONYMOUS: Études has \"le P. Pouget ouvrit pour nous la châsse\" — Fr Pouget, of this parish's own succession, in whose arms Fr Delpech died here in 1887 (great-two-nave-church:7). The prose now names him. ⚠ ONE WITNESS, TWO PRINTINGS — The Month and Études are chipped together and are NOT two independent sources. ⚠ Auguste Jean is KEPT and not superseded: he gives \"a part of his garment\", which the 1889 account does not, so the two are complementary. ⚠ The annual 15 August glass-case exposition is STILL the diocese's account alone.",
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
  "agur_1903": "Agur 1903",
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
  "canoz_biography_1891": "Canoz biography 1891",
  "etudes_1889": "Études 1889",
  "katholische_missionen_1885": "Katholische Missionen 1885",
  "canoz_letter_1849": "Canoz 1849",
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
  "molony_1926": "Molony 1926",
  "neill_1985": "Neill 1985",
  "osservatore_romano_2012": "Osservatore Romano",
  "parish_english_history": "Parish history (English)",
  "pate_gazetteer_1917": "Pate 1917",
  "pope_francis_homily_2022": "Pope Francis 2022",
  "rosariancr_fatimagiri": "Rosarians (CR)",
  "souvenir_150yr": "150-Year Souvenir",
  "stuart_manual_1879": "Stuart 1879",
  "the_month_1889": "The Month 1889",
  "vatican_news_canonisation": "Vatican News",
  "gnanapoo_tomb_photograph": "Her tomb itself",
  "tomb_plaques_photographs": "The priests' stones",
  "shrine_decree_photograph": "The decree itself",
  "narchison_2011": "Narchison 2011",
  "trento_2022": "Trento 2022",
  "srinivasan_2021": "Srinivasan 2021",
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
