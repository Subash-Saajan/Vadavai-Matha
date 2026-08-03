"use client";

import { useRef, useEffect } from "react";
import { ResidentImage } from "@/components/ResidentImage";
import { gsap, DESKTOP, revealY } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";

export function Patroness() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgInnerRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic clip-wipe reveal of the portrait. Plays once on both builds:
      // it is an entrance, not a scrubbed effect, so it costs one animation.
      gsap.fromTo(
        imgInnerRef.current,
        { clipPath: "inset(0 0 100% 0)", scale: 1.12 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Text staggered reveal — every device. This IS the section's motion on
      // a phone, so it is not gated; only the travel shortens.
      const from = revealY();
      const items = textRef.current?.querySelectorAll(".reveal-item");
      items?.forEach((el, i) => {
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
            delay: i * 0.1,
          }
        );
      });

      /* ── Desktop only: the drift and the breathing halo ─────────────────
         The parallax writes a transform on the portrait frame every scrolled
         frame. The halo is worse than it looks — an infinite yoyo on a
         `blur-3xl` element never stops, on or off screen, so a phone repaints
         a 64px gaussian blur for the whole life of the page for an effect
         nobody is looking at. See the note on DESKTOP in lib/gsap.ts. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.to(imgWrapRef.current, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });

        gsap.to(haloRef.current, {
          scale: 1.15,
          opacity: 0.85,
          duration: 4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });
      return () => mm.revert();
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      className="relative section-padding bg-cream parchment-sheen overflow-hidden"
    >
      {/* Directional devotional light + oversized engraved numeral */}
      <div className="light-shaft absolute -top-20 -left-10 w-[55%] h-[120%] rotate-6" />
      <span className="section-numeral pointer-events-none absolute -top-6 right-4 md:right-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        I
      </span>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Portrait */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          <div
            ref={haloRef}
            className="absolute inset-0 m-auto w-[82%] h-[82%] rounded-full bg-linear-to-b from-gold/40 via-gold/15 to-transparent blur-3xl"
          />
          {/* `md:will-change-transform`, not bare: `will-change` promotes the
              element to its own compositor layer for the whole life of the
              page, and nothing animates this frame on a phone any more. A
              standing promise to move that is never kept is just memory.

              ⚠ THE SAME APPLIES TO THE INNER FRAME BELOW, which was left bare
              when the outer one was fixed. Its clip-wipe is an ENTRANCE — it
              runs once, near the top of the page, and then never again — so
              the layer it was holding was permanent and the movement it was
              promising had been over since the reader's first swipe. GSAP puts
              its own `will-change` on for the duration of a tween and takes it
              off afterwards, which is the behaviour that was wanted. */}
          <div
            ref={imgWrapRef}
            className="relative w-full max-w-md aspect-[4/5] md:will-change-transform"
          >
            <div
              ref={imgInnerRef}
              className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25"
            >
              <ResidentImage
                src="/images/home_1.jpg"
                alt="Vadakankulam Matha — Our Lady of the Assumption"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />

              {/* The site's standard framed-photo mark — the same vintage corner
                  as the dedication tablet, on all four corners. */}
              <PhotoOrnaments />
            </div>
          </div>
        </div>

        {/* Text */}
        <div ref={textRef} className="lg:col-span-7 space-y-6">
          <p className="reveal-item kicker">{t.home.patronessLabel}</p>

          {/* ── THE MOBILE TYPE SCALE, SET ONCE HERE AND MIRRORED IN About ───
              `text-5xl` was the phone size as well as the tablet one: 48px of
              Cormorant with `leading-[1.04]` in a 340px column, which is about
              nine characters a line for a heading of this length. It is not a
              heading at that width, it is a stack. The clamp holds it at a
              share of the screen instead, topping out at the 48px this was
              drawn at just as `md` takes over.

              THE TWO BODY VOICES MOVE IN OPPOSITE DIRECTIONS ON A PHONE, and
              that is the whole finding:

                · the SANS muted copy comes DOWN, 18px → 15.7px. 18px Geist in
                  a 340px column sets about 33 characters a line, and the
                  readable band is 35–45; this lands near 40, which is where
                  the copy on this page was asked to sit.
                · the SERIF copy stays LARGER THAN THE SANS — 16.8px against
                  15.7px — because Cormorant Garamond has an unusually small
                  x-height (it is drawn on the old Garamond proportions), so a
                  given number renders visibly smaller in it than in Geist.
                  Setting the two to the same number makes the serif the
                  hardest thing on the page to read, which on a page whose
                  quotations and prayers are all set in it is the wrong way
                  round. The gap between the two is the correction; the
                  absolute sizes are tuned by eye on a real phone.

              ⚠ THESE ARE DELIBERATELY SMALLER THAN THE 17px MOBILE BODY THE
              PLATFORM GUIDELINES RECOMMEND. That was the first pass and it read
              as oversized against this design's very large headings — the
              contrast between a 36px heading and a 17px paragraph is what makes
              a phone screen feel crowded. Do not "correct" these back up to
              17px without looking at the page. */}
          <h2 className="reveal-item font-serif text-[clamp(2.25rem,9vw,3rem)] md:text-6xl lg:text-7xl text-navy leading-[1.04]">
            {t.home.patronessTitle}
          </h2>

          <p className="reveal-item text-[clamp(1.4rem,5.6vw,1.5rem)] md:text-3xl font-serif italic text-gradient-gold">
            {t.home.patronessSubtitle}
          </p>

          <div className="reveal-item space-y-5 pt-2">
            <p className="text-text-muted text-[0.98rem] md:text-lg leading-relaxed">
              {t.home.patronessP1}
            </p>
            <p className="text-text-muted text-[0.98rem] md:text-lg leading-relaxed">
              {t.home.patronessP2}
            </p>
          </div>

          <div className="reveal-item pt-7 mt-1 border-t border-gold/25">
            <p className="font-serif italic text-navy/80 text-[1.08rem] md:text-xl leading-relaxed flex items-start gap-3">
              <span className="text-gold text-3xl leading-none mt-1 font-display">&ldquo;</span>
              {t.home.patronessQuote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
