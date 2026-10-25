/* acs-bolo.js v1.0 · 25-Oct-2026 — 🎙️ बोलो-अभ्यास (साझा component · परत-5)
   Founder-माँग (25-Oct): पन्ना सिर्फ़ सुनाए नहीं, सुने भी — विद्यार्थी बोले, माइक सुने, स्क्रीन पर टाइप हो,
   हर शब्द: 🟢 हरा = सही बोला · 🔴 लाल = ग़लत (कुछ और सुनाई दिया) · ⚫ काला = बोला ही नहीं;
   सही/ग़लत/छूटा % + गति (शब्द प्रति मिनट) + पिछली 5 कोशिशें (सिर्फ़ फ़ोन में)।
   एक ही फ़ाइल हर जगह: व्याकरण · चित्र-पुस्तक · KKB · workbook-पन्ने।
   उपयोग: ACSBolo.open(बटन, {t:"वाक्य", asr:"en-IN", tts:"en-US", code:"s0015", host:पंक्ति-तत्व})
   ईमानदार सीमाएँ (पन्ने पर भी लिखी): यह शब्द-पहचान है, बारीक उच्चारण-जाँच नहीं · इंटरनेट चाहिए ·
   जहाँ browser में आवाज़-पहचान नहीं, वहाँ "रिकॉर्ड करो → अपनी आवाज़ सुनो" रास्ता।
   निजता: आवाज़ सिर्फ़ browser की आवाज़-सेवा तक; ACS न सहेजता है, न सुनता है। ES5 (Android 8)। */
(function (G) {
  "use strict";
  var VER = "1.0";
  var LS_OK = "acs_mic_ok_v1", LS_H = "acs_bolo_v1";

  /* ---------------- शुद्ध गणित (robot भी यही जाँचता है) ---------------- */
  var NUM = { zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
    eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
    nineteen: 19, twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90 };
  /* एक-जैसी आवाज़ वाले अंग्रेज़ी शब्द — बोलने में भेद असंभव, इसलिए बराबर गिने जाते हैं */
  var SAME_EN = { to: "2", too: "2", for: "4", won: "1", ate: "8", know: "no", hear: "here", their: "there",
    "they're": "there", write: "right", by: "buy", bye: "buy", see: "sea", sun: "son", meat: "meet",
    weak: "week", our: "hour", "it's": "its", "you're": "your", "who's": "whose", whether: "weather", eye: "i" };
  var PUNCT = /[.,!?;:"“”‘’()\[\]{}«»¿¡…।॥،؟、。，！？]/g;

  function isEn(lang) { return /^en/i.test(lang || ""); }
  function canon(w, lang) {
    var t = String(w).toLowerCase().replace(/[’‘`´]/g, "'").replace(/^(\d+):00(?=\D*$)/, "$1")   /* 8:00 = 8 */
      .replace(PUNCT, "").replace(/^'+|'+$/g, "");
    if (!t) return "";
    if (isEn(lang)) {
      if (NUM.hasOwnProperty(t)) return String(NUM[t]);
      if (SAME_EN.hasOwnProperty(t)) return SAME_EN[t];
    }
    return t;
  }
  /* वाक्य → [{c:मानक-टुकड़ा, i:दिखने-वाले-शब्द का क्रम}] ; thirty-one / thirty one / 31 = एक */
  function flat(text, lang) {
    var words = String(text).trim().split(/\s+/), out = [], i, j, parts, c;
    for (i = 0; i < words.length; i++) {
      parts = words[i].split(/[-–—]/);
      for (j = 0; j < parts.length; j++) { c = canon(parts[j], lang); if (c) out.push({ c: c, i: i }); }
    }
    if (isEn(lang)) {
      for (j = 0; j < out.length - 1; j++) {
        var a = +out[j].c, b = +out[j + 1].c;
        if (/^\d+$/.test(out[j].c) && /^\d$/.test(out[j + 1].c) && a >= 20 && a <= 90 && a % 10 === 0 && b >= 1) {
          out[j].c = String(a + b); out.splice(j + 1, 1);
        }
      }
    }
    return { words: words, toks: out };
  }
  /* शब्द-स्तर Levenshtein संरेखण → हर लक्ष्य-टुकड़ा: m=मेल · s=बदला · d=छूटा ; ins = फ़ालतू */
  function align(T, H) {
    var n = T.length, m = H.length, D = [], i, j;
    for (i = 0; i <= n; i++) { D[i] = []; for (j = 0; j <= m; j++) D[i][j] = i === 0 ? j : (j === 0 ? i : 0); }
    for (i = 1; i <= n; i++) for (j = 1; j <= m; j++) {
      var s = D[i - 1][j - 1] + (T[i - 1] === H[j - 1] ? 0 : 1);
      D[i][j] = Math.min(s, D[i - 1][j] + 1, D[i][j - 1] + 1);
    }
    var st = [], ins = 0; i = n; j = m;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && D[i][j] === D[i - 1][j - 1] + (T[i - 1] === H[j - 1] ? 0 : 1)) {
        st[i - 1] = T[i - 1] === H[j - 1] ? "m" : "s"; i--; j--;
      } else if (i > 0 && D[i][j] === D[i - 1][j] + 1) { st[i - 1] = "d"; i--; }
      else { ins++; j--; }
    }
    return { st: st, ins: ins };
  }
  function pcts(g, r, b, n) {
    if (!n) return { g: 0, r: 0, b: 0 };
    var gp = Math.round(g * 100 / n), rp = Math.round(r * 100 / n), bp = 100 - gp - rp;
    if (bp < 0) { if (rp > 0) rp += bp; else gp += bp; bp = 0; }   /* दोनों .5 ऊपर गोल हों तो 101 — एक घटाओ */
    return { g: gp, r: rp, b: bp };
  }
  function score(target, heard, lang) {
    var T = flat(target, lang), H = flat(heard || "", lang);
    var A = align(T.toks.map(function (x) { return x.c; }), H.toks.map(function (x) { return x.c; }));
    var per = {}, k;
    for (k = 0; k < T.toks.length; k++) { var w = T.toks[k].i; (per[w] = per[w] || []).push(A.st[k]); }
    var words = [], g = 0, r = 0, b = 0;
    for (k = 0; k < T.words.length; k++) {
      var s = per[k];
      if (!s) { words.push({ w: T.words[k], st: "-" }); continue; }   /* सिर्फ़ विराम-चिह्न: गिनती में नहीं */
      var allM = s.every(function (x) { return x === "m"; }), allD = s.every(function (x) { return x === "d"; });
      var st = allM ? "g" : (allD ? "b" : "r");
      if (st === "g") g++; else if (st === "b") b++; else r++;
      words.push({ w: T.words[k], st: st });
    }
    var n = g + r + b, p = pcts(g, r, b, n);
    return { words: words, n: n, g: g, r: r, b: b, gp: p.g, rp: p.r, bp: p.b, extra: A.ins,
      spoken: (String(heard || "").trim() ? String(heard).trim().split(/\s+/).length : 0) };
  }
  function wpm(spoken, ms) { return (spoken > 0 && ms >= 400) ? Math.round(spoken * 60000 / ms) : 0; }

  /* ---------------- पन्ना-हिस्सा (browser) ---------------- */
  if (typeof document === "undefined") {
    if (typeof module !== "undefined") module.exports = { score: score, flat: flat, align: align, canon: canon, wpm: wpm, VER: VER };
    return;
  }
  var SR = G.SpeechRecognition || G.webkitSpeechRecognition || null;
  var CAN_REC = !!(G.navigator && navigator.mediaDevices && navigator.mediaDevices.getUserMedia && G.MediaRecorder);
  var cur = null;   /* अभी खुला अभ्यास-डिब्बा */

  function css() {
    if (document.getElementById("acs-bolo-css")) return;
    var s = document.createElement("style"); s.id = "acs-bolo-css";
    s.textContent =
      ".acs-bolo{grid-column:1/-1;margin:8px 0 4px;border:2px solid #2E7D32;border-radius:14px;background:#fff;padding:10px 12px;font-size:18px;color:#0B1F3A;line-height:1.6}" +
      ".acs-bolo .ab-top{display:flex;align-items:center;gap:8px;flex-wrap:wrap}.acs-bolo .ab-top b{font-size:19px;color:#2E7D32}" +
      ".acs-bolo .ab-code{font-size:16px;color:#555}.acs-bolo .ab-x{margin-left:auto;border:0;background:#F5F7FA;border-radius:50%;width:40px;height:40px;font-size:18px;cursor:pointer}" +
      ".acs-bolo .ab-tg{font-size:22px;font-weight:700;margin:6px 0;word-wrap:break-word}.acs-bolo .ab-tg span{display:inline-block;margin:0 3px 3px 0;padding:0 4px;border-radius:6px}" +
      ".acs-bolo .w-g{color:#1B5E20;background:#E8F5E9}.acs-bolo .w-r{color:#C62828;background:#FFEBEE;text-decoration:underline wavy #C62828}.acs-bolo .w-b{color:#000;background:#ECEFF1;text-decoration:underline dotted #000}" +
      ".acs-bolo .ab-live{min-height:28px;font-size:18px;color:#1565C0}.acs-bolo .ab-heard{font-size:18px;color:#333}.acs-bolo .ab-heard i{color:#777}" +
      ".acs-bolo .ab-st{display:flex;flex-wrap:wrap;gap:6px;margin:6px 0}.acs-bolo .ab-st span{border-radius:10px;padding:2px 10px;font-weight:700;font-size:17px}" +
      ".acs-bolo .s-g{background:#E8F5E9;color:#1B5E20}.acs-bolo .s-r{background:#FFEBEE;color:#C62828}.acs-bolo .s-b{background:#ECEFF1;color:#000}.acs-bolo .s-w{background:#E3F2FD;color:#0B1F3A}" +
      ".acs-bolo .ab-btns{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}.acs-bolo .ab-btns button{border:0;border-radius:24px;padding:9px 16px;font-size:18px;font-weight:700;cursor:pointer;min-height:44px}" +
      ".acs-bolo .ab-go{background:#2E7D32;color:#fff}.acs-bolo .ab-go.on{background:#C62828}.acs-bolo .ab-say{background:#F9A825;color:#0B1F3A}.acs-bolo .ab-cm{background:#F5F7FA;color:#1565C0;border:2px solid #1565C0!important}" +
      ".acs-bolo .ab-hist{font-size:16px;color:#333}.acs-bolo .ab-hist span{display:inline-block;background:#F5F7FA;border-radius:8px;padding:0 8px;margin:2px 4px 2px 0}" +
      ".acs-bolo .ab-lg{font-size:16px;color:#555;margin-top:4px}.acs-bolo .ab-note{background:#FFF8E1;border-left:5px solid #F9A825;border-radius:10px;padding:8px 10px;font-size:17px}" +
      ".acs-bolo audio{width:100%;margin-top:6px}" +
      "@media print{.acs-bolo{display:none!important}}";
    (document.head || document.documentElement).appendChild(s);
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function ls(k, v) {
    try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; }
    return null;
  }
  function hist(code, add) {
    var H = {}; try { H = JSON.parse(ls(LS_H) || "{}") || {}; } catch (e) { H = {}; }
    if (!code) return [];
    var a = H[code] || [];
    if (add) { a.push(add); a = a.slice(-5); H[code] = a; ls(LS_H, JSON.stringify(H)); }
    return a;
  }
  function say(t, lang) {
    try {
      if (!("speechSynthesis" in G)) return;
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(t); u.lang = lang; u.rate = 0.8;
      var base = String(lang).split("-")[0];
      var v = speechSynthesis.getVoices().filter(function (x) { return String(x.lang).replace("_", "-").indexOf(base) === 0; });
      if (v.length) u.voice = v[0];
      speechSynthesis.speak(u);
    } catch (e) {}
  }
  function stopAll() {
    if (!cur) return;
    try { if (cur.rec) cur.rec.abort(); } catch (e) {}
    try { if (cur.mr && cur.mr.state !== "inactive") cur.mr.stop(); } catch (e) {}
    try { if (cur.stream) cur.stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
    try { if (cur.url) URL.revokeObjectURL(cur.url); } catch (e) {}
    if (cur.timer) clearTimeout(cur.timer);
  }
  function close() { stopAll(); if (cur && cur.box && cur.box.parentNode) cur.box.parentNode.removeChild(cur.box); cur = null; }

  function paintTarget(o, res) {
    var tg = o.box.querySelector(".ab-tg");
    if (!res) { tg.textContent = o.t; return; }
    tg.innerHTML = res.words.map(function (x) {
      var cls = x.st === "g" ? "w-g" : x.st === "r" ? "w-r" : x.st === "b" ? "w-b" : "";
      var tt = x.st === "g" ? "सही बोला" : x.st === "r" ? "ग़लत — कुछ और सुनाई दिया" : x.st === "b" ? "बोला नहीं" : "";
      return cls ? '<span class="' + cls + '" title="' + tt + '">' + esc(x.w) + "</span>" : esc(x.w);
    }).join(" ");
  }
  function paintHist(o) {
    var a = hist(o.code), el = o.box.querySelector(".ab-hist");
    if (!a.length) { el.innerHTML = ""; return; }
    var s = "📈 पिछली कोशिशें: " + a.map(function (x) { return "<span>" + x.g + "%" + (x.w ? " · " + x.w + " श/मि" : "") + "</span>"; }).join("");
    if (a.length > 1) {
      var d = a[a.length - 1].g - a[0].g;
      s += d > 0 ? " <b style=\"color:#2E7D32\">सुधार +" + d + "% 👏</b>" : (d < 0 ? " <b>फिर कोशिश करें 💪</b>" : "");
    }
    el.innerHTML = s;
  }
  function live(o, html) { o.box.querySelector(".ab-live").innerHTML = html; }
  function btnGo(o, txt, on) { var b = o.box.querySelector(".ab-go"); b.textContent = txt; b.classList[on ? "add" : "remove"]("on"); }

  function consent(o, then) {
    if (ls(LS_OK) === "1") { then(); return; }
    live(o, '<div class="ab-note"><b>🎙️ माइक चालू करने से पहले — ज़रूरी बातें</b><br>' +
      "• आपकी आवाज़ शब्द पहचानने के लिए आपके फ़ोन/ब्राउज़र (browser) की आवाज़-सेवा तक जाती है, जैसे गूगल (Google)।<br>" +
      "• ACS आपकी आवाज़ न सहेजता है, न सुनता है। अभ्यास के नतीजे सिर्फ़ आपके फ़ोन में रहते हैं।<br>" +
      "• यह शब्द-पहचान है, उच्चारण की बारीक जाँच नहीं। इंटरनेट चाहिए। एंड्रॉयड (Android) फ़ोन पर क्रोम (Chrome) में सबसे अच्छा चलता है।<br>" +
      "• 18 साल से कम हैं, तो अभिभावक की सहमति से उपयोग करें।<br>" +
      '<div class="ab-btns"><button type="button" class="ab-go ab-ok">✅ समझ गया — माइक चालू करो</button></div></div>');
    o.box.querySelector(".ab-ok").onclick = function () { ls(LS_OK, "1"); live(o, ""); then(); };
  }

  function listen(o) {
    stopAll();
    try { if ("speechSynthesis" in G) speechSynthesis.cancel(); } catch (e) {}
    var rec; try { rec = new SR(); } catch (e) { recorder(o, "इस ब्राउज़र में आवाज़-पहचान शुरू नहीं हो सकी।"); return; }
    o.rec = rec; rec.lang = o.asr; rec.interimResults = true; rec.maxAlternatives = 1; rec.continuous = false;
    var t = { a: 0, s: 0, e: 0, last: 0 }, fin = "", err = "", now = function () { return Date.now(); };
    paintTarget(o, null);
    o.box.querySelector(".ab-st").innerHTML = "";
    o.box.querySelector(".ab-heard").innerHTML = "";
    rec.onaudiostart = function () { t.a = now(); live(o, "🔴 सुन रहा हूँ… अब ऊपर का वाक्य बोलिए"); };
    rec.onsoundstart = function () { if (!t.s) t.s = now(); };
    rec.onspeechstart = function () { t.s = now(); };
    rec.onspeechend = function () { t.e = now(); };
    rec.onresult = function (ev) {
      var it = "", i; fin = "";
      for (i = 0; i < ev.results.length; i++) {
        var tr = ev.results[i][0] ? ev.results[i][0].transcript : "";
        if (ev.results[i].isFinal) fin += tr; else it += tr;
      }
      t.last = now();
      live(o, "⌨️ " + esc((fin + " " + it).trim()));
    };
    rec.onerror = function (ev) { err = (ev && ev.error) || "x"; };
    rec.onend = function () {
      if (o.rec !== rec || cur !== o) return;   /* बंद/दोबारा शुरू हो चुका — नई कोशिश की स्थिति न छुएँ */
      if (o.timer) clearTimeout(o.timer);
      btnGo(o, "🎙️ फिर से बोलो", false); o.busy = false;
      fin = fin.trim();
      if (!fin) {
        if (err === "not-allowed" || err === "service-not-allowed") { live(o, "⚠️ माइक की अनुमति नहीं मिली। ब्राउज़र की सेटिंग में इस साइट को माइक की अनुमति दें, फिर दोबारा दबाएँ।"); return; }
        if (err === "audio-capture") { live(o, "⚠️ माइक नहीं मिला। फ़ोन का माइक जाँचें।"); return; }
        if (err === "network") { live(o, "⚠️ आवाज़-पहचान के लिए इंटरनेट चाहिए। इंटरनेट चालू करके फिर बोलिए।"); return; }
        if (err === "language-not-supported") { recorder(o, "इस भाषा की आवाज़-पहचान इस ब्राउज़र में नहीं है।"); return; }
        live(o, "🤔 कुछ सुनाई नहीं दिया। माइक के पास साफ़ बोलिए और फिर दबाइए।"); return;
      }
      var res = score(o.t, fin, o.asr);
      var t0 = t.s || t.a, t1 = t.e || t.last;
      var w = wpm(res.spoken, t1 - t0);
      paintTarget(o, res);
      live(o, "");
      o.box.querySelector(".ab-heard").innerHTML = "⌨️ आपने बोला: <b>" + esc(fin) + "</b>" +
        (res.extra ? " <i>(" + res.extra + " फ़ालतू शब्द)</i>" : "");
      o.box.querySelector(".ab-st").innerHTML =
        '<span class="s-g">🟢 सही ' + res.gp + "%</span>" + '<span class="s-r">🔴 ग़लत ' + res.rp + "%</span>" +
        '<span class="s-b">⚫ छूटे ' + res.bp + "%</span>" +
        '<span class="s-w">⏱ गति: ' + (w ? w + " शब्द/मिनट" : "—") + "</span>" +
        (res.gp === 100 ? '<span class="s-g">🎉 शाबाश! पूरा सही</span>' : "");
      hist(o.code, { g: res.gp, w: w, at: Date.now() });
      paintHist(o);
    };
    btnGo(o, "⏹ रुको", true); o.busy = true;
    live(o, "⏳ माइक चालू हो रहा है…");
    try { rec.start(); } catch (e) { o.busy = false; btnGo(o, "🎙️ बोलो", false); live(o, "⚠️ माइक शुरू नहीं हुआ। एक पल रुककर फिर दबाइए।"); return; }
    o.timer = setTimeout(function () { try { rec.stop(); } catch (e) {} }, 15000);
  }

  /* जहाँ आवाज़-पहचान नहीं: रिकॉर्ड करो → अपनी आवाज़ सुनो → सही उच्चारण से मिलाओ (आवाज़ फ़ोन से बाहर नहीं जाती) */
  function recorder(o, why) {
    o.mode = "rec";
    if (!CAN_REC) {
      live(o, '<div class="ab-note">⚠️ ' + esc(why || "") + " इस ब्राउज़र में माइक की सुविधा नहीं है। एंड्रॉयड (Android) फ़ोन पर क्रोम (Chrome) में यह पन्ना खोलें।</div>");
      o.box.querySelector(".ab-go").style.display = "none"; return;
    }
    live(o, '<div class="ab-note">ℹ️ ' + esc(why || "इस ब्राउज़र में शब्द-जाँच (रंग, प्रतिशत) नहीं चलती।") +
      " तब तक यह करें: ⏺ दबाकर वाक्य बोलिए → अपनी आवाज़ सुनिए → 🔊 सही उच्चारण से मिलाइए। रंग-जाँच के लिए एंड्रॉयड (Android) फ़ोन पर क्रोम (Chrome) खोलें।</div>");
    btnGo(o, "⏺ रिकॉर्ड करो", false);
  }
  function recToggle(o) {
    if (o.mr && o.mr.state === "recording") { o.mr.stop(); return; }
    stopAll();
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var mr = new MediaRecorder(stream), ch = [];
      o.stream = stream; o.mr = mr;
      mr.ondataavailable = function (e) { if (e.data && e.data.size) ch.push(e.data); };
      mr.onstop = function () {
        try { stream.getTracks().forEach(function (t) { t.stop(); }); } catch (e) {}
        if (o.timer) clearTimeout(o.timer);
        var blob = new Blob(ch, { type: mr.mimeType || "audio/webm" });
        if (o.url) try { URL.revokeObjectURL(o.url); } catch (e) {}
        o.url = URL.createObjectURL(blob);
        o.box.querySelector(".ab-heard").innerHTML = "🎧 आपकी आवाज़:<audio controls src=\"" + o.url + "\"></audio>";
        btnGo(o, "⏺ फिर रिकॉर्ड करो", false);
      };
      mr.start(); btnGo(o, "⏹ रुको", true);
      o.timer = setTimeout(function () { try { if (mr.state === "recording") mr.stop(); } catch (e) {} }, 12000);
    }).catch(function () { live(o, "⚠️ माइक की अनुमति नहीं मिली। ब्राउज़र की सेटिंग में इस साइट को माइक की अनुमति दें।"); });
  }

  function open(btn, opt) {
    css();
    opt = opt || {};
    var host = opt.host || (btn.closest && btn.closest("[data-bolo-host]")) || btn.parentNode;
    if (cur && cur.host === host) { close(); return; }   /* दोबारा दबाया = बंद */
    close();
    var o = { t: opt.t || btn.getAttribute("data-t") || "", asr: opt.asr || btn.getAttribute("data-asr") || "en-IN",
      tts: opt.tts || btn.getAttribute("data-tts") || opt.asr || "en-US", code: opt.code || btn.getAttribute("data-code") || "",
      host: host, mode: SR ? "sr" : "rec" };
    if (!o.t) return;
    var box = document.createElement("div"); box.className = "acs-bolo"; box.setAttribute("role", "region");
    box.setAttribute("aria-label", "बोलो-अभ्यास");
    box.innerHTML = '<div class="ab-top"><b>🎙️ बोलो-अभ्यास</b>' + (o.code ? '<span class="ab-code">वाक्य-कोड: ' + esc(o.code) + "</span>" : "") +
      '<button type="button" class="ab-x" aria-label="बंद करें">✕</button></div>' +
      '<div class="ab-tg"></div><div class="ab-live" aria-live="polite"></div><div class="ab-heard"></div><div class="ab-st"></div>' +
      '<div class="ab-btns"><button type="button" class="ab-go">🎙️ बोलो</button><button type="button" class="ab-say">🔊 सही उच्चारण सुनो</button>' +
      (G.ACSRaay && o.code ? '<button type="button" class="ab-cm">💬 इस वाक्य पर राय</button>' : "") + "</div>" +
      '<div class="ab-hist"></div><div class="ab-lg">🟢 हरा = सही बोला · 🔴 लाल = ग़लत (कुछ और सुनाई दिया) · ⚫ काला = बोला नहीं</div>';
    o.box = box; host.appendChild(box); cur = o;
    paintTarget(o, null); paintHist(o);
    box.querySelector(".ab-x").onclick = close;
    box.querySelector(".ab-say").onclick = function () { stopAll(); say(o.t, o.tts); };
    var cm = box.querySelector(".ab-cm"); if (cm) cm.onclick = function () { G.ACSRaay.comment(o.code); };
    box.querySelector(".ab-go").onclick = function () {
      if (o.mode === "rec") { recToggle(o); return; }
      if (o.busy) { try { o.rec.stop(); } catch (e) {} return; }
      consent(o, function () { listen(o); });
    };
    if (o.mode === "rec") consent(o, function () { recorder(o, ""); });
    else live(o, "👇 🎙️ बोलो दबाइए, फिर ऊपर का वाक्य साफ़-साफ़ बोलिए।");
    try { box.scrollIntoView({ block: "nearest", behavior: "smooth" }); } catch (e) {}
  }

  G.ACSBolo = { open: open, close: close, score: score, flat: flat, wpm: wpm, VER: VER, hasSR: !!SR };
})(typeof window !== "undefined" ? window : this);
