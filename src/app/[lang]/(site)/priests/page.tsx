import Link from "next/link";

import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/sections/PageHero";
import { PriestRegister } from "@/components/sections/PriestRegister";
import { localePath } from "@/lib/locale";
import { CHROME_TA, PERIODS, TERM_COUNT } from "@/lib/priests";
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
 * TAMIL — DONE (July 2026, via the tamil-localize skill). The register's own
 * prose, the period turns, the bishops, the tombs and this page's chrome all
 * carry `…Ta` siblings in src/lib/priests.ts, and everything falls back to
 * English when one is missing. The priests' `tamil` by-names and `plate`
 * strings were left exactly as the parish's own list prints them — they are
 * source data, not translation, and are shown beside the canonical Tamil rather
 * than corrected into it.
 *
 * STILL NOT DONE, and deliberate rather than forgotten:
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
export default async function PriestsRoute({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = raw === "ta" ? "ta" : "en";
  const ta = lang === "ta";

  /* Built per-locale here: a module-level graph is evaluated once at import,
     before any locale exists, so /ta emitted the English node. */
  const jsonLd = graph(
    pageNode("priests", "AboutPage", lang),
    buttari,
    gregoire,
    bergenthal,
    trailTo("priests", lang),
  );
  const L = (p: string) => localePath(lang, p);

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHero
        label={ta ? CHROME_TA.heroLabel : "The Parish Register"}
        title={ta ? CHROME_TA.heroTitle : "The Fathers of Vadavai"}
        intro={
          ta
            ? CHROME_TA.heroIntro
            : "Sixty-nine pastorates since 1697. Not one year of them without a priest."
        }
        image="/images/architecture/archival.jpg"
        alt={
          ta
            ? CHROME_TA.heroAlt
            : "A halftone press photograph of the twin-towered Holy Family church at Vadakkankulam, printed in the mid-twentieth century."
        }
        imagePosition="50% 60%"
      />

      <section className="bg-cream text-navy">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-16 md:pt-20 md:pb-28">
          {/* The paragraph that removes the confusion. A reader who understands
              this sentence will not wonder why one row carries a portrait and a
              paragraph and the next carries a name.

              It stays the largest body type on the page — a lead, deliberately
              above the register's own prose — but `text-xl` was a monitor's
              lead: 20px of Cormorant for a hundred-word paragraph is fifteen
              lines on a phone before the reader has reached anything he came
              for. 18.4px keeps it clearly a lead and gives back three lines. */}
          <p className={`${ta ? "font-tamil" : "font-serif"} text-[1.15rem] leading-relaxed text-navy/80 md:text-2xl`}>
            {ta ? (
              CHROME_TA.intro1
            ) : (
              <>
                This parish has numbered its priests since 1697, and the list now runs
                to sixty-nine, a few of them the second and third terms of the same
                man. It has kept the name of every one. For about fifteen the Jesuit
                archives in Rome, the French mission histories and the parish&apos;s own
                diaries preserve a life: what he built, what he refused, how he died.
                For the rest, what survives is the two things that mattered to the
                village: his name, and the years he stayed.
              </>
            )}
          </p>

          <div className="leaf-rule my-8 md:my-10" />

          <p className={`${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/70 md:text-lg`}>
            {ta ? (
              <>
                {CHROME_TA.intro2a}{" "}
                <span className="text-navy/80">{CHROME_TA.intro2b}</span>{" "}
                {CHROME_TA.intro2c}
              </>
            ) : (
              <>
                The list below is the parish&apos;s own, numbered 1 to 69 and divided
                into the five periods it uses itself. Where the sources disagree, both
                readings are given rather than one chosen. Over three hundred and
                twenty-eight years they disagree often: about the first priest&apos;s
                name, about the year a pastor died at sea.{" "}
                <span className="text-navy/80">
                  The rule under each set of years is the length of that pastorate:
                </span>{" "}
                a dash for a single year, the full stroke for Fr Thomassini&apos;s
                twenty-four.
              </>
            )}
          </p>

          {/* Wayfinding for a long page. Real anchors, no JavaScript — a
              contents block, not a row of inline links: each entry gets its
              own full-width line so it reads as a section, not a phrase. */}
          {/* ⚠ EVERY ROW OF THIS CONTENTS BLOCK WAS AN UNDERSIZED TAP TARGET.
              `py-3` around a 14.4px line gives a 45px box on paper — but the
              line is `items-baseline` inside a flex row, so what the finger
              actually gets is the 22px line box plus the padding, and six
              consecutive links of that height with a hairline between them is
              the classic phone mis-tap: the reader lands on Period IV and is
              taken to Period III.

              `py-3.5` below `md` clears 44px comfortably, and the block's own
              height grows by 6px over six rows — nothing, on a page this long.
              The title also comes up half a step, because on a page whose only
              navigation this is, "The Jesuits Return" should not be set smaller
              than the footnotes further down. */}
          <nav
            aria-label={ta ? CHROME_TA.jumpAria : "Jump to a period"}
            className="mt-10 border-y border-gold/20 md:mt-12"
          >
            <p
              className={`pt-6 ${
                ta ? "font-tamil" : "font-display uppercase tracking-[0.16em] md:tracking-[0.3em]"
              } text-[0.68rem] text-gold-dark md:text-[0.6rem]`}
            >
              {ta ? CHROME_TA.contents : "Contents"}
            </p>
            <ul className="mt-3 mb-2 divide-y divide-gold/15">
              {PERIODS.map((p) => (
                <li key={p.numeral}>
                  <a
                    href={`#period-${p.numeral.toLowerCase()}`}
                    className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:bg-gold/5 md:py-3"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="w-6 shrink-0 font-display text-[0.72rem] tabular-nums text-gold-dark/70">
                        {p.numeral}
                      </span>
                      <span
                        className={`${
                          ta ? "font-tamil" : "font-display"
                        } text-[0.95rem] text-navy/75 underline decoration-gold/0 underline-offset-4 transition-colors group-hover:text-navy group-hover:decoration-gold-dark sm:text-base`}
                      >
                        {ta && p.titleTa ? p.titleTa : p.title}
                      </span>
                    </span>
                    <span className="shrink-0 whitespace-nowrap font-display text-[0.76rem] tabular-nums text-navy/45 md:text-[0.7rem]">
                      {p.years}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#tombs"
                  className="group flex items-baseline justify-between gap-4 py-3.5 transition-colors hover:bg-gold/5 md:py-3"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="w-6 shrink-0" aria-hidden="true" />
                    <span
                      className={`${
                        ta ? "font-tamil" : "font-display"
                      } text-[0.95rem] text-navy/75 underline decoration-gold/0 underline-offset-4 transition-colors group-hover:text-navy group-hover:decoration-gold-dark sm:text-base`}
                    >
                      {ta ? CHROME_TA.tombsTitle : "They are buried here"}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="mt-12 md:mt-16">
            <PriestRegister lang={lang} />
          </div>

          {/* ── What is missing, said out loud ─────────────────────────────────
              The same candour /sources trades on, and here it is also a request:
              the two blank roundels and the unreadable roster are things the
              village itself can fix, and nobody else can. */}
          <div className="mt-14 border-t border-gold/30 pt-10 md:mt-20 md:pt-14">
            <h2 className={`${ta ? "font-tamil" : "font-display"} text-2xl leading-snug text-navy sm:text-3xl`}>
              {ta ? CHROME_TA.missingTitle : "What is still missing"}
            </h2>
            <p className={`mt-4 ${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/75 md:text-lg`}>
              {ta ? (
                CHROME_TA.missingIntro
              ) : (
                <>
                  This register is not finished, and it is better to say where the holes
                  are than to let the page imply there are none.
                </>
              )}
            </p>
            <ul
              className={`mt-7 space-y-5 ${
                ta ? "font-tamil" : "font-serif"
              } text-[1.05rem] leading-relaxed text-navy/75 md:mt-8 md:text-lg`}
            >
              <li className="border-l border-gold/30 pl-4 sm:pl-5">
                <span className="text-navy">
                  {ta ? CHROME_TA.missingFacesLead : "Two faces."}
                </span>{" "}
                {ta ? (
                  CHROME_TA.missingFaces
                ) : (
                  <>
                    The parish&apos;s own
                    150th-anniversary souvenir printed the photograph roundels of Fr
                    Job De Rose and Fr Irudayaraj blank. The diocese&apos;s own website
                    does not have them either, though it does hold portraits, used
                    here, of some more recent priests the souvenir itself is missing.
                    The parish almost certainly still has better prints than either
                    source.
                  </>
                )}
              </li>
              <li className="border-l border-gold/30 pl-4 sm:pl-5">
                <span className="text-navy">
                  {ta ? CHROME_TA.missingAssistantsLead : "About a hundred assistant priests."}
                </span>{" "}
                {ta ? (
                  CHROME_TA.missingAssistants
                ) : (
                  <>
                    The parish has the roster of every curate sent here since 1870,
                    usually on his first posting. The only copy is a faintly printed
                    souvenir page, and it cannot be read with enough confidence to
                    publish a real man&apos;s name from it. It needs someone who knows
                    these names to read it aloud against the scan.
                  </>
                )}
              </li>
              <li className="border-l border-gold/30 pl-4 sm:pl-5">
                <span className="text-navy">
                  {ta
                    ? CHROME_TA.missingVocationsLead
                    : "The priests and sisters this village gave."}
                </span>{" "}
                {ta ? (
                  CHROME_TA.missingVocations
                ) : (
                  <>
                    Fifteen priests and eighteen sisters, including the first Vicar
                    General of the Diocese of Thoothukudi, who was a son of
                    Vadakkankulam. Same problem, same fix.
                  </>
                )}
              </li>
            </ul>
            <p className={`mt-8 ${ta ? "font-tamil" : "font-serif"} text-[1.05rem] leading-relaxed text-navy/75 md:text-lg`}>
              {ta ? CHROME_TA.missingAskA : (
                <>
                  If you can supply a photograph, correct a name or a date, or read one
                  of those pages,
                </>
              )}{" "}
              {/* `py-2 -my-2`: the page's one call to action, and it is a
                  phrase inside a running paragraph, so its hit area was the
                  17px line box. Vertical padding on an inline box overflows the
                  line rather than growing it, which is exactly what is wanted
                  here — the target reaches 44px and the paragraph's leading is
                  untouched. */}
              <Link
                href={L("/contact")}
                className="py-2 -my-2 text-gold-dark underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold-dark"
              >
                {ta ? CHROME_TA.missingAskLink : "please write to the parish"}
              </Link>
              {ta ? CHROME_TA.missingAskB : ". Corrections are welcome and will be credited."}
            </p>
          </div>

          <div className="leaf-rule my-10 md:my-12" />

          {/* No italic in Tamil — the face has no true italic and the browser
              would synthesise a slant, which reads as a rendering fault. */}
          <p className={`${ta ? "font-tamil" : "font-serif italic"} text-[1.05rem] leading-relaxed text-navy/65 md:text-lg`}>
            {ta ? (
              CHROME_TA.closing(TERM_COUNT, PERIODS.length)
            ) : (
              <>
                {TERM_COUNT} pastorates, {PERIODS.length} periods, three hundred and
                twenty-eight years, and no gap in the line.
              </>
            )}
          </p>
        </div>
      </section>
    </>
  );
}
