"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";

/**
 * The client half of /saints/john-de-britto. Structure and choreography mirror
 * the Devasahayam page exactly (same reveal idiom, same section rhythm), so the
 * two saints read as a matched pair. Content comes from t.saintDeBritto; the
 * server page.tsx owns metadata and the JSON-LD.
 *
 * Like the Devasahayam hero (Gnanapoo Ammal's tomb), this page opens on a
 * REAL photograph — the John de Britto grotto in the shrine's own grounds —
 * so the alt text describes exactly what is in it.
 */
export default function DeBrittoPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const bondImgRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const s = t.saintDeBritto;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = pageRef.current?.querySelectorAll(".reveal-item");
      items?.forEach((el) => {
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
          }
        );
      });

      if (bondImgRef.current) {
        gsap.to(bondImgRef.current, {
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: bondImgRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }
    }, pageRef);
    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={pageRef}>
      <PageHero
        label={s.label}
        title={s.name}
        intro={s.intro}
        image="/images/de-britto-grotto.jpg"
        alt="The John de Britto grotto in the grounds of the Holy Family Shrine, Vadakkankulam — a wooden Gothic shrine holding a statue of St John de Britto (Arulanandar), flanked by St Michael and St Raphael, beneath a neem tree"
        imagePosition="object-[center_42%]"
      />

      {/* ── Quick-facts strip ─────────────────────── */}
      <section className="relative bg-navy text-white border-t border-gold/15">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 md:py-16">
          <p className="reveal-item text-center text-xs uppercase tracking-[0.4em] text-gold/80 mb-3">
            {s.epithet}
          </p>
          <div className="reveal-item flex items-center justify-center gap-6 text-center mb-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-gold">{s.feast}</span>
            <span className="w-px h-4 bg-gold/30" />
            <span className="text-[11px] uppercase tracking-[0.3em] text-white/60">{s.canonised}</span>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6">
            {s.facts.map((f, i) => (
              <div key={i} className="reveal-item border-l border-gold/30 pl-4">
                <dt className="text-[10px] uppercase tracking-[0.3em] text-gold/80 mb-1.5">
                  {f.label}
                </dt>
                <dd className="text-base md:text-lg font-serif text-white leading-snug">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Opening quote ─────────────────────── */}
      <section className="bg-cream section-padding relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/8 blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <div className="reveal-item">
            <svg width="40" height="32" viewBox="0 0 40 32" fill="none" aria-hidden="true" className="mx-auto mb-6 text-gold/60">
              <path d="M0 32V18C0 8 5 2 16 0v6c-5 1-8 5-8 10h8v16H0zm24 0V18c0-10 5-16 16-18v6c-5 1-8 5-8 10h8v16H24z" fill="currentColor" />
            </svg>
            <p className="font-serif text-3xl md:text-4xl text-navy italic leading-snug">
              {s.quote}
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.3em] text-text-muted">
              {s.quoteAttribution}
            </p>
          </div>
        </div>
      </section>

      {/* ── Story sections ─────────────────────── */}
      <section className="bg-cream pb-24 md:pb-32 relative">
        <div className="max-w-3xl mx-auto px-6 space-y-16">
          {s.sections.map((sec, i) => (
            <article key={i} className="reveal-item">
              <p className="text-[11px] uppercase tracking-[0.35em] text-gold/80 mb-3">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-serif text-3xl md:text-4xl text-navy mb-5 leading-tight">
                {sec.heading}
              </h2>
              <p className="text-text-muted text-lg leading-relaxed">
                {sec.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ── THE VADAKKANKULAM BOND (featured) ─────────────────────── */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div ref={bondImgRef} className="absolute inset-0 will-change-transform opacity-25">
          <Image
            src="/images/architecture/facade.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.25),transparent_60%)]" />

        <div className="relative section-padding">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <p className="reveal-item text-xs uppercase tracking-[0.4em] text-gold mb-4">
                {s.bond.label}
              </p>
              <h2 className="reveal-item font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-[1.05] mb-6">
                {s.bond.title}
              </h2>
              <p className="reveal-item text-white/75 text-lg leading-relaxed">
                {s.bond.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {s.bond.pillars.map((p, i) => (
                <div
                  key={i}
                  className="reveal-item group relative rounded-3xl overflow-hidden bg-white/[0.04] ring-1 ring-gold/20 p-8 md:p-10 backdrop-blur-sm hover:bg-white/[0.06] transition-colors duration-700"
                >
                  <div className="flex items-start gap-5">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-gold/15 ring-1 ring-gold/40 flex items-center justify-center font-serif text-gold text-lg">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl text-white mb-3 leading-tight">
                        {p.heading}
                      </h3>
                      <p className="text-white/70 text-base leading-relaxed">
                        {p.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Sources + back link ─────────────────────── */}
      <section className="bg-cream pb-24 md:pb-32">
        <div className="max-w-3xl mx-auto px-6">
          <div className="reveal-item rounded-2xl border border-gold/20 bg-white/40 backdrop-blur-sm p-8 md:p-10">
            <p className="text-[11px] uppercase tracking-[0.35em] text-gold/80 mb-3">
              {s.sources.heading}
            </p>
            <p className="text-text-muted text-sm md:text-base leading-relaxed italic">
              {s.sources.body}
            </p>
          </div>

          <div className="reveal-item mt-12 text-center">
            <Link
              href="/#saints"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-gold hover:text-navy transition-colors duration-500"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {s.back}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
