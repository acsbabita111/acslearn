/* ============================================================
   lib_lang_registry.js v1.1 (10-Nov-2026, खेप-0 v1.2) · साझा टुकड़ा
   v1.1 (ChatGPT v1.1-ऑडिट): लिपि-जाँच हर खाने पर (Latn सहित, ब्रांड-शब्द छोड़कर ≥90%);
   font = पक्का नियम (gfam से बँधा); btn1href = सिर्फ़ अपना career-पेज; कच्चे JSON में
   दोहरी कुंजी पकड़ना (JSON.parse चुपचाप दूसरी रख लेता था); लिपि-सीमाएँ 30-भाषा योग्य।
   भाषा-रजिस्टर का एकमात्र पाठक + पूरा schema-जाँचक।
   रजिस्टर = generator/data/mirror_home_strings.js (रूप अटल:
     var MIRROR_HOME = { ...कड़ा JSON... };  — python-यंत्र भी इसी रूप को पढ़ता है)।
   उपयोग: build_mirror_homes.js (लिखने से पहले) · dev_registry_check.js (सिर्फ़ पढ़ना)।
   नियम: कोई भी जाँच यहीं बढ़ाओ — दो जगह दो जाँचें कभी नहीं।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const DATA = "generator/data/mirror_home_strings.js";

/* लिपि → अक्षर-पहचान (ISO 15924 कोड) */
const SCRIPTS = {
  /* Latn: +IPA-ext (ə ɓ ɗ — अज़रबैजानी/हाउसा) +modifier (ʻ — उज़्बेक) +Latin-Ext-Additional (ạ ế — वियतनामी) */
  Latn: /[A-Za-z\u00C0-\u024F\u0250-\u02AF\u02B0-\u02FF\u1E00-\u1EFF]/, Cyrl: /[\u0400-\u04FF\u0500-\u052F]/, Grek: /[\u0370-\u03FF]/,
  Arab: /[\u0600-\u06FF]/, Hebr: /[\u0590-\u05FF]/, Deva: /[\u0900-\u097F]/,
  Beng: /[\u0980-\u09FF]/, Guru: /[\u0A00-\u0A7F]/, Gujr: /[\u0A80-\u0AFF]/,
  Orya: /[\u0B00-\u0B7F]/, Taml: /[\u0B80-\u0BFF]/, Telu: /[\u0C00-\u0C7F]/,
  Knda: /[\u0C80-\u0CFF]/, Mlym: /[\u0D00-\u0D7F]/, Sinh: /[\u0D80-\u0DFF]/,
  Thai: /[\u0E00-\u0E7F]/, Mymr: /[\u1000-\u109F]/, Khmr: /[\u1780-\u17FF]/,
  Ethi: /[\u1200-\u139F]/, Hang: /[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/, Hans: /[\u4E00-\u9FFF]/,
  Jpan: /[\u3040-\u30FF\u4E00-\u9FFF]/
};
const RTL_SCRIPTS = ["Arab", "Hebr"];
const DEVA = /[\u0900-\u0963\u0966-\u097F]/;  /* रिसाव-जाँच: । ॥ (U+0964/65) सब भारतीय लिपियाँ साझा करती हैं — छूट */
const TEXT_KEYS = ["ttail", "desc", "ogdesc", "pill", "join", "btn1", "btn2", "btn3", "btn4",
  "tagline", "orig", "btnLang", "btnMenu", "drawer", "foottag", "fbcert", "certline",
  "fbcontact", "warn", "login", "font"];
/* ब्रांड-शब्द हर भाषा में Latin ही रहते हैं (brand-Latin नियम) — लिपि-अनुपात में नहीं गिने जाते */
const BRAND_TOKENS = ["Freedom Fighter Gangadhar Prasad Memorial Trust", "Applied Computer School", "FFGPMTrust",
  "acslearn.com", "ffgpmt.org", "Razorpay", "ACS", "ISO"];
const SCRIPT_MIN = 0.9;   /* हर खाने में (ब्रांड छोड़कर) अपनी लिपि के अक्षर ≥ 90% */
function scriptRatio(v, re) {
  BRAND_TOKENS.forEach(b => { v = v.split(b).join(" "); });
  const letters = v.match(/\p{L}/gu) || [];
  if (!letters.length) return null;               /* सिर्फ़ ब्रांड/अंक — जाँच लागू नहीं */
  return letters.filter(ch => re.test(ch)).length / letters.length;
}
/* कच्चे JSON-पाठ में किसी भी object की दोहरी कुंजी (JSON.parse चुपचाप आख़िरी रखता है) */
function dupKeys(text) {
  const out = [], st = [];
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (ch === '"') {
      let j = i + 1, str = "";
      while (j < text.length && text[j] !== '"') { if (text[j] === "\\") { str += text[j] + text[j + 1]; j += 2; } else str += text[j++]; }
      const top = st[st.length - 1];
      if (top && top.t === "o" && top.wantKey) {
        if (top.keys.has(str)) out.push((top.path ? top.path + "." : "") + str);
        top.keys.add(str); top.wantKey = false; top.last = str;
      }
      i = j + 1; continue;
    }
    if (ch === "{") { const top = st[st.length - 1]; st.push({ t: "o", keys: new Set(), wantKey: true, path: top && top.t === "o" ? ((top.path ? top.path + "." : "") + top.last) : (top ? top.path : "") }); }
    else if (ch === "[") { const top = st[st.length - 1]; st.push({ t: "a", path: top ? top.path : "" }); }
    else if (ch === "}" || ch === "]") st.pop();
    else if (ch === ",") { const top = st[st.length - 1]; if (top && top.t === "o") top.wantKey = true; }
    i++;
  }
  return out;
}
const REACT_KEYS = ["q", "like", "dis", "cmt", "sh", "wa", "nl", "nd"];
const SW_BASE = 823; /* 09-Nov भाषा-होम दौर का आधार — इससे नीचे कभी नहीं */

/* कड़ा पाठ: फ़ाइल-रूप + JSON + require-रूप तीनों एक */
function load() {
  const t = fs.readFileSync(path.join(ROOT, DATA), "utf8");
  const m = t.match(/^var MIRROR_HOME = (\{[\s\S]*?\n\});$/m);  /* पंक्ति-शुरुआत से — टिप्पणी कभी न पकड़े */
  if (!m) throw new Error("रजिस्टर का रूप टूटा: 'var MIRROR_HOME = {…};' नहीं मिला — " + DATA);
  let J;
  try { J = JSON.parse(m[1]); } catch (e) { throw new Error("रजिस्टर कड़ा JSON नहीं: " + e.message); }
  if ((t.match(/^var MIRROR_HOME = /gm) || []).length !== 1) throw new Error("रजिस्टर: data-पंक्ति ठीक एक बार हो");
  const dk = dupKeys(m[1]);
  if (dk.length) throw new Error("रजिस्टर में दोहरी कुंजी: " + dk.join(", "));
  const R = require(path.join(ROOT, DATA));
  if (JSON.stringify(J) !== JSON.stringify(R)) throw new Error("रजिस्टर: JSON-रूप और require-रूप अलग");
  return J;
}

/* opts.lxHave: Set — acs-react.js में मौजूद भाषाएँ; opts.needCareer: हर भाषा का /c/career.html हो */
function validate(M, opts) {
  opts = opts || {};
  const E = [];
  const codes = Object.keys(M);
  const seen = new Set();
  /* आरक्षित नाम: repo-रूट के वे फ़ोल्डर जो भाषा-घर नहीं (भाषा-घर = सिर्फ़ index/career/rules-consent) */
  const LANG_FILES = new Set(["index.html", "career.html", "rules-consent-learner.html"]);
  if (!codes.length) E.push("रजिस्टर ख़ाली");
  for (const c of codes) {
    const T = M[c], t = c + ": ";
    if (!/^[a-z]{2,3}$/.test(c)) E.push(t + "कोड 2-3 छोटे अक्षर नहीं");
    if (c === "hi" || c === "en") E.push(t + "hi/en रजिस्टर में नहीं आते (मूल/पुल अलग)");
    if (seen.has(c)) E.push(t + "दोहराव"); seen.add(c);
    const dir = path.join(ROOT, c);
    if (fs.existsSync(dir)) {
      const extra = fs.readdirSync(dir).filter(f => !LANG_FILES.has(f));
      if (extra.length) E.push(t + "फ़ोल्डर किसी और काम का है (" + extra.slice(0, 3).join(",") + ") — कोड टकराव");
    }
    if (!T || typeof T !== "object") { E.push(t + "प्रविष्टि object नहीं"); continue; }
    if (T.dir !== "ltr" && T.dir !== "rtl") E.push(t + "dir = ltr/rtl नहीं");
    if (!/^[a-z]{2,3}_[A-Z]{2}$/.test(T.locale || "")) E.push(t + "locale ग़लत (जैसे ko_KR)");
    if (!SCRIPTS[T.script]) E.push(t + "script-खाना ग़लत/ग़ायब (" + T.script + ")");
    else if ((T.dir === "rtl") !== RTL_SCRIPTS.includes(T.script)) E.push(t + "dir और script मेल नहीं");
    if (typeof T.gfam !== "string" || !/^([A-Za-z0-9+]+|KEEP|LATIN)$/.test(T.gfam)) E.push(t + "gfam ग़लत");
    /* font: सिर्फ़ अक्षर/अंक/एक-एक space, और gfam से बँधा — CSS में घुसपैठ असंभव */
    else if (typeof T.font !== "string" || !/^[A-Z][A-Za-z0-9]*( [A-Z0-9][A-Za-z0-9]*)*$/.test(T.font)) E.push(t + "font ग़लत रूप (सिर्फ़ font-नाम)");
    else {
      const want = T.gfam === "LATIN" ? "Inter" : T.gfam === "KEEP" ? "Noto Sans Devanagari" : T.gfam.replace(/\+/g, " ");
      if (T.font !== want) E.push(t + "font (" + T.font + ") gfam से मेल नहीं (" + want + " चाहिए)");
    }
    for (const k of TEXT_KEYS) {
      const v = T[k];
      if (typeof v !== "string" || !v.trim()) { E.push(t + k + " ख़ाली/ग़ायब"); continue; }
      if (/[<>"]/.test(v)) E.push(t + k + " में < > \" निषिद्ध (HTML/attribute सुरक्षा)");
      if (v.indexOf("\u2014") > -1) E.push(t + k + " में em-dash निषिद्ध");
      if (k !== "font" && T.script !== "Deva" && DEVA.test(v)) E.push(t + k + " में देवनागरी-रिसाव");
      if (k !== "font" && SCRIPTS[T.script]) {
        const r = scriptRatio(v, SCRIPTS[T.script]);
        if (r !== null && r < SCRIPT_MIN) E.push(t + k + ": अपनी लिपि (" + T.script + ") " + Math.round(r * 100) + "% (कम-से-कम " + SCRIPT_MIN * 100 + "%)");
      }
    }
    /* btn1href: Founder-नियम (10-Nov) — 🧭 बटन सिर्फ़ अपनी भाषा के career-पेज पर */
    if (T.btn1href !== undefined && T.btn1href !== "/" + c + "/career.html") E.push(t + "btn1href सिर्फ़ /" + c + "/career.html हो सकता है");
    if (T.react !== undefined) {
      for (const k of REACT_KEYS) if (typeof T.react[k] !== "string" || !T.react[k].trim()) E.push(t + "react." + k + " ख़ाली");
    }
    if (opts.lxHave && !opts.lxHave.has(c) && T.react === undefined) E.push(t + "react-पट्टी के 8 शब्द नहीं (acs-react.js में भी नहीं)");
    if (opts.needCareer) {
      const href = T.btn1href || ("/" + c + "/career.html");
      if (!fs.existsSync(path.join(ROOT, href.replace(/^\//, "")))) E.push(t + "career-पेज नहीं: " + href + " (पहले build_career_lang " + c + ")");
    }
  }
  return E;
}

/* acs-react.js की LX-तालिका में कौन-सी भाषाएँ हैं */
function lxCodes(X) {
  const a = X.indexOf("LX={"), b = X.indexOf("\n    };", a);
  if (a < 0 || b < a) return null;
  return new Set((X.slice(a, b).match(/\n\s*([a-z]{2,3}):\{/g) || []).map(m => m.trim().slice(0, -2)));
}

module.exports = { ROOT, DATA, SCRIPTS, RTL_SCRIPTS, TEXT_KEYS, REACT_KEYS, SW_BASE, BRAND_TOKENS, SCRIPT_MIN, scriptRatio, dupKeys, load, validate, lxCodes };
