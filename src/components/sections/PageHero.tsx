"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

interface Props {
  label: string;
  title: string;
  intro?: string;
  image: string;
  /**
   * Required, not optional, and deliberately so.
   *
   * This photograph is the largest thing on the page — it is the LCP element
   * and, on four of six routes, the only picture Google Images has to go on.
   * It shipped as alt="" everywhere, which told assistive tech and the crawler
   * alike that the shrine's own photographs were decoration. Making the prop
   * required means a new page cannot quietly repeat that.
   *
   * Describe what is actually in the frame. Do not restate the <h1> — the
   * heading is already read out — and do not stuff it with keywords.
   */
  alt: string;
  /**
   * Override the scrim when the photograph is bright behind the text. The gold
   * kicker fails contrast over a pale sky, and this hero carries a telephone
   * number that elderly pilgrims must be able to read.
   */
  overlayClassName?: string;
  /**
   * Where to hold the crop. The hero is far wider than it is tall, so a
   * landscape photograph loses most of its height to `object-cover` — and a
   * centred crop keeps whatever happens to sit in the middle of the frame,
   * which on a drone shot is sky. Push this toward `100%` to hold the bottom
   * of the picture (the building) instead.
   */
  imagePosition?: string;
}

const DEFAULT_OVERLAY = "bg-gradient-to-b from-navy/40 via-navy/30 to-navy/90";

export function PageHero({
  label,
  title,
  intro,
  image,
  alt,
  overlayClassName,
  imagePosition,
}: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background slow zoom
      gsap.fromTo(
        imgRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 2.4,
          ease: "power3.out",
        }
      );

      // Parallax on scroll
      gsap.to(imgRef.current, {
        yPercent: 25,
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Stagger entrance
      gsap.from([labelRef.current, titleRef.current, introRef.current], {
        y: 40,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[80vh] min-h-[520px] flex items-end overflow-hidden bg-navy"
    >
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={image}
          alt={alt}
          fill
          className={`object-cover ${imagePosition ?? "object-center"}`}
          sizes="100vw"
          preload
        />
        <div className={`absolute inset-0 ${overlayClassName ?? DEFAULT_OVERLAY}`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20 md:pb-28 w-full">
        <p
          ref={labelRef}
          className="text-xs uppercase tracking-[0.4em] text-gold mb-6"
        >
          {label}
        </p>
        <h1
          ref={titleRef}
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] max-w-4xl"
        >
          {title}
        </h1>
        {intro && (
          <p
            ref={introRef}
            className="mt-8 text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
