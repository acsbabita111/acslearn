/* ============================================================================
   /assets/face-web.js : v1.0 (19-Nov-2026, खेप E-5: वेबसाइट की परीक्षा में कैमरे से चेहरे की जाँच)
   Founder का फ़ैसला 4-ब (19-Nov-2026): लैपटॉप के कैमरे से भी चेहरे की जाँच। यह फ़ाइल वेबसाइट की हर कोर्स-परीक्षा पर
   लागू होती है (लैपटॉप, कंप्यूटर, टैबलेट, या ऐप के बिना फ़ोन)। ऐप में यही काम ऐप का अपना कैमरा (FaceCam.java) करता है।

   Founder के चेहरे वाले नियम (19-Nov-2026), सिर्फ़ कोर्स की अंतिम परीक्षा में (करियर टेस्ट में कभी नहीं):
     - परीक्षा के समय कोने में चेहरे का छोटा गोल चित्र हमेशा दिखता है;
     - शुरू में एक फ़ोटो, फिर फ़ोटो सिर्फ़ तब, जब चेहरा कैमरे से हटे या लौटे, या एक से ज़्यादा चेहरे दिखें;
     - चेहरा हटना सिर्फ़ झंडा है; फ़ैसला ACS का एक व्यक्ति करता है;
     - कैमरे की अनुमति ज़रूरी; 18 से कम उम्र में अभिभावक की सहमति ज़रूरी (पन्ना और server पूछते हैं)।

   यह फ़ाइल क्या करती है (ऐप के FaceCam जैसा ही, वही समय-नियम):
     - सामने का कैमरा खोलती है; लगभग हर 0.7 सेकंड (धीमे device पर कम) एक छोटी तस्वीर (320 x 256) अलग धागे
       (/assets/face-web-worker.js) को भेजती है, जो सिर्फ़ चेहरों की गिनती लौटाता है;
     - कोने में छोटा गोल चित्र (आईने जैसा उल्टा): हरा घेरा = एक चेहरा, लाल = चेहरा नहीं, पीला = एक से ज़्यादा;
       चित्र को उँगली या माउस से खिसका सकते हैं;
     - परीक्षा के समय: चेहरा 3 सेकंड न दिखे = "हटा" की फ़ोटो; 1.5 सेकंड फिर दिखे = "लौटा" की फ़ोटो;
       1.4 सेकंड एक से ज़्यादा चेहरे = फ़ोटो (एक मिनट में एक बार); कुल अधिकतम 20 अपने-आप वाली फ़ोटो;
     - फ़ोटो: JPEG, लंबी ओर अधिकतम 640 pixel। फ़ोटो पन्ने को दी जाती है, पन्ना उसे ACS के server को भेजता है।
   इस device पर कुछ सेव नहीं होता। चेहरों का मिलान सिर्फ़ ACS के server पर होता है।

   पन्ने से बात (ऐप जैसी ही): window.ACSFaceWeb.open(), close(), photo(kind), ack(id), setAuto(on), state(), supported()
   पन्ने को ख़बर: window.__acsFace("cam", "ok" | "fail:<कारण>"), ("seen", 0|1|2), ("photo", JSON), ("nophoto", kind)
   ============================================================================ */
(function () {
  "use strict";
  if (window.ACSFaceWeb) return;
  var STEP_MS = 700, GONE_MS = 3000, BACK_MS = 1500, MANY_MS = 1400, MANY_GAP_MS = 60000, AUTO_MAX = 20;
  var DW = 320, DH = 256, PHOTO_MAX = 640, PHOTO_Q = 0.8, MIN_FACE = 0.06, STALL_MS = 6000;
  var C_WAIT = "#9E9E9E", C_ONE = "#2E7D32", C_NONE = "#C62828", C_MANY = "#F9A825";
  var WORKER_URL = "/assets/face-web-worker.js";

  var st = { want: false, cam: "", seen: -1, auto: false, asking: false, stream: null, worker: null, ready: false, busy: false,
    timer: null, wp: null, last: 0, lastT: -1, lastMove: 0, ms: 0, fid: 0, pid: 0, retry: null,
    state: 0, noFaceSince: 0, faceSince: 0, manySince: 0, lastMany: 0, autoCount: 0 };
  var ring = null, video = null, dcan = null, pcan = null;

  function tell(kind, detail) { try { if (typeof window.__acsFace === "function") window.__acsFace(kind, detail); } catch (e) {} }
  function supported() {
    return !!(navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function" && window.Worker && window.isSecureContext !== false);
  }

  /* ---------- कोने का गोल चित्र ---------- */
  function css() {
    if (document.getElementById("acsFwStyle")) return;
    var s = document.createElement("style"); s.id = "acsFwStyle";
    s.textContent = ".acs-fw{position:fixed;top:64px;right:8px;width:76px;height:76px;border-radius:50%;background:#0B1F3A;border:4px solid " + C_WAIT + ";" +
      "box-shadow:0 4px 14px rgba(0,0,0,.35);z-index:10001;overflow:hidden;touch-action:none;cursor:grab;box-sizing:border-box}" +
      ".acs-fw video{width:100%;height:100%;object-fit:cover;transform:scaleX(-1);border-radius:50%;display:block;pointer-events:none}" +
      ".acs-fw span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}";
    document.head.appendChild(s);
  }
  function showRing() {
    css();
    if (!ring) {
      ring = document.createElement("div"); ring.id = "acsFaceRing"; ring.className = "acs-fw"; ring.setAttribute("role", "img");
      ring.innerHTML = "<span>चेहरे का कैमरा</span>";
      video = document.createElement("video");
      video.setAttribute("playsinline", ""); video.setAttribute("muted", ""); video.muted = true; video.autoplay = true;
      ring.appendChild(video);
      drag(ring);
    }
    if (!ring.parentNode) document.body.appendChild(ring);
    ring.style.display = "";
  }
  function paint(cat) { if (ring) ring.style.borderColor = cat < 0 ? C_WAIT : (cat === 0 ? C_NONE : (cat === 1 ? C_ONE : C_MANY)); }
  function drag(el) {
    var sx = 0, sy = 0, ox = 0, oy = 0, on = false;
    el.addEventListener("pointerdown", function (e) {
      on = true; sx = e.clientX; sy = e.clientY; var r = el.getBoundingClientRect(); ox = r.left; oy = r.top;
      try { el.setPointerCapture(e.pointerId); } catch (x) {}
      e.preventDefault();
    });
    el.addEventListener("pointermove", function (e) {
      if (!on) return;
      var vw = window.innerWidth || 360, vh = window.innerHeight || 640, w = el.offsetWidth || 76;
      var nx = Math.max(4, Math.min(vw - w - 4, ox + e.clientX - sx)), ny = Math.max(4, Math.min(vh - w - 4, oy + e.clientY - sy));
      el.style.left = nx + "px"; el.style.top = ny + "px"; el.style.right = "auto";
    });
    function end() { on = false; }
    el.addEventListener("pointerup", end); el.addEventListener("pointercancel", end);
  }

  /* ---------- कैमरा ---------- */
  function failOf(e) {
    var n = String((e && e.name) || "");
    if (n === "NotAllowedError" || n === "SecurityError" || n === "PermissionDeniedError") return "fail:perm";
    if (n === "NotFoundError" || n === "DevicesNotFoundError" || n === "OverconstrainedError") return "fail:nocam";
    return "fail:busy";
  }
  function stopStream() {
    if (st.stream) { try { st.stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {} }
    st.stream = null;
    if (video) { try { video.srcObject = null; } catch (e) {} }
  }
  function setCam(c) {
    if (st.cam === c) return;
    st.cam = c;
    if (c !== "ok") { st.seen = -1; paint(-1); }
    tell("cam", c);
  }
  function camera() {
    if (st.asking) return Promise.resolve(false);
    st.asking = true;
    var c = { video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 }, frameRate: { ideal: 15, max: 15 } }, audio: false };
    return navigator.mediaDevices.getUserMedia(c).then(function (s) {
      st.asking = false;
      if (!st.want) { s.getTracks().forEach(function (t) { t.stop(); }); return false; }
      stopStream(); st.stream = s; video.srcObject = s;
      s.getVideoTracks().forEach(function (t) { t.onended = function () { if (st.stream === s) lost(); }; });
      var p = null; try { p = video.play(); } catch (e) {}
      st.lastMove = Date.now(); st.lastT = -1;
      return (p && p.then ? p.catch(function () {}) : Promise.resolve()).then(function () { return true; });
    }, function (e) { st.asking = false; if (st.want) setCam(failOf(e)); return false; });
  }
  function worker() {
    if (st.worker && st.wp) return st.wp;
    st.wp = new Promise(function (res) {
      var w;
      try { w = new Worker(WORKER_URL); } catch (e) { st.wp = null; res(false); return; }
      st.worker = w;
      function bad() { st.ready = false; try { w.terminate(); } catch (e) {} if (st.worker === w) { st.worker = null; st.wp = null; } res(false); }
      w.onmessage = function (ev) {
        var m = ev.data || {};
        if (m.t === "ready") { st.ready = true; res(true); return; }
        if (m.t === "fail") { bad(); return; }
        if (m.t === "res") got(m);
      };
      w.onerror = bad;
      w.postMessage({ t: "init" });
    });
    return st.wp;
  }
  function lost() {
    if (!st.want) return;
    setCam("fail:lost");
    stopStream();
    if (!document.hidden) retrySoon();
  }
  function retrySoon() {
    if (st.retry || !st.want) return;
    st.retry = setTimeout(function () {
      st.retry = null;
      if (!st.want || document.hidden || st.cam === "ok") return;
      camera().then(function (ok) { if (ok) { setCam("ok"); loop(); } else retrySoon(); });
    }, 5000);
  }
  function open() {
    if (!supported()) { st.want = true; setCam(""); setCam("fail:support"); return; }
    st.want = true; showRing(); paint(-1);
    if (st.cam && st.cam.indexOf("fail:") === 0) st.cam = "";
    Promise.all([camera(), worker()]).then(function (r) {
      if (!st.want) return;
      if (!r[0]) return;                         /* कैमरे का कारण पहले ही बता दिया */
      if (!r[1]) { stopStream(); setCam("fail:model"); return; }
      setCam("ok"); loop();
    });
  }
  function close() {
    st.want = false; st.auto = false;
    if (st.timer) { clearTimeout(st.timer); st.timer = null; }
    if (st.retry) { clearTimeout(st.retry); st.retry = null; }
    stopStream();
    if (st.worker) { try { st.worker.terminate(); } catch (e) {} st.worker = null; st.wp = null; st.ready = false; }
    st.busy = false; st.cam = ""; st.seen = -1;
    if (ring) { ring.style.display = "none"; paint(-1); }
  }

  /* ---------- हर तस्वीर में चेहरे गिनना ---------- */
  function loop() {
    if (st.timer) { clearTimeout(st.timer); st.timer = null; }
    if (!st.want) return;
    var wait = Math.max(STEP_MS, Math.min(4000, st.ms * 3));
    st.timer = setTimeout(step, wait);
  }
  function step() {
    st.timer = null;
    if (!st.want) return;
    if (document.hidden || st.cam !== "ok" || !st.ready || !video || video.readyState < 2 || !video.videoWidth) { health(); loop(); return; }
    if (st.busy) { loop(); return; }
    health();
    if (st.cam !== "ok") { loop(); return; }
    var vw = video.videoWidth, vh = video.videoHeight, sc = Math.min(DW / vw, DH / vh), nw = Math.max(1, Math.round(vw * sc)), nh = Math.max(1, Math.round(vh * sc));
    if (!dcan) { dcan = document.createElement("canvas"); dcan.width = DW; dcan.height = DH; }
    var g = dcan.getContext("2d", { willReadFrequently: true });
    g.fillStyle = "#000"; g.fillRect(0, 0, DW, DH);
    g.drawImage(video, 0, 0, nw, nh);
    var im = g.getImageData(0, 0, DW, DH);
    st.busy = true; st.fid++;
    try { st.worker.postMessage({ t: "frame", id: st.fid, w: DW, h: DH, vw: nw, minFrac: MIN_FACE, buf: im.data.buffer }, [im.data.buffer]); }
    catch (e) { st.busy = false; }
    loop();
  }
  function health() {   /* कैमरा रुक गया (तस्वीर आगे नहीं बढ़ रही) */
    if (!video || st.cam !== "ok" || document.hidden) return;
    var t = video.currentTime, now = Date.now();
    if (t !== st.lastT) { st.lastT = t; st.lastMove = now; return; }
    if (now - st.lastMove > STALL_MS) lost();
  }
  function got(m) {
    st.busy = false;
    if (!st.want || m.n < 0) return;
    if (m.ms) st.ms = st.ms ? Math.round(st.ms * 0.7 + m.ms * 0.3) : m.ms;
    var n = m.n, cat = Math.min(n, 2), now = Date.now();
    paint(cat);
    if (cat !== st.seen) { st.seen = cat; tell("seen", String(cat)); }
    if (st.auto) autoStep(n, now);
  }
  function autoStep(n, now) {   /* ऐप (FaceCam.java) जैसा ही */
    var seen = n >= 1;
    if (seen) { st.noFaceSince = 0; if (!st.faceSince) st.faceSince = now; }
    else { st.faceSince = 0; if (!st.noFaceSince) st.noFaceSince = now; }
    if (st.state === 0) {
      if (seen) st.state = 1;
      else if (now - st.noFaceSince >= GONE_MS) { st.state = 2; snap("leave"); }
    } else if (st.state === 1) {
      if (!seen && now - st.noFaceSince >= GONE_MS) { st.state = 2; snap("leave"); }
    } else if (seen && now - st.faceSince >= BACK_MS) { st.state = 1; snap("back"); }
    if (n >= 2) {
      if (!st.manySince) st.manySince = now;
      if (now - st.manySince >= MANY_MS && now - st.lastMany >= MANY_GAP_MS) { st.lastMany = now; snap("many"); }
    } else st.manySince = 0;
  }
  function snap(kind) { if (st.autoCount >= AUTO_MAX) return; st.autoCount++; makePhoto(kind); }
  function makePhoto(kind) {
    var b64 = "";
    try {
      if (st.cam === "ok" && video && video.readyState >= 2 && video.videoWidth) {
        var vw = video.videoWidth, vh = video.videoHeight, s = Math.min(1, PHOTO_MAX / Math.max(vw, vh));
        if (!pcan) pcan = document.createElement("canvas");
        pcan.width = Math.max(1, Math.round(vw * s)); pcan.height = Math.max(1, Math.round(vh * s));
        pcan.getContext("2d").drawImage(video, 0, 0, pcan.width, pcan.height);
        var u = pcan.toDataURL("image/jpeg", PHOTO_Q), i = u.indexOf(",");
        if (u.indexOf("data:image/jpeg") === 0 && i > 0) b64 = u.slice(i + 1);
      }
    } catch (e) { b64 = ""; }
    if (!b64) { tell("nophoto", kind); return; }
    st.pid++;
    tell("photo", JSON.stringify({ id: "w" + Date.now().toString(36) + "-" + st.pid, k: kind, img: b64 }));
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden || !st.want) return;
    if (st.cam !== "ok" || !st.stream || st.stream.getVideoTracks().every(function (t) { return t.readyState === "ended"; })) {
      camera().then(function (ok) { if (ok) { setCam("ok"); loop(); } else retrySoon(); });
    } else { st.lastMove = Date.now(); loop(); }
  });

  window.ACSFaceWeb = {
    version: "1.0",
    supported: supported,
    open: open,
    close: close,
    photo: function (kind) { if (st.want && st.cam === "ok") makePhoto(String(kind || "start")); else tell("nophoto", String(kind || "start")); },
    ack: function () {},
    setAuto: function (on) {
      st.auto = !!on;
      if (on) { st.state = 0; st.noFaceSince = 0; st.faceSince = 0; st.manySince = 0; st.lastMany = 0; st.autoCount = 0; }
    },
    state: function () { return { want: st.want, cam: st.cam, seen: st.seen, auto: st.auto, asking: st.asking, ms: st.ms }; }
  };
})();
