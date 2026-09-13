/* dev_courses_page_check.js v1.2 (13-Sep-2026 रात: आलसी-render + 50-खेप जाँच, ऑडिट H1) · v1.1 (13-Sep-2026: तीन-लिपि कार्ड नियम t3/seal + नाम-एकरूपता + ACS-टैग निषेध) · v1.0 (10-Sep-2026) — /courses/hi/ पेज का असली-render check-robot
   जन्म-कारण: ALL27-शृंखला की courses_data में `}, , {` ख़ाली-slot (PJ138 हटाते-सरकाते छूटा) —
   node --check इसे वैध मानता है, data-गिनती वाले यंत्र इसे छोड़ देते हैं, पर browser में
   kkbCourse() की for-loop `undefined.id` पर टूटती है → renderBhasha रुका → init() अधूरा →
   भाषा-समूह + हुनर-सूची दोनों ख़ाली (live v549 पर Founder ने पकड़ा)।
   नियम = robot नियम: अब पेज का inline-JS असली data-फ़ाइलों के साथ नक़ली-DOM में चलता है —
   init() पूरा होना + हर डिब्बे की गिनती data से मिलना अनिवार्य। fail = upload नहीं।
   चलाओ: node generator/dev_courses_page_check.js   (ROOT से) */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.resolve(__dirname, "..");
const R = f => fs.readFileSync(path.join(ROOT, f), "utf8");
let fails = 0, warns = 0;
const ok = (c, m) => { if (!c) { fails++; console.log("  ⛔ " + m); } };
const warn = (c, m) => { if (!c) { warns++; console.log("  ⚠️ " + m); } };

const html = R("courses/hi/index.html");

/* ── (A) data-सूचियों की अखंडता: ख़ाली-slot / id-रहित / id-दोहराव ── */
const dataSrc = R("assets/courses_data.js");
const arrs = new Function("window", dataSrc + "; return {PRIVATE_JOB_COURSES, SELF_EMP_COURSES, ACADEMIC_COURSES, GOVT_SCHOLAR_COURSES, G: window.KKB_GROUPS||[], POP: window.KKB_POPULAR||[]};")({});
ok(!/\},\s*,\s*\{/.test(dataSrc) && !/\[\s*,/.test(dataSrc) && !/,\s*,/.test(dataSrc), "courses_data में ख़ाली-slot (`, ,`) — browser की for-loop यहीं टूटती है");
const allIds = [];
["PRIVATE_JOB_COURSES", "SELF_EMP_COURSES", "ACADEMIC_COURSES", "GOVT_SCHOLAR_COURSES"].forEach(k => {
  const a = arrs[k];
  for (let i = 0; i < a.length; i++) { ok(a[i] && a[i].id, k + "[" + i + "] ख़ाली/id-रहित"); if (a[i] && a[i].id) allIds.push(a[i].id); }
});
const dup = allIds.filter((x, i) => allIds.indexOf(x) !== i);
ok(dup.length === 0, "id-दोहराव: " + dup.slice(0, 5).join(","));
const byId = {}; [].concat(arrs.PRIVATE_JOB_COURSES, arrs.SELF_EMP_COURSES, arrs.ACADEMIC_COURSES, arrs.GOVT_SCHOLAR_COURSES).forEach(c => { if (c && c.id) byId[c.id] = c; });

/* ── (B) KKB समूह-सूची बनाम data ── */
const gIds = [].concat(...arrs.G.map(g => g.ids || []));
ok(arrs.G.length >= 7, "KKB_GROUPS < 7 समूह");
ok(new Set(gIds).size === gIds.length, "KKB_GROUPS में id-दोहराव");
gIds.forEach(id => ok(byId[id], "समूह-id data में नहीं: " + id));
arrs.POP.forEach(id => ok(byId[id], "popular-id data में नहीं: " + id));
const goldExpected = gIds.filter(id => ((byId[id] || {}).name_hi || "").indexOf("प्रमाणपत्र कोर्स") > -1).length;
/* url जीवित */
gIds.forEach(id => { const u = (byId[id] || {}).url; ok(u, "url-रहित भाषा: " + id); if (u) ok(fs.existsSync(path.join(ROOT, u.replace(/\/$/, "/index.html"))), "मरी कड़ी: " + id + " → " + u); });

/* ── (C) पेज का असली inline-JS नक़ली-DOM में ── */
const lines = html.split("\n");
const start = lines.findIndex(l => l.trim() === "<script>");
const end = lines.findIndex((l, i) => i > start && l.includes("</script>"));
ok(start > 0 && end > start, "inline <script> नहीं मिला");
const inline = lines.slice(start + 1, end).join("\n");
const store = {};
const mkEl = id => ({ id, innerHTML: "", textContent: "", value: "", style: {}, children: [], appendChild() {}, querySelectorAll() { return []; }, querySelector() { return null; },
  classList: { add() {}, remove() {}, contains() { return false; } }, setAttribute() {}, removeAttribute() {}, getAttribute() { return ""; }, addEventListener() {} });
const idsInHtml = new Set((html.match(/\sid="([^"]+)"/g) || []).map(x => x.replace(/^\sid="|"$/g, "")));
const el = id => { if (!idsInHtml.has(id)) return null; /* असली DOM-नियम: अनजान id = null */
  if (!store[id]) { store[id] = mkEl(id); if (/^eduFilter\d$/.test(id)) store[id].value = "all"; } return store[id]; };
const fakeWin = { location: { hash: "", search: "", pathname: "/courses/hi/" }, addEventListener() {}, navigator: { language: "hi" },
  localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} } };
fakeWin.sessionStorage = fakeWin.localStorage;
const fakeDoc = { getElementById: el, querySelectorAll() { return []; }, querySelector() { return null; }, addEventListener() {}, readyState: "complete", body: {},
  createElement() { return mkEl("_tmp"); } };
/* पेज के script-क्रम से (courses_data → academic_subjects → subject_slugs → mg_names → udyam_data → inline) */
const seq = ["assets/courses_data.js", "assets/academic_subjects.js", "assets/subject_slugs.js", "assets/mg_names.js", "assets/udyam_data.js"];
seq.forEach(f => ok(fs.existsSync(path.join(ROOT, f)), "asset नहीं: " + f));
let initErr = null; let renderTabRef = [];
try {
  const code = seq.map(f => R(f)).join("\n;\n") + "\n;\n" + inline + "\n;\n try { init(); } catch (e) { __initErr(e); }\n __renderTabRef([1,2,3,4,5].map(t => () => renderTab(t)));";
  new Function("window", "document", "location", "localStorage", "sessionStorage", "navigator", "addEventListener", "__initErr", "__renderTabRef", code)
    (fakeWin, fakeDoc, fakeWin.location, fakeWin.localStorage, fakeWin.sessionStorage, fakeWin.navigator, fakeWin.addEventListener, e => { initErr = e; }, arr => { renderTabRef = arr; });
} catch (e) { initErr = e; }
ok(!initErr, "पेज-JS टूटा: " + (initErr && (initErr.message + " @ " + String(initErr.stack).split("\n")[1])));
const chips = h => (String(h || "").match(/class="bh-chip[" ]/g) || []).length;
const gold = h => (String(h || "").match(/bh-chip-full/g) || []).length;
const groupsHtml = (store.bhashaGroups || {}).innerHTML;
ok(chips(groupsHtml) === gIds.length, "भाषा-समूह chips " + chips(groupsHtml) + " ≠ data " + gIds.length + " (सूची ख़ाली/अधूरी)");
ok(gold(groupsHtml) === goldExpected, "सुनहरी chips " + gold(groupsHtml) + " ≠ अपेक्षित " + goldExpected);
ok(chips((store.bhPopular || {}).innerHTML) === arrs.POP.length, "⭐ popular chips " + chips((store.bhPopular || {}).innerHTML) + " ≠ " + arrs.POP.length);
ok(/<details/.test(String(groupsHtml)) && (String(groupsHtml).match(/<details/g) || []).length === arrs.G.length, "समूह-accordion गिनती ≠ " + arrs.G.length);
/* v1.1 (13-Sep): तीन-लिपि कार्ड नियम — हर भाषा-प्रविष्टि में t3 (3-4 पंक्तियाँ) + seal; render में lc-hi/lc-nat/lc-en हर कार्ड पर */
gIds.forEach(id => { const c = byId[id] || {}; ok(Array.isArray(c.t3) && c.t3.length >= 3 && c.t3.length <= 4 && c.t3.every(x => x && String(x).trim()), "t3 (तीन-लिपि नाम) अधूरा: " + id); ok(c.seal && String(c.seal).trim(), "seal (लिपि-मुहर) नहीं: " + id); ok(!/ACS काम की भाषा/.test(c.name_hi || ""), "पुराना 'ACS काम की भाषा' टैग बचा: " + id); ok(/बोलने का प्रमाणपत्र कोर्स \(Certificate in Spoken /.test(c.name_hi || ""), "नाम-एकरूपता टूटी: " + id); });
const cnt = (h, cls) => (String(h || "").match(new RegExp('class="' + cls + '"', "g")) || []).length;
ok(cnt(groupsHtml, "lc-hi") === gIds.length && cnt(groupsHtml, "lc-nat") === gIds.length && cnt(groupsHtml, "lc-en") === gIds.length, "कार्ड में तीन-लिपि पंक्तियाँ अधूरी (hi/nat/en ≠ " + gIds.length + ")");
ok(cnt(groupsHtml, "lc-alt") === gIds.filter(id => (byId[id].t3 || []).length === 4).length, "चार-लिपि कार्ड गिनती ≠ data");
ok(!/\[\s*[\u0900-\u097F]/.test(String(groupsHtml)), "कार्ड-पाठ में चौकोर कोष्ठक");
/* tab-0 हुनर-सूची + बाक़ी tab */
const g0 = (store.grid0 || {}).innerHTML || "";
ok(chips(g0) > 0, "tab-0 हुनर-सूची ख़ाली (grid0)");
warn(chips(g0) >= 6, "tab-0 हुनर chips " + chips(g0) + " < 6 (पूरे हुनर-कोर्स)");
/* v1.2 (13-Sep, ऑडिट H1): आलसी-render — init पर सिर्फ़ tab-0; बाक़ी tab renderTab(t) से; 50-खेप में "और देखें" अनिवार्य जब सूची >50 */
[1, 2, 3, 4, 5].forEach(t => ok(((store["grid" + t] || {}).innerHTML || "").length === 0, "tab-" + t + " init पर render हुआ (आलसी-render नियम टूटा)"));
try { renderTabRef.forEach(fn => fn()); } catch (e) { ok(false, "renderTab(1..5) टूटा: " + e.message); }
[1, 2, 3, 4, 5].forEach(t => ok(((store["grid" + t] || {}).innerHTML || "").length > 50, "tab-" + t + " grid ख़ाली"));
[1, 2, 3].forEach(t => { const h = (store["grid" + t] || {}).innerHTML || ""; ok((h.match(/class="course-card"/g) || []).length <= 50 && /और देखें/.test(h), "tab-" + t + " 50-खेप नियम टूटा (कार्ड " + (h.match(/class="course-card"/g) || []).length + ")"); });
/* पेज-गिनती वाक्य data से मेल */
const mCnt = html.match(/(\d+) भाषाओं का पूरा कोर्स/); const mAll = html.match(/दुनिया की (\d+) भाषाएँ/);
ok(mCnt && +mCnt[1] === goldExpected, "पेज-वाक्य '" + (mCnt && mCnt[0]) + "' ≠ data सुनहरी " + goldExpected);
ok(mAll && +mAll[1] === gIds.length, "पेज-वाक्य '" + (mAll && mAll[0]) + "' ≠ data भाषाएँ " + gIds.length);

console.log("dev_courses_page_check: भाषा " + gIds.length + " · सुनहरी " + goldExpected + " · popular " + arrs.POP.length + " · tab-0 chips " + chips(g0) + " · समूह " + arrs.G.length);
if (fails) { console.log("⛔ dev_courses_page_check: " + fails + " fail — upload नहीं"); process.exit(1); }
console.log("🏁 dev_courses_page_check: पेज असली-render पास" + (warns ? " · ⚠️ " + warns : ""));
