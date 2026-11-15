/* ============================================================
   lib_vocab_en.js v1.0 (15-Nov-2026, पैनल-2 v1.2): "एक चीज़ = एक English नाम" की जाँच: एक ही जगह।
   नियम का घर: generator/data/vocab_en.json (one_name = V6-V8, en_side = V9-V11)।
   इसे दो जगह से बुलाया जाता है (दोनों में एक-सा नतीजा):
     generator/build_panel_i18n.js  : English पैक बनाते समय (fail-closed)
     generator/dev_vocab_en_check.js: पूरी साइट के हिंदी-English जोड़ों पर
   pairViolations(V, hi, en) → [ {id, msg} ]   (ख़ाली सूची = ठीक)
   ============================================================ */
"use strict";
function count(s, re) { return (s.match(re) || []).length; }
function pairViolations(V, hi, en) {
  const out = [];
  hi = String(hi || ""); en = String(en || "");
  /* V6-V8: हिंदी शब्द जितनी बार, English नाम (अक्षर-अक्षर) कम-से-कम उतनी बार */
  for (const r of (V.one_name || [])) {
    const n = count(hi, new RegExp(r.hi_re, "g"));
    if (n && en.split(r.en).length - 1 < n) out.push({ id: r.id, msg: "एक चीज़ = एक नाम: '" + r.en + "' " + n + " बार चाहिए" });
  }
  const E = V.en_side || {};
  /* V9: English में "interest test/report" जहाँ भी आए, ठीक तय नाम ही हो */
  for (const r of (E.exact || [])) {
    const bad = (en.match(new RegExp(r.find_re, "gi")) || []).filter(m => r.allowed.indexOf(m) < 0);
    if (bad.length) out.push({ id: r.id, msg: "नाम पूरा और ठीक यही हो (" + r.allowed.join(" / ") + "), मिला: '" + bad[0] + "'" });
  }
  /* V10: ये शब्द English में कभी नहीं */
  for (const r of (E.never || [])) {
    const m = new RegExp(r.re, "i").exec(en);
    if (m) out.push({ id: r.id, msg: "English में '" + m[0] + "' नहीं" });
  }
  /* V11: संदर्भ (हिंदी या English किसी से भी पहचाना जाए) → English में तय नाम ज़रूर हो */
  for (const r of (E.context || [])) {
    const hit = (r.hi_re && new RegExp(r.hi_re).test(hi)) || (r.en_re && new RegExp(r.en_re, "i").test(en));
    if (hit && en.indexOf(r.must) < 0) out.push({ id: r.id, msg: "यहाँ '" + r.must + "' ज़रूरी है" });
  }
  return out;
}
module.exports = { pairViolations: pairViolations };
