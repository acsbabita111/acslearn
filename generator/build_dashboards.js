/* ============================================================
   build_dashboards.js — dashboard-परिवार का generator (परत-4)
   v2.1 · 18-Jul-2026 (काम-9+) — learner-progress पैनल (P_PROGRESS): device-local
          प्रगति/अंक/मील-पत्थर/कोमल-सिलसिला (localStorage, शून्य-server, बिना-leaderboard)
          — student/jobseeker/entrepreneur में; पाठ-पेज course-lesson.js लिखता है; sw v48।
   v2.0 · 18-Jul-2026 (काम-9 दौर-प) — पैनल-एकरूपता: (1) प्रशिक्षु 3 घरों में
          📜 नियम-पत्र (learner rules) · (2) teacher/ustad/counselor में व्यक्ति-सुरक्षा
          P_IND_SAFE (POSH·POCSO·10-18 Guardian) · (3) 📣 प्रचार-किट P_PROMO
          (center·workshop·teacher·ustad·counselor — ईमानदार-पैनल) · (4) foreign-agent
          में ✅ badge (P_SIMPLE_BADGE — सपाट slab, उम्र-fee नहीं) · (5) employer
          "संस्था-पहचान" → साझा P_INST_VERIFY का optional-मोड (नाम-एकरूपता + संस्था
          वैकल्पिक सुरक्षित) · (6) learner "मेरे कोर्स" ↔ संस्था "Enrollment" ज़िक्र।
          ⚠️ STAMP व GEN_NOTE जान-बूझकर अछूते (byte-untouched नियम — अछूते घर न बदलें);
          इसलिए हर पेज का emitted note "v1.9 · 16-Jul" ही रहेगा।
   v1.9 · 16-Jul-2026 (काम-6 चरण-6, अंतिम) — बाहरी-परिवार पूरा:
          dual-घर नियम (volunteer): team+external दोनों block पेज में रहें —
          काम-सूची boot-रास्ते से छनती है (dashboard.js v4.3 initNav-filter);
          volunteer = सेवा-भाव · RM-मार्गदर्शन · मानदेय नहीं-सिर्फ़ कमीशन ·
          RM-पात्रता का रास्ता; finance-mitra = पुल · अग्रिम-निषेध (फ़ाइल-चार्ज/
          processing/अग्रिम/मिठाई) · अधिकृति-प्रमाण; vendor = 6 श्रेणियाँ ·
          मंच-सौदे-का-पक्ष-नहीं · RM-सत्यापन। हर पंक्ति rules-फ़ाइलों से मिलान-जाँची।
   v1.8 · 16-Jul-2026 (काम-6 चरण-5) — counselor · employer · foreign-agent सुसज्जित:
          counselor = 90/5/5 · 5-मिनट free preview · 1-घंटा cancel=90% (दोनों ओर) ·
          45-नियम badge (P_TU_BADGE साझा); employer = ZERO worker fee · माँग=जॉब-रोल ·
          contact सिर्फ़ dashboard; agent = 90/5/5 · commission केवल employer से ·
          eMigrate/RA अनिवार्य · UNCITRAL। हर पंक्ति rules-consent फ़ाइलों से मिलान-जाँची।
   v1.7 · 16-Jul-2026 (काम-6 चरण-4) — center व workshop घर सुसज्जित (संस्था-जोड़ी):
          केंद्र = enrollment-analytics (Addendum-v2 §19-20) · टीम-ढाँचा · certificate-flow;
          workshop = उस्ताद-ज्ञान का अभ्यास-स्थान (≥3 वर्ष · apprenticeship · सुरक्षा/POCSO)।
          साझा संस्था-टुकड़े: 80%-हिस्सा · छूट+WhatsApp · संस्था-सत्यापन · संस्था-badge
          (उम्र-fee नहीं — rules-फ़ाइल पुष्ट)।
   v1.6 · 16-Jul-2026 (काम-6 चरण-3) — teacher व ustad घर सुसज्जित (g2 —
          provisional-पर्दा/approval-कार्ड यथावत): Teacher = content·royalty·
          live-class की दुनिया; उस्ताद = हुनर-प्रमाणीकरण (दोहरे-ताले का पहला ताला)।
          कमाई/badge पैनल दोनों में साझा (rules-फ़ाइलों की समान पंक्तियों से)।
   v1.5 · 16-Jul-2026 (काम-6 चरण-2) — jobseeker व entrepreneur घर भी सुसज्जित:
          साझा पैनल-टुकड़े (P_*) — एक चीज़ = एक जगह; studentPanels उन्हीं टुकड़ों से
          (output हूबहू वही); jobseekerPanels (नौकरी-पेड़ · Green Tick badge) व
          entrepreneurPanels (950+ उद्यम · ecosystem · सहयोगी · Industrial Tour)।
   v1.4 · 16-Jul-2026 (काम-6 चरण-1) — टेम्पलेट v4.1: external status-कार्ड अब
          statusPanel(key) से (g2 = पुराना पाठ हूबहू; प्रशिक्षु = "खाता सीधा चालू ✅");
          विद्यार्थी-घर के 9 असली पैनल studentPanels() से — बाक़ी घरों का HTML अपरिवर्तित।
   v1.3 · 15-Jul-2026 — टेम्पलेट v4.0 (पतला खोखा): CSS/JS अब /assets/ में साझा;
          JS की build-time TEAM-कटाई हटी (runtime-gate) — सिर्फ़ HTML-mode कटाई बची।
   v1.2 · 14-Jul-2026 — एक-generator नियम (Founder): join.html व login (dashboard/index.html)
          भी अब इसी generator से — स्रोत: /_JOIN_TEMPLATE.html · /dashboard/_LOGIN_TEMPLATE.html।
          इन दोनों को अब हाथ से न बदलें — टेम्पलेट बदलो, generator चलाओ (परत-4)।
   v1.1 · 14-Jul-2026 — v3.4 टेम्पलेट: chip-public_label + gateway-timeline (मिलान-सुधार)
   v1.0 · 12-Jul-2026 (काम-4)
   ------------------------------------------------------------
   लोहे का नियम: कोई dashboard-page हाथ से न बने — सिर्फ़ यह script।
   स्रोत:  /assets/designation_matrix.js (परत-3 — पद/घर/label का एकमात्र घर)
         + /dashboard/_DASHBOARD_TEMPLATE.html (परत-2 — मास्टर टेम्पलेट)
   चलाना: repo-रूट से → node generator/build_dashboards.js
   नतीजा: हर dashboard-घर का index.html (admin समेत — admin भी अब generator-output)
   ============================================================ */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const MX = require(path.join(ROOT, "assets", "designation_matrix.js"));
const TPL = fs.readFileSync(path.join(ROOT, "dashboard", "_DASHBOARD_TEMPLATE.html"), "utf8");

const STAMP = "16-Jul-2026";
const GEN_NOTE =
  "⚙️ यह फ़ाइल generator से बनी है (generator/build_dashboards.js v1.9 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: टेम्पलेट/matrix में करके generator दोबारा चलाएँ (परत-4 नियम)।";

/* ---------- साझा-घर वाले dashboards के प्रदर्शन-नाम ---------- */
const SHARED_LABELS = {
  "/dashboard/hq/staff/":  { tb: "Staff Dashboard", deny: "Staff (DEO · Intern)" },
  "/dashboard/callcenter/": { tb: "Call Center Dashboard", deny: "Call Center कर्मी" },
  "/dashboard/future/":    { tb: "Future Dashboard", deny: "Future/Other पद-धारक" }
};

/* ---------- P1 (आवेदन-पैनल) का पद-अनुसार वाक्य ---------- */
function p1Note(allowedKeys){
  if(allowedKeys.includes("hq_admin"))
    return "आपके दायरे के आवेदन (अंतिम मुहर आपकी: RM-स्तर के सभी + ZM-office के कर्मी)। approve/reject बटन नीचे।";
  if(allowedKeys[0]==="founder")
    return "सभी आवेदन (अंतिम मुहर आपकी: ZM/Continental · सातों Heads · System Security · Admin)। approve/reject बटन नीचे।";
  return "आपके दायरे के आवेदन — आपकी चौकी-मुहर व दायरा-छँटाई अगले दौर (rules-विस्तार) में; अभी पूरी सूची सिर्फ़ Founder/Admin को दिखती है।";
}

/* ---------- external status-कार्ड (टेम्पलेट v4.1 का STATUS_PANEL-खाना) ----------
   v1.3-(क): student/jobseeker/entrepreneur पर approval-द्वार नहीं — खाता सीधा चालू।
   बाक़ी (g2) roles का पाठ v4.0 वाला हूबहू (byte-मिलान के लिए)। */
const NO_GATEWAY = ["student","jobseeker","entrepreneur"];
function statusPanel(key){
  if(NO_GATEWAY.includes(key)) return (
    '<div class="pcard panel" id="pnl-status" data-nav="✅ खाता-स्थिति" style="grid-column:1/-1">' +
    '<div class="ph">✅ खाता-स्थिति</div>' +
    '<div class="pd">आपका खाता सीधा चालू है ✅ — आपकी भूमिका के लिए कोई approval ज़रूरी नहीं (नियम v1.3)। ' +
    'जुड़ना व पढ़ना हमेशा मुफ़्त; पैसा सिर्फ़ तब, जब आप कोई paid-सेवा लें।</div>' +
    '<div class="note" id="stGuard" style="display:none"></div>' +
    '</div>');
  return (
    '<div class="pcard panel" id="pnl-status" data-nav="🛤️ approval-स्थिति" style="grid-column:1/-1">\n' +
    '        <div class="ph">🛤️ approval-स्थिति</div>\n' +
    '        <div class="pd">आपकी स्वीकृति (approval) की जाँच-श्रृंखला server पर अगले दौर में बनेगी — नियम से पहले टीम-व्यवस्था पूरी होती है, फिर सेवा-भूमिकाएँ खुलती हैं। तब तक डैशबोर्ड (Dashboard) देखने के मोड में। आपका आवेदन सुरक्षित दर्ज है।</div>\n' +
    '      </div>');
}

/* ---------- प्रशिक्षु-घरों के असली पैनल (काम-6 चरण-1+2, 16-Jul-2026) ----------
   नियम लागू: काम-सूची (v1.8-ख1) · scale/आलसी-load (v1.8-ख2) · कूट-नाम कभी UI पर नहीं ·
   कोई मरा बटन नहीं (url-नियम v2.4-क8) · गोल bracket · फ़ॉन्ट ≥16px (सिर्फ़ मौजूदा classes)।
   साझा-टुकड़े (P_*) = एक चीज़ एक जगह — तीनों प्रशिक्षु-घर इन्हीं से बनें। */

const P_APTITUDE = (
    '<div class="pcard panel" id="pnl-aptitude" data-nav="🧠 Aptitude टेस्ट" style="grid-column:1/-1">' +
    '<div class="ph">🧠 Aptitude टेस्ट (अभिरुचि-परीक्षा — टेस्ट-1)</div>' +
    '<div class="pd">यह ज्ञान की नहीं, आपकी रुचि (अभिरुचि) की परीक्षा है — कोई जवाब सही या ग़लत नहीं। ' +
    'नतीजा बताता है कि 24 सेक्टर में आपकी रुचि किधर सबसे मज़बूत है, 4 सुझाए सेक्टर और सुझाया स्केल क्या है।</div>' +
    '<div class="pd">🕐 फीस चुकाने पर 30 दिन की छतरी — टेस्ट अपनी सुविधा से 5 से 25 दिन में पूरा करें। ' +
    'जवाब जितनी बार चाहें बदलें, पर Final Submit सिर्फ़ एक बार — उसके बाद ही नतीजा। नतीजे के साथ Aptitude Certificate download होगा।</div>' +
    '<div class="note">💡 भुगतान से पहले साफ़ दिखेगा: सत्यापन असफल होने पर 30 प्रतिशत जाँच-शुल्क कटता है (यह दंड नहीं)।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>🧠 टेस्ट शुरू करें</button> ' +
    '<span class="soon">टेस्ट-इंजन जल्द चालू होगा — अभी तैयारी में</span>' +
    '</div>');

const P_COURSES = (
    '<div class="pcard panel" id="pnl-courses" data-nav="📚 मेरे कोर्स" style="grid-column:1/-1">' +
    '<div class="ph">📚 मेरे कोर्स</div>' +
    '<div class="pd"><b>मेरा नामांकन:</b> नामांकन-खाता अगले दौर में जुड़ेगा — तब यहाँ सिर्फ़ आपका अपना ब्योरा दिखेगा: ' +
    'मेरा कोर्स · मेरी fee · मेरी परीक्षा · मेरा नतीजा (आपके सब केंद्रों का, एक जगह)। ' +
    'जिस केंद्र/संस्था में आप पढ़ते हैं, उसके "Enrollment व Analytics" पैनल और आपके इस ब्योरे का स्रोत ' +
    'एक ही नामांकन-खाता है — इसलिए दोनों को एक ही सच दिखता है।</div>' +
    '<div class="ph" style="margin-top:14px">📖 मुफ़्त online कोर्स — अभी पढ़ें</div>' +
    '<div class="pd">पढ़ना हमेशा मुफ़्त है — बिना रोक, बिना शर्त। जिस कोर्स के पाठ बन चुके हैं, उस पर "पढ़ें" बटन दिखेगा।</div>' +
    '<div id="crsList"><span class="note">कोर्स-सूची यह पैनल खोलने पर आती है…</span></div>' +
    '<a class="abtn ok" style="background:var(--blue);display:inline-block;text-decoration:none;margin-top:10px" href="/courses/">🌍 पूरी कोर्स-सूची देखें</a>' +
    '</div>');

const P_EXAMS = (
    '<div class="pcard panel" id="pnl-exams" data-nav="📝 मेरी परीक्षाएँ" style="grid-column:1/-1">' +
    '<div class="ph">📝 मेरी परीक्षाएँ (टेस्ट-2 व टेस्ट-3)</div>' +
    '<div class="pd"><b>टेस्ट-2 — Workshop-प्रवेश टेस्ट:</b> online कोर्स पूरा करने के बाद, workshop या कैंप में admission के लिए। ' +
    'यह सिर्फ़ पास-फ़ेल (qualifying) है — इसका कोई प्रमाण पत्र नहीं। fail हों तो जब मर्ज़ी आधी फीस पर दोबारा।</div>' +
    '<div class="pd"><b>टेस्ट-3 (मोड-अ) — प्रशिक्षण-पूर्णता:</b> workshop-प्रशिक्षण → पहली कमाई → अपने काम का फोटो या वीडियो भेजें → ' +
    'उस्ताद हुनर-प्रमाणीकरण दें → साथ में HQ की online परीक्षा — <b>दोनों ताले खुलें तभी</b> प्रशिक्षण-पूर्णता का प्रमाण पत्र।</div>' +
    '<div class="pd"><b>टेस्ट-3 (मोड-ब) — online कोर्स-पूर्णता:</b> workshop में भाग न लेने पर, आपके आवेदन से, online ज्ञान के पूर्ण ' +
    'मूल्यांकन के बाद — प्रमाण पत्र पर साफ़ लिखा होगा: "इन्होंने अभी तक प्रैक्टिकल नहीं किया है।"</div>' +
    '<span class="soon">परीक्षा-इंजन अगले दौर में — तब यहीं से टेस्ट देंगे</span>' +
    '</div>');

const P_PROOF = (
    '<div class="pcard panel" id="pnl-proof" data-nav="📸 पहली-कमाई सबूत" style="grid-column:1/-1">' +
    '<div class="ph">📸 पहली-कमाई का सबूत (मोड-अ का हिस्सा)</div>' +
    '<div class="pd">यहाँ आप अपने किए काम का फोटो या वीडियो भेजेंगे (हर फ़ाइल अधिकतम 2MB)। उस्ताद इसे देखकर हुनर-प्रमाणीकरण देंगे — ' +
    'यह प्रमाण पत्र के दो तालों में से पहला ताला है।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>📤 सबूत भेजें</button> ' +
    '<span class="soon">upload-इंजन व समीक्षा-चौकी अगले दौर में</span>' +
    '</div>');

const P_CERTS = (
    '<div class="pcard panel" id="pnl-certs" data-nav="🏆 मेरे प्रमाण पत्र" style="grid-column:1/-1">' +
    '<div class="ph">🏆 मेरे प्रमाण पत्र</div>' +
    '<div class="pd">ACS पर अभी तीन प्रकार: (1) Aptitude Certificate — रुचि-रिपोर्ट, (2) प्रशिक्षण-पूर्णता प्रमाण पत्र — दोहरा-ताला, ' +
    '(3) online कोर्स-पूर्णता प्रमाण पत्र। हर प्रमाण पत्र पर unique number व QR — दुनिया में कहीं से verify। ' +
    'Lifetime valid; verify 3 साल मुफ़्त, फिर 1000 रुपये; duplicate 500 रुपये।</div>' +
    '<div class="note">अभी आपका कोई प्रमाण पत्र नहीं बना — परीक्षा-इंजन चालू होते ही download यहीं मिलेगा।</div>' +
    '</div>');

function P_PAY(extra){
  return (
    '<div class="pcard panel" id="pnl-pay" data-nav="💳 मेरे भुगतान" style="grid-column:1/-1">' +
    '<div class="ph">💳 मेरे भुगतान</div>' +
    '<div class="pd">paid सिर्फ़ ये 5 सेवाएँ: aptitude टेस्ट · offline प्रशिक्षण · workshop apprenticeship · ' +
    'counselor सलाह · विदेश-एजेंट connection। बाक़ी सब — पढ़ना, जुड़ना, देखना — हमेशा मुफ़्त।</div>' +
    (extra || '') +
    '<div class="note">💡 हर paid-सेवा पर भुगतान-बटन के ठीक ऊपर लिखा मिलेगा: सत्यापन असफल = 30 प्रतिशत जाँच-शुल्क। ' +
    'भुगतान से पहले मशीन-जाँच मुफ़्त होती है।</div>' +
    '<span class="soon">रसीद व भुगतान-history अगले दौर में</span>' +
    '</div>');
}

const P_COUNSEL = (
    '<div class="pcard panel" id="pnl-counsel" data-nav="🧭 सलाह (Counselor)" style="grid-column:1/-1">' +
    '<div class="ph">🧭 सलाह — काउंसलर (Counselor)</div>' +
    '<div class="pd">सलाह का रास्ता टेस्ट से पहले भी खुला है और बाद भी। हर counselor से 5 मिनट की मुफ़्त बातचीत (free preview) ' +
    'ज़रूर मिलती है — फिर booking। booking रद्द करने पर (1 घंटा पहले तक) 90 प्रतिशत वापसी — चाहे आप रद्द करें या counselor।</div>' +
    '<div class="note">counselor-सूची (नाम · fees) यहाँ तभी दिखेगी जब उनका RM भौतिक-सत्यापन व approval पूरा होगा — ' +
    'बिना सत्यापन कोई नाम portal पर नहीं दिखता (प्रदर्शन-नियम)।</div>' +
    '</div>');

const P_HELP = (
    '<div class="pcard panel" id="pnl-help" data-nav="🆘 सहायता व शिकायत" style="grid-column:1/-1">' +
    '<div class="ph">🆘 सहायता व शिकायत</div>' +
    '<div class="pd">कोई दिक़्क़त, सवाल या शिकायत हो — सीधे लिखें। शिकायत की स्वतंत्र सुनवाई ACS की Trust Policy का हिस्सा है।</div>' +
    '<a class="abtn ok" style="display:inline-block;text-decoration:none" target="_blank" rel="noopener" href="https://wa.me/919431210092">💬 WhatsApp पर लिखें</a> ' +
    '<a class="abtn ok" style="background:var(--blue);display:inline-block;text-decoration:none" href="mailto:acs.chautham@gmail.com">✉️ Email भेजें</a>' +
    '</div>');

/* --- सिर्फ़ विद्यार्थी --- */
const P_WORKSHOP_ST = (
    '<div class="pcard panel" id="pnl-workshop" data-nav="🛠️ Workshop व कैंप" style="grid-column:1/-1">' +
    '<div class="ph">🛠️ Workshop व कैंप</div>' +
    '<div class="pd">रास्ता: मुफ़्त पढ़ो → टेस्ट-2 पास करो → अपने पास के workshop में paid-प्रशिक्षण (अवधि कोर्स के हिसाब से 15 से 300 दिन)। ' +
    'पास में workshop न हो तो 10 या ज़्यादा पास-विद्यार्थी मिलकर online निवेदन करें — RM या ZM कैंप लगवाएँगे।</div>' +
    '<div class="pd">ℹ️ 16 से 18 साल वालों के लिए: प्रशिक्षण-कैंप व भ्रमण सिर्फ़ Guardian (अभिभावक) की सहमति से — या Guardian साथ जाएँ।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>🙏 कैंप-निवेदन भेजें</button> ' +
    '<span class="soon">workshop-सूची व निवेदन-इंजन अगले दौर में</span>' +
    '</div>');

/* --- सिर्फ़ नौकरी-प्रशिक्षु (jobseeker) --- */
const P_JOBS = (
    '<div class="pcard panel" id="pnl-jobs" data-nav="💼 नौकरी-खोज" style="grid-column:1/-1">' +
    '<div class="ph">💼 नौकरी-खोज (नौकरी का पेड़)</div>' +
    '<div class="pd"><b>दो तने:</b> (1) सरकारी नौकरी — exam के रास्ते (तैयारी-कोर्स मुफ़्त पढ़ें); (2) प्राइवेट — चार डाल: ' +
    'स्वरोजगार · अपने इलाक़े के छोटे उद्यम में रोजगार · कॉर्पोरेट सेक्टर · विदेश में रोजगार।</div>' +
    '<div class="pd"><b>तरक़्क़ी की 6 सीढ़ियाँ:</b> प्रशिक्षु → सहायक → कुशल कर्मी → प्रधान कर्मी → प्रबंधक → मालिक। ' +
    'कुशल-स्तर से ऊपर बढ़ने पर दो दरवाज़े खुलते हैं — अपना काम शुरू करना (मालिक) या ACS-उस्ताद बनकर सिखाना।</div>' +
    '<div class="pd"><b>विदेश-रोजगार के पक्के नियम:</b> agent को आप कुछ नहीं देते — उसका commission नियोक्ता (employer) से आता है; ' +
    'आप सिर्फ़ ACS को platform-fee देते हैं। eMigrate पंजीकरण अनिवार्य। नियोक्ता से संपर्क सिर्फ़ dashboard से — बाहर के वादों पर भरोसा न करें।</div>' +
    '<div class="pd">ℹ️ उम्र-नियम: job-तैयारी 16 साल से; असली job व joining 18 साल से (16 से 18 पर Guardian की सहमति ज़रूरी)।</div>' +
    '<div class="note">नियोक्ता की माँग-सूची (कौन-सा काम · कितने अवसर · देश-विदेश) approval-श्रृंखला चालू होने पर यहीं दिखेगी।</div>' +
    '<span class="soon">नौकरी-सूची इंजन अगले दौर में</span>' +
    '</div>');

const P_BADGE = (
    '<div class="pcard panel" id="pnl-badge" data-nav="✅ Green Tick badge" style="grid-column:1/-1">' +
    '<div class="ph">✅ Verified Badge (Green Tick)</div>' +
    '<div class="pd">जुड़ना मुफ़्त है — badge लेना आपकी मर्ज़ी (वैकल्पिक)। badge वाले को नियोक्ता की नज़र में भरोसा व प्राथमिकता मिलती है, ' +
    'पर बिना badge भी आप हर जगह apply कर सकते हैं। न्यूनतम उम्र 18; कोई उम्र-जोड़ नहीं — सीधा रेट।</div>' +
    '<div class="pd"><b>शुल्क (365 दिन):</b> गाँव/एरिया 300 रुपये · क़स्बा/जिला-मुख्यालय 600 रुपये · महानगर 1,000 रुपये।</div>' +
    '<div class="note">वापसी-नियम: सत्यापन से पहले रद्द करें तो 90 प्रतिशत वापस (10 प्रतिशत processing); badge बनने के बाद = ' +
    '(पूरी फीस में से 30 प्रतिशत काटकर) × बचे दिन ÷ 365।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>✅ badge के लिए आवेदन</button> ' +
    '<span class="soon">badge-इंजन अगले दौर में</span>' +
    '</div>');

const P_PAY_JOBSEEKER_EXTRA = (
    '<div class="pd"><b>platform-fee:</b> नौकरी मिलने के रास्ते में आप सिर्फ़ ACS को platform-fee देते हैं — ' +
    'किसी agent या बिचौलिए को एक रुपया भी नहीं। नियोक्ता से worker-fee शून्य।</div>');

/* --- सिर्फ़ उद्योग-प्रशिक्षु (entrepreneur) --- */
const P_UDYAM = (
    '<div class="pcard panel" id="pnl-udyam" data-nav="🌍 950+ उद्यम" style="grid-column:1/-1">' +
    '<div class="ph">🌍 950 से ज़्यादा उद्यमों की सूची</div>' +
    '<div class="pd">24 सेक्टर में बँटे 950 से ज़्यादा उद्यम — हर उद्यम पर निवेश-रेंज, बाज़ार-जानकारी और bank-finance-ready ' +
    'project report की तैयारी। अपनी रुचि व जेब के हिसाब से उद्यम चुनें; कोर्स का Module-8 आपकी अपनी project report बनवाता है।</div>' +
    '<a class="abtn ok" style="display:inline-block;text-decoration:none" href="/udyam/">🌍 उद्यम-सूची खोलें</a>' +
    '</div>');

const P_ECOSYS = (
    '<div class="pcard panel" id="pnl-ecosys" data-nav="🌱 उद्यमी-सहयोग" style="grid-column:1/-1">' +
    '<div class="ph">🌱 उद्यमी-सहयोग ecosystem</div>' +
    '<div class="pd">ACS का साथ सिर्फ़ उद्यम शुरू करवाने तक नहीं — <b>पहला ग्राहक मिलने तक</b> (First Customer Mission, 90-दिन साथ)। ' +
    'आगे की परतें: असफल होने पर नई योजना (Failure Recovery) · परिवार-सहयोग व महिला-उद्यमिता परतें · ज़िले की माँग-जानकारी।</div>' +
    '<div class="pd"><b>निवेश-सीढ़ी:</b> L1 (शून्य रुपये से शुरुआत) से L15 तक — मालिक बनते ही यह सीढ़ी आपके सामने खुलती है। ' +
    'सफलता का पैमाना नौकरी नहीं — <b>टिकाऊ आय</b> है।</div>' +
    '<div class="note">⚖️ दो पक्के सिद्धांत: (1) ACS ख़ुद बैंक या निवेशक कभी नहीं — सिर्फ़ अधिकृत संस्थाओं से जोड़ने वाला पुल; ' +
    '(2) AI सिर्फ़ निर्णय-सहायक है — अंतिम निर्णय हमेशा आपका, बड़े फ़ैसलों पर मानव-समीक्षा ज़रूरी।</div>' +
    '<span class="soon">ecosystem-इंजन just-in-time — अपने दौर में</span>' +
    '</div>');

const P_PARTNERS = (
    '<div class="pcard panel" id="pnl-partners" data-nav="🤝 मेरे सहयोगी" style="grid-column:1/-1">' +
    '<div class="ph">🤝 मेरे सहयोगी — उस्ताद · विक्रेता · वित्त मित्र</div>' +
    '<div class="pd"><b>उस्ताद:</b> हुनर सिखाने व राह दिखाने वाला mentor — workshop-प्रशिक्षण व हुनर-प्रमाणीकरण इन्हीं से।</div>' +
    '<div class="pd"><b>विक्रेता (Vendor):</b> यंत्र · कच्चा-माल · packaging · license-सहायता · marketing — सब एक जगह। ' +
    'सूची में सिर्फ़ वही नाम दिखेंगे जिनका RM भौतिक-सत्यापन व approval पूरा है। ACS मंच है — सौदे का पक्ष नहीं।</div>' +
    '<div class="pd"><b>वित्त मित्र (Finance Mitra):</b> बैंक · सरकारी योजना · NBFC · CSR से जोड़ने वाला पुल — ' +
    '<b>आपसे शून्य शुल्क</b> (उसका commission संस्था से)।</div>' +
    '<div class="note">⚠️ चेतावनी: loan दिलाने के नाम पर कोई अग्रिम पैसा माँगे तो एक रुपया न दें — तुरंत शिकायत करें; ' +
    'ऐसा करने वाले का तत्काल निष्कासन व कानूनी कार्रवाई का नियम है।</div>' +
    '<span class="soon">सत्यापित-सूचियाँ approval-श्रृंखला चालू होने पर यहीं</span>' +
    '</div>');

const P_TOUR = (
    '<div class="pcard panel" id="pnl-tour" data-nav="🗺️ Industrial Tour" style="grid-column:1/-1">' +
    '<div class="ph">🗺️ Industrial Tour (औद्योगिक भ्रमण)</div>' +
    '<div class="pd">उद्यम लगाने से पहले उसे चलते हुए देखो और वहीं काम सीखो — हर जगह कम-से-कम 5 दिन रहना। सीढ़ी: ' +
    '20 लाख रुपये से छोटा उद्यम → अपने इलाक़े/देश के समानांतर उद्यम में 1 महीना ख़ुद काम; ' +
    '20 लाख से 1 करोड़ → अपने राज्य का बेहतरीन उद्योग, 15 दिन; ' +
    '1 से 10 करोड़ → देश का best industrial area, 10 दिन; ' +
    '10 करोड़ से ऊपर → अंतरराष्ट्रीय औद्योगिक केंद्र, 5 दिन।</div>' +
    '<div class="pd">न्यूनतम उम्र 16 (16 से 18 पर Guardian-नियम)। न्यूनतम राशि पहले बताई जाती है; पैसा escrow में रहता है; ' +
    'हर यात्री का बीमा व 24×7 आपात-लाइन।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>🗺️ Tour की जानकारी माँगें</button> ' +
    '<span class="soon">tour-इंजन just-in-time — अपने दौर में</span>' +
    '</div>');

const P_EXAMCERT_ENT = (
    '<div class="pcard panel" id="pnl-examcert" data-nav="📝 परीक्षा व प्रमाण पत्र" style="grid-column:1/-1">' +
    '<div class="ph">📝 परीक्षा व प्रमाण पत्र (छोटा नक़्शा)</div>' +
    '<div class="pd">रास्ता: मुफ़्त कोर्स पढ़ो → टेस्ट-2 (workshop-प्रवेश, qualifying) → workshop-प्रशिक्षण → पहली कमाई → ' +
    'उस्ताद-प्रमाणीकरण + HQ की online परीक्षा — दोनों ताले खुलें तभी प्रशिक्षण-पूर्णता का प्रमाण पत्र। ' +
    'workshop में भाग न लें तो आवेदन से online कोर्स-पूर्णता प्रमाण पत्र (उस पर लिखा होगा: "इन्होंने अभी तक प्रैक्टिकल नहीं किया है")।</div>' +
    '<div class="note">हर प्रमाण पत्र पर unique number व QR — दुनिया में कहीं से verify। Lifetime valid।</div>' +
    '</div>');

/* --- Teacher-परिवार (teacher · ustad) के साझा टुकड़े ---
   स्रोत-पंक्तियाँ: rules-consent-teacher/ustad (v1.1-मानक) — दोनों में समान:
   badge-slab + 45-उम्र नियम · 7% lifetime royalty + नॉमिनी · fee min/max ·
   भुगतान 7/10 कार्य-दिवस · hold 60 दिन (सूचना 48 घंटे)। */

const P_TU_EARN = (
    '<div class="pcard panel" id="pnl-earn" data-nav="💰 कमाई व royalty" style="grid-column:1/-1">' +
    '<div class="ph">💰 कमाई व royalty</div>' +
    '<div class="pd"><b>पढ़ाने/सिखाने की fee:</b> आप ख़ुद तय करें — ACS की न्यूनतम से नीचे कभी नहीं, ' +
    'अधिकतम पर कोई बंदिश नहीं। न्यूनतम slab हर सेवा-पेज पर साफ़ दिखती है।</div>' +
    '<div class="pd"><b>कोर्स-royalty:</b> आपका बनाया कोर्स जितनी बार बिके — मूल Course Creator के नाते ' +
    '<b>7 प्रतिशत आजीवन (lifetime)</b> आपको; आपके बाद आपके नॉमिनी को। कोर्स किसी तीसरी भाषा में बने तो ' +
    'उस संस्करण पर भी 7 प्रतिशत आपका ही। royalty और अपनी fee — दोनों साथ मिल सकते हैं।</div>' +
    '<div class="pd"><b>भुगतान-चक्र:</b> भारत में 7 कार्य-दिवस · अंतरराष्ट्रीय 10। किसी जाँच में भुगतान ' +
    'ज़्यादा-से-ज़्यादा 60 दिन रुक सकता है — रोकने की सूचना 48 घंटे के भीतर मिलेगी।</div>' +
    '<span class="soon">कमाई-खाता व रसीदें अगले दौर में यहीं</span>' +
    '</div>');

const P_TU_BADGE = (
    '<div class="pcard panel" id="pnl-badge" data-nav="✅ Verified Badge" style="grid-column:1/-1">' +
    '<div class="ph">✅ Verified Badge</div>' +
    '<div class="pd"><b>शुल्क (365 दिन):</b> गाँव/एरिया 300 रुपये · क़स्बा/जिला-मुख्यालय 600 रुपये · महानगर (Metro) 1,000 रुपये।</div>' +
    '<div class="pd"><b>उम्र-नियम:</b> 45 वर्ष या अधिक उम्र पर badge आपकी मर्ज़ी (वैकल्पिक); 45 से कम उम्र पर ' +
    'अनिवार्य + उम्र-fee x प्रतिशत (x = 45 में से आपकी उम्र घटाकर)। नवीनीकरण हर साल 1 अप्रैल से 31 मार्च के ' +
    'हिसाब से — नवीनीकरण-खिड़की 1 से 25 मार्च।</div>' +
    '<div class="note">वापसी-नियम: सत्यापन से पहले रद्द करें तो 90 प्रतिशत वापस (10 प्रतिशत processing); ' +
    'badge बनने के बाद = (पूरी फीस में से 30 प्रतिशत काटकर) × बचे दिन ÷ 365।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>✅ badge के लिए आवेदन</button> ' +
    '<span class="soon">badge-इंजन अगले दौर में</span>' +
    '</div>');

function P_RULES_LINK(file, who){
  return (
    '<div class="pcard panel" id="pnl-rules" data-nav="📜 मेरा नियम-पत्र" style="grid-column:1/-1">' +
    '<div class="ph">📜 मेरा नियम-पत्र (एग्रीमेंट)</div>' +
    '<div class="pd">' + who + ' के सब नियम — वही जो आपने registration पर स्वीकारे। POSH · POCSO · DPDP का पालन ' +
    'हर हाल में अनिवार्य; किसी शिकायत पर पहले 7-दिन का Show-Cause (अपनी बात रखने का पूरा मौक़ा)।</div>' +
    '<a class="abtn ok" style="display:inline-block;text-decoration:none" target="_blank" rel="noopener" href="/' + file + '">📜 पूरा नियम-पत्र पढ़ें</a>' +
    '</div>');
}

/* --- सिर्फ़ शिक्षक (teacher) --- */
const P_TCH_CONTENT = (
    '<div class="pcard panel" id="pnl-content" data-nav="📖 मेरा content व कोर्स" style="grid-column:1/-1">' +
    '<div class="ph">📖 मेरा content व कोर्स</div>' +
    '<div class="pd">आप अपने नाम से कोर्स/content बनाते हैं — <b>सिर्फ़ मौलिक (अपना लिखा) content</b>; ' +
    'content को समय-समय पर अप-टू-डेट रखना आपका कर्तव्य है। content-चोरी पर तत्काल समाप्ति का नियम है।</div>' +
    '<div class="pd">आपका कोर्स ZM-office की Content Creator टीम ACS-रूप (कक्षा-6 हिंदी · चित्र · जाँच) देकर चमकाती है — ' +
    'मूल रचनाकार का श्रेय और 7 प्रतिशत royalty हमेशा आपकी ही रहती है।</div>' +
    '<div class="pd"><b>आपकी पटरी:</b> एकेडमिक पढ़ाई — वर्ग-6 से PhD तक (स्कूल/कॉलेज/University स्तर)। ' +
    'पुश्तैनी या हाथ के हुनर (सिलाई, मशीन-मरम्मत, काश्तकारी आदि) की हाथ-सिखाई का घर अलग है — उस्ताद।</div>' +
    '<div class="pd"><b>पहचान-नियम:</b> यहाँ आप अपने नाम से पढ़ाते और कमाते हैं। किसी केंद्र के भीतर, केंद्र के ' +
    'नाम से पढ़ाना = केंद्र-प्रशिक्षक — वह व्यवस्था केंद्र के डैशबोर्ड (Dashboard) से चलती है, उसका अलग login नहीं होता।</div>' +
    '<a class="abtn ok" style="background:var(--blue);display:inline-block;text-decoration:none" href="/courses/">🌍 live कोर्स-सूची देखें</a> ' +
    '<span class="soon">कोर्स भेजने का इंजन अगले दौर में</span>' +
    '<div class="note">इंजन बनने तक अपना कोर्स-प्रस्ताव (विषय + छोटा ख़ाका) 🆘 सहायता-पैनल के WhatsApp/Email से भेज सकते हैं।</div>' +
    '</div>');

const P_TCH_LIVE = (
    '<div class="pcard panel" id="pnl-live" data-nav="🎥 Live class" style="grid-column:1/-1">' +
    '<div class="ph">🎥 Live class (व आगे — वाणी)</div>' +
    '<div class="pd">आप अपनी भाषा में live class लेते हैं — fee आप तय करें (ACS न्यूनतम से नीचे नहीं)। ' +
    'समय पर class लेना कर्तव्य है।</div>' +
    '<div class="pd">🌏 आगे का सपना: ACS वाणी से आप अपनी भाषा में पढ़ाएँगे और Global South के बच्चे ' +
    'अपनी-अपनी भाषा में सुनेंगे, अपनी भाषा में सवाल पूछेंगे — निर्माण अपने दौर में, चरण-दर-चरण।</div>' +
    '<span class="soon">live-class इंजन अगले दौर में</span>' +
    '</div>');

/* --- सिर्फ़ उस्ताद (ustad) --- */
const P_UST_CERTIFY = (
    '<div class="pcard panel" id="pnl-certify" data-nav="🎓 शागिर्द-प्रमाणीकरण" style="grid-column:1/-1">' +
    '<div class="ph">🎓 शागिर्द का हुनर-प्रमाणीकरण (आपकी सबसे बड़ी ज़िम्मेदारी)</div>' +
    '<div class="pd">प्रमाण पत्र पर <b>दोहरा-ताला</b> है: <b>पहला ताला आपका</b> — शागिर्द की पहली कमाई के बाद, ' +
    'उसके किए काम का फोटो/वीडियो और पूरा practical देखकर आप हुनर-प्रमाणीकरण देते हैं। ' +
    '<b>दूसरा ताला</b> — HQ के एग्जामिनेशन विभाग की online परीक्षा का नतीजा। दोनों ताले खुलें, ' +
    'तभी प्रशिक्षण-पूर्णता का प्रमाण पत्र बनता है — कोई एक पक्ष अकेला जारी नहीं कर सकता।</div>' +
    '<div class="pd">हाथ के हुनर को सिर्फ़ सिखाने वाला परख सकता है — इसीलिए यह ताला आपके पास है। ' +
    'आपका ईमानदार प्रमाणीकरण ही ACS की दुनिया-भर की साख है; ग़लत/झूठा प्रमाणीकरण गंभीर नियम-उल्लंघन है।</div>' +
    '<div class="note">शागिर्दों के आए सबूत (फोटो/वीडियो) की सूची और प्रमाणीकरण-बटन यहीं दिखेंगे।</div>' +
    '<span class="soon">प्रमाणीकरण-इंजन व समीक्षा-चौकी अगले दौर में</span>' +
    '</div>');

const P_UST_SKILL = (
    '<div class="pcard panel" id="pnl-skill" data-nav="🛠️ मेरा हुनर व workshop" style="grid-column:1/-1">' +
    '<div class="ph">🛠️ मेरा हुनर व workshop</div>' +
    '<div class="pd">उस्ताद की पहचान डिग्री नहीं — <b>हुनर-प्रमाण</b> है: आपके अपने किए काम के फोटो/वीडियो। ' +
    'पुश्तैनी हुनर, बरसों का अनुभव, काश्तकारी — यही आपकी योग्यता है।</div>' +
    '<div class="pd"><b>आपकी पटरी:</b> हुनर/काश्तकारी की हाथ-सिखाई। किताबी एकेडमिक पढ़ाई ' +
    '(वर्ग-6 से PhD) का घर अलग है — शिक्षक।</div>' +
    '<div class="pd">आप workshop (उस्ताद-ज्ञान का स्थान — कम-से-कम 3 साल चला हुआ) से जुड़कर सिखाते हैं। ' +
    'अभ्यास में सुरक्षा पहले; नाबालिग शागिर्द पर POCSO-नियम की ख़ास सावधानी।</div>' +
    '<span class="soon">हुनर-प्रमाण जोड़ने की जगह अगले दौर में</span>' +
    '<div class="note">इंजन बनने तक नए हुनर-प्रमाण (फोटो/वीडियो) 🆘 सहायता-पैनल के WhatsApp/Email से भेज सकते हैं।</div>' +
    '</div>');

const P_UST_MENTOR = (
    '<div class="pcard panel" id="pnl-mentor" data-nav="👥 उस्ताद-जाल" style="grid-column:1/-1">' +
    '<div class="ph">👥 उस्ताद-जाल (कल के उस्ताद)</div>' +
    '<div class="pd">दो-दरवाज़ा नियम: तरक़्क़ी की सीढ़ी पर कुशल-स्तर से ऊपर पहुँचा कर्मी या तो अपना काम (मालिक) ' +
    'शुरू कर सकता है, या ACS-उस्ताद बनकर सिखा सकता है। आपके आज के शागिर्द ही कल के उस्ताद — ' +
    'गाँव-गाँव हुनर सिखाने वालों का जाल यही है।</div>' +
    '</div>');

/* --- संस्था-जोड़ी (center · workshop) के साझा टुकड़े ---
   स्रोत: Constitution (80/7/3/5/5 · fee min/max · छूट-banner · WhatsApp panel ·
   certificate-flow) + Addendum-v2 §19-20 + v2.1-क3 संस्था-दस्तावेज़ नियम +
   rules-consent-center/workshop की समान पंक्तियाँ (badge पर उम्र-fee नहीं)। */

function P_INST_ENROLL(who){
  return (
    '<div class="pcard panel" id="pnl-enroll" data-nav="🎓 Enrollment व Analytics" style="grid-column:1/-1">' +
    '<div class="ph">🎓 Enrollment व Analytics (आपका सबसे बड़ा काम)</div>' +
    '<div class="pd">यहाँ एक जगह दिखेगा: कितने ' + who + ' enroll हुए · किसने कौन-सा कोर्स लिया · कितनी fee चुकाई · ' +
    'कितनों ने परीक्षा दी · पास-प्रतिशत — पूरा हिसाब। enrollment और भुगतान का digital record अपने-आप बनेगा।</div>' +
    '<div class="pd"><b>पक्का नियम:</b> आप सिर्फ़ <b>अपने</b> enroll किए ' + who + ' का हिसाब देखेंगे — कोई पढ़ने वाला ' +
    'कई जगह पढ़ता हो तो हर संस्था को सिर्फ़ अपना दिखता है; उसे अपने सब जगहों का। आँकड़े एक ही खाते से आते हैं — ' +
    'इसलिए कभी नहीं टकराते। यही खाता पढ़ने वाले के dashboard में "मेरे कोर्स" के रूप में दिखता है — ' +
    'आपका Analytics और उसका ब्योरा, दोनों का स्रोत एक ही।</div>' +
    '<span class="soon">enrollment-खाता व analytics-इंजन अगले दौर में</span>' +
    '</div>');
}

const P_INST_EARN = (
    '<div class="pcard panel" id="pnl-earn" data-nav="💰 कमाई व हिस्सा" style="grid-column:1/-1">' +
    '<div class="ph">💰 कमाई व हिस्सा (80 प्रतिशत आपका)</div>' +
    '<div class="pd"><b>कोर्स-आय का बँटवारा:</b> आपकी संस्था 80 प्रतिशत · मूल Course Creator 7 प्रतिशत · ' +
    'भाषा-Content-Creator टीम 3 प्रतिशत · ACS 5 प्रतिशत · State 5 प्रतिशत।</div>' +
    '<div class="pd"><b>fee-नियम:</b> कोर्स-fee आप ख़ुद तय करें — ACS की न्यूनतम slab से नीचे कभी नहीं, ' +
    'अधिकतम पर कोई बंदिश नहीं। branding मुफ़्त है।</div>' +
    '<div class="pd"><b>भीतर का बँटवारा:</b> आपकी संस्था के भीतर के शिक्षक/उस्ताद से हिस्सा-बाँट आपका ' +
    'आपसी (internal) मामला है — ACS उसमें कभी नहीं घुसता; ACS संस्था-इकाई को 80 प्रतिशत देता है, बस।</div>' +
    '<div class="pd"><b>भुगतान-चक्र:</b> भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; किसी जाँच में hold ज़्यादा-से-ज़्यादा ' +
    '60 दिन — सूचना 48 घंटे के भीतर।</div>' +
    '<span class="soon">कमाई-खाता व रसीदें अगले दौर में</span>' +
    '</div>');

const P_INST_OFFER = (
    '<div class="pcard panel" id="pnl-offer" data-nav="🏷️ छूट व WhatsApp" style="grid-column:1/-1">' +
    '<div class="ph">🏷️ छूट-banner व WhatsApp panel</div>' +
    '<div class="pd"><b>छूट-banner:</b> आप अपने enrolled पढ़ने वालों को छूट दे सकते हैं — छूट की सीमा आप तय करें, ' +
    'पर अंतिम fee कभी ACS-न्यूनतम slab से नीचे न जाए। छूट-प्रतिशत का master-button HQ/Founder के पास है — ' +
    'एक जगह बदलते ही सब जगह दिखता है।</div>' +
    '<div class="pd"><b>WhatsApp panel:</b> अपना मोबाइल जोड़कर enrolled व सहमति देने वाले पढ़ने वालों को ' +
    'एक साथ संदेश — <b>सिर्फ़ उन्हीं को</b>, बाहर के नंबरों को कभी नहीं।</div>' +
    '<span class="soon">दोनों इंजन अगले दौर में</span>' +
    '</div>');

function P_INST_VERIFY(extra, opts){
  /* (काम-9 दौर-प · item-5) employer के लिए optional-मोड: संस्था वैकल्पिक (व्यक्तिगत
     नियोक्ता संभव — v2.2-क3)। नाम/nav वही "🏛️ संस्था-सत्यापन" (नाम-एकरूपता)।
     default-शाखा हूबहू पुरानी — center/workshop/vendor byte-अछूते। */
  if(opts && opts.optional) return (
    '<div class="pcard panel" id="pnl-verify" data-nav="🏛️ संस्था-सत्यापन" style="grid-column:1/-1">' +
    '<div class="ph">🏛️ संस्था-सत्यापन व दस्तावेज़ (वैकल्पिक)</div>' +
    '<div class="pd">आपके लिए संस्था होना ज़रूरी नहीं — <b>व्यक्तिगत नियोक्ता</b> भी जुड़ सकता है। ' +
    'संस्था हो तो संस्था-दस्तावेज़ (नाम-बोर्ड वाला बाहर-फ़ोटो · अंदर-फ़ोटो · पंजीकरण/लाइसेंस) से भरोसा ' +
    'और बढ़ता है।' + (extra||'') + ' हर दस्तावेज़ अधिकतम 2MB।</div>' +
    '<div class="pd">संस्था दर्ज करने पर RM उसका भौतिक-सत्यापन करते हैं — तब वह approval-श्रृंखला के साथ ' +
    'आपकी पहचान को और पुख़्ता करता है (प्रदर्शन-नियम)।</div>' +
    '</div>');
  return (
    '<div class="pcard panel" id="pnl-verify" data-nav="🏛️ संस्था-सत्यापन" style="grid-column:1/-1">' +
    '<div class="ph">🏛️ संस्था-सत्यापन व दस्तावेज़</div>' +
    '<div class="pd">संस्था के लिए दस्तावेज़-नियम: मालिक के अपने पहचान-दस्तावेज़ + संस्था का बाहर से फ़ोटो ' +
    '(नाम-बोर्ड दिखता हुआ) + अंदर का फ़ोटो + पंजीकरण/लाइसेंस।' + (extra||'') + '</div>' +
    '<div class="pd">RM आपकी संस्था का भौतिक-सत्यापन करते हैं — उसके और approval-श्रृंखला के पूरा हुए बिना ' +
    'आपका नाम portal पर नहीं दिखता (प्रदर्शन-नियम)। हर दस्तावेज़ अधिकतम 2MB।</div>' +
    '</div>');
}

const P_INST_BADGE = (
    '<div class="pcard panel" id="pnl-badge" data-nav="✅ Verified Badge" style="grid-column:1/-1">' +
    '<div class="ph">✅ Verified Badge (संस्था-स्तर)</div>' +
    '<div class="pd"><b>शुल्क (365 दिन):</b> एरिया/गाँव 300 रुपये · जिला-मुख्यालय 600 रुपये · महानगर (Metro) 1,000 रुपये। ' +
    'यह संस्था-स्तर का badge है — <b>उम्र-fee नहीं लगती</b>। badge आपकी मर्ज़ी (वैकल्पिक); badge वाली संस्था को ' +
    'सूची में भरोसा व प्राथमिकता, पर बिना badge भी काम चलता रहता है।</div>' +
    '<div class="note">नवीनीकरण हर साल 1 अप्रैल से 31 मार्च के हिसाब से — खिड़की 1 से 25 मार्च। ' +
    'वापसी: सत्यापन से पहले 90 प्रतिशत; badge बनने के बाद = (पूरी फीस में से 30 प्रतिशत काटकर) × बचे दिन ÷ 365।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>✅ badge के लिए आवेदन</button> ' +
    '<span class="soon">badge-इंजन अगले दौर में</span>' +
    '</div>');

/* --- सिर्फ़ केंद्र (center) --- */
const P_CTR_TEAM = (
    '<div class="pcard panel" id="pnl-team" data-nav="👥 केंद्र की टीम" style="grid-column:1/-1">' +
    '<div class="ph">👥 केंद्र की टीम (अंदर का ढाँचा)</div>' +
    '<div class="pd">केंद्र-पैनल के भीतर चार जगहें: <b>Owner (मालिक)</b> — अंदर का mode, अलग login नहीं · ' +
    '<b>संचालक/Staff</b> — केंद्र चलाने वाले · <b>केंद्र-प्रशिक्षक</b> — केंद्र के नाम से पढ़ाते हैं ' +
    '(पहचान केंद्र की, अलग login नहीं) · <b>Call Center</b> — अपने पढ़ने वालों की मदद का panel।</div>' +
    '<div class="note">जो शिक्षक अपने नाम से पढ़ाना-कमाना चाहें, वे अलग से "शिक्षक" भूमिका में जुड़ें — ' +
    'वहाँ royalty व अपनी fee दोनों मिलती हैं।</div>' +
    '<span class="soon">टीम-जोड़ने का इंजन अगले दौर में</span>' +
    '</div>');

const P_CTR_CERT = (
    '<div class="pcard panel" id="pnl-certflow" data-nav="🏆 Certificate-नियम" style="grid-column:1/-1">' +
    '<div class="ph">🏆 Certificate का पक्का रास्ता</div>' +
    '<div class="pd">प्रमाण पत्र सिर्फ़ असली रास्ते से बनता है: <b>Exam → Result → Certificate</b> — ' +
    'कोई हाथ का रास्ता (manual bypass) नहीं। हर certificate पर दो नाम साफ़ दिखते हैं: ' +
    'देने वाला FFGPMTrust + पढ़ाने वाला ACS। हर certificate पर unique number व QR — दुनिया में कहीं से verify।</div>' +
    '<div class="note">⚠️ फ़र्ज़ी certificate बनाना/दिलाना = तत्काल समाप्ति व कानूनी कार्रवाई।</div>' +
    '</div>');

/* --- सिर्फ़ workshop --- */
const P_WS_TRAIN = (
    '<div class="pcard panel" id="pnl-train" data-nav="🛠️ प्रशिक्षण व apprenticeship" style="grid-column:1/-1">' +
    '<div class="ph">🛠️ प्रशिक्षण व apprenticeship</div>' +
    '<div class="pd">आपके पास शागिर्द <b>टेस्ट-2 (workshop-प्रवेश)</b> पास करके आते हैं। प्रशिक्षण paid व स्थानीय है — ' +
    'अवधि कोर्स की प्रकृति से 15 से 300 दिन। यहीं हाथ का असली काम सीखा जाता है — ' +
    'शागिर्द की <b>पहली कमाई</b> तक का रास्ता आपके workshop से होकर जाता है।</div>' +
    '<div class="pd">प्रशिक्षण के बाद: शागिर्द अपने काम का फोटो/वीडियो भेजता है → उस्ताद हुनर-प्रमाणीकरण देते हैं → ' +
    'HQ की online परीक्षा — दोनों ताले खुलें तभी प्रशिक्षण-पूर्णता का प्रमाण पत्र।</div>' +
    '<span class="soon">प्रशिक्षण-batch इंजन अगले दौर में</span>' +
    '</div>');


/* (18-Jul-2026, चरण-5 · होल-M) केंद्र का सुरक्षा-पैनल — workshop की तर्ज़ पर,
   केंद्र-रूप में: 10-18 Guardian-सहमति (Constitution) · POCSO · नियम-11 सुविधाएँ */
const P_CTR_SAFE = (
    '<div class="pcard panel" id="pnl-safety" data-nav="🛡️ सुरक्षा-नियम" style="grid-column:1/-1">' +
    '<div class="ph">🛡️ केंद्र-सुरक्षा (सबसे पहले)</div>' +
    '<div class="pd">केंद्र में 10 से 18 साल के बच्चे भी पढ़ते हैं — उनकी सुरक्षा पहला नियम है: ' +
    'POCSO-कानून की ख़ास सावधानी; 10 से 18 वालों पर Guardian (अभिभावक) की सहमति अनिवार्य। ' +
    'भवन में अग्निशमन-व्यवस्था, बिजली-तारों की सुरक्षा, साफ़ पेयजल व बच्चों के लिए अलग शौचालय — ' +
    'नियम-11 की सुविधाएँ हमेशा चालू हालत में रहें।</div>' +
    '<div class="note">कोई गंभीर घटना हो तो तुरंत अपने RM/ZM को सूचना दें।</div>' +
    '</div>');

/* (18-Jul-2026, चरण-5 · होल-M) workshop का certificate-पैनल — P_CTR_CERT की तर्ज़ पर,
   + v2.5 दोहरा-ताला (उस्ताद-प्रमाणीकरण + स्वतंत्र परीक्षा) */
const P_WS_CERT = (
    '<div class="pcard panel" id="pnl-certflow" data-nav="🏆 Certificate-नियम" style="grid-column:1/-1">' +
    '<div class="ph">🏆 Certificate का पक्का रास्ता (दोहरा-ताला)</div>' +
    '<div class="pd">प्रमाण पत्र सिर्फ़ असली रास्ते से बनता है: <b>Exam → Result → Certificate</b> — ' +
    'कोई हाथ का रास्ता (manual bypass) नहीं। प्रशिक्षण-पूर्णता पर <b>दो ताले</b> खुलने ज़रूरी: ' +
    '(1) उस्ताद का हुनर-प्रमाणीकरण — शागिर्द के अपने काम के फोटो/वीडियो-सबूत के साथ; ' +
    '(2) एग्जामिनेशन-विभाग की स्वतंत्र online परीक्षा का result। कोई एक पक्ष अकेला certificate ' +
    'जारी नहीं कर सकता। हर certificate पर FFGPMTrust + ACS दोनों नाम, unique number व QR — ' +
    'दुनिया में कहीं से verify।</div>' +
    '<div class="note">⚠️ फ़र्ज़ी certificate बनाना/दिलाना = तत्काल समाप्ति व कानूनी कार्रवाई।</div>' +
    '</div>');
const P_WS_USTAD = (
    '<div class="pcard panel" id="pnl-ustads" data-nav="🧑‍🔧 मेरे उस्ताद" style="grid-column:1/-1">' +
    '<div class="ph">🧑‍🔧 मेरे उस्ताद</div>' +
    '<div class="pd">Workshop = उस्ताद-ज्ञान का स्थान। आपके यहाँ सिखाने वाले उस्तादों की सूची यहीं रहेगी — ' +
    'उस्ताद की पहचान डिग्री नहीं, हुनर-प्रमाण है (उनके अपने काम के फोटो/वीडियो)। ' +
    'शागिर्दों का हुनर-प्रमाणीकरण इन्हीं उस्तादों से निकलता है।</div>' +
    '<span class="soon">उस्ताद-जोड़ने का इंजन अगले दौर में</span>' +
    '</div>');

const P_WS_SAFE = (
    '<div class="pcard panel" id="pnl-safety" data-nav="🛡️ सुरक्षा-नियम" style="grid-column:1/-1">' +
    '<div class="ph">🛡️ अभ्यास-सुरक्षा (सबसे पहले)</div>' +
    '<div class="pd">हाथ के काम में सुरक्षा पहला पाठ है — औज़ार, आग, बिजली, धार: हर अभ्यास सुरक्षा-नियम से। ' +
    'नाबालिग शागिर्द पर POCSO-नियम की ख़ास सावधानी — 16 से 18 वालों का प्रशिक्षण सिर्फ़ Guardian (अभिभावक) ' +
    'की सहमति से; 5, 10, 15 या 30-दिवसीय कैंप भी संस्था की देखरेख में ही।</div>' +
    '<div class="pd">⛺ <b>कैंप-मेज़बानी:</b> जहाँ workshop नहीं, वहाँ 10 या ज़्यादा पास-विद्यार्थियों के निवेदन पर ' +
    'RM/ZM कैंप लगवाते हैं — आपकी संस्था मेज़बान बन सकती है।</div>' +
    '</div>');

/* --- counselor · employer · foreign-agent के टुकड़े ---
   स्रोत-पंक्तियाँ (rules-consent फ़ाइलों से मिलान-जाँची): counselor 90/5/5 ·
   5-वर्ष अनुभव · 1-घंटा cancel=90% दोनों ओर · 45-नियम badge; employer शून्य
   worker-शुल्क · platform-fee सीधे ACS को · आदरपूर्ण व्यवहार · contact सिर्फ़
   dashboard; agent 90/5/5 · commission केवल employer से · eMigrate/RA के बिना
   कार्य नहीं · UNCITRAL। */

/* --- सिर्फ़ सलाहकार (counselor) --- */
const P_CNS_SERVICE = (
    '<div class="pcard panel" id="pnl-service" data-nav="🧭 मेरी सलाह-सेवा" style="grid-column:1/-1">' +
    '<div class="ph">🧭 मेरी सलाह-सेवा</div>' +
    '<div class="pd"><b>पात्रता:</b> कम-से-कम 5 वर्ष का अनुभव — उम्र की कोई शर्त नहीं। ' +
    'अनुभव ही आपकी पहचान है।</div>' +
    '<div class="pd"><b>5-मिनट free preview (अनिवार्य):</b> हर पढ़ने वाले को booking से पहले 5 मिनट की ' +
    'मुफ़्त बातचीत ज़रूर मिलती है — इसी से वह आप पर भरोसा करना सीखता है।</div>' +
    '<div class="pd"><b>fee-नियम:</b> सलाह-fee आप ख़ुद तय करें — ACS की न्यूनतम slab से नीचे कभी नहीं, ' +
    'अधिकतम पर कोई बंदिश नहीं।</div>' +
    '<span class="soon">booking-इंजन अगले दौर में — तब यहीं समय-तालिका व booking दिखेंगी</span>' +
    '</div>');

const P_CNS_APTITUDE = (
    '<div class="pcard panel" id="pnl-aptlink" data-nav="🧠 Aptitude-जुड़ाव" style="grid-column:1/-1">' +
    '<div class="ph">🧠 Aptitude टेस्ट से आपका जुड़ाव</div>' +
    '<div class="pd">सलाह का रास्ता Aptitude टेस्ट से <b>पहले भी</b> खुला है और नतीजे के <b>बाद भी</b> — ' +
    'दोनों रास्तों से पढ़ने वाले आप तक पहुँचते हैं।</div>' +
    '<div class="pd"><b>आपका पहला काम:</b> नतीजे में जिन बच्चों की "अनजान क्षेत्र" सूची लंबी हो ' +
    '(जिन सवालों पर बहुत बार "जानता नहीं" चुना) — उन्हें वे क्षेत्र खोलकर दिखाना। ' +
    'याद रखें: सलाह सिर्फ़ दिशा है — "यही आपका भविष्य है" या "100 प्रतिशत गारंटी" जैसी बात कभी नहीं।</div>' +
    '</div>');

const P_CNS_EARN = (
    '<div class="pcard panel" id="pnl-earn" data-nav="💰 कमाई (90 प्रतिशत)" style="grid-column:1/-1">' +
    '<div class="ph">💰 कमाई व रद्द-नियम</div>' +
    '<div class="pd"><b>बँटवारा:</b> Counselor 90 प्रतिशत · State 5 प्रतिशत · ACS 5 प्रतिशत।</div>' +
    '<div class="pd"><b>रद्द-नियम (दोनों ओर बराबर):</b> booking से 1 घंटा पहले तक cancel होने पर पढ़ने वाले को ' +
    '90 प्रतिशत वापसी — चाहे वह cancel करे या आप ख़ुद। आपकी कमाई उसी हिसाब से बनेगी।</div>' +
    '<div class="pd"><b>भुगतान-चक्र:</b> भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; किसी जाँच में hold ' +
    'ज़्यादा-से-ज़्यादा 60 दिन — सूचना 48 घंटे के भीतर।</div>' +
    '<span class="soon">कमाई-खाता व रसीदें अगले दौर में</span>' +
    '</div>');

/* --- सिर्फ़ नियोक्ता (employer) --- */
const P_EMP_DEMAND = (
    '<div class="pcard panel" id="pnl-demand" data-nav="💼 मेरी माँग (जॉब-रोल)" style="grid-column:1/-1">' +
    '<div class="ph">💼 मेरी माँग — जॉब-रोल के हिसाब से</div>' +
    '<div class="pd">यहाँ आप अपनी माँग दर्ज करेंगे: <b>कौन-सा जॉब-रोल</b> चाहिए · कितने लोग · कहाँ (देश/विदेश)। ' +
    'आपकी यही माँग जुड़कर कोर्स व उद्यम-पेजों पर "अवसर-संख्या" बनकर दिखती है — गिनती की इकाई जॉब-रोल है, ' +
    'ताकि पढ़ने वाला जान सके कि किस काम के कितने असली मौक़े हैं।</div>' +
    '<span class="soon">माँग-इंजन अगले दौर में</span>' +
    '</div>');

const P_EMP_FIND = (
    '<div class="pcard panel" id="pnl-find" data-nav="🧑‍🔧 worker खोज" style="grid-column:1/-1">' +
    '<div class="ph">🧑‍🔧 worker/job-seeker खोज</div>' +
    '<div class="pd">dashboard से जुड़े job-seekers खोजना — Green Tick badge वाले सूची में पहले दिखते हैं, ' +
    'पर बिना badge वाले भी पूरे हक़ से apply कर सकते हैं।</div>' +
    '<div class="pd"><b>पक्के नियम:</b> हर संपर्क सिर्फ़ dashboard के माध्यम से — बाहर के रास्ते नहीं। ' +
    'worker से आदरपूर्ण व सेवा-भाव का व्यवहार अनिवार्य है। worker/job-seeker की निजी जानकारी ' +
    'किसी बाहरी platform पर साझा करना मना है (DPDP)।</div>' +
    '<span class="soon">खोज-इंजन approval-श्रृंखला के साथ अगले दौर में</span>' +
    '</div>');

const P_EMP_ZERO = (
    '<div class="pcard panel" id="pnl-zerofee" data-nav="🆓 शून्य-शुल्क नियम" style="grid-column:1/-1">' +
    '<div class="ph">🆓 शून्य-शुल्क नियम (अत्यंत महत्वपूर्ण)</div>' +
    '<div class="pd">आपके लिए ACS से जुड़ना अभी पूरी तरह <b>मुफ़्त</b> है। और सबसे बड़ा नियम: ' +
    '<b>worker या job-seeker से किसी भी प्रकार का शुल्क लेना पूरी तरह निषिद्ध है</b> — ' +
    'job दिलाने के बदले वसूली गंभीर नियम-उल्लंघन है।</div>' +
    '<div class="note">स्पष्टीकरण: job-seeker अपनी platform-उपयोग फ़ीस सीधे ACS को देता है — ' +
    'उसका आपसे या आपके ज़रिए कोई लेना-देना नहीं।</div>' +
    '</div>');

const P_EMP_HIRE = (
    '<div class="pcard panel" id="pnl-hire" data-nav="⚖️ भर्ती-नियम" style="grid-column:1/-1">' +
    '<div class="ph">⚖️ भर्ती के पक्के नियम</div>' +
    '<div class="pd">असली job व joining सिर्फ़ <b>18 साल या ऊपर</b> वालों की — नाबालिग को job देना निषिद्ध। ' +
    'POSH · POCSO · DPDP का पालन हर हाल में। किसी शिकायत पर पहले 7-दिन का Show-Cause — ' +
    'अपनी बात रखने का पूरा मौक़ा।</div>' +
    '</div>');

/* (काम-9 दौर-प · item-5) P_EMP_IDENTITY हटाया — employer अब साझा
   P_INST_VERIFY("", {optional:true}) उपयोग करता है (नाम-एकरूपता + single-source)। */

/* --- सिर्फ़ विदेश एजेंट (foreign-agent) --- */
const P_FA_WORK = (
    '<div class="pcard panel" id="pnl-fawork" data-nav="🌏 मेरा काम" style="grid-column:1/-1">' +
    '<div class="ph">🌏 मेरा काम — विदेश-रोजगार का पुल</div>' +
    '<div class="pd">आप job-seeker और विदेशी नियोक्ता (employer) के बीच का भरोसेमंद पुल हैं। ' +
    'आपके इस घर में <b>कई employers की सूची</b> एक साथ रहेगी — हर employer की माँग, देश और शर्तें एक जगह।</div>' +
    '<span class="soon">employer-सूची इंजन अगले दौर में</span>' +
    '</div>');

const P_FA_LICENSE = (
    '<div class="pcard panel" id="pnl-license" data-nav="🛂 eMigrate व लाइसेंस" style="grid-column:1/-1">' +
    '<div class="ph">🛂 eMigrate/RA लाइसेंस (अनिवार्य)</div>' +
    '<div class="pd"><b>eMigrate/RA लाइसेंस के बिना पंजीकरण या कार्य नहीं होगा</b> — यह सबसे पहला दरवाज़ा है। ' +
    'eMigrate व लागू श्रम-नियमों का पूरा पालन हर भर्ती में अनिवार्य। ' +
    'अंतरराष्ट्रीय विवाद में UNCITRAL नियम मान्य होंगे।</div>' +
    '<div class="note">आपका लाइसेंस-नंबर registration में दर्ज होता है — RM-सत्यापन में यही जाँचा जाता है।</div>' +
    '</div>');

const P_FA_EARN = (
    '<div class="pcard panel" id="pnl-earn" data-nav="💰 कमाई (90 प्रतिशत)" style="grid-column:1/-1">' +
    '<div class="ph">💰 कमाई व commission-नियम</div>' +
    '<div class="pd"><b>बँटवारा:</b> Agent 90 प्रतिशत · ACS 5 प्रतिशत · State 5 प्रतिशत।</div>' +
    '<div class="pd"><b>लोहे का नियम:</b> commission <b>केवल employer से</b> मिलेगा — बच्चे/worker/job-seeker से ' +
    'किसी भी प्रकार का commission या शुल्क कभी नहीं। job-seeker अपनी platform-fee सीधे ACS को देता है। ' +
    'उल्लंघन = तत्काल कार्रवाई।</div>' +
    '<div class="pd"><b>भुगतान-चक्र:</b> भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; hold ज़्यादा-से-ज़्यादा 60 दिन — ' +
    'सूचना 48 घंटे के भीतर।</div>' +
    '<span class="soon">कमाई-खाता व रसीदें अगले दौर में</span>' +
    '</div>');

const P_FA_JOBSEEKERS = (
    '<div class="pcard panel" id="pnl-fajs" data-nav="🧑‍🔧 job-seeker जुड़ाव" style="grid-column:1/-1">' +
    '<div class="ph">🧑‍🔧 job-seeker जुड़ाव</div>' +
    '<div class="pd">आप सिर्फ़ <b>18 साल या ऊपर</b> के job-seekers को विदेश-रोजगार से जोड़ सकते हैं। ' +
    'हर संपर्क सिर्फ़ dashboard के माध्यम से; job-seeker की निजी जानकारी किसी बाहरी platform पर ' +
    'साझा करना मना है (DPDP)। सत्यापित job-seeker सूची approval-श्रृंखला के साथ यहीं दिखेगी।</div>' +
    '<span class="soon">जुड़ाव-इंजन अगले दौर में</span>' +
    '</div>');

/* --- volunteer · finance-mitra · vendor के टुकड़े (चरण-6, अंतिम) ---
   स्रोत-पंक्तियाँ rules-consent फ़ाइलों से मिलान-जाँची: volunteer "RM के मार्गदर्शन
   में" · "RM-पात्रता बनती है — अवसर है, गारंटी नहीं"; finance-mitra "फ़ाइल-चार्ज/
   processing/अग्रिम/मिठाई — किसी नाम पर नहीं" · "अग्रिम-वसूली = तत्काल निष्कासन
   व कानूनी कार्रवाई" · PMMY/PMEGP/Stand-Up India; vendor "ACS सौदे की राशि न
   लेगा, न रखेगा, न guarantee"। v2.0-घ: volunteer मानदेय नहीं — सिर्फ़ कमीशन। */

/* --- सिर्फ़ स्वयंसेवक (volunteer — dual-घर का external-रूप) --- */
const P_VOL_SEVA = (
    '<div class="pcard panel" id="pnl-seva" data-nav="🤝 मेरा सेवा-काम" style="grid-column:1/-1">' +
    '<div class="ph">🤝 मेरा सेवा-काम</div>' +
    '<div class="pd">आप सेवा-भाव से जुड़े हैं — ACS की बात गाँव-गाँव पहुँचाना आपका काम है: लोगों को RM से मिलाना, ' +
    'सत्यापन (verification) में सहयोग, और अपने इलाक़े के केंद्र, उस्ताद, workshop व उद्योग-घरों को ' +
    'ACS-नेटवर्क से जोड़ने में मदद। हर काम <b>RM के मार्गदर्शन में</b> होगा।</div>' +
    '<div class="pd">यह field में सीखने का रास्ता भी है — ज़मीन पर काम करते-करते आप ACS की पूरी व्यवस्था ' +
    'भीतर से समझ जाते हैं।</div>' +
    '<span class="soon">काम-सूची व field-इंजन approval के बाद team-रूप में यहीं</span>' +
    '</div>');

const P_VOL_PATH = (
    '<div class="pcard panel" id="pnl-volpath" data-nav="🛤️ आगे का रास्ता" style="grid-column:1/-1">' +
    '<div class="ph">🛤️ आगे का रास्ता (टीम तक)</div>' +
    '<div class="pd">approval पूरा होते ही आप RM-स्तर की टीम में स्वयंसेवक के रूप में जुड़ जाते हैं — ' +
    'तब <b>यही घर team-रूप में खुलेगा</b>: मिला काम, रिपोर्ट-चक्र, टीम-पैनल।</div>' +
    '<div class="pd">अच्छे काम से आगे <b>RM-पात्रता बनती है</b> (तब RM के सभी नियम व approval लागू होंगे) — ' +
    'यह एक अवसर है, गारंटी नहीं। स्वयंसेवक की पहचान Intern से अलग है — Intern टीम-कर्मी है, ' +
    'आप सेवा-भाव के साथी।</div>' +
    '</div>');

const P_VOL_EARN = (
    '<div class="pcard panel" id="pnl-earn" data-nav="💰 कमाई-नियम" style="grid-column:1/-1">' +
    '<div class="ph">💰 कमाई का साफ़ नियम</div>' +
    '<div class="pd">स्वयंसेवक को <b>कोई वेतन या मानदेय नहीं मिलता — सिर्फ़ कमीशन</b>: जो काम (जुड़ाव/सेवा) ' +
    'आपके सहयोग से पूरा हो, उस पर नियम-अनुसार कमीशन। यह पहले ही साफ़ लिखा है ताकि कोई झूठी उम्मीद न बने।</div>' +
    '<div class="pd"><b>भुगतान-चक्र:</b> भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; hold ज़्यादा-से-ज़्यादा 60 दिन — ' +
    'सूचना 48 घंटे के भीतर।</div>' +
    '<span class="soon">कमीशन-खाता अगले दौर में</span>' +
    '</div>');

/* --- सिर्फ़ वित्त मित्र (finance-mitra) --- */
const P_FM_BRIDGE = (
    '<div class="pcard panel" id="pnl-bridge" data-nav="🌉 मेरा काम — पुल" style="grid-column:1/-1">' +
    '<div class="ph">🌉 मेरा काम — उद्यमी और संस्था के बीच पुल</div>' +
    '<div class="pd">आप उद्यमी को <b>अधिकृत वित्तीय संस्थाओं</b> से जोड़ते हैं: बैंक · सरकारी योजनाएँ ' +
    '(जैसे PMMY/मुद्रा, PMEGP, Stand-Up India) · पंजीकृत NBFC · CSR। ACS ख़ुद कभी बैंक या निवेशक नहीं — ' +
    'आप ही वह भरोसेमंद पुल हैं।</div>' +
    '<div class="pd"><b>सीमा-रेखा:</b> loan का अंतिम फ़ैसला हमेशा अधिकृत संस्था का; उद्यम का अंतिम फ़ैसला ' +
    'हमेशा उद्यमी का। आप राह दिखाते हैं — फ़ैसला नहीं थोपते।</div>' +
    '<span class="soon">उद्यमी-जुड़ाव इंजन अगले दौर में</span>' +
    '</div>');

const P_FM_ZERO = (
    '<div class="pcard panel" id="pnl-zerofee" data-nav="🚫 अग्रिम-निषेध" style="grid-column:1/-1">' +
    '<div class="ph">🚫 शून्य-शुल्क व अग्रिम-निषेध (अत्यंत महत्वपूर्ण)</div>' +
    '<div class="pd">उद्यमी/Learner से <b>किसी भी नाम पर</b> — "फ़ाइल-चार्ज", "processing", "अग्रिम", "मिठाई" — ' +
    'कोई भी राशि लेना पूर्णतः निषिद्ध व अवैध है। आपकी कमाई सिर्फ़ संस्था के कमीशन से होती है।</div>' +
    '<div class="note">⚠️ अग्रिम-वसूली भारत में प्रचलित सबसे बड़ी धोखाधड़ी है — ACS में इसकी सज़ा ' +
    'तत्काल निष्कासन व कानूनी कार्रवाई है।</div>' +
    '</div>');

const P_FM_AUTH = (
    '<div class="pcard panel" id="pnl-auth" data-nav="🛂 अधिकृति-प्रमाण" style="grid-column:1/-1">' +
    '<div class="ph">🛂 अधिकृति-प्रमाण (अनिवार्य)</div>' +
    '<div class="pd">आप जिस संस्था/योजना से जोड़ने का काम करेंगे, उसकी <b>अधिकृति/empanelment का प्रमाण अनिवार्य</b> है — ' +
    'RM-सत्यापन में यही जाँचा जाता है। भौतिक-सत्यापन व approval-श्रृंखला पूरी हुए बिना आपका नाम ' +
    'portal पर कभी नहीं दिखता (प्रदर्शन-नियम)।</div>' +
    '</div>');

const P_FM_EARN = (
    '<div class="pcard panel" id="pnl-earn" data-nav="💰 कमाई-नियम" style="grid-column:1/-1">' +
    '<div class="ph">💰 कमाई-नियम</div>' +
    '<div class="pd">आपकी कमाई <b>सिर्फ़ संस्था के कमीशन/मानदेय से</b> — उद्यमी से शून्य। ' +
    'ACS-revenue का बँटवारा भविष्य में Founder तय करेंगे — तब यहीं दर्ज होगा।</div>' +
    '<div class="pd"><b>भुगतान-चक्र:</b> भारत 7 कार्य-दिवस · अंतरराष्ट्रीय 10; hold ज़्यादा-से-ज़्यादा 60 दिन — ' +
    'सूचना 48 घंटे के भीतर।</div>' +
    '<span class="soon">कमीशन-खाता अगले दौर में</span>' +
    '</div>');

/* --- सिर्फ़ विक्रेता (vendor) --- */
const P_VND_GOODS = (
    '<div class="pcard panel" id="pnl-goods" data-nav="🧾 मेरी सेवाएँ/सामान" style="grid-column:1/-1">' +
    '<div class="ph">🧾 मेरी सेवाएँ व सामान</div>' +
    '<div class="pd">उद्यम खड़ा करने वाले को जो-जो चाहिए, वही आपका बाज़ार है — छह श्रेणियाँ: ' +
    'यंत्र-बिक्री · कच्चा-माल · packaging · license/compliance-सहायता · marketing/branding · export-सहायता। ' +
    'approval के बाद आपकी listing उद्यमी के "मेरे सहयोगी" पैनल में दिखेगी।</div>' +
    '<span class="soon">listing-इंजन अगले दौर में</span>' +
    '</div>');

const P_VND_DEAL = (
    '<div class="pcard panel" id="pnl-deal" data-nav="⚖️ लेन-देन-नियम" style="grid-column:1/-1">' +
    '<div class="ph">⚖️ लेन-देन का साफ़ नियम</div>' +
    '<div class="pd">ACS मंच (platform) है — आपके और ख़रीदार के बीच किसी सौदे का पक्ष नहीं। ' +
    'सौदे की राशि, guarantee, delivery, गुणवत्ता व विवाद — सबकी ज़िम्मेदारी सीधे विक्रेता-ख़रीदार की। ' +
    '<b>ACS सौदे की राशि न लेगा, न रखेगा, न उसकी guarantee देगा।</b></div>' +
    '<div class="pd">ईमानदार दाम और असली माल — यही आपकी और पूरे नेटवर्क की साख है।</div>' +
    '</div>');

/* --- साझा: सादा Verified Badge (vendor · finance-mitra — v1.7/v1.9 दर्ज slab) --- */
const P_SIMPLE_BADGE = (
    '<div class="pcard panel" id="pnl-badge" data-nav="✅ Verified Badge" style="grid-column:1/-1">' +
    '<div class="ph">✅ Verified Badge (वैकल्पिक)</div>' +
    '<div class="pd"><b>शुल्क (365 दिन):</b> गाँव/एरिया 300 रुपये · क़स्बा/जिला-मुख्यालय 600 रुपये · ' +
    'महानगर (Metro) 1,000 रुपये। badge लेना आपकी मर्ज़ी — badge वाले को सूची में भरोसा व प्राथमिकता।</div>' +
    '<div class="note">साफ़ समझ: badge सत्यापन का दरवाज़ा नहीं है — RM भौतिक-सत्यापन व approval-श्रृंखला ' +
    'हर हाल में अनिवार्य व अलग चीज़ है; badge उसके बाद का अतिरिक्त भरोसा-चिह्न है। बाक़ी शर्तें नियम-पत्र में।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>✅ badge के लिए आवेदन</button> ' +
    '<span class="soon">badge-इंजन अगले दौर में</span>' +
    '</div>');

/* (काम-9 दौर-प · item-2) व्यक्ति-सुरक्षा — teacher · ustad · counselor साझा।
   संस्था-सुरक्षा (P_CTR_SAFE/P_WS_SAFE भवन-नियम-11) से अलग: यहाँ व्यक्ति सीधे 10-18
   से मिलता है। पाठ rules-consent-teacher/ustad/counselor से मिलान-जाँचा (POSH·POCSO·
   DPDP·Show-Cause तीनों में मौजूद)। */
const P_IND_SAFE = (
    '<div class="pcard panel" id="pnl-safety" data-nav="🛡️ सुरक्षा-नियम" style="grid-column:1/-1">' +
    '<div class="ph">🛡️ सुरक्षा व मर्यादा (सबसे पहले)</div>' +
    '<div class="pd">आपके पास 10 से 18 साल के बच्चे भी सीखने/सलाह के लिए आते हैं — उनकी सुरक्षा पहला नियम है: ' +
    'POCSO-कानून की ख़ास सावधानी; 10 से 18 वालों के साथ हर काम सिर्फ़ Guardian (अभिभावक) की सहमति से। ' +
    'हर व्यवहार में POSH (उत्पीड़न-रोक) व DPDP (निजता) का पूरा पालन।</div>' +
    '<div class="note">किसी शिकायत पर पहले 7-दिन का Show-Cause (अपनी बात रखने का पूरा मौक़ा); ' +
    'कोई गंभीर घटना हो तो तुरंत अपने RM/ZM व ACS को सूचना दें।</div>' +
    '</div>');

/* (काम-9 दौर-प · item-3) प्रचार-किट — सभी सेवा-बेचने वाले (center·workshop·teacher·
   ustad·counselor) साझा। ईमानदार-पैनल: इंजन नहीं बना → बटन disabled + chip। */
const P_PROMO = (
    '<div class="pcard panel" id="pnl-promo" data-nav="📣 प्रचार-किट" style="grid-column:1/-1">' +
    '<div class="ph">📣 प्रचार-किट (अपनी सेवा फैलाएँ)</div>' +
    '<div class="pd">यहाँ से आप अपनी ACS-सेवा का प्रचार कर सकेंगे: तैयार पोस्टर/कार्ड (आपके नाम व QR के साथ) ' +
    'और share-कड़ी — WhatsApp या social media पर एक टैप में। हर share = मुफ़्त प्रचार, आपके पास ज़्यादा लोग।</div>' +
    '<div class="pd"><b>ZM-कैंपेन:</b> बड़े प्रचार-अभियान के लिए अपने ZM-office से निवेदन कर सकेंगे — ' +
    'पोस्टर-डिज़ाइन व स्थानीय प्रचार में सहयोग।</div>' +
    '<button class="abtn ok" style="background:var(--blue)" disabled>📥 पोस्टर/कड़ी बनाएँ</button> ' +
    '<button class="abtn ok" disabled>📣 ZM-कैंपेन का निवेदन</button> ' +
    '<span class="soon">प्रचार-किट इंजन अगले दौर में</span>' +
    '</div>');


/* (काम-9+ · 18-Jul) learner-progress + हल्की gamification — device-local
   (localStorage, शून्य-server, DPDP-सुरक्षित); व्यक्तिगत अंक/मील-पत्थर/कोमल सिलसिला,
   कोई leaderboard नहीं (बाल-सुरक्षा)। पाठ-पेज course-lesson.js से लिखते हैं। */
const P_PROGRESS = "<div class=\"pcard panel\" id=\"pnl-progress\" data-nav=\"📈 मेरी प्रगति\" style=\"grid-column:1/-1\"><div class=\"ph\">📈 मेरी प्रगति (इसी फ़ोन में)</div><div class=\"pd\">यह हिसाब आपके अपने फ़ोन में सुरक्षित रहता है — कोई server पर नहीं जाता (निजता सुरक्षित)। दूसरे फ़ोन पर हिसाब जोड़ने की सुविधा नामांकन-खाते के साथ अगले दौर में आएगी।</div><div id=\"acsProgBox\"><span class=\"note\">पढ़ाई का हिसाब यहाँ दिखेगा…</span></div><a class=\"abtn ok\" style=\"background:var(--blue);display:inline-block;text-decoration:none;margin-top:10px\" href=\"/courses/\">📖 पढ़ना जारी रखें</a><script>(function(){try{var d;try{d=JSON.parse(localStorage.getItem(\"acs_learn_progress\")||\"{}\");}catch(e){d={};}var n=0,k;if(d.read){for(k in d.read){if(d.read.hasOwnProperty(k))n++;}}var read=n,xp=n*10;var days=[];if(d.days){for(k in d.days){if(d.days.hasOwnProperty(k))days.push(k);}days.sort();}function ds(dt){return dt.getFullYear()+\"-\"+(\"0\"+(dt.getMonth()+1)).slice(-2)+\"-\"+(\"0\"+dt.getDate()).slice(-2);}var best=0,run=0,prev=null,i,pp,t;for(i=0;i<days.length;i++){pp=days[i].split(\"-\");t=new Date(pp[0],pp[1]-1,pp[2]);if(prev&&Math.round((t-prev)/86400000)===1){run++;}else{run=1;}if(run>best)best=run;prev=t;}var cur=0;if(days.length){var td=new Date();var yd=new Date(Date.now()-86400000);var last=days[days.length-1];cur=(last===ds(td)||last===ds(yd))?run:0;}var ms=[[300,\"🏅 पारंगत\"],[100,\"🥇 स्वर्ण\"],[50,\"🥈 रजत\"],[10,\"🥉 कांस्य\"],[1,\"🌱 शुरुआत\"]];var curM=\"—\",nextN=1,nextName=\"🌱 शुरुआत\",j;for(j=ms.length-1;j>=0;j--){if(read>=ms[j][0])curM=ms[j][1];}for(j=ms.length-1;j>=0;j--){if(read<ms[j][0]){nextN=ms[j][0];nextName=ms[j][1];break;}}var box=document.getElementById(\"acsProgBox\");if(!box)return;if(read===0){box.innerHTML='<div class=\"pd\">अभी आपने कोई पाठ पूरा नहीं पढ़ा। नीचे पढ़ना-जारी-रखें बटन दबाकर शुरू करें — हर पाठ पर यहीं अंक व मील-पत्थर अपने-आप जुड़ते जाएँगे। 🌱</div>';return;}var toNext=(read<300)?(\"अगले मील-पत्थर (\"+nextName+\") तक \"+(nextN-read)+\" पाठ और।\"):(\"आप सबसे ऊँचे मील-पत्थर पर हैं — बहुत बढ़िया!\");var streakLine=cur>0?(\"🔥 सीखने का सिलसिला: \"+cur+\" दिन लगातार\"):(\"आज एक पाठ पढ़कर नया सिलसिला शुरू करें 🌱\");box.innerHTML='<div class=\"pd\"><b>कुल अंक:</b> '+xp+' &nbsp; <b>पाठ पढ़े:</b> '+read+'</div>'+'<div class=\"pd\"><b>मौजूदा मील-पत्थर:</b> '+curM+' &nbsp; <b>सबसे लंबा सिलसिला:</b> '+best+' दिन</div>'+'<div class=\"pd\">'+streakLine+'</div>'+'<div class=\"note\">'+toNext+'</div>';}catch(e){}})();</script></div>";

/* --- तीनों घरों की रचना --- */
function studentPanels(){
  return P_APTITUDE + P_COURSES + P_PROGRESS + P_EXAMS + P_PROOF + P_CERTS + P_PAY() + P_COUNSEL + P_WORKSHOP_ST
       + P_RULES_LINK("rules-consent-learner.html","विद्यार्थी (Student)") + P_HELP;
}
function jobseekerPanels(){
  return P_JOBS + P_BADGE + P_APTITUDE + P_COURSES + P_PROGRESS + P_EXAMS + P_PROOF + P_CERTS + P_PAY(P_PAY_JOBSEEKER_EXTRA) + P_COUNSEL
       + P_RULES_LINK("rules-consent-learner.html","नौकरी-इच्छुक (Job-seeker)") + P_HELP;
}
function entrepreneurPanels(){
  return P_UDYAM + P_ECOSYS + P_PARTNERS + P_TOUR + P_APTITUDE + P_COURSES + P_PROGRESS + P_EXAMCERT_ENT + P_PAY() + P_COUNSEL
       + P_RULES_LINK("rules-consent-learner.html","उद्यमी (Entrepreneur)") + P_HELP;
}
/* v2.0-सुधार (Founder 18-Jul-2026): online-पढ़ाई कमाई 90/100 — सिर्फ़ teacher
   (उस्ताद की पढ़ाई-fee का बँटवारा दर्ज नहीं — खुला सवाल)। साझा P_TU_EARN से व्युत्पन्न। */
const P_TCH_EARN = P_TU_EARN.replace('<div class="pd"><b>कोर्स-royalty:',
    '<div class="pd"><b>Online पढ़ाई की कमाई:</b> स्टूडेंट से आने वाले हर 100 रुपये में से <b>90 रुपये आपके</b>।</div>' +
    '<div class="pd"><b>कोर्स-royalty:');

function teacherPanels(){
  return P_TCH_CONTENT + P_IND_SAFE + P_TCH_EARN + P_TCH_LIVE + P_TU_BADGE + P_PROMO
       + P_RULES_LINK("rules-consent-teacher.html","शिक्षक (Teacher)") + P_HELP;
}
/* उस्ताद कमाई-गणित (Founder 18-Jul-2026): 90 सीधी-सिखाई · 7 recording-content ·
   80 दूसरे के कोर्स का practical। साझा P_TU_EARN से व्युत्पन्न (दोहराव नहीं)। */
const P_UST_EARN = P_TU_EARN.replace('<div class="pd"><b>कोर्स-royalty:',
    '<div class="pd"><b>कमाई का गणित (तीन रास्ते):</b> (1) आमने-सामने बैठाकर सिखाने की fee — हर 100 रुपये में से ' +
    '<b>90 रुपये आपके</b>। (2) आपकी सिखाई की live recording से नया content बने, तो उस content की कमाई पर ' +
    '<b>7 रुपये प्रति 100</b> — ज़िंदगी भर (मूल रचनाकार के नाते)। (3) किसी दूसरे के बनाए कोर्स का सिर्फ़ ' +
    'practical आप अपने बूते कराएँ, तो उस कमाई में से <b>80 रुपये प्रति 100 आपके</b>। practical किसी ' +
    'workshop के भीतर हो, तो 80 workshop को — वहाँ owner से आपका बँटवारा आपका आपसी (internal) मामला है, ' +
    'ACS उसमें नहीं घुसता।</div>' +
    '<div class="pd"><b>कोर्स-royalty:');

function ustadPanels(){
  return P_UST_CERTIFY + P_IND_SAFE + P_UST_SKILL + P_UST_MENTOR + P_UST_EARN + P_TU_BADGE + P_PROMO
       + P_RULES_LINK("rules-consent-ustad.html","उस्ताद (Ustad)") + P_HELP;
}
function centerPanels(){
  return P_INST_ENROLL("पढ़ने वाले (students)") + P_CTR_TEAM + P_CTR_SAFE + P_INST_EARN + P_INST_OFFER + P_CTR_CERT
       + P_INST_VERIFY("") + P_INST_BADGE + P_PROMO + P_RULES_LINK("rules-consent-center.html","केंद्र (Center)") + P_HELP;
}
function workshopPanels(){
  return P_WS_TRAIN + P_INST_ENROLL("शागिर्द") + P_WS_USTAD + P_WS_SAFE + P_INST_EARN + P_INST_OFFER
       + P_WS_CERT
       + P_INST_VERIFY(" साथ में यह प्रमाण भी कि workshop कम-से-कम 3 साल से चल रहा है।")
       + P_INST_BADGE + P_PROMO + P_RULES_LINK("rules-consent-workshop.html","वर्कशॉप (Workshop)") + P_HELP;
}
function counselorPanels(){
  return P_CNS_SERVICE + P_IND_SAFE + P_CNS_APTITUDE + P_CNS_EARN + P_TU_BADGE + P_PROMO
       + P_RULES_LINK("rules-consent-counselor.html","सलाहकार (Counselor)") + P_HELP;
}
function employerPanels(){
  return P_EMP_DEMAND + P_EMP_FIND + P_EMP_ZERO + P_EMP_HIRE + P_INST_VERIFY("", {optional:true})
       + P_RULES_LINK("rules-consent-employer.html","नियोक्ता (Employer)") + P_HELP;
}
function foreignAgentPanels(){
  return P_FA_WORK + P_FA_LICENSE + P_FA_EARN + P_FA_JOBSEEKERS + P_SIMPLE_BADGE
       + P_RULES_LINK("rules-consent-foreign-agent.html","विदेश एजेंट (Foreign Agent)") + P_HELP;
}
function volunteerPanels(){
  return P_VOL_SEVA + P_VOL_PATH + P_VOL_EARN
       + P_RULES_LINK("rules-consent-volunteer.html","स्वयंसेवक (Volunteer)") + P_HELP;
}
function financeMitraPanels(){
  return P_FM_BRIDGE + P_FM_ZERO + P_FM_AUTH + P_FM_EARN + P_SIMPLE_BADGE
       + P_RULES_LINK("rules-consent-finance-mitra.html","वित्त मित्र (Finance Mitra)") + P_HELP;
}
function vendorPanels(){
  return P_VND_GOODS + P_VND_DEAL + P_INST_VERIFY("") + P_SIMPLE_BADGE
       + P_RULES_LINK("rules-consent-vendor.html","विक्रेता (Vendor)") + P_HELP;
}
/* चरण-6: role → पैनल-सेट का एक नक़्शा (dual-घर भी इसी से) */
function rolePanels(key){
  return key==="student" ? studentPanels()
       : key==="jobseeker" ? jobseekerPanels()
       : key==="entrepreneur" ? entrepreneurPanels()
       : key==="teacher" ? teacherPanels()
       : key==="ustad" ? ustadPanels()
       : key==="center" ? centerPanels()
       : key==="workshop" ? workshopPanels()
       : key==="counselor" ? counselorPanels()
       : key==="employer" ? employerPanels()
       : key==="foreign_agent" ? foreignAgentPanels()
       : key==="volunteer" ? volunteerPanels()
       : key==="finance_mitra" ? financeMitraPanels()
       : key==="vendor" ? vendorPanels()
       : extraPanels(key);
}

/* ---------- external roles के अतिरिक्त आरक्षित-पैनल ---------- */
function extraPanels(key){
  /* v1.5: entrepreneur-branch हटा — वह घर अब entrepreneurPanels() से सुसज्जित */
  if(key==="vendor") return (
    '<div class="pcard panel" id="pnl-extra" data-nav="🧾 RM-सत्यापन" style="grid-column:1/-1">' +
    '<div class="ph">🧾 RM भौतिक-सत्यापन</div>' +
    '<div class="pd">v1.7 प्रदर्शन-नियम: बिना RM भौतिक-सत्यापन + approval-श्रृंखला के आपका नाम portal पर नहीं दिखेगा। सत्यापन-स्थिति यहीं दिखेगी। Verified Vendor badge (वैकल्पिक, ₹300/600/1000 × 365 दिन) approval के बाद।</div>' +
    '<span class="soon">आरक्षित — अगले दौर में</span></div>');
  return (
    '<div class="pcard panel" id="pnl-extra" data-nav="🗂️ आगे के पैनल" style="grid-column:1/-1">' +
    '<div class="ph">🗂️ आगे के पैनल</div>' +
    '<div class="pd">इस भूमिका के काम-पैनल (सेवा · भुगतान (payment) · badge आदि) स्वीकृति (approval)-श्रृंखला के साथ अगले दौर में खुलेंगे।</div>' +
    '<span class="soon">आरक्षित — अगले दौर में</span></div>');
}

/* ---------- 1) team-घर इकट्ठे ---------- */
const homes = new Map(); // path → config
for(const t of MX.teams){
  if(!t.dashboard) continue;
  if(!homes.has(t.dashboard)) homes.set(t.dashboard, { mode:"team", keys:[], labels:[] });
  const h = homes.get(t.dashboard);
  h.keys.push(t.key); h.labels.push(t.label);
}
/* founder हर team-dashboard देख सके (नियम-4 का प्रदर्शन-रूप — admin v2.2 जैसा) */
for(const [p,h] of homes){ if(!h.keys.includes("founder")) h.keys.push("founder"); }

/* ---------- 2) बाहरी कार्ड-घर ---------- */
for(const c of MX.cards){
  if(c.key==="team" || !c.dashboard || c.dashboard==="/dashboard/") continue;
  if(homes.has(c.dashboard)){
    /* dual (volunteer): team-घर में external-fallback role जुड़े */
    homes.get(c.dashboard).ext = [c.key];
    homes.get(c.dashboard).extLabel = c.label;
  } else {
    homes.set(c.dashboard, { mode:"external", keys:[c.key], labels:[c.label], roleLabel:c.label });
  }
}

/* ---------- 3) बनाना ---------- */
let made = [];
for(const [home, h] of homes){
  const shared = SHARED_LABELS[home];
  const isTeam = h.mode==="team";
  const mainLabel = shared ? shared.tb
    : (isTeam ? (h.labels[0] + " Dashboard") : (h.labels[0] + " Dashboard"));
  const denyWho = shared ? shared.deny : h.labels.join(" / ");
  const out = TPL
    .split("{{GEN_NOTE}}").join(GEN_NOTE)
    .split("{{TITLE}}").join(mainLabel)
    .split("{{TB_ROLE}}").join(mainLabel)
    .split("{{DENY_WHO}}").join(denyWho)
    .split("{{MODE}}").join(h.mode)
    .split("{{ALLOWED_JSON}}").join(JSON.stringify(h.keys))
    .split("{{EXT_ROLES_JSON}}").join(JSON.stringify(h.ext||[]))
    .split("{{ROLE_LABEL}}").join(h.roleLabel || h.extLabel || mainLabel)
    .split("{{HOME}}").join(home)
    .split("{{P1_NOTE}}").join(isTeam ? p1Note(h.keys) : "");
  /* v1.9 dual-नियम: external-पैनल की चाबी — dual-घर पर h.ext[0], वरना बाहरी-कार्ड की key */
  const extKey = (h.ext && h.ext[0]) ? h.ext[0] : (isTeam ? null : h.keys[0]);
  const out2 = out
    .split("{{STATUS_PANEL}}").join(extKey ? statusPanel(extKey) : "")
    .split("{{EXTRA_PANELS}}").join(extKey ? rolePanels(extKey) : "");

  /* mode-अनुसार दूसरे mode का HTML हटाना (v4.0: JS-कटाई ख़त्म — साझा
     dashboard.js runtime-gate if(MODE==="team") से ख़ुद सँभालता है)
     v1.9 dual-नियम: dual-घर (h.ext) पर दोनों block रहें — काम-सूची boot-रास्ते
     से छनती है (dashboard.js v4.3 initNav-filter)। */
  let final = out2;
  if(isTeam && !h.ext){
    final = final.replace(/<!--EXTERNAL_ONLY_START-->[\s\S]*?<!--EXTERNAL_ONLY_END-->/,"");
  } else if(!isTeam){
    final = final.replace(/<!--TEAM_ONLY_START-->[\s\S]*?<!--TEAM_ONLY_END-->/,"");
  }

  /* जाँच: कोई placeholder बचा तो fail (check-robot भावना) */
  const left = final.match(/\{\{[A-Z_]+\}\}/);
  if(left){ console.error("❌ placeholder बचा:", left[0], "→", home); process.exit(1); }

  const dir = path.join(ROOT, home.replace(/^\//,""));
  fs.mkdirSync(dir, { recursive:true });
  fs.writeFileSync(path.join(dir,"index.html"), final);
  made.push({ home, mode: h.mode + (h.ext?"+ext":""), allowed: h.keys.join(","), bytes: final.length });
}

/* ---------- 4) एक-generator नियम (v1.2, Founder 14-Jul-2026):
   join व login भी इसी generator के अधीन — टेम्पलेट → output + generator-मुहर।
   (सार्वजनिक-content संसार का root _TEMPLATE.html अपनी जगह यथावत — v1.2 आर्किटेक्चर) ---------- */
const SPECIALS = [
  { tpl: "_JOIN_TEMPLATE.html",                    out: "join.html",                     nm: "join (registration)" },
  { tpl: path.join("dashboard","_LOGIN_TEMPLATE.html"), out: path.join("dashboard","index.html"), nm: "login/router" }
];
for(const sp of SPECIALS){
  let t = fs.readFileSync(path.join(ROOT, sp.tpl), "utf8");
  const note = "<!--\n  " + GEN_NOTE.split("\n").join("\n  ") + "\n  स्रोत-टेम्पलेट: /" + String(sp.tpl).split(path.sep).join("/") + "\n-->\n";
  const outHtml = t.replace(/^(<!DOCTYPE html>\s*\n?)/i, "$1" + note);
  if(outHtml === t){ console.error("❌ doctype नहीं मिला:", sp.tpl); process.exit(1); }
  fs.writeFileSync(path.join(ROOT, sp.out), outHtml);
  made.push({ home: "/"+String(sp.out).split(path.sep).join("/"), mode: "special:"+sp.nm, allowed: "—", bytes: outHtml.length });
}

/* ---------- रिपोर्ट ---------- */
console.log("घर | mode | allowed | bytes");
made.sort((a,b)=>a.home.localeCompare(b.home));
for(const m of made) console.log(m.home+" | "+m.mode+" | "+m.allowed+" | "+m.bytes);
console.log("\n✅ कुल "+made.length+" पेज बने (31 dashboards + join + login) — generator v1.9 · "+STAMP);
