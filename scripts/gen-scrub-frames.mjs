// gen-scrub-frames.mjs — extract the mobile scrub frame sequences from the
// site's scroll films (home hero + architecture peel film).
//
// Desktop scrubs the real <video> with currentTime, but phones can't (every
// currentTime set is a full seek — pipeline flush + decode from the nearest
// keyframe), so on touch devices useScrubMedia draws these pre-extracted
// frames onto a <canvas> instead (the Apple product-page technique).
//
// The hero frames come straight from the 4K drone master (IMG_3548.MP4 in
// the project root, one level above website/) rather than the compressed
// delivery video, so they don't inherit its H.264 artifacts. The master
// plays forward (church → sky); the site scrubs it in reverse, so hero
// frames are renamed back-to-front after extraction. It also carries a
// bogus -90° rotation flag (drone quirk) that -display_rotation 0 clears —
// without it every frame comes out sideways.
//
// The delivery video itself is also derived from the master (1080p30,
// reversed, dense keyframes for scrubbing, rotation flag cleared):
//
//   ffmpeg -display_rotation 0 -i ../IMG_3548.MP4 -map 0:0 \
//     -vf "fps=30,scale=1920:1080,reverse" -c:v libx264 -crf 24 \
//     -preset slow -g 15 -pix_fmt yuv420p -movflags +faststart -an \
//     public/hero-video.mp4     (copied to public/peel-film.mp4 while the
//                                real AI peel film is pending)
//
// Frames are center-cropped to 4:5 (phones only ever see that center slice
// through object-cover) and scaled to 864×1080 WebP. If a film changes,
// re-run this and keep FRAME_COUNT in Hero.tsx / PeelFilm.tsx in sync with
// the printed frame count.
//
// Usage:  node scripts/gen-scrub-frames.mjs [hero|peel|all]   (default: all)

import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  statSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ffmpeg from "ffmpeg-static";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dir, "..");

// Center 4:5 slice at any source size, then a size that keeps ~150 frames
// around 10 MB while staying sharp on 3× phone screens.
const CROP = "crop=ih*0.8:ih:(iw-ih*0.8)/2:0";
const SIZE = "scale=864:1080";
const QUALITY = "68";

/* ── THE FILM, WHICH IS WHAT PHONES ACTUALLY PLAY NOW ──────────────────────
   The WebP sequence above is the FALLBACK. The primary mobile path decodes
   this single H.264 stream with WebCodecs (see src/hooks/useScrubFilm.ts), for
   two reasons the frame sequence could never fix:

     · MEMORY. A decoded VideoFrame is released by CALLING close() on it. The
       frame sequence's memory lives in WebKit's decoded-image cache, which no
       amount of dropping references reclaims on demand — which is why the
       sequence needed ~110 MB resident to stay smooth, on an iPhone XR whose
       whole tab dies somewhere past two hundred.
     · SIZE. Fifty of these frames differ from their neighbour by a few pixels
       of drone drift. Inter-frame compression is the entire point, and WebP
       cannot do it: 150 stills is 14.7 MB, the same film is 9.7 MB all-intra
       (and would be 6.1 MB with long GOPs, which seek too badly to use).

   Which is what pays for the resolution. 1080×1350 is 56% more pixels than the
   864×1080 stills and still a 73% smaller download.

   ── EVERY FRAME IS A KEYFRAME, AND THAT IS THE WHOLE DESIGN ──────────────
   This was GOP 10, and it was measured on a real phone (Galaxy A55, over CDP)
   to be badly wrong. Scrolling DOWN the hero the picture changed every 16px;
   scrolling back UP it changed every 74px — the reader's own words were "it's
   just stuck as an image when I come back up". The drawn frames' timestamps
   were exactly 333,330µs apart, which is exactly ten frames: going backwards,
   the scrub was showing keyframes and nothing else.

   The cause is that a backward step is not a step at all. Forwards, frame 98
   follows 97 and costs one decode. Backwards, frame 97 after 98 means rewinding
   to the keyframe at 90 and running seven pictures the reader must never see —
   per frame, for every frame of a backward scrub. Any code that walks that GOP
   is either slow or, as ours was, wrong about which picture to paint.

   So the format changes instead of the workaround getting cleverer. A SCROLL
   SCRUB IS PURE RANDOM ACCESS: it never plays the film in order, which is the
   one thing inter-frame compression optimises for. Making every frame a
   keyframe means frame 97 costs exactly one decode from any starting point,
   backwards is identical to forwards, and the rewind machinery disappears from
   the hook entirely rather than being fixed.

   It costs size — measured at 1080×1350, CRF 23: GOP 10 was 6.14 MB, all-intra
   is 9.7 MB. Still a third less than the 14.7 MB of WebP stills this replaced,
   at 56% more pixels, and it is the difference between a film that scrubs and one
   that sticks. NO B-FRAMES for the same family of reason: they reorder output
   and would force the hook to buffer and sort.

   ANNEX-B, not MP4, and that is what keeps mp4box.js (~250 KB of JavaScript)
   off the page: an MP4 would have to be demuxed in the browser, whereas an
   elementary stream is just NALs one after another, and the byte offsets are
   worked out HERE, at build time, into film.json. The hook slices the buffer
   and hands it straight to VideoDecoder. Annex-B is also the format that needs
   no `description` in the decoder config — the parameter sets travel in-band
   with every keyframe. */
/* ── COLOUR, WHICH MUST BE STATED AND NOT LEFT TO BE GUESSED ───────────────
   The first cut of this scaled with a bare `scale=` and tagged nothing, and
   ffmpeg's default for an RGB source is BT.601 — so the stream came out
   declaring `bt470bg/unknown/unknown` while the master it derives from is
   `yuv420p(tv, bt709)`. The picture was encoded with one set of coefficients
   and labelled with none.

   Measured on the phone, the DECODED pixels came back within 0.2% of the
   original stills, so this is not a decode bug and Chrome is coping. But
   `getImageData` reads the canvas, which is upstream of the panel: a phone
   treats a video surface according to what the stream says it is, and a
   Samsung AMOLED in particular post-processes tagged video differently from
   the sRGB images sitting beside it on the same page. Untagged or mis-tagged
   is exactly the case where the film drifts away from the photographs around
   it, which is what "a lil dull" describes.

   So the conversion matrix and the tag are both stated, both bt709.

   LIMITED range, matching the master. Full range was measured on the phone as
   an alternative and came out identical (-1.88% luma against the source stills
   versus -1.83%), so there is nothing to buy there — and limited range is the
   universally-respected one, while a full-range flag is quietly ignored by some
   hardware decoders, which washes the picture out badly. Take the safe one when
   the measurement says they are the same.

   ⚠ AND THIS IS NOT WHY THE FILM MIGHT LOOK DULL. Every variant tried —
   untagged BT.601, bt709 limited, bt709 full — landed within 2% of the source
   stills as painted by the phone, which is far below anything an eye reads as
   "duller". The tagging here is correctness, not a cure. If the film reads
   flatter than the photographs beside it on a Samsung, the cause is the panel:
   Vivid mode boosts sRGB images and colour-manages tagged video accurately, so
   an ACCURATE film sits next to BOOSTED stills. Do not try to fix that by
   over-saturating the encode — it would be wrong everywhere else, on every
   iPhone and every desktop, to flatter one display mode.

   Both halves must always agree: the filter converts, `-color_range tv` flags
   it, and a stream converted one way and flagged the other crushes blacks or
   washes them grey depending which way round it got it. */
/* ── THE FILM IS CUT TO A PHONE, NOT TO 4:5 ───────────────────────────────
   The stills are 4:5 because that is a sensible crop of a landscape master.
   It is the wrong shape for the thing that actually displays them. The hero
   canvas is the viewport: 1080×2527 on the Galaxy A55 this was measured on,
   1179×2760 on an iPhone 15 Pro. Covering those with a 4:5 frame means scaling
   it up by 1.9× and 2.0× — and because a 4:5 picture is far wider than a phone,
   nearly 40% of every encoded frame was cropped away unseen. The film was
   paying for pixels nobody saw and blowing up the ones they did.

   Worse, it was ALSO throwing away the master's vertical resolution: 1350 lines
   out of 2160, a 37% cut, before any of that upscaling happened.

   Cutting to 1008×2160 fixes both at once. 2160 is the master's own height, so
   there is no vertical scaling anywhere in the pipeline — the film is now a
   pure CROP of the source, never a resample. Measured against real devices:

     iPhone SE      1.07× → 0.74×   (now downscaling: sharpest possible)
     iPhone XR/11   1.43× → 0.90×   (downscaling)
     iPhone 12–16   2.03× → 1.27×
     Galaxy A55     1.87× → 1.17×
     iPhone 15 PM   2.24× → 1.40×   (the master has only 2160 lines; this is
                                     the floor without inventing detail)
     Z Fold inner   1.75× → 1.74×   (unchanged — a squarish screen crops the
                                     film's top and bottom instead)

   Nothing regresses on any device tested. 1008 = 2160 × 0.4667, which sits
   between the tallest phones (~0.43) and the squarest (~0.52), so both crop a
   little rather than either cropping a lot. */
/* ── THE FILM MUST BE WIDER THAN THE PHONE, NOT EQUAL TO IT ────────────────
   This was ih*0.4667 — a phone's own shape, chosen so the film would need no
   scaling on screen. It is the sharpest possible cut and it broke the one
   thing that matters more: the church is not centred in this drone shot, it
   drifts right as the camera descends, and Hero.tsx corrects for that by
   sliding the frame under the canvas (CHURCH_TRACK → focusXAt).

   That slide needs somewhere to slide TO. Cut the film to exactly a phone's
   aspect and `object-cover` scales it until its width equals the canvas width
   — measured on the Galaxy A55, a 1008-wide film draws at exactly 1080px on a
   1080px canvas. Zero horizontal slack. `dx` clamps to 0, the pan is discarded
   whatever focusX asks for, and the church sits wherever the crop happened to
   leave it, worst at the end of the film where the drift is largest.

   ih*0.6 is wider than any phone canvas (they run ~0.42–0.52), so cover always
   scales by HEIGHT and there is always width left over to pan within. On that
   same A55 the slack goes 0px → 270px, and the focal track needs about 108px
   of it. Do not narrow this again to chase sharpness: a sharp picture of the
   wrong part of the frame is worse than a slightly softer one of the right
   part. */
const FILM_CROP = "crop=ih*0.6:ih:(iw-ih*0.6)/2:0";
const FILM_SIZE =
  "scale=960:1600:flags=lanczos:out_color_matrix=bt709:out_range=tv,format=yuv420p";
const FILM_CRF = "23";
/** 1 = every picture is an IDR. Read the note above before raising this. */
const FILM_GOP = 1;

const JOBS = {
  hero: {
    src: "../IMG_3548.MP4", // 4K 60 fps master, project root
    out: "public/hero-frames",
    step: 8, // ~1197 source frames → ~150
    reversed: true,
    inputArgs: ["-display_rotation", "0"],
    mapArgs: ["-map", "0:0"], // skip the attached-thumbnail stream
    posterSeek: ["-sseof", "-0.3"], // site starts where the master ends
    film: true,
  },
  peel: {
    src: "public/peel-film.mp4", // already reversed 1080p30 stand-in
    out: "public/peel-frames",
    step: 4, // ~599 source frames → ~150
    reversed: false,
    inputArgs: [],
    mapArgs: [],
    posterSeek: [],
    // No film while this is still the stand-in — it would be 4 MB of repo for a
    // video that is going to be replaced. Flip to true when the real peel film
    // lands and PeelFilm.tsx moves onto useScrubFilm.
    film: false,
  },
};

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
 * Assumes one slice per picture, which is what the encode below produces (no
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
    if (type === 7 && !sps) sps = nal.header;

    if (type === 1 || type === 5) {
      units.push({
        offset: prefix >= 0 ? prefix : nal.start,
        key: type === 5,
      });
      prefix = -1;
    } else if (prefix < 0) {
      prefix = nal.start;
    }
  }

  // A unit runs to the start of the next one; the last runs to end of file.
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

const pick = process.argv[2] ?? "all";
const names = pick === "all" ? Object.keys(JOBS) : [pick];
if (names.some((n) => !JOBS[n])) {
  throw new Error(`Unknown job "${pick}" — use hero, peel or all`);
}

for (const name of names) {
  const job = JOBS[name];
  const src = resolve(ROOT, job.src);
  const out = resolve(ROOT, job.out);

  rmSync(out, { recursive: true, force: true });
  mkdirSync(out, { recursive: true });

  // The scrub sequence (portrait crop, mobile only).
  execFileSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error",
    ...job.inputArgs,
    "-i", src,
    ...job.mapArgs,
    "-vf", `select=not(mod(n\\,${job.step})),${CROP},${SIZE}`,
    "-vsync", "0",
    "-c:v", "libwebp", "-q:v", QUALITY,
    resolve(out, "f%03d.webp"),
  ], { stdio: "inherit" });

  if (job.reversed) {
    const frames = readdirSync(out).filter((f) => /^f\d+\.webp$/.test(f)).sort();
    const n = frames.length;
    for (const f of frames) renameSync(resolve(out, f), resolve(out, `tmp-${f}`));
    frames.forEach((f, i) => {
      renameSync(
        resolve(out, `tmp-${f}`),
        resolve(out, `f${String(n - i).padStart(3, "0")}.webp`)
      );
    });
  }

  // Full-frame poster (the site's first frame, landscape) — painted under
  // both the desktop video and the mobile canvas so the section has pixels
  // before either is ready.
  execFileSync(ffmpeg, [
    "-hide_banner", "-loglevel", "error",
    ...job.inputArgs,
    ...job.posterSeek,
    "-i", src,
    ...job.mapArgs,
    "-frames:v", "1",
    "-vf", "scale=1920:-2",
    "-c:v", "libwebp", "-q:v", "78",
    resolve(out, "poster.webp"),
  ], { stdio: "inherit" });

  /* ── The film + its index (the primary mobile path) ──
     Built from the WebP stills rather than the master, deliberately: the two
     paths then show the SAME pictures in the same order, so a device that
     falls back to the sequence sees the same film at lower resolution, not a
     different cut. `-r 30` on the input is nominal — nothing plays this at
     speed, the hook addresses frames by index. */
  if (job.film) {
    const stills = readdirSync(out).filter((f) => /^f\d+\.webp$/.test(f));
    const film = resolve(out, "film.h264");

    /* ── FROM THE MASTER, NEVER FROM THE STILLS ────────────────────────────
       This read `f%03d.webp` and it was quietly the worst thing in the file.
       Those stills are 864×1080 at WebP q68, so the film was being built by
       taking a 1728×2160 crop of the 4K master, throwing three quarters of it
       away, compressing THAT lossily, then UPSCALING the result 1.25× to
       1080×1350 and compressing it again. Every one of the film's "extra"
       pixels was invented from an 864-wide picture that had already been
       through a lossy encoder. Held next to a native crop of the master the
       difference is not subtle — the tracery, the finials and the lettering
       over the door go from crisp to smeared, which is what reads as grain.

       The film now takes the same frames off the same master with the same
       crop, and the only scale it ever does is a DOWNscale of 1728→1080. The
       WebP sequence is still generated, because the fallback path still needs
       it, but the two are now siblings from one source rather than one being
       derived from the other.

       `reverse` does here what the renaming loop above does for the stills —
       the master plays church→sky and the site scrubs it the other way. It
       buffers the whole selection (~330 MB at this size), which is why it sits
       AFTER the scale rather than before it. `setpts` then relays clean 30fps
       timestamps, since selecting every eighth frame of a 59.94fps master
       leaves gaps the indexer would otherwise have to reason about. */
    execFileSync(ffmpeg, [
      "-hide_banner", "-loglevel", "error",
      ...job.inputArgs,
      "-i", src,
      ...job.mapArgs,
      "-vf",
      `select=not(mod(n\\,${job.step})),${FILM_CROP},${FILM_SIZE}` +
        `${job.reversed ? ",reverse" : ""},setpts=N/30/TB`,
      "-r", "30",
      "-c:v", "libx264",
      "-profile:v", "high",
      "-crf", FILM_CRF,
      "-g", String(FILM_GOP),
      "-keyint_min", String(FILM_GOP),
      "-bf", "0",            // see the note on FILM_SIZE — B-frames reorder output
      "-sc_threshold", "0",  // keyframes on the grid, not where the scene cuts
      // Stated, not guessed — see the note on FILM_SIZE. These tag the stream;
      // the matrix/range CONVERSION is done by the scale filter above, and the
      // two must always be changed together.
      "-colorspace", "bt709",
      "-color_primaries", "bt709",
      "-color_trc", "bt709",
      "-color_range", "tv",
      "-an",
      "-f", "h264",
      film,
    ], { stdio: "inherit" });

    const buf = readFileSync(film);
    const { frames, codec } = indexAnnexB(buf);

    /* The index having a different number of pictures than there are stills
       means the walk above misread the stream, and a silently wrong index is a
       film that scrubs to the wrong frames. Fail the build instead. */
    if (frames.length !== stills.length) {
      throw new Error(
        `${name}: indexed ${frames.length} pictures from film.h264 but there ` +
        `are ${stills.length} stills — the Annex-B walk is wrong, not the film.`
      );
    }

    const [w, h] = FILM_SIZE.match(/scale=(\d+):(\d+)/).slice(1).map(Number);
    writeFileSync(
      resolve(out, "film.json"),
      /* CHURCH_TRACK in Hero.tsx is measured on the STILLS, which are an
         ih*0.8 crop; the film is an ih*0.6 crop of the same master. The same
         point in the world is therefore a different FRACTION of each frame,
         and feeding the stills' fraction straight to the film path aims the
         pan at the wrong place. Both crops are centred, so one ratio converts:
             f_film = 0.5 + (f_still - 0.5) x (still_crop / film_crop)
         Published here because this is the only place that knows both crops —
         change either and it regenerates itself instead of rotting. */
      JSON.stringify({
        codec, width: w, height: h, gop: FILM_GOP,
        focusScale: Number(
          (Number(CROP.match(/ih\*([\d.]+)/)[1]) /
            Number(FILM_CROP.match(/ih\*([\d.]+)/)[1])).toFixed(6)
        ),
        frames,
      })
    );

    const keys = frames.filter((f) => f[2]).length;
    console.log(
      `${name}: film ${w}×${h} ${codec}, ${frames.length} pictures ` +
      `(${keys} keyframes), ${(buf.length / 1024 / 1024).toFixed(2)} MB`
    );
  }

  const files = readdirSync(out);
  const total = files.reduce((s, f) => s + statSync(resolve(out, f)).size, 0);
  console.log(
    `${name}: ${files.filter((f) => /^f\d+\.webp$/.test(f)).length} frames + poster, ` +
    `${(total / 1024 / 1024).toFixed(1)} MB → ${JOBS[name].out}/`
  );
}
