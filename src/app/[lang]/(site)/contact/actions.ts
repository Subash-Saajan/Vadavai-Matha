"use server";

/**
 * The parish switchboard.
 *
 * A Server Action is a plain POST endpoint — a bot can call it directly,
 * bypassing every check in the browser. So each guard below runs HERE, on the
 * server, and the client-side copies exist only to be kind to humans.
 *
 * Delivery goes over Resend's HTTP API rather than SMTP: Vercel's serverless
 * runtime blocks outbound SMTP, and this avoids a dependency for one fetch.
 *
 * If the parish has not yet supplied a RESEND_API_KEY and a destination inbox,
 * we return `unconfigured` and the form says so plainly. We never tell someone
 * their message was delivered when it was not.
 */

import {
  readFormData,
  validateContact,
  type ContactState,
  type ContactInput,
} from "@/lib/contactSchema";
import { ADDRESS, type Purpose } from "@/lib/contact";

// NOTE: this module may export nothing but async functions. `ContactState` and
// `initialContactState` therefore live in @/lib/contactSchema — a type export
// is erased at compile time and is fine, but a plain object is not, and Next
// only raises that at request time, long after the build has gone green.

/** Bots fill every field they can see. Humans never see this one. */
const HONEYPOT_FIELD = "website";
/** Humans take longer than this to read the form and type an answer. */
const MIN_ELAPSED_MS = 2500;

async function verifyTurnstile(token: string, ip: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  // No secret configured means the captcha is switched off, not that it failed.
  if (!secret) return true;
  if (!token) return false;

  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body },
    );
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    // Cloudflare being unreachable must not silently swallow a pilgrim's
    // message. Fail open — the honeypot and time-trap still stand.
    return true;
  }
}

const SUBJECTS: Record<Purpose, string> = {
  visit: "Planning a visit",
  "mass-intention": "Mass intention",
  sacrament: "Sacrament enquiry",
  certificate: "Certificate from the register",
  "sick-call": "SICK CALL — urgent",
  offering: "Offering",
  other: "Message from the website",
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmail(purpose: Purpose, d: ContactInput): string {
  const rows: [string, string][] = [
    ["Purpose", SUBJECTS[purpose]],
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email || "—"],
  ];

  if (d.intentionType) rows.push(["Mass is for", d.intentionType]);
  if (d.intentionNames) rows.push(["To be remembered", d.intentionNames]);
  if (d.sacramentType) rows.push(["Sacrament", d.sacramentType]);
  if (d.recordType) rows.push(["Record", d.recordType]);
  if (d.recordName) rows.push(["Name on record", d.recordName]);
  if (d.recordYear) rows.push(["Approximate year", d.recordYear]);
  if (d.relationship) rows.push(["Relationship", d.relationship]);
  if (d.preferredDate) rows.push(["Preferred date", d.preferredDate]);

  const table = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 16px 6px 0;color:#6f6650;white-space:nowrap;vertical-align:top">${escapeHtml(
          k,
        )}</td><td style="padding:6px 0;color:#1c1a15"><strong>${escapeHtml(v)}</strong></td></tr>`,
    )
    .join("");

  const message = d.message
    ? `<p style="margin:24px 0 0;color:#6f6650">Message</p>
       <p style="margin:4px 0 0;color:#1c1a15;white-space:pre-wrap">${escapeHtml(d.message)}</p>`
    : "";

  return `<div style="font-family:Georgia,serif;max-width:560px">
    <p style="font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#9a7a30;margin:0 0 4px">${ADDRESS.name}</p>
    <h1 style="font-size:20px;color:#0a1322;margin:0 0 20px">${escapeHtml(SUBJECTS[purpose])}</h1>
    <table style="border-collapse:collapse;font-size:15px">${table}</table>
    ${message}
    <hr style="border:0;border-top:1px solid #e8dec9;margin:28px 0 12px" />
    <p style="font-size:12px;color:#6f6650;margin:0">Sent from the contact page at littlerome.net. Reply directly to answer ${escapeHtml(
      d.name,
    )}${d.email ? "" : ` — no email was given, so telephone ${escapeHtml(d.phone)}`}.</p>
  </div>`;
}

export async function sendContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const input = readFormData(formData);

  // Keep everything typed except the honeypot, so nothing is lost on a retry.
  const values: Partial<ContactInput> = { ...input };

  // ── Guard 1: the honeypot. Silence, not an error message — a bot that is
  // told it failed will simply try again.
  if (String(formData.get(HONEYPOT_FIELD) ?? "").length > 0) {
    return { status: "success" };
  }

  // ── Guard 2: the time trap. Cheap, forgeable, and it still stops the
  // majority of drive-by spam that Turnstile would otherwise have to absorb.
  const startedAt = Number(formData.get("_startedAt") ?? 0);
  if (startedAt > 0 && Date.now() - startedAt < MIN_ELAPSED_MS) {
    return { status: "success" };
  }

  // ── Guard 3: the real gate, when the parish has configured it.
  const token = String(formData.get("cf-turnstile-response") ?? "");
  const ok = await verifyTurnstile(token, null);
  if (!ok) return { status: "rejected", values };

  // ── Guard 4: the schema. Authoritative.
  const result = validateContact(input);
  if (!result.ok) return { status: "invalid", errors: result.errors, values };

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Not an error. The page has simply not been switched on yet, and the
    // form tells the visitor exactly that, and gives them the telephone.
    return { status: "unconfigured", values };
  }

  const { purpose, data } = result;
  const subject = `${SUBJECTS[purpose]} — ${data.name}`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html: buildEmail(purpose, data),
        // So the priest can simply hit reply. Falls back to the parish's own
        // address when the sender gave no email.
        reply_to: data.email || undefined,
      }),
    });

    if (!res.ok) {
      console.error("[contact] Resend rejected the message", res.status, await res.text());
      return { status: "failed", values };
    }
  } catch (err) {
    console.error("[contact] could not reach Resend", err);
    return { status: "failed", values };
  }

  return { status: "success" };
}
