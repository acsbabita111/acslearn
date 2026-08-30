/* ============================================================
   /assets/kkb2.js — v1.0 (30-Aug-2026) · KKB स्तर-2 (A2) कोर्स-इंजन
   data: window.KKB2_DATA (v2.0-FINAL — 13 सप्ताह · 1,650 वाक्य · A/B/C · listen/dialog)
   ऑडिट-नियम जन्म से: (1) audio-अनिवार्य — हर वाक्य पर "बोला ✔" तभी, जब 🔊 सुना हो;
   (2) हर दिन (20-30 वाक्य) के अंत में 🎧 सुनो-जवाब जाँच; (3) हर सप्ताह 🗣️ mini-संवाद;
   (4) ⭐ ज़रूर-बोलो (A-वाक्य) अलग तेज़-अभ्यास; (5) दिन-7 फ़ोन-टेस्ट (WhatsApp-रिपोर्ट)।
   device-local: प्रगति सिर्फ़ फ़ोन में (localStorage) — server पर कुछ नहीं (DPDP)।
   माइक-जाँच इस v1.0 में नहीं — ईमानदार पंक्ति UI में; अगले दौर में kkb.js-तर्ज़ SR।
   ES5 (Android-8 Chrome)। सजावट: /assets/kkb2.css
   ============================================================ */
(function () {
  "use strict";
  var DATA = window.KKB2_DATA;
  var ROOT = document.getElementById("kkb2-app");
  if (!DATA || !ROOT) return;
  var TRAINER_WA = "919431210092";
  var TOTAL_DAYS = 0, TOTAL_ITEMS = 0, A_TOTAL = 0;
  var i, j;
  for (i = 0; i < DATA.weeks.length; i++) {
    TOTAL_DAYS += DATA.weeks[i].days.length;
    for (j = 0; j < DATA.weeks[i].days.length; j++) {
      TOTAL_ITEMS += DATA.weeks[i].days[j].items.length;
    }
  }
  var STORE = "acs_kkb2_en_v1";
  var P = {};
  try { P = JSON.parse(localStorage.getItem(STORE) || "{}"); } catch (e) { P = {}; }
  if (!P.day) P.day = {}; if (!P.lis) P.lis = {}; if (!P.dlg) P.dlg = {}; if (!P.tst) P.tst = {};
  function save() { try { localStorage.setItem(STORE, JSON.stringify(P)); } catch (e) { } }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ---- आवाज़ (speechSynthesis en-IN) ---- */
  var voice = null;
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    var vs = speechSynthesis.getVoices();
    voice = vs.filter(function (v) { return v.lang === "en-IN" || v.lang === "en_IN"; })[0] ||
      vs.filter(function (v) { return /^en/.test(v.lang); })[0] || null;
  }
  if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function say(text, slow) {
    if (!("speechSynthesis" in window)) { alert("इस फ़ोन में आवाज़ नहीं चल रही। Chrome में खोलें।"); return false; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(String(text).replace(/^\((सुनो|बोलो)[^)]*\)\s*/, ""));
    u.lang = "en-IN"; if (voice) u.voice = voice; u.rate = slow ? 0.7 : 0.95;
    speechSynthesis.speak(u); return true;
  }

  /* ---- id व गिनती ---- */
  function baseOf(wi, di) { /* week/day की पहली id (0-आधार offsets) */
    var n = 500, a, b;
    for (a = 0; a < wi; a++) for (b = 0; b < DATA.weeks[a].days.length; b++) n += DATA.weeks[a].days[b].items.length;
    for (b = 0; b < di; b++) n += DATA.weeks[wi].days[b].items.length;
    return n;
  }
  function gsu(n) { return "ACS-GSU-" + ("000000" + n).slice(-6); }
  function doneDays() { var k, c = 0; for (k in P.day) if (P.day[k]) c++; return c; }

  /* ---- heard-flags (audio-अनिवार्य; session-स्मृति) ---- */
  var heard = {};
  window.kkb2Hear = function (key, txt, slow) { if (say(txt, slow)) { heard[key] = 1; var b = document.getElementById("sp-" + key); if (b) b.disabled = false; } };
  window.kkb2Spoke = function (key) {
    if (!heard[key]) { alert("पहले 🔊 दबाकर वाक्य सुनिए — सुनना ज़रूरी है।"); return; }
    var el = document.getElementById("ok-" + key); if (el) el.innerHTML = '<span class="kkb2-ok">बोला ✔</span>';
  };

  /* ---- दृश्य ---- */
  function crumb(h) { return '<p class="kkb2-crumb">' + h + '</p>'; }
  function view(html) { ROOT.innerHTML = '<div class="kkb2-app">' + html + '</div>'; window.scrollTo(0, ROOT.offsetTop - 10); }

  function home() {
    var pct = Math.round(doneDays() * 100 / TOTAL_DAYS);
    var h = '<div class="kkb2-card"><h2>' + esc(DATA.module) + '</h2>' +
      '<p>' + esc(DATA.level) + '</p>' +
      '<p>' + TOTAL_ITEMS + ' वाक्य · 13 सप्ताह · रोज़ 10-30 वाक्य · हर वाक्य पर आवाज़ 🔊</p>' +
      '<div class="kkb2-prog"><i style="width:' + pct + '%"></i></div>' +
      '<p class="kkb2-muted">आपकी प्रगति: ' + doneDays() + ' / ' + TOTAL_DAYS + ' दिन (' + pct + ' प्रतिशत)</p>' +
      '<div class="kkb2-bar">नियम: पहले सुनो 🔊, फिर बोलो। हर दिन के अंत में 🎧 सुनो-जवाब जाँच।</div>' +
      '<button class="kkb2-btn gold" onclick="kkb2Go(\'must\')">⭐ ज़रूर-बोलो अभ्यास (' + A_TOTAL + ' वाक्य)</button>' +
      '<p class="kkb2-muted">माइक से बोल-जाँच अगले संस्करण में जुड़ेगी — अभी दोस्त/परिवार के सामने बोलकर अभ्यास कीजिए।</p></div>';
    for (var w = 0; w < DATA.weeks.length; w++) {
      var W = DATA.weeks[w], dn = 0, d2;
      for (d2 = 0; d2 < W.days.length; d2++) if (P.day[(w + 1) + "-" + (d2 + 1)]) dn++;
      var full = (dn === W.days.length);
      h += '<button class="kkb2-week' + (full ? ' done' : '') + '" onclick="kkb2Go(\'w\',' + w + ')">सप्ताह-' + W.n + ' — ' + esc(W.hi) +
        '<small>' + dn + '/' + W.days.length + ' दिन पूरे' + (full ? ' ✅' : '') + ' · ' + W.pace + ' वाक्य/दिन</small></button>';
    }
    h += '<div class="kkb2-card"><p class="kkb2-muted">प्रगति सिर्फ़ इसी फ़ोन में रहती है। <button class="kkb2-btn ghost" onclick="kkb2Reset()">प्रगति मिटाएँ</button></p></div>';
    view(h);
  }
  window.kkb2Reset = function () { if (confirm("सारी प्रगति मिटा दें?")) { P = { day: {}, lis: {}, dlg: {}, tst: {} }; save(); home(); } };

  function week(w) {
    var W = DATA.weeks[w];
    var h = crumb('<a onclick="kkb2Go(\'home\')" href="javascript:void(0)">← सब सप्ताह</a>') +
      '<div class="kkb2-card"><h2>सप्ताह-' + W.n + ' — ' + esc(W.hi) + '</h2><p class="kkb2-muted">' + esc(W.title) + '</p></div>';
    for (var d = 0; d < W.days.length; d++) {
      var done = P.day[(w + 1) + "-" + (d + 1)];
      h += '<button class="kkb2-week' + (done ? ' done' : '') + '" onclick="kkb2Go(\'d\',' + w + ',' + d + ')">दिन-' + (d + 1) + ' — ' + esc(W.days[d].title) +
        '<small>' + W.days[d].items.length + ' वाक्य + 🎧 सुनो-जवाब' + (done ? ' · पूरा ✅' : '') + '</small></button>';
    }
    h += '<button class="kkb2-week' + (P.dlg[w + 1] ? ' done' : '') + '" onclick="kkb2Go(\'dlg\',' + w + ')">🗣️ इस सप्ताह का संवाद (दोस्त के साथ)' + (P.dlg[w + 1] ? '<small>पूरा ✅</small>' : '') + '</button>';
    h += '<button class="kkb2-week' + (P.tst[w + 1] ? ' done' : '') + '" onclick="kkb2Go(\'t\',' + w + ')">📞 दिन-7 — साप्ताहिक टेस्ट' + (P.tst[w + 1] ? '<small>भेजा ✅</small>' : '') + '</button>';
    view(h);
  }

  function day(w, d) {
    var W = DATA.weeks[w], D = W.days[d], base = baseOf(w, d);
    var h = crumb('<a onclick="kkb2Go(\'w\',' + w + ')" href="javascript:void(0)">← सप्ताह-' + W.n + '</a>') +
      '<div class="kkb2-card"><h2>दिन-' + (d + 1) + ' — ' + esc(D.title) + '</h2>' +
      '<div class="kkb2-tw"><b>📦 आज के लक्ष्य-शब्द:</b><br>';
    for (var t = 0; t < D.tw.length; t++) {
      var tw = D.tw[t];
      h += '<span>' + esc(tw[0]) + ' (' + esc(tw[1]) + ') = ' + esc(tw[2]) + '</span>';
    }
    h += '</div><div class="kkb2-bar">पहले 🔊 सुनो → साथ-साथ बोलो → फिर "बोला ✔" दबाओ।</div></div>';
    for (var k = 0; k < D.items.length; k++) {
      var it = D.items[k], key = w + "_" + d + "_" + k, id = gsu(base + k + 1);
      h += '<div class="kkb2-item">' +
        '<span class="kkb2-chip ' + it[4] + '">' + (it[4] === 'A' ? '⭐ ज़रूर' : it[4] === 'B' ? 'चाहिए' : 'जानो') + '</span>' +
        (it[3] === 'L' ? '<span class="kkb2-chip L">👂 सुनो-समझो</span>' : '') +
        '<p class="kkb2-en">' + esc(it[0]) + '</p>' +
        '<p class="kkb2-dev">' + esc(it[1]) + '</p>' +
        '<p class="kkb2-hi">' + esc(it[2]) + '</p>' +
        '<div class="kkb2-row">' +
        '<button class="kkb2-btn" onclick="kkb2Hear(\'' + key + '\',this.getAttribute(\'data-t\'),false)" data-t="' + esc(it[0]) + '">🔊 सुनो</button>' +
        '<button class="kkb2-btn ghost" onclick="kkb2Hear(\'' + key + '\',this.getAttribute(\'data-t\'),true)" data-t="' + esc(it[0]) + '">🐢 धीरे</button>' +
        '<button class="kkb2-btn green" id="sp-' + key + '" disabled onclick="kkb2Spoke(\'' + key + '\')">मैंने बोला</button>' +
        '<span id="ok-' + key + '"></span></div>' +
        '<p class="kkb2-muted">' + id + '</p></div>';
    }
    h += '<div class="kkb2-card"><h3>अब दिन की 🎧 सुनो-जवाब जाँच</h3><p>बिना पढ़े जवाब बोलना है।</p>' +
      '<button class="kkb2-btn gold" onclick="kkb2Go(\'lis\',' + w + ',' + d + ')">🎧 जाँच शुरू करें</button></div>';
    view(h);
  }

  function listen(w, d) {
    var W = DATA.weeks[w];
    var h = crumb('<a onclick="kkb2Go(\'d\',' + w + ',' + d + ')" href="javascript:void(0)">← दिन-' + (d + 1) + '</a>') +
      '<div class="kkb2-card"><h2>🎧 सुनो-जवाब जाँच</h2><p>🔊 दबाओ — सवाल <b>सिर्फ़ कान से</b> सुनो (पढ़ो मत) → ज़ोर से जवाब बोलो → फिर "जवाब देखें" से मिलाओ।</p></div>';
    for (var p = 0; p < W.listen.length; p++) {
      var q = W.listen[p][0], a = W.listen[p][1], kk = 'lis' + w + '_' + d + '_' + p;
      h += '<div class="kkb2-item"><p class="kkb2-hi">सवाल-' + (p + 1) + '</p>' +
        '<div class="kkb2-row"><button class="kkb2-btn" onclick="kkb2Hear(\'' + kk + '\',this.getAttribute(\'data-t\'),false)" data-t="' + esc(q) + '">🔊 सवाल सुनो</button>' +
        '<button class="kkb2-btn ghost" id="sp-' + kk + '" disabled onclick="kkb2Show(\'' + kk + '\')">जवाब देखें</button></div>' +
        '<div id="ans-' + kk + '" style="display:none"><p class="kkb2-en">' + esc(a.replace(/^\(बोलो\)\s*/, '')) + '</p>' +
        '<button class="kkb2-btn green" onclick="kkb2Hear(\'' + kk + 'a\',this.getAttribute(\'data-t\'),false)" data-t="' + esc(a) + '">🔊 जवाब सुनो</button></div></div>';
    }
    h += '<div class="kkb2-card"><h3>🎯 आज का बोलने-अभ्यास</h3><p>' + esc(W.days[d].drill.hi) + '</p>';
    var rows = W.days[d].drill.rows;
    for (var r = 0; r < rows.length; r++) {
      h += '<p class="kkb2-dline">';
      for (var c = 0; c < rows[r].length; c++) h += (c ? ' → ' : '') + '<b>' + esc(rows[r][c]) + '</b>';
      h += '</p>';
    }
    h += '<button class="kkb2-btn green" onclick="kkb2Done(' + w + ',' + d + ')">दिन पूरा हुआ ✅</button></div>';
    view(h);
  }
  window.kkb2Show = function (kk) { var el = document.getElementById('ans-' + kk); if (el) el.style.display = 'block'; };
  window.kkb2Done = function (w, d) { P.day[(w + 1) + "-" + (d + 1)] = 1; save(); week(w); };

  function dialog(w) {
    var W = DATA.weeks[w];
    var h = crumb('<a onclick="kkb2Go(\'w\',' + w + ')" href="javascript:void(0)">← सप्ताह-' + W.n + '</a>') +
      '<div class="kkb2-card"><h2>🗣️ सप्ताह-' + W.n + ' का संवाद</h2><p>दोस्त/परिवार के साथ भूमिका बाँटकर पूरा संवाद बोलो। हर पंक्ति 🔊 से सुन सकते हो।</p>';
    for (var p = 0; p < W.dialog.length; p++) {
      h += '<p class="kkb2-dline"><b>' + esc(W.dialog[p][0]) + ':</b> ' + esc(W.dialog[p][1]) +
        ' <button class="kkb2-btn ghost" style="padding:6px 10px;font-size:17px" onclick="say2(this.getAttribute(\'data-t\'))" data-t="' + esc(W.dialog[p][1]) + '">🔊</button></p>';
    }
    h += '<button class="kkb2-btn green" onclick="kkb2DlgDone(' + w + ')">संवाद बोल लिया ✅</button></div>';
    view(h);
  }
  window.say2 = function (t) { say(t, false); };
  window.kkb2DlgDone = function (w) { P.dlg[w + 1] = 1; save(); week(w); };

  function test(w) {
    var W = DATA.weeks[w], T = W.test;
    var h = crumb('<a onclick="kkb2Go(\'w\',' + w + ')" href="javascript:void(0)">← सप्ताह-' + W.n + '</a>') +
      '<div class="kkb2-card"><h2>📞 दिन-7 — ' + esc(T.target) + '</h2><p>' + esc(T.goal) + '</p></div><div class="kkb2-card"><h3>सहारा-पंक्तियाँ:</h3>';
    for (var p = 0; p < T.lines.length; p++) {
      h += '<div class="kkb2-item"><p class="kkb2-en">' + esc(T.lines[p][0]) + '</p><p class="kkb2-dev">' + esc(T.lines[p][1]) + '</p>' +
        '<button class="kkb2-btn" onclick="say2(this.getAttribute(\'data-t\'))" data-t="' + esc(T.lines[p][0]) + '">🔊 सुनो</button></div>';
    }
    var msg = encodeURIComponent('ACS A2 English — सप्ताह-' + W.n + ' का टेस्ट पूरा किया। (' + T.target + ')');
    h += '<a class="kkb2-btn gold" href="https://wa.me/' + TRAINER_WA + '?text=' + msg + '" onclick="kkb2TstDone(' + w + ')">✅ टेस्ट पूरा — WhatsApp पर बताएँ</a></div>';
    view(h);
  }
  window.kkb2TstDone = function (w) { P.tst[w + 1] = 1; save(); };

  function must() {
    var h = crumb('<a onclick="kkb2Go(\'home\')" href="javascript:void(0)">← कोर्स-घर</a>') +
      '<div class="kkb2-card"><h2>⭐ ज़रूर-बोलो अभ्यास</h2><p>ये ' + A_TOTAL + ' वाक्य सबसे पहले ज़ुबान पर चढ़ाओ — यही रोज़ की जान हैं। 🔊 सुनो, साथ बोलो।</p></div>';
    var n = 0;
    for (var w2 = 0; w2 < DATA.weeks.length; w2++) {
      var head = 0;
      for (var d2 = 0; d2 < DATA.weeks[w2].days.length; d2++) {
        var IT = DATA.weeks[w2].days[d2].items;
        for (var k2 = 0; k2 < IT.length; k2++) if (IT[k2][4] === 'A') {
          if (!head) { h += '<div class="kkb2-card"><h3>सप्ताह-' + DATA.weeks[w2].n + ' — ' + esc(DATA.weeks[w2].hi) + '</h3></div>'; head = 1; }
          n++;
          h += '<div class="kkb2-item"><p class="kkb2-en">' + esc(IT[k2][0]) + '</p><p class="kkb2-dev">' + esc(IT[k2][1]) + '</p><p class="kkb2-hi">' + esc(IT[k2][2]) + '</p>' +
            '<button class="kkb2-btn" onclick="say2(this.getAttribute(\'data-t\'))" data-t="' + esc(IT[k2][0]) + '">🔊</button></div>';
        }
      }
    }
    view(h);
  }

  /* A-गिनती */
  for (i = 0; i < DATA.weeks.length; i++) for (j = 0; j < DATA.weeks[i].days.length; j++) {
    var ITc = DATA.weeks[i].days[j].items;
    for (var kk2 = 0; kk2 < ITc.length; kk2++) if (ITc[kk2][4] === 'A') A_TOTAL++;
  }

  window.kkb2Go = function (v, a, b) {
    if (v === 'home') home(); else if (v === 'w') week(a); else if (v === 'd') day(a, b);
    else if (v === 'lis') listen(a, b); else if (v === 'dlg') dialog(a); else if (v === 't') test(a); else if (v === 'must') must();
  };
  home();
})();
