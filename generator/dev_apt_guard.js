/* ============================================================
   generator/dev_apt_guard.js : v1.7 (14-Nov-2026, खेप 5-क; v1.6 13-Nov-2026) · पहरेदार जाँच-यंत्र
   Founder का नियम (13-Nov-2026): जो content फीस से जुड़ा है, वह server पर रहेगा; repo पर सिर्फ़ मुफ़्त चीज़ें।
   यह यंत्र repo पर कुछ भी चढ़ाने से पहले देखता है कि:
     1. करियर टेस्ट का पूरा प्रश्न-भंडार या उसकी कच्ची फ़ाइलें repo में नहीं हैं।
     2. परीक्षा का इंजन repo के भंडार पर टिका नहीं है, और उसमें नए समय-नियम के अंक सही हैं।
     3. मुफ़्त नमूना-सेट 48 प्रश्नों का है, और 24 प्रश्नों का हर बेतरतीब चुनाव सब 24 सेक्टर ढकता है।
     4. इंजन पुराने फ़ोन (ES5) पर चलने लायक़ है।
     5. English की पाठ-तालिका इंजन के हर वाक्य से मेल खाती है।
     6. करियर-पेज (45 भाषाएँ) और टेस्ट-पेज परीक्षा के बारे में एक ही बात कहते हैं।
     7. निजता: server को क्या जाता है।
     8. (v1.7) नई भाषाएँ (generator/lib_apt_langs.js की LIVE सूची): किसी भी भाषा का भंडार या उसका स्रोत-पाठ repo में नहीं;
        हर नई भाषा की चारों फ़ाइलें यंत्र से ताज़ा; पन्नों की भाषा-कड़ियाँ रजिस्टर के बराबर; करियर-पन्ने की कड़ियाँ उसी भाषा की परीक्षा पर।
   एक भी दोष = ⛔ और exit 1। चलाना: node generator/dev_apt_guard.js
   ============================================================ */
"use strict";
var fs = require("fs"), path = require("path"), vm = require("vm"), cp = require("child_process");
var ROOT = path.resolve(__dirname, "..");
var pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; console.log("  ✅ " + m); } else { fail++; console.log("  ❌ " + m); } }
function rd(p) { return fs.readFileSync(path.join(ROOT, p), "utf8"); }
function ex(p) { return fs.existsSync(path.join(ROOT, p)); }
function noComments(s) { return s.replace(/\/\*[\s\S]*?\*\//g, ""); }

console.log("1. फीस वाला content repo में नहीं");
["assets/apt_sets", "assets/apt_sets_en", "generator/data/aptitude/en/bank", "functions", "apt_bank"].forEach(function (d) { ok(!ex(d), d + " : repo में नहीं है"); });
var aptDirs = fs.readdirSync(path.join(ROOT, "assets")).filter(function (n) { return /^apt_sets/.test(n); });
ok(aptDirs.length === 0, "assets में apt_sets से शुरू होने वाला कोई फ़ोल्डर नहीं (किसी भी भाषा का): " + aptDirs.join(","));
var gen = fs.readdirSync(path.join(ROOT, "generator")), gdata = fs.readdirSync(path.join(ROOT, "generator/data"));
var raw = gen.filter(function (n) { return /^build_khep|^split_apt_pool|^apt_en_bank|^build_apt_en_sets/.test(n); }).concat(gdata.filter(function (n) { return /^khep.*_texts/.test(n); }));
ok(raw.length === 0, "भंडार बनाने की कच्ची फ़ाइलें repo में नहीं: " + raw.slice(0, 4).join(","));
var leak = [];
fs.readdirSync(path.join(ROOT, "assets")).forEach(function (n) {
  if (!/\.js$/.test(n)) return;
  var s = fs.readFileSync(path.join(ROOT, "assets", n), "utf8");
  if (/APT_POOL\.push\.apply|APT_POOL\.push\(\s*\[/.test(s)) leak.push(n);
});
ok(leak.length === 0, "assets की किसी फ़ाइल में प्रश्न-भंडार दर्ज नहीं: " + leak.join(","));

console.log("2. इंजन server से प्रश्न लेता है, और समय-नियम के अंक सही हैं");
var eng = rd("assets/apt-session.js"), code = noComments(eng), pay = rd("assets/apt-pay.js");
ok(!/apt_sets|D\.pool\b|loadTopShards|pickSpread/.test(code), "इंजन में repo के भंडार का कोई रास्ता नहीं");
ok(/PAYAPI\(\)\.start\(/.test(code) && /PAYAPI\(\)\.next\(/.test(code) && /PAYAPI\(\)\.finish\(/.test(code), "इंजन तीनों server-काम बुलाता है (शुरू, अगला खंड, पूरी)");
ok(/"aptGate"/.test(pay) && /"aptStart"/.test(pay) && /"aptNext"/.test(pay) && /"aptFinish"/.test(pay), "भुगतान-पुल में चारों server-काम जुड़े हैं");
ok(!/"saveAptitudeResult"|"latestAptitudeResult"|saveResult\s*\(/.test(noComments(pay)) && !/saveResult|latestResult/.test(code), "बिना ₹125 के नतीजा server पर भेजने का कोई रास्ता नहीं");
ok(/minSetSec:\s*600\b/.test(code) && /maxSetSec:\s*2400\b/.test(code) && /pauseMinSec:\s*60\b/.test(code) && /pauseMaxSec:\s*300\b/.test(code), "इंजन के अंक: खंड 10 से 40 मिनट, विराम 1 से 5 मिनट");
ok(/अधिकतम 40 मिनट और कम से कम 10 मिनट/.test(eng) && /1 से 5 मिनट का विराम/.test(eng) && /एक दिन में कुल 2 परीक्षाएँ/.test(eng), "पन्ने पर दिखने वाला पाठ उन्हीं अंकों से मेल खाता है");
ok(!/acs_apt_gate_v1/.test(code) && !/acs_apt_gate_v1/.test(noComments(pay)), "फ़ोन का पुराना निशान अब ताला नहीं है");

console.log("3. मुफ़्त नमूना-सेट और 24 का बेतरतीब चुनाव");
var win = {}; vm.runInNewContext(rd("assets/aptitude_data.js"), { window: win });
var D = win.APT_DATA, pv = rd("assets/aptitude-test.js");
ok(D && D.questions && D.questions.length === 48, "नमूना-सेट में 48 प्रश्न: " + (D && D.questions ? D.questions.length : 0));
var a = pv.indexOf("  function mgOf(q) {"), b = pv.indexOf("  function buildFlow(ids) {");
ok(a > 0 && b > a, "झलक-इंजन में चुनाव का हिस्सा मिला");
var sb = { D: D, Math: Math, out: null };
vm.runInNewContext(pv.slice(a, b) + "\nout = { pick24: pick24, mgOf: mgOf };", sb);
var bad = 0, kinds = {}, byId = {}; D.questions.forEach(function (q) { byId[q.id] = q; });
for (var i = 0; i < 2000; i++) {
  var ids = sb.out.pick24(), u = {}, m = {};
  ids.forEach(function (id) { u[id] = 1; sb.out.mgOf(byId[id]).forEach(function (x) { m[x] = 1; }); });
  if (ids.length !== 24 || Object.keys(u).length !== 24 || Object.keys(m).length !== 24) bad++;
  kinds[ids.slice().sort().join()] = 1;
}
ok(bad === 0, "2000 बार चुनाव: हर बार 24 अलग प्रश्न और सब 24 सेक्टर ढके (दोष " + bad + ")");
ok(Object.keys(kinds).length > 1500, "चुनाव सचमुच बेतरतीब है: 2000 में " + Object.keys(kinds).length + " अलग सेट");
ok(/acs_apt_li/.test(pv) && /ACS_APT_PREVIEW/.test(pv) && /previewHide\(!!user\)/.test(pay), "login होने पर झलक छिपाने का रास्ता जुड़ा है");

console.log("4. पुराने फ़ोन (ES5) पर चलने लायक़");
["assets/apt-session.js", "assets/aptitude-test.js", "assets/apt_strings.js"].forEach(function (f) {
  var c = noComments(rd(f)).replace(/'(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"/g, "''");
  ok(!/=>|\blet\s|\bconst\s|`/.test(c), f + " : ES5 ही (arrow, let, const, backtick नहीं)");
  try { new vm.Script(rd(f)); ok(true, f + " : syntax ठीक"); } catch (e) { ok(false, f + " : syntax दोष " + e.message); }
});

console.log("5. English की पाठ-तालिका");
var r = cp.spawnSync(process.execPath, [path.join(__dirname, "build_apt_session_en.js"), "--check"], { encoding: "utf8" });
ok(r.status === 0 && /दोष 0/.test(r.stdout || ""), "इंजन के हर हिंदी वाक्य का English जोड़ा मौजूद है: " + ((r.stdout || "").split("\n")[0] || "").slice(0, 110));
var sx = {}; vm.runInNewContext(rd("assets/apt_session_en.js"), { window: sx });
var tb = (sx.APT_SX && sx.APT_SX.en) || {}, devIn = Object.keys(tb).filter(function (k) { return typeof tb[k] === "string" && /[\u0900-\u097F]/.test(tb[k]); });
ok(Object.keys(tb).length > 100 && devIn.length === 0, "English तालिका के English पाठ में देवनागरी नहीं (जोड़े " + Object.keys(tb).length + ")");

console.log("6. करियर-पेज और टेस्ट-पेज एक ही बात कहते हैं");
var hiC = rd("career.html"), enC = rd("en/career.html");
ok(!/90 मिनट|असीमित|जितनी बार चाहें/.test(hiC), "हिंदी करियर-पेज पर पुराना दावा (90 मिनट, असीमित, जितनी बार चाहें) नहीं");
ok(/समय 3 × 40 मिनट का है/.test(hiC) && hiC.split("दिन में 2 बार तक").length - 1 === 4, "हिंदी करियर-पेज: 3 × 40 मिनट, और \"दिन में 2 बार तक\" चारों जगह");
ok(!/90 minutes|Unlimited times|as many times as you like|unlimited for pass holders|chances are unlimited|currently in Hindi/.test(enC), "English करियर-पेज पर पुराना दावा नहीं");
ok(/The time is 3 × 40 minutes/.test(enC) && enC.split("p to 2 times a day").length - 1 === 4 && enC.split('href="/en/aptitude-test.html#apt-full"').length - 1 === 3, "English करियर-पेज: 3 × 40 मिनट, \"up to 2 times a day\" चारों जगह, और पूरी परीक्षा की तीनों कड़ियाँ English पेज पर");
var langDirs = fs.readdirSync(ROOT).filter(function (d) { return /^[a-z]{2,3}$/.test(d) && ex(d + "/career.html"); }), stale = [];
langDirs.forEach(function (d) {
  var src = path.join(ROOT, "generator", "career_" + d + "_strings.js");
  if (!fs.existsSync(src)) { stale.push(d + ":तालिका नहीं"); return; }
  var S = require(src), T = S.T || S.EN, pg = rd(d + "/career.html");
  if (!T || !/2/.test(T[100]) || !/3 × 40/.test(T[89]) || /(^|\D)90(\D|$)/.test(T[89]) || !/2/.test(T[222]) || T.length !== 261) { stale.push(d + ":तालिका पुरानी"); return; }
  if (pg.indexOf("Golden Pass") < 0) stale.push(d + ":पेज");
});
ok(langDirs.length === 44 && stale.length === 0, "44 भाषाओं के करियर-पेज और उनकी तालिकाएँ नए नियम पर: " + langDirs.length + " पेज, दोष " + stale.join(","));
ok(/पहले और दूसरे खंड के बाद 1 से 5 मिनट का विराम/.test(eng) && !/5 साल/.test(noComments(eng)), "टेस्ट-पेज का पाठ: विराम सिर्फ़ पहले और दूसरे खंड के बाद; \"5 साल\" का दावा नहीं (वह खेप 3 में आएगा)");

var allCareer = ["career.html"].concat(langDirs.map(function (d) { return d + "/career.html"; })), claim = [];
allCareer.forEach(function (f) { var t = rd(f); if (/QR|career-report-sample/.test(t)) claim.push(f); });
ok(allCareer.length === 45 && claim.length === 0, "45 करियर-पेजों पर QR, जाँच-नंबर या नमूना-रिपोर्ट का दावा नहीं (ये खेप 3 में प्रमाणपत्र के साथ लौटेंगे): " + claim.join(","));
ok(!/unique नंबर|Unique नंबर|फ़ोन बदलने पर भी|नतीजा-सार \(login पर\)/.test(hiC) && !/unique number|survives a phone change|Full-test result summary/.test(enC), "करियर-पेज पर \"नतीजा अपने-आप server पर सेव\" और \"unique नंबर\" वाली पंक्तियाँ नहीं");
ok(/id="apt-all24"/.test(eng), "नतीजे में सभी 24 सेक्टरों के स्कोर की सूची है (करियर-पेज यही कहता है)");
var prevJs = noComments(rd("assets/aptitude-test.js"));
ok(/idsOK\(ST\.ids\) \? ST\.ids/.test(prevJs) && !/i < D\.questions\.length && i < 24/.test(prevJs), "झलक के अंक चुने हुए 24 प्रश्नों (ST.ids) से जुड़ते हैं, \"पहले 24\" से नहीं");

var consent = ["rules-consent-learner.html"].concat(fs.readdirSync(ROOT).filter(function (d) { return /^[a-z]{2,3}$/.test(d) && ex(d + "/rules-consent-learner.html"); }).map(function (d) { return d + "/rules-consent-learner.html"; })), cbad = [];
consent.forEach(function (f) { if (/असीमित|unlimited|ilimitad|illimit|সীমাহীন|безлимит|tanpa batas|لامحدود|غير محدودة|unbegrenzt|無制限|无限次|अमर्याद|అపరిమిత/.test(rd(f))) cbad.push(f); });
ok(consent.length === 15 && cbad.length === 0 && /में पूरा टेस्ट मुफ़्त, दिन में 2 बार तक/.test(rd("rules-consent-learner.html")), "learner नियम-पत्र (15 भाषाएँ): Golden Pass में \"असीमित\" नहीं, \"दिन में 2 बार तक\" लिखा है: " + cbad.join(","));

console.log("7. निजता: server को क्या जाता है");
var payJs = noComments(rd("assets/apt-pay.js"));
ok(!/yob\s*:/.test(noComments(eng)) && /band:\s*bandOf\(/.test(eng), "जन्म का साल server को नहीं भेजा जाता; सिर्फ़ उम्र-वर्ग जाता है");
ok(/createAptitudeReportOrder"\)\(\{ v: 2 \}\)/.test(payJs) && !/createAptitudeReportOrder"\)\(\{[^}]*reportText/.test(payJs) && /verifyAptitudeReportPayment"\)\(\{[\s\S]{0,200}reportText: p\.t/.test(payJs), "₹125: रिपोर्ट का पाठ order के साथ नहीं, भुगतान पक्का होने पर ही भेजा जाता है");
ok(!/\d+ \* 86400000/.test(payJs) && (payJs.match(/pendDrop\(/g) || []).length === 2 && /if \(d\.ok && d\.saved !== false\) \{ pendDrop\(p\.o\); cb\(null\); \}/.test(payJs) && !/not-paid/.test(payJs), "फ़ोन में रखी रिपोर्ट अपने-आप सिर्फ़ तब मिटती है जब server \"सेव हो गई\" कहे; समय देखकर या \"भुगतान नहीं हुआ\" सुनकर कभी नहीं");
ok(/तीन बातें बताता है/.test(eng) && /उम्र-वर्ग/.test(eng) && /पहले आ चुके प्रश्नों के नंबर/.test(eng), "शुरुआती कार्ड पर server को जाने वाली तीनों बातें लिखी हैं");
ok(/ऊपर के सेक्टर परीक्षा के दौरान रिकॉर्ड में रहते हैं/.test(eng) && (eng.match(/सेक्टर-समूहों के नाम/g) || []).length >= 3 && !/इन तीनों को सेव नहीं करता/.test(eng) && /your top sectors do stay in the record/.test(rd("assets/apt_session_en.js")) && !/does not save these three/.test(rd("assets/apt_session_en.js")), "शुरुआती कार्ड (हिंदी और English) सच बताता है: ऊपर के सेक्टर परीक्षा के दौरान सेक्टर-समूहों के नाम के रूप में server के रिकॉर्ड में रहते हैं");
ok(["आपके खाते की पहचान", "परीक्षा की भाषा", "बैज या ₹100", "order-नंबर", "बेतरतीब नंबर", "समय-सीमाएँ", "दिए गए प्रश्नों के नंबर", "कितनी परीक्षाएँ शुरू और पूरी कीं", "48 घंटे बाद", "भुगतान का रिकॉर्ड"].every(function (k) { return eng.indexOf(k) >= 0; }) && !/सिर्फ़ दिए जा चुके प्रश्नों की सूची/.test(eng), "शुरुआती कार्ड बताता है कि server परीक्षा के दौरान सचमुच क्या-क्या रखता है, कब मिटाता है, और भुगतान का रिकॉर्ड अलग रहता है");

console.log("8. नई भाषाएँ (भाषा-सूची की LIVE पंक्ति)");
var LANGS = require("./lib_apt_langs.js"), NEWL = LANGS.LIVE.filter(function (c) { return c !== "hi" && c !== "en"; });
var aroot = path.join(ROOT, "generator/data/aptitude");
var bankDirs = fs.readdirSync(aroot).filter(function (d) { return fs.existsSync(path.join(aroot, d, "bank")) || fs.existsSync(path.join(aroot, d, "_stamp")); });
ok(bankDirs.length === 0 && !ex("generator/data/aptitude/session_subset.json"), "किसी भी भाषा के भंडार का स्रोत-पाठ, मुहर या सूची repo में नहीं: " + bankDirs.join(","));
var shardLike = [];
fs.readdirSync(path.join(ROOT, "assets")).forEach(function (n) { if (/\.js$/.test(n) && /APT_EN\s*=\s*window\.APT_EN/.test(fs.readFileSync(path.join(ROOT, "assets", n), "utf8"))) shardLike.push(n); });
ok(shardLike.length === 0, "assets की किसी फ़ाइल में किसी भाषा का प्रश्न-टुकड़ा नहीं: " + shardLike.join(","));
ok(!ex("generator/apt_lang_bank.js") && !ex("generator/build_apt_bank.js"), "भंडार के औज़ार repo में नहीं (वे server-पैकेज में रहते हैं)");
ok(/function UN\(name, n\)/.test(code) && (code.match(/UN\(p\.u\.name, p\.u\.n\)/g) || []).length === 3 && /UDN_URL \? \[UDN_URL\] : \[\]/.test(code) && !/@sets/.test(code), "इंजन: नतीजे की तीनों जगह उद्यम का नाम भाषा की तालिका से; repo के टुकड़ों का पता नहीं");
ok(/function AX\(svg\)/.test(prevJs) && (prevJs.match(/AX\(ART\[/g) || []).length === 3 && !/[^(]ART\[[a-z.]+\] \+ "<\/div>"/.test(prevJs), "झलक-इंजन: तीनों जगह चित्र के भीतर का हिंदी अक्षर इस भाषा के अक्षर से बदला जाता है");
var HL = LANGS.hreflangLines().join("\n");
function hlOf(f) { return (rd(f).match(/<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g) || []).join("\n"); }
var hlBad = ["aptitude-test.html", "en/aptitude-test.html"].concat(NEWL.map(function (c) { return c + "/aptitude-test.html"; })).filter(function (f) { return !ex(f) || hlOf(f) !== HL; });
ok(hlBad.length === 0, "हिंदी, English और हर नई भाषा के परीक्षा-पन्ने पर भाषा-कड़ियाँ रजिस्टर के बराबर (" + LANGS.hreflangLines().length + " पंक्तियाँ): " + hlBad.join(","));
var testPages = fs.readdirSync(ROOT).filter(function (d) { return /^[a-z]{2,3}$/.test(d) && ex(d + "/aptitude-test.html"); }).sort();
ok(testPages.join() === LANGS.LIVE.filter(function (c) { return c !== "hi"; }).sort().join(), "परीक्षा-पन्ने ठीक उन्हीं भाषाओं के हैं जो LIVE सूची में हैं: " + testPages.join(","));
NEWL.forEach(function (c) {
  var r2 = cp.spawnSync(process.execPath, [path.join(__dirname, "build_apt_lang.js"), c, "--check"], { encoding: "utf8" });
  ok(r2.status === 0 && /दोष 0/.test(r2.stdout || "") && /4 फ़ाइलें ताज़ा/.test(r2.stdout || ""), c + ": चारों फ़ाइलें यंत्र से ताज़ा हैं: " + ((r2.stdout || "").split("\n").filter(function (l) { return /⛔|🏁/.test(l); })[0] || "").slice(0, 110));
  var pg = ex(c + "/aptitude-test.html") ? rd(c + "/aptitude-test.html") : "";
  ok(pg.indexOf('window.APT_LANG="' + c + '"') > 0 && pg.indexOf("/assets/apt_" + c + ".js") > 0 && pg.indexOf("/assets/apt_session_" + c + ".js") > 0 && pg.indexOf('<html lang="' + c + '"') >= 0, c + ": पन्ने पर भाषा का निशान और उसी भाषा की दोनों तालिकाएँ");
  var sx = {}; try { var w3 = { APT_SX: {} }; vm.runInNewContext(rd("assets/apt_session_" + c + ".js"), { window: w3 }); sx = w3.APT_SX[c] || {}; } catch (e3) {}
  var hiKeys = Object.keys(sx).filter(function (k) { return k.charAt(0) !== "@"; });
  var devLeak = LANGS.L[c].script === "Deva" ? [] : hiKeys.filter(function (k) { return /[\u0900-\u0963\u0966-\u097F]/.test(sx[k]); });
  ok(hiKeys.length > 100 && devLeak.length === 0 && sx["@udyam"] === "/assets/apt_udyam_" + c + ".js" && !sx["@sets"], c + ": वाक्यांश-तालिका में " + hiKeys.length + " जोड़े, हिंदी का रिसाव 0, उद्यम-नामों का पता दर्ज");
  var un = {}; try { var w4 = {}; vm.runInNewContext(rd("assets/apt_udyam_" + c + ".js"), { window: w4 }); un = (w4.APT_UDN && w4.APT_UDN.lang === c && w4.APT_UDN.n) || {}; } catch (e4) {}
  ok(Object.keys(un).length === 951, c + ": उद्यमों के नाम 951: " + Object.keys(un).length);
  var cz = ex(c + "/career.html") ? rd(c + "/career.html") : "";
  ok(cz.split('href="/' + c + '/aptitude-test.html#apt-full"').length - 1 === 3 && cz.indexOf('href="/aptitude-test.html#apt-full"') < 0, c + ": करियर-पन्ने की तीनों \"पूरी परीक्षा\" कड़ियाँ इसी भाषा की परीक्षा पर");
  ok(rd("sitemap-core.xml").indexOf("https://acslearn.com/" + c + "/aptitude-test.html") > 0, c + ": परीक्षा-पन्ना sitemap में है");
});

console.log((fail ? "⛔ " : "🏁 ") + "पहरेदार जाँच: पास " + pass + " · फेल " + fail);
process.exit(fail ? 1 : 0);
