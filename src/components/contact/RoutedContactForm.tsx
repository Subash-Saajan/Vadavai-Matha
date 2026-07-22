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
      <label
        htmlFor={id}
        className="block font-display text-[0.6rem] uppercase tracking-[0.24em] text-gold-dark mb-2.5"
      >
        {label}
      </label>
      {children({
        id,
        name,
        "aria-invalid": Boolean(error),
        "aria-describedby": describedBy || undefined,
        // A cut rule rather than a box: the gold hairline is the focus state.
        className: `w-full bg-transparent border-0 border-b px-0 py-2.5 text-navy text-lg outline-hidden transition-colors placeholder:text-navy/25 ${
          error
            ? "border-oxblood focus:border-oxblood"
            : "border-navy/15 focus:border-gold"
        }`,
      })}
      {hint && !error && (
        <p id={hintId} className="mt-2 text-[0.72rem] text-text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-[0.75rem] text-oxblood">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

const selectClass =
  "w-full bg-transparent border-0 border-b border-navy/15 focus:border-gold px-0 py-2.5 text-navy text-lg outline-hidden transition-colors";

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
      <div role="status" className="relative overflow-hidden bg-white/95 rounded-2xl ring-1 ring-gold/20 shadow-lg p-10 md:p-14 text-center">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold/50 to-transparent" aria-hidden="true" />
        <div className="relative">
          {/* A wax seal, pressed */}
          <div className="w-16 h-16 rounded-full bg-oxblood grid place-items-center mx-auto mb-8 shadow-lg ring-1 ring-gold/30">
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
          <p className="mt-8 text-sm text-text-muted">
            {t.contact.form.successUrgent}{" "}
            <a href={`tel:${PHONE.e164}`} className="text-gold-dark hover:underline tabular-nums">
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
      <div role="alert" className="bg-white/95 rounded-2xl ring-1 ring-oxblood/25 shadow-lg p-10 md:p-12">
        <p className={`${column} font-serif text-2xl text-navy mb-4`}>
          {unconfigured ? t.contact.form.unconfiguredTitle : t.contact.form.failedTitle}
        </p>
        <p className={`${column} text-text-muted leading-relaxed`}>
          {unconfigured ? t.contact.form.unconfiguredBody : t.contact.form.failedBody}
        </p>

        {v.message && (
          <blockquote className={`${column} mt-8 border-l-2 border-gold/40 pl-5 text-navy/70 font-serif italic whitespace-pre-wrap`}>
            {v.message}
          </blockquote>
        )}

        <div className={`${column} mt-9 flex flex-wrap gap-3`}>
          <a
            href={`tel:${PHONE.e164}`}
            className="inline-flex items-center gap-2.5 min-h-[46px] px-6 rounded-full bg-navy text-white font-display text-[0.64rem] uppercase tracking-[0.2em] hover:bg-gold hover:text-navy transition-colors"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            <span className="tabular-nums tracking-normal font-sans text-sm">{PHONE.display}</span>
          </a>

          {v.message && (
            <button
              type="button"
              onClick={copyMessage}
              className="inline-flex items-center gap-2.5 min-h-[46px] px-6 rounded-full border border-gold/30 text-navy/75 font-display text-[0.64rem] uppercase tracking-[0.2em] hover:border-gold hover:text-gold-dark transition-colors"
            >
              {copied ? <Check className="w-4 h-4" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              {copied ? t.contact.actions.copied : t.contact.form.copyMessage}
            </button>
          )}

          {hasWhatsApp && v.message && (
            <a
              href={whatsAppLink(v.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 min-h-[46px] px-6 rounded-full border border-gold/30 text-navy/75 font-display text-[0.64rem] uppercase tracking-[0.2em] hover:border-gold hover:text-gold-dark transition-colors"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" />
              {t.contact.actions.whatsapp}
            </a>
          )}
        </div>
      </div>
    );
  }

  /* ── The form ─────────────────────────────────────────────────────────── */
  return (
    <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl ring-1 ring-gold/15 shadow-lg p-8 md:p-12 overflow-hidden">
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
      <h3 className={`${column} font-serif text-3xl text-navy mb-1`}>{t.contact.form.heading}</h3>
      <div className={`${column} rule-gold my-8`} aria-hidden="true" />

      {state.status === "invalid" && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className={`${column} mb-9 border-l-2 border-oxblood bg-oxblood/5 px-5 py-4 outline-hidden`}
        >
          <p className="text-sm text-oxblood font-medium">{t.contact.form.errorSummary}</p>
          <ul className="mt-2 space-y-1 text-[0.8rem] text-oxblood/85 list-disc list-inside">
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
        <p role="alert" className={`${column} mb-9 text-sm text-oxblood`}>
          {t.contact.form.botRejected}
        </p>
      )}

      <form action={formAction} className={`${column} space-y-8`} noValidate>
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

        <div className="grid md:grid-cols-2 gap-8">
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
          <fieldset className="space-y-8">
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

            <div className="grid md:grid-cols-2 gap-8">
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

        <button
          type="submit"
          disabled={pending}
          className="w-full min-h-[54px] rounded-full bg-gold text-navy font-display text-[0.68rem] uppercase tracking-[0.26em] hover:bg-navy hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-wait"
        >
          {pending ? t.contact.form.submitting : t.contact.form.submit}
        </button>
      </form>
    </div>
  );
}
