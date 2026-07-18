/**
 * Validation shared by the browser (for instant inline errors) and by the
 * Server Action (which is the authority — a Server Action is a plain POST
 * endpoint and anyone can call it directly, so nothing here is trusted until
 * it has run on the server).
 *
 * Deliberately dependency-free. Six fields do not justify a schema library,
 * and the schema ships to the client, so every kilobyte would be paid for by
 * a pilgrim on rural 4G.
 *
 * Errors are returned as CODES, never as sentences, so the same failure can
 * be rendered in English or Tamil. See `t.contact.form.errors` in i18n.ts.
 */

import { PURPOSES, type Purpose } from "./contact";

export type ErrorCode =
  | "required"
  | "email"
  | "phone"
  | "tooShort"
  | "tooLong"
  | "year";

export type FieldName =
  | "purpose"
  | "name"
  | "phone"
  | "email"
  | "message"
  | "intentionType"
  | "intentionNames"
  | "preferredDate"
  | "sacramentType"
  | "recordType"
  | "recordName"
  | "recordYear"
  | "relationship";

export type FieldErrors = Partial<Record<FieldName, ErrorCode>>;

export type ContactInput = Record<FieldName, string>;

/**
 * The Server Action's return value, and the shape `useActionState` holds.
 *
 * This lives here rather than beside the action because a `"use server"` file
 * may export *only* async functions — exporting the `initialContactState`
 * object from it throws at request time ("can only export async functions,
 * found object"), and neither `next build` nor `tsc` will tell you.
 */
export type ContactState = {
  status: "idle" | "success" | "invalid" | "unconfigured" | "failed" | "rejected";
  errors?: FieldErrors;
  /** Echoed back so a failed submit never wipes what someone typed. */
  values?: Partial<ContactInput>;
};

export const initialContactState: ContactState = { status: "idle" };

export const SACRAMENT_TYPES = [
  "baptism",
  "first-communion",
  "confirmation",
  "marriage",
  "anointing",
  "funeral",
] as const;

export const RECORD_TYPES = ["baptism", "marriage", "confirmation"] as const;

export const INTENTION_TYPES = ["living", "departed"] as const;

/** Which extra fieldset a purpose reveals. Keep in step with RoutedContactForm. */
export const PURPOSE_FIELDS: Record<Purpose, readonly FieldName[]> = {
  visit: ["message"],
  "mass-intention": ["intentionType", "intentionNames", "preferredDate"],
  sacrament: ["sacramentType", "preferredDate", "message"],
  certificate: ["recordType", "recordName", "recordYear", "relationship"],
  "sick-call": [],
  offering: ["message"],
  other: ["message"],
};

/** Purposes where a free-text message is mandatory rather than a nicety. */
const MESSAGE_REQUIRED: readonly Purpose[] = ["visit", "other"];

/* Pragmatic, permissive patterns. The goal is to catch typos, not to police
   what a valid phone number looks like in every country. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[+\d][\d\s()\-.]{6,20}$/;

function text(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function isPurpose(v: string): v is Purpose {
  return (PURPOSES as readonly string[]).includes(v);
}

/** Read a FormData into the flat shape the validator expects. */
export function readFormData(fd: FormData): ContactInput {
  const get = (k: FieldName) => text(fd.get(k));
  return {
    purpose: get("purpose"),
    name: get("name"),
    phone: get("phone"),
    email: get("email"),
    message: get("message"),
    intentionType: get("intentionType"),
    intentionNames: get("intentionNames"),
    preferredDate: get("preferredDate"),
    sacramentType: get("sacramentType"),
    recordType: get("recordType"),
    recordName: get("recordName"),
    recordYear: get("recordYear"),
    relationship: get("relationship"),
  };
}

export type ValidationResult =
  | { ok: true; purpose: Purpose; data: ContactInput }
  | { ok: false; errors: FieldErrors };

export function validateContact(input: ContactInput): ValidationResult {
  const errors: FieldErrors = {};

  const purpose = input.purpose;
  if (!isPurpose(purpose)) {
    return { ok: false, errors: { purpose: "required" } };
  }

  // A sick call must never reach the form — it dials. If one arrives anyway,
  // treat it as a normal message rather than dropping it on the floor.
  const effective: Purpose = purpose === "sick-call" ? "other" : purpose;

  if (!input.name) errors.name = "required";
  else if (input.name.length > 120) errors.name = "tooLong";

  // Phone is the primary channel here; email is genuinely optional.
  if (!input.phone) errors.phone = "required";
  else if (!PHONE_RE.test(input.phone)) errors.phone = "phone";

  if (input.email && !EMAIL_RE.test(input.email)) errors.email = "email";

  const extras = PURPOSE_FIELDS[effective];

  if (extras.includes("message") || MESSAGE_REQUIRED.includes(effective)) {
    if (MESSAGE_REQUIRED.includes(effective) && !input.message) {
      errors.message = "required";
    } else if (input.message && input.message.length < 5) {
      errors.message = "tooShort";
    }
  }
  if (input.message.length > 4000) errors.message = "tooLong";

  if (extras.includes("intentionType") && !input.intentionType) {
    errors.intentionType = "required";
  }
  if (extras.includes("intentionNames") && !input.intentionNames) {
    errors.intentionNames = "required";
  }
  if (extras.includes("sacramentType") && !input.sacramentType) {
    errors.sacramentType = "required";
  }
  if (extras.includes("recordType") && !input.recordType) {
    errors.recordType = "required";
  }
  if (extras.includes("recordName") && !input.recordName) {
    errors.recordName = "required";
  }
  if (extras.includes("recordYear")) {
    if (!input.recordYear) {
      errors.recordYear = "required";
    } else {
      const year = Number(input.recordYear);
      // The parish register begins with the chapel of 1685; a request for a
      // record from before then is a typo, not a genealogy breakthrough.
      const thisYear = new Date().getUTCFullYear();
      if (!Number.isInteger(year) || year < 1685 || year > thisYear) {
        errors.recordYear = "year";
      }
    }
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, purpose: effective, data: input };
}
