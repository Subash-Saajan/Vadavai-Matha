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
      photo: "placeholder.jpg",
      keys: ["pate_gazetteer_1917", "cronin_1959"],
      note: "Cronin (1959, p.30) carries the whole dot: Christianity \"lay entrenched without the walls of India\" until de Nobili's party left Tuticorin for Madurai in November 1606, and it was to that inland mission that de Britto succeeded in 1683. He is a modern biographer, not a document, and none of this is about Vadakkankulam — the dot explains how a Jesuit came to be on a forest path in the far south, and claims nothing more.",
    },
    // 2
    {
      tier: "tradition",
      photo: "clearing-in-the-forest-2.jpg",
      keys: ["bayly_1989", "history_2026"],
      note: "Bayly (pp.405–406) is the one leg of this dot that stands outside the parish, and she records a woman founder and \"a small shrine containing a cross\". The parish's own book agrees on the cross and gives the motive as her being firm in her Catholic faith: nothing in either witness supports a Marian devotion in 1680, which would be the 1803 apparition read backwards into a cross-shrine.",
    },
    // 3
    {
      tier: "tradition",
      photo: "clearing-in-the-forest-3.jpg",
      keys: ["pate_gazetteer_1917", "history_2026"],
      note: "Only de Britto's penetration as far south as Vadakkankulam (Pate, p.90) is external; the halting-place on the Travancore road, the cotton field and the priest on horseback are the parish's own memory, and Pate's dating also means the encounter cannot safely be put at 1680. Auguste Jean was removed from this dot: his earliest mention of the village is Fr Borghese in 1709 and he has nothing whatever on Santhaayi.",
    },
    // 4
    {
      tier: "tradition",
      photo: "clearing-in-the-forest-4.jpg",
      keys: ["pate_gazetteer_1917", "neill_1985", "history_2026"],
      note: "Pate is the documented half — a congregation \"definitely formed by 1685\" and de Britto present in the village. That de Britto personally raised the chapel, that it was thatched, and that he dedicated it to the Holy Family are the parish's own record alone, which is why the dot as a whole is tradition and not documented.",
    },
    // 5
    {
      tier: "tradition",
      photo: "clearing-in-the-forest-5.jpg",
      keys: ["pate_gazetteer_1917", "history_2026", "bishop_stephen_jubilee_2022"],
      note: "The two hundred baptisms are parish record, and the two parish witnesses disagree: history_2026 puts them in 1685 \"on the same occasion\" as the chapel, while Bishop Stephen's jubilee message of 2022 — quoted by name in the dot and until now credited to nobody — dates de Britto's coming, the baptisms and the church together to 1686. Pate, from outside, gives no number at all and has de Britto called away to Kumbakonam rather than returning for a second visit.",
    },
    // 6
    {
      tier: "documented",
      photo: "placeholder.jpg",
      keys: ["debritto_prison_letter_1693", "faber_1851"],
      note: "The document is its own citation: de Britto's letter from the prison of Oriyur, 3 February 1693, printed by Bertrand and by Faber (1851, pp.445–446), who supplies the straw for a pen and the powdered coal moistened with spittle for ink. Maldonado was removed — it is a martyrology, and it fixes the date of the death, not of the letter.",
    },
    // 7
    {
      tier: "documented",
      photo: "clearing-in-the-forest-6.jpg",
      keys: ["debritto_prison_letter_1693", "maldonado_1697", "boero_1853", "faber_1851"],
      note: "The martyrdom at Oriyur on 4 February 1693 is documented at the highest level — the saint's own letter of the night before, and a printed Latin martyrology of 1697 whose title alone fixes the date; Faber and Boero descend from the same seventeenth-century Jesuit dossier and corroborate the tradition rather than test it. Two of the dot's sentences are NOT carried by these keys: \"canonised in 1947\" has no support anywhere in the corpus, and that de Britto founded this mission is parish tradition — which is why Pate (who credits the conversion work to Fr Borghese) and history_2026 were removed from here rather than left to lend it authority.",
    },
  ],
  "first-inland-parish": [
    // 0
    {
      tier: "tradition",
      photo: "first-inland-parish-1.jpg",
      keys: ["pate_gazetteer_1917", "neill_1985", "history_2026"],
      note: "The first pastor rests on the parish's own succession register alone, and that register cannot hold his name or his year steady — Bernard de Saa 1697, Bennet de Souza 1698, \"Fr Ponnaiya\". The first EXTERNAL attestation of any priest here is Fr Borghese in 1709, which is why Auguste Jean, who has nothing earlier, no longer chips this dot.",
    },
    // 1
    {
      tier: "documented",
      photo: "placeholder.jpg",
      keys: ["auguste_jean_1894", "bertrand_1847"],
      note: "The anchor of the era: the Jesuit Annual Letter of 1709, printed by Bertrand (vol. IV, p.100n), which sets Fr Maria Xavier Borghese \"at the head of the district of Vadakencoulam\" — the earliest document of its own century to name this place. Auguste Jean (p.157) puts the same man in the same charge, but he is following Bertrand, not confirming him independently.",
    },
    // 2
    {
      tier: "tradition",
      photo: "first-inland-parish-2.jpg",
      keys: ["history_2026"],
      note: "The \"nearly eight hundred adults\" of 1712–13 exist in exactly one document in the whole corpus — the parish's own 2026 compilation, which cites nothing for the figure; the phrase returns no hit in any of the printed mission histories. Bertrand was removed: he attests the mission's general flourishing under Borghese, and no number.",
    },
    // 3
    {
      tier: "documented",
      photo: "first-inland-parish-3.jpg",
      keys: ["pate_gazetteer_1917", "caldwell_1881", "history_2026"],
      note: "Clean and doubly independent: Fr Calini's letter of 1716, quoted by Pate, says the station \"had two years previously become a residence\", and Caldwell credits Fr Brandolini with founding the congregation in 1714. Neither source calls it the senior interior station or the first great inland parish — those are the page's own words, and they are not carried by these keys.",
    },
  ],
  "statue-and-the-saint": [
    // 0
    {
      tier: "tradition",
      photo: "statue-and-the-saint-1.jpg",
      keys: ["history_2026", "diocese_thoothukudi_page", "catholictamil_182"],
      note: "The weakest pillar on the page: the box from Portugal, the landing at Kootapuli and the three-way division of the images have zero external corroboration, and Kamanayakkanpatti tells a different origin story for its own image. Auguste Jean was removed — he has nothing about a box, Portugal, Kootapuli or a statue anywhere — so every key here is now parish-side, which is exactly what the tier says.",
    },
    // 1
    {
      tier: "documented",
      photo: "statue-and-the-saint-2.jpg",
      keys: ["vatican_news_canonisation", "osservatore_romano_2012", "auguste_jean_1894", "bertrand_1847", "history_2026"],
      note: "The strongest fact on the page. Bertrand (1847) and Auguste Jean (1894) record Buttari's baptism of Devasahayam here from the mission's own papers, a century before any canonisation dossier existed, and the DATE — 14 May 1745 — comes from the Vatican side (Vatican News; L'Osservatore Romano, written by the cause's Vice-Postulator), not from the rite of canonisation, which recites only the name. The diocesan page was dropped: parish-side stacking adds nothing to a dot the Holy See already carries.",
    },
    // 2
    {
      tier: "tradition",
      photo: "statue-and-the-saint-3.jpg",
      keys: ["auguste_jean_1894", "bertrand_lettres_1865", "souvenir_150yr", "history_2026"],
      note: "Bertrand (1865), drawing on the church's own archives, records only that Buttari \"laid the foundations of its present church\" — and he does not date it; the year 1749, the kankol festival and the ceremony are the parish's souvenir and chronology, which is why this dot is tradition and no longer documented. Note also that the parish's own English history says broad BRICKS from Perungudi: \"stone and mortar\" is in no source for this building.",
    },
    // 3
    {
      tier: "documented",
      photo: "statue-and-the-saint-7.jpg",
      keys: ["auguste_jean_1894"],
      note: "Auguste Jean (1894) is the single witness and carries the whole dot — the timber running short, Devasahayam's errand to his old friend at the Travancore court, the quarrel over religion, the threat and the royal warrant that followed. He tiers as documented because he stands outside the parish, but he is one chronicler retelling the Jesuit tradition, not an independent second line.",
    },
    // 4
    {
      tier: "tradition",
      photo: "statue-and-the-saint-4.jpg",
      keys: ["auguste_jean_1894", "bertrand_lettres_1865", "parish_english_history", "souvenir_150yr", "history_2026"],
      note: "Only the Buttari-to-Thomassini handover is printed (Bertrand 1865, from the church archives; Auguste Jean reproduces him almost word for word and is NOT a second witness); the year 1752, the cross plan and the eastward orientation are the parish's own record, said to rest on two inscriptions inside the old church, and the fabric was brick. The claim that the Assumption became the principal feast \"to this day\" is contradicted by this dot's own cited source: Bertrand records the titular feast of this church as St Francis Xavier's, kept with a great December novena, right up to the re-dedication of 1872.",
    },
    // 5
    {
      tier: "documented",
      photo: "statue-and-the-saint-5.jpg",
      keys: ["holy_see_canonisation_rite_2022", "auguste_jean_1894", "bertrand_1847", "history_2026", "diocese_thoothukudi_page"],
      note: "The execution of 14 January 1752 is documented in the near-contemporary Jesuit accounts, and Auguste Jean (vol. I, p.203) is the oldest witness that this church already held \"a part of his garment and the chains with which he was bound\". Two of the dot's details are not his: \"Kattadimalai\" appears in no historical source — the witnesses describe the Travancore lines at the Aralvaimozhi gap and never name the spot — and the head-turban relic is the diocese's modern account, which has quietly displaced the chains.",
    },
    // 6
    {
      tier: "documented",
      photo: "statue-and-the-saint-6.jpg",
      keys: ["caldwell_1881", "auguste_jean_1894", "bertrand_lettres_1865", "history_2026"],
      note: "The suppression of 1773 and the handover to Padroado priests from Goa are documented — though Caldwell's \"died one by one\" is Stuart's sentence two years earlier, so those two are one gazetteer witness and not two. Auguste Jean (p.230) settles the death of Thomassini, and the page now follows him: he had himself carried to Fr Antoine Douarte at Talai and died THERE in 1775, aged seventy-five, not at Vadakkankulam.",
    },
  ],
  "the-weeping-madonna": [
    // 0
    {
      tier: "documented",
      photo: "the-weeping-madonna-1.jpg",
      keys: ["caldwell_1881", "auguste_jean_1894", "history_2026"],
      note: "The sixty-three-year Jesuit absence and the Goa/Padroado succession are documented (Caldwell and Stuart are one gazetteer witness, near word-for-word). Two things these keys do NOT support: \"tended only by visiting priests\" — the parish's own roll shows an unbroken line of resident pastors across the whole gap — and the jurisdiction, since that roll is headed \"the Priest of Cochin\" and the page's own 1794 dot cites Paulinus placing the village under the Bishop of Cochin, not Cranganore.",
    },
    // 1
    {
      tier: "documented",
      photo: "placeholder.jpg",
      keys: ["auguste_jean_1894", "bertrand_lettres_1865"],
      note: "Bertrand's Lettres (vol. II, 1865) is the witness, and what he attests is the cult rather than the man: ninety years after Thomassini's death he still writes in the present tense that the Christians \"venerate him as a saint, give his name to their children, and visit his tomb with an extreme devotion\", and that non-Christians invoke him for rain. Auguste Jean repeats him and is not a second witness.",
    },
    // 2
    {
      tier: "documented",
      photo: "placeholder.jpg",
      keys: ["india_orientalis_christiana_1794"],
      note: "The earliest appearance of this village in a European printed book, and both page references are verified against the archive.org scan: Paulinus (Rome, 1794) lists \"XIV. Vadakencollam\" at p.158 among the churches subject to the Bishop of Cochin, and places the same name \"in promontorio Comorino\" at p.117. It is a name in a list and claims nothing more — in particular it carries no founding date, though the parish's own compilation has long read one into it.",
    },
    // 3
    {
      tier: "documented",
      photo: "placeholder.jpg",
      keys: ["pate_gazetteer_1917"],
      note: "Pate's gazetteer carries this dot whole: the agreement of 31 July 1801 handing \"the sole and exclusive administration\" of the Carnatic to the Company in perpetuity, Mr Lushington as first Collector of Tinnevelly, and the province taken over \"without the smallest disturbance\". It is documented context for 1803 and says nothing about the parish itself.",
    },
    // 4
    {
      tier: "devotion",
      photo: "the-weeping-madonna-2.jpg",
      keys: ["history_2026", "diocese_thoothukudi_page"],
      note: "One witness stands behind every account of 1803 — Besse (1914), resting in turn on the parish's own record of that year — and the diocesan page and the parish compilation are Besse retold, so these keys are one witness family and never corroboration. It has never been submitted to Rome and no Vatican commission has examined it; the conflicting dates and the weekday are a known open question (CITATION_AUDIT §F) and are deliberately out of scope for this pass.",
    },
    // 5
    {
      tier: "devotion",
      photo: "the-weeping-madonna-3.jpg",
      keys: ["history_2026", "catholictamil_182"],
      note: "The details of the scene — the catechist wiping the tears, the bell, the village hurrying in at an unusual hour, the Parce Domine — come from two Tamil parish texts that are near word-for-word identical: one witness, printed twice, and the order of events on the page is an editorial harmonisation of two retellings that narrate it differently. Besse was removed as a per-detail chip: nobody on this project has opened the book, and a source we have not read cannot be cited line by line.",
    },
    // 6
    {
      tier: "devotion",
      photo: "the-weeping-madonna-4.jpg",
      keys: ["history_2026", "catholictamil_182"],
      note: "The named witnesses (Zacharias, Vyagappar, Henriette Bilderbeck) and Fr Cardoza's same-day declaration come from those same two parish texts — one witness printed twice, and no outside key at all on the era's most extraordinary claim. The one genuinely checkable detail is that the parish's own priest-list independently places Fr John Louis Cardoza in office here in exactly 1803.",
    },
    // 7
    {
      tier: "documented",
      photo: "placeholder.jpg",
      keys: ["cms_intelligencer_1880", "badley_directory_1886", "trento_2022", "history_2026"],
      note: "The family, at last, has outside witnesses — all of them Protestant, none with any reason to flatter a Catholic shrine. Trento (2022, p.285) identifies the village's Mr Bilderbeck from the parish's own 1915 genealogical manuscript as the merchant Christopher Bilderbeck (b. c.1758, d. 1817); the CMS Intelligencer's obituary (Aug. 1880, pp.512–513) records his son John as \"born in India… of a Roman Catholic family, and trained for the priesthood of that Church\"; Badley's Methodist directory supplies the birth year, 1809. That this documented household is the household of the 1803 account is an identification by name, place and period — the sources know one Bilderbeck family here — and the boon-story the parish attaches to them is cited, as tradition, on the era of the church they are remembered to have helped.",
    },
    // 8
    {
      tier: "devotion",
      photo: "placeholder.jpg",
      keys: ["besse_1914"],
      note: "This is the dot in which the page says what it does not claim, so it rests on the one book everything traces to and on nothing else: Besse (1914), four known copies, not one of them opened by anyone on this project. Neill was removed because he is not a second witness — his footnote cites Besse at p.477, a list of COASTAL stations that excludes Vadakkankulam — and the diocesan devotional page cannot be the citation for a statement about what the parish refuses to assert.",
    },
  ],
  "great-two-nave-church": [
    // 0
    {
      tier: "documented",
      photo: "great-two-nave-church-1.jpg",
      keys: ["auguste_jean_1894", "bertrand_lettres_1865", "neill_1985", "history_2026"],
      note: "Fr Martin's letter of 14 July 1838 is a printed eyewitness document — that is the real citation; Neill's version is Besse retold and not a second witness. Two errors to fix: the building was the 1749–52 STONE church, not \"the old chapel\", and it was the MEP priest Mousset, not the Jesuits, who seated the children of all castes together.",
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
      photo: "placeholder.jpg",
      keys: ["auguste_jean_1894", "parish_english_history"],
      note: "Auguste Jean (p.301) attests only that Bishop Canoz visited Vadakenkoulam on his pastoral tour of 1848. The date of 21 June and — the whole point of the dot — the request that the people begin gathering money for a large new church are the parish's own history alone; no outside source remembers what he asked for.",
    },
    // 3
    {
      tier: "tradition",
      photo: "placeholder.jpg",
      keys: ["auguste_jean_1894", "trento_2022", "history_2026", "souvenir_150yr"],
      note: "The benefaction is the parish's own memory and is tiered as such: the twenty-seven childless years, the boon and the generous giving come from the parish compilation, and the souvenir's Tamil telling (\"within one year a male child\") is the same witness family retold, never corroboration. What the outside record contributes is the check, not the confirmation: Auguste Jean credits the church to Fr Grégoire's persevering energy and names no lay benefactor anywhere in his two volumes, and Trento's dates put Christopher Bilderbeck's death in 1817, thirty-eight years before the foundation stone — so the gift, if it happened as remembered, belonged to the old church or to his heirs. Besse, unread, is where the claim could still be settled, and the dot says so.",
    },
    // 4
    {
      tier: "tradition",
      photo: "great-two-nave-church-2.jpg",
      keys: ["parish_english_history", "history_2026", "diocese_thoothukudi_page"],
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
      photo: "placeholder.jpg",
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
      keys: ["pate_gazetteer_1917", "auguste_jean_1894", "parish_english_history", "history_2026"],
      note: "The completion of \"the present handsome church… in 1872\" stands in a British government gazetteer — the single best external anchor on the page — and the plan of two converging naves meeting in a common chancel is described from outside the parish as well as within it. Keep the hedge: all three Jesuit witnesses say \"probably\" or \"perhaps\" without equal in the world, never flatly. The ninety-two-foot towers, the vegetable dyes and the \"Little Rome\" naming are parish-side, not documented.",
    },
    // 10
    {
      tier: "documented",
      photo: "placeholder.jpg",
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
      keys: ["arsi_tolosana_1914", "la_mission_du_madure_periodical", "pate_gazetteer_1917", "neill_1985", "history_2026"],
      note: "The best externally-evidenced strand on the page — Pate (writing within years, with Caussanel himself as informant), the Madras High Court of 1926, and the Jesuit catalogues. But every witness says the outcome was LITIGATION, not reconciliation: the page's \"true act of reconciliation\" is contradicted by all of them. The year 1910 and the two walls rest on Sivasubramanian alone.",
    },
    // 2
    {
      tier: "documented",
      photo: "placeholder.jpg",
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
      keys: ["catholic_directory_1924", "parish_english_history", "souvenir_150yr", "history_2026", "diocese_thoothukudi_page"],
      note: "The naming of Vadakkankulam \"Chinna Romapuri\" in 1926 is remembered only in parish and diocesan telling — one institutional witness family — and appears in no colonial or academic source, and in no 1926 document of any kind. The 1914 Roman catalogue and Neill were removed: a catalogue printed twelve years before the event, and a historian who never mentions the naming, are not evidence for it, and six chips on a claim with no document behind it is the exact stacking this file forbids.",
    },
    // 5
    {
      tier: "documented",
      photo: "placeholder.jpg",
      keys: ["la_mission_du_madure_periodical"],
      note: "The Jesuits' own magazine (1930, pp.7–8) is the single witness, and it is verbatim for the sacristan: brother of a vicar general and of a convent superior, still serving the church at eighty-two, given the Bene Merenti medal by Pius XI. It does NOT support the quotation as the page uses it — \"two priests and a bishop… what a happy mother!\" stands in a different paragraph, about Bishop Roche's own family (the next sentence sends a gold rosary to \"la mère de Mgr Roche\"), and the sacristan's family had no bishop in it.",
    },
    // 6
    {
      tier: "tradition",
      photo: "little-rome-5.jpg",
      keys: ["history_2026", "rosariancr_fatimagiri"],
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
      keys: ["souvenir_150yr", "history_2026", "diocese_thoothukudi_page"],
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
      photo: "placeholder.jpg",
      keys: ["osservatore_romano_2012", "pope_francis_homily_2022", "ccbi_patron_laity_2025"],
      note: "Every step of the chain is externally documented: L'Osservatore Romano (5 December 2012, written by the cause's Vice-Postulator) for the recognition of the martyrdom and Cardinal Amato's beatification at Nagercoil, the homily of 15 May 2022 for the canonisation itself, and the CCBI for the decree of 16 July 2025 naming him Patron of the Laity in India. Note what the last one is: the Conference of Catholic Bishops of India reporting a decree of the Dicastery for Divine Worship — the chip now reads \"CCBI 2025\", not \"Holy See 2025\".",
    },
    // 5
    {
      tier: "tradition",
      photo: "shrine-and-the-saint-5.jpg",
      keys: ["census_2011", "maalaimalar_2022", "history_2026", "diocese_thoothukudi_page"],
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
  "bertrand_1847": "Bertrand 1847",
  "bertrand_lettres_1865": "Bertrand 1865",
  "besse_1914": "Besse 1914",
  "bethany_sisters_healing_ministry": "Bethany Sisters",
  "bishop_stephen_jubilee_2022": "Bishop Stephen 2022",
  "boero_1853": "Boero 1853",
  "caldwell_1881": "Caldwell 1881",
  "catholic_directory_1924": "Catholic Directory 1924",
  "catholictamil_182": "CatholicTamil",
  "ccbi_patron_laity_2025": "CCBI 2025",
  "census_2011": "Census 2011",
  "cronin_1959": "Cronin 1959",
  "debritto_prison_letter_1693": "de Britto 1693",
  "dessal_1902": "Dessal 1902",
  "diocese_thoothukudi_page": "Diocese page",
  "faber_1851": "Faber 1851",
  "history_2026": "Parish history 2026",
  "holy_see_canonisation_rite_2022": "Holy See 2022",
  "india_orientalis_christiana_1794": "Paulinus 1794",
  "jemparc_book450": "The parish diary",
  "la_mission_du_madure_periodical": "Mission du Maduré",
  "maalaimalar_2022": "Maalaimalar 2022",
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
