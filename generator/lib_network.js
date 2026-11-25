/* ============================================================
   lib_network.js v1.4 (25-Nov-2026, खेप N-4: panchayatOf (स्रोत के पते से पंचायत/गाँव) और URL.nivedan / URL.nivedanFor
   ("सुधार का निवेदन" और "नया फ़र्म जोड़ें" का एक पन्ना)। v1.3 (परत-4 का साझा हिस्सा, 25-Nov-2026, खेप N-3: CSC सूची। जिस सूची में हर नाम का अलग पन्ना नहीं
   (taxonomy recordPages: false), उसके नाम का पता = ज़िले के पन्ने पर उसकी जगह (URL.record → …/<ज़िला>/#<id>); pageUrls में
   ऐसे नामों के पन्ने नहीं। प्रखंड "" = "प्रखंड-मिलान बाक़ी"।
   v1.2 (22-Nov-2026, खेप N-1; v1.2 = ऑडिट N1-P0-04: पहरा अब रिकॉर्ड के हर पाठ-मान पर
   (ब्रांड समेत): email, 10+ अंक, भीतरी खाने जैसा पाठ; कुंजी का नाम सिर्फ़ सुरक्षित रूप में छपे। v1.1 = ऑडिट N1-P0-01/02: publicProblems() —
   सार्वजनिक रिकॉर्ड का एक ही पहरा: तय खाने, Sector_Data_JSON allowlist, email/फ़ोन-रिसाव, "सत्यापित" का ताला) : व्यावहारिक प्रशिक्षण नेटवर्क
   build_network.js (पन्ने), build_sitemap.js (पते) और dev_network_check.js (जाँच) तीनों यही पढ़ते हैं:
   data कहाँ है, गिनती कैसे बनती है, हर पन्ने का पता क्या है। एक चीज़ = एक जगह।
   पता-नियम v1.1: हिंदी (मूल) root पर (/network/…), English /en/network/… ; slug lowercase।
   फ़र्म का पता सिर्फ़ उसकी ID से (/network/firm/br-khg-0003.html): श्रेणी या जगह बदले, तब भी पता वही।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const TX = require("./data/network/taxonomy.js");
const { STATES } = require("./data/network/geo.js");
const BATCHES = require("./data/network/batches.js");
const LANGS = ["hi", "en"];   /* नेटवर्क के पन्ने इन भाषाओं में (आगे: kn, bn — ui.js में शब्द जोड़कर) */

function loadRecords() {
  const out = [];
  for (const id of Object.keys(BATCHES)) {
    const f = path.join(__dirname, "data", "network", "batches", id + ".json");
    if (!fs.existsSync(f)) continue;   /* batch दर्ज है पर import नहीं हुआ (जैसे IT): कोई रिकॉर्ड नहीं */
    const d = JSON.parse(fs.readFileSync(f, "utf8"));
    for (const r of d.records) if (r.listingStatus === "PUBLISHED") out.push(r);
  }
  return out;
}
const pubStatus = (r) => TX.STATUS.internal[r.verificationStatus] || "TBV";
const pre = (lang) => (lang === "hi" ? "" : "/" + lang);
/* सेक्टर: रिकॉर्ड में कूट (TW, IT), taxonomy में कुंजी (tw, it) */
const SECTOR_KEY = {}; for (const k of Object.keys(TX.SECTORS)) SECTOR_KEY[TX.SECTORS[k].id] = k;
const secKey = (r) => SECTOR_KEY[r.sectorId];
const secSlug = (sec) => TX.SECTORS[sec].slug;
const recordPages = (sec) => TX.SECTORS[sec].recordPages !== false;   /* v1.3: false = नाम का अलग पन्ना नहीं (CSC) */
const URL = {
  hub: (lang) => (lang === "hi" ? "/hi/network.html" : "/" + lang + "/network.html"),
  overview: (lang, st, sec) => pre(lang) + "/network/" + st + "/" + secSlug(sec) + "/",
  district: (lang, st, sec, d) => pre(lang) + "/network/" + st + "/" + secSlug(sec) + "/" + d + "/",
  firm: (lang, id) => pre(lang) + "/network/firm/" + id.toLowerCase() + ".html",
  firmBase: (lang) => pre(lang) + "/network/firm/",
  slip: (lang) => pre(lang) + "/network/"
};
/* v1.4 (खेप N-4): "सुधार का निवेदन" पन्ना (रजिस्टर्ड यूज़र का सुधार, RM की स्वीकृति से)। noindex; sitemap में नहीं। */
URL.nivedan = (lang) => pre(lang) + "/network/nivedan/";
/* m = "sudhar" (इस नाम में सुधार) या "naya" (इसी ज़िले/सूची में नया फ़र्म); सूची, राज्य, ज़िला कार्ड से पहले से भरे */
URL.nivedanFor = (lang, r, m) => URL.nivedan(lang) + "?m=" + m + (m === "sudhar" ? "&id=" + r.id : "") + "&s=" + r.state + "&k=" + secKey(r) + "&d=" + r.district;
/* v1.3: किसी रिकॉर्ड का पक्का पता: अपना पन्ना, या (recordPages: false) ज़िले के पन्ने पर उसकी जगह */
URL.record = (lang, r) => (recordPages(secKey(r)) ? URL.firm(lang, r.id) : URL.district(lang, r.state, secKey(r), r.district) + "#" + r.id.toLowerCase());
const fileOf = (u) => u.replace(/^\//, "") + (u.endsWith("/") ? "index.html" : "");

/* राज्य × सेक्टर × ज़िला × प्रखंड की गिनती (data से; हाथ से कभी नहीं) */
function tree(recs) {
  const T = {};
  for (const r of recs) {
    const st = (T[r.state] = T[r.state] || {}), sk = secKey(r), sb = (st[sk] = st[sk] || { n: 0, ver: 0, d: {} });
    const dd = (sb.d[r.district] = sb.d[r.district] || { n: 0, ver: 0, b: {}, recs: [] });
    const v = pubStatus(r) === "VERIFIED" ? 1 : 0;
    sb.n++; sb.ver += v; dd.n++; dd.ver += v; dd.recs.push(r);
    const bb = (dd.b[r.block] = dd.b[r.block] || { n: 0, ver: 0 }); bb.n++; bb.ver += v;
  }
  return T;
}
function district(stSlug, dSlug) { return STATES[stSlug].districts.find((d) => d.slug === dSlug); }
function category(sec, id) { return (TX.CATEGORIES[sec] || []).find((c) => c.id === id); }
/* हर बनने वाले पन्ने का पता (sitemap और जाँच के लिए) */
function pageUrls(recs) {
  const T = tree(recs), out = [];
  for (const lang of LANGS) {
    for (const st of Object.keys(T)) for (const sec of Object.keys(T[st])) {
      out.push(URL.overview(lang, st, sec));
      for (const d of Object.keys(T[st][sec].d)) out.push(URL.district(lang, st, sec, d));
    }
    for (const r of recs) if (recordPages(secKey(r))) out.push(URL.firm(lang, r.id));
  }
  return out;
}
/* ---------- सार्वजनिक रिकॉर्ड का पहरा (ऑडिट N1-P0-01, N1-P0-02; v1.2 = N1-P0-04) ----------
   importer (हर रिकॉर्ड पर), build_network.js (लिखने से पहले) और जाँच-यंत्र, तीनों यही एक जाँच चलाते हैं।
   लौटाता है समस्याओं की सूची (ख़ाली = ठीक)। संदेश में निजी मान कभी नहीं: सिर्फ़ खाने का रास्ता (जैसे brandOem,
   sources.sourceName) और समस्या का प्रकार।
   v1.2 (N1-P0-04): पाठ की जाँच अब कुछ चुने खानों तक सीमित नहीं: रिकॉर्ड का हर पाठ-मान (ब्रांड, दूसरी श्रेणियाँ, हुनर-टैग,
   स्रोत का नाम/प्रकार, sectorData … सब) देखा जाता है: (1) email-पता नहीं; (2) 10 या ज़्यादा अंकों का समूह नहीं
   (फ़ोन, आधार, खाता-नंबर जैसा; बीच के space/-/./() समेत); (3) भीतरी खाने जैसा पाठ नहीं ("Email:", "Confidence=",
   "RM_Owner:" आदि)। छूट सिर्फ़ उन खानों को जिनमें अंक होना ही है और जिनकी जाँच अलग से होती है: फ़ोन-सूची (importer का
   फ़ोन-नियम), साझा नंबर, PIN, तारीख़ें, और पते (URL: वेबसाइट व स्रोत-कड़ी, जिनमें directory के ID-अंक होते हैं; इनमें भी email नहीं)। */
const PUBLIC_KEYS = ["id", "sectorId", "mg", "primaryCategory", "secondaryCategories", "firmName", "canonicalName", "parentFirmId", "branchName",
  "state", "district", "block", "locality", "address", "pin", "latitude", "longitude", "phone", "sharedPhone", "website", "brandOem", "businessType",
  "practicalSkillTags", "verificationStatus", "verificationDate", "verifiedBy", "listingStatus", "practicalTrainingAvailability", "sources", "sectorData",
  "importBatch", "createdAt", "updatedAt", "lastSourceCheck", "lastRMCheck", "nextReviewDue"];
const SOURCE_KEYS = ["sourceType", "sourceName", "sourceUrl", "checkedAt", "fieldSupport"];
const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
/* 10+ अंक (बीच में space . - / ( ) चल सकते हैं): फ़ोन (+91 समेत), आधार, खाता-नंबर */
const LONG_DIGITS = /\d(?:[\s().\/-]*\d){9,}/;
const INTERNAL_LABEL = /\b(e-?mail|confidence|notes?|rm[_ ]?owner|packet[_ ]?id|priority|identity[_ ]?review|execution[_ ]?(route|order)|attempt[_ ]?status|evidence[_ ]?ref|rm[_ ]?work[_ ]?class|operation|geography|service[_ ]?scope|guardian|aadhaa?r|आधार|password|पासवर्ड)\s*[:=]/i;
const DIGITS_OK = { "phone": 1, "sharedPhone.number": 1, "pin": 1, "website": 1, "sources.sourceUrl": 1, "sources.checkedAt": 1, "createdAt": 1, "updatedAt": 1,
  "lastSourceCheck": 1, "lastRMCheck": 1, "nextReviewDue": 1, "verificationDate": 1 };
const safeKey = (k) => (/^[A-Za-z_][A-Za-z0-9_]{0,39}$/.test(String(k)) ? String(k) : "(अनजान रूप की कुंजी)");
function textProblems(path, v) {   /* एक पाठ-मान: समस्या-प्रकार, मान कभी नहीं */
  const out = [];
  if (EMAIL_RE.test(v)) out.push(path + ": email-पता");
  if (!DIGITS_OK[path] && LONG_DIGITS.test(v)) out.push(path + ": फ़ोन/लंबा अंक-समूह (10+ अंक)");
  if (INTERNAL_LABEL.test(v)) out.push(path + ": भीतरी खाने जैसा पाठ");
  return out;
}
function walkText(v, path, out) {
  if (typeof v === "string") out.push(...textProblems(path, v));
  else if (Array.isArray(v)) v.forEach((x) => walkText(x, path, out));
  else if (v && typeof v === "object") for (const k of Object.keys(v)) walkText(v[k], path ? path + "." + safeKey(k) : safeKey(k), out);
  return out;
}
const sameKeys = (o, list) => o && typeof o === "object" && !Array.isArray(o) && Object.keys(o).length === list.length && list.every((k) => Object.prototype.hasOwnProperty.call(o, k));
function sectorDataProblems(sec, sd) {
  const A = (TX.SECTOR_DATA || {})[sec], out = [];
  if (!A) return ["सेक्टर " + sec + " का SECTOR_DATA नियम नहीं"];
  if (!sd || typeof sd !== "object" || Array.isArray(sd)) return ["sectorData object नहीं"];
  for (const k of Object.keys(sd)) {
    const rule = Object.prototype.hasOwnProperty.call(A, k) ? A[k] : null, v = sd[k], kn = safeKey(k);
    if (!rule) { out.push("Sector_Data_JSON में अनुमति-रहित कुंजी: " + kn); continue; }
    if (v === null || typeof v === "object") { out.push("Sector_Data_JSON की कुंजी " + kn + ": नेस्टेड/ख़ाली मान नहीं चलता"); continue; }
    if (rule.type === "enum" && rule.values.indexOf(v) < 0) out.push("Sector_Data_JSON की कुंजी " + kn + ": मान अनुमत सूची में नहीं");
    if (rule.type === "text" && (typeof v !== "string" || v.length > 120 || textProblems("x", v).length)) out.push("Sector_Data_JSON की कुंजी " + kn + ": पाठ ग़लत (120 अक्षर तक, email/फ़ोन/भीतरी पाठ नहीं)");
    if (rule.type === "bool" && typeof v !== "boolean") out.push("Sector_Data_JSON की कुंजी " + kn + ": हाँ/ना (true/false) चाहिए");
    if (rule.type === "int" && (!Number.isInteger(v) || v < rule.min || v > rule.max)) out.push("Sector_Data_JSON की कुंजी " + kn + ": संख्या सीमा में नहीं");
    if (["enum", "text", "bool", "int"].indexOf(rule.type) < 0) out.push("SECTOR_DATA नियम का अनजान प्रकार: " + kn);
  }
  return out;
}
function publicProblems(r) {
  const out = [], sec = Object.keys(TX.SECTORS).find((k) => TX.SECTORS[k].id === (r && r.sectorId));
  if (!sameKeys(r, PUBLIC_KEYS)) out.push("सार्वजनिक रिकॉर्ड के खाने तय सूची से अलग");
  if (!sec) return out.concat(["अनजान सेक्टर"]);
  out.push(...sectorDataProblems(sec, r.sectorData));
  if (!Array.isArray(r.sources) || !r.sources.every((x) => sameKeys(x, SOURCE_KEYS))) out.push("स्रोत के खाने तय सूची से अलग");
  if (r.sharedPhone !== null && !sameKeys(r.sharedPhone, ["number", "places"])) out.push("साझा-फ़ोन के खाने तय सूची से अलग");
  if (!Array.isArray(r.brandOem) || !r.brandOem.every((x) => typeof x === "string")) out.push("brandOem: पाठ-सूची नहीं");
  walkText(r, "", out);   /* N1-P0-04: हर पाठ-मान */
  if (EMAIL_RE.test(JSON.stringify(r)) && !out.some((x) => /email-पता/.test(x))) out.push("रिकॉर्ड में email-पता (किसी कुंजी में)");
  if (r.verificationStatus !== "TO_BE_VERIFIED" && !(TX.VERIFY && TX.VERIFY.registry)) out.push("\"सत्यापित\" स्थिति, पर RM-सत्यापन रजिस्टर (server) अभी नहीं बना");
  if (r.verificationStatus === "TO_BE_VERIFIED" && (r.verificationDate || r.verifiedBy || r.lastRMCheck)) out.push("जाँच-बाक़ी रिकॉर्ड पर सत्यापन की तारीख़/नाम");
  if (r.practicalTrainingAvailability !== "UNKNOWN" && !(TX.VERIFY && TX.VERIFY.registry)) out.push("प्रशिक्षण-उपलब्धता का दावा, बिना सत्यापन");
  return out;
}

/* ---------- v1.4 (खेप N-4, Founder 25-Nov: "नेटवर्क के सर्च में पंचायत भी") : पंचायत / गाँव ----------
   सिर्फ़ स्रोत के पते में साफ़ लिखे दो रूपों से: "Panchayat/Village-<नाम>" (CSC की सरकारी सूची) और
   "Gram Panchayat: <नाम>"। कोई अनुमान नहीं: इन दोनों के बिना = "" (पन्ने पर "पंचायत पता नहीं")।
   छापने का रूप: अक्षरों का छोटा-बड़ा एक जैसा (हर शब्द का पहला अक्षर बड़ा), आख़िर का अकेला शब्द "Panchayat" हटा
   (वह खाने का नाम है, पंचायत का नहीं)। इससे "SAHSI" और "Sahsi" एक ही विकल्प बनते हैं। स्रोत-data वैसा ही। */
const PC_RE = [/(?:^|[,;]\s*)Panchayat\/Village-\s*([^,;]*)/i, /\bGram Panchayat:\s*([^;,]*)/i];
function titleCase(s) { return s.toLowerCase().replace(/(^|[\s(\-\/.])([a-z])/g, (m, a, b) => a + b.toUpperCase()); }
function panchayatOf(r) {
  const a = String((r && r.address) || "");
  for (const re of PC_RE) {
    const m = a.match(re); if (!m) continue;
    let v = m[1].replace(/\s+/g, " ").trim().replace(/\s+panchayat$/i, "").trim();
    if (!v || /^(null|undefined|none|nil|n\/?a)$/i.test(v)) continue;
    if (textProblems("x", v).length || v.length > 60) continue;   /* पहरा: अजीब/लंबा पाठ पंचायत नहीं बनता */
    return titleCase(v);
  }
  return "";
}

/* छोटे औज़ार */
const fmt =(s, o) => String(s).replace(/\{(\w+)\}/g, (m, k) => (o[k] === undefined ? m : o[k]));
const esc = (v) => String(v === null || v === undefined ? "" : v).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
/* नेटवर्क-पन्ने (/hi/network.html) के "व्यावहारिक सीखने की जगहें" हिस्से के स्थिर शब्द। build_net_khoj.js हिंदी लिखता है;
   menu_lang/network.en.js इन्हीं दोनों (hi, en) को जोड़कर English पन्ना बनवाता है: शब्द का घर एक (ui.js)। */
function hubText(lang, recs) {
  const U = require("./data/network/ui.js")[lang], T = tree(recs || loadRecords()), lists = [];
  for (const st of Object.keys(T)) for (const sec of Object.keys(T[st])) {
    const S = TX.SECTORS[sec];
    lists.push({ href: URL.overview(lang, st, sec), text: "📋 " + fmt(U.overviewH1, { s: STATES[st][lang], place: lang === "hi" ? S.hiPlace : S.enPlace }) + ": " + U.overviewLink });
  }
  /* v1.3 (25-Nov-2026, खेप N-5): ऊपर की गिनती-पट्टी: हर सूची (राज्य × क्षेत्र) की असली गिनती, उसी data से जिससे सूची बनती है */
  const ginti = [];
  for (const st of Object.keys(T)) for (const sec of Object.keys(T[st])) {
    const S = TX.SECTORS[sec];
    ginti.push({ href: URL.overview(lang, st, sec), n: T[st][sec].n.toLocaleString("en-IN"),
      label: fmt(U.gintiLabel, { place: lang === "hi" ? S.hiPlace : S.enPlace, s: STATES[st][lang] }) });
  }
  return { h: U.hubH, help: U.hubHelp, notice: U.notice, loading: U.hub.loading, nojs: U.hubNoJs, lists,
           regH: U.regH, regFirm: U.regFirm, regUstad: U.regUstad, regNote: U.regNote, disc: U.disclaimer,
           ginti, rmNeed: U.rmNeed, rmJoin: U.rmJoin, rmBtn: U.rmBtn, rmHref: "/join.html?role=team" + (lang === "hi" ? "" : "&lang=" + lang) };
}
module.exports = { ROOT, TX, STATES, BATCHES, LANGS, SECTOR_KEY, secKey, recordPages, loadRecords, pubStatus, URL, fileOf, tree, district, category, pageUrls, fmt, esc, hubText,
  PUBLIC_KEYS, EMAIL_RE, LONG_DIGITS, INTERNAL_LABEL, safeKey, textProblems, sectorDataProblems, publicProblems, panchayatOf };
