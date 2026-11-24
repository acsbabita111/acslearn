/* ============================================================
   ACS vqr-player.js v1.0.1 · 25-Nov-2026
   डिजिटल मित्र (SE026) के पाठों पर वीडियो-रोबोट (VQR) के चुने वीडियो।
   ChatGPT-ऑडिट (24-Nov, PILOT GO) का कार्य B; Founder-नियम: सिर्फ़ ऊपर के 3।
   ------------------------------------------------------------
   - सूची: /assets/vqr/SE026/<पाठ>.json (office-script vqr_khoj.js से बनी)।
   - सूची न हो, टूटी हो, पुरानी (expires_on) हो, या कोई वीडियो न बचे:
     पन्ना वैसा ही रहता है (पुराना "YouTube पर खोजें" बटन)।
   - वीडियो YouTube के अपने player (IFrame API, youtube-nocookie) से चलता है।
     player छूने पर ही उतरता है (कम data, 2GB फ़ोन)।
   - YouTube कहे "वीडियो नहीं है / embed मना" (100, 101, 150): उसकी जगह
     सूची का अगला वीडियो; यह बात इस फ़ोन पर 30 दिन याद।
   - ⚑ रिपोर्ट: कारण चुनो, WhatsApp से ACS को संदेश। रिपोर्ट किसी सूची को
     नहीं बदलती; रोक office से (--rok) ही लगती है। रिपोर्ट किया वीडियो
     इसी फ़ोन पर छिपता है (वापस दिखाने का बटन भी)।
   - v1.0.1 (ChatGPT-ऑडिट P2): आख़िरी वीडियो भी रिपोर्ट से छिपे, तो
     "वापस दिखाएँ" बटन बचा रहता है।
   - सब लिखाई textContent से; ID सख़्त जाँच के बाद ही पते में।
   - ES5 (पुराने Android के लिए); कोई बाहरी library नहीं।
   ============================================================ */
(function () {
  "use strict";
  var PATH_RE = /^\/courses\/hi\/digital-mitra-basic\/dmt-(\d{1,2})-(\d{2})-[a-z0-9-]+\.html$/;
  var m = location.pathname.match(PATH_RE);
  if (!m) return;
  var sec = document.querySelector("section.lsn-video");
  if (!sec || sec.getAttribute("data-vqr")) return;
  sec.setAttribute("data-vqr", "1");

  var LESSON = "dmt-" + (+m[1]) + "." + m[2];
  var COURSE = "SE026";
  var SHOW_MAX = 3;                       /* Founder-नियम: ऊपर के 3 */
  var ID_RE = /^[A-Za-z0-9_-]{11}$/;
  var DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
  var DEAD_DAYS = 30;
  var LOAD_MS = 8000;                     /* सूची इतने में न आए तो पन्ना वैसा ही */
  var API_MS = 12000;                     /* YouTube player इतने में न उतरे तो सीधी कड़ी */
  var K_DEAD = "acsVqrDead", K_HIDE = "acsVqrHide";
  var HARD_ERR = { 100: 1, 101: 1, 150: 1 };

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function today() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function daysAgo(s) { var t = Date.parse(s + "T00:00:00"); return isNaN(t) ? 9999 : (Date.now() - t) / 864e5; }
  function readMap(k) { try { var o = JSON.parse(localStorage.getItem(k) || "{}"); return o && typeof o === "object" ? o : {}; } catch (e) { return {}; } }
  function writeMap(k, o) { try { localStorage.setItem(k, JSON.stringify(o)); } catch (e) { /* निजी mode: बस याद नहीं रहेगा */ } }
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; }
  function cut(s, n) { s = String(s || "").replace(/\s+/g, " ").trim(); return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function mmss(sec) { sec = Math.round(sec); var h = Math.floor(sec / 3600), mi = Math.floor(sec % 3600 / 60), s = sec % 60; return (h ? h + ":" + pad(mi) : mi) + ":" + pad(s); }
  function wapp() {
    var u = "";
    try { if (typeof ACS_CONFIG !== "undefined") u = (ACS_CONFIG.org && ACS_CONFIG.org.whatsapp) || ACS_CONFIG.whatsapp || ""; } catch (e) { u = ""; }
    return /^https:\/\/wa\.me\/\d{8,15}$/.test(u) ? u : "https://wa.me/919431210092";
  }

  /* पुराने 30 दिन से ज़्यादा के "नहीं चलता" निशान हटें */
  var dead = readMap(K_DEAD), hidden = readMap(K_HIDE), sessionBad = {};
  (function () { var ch = false; for (var k in dead) if (dead.hasOwnProperty(k) && daysAgo(dead[k]) > DEAD_DAYS) { delete dead[k]; ch = true; } if (ch) writeMap(K_DEAD, dead); })();

  function getList(cb) {
    var x;
    try { x = new XMLHttpRequest(); } catch (e) { return; }
    var done = false;
    function fin(v) { if (done) return; done = true; if (v) cb(v); }
    x.open("GET", "/assets/vqr/" + COURSE + "/" + LESSON + ".json?d=" + today(), true);
    x.timeout = LOAD_MS;
    x.onload = function () {
      if (x.status !== 200) return fin(null);
      var o = null; try { o = JSON.parse(x.responseText); } catch (e) { o = null; }
      fin(o);
    };
    x.onerror = x.ontimeout = x.onabort = function () { fin(null); };
    try { x.send(); } catch (e) { fin(null); }
  }

  /* सूची की सख़्त जाँच: कुछ भी गड़बड़ = पन्ना वैसा ही */
  function clean(o) {
    if (!o || typeof o !== "object" || o.course_id !== COURSE || o.lesson_id !== LESSON) return null;
    if (!DATE_RE.test(String(o.expires_on || "")) || !(today() < o.expires_on)) return null;
    if (!Array.isArray(o.list)) return null;
    var seen = {}, out = [];
    for (var i = 0; i < o.list.length && out.length < 50; i++) {
      var v = o.list[i];
      if (!v || typeof v !== "object" || !ID_RE.test(String(v.id)) || seen[v.id]) continue;
      if (typeof v.title !== "string" || !v.title.trim()) continue;
      seen[v.id] = 1;
      var d = Number(v.duration_sec);
      out.push({ id: v.id, title: cut(v.title, 110), channel: cut(typeof v.channel === "string" ? v.channel : "", 60),
                 dur: d > 0 && d < 36000 ? d : 0 });
    }
    return out.length ? { list: out, checked: DATE_RE.test(String(o.checked_on || "")) ? o.checked_on : "",
                          disc: typeof o.disclosure_hi === "string" ? cut(o.disclosure_hi, 300) : "" } : null;
  }

  /* ---- YouTube IFrame API: एक बार, छूने पर ---- */
  var yt = { state: 0, wait: [] };          /* 0 नहीं, 1 उतर रहा, 2 तैयार, 3 विफल */
  function withYT(ok, fail) {
    if (yt.state === 2 || (window.YT && window.YT.Player)) { yt.state = 2; return ok(); }
    if (yt.state === 3) return fail();
    yt.wait.push([ok, fail]);
    if (yt.state === 1) return;
    yt.state = 1;
    var prev = window.onYouTubeIframeAPIReady;
    function flush(good) {
      if (yt.state === 2 || yt.state === 3) return;
      yt.state = good ? 2 : 3;
      var w = yt.wait; yt.wait = [];
      for (var i = 0; i < w.length; i++) try { w[i][good ? 0 : 1](); } catch (e) { /* अगला चले */ }
    }
    window.onYouTubeIframeAPIReady = function () { if (typeof prev === "function") try { prev(); } catch (e) {} flush(true); };
    var s = document.createElement("script");
    s.src = "https://www.youtube.com/iframe_api";
    s.async = true;
    s.onerror = function () { flush(false); };
    document.head.appendChild(s);
    setTimeout(function () { if (!(window.YT && window.YT.Player)) flush(false); }, API_MS);
  }

  /* ---- बनावट ---- */
  var data, box, grid, note, disc, intro, introText, queue = [];

  function usable(v) { return !dead[v.id] && !hidden[v.id] && !sessionBad[v.id]; }
  function nextSpare() { while (queue.length) { var v = queue.shift(); if (usable(v)) return v; } return null; }
  function say(text, undo) {
    note.textContent = "";
    if (!text) { note.style.display = "none"; return; }
    note.appendChild(document.createTextNode(text + " "));
    if (undo) { var b = el("button", "vqr-undo", "वापस दिखाएँ"); b.type = "button"; b.onclick = undo; note.appendChild(b); }
    note.style.display = "";
  }

  function card(v) {
    var c = el("div", "vqr-card");
    c.setAttribute("data-id", v.id);
    var poster = el("button", "vqr-poster");
    poster.type = "button";
    poster.setAttribute("aria-label", "वीडियो चलाएँ: " + v.title);
    var img = document.createElement("img");
    img.alt = ""; img.width = 320; img.height = 180; img.loading = "lazy"; img.decoding = "async";
    img.src = "https://i.ytimg.com/vi/" + v.id + "/mqdefault.jpg";
    img.onerror = function () { if (img.parentNode) img.parentNode.removeChild(img); poster.className += " vqr-noimg"; };
    poster.appendChild(img);
    poster.appendChild(el("span", "vqr-fb", "▶ वीडियो"));         /* चित्र न खुले तो भी दिखे */
    poster.appendChild(el("span", "vqr-play", "▶"));
    if (v.dur) poster.appendChild(el("span", "vqr-dur", mmss(v.dur)));
    poster.onclick = function () { play(c, v); };
    c.appendChild(poster);
    var meta = el("div", "vqr-meta");
    meta.appendChild(el("div", "vqr-title", v.title));
    if (v.channel) meta.appendChild(el("div", "vqr-ch", "चैनल: " + v.channel));
    c.appendChild(meta);
    var rep = el("button", "vqr-rep", "⚑ रिपोर्ट करें");
    rep.type = "button";
    rep.setAttribute("aria-expanded", "false");
    rep.onclick = function () { toggleReport(c, v, rep); };
    c.appendChild(rep);
    return c;
  }

  function play(c, v) {
    var poster = c.querySelector(".vqr-poster");
    var frame = el("div", "vqr-frame");
    var slot = el("div", "vqr-slot");
    frame.appendChild(slot);
    if (poster) c.replaceChild(frame, poster); else c.insertBefore(frame, c.firstChild);
    slot.appendChild(el("div", "vqr-wait", "वीडियो खुल रहा है…"));
    withYT(function () {
      slot.textContent = "";
      var holder = el("div", "vqr-holder"); slot.appendChild(holder);
      try {
        new window.YT.Player(holder, {
          videoId: v.id, host: "https://www.youtube-nocookie.com", width: "100%", height: "100%",
          playerVars: { autoplay: 1, playsinline: 1, rel: 0, hl: "hi", origin: location.origin },
          events: { onError: function (e) { broken(c, v, e && e.data); } }
        });
      } catch (err) { noApi(slot, v); }
    }, function () { noApi(slot, v); });
  }

  function noApi(slot, v) {
    slot.textContent = "";
    var p = el("div", "vqr-noapi", "वीडियो यहाँ नहीं खुला। इंटरनेट जाँचें, या YouTube पर देखें: ");
    var a = el("a", "vqr-ytlink", "YouTube पर खोलें");
    a.href = "https://www.youtube.com/watch?v=" + v.id; a.target = "_blank"; a.rel = "noopener";
    p.appendChild(a); slot.appendChild(p);
  }

  /* YouTube ने कहा "नहीं चलता": उसकी जगह अगला */
  function broken(c, v, code) {
    if (HARD_ERR[code]) { dead[v.id] = today(); writeMap(K_DEAD, dead); } else sessionBad[v.id] = 1;
    swap(c, "यह वीडियो YouTube पर अब नहीं चलता।");
  }

  function swap(c, why, undo) {
    if (c.parentNode !== grid) return;            /* YouTube दो बार त्रुटि भेजे, या कार्ड पहले ही बदला: दोबारा नहीं */
    var n = nextSpare();
    if (n) { grid.replaceChild(card(n), c); say(why + " उसकी जगह अगला वीडियो लगा।", undo); }
    else { grid.removeChild(c); say(why, undo); }
    if (!grid.children.length) giveUp(!!undo);
  }

  function toggleReport(c, v, btn) {
    var open = c.querySelector(".vqr-why");
    if (open) { c.removeChild(open); btn.setAttribute("aria-expanded", "false"); return; }
    btn.setAttribute("aria-expanded", "true");
    var w = el("div", "vqr-why");
    w.appendChild(el("div", "vqr-why-q", "क्या गड़बड़ है? एक चुनें। संदेश WhatsApp से ACS को जाएगा।"));
    var reasons = ["पाठ से मेल नहीं खाता", "ग़लत या भ्रामक जानकारी", "बच्चों के लिए ठीक नहीं", "वीडियो नहीं चलता"];
    for (var i = 0; i < reasons.length; i++) (function (r) {
      var a = el("a", "vqr-why-a", r);
      a.target = "_blank"; a.rel = "noopener";
      a.href = wapp() + "?text=" + encodeURIComponent("ACS वीडियो-रिपोर्ट\nपाठ: " + LESSON + "\nवीडियो: " + v.id +
               "\nकारण: " + r + "\nपन्ना: " + location.origin + location.pathname);
      a.onclick = function () { setTimeout(function () { reported(c, v); }, 0); };
      w.appendChild(a);
    })(reasons[i]);
    var no = el("button", "vqr-why-no", "रहने दें"); no.type = "button";
    no.onclick = function () { toggleReport(c, v, btn); };
    w.appendChild(no);
    c.appendChild(w);
  }

  function reported(c, v) {
    if (!c.parentNode) return;
    hidden[v.id] = today(); writeMap(K_HIDE, hidden);
    swap(c, "धन्यवाद। WhatsApp में \"भेजें\" दबाएँ। यह वीडियो आपके फ़ोन पर अब नहीं दिखेगा।", function () {
      delete hidden[v.id]; writeMap(K_HIDE, hidden); render(); say("");
    });
  }

  /* कोई वीडियो न बचे: पन्ना पहले जैसा (YouTube-खोज बटन वाला)।
     रिपोर्ट से आख़िरी वीडियो छिपा हो, तो संदेश और "वापस दिखाएँ" बचे रहें (ChatGPT-ऑडिट P2, 25-Nov)। */
  function giveUp(keepNote) {
    if (intro) intro.textContent = introText;
    if (keepNote && box && box.parentNode) { grid.style.display = "none"; disc.style.display = "none"; return; }
    if (box && box.parentNode) box.parentNode.removeChild(box);
  }

  function render() {
    var show = [];
    queue = data.list.slice();
    while (show.length < SHOW_MAX) { var v = nextSpare(); if (!v) break; show.push(v); }
    if (!show.length) { giveUp(); return; }
    if (!box) build();
    grid.style.display = ""; disc.style.display = "";
    grid.textContent = "";
    for (var i = 0; i < show.length; i++) grid.appendChild(card(show[i]));
    if (!box.parentNode) { var h = sec.querySelector("h2"); sec.insertBefore(box, intro ? intro.nextSibling : (h ? h.nextSibling : sec.firstChild)); }
    if (intro) intro.textContent = "नीचे के वीडियो ACS के रोबोट ने चुने हैं। और वीडियो चाहिए, तो YouTube पर खोजें।";
  }

  function build() {
    box = el("figure", "vqr-box");                 /* figure: 🔊 सुनो इसे नहीं पढ़ता */
    box.setAttribute("aria-label", "ACS के चुने वीडियो");
    grid = el("div", "vqr-grid");
    box.appendChild(grid);
    note = el("div", "vqr-note"); note.setAttribute("role", "status"); note.style.display = "none";
    box.appendChild(note);
    disc = el("figcaption", "vqr-disc",
      (data.disc || "यह सूची और इसका क्रम ACS ने चुना है। यह YouTube का खोज-नतीजा नहीं है।") +
      (data.checked ? " रोबोट-जाँच: " + data.checked + "।" : ""));
    box.appendChild(disc);
  }

  getList(function (raw) {
    var d = clean(raw);
    if (!d) return;
    data = d;
    var ps = sec.getElementsByTagName("p");
    for (var i = 0; i < ps.length; i++) {
      var cl = " " + ps[i].className + " ";
      if (cl.indexOf(" lsn-vidrow ") < 0 && cl.indexOf(" lsn-vidnote ") < 0) { intro = ps[i]; break; }
    }
    introText = intro ? intro.textContent : "";
    render();
  });
})();
