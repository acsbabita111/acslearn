/* ============================================================
   /assets/aptitude-test.js — v1.1 (अभिरुचि-टेस्ट इंजन · मुफ़्त-झलक 24 प्रश्न)
   v1.1 · 20-Jul-2026: scroll-सुधार — जवाब दबाने पर पन्ना अपनी जगह रहे;
   सिर्फ़ प्रश्न बदलने पर टेस्ट-डिब्बे के ऊपर आए (पन्ने के ऊपर नहीं)।
   ------------------------------------------------------------
   - स्रोत-data: APT_DATA (प्रश्न) + APT_ART (चित्र) + MG_NAMES (समूह-नाम)।
   - device-local नियम: जवाब व नतीजा सिर्फ़ इसी फ़ोन में (localStorage) —
     server पर कुछ नहीं जाता (DPDP-सुरक्षित, ख़र्च शून्य)।
   - गिनती पूरा गणित — AI नहीं (v3.8 लोहे का नियम)।
   - ES5 ही (पुराने Android-8 फ़ोन पर भी चले)।
   ============================================================ */
(function () {
  "use strict";
  var KEY = "acs_apt_v1";
  var FACES = ["😖", "🙁", "😐", "🙂", "😍"];
  var FACE_TXT = ["बिल्कुल नहीं", "कम", "जानता नहीं", "पसंद", "बहुत पसंद"];

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var D = window.APT_DATA, ART = window.APT_ART, MG = window.MG_NAMES;
  var box = $("apt-box");
  if (!box) return;
  if (!D || !ART || !MG) {
    box.innerHTML = '<div class="apt-note">⚠️ टेस्ट की फ़ाइलें नहीं खुल पाईं। पन्ना दोबारा खोलें या बाद में आएँ।</div>';
    return;
  }

  /* ---- प्रवाह: 10 प्रश्न → कथा → 10 प्रश्न → कथा → 4 प्रश्न ---- */
  var flow = [];
  (function () {
    var qs = D.questions, i;
    for (i = 0; i < qs.length && i < 24; i++) {
      flow.push({ kind: "q", q: qs[i] });
      if (i === 9 && D.stories[0]) flow.push({ kind: "k", k: D.stories[0] });
      if (i === 19 && D.stories[1]) flow.push({ kind: "k", k: D.stories[1] });
    }
  })();

  /* ---- सहेजी हालत ---- */
  function loadState() {
    try { var s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && s.ans) return s; } catch (e) {}
    return { pos: 0, ans: {}, done: false, started: 0 };
  }
  function saveState() { try { localStorage.setItem(KEY, JSON.stringify(ST)); } catch (e) {} }
  var ST = loadState();

  function qCount() { var n = 0, i; for (i = 0; i < flow.length; i++) if (flow[i].kind === "q") n++; return n; }
  function qIndexAt(pos) { var n = 0, i; for (i = 0; i <= pos && i < flow.length; i++) if (flow[i].kind === "q") n++; return n; }
  var TOTAL_Q = qCount();

  function art(id, cls) {
    if (ART[id]) return '<div class="' + (cls || "apt-img") + '">' + ART[id] + "</div>";
    return '<div class="apt-note">🖼️ चित्र नहीं खुला — प्रश्न शब्दों से पूरा है।</div>';
  }

  /* ---- नज़र टेस्ट-डिब्बे पर लाना (पन्ने के ऊपर नहीं) ---- */
  function focusBox() {
    try { box.scrollIntoView(true); } catch (e) { window.scrollTo(0, 0); }
  }

  /* ---- एक क़दम दिखाना (keep=true: जगह न बदले — जवाब-दबाव पर) ---- */
  function render(keep) {
    if (ST.done) { renderResult(); return; }
    if (ST.pos >= flow.length) { finish(); return; }
    var step = flow[ST.pos], html = "";
    var qn = qIndexAt(ST.pos);
    html += '<div class="apt-prog">प्रश्न ' + qn + ' / ' + TOTAL_Q + "</div>";
    html += '<div class="apt-bar"><i style="width:' + Math.round((qn - 1) * 100 / TOTAL_Q) + '%"></i></div>';

    if (step.kind === "k") {
      var k = step.k;
      html += '<div class="apt-katha">' + art(k.img) +
        "<h3>📖 " + esc(k.title) + "</h3><p>" + esc(k.text) + "</p></div>";
      html += navBtns(true);
      box.innerHTML = html; wireNav(true);
      if (!keep) focusBox();
      return;
    }

    var q = step.q, a = ST.ans[q.id];
    if (q.type === "scale") {
      html += art(q.img) + '<div class="apt-q">' + esc(q.text) + "</div>";
      html += '<div class="apt-faces">';
      for (var f = 0; f < 5; f++) {
        html += '<button type="button" class="apt-face' + (a && a.v === f ? " on" : "") + '" data-f="' + f + '">' +
          FACES[f] + "<small>" + FACE_TXT[f] + "</small></button>";
      }
      html += "</div>";
    } else if (q.type === "pick") {
      html += '<div class="apt-q">' + esc(q.text) + "</div>";
      html += '<div class="apt-hint" id="apt-hint">' + pickHint(a) + "</div>";
      html += '<div class="apt-opts">';
      for (var i = 0; i < q.opts.length; i++) {
        var o = q.opts[i], cls = "";
        if (a && a.first === i) cls = " first"; else if (a && a.last === i) cls = " last";
        html += '<button type="button" class="apt-opt' + cls + '" data-i="' + i + '">' +
          (o.img && ART[o.img] ? ART[o.img] : "") + esc(o.label) + pickTag(a, i) + "</button>";
      }
      html += "</div>";
    } else if (q.type === "pair") {
      html += '<div class="apt-q">' + esc(q.text) + "</div>";
      html += '<div class="apt-opts">';
      for (var j = 0; j < q.opts.length; j++) {
        var p = q.opts[j];
        html += '<button type="button" class="apt-opt' + (a && a.v === j ? " on" : "") + '" data-i="' + j + '">' +
          (p.img && ART[p.img] ? ART[p.img] : "") + esc(p.label) + "</button>";
      }
      html += "</div>";
    } else if (q.type === "story") {
      html += art(q.img) + '<div class="apt-q">' + esc(q.text) + "</div>";
      html += '<div class="apt-opts apt-story" style="grid-template-columns:1fr">';
      for (var s = 0; s < q.opts.length; s++) {
        html += '<button type="button" class="apt-opt' + (a && a.v === s ? " on" : "") + '" data-i="' + s + '">' +
          esc(q.opts[s].label) + "</button>";
      }
      html += "</div>";
    }
    html += navBtns(answered(q));
    box.innerHTML = html;
    wireQ(q); wireNav(false);
    if (!keep) focusBox();
  }

  function pickHint(a) {
    if (!a || a.first == null) return "पहले वह दबाओ जो सबसे पहले करना चाहोगे।";
    if (a.last == null) return "अब वह दबाओ जो सबसे कम करना चाहोगे।";
    return "हो गया! बदलना हो तो किसी और पर दबाओ।";
  }
  function pickTag(a, i) {
    if (a && a.first === i) return '<span class="apt-tag">सबसे पहले</span>';
    if (a && a.last === i) return '<span class="apt-tag">सबसे कम</span>';
    return "";
  }
  function answered(q) {
    var a = ST.ans[q.id];
    if (!a) return false;
    if (q.type === "pick") return a.first != null && a.last != null;
    return a.v != null;
  }

  function navBtns(ok) {
    return '<div class="apt-nav">' +
      (ST.pos > 0 ? '<button type="button" class="apt-btn ghost" id="apt-back">← पिछला</button>' : "") +
      '<button type="button" class="apt-btn green" id="apt-next"' + (ok ? "" : " disabled") + ">" +
      (ST.pos >= flow.length - 1 ? "🏁 नतीजा देखें" : "अगला →") + "</button></div>";
  }

  function wireNav() {
    var b = $("apt-back"), n = $("apt-next");
    if (b) b.onclick = function () { ST.pos--; saveState(); render(); };
    if (n) n.onclick = function () {
      if (n.disabled) return;
      ST.pos++;
      if (ST.pos >= flow.length) { finish(); } else { saveState(); render(); }
    };
  }

  function wireQ(q) {
    var i, els;
    if (q.type === "scale") {
      els = box.getElementsByClassName("apt-face");
      for (i = 0; i < els.length; i++) els[i].onclick = function () {
        ST.ans[q.id] = { v: parseInt(this.getAttribute("data-f"), 10) };
        saveState(); render(true);
      };
    } else if (q.type === "pick") {
      els = box.getElementsByClassName("apt-opt");
      for (i = 0; i < els.length; i++) els[i].onclick = function () {
        var idx = parseInt(this.getAttribute("data-i"), 10);
        var a = ST.ans[q.id] || { first: null, last: null };
        if (a.first == null) a.first = idx;
        else if (a.last == null && idx !== a.first) a.last = idx;
        else { a.first = idx; a.last = null; }
        ST.ans[q.id] = a; saveState(); render(true);
      };
    } else {
      els = box.getElementsByClassName("apt-opt");
      for (i = 0; i < els.length; i++) els[i].onclick = function () {
        ST.ans[q.id] = { v: parseInt(this.getAttribute("data-i"), 10) };
        saveState(); render(true);
      };
    }
  }

  /* ---- गिनती (पूरा गणित — AI नहीं) ---- */
  function compute() {
    var sc = {}, unknown = {}, m;
    for (m = 1; m <= 24; m++) sc[m] = 0;
    function add(list, pts) { for (var x = 0; x < list.length; x++) sc[list[x]] += pts; }
    var i, q, a;
    for (i = 0; i < D.questions.length && i < 24; i++) {
      q = D.questions[i]; a = ST.ans[q.id];
      if (!a) continue;
      if (q.type === "scale") {
        add(q.mg, D.scoring.scale.faces[a.v]);
        if (a.v === 2) for (var u = 0; u < q.mg.length; u++) unknown[q.mg[u]] = 1;
      } else if (q.type === "pick") {
        if (a.first != null) add(q.opts[a.first].mg, D.scoring.pick.first);
        if (a.last != null) add(q.opts[a.last].mg, D.scoring.pick.last);
      } else if (q.type === "pair") {
        add(q.opts[a.v].mg, D.scoring.pair.pick);
      } else if (q.type === "story") {
        add(q.opts[a.v].mg, q.opts[a.v].pts || D.scoring.story.defaultPts);
      }
    }
    return { sc: sc, unknown: unknown };
  }

  function finish() {
    ST.done = true; ST.doneAt = new Date().toLocaleDateString("hi-IN");
    saveState(); renderResult();
  }

  function renderResult() {
    var r = compute(), rows = [], m;
    for (m = 1; m <= 24; m++) rows.push({ m: m, s: r.sc[m] });
    rows.sort(function (a, b) { return b.s - a.s; });
    var max = Math.max(rows[0].s, 1);
    var html = '<div class="apt-prog">🏁 आपका नतीजा (' + esc(ST.doneAt || "") + ")</div>";

    html += '<div class="apt-res-top"><h3>⭐ सबसे प्रबल रुचि: ' + MG[rows[0].m].e + " " + esc(MG[rows[0].m].n) + "</h3>";
    html += "<p>आगे के मज़बूत क्षेत्र: ";
    for (m = 1; m <= 3; m++) html += MG[rows[m].m].e + " " + esc(MG[rows[m].m].n) + (m < 3 ? " · " : "");
    html += "</p></div>";

    html += '<div class="apt-card"><h3 style="font-size:20px;margin:0 0 8px">📊 चौबीसों क्षेत्र — घटते क्रम में</h3>';
    for (m = 0; m < rows.length; m++) {
      var w = rows[m].s > 0 ? Math.round(rows[m].s * 100 / max) : 0;
      html += '<div class="apt-row"><span class="nm">' + MG[rows[m].m].e + " " + esc(MG[rows[m].m].n) + '</span>' +
        '<span class="tr"><i style="width:' + w + '%"></i></span><span class="sc">' + rows[m].s + "</span></div>";
    }
    html += "</div>";

    var uk = [], k2;
    for (k2 in r.unknown) uk.push(MG[k2].e + " " + MG[k2].n);
    if (uk.length) {
      html += '<div class="apt-card"><h3 style="font-size:20px;margin:0 0 8px">🔍 अनजान क्षेत्र</h3>' +
        "<p>इनमें आपने 😐 चुना — यानी अभी जानते नहीं। इन्हें पहले खोजना अच्छा रहेगा।</p><p>";
      for (m = 0; m < uk.length; m++) html += '<span class="apt-chip">' + esc(uk[m]) + "</span>";
      html += "</p></div>";
    }

    html += '<div class="apt-note">📝 यह अभिरुचि की झलक है — योग्यता या पास होने का प्रमाण नहीं। यह शुरुआती दिशा है।</div>';
    html += '<div class="apt-note">🎁 असली टेस्ट में और भी प्रश्न होंगे — बैज (Badge) के साथ मुफ़्त। प्रमाण पत्र (certificate-PDF) ₹125 में — मर्ज़ी हो तो लें, या न लें।</div>';
    html += '<div class="apt-note">⏳ बैज व प्रमाण पत्र की सुविधा जल्द जुड़ेगी।</div>';
    html += '<div class="apt-nav"><button type="button" class="apt-btn blue" id="apt-again">🔄 दोबारा टेस्ट दें</button>' +
      '<a class="apt-btn ghost" style="text-align:center;text-decoration:none" href="/udyam/">🌍 950 उद्यम देखें</a></div>';
    box.innerHTML = html;
    $("apt-again").onclick = function () {
      ST = { pos: 0, ans: {}, done: false, started: Date.now() };
      saveState(); render();
    };
    focusBox();
  }

  /* ---- शुरुआत ---- */
  render();
})();
