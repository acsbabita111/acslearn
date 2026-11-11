#!/usr/bin/env node
/* ============================================================
   dev_registry_check.js v1.0 (जाँच-यंत्र, सिर्फ़ पढ़ता है) · 10-Nov-2026 · खेप-0 v1.1
   सवाल: "भाषा-रजिस्टर और live पेज/तालिकाएँ/sitemap/generator — सब एक-दूसरे से मेल खाते हैं?"
   कुछ नहीं लिखता — इसलिए Founder के clone में CHADHAO.bat के भीतर commit से पहले चलता है।
   रजिस्टर = generator/data/mirror_home_strings.js (lib_lang_registry.js से पढ़ा)।
   चलाना: node generator/dev_registry_check.js   (repo-रूट से) · exit 0 = पास
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const LR = require("./lib_lang_registry.js");
const ROOT = LR.ROOT;
let fails = 0, passes = 0;
function ck(name, ok, info) { if (ok) passes++; else { fails++; console.log("❌ " + name + (info ? "  (" + info + ")" : "")); } }
function rd(p) { return fs.readFileSync(path.join(ROOT, p), "utf8"); }
function has(p) { return fs.existsSync(path.join(ROOT, p)); }
function visible(s) { return s.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "").replace(/<[^>]+>/g, " "); }

/* 1) रजिस्टर: कड़ा पाठ + schema */
let M;
try { M = LR.load(); } catch (e) { console.log("❌ रजिस्टर पढ़ा नहीं गया: " + e.message); process.exit(1); }
const ORDER = Object.keys(M), ALL = ["hi", "en"].concat(ORDER);
const X = rd("assets/acs-react.js");
const lx = LR.lxCodes(X);
ck("react: LX-तालिका मिली", !!lx);
const E = LR.validate(M, { lxHave: lx || new Set(), needCareer: true });
E.forEach(e => ck("रजिस्टर: " + e, false));
ck("रजिस्टर-schema", E.length === 0, E.length + " दोष");

/* 2) हर भाषा के दोनों पेज + पूरा hreflang-गुच्छा */
const homeURL = c => c === "hi" ? "https://acslearn.com/" : "https://acslearn.com/" + c + "/";
const carURL = c => c === "hi" ? "https://acslearn.com/career.html" : "https://acslearn.com/" + c + "/career.html";
function cluster(s) { return (s.match(/hreflang="([^"]+)" href="([^"]+)"/g) || []); }
function expectSet(fn, xd) { return new Set(ALL.map(c => 'hreflang="' + c + '" href="' + fn(c) + '"').concat(['hreflang="x-default" href="' + xd + '"'])); }
const WANT_HOME = expectSet(homeURL, "https://acslearn.com/");
const WANT_CAR = expectSet(carURL, "https://acslearn.com/career.html");
function sameSet(a, b) { return a.size === b.size && [...a].every(x => b.has(x)); }
const titles = new Set();
for (const c of ALL) {
  const hf = c === "hi" ? "index.html" : c + "/index.html";
  const cf = c === "hi" ? "career.html" : c + "/career.html";
  for (const [f, W, kind] of [[hf, WANT_HOME, "होम"], [cf, WANT_CAR, "career"]]) {
    if (!has(f)) { ck(c + " " + kind + ": फ़ाइल " + f, false); continue; }
    const s = rd(f), cl = cluster(s);
    ck(c + " " + kind + ": hreflang ×" + (ALL.length + 1) + " (raw=unique)", cl.length === ALL.length + 1 && sameSet(new Set(cl), W), cl.length + "/" + new Set(cl).size);
    ck(c + " " + kind + ": <html lang>", new RegExp('<html lang="' + c + '"').test(s));
  }
  if (c === "hi" || c === "en" || !has(hf)) continue;
  const s = rd(hf), T = M[c];
  const b1 = (s.match(/class="btn btn-(?:white|green)" href="([^"]+)"/) || [])[1];   /* 12-Nov-2026: नए रूप वाले भाषा-होम में दरवाज़े हरे */
  ck(c + " होम: 🧭 बटन → " + (T.btn1href || "/" + c + "/career.html"), b1 === (T.btn1href || "/" + c + "/career.html"), b1);
  ck(c + " होम: dir", (T.dir === "rtl") === /<html lang="[a-z]+" dir="rtl">/.test(s));
  const v = visible(s);
  if (T.script !== "Latn" && LR.SCRIPTS[T.script]) ck(c + " होम: अपनी लिपि (" + T.script + ") दिखती", LR.SCRIPTS[T.script].test(v));
  if (T.script !== "Deva") { const m = v.match(/[\u0900-\u0963\u0966-\u097F]+/); ck(c + " होम: देवनागरी-रिसाव शून्य", !m, m && m[0]); }
  titles.add((s.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
}
ck("होम-titles सब अलग (" + ORDER.length + ")", titles.size === ORDER.length, titles.size);
{ const en = has("en/index.html") ? rd("en/index.html") : "";
  ck("en होम: 🧭 बटन → /en/career.html", (en.match(/class="btn btn-(?:white|green)" href="([^"]+)"/) || [])[1] === "/en/career.html"); } /* 12-Nov-2026: नए होम में चारों दरवाज़े हरे (build_home.js) */

/* 3) runtime-तालिकाएँ + sw */
const U = rd("assets/acs-universal.js");
const tk = ((U.match(/var ACS_LANG_HOMES = \{([^}]*)\};/) || [])[1] || "").split(",").map(x => x.split(":")[0].trim()).filter(Boolean);
ck("universal: ACS_LANG_HOMES == रजिस्टर+en", tk.join(",") === ["en"].concat(ORDER).join(","), tk.join(","));
if (lx) ck("react: LX में सब " + ALL.length + " भाषाएँ", ALL.every(c => lx.has(c)), ALL.filter(c => !lx.has(c)).join(","));
const sv = (rd("sw.js").match(/CACHE_VERSION = 'v(\d+)'/) || [])[1];
ck("sw: v" + LR.SW_BASE + " या नया", sv && +sv >= LR.SW_BASE, "v" + sv);

/* 4) sitemap: हर भाषा-घर व career ठीक एक बार */
const sm = rd("sitemap-core.xml");
const cnt = u => sm.split("<loc>" + u + "</loc>").length - 1;
for (const c of ALL) {
  ck("sitemap: " + homeURL(c) + " ×1", cnt(homeURL(c)) === 1);
  ck("sitemap: " + carURL(c) + " ×1", cnt(carURL(c)) === 1);
}

/* 5) generator सचमुच रजिस्टर से चलते हैं (हाथ की भाषा-सूची निषिद्ध) */
const HAND = /\[\s*['"](?:hi|en)['"]\s*,\s*['"](?:en|zh)['"]\s*,\s*['"](?:zh|es)['"]/;
const G = {
  "build_sitemap.js": [/require\(\s*["']\.\/data\/mirror_home_strings\.js["']\s*\)/],
  "patch_career_hi.js": [/require\(\s*['"]\.\/data\/mirror_home_strings\.js['"]\s*\)/],
  "build_mirror_homes.js": [/require\(\s*["']\.\/lib_lang_registry\.js["']\s*\)/],
  "build_career_lang.js": [/process\.argv\[2\]/]
};
for (const [f, must] of Object.entries(G)) {
  const s = rd("generator/" + f);
  must.forEach(re => ck("generator " + f + ": रजिस्टर से (" + re.source.slice(0, 30) + ")", re.test(s)));
  ck("generator " + f + ": हाथ की भाषा-सूची नहीं", !HAND.test(s));
}

{ /* 12-Nov-2026: 🌐 भाषा-बटन का पहरा (बटन → पट्टी → सूची → सही पता); यंत्र: dev_lang_switch_check.js */
  const r = require("child_process").spawnSync(process.execPath, [require("path").join(__dirname, "dev_lang_switch_check.js")], { encoding: "utf8" });
  ck("🌐 भाषा-बटन: सूची और रास्ते (dev_lang_switch_check)", r.status === 0);
}
console.log("\nजाँचें: पास " + passes + " · FAIL " + fails + "  (रजिस्टर " + ORDER.length + " भाषाएँ + hi + en = " + ALL.length + ")");
console.log(fails ? "⛔ dev_registry_check FAIL" : "🏁 dev_registry_check — सब पास");
process.exit(fails ? 1 : 0);
