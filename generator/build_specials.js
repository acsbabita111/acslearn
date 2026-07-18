/* ============================================================
   build_specials.js — one-off विशेष पेजों का generator (परत-4)
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
const GEN_NOTE = "<!-- ⚠️ generator से बना (build_specials.js v1.0) — हाथ से न बदलें। स्रोत: _TEMPLATE.html + assets/career-kit.* -->";

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

/* ---- एक विशेष पेज बनाना ---- */
function buildSpecial(spec) {
  check(spec.out, spec.content);
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
