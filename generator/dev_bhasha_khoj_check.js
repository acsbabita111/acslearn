/* dev_bhasha_khoj_check.js v1.1 · 24-Nov-2026 (v1.1: गिनती में सिर्फ़ भाषाएँ, लिपि-कोर्स अलग; ऊपर का बड़ा अंक और "पूरा कोर्स" का दावा data से; 130 की पुरानी गिनती कहीं नहीं, नारे में भी नहीं) · v1.0.1 (DOMContentLoaded-क्रम की जाँच) : भाषा-खोज और "कार्ड से सीधा पहला पाठ" का स्थायी जाँच-यंत्र।
   जन्म-कारण (Founder 24-Nov-2026): "भाषा का सर्च बॉक्स ... सर्च नहीं हो रहा ... कोड से तो बिल्कुल नहीं ...
   12-13 साल का बच्चा पहला लेसन को खोज नहीं पाता"। पुरानी खोज सिर्फ़ हूबहू अक्षर मिलाती थी:
   "japani", "angrezi", "अंग्रेजी" (बिना नुक़्ता), "Germany", "dubai" से कुछ नहीं; "de" से 15 और "en" से 392 कार्ड;
   नतीजे खोज-डिब्बे के पास नहीं, नीचे समूहों के अंदर बिखरे। 29 आम खोजों में पुरानी खोज 12 में सही, नई 29 में।
   जाँचें:
     A  data: assets/bhasha_khoj_data.js में हर भाषा-कोर्स (KKB_GROUPS) ठीक एक बार; कोड कोर्स-पन्ने की data-फ़ाइल से मेल; कोड दोहराव नहीं;
        रोज़गार-देश वाली हर भाषा में जगहें।
     B  खोज-इंजन (assets/bhasha-khoj.js): बच्चे जैसी 60+ खोजों का सबसे ऊपर वाला नतीजा तय; ग़लत खोज पर 0 + सुझाव।
     C  पन्ना (courses/hi/index.html): script-क्रम, डिब्बे, नक़ली-DOM में असली mount: लिखो → नतीजे डिब्बे के नीचे, बाक़ी सूचियाँ छिपें,
        ✕ से सब वापस; "हिंदी" पर नरम समझाइश; कुछ न मिले तो व्हाट्सऐप-रास्ता; हर कार्ड की कड़ी #shuru पर।
     D  कोर्स-इंजन (assets/kkb2.js v3.4): #shuru → अगला अधूरा दिन; #din-26 → दिन 26; मुख्य बटन "पहला पाठ शुरू करो (दिन 1)";
        दिन पूरा → शाबाश + अगला दिन; सप्ताह का आख़िरी दिन → सप्ताह-टेस्ट/संवाद पहले; 7 भाषाओं का स्तर-2 🎧 पन्ना खुले;
        असली पन्ने का क्रम: दिन DOMContentLoaded के बाद खुले (acs-translate.js बटनों के नाम न बिगाड़े)।
   चलाना: node generator/dev_bhasha_khoj_check.js   (repo-रूट से) */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const R = f => fs.readFileSync(path.join(ROOT, f), "utf8");
let fails = 0, passes = 0;
const ok = (c, m) => { if (c) passes++; else { fails++; console.log("  ⛔ " + m); } };

/* ---------- data ---------- */
const w = {};
new Function("window", "self", R("assets/courses_data.js") + ";window.__P=PRIVATE_JOB_COURSES;")(w, w);
new Function("window", "self", R("assets/govt_jobs_embassy.js") + ";window.__C=KKB_CORRIDORS;")(w, w);
new Function("window", R("assets/bhasha_khoj_data.js"))(w);
const byId = {}; w.__P.forEach(c => { if (c && c.id) byId[c.id] = c; });
const ids = [].concat(...w.KKB_GROUPS.map(g => g.ids));
const list = ids.map(id => byId[id]);
const slugOf = c => String(c.url || "").split("/").filter(Boolean).pop();
const bySlug = {}; list.forEach(c => { bySlug[slugOf(c)] = c.id; });
const X = w.BHASHA_KHOJ || {};

/* A */
console.log("A  data");
ok(Object.keys(X).length === ids.length && ids.every(id => X[id]), "bhasha_khoj_data की गिनती " + Object.keys(X).length + " ≠ भाषा-कोर्स " + ids.length + " (generator/build_bhasha_khoj.js दोबारा चलाओ)");
ok(Object.keys(X).every(id => ids.indexOf(id) > -1), "bhasha_khoj_data में ऐसी भाषा जो सूची में नहीं");
const codes = {}; let codeBad = 0, dupCode = 0;
list.forEach(c => {
  const f = path.join(ROOT, c.url.replace(/^\//, ""), "index.html");
  const m = fs.existsSync(f) ? /\/assets\/kkb_([a-z0-9-]+)_data\.js/.exec(fs.readFileSync(f, "utf8")) : null;
  const want = m ? m[1] : (slugOf(c) === "english" ? "en" : "");
  if ((X[c.id] || {}).c !== (want || undefined)) { codeBad++; if (codeBad < 4) console.log("     कोड बेमेल: " + c.id + " " + (X[c.id] || {}).c + " ≠ " + want); }
  if (want) { if (codes[want]) dupCode++; codes[want] = 1; }
});
ok(codeBad === 0, "भाषा-कोड कोर्स-पन्ने से बेमेल: " + codeBad);
ok(dupCode === 0, "भाषा-कोड दोहराव: " + dupCode);
const corSlugs = Object.keys(w.__C).filter(sl => (w.__C[sl] || []).length);   /* ख़ाली सूची = गलियारा-रहित भाषा (जैसे संस्कृत) */
const noPlace = corSlugs.filter(sl => bySlug[sl] && !((X[bySlug[sl]] || {}).p || []).length);
ok(noPlace.length === 0, "रोज़गार-देश वाली भाषा पर जगहें नहीं: " + noPlace.slice(0, 5).join(","));
console.log("   भाषाएँ " + ids.length + " · कोड " + Object.keys(codes).length + " · रोज़गार-देश वाली " + corSlugs.length);

/* B */
console.log("B  खोज-इंजन");
const K = require(path.join(ROOT, "assets/bhasha-khoj.js"));
const ix = K.build(list, X);
ok(ix.length === ids.length, "सूचकांक " + ix.length + " ≠ " + ids.length);
const TOP = [
  /* जर्मन: Founder का उदाहरण */
  ["German", "german"], ["german", "german"], ["जर्मन", "german"], ["jarman", "german"], ["jarmni", "german"], ["jermani", "german"], ["de", "german"], ["Germany", "german"], ["जर्मनी", "german"],
  ["english", "english"], ["English", "english"], ["angrezi", "english"], ["angreji", "english"], ["inglis", "english"], ["अंग्रेजी", "english"], ["अंग्रेज़ी", "english"], ["इंग्लिश", "english"], ["en", "english"],
  ["japani", "japanese"], ["japanis", "japanese"], ["जापानी", "japanese"], ["japan", "japanese"], ["जापान", "japanese"], ["ja", "japanese"], ["Japanese", "japanese"],
  ["arbi", "arabic"], ["arabic", "arabic"], ["अरबी", "arabic"], ["ar", "arabic"], ["saudi", "arabic"],
  ["koriyan", "korean"], ["korean", "korean"], ["कोरियाई", "korean"], ["korea", "korean"], ["ko", "korean"],
  ["malay", "malay"], ["मलय", "malay"], ["ms", "malay"],
  ["bojpuri", "bhojpuri"], ["bhojpuri", "bhojpuri"], ["भोजपुरी", "bhojpuri"],
  ["chinese", "mandarin"], ["चीनी", "mandarin"], ["chini", "mandarin"],
  ["farsi", "persian"], ["bangla", "bengali"], ["bangali", "bengali"], ["oriya", "odia"], ["filipino", "tagalog"], ["kiswahili", "swahili"],
  ["russian", "russian"], ["rusi", "russian"], ["spanish", "spanish"], ["french", "french"], ["nepal", "nepali"], ["nepali", "nepali"],
  ["tamil", "tamil"], ["telgu", "telugu"], ["kannad", "kannada"], ["marathi", "marathi"], ["urdu", "urdu"], ["gujrati", "gujarati"],
  ["portugese", "portuguese"], ["italian", "italian"], ["hebrew", "hebrew"], ["israel", "hebrew"], ["thai", "thai"], ["turki", "turkish"]
];
let topBad = 0;
TOP.forEach(([q, sl]) => {
  const want = bySlug[sl];
  if (!want) { topBad++; console.log("     जाँच-सूची में अनजान भाषा: " + sl); return; }
  const r = K.search(ix, q);
  if (!r.length || r[0].id !== want) { topBad++; console.log("     \"" + q + "\" → सबसे ऊपर " + (r[0] ? K.coreHi(byId[r[0].id]) : "कुछ नहीं") + " (चाहिए " + K.coreHi(byId[want]) + ")"); }
});
ok(topBad === 0, "सबसे-ऊपर नतीजा ग़लत: " + topBad + " / " + TOP.length);
/* भीड़ नहीं: साफ़ खोज पर 1-3 नतीजे */
[["de", 1], ["German", 1], ["japani", 1], ["japanis", 1], ["jarmni", 1], ["korea", 1], ["russian", 1]].forEach(([q, n]) => { const r = K.search(ix, q); ok(r.length <= n, "\"" + q + "\" पर भीड़: " + r.length + " नतीजे (अधिकतम " + n + ")"); });
/* शहर/देश से कई भाषाएँ: दुबई → अंग्रेज़ी + अरबी ऊपर के 4 में */
const dub = K.search(ix, "dubai").slice(0, 4).map(x => x.id), dubH = K.search(ix, "दुबई").slice(0, 4).map(x => x.id);
ok(dub.indexOf(bySlug.english) > -1 && dub.indexOf(bySlug.arabic) > -1, "dubai: अंग्रेज़ी/अरबी ऊपर के 4 में नहीं");
ok(dubH.indexOf(bySlug.arabic) > -1, "दुबई: अरबी ऊपर के 4 में नहीं");
/* बेमतलब खोज: 0 नतीजे; वर्तनी-ग़लती पर सुझाव */
ok(K.search(ix, "xyzq").length === 0 && K.suggest(ix, "xyzq").length === 0, "xyzq पर नतीजा/सुझाव नहीं होना चाहिए");
ok(K.search(ix, "fransisi").length === 0 && K.suggest(ix, "fransisi").some(x => x.id === bySlug.french), "fransisi पर सुझाव में फ़्रेंच नहीं");
ok(K.search(ix, "").length === 0 && K.search(ix, "   ").length === 0, "ख़ाली खोज पर नतीजे");
/* 1-2 अक्षर: बीच के अक्षर से नहीं (पहले "de" पर 50+ आते थे) */
ok(K.search(ix, "d").length <= 60, "एक अक्षर पर भी बीच-के-अक्षर मेल");
/* सामान्य करना */
ok(K.flat("अंग्रेज़ी") === K.flat("अंग्रेजी") && K.flat("जापानी") === K.flat("जापानि") && K.flat("Español") === K.flat("espanol"), "नुक़्ता/मात्रा/Latin-चिह्न बराबर नहीं");
ok(K.roman("अरबी").indexOf("arbi") > -1 && K.roman("जापानी").indexOf("japani") > -1, "देवनागरी → Hinglish ग़लत");
console.log("   " + TOP.length + " खोजें जाँचीं");

/* C */
console.log("C  पन्ना");
const html = R("courses/hi/index.html");
const iC = html.indexOf('<script src="/assets/courses_data.js">'), iD = html.indexOf('<script src="/assets/bhasha_khoj_data.js">'), iE = html.indexOf('<script src="/assets/bhasha-khoj.js">'), iI = html.indexOf("function bhKhojMount");
ok(iC > 0 && iC < iD && iD < iE && iE < iI, "script-क्रम (courses_data → bhasha_khoj_data → bhasha-khoj → inline) ग़लत");
["bhKhoj", "bhashaSearch", "bhKhojOut", "bhKhojClear", "bhAllTxt", "bhGoldTxt", "bhIntroTxt", "bhLipiTxt", "bhBigNum", "bhGoldNum"].forEach(id => ok((html.match(new RegExp('id="' + id + '"', "g")) || []).length === 1, "id=" + id + " ठीक एक बार नहीं"));
ok(/<label class="bk-label" for="bhashaSearch">/.test(html), "खोज-डिब्बे का label नहीं");
ok(/id="bhashaSearch"[^>]*type="search"|type="search"[^>]*id="bhashaSearch"/.test(html), "खोज-डिब्बा type=search नहीं (मोबाइल पर खोज-बटन)");
ok((html.match(/onclick="bhKhojFocus\(\)"/g) || []).length === 2, "\"अपनी भाषा चुनो\"/\"दूसरी भाषा\" बटन खोज पर नहीं ले जाते");
ok(html.indexOf("🌍 सब 130") < 0 && html.indexOf("135 भाषाओं का पूरा कोर्स") < 0, "पुरानी गिनती (130/135) बची");
/* v1.1: भाषा = कड़ी /courses/hi/bhasha/ के नीचे; कैथी और तिरहुता लिपि-कोर्स अलग (Founder: "अब 130 भाषा का कोई लॉजिक नहीं") */
const langs = list.filter(c => /^\/courses\/hi\/bhasha\//.test(c.url || "")), lipiN = list.length - langs.length;
const gold = langs.filter(c => (c.name_hi || "").indexOf("प्रमाणपत्र कोर्स") > -1).length, intro = langs.filter(c => (c.name_hi || "").indexOf("परिचय-कोर्स") > -1).length;
ok(lipiN === 2, "लिपि-कोर्स 2 नहीं: " + lipiN);
ok(html.indexOf('<span id="bhLipiTxt">' + lipiN + " पुरानी लिपियों</span>") > -1 && html.indexOf('<span class="h130-num" id="bhBigNum">' + langs.length + "</span>") > -1, "लिपि-गिनती या ऊपर का बड़ा अंक data से बेमेल");
ok(!/\b130 भाषा/.test(html), "पन्ने में 130 भाषा की पुरानी गिनती बची (नारा भी अब \"अपनी भाषा में\")");
/* ऊपर का दावा: "हर भाषा का पूरा कोर्स" झूठ था (परिचय-कोर्स में 90 दिन नहीं); पूरे कोर्स की गिनती data से, चलते समय भी */
ok(html.indexOf("हर भाषा का पूरा कोर्स") < 0 && html.indexOf('<p class="h130-claim"><span id="bhGoldNum">' + gold + "</span> भाषाओं का पूरा कोर्स — ") > -1 && html.indexOf("set('bhGoldNum',String(gold));") > -1, "ऊपर का दावा \"पूरा कोर्स\" data की गिनती से नहीं");
/* ChatGPT ऑडिट S130 (24-Nov-2026): description और og:description में भी "हर भाषा का 90-दिन" नहीं; पूरे कोर्स की गिनती data से */
ok(html.indexOf("हर भाषा का 90-दिन") < 0 && html.split("भाषाएँ — " + gold + " भाषाओं का 90-दिन कोर्स").length === 3, "description/og:description में \"हर भाषा का 90-दिन\" या पूरे कोर्स की गिनती data से बेमेल");
/* "नई भाषा सीखें" पन्ना (bhasha.html, build_landing4.js v1.9): वही तीन गिनतियाँ, कोई झूठा "हर भाषा का पूरा कोर्स" नहीं */
{ const bh = R("bhasha.html");
  ok(bh.indexOf('<span id="bhCount">' + langs.length + "</span> भाषाओं के कोर्स") > -1 && bh.indexOf('<span id="bhGold">' + gold + "</span> भाषाओं का पूरा कोर्स") > -1 && bh.indexOf('<span id="bhIntro">' + intro + "</span> भाषाओं का छोटा परिचय-कोर्स") > -1, "bhasha.html की तीन गिनतियाँ data से बेमेल (node generator/build_landing4.js)");
  ok(bh.indexOf("हर भाषा का पूरा कोर्स") < 0 && bh.indexOf("भाषाओं में प्रमाणपत्र कोर्स") < 0 && !/\b130 भाषा/.test(bh), "bhasha.html में पुराना दावा या 130 बचा"); }
ok(html.indexOf('<span id="bhAllTxt">' + langs.length + " भाषाओं के कोर्स</span>") > -1 && html.indexOf('<span id="bhGoldTxt">' + gold + " भाषाओं का पूरा कोर्स</span>") > -1 && html.indexOf('<span id="bhIntroTxt">' + intro + " भाषाओं का परिचय-कोर्स</span>") > -1,
  "पन्ने की गिनती data से बेमेल (node generator/sudhar_courses_khoj.js चलाओ)");
/* असली mount, नक़ली DOM */
const els = {};
const mk = id => els[id] || (els[id] = { id, value: "", innerHTML: "", style: {}, _ev: {}, addEventListener(t, f) { this._ev[t] = f; }, focus() { this._f = 1; }, blur() { }, scrollIntoView() { } });
["bhashaSearch", "bhKhojOut", "bhKhojClear", "bhCorridors", "bhPopular", "bhashaGroups"].forEach(mk);
global.document = { getElementById: id => els[id] || null };
const chip = id => '<a class="bh-chip" data-id="' + id + '" href="' + byId[id].url + '#shuru"></a>';
const M = K.mount({ input: "bhashaSearch", out: "bhKhojOut", clear: "bhKhojClear", list, extra: X, chip, hide: ["bhCorridors", "bhPopular", "bhashaGroups"], wa: "919431210092" });
ok(M && M.index.length === ids.length, "mount नहीं हुआ");
ok(els.bhKhojOut.style.display === "none" && els.bhashaGroups.style.display === "" && els.bhKhojClear.style.display === "none", "ख़ाली खोज पर सूचियाँ नहीं दिखतीं / नतीजा-डिब्बा खुला");
const typeQ = q => { els.bhashaSearch.value = q; M.render(); return els.bhKhojOut.innerHTML; };
let h = typeQ("japani");
ok(els.bhKhojOut.style.display === "" && h.indexOf('data-id="' + bySlug.japanese + '"') > -1 && h.indexOf("भाषा मिली") > -1, "japani: नतीजा डिब्बे में नहीं");
ok(els.bhashaGroups.style.display === "none" && els.bhPopular.style.display === "none" && els.bhCorridors.style.display === "none", "खोजते समय बाक़ी सूचियाँ नहीं छिपीं");
ok(els.bhKhojClear.style.display === "", "खोजते समय ✕ नहीं दिखता");
h = typeQ("hindi");
ok(h.indexOf("हिंदी तो आप जानते हो") > -1 && h.indexOf("bh-chip") < 0, "\"hindi\" पर नरम समझाइश नहीं / ग़लत भाषा दिखी");
h = typeQ("xyzq");
ok(h.indexOf("नहीं मिली") > -1 && h.indexOf("wa.me/919431210092") > -1 && h.indexOf("xyzq") > -1, "कुछ न मिलने पर समझाइश/व्हाट्सऐप नहीं");
h = typeQ("<b>x</b>");
ok(h.indexOf("<b>x</b>") < 0, "खोज-शब्द बिना escape के पन्ने पर");
h = typeQ("a");
ok((h.match(/class="bh-chip"/g) || []).length <= 24, "पहली खेप 24 से ज़्यादा कार्ड");
els.bhashaSearch.value = "japani"; M.render(); els.bhKhojClear.onclick();
ok(els.bhashaSearch.value === "" && els.bhKhojOut.style.display === "none" && els.bhashaGroups.style.display === "" && els.bhashaSearch._f === 1, "✕ से सब वापस नहीं / डिब्बे पर उँगली नहीं लौटी");
ok(/var href=c\.url\?c\.url\+'#shuru':'#';/.test(html), "भाषा-कार्ड की कड़ी #shuru पर नहीं");
delete global.document;

/* D */
console.log("D  कोर्स-इंजन kkb2.js: सीधा पहला पाठ");
const k2 = R("assets/kkb2.js");
function boot(hash, prog, code) {
  code = code || "ms";
  const W = { scrollTo() { }, addEventListener() { }, pageYOffset: 0, location: { hash: hash || "" } };
  new Function("window", R("assets/kkb_" + code + "_data.js"))(W); new Function("window", R("assets/kkb2_" + code + "_data.js"))(W);
  const root = { id: "kkb2-app", offsetTop: 0, _h: "" }; Object.defineProperty(root, "innerHTML", { get() { return this._h; }, set(v) { this._h = v; } });
  const store = {}; if (prog) store["acs_kkb2_full_" + code + "_v2"] = JSON.stringify(prog);
  const LS = { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = v; }, removeItem: k => { delete store[k]; } };
  const D = { getElementById: id => (id === "kkb2-app" ? root : null), querySelector: () => ({ offsetHeight: 60 }), body: { classList: { add() { } } } };
  new Function("window", "document", "localStorage", "alert", "confirm", k2)(W, D, LS, () => { }, () => false);
  return { W, root, store };
}
let b = boot("#shuru");
ok(b.root._h.indexOf("दिन 1 / 90") > -1, "#shuru (नई शुरुआत) पर दिन 1 नहीं खुला");
b = boot("#shuru", { day: { 1: 1, 2: 1, 3: 1 } });
ok(b.root._h.indexOf("दिन 4 / 90") > -1, "#shuru (3 दिन पूरे) पर दिन 4 नहीं खुला");
b = boot("#din-26");
ok(b.root._h.indexOf("दिन 26 / 90") > -1, "#din-26 पर दिन 26 नहीं खुला");
b = boot("#din-999");
ok(b.root._h.indexOf("kkb2-month") > -1, "ग़लत #din पर कोर्स-घर नहीं");
b = boot("");
ok(b.root._h.indexOf("▶ पहला पाठ शुरू करो (दिन 1)") > -1 && b.root._h.indexOf("kkb2Go('d',0)") > -1, "कोर्स-घर का मुख्य बटन सीधे दिन 1 नहीं खोलता");
ok(b.root._h.indexOf("📅 सारे दिन देखो") > -1 && b.root._h.indexOf("ज़रूर-बोलो (") > -1, "\"सारे दिन देखो\" / ज़रूर-बोलो बटन नहीं");
b = boot("", { day: { 1: 1, 2: 1 } });
ok(b.root._h.indexOf("▶ आगे पढ़ो: दिन 3") > -1, "प्रगति के बाद मुख्य बटन \"आगे पढ़ो: दिन 3\" नहीं");
b = boot("");
b.W.kkb2Done(0);
ok(b.root._h.indexOf("🎉 शाबाश! दिन 1 पूरा हुआ।") > -1 && b.root._h.indexOf("▶ अगला दिन: दिन 2") > -1, "दिन पूरा होने पर शाबाश/अगला दिन नहीं");
ok(JSON.parse(b.store.acs_kkb2_full_ms_v2).day[1] === 1, "दिन पूरा होने पर प्रगति नहीं बची");
b.W.kkb2Done(4);
ok(b.root._h.indexOf("सप्ताह-टेस्ट") > -1 && b.root._h.indexOf("अगला दिन खोलने से पहले") > -1, "सप्ताह के आख़िरी दिन (दिन 5) पर सप्ताह-टेस्ट नहीं सुझाया");
b.W.kkb2Done(29);
ok(b.root._h.indexOf("सप्ताह का संवाद") > -1, "स्तर-2 सप्ताह के आख़िरी दिन (दिन 30) पर संवाद नहीं सुझाया");
const all = {}; for (let d = 1; d <= 89; d++) all[d] = 1;
b = boot("", { day: all }); b.W.kkb2Done(89);
ok(b.root._h.indexOf("पूरे 90 दिन पूरे") > -1, "आख़िरी दिन के बाद पूरा-होने का संदेश नहीं");
b = boot("#shuru", { day: Object.assign({}, all, { 90: 1 }) });
ok(b.root._h.indexOf("kkb2-month") > -1 && b.root._h.indexOf("सब दिन पूरे") > -1, "सब दिन पूरे होने पर #shuru से कोर्स-घर नहीं");

/* असली पन्ने का क्रम: kkb2.js (defer) पहले, फिर DOMContentLoaded पर acs-translate.js हर [data-t] का लिखा बदलती है।
   इसलिए #shuru वाला दिन DOMContentLoaded के बाद खुले (v1.0 की पकड़ी कमी: बटनों पर "🔊 सुनो" की जगह वाक्य लिख जाता था)। */
(function () {
  const W = { scrollTo() { }, pageYOffset: 0, location: { hash: "#shuru" }, _l: {}, addEventListener(t, f) { (this._l[t] = this._l[t] || []).push(f); } };
  new Function("window", R("assets/kkb_ms_data.js"))(W); new Function("window", R("assets/kkb2_ms_data.js"))(W);
  const root = { id: "kkb2-app", offsetTop: 0, _h: "" }; Object.defineProperty(root, "innerHTML", { get() { return this._h; }, set(v) { this._h = v; } });
  const dcl = [], timers = [];
  const D = { readyState: "interactive", addEventListener(t, f) { if (t === "DOMContentLoaded") dcl.push(f); }, getElementById: id => (id === "kkb2-app" ? root : null), querySelector: () => null, body: { classList: { add() { } } } };
  const LS = { getItem: () => null, setItem() { }, removeItem() { } };
  new Function("window", "document", "localStorage", "alert", "confirm", "setTimeout", k2)(W, D, LS, () => { }, () => false, f => timers.push(f));
  ok(root._h.indexOf("kkb2-month") > -1 && root._h.indexOf("दिन 1 / 90") < 0, "पन्ना लोड होते समय (DOMContentLoaded से पहले) ही दिन खुल गया: acs-translate बटनों के नाम बदल देगी");
  ok(dcl.length === 1 && (W._l.load || []).length >= 1, "DOMContentLoaded/load पर दिन खोलने का इंतज़ाम नहीं");
  dcl.forEach(f => f()); timers.splice(0).forEach(f => f());
  ok(root._h.indexOf("दिन 1 / 90") > -1 && root._h.indexOf(">🔊 सुनो</button>") > -1, "DOMContentLoaded के बाद दिन 1 नहीं खुला");
  const before = root._h; (W._l.load || []).forEach(f => f());
  ok(root._h === before, "load पर दिन दोबारा बना (एक ही बार खुलना चाहिए)");
})();
/* 7 भाषाओं में अभ्यास-पंक्ति पूरा वाक्य (string): स्तर-2 का 🎧 पन्ना (जिस पर "दिन पूरा हुआ" है) टूटना नहीं चाहिए */
["zh", "id", "tr", "mai", "iba", "bew", "bbc"].forEach(c => {
  try { const z = boot("", null, c); z.W.kkb2Go("lis", 25); ok(z.root._h.indexOf("kkb2Done(25)") > -1, c + ": स्तर-2 🎧 पन्ने पर \"दिन पूरा हुआ\" नहीं"); }
  catch (e) { ok(false, c + ": स्तर-2 🎧 पन्ना टूटा: " + e.message); }
});
console.log(fails ? "⛔ dev_bhasha_khoj_check: " + fails + " fail (" + passes + " पास)" : "🏁 dev_bhasha_khoj_check: सब " + passes + " जाँच पास");
process.exit(fails ? 1 : 0);
