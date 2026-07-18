import type { Metadata } from "next";
import Link from "next/link";

import { firstLeafFor } from "@/lib/references";
import { JsonLd } from "@/components/JsonLd";
import { graph, pageNode, trailTo } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { SOURCE_GROUPS, WEIGHING_NOTE } from "@/lib/sources";

/**
 * Sources & Further Reading.
 *
 * The single strongest trust signal on the site, and it costs nothing but
 * candour. See the note at the head of src/lib/sources.ts.
 */
export const metadata: Metadata = pageMetadata("sources");

const jsonLd = graph(pageNode("sources"), trailTo("sources"));

export default function SourcesRoute() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <section className="bg-cream text-navy">
        <div className="max-w-3xl mx-auto px-6 pt-32 pb-20 md:pt-40 md:pb-28">
          <p className="font-display tracking-[0.28em] text-xs md:text-sm uppercase text-gold-dark">
            Little Rome
          </p>
          <h1 className="mt-5 font-display text-4xl md:text-6xl leading-[1.05]">
            Sources &amp; Further Reading
          </h1>
          <div className="leaf-rule my-8" />
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-navy/75">
            Everything on this website that makes a historical claim rests on a
            document. These are the documents — the Jesuit archives in Rome, the
            printed mission histories, the colonial gazetteers, the Vatican&apos;s
            own record of the baptism that took place here. Where a source can be
            read online, we link it. Where it exists only on a shelf, we say so.
          </p>

          {SOURCE_GROUPS.map((group) => (
            <div key={group.heading} className="mt-16">
              <h2 className="font-display text-2xl md:text-3xl leading-snug">
                {group.heading}
              </h2>
              {group.blurb ? (
                <p className="mt-4 font-serif text-lg leading-relaxed text-navy/70">
                  {group.blurb}
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
                    <p className="mt-1 text-sm tracking-wide text-navy/50">
                      {s.detail}
                      {s.archiveOnly ? " · archive only" : s.url ? " · free to read online" : ""}
                    </p>
                    <p className="mt-3 font-serif text-lg leading-relaxed text-navy/80">
                      {s.note}
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
                          href={`/reference/${leaf.era}/${leaf.dot}/${leaf.source}`}
                          className="mt-3 inline-flex items-center gap-2 font-display text-[0.62rem] tracking-[0.2em] uppercase text-gold-dark hover:text-navy transition-colors"
                        >
                          Open the page ❧
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
              {WEIGHING_NOTE.heading}
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-navy/75">
              {WEIGHING_NOTE.intro}
            </p>

            <dl className="mt-10 space-y-8">
              {WEIGHING_NOTE.tiers.map((t) => (
                <div key={t.label}>
                  <dt className="font-display tracking-wide text-sm uppercase text-gold-dark">
                    {t.label}
                  </dt>
                  <dd className="mt-3 font-serif text-lg leading-relaxed text-navy/80">
                    {t.body}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="leaf-rule my-12" />

            <p className="font-serif text-lg italic leading-relaxed text-navy/65">
              {WEIGHING_NOTE.closing}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
