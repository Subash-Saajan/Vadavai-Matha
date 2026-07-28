"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/components/LocaleLink";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, useIsomorphicLayoutEffect } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import {
  CHRONICLE_FRAMES,
  type ChronicleFrame,
  type ChronicleFrameMeta,
} from "@/lib/chronicle";
import { ChronicleHeader } from "./ChronicleHeader";

/**
 * VARIANT A — the filmstrip.
 *
 * Seven years in a strip that moves sideways while the page moves down, and
 * that is deliberately wider than any screen: whatever you are looking at,
 * there is visibly more of it to the right. A section that closes neatly is a
 * section you can walk away from.
 *
 * WHY SIDEWAYS AT ALL. Everything below this point on the home page is a grid
 * of cards, and an eye that has classified a page as "repeating cards" stops
 * reading and starts skimming. This is the one form on the page that nothing
 * else shares.
 *
 * TWO BUILDS, NEVER BOTH LIVE — the same rule /history keeps.
 *
 *   DESKTOP pins the section and scrubs the strip's x off scroll progress.
 *   MOBILE does not scrub at all. A phone fling carries momentum the reader
 *   never asked for, and mapping that to a horizontal position means one flick
 *   throws you past three centuries. On a phone the strip is a plain native
 *   scroller with snap points and `data-lenis-prevent` on it, so the finger
 *   drives it directly and the page scroll is never hijacked.
 */

/**
 * One year of the strip.
 *
 * Declared at module scope rather than inside the section: a component created
 * during render is a new component type on every render, which throws away its
 * DOM — and the transform ScrollTrigger is scrubbing — each time the language
 * or the breakpoint changes.
 */
function FilmCard({ frame, meta }: { frame: ChronicleFrame; meta: ChronicleFrameMeta }) {
  return (
    <Link
      href={meta.href}
      className="group relative block h-full w-[78vw] shrink-0 snap-center overflow-hidden rounded-3xl bg-navy ring-1 ring-gold/15 sm:w-[62vw] lg:w-[27rem]"
    >
      <Image
        src={`/images/history/${meta.photo}`}
        alt={frame.title}
        fill
        sizes="(max-width: 1024px) 78vw, 27rem"
        className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-night-deep via-navy/55 to-navy/10" />

      {/* The year, plated at the top — the one thing the eye should catch while
          the strip is moving. */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-4 p-6">
        <span className="font-display text-lg tracking-[0.14em] text-gold tabular-nums">
          {frame.year}
        </span>
        <span className="text-right font-display text-[0.55rem] uppercase leading-snug tracking-[0.26em] text-white/45">
          {frame.chapter}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
        <h3 className="font-serif text-2xl leading-tight text-white md:text-3xl">{frame.title}</h3>
        <div className="my-4 h-px w-12 bg-gold/45" />
        <p className="font-serif text-[0.98rem] leading-relaxed text-white/70">{frame.line}</p>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/0 transition-all duration-700 group-hover:ring-gold/40" />
    </Link>
  );
}

/**
 * The last panel, and the way out.
 *
 * Not a photograph on purpose: after seven frames of pictures the eye has
 * habituated to them, and the one panel that must not be skimmed is this one.
 */
function FilmDoor({
  chapterLabel,
  title,
  body,
  cta,
}: {
  chapterLabel: string;
  title: string;
  body: string;
  cta: string;
}) {
  return (
    <Link
      href="/history"
      className="group relative flex h-full w-[78vw] shrink-0 snap-center flex-col justify-center overflow-hidden rounded-3xl border border-gold/30 bg-cream-dark px-9 ring-1 ring-gold/10 transition-colors duration-500 hover:border-gold/60 sm:w-[62vw] lg:w-[26rem]"
    >
      <div className="light-shaft absolute -top-10 left-[10%] h-[140%] w-[60%] -rotate-12 opacity-60" />
      <div className="relative">
        <p className="font-display text-[0.6rem] uppercase tracking-[0.3em] text-gold-dark">
          {chapterLabel}
        </p>
        <p className="mt-5 font-serif text-3xl leading-tight text-navy md:text-4xl">{title}</p>
        <p className="mt-5 font-serif text-lg leading-relaxed text-text-muted">{body}</p>
        <span className="mt-8 inline-flex items-center gap-2 font-display text-[0.68rem] uppercase tracking-[0.22em] text-navy transition-colors group-hover:text-gold-dark">
          {cta}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function ChronicleFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { t, lang } = useLang();

  // One authority decides which build runs, and React needs to know it too —
  // the two render different markup (a transform track vs. a native scroller),
  // so this cannot be a CSS-only difference.
  //
  // The server renders the phone build and a desktop client swaps to the pinned
  // one after hydration. That swap is visible for one frame, and it does not
  // matter here: this is the third section down, so it has always settled long
  // before anyone has scrolled far enough to see it. Do not "fix" it by reading
  // matchMedia in the initial state — that is a hydration mismatch.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // A LAYOUT effect, not `useEffect` — see the note on
  // useIsomorphicLayoutEffect in lib/gsap.ts. This effect pins the <section>
  // itself, which ScrollTrigger does by wrapping it in a .pin-spacer; if the
  // revert below runs in the passive phase, React has already tried to remove
  // the reparented section and the navigation dies with a removeChild
  // NotFoundError. Leaving this page was fatal for exactly that reason.
  useIsomorphicLayoutEffect(() => {
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const stage = stageRef.current;
      if (!track || !stage) return;

      // How far the track has to travel: its own width, less the screen it is
      // seen through. Measured in a callback so a font load or a resize
      // recomputes it instead of freezing a stale number into the tween.
      const distance = () => Math.max(0, track.scrollWidth - stage.offsetWidth);

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // Scroll distance allotted to the strip. Enough that a year can be
          // read on the way past, short enough that the section does not feel
          // like a detour.
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    }, sectionRef);

    // The pin changes the document height, so every trigger below this section
    // needs its start/end recomputed once the pin is in place.
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [lang, isDesktop]);

  const frames = t.home.chronicleFrames;

  const door = (
    <FilmDoor
      chapterLabel={t.nav.history}
      title={t.home.chronicleDoorTitle}
      body={t.home.chronicleDoorBody}
      cta={t.home.chronicleCta}
    />
  );

  return (
    // ⚠ THE PINNED SECTION MUST BE EXACTLY ONE VIEWPORT TALL ON DESKTOP.
    // ScrollTrigger pins the element as it stands; anything taller than the
    // screen has its bottom edge cut off for the whole pin, and on a short
    // laptop window that edge is the strip itself. Hence `lg:h-svh` on the
    // stage with the section's own vertical padding dropped at the same
    // breakpoint, and a strip height in vh rather than a fixed rem. Change
    // either and check a short window, not just a desktop monitor.
    <section
      ref={sectionRef}
      className="parchment-sheen relative overflow-hidden bg-cream py-20 md:py-24 lg:py-0"
    >
      <div ref={stageRef} className="relative lg:flex lg:h-svh lg:flex-col lg:justify-center">
        <ChronicleHeader />

        {isDesktop ? (
          // Desktop: one viewport-wide window, the track scrubbed through it.
          <div className="relative mt-10 h-[clamp(19rem,44vh,28rem)] overflow-hidden xl:mt-14">
            <div
              ref={trackRef}
              className="flex h-full gap-7 pl-[max(1.5rem,calc((100vw-80rem)/2+2.5rem))] pr-24 will-change-transform"
            >
              {frames.map((frame, i) => (
                <FilmCard key={i} frame={frame} meta={CHRONICLE_FRAMES[i]} />
              ))}
              {door}
            </div>

            {/* How far through three centuries you are. The strip has no
                scrollbar to answer that question, so it needs one of its own. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-px w-[min(80rem,90vw)] bg-navy/10">
              <span
                ref={progressRef}
                className="block h-px w-full origin-left scale-x-0 bg-gold"
              />
            </div>
          </div>
        ) : (
          // Phone: the finger drives it. `data-lenis-prevent` keeps Lenis off
          // this element, and `overscroll-contain` stops a horizontal fling from
          // leaking into the page's vertical scroll at either end.
          <div
            data-lenis-prevent
            className="mt-12 flex h-[26rem] snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {frames.map((frame, i) => (
              <FilmCard key={i} frame={frame} meta={CHRONICLE_FRAMES[i]} />
            ))}
            {door}
          </div>
        )}
      </div>
    </section>
  );
}
