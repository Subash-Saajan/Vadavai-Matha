/* ── THE RECORDER HAS TO START BEFORE REACT DOES ───────────────────────────
   Two runs of the React-mounted recorder produced one row each. That row said
   `frames: 0` — not one requestAnimationFrame callback ever ran — and
   `imgs 1/52, 0.2 MB`, so barely anything had decoded. The page is not filling
   up with pictures and dying; it is dying inside a single frame, before the
   browser completes a paint cycle.

   The React recorder cannot see that, for two reasons, and both are fatal to
   it as an instrument:

     · IT STARTS TOO LATE. It runs from an effect in SmoothScroll, and React
       flushes child effects before parent ones — so every section on the page,
       the hero included, has already finished its work by the time the
       recorder arms. The marks placed inside them fire into a recorder that is
       not yet listening, which is why none of them appear.
     · IT CANNOT SEE BEFORE HYDRATION AT ALL. Everything between the first byte
       of HTML and React taking over — parsing, style resolution, the first
       layout, the first paint, the images the preload scanner has already
       started — is invisible to it, and that is precisely the window the page
       is dying in.

   So this runs as a blocking inline script in <head>, before a single element
   of the body exists. It is the earliest code that can run on the page, it
   starts its own rAF loop immediately, and it exposes `window.__bb` so the
   React marks have somewhere to go once the components mount.

   Deliberately NOT a React component's effect, NOT `next/script`, and NOT
   deferred: every one of those runs after the thing being measured.

   Inert without `?bb=1` — it reads one sessionStorage key and returns. Delete
   with lib/probe.ts and /diagnostics once the cause is settled. */

/* ⚠ THE READER MUST NOT RECORD ITSELF, AND THE FIRST VERSION DID.
   This script runs on every route, /diagnostics included, and every run writes
   the same localStorage key. So opening the reader to look at the crashed page
   overwrote the crashed page's record with the reader's own — 169 elements,
   no images, reaching `load` quite happily. The evidence was destroyed by the
   act of going to read it.

   (The earlier React-mounted version survived this by luck: it read the record
   during render, which happens before its own effect could overwrite it. The
   inline version writes during parse, long before any of that.)

   Two defences. The recorder skips the diagnostics route outright, and every
   start rotates the previous record to `-prev` first, so one accidental
   overwrite can no longer lose the only copy. */
const SCRIPT = `(function(){try{
var K="vm-blackbox",F="vm-blackbox-on",BEAT=40,MAX=300;
try{if(new URLSearchParams(location.search).get("bb")==="1")sessionStorage.setItem(F,"1");
if(sessionStorage.getItem(F)!=="1")return;}catch(e){return}
if(location.pathname.indexOf("/diagnostics")!==-1)return;
try{var old=localStorage.getItem(K);if(old&&old!=="[]")localStorage.setItem(K+"-prev",old)}catch(e){}
var t0=performance.now(),log=[],raf=0,lastFrame=0,lastBeat=-1e9,n=0;
function m(){var b=0,d=0,im=document.getElementsByTagName("img");
for(var i=0;i<im.length;i++){if(im[i].naturalWidth>0){b+=im[i].naturalWidth*im[i].naturalHeight*4;d++}}
var cb=0,cv=document.getElementsByTagName("canvas");
for(var j=0;j<cv.length;j++){cb+=cv[j].width*cv[j].height*4}
return{imgMB:+(b/1048576).toFixed(1),canvasMB:+(cb/1048576).toFixed(1),imgs:d+"/"+im.length}}
function flush(){try{localStorage.setItem(K,JSON.stringify(log.slice(-MAX)))}catch(e){}}
function push(label,note){var o=m();o.t=Math.round(performance.now()-t0);o.label=label;
if(note)o.note=note;o.frames=n;try{o.scrollY=Math.round(scrollY)}catch(e){}
o.el=document.getElementsByTagName("*").length;log.push(o);flush()}
window.__bb=push;
push("head","rs="+document.readyState);
function tick(){n++;var now=performance.now()-t0;var gap=Math.round(now-lastFrame);
if(now-lastBeat>=BEAT){push(gap>120?"STALL "+gap+"ms":"frame","rs="+document.readyState);lastBeat=now}
lastFrame=now;raf=requestAnimationFrame(tick)}
raf=requestAnimationFrame(tick);
document.addEventListener("DOMContentLoaded",function(){push("DOMContentLoaded")});
addEventListener("load",function(){push("load")});
addEventListener("pagehide",function(){push("pagehide")});
document.addEventListener("visibilitychange",function(){push("visibility",document.visibilityState)});
}catch(e){try{localStorage.setItem("vm-blackbox-err",String(e))}catch(e2){}}})();`;

/**
 * Mounted in <body> ahead of everything else in the root layout. Next inlines
 * this into the prerendered HTML, so it executes during parse — before the
 * body's own markup, and long before hydration.
 */
export function BlackboxScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
