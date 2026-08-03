/**
 * Rebuild the /architecture photographs from their camera originals.
 *
 * WHY THIS EXISTS. Every one of these photographs was shot in portrait and
 * carries EXIF `Orientation = 6` ("rotate 90° CW to display"). Whoever first
 * derived the web copies stripped the EXIF without APPLYING it, so the site
 * served five sideways photographs — the vault, and all four windows — for
 * months. `sharp(...).rotate()` with no argument bakes the EXIF rotation into
 * the pixels, which is the fix; the derivative then needs no orientation tag
 * at all. If you ever add a photograph here, go through this script, never
 * through a plain resize.
 *
 *   node scripts/fix-architecture-images.mjs
 *
 * Sources all live in ../PIcs (the camera archive). The `.original.jpg` files
 * written beside each derivative are byte copies of that archive file, so the
 * pairing on disk stays true — do not repoint one without the other.
 */
import sharp from "sharp";
import { mkdirSync, copyFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PICS = path.resolve(HERE, "../../PIcs");
/** The altar original never made it into PIcs; it is still in Downloads. */
const DOWNLOADS = "C:/Users/Subash/Downloads";
const OUT = path.resolve(HERE, "../public/images/architecture");
mkdirSync(OUT, { recursive: true });

/**
 * `rotate` (degrees, CW) is a LEVELLING correction applied after the EXIF
 * rotation. Nothing here uses it, and the bell in particular MUST NOT.
 *
 * ⚠ THE BELL IS NOT TILTED — DO NOT "LEVEL" IT. This was tried and it was
 * wrong. The reasoning was sound and the measurement was not: a bell's lip is
 * a horizontal circle, so the ellipse it projects to has a level major axis
 * whenever the camera is level, and the extreme points of that ellipse read
 * 2.4° low on the right. But the LEFT extreme was read off a blurred edge
 * where the bell meets the dark wooden headstock wheel, and it was read wrong;
 * every automated attempt to find it since (colour threshold, luminance
 * threshold, mirror-symmetry search) has latched onto the wheel or the wall
 * instead. Following a moulding band across the face of the bell — a far
 * clearer line than the silhouette — puts the frame within about a degree and
 * a half of level as shot, and a −2.5° "correction" left it visibly leaning
 * the other way. The owner, looking at the page, confirmed it was straight
 * before and crooked after.
 *
 * If it ever genuinely needs levelling, measure it off the moulding bands, not
 * the silhouette, and check the result against someone looking at the page.
 * The machinery below is kept for that: it rotates and then insets the crop so
 * no black wedge survives at the corners.
 */
const JOBS = [
  {
    out: "vault.jpg",
    src: "IMG_5390.JPG",
    width: 1800,
    // II · "Not a Nail of Iron" — the nave vault, looking up into the ribbed
    // arches themselves. Replaces a sideways frame of the altar screen that
    // showed almost none of the arcading the section is about.
  },
  {
    // No `rotate` — see the warning above. Shown exactly as shot.
    out: "bell.jpg",
    src: "bell.jpeg",
    width: 1100,
  },
  // IV · "Glass, Dye and Gold" — four DISTINCT windows. The old set held the
  // same lancet window twice (105341 and 105326 are one window, minutes
  // apart), which is why the row read as four copies of one photograph.
  {
    out: "glass-1.jpg",
    src: "pics for gen/20260610_105957.jpg",
    width: 1500,
    aspect: 3 / 4,
  },
  {
    // Cropped in, and that is the point of the crop. Shown whole, the rose
    // window sits in the left two-thirds with a third of the frame given over
    // to stencilled wall — so beside glass-1, where the window fills the
    // frame edge to edge, it read as the weaker of a matched pair rather than
    // as its equal. `crop` is in ROTATED source coordinates (3000×4000).
    out: "glass-2.jpg",
    src: "Album 1/20260610_105821.jpg",
    crop: { left: 60, top: 400, width: 2500, height: 3333 },
    width: 1500,
    aspect: 3 / 4,
  },
  {
    out: "glass-3.jpg",
    src: "Album 1/20260610_105341.jpg",
    width: 1500,
    aspect: 3 / 4,
  },
  {
    /* ── THE ALTAR REREDOS, CROPPED TALLER (July 2026). ───────────────────
       The overlay in AltarPhoto.tsx measures its hotspots against this crop,
       so the numbers here and the numbers there move together — read the
       COORDINATES note in that file before touching either.

       It used to be 2140×1840 from (60,760). That box cut the apse vault off
       the top and sliced the painted altar frontal in half at the bottom: the
       blue Last Supper panel runs to y≈2868 and the old crop stopped at 2600,
       straight through the middle of it. It is 2140×2600 from (60,380) now,
       which takes in the vault ribs above and the frontal and its flowers
       below.

       ⚠ THE BOX IS SYMMETRIC ABOUT y=1680, AND THAT IS LOAD-BEARING. 1680 is
       the centre of the old box, so a centred `object-cover` in a container
       still shaped 2140:1840 reproduces the old framing EXACTLY — which is
       how the phone keeps the picture it had while the desktop gets the taller
       one, off one file. Break the symmetry and the phone crop drifts, and the
       SVG overlay (which tracks it with preserveAspectRatio="xMidYMid slice")
       drifts with it. If you must re-frame, keep top and bottom equidistant
       from 1680, or work out the object-position and preserveAspectRatio for
       the new centre and change all three together.

       Exported at ×0.8 as before, so 1712×2080. */
    out: "altar-reredos.jpg",
    src: "1000206865.jpg.jpeg",
    from: DOWNLOADS,
    crop: { left: 60, top: 380, width: 2140, height: 2600 },
    width: 1712,
  },
  {
    // NOT 105948, which was tried first and pulled: it is the same window as
    // glass-1 seen wider, and its composition — a symmetrical window under a
    // painted pointed arch — is the composition of vault.jpg two sections up
    // the same page. 105456 takes the window at an angle instead, and carries
    // the stencilled wall the copy talks about.
    out: "glass-4.jpg",
    src: "Album 1/20260610_105456.jpg",
    width: 1500,
    aspect: 3 / 4,
  },
];

for (const job of JOBS) {
  const src = path.join(job.from ?? PICS, job.src);
  let img = sharp(src).rotate(); // EXIF orientation → pixels

  if (job.rotate) {
    const rotated = await img.rotate(job.rotate, { background: "#000" }).toBuffer();
    const m = await sharp(rotated).metadata();
    const inset = Math.ceil(Math.max(m.width, m.height) * Math.sin(Math.abs(job.rotate) * Math.PI / 180)) + 2;
    img = sharp(rotated).extract({
      left: inset,
      top: inset,
      width: m.width - 2 * inset,
      height: m.height - 2 * inset,
    });
  }

  if (job.crop) {
    img = sharp(await img.toBuffer()).extract(job.crop);
  }

  const resize = job.aspect
    ? { width: job.width, height: Math.round(job.width / job.aspect), fit: "cover" }
    : { width: job.width };

  await img
    .resize(resize)
    .jpeg({ quality: 82, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toFile(path.join(OUT, job.out));

  // Keep the archived original paired with what it actually produced.
  copyFileSync(src, path.join(OUT, job.out.replace(/\.jpg$/, ".original.jpg")));

  const m = await sharp(path.join(OUT, job.out)).metadata();
  console.log(`${job.out.padEnd(13)} ${m.width}x${m.height}   ← ${job.src}`);
}
