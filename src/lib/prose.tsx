import type { ReactNode } from "react";

/**
 * The history prose is our own narration, but two kinds of text inside it are
 * NOT ours, and the reader should be able to see the difference at a glance:
 *
 *   “a verbatim quotation”  — a source speaking in its own words (de Britto's
 *                             prison letter, a Jesuit annual letter, a motto).
 *                             Kept in its quotation marks AND set in italic.
 *   *a non-English term*    — crusadi, kankol, Arulanandar, a gloss like
 *                             *the joy of grace*. Set in italic; the asterisks
 *                             are markup only and never render.
 *
 * The markup is deliberately tiny. Quotations already carry their curly quotes
 * in the source strings, so they need no extra authoring — the quote marks are
 * themselves the signal. Foreign terms are wrapped in *asterisks*. Everything
 * else stays roman, because everything else is us talking.
 *
 * This is a pure function returning elements — no hooks, no client APIs — so it
 * is safe in both the client history stage and the server reference page.
 */
const PROSE_RE = /(“[^”]*”)|\*([^*]+)\*/g;

export function renderProse(text: string): ReactNode {
  const nodes: ReactNode[] = [];
  const re = new RegExp(PROSE_RE); // fresh lastIndex per call
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      // A quotation: keep the marks, set the whole thing in italic.
      nodes.push(
        <em key={key++} className="prose-quote">
          {m[1]}
        </em>,
      );
    } else {
      // A foreign term: italic, and drop the * delimiters.
      nodes.push(
        <em key={key++} className="prose-term">
          {m[2]}
        </em>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

/**
 * The same text as a plain string — the *foreign-term* delimiters stripped,
 * the quotation marks kept. For metadata, JSON-LD and anywhere the body is used
 * as data rather than shown, so a raw asterisk never leaks into a description.
 */
export function plainProse(text: string): string {
  return text.replace(/\*([^*]+)\*/g, "$1");
}
