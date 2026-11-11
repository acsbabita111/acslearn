/* ============================================================
   lib_seo_hunar.js v1.0 (11-Nov-2026) : हुनर-कोर्स, उद्यम, विषय-पेज और नियम-पेज के
   खोज-शीर्षक (title) व खोज-विवरण (description) के नियम : एकमात्र घर।
   (भाषा-कोर्स परिवार के नियम lib_seo_meta.js में हैं; यह उसका जोड़ीदार है।)
   क्यों बना (ChatGPT की 8,602-पेज जाँच, 11-Nov-2026):
   1) हर पाठ के शीर्षक में पूरा लंबा कोर्स-नाम दोहराया जाता था (चार-पहिया 441/441, DCA 494,
      मशरूम 396, वेल्डिंग 265)। अब शीर्षक = पाठ का नाम + छोटा कोर्स-नाम + ACS।
   2) 11 पेजों का description टूटा था: पाठ-नाम में उद्धरण-चिह्न (") था और वह बिना बदले
      attribute में चला गया। अब हर attribute में " की जगह &quot; जाता है।
   3) DCA / ई-कॉमर्स / चार-पहिया के description सिर्फ़ शीर्षक की नक़ल थे। अब description
      पाठ के अपने पहले अनुच्छेद से बनता है (पेज का अपना, सच्चा सार)।
   4) टू-व्हीलर के 409 description बहुत छोटे थे। अब उनमें पाठ का पहला वाक्य जुड़ता है।
   नियम: पाठ का अपना नाम कभी नहीं काटा जाता। कोर्स का पूरा नाम पेज के भीतर (H1/पाठ) यथावत।
   ============================================================ */
"use strict";
const len = s => [...s].length;
const T_SOFT = 80, D_MIN = 70, D_MAX = 160;
/* हर परिवार: folder · छोटा नाम · वे पूरे कोर्स-नाम जो शीर्षक से हटते हैं */
const FAMILIES = [
  { key: "fwd", dir: "courses/hi/four-wheeler-driver", short: "चार-पहिया चालक कोर्स",
    names: ["पेशेवर चार-पहिया चालक प्रमाणपत्र कोर्स — देश से विदेश तक"] },
  { key: "dca", dir: "courses/hi/digital/dca", short: "डीसीए (DCA) कोर्स",
    names: ["डीसीए — डिप्लोमा इन कंप्यूटर एप्लिकेशन (DCA)", "DCA-2036: कंप्यूटर, AI व डिजिटल-उद्यमिता"] },
  { key: "ecom", dir: "courses/hi/digital/ecom", short: "ई-कॉमर्स कोर्स", names: ["ACS ई-कॉमर्स मास्टरी"] },
  { key: "msh", dir: "courses/hi/mushroom-cultivation-marketing", short: "मशरूम कोर्स", names: ["मशरूम: खेती, व्यापार और उद्यमिता"] },
  { key: "twv", dir: "courses/hi/two-wheeler", short: "टू-व्हीलर कोर्स", names: ["ACS टू-व्हीलर कोर्स"],
    /* वे पाठ-नाम जो कई अध्यायों में हूबहू एक हैं: आगे "अध्याय-N:" जुड़ता है (N फ़ाइल-नाम से) */
    genericCores: ["भाग-2 अभ्यास — व्यावहारिक परीक्षण"], chapRe: /twv-0*([0-9]+[a-z]?)-/,
    nameRe: /^ACS (टू-व्हीलर कोर्स )?पाठ [0-9A-Za-z.]+$|^ACS टू-व्हीलर कोर्स पाठ [0-9A-Za-z.]+$/ },
  { key: "wld", dir: "courses/hi/welding", short: "वेल्डिंग कोर्स", names: ["ACS Welding Course"], skipIfCoreHas: "वेल्डिंग" }
];
const BRANDS = ["ACS", "ACSLEARN"];
function familyOf(rel) {
  rel = rel.replace(/\\/g, "/");
  for (const F of FAMILIES) if (rel.indexOf(F.dir + "/") === 0 && rel.slice(F.dir.length + 1).indexOf("/") < 0) return F;
  return null;
}
/* शीर्षक: पुराना या नया, दोनों रूप पढ़कर एक ही नया रूप लौटाता है। कोर्स-नाम न मिले तो null (पेज अछूता)। */
function title(F, old, rel) {
  let segs = old.split(" | "), hit = false;
  while (segs.length > 1 && BRANDS.indexOf(segs[segs.length - 1]) > -1) segs.pop();
  const isName = s => F.names.indexOf(s) > -1 || s === F.short || (F.nameRe && F.nameRe.test(s));
  const keep = [];
  for (const s of segs) { if (isName(s)) hit = true; else keep.push(s); }
  if (keep.length) for (const n of F.names) { const tail = " — " + n; const last = keep[keep.length - 1]; if (last.endsWith(tail) && last.length > tail.length) { keep[keep.length - 1] = last.slice(0, -tail.length); hit = true; } }
  if (!hit || !keep.length) return null;
  let core = keep.join(" | ");
  if (F.genericCores && F.genericCores.indexOf(core) > -1 && rel) { const c = String(rel).match(F.chapRe); if (c) core = "अध्याय-" + c[1] + ": " + core; }
  const withShort = core + " | " + F.short + " | ACS", bare = core + " | ACS";
  if (F.skipIfCoreHas && core.indexOf(F.skipIfCoreHas) > -1) return bare;
  return len(withShort) <= T_SOFT ? withShort : bare;
}
/* ---- description ---- */
const unesc = s => s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const attr = s => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const BOILER = / — मुफ़्त हिंदी पाठ, .+ \(ACS\)। कक्षा-6 स्तर की सरल भाषा में।$/;
function plain(html) { return unesc(html.replace(/<(script|style)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim(); }
/* पाठ का पहला असली अनुच्छेद (H1 के बाद; समय/पाठ-संख्या वाली पट्टी छोड़कर) */
function firstPara(html) {
  const i = html.search(/<h1[\s>]/); if (i < 0) return "";
  const b = html.slice(i);
  const re = /<p(\s[^>]*)?>([\s\S]*?)<\/p>/g; let m;
  while ((m = re.exec(b))) {
    if (m[1] && /class=/.test(m[1])) continue;
    const t = plain(m[2]);
    if (len(t) >= 60 && !/पढ़ने का समय|मूल भाषा|ग्लोबल साउथ तक/.test(t)) return t;
  }
  return "";
}
/* वाक्य-सीमा पर काटना (अधिकतम max अक्षर); वाक्य न बैठे तो शब्द-सीमा पर। "…" कभी नहीं। */
function cut(t, max) {
  if (len(t) <= max) return t;
  const cs = [...t]; let best = -1;
  for (let i = 0; i < max; i++) if ("।.!?".indexOf(cs[i]) > -1 && (i + 1 >= cs.length || cs[i + 1] === " ")) best = i;
  if (best >= 50) return cs.slice(0, best + 1).join("");
  let j = max; while (j > 0 && cs[j] !== " ") j--;
  return cs.slice(0, j).join("").replace(/[\s,;:—-]+$/, "");
}
const GENERIC = require("./data/seo_generic_desc.js");
/* शब्द-सीमा पर काटना (जब वाक्य-सीमा बहुत पहले पड़े) */
function cutWord(t, max) {
  if (len(t) <= max) return t;
  const cs = [...t]; let j = max; while (j > 0 && cs[j] !== " ") j--;
  return cs.slice(0, j).join("").replace(/[\s,;:—-]+$/, "");
}
/* पाठ का अपना नाम: H1 से, आगे का "पाठ-12:" हटाकर */
function lessonName(html) {
  const m = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/); if (!m) return "";
  return plain(m[1]).replace(/^(वेल्डिंग )?(सुरक्षा )?पाठ[- ]?[0-9A-Za-z.]+\s*[:—-]\s*/, "").trim();
}
/* पाठ के अनुच्छेद से बना description: "पाठ-नाम: पहला अनुच्छेद" (160 अक्षर तक) */
function fromBody(html) {
  const para = firstPara(html); if (!para) return "";
  const name = lessonName(html);
  const full = (name && len(name) <= 70 && para.indexOf(name) !== 0) ? name + ": " + para : para;
  let d = cut(full, D_MAX);
  if (len(d) < D_MIN) d = cutWord(full, D_MAX);   /* पूरा वाक्य 70 अक्षर से छोटा पड़े, तभी शब्द-सीमा पर काटो */
  return d;
}
/* लौटाता है नया description, या null (= पुराना ठीक है, मत छुओ)।
   broken = पुराने attribute में कच्चा उद्धरण-चिह्न था (तब कम-से-कम सही escape के साथ दोबारा लिखना ज़रूरी) */
function desc(F, oldRaw, html, broken) {
  const old = (oldRaw || "").trim();
  const boiler = BOILER.test(old), generic = GENERIC.indexOf(old) > -1, short = len(old) < D_MIN;
  if (!boiler && !generic && !short) return broken ? old : null;   /* अपना लिखा, ठीक लंबाई: वही रहे */
  if (short && old && !generic && !boiler) {   /* छोटा पर अपना लिखा: आगे पाठ का पहला वाक्य जोड़ो */
    const para = firstPara(html);
    const head = /[।.!?]$/.test(old) ? old : old + "।";
    const room = D_MAX - len(head) - 1;
    const add = (para && room >= 40) ? cut(para, room) : "";
    if (add && len(add) >= 30) return head + " " + add;
    return broken ? old : null;
  }
  const d = fromBody(html);
  return d || (broken ? old : null);
}
module.exports = { FAMILIES, familyOf, title, desc, firstPara, fromBody, lessonName, cut, attr, unesc, len, BOILER, T_SOFT, D_MIN, D_MAX };
