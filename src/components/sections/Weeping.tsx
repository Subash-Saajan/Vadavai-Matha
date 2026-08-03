"use client";

import { useRef, useEffect } from "react";
import { ResidentImage } from "@/components/ResidentImage";
import { Link } from "@/components/LocaleLink";
import { ArrowUpRight } from "lucide-react";
import { gsap, DESKTOP, revealY } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";

/**
 * 23 October 1803 — one moment, told properly.
 *
 * WHAT IT IS FOR. The Chronicle above it moves fast and shows seven things.
 * This section shows one, and stops. It is the page's emotional peak, placed
 * where a reader's attention is still intact rather than in the tail where the
 * old page kept its best material.
 *
 * ── THE TIER IS THE WHOLE DESIGN ──────────────────────────────────────────
 *
 * In citations.ts this is `devotion`: a local and diocesan devotional
 * tradition, recorded by the Jesuit historian Léon Besse, and never the subject
 * of a Vatican investigation. Everything about this section follows from that.
 *
 *   · The copy says "they said" and "what they told afterwards". It never
 *     asserts the event in the site's own voice, because the site does not know
 *     it and the parish does not claim it.
 *   · `weepingHonest` is set BELOW the line in smaller type — the same move
 *     /history makes with its footnotes — and it is not decoration. Delete it
 *     and this becomes a shrine website asserting a miracle, which is the exact
 *     thing that makes a page uncitable.
 *   · No pulsing glow on her face, no tear effect, no candle flicker timed to
 *     the sentence. A parish that stages the miracle it declines to assert has
 *     given the assertion away anyway.
 *
 * The one thing this section IS confident about is the date, and it says so:
 * 1803, not 1805. Every external source agrees; the parish souvenir's 1805 is a
 * copying slip. (history.ts APPARITION.)
 */
export function Weeping() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Desktop only: the slow drift on the backdrop ──────────────────
         A full-bleed photograph being translated AND scaled every scrolled
         frame is the single most expensive shape of parallax there is: the
         scale forces the compositor to resample the whole image rather than
         just move a cached layer. On a phone the section keeps the still
         frame, which is the picture it was chosen for. See lib/gsap.ts. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -6, scale: 1.12 },
          {
            yPercent: 6,
            scale: 1.04,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          },
        );
      });

      const from = revealY();
      contentRef.current?.querySelectorAll(".reveal-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: from, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          },
        );
      });

      return () => mm.revert();
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-night-deep py-16 md:py-32"
    >
      <div ref={bgRef} className="absolute inset-0 md:will-change-transform">
        <ResidentImage
          src="/images/history/the-weeping-madonna-4.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-linear-to-b from-night-deep/85 via-navy/55 to-night-deep/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,transparent_20%,rgba(6,14,26,0.72)_88%)]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:gap-20 lg:px-10"
      >
        {/* The statue, framed. The same painting the history page uses for this
            moment, so a reader who follows the link recognises where they are. */}
        <div className="reveal-item lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[1.75rem] shadow-2xl ring-1 ring-gold/25">
            <ResidentImage
              src="/images/history/the-weeping-madonna-2.jpg"
              alt="The statue of Our Lady of the Assumption at Vadakkankulam, as the parish remembers the forenoon of 23 October 1803."
              fill
              sizes="(max-width: 1024px) 80vw, 26rem"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="reveal-item kicker mb-6 text-gold!">{t.home.weepingLabel}</p>

          <h2 className="reveal-item font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-[1.06] text-white md:text-5xl lg:text-6xl">
            {t.home.weepingTitle}
          </h2>

          {/* Cormorant on a dark ground at 18px is the least legible
              combination on the whole page — the small x-height and the thin
              strokes both work against a white-on-navy reversal. Up to
              1.05rem on a phone — still a step above the sans beside it, which is
              the correction Cormorant needs; back to the designed sizes at `md`. */}
          <div className="reveal-item mt-8 space-y-5">
            <p className="font-serif text-[1.05rem] leading-relaxed text-white/80 md:text-xl">
              {t.home.weepingBody1}
            </p>
            <p className="font-serif text-[1.05rem] leading-relaxed text-white/80 md:text-xl">
              {t.home.weepingBody2}
            </p>
            <p className="font-serif text-[1.05rem] leading-relaxed text-white/80 md:text-xl">
              {t.home.weepingBody3}
            </p>
          </div>

          {/* Below the line, in smaller type — where a book keeps its doubt.
              See the head of this file before touching it.

              ⚠ IT MUST STAY READABLE. 14px at 50% white on near-black is under
              3:1 and is the sentence that keeps this section honest — a note
              nobody can read is a note that is not there. It goes up to 15.2px
              and 60% on a phone, and it is still visibly smaller and quieter
              than the prose above it, which is the whole point of it. */}
          <p className="reveal-item mt-9 border-t border-gold/25 pt-6 text-[0.88rem] leading-relaxed text-white/60 md:text-sm md:text-white/50">
            {t.home.weepingHonest}
          </p>

          <div className="reveal-item mt-9">
            {/* `py-2 -my-2` gives the inline link a 44px tap target without
                moving a pixel of it — the text is 18px tall on its own, which
                is a third of what a thumb needs. */}
            <Link
              href="/history#the-weeping-madonna"
              className="ui-label group -my-2 inline-flex items-center gap-2 py-2 text-gold transition-colors hover:text-white"
            >
              {t.home.weepingCta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
