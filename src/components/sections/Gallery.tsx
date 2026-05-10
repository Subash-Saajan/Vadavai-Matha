"use client";

import { useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface TiltCardProps {
  src: string;
  alt: string;
  title: string;
  className?: string;
}

function TiltCard({ src, alt, title, className = "" }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      className={`perspective-container ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={cardRef} className="tilt-card rounded-2xl overflow-hidden relative group cursor-pointer">
        <div className="relative aspect-[3/4]">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="tilt-card-shine rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
          <div className="tilt-card-inner absolute bottom-0 left-0 right-0 p-6">
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

const galleryItems = [
  {
    src: "/images/church-night.png",
    alt: "Church at Night",
    title: "Evening Illumination",
  },
  {
    src: "/church-interior.jpeg",
    alt: "Church Exterior",
    title: "Sacred Architecture",
  },
  {
    src: "/church.png",
    alt: "Church Front View",
    title: "House of Prayer",
  },
];

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.children;
      if (!cards) return;

      Array.from(cards).forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: i * 0.15,
          }
        );
      });

      // Horizontal parallax offset on each card
      if (cards.length >= 3) {
        gsap.to(cards[0], {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(cards[1], {
          y: -60,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
        gsap.to(cards[2], {
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-navy overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gold font-medium mb-4">
            Visual Journey
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Glimpses of <span className="text-gradient-gold">Grace</span>
          </h2>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {galleryItems.map((item) => (
            <TiltCard
              key={item.title}
              src={item.src}
              alt={item.alt}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
