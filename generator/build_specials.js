/* ============================================================
   build_specials.js — one-off विशेष पेजों का generator (परत-4)
   v1.2 · 20-Jul-2026 (नींव-दौर: aptitude-test पन्ने में पूरा-टेस्ट session-द्वार + apt-session.js)\n   v1.1 · 20-Jul-2026 (काम-12: + /aptitude-test.html — अभिरुचि-टेस्ट मुफ़्त-झलक)
   v1.0 · 18-Jul-2026 (काम-9+; + रिज़्यूमे-फ़ोटो: device-local canvas-resize)
   ------------------------------------------------------------
   लोहे का नियम: कोई पेज हाथ से न बने — सिर्फ़ यह script।
   स्रोत: /_TEMPLATE.html (परत-2 — root मास्टर टेम्पलेट, home वाला universal
          ढाँचा: navbar + slide-menu(10) + footer + login + मूल-भाषा-टैग)।
   पहला पेज: /career-kit.html (करियर-किट tool)। असेट: /assets/career-kit.css,
             /assets/career-kit.js (परत-1 साझा)।
   चलाना: repo-रूट से → node generator/build_specials.js
   check-robot: दिखने वाले content में square bracket नहीं · font<16px नहीं।
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

/* ---- मास्टर टेम्पलेट का 10-menu (links.js से — एकमात्र घर) ---- */
function loadMenu() {
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं पढ़ा गया");
  return box.__L.menu;
}
const MENU_HTML = loadMenu().map(m =>
  '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>"
).join("\n");
const MENU_FALLBACK_JS =
  '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr' + 'ipt>';
const GEN_NOTE = "<!-- ⚠️ generator से बना (build_specials.js v1.1) — हाथ से न बदलें। स्रोत: _TEMPLATE.html + अपने-अपने assets -->";

/* ---- check-robot ---- */
function visibleText(html) {
  return html.replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function check(name, content) {
  const vis = visibleText(content), holes = [];
  if (/[\[\]]/.test(vis)) holes.push("square bracket दिखने वाले text में");
  const small = content.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || [];
  small.forEach(m => { const n = parseInt(m.match(/([0-9]{1,2})/)[1], 10); if (n < 16) holes.push("font " + n + "px"); });
  if (holes.length) throw new Error("❌ " + name + " check-robot fail: " + holes.join(" · "));
}

/* ---- वर्ग-6 भाषा-फ़िल्टर (सख़्त) — सिर्फ़ langStrict पेजों पर ----
   फेल लाइन पर पेज बनता ही नहीं; कोई लाइन कभी हटाई/बदली नहीं जाती। */
const LANG_OK = ["लूर","ACS","Razorpay","OTP","escrow","QR","PDF","GST","CIN","WhatsApp","Green","Tick","RM","ZM","HQ","ISO","DPDP","UNCITRAL","POCSO","POSH","Firebase","Firestore"];
const LANG_HARD = {"प्रावधान":"नियम","अधिनियम":"कानून","तत्पश्चात":"उसके बाद","यथाशीघ्र":"जल्दी","उपरोक्त":"ऊपर बताई","निम्नलिखित":"नीचे दी","सुनिश्चित":"पक्का","अनुपालन":"पालन","व्यपगत":"ख़त्म","देय":"चुकाना","प्रतिपूर्ति":"वापसी","अध्यधीन":"के अधीन","तदनुसार":"उसी तरह","प्रयोजन":"मक़सद","समादेश":"आदेश"};
function langLines(html) {
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<script[\s\S]*?<\/script>/g, " ")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<\/(p|li|h1|h2|h3|h4|h5|div|section|summary|b|label|td|th)>/g, "\n")
    .replace(/<[^>]+>/g, " ")
    .split("\n").map(s => s.replace(/\s+/g, " ").trim()).filter(Boolean);
}
function langLineHoles(line) {
  const holes = [], words = line.split(/\s+/).filter(Boolean);
  line.split(/[।?!]/).forEach(s => { const w = s.trim().split(/\s+/).filter(Boolean); if (w.length > 20) holes.push("लंबा वाक्य (" + w.length + " शब्द)"); });
  (line.match(/[A-Za-z][A-Za-z.\-]{1,}/g) || []).forEach(r => {
    if (LANG_OK.includes(r)) return;
    const inB = new RegExp("\\([^)]*" + r.replace(/[.\-]/g, "\\$&") + "[^)]*\\)").test(line);
    if (!inB) holes.push("नंगा अंग्रेज़ी शब्द '" + r + "' (देवनागरी पहले, फिर गोल कोष्ठक में)");
  });
  Object.keys(LANG_HARD).forEach(h => { if (line.includes(h)) holes.push("भारी शब्द '" + h + "' → '" + LANG_HARD[h] + "'"); });
  if ((line.match(/।/g) || []).length >= 2 || words.length > 30) holes.push("एक लाइन में बहुत बातें — अलग करो");
  return holes;
}
function langCheckStrict(name, html) {
  const fails = [];
  langLines(html).forEach(l => { const h = langLineHoles(l); if (h.length) fails.push("   • “" + l + "”\n     → " + h.join("\n     → ")); });
  if (fails.length) throw new Error("❌ " + name + " वर्ग-6 भाषा-फ़िल्टर fail (इन लाइनों को आसान करो):\n" + fails.join("\n"));
}

/* ---- एक विशेष पेज बनाना ---- */
function buildSpecial(spec) {
  check(spec.out, spec.content);
  if (spec.langStrict) langCheckStrict(spec.out, spec.content);
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं मिले");
  let page = TPL.slice(0, a + S.length) + "\n" + spec.content + "\n" + TPL.slice(b);
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + spec.title + "</title>\n" +
    '<meta name="description" content="' + spec.desc + '">\n' +
    '<meta name="robots" content="index, follow">\n' +
    '<link rel="canonical" href="https://acslearn.com/' + spec.out + '">');
  spec.head.forEach(h => { page = page.replace("</head>", h + "\n</head>"); });
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + "\n" + spec.foot.join("\n") + "\n</body>");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  fs.writeFileSync(path.join(ROOT, spec.out), page, "utf8");
  console.log("✅ विशेष पेज → /" + spec.out);
}

/* ===================== career-kit content ===================== */
const CAREER_CONTENT =
'<h1 style="font-size:26px;margin:14px 0 6px">💼 करियर-किट (Career Kit)</h1>' +
'<p class="ck-lead">नौकरी की तैयारी के तीन औज़ार — एक ही जगह, बिलकुल मुफ़्त। सब कुछ आपके अपने फ़ोन में सुरक्षित रहता है (कोई server पर नहीं जाता — आपकी निजता सुरक्षित)।</p>' +
'<div class="ck-tabs">' +
'<button id="ck-tab-resume" class="on" onclick="ckShow(\'resume\')">📄 रिज़्यूमे बनाएँ</button>' +
'<button id="ck-tab-prep" onclick="ckShow(\'prep\')">🎤 इंटरव्यू-तैयारी</button>' +
'<button id="ck-tab-mock" onclick="ckShow(\'mock\')">🧑‍💼 मॉक-अभ्यास</button>' +
'</div>' +

'<section id="ck-sec-resume"><div class="ck-card"><h2>📄 अपना रिज़्यूमे बनाएँ</h2>' +
'<p>नीचे अपनी जानकारी भरें और "रिज़्यूमे बनाएँ" दबाएँ — साफ़-सुथरा एक-पन्ने का रिज़्यूमे बनेगा, जिसे आप प्रिंट या PDF के रूप में सहेज सकते हैं।</p>' +
'<label>फ़ोटो (पासपोर्ट-आकार, वैकल्पिक)</label>' +
'<input id="ck_photo" type="file" accept="image/*" onchange="ckPickPhoto(this)">' +
'<div id="ck-photo-prev"></div>' +
'<div class="ck-note">📸 साफ़ पासपोर्ट-आकार फ़ोटो चुनें (सिर्फ़ चेहरा, सादा पृष्ठभूमि)। यह फ़ोटो आपके फ़ोन में ही रहती है — कहीं नहीं भेजी जाती। रिज़्यूमे में यह ऊपर-दाएँ छपेगी।</div>' +
'<div class="ck-row"><div><label>पूरा नाम</label><input id="ck_name" placeholder="जैसे: रामबालक कुमार"></div>' +
'<div><label>मोबाइल नंबर</label><input id="ck_phone" placeholder="जैसे: 98XXXXXXXX"></div></div>' +
'<div class="ck-row"><div><label>ईमेल (हो तो)</label><input id="ck_email" placeholder="जैसे: name@gmail.com"></div>' +
'<div><label>शहर / जिला · राज्य</label><input id="ck_place" placeholder="जैसे: चौथम, खगड़िया · बिहार"></div></div>' +
'<label>उद्देश्य (एक-दो पंक्ति में — आप कौन-सा काम चाहते हैं)</label>' +
'<textarea id="ck_obj" placeholder="जैसे: मैं एक मेहनती वेल्डर हूँ और किसी अच्छी कंपनी या वर्कशॉप में अपना हुनर दिखाना चाहता हूँ।"></textarea>' +
'<label>हुनर / लूर (कॉमा से अलग करें)</label>' +
'<input id="ck_skills" placeholder="जैसे: आर्क वेल्डिंग, गैस-कटिंग, माप-पढ़ाई, सुरक्षा-नियम">' +
'<label>शिक्षा</label><textarea id="ck_edu" placeholder="जैसे: मैट्रिक (10वीं) — 2022 · ITI (वेल्डर) — 2024"></textarea>' +
'<label>प्रशिक्षण व प्रमाण पत्र (ACS वाले भी लिखें)</label>' +
'<textarea id="ck_cert" placeholder="जैसे: ACS वेल्डिंग-कोर्स (Aptitude व प्रशिक्षण-पूर्णता प्रमाण पत्र)"></textarea>' +
'<label>कार्य-अनुभव (हो तो)</label>' +
'<textarea id="ck_exp" placeholder="जैसे: गाँव की वर्कशॉप में 1 साल सहायक-वेल्डर का काम — गेट, ग्रिल व मरम्मत।"></textarea>' +
'<div class="ck-row"><div><label>भाषाएँ</label><input id="ck_lang" placeholder="जैसे: हिंदी, भोजपुरी, थोड़ी अंग्रेज़ी"></div>' +
'<div><label>रुचि (वैकल्पिक)</label><input id="ck_hobby" placeholder="जैसे: नई मशीन सीखना"></div></div>' +
'<div style="margin-top:14px"><button class="ck-btn green" onclick="ckMake()">📄 रिज़्यूमे बनाएँ / प्रिंट करें</button>' +
'<button class="ck-btn ghost" onclick="ckSave()">💾 सहेजें (इसी फ़ोन में)</button>' +
'<button class="ck-btn ghost" onclick="ckClear()">🗑️ मिटाएँ</button></div>' +
'<div class="ck-safe">💡 सुझाव: रिज़्यूमे एक पन्ने में रखें, सच लिखें, फ़ोन नंबर सही डालें। झूठा अनुभव कभी न लिखें — इंटरव्यू में पकड़ में आ जाता है।</div>' +
'</div></section>' +

'<section id="ck-sec-prep" class="ck-hide"><div class="ck-card"><h2>🎤 इंटरव्यू की तैयारी</h2>' +
'<p>नीचे आम सवाल और उनके जवाब देने का ढंग दिया है। हर सवाल खोलकर पढ़ें और अपने शब्दों में जवाब सोचें।</p>' +
'<div class="ck-note">🌟 जवाब देने का सरल तरीक़ा (चार क़दम): स्थिति बताओ → काम क्या था → आपने क्या कार्रवाई की → क्या नतीजा निकला। हमेशा एक छोटा असली उदाहरण दें।</div>' +
'<div class="ck-sub">सामान्य सवाल</div>' +
'<details><summary>अपने बारे में बताइए।</summary><p>अपना नाम, कहाँ से हैं, कौन-सा हुनर सीखा और क्या काम करना चाहते हैं — चार-पाँच वाक्य में। रटी हुई बात नहीं, सहज बोलें।</p></details>' +
'<details><summary>आप यही काम क्यों करना चाहते हैं?</summary><p>बताएँ कि इस काम में आपकी रुचि क्यों है और आपने इसके लिए क्या सीखा या मेहनत की। ईमानदारी से बोलें।</p></details>' +
'<details><summary>आपकी सबसे बड़ी ताक़त क्या है?</summary><p>एक असली ताक़त चुनें (जैसे मेहनत, समय की पाबंदी, जल्दी सीखना) और उसका एक छोटा उदाहरण दें।</p></details>' +
'<details><summary>आपकी कमज़ोरी क्या है?</summary><p>छोटी-सी सच्ची कमज़ोरी बताएँ और यह भी कि आप उसे सुधारने के लिए क्या कर रहे हैं। "कोई कमज़ोरी नहीं" कभी न कहें।</p></details>' +
'<details><summary>पाँच साल बाद ख़ुद को कहाँ देखते हैं?</summary><p>बताएँ कि आप अपने हुनर में और आगे बढ़ना चाहते हैं — जैसे कुशल कर्मी से प्रधान कर्मी, या आगे अपना काम शुरू करना।</p></details>' +
'<div class="ck-sub">हुनर वाले सवाल</div>' +
'<details><summary>अपने हुनर के बारे में बताइए।</summary><p>कौन-सा काम आप अच्छे से कर लेते हैं, कौन-कौन से औज़ार या मशीन चला लेते हैं, और कितने समय से कर रहे हैं।</p></details>' +
'<details><summary>कोई मुश्किल काम जो आपने पूरा किया?</summary><p>एक असली घटना बताएँ — क्या मुश्किल थी, आपने कैसे हल किया, और नतीजा क्या रहा।</p></details>' +
'<details><summary>सुरक्षा-नियम कैसे मानते हैं?</summary><p>बताएँ कि आप दस्ताने, चश्मा, जूते जैसी सुरक्षा हमेशा पहनते हैं और मशीन के नियम मानते हैं — मालिक को यह सुनकर भरोसा होता है।</p></details>' +
'<div class="ck-sub">व्यवहार वाले सवाल</div>' +
'<details><summary>टीम में मतभेद हो तो कैसे सुलझाते हैं?</summary><p>बताएँ कि आप शांति से बात करते हैं, दूसरे की भी सुनते हैं, और काम रुकने नहीं देते।</p></details>' +
'<details><summary>दबाव या जल्दी में कैसे काम करते हैं?</summary><p>बताएँ कि आप घबराते नहीं, पहले ज़रूरी काम करते हैं और सुरक्षा नहीं छोड़ते।</p></details>' +
'<div class="ck-safe">✅ करें: साफ़ कपड़े पहनें · समय से पहले पहुँचें · आँख मिलाकर धीरे-साफ़ बोलें · अंत में आप भी एक सवाल पूछें · जाते समय धन्यवाद कहें।<br>❌ न करें: झूठ न बोलें · मोबाइल बंद रखें · पुरानी जगह की बुराई न करें · घबराकर चुप न हों।</div>' +
'</div></section>' +

'<section id="ck-sec-mock" class="ck-hide"><div class="ck-card"><h2>🧑‍💼 मॉक-इंटरव्यू अभ्यास</h2>' +
'<p>यह अपने-आप अभ्यास है — एक सवाल आता है, आप ज़ोर से जवाब बोलकर अभ्यास करें, फिर अपनी जाँच-सूची भरें। बार-बार अभ्यास से घबराहट ख़त्म होती है।</p>' +
'<div class="ck-note">ℹ️ अभी यह अभ्यास आपकी अपनी जाँच के लिए है। आवाज़ या वीडियो-रिकॉर्डिंग और AI-आधारित जाँच (आपका जवाब कैसा रहा) अगले दौर में जुड़ेगी।</div>' +
'<label>श्रेणी चुनें</label>' +
'<select id="ck_cat"><option value="gen">सामान्य</option><option value="skill">हुनर वाले</option><option value="behav">व्यवहार वाले</option></select>' +
'<div style="margin-top:12px"><button class="ck-btn green" onclick="ckNext()">▶️ सवाल शुरू करें / अगला सवाल</button>' +
'<button class="ck-btn gold" onclick="ckSpeak()">🔊 सवाल सुनो</button></div>' +
'<div id="ck-area" class="ck-hide"><div class="ck-qbox" id="ck-q">—</div>' +
'<div class="ck-timer">⏱️ समय: <span id="ck-t">60</span> सेकंड</div>' +
'<div class="ck-safe" style="margin-top:12px"><b>बोलने के बाद अपनी जाँच करें:</b>' +
'<ul><li>क्या मैंने एक असली उदाहरण दिया?</li><li>क्या मैं साफ़ और धीरे बोला?</li>' +
'<li>क्या मैं समय के अंदर रहा?</li><li>क्या मैंने आत्मविश्वास से बात की?</li></ul></div></div>' +
'</div></section>';

buildSpecial({
  out: "career-kit.html",
  title: "करियर-किट (Career Kit) — रिज़्यूमे · इंटरव्यू-तैयारी · मॉक-अभ्यास | ACS",
  desc: "मुफ़्त करियर-किट: अपना रिज़्यूमे बनाएँ, इंटरव्यू की तैयारी करें और मॉक-अभ्यास करें। सब आपके अपने फ़ोन में — कोई server पर नहीं।",
  head: ['<link rel="stylesheet" href="/assets/career-kit.css">'],
  foot: ['<script src="/assets/career-kit.js" defer></scr' + 'ipt>'],
  content: CAREER_CONTENT
});

/* ===================== वापसी-नीति (Refund) ===================== */
const REFUND_CONTENT =
'<div class="lg-wrap">' +
'<h1 class="lg-h1">💰 वापसी-नीति (Refund Policy)</h1>' +
'<p class="lg-lead">ACS से जुड़ना मुफ़्त है।</p>' +
'<p class="lg-lead">पैसा सिर्फ़ तब लगता है, जब आप कोई सेवा लें।</p>' +

'<div class="lg-warn">' +
'<p>भुगतान से पहले यह ज़रूर जान लें।</p>' +
'<p>कुछ सेवाओं में आपका आवेदन एक इंसान जाँचता है।</p>' +
'<p>भुगतान से पहले एक मुफ़्त मशीन-जाँच होती है।</p>' +
'<p>यह जाँच उम्र, दोहराव और ख़ाली फ़ॉर्म देखती है।</p>' +
'<p>जाँच शुरू होने के बाद आवेदन असफल हो, तो 30% जाँच-शुल्क कटता है।</p>' +
'<p>यह दंड नहीं है, बल्कि जाँच में लगी मेहनत की लागत है।</p>' +
'<p>पहली बार असफल होने पर आपको 7 दिन का सुधार-मौक़ा मिलता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>1. वेरिफाइड बैज (Green Tick)</h2>' +
'<p>हमारी तकनीकी गलती से भुगतान हुआ, तो पूरा पैसा वापस।</p>' +
'<p>जाँच शुरू होने से पहले आप ख़ुद रद्द करें, तो 90% वापस।</p>' +
'<p>बाक़ी 10% प्रबंध-ख़र्च है।</p>' +
'<p>जाँच होने के बाद आवेदन असफल हो, तो पहले 7 दिन सुधार का मौक़ा।</p>' +
'<p>फिर भी असफल हो, तो 70% वापस।</p>' +
'<p>बचा हुआ 30% जाँच-शुल्क है।</p>' +
'<p>बैज मिलने के बाद बीच में रद्द करें, तो बचे दिनों का पैसा लौटेगा।</p>' +
'<p>हिसाब सरल है।</p>' +
'<p>पूरी फ़ीस में से 30% घटाओ, फिर बचे दिनों के हिसाब से पैसा लौटाओ।</p>' +
'</div>' +

'<div class="lg-card"><h2>2. अभिरुचि-टेस्ट (Aptitude Test)</h2>' +
'<p>भुगतान के बाद 30 दिन का समय मिलता है।</p>' +
'<p>इसी समय में टेस्ट पूरा करें।</p>' +
'<p>हर हाल में 30% कटता है।</p>' +
'<p>यह बात भुगतान से पहले बता दी जाती है।</p>' +
'<p>नतीजा दिख गया, तो कोई वापसी नहीं।</p>' +
'<p>अंतिम जमा (final submit) से पहले छोड़ा, तो 70% वापस।</p>' +
'<p>इसके लिए शिकायत 24 घंटे में करें।</p>' +
'<p>30 दिन बीत गए, तो कुछ वापस नहीं।</p>' +
'<p>दोबारा टेस्ट देना हो, तो पूरी फ़ीस लगेगी।</p>' +
'</div>' +

'<div class="lg-card"><h2>3. सलाहकार-सलाह (Counselling)</h2>' +
'<p>तय समय से 1 घंटा पहले रद्द करें, तो 90% वापस।</p>' +
'<p>यह दोनों तरफ़ लागू है।</p>' +
'<p>चाहे आप रद्द करें या सलाहकार।</p>' +
'</div>' +

'<div class="lg-card"><h2>4. मृत्यु या आपदा</h2>' +
'<p>विद्यार्थी की मृत्यु या बड़ी आपदा में 75% पैसा वापस।</p>' +
'</div>' +

'<div class="lg-card"><h2>5. औद्योगिक भ्रमण (Tour)</h2>' +
'<p>पैसा एक सुरक्षित-खाते (escrow) में रखा जाता है।</p>' +
'<p>जो ख़र्च हो चुका, वह वापस नहीं होता।</p>' +
'<p>जैसे वीज़ा, टिकट और बुकिंग का पैसा।</p>' +
'<p>बाक़ी बचा पैसा सुरक्षित-खाते से वापस।</p>' +
'</div>' +

'<div class="lg-money">' +
'<p>भारत में वापसी 7 कार्य-दिवस में होती है।</p>' +
'<p>विदेश में वापसी 10 कार्य-दिवस में होती है।</p>' +
'<p>कोई पैसा रोकना पड़े, तो 48 घंटे में सूचना मिलती है।</p>' +
'<p>पैसा अधिकतम 60 दिन तक रुक सकता है।</p>' +
'<p>सभी भुगतान अप्लाइड कंप्यूटर स्कूल को जाते हैं।</p>' +
'<p>भुगतान Razorpay के ज़रिए होता है।</p>' +
'<p>हमेशा आधिकारिक Razorpay लिंक से ही भुगतान करें।</p>' +
'</div>' +

'<p class="lg-updated">आख़िरी बदलाव: 18 जुलाई 2026</p>' +
'<div class="lg-links"><a href="/">🏠 होम</a><a href="/privacy.html">🔒 गोपनीयता</a><a href="/terms.html">📜 शर्तें</a></div>' +
'</div>';

buildSpecial({
  out: "refund.html", langStrict: true,
  title: "वापसी-नीति (Refund Policy) | अप्लाइड कंप्यूटर स्कूल",
  desc: "ACS की वापसी-नीति — बैज, अभिरुचि-टेस्ट, सलाह, भ्रमण की फ़ीस-वापसी के नियम सरल हिंदी में।",
  head: ['<link rel="stylesheet" href="/assets/legal.css">'],
  foot: [],
  content: REFUND_CONTENT
});

/* ===================== गोपनीयता (Privacy) ===================== */
const PRIVACY_CONTENT =
'<div class="lg-wrap">' +
'<h1 class="lg-h1">🔒 गोपनीयता-नीति (Privacy Policy)</h1>' +
'<p class="lg-lead">आपकी जानकारी हमारे लिए ज़रूरी और सुरक्षित है।</p>' +
'<p class="lg-lead">यहाँ साफ़ लिखा है कि हम क्या लेते हैं और क्यों।</p>' +

'<div class="lg-card"><h2>हम क्या जानकारी लेते हैं</h2>' +
'<p>जुड़ते समय हम आपका नाम लेते हैं।</p>' +
'<p>आपका मोबाइल नंबर और ईमेल लेते हैं।</p>' +
'<p>आपका पता और ज़रूरी दस्तावेज़ लेते हैं।</p>' +
'<p>यह सब आपके खाते और सत्यापन के लिए है।</p>' +
'</div>' +

'<div class="lg-card"><h2>हम इसे कहाँ रखते हैं</h2>' +
'<p>आपकी जानकारी सुरक्षित सर्वर पर रखी जाती है।</p>' +
'<p>आपका पासवर्ड और OTP छिपे रूप में रखे जाते हैं।</p>' +
'<p>इन्हें कोई सीधे पढ़ नहीं सकता।</p>' +
'</div>' +

'<div class="lg-card"><h2>क्या आपके फ़ोन में ही रहता है</h2>' +
'<p>आपकी पढ़ाई-प्रगति आपके फ़ोन में ही रहती है।</p>' +
'<p>आपका बनाया रिज़्यूमे भी फ़ोन में ही रहता है।</p>' +
'<p>यह जानकारी कहीं बाहर नहीं भेजी जाती।</p>' +
'</div>' +

'<div class="lg-card"><h2>भुगतान की जानकारी</h2>' +
'<p>भुगतान की जानकारी Razorpay संभालता है।</p>' +
'<p>हम आपका कार्ड-नंबर कभी नहीं रखते।</p>' +
'</div>' +

'<div class="lg-card"><h2>बच्चों की सुरक्षा</h2>' +
'<p>10 से 18 साल के बच्चों को अभिभावक की सहमति चाहिए।</p>' +
'<p>बच्चों की सुरक्षा के कड़े नियम (POCSO) माने जाते हैं।</p>' +
'</div>' +

'<div class="lg-card"><h2>आपके अधिकार</h2>' +
'<p>आप अपनी जानकारी देख सकते हैं।</p>' +
'<p>आप उसे सुधार सकते हैं।</p>' +
'<p>आप उसे मिटाने को कह सकते हैं।</p>' +
'<p>यह अधिकार डेटा-सुरक्षा कानून (DPDP) से मिलते हैं।</p>' +
'</div>' +

'<div class="lg-card"><h2>पेज-गिनती</h2>' +
'<p>हम सिर्फ़ बेनाम पेज-गिनती रखते हैं।</p>' +
'<p>यह गिनती किसी एक व्यक्ति को नहीं पहचानती।</p>' +
'</div>' +

'<div class="lg-card"><h2>संपर्क</h2>' +
'<p>कोई सवाल हो, तो हमें ईमेल करें।</p>' +
'<p>पता और फ़ोन नीचे फुटर में दिया है।</p>' +
'</div>' +

'<p class="lg-updated">आख़िरी बदलाव: 18 जुलाई 2026</p>' +
'<div class="lg-links"><a href="/">🏠 होम</a><a href="/refund.html">💰 वापसी</a><a href="/terms.html">📜 शर्तें</a></div>' +
'</div>';

buildSpecial({
  out: "privacy.html", langStrict: true,
  title: "गोपनीयता-नीति (Privacy Policy) | अप्लाइड कंप्यूटर स्कूल",
  desc: "ACS गोपनीयता-नीति — हम क्या जानकारी लेते हैं, कहाँ रखते हैं और आपके अधिकार क्या हैं, सरल हिंदी में।",
  head: ['<link rel="stylesheet" href="/assets/legal.css">'],
  foot: [],
  content: PRIVACY_CONTENT
});

/* ===================== उपयोग-शर्तें (Terms) ===================== */
const TERMS_CONTENT =
'<div class="lg-wrap">' +
'<h1 class="lg-h1">📜 उपयोग-शर्तें (Terms of Use)</h1>' +
'<p class="lg-lead">ACS का उपयोग करने पर ये शर्तें लागू होती हैं।</p>' +
'<p class="lg-lead">इन्हें आराम से पढ़ें।</p>' +

'<div class="lg-card"><h2>ACS क्या है</h2>' +
'<p>ACS एक शिक्षा-मंच है।</p>' +
'<p>इससे जुड़ना मुफ़्त है।</p>' +
'<p>पैसा सिर्फ़ सेवा लेने पर लगता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>मंच की भूमिका</h2>' +
'<p>ACS एक जोड़ने वाला मंच है।</p>' +
'<p>यह किसी सौदे का पक्ष नहीं है।</p>' +
'<p>सलाहकार, नियोक्ता या विक्रेता (Vendor) से आपका सीधा रिश्ता होता है।</p>' +
'<p>ACS सिर्फ़ भरोसे का पुल बनाता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>भुगतान</h2>' +
'<p>सभी सेवा-शुल्क अप्लाइड कंप्यूटर स्कूल को जाते हैं।</p>' +
'<p>भुगतान Razorpay के ज़रिए होता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>सच्ची जानकारी दें</h2>' +
'<p>हमेशा सच्ची जानकारी दें।</p>' +
'<p>झूठी जानकारी मिलने पर खाता बंद हो सकता है।</p>' +
'</div>' +

'<div class="lg-card"><h2>बैज और प्रमाण पत्र</h2>' +
'<p>बैज और प्रमाण पत्र असली सत्यापन से ही मिलते हैं।</p>' +
'<p>कोई छोटा रास्ता नहीं है।</p>' +
'</div>' +

'<div class="lg-card"><h2>रोक का अधिकार</h2>' +
'<p>नियम टूटने पर हम आपसे जवाब माँगते हैं।</p>' +
'<p>इसके लिए 7 दिन का समय मिलता है।</p>' +
'<p>इसे कारण-बताओ (Show-Cause) कहते हैं।</p>' +
'</div>' +

'<div class="lg-card"><h2>कानून</h2>' +
'<p>भारत में झगड़े पटना उच्च न्यायालय के दायरे में आते हैं।</p>' +
'<p>विदेश के मामलों में अंतरराष्ट्रीय नियम (UNCITRAL) लागू होते हैं।</p>' +
'</div>' +

'<div class="lg-card"><h2>शर्तों में बदलाव</h2>' +
'<p>ये शर्तें आगे बदल सकती हैं।</p>' +
'<p>बदली शर्तें इसी पेज पर दिखेंगी।</p>' +
'</div>' +

'<div class="lg-card"><h2>संपर्क</h2>' +
'<p>कोई सवाल हो, तो हमें ईमेल करें।</p>' +
'<p>पता और फ़ोन नीचे फुटर में दिया है।</p>' +
'</div>' +

'<p class="lg-updated">आख़िरी बदलाव: 18 जुलाई 2026</p>' +
'<div class="lg-links"><a href="/">🏠 होम</a><a href="/refund.html">💰 वापसी</a><a href="/privacy.html">🔒 गोपनीयता</a></div>' +
'</div>';

buildSpecial({
  out: "terms.html", langStrict: true,
  title: "उपयोग-शर्तें (Terms of Use) | अप्लाइड कंप्यूटर स्कूल",
  desc: "ACS उपयोग-शर्तें — मंच की भूमिका, भुगतान, नियम और कानून सरल हिंदी में।",
  head: ['<link rel="stylesheet" href="/assets/legal.css">'],
  foot: [],
  content: TERMS_CONTENT
});

/* ===================== aptitude-test content (काम-12) ===================== */
const APT_CONTENT =
'<div class="apt-wrap">' +
'<h1 style="font-size:26px;margin:14px 0 6px">🧭 अभिरुचि-टेस्ट (Aptitude Test)</h1>' +
'<p class="apt-lead">यह जानने का खेल है कि आपका मन किन कामों में लगता है।</p>' +
'<p>कोई जवाब सही या ग़लत नहीं होता — बस अपनी पसंद बताइए।</p>' +
'<p>यह मुफ़्त झलक है — 24 प्रश्न और बीच में दो कहानियाँ।</p>' +
'<div class="apt-note">🔒 आपके जवाब सिर्फ़ आपके फ़ोन में रहते हैं — कहीं भेजे नहीं जाते।</div>' +
'<div class="apt-note" style="background:var(--gold-bg,#fef3d0);font-weight:700">⚠️ यह डमी/झलक-टेस्ट है — असली पूरे 120-प्रश्न टेस्ट के लिए रजिस्ट्रेशन ज़रूरी है।</div>' +
'<div id="apt-box" class="apt-card"><p>टेस्ट खुल रहा है…</p></div>' +
'<div class="apt-note">📝 नतीजा अभिरुचि की झलक देता है — यह योग्यता का प्रमाण नहीं है।</div>' +
'<h2 style="font-size:24px;margin:22px 0 4px">🧭 पूरा टेस्ट — 120 प्रश्न, 3 खंड</h2>' +
'<p>रजिस्ट्रेशन ज़रूरी है।</p>' +
'<p>बिना बैज (badge): ₹100 में 1 चांस।</p>' +
'<p>बैज (badge) वालों को मुफ़्त — 365 दिन, जितनी बार चाहें।</p>' +
'<p>घड़ी 90 मिनट की है।</p>' +
'<p>पन्ना बंद करें तो घड़ी रुक जाती है।</p>' +
'<p>खंड 1 — आपकी रुचि के समूह।</p>' +
'<p>खंड 2 — उनकी गहराई।</p>' +
'<p>खंड 3 — कोर्स का चुनाव।</p>' +
'<div id="apt-sess-box" class="apt-card"><p>पूरा टेस्ट खुल रहा है…</p></div>' +
'</div>';

buildSpecial({
  out: "aptitude-test.html", langStrict: true,
  title: "अभिरुचि-टेस्ट — मुफ़्त झलक | अप्लाइड कंप्यूटर स्कूल",
  desc: "24 सरल प्रश्न — जानें आपका मन किन कामों में लगता है। मुफ़्त, बिना खाता, जवाब आपके फ़ोन में ही।",
  head: ['<link rel="stylesheet" href="/assets/aptitude-test.css">'],
  foot: [
    '<script src="/assets/mg_names.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude_art.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude_data.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude-test.js" defer></scr' + 'ipt>',
    '<script src="/assets/apt-session.js" defer></scr' + 'ipt>',
    '<script type="module" src="/assets/apt-pay.js"></scr' + 'ipt>'
  ],
  content: APT_CONTENT
});

/* ===================== salah content (काम-अभिरुचि-भुगतान, 22-Jul) =====================
   पहले हाथ से बना था (कोई generator-निशान नहीं) — परत-4 का उल्लंघन था
   (मशीन-ऑडिट से पकड़ा गया)। अब यहीं generator-रास्ते में लाया गया —
   पुराना "जल्द आ रहा है" placeholder हटाकर असली टेस्ट-embed (aptitude-test.html
   जैसा apt-box + apt-sess-box ढाँचा), बाक़ी सब content (career-paths,
   counselors, CTA) हूबहू पुराने salah.html से। */
const SALAH_CONTENT = `    <!-- ════════ सलाह (salah) — बीच का content ════════ -->

<section class="page-hero" style="padding:34px 16px">
  <div class="page-hero-inner">
    <div style="font-size:2.6rem">🧭</div>
    <h1 style="color:var(--navy)">सलाह</h1>
    <p style="color:var(--muted);max-width:640px;margin:6px auto 0">
      सही रास्ता चुनें — अभिरुचि परखें, रास्ते समझें, और काउंसलर (counselor) से बात करें।
    </p>
  </div>
</section>

<!-- ASLI APTITUDE TEST (लाइव) -->
<section class="section-container apt-wrap" style="max-width:760px">
  <div class="notice-card" style="text-align:center">
    <div style="font-size:2.4rem">🧠</div>
    <h2 style="color:var(--navy);margin:6px 0">अभिरुचि परीक्षा (Aptitude Test)</h2>
    <p style="color:var(--muted);margin:0 auto;max-width:600px">
      यह कोई पास/फेल परीक्षा नहीं — सिर्फ़ <b>रुचि</b> जानने का तरीक़ा।
    </p>
    <div class="apt-note">🔒 आपके जवाब सिर्फ़ आपके फ़ोन में रहते हैं — कहीं भेजे नहीं जाते।</div>
    <div class="apt-note" style="background:var(--gold-bg);font-weight:700">⚠️ यह डमी/झलक-टेस्ट है — असली पूरे 120-प्रश्न टेस्ट के लिए रजिस्ट्रेशन ज़रूरी है।</div>
    <div id="apt-box" class="apt-card"><p>टेस्ट खुल रहा है…</p></div>
  </div>
</section>

<section class="section-container apt-wrap" style="max-width:760px;padding-top:0">
  <div class="notice-card" style="text-align:center">
    <h2 style="color:var(--navy);font-size:22px;margin:4px 0">🧭 पूरा टेस्ट — 120 प्रश्न, 3 खंड</h2>
    <p style="color:var(--muted)">रजिस्ट्रेशन ज़रूरी है। बिना बैज (badge): ₹100 में 1 चांस। बैज (badge) वालों को मुफ़्त — 365 दिन, जितनी बार चाहें।</p>
    <div id="apt-sess-box" class="apt-card"><p>पूरा टेस्ट खुल रहा है…</p></div>
  </div>
  <p style="color:var(--muted);font-size:16px;text-align:center;margin-top:10px">
    (आधार: RIASEC अभिरुचि-विज्ञान, 1959 पर आधारित/प्रेरित — यह दिशा भर है, अंतिम फ़ैसला नहीं।)
  </p>
</section>

<!-- CAREER PATHS -->
<section class="section-container" style="max-width:1000px;padding-top:0">
  <div class="section-title-block"><h2 style="color:var(--navy)">🗺️ रास्ते — आपके लिए कौन-सा सही?</h2></div>
  <div class="content-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr))">
    <div class="notice-card"><div style="font-size:1.8rem">🏛️</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">सरकारी नौकरी (Government Job)</div>
      <div style="color:var(--muted)">UPSC, BPSC, Railway, Bank, SSC — स्थिर आय, सुरक्षित भविष्य, पेंशन (pension)।</div></div>
    <div class="notice-card"><div style="font-size:1.8rem">🏢</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">कॉर्पोरेट नौकरी (Corporate Job)</div>
      <div style="color:var(--muted)">IT, Finance, Marketing, HR — तेज़ growth, अच्छी salary।</div></div>
    <div class="notice-card"><div style="font-size:1.8rem">🏪</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">प्राइवेट नौकरी (Private Job)</div>
      <div style="color:var(--muted)">स्थानीय (local) उद्योग, दुकान, कंपनी — तुरंत काम, तुरंत कमाई।</div></div>
    <div class="notice-card"><div style="font-size:1.8rem">💼</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">खुद का व्यवसाय (Own Business)</div>
      <div style="color:var(--muted)">₹0 से शुरू → ₹200 करोड़ तक। L1 से L15 का पूरा रास्ता।</div></div>
    <div class="notice-card"><div style="font-size:1.8rem">🔧</div>
      <div style="font-weight:800;color:var(--navy);font-size:1.1rem">स्वरोजगार (Self-Employment)</div>
      <div style="color:var(--muted)">मरम्मत, सेवा, फ्रीलांस (freelance) — हुनर (lure) से कमाई, लचीला (flexible)।</div></div>
  </div>
</section>

<!-- COUNSELORS -->
<section class="section-container" style="max-width:1000px;padding-top:0">
  <div class="section-title-block"><h2 style="color:var(--navy)">🧭 काउंसलर से मिलें (Meet a Counselor)</h2>
    <p style="color:var(--muted)">हमारे विशेषज्ञ काउंसलर (expert counselors) आपकी मदद के लिए तैयार हैं।</p></div>
  <div class="content-grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
    <div class="notice-card">
      <div style="font-size:2rem">🧑</div>
      <div style="font-weight:800;color:var(--navy)">ACS Founder · मुख्य काउंसलर</div>
      <div style="color:var(--muted);font-size:16px">📍 विद्यार्थीनगर, चौथम, खगड़िया, बिहार</div>
      <div style="margin:8px 0;color:var(--muted)">व्यवसाय (business) · करियर (career) · हिंदी</div>
      <div class="hero-secondary-links" style="justify-content:flex-start">
        <a href="https://wa.me/919431210092" target="_blank" rel="noopener" class="btn btn-primary" style="min-width:auto;padding:10px 16px">💬 WhatsApp</a>
        <a href="tel:+919431210092" class="btn btn-accent" style="min-width:auto;padding:10px 16px">📞 Call</a>
      </div>
    </div>
    <div class="notice-card">
      <div style="font-size:2rem">🏫</div>
      <div style="font-weight:800;color:var(--navy)">ACS Chautham Centre</div>
      <div style="color:var(--muted);font-size:16px">मुख्यालय केंद्र (headquarters center) · ⭐4.8 (318 Reviews)</div>
      <div style="margin:8px 0;color:var(--muted)">सभी कोर्स · सोमवार–शनिवार · सुबह 6 — रात 8</div>
      <div class="hero-secondary-links" style="justify-content:flex-start">
        <a href="https://wa.me/919431210092" target="_blank" rel="noopener" class="btn btn-primary" style="min-width:auto;padding:10px 16px">💬 WhatsApp</a>
        <a href="mailto:acs.chautham@gmail.com" class="btn btn-accent" style="min-width:auto;padding:10px 16px">✉️ Email</a>
      </div>
    </div>
    <div class="notice-card">
      <div style="font-size:2rem">🌐</div>
      <div style="font-weight:800;color:var(--navy)">ऑनलाइन काउंसलिंग (Online Counseling)</div>
      <div style="color:var(--muted);font-size:16px">WhatsApp / Video Call · कहीं से भी, किसी भी समय</div>
      <div style="margin:8px 0;color:var(--muted)">निःशुल्क (free) · ऑनलाइन · 24×7</div>
      <div class="hero-secondary-links" style="justify-content:flex-start">
        <a href="https://wa.me/919431210092?text=नमस्ते, मुझे सलाह चाहिए।" target="_blank" rel="noopener" class="btn btn-gold" style="min-width:auto;padding:10px 16px">🧭 सलाह लें</a>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section-container" style="max-width:760px;padding-top:0;text-align:center">
  <div class="notice-card">
    <h3 style="color:var(--navy);margin:0 0 6px">रास्ता तय करने में मदद चाहिए?</h3>
    <p style="color:var(--muted);margin:0 0 14px">पहले काउंसलर से मुफ़्त बात करें, फिर उद्यम/कोर्स चुनें।</p>
    <div class="hero-secondary-links">
      <a href="/udyam/" class="btn btn-gold">🌍 उद्यम खोजें</a>
      <a href="/courses/hi/" class="btn btn-primary">📚 कोर्स देखें</a>
      <a href="/join.html" class="btn btn-accent">📝 जुड़ें</a>
    </div>
  </div>
</section>
`;

buildSpecial({
  out: "hi/salah.html", langStrict: false,
  title: "सलाह — सही रास्ता चुनें | Applied Computer School™",
  desc: "ACS सलाह — अभिरुचि परखें, 5 करियर रास्ते (सरकारी/कॉर्पोरेट/प्राइवेट नौकरी, व्यवसाय, स्वरोजगार) समझें, और विशेषज्ञ काउंसलर से मुफ़्त बात करें।",
  head: ['<link rel="stylesheet" href="/assets/aptitude-test.css">'],
  foot: [
    '<script src="/assets/mg_names.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude_art.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude_data.js"></scr' + 'ipt>',
    '<script src="/assets/aptitude-test.js" defer></scr' + 'ipt>',
    '<script src="/assets/apt-session.js" defer></scr' + 'ipt>',
    '<script type="module" src="/assets/apt-pay.js"></scr' + 'ipt>'
  ],
  content: SALAH_CONTENT
});
