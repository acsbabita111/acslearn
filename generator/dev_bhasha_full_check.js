/* generator/dev_bhasha_full_check.js — v1.0 (02-Sep-2026, Founder-आदेश)
   "एक भाषा का पूरा कोर्स" का एक-दरवाज़ा robot — अब तक के सब भाषा-नियम एक जगह (fail-closed)।
   चलाना (repo-रूट से):  node generator/dev_bhasha_full_check.js <code>   जैसे he, ar, en
   जाँचें (हर एक = कोई पिछला दर्ज नियम):
   A  data: L1 = 500 वाक्य (kkb_<code>_data.js) · L2 = 1,650 (kkb2_<code>_data.js) · lang.tts/sr/script खाने
   B  लिपि/दर्पण: dev_kkb2_check <code> 🏁🏁 (तीन-स्तंभ v6.3 · मास्टर-दर्पण v6.3-क6 · SCRIPT_RULES fail-closed · इंजन-render)
   C  पेज: courses/hi/bhasha/<slug>/index.html kkb2-ढाँचे पर (kkb2.js+kkb2.css+दोनों data) · generator KKB2_LANGS में प्रविष्टि
      (अगला-स्तर कड़ी + eMigrate/MADAD) · dev_kkb_check KKB2FAM में
   D  RTL/फ़ॉन्ट: script arabic/persian/hebrew ⇒ kkb2.js RTL-सूची में · kkb2.css में [data-script="<script>"] नियम
   E  सूची: courses_data में PJ-प्रविष्टि "3 माह (90 दिन)"/lessons 90/url · KKB_GROUPS (courses_data) में id · sitemap में पेज
   F  परीक्षा-द्वार (40/40/40 नियम v6.5): exam_data में PJ · dashboard SERVER_EXAM_COURSES + EXAM_TTS · functions/<code>_bank.js
      मौजूद हो तो dev_kkb_quiz_check <code> 🏁 (सुनो ≥280 · बोलो ≥250 · लंबाई 15-35%) — बैंक न हो = FAIL (बिना परीक्षा कोई भाषा "पूरी" नहीं)
   G  sw.js: CACHE_VERSION-टिप्पणी में <code>/भाषा-नाम का ज़िक्र (cache-first नियम — बदलाव पर bump)
   कोई भी ⛔ = upload/deploy नहीं। */
"use strict";
var fs = require("fs"), cp = require("child_process");
var CODE = (process.argv[2] || "").toLowerCase();
if (!CODE) { console.log("⛔ भाषा-code दीजिए: जैसे he | ar | en"); process.exit(1); }
var fail = 0, warn = 0;
function ok(c, m) { if (c) console.log("  ✅ " + m); else { console.log("  ⛔ " + m); fail++; } }
function wn(c, m) { if (c) console.log("  ✅ " + m); else { console.log("  ⚠️ " + m); warn++; } }
function rd(p) { return fs.existsSync(p) ? fs.readFileSync(p, "utf8") : ""; }
var EN = CODE === "en";
var L1P = EN ? "assets/kkb_data.js" : "assets/kkb_" + CODE + "_data.js";
var L2P = EN ? "assets/kkb2_data.js" : "assets/kkb2_" + CODE + "_data.js";

console.log("═══ A data ═══");
global.window = {};
var D1 = null, D2 = null;
try { eval(rd(L1P)); D1 = global.window.KKB_DATA; } catch (e) {}
try { eval(rd(L2P)); D2 = global.window.KKB2_DATA; } catch (e) {}
function cnt(D) { var n = 0; ((D && D.weeks) || []).forEach(function (w) { w.days.forEach(function (d) { n += d.items.length; }); }); return n; }
ok(D1 && cnt(D1) === 500, "L1 " + L1P + " = 500 वाक्य (" + cnt(D1) + ")");
ok(D2 && cnt(D2) === 1650, "L2 " + L2P + " = 1,650 वाक्य (" + cnt(D2) + ")");
var LANG = (D2 && D2.lang) || (D1 && D1.lang) || {};
ok(LANG.code && LANG.tts && LANG.sr && LANG.script, "lang-meta: code/tts/sr/script (" + JSON.stringify(LANG) + ")");
ok(!D2 || (D2.module && D2.help && D2.help.length >= 2) && (EN || D2.heroTitle), "L2 " + (EN ? "module/help" : "heroTitle/module/help") + " मौजूद (मास्टर en में heroTitle नहीं होता)");

console.log("═══ B लिपि/दर्पण (dev_kkb2_check) ═══");
var r = cp.spawnSync("node", ["generator/dev_kkb2_check.js", CODE], { encoding: "utf8" });
ok(r.status === 0 && /🏁🏁/.test(r.stdout), "dev_kkb2_check " + CODE + " 🏁🏁" + (r.status === 0 ? "" : " — " + (r.stdout.split("\n").filter(function (l) { return /⛔/.test(l); }).slice(0, 3).join(" | "))));

console.log("═══ C पेज/generator ═══");
var bs = rd("generator/build_specials.js");
var m = new RegExp('code:\\s*"' + CODE + '",\\s*slug:\\s*"([a-z-]+)"').exec(bs);
var slug = m ? m[1] : null;
ok(slug, "build_specials KKB2_LANGS में " + CODE + " (slug=" + slug + ")");
var pg = slug ? rd("courses/hi/bhasha/" + slug + "/index.html") : "";
ok(pg && /assets\/kkb2\.js/.test(pg) && /assets\/kkb2\.css/.test(pg), "पेज kkb2-ढाँचे पर (kkb2.js + kkb2.css)");
ok(pg && pg.indexOf(L1P) > -1 && pg.indexOf(L2P) > -1, "पेज दोनों data-फ़ाइलें बुलाता है");
ok(pg && /emigrate\.gov\.in/.test(pg) && /madad\.gov\.in/.test(pg), "eMigrate + MADAD सुरक्षा-कड़ियाँ (v6.1-घ4)");
ok(pg && /आगे का रास्ता/.test(pg), "अगला-स्तर कड़ी/ईमानदार-पंक्ति (v6.1-ग)");
var kc = rd("generator/dev_kkb_check.js");
ok(new RegExp("KKB2FAM\\s*=\\s*\\{[^}]*\\b" + CODE + "\\s*:\\s*1").test(kc), "dev_kkb_check KKB2FAM में " + CODE);

console.log("═══ D RTL/फ़ॉन्ट ═══");
var k2js = rd("assets/kkb2.js"), k2css = rd("assets/kkb2.css");
var RTL = ["arabic", "persian", "hebrew"].indexOf(LANG.script) > -1;
if (RTL) ok(new RegExp('LANG\\.script === "' + LANG.script + '"').test(k2js), "kkb2.js RTL-सूची में " + LANG.script);
else console.log("  ℹ️ LTR लिपि (" + LANG.script + ") — RTL-जाँच लागू नहीं");
wn(LANG.script === "latin" || new RegExp('\\[data-script="' + LANG.script + '"\\]').test(k2css), "kkb2.css में [data-script=\"" + LANG.script + "\"] फ़ॉन्ट-नियम");

console.log("═══ E सूची/sitemap ═══");
var cd = rd("assets/courses_data.js"); global.window = {};
try { eval(cd.replace(/^const /gm, "global.")); } catch (e) {}
var all = [].concat(global.PRIVATE_JOB_COURSES || []);
var url = slug ? "/courses/hi/bhasha/" + slug + "/" : null;
var ent = all.filter(function (c) { return c.url === url; })[0];
ok(ent, "courses_data में प्रविष्टि (url " + url + ")" + (ent ? " = " + ent.id : ""));
ok(ent && /90/.test(String(ent.duration)) && Number(ent.lessons) === 90, "courses_data 90-दिन रूप (duration/lessons)");
ok(ent && /Certificate in Spoken/.test(ent.name_hi), "नाम 'Certificate in Spoken …' (सर्टिफिकेट नाम-नियम v6.1-क)");
var G = global.window.KKB_GROUPS || []; var inG = ent && G.some(function (g) { return g.ids.indexOf(ent.id) > -1; });
ok(inG, "KKB_GROUPS (courses_data) में " + (ent ? ent.id : "?"));
ok(slug && rd("sitemap.xml").indexOf("/courses/hi/bhasha/" + slug + "/index.html") > -1, "sitemap.xml में पेज");

console.log("═══ F परीक्षा-द्वार (40/40/40) ═══");
var PID = ent ? ent.id : null;
var ed = rd("assets/exam_data.js"), dj = rd("assets/dashboard.js");
ok(PID && ed.indexOf('"' + PID + '"') > -1, "exam_data में " + PID);
ok(PID && new RegExp(PID + ":\\s*true").test(dj), "dashboard SERVER_EXAM_COURSES में " + PID);
ok(PID && new RegExp(PID + ':\\s*"' + LANG.tts + '"').test(dj), "dashboard EXAM_TTS " + PID + " = " + LANG.tts);
var bankP = "functions/" + (EN ? "eng" : CODE) + "_bank.js";
if (fs.existsSync(bankP)) {
  var q = cp.spawnSync("node", ["generator/dev_kkb_quiz_check.js", CODE], { encoding: "utf8" });
  ok(q.status === 0 && /🏁/.test(q.stdout), "dev_kkb_quiz_check " + CODE + " 🏁 — " + (q.stdout.trim().split("\n").pop() || "").slice(0, 110));
} else ok(false, bankP + " नहीं — बैंक बनाओ: node generator/build_kkb_bank.js " + CODE + " (बिना परीक्षा भाषा 'पूरी' नहीं)");

console.log("═══ G sw ═══");
var sw = rd("sw.js"); var swl = (sw.match(/const CACHE_VERSION = '[^']*'[^\n]*/) || [""])[0];
var nm = (D2 && D2.lang && D2.lang.label) || CODE;
wn(swl.indexOf(CODE) > -1 || swl.indexOf(nm) > -1 || swl.indexOf(slug || "§") > -1, "sw.js CACHE_VERSION-टिप्पणी में " + CODE + "/" + nm + " (cache-first नियम)");

console.log("");
if (fail) { console.log("⛔ " + CODE + ": " + fail + " जाँच fail" + (warn ? " · ⚠️ " + warn : "") + " — upload/deploy नहीं"); process.exit(1); }
console.log("🏁 " + CODE + " — भाषा-कोर्स पूर्ण: data · लिपि-दर्पण · पेज · सूची · परीक्षा 40/40/40 सब पास" + (warn ? " · ⚠️ " + warn + " चेतावनी" : ""));
