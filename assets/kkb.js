/* ============================================================
   /assets/kkb.js — v0.2 (26-Aug-2026) · "ACS काम की भाषा" कोर्स-इंजन — भाषा-निरपेक्ष (एक इंजन, हर भाषा)
   v0.8: फ़ारसी (kkb_fa_data.js) — script "persian": अरबी जैसा RTL (DIRw का दायरा बढ़ाया) — फ़ारसी अरबी-लिपि पर आधारित है
         पर چ/پ/ژ/گ अतिरिक्त अक्षर रखती है; माइक/विराम-चिह्न नियम अरबी वाले ही पर्याप्त (्।/?/, common)।
   v0.7: कोरियाई (kkb_ko_data.js) — script "korean": हांगुल शब्दों में स्पेस होते हैं (जापानी/चीनी से अलग), पर एक शब्द के भीतर कई अक्षर-ब्लॉक (음절) एक-साथ लिखे होते हैं
         जिन्हें माइक-पहचान अलग-अलग लौटा सकती है — इसलिए यहाँ भी अक्षर-दर-अक्षर मिलान सुरक्षित है (word-split से ज़्यादा सहनशील)।
   v0.6: norm() में ZWNJ/ZWJ (U+200C/U+200D) हटाना — तेलुगु में loanword+प्रत्यय (డ్రైవర్‌ని) के लिए ZWNJ सही वर्तनी है,
         पर speech-recognizer उसे नहीं लौटाता; दोनों तरफ़ हटाकर मिलान (सब भाषाओं पर सामान्य नियम)।
   v0.5: जापानी (kkb_ja_data.js) — script "japanese": अक्षर-दर-अक्षर मिलान ("han" जैसा — जापानी में भी शब्दों के बीच space नहीं);
         रोमाजी कोष्ठक में — spoken()/norm() दोनों उसे पहले ही काट देते हैं (चीनी-pinyin वाला नियम सामान्य है, भाषा-विशेष नहीं)।
   v0.4: अरबी (kkb_ar_data.js) — script "arabic": RTL प्रदर्शन (DIRw हेल्पर) + माइक-जाँच में अरबी विराम-चिह्न भी हटें।
   v0.3: चीनी/Mandarin (kkb_zh_data.js) — script "han": अक्षर-दर-अक्षर मिलान; spoken() अंत का (pinyin) आवाज़/माइक से काटे;
         दिन-7 के data-खाने testShort/testStep1/testStep2/check1 (जहाँ IVR नहीं)।
   v0.2: भाषा-खाना data से (lang.code/label/tts/sr/script) — English (kkb_data.js) व कन्नड (kkb_kn_data.js) एक ही इंजन;
         वही ACS-GSU id दोनों भाषाओं में = एक intent (साझा-भाषा नियम)। प्रगति-कुंजी भाषा-वार।
   data: window.KKB_DATA (पेज अपनी भाषा की एक data-फ़ाइल बुलाए) · सजावट: /assets/kkb.css
   पेज: /courses/hi/bhasha/<भाषा>/ (english · kannada · mandarin · spanish · arabic) — परिवार-folder, 26-Aug
   device-local: प्रगति सिर्फ़ फ़ोन में (localStorage) — server पर कुछ नहीं (DPDP)।
   आवाज़: browser की speechSynthesis (en-IN) — असली course में trainer-recording (audio-खाना data में आरक्षित)।
   माइक-जाँच: SpeechRecognition हो तो; न हो तो ईमानदार संदेश (गूँगा-fallback निषेध)।
   ES5-रूप babel से बना (Android-8 Chrome) — स्रोत generator/data/kkb.src.js।
   ============================================================ */
(function () {
  "use strict";
  var DATA = window.KKB_DATA;
  var ROOT = document.getElementById("kkb-app");
  if (!DATA || !ROOT) return;

  /* ---- सेटिंग (ACS भरे) ---- */
  var TRAINER_WA = "919431210092"; /* trainer/ACS का WhatsApp — दिन-7 स्कोर भेजने हेतु */
  var PASS_MARK = 7;
  var LANG = DATA.lang || { code: "en", label: "English", tts: "en-IN", sr: "en-IN", script: "latin" };
  var L = LANG.label, BRAND = DATA.brand || "ACS काम की भाषा", SUB = DATA.sub || (L + " for Work");
  var HELP = DATA.help || [];
  var STORE_KEY = "acs_kkb_" + LANG.code + "_v01";
  function spoken(t) { return String(t).replace(/\s*\([^()]*\)\s*$/, ""); } /* अंत का (pinyin/नोट) आवाज़-माइक में नहीं */
  var RTL = LANG.script === "arabic" || LANG.script === "persian";
  function DIRw() { return RTL ? ' dir="rtl"' : ""; } /* लक्ष्य-भाषा वाले खाने पर — देवनागरी/हिंदी हमेशा LTR रहें */
  ROOT.setAttribute("data-script", LANG.script || "latin");

  /* ---- ढाँचा ---- */
  ROOT.innerHTML = '<div class="kkb-bar" id="kkb-bar"></div><div class="kkb-main" id="kkb-main"></div>' +
    '<div class="kkb-foot">' + BRAND + ' · ' + SUB + ' · demo संस्करण 0.1 · 500 वाक्य · <button type="button" id="kkb-reset">प्रगति मिटाएँ</button></div>';
  var $ = function (id) { return document.getElementById(id); };

  /* ---- प्रगति (device-local) ---- */
  var P = {};
  try { P = JSON.parse(localStorage.getItem(STORE_KEY) || "{}"); } catch (e) { P = {}; }
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(P)); } catch (e) { } }
  $("kkb-reset").onclick = function () { if (confirm("सारी प्रगति मिटा दें?")) { P = {}; save(); go("#home"); render(); } };
  var showEN = true;

  function gsuId(w, d, i) { var n = (w - 1) * 100 + (d - 1) * 20 + i + 1; return "ACS-GSU-" + ("000000" + n).slice(-6); }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function jsArg(s) { return JSON.stringify(String(s)).replace(/"/g, "&quot;"); }

  /* ---- आवाज़ ---- */
  var voice = null;
  function pickVoice() {
    if (!("speechSynthesis" in window)) return;
    var vs = speechSynthesis.getVoices(), base = LANG.tts.split("-")[0];
    voice = vs.filter(function (v) { return v.lang === LANG.tts || v.lang === LANG.tts.replace("-", "_"); })[0] ||
      vs.filter(function (v) { return v.lang.indexOf(base) === 0; })[0] || null;
    if (!voice && base === "en") voice = vs.filter(function (v) { return /^en/.test(v.lang); })[0] || null;
  }
  if ("speechSynthesis" in window) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function say(text, slow) {
    if (!("speechSynthesis" in window)) { alert("इस फ़ोन/ब्राउज़र में आवाज़ नहीं है। Chrome में खोलें।"); return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(spoken(text));
    u.lang = LANG.tts; if (voice) u.voice = voice; u.rate = slow ? 0.7 : 0.95; u.pitch = 1;
    speechSynthesis.speak(u);
  }
  window.kkbSay = say;

  /* ---- माइक-जाँच ---- */
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  function norm(s) {
    s = spoken(s).toLowerCase().replace(/[\u200c\u200d]/g, "").replace(/[.,!?;:"'“”‘’()\-।॥_。，！？、；：؟،؛]/g, " "); /* ZWNJ/ZWJ (तेलुगु/मराठी/बांग्ला loanword-जोड़) माइक-मिलान से पहले हटें */ /* अंत में अरबी ؟ (सवाल) ، (कॉमा) ؛ (सेमीकोलन) भी */
    if (LANG.script === "han" || LANG.script === "japanese" || LANG.script === "korean") return s.replace(/\s+/g, "").split("").filter(Boolean); /* चीनी/जापानी/कोरियाई: अक्षर-दर-अक्षर मिलान */
    return s.split(/\s+/).filter(Boolean);
  }
  function similarity(a, b) {
    var A = norm(a), B = norm(b); if (!A.length) return 0;
    var hit = 0, used = {};
    A.forEach(function (w) { for (var k = 0; k < B.length; k++) { if (B[k] === w && !used[k]) { hit++; used[k] = 1; break; } } });
    return hit / Math.max(A.length, B.length);
  }
  window.kkbListen = function (target) {
    var out = $("kkb-heard"); if (!out) return; out.style.display = "block";
    if (!SR) { out.className = "kkb-heard"; out.textContent = "इस ब्राउज़र में माइक से जाँच नहीं हो सकती। Android Chrome में खोलें।"; return; }
    var r = new SR(); r.lang = LANG.sr; r.interimResults = false; r.maxAlternatives = 3;
    out.className = "kkb-heard"; out.textContent = "🎤 सुन रहा हूँ… अब बोलिए।";
    r.onresult = function (e) {
      var best = 0, heard = "", res = e.results[0];
      for (var i = 0; i < res.length; i++) { var s = similarity(target, res[i].transcript); if (s > best) { best = s; heard = res[i].transcript; } }
      if (best >= 0.7) { out.className = "kkb-heard kkb-ok"; out.textContent = "✔ बहुत अच्छा! सुना: “" + heard + "”"; }
      else if (best >= 0.4) { out.className = "kkb-heard"; out.textContent = "लगभग ठीक। सुना: “" + heard + "” — एक बार फिर सुनकर बोलिए।"; }
      else { out.className = "kkb-heard kkb-bad"; out.textContent = "फिर से कोशिश कीजिए। सुना: “" + (heard || "कुछ नहीं") + "”"; }
    };
    r.onerror = function () { out.className = "kkb-heard kkb-bad"; out.textContent = "माइक काम नहीं कर पाया। माइक की अनुमति दीजिए और फिर कोशिश कीजिए।"; };
    r.start();
  };

  /* ---- routing ---- */
  function go(h) { location.hash = h; }
  window.kkbGo = go;
  window.kkbRender = render; /* check-robot (dev_kkb_check) के लिए */
  window.addEventListener("hashchange", render);
  function render() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    var h = (location.hash || "#home").slice(1), m;
    if (h === "home") { renderHome(); }
    else if ((m = h.match(/^w(\d)$/))) { renderWeek(+m[1]); }
    else if ((m = h.match(/^w(\d)d(\d)$/))) { renderDay(+m[1], +m[2]); }
    else if ((m = h.match(/^w(\d)p$/))) { renderPractice(+m[1]); }
    else if ((m = h.match(/^w(\d)t$/))) { renderTest(+m[1]); }
    else { renderHome(); }
    var top = ROOT.getBoundingClientRect().top + window.pageYOffset - 8;
    if (window.pageYOffset > top) window.scrollTo(0, top);
  }
  function bar(title, sub, back) {
    $("kkb-bar").innerHTML = (back ? '<button type="button" class="kkb-back" onclick="kkbGo(\'' + back + '\')" aria-label="पीछे">‹</button>' : "") +
      '<div><div class="kkb-brand">' + title + '</div>' + (sub ? '<div class="kkb-sub">' + sub + '</div>' : "") + '</div><div class="kkb-stripe"></div>';
  }
  function weekDone(w) { var c = 0; for (var d = 1; d <= 5; d++) if (P["w" + w + "d" + d]) c++; if (P["w" + w + "p"]) c++; if (P["w" + w + "t"] !== undefined) c++; return c; }

  /* ---- होम ---- */
  function renderHome() {
    bar(BRAND, SUB);
    var weeks = DATA.weeks.map(function (w) {
      var done = weekDone(w.n);
      return '<button type="button" class="kkb-wk" onclick="kkbGo(\'#w' + w.n + '\')"><div class="kkb-n">' + w.n + '</div>' +
        '<div style="flex:1"><div class="kkb-t">' + w.title + '</div><div class="kkb-d">' + w.hi + ' · 100 वाक्य</div>' +
        '<div class="kkb-bar2"><i style="width:' + Math.round(done / 7 * 100) + '%"></i></div></div><div class="kkb-arrow">›</div></button>';
    }).join("");
    $("kkb-main").innerHTML =
      '<div class="kkb-hero"><div class="kkb-demo">DEMO</div><div class="kkb-eyebrow">Applied Computer School</div>' +
      '<h1>काम की भाषा</h1><div class="kkb-thesis">' + L + ' पढ़ो मत। सुनो और बोलो।</div>' +
      '<p style="opacity:.88;margin:0">500 वाक्य · 5 सप्ताह · हर वाक्य देवनागरी में, हिंदी अर्थ और आवाज़ के साथ। 5वीं पास भी आज से बोलना शुरू कर सकता है।</p></div>' +
      '<div class="kkb-steps"><div class="kkb-step"><b>👁️</b><span>देवनागरी में देखो</span></div><div class="kkb-step"><b>🔊</b><span>आवाज़ सुनो</span></div><div class="kkb-step"><b>🗣️</b><span>ज़ोर से बोलो</span></div></div>' +
      '<p class="kkb-small kkb-muted" style="margin:6px 2px 16px">हर सप्ताह: दिन 1–5 में 20-20 वाक्य · दिन 6 अभ्यास · दिन 7 फ़ोन पर टेस्ट</p>' +
      weeks +
      '<div class="kkb-card" style="margin-top:14px"><b>यह demo है।</b> <span class="kkb-muted kkb-small">वाक्य अभी प्रारंभिक मसौदा हैं। असली course के वाक्य research और ' + L + ' जानने वाले trainer की जाँच के बाद तय होंगे। आवाज़ इस समय फ़ोन की अपनी ' + L + ' आवाज़ है। असली course में trainer की रिकॉर्डिंग होगी।</span></div>';
  }

  /* ---- सप्ताह ---- */
  function renderWeek(w) {
    var W = DATA.weeks[w - 1]; if (!W) return renderHome();
    bar("सप्ताह " + w + " · " + W.title, W.hi, "#home");
    var days = "";
    W.days.forEach(function (d, i) {
      var k = "w" + w + "d" + (i + 1);
      days += '<button type="button" class="kkb-day" onclick="kkbGo(\'#' + k + '\')"><div class="kkb-dn">दिन<br>' + (i + 1) + '</div>' +
        '<div><div class="kkb-dt">' + d.title + '</div><div class="kkb-ds">20 वाक्य · लगभग 10 मिनट</div></div>' + (P[k] ? '<div class="kkb-done">✔</div>' : "") + '</button>';
    });
    days += '<button type="button" class="kkb-day kkb-practice" onclick="kkbGo(\'#w' + w + 'p\')"><div class="kkb-dn">दिन<br>6</div><div><div class="kkb-dt">अभ्यास</div><div class="kkb-ds">इस सप्ताह के 100 वाक्यों में से 20 — बिना देखे बोलो</div></div>' + (P["w" + w + "p"] ? '<div class="kkb-done">✔</div>' : "") + '</button>';
    days += '<button type="button" class="kkb-day kkb-test" onclick="kkbGo(\'#w' + w + 't\')"><div class="kkb-dn">📞</div><div><div class="kkb-dt">दिन 7 · फ़ोन टेस्ट</div><div class="kkb-ds">' + (DATA.testShort || ('अपने मोबाइल से customer care को कॉल करके ' + L + ' में बात')) + '</div></div>' + (P["w" + w + "t"] !== undefined ? '<div class="kkb-done">' + P["w" + w + "t"] + '/10</div>' : "") + '</button>';
    $("kkb-main").innerHTML = '<h1>' + W.title + '</h1><p class="kkb-muted">' + W.hi + '। एक दिन में एक पाठ। पहले सुनो, फिर ज़ोर से बोलो, फिर अगला।</p><div class="kkb-days">' + days + '</div>';
  }

  /* ---- दिन (20 वाक्य) ---- */
  var idx = 0, listMode = false;
  function renderDay(w, d) {
    var W = DATA.weeks[w - 1]; if (!W || !W.days[d - 1]) return renderHome();
    bar("सप्ताह " + w + " · दिन " + d, W.days[d - 1].title, "#w" + w);
    idx = 0; listMode = false; drawCard(w, d);
  }
  window.kkbCard = function (w, d, delta, list) { if (list !== undefined) listMode = list; idx += delta; drawCard(w, d); };
  window.kkbToggleEN = function (w, d) { showEN = !showEN; drawCard(w, d); };
  window.kkbDone = function (key, back) { P[key] = true; save(); go(back); };
  function drawCard(w, d) {
    var D = DATA.weeks[w - 1].days[d - 1], it = D.items[idx], dir = it[3];
    if (listMode) return drawList(w, d);
    var chip = dir === "S" ? '<span class="kkb-chip kkb-S">🗣️ बोलो <small>· आप कहिए</small></span>' : '<span class="kkb-chip kkb-L">👂 सुनो <small>· सामने वाला कहता है</small></span>';
    $("kkb-main").innerHTML =
      '<div class="kkb-counter"><span>' + D.title + '</span><span><b>' + (idx + 1) + '</b> / 20</span></div>' +
      '<div class="kkb-prog"><i style="width:' + Math.round((idx + 1) / 20 * 100) + '%"></i></div>' +
      '<div class="kkb-sent">' + chip +
      '<div class="kkb-dev">' + esc(it[1]) + '</div><div class="kkb-hi">' + esc(it[2]) + '</div>' +
      '<div class="kkb-en' + (showEN ? "" : " kkb-hidden") + '"' + DIRw() + '>' + esc(it[0]) + '</div>' +
      '<div class="kkb-speak"><button type="button" class="kkb-big kkb-slow" onclick="kkbSay(' + jsArg(it[0]) + ',true)"><span class="kkb-ic">🔊</span>धीरे सुनो</button>' +
      '<button type="button" class="kkb-big" onclick="kkbSay(' + jsArg(it[0]) + ',false)"><span class="kkb-ic">🔊</span>सुनो</button></div>' +
      '<button type="button" class="kkb-btn kkb-ghost kkb-mic" onclick="kkbListen(' + jsArg(it[0]) + ')">🎤 बोलकर जाँचो</button>' +
      '<div id="kkb-heard" class="kkb-heard" style="display:none"></div></div>' +
      '<div class="kkb-nav"><button type="button" class="kkb-btn kkb-ghost"' + (idx === 0 ? " disabled" : "") + ' onclick="kkbCard(' + w + ',' + d + ',-1)">‹ पिछला</button>' +
      (idx < 19 ? '<button type="button" class="kkb-btn kkb-dark" onclick="kkbCard(' + w + ',' + d + ',1)">अगला ›</button>'
        : '<button type="button" class="kkb-btn kkb-primary" onclick="kkbDone(\'w' + w + 'd' + d + '\',\'#w' + w + '\')">✔ आज का पाठ पूरा</button>') + '</div>' +
      '<div class="kkb-tools"><button type="button" onclick="kkbToggleEN(' + w + ',' + d + ')">' + (showEN ? L + " छिपाओ" : L + " दिखाओ") + '</button>' +
      '<button type="button" onclick="kkbCard(' + w + ',' + d + ',0,true)">सभी 20 वाक्य देखो</button><span class="kkb-muted">' + gsuId(w, d, idx) + '</span></div>';
  }
  function drawList(w, d) {
    var D = DATA.weeks[w - 1].days[d - 1];
    $("kkb-main").innerHTML = '<div class="kkb-counter"><span>' + D.title + '</span><button type="button" onclick="kkbCard(' + w + ',' + d + ',0,false)">एक-एक करके ›</button></div>' +
      '<div class="kkb-list">' + D.items.map(function (it) {
        return '<div class="kkb-li"><div class="kkb-tag kkb-' + it[3] + '">' + (it[3] === "S" ? "बोलो" : "सुनो") + '</div><div><div class="kkb-l1">' + esc(it[1]) + '</div><div class="kkb-l2">' + esc(it[2]) + '</div><div class="kkb-l3' + (showEN ? "" : " kkb-hidden") + '"' + DIRw() + '>' + esc(it[0]) + '</div></div>' +
          '<button type="button" class="kkb-sp" onclick="kkbSay(' + jsArg(it[0]) + ',false)" aria-label="सुनो">🔊</button></div>';
      }).join("") + '</div>' +
      '<div class="kkb-nav"><button type="button" class="kkb-btn kkb-primary" onclick="kkbDone(\'w' + w + 'd' + d + '\',\'#w' + w + '\')">✔ आज का पाठ पूरा</button></div>';
  }

  /* ---- अभ्यास (दिन 6) ---- */
  var PR = null;
  var EX = DATA.weeks[0].days[2].items[2]; /* "मुझे पानी चाहिए" (ACS-GSU-000043) — उदाहरण, हर भाषा में वही id */
  function renderPractice(w) {
    var W = DATA.weeks[w - 1]; if (!W) return renderHome();
    bar("सप्ताह " + w + " · दिन 6", "अभ्यास", "#w" + w); PR = null;
    $("kkb-main").innerHTML = '<h1>अभ्यास</h1><p class="kkb-muted">इस सप्ताह के 100 वाक्यों में से 20 वाक्य बिना देखे। जवाब देकर खुद बताइए कि सही था या नहीं।</p>' +
      '<div class="kkb-modes"><button type="button" class="kkb-mode" onclick="kkbPractice(' + w + ',\'A\')"><span class="kkb-ic">🗣️</span><div><b>हिंदी देखो → ' + L + ' बोलो</b><span>जैसे: “' + esc(EX[2]) + '” → आप कहें: ' + esc(EX[0]) + '</span></div></button>' +
      '<button type="button" class="kkb-mode" onclick="kkbPractice(' + w + ',\'B\')"><span class="kkb-ic">👂</span><div><b>' + L + ' सुनो → मतलब बताओ</b><span>आवाज़ सुनिए, हिंदी में मतलब बोलिए, फिर जवाब देखिए।</span></div></button></div>';
  }
  window.kkbPractice = function (w, mode) {
    var pool = []; DATA.weeks[w - 1].days.forEach(function (d) { d.items.forEach(function (it) { pool.push(it); }); });
    if (mode === "A") pool = pool.filter(function (it) { return it[3] === "S"; });
    pool.sort(function () { return Math.random() - .5; });
    PR = { w: w, mode: mode, q: pool.slice(0, 20), i: 0, ok: 0, shown: false };
    drawPractice();
  };
  window.kkbPr = function (act) {
    if (!PR) return;
    if (act === "show") PR.shown = true;
    else { if (act === "ok") PR.ok++; PR.i++; PR.shown = false; }
    drawPractice();
  };
  function drawPractice() {
    var w = PR.w, mode = PR.mode, q = PR.q, i = PR.i, ok = PR.ok;
    if (i >= q.length) {
      $("kkb-main").innerHTML = '<div class="kkb-card kkb-score"><div class="kkb-n">' + ok + '<span style="font-size:24px;color:#475569"> / ' + q.length + '</span></div><div class="kkb-l">सही जवाब</div>' +
        '<p style="margin-top:12px">' + (ok >= 14 ? "बहुत अच्छा। आप फ़ोन टेस्ट के लिए तैयार हैं।" : "कोई बात नहीं। दिन 1–5 के वाक्य एक बार फिर सुनिए और कल फिर अभ्यास कीजिए।") + '</p>' +
        '<div class="kkb-grid2" style="margin-top:14px"><button type="button" class="kkb-btn kkb-ghost" onclick="kkbPractice(' + w + ',\'' + mode + '\')">फिर से</button><button type="button" class="kkb-btn kkb-primary" onclick="kkbDone(\'w' + w + 'p\',\'#w' + w + '\')">✔ पूरा</button></div></div>';
      return;
    }
    var it = q[i];
    var prompt = mode === "A" ? '<div class="kkb-prompt">' + esc(it[2]) + '</div><p class="kkb-muted">अब ' + L + ' में ज़ोर से बोलिए।</p>'
      : '<button type="button" class="kkb-btn kkb-primary" onclick="kkbSay(' + jsArg(it[0]) + ',false)">🔊 सुनो</button><p class="kkb-muted" style="margin-top:10px">सुनकर हिंदी में मतलब बोलिए।</p>';
    var answer = PR.shown ? '<div class="kkb-answer"><div class="kkb-dev" style="font-size:24px;margin:6px 0">' + esc(it[1]) + '</div><div class="kkb-hi">' + esc(it[2]) + '</div><div class="kkb-en"' + DIRw() + '>' + esc(it[0]) + '</div>' +
      '<div class="kkb-grid2" style="margin-top:14px"><button type="button" class="kkb-btn kkb-ghost" onclick="kkbPr(\'no\')">✘ गलत था</button><button type="button" class="kkb-btn kkb-primary" onclick="kkbPr(\'ok\')">✔ सही था</button></div></div>'
      : '<div class="kkb-nav"><button type="button" class="kkb-btn kkb-dark" onclick="kkbPr(\'show\')">जवाब देखो</button></div>';
    $("kkb-main").innerHTML = '<div class="kkb-counter"><span>' + (mode === "A" ? "हिंदी → " + L : L + " → हिंदी") + '</span><span><b>' + (i + 1) + '</b> / ' + q.length + ' · सही ' + ok + '</span></div>' +
      '<div class="kkb-prog"><i style="width:' + Math.round(i / q.length * 100) + '%"></i></div><div class="kkb-sent" style="min-height:0">' + prompt + answer + '</div>';
  }

  /* ---- फ़ोन-टेस्ट (दिन 7) ---- */
  var CHECKS = [DATA.check1 || ("IVR में " + L + " विकल्प चुना"), "अभिवादन " + L + " में किया", "अपना नाम " + L + " में बताया", "अपनी बात या समस्या " + L + " में कही", "सामने वाले की बात समझ में आई", "न समझने पर " + L + " में दोहराने को कहा", "हिंदी में बदलने की ज़रूरत नहीं पड़ी (या पड़ी तो फिर " + L + " में लौटा)", "नंबर, राशि या तारीख़ समझ में आई", "अंत में " + L + " में धन्यवाद कहा", "कॉल पूरी होने तक बात की, बीच में नहीं काटी"];
  function renderTest(w) {
    var W = DATA.weeks[w - 1]; if (!W) return renderHome();
    var T = W.test, prev = P["w" + w + "t"];
    bar("सप्ताह " + w + " · दिन 7", "फ़ोन टेस्ट", "#w" + w);
    var wa = "https://wa.me/" + TRAINER_WA + "?text=" + encodeURIComponent(BRAND + " (" + SUB + ") — सप्ताह " + w + " फ़ोन टेस्ट। मेरा स्कोर: __/10। कॉल का voice note साथ भेज रहा हूँ।");
    var helpTxt = HELP.map(function (h) { return "<b>“" + esc(h[1]) + "”</b>"; }).join(" या ");
    $("kkb-main").innerHTML = '<h1>फ़ोन टेस्ट</h1><p class="kkb-muted">आज असली इंसान से ' + L + ' में बात। सिर्फ़ अपना फ़ोन चाहिए।</p>' +
      '<div class="kkb-tstep"><div class="kkb-k">1</div><div><b>कॉल कीजिए:</b> ' + T.target + '।<br><span class="kkb-small kkb-muted">' + (DATA.testStep1 || 'कॉल का सच्चा मक़सद रखिए — customer care का समय व्यर्थ न करें।') + '</span></div></div>' +
      '<div class="kkb-tstep"><div class="kkb-k">2</div><div>' + (DATA.testStep2 || ('<b>IVR में ' + L + ' चुनिए।</b> <span class="kkb-small kkb-muted">फ़ोन उठते ही भाषा-चुनाव की आवाज़ आती है — उसमें ' + L + ' वाला नंबर दबाइए।</span>')) + '</div></div>' +
      '<div class="kkb-tstep"><div class="kkb-k">3</div><div><b>ये वाक्य बोलिए।</b> <span class="kkb-small kkb-muted">' + T.goal + '</span></div></div>' +
      '<div class="kkb-callbox">' + T.lines.map(function (l) {
        return '<div class="kkb-line"><div class="kkb-tx"><b>' + esc(l[1]) + '</b><span' + DIRw() + '>' + esc(l[0]) + '</span></div><button type="button" class="kkb-sp" onclick="kkbSay(' + jsArg(l[0].replace(/___/g, "Ram")) + ',true)" aria-label="सुनो">🔊</button></div>';
      }).join("") + '</div>' +
      '<div class="kkb-note">समझ न आए तो घबराइए नहीं: ' + helpTxt + ' — यही असली test है।</div>' +
      '<div class="kkb-tstep"><div class="kkb-k">4</div><div><b>कॉल के बाद ईमानदारी से टिक कीजिए।</b></div></div>' +
      '<div class="kkb-card" style="padding:6px 16px">' + CHECKS.map(function (c, i) { return '<div class="kkb-check"><input type="checkbox" id="kkb-c' + i + '" onchange="kkbScore(' + w + ')"><label for="kkb-c' + i + '">' + c + '</label></div>'; }).join("") + '</div>' +
      '<div id="kkb-res" class="kkb-result" style="display:none"></div>' +
      '<div class="kkb-tstep" style="margin-top:16px"><div class="kkb-k">5</div><div><b>Trainer को भेजिए:</b> अपना स्कोर और कॉल का छोटा voice note (कॉल के बाद बोलकर बताइए कि क्या हुआ)।</div></div>' +
      '<a class="kkb-btn kkb-dark" href="' + wa + '" target="_blank" rel="noopener">WhatsApp पर trainer को भेजें</a>' +
      (prev !== undefined ? '<p class="kkb-small kkb-muted" style="margin-top:12px;text-align:center">पिछला स्कोर: ' + prev + '/10</p>' : "");
  }
  window.kkbScore = function (w) {
    var s = 0; CHECKS.forEach(function (c, i) { if ($("kkb-c" + i).checked) s++; });
    var r = $("kkb-res"); r.style.display = "block";
    r.className = "kkb-result " + (s >= PASS_MARK ? "kkb-pass" : "kkb-fail");
    r.textContent = s >= PASS_MARK ? s + "/10 — पास! अगला सप्ताह शुरू कीजिए।" : s + "/10 — अभी " + PASS_MARK + " चाहिए। दिन 6 का अभ्यास फिर कीजिए और कल दोबारा कॉल।";
    P["w" + w + "t"] = s; save();
  };

  render();
})();
