"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
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
      // Cinematic clip-wipe reveal of the portrait
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

      // Slow scroll parallax on the whole frame
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

      // Halo glow breathing
      gsap.to(haloRef.current, {
        scale: 1.15,
        opacity: 0.85,
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Text staggered reveal
      const items = textRef.current?.querySelectorAll(".reveal-item");
      items?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 42, opacity: 0 },
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
          <div
            ref={imgWrapRef}
            className="relative w-full max-w-md aspect-[4/5] will-change-transform"
          >
            <div
              ref={imgInnerRef}
              className="relative w-full h-full rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-gold/25 will-change-transform"
            >
              <Image
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

          <h2 className="reveal-item font-serif text-5xl md:text-6xl lg:text-7xl text-navy leading-[1.04]">
            {t.home.patronessTitle}
          </h2>

          <p className="reveal-item text-2xl md:text-3xl font-serif italic text-gradient-gold">
            {t.home.patronessSubtitle}
          </p>

          <div className="reveal-item space-y-5 pt-2">
            <p className="text-text-muted text-lg leading-relaxed">
              {t.home.patronessP1}
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              {t.home.patronessP2}
            </p>
          </div>

          <div className="reveal-item pt-7 mt-1 border-t border-gold/25">
            <p className="font-serif italic text-navy/80 text-xl leading-relaxed flex items-start gap-3">
              <span className="text-gold text-3xl leading-none mt-1 font-display">&ldquo;</span>
              {t.home.patronessQuote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
