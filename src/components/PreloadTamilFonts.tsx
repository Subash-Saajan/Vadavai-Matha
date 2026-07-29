"use client";

import ReactDOM from "react-dom";

/**
 * The two Tamil webfonts are declared by hand in globals.css (so they can
 * carry `size-adjust`), which means Next's font pipeline does not know about
 * them and will not preload them. Without a hint the browser only discovers
 * them after the CSS has parsed AND a Tamil glyph has been laid out — two
 * round trips into the render, which on /ta is a visible reflow of every
 * heading on the page.
 *
 * Rendered only on the Tamil locale. On the English routes the `unicode-range`
 * in the @font-face keeps the files from ever being fetched, so preloading
 * there would spend two requests on bytes the page never draws.
 */
export function PreloadTamilFonts() {
  ReactDOM.preload("/fonts/kumudam-tamil.480cac5d.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });
  ReactDOM.preload("/fonts/tiro-tamil.b76615f3.woff2", {
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  });

  return null;
}
