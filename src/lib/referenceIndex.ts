/**
 * Which citations have a page to open — and nothing else.
 *
 * This module exists to keep the books OUT of the browser.
 *
 * /history is a client component, and it must decide, per chip, whether to link to the
 * reader or fall back to the bibliography. If it asked references.ts that question it
 * would drag the whole of reference-leaves.json — three hundred kilobytes of Pate,
 * Bertrand and Auguste Jean — into the client bundle of every visitor, on a page most of
 * them will read on a phone, over a rural connection, to look at photographs.
 *
 * So the build emits two files: the leaves, which only the server reads, and this list of
 * keys, which is eight kilobytes and is all the client actually needs to know.
 *
 * Import `hasLeaf` from here in client components. Import anything else from references.ts,
 * and only from the server.
 */

import LEAF_INDEX from "@/data/reference-index.json";

const KEYS = new Set(LEAF_INDEX as string[]);

export const leafKey = (era: string, dot: number, source: string) =>
  `${era}:${dot}:${source}`;

/**
 * Is there a page to open for this citation?
 *
 * False is a normal answer, not a failure. Some books we do not hold (Besse 1914 — the
 * printed root of the 1803 tradition, which nobody on this project has opened). Some we
 * may not reproduce (Cronin, Neill, Bayly are still in copyright). And a few are withheld
 * because the only passage that supports them turns on the caste history the parish has
 * decided not to publish. In every one of those cases the chip goes to the bibliography,
 * exactly as it did before the reader existed.
 */
export const hasLeaf = (era: string, dot: number, source: string): boolean =>
  KEYS.has(leafKey(era, dot, source));

/** May we show the scanned page itself? */
export type Rights =
  /** Pre-1930, author long dead. The scan may be shown. */
  | "pd"
  /** Still protected. A short attributed quotation is fair dealing; the page image is not. */
  | "in-copyright"
  /** The parish's own material. It owns the rights — which says nothing about the evidence. */
  | "parish"
  /** A living web page, not a book. */
  | "web"
  /** We hold no copy at all. Besse 1914 is the honest one. */
  | "none";

export type LeafKind =
  /** We have the page: full text, located quote, usually a scan. */
  | "leaf"
  /** We have the passage but cannot print the page around it. */
  | "quote-only"
  /** We have never opened this book. The leaf says so, and shows nothing. */
  | "unavailable";

export type Leaf = {
  source: string;
  short: string;
  title: string;
  imprint: string;
  lang: "en" | "fr" | "la" | "it" | "ta";
  rights: Rights;
  kind: LeafKind;
  /** The passage the history page actually rests on. */
  quote: string;
  /** English, where the book is not. The original stays above it — always. */
  translation?: string;
  /** One sentence: what this source establishes, and what it does not. */
  establishes?: string;
  /** The number printed on the leaf itself. */
  page?: number;
  /** The whole printed page, as prose. */
  pageText?: string;
  /** Where the quote sits inside pageText: [start, end) character offsets. */
  span?: [number, number] | null;
  /** The real scanned page. Only ever present where `rights` allows it. */
  scan?: string;
  /**
   * True where we are printing LESS than the whole page.
   *
   * Some of our best witnesses explain the two naves by caste on the same page as the
   * sentence we cite, and the parish has decided the website will not carry that
   * history. Those leaves are cropped to the passage. The reader is told so on the page
   * — a crop the reader cannot see is exactly the cherry-picking this feature exists to
   * prevent, and the fact that we crop for a reason does not make it invisible.
   */
  windowed?: boolean;
};

/**
 * Human labels for the rights of a source. Lives here, not in references.ts, because the
 * component that renders it is a client component — and importing it from references.ts
 * would drag three hundred kilobytes of Pate, Bertrand and Auguste Jean into the browser
 * alongside it. `rights` and `tier` are different questions: this one is whether we may
 * lawfully show the page, not how strongly the claim is evidenced.
 */
export const RIGHTS_NOTE: Record<Rights, string> = {
  pd: "Published before 1930. In the public domain, and reproduced here in full.",
  "in-copyright":
    "Still in copyright. We quote a short passage with attribution, as the law allows, and do not reproduce the page.",
  parish: "The parish's own record, printed here by the parish.",
  web: "A published web source. We quote it and link to it.",
  none: "We hold no copy of this. Nobody on this project has opened it.",
};
