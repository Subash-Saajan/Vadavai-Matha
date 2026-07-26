/**
 * The succession of parish priests of the Holy Family Church, Vadakkankulam.
 *
 * Source: Knowledge_Base/06_Parish_Priests_and_Clergy.md, which reproduces the
 * parish's own numbered list (Vadakankulam History 2026, "Succession of Parish
 * Priests… from the Origin of the Congregation") and cross-checks it against the
 * Jesuit archives in Rome (ARSI), Auguste Jean 1894, Dessal 1902, Bertrand 1865,
 * Pate's 1917 gazetteer and the Catholic Directory of India 1924.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHY THIS FILE LOOKS THE WAY IT DOES
 *
 * Sixty-nine priests; a documented life for about fifteen of them; a surviving
 * likeness for eleven. That asymmetry is not a defect to be hidden — it is the
 * shape of a 328-year parish record, and the page is built to show it rather
 * than paper over it. Hence three tiers:
 *
 *   "name"  — the parish kept his name and his years. Nothing more survives.
 *             No plate, no link, and (in the page) no hover state: a row that
 *             cannot be opened must not look like it can.
 *   "line"  — one true clause survives. It is given in place, with no link,
 *             because there is nothing further to go to.
 *   "life"  — the archives preserve a life. Plate, paragraph, room to breathe.
 *
 * TWO RULES INHERITED FROM history.ts, both load-bearing.
 *
 * 1. NO INVENTED FACTS, and no invented faces. Where a priest has no surviving
 *    portrait the plate carries the Tamil honorific the village called him by
 *    (`plate`) — never a generated likeness. These are real, named men, several
 *    within living memory; a plausible AI face would be the only fabrication on
 *    this website.
 *
 * 2. WHERE THE SOURCES DISAGREE, SAY SO. The first priest has three names in
 *    two documents. Fr Grégoire died in 1873 by one book and 1875 by another.
 *    The Knowledge Base flagged every such case and this file does not quietly
 *    pick a winner — the disagreement is published as part of the record.
 *
 * NOTE ON WHAT IS ABSENT. Fr Caussanel's entry says he took down the partitions
 * inside the 1872 church and met determined opposition. It does not say who
 * opposed him or why, for the same reason /architecture does not: the parish has
 * decided not to publish that history. Nothing here invents a substitute cause.
 * (See Knowledge_Base file 16 §4.1 for what is being left out, and why the
 * omission is deliberate rather than ignorant.)
 *
 * ALSO ABSENT, FOR NOW: the ~100 assistant priests of 1870–1990. The parish holds
 * the roster, but the only copy is a faintly-printed souvenir page and the OCR of
 * it is unreliable ("Sebarik Pris", "Jiopiyams Arasavandhinam"). Publishing
 * mangled names of real men whose families are in the village is worse than
 * waiting, so the block is held until someone reads souvenir pp. 5–6 aloud
 * against the scan. Same for the "priests and sisters given by Vadavai" list.
 * ─────────────────────────────────────────────────────────────────────────
 */

/** The year the current pastorate is measured to. Bump with the calendar; it
 *  only affects the length of the last tenure stroke and the "– today" label. */
export const THIS_YEAR = 2026;

export type PriestTier = "name" | "line" | "life";

export type Priest = {
  /** Position in the parish's own numbering, 1–69. */
  n: number;
  name: string;
  /** The Tamil honorific or village name, where the parish preserved one.
   *  In the Madurai Mission a priest was known not by his European surname but
   *  by his Tamilised baptismal name plus an honorific — so for many of these
   *  men this, not the name above, is what the village actually said. */
  tamil?: string;
  /** Other attested spellings, kept because people search them and because an
   *  1894 French book calling him "Bouttari" should still find this page. */
  also?: string;
  from: number;
  /** Inclusive. Equal to `from` where the source gives one year only. */
  to: number;
  /** The serving priest. Renders as "– today" and measures to THIS_YEAR. */
  current?: true;
  tier: PriestTier;
  /** One clause. `line` tier. */
  note?: string;
  /** The illuminated paragraph. `life` tier. */
  life?: string;
  /** File in /images/priests/. Only where a real likeness survives. */
  portrait?: string;
  /** Where that likeness came from — printed under the plate. */
  portraitFrom?: string;
  /** The Tamil name set as the plate, where no likeness survives. */
  plate?: string;
};

export type Period = {
  numeral: string;
  title: string;
  /** Display label for the span. */
  years: string;
  /** Why the era turned. This is the sentence a reader who scans nothing else
   *  should still come away with. */
  turn: string;
  priests: Priest[];
};

export const PERIODS: Period[] = [
  {
    numeral: "I",
    title: "The Old Madurai Mission",
    years: "1697 – 1775",
    turn:
      "Jesuits of the old Madurai Mission, sent out through Goa and Cochin. They took Tamil names and the village used them: a priest here was not Buttari but Paranchodinadhar, not Thomassini but Madurendranadher. Those are the names in the parish's own list, and they are given here beside the European ones.",
    priests: [
      {
        n: 1,
        name: "Fr Bernard de Saa",
        tamil: "பென்னாட் டி சூசா",
        also: "Bennet de Souza · Fr Ponnaiya",
        from: 1697,
        to: 1699,
        tier: "life",
        plate: "பென்னாட் டி சூசா",
        life:
          "The list opens with him, and it opens unsteadily. The parish's history names him Bernard de Saa and dates him from 1697; the 150th-anniversary souvenir writes Bennet de Souza and dates him from 1698; and the souvenir's own prose says that “in the year 1698, Rev. Fr. Ponnaiya took charge… the first parish priest of Vadavai”. Three names, two start years, one man — or perhaps two. It is published as it stands, because the alternative is to choose one and sound certain.",
      },
      { n: 2, name: "Fr Maria Xavier Borghese", tamil: "மரிய போர்க்கிஸ்", also: "Borges", from: 1700, to: 1704, tier: "name" },
      { n: 3, name: "Fr Peter Martin", tamil: "பீட்டர் மார்ட்டின்", also: "Pedro Samiar", from: 1705, to: 1707, tier: "name" },
      {
        n: 4,
        name: "Fr Simon Carvalho",
        tamil: "சைமன் கார்வெல்கோ",
        from: 1708,
        to: 1708,
        tier: "line",
        note: "He founded the mission station at Nemom, into which this church was incorporated in 1713.",
      },
      {
        n: 5,
        name: "Fr Maria Xavier Borghese",
        tamil: "போர்க்கிஸ்",
        from: 1709,
        to: 1710,
        tier: "line",
        note:
          "His second term carries the earliest printed mention of this parish anywhere: in 1709, writes Auguste Jean, Borghese was “put in charge of the Christians of Vadakenkoulam, near Cape Comorin”.",
      },
      { n: 6, name: "Fr Louis Novel", tamil: "ஹம்போ நோவேல்", from: 1711, to: 1712, tier: "name" },
      { n: 7, name: "Fr Ignatius Cardoza", tamil: "இக்னேசியஸ் கர்டோசா", from: 1712, to: 1712, tier: "name" },
      { n: 8, name: "Fr Bursus", tamil: "பூர்சு", also: "Bourse", from: 1713, to: 1713, tier: "name" },
      { n: 9, name: "Fr Bernardiza", tamil: "பென்னாடிசா", from: 1714, to: 1714, tier: "name" },
      { n: 10, name: "Fr Antonius Brandolini", tamil: "அந்தோனிநாதர்", also: "Antoninadher", from: 1715, to: 1715, tier: "name" },
      { n: 11, name: "Fr Alexander", tamil: "அல்லக்சாண்டர்", from: 1716, to: 1716, tier: "name" },
      { n: 12, name: "Fr Dominicus Madeyara", tamil: "டொமினிக்ஸ் மடேயரா", also: "Madeira", from: 1717, to: 1727, tier: "name" },
      { n: 13, name: "Fr Giliya", tamil: "கிலியா", also: "Gilia", from: 1728, to: 1728, tier: "name" },
      {
        n: 14,
        name: "Fr Thomas Prosper Giuliani",
        tamil: "பாக்கியநாதர்",
        also: "Pakkianadher · Paulastamer",
        from: 1729,
        to: 1733,
        tier: "life",
        plate: "பாக்கியநாதர்",
        life:
          "A Saivite poosari of Vittapuram, Chidambaram Pillai, was walking to Cape Comorin with his wife Aantavalli when he heard this church's bell. He stopped for the Mass, stayed for instruction, and was baptised Gnanapragasam — spiritual light. Fr Giuliani made him catechist of the village and built him a house. Twelve years later Gnanapragasam stood godfather at the baptism of St Devasahayam Pillai.",
      },
      { n: 15, name: "Fr Joseph Silverio", tamil: "ஜோசப் சில்வேரியா", from: 1734, to: 1740, tier: "name" },
      {
        n: 16,
        name: "Fr John Baptist Buttari, S.J.",
        tamil: "பரஞ்சோதிநாதர்",
        also: "Paranchodinadhar · Jean-Baptiste Bouttari",
        from: 1741,
        to: 1750,
        tier: "life",
        plate: "பரஞ்சோதிநாதர்",
        life:
          "On 14 May 1745 he baptised Neelakanta Pillai, a captain of the Travancore army, by the name Devasahayam — the man the Church canonised in 2022 as the first Indian layman to be declared a saint. In 1749 he began the first stone church, and it was the timber for that building that undid his convert: sent to cut wood in the royal forest, Devasahayam fell into the dispute that ended in his arrest. This church still keeps a piece of his garment and the chains he was bound with. Buttari was moved on to Aoor as the missionary best able to heal that congregation's ills; at Vadakkankulam, Auguste Jean writes, “his memory is held in benediction”.",
      },
      {
        n: 17,
        name: "Fr Francis Clemente Thomassini, S.J.",
        tamil: "மதுரேந்திரநாதர்",
        also: "Madurendranadher · Gnana Amourdam · Clément Tomassini",
        from: 1751,
        to: 1775,
        tier: "life",
        plate: "மதுரேந்திரநாதர்",
        life:
          "He finished the church Buttari had begun — built in the form of a cross, facing east — and he was the last Jesuit to hold this parish before Rome suppressed the Society of Jesus in 1773. Feeling his end near, he had himself carried to Taley, and died there in 1775, aged seventy-five. Bertrand records what followed: the Christians venerated him as a saint, gave his name to their children and visited his tomb, and in times of drought even the village's Hindus would call on him.",
      },
    ],
  },
  {
    numeral: "II",
    title: "The Priests of Cochin",
    years: "1776 – 1835",
    turn:
      "The Society of Jesus had been suppressed by the Pope in 1773. Fr Thomassini died two years later and there was no Jesuit left to send, so the parish passed to the Malabar priests under the Archbishop of Cranganore. Sixty years, eight priests — and, in the middle of them, the year the parish has commemorated ever since.",
    priests: [
      { n: 18, name: "Fr Deva Varadhanar", tamil: "தேவ வரதனார்", from: 1776, to: 1791, tier: "name" },
      { n: 19, name: "Fr Ignatius", tamil: "இக்னேசியஸ்", from: 1792, to: 1802, tier: "name" },
      {
        n: 20,
        name: "Fr John Louis Cardoza",
        tamil: "ஜாண் லூயிஸ் கர்டோசா",
        from: 1803,
        to: 1803,
        tier: "life",
        plate: "ஜாண் லூயிஸ் கர்டோசா",
        life:
          "His name occupies a single year of this list, and it is the year. On 23 October 1803 the statue of Our Lady in this church was seen to weep. Fr Cardoza — with a second priest and a European laywoman who examined the statue herself — declared it an extraordinary event, which is why this parish can still name the priest who authenticated its devotion. The souvenir's occasional “1805” is a copying slip: the list shows him parish priest in 1803 and in no other year, between Fr Ignatius and Fr de Miranda.",
      },
      { n: 21, name: "Fr Francis de Miranda", tamil: "பிரான்சிஸ் டி பிரான்டா", from: 1804, to: 1808, tier: "name" },
      { n: 22, name: "Fr Xavier Gestand", tamil: "சேவியர் ஜிஸ்மண்டு", also: "Sigismund", from: 1809, to: 1826, tier: "name" },
      { n: 23, name: "Fr Jacob Puthampare", tamil: "ஜேக்கப் பத்தாம் பேரே", from: 1827, to: 1831, tier: "name" },
      { n: 24, name: "Fr Michael Fierras", tamil: "மிக்கேல் பிரான்", also: "Brun", from: 1832, to: 1835, tier: "name" },
    ],
  },
  {
    numeral: "III",
    title: "The Pondicherry Mission",
    years: "1836 – 1837",
    turn:
      "Two years and one priest, while the southern missions were being reassigned. The shortest period on the list, and the only one with a single name in it.",
    priests: [
      { n: 25, name: "Fr Thairiyanadhar", tamil: "தைரியநாதர்", also: "Fr Dayriam · Dhairyanathar", from: 1836, to: 1837, tier: "name" },
    ],
  },
  {
    numeral: "IV",
    title: "The New Jesuits of Toulouse",
    years: "1838 – 1910",
    turn:
      "The Society was restored in 1814, and from 1838 the French province of Toulouse took up the Madurai mission again. Almost everything a visitor sees today was built in this period: the present church, its two towers, its bells and its arches.",
    priests: [
      { n: 26, name: "Fr Alex Martin", tamil: "அலக்சாண்டர் மார்ட்டின்", from: 1838, to: 1838, tier: "name" },
      { n: 27, name: "Fr Louis Duranguet", tamil: "ஹம்போ தூராஸ்தெவில", from: 1839, to: 1840, tier: "name" },
      { n: 28, name: "Fr Antonius Sales", tamil: "அன்ரோனின் சேவல்", from: 1841, to: 1841, tier: "name" },
      { n: 29, name: "Fr Constantine", also: "Castanier, in the souvenir", from: 1842, to: 1843, tier: "name" },
      {
        n: 30,
        name: "Fr Joseph Grégoire, S.J.",
        tamil: "ஜோசப் கிரகோரி",
        from: 1844,
        to: 1844,
        tier: "line",
        note: "The first of his three terms here. He would come back twice, and altogether give this village thirty years.",
      },
      {
        n: 31,
        name: "Fr Louis Verdier, S.J.",
        tamil: "ஞானப்பிரகாசியார்",
        also: "Gnanapragasiar souvami · pangou-souvami",
        from: 1847,
        to: 1850,
        tier: "life",
        portrait: "verdier",
        portraitFrom: "Dessal, Le Père Louis Verdier, 1902",
        life:
          "Vadakkankulam was his first appointment in India — 1 December 1847 — and the village named him Gnanapragasiar, “spiritual light”, which is the Tamil for Louis. At Anakarei, the other half of his parish, the old Jesuit church was falling down, so he asked every parishioner, “men and women, great and small, young people and old folk”, to carry twenty-four stones to the site before or after the sacraments. In a month and a half he had heard a thousand confessions and twenty-four thousand stones had arrived. He rose to Vicar General of the whole Madurai mission.",
      },
      { n: 32, name: "Fr Hieronymus Maza", tamil: "ஜெரோம் மெஸ்", also: "Jérôme Mazza", from: 1851, to: 1852, tier: "name" },
      {
        n: 33,
        name: "Fr Joseph Grégoire, S.J.",
        tamil: "ஜோசப் கிரகோரி",
        from: 1853,
        to: 1861,
        tier: "life",
        plate: "ஜோசப் கிரகோரி",
        life:
          "Auguste Jean calls him, simply, the apostle of Vadakkankulam: “it is chiefly to his persevering energy that this fine Christian community owes its great church.” Bishop Canoz blessed the foundation stone on 9 August 1855, and for seventeen years Grégoire drove the building of it, with the Westphalian lay brother Joseph Bergenthal as his architect. What they finished in 1872 was, in Auguste Jean's phrase, “a church probably without equal in the world”. Sent home to France for his health, he never arrived: he died in the crossing of the Red Sea and was buried at sea — in 1875 by Dessal's account, 1873 by Auguste Jean's, a disagreement neither book resolves.",
      },
      { n: 34, name: "Fr Clément Castanier, S.J.", tamil: "காஸ்டானியர்", from: 1862, to: 1865, tier: "name" },
      {
        n: 35,
        name: "Fr Joseph Grégoire, S.J.",
        tamil: "ஜோசப் கிரகோரி",
        from: 1866,
        to: 1870,
        tier: "line",
        note: "His third and last term as parish priest. He stayed on in the village for years after it ended, and was still here when the church was blessed in 1872.",
      },
      { n: 36, name: "Fr Guillielmus Pouget, S.J.", also: "William Pouget", from: 1870, to: 1873, tier: "name" },
      { n: 37, name: "Fr William Paget", tamil: "வில்லியம் பேஜெட்", from: 1873, to: 1874, tier: "name" },
      { n: 38, name: "Fr Ficiuos Babos", tamil: "பிரட்ரிக்கா போஸ்", from: 1875, to: 1875, tier: "name" },
      {
        n: 39,
        name: "Fr Victor Delpech, S.J.",
        tamil: "விக்டர் டெல்ப்ளீ",
        from: 1876,
        to: 1876,
        tier: "life",
        portrait: "delpech",
        portraitFrom: "Suau, L'Inde tamoule, 1899",
        life:
          "He preached with statues and marionettes worked by hidden springs, and he had been Fr Grégoire's travelling companion on the voyage where Grégoire died. Acting parish priest in 1876, he then served this church eleven years as assistant, and he died in it — “in the arms of Fr Pouget, at Vadakenkoulam, on a Saturday, the eve of the feast of the most holy Name of Jesus”, 16 January 1887. He is buried behind the church. A survey of European tombs made in 1894 read his stone: “1887, 16th January. Victor Delpech S.J., aged 52 years.”",
      },
      {
        n: 40,
        name: "Fr Joseph Faseuille, S.J.",
        tamil: "ஜோசப் பெல்லஸ்வில்லே",
        from: 1877,
        to: 1882,
        tier: "line",
        note: "The Rome catalogue of 1880 has him here as minister and superior. He later became Vicar General of the mission.",
      },
      { n: 41, name: "Fr Guillielmus Pouget, S.J.", tamil: "வில்லியம் புக்கே", from: 1882, to: 1893, tier: "name" },
      { n: 42, name: "Fr Joseph Faseuille, S.J.", tamil: "ஜோசப் சாங் பால்க்வில்லே", from: 1894, to: 1895, tier: "name" },
      { n: 43, name: "Fr Adaikalam", tamil: "அடைக்கலம்", from: 1895, to: 1896, tier: "name" },
      { n: 44, name: "Fr Peter Brien", tamil: "பீட்டர் புரண்ட் இன்போடாரியம்", from: 1896, to: 1897, tier: "name" },
      { n: 45, name: "Fr Gabriel Berthien", tamil: "கபிரியேல் பெர்திஞ்", also: "Bertin", from: 1897, to: 1898, tier: "name" },
      { n: 46, name: "Fr Chinnappar", tamil: "சின்னப்பர்", from: 1899, to: 1899, tier: "name" },
      {
        n: 47,
        name: "Fr Marianus Dayriam, S.J.",
        tamil: "தைரியநாதர்",
        from: 1899,
        to: 1910,
        tier: "line",
        note:
          "Parish priest, chaplain to the convent of the native Sisters of the Seven Sorrows, and director of the schools — the three offices every late-Jesuit pastor of this village held at once.",
      },
    ],
  },
  {
    numeral: "V",
    title: "The Modern Era",
    years: "1910 – today",
    turn:
      "The parish's own list opens its last period in 1910, but the change it marks came in 1923: the Diocese of Tuticorin was erected and the church passed from the Society of Jesus to the diocesan clergy. That is why, from Fr Ignatius onward, every name here is Tamil — and why the last twelve pastors are the first whose faces the parish still has.",
    priests: [
      {
        n: 48,
        name: "Fr Adrien Caussanel, S.J.",
        also: "Causonnel · Caussonnel",
        from: 1910,
        to: 1919,
        tier: "life",
        plate: "கௌசானல்",
        life:
          "His own Jesuit obituary says of this pastorate only that at Vadakenkoulam “he sustained long struggles”. He took down the partitions that divided the inside of the 1872 church, so that the whole parish stood in one nave and sang together, and he held to it in the face of determined opposition — the case went to the District Court in 1913 and on to the Madras High Court, which decided it in 1926. A visitor who met him here wrote that he had never seen a man so thin: for eighteen years Fr Caussanel had taken no solid food, living on milk and bananas. He founded the Brothers of the Sacred Heart at Palamcottah in 1902, and died at Kallikulam on 25 January 1930.",
      },
      { n: 49, name: "Fr Ponor", tamil: "போனோசர்", also: "Alfred Bonhoure, S.J.", from: 1919, to: 1923, tier: "name" },
      {
        n: 50,
        name: "Fr Y. Ignatius",
        tamil: "இன்னாசியார்",
        from: 1924,
        to: 1936,
        tier: "line",
        note:
          "The first diocesan priest on this list. The Catholic Directory of India for 1924 finds him here with an assistant, 4,765 Catholics and seventeen villages — one church of brick and four of clay.",
      },
      { n: 51, name: "Fr Mariadas", tamil: "மரியதாஸ்", from: 1936, to: 1943, tier: "name" },
      { n: 52, name: "Fr Joachim Fernando", tamil: "சுவக்கின்", from: 1943, to: 1950, tier: "name" },
      { n: 53, name: "Fr Benedict", from: 1950, to: 1954, tier: "name" },
      { n: 54, name: "Fr Navamani", tamil: "அமல ஆதி நவமணி", from: 1954, to: 1960, tier: "name" },
      { n: 55, name: "Fr Maria Ganam", tamil: "மரியதாசர்", from: 1960, to: 1974, tier: "name" },
      { n: 56, name: "Fr M. S. Antony", tamil: "அந்தோனியார்", from: 1974, to: 1982, tier: "name" },
      {
        n: 57,
        name: "Fr Peter Raja",
        from: 1982,
        to: 1985,
        tier: "line",
        portrait: "peter-rajah",
        portraitFrom: "150th-anniversary souvenir, 2022",
        note: "The earliest parish priest of this church whose photograph the parish still holds.",
      },
      {
        n: 58,
        name: "Fr Cruz Marian",
        tamil: "குருசுமரியன்",
        from: 1985,
        to: 1988,
        tier: "line",
        portrait: "cruz-marian",
        portraitFrom: "150th-anniversary souvenir, 2022",
      },
      {
        n: 59,
        name: "Fr Job De Rose",
        also: "Joseph De Rose",
        from: 1988,
        to: 1990,
        tier: "line",
        note: "Twice parish priest of this church; he was sent back in 1997. The souvenir left his portrait roundel blank.",
      },
      { n: 60, name: "Fr Irudayaraj", tamil: "இருதயராஜ்", from: 1990, to: 1995, tier: "name" },
      {
        n: 61,
        name: "Rev. Msgr S. Mariadas",
        tamil: "மரியதாஸ்",
        from: 1995,
        to: 1997,
        tier: "line",
        portrait: "mariadas",
        portraitFrom: "150th-anniversary souvenir, 2022",
        note: "A Monsignor — the only one on this list.",
      },
      { n: 62, name: "Fr Job De Rose", from: 1997, to: 1998, tier: "line", note: "His second term." },
      {
        n: 63,
        name: "Fr Theophilus",
        tamil: "தியோபிலஸ்",
        from: 1998,
        to: 2003,
        tier: "line",
        portrait: "theophilus",
        portraitFrom: "150th-anniversary souvenir, 2022",
        note: "He had served this church as assistant priest in 1984, fourteen years before he came back to hold it.",
      },
      {
        n: 64,
        name: "Fr N. A. Panneerselvam",
        from: 2003,
        to: 2008,
        tier: "line",
        portrait: "panneerselvam",
        portraitFrom: "150th-anniversary souvenir, 2022",
      },
      {
        n: 65,
        name: "Fr Nelson Paul Raj",
        tamil: "நெல்சன் பால்ராஜ்",
        from: 2008,
        to: 2013,
        tier: "line",
        portrait: "nelson-paul-raj",
        portraitFrom: "150th-anniversary souvenir, 2022",
      },
      {
        n: 66,
        name: "Fr Thaddeus Rajan",
        tamil: "தடேயுஸ் ராஜன்",
        from: 2013,
        to: 2018,
        tier: "life",
        portrait: "thaddeus-rajan",
        portraitFrom: "150th-anniversary souvenir, 2022",
        life:
          "He completed the Calvary chapel of the apparition church, set up in it the statues of St Devasahayam and St Arulanandar, and began the First-Saturday devotion that the parish keeps still. In 2014 he had the festival chariot that carries Our Lady through the village newly designed and built.",
      },
      {
        n: 67,
        name: "Fr T. John Britto",
        tamil: "ஜான் பிரிட்டோ",
        from: 2018,
        to: 2023,
        tier: "line",
        portrait: "john-britto",
        portraitFrom: "150th-anniversary souvenir, 2022",
        note: "The parish flagstaff was raised in his time, and consecrated by Bishop A. Stephen on 6 August 2021.",
      },
      { n: 68, name: "Fr Martin Manuvel", from: 2023, to: 2025, tier: "name" },
      {
        n: 69,
        name: "Fr A. Joseph Christian",
        from: 2025,
        to: THIS_YEAR,
        current: true,
        tier: "line",
        note: "The sixty-ninth priest of this parish, and the one who has it now.",
      },
    ],
  },
];

/** Flat list, for counts and for the JSON-LD. */
export const ALL_PRIESTS: Priest[] = PERIODS.flatMap((p) => p.priests);

/**
 * Sixty-nine, but of *pastorates* rather than men: Fr Grégoire holds three of
 * these numbers, and Borghese, Faseuille, Pouget and De Rose two each. The page
 * therefore counts pastorates and says so. No distinct-men total is published,
 * because it cannot be computed honestly from the names alone — two different
 * priests called Mariadas hold #51 and #61, and two called Ignatius hold #19 and
 * #50, so de-duplicating by name would merge four men into two.
 */
export const TERM_COUNT = ALL_PRIESTS.length;

/** Years served, for the tenure stroke. Never less than one: a priest who
 *  appears against a single year still held the parish that year. */
export function tenureYears(p: Priest): number {
  return Math.max(1, p.to - p.from);
}

/** "1741 – 1750", "1708", "2025 – today". */
export function tenureLabel(p: Priest): string {
  if (p.current) return `${p.from} – today`;
  if (p.to === p.from) return `${p.from}`;
  return `${p.from} – ${p.to}`;
}

/* ── Names the archives add ────────────────────────────────────────────────
   The parish list and the Jesuit records do not perfectly agree, and the honest
   thing is to publish the gap rather than silently merge it. These four men are
   documented at Vadakkankulam by sources outside the parish, and appear on no
   line of its numbered succession.                                            */
export const ARCHIVE_ADDITIONS = [
  {
    name: "Fr Calini, S.J.",
    when: "1716",
    what:
      "Quoted in the 1917 Tinnevelly Gazetteer as “stationed at Vadakkankulam, which had two years previously become a residence” — which independently dates the founding of the Jesuit residence here to about 1714.",
  },
  {
    name: "Fr Massour, S.J.",
    when: "about 1775",
    what:
      "Bertrand's Lettres du Maduré names him third, after Buttari and Thomassini, “about the same time”. His dates are unrecorded; he belongs somewhere in the handover to the priests of Cochin.",
  },
  {
    name: "Br Joseph Bergenthal, S.J.",
    when: "1855 – 1872",
    what:
      "The lay brother who drew and built the present church. The Rome catalogue for 1872 lists him at this station with the title Ædif. eccl. — builder of the church — and the parish's own English history calls him four times its chief architect. He appears on no other website in any language.",
  },
  {
    name: "Fr Eugène Rossignol, S.J.",
    when: "died here, 1863",
    what:
      "Not a pastor of this parish but of the mission around it. He caught the cholera that killed him while caring for the Christians of Kallikulam, and died here on 25 January 1863, aged forty. He is buried behind the church.",
  },
] as const;

/* ── Bishops who acted here ───────────────────────────────────────────────── */
export type Bishop = {
  name: string;
  role: string;
  what: string;
  portrait?: string;
  portraitFrom?: string;
};

export const BISHOPS: Bishop[] = [
  {
    name: "Bishop Alexis Canoz, S.J.",
    role: "First Bishop of Madurai",
    what:
      "Visited on his first pastoral tour of the south in 1848, blessed the foundation stone of the present church on 9 August 1855, and blessed the finished church in 1872.",
    portrait: "canoz",
    portraitFrom: "Pérès, 1891",
  },
  {
    name: "Most Rev. Dr Francis Tiburtius Roche, S.J.",
    role: "First Bishop of Tuticorin",
    what:
      "In 1926 he called Vadakkankulam “Little Rome” — Chinna Romapuri — and the name has stuck to the village for a century.",
  },
  {
    name: "Most Rev. Dr S. T. Amalanathar",
    role: "Bishop of Thoothukudi",
    what: "Declared the Holy Family Church a Shrine on 6 August 1993.",
  },
  {
    name: "Bishop A. Stephen",
    role: "Bishop of Thoothukudi",
    what: "Consecrated the parish flagstaff on 6 August 2021, twenty-eight years to the day after the shrine decree.",
  },
];

/* ── The graveyard row ─────────────────────────────────────────────────────
   Six dated stones stand behind the church, photographed in July 2026. Two of
   them were also read and printed in 1894, by a colonial survey of European
   tombs in Tinnevelly — so those two inscriptions can be quoted exactly, and
   are, because a verbatim stone is worth more than a paraphrase.              */
export type Tomb = {
  name: string;
  /** A death year, or a birth–death span where the stone gives both. */
  died: string;
  /** Only where the wording has been read from an independent printed source
   *  — which, for these six stones, means Forbes 1894 and no one else. */
  inscription?: string;
  note?: string;
  /** The stone is past reading. */
  worn?: boolean;
};

export const TOMBS: Tomb[] = [
  {
    name: "Fr Eugène Rossignol, S.J.",
    died: "1863",
    /** Verbatim from Forbes, List of European Tombs in the District of
     *  Tinnevelly (Tinnevelly: Collectorate Press, 1894), p. 5. */
    inscription: "1863, 25th January. Eugene Rossignal S.J., Roman Catholic Missionary, aged 41 years.",
  },
  {
    name: "Fr Victor Delpech, S.J.",
    died: "1887",
    inscription: "1887, 16th January. Victor Delpech S.J., aged 52 years.",
  },
  { name: "Fr Remigius Fernandez, S.J.", died: "1899" },
  { name: "An unnamed priest", died: "1874 – 1925", worn: true },
  { name: "Fr Dharmanathar", died: "1880 – 1950" },
  { name: "Fr J. M. Nicholas", died: "1911 – 2002", note: "A son of this village." },
];
