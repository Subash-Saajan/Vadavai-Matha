# The fixes to apply

Derived from CITATION_AUDIT.md. **The parish has ruled on three things — respect them exactly:**

1. **THE 1803 DATE IS OUT OF SCOPE.** Do not touch any 1803 copy, date, weekday, or the
   `APPARITION` const. Leave `the-weeping-madonna` dots 4, 5, 6, 7 and `faq.ts`'s 1803
   answers exactly as they are, errors and all. (`faq.ts:106` remains factually wrong —
   deliberately, for now.)
2. **THE CASTE HISTORY IS OUT OF SCOPE.** Do not touch `little-rome` dot 1 (the 1910
   partition wall) or `great-two-nave-church` dot 0 (the 1838 caste seating), in either
   language. Do not add Sivasubramanian or the 1926 Madras High Court to the bibliography.
   Leave the false "true act of reconciliation" sentence alone — it is the parish's call.
3. **THE SOUVENIR IS NOW CITABLE.** `souvenir_150yr` may be chipped. It is the parish's own
   jubilee book, so every dot that leans on it is `tradition`, never `documented`.

---

## New source ids

| id | group in sources.ts | SOURCE_SHORT |
|---|---|---|
| `souvenir_150yr` | already exists, "The parish's own records" | `"150-Year Souvenir"` |
| `maalaimalar_2022` | **NEW** — "The outside record" | `"Maalaimalar 2022"` |
| `bishop_stephen_jubilee_2022` | **NEW** — "The parish's own records" | `"Bishop Stephen 2022"` |

- `maalaimalar_2022` — Maalaimalar (Tamil daily), 5 August 2022. The **only external,
  non-parish witness to the living cult**: it reports the chariot procession at about 1 a.m.
  on 15 August drawing roughly a lakh of pilgrims, many from Kerala.
  url: `https://www.maalaimalar.com/devotional/worship/paraloga-matha-church-festival-on-tomorrow-495666`
- `bishop_stephen_jubilee_2022` — Bishop A. Stephen's jubilee message, 2022. Quoted by name on
  the page (it dates de Britto's coming, the baptisms and the church to 1686) and currently
  credited to nobody. It is a **diocesan** witness, so it belongs with the parish's own records.

**Fix `SOURCE_SHORT["ccbi_patron_laity_2025"]`: `"Holy See 2025"` → `"CCBI 2025"`.** It is the
Conference of Catholic Bishops of India, not the Holy See. On a page whose whole thesis is that
the tier is not decoration, promoting a bishops' conference to the Holy See is the exact move
the file forbids.

---

## citations.ts — keys

| Era · dot | Remove | Add |
|---|---|---|
| `clearing-in-the-forest` 3 | `auguste_jean_1894` | — |
| `clearing-in-the-forest` 5 | — | `bishop_stephen_jubilee_2022` |
| `clearing-in-the-forest` 6 | `maldonado_1697` | — |
| `clearing-in-the-forest` 7 | `history_2026`, `pate_gazetteer_1917` | — |
| `first-inland-parish` 0 | `auguste_jean_1894` | — |
| `first-inland-parish` 2 | `bertrand_1847` | — |
| `statue-and-the-saint` 0 | `auguste_jean_1894` | `diocese_thoothukudi_page` |
| `statue-and-the-saint` 1 | `diocese_thoothukudi_page` | — |
| `statue-and-the-saint` 2 | — | `souvenir_150yr` |
| `statue-and-the-saint` 4 | — | `souvenir_150yr` |
| `the-weeping-madonna` 5 | `besse_1914` | — |
| `the-weeping-madonna` 7 | `neill_1985`, `diocese_thoothukudi_page` | — |
| `great-two-nave-church` 3 | `auguste_jean_1894` | — |
| `little-rome` 0 | — | `souvenir_150yr` |
| `little-rome` 2 | — | `la_mission_du_madure_periodical` |
| `little-rome` 3 | — | `neill_1985` |
| `little-rome` 4 | `arsi_tolosana_1914`, `neill_1985` | `souvenir_150yr` |
| `little-rome` 6 | `bethany_sisters_healing_ministry` | — |
| `town-of-learning` 0 | — | `stuart_manual_1879` |
| `town-of-learning` 1 | `history_2026` | `souvenir_150yr` |
| `town-of-learning` 2 | `history_2026`, `diocese_thoothukudi_page` | — |
| `shrine-and-the-saint` 0 | — | `souvenir_150yr` |
| `shrine-and-the-saint` 1 | `history_2026` | `souvenir_150yr`, `catholictamil_182` |
| `shrine-and-the-saint` 5 | — | `maalaimalar_2022` |

**Do NOT touch `great-two-nave-church` 0 or `little-rome` 1 (caste — out of scope).**

Keys must stay in **authority order** — the order of the groups in `sources.ts`, strongest
witness first, the parish's own books last.

## citations.ts — tiers

| Era · dot | Change | Why |
|---|---|---|
| `town-of-learning` 2 | `documented` → `tradition` | All keys were parish-side; the one real witness is a first-person piece written *for the parish's own souvenir*. The 1944 Rosarian dot is the identical case and is already `tradition`. |
| `great-two-nave-church` 5 | `documented` → `tradition` | Its own note calls it "single-witness parish tradition". |
| `statue-and-the-saint` 2 | `documented` → `tradition` | The year, the ceremony and the fabric are all parish-side. Only Bertrand's *undated* "jeta les fondements" is external. |

## citations.ts — notes

Every `note` must become **one or two sentences of finding** — what the sources establish, and
what they do not. Not a raw quote dump, not an OCR line reference. 12 are currently truncated
mid-word and 6 are empty strings; several others describe a version of the page that no longer
exists. Rewrite all of them from the audit. Notes are internal-only (never rendered), so they
are for the next maintainer — say the useful thing.

Delete the leftover to-do in `clearing-in-the-forest` 5 ("Recommended: fold this dot into the
1685 dot") and the stale "TIER FLAG" opener in `shrine-and-the-saint` 2.

Also fix the header comment on `HistoryExperience.tsx:22`: "34 dots across the seven eras" →
**53 dots across eight eras**.

---

## sources.ts — corrections to its own text

1. **The sort it promises does not exist.** Lines 28–30 claim "citations.ts reads that order and
   sorts every citation by it". Nothing sorts; `HistoryExperience.tsx` renders `keys` in array
   order. It is currently correct **by hand, and by luck**. Either implement the sort or delete
   the claim. (Prefer: implement it — a `sortKeys()` in citations.ts that orders by position in
   `SOURCE_GROUPS`. Then the promise becomes true and the next hand-edit cannot break it.)
2. **`jemparc_book450`'s note says it is "never used on /history".** It is used, on
   `little-rome` dot 2.
3. **`souvenir_150yr`'s note says "nothing on this website is cited to it".** No longer true —
   the parish has decided to cite it openly. Rewrite the note to say what it now is: the
   parish's own jubilee book, cited where it is genuinely the source, and always at `tradition`.
   Keep the honest paragraph about it dating the apparition to 1805.
4. **The `neill_1985` note is factually wrong.** It says Neill's footnote preserves the Besse
   page-reference for the 1803 tradition. It does not — Neill cites Besse at **p. 477**, a list
   of *coastal* stations that excludes Vadakkankulam. Correct it.
5. **The `faber_1851` note says it is "cited for the founding acts of 1685–86".** Faber never
   mentions Vadakkankulam. He is cited for the prison letter and the martyrdom. Correct it.
6. **The `arsi_tolosana_1914` note truncates away its own evidence.** It quotes the entry as
   "P. Adrianus Caussanel, Cur. ag. par." and stops. The line continues
   `et conv. mon Ind. Sept. Dol. B. M. V.` — which is the exact clause the 1892 dot cites it for.

---

## i18n.ts — copy fixes (apply to BOTH the English and the Tamil)

Each is a case where the page contradicts the source it cites. Keep the house voice: plain,
unhurried, never defensive. Where a claim is the parish's own, say so in the sentence.

| Era · dot | Now | Should be |
|---|---|---|
| `clearing` 2 (c.1680) | "So deep was her **love of Our Lady** that she raised a little roadside Crusadi" | Her **Catholic faith**. Both witnesses say a **cross**-shrine; the parish's own book says "*Being firm in her Catholic faith*". The current line retro-fits the 1803 Marian devotion onto a 1680 cross. |
| `statue` 2 (1749) | "a larger, lasting church **of stone and mortar**" | The parish's own English history says **broad bricks from Perungudi**. "Stone and mortar" is in no source. Drop it. |
| `statue` 4 (1752) | "**the stone church** was finished" | Same — **brick**, not stone. |
| `statue` 4 (1752) | "the great Feast of the Assumption took root here as the parish's principal festival, **the celebration that endures to this day**" | **Bertrand — this dot's own cited source** — records the titular feast of this church as **St Francis Xavier's**, with a great December novena, right up to the 1872 re-dedication. Attribute the Assumption claim to the parish's own record and cut "endures to this day". |
| `statue` 5 (1752) | "shot at **Kattadimalai** near the Aralvaimozhi pass" | **Kattadimalai appears in no historical source** — it enters only via the modern (2022) national shrine. The sources describe the Travancore lines at the Aralvaimozhi gap and never name it. Say that, or attribute the modern name. |
| `statue` 5 (1752) | "His **head-turban relic** is treasured at Vadakkankulam to this day" | Auguste Jean 1894 — the oldest witness, and one this page cites — says the church holds "**a part of his garment and the chains with which he was bound**". Restore the chains. The turban is the **diocese's** modern account; attribute it. |
| `weeping` 0 (1775–1838) | pastors "under the **Archbishop of Cranganore**" | The roll being cited is headed "**the Priest of Cochin**", and the page's own next-but-one dot cites Paulinus 1794 placing the village under the **Bishop of Cochin**. Fix to Cochin. *(This is a jurisdiction fix, not an 1803 fix — it is in scope.)* |
| `great-two-nave` 1 (1839) | "The bishop… parted from him for it and **went down to the coast alone**" | Inverted. The bishop asked **Bertrand** to leave *him*, so Bertrand could keep the novena at Vadakenkoulam and then go inland to **Palamcottah**. Cut the clause. |
| `great-two-nave` 3 (1855) | "**Cut into that stone** was the bold motto" | Nobody has inspected the stone; the Latin survives only in parish-side books and is textually corrupt; `history_2026` says only that a priest **composed a verse**. Change to the parish's own record of a Latin motto — do not assert it was engraved. |
| `great-two-nave` 4 (1855–72) | "whom **the chroniclers** called 'the apostle of Vadakenkoulam'" | **One** chronicler — Auguste Jean, p. 446. Singular. |
| `great-two-nave` 5 (1861) | "hung in the new **tower**" | **Towers.** Two 92-ft towers, a bell in each. |
| `great-two-nave` 6 (1863) | Delpech "died here himself… **on 16 January 1887**" | That is **Dessal's** date alone. Auguste Jean says he died "*un samedi*" — a Saturday — and 16 Jan 1887 was a Sunday. Attribute the date to Dessal. |
| `great-two-nave` 9 (1873/75) | "Auguste Jean gives **18 September** 1873, Dessal 19 September 1875" | Auguste Jean gives **19 September**. The 18th is the day the ship entered the Red Sea; he died "*le lendemain… vers 2 heures*". **The two chroniclers agree on the day and differ only on the year** — a truer and better sentence. |
| `little-rome` 2 (1881–1923) | "**Forty-two years** of this parish were written down, **day by day**… The Society's Roman catalogue of 1914 sets the same man here **in the same years**." | Caussanel was **ordained in 1884** and **reached India in 1888**; ARSI 1900 puts another priest here, ARSI 1921 puts him at Kallikulam, and the parish's own list gives him **1910–1919**. 1914 is the *only* year a catalogue puts him here. The same Jesuit magazine says what he actually did: he wrote "*des diaires, une histoire du pays*" and "*recherche les vieux manuscrits et les déchiffre*" — Book 450 is a **retrospective compilation from old manuscripts**, not a day-by-day diary kept in place. Rewrite to that. It is true, and it is a better story. |
| `little-rome` 5 (1930) | The Pope's "*Oh! the beautiful family… two priests and a bishop. What a happy mother!*" said of **the sacristan** | The magazine puts the exclamation in a different paragraph, about **Bishop Roche's own family** — the next sentence sends a gold rosary to "*la mère de Mgr Roche*". The sacristan was brother of *one* vicar general and *one* convent superior: **no bishop**. Keep the sacristan and his Bene Merenti medal (that part is verbatim and lovely) and either cut the quotation or re-frame it as the Pope's words about Bishop Roche's family, spoken in the same audience. |
| `shrine` 0 (1993) | "proclaimed it a sacred shrine, **the Shrine of Our Lady of Assumption**" | Every 1993 witness says the **Holy Family Church** was declared a shrine. The Marian title is the shrine's **present** style, first attested in **2022**. Do not back-date it 29 years. Say it was proclaimed a shrine, and that it is **styled today** the Shrine of Our Lady of Assumption. |
| `shrine` 1 (2014) | "carrying forward a chariot tradition that reaches back to the thirty-five-foot car first built… in 1891" | The souvenir says the 1891 car **was retired** and now stands as the cradle of the Pilgrims' Mother. It does not process. The 1891 dot already says this correctly; this dot re-implies the continuity it denies. |
| `shrine` 5 (present) | "some **10,500** parishioners in around 4,000 families" | **Both chips under this sentence refute it.** Census 2011: the whole town is **9,220** people. The diocese's own page: ~**7,350** Catholics in ~1,600 families. Attribute rather than assert — e.g. "the parish counts some 10,500 Catholics in about 4,000 families; the diocese's own roll gives about 7,350, and the 2011 census puts the whole town at 9,220." That sentence is **stronger**, not weaker, and it is the sentence the rest of this page has earned the right to write. Also surface the census's 94% literacy, which is currently cited and never shown. |

**Tamil must mirror English exactly** — same facts, same hedges, same attributions. The Tamil
bodies currently carry a few facts the English lacks; that is fine, but they must not carry any
claim the English has just corrected.
