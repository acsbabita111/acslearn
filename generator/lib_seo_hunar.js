/* ============================================================
   lib_seo_hunar.js v1.3 (12-Nov-2026) : हुनर-कोर्स, उद्यम, विषय-पेज और नियम-पेज के
   खोज-शीर्षक (title) व खोज-विवरण (description) के नियम : एकमात्र घर।
   (भाषा-कोर्स परिवार के नियम lib_seo_meta.js में हैं; यह उसका जोड़ीदार है।)
   क्यों बना (ChatGPT की 8,602-पेज जाँच, 11-Nov-2026):
   1) हर पाठ के शीर्षक में पूरा लंबा कोर्स-नाम दोहराया जाता था (चार-पहिया 441/441, DCA 494,
      मशरूम 396, वेल्डिंग 265)। अब शीर्षक = पाठ का नाम + छोटा कोर्स-नाम + ACS।
   2) 65 पाठ-पेजों का description टूटा था (वेल्डिंग 52, बाक़ी 13): पाठ-नाम या वाक्य में
      उद्धरण-चिह्न (") था और वह बिना बदले attribute में चला गया। अब " की जगह &quot; जाता है।
   3) DCA / ई-कॉमर्स / चार-पहिया के description सिर्फ़ शीर्षक की नक़ल थे। अब description
      पाठ के अपने पहले अनुच्छेद से बनता है (पेज का अपना, सच्चा सार)।
   4) टू-व्हीलर के 409 description बहुत छोटे थे। अब उनमें पाठ का पहला वाक्य जुड़ता है।
   v1.1 में जुड़ा:
   5) जो description "पिछले पाठ में…" या "पाठ-12 में हमने…" जैसे पीछे के ज़िक्र से शुरू होता था,
      उसमें से वह शुरुआती वाक्य हटता है; description सीधे इस पाठ की बात से शुरू होता है।
   6) उद्यम-पेज: 80 अक्षर से लंबे शीर्षक छोटे (पहले " — पूरी जानकारी" हटता है; फिर भी लंबा हो तो
      कोष्ठक वाला अंग्रेज़ी नाम शीर्षक से हटता है : वह पेज के H1 और description में यथावत रहता है)।
   v1.2 में बदला (ChatGPT की जाँच: v1.1 के 358 में 166 description अधूरे वाक्य पर कट रहे थे):
   7) पाठ से बना description अब हमेशा पूरे वाक्यों से बनता है (70 से 160 अक्षर), बीच से नहीं कटता।
      पाठ के पहले तीन अनुच्छेदों में से वह पहला वाक्य चुना जाता है जो पीछे के पाठ का ज़िक्र न करे
      और "पर…", "उन्हें…" जैसे अधूरे इशारे से शुरू न हो। पाठ-नाम तभी आगे जुड़ता है जब पूरा वाक्य समा जाए।
      (पीछे के पाठ का ज़िक्र काफ़ी कम हुआ है, पूरा हटा नहीं: "हमने…" से शुरू होने वाले वाक्य अभी नहीं छँटते।)
      v1.3: जहाँ कोई पूरा वाक्य 160 अक्षर में न समाए, वहाँ description data/seo_desc_overrides.js से आता है।
   8) उद्यम-शीर्षक: कोष्ठक में अंग्रेज़ी के साथ हिंदी पहचान (जैसे "बांग्लादेश, विश्व दूसरा") हो तो वह शीर्षक में रहती है।
   9) पाठ-पेज के schema (LearningResource) का description = पेज का meta description (एक ही सच)।
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
const OVERRIDE = require("./data/seo_desc_overrides.js");
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
function compose(html, para) {
  if (!para) return "";
  const name = lessonName(html);
  const full = (name && len(name) <= 70 && para.indexOf(name) !== 0) ? name + ": " + para : para;
  let d = cut(full, D_MAX);
  if (len(d) < D_MIN) d = cutWord(full, D_MAX);
  return d;
}
/* v1.0 का रूप (जमा हुआ): सिर्फ़ इसलिए रखा है कि v1.0 से बने description पहचाने जा सकें */
function fromBodyV1(html) { return compose(html, firstPara(html)); }
/* H1 के बाद के पहले कुछ असली अनुच्छेद */
function paras(html, max) {
  const i = html.search(/<h1[\s>]/); if (i < 0) return [];
  const b = html.slice(i), re = /<p(\s[^>]*)?>([\s\S]*?)<\/p>/g, out = []; let m;
  while ((m = re.exec(b)) && out.length < max) {
    if (m[1] && /class=/.test(m[1])) continue;
    const t = plain(m[2]);
    if (len(t) >= 60 && !/पढ़ने का समय|मूल भाषा|ग्लोबल साउथ तक/.test(t)) out.push(t);
  }
  return out;
}
/* पीछे के पाठ का ज़िक्र करने वाला वाक्य (description की शुरुआत में काम का नहीं) */
const BACKREF = /^(पिछले|पिछली|पिछला|अब तक|अभी तक|पाठ[- ]?[0-9]+(\.[0-9]+)?(-[0-9]+)? (में|तक|से|और|व) )/;
/* अधूरे इशारे से शुरू होने वाला वाक्य (अकेला पढ़ने पर समझ नहीं आता) : कम पसंद */
const DEICTIC = /^(पर |अब उस|अब इस|अब इन|आज हम इसे|आज हम इसी|आज हम उस|उन्हें |उसे |इसे |इन्हें |इसी |उसी |वही |यही |इस तरह|इसलिए|इसीलिए|लेकिन |मगर |किंतु |परंतु |और |तो |फिर |यहाँ भी|वहाँ |ऐसे में|ऐसा )/;
const SENT_END = /[।?!]["'”’)]*$/;
/* अधूरे अंत वाले शब्द: description इन पर ख़त्म नहीं होना चाहिए */
const DANGLE = /(?:^|\s)(?:और|या|के|की|का|में|से|को|पर|कि|व|एवं|तथा|जो|तो|—|-)$/;
function trimDangle(t) { let x = t.replace(/[\s,;:]+$/, ""); for (let k = 0; k < 4 && DANGLE.test(x); k++) x = x.replace(/\s*\S+$/, "").replace(/[\s,;:—-]+$/, ""); return x; }
/* पूरे वाक्यों से description (70 से 160 अक्षर)। वाक्य कभी बीच से नहीं कटता। */
function fromBody(html) {
  const ps = paras(html, 3); if (!ps.length) return "";
  const S = []; ps.forEach(p => p.split(/(?<=[।?!]["'”’)]*)\s+/).forEach(x => { x = x.trim(); if (x) S.push(x); }));
  const name = lessonName(html), useName = name && len(name) <= 70;
  function build(i, limit) {             /* i से शुरू होकर जितने पूरे वाक्य limit में समाएँ */
    if (!SENT_END.test(S[i]) || len(S[i]) > limit) return "";
    let t = S[i];
    for (let k = i + 1; k < S.length && SENT_END.test(S[k]) && len(t) + 1 + len(S[k]) <= limit; k++) t += " " + S[k];
    return t;
  }
  function candidate(i) {
    if (useName && S[i].indexOf(name) !== 0) { const t = build(i, D_MAX - len(name) - 2); if (t && len(name) + 2 + len(t) >= D_MIN) return name + ": " + t; }
    const t = build(i, D_MAX); return (t && len(t) >= D_MIN) ? t : "";
  }
  for (const tier of [0, 1, 2]) for (let i = 0; i < S.length; i++) {
    const ti = BACKREF.test(S[i]) ? 2 : DEICTIC.test(S[i]) ? 1 : 0;
    if (ti !== tier) continue;
    const c = candidate(i); if (c) return c;
  }
  /* कोई पूरा वाक्य 160 में न समाए (बहुत लंबे वाक्य): शब्द-सीमा पर काटो, पर अधूरे शब्द पर ख़त्म मत करो */
  const full = (useName && ps[0].indexOf(name) !== 0) ? name + ": " + ps[0] : ps[0];
  return trimDangle(cutWord(full, D_MAX));
}
/* लौटाता है नया description, या null (= पुराना ठीक है, मत छुओ)।
   broken = पुराने attribute में कच्चा उद्धरण-चिह्न था (तब कम-से-कम सही escape के साथ दोबारा लिखना ज़रूरी) */
function desc(F, oldRaw, html, broken, rel) {
  const old = (oldRaw || "").trim();
  const ov = rel ? OVERRIDE[String(rel).replace(/\\/g, "/")] : null;       /* हाथ से लिखा description : सबसे ऊपर */
  if (ov) return ov === old ? (broken ? old : null) : ov;
  const derived = !!old && old === fromBodyV1(html);                 /* v1.0 से बना description : नए नियम से दोबारा */
  const boiler = BOILER.test(old) || derived, generic = GENERIC.indexOf(old) > -1, short = len(old) < D_MIN;
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
  if (derived && d === old) return broken ? old : null;
  return d || (broken ? old : null);
}
/* ---- उद्यम-पेज का शीर्षक ---- */
const UD_SUF = " — पूरी जानकारी | ACS";
function udyamTitle(old) {
  if (!old.endsWith(UD_SUF) || len(unesc(old)) <= T_SOFT) return null;   /* नया रूप या पहले से छोटा : मत छुओ */
  const name = old.slice(0, -UD_SUF.length);
  const t1 = name + " | ACS";
  if (len(unesc(t1)) <= T_SOFT) return t1;
  const bare = name.replace(/\s*\([^()]*\)/g, "").replace(/\s+/g, " ").trim();
  if (!bare || bare === name) return t1;
  /* कोष्ठक में अंग्रेज़ी नाम के साथ हिंदी पहचान हो (जैसे "Ready-Made Garments — बांग्लादेश, विश्व दूसरा") तो हिंदी हिस्सा रखो */
  const pm = name.match(/\(([^()]*)\)/);
  if (pm) {
    const hin = pm[1].split(" — ").map(x => x.trim()).filter(x => /[\u0900-\u097F]/.test(x));
    if (hin.length) { const t3 = bare + ": " + hin.join(", ") + " | ACS"; if (len(unesc(t3)) <= T_SOFT) return t3; }
  }
  const t2 = bare + ": पूरी जानकारी | ACS";
  return len(unesc(t2)) <= T_SOFT ? t2 : bare + " | ACS";
}
/* हाथ से लिखे description की जाँच (फ़ाइल पढ़ते ही): 70 से 160 अक्षर, पूरे वाक्य पर ख़त्म */
Object.keys(OVERRIDE).forEach(k => { const t = OVERRIDE[k]; if (len(t) < D_MIN || len(t) > D_MAX || !SENT_END.test(t)) throw new Error("seo_desc_overrides.js: description 70-160 अक्षर का और पूरे वाक्य पर ख़त्म होना चाहिए: " + k); });
/* यंत्र के हिसाब से इस पाठ का description क्या होना चाहिए (जाँच-यंत्र के लिए) */
function expected(html, rel) { return OVERRIDE[String(rel).replace(/\\/g, "/")] || fromBody(html); }
module.exports = { expected, OVERRIDE, FAMILIES, familyOf, title, desc, firstPara, fromBody, fromBodyV1, udyamTitle, lessonName, DANGLE, SENT_END, trimDangle, cut, attr, unesc, len, BOILER, T_SOFT, D_MIN, D_MAX };
