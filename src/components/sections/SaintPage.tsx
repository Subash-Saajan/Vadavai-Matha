"use client";

import { useRef, useEffect } from "react";
import { Link } from "@/components/LocaleLink";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
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
            className="saint-chip"
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
      {body.split("\n\n").map((para, i) => (
        <p key={i} className={`text-text-muted text-lg leading-relaxed${i ? " mt-5" : ""}`}>
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
      pageRef.current?.querySelectorAll(".reveal-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 40, opacity: 0 },
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

      // The paintings drift a little slower than the prose beside them. Nothing
      // is pinned on this page, so no pin-spacer is created and a passive effect
      // is safe here — see the note in lib/gsap.ts for when it would not be.
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
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-16">
          <p className="reveal-item text-center text-xs uppercase tracking-[0.4em] text-gold/80 mb-3">
            {s.epithet}
          </p>
          <div className="reveal-item flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center mb-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{s.feast}</span>
            <span className="hidden sm:block w-px h-4 bg-gold/30" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">
              {s.canonised}
            </span>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            {s.facts.map((f, i) => (
              <div key={i} className="reveal-item border-l border-gold/30 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-1.5">
                  {f.label}
                </dt>
                <dd className="text-base md:text-lg font-serif text-white leading-snug">
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
            <p className="font-serif text-2xl md:text-3xl text-navy italic leading-snug">
              {s.quote}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.25em] text-text-muted leading-relaxed max-w-xl mx-auto">
              {s.quoteAttribution}
            </p>
          </div>
        </div>
      </section>

      {/* ── The life, chapter by chapter ─────────────────────── */}
      <section className="bg-cream pb-4 relative">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="reveal-item kicker justify-center mb-5">{s.lifeLabel}</p>
          <h2 className="reveal-item font-serif text-4xl md:text-5xl text-navy leading-[1.05] mb-6">
            {s.lifeTitle}
          </h2>
          <p className="reveal-item text-text-muted text-lg leading-relaxed">{s.lifeIntro}</p>
        </div>
      </section>

      <section className="bg-cream pb-24 md:pb-32 pt-14 md:pt-16 relative">
        <div className="max-w-3xl mx-auto px-6 space-y-16 md:space-y-20">
          {s.sections.map((sec, i) => {
            const cite = citeFor(sec.key);
            return (
              <article key={sec.key} className="reveal-item">
                <p className="text-[11px] uppercase tracking-[0.35em] text-gold/80 mb-3">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl text-navy mb-5 leading-tight">
                  {sec.heading}
                </h3>

                {/* The painting rides between the heading and the prose, so a
                    reader scrolling fast still meets the scene before the
                    sentences that explain it. */}
                {cite?.photo && (
                  <figure className="plate relative my-7 overflow-hidden rounded-2xl bg-navy ring-1 ring-gold/20 aspect-4/3">
                    <Image
                      src={cite.photo}
                      alt={altFor(sec.key, sec.heading)}
                      fill
                      sizes="(max-width: 768px) 100vw, 48rem"
                      className="plate-img object-cover will-change-transform"
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
            <h2 className="reveal-item font-serif text-4xl md:text-5xl text-navy leading-[1.05] mb-6">
              {s.evidence.title}
            </h2>
            <p className="reveal-item text-text-muted text-lg leading-relaxed">
              {s.evidence.intro}
            </p>
          </div>

          <div className="space-y-8">
            {s.evidence.rows.map((row, i) => (
              <div
                key={i}
                className="reveal-item rounded-2xl border border-gold/20 bg-white/50 backdrop-blur-sm p-7 md:p-9"
              >
                <div className="saint-cite mb-4">
                  <span className={`saint-tier saint-tier--${row.tier}`}>
                    {TIER_LABEL[row.tier][lang]}
                  </span>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-navy mb-4 leading-tight">
                  {row.heading}
                </h3>
                <p className="text-text-muted leading-relaxed">{row.body}</p>
              </div>
            ))}
          </div>

          <p className="reveal-item mt-12 text-center font-serif text-xl md:text-2xl italic text-navy leading-relaxed max-w-2xl mx-auto">
            {s.evidence.closing}
          </p>
        </div>
      </section>

      {/* ── The bond with this parish (featured) ─────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div ref={bondImgRef} className="absolute inset-0 will-change-transform opacity-25">
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
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="reveal-item text-xs uppercase tracking-[0.4em] text-gold mb-4">
                {s.bond.label}
              </p>
              <h2 className="reveal-item font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
                {s.bond.title}
              </h2>
              <p className="reveal-item text-white/75 text-lg leading-relaxed">{s.bond.intro}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {s.bond.pillars.map((p, i) => (
                <div
                  key={i}
                  className="reveal-item group relative rounded-3xl overflow-hidden bg-white/[0.04] ring-1 ring-gold/20 p-8 md:p-10 backdrop-blur-sm hover:bg-white/[0.06] transition-colors duration-700"
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gold/15 ring-1 ring-gold/40 flex items-center justify-center font-serif text-gold text-lg">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl text-white mb-3 leading-tight">
                        {p.heading}
                      </h3>
                      <p className="text-white/70 text-base leading-relaxed">{p.body}</p>
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
            <h2 className="reveal-item font-serif text-4xl md:text-5xl text-navy leading-[1.05] mb-6">
              {s.today.title}
            </h2>
            <p className="reveal-item text-text-muted text-lg leading-relaxed">{s.today.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {s.today.items.map((item, i) => (
              <div key={i} className="reveal-item">
                <div className="w-10 h-px bg-gold/50 mb-5" />
                <h3 className="font-serif text-xl md:text-2xl text-navy mb-3 leading-tight">
                  {item.heading}
                </h3>
                <p className="text-text-muted leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sources, further reading, and the way back ─────────────────────── */}
      <section className="bg-cream pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="reveal-item rounded-2xl border border-gold/20 bg-white/40 backdrop-blur-sm p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold/80 mb-3">
              {s.sources.heading}
            </p>
            <p className="text-text-muted text-sm md:text-base leading-relaxed italic">
              {s.sources.body}
            </p>

            {/* Every book behind the page, once, in the order of authority that
                sources.ts declares — the Holy See first, our own books last. */}
            <p className="mt-7 text-[10px] uppercase tracking-[0.3em] text-text-muted/70 mb-3">
              {s.sources.chipsLabel}
            </p>
            <div className="saint-cite">
              {bibliography.map((id) => (
                <Link key={id} href={`/sources#${id}`} className="saint-chip">
                  {SOURCE_SHORT[id] ?? SOURCE_INDEX[id]?.title ?? id}
                </Link>
              ))}
            </div>
          </div>

          {/* Where to go next. These pages used to end in a single link back to
              a section of the home page, which is a dead end for a reader they
              have just interested. */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {s.related.items.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="reveal-item group block rounded-2xl border border-gold/20 bg-white/40 p-6 transition-colors duration-500 hover:border-gold/50 hover:bg-white/60"
              >
                <h3 className="font-serif text-lg text-navy leading-tight mb-2 transition-colors duration-500 group-hover:text-gold-dark">
                  {r.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-4">{r.body}</p>
                <span className="inline-flex items-center gap-1.5 font-display text-[0.6rem] uppercase tracking-[0.25em] text-gold-dark">
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
            <Link
              href="/#saints"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-gold hover:text-navy transition-colors duration-500"
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
