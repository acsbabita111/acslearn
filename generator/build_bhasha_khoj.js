/* build_bhasha_khoj.js v1.0 · 24-Nov-2026 : भाषा-खोज का सहायक data बनाता है → assets/bhasha_khoj_data.js (परत-3, हाथ से नहीं)।
   हर भाषा-कोर्स (KKB_GROUPS) के लिए:
     c = भाषा-कोड: कोर्स-पन्ने की अपनी data-फ़ाइल के नाम से (assets/kkb_<कोड>_data.js); अंग्रेज़ी = en (उसका पन्ना अलग engine का)।
     a = आम दूसरे नाम (Mandarin = Chinese, Persian = Farsi): नीचे ALIAS।
     p = जगहें: रोज़गार-देश (govt_jobs_embassy.js → KKB_CORRIDORS) अंग्रेज़ी + हिंदी नाम + बड़े शहर (Dubai, Riyadh, Doha),
         और courses_data का "salary" खाना: "(X में काम हेतु)" का X (राज्य, क्षेत्र, शहर)।
   हिंदी देश-नाम नीचे COUNTRY_HI में (सिर्फ़ वही देश जो KKB_CORRIDORS में हैं; नया देश आए तो यहाँ जोड़ो, वरना यह script रुक जाती है)।
   चलाना: node generator/build_bhasha_khoj.js   (दोबारा चलाने पर फ़ाइल वही) */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const R = f => fs.readFileSync(path.join(ROOT, f), "utf8");
const w = {};
new Function("window", "self", "module", R("assets/courses_data.js") + ";window.__P=PRIVATE_JOB_COURSES;")(w, w, {});
new Function("window", "self", "module", R("assets/govt_jobs_embassy.js") + ";window.__C=KKB_CORRIDORS;")(w, w, {});
const L = w.__P, G = w.KKB_GROUPS, C = w.__C;

const COUNTRY_HI = {
  "Argentina": ["अर्जेंटीना"], "Armenia": ["आर्मेनिया"], "Bangladesh": ["बांग्लादेश"], "Brazil": ["ब्राज़ील"], "Canada": ["कनाडा"],
  "China": ["चीन"], "Croatia": ["क्रोएशिया"], "Egypt": ["मिस्र", "इजिप्ट"], "Ethiopia": ["इथियोपिया"], "Finland": ["फ़िनलैंड"],
  "France": ["फ़्रांस", "पेरिस", "Paris"], "Georgia": ["जॉर्जिया"], "Germany": ["जर्मनी", "Deutschland"], "Ghana": ["घाना"], "Greece": ["ग्रीस", "यूनान"],
  "Indonesia": ["इंडोनेशिया"], "Iran": ["ईरान"], "Iraq": ["इराक़"], "Israel": ["इज़राइल"], "Italy": ["इटली"],
  "Japan": ["जापान", "Tokyo", "टोक्यो"], "Jordan": ["जॉर्डन"], "Kenya": ["केन्या"], "Lithuania": ["लिथुआनिया"], "Malaysia": ["मलेशिया", "Kuala Lumpur"],
  "Malta": ["माल्टा"], "Mexico": ["मेक्सिको"], "Myanmar": ["म्यांमार", "Burma", "बर्मा"], "Nepal": ["नेपाल", "Kathmandu", "काठमांडू"], "Netherlands": ["नीदरलैंड", "Holland", "हॉलैंड"],
  "Nigeria": ["नाइजीरिया"], "Philippines": ["फ़िलीपींस", "Manila"], "Poland": ["पोलैंड"], "Portugal": ["पुर्तगाल"], "Qatar": ["क़तर", "Doha", "दोहा"],
  "Russia": ["रूस", "Moscow", "मॉस्को"], "Saudi Arabia": ["सऊदी अरब", "Saudi", "सऊदी", "Riyadh", "रियाद", "Jeddah", "जेद्दा"], "Senegal": ["सेनेगल"], "Serbia": ["सर्बिया"], "Singapore": ["सिंगापुर"],
  "Slovakia": ["स्लोवाकिया"], "South Africa": ["दक्षिण अफ़्रीका"], "South Korea": ["दक्षिण कोरिया", "Korea", "कोरिया", "Seoul"], "Spain": ["स्पेन"], "Sri Lanka": ["श्रीलंका"],
  "Sweden": ["स्वीडन"], "Tanzania": ["तंज़ानिया"], "Thailand": ["थाईलैंड", "Bangkok", "बैंकॉक"], "Turkey": ["तुर्की", "Türkiye"], "UAE": ["United Arab Emirates", "संयुक्त अरब अमीरात", "Dubai", "दुबई", "Abu Dhabi", "अबू धाबी", "Sharjah", "शारजाह"],
  "UK": ["United Kingdom", "England", "इंग्लैंड", "Britain", "ब्रिटेन", "London", "लंदन"], "USA": ["America", "अमेरिका", "United States"], "Uganda": ["युगांडा"], "Ukraine": ["यूक्रेन"], "Vietnam": ["वियतनाम"]
};

/* आम बोलचाल के दूसरे नाम (भाषा का अपना नाम कुछ और लिखा हो): सिर्फ़ जाने-माने नाम */
const ALIAS = {
  mandarin: ["Chinese", "Chinese Mandarin", "चाइनीज़", "मंदारिन"], cantonese: ["Chinese Cantonese", "Hong Kong"], persian: ["Farsi"],
  tagalog: ["Filipino", "Pilipino", "फ़िलिपीनो"], malay: ["Bahasa Melayu", "Bahasa Malaysia"], indonesian: ["Bahasa Indonesia"],
  bengali: ["Bangla", "बंगाली", "बंगला"], odia: ["Oriya", "ओड़िया"], punjabi: ["Panjabi"], assamese: ["Asamiya", "असमी"],
  burmese: ["Myanmar language", "म्यांमारी"], sinhala: ["Sinhalese", "सिंहला"], swahili: ["Kiswahili"], spanish: ["Espanol", "Español", "स्पैनिश"],
  english: ["Angrezi", "इंग्लिश"]
};
const ids = [].concat.apply([], G.map(g => g.ids));
const out = {}; const missing = [];
for (const id of ids) {
  const c = L.find(x => x.id === id);
  if (!c || !c.url) throw new Error("courses_data में नहीं/पता नहीं: " + id);
  const f = path.join(ROOT, c.url.replace(/^\//, ""), "index.html");
  if (!fs.existsSync(f)) throw new Error("कोर्स-पन्ना नहीं: " + c.url);
  const html = fs.readFileSync(f, "utf8");
  const m = html.match(/\/assets\/kkb_([a-z0-9-]+)_data\.js/);
  const slug = c.url.split("/").filter(Boolean).pop();
  const code = m ? m[1] : (slug === "english" ? "en" : "");
  const p = [];
  const addP = s => { s = String(s).trim(); if (s && p.indexOf(s) < 0) p.push(s); };
  (C[slug] || []).forEach(ct => {
    if (!COUNTRY_HI[ct]) missing.push(ct);
    addP(ct); (COUNTRY_HI[ct] || []).forEach(addP);
  });
  const sm = /\(([^)]*?)\s*में काम हेतु/.exec(c.salary || "");
  if (sm) sm[1].split(/[\s,()\-–—]+|\s+व\s+/).forEach(x => { if (x.length > 1 && !/^(व|और|क्षेत्र|तट|भाषी|जगत|शिक्षा|संस्कृति|शास्त्र|सीमित|सीमा|सीमित-शब्दावली)$/.test(x)) addP(x); });
  const e = {}; if (code) e.c = code; if (p.length) e.p = p; if (ALIAS[slug]) e.a = ALIAS[slug];
  out[id] = e;
}
const badAlias = Object.keys(ALIAS).filter(k => !ids.some(id => (L.find(x => x.id === id).url || "").split("/").filter(Boolean).pop() === k));
if (badAlias.length) throw new Error("ALIAS में ऐसी भाषा जो सूची में नहीं: " + badAlias.join(", "));
if (missing.length) throw new Error("COUNTRY_HI में हिंदी नाम जोड़ो: " + [...new Set(missing)].join(", "));
const body = "/* bhasha_khoj_data.js : भाषा-खोज का सहायक data (कोड c, जगहें p, दूसरे नाम a)। generator/build_bhasha_khoj.js से बना, हाथ से मत बदलो।\n" +
  "   " + ids.length + " भाषा-कोर्स · कोड " + Object.values(out).filter(e => e.c).length + " · जगह वाले " + Object.values(out).filter(e => e.p).length + " */\n" +
  "window.BHASHA_KHOJ = " + JSON.stringify(out) + ";\n";
const dst = path.join(ROOT, "assets", "bhasha_khoj_data.js");
const old = fs.existsSync(dst) ? fs.readFileSync(dst, "utf8") : "";
if (old !== body) { fs.writeFileSync(dst, body); console.log("✅ लिखा: assets/bhasha_khoj_data.js"); } else console.log("बदलाव नहीं: assets/bhasha_khoj_data.js");
console.log(ids.length + " भाषा-कोर्स · कोड " + Object.values(out).filter(e => e.c).length + " · जगह वाले " + Object.values(out).filter(e => e.p).length);
