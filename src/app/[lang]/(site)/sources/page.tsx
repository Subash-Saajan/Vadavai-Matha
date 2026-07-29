import type { Metadata } from "next";
import Link from "next/link";

import { firstLeafFor } from "@/lib/references";
import { JsonLd } from "@/components/JsonLd";
import { graph, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";
import { localePath } from "@/lib/locale";
import { SOURCE_GROUPS, WEIGHING_NOTE } from "@/lib/sources";

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
      "Everything on this website that makes a historical claim rests on a document. These are the documents — the Jesuit archives in Rome, the printed mission histories, the colonial gazetteers, the Vatican's own record of the baptism that took place here. Where a source can be read online, we link it. Where it exists only on a shelf, we say so.",
    archiveOnly: " · archive only",
    online: " · free to read online",
    openLeaf: "Open the page ❧",
  },
  ta: {
    eyebrow: `சின்ன ரோமாபுரி`,
    title: `மூலங்களும் மேலதிக வாசிப்பும்`,
    intro: `இவ்விணையதளத்தில் ஒரு வரலாற்றுச் செய்தியைச் சொல்லும் ஒவ்வொன்றும் ஓர் ஆவணத்தின்மேல் நிற்கிறது. அந்த ஆவணங்கள் இவைதான் — உரோமையில் உள்ள இயேசு சபை ஆவணக்காப்பகங்கள், அச்சிடப்பட்ட பணிக்கள வரலாறுகள், காலனிய காலத்து மாவட்டக் கையேடுகள், இங்கே நிகழ்ந்த திருமுழுக்கைப் பற்றிய வத்திக்கானின் சொந்தப் பதிவு. ஒரு மூலத்தை இணையத்தில் வாசிக்க முடியுமானால், அதற்கான இணைப்பைத் தருகிறோம். அது ஒரு நூலகத்தின் அலமாரியில் மட்டுமே இருந்தால், அதையும் சொல்லிவிடுகிறோம்.`,
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
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <p className="font-display tracking-[0.28em] text-xs md:text-sm uppercase text-gold-dark">
            {c.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05]">
            {c.title}
          </h1>
          <div className="leaf-rule my-8" />
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-navy/75">
            {c.intro}
          </p>

          {SOURCE_GROUPS.map((group) => (
            <div key={group.heading} className="mt-16">
              <h2 className="font-display text-2xl md:text-3xl leading-snug">
                {t(group.headingTa, group.heading)}
              </h2>
              {group.blurb ? (
                <p className="mt-4 font-serif text-lg leading-relaxed text-navy/70">
                  {t(group.blurbTa, group.blurb)}
                </p>
              ) : null}

              <ul className="mt-8 space-y-8">
                {group.items.map((s) => (
                  // The id is the anchor a citation elsewhere on the site links to
                  // (/sources#pate_gazetteer_1917). scroll-mt clears the fixed navbar,
                  // which would otherwise land the reader on top of the entry they came for.
                  <li
                    key={s.id}
                    id={s.id}
                    className="border-l border-gold/30 pl-5 scroll-mt-28 target:border-gold target:bg-gold/6 transition-colors"
                  >
                    <p className="font-display text-lg leading-snug text-navy">
                      {s.author ? (
                        <span className="text-navy/60">{s.author} — </span>
                      ) : null}
                      {s.url ? (
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gold-dark underline underline-offset-4 decoration-gold/40 hover:decoration-gold-dark transition-colors"
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
                    <p className="mt-1 text-sm tracking-wide text-navy/50">
                      {s.detail}
                      {s.archiveOnly ? c.archiveOnly : s.url ? c.online : ""}
                    </p>
                    <p className="mt-3 font-serif text-lg leading-relaxed text-navy/80">
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
                        <Link
                          href={L(`/reference/${leaf.era}/${leaf.dot}/${leaf.source}`)}
                          className="mt-3 inline-flex items-center gap-2 font-display text-[0.62rem] tracking-[0.2em] uppercase text-gold-dark hover:text-navy transition-colors"
                        >
                          {c.openLeaf}
                        </Link>
                      );
                    })()}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* The part that actually earns the trust. */}
          <div className="mt-20 border-t border-gold/30 pt-12">
            <h2 className="font-display text-2xl md:text-3xl">
              {t(WEIGHING_NOTE.headingTa, WEIGHING_NOTE.heading)}
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-navy/75">
              {t(WEIGHING_NOTE.introTa, WEIGHING_NOTE.intro)}
            </p>

            <dl className="mt-10 space-y-8">
              {WEIGHING_NOTE.tiers.map((tier) => (
                <div key={tier.label}>
                  <dt className="font-display tracking-wide text-sm uppercase text-gold-dark">
                    {t(tier.labelTa, tier.label)}
                  </dt>
                  <dd className="mt-3 font-serif text-lg leading-relaxed text-navy/80">
                    {t(tier.bodyTa, tier.body)}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="leaf-rule my-12" />

            <p className="font-serif text-lg italic leading-relaxed text-navy/65">
              {t(WEIGHING_NOTE.closingTa, WEIGHING_NOTE.closing)}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
