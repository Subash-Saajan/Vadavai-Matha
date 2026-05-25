"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";

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
      // Card entrance
      gsap.fromTo(
        cardRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Parallax: sky drifts slow, church drifts faster ──
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

      // Halo glow pulse
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
      className="relative section-padding bg-cream overflow-hidden"
    >
      {/* Soft gold ambient glow in the corners */}
      <div className="pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Text side */}
        <div ref={textRef} className="lg:col-span-7 space-y-6 order-2 lg:order-1">
          <p className="reveal-item text-xs uppercase tracking-[0.4em] text-gold font-medium flex items-center gap-3">
            <span className="w-10 h-px bg-gold/60" />
            {t.home.aboutLabel}
          </p>

          <h2 className="reveal-item font-serif text-5xl md:text-6xl lg:text-7xl text-navy leading-[1.05]">
            {t.home.aboutTitle}
          </h2>

          <p className="reveal-item text-2xl md:text-3xl font-serif italic text-gradient-gold">
            {t.home.aboutSubtitle}
          </p>

          <div className="reveal-item space-y-5 pt-2">
            <p className="text-text-muted text-lg leading-relaxed">
              {t.home.aboutP1}
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              {t.home.aboutP2}
            </p>
          </div>

          <div className="reveal-item pt-6 border-t border-gold/20">
            <p className="font-serif italic text-navy/80 text-lg flex items-start gap-3">
              <span className="text-gold text-2xl leading-none mt-1">"</span>
              {t.home.aboutQuote}
            </p>
          </div>
        </div>

        {/* Image side — parallax composite inside Patroness-style card */}
        <div className="lg:col-span-5 relative flex items-center justify-center order-1 lg:order-2">
          {/* Halo glow behind the card */}
          <div
            ref={haloRef}
            className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full bg-gradient-to-b from-gold/40 via-gold/15 to-transparent blur-3xl"
          />

          <div
            ref={cardRef}
            className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gold/20 bg-navy"
          >
            {/* Sky background — oversized so parallax shift never reveals edges */}
            <div
              ref={skyRef}
              className="absolute inset-0 -top-[10%] h-[120%] will-change-transform"
            >
              <Image
                src="/background.jpeg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 80vw, 40vw"
              />
            </div>

            {/* Church (transparent PNG) — anchored to bottom, taller for parallax */}
            <div
              ref={churchRef}
              className="absolute inset-x-0 bottom-0 h-[115%] will-change-transform"
            >
              <Image
                src="/images/church-night.png"
                alt="Vadakankulam Matha Church"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 80vw, 40vw"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(10,22,40,0.4))",
                }}
              />
            </div>

            {/* Subtle gold inner border */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
