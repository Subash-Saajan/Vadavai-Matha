"use client";

import { useEffect, useRef, useState } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { gsap } from "@/lib/gsap";
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
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
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
      {/* The shrine's own twin spires — the landmark the map copy promises is
          visible from the highway. Not a stock photograph. The sunset sky
          behind them is pale, so the scrim is deepened for legibility.

          The church sits in the lower half of the frame, so the crop is held
          near the bottom: centred, this hero was mostly sky. */}
      <PageHero
        label={t.contact.label}
        title={t.contact.title}
        intro={t.contact.intro}
        image="/images/fest-drone.jpg"
        alt="The twin spires and domed roof of the Holy Family Shrine at sunset, with the hills of the Western Ghats on the horizon"
        overlayClassName="bg-linear-to-b from-navy/55 via-navy/35 to-navy/85"
        imagePosition="object-[center_85%]"
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
            <h2
              id="purpose-heading"
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy leading-[1.04]"
            >
              {t.contact.purpose.heading}
            </h2>
          </header>

          <PurposeSelector value={purpose} onChange={setPurpose} labelledBy="purpose-heading" />

          {/* Never let the form be the only way through. */}
          {!urgent && (
            <div className="reveal mt-12 mb-8 flex flex-col sm:flex-row sm:items-center justify-center gap-4 sm:gap-6">
              <p className="text-sm text-text-muted text-center sm:text-left">
                <span className="text-navy font-medium">{t.contact.express.heading}</span>{" "}
                {t.contact.express.body}
              </p>
              <div className="flex justify-center gap-2.5">
                <a
                  href={`tel:${PHONE.e164}`}
                  className="inline-flex items-center gap-2 min-h-11 px-5 rounded-full border border-gold/30 text-navy/75 text-sm hover:border-gold hover:text-gold-dark transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                  <span className="tabular-nums">{PHONE.display}</span>
                </a>
                {hasWhatsApp && (
                  <a
                    href={whatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 min-h-11 px-5 rounded-full border border-gold/30 text-navy/75 text-sm hover:border-gold hover:text-gold-dark transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
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
          <div className={urgent ? "reveal mt-12" : ""}>
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
