/* generator/build_eng_bank.js — v2.0 (30-Aug-2026) · Founder-आदेश: 12 प्रकार, घूमता क्रम
   ACS Spoken English (PJ018) — server-परीक्षा बैंक निर्माता
   स्रोत (सब frozen corpus से — कुछ गढ़ा नहीं): 2,150 वाक्य + 390 लक्ष्य-शब्द +
   26 सुनो-जवाब जोड़े + 53 संवाद-जोड़ियाँ ≈ 2,619 प्रश्न।
   12 प्रकार (t:1-12): 1 EN→अर्थ · 2 अर्थ→EN · 3 उच्चारण→EN · 4 EN→उच्चारण ·
   5 ख़ाली-जगह · 6 पहला-शब्द · 7 वाक्य-पूर्ति · 8 शब्द→अर्थ · 9 अर्थ→शब्द ·
   10 सवाल→जवाब · 11 संवाद-अगली-पंक्ति · 12 सही शब्द-क्रम।
   मुख्य-धारा में प्रकार 1→7,12 हर वाक्य पर घूमता है (एक के बाद दूसरा)।
   लंबाई-पक्षपात रोक (v5.2 होल): distractor लंबाई-खिड़की + tiny-टोकरी; सही-स्थान बेतरतीब।
   देय: functions/eng_bank.js — server-only, GitHub पर कभी नहीं। */
"use strict";
var fs = require("fs");
global.window = {};
eval(fs.readFileSync("assets/kkb_data.js", "utf8").replace("window.KKB_DATA", "global.window.KKB_DATA"));
eval(fs.readFileSync("assets/kkb2_data.js", "utf8").replace("window.KKB2_DATA", "global.window.KKB2_DATA"));
var D1 = global.window.KKB_DATA, D2 = global.window.KKB2_DATA;
function clean(t) { return String(t).replace(/^\((सुनो|बोलो)[^)]*\)\s*/, ""); }
var ALL = [], TW = [], LIS = [], DLG = [];
[D1, D2].forEach(function (D) {
  D.weeks.forEach(function (w) {
    w.days.forEach(function (d) {
      d.items.forEach(function (it) { ALL.push({ en: clean(it[0]), dev: it[1], hi: it[2] }); });
      (d.tw || []).forEach(function (t) { TW.push({ w: t[0], dev: t[1], hi: t[2] }); });
    });
    (w.listen || []).forEach(function (p) { LIS.push({ q: clean(p[0]), a: clean(p[1]) }); });
    if (w.dialog) for (var p2 = 0; p2 < w.dialog.length - 1; p2++)
      DLG.push({ ask: clean(w.dialog[p2][1]), rep: clean(w.dialog[p2 + 1][1]) });
  });
});
if (ALL.length !== 2150) { console.log("⛔ corpus " + ALL.length); process.exit(1); }

/* स्थिर बेतरतीबी (regen = वही बैंक) */
var seed = 90210;
function rnd() { seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5; return ((seed >>> 0) % 100000) / 100000; }

/* लंबाई-संतुलित distractor-चुनाई (v5.2 होल-रोक) */
function pick3(pool, correct, getT) {
  var cl = correct.length, out = [], tries = 0, win = 0.28, tiny = cl < 8;
  while (out.length < 3 && tries < 9000) {
    tries++;
    if (tries % 900 === 0) win += 0.2;
    var t = getT(pool[Math.floor(rnd() * pool.length)]);
    if (!t || t === correct) continue;
    if (tiny) { if (t.length > 16) continue; }
    else { var r = t.length / cl; if (r < 1 - win || r > 1 + win + 0.12) continue; }
    var dup = false;
    for (var k = 0; k < out.length; k++) if (out[k] === t) dup = true;
    if (!dup) out.push(t);
  }
  return out.length === 3 ? out : null;
}
function mkQ(t, q, correct, ds) {
  var pos = Math.floor(rnd() * 4), o = [];
  for (var p = 0, di = 0; p < 4; p++) o.push(p === pos ? correct : ds[di++]);
  return { typ: t, t: q, o: o, a: pos };  /* client प्रश्न-पाठ .t से छापता (dashboard.js:1523) */
}
function words(en) { return en.replace(/[.,!?"'’—]/g, " ").split(/\s+/).filter(function (x) { return x.length > 0; }); }

/* ---- 12 प्रकार के builders (null = इस सामग्री पर लागू नहीं → अगला प्रकार) ---- */
var B = {};
B[1] = function (it) { var ds = pick3(ALL, it.hi, function (x) { return x.hi; }); return ds && mkQ(1, "इस English वाक्य का सही हिंदी अर्थ चुनिए — \u201C" + it.en + "\u201D", it.hi, ds); };
B[2] = function (it) { var ds = pick3(ALL, it.en, function (x) { return x.en; }); return ds && mkQ(2, "\u201C" + it.hi + "\u201D — इस बात का सही English वाक्य चुनिए", it.en, ds); };
B[3] = function (it) { var ds = pick3(ALL, it.en, function (x) { return x.en; }); return ds && mkQ(3, "जिस English वाक्य का उच्चारण \u201C" + it.dev + "\u201D है, वह चुनिए", it.en, ds); };
B[4] = function (it) { var ds = pick3(ALL, it.dev, function (x) { return x.dev; }); return ds && mkQ(4, "\u201C" + it.en + "\u201D — इस वाक्य का सही उच्चारण चुनिए", it.dev, ds); };
B[5] = function (it) { /* ख़ाली-जगह */
  var ws = words(it.en).filter(function (w) { return w.length >= 4 && it.en.split(w).length === 2; });
  if (!ws.length) return null;
  var w = ws[Math.floor(rnd() * ws.length)];
  var ds = pick3(ALL, w, function (x) { var c = words(x.en).filter(function (y) { return y.length >= 3 && y.toLowerCase() !== w.toLowerCase(); }); return c.length ? c[Math.floor(rnd() * c.length)] : null; });
  return ds && mkQ(5, "ख़ाली जगह में सही शब्द चुनिए — \u201C" + it.en.replace(w, "______") + "\u201D (अर्थ: " + it.hi + ")", w, ds);
};
B[6] = function (it) { /* पहला-शब्द */
  var w = words(it.en)[0]; if (!w || words(it.en).length < 3) return null;
  var ds = pick3(ALL, w, function (x) { var f = words(x.en)[0]; return (f && f.toLowerCase() !== w.toLowerCase()) ? f : null; });
  return ds && mkQ(6, "\u201C" + it.hi + "\u201D — English में यह वाक्य किस शब्द से शुरू होगा?", w, ds);
};
B[7] = function (it) { /* वाक्य-पूर्ति (अंतिम हिस्सा) */
  var ws = words(it.en); if (ws.length < 5) return null;
  var tail = ws.slice(-2).join(" "), head = it.en.slice(0, it.en.lastIndexOf(ws[ws.length - 2]));
  var ds = pick3(ALL, tail, function (x) { var xw = words(x.en); if (xw.length < 5) return null; var t2 = xw.slice(-2).join(" "); return t2.toLowerCase() !== tail.toLowerCase() ? t2 : null; });
  return ds && mkQ(7, "वाक्य पूरा कीजिए — \u201C" + head + "______\u201D (अर्थ: " + it.hi + ")", tail, ds);
};
B[12] = function (it) { /* सही शब्द-क्रम: ग़लत विकल्प = उसी वाक्य के मशीन-उलटे क्रम */
  var ws = words(it.en); if (ws.length < 5 || ws.length > 9) return null;
  var seen = {}; seen[ws.join(" ").toLowerCase()] = 1;
  var ds = [], guard = 0;
  while (ds.length < 3 && guard < 200) {
    guard++;
    var c = ws.slice();
    for (var s2 = c.length - 1; s2 > 0; s2--) { var j2 = Math.floor(rnd() * (s2 + 1)); var tmp = c[s2]; c[s2] = c[j2]; c[j2] = tmp; }
    var str = c.join(" ");
    if (!seen[str.toLowerCase()]) { seen[str.toLowerCase()] = 1; ds.push(str); }
  }
  if (ds.length < 3) return null;
  return mkQ(12, "सही शब्द-क्रम वाला English वाक्य चुनिए (अर्थ: " + it.hi + ")", ws.join(" "), ds);
};
/* tw-धारा */
B[8] = function (t) { var ds = pick3(TW, t.hi, function (x) { return x.hi; }); return ds && mkQ(8, "English शब्द \u201C" + t.w + "\u201D (" + t.dev + ") का सही हिंदी अर्थ चुनिए", t.hi, ds); };
B[9] = function (t) { var ds = pick3(TW, t.w, function (x) { return x.w; }); return ds && mkQ(9, "जिस English शब्द का अर्थ \u201C" + t.hi + "\u201D है, वह चुनिए", t.w, ds); };
/* listen/dialog-धारा */
B[10] = function (p) { var ds = pick3(LIS.concat(ALL.slice(0, 400).map(function (x) { return { a: x.en }; })), p.a, function (x) { return x.a; }); return ds && mkQ(10, "सवाल — \u201C" + p.q + "\u201D — सबसे सही जवाब चुनिए", p.a, ds); };
B[11] = function (p) { var ds = pick3(DLG.concat(ALL.slice(500, 900).map(function (x) { return { rep: x.en }; })), p.rep, function (x) { return x.rep; }); return ds && mkQ(11, "बातचीत में पहला व्यक्ति कहता है — \u201C" + p.ask + "\u201D — दूसरे का सबसे सही जवाब चुनिए", p.rep, ds); };

/* ---- मुख्य-धारा: 2,150 वाक्यों पर 8 प्रकार (1-7, 12) घूमते हुए ---- */
var ROT = [1, 2, 3, 4, 5, 6, 7, 12];
var BANK = [], typeCount = {};
function push(Q) { if (!Q) return false; BANK.push(Q); typeCount[Q.typ] = (typeCount[Q.typ] || 0) + 1; return true; }
for (var i = 0; i < ALL.length; i++) {
  var ok = false;
  for (var r2 = 0; r2 < ROT.length && !ok; r2++) ok = push(B[ROT[(i + r2) % ROT.length]](ALL[i]));
  if (!ok) { console.log("⛔ कोई प्रकार नहीं बना: " + ALL[i].en); process.exit(1); }
}
for (i = 0; i < TW.length; i++) if (!push(B[i % 2 === 0 ? 8 : 9](TW[i])) && !push(B[i % 2 === 0 ? 9 : 8](TW[i]))) { console.log("⛔ tw-प्रश्न fail"); process.exit(1); }
for (i = 0; i < LIS.length; i++) if (!push(B[10](LIS[i]))) { console.log("⛔ listen-प्रश्न fail"); process.exit(1); }
for (i = 0; i < DLG.length; i++) if (!push(B[11](DLG[i]))) { console.log("⛔ dialog-प्रश्न fail"); process.exit(1); }

/* ---- अंतिम गूँथाई: बैंक-क्रम में भी प्रकार घूमता चले (round-robin interleave) ---- */
var byType = {}; BANK.forEach(function (Q) { (byType[Q.typ] = byType[Q.typ] || []).push(Q); });
var order = [1, 8, 3, 10, 5, 2, 9, 6, 11, 4, 7, 12], MIX = [], left = BANK.length;
while (left > 0) for (var o2 = 0; o2 < order.length; o2++) { var arr = byType[order[o2]]; if (arr && arr.length) { MIX.push(arr.shift()); left--; } }
BANK = MIX;
/* server-इंजन हर प्रश्न में स्थायी id माँगता है (attempt की qids-सूची इसी से) */
BANK.forEach(function (Q, qi) { Q.id = "eng-" + ("0000" + (qi + 1)).slice(-4); });

/* ---- नाप: लंबाई-पक्षपात + विविधता ---- */
var biased = 0, eligible = 0;
BANK.forEach(function (Q) {
  var mx = -1, mi = -1, tie = false;
  Q.o.forEach(function (t2, ix) { if (t2.length > mx) { mx = t2.length; mi = ix; tie = false; } else if (t2.length === mx) tie = true; });
  if (!tie) { eligible++; if (mi === Q.a) biased++; }
});
var rate = Math.round(biased * 1000 / eligible) / 10;
var tc = []; for (var t3 = 1; t3 <= 12; t3++) tc.push("T" + t3 + ":" + (typeCount[t3] || 0));
console.log("बैंक: " + BANK.length + " प्रश्न · 12 प्रकार [" + tc.join(" ") + "]");
console.log("अकेला-सबसे-लंबा=सही दर: " + rate + "% (खिड़की 15-35%)");
if (rate < 15 || rate > 35) { console.log("⛔ लंबाई-पक्षपात"); process.exit(1); }
for (t3 = 1; t3 <= 12; t3++) if (!typeCount[t3] || typeCount[t3] < 20) { console.log("⛔ प्रकार-" + t3 + " बहुत कम"); process.exit(1); }

var out = "/* functions/eng_bank.js — ACS Spoken English (PJ018) server-परीक्षा बैंक v2.0\n" +
  "   " + BANK.length + " प्रश्न · 12 प्रकार घूमते क्रम में (मशीन-गिनती dev_eng_quiz_check से)\n" +
  "   GitHub पर कभी नहीं — सिर्फ़ functions/ में। स्रोत: frozen corpus ·\n" +
  "   regen: generator/build_eng_bank.js · लंबाई-संतुलित (v5.2 होल-मुक्त)। */\n" +
  "module.exports = " + JSON.stringify(BANK) + ";\n";
fs.writeFileSync("functions/eng_bank.js", out);
console.log("✅ functions/eng_bank.js लिखा (" + Math.round(out.length / 1024) + " KB)");
