/* generator/dev_tirhuta_engine_check.js — v1.0 (27-Oct-2026)
   तिरहुता-इंजन का fail-closed robot (कैथी-साँचा)।
   जाँचें: (1) नक़्शे का हर कोड Unicode Tirhuta-block में (2) 14 स्वर + 33 व्यंजन +
   13 मात्राएँ + 10 अंक मौजूद (3) round-trip देवनागरी→तिरहुता→देवनागरी हूबहू
   (ड़/ढ़/अंक के दर्ज अपवादों सहित) (4) ड़/ढ़ = DDA/DDHA+नुक़्ता (5) दफ़्तरी
   नमूना-शब्द बिना बचे देवनागरी के बनें (6) browser-सिरे window.TIRHUTA_LIPI। */
"use strict";
var vm = require("vm"), fs = require("fs"); var fail = 0;
function ok(c, m) { if (!c) { console.log("⛔ " + m); fail++; } }
var sb = { window: {} }; vm.createContext(sb);
vm.runInContext(fs.readFileSync("assets/tirhuta_lipi.js", "utf8"), sb);
var K = sb.window.TIRHUTA_LIPI; ok(!!K, "window.TIRHUTA_LIPI नहीं");
var toT = K.devaToTirhuta, toD = K.tirhutaToDeva;
/* 1. हर मान block के भीतर + अनोखा */
var seen = {}, n = 0;
for (var k in K.map) {
  var cp = K.map[k].codePointAt(0); n++;
  ok(cp >= 0x11480 && cp <= 0x114D9, "block-बाहर: " + k);
  if (!(k >= "0" && k <= "9")) { ok(!seen[K.map[k]], "दोहराव-glyph: " + k); seen[K.map[k]] = 1; }
}
/* 2. गिनती-भराव */
"अआइईउऊऋॠऌॡएऐओऔ".split("").forEach(function (v) { ok(!!K.map[v], "स्वर ग़ायब: " + v); });
"कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसह".split("").forEach(function (v) { ok(!!K.map[v], "व्यंजन ग़ायब: " + v); });
["ा","ि","ी","ु","ू","ृ","े","ै","ो","ौ","ँ","ं","ः"].forEach(function (m) { ok(!!K.map[m], "मात्रा ग़ायब: " + m); });
ok([...K.digits].length === 10 && K.map["५"] === "\u{114D5}", "अंक-पंक्ति ग़लत");
/* 3. round-trip (शुद्ध नक़्शा-अक्षरों पर हूबहू) */
["राम", "मिथिला", "विद्यापति", "खतियान", "जमाबंदी", "गाँव", "पूरब", "दरभंगा", "सौराठ", "पंजी", "ॐ"].forEach(function (w) {
  var t = toT(w), back = toD(t);
  ok(back === w, "round-trip टूटा: " + w + " → " + back);
  ok(!/[\u0900-\u097F]/.test(t), "देवनागरी बची: " + w + " → " + t);
});
/* 4. ड़/ढ़ = नुक़्ता-जोड़ */
ok(toT("ड़") === "\u{1149B}\u{114C3}", "ड़ नुक़्ता-जोड़ नहीं");
ok(toT("पढ़ी") === "\u{114A3}\u{1149C}\u{114C3}\u{114B2}", "पढ़ी ग़लत");
ok(toD(toT("खगड़िया")) === "खगड़िया", "ड़ round-trip टूटा");
/* 5. अंक व दंड-नियम */
ok(toT("१९२६") === "\u{114D1}\u{114D9}\u{114D2}\u{114D6}", "देव-अंक → तिरहुता-अंक नहीं");
ok(toT("सन 1926।") === toT("सन") + " " + "\u{114D1}\u{114D9}\u{114D2}\u{114D6}" + "।", "ASCII-अंक/दंड-passthrough टूटा");
ok(toD("\u{114D5}") === "५", "तिरहुता-अंक उल्टे में देव-अंक नहीं");
/* 6. फ़ॉन्ट मौजूद */
ok(fs.existsSync("/home/claude/fonts/NotoSansTirhuta-Regular.ttf"), "ttf फ़ॉन्ट नहीं");
if (fail) { console.log("⛔ " + fail + " दोष"); process.exit(1); }
console.log("🏁 tirhuta-इंजन: " + n + " नक़्शा-प्रविष्टियाँ · 14+33+मात्राएँ+10 अंक · round-trip 11/11 · नुक़्ता-नियम — सब पास");
