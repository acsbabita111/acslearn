/* sudhar_courses_khoj.js v1.0 · 24-Nov-2026 : कोर्स-सूची पन्ने (courses/hi/index.html) के भाषा-टैब में नई भाषा-खोज जोड़ता है।
   Founder (24-Nov-2026): "भाषा का सर्च बॉक्स ... सर्च नहीं हो रहा ... आदमी अपने जरूरत का भाषा खोजते समय खो जाता है ...
   12-13 साल का बच्चा पहला लेसन को खोज नहीं पाता ... चाइल्ड मनोविज्ञान के हिसाब से भी कोडिंग ... इन्टरफेस पर भी काम"।
   क्या बदलता है (सिर्फ़ ये जगहें; बाक़ी पन्ना byte-अछूता):
     1. /assets/bhasha_khoj_data.js और /assets/bhasha-khoj.js बुलाना (courses_data.js के ठीक बाद)।
     2. खोज-डिब्बा: बड़ा, सवाल वाला label, मिटाने का ✕, नतीजे डिब्बे के ठीक नीचे (#bhKhojOut)।
     3. भाषा-गिनती वाला वाक्य data से (पहले लिखा था "130 भाषाएँ। 135 का पूरा कोर्स", data में 417 हैं)।
        ऊपर का बड़ा "130" (title, hero, meta) Founder के फ़ैसले तक अछूता।
     4. "🌍 सब 130" बटन → data की गिनती।
     5. भाषा-कार्ड की कड़ी के आख़िर में #shuru: कोर्स-पन्ना (assets/kkb2.js v3.4) सीधे अगला अधूरा दिन खोलता है।
     6. "अपनी भाषा चुनो" और "दूसरी भाषा सीखनी है" बटन: भाषा-टैब खोलकर खोज-डिब्बे पर।
     7. पुराने होल: टैब-पट्टी (top:52px) नए मेन्यू (~83px) के अक्षर ढकती थी → असली ऊँचाई से; init() दो बार चलता था (DOMContentLoaded + सीधा) → अब एक बार; scroll पर हर बार त्रुटि (scrollTop बटन पन्ने पर नहीं) → रुकी।
   चलाना: node generator/sudhar_courses_khoj.js   (दोबारा चलाने पर: सिर्फ़ गिनती data से मिलाता है; पन्ना वही रहे तो "बदलाव नहीं") */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const F = path.join(ROOT, "courses/hi/index.html");
let s = fs.readFileSync(F, "utf8");
const before = s;
const MARK = "bhasha-khoj v1.0";

/* data से गिनती (पन्ने का runtime bhCounts() भी यही नियम मानता है) */
const w = {};
new Function("window", "self", fs.readFileSync(path.join(ROOT, "assets/courses_data.js"), "utf8") + ";window.__P=PRIVATE_JOB_COURSES;")(w, w);
const byId = {}; w.__P.forEach(c => { if (c && c.id) byId[c.id] = c; });
let all = 0, gold = 0, intro = 0;
w.KKB_GROUPS.forEach(g => g.ids.forEach(id => { const c = byId[id]; if (!c) throw new Error("data में नहीं: " + id); all++; const n = c.name_hi || ""; if (n.indexOf("प्रमाणपत्र कोर्स") > -1) gold++; else if (n.indexOf("परिचय-कोर्स") > -1) intro++; }));
const T_ALL = all + " भाषाओं के कोर्स", T_GOLD = gold + " भाषाओं का पूरा कोर्स", T_INTRO = intro + " भाषाओं का परिचय-कोर्स";

function rep(old, neu) {
  const n = s.split(old).length - 1;
  if (n !== 1) throw new Error("जगह " + n + " बार मिली (1 चाहिए): " + old.slice(0, 90));
  s = s.replace(old, () => neu);
}

if (s.indexOf(MARK) < 0) {
  /* 1 */
  rep('<script src="/assets/courses_data.js"></script>\n',
    '<script src="/assets/courses_data.js"></script>\n<script src="/assets/bhasha_khoj_data.js"></script>\n<script src="/assets/bhasha-khoj.js"></script>\n');
  /* 2 */
  rep('    <div class="search-wrap bh-search"><input type="text" class="search-input" id="bhashaSearch" placeholder="🔍 भाषा खोजें… जैसे: English, अरबी, জাপানী" oninput="filterBhasha()"/></div>\n',
    '    <!-- ' + MARK + ' (24-Nov-2026): बच्चे के लिए बड़ी खोज; नतीजे इसी डिब्बे के ठीक नीचे (engine: /assets/bhasha-khoj.js) -->\n' +
    '    <div class="bk-box" id="bhKhoj">\n' +
    '      <label class="bk-label" for="bhashaSearch">🔍 कौन-सी भाषा सीखनी है? उसका नाम लिखो</label>\n' +
    '      <div class="bk-field"><input type="search" class="bk-input" id="bhashaSearch" placeholder="जैसे: जापानी, japani, Dubai" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" enterkeyhint="search" aria-controls="bhKhojOut" oninput="filterBhasha()"/><button type="button" class="bk-clear" id="bhKhojClear" aria-label="खोज मिटाओ" style="display:none">✕</button></div>\n' +
    '      <div class="bk-hint">हिंदी, English, अपनी लिपि या देश का नाम: कैसे भी लिखो।</div>\n' +
    '      <div class="bk-out" id="bhKhojOut" aria-live="polite" style="display:none"></div>\n' +
    '    </div>\n');
  /* 3 */
  rep('      <div class="bh-sub">दुनिया की 130 भाषाएँ। 135 भाषाओं का पूरा कोर्स तैयार है — हर भाषा में <b>90 दिन · 2,150 वाक्य</b> · ऑनलाइन परीक्षा · प्रमाणपत्र (CEFR A2 पर आधारित)। नीचे कार्ड दबाओ, आज ही शुरू करो।</div>\n',
    '      <div class="bh-sub">यहाँ <span id="bhAllTxt">' + T_ALL + '</span> हैं: <span id="bhGoldTxt">' + T_GOLD + '</span> और <span id="bhIntroTxt">' + T_INTRO + '</span>। हर बोलचाल-कोर्स में <b>90 दिन · 2,150 वाक्य</b>, ऑनलाइन परीक्षा और प्रमाणपत्र (CEFR A2 पर आधारित)। नीचे भाषा का नाम लिखो या कार्ड दबाओ। कार्ड सीधे पहला पाठ खोलता है।</div>\n');
  /* CSS */
  rep('.bh-sub{font-size:18px;color:#0B1F3A;line-height:1.7;max-width:820px;margin:0 auto 6px}\n',
    '.bh-sub{font-size:18px;color:#0B1F3A;line-height:1.7;max-width:820px;margin:0 auto 6px}\n' +
    '/* ' + MARK + ' (24-Nov-2026): बड़ी खोज, बड़े बटन (उँगली के नाप के), नतीजे ठीक नीचे */\n' +
    '.bk-box{max-width:820px;margin:10px auto 14px;padding:14px;background:#fff;border:3px solid #1565C0;border-radius:16px;box-shadow:0 5px 0 #0B1F3A;scroll-margin-top:195px}\n' +
    '.bk-label{display:block;font-size:20px;font-weight:900;color:#0B1F3A;margin:0 0 8px;line-height:1.4}\n' +
    '.bk-field{position:relative}\n' +
    '.bk-input{width:100%;box-sizing:border-box;font-family:inherit;font-size:21px;min-height:56px;padding:12px 56px 12px 16px;border:3px solid #F9A825;border-radius:12px;background:#F5F7FA;color:#0B1F3A;-webkit-appearance:none;appearance:none}\n' +
    '.bk-input:focus{outline:none;border-color:#1565C0;background:#fff;box-shadow:0 0 0 4px rgba(21,101,192,.25)}\n' +
    '.bk-input::-webkit-search-cancel-button{-webkit-appearance:none;display:none}\n' +
    '.bk-input::placeholder{color:#55657a;opacity:1}\n' +
    '.bk-clear{position:absolute;right:6px;top:50%;transform:translateY(-50%);width:44px;height:44px;border:0;border-radius:50%;background:#0B1F3A;color:#fff;font-size:20px;font-weight:900;cursor:pointer}\n' +
    '.bk-hint{font-size:16px;color:#3a4a60;margin:8px 2px 0;line-height:1.5}\n' +
    '.bk-out{margin-top:12px}\n' +
    '.bk-head{font-size:18px;color:#0B1F3A;margin:0 0 10px;line-height:1.5}\n' +
    '.bk-head b{color:#2E7D32;font-size:20px}\n' +
    '.bk-none{background:#FFF8E1;border:3px dashed #F9A825;border-radius:14px;padding:14px;text-align:center}\n' +
    '.bk-none-t{font-size:20px;font-weight:900;color:#0B1F3A;margin-bottom:6px;word-break:break-word}\n' +
    '.bk-tip{font-size:17px;color:#0B1F3A;margin:6px 0 10px;line-height:1.6}\n' +
    '.bk-more{text-align:center;margin:12px 0 0}\n' +
    '.bk-btn{display:inline-block;font-family:inherit;font-size:18px;font-weight:900;padding:12px 18px;min-height:48px;border-radius:12px;border:3px solid #1565C0;background:#fff;color:#1565C0;cursor:pointer;text-decoration:none}\n' +
    '.bk-wa{background:#2E7D32;border-color:#2E7D32;color:#fff;margin-top:6px}\n' +
    '.bk-btn:focus-visible,.bk-clear:focus-visible{outline:4px solid #F9A825;outline-offset:2px}\n');
  /* 5 कार्ड → सीधा पाठ */
  rep("  var href=c.url||'#';\n", "  var href=c.url?c.url+'#shuru':'#'; /* 24-Nov: कार्ड सीधे पहला/अगला अधूरा पाठ खोले (kkb2.js v3.4) */\n");
  /* 4 गिनती + mount */
  rep("function renderBhasha(){\n  var pop=document.getElementById('bhPopular'); if(!pop) return;\n",
    "function renderBhasha(){\n  var pop=document.getElementById('bhPopular'); if(!pop) return;\n  var bhTot=bhCounts();\n");
  rep("onclick=\"setCorridor(-1,this)\">🌍 सब 130</button>'", "onclick=\"setCorridor(-1,this)\">🌍 सब '+bhTot+'</button>'");
  rep("+' ('+g.ids.length+')</button>'; }).join(''); }\n}\n", "+' ('+g.ids.length+')</button>'; }).join(''); }\n  bhKhojMount();\n}\n");
  rep("function filterBhasha(){\n",
    "/* " + MARK + " (24-Nov-2026, Founder: \"भाषा खोजते समय आदमी खो जाता है ... चाइल्ड मनोविज्ञान\"):\n" +
    "   engine /assets/bhasha-khoj.js; सहायक data /assets/bhasha_khoj_data.js (generator/build_bhasha_khoj.js से)।\n" +
    "   नतीजे खोज-डिब्बे के ठीक नीचे; खोजते समय बाक़ी सूचियाँ छिपती हैं। engine न आए तो नीचे का पुराना filterBhasha चलता है। */\n" +
    "function bhKhojMount(){\n" +
    "  if(window.__bhK||!window.BhashaKhoj||typeof KKB_GROUPS==='undefined') return;\n" +
    "  var list=[]; KKB_GROUPS.forEach(function(g){ g.ids.forEach(function(id){ var c=kkbCourse(id); if(c) list.push(c); }); });\n" +
    "  try{ window.__bhK=window.BhashaKhoj.mount({input:'bhashaSearch',out:'bhKhojOut',clear:'bhKhojClear',list:list,extra:window.BHASHA_KHOJ||{},chip:bhChip,hide:['bhCorridors','bhPopular','bhashaGroups'],wa:'919431210092'}); }\n" +
    "  catch(e){ window.__bhK=null; try{ console.log('bhasha-khoj:', e); }catch(x){} } /* खोज टूटे तो भी कोर्स-सूची न टूटे (पुराना filterBhasha चलेगा) */\n" +
    "}\n" +
    "/* भाषा-गिनती data से (पन्ने का वाक्य कभी पुराना न रहे) */\n" +
    "function bhCounts(){\n" +
    "  if(typeof KKB_GROUPS==='undefined') return 0;\n" +
    "  var all=0,gold=0,intro=0; KKB_GROUPS.forEach(function(g){ g.ids.forEach(function(id){ var c=kkbCourse(id); if(!c) return; all++; var n=c.name_hi||''; if(n.indexOf('प्रमाणपत्र कोर्स')>-1) gold++; else if(n.indexOf('परिचय-कोर्स')>-1) intro++; }); });\n" +
    "  var set=function(id,t){ var e=document.getElementById(id); if(e) e.textContent=t; };\n" +
    "  set('bhAllTxt',all+' भाषाओं के कोर्स'); set('bhGoldTxt',gold+' भाषाओं का पूरा कोर्स'); set('bhIntroTxt',intro+' भाषाओं का परिचय-कोर्स');\n" +
    "  return all;\n" +
    "}\n" +
    "/* \"अपनी भाषा चुनो\" बटन: भाषा-टैब खोलो, खोज-डिब्बे पर ले जाओ (कीबोर्ड अपने-आप नहीं खुलता: बच्चा चाहे तो नीचे के कार्ड भी देख सके) */\n" +
    "function bhKhojFocus(){\n" +
    "  var s0=document.getElementById('sec0'); if(s0&&!s0.classList.contains('active')&&window.goTab) window.goTab(0);\n" +
    "  var box=document.getElementById('bhKhoj'); if(!box) return;\n" +
    "  setTimeout(function(){ try{ box.scrollIntoView({behavior:'smooth',block:'start'}); }catch(e){ box.scrollIntoView(); } },80);\n" +
    "}\n" +
    "window.bhKhojFocus=bhKhojFocus;\n" +
    "/* ऊपर की चिपकी टैब-पट्टी का top:52px पुराने 52px मेन्यू के हिसाब से था; नया मेन्यू (.acs-nav) ~83px का है, इसलिए पट्टी मेन्यू के अक्षर ढकती थी। अब असली ऊँचाई से। */\n" +
    "function bhTabTop(){\n" +
    "  var n=document.querySelector('.acs-nav'), t=document.querySelector('.tab-bar'); if(!n||!t||!n.offsetHeight) return;\n" +
    "  t.style.top=n.offsetHeight+'px';\n" +
    "  var b=document.getElementById('bhKhoj'); if(b) b.style.scrollMarginTop=(n.offsetHeight+t.offsetHeight+10)+'px';\n" +
    "}\n" +
    "window.addEventListener('load',bhTabTop); window.addEventListener('resize',bhTabTop);\n" +
    "function filterBhasha(){\n  if(window.__bhK) return; /* नया engine लगा है: वही संभालता है */\n");
  /* 6 */
  rep("<button class=\"h130-btn h130-btn-gold\" type=\"button\" onclick=\"document.getElementById('khandB').scrollIntoView({behavior:'smooth'})\">🗣️ अपनी भाषा चुनो</button>",
    "<button class=\"h130-btn h130-btn-gold\" type=\"button\" onclick=\"bhKhojFocus()\">🗣️ अपनी भाषा चुनो</button>");
  rep("<button class=\"raah-btn raah-bhasha\" onclick=\"document.getElementById('khandB').scrollIntoView({behavior:'smooth'})\">🗣️ दूसरी भाषा सीखनी है</button>",
    "<button class=\"raah-btn raah-bhasha\" onclick=\"bhKhojFocus()\">🗣️ दूसरी भाषा सीखनी है</button>");
  /* 7 पुराने होल */
  rep("function init() {\n  renderBhasha();",
    "function init() {\n  if(window.__acsInitDone) return; /* 24-Nov: init दो बार चलता था (DOMContentLoaded + सीधा): dropdown में दोहरे विकल्प, दोहरा JSON-LD */\n  renderBhasha();");
  rep("  renderTab(0);\n}\n\nTAB_DATA[6]", "  renderTab(0);\n  window.__acsInitDone = 1;\n}\n\nTAB_DATA[6]");
  rep("window.addEventListener('scroll',()=>document.getElementById('scrollTop').classList.toggle('show',window.scrollY>300));",
    "window.addEventListener('scroll',()=>{ const b=document.getElementById('scrollTop'); if(b) b.classList.toggle('show',window.scrollY>300); }); /* 24-Nov: scrollTop बटन पन्ने पर नहीं, हर scroll पर त्रुटि आती थी */");
}

/* गिनती हर बार data से मिलाओ (data बदले तो पन्ना भी) */
s = s.replace(/<span id="bhAllTxt">[^<]*<\/span>/, '<span id="bhAllTxt">' + T_ALL + "</span>")
  .replace(/<span id="bhGoldTxt">[^<]*<\/span>/, '<span id="bhGoldTxt">' + T_GOLD + "</span>")
  .replace(/<span id="bhIntroTxt">[^<]*<\/span>/, '<span id="bhIntroTxt">' + T_INTRO + "</span>");

/* पूरी हालत की जाँच (exact-state): हर नया टुकड़ा ठीक एक बार, हर पुराना शून्य */
const must1 = ['<script src="/assets/bhasha_khoj_data.js"></script>', '<script src="/assets/bhasha-khoj.js"></script>', 'id="bhKhoj"', 'id="bhashaSearch"', 'id="bhKhojOut"', 'id="bhKhojClear"',
  'id="bhAllTxt"', 'id="bhGoldTxt"', 'id="bhIntroTxt"', "function bhKhojMount(){", "try{ window.__bhK=window.BhashaKhoj.mount(", "function bhCounts(){", "function bhTabTop(){", "function bhKhojFocus(){", "  bhKhojMount();\n", "+'#shuru'", "if(window.__acsInitDone) return;", "window.__acsInitDone = 1;"];
must1.forEach(x => { const n = s.split(x).length - 1; if (n !== 1) throw new Error("नया टुकड़ा " + n + " बार (1 चाहिए): " + x); });
if ((s.match(/onclick="bhKhojFocus\(\)"/g) || []).length !== 2) throw new Error("bhKhojFocus बटन 2 नहीं");
["🌍 सब 130", "window.__bhK=BhashaKhoj.mount(", 'class="search-wrap bh-search"', "135 भाषाओं का पूरा कोर्स", "document.getElementById('scrollTop').classList"].forEach(x => { if (s.indexOf(x) > -1) throw new Error("पुराना टुकड़ा बचा: " + x); });
const iD = s.indexOf('<script src="/assets/bhasha_khoj_data.js">'), iE = s.indexOf('<script src="/assets/bhasha-khoj.js">'), iC = s.indexOf('<script src="/assets/courses_data.js">'), iI = s.indexOf("function bhKhojMount");
if (!(iC < iD && iD < iE && iE < iI)) throw new Error("script-क्रम ग़लत (courses_data → khoj_data → khoj → inline चाहिए)");

if (s !== before) { fs.writeFileSync(F, s); console.log("✅ लिखा: courses/hi/index.html"); } else console.log("बदलाव नहीं: courses/hi/index.html");
console.log("भाषाएँ " + all + " · पूरा कोर्स " + gold + " · परिचय-कोर्स " + intro);
