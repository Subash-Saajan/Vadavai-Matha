"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";

export function Patroness() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance + slow scroll parallax
      gsap.fromTo(
        imgWrapRef.current,
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imgWrapRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.to(imgWrapRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
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
      {/* Soft gold ambient glow in the corner */}
      <div className="pointer-events-none absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gold/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        {/* Image side */}
        <div className="lg:col-span-5 relative flex items-center justify-center">
          {/* Halo glow behind statue */}
          <div
            ref={haloRef}
            className="absolute inset-0 m-auto w-[80%] h-[80%] rounded-full bg-gradient-to-b from-gold/40 via-gold/15 to-transparent blur-3xl"
          />

          <div
            ref={imgWrapRef}
            className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-gold/20"
          >
            <Image
              src="/images/matha.png"
              alt="Vadakankulam Matha — Our Lady of Good Health"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 40vw"
              preload
            />
            {/* Subtle gold inner border */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/30" />
          </div>

          {/* Decorative star ornaments */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <svg width="24" height="24" viewBox="0 0 24 24" className="text-gold animate-float">
              <path
                fill="currentColor"
                d="M12 2l2.4 7.2H22l-6 4.4 2.3 7.2L12 16.4 5.7 20.8 8 13.6 2 9.2h7.6L12 2z"
              />
            </svg>
          </div>
        </div>

        {/* Text side */}
        <div ref={textRef} className="lg:col-span-7 space-y-6">
          <p className="reveal-item text-xs uppercase tracking-[0.4em] text-gold font-medium flex items-center gap-3">
            <span className="w-10 h-px bg-gold/60" />
            {t.home.patronessLabel}
          </p>

          <h2 className="reveal-item font-serif text-5xl md:text-6xl lg:text-7xl text-navy leading-[1.05]">
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

          <div className="reveal-item pt-6 border-t border-gold/20">
            <p className="font-serif italic text-navy/80 text-lg flex items-start gap-3">
              <span className="text-gold text-2xl leading-none mt-1">"</span>
              {t.home.patronessQuote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
