/* ============================================================
   /assets/kkb2.js — v3.0 (31-Aug-2026) · भाषा-सामान्यीकरण: 8 भाषाएँ (en मास्टर + ar/fr/es/ja/ko/de/ru) — lang-meta data से; en-व्यवहार पहले जैसा · देवनागरी-native (ru) = hi-IN आवाज़ · जापानी (romaji) आवाज़ में कटे · अरबी RTL · ACS KKB मास्टर-इंजन — एक कोर्स, 90 दिन
   Founder-आदेश: L1 (500) + स्तर-2 (1,650) = 2,150 वाक्य एक-साथ; 3 महीने;
   महीना-1 = 20 वाक्य/दिन (ठीक 600) · महीना-2/3 = बढ़ती चाल (20→30)।
   data: window.KKB_DATA (स्तर-1, frozen) + window.KKB2_DATA (स्तर-2, frozen) —
   दोनों master byte-अछूते; यह इंजन सिर्फ़ 90-दिन नक़्शे में गूँथता है।
   नियम जीवित: audio-अनिवार्य · दिन-अंत 🎧 (स्तर-2) · 🗣️ संवाद · ⭐ A-308 ·
   📞 टेस्ट · device-local (DPDP) · ES5 (Android-8)। सजावट: kkb2.css v2.0
   ============================================================ */
(function () {
  "use strict";
  var D1 = window.KKB_DATA, D2 = window.KKB2_DATA;
  var ROOT = document.getElementById("kkb2-app");
  if (!D1 || !D2 || !ROOT) return;
  var TRAINER_WA = "919431210092";

  /* ---- भाषा (v3.0): data से — D2.lang प्राथमिक; en पर व्यवहार पहले जैसा ---- */
  var LANG = (D2 && D2.lang) || (D1 && D1.lang) || { code: "en", label: "English", tts: "en-IN", sr: "en-IN", script: "latin" };
  var EN = LANG.code === "en";
  var TTSL = LANG.script === "devanagari-native" ? "hi-IN" : LANG.tts; /* देवनागरी-फ़ोनेटिक भाषा (रूसी): hi-IN आवाज़ (Founder-मुहर 31-Aug) */
  var TBASE = TTSL.split("-")[0].toLowerCase();
  var RTL = LANG.script === "arabic" || LANG.script === "persian";
  function DIRw() { return RTL ? ' dir="rtl"' : ""; } /* सिर्फ़ लक्ष्य-भाषा पंक्ति पर — देवनागरी/हिंदी LTR */
  function spoken(t) { t = String(t).replace(/^\((सुनो|बोलो)[^)]*\)\s*/, ""); if (LANG.script === "japanese") t = t.replace(/\s*\([^()]*\)\s*$/, ""); return t; } /* जापानी: अंत का (romaji) आवाज़ में नहीं */

  /* ---- 90-दिन नक़्शा (master अछूता — सिर्फ़ क्रम-सूची) ---- */
  var DAYS = [], w, d;
  for (w = 0; w < D1.weeks.length; w++) for (d = 0; d < D1.weeks[w].days.length; d++)
    DAYS.push({ src: 1, wi: w, di: d });
  for (w = 0; w < D2.weeks.length; w++) for (d = 0; d < D2.weeks[w].days.length; d++)
    DAYS.push({ src: 2, wi: w, di: d });
  var TOTAL_DAYS = DAYS.length; /* = 90 */
  function dayObj(r) { return (r.src === 1 ? D1 : D2).weeks[r.wi].days[r.di]; }
  function weekObj(r) { return (r.src === 1 ? D1 : D2).weeks[r.wi]; }
  var TOTAL_ITEMS = 0, A_TOTAL = 0, i;
  for (i = 0; i < DAYS.length; i++) {
    var IT0 = dayObj(DAYS[i]).items; TOTAL_ITEMS += IT0.length;
    for (var k0 = 0; k0 < IT0.length; k0++) if (IT0[k0][4] === "A") A_TOTAL++;
  }
  var MONTHS = [
    { hi: "पहला महीना — नींव", sub: "दिन 1-30 · 20 वाक्य/दिन · परिचय से परिवार तक", a: 0, b: 30 },
    { hi: "दूसरा महीना — ज़िंदगी और काम", sub: "दिन 31-60 · 20→30 वाक्य/दिन · घर, काम, पैसा", a: 30, b: 60 },
    { hi: "तीसरा महीना — कमाई, सफ़र और हक़", sub: "दिन 61-90 · 30 वाक्य/दिन · इंटरव्यू से विदेश-द्वार तक", a: 60, b: 90 }
  ];

  /* ---- प्रगति (device-local) ---- */
  var STORE = "acs_kkb2_full_" + LANG.code + "_v2";
  var P = {};
  try { P = JSON.parse(localStorage.getItem(STORE) || "{}"); } catch (e) { P = {}; }
  if (!P.day) P.day = {}; if (!P.dlg) P.dlg = {}; if (!P.tst) P.tst = {};
  function save() { try { localStorage.setItem(STORE, JSON.stringify(P)); } catch (e) { } }
  function doneDays() { var k, c = 0; for (k in P.day) if (P.day[k]) c++; return c; }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }

  /* ---- id: स्तर-1 = 000001-000500 · स्तर-2 = 000501-002150 ---- */
  function baseOf(g) {
    var n = 0, j;
    for (j = 0; j < g; j++) n += dayObj(DAYS[j]).items.length;
    return n;
  }
  function gsu(n) { return "ACS-GSU-" + ("000000" + n).slice(-6); }

  /* ---- आवाज़ ---- */
  var voice = null, VKEY = EN ? "acs_kkb2_voice_v1" : "acs_kkb2_voice_" + LANG.code + "_v1";
  function enVoices() {
    if (!("speechSynthesis" in window)) return [];
    return speechSynthesis.getVoices().filter(function (v) { return v.lang && v.lang.replace("_", "-").toLowerCase().indexOf(TBASE) === 0; });
  }
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    var vs = speechSynthesis.getVoices(), savedURI = "";
    try { savedURI = localStorage.getItem(VKEY) || ""; } catch (e) { }
    voice = null;
    if (savedURI) voice = vs.filter(function (v) { return v.voiceURI === savedURI; })[0] || null;
    if (!voice) voice = vs.filter(function (v) { return v.lang === TTSL || v.lang === TTSL.replace("-", "_"); })[0] ||
      vs.filter(function (v) { return v.lang && v.lang.replace("_", "-").toLowerCase().indexOf(TBASE) === 0; })[0] || null;
  }
  window.kkb2Voice = function (uri) {
    try { localStorage.setItem(VKEY, uri); } catch (e) { }
    pickVoice();
    say(EN ? "Hello! My name is A C S. I will speak English with you." : spoken(D1.weeks[0].days[0].items[0][0]), false);
  };
  window.kkb2VoiceBtn = function (b) { window.kkb2Voice(b.getAttribute("data-v")); window.kkb2Go("home"); };
  function voiceCard() {
    var L = enVoices();
    if (!("speechSynthesis" in window)) return "";
    if (L.length <= 1) return '<div class="kkb2-card soft"><p class="kkb2-muted">🗣️ इस फ़ोन में ' + esc(LANG.label) + ' की एक ही आवाज़ है — वही चलेगी। (आवाज़ें फ़ोन की अपनी होती हैं; Google Text-to-speech अपडेट करने से और आवाज़ें मिल सकती हैं।)</p></div>';
    var savedURI = ""; try { savedURI = localStorage.getItem(VKEY) || ""; } catch (e) { }
    var h = '<div class="kkb2-card soft"><h3>🗣️ आवाज़ चुनें</h3><p class="kkb2-muted">आपके फ़ोन में ' + L.length + ' ' + esc(LANG.label) + ' आवाज़ें हैं — चुनते ही नमूना सुनाई देगा; चुनाव याद रहेगा।</p><div class="kkb2-row">';
    for (var vi = 0; vi < L.length && vi < 6; vi++) {
      var on = (savedURI ? savedURI === L[vi].voiceURI : (voice && voice.voiceURI === L[vi].voiceURI));
      h += '<button class="kkb2-btn ' + (on ? "gold" : "ghost") + '" onclick="kkb2VoiceBtn(this)" data-v="' + esc(L[vi].voiceURI) + '">' + (on ? "✔ " : "") + esc(L[vi].name.replace(/English|Google|Microsoft/g, "").trim() || L[vi].lang) + ' <small>(' + esc(L[vi].lang) + ')</small></button>';
    }
    h += '</div></div>';
    return h;
  }
  if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function say(text, slow) {
    if (!("speechSynthesis" in window)) { alert("इस फ़ोन में आवाज़ नहीं चल रही। Chrome में खोलें।"); return false; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(spoken(text));
    u.lang = TTSL; if (voice) u.voice = voice; u.rate = slow ? 0.7 : 0.95;
    speechSynthesis.speak(u); return true;
  }
  window.say2 = function (t) { say(t, false); };

  /* ---- audio-अनिवार्य ---- */
  var heard = {};
  window.kkb2Hear = function (key, txt, slow) { if (say(txt, slow)) { heard[key] = 1; var b = document.getElementById("sp-" + key); if (b) b.disabled = false; } };
  window.kkb2Spoke = function (key) {
    if (!heard[key]) { alert("पहले 🔊 दबाकर वाक्य सुनिए — सुनना ज़रूरी है।"); return; }
    var el = document.getElementById("ok-" + key); if (el) el.innerHTML = '<span class="kkb2-ok">बोला ✔</span>';
  };

  function view(html) { ROOT.innerHTML = '<div class="kkb2-app" data-script="' + (LANG.script || "latin") + '">' + html + '</div>'; window.scrollTo(0, ROOT.offsetTop - 10); }
  function crumb(h) { return '<p class="kkb2-crumb">' + h + '</p>'; }
  function chipRow(it) {
    var pr = it[4], h = "";
    if (pr === "A") h += '<span class="kkb2-chip A">⭐ ज़रूर</span>';
    else if (pr === "B") h += '<span class="kkb2-chip B">चाहिए</span>';
    else if (pr === "C") h += '<span class="kkb2-chip C">जानो</span>';
    if (it[3] === "L") h += '<span class="kkb2-chip L">👂 सुनो-समझो</span>';
    return h;
  }

  /* ---------- HOME (हीरो + 3 महीने) ---------- */
  function home() {
    var dn = doneDays(), pct = Math.round(dn * 100 / TOTAL_DAYS);
    var h = '<div class="kkb2-hero">' +
      '<div class="kkb2-hero-kicker">ACS · Applied Computer School™</div>' +
      '<h2 class="kkb2-hero-title"' + DIRw() + '>' + esc(D2.heroTitle || "Certificate in Spoken English") + '</h2>' +
      '<div class="kkb2-hero-sub">' + esc(D2.heroSub || "अंग्रेज़ी बोलने का पूरा कोर्स — एक ही जगह, स्तर 1 + 2") + '</div>' +
      '<div class="kkb2-stats">' +
      '<span class="kkb2-stat"><b>' + String(TOTAL_ITEMS).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '</b>वाक्य</span>' +
      '<span class="kkb2-stat"><b>90</b>दिन · 3 महीने</span>' +
      '<span class="kkb2-stat"><b>100%</b>मुफ़्त</span>' +
      '<span class="kkb2-stat"><b>A2</b>CEFR पर आधारित</span>' +
      '</div>' +
      '<div class="kkb2-prog big"><i style="width:' + pct + '%"></i></div>' +
      '<div class="kkb2-hero-note">आपकी प्रगति: ' + dn + ' / ' + TOTAL_DAYS + ' दिन (' + pct + ' प्रतिशत)</div>' +
      '<div class="kkb2-rulebar">नियम: पहले सुनो 🔊 → साथ बोलो → फिर "मैंने बोला"। हर वाक्य पर आवाज़।</div>' +
      '<div class="kkb2-row center"><button class="kkb2-btn gold big" onclick="kkb2Go(\'m\',0)">▶ आज की पढ़ाई शुरू करें</button>' +
      '<button class="kkb2-btn ghost" onclick="kkb2Go(\'must\')">⭐ ज़रूर-बोलो (' + A_TOTAL + ')</button></div>' +
      '</div>';
    for (var m = 0; m < 3; m++) {
      var M = MONTHS[m], md = 0, g;
      for (g = M.a; g < M.b; g++) if (P.day[g + 1]) md++;
      var mp = Math.round(md * 100 / (M.b - M.a));
      h += '<button class="kkb2-month' + (md === 30 ? ' done' : '') + '" onclick="kkb2Go(\'m\',' + m + ')">' +
        '<span class="kkb2-mnum">' + (m + 1) + '</span>' +
        '<span class="kkb2-mbody"><b>' + M.hi + '</b><small>' + M.sub + '</small>' +
        '<span class="kkb2-prog"><i style="width:' + mp + '%"></i></span>' +
        '<small class="kkb2-mdone">' + md + '/30 दिन' + (md === 30 ? ' ✅' : '') + '</small></span></button>';
    }
    h += voiceCard();
    h += '<div class="kkb2-card soft"><p class="kkb2-muted">प्रगति सिर्फ़ इसी फ़ोन में रहती है (आपकी निजता)। माइक से बोल-जाँच अगले संस्करण में जुड़ेगी — अभी दोस्त/परिवार के सामने बोलकर अभ्यास कीजिए। <button class="kkb2-btn ghost" onclick="kkb2Reset()">प्रगति मिटाएँ</button></p></div>';
    view(h);
  }
  window.kkb2Reset = function () { if (confirm("सारी प्रगति मिटा दें?")) { P = { day: {}, dlg: {}, tst: {} }; save(); home(); } };

  /* ---------- MONTH (सप्ताह-थीम + दिन + सप्ताह-अंत पंक्तियाँ) ---------- */
  function month(m) {
    var M = MONTHS[m];
    var h = crumb('<a onclick="kkb2Go(\'home\')" href="javascript:void(0)">← कोर्स-घर</a>') +
      '<div class="kkb2-card head"><h2>' + M.hi + '</h2><p class="kkb2-muted">' + M.sub + '</p></div>';
    var lastKey = "";
    for (var g = M.a; g < M.b; g++) {
      var r = DAYS[g], W = weekObj(r), D = dayObj(r);
      var wkKey = r.src + "-" + r.wi;
      if (wkKey !== lastKey) {
        /* पिछले सप्ताह की अंत-पंक्तियाँ */
        if (lastKey) h += weekEndRows(lastKey);
        lastKey = wkKey;
        h += '<div class="kkb2-wkhead">' + (r.src === 1 ? "स्तर-1 · " : "स्तर-2 · ") + esc(W.hi || W.title) + '</div>';
      }
      var done = P.day[g + 1];
      h += '<button class="kkb2-day' + (done ? ' done' : '') + '" onclick="kkb2Go(\'d\',' + g + ')">' +
        '<span class="kkb2-dnum">' + (g + 1) + '</span>' +
        '<span class="kkb2-dbody"><b>' + esc(D.title) + '</b><small>' + D.items.length + ' वाक्य' + (r.src === 2 ? ' + 🎧 जाँच' : '') + '</small></span>' +
        (done ? '<span class="kkb2-ok">✅</span>' : '<span class="kkb2-go">›</span>') + '</button>';
    }
    if (lastKey) h += weekEndRows(lastKey);
    view(h);
  }
  function weekEndRows(wkKey) {
    var p = wkKey.split("-"), src = +p[0], wi = +p[1];
    var W = (src === 1 ? D1 : D2).weeks[wi], h = "";
    if (src === 2 && W.dialog) {
      h += '<button class="kkb2-day extra' + (P.dlg[wkKey] ? ' done' : '') + '" onclick="kkb2Go(\'dlg\',' + wi + ')"><span class="kkb2-dnum">🗣️</span><span class="kkb2-dbody"><b>सप्ताह का संवाद</b><small>दोस्त के साथ भूमिका बाँटकर</small></span>' + (P.dlg[wkKey] ? '<span class="kkb2-ok">✅</span>' : '<span class="kkb2-go">›</span>') + '</button>';
    }
    if (W.test) {
      h += '<button class="kkb2-day extra' + (P.tst[wkKey] ? ' done' : '') + '" onclick="kkb2Go(\'t\',' + src + ',' + wi + ')"><span class="kkb2-dnum">📞</span><span class="kkb2-dbody"><b>सप्ताह-टेस्ट: असली फ़ोन</b><small>' + esc(W.test.target) + '</small></span>' + (P.tst[wkKey] ? '<span class="kkb2-ok">✅</span>' : '<span class="kkb2-go">›</span>') + '</button>';
    }
    return h;
  }
  function monthOf(g) { return g < 30 ? 0 : g < 60 ? 1 : 2; }

  /* ---------- DAY ---------- */
  function day(g) {
    var r = DAYS[g], W = weekObj(r), D = dayObj(r), base = baseOf(g);
    var h = crumb('<a onclick="kkb2Go(\'m\',' + monthOf(g) + ')" href="javascript:void(0)">← ' + MONTHS[monthOf(g)].hi.split("—")[0] + '</a>') +
      '<div class="kkb2-card head"><div class="kkb2-daytag">दिन ' + (g + 1) + ' / 90 · ' + (r.src === 1 ? "स्तर-1" : "स्तर-2") + '</div><h2>' + esc(D.title) + '</h2>';
    if (D.tw) {
      h += '<div class="kkb2-tw"><b>📦 आज के लक्ष्य-शब्द:</b><br>';
      for (var t = 0; t < D.tw.length; t++) h += '<span>' + esc(D.tw[t][0]) + ' (' + esc(D.tw[t][1]) + ') = ' + esc(D.tw[t][2]) + '</span>';
      h += '</div>';
    }
    h += '<div class="kkb2-rulebar">पहले 🔊 सुनो → साथ-साथ बोलो → फिर "मैंने बोला" दबाओ।</div></div>';
    for (var k = 0; k < D.items.length; k++) {
      var it = D.items[k], key = g + "_" + k, id = gsu(base + k + 1);
      h += '<div class="kkb2-item">' + chipRow(it) +
        '<p class="kkb2-en"' + DIRw() + '>' + esc(it[0]) + '</p>' +
        '<p class="kkb2-dev">' + esc(it[1]) + '</p>' +
        '<p class="kkb2-hi">' + esc(it[2]) + '</p>' +
        '<div class="kkb2-row">' +
        '<button class="kkb2-btn" onclick="kkb2Hear(\'' + key + '\',this.getAttribute(\'data-t\'),false)" data-t="' + esc(it[0]) + '">🔊 सुनो</button>' +
        '<button class="kkb2-btn ghost" onclick="kkb2Hear(\'' + key + '\',this.getAttribute(\'data-t\'),true)" data-t="' + esc(it[0]) + '">🐢 धीरे</button>' +
        '<button class="kkb2-btn green" id="sp-' + key + '" disabled onclick="kkb2Spoke(\'' + key + '\')">मैंने बोला</button>' +
        '<span id="ok-' + key + '"></span></div>' +
        '<p class="kkb2-gsu">' + id + '</p></div>';
    }
    if (r.src === 2) {
      h += '<div class="kkb2-card"><h3>अब दिन की 🎧 सुनो-जवाब जाँच</h3><p>बिना पढ़े, सिर्फ़ कान से सुनकर जवाब बोलना है।</p>' +
        '<button class="kkb2-btn gold big" onclick="kkb2Go(\'lis\',' + g + ')">🎧 जाँच शुरू करें</button></div>';
    } else {
      h += '<div class="kkb2-card"><h3>दिन की दोहराई</h3><p>आँख बंद करके आज के 5 वाक्य ज़ोर से बोलो — फिर दिन पूरा करो।</p>' +
        '<button class="kkb2-btn green big" onclick="kkb2Done(' + g + ')">दिन पूरा हुआ ✅</button></div>';
    }
    view(h);
  }
  window.kkb2Done = function (g) { P.day[g + 1] = 1; save(); month(monthOf(g)); };

  /* ---------- 🎧 (स्तर-2 दिन-अंत) ---------- */
  function listen(g) {
    var r = DAYS[g], W = weekObj(r), D = dayObj(r);
    var h = crumb('<a onclick="kkb2Go(\'d\',' + g + ')" href="javascript:void(0)">← दिन ' + (g + 1) + '</a>') +
      '<div class="kkb2-card head"><h2>🎧 सुनो-जवाब जाँच</h2><p>🔊 दबाओ — सवाल <b>सिर्फ़ कान से</b> सुनो (पढ़ो मत) → ज़ोर से जवाब बोलो → फिर "जवाब देखें" से मिलाओ।</p></div>';
    for (var p = 0; p < W.listen.length; p++) {
      var q = W.listen[p][0], a = W.listen[p][1], kk = "lis" + g + "_" + p;
      h += '<div class="kkb2-item"><p class="kkb2-hi">सवाल-' + (p + 1) + '</p>' +
        '<div class="kkb2-row"><button class="kkb2-btn" onclick="kkb2Hear(\'' + kk + '\',this.getAttribute(\'data-t\'),false)" data-t="' + esc(q) + '">🔊 सवाल सुनो</button>' +
        '<button class="kkb2-btn ghost" id="sp-' + kk + '" disabled onclick="kkb2Show(\'' + kk + '\')">जवाब देखें</button></div>' +
        '<div id="ans-' + kk + '" style="display:none"><p class="kkb2-en"' + DIRw() + '>' + esc(a.replace(/^\(बोलो\)\s*/, "")) + '</p>' +
        '<button class="kkb2-btn green" onclick="say2(this.getAttribute(\'data-t\'))" data-t="' + esc(a) + '">🔊 जवाब सुनो</button></div></div>';
    }
    h += '<div class="kkb2-card"><h3>🎯 आज का बोलने-अभ्यास</h3><p>' + esc(D.drill.hi) + '</p>';
    for (var rr = 0; rr < D.drill.rows.length; rr++) {
      h += '<p class="kkb2-dline">';
      for (var c = 0; c < D.drill.rows[rr].length; c++) h += (c ? " → " : "") + "<b>" + esc(D.drill.rows[rr][c]) + "</b>";
      h += "</p>";
    }
    h += '<button class="kkb2-btn green big" onclick="kkb2Done(' + g + ')">दिन पूरा हुआ ✅</button></div>';
    view(h);
  }
  window.kkb2Show = function (kk) { var el = document.getElementById("ans-" + kk); if (el) el.style.display = "block"; };

  /* ---------- 🗣️ संवाद (स्तर-2) ---------- */
  function dialog(wi) {
    var W = D2.weeks[wi], back = lastGOf(2, wi);
    var h = crumb('<a onclick="kkb2Go(\'m\',' + monthOf(back) + ')" href="javascript:void(0)">← महीना</a>') +
      '<div class="kkb2-card head"><h2>🗣️ ' + esc(W.hi) + ' — संवाद</h2><p>दोस्त/परिवार के साथ भूमिका बाँटकर पूरा संवाद बोलो। हर पंक्ति 🔊 से सुन सकते हो।</p>';
    for (var p = 0; p < W.dialog.length; p++) {
      h += '<p class="kkb2-dline"><b>' + esc(W.dialog[p][0]) + ':</b> ' + esc(W.dialog[p][1]) +
        ' <button class="kkb2-btn mini" onclick="say2(this.getAttribute(\'data-t\'))" data-t="' + esc(W.dialog[p][1]) + '">🔊</button></p>';
    }
    h += '<button class="kkb2-btn green big" onclick="kkb2DlgDone(' + wi + ')">संवाद बोल लिया ✅</button></div>';
    view(h);
  }
  window.kkb2DlgDone = function (wi) { P.dlg["2-" + wi] = 1; save(); month(monthOf(lastGOf(2, wi))); };
  function lastGOf(src, wi) { for (var g = DAYS.length - 1; g >= 0; g--) if (DAYS[g].src === src && DAYS[g].wi === wi) return g; return 0; }

  /* ---------- 📞 टेस्ट (दोनों स्तर) ---------- */
  function test(src, wi) {
    var W = (src === 1 ? D1 : D2).weeks[wi], T = W.test, back = lastGOf(src, wi);
    var h = crumb('<a onclick="kkb2Go(\'m\',' + monthOf(back) + ')" href="javascript:void(0)">← महीना</a>') +
      '<div class="kkb2-card head"><h2>📞 ' + esc(T.target) + '</h2><p>' + esc(T.goal) + '</p></div><div class="kkb2-card"><h3>सहारा-पंक्तियाँ:</h3>';
    for (var p = 0; p < T.lines.length; p++) {
      h += '<div class="kkb2-item"><p class="kkb2-en"' + DIRw() + '>' + esc(T.lines[p][0]) + '</p><p class="kkb2-dev">' + esc(T.lines[p][1]) + '</p>' +
        '<button class="kkb2-btn" onclick="say2(this.getAttribute(\'data-t\'))" data-t="' + esc(T.lines[p][0]) + '">🔊 सुनो</button></div>';
    }
    var msg = encodeURIComponent((EN ? "ACS Spoken English (90-दिन)" : "ACS काम की भाषा — " + LANG.label + " (90-दिन)") + " — " + (src === 1 ? "स्तर-1" : "स्तर-2") + " सप्ताह-" + W.n + " का टेस्ट पूरा किया। (" + T.target + ")");
    h += '<a class="kkb2-btn gold big" href="https://wa.me/' + TRAINER_WA + '?text=' + msg + '" onclick="kkb2TstDone(' + src + ',' + wi + ')">✅ टेस्ट पूरा — WhatsApp पर बताएँ</a></div>';
    view(h);
  }
  window.kkb2TstDone = function (src, wi) { P.tst[src + "-" + wi] = 1; save(); };

  /* ---------- ⭐ ज़रूर-बोलो ---------- */
  function must() {
    var h = crumb('<a onclick="kkb2Go(\'home\')" href="javascript:void(0)">← कोर्स-घर</a>') +
      '<div class="kkb2-card head"><h2>⭐ ज़रूर-बोलो अभ्यास</h2><p>ये ' + A_TOTAL + ' वाक्य सबसे पहले ज़ुबान पर चढ़ाओ — रोज़ की जान यही हैं। 🔊 सुनो, साथ बोलो।</p></div>';
    for (var w2 = 0; w2 < D2.weeks.length; w2++) {
      var head = 0;
      for (var d2 = 0; d2 < D2.weeks[w2].days.length; d2++) {
        var IT = D2.weeks[w2].days[d2].items;
        for (var k2 = 0; k2 < IT.length; k2++) if (IT[k2][4] === "A") {
          if (!head) { h += '<div class="kkb2-wkhead">' + esc(D2.weeks[w2].hi) + '</div>'; head = 1; }
          h += '<div class="kkb2-item"><p class="kkb2-en"' + DIRw() + '>' + esc(IT[k2][0]) + '</p><p class="kkb2-dev">' + esc(IT[k2][1]) + '</p><p class="kkb2-hi">' + esc(IT[k2][2]) + '</p>' +
            '<button class="kkb2-btn" onclick="say2(this.getAttribute(\'data-t\'))" data-t="' + esc(IT[k2][0]) + '">🔊</button></div>';
        }
      }
    }
    view(h);
  }

  window.kkb2Go = function (v, a, b) {
    if (v === "home") home(); else if (v === "m") month(a); else if (v === "d") day(a);
    else if (v === "lis") listen(a); else if (v === "dlg") dialog(a); else if (v === "t") test(a, b); else if (v === "must") must();
  };
  home();
})();
