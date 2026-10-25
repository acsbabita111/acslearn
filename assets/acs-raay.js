/* acs-raay.js v1.0 · 25-Oct-2026 — 👍 पसंद · 👎 नापसंद · 💬 टिप्पणी (साझा component · परत-5)
   Founder-माँग (25-Oct): हर पन्ने के अंत में राय के तीन बटन।
   उपयोग: पन्ने में <div class="acs-raay" data-page="ACS-VK1-en" data-title="मेरा पहला व्याकरण — अंग्रेज़ी"></div>
   Founder-फ़ैसला (25-Oct): अभी सिर्फ़ WhatsApp; Firebase बाद में। इसलिए SERVER = false —
   👍/👎 अभी सिर्फ़ इस फ़ोन में दर्ज (कोई network-अनुरोध नहीं); 👎 पर टिप्पणी-डिब्बा खुलता है।
   Firebase-दौर में: server-function pageVote deploy + यहाँ SERVER = true → फ़ोन में रुकी राय अपने-आप गिनती में जाएगी।
   💬 → पहले चरण में WhatsApp: पन्ना-नाम, पन्ना-कोड, वाक्य-कोड, पता पहले से भरे।
         क्रम (तय नियम): Content Creator टीम → ZM → Academic Head; उसके बाद ही मानक-स्प्रेडशीट में सुधार।
   नंबर/project एकमात्र घर acs-config.js से (fallback साथ)। ES5 (Android 8)। छपाई में छिपा। */
(function (G) {
  "use strict";
  if (typeof document === "undefined") return;
  var SERVER = false;   /* ⚠️ Firebase-दौर तक false */
  var VER = "1.0", LS_V = "acs_raay_v1", LS_D = "acs_dev_v1";
  var C = G.ACS_CONFIG || {};
  var PID = (C.firebase && C.firebase.projectId) || "acslearn-platform";
  var FN = "https://us-central1-" + PID + ".cloudfunctions.net/pageVote";
  var WA = (C.org && C.org.whatsapp) || "https://wa.me/919431210092";

  function css() {
    if (document.getElementById("acs-raay-css")) return;
    var s = document.createElement("style"); s.id = "acs-raay-css";
    s.textContent =
      ".acs-raay{margin:24px 0 8px;border:2px solid #1565C0;border-radius:16px;background:#F5F7FA;padding:12px 14px;font-size:18px;color:#0B1F3A;line-height:1.6}" +
      ".acs-raay h3{margin:0 0 8px;font-size:21px;color:#1565C0}" +
      ".acs-raay .ar-row{display:flex;flex-wrap:wrap;gap:8px}.acs-raay .ar-row button{border:2px solid #1565C0;background:#fff;color:#0B1F3A;border-radius:24px;padding:9px 16px;font-size:18px;font-weight:700;cursor:pointer;min-height:46px}" +
      ".acs-raay .ar-row button.on{background:#1565C0;color:#fff}.acs-raay .ar-up.on{background:#2E7D32!important;border-color:#2E7D32!important}" +
      ".acs-raay .ar-msg{min-height:26px;margin-top:8px;font-size:17px;color:#2E7D32;font-weight:700}" +
      ".acs-raay .ar-box{margin-top:10px;background:#fff;border-radius:12px;padding:10px;border:1px solid #90CAF9}" +
      ".acs-raay textarea,.acs-raay input{width:100%;box-sizing:border-box;font-size:18px;padding:8px;border:2px solid #90CAF9;border-radius:10px;font-family:inherit;margin:4px 0}" +
      ".acs-raay textarea{min-height:96px}.acs-raay label{font-size:17px;font-weight:700}" +
      ".acs-raay .ar-send{border:0;background:#2E7D32;color:#fff;border-radius:24px;padding:10px 18px;font-size:18px;font-weight:700;cursor:pointer;min-height:46px;margin-top:4px}" +
      ".acs-raay .ar-note{font-size:16px;color:#555;margin-top:6px}" +
      "@media print{.acs-raay{display:none!important}}";
    (document.head || document.documentElement).appendChild(s);
  }
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) {} return null; }
  function store() { try { return JSON.parse(ls(LS_V) || "{}") || {}; } catch (e) { return {}; } }
  function save(s) { ls(LS_V, JSON.stringify(s)); }
  function dev() {
    var d = ls(LS_D);
    if (!d || !/^[a-z0-9]{12,40}$/.test(d)) {
      d = ""; while (d.length < 20) d += Math.random().toString(36).slice(2);
      d = d.slice(0, 20); ls(LS_D, d);
    }
    return d;
  }
  function send(page, v) {
    if (!G.fetch) return Promise.reject(new Error("no-fetch"));
    return fetch(FN, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { page: page, vote: v, dev: dev(), ver: VER } }) })
      .then(function (r) { return r.json(); })
      .then(function (j) { if (!j || j.error || !j.result) throw new Error((j && j.error && j.error.status) || "bad"); return j.result; });
  }
  function msg(el, t) { el.querySelector(".ar-msg").innerHTML = t; }
  function paint(el, v) {
    el.querySelector(".ar-up").classList[v === 1 ? "add" : "remove"]("on");
    el.querySelector(".ar-dn").classList[v === -1 ? "add" : "remove"]("on");
  }
  function counts(r) { return (r && typeof r.up === "number") ? " (👍 " + r.up + " · 👎 " + r.down + ")" : ""; }
  function vote(el, v) {
    var page = el.getAttribute("data-page"), s = store(), prev = s[page];
    if (prev && prev.v === v && (prev.sent || !SERVER)) { msg(el, "✅ आपकी राय पहले से दर्ज है। धन्यवाद! 🙏"); return; }
    s[page] = { v: v, sent: false, t: Date.now() }; save(s); paint(el, v);
    if (!SERVER) {
      msg(el, "🙏 धन्यवाद! आपकी राय इस फ़ोन में दर्ज है। सबकी राय गिनने की सुविधा जल्द जुड़ेगी।" +
        (v === -1 ? " क्या कमी लगी? नीचे 💬 टिप्पणी में लिखिए।" : ""));
      if (v === -1) openBox(el, "");
      return;
    }
    msg(el, "⏳ भेज रहे हैं…");
    send(page, v).then(function (r) {
      var s2 = store(); if (s2[page]) { s2[page].sent = true; save(s2); }
      msg(el, "🙏 धन्यवाद! आपकी राय दर्ज हो गई" + counts(r) + "।" + (v === -1 ? " क्या कमी लगी? 💬 टिप्पणी में ज़रूर लिखिए।" : ""));
    }).catch(function () {
      msg(el, "🙏 धन्यवाद! राय आपके फ़ोन में दर्ज है — इंटरनेट/सर्वर जुड़ते ही अपने-आप गिनती में जुड़ जाएगी।" +
        (v === -1 ? " क्या कमी लगी? 💬 टिप्पणी में लिखिए।" : ""));
    });
  }
  function retry(el) {   /* पिछली बार न पहुँची राय — चुपचाप एक बार फिर */
    var page = el.getAttribute("data-page"), p = store()[page];
    if (!p) return;
    paint(el, p.v);
    if (SERVER && !p.sent) send(page, p.v).then(function () { var s = store(); if (s[page]) { s[page].sent = true; save(s); } }).catch(function () {});
  }
  function openBox(el, code) {
    var b = el.querySelector(".ar-box"); b.style.display = "block";
    if (code) el.querySelector(".ar-code").value = code;
    try { b.scrollIntoView({ block: "center", behavior: "smooth" }); } catch (e) {}
    try { el.querySelector(".ar-txt").focus(); } catch (e) {}
  }
  function sendComment(el) {
    var t = el.querySelector(".ar-txt").value.trim(), code = el.querySelector(".ar-code").value.trim();
    if (t.length < 3) { msg(el, "✍️ कृपया पहले अपनी टिप्पणी लिखिए।"); return; }
    if (code && !/^[A-Za-z]{0,3}\d{1,6}$/.test(code)) { msg(el, "वाक्य-कोड ऐसा लिखिए: s0015 (या ख़ाली छोड़ दीजिए)"); return; }
    var txt = "🙋 ACS राय (टिप्पणी)\nपन्ना: " + el.getAttribute("data-title") + " (" + el.getAttribute("data-page") + ")\n" +
      "वाक्य-कोड: " + (code || "—") + "\nपता: " + String(location.href).split("#")[0] + "\nटिप्पणी: " + t.slice(0, 500);
    var url = WA + (WA.indexOf("?") < 0 ? "?" : "&") + "text=" + encodeURIComponent(txt);
    var w = G.open(url, "_blank"); if (!w) location.href = url;
    msg(el, "📤 व्हाट्सऐप खुल गया — वहाँ भेजें वाला बटन दबाइए। धन्यवाद! 🙏");
  }
  function mount(el) {
    if (!el || el.getAttribute("data-on")) return;
    css(); el.setAttribute("data-on", "1");
    el.innerHTML = "<h3>🙋 यह पन्ना आपको कैसा लगा?</h3>" +
      '<div class="ar-row"><button type="button" class="ar-up">👍 पसंद</button><button type="button" class="ar-dn">👎 नापसंद</button>' +
      '<button type="button" class="ar-cm">💬 टिप्पणी</button></div><div class="ar-msg" aria-live="polite"></div>' +
      '<div class="ar-box" style="display:none"><label>💬 आपकी टिप्पणी (सुधार, ग़लती, सुझाव)</label>' +
      '<textarea class="ar-txt" maxlength="500" placeholder="जैसे: इस वाक्य का अर्थ ठीक नहीं लगा…"></textarea>' +
      '<label>वाक्य-कोड (किसी ख़ास वाक्य पर हो तो — ज़रूरी नहीं)</label><input class="ar-code" maxlength="12" placeholder="जैसे s0015">' +
      '<button type="button" class="ar-send">📤 व्हाट्सऐप (WhatsApp) से भेजें</button>' +
      '<div class="ar-note">आपकी टिप्पणी ACS के व्हाट्सऐप पर पहुँचेगी। आपका नंबर ACS को दिखेगा।<br>फिर क्रम से जाँच होगी: कंटेंट क्रिएटर (Content Creator) टीम → राज्य-प्रमुख (ZM) → एकेडमिक प्रमुख (Academic Head)। उसके बाद ही सुधार मानक-स्प्रेडशीट में चढ़ेगा।</div></div>';
    el.querySelector(".ar-up").onclick = function () { vote(el, 1); };
    el.querySelector(".ar-dn").onclick = function () { vote(el, -1); };
    el.querySelector(".ar-cm").onclick = function () {
      var b = el.querySelector(".ar-box"); if (b.style.display === "block") b.style.display = "none"; else openBox(el, "");
    };
    el.querySelector(".ar-send").onclick = function () { sendComment(el); };
    retry(el);
  }
  function all() { var L = document.querySelectorAll(".acs-raay[data-page]"); for (var i = 0; i < L.length; i++) mount(L[i]); }
  function comment(code) { all(); var el = document.querySelector(".acs-raay[data-page]"); if (el) openBox(el, code || ""); }

  G.ACSRaay = { mount: mount, comment: comment, VER: VER };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", all); else all();
})(window);
