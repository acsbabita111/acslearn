/* ===========================================================================
   ACS काम की भाषा — काम-खेमा-द generator v1.0 (14-Oct-2026)
   25 देवनागरी भाषाओं (राजस्थानी/हिंदी-पट्टी 15 + पहाड़ी-हिमाचली 10) का
   पूर्ण-पुनर्लेखन: English मास्टर (kkb_data/kkb2_data) से हिंदी-स्तंभ हूबहू
   (भाषा-नाम छूट) + [0]=[1] असली बोली-रूपांतरण (नियम-आधारित, AI-draft 🟡)।
   चलाना: node gen_khema_da.js <repo-root> <out-dir> [code1 code2 ...]
   =========================================================================== */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = process.argv[2] || ".";
const OUT = process.argv[3] || "./out";
const ONLY = process.argv.slice(4);

function loadWin(f) { const w = {}; const code = fs.readFileSync(path.join(ROOT, f), "utf8"); const fn = new Function("window", code); fn(w); return w; }
const M1 = loadWin("assets/kkb_data.js").KKB_DATA;
const M2 = loadWin("assets/kkb2_data.js").KKB2_DATA;
const AUX = JSON.parse(fs.readFileSync(__dirname + "/aux_hi.json", "utf8"));
AUX["Please speak slowly."] = "कृपया धीरे बोलिए।";
AUX["Please say it again."] = "कृपया फिर कहिए।";

/* En→Hi (items से) */
const EN2HI = {};
M1.weeks.forEach(w => w.days.forEach(d => d.items.forEach(it => { if (!(it[0] in EN2HI)) EN2HI[it[0]] = it[2]; })));
M2.weeks.forEach(w => w.days.forEach(d => d.items.forEach(it => { if (!(it[0] in EN2HI)) EN2HI[it[0]] = it[2]; })));
function HI(en) {
  en = String(en);
  const stripped = en.replace(/^\(सुनो\) |^\(बोलो\) /, "");
  const pre = en.length !== stripped.length ? en.slice(0, en.length - stripped.length) : "";
  let h = EN2HI[stripped] !== undefined ? EN2HI[stripped] : AUX[stripped];
  if (h === undefined) { throw new Error("HI-अनुवाद अनुपलब्ध: " + stripped); }
  return pre + h;
}

/* ---- Devanagari word-boundary helpers ---- */
/* शब्द-अक्षर वर्ग: देवनागरी अक्षर/मात्रा/नुक़्ता — danda (।॥ 0964-65), अंक (0966-6F) व ॰ (0970) बाहर,
   वरना वाक्य-अंत के शब्द (…खाया।) boundary-जाँच में चुपचाप छूट जाते (14-Oct पकड़ा होल) */
const D = "\\u0900-\\u0963\\u0971-\\u097F";
function wb(w) { return new RegExp("(?<![" + D + "])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![" + D + "])", "g"); }

/* ---- क्रिया-जोड़ सहायक ---- */
const VOW = /[ाीूोेैौ]$|[अआइईउऊएऐओऔ]$/;
function stUU(st) { /* ू-श्रेणी (करूँ) */
  const irr = { "दे": "दू", "ले": "लू", "जा": "जाऊ", "आ": "आऊ", "खा": "खाऊ", "पी": "पिऊ", "सो": "सोऊ", "हो": "होऊ", "धो": "धोऊ", "पा": "पाऊ" };
  if (irr[st]) return irr[st];
  if (VOW.test(st)) return st + "ऊ";
  return st + "ू";
}
function stAI(st) { /* ै-श्रेणी (करै) */ return VOW.test(st) ? st + "वै" : st + "ै"; }
function stO(st) { /* ओ-श्रेणी (करो) */ return VOW.test(st) ? st + "ओ" : st + "ो"; }
const AVT = { "आ": "आवत", "पी": "पियत", "सो": "सोवत", "धो": "धोवत", "जा": "जात", "खा": "खात", "दे": "देत", "ले": "लेत", "हो": "होत", "पा": "पावत" };
function stT(st) { /* -त (करत) */ if (AVT[st]) return AVT[st]; if (/ा$/.test(st)) return st + "वत"; return st + "त"; }
const NDAM = { "जा": "जां", "आ": "औं", "खा": "खां", "पी": "पीं", "सो": "सों", "दे": "दिं", "ले": "लैं", "हो": "हुं", "धो": "धों", "रह": "रैं", "पा": "पां" };
function stNDA(st) { /* पहाड़ी -दा आधार (कर→करदा का 'करद') */ const b = NDAM[st] || (/ा$/.test(st) ? st.replace(/ा$/, "ां") : st); return b + "द"; }
function stY(st) { /* सुरजापुरी (जाय/करै) */ return VOW.test(st) ? st + "य" : st + "ै"; }
function stE(st) { /* -ए (करे) */ return VOW.test(st) ? st + "ए" : st + "े"; }

/* ---- रूपांतरण-इंजन ---- */
function makeDial(L) {
  const phr = (L.phrases || []).map(p => [new RegExp(p[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), p[1]]);
  const words = (L.words || []).slice().sort((a, b) => b[0].length - a[0].length).map(p => [wb(p[0]), p[1]]);
  const futR = Object.entries(L.fut || {}).map(p => [wb(p[0]), p[1]]);
  const pastR = Object.entries(L.past || {}).map(p => [wb(p[0]), p[1]]);
  const PROG = L.prog || { "रहा": "रहा", "रही": "रही", "रहे": "रहे" };
  const habRe = new RegExp("([" + D + "]+?)(ता|ती|ते) (हूँ|हूं|है|हैं|हो)(?![" + D + "])", "g");
  const progRe = new RegExp(" (रहा|रही|रहे)(?= (?:हूँ|हूं|है|हैं|हो)(?![" + D + "]))", "g");
  const kiRe = / की(?=[।?!,])/g, liRe = / ली(?=[।?!,])/g, diRe = / दी(?=[।?!,])/g;
  const INF = { "करना":"कर","जाना":"जा","देना":"दे","आना":"आ","भेजना":"भेज","जानना":"जान","बनना":"बन","सीखना":"सीख","रहना":"रह","लाना":"ला","पूछना":"पूछ","पाना":"पा","करवाना":"करवा","खोलना":"खोल","बैठना":"बैठ","बँटाना":"बँटा","पीना":"पी","छोड़ना":"छोड़","निकलना":"निकल","पढ़ना":"पढ़","लिखना":"लिख","लेना":"ले","बढ़ना":"बढ़","बेचना":"बेच","ख़रीदना":"ख़रीद","खरीदना":"खरीद","बदलना":"बदल","बाँटना":"बाँट","मिलना":"मिल","लौटना":"लौट","सुनना":"सुन","बनाना":"बना","कहना":"कह","देखना":"देख","उड़ाना":"उड़ा","पहुँचना":"पहुँच","उतरना":"उतर","खाना":"खा" };
  const infRe = new RegExp("(?<![" + D + "])(" + Object.keys(INF).join("|") + ")(?![" + D + "])", "g");
  const loRe = / लो(?=[।?!,])/g, doRe = / दो(?=[।?!,])/g;
  const IMPPRE = { "कीजिए": "कर", "कीजिएगा": "कर", "दीजिए": "दे", "दीजिएगा": "दे", "लीजिए": "ले", "लीजिएगा": "ले", "पीजिए": "पी" };
  const impPreRe = new RegExp("(?<![" + D + "])(कीजिएगा|दीजिएगा|लीजिएगा|कीजिए|दीजिए|लीजिए|पीजिए)(?![" + D + "])", "g");
  const impRe = new RegExp("([" + D + "]+?)(?:िए|इए)(?:गा)?(?![" + D + "])", "g");
  const copRe = new RegExp("(?<![" + D + "])(हैं|है|हूँ|हूं|थे|थी|था)(?![" + D + "])", "g");
  const hoRe = new RegExp("(?<![" + D + "])हो(?=\\s*(?:[?।!,]|$))", "g");
  return function dial(s) {
    s = String(s);
    if (!/[\u0900-\u097F]/.test(s)) return s;         /* शुद्ध Latin/अंक अछूते */
    phr.forEach(([re, to]) => { s = s.replace(re, to); });
    s = s.replace(progRe, (m, f) => " " + PROG[f]);
    s = s.replace(habRe, (m, st, g, aux) => L.hab(st, g, aux) + " " + aux);
    if (L.imp) { s = s.replace(impPreRe, (m) => L.imp(IMPPRE[m])); s = s.replace(impRe, (m, st) => L.imp(st)); }
    if (L.inf) s = s.replace(infRe, (m) => L.inf(INF[m]));
    if (L.impLo) s = s.replace(loRe, " " + L.impLo);
    if (L.impDo) s = s.replace(doRe, " " + L.impDo);
    if (L.pastKi) s = s.replace(kiRe, " " + L.pastKi);
    if (L.pastLi) s = s.replace(liRe, " " + L.pastLi);
    if (L.pastDi) s = s.replace(diRe, " " + L.pastDi);
    futR.forEach(([re, to]) => { s = s.replace(re, to); });
    pastR.forEach(([re, to]) => { s = s.replace(re, to); });
    words.forEach(([re, to]) => { s = s.replace(re, to); });
    /* copula अंत में — एक ही pass (क्रमिक-chaining रोक: थे→था→… दोष 14-Oct पकड़ा) */
    s = s.replace(copRe, m => ({ "हैं": L.cop.hain, "है": L.cop.hai, "हूँ": L.cop.hun, "हूं": L.cop.hun, "थे": L.cop.the, "थी": L.cop.thi, "था": L.cop.tha })[m]);
    s = s.replace(hoRe, L.cop.ho);
    return s;
  };
}

/* ---- साझा भूत-रूप साँचे ---- */
function pastYO() { /* राजस्थानी/-यो परिवार */
  return { "किया": "कर्यो", "किए": "कर्या", "गया": "गयो", "गई": "गई", "गए": "गया", "आया": "आयो", "आई": "आई", "आए": "आया", "खाया": "खायो", "खाई": "खाई", "लिया": "लियो", "ली": "ली", "दिया": "दियो", "दी": "दी", "हुआ": "होयो", "हुई": "होई", "हुए": "होया", "सोया": "सोयो", "पिया": "पियो", "धोया": "धोयो", "बचाया": "बचायो", "बनाया": "बनायो", "मिला": "मिल्यो", "मिली": "मिली", "मिले": "मिल्या", "सीखा": "सीख्यो", "सीखी": "सीखी", "देखा": "देख्यो", "लिखा": "लिख्यो", "भेजा": "भेज्यो", "भेजी": "भेजी", "जाँचा": "जाँच्यो", "जाँची": "जाँची", "तौला": "तौल्यो", "माँगी": "माँगी", "उठा": "उठ्यो", "रुका": "रुक्यो", "कहा": "कह्यो", "सुना": "सुण्यो", "समझा": "समझ्यो", "चला": "चाल्यो", "पढ़ा": "पढ़्यो", "सका": "सक्यो", "पाया": "पायो", "कटा": "कट्यो", "पहुँचा": "पूग्यो", "लगा": "लाग्यो", "लगी": "लागी" };
}
function pastTTA() { /* पहाड़ी -त्ता परिवार */
  return { "किया": "कित्ता", "किए": "कित्ते", "गया": "गिया", "गई": "गेई", "गए": "गे", "आया": "आया", "आई": "आई", "आए": "आए", "खाया": "खादा", "खाई": "खादी", "लिया": "लित्ता", "ली": "लेई", "दिया": "दित्ता", "दी": "दित्ती", "हुआ": "होया", "हुई": "होई", "हुए": "होए", "सोया": "सुत्ता", "पिया": "पीता", "धोया": "धोता", "बचाया": "बचाया", "बनाया": "बणाया", "मिला": "मिल्या", "मिली": "मिली", "मिले": "मिले", "सीखा": "सिखया", "सीखी": "सिखयी", "देखा": "दिक्खा", "लिखा": "लिखया", "भेजा": "भेजया", "भेजी": "भेजयी", "जाँचा": "जाँचया", "जाँची": "जाँचयी", "तौला": "तोलया", "माँगी": "मंगयी", "उठा": "उठया", "रुका": "रुकया", "कहा": "बोलया", "सुना": "सुणया", "समझा": "समझया", "चला": "चलया", "पढ़ा": "पढ़या", "सका": "सकया", "पाया": "पाया", "कटा": "कटया", "पहुँचा": "पुज्जया", "लगा": "लग्गा", "लगी": "लग्गी" };
}
function futStem(map1, suf1, suf3, sufPl, suf2) {
  /* lexical भविष्य-रूप मास्टर-सूची से */
  const F = {};
  const one = { "करूँगा": "कर", "दूँगा": "दे", "आऊँगा": "आ", "जाऊँगा": "जा", "लूँगा": "ले", "सीखूँगा": "सीख", "भेजूँगा": "भेज", "खरीदूँगा": "खरीद", "लाऊँगा": "ला", "लौटूँगा": "लौट", "रहूँगा": "रह", "उठूँगा": "उठ", "बनाऊँगा": "बना", "तोड़ूँगा": "तोड़", "सिलूँगा": "सिल", "मिलूँगा": "मिल", "पूछूँगा": "पूछ", "ठहरूँगा": "ठहर", "बनूँगा": "बन" };
  const three = { "मिलेगा": "मिल", "मिलेगी": "मिल", "जाएगा": "जा", "लगेगा": "लग", "देगा": "दे", "रहेगा": "रह", "निकलेगा": "निकल", "खोलेगा": "खोल", "खुलेगी": "खुल" };
  const pl = { "करेंगे": "कर", "लेंगे": "ले", "लगेंगे": "लग", "पढ़ेंगे": "पढ़", "खाएँगे": "खा", "बताएँगे": "बता", "जाएँगे": "जा", "देंगे": "दे", "बनाएँगे": "बना", "मिलेंगे": "मिल", "देखेंगे": "देख", "लौटेंगे": "लौट", "रहेंगे": "रह", "ठहरेंगे": "ठहर", "आएँगे": "आ" };
  const two = { "लोगे": "ले", "आओगे": "आ", "करोगे": "कर", "जाओगे": "जा", "चलोगे": "चल" };
  Object.entries(one).forEach(([k, st]) => F[k] = suf1(st));
  Object.entries(three).forEach(([k, st]) => F[k] = suf3(st, /गी$/.test(k)));
  Object.entries(pl).forEach(([k, st]) => F[k] = sufPl(st));
  Object.entries(two).forEach(([k, st]) => F[k] = suf2(st));
  Object.assign(F, map1 || {});
  return F;
}

module.exports = { fs, path, ROOT, OUT, ONLY, M1, M2, HI, AUX, makeDial, stUU, stAI, stO, stT, stNDA, stY, stE, pastYO, pastTTA, futStem, wb, loadWin };
