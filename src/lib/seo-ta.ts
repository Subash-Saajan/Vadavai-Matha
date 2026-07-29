import type { RouteKey } from "./seo";

/**
 * Tamil search copy, one entry per route.
 *
 * Kept out of `seo.ts` so the English table stays readable, and typed as a
 * Partial on purpose: any route without an entry simply falls back to the
 * English copy (see `routeCopy`). A missing translation degrades to English —
 * it can never produce a blank <title>.
 *
 * Same rule as the English table: NO INVENTED FACTS. Every claim here — 1685,
 * the two naves, the 6–15 August feast, the 1926 "Little Rome" title, the 1745
 * baptism — is one the shrine has published. Terminology follows
 * .claude/skills/tamil-localize/reference/glossary.md (village = வடக்கன்குளம்,
 * Our Lady's lead title = பரலோக மாதா, Little Rome = சின்ன ரோமாபுரி).
 *
 * ─────────────────────────────────────────────────────────────────────────
 * WHAT A TAMIL SPEAKER ACTUALLY TYPES, and why the titles are ordered thus.
 *
 * The English table front-loads "Vadavai Matha" because that is the alias most
 * searches for this place carry. In Tamil the same query is typed வடவை மாதா —
 * so it leads here too, ahead of the formal திருக்குடும்பத் திருத்தலம். The other
 * four terms with real volume are வடக்கன்குளம் தேவாலயம் / ஆலயம், சின்ன ரோமாபுரி,
 * பரலோக மாதா and விண்ணேற்பு மாதா; each is placed in the first half of the title
 * or the first clause of the description of the page it belongs to, never
 * stacked together as a keyword list.
 *
 * LENGTH. Tamil says the same thing in fewer words but wider glyphs, so a
 * 60-character Latin title is roughly a 45-character Tamil one on the page.
 * Titles are held near or under 45 written characters (aksharas) and
 * descriptions near 150, counted as a reader counts them — not as UTF-16 code
 * units, which double every vowel sign and would make any honest Tamil title
 * look over budget.
 *
 * `title` still passes through the `%s · சின்ன ரோமாபுரி` template in the root
 * layout, so it must NOT repeat சின்ன ரோமாபுரி — hence /architecture's
 * fullTitle carries it and its title does not.
 * ─────────────────────────────────────────────────────────────────────────
 */
export type RouteCopy = {
  title: string;
  fullTitle: string;
  description: string;
  crumb: string;
};

export const ROUTES_TA: Partial<Record<RouteKey, RouteCopy>> = {
  // The home page's <title> is overridden absolutely in app/[lang]/(site)/page.tsx
  // (it leads with சின்ன ரோமாபுரி, to stop /contact out-ranking it for the brand
  // name). This `title` is therefore the fallback and the OG/description source,
  // and it leads with the alias instead, exactly as the English one does.
  home: {
    title: "வடவை மாதா — திருக்குடும்பத் திருத்தலம், வடக்கன்குளம்",
    fullTitle: "வடவை மாதா — வடக்கன்குளம் திருக்குடும்பத் திருத்தலம் (சின்ன ரோமாபுரி)",
    description:
      "வடக்கன்குளம் திருக்குடும்பத் திருத்தலம் — வடவை மாதா, பரலோக மாதா எனும் விண்ணேற்பு மாதாவின் யாத்திரைத் தலம். 1685-ல் புனித அருளானந்தரால் தொடங்கப்பட்டது; 1926 முதல் சின்ன ரோமாபுரி.",
    crumb: "முகப்பு",
  },
  history: {
    title: "வடவை மாதா வரலாறு",
    fullTitle: "வடவை மாதா திருத்தல வரலாறு — 1685 முதல் இன்று வரை",
    description:
      "வடக்கன்குளம் வடவை மாதாவின் வரலாறு: 1685-ல் ஓலைச் சிற்றாலயம், 1745-ல் தேவசகாயம் பிள்ளையின் திருமுழுக்கு, 1803-ன் புதுமைக் காட்சி, 1872-ல் இரட்டை மண்டப ஆலயம், 1993-ல் திருத்தலம்.",
    crumb: "வரலாறு",
  },
  architecture: {
    title: "கட்டிடக்கலை",
    fullTitle: "இரட்டை மண்டப ஆலயம் — சின்ன ரோமின் கட்டிடக்கலை",
    description:
      "“கவராயம் திறந்தாற்போல்” விரிந்து ஒரே பலிபீடத்தில் சந்திக்கும் இரு மண்டபங்கள் — இந்தியாவிலேயே தனித்தது எனக் கருதப்படும் வடக்கன்குளம் ஆலயம். 1855-ல் அடிக்கல், 1872-ல் ஆசீர்வாதம்.",
    crumb: "கட்டிடக்கலை",
  },
  massTimings: {
    title: "திருப்பலி நேரங்கள் & திருவிழாக்கள்",
    fullTitle: "திருப்பலி நேரங்களும் ஆண்டின் திருவிழாக்களும்",
    description:
      "வடக்கன்குளம் திருக்குடும்ப திருத்தலத்தின் தினசரி, ஞாயிறு திருப்பலி நேரங்கள்; ஆண்டின் திருவிழாக்கள் — ஆகஸ்ட் 6–15 விண்ணேற்பு மாதா திருவிழா, ஆகஸ்ட் 15 தேர் ஊர்வலம்.",
    crumb: "திருப்பலி & திருவிழாக்கள்",
  },
  contact: {
    title: "தொடர்பும் வருகையும்",
    fullTitle: "திருத்தலத் தொடர்பும் வருகையும்",
    description:
      "வடக்கன்குளம் திருக்குடும்பத் திருத்தலம் — சின்ன ரோமாபுரி. பங்கு அலுவலகம் 04637 230134, திருப்பலி நேரங்கள், நாகர்கோவில், திருநெல்வேலியிலிருந்து வழி, திருப்பலி ஒப்புக்கொடுத்தல், சான்றிதழ் கோரிக்கை.",
    crumb: "தொடர்பும் வருகையும்",
  },
  devasahayam: {
    title: "புனித தேவசகாயம் பிள்ளை",
    fullTitle: "புனித தேவசகாயம் பிள்ளை — 1745-ல் இப்பங்கில் திருமுழுக்கு",
    description:
      "1745 மே 14 அன்று இந்த ஆலயத்தில் திருமுழுக்குப் பெற்றார் — திருப்பீடத்தின் ஆவணமே இவ்விடத்தைக் குறிக்கிறது. அவரது வாழ்வு, ஆதாரங்கள். 2022-ல் இந்தியாவின் முதல் பொதுநிலைப் புனிதர்.",
    crumb: "புனித தேவசகாயம் பிள்ளை",
  },
  deBritto: {
    title: "புனித அருளானந்தர் (ஜான் தெ பிரிட்டோ)",
    fullTitle: "புனித அருளானந்தர் — 1685-ல் இப்பங்கை நிறுவியவர்",
    description:
      "1685-ல் இவரது வருகையிலிருந்தே வடக்கன்குளம் தன் தொடக்கத்தை எண்ணுகிறது. இயேசு சபை அருட்தந்தையின் வாழ்வு, ஓரியூர்ச் சிறையின் இறுதிக் கடிதம், ஆதாரங்கள். 1693-ல் இரத்தசாட்சி; 1947-ல் புனிதர்.",
    crumb: "புனித அருளானந்தர்",
  },
  faq: {
    title: "வினா & விடை",
    fullTitle: "திருத்தலம் குறித்த வினாக்களும் விடைகளும்",
    description:
      "திருவிழா எப்போது? திருப்பலி நேரம் என்ன? புனித தேவசகாயம் பிள்ளை யார்? வடக்கன்குளம் ஏன் சின்ன ரோமாபுரி? இது வேளாங்கண்ணியா? வடவை மாதா திருத்தலம் குறித்த தெளிவான விடைகள்.",
    crumb: "வினா & விடை",
  },
  priests: {
    title: "வடவையின் அருட்தந்தையர்",
    fullTitle: "வடவையின் அருட்தந்தையர் — 1697 முதலான வடக்கன்குளம் பங்குத் தந்தையர்",
    description:
      "1697-ல் அருட்தந்தை பெர்னார்ட் தெ சா முதல் இன்று வரை — வடக்கன்குளம் திருக்குடும்ப திருத்தலத்தின் 69 பங்குத் தந்தையர் முழுப் பட்டியல்; மதுரைப் பணிக்களத்து இயேசு சபையினர் உட்பட.",
    crumb: "அருட்தந்தையர்",
  },
  sources: {
    title: "ஆதாரங்களும் நூற்பட்டியலும்",
    fullTitle: "ஆதாரங்களும் மேலும் படிக்க வேண்டிய நூல்களும்",
    description:
      "இத்தளத்தின் ஒவ்வொரு வரலாற்றுக் கூற்றுக்கும் ஓர் ஆவணம் உண்டு: ரோம், பாரிஸ் இயேசு சபைச் சுவடிக் கிடங்குகள், மறைப்பணி வரலாறுகள், அரசுக் குறிப்பேடுகள், திருப்பீட ஆவணம்.",
    crumb: "ஆதாரங்கள்",
  },
  acknowledgements: {
    title: "நன்றியுரை",
    fullTitle: "நன்றியுரை — இத்தளம் உருவாகக் காரணமானவர்கள்",
    description:
      "இத்தளத்தின் பின்னால் உள்ள புகைப்படங்கள், நூல்கள், நினைவுகள், திருத்தங்கள் — அவற்றைத் தந்த வடக்கன்குளத்து மக்களும் பிறரும். உதவியின் வகைப்படி அகர வரிசையில்.",
    crumb: "நன்றியுரை",
  },
};
