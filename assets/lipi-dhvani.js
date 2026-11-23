/* lipi-dhvani.js v1.0 · 22-Nov-2026 : ध्वनि-कार्ड वाले लिपि-परिचय की आवाज़ (🔊) और बोलो (🎙️) · ES5 (Android 8) · server शून्य
   नियम (आवाज़-ईमानदारी):
   1. जिस भाषा की मशीन-आवाज़ किसी फ़ोन में नहीं, वहाँ 🔊 हमेशा बटन का data-pron (देवनागरी उच्चारण) हिंदी आवाज़ में बोलता है।
      रोमन पाठ कभी बोलने को नहीं भेजा जाता, इसलिए पहली बार और दूसरी बार का बर्ताव एक जैसा रहता है।
   2. फ़ोन की आवाज़ों की सूची देर से आती है (voiceschanged)। पहले दबाने पर यंत्र थोड़ा रुककर सूची देखता है, फिर बोलता है।
   3. हिंदी आवाज़ न मिले, या आवाज़ की सुविधा ही न हो, तो साफ़ संदेश उसी जगह लिखा आता है। ऐसी आवाज़ लाने की झूठी सलाह कभी नहीं, जो कहीं मिलती ही नहीं।
   0. बोलो-बटन का शब्द data-w में है (data-t नहीं: उस नाम को साझा acs-translate.js अनुवाद-कुंजी मानकर बटन का पाठ बदल देता है)।
   4. 🎙️ = साझा assets/acs-bolo.js का रिकॉर्ड-रास्ता: अपनी आवाज़ रिकॉर्ड करो, सुनो, मिलाओ। मशीन सही/ग़लत का अंक नहीं देती।
      बोलो-डिब्बा कार्ड की पूरी चौड़ाई में खुलता है, और उसका सुनो-बटन भी देवनागरी वाला रास्ता लेता है। */
(function () {
  "use strict";
  var W = window, D = document, SS = W.speechSynthesis, HAS = !!(SS && W.SpeechSynthesisUtterance);
  var hiVoice = null, loaded = false, waited = false, waiters = [], lastBtn = null;
  var MSG_NA = "इस फ़ोन या ब्राउज़र में आवाज़ की सुविधा नहीं है। देवनागरी उच्चारण पढ़कर बोलो।";
  var MSG_NOHI = "इस फ़ोन में हिंदी की आवाज़ नहीं मिली, इसलिए 🔊 चुप रह सकता है। देवनागरी उच्चारण पढ़कर बोलो। हिंदी आवाज़ जोड़ने के लिए फ़ोन की सेटिंग में टेक्स्ट-टू-स्पीच (Text-to-speech) खोलो और हिंदी चुनो।";
  var MSG_ERR = "आवाज़ अभी नहीं चल पाई। देवनागरी उच्चारण पढ़कर बोलो, या थोड़ी देर बाद फिर दबाओ।";

  function norm(l) { return String(l || "").replace("_", "-").toLowerCase(); }
  function scan() {
    var vs = []; try { vs = SS.getVoices() || []; } catch (e) {}
    if (!vs.length) return false;
    loaded = true; hiVoice = null;
    var i;
    for (i = 0; i < vs.length; i++) if (norm(vs[i].lang) === "hi-in") { hiVoice = vs[i]; break; }
    if (!hiVoice) for (i = 0; i < vs.length; i++) if (norm(vs[i].lang).split("-")[0] === "hi") { hiVoice = vs[i]; break; }
    return true;
  }
  function haal(t) { var el = D.getElementById("ld-awaz-haal"); if (el) el.textContent = t || ""; }
  function flush() { var q = waiters; waiters = []; for (var i = 0; i < q.length; i++) q[i](); }
  function onVoices() { if (scan()) { haal(hiVoice ? "" : MSG_NOHI); flush(); } }
  function whenReady(cb) {
    if (!HAS || loaded || waited || scan()) { cb(); return; }
    var done = false, go = function () { if (done) return; done = true; waited = true; cb(); };
    waiters.push(go); setTimeout(go, 1200);          /* सूची न आए तो भी चुप नहीं बैठना: हिंदी कोड के साथ बोलने भेजो। इंतज़ार सिर्फ़ पहली बार। */
  }
  function tell(btn, t) {
    haal(t);
    var box = btn && btn.closest ? btn.closest(".ld-card,.ld-mj,.lipi-sec") : null; if (!box) return;
    var n = box.querySelector(".ld-msg");
    if (!n) { n = D.createElement("p"); n.className = "ld-lag ld-msg"; n.setAttribute("role", "status"); var h = box.querySelector(".ld-host"); if (h && h.parentNode) h.parentNode.insertBefore(n, h); else box.appendChild(n); }
    n.textContent = "⚠️ " + t;
  }
  function speak(pron, btn) {
    if (!pron) return;
    if (!HAS) { tell(btn, MSG_NA); return; }
    whenReady(function () {
      try { SS.cancel(); } catch (e) {}
      if (lastBtn && lastBtn.classList) lastBtn.classList.remove("on");
      if (loaded && !hiVoice) tell(btn, MSG_NOHI);
      var u = new W.SpeechSynthesisUtterance(pron); u.lang = "hi-IN"; if (hiVoice) u.voice = hiVoice; u.rate = 0.8;
      u.onstart = function () { if (btn && btn.classList) { btn.classList.add("on"); lastBtn = btn; } };
      u.onend = function () { if (btn && btn.classList) btn.classList.remove("on"); };
      u.onerror = function (e) { if (btn && btn.classList) btn.classList.remove("on"); var er = e && e.error; if (er && er !== "interrupted" && er !== "canceled") tell(btn, MSG_ERR); };
      setTimeout(function () { try { SS.speak(u); } catch (e) { tell(btn, MSG_ERR); } }, 60);   /* cancel के ठीक बाद speak कुछ फ़ोनों में छूट जाता है */
    });
  }
  W.ldSay = function (btn) { speak(btn.getAttribute("data-pron"), btn); };

  function hostFor(btn) {
    var tile = btn.closest(".ld-w"), n;
    if (tile) { n = tile.parentNode.nextElementSibling; while (n && !(n.className && String(n.className).indexOf("ld-host") >= 0)) n = n.nextElementSibling; if (n) return n; }
    var card = btn.closest(".ld-card,.ld-mj,.lipi-sec");
    return (card && card.querySelector(".ld-host")) || btn.parentNode;
  }
  function withBolo(cb, btn) {
    if (W.ACSBolo) { cb(); return; }
    if (!D.querySelector('script[src*="acs-bolo.js"]')) { var s = D.createElement("script"); s.src = "/assets/acs-bolo.js"; D.head.appendChild(s); }
    var n = 0, iv = setInterval(function () { if (W.ACSBolo || ++n > 60) { clearInterval(iv); if (W.ACSBolo) cb(); else tell(btn, "बोलो-अभ्यास अभी नहीं खुल पाया। इंटरनेट जाँचकर पन्ना दोबारा खोलो।"); } }, 100);
  }
  W.ldBolo = function (btn) {
    var t = btn.getAttribute("data-w") || "", pron = btn.getAttribute("data-pron") || "", host = hostFor(btn);
    withBolo(function () {
      W.ACSBolo.open(btn, { t: t, pr: "देवनागरी उच्चारण: " + pron, asr: "hi-IN", tts: "hi-IN", host: host, forceRec: true,
        onSay: function () { speak(pron, btn); },
        recWhy: "इस भाषा की आवाज़-पहचान किसी फ़ोन में नहीं है, इसलिए मशीन सही या ग़लत नहीं बताएगी।" });
      var sb = host.querySelector(".ab-say"); if (sb) sb.textContent = "🔊 देवनागरी उच्चारण सुनो";
    }, btn);
  };

  D.addEventListener("click", function (e) {
    var b = e.target && e.target.closest ? e.target.closest(".ld-sun,.ld-bol") : null; if (!b) return;
    if (b.className.indexOf("ld-sun") >= 0) W.ldSay(b); else W.ldBolo(b);
  });

  if (!HAS) haal(MSG_NA);
  else {
    scan(); if (loaded && !hiVoice) haal(MSG_NOHI);
    try { if (SS.addEventListener) SS.addEventListener("voiceschanged", onVoices); else SS.onvoiceschanged = onVoices; } catch (e) { try { SS.onvoiceschanged = onVoices; } catch (e2) {} }
  }
})();
