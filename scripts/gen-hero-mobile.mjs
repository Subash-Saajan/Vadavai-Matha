// gen-hero-mobile.mjs — cut BOTH of the phone's hero scrub films from the
// 4K master.
//
//   node scripts/gen-hero-mobile.mjs
//
// Outputs:
//   public/hero-mobile.mp4          the WebKit cut — seeked by a <video>
//   public/hero-frames/film.h264    the Chromium cut — decoded by WebCodecs
//   public/hero-frames/film.json    its byte index
//
// ── WHY THERE ARE TWO, WHICH IS NOT AN ACCIDENT ───────────────────────────
// WebCodecs is the right tool for this. It decodes exactly the one picture
// the scroll asks for and hands it to a canvas — ~2ms, any direction, at
// whatever resolution you like, because a single-frame decode is cheap.
//
// It is also what kills iPhones. Safari 16.4–18.7 ships only a PARTIAL
// WebCodecs implementation; on iOS the decode runs inside the GPU process,
// where a failure terminates every tab in the browser rather than just this
// one; and isConfigSupported() there is a string prefix match on the codec,
// so a config VideoToolbox will refuse still answers `supported: true` and
// the "fall back" guard never fires. See IOS_CRASH_FINDINGS.md.
//
// So WebKit gets a plain <video> instead, scrubbed with currentTime. That is
// the one shape of this feature the site has ever run on an iPhone without
// the tab being killed — but a seek costs 20–50ms against WebCodecs' ~2ms,
// and that cost scales with resolution, so the WebKit cut has to be SMALLER
// to stay smooth while the Chromium cut can stay sharp.
//
// ⚠ ENGINE, NOT OS, AND NOT BROWSER NAME. Every browser on iOS is WebKit —
// Chrome, Firefox and Edge on an iPhone are all Safari underneath and all
// carry the same bug. The runtime picks between these two files by testing
// for a WebKit-only API, never by sniffing for "Safari". See useHeroMedia.
//
// ── THE ENCODE IS TUNED FOR SEEK LATENCY, NOT FOR FILE SIZE ───────────────
// Scrubbing sets currentTime, and each set costs a seek: a pipeline flush
// plus a decode. That decode sets the ceiling on how often the picture can
// change, so the encode's job here is to be FAST TO SEEK INTO, which is not
// the same as small or sharp. Every constant below was measured on a real
// device rather than reasoned about — see the notes on OUT_W and GOP, which
// record the numbers and one result that contradicts the obvious guess.
//
// ── WHY THE CROP MOVES ────────────────────────────────────────────────────
// The drone descends TOWARDS the church rather than orbiting it, so the
// spire drifts across the frame: it sits at 50.9% of the width where the
// scrub starts and settles near 56%. A desktop viewport is wide enough that
// nobody notices; a phone crops ~40% off the sides and turns that drift into
// a church visibly sliding off centre.
//
// Hero.tsx used to correct this at runtime with a CHURCH_TRACK lookup and a
// per-frame canvas pan. There is no canvas any more, so the correction is
// baked into the crop here instead — it costs nothing at runtime and the
// CSS is a plain object-cover. The numbers below ARE that measured track:
// the little red cross on the spire is the only saturated pure red in the
// frame, and its centroid was read out of all 150 stills. Re-cut the film
// and they are wrong; re-measure, don't guess.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** 4K 60fps drone master, one level above website/. */
const SRC = resolve(ROOT, "../IMG_3548.MP4");
const OUT = resolve(ROOT, "public/hero-mobile.mp4");
const FILM_DIR = resolve(ROOT, "public/hero-frames");
const FILM = resolve(FILM_DIR, "film.h264");
const FILM_INDEX = resolve(FILM_DIR, "film.json");

/* ── THE CHROMIUM CUT ──────────────────────────────────────────────────────
   Sharp, because WebCodecs decodes one frame at a time and does not care.

   ⚠ THE RIGHT SIZE IS SET BY THE CANVAS, NOT BY TASTE, AND IT IS ARITHMETIC.
   useScrubFilm caps the backing store at devicePixelRatio 2, so the canvas is
   exactly (CSS width x 2) by (CSS height x 2) device pixels, and the film is
   drawn into it with object-cover. Every phone is TALLER than this film's
   aspect (see CROP_W_FRAC), so cover always scales by HEIGHT — which makes
   FILM_H the only number that decides whether the hero is sharp, and the test
   is simply "is FILM_H at least twice the tallest phone's CSS height".

       phone (CSS)      canvas        960x1600      1080x1920
       393 x 852        786 x 1704    1.065  ↑      0.888  ↓
       430 x 932        860 x 1864    1.165  ↑      0.971  ↓

   So 960x1600 — which is what production ran, and what looked right on a
   Galaxy A55 — was being UPSCALED on every modern phone, by 6% on a small
   one and 16% on a large one. 1080x1920 is the first size that downsamples
   everywhere, and it is where the gain stops: the canvas cannot ask for more
   than 1864 rows while the DPR cap is 2, so going higher would buy nothing
   and cost megabytes. If that cap is ever raised to 3, this has to rise with
   it — the two numbers are a pair.

   It also throws away far less of the master. At crop 0.6 the scale filter
   took 1296 source columns down to 960 (74%); at 0.5625 it takes 1215 down to
   1080 (89%). More of what the drone actually recorded survives.

   GOP 1 — every picture an IDR — is not a size choice here, it is what makes
   the hook work: it submits ONLY the frame the scroll currently wants, in any
   direction, with no rewinding and no walking forward from a keyframe. Take
   it away and scrubbing backwards has to replay a GOP per tick.

   CRF 24 rather than 23 because the pixel count went up 35%: this holds the
   file near where it was while still being the sharper picture, since on a
   high-DPI screen resolution buys more than quantisation does. */
const FILM_W = 1080;
const FILM_H = 1920;
const FILM_CRF = "24";

/** Every STEPth source frame. 1197 frames of master → 150 pictures. */
const STEP = 8;
const FRAMES = 150;

/* Portrait slice of the landscape master, as a fraction of its height. This
   has to stay WIDER than any phone (they run ~0.42–0.52 of their height) so
   that object-cover always scales by HEIGHT and there is width left over —
   which is what keeps the baked pan below from ever exposing an edge.

   0.5625 is 9:16 exactly. It was 0.6, and the 0.0375 that came off was width
   that no phone has ever displayed: a 0.46-aspect screen crops a 0.6-aspect
   film by 23% of its width, so those columns were encoded, downloaded and
   decoded on every phone and then thrown away by the cover. Spending the same
   bytes on the rows that ARE shown is strictly better.

   ⚠ Narrow it no further. The margin over a 0.52 phone is now 8%, and the pan
   below eats into it. A sharp picture of the wrong part of the frame is worse
   than a slightly softer one of the right part.

   (Portrait tablets under the 768px breakpoint — an iPad mini is 744x1133,
   i.e. 0.657 — are WIDER than this and therefore cover by width and crop the
   top and bottom. That was already true at 0.6; nothing changes for them.) */
const CROP_W_FRAC = 0.5625;

/* ── THE WEBKIT CUT: RESOLUTION IS THE SMOOTHNESS DIAL HERE ────────────────
   Only this file is seeked, and a seek is a pipeline flush plus a decode
   whose cost scales with pixel count. Measured on a Galaxy A55 (Android 16,
   Chrome 150), median over twenty sequential scrub-sized steps:

       810×1350 GOP 10   27.4 ms   (p90 53.4)   ~36 fps ceiling
       648×1080 GOP  5   26.0 ms   (p90 33.4)   ~38 fps
       648×1080 GOP  1   24.7 ms   (p90 33.8)   ~40 fps
       540× 900 GOP  1   19.5 ms   (p90 27.2)   ~51 fps

   The p90 matters as much as the median: updates arriving at 27ms and then
   53ms do not read as "slow", they read as JITTERY.

   ⚠ EVERY NUMBER IN THAT TABLE IS FROM A GALAXY A55, AND NO ANDROID PHONE
   HAS LOADED THIS FILE SINCE. Android takes the WebCodecs cut; this one is
   read by iPhones and by nothing else. So the resolution was being set by a
   measurement from a device that is not the device — and 648 was chosen on
   that basis, then reported as soft, which it is: a <video> is not DPR-capped
   the way the canvas is, so on a 393pt DPR-3 iPhone this is a 1179-wide box
   showing a 648-wide picture, an upscale of 1.8×.

   810×1440 is the step back up, matching the 9:16 crop. It is the size the
   A55 called jittery — but Apple's decode block is not Qualcomm's, and the
   whole point of re-testing is that the old number was never about iOS. If an
   iPhone jitters at 810, come down to 720×1280 (and re-check GOP with it, see
   below) rather than going straight back to 648. */
const OUT_W = 810;
const OUT_H = 1440;

/* ⚠ GOP 1 IS FASTER HERE, BUT ONLY BECAUSE THE FRAMES ARE SMALL. DO NOT
   GENERALISE IT.
   "Every picture is a keyframe, so every seek is one decode" is the obvious
   reasoning and it is wrong above a certain frame size, because an I-frame
   carries the whole picture while a P-frame carries a difference. Measured
   on the A55, same content, same CRF:

       810×1350   GOP 10 → 27.4 ms      GOP 1 → 37.9 ms   (all-intra LOSES)
       540× 900   GOP  5 → 23.6 ms      GOP 1 → 19.5 ms   (all-intra WINS)

   At 810 the single big I-frame costs more to decode than a small I-frame
   plus nine P-frames; at 540 it does not. So this is a measured pair, not two
   independent choices — change the resolution and GOP has to move with it.

   Which is exactly what happened above: OUT_W went from 648 to 810, so GOP
   goes from 1 to 10, because 810 is on the far side of that crossover. Making
   the resolution bigger while leaving every picture an IDR would have been
   the slowest combination on the table (37.9 ms) and would have read as a
   REGRESSION in smoothness dressed up as an improvement in sharpness.

   ⚠ The crossover itself was measured on the A55 and the trade is at least
   partly device-specific. If 810/GOP-10 is jittery on an iPhone, try
   810/GOP-5 before dropping resolution — a shorter GOP is a smaller walk from
   the keyframe, and it is the cheaper thing to give up.

   -bf 0 is NOT part of that trade and must never move: B-frames reorder
   output, so decode order stops matching presentation order and currentTime
   no longer lands on the picture you asked for. */
const CRF = "26";
const GOP = 10;

/* Measured spire centroid, as a fraction of the width of the WEBP STILLS —
   an ih*0.8 crop — sampled every tenth picture in PRESENTATION order (the
   site scrubs the master in reverse, so picture 0 is the master's last
   frame). Kept in stills space because that is where it was measured; the
   conversion to this file's crop is one ratio, below. */
const CHURCH_TRACK = [
  0.509, 0.512, 0.516, 0.523, 0.531, 0.538, 0.544, 0.549, 0.555, 0.560,
  0.561, 0.560, 0.558, 0.559, 0.561, 0.560,
];

/* ⚠ THE TRACK IS NOT IN THIS FILE'S COORDINATE SPACE, AND USING IT RAW IS A
   SILENT 2%-OFF-CENTRE BUG.
   The track was read off an ih*0.8 crop; this film is a NARROWER crop of the
   same master. The same point in the world is therefore a different FRACTION
   of each frame. Both crops are centred, so one ratio converts:
       f_film = 0.5 + (f_still - 0.5) x (still_crop / film_crop)
   Skipping it under-corrects the pan at the end of the scrub by 2% of the
   frame at crop 0.6, and 2.5% at 0.5625 — a measurement of the output showed
   exactly that before this line existed. Note that the error GROWS as the
   crop narrows, so this matters more now, not less. film.json used to publish
   the same ratio as `focusScale`. */
const STILL_CROP_W_FRAC = 0.8;
const toFilmSpace = (f) =>
  0.5 + (f - 0.5) * (STILL_CROP_W_FRAC / CROP_W_FRAC);

/* The track is flat after ~60% of the film, so a ramp-then-hold is within a
   pixel of the samples and expresses in ffmpeg's expression language as one
   min(). RAMP_END is the picture where it stops moving. */
const START = toFilmSpace(CHURCH_TRACK[0]);
const END = toFilmSpace(CHURCH_TRACK[CHURCH_TRACK.length - 1]);
const RAMP_END = 90;

/* ffmpeg crops BEFORE the reverse (reversing 150 full-4K frames would buffer
   ~1.9 GB; reversing them already cropped and scaled buffers ~0.3 GB), so the
   `n` the crop sees counts in MASTER order and the track has to be read
   backwards: master picture n is presentation picture FRAMES-1-n. */
const cropExpr = (srcW, srcH) => {
  const cw = Math.round(srcH * CROP_W_FRAC);
  const centred = (srcW - cw) / 2;
  // Put the spire under the middle of the crop: shift by (focus - 0.5)·cw.
  const at0 = centred + (START - 0.5) * cw;
  const travel = (END - START) * cw;
  // Even x only — an odd offset on yuv420p makes the chroma plane shift a
  // half pixel differently from luma, which reads as a 1px horizontal jitter.
  return (
    `crop=${cw}:${srcH}:` +
    `2*floor((${at0.toFixed(1)}+${travel.toFixed(1)}` +
    `*min(1\\,(${FRAMES - 1}-n)/${RAMP_END}))/2):0`
  );
};

const probe = () => {
  const out = execFileSync(
    ffmpeg,
    ["-hide_banner", "-display_rotation", "0", "-i", SRC],
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
  ).toString();
  return out;
};

// ffmpeg exits non-zero when given only -i, and prints the stream table on
// stderr; that is the whole point of the call.
let info = "";
try {
  probe();
} catch (e) {
  info = `${e.stdout ?? ""}${e.stderr ?? ""}`;
}
const dims = info.match(/Stream #0:0.*?, (\d+)x(\d+)/);
if (!dims) throw new Error(`could not read the master's dimensions from:\n${info}`);
const [srcW, srcH] = [Number(dims[1]), Number(dims[2])];

/** The filter chain up to the scale, which every cut shares. */
const chain = (w, h) =>
  [
    `select=not(mod(n\\,${STEP}))`,
    cropExpr(srcW, srcH),
    `scale=${w}:${h}:flags=lanczos:out_color_matrix=bt709:out_range=tv`,
    "format=yuv420p",
    "reverse",
    "setpts=N/30/TB",
  ].join(",");

/** Colour tagging. The scale filter above does the conversion; this only
    LABELS it, and the two must always be changed together. */
const TAG = [
  "-colorspace", "bt709",
  "-color_primaries", "bt709",
  "-color_trc", "bt709",
  "-color_range", "tv",
];

/** An MP4 to be seeked with currentTime — the WebKit shape. */
function encodeVideo({ w, h, crf, gop, out }) {
  execFileSync(
    ffmpeg,
    [
      "-hide_banner", "-loglevel", "error", "-y",
      "-display_rotation", "0",
      "-i", SRC,
      "-map", "0:0",            // skip the attached-thumbnail stream
      "-vf", chain(w, h),
      "-r", "30",
      "-c:v", "libx264",
      "-profile:v", "high",
      "-preset", "slow",
      "-crf", String(crf),
      "-g", String(gop),
      "-keyint_min", String(gop),
      "-sc_threshold", "0",     // keyframes on the grid, not where the scene cuts
      "-bf", "0",               // see the note at the head of this file
      ...TAG,
      "-movflags", "+faststart", // moov atom first, so it streams progressively
      "-an",
      out,
    ],
    { stdio: "inherit" }
  );
  return statSync(out).size;
}

/* ── THE WEBCODECS SHAPE: a raw Annex-B elementary stream, not an MP4 ──────
   WebCodecs takes EncodedVideoChunks, not a container, so there is nothing
   for an MP4 to do here except add a parser. The stream is emitted flat and
   the sidecar .json says where each picture starts and how long it is, which
   is all the hook needs to hand one picture at a time to the decoder. */
function encodeFilm({ w, h, crf, out, indexOut }) {
  mkdirSync(dirname(out), { recursive: true });
  execFileSync(
    ffmpeg,
    [
      "-hide_banner", "-loglevel", "error", "-y",
      "-display_rotation", "0",
      "-i", SRC,
      "-map", "0:0",
      "-vf", chain(w, h),
      "-r", "30",
      "-c:v", "libx264",
      "-profile:v", "high",
      "-preset", "slow",
      "-crf", String(crf),
      "-g", "1", "-keyint_min", "1", "-sc_threshold", "0",
      "-bf", "0",
      ...TAG,
      "-an",
      "-f", "h264",             // Annex-B elementary stream, no container
      out,
    ],
    { stdio: "inherit" }
  );

  const buf = readFileSync(out);
  const { frames, codec } = indexAnnexB(buf);
  if (frames.length !== FRAMES) {
    throw new Error(
      `indexed ${frames.length} pictures but the encode should have produced ` +
      `${FRAMES} — the Annex-B walk is wrong, not the film.`
    );
  }
  const keys = frames.filter((f) => f[2]).length;
  if (keys !== frames.length) {
    throw new Error(`only ${keys} of ${frames.length} pictures are keyframes — GOP 1 did not hold`);
  }
  /* No `focusScale`, unlike the film this replaces. That field existed to
     convert a focal track measured in one crop's coordinates into another's;
     the pan is baked into the crop now, so every cut is already centred and
     the canvas draws a plain centre-cover. */
  writeFileSync(indexOut, JSON.stringify({ codec, width: w, height: h, gop: 1, frames }));
  return { bytes: buf.length, codec, keys };
}

/* ── --variants: THE LADDER, FOR DECIDING ON A REAL iPHONE ─────────────────
   An iPhone has now run WebCodecs without the tab dying, which retires the
   assumption this whole split was built on — but it read as LAGGIER than the
   seeked <video>, and that comparison was not a fair one: the film had 78%
   more pixels AND a full second of scrub easing against the video's 0.35.
   Two variables, one result, no conclusion.

   These cuts hold everything constant except the two things being chosen.
   src/lib/heroVariants.ts pins the easing at 0.35 for all of them, so what a
   tester feels is mechanism and resolution and nothing else.

   Only the three that do not already exist are encoded — v810 is production's
   hero-mobile.mp4 and f1080 is production's film.h264, byte for byte, so the
   baseline in the ladder really is the baseline and not a re-encode of it.

   Throwaway. Delete public/hero-test/ and this block once a winner is picked;
   the winner's numbers move into the constants at the top of this file. */
const VARIANT_CUTS = [
  { id: "v648",  kind: "video", w: 648,  h: 1152, crf: 26, gop: 1 },
  { id: "v1080", kind: "video", w: 1080, h: 1920, crf: 26, gop: 10 },
  { id: "f810",  kind: "film",  w: 810,  h: 1440, crf: 24 },
];

if (process.argv.includes("--variants")) {
  const dir = resolve(ROOT, "public/hero-test");
  mkdirSync(dir, { recursive: true });
  console.log(`master ${srcW}x${srcH} → variant ladder in public/hero-test/\n`);
  for (const c of VARIANT_CUTS) {
    if (c.kind === "video") {
      const out = resolve(dir, `${c.id}.mp4`);
      const bytes = encodeVideo({ ...c, out });
      console.log(
        `${c.id.padEnd(6)} ${c.w}x${c.h}  GOP ${c.gop}  ` +
        `${(bytes / 1024 / 1024).toFixed(2)} MB   (seeked)`
      );
    } else {
      const out = resolve(dir, `${c.id}.h264`);
      const { bytes, codec } = encodeFilm({
        ...c, out, indexOut: resolve(dir, `${c.id}.json`),
      });
      console.log(
        `${c.id.padEnd(6)} ${c.w}x${c.h}  ${codec}  ` +
        `${(bytes / 1024 / 1024).toFixed(2)} MB   (WebCodecs)`
      );
    }
  }
  console.log("\ndone — the ladder is at /hero-test on the site.");
  process.exit(0);
}

console.log(`master ${srcW}x${srcH} → ${OUT_W}x${OUT_H}, every ${STEP}th frame\n`);

const bytes = encodeVideo({ w: OUT_W, h: OUT_H, crf: CRF, gop: GOP, out: OUT });
console.log(
  `\nhero-mobile.mp4  ${OUT_W}x${OUT_H}  GOP ${GOP}  ` +
  `${(bytes / 1024 / 1024).toFixed(2)} MB   (WebKit — seeked)`
);

console.log("\nencoding the Chromium cut…");
const film = encodeFilm({
  w: FILM_W, h: FILM_H, crf: FILM_CRF, out: FILM, indexOut: FILM_INDEX,
});
console.log(
  `film.h264        ${FILM_W}x${FILM_H}  ${film.codec}  ${FRAMES} pictures ` +
  `(${film.keys} keyframes)  ${(film.bytes / 1024 / 1024).toFixed(2)} MB   (Chromium — WebCodecs)`
);

/**
 * Walk an Annex-B H.264 stream and return one entry per picture.
 *
 * Annex-B is a flat run of NAL units, each introduced by a three- or four-byte
 * start code. Two NAL types are pictures ("VCL"): 1, an ordinary slice, and 5,
 * an IDR slice — a keyframe. The rest are parameter sets and metadata: 7 (SPS),
 * 8 (PPS), 6 (SEI), 9 (access-unit delimiter).
 *
 * A chunk handed to VideoDecoder must be a whole access unit, and for a
 * keyframe that MUST include the SPS and PPS that precede it — configure() is
 * given no `description`, so the parameter sets have to arrive in the stream.
 * Hence the pending-prefix walk: non-VCL NALs are held back and folded into the
 * front of the next picture rather than being emitted as units of their own.
 *
 * Assumes one slice per picture, which is what the encode above produces (no
 * slice threading, no B-frames). If that ever changes this returns too many
 * entries and the count check at the call site is what catches it.
 */
function indexAnnexB(buf) {
  const nals = [];
  for (let i = 0; i + 3 < buf.length; ) {
    if (buf[i] === 0 && buf[i + 1] === 0 && buf[i + 2] === 1) {
      nals.push({ start: i, header: i + 3 });
      i += 3;
    } else if (
      buf[i] === 0 && buf[i + 1] === 0 && buf[i + 2] === 0 && buf[i + 3] === 1
    ) {
      nals.push({ start: i, header: i + 4 });
      i += 4;
    } else i++;
  }

  const units = [];
  let prefix = -1; // where the non-VCL run before the current picture began
  let sps = null;

  for (const nal of nals) {
    const type = buf[nal.header] & 0x1f;
    if (type === 7 && sps === null) sps = nal.header;

    if (type === 1 || type === 5) {
      units.push({ offset: prefix >= 0 ? prefix : nal.start, key: type === 5 });
      prefix = -1;
    } else if (prefix < 0) {
      prefix = nal.start;
    }
  }

  const frames = units.map((u, k) => [
    u.offset,
    (k + 1 < units.length ? units[k + 1].offset : buf.length) - u.offset,
    u.key ? 1 : 0,
  ]);

  /* The three bytes after the SPS NAL header are profile_idc, the constraint
     flags and level_idc — exactly the six hex digits of an `avc1.PPCCLL` codec
     string. Read from the stream rather than hardcoded, so changing -profile:v
     or the resolution (which moves the level) cannot silently produce a config
     the decoder rejects. */
  if (sps === null) throw new Error("no SPS in the encoded film");
  const codec =
    "avc1." +
    [buf[sps + 1], buf[sps + 2], buf[sps + 3]]
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  return { frames, codec };
}

/* ⚠ After running this, bump `CUT` in src/components/sections/Hero.tsx.
   These filenames are stable and next.config.ts serves them with a day of
   max-age, so returning readers keep the old bytes at the same URL — and
   film.json is a byte index into film.h264, so a mismatched pair breaks
   every decode. See the note on CUT there. */
console.log(
  "\n⚠ now bump `CUT` in src/components/sections/Hero.tsx, or returning\n" +
  "  readers will keep the previous cut for up to 24 hours."
);
