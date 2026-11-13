/* generator/dev_cert_guard.js : v1.8 (14-Nov-2026) : खेप 3-क का पहरेदार (प्रमाणपत्र); v1.1 में ऑडिट K3A-H01 से H04 की जाँचें
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
var files = ["assets/dashboard.js", "assets/dash_i18n_en.js", "verify/index.html", "refund.html", "courses/hi/welding/wld-626-varkasha-pa-ke-bada-pariksha-ki-raha-dohara-tala.html"];
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
var en = rd("assets/dash_i18n_en.js");
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

console.log("4. server की फ़ाइलें repo में नहीं; service worker");
ok(!has("functions/cert_server.js") && !has("cert_server.js") && !has("assets/cert_server.js"), "cert_server.js repo में नहीं है (वह सिर्फ़ Firebase पर रहती है)");
var mm = rd("sw.js").match(/CACHE_VERSION\s*=\s*['"]v(\d+)['"]/);
ok(mm && Number(mm[1]) >= 851, "service worker v851 या नया: " + (mm ? "v" + mm[1] : "नहीं मिला"));
console.log((fail ? "⛔" : "🏁") + " खेप 3-क का पहरेदार: पास " + pass + " · फेल " + fail);
process.exit(fail ? 1 : 0);
