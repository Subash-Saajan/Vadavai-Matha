"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Link } from "@/components/LocaleLink";
import { gsap, DESKTOP, revealY } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";

export function VisitCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Desktop only: the slow push into the façade. A scrubbed `scale` on a
         full-bleed photograph makes the compositor resample the whole image
         every frame — see lib/gsap.ts. The still shot is the closing image of
         the page and holds it perfectly well on a phone. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
        gsap.to(imgRef.current, {
          scale: 1.15,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      const from = revealY();
      const items = contentRef.current?.querySelectorAll(".reveal-item");
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
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          }
        );
      });

      return () => mm.revert();
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      /* `svh` and a smaller floor: `min-h-[600px]` against `82vh` meant that
         on any phone shorter than 732px the min-height won outright and the
         section overflowed the screen — the CTA button, the one action at the
         foot of the whole page, sat below the fold with the footer. */
      className="relative h-[82svh] min-h-130 overflow-hidden flex items-center justify-center"
    >
      <div ref={imgRef} className="absolute inset-0 md:will-change-transform">
        <Image
          src="/images/facade-day.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-b from-navy/55 via-navy/25 to-navy/65" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_42%,rgba(10,19,34,0.42)_100%)]" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
      >
        <div className="reveal-item flex justify-center mb-6">
          <svg width="16" height="24" viewBox="0 0 13 20" fill="none" className="text-gold animate-float" aria-hidden="true">
            <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        <p className="reveal-item kicker justify-center mb-6 text-gold!">{t.home.visitLabel}</p>
        {/* Cinzel is a CAPS face and caps have no descenders to soften a long
            word, so it hits a narrow screen harder than the Cormorant
            headings do. Fluid, and a shade smaller at the bottom end. */}
        <h2 className="reveal-item font-display uppercase tracking-[0.03em] text-[clamp(1.85rem,7.4vw,2.25rem)] md:text-6xl lg:text-7xl text-white leading-[0.98]">
          {t.home.visitTitle}
        </h2>
        <p className="reveal-item mt-7 text-white/80 text-[1.05rem] md:text-lg max-w-xl mx-auto leading-relaxed font-serif">
          {t.home.visitBody}
        </p>
        <div className="reveal-item mt-10">
          {/* `py-4` is already a 52px target; the label goes to 13px on a
              phone so the page's final call to action is not its smallest
              piece of type. */}
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-gold text-navy font-display text-[0.8rem] tracking-[0.16em] uppercase hover:bg-white transition-all duration-500 group md:text-xs md:tracking-[0.22em]"
          >
            {t.home.visitCta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
