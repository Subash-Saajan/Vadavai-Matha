"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { images } from "@/lib/images";
import { useLang } from "@/components/layout/LanguageProvider";

export function VisitCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
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

      const items = contentRef.current?.querySelectorAll(".reveal-item");
      items?.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
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
    }, sectionRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] min-h-[600px] overflow-hidden flex items-center justify-center"
    >
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={images.churchSunset}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/80" />
      </div>

      <div
        ref={contentRef}
        className="relative z-10 text-center max-w-3xl mx-auto px-6"
      >
        <p className="reveal-item text-xs uppercase tracking-[0.4em] text-gold mb-6">
          {t.home.visitLabel}
        </p>
        <h2 className="reveal-item text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
          {t.home.visitTitle}
        </h2>
        <p className="reveal-item mt-6 text-white/80 text-lg max-w-xl mx-auto leading-relaxed">
          {t.home.visitBody}
        </p>
        <div className="reveal-item mt-10">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold text-navy text-sm uppercase tracking-[0.2em] font-medium hover:bg-white transition-all duration-500 group"
          >
            {t.home.visitCta}
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
