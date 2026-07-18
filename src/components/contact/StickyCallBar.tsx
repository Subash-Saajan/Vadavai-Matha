"use client";

import { useEffect, useState } from "react";
import { Phone, Navigation, MessageCircle } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { PHONE, MAP_LINKS, hasWhatsApp, whatsAppLink, ADDRESS } from "@/lib/contact";

/**
 * The single most useful affordance on this page, on the device most of its
 * visitors hold: a thumb-reachable bar with the parish's number.
 *
 * It appears once the hero has scrolled past — before that, the ThresholdBar
 * already offers the same actions, and two of them at once would be noise.
 * Padded for the iPhone home indicator via env(safe-area-inset-bottom).
 */
export function StickyCallBar() {
  const { t } = useLang();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`lg:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-500 ease-out ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      // Hidden from assistive tech while off-screen; the same links exist in
      // the page body, so nothing is lost when it is inert.
      aria-hidden={!shown}
    >
      <div className="bg-navy/95 backdrop-blur border-t border-gold/25 px-3 py-3 flex items-center gap-2.5">
        <a
          href={`tel:${PHONE.e164}`}
          tabIndex={shown ? 0 : -1}
          className="flex-1 inline-flex items-center justify-center gap-2.5 min-h-[50px] rounded-full bg-gold text-navy font-medium"
        >
          <Phone className="w-4 h-4" aria-hidden="true" />
          <span className="tabular-nums text-sm">{PHONE.display}</span>
        </a>

        {hasWhatsApp && (
          <a
            href={whatsAppLink(`${ADDRESS.name}: `)}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={shown ? 0 : -1}
            aria-label={t.contact.actions.whatsapp}
            className="grid place-items-center min-w-[50px] min-h-[50px] rounded-full border border-white/20 text-white/80"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
          </a>
        )}

        <a
          href={MAP_LINKS.googleDirections}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={shown ? 0 : -1}
          aria-label={t.contact.actions.directions}
          className="grid place-items-center min-w-[50px] min-h-[50px] rounded-full border border-white/20 text-white/80"
        >
          <Navigation className="w-4 h-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
