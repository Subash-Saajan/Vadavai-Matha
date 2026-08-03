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
       cannot do it: 150 stills is 14.7 MB, the same film is 3.93 MB.

   Which is what pays for the resolution. 1080×1350 is 56% more pixels than the
   864×1080 stills and still a 73% smaller download.

   GOP 10, and NO B-FRAMES. Both are about seeking, not quality: a scrub jumps
   backwards constantly, and to show frame 97 the decoder must run from the
   keyframe at 90 — nine frames of hardware decode, about two milliseconds.
   Longer GOPs are smaller and seek worse; B-frames reorder output and would
   force the hook to buffer and sort. Neither trade is worth it here.

   ANNEX-B, not MP4, and that is what keeps mp4box.js (~250 KB of JavaScript)
   off the page: an MP4 would have to be demuxed in the browser, whereas an
   elementary stream is just NALs one after another, and the byte offsets are
   worked out HERE, at build time, into film.json. The hook slices the buffer
   and hands it straight to VideoDecoder. Annex-B is also the format that needs
   no `description` in the decoder config — the parameter sets travel in-band
   with every keyframe. */
const FILM_SIZE = "scale=1080:1350:flags=lanczos";
const FILM_CRF = "25";
const FILM_GOP = 10;

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

    execFileSync(ffmpeg, [
      "-hide_banner", "-loglevel", "error",
      "-framerate", "30",
      "-i", resolve(out, "f%03d.webp"),
      "-vf", FILM_SIZE,
      "-c:v", "libx264",
      "-profile:v", "high",
      "-crf", FILM_CRF,
      "-g", String(FILM_GOP),
      "-keyint_min", String(FILM_GOP),
      "-bf", "0",            // see the note on FILM_SIZE — B-frames reorder output
      "-sc_threshold", "0",  // keyframes on the grid, not where the scene cuts
      "-pix_fmt", "yuv420p",
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
      JSON.stringify({ codec, width: w, height: h, gop: FILM_GOP, frames })
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
