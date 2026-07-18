import type { Thing, WithContext } from "schema-dts";

/**
 * Emits one JSON-LD block.
 *
 * The `<` scrub is the Next 16 docs' own recommendation: JSON.stringify does
 * not escape `<`, which would permit script injection the moment any value in
 * the graph became user-controlled (a parish notice, a form echo). Cheap now,
 * unpayable later.
 */
export function JsonLd({ data }: { data: WithContext<Thing> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
