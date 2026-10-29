/* bolo-wb.js v1.0 · 29-Oct-2026 — बोलो-वर्कबुक + शब्दकोश (सभी 416 भाषाएँ) · ES5 (Android 8)
   Founder-नियम: हर कार्ड पर 🔊 सुनो + 🎙️ बोलो · एक पंक्ति में 2 कार्ड · अकेला बीच में · 3D रंगीन.
   data: उसी भाषा की कोर्स-फ़ाइलें (kkb_*_data.js स्तर-1, kkb2_*_data.js स्तर-2) — वाक्य/शब्द कहीं और दोहराए नहीं. प्रगति सिर्फ़ फ़ोन में. */
(function () {
  "use strict";
  var A = document.getElementById("bw-app"); if (!A) return;
  var MODE = A.getAttribute("data-mode"), TTS = A.getAttribute("data-tts"), SR = A.getAttribute("data-sr"), NAME = A.getAttribute("data-name");
  var KEY = "acs_bw_" + location.pathname;
  function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function load(src, cb) { var s = document.createElement("script"); s.src = src; s.onload = cb; s.onerror = function () { A.innerHTML = '<p class="bw-load">पाठ-फ़ाइल नहीं खुली — इंटरनेट जाँचकर पन्ना दोबारा खोलिए।</p>'; }; document.head.appendChild(s); }
  window.bwSay = function (b) {
    var t = b.getAttribute("data-t");
    try { speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(t); u.lang = TTS; u.rate = 0.85; var v = speechSynthesis.getVoices().filter(function (x) { return x.lang.replace("_", "-").indexOf(TTS.split("-")[0]) === 0; }); if (v.length) u.voice = v[0]; speechSynthesis.speak(u); }
    catch (e) { alert("इस फ़ोन/ब्राउज़र में आवाज़ की सुविधा नहीं है"); }
  };
  window.bwBolo = function (b) {
    if (!window.ACSBolo) { alert("बोलो-अभ्यास अभी लोड नहीं हुआ — पन्ना एक बार दोबारा खोलें।"); return; }
    ACSBolo.open(b, { t: b.getAttribute("data-t"), pr: b.getAttribute("data-p") || "", asr: SR, tts: TTS, host: b.closest ? b.closest(".bw-card") : null });
  };
  function card(t, p, m, n) {
    return '<div class="bw-card"><div class="bw-t">' + esc(t) + '</div><div class="bw-p">' + esc(p) + '</div><div class="bw-m">' + esc(m) + '</div>' +
      '<div class="bw-btns"><button type="button" class="bw-b" onclick="bwSay(this)" data-t="' + esc(t) + '" aria-label="सुनो">🔊 सुनो</button>' +
      '<button type="button" class="bw-b mic" onclick="bwBolo(this)" data-t="' + esc(t) + '" data-p="' + esc(p) + '" aria-label="बोलो">🎙️ बोलो</button></div>' + (n ? '<div class="bw-n">' + esc(n) + '</div>' : '') + '</div>';
  }
  function weeks() {
    var out = [], L1 = window.KKB_DATA, L2 = window.KKB2_DATA;
    [[L1, 1], [L2, 2]].forEach(function (x) { if (!x[0] || !x[0].weeks) return; x[0].weeks.forEach(function (W, i) { var it = []; (W.days || []).forEach(function (d) { (d.items || []).forEach(function (r) { it.push(r); }); }); out.push({ lv: x[1], n: W.n || (i + 1), hi: W.hi || W.title || "", items: it, days: W.days || [] }); }); });
    return out;
  }
  function bolo() {
    var W = weeks(), sel = 0; try { sel = parseInt(localStorage.getItem(KEY) || "0", 10) || 0; } catch (e) {}
    if (sel >= W.length) sel = 0;
    function show(k) {
      sel = k; try { localStorage.setItem(KEY, String(k)); } catch (e) {}
      var w = W[k], h = '<div class="bw-tabs">';
      for (var i = 0; i < W.length; i++) h += '<button type="button" class="bw-tab' + (i === k ? " on" : "") + '" onclick="bwWeek(' + i + ')">स्तर-' + W[i].lv + ' · सप्ताह ' + W[i].n + '</button>';
      h += '</div><h2 class="bw-wh">स्तर-' + w.lv + ' · सप्ताह ' + w.n + (w.hi ? ' — ' + esc(w.hi) : '') + ' <small>(' + w.items.length + ' वाक्य)</small></h2>';
      h += '<p class="bw-how">हर वाक्य: पहले 🔊 सुनो → साथ-साथ ज़ोर से बोलो → फिर 🎙️ दबाकर बोलो और जाँचो।</p><div class="bw-grid">';
      for (var j = 0; j < w.items.length; j++) h += card(w.items[j][0], w.items[j][1], w.items[j][2]);
      h += '</div>';
      if (k + 1 < W.length) h += '<p style="text-align:center"><button type="button" class="bw-next" onclick="bwWeek(' + (k + 1) + ');window.scrollTo(0,0)">अगला सप्ताह →</button></p>';
      A.innerHTML = h;
    }
    window.bwWeek = show; show(sel);
  }
  function shabd() {
    var seen = {}, all = [];
    weeks().forEach(function (w) { w.days.forEach(function (d) { (d.tw || []).forEach(function (t) { var k = String(t[0]).trim(); if (!k || seen[k]) return; seen[k] = 1; all.push([k, t[1], t[2], "स्तर-" + w.lv + " · सप्ताह " + w.n]); }); }); });
    (window.KKB_DATA && KKB_DATA.weeks || []).forEach(function () {});
    A.innerHTML = '<div class="bw-search"><input type="search" id="bw-q" placeholder="शब्द या हिंदी अर्थ खोजो…" aria-label="खोजो"><span id="bw-c"></span></div><div class="bw-grid" id="bw-g"></div>';
    function draw(q) {
      q = (q || "").toLowerCase(); var h = "", n = 0;
      for (var i = 0; i < all.length; i++) { var a = all[i]; if (q && (a[0] + " " + a[1] + " " + a[2]).toLowerCase().indexOf(q) < 0) continue; h += card(a[0], a[1], a[2], a[3]); n++; }
      document.getElementById("bw-g").innerHTML = h || '<p class="bw-load">कोई शब्द नहीं मिला।</p>'; document.getElementById("bw-c").textContent = n + " शब्द";
    }
    document.getElementById("bw-q").oninput = function () { draw(this.value); }; draw("");
  }
  load(A.getAttribute("data-l1"), function () { load(A.getAttribute("data-l2"), function () { if (MODE === "bolo") bolo(); else shabd(); }); });
})();
