"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

import { Link } from "@/components/LocaleLink";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import { cappedSizes } from "@/lib/imageSizes";
import { SOURCE_SHORT, TIER_LABEL, type Tier } from "@/lib/citations";
import { SOURCE_INDEX } from "@/lib/sources";
import {
  miracleCiteFor,
  miracleAsideCiteFor,
  MIRACLE_BIBLIOGRAPHY,
  PHOTO_FOCUS,
} from "@/lib/miracle";
import { gsap, DESKTOP, revealY, revealStart, revealDuration } from "@/lib/gsap";

/**
 * /miracle — the weeping of 21 October 1803, told whole.
 *
 * ── WHAT THIS PAGE IS FOR ─────────────────────────────────────────────────
 *
 * A QR code at the shrine. Someone is standing in front of the statue with a
 * phone, and this is the page that opens. That fact drives three decisions:
 *
 *   · IT IS A PHONE PAGE FIRST. The reader is standing up, in a church, in
 *     daylight, probably on a middling Android. So: no pinning, no scrubbed
 *     parallax below `md`, no scroll-jacked stages. One entrance reveal per
 *     element and nothing else — see lib/gsap.ts for why the drifts are gated.
 *   · IT IS LONG ON PURPOSE. Someone who scans a code at a shrine has decided
 *     to read. The chapters are the whole story, not a teaser for /history —
 *     that page tells this morning in ten dots inside four centuries, which is
 *     the right proportion there and the wrong one here.
 *   · IT MUST SURVIVE BEING QUOTED. Every claim carries its tier and its
 *     witnesses, and the honest limits are a section of the page rather than a
 *     line of small print. See the head of lib/miracle.ts.
 *
 * ── THE ONE STRUCTURAL MOVE ───────────────────────────────────────────────
 *
 * `signs` — the chapter that says what the man actually reported seeing — is
 * rendered as a dark panel inside the reading column instead of as another
 * cream chapter. It is the only such panel on the page, and that is the entire
 * point of it: the page turns dark once, at the moment it stops narrating
 * circumstances and starts quoting a witness, and turns back straight after.
 *
 * ⚠ DO NOT ADD A SECOND ONE, and do not stage the miracle inside it. No tear
 * animation, no candle flicker, no glow timed to the sentence. A parish that
 * declines to assert a wonder and then animates it has asserted it anyway —
 * the same rule the home page's Weeping section is built on.
 */

/** The single dark chapter. See the note above before adding to this set. */
const DARK_CHAPTERS = new Set(["signs"]);

type Cite = ReturnType<typeof miracleCiteFor>;

/**
 * The citation line under a chapter: the honest tier, then the witnesses,
 * strongest first. Chips land on the bibliography anchors on /sources.
 *
 * `dark` inverts it for the one dark panel — see `.saint-cite--dark` in
 * globals.css. What is inverted is only the ink: filled still means documented
 * and outlined still means everything else, because that badge means the same
 * thing on every page of this site and must not become a decoration that
 * changes with the ground it sits on.
 */
function Citation({
  tier,
  sources,
  dark,
}: {
  tier: Tier;
  sources: { id: string }[];
  dark?: boolean;
}) {
  const { lang } = useLang();
  return (
    <div className={`saint-cite${dark ? " saint-cite--dark" : ""}`}>
      <span className={`saint-tier saint-tier--${tier}`}>{TIER_LABEL[tier][lang]}</span>
      {sources.map((s) => {
        const full = SOURCE_INDEX[s.id];
        return (
          <Link
            key={s.id}
            href={`/sources#${s.id}`}
            /* `py-2 -my-2` below `md`: a chip is deliberately a word in a line
               rather than a button, which leaves it about 15px tall to tap on
               the one device that taps. The negative margin gives the height
               straight back to the flex row, so nothing moves. */
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
 * these chapters turn from narrative to evidence and back inside themselves,
 * and those turns need paragraph breaks rather than a wall of text.
 *
 * 18px of sans in a 340px column sets about 33 characters a line and the
 * readable band starts at 35, which is why the phone size steps down rather
 * than staying at `text-lg`. Full note in Patroness.tsx.
 */
function Prose({ body, dark }: { body: string; dark?: boolean }) {
  return (
    <>
      {body.split("\n\n").map((para, i) => (
        /* `lg:text-[1.12rem]` is not decoration — it is what pays for the wider
           column. The reading column went from `max-w-3xl` to `max-w-4xl` so the
           page stops looking narrow beside its own full-width bands, and 848px
           of 18px sans is about 95 characters a line, past the comfortable band.
           Two more points of type brings it back near 88 and reads BIGGER, not
           thinner, which is the whole reason to take the extra width. */
        <p
          key={i}
          className={`${
            dark ? "text-white/80" : "text-text-muted"
          } text-[0.98rem] leading-relaxed md:text-lg lg:text-[1.12rem]${i ? " mt-5" : ""}`}
        >
          {para}
        </p>
      ))}
    </>
  );
}

export default function MiracleExperience() {
  const pageRef = useRef<HTMLDivElement>(null);
  const todayImgRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const m = t.miracle;
  const limitsCite = miracleAsideCiteFor("limits");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The entrance reveals run everywhere — they ARE this page's motion on a
      // phone, and there is exactly one per element. Only the travel shortens.
      const from = revealY();
      pageRef.current?.querySelectorAll(".reveal-item").forEach((el) => {
        gsap.fromTo(
          el,
          { y: from, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(1),
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: revealStart("top 88%"),
              toggleActions: "play none none none",
            },
          },
        );
      });

      /* ── Desktop only: the two scrubbed drifts ───────────────────────────
         Decoration, both of them — they move a picture inside a frame that
         itself never moves, so nothing the page SAYS depends on them. On a
         phone they would be seven full-bleed paintings each having a transform
         written to them every scrolled frame, on top of forty-odd entrance
         reveals, on the device with the least memory to spare. The `.plate-img`
         box is already sized 112% tall and pulled up 6% in globals.css, so when
         the drift is never built the picture simply sits in the middle of its
         own slack and is framed correctly anyway. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
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
            },
          );
        });

        if (todayImgRef.current) {
          gsap.to(todayImgRef.current, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: todayImgRef.current,
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
      {/* The hero scrim is darker than PageHero's default. The painting behind
          it is a candlelit interior that is already near-black at the edges and
          bright gold in the middle, and the default `navy/40` at the top left
          the gold kicker sitting over lit candles. */}
      <PageHero
        label={m.label}
        title={m.title}
        intro={m.intro}
        image="/images/history/the-weeping-madonna-3.jpg"
        alt={m.heroAlt}
        overlayClassName="bg-gradient-to-b from-night-deep/70 via-navy/55 to-night-deep/95"
        /* On a monitor this 4:5 canvas is cropped to roughly 16:6, which keeps
           only 44% of its height — centred, that was the middle band: robes,
           candlesticks and the backs of a crowd, with every face above the cut.
           20% holds the top of the scene, where the statue and the man on the
           ladder are. A phone crops almost nothing (62svh of a 390px screen is
           very near 4:5), so this only takes effect where it is needed. */
        imagePosition="object-[50%_20%]"
      />

      {/* ── The morning, in short ──────────────────────────────────────────
          A pilgrim standing in the church wants the date, the hour and the
          names before they want three thousand words. This strip is the whole
          answer to "what am I looking at", and it is the block most likely to
          be screenshotted and sent to somebody else. */}
      <section className="relative border-t border-gold/15 bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-11 md:py-16 lg:px-10">
          <p className="reveal-item mb-8 text-center text-xs uppercase tracking-[0.22em] text-gold/80 md:mb-10 md:tracking-[0.4em]">
            {m.factsLabel}
          </p>
          {/* One column below `sm` and it stays: these values are sentences
              ("Savarimuthu Pillai, son of Sattiavasagam Pillai — a visitor, up
              from Tirunelveli"), not figures, so a second column would set them
              four words to a line. */}
          <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {m.facts.map((f, i) => (
              <div key={i} className="reveal-item border-l border-gold/30 pl-4">
                <dt className="mb-1.5 text-[0.68rem] uppercase tracking-[0.14em] text-gold/80 md:text-[10px] md:tracking-[0.3em]">
                  {f.label}
                </dt>
                <dd className="font-serif text-[1.05rem] leading-snug text-white md:text-lg">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── The historian's own hedge ──────────────────────────────────────
          Besse spends his chapter on these sixty-three years saying that almost
          everything in them is lost or garbled, and then makes one exception.
          Putting his sentence at the top, in his voice and not the parish's, is
          the most honest possible way to open the case. */}
      <section className="section-padding relative overflow-hidden bg-cream">
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-gold/8 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
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
            <p className="font-serif text-[clamp(1.35rem,5.6vw,1.5rem)] italic leading-snug text-navy md:text-3xl">
              {m.quote}
            </p>
            <p className="mx-auto mt-6 max-w-xl text-xs uppercase leading-relaxed tracking-[0.14em] text-text-muted md:tracking-[0.25em]">
              {m.quoteAttribution}
            </p>
          </div>
        </div>
      </section>

      {/* ── The story ──────────────────────────────────────────────────── */}
      <section className="relative bg-cream pb-4">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="reveal-item kicker mb-5 justify-center">{m.storyLabel}</p>
          <h2 className="reveal-item mb-6 font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-[1.05] text-navy md:text-5xl">
            {m.storyTitle}
          </h2>
          <p className="reveal-item text-[0.98rem] leading-relaxed text-text-muted md:text-lg">
            {m.storyIntro}
          </p>
        </div>
      </section>

      <section className="relative bg-cream pt-12 pb-16 md:pt-16 md:pb-32">
        {/* ── HOW WIDE THE READING COLUMN IS ────────────────────────────────
            `max-w-4xl`, not the `max-w-3xl` the saints' pages use. On a monitor
            this page alternates a 48rem text column with full-bleed navy bands
            and a `max-w-6xl` grid, and the text read as a narrow ribbon down the
            middle of its own page — the complaint that prompted this. 56rem is
            the widest a single serif-headed prose column goes before it needs a
            second column, and the type steps up at `lg` to keep the line length
            honest (see the note in Prose above; the two must move together). */}
        <div className="mx-auto max-w-4xl space-y-12 px-6 md:space-y-20">
          {m.chapters.map((ch, i) => {
            const cite: Cite = miracleCiteFor(ch.key);
            const dark = DARK_CHAPTERS.has(ch.key);
            const alt =
              (m.alts as Record<string, string>)[ch.key] || ch.heading;

            return (
              <article
                key={ch.key}
                className={
                  dark
                    ? /* Edge to edge on a phone, a panel from `sm` up. The
                         negative margin only cancels the column's own 24px of
                         gutter — no `w-screen`, no translate, so there is no
                         way for this to mint a horizontal scrollbar. */
                      "reveal-item -mx-6 bg-night-deep px-6 py-12 sm:mx-0 sm:rounded-3xl sm:px-9 sm:py-14 sm:ring-1 sm:ring-gold/25 md:px-12 md:py-16"
                    : "reveal-item"
                }
              >
                <p
                  className={`mb-3 text-[0.72rem] uppercase tracking-[0.2em] md:text-[11px] md:tracking-[0.35em] ${
                    dark ? "text-gold" : "text-gold/80"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                {/* A step below the section heading above it, and it has to
                    stay one: at a flat `text-3xl` the chapter headings came out
                    at 30px against a 31px section heading, and a phone reader
                    had no way to tell the chapters from the title over them. */}
                <h3
                  className={`mb-5 font-serif text-[clamp(1.65rem,6.6vw,1.875rem)] leading-tight md:text-4xl ${
                    dark ? "text-white" : "text-navy"
                  }`}
                >
                  {ch.heading}
                </h3>

                {/* The painting rides between the heading and the prose, so a
                    reader scrolling fast meets the scene before the sentences
                    that explain it. */}
                {cite?.photo && (
                  /* ── THE PICTURES RUN WIDER THAN THE TEXT ────────────────
                     `xl:-mx-14` pulls each plate 56px past the prose on either
                     side — the move a printed book makes when a plate is worth
                     more than the measure it sits in. It is `xl` and not `lg`
                     on purpose: the column is 56rem, so at exactly 1024px a
                     breakout would touch both edges of the viewport and the
                     page would look broken rather than generous. From 1280px
                     up there is room for it and the gutters stay honest.
                     Nothing here can mint a horizontal scrollbar — a negative
                     margin inside a centred, max-widthed column resolves
                     against that column, never against the viewport.

                     ⚠ NOT ON THE DARK PANEL. That chapter is a box with its own
                     48px of padding, and a 56px breakout would push the picture
                     out through its sides. Inside a frame, the picture obeys the
                     frame. */
                  <figure
                    className={`plate relative my-6 aspect-4/3 overflow-hidden rounded-2xl bg-navy ring-1 md:my-7 ${
                      dark ? "ring-gold/30" : "ring-gold/20 xl:-mx-14"
                    }`}
                  >
                    {/* `md:will-change-transform`, not bare: the drift is
                        desktop-only, and a standing promise to move that is
                        never kept is just a compositor layer per painting, held
                        for the life of the page on the weakest device. */}
                    {/* The focal point is per-painting and measured, not a
                        guess — see PHOTO_FOCUS in lib/miracle.ts before
                        changing one. These are 4:5 canvases in a 4:3 frame and
                        the faces are all in the upper half, so a centred crop
                        loses the exact thing each picture was chosen for. */}
                    <Image
                      src={cite.photo}
                      alt={alt}
                      fill
                      sizes={cappedSizes("(max-width: 768px) 100vw, 62rem")}
                      className={`plate-img object-cover md:will-change-transform ${
                        PHOTO_FOCUS[ch.key] ?? "object-center"
                      }`}
                    />
                    <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-gold/15" />
                  </figure>
                )}

                <Prose body={ch.body} dark={dark} />

                {/* Below the line: the doubt, where this chapter has one. It is
                    here so the prose above never has to stop and hedge. */}
                {ch.note && (
                  <p className={`saint-note${dark ? " saint-note--dark" : ""}`}>
                    <span className="saint-note-label">{m.noteLabel}</span>
                    {ch.note}
                  </p>
                )}

                {cite && (
                  <Citation tier={cite.tier} sources={cite.sources} dark={dark} />
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* ── How much of this is proved ─────────────────────────────────────
          Not a disclaimer and not a footer. It is a section of the page with
          its own heading, because the strength of everything above depends on
          this being visible rather than buried — and because the fourth row is
          where the parish's own two sources contradict each other in public. */}
      <section className="section-padding relative overflow-hidden border-y border-gold/20 bg-cream-dark">
        <div className="light-shaft pointer-events-none absolute -top-10 left-[12%] h-[130%] w-[55%] -rotate-12 opacity-50" />
        <div className="relative mx-auto max-w-5xl px-6">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="reveal-item kicker mb-5 justify-center">{m.limits.label}</p>
            <h2 className="reveal-item mb-6 font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-[1.05] text-navy md:text-5xl">
              {m.limits.title}
            </h2>
            <p className="reveal-item text-[0.98rem] leading-relaxed text-text-muted md:text-lg">
              {m.limits.intro}
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            {m.limits.rows.map((row, i) => (
              /* `p-5` on a phone, not `p-9`: 36px of padding each side inside a
                 24px-guttered column left about 250px of measure on a 360px
                 screen — a fifth of the screen spent on the card's own margins
                 while the paragraph inside wrapped every six words. */
              <div
                key={i}
                className="reveal-item rounded-2xl border border-gold/20 bg-white/50 p-5 backdrop-blur-sm md:p-9"
              >
                <div className="saint-cite mb-4">
                  <span className={`saint-tier saint-tier--${row.tier as Tier}`}>
                    {TIER_LABEL[row.tier as Tier][lang]}
                  </span>
                </div>
                <h3 className="mb-4 font-serif text-[clamp(1.4rem,5.6vw,1.5rem)] leading-tight text-navy md:text-3xl">
                  {row.heading}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-text-muted md:text-base">
                  {row.body}
                </p>
              </div>
            ))}
          </div>

          {/* The witnesses for the limits themselves. A page that cites its
              claims and not its caveats has made the caveats look like opinion,
              which is exactly the wrong way round here: the counter-witness in
              the fourth row is a printed source and the reader should be able
              to go and read him. */}
          {limitsCite && (
            <div className="reveal-item mt-8">
              <Citation tier={limitsCite.tier} sources={limitsCite.sources} />
            </div>
          )}

          <p className="reveal-item mx-auto mt-12 max-w-2xl text-center font-serif text-[1.08rem] italic leading-relaxed text-navy md:text-2xl">
            {m.limits.closing}
          </p>
        </div>
      </section>

      {/* ── What the parish does with it now ───────────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          ref={todayImgRef}
          className="absolute inset-0 opacity-25 md:will-change-transform"
        >
          <Image
            src="/images/architecture/facade.jpg"
            alt=""
            fill
            className="object-cover"
            sizes={cappedSizes("100vw")}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.25),transparent_60%)]" />

        <div className="section-padding relative">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
              <p className="reveal-item mb-4 text-xs uppercase tracking-[0.22em] text-gold md:tracking-[0.4em]">
                {m.today.label}
              </p>
              <h2 className="reveal-item mb-6 font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-[1.05] text-white md:text-5xl lg:text-6xl">
                {m.today.title}
              </h2>
              <p className="reveal-item text-[0.98rem] leading-relaxed text-white/75 md:text-lg">
                {m.today.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-8">
              {m.today.items.map((item, i) => (
                <div
                  key={i}
                  className="reveal-item group relative overflow-hidden rounded-3xl bg-white/[0.04] p-5 ring-1 ring-gold/20 backdrop-blur-sm transition-colors duration-700 hover:bg-white/[0.06] md:p-9"
                >
                  <div className="mb-4 h-px w-10 bg-gold/50" />
                  <h3 className="mb-3 font-serif text-[1.15rem] leading-tight text-white md:text-2xl">
                    {item.heading}
                  </h3>
                  <p className="text-[0.98rem] leading-relaxed text-white/70 md:text-base">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="reveal-item mt-10 text-center">
              <Link
                href="/mass-timings"
                className="ui-label group -my-2 inline-flex items-center gap-2 py-2 text-gold transition-colors hover:text-white"
              >
                {t.home.massCta}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sources, further reading, and the way back ─────────────────── */}
      <section className="bg-cream pb-16 md:pb-32">
        <div className="mx-auto max-w-4xl px-6">
          <div className="reveal-item mt-16 rounded-2xl border border-gold/20 bg-white/40 p-5 backdrop-blur-sm md:mt-24 md:p-10">
            <p className="mb-3 text-[0.72rem] uppercase tracking-[0.2em] text-gold/80 md:text-[11px] md:tracking-[0.35em]">
              {m.sources.heading}
            </p>
            <p className="text-[0.88rem] italic leading-relaxed text-text-muted md:text-base">
              {m.sources.body}
            </p>

            {/* Every book behind the page, once, in the order of authority
                sources.ts declares — the Holy See first, our own books last. */}
            <p className="mt-7 mb-3 text-[0.68rem] uppercase tracking-[0.14em] text-text-muted/70 md:text-[10px] md:tracking-[0.3em]">
              {m.sources.chipsLabel}
            </p>
            <div className="saint-cite">
              {MIRACLE_BIBLIOGRAPHY.map((id) => (
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

          <p className="reveal-item mt-12 mb-6 text-center text-[0.72rem] uppercase tracking-[0.2em] text-gold/80 md:text-[11px] md:tracking-[0.35em]">
            {m.related.heading}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {m.related.items.map((r, i) => (
              <Link
                key={i}
                href={r.href}
                className="reveal-item group block rounded-2xl border border-gold/20 bg-white/40 p-5 transition-colors duration-500 hover:border-gold/50 hover:bg-white/60 sm:p-6"
              >
                <h3 className="mb-2 font-serif text-[1.08rem] leading-tight text-navy transition-colors duration-500 group-hover:text-gold-dark sm:text-lg">
                  {r.title}
                </h3>
                <p className="mb-4 text-[0.88rem] leading-relaxed text-text-muted sm:text-sm">
                  {r.body}
                </p>
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
            {/* `py-2 -my-2`: the last link on the page and the way back, alone
                in the middle of a line with 20px of height to hit. */}
            <Link
              href="/history#the-weeping-madonna"
              className="inline-flex items-center gap-2 py-2 -my-2 text-sm uppercase tracking-[0.16em] text-gold transition-colors duration-500 hover:text-navy md:tracking-[0.25em]"
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
              {m.back}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
