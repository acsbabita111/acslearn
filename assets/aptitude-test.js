/* /assets/aptitude-test.js : v2.1 (13-Nov-2026)
   Founder के 13-Nov-2026 के नियम: झलक के 24 प्रश्न अब 48 के नमूना-सेट में से हर बार बेतरतीब चुने जाते हैं,
   और चुनाव ऐसा होता है कि 24 में से कोई सेक्टर न छूटे। login किए हुए व्यक्ति को झलक नहीं दिखती। */
/* ============================================================
   /assets/aptitude-test.js — v2.2 (अभिरुचि-टेस्ट इंजन · मुफ़्त-झलक 24 प्रश्न)
   v2.1 · 09-Nov-2026: H1 strings-table — दिखने वाली हर UI-पंक्ति अब
   /assets/apt_strings.js (hi मास्टर) से S() द्वारा; दूसरी भाषा = overlay
   (window.APT_LANG + /assets/apt_<कोड>.js: APT_STR.<कोड> UI + APT_TR
   प्रश्न/कथा/MG-नाम)। हिंदी-रास्ते का render-व्यवहार byte-हूबहू वही
   (A/B runtime-प्रमाण dev_anuvad_runtime_check.js)। अपवाद: फ़ाइल-न-खुलने
   वाला error-संदेश जान-बूझकर hardcoded (वह ख़ुद फ़ाइल पर टिक नहीं सकता)।
   v2.0 · 08-Nov-2026: app-mode (O*NET-शैली) — टेस्ट पूरे पर्दे पर।
   v1.4 · 22-Jul-2026: बैज-निशान (acs_apt_gate_v1) सक्रिय → झलक छिपे, सिर्फ़
   सूचना-पंक्ति दिखे — बैज वाला सीधे पूरा टेस्ट दे (Jio-नियम v3.7)।
   v1.3 · 20-Jul-2026: ↩ अब सीधे उसी dashboard-घर पर लौटाता है जहाँ से आए
   (आने वाले पन्ने का पता याद रखता है — दोबारा login कभी नहीं)।
   v1.2 · 20-Jul-2026: (1) हर क़दम पर '↩ Dashboard' वापसी-कड़ी; (2) प्रश्न-पाठ
   पहले, चित्र उसके नीचे (पढ़ने का सहज क्रम) — Founder-screenshot से।
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

  /* ---- v2.1 भाषा-परत: hi मास्टर apt_strings.js से; overlay apt_<कोड>.js से ---- */
  var LANG = (typeof window.APT_LANG === "string" && window.APT_LANG) ? window.APT_LANG : "hi";
  var STRH = (window.APT_STR && window.APT_STR.hi) || null;
  var STRL = (window.APT_STR && window.APT_STR[LANG]) || STRH;
  var TR = (window.APT_TR && window.APT_TR.lang === LANG) ? window.APT_TR : null;
  function S(k) {
    if (STRL && STRL[k] != null) return STRL[k];
    if (STRH && STRH[k] != null) return STRH[k];
    return "";
  }
  function qTxt(q)      { var t = TR && TR.q && TR.q[q.id]; return (t && t.text) ? t.text : q.text; }
  function optTxt(q, i) { var t = TR && TR.q && TR.q[q.id]; return (t && t.opts && t.opts[i] != null) ? t.opts[i] : q.opts[i].label; }
  function kTitle(k)    { var t = TR && TR.k && TR.k[k.id]; return (t && t.title) ? t.title : k.title; }
  function kText(k)     { var t = TR && TR.k && TR.k[k.id]; return (t && t.text) ? t.text : k.text; }
  function mgN(m)       { return (TR && TR.mg && TR.mg[m]) ? TR.mg[m] : MG[m].n; }

  /* बैज वालों को झलक नहीं — सीधे पूरा टेस्ट (Jio-नियम v3.7 · 22-Jul-2026) */

  /* ---- वापसी-पता: जिस dashboard-घर से आए, ठीक वहीं लौटें (re-login नहीं) ---- */
  var BACK = "/dashboard/";
  (function () {
    var b = null;
    try {
      var m = /[?&]back=([^&]+)/.exec(location.search);
      if (m) { var q = decodeURIComponent(m[1]); if (q.indexOf("/dashboard/") === 0) b = q; }
    } catch (e) {}
    if (!b) {
      try {
        var r = document.referrer;
        if (r) {
          var a = document.createElement("a"); a.href = r;
          if (a.hostname === location.hostname && a.pathname.indexOf("/dashboard/") === 0 && a.pathname.length > 11) b = a.pathname;
        }
      } catch (e) {}
    }
    try {
      if (b) sessionStorage.setItem("acs_apt_back", b);
      else b = sessionStorage.getItem("acs_apt_back");
    } catch (e) {}
    if (b) BACK = b;
  })();
  var FACES = ["😖", "🙁", "😐", "🙂", "😍"];
  var FACE_TXT = S("faces") || [];

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }

  var D = window.APT_DATA, ART = window.APT_ART, MG = window.MG_NAMES;
  var box = $("apt-box");
  if (!box) return;
  if (!D || !ART || !MG || !STRH) {
    box.innerHTML = '<div class="apt-note">⚠️ टेस्ट की फ़ाइलें नहीं खुल पाईं। पन्ना दोबारा खोलें या बाद में आएँ।</div>';
    return;
  }

  /* ---- प्रवाह: 10 प्रश्न → कथा → 10 प्रश्न → कथा → 4 प्रश्न ---- */
  /* ---- बहाव: चुने हुए 24 प्रश्न + प्रश्न 10 और 20 के बाद कथा-विराम ---- */
  var flow = [], TOTAL_Q = 0;
  function mgOf(q) {
    var m = {};
    (q.mg || []).forEach(function (x) { m[x] = 1; });
    (q.opts || []).forEach(function (o) { (o.mg || []).forEach(function (x) { m[x] = 1; }); });
    return Object.keys(m).map(Number);
  }
  function mix(a) { var i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(Math.random() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  /* 48 में से 24: पहले वे प्रश्न जो बचे हुए सेक्टरों को सबसे ज़्यादा ढकें, फिर बेतरतीब भराई */
  function pick24() {
    var left = mix(D.questions.slice()), need = {}, out = [], m, i;
    for (m = 1; m <= 24; m++) need[m] = 1;
    while (out.length < 24 && left.length) {
      var best = 0, bi = -1;
      for (i = 0; i < left.length; i++) {
        var c = mgOf(left[i]).filter(function (x) { return need[x]; }).length;
        if (c > best) { best = c; bi = i; }
      }
      if (bi < 0) break;
      var q = left.splice(bi, 1)[0]; out.push(q);
      mgOf(q).forEach(function (x) { delete need[x]; });
    }
    while (out.length < 24 && left.length) out.push(left.shift());
    return mix(out).map(function (q) { return q.id; });
  }
  function buildFlow(ids) {
    var map = {}, i, n = 0;
    D.questions.forEach(function (q) { map[q.id] = q; });
    flow = [];
    for (i = 0; i < ids.length; i++) {
      if (!map[ids[i]]) continue;
      flow.push({ kind: "q", q: map[ids[i]] }); n++;
      if (n === 10 && D.stories[0]) flow.push({ kind: "k", k: D.stories[0] });
      if (n === 20 && D.stories[1]) flow.push({ kind: "k", k: D.stories[1] });
    }
    TOTAL_Q = n;
  }
  function idsOK(ids) {
    var map = {}; D.questions.forEach(function (q) { map[q.id] = 1; });
    return !!(ids && ids.length === 24 && ids.every(function (id) { return map[id]; }));
  }

  /* ---- स्थिति: सिर्फ़ इसी फ़ोन में ---- */
  function loadState() {
    try { var s = JSON.parse(localStorage.getItem(KEY) || "null"); if (s && s.ans) return s; } catch (e) {}
    return { pos: 0, ans: {}, done: false, started: 0 };
  }
  function saveState() { try { localStorage.setItem(KEY, JSON.stringify(ST)); } catch (e) {} }
  var ST = loadState();

  function qIndexAt(pos) { var n = 0, i; for (i = 0; i <= pos && i < flow.length; i++) if (flow[i].kind === "q") n++; return n; }
  /* पुरानी अधूरी झलक (पहले 24 वाली) वहीं से चलती है; नई झलक के लिए नया चुनाव */
  if (!idsOK(ST.ids)) {
    var _old = (ST.pos > 0 || ST.done || (ST.ans && Object.keys(ST.ans).length > 0));
    ST.ids = _old ? D.questions.slice(0, 24).map(function (q) { return q.id; }) : pick24();
    saveState();
  }
  buildFlow(ST.ids);

  function art(id, cls) {
    if (ART[id]) return '<div class="' + (cls || "apt-img") + '">' + ART[id] + "</div>";
    return '<div class="apt-note">' + S("imgFail") + '</div>';
  }

  /* ---- v2.0 app-mode (O*NET-शैली): टेस्ट पूरे पर्दे पर ---- */
  function appOn() { try { document.body.classList.add("apt-app"); box.classList.add("apt-live"); } catch (e) {} }
  function appOff() {
    try {
      box.classList.remove("apt-live");
      if (!document.querySelector(".apt-live")) document.body.classList.remove("apt-app");
    } catch (e) {}
  }
  /* ---- द्वार-कार्ड: टेस्ट बटन दबाने पर ही पर्दा खुले ---- */
  function renderGate() {
    appOff();
    var started = (ST.pos > 0 || (ST.ans && Object.keys(ST.ans).length > 0));
    box.innerHTML = '<div class="apt-gate">' +
      '<p class="apt-q">' + S("gateTitle") + '</p>' +
      '<p>' + S("gateL1") + '</p>' +
      '<p>' + S("gateL2") + '</p>' +
      '<div class="apt-nav"><button class="apt-btn green" id="apt-open">' +
      (started ? S("resumePre") + qIndexAt(ST.pos) + S("resumeFrom") : S("btnStart")) +
      "</button></div></div>";
    var b = $("apt-open");
    if (b) b.onclick = function () { ST.started = Date.now(); saveState(); appOn(); render(); };
  }

  /* ---- नज़र टेस्ट-डिब्बे पर लाना (पन्ने के ऊपर नहीं) ---- */
  function focusBox() {
    if (document.body && document.body.classList && document.body.classList.contains("apt-app")) { box.scrollTop = 0; return; }
    try { box.scrollIntoView(true); } catch (e) { window.scrollTo(0, 0); }
  }

  /* ---- एक क़दम दिखाना (keep=true: जगह न बदले — जवाब-दबाव पर) ---- */
  function render(keep) {
    if (ST.done) { renderResult(); return; }
    if (ST.pos >= flow.length) { finish(); return; }
    appOn();
    var step = flow[ST.pos], html = "";
    var qn = qIndexAt(ST.pos);
    html += '<div class="apt-top"><span class="apt-prog">' + S("progQ") + qn + ' / ' + TOTAL_Q + '</span>' +
      '<span><a class="apt-back-dash" href="' + BACK + '">↩ Dashboard</a> ' +
      '<button class="apt-x" id="apt-close" type="button">' + S("btnClose") + '</button></span></div>';
    html += '<div class="apt-bar"><i style="width:' + Math.round((qn - 1) * 100 / TOTAL_Q) + '%"></i></div>';

    if (step.kind === "k") {
      var k = step.k;
      html += '<div class="apt-katha">' + art(k.img) +
        "<h3>📖 " + esc(kTitle(k)) + "</h3><p>" + esc(kText(k)) + "</p></div>";
      html += navBtns(true);
      box.innerHTML = html; wireNav(true);
      var xk = $("apt-close");
      if (xk) xk.onclick = function () { appOff(); renderGate(); };
      if (!keep) focusBox();
      return;
    }

    var q = step.q, a = ST.ans[q.id];
    if (q.type === "scale") {
      html += '<div class="apt-q apt-qt">' + esc(qTxt(q)) + "</div>" + art(q.img);
      /* (28-Jul, Founder — विकल्प 2+4): तीन बटन; index 0/2/4 रखने से
         गिनती-नक़्शा (−5/0/+5) व 😐=0 की जाँच बिना बदले सही रहती है। */
      var F3 = [ { f: 0, e: "👎", t: S("fNo") }, { f: 2, e: "😐", t: S("fDk") }, { f: 4, e: "👍", t: S("fYes") } ];
      html += '<div class="apt-faces">';
      for (var f = 0; f < 3; f++) {
        html += '<button type="button" class="apt-face' + (a && a.v === F3[f].f ? " on" : "") + '" data-f="' + F3[f].f + '" style="min-width:96px">' +
          F3[f].e + '<small style="display:block;font-size:16px;font-weight:700">' + F3[f].t + "</small></button>";
      }
      html += "</div>";
    } else if (q.type === "pick") {
      html += '<div class="apt-q apt-qt">' + esc(qTxt(q)) + "</div>";
      html += '<div class="apt-hint" id="apt-hint">' + pickHint(a) + "</div>";
      html += '<div class="apt-opts">';
      for (var i = 0; i < q.opts.length; i++) {
        var o = q.opts[i], cls = "";
        if (a && a.first === i) cls = " first"; else if (a && a.last === i) cls = " last";
        html += '<button type="button" class="apt-opt' + cls + '" data-i="' + i + '">' +
          (o.img && ART[o.img] ? ART[o.img] : "") + esc(optTxt(q, i)) + pickTag(a, i) + "</button>";
      }
      html += "</div>";
    } else if (q.type === "pair") {
      html += '<div class="apt-q apt-qt">' + esc(qTxt(q)) + "</div>";
      html += '<div class="apt-opts">';
      for (var j = 0; j < q.opts.length; j++) {
        var p = q.opts[j];
        html += '<button type="button" class="apt-opt' + (a && a.v === j ? " on" : "") + '" data-i="' + j + '">' +
          (p.img && ART[p.img] ? ART[p.img] : "") + esc(optTxt(q, j)) + "</button>";
      }
      html += "</div>";
    } else if (q.type === "story") {
      html += '<div class="apt-q apt-qt">' + esc(qTxt(q)) + "</div>" + art(q.img);
      html += '<div class="apt-opts apt-story" style="grid-template-columns:1fr">';
      for (var s = 0; s < q.opts.length; s++) {
        html += '<button type="button" class="apt-opt' + (a && a.v === s ? " on" : "") + '" data-i="' + s + '">' +
          esc(optTxt(q, s)) + "</button>";
      }
      html += "</div>";
    }
    html += navBtns(answered(q));
    box.innerHTML = html;
    wireQ(q); wireNav(false);
    var xc = $("apt-close");
    if (xc) xc.onclick = function () { appOff(); renderGate(); };
    if (!keep) focusBox();
  }

  function pickHint(a) {
    if (!a || a.first == null) return S("hint1");
    if (a.last == null) return S("hint2");
    return S("hint3");
  }
  function pickTag(a, i) {
    if (a && a.first === i) return '<span class="apt-tag">' + S("tagFirst") + '</span>';
    if (a && a.last === i) return '<span class="apt-tag">' + S("tagLast") + '</span>';
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
      (ST.pos > 0 ? '<button type="button" class="apt-btn ghost" id="apt-back">' + S("btnBack") + '</button>' : "") +
      '<button type="button" class="apt-btn green" id="apt-next"' + (ok ? "" : " disabled") + ">" +
      (ST.pos >= flow.length - 1 ? S("btnFinish") : S("btnNext")) + "</button></div>";
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
    var sc = {}, unknown = {}, m, byId = {};
    for (m = 1; m <= 24; m++) sc[m] = 0;
    D.questions.forEach(function (x) { byId[x.id] = x; });
    function add(list, pts) { for (var x = 0; x < list.length; x++) sc[list[x]] += pts; }
    /* v2.2: अंक ठीक उन्हीं 24 प्रश्नों से जुड़ते हैं जो इस बार चुने गए (ST.ids), 48 में वे कहीं भी हों।
       पहले यहाँ "पहले 24 प्रश्न" गिने जाते थे, जिससे 25 से 48 तक के प्रश्नों के जवाब नतीजे में नहीं आते थे। */
    var ids = idsOK(ST.ids) ? ST.ids : D.questions.slice(0, 24).map(function (x) { return x.id; });
    var i, q, a;
    for (i = 0; i < ids.length; i++) {
      q = byId[ids[i]]; if (!q) continue;
      a = ST.ans[q.id];
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
    appOff();
    ST.done = true; ST.doneAt = new Date().toLocaleDateString(S("dateLocale") || "hi-IN");
    saveState(); renderResult();
  }

  function renderResult() {
    appOff();
    var r = compute(), rows = [], m;
    for (m = 1; m <= 24; m++) rows.push({ m: m, s: r.sc[m] });
    rows.sort(function (a, b) { return b.s - a.s; });
    var max = Math.max(rows[0].s, 1);
    var html = '<div class="apt-top"><span class="apt-prog">' + S("resHead") + esc(ST.doneAt || "") + ')</span>' +
      '<a class="apt-back-dash" href="' + BACK + '">↩ Dashboard</a></div>';

    html += '<div class="apt-res-top"><h3>' + S("resStrong") + MG[rows[0].m].e + " " + esc(mgN(rows[0].m)) + "</h3>";
    html += "<p>" + S("resNext");
    for (m = 1; m <= 3; m++) html += MG[rows[m].m].e + " " + esc(mgN(rows[m].m)) + (m < 3 ? " · " : "");
    html += "</p></div>";

    html += '<div class="apt-card"><h3 style="font-size:20px;margin:0 0 8px">' + S("res24") + '</h3>';
    for (m = 0; m < rows.length; m++) {
      var w = rows[m].s > 0 ? Math.round(rows[m].s * 100 / max) : 0;
      html += '<div class="apt-row"><span class="nm">' + MG[rows[m].m].e + " " + esc(mgN(rows[m].m)) + '</span>' +
        '<span class="tr"><i style="width:' + w + '%"></i></span><span class="sc">' + rows[m].s + "</span></div>";
    }
    html += "</div>";

    var uk = [], k2;
    for (k2 in r.unknown) uk.push(MG[k2].e + " " + mgN(k2));
    if (uk.length) {
      html += '<div class="apt-card"><h3 style="font-size:20px;margin:0 0 8px">' + S("unkH") + '</h3>' +
        "<p>" + S("unkP") + "</p><p>";
      for (m = 0; m < uk.length; m++) html += '<span class="apt-chip">' + esc(uk[m]) + "</span>";
      html += "</p></div>";
    }

    html += '<div class="apt-note">' + S("note1") + '</div>';
    html += '<div class="apt-note">' + S("note2") + '</div>';
    html += '<div class="apt-note">' + S("note3") + '</div>';
    html += '<div class="apt-nav"><button type="button" class="apt-btn blue" id="apt-again">' + S("btnAgain") + '</button>' +
      '<a class="apt-btn ghost" style="text-align:center;text-decoration:none" href="/udyam/">' + S("btnUdyam") + '</a></div>';
    box.innerHTML = html;
    $("apt-again").onclick = function () {
      ST = { pos: 0, ans: {}, done: false, started: Date.now(), ids: pick24() };
      buildFlow(ST.ids);
      saveState(); render();
    };
    focusBox();
  }

  /* ---- शुरुआत: नतीजा बना हो तो वही; वरना द्वार-कार्ड (v2.0) ---- */
  if (ST.done) render(); else renderGate();

  /* ---- login किए हुए व्यक्ति को झलक नहीं दिखती (apt-pay.js login की हालत बताता है) ---- */
  function showPreview(on) {
    try {
      var ids = ["apt-jhalak-sec", "apt-dummy-notice"], i, el;
      for (i = 0; i < ids.length; i++) { el = $(ids[i]); if (el && el.style) el.style.display = on ? "" : "none"; }
      if (box.style) box.style.display = on ? "" : "none";
      if (!on) appOff();
      var a = document.querySelectorAll ? document.querySelectorAll('a[href="#apt-start"]') : [];
      for (i = 0; i < a.length; i++) a[i].style.display = on ? "" : "none";
    } catch (e) {}
  }
  window.ACS_APT_PREVIEW = { hide: function () { showPreview(false); }, show: function () { if (!window.ACS_APT_FULL_ON) showPreview(true); } };
  try { if (localStorage.getItem("acs_apt_li") === "1") showPreview(false); } catch (e) {}
})();
