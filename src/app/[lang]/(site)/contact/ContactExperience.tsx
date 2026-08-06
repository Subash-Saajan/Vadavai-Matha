"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { gsap, revealY, revealStart, revealDuration } from "@/lib/gsap";
import { PageHero } from "@/components/sections/PageHero";
import { useLang } from "@/components/layout/LanguageProvider";
import {
  PHONE,
  hasWhatsApp,
  whatsAppLink,
  URGENT_PURPOSE,
  type Purpose,
} from "@/lib/contact";

import { ThresholdBar } from "@/components/contact/ThresholdBar";
import { DedicationTablet } from "@/components/contact/DedicationTablet";
import { PurposeSelector } from "@/components/contact/PurposeSelector";
import { RoutedContactForm } from "@/components/contact/RoutedContactForm";
import { SickCallPanel } from "@/components/contact/SickCallPanel";
import { Directory } from "@/components/contact/Directory";
import { PilgrimMap } from "@/components/contact/PilgrimMap";
import { TravelWaymarkers } from "@/components/contact/TravelWaymarkers";
import { VisitWindow } from "@/components/contact/VisitWindow";
import { StickyCallBar } from "@/components/contact/StickyCallBar";

/**
 * The client half of /contact. The server half (page.tsx) owns metadata and
 * the JSON-LD graph; everything interactive lives here.
 *
 * The lifted `purpose` state is what makes this a switchboard rather than a
 * form: it decides which fieldset appears, where the message is routed, and —
 * for a sick call — whether a form appears at all.
 *
 * The form is no longer hidden behind that choice. It stands open beneath the
 * map, already answerable, defaulting to a plain message; choosing a purpose
 * reshapes it in place rather than conjuring it out of nothing.
 */
export function ContactExperience() {
  const { t, lang } = useLang();
  const rootRef = useRef<HTMLDivElement>(null);
  const [purpose, setPurpose] = useState<Purpose>("other");

  // The same reveal idiom as every other page. GSAP sets the hidden state
  // inline, so with JavaScript disabled the content simply renders — unlike
  // the CSS .reveal-up class, which would leave it invisible forever.
  //
  // ⚠ This page builds NO scrubbed motion at all — no parallax, no drifting
  // backdrop, no infinite yoyo — so there is nothing here to gate behind
  // `DESKTOP`. It is a switchboard: the only animation a pilgrim should ever
  // notice is a block of telephone numbers arriving. That is deliberate and it
  // is why this file imports `revealY` and not `matchMedia`.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      // 44px was written for a monitor. On a 390px phone that is more than a
      // tenth of the screen, so every card on this page — the brass plate, the
      // map, the form — visibly slid into position instead of settling, and on
      // a fast flick a reader met the parish's telephone number still in
      // motion. `revealY()` reads the same breakpoint the rest of the site
      // does and shortens the travel to 20px on touch.
      const from = revealY();

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: from, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: revealDuration(0.9),
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: revealStart("top 88%"),
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, [lang]);

  // A sick call is the one purpose that must never become a message: it dials.
  const urgent = purpose === URGENT_PURPOSE;

  return (
    <div ref={rootRef} className="contact-page">
      {/* Inside the shrine rather than above it: the kneeling angel beside the
          pulpit, with the flower-dressed high altar behind. A page that asks a
          pilgrim to come should show what they would be walking into.

          The angel stands in the right third, so the scrim is weighted to the
          left rather than washed evenly over everything — see
          .hero-scrim-subject-right. An even wash has to be dark enough for white
          type over the brightest part of the frame, which is what made this hero
          read as dull: the statue was being dimmed to keep the heading legible.

          The frame is 2.53:1 — wider than the hero at any ordinary window size —
          so `object-cover` scales it by height and the wings are never clipped.
          The right wingtip clears the top edge by five pixels; there is no
          vertical room to give, which is why the crop is held on the horizontal
          axis alone. At 75% the angel lands around two-thirds across on a
          desktop and centred on a phone, where the hero keeps only a quarter of
          this frame's width. */}
      <PageHero
        label={t.contact.label}
        title={t.contact.title}
        intro={t.contact.intro}
        image="/images/sanctuary-angel.jpg"
        alt="A carved angel in a rose-coloured robe kneels with hands joined in prayer beside the pulpit of the shrine, the flower-dressed high altar and its saints out of focus behind"
        overlayClassName="hero-scrim-subject-right"
        imagePosition="object-[75%_center]"
      />

      <ThresholdBar />

      <DedicationTablet />

      <PilgrimMap id="where" />

      {/* Where you are, then what you came to say — the map answers the first
          question, so the message sits directly under it. */}
      <section
        id="reach"
        className="section-padding relative overflow-hidden bg-cream parchment-sheen scroll-mt-24"
      >
        <div
          className="light-shaft absolute -top-16 -right-10 w-[45%] h-[120%] -rotate-6"
          aria-hidden="true"
        />
        <span className="section-numeral pointer-events-none absolute -top-6 left-4 md:left-12 text-[7rem] md:text-[11rem] opacity-[0.05] select-none">
          III
        </span>

        <div className="relative max-w-6xl mx-auto">
          <header className="reveal text-center mb-10 md:mb-12">
            <p className="kicker justify-center mb-5">{t.contact.purpose.kicker}</p>
            {/* The site's mobile heading scale: a share of the screen rather
                than a fixed 36px, topping out at the size this was drawn at
                exactly as `md` takes over, so desktop is untouched. */}
            <h2
              id="purpose-heading"
              className="font-serif text-[clamp(1.95rem,7.8vw,2.25rem)] md:text-5xl lg:text-6xl text-navy leading-[1.04]"
            >
              {t.contact.purpose.heading}
            </h2>
          </header>

          <PurposeSelector value={purpose} onChange={setPurpose} labelledBy="purpose-heading" />

          {/* Never let the form be the only way through. */}
          {!urgent && (
            <div className="reveal mt-10 md:mt-12 mb-8 flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-6">
              <p className="text-[0.88rem] md:text-sm text-text-muted text-center sm:text-left">
                <span className="text-navy font-medium">{t.contact.express.heading}</span>{" "}
                {t.contact.express.body}
              </p>
              {/* Two pills, side by side, in whatever is left of a 390px screen
                  after the section gutters. `px-4` on mobile is what keeps them
                  on one line now that the number inside is 16px — see below. */}
              <div className="flex justify-center gap-2.5">
                <a
                  href={`tel:${PHONE.e164}`}
                  className="inline-flex items-center gap-2 min-h-11 px-4 md:px-5 rounded-full border border-gold/30 text-navy/75 text-[0.9rem] md:text-sm hover:border-gold hover:text-gold-dark transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  {/* ⚠ A TELEPHONE NUMBER NEVER GOES BELOW 16px ON A PHONE.
                      `text-sm` is 14px, and this is a string of eleven digits
                      that somebody may be reading off a screen in daylight
                      while standing at a bus stop, or copying by hand. It is
                      the one piece of text on this page that has to survive
                      bad conditions, so it is the one that does not shrink. */}
                  <span className="tabular-nums text-base md:text-sm">{PHONE.display}</span>
                </a>
                {hasWhatsApp && (
                  <a
                    href={whatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-11 px-4 md:px-5 rounded-full border border-gold/30 text-navy/75 text-[0.9rem] md:text-sm hover:border-gold hover:text-gold-dark transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {t.contact.actions.whatsapp}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Whatever the chosen purpose calls for. A sick call gets the
              telephone, large; everything else gets the form, already open.
              Remounting on purpose change resets every field cleanly instead
              of carrying a stale value over from another fieldset. */}
          <div className={urgent ? "reveal mt-10 md:mt-12" : ""}>
            {urgent ? <SickCallPanel /> : <RoutedContactForm key={purpose} purpose={purpose} />}
          </div>
        </div>
      </section>

      <Directory />

      <TravelWaymarkers />

      <VisitWindow />

      <StickyCallBar />
    </div>
  );
}
