/* generator/build_tirhuta_bank.js — v1.0 (27-Oct-2026) · PJ434 तिरहुता-लिपि server-परीक्षा बैंक
   यांत्रिक जनरेटर (कैथी build_kaithi_bank.js v1.0 का दर्पण): प्रश्न सीधे
   assets/tirhuta_lipi.js के रूपांतरण-नक़्शे व generator/data/tirhuta_lessons_data.js
   के पढ़ाए शब्दों/तथ्यों से — कुछ गढ़ा नहीं। दायरा = live पाठ 1-18 (स्वर+व्यंजन+मात्रा)।
   प्रकार:
   T1 देवनागरी शब्द → तिरहुता रूप चुनो     T2 तिरहुता शब्द → देवनागरी पढ़ो
   T3 देवनागरी अक्षर → तिरहुता अक्षर       T4 तिरहुता अक्षर → देवनागरी अक्षर
   T5 मात्रा-जोड़ (बारहखड़ी) → तिरहुता रूप   T6 लिपि-ज्ञान तथ्य (पाठ 1-18 के दर्ज तथ्य,
                                           हर सही-उत्तर की grounding-जाँच data-grep से)
   लंबाई-पक्षपात रोक (v5.2 होल): अकेला-सबसे-लंबा=सही 15-35% खिड़की मशीन-जाँच।
   देय: functions/tir_bank.js — server-only, GitHub पर कभी नहीं (eng_bank.js-नियम)।
   चलाना: node generator/build_tirhuta_bank.js   (repo-रूट से) */
"use strict";
var fs = require("fs");
var vm = require("vm");

/* ---- इंजन load (browser-फ़ाइल) ---- */
var sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("assets/tirhuta_lipi.js", "utf8"), sandbox);
var TL = sandbox.window.TIRHUTA_LIPI;
if (!TL || !TL.devaToTirhuta) { console.log("⛔ tirhuta_lipi.js इंजन नहीं मिला"); process.exit(1); }
var toT = TL.devaToTirhuta;

/* ---- शब्द-भंडार: पाठ-data के {{T:...}}/{{TBIG:...}} token से (पढ़ाए शब्द ही) ---- */
var LDATA = fs.readFileSync("generator/data/tirhuta_lessons_data.js", "utf8");
var W = {}, m, re = /\{\{T(?:BIG)?:([^}]+)\}\}/g;
while ((m = re.exec(LDATA))) {
  var w = m[1].trim();
  if (/^[\u0900-\u097F]+$/.test(w) && w.indexOf(" ") === -1 && w.length >= 2) W[w] = 1;
}
var WORDS = Object.keys(W);
if (WORDS.length < 60) { console.log("⛔ शब्द-भंडार छोटा: " + WORDS.length); process.exit(1); }

/* ---- नियतात्मक बेतरतीबी — हर दौड़ एक-सा बैंक ---- */
var SEED = 20261027;
function rnd() { SEED = (SEED * 1103515245 + 12345) % 2147483648; return SEED / 2147483648; }
function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

/* ---- प्रश्न-ढाँचा ---- */
var BANK = [], typeCount = {};
function push(t, o4, aIdx, typ) {
  var seen = {}; for (var i = 0; i < o4.length; i++) { if (seen[o4[i]]) return false; seen[o4[i]] = 1; }
  if (/[\[\]]/.test(t + o4.join(""))) return false; /* square-bracket निषेध */
  BANK.push({ t: t, o: o4, a: aIdx, typ: typ });
  typeCount[typ] = (typeCount[typ] || 0) + 1; return true;
}
/* सही + 3 भटकाव — लंबाई-क़रीबी भटकाव पहले, फिर जगह बेतरतीब */
function mcq(t, correct, pool, typ) {
  var cand = pool.filter(function (x) { return x !== correct; });
  cand.sort(function (a, b) { return Math.abs(a.length - correct.length) - Math.abs(b.length - correct.length); });
  var near = cand.slice(0, 12); shuffle(near);
  var longer = cand.filter(function (x) { return x.length >= correct.length; }); shuffle(longer);
  var opts = [correct, near[0], near[1], near[2]];
  if (!near[2]) return false;
  /* v5.2 होल-रोक: सही अकेला-सबसे-लंबा न रह जाए — एक भटकाव लंबा/बराबर घुसाओ */
  if (longer.length && opts.slice(1).every(function (x) { return x.length < correct.length; })) {
    for (var li = 0; li < longer.length; li++) {
      if (opts.indexOf(longer[li]) === -1) { opts[1 + Math.floor(rnd() * 3)] = longer[li]; break; }
    }
  }
  shuffle(opts);
  return push(t, opts, opts.indexOf(correct), typ);
}

/* ---- T1/T2: शब्द (पढ़ाए शब्द × दोनों दिशा) ---- */
var TWORDS = WORDS.map(toT);
WORDS.forEach(function (w, i) {
  mcq("देवनागरी शब्द «" + w + "» तिरहुता में कैसे लिखा जाएगा?", TWORDS[i], TWORDS, 1);
});
WORDS.forEach(function (w, i) {
  mcq("तिरहुता में लिखा «" + TWORDS[i] + "» देवनागरी में कौन-सा शब्द है?", w, WORDS, 2);
});

/* ---- T3/T4: अकेले अक्षर (स्वर+व्यंजन+नुक़्ता-जोड़ी, इंजन-नक़्शे से — पाठ 1-13 का दायरा) ---- */
var AK = ["अ","आ","इ","ई","उ","ऊ","ऋ","ए","ऐ","ओ","औ","क","ख","ग","घ","ङ","च","छ","ज","झ","ञ","ट","ठ","ड","ढ","ण","त","थ","द","ध","न","प","फ","ब","भ","म","य","र","ल","व","श","ष","स","ह","ड़","ढ़"];
var AKK = AK.map(toT);
AK.forEach(function (a, i) {
  mcq("देवनागरी अक्षर «" + a + "» का तिरहुता रूप कौन-सा है?", AKK[i], AKK, 3);
  mcq("तिरहुता अक्षर «" + AKK[i] + "» देवनागरी में कौन-सा अक्षर है?", a, AK, 4);
});

/* ---- T5: बारहखड़ी (10 व्यंजन × 10 मात्राएँ = 100 जोड़ — पाठ 14-18 का दायरा) ---- */
var BC = ["क","ग","त","न","प","ब","म","र","ल","स"];
var MT = ["ा","ि","ी","ु","ू","े","ै","ो","ौ","ं"];
var COMBO = [];
BC.forEach(function (c) { MT.forEach(function (mt) { COMBO.push(c + mt); }); });
var COMBOK = COMBO.map(toT);
COMBO.forEach(function (c, i) {
  mcq("मात्रा-जोड़ «" + c + "» तिरहुता में कैसे दिखेगा?", COMBOK[i], COMBOK, 5);
});

/* ---- T6: लिपि-ज्ञान तथ्य — पाठ 1-18 के दर्ज तथ्य (हाथ-लिखे, पाठ-हूबहू)
        हर पंक्ति: [प्रश्न, सही, भटकाव×3, grounding-keyword (data में अनिवार्य)] ---- */
var FACTS = [
  ["तिरहुता लिपि का दूसरा नाम क्या है?", "मिथिलाक्षर", "गुरुमुखी", "मोड़ी", "शारदा", "मिथिलाक्षर"],
  ["तिरहुता लिपि किस लिपि-परिवार की बहन मानी जाती है?", "बंगाली-असमिया परिवार की", "सिर्फ़ रोमन लिपि के परिवार की", "अरबी लिपि के परिवार की", "चीनी चित्र-लिपि के परिवार की", "बंगाली"],
  ["तिरहुता में शिरोरेखा (माथे की रेखा) का क्या हाल है?", "शिरोरेखा होती है", "शिरोरेखा बिल्कुल नहीं होती", "रेखा सिर्फ़ अंकों पर होती है", "रेखा अक्षर के नीचे होती है", "शिरोरेखा"],
  ["तिरहुता के अंक कैसे होते हैं?", "अपने अलग अंक होते हैं", "हमेशा देवनागरी अंक ही लिखे जाते हैं", "सिर्फ़ रोमन अंक चलते हैं", "अंक शब्दों में ही लिखे जाते हैं", "अंक"],
  ["तिरहुता में छोटी इ की मात्रा अक्षर के किस ओर लगती है?", "अक्षर के बाएँ (पहले)", "हमेशा अक्षर के ठीक ऊपर ही", "अक्षर के नीचे", "अक्षर के दाएँ (बाद में)", "बाएँ"],
  ["तिरहुता में ए की मात्रा अक्षर के किस ओर लगती है?", "अक्षर के बाएँ (पहले)", "हमेशा अक्षर के ठीक ऊपर ही", "अक्षर के नीचे", "अक्षर के दाएँ (बाद में)", "बाएँ"],
  ["तिरहुता में ओ की मात्रा अक्षर को कैसे पकड़ती है?", "दोनों ओर से घेरकर", "सिर्फ़ ऊपर से एक बिंदी बनकर", "सिर्फ़ नीचे से", "अक्षर से अलग दूर खड़ी होकर", "घेर"],
  ["ड़ और ढ़ तिरहुता में कैसे बनते हैं?", "ड/ढ के नीचे नुक़्ता लगाकर", "बिल्कुल अलग नए अक्षर बनाकर", "र के ऊपर बिंदी लगाकर", "अक्षर को दो बार लिखकर", "नुक़्ता"],
  ["उ-ऊ की मात्रा तिरहुता में अक्षर से कैसे जुड़ती है?", "अक्षर में मिलकर नया मिला-रूप बनाती है", "हमेशा अक्षर से अलग दूर ही रहती है", "सिर्फ़ ऊपर बिंदी बनती है", "मात्रा लगती ही नहीं", "मिल"],
  ["ऊ स्वर कैसा स्वर है?", "दीर्घ (लंबा) स्वर", "हमेशा छोटा बोला जाने वाला स्वर", "आधा व्यंजन", "सिर्फ़ अंक", "दीर्घ"],
  ["मिथिला की पुरानी पोथियाँ किस लिपि में लिखी मिलती हैं?", "तिरहुता (मिथिलाक्षर) में", "सिर्फ़ रोमन लिपि में", "सिर्फ़ अरबी लिपि में", "सिर्फ़ चीनी लिपि में", "पोथ"],
  ["तिरहुता में र और देवनागरी के किस अक्षर की शक्ल में धोखा होता है?", "ब और व की शक्ल से", "ट और ठ की शक्ल से", "ङ और ञ की शक्ल से", "क्ष और त्र की शक्ल से", "धोखेबाज़"],
  ["मात्रा और स्वर में क्या रिश्ता है?", "मात्रा स्वर का छोटा रूप है", "मात्रा और स्वर का आपस में कोई रिश्ता नहीं", "मात्रा सिर्फ़ अंकों पर लगती है", "मात्रा अलग भाषा है", "मात्रा"],
  ["अनुस्वार (ं) तिरहुता में अक्षर के किस ओर लगता है?", "अक्षर के ऊपर", "अक्षर के बाएँ", "अक्षर के नीचे", "अक्षर से बहुत दूर", "अनुस्वार"],
  ["विसर्ग (ः) तिरहुता में कहाँ लगता है?", "अक्षर के आगे (दाएँ)", "अक्षर के ठीक ऊपर", "अक्षर के नीचे", "अक्षर के भीतर", "विसर्ग"],
  ["बारहखड़ी का मतलब क्या है?", "एक व्यंजन पर मात्राओं की पूरी क़तार", "सिर्फ़ बारह अलग-अलग भाषाओं की सूची", "बारह अंकों की गिनती", "बारह पन्नों की किताब", "बारहखड़ी"],
  ["ा की मात्रा अक्षर के किस ओर लगती है?", "अक्षर के दाएँ (बाद में)", "हमेशा अक्षर के बाएँ (पहले)", "अक्षर के नीचे", "अक्षर के ऊपर", "दाएँ"],
  ["पढ़ने का सही क्रम क्या है, जब ि की मात्रा बाएँ दिखे?", "लिखो पहले, पढ़ो बाद में", "जो पहले दिखे वही पहले बोलो हमेशा", "मात्रा कभी पढ़ी नहीं जाती", "अक्षर छोड़कर सिर्फ़ मात्रा बोलो", "पढ़ो बाद"]
];
/* grounding-जाँच: हर सही-उत्तर का keyword पाठ-data में मौजूद हो (गढ़ा-तथ्य रोक) */
var ungrounded = 0;
FACTS.forEach(function (q) {
  if (LDATA.indexOf(q[5]) === -1) { console.log("⛔ grounding-विफल: " + q[5]); ungrounded++; }
});
if (ungrounded) process.exit(1);
FACTS.forEach(function (q) {
  var correct = q[1], o = q.slice(1, 5); shuffle(o);
  push(q[0], o, o.indexOf(correct), 6);
});

/* ---- गूँथाई: प्रकार घूमते क्रम में ---- */
var byType = {}; BANK.forEach(function (Q) { (byType[Q.typ] = byType[Q.typ] || []).push(Q); });
var order = [1, 3, 5, 2, 6, 4], MIX = [], left = BANK.length;
while (left > 0) for (var o2 = 0; o2 < order.length; o2++) { var arr = byType[order[o2]]; if (arr && arr.length) { MIX.push(arr.shift()); left--; } }
BANK = MIX;
BANK.forEach(function (Q, qi) { Q.id = "tir-" + ("0000" + (qi + 1)).slice(-4); });

/* ---- नाप: लंबाई-पक्षपात ---- */
var biased = 0, eligible = 0;
BANK.forEach(function (Q) {
  var mx = -1, mi = -1, tie = false;
  Q.o.forEach(function (t2, ix) { if (t2.length > mx) { mx = t2.length; mi = ix; tie = false; } else if (t2.length === mx) tie = true; });
  if (!tie) { eligible++; if (mi === Q.a) biased++; }
});
var rate = Math.round(biased * 1000 / eligible) / 10;
var tc = []; for (var t3 = 1; t3 <= 6; t3++) if (typeCount[t3]) tc.push("T" + t3 + ":" + typeCount[t3]);
console.log("(tir) बैंक: " + BANK.length + " प्रश्न · प्रकार (" + tc.join(" ") + ")");
console.log("अकेला-सबसे-लंबा=सही दर: " + rate + "% (खिड़की 15-35%)");
if (rate < 15 || rate > 35) { console.log("⛔ लंबाई-पक्षपात"); process.exit(1); }
if (BANK.length < 360) { console.log("⛔ बैंक छोटा (360 से कम — total:120 हेतु ≥3× चाहिए)"); process.exit(1); }

if (!fs.existsSync("functions")) fs.mkdirSync("functions");
var out = "/* functions/tir_bank.js — PJ434 तिरहुता-लिपि प्रमाणपत्र server-परीक्षा बैंक v1.0 (27-Oct-2026)\n" +
  "   " + BANK.length + " प्रश्न · यांत्रिक जनरेटर (रूपांतरण-नक़्शे + पाठ 1-18 तथ्य) · regen: node generator/build_tirhuta_bank.js\n" +
  "   GitHub पर कभी नहीं — सिर्फ़ functions/ में (eng_bank.js-नियम)। लंबाई-संतुलित (v5.2 होल-मुक्त)। */\n" +
  "module.exports = " + JSON.stringify(BANK) + ";\n";
fs.writeFileSync("functions/tir_bank.js", out);
console.log("✅ functions/tir_bank.js लिखा (" + Math.round(out.length / 1024) + " KB)");
