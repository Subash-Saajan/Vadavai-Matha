import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/lib/faq";
import { faqPage, graph, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";
import { localePath } from "@/lib/locale";

/**
 * Questions & Answers.
 *
 * A plain server component — no GSAP, no client hooks — because this page's job
 * is to be read, quoted and lifted, not to perform. That also means it can
 * export its own metadata without the server/client split the other routes need.
 *
 * The FAQPage graph is fed the *same strings the page renders* (src/lib/faq.ts),
 * so the answer a crawler reads and the answer a pilgrim reads are by
 * construction the same text. The most common way sites get FAQ markup wrong is
 * emitting one answer to Google and showing another to the reader.
 *
 * THAT GUARANTEE NOW HOLDS IN BOTH LANGUAGES. `faqPage()` and `trailTo()` take a
 * `lang` and localise their `@id`, `url`, `name` and `inLanguage`, so the graph is
 * built per-locale INSIDE the component rather than once at import time — when no
 * locale exists yet. /ta therefore emits the Tamil answers at the Tamil URL, and
 * the breadcrumb points at Tamil URLs rather than English ones.
 */
export const generateMetadata = localizedMetadata("faq");

/**
 * The page's own chrome — everything not in faq.ts. Same shape as the COPY
 * blocks in src/lib/acknowledgements.ts.
 */
const COPY = {
  en: {
    eyebrow: "Little Rome",
    title: "Questions & Answers",
    intro:
      "The things pilgrims write and telephone to ask — the feast, the Mass timings, the road from Nagercoil, the saint who was baptised here. Answered plainly, and with the sources named.",
    sourcesNote:
      "Every historical claim above rests on a document, and we say which — including where the evidence is thin.",
    sourcesCta: "See our sources and further reading",
  },
  ta: {
    eyebrow: `சின்ன ரோமாபுரி`,
    title: `கேள்விகளும் பதில்களும்`,
    intro: `திருப்பயணிகள் கடிதம் எழுதியும் தொலைபேசியிலும் கேட்கும் கேள்விகள் — திருவிழா, திருப்பலி நேரங்கள், நாகர்கோவிலிலிருந்து வரும் வழி, இங்கே திருமுழுக்குப் பெற்ற புனிதர். ஆதாரங்களைக் குறிப்பிட்டு, தெளிவாகப் பதிலளிக்கப்பட்டுள்ளன.`,
    sourcesNote: `மேலே உள்ள ஒவ்வொரு வரலாற்றுச் செய்திக்கும் ஓர் ஆவணம் அடிப்படையாக உள்ளது; அது எது என்பதையும் நாங்கள் சொல்கிறோம் — ஆதாரம் மெலிதாக உள்ள இடங்களையும் சேர்த்தே.`,
    sourcesCta: `எங்கள் ஆதாரங்களையும் மேலும் வாசிக்க வேண்டியவற்றையும் காணுங்கள்`,
  },
} as const;

export default async function FaqRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";
  const L = (p: string) => localePath(lang, p);
  const t = COPY[lang];
  /* Tamil where we have it, English where we do not — never an empty line. */
  const ta = lang === "ta";

  /* The exact strings rendered below, so the crawler and the pilgrim read the
     same text in whichever language this route is. */
  const localized = FAQS.map((f) => ({
    q: ta && f.qTa ? f.qTa : f.q,
    a: ta && f.aTa ? f.aTa : f.a,
  }));
  const jsonLd = graph(faqPage(localized, lang), trailTo("faq", lang));

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="bg-cream text-navy">
        {/* `pt-32` was the phone value too: 128px of nothing under a navbar
            that is only 64px tall on a phone, so the eyebrow started a fifth of
            the way down the screen. 112px still clears the bar by 48px. */}
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-16 md:pt-40 md:pb-28">
          <p className="font-display tracking-[0.18em] md:tracking-[0.28em] text-xs md:text-sm uppercase text-gold-dark">
            {t.eyebrow}
          </p>
          {/* 36px of Cinzel caps was the phone size as well, which sets
              "Questions & Answers" as three stacked words in a 312px column.
              Same clamp as PageHero, so every masthead on the site — hero or
              plain page — opens at one size on a phone. */}
          <h1 className="mt-5 font-display text-[clamp(1.85rem,7.4vw,2.25rem)] md:text-6xl leading-[1.05]">
            {t.title}
          </h1>
          <div className="leaf-rule my-6 md:my-8" />
          <p className="font-serif text-[1.12rem] md:text-2xl leading-relaxed text-navy/75">
            {t.intro}
          </p>

          {/* ── THE ANSWERS ──
              Note that nothing here is a disclosure: every answer is open, so
              there is no accordion row to size to 44px and no tap target that
              only reveals itself. That is deliberate (see the note above — the
              page exists to be read, quoted and lifted), and it is also the
              reason this page needs no touch work at all beyond type.

              The type moves as it does everywhere: display question and serif
              answer both come down, and the answer stays LARGER than a sans
              paragraph would be at the same rank, because Cormorant's small
              x-height renders a given number visibly smaller. */}
          <dl className="mt-12 space-y-10 md:mt-16 md:space-y-12">
            {FAQS.map((f) => (
              <div key={f.q}>
                <dt className="font-display text-[1.15rem] md:text-2xl leading-snug text-navy">
                  {ta && f.qTa ? f.qTa : f.q}
                </dt>
                <dd className="mt-3 md:mt-4 font-serif text-[1.05rem] md:text-xl leading-relaxed text-navy/80">
                  {ta && f.aTa ? f.aTa : f.a}
                </dd>
                {f.source ? (
                  <p className="mt-3 text-[0.88rem] md:text-sm tracking-wide text-navy/45">
                    {ta && f.sourceTa ? f.sourceTa : f.source}
                  </p>
                ) : null}
              </div>
            ))}
          </dl>

          <div className="leaf-rule my-10 md:my-14" />

          <p className="font-serif text-[1.05rem] md:text-lg leading-relaxed text-navy/70">
            {t.sourcesNote}{" "}
            {/* `py-2` on an INLINE anchor grows the hit region without
                touching the line box — vertical padding does not affect an
                inline element's layout, only what it paints and what it
                catches. So the link is a ~48px target on a phone and the
                paragraph is set exactly as before. */}
            <Link
              href={L("/sources")}
              className="py-2 md:py-0 text-gold-dark underline underline-offset-4 decoration-gold/50 hover:decoration-gold-dark transition-colors"
            >
              {t.sourcesCta}
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
