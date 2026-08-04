"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

import { cappedSizes } from "@/lib/imageSizes";

/* ── LAZY LOADING SOLVED BANDWIDTH. NOBODY SOLVED MEMORY. ──────────────────
   Every image on this site is already `loading="lazy"`, so nothing is fetched
   until the reader is near it — which is why the home page downloads under two
   megabytes. That is not the problem and never was.

   The problem is the multiplier. A JPEG is compressed on the wire and NOT
   compressed once it is on screen: /images/matha-midnight.jpg is 90 KB as a
   file and 828 × 1472 × 4 bytes — 4.6 MB — as the bitmap the phone actually
   draws. Fifty times larger. Across the fifty-two pictures on the home page
   that is 63 MB on a cheap phone and 151 MB on a flagship.

   And no browser ever gives it back. Lazy loading is a one-way door: scroll
   past the Chronicle, the Fathers and the Gallery and every one of those
   bitmaps is still resident behind you. By the footer the phone is holding the
   whole page at once, which on iOS is how a tab gets killed.

   So this component closes the door the other way. Beyond `slack` from the
   viewport the <img> is UNMOUNTED and the memory goes back; inside it, the
   picture is the ordinary next/image with every one of its props untouched.

   Residency is half the answer. The other half is how big each bitmap is
   while it IS resident, and that is `cappedSizes` below: a phone is served an
   effective pixel ratio of 2 rather than 3, which halves every one of these
   numbers on its own. The two are independent and the page needs both — see
   `lib/imageSizes.ts`. Anything rendering a large photo should therefore come
   through here rather than reaching for `next/image` directly.

   THREE THINGS THIS DELIBERATELY DOES NOT DO:

     · It does not change the format or the quality setting, and it never
       alters what is drawn — only how many device pixels back it and when
       they are resident. Every other prop is passed through untouched.
     · It does not re-download anything. A remount reads the file from the
       browser's cache and decodes it again — no network, no data cost to a
       reader on mobile data.
     · It does not move anything. The <span> holds the box whether or not there
       is a picture in it, so nothing reflows and the scroll position cannot
       jump. That matters more than it sounds: this site pins sections to exact
       scroll offsets, and a page whose height changed as you read it would
       break far more than it fixed.

   PHONES ONLY. A laptop has the memory and the observer would be pure
   overhead. */

/* Two viewports either side. The eviction has to be far enough away that the
   reader can never outrun it — at a hard fling a phone covers about a viewport
   per frame, so one viewport of slack could just about show a stripped box.
   Two cannot, and holding two screens of pictures is still a small fraction of
   holding fifty-two. */
const SLACK = "200% 0px";

export function ResidentImage({
  slack = SLACK,
  sizes,
  ...props
}: ImageProps & {
  /**
   * IntersectionObserver `rootMargin`. The default is vertical, for the
   * ordinary case of a page that scrolls down. A HORIZONTAL scroller wants
   * "0px 100%" instead — see ChronicleCarousel, where the cards leave the
   * screen sideways and the vertical default would never fire at all.
   */
  slack?: string;
}) {
  const boxRef = useRef<HTMLSpanElement>(null);
  /* Starts resident and is only ever taken away by an observer that has
     actually looked. So the server render, the first client render and every
     desktop render all emit the picture — this can only ever remove one, never
     delay one. */
  const [near, setNear] = useState(true);

  useEffect(() => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    const el = boxRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: slack }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [slack]);

  /* `absolute inset-0` so the span is exactly the box its parent already gave
     the picture — every caller here uses `fill`, which requires a positioned
     parent, so this covers it precisely. Being positioned itself, the span then
     becomes the containing block for the `fill` image inside it, which lands on
     the identical rect. Nothing about the layout changes; the span is only
     something for the observer to watch when the picture is not there to be
     watched itself. */
  return (
    <span ref={boxRef} className="absolute inset-0 block">
      {/* `alt` arrives through the spread, so jsx-a11y cannot see it here — but
          it is required by ImageProps, so every caller is checked for it by the
          type system instead, at the call site where the words actually are. */}
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      {near && <Image {...props} sizes={sizes && cappedSizes(sizes)} />}
    </span>
  );
}
