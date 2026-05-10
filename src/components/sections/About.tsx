"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const compositeRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const churchRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── 3D Parallax layers: sky moves slow, church moves medium ──
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
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Glow pulse on church layer
      gsap.to(glowRef.current, {
        opacity: 0.6,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Composite entrance — scale up
      gsap.fromTo(
        compositeRef.current,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: compositeRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Text reveals
      const items = textBlockRef.current?.querySelectorAll(".reveal-item");
      if (items) {
        items.forEach((el, i) => {
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
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-cream overflow-visible"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="reveal-item mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-gold font-medium flex items-center gap-3">
            <span className="w-10 h-px bg-gold/60" />
            Our Heritage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Layered 3D composite: same bottom, church taller ── */}
          <div ref={compositeRef} className="relative mt-52">
            {/* Sky background — shorter, sits at bottom */}
            <div
              ref={skyRef}
              className="relative w-full rounded-2xl overflow-hidden shadow-lg"
              style={{ aspectRatio: "16 / 10" }}
            >
              <Image
                src="/background.jpeg"
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            {/* Church (transparent PNG) — bottom-aligned with bg, rises above */}
            <div
              ref={churchRef}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10"
              style={{ width: "95%", height: "220%" }}
            >
              <Image
                src="/images/church-night.png"
                alt="Vadakancherry Matha Church"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 80vw, 35vw"
                style={{
                  filter: "drop-shadow(0 25px 50px rgba(10,22,40,0.3))",
                }}
              />
            </div>

            {/* Gold glow behind church */}
            <div
              ref={glowRef}
              className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-5 w-[50%] h-[30%] rounded-full blur-3xl bg-gold/25 opacity-0"
            />

            {/* Floating stat card */}
            <div className="relative z-20 mx-4 mt-6 bg-white/90 backdrop-blur-md rounded-xl p-5 shadow-lg">
              <p className="text-3xl font-bold text-navy">Est. 1872</p>
              <p className="text-sm text-text-muted mt-1">
                Over 150 years of faith and service
              </p>
            </div>
          </div>

          {/* Text content */}
          <div ref={textBlockRef} className="space-y-6">
            <h2 className="reveal-item text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight">
              A Legacy of
              <span className="text-gradient-gold block">
                Faith & Devotion
              </span>
            </h2>

            <p className="reveal-item text-lg text-text-muted leading-relaxed">
              Vadakancherry Matha Church stands as a beacon of spirituality and
              community in the heart of Vadakancherry. For over a century, this
              sacred place has been a home for the faithful, a shelter for the
              weary, and a testament to unwavering devotion.
            </p>

            <p className="reveal-item text-lg text-text-muted leading-relaxed">
              Our church is dedicated to the Blessed Virgin Mary, and every
              corner of this holy ground echoes with prayers, hymns, and the
              warmth of a community bound together by love and faith.
            </p>

            <div className="reveal-item pt-4">
              <div className="flex gap-8">
                <div>
                  <p className="text-3xl font-bold text-gradient-gold">5000+</p>
                  <p className="text-sm text-text-muted mt-1">Parish Members</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gradient-gold">150+</p>
                  <p className="text-sm text-text-muted mt-1">
                    Years of Service
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gradient-gold">12</p>
                  <p className="text-sm text-text-muted mt-1">
                    Weekly Services
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
