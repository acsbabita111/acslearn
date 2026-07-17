/* ============================================================
   ACS course-lesson.js v1.0 — पाठ की आवाज़-सुविधा (🔊)
   काम-कोर्स-2 · 17-Jul-2026
   ------------------------------------------------------------
   browser की अपनी बोली-मशीन (Web Speech API, hi-IN) से —
   कोई server नहीं, कोई ख़र्च नहीं; Android के Chrome में हिंदी आवाज़ आती है।
   progressive: JS/आवाज़ न हो तो पेज वैसा ही पूरा रहता है।
   ============================================================ */
(function () {
  "use strict";
  if (!("speechSynthesis" in window)) return; /* आवाज़-मशीन ही नहीं — चुपचाप हट जाओ */

  var synth = window.speechSynthesis;
  var session = 0; /* रोको-सुधार: cancel के बाद onend अगला टुकड़ा न चलाए */
  var current = null; /* {btn, queue:[], i} */

  function textOf(el) {
    var clone = el.cloneNode(true);
    /* SVG/चित्र/बटन की लिखावट आवाज़ में नहीं */
    ["svg", "figure", "button", "details", "nav", "script", "style"].forEach(function (t) {
      var xs = clone.querySelectorAll(t);
      for (var i = 0; i < xs.length; i++) xs[i].remove();
    });
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  function stopAll() {
    session++;
    synth.cancel();
    if (current && current.btn) markBtn(current.btn, false);
    document.querySelectorAll(".lsn-speakall").forEach(function (b) {
      b.textContent = "🔊 पूरा पाठ सुनो";
    });
    current = null;
  }

  function markBtn(btn, on) {
    btn.textContent = on ? "⏸ रोको" : "🔊 सुनो";
    btn.classList.toggle("speaking", !!on);
  }

  function speakChunks(chunks, btn, onDone) {
    /* लंबा text टुकड़ों में — कुछ फ़ोन लंबी बोली बीच में काट देते हैं */
    var i = 0, my = session; /* रोको दबते ही session बदलती है — यह कड़ी वहीं मर जाती है */
    function next() {
      if (my !== session) return;
      if (i >= chunks.length) { if (onDone) onDone(); return; }
      var u = new SpeechSynthesisUtterance(chunks[i++]);
      u.lang = "hi-IN"; u.rate = 0.95;
      u.onend = next;
      u.onerror = next;
      synth.speak(u);
    }
    next();
  }

  function chunkify(text) {
    var out = [], s = text;
    while (s.length > 180) {
      var cut = s.lastIndexOf("।", 180);
      if (cut < 60) cut = s.lastIndexOf(" ", 180);
      if (cut < 60) cut = 180;
      out.push(s.slice(0, cut + 1)); s = s.slice(cut + 1);
    }
    if (s.trim()) out.push(s);
    return out;
  }

  /* हर खंड (lsn-sec) पर 🔊 बटन */
  var secs = document.querySelectorAll(".lsn-sec");
  secs.forEach(function (sec) {
    var h2 = sec.querySelector("h2");
    if (!h2) return;
    var t = textOf(sec);
    if (t.length < 40) return;
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "lsn-speak"; btn.textContent = "🔊 सुनो";
    btn.setAttribute("aria-label", "यह खंड सुनो");
    btn.addEventListener("click", function () {
      if (current && current.btn === btn) { stopAll(); return; }
      stopAll();
      current = { btn: btn };
      markBtn(btn, true);
      speakChunks(chunkify(textOf(sec)), btn, function () { markBtn(btn, false); current = null; });
    });
    h2.appendChild(btn);
  });

  /* पूरा पाठ सुनो */
  document.querySelectorAll("[data-speakall]").forEach(function (big) {
    big.addEventListener("click", function () {
      if (current && current.btn === big) { stopAll(); return; }
      stopAll();
      current = { btn: big };
      big.textContent = "⏸ रोको (पूरा पाठ चल रहा है)";
      var all = [];
      secs.forEach(function (sec) {
        var h2 = sec.querySelector("h2");
        var head = h2 ? (h2.childNodes[0] && h2.childNodes[0].textContent || "") : "";
        var t = textOf(sec);
        if (t.length >= 40) all = all.concat(chunkify(head + "। " + t));
      });
      speakChunks(all, big, function () {
        big.textContent = "🔊 पूरा पाठ सुनो"; current = null;
      });
    });
  });

  /* पेज छोड़ते समय आवाज़ बंद */
  window.addEventListener("pagehide", function () { synth.cancel(); });
})();
