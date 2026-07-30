"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import Script from "next/script";
import { Phone, Copy, Check, AlertCircle, MessageCircle } from "lucide-react";
import { useLang } from "@/components/layout/LanguageProvider";
import { sendContact } from "@/app/[lang]/(site)/contact/actions";
import {
  PHONE,
  config,
  hasWhatsApp,
  whatsAppLink,
  type Purpose,
} from "@/lib/contact";
import {
  PURPOSE_FIELDS,
  SACRAMENT_TYPES,
  RECORD_TYPES,
  INTENTION_TYPES,
  initialContactState,
  type FieldName,
} from "@/lib/contactSchema";

/* ── Field primitives ──────────────────────────────────────────────────────
   Every input is bound to its label by id. The error is bound by
   aria-describedby and flagged by aria-invalid, so a screen reader announces
   the problem when focus lands on the field (WCAG 3.3.1). Values are always
   repopulated from the returned state, so a failed submit never costs a
   pilgrim their typing (WCAG 3.3.7).                                          */

function Field({
  name,
  label,
  hint,
  error,
  children,
}: {
  name: FieldName;
  label: string;
  hint?: string;
  error?: string;
  children: (props: {
    id: string;
    name: string;
    "aria-invalid": boolean;
    "aria-describedby": string | undefined;
    className: string;
  }) => React.ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div>
      {/* ⚠ `.field-label` CARRIES THE SIZE. DO NOT ADD `text-*`, `tracking-*`
          OR `uppercase` HERE — see the long note beside the class in
          globals.css. It was written inline until now, and that was two bugs
          in one: 0.6rem is 9.6px, a caption on a monitor and a smudge in a
          hand; and on /ta a bare `font-display` takes the 58% HEADING cut, so
          every label on this form rendered at roughly SIX PIXELS. The class
          fixes both, and it carries the exact numbers this element already
          had, so English is unchanged at every width. */}
      <label
        htmlFor={id}
        className="field-label block text-gold-dark mb-2.5"
      >
        {label}
      </label>
      {children({
        id,
        name,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy || undefined,
        /* A cut rule rather than a box: the gold hairline is the focus state.
           ⚠ `text-lg` IS LOAD-BEARING AND IT IS NOT A LOOK. Mobile Safari
           zooms the entire page when focus lands on a form control whose
           computed font-size is under 16px, and it does not zoom back out when
           the field is blurred — the visitor is left on a page they now have
           to pinch and pan to finish. 18px clears the threshold with room to
           spare. Do not "tidy" this to `text-sm`, and do not add a smaller
           `text-*` at any breakpoint below `md`. */
        className: `w-full bg-transparent border-0 border-b px-0 py-2.5 text-navy text-lg outline-hidden transition-colors placeholder:text-navy/25 ${
          error
            ? "border-oxblood focus:border-oxblood"
            : "border-navy/15 focus:border-gold"
        }`,
      })}
      {hint && !error && (
        <p id={hintId} className="mt-2 text-[0.8rem] md:text-[0.72rem] text-text-muted">
          {hint}
        </p>
      )}
      {/* An error a pilgrim cannot read is a form they abandon. 0.75rem is
          12px in oxblood on white — legible on a monitor at reading distance,
          marginal on a phone held at arm's length in sun. */}
      {error && (
        <p
          id={errorId}
          className="mt-2 flex items-center gap-1.5 text-[0.84rem] md:text-[0.75rem] text-oxblood"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

/* Same 16px floor as the inputs above, for the same reason — a `<select>` under
   16px zooms mobile Safari exactly as an `<input>` does. `min-h-11` gives the
   native picker a 44px target; a bare bottom-ruled select is otherwise only as
   tall as its own line box. */
const selectClass =
  "w-full min-h-11 bg-transparent border-0 border-b border-navy/15 focus:border-gold px-0 py-2.5 text-navy text-lg outline-hidden transition-colors";

/* The reading column inside the panel. */
const column = "relative mx-auto max-w-3xl";

export function RoutedContactForm({ purpose }: { purpose: Purpose }) {
  const { t, lang } = useLang();
  const [state, formAction, pending] = useActionState(sendContact, initialContactState);
  const summaryRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);
  const [copied, setCopied] = useState(false);

  // Stamped into the DOM after mount rather than held in state: it is a value
  // for the server, never for a render. A prerendered page therefore ships an
  // empty field (the action skips the time-trap when it sees no timestamp),
  // and a bot POSTing straight to the action supplies nothing at all.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, []);

  // Move focus to the error summary so the failure is announced and the first
  // problem is one Tab away (WCAG 3.3.1).
  useEffect(() => {
    if (state.status === "invalid") summaryRef.current?.focus();
  }, [state.status]);

  const extras = PURPOSE_FIELDS[purpose];
  const errors = state.errors ?? {};
  const v = state.values ?? {};
  const err = (f: FieldName) => (errors[f] ? t.contact.form.errors[errors[f]!] : undefined);

  // An error summary that says "This is needed" five times tells nobody which
  // five. Each line names its field.
  const fieldLabels: Partial<Record<FieldName, string>> = {
    name: t.contact.form.name,
    phone: t.contact.form.phone,
    email: t.contact.form.email,
    message: t.contact.form.message,
    intentionType: t.contact.form.intentionType,
    intentionNames: t.contact.form.intentionNames,
    preferredDate: t.contact.form.preferredDate,
    sacramentType: t.contact.form.sacramentType,
    recordType: t.contact.form.recordType,
    recordName: t.contact.form.recordName,
    recordYear: t.contact.form.recordYear,
    relationship: t.contact.form.relationship,
  };

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(v.message ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      /* nothing to do — the text is still in the textarea */
    }
  }

  /* ── Success ──────────────────────────────────────────────────────────── */
  if (state.status === "success") {
    return (
      <div role="status" className="relative overflow-hidden bg-white/95 rounded-2xl ring-1 ring-gold/20 shadow-lg p-6 md:p-14 text-center">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
        <div className="relative">
          {/* A wax seal, pressed */}
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-oxblood grid place-items-center mx-auto mb-7 md:mb-8 shadow-lg ring-1 ring-gold/30">
            <svg width="20" height="30" viewBox="0 0 13 20" fill="none" className="text-gold-light" aria-hidden="true">
              <path d="M6.5 0v20M0.5 6h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </div>
          <p className="font-serif text-2xl md:text-3xl text-navy mb-4">
            {t.contact.form.successTitle}
          </p>
          <p className="text-text-muted max-w-md mx-auto leading-relaxed">
            {t.contact.form.successBody}
          </p>
          {/* `-my-2 py-2` gives the number a 44px tap target without moving a
              pixel of it, and the number itself stays at 16px — it is a phone
              number, and this is the line somebody reads when the message they
              just sent turns out to be urgent after all. */}
          <p className="mt-8 text-[0.88rem] md:text-sm text-text-muted">
            {t.contact.form.successUrgent}{" "}
            <a
              href={`tel:${PHONE.e164}`}
              className="-my-2 inline-block py-2 text-base md:text-sm text-gold-dark hover:underline tabular-nums"
            >
              {PHONE.display}
            </a>
          </p>
        </div>
      </div>
    );
  }

  /* ── Not connected yet, or delivery failed. Never a fake "sent". ───────── */
  if (state.status === "unconfigured" || state.status === "failed") {
    const unconfigured = state.status === "unconfigured";
    return (
      <div role="alert" className="bg-white/95 rounded-2xl ring-1 ring-oxblood/25 shadow-lg p-6 md:p-12">
        <p className={`${column} font-serif text-2xl text-navy mb-4`}>
          {unconfigured ? t.contact.form.unconfiguredTitle : t.contact.form.failedTitle}
        </p>
        <p className={`${column} text-text-muted leading-relaxed`}>
          {unconfigured ? t.contact.form.unconfiguredBody : t.contact.form.failedBody}
        </p>

        {/* What the pilgrim just typed, handed back to them. In Cormorant, so
            it goes up a step on a phone rather than down — see the note in
            sections/Weeping.tsx on the serif's small x-height. */}
        {v.message && (
          <blockquote className={`${column} mt-8 border-l-2 border-gold/40 pl-5 text-navy/70 font-serif italic text-[1.05rem] md:text-base whitespace-pre-wrap`}>
            {v.message}
          </blockquote>
        )}

        {/* THE RECOVERY ROW, AND IT IS THE ONLY THING ON THIS PANEL THAT
            MATTERS: delivery has failed, so these three are how the message
            actually reaches the parish. At 0.64rem/0.2em — 10.2px of spaced
            Cinzel — three of them could not sit in a 342px card without one
            word per line. Size up, tracking down, and `px-4` on mobile. */}
        <div className={`${column} mt-9 flex flex-wrap gap-2.5 md:gap-3`}>
          <a
            href={`tel:${PHONE.e164}`}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-4 md:px-6 rounded-full bg-navy text-white ui-label hover:bg-gold hover:text-navy transition-colors"
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="tabular-nums tracking-normal font-sans text-base md:text-sm">{PHONE.display}</span>
          </a>

          {v.message && (
            <button
              type="button"
              onClick={copyMessage}
              className="inline-flex items-center gap-2.5 min-h-[46px] px-4 md:px-6 rounded-full border border-gold/30 text-navy/75 ui-label hover:border-gold hover:text-gold-dark transition-colors"
            >
              {copied ? <Check className="w-4 h-4 shrink-0" aria-hidden="true" /> : <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />}
              {copied ? t.contact.actions.copied : t.contact.form.copyMessage}
            </button>
          )}

          {hasWhatsApp && v.message && (
            <a
              href={whatsAppLink(v.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 min-h-[46px] px-4 md:px-6 rounded-full border border-gold/30 text-navy/75 ui-label hover:border-gold hover:text-gold-dark transition-colors"
            >
              <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
              {t.contact.actions.whatsapp}
            </a>
          )}
        </div>
      </div>
    );
  }

  /* ── The form ─────────────────────────────────────────────────────────── */
  return (
    /* `p-8` is 32px of white on each side of a 342px card — a quarter of the
       screen's width spent on margin, leaving a 278px measure for the fields
       and the error text beside them. `p-5` gives 24px of that back to the
       part a pilgrim is actually filling in; the desktop plaque is unchanged. */
    <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl ring-1 ring-gold/15 shadow-lg p-5 md:p-12 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
      <span className="pointer-events-none absolute top-4 left-4 w-6 h-6 border-t border-l border-gold/30" aria-hidden="true" />
      <span className="pointer-events-none absolute bottom-4 right-4 w-6 h-6 border-b border-r border-gold/30" aria-hidden="true" />
      {config.turnstileSiteKey && (
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
      )}

      {/* The panel is as wide as the map and the tablet, because a page whose
          sections all end on a different line looks like an accident. The
          fields are not: an input a thousand pixels wide is a worse thing to
          fill in than a narrow one, so the form holds its own measure inside
          the plaque — hence the repeated `column` on each block below. */}
      <h3 className={`${column} font-serif text-[1.65rem] md:text-3xl text-navy mb-1`}>{t.contact.form.heading}</h3>
      <div className={`${column} rule-gold my-6 md:my-8`} aria-hidden="true" />

      {state.status === "invalid" && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className={`${column} mb-8 md:mb-9 border-l-2 border-oxblood bg-oxblood/5 px-4 py-4 md:px-5 outline-hidden`}
        >
          {/* This is the block that tells somebody why their message did not
              go. It is a list of short lines, so the extra size costs no
              height worth having, and 12.8px of oxblood on a pale wash was the
              least readable text in the whole switchboard. */}
          <p className="text-[0.92rem] md:text-sm text-oxblood font-medium">{t.contact.form.errorSummary}</p>
          <ul className="mt-2 space-y-1.5 md:space-y-1 text-[0.88rem] md:text-[0.8rem] text-oxblood/85 list-disc list-inside">
            {Object.entries(errors).map(([field, code]) => {
              const label = fieldLabels[field as FieldName];
              return (
                <li key={field}>
                  {label && <span className="font-medium">{label} — </span>}
                  {t.contact.form.errors[code]}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {state.status === "rejected" && (
        <p role="alert" className={`${column} mb-8 md:mb-9 text-[0.92rem] md:text-sm text-oxblood`}>
          {t.contact.form.botRejected}
        </p>
      )}

      <form action={formAction} className={`${column} space-y-7 md:space-y-8`} noValidate>
        <input type="hidden" name="purpose" value={purpose} />
        <input ref={startedAtRef} type="hidden" name="_startedAt" defaultValue="" />

        {/* Honeypot. Off-screen rather than display:none — some bots skip
            hidden fields, and this keeps it out of the tab order regardless. */}
        <div aria-hidden="true" className="absolute w-px h-px -left-[9999px] overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" type="text" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <Field name="name" label={t.contact.form.name} error={err("name")}>
          {(p) => <input {...p} type="text" autoComplete="name" defaultValue={v.name} />}
        </Field>

        <div className="grid md:grid-cols-2 gap-7 md:gap-8">
          <Field
            name="phone"
            label={t.contact.form.phone}
            hint={t.contact.form.phoneNote}
            error={err("phone")}
          >
            {(p) => <input {...p} type="tel" inputMode="tel" autoComplete="tel" defaultValue={v.phone} />}
          </Field>

          <Field
            name="email"
            label={`${t.contact.form.email} · ${t.contact.form.optional}`}
            error={err("email")}
          >
            {(p) => <input {...p} type="email" inputMode="email" autoComplete="email" defaultValue={v.email} />}
          </Field>
        </div>

        {/* ── Fields that appear only for this purpose ── */}

        {extras.includes("intentionType") && (
          <fieldset className="space-y-6">
            <Field name="intentionType" label={t.contact.form.intentionType} error={err("intentionType")}>
              {(p) => (
                <select {...p} className={selectClass} defaultValue={v.intentionType ?? ""}>
                  <option value="" disabled />
                  {INTENTION_TYPES.map((k) => (
                    <option key={k} value={k}>
                      {k === "living" ? t.contact.form.living : t.contact.form.departed}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field name="intentionNames" label={t.contact.form.intentionNames} error={err("intentionNames")}>
              {(p) => <input {...p} type="text" defaultValue={v.intentionNames} />}
            </Field>
          </fieldset>
        )}

        {extras.includes("sacramentType") && (
          <Field name="sacramentType" label={t.contact.form.sacramentType} error={err("sacramentType")}>
            {(p) => (
              <select {...p} className={selectClass} defaultValue={v.sacramentType ?? ""}>
                <option value="" disabled />
                {SACRAMENT_TYPES.map((k) => (
                  <option key={k} value={k}>
                    {t.contact.form.sacraments[k]}
                  </option>
                ))}
              </select>
            )}
          </Field>
        )}

        {extras.includes("recordType") && (
          <fieldset className="space-y-7 md:space-y-8">
            <Field name="recordType" label={t.contact.form.recordType} error={err("recordType")}>
              {(p) => (
                <select {...p} className={selectClass} defaultValue={v.recordType ?? ""}>
                  <option value="" disabled />
                  {RECORD_TYPES.map((k) => (
                    <option key={k} value={k}>
                      {t.contact.form.records[k]}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field name="recordName" label={t.contact.form.recordName} error={err("recordName")}>
              {(p) => <input {...p} type="text" defaultValue={v.recordName} />}
            </Field>

            <div className="grid md:grid-cols-2 gap-7 md:gap-8">
              <Field name="recordYear" label={t.contact.form.recordYear} error={err("recordYear")}>
                {(p) => (
                  <input
                    {...p}
                    type="number"
                    inputMode="numeric"
                    min={1685}
                    max={new Date().getFullYear()}
                    defaultValue={v.recordYear}
                  />
                )}
              </Field>

              <Field name="relationship" label={t.contact.form.relationship} error={err("relationship")}>
                {(p) => <input {...p} type="text" defaultValue={v.relationship} />}
              </Field>
            </div>
          </fieldset>
        )}

        {extras.includes("preferredDate") && (
          <Field
            name="preferredDate"
            label={t.contact.form.preferredDate}
            hint={t.contact.form.anyDate}
            error={err("preferredDate")}
          >
            {(p) => <input {...p} type="date" defaultValue={v.preferredDate} />}
          </Field>
        )}

        {extras.includes("message") && (
          <Field name="message" label={t.contact.form.message} error={err("message")}>
            {(p) => <textarea {...p} rows={5} className={`${p.className} resize-none`} defaultValue={v.message} />}
          </Field>
        )}

        {config.turnstileSiteKey && (
          <div
            className="cf-turnstile"
            data-sitekey={config.turnstileSiteKey}
            data-theme="light"
            data-language={lang}
          />
        )}

        {/* The one button on the page that sends the message. 0.68rem/0.26em
            is 10.9px of widely spaced Cinzel; on a phone the label runs the
            full width of the card, so the tracking is what breaks it onto two
            lines. Bigger type, tighter fit, same 54px target. */}
        <button
          type="submit"
          disabled={pending}
          className="w-full min-h-[54px] rounded-full bg-gold text-navy ui-label hover:bg-navy hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-wait"
        >
          {pending ? t.contact.form.submitting : t.contact.form.submit}
        </button>
      </form>
    </div>
  );
}
