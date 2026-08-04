"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { cappedSizes } from "@/lib/imageSizes";
import { gsap, DESKTOP, revealY } from "@/lib/gsap";

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
      // Background slow zoom. An entrance, so it plays on every device: one
      // tween, 2.4s, and then the element is at rest for the life of the page.
      gsap.fromTo(
        imgRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 2.4,
          ease: "power3.out",
        }
      );

      // Stagger entrance. `revealY()` rather than a flat 40px — see lib/gsap.ts:
      // 40px is a tenth of a phone screen, and a heading that slides a tenth of
      // the screen into place is read as sliding, not as arriving.
      gsap.from([labelRef.current, titleRef.current, introRef.current], {
        y: revealY(),
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      });

      /* ── Desktop only: the backdrop parallax ─────────────────────────────
         This is the single highest-traffic scrubbed tween on the site. It is
         not one hero — it is the masthead of /history, /architecture,
         /priests, /mass-timings, /contact and both saint pages, so on a phone
         every inner page opened by writing a transform on a full-bleed,
         full-viewport photograph on every scrolled frame, for the whole first
         screen of the page, purely to drift the picture behind the title.

         It is also the worst possible frame to be repainting: the hero image
         is the LCP element, so the drift competes with decode and with the
         entrance tweens above at exactly the moment the reader is deciding
         whether the site feels fast. Gated, not merely paused — inside
         matchMedia the tween is never built, so no ScrollTrigger is created
         and the layer is never promoted. See the DESKTOP note in lib/gsap.ts. */
      const mm = gsap.matchMedia();
      mm.add(DESKTOP, () => {
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
      });
      return () => mm.revert();
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    /* ── HOW MUCH OF A PHONE THIS MASTHEAD IS ALLOWED TO COST ──────────────
       `h-[80vh] min-h-[520px]` was the phone value too, and on every inner
       page of the site that was the first thing the reader met. On a 390×745
       iPhone viewport 80vh is ~600px — and `vh` resolves against the LARGE
       viewport (bar hidden, ~800px), so it is nearer 640px, or about 86% of
       what is actually on screen. Add the fixed 64px navbar over it and a
       pilgrim who opened /mass-timings to find a Mass time saw a photograph,
       a title, and nothing else at all until they scrolled.

       `62svh` instead, and the unit matters as much as the number:
         · `svh` is the SMALL viewport — the height with the address bar
           SHOWN. The hero is not sticky and its backdrop is `inset-0`, so it
           is laid out once; sizing it to the smaller of the two states means
           it is whole on arrival and does not grow past the fold as the bar
           retracts. (A sticky stage would want `vh` for the opposite reason —
           see the note on the home hero.)
         · the floor drops 520px → 380px WITH it. A `min-h` floor above the
           `vh` value silently wins on every short screen, which is how a
           height reduction ends up changing nothing; 62svh is ~460px on a
           common phone, so 380px only engages on a landscape phone, which is
           what a floor is for.
       Desktop keeps both numbers exactly. */
    <section
      ref={sectionRef}
      className="relative h-[62svh] min-h-[380px] md:h-[80vh] md:min-h-[520px] flex items-end overflow-hidden bg-navy"
    >
      {/* `md:will-change-transform`. The permanent layer promotion was bought
          for the scrolled parallax, which no longer exists below md; what is
          left on a phone is one 2.4s entrance tween, and GSAP promotes for the
          duration of a tween by itself. A standing `will-change` on a
          full-bleed image holds a full-viewport texture for the life of the
          page — on every inner page of the site — to serve 2.4 seconds. */}
      <div ref={imgRef} className="absolute inset-0 md:will-change-transform">
        <Image
          src={image}
          alt={alt}
          fill
          className={`object-cover ${imagePosition ?? "object-center"}`}
          sizes={cappedSizes("100vw")}
          preload
        />
        <div className={`absolute inset-0 ${overlayClassName ?? DEFAULT_OVERLAY}`} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-14 md:pb-28 w-full">
        {/* 0.4em of tracking is 4.8px of air after every letter. On a 1440px
            monitor that is an inscription; in a 340px column it is a two-line
            eyebrow crowding the title under it. The size stays at 12px — it is
            already at the floor — and only the air comes out. */}
        <p
          ref={labelRef}
          className="text-xs uppercase tracking-[0.2em] md:tracking-[0.4em] text-gold mb-4 md:mb-6"
        >
          {label}
        </p>
        {/* `text-5xl` was the phone size as well: 48px of Cormorant at
            leading-[1.05] in a 340px column, which sets "Mass Timings &
            Festivals" as five stacked words. The clamp holds the title at a
            share of the screen and tops out at 36px just as `md:` takes over.
            Same scale as the home page's display headings. */}
        <h1
          ref={titleRef}
          className="font-serif text-[clamp(1.85rem,7.4vw,2.25rem)] md:text-7xl lg:text-8xl text-white leading-[1.05] max-w-4xl"
        >
          {title}
        </h1>
        {/* 1.02rem, a hair above the 0.98rem the site sets sans body at on a
            phone, and the reason is the ground rather than the type: this is
            80%-white over a photograph behind a scrim, not near-black on cream,
            and the same number is measurably harder to read there. On /contact
            this paragraph carries the parish telephone number. */}
        {intro && (
          <p
            ref={introRef}
            className="mt-5 md:mt-8 text-[1.02rem] md:text-xl text-white/80 max-w-2xl leading-relaxed"
          >
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
