import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BookLeaf } from "@/components/reference/BookLeaf";
import { JsonLd } from "@/components/JsonLd";
import { citationsFor, SOURCE_SHORT, TIER_LABEL } from "@/lib/citations";
import { dict } from "@/lib/i18n";
import { allLeafKeys, getLeaf, siblingsOf } from "@/lib/references";
import { SOURCE_INDEX } from "@/lib/sources";
import { abs } from "@/lib/seo";

/**
 * One citation, opened.
 *
 * /history makes a claim and stamps it "Pate 1917". This is the page that makes
 * good on the stamp: the claim at the top, and under it the actual leaf of the
 * actual book, with the sentence we leaned on set in dark ink and the rest of the
 * printed page still there around it.
 *
 * The order on this page is the argument. Claim first, evidence second — never
 * the reverse. A reader must be able to see what was asserted before they see
 * what supports it, because the only interesting question is whether the second
 * really carries the first. Where it doesn't, `establishes` says so out loud.
 */

type Params = { era: string; dot: string; source: string };

const moment = (era: string, dot: number) => {
  const e = dict.en.history.eras.find((x) => x.id === era);
  return e ? { era: e, dot: e.dots[dot] } : null;
};

export function generateStaticParams() {
  return allLeafKeys();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { era, dot, source } = await params;
  const leaf = getLeaf(era, Number(dot), source);
  const m = moment(era, Number(dot));
  if (!leaf || !m?.dot) return {};

  const title = `${m.dot.year} — ${leaf.short}`;
  const description = leaf.quote
    ? `The passage this moment rests on: ${leaf.quote.slice(0, 155).trim()}…`
    : `${m.dot.title} — the source behind the claim.`;

  return {
    title,
    description,
    alternates: { canonical: `/reference/${era}/${dot}/${source}` },
    // A leaf is only meaningful beside its moment. Let Google keep the history
    // page as the destination and treat these as the working-out.
    robots: { index: false, follow: true },
  };
};

export default async function ReferencePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { era, dot: dotStr, source } = await params;
  const dotIndex = Number(dotStr);
  const leaf = getLeaf(era, dotIndex, source);
  const m = moment(era, dotIndex);
  const cite = citationsFor(era, dotIndex);

  if (!leaf || !m?.dot || !cite) notFound();

  const siblings = siblingsOf(era, dotIndex);
  const biblio = SOURCE_INDEX[source];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Claim",
          text: m.dot.body,
          appearance: { "@type": "WebPage", url: abs("/history") },
          citation: {
            "@type": "CreativeWork",
            name: leaf.title,
            description: leaf.imprint,
            ...(biblio?.url ? { url: biblio.url } : {}),
          },
        }}
      />

      <main className="ref-page">
        <div className="ref-inner">
          {/* ── The claim. First, and on its own. ── */}
          <nav className="ref-crumb">
            <Link href="/history">The History</Link>
            <span aria-hidden>·</span>
            <span>{m.era.heading}</span>
          </nav>

          <header className="ref-claim">
            <p className="ref-year">{m.dot.year}</p>
            <h1 className="ref-title">{m.dot.title}</h1>
            <p className="ref-body">{m.dot.body}</p>
            <div className="ref-tier-row">
              <span className={`ref-tier ref-tier--${cite.tier}`}>
                {TIER_LABEL[cite.tier].en}
              </span>
              <span className="ref-tier-note">
                {siblings.length === 1
                  ? "This moment rests on one source."
                  : `This moment rests on ${siblings.length} sources.`}
              </span>
            </div>
          </header>

          {/* ── Which book you are reading, and how to reach the others ── */}
          {siblings.length > 1 && (
            <nav className="ref-tabs" aria-label="The sources behind this moment">
              {siblings.map((sid) => {
                const active = sid === source;
                return (
                  <Link
                    key={sid}
                    href={`/reference/${era}/${dotIndex}/${sid}`}
                    className={`ref-tab ${active ? "is-active" : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {SOURCE_SHORT[sid] ?? sid}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* ── The evidence. ── */}
          <BookLeaf leaf={leaf} />

          {/* What the book actually settles — including where it settles less
              than the moment above claims. This is the sentence that makes the
              page worth having; without it we are just decorating a footnote. */}
          {leaf.establishes && (
            <section className="ref-establishes">
              <p className="ref-establishes-label">What this source establishes</p>
              <p className="ref-establishes-body">{leaf.establishes}</p>
            </section>
          )}

          <footer className="ref-foot">
            <Link href="/history" className="ref-back">
              ← Back to the history
            </Link>
            <Link href={`/sources#${source}`} className="ref-back">
              This book in the bibliography →
            </Link>
            {biblio?.url && (
              <a
                href={biblio.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ref-back"
              >
                Read the whole book ↗
              </a>
            )}
          </footer>
        </div>
      </main>

      <style>{`
        /* The desk the leaf lies on: a deeper parchment than the site's cream,
           so the sheet reads as an object placed on a surface rather than a panel
           welded to the background. */
        .ref-page {
          min-height: 100vh;
          background:
            radial-gradient(ellipse 90% 60% at 50% 0%, rgba(196,160,73,.07), transparent 70%),
            linear-gradient(180deg, #ece2cd 0%, #e4d8bf 100%);
          padding: 8.5rem 1.1rem 6rem;
        }
        .ref-inner { max-width: 44rem; margin: 0 auto; }

        .ref-crumb {
          display: flex; align-items: center; gap: .55rem;
          font-family: var(--font-display), serif;
          font-size: .6rem; letter-spacing: .24em; text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1.6rem;
        }
        .ref-crumb a { color: var(--gold-dark); text-decoration: none; }
        .ref-crumb a:hover { text-decoration: underline; text-underline-offset: 4px; }

        /* ── The claim ── */
        .ref-claim { margin-bottom: 2.4rem; }
        .ref-year {
          font-family: var(--font-display), serif;
          font-size: clamp(2.1rem, 7vw, 3.1rem);
          line-height: 1;
          color: var(--gold-dark);
        }
        .ref-title {
          margin-top: .7rem;
          font-family: var(--font-serif), Georgia, serif;
          font-size: clamp(1.55rem, 5vw, 2.1rem);
          line-height: 1.25;
          color: var(--navy);
        }
        .ref-body {
          margin-top: 1rem;
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.08rem;
          line-height: 1.75;
          color: rgba(28,26,21,.72);
        }
        .ref-tier-row {
          margin-top: 1.3rem;
          display: flex; flex-wrap: wrap; align-items: center; gap: .7rem;
        }
        .ref-tier {
          font-family: var(--font-display), serif;
          font-size: .56rem; letter-spacing: .26em; text-transform: uppercase;
          line-height: 1; padding: .4rem .65rem .34rem; border-radius: 9999px;
          white-space: nowrap;
        }
        .ref-tier--documented {
          color: var(--gold-dark);
          background: rgba(196,160,73,.15);
          box-shadow: inset 0 0 0 1px rgba(196,160,73,.4);
        }
        .ref-tier--tradition {
          color: var(--text-muted);
          box-shadow: inset 0 0 0 1px rgba(111,102,80,.3);
        }
        .ref-tier--devotion {
          color: var(--gold-dark);
          box-shadow: inset 0 0 0 1px rgba(196,160,73,.32);
        }
        .ref-tier-note {
          font-family: var(--font-serif), Georgia, serif;
          font-size: .92rem; font-style: italic; color: var(--text-muted);
        }

        /* ── Flipping between the books behind one moment ── */
        .ref-tabs {
          display: flex; flex-wrap: wrap; gap: .4rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.3rem;
          border-bottom: 1px solid rgba(196,160,73,.28);
        }
        .ref-tab {
          font-family: var(--font-display), serif;
          font-size: .62rem; letter-spacing: .12em;
          padding: .5rem .8rem .44rem;
          border-radius: 9999px;
          color: var(--text-muted);
          text-decoration: none;
          border: 1px solid transparent;
          transition: color .3s ease, border-color .3s ease, background .3s ease;
        }
        .ref-tab:hover { color: var(--gold-dark); border-color: rgba(196,160,73,.35); }
        .ref-tab.is-active {
          color: #6f5620;
          background: rgba(196,160,73,.16);
          border-color: rgba(196,160,73,.5);
        }

        /* ── What the book actually settles ── */
        .ref-establishes {
          margin-top: 2rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(196,160,73,.3);
        }
        .ref-establishes-label {
          font-family: var(--font-display), serif;
          font-size: .58rem; letter-spacing: .28em; text-transform: uppercase;
          color: var(--gold-dark); margin-bottom: .6rem;
        }
        .ref-establishes-body {
          font-family: var(--font-serif), Georgia, serif;
          font-size: 1.05rem; line-height: 1.75; color: rgba(28,26,21,.78);
        }

        .ref-foot {
          margin-top: 2.6rem; padding-top: 1.4rem;
          border-top: 1px solid rgba(28,26,21,.1);
          display: flex; flex-wrap: wrap; gap: 1.4rem;
        }
        .ref-back {
          font-family: var(--font-display), serif;
          font-size: .62rem; letter-spacing: .16em; text-transform: uppercase;
          color: var(--gold-dark); text-decoration: none;
        }
        .ref-back:hover { text-decoration: underline; text-underline-offset: 5px; }

        @media (max-width: 640px) {
          .ref-page { padding-top: 6.5rem; }
        }
      `}</style>
    </>
  );
}
