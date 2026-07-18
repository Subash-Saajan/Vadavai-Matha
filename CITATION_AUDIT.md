# Citation audit — /history

Every one of the 53 moments on `/history` checked against the actual books on disk
(`_extracted_text/`, `_extracted_text_ocr/`, and the PDFs), not against the Knowledge
Base and not against the existing `note` fields — several of which turned out to be
stale or truncated.

---

## What is sound

- **Index alignment is perfect.** 53 dots, 8 eras. `HISTORY_CITATIONS` is correctly
  index-aligned with the English `dots` **and** with the Tamil ones — same count, same
  years, same order. The catastrophic failure mode (a citation silently attaching to the
  wrong year in Tamil) is not present.
- **No dead keys.** All 36 ids used resolve in `SOURCE_INDEX`. No chip points at a dead
  `/sources` anchor. `SOURCE_SHORT` covers every id in use.
- **Every named photo exists.**
- The best-attested things on the page really are the best-attested things: de Britto's
  prison letter, the martyrdom of 1693, the baptism of 1745, Pate on the church of 1872.

---

## A. Factual errors — the page contradicts the source it cites

| # | Where | The page says | The source says |
|---|---|---|---|
| 1 | `faq.ts:106` | "on the morning of **Friday 23 October 1803**" | 23 Oct 1803 was a **Sunday**. This sits inside an **FAQPage answer**, fed straight to Google and to LLMs — the single most liftable string on the site. |
| 2 | `shrine…` dot 5 | "some **10,500** parishioners in around 4,000 families" | Both chips under it refute it. **Census 2011**: the whole town is **9,220** people. **The diocese's own page**: ~**7,350** Catholics in ~1,600 families. A reader who clicks the source is punished for it. |
| 3 | `statue…` dot 5 | "shot at **Kattadimalai**" | The name appears in **no** historical source. It enters the corpus only via Wikipedia and the modern (2022) national shrine. Bertrand and Auguste Jean never name the site. |
| 4 | `statue…` dot 5 | "His **head-turban** relic is treasured" | Auguste Jean 1894 — **the cited source** — says the church holds "*une partie de son vêtement et les chaînes dont il fut garrotté*": **a part of his garment and the chains with which he was bound.** No turban. The chains are dropped. |
| 5 | `statue…` dots 2, 4 | "a lasting church of **stone and mortar**" / "the **stone** church" | The parish's own English history says **broad bricks from Perungudi**. "Stone and mortar" is in no source for this building. |
| 6 | `little-rome` dot 1 | "It was **a true act of reconciliation**" | **Every** witness says litigation. **Pate 1917** — writing five years later, with Caussanel himself as his named informant — says: "*The solution of the trouble was by no means accomplished. Further disputes arose; petitions, counter-petitions and law-suits followed.*" **Neill**: the wall came down "in the face of intense opposition". The **Jesuits' own magazine** (1930): "*de longues luttes*", and an eyewitness who found "*une bataille furieuse*" raging. |
| 7 | `great-two-nave` dot 9 | "Auguste Jean gives **18 September** 1873, Dessal 19 September 1875" | Auguste Jean gives **19 September**. The 18th is the day the ship *entered the Red Sea*; he died "*le lendemain… vers 2 heures*". **The two chroniclers agree on the day and differ only on the year** — a sharper and truer sentence than the one printed. |
| 8 | `little-rome` dot 5 | The Pope's "*Oh! the beautiful family… two priests and a bishop. What a happy mother!*" → said of **the sacristan** | The magazine puts it in a different paragraph, about **Bishop Roche's** family — the next sentence sends a gold rosary to "*la mère de Mgr Roche*". The sacristan was brother of *one* vicar general and *one* convent superior. **No bishop. The arithmetic doesn't work.** |
| 9 | `little-rome` dot 2 | Caussanel's diary, "**1881**–1923", "forty-two years… day by day" | He was **ordained in 1884** and **landed in India in 1888**. ARSI 1900 puts another priest here; ARSI 1921 puts him at Kallikulam; the parish's own list gives him **1910–1919**. 1914 is the *only* year any catalogue puts him at Vadakkankulam. The same magazine explains what Book 450 actually is: he wrote "*des diaires, une histoire du pays*… *il recherche les vieux manuscrits*" — a **retrospective compilation**, which is a better story and a true one. |
| 10 | `shrine…` dot 0 | 1993: "proclaimed it a sacred shrine, **the Shrine of Our Lady of Assumption**" | Every 1993 witness says the **Holy Family** Church was declared a shrine. The Marian title is the shrine's **present** style, first attested in a **2022** letter. This back-dates a 2022 title by 29 years and swaps the church's actual dedication. |
| 11 | `clearing…` dot 2 | "So deep was her **love of Our Lady** that she raised a little roadside Crusadi" | The parish's own book: "*Being firm in her **Catholic faith**, she erected a small Crusadi*". Bayly: "*a small shrine containing **a cross***". This retro-fits the 1803 Marian devotion onto a 1680 **cross**. |
| 12 | `statue…` dot 4 | 1752: "the great Feast of the Assumption took root here as the parish's principal festival, **the celebration that endures to this day**" | **Bertrand — the dot's own cited source** — records the titular feast of this church as **St Francis Xavier's**, with a great December novena. `sources.ts` already says this in its own note on Bertrand. |
| 13 | `clearing…` dot 7 | "**Canonised in 1947**" | No support in any cited key and **none anywhere in the corpus**. Faber (1851) and Boero (1853) predate it. True, but uncitable as the page stands. |
| 14 | `great-two-nave` dot 6 | Delpech died "**on 16 January 1887**" | That is **Dessal's** date alone. Auguste Jean says he died "*un samedi*" — a **Saturday**. 16 Jan 1887 was a Sunday. |
| 15 | `weeping…` dot 0 | pastors "under the **Archbishop of Cranganore**" | The roll the page is citing is headed "**the Priest of Cochin**", and the page's **own dot 2** cites Paulinus 1794 placing the village "among the churches subject to the **Bishop of Cochin**". The page contradicts itself two dots apart. |
| 16 | `great-two-nave` dot 0 | the fathers found the people seated apart by caste "**in the old chapel**" | Fr Martin's letter says *l'église* — and in 1838 that was the **1749–52 stone church**, not a chapel. |
| 17 | `great-two-nave` dot 1 | the bishop "**went down to the coast alone**" | Inverted. The bishop asked **Bertrand** to leave *him*, so Bertrand could go to Vadakenkoulam and then inland to **Palamcottah** to follow the lawsuits. |
| 18 | `great-two-nave` dot 4 | "whom **the chroniclers** called 'the apostle of Vadakenkoulam'" | **One** chronicler: Auguste Jean, p. 446. The dot's own note already says "one chronicler, not several". |
| 19 | `great-two-nave` dot 5 | the bells "hung in the new **tower**" | The parish's history records **two** 92-ft towers with a bell in each. |
| 20 | `great-two-nave` dot 3 | "**Cut into that stone** was the bold motto" | Nobody has ever inspected the stone. The Latin exists only in parish-side books, is **textually corrupt** (`tribulis ingemnis` is not Latin), and the page prints the clean half while glossing the corrupt half. `history_2026` says only that a priest *composed a verse* — not that anything was engraved. |

---

## B. Wrong citations — the key does not support the dot

| Era · dot | Remove | Why |
|---|---|---|
| `clearing` 3 | `auguste_jean_1894` | His **first** mention of the village is Fr Borghese in **1709**. No Santhaayi, no cotton field, no road. |
| `clearing` 6 | `maldonado_1697` | A martyrology. It fixes the date of the **death**, not the letter. |
| `clearing` 7 | `history_2026`, `pate_gazetteer_1917` | The parish book's 1693 entry is about **Fr Ignatius da Costa** — it never mentions the martyrdom. Pate has **zero** martyrdom content, and is the source that *undercuts* "founder". |
| `first-inland` 0 | `auguste_jean_1894` | Nothing before 1709. |
| `first-inland` 2 | `bertrand_1847` | The "nearly 800 adults" appear in **no** book. `huit cents adultes` → zero hits in the whole corpus. |
| `statue` 0 | `auguste_jean_1894` | Nothing about a box, Portugal, Kootapuli, or a statue — anywhere. |
| `statue` 1 | `diocese_thoothukudi_page` | Parish-side stacking on an already-external dot. |
| `weeping` 5 | `besse_1914` | **Nobody on this project has opened the book.** It cannot be a per-detail chip. |
| `weeping` 7 | `neill_1985`, `diocese_thoothukudi_page` | Neill cites Besse at **p. 477** — a list of *coastal* stations that **excludes Vadakkankulam**. And a devotional page cannot be the citation for "what the parish does *not* claim". |
| `great-two-nave` 0 | `auguste_jean_1894` (lead chip) | Nothing on the 1838 return. The witness is **Fr Martin's letter of 14 July 1838**, printed by Bertrand. |
| `great-two-nave` 3 | `auguste_jean_1894` (lead chip) | Says **nothing** about 1855, the stone, or the motto. |
| `little-rome` 4 | `arsi_tolosana_1914`, `neill_1985` | A catalogue printed **12 years before** the event and **9 years before the diocese existed**. Six chips on a claim with no 1926 document of any kind. |
| `little-rome` 6 | `bethany_sisters_healing_ministry` | A document about **1970**. Nothing on 1944 or the Rosarians. |
| `town-of-learning` 1 | `history_2026` | Contains **no** 1921, 1922, 1966, lace, needlework or tailoring. The chip points at a book that does not say this. |
| `town-of-learning` 2 | `history_2026`, `diocese_thoothukudi_page` | Neither has 1970, Fr Gnanam, Misereor, the bed count or the village count. The whole dot rests on **one** document. |
| `shrine` 1 | `history_2026` | Contains **no "2014"**, no chariot, no Calvary chapel. |

---

## C. Tier errors — a filled gold "Documented" badge over parish-only sources

- **`town-of-learning` 2** (1970 hospital) — `documented`, and **all three keys are parish-side**. The one real witness is a first-person piece written *for the parish's own souvenir*. The 1944 Rosarian dot is the identical situation and is correctly tiered `tradition`.
- **`great-two-nave` 5** (the bells) — `documented`, but its **own note** calls it "single-witness parish tradition".
- **`statue` 2** (1749) — `documented`, but the year, the ceremony and the fabric are all parish-side. Only Bertrand's undated "*jeta les fondements*" is external.
- **`weeping` 4, 5, 6** — parish-family keys stacked. Dot 6 has **no outside key at all** on the era's most extraordinary claim.

---

## D. Cited on the page, but absent from the bibliography

These are real sources doing real work with no `id`, so they can never be chipped:

1. **A. Sivasubramanian, *Kiristhavamum Sathiyum* (2001)** — the **sole** source for "c.1910" and for Caussanel as the demolisher. The page's headline claim has no citable source.
2. **Madras High Court, *Innasimuthu Pillai v. Lutz*, 10 March 1926** — the civil primary document that resolves what actually happened. Absent.
3. **Maalaimalar, 5 Aug 2022** — the **only external, non-parish witness** to the living cult, and the only support for "close to a lakh of pilgrims".
4. **Bishop A. Stephen's 2022 jubilee message** — quoted by name on `clearing` dot 5, credited to nobody.
5. **vadavaimatha.net** — used as a source for the 1803 narrative; has no id.
6. **`stuart_manual_1879`** — has the "died one by one" sentence **two years before Caldwell**, and the convent of native nuns. Caldwell and Stuart are one witness, and Stuart has priority.

---

## E. Structural

- **18 of 53 notes are unusable**: 12 truncated mid-word (`…lay entrenched without the wa`), 6 empty strings. They are **internal-only** — `note` is never rendered — so this is a broken audit trail, not a broken page.
- **13 of 53 dots ship `placeholder.jpg`**, and **3 pairs of dots show byte-identical duplicate photos** (1838 = 1839; the c.1749 arrest = the 1752 martyrdom; the c.1864 convent = the 1892 school). These **are** rendered.
- **`sources.ts:28–30` claims a sort that does not exist in the code.** Nothing sorts `keys` by authority. It is currently correct by hand, and by luck.
- **`SOURCE_SHORT["ccbi_patron_laity_2025"] = "Holy See 2025"`** — it is the **Conference of Catholic Bishops of India**, not the Holy See.
- **`sources.ts` says `jemparc_book450` is "never used on /history"** — it is used, on `little-rome` dot 2.
- **`sources.ts` says nothing is cited to the souvenir** — but the souvenir is the true and often sole source for the 1749 *kankol*, the east-facing plan, the 6 Aug 1993 date, the 1891 chariot, the 2014 chariot, the lace-school dates and the word "Friday".
- **`sources.ts`'s note on Neill is factually wrong** — it says Neill's footnote preserves the Besse page-reference for the 1803 tradition. It does not; Neill cites Besse p. 477, on coastal stations.
- **Paulinus 1794 is quoted on the page but the PDF is not in the repo.** (Both page numbers — p. 158 and p. 117 — are nevertheless **verified correct** against the archive.org scan.)
- `HistoryExperience.tsx:22` says "34 dots across the seven eras". It is **53 across 8**.

---

## F. The 1803 date — the one that needs a decision

The sources genuinely conflict, and the site currently says four different things.

| Source | Date | Weekday |
|---|---|---|
| The diocese's own page | **23 October 1803**, ~11.20 a.m. | — |
| vadavaimatha.net (parish) | **23 October 1803**, ~11.20 a.m. | — |
| church.catholictamil.com | **23 October 1803** | — |
| Cardinal Poola Anthony, 2022 | **23.10.1803** | — |
| `history_2026` (parish compilation) | **21 October 1803**, ~11 a.m. | — |
| The 150-year souvenir | **1805** (a copying slip), Aippasi 7 | **"வெள்ளிக்கிழமை" — Friday** |
| `ADDENDUM_3`, converting Aippasi 7 / Kollam 979 | **22 October 1803** | Saturday |

- **21 Oct 1803 was a Friday. 22 Oct was a Saturday. 23 Oct was a Sunday.** (Verified.)
- **"Friday" has exactly one source in the world: the souvenir** — the book the site publicly promises it cites for nothing, on a page its own extraction calls *faded*, and which reads **1805**.
- The page currently synthesises **Friday + Aippasi + 21 October**. **No source makes that combination.**
- Meanwhile `history.ts`, `sources.ts`, `schema.ts` and `faq.ts` all still say **23 October** — so the site's machine-readable data and its prose now disagree with each other.

**Recommendation:** assert **23 October 1803** (the diocese, both Tamil parish sources, the 2022 Cardinal's letter, the feast, and all four data files already agree); note in the copy that the parish's 2026 compilation gives 21 October; and **drop "Friday" entirely** — its only witness says 1805 and is illegible.
