/* ============================================================
   lib_seo_meta.js v1.0 (11-Nov-2026) : भाषा-कोर्स परिवार के खोज-शीर्षक (title)
   और खोज-विवरण (meta description) का एकमात्र घर।
   क्यों: पहले यही पाठ 6 अलग generator-फ़ाइलों में लिखा था और 100 से 176 अक्षर
   तक लंबा था। Google लंबे शीर्षक काट देता है। अब हर शीर्षक छोटा, साफ़ और
   खोज-शब्द वाला है। एक जगह बदलो तो सभी 8 पेज-प्रकार बदलें।
   कौन पढ़ता है:
     build_specials.js (कोर्स-मुखपृष्ठ, एक-पन्ना परिचय) · build_bolo_shabd.js
     (बोलो-वर्कबुक, शब्दकोश) · build_workbook.js · build_lipi_pages.js ·
     build_chitra_pustak.js · build_vyakaran.js · build_seo_meta.js (अंतिम SEO-परत)
     · dev_seo_check.js (जाँच-यंत्र)।
   नियम: लंबी रेखा का उपयोग नहीं; उसकी जगह ":"। शीर्षक 80 अक्षर से छोटा,
   विवरण 160 अक्षर से छोटा (dev_seo_check.js में पहरा)।
   ============================================================ */
"use strict";
const BRAND = " | ACS";
const OLD_BRAND = " | अप्लाइड कंप्यूटर स्कूल";
const T_MAX = 80, D_MAX = 160, T_SOFT = 78;
const len = s => [...s].length;
function clean(v, what) {
  v = String(v == null ? "" : v).trim();
  if (/[<>"&]/.test(v)) throw new Error("lib_seo_meta: " + what + " में वर्जित चिह्न: " + v);
  return v;
}
/* अंग्रेज़ी नाम वाला रूप लंबा हो तो बिना अंग्रेज़ी नाम वाला रूप (तय नियम, हर जगह एक-सा) */
function pick(withEn, withoutEn, en) { return (en && len(withEn) <= T_SOFT) ? withEn : withoutEn; }

const TYPES = {
  root: {
    title: v => pick(v.hi + " बोलना सीखें (Spoken " + v.en + "): 90 दिन का मुफ़्त कोर्स" + BRAND, v.hi + " बोलना सीखें: 90 दिन का मुफ़्त कोर्स" + BRAND, v.en),
    desc: v => v.hi + " बोलना हिंदी से सीखें। 90 दिन, 2,150 वाक्य: असली लिपि, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़। पढ़ाई मुफ़्त। स्तर CEFR A2 पर आधारित।",
    old: [/^ACS Certificate in Spoken (?<en>.+?) — (?<hi>.+?) बोलने का पूरा कोर्स \(90 दिन, 2,150 वाक्य, CEFR A2 पर आधारित\) \| अप्लाइड कंप्यूटर स्कूल$/],
    cur: [/^(?<hi>.+?) बोलना सीखें \(Spoken (?<en>.+?)\): 90 दिन का मुफ़्त कोर्स \| ACS$/, /^(?<hi>.+?) बोलना सीखें: 90 दिन का मुफ़्त कोर्स \| ACS$/]
  },
  brief: {
    title: v => pick(v.hi + " कोर्स का एक-पन्ना परिचय (Spoken " + v.en + " Course Brief)" + BRAND, v.hi + " बोलने के कोर्स का एक-पन्ना परिचय" + BRAND, v.en),
    desc: v => v.hi + " के 90-दिन बोलने-कोर्स का एक-पन्ना परिचय: स्तर (CEFR A2 पर आधारित), परीक्षा, प्रमाणपत्र, रोजगार-देश और संस्था। हिंदी और English।",
    old: [/^(?<hi>.+?) बोलने का प्रमाणपत्र कोर्स — एक-पन्ना परिचय \(ACS Certificate in Spoken (?<en>.+?) — Brief for embassies (?:&|&amp;) employers\) \| अप्लाइड कंप्यूटर स्कूल$/],
    cur: [/^(?<hi>.+?) कोर्स का एक-पन्ना परिचय \(Spoken (?<en>.+?) Course Brief\) \| ACS$/, /^(?<hi>.+?) बोलने के कोर्स का एक-पन्ना परिचय \| ACS$/]
  },
  bolo: {
    title: v => v.hi + " बोलो-वर्कबुक: वाक्य सुनो और बोलो, मुफ़्त अभ्यास" + BRAND,
    desc: v => v.hi + " बोलने का मुफ़्त अभ्यास: 90-दिन कोर्स के हर हफ़्ते के वाक्य, देवनागरी उच्चारण और हिंदी अर्थ के साथ। सुनो और बोलकर जाँचो।",
    old: [/^(?<hi>.+?) बोलो-वर्कबुक — हर हफ़्ते के वाक्य सुनो और बोलो \(मुफ़्त, छपने-योग्य\) \| अप्लाइड कंप्यूटर स्कूल$/],
    cur: [/^(?<hi>.+?) बोलो-वर्कबुक: वाक्य सुनो और बोलो, मुफ़्त अभ्यास \| ACS$/]
  },
  shabd: {
    title: v => v.hi + " शब्दकोश: हिंदी अर्थ और देवनागरी उच्चारण, मुफ़्त" + BRAND,
    desc: v => v.hi + " के रोज़ काम आने वाले शब्द: देवनागरी उच्चारण, हिंदी अर्थ और खोज के साथ। हर शब्द सुनो और बोलकर अभ्यास करो। मुफ़्त।",
    old: [/^(?<hi>.+?) शब्दकोश — हिंदी अर्थ और देवनागरी उच्चारण के साथ \(मुफ़्त\) \| अप्लाइड कंप्यूटर स्कूल$/],
    cur: [/^(?<hi>.+?) शब्दकोश: हिंदी अर्थ और देवनागरी उच्चारण, मुफ़्त \| ACS$/]
  },
  workbook: {
    title: v => v.hi + " लिखो-वर्कबुक: लिखने के अभ्यास की मुफ़्त PDF" + BRAND,
    desc: v => v.hi + " कोर्स की छपने-योग्य मुफ़्त किताबें: " + v.weeks + " साप्ताहिक और 3 महीना-वार PDF। हर वाक्य के नीचे लिखने की 4 लाइनें और हर हफ़्ते का शब्दकोश।",
    old: [/^(?<hi>.+?) लिखो-workbook — हर दिन के वाक्य बड़े अक्षरों में \+ लिखने की लाइनें \+ साप्ताहिक शब्दकोश \(मुफ़्त PDF\) \| अप्लाइड कंप्यूटर स्कूल$/],
    cur: [/^(?<hi>.+?) लिखो-वर्कबुक: लिखने के अभ्यास की मुफ़्त PDF \| ACS$/],
    dOld: /: (?<weeks>\d+) साप्ताहिक \+ 3 महीना-वार PDF/, dCur: /: (?<weeks>\d+) साप्ताहिक और 3 महीना-वार PDF/
  },
  lipi: {
    title: v => pick(v.hi + " वर्णमाला सीखें (" + v.en + " Alphabet): अक्षर, आवाज़ और लिखाई" + BRAND, v.hi + " वर्णमाला सीखें: अक्षर, आवाज़ और लिखाई" + BRAND, v.en),
    desc: v => v.hi + " लिपि का पहला परिचय, हिंदी में: " + v.count + " अक्षर, देवनागरी में नाम और आवाज़, लिखाई-अभ्यास और 15-दिन योजना। मुफ़्त, छपने-योग्य।",
    old: [/^(?<hi>.+?) की वर्णमाला पहली बार — अक्षर, आवाज़, लिखने का अभ्यास \((?<en>.+?) Alphabet Workbook, मुफ़्त, छपने-योग्य\) \| अप्लाइड कंप्यूटर स्कूल$/],
    cur: [/^(?<hi>.+?) वर्णमाला सीखें \((?<en>.+?) Alphabet\): अक्षर, आवाज़ और लिखाई \| ACS$/, /^(?<hi>.+?) वर्णमाला सीखें: अक्षर, आवाज़ और लिखाई \| ACS$/],
    dOld: /— (?<count>\d+) अक्षर,/, dCur: /हिंदी में: (?<count>\d+) अक्षर,/
  },
  chitra: {
    title: v => v.akshar ? "मेरी पहली " + v.hi + " पोथी: अक्षर और चित्र-शब्द, मुफ़्त" + BRAND
      : "मेरी पहली चित्र-पुस्तक: " + v.hi + " के " + v.n + " बोलते चित्र-शब्द, मुफ़्त" + BRAND,
    desc: v => v.akshar ? v.hi + " अक्षर पहचानना और बोलना सीखें: वर्णमाला, बारहखड़ी, हर अक्षर का चित्र-शब्द और रोज़ की 100 चीज़ें। देवनागरी उच्चारण और आवाज़, मुफ़्त।"
      : v.isEn ? v.hi + " A से Z और हिंदी वर्णमाला के साथ रोज़ की 100 चीज़ें। हर शब्द देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। मोबाइल-पुस्तक, छपने-योग्य।"
      : v.hi + " के चित्र-शब्द: अक्षर, हिंदी वर्णमाला और रोज़ की 100 चीज़ें। हर शब्द देवनागरी उच्चारण, हिंदी अर्थ और आवाज़ के साथ। मोबाइल-पुस्तक, छपने-योग्य।",
    old: [/^मेरी पहली (?<hi>.+?) पोथी — अक्षर-बोध, बारहखड़ी और चित्र-शब्द, हिंदी में मुफ़्त \| अप्लाइड कंप्यूटर स्कूल$/,
          /^मेरी पहली चित्र-पुस्तक — (?<hi>.+?) · हिंदी, कक्षा 1 \((?<n>\d+) बोलते चित्र-शब्द, मुफ़्त\) \| अप्लाइड कंप्यूटर स्कूल$/],
    cur: [/^मेरी पहली (?<hi>.+?) पोथी: अक्षर और चित्र-शब्द, मुफ़्त \| ACS$/,
          /^मेरी पहली चित्र-पुस्तक: (?<hi>.+?) के (?<n>\d+) बोलते चित्र-शब्द, मुफ़्त \| ACS$/]
  },
  vyakaran: {
    title: v => pick(v.hi + " व्याकरण हिंदी में (" + v.en + " Grammar): " + v.N + " आसान पाठ, मुफ़्त" + BRAND, v.hi + " व्याकरण हिंदी में: " + v.N + " आसान पाठ, मुफ़्त" + BRAND, v.en),
    desc: v => v.hi + " व्याकरण हिंदी में सीखें: " + v.N + " सबसे ज़रूरी नियम, कोर्स के असली वाक्य, देवनागरी उच्चारण, हिंदी अर्थ और आवाज़। मुफ़्त, छपने-योग्य।",
    old: [/^(?<hi>.+?) व्याकरण हिंदी में \((?<en>.+?) Grammar in Hindi\) — (?<N>\d+) आसान पाठ, मुफ़्त \| अप्लाइड कंप्यूटर स्कूल$/],
    cur: [/^(?<hi>.+?) व्याकरण हिंदी में \((?<en>.+?) Grammar\): (?<N>\d+) आसान पाठ, मुफ़्त \| ACS$/, /^(?<hi>.+?) व्याकरण हिंदी में: (?<N>\d+) आसान पाठ, मुफ़्त \| ACS$/]
  }
};

/* पते से पेज-प्रकार: /courses/hi/bhasha/<slug>/<उप-folder>/index.html */
const SUB2TYPE = { "": "root", "brief": "brief", "bolo-workbook": "bolo", "shabdkosh": "shabd", "workbook": "workbook", "lipi": "lipi", "chitra-pustak": "chitra", "vyakaran": "vyakaran" };
function typeOf(rel) {
  const m = rel.replace(/\\/g, "/").match(/^courses\/hi\/bhasha\/([^/]+)\/(?:([^/]+)\/)?index\.html$/);
  if (!m) return null;
  const t = SUB2TYPE[m[2] || ""]; return t ? { type: t, slug: m[1] } : null;
}
function title(type, v) {
  const vv = Object.assign({}, v, { hi: clean(v.hi, "hi"), en: v.en ? clean(v.en, "en") : "" });
  const t = TYPES[type].title(vv);
  if (len(t) > T_MAX) throw new Error("lib_seo_meta: title " + len(t) + " अक्षर (सीमा " + T_MAX + "): " + t);
  return t;
}
function desc(type, v) {
  const vv = Object.assign({}, v, { hi: clean(v.hi, "hi"), en: v.en ? clean(v.en, "en") : "" });
  const d = TYPES[type].desc(vv);
  if (len(d) > D_MAX) throw new Error("lib_seo_meta: description " + len(d) + " अक्षर (सीमा " + D_MAX + "): " + d);
  return d;
}
/* पेज के मौजूदा title+description से चर निकालना (पुराना रूप या नया रूप, दोनों) */
function parse(type, t, d) {
  const T = TYPES[type]; let g = null, isOld = false, idx = -1;
  T.cur.some((re, i) => { const m = t.match(re); if (m) { g = Object.assign({}, m.groups); idx = i; } return !!m; });
  if (!g) T.old.some((re, i) => { const m = t.match(re); if (m) { g = Object.assign({}, m.groups); isOld = true; idx = i; } return !!m; });
  if (!g) return null;
  if (T.dOld) { const m = (d || "").match(isOld ? T.dOld : T.dCur) || (d || "").match(T.dOld) || (d || "").match(T.dCur); if (!m) return null; Object.assign(g, m.groups); }
  if (type === "chitra") { g.akshar = idx === 0; g.isEn = !g.akshar && /A(–| से )Z/.test(d || ""); }
  g.isOld = isOld;
  return g;
}

/* ---- साझा टुकड़े: चित्र-पुस्तक का schema + robots (पहले यह पेज-प्रकार बिना schema था) ---- */
const ROBOTS = '<meta name="robots" content="index, follow">';
function chitraLD(v) {
  const url = "https://acslearn.com/courses/hi/bhasha/" + v.slug + "/chitra-pustak/", course = "https://acslearn.com/courses/hi/bhasha/" + v.slug + "/";
  const hi = clean(v.hi, "hi");
  return JSON.stringify([
    { "@context": "https://schema.org", "@type": "LearningResource", "name": v.akshar ? "मेरी पहली " + hi + " पोथी" : "मेरी पहली चित्र-पुस्तक: " + hi,
      "description": v.desc, "url": url, "inLanguage": "hi", "learningResourceType": "चित्र-पुस्तक", "educationalLevel": "शुरुआती", "isAccessibleForFree": true,
      "provider": { "@type": "Organization", "name": "Applied Computer School", "alternateName": "अप्लाइड कंप्यूटर स्कूल", "url": "https://acslearn.com/" },
      "isPartOf": { "@type": "Course", "url": course } },
    { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://acslearn.com/" },
      { "@type": "ListItem", "position": 2, "name": "कोर्स", "item": "https://acslearn.com/courses/hi/" },
      { "@type": "ListItem", "position": 3, "name": hi + " बोलने का कोर्स", "item": course },
      { "@type": "ListItem", "position": 4, "name": "चित्र-पुस्तक", "item": url }] }
  ]).replace(/</g, "\\u003c");
}
/* generator व अंतिम-परत दोनों यही टुकड़ा og:image पंक्ति के ठीक बाद जोड़ते हैं */
function chitraHeadExtra(v) { return "\n" + ROBOTS + '\n<script type="application/ld+json">' + chitraLD(v) + "</scr" + "ipt>"; }

module.exports = { TYPES, typeOf, title, desc, parse, len, T_MAX, D_MAX, BRAND, OLD_BRAND, ROBOTS, chitraLD, chitraHeadExtra };
