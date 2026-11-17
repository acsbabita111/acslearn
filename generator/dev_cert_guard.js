/* generator/dev_cert_guard.js : v1.18 (17-Nov-2026; v1.18 बांग्ला ब-1: "।" बांग्ला का अपना पूर्ण-विराम है: dashboard.js की docTr और nameOwn की नई जाँच-पंक्ति, और पैक के साँचों व पक्के वाक्यों की "देवनागरी बची?" जाँच भाषा के हिसाब से (lib_panel_langs.devRe); v1.17 कन्नड़ क-3: प्रमाणपत्र पर कोर्स का नाम पैनल की भाषा में (नाम-तालिका); v1.16 कन्नड़ क-2क-2: अपनी भाषा + English वाला प्रमाणपत्र certTextOwn और काग़ज़ों के साँचे; v1.15 पैनल-4: English प्रमाणपत्र certTextEn पर भी validity और परीक्षा-तिथि के नियम) : खेप 3-क का पहरेदार (प्रमाणपत्र); v1.1 में ऑडिट K3A-H01 से H04 की जाँच
   v1.14 (पैनल-2): dashboard का English अब assets/i18n/panel_en.js में (पुरानी dash_i18n_en.js हटी); वही वाक्य वहीं जाँचे जाते हैं।
   v1.13 (पैनल-1): रजिस्ट्रेशन का संस्करण अब एक ही जगह (expectedRulesVer) से; नियम-परदा सहमति के साथ भाषा भी भेजता है।
   जाँच का अर्थ वही: विद्यार्थी 1.2, बाक़ी 1.1; सहमति में server को संस्करण जाता है।ें
   जाँचता है कि प्रमाणपत्र के नियम (Founder, 13 और 14-Nov-2026) पेज और code में एक जैसे हैं, और पुराने नियम कहीं नहीं बचे।
   चलाना (repo की जड़ से): node generator/dev_cert_guard.js */
"use strict";
var fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
var pass = 0, fail = 0;
function ok(c, m) { if (c) pass++; else { fail++; console.log("  ❌ " + m); } }
function rd(f) { return fs.readFileSync(path.join(ROOT, f), "utf8").replace(/\r\n/g, "\n"); }
function has(f) { return fs.existsSync(path.join(ROOT, f)); }

console.log("1. जाँच वाला पन्ना (/verify/)");
var v = rd("verify/index.html");
ok(/generator|build_specials/.test(v.slice(0, 600)) && /build_specials/.test(v.slice(0, 900)) || /generator-निर्मित|generator/.test(v.slice(0, 400)), "पन्ना यंत्र से बना है (हाथ से नहीं)");
ok(/httpsCallable\(getFunctions\(app, "us-central1"\), "certVerify"\)/.test(v), "जाँच server के certVerify से होती है");
ok(!/firebase-firestore\.js/.test(v) && !/getDoc\(/.test(v) && !/collection\(/.test(v), "पन्ना प्रमाणपत्र का रिकॉर्ड सीधे नहीं पढ़ता (वह रास्ता server के नियमों से बंद है)");
ok(/ऑनलाइन जाँच प्रमाण पत्र जारी होने से 5 साल तक होती है।/.test(v) && /₹1000 देकर जाँच की अवधि 5 साल बढ़ा सकता है।/.test(v) && /1 साल तक की देर पर ₹500 और उससे ज़्यादा देर पर ₹1000।/.test(v) && /हर अनुरोध पर ₹2000/.test(v), "पन्ने पर चारों नियम लिखे हैं: 5 साल, ₹1000, देर का शुल्क, ₹2000");
ok(/इसका फ़ॉर्म इसी पन्ने पर जल्द जुड़ेगा।/.test(v), "₹2000 वाली जाँच का फ़ॉर्म अभी नहीं है, और पन्ना यह साफ़ कहता है (मरा बटन नहीं)");
ok(/get\("cert"\)/.test(v), "QR वाली कड़ी (?cert=) से नंबर अपने-आप भरकर जाँच होती है");
ok(/id="cvPct"/.test(v) && /d\.needPct/.test(v) && /resource-exhausted/.test(v) && /जाँच की गिनती सीमित है।/.test(v), "(K3A-H02) पुराने रूप वाले नंबर के लिए प्रतिशत का खाना है, और सीमा का संदेश पन्ने पर लिखा है");
ok(/यह फ़ीस और देर का शुल्क वापस नहीं होते।/.test(v), "(K3A-H04) जाँच वाले पन्ने पर लिखा है कि विस्तार की फ़ीस वापस नहीं होती");
(function () {
  /* (ऑडिट K3A-H09) "अवधि पूरी" वाला डिब्बा: अकेला "₹1000 देकर" नहीं; ₹1000 के साथ देर का शुल्क लिखा हो। पन्ने और स्रोत, दोनों में। */
  var pairs = [["verify/index.html", v]];
  if (has("generator/build_specials.js")) pairs.push(["generator/build_specials.js", rd("generator/build_specials.js")]);
  pairs.forEach(function (x) {
    var a = x[1].indexOf('d.status === "expired"'), b = x[1].indexOf('data-st="valid"', a), seg = a > 0 && b > a ? x[1].slice(a, b) : "";
    ok(seg.length > 100 && !/₹1000 देकर/.test(seg) && /₹1000 के साथ देर का शुल्क भी लगेगा/.test(seg) && /1 साल तक की देर पर ₹500, उससे ज़्यादा देर पर ₹1000/.test(seg), "(K3A-H09) " + x[0] + ": \"अवधि पूरी\" वाले जवाब में अकेला \"₹1000 देकर\" नहीं; देर का शुल्क साथ लिखा है");
  });
})();
var rf = rd("refund.html");
ok(/2-ब\. प्रमाण पत्र की जाँच-अवधि बढ़ाना/.test(rf) && /यह फ़ीस वापस नहीं होती।/.test(rf) && /देर का शुल्क भी वापस नहीं होता।/.test(rf) && /वह वापसी नहीं, भुगतान का सुधार है।/.test(rf) && /तब बाक़ी रक़म देने पर ही अवधि बढ़ती है।/.test(rf), "(K3A-H04) वापसी-नीति के पेज पर विस्तार की फ़ीस का अलग हिस्सा है: वापस नहीं होती; तकनीकी ग़लती अलग से ठीक होती है");
var sp = has("generator/build_specials.js") ? rd("generator/build_specials.js") : "";
ok(/out: "verify\/index\.html", langStrict: true/.test(sp) && /2-ब\. प्रमाण पत्र की जाँच-अवधि बढ़ाना/.test(sp), "जाँच वाले पन्ने और वापसी-नीति के नए हिस्से का स्रोत build_specials.js में है, कक्षा-6 वाली भाषा-जाँच के साथ");
ok(/\.lg-wrap\{[^}]*background:#F5F7FA/.test(rd("assets/legal.css")), "पेज के शीर्षक के पीछे हल्की पृष्ठभूमि है (पहले शीर्षक दिखता नहीं था)");

console.log("2. dashboard: प्रमाणपत्र का चित्र और बटन");
var d = rd("assets/dashboard.js");
ok(!/की दिनांक 31 जुलाई 2026 को/.test(d) && !/held on 31 July 2026/.test(d), "प्रमाणपत्र पर पक्की लिखी तारीख़ (31 जुलाई 2026) नहीं बची");
ok(/"की दिनांक "\+certDayHi\(c\.examOn\)\+" को आयोजित ऑनलाइन परीक्षा"/.test(d) && /"held on "\+certDayEn\(c\.examOn\)\+", with"/.test(d), "परीक्षा की तिथि सिर्फ़ परीक्षा के रिकॉर्ड से छपती है (हिंदी और English)");
ok(!/examOn\s*\|\|\s*c\.issuedOn/.test(d) && !/examOn\s*\|\|\s*ci\.issuedOn/.test(d), "(K3A-H03) जारी होने की तिथि कहीं भी परीक्षा-तिथि की जगह नहीं ली जाती");
ok(/if\(!ci\.examOn\)\{ alert\("इस प्रमाणपत्र की परीक्षा-तिथि का रिकॉर्ड नहीं मिला/.test(d), "(K3A-H03) परीक्षा-तिथि का रिकॉर्ड न हो, तो प्रमाणपत्र नहीं निकलता और साफ़ संदेश आता है");
ok(/\[\{text:"जारी: "\+certDayNum\(c\.issuedOn\)\+" · online जाँच "\+certDayNum\(c\.validUntil\)\+" तक मान्य",font:/.test(d) && /x\.fillText\("Issued "\+certDayNum\(c\.issuedOn\)\+" · Online verification valid till "\+certDayNum\(c\.validUntil\)\+" \(acslearn\.com\/verify\)",CX,y\);/.test(d), "प्रमाणपत्र पर जारी होने की तिथि और online जाँच की मान्य तिथि छपती है (हिंदी और English)");
(function () {
  /* Founder का आदेश (14-Nov-2026): प्रमाणपत्र पर सिर्फ़ validity; विस्तार की फ़ीस वहाँ नहीं छपती */
  var a = d.indexOf("async function certDraw(c){"), i = d.indexOf("{", a), depth = 0, k = i;
  for (; k < d.length; k++) { if (d[k] === "{") depth++; else if (d[k] === "}") { depth--; if (depth === 0) break; } }
  var body = d.slice(a, k + 1).replace(/\/\*[\s\S]*?\*\//g, "");
  ok(a > 0 && body.length > 3000 && !/विस्तार|extension|₹1000|देर का शुल्क|late fee/i.test(body), "प्रमाणपत्र के चित्र में विस्तार की फ़ीस या देर के शुल्क का कोई ज़िक्र नहीं (सिर्फ़ validity)");
})();
ok(!/5 साल का विस्तार: ₹1000"/.test(d), "प्रमाणपत्र पर अधूरी पंक्ति (सिर्फ़ \"₹1000\") नहीं बची");
(function () {
  /* (पैनल-4, 15-Nov-2026) English प्रमाणपत्र (certTextEn) पर भी वही नियम: सिर्फ़ validity; परीक्षा-तिथि सिर्फ़ परीक्षा के रिकॉर्ड से */
  var a = d.indexOf("async function certTextEn("), b = d.indexOf("\n  }\n", a), body = a > 0 ? d.slice(a, b).replace(/\/\*[\s\S]*?\*\//g, "") : "";
  ok(body.length > 2500 && !/extension|₹1000|late fee|extend/i.test(body), "English प्रमाणपत्र के चित्र में भी विस्तार की फ़ीस या देर के शुल्क का कोई ज़िक्र नहीं");
  /* (पैनल-4 v1.1, ऑडिट की पकड़) रिश्ते की ख़ाली पंक्ति (हर विद्यार्थी पर "S/o ____") और "Accreditations" शब्द English प्रमाणपत्र पर नहीं */
  /* (15-Nov-2026, Founder का फ़ैसला) रिश्ता बताने वाली पंक्ति (S/o, D/o, "पिता ____") कहीं नहीं; उसकी जगह बिना-रिश्ते की रेखा, दोनों रूपों में */
  ok(body.length > 2500 && !/S\/o|D\/o/.test(body) && !/_{4,}/.test(body) && /fitRich\(x, \[\{text:CERT_REL_EN\[gd\.rel\]/.test(body) && /fitRich\(x, \[\{text:"Name:"/.test(body), "English प्रमाणपत्र पर S/o, D/o या ख़ाली रेखा नहीं; नाम और सहेजा हुआ नाम (पिता / माता / अभिभावक) किनारे के भीतर रखने वाले काम (fitRich) से");
  var cd = d.slice(d.indexOf("async function certDraw(c){"), d.indexOf("/* A4-PDF के रूप में देना")).replace(/\/\*[\s\S]*?\*\//g, "");
  ok(cd.length > 3000 && !/"S\/o |"पिता "\+/.test(cd) && !/_{4,}|fatherPh/.test(cd) && /fitRich\(x, \[\{text:CERT_REL_HI\[gd\.rel\]/.test(cd) && /fitRich\(x, \[\{text:"नाम :", font:/.test(cd) && (cd.match(/fitRich\(/g) || []).length === 4, "हिंदी प्रमाणपत्र पर भी \"पिता ____\", \"S/o ____\" या ख़ाली रेखा नहीं; \"नाम :\" और सहेजा हुआ नाम (पिता / माता / अभिभावक), चारों पंक्तियाँ fitRich से");
  /* (15-Nov-2026, Founder का आदेश) प्रमाणपत्र निकालने से पहले नाम पूछना: तीन में से एक बिंदु; नाम server में एक बार सहेजा जाता है */
  ok(/if\(!CERT_GUARD\)\{ const g=await certGuardAsk\(\); if\(!g\) return; \}\s*certDraw\(Object\.assign\(\{\},c0,\{examOn:ci\.examOn,issuedOn:ci\.issuedOn,validUntil:ci\.validUntil,guardian:CERT_GUARD\}\)\);/.test(d), "प्रमाणपत्र तभी निकलता है जब नाम सहेजा हो: पहले पूछना (certGuardAsk), रद्द हो तो कुछ नहीं; certDraw को वही सहेजा नाम जाता है");
  var ga = d.indexOf("function certGuardAsk(){"), gb = d.indexOf("\n  }\n", ga), gq = ga > 0 ? d.slice(ga, gb) : "";
  ok(gq.length > 3000 && (gq.match(/row\("(father|mother|guardian)",/g) || []).join() === 'row("father",,row("mother",,row("guardian",' && /type="radio" name="cgRel"/.test(gq) && (gq.match(/httpsCallable\(functions,"certGuardianSave"\)/g) || []).length === 1 && /CERT_GUARD=\{rel:g\.rel, name:String\(g\.name\)\};/.test(gq) && !/CERT_GUARD=\{rel:pick/.test(gq), "नाम पूछने वाला डिब्बा: पिता, माता, अभिभावक के तीन बिंदु एक ही समूह में; सहेजना सिर्फ़ server के certGuardianSave से; छपने वाला नाम वही जो server ने लौटाया");
  ok(/हमेशा के लिए सहेजा जाएगा/.test(gq) && /नहीं बदल सकेंगे/.test(gq) && /हमेशा के लिए सहेज लिया गया/.test(gq), "डिब्बे में चेतावनी (हमेशा के लिए सहेजा जाएगा; बाद में नहीं बदलेगा) और सहेजने के बाद की सूचना");
  ok(!/setDoc|updateDoc|addDoc/.test(gq) && !/certGuardians/.test(d), "browser से यह नाम सीधे नहीं लिखा जाता (certGuardians का नाम dashboard.js में कहीं नहीं)");
  ok(body.length > 2500 && !/accredit/i.test(body) && /x\.fillText\("Institutional Details",CX,y\+8\)/.test(body), "English प्रमाणपत्र पर \"Accreditations\" शब्द नहीं; शीर्षक \"Institutional Details\"");
  ok(/"held on "\+certDayEn\(c\.examOn\)\+", with"/.test(body) && !/issuedOn[^\n]*held on/.test(body) && /"Issued "\+certDayNum\(c\.issuedOn\)\+" · Online verification valid till "\+certDayNum\(c\.validUntil\)\+" \(acslearn\.com\/verify\)"/.test(body), "English प्रमाणपत्र पर भी परीक्षा-तिथि परीक्षा के रिकॉर्ड से, और जारी/मान्य तिथि server से");
})();
ok(/यह फ़ीस और देर का शुल्क वापस नहीं होते। तकनीकी ग़लती से पैसा दो बार या ग़लत कट जाए, तो वह अलग से ठीक किया जाता है।/.test(d) && /acslearn\.com\/refund\.html/.test(d) && d.indexOf("const NOREF=") < d.indexOf('httpsCallable(functions,"certExtendOrder")'), "(K3A-H04) भुगतान से पहले लिखा दिखता है कि विस्तार की फ़ीस वापस नहीं होती");
ok(/v\.applied===false/.test(d) && /ci\.extend\.due/.test(d) && /और देने होंगे/.test(d), "(K3A-H01) फ़ीस बढ़ गई हो तो dashboard बाक़ी रक़म बताता और माँगता है");
(function () {
  var i1 = d.indexOf('httpsCallable(functions,"certExtendOrder")'), i2 = d.indexOf('Number(od.amount)!==Number(ci.extend.due) || String(od.newValid)!==String(ci.extend.newValid)'), i3 = d.indexOf("if(!confirm(m2))"), i4 = d.indexOf("new window.Razorpay", i1);
  ok(i1 > 0 && i2 > i1 && i3 > i2 && i4 > i3, "(K3A-H07) server की रक़म या तिथि पहले दिखाई गई से अलग हो, तो भुगतान की खिड़की खुलने से पहले दोबारा पूछा जाता है");
})();
(function () {
  var a = d.indexOf("function devToRoman(s){"), b = d.indexOf("\n  }", a) + 4, o;
  try { o = new Function(d.slice(a, b) + '\nreturn ["मोहम्मद इरफ़ान अंसारी","संजय सिंह","ज़ैनब ख़ातून","चाँदनी","Ram Kumar"].map(devToRoman).join("|");')(); } catch (e) { o = String(e); }
  ok(o === "Mohammad Irafan Ansari|Sanjay Singh|Zainab Khatun|Chandani|Ram Kumar", "प्रमाणपत्र पर English नाम में नुक़्ता और अनुस्वार ठीक बदलते हैं: " + o);
})();
ok(/httpsCallable\(functions,"certList"\)/.test(d) && /httpsCallable\(functions,"certExtendOrder"\)/.test(d) && /httpsCallable\(functions,"certExtendVerify"\)/.test(d), "तिथियाँ और विस्तार server से: certList, certExtendOrder, certExtendVerify");
ok(/if\(!ci\)\{ alert\("प्रमाणपत्र की तिथियाँ server से नहीं मिलीं/.test(d), "server से तिथियाँ न मिलें तो प्रमाणपत्र बिना तिथि के नहीं छपता");
ok(/if\(ci\.status==="expired"\)\{ alert\(/.test(d) && /data-certext=/.test(d), "मान्य तिथि निकलने पर Download नहीं, \"5 साल बढ़ाएँ\" बटन");
(function () {
  var m = d.match(/function certDayNum\(s\)\{[^\n]*\n\s*function certDayHi\(s\)\{[^\n]*\n\s*function certDayEn\(s\)\{[^\n]*/), a = d.match(/const CERT_MHI=\[[^\]]*\];\s*\n\s*const CERT_MEN=\[[^\]]*\];/);
  var o = null; try { o = new Function(a[0] + "\n" + m[0] + "\nreturn [certDayNum('2031-11-12'), certDayHi('2026-11-04'), certDayEn('2026-02-28'), certDayNum('')];")(); } catch (e) { o = [String(e)]; }
  ok(o.join("|") === "12.11.2031|4 नवंबर 2026|28 February 2026|—", "तिथि लिखने वाले तीनों काम सही रूप देते हैं: " + o.join(" | "));
})();

console.log("3. पुराने नियम कहीं नहीं बचे");
var OLD = ["Lifetime valid", "duplicate 500", "verify 3 साल मुफ़्त", "3 साल free", "lifetime valid, 3 साल"];
var files = ["assets/dashboard.js", "assets/i18n/panel_en.js", "verify/index.html", "refund.html", "courses/hi/welding/wld-626-varkasha-pa-ke-bada-pariksha-ki-raha-dohara-tala.html"];
["generator/build_dashboards.js", "generator/data/welding_lessons_data.js", "generator/build_specials.js"].forEach(function (f) { if (has(f)) files.push(f); });
fs.readdirSync(path.join(ROOT, "dashboard"), { withFileTypes: true }).forEach(function (e) { if (e.isDirectory() && has("dashboard/" + e.name + "/index.html")) files.push("dashboard/" + e.name + "/index.html"); });
var left = []; files.forEach(function (f) { var s = rd(f); OLD.forEach(function (o) { if (s.indexOf(o) >= 0) left.push(f + " : " + o); }); });
ok(left.length === 0, "\"आजीवन मान्य\", \"3 साल मुफ़्त\", \"दूसरी प्रति 500\" वाले वाक्य " + files.length + " फ़ाइलों में कहीं नहीं" + (left.length ? " | बचे: " + left.slice(0, 4).join("; ") : ""));
var NEW = "online जाँच जारी होने से 5 साल तक; 1000 रुपये देकर 5 साल और बढ़ती है (मान्य तिथि निकलने के बाद देर का शुल्क अलग से)। मान्य अवधि में प्रमाण पत्र मुफ़्त निकलता है।";
ok(["student", "jobseeker"].every(function (r) { return rd("dashboard/" + r + "/index.html").indexOf(NEW) >= 0; }), "विद्यार्थी और नौकरी-इच्छुक के dashboard के \"मेरे प्रमाण पत्र\" पैनल में नया नियम लिखा है");
ok(rd("dashboard/entrepreneur/index.html").indexOf("online जाँच जारी होने से 5 साल तक; 1000 रुपये में 5 साल और (मान्य तिथि के बाद देर का शुल्क अलग से)।") >= 0, "उद्यमी के dashboard की परीक्षा वाली पंक्ति में भी नया नियम लिखा है");
(function () {
  /* (ऑडिट K3A-H09) जहाँ भी "1000 रुपये" में 5 साल बढ़ने की बात लिखी है, उसी वाक्य में देर के शुल्क का ज़िक्र हो */
  var bad = [];
  ["student", "jobseeker", "entrepreneur"].forEach(function (r) {
    var t = rd("dashboard/" + r + "/index.html").replace(/<[^>]+>/g, " ");
    (t.match(/[^।]*1000 रुपये[^।]*।/g) || []).forEach(function (s) { if (/5 साल और/.test(s) && !/देर का शुल्क/.test(s)) bad.push(r + ": " + s.trim().slice(0, 60)); });
  });
  ok(bad.length === 0, "(K3A-H09) dashboard में \"1000 रुपये में 5 साल\" वाला हर वाक्य देर के शुल्क का ज़िक्र करता है" + (bad.length ? " | " + bad.join("; ") : ""));
})();
ok(!has("generator/build_dashboards.js") || rd("generator/build_dashboards.js").indexOf(NEW) >= 0, "dashboard के यंत्र का स्रोत भी वही कहता है");
var en = rd("assets/i18n/panel_en.js");   /* (पैनल-2) dashboard का English अब पैनल-पैक में */
ok(en.indexOf(NEW) >= 0 && /Online verification runs for 5 years from the issue date; 1000 rupees adds 5 more years \(after the valid-till date a late fee is added\)\./.test(en), "English तालिका में नया वाक्य और उसका English, दोनों हैं");

console.log("3-ख. App Check (ऑडिट K3A-H08)");
ok(/<script src="\/assets\/appcheck-config\.js"><\/script>/.test(v) && /firebase-app-check\.js/.test(v) && /initializeAppCheck\(app, \{ provider: new ReCaptchaEnterpriseProvider\(AC_KEY\), isTokenAutoRefreshEnabled: true \}\)/.test(v), "जाँच वाला पन्ना App Check चालू करता है (reCAPTCHA Enterprise; key /assets/appcheck-config.js से)");
ok(v.indexOf("initializeAppCheck(app") > 0 && v.indexOf("initializeAppCheck(app") < v.indexOf("httpsCallable(getFunctions(app"), "App Check server को बुलाने से पहले चालू होता है");
ok(/if \(!AC_KEY\) \{ box\(/.test(v) && /data-st="appcheck"/.test(v), "key ख़ाली हो तो पन्ना server को नहीं बुलाता; App Check फेल हो तो साफ़ संदेश");
var acf = rd("assets/appcheck-config.js"), mk = acf.match(/^window\.ACS_APPCHECK_SITE_KEY = "([^"]*)";$/m);
ok(!!mk && (acf.match(/ACS_APPCHECK_SITE_KEY\s*=/g) || []).length === 1, "key की फ़ाइल (assets/appcheck-config.js) का रूप सही है: एक ही पंक्ति");
if (process.argv.indexOf("--live") >= 0) ok(!!mk && /^[0-9A-Za-z_-]{30,60}$/.test(mk[1]), "(--live) site key भरी हुई है");
else console.log("   सूचना: site key " + (mk && mk[1] ? "भरी हुई है" : "ख़ाली है (zip में ऐसी ही आती है)। चढ़ाने से पहले SET-APPCHECK-KEY.bat चलानी होती है; CHADHAO.bat इसी पहरेदार को --live के साथ चलाता है, जो ख़ाली key पर फेल होता है।"));

console.log("3-ग. करियर टेस्ट की सहेजी हुई रिपोर्ट की जाँच (खेप 3-ख भाग 1)");
ok(/data-st="report"/.test(v) && /यह रिपोर्ट ACS के रिकॉर्ड में इसी रूप में सहेजी गई है।/.test(v) && /ये सेक्टर विद्यार्थी के फ़ोन पर निकले थे; ACS ने रिपोर्ट इसी रूप में सहेजी है।/.test(v) && /यह रुझान की रिपोर्ट है, योग्यता का प्रमाण नहीं।/.test(v), "जाँच वाला पन्ना रिपोर्ट का नतीजा दिखाता है, और साफ़ कहता है कि क्या जाँचा गया और क्या नहीं");
ok(/data-st="expired-report"/.test(v) && /रिपोर्ट की ऑनलाइन जाँच सहेजने से 5 साल तक ही होती है।/.test(v), "रिपोर्ट की अवधि पूरी होने का अलग संदेश है (इसमें विस्तार की बात नहीं)");
ok(/करियर टेस्ट की सहेजी हुई रिपोर्ट की ऑनलाइन जाँच सहेजने से 5 साल तक होती है।/.test(v) && /रिपोर्ट के सेक्टर विद्यार्थी के फ़ोन पर निकलते हैं।/.test(v), "पन्ने पर रिपोर्ट की जाँच का नियम लिखा है");
ok(/httpsCallable\(functions, "reportNumber"\)/.test(d) && /id="apt-old-no"/.test(d) && /"https:\/\/acslearn\.com\/verify\/\?cert=" \+ encodeURIComponent\(rn\.reportNo\)/.test(d), "dashboard सहेजी हुई रिपोर्ट का जाँच-नंबर server से लेता है, दिखाता है और छपाई में QR लगाता है");
(function () {
  var ps = rd("assets/apt-pay.js"), ss = rd("assets/apt-session.js");
  ok(/reportNumber: function \(cb\)/.test(ps) && /httpsCallable\(functions, "reportNumber"\)/.test(ps) && /window\.ACS_APT_PAY\.reportNumber\(function \(err, d\)/.test(ss) && /el\.id = 'apt-report-no'/.test(ss), "परीक्षा के बाद वाला परदा भी सहेजी हुई रिपोर्ट के नीचे जाँच-नंबर और मान्य तिथि दिखाता है");
})();

console.log("3-घ. ₹125 की फ़ीस वापस नहीं होती (खेप 4 भाग 1; Founder का फ़ैसला 1-अ)");
(function () {
  var a = rf.indexOf("2-ग. प्रमाण पत्र और करियर रिपोर्ट की फ़ीस (₹125)"), b = rf.indexOf("</div>", a), seg = a > 0 ? rf.slice(a, b) : "";
  ok(seg.length > 100 && /यह फ़ीस वापस नहीं होती।/.test(seg) && /वह वापसी नहीं, भुगतान का सुधार है।/.test(seg) && /यह बात भुगतान से पहले परदे पर लिखी दिखती है।/.test(seg), "वापसी-नीति में ₹125 का हिस्सा (2-ग) है: वापस नहीं; तकनीकी ग़लती = भुगतान का सुधार");
  /* (ऑडिट: खेप 4 भाग 1 v1.0 का NO-GO) हिस्सा 4 साफ़ कहे कि 75% वाला नियम किन फ़ीसों पर लागू नहीं है */
  var a4 = rf.indexOf("<h2>4. मृत्यु या आपदा</h2>"), b4 = rf.indexOf("</div>", a4), s4 = a4 > 0 ? rf.slice(a4, b4) : "";
  ok(s4.length > 100 && /चल रही सेवा की फ़ीस का 75% वापस होता है।/.test(s4) && /यह नियम नीचे लिखी फ़ीसों पर लागू नहीं है।/.test(s4) && /₹100 का परीक्षा-चांस।/.test(s4) && /₹125 की फ़ीस: प्रमाण पत्र और करियर रिपोर्ट।/.test(s4) && /अवधि बढ़ाने की फ़ीस और देर का शुल्क।/.test(s4) && !/बड़ी आपदा में 75% पैसा वापस।/.test(rf), "वापसी-नीति का हिस्सा 4: 75% सिर्फ़ चल रही सेवा पर; ₹100, ₹125, विस्तार और देर के शुल्क पर लागू नहीं (पुराना बिना दायरे वाला वाक्य नहीं बचा)");
  var i1 = d.indexOf('const CERT_NOREF="प्रमाण पत्र की फ़ीस ₹125 है।'), i2 = d.indexOf("if(!confirm(CERT_NOREF)) return;"), i3 = d.indexOf('httpsCallable(functions,"createCourseCertOrder")');
  ok(i1 > 0 && i2 > i1 && i3 > i2 && /यह फ़ीस वापस नहीं होती।/.test(d.slice(i1, i2)), "dashboard: प्रमाण पत्र के ₹125 का order बनने से पहले पूछा और बताया जाता है कि फ़ीस वापस नहीं होती");
  var ss = rd("assets/apt-session.js"), j1 = ss.indexOf("₹125 की यह फ़ीस वापस नहीं होती।"), j2 = ss.indexOf('id="apt-report-save-btn"');
  ok(j1 > 0 && j2 > j1, "करियर टेस्ट का परदा: रिपोर्ट सेव करने के बटन से पहले लिखा है कि ₹125 की फ़ीस वापस नहीं होती");
  var hq = rd("rules-consent-hq-examination.html");
  ok(!/lifetime-valid/.test(hq) && !/duplicate\/verify/.test(hq) && /online जाँच की अवधि \(जारी होने से 5 साल\)/.test(hq), "परीक्षा-प्रमुख के नियम-पत्र में \"lifetime-valid\" और \"duplicate\" वाली पुरानी पंक्ति नहीं; 5 साल वाला नियम लिखा है");
})();

console.log("3-ङ. विद्यार्थी का नियम-पत्र संस्करण 1.2 और दोबारा सहमति (खेप 4 भाग 2; Founder का फ़ैसला 2-ब)");
(function () {
  var hi = rd("rules-consent-learner.html");
  ok(/<b>Version: 1\.2<\/b> · प्रभावी तिथि: 14 नवम्बर 2026/.test(hi) && !/Version: 1\.1/.test(hi), "हिंदी नियम-पत्र: संस्करण 1.2, प्रभावी तिथि 14 नवम्बर 2026");
  var f6 = (hi.match(/<span id="ruleFeeX">([^<]*)<\/span>/) || [])[1] || "", f7 = (hi.match(/<span id="ruleRefundX">([^<]*)<\/span>/) || [])[1] || "";
  ok(/वरना ₹100 प्रति परीक्षा/.test(f6) && /भुगतान से 30 दिन तक/.test(f6) && /अधिकतम 2/.test(f6) && /परीक्षा पास होने पर ₹125/.test(f6) && /₹1000 देकर 5 साल और/.test(f6) && /1 साल तक की देर पर ₹500, उससे ज़्यादा पर ₹1000/.test(f6), "नियम 6 में नई फ़ीसें लिखी हैं: परीक्षा ₹100, प्रमाण पत्र ₹125, विस्तार ₹1000 और देर का शुल्क");
  ok(/₹100 का चांस वापस नहीं होता, सिवाय ACS की तकनीकी ग़लती के/.test(f7) && /देर का शुल्क वापस नहीं होते/.test(f7) && /भुगतान का सुधार/.test(f7) && /मृत्यु\/आपदा वाला 75% सिर्फ़ चल रही सेवा/.test(f7) && /acslearn\.com\/refund\.html/.test(f7), "नियम 7 में वापसी के नए नियम लिखे हैं, और मृत्यु/आपदा वाले 75% का दायरा भी");
  var bad = [];
  ["en", "zh", "es", "ar", "fr", "bn", "pt", "ru", "id", "ur", "de", "ja", "mr", "te"].forEach(function (c) {
    var h = rd(c + "/rules-consent-learner.html"), x6 = (h.match(/<span id="ruleFeeX">([\s\S]*?)<\/span>\S/) || [])[1] || "", x7 = (h.match(/<span id="ruleRefundX">([\s\S]*?)<\/span><\/label>/) || [])[1] || "";
    var t6 = x6.replace(/<[^>]+>/g, ""), t7 = x7.replace(/<[^>]+>/g, "");
    if (!(/1\.2(<\/bdi>)?<\/b>/.test(h) && !/1\.1(<\/bdi>)?<\/b>/.test(h) && /₹100/.test(t6) && /₹125/.test(t6) && /₹1000/.test(t6) && /₹500/.test(t6) && /₹100/.test(t7) && /₹125/.test(t7) && /75/.test(t7) && /acslearn\.com\/refund\.html/.test(t7))) bad.push(c);
    if (c !== "en" && /Final online exam of a course|is not refunded/.test(t6 + t7)) bad.push(c + " (English बचा)");
  });
  ok(bad.length === 0, "English और 13 भाषाओं के नियम-पत्र: संस्करण 1.2, और नियम 6 तथा 7 के नए हिस्से सब रक़मों के साथ" + (bad.length ? " | दोष: " + bad.join(", ") : ""));
  var jn = rd("join.html");
  ok(/function expectedRulesVer\(\)\{ return isLearnerRomanOnly\(\) \? '1\.2' : '1\.1'; \}/.test(jn) && jn.indexOf("consent_rules_version: (isLearnerRomanOnly() ? expectedRulesVer() : (rulesShownVer || expectedRulesVer())),") > -1 && jn.indexOf("rulesShownLang = rulesLang; rulesShownVer = hv;") > -1, "रजिस्ट्रेशन-फ़ॉर्म विद्यार्थी के लिए संस्करण 1.2 भेजता है (बाक़ी भूमिकाओं के लिए उसी भूमिका के हिंदी नियम-पत्र की संख्या; पैनल-5)");
  /* (v1.1) दोबारा सहमति अनिवार्य: एक साझा परदा, तीन जगह से बुलाया जाता है; server पर भी वही जाँच */
  var rg = rd("assets/rules-gate.js");
  ok(/export function rulesGate\(o\)/.test(rg) && /o\.httpsCallable\(o\.functions, "rulesStatus"\)/.test(rg) && /o\.httpsCallable\(o\.functions, "rulesAccept"\)/.test(rg) && /okb\.disabled = !chk\.checked/.test(rg) && /accept\(\{ version: st\.current, language: readLang \}\)/.test(rg) && /id="rulesGateRetry"/.test(rg), "साझा परदा (assets/rules-gate.js): server से पूछता है; निशान लगाए बिना बटन बंद; सहमति server को जाती है; जवाब न मिले तो भी परदा (दोबारा कोशिश)");
  ok(/import\("\/assets\/rules-gate\.js"\)/.test(d) && d.indexOf("if(noGate) rulesGate();") > 0 && !/id="rulesGateChk"/.test(d), "dashboard: विद्यार्थी का घर खुलते ही साझा परदा बुलाया जाता है (अपना अलग परदा नहीं)");
  var lg = rd("dashboard/index.html"), l1 = lg.indexOf("async function finishLogin("), l2 = lg.indexOf('if(["student","jobseeker","entrepreneur"].indexOf(role)>-1){', l1), l3 = lg.indexOf('await import("/assets/rules-gate.js")', l2), l4 = lg.indexOf('show("c5")', l3), l5 = lg.indexOf("location.href = url", l4);
  ok(l1 > 0 && l2 > l1 && l3 > l2 && l4 > l3 && l5 > l4, "login का पन्ना: विद्यार्थी के लिए नियम-पत्र की जाँच dashboard पर भेजने से पहले होती है");
  var ap = rd("assets/apt-pay.js");
  /* (ऑडिट: v1.1 का NO-GO) परदे की फ़ाइल न लदे, तो आगे का काम नहीं चलना चाहिए */
  ok(!/function \(\) \{ then\(\); \}, function \(\) \{ then\(\); \}/.test(ap) && /\.then\(function \(\) \{ then\(\); \}, function \(\) \{ rulesBlock\(then\); \}\)/.test(ap) && /id="rulesBlockRetry"/.test(ap) && (ap.match(/then\(\);/g) || []).length === 1, "करियर टेस्ट का पन्ना: परदे की फ़ाइल न लदे, तो आगे का काम नहीं चलता; पन्ना ढककर \"दोबारा कोशिश\" दिखता है (then सिर्फ़ सफल होने पर)");
  ok(/if \(user\) \{ rulesFirst\(function \(\) \{ gate\(false\); retryPending\(\); \}\); \}/.test(ap) && /e\.details\.code === "rules"/.test(ap) && /import\("\/assets\/rules-gate\.js"/.test(ap), "करियर टेस्ट का पन्ना: login होते ही नियम-पत्र की जाँच; server \"rules\" कहकर रोके, तो परदा");
})();

console.log("4. server की फ़ाइलें repo में नहीं; service worker");
ok(!has("functions/cert_server.js") && !has("cert_server.js") && !has("assets/cert_server.js"), "cert_server.js repo में नहीं है (वह सिर्फ़ Firebase पर रहती है)");
console.log("3-च. अपनी भाषा + English वाला प्रमाणपत्र और काग़ज़ों के साँचे (कन्नड़ क-2क-2; Founder का फ़ैसला 16-Nov-2026)");
(function () {
  var DEVR = /[ऀ-ॿ]/, strip = function (t) { return t.replace(/\/\*[\s\S]*?\*\//g, ""); };
  var a = d.indexOf("  async function certTextOwn("), b = d.indexOf("\n  }\n", a), body = a > 0 ? strip(d.slice(a, b)) : "";
  ok(body.length > 4000 && !DEVR.test(body), "certTextOwn के कोड में देवनागरी का कोई पक्का वाक्य नहीं (हर वाक्य पैक से आता है)");
  ok(body.length > 4000 && !/extension|₹1000|late fee|extend|S\/o|D\/o|accredit/i.test(body) && !/_{4,}/.test(body), "इस प्रमाणपत्र पर भी: विस्तार की फ़ीस, देर का शुल्क, S/o, D/o, ख़ाली रेखा या \"Accreditations\" नहीं");
  ok(/docFill\(S\.C\.cert_issued,\{issued:certDayNum\(c\.issuedOn\), valid:certDayNum\(c\.validUntil\)\}\)/.test(body) && /"Issued "\+certDayNum\(c\.issuedOn\)\+" · Online verification valid till "\+certDayNum\(c\.validUntil\)\+" \(acslearn\.com\/verify\)"/.test(body) &&
     /certDayOwn\(S,c\.examOn\)/.test(body) && /"held on "\+certDayEn\(c\.examOn\)\+", with"/.test(body), "जारी होने की तिथि, मान्य तिथि और परीक्षा-तिथि: तीनों रिकॉर्ड से, दोनों भाषाओं की पंक्तियों में");
  ok((body.match(/fitRich\(/g) || []).length === 4 && /\{text:S\.rel\[gd\.rel\]/.test(body) && /\{text:CERT_REL_EN\[gd\.rel\]/.test(body) && /certGuardEn\(gd\.name\)/.test(body), "नाम और सहेजा हुआ नाम (पिता / माता / अभिभावक): चारों पंक्तियाँ किनारे के भीतर रखने वाले काम (fitRich) से; देवनागरी में सहेजा नाम रोमन में");
  ok(body.length > 4000 && (body.match(/gd\.name/g) || []).length === (body.match(/certGuardEn\(gd\.name\)/g) || []).length && (body.match(/c\.name\b/g) || []).length === (body.match(/certNameOwn\(c\.name\)|certNameEn\(c\.name\)/g) || []).length && /function certNameOwn\(nm\)\{ nm=String\(nm\|\|""\)\.trim\(\); return \/\[ऀ-ॿ\]\/\.test\(nm\) \? certNameEn\(nm\) : nm; \}/.test(d),
     "नाम कभी सीधे नहीं छपते: विद्यार्थी का नाम certNameOwn या certNameEn से, सहेजा हुआ नाम certGuardEn से (देवनागरी में लिखा नाम रोमन में छपता है)");
  ok(/const OWN=certOwn\(\);\s*if\(OWN\)\{ await certOwnDraw\(x, c, W, H, OWN\); \} else if\(docEn\(\)\)\{ await certTextEn\(x, c, W\); \} else \{/.test(d), "certDraw: पैनल की भाषा के काग़ज़ बने हों तो वह भाषा + English; वरना English पैनल में English; वरना हिंदी + English (पहले जैसा)");
  var oa = d.indexOf("  function certOwn(){"), ob = d.indexOf("\n  }\n", oa), own = oa > 0 ? d.slice(oa, ob) : "";
  ok(own.length > 800 && /const C=docOwn\(\); if\(!C\) return null;/.test(own) && /for\(const k of \["trust","title","certify","name","wish","certno","scan","sign","trustee","slogan","office"\]\) if\(!S\[k\]\) return null;/.test(own) && /S\.months\.some\(function\(m\)\{ return !m; \}\)\) return null;/.test(own),
     "एक भी पक्का वाक्य उस भाषा में न मिले, तो आधा अनूदित प्रमाणपत्र नहीं बनता (certOwn कुछ नहीं लौटाता; तब सिर्फ़ English)");
  ok(/function docTr\(hi\)\{ try\{ const t=window\.ACS_PANEL_I18N\.tr\(hi\); return \(t && t!==hi && !\/\[\\u0900-\\u0963\\u0966-\\u097F\]\/\.test\(t\)\) \? t : ""; \}catch\(e\)\{ return ""; \} \}/.test(d), "docTr: अनुवाद में देवनागरी बचे या अनुवाद न मिले, तो \"\" (वह वाक्य नहीं छपता)");
  /* साँचों की कुंजियाँ: dashboard.js का DOC_KEYS = पैक-मशीन का DOC_SPEC */
  var mk = /const DOC_KEYS=(\[[^\]]*\]);/.exec(d), bp = rd("generator/build_panel_i18n.js"), sa = bp.indexOf("const DOC_SPEC={"), sb = bp.indexOf("};", sa);
  var keys = mk ? JSON.parse(mk[1]) : [], spec = sa > 0 ? (bp.slice(sa, sb).match(/^\s*([a-z_]+):/gm) || []).map(function (x) { return x.replace(/[\s:]/g, ""); }) : [];
  ok(keys.length === 6 && keys.slice().sort().join() === spec.slice().sort().join(), "काग़ज़ों के साँचों की कुंजियाँ dashboard.js और पैक-मशीन में एक ही हैं (" + keys.length + ")");
  /* हर पैक: English में "C" नहीं; जिस पैक में "C" है, उसमें सब कुंजियाँ, {खाने} पूरे, देवनागरी शून्य */
  var dir = "assets/i18n", bad = [], withC = [];
  fs.readdirSync(path.join(ROOT, dir)).filter(function (f) { return /^panel_[a-z]+\.js$/.test(f); }).forEach(function (f) {
    var w = {}; new Function("window", rd(dir + "/" + f))(w); var L = f.slice(6, -3), pk = (w.ACS_PANEL_PACKS || {})[L] || {}, C = pk.C;
    if (L === "en") { if (C) bad.push("English पैक में C है"); return; }
    if (!C) return; withC.push(L);
    var DVL = require("./lib_panel_langs.js").devRe(L);   /* (v1.18) "।" जिन लिपियों का अपना पूर्ण-विराम है (बांग्ला ...), उनमें वह देवनागरी नहीं गिना जाता; बाक़ी में पहले जैसा */
    keys.forEach(function (k) { if (typeof C[k] !== "string" || !C[k].trim() || DVL.test(C[k])) bad.push(L + "." + k); });
    if (!/\{course\}/.test(C.cert_sentence || "") || !/\{date\}/.test(C.cert_sentence || "") || !/\{pct\}/.test(C.cert_sentence || "")) bad.push(L + ": वाक्य के {खाने}");
    if (!/\{issued\}/.test(C.cert_issued || "") || !/\{valid\}/.test(C.cert_issued || "")) bad.push(L + ": जारी-पंक्ति के {खाने}");
    if (!/\{no\}/.test(C.report_valid || "") || !/\{date\}/.test(C.report_valid || "") || !/\{no\}/.test(C.report_expired || "") || !/\{date\}/.test(C.report_expired || "")) bad.push(L + ": रिपोर्ट-पंक्ति के {खाने}");
    if (!/^[A-Za-z0-9 ]+$/.test(C.font || "") || !/^[A-Za-z0-9+]+$/.test(C.gfam || "")) bad.push(L + ": font");
    ["अप्लाइड कंप्यूटर स्कूल™", "फ़्रीडम फ़ाइटर गंगाधर प्रसाद मेमोरियल ट्रस्ट", "ऑनलाइन कोर्स-पूर्णता प्रमाणपत्र", "प्रमाणित किया जाता है कि", "नाम :", "पिता का नाम :", "माता का नाम :", "अभिभावक का नाम :", "हम इनके उज्ज्वल भविष्य की कामना करते हैं।", "प्रमाणपत्र नं / Certificate No", "स्कैन कर सत्यापित करें", "प्राधिकृत हस्ताक्षर", "प्रधान ट्रस्टी, FFGPMT", "130 भाषा में, गाँव से ग्लोबल साउथ तक!",
      "मुख्यालय / Head Office: ACS Building, Vidyarthi Nagar, Karua-Javahartola Road, Chautham, Khagaria, Bihar - 851201", "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"].forEach(function (h) {
      var t = (pk.D || {})[h]; if (typeof t !== "string" || !t.trim() || DVL.test(t)) bad.push(L + ": पैक में \"" + h + "\" का अनुवाद नहीं"); });
    if ((pk.D || {})["अप्लाइड कंप्यूटर स्कूल™"] !== "Applied Computer School™") bad.push(L + ": brand का नाम रोमन में नहीं");
  });
  ok(bad.length === 0, "हर भाषा-पैक: English में साँचे नहीं; जिस पैक में साँचे हैं (" + (withC.join(", ") || "कोई नहीं") + "), उसमें सब कुंजियाँ, {खाने}, font और प्रमाणपत्र के सब पक्के वाक्य; brand रोमन में" + (bad.length ? " :: " + bad.slice(0, 5).join(" | ") : ""));
  ok(withC.indexOf("kn") > -1, "कन्नड़ पैक में काग़ज़ों के साँचे हैं (Founder का फ़ैसला: कन्नड़ उपयोगकर्ता का प्रमाणपत्र कन्नड़ + English में)");
  /* करियर रिपोर्ट की जाँच-पंक्ति: पन्ने पर, छपाई में और WhatsApp के संदेश में पैनल की अपनी भाषा में */
  ok(/const ownLine = function \(\) \{ const C = rn \? docOwn\(\) : null; return C \? docFill\(rn\.status === "expired" \? C\.report_expired : C\.report_valid, \{ no: rn\.reportNo, date: dn\(rn\.validUntil\) \}\) : ""; \};/.test(d) &&
     /if \(oL\) \{ sp\.setAttribute\("data-tr-" \+ oLang, oL\); wa\.setAttribute\("data-href-" \+ oLang, "https:\/\/wa\.me\/\?text=" \+ encodeURIComponent\(\(d\.reportText \|\| ""\) \+ "\\n" \+ oL\)\); \}/.test(d) &&
     /if \(rn\) \{ ownSync\(\); document\.addEventListener\("acs-panel-lang", ownSync\); \}/.test(d) &&
     /const w = window\.open\("", "_blank"\), o2 = ownLine\(\);/.test(d) && /esc\(o2 \? \(d\.reportText \|\| ""\) \+ "\\n" \+ o2 : \(docEn\(\) \? fullEn : full\)\)/.test(d),
     "करियर रिपोर्ट की जाँच-पंक्ति पैनल की अपनी भाषा में: पन्ने पर और WhatsApp के संदेश में (ownSync: पहली बार और हर भाषा-बदलाव पर), और छपाई में; साँचे न हों, तो पहले जैसा");
})();
console.log("3-छ. प्रमाणपत्र पर कोर्स का नाम पैनल की भाषा में (कन्नड़ क-3; Founder: \"कन्नड मे सब कुछ कन्नड मे ही हो\")");
(function () {
  var strip = function (t) { return t.replace(/\/\*[\s\S]*?\*\//g, ""); };
  var a = d.indexOf("  async function certTextOwn("), b = d.indexOf("\n  }\n", a), body = a > 0 ? strip(d.slice(a, b)) : "";
  ok(/if\(t==="\{course\}"\) segs\.push\(\{text:nameOwn\(crs\), font:navyB/.test(body), "अपनी भाषा के वाक्य में कोर्स का नाम नाम-तालिका से (nameOwn)");
  ok(/\{text:"has passed the online examination for", font:eng, color:"#4a5a70"\},\s*\{text:crs, font:engB/.test(body), "नीचे की English पंक्ति में कोर्स का English नाम ही (crs)");
  ok(/function nameOwn\(en\)\{ try\{ const P=window\.ACS_PANEL_I18N; if\(en && P && P\.active && typeof P\.name==="function"\)\{ const t=P\.name\(String\(en\)\); if\(t && !\/\[\\u0900-\\u0963\\u0966-\\u097F\]\/\.test\(t\)\) return t; \} \}catch\(e\)\{\} return en; \}/.test(d), "nameOwn: तालिका में नाम न हो, इंजन पुराना हो या नाम में देवनागरी निकले, तो वही English नाम (प्रमाणपत्र कभी ख़ाली या हिंदी नाम से नहीं)");
  var e = rd("assets/panel_i18n.js");
  ok(/function nameOwn\(en\)\{ var r; en=String\(en\); if\(!ACTIVE\|\|CUR==="en"\|\|!NM\|\|!en\) return en; r=nameFind\(en,0\); return r===null\?en:r; \}/.test(e), "इंजन: English पैनल और हिंदी में नाम वैसा ही; तालिका में न मिले तो English नाम");
  ok(/if\(\/\[A-Za-z\]\/\.test\(part\)\)\{ part=nameFind\(part, depth\+1\); if\(part===null\)\{ ok=false; break; \} \}/.test(e), "इंजन: साँचे का कोई हिस्सा तालिका में न हो, तो पूरा नाम English में (आधा अनुवाद नहीं)");
  var bp = rd("generator/build_panel_i18n.js");
  ok(/cert_issued:\s+\[\["issued","valid"\], "", true\]/.test(bp), "पैक बनाने वाला: \"जारी\" वाले साँचे में रोमन \"online\" ज़रूरी नहीं (कन्नड़ लिपि में लिखा जा सकता है)");
})();
var mm = rd("sw.js").match(/CACHE_VERSION\s*=\s*['"]v(\d+)['"]/);
ok(mm && Number(mm[1]) >= 853, "service worker v853 या नया: " + (mm ? "v" + mm[1] : "नहीं मिला"));
console.log((fail ? "⛔" : "🏁") + " खेप 3-क का पहरेदार: पास " + pass + " · फेल " + fail);
process.exit(fail ? 1 : 0);
