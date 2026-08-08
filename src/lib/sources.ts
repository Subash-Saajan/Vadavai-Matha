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

/**
 * TAMIL. The `…Ta` fields follow the house pattern of src/lib/acknowledgements.ts:
 * optional siblings of the English, never a replacement for it. The page falls
 * back to English wherever a Tamil string is absent, so a half-translated file
 * still renders whole.
 *
 * What is NOT translated, deliberately: `author`, `title` and `detail`. Those name
 * real printed books, archival shelf-marks and Latin catalogue entries, and a
 * Tamil reader who cannot find "Madras District Gazetteers: Tinnevelly" on a shelf
 * or in a catalogue has been given a worse bibliography, not a better one. Latin,
 * French and German quotations inside the notes stay in their own script for the
 * same reason; the Tamil translates the prose around them.
 */
export type Source = {
  /** Stable key. The /sources anchor, and what citations.ts cites. Never rename. */
  id: string;
  author?: string;
  title: string;
  detail: string;
  /** What this source establishes for THIS parish. */
  note: string;
  noteTa?: string;
  /** Free to read online, or on a shelf somewhere. Say which. */
  url?: string;
  archiveOnly?: boolean;
};

/* ─────────────────────────────────────────────────────────────────────────
 * THE FULL-VOLUME RULE. A parish decision, and the reason it lives here.
 *
 * `url` on an entry above is the bibliographic record: where this book was
 * consulted, kept so the citation can be checked by anyone who goes looking
 * and so nobody re-hunts a scan we have already found. It is NOT a licence to
 * put a door to the whole volume on the website.
 *
 * The books we cite are wider than the pages we cite from. Several of them
 * carry, on chapters we have no interest in reproducing, the caste history the
 * parish has decided this site will not carry — see the header of history.ts.
 * A footnote that hands the reader the entire volume hands them that too, in
 * the parish's voice, on a page the parish published. So: the site shows the
 * PAGE it stands on, and stops there.
 *
 * Enforced by host rather than by a per-entry flag on purpose. A flag has to be
 * remembered; a host list catches the next archive.org link somebody adds in
 * two years without having read this comment. If you add a source whose link
 * opens a complete scanned volume on a repository not named below, add the
 * host — do not work around it.
 *
 * Living web pages are untouched: the Vatican's homily, a diocesan parish page,
 * a census record, a newspaper report. Those are documents, not books, and
 * linking them is what a bibliography is for.
 * ───────────────────────────────────────────────────────────────────────── */
const FULL_VOLUME_HOSTS = [
  "archive.org",
  "gallica.bnf.fr",
  "bndigital.bnportugal.gov.pt",
  "library.oapen.org",
  "books.google.",
  "menachery.org",
];

/** True where following `url` would open the complete book, not one document. */
export const isFullVolumeLink = (url?: string): boolean =>
  !!url && FULL_VOLUME_HOSTS.some((h) => url.includes(h));

/** The link a reader may actually be shown — undefined for a whole volume. */
export const publicLink = (url?: string): string | undefined =>
  isFullVolumeLink(url) ? undefined : url;

export type SourceGroup = {
  heading: string;
  headingTa?: string;
  blurb?: string;
  blurbTa?: string;
  items: Source[];
};

export const SOURCE_GROUPS: SourceGroup[] = [
  {
    heading: "The Holy See, on St Devasahayam's baptism here",
    headingTa: `திருப்பீடம் — புனித தேவசகாயம் பிள்ளையின் திருமுழுக்கு இங்கே நிகழ்ந்தது குறித்து`,
    blurb:
      "The best-attested fact about this village does not come from us. That St Devasahayam Pillai was baptised at Vadakkankulam in 1745 is recorded by the Holy See's own sources and sealed by his canonisation in 2022.",
    blurbTa: `இவ்வூரைப் பற்றிய, மிகச் சிறந்த சான்றுகளைக் கொண்ட செய்தி நம்மிடமிருந்து வந்ததல்ல. புனித தேவசகாயம் பிள்ளை 1745-ல் வடக்கன்குளத்தில் திருமுழுக்குப் பெற்றார் என்பதைத் திருப்பீடத்தின் சொந்த ஆவணங்களே பதிவு செய்கின்றன; 2022-ல் அவர் புனிதராக அறிவிக்கப்பட்டதன் மூலம் அது முத்திரையிடப்பட்டது.`,
    items: [
      {
        id: "vatican_news_canonisation",
        title: "Vatican News — the canonisation of Devasahayam Pillai",
        detail: "Holy See news service, 2021",
        note: "States that he “was baptized at the Catholic church of Vadakkankulam village… by Jesuit priest Father Bouttari”.",
        noteTa: `அவர் “வடக்கன்குளம் ஊரின் கத்தோலிக்க ஆலயத்தில்… இயேசு சபை அருட்தந்தை புத்தாரி அவர்களால் திருமுழுக்குப் பெற்றார்” என்று இது கூறுகிறது.`,
        url: "https://www.vaticannews.va/en/church/news/2021-11/india-catholic-church-canonization-devasahayam-may-22-2022.html",
      },
      {
        id: "osservatore_romano_2012",
        author: "John Elphinston, Vice-Postulator of the cause",
        title: "L'Osservatore Romano",
        detail: "Weekly Edition in English, 5 December 2012, p. 11",
        note: "Names both the place and the date: Fr Buttari “instructed him for nine months and baptized him on 14 May 1745”.",
        noteTa: `இடத்தையும் நாளையும் சேர்த்தே இது குறிக்கிறது: அருட்தந்தை புத்தாரி “ஒன்பது மாதங்கள் அவருக்கு மறைக்கல்வி கற்பித்து, 1745 மே 14 அன்று அவருக்குத் திருமுழுக்கு அளித்தார்”.`,
        url: "https://www.ewtn.com/catholicism/library/courageous-convert-and-a-living-legend-5434",
      },
      {
        id: "pope_francis_homily_2022",
        title: "Homily at the Canonisation Mass, 15 May 2022",
        detail: "Pope Francis",
        note: "The canonisation itself — “Lazzaro, detto Devasahayam”.",
        noteTa: `புனிதராக அறிவிக்கும் நிகழ்வே இது — “Lazzaro, detto Devasahayam”.`,
        url: "https://www.vatican.va/content/francesco/en/homilies/2022/documents/20220515-omelia-canonizzazione.html",
      },
      {
        id: "holy_see_canonisation_rite_2022",
        author: "Dicastero delle Cause dei Santi",
        title: "Canonizzazioni — 15 May 2022",
        detail: "The Holy See's own record of the rite",
        note: "The official act, listing “Lazzaro, detto Devasahayam” among the ten canonised that day.",
        noteTa: `அன்று புனிதராக அறிவிக்கப்பட்ட பத்துப் பேரின் வரிசையில் “Lazzaro, detto Devasahayam” என்று பதிவு செய்யும் அதிகாரப்பூர்வ ஆவணம்.`,
        url: "https://www.causesanti.va/it/celebrazioni/canonizzazioni/2022/05/15.html",
      },
      {
        id: "ccbi_patron_laity_2025",
        author: "Conference of Catholic Bishops of India",
        title: "St Devasahayam declared Patron of the Laity in India",
        detail: "Decree of the Dicastery for Divine Worship, 16 July 2025; proclaimed 15 October 2025",
        note: "The most recent act of the Holy See touching this parish. On the petition of the Indian bishops, the saint baptised in this church on 14 May 1745 was confirmed as Patron of the Laity in India.",
        noteTa: `இப்பங்கைத் தொடும் திருப்பீடத்தின் மிகச் சமீபத்திய நடவடிக்கை. இந்திய ஆயர்களின் மனுவின் பேரில், 1745 மே 14 அன்று இவ்வாலயத்தில் திருமுழுக்குப் பெற்ற இப்புனிதர், இந்தியப் பொதுநிலையினரின் பாதுகாவலராக உறுதி செய்யப்பட்டார்.`,
        url: "https://www.ccbi.in/post/pope-leo-declares-saint-devasahayam-patron-of-the-laity",
      },
    ],
  },
  {
    heading: "The founder, in his own words",
    headingTa: `நிறுவனர், தமது சொந்த வார்த்தைகளில்`,
    items: [
      {
        id: "debritto_prison_letter_1693",
        author: "St John de Britto, S.J.",
        title: "Letter from the prison of Oriyur, 3 February 1693",
        detail: "Written the night before his death; printed in Bertrand, La Mission du Maduré, vol. III",
        note: "The saint who founded this parish, in his own hand: “The whole crime of which I am accused is teaching the law of the true God…”",
        noteTa: `இப்பங்கை நிறுவிய புனிதர், தமது சொந்தக் கையால்: “எனக்கு எதிராகச் சுமத்தப்பட்டுள்ள குற்றம் முழுவதும், மெய்யான கடவுளின் வேதத்தை நான் போதிப்பது ஒன்றே…”`,
        url: "https://archive.org/details/TheLivesOfFather",
      },
      {
        id: "maldonado_1697",
        author: "Jean-Baptiste de Maldonado, S.J.",
        title: "Illustre certamen R.P. Joannis de Britto",
        detail: "Antwerp, 1697",
        note: "The earliest printed martyrology of de Britto, published four years after his death; its title alone fixes the date.",
        noteTa: `புனித அருளானந்தரின் இரத்தசாட்சியத்தை அச்சில் பதிவு செய்த மிகப் பழைய நூல்; அவரது மரணத்திற்கு நான்கு ஆண்டுகளுக்குப் பின் வெளியானது. அதன் தலைப்பு ஒன்றே அந்நாளை உறுதிப்படுத்திவிடுகிறது.`,
        url: "https://bndigital.bnportugal.gov.pt/en/records/item/91889",
      },
      {
        id: "boero_1853",
        author: "Giuseppe Boero, S.J.",
        title: "Vita del beato Giovanni de Britto",
        detail: "Rome: La Civiltà Cattolica, 1853 — Italian",
        note: "The Roman life of the founder, written for the beatification. It descends from the same seventeenth-century Jesuit dossier as Faber, so it corroborates the tradition rather than testing it.",
        noteTa: `அருளாளராக அறிவிக்கும் நிகழ்வுக்காக உரோமையில் எழுதப்பட்ட நிறுவனரின் வாழ்க்கை வரலாறு. ஃபேபரின் நூலைப் போலவே இதுவும் பதினேழாம் நூற்றாண்டு இயேசு சபை ஆவணத் தொகுப்பிலிருந்தே இறங்கி வருகிறது; எனவே இது மரபைச் சோதிக்கவில்லை, மரபை வழிமொழிகிறது.`,
        url: "https://archive.org/details/bub_gb_Tmt1SuYLFBEC",
      },
    ],
  },
  {
    heading: "The Jesuit archives",
    headingTa: `இயேசு சபை ஆவணக்காப்பகங்கள்`,
    blurb:
      "Vadakkankulam was a Jesuit parish of the Madurai Mission. The Society's own registers record, year by year, who was here.",
    blurbTa: `வடக்கன்குளம் மதுரைப் பணிக்களத்தைச் சேர்ந்த ஓர் இயேசு சபைப் பங்காக இருந்தது. இங்கே யார் இருந்தார்கள் என்பதை ஆண்டுக்கு ஆண்டு சபையின் சொந்தப் பதிவேடுகளே குறித்து வைத்துள்ளன.`,
    items: [
      {
        id: "arsi_tolosana_1872",
        title: "Archivum Romanum Societatis Iesu (ARSI), Rome",
        detail: "Province catalogues, Provincia Tolosana",
        note: "The 1872 catalogue lists Br Joseph Bergenthal as “Ædif. eccl. Vadakencoulam” — the builder of the church at Vadakkankulam, in the very year it was blessed. This is the independent confirmation of the architect named in the parish's own history.",
        noteTa: `1872-ஆம் ஆண்டுப் பட்டியல், சகோதரர் ஜோசப் பெர்கந்தால் அவர்களை “Ædif. eccl. Vadakencoulam” என்று பதிவு செய்கிறது — வடக்கன்குளத்து ஆலயத்தைக் கட்டியவர் என்று, அது ஆசீர்வதிக்கப்பட்ட அதே ஆண்டில். பங்கின் சொந்த வரலாறு பெயர் சொல்லும் கட்டிடக் கலைஞரை வெளியிலிருந்து உறுதிப்படுத்தும் சான்று இதுவே.`,
        archiveOnly: true,
      },
      {
        id: "arsi_tolosana_1900",
        title: "Catalogus Provinciae Tolosanae S.J., 1900",
        detail: "ARSI, Rome — Madurai Mission, station 3",
        note: "“3. Vadakenkoulam. P. Marianus Dayriam, Cur. ag. paroch. et conv. monial. ind. sept. Dol. B. M. V., Dir. schol.” The Society's own register sets down the priest of Vadakkankulam as chaplain of the convent of Indian nuns of the Seven Sorrows and director of its school — in Latin, in Rome, in 1900.",
        noteTa: `“3. Vadakenkoulam. P. Marianus Dayriam, Cur. ag. paroch. et conv. monial. ind. sept. Dol. B. M. V., Dir. schol.” வடக்கன்குளத்தின் அருட்தந்தையை, ஏழு வியாகுல அன்னையின் இந்திய அருட்சகோதரிகளின் மடத்திற்கு ஆன்மிகக் குருவாகவும், அதன் பள்ளியின் இயக்குநராகவும் சபையின் சொந்தப் பதிவேடு குறித்து வைக்கிறது — இலத்தீன் மொழியில், உரோமையில், 1900-ஆம் ஆண்டில்.`,
        archiveOnly: true,
      },
      {
        id: "arsi_tolosana_1914",
        title: "Catalogus Provinciae Tolosanae S.J., 1914",
        detail: "ARSI, Rome — p. 57",
        note: "“16. Vadakankulam. P. Adrianus Caussanel, Cur. ag. par. et conv. mon Ind. Sept. Dol. B. M. V.” — the Society's own register, in Latin, in Rome: the priest of Vadakkankulam, parish priest and chaplain of the convent of the Indian nuns of the Seven Sorrows. This note used to stop at “Cur. ag. par.” and drop the rest of the line, which was a small self-inflicted wound: the convent clause is the exact thing the 1892 moment on /history cites this catalogue for, and we were truncating away our own evidence. One caution on the other side. This is the only year in which any catalogue we have seen places Caussanel at this parish — the 1900 catalogue has another priest here, the 1921 one has him at Kallikulam, and the parish's own list gives him 1910–1919 — so the entry fixes him here in 1914 and cannot, by itself, carry a forty-two-year residence.",
        noteTa: `“16. Vadakankulam. P. Adrianus Caussanel, Cur. ag. par. et conv. mon Ind. Sept. Dol. B. M. V.” — சபையின் சொந்தப் பதிவேடு, இலத்தீனில், உரோமையில்: வடக்கன்குளத்தின் அருட்தந்தை, பங்குத் தந்தையாகவும், ஏழு வியாகுல அன்னையின் இந்திய அருட்சகோதரிகளின் மடத்திற்கு ஆன்மிகக் குருவாகவும். இக்குறிப்பு முன்பு “Cur. ag. par.” என்பதோடு நின்று, வரியின் மீதிப் பகுதியை விட்டுவிட்டிருந்தது; அது நாமே நமக்கு ஏற்படுத்திக்கொண்ட ஒரு சிறு காயம் — /history பக்கத்தில் 1892-ஆம் ஆண்டு நிகழ்வு இப்பட்டியலை மேற்கோள் காட்டுவதே அந்த மடம் பற்றிய சொற்றொடருக்காகத்தான்; நமது சொந்த ஆதாரத்தையே நாம் வெட்டி எறிந்துகொண்டிருந்தோம். மறுபுறம் ஓர் எச்சரிக்கை. நாம் பார்த்த பட்டியல்களில் கௌசானல் அவர்களை இப்பங்கில் நிறுத்தும் ஒரே ஆண்டு இதுதான் — 1900-ஆம் ஆண்டுப் பட்டியலில் இங்கே வேறோர் அருட்தந்தை இருக்கிறார்; 1921-ஆம் ஆண்டுப் பட்டியல் அவரைக் கல்லிக்குளத்தில் காட்டுகிறது; பங்கின் சொந்தப் பட்டியலோ அவருக்கு 1910–1919 எனத் தருகிறது. எனவே இப்பதிவு 1914-ல் அவர் இங்கு இருந்தார் என்பதை உறுதி செய்கிறதே தவிர, நாற்பத்திரண்டு ஆண்டு வாசத்தைத் தானாகவே அது தாங்க முடியாது.`,
        archiveOnly: true,
      },
      {
        id: "arsi_madurensis_1921",
        title: "Catalogus Missionis Madurensis, 1921",
        detail: "ARSI, Rome — p. 13",
        note: "“28. Vadakenkulam — STATIO S. FAMILIÆ.” The Society of Jesus recording, in Latin, that this is the station of the Holy Family.",
        noteTa: `“28. Vadakenkulam — STATIO S. FAMILIÆ.” இது திருக்குடும்பத்தின் பணிநிலையம் என்று இயேசு சபை இலத்தீனில் பதிவு செய்கிறது.`,
        archiveOnly: true,
      },
      {
        id: "jemparc_book450",
        title: "Jesuit Madurai Province Archives (JEMPARC), Shembaganur",
        detail: "Book 450 — Diary of Fr A. Caussanel, S.J., at Vadakenkulam, 1881–1923",
        note: "The most important unpublished document specific to this church, and it is cited on /history — on the Caussanel moment of “Little Rome”, where the parish's own record of its past is the thing being described. What the book is deserves a plainer word than “diary”. The mission's own magazine says of Caussanel that he wrote “des diaires, une histoire du pays” and that he “recherche les vieux manuscrits et les déchiffre” — he hunted out the old manuscripts and deciphered them. Book 450 is therefore a compilation drawn from older papers, not forty-two years of days written down as they were lived: Caussanel was ordained in 1884 and did not reach India until 1888, so he cannot have kept it in person from 1881. That is a truer account of it, and a better one. It survives; we have not yet read it.",
        noteTa: `இவ்வாலயத்திற்கே உரிய, அச்சிடப்படாத ஆவணங்களுள் மிக முக்கியமானது; /history பக்கத்தில் “சின்ன ரோமாபுரி” பகுதியின் கௌசானல் நிகழ்வில் இது மேற்கோள் காட்டப்படுகிறது — அங்கே, பங்கு தன் கடந்த காலத்தைப் பற்றி வைத்திருக்கும் சொந்தப் பதிவே பேசப்படும் பொருள். இந்நூல் என்னவென்பதற்கு “நாட்குறிப்பு” என்பதைவிடத் தெளிவான ஒரு சொல் தேவை. கௌசானல் அவர்கள் “des diaires, une histoire du pays” எழுதினார் என்றும், “recherche les vieux manuscrits et les déchiffre” — பழைய கையெழுத்துப் படிகளைத் தேடிக் கண்டெடுத்து அவற்றை வாசித்து விளக்கினார் — என்றும் பணிக்களத்தின் சொந்த இதழே கூறுகிறது. எனவே நூல் 450 என்பது பழைய ஆவணங்களிலிருந்து தொகுக்கப்பட்ட ஒன்று; நாற்பத்திரண்டு ஆண்டுகள் வாழ்ந்தபடியே நாளுக்கு நாள் எழுதப்பட்ட குறிப்பு அல்ல: கௌசானல் 1884-ல்தான் குருப்பட்டம் பெற்றார், 1888 வரை இந்தியாவுக்கே வரவில்லை; ஆகவே 1881 முதல் அவரே அதை எழுதி வந்திருக்க முடியாது. இதுவே அந்நூலைப் பற்றிய உண்மையான — மேலும் சிறந்த — விளக்கம். அது இன்றும் இருக்கிறது; நாம் இன்னும் அதை வாசிக்கவில்லை.`,
        url: "https://archivesj.in",
        archiveOnly: true,
      },
      {
        id: "buttari_manuscript",
        author: "Fr Giovanni Battista Buttari, S.J.",
        title: "The Buttari manuscript",
        detail: "ARSI, Malabarica–Historia, vol. 6; printed Loreto, 1844",
        note: "Written by the priest who baptised St Devasahayam at this church and remained his confessor. It is the literary root of the entire Devasahayam tradition.",
        noteTa: `இவ்வாலயத்தில் புனித தேவசகாயத்திற்குத் திருமுழுக்கு அளித்து, பின்னரும் அவரது பாவசங்கீர்த்தனக் குருவாகவே இருந்த அருட்தந்தையால் எழுதப்பட்டது. தேவசகாயம் மரபு முழுவதற்குமான எழுத்து மூலம் இதுவே.`,
        archiveOnly: true,
      },
      {
        id: "la_mission_du_madure_periodical",
        author: "Toulouse Province Jesuits",
        title: "La Mission du Maduré",
        detail: "Periodical, 1912–1933 — BnF Gallica",
        note: "The mission's own magazine. It is here that Fr Caussanel's long service at this parish is described, and the aged sacristan of the Soosai-Marianather family is recorded being received by Pope Pius XI in 1930.",
        noteTa: `பணிக்களத்தின் சொந்த இதழ். இப்பங்கில் அருட்தந்தை கௌசானல் அவர்கள் ஆற்றிய நீண்ட பணி விவரிக்கப்படுவது இங்குதான்; சூசை-மரியநாதர் குடும்பத்தைச் சேர்ந்த வயது முதிர்ந்த ஆலயப் பணியாளர் 1930-ல் திருத்தந்தை பதினோராம் பத்திநாதர் அவர்களால் வரவேற்கப்பட்டது பதிவாகியிருப்பதும் இங்குதான்.`,
        url: "https://gallica.bnf.fr/ark:/12148/cb32816871d/date",
      },
    ],
  },
  {
    heading: "The outside record",
    headingTa: `வெளியுலகின் பதிவு`,
    blurb:
      "Printed, official and statistical sources — written by people with no interest in flattering the parish, and in one case by a man who had never been near it.",
    blurbTa: `அச்சிடப்பட்ட, அரசு சார்ந்த, புள்ளிவிவர மூலங்கள் — இப்பங்கை முகஸ்துதி செய்வதில் எந்த ஆர்வமும் இல்லாதவர்களால் எழுதப்பட்டவை; அவற்றுள் ஒன்று, இவ்வூரின் அருகில் ஒருபோதும் வந்திராத ஒருவரால் எழுதப்பட்டது.`,
    items: [
      {
        id: "india_orientalis_christiana_1794",
        author: "Paulinus a S. Bartholomaeo, O.C.D.",
        title: "India Orientalis Christiana",
        detail: "Rome: Typis Salomonianis, 1794 — p. 158",
        note: "The earliest appearance of this village in a European printed book: “XIV. Vadakencollam”, listed among the churches under the Bishop of Cochin. It is also a source we ourselves have long cited wrongly — our own compilation gives “Rome 1714, p. 168”, and reads into it a founding “after 1545”. The book is Rome 1794, the entry is on p. 158, and no founding date appears in it at all. We would rather print the correction than the claim.",
        noteTa: `ஐரோப்பாவில் அச்சான ஒரு நூலில் இவ்வூர் தோன்றும் மிகப் பழைய இடம்: கொச்சி ஆயரின் கீழ் இருந்த ஆலயங்களின் பட்டியலில் “XIV. Vadakencollam”. நாமே நெடுங்காலமாகத் தவறாக மேற்கோள் காட்டி வந்த ஒரு மூலமும் இதுவே — நமது சொந்தத் தொகுப்பு “Rome 1714, p. 168” எனத் தந்து, அதிலிருந்து “1545-க்குப் பின்” என்று ஒரு நிறுவல் ஆண்டையும் படித்துக்கொள்கிறது. நூலோ உரோமை 1794; பதிவு 158-ஆம் பக்கத்தில் உள்ளது; நிறுவல் ஆண்டு என்று எதுவும் அதில் இல்லவே இல்லை. அந்த உரிமைக்கோரலை அச்சிடுவதைவிடத் திருத்தத்தை அச்சிடுவதையே நாம் விரும்புகிறோம்.`,
        url: "https://archive.org/details/indiaorientalis00paulgoog/page/n189/mode/1up",
      },
      {
        id: "bell_inscription_photograph",
        title: "The bell itself — photographed in the tower",
        detail: "Parish photograph of the 1861 bell, inscription legible",
        note: "The Knowledge Base recorded that the bells' inscriptions “have never been photographed”, which left the whole story of them — Lyon, the Burdin foundry, the donor — resting on a single Tamil web page that the parish's own souvenir contradicts on the donor's name. A photograph of the bell now exists, and the bronze reads “…GRÉGOIRE DE VALENCE…” and “…ATEUR CASIMIR GRÉGOIRE”. The object settles what the paper could not: the donor is named on the bell he gave.",
        noteTa: `மணிகளின்மேல் உள்ள எழுத்துகள் “ஒருபோதும் புகைப்படம் எடுக்கப்படவில்லை” என்று நமது அறிவுக் களஞ்சியம் பதிவு செய்திருந்தது. அதனால் அவற்றைப் பற்றிய கதை முழுவதுமே — லியோன், பர்டின் வார்ப்பகம், கொடையாளர் — ஒரே ஒரு தமிழ் இணையப் பக்கத்தின்மேல் நின்றது; கொடையாளரின் பெயரில் பங்கின் சொந்த விழா மலரே அப்பக்கத்திற்கு முரணாக இருக்கிறது. இப்போது மணியின் புகைப்படம் ஒன்று இருக்கிறது; அந்த வெண்கலத்தில் “…GRÉGOIRE DE VALENCE…” என்றும் “…ATEUR CASIMIR GRÉGOIRE” என்றும் படிக்க முடிகிறது. காகிதத்தால் முடியாததைப் பொருள் முடித்து வைக்கிறது: தான் கொடுத்த மணியிலேயே கொடையாளரின் பெயர் பொறிக்கப்பட்டுள்ளது.`,
        archiveOnly: true,
      },
      {
        id: "gnanapoo_tomb_photograph",
        title: "Gnanapoo Ammal's tomb — photographed in the parish",
        detail: "Parish photograph of the monument and its Tamil plaque",
        note: "That the martyr's wife lies here was something the page could only assert. The monument stands, and its plaque names her in Tamil as the wife of the martyr Devasahayam Pillai — ஞானப்பூ அம்மாள் — and gives the year of her death as 1766, which no book on this project supplied. An old black cross cut with INRI stands in the arch behind it, older than the tiled surround built around it since.",
        noteTa: `இரத்தசாட்சியின் மனைவி இங்கே அடக்கம் செய்யப்பட்டுள்ளார் என்பதை இப்பக்கத்தால் வெறுமனே சொல்ல மட்டுமே முடிந்தது. அந்நினைவுச் சின்னம் நிற்கிறது; இரத்தசாட்சி தேவசகாயம் பிள்ளையின் மனைவி என்று அதன் பலகை அவரைத் தமிழிலேயே ஞானப்பூ அம்மாள் எனப் பெயரிட்டு, அவரது மறைவின் ஆண்டை 1766 எனத் தருகிறது — இப்பணியில் உள்ள எந்த நூலும் தராத ஒரு செய்தி. அதன் பின்னாலுள்ள வளைவில், INRI பொறிக்கப்பட்ட பழைய கருஞ்சிலுவை ஒன்று நிற்கிறது; பின்னாளில் அதைச் சுற்றி எழுப்பப்பட்ட ஓடு பதித்த கட்டமைப்பைவிட அது பழமையானது.`,
        archiveOnly: true,
      },
      {
        id: "tomb_plaques_photographs",
        title: "The priests' tombs — photographed beside the church",
        detail: "Parish photographs of the black stone plaques in the tomb row",
        note: "The row of graves the page describes can be read. Fr Victor Delpech's stone gives his birth as well as his death — “NATUS 10 NOV. 1835 · MORTUUS 16 JAN. 1887” — and closes with a line that explains the whole row: “In memoriam Fratris hoc et circumstantia sepulchra sui erexerunt”, his brethren raised this tomb and the ones around it. Fr Remigius Fernandez's gives “AET. SUAE 78 · 4 MAII 1899”. Where a book and a stone disagree about a date, the stone was cut by the men who buried him, and it wins.",
        noteTa: `இப்பக்கம் விவரிக்கும் கல்லறை வரிசையை இப்போது வாசிக்க முடியும். அருட்தந்தை விக்தோர் தெல்பெஷ் அவர்களின் கல், அவரது மரணத்தோடு பிறப்பையும் தருகிறது — “NATUS 10 NOV. 1835 · MORTUUS 16 JAN. 1887” — வரிசை முழுவதையும் விளக்கும் ஒரு வரியோடு அது முடிகிறது: “In memoriam Fratris hoc et circumstantia sepulchra sui erexerunt” — இக்கல்லறையையும் அதைச் சுற்றியுள்ளவற்றையும் அவரது சபைச் சகோதரர்களே எழுப்பினர். அருட்தந்தை ரெமிஜியுஸ் ஃபெர்னாண்டஸ் அவர்களின் கல் “AET. SUAE 78 · 4 MAII 1899” எனத் தருகிறது. ஒரு நாளைக் குறித்து நூலும் கல்லும் வேறுபடும்போது, அவரை அடக்கம் செய்தவர்களே செதுக்கிய கல்லுக்கே வெற்றி.`,
        archiveOnly: true,
      },
      {
        id: "shrine_decree_photograph",
        title: "The shrine decree — photographed in the parish",
        detail: "Diocese of Tuticorin, decree raising the church to a diocesan shrine; Tamil, sealed and signed",
        note: "The audit of this page long recorded that the 1993 shrine declaration rested on the parish and the diocese reporting their own act, with no decree text held. A photograph of the decree exists and had been sitting uncatalogued in the parish picture folder since July. It names the canon — the Holy Family church at Vadakkankulam “is from today raised to a diocesan shrine under canon 1230” — and grants it the duties, rights and special character of a diocesan shrine under canons 1232–1234 and the Directory on Popular Piety and Liturgy. It states that the decree was announced on 6 August 1993 at Mass in the church by Bishop S. T. Amalanathar. Two things it does not do: it is not the 1993 original, being signed and sealed by a later bishop, A. Stephen; and it is still the diocese attesting the diocese. What it does settle is the wording, the canon and the title — the church declared a shrine in 1993 is the HOLY FAMILY church, in the decree's own words, which is why the Marian style of the shrine cannot be read back into that year.",
        noteTa: `1993-ஆம் ஆண்டின் திருத்தல அறிவிப்பு, பங்கும் மறைமாவட்டமும் தங்கள் சொந்த நடவடிக்கையைத் தாங்களே அறிவித்ததன்மேல் மட்டுமே நின்றது என்றும், ஆணையின் வாசகம் நம்மிடம் இல்லை என்றும் இப்பக்கத்தின் தணிக்கை நெடுங்காலமாகப் பதிவு செய்திருந்தது. ஆணையின் புகைப்படம் ஒன்று இருக்கிறது; ஜூலை முதல் அது பங்கின் படக் கோப்புறையில் பட்டியலிடப்படாமலே கிடந்திருக்கிறது. அது திருச்சட்டப் பிரிவைப் பெயர் சொல்லிக் குறிக்கிறது — வடக்கன்குளத்துத் திருக்குடும்ப ஆலயம் “இன்று முதல் 1230-ஆம் திருச்சட்டப்படி மறைமாவட்டத் திருத்தலமாக உயர்த்தப்படுகிறது” — மேலும் 1232–1234 திருச்சட்டங்களின்படியும், மக்கள் பக்தி முயற்சிகள் மற்றும் வழிபாடு பற்றிய வழிகாட்டி நூலின்படியும், மறைமாவட்டத் திருத்தலத்திற்குரிய கடமைகளையும் உரிமைகளையும் தனிச்சிறப்பையும் அதற்கு வழங்குகிறது. 1993 ஆகஸ்ட் 6 அன்று ஆலயத் திருப்பலியில் ஆயர் ச. தெ. அமலநாதர் அவர்களால் இவ்வாணை அறிவிக்கப்பட்டது என்று அது கூறுகிறது. இரண்டு காரியங்களை அது செய்யவில்லை: இது 1993-ஆம் ஆண்டின் மூல ஆவணம் அல்ல — பிற்காலத்து ஆயர் அ. ஸ்டீபன் அவர்களால் கையொப்பமிடப்பட்டு முத்திரையிடப்பட்டது; மேலும் இதுவும் மறைமாவட்டமே மறைமாவட்டத்திற்குச் சாட்சி சொல்வதுதான். அது உறுதி செய்வது இவற்றைத்தான் — சொற்களை, திருச்சட்டப் பிரிவை, பட்டப்பெயரை. 1993-இல் திருத்தலமாக அறிவிக்கப்பட்டது, ஆணையின் சொந்த வார்த்தைகளிலேயே, திருக்குடும்ப ஆலயமே. அதனால்தான் திருத்தலத்தின் இன்றைய மரியன்னை சார்ந்த வடிவத்தை அந்த ஆண்டுக்குள் பின்னோக்கிப் படித்துவிட முடியாது.`,
        archiveOnly: true,
      },
      {
        id: "archives_lyon_burdin",
        author: "Archives municipales de Lyon",
        title: "The Burdin bell foundry, Lyon",
        detail: "Burdin Aîné, 28 rue de Condé — foundry records",
        note: "Cited for exactly what it proves, and no more. The Lyon municipal archives confirm that the Burdin foundry existed, was casting bells in these years, and exported them widely — to France, Algeria, Canada — which is what makes a bell reaching a mission church in south India entirely credible. It says nothing whatever about Vadakkankulam. It corroborates the story's setting, not the story.",
        noteTa: `இது எதை நிரூபிக்கிறதோ அதற்காக மட்டுமே மேற்கோள் காட்டப்படுகிறது; அதற்கு மேல் ஒன்றுமில்லை. பர்டின் வார்ப்பகம் இருந்தது என்பதையும், அந்த ஆண்டுகளில் அது மணிகளை வார்த்துக்கொண்டிருந்தது என்பதையும், பிரான்சு, அல்ஜீரியா, கனடா என்று அவற்றைப் பரவலாக ஏற்றுமதி செய்தது என்பதையும் லியோன் நகர ஆவணக்காப்பகம் உறுதி செய்கிறது; தென்னிந்தியாவின் ஒரு மறைப்பணி ஆலயத்திற்கு ஒரு மணி வந்து சேர்ந்தது முற்றிலும் நம்பத்தகுந்தது என்பதற்குக் காரணம் அதுவே. வடக்கன்குளத்தைப் பற்றி இது எதுவுமே சொல்லவில்லை. கதையை அல்ல, கதை நிகழும் சூழலை மட்டுமே இது வழிமொழிகிறது.`,
        url: "https://archives.lyon.fr/",
      },
      {
        id: "pate_gazetteer_1917",
        author: "H. R. Pate",
        title: "Madras District Gazetteers: Tinnevelly, Vol. I",
        detail: "Madras: Government Press, 1917",
        note: "Records that Christianity at Vadakkankulam “dates from the closing years of the seventeenth century” and that “the present handsome church… was completed in 1872” — an outside, official confirmation of both the antiquity of the mission and the date of the present building.",
        noteTa: `வடக்கன்குளத்தில் கிறிஸ்தவம் “பதினேழாம் நூற்றாண்டின் இறுதி ஆண்டுகளிலிருந்து தொடங்குகிறது” என்றும், “இன்று நிற்கும் அழகிய ஆலயம்… 1872-ல் நிறைவு பெற்றது” என்றும் இது பதிவு செய்கிறது — பணிக்களத்தின் தொன்மைக்கும், இன்றைய கட்டிடத்தின் ஆண்டுக்கும், வெளியிலிருந்து கிடைக்கும் அரசு சார்ந்த உறுதிப்பாடு.`,
        url: "https://archive.org/details/in.ernet.dli.2015.13347",
      },
      {
        id: "caldwell_1881",
        author: "Robert Caldwell",
        title: "A Political and General History of the District of Tinnevelly",
        detail: "Madras: Government Press, 1881",
        note: "The foundational history of the district in which the parish stands. It is also the source that corrects us: the twenty thousand Paravas of the coast were baptised by Fr Michael Vaz after the Portuguese expedition of 1532 — a decade before St Francis Xavier arrived.",
        noteTa: `இப்பங்கு அமைந்துள்ள மாவட்டத்தின் அடித்தள வரலாறு. நம்மைத் திருத்தும் மூலமும் இதுவே: கடற்கரையின் இருபதாயிரம் பரதவர், 1532-ஆம் ஆண்டுப் போர்த்துகீசியப் படையெடுப்பிற்குப் பின், அருட்தந்தை மிக்கேல் வாஸ் அவர்களால் திருமுழுக்குப் பெற்றனர் — புனித சவேரியார் வருவதற்குப் பத்தாண்டுகள் முன்பே.`,
        url: "https://archive.org/details/politicalgeneral00caldrich",
      },
      {
        id: "mackenzie_1901",
        author: "G. T. Mackenzie",
        title: "Christianity in Travancore",
        detail: "Trivandrum: Government Press, 1901 — p. 80",
        note: "A British administrator's survey, with no interest in a Tinnevelly Catholic shrine, that sets the baptism down plainly from the other side: Fr Bouttari “in 1745 baptised a Travancore convert who is reverenced as a martyr”, a man of good family who held office in the court of the Raja and was “baptised, being then thirty-two years of age”, taking the name Devasagayam. Independent confirmation of the parish's central 1745 fact — the man's standing, his age, and the place.",
        noteTa: `திருநெல்வேலியின் ஒரு கத்தோலிக்கத் திருத்தலத்தில் எந்த அக்கறையும் இல்லாத ஒரு பிரிட்டிஷ் ஆட்சியாளரின் ஆய்வு; மறுபக்கத்திலிருந்து அத்திருமுழுக்கைத் தெளிவாகவே பதிவு செய்கிறது: அருட்தந்தை புத்தாரி “1745-ல், இரத்தசாட்சியாக மதிக்கப்படும், திருவிதாங்கூரைச் சேர்ந்த மனமாற்றம் பெற்ற ஒருவருக்குத் திருமுழுக்கு அளித்தார்”; அவர் நல்ல குடும்பத்தைச் சேர்ந்தவர், இராஜாவின் அரசவையில் பதவி வகித்தவர், “அப்போது முப்பத்திரண்டு வயதுடையவராய்த் திருமுழுக்குப் பெற்று” தேவசகாயம் என்னும் பெயரைச் சூடிக்கொண்டார். பங்கின் மையச் செய்தியான 1745-க்கு வெளியிலிருந்து கிடைக்கும் தனிச் சான்று — அம்மனிதரின் நிலை, அவரது வயது, அந்த இடம்.`,
      },
      {
        id: "krishnaswami_ayyar_1934",
        author: "K. N. Krishnaswami Ayyar",
        title: "Madras District Gazetteers: Tinnevelly — Statistical Appendix & Supplement",
        detail: "Madras: Government Press, 1934 — p. 169",
        note: "The government supplement to Pate's gazetteer, which turns the parish's “empty” years around: during the sixty-three Jesuit-less years, “Vadakkankulam then became the sole centre of the inland mission with four divisional centres… Sendamangalam, Andipatti, Kamanayakkanpatti and Vadakkankulam itself”, served from Cochin until the charge was made over to the new Jesuits in 1837. We quote only that sentence from the page.",
        noteTa: `பேட்டின் மாவட்டக் கையேட்டிற்கான அரசின் இணைப்பு; பங்கின் “வெறுமையான” ஆண்டுகளைத் தலைகீழாக்குகிறது: இயேசு சபையினர் இல்லாத அறுபத்துமூன்று ஆண்டுகளில், “உள்நாட்டுப் பணிக்களத்தின் ஒரே மையமாக வடக்கன்குளமே ஆயிற்று; அதற்குக் கீழ் நான்கு கோட்ட மையங்கள் இருந்தன… சேந்தமங்கலம், ஆண்டிபட்டி, காமநாயக்கன்பட்டி, மற்றும் வடக்கன்குளமே” — 1837-ல் புதிய இயேசு சபையினரிடம் பொறுப்பு ஒப்படைக்கப்படும் வரை, கொச்சியிலிருந்தே இது கவனிக்கப்பட்டது. அப்பக்கத்திலிருந்து அவ்வொரு வாக்கியத்தை மட்டுமே நாம் மேற்கோள் காட்டுகிறோம்.`,
      },
      {
        id: "the_month_1889",
        author: "Anonymous, in The Month",
        title: "“A Visit to the Pearl Fishery Coast”, Part IV",
        detail: "London: The Month, vol. LXVII no. 304, October 1889 — pp. 254–257",
        note: "An English Jesuit monthly, printing a traveller's account of the Christmas he spent in this church. He describes the arrival — the wide façade at the end of a long street hung with bunting, two thousand people waiting — and then the midnight Mass: the congregation entering “silently and stealthily as ghosts… draped in their long white cloths”, barefoot on the flagstones, the two naves singing in turn, and at the Communion “all distinctions were lost sight of at the Holy Table”. The same pages record the sacristanship held in one family for two centuries, and the writer being shown the reliquary of St Devasahayam and allowed to inspect the turban and the chains. An outside eyewitness inside the building, thirty-three years before the canonisation process began.",
        noteTa: `ஓர் ஆங்கில இயேசு சபை மாத இதழ்; இவ்வாலயத்தில் தான் கழித்த கிறிஸ்து பிறப்பு விழாவைப் பற்றி ஒரு பயணி எழுதிய பதிவை அச்சிட்டது. வந்து சேர்ந்ததை அவர் விவரிக்கிறார் — தோரணங்கள் கட்டப்பட்ட நீண்ட தெருவின் முடிவில் அகன்ற முகப்பு, காத்திருக்கும் இரண்டாயிரம் பேர் — பின்னர் நள்ளிரவுத் திருப்பலி: மக்கள் “ஆவிகளைப் போல அமைதியாகவும் மெல்லவும்… தங்கள் நீண்ட வெண்ணிற ஆடைகளைப் போர்த்திக்கொண்டு” உள்ளே நுழைகிறார்கள்; கல்தளத்தில் வெறுங்காலுடன்; இரு நடைகளும் மாறி மாறிப் பாடுகின்றன; நற்கருணை வேளையில் “திருமேசையின் முன் எல்லா வேறுபாடுகளும் மறைந்துபோயின”. இரு நூற்றாண்டுகளாக ஒரே குடும்பத்தில் நீடித்த ஆலயப் பணியாளர் பொறுப்பையும், புனித தேவசகாயத்தின் திருஎச்சப் பேழையை எழுதியவருக்குக் காட்டி, தலைப்பாகையையும் விலங்குகளையும் அவர் பரிசோதிக்க அனுமதித்ததையும் அதே பக்கங்கள் பதிவு செய்கின்றன. புனிதர் பட்ட நடவடிக்கை தொடங்குவதற்கு முப்பத்துமூன்று ஆண்டுகள் முன்பு, கட்டிடத்திற்குள்ளேயே நின்ற வெளியார் ஒருவரின் நேரடிச் சாட்சியம்.`,
      },
      {
        id: "etudes_1889",
        author: "Anonymous, in Études religieuses",
        title: "“Voyage à la Côte de Pêcherie”",
        detail: "Paris: Études, vol. 46, 1889 — pp. 619–623",
        note: "The French original of the account printed in English as The Month's “A Visit to the Pearl Fishery Coast”. One witness in two languages, not two witnesses — both are cited so that a reader may open whichever they can read.",
        noteTa: `The Month இதழில் “A Visit to the Pearl Fishery Coast” என ஆங்கிலத்தில் வெளிவந்த அதே பதிவின் பிரெஞ்சு மூலம். இரண்டு சாட்சிகள் அல்ல — ஒரே சாட்சி இரு மொழிகளில். வாசிப்பவர் தம்மால் வாசிக்க முடிந்ததைத் திறந்துகொள்ளட்டும் என்பதற்காகவே இரண்டையும் மேற்கோள் காட்டுகிறோம்.`,
      },
      {
        id: "agur_1903",
        author: "C. M. Agur",
        title: "Church History of Travancore",
        detail: "Madras: SPS Press, 1903 — pp. 281, 317",
        note: "A church history written from outside the Catholic tradition, and therefore worth more than a friendly source. It records the Assumption festival at this church “where several inhabitants of Malabar are accustomed to go annually” — the pilgrimage from the Kerala side, documented generations before any modern account of it. And it gives the words of Devasahayam Pillai at his baptism here, when the priest hesitated: “There is no cause for delay. This is no compulsory baptism… I shall even give up my life to maintain the Truth of which I received the light and of which I am convinced.”",
        noteTa: `கத்தோலிக்க மரபுக்கு வெளியிலிருந்து எழுதப்பட்ட ஒரு திருச்சபை வரலாறு; அதனாலேயே நட்பான ஒரு மூலத்தைவிட இது மதிப்புமிக்கது. இவ்வாலயத்தின் விண்ணேற்பு மாதா திருவிழாவை — “மலபாரின் பலரும் ஆண்டுதோறும் செல்வது வழக்கமான இடம்” என்று — இது பதிவு செய்கிறது; கேரளப் பக்கத்திலிருந்து வரும் அத்திருப்பயணம், அதைப் பற்றிய எந்த நவீன விவரிப்புக்கும் தலைமுறைகள் முன்பே ஆவணப்படுத்தப்பட்டுள்ளது. இங்கே தமது திருமுழுக்கின்போது அருட்தந்தை தயங்கியபோது தேவசகாயம் பிள்ளை சொன்ன வார்த்தைகளையும் இது தருகிறது: “தாமதிப்பதற்குக் காரணமே இல்லை. இது கட்டாயத் திருமுழுக்கு அல்ல… எதன் ஒளியை நான் பெற்றேனோ, எதைக் குறித்து நான் உறுதி கொண்டேனோ, அந்த உண்மையைக் காப்பாற்ற என் உயிரையும் நான் தருவேன்.”`,
      },
      {
        id: "molony_1926",
        author: "Sir J. C. Molony",
        title: "A Book of South India",
        detail: "London: Methuen, 1926 — p. 128",
        note: "The district Collector's own account of coming to Vadakkankulam to find the parish priest, Fr Adrien Caussanel, whose reputation in the Collector's office was that of a man “who mocked at Authority”. Molony sets out to track “the dragon” to his lair and finds instead a man living on milk, who cooked a meal for his visitor and watched him eat it, and who was doctor to his people as much as priest. Still in copyright: quoted, not reproduced.",
        noteTa: `பங்குத் தந்தை அருட்தந்தை அத்ரியன் கௌசானல் அவர்களைத் தேடி வடக்கன்குளத்திற்கு வந்ததை மாவட்ட ஆட்சியரே எழுதிய பதிவு; ஆட்சியர் அலுவலகத்தில் அவருக்கு இருந்த பெயர், “அதிகாரத்தைக் கேலி செய்பவர்” என்பதே. அந்த “வலுசர்ப்பத்தை” அதன் குகைவரை துரத்திச் செல்லப் புறப்பட்ட மாலனி, அங்கே கண்டதோ பாலை மட்டுமே உண்டு வாழ்ந்த ஒருவரை — வந்தவருக்குத் தாமே சமைத்துப் பரிமாறி, அவர் உண்பதைப் பார்த்துக்கொண்டிருந்தவரை; குருவாக இருந்த அளவுக்கே தம் மக்களுக்கு மருத்துவராகவும் இருந்தவரை. இன்னும் பதிப்புரிமையில் உள்ளது: மேற்கோள் காட்டுகிறோம், மறுபதிப்புச் செய்வதில்லை.`,
      },
      {
        id: "stuart_manual_1879",
        author: "A. J. Stuart",
        title: "A Manual of the Tinnevelly District",
        detail: "Madras: Government Press, 1879 — p. 62",
        note: "A British district manual, written with no interest in the parish, which records a convent of native nuns at Vadakkankulam by about 1864. Outside evidence that the women's religious life of this town is older than any of our own books claim.",
        noteTa: `இப்பங்கில் எந்த அக்கறையும் இல்லாமல் எழுதப்பட்ட ஒரு பிரிட்டிஷ் மாவட்டக் கையேடு; சுமார் 1864-ஆம் ஆண்டளவில் வடக்கன்குளத்தில் நாட்டு அருட்சகோதரிகளின் மடம் ஒன்று இருந்ததைப் பதிவு செய்கிறது. இவ்வூரின் பெண்களின் துறவற வாழ்வு, நமது சொந்த நூல்கள் எதுவும் சொல்வதைவிடப் பழமையானது என்பதற்கு வெளியிலிருந்து கிடைக்கும் சான்று.`,
        url: "https://archive.org/details/manualoftinnevel00stuarich",
      },
      {
        id: "cms_intelligencer_1880",
        author: "Church Missionary Society",
        title: "The Church Missionary Intelligencer and Record, vol. V",
        detail: "London: Church Missionary House, August 1880, pp. 512–513",
        note: "The obituary of the Rev. John Bilderbeck (1809–1880) — the son of the European family the parish's 1803 account places at Vadakkankulam. A Protestant missionary journal, with no reason at all to flatter a Catholic shrine, records that he was “born in India… of a Roman Catholic family, and trained for the priesthood of that Church”. The outside record's own confirmation that the Bilderbecks were real, Catholic, and had raised their son for the Church.",
        noteTa: `வண. ஜான் பில்டர்பெக் (1809–1880) அவர்களின் இரங்கல் குறிப்பு — பங்கின் 1803 பதிவு வடக்கன்குளத்தில் இருந்ததாகச் சொல்லும் அந்த ஐரோப்பியக் குடும்பத்தின் மகன். ஒரு கத்தோலிக்கத் திருத்தலத்தை முகஸ்துதி செய்ய எந்தக் காரணமும் இல்லாத ஒரு சீர்திருத்தத் திருச்சபை மறைப்பணி இதழ், அவர் “இந்தியாவில் பிறந்தவர்… ஒரு உரோமைக் கத்தோலிக்கக் குடும்பத்தைச் சேர்ந்தவர்; அத்திருச்சபையின் குருத்துவத்திற்காகப் பயிற்றுவிக்கப்பட்டவர்” என்று பதிவு செய்கிறது. பில்டர்பெக் குடும்பம் உண்மையிலேயே இருந்தது, கத்தோலிக்கக் குடும்பமாக இருந்தது, தன் மகனைத் திருச்சபைக்கென வளர்த்தது என்பதற்கு வெளியுலகப் பதிவே தரும் உறுதிப்பாடு.`,
        url: "https://archive.org/details/1880TheChurchMissionaryIntelligencer",
      },
      {
        id: "badley_directory_1886",
        author: "B. H. Badley",
        title: "Indian Missionary Directory and Memorial Volume",
        detail: "Calcutta: Methodist Publishing House, 1886 — p. 37",
        note: "A Methodist reference work, written for missionaries by missionaries: “John Bilderbeck. B. in 1809 in I[ndia]. Was a Roman Catholic.” One line, and it carries the two facts this site cites it for — the birth year of the Bilderbecks' son, six years after the weeping, and the family's Catholicism.",
        noteTa: `மறைப்பணியாளர்களுக்காக மறைப்பணியாளர்களாலேயே எழுதப்பட்ட ஒரு மெதடிஸ்ட் கையேடு: “John Bilderbeck. B. in 1809 in I[ndia]. Was a Roman Catholic.” — “ஜான் பில்டர்பெக். 1809-ல் இந்தியாவில் பிறந்தார். உரோமைக் கத்தோலிக்கராக இருந்தார்.” ஒரே ஒரு வரி; ஆயினும் இத்தளம் இதை மேற்கோள் காட்டும் இரு செய்திகளையும் அது தாங்குகிறது — பில்டர்பெக் குடும்பத்து மகனின் பிறப்பாண்டு, அதாவது அன்னை கண்ணீர் சிந்திய நிகழ்வுக்கு ஆறு ஆண்டுகளுக்குப் பின்; மற்றும் அக்குடும்பத்தின் கத்தோலிக்க விசுவாசம்.`,
        url: "https://archive.org/details/indianmissionary00badl",
      },
      {
        id: "catholic_directory_1924",
        title: "The Catholic Directory of India, 1924",
        detail: "Diocese of Tuticorin, pp. 173–174",
        note: "The parish counted, two years after the diocese was erected: “Vadakankulam… Cath. 4,765, vills. 17: Churches: brick 1, clay 4.”",
        noteTa: `மறைமாவட்டம் நிறுவப்பட்ட இரண்டு ஆண்டுகளுக்குப் பின், இப்பங்கு எண்ணப்பட்டது: “Vadakankulam… Cath. 4,765, vills. 17: Churches: brick 1, clay 4.” — கத்தோலிக்கர் 4,765; ஊர்கள் 17; ஆலயங்கள்: செங்கல் 1, மண் 4.`,
        archiveOnly: true,
      },
      {
        id: "census_2011",
        title: "Census of India 2011 — Vadakkankulam Census Town",
        detail: "Town code 643090",
        note: "Population 9,220; literacy 94.28%.",
        noteTa: `மக்கள்தொகை 9,220; எழுத்தறிவு 94.28%.`,
        url: "https://www.census2011.co.in/data/town/643090-vaddakkankulam-tamil-nadu.html",
      },
      {
        id: "maalaimalar_2022",
        title: "மாலைமலர் — the Perunkoor festival at Vadakkankulam",
        detail: "Maalaimalar, a major Tamil daily — 5 August 2022",
        note: "The one witness we have to the living cult of this shrine who is neither the parish nor the diocese. A newspaper, covering the feast as news: the chariot goes out at about one in the morning on 15 August, and something close to a lakh of pilgrims come out for it, many of them crossing over from Kerala. The site has been making that claim for a while with no source a reader could check; this is the source. It should be read for what it is — a reporter's estimate of a night-time crowd, not a count — but it is an estimate made by someone with no reason to flatter us, and on the size of the festival it is the only outside witness in this whole bibliography.",
        noteTa: `இத்திருத்தலத்தின் உயிர்ப்புள்ள பக்தி வாழ்வுக்கு நம்மிடம் உள்ள ஒரே சாட்சி; பங்கும் அல்ல, மறைமாவட்டமும் அல்ல. திருவிழாவைச் செய்தியாக அளிக்கும் ஒரு நாளிதழ்: ஆகஸ்ட் 15 அன்று அதிகாலை ஒரு மணியளவில் தேர் புறப்படுகிறது; அதற்காக ஒரு லட்சத்திற்கு அண்மையான பக்தர்கள் திரள்கிறார்கள்; அவர்களுள் பலர் கேரளத்திலிருந்து எல்லை கடந்து வருபவர்கள். இத்தளம் நெடுங்காலமாக அச்செய்தியைச் சொல்லிவந்தது — வாசிப்பவர் சரிபார்க்கக்கூடிய எந்த மூலமும் இல்லாமல். இதுவே அந்த மூலம். இது எதுவோ அதுவாகவே வாசிக்கப்பட வேண்டும் — இரவுநேரக் கூட்டத்தைப் பற்றிய ஒரு செய்தியாளரின் மதிப்பீடு; எண்ணிக்கை அல்ல — ஆயினும் நம்மை முகஸ்துதி செய்ய எந்தக் காரணமும் இல்லாத ஒருவர் செய்த மதிப்பீடு அது; திருவிழாவின் அளவைப் பொறுத்தவரை, இந்நூற்பட்டியல் முழுவதிலும் இதுவே ஒரே வெளிச் சாட்சி.`,
        url: "https://www.maalaimalar.com/devotional/worship/paraloga-matha-church-festival-on-tomorrow-495666",
      },
    ],
  },
  {
    heading: "The printed histories of the Madurai Mission",
    headingTa: `மதுரைப் பணிக்களத்தின் அச்சிடப்பட்ட வரலாறுகள்`,
    items: [
      {
        id: "besse_1914",
        author: "Léon Besse, S.J.",
        title: "La Mission du Maduré : Historique de ses Pangous",
        detail: "Trichinopoly, 1914 — xvi + 749 pp.",
        note: "The printed source to which every later account of this parish — including the 1803 tradition — ultimately traces. We have looked for it hard: it is absent from archive.org, its OpenLibrary record carries no scan, HathiTrust returns nothing for either its OCLC or its LCCN, and the Bibliothèque nationale has not digitised its own copy. Four physical copies are known (Paris, Canberra, Toulouse, Shembaganur) and no one on this project has opened any of them. We also went looking for a rival witness and found none: the one candidate — a passage the parish's own notes place at Auguste Jean, vol. II, p. 129 — turns out to be a page about a college at Negapatam. The year 1803 does not appear anywhere in Jean's two volumes, and it could not: his first volume ends at the suppression and his second begins at the restoration, so 1803 falls in the gap between them. Besse is the one witness, and we say so.",
        noteTa: `இப்பங்கைப் பற்றிய பிற்காலப் பதிவுகள் அனைத்தும் — 1803 மரபு உட்பட — இறுதியில் சென்று சேரும் அச்சு மூலம். இதைக் கடுமையாகத் தேடினோம்: archive.org-இல் இது இல்லை; OpenLibrary பதிவில் எந்த மின்படியும் இணைக்கப்படவில்லை; அதன் OCLC எண்ணுக்கும் LCCN எண்ணுக்கும் HathiTrust எதையும் தருவதில்லை; பிரான்சின் தேசிய நூலகம் தன் சொந்தப் படியை இன்னும் மின்வடிவமாக்கவில்லை. நான்கு நேரடிப் படிகள் இருப்பது தெரியும் (பாரிஸ், கான்பெரா, தூலூஸ், சேம்பகனூர்); அவற்றுள் ஒன்றைக்கூட இப்பணியில் உள்ள எவரும் திறந்ததில்லை. போட்டியான ஒரு சாட்சியையும் தேடிப் பார்த்தோம்; எதுவும் கிடைக்கவில்லை: பங்கின் சொந்தக் குறிப்புகள் அகுஸ்த் ஜான், தொகுதி II, பக். 129 என்று சுட்டும் அந்த ஒரே வாய்ப்பு, நாகப்பட்டினத்தில் இருந்த ஒரு கல்லூரியைப் பற்றிய பக்கமாகவே இருக்கிறது. ஜான் அவர்களின் இரு தொகுதிகளிலும் 1803-ஆம் ஆண்டு எங்கும் வரவில்லை; வரவும் முடியாது: அவரது முதல் தொகுதி இயேசு சபை ஒழிக்கப்பட்டதோடு முடிகிறது, இரண்டாம் தொகுதி அது மீண்டும் நிறுவப்பட்டதிலிருந்து தொடங்குகிறது; 1803 அவ்விரண்டுக்கும் இடையிலான இடைவெளியில் விழுகிறது. பெஸ் ஒருவரே சாட்சி; அதை நாம் வெளிப்படையாகவே சொல்கிறோம்.`,
        archiveOnly: true,
      },
      {
        id: "besse_moumas_typescript",
        author: "Léon Besse, S.J. — English translation by Fr Moumas, S.J.",
        title: "New Madurai Mission: Madurai Mission Southern District, Vol. IV (1715–1913)",
        detail: "Typescript, c.1970s–80s — the parish library's own copy, accession 215 (= JEMPARC Shembaganur, Book 95)",
        note: "Besse's book, at last, in a form we can read. The entry above says no one on this project had opened it; that stopped being true in July 2026, when seven pages of the Vadakkankulam chapter (pp. 805–844) of the parish's own English typescript were photographed and transcribed. It is Besse's text, so we read it as Besse and not as the parish — but we read his hedges too. Where he writes that the church's builder “is said to be” de Britto, he is recording a tradition, not asserting a fact, and we do not promote him past what he claims; two sentences later he draws the line himself — “Here tradition is met with historic documents” — and only then produces the Annual Letter of 1701. What he does give flatly, from the mission's records, is the village's origin as a staging post between two kingdoms and the 1713 statistics the parish has quoted ever since. The translation is an unpublished internal document: we quote it and never reproduce it.",
        noteTa: `பெஸ்ஸின் நூல், இறுதியில், நம்மால் வாசிக்கக்கூடிய ஒரு வடிவத்தில். இப்பணியில் எவரும் அதைத் திறந்ததில்லை என்று மேலே உள்ள பதிவு சொல்கிறது; 2026 ஜூலையில் அது உண்மையாக இல்லாமல் போயிற்று — பங்கின் சொந்த ஆங்கிலத் தட்டச்சுப் பிரதியில் உள்ள வடக்கன்குளம் அத்தியாயத்திலிருந்து (பக். 805–844) ஏழு பக்கங்கள் புகைப்படம் எடுக்கப்பட்டு எழுத்தில் பெயர்க்கப்பட்டன. இது பெஸ்ஸின் எழுத்து; எனவே அதைப் பங்கின் குரலாக அல்ல, பெஸ்ஸின் குரலாகவே வாசிக்கிறோம் — ஆனால் அவரது தயக்கங்களையும் சேர்த்தே வாசிக்கிறோம். ஆலயத்தைக் கட்டியவர் புனித அருளானந்தர் “என்று சொல்லப்படுகிறது” என்று அவர் எழுதும்போது, அவர் ஒரு மரபைப் பதிவு செய்கிறாரே தவிர, ஒரு செய்தியை உறுதியாக அறிவிக்கவில்லை; அவர் கூறுவதற்கு மேல் நாம் அவரை உயர்த்துவதில்லை. இரண்டே வாக்கியங்களுக்குப் பின் அவரே எல்லையை வரைந்துவிடுகிறார் — “இங்கே மரபு வரலாற்று ஆவணங்களைச் சந்திக்கிறது” — அதன் பின்னரே 1701-ஆம் ஆண்டின் ஆண்டறிக்கையை அவர் முன்வைக்கிறார். பணிக்களத்தின் பதிவேடுகளிலிருந்து அவர் தயக்கமின்றித் தருவது இரண்டு: இரு அரசுகளுக்கு இடையிலான ஓர் இடைத்தங்கல் ஊராக இவ்வூர் தோன்றியது என்பதும், அன்று முதல் பங்கு மேற்கோள் காட்டி வரும் 1713-ஆம் ஆண்டுப் புள்ளிவிவரங்களும். இம்மொழிபெயர்ப்பு வெளியிடப்படாத ஓர் அகப் பயன்பாட்டு ஆவணம்: அதை நாம் மேற்கோள் காட்டுகிறோம்; ஒருபோதும் மறுபதிப்புச் செய்வதில்லை.`,
        archiveOnly: true,
      },
      {
        id: "besse_beschi_1918",
        author: "Léon Besse, S.J.",
        title: "Father Beschi of the Society of Jesus: His Times and His Writings",
        detail: "Trichinopoly: St Joseph's Industrial School Press, 1918 — 250 pp.; pp. 42 (and n. 1), 49, 51",
        note: "The same Besse as the entry above, on the same mission, and the closest thing we can read to his un-obtainable 1914 history. It carries this parish twice. First, the profession of 28 October 1714: Beschi made his four vows to “Father Broglias Antony Brandolini, his neighbour in the district of Vadakenkulam” — and Besse then declines to say where. “We are not told, whether at Gurukelpatti itself, or at Vadakenkulam.” His footnote is the oldest printed statement of the parish's own claim: “According to a local tradition Fr. Beschi took his last vows at Vadakenkulam.” Second, at pp. 49–51, he prints Brandolini's own first-person letter, written from this village in 1714 — the only inside view of Vadakkankulam in that year anywhere in this library, and the one that independently places the priest's own catechist here, exactly as the tradition describes. Note the layer: the words “in the district of Vadakenkulam” are Besse's editorial identification as Mission Superior, not Beschi's; Beschi's own letter says only “my nearest confrère in the mission”. The book has no text layer and was read through our own OCR of the Tamil Digital Library scan.",
        noteTa: `மேலே உள்ள பதிவின் அதே பெஸ், அதே பணிக்களத்தைப் பற்றி எழுதிய நூல் — கிடைக்காமல் போன அவரது 1914 வரலாற்றுக்கு மிக அருகில் நம்மால் சென்று வாசிக்க முடிந்தது இதுவே. இப்பங்கை இது இரு இடங்களில் சுமக்கிறது. முதலில், 1714 அக்டோபர் 28-ஆம் நாளின் வார்த்தைப்பாடு: “வடக்கன்குளம் மாவட்டத்தில் இருந்த அவரது அண்டையாரான அருட்தந்தை புரோலியாஸ் அந்தோணி பிராந்தொலினி” அவர்களிடம் பெஸ்கி தமது நான்கு வார்த்தைப்பாடுகளை உரைத்தார் — ஆனால் அது எங்கே நிகழ்ந்தது என்பதைச் சொல்ல பெஸ் முன்வரவில்லை: “அது குருக்கள்பட்டியிலா, வடக்கன்குளத்திலா என்பது நமக்குச் சொல்லப்படவில்லை.” அவரது அடிக்குறிப்பே, இப்பங்கின் சொந்த மரபு அச்சில் ஏறிய மிகப் பழைய இடம்: “ஒரு நாட்டுப்புற மரபின்படி, அருட்தந்தை பெஸ்கி தமது இறுதி வார்த்தைப்பாட்டை வடக்கன்குளத்தில் செய்தார்.” அடுத்து, பக். 49–51-இல், 1714-ஆம் ஆண்டு இவ்வூரிலிருந்தே பிராந்தொலினி தன்னிலையில் எழுதிய கடிதம் இந்நூலில் அச்சாகியுள்ளது — அவ்வாண்டின் வடக்கன்குளத்தை உள்ளிருந்து காட்டும் ஒரே பதிவு இந்நூலகம் முழுவதிலும் இதுவேதான்; மரபு சொல்வதைப்போலவே, அருட்தந்தையின் சொந்த மறைக்கல்வியாளர் இங்கே இருந்தார் என்பதைத் தனித்து உறுதிப்படுத்துவதும் இதுவே. ஓர் அடுக்கை மட்டும் பிரித்துப் பார்க்க வேண்டும்: “வடக்கன்குளம் மாவட்டத்தில்” என்னும் சொற்கள் பணிக்களத் தலைவராக பெஸ்ஸே சேர்த்த அடையாளம், பெஸ்கியுடையவை அல்ல; பெஸ்கியின் கடிதம் “பணிக்களத்தில் எனக்கு மிக அண்மையான உடன்சகோதரர்” என்று மட்டுமே சொல்கிறது. இந்நூலின் மின்படியில் எழுத்து அடுக்கே இல்லை; தமிழ் இணைய நூலகப் படியை நாமே OCR செய்துதான் வாசித்தோம்.`,
        archiveOnly: true,
      },
      {
        id: "ferroli_1951",
        author: "D. Ferroli, S.J.",
        title: "The Jesuits in Malabar",
        detail: "2 vols., Bangalore, 1939–1951 — vol. II, p. 354",
        note: "Prints, from Fr Bernard de Saa's own letter of 14 October 1713, the ordeal the parish's first resident priest lived through: dragged from a sick-bed by men who were sure he was hiding money, beaten until “all his teeth had been knocked out”, expelled from the district, and restored to the village only after Fr Laynez appealed to Mangammal, the queen-regent of Madurai. Fr Pierre Martin, seeing him in June 1700, is the eyewitness. Still in copyright: we quote it and do not reproduce the page.",
        noteTa: `1713 அக்டோபர் 14 அன்று அருட்தந்தை பெர்னார்ட் தெ சா அவர்களே எழுதிய கடிதத்திலிருந்து, இப்பங்கின் முதல் நிரந்தரக் குருவானவர் கடந்து வந்த கொடுமையை இந்நூல் அச்சிடுகிறது: அவர் பணத்தை மறைத்து வைத்திருக்கிறார் என்று உறுதியாக நம்பியவர்களால் நோய்ப்படுக்கையிலிருந்தே இழுத்துச் செல்லப்பட்டு, “அவரது பற்கள் அனைத்தும் உடைந்து விழும்” அளவுக்கு அடிக்கப்பட்டு, மாவட்டத்தை விட்டே விரட்டப்பட்டார்; மதுரையின் ஆட்சிப் பொறுப்பேற்றிருந்த அரசி மங்கம்மாளிடம் அருட்தந்தை லெய்னஸ் முறையிட்ட பின்னரே அவர் ஊருக்குத் திரும்பக் கொணரப்பட்டார். 1700 ஜூன் மாதம் அவரைக் கண்ட அருட்தந்தை பியேர் மார்ட்டின் அவர்களே நேரடிச் சாட்சி. இன்னும் பதிப்புரிமையில் உள்ளது: மேற்கோள் காட்டுகிறோம்; அப்பக்கத்தை மறுபதிப்புச் செய்வதில்லை.`,
        archiveOnly: true,
      },
      {
        id: "auguste_jean_1894",
        author: "Auguste Jean, S.J.",
        title: "Le Maduré : l'ancienne et la nouvelle mission",
        detail: "Paris/Bruges, 1894",
        note: "The richest French source on the priests who served here; it calls Fr Joseph Grégoire “l'apôtre de Vadakenkoulam”, and describes the church as built “in the form of an open compass”. It is also the earliest printed witness that this church holds “a part of his garment and the chains with which he was bound” — St Devasahayam's relics (vol. I, p. 203). Note that vol. I carries a misprint giving St Devasahayam's martyrdom as 1742; the correct date is 14 January 1752.",
        noteTa: `இங்கே பணியாற்றிய அருட்தந்தையரைப் பற்றிய மிகச் செழுமையான பிரெஞ்சு மூலம்; அருட்தந்தை ஜோசப் கிரகோயர் அவர்களை இது “l'apôtre de Vadakenkoulam” — வடக்கன்குளத்தின் அப்போஸ்தலர் — என்று அழைக்கிறது; ஆலயம் “திறந்த கவராயத்தின் வடிவில்” கட்டப்பட்டதாக விவரிக்கிறது. புனித தேவசகாயத்தின் திருஎச்சங்களை — “அவரது ஆடையின் ஒரு பகுதியையும், அவரைப் பிணைத்திருந்த விலங்குகளையும்” — இவ்வாலயம் வைத்திருப்பதாகச் சொல்லும் மிகப் பழைய அச்சுச் சாட்சியும் இதுவே (தொகுதி I, பக். 203). தொகுதி I-இல் ஓர் அச்சுப் பிழை உள்ளது என்பதைக் கவனத்தில் கொள்ளுங்கள்: புனித தேவசகாயத்தின் இரத்தசாட்சிய ஆண்டு 1742 எனத் தரப்பட்டுள்ளது; சரியான நாள் 1752 ஜனவரி 14.`,
        url: "https://archive.org/details/lemadurlancienne01jean",
      },
      {
        id: "katholische_missionen_1885",
        author: "Die Katholischen Missionen",
        title: "Die Katholischen Missionen, March 1885",
        detail: "Freiburg im Breisgau, March 1885, p. 68",
        note: "A German Catholic missionary monthly, thirteen years after the church was blessed, printing the motto of this building in full — the only witness to it outside the parish’s own books. It gives the Latin distich and a German verse rendering beneath it, and it places the inscription at the altar. It also corrects the parish transcription: where the parish books have the un-Latin “tribulis ingemnis”, the 1885 text reads “tribubus geminis”.",
        noteTa: `ஆலயம் ஆசீர்வதிக்கப்பட்டுப் பதின்மூன்று ஆண்டுகளுக்குப் பின், இக்கட்டிடத்தின் குறிக்கோள் வாசகத்தை முழுமையாக அச்சிட்ட ஒரு ஜெர்மன் கத்தோலிக்க மறைப்பணி மாத இதழ் — பங்கின் சொந்த நூல்களுக்கு வெளியே அதற்கு உள்ள ஒரே சாட்சி. இலத்தீன் ஈரடியையும், அதன் கீழ் ஒரு ஜெர்மன் செய்யுள் மொழிபெயர்ப்பையும் இது தருகிறது; அவ்வெழுத்து பலிபீடத்தில் இருப்பதாகக் குறிக்கிறது. பங்கின் எழுத்துப் பிரதியையும் இது திருத்துகிறது: பங்கு நூல்களில் இலத்தீனுக்கே பொருந்தாத “tribulis ingemnis” என்று இருப்பது, 1885-ஆம் ஆண்டு உரையில் “tribubus geminis” என்று வருகிறது.`,
        url: "https://archive.org/details/diekatholischenm1885unse",
      },
      {
        id: "canoz_biography_1891",
        author: "Anonymous (Jesuit of the Madurai mission)",
        title: "Monseigneur Alexis Canoz, premier évêque de Trichinopoly",
        detail: "Paris: Imprimerie D. Dumoulin, 1891, p. 293",
        note: "The life of the bishop who blessed both the foundation stone and the finished church, and the only source that puts a figure on what the building cost anyone: Canoz approved the plan and then, “for eighteen years, gave at least two thousand francs a year for its construction”. It also dates the acceptance of the plan to 1854, a year before the stone, and records that when he came back on 29 June 1872 it was to keep the feast of the Holy Apostles and the twenty-fifth anniversary of his own consecration in this church.",
        noteTa: `அடிக்கல்லையும் நிறைவுற்ற ஆலயத்தையும் ஆசீர்வதித்த ஆயரின் வாழ்க்கை வரலாறு; இக்கட்டிடம் யாருக்கு எவ்வளவு செலவானது என்பதற்கு ஓர் எண்ணைத் தரும் ஒரே மூலமும் இதுவே: கனோஸ் அத்திட்டத்திற்கு ஒப்புதல் அளித்தார்; பின்னர், “பதினெட்டு ஆண்டுகளாக, அதன் கட்டுமானத்திற்காக ஆண்டுக்குக் குறைந்தது இரண்டாயிரம் ஃபிராங்குகள் தந்தார்.” திட்டம் ஏற்கப்பட்ட ஆண்டையும் — அடிக்கல்லுக்கு ஓராண்டு முன்பான 1854 என்று — இது குறிக்கிறது; மேலும், 1872 ஜூன் 29 அன்று அவர் திரும்பி வந்தது புனித திருத்தூதர்களின் திருவிழாவையும், இவ்வாலயத்தில் தமது ஆயர் அபிஷேகத்தின் இருபத்தைந்தாம் ஆண்டு நிறைவையும் கொண்டாடுவதற்கே என்று பதிவு செய்கிறது.`,
        url: "https://archive.org/details/monseigneuralexi00unse",
      },
      {
        id: "canoz_letter_1849",
        author: "Bishop Alexis Canoz, S.J.",
        title: "Letter on the visitation of 1848",
        detail: "Trichinopoly, March 1849 — printed in Bertrand, Lettres édifiantes…, vol. I, p. 250",
        note: "The bishop who blessed both the foundation stone of this church in 1855 and the finished church in 1872, writing in his own hand about the village seven years before the stone was laid. Coming back into his mission from Malabar he re-entered it here, and set the place down as “Vadakencoulam, a great and good Christian community, of which I made the visitation”. The same letter gives the scale of that year — on the road since January, more than twelve thousand confirmed, some twenty thousand confessions — and records that Fr Joseph Grégoire, who would spend seventeen years building the great church, rode in his party throughout.",
        noteTa: `1855-ல் இவ்வாலயத்தின் அடிக்கல்லையும், 1872-ல் நிறைவுற்ற ஆலயத்தையும் ஆசீர்வதித்த ஆயர், அடிக்கல் இடப்படுவதற்கு ஏழு ஆண்டுகள் முன்பு, இவ்வூரைப் பற்றித் தமது சொந்தக் கையால் எழுதியது. மலபாரிலிருந்து தமது பணிக்களத்திற்குத் திரும்பியபோது அவர் இவ்வழியாகவே உள்ளே நுழைந்தார்; இவ்விடத்தை “வடக்கன்குளம் — பெரியதும் நல்லதுமான ஒரு கிறிஸ்தவ சமூகம்; அதற்கு நான் மேய்ப்பு வருகை செய்தேன்” என்று குறித்து வைத்தார். அவ்வாண்டின் அளவையும் அதே கடிதம் தருகிறது — ஜனவரி முதல் பயணத்தில்; பன்னிரண்டாயிரத்திற்கும் மேற்பட்டோருக்கு உறுதிபூசுதல்; ஏறத்தாழ இருபதாயிரம் பாவசங்கீர்த்தனங்கள் — மேலும், பெரிய ஆலயத்தைக் கட்டப் பதினேழு ஆண்டுகளைச் செலவிடப்போகிற அருட்தந்தை ஜோசப் கிரகோயர் அப்பயணக் குழுவில் தொடக்கம் முதல் இறுதிவரை உடன் சென்றார் என்றும் பதிவு செய்கிறது.`,
        url: "https://archive.org/details/lettresdifiante00bertgoog",
      },
      {
        id: "bertrand_lettres_1865",
        author: "Joseph Bertrand, S.J.",
        title: "Lettres édifiantes et curieuses de la nouvelle mission du Maduré",
        detail: "2 vols., 1865",
        note: "Records that Fr Buttari “laid the foundations of its present church” here, and that Fr Thomassin completed it — the earliest independent attribution of the first stone church. It also preserves the fact that before the Holy Family dedication of 1872, the patron and titular of this church was St Francis Xavier, kept with a December novena and feast.",
        noteTa: `அருட்தந்தை புத்தாரி இங்கே “இப்போதைய ஆலயத்தின் அடித்தளங்களை இட்டார்” என்றும், அருட்தந்தை தோமஸினி அதை நிறைவு செய்தார் என்றும் இது பதிவு செய்கிறது — முதல் கல் ஆலயத்தை ஒருவருக்குச் சாற்றும் மிகப் பழைய தனிச் சான்று. 1872-ஆம் ஆண்டின் திருக்குடும்ப அர்ப்பணத்திற்கு முன், இவ்வாலயத்தின் பாதுகாவலரும் பட்டப்பெயருக்கு உரியவரும் புனித சவேரியாரே என்பதையும், டிசம்பர் நவநாளோடும் திருவிழாவோடும் அது கொண்டாடப்பட்டது என்பதையும் இது காத்து வைத்திருக்கிறது.`,
        url: "https://archive.org/details/lettresdifiante00bertgoog",
      },
      {
        id: "bertrand_1847",
        author: "Joseph Bertrand, S.J.",
        title: "La mission du Maduré d'après des documents inédits",
        detail: "4 vols., Lyon/Paris, 1847–1854 — esp. vol. IV, pp. 100n, 345–346, 382–398",
        note: "Records the baptism and passion of Devasahayam from the mission's own papers — a century before any canonisation dossier existed. With Auguste Jean, the earliest printed witness that the baptism happened here. Volume IV carries this parish across more than the passion pages long cited for it: Fr Borghese \"at the head of the district of Vadakencoulam\" in the annual letter of 1709 (p.100n); a missionary's first-person relation from inside \"the church of Vadakencoulam where I then was\" in 1714–16, with Beschi in the next district (pp.345–346); the 1745 persecution of that church and the nabab \"who honoured [Buttari] with his friendship\" (pp.385–386); and the baptism, passion and burial at Kottar of Devasahayam (pp.386–398). It does NOT record the 1803 weeping — that is Dessal (1905) and Besse (1914), not Bertrand.",
        noteTa: `எந்தப் புனிதர் பட்ட ஆவணத் தொகுப்பும் உருவாவதற்கு ஒரு நூற்றாண்டு முன்பே, பணிக்களத்தின் சொந்த ஆவணங்களிலிருந்து தேவசகாயத்தின் திருமுழுக்கையும் பாடுகளையும் இது பதிவு செய்கிறது. அகுஸ்த் ஜான் அவர்களோடு சேர்ந்து, அத்திருமுழுக்கு இங்கே நிகழ்ந்தது என்பதற்கு உள்ள மிகப் பழைய அச்சுச் சாட்சி. நெடுங்காலமாக மேற்கோள் காட்டப்பட்டுவரும் பாடுகளின் பக்கங்களைத் தாண்டியும் தொகுதி IV இப்பங்கைச் சுமக்கிறது: 1709-ஆம் ஆண்டு ஆண்டறிக்கையில் “வடக்கன்குளக் கோட்டத்தின் தலைவராக” அருட்தந்தை போர்கேசே (பக். 100, அடிக்குறிப்பு); 1714–16-இல், “நான் அப்போது இருந்த வடக்கன்குளத்து ஆலயத்தின் உள்ளிருந்து” ஒரு மறைப்பணியாளர் தன்னிலையில் எழுதிய பதிவு — அடுத்த கோட்டத்தில் பெசுகி இருந்தார் (பக். 345–346); 1745-ல் அவ்வாலயத்தின்மேல் நிகழ்ந்த துன்புறுத்தலும், “[புத்தாரியைத்] தமது நட்பால் சிறப்பித்த” நவாபும் (பக். 385–386); தேவசகாயத்தின் திருமுழுக்கு, பாடுகள், கோட்டாற்றில் அவரது அடக்கம் (பக். 386–398). 1803-ஆம் ஆண்டு அன்னை கண்ணீர் சிந்திய நிகழ்வை இது பதிவு செய்யவில்லை — அது தெசால் (1905), பெஸ் (1914); பெர்த்ராண்ட் அல்ல.`,
        url: "https://archive.org/details/lamissiondumadur0000unse_o9q8",
      },
      {
        id: "faber_1851",
        author: "Frederick William Faber",
        title: "The Lives of… the Ven. John de Britto, S.J.",
        detail: "London, 1851",
        note: "The earliest mainstream English life of the founder, and the book in which an English reader can still find his prison letter of 3 February 1693. That, and the martyrdom at Oriyur, is what we cite it for. It is not evidence for anything that happened in this village: Faber does not mention Vadakkankulam once, in any spelling. This note used to say he was cited for the founding acts of 1685–86, which put an English name behind a claim he never makes. The chapel and the two hundred baptisms rest on the parish's own books; Faber carries the founder, not the founding.",
        noteTa: `நிறுவனரைப் பற்றி ஆங்கிலத்தில் வெளிவந்த, பரவலாக அறியப்பட்ட மிகப் பழைய வாழ்க்கை வரலாறு; 1693 பிப்ரவரி 3-ஆம் நாளைய அவரது சிறைக் கடிதத்தை ஓர் ஆங்கில வாசகர் இன்றும் காணக்கூடிய நூல். அதற்காகவும், ஓரியூர் இரத்தசாட்சியத்திற்காகவும் மட்டுமே இதை நாம் மேற்கோள் காட்டுகிறோம். இவ்வூரில் நடந்த எதற்கும் இது சான்று அல்ல: வடக்கன்குளத்தை — எந்த எழுத்து வடிவத்திலும் — ஃபேபர் ஒரு முறைகூடக் குறிப்பிடவில்லை. 1685–86-ஆம் ஆண்டுகளின் நிறுவல் நிகழ்வுகளுக்காக இது மேற்கோள் காட்டப்படுகிறது என்று இக்குறிப்பு முன்பு சொல்லிவந்தது; அது, அவர் ஒருபோதும் சொல்லாத ஓர் உரிமைக்கோரலுக்குப் பின்னால் ஓர் ஆங்கிலப் பெயரை நிறுத்தியது. சிற்றாலயமும் இருநூறு திருமுழுக்குகளும் பங்கின் சொந்த நூல்களின்மேலேயே நிற்கின்றன; ஃபேபர் சுமப்பது நிறுவனரை, நிறுவலை அல்ல.`,
        url: "https://archive.org/details/TheLivesOfFather",
      },
      {
        id: "dessal_1902",
        author: "J.-B. Dessal, S.J.",
        title: "Le R. P. Louis Verdier, supérieur de la mission du Maduré",
        detail: "Paris, 1902",
        note: "Written by a Jesuit of the same mission. Of this church he says only that it is “unique au monde peut-être” — unique in the world, perhaps. The hedge is worth keeping: the mission's own chroniclers never claimed more than that.",
        noteTa: `அதே பணிக்களத்தைச் சேர்ந்த ஓர் இயேசு சபை அருட்தந்தையால் எழுதப்பட்டது. இவ்வாலயத்தைப் பற்றி அவர் சொல்வது இவ்வளவே: “unique au monde peut-être” — உலகிலேயே ஒரே ஒன்று, ஒருவேளை. அந்தத் தயக்கச் சொல்லைக் காப்பாற்றுவது மதிப்புடையது: பணிக்களத்தின் சொந்த வரலாற்றாசிரியர்கள் அதற்கு மேல் ஒருபோதும் உரிமை கோரியதில்லை.`,
        url: "https://archive.org/details/lervrendpr00dess",
      },
      {
        id: "dessal_gemert_1905",
        author: "J.-B. Dessal, S.J.",
        title: "Vadakencoulam — son histoire, sa merveille, son jubilé",
        detail: "Lettres de Gemert, 1905",
        note: "The earliest printed witness to the 1803 weeping — a Jesuit of this very mission, in print nine years before Besse, writing while the grandchildren of the 1803 generation still lived. He names the same witnesses (Saveri-Mouttou Pillai son of Satiavasagam Pillai, “Monsieur Birdelpech” and his daughter Henriette) and gives the same double-doored niche, the same ~11 a.m., and the 1903 centenary. He is also candid where the parish is not: he records that the Goa priest of the day was absent and that no approving ecclesiastical document exists — a caution we keep beside the parish's own account.",
        noteTa: `1803-ஆம் ஆண்டு அன்னை கண்ணீர் சிந்திய நிகழ்வுக்கு உள்ள மிகப் பழைய அச்சுச் சாட்சி — இதே பணிக்களத்தைச் சேர்ந்த ஓர் இயேசு சபை அருட்தந்தை, பெஸ்ஸுக்கு ஒன்பது ஆண்டுகள் முன்பே அச்சில், 1803-ஆம் ஆண்டுத் தலைமுறையினரின் பேரக்குழந்தைகள் இன்னும் உயிரோடு இருந்தபோதே எழுதியது. அதே சாட்சிகளையே அவரும் பெயர் சொல்லிக் குறிக்கிறார் (சத்தியவாசகம் பிள்ளையின் மகன் சவேரிமுத்துப் பிள்ளை, “மொன்சியெர் பிர்தெல்பெக்” மற்றும் அவரது மகள் ஹென்றியெட்); அதே இரட்டைக் கதவுகள் கொண்ட மாடத்தையும், அதே காலை பதினொரு மணியளவையும், 1903-ஆம் ஆண்டு நூற்றாண்டு விழாவையும் தருகிறார். பங்கு வெளிப்படையாக இல்லாத இடத்திலும் அவர் வெளிப்படையாக இருக்கிறார்: அன்றைய கோவாக் குருவானவர் ஊரில் இல்லை என்பதையும், இதற்கு ஒப்புதல் அளிக்கும் திருச்சபை ஆவணம் எதுவும் இல்லை என்பதையும் அவர் பதிவு செய்கிறார் — பங்கின் சொந்த விவரிப்புக்கு அருகிலேயே நாம் வைத்திருக்கும் ஓர் எச்சரிக்கை இது.`,
        url: "https://gallica.bnf.fr/ark:/12148/bpt6k9128178d",
      },
    ],
  },
  {
    heading: "Modern scholarship",
    headingTa: `நவீன ஆய்வு நூல்கள்`,
    items: [
      {
        id: "neill_1985",
        author: "Stephen Neill",
        title: "A History of Christianity in India: 1707–1858",
        detail: "Cambridge University Press, 1985",
        note: "The standard modern scholarly history of the period, and an outside one — cited here for the shape of the mission around this parish, not for the parish's own marvels. A correction we owe the reader, because this note carried the error for a long time: it said that Neill's footnote preserves the page reference to Besse (1914) on which our citations of Besse depend. It does not. Neill cites Besse at p. 477 — a list of the coastal stations, which does not include Vadakkankulam — and at pp. 471–2, and neither passage has anything to do with the weeping of 1803. The “p. 730” that our own citations of Besse rest on comes from the parish's own compilation, independently of Neill, and is unverified until somebody opens the book. The old note was wrong in a way that flattered us — it dressed a parish page-reference in a Cambridge footnote. Where Neill does lean on Besse, the caution behind it still holds: he and our own books can be one citation retold rather than two witnesses.",
        noteTa: `அக்காலகட்டத்தைப் பற்றிய, தரப்படுத்தப்பட்ட நவீன ஆய்வு வரலாறு; அதுவும் வெளியிலிருந்து எழுதப்பட்டது. இப்பங்கைச் சுற்றியிருந்த பணிக்களத்தின் வடிவத்திற்காக இது மேற்கோள் காட்டப்படுகிறதே தவிர, பங்கின் சொந்தப் புதுமைகளுக்காக அல்ல. வாசிப்பவருக்கு நாம் கடமைப்பட்டிருக்கும் ஒரு திருத்தம் — ஏனெனில் இக்குறிப்பு நெடுங்காலம் ஒரு பிழையைச் சுமந்து வந்தது: பெஸ்ஸை (1914) நாம் மேற்கோள் காட்டும்போது சார்ந்திருக்கும் பக்க எண்ணை நெயிலின் அடிக்குறிப்பே காத்து வைத்திருக்கிறது என்று அது சொல்லிவந்தது. இல்லை. நெயில் பெஸ்ஸை 477-ஆம் பக்கத்தில் மேற்கோள் காட்டுகிறார் — அது கடற்கரைப் பணிநிலையங்களின் பட்டியல்; அதில் வடக்கன்குளம் இல்லை — மேலும் 471–472 பக்கங்களிலும் காட்டுகிறார்; இவ்விரு இடங்களுக்கும் 1803-ஆம் ஆண்டுக் கண்ணீர் நிகழ்வோடு எந்தத் தொடர்பும் இல்லை. பெஸ் குறித்த நமது மேற்கோள்கள் நிற்கும் அந்த “பக். 730” என்பது, நெயிலைச் சாராமல், பங்கின் சொந்தத் தொகுப்பிலிருந்தே வந்தது; யாரேனும் அந்நூலைத் திறக்கும்வரை அது சரிபார்க்கப்படாததே. பழைய குறிப்பு, நமக்குச் சாதகமான ஒரு வகையில் தவறாக இருந்தது — பங்கின் ஒரு பக்கச் சுட்டிக்குக் கேம்பிரிட்ஜ் அடிக்குறிப்பின் உடையை அது உடுத்தியது. நெயில் உண்மையிலேயே பெஸ்ஸைச் சார்ந்து நிற்கும் இடங்களில், அதன் பின்னுள்ள எச்சரிக்கை இன்னும் நிற்கிறது: அவரும் நமது சொந்த நூல்களும் இரு சாட்சிகளாக அல்லாமல், ஒரே மேற்கோள் மீண்டும் சொல்லப்பட்டதாகவே இருக்கக்கூடும்.`,
        url: "https://archive.org/details/historyofchristi0000neil",
      },
      {
        id: "bayly_1989",
        author: "Susan Bayly",
        title: "Saints, Goddesses and Kings",
        detail: "Cambridge University Press, 1989 — pp. 405–406",
        note: "A scholar of South Indian religion who works from the Jesuit manuscripts at the Madura Mission Archives rather than from anything the parish published — and who says more for Santhaayi than the parish claims for her, calling her the founder of the village rather than merely its first Christian. We do not hold the volume: it is quoted here at second hand, and it is still in copyright.",
        noteTa: `பங்கு வெளியிட்ட எந்த நூலையும் சாராமல், மதுரைப் பணிக்கள ஆவணக்காப்பகத்தில் உள்ள இயேசு சபைக் கையெழுத்துப் படிகளிலிருந்து பணியாற்றும் தென்னிந்தியச் சமய ஆய்வாளர். சாந்தாயி அம்மையாரைப் பற்றிப் பங்கு உரிமை கோருவதைவிட மேலானதை இவர் சொல்கிறார் — அவரை ஊரின் முதல் கிறிஸ்தவர் என்று மட்டும் அல்ல, ஊரையே நிறுவியவர் என்று அழைக்கிறார். இந்நூல் நம்மிடம் இல்லை: இது இரண்டாம் கை மூலமாகவே இங்கு மேற்கோள் காட்டப்படுகிறது; இன்னும் பதிப்புரிமையிலும் உள்ளது.`,
        url: "https://archive.org/details/saintsgoddessesk0000bayl",
      },
      {
        id: "hardgrave_1969",
        author: "Robert L. Hardgrave Jr.",
        title: "The Nadars of Tamilnad",
        detail: "University of California Press, 1969",
        note: "The standard social history of the community, written with no interest in this church whatever — which is exactly what makes it useful here. It sets down 1680, a woman, and a church in 1685 as plain fact, and it reached them by a different road from Bayly's. Between the two of them the founding of Vadakkankulam stops being something only the parish says. Not held on this project: quoted at second hand, and still in copyright.",
        noteTa: `அச்சமூகத்தைப் பற்றிய, தரப்படுத்தப்பட்ட சமூக வரலாறு; இவ்வாலயத்தில் எள்ளளவும் அக்கறை இல்லாமல் எழுதப்பட்டது — இங்கே இது பயனுள்ளதாக இருப்பதற்குக் காரணமும் அதுவே. 1680, ஒரு பெண், 1685-ல் ஓர் ஆலயம் — இவற்றைத் தெளிவான செய்தியாகவே இது பதிவு செய்கிறது; பேய்லி சென்ற வழியிலிருந்து வேறு வழியாகவே இவர் அவற்றை அடைந்தார். இவ்விருவரையும் சேர்த்துப் பார்க்கும்போது, வடக்கன்குளத்தின் நிறுவல் என்பது பங்கு மட்டுமே சொல்லும் ஒன்றாக இல்லாமல் போகிறது. இப்பணியில் இந்நூல் இல்லை: இரண்டாம் கை மூலமாகவே மேற்கோள் காட்டப்படுகிறது; இன்னும் பதிப்புரிமையிலும் உள்ளது.`,
        url: "https://archive.org/details/nadarsoftamilnad0000hard",
      },
      {
        id: "cronin_1959",
        author: "Vincent Cronin",
        title: "A Pearl to India: The Life of Roberto de Nobili",
        detail: "London, 1959",
        note: "A modern biography rather than a primary document — but an outside one, and the fullest account we hold of how the Madurai Mission began. It supplies the link this page was missing between St Francis Xavier on the coast and a Jesuit on a forest path in the deep south: the inland mission de Nobili opened at Madurai in 1606, whose charge de Britto took up in 1683.",
        noteTa: `மூல ஆவணம் அல்ல, ஒரு நவீன வாழ்க்கை வரலாறே — ஆயினும் வெளியிலிருந்து எழுதப்பட்டது; மதுரைப் பணிக்களம் எப்படித் தொடங்கியது என்பதற்கு நம்மிடம் உள்ள மிக முழுமையான விவரிப்பு. கடற்கரையில் நின்ற புனித சவேரியாருக்கும், தென்கோடியின் காட்டுப் பாதையில் நடந்த ஓர் இயேசு சபை அருட்தந்தைக்கும் இடையே இப்பக்கத்தில் விடுபட்டிருந்த இணைப்பை இது தருகிறது: 1606-ல் மதுரையில் ரொபேர்ட்டோ தெ நொபிலி தொடங்கிய உள்நாட்டுப் பணிக்களம்; 1683-ல் அதன் பொறுப்பைப் புனித அருளானந்தர் ஏற்றார்.`,
        url: "https://archive.org/details/in.ernet.dli.2015.279418",
      },
      {
        id: "trento_2022",
        author: "Margherita Trento",
        title: "Writing Tamil Catholicism",
        detail: "Brill, 2022 — open access",
        note: "Works directly from the Roman, Vatican, Paris and Shembaganur manuscripts; the deepest scholarly treatment of this parish's eighteenth-century catechists. It is also the book that put a name to the parish's remembered European family: working from the 1915 genealogical manuscript of the village's catechist families, Trento identifies “Mr. Bilderbeck” as the merchant Christopher Bilderbeck (d. 1817), father of the Anglican missionary John Bilderbeck (1809–1880).",
        noteTa: `உரோமை, வத்திக்கான், பாரிஸ், சேம்பகனூர் ஆகிய இடங்களின் கையெழுத்துப் படிகளிலிருந்து நேரடியாகவே பணியாற்றுகிறது; இப்பங்கின் பதினெட்டாம் நூற்றாண்டு மறைக்கல்வியாளர்களைப் பற்றிய மிக ஆழமான ஆய்வு. பங்கின் நினைவில் நிற்கும் அந்த ஐரோப்பியக் குடும்பத்திற்குப் பெயர் தந்த நூலும் இதுவே: ஊரின் மறைக்கல்வியாளர் குடும்பங்களைப் பற்றிய 1915-ஆம் ஆண்டு வம்சாவளிக் கையெழுத்துப் படியிலிருந்து பணியாற்றி, “திரு. பில்டர்பெக்” என்பவரை வணிகர் கிறிஸ்டோபர் பில்டர்பெக் (இறப்பு 1817) என்று ட்ரெண்டோ அடையாளம் காண்கிறார் — ஆங்கிலிக்கன் மறைப்பணியாளர் ஜான் பில்டர்பெக்கின் (1809–1880) தந்தை.`,
        url: "https://library.oapen.org/handle/20.500.12657/77106",
      },
      {
        id: "narchison_2011",
        author: "J. Rosario Narchison",
        title: "Towards a Historiography of Martyr Devasahayam",
        detail: "in India's Christian Heritage, CHAI, 2011",
        note: "The decisive study of how the Devasahayam tradition descends from Buttari's manuscript — and what was added to it later.",
        noteTa: `தேவசகாயம் மரபு புத்தாரியின் கையெழுத்துப் படியிலிருந்து எப்படி இறங்கி வருகிறது என்பதையும், பின்னாளில் அதனோடு எவை சேர்க்கப்பட்டன என்பதையும் தீர்மானமாகக் காட்டும் ஆய்வு.`,
        url: "https://menachery.org/Narchison_Devasahayam.pdf",
      },
      {
        id: "srinivasan_2021",
        author: "T. Srinivasan",
        title: "History of Vadakkankulam Church",
        detail: "BlueRose Publishers, 2021 — ISBN 978-93-5427-365-0",
        note: "The only dedicated published monograph on this church. In print.",
        noteTa: `இவ்வாலயத்திற்கென்றே வெளியிடப்பட்ட ஒரே தனி நூல். இன்றும் அச்சில் கிடைக்கிறது.`,
      },
    ],
  },
  {
    heading: "The parish's own records",
    headingTa: `பங்கின் சொந்தப் பதிவுகள்`,
    blurb:
      "Last on this page, and last on every citation — deliberately. A parish's own book is the weakest possible support for a parish's own claim, and everything above this line is here precisely because it was written by someone with no reason to flatter us. These are also one witness family, not several: the parish's English history, the jubilee souvenir, the diocesan page and the two Tamil devotional sites tell the same story because they descend from the same telling. We cite them for what they are — our account of ourselves — and we never stack them to look like corroboration. Everything cited to a source in this group is tiered as tradition, however grand the letterhead: a bishop writing for his own diocese's jubilee is still an institution reporting on itself.",
    blurbTa: `இப்பக்கத்தில் கடைசி; ஒவ்வொரு மேற்கோளிலும் கடைசி — வேண்டுமென்றே. ஒரு பங்கின் சொந்த உரிமைக்கோரலுக்கு அப்பங்கின் சொந்த நூலே மிகவும் பலவீனமான ஆதாரம்; இக்கோட்டுக்கு மேலே உள்ள அனைத்தும் இங்கே இருப்பதற்குக் காரணம், நம்மை முகஸ்துதி செய்ய எந்தக் காரணமும் இல்லாதவர்களால் அவை எழுதப்பட்டவை என்பதே. மேலும் இவை பல சாட்சிகள் அல்ல; ஒரே சாட்சிக் குடும்பம்: பங்கின் ஆங்கில வரலாறு, விழா மலர், மறைமாவட்டப் பக்கம், இரு தமிழ்ப் பக்தி இணையதளங்கள் — இவை அனைத்தும் ஒரே கதையைச் சொல்கின்றன, ஏனெனில் அவை ஒரே சொல்லுதலிலிருந்தே இறங்கி வந்தவை. அவை எதுவோ அதற்காகவே — நம்மைப் பற்றிய நமது சொந்தப் பதிவு என்பதற்காகவே — அவற்றை மேற்கோள் காட்டுகிறோம்; வெளிச் சான்று போலத் தோன்றும்படி அவற்றை ஒன்றன்மேல் ஒன்றாக ஒருபோதும் அடுக்குவதில்லை. இக்குழுவில் உள்ள ஒரு மூலத்திற்குச் சாற்றப்படும் அனைத்தும் மரபு என்ற நிலையிலேயே வைக்கப்படுகின்றன — கடிதத்தலைப்பு எவ்வளவு பெரியதாக இருந்தாலும்: தன் சொந்த மறைமாவட்டத்தின் விழா மலருக்காக ஓர் ஆயர் எழுதுவதும் ஒரு நிறுவனம் தன்னைப் பற்றித் தானே அறிக்கை தருவதுதான்.`,
    items: [
      {
        id: "parish_english_history",
        title: "The English history of the Holy Family Church",
        detail: "Parish copy; architecture and building chapters",
        note: "Names Br Joseph Bergenthal, S.J. as the chief architect who drew and supervised the present church under Fr Grégoire, and records the benediction of 27 June 1872 and the solemn dedication of 29 June from Fr Grégoire's own diary. The exact title, author and year of this volume are still being confirmed, and we flag that openly.",
        noteTa: `அருட்தந்தை கிரகோயர் அவர்களின் கீழ், இன்று நிற்கும் ஆலயத்தின் திட்டத்தை வரைந்து பணியைக் கண்காணித்த தலைமைக் கட்டிடக் கலைஞராகச் சகோதரர் ஜோசப் பெர்கந்தால், இ.ச. அவர்களைப் பெயர் சொல்லிக் குறிக்கிறது; அருட்தந்தை கிரகோயர் அவர்களின் சொந்த நாட்குறிப்பிலிருந்து, 1872 ஜூன் 27-ஆம் நாள் ஆசீர்வாதத்தையும், ஜூன் 29-ஆம் நாள் திருவர்ப்பணத்தையும் பதிவு செய்கிறது. இந்நூலின் சரியான தலைப்பு, ஆசிரியர், ஆண்டு ஆகியவை இன்னும் உறுதி செய்யப்பட்டு வருகின்றன; அதை வெளிப்படையாகவே குறித்து வைக்கிறோம்.`,
        archiveOnly: true,
      },
      {
        id: "souvenir_150yr",
        title: "ஆலய 150-வது ஆண்டுவிழா மலர் — the 150-Year Jubilee Souvenir",
        detail: "2022 — the parish's own jubilee book, cited openly and always as tradition",
        note: "Our own jubilee book, published for the sesquicentenary of the 1872 consecration. This note used to promise that nothing on this website was cited to it. That promise was not kept, and we would rather say so than go on making it: the history page was leaning on the souvenir all along — for the kankol festival of 1749, for the east-facing plan of the church, for the date of 6 August 1993, for the chariot of 1891 and the new one of 2014, for the years of the lace school. Using a book while publicly swearing you do not use it is the one real dishonesty available to a page built on honesty. So we cite it now, in the open, wherever it is genuinely the source. It is always tiered as tradition and never as documentation: a parish's own book cannot be independent proof of a parish's own claim, and calling it one would be a circle, not a citation. Where the souvenir points to an older witness we still go to that witness and cite it too. And an honest note about the book: it dates the apparition to 1805, where every other source — diocesan, Jesuit and Tamil — gives 1803, and our own priest-list places Fr John Louis Cardoza here in exactly 1803. We follow 1803 and treat 1805 as a copying slip in our own souvenir.",
        noteTa: `1872-ஆம் ஆண்டு அர்ப்பணத்தின் நூற்றைம்பதாம் ஆண்டு நிறைவுக்காக வெளியிடப்பட்ட நமது சொந்த விழா மலர். இவ்விணையதளத்தில் எதுவும் இதை மேற்கோள் காட்டவில்லை என்று இக்குறிப்பு முன்பு உறுதி அளித்து வந்தது. அந்த உறுதி காக்கப்படவில்லை; அதைத் தொடர்ந்து சொல்லிக்கொண்டிருப்பதைவிட, உண்மையைச் சொல்வதையே நாம் விரும்புகிறோம்: வரலாற்றுப் பக்கம் தொடக்கம் முதலே இவ்விழா மலரைச் சார்ந்து நின்றது — 1749-ஆம் ஆண்டுக் கங்கோல் விழாவுக்கு, ஆலயம் கிழக்கு நோக்கி அமைந்த திட்டத்திற்கு, 1993 ஆகஸ்ட் 6 என்ற நாளுக்கு, 1891-ஆம் ஆண்டுத் தேருக்கும் 2014-ஆம் ஆண்டுப் புதிய தேருக்கும், லேஸ் பள்ளியின் ஆண்டுகளுக்கு. ஒரு நூலைப் பயன்படுத்திக்கொண்டே அதைப் பயன்படுத்தவில்லை என்று வெளிப்படையாகச் சத்தியம் செய்வது — நேர்மையின்மேல் கட்டப்பட்ட ஒரு பக்கத்திற்குக் கிடைக்கும் ஒரே உண்மையான நேர்மையின்மை அதுவே. எனவே இப்போது, எங்கெல்லாம் இது உண்மையிலேயே மூலமாக இருக்கிறதோ அங்கெல்லாம், வெளிப்படையாகவே இதை மேற்கோள் காட்டுகிறோம். இது எப்போதும் மரபு என்ற நிலையிலேயே வைக்கப்படுகிறது; ஒருபோதும் ஆவணச் சான்றாக அல்ல: ஒரு பங்கின் சொந்த உரிமைக்கோரலுக்கு அப்பங்கின் சொந்த நூல் தனிச் சான்றாக இருக்க முடியாது; அதைச் சான்று என்று அழைப்பது ஒரு மேற்கோள் அல்ல, ஒரு வட்டம். விழா மலர் தன்னைவிடப் பழைய ஒரு சாட்சியைச் சுட்டும் இடங்களில், அந்தச் சாட்சியிடமே நாம் சென்று அதையும் மேற்கோள் காட்டுகிறோம். இந்நூலைப் பற்றி ஒரு நேர்மையான குறிப்பு: மாதா காட்சியை இது 1805-ஆம் ஆண்டு எனத் தருகிறது; ஏனைய அனைத்து மூலங்களும் — மறைமாவட்டம், இயேசு சபை, தமிழ் — 1803 எனத் தருகின்றன; நமது சொந்த அருட்தந்தையர் பட்டியலும் அருட்தந்தை ஜான் லூயிஸ் கார்தோசா அவர்களை 1803-ஆம் ஆண்டில்தான் இங்கே வைக்கிறது. நாம் 1803-ஐப் பின்பற்றுகிறோம்; 1805 என்பதை நமது சொந்த விழா மலரில் நேர்ந்த ஒரு நகல் பிழையாகவே கருதுகிறோம்.`,
        archiveOnly: true,
      },
      {
        id: "diocese_thoothukudi_page",
        title: "Diocese of Thoothukudi — parish page",
        detail: "Holy Family Church, Vadakkankulam",
        note: "The diocesan chronology on which this site's timeline is built.",
        noteTa: `இத்தளத்தின் காலவரிசை எதன்மேல் கட்டப்பட்டுள்ளதோ, அந்த மறைமாவட்டக் காலவரிசை.`,
        url: "https://tuticorindiocese.org/parish-vadakankulam-holy-family.htm",
      },
      {
        id: "bishop_stephen_jubilee_2022",
        author: "Most Rev. A. Stephen, Bishop of Thoothukudi",
        title: "The bishop's message for the 150th-year jubilee",
        detail: "2022 — printed for the jubilee of the 1872 church",
        note: "Quoted by name on the history page, and until now credited to nobody, which is the sort of thing this bibliography exists to stop. The bishop puts de Britto's coming, the baptisms and the first church together in 1686, where the parish's other books give 1685. We print both dates and settle neither: nothing outside the parish family dates the chapel at all, so the disagreement is between two tellings of one family memory, and a year is not worth inventing a witness for. It sits here, with our own records, and not in the outside record above — a bishop writing for his own diocese's jubilee is an institution reporting on itself, however senior the hand that holds the pen.",
        noteTa: `வரலாற்றுப் பக்கத்தில் பெயர் குறிப்பிட்டு மேற்கோள் காட்டப்பட்டது; இதுவரை எவருக்கும் சாற்றப்படவில்லை — இதைப் போன்றவற்றை நிறுத்துவதற்காகவே இந்நூற்பட்டியல் இருக்கிறது. புனித அருளானந்தரின் வருகை, திருமுழுக்குகள், முதல் ஆலயம் ஆகிய மூன்றையும் ஆயர் 1686-ஆம் ஆண்டில் ஒன்றாக வைக்கிறார்; பங்கின் ஏனைய நூல்களோ 1685 எனத் தருகின்றன. இரு ஆண்டுகளையும் நாம் அச்சிடுகிறோம்; எதையும் தீர்ப்பாக முடிப்பதில்லை: பங்குக் குடும்பத்திற்கு வெளியே எதுவும் அச்சிற்றாலயத்திற்கு ஓர் ஆண்டைத் தருவதே இல்லை; எனவே இந்த வேறுபாடு, ஒரே குடும்ப நினைவின் இரு சொல்லுதல்களுக்கு இடையிலானது; ஓர் ஆண்டுக்காக ஒரு சாட்சியைக் கற்பனை செய்வது மதிப்புடையது அல்ல. ஆகவே இது, மேலே உள்ள வெளியுலகப் பதிவுகளில் அல்லாமல், நமது சொந்தப் பதிவுகளோடு இங்கே அமர்கிறது — தன் சொந்த மறைமாவட்டத்தின் விழாவுக்காக ஓர் ஆயர் எழுதுவது, பேனாவைப் பிடித்திருக்கும் கை எத்துணை உயர்ந்ததாக இருந்தாலும், ஒரு நிறுவனம் தன்னைப் பற்றித் தானே அறிக்கை தருவதுதான்.`,
        archiveOnly: true,
      },
      {
        id: "catholictamil_182",
        title: "பரிசுத்த திருக்குடும்ப தேவாலயம், வடக்கன்குளம்",
        detail: "church.catholictamil.com, p. 182",
        note: "A Tamil retelling of the parish's published history, carrying the priest-list and the account of the bells. Near word-for-word identical to vadavaimatha.net — the two are one witness printed twice, and must never be stacked as though they were two.",
        noteTa: `பங்கு வெளியிட்ட வரலாற்றைத் தமிழில் மீண்டும் சொல்லும் பக்கம்; அருட்தந்தையர் பட்டியலையும், மணிகளைப் பற்றிய விவரிப்பையும் தாங்கியுள்ளது. vadavaimatha.net பக்கத்தோடு கிட்டத்தட்டச் சொல்லுக்குச் சொல் ஒத்திருக்கிறது — இவ்விரண்டும் இருமுறை அச்சிடப்பட்ட ஒரே சாட்சி; இரண்டு சாட்சிகள் போல் அவற்றை ஒருபோதும் அடுக்கக்கூடாது.`,
        url: "https://www.church.catholictamil.com/p/182.html",
      },
      {
        id: "rosariancr_fatimagiri",
        author: "Congregation of the Rosarians",
        title: "Fatimagiri Ashram, Vadakkankulam",
        detail: "The congregation's own website",
        note: "The sole witness for the Rosarian foundation of 1944, and the source of the title “Servant of God” for Antony Susainather — which is the congregation's own usage. No decree of the Holy See is in evidence, and we attribute the title rather than assert it.",
        noteTa: `1944-ஆம் ஆண்டு ஜெபமாலைத் தாசர் சபையின் நிறுவலுக்கு உள்ள ஒரே சாட்சி; அந்தோணி சூசைநாதர் அவர்களுக்கு “இறைவனின் ஊழியர்” என்ற பட்டப்பெயர் வருவதற்கான மூலமும் இதுவே — அது அச்சபையின் சொந்த வழக்கு. திருப்பீடத்தின் எந்த ஆணையும் சான்றாக இல்லை; எனவே அப்பட்டத்தை நாம் உறுதியாக அறிவிக்காமல், அச்சபையின் வழக்கு என்றே சாற்றிக் குறிக்கிறோம்.`,
        url: "https://rosariancr.com",
      },
      {
        id: "bethany_sisters_healing_ministry",
        author: "Sisters of the Little Flower of Bethany",
        title: "The Healing Ministry of the Bethany Sisters at Vadakkankulam",
        detail: "Congregational document",
        note: "Records the arrival of four sisters on 27 July 1970 and the founding of St Thomas Hospital.",
        noteTa: `1970 ஜூலை 27 அன்று நான்கு அருட்சகோதரிகள் வந்து சேர்ந்ததையும், புனித தோமையார் மருத்துவமனை தொடங்கப்பட்டதையும் பதிவு செய்கிறது.`,
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
  headingTa: `இம்மூலங்களை நாம் எப்படி எடைபோடுகிறோம்`,
  intro:
    "Not everything on this page carries the same weight, and we will not pretend otherwise.",
  introTa: `இப்பக்கத்தில் உள்ள அனைத்தும் ஒரே எடையைத் தாங்குவதில்லை; அப்படித் தாங்குவதாக நாம் பாசாங்கு செய்யப்போவதும் இல்லை.`,
  tiers: [
    {
      label: "Documented at the highest level",
      labelTa: `மிக உயர்ந்த நிலையில் ஆவணப்படுத்தப்பட்டவை`,
      body: "St John de Britto's martyrdom — attested by his own prison letter of 3 February 1693 and a printed Latin martyrology of 1697. And St Devasahayam's baptism at this church in 1745, recorded by two Jesuit historians working from the mission's own papers a century before any canonisation dossier existed, by L'Osservatore Romano and Vatican News, and sealed by his canonisation on 15 May 2022. This is the best-attested fact about our village, and it comes from outside us.",
      bodyTa: `புனித அருளானந்தரின் இரத்தசாட்சியம் — 1693 பிப்ரவரி 3 அன்று அவரே எழுதிய சிறைக் கடிதத்தாலும், 1697-ல் இலத்தீனில் அச்சான ஓர் இரத்தசாட்சிய நூலாலும் உறுதிப்படுத்தப்பட்டது. மேலும், 1745-ல் இவ்வாலயத்தில் நிகழ்ந்த புனித தேவசகாயத்தின் திருமுழுக்கு — எந்தப் புனிதர் பட்ட ஆவணத் தொகுப்பும் உருவாவதற்கு ஒரு நூற்றாண்டு முன்பே, பணிக்களத்தின் சொந்த ஆவணங்களிலிருந்து பணியாற்றிய இரு இயேசு சபை வரலாற்றாசிரியர்களால் பதிவு செய்யப்பட்டது; “L'Osservatore Romano” இதழாலும், Vatican News செய்திச் சேவையாலும் பதிவு செய்யப்பட்டது; 2022 மே 15 அன்று அவர் புனிதராக அறிவிக்கப்பட்டதன் மூலம் முத்திரையிடப்பட்டது. நம் ஊரைப் பற்றிய, மிகச் சிறந்த சான்றுகளைக் கொண்ட செய்தி இதுவே — இது நமக்கு வெளியிலிருந்து வருகிறது.`,
    },
    {
      label: "Documented in the civil and Jesuit record",
      labelTa: `அரசுப் பதிவிலும் இயேசு சபைப் பதிவிலும் ஆவணப்படுத்தப்பட்டவை`,
      body: "The priests who served here, year by year, in the Jesuit province catalogues at Rome. The completion of the present church in 1872, in a British government gazetteer of 1917. The name of the architect, Br Joseph Bergenthal, in the Roman catalogue of that same year.",
      bodyTa: `இங்கே பணியாற்றிய அருட்தந்தையர், ஆண்டுக்கு ஆண்டு, உரோமையில் உள்ள இயேசு சபை மாகாணப் பட்டியல்களில். இன்று நிற்கும் ஆலயம் 1872-ல் நிறைவு பெற்றது, 1917-ஆம் ஆண்டு பிரிட்டிஷ் அரசின் மாவட்டக் கையேட்டில். கட்டிடக் கலைஞர் சகோதரர் ஜோசப் பெர்கந்தால் அவர்களின் பெயர், ஆலயம் நிறைவுற்ற அதே ஆண்டின் உரோமைப் பட்டியலில்.`,
    },
    {
      label: "Parish tradition, faithfully held",
      labelTa: `பங்கின் மரபு, விசுவாசத்தோடு காக்கப்பட்டது`,
      body: "The arrival of the statue from Portugal by sea in 1742–43. It is a treasured tradition of this parish, and it does not appear in the older Jesuit or academic histories of the mission. We tell it as what it is.",
      bodyTa: `1742–43-ல் போர்த்துகலிலிருந்து கடல் வழியாகத் திருவுருவம் வந்து சேர்ந்தது. இது இப்பங்கு பொக்கிஷமாகக் காக்கும் ஒரு மரபு; பணிக்களத்தின் பழைய இயேசு சபை வரலாறுகளிலோ ஆய்வு நூல்களிலோ இது வருவதில்லை. அது எதுவோ அதுவாகவே இதைச் சொல்கிறோம்.`,
    },
    {
      label: "Local and diocesan devotion",
      labelTa: `ஊரின், மறைமாவட்டத்தின் பக்தி`,
      body: "The weeping of Our Lady on 21 October 1803. Its printed anchor is Besse's La Mission du Maduré (1914) — a real book, held in four known libraries, whose relevant pages no one working on this project has yet physically opened. It is a continuous local and diocesan tradition, honoured here for more than two centuries. It has never been the subject of a Vatican investigation, and we do not claim that it has.",
      bodyTa: `1803 அக்டோபர் 21 அன்று அன்னை கண்ணீர் சிந்தியது. அதன் அச்சு ஆதாரம் பெஸ்ஸின் “La Mission du Maduré” (1914) — உண்மையிலேயே இருக்கும் ஒரு நூல்; நான்கு நூலகங்களில் இருப்பது தெரியும்; அதன் தொடர்புடைய பக்கங்களை இப்பணியில் ஈடுபட்ட எவரும் இதுவரை நேரில் திறந்ததில்லை. இது ஊரிலும் மறைமாவட்டத்திலும் அறுபடாமல் தொடரும் ஒரு மரபு; இரு நூற்றாண்டுகளுக்கும் மேலாக இங்கே சிறப்பிக்கப்பட்டு வருகிறது. வத்திக்கானின் எந்த ஆய்வுக்கும் இது ஒருபோதும் உட்படுத்தப்படவில்லை; உட்படுத்தப்பட்டதாக நாம் உரிமை கோரவும் இல்லை.`,
    },
  ],
  closing:
    "Corrections and additions are welcome. Where a source proves us wrong, we would rather change the page than the source.",
  closingTa: `திருத்தங்களும் சேர்க்கைகளும் வரவேற்கப்படுகின்றன. ஒரு மூலம் நாம் தவறு என்று நிரூபித்தால், அந்த மூலத்தை மாற்றுவதைவிடப் பக்கத்தை மாற்றுவதையே நாம் விரும்புகிறோம்.`,
};
