"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { images } from "@/lib/images";
import { useLang } from "@/components/layout/LanguageProvider";

// Sticky-scale parallax: section is tall, the inner sticky stage stays pinned
// via CSS, GSAP only animates scale/border-radius/text — never pins the DOM.
// This avoids the React 19 + GSAP pin removeChild conflict.
export function ScrollShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image: card → full-bleed
      gsap.fromTo(
        imageRef.current,
        { scale: 0.5, borderRadius: 32 },
        {
          scale: 1,
          borderRadius: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Text fades out as image takes over
      gsap.to(textRef.current, {
        yPercent: -30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% bottom",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [lang]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream"
      style={{ height: "260vh" }}
    >
      {/* Sticky stage — CSS pin, NOT GSAP pin */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <div
          ref={imageRef}
          className="absolute inset-0 origin-center will-change-transform"
          style={{ padding: "10vh 10vw" }}
        >
          <div className="relative w-full h-full overflow-hidden rounded-[inherit]">
            <Image
              src={images.sunlightInterior}
              alt="Sunlit church interior"
              fill
              className="object-cover"
              sizes="100vw"
              preload
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy/40" />
          </div>
        </div>

        <div
          ref={textRef}
          className="relative z-10 h-full flex items-center justify-center px-6 pointer-events-none"
        >
          <div className="text-center max-w-3xl">
            <p className="text-xs uppercase tracking-[0.4em] text-gold mb-6">
              {t.home.showcaseLabel}
            </p>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-2xl leading-tight">
              {t.home.showcaseTitle}
            </h2>
            <p className="mt-6 text-white/90 text-lg max-w-xl mx-auto leading-relaxed drop-shadow-lg">
              {t.home.showcaseBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
