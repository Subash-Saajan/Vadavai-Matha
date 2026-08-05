import type { Metadata } from "next";
import Link from "next/link";

import { firstLeafFor } from "@/lib/references";
import { JsonLd } from "@/components/JsonLd";
import { graph, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";
import { localePath } from "@/lib/locale";
import { publicLink, SOURCE_GROUPS, WEIGHING_NOTE } from "@/lib/sources";

/**
 * Sources & Further Reading.
 *
 * The single strongest trust signal on the site, and it costs nothing but
 * candour. See the note at the head of src/lib/sources.ts.
 */
export const generateMetadata = localizedMetadata("sources");

/**
 * The page's own chrome. The bibliography itself lives in src/lib/sources.ts,
 * where each entry carries its Tamil beside its English; these are the words
 * that belong to the page rather than to any source.
 */
const COPY = {
  en: {
    eyebrow: "Little Rome",
    title: "Sources & Further Reading",
    intro:
      "Everything on this website that makes a historical claim rests on a document. These are the documents — the Jesuit archives in Rome, the printed mission histories, the colonial gazetteers, the Vatican's own record of the baptism that took place here. Where we hold a book, we open it to the page the claim stands on, and stop there: these volumes range far beyond this village, and publishing the rest of them is not the parish's business. Where a source exists only on a shelf, we say so.",
    archiveOnly: " · archive only",
    online: " · free to read online",
    openLeaf: "Open the page ❧",
  },
  ta: {
    eyebrow: `சின்ன ரோமாபுரி`,
    title: `மூலங்களும் மேலதிக வாசிப்பும்`,
    intro: `இவ்விணையதளத்தில் ஒரு வரலாற்றுச் செய்தியைச் சொல்லும் ஒவ்வொன்றும் ஓர் ஆவணத்தின்மேல் நிற்கிறது. அந்த ஆவணங்கள் இவைதான் — உரோமையில் உள்ள இயேசு சபை ஆவணக்காப்பகங்கள், அச்சிடப்பட்ட பணிக்கள வரலாறுகள், காலனிய காலத்து மாவட்டக் கையேடுகள், இங்கே நிகழ்ந்த திருமுழுக்கைப் பற்றிய வத்திக்கானின் சொந்தப் பதிவு. ஒரு நூல் நம்மிடம் இருந்தால், அச்செய்தி எந்தப் பக்கத்தின்மேல் நிற்கிறதோ அப்பக்கத்தைத் திறந்து காட்டுகிறோம் — அத்துடன் நிற்கிறோம். இந்நூல்கள் இவ்வூரைத் தாண்டி வெகுதூரம் செல்பவை; அவற்றை முழுமையாக வெளியிடுவது இப்பங்கின் பணி அல்ல. ஒரு மூலம் ஒரு நூலகத்தின் அலமாரியில் மட்டுமே இருந்தால், அதையும் சொல்லிவிடுகிறோம்.`,
    archiveOnly: ` · ஆவணக்காப்பகத்தில் மட்டும்`,
    online: ` · இணையத்தில் இலவசமாக வாசிக்கலாம்`,
    openLeaf: `அப்பக்கத்தைத் திறக்க ❧`,
  },
} as const;

export default async function SourcesRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";
  const L = (p: string) => localePath(lang, p);
  const c = COPY[lang];

  /* Built per-locale here: a module-level graph is evaluated once at import,
     before any locale exists, so /ta emitted the English node. */
  const jsonLd = graph(pageNode("sources", "WebPage", lang), trailTo("sources", lang));
  // Tamil where we have it, English where we do not — a half-translated
  // bibliography still renders whole, and never renders blank.
  const t = (ta: string | undefined, en: string) =>
    lang === "ta" && ta ? ta : en;

  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="bg-cream text-navy">
        {/* Same masthead measurements as /faq and /acknowledgements — the three
            plain pages share this block, so they share the corrections. */}
        <div className="max-w-3xl mx-auto px-6 pt-28 pb-16 md:pt-40 md:pb-28">
          <p className="font-display tracking-[0.18em] md:tracking-[0.28em] text-xs md:text-sm uppercase text-gold-dark">
            {c.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-[clamp(1.85rem,7.4vw,2.25rem)] md:text-6xl leading-[1.05]">
            {c.title}
          </h1>
          <div className="leaf-rule my-6 md:my-8" />
          <p className="font-serif text-[1.12rem] md:text-2xl leading-relaxed text-navy/75">
            {c.intro}
          </p>

          {SOURCE_GROUPS.map((group) => (
            <div key={group.heading} className="mt-12 md:mt-16">
              {/* Group heads come down as well as the h1. At 24px against a
                  29px title they were within five pixels of the page heading,
                  which on a phone reads as two headings of the same rank
                  rather than a title and the sections under it. */}
              <h2 className="font-display text-[1.3rem] md:text-3xl leading-snug">
                {t(group.headingTa, group.heading)}
              </h2>
              {group.blurb ? (
                <p className="mt-4 font-serif text-[1.05rem] md:text-lg leading-relaxed text-navy/70">
                  {t(group.blurbTa, group.blurb)}
                </p>
              ) : null}

              <ul className="mt-6 space-y-7 md:mt-8 md:space-y-8">
                {group.items.map((s) => {
                  const href = publicLink(s.url);
                  return (
                  // The id is the anchor a citation elsewhere on the site links to
                  // (/sources#pate_gazetteer_1917). scroll-mt clears the fixed navbar,
                  // which would otherwise land the reader on top of the entry they came for.
                  <li
                    key={s.id}
                    id={s.id}
                    className="border-l border-gold/30 pl-4 md:pl-5 scroll-mt-24 md:scroll-mt-28 target:border-gold target:bg-gold/6 transition-colors"
                  >
                    <p className="font-display text-[1.02rem] md:text-lg leading-snug text-navy">
                      {s.author ? (
                        <span className="text-navy/60">{s.author} — </span>
                      ) : null}
                      {/* publicLink(), not s.url. Where the link would open the
                          whole volume the title is set as plain text — see the
                          full-volume rule in lib/sources.ts. The entry still
                          names the book in full, so a reader who wants it can
                          find it; we simply do not hand it over. */}
                      {href ? (
                        // `py-2` grows an inline link's hit region without
                        // altering the line box it sits in — a book title is
                        // one or two lines of 16px type, which is a 24px
                        // target otherwise.
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 md:py-0 text-gold-dark underline underline-offset-4 decoration-gold/40 hover:decoration-gold-dark transition-colors"
                        >
                          {s.title}
                        </a>
                      ) : (
                        s.title
                      )}
                    </p>
                    {/* Title, author and detail stay in the original on every
                        locale: they name real books a reader has to be able to
                        find in a catalogue. Only the note is translated. */}
                    {/* Imprint line. 14px at 50% ink is the site's densest
                        citation apparatus; it holds its size on a phone (14px
                        is the floor, not a target) but takes the extra
                        letter-spacing back — `tracking-wide` on a 300px
                        measure only costs it a line. */}
                    <p className="mt-1 text-sm tracking-normal md:tracking-wide text-navy/55 md:text-navy/50">
                      {s.detail}
                      {/* "free to read online" is claimed against the link the
                          reader is actually given, not against s.url — a book
                          whose volume link is withheld must not advertise a
                          door that isn't on the page. */}
                      {s.archiveOnly ? c.archiveOnly : href ? c.online : ""}
                    </p>
                    <p className="mt-3 font-serif text-[1.05rem] md:text-lg leading-relaxed text-navy/80">
                      {t(s.noteTa, s.note)}
                    </p>
                    {/* A bibliography that only names its books asks to be taken on
                        trust. Where we actually hold the book, this opens it — to the
                        page, with the sentence we leaned on set in dark ink and the rest
                        of the leaf still around it. */}
                    {(() => {
                      const leaf = firstLeafFor(s.id);
                      if (!leaf) return null;
                      return (
                        // 0.62rem is 9.9px, and this is the control that opens
                        // the actual page of the actual book — the thing the
                        // whole bibliography is arguing for. It was 9.9px of
                        // spaced caps in a ~19px-tall box: under the legibility
                        // floor and under half the minimum tap target, once per
                        // entry, on a page that is nothing but entries. Up to
                        // 11.2px with the tracking paying for the width, and
                        // `py-2` on the inline-flex box makes it a ~44px
                        // target. The `mt` comes down by the padding it gains
                        // so the entry does not grow.
                        <Link
                          href={L(`/reference/${leaf.era}/${leaf.dot}/${leaf.source}`)}
                          className="mt-1 py-2 md:mt-3 md:py-0 inline-flex items-center gap-2 font-display text-[0.7rem] tracking-[0.12em] md:text-[0.62rem] md:tracking-[0.2em] uppercase text-gold-dark hover:text-navy transition-colors"
                        >
                          {c.openLeaf}
                        </Link>
                      );
                    })()}
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* The part that actually earns the trust. */}
          <div className="mt-16 md:mt-20 border-t border-gold/30 pt-10 md:pt-12">
            <h2 className="font-display text-[1.3rem] md:text-3xl">
              {t(WEIGHING_NOTE.headingTa, WEIGHING_NOTE.heading)}
            </h2>
            <p className="mt-4 font-serif text-[1.05rem] md:text-lg leading-relaxed text-navy/75">
              {t(WEIGHING_NOTE.introTa, WEIGHING_NOTE.intro)}
            </p>

            <dl className="mt-8 space-y-7 md:mt-10 md:space-y-8">
              {WEIGHING_NOTE.tiers.map((tier) => (
                <div key={tier.label}>
                  <dt className="font-display tracking-wide text-sm uppercase text-gold-dark">
                    {t(tier.labelTa, tier.label)}
                  </dt>
                  <dd className="mt-3 font-serif text-[1.05rem] md:text-lg leading-relaxed text-navy/80">
                    {t(tier.bodyTa, tier.body)}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="leaf-rule my-10 md:my-12" />

            <p className="font-serif text-[1.05rem] md:text-lg italic leading-relaxed text-navy/65">
              {t(WEIGHING_NOTE.closingTa, WEIGHING_NOTE.closing)}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
