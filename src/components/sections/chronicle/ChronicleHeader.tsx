"use client";

import { useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/components/layout/LanguageProvider";
import { chronicleCounts, fillCounts } from "@/lib/chronicle";

/**
 * The kicker, the heading and the standing instruction for the Chronicle.
 *
 * ⚠ IT CARRIES NO CONTAINER OF ITS OWN — no `mx-auto`, no `max-w`, no gutter.
 * The caller places it. That is deliberate: the carousel has to put its heading
 * and its first card on exactly one left edge, and a heading that brought its
 * own centred container would fight that. Whatever wraps this decides where it
 * sits.
 *
 * The `{n}` in the body sentence is COUNTED, not typed — the header reads the
 * real number of moments off `history.eras` itself. See chronicleCounts in
 * lib/chronicle.ts for why: the first draft of this copy said "fifty-six" when
 * /history had held fifty-eight for some time, because a number written into a
 * sentence cannot notice that a year was added to a chapter.
 *
 * THERE IS NO "DRAG, OR USE THE ARROWS" LINE ANY MORE, and it is not missed.
 * It was instructing the reader to do a thing the page does for them — on
 * desktop the strip moves with the page's own scroll, and on a phone a strip
 * of cards running off the edge of the screen has never needed to be told to a
 * thumb. It cost about forty vertical pixels inside a section pinned to exactly
 * one viewport, which is height the cards wanted more.
 */
export function ChronicleHeader({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { t, lang } = useLang();
  const counts = chronicleCounts(t.history.eras, t.home.chronicleFrames.length);
  const body = fillCounts(t.home.chronicleBody, { n: counts.moments });

  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current?.querySelectorAll(".reveal-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 38, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [lang]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <span className="section-numeral pointer-events-none absolute -top-10 right-0 select-none text-[7rem] opacity-[0.06] md:text-[12rem]">
        III
      </span>
      <p className="reveal-item kicker mb-5">{t.home.chronicleLabel}</p>
      <h2 className="reveal-item max-w-3xl font-serif text-4xl leading-[1.05] text-navy md:text-5xl lg:text-6xl">
        {t.home.chronicleTitle}
      </h2>
      <p className="reveal-item mt-6 max-w-2xl text-lg leading-relaxed text-text-muted">
        {body}
      </p>
    </div>
  );
}
