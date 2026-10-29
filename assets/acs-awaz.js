/* acs-awaz.js v1.0 · 29-Oct-2026 — आवाज़-ईमानदारी का साझा घर (Founder-पकड़: अरबी में 🔊 पर चुप्पी)
   नियम: फ़ोन/कंप्यूटर में उस भाषा की आवाज़ न हो तो चुप्पी नहीं — देवनागरी उच्चारण हिंदी आवाज़ में, और साफ़ सूचना कि यह असली आवाज़ नहीं।
   इस्तेमाल: acsAwaz.say(text, lang, {el: बटन/कार्ड, pron: "देवनागरी उच्चारण", rate: 0.8, label: "अरबी"})
   el दिया हो और pron न हो तो उसी कार्ड का पहला देवनागरी पाठ (उच्चारण) अपने-आप लिया जाता है। cancel यहाँ नहीं — बुलाने वाला यंत्र करे। */
(function () {
  if (window.acsAwaz) return;
  var DEV = /[\u0900-\u097F]/, noted = false;
  function voices() { try { return window.speechSynthesis.getVoices() || []; } catch (e) { return []; } }
  function norm(l) { return String(l || "").replace("_", "-").toLowerCase(); }
  function findVoice(lang) {
    var vs = voices(), L = norm(lang), b = L.split("-")[0], i;
    for (i = 0; i < vs.length; i++) if (norm(vs[i].lang) === L) return vs[i];
    for (i = 0; i < vs.length; i++) if (norm(vs[i].lang).split("-")[0] === b) return vs[i];
    return null;
  }
  function pronFrom(el, skip) {
    if (!el || !el.closest) return "";
    var card = el.closest("[data-a],.cp-card,.vk-er,.bw-card,.lipi-card,.lipi-cell,.lipi-word,.lipi-w,li,tr") || el.parentNode;
    if (!card) return "";
    var all = card.querySelectorAll("*");
    for (var i = 0; i < all.length; i++) {
      var n = all[i];
      if (n.children.length || n.tagName === "BUTTON" || n.tagName === "SCRIPT") continue;
      var t = (n.textContent || "").trim();
      if (t && DEV.test(t) && t !== skip && !/^(नाम|आवाज़|लिखो|ध्यान)/.test(t)) return t;
    }
    return "";
  }
  function label(opt) { return (opt && opt.label) || window.ACS_LANG_HI || document.documentElement.getAttribute("data-lang-hi") || "इस भाषा"; }
  function note(opt) {
    if (noted) return; noted = true;
    var nm = label(opt), n = document.createElement("div");
    n.setAttribute("role", "status");
    n.style.cssText = "position:fixed;left:12px;right:12px;bottom:84px;z-index:99999;background:#FFF8E1;color:#0B1F3A;border:2px solid #F9A825;border-radius:14px;padding:14px 16px;font-size:17px;line-height:1.7;box-shadow:0 6px 18px rgba(0,0,0,.18);font-family:inherit";
    n.innerHTML = "⚠️ इस फ़ोन या कंप्यूटर में " + nm + " की आवाज़ नहीं मिली।<br>अभी 🔊 देवनागरी उच्चारण को हिंदी आवाज़ में पढ़ रहा है — यह असली " + nm + " आवाज़ नहीं है।<br><b>असली आवाज़:</b> Android में Settings → Text-to-speech → Google → आवाज़ का डेटा → " + nm + " डाउनलोड करें; कंप्यूटर पर यह पन्ना Microsoft Edge में खोलें।<br>";
    var b = document.createElement("button"); b.type = "button"; b.textContent = "ठीक है";
    b.style.cssText = "margin-top:8px;font-size:17px;padding:6px 16px;border-radius:10px;border:0;background:#1565C0;color:#fff";
    b.onclick = function () { if (n.parentNode) n.parentNode.removeChild(n); };
    n.appendChild(b); document.body.appendChild(n);
  }
  function speakHi(pron, rate) {
    var u = new SpeechSynthesisUtterance(pron); u.lang = "hi-IN"; var hv = findVoice("hi-IN"); if (hv) u.voice = hv; u.rate = rate || 0.85;
    window.speechSynthesis.speak(u); return true;
  }
  function say(text, lang, opt) {
    opt = opt || {};
    if (!("speechSynthesis" in window)) { alert("इस फ़ोन/ब्राउज़र में आवाज़ की सुविधा नहीं है — उच्चारण देवनागरी में पढ़ लीजिए।"); return false; }
    var base = norm(lang).split("-")[0], ready = voices().length > 0, v = findVoice(lang);
    var getPron = function () { return opt.pron || pronFrom(opt.el, opt.skip); };
    if (base !== "hi" && ready && !v) { var p0 = getPron(); note(opt); if (p0) return speakHi(p0, opt.rate); }
    var u = new SpeechSynthesisUtterance(text); u.lang = lang; if (v) u.voice = v; u.rate = opt.rate || 0.85;
    if (base !== "hi") u.onerror = function (e) { var er = e && e.error; if (er && er !== "interrupted" && er !== "canceled") { var p1 = getPron(); note(opt); if (p1) speakHi(p1, opt.rate); } };
    window.speechSynthesis.speak(u); return true;
  }
  window.acsAwaz = { say: say, hasVoice: function (lang) { return !!findVoice(lang); } };
})();
