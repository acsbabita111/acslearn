/* dev_bolo_check.js v1.1 · 25-Oct-2026 — 🎙️ बोलो-अभ्यास का गणित-robot (acs-bolo.js)
   हरा/लाल/काला, प्रतिशत (कुल 100), संख्या/एक-आवाज़ शब्द, फ़ालतू शब्द, गति। fail = देय नहीं। */
const B = require("../assets/acs-bolo.js");
let F = 0, P = 0;
function ok(c, m) { if (c) P++; else { F++; console.log("❌ " + m); } }
function st(t, h, lang) { const r = B.score(t, h, lang || "en-IN"); return { s: r.words.filter(x => x.st !== "-").map(x => x.st).join(""), r }; }
const C = [
  ["I speak Hindi.", "I speak Hindi", "ggg", 100, 0, 0],
  ["I speak Hindi.", "i speak hindi", "ggg", 100, 0, 0],
  ["I speak Hindi.", "I speak", "ggb", 67, 0, 33],
  ["I speak Hindi.", "I speak English", "ggr", 67, 33, 0],
  ["I speak Hindi.", "", "bbb", 0, 0, 100],
  ["This month has thirty-one days.", "this month has 31 days", "ggggg", 100, 0, 0],
  ["This month has thirty-one days.", "this month has thirty one days", "ggggg", 100, 0, 0],
  ["This month has thirty-one days.", "this month has 30 days", "gggrg", 80, 20, 0],
  ["I have two children.", "I have 2 children", "gggg", 100, 0, 0],
  ["I have two children.", "I have to children", "gggg", 100, 0, 0],
  ["I went to work at eight.", "I went 2 work at 8:00", "gggggg", 100, 0, 0],
  ["I don't know.", "I don’t know", "ggg", 100, 0, 0],
  ["I don't know.", "I do not know", "grg", 67, 33, 0],
  ["What is your name?", "what is you're name", "gggg", 100, 0, 0],
  ["Where is the toilet?", "where is toilet", "ggbg", 75, 0, 25],
  ["She works in a clothes factory.", "she work in a cloth factory", "grggrg", 67, 33, 0],
  ["I am from Bihar.", "I am from Bihar and I am happy", "gggg", 100, 0, 0]
];
for (const [t, h, exp, g, r, b] of C) {
  const x = st(t, h);
  ok(x.s === exp, `"${t}" ← "${h}" : रंग ${x.s} ≠ ${exp}`);
  ok(x.r.gp === g && x.r.rp === r && x.r.bp === b, `"${t}" ← "${h}" : % ${x.r.gp}/${x.r.rp}/${x.r.bp} ≠ ${g}/${r}/${b}`);
  ok(x.r.gp + x.r.rp + x.r.bp === 100, `"${t}" : % का जोड़ 100 नहीं`);
}
ok(B.score("I am from Bihar.", "I am from Bihar and I am happy", "en-IN").extra === 4, "फ़ालतू-शब्द गिनती 4 नहीं");
/* गोलाई: 8 शब्द, 1 सही 7 ग़लत → 13+87 */
{ const r = B.score("a b c d e f g h", "a x x x x x x x", "xx"); ok(r.gp + r.rp + r.bp === 100 && r.bp === 0, "8-शब्द गोलाई: " + [r.gp, r.rp, r.bp]); }
/* ग़ैर-अंग्रेज़ी: संख्या/एक-आवाज़ नियम नहीं, हिंदी विराम हटे */
{ const r = B.score("मैं हिंदी बोलता हूँ।", "मैं हिंदी बोलता हूँ", "hi-IN"); ok(r.gp === 100, "हिंदी । विराम: " + r.gp); }
{ const r = B.score("two", "to", "de-DE"); ok(r.gp === 0, "ग़ैर-अंग्रेज़ी में to=two नहीं होना चाहिए"); }
/* v1.1: बिना-space लिपियाँ — अक्षर-दर-अक्षर */
{ const r = B.score("สวัสดีครับ", "สวัสดีครับ", "th-TH"); ok(r.unit === "char" && r.gp === 100, "थाई पूरा सही (अक्षर-मोड): " + r.unit + " " + r.gp); }
{ const r = B.score("你好吗", "你好", "zh-CN"); ok(r.unit === "char" && r.b === 1 && r.g === 2, "चीनी: एक अक्षर छूटा = काला: g" + r.g + " b" + r.b); }
{ const r = B.score("I speak Hindi.", "I speak Hindi", "en-IN"); ok(r.unit === "word", "अंग्रेज़ी शब्द-मोड"); }
/* लिपि-पहचान (लिपि-पहरा का आधार) */
ok(B.scriptOf("Ez kurdî dizanim") === "latin" && B.scriptOf("मैं हिंदी") === "devanagari" && B.scriptOf("Я говорю") === "cyrillic" && B.scriptOf("مرحبا") === "arabic" && B.scriptOf("สวัสดี") === "thai", "scriptOf: लैटिन/देवनागरी/सिरिलिक/अरबी/थाई");
ok(B.wpm(4, 2000) === 120, "गति 4 शब्द/2 सेकंड = 120");
ok(B.wpm(4, 100) === 0 && B.wpm(0, 3000) === 0, "बहुत छोटा समय/शून्य शब्द पर गति — नहीं");
console.log(F ? `\n❌ bolo-robot: ${F} fail / ${P} pass` : `🏁 bolo-robot: सब ${P} जाँच पास`);
process.exit(F ? 1 : 0);
