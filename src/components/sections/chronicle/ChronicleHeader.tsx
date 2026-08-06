"use client";

import { useRef, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/components/LocaleLink";
import {
  gsap,
  revealStart,
  revealDuration,
  revealDelay,
  revealTravel,
} from "@/lib/gsap";
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
          { y: revealTravel(38), opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(1),
            ease: "power3.out",
            delay: revealDelay(i, 0.1),
            scrollTrigger: {
              trigger: el,
              start: revealStart("top 88%"),
              toggleActions: "play none none none",
            },
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
      <h2 className="reveal-item max-w-3xl font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] leading-[1.05] text-navy md:text-5xl lg:text-6xl">
        {t.home.chronicleTitle}
        {/* Desktop: the link rides INSIDE the heading, as one more inline word
            after "…written down". Set as a sibling block it would align to the
            right edge of the h2's max-w-3xl box — a third of a screen adrift of
            the text it belongs to, which is how it read beside the paragraph.
            Inline, it follows the last line wherever that line happens to end,
            in either language. It is far shorter than the 1.05 line box it sits
            in, so it adds NO height — which matters, because this section is
            pinned to exactly one viewport at `lg` and every pixel gained up
            here is taken off the cards. */}
        <HistoryLink className="ml-5 hidden align-middle lg:inline-flex" />
      </h2>
      <p className="reveal-item mt-6 max-w-2xl text-[0.98rem] leading-relaxed text-text-muted md:text-lg">
        {body}
      </p>
      {/* Below `lg` there is no pin and no room beside a heading that is already
          filling the screen, so the same link stacks under the paragraph. */}
      <HistoryLink className="reveal-item mt-6 inline-flex lg:hidden" />
    </div>
  );
}

/**
 * The Chronicle header's way into /history.
 *
 * Rendered twice — once inline in the heading for `lg`, once stacked for
 * everything under it — because the two placements are a layout difference, not
 * a styling one, and only one is ever visible. The caller supplies the display
 * class and the position; everything else is fixed here so the two cannot drift
 * apart. Deliberately the outline pill and not the filled navy one the last
 * card of the strip carries: two doors into the same page should not look like
 * the same button twice.
 *
 * It is NOT a `.reveal-item` in the heading — it inherits the h2's own reveal
 * there, and animating a child inside an animating parent reads as a stutter.
 */
function HistoryLink({ className = "" }: { className?: string }) {
  const { t } = useLang();
  return (
    <Link
      href="/history"
      className={`group shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-gold/60 px-5 py-2.5 font-display text-[0.7rem] leading-none tracking-[0.18em] text-navy uppercase transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-navy lg:text-[0.65rem] lg:tracking-[0.2em] ${className}`}
    >
      {t.home.chronicleHeaderCta}
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}
