/**
 * Sources & further reading.
 *
 * Almost no parish website on earth cites its sources. This one can cite the
 * Jesuit archives in Rome, a colonial gazetteer, and the Holy See — so it
 * should, and the page should be honest about which of the parish's own
 * traditions are documented and which are not.
 *
 * The SEO argument and the honest argument happen to be the same argument.
 * Search engines and answer engines are both, in the end, trying to work out
 * whether a page can be trusted; a page that says "this rests on one citation
 * nobody in this project has physically read" is far more trustworthy than one
 * that asserts everything with equal confidence. This page is the site's
 * strongest single trust signal, and it costs nothing but candour.
 *
 * (Caste-focused works are deliberately not listed here — the parish has
 * decided the website will not carry that history, and it would be incoherent
 * to exclude the subject from the pages and then cite it in the bibliography.)
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THE ORDER OF THIS FILE IS THE ORDER OF AUTHORITY, and it is load-bearing.
 * It runs from the Holy See, through the founder's own hand, the Roman Jesuit
 * registers, the colonial and official record, the printed mission histories
 * and modern scholarship — down to the parish's own publications, which come
 * LAST. The further a witness stands from this parish, the higher it sits.
 *
 * citations.ts enforces that order in code: its sortKeys() ranks the keys of every
 * citation by where each source sits in SOURCE_GROUPS, so a reader on /history
 * always sees the strongest witness first and our own book last. This used to be
 * true only by hand, and by luck — the chips were in the right order because
 * somebody had typed them in the right order, and one careless edit would have put
 * the parish's own book above the Holy See without anybody noticing. Now it is true
 * by construction: reorder the groups here and the chips on every moment of the
 * history page reorder themselves to match. Do not add a second ranking anywhere;
 * this is the ranking.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * ─────────────────────────────────────────────────────────────────────────
 * EVERY SOURCE HAS AN `id`. That id is two things at once:
 *   1. the anchor on /sources — /sources#pate_gazetteer_1917 — so a citation
 *      anywhere on the site can link a reader straight to the book, and
 *   2. the key the history page cites (see citations.ts).
 * Ids are stable. Renaming one breaks a link on a page you are not looking at,
 * so don't — add an alias instead.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type Source = {
  /** Stable key. The /sources anchor, and what citations.ts cites. Never rename. */
  id: string;
  author?: string;
  title: string;
  detail: string;
  /** What this source establishes for THIS parish. */
  note: string;
  /** Free to read online, or on a shelf somewhere. Say which. */
  url?: string;
  archiveOnly?: boolean;
};

export type SourceGroup = {
  heading: string;
  blurb?: string;
  items: Source[];
};

export const SOURCE_GROUPS: SourceGroup[] = [
  {
    heading: "The Holy See, on St Devasahayam's baptism here",
    blurb:
      "The best-attested fact about this village does not come from us. That St Devasahayam Pillai was baptised at Vadakkankulam in 1745 is recorded by the Holy See's own sources and sealed by his canonisation in 2022.",
    items: [
      {
        id: "vatican_news_canonisation",
        title: "Vatican News — the canonisation of Devasahayam Pillai",
        detail: "Holy See news service, 2021",
        note: "States that he “was baptized at the Catholic church of Vadakkankulam village… by Jesuit priest Father Bouttari”.",
        url: "https://www.vaticannews.va/en/church/news/2021-11/india-catholic-church-canonization-devasahayam-may-22-2022.html",
      },
      {
        id: "osservatore_romano_2012",
        author: "John Elphinston, Vice-Postulator of the cause",
        title: "L'Osservatore Romano",
        detail: "Weekly Edition in English, 5 December 2012, p. 11",
        note: "Names both the place and the date: Fr Buttari “instructed him for nine months and baptized him on 14 May 1745”.",
        url: "https://www.ewtn.com/catholicism/library/courageous-convert-and-a-living-legend-5434",
      },
      {
        id: "pope_francis_homily_2022",
        title: "Homily at the Canonisation Mass, 15 May 2022",
        detail: "Pope Francis",
        note: "The canonisation itself — “Lazzaro, detto Devasahayam”.",
        url: "https://www.vatican.va/content/francesco/en/homilies/2022/documents/20220515-omelia-canonizzazione.html",
      },
      {
        id: "holy_see_canonisation_rite_2022",
        author: "Dicastero delle Cause dei Santi",
        title: "Canonizzazioni — 15 May 2022",
        detail: "The Holy See's own record of the rite",
        note: "The official act, listing “Lazzaro, detto Devasahayam” among the ten canonised that day.",
        url: "https://www.causesanti.va/it/celebrazioni/canonizzazioni/2022/05/15.html",
      },
      {
        id: "ccbi_patron_laity_2025",
        author: "Conference of Catholic Bishops of India",
        title: "St Devasahayam declared Patron of the Laity in India",
        detail: "Decree of the Dicastery for Divine Worship, 16 July 2025; proclaimed 15 October 2025",
        note: "The most recent act of the Holy See touching this parish. On the petition of the Indian bishops, the saint baptised in this church on 14 May 1745 was confirmed as Patron of the Laity in India.",
        url: "https://www.ccbi.in/post/pope-leo-declares-saint-devasahayam-patron-of-the-laity",
      },
    ],
  },
  {
    heading: "The founder, in his own words",
    items: [
      {
        id: "debritto_prison_letter_1693",
        author: "St John de Britto, S.J.",
        title: "Letter from the prison of Oriyur, 3 February 1693",
        detail: "Written the night before his death; printed in Bertrand, La Mission du Maduré, vol. III",
        note: "The saint who founded this parish, in his own hand: “The whole crime of which I am accused is teaching the law of the true God…”",
        url: "https://archive.org/details/TheLivesOfFather",
      },
      {
        id: "maldonado_1697",
        author: "Jean-Baptiste de Maldonado, S.J.",
        title: "Illustre certamen R.P. Joannis de Britto",
        detail: "Antwerp, 1697",
        note: "The earliest printed martyrology of de Britto, published four years after his death; its title alone fixes the date.",
        url: "https://bndigital.bnportugal.gov.pt/en/records/item/91889",
      },
      {
        id: "boero_1853",
        author: "Giuseppe Boero, S.J.",
        title: "Vita del beato Giovanni de Britto",
        detail: "Rome: La Civiltà Cattolica, 1853 — Italian",
        note: "The Roman life of the founder, written for the beatification. It descends from the same seventeenth-century Jesuit dossier as Faber, so it corroborates the tradition rather than testing it.",
        url: "https://archive.org/details/bub_gb_Tmt1SuYLFBEC",
      },
    ],
  },
  {
    heading: "The Jesuit archives",
    blurb:
      "Vadakkankulam was a Jesuit parish of the Madurai Mission. The Society's own registers record, year by year, who was here.",
    items: [
      {
        id: "arsi_tolosana_1872",
        title: "Archivum Romanum Societatis Iesu (ARSI), Rome",
        detail: "Province catalogues, Provincia Tolosana",
        note: "The 1872 catalogue lists Br Joseph Bergenthal as “Ædif. eccl. Vadakencoulam” — the builder of the church at Vadakkankulam, in the very year it was blessed. This is the independent confirmation of the architect named in the parish's own history.",
        archiveOnly: true,
      },
      {
        id: "arsi_tolosana_1900",
        title: "Catalogus Provinciae Tolosanae S.J., 1900",
        detail: "ARSI, Rome — Madurai Mission, station 3",
        note: "“3. Vadakenkoulam. P. Marianus Dayriam, Cur. ag. paroch. et conv. monial. ind. sept. Dol. B. M. V., Dir. schol.” The Society's own register sets down the priest of Vadakkankulam as chaplain of the convent of Indian nuns of the Seven Sorrows and director of its school — in Latin, in Rome, in 1900.",
        archiveOnly: true,
      },
      {
        id: "arsi_tolosana_1914",
        title: "Catalogus Provinciae Tolosanae S.J., 1914",
        detail: "ARSI, Rome — p. 57",
        note: "“16. Vadakankulam. P. Adrianus Caussanel, Cur. ag. par. et conv. mon Ind. Sept. Dol. B. M. V.” — the Society's own register, in Latin, in Rome: the priest of Vadakkankulam, parish priest and chaplain of the convent of the Indian nuns of the Seven Sorrows. This note used to stop at “Cur. ag. par.” and drop the rest of the line, which was a small self-inflicted wound: the convent clause is the exact thing the 1892 moment on /history cites this catalogue for, and we were truncating away our own evidence. One caution on the other side. This is the only year in which any catalogue we have seen places Caussanel at this parish — the 1900 catalogue has another priest here, the 1921 one has him at Kallikulam, and the parish's own list gives him 1910–1919 — so the entry fixes him here in 1914 and cannot, by itself, carry a forty-two-year residence.",
        archiveOnly: true,
      },
      {
        id: "arsi_madurensis_1921",
        title: "Catalogus Missionis Madurensis, 1921",
        detail: "ARSI, Rome — p. 13",
        note: "“28. Vadakenkulam — STATIO S. FAMILIÆ.” The Society of Jesus recording, in Latin, that this is the station of the Holy Family.",
        archiveOnly: true,
      },
      {
        id: "jemparc_book450",
        title: "Jesuit Madurai Province Archives (JEMPARC), Shembaganur",
        detail: "Book 450 — Diary of Fr A. Caussanel, S.J., at Vadakenkulam, 1881–1923",
        note: "The most important unpublished document specific to this church, and it is cited on /history — on the Caussanel moment of “Little Rome”, where the parish's own record of its past is the thing being described. What the book is deserves a plainer word than “diary”. The mission's own magazine says of Caussanel that he wrote “des diaires, une histoire du pays” and that he “recherche les vieux manuscrits et les déchiffre” — he hunted out the old manuscripts and deciphered them. Book 450 is therefore a compilation drawn from older papers, not forty-two years of days written down as they were lived: Caussanel was ordained in 1884 and did not reach India until 1888, so he cannot have kept it in person from 1881. That is a truer account of it, and a better one. It survives; we have not yet read it.",
        url: "https://archivesj.in",
        archiveOnly: true,
      },
      {
        id: "buttari_manuscript",
        author: "Fr Giovanni Battista Buttari, S.J.",
        title: "The Buttari manuscript",
        detail: "ARSI, Malabarica–Historia, vol. 6; printed Loreto, 1844",
        note: "Written by the priest who baptised St Devasahayam at this church and remained his confessor. It is the literary root of the entire Devasahayam tradition.",
        archiveOnly: true,
      },
      {
        id: "la_mission_du_madure_periodical",
        author: "Toulouse Province Jesuits",
        title: "La Mission du Maduré",
        detail: "Periodical, 1912–1933 — BnF Gallica",
        note: "The mission's own magazine. It is here that Fr Caussanel's long service at this parish is described, and the aged sacristan of the Soosai-Marianather family is recorded being received by Pope Pius XI in 1930.",
        url: "https://gallica.bnf.fr/ark:/12148/cb32816871d/date",
      },
    ],
  },
  {
    heading: "The outside record",
    blurb:
      "Printed, official and statistical sources — written by people with no interest in flattering the parish, and in one case by a man who had never been near it.",
    items: [
      {
        id: "india_orientalis_christiana_1794",
        author: "Paulinus a S. Bartholomaeo, O.C.D.",
        title: "India Orientalis Christiana",
        detail: "Rome: Typis Salomonianis, 1794 — p. 158",
        note: "The earliest appearance of this village in a European printed book: “XIV. Vadakencollam”, listed among the churches under the Bishop of Cochin. It is also a source we ourselves have long cited wrongly — our own compilation gives “Rome 1714, p. 168”, and reads into it a founding “after 1545”. The book is Rome 1794, the entry is on p. 158, and no founding date appears in it at all. We would rather print the correction than the claim.",
        url: "https://archive.org/details/indiaorientalis00paulgoog/page/n189/mode/1up",
      },
      {
        id: "bell_inscription_photograph",
        title: "The bell itself — photographed in the tower",
        detail: "Parish photograph of the 1861 bell, inscription legible",
        note: "The Knowledge Base recorded that the bells' inscriptions “have never been photographed”, which left the whole story of them — Lyon, the Burdin foundry, the donor — resting on a single Tamil web page that the parish's own souvenir contradicts on the donor's name. A photograph of the bell now exists, and the bronze reads “…GRÉGOIRE DE VALENCE…” and “…ATEUR CASIMIR GRÉGOIRE”. The object settles what the paper could not: the donor is named on the bell he gave.",
        archiveOnly: true,
      },
      {
        id: "archives_lyon_burdin",
        author: "Archives municipales de Lyon",
        title: "The Burdin bell foundry, Lyon",
        detail: "Burdin Aîné, 28 rue de Condé — foundry records",
        note: "Cited for exactly what it proves, and no more. The Lyon municipal archives confirm that the Burdin foundry existed, was casting bells in these years, and exported them widely — to France, Algeria, Canada — which is what makes a bell reaching a mission church in south India entirely credible. It says nothing whatever about Vadakkankulam. It corroborates the story's setting, not the story.",
        url: "https://archives.lyon.fr/",
      },
      {
        id: "pate_gazetteer_1917",
        author: "H. R. Pate",
        title: "Madras District Gazetteers: Tinnevelly, Vol. I",
        detail: "Madras: Government Press, 1917",
        note: "Records that Christianity at Vadakkankulam “dates from the closing years of the seventeenth century” and that “the present handsome church… was completed in 1872” — an outside, official confirmation of both the antiquity of the mission and the date of the present building.",
        url: "https://archive.org/details/in.ernet.dli.2015.13347",
      },
      {
        id: "caldwell_1881",
        author: "Robert Caldwell",
        title: "A Political and General History of the District of Tinnevelly",
        detail: "Madras: Government Press, 1881",
        note: "The foundational history of the district in which the parish stands. It is also the source that corrects us: the twenty thousand Paravas of the coast were baptised by Fr Michael Vaz after the Portuguese expedition of 1532 — a decade before St Francis Xavier arrived.",
        url: "https://archive.org/details/politicalgeneral00caldrich",
      },
      {
        id: "mackenzie_1901",
        author: "G. T. Mackenzie",
        title: "Christianity in Travancore",
        detail: "Trivandrum: Government Press, 1901 — p. 80",
        note: "A British administrator's survey, with no interest in a Tinnevelly Catholic shrine, that sets the baptism down plainly from the other side: Fr Bouttari “in 1745 baptised a Travancore convert who is reverenced as a martyr”, a man of good family who held office in the court of the Raja and was “baptised, being then thirty-two years of age”, taking the name Devasagayam. Independent confirmation of the parish's central 1745 fact — the man's standing, his age, and the place.",
      },
      {
        id: "krishnaswami_ayyar_1934",
        author: "K. N. Krishnaswami Ayyar",
        title: "Madras District Gazetteers: Tinnevelly — Statistical Appendix & Supplement",
        detail: "Madras: Government Press, 1934 — p. 169",
        note: "The government supplement to Pate's gazetteer, which turns the parish's “empty” years around: during the sixty-three Jesuit-less years, “Vadakkankulam then became the sole centre of the inland mission with four divisional centres… Sendamangalam, Andipatti, Kamanayakkanpatti and Vadakkankulam itself”, served from Cochin until the charge was made over to the new Jesuits in 1837. We quote only that sentence from the page.",
      },
      {
        id: "stuart_manual_1879",
        author: "A. J. Stuart",
        title: "A Manual of the Tinnevelly District",
        detail: "Madras: Government Press, 1879 — p. 62",
        note: "A British district manual, written with no interest in the parish, which records a convent of native nuns at Vadakkankulam by about 1864. Outside evidence that the women's religious life of this town is older than any of our own books claim.",
        url: "https://archive.org/details/manualoftinnevel00stuarich",
      },
      {
        id: "cms_intelligencer_1880",
        author: "Church Missionary Society",
        title: "The Church Missionary Intelligencer and Record, vol. V",
        detail: "London: Church Missionary House, August 1880, pp. 512–513",
        note: "The obituary of the Rev. John Bilderbeck (1809–1880) — the son of the European family the parish's 1803 account places at Vadakkankulam. A Protestant missionary journal, with no reason at all to flatter a Catholic shrine, records that he was “born in India… of a Roman Catholic family, and trained for the priesthood of that Church”. The outside record's own confirmation that the Bilderbecks were real, Catholic, and had raised their son for the Church.",
        url: "https://archive.org/details/1880TheChurchMissionaryIntelligencer",
      },
      {
        id: "badley_directory_1886",
        author: "B. H. Badley",
        title: "Indian Missionary Directory and Memorial Volume",
        detail: "Calcutta: Methodist Publishing House, 1886 — p. 37",
        note: "A Methodist reference work, written for missionaries by missionaries: “John Bilderbeck. B. in 1809 in I[ndia]. Was a Roman Catholic.” One line, and it carries the two facts this site cites it for — the birth year of the Bilderbecks' son, six years after the weeping, and the family's Catholicism.",
        url: "https://archive.org/details/indianmissionary00badl",
      },
      {
        id: "catholic_directory_1924",
        title: "The Catholic Directory of India, 1924",
        detail: "Diocese of Tuticorin, pp. 173–174",
        note: "The parish counted, two years after the diocese was erected: “Vadakankulam… Cath. 4,765, vills. 17: Churches: brick 1, clay 4.”",
        archiveOnly: true,
      },
      {
        id: "census_2011",
        title: "Census of India 2011 — Vadakkankulam Census Town",
        detail: "Town code 643090",
        note: "Population 9,220; literacy 94.28%.",
        url: "https://www.census2011.co.in/data/town/643090-vaddakkankulam-tamil-nadu.html",
      },
      {
        id: "maalaimalar_2022",
        title: "மாலைமலர் — the Perunkoor festival at Vadakkankulam",
        detail: "Maalaimalar, a major Tamil daily — 5 August 2022",
        note: "The one witness we have to the living cult of this shrine who is neither the parish nor the diocese. A newspaper, covering the feast as news: the chariot goes out at about one in the morning on 15 August, and something close to a lakh of pilgrims come out for it, many of them crossing over from Kerala. The site has been making that claim for a while with no source a reader could check; this is the source. It should be read for what it is — a reporter's estimate of a night-time crowd, not a count — but it is an estimate made by someone with no reason to flatter us, and on the size of the festival it is the only outside witness in this whole bibliography.",
        url: "https://www.maalaimalar.com/devotional/worship/paraloga-matha-church-festival-on-tomorrow-495666",
      },
    ],
  },
  {
    heading: "The printed histories of the Madurai Mission",
    items: [
      {
        id: "besse_1914",
        author: "Léon Besse, S.J.",
        title: "La Mission du Maduré : Historique de ses Pangous",
        detail: "Trichinopoly, 1914 — xvi + 749 pp.",
        note: "The printed source to which every later account of this parish — including the 1803 tradition — ultimately traces. We have looked for it hard: it is absent from archive.org, its OpenLibrary record carries no scan, HathiTrust returns nothing for either its OCLC or its LCCN, and the Bibliothèque nationale has not digitised its own copy. Four physical copies are known (Paris, Canberra, Toulouse, Shembaganur) and no one on this project has opened any of them. We also went looking for a rival witness and found none: the one candidate — a passage the parish's own notes place at Auguste Jean, vol. II, p. 129 — turns out to be a page about a college at Negapatam. The year 1803 does not appear anywhere in Jean's two volumes, and it could not: his first volume ends at the suppression and his second begins at the restoration, so 1803 falls in the gap between them. Besse is the one witness, and we say so.",
        archiveOnly: true,
      },
      {
        id: "besse_moumas_typescript",
        author: "Léon Besse, S.J. — English translation by Fr Moumas, S.J.",
        title: "New Madurai Mission: Madurai Mission Southern District, Vol. IV (1715–1913)",
        detail: "Typescript, c.1970s–80s — the parish library's own copy, accession 215 (= JEMPARC Shembaganur, Book 95)",
        note: "Besse's book, at last, in a form we can read. The entry above says no one on this project had opened it; that stopped being true in July 2026, when seven pages of the Vadakkankulam chapter (pp. 805–844) of the parish's own English typescript were photographed and transcribed. It is Besse's text, so we read it as Besse and not as the parish — but we read his hedges too. Where he writes that the church's builder “is said to be” de Britto, he is recording a tradition, not asserting a fact, and we do not promote him past what he claims; two sentences later he draws the line himself — “Here tradition is met with historic documents” — and only then produces the Annual Letter of 1701. What he does give flatly, from the mission's records, is the village's origin as a staging post between two kingdoms and the 1713 statistics the parish has quoted ever since. The translation is an unpublished internal document: we quote it and never reproduce it.",
        archiveOnly: true,
      },
      {
        id: "ferroli_1951",
        author: "D. Ferroli, S.J.",
        title: "The Jesuits in Malabar",
        detail: "2 vols., Bangalore, 1939–1951 — vol. II, p. 354",
        note: "Prints, from Fr Bernard de Saa's own letter of 14 October 1713, the ordeal the parish's first resident priest lived through: dragged from a sick-bed by men who were sure he was hiding money, beaten until “all his teeth had been knocked out”, expelled from the district, and restored to the village only after Fr Laynez appealed to Mangammal, the queen-regent of Madurai. Fr Pierre Martin, seeing him in June 1700, is the eyewitness. Still in copyright: we quote it and do not reproduce the page.",
        archiveOnly: true,
      },
      {
        id: "auguste_jean_1894",
        author: "Auguste Jean, S.J.",
        title: "Le Maduré : l'ancienne et la nouvelle mission",
        detail: "Paris/Bruges, 1894",
        note: "The richest French source on the priests who served here; it calls Fr Joseph Grégoire “l'apôtre de Vadakenkoulam”, and describes the church as built “in the form of an open compass”. It is also the earliest printed witness that this church holds “a part of his garment and the chains with which he was bound” — St Devasahayam's relics (vol. I, p. 203). Note that vol. I carries a misprint giving St Devasahayam's martyrdom as 1742; the correct date is 14 January 1752.",
        url: "https://archive.org/details/lemadurlancienne01jean",
      },
      {
        id: "bertrand_lettres_1865",
        author: "Joseph Bertrand, S.J.",
        title: "Lettres édifiantes et curieuses de la nouvelle mission du Maduré",
        detail: "2 vols., 1865",
        note: "Records that Fr Buttari “laid the foundations of its present church” here, and that Fr Thomassin completed it — the earliest independent attribution of the first stone church. It also preserves the fact that before the Holy Family dedication of 1872, the patron and titular of this church was St Francis Xavier, kept with a December novena and feast.",
        url: "https://archive.org/details/lettresdifiante00bertgoog",
      },
      {
        id: "bertrand_1847",
        author: "Joseph Bertrand, S.J.",
        title: "La mission du Maduré d'après des documents inédits",
        detail: "4 vols., Lyon/Paris, 1847–1854 — esp. vol. IV, pp. 100n, 345–346, 382–398",
        note: "Records the baptism and passion of Devasahayam from the mission's own papers — a century before any canonisation dossier existed. With Auguste Jean, the earliest printed witness that the baptism happened here. Volume IV carries this parish across more than the passion pages long cited for it: Fr Borghese \"at the head of the district of Vadakencoulam\" in the annual letter of 1709 (p.100n); a missionary's first-person relation from inside \"the church of Vadakencoulam where I then was\" in 1714–16, with Beschi in the next district (pp.345–346); the 1745 persecution of that church and the nabab \"who honoured [Buttari] with his friendship\" (pp.385–386); and the baptism, passion and burial at Kottar of Devasahayam (pp.386–398). It does NOT record the 1803 weeping — that is Dessal (1905) and Besse (1914), not Bertrand.",
        url: "https://archive.org/details/lamissiondumadur0000unse_o9q8",
      },
      {
        id: "faber_1851",
        author: "Frederick William Faber",
        title: "The Lives of… the Ven. John de Britto, S.J.",
        detail: "London, 1851",
        note: "The earliest mainstream English life of the founder, and the book in which an English reader can still find his prison letter of 3 February 1693. That, and the martyrdom at Oriyur, is what we cite it for. It is not evidence for anything that happened in this village: Faber does not mention Vadakkankulam once, in any spelling. This note used to say he was cited for the founding acts of 1685–86, which put an English name behind a claim he never makes. The chapel and the two hundred baptisms rest on the parish's own books; Faber carries the founder, not the founding.",
        url: "https://archive.org/details/TheLivesOfFather",
      },
      {
        id: "dessal_1902",
        author: "J.-B. Dessal, S.J.",
        title: "Le R. P. Louis Verdier, supérieur de la mission du Maduré",
        detail: "Paris, 1902",
        note: "Written by a Jesuit of the same mission. Of this church he says only that it is “unique au monde peut-être” — unique in the world, perhaps. The hedge is worth keeping: the mission's own chroniclers never claimed more than that.",
        url: "https://archive.org/details/lervrendpr00dess",
      },
      {
        id: "dessal_gemert_1905",
        author: "J.-B. Dessal, S.J.",
        title: "Vadakencoulam — son histoire, sa merveille, son jubilé",
        detail: "Lettres de Gemert, 1905",
        note: "The earliest printed witness to the 1803 weeping — a Jesuit of this very mission, in print nine years before Besse, writing while the grandchildren of the 1803 generation still lived. He names the same witnesses (Saveri-Mouttou Pillai son of Satiavasagam Pillai, “Monsieur Birdelpech” and his daughter Henriette) and gives the same double-doored niche, the same ~11 a.m., and the 1903 centenary. He is also candid where the parish is not: he records that the Goa priest of the day was absent and that no approving ecclesiastical document exists — a caution we keep beside the parish's own account.",
        url: "https://gallica.bnf.fr/ark:/12148/bpt6k9128178d",
      },
    ],
  },
  {
    heading: "Modern scholarship",
    items: [
      {
        id: "neill_1985",
        author: "Stephen Neill",
        title: "A History of Christianity in India: 1707–1858",
        detail: "Cambridge University Press, 1985",
        note: "The standard modern scholarly history of the period, and an outside one — cited here for the shape of the mission around this parish, not for the parish's own marvels. A correction we owe the reader, because this note carried the error for a long time: it said that Neill's footnote preserves the page reference to Besse (1914) on which our citations of Besse depend. It does not. Neill cites Besse at p. 477 — a list of the coastal stations, which does not include Vadakkankulam — and at pp. 471–2, and neither passage has anything to do with the weeping of 1803. The “p. 730” that our own citations of Besse rest on comes from the parish's own compilation, independently of Neill, and is unverified until somebody opens the book. The old note was wrong in a way that flattered us — it dressed a parish page-reference in a Cambridge footnote. Where Neill does lean on Besse, the caution behind it still holds: he and our own books can be one citation retold rather than two witnesses.",
        url: "https://archive.org/details/historyofchristi0000neil",
      },
      {
        id: "bayly_1989",
        author: "Susan Bayly",
        title: "Saints, Goddesses and Kings",
        detail: "Cambridge University Press, 1989 — pp. 405–406",
        note: "A scholar of South Indian religion who works from the Jesuit manuscripts at the Madura Mission Archives rather than from anything the parish published — and who says more for Santhaayi than the parish claims for her, calling her the founder of the village rather than merely its first Christian. We do not hold the volume: it is quoted here at second hand, and it is still in copyright.",
        url: "https://archive.org/details/saintsgoddessesk0000bayl",
      },
      {
        id: "hardgrave_1969",
        author: "Robert L. Hardgrave Jr.",
        title: "The Nadars of Tamilnad",
        detail: "University of California Press, 1969",
        note: "The standard social history of the community, written with no interest in this church whatever — which is exactly what makes it useful here. It sets down 1680, a woman, and a church in 1685 as plain fact, and it reached them by a different road from Bayly's. Between the two of them the founding of Vadakkankulam stops being something only the parish says. Not held on this project: quoted at second hand, and still in copyright.",
        url: "https://archive.org/details/nadarsoftamilnad0000hard",
      },
      {
        id: "cronin_1959",
        author: "Vincent Cronin",
        title: "A Pearl to India: The Life of Roberto de Nobili",
        detail: "London, 1959",
        note: "A modern biography rather than a primary document — but an outside one, and the fullest account we hold of how the Madurai Mission began. It supplies the link this page was missing between St Francis Xavier on the coast and a Jesuit on a forest path in the deep south: the inland mission de Nobili opened at Madurai in 1606, whose charge de Britto took up in 1683.",
        url: "https://archive.org/details/in.ernet.dli.2015.279418",
      },
      {
        id: "trento_2022",
        author: "Margherita Trento",
        title: "Writing Tamil Catholicism",
        detail: "Brill, 2022 — open access",
        note: "Works directly from the Roman, Vatican, Paris and Shembaganur manuscripts; the deepest scholarly treatment of this parish's eighteenth-century catechists. It is also the book that put a name to the parish's remembered European family: working from the 1915 genealogical manuscript of the village's catechist families, Trento identifies “Mr. Bilderbeck” as the merchant Christopher Bilderbeck (d. 1817), father of the Anglican missionary John Bilderbeck (1809–1880).",
        url: "https://library.oapen.org/handle/20.500.12657/77106",
      },
      {
        id: "narchison_2011",
        author: "J. Rosario Narchison",
        title: "Towards a Historiography of Martyr Devasahayam",
        detail: "in India's Christian Heritage, CHAI, 2011",
        note: "The decisive study of how the Devasahayam tradition descends from Buttari's manuscript — and what was added to it later.",
        url: "https://menachery.org/Narchison_Devasahayam.pdf",
      },
      {
        id: "srinivasan_2021",
        author: "T. Srinivasan",
        title: "History of Vadakkankulam Church",
        detail: "BlueRose Publishers, 2021 — ISBN 978-93-5427-365-0",
        note: "The only dedicated published monograph on this church. In print.",
      },
    ],
  },
  {
    heading: "The parish's own records",
    blurb:
      "Last on this page, and last on every citation — deliberately. A parish's own book is the weakest possible support for a parish's own claim, and everything above this line is here precisely because it was written by someone with no reason to flatter us. These are also one witness family, not several: the parish's English history, the jubilee souvenir, the diocesan page and the two Tamil devotional sites tell the same story because they descend from the same telling. We cite them for what they are — our account of ourselves — and we never stack them to look like corroboration. Everything cited to a source in this group is tiered as tradition, however grand the letterhead: a bishop writing for his own diocese's jubilee is still an institution reporting on itself.",
    items: [
      {
        id: "parish_english_history",
        title: "The English history of the Holy Family Church",
        detail: "Parish copy; architecture and building chapters",
        note: "Names Br Joseph Bergenthal, S.J. as the chief architect who drew and supervised the present church under Fr Grégoire, and records the benediction of 27 June 1872 and the solemn dedication of 29 June from Fr Grégoire's own diary. The exact title, author and year of this volume are still being confirmed, and we flag that openly.",
        archiveOnly: true,
      },
      {
        id: "souvenir_150yr",
        title: "ஆலய 150-வது ஆண்டுவிழா மலர் — the 150-Year Jubilee Souvenir",
        detail: "2022 — the parish's own jubilee book, cited openly and always as tradition",
        note: "Our own jubilee book, published for the sesquicentenary of the 1872 consecration. This note used to promise that nothing on this website was cited to it. That promise was not kept, and we would rather say so than go on making it: the history page was leaning on the souvenir all along — for the kankol festival of 1749, for the east-facing plan of the church, for the date of 6 August 1993, for the chariot of 1891 and the new one of 2014, for the years of the lace school. Using a book while publicly swearing you do not use it is the one real dishonesty available to a page built on honesty. So we cite it now, in the open, wherever it is genuinely the source. It is always tiered as tradition and never as documentation: a parish's own book cannot be independent proof of a parish's own claim, and calling it one would be a circle, not a citation. Where the souvenir points to an older witness we still go to that witness and cite it too. And an honest note about the book: it dates the apparition to 1805, where every other source — diocesan, Jesuit and Tamil — gives 1803, and our own priest-list places Fr John Louis Cardoza here in exactly 1803. We follow 1803 and treat 1805 as a copying slip in our own souvenir.",
        archiveOnly: true,
      },
      {
        id: "diocese_thoothukudi_page",
        title: "Diocese of Thoothukudi — parish page",
        detail: "Holy Family Church, Vadakkankulam",
        note: "The diocesan chronology on which this site's timeline is built.",
        url: "https://tuticorindiocese.org/parish-vadakankulam-holy-family.htm",
      },
      {
        id: "bishop_stephen_jubilee_2022",
        author: "Most Rev. A. Stephen, Bishop of Thoothukudi",
        title: "The bishop's message for the 150th-year jubilee",
        detail: "2022 — printed for the jubilee of the 1872 church",
        note: "Quoted by name on the history page, and until now credited to nobody, which is the sort of thing this bibliography exists to stop. The bishop puts de Britto's coming, the baptisms and the first church together in 1686, where the parish's other books give 1685. We print both dates and settle neither: nothing outside the parish family dates the chapel at all, so the disagreement is between two tellings of one family memory, and a year is not worth inventing a witness for. It sits here, with our own records, and not in the outside record above — a bishop writing for his own diocese's jubilee is an institution reporting on itself, however senior the hand that holds the pen.",
        archiveOnly: true,
      },
      {
        id: "catholictamil_182",
        title: "பரிசுத்த திருக்குடும்ப தேவாலயம், வடக்கன்குளம்",
        detail: "church.catholictamil.com, p. 182",
        note: "A Tamil retelling of the parish's published history, carrying the priest-list and the account of the bells. Near word-for-word identical to vadavaimatha.net — the two are one witness printed twice, and must never be stacked as though they were two.",
        url: "https://www.church.catholictamil.com/p/182.html",
      },
      {
        id: "rosariancr_fatimagiri",
        author: "Congregation of the Rosarians",
        title: "Fatimagiri Ashram, Vadakkankulam",
        detail: "The congregation's own website",
        note: "The sole witness for the Rosarian foundation of 1944, and the source of the title “Servant of God” for Antony Susainather — which is the congregation's own usage. No decree of the Holy See is in evidence, and we attribute the title rather than assert it.",
        url: "https://rosariancr.com",
      },
      {
        id: "bethany_sisters_healing_ministry",
        author: "Sisters of the Little Flower of Bethany",
        title: "The Healing Ministry of the Bethany Sisters at Vadakkankulam",
        detail: "Congregational document",
        note: "Records the arrival of four sisters on 27 July 1970 and the founding of St Thomas Hospital.",
        archiveOnly: true,
      },
    ],
  },
];

/**
 * Flat lookup: id → source. This is what a citation resolves through.
 *
 * Built from the groups so there is exactly one bibliography on this site and
 * no second list to drift out of step with it.
 */
export const SOURCE_INDEX: Record<string, Source> = Object.fromEntries(
  SOURCE_GROUPS.flatMap((g) => g.items.map((s) => [s.id, s] as const)),
);

/** The part of this page that actually earns the trust. */
export const WEIGHING_NOTE = {
  heading: "How we weigh these sources",
  intro:
    "Not everything on this page carries the same weight, and we will not pretend otherwise.",
  tiers: [
    {
      label: "Documented at the highest level",
      body: "St John de Britto's martyrdom — attested by his own prison letter of 3 February 1693 and a printed Latin martyrology of 1697. And St Devasahayam's baptism at this church in 1745, recorded by two Jesuit historians working from the mission's own papers a century before any canonisation dossier existed, by L'Osservatore Romano and Vatican News, and sealed by his canonisation on 15 May 2022. This is the best-attested fact about our village, and it comes from outside us.",
    },
    {
      label: "Documented in the civil and Jesuit record",
      body: "The priests who served here, year by year, in the Jesuit province catalogues at Rome. The completion of the present church in 1872, in a British government gazetteer of 1917. The name of the architect, Br Joseph Bergenthal, in the Roman catalogue of that same year.",
    },
    {
      label: "Parish tradition, faithfully held",
      body: "The arrival of the statue from Portugal by sea in 1742–43. It is a treasured tradition of this parish, and it does not appear in the older Jesuit or academic histories of the mission. We tell it as what it is.",
    },
    {
      label: "Local and diocesan devotion",
      body: "The weeping of Our Lady on 23 October 1803. Its printed anchor is Besse's La Mission du Maduré (1914) — a real book, held in four known libraries, whose relevant pages no one working on this project has yet physically opened. It is a continuous local and diocesan tradition, honoured here for more than two centuries. It has never been the subject of a Vatican investigation, and we do not claim that it has.",
    },
  ],
  closing:
    "Corrections and additions are welcome. Where a source proves us wrong, we would rather change the page than the source.",
};
