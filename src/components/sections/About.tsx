"use client";

import { useRef, useEffect } from "react";
import { ResidentImage } from "@/components/ResidentImage";
import { gsap, DESKTOP, revealY } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { PhotoOrnaments } from "@/components/ornaments/CornerOrnament";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const churchRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Clip-wipe reveal of the composite card
      gsap.fromTo(
        cardRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        }
      );

      // Text staggered reveal — every device.
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

      /* ── Desktop only: the two-layer parallax and the breathing halo ─────
         This card is the most expensive thing in the section — two full-bleed
         images inside one rounded, clipped box, each getting its own transform
         written every scrolled frame. Compositing a clipped, rounded, shadowed
         container whose children are both moving is exactly the case a phone
         is slowest at. The card still reads: it keeps its clip-wipe entrance
         and the depth is in the artwork. See DESKTOP in lib/gsap.ts. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.to(skyRef.current, {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(churchRef.current, {
          yPercent: -22,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
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
      <div className="light-shaft absolute -top-20 right-0 w-[50%] h-[120%] -rotate-6" />
      <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[12rem] opacity-[0.06] select-none">
        II
      </span>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Text */}
        <div ref={textRef} className="lg:col-span-7 space-y-6 order-2 lg:order-1">
          <p className="reveal-item kicker">{t.home.aboutLabel}</p>

          {/* Sizes deliberately identical to Patroness — the two sections are
              the same layout mirrored, and the long note explaining why the
              sans goes down and the serif goes up lives there. */}
          <h2 className="reveal-item font-serif text-[clamp(2.25rem,9vw,3rem)] md:text-6xl lg:text-7xl text-navy leading-[1.04]">
            {t.home.aboutTitle}
          </h2>

          <p className="reveal-item text-[clamp(1.4rem,5.6vw,1.5rem)] md:text-3xl font-serif italic text-gradient-gold">
            {t.home.aboutSubtitle}
          </p>

          <div className="reveal-item space-y-5 pt-2">
            <p className="text-text-muted text-[0.98rem] md:text-lg leading-relaxed">
              {t.home.aboutP1}
            </p>
            <p className="text-text-muted text-[0.98rem] md:text-lg leading-relaxed">
              {t.home.aboutP2}
            </p>
          </div>

          <div className="reveal-item pt-7 mt-1 border-t border-gold/25">
            <p className="font-serif italic text-navy/80 text-[1.08rem] md:text-xl leading-relaxed flex items-start gap-3">
              <span className="text-gold text-3xl leading-none mt-1 font-display">&ldquo;</span>
              {t.home.aboutQuote}
            </p>
          </div>
        </div>

        {/* Composite parallax card */}
        <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2">
          <div
            ref={haloRef}
            className="absolute inset-0 m-auto w-[82%] h-[82%] rounded-full bg-linear-to-b from-gold/40 via-gold/15 to-transparent blur-3xl"
          />

          <div
            ref={cardRef}
            className="relative w-full max-w-md aspect-[4/5] rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25 bg-navy md:will-change-transform"
          >
            <div
              ref={skyRef}
              className="absolute inset-0 -top-[10%] h-[120%] md:will-change-transform"
            >
              <ResidentImage
                src="/background.jpeg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>

            <div
              ref={churchRef}
              className="absolute inset-x-0 bottom-0 h-[115%] md:will-change-transform"
            >
              <ResidentImage
                src="/images/church-night.png"
                alt="Vadakankulam Matha Church"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 80vw, 40vw"
                style={{ filter: "drop-shadow(0 25px 50px rgba(10,22,40,0.45))" }}
              />
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-gold/30" />

            {/* The site's standard framed-photo mark, same as the Patroness portrait. */}
            <PhotoOrnaments />
          </div>
        </div>
      </div>
    </section>
  );
}
