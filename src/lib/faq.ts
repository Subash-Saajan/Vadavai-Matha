/**
 * The questions people actually ask — and the ones they ask an AI.
 *
 * This exists to be *quoted*. An FAQPage is the single most citable shape of
 * content there is: a question, and a short, complete, self-contained answer.
 * It is what Google lifts into a rich result and what ChatGPT and Perplexity
 * lift into an answer. Every sentence below should survive being pulled out of
 * the page and read on its own, because that is exactly what will happen to it.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * THE RULES, and why each one is here:
 *
 * 1. PRESENT-DAY FACTS ARE COMPUTED, NEVER TYPED. Mass times, distances and
 *    the telephone number are interpolated from contact.ts. This is not
 *    fussiness — a first draft of these answers, written by hand, put Nagercoil
 *    at 30 km and Tirunelveli at 59 km. contact.ts says 26 and 66. Whichever
 *    was right, a shrine that contradicts itself across two pages is a shrine
 *    Google declines to trust. So the numbers cannot be typed here at all.
 *
 * 2. EVIDENCE IS TIERED, NOT FLATTENED. See history.ts. The 1745 baptism is
 *    recorded by the Holy See; the statue's Portuguese provenance is a parish
 *    tradition; the 1803 weeping is a devotional tradition never investigated
 *    by Rome. Saying so plainly is what makes the rest of the page believable.
 *
 * 3. NOTHING ABOUT CASTE. The parish has decided the website will not carry
 *    that history. So the two naves are described and no cause is given — and
 *    no substitute cause is invented either. The foundation-stone Latin
 *    inscription is omitted entirely rather than quoted in half, because its
 *    second clause is precisely the subject being set aside, and a truncated
 *    quotation is a lie told with true words.
 * ─────────────────────────────────────────────────────────────────────────
 */
import { FEAST, PHONE, SCHEDULE, TRAVEL } from "./contact";
import { APPARITION, BELLS, CHURCH, PEOPLE, PARISH_TODAY } from "./history";

/**
 * TAMIL. `qTa` / `aTa` / `sourceTa` are optional siblings, the same convention
 * as acknowledgements.ts and historyNotes.ts: the page renders the Tamil on the
 * /ta route and falls back to the English when it is absent, so a half-finished
 * translation never shows a blank.
 *
 * The Tamil carries the SAME `${…}` interpolations as the English, for the
 * reason set out in rule 1 above: a number typed into one language drifts out
 * of step with the other the first time contact.ts changes.
 *
 * Three of those interpolations are prose rather than figures, and history.ts
 * now carries a Tamil sibling for each — `CHURCH.materialsTa`,
 * `APPARITION.honestStatementTa`, `APPARITION.feastDaysTa`. The Tamil answers
 * interpolate those, so no English clause is stranded mid-Tamil-sentence and no
 * Latin month name appears in Tamil prose. If you add another prose constant,
 * give it a Tamil twin at the same time rather than glossing it here.
 */
export type Faq = {
  q: string;
  qTa?: string;
  a: string;
  aTa?: string;
  /** Shown small under the answer. Honesty is the product here. */
  source?: string;
  sourceTa?: string;
};

const times = (t: readonly string[]) => t.join(", ");
const nagercoil = TRAVEL.road.find((r) => r.name === "Nagercoil")!;
const tirunelveli = TRAVEL.road.find((r) => r.name === "Tirunelveli")!;

export const FAQS: Faq[] = [
  {
    q: "Where is the Holy Family Shrine, Vadakkankulam?",
    qTa: `வடக்கன்குளம் திருக்குடும்பத் திருத்தலம் எங்கே அமைந்துள்ளது?`,
    a: `The shrine stands on East Street in Vadakkankulam, an inland village in Radhapuram taluk, Tirunelveli district, Tamil Nadu (PIN 627116), in the Diocese of Thoothukudi. It is roughly ${nagercoil.km} km from Nagercoil and ${tirunelveli.km} km from Tirunelveli, just off the NH-44 highway. The parish office may be reached on ${PHONE.display}.`,
    aTa: `தமிழ்நாடு, திருநெல்வேலி மாவட்டம், ராதாபுரம் வட்டத்தில், கடலை விட்டு உள்நாட்டில் அமைந்துள்ள வடக்கன்குளம் கிராமத்தின் கிழக்குத் தெருவில் இத்திருத்தலம் நிற்கிறது (அஞ்சல் குறியீடு 627116); இது தூத்துக்குடி மறைமாவட்டத்தைச் சேர்ந்தது. நாகர்கோவிலிலிருந்து ஏறத்தாழ ${nagercoil.km} கி.மீ தொலைவிலும், திருநெல்வேலியிலிருந்து ${tirunelveli.km} கி.மீ தொலைவிலும், NH-44 நெடுஞ்சாலையை ஒட்டி இது உள்ளது. பங்கு அலுவலகத்தை ${PHONE.display} என்ற எண்ணில் தொடர்பு கொள்ளலாம்.`,
  },
  {
    q: "What do the names Vadavai Matha and Paraloga Matha mean?",
    qTa: `வடவை மாதா, பரலோக மாதா என்னும் பெயர்களுக்குப் பொருள் என்ன?`,
    a: `“Vadavai Matha” is the affectionate local name for this shrine and its Mother — from Vadakkankulam and the Tamil Matha, “Mother”. Her formal title is Our Lady of the Assumption, venerated here as “Paraloga Matha” and “Vinnerpu Matha”, both meaning Our Lady of Heaven. All of these name the one patroness of the Holy Family Shrine, Vadakkankulam.`,
    aTa: `“வடவை மாதா” என்பது இத்திருத்தலத்தையும் இங்கே எழுந்தருளியிருக்கும் அன்னையையும் இவ்வூர் மக்கள் அன்போடு அழைக்கும் பெயர் — வடக்கன்குளம் என்னும் ஊர்ப்பெயரும், “அன்னை” எனப் பொருள்படும் மாதா என்னும் சொல்லும் இணைந்து பிறந்தது. அவரது முறையான பட்டப்பெயர் விண்ணேற்பு மாதா — Our Lady of the Assumption. இங்கே அவர் “பரலோக மாதா” என்றும் “விண்ணேற்பு மாதா” என்றும் வணங்கப்படுகிறார்; இரண்டுமே விண்ணுலகின் அன்னையையே குறிக்கின்றன. இப்பெயர்கள் அனைத்தும், வடக்கன்குளம் திருக்குடும்பத் திருத்தலத்தின் ஒரே பாதுகாவல் அன்னையையே சுட்டுகின்றன.`,
  },
  {
    q: "Why is Vadakkankulam called “Little Rome”?",
    qTa: `வடக்கன்குளம் ஏன் “சின்ன ரோமாபுரி” என்று அழைக்கப்படுகிறது?`,
    a: `The name “Little Rome” — Chinna Romapuri — was given to the village in 1926 by ${PEOPLE.roche.name}, the first Bishop of Tuticorin, in recognition of the scale of the church and the depth of the village's Catholic life. It is an affectionate title bestowed within the Church, not a civil or official designation.`,
    aTa: `ஆலயத்தின் பிரமாண்டத்தையும், இவ்வூரின் ஆழமான கத்தோலிக்க வாழ்வையும் கண்டு, 1926-ல் தூத்துக்குடியின் முதல் ஆயரான ${PEOPLE.roche.name} அவர்கள் இக்கிராமத்திற்கு “சின்ன ரோமாபுரி” — Little Rome — என்னும் பெயரைச் சூட்டினார்கள். இது திருச்சபைக்குள் அன்போடு அளிக்கப்பட்ட ஒரு சிறப்புப் பெயரே அன்றி, அரசு சார்ந்த அல்லது அதிகாரப்பூர்வமான பெயர் அல்ல.`,
    source: "Parish history; Diocese of Thoothukudi",
    sourceTa: `பங்கு வரலாறு; தூத்துக்குடி மறைமாவட்டம்`,
  },
  {
    q: "When is the annual feast?",
    qTa: `ஆண்டுத் திருவிழா எப்போது நடைபெறுகிறது?`,
    a: `The patronal feast of Our Lady of the Assumption runs for ten days, from ${FEAST.startDay} to ${FEAST.endDay} August. It opens with the hoisting of the flag (kodiyetram) on ${FEAST.startDay} August and closes on ${FEAST.endDay} August with the chariot procession in the early hours of the morning, which draws crowds of around one hundred thousand. During the feast the roads nearest the church are closed to vehicles and there is no parking close by.`,
    aTa: `விண்ணேற்பு மாதாவின் பங்குத் திருவிழா ஆகஸ்ட் ${FEAST.startDay} முதல் ${FEAST.endDay} வரை பத்து நாட்கள் நடைபெறுகிறது. ஆகஸ்ட் ${FEAST.startDay}-ல் கொடியேற்றத்துடன் அது தொடங்குகிறது; ஆகஸ்ட் ${FEAST.endDay} அன்று அதிகாலை வேளையில் நடைபெறும் தேர் ஊர்வலத்துடன் நிறைவடைகிறது — அந்த ஊர்வலத்தில் ஏறத்தாழ ஒரு லட்சம் பேர் திரள்கிறார்கள். திருவிழா நாட்களில் ஆலயத்தை ஒட்டிய சாலைகள் வாகனங்களுக்கு மூடப்படும்; அருகில் வாகனம் நிறுத்த இடமும் இருக்காது.`,
  },
  {
    q: "Is there a second annual observance?",
    qTa: `ஆண்டுதோறும் நடைபெறும் இரண்டாவது நினைவுவிழா ஒன்று உண்டா?`,
    a: `Yes. The parish also keeps the commemoration of the apparition — the Matha Kaatchi — each year on ${APPARITION.feastDays}, remembering the weeping of Our Lady before the village on 21 October 1803.`,
    aTa: `உண்டு. 1803 அக்டோபர் 21 அன்று இவ்வூர் மக்கள் முன்னிலையில் அன்னை கண்ணீர் சிந்திய நிகழ்வை நினைவுகூர்ந்து, “மாதா காட்சி” எனப்படும் காட்சிப் பெருவிழாவையும் இப்பங்கு ஆண்டுதோறும் ${APPARITION.feastDaysTa} தேதிகளில் கொண்டாடி வருகிறது.`,
  },
  {
    q: "What are the Mass timings?",
    qTa: `திருப்பலி நேரங்கள் என்ன?`,
    a: `Monday to Saturday, Mass is at ${times(SCHEDULE.weekdayMass)}. On Sunday, Mass is at ${times(SCHEDULE.sundayMass)}. The Eucharistic adoration chapel is open daily from ${SCHEDULE.chapel.open} to ${SCHEDULE.chapel.close}. Timings can change on feast days, so pilgrims travelling a distance are advised to telephone the parish office on ${PHONE.display} first.`,
    aTa: `திங்கள் முதல் சனி வரை ${times(SCHEDULE.weekdayMass)} மணிக்குத் திருப்பலி நிறைவேற்றப்படுகிறது. ஞாயிற்றுக்கிழமை ${times(SCHEDULE.sundayMass)} மணிக்குத் திருப்பலி நடைபெறுகிறது. நற்கருணை ஆராதனைச் சிற்றாலயம் தினமும் ${SCHEDULE.chapel.open} முதல் ${SCHEDULE.chapel.close} வரை திறந்திருக்கும். திருவிழா நாட்களில் நேரங்கள் மாறக்கூடும்; எனவே தொலைவிலிருந்து வரும் திருப்பயணிகள், புறப்படுவதற்கு முன் ${PHONE.display} என்ற எண்ணில் பங்கு அலுவலகத்தைத் தொடர்பு கொள்ளுமாறு கேட்டுக்கொள்கிறோம்.`,
  },
  {
    q: "Who was St Devasahayam Pillai, and what is his connection to this church?",
    qTa: `புனித தேவசகாயம் பிள்ளை யார்? இவ்வாலயத்துடன் அவருக்கு உள்ள தொடர்பு என்ன?`,
    a: `Born Neelakanta Pillai in 1712, he was an officer of the Travancore court who was baptised at this church on 14 May 1745 by the Jesuit ${PEOPLE.buttari.name}, taking the name Devasahayam. He was martyred on 14 January 1752, and canonised by Pope Francis on 15 May 2022 — the first Indian layman ever to be declared a saint. This is the church of his baptism. It is also the best-attested fact in the parish's history: the Holy See's own sources, Vatican News and L'Osservatore Romano, name Vadakkankulam as the place he was baptised.`,
    aTa: `1712-ல் நீலகண்ட பிள்ளை என்னும் பெயருடன் பிறந்த இவர், திருவிதாங்கூர் அரசவையின் அலுவலராக இருந்தவர். 1745 மே 14 அன்று இயேசு சபை அருட்தந்தை ${PEOPLE.buttari.name} அவர்களால் இவ்வாலயத்தில் திருமுழுக்குப் பெற்று, தேவசகாயம் என்னும் பெயரைத் தாங்கினார். 1752 ஜனவரி 14 அன்று இரத்தசாட்சியாக மரித்த அவர், 2022 மே 15 அன்று திருத்தந்தை பிரான்சிஸ் அவர்களால் புனிதராக அறிவிக்கப்பட்டார் — புனிதர் என அறிவிக்கப்பட்ட முதல் இந்தியப் பொதுநிலையினர் இவரே. அவர் திருமுழுக்குப் பெற்ற ஆலயம் இதுவே. இப்பங்கின் வரலாற்றில் மிக உறுதியான ஆதாரங்களைக் கொண்ட செய்தியும் இதுவேதான்: திருப்பீடத்தின் சொந்த ஆவணங்களான Vatican News, L'Osservatore Romano ஆகியவை, அவர் திருமுழுக்குப் பெற்ற இடமாக வடக்கன்குளத்தையே பெயர் குறித்துச் சொல்கின்றன.`,
    source: "Vatican News; L'Osservatore Romano, 5 December 2012",
    sourceTa: `Vatican News; L'Osservatore Romano, 2012 டிசம்பர் 5`,
  },
  {
    q: "Was the parish really founded by St John de Britto?",
    qTa: `இப்பங்கை உண்மையிலேயே புனித அருளானந்தர் நிறுவினாரா?`,
    a: `Yes. St John de Britto — known in Tamil as Arulanandar — raised a thatched chapel here in 1685 and dedicated it to the Holy Family, baptising some two hundred people. He was Superior of the Madurai Mission in exactly those years, and the colonial district gazetteer independently places Christianity at Vadakkankulam in “the closing years of the seventeenth century”. He was martyred at Oriyur in 1693 and canonised in 1947.`,
    aTa: `ஆம். தமிழில் அருளானந்தர் என்று அழைக்கப்படும் புனித ஜான் தெ பிரிட்டோ, 1685-ல் இங்கே ஒரு கீற்றுக் கூரைச் சிற்றாலயத்தை எழுப்பி, அதைத் திருக்குடும்பத்திற்கு அர்ப்பணித்து, ஏறத்தாழ இருநூறு பேருக்குத் திருமுழுக்கு அளித்தார். சரியாக அந்த ஆண்டுகளில்தான் அவர் மதுரை மறைப்பணியின் தலைவராக இருந்தார். அத்துடன், இப்பங்கின் சொந்தப் பதிவுகளைச் சாராமல், காலனிய ஆட்சிக்கால மாவட்ட அரசிதழும் வடக்கன்குளத்தில் கிறிஸ்தவம் “பதினேழாம் நூற்றாண்டின் இறுதி ஆண்டுகளில்” தொடங்கியதாகவே குறிக்கிறது. 1693-ல் ஓரியூரில் இரத்தசாட்சியாக மரித்த அவர், 1947-ல் புனிதராக அறிவிக்கப்பட்டார்.`,
    source: "Pate, Madras District Gazetteers: Tinnevelly (1917); parish history",
    sourceTa: `பேட், Madras District Gazetteers: Tinnevelly (1917); பங்கு வரலாறு`,
  },
  {
    q: "What makes the Holy Family Shrine at Vadakkankulam historically significant?",
    qTa: `வடக்கன்குளம் திருக்குடும்பத் திருத்தலத்திற்கு வரலாற்றில் இத்தனை சிறப்பு எதனால்?`,
    a: `Several documented facts set it apart. It was founded in 1685 by St John de Britto — a Jesuit missionary later canonised as a martyr — and is one of the historic inland churches of the old Jesuit Madurai Mission. It is the parish where St Devasahayam Pillai, the first Indian layman ever to be declared a saint (canonised 2022), was baptised in 1745 — a fact recorded by the Holy See itself. Its great two-nave church, whose naves converge on a single altar, is believed to be unique in India. And the village has been honoured as “Little Rome” (Chinna Romapuri) since 1926. For a village parish its history is unusually well documented — in the Jesuit archives at Rome, the colonial district gazetteers, the nineteenth-century mission histories, and the Vatican's own records.`,
    aTa: `ஆவணங்களால் உறுதி செய்யப்பட்ட சில உண்மைகள் இதைத் தனித்து நிற்கச் செய்கின்றன. பின்னாளில் இரத்தசாட்சிப் புனிதராக அறிவிக்கப்பட்ட இயேசு சபை மறைப்பணியாளர் புனித ஜான் தெ பிரிட்டோவால் 1685-ல் நிறுவப்பட்ட இது, பழைய இயேசு சபை மதுரை மறைப்பணியின் வரலாற்றுச் சிறப்புமிக்க உள்நாட்டு ஆலயங்களுள் ஒன்று. புனிதர் என அறிவிக்கப்பட்ட முதல் இந்தியப் பொதுநிலையினரான புனித தேவசகாயம் பிள்ளை 1745-ல் திருமுழுக்குப் பெற்ற பங்கு இதுவே — அவர் 2022-ல் புனிதராக அறிவிக்கப்பட்டார்; இச்செய்தியைத் திருப்பீடமே தன் ஆவணங்களில் பதிவு செய்துள்ளது. ஒரே பீடத்தை நோக்கி இணையும் இரு மண்டபங்களைக் கொண்ட இதன் மாபெரும் ஆலயம், இந்தியாவில் வேறெங்கும் இல்லாத ஒன்று என்று கருதப்படுகிறது. மேலும், 1926 முதல் இவ்வூர் “சின்ன ரோமாபுரி” என்று சிறப்பிக்கப்பட்டு வருகிறது. ஒரு கிராமப் பங்கிற்கு அரிதான அளவுக்கு இதன் வரலாறு ஆவணப்படுத்தப்பட்டுள்ளது — உரோமையிலுள்ள இயேசு சபை ஆவணக் காப்பகத்திலும், காலனிய ஆட்சிக்கால மாவட்ட அரசிதழ்களிலும், பத்தொன்பதாம் நூற்றாண்டு மறைப்பணி வரலாறுகளிலும், வத்திக்கானின் சொந்தப் பதிவுகளிலும்.`,
    source: "Vatican News; ARSI Rome; Pate (1917); Auguste Jean (1894)",
    sourceTa: `Vatican News; ARSI, உரோமை; பேட் (1917); அகுஸ்த் ஜான் (1894)`,
  },
  {
    q: "Is the Holy Family Shrine one of the oldest churches in Tamil Nadu?",
    qTa: `தமிழ்நாட்டின் மிகப் பழமையான ஆலயங்களுள் இத்திருத்தலமும் ஒன்றா?`,
    a: `It is one of the historic churches of the region, but not the oldest in Tamil Nadu — the oldest are on the coast, from the sixteenth-century Portuguese and Jesuit missions. Founded in 1685, the Holy Family Shrine is among the older churches of the Tirunelveli interior and one of the significant inland parishes of the old Madurai Mission. Its distinction rests less on age than on three things: its unique two-nave church, its title of “Little Rome”, and its being the parish where St Devasahayam Pillai was baptised in 1745.`,
    aTa: `இப்பகுதியின் வரலாற்றுச் சிறப்புமிக்க ஆலயங்களுள் இதுவும் ஒன்றுதான்; ஆனால் தமிழ்நாட்டிலேயே மிகப் பழமையானது அல்ல — மிகப் பழையவை கடற்கரையில் உள்ளன; பதினாறாம் நூற்றாண்டுப் போர்ச்சுகீசிய, இயேசு சபை மறைப்பணிகளின் காலத்தவை அவை. 1685-ல் நிறுவப்பட்ட திருக்குடும்பத் திருத்தலம், திருநெல்வேலி உள்பகுதியின் பழைய ஆலயங்களுள் ஒன்றாகவும், பழைய மதுரை மறைப்பணியின் முக்கியமான உள்நாட்டுப் பங்குகளுள் ஒன்றாகவும் விளங்குகிறது. இதன் தனிச்சிறப்பு பழமையில் அல்ல; மூன்று செய்திகளில் உள்ளது — வேறெங்கும் நிகரில்லாத இரட்டை மண்டப ஆலயம், “சின்ன ரோமாபுரி” என்னும் பெயர், 1745-ல் புனித தேவசகாயம் பிள்ளை திருமுழுக்குப் பெற்ற பங்கு இதுவே என்பது.`,
    source: "Pate, Madras District Gazetteers: Tinnevelly (1917); parish history",
    sourceTa: `பேட், Madras District Gazetteers: Tinnevelly (1917); பங்கு வரலாறு`,
  },
  {
    q: "When was the present church built, and who built it?",
    qTa: `இப்போது நிற்கும் ஆலயம் எப்போது கட்டப்பட்டது? கட்டியவர்கள் யார்?`,
    a: `The foundation stone was laid on 9 August 1855 by ${PEOPLE.canoz.name}, and the church was blessed in June 1872 after some ${CHURCH.buildYears} years of work. It was carried through by ${PEOPLE.gregoire.name}, whom the Jesuit histories call “the apostle of Vadakenkoulam”, with ${PEOPLE.bergenthal.name} as the building brother and chief architect. Br Bergenthal's part is recorded in the parish's own English history and confirmed by the Jesuit archives in Rome, which list him in 1872 as the builder of the church at Vadakencoulam.`,
    aTa: `1855 ஆகஸ்ட் 9 அன்று ${PEOPLE.canoz.name} அவர்களால் அடிக்கல் நாட்டப்பட்டு, ஏறத்தாழ ${CHURCH.buildYears} ஆண்டுப் பணிக்குப் பின், 1872 ஜூன் மாதத்தில் ஆலயம் ஆசீர்வதிக்கப்பட்டது. இப்பணியை முன்னின்று நடத்தி முடித்தவர் ${PEOPLE.gregoire.name} அவர்கள்; இயேசு சபை வரலாறுகள் இவரை “வடக்கன்குளத்தின் திருத்தூதர்” என்றே அழைக்கின்றன. கட்டிடத்தை எழுப்பிய பொதுநிலைச் சகோதரரும் தலைமைக் கட்டிடக் கலைஞருமாக இருந்தவர் ${PEOPLE.bergenthal.name} அவர்கள். சகோதரர் பெர்கந்தாலின் பங்கு இப்பங்கின் சொந்த ஆங்கில வரலாற்றில் பதிவாகியுள்ளது; உரோமையிலுள்ள இயேசு சபை ஆவணக் காப்பகமும், 1872-ஆம் ஆண்டுப் பதிவேட்டில் அவரை வடக்கன்குளம் ஆலயத்தைக் கட்டியவர் என்று குறிப்பிட்டு அதை உறுதி செய்கிறது.`,
    source: "Parish English history; ARSI Rome, Provincia Tolosana catalogue 1872",
    sourceTa: `பங்கின் ஆங்கில வரலாறு; ARSI, உரோமை — Provincia Tolosana பதிவேடு, 1872`,
  },
  {
    q: "What is unusual about the church's architecture?",
    qTa: `இவ்வாலயத்தின் கட்டிடக் கலையில் அசாதாரணமானது என்ன?`,
    a: `The church is built with two naves that converge eastward to meet at a single shared sanctuary and one east-facing altar — a plan the Jesuit historian Auguste Jean described in 1894 as being “in the form of an open compass”, and a church “probably without equal in the world”. The façade is flanked by two octagonal towers ${CHURCH.towersFeet} feet high, with sixteen smaller pinnacle-towers around the church.`,
    aTa: `இவ்வாலயம் இரு மண்டபங்களைக் கொண்டது; அவை கிழக்கு நோக்கி ஒன்றையொன்று நெருங்கி வந்து, ஒரே பொதுக் கருவறையிலும் கிழக்கு நோக்கிய ஒரே பீடத்திலும் சந்திக்கின்றன. இயேசு சபை வரலாற்றாசிரியர் அகுஸ்த் ஜான் 1894-ல் இந்த அமைப்பை “விரிந்த ஒரு கவராயத்தின் வடிவம்” என்று விவரித்தார்; இது “உலகிலேயே நிகரற்ற ஆலயமாக இருக்கக்கூடும்” என்றும் எழுதினார். முகப்பின் இரு பக்கமும் ${CHURCH.towersFeet} அடி உயரமுள்ள இரு எண்கோணக் கோபுரங்கள் நிற்கின்றன; ஆலயத்தைச் சுற்றிப் பதினாறு சிறிய சிகரக் கோபுரங்களும் உள்ளன.`,
    source: "Auguste Jean, Le Maduré (1894); Pate (1917)",
    sourceTa: `அகுஸ்த் ஜான், Le Maduré (1894); பேட் (1917)`,
  },
  {
    q: "Is it true the arches were built without iron?",
    qTa: `இவ்வாலயத்தின் வளைவுகள் இரும்பே இல்லாமல் கட்டப்பட்டன என்பது உண்மையா?`,
    a: `So the parish's own history records: ${CHURCH.arches} arches within the church, twelve of them meeting over the altar, turned with ${CHURCH.materials} — with no iron and no cement, and no wooden pillar or beam holding them up. The vaults and pillars are painted with flowers and scenes in natural plant dyes rather than chemical paint.`,
    aTa: `இப்பங்கின் சொந்த வரலாறு அப்படியே பதிவு செய்கிறது: ஆலயத்தினுள் ${CHURCH.arches} வளைவுகள்; அவற்றுள் பன்னிரண்டு பீடத்திற்கு மேலே ஒன்றுசேர்கின்றன. ${CHURCH.materialsTa} அவை எழுப்பப்பட்டன — சிமெண்டும் இல்லை; அவற்றைத் தாங்கி நிற்க மரத்தூணோ உத்திரமோ எதுவும் இல்லை. மேற்கூரை வளைவுகளிலும் தூண்களிலும் உள்ள மலர்களும் காட்சிகளும், இரசாயனச் சாயங்களால் அல்லாமல் இயற்கையான தாவரச் சாயங்களால் வரையப்பட்டவை.`,
    source: "Parish English history (single-source: the parish's own account)",
    sourceTa: `பங்கின் ஆங்கில வரலாறு (ஒரே ஆதாரம் — பங்கின் சொந்தப் பதிவு)`,
  },
  {
    q: "What are the two bells?",
    qTa: `ஆலயத்தின் இரு மணிகள் பற்றி என்ன அறியப்படுகிறது?`,
    a: `The church's twin bells were cast in ${BELLS.castYear} in ${BELLS.country}, given by the French benefactor ${BELLS.donor}, and installed in ${BELLS.installedYear} when the new church was blessed — one bell in each of the two towers. The bell photographed in its tower is cast “Vve Grégoire de Valence (Drôme) — Donateur ${BELLS.donor}”: the bronze names its own foundry — the ${BELLS.foundry} works at ${BELLS.city} — and confirms the donor by name. Published accounts had said the Burdin foundry of Lyon; where the record and the bronze differ, the bronze has the last word.`,
    aTa: `ஆலயத்தின் இரட்டை மணிகள் ${BELLS.castYear}-ல் ${BELLS.country} நாட்டில் வார்க்கப்பட்டன; பிரெஞ்சு அறக்கொடையாளர் ${BELLS.donor} அவர்களே அவற்றைக் கொடையாக அளித்தார்கள். புதிய ஆலயம் ஆசீர்வதிக்கப்பட்ட ${BELLS.installedYear}-ஆம் ஆண்டில், இரு கோபுரங்களிலும் தலா ஒரு மணியாக அவை ஏற்றப்பட்டன. கோபுரத்தில் புகைப்படம் எடுக்கப்பட்ட மணியில் “Vve Grégoire de Valence (Drôme) — Donateur ${BELLS.donor}” என்று வார்க்கப்பட்டுள்ளது: அந்த வெண்கலமே தன்னை வார்த்த வார்ப்பகத்தைச் சொல்கிறது — ${BELLS.city} நகரிலுள்ள ${BELLS.foundry} வார்ப்பகம் — கொடையாளியின் பெயரையும் அது உறுதி செய்கிறது. வெளியான குறிப்புகள் இதை லியோன் நகரின் பர்டின் வார்ப்பகம் என்றே சொல்லி வந்தன; பதிவும் வெண்கலமும் வேறுபடும் இடத்தில், வெண்கலத்தின் சொல்லே இறுதி.`,
    source: "The bell's own cast inscription; parish records",
    sourceTa: `மணியில் வார்க்கப்பட்ட வாசகம்; பங்குப் பதிவுகள்`,
  },
  {
    q: "What is the statue of Our Lady of the Assumption, and where did it come from?",
    qTa: `விண்ணேற்பு மாதாவின் திருவுருவம் எத்தகையது? அது எங்கிருந்து வந்தது?`,
    a: `The venerated image is a crowned statue of Our Lady of the Assumption. By parish tradition, in 1742–43 a wooden box marked “To Vadakankulam, From Portugal” was carried ashore by the sea at Kootapuli, found by fishermen and brought to Fr Buttari, who kept one of the images it held for this church. We should be honest that this is a treasured parish tradition rather than a documented fact: it does not appear in the older Jesuit or academic histories of the mission.`,
    aTa: `இங்கே வணங்கப்படும் திருவுருவம், முடிசூட்டப்பட்ட விண்ணேற்பு மாதாவின் திருச்சிலையாகும். பங்கின் மரபுப்படி, 1742–43-ஆம் ஆண்டுகளில் “To Vadakankulam, From Portugal” — வடக்கன்குளத்திற்கு, போர்ச்சுகலிலிருந்து — என்று குறிக்கப்பட்ட ஒரு மரப்பெட்டி கூட்டப்புளிக் கடற்கரையில் ஒதுங்கியது; மீனவர்கள் அதைக் கண்டெடுத்து அருட்தந்தை புத்தாரி அவர்களிடம் கொண்டுவந்தார்கள்; அதிலிருந்த திருவுருவங்களுள் ஒன்றை அவர் இவ்வாலயத்திற்கென வைத்துக்கொண்டார். இது ஆவணங்களால் உறுதி செய்யப்பட்ட செய்தி அல்ல, இப்பங்கு நெஞ்சில் ஏந்திக் காக்கும் ஒரு மரபே என்பதை நேர்மையாகச் சொல்ல வேண்டும்: இந்த மறைப்பணி குறித்த பழைய இயேசு சபை வரலாறுகளிலோ ஆய்வு நூல்களிலோ இது இடம்பெறவில்லை.`,
    source: "Parish tradition (not corroborated in the academic sources)",
    sourceTa: `பங்கின் மரபு (ஆய்வு நூல்களில் உறுதிப்படுத்தப்படவில்லை)`,
  },
  {
    q: "What happened here in 1803?",
    qTa: `1803-ஆம் ஆண்டு இங்கே என்ன நிகழ்ந்தது?`,
    a: `${APPARITION.honestStatement} The parish's account is that on the morning of Friday 21 October 1803, as a villager knelt in prayer, the statue's face darkened, tears ran down it, and her folded hands opened outward; the bell was rung, the village gathered, and the parish priest of that year examined the statue and declared the event genuine. The centenary was kept in 1903, and the commemoration is held every year on 22–23 October.`,
    aTa: `${APPARITION.honestStatementTa} இப்பங்கின் சொந்தப் பதிவு இவ்வாறு சொல்கிறது: 1803 அக்டோபர் 21, வெள்ளிக்கிழமை காலையில், இவ்வூரைச் சேர்ந்த ஒருவர் முழந்தாளிட்டுச் செபித்துக்கொண்டிருந்தபோது, திருவுருவத்தின் திருமுகம் இருண்டது; கண்ணீர் வழிந்தோடியது; கூப்பியிருந்த அன்னையின் கைகள் விரிந்தன. மணி ஒலிக்கப்பட்டது, ஊர் மக்கள் திரண்டார்கள்; அவ்வாண்டின் பங்குத் தந்தை திருவுருவத்தை ஆய்ந்து பார்த்து, அந்நிகழ்வு உண்மையானது என்று அறிவித்தார். 1903-ல் இதன் நூற்றாண்டு விழா கொண்டாடப்பட்டது; ஆண்டுதோறும் அக்டோபர் 22, 23 ஆகிய நாட்களில் இந்நினைவு விழா நடைபெறுகிறது.`,
    source: "Léon Besse, La Mission du Maduré (1914); Diocese of Thoothukudi",
    sourceTa: `லெயோன் பெஸ், La Mission du Maduré (1914); தூத்துக்குடி மறைமாவட்டம்`,
  },
  {
    q: "Is this the same shrine as Velankanni?",
    qTa: `இது வேளாங்கண்ணி திருத்தலம்தானா?`,
    a: `No — they are two different places, and they are often confused. Velankanni is the Basilica of Our Lady of Good Health, in Velankanni in Nagapattinam district, several hundred kilometres away. Vadakkankulam is an inland village in Tirunelveli district; its church is dedicated to the Holy Family and its patroness is Our Lady of the Assumption. The two have different titles, different histories and different feast days.`,
    aTa: `இல்லை — இவை இரண்டும் வெவ்வேறு இடங்கள்; அடிக்கடி ஒன்றென்று குழப்பிக்கொள்ளப்படுகின்றன. வேளாங்கண்ணி என்பது நாகப்பட்டினம் மாவட்டத்தில் உள்ள ஆரோக்கிய அன்னையின் பேராலயம்; இங்கிருந்து பல நூறு கிலோமீட்டர் தொலைவில் உள்ளது. வடக்கன்குளமோ திருநெல்வேலி மாவட்டத்தில், கடலை விட்டு உள்நாட்டில் அமைந்த ஒரு கிராமம்; இங்குள்ள ஆலயம் திருக்குடும்பத்திற்கு அர்ப்பணிக்கப்பட்டது; இதன் பாதுகாவல் அன்னை விண்ணேற்பு மாதா. இரண்டுக்கும் பட்டப்பெயர்கள் வெவ்வேறு, வரலாறுகள் வெவ்வேறு, திருவிழா நாட்களும் வெவ்வேறு.`,
  },
  {
    q: "Is there an entry fee, and who may visit?",
    qTa: `நுழைவுக் கட்டணம் உண்டா? யார் யார் வரலாம்?`,
    a: `There is no entry fee. This is a living parish church and a diocesan shrine, not a ticketed monument. Pilgrims and visitors of every background are welcome at Mass and at the adoration chapel. The parish today numbers around ${PARISH_TODAY.catholics.toLocaleString("en-IN")} Catholics in roughly ${PARISH_TODAY.families.toLocaleString("en-IN")} families.`,
    aTa: `நுழைவுக் கட்டணம் எதுவும் இல்லை. இது வழிபாடு நடைபெறும் பங்கு ஆலயமும் மறைமாவட்டத் திருத்தலமும் ஆகும்; சீட்டு வாங்கி நுழையும் நினைவுச் சின்னம் அல்ல. எந்தப் பின்னணியிலிருந்து வருபவராக இருந்தாலும், திருப்பலியிலும் ஆராதனைச் சிற்றாலயத்திலும் திருப்பயணிகளும் பார்வையாளர்களும் அன்போடு வரவேற்கப்படுகிறார்கள். இன்று இப்பங்கில் ஏறத்தாழ ${PARISH_TODAY.catholics.toLocaleString("en-IN")} கத்தோலிக்கர், சுமார் ${PARISH_TODAY.families.toLocaleString("en-IN")} குடும்பங்களில் வாழ்கிறார்கள்.`,
  },
  {
    q: "Is the Holy Family Shrine worth visiting for travellers and pilgrims?",
    qTa: `பயணிகளுக்கும் திருப்பயணிகளுக்கும் இத்திருத்தலம் வந்து பார்க்கத் தகுந்ததா?`,
    a: `Yes. It is both a living pilgrimage shrine and a place of real historical and architectural interest — its unique two-nave church, its twin ${CHURCH.towersFeet}-foot towers, and its four centuries of history. It stands in the far south of Tamil Nadu, about ${TRAVEL.road.find((r) => r.name === "Kanyakumari")!.km} km from Kanyakumari and ${nagercoil.km} km from Nagercoil, so it is easily added to a journey through the Kanyakumari–Nagercoil region. Entry is free, and visitors of every background are welcome.`,
    aTa: `ஆம். இது உயிர்ப்புள்ள ஒரு திருப்பயணத் தலம் மட்டுமல்ல; வரலாற்றிலும் கட்டிடக் கலையிலும் உண்மையான ஈர்ப்புள்ள இடமும்கூட — வேறெங்கும் நிகரில்லாத இரட்டை மண்டப ஆலயம், ${CHURCH.towersFeet} அடி உயரமுள்ள இரட்டைக் கோபுரங்கள், நான்கு நூற்றாண்டுகளாகத் தொடரும் வரலாறு. தமிழ்நாட்டின் தென்கோடிப் பகுதியில், கன்னியாகுமரியிலிருந்து ஏறத்தாழ ${TRAVEL.road.find((r) => r.name === "Kanyakumari")!.km} கி.மீ தொலைவிலும், நாகர்கோவிலிலிருந்து ${nagercoil.km} கி.மீ தொலைவிலும் இது அமைந்துள்ளது; எனவே கன்னியாகுமரி–நாகர்கோவில் பயணத்தோடு இதை எளிதாகச் சேர்த்துக்கொள்ளலாம். நுழைவு இலவசம்; எந்தப் பின்னணியைச் சேர்ந்தவரையும் இங்கு வரவேற்கிறோம்.`,
  },
  {
    q: "How do I reach Vadakkankulam?",
    qTa: `வடக்கன்குளத்திற்கு எப்படி வருவது?`,
    a: `By road, the village lies just off the NH-44, about ${nagercoil.km} km from Nagercoil (roughly ${nagercoil.mins} minutes) and ${tirunelveli.km} km from Tirunelveli. Kanyakumari is about ${TRAVEL.road.find((r) => r.name === "Kanyakumari")!.km} km away. The nearest railway stations are ${TRAVEL.rail[0].name} (${TRAVEL.rail[0].km} km) and ${TRAVEL.rail[1].name} (${TRAVEL.rail[1].km} km); the nearest airports are Thiruvananthapuram and Thoothukudi, each about 95–97 km away.`,
    aTa: `சாலை வழியாக: வடக்கன்குளம் NH-44-ஐ ஒட்டியே உள்ளது; நாகர்கோவிலிலிருந்து ஏறத்தாழ ${nagercoil.km} கி.மீ (சுமார் ${nagercoil.mins} நிமிடப் பயணம்), திருநெல்வேலியிலிருந்து ${tirunelveli.km} கி.மீ. கன்னியாகுமரி ஏறத்தாழ ${TRAVEL.road.find((r) => r.name === "Kanyakumari")!.km} கி.மீ தொலைவில் உள்ளது. அருகிலுள்ள ரயில் நிலையங்கள் ${TRAVEL.rail[0].name} (${TRAVEL.rail[0].km} கி.மீ), ${TRAVEL.rail[1].name} (${TRAVEL.rail[1].km} கி.மீ). அருகிலுள்ள விமான நிலையங்கள் திருவனந்தபுரமும் தூத்துக்குடியும்; இரண்டும் ஏறத்தாழ 95–97 கி.மீ தொலைவில் உள்ளன.`,
  },
];
