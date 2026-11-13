/* generator/dev_exam_guard.js : v1.1 (13-Nov-2026) : खेप 2 का पहरेदार (सिर्फ़ पढ़ता है)
   v1.1 (ऑडिट K2-H02): पुराने वाक्यों की सूची बड़ी हुई, और एक चौड़ा जाल जुड़ा जो कोर्स के हर मुख्य पेज पर
   "परीक्षा" के पास "मुफ़्त" या "₹0" लिखा मिले तो तभी छोड़ता है जब वहीं बैज की शर्त भी लिखी हो।
   Founder का लॉक्ड नियम: पेज और code एक ही बात कहें। यह यंत्र repo में देखता है कि कोर्स की अंतिम परीक्षा के
   नए नियम (बैज या ₹100 · दिन में 2 · 3 खंड · सबसे अच्छा अंक · 5 हिस्से 7 दिन) हर जगह वैसे ही लिखे हैं, और
   कहीं पुराना नियम ("10 चांस", "परीक्षा मुफ़्त") नहीं बचा। फेल = चढ़ाना मना।
   चलाना (repo की जड़ से): node generator/dev_exam_guard.js */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..");
let pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; console.log("  ✅ " + m); } else { fail++; console.log("  ❌ " + m); } }
function rd(f) { return fs.readFileSync(path.join(ROOT, f), "utf8").replace(/\r\n/g, "\n"); }   /* Windows के पंक्ति-अंत से नतीजा नहीं बदलता */
function has(f) { return fs.existsSync(path.join(ROOT, f)); }
function noComments(s) { return s.replace(/\/\*[\s\S]*?\*\//g, " "); }

console.log("1. नया इंजन और dashboard");
const eng = rd("assets/exam-session.js"), dash = rd("assets/dashboard.js"), sw = rd("sw.js"), i18n = rd("assets/dash_i18n_en.js");
ok(/exam-session\.js : v1\.\d/.test(eng) && /window\.ACS_EXAM\s*=/.test(eng), "assets/exam-session.js मौजूद है और ACS_EXAM देता है");
ok(/if\(SERVER_EXAM_COURSES\[cid\]\)\{ await examOpenNew\(cid\); return; \}/.test(dash) && !/await examStartServer\(cid\)/.test(dash), "\"परीक्षा दें\" बटन नया इंजन खोलता है; पुराना परदा किसी बटन से नहीं खुलता");
ok(/s\.src = "\/assets\/exam-session\.js"/.test(dash), "dashboard नया इंजन /assets/exam-session.js से लाता है");
["examGate", "examStart", "examNext", "examFinish"].forEach(function (n) { ok(eng.indexOf('"' + n + '"') >= 0, "इंजन server का काम " + n + " बुलाता है"); });
ok(!/startCourseExam|submitCourseExam/.test(noComments(eng)), "नया इंजन पुराने बंद रास्ते (startCourseExam, submitCourseExam) नहीं बुलाता");
const hv = (dash.slice(0, 900).match(/v(\d+\.\d+\.\d+)/) || [])[1], dv = (dash.match(/const DASH_VER = "v([\d.]+)";/) || [])[1];
ok(hv === dv && hv === "6.8.0", "dashboard.js का संस्करण शीर्ष और DASH_VER दोनों में v6.8.0 है: " + hv + " / " + dv);
const swv = Number((sw.match(/CACHE_VERSION = 'v(\d+)'/) || [])[1]);
ok(swv >= 848, "sw.js का संस्करण v848 या नया है: v" + swv);
ok(i18n.indexOf('"🎓 ब्योरा / दोबारा दें":"🎓 Details / take again"') >= 0, "English-परत में नए बटन का अनुवाद है");

console.log("2. हर परीक्षा-बटन नए इंजन पर जाता है");
const win = {}; vm.runInNewContext(rd("assets/exam_data.js"), { window: win });
const ce = Object.keys(win.COURSE_EXAMS || {});
const a = dash.indexOf("const SERVER_EXAM_COURSES = {"), b = dash.indexOf("};", a);
const srv = vm.runInNewContext("(" + dash.slice(dash.indexOf("{", a), b + 1) + ")");
const miss = ce.filter(function (k) { return !srv[k]; }), filled = ce.filter(function (k) { return (win.COURSE_EXAMS[k].q || []).length > 0; });
ok(ce.length > 100 && miss.length === 0, "exam_data.js के सब " + ce.length + " कोर्स dashboard की server-सूची में हैं" + (miss.length ? " (छूटे: " + miss.slice(0, 5).join(",") + ")" : ""));
ok(filled.length === 0, "exam_data.js में कोई प्रश्न नहीं है (सब प्रश्न server पर): " + filled.length);

console.log("3. फ़ोन के परदे पर लिखे नियम");
[["बैज या ₹100", "प्रवेश: बैज या ₹100"], ["30 दिन", "₹100 का चांस 30 दिन"], ["किसी भी एक परीक्षा में लगता है", "₹100 का एक ही चांस हर परीक्षा में"],
 ["सबसे अच्छा अंक ही दर्ज रहता है", "सबसे अच्छा अंक ही दर्ज"], ["कम या बराबर आए", "कम या बराबर अंक पर पुराना ही रहता है"],
 ["ख़ाली छूटे प्रश्न ग़लत गिने जाते हैं", "ख़ाली प्रश्न ग़लत"], ["5 हिस्सों", "5 हिस्सों का ब्योरा"], ["तक दिखेगा", "ब्योरा कब तक दिखेगा"],
 ["₹125", "प्रमाणपत्र ₹125"], ["आपके जवाब server को जाते हैं", "निजता: जवाब server को जाते हैं"], ["120 प्रश्नों के नंबर", "निजता: server क्या रखता है"]].forEach(function (x) {
  ok(eng.indexOf(x[0]) >= 0, "परदे पर लिखा है: " + x[1]);
});
ok(/r\.perSet \* r\.sets/.test(eng) && /r\.maxSetSec \/ 60/.test(eng) && /r\.minSetSec \/ 60/.test(eng) && /r\.pauseMinSec \/ 60/.test(eng) && /r\.dailyMax/.test(eng), "समय और गिनती के अंक server से आते हैं (परदे पर हाथ से लिखे नहीं हैं)");
ok(!/10 चांस|दस चांस|असीमित|जितनी बार चाहें/.test(eng), "इंजन में पुराने नियम का कोई शब्द नहीं");
ok(eng.indexOf("\u2014") < 0, "इंजन में कहीं लंबी रेखा नहीं है");

console.log("4. पेजों पर पुराना नियम कहीं नहीं");
const OLD = ["10 चांस", "दस चांस", "परीक्षा फिर भी मुफ़्त", "परीक्षा: मुफ़्त", "पैसा सिर्फ़ तब, जब आप प्रमाणपत्र-PDF", "पैसा सिर्फ़ तब, जब आप अपनी मर्ज़ी से प्रमाणपत्र",
  "सिर्फ़ प्रमाणपत्र-PDF ₹125 का है", "पैसा सिर्फ़ उस काग़ज़", "कोर्स मुफ़्त, प्रमाणपत्र ₹125", "course free, certificate ₹125"];
const PAGES = [["courses/hi/digital-mitra-basic/index.html", "generator/build_dmt_pages.js"],
  ["courses/hi/first-code/pl0-203-shabashi-tum-programmer-ban-gaye-pramanpatra-dwar.html", "generator/data/pl0_lessons_data.js"],
  ["courses/hi/tirhuta-lipi/tir-033-pramanpatra-dwar-aage-ki-raah.html", "generator/data/tirhuta_lessons_data.js"],
  ["courses/hi/kaithi-lipi/kth-033-kaithi-pramanpatra-dwar-aage-ki-raah.html", "generator/data/kaithi_lessons_data.js"],
  ["courses/hi/welding/wld-626-varkasha-pa-ke-bada-pariksha-ki-raha-dohara-tala.html", "generator/data/welding_lessons_data.js"]];
PAGES.forEach(function (pg) {
  const p = rd(pg[0]), s = has(pg[1]) ? rd(pg[1]) : null;
  ok(OLD.every(function (o) { return p.indexOf(o) < 0; }), "पेज में पुराना नियम नहीं: " + pg[0].split("/").slice(-2).join("/"));
  if (s !== null) ok(OLD.every(function (o) { return s.indexOf(o) < 0; }), "उसके स्रोत में भी नहीं: " + pg[1]);
});
function walk(dir, out) { fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).forEach(function (e) { const r = dir + "/" + e.name; if (e.isDirectory()) walk(r, out); else if (/\.html$/.test(e.name)) out.push(r); }); return out; }
let left = [];
walk("courses", []).forEach(function (f) { const h = rd(f); if (OLD.some(function (o) { return h.indexOf(o) >= 0; })) left.push(f); });
ok(left.length === 0, "courses/ के किसी भी पेज में पुराने " + OLD.length + " वाक्यों में से कोई नहीं" + (left.length ? " (बचे: " + left.slice(0, 3).join(", ") + ")" : ""));
["generator/build_specials.js", "generator/build_dmt_pages.js", "generator/data/kaithi_lessons_data.js", "generator/data/tirhuta_lessons_data.js"].forEach(function (f) {
  if (has(f)) { const s = rd(f); ok(OLD.every(function (o) { return s.indexOf(o) < 0; }), "स्रोत में भी पुराना वाक्य नहीं: " + f); }
});
/* चौड़ा जाल: कोर्स के मुख्य पेज और संस्था-पर्चे। tag की सीमा को वाक्य की सीमा माना जाता है। */
const NET = /(?:परीक्षा)[^।|]{0,40}(?:मुफ़्त|₹0)|(?:मुफ़्त|₹0)[^।|]{0,25}परीक्षा/g;
const FINE = [/बैज/, /परीक्षा-तैयारी मुफ़्त/, /साप्ताहिक परीक्षा, बिना login/, /मुफ़्त रजिस्ट्रेशन/, /मुफ़्त हुनर-कोर्स, परीक्षा व प्रमाणपत्र/];
let netBad = [], netPages = 0;
walk("courses", []).filter(function (f) { return /\/index\.html$/.test(f) && !/\/lipi\//.test(f); }).forEach(function (f) {
  netPages++;
  const t = rd(f).replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " | ").replace(/\s+/g, " ");
  let m; NET.lastIndex = 0;
  while ((m = NET.exec(t))) {
    const seg = t.slice(Math.max(0, t.lastIndexOf("|", m.index) + 1, t.lastIndexOf("।", m.index) + 1), m.index + m[0].length + 60);
    if (!FINE.some(function (re) { return re.test(seg); })) netBad.push(f + " : " + m[0].slice(0, 60));
  }
});
ok(netPages > 800 && netBad.length === 0, netPages + " मुख्य पेजों में कहीं भी \"परीक्षा मुफ़्त\" बिना बैज की शर्त के नहीं लिखा" + (netBad.length ? " (मिले " + netBad.length + ": " + netBad.slice(0, 3).join(" ; ") + ")" : ""));
const kb = rd("courses/hi/bhasha/english/index.html"), br = rd("courses/hi/bhasha/english/brief/index.html");
ok((kb.split("90 दिन बाद की अंतिम परीक्षा में (बैज हो तो मुफ़्त, नहीं तो ₹100 प्रति परीक्षा)").length - 1) === 2, "भाषा-कोर्स के पेज पर अंतिम परीक्षा की फीस लिखी है (दिखने वाले सवाल-जवाब में और search वाले डिब्बे में)");
ok(/अंतिम परीक्षा बैज में मुफ़्त, नहीं तो ₹100/.test(br) && /final exam free with a learner badge, otherwise ₹100/.test(br), "भाषा-कोर्स के संस्था-पर्चे पर भी, हिंदी और English दोनों में");
const dmt = rd("courses/hi/digital-mitra-basic/index.html");
ok(/बैज हो तो ₹0/.test(dmt) && /बैज न हो तो ₹100<\/b> प्रति परीक्षा/.test(dmt) && /एक दिन में 2 परीक्षाएँ तक/.test(dmt), "डिजिटल मित्र के फीस-चार्ट में नई फीस लिखी है: बैज हो तो ₹0, नहीं तो ₹100");
ok(/120-प्रश्न online परीक्षा: बैज में मुफ़्त, नहीं तो ₹100/.test(dmt) && /पैसा तीन जगह लगता है: बिना बैज परीक्षा देने पर \(₹100 प्रति परीक्षा\)/.test(dmt), "डिजिटल मित्र के पेज पर ऊपर की पट्टी और फीस-चार्ट के नीचे की पंक्ति भी वही फीस कहती हैं (ऑडिट K2-H02)");

console.log("4-ख. ₹100 की वापसी का नियम (ऑडिट K2-H03; Founder का फ़ैसला 13-Nov-2026): हर जगह एक ही बात");
const RF = rd("refund.html"), APS = rd("assets/apt-session.js"), APE = rd("assets/apt_session_en.js"), SPC = has("generator/build_specials.js") ? rd("generator/build_specials.js") : null;
ok(/2\. परीक्षा का चांस \(₹100\)/.test(RF) && /₹100 का चांस वापस नहीं होता।/.test(RF) && /सिर्फ़ हमारी तकनीकी गलती हो, तो पूरा पैसा वापस मिलता है।/.test(RF) && /कोर्स की अंतिम परीक्षा में भी/.test(RF), "वापसी-नीति के पेज पर ₹100 के चांस का नया नियम लिखा है");
ok(!/अंतिम जमा \(final submit\) से पहले छोड़ा, तो 70% वापस/.test(RF) && !/2\. अभिरुचि-टेस्ट \(Aptitude Test\)/.test(RF), "वापसी-नीति के पेज से करियर टेस्ट का पुराना नियम (70% वापसी) हट गया");
if (SPC !== null) ok(/2\. परीक्षा का चांस \(₹100\)/.test(SPC) && !/अंतिम जमा \(final submit\) से पहले छोड़ा/.test(SPC), "वापसी-नीति का स्रोत (build_specials.js) भी वही कहता है");
ok(eng.indexOf("₹100 का चांस वापस नहीं होता। सिर्फ़ हमारी तकनीकी ग़लती हो, तो पूरा पैसा वापस मिलता है।") >= 0 && /id="xmRefund"/.test(eng) && /href="\/refund\.html"/.test(eng), "कोर्स-परीक्षा के परदे पर ₹100 के बटन के ऊपर वही नियम और वापसी-नीति की कड़ी है");
ok(APS.indexOf("<b>₹100 का चांस वापस नहीं होता।</b> सिर्फ़ हमारी तकनीकी ग़लती हो, तो पूरा पैसा वापस मिलता है।") >= 0 && APE.indexOf("The ₹100 attempt is not refunded.") >= 0, "करियर टेस्ट में भी ₹100 के बटन के ऊपर वही नियम है, हिंदी और English में");
ok(/r\.sessionSec/.test(eng) && /रद्द मानी जाती है/.test(eng), "द्वार पर लिखा है कि परीक्षा तय समय (server से आया) में पूरी न हो तो रद्द मानी जाती है");

console.log("5. डिजिटल मित्र की मुहर");
if (has("generator/data/dmt_release_manifest.json") && has("generator/build_dmt_pages.js")) {
  const man = JSON.parse(rd("generator/data/dmt_release_manifest.json"));
  /* वही गणित जो build_dmt_pages.js का contentDigest करता है (109 पाठ-स्रोत + टेम्पलेट + यंत्र + उसका जाँच-यंत्र),
     पर पंक्ति-अंत एक-सा करके, ताकि Windows की प्रति पर भी वही छाप निकले */
  const shaLF = function (f) { return crypto.createHash("sha256").update(Buffer.from(fs.readFileSync(f).toString("latin1").replace(/\r\n/g, "\n"), "latin1")).digest("hex"); };
  const mdDir = path.join(ROOT, "generator", "data", "dmt_lessons_md"), parts = [];
  fs.readdirSync(mdDir).filter(function (f) { return /^dmt-\d+-\d+\.md$/.test(f); }).sort().forEach(function (f) { parts.push(f + ":" + shaLF(path.join(mdDir, f))); });
  [["_TEMPLATE.html", path.join(ROOT, "_TEMPLATE.html")], ["build_dmt_pages.js", path.join(ROOT, "generator", "build_dmt_pages.js")], ["dev_dmt_check.js", path.join(ROOT, "generator", "dev_dmt_check.js")]]
    .forEach(function (x) { parts.push(x[0] + ":" + shaLF(x[1])); });
  const dg = crypto.createHash("sha256").update(parts.join("\n")).digest("hex");
  ok(!!dg && dg === man.content_sha256, "मुहर-फ़ाइल की छाप आज की सामग्री से मिलती है (मुहर बासी नहीं)");
  const sealed = man.founder_approved === true && man.metadata_verified === true && /^\d{4}-\d\d-\d\d$/.test(man.approved_on || "");
  const open = man.founder_approved === false && man.metadata_verified === false && (man.approved_on || "") === "";
  ok(sealed || open, sealed ? "मुहर-फ़ाइल में Founder की स्वीकृति और तारीख़ भरी है: " + man.approved_on : "मुहर-फ़ाइल साफ़ कहती है कि Founder की स्वीकृति अभी बाक़ी है (तीनों खाने ख़ाली)");
} else ok(true, "(generator फ़ोल्डर इस जगह नहीं है: मुहर की जाँच छोड़ी गई)");

console.log((fail ? "⛔" : "🏁") + " खेप 2 का पहरेदार: पास " + pass + " · फेल " + fail);
process.exit(fail ? 1 : 0);
