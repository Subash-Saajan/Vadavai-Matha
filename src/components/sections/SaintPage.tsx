"use client";

import { useRef, useEffect } from "react";
import { Link } from "@/components/LocaleLink";
import Image from "next/image";
import { gsap, DESKTOP, revealY } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import { SOURCE_SHORT, TIER_LABEL, type Tier } from "@/lib/citations";
import { SOURCE_INDEX } from "@/lib/sources";

/**
 * The shape both saints' pages are built in.
 *
 * WHY THE TWO PAGES ARE ONE COMPONENT. They were written as two, and the second
 * was a copy of the first with the nouns changed: same hero, same facts strip,
 * same chapters, same evidence block, same bond band, same citation line. Two
 * copies of a layout are two layouts that will disagree within a month — one
 * gets a fix, the other does not, and the site quietly stops looking like one
 * site. Everything that actually differs between St John de Britto and St
 * Devasahayam Pillai is DATA: the dictionary slice, the hero photograph, which
 * sources each chapter rests on, and which painting goes with it.
 *
 * WHAT THE PAGES ARE FOR. Each has to do two things that pull against each
 * other: tell a saint's story with the warmth it deserves, and be honest about
 * what the story rests on. They do both the way /history does — the story runs
 * above the line, the evidence is printed under it, tier and all. It matters
 * most that the tiers are HONEST, because the two saints come out differently:
 * de Britto's founding of this parish is memory, and Devasahayam's baptism here
 * is recorded by the Holy See. Neither page may borrow the other's confidence.
 *
 * THE PAINTINGS ARE MOSTLY THE HISTORY PAGE'S OWN. Those eras were painted
 * moment by moment; the canvases that show these two men are reused here rather
 * than reinvented, so the pages agree visually as well as factually. Which
 * chapter gets which painting is declared in lib/saintSources.ts, never derived
 * from position in an array.
 */
export type SaintContent = {
  back: string;
  label: string;
  name: string;
  epithet: string;
  intro: string;
  feast: string;
  canonised: string;
  facts: readonly { readonly label: string; readonly value: string }[];
  quote: string;
  quoteAttribution: string;
  lifeLabel: string;
  lifeTitle: string;
  lifeIntro: string;
  noteLabel: string;
  sections: readonly {
    readonly key: string;
    readonly heading: string;
    readonly body: string;
    readonly note: string;
  }[];
  evidence: {
    readonly label: string;
    readonly title: string;
    readonly intro: string;
    readonly closing: string;
    readonly rows: readonly {
      readonly tier: Tier;
      readonly heading: string;
      readonly body: string;
    }[];
  };
  bond: {
    readonly label: string;
    readonly title: string;
    readonly intro: string;
    readonly pillars: readonly {
      readonly heading: string;
      readonly body: string;
    }[];
  };
  today: {
    readonly label: string;
    readonly title: string;
    readonly intro: string;
    readonly items: readonly {
      readonly heading: string;
      readonly body: string;
    }[];
  };
  related: {
    readonly heading: string;
    readonly items: readonly {
      readonly title: string;
      readonly body: string;
      readonly href: string;
      readonly cta: string;
    }[];
  };
  sources: {
    readonly heading: string;
    readonly body: string;
    readonly chipsLabel: string;
  };
};

type ResolvedCite = {
  tier: Tier;
  photo?: string;
  sources: { id: string }[];
};

type Props = {
  content: SaintContent;
  /** Resolves a chapter slug to its tier, witnesses and painting. */
  citeFor: (key: string) => ResolvedCite | undefined;
  /** Every source the page leans on, once, already ranked by authority. */
  bibliography: readonly string[];
  heroImage: string;
  heroAlt: string;
  heroPosition?: string;
  /**
   * Alt text for a chapter's painting, resolved by the caller.
   *
   * MUST fall back to something, never to "". The alts are keyed by the same
   * slug as the chapter, and an early draft of the de Britto page keyed the
   * prison painting `prison` while its chapter was `oriyur` — which typechecked
   * perfectly and would have shipped a real content image, in both languages,
   * with no alt at all. A wrong-but-present alt is a bug someone notices; an
   * empty one is not.
   */
  altFor: (key: string, heading: string) => string;
};

/**
 * The citation line under a chapter: the honest tier, then the witnesses,
 * strongest first. Chips go to the bibliography anchor on /sources.
 *
 * Deliberately NOT the /reference deep-link the history page uses. Those URLs
 * are keyed to an era and a dot INDEX, so pointing at them from here would tie
 * these chapters to the ordering of a different page's array — exactly the
 * coupling lib/saintSources.ts was written to avoid.
 */
function Citation({ tier, sources }: { tier: Tier; sources: { id: string }[] }) {
  const { lang } = useLang();
  return (
    <div className="saint-cite">
      <span className={`saint-tier saint-tier--${tier}`}>{TIER_LABEL[tier][lang]}</span>
      {sources.map((s) => {
        const full = SOURCE_INDEX[s.id];
        return (
          <Link
            key={s.id}
            href={`/sources#${s.id}`}
            /* `py-2 -my-2` below `md` only — see the long note on the
               bibliography chips at the foot of this file. A citation chip is
               deliberately a word rather than a button, which leaves it with a
               15px-tall tap target on the one device that taps. The negative
               margin returns the height to the flex line so the row is
               unchanged, and both are gone by `md`. */
            className="saint-chip py-2 -my-2 md:py-0 md:my-0"
            title={`${full?.author ? full.author + " — " : ""}${full?.title ?? ""}${
              full?.detail ? ` (${full.detail})` : ""
            }`}
          >
            {SOURCE_SHORT[s.id] ?? full?.title ?? s.id}
          </Link>
        );
      })}
    </div>
  );
}

/**
 * A chapter's prose. Blank lines in the dictionary become real paragraphs —
 * some chapters turn from the narrative to the evidence halfway through, and
 * that turn needs a paragraph break rather than a wall of text.
 */
function Prose({ body }: { body: string }) {
  return (
    <>
      {/* The site's mobile sans body size. 18px of Geist in a 340px column sets
          about 33 characters a line and the readable band starts at 35 — these
          chapters are the longest continuous prose on either page, so the
          measure matters here more than anywhere else on them. Full note in
          Patroness.tsx. */}
      {body.split("\n\n").map((para, i) => (
        <p
          key={i}
          className={`text-text-muted text-[0.98rem] md:text-lg leading-relaxed${i ? " mt-5" : ""}`}
        >
          {para}
        </p>
      ))}
    </>
  );
}

export function SaintPage({
  content: s,
  citeFor,
  bibliography,
  heroImage,
  heroAlt,
  heroPosition,
  altFor,
}: Props) {
  const pageRef = useRef<HTMLDivElement>(null);
  const bondImgRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The entrance reveals run on every device — they ARE this page's motion
      // on a phone, and there is exactly one per element. Only the travel
      // shortens: 40px is a tenth of a 390px screen, far enough that a chapter
      // heading visibly slides rather than settles. See revealY in lib/gsap.ts.
      const from = revealY();
      pageRef.current?.querySelectorAll(".reveal-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: from, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── Desktop only: the two scrubbed drifts ─────────────────────────────
         Both of these are decoration — they move a picture INSIDE a frame that
         itself never moves, so nothing about what the page says depends on
         them. What they cost on a phone is not nothing: de Britto's page has
         seven chapter paintings, so that is seven full-bleed images each having
         a transform written to them every scrolled frame, plus the bond band's
         full-screen façade behind a gradient at 25% opacity, on top of the
         thirty-odd entrance reveals above. That is the exact load the home page
         was found stuttering under.

         ⚠ THE STILL IMAGE IS STILL FRAMED CORRECTLY WITHOUT THIS. `.plate-img`
         is sized 112% tall and pulled up 6% in globals.css precisely so the
         overscan is CSS rather than a transform — the drift moves within the
         slack, and when the drift never gets built the picture simply sits in
         the middle of it. Read the note beside that rule before changing
         either half.

         matchMedia rather than an `if`, so rotating a tablet across 768px
         builds or reverts these instead of leaving whichever build happened to
         mount. Nothing here pins, so no pin-spacer exists and a passive effect
         is safe — see the note in lib/gsap.ts for when it would not be. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        // The paintings drift a little slower than the prose beside them.
        pageRef.current?.querySelectorAll<HTMLElement>(".plate-img").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: -5 },
            {
              yPercent: 5,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        });

        if (bondImgRef.current) {
          gsap.to(bondImgRef.current, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: bondImgRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          });
        }
      });
      return () => mm.revert();
    }, pageRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={pageRef} className="saint-page">
      <PageHero
        label={s.label}
        title={s.name}
        intro={s.intro}
        image={heroImage}
        alt={heroAlt}
        imagePosition={heroPosition}
      />

      {/* ── Quick-facts strip ─────────────────────── */}
      <section className="relative bg-navy text-white border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-11 md:py-16">
          {/* ── THE SMALLEST TYPE ON EITHER SAINT'S PAGE WAS HERE ─────────────
              Every label in this strip was drawn at a monitor's scale: 12px
              epithet at 0.4em, 11px feast, and a 10px `dt` — and 10px of caps
              flung 0.3em apart is not read on a phone, it is guessed at. This
              is the page's own summary card, the block a visitor scans before
              deciding whether to read nine hundred words of a martyr's life, so
              it is the last place on the page that should be squinted at.

              The trade is the standard one for this pass: SIZE UP, TRACKING
              DOWN, so no label ends up wider than it was and the strip's
              proportions on a monitor are untouched. Every value is a base→md
              pair, so from 768px up these render exactly the numbers they
              always did. */}
          <p className="reveal-item text-center text-xs uppercase tracking-[0.22em] text-gold/80 mb-3 md:tracking-[0.4em]">
            {s.epithet}
          </p>
          <div className="reveal-item flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center mb-10">
            <span className="text-[0.72rem] uppercase tracking-[0.16em] text-gold md:text-[11px] md:tracking-[0.3em]">
              {s.feast}
            </span>
            <span className="hidden sm:block w-px h-4 bg-gold/30" />
            <span className="text-[0.72rem] uppercase tracking-[0.16em] text-white/60 md:text-[11px] md:tracking-[0.3em]">
              {s.canonised}
            </span>
          </div>
          {/* One column below `sm` is right and stays: these values are whole
              sentences ("14 May 1745, at the church of Vadakkankulam — the place
              recorded by the Holy See"), not figures, so a second column would
              set them four words to a line. */}
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            {s.facts.map((f, i) => (
              <div key={i} className="reveal-item border-l border-gold/30 pl-4">
                <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-gold/80 mb-1.5 md:text-[10px] md:tracking-[0.3em]">
                  {f.label}
                </dt>
                <dd className="text-[1.05rem] md:text-lg font-serif text-white leading-snug">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── The words in his own mouth ─────────────────────── */}
      <section className="bg-cream section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/8 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="reveal-item">
            <svg
              width="40"
              height="32"
              viewBox="0 0 40 32"
              fill="none"
              aria-hidden="true"
              className="mx-auto mb-6 text-gold/60"
            >
              <path
                d="M0 32V18C0 8 5 2 16 0v6c-5 1-8 5-8 10h8v16H0zm24 0V18c0-10 5-16 16-18v6c-5 1-8 5-8 10h8v16H24z"
                fill="currentColor"
              />
            </svg>
            {/* The saint's own words, and the longest single sentence on the
                page — de Britto's runs to fifty-four words. At a flat `text-2xl`
                that set as a fifteen-line column of 24px italic on a phone. The
                clamp is the same one the home page's devotional subtitle uses,
                so the two pages speak at the same volume. */}
            <p className="font-serif text-[clamp(1.35rem,5.6vw,1.5rem)] md:text-3xl text-navy italic leading-snug">
              {s.quote}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.14em] text-text-muted leading-relaxed max-w-xl mx-auto md:tracking-[0.25em]">
              {s.quoteAttribution}
            </p>
          </div>
        </div>
      </section>

      {/* ── The life, chapter by chapter ─────────────────────── */}
      <section className="bg-cream pb-4 relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="reveal-item kicker justify-center mb-5">{s.lifeLabel}</p>
          {/* The site's section-heading clamp, shared with the home page's
              Saints teaser — a reader arriving here from that section meets the
              same heading size, which is the point of having one scale. */}
          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-5xl text-navy leading-[1.05] mb-6">
            {s.lifeTitle}
          </h2>
          <p className="reveal-item text-text-muted text-[0.98rem] md:text-lg leading-relaxed">
            {s.lifeIntro}
          </p>
        </div>
      </section>

      <section className="bg-cream pb-16 md:pb-32 pt-12 md:pt-16 relative">
        <div className="max-w-3xl mx-auto px-6 space-y-12 md:space-y-20">
          {s.sections.map((sec, i) => {
            const cite = citeFor(sec.key);
            return (
              <article key={sec.key} className="reveal-item">
                <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold/80 mb-3 md:text-[11px] md:tracking-[0.35em]">
                  {String(i + 1).padStart(2, "0")}
                </p>
                {/* A step BELOW the section heading above, and it has to stay
                    one: at a flat `text-3xl` the chapter headings came out at
                    30px against a 31px section heading, so a phone reader had
                    no way to tell the chapters of a life from the title over
                    them. The clamp lands these near 26px. */}
                <h3 className="font-serif text-[clamp(1.65rem,6.6vw,1.875rem)] md:text-4xl text-navy mb-5 leading-tight">
                  {sec.heading}
                </h3>

                {/* The painting rides between the heading and the prose, so a
                    reader scrolling fast still meets the scene before the
                    sentences that explain it. */}
                {cite?.photo && (
                  <figure className="plate relative my-6 overflow-hidden rounded-2xl bg-navy ring-1 ring-gold/20 aspect-4/3 md:my-7">
                    {/* `md:will-change-transform`, not bare: the drift is
                        desktop-only now, and a standing promise to move that is
                        never kept is just a compositor layer per painting —
                        seven of them on de Britto's page — held for the life of
                        the page on the device with the least memory to hold
                        them. */}
                    <Image
                      src={cite.photo}
                      alt={altFor(sec.key, sec.heading)}
                      fill
                      sizes="(max-width: 768px) 100vw, 48rem"
                      className="plate-img object-cover md:will-change-transform"
                    />
                    <span className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-gold/15 rounded-2xl" />
                  </figure>
                )}

                <Prose body={sec.body} />

                {/* Below the line: the doubt, where this chapter has one. It is
                    here so the prose above never has to stop and hedge. */}
                {sec.note && (
                  <p className="saint-note">
                    <span className="saint-note-label">{s.noteLabel}</span>
                    {sec.note}
                  </p>
                )}

                {cite && <Citation tier={cite.tier} sources={cite.sources} />}
              </article>
            );
          })}
        </div>
      </section>

      {/* ── How much of this is proved ─────────────────────── */}
      <section className="bg-cream-dark section-padding relative overflow-hidden border-y border-gold/20">
        <div className="light-shaft pointer-events-none absolute -top-10 left-[12%] h-[130%] w-[55%] -rotate-12 opacity-50" />
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="reveal-item kicker justify-center mb-5">{s.evidence.label}</p>
            <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-5xl text-navy leading-[1.05] mb-6">
              {s.evidence.title}
            </h2>
            <p className="reveal-item text-text-muted text-[0.98rem] md:text-lg leading-relaxed">
              {s.evidence.intro}
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {s.evidence.rows.map((row, i) => (
              /* `p-5` on a phone, not `p-7`. 28px of padding on each side of a
                 card inside a 24px-guttered column left about 260px of measure
                 on a 360px screen — the card was spending a fifth of the screen
                 on its own margins while the paragraph inside it wrapped every
                 six words. */
              <div
                key={i}
                className="reveal-item rounded-2xl border border-gold/20 bg-white/50 backdrop-blur-sm p-5 md:p-9"
              >
                <div className="saint-cite mb-4">
                  <span className={`saint-tier saint-tier--${row.tier}`}>
                    {TIER_LABEL[row.tier][lang]}
                  </span>
                </div>
                <h3 className="font-serif text-[clamp(1.4rem,5.6vw,1.5rem)] md:text-3xl text-navy mb-4 leading-tight">
                  {row.heading}
                </h3>
                <p className="text-text-muted text-[0.98rem] md:text-base leading-relaxed">
                  {row.body}
                </p>
              </div>
            ))}
          </div>

          <p className="reveal-item mt-12 text-center font-serif text-[1.08rem] md:text-2xl italic text-navy leading-relaxed max-w-2xl mx-auto">
            {s.evidence.closing}
          </p>
        </div>
      </section>

      {/* ── The bond with this parish (featured) ─────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Same reasoning as the chapter plates: the drift behind this band is
            desktop-only, so the promise to move goes with it. This one is a
            full-screen photograph under a gradient at a quarter opacity — the
            most expensive layer to hold and the least visible. */}
        <div ref={bondImgRef} className="absolute inset-0 opacity-25 md:will-change-transform">
          <Image
            src="/images/architecture/facade.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.25),transparent_60%)]" />

        <div className="relative section-padding">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
              <p className="reveal-item text-xs uppercase tracking-[0.22em] text-gold mb-4 md:tracking-[0.4em]">
                {s.bond.label}
              </p>
              <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
                {s.bond.title}
              </h2>
              <p className="reveal-item text-white/75 text-[0.98rem] md:text-lg leading-relaxed">
                {s.bond.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
              {s.bond.pillars.map((p, i) => (
                /* `p-5` on a phone, down from `p-8`. The numeral roundel is a
                   fixed 48px and sits in the same flex row as the prose, so at
                   32px of card padding the paragraph beside it was working with
                   roughly 200px of a 360px screen. */
                <div
                  key={i}
                  className="reveal-item group relative rounded-3xl overflow-hidden bg-white/[0.04] ring-1 ring-gold/20 p-5 md:p-10 backdrop-blur-sm hover:bg-white/[0.06] transition-colors duration-700"
                >
                  <div className="flex items-start gap-4 md:gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gold/15 ring-1 ring-gold/40 flex items-center justify-center font-serif text-gold text-lg">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-serif text-[1.15rem] md:text-2xl text-white mb-3 leading-tight">
                        {p.heading}
                      </h3>
                      <p className="text-white/70 text-[0.98rem] md:text-base leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── In this parish today ─────────────────────── */}
      <section className="bg-cream section-padding relative overflow-hidden">
        <div className="light-shaft pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-[85%]" />
        <div className="relative max-w-5xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="reveal-item kicker justify-center mb-5">{s.today.label}</p>
            <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-5xl text-navy leading-[1.05] mb-6">
              {s.today.title}
            </h2>
            <p className="reveal-item text-text-muted text-[0.98rem] md:text-lg leading-relaxed">
              {s.today.intro}
            </p>
          </div>

          {/* Stacked on a phone, and the gap comes in with it: three items with
              nothing between them but 28px of air read as one long column, so
              the short gold rule above each heading is doing the separating and
              only needs enough room to be seen doing it. */}
          <div className="grid grid-cols-1 gap-9 md:grid-cols-3 md:gap-7">
            {s.today.items.map((item, i) => (
              <div key={i} className="reveal-item">
                <div className="w-10 h-px bg-gold/50 mb-4 md:mb-5" />
                <h3 className="font-serif text-[1.15rem] md:text-2xl text-navy mb-3 leading-tight">
                  {item.heading}
                </h3>
                <p className="text-text-muted text-[0.98rem] md:text-base leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sources, further reading, and the way back ─────────────────────── */}
      <section className="bg-cream pb-16 md:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="reveal-item rounded-2xl border border-gold/20 bg-white/40 backdrop-blur-sm p-5 md:p-10">
            <p className="text-[0.72rem] uppercase tracking-[0.2em] text-gold/80 mb-3 md:text-[11px] md:tracking-[0.35em]">
              {s.sources.heading}
            </p>
            <p className="text-text-muted text-[0.88rem] md:text-base leading-relaxed italic">
              {s.sources.body}
            </p>

            {/* Every book behind the page, once, in the order of authority that
                sources.ts declares — the Holy See first, our own books last. */}
            <p className="mt-7 text-[0.68rem] uppercase tracking-[0.14em] text-text-muted/70 mb-3 md:text-[10px] md:tracking-[0.3em]">
              {s.sources.chipsLabel}
            </p>
            {/* ⚠ THE CHIPS ARE LINKS, AND ON A PHONE THEY WERE 11px OF UNDERLINED
                TEXT WITH NOTHING ROUND THEM. `.saint-chip` sets no padding — its
                whole visual idea is that it is a word in a line, not a button —
                so the tap target was the glyph box, roughly 15px tall, against a
                44px guideline, and the chips sit in a wrapped row where the
                neighbour is 9px away. The padding is added here rather than in
                globals.css so the class stays the same shape for the history
                page's copy of this idiom; `-my-2` gives the height straight back
                to the flex line, so the row does not grow, and both are dropped
                at `md` where a pointer exists and the desktop rendering is
                untouched to the pixel. */}
            <div className="saint-cite">
              {bibliography.map((id) => (
                <Link
                  key={id}
                  href={`/sources#${id}`}
                  className="saint-chip py-2 -my-2 md:py-0 md:my-0"
                >
                  {SOURCE_SHORT[id] ?? SOURCE_INDEX[id]?.title ?? id}
                </Link>
              ))}
            </div>
          </div>

          {/* Where to go next. These pages used to end in a single link back to
              a section of the home page, which is a dead end for a reader they
              have just interested. */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-3 sm:gap-6">
            {s.related.items.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="reveal-item group block rounded-2xl border border-gold/20 bg-white/40 p-5 transition-colors duration-500 hover:border-gold/50 hover:bg-white/60 sm:p-6"
              >
                <h3 className="font-serif text-[1.08rem] text-navy leading-tight mb-2 transition-colors duration-500 group-hover:text-gold-dark sm:text-lg">
                  {r.title}
                </h3>
                <p className="text-text-muted text-[0.88rem] leading-relaxed mb-4 sm:text-sm">
                  {r.body}
                </p>
                {/* 0.6rem is 9.6px, and this is the only thing on the card that
                    says it is a door. Up to 10.9px with the tracking paying for
                    the width, so the label is no wider than it was. */}
                <span className="inline-flex items-center gap-1.5 font-display text-[0.68rem] uppercase tracking-[0.14em] text-gold-dark md:text-[0.6rem] md:tracking-[0.25em]">
                  {r.cta}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>

          <div className="reveal-item mt-12 text-center">
            {/* `py-2 -my-2`: the last link on the page and the way back, sitting
                alone in the middle of a line with 20px of height to hit. The
                negative margin keeps the block's spacing exactly where it was. */}
            <Link
              href="/#saints"
              className="inline-flex items-center gap-2 py-2 -my-2 text-sm uppercase tracking-[0.16em] text-gold hover:text-navy transition-colors duration-500 md:tracking-[0.25em]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M19 12H5M11 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {s.back}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
