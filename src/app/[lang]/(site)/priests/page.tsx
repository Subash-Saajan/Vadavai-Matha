import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { PriestRegister } from "@/components/sections/PriestRegister";
import { localePath } from "@/lib/locale";
import { PERIODS, TERM_COUNT } from "@/lib/priests";
import { bergenthal, buttari, graph, gregoire, pageNode, trailTo } from "@/lib/schema";
import { localizedMetadata } from "@/lib/seo";

/**
 * /priests — the succession of parish priests.
 *
 * Sixty-nine names since 1697, a documented life for about fifteen of them, and
 * a surviving likeness for eleven. The page is built around that asymmetry
 * rather than against it: see the note at the head of src/lib/priests.ts for
 * the three tiers, and PriestRegister.tsx for why most rows are deliberately
 * not links.
 *
 * Everything here renders on the server. The only client JavaScript on the page
 * is PageHero's entrance animation, which every other content route already
 * loads — so a page of sixty-nine rows costs the site nothing it wasn't already
 * paying.
 *
 * NOT YET DONE, and both deliberate rather than forgotten:
 *   · Tamil. The page chrome is English, as /sources' is. The register's own
 *     prose needs the tamil-localize skill, not a hand translation.
 *   · Per-priest pages at /priests/<slug>. Twelve of these men can carry one,
 *     and those pages are the real search prize (Bergenthal, Calini, Massour and
 *     Rossignol appear on no indexed page in any language). Until they exist,
 *     the illuminated entries hold their whole story inline — no link is drawn
 *     that would lead nowhere.
 */
export const generateMetadata = localizedMetadata("priests");

// Bergenthal is the one worth declaring: the architect of the church, resolved
// from the Rome catalogue of 1872 and the parish's own English history, and
// present on no other website in any language.
const jsonLd = graph(
  pageNode("priests", "AboutPage"),
  buttari,
  gregoire,
  bergenthal,
  trailTo("priests"),
);

export default async function PriestsRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";
  const L = (p: string) => localePath(lang, p);

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        label="The Parish Register"
        title="The Fathers of Vadavai"
        intro="Sixty-nine pastorates since 1697. Not one year of them without a priest."
        image="/images/architecture/archival.jpg"
        alt="A halftone press photograph of the twin-towered Holy Family church at Vadakkankulam, printed in the mid-twentieth century."
        imagePosition="50% 60%"
      />

      <section className="bg-cream text-navy">
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-24 md:pt-20 md:pb-28">
          {/* The paragraph that removes the confusion. A reader who understands
              this sentence will not wonder why one row carries a portrait and a
              paragraph and the next carries a name. */}
          <p className="font-serif text-xl leading-relaxed text-navy/80 md:text-2xl">
            This parish has numbered its priests since 1697, and the list now runs
            to sixty-nine — a few of them the second and third terms of the same
            man. It has kept the name of every one. For about fifteen the Jesuit
            archives in Rome, the French mission histories and the parish&apos;s own
            diaries preserve a life: what he built, what he refused, how he died.
            For the rest, what survives is the two things that mattered to the
            village — his name, and the years he stayed.
          </p>

          <div className="leaf-rule my-10" />

          <p className="font-serif text-lg leading-relaxed text-navy/70">
            The list below is the parish&apos;s own, numbered 1 to 69 and divided
            into the five periods it uses itself. Where the sources disagree — and
            over three hundred and twenty-eight years they disagree often, about
            the first priest&apos;s name, about the year a pastor died at sea — both
            readings are given rather than one chosen.{" "}
            <span className="text-navy/80">
              The rule under each set of years is the length of that pastorate:
            </span>{" "}
            a dash for a single year, the full stroke for Fr Thomassini&apos;s
            twenty-four.
          </p>

          {/* Wayfinding for a long page. Real anchors, no JavaScript. */}
          <nav aria-label="Jump to a period" className="mt-12 border-y border-gold/20 py-6">
            <p className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-gold-dark">
              Jump to
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              {PERIODS.map((p) => (
                <li key={p.numeral}>
                  <a
                    href={`#period-${p.numeral.toLowerCase()}`}
                    className="font-display text-[0.82rem] text-navy/70 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-navy hover:decoration-gold-dark"
                  >
                    {p.title}
                    <span className="ml-2 text-[0.7rem] tabular-nums text-navy/45">
                      {p.years}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#tombs"
                  className="font-display text-[0.82rem] text-navy/70 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-navy hover:decoration-gold-dark"
                >
                  They are buried here
                </a>
              </li>
            </ul>
          </nav>

          <div className="mt-16">
            <PriestRegister />
          </div>

          {/* ── What is missing, said out loud ─────────────────────────────────
              The same candour /sources trades on, and here it is also a request:
              the two blank roundels and the unreadable roster are things the
              village itself can fix, and nobody else can. */}
          <div className="mt-20 border-t border-gold/30 pt-14">
            <h2 className="font-display text-2xl leading-snug text-navy sm:text-3xl">
              What is still missing
            </h2>
            <p className="mt-4 font-serif text-lg leading-relaxed text-navy/75">
              This register is not finished, and it is better to say where the holes
              are than to let the page imply there are none.
            </p>
            <ul className="mt-8 space-y-5 font-serif text-lg leading-relaxed text-navy/75">
              <li className="border-l border-gold/30 pl-5">
                <span className="text-navy">Four faces.</span> The parish holds a
                photograph of every priest since 1982 except Fr Job De Rose and Fr
                Irudayaraj — the souvenir printed their roundels blank — and has
                none yet of Fr Martin Manuvel or Fr Joseph Christian. Their
                families almost certainly have them.
              </li>
              <li className="border-l border-gold/30 pl-5">
                <span className="text-navy">
                  About a hundred assistant priests.
                </span>{" "}
                The parish has the roster of every curate sent here since 1870,
                usually on his first posting. The only copy is a faintly printed
                souvenir page, and it cannot be read with enough confidence to
                publish a real man&apos;s name from it. It needs someone who knows
                these names to read it aloud against the scan.
              </li>
              <li className="border-l border-gold/30 pl-5">
                <span className="text-navy">
                  The priests and sisters this village gave.
                </span>{" "}
                Fifteen priests and eighteen sisters, including the first Vicar
                General of the Diocese of Thoothukudi, who was a son of
                Vadakkankulam. Same problem, same fix.
              </li>
            </ul>
            <p className="mt-8 font-serif text-lg leading-relaxed text-navy/75">
              If you can supply a photograph, correct a name or a date, or read one
              of those pages,{" "}
              <Link
                href={L("/contact")}
                className="text-gold-dark underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold-dark"
              >
                please write to the parish
              </Link>
              . Corrections are welcome and will be credited.
            </p>
          </div>

          <div className="leaf-rule my-12" />

          <p className="font-serif text-lg italic leading-relaxed text-navy/65">
            {TERM_COUNT} pastorates, {PERIODS.length} periods, three hundred and
            twenty-eight years, and no gap in the line.
          </p>
        </div>
      </section>
    </>
  );
}
