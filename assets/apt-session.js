/* ============================================================
   /assets/apt-session.js — v1.1 (अभिरुचि पूरा-टेस्ट session-इंजन · बैज-द्वार)
   v1.1 · 22-Jul-2026: बैज-द्वार — पूरा टेस्ट सिर्फ़ बैज-निशान (acs_apt_gate_v1)
   वालों को; बिना निशान = द्वार-कार्ड (Jio-नियम v3.7-क अ/ब का अमल)।
   v1.0 (अभिरुचि पूरा-टेस्ट session-इंजन · नींव-दौर)
   20-Jul-2026 · मूल भाषा: हिंदी
   ------------------------------------------------------------
   नियम (Addendum v4.1 + Founder-फ़ैसले 20-Jul):
   - 120 प्रश्न · 90 मिनट · 3 खंड: 40 सेक्टर-पहचान (24-MG फैलाव) →
     40 गहन-जाँच (शीर्ष 3-4 MG, udy-स्तर) → 40 कोर्स-चुनाव।
   - घड़ी रास्ता-अ: सिर्फ़ खुले पन्ने पर चले — पन्ना बंद = घड़ी रुके,
     लौटने पर वहीं से (Founder-फ़ैसला, 20-Jul)।
   - नियंत्रक = शुद्ध गणित (v4.1-क7) — चयन व scoring में AI शून्य।
   - जवाब-नतीजा device-local (localStorage) — server पर कुछ नहीं (DPDP)।
   - भंडार आलसी-load: आधार-फ़ाइल का pool-नक़्शा → broad.js (खंड-1) →
     शीर्ष MG के mgNN.js (खंड-2/3) → नतीजे पर udyam_data.js।
   - attempt-घुमाव: इस्तेमाल हुए प्रश्न दर्ज — अगला प्रयास ताज़ा प्रश्न;
     भंडार चुक जाए तो दोबारा-उपयोग (Jio-नियम: असीमित प्रयास)।
   - final-submit = प्रति-attempt lock (v3.7-क4)।
   - नतीजा: 4-5 कोर्स घटते क्रम — उपलब्ध (कड़ी वाले) ऊपर, बाक़ी पर
     ईमानदार "पाठ जल्द जुड़ेंगे" + WhatsApp माँग-कड़ी (v2.7 · url-नियम v2.4)।
   - प-1 (10-13) नरम पाठ; 0 = "जानता नहीं" — औसत में नहीं (v3.8)।
   - बेनाम analytics-hook जन्म से, पर मौन (v4.1-क8)।
   - गूँगा-fallback निषेध (v2.3): फ़ाइल न उतरे तो साफ़ संदेश + दोबारा-बटन।
   ============================================================ */
(function () {
  'use strict';
  var box = document.getElementById('apt-sess-box');
  if (!box) return;
  var D = window.APT_DATA, ART = window.APT_ART || {}, MG = window.MG_NAMES || {};
  if (!D || !D.pool) { box.innerHTML = '<p>टेस्ट-सामग्री नहीं खुली — पन्ना दोबारा खोलिए।</p>'; return; }

  /* ---------- बैज-द्वार + ₹100/चांस-द्वार (Jio-नियम v3.7 + Founder-नियम 22-Jul) ----------
     दो रास्ते: (अ) बैज-निशान (acs_apt_gate_v1, dashboard से) → मुफ़्त-असीमित;
     (ब) ₹100 में 1-चांस — apt-pay.js (अलग module-स्क्रिप्ट) से भुगतान होकर
     window.ACS_APT_SESSION.unlock('attempt') बुलाता है। यहाँ से पूरा इंजन
     initEngine() में लपेटा — ताकि async भुगतान-पुष्टि के बाद भी टेस्ट शुरू
     हो सके (पहले सीधे return से आगे का code कभी न चलता)। */
  function gateOK() {
    try {
      var g = JSON.parse(localStorage.getItem('acs_apt_gate_v1') || 'null');
      return !!(g && g.until && Date.now() < g.until);
    } catch (e) { return false; }
  }
  var ACCESS_MODE = null;   /* 'badge' | 'attempt' — finish() पर तय करता है consume बुलाना है या नहीं */
  var engineStarted = false;

  function renderGateCard(showBuy) {
    var extra = '';
    if (showBuy === 'checking') {
      extra = '<p id="apt-buy-msg">\uD83D\uDD0E आपका भुगतान-चांस जाँचा जा रहा है…</p>';
    } else if (showBuy) {
      extra = '<div id="apt-buy-wrap">' +
        '<p style="font-weight:700;color:var(--navy,#0B1F3A)">या: बिना-badge भी ₹100 में 1 पूरा चांस लें</p>' +
        '<div class="apt-nav"><button class="apt-btn gold" id="apt-buy-attempt-btn">\uD83C\uDF9F\uFE0F ₹100 में 1 चांस लें</button></div>' +
        '<p id="apt-buy-msg" style="color:var(--muted,#666);font-size:16px"></p>' +
        '</div>';
    }
    box.innerHTML = '<div class="apt-card">' +
      '<p class="apt-q">\uD83C\uDF96\uFE0F पूरा टेस्ट — बैज या ₹100/चांस से</p>' +
      '<p>बैज वाले साथी यह टेस्ट 365 दिन मुफ़्त देते हैं — जितनी बार चाहें।</p>' +
      '<p>बैज है? पहले लॉगिन (Login) कीजिए। फिर अपने डैशबोर्ड (Dashboard) के \uD83C\uDF96\uFE0F बैज पैनल में जाइए।</p>' +
      '<p>वहाँ से इस पन्ने पर आइए — द्वार अपने-आप खुल जाएगा।</p>' +
      '<p>बैज नहीं है? ऊपर की मुफ़्त झलक (24 प्रश्न) दीजिए, या नीचे ₹100 में सीधे पूरा टेस्ट लीजिए।</p>' +
      '<div class="apt-nav"><a class="apt-btn green" href="/dashboard/">\uD83D\uDD11 Login / Dashboard</a></div>' +
      extra +
      '</div>';
  }

  /* apt-pay.js (module-स्क्रिप्ट, अलग फ़ाइल) इन्हीं दो को बुलाता है —
     गूँगा-fallback निषेध (v2.3): apt-pay.js न लोड हो पाए तो 2.5s में
     अपने-आप buy-card दिखे, "अटका हुआ जाँच रहा है" कभी न रहे। */
  window.ACS_APT_SESSION = {
    unlock: function (mode) {
      if (engineStarted) return;
      ACCESS_MODE = mode || 'attempt';
      engineStarted = true;
      initEngine();
    },
    showBuy: function () { if (!engineStarted) renderGateCard(true); }
  };

  if (gateOK()) {
    ACCESS_MODE = 'badge';
    engineStarted = true;
    initEngine();
  } else {
    renderGateCard('checking');
    setTimeout(function () {
      if (!engineStarted) renderGateCard(true);
    }, 2500);
  }
  return; /* नीचे initEngine() परिभाषा है — असली शुरुआत ऊपर से होती है */

  /* ================= पूरा इंजन — सिर्फ़ gate पास होने पर चले ================= */
  function initEngine() {

  var KEY = 'acs_apt_sess_v1';
  var TOTAL = 120, PER_KHAND = 40, LIMIT_SEC = 90 * 60;
  var YEAR_NOW = new Date().getFullYear();

  /* ---------- भंडारण ---------- */
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(S) { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
  var S = load();
  S.used = S.used || {}; S.attempts = S.attempts || [];

  /* ---------- शुद्ध-गणित बीज-क्रम (seeded shuffle) ---------- */
  function rng(seed) { var s = seed >>> 0; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
  function shuffle(arr, r) { var a = arr.slice(), i, j, t; for (i = a.length - 1; i > 0; i--) { j = Math.floor(r() * (i + 1)); t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------- आलसी-load ---------- */
  var loaded = {};
  function loadScript(url, ok, fail) {
    if (loaded[url]) { ok(); return; }
    var sc = document.createElement('script');
    sc.src = url;
    sc.onload = function () { loaded[url] = 1; ok(); };
    sc.onerror = function () { fail(url); };
    document.head.appendChild(sc);
  }
  function loadMany(urls, ok) {
    var left = urls.length;
    if (!left) { ok(); return; }
    var failed = false;
    urls.forEach(function (u) {
      loadScript(u, function () { left--; if (!left && !failed) ok(); }, function (bad) {
        failed = true;
        box.innerHTML = '<div class="apt-card"><p>⚠️ प्रश्न-फ़ाइल नहीं उतरी (network)।</p>' +
          '<p>net देखकर दोबारा दबाइए।</p><div class="apt-nav"><button class="apt-btn blue" id="apt-retry">🔄 दोबारा</button></div></div>';
        var b = document.getElementById('apt-retry');
        if (b) b.onclick = function () { loadMany(urls, ok); };
      });
    });
  }
  function poolAll() { return window.APT_POOL || []; }
  function byId(list) { var m = {}; list.forEach(function (q) { m[q.id] = q; }); return m; }

  /* ---------- band ---------- */
  function bandOf(age) { return age <= 13 ? 1 : (age <= 17 ? 2 : 3); }
  function fitsBand(q, b) { return !q.band || q.band.indexOf(b) >= 0; }
  function mgTags(q) {
    var s = {};
    (q.mg || []).forEach(function (m) { s[m] = 1; });
    (q.opts || []).forEach(function (o) { (o.mg || []).forEach(function (m) { s[m] = 1; }); });
    return Object.keys(s).map(Number);
  }
  function udyTags(q) {
    var s = {};
    (q.udy || []).forEach(function (u) { s[u] = 1; });
    (q.opts || []).forEach(function (o) { (o.udy || []).forEach(function (u) { s[u] = 1; }); });
    return Object.keys(s).map(Number);
  }

  /* ---------- चयन (शुद्ध गणित) ---------- */
  function pickSpread(list, want, band, used, seed, keyOf) {
    /* keyOf(q) = समूह-चाबी (mg या udy-गुट) — बारी-बारी हर समूह से एक */
    var bins = {}, order = [];
    list.forEach(function (q) {
      if (!fitsBand(q, band)) return;
      var k = keyOf(q);
      if (!bins[k]) { bins[k] = []; order.push(k); }
      bins[k].push(q);
    });
    var r = rng(seed);
    order = shuffle(order, r);
    order.forEach(function (k) { bins[k] = shuffle(bins[k], r); });
    var out = [], pass, k, i, q;
    for (pass = 0; pass < 2 && out.length < want; pass++) { /* pass-0: बिना-इस्तेमाल; pass-1: दोबारा-उपयोग */
      var idx = {};
      var guard = 0;
      while (out.length < want && guard < 5000) {
        guard++;
        var progressed = false;
        for (i = 0; i < order.length && out.length < want; i++) {
          k = order[i];
          var arr = bins[k]; if (!arr || !arr.length) continue;
          var p = idx[k] || 0;
          while (p < arr.length) {
            q = arr[p]; p++;
            var already = out.some(function (x) { return x.id === q.id; });
            if (already) continue;
            if (pass === 0 && used[q.id]) continue;
            out.push(q); progressed = true; break;
          }
          idx[k] = p;
        }
        if (!progressed) break;
      }
    }
    return out;
  }

  /* ---------- scoring (v3.9 यथावत; 0 = जानता नहीं, औसत में नहीं) ---------- */
  function tally(qmap, ans) {
    var mg = {}, un = {}, udy = {};
    function add(map, keys, pts) { keys.forEach(function (k) { map[k] = map[k] || { s: 0, t: 0 }; map[k].s += pts; map[k].t++; }); }
    Object.keys(ans).forEach(function (id) {
      var q = qmap[id]; if (!q) return;
      var a = ans[id];
      if (q.type === 'scale') {
        var sc;
        if (typeof a.v11 === 'number') sc = a.v11;
        else sc = (D.scoring.scale.faces)[a.v];
        if (q.amb) return;                       /* हौसला-प्रश्न — mg-गिनती नहीं */
        if (sc === 0) { mgTags(q).forEach(function (m) { un[m] = (un[m] || 0) + 1; }); return; }
        add(mg, q.mg || [], sc); add(udy, q.udy || [], sc);
      } else if (q.type === 'pick') {
        var f = q.opts[a.first], l = q.opts[a.last];
        if (f) { add(mg, f.mg || [], D.scoring.pick.first); add(udy, f.udy || [], D.scoring.pick.first); }
        if (l) { add(mg, l.mg || [], D.scoring.pick.last); add(udy, l.udy || [], D.scoring.pick.last); }
      } else if (q.type === 'pair') {
        var o = q.opts[a.v];
        if (o) { add(mg, o.mg || [], D.scoring.pair.pick); add(udy, o.udy || [], D.scoring.pair.pick); }
      } else if (q.type === 'story') {
        var so = q.opts && q.opts[a.v];
        if (so) { var p = (typeof so.pts === 'number') ? so.pts : D.scoring.story.defaultPts; add(mg, so.mg || [], p); add(udy, so.udy || [], p); }
      }
    });
    return { mg: mg, un: un, udy: udy };
  }
  function rank(map) {
    return Object.keys(map).map(function (k) { return { k: Number(k), avg: map[k].s / map[k].t, s: map[k].s, t: map[k].t }; })
      .sort(function (a, b) { return b.avg - a.avg || b.s - a.s; });
  }

  /* ---------- घड़ी: रास्ता-अ — सिर्फ़ खुले पन्ने पर चले ---------- */
  var tick = null;
  function startClock() {
    if (tick) return;
    tick = setInterval(function () {
      var C = S.cur; if (!C || C.locked) return;
      if (document.hidden) return;               /* पन्ना छिपा = घड़ी रुकी */
      C.elapsed = (C.elapsed || 0) + 1;
      if (C.elapsed % 5 === 0) save(S);
      var el = document.getElementById('apt-clock');
      if (el) el.textContent = clockText(C);
      if (C.elapsed >= LIMIT_SEC) { save(S); finish(true); }
    }, 1000);
  }
  function clockText(C) {
    var left = Math.max(0, LIMIT_SEC - (C.elapsed || 0));
    var m = Math.floor(left / 60), s = left % 60;
    return '⏱ बचा समय: ' + m + ' मिनट ' + (s < 10 ? '0' : '') + s + ' सेकंड';
  }

  /* ---------- बेनाम analytics-hook (मौन — v4.1-क8) ---------- */
  function hook(payload) { try { if (window.ACS_APT_ANALYTICS) window.ACS_APT_ANALYTICS(payload); } catch (e) {} }

  /* ---------- UI टुकड़े ---------- */
  function esc(t) { return String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  function art(id) {
    if (id && ART[id]) return '<div class="apt-img">' + ART[id] + '</div>';
    return '';
  }
  function mgName(m) { var e = MG[m]; return e ? ((e.icon ? e.icon + ' ' : '') + e.name) : ('समूह-' + m); }

  /* ---------- शुरुआत-कार्ड ---------- */
  function renderStart() {
    var C = S.cur;
    var html = '<div class="apt-card">' +
      '<p class="apt-q">🧭 पूरा टेस्ट — 120 प्रश्न, 3 खंड</p>' +
      '<p>घड़ी 90 मिनट की है। पन्ना बंद करें तो घड़ी रुक जाती है।</p>' +
      '<p>लौटिए — जहाँ छोड़ा था, वहीं से चलेगा।</p>';
    if (C && !C.locked && C.ids) {
      html += '<div class="apt-note">आपका एक प्रयास अधूरा है — प्रश्न ' + (Object.keys(C.ans || {}).length) + ' / ' + TOTAL + ' हो चुके।</div>' +
        '<div class="apt-nav"><button class="apt-btn green" id="apt-resume">▶ वहीं से जारी रखें</button> ' +
        '<button class="apt-btn ghost" id="apt-fresh">🆕 नया प्रयास</button></div>';
    } else {
      html += '<p>पहले अपना जन्म का साल चुनिए (सिर्फ़ आपके फ़ोन में रहेगा):</p>' +
        '<div class="apt-nav"><select id="apt-yob" class="apt-sel">' + yearOpts() + '</select> ' +
        '<button class="apt-btn green" id="apt-go">🚀 शुरू करें</button></div>' +
        '<div class="apt-note">🔒 जवाब और नतीजा सिर्फ़ आपके फ़ोन में — कहीं भेजे नहीं जाते।</div>';
    }
    html += '</div>';
    box.innerHTML = html;
    var g = document.getElementById('apt-go');
    if (g) g.onclick = function () {
      var y = Number(document.getElementById('apt-yob').value);
      var age = YEAR_NOW - y;
      if (age < 10) { alert('यह टेस्ट 10 साल की उम्र से है।'); return; }
      newAttempt(y);
    };
    var rs = document.getElementById('apt-resume');
    if (rs) rs.onclick = function () { bootQuestions(); };
    var fr = document.getElementById('apt-fresh');
    if (fr) fr.onclick = function () { if (confirm('अधूरा प्रयास हटेगा — नया शुरू करें?')) { S.cur = null; save(S); renderStart(); } };
  }
  function yearOpts() {
    var out = '', y;
    var def = S.birthYear || (YEAR_NOW - 15);
    for (y = YEAR_NOW - 10; y >= YEAR_NOW - 70; y--) {
      out += '<option value="' + y + '"' + (y === def ? ' selected' : '') + '>' + y + '</option>';
    }
    return out;
  }

  /* ---------- नया प्रयास ---------- */
  function newAttempt(yob) {
    S.birthYear = yob;
    var n = S.attempts.length + 1;
    S.cur = { n: n, band: bandOf(YEAR_NOW - yob), phase: 1, ids: { k1: [], k2: [], k3: [] }, pos: 0, ans: {}, elapsed: 0, topMg: [], locked: false };
    save(S);
    bootQuestions();
  }

  /* ---------- खंड-1 भंडार ---------- */
  function bootQuestions() {
    var C = S.cur; if (!C) { renderStart(); return; }
    box.innerHTML = '<div class="apt-card"><p>प्रश्न आ रहे हैं…</p></div>';
    loadMany([D.pool.broad], function () {
      if (!C.ids.k1.length) {
        var picked = pickSpread(poolAll(), PER_KHAND, C.band, S.used, C.n * 101 + 7, function (q) { return (q.mg && q.mg[0]) || 0; });
        C.ids.k1 = picked.map(function (q) { return q.id; });
        save(S);
      }
      if (C.phase >= 2 && C.topMg.length) { loadTopShards(function () { renderStep(); }); }
      else renderStep();
      startClock();
    });
  }
  function loadTopShards(ok) {
    var urls = [];
    S.cur.topMg.forEach(function (m) { if (D.pool.mg[m]) urls.push(D.pool.mg[m]); });
    loadMany(urls, ok);
  }

  /* ---------- खंड-सीमा: गिनती + अगला भंडार ---------- */
  function khandBoundary() {
    var C = S.cur, qmap = byId(poolAll().concat(D.questions));
    var T = tally(qmap, C.ans);
    if (C.phase === 1) {
      var top = rank(T.mg).filter(function (x) { return x.avg > 0; }).slice(0, 4).map(function (x) { return x.k; });
      if (top.length < 3) top = rank(T.mg).slice(0, 3).map(function (x) { return x.k; });
      C.topMg = top; C.phase = 2; save(S);
      storyBreak(top[0], function () {
        loadTopShards(function () {
          var deep = poolAll().filter(function (q) { return udyTags(q).length && mgTags(q).some(function (m) { return top.indexOf(m) >= 0; }); });
          var picked = pickSpread(deep, PER_KHAND, C.band, S.used, C.n * 211 + 3, function (q) { return mgTags(q)[0] || 0; });
          C.ids.k2 = picked.map(function (q) { return q.id; });
          save(S); renderStep();
        });
      });
    } else if (C.phase === 2) {
      var udyRank = rank(T.udy);
      var topU = {}; udyRank.slice(0, 30).forEach(function (x, i) { if (x.avg > 0) topU[x.k] = 30 - i; });
      C.phase = 3; save(S);
      storyBreak(C.topMg[0], function () {
        var chosen = {}; C.ids.k1.concat(C.ids.k2).forEach(function (id) { chosen[id] = 1; });
        var deep = poolAll().filter(function (q) {
          return !chosen[q.id] && udyTags(q).length && mgTags(q).some(function (m) { return C.topMg.indexOf(m) >= 0; });
        });
        deep.sort(function (a, b) { return weight(b, topU) - weight(a, topU); });
        var fresh = deep.filter(function (q) { return !S.used[q.id] && fitsBand(q, C.band); });
        var list = (fresh.length >= PER_KHAND ? fresh : deep.filter(function (q) { return fitsBand(q, C.band); })).slice(0, PER_KHAND);
        C.ids.k3 = list.map(function (q) { return q.id; });
        save(S); renderStep();
      });
    }
  }
  function weight(q, topU) { var w = 0; udyTags(q).forEach(function (u) { if (topU[u]) w += topU[u]; }); return w; }

  /* ---------- कथा-विराम ---------- */
  function storyBreak(topMgId, next) {
    var st = (D.stories || []).filter(function (s) { return (s.mg || []).indexOf(topMgId) >= 0; })[0] || (D.stories || [])[S.cur.phase % (D.stories || [1]).length] || null;
    if (!st) { next(); return; }
    box.innerHTML = '<div class="apt-card apt-katha">' + art(st.img) +
      '<p class="apt-q">📖 ' + esc(st.title) + '</p><p>' + esc(st.text) + '</p>' +
      '<div class="apt-nav"><button class="apt-btn blue" id="apt-next">आगे बढ़ें ➜</button></div></div>';
    document.getElementById('apt-next').onclick = next;
    window.scrollTo(0, box.offsetTop - 8);
  }

  /* ---------- प्रश्न-प्रदर्शन ---------- */
  function seq() { var C = S.cur; return C.ids.k1.concat(C.ids.k2, C.ids.k3); }
  function renderStep() {
    var C = S.cur, ids = seq();
    if (C.pos >= ids.length) {
      if (C.phase === 1 || (C.phase === 2 && ids.length < TOTAL)) { khandBoundary(); return; }
      renderSubmit(); return;
    }
    if (C.phase === 1 && C.pos >= PER_KHAND) { khandBoundary(); return; }
    if (C.phase === 2 && C.pos >= 2 * PER_KHAND) { khandBoundary(); return; }
    var qmap = byId(poolAll().concat(D.questions));
    var q = qmap[ids[C.pos]];
    if (!q) { C.pos++; save(S); renderStep(); return; }
    var head = '<div class="apt-top"><span class="apt-prog">खंड ' + C.phase + ' · प्रश्न ' + (C.pos + 1) + ' / ' + TOTAL + '</span>' +
      '<span class="apt-prog" id="apt-clock">' + clockText(C) + '</span></div>';
    var body = '<p class="apt-q">' + esc(q.text) + '</p>';
    var a = C.ans[q.id] || {};
    if (q.type === 'scale') body += scaleUI(q, a);
    else if (q.type === 'pick') body += pickUI(q, a);
    else body += optUI(q, a);
    body += art(q.img);
    var nav = '<div class="apt-nav">' +
      (C.pos > 0 ? '<button class="apt-btn ghost" id="apt-prev">← पिछला</button> ' : '') +
      '<button class="apt-btn blue" id="apt-skiporgo">' + (answered(q, a) ? 'आगे ➜' : 'बाद में देखूँगा ➜') + '</button></div>';
    box.innerHTML = '<div class="apt-card">' + head + body + nav + '</div>';
    bind(q);
    var pv = document.getElementById('apt-prev');
    if (pv) pv.onclick = function () { C.pos--; save(S); renderStep(); };
    document.getElementById('apt-skiporgo').onclick = function () { C.pos++; save(S); renderStep(); };
  }
  function answered(q, a) {
    if (q.type === 'pick') return typeof a.first === 'number' && typeof a.last === 'number';
    return typeof a.v === 'number' || typeof a.v11 === 'number';
  }
  function scaleUI(q, a) {
    var C = S.cur;
    if (C.band === 1) {
      var faces = ['😖', '🙁', '😐', '🙂', '😍'], i, h = '<div class="apt-faces">';
      for (i = 0; i < 5; i++) h += '<button class="apt-face' + (a.v === i ? ' on' : '') + '" data-v="' + i + '">' + faces[i] + '</button>';
      return h + '</div><p class="apt-hint">😐 = जानता नहीं — यह भी ठीक जवाब है।</p>';
    }
    var h = '<div class="apt-faces apt-11">', v;
    for (v = -5; v <= 5; v++) {
      h += '<button class="apt-face' + (a.v11 === v ? ' on' : '') + '" data-v11="' + v + '">' + (v === 0 ? '😐' : (v > 0 ? '+' + v : v)) + '</button>';
    }
    return h + '</div><p class="apt-hint">−5 = बिल्कुल नहीं · 0 = जानता नहीं · +5 = बहुत पसंद</p>';
  }
  function pickUI(q, a) {
    var h = '<p class="apt-hint">पहला दबाव = ⭐ सबसे पहले · दूसरा दबाव = 🚫 सबसे कम</p><div class="apt-opts">';
    q.opts.forEach(function (o, i) {
      var cls = a.first === i ? ' first' : (a.last === i ? ' last' : '');
      var tag = a.first === i ? '<span class="apt-tag">⭐ सबसे पहले</span>' : (a.last === i ? '<span class="apt-tag">🚫 सबसे कम</span>' : '');
      h += '<button class="apt-opt' + cls + '" data-i="' + i + '">' + (o.img && ART[o.img] ? ART[o.img] : '') + esc(o.t || o.text || o.label || '') + tag + '</button>';
    });
    return h + '</div>';
  }
  function optUI(q, a) {
    var h = '<div class="apt-opts' + (q.type === 'story' ? ' apt-story' : '') + '">';
    q.opts.forEach(function (o, i) {
      h += '<button class="apt-opt' + (a.v === i ? ' on' : '') + '" data-i="' + i + '">' + esc(o.t || o.text || o.label || '') + '</button>';
    });
    return h + '</div>';
  }
  function bind(q) {
    var C = S.cur, a = C.ans[q.id] = C.ans[q.id] || {};
    var keep = window.scrollY;
    function done() { save(S); var y = keep; renderStep(); window.scrollTo(0, y); }
    Array.prototype.forEach.call(box.querySelectorAll('[data-v]'), function (b) {
      b.onclick = function () { a.v = Number(b.getAttribute('data-v')); C.pos++; done(); };
    });
    Array.prototype.forEach.call(box.querySelectorAll('[data-v11]'), function (b) {
      b.onclick = function () { a.v11 = Number(b.getAttribute('data-v11')); C.pos++; done(); };
    });
    Array.prototype.forEach.call(box.querySelectorAll('[data-i]'), function (b) {
      b.onclick = function () {
        var i = Number(b.getAttribute('data-i'));
        if (q.type === 'pick') {
          if (typeof a.first !== 'number') a.first = i;
          else if (a.first === i) { delete a.first; delete a.last; }
          else { a.last = i; }
          if (typeof a.first === 'number' && typeof a.last === 'number') C.pos++;
        } else { a.v = i; C.pos++; }
        done();
      };
    });
  }

  /* ---------- अंतिम जमा (प्रति-attempt lock) ---------- */
  function renderSubmit() {
    var C = S.cur, got = Object.keys(C.ans).length;
    box.innerHTML = '<div class="apt-card"><p class="apt-q">🏁 सब खंड पूरे!</p>' +
      '<p>जवाब मिले: ' + got + ' / ' + TOTAL + '। जमा करने के बाद यह प्रयास बंद (lock) हो जाएगा।</p>' +
      '<p>चाहें तो "← पिछला" से पीछे जाकर जवाब बदल लें।</p>' +
      '<div class="apt-nav"><button class="apt-btn ghost" id="apt-prev">← पिछला</button> ' +
      '<button class="apt-btn green" id="apt-lock">✅ अंतिम जमा</button></div></div>';
    document.getElementById('apt-prev').onclick = function () { C.pos = seq().length - 1; save(S); renderStep(); };
    document.getElementById('apt-lock').onclick = function () {
      if (confirm('पक्का जमा करें? इसके बाद यह प्रयास बदलेगा नहीं।')) finish(false);
    };
  }
  function finish(byClock) {
    var C = S.cur; if (!C || C.locked) return;
    C.locked = true;
    Object.keys(C.ans).forEach(function (id) { S.used[id] = 1; });
    S.attempts.push({ n: C.n, band: C.band, doneAt: new Date().toISOString().slice(0, 10), byClock: !!byClock });
    save(S);
    /* ₹100-चांस रास्ते से आए थे तो अभी consume करो (badge-रास्ते पर ज़रूरत नहीं —
       बैज-धारक असीमित हैं)। server ख़ुद सबसे पुराना unused+paid चांस चुनकर
       consume करता है — यहाँ orderId भेजने की ज़रूरत नहीं (v22-Jul डिज़ाइन)। */
    if (ACCESS_MODE === 'attempt' && window.ACS_APT_PAY && window.ACS_APT_PAY.consume) {
      try { window.ACS_APT_PAY.consume(); } catch (e) {}
    }
    renderResult(byClock);
  }

  /* ---------- नतीजा ---------- */
  function renderResult(byClock) {
    var C = S.cur, qmap = byId(poolAll().concat(D.questions));
    var T = tally(qmap, C.ans);
    var mgR = rank(T.mg), udyR = rank(T.udy).filter(function (x) { return x.avg > 0; });
    hook({ band: C.band, top: mgR.slice(0, 4).map(function (x) { return x.k; }), m: new Date().getMonth() + 1 });
    box.innerHTML = '<div class="apt-card"><p>नतीजा बन रहा है…</p></div>';
    loadMany(['/assets/udyam_data.js'], function () {
      var SEC = (window.ALL_SECTORS || (typeof ALL_SECTORS !== 'undefined' ? ALL_SECTORS : []));
      var byN = {}; SEC.forEach(function (u) { byN[u.n] = u; });
      var picks = udyR.slice(0, 12).map(function (x) { return { u: byN[x.k], score: x.avg }; }).filter(function (p) { return p.u; });
      picks.sort(function (a, b) { return (b.u.course ? 1 : 0) - (a.u.course ? 1 : 0) || b.score - a.score; });
      picks = picks.slice(0, 5);
      var h = '';
      if (byClock) h += '<div class="apt-note">⏱ 90 मिनट पूरे — जितने जवाब मिले, उन्हीं से नतीजा बना।</div>';
      h += '<p class="apt-q">' + (C.band === 1 ? '🌟 यह दुनिया तुम्हें बुला रही है!' : '🏆 आपकी रुचि की दिशा') + '</p>';
      if (!picks.length && !mgR.length) {
        h += '<p>जवाब बहुत कम मिले — नतीजा नहीं बन पाया। नया प्रयास कीजिए।</p>';
      } else {
        h += '<p class="apt-q" style="font-size:19px">📚 आपके लिए कोर्स (घटते क्रम):</p>';
        if (!picks.length) h += '<p>अभी कोई कोर्स-दिशा साफ़ नहीं उभरी — नए प्रयास में और जवाब दीजिए।</p>';
        h += '<div class="apt-opts">';
        picks.forEach(function (p, i) {
          var nm = String(p.u.name).replace(/\[/g, '(').replace(/\]/g, ')');
          h += '<div class="apt-row apt-course"><span class="nm">' + (i + 1) + '. ' + esc(nm) + '</span> ';
          if (p.u.course) h += '<a class="apt-btn apt-mini" href="' + p.u.course + '">📚 पढ़ें — कोर्स उपलब्ध ✅</a>';
          else h += '<span class="apt-hint">पाठ जल्द जुड़ेंगे</span> <a class="apt-btn2 apt-mini" href="https://wa.me/919431210092?text=' +
            encodeURIComponent('मुझे यह कोर्स चाहिए: ' + nm + ' (उद्यम ' + p.u.n + ')') + '">📲 यह कोर्स माँगें</a>';
          h += '</div>';
        });
        h += '</div><p>इनमें से किसी 1 से शुरुआत कीजिए — बाक़ी बाद में।</p>';
        h += '<p class="apt-q" style="font-size:19px">आपके शीर्ष समूह:</p><p>' +
          mgR.slice(0, 4).map(function (x) { return '<span class="apt-chip">' + mgName(x.k) + '</span>'; }).join(' ') + '</p>';
        var unMg = Object.keys(T.un);
        if (unMg.length) h += '<div class="apt-note">🔍 अनजान क्षेत्र: ' + unMg.slice(0, 6).map(function (m) { return mgName(Number(m)); }).join(' · ') + ' — इन्हें जानना भी एक राह है।</div>';
      }
      h += '<div class="apt-note">📝 यह रुचि की दिशा है — योग्यता का प्रमाण नहीं।</div>' +
        '<div class="apt-note">🟢 टेस्ट मुफ़्त है। प्रमाण पत्र (PDF) ₹125 में — मर्ज़ी हो तो लें, या न लें। यह सुविधा जल्द जुड़ेगी।</div>' +
        '<div class="apt-nav"><button class="apt-btn green" id="apt-again">🆕 नया प्रयास (ताज़ा प्रश्न)</button></div>';
      box.innerHTML = '<div class="apt-card">' + h + '</div>';
      document.getElementById('apt-again').onclick = function () { S.cur = null; save(S); renderStart(); };
      window.scrollTo(0, box.offsetTop - 8);
    });
  }

  /* ---------- बूट ---------- */
  var C0 = S.cur;
  if (C0 && C0.locked) { S.cur = null; save(S); }
  renderStart();

  } /* ==== initEngine() समाप्त ==== */
})();
