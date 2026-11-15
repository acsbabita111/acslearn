#!/usr/bin/env node
/* ============================================================
   dev_vocab_en_check.js v1.3 (15-Nov-2026; v1.1 पैनल-2: पुरानी dash_i18n_en.js न हो तो भी चले; v1.2 पैनल-2: V6-V8 एक चीज़ = एक English नाम; v1.3: English की तरफ़ से भी V9-V11, जाँच lib_vocab_en.js में): English शब्द-सूची का पहरेदार
   नियम का एकमात्र घर: generator/data/vocab_en.json (Founder की हाँ, 15-Nov-2026)।
   यह कुछ नहीं बदलता, सिर्फ़ जाँचता है। कोई जाँच फेल = exit 1।

   जाँचें:
     V0 : menu का "उद्यम" (links.js और acs-translate.js) English में vocab_en.json का शब्द
     V1 : हिंदी-English जोड़े (पैनल-पैक, dashboard-पैक, links.js, roles.js, acs-translate.js):
          हिंदी में "उद्यम" हो, तो English में "industry" उतनी ही बार, जितनी बार हिंदी में "उद्योग"
     V2, V3 : English पन्नों और English शब्द-भंडारों में "950 industries/sectors" या "🌍 Industries" नहीं
     V4 : हिंदी पन्नों में "950 सेक्टर" नहीं
     V5 : 950 उद्यम वाले दोनों पन्नों (हिंदी और English) में कार्ड/खोज/गिनती "सेक्टर/sector" नहीं कहते
     V6-V8 : एक चीज़ = एक English नाम: अभिरुचि-रिपोर्ट = Career Interest Report, अभिरुचि-परीक्षण = Career Interest Test,
          उद्योग-प्रशिक्षु = Entrepreneur Learner (हिंदी में जितनी बार, English में कम-से-कम उतनी बार)
     V9-V11 : English की तरफ़ से: "interest test/report" हर जगह पूरा नाम; "aptitude"/"career test" नहीं;
          ₹125 वाली छपने-योग्य रिपोर्ट की बात हो, तो "Career Interest Report" ज़रूर
   पन्नों का पाठ: दो बार जाँचा जाता है: कच्ची फ़ाइल (script के भीतर के वाक्य) और HTML tags हटाकर (tags में बँटे वाक्य)।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.resolve(__dirname, "..");
const rd = p => fs.readFileSync(path.join(ROOT, p), "utf8");
const V = JSON.parse(rd("generator/data/vocab_en.json"));
let pass = 0; const fails = [];
function ck(name, ok, info) { if (ok) pass++; else fails.push("❌ " + name + (info ? "\n     " + info : "")); }
const text = h => h.replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ");
function walk(dir, out) {
  for (const e of fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true })) {
    const p = dir ? dir + "/" + e.name : e.name;
    if (e.isDirectory()) { if (!/^(\.git|node_modules)$/.test(e.name)) walk(p, out); }
    else out.push(p);
  }
  return out;
}

/* ---- V0: menu ---- */
const links = (() => { const w = {}; new Function("window", rd("assets/links.js"))(w); return w.ACS_LINKS; })();
const um = (links.menu || []).find(m => m.key === "udyam");
ck("V0 links.js: menu 'उद्यम' का English = " + V.menu.udyam, um && um.label_en === V.menu.udyam, um && um.label_en);
const tr = rd("assets/acs-translate.js"), tm = /udyam:\s*\{[^}]*\ben:'([^']*)'/.exec(tr);
ck("V0 acs-translate.js: menu 'उद्यम' का English = 🌍 " + V.menu.udyam, tm && tm[1] === "🌍 " + V.menu.udyam, tm && tm[1]);

/* ---- V1: हिंदी-English जोड़े ---- */
const pairs = [];
(function () {
  const w = {}; new Function("window", rd("assets/i18n/panel_en.js"))(w);
  const D = w.ACS_PANEL_PACKS.en.D; for (const k in D) pairs.push(["assets/i18n/panel_en.js", k, D[k]]);
})();
(function () { /* पुराना dashboard-पैक (पैनल-2 से पहले): हो तो उसके "हिंदी":"English" जोड़े भी */
  if (!fs.existsSync(path.join(ROOT, "assets/dash_i18n_en.js"))) return;
  const s = rd("assets/dash_i18n_en.js"), re = /"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"/g; let m;
  while ((m = re.exec(s))) if (/[ऀ-ॿ]/.test(m[1])) pairs.push(["assets/dash_i18n_en.js", m[1], m[2]]);
})();
(links.menu || []).forEach(m => { if (m.label && m.label_en) pairs.push(["assets/links.js", m.label, m.label_en]); });
(function () { /* roles.js: एक ही वस्तु में hi/en, label/label_en, desc/desc_en */
  const s = rd("assets/roles.js"), re = /\b(hi|label|desc|title|text)\s*:\s*"((?:[^"\\]|\\.)*)"[^{}]*?\b\1?_?en\s*:\s*"((?:[^"\\]|\\.)*)"/g; let m;
  while ((m = re.exec(s))) pairs.push(["assets/roles.js", m[2], m[3]]);
  const re2 = /\bhi\s*:\s*"((?:[^"\\]|\\.)*)"[^{}]*?\ben\s*:\s*"((?:[^"\\]|\\.)*)"/g;
  while ((m = re2.exec(s))) pairs.push(["assets/roles.js", m[1], m[2]]);
})();
(function () { /* acs-translate.js: {hi:'..', en:'..'} */
  const re = /\bhi:'((?:[^'\\]|\\.)*)'[^{}]*?\ben:'((?:[^'\\]|\\.)*)'/g; let m;
  while ((m = re.exec(tr))) pairs.push(["assets/acs-translate.js", m[1], m[2]]);
})();
const R1 = V.pair_rules.find(r => r.id === "V1");
const reHi = new RegExp(R1.hi_re), reEn = new RegExp(R1.en_count_re, "gi"), reAllow = new RegExp(R1.hi_allow_re, "g");
const bad1 = [];
for (const [f, hi, en] of pairs) {
  if (!reHi.test(hi)) continue;
  const n = (en.match(reEn) || []).length, a = (hi.match(reAllow) || []).length;
  if (n > a) bad1.push(f + " :: " + hi.slice(0, 70) + "  ⇒  " + en.slice(0, 90));
}
ck("V1 'उद्यम' का English 'industry' नहीं (" + pairs.length + " जोड़े जाँचे)", pairs.length > 1000 && bad1.length === 0, bad1.slice(0, 8).join("\n     "));

/* ---- V6-V11: एक चीज़ = एक English नाम (नियम: vocab_en.json का one_name और en_side; जाँच: lib_vocab_en.js) ---- */
{
  const LV = require("./lib_vocab_en.js"), by = {};
  const ids = (V.one_name || []).map(r => r.id).concat(((V.en_side || {}).exact || []).map(r => r.id), ((V.en_side || {}).never || []).map(r => r.id), ((V.en_side || {}).context || []).map(r => r.id));
  ids.forEach(id => { by[id] = []; });
  for (const [f, hi, en] of pairs) for (const x of LV.pairViolations(V, hi, en)) (by[x.id] = by[x.id] || []).push(f + " :: " + x.msg + " :: " + hi.slice(0, 70) + "  ⇒  " + en.slice(0, 110));
  const NAME = { V6: "'अभिरुचि-रिपोर्ट' = Career Interest Report", V7: "'अभिरुचि-परीक्षण / करियर टेस्ट / Aptitude टेस्ट' = Career Interest Test", V8: "'उद्योग-प्रशिक्षु' = Entrepreneur Learner",
    V9: "English में 'interest test/report' हर जगह पूरा और ठीक नाम", V10: "English में 'aptitude' या 'career test' नहीं", V11: "₹125 वाली छपने-योग्य रिपोर्ट = Career Interest Report (संदर्भ से)" };
  ids.forEach(id => ck(id + " " + (NAME[id] || "") + " (" + pairs.length + " जोड़े)", ids.length >= 6 && by[id].length === 0, by[id].slice(0, 8).join("\n     ")));
}

/* ---- V2/V3: English ---- */
const all = walk("", []);
const enFiles = all.filter(p => /^en\/.*\.html$/.test(p) ||
  /^assets\/(i18n\/panel_en\.js|dash_i18n_en\.js|apt_[a-z_]*en[a-z_]*\.js|links\.js|acs-translate\.js)$/.test(p) ||
  /^assets\/apt_sets_en\//.test(p) || /^generator\/data\/aptitude\/en\//.test(p) ||
  /^generator\/data\/panel_i18n\/en\.json$/.test(p));
for (const r of V.never_en) {
  const re = new RegExp(r.re, "i"), hits = [];
  for (const p of enFiles) { const raw = rd(p);
    for (const t of /\.html$/.test(p) ? [raw, text(raw)] : [raw]) { const m = re.exec(t); if (m) { hits.push(p + " :: …" + t.slice(Math.max(0, m.index - 40), m.index + 50).replace(/\s+/g, " ") + "…"); break; } } }
  ck(r.id + " English में नहीं: /" + r.re + "/ (" + enFiles.length + " फ़ाइलें)", hits.length === 0, hits.slice(0, 6).join("\n     "));
}

/* ---- V4: हिंदी पन्ने ---- */
const hiFiles = all.filter(p => /\.html$/.test(p) && !/^en\//.test(p));
for (const r of V.never_hi) {
  const re = new RegExp(r.re), hits = [];
  for (const p of hiFiles) { const h = rd(p); if (h.indexOf("950") < 0) continue;
    for (const t of [h, text(h)]) { const m = re.exec(t); if (m) { hits.push(p + " :: …" + t.slice(Math.max(0, m.index - 40), m.index + 40).replace(/\s+/g, " ") + "…"); break; } } }
  ck(r.id + " हिंदी पन्नों में नहीं: /" + r.re + "/ (" + hiFiles.length + " पन्ने)", hits.length === 0, hits.slice(0, 6).join("\n     "));
}

/* ---- V5: 950 उद्यम वाले पन्ने ---- */
{
  const re = new RegExp(V.hub.never_re, "g");
  for (const p of V.hub.files) {
    const s = rd(p), hits = s.match(re) || [];
    ck(V.hub.id + " " + p + ": कार्ड/खोज/गिनती में 'सेक्टर/sector' नहीं", hits.length === 0, hits.join(" | "));
  }
}

fails.forEach(x => console.log(x));
console.log("\nजाँचें: पास " + pass + " · फेल " + fails.length);
console.log(fails.length ? "⛔ dev_vocab_en_check रुका" : "🏁 dev_vocab_en_check v1.3 : English शब्द-सूची (उद्यम = Enterprise; एक चीज़ = एक नाम) पास");
process.exit(fails.length ? 1 : 0);
