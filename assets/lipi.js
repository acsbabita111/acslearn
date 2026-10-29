/* lipi.js v1.0 · 14-Sep-2026 — लिपि-परिचय: 🔊 अक्षर/शब्द का नाम सुनो (browser TTS, भाषा window.LIPI_TTS) · device-local, server शून्य · ES5 */
(function () {
  var lang = window.LIPI_TTS || "en-IN";
  function say(txt) {
    if (!("speechSynthesis" in window)) { alert("इस फ़ोन में आवाज़ नहीं है — अक्षर का नाम देवनागरी में पढ़ लो।"); return; }
    try { window.speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(txt); u.lang = lang; u.rate = 0.8;
      var vs = window.speechSynthesis.getVoices(); var v = null;
      for (var i = 0; i < vs.length; i++) { if (vs[i].lang && vs[i].lang.replace("_", "-").toLowerCase() === lang.toLowerCase()) { v = vs[i]; break; } }
      if (!v) for (var j = 0; j < vs.length; j++) { if (vs[j].lang && vs[j].lang.slice(0, 2).toLowerCase() === lang.slice(0, 2).toLowerCase()) { v = vs[j]; break; } }
      if (v) u.voice = v; window.speechSynthesis.speak(u); } catch (e) {}
  }
  window.lipiSay = function (el) { var t = el && el.getAttribute("data-say"); if (t) say(t); };
})();

/* 29-Oct (Founder-नियम): लिपि-परिचय के हर अक्षर-खाने, हर अक्षर-कार्ड और हर शब्द पर 🔊 के साथ 🎙️ बोलो —
   पन्ने दोबारा बनाए बिना, यही साझा फ़ाइल सब 197 लिपि-पन्नों पर बटन जोड़ती है। बोलो = साझा assets/acs-bolo.js। ES5। */
(function () {
  function ensureBolo(cb) {
    if (window.ACSBolo) { cb(); return; }
    var ex = document.querySelector('script[src*="acs-bolo.js"]');
    if (!ex) { ex = document.createElement("script"); ex.src = "/assets/acs-bolo.js"; document.head.appendChild(ex); }
    var n = 0, iv = setInterval(function () { if (window.ACSBolo || ++n > 60) { clearInterval(iv); if (window.ACSBolo) cb(); else alert("बोलो-अभ्यास अभी लोड नहीं हुआ — इंटरनेट जाँचकर पन्ना दोबारा खोलें।"); } }, 100);
  }
  window.lipiBolo = function (btn) {
    var t = btn.getAttribute("data-say") || "", l = window.LIPI_TTS || "en-IN", one = t.replace(/\s/g, "").length <= 2;
    ensureBolo(function () {
      ACSBolo.open(btn, { t: t, asr: l, tts: l, host: btn.parentNode, forceRec: one,
        recWhy: one ? "अकेले अक्षर की आवाज़-पहचान भरोसेमंद नहीं होती, इसलिए अपनी आवाज़ रिकॉर्ड करके सुनो और मिलाओ।" : "" });
    });
  };
  function addMics() {
    var els = document.querySelectorAll(".lipi-cell[data-say], .lipi-word[data-say], .lipi-sp[data-say]");
    for (var i = 0; i < els.length; i++) {
      var b = els[i]; if (b.getAttribute("data-mic")) continue; b.setAttribute("data-mic", "1");
      var m = document.createElement("button"); m.type = "button"; m.className = "lipi-mic"; m.textContent = "🎙️";
      m.setAttribute("aria-label", "बोलो"); m.setAttribute("data-say", b.getAttribute("data-say"));
      m.onclick = function (e) { if (e && e.stopPropagation) e.stopPropagation(); lipiBolo(this); };
      if (b.className.indexOf("lipi-sp") >= 0) { b.parentNode.insertBefore(m, b.nextSibling); continue; }
      var w = document.createElement("div"); w.className = "lipi-cw" + (b.className.indexOf("lipi-word") >= 0 ? " lipi-ww" : "");
      b.parentNode.insertBefore(w, b); w.appendChild(b);
      var bar = document.createElement("div"); bar.className = "lipi-bar";
      var s = document.createElement("button"); s.type = "button"; s.className = "lipi-sp2"; s.textContent = "🔊"; s.setAttribute("aria-label", "सुनो"); s.setAttribute("data-say", b.getAttribute("data-say"));
      s.onclick = function (e) { if (e && e.stopPropagation) e.stopPropagation(); if (window.lipiSay) lipiSay(this); };
      bar.appendChild(s); bar.appendChild(m); w.appendChild(bar);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", addMics); else addMics();
})();
