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

export type Faq = {
  q: string;
  a: string;
  /** Shown small under the answer. Honesty is the product here. */
  source?: string;
};

const times = (t: readonly string[]) => t.join(", ");
const nagercoil = TRAVEL.road.find((r) => r.name === "Nagercoil")!;
const tirunelveli = TRAVEL.road.find((r) => r.name === "Tirunelveli")!;

export const FAQS: Faq[] = [
  {
    q: "Where is the Holy Family Shrine, Vadakkankulam?",
    a: `The shrine stands on East Street in Vadakkankulam, an inland village in Radhapuram taluk, Tirunelveli district, Tamil Nadu (PIN 627116), in the Diocese of Thoothukudi. It is roughly ${nagercoil.km} km from Nagercoil and ${tirunelveli.km} km from Tirunelveli, just off the NH-44 highway. The parish office may be reached on ${PHONE.display}.`,
  },
  {
    q: "What do the names Vadavai Matha and Paraloga Matha mean?",
    a: `“Vadavai Matha” is the affectionate local name for this shrine and its Mother — from Vadakkankulam and the Tamil Matha, “Mother”. Her formal title is Our Lady of the Assumption, venerated here as “Paraloga Matha” and “Vinnerpu Matha”, both meaning Our Lady of Heaven. All of these name the one patroness of the Holy Family Shrine, Vadakkankulam.`,
  },
  {
    q: "Why is Vadakkankulam called “Little Rome”?",
    a: `The name “Little Rome” — Chinna Romapuri — was given to the village in 1926 by ${PEOPLE.roche.name}, the first Bishop of Tuticorin, in recognition of the scale of the church and the depth of the village's Catholic life. It is an affectionate title bestowed within the Church, not a civil or official designation.`,
    source: "Parish history; Diocese of Thoothukudi",
  },
  {
    q: "When is the annual feast?",
    a: `The patronal feast of Our Lady of the Assumption runs for ten days, from ${FEAST.startDay} to ${FEAST.endDay} August. It opens with the hoisting of the flag (kodiyetram) on ${FEAST.startDay} August and closes on ${FEAST.endDay} August with the chariot procession in the early hours of the morning, which draws crowds of around one hundred thousand. During the feast the roads nearest the church are closed to vehicles and there is no parking close by.`,
  },
  {
    q: "Is there a second annual observance?",
    a: `Yes. The parish also keeps the commemoration of the apparition — the Matha Kaatchi — each year on ${APPARITION.feastDays}, remembering the weeping of Our Lady before the village on 23 October 1803.`,
  },
  {
    q: "What are the Mass timings?",
    a: `Monday to Saturday, Mass is at ${times(SCHEDULE.weekdayMass)}. On Sunday, Mass is at ${times(SCHEDULE.sundayMass)}. The Eucharistic adoration chapel is open daily from ${SCHEDULE.chapel.open} to ${SCHEDULE.chapel.close}. Timings can change on feast days, so pilgrims travelling a distance are advised to telephone the parish office on ${PHONE.display} first.`,
  },
  {
    q: "Who was St Devasahayam Pillai, and what is his connection to this church?",
    a: `Born Neelakanta Pillai in 1712, he was an officer of the Travancore court who was baptised at this church on 14 May 1745 by the Jesuit ${PEOPLE.buttari.name}, taking the name Devasahayam. He was martyred on 14 January 1752, and canonised by Pope Francis on 15 May 2022 — the first Indian layman ever to be declared a saint. This is the church of his baptism. It is also the best-attested fact in the parish's history: the Holy See's own sources, Vatican News and L'Osservatore Romano, name Vadakkankulam as the place he was baptised.`,
    source: "Vatican News; L'Osservatore Romano, 5 December 2012",
  },
  {
    q: "Was the parish really founded by St John de Britto?",
    a: `Yes. St John de Britto — known in Tamil as Arulanandar — raised a thatched chapel here in 1685 and dedicated it to the Holy Family, baptising some two hundred people. He was Superior of the Madurai Mission in exactly those years, and the colonial district gazetteer independently places Christianity at Vadakkankulam in “the closing years of the seventeenth century”. He was martyred at Oriyur in 1693 and canonised in 1947.`,
    source: "Pate, Madras District Gazetteers: Tinnevelly (1917); parish history",
  },
  {
    q: "What makes the Holy Family Shrine at Vadakkankulam historically significant?",
    a: `Several documented facts set it apart. It was founded in 1685 by St John de Britto — a Jesuit missionary later canonised as a martyr — and is one of the historic inland churches of the old Jesuit Madurai Mission. It is the parish where St Devasahayam Pillai, the first Indian layman ever to be declared a saint (canonised 2022), was baptised in 1745 — a fact recorded by the Holy See itself. Its great two-nave church, whose naves converge on a single altar, is believed to be unique in India. And the village has been honoured as “Little Rome” (Chinna Romapuri) since 1926. For a village parish its history is unusually well documented — in the Jesuit archives at Rome, the colonial district gazetteers, the nineteenth-century mission histories, and the Vatican's own records.`,
    source: "Vatican News; ARSI Rome; Pate (1917); Auguste Jean (1894)",
  },
  {
    q: "Is the Holy Family Shrine one of the oldest churches in Tamil Nadu?",
    a: `It is one of the historic churches of the region, but not the oldest in Tamil Nadu — the oldest are on the coast, from the sixteenth-century Portuguese and Jesuit missions. Founded in 1685, the Holy Family Shrine is among the older churches of the Tirunelveli interior and one of the significant inland parishes of the old Madurai Mission. Its distinction rests less on age than on three things: its unique two-nave church, its title of “Little Rome”, and its being the parish where St Devasahayam Pillai was baptised in 1745.`,
    source: "Pate, Madras District Gazetteers: Tinnevelly (1917); parish history",
  },
  {
    q: "When was the present church built, and who built it?",
    a: `The foundation stone was laid on 9 August 1855 by ${PEOPLE.canoz.name}, and the church was blessed in June 1872 after some ${CHURCH.buildYears} years of work. It was carried through by ${PEOPLE.gregoire.name}, whom the Jesuit histories call “the apostle of Vadakenkoulam”, with ${PEOPLE.bergenthal.name} as the building brother and chief architect. Br Bergenthal's part is recorded in the parish's own English history and confirmed by the Jesuit archives in Rome, which list him in 1872 as the builder of the church at Vadakencoulam.`,
    source: "Parish English history; ARSI Rome, Provincia Tolosana catalogue 1872",
  },
  {
    q: "What is unusual about the church's architecture?",
    a: `The church is built with two naves that converge eastward to meet at a single shared sanctuary and one east-facing altar — a plan the Jesuit historian Auguste Jean described in 1894 as being “in the form of an open compass”, and a church “probably without equal in the world”. The façade is flanked by two octagonal towers ${CHURCH.towersFeet} feet high, with sixteen smaller pinnacle-towers around the church.`,
    source: "Auguste Jean, Le Maduré (1894); Pate (1917)",
  },
  {
    q: "Is it true the arches were built without iron?",
    a: `So the parish's own history records: ${CHURCH.arches} arches within the church, twelve of them meeting over the altar, turned with ${CHURCH.materials} — with no iron and no cement, and no wooden pillar or beam holding them up. The vaults and pillars are painted with flowers and scenes in natural plant dyes rather than chemical paint.`,
    source: "Parish English history (single-source: the parish's own account)",
  },
  {
    q: "What are the two bells?",
    a: `The church's twin bells were cast in ${BELLS.castYear} in ${BELLS.city}, ${BELLS.country}, by the ${BELLS.foundry} foundry, given by the French benefactor ${BELLS.donor}, and installed in ${BELLS.installedYear} when the new church was blessed — one bell in each of the two towers. The Burdin foundry of Lyon is independently confirmed in the Lyon municipal archives. The bells' own cast inscriptions have never been photographed, so we do not claim to know what they say.`,
    source: "Parish records; Archives municipales de Lyon",
  },
  {
    q: "What is the statue of Our Lady of the Assumption, and where did it come from?",
    a: `The venerated image is a crowned statue of Our Lady of the Assumption. By parish tradition, in 1742–43 a wooden box marked “To Vadakankulam, From Portugal” was carried ashore by the sea at Kootapuli, found by fishermen and brought to Fr Buttari, who kept one of the images it held for this church. We should be honest that this is a treasured parish tradition rather than a documented fact: it does not appear in the older Jesuit or academic histories of the mission.`,
    source: "Parish tradition (not corroborated in the academic sources)",
  },
  {
    q: "What happened here in 1803?",
    a: `${APPARITION.honestStatement} The parish's account is that on the morning of Friday 23 October 1803, as a villager knelt in prayer, the statue's face darkened, tears ran down it, and her folded hands opened outward; the bell was rung, the village gathered, and the parish priest of that year examined the statue and declared the event genuine. The centenary was kept in 1903, and the commemoration is held every year on 22–23 October.`,
    source: "Léon Besse, La Mission du Maduré (1914); Diocese of Thoothukudi",
  },
  {
    q: "Is this the same shrine as Velankanni?",
    a: `No — they are two different places, and they are often confused. Velankanni is the Basilica of Our Lady of Good Health, in Velankanni in Nagapattinam district, several hundred kilometres away. Vadakkankulam is an inland village in Tirunelveli district; its church is dedicated to the Holy Family and its patroness is Our Lady of the Assumption. The two have different titles, different histories and different feast days.`,
  },
  {
    q: "Is there an entry fee, and who may visit?",
    a: `There is no entry fee. This is a living parish church and a diocesan shrine, not a ticketed monument. Pilgrims and visitors of every background are welcome at Mass and at the adoration chapel. The parish today numbers around ${PARISH_TODAY.catholics.toLocaleString("en-IN")} Catholics in roughly ${PARISH_TODAY.families.toLocaleString("en-IN")} families.`,
  },
  {
    q: "Is the Holy Family Shrine worth visiting for travellers and pilgrims?",
    a: `Yes. It is both a living pilgrimage shrine and a place of real historical and architectural interest — its unique two-nave church, its twin ${CHURCH.towersFeet}-foot towers, and its four centuries of history. It stands in the far south of Tamil Nadu, about ${TRAVEL.road.find((r) => r.name === "Kanyakumari")!.km} km from Kanyakumari and ${nagercoil.km} km from Nagercoil, so it is easily added to a journey through the Kanyakumari–Nagercoil region. Entry is free, and visitors of every background are welcome.`,
  },
  {
    q: "How do I reach Vadakkankulam?",
    a: `By road, the village lies just off the NH-44, about ${nagercoil.km} km from Nagercoil (roughly ${nagercoil.mins} minutes) and ${tirunelveli.km} km from Tirunelveli. Kanyakumari is about ${TRAVEL.road.find((r) => r.name === "Kanyakumari")!.km} km away. The nearest railway stations are ${TRAVEL.rail[0].name} (${TRAVEL.rail[0].km} km) and ${TRAVEL.rail[1].name} (${TRAVEL.rail[1].km} km); the nearest airports are Thiruvananthapuram and Thoothukudi, each about 95–97 km away.`,
  },
];
