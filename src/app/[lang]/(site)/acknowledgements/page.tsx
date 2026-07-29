import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { graph, pageNode, trailTo } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { localePath } from "@/lib/locale";
import { CLOSING_NOTE, COPY, CREDITS, DRAFT } from "@/lib/acknowledgements";

/**
 * Acknowledgements.
 *
 * The sister page to /sources — that one names the documents, this one names
 * the people who found them. A masthead, not an essay: role left, names right,
 * one rule between each. The restraint is the point. See the rules at the head
 * of src/lib/acknowledgements.ts.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return pageMetadata(
    "acknowledgements",
    lang === "ta" ? "ta" : "en",
    // An unconfirmed list of real people must not reach a search result.
    DRAFT ? { robots: { index: false, follow: false } } : {},
  );
}

export default async function AcknowledgementsRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";
  const ta = lang === "ta";
  const c = COPY[lang];

  /* Built per-locale here: a module-level graph is evaluated once at import,
     before any locale exists, so /ta emitted the English node. */
  const jsonLd = graph(
    pageNode("acknowledgements", "WebPage", lang),
    trailTo("acknowledgements", lang),
  );
  const closing = CLOSING_NOTE[lang];

  return (
    <>
      {!DRAFT && <JsonLd data={jsonLd} />}

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

          {/* The masthead. Role and names share a baseline on desktop and stack
              on a phone; every name is set at the same size and weight. */}
          <dl className="mt-16 border-t border-gold/25">
            {CREDITS.map((credit) => (
              <div
                key={credit.role}
                className="grid grid-cols-1 md:grid-cols-[minmax(0,13rem)_1fr] gap-2 md:gap-8 border-b border-gold/25 py-8"
              >
                <dt className="font-display text-[0.62rem] md:text-[0.66rem] tracking-[0.22em] uppercase text-gold-dark md:pt-1.5">
                  {ta && credit.roleTa ? credit.roleTa : credit.role}
                </dt>
                <dd className="text-navy">
                  {credit.entries.length > 0 ? (
                    <ul className="space-y-5">
                      {/* Order is exactly as written in acknowledgements.ts —
                          no sorting here. It used to alphabetise, which took the
                          decision away from the people who know why one name
                          should sit before another. The page no longer claims an
                          alphabetical order, so the file must be edited with
                          care: whatever it says is what the reader sees. */}
                      {credit.entries.map((e) => (
                          <li key={e.names.join("|")}>
                            {/* Names who shared a piece of work sit on one line,
                                divided by a hairline rule with real space either
                                side. A drawn rule rather than a joining word: it
                                needs no Tamil equivalent, and it separates the
                                names without implying an order between them.
                                flex-wrap lets a long pair fall to a second line
                                on a phone without the rule stranding itself. */}
                            <span className="flex flex-wrap items-center gap-x-5 gap-y-1 font-display text-lg md:text-xl leading-snug">
                              {e.names.map((name, i) => (
                                <span key={name} className="flex items-center gap-x-5">
                                  {i > 0 && (
                                    <span
                                      aria-hidden="true"
                                      className="inline-block w-px h-5 bg-gold/45"
                                    />
                                  )}
                                  {(ta && e.namesTa?.[name]) || name}
                                </span>
                              ))}
                            </span>
                            <span className="mt-1 block font-serif text-base leading-relaxed text-navy/60">
                              {ta && e.noteTa ? e.noteTa : e.note}
                            </span>
                          </li>
                        ))}
                    </ul>
                  ) : (
                    <span className="font-serif text-base text-navy/45">
                      {ta && credit.pendingTa ? credit.pendingTa : credit.pending}
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-10 font-serif text-lg leading-relaxed text-navy/70">
            {c.also}
          </p>
          <p className="mt-6 text-sm leading-relaxed text-navy/45">
            {c.orderNote}
          </p>

          {DRAFT && (
            <p className="mt-6 font-display text-[0.62rem] tracking-[0.18em] uppercase text-gold-dark/70">
              {c.draftLine}
            </p>
          )}

          {/* The paragraph that does the real work. See CLOSING_NOTE. */}
          <div className="mt-16 border-t border-gold/30 pt-12">
            <h2 className="font-display text-2xl md:text-3xl">
              {closing.heading}
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-navy/75">
              {closing.body}
            </p>
            <Link
              href={localePath(lang, "/contact")}
              className="mt-6 inline-flex items-center gap-2 font-display text-[0.62rem] tracking-[0.2em] uppercase text-gold-dark hover:text-navy transition-colors"
            >
              {closing.cta} ❧
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
