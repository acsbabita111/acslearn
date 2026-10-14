/* ===========================================================================
   ACS काम की भाषा — काम-खेमा-य core v1.0 (14-Oct-2026)
   25 Latin-लिपि भाषाओं का पूर्ण-पुनर्लेखन — "बहन-pivot" विधि (खेमा-द की
   नियम-रूपांतरण पद्धति का सामान्य रूप): हर लक्ष्य की सबसे नज़दीकी तैयार भाषा
   (fr/pt/id/tpi/mri/smo/tt/zu/mg/en) से [0] नियम-रूपांतरण, [1] = लक्ष्य-वर्तनी
   से G2P (देवनागरी-उच्चारण), [2] हिंदी मास्टर से हूबहू (भाषा-नाम छूट)।
   फ़ेल-क्लोज़्ड: अपरिवर्तित pivot-token सूचीबद्ध — शून्य हुए बिना देय नहीं।
   =========================================================================== */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = process.argv[2] || ".";
const OUT = process.argv[3] || "./out";
const ONLY = process.argv.slice(4);

function loadWin(f) { const w = {}; const code = fs.readFileSync(path.join(ROOT, f), "utf8"); const fn = new Function("window", code); fn(w); return w; }
const M1 = loadWin("assets/kkb_data.js").KKB_DATA;
const M2 = loadWin("assets/kkb2_data.js").KKB2_DATA;
const PIVOT_CACHE = {};
function loadPivot(p) {
  if (p === "en") return { P1: M1, P2: M2 };
  if (!PIVOT_CACHE[p]) PIVOT_CACHE[p] = {
    P1: loadWin("assets/kkb_" + p + "_data.js").KKB_DATA,
    P2: loadWin("assets/kkb2_" + p + "_data.js").KKB2_DATA
  };
  return PIVOT_CACHE[p];
}

/* ---- Latin शब्द-सीमा (accented समेत) ---- */
const LCH = "A-Za-z\\u00C0-\\u024F\\u02BB\\u02BC\\u2018\\u2019'’";
function wb(w) {
  return new RegExp("(?<![" + LCH + "])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![" + LCH + "])", "g");
}
function wbi(w) { /* case-insensitive रूप */
  return new RegExp("(?<![" + LCH + "])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![" + LCH + "])", "gi");
}
function capLike(src, out) { /* स्रोत-token बड़े-अक्षर से शुरू → लक्ष्य भी */
  if (/^[A-ZÀ-Þ]/.test(src) && out && /^[a-zà-ÿ]/.test(out)) return out[0].toUpperCase() + out.slice(1);
  return out;
}

/* ---- रूपांतरण-इंजन (Latin) ----
   L = { phrases:[[from,to],...]  वाक्यांश पहले (case-sens, ज्यों-का-त्यों)
         words:[[from,to],...]    शब्द-स्तर (case-सुरक्षित, लंबा-पहले)
         rx:[[regex-str,to],...]  नियम-regex (वर्तनी/प्रत्यय ध्वनि-नियम), क्रम से
         post:[[regex-str,to]]    अंतिम सफ़ाई
         shared:[...]             pivot=लक्ष्य में एक-से शब्द (नाप-छूट)
         nameFrom / nameTo        pivot-भाषा-नाम → लक्ष्य-नाम ([0] के भीतर)   */
function makeDialLat(L) {
  const phr = (L.phrases || []).map(p => [new RegExp(p[0].replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"), p[1]]);
  const rxPre = (L.rxPre || []).map(p => [new RegExp(p[0], "g"), p[1]]);
  const words = (L.words || []).slice().sort((a, b) => b[0].length - a[0].length)
    .map(p => [wbi(p[0]), p[1]]);
  const rx = (L.rx || []).map(p => [new RegExp(p[0], "g"), p[1]]);
  const post = (L.post || []).map(p => [new RegExp(p[0], "g"), p[1]]);
  const nameR = L.nameFrom ? (Array.isArray(L.nameFrom) ? L.nameFrom : [L.nameFrom]).map(n => [wbi(n), L.nameTo]) : [];
  return function dial(s) {
    s = String(s);
    nameR.forEach(([re, to]) => { s = s.replace(re, to); });
    const PH = []; const prot = t => { PH.push(t); return "\x01" + (PH.length - 1) + "\x01"; };
    phr.forEach(([re, to]) => { s = s.replace(re, () => prot(to)); });
    rxPre.forEach(([re, to]) => {
      s = s.replace(re, (...a) => {
        const gs = a.slice(1, -2);
        let out = to.replace(/\$(\d)/g, (m, d) => gs[+d - 1] !== undefined ? gs[+d - 1] : "");
        return out.replace(/⟦([^⟧]*)⟧/g, (m, w) => prot(w));
      });
    });
    words.forEach(([re, to]) => { s = s.replace(re, m => to === "" ? "" : prot(capLike(m, to)) ); });
    rx.forEach(([re, to]) => { s = s.replace(re, to); });
    for (let k = 0; k < 4 && /\x01/.test(s); k++) s = s.replace(/\x01(\d+)\x01/g, (m, n) => PH[+n]);
    post.forEach(([re, to]) => { s = s.replace(re, to); });
    s = s.replace(/\s{2,}/g, " ").replace(/\s+([,.!?;:])/g, "$1").trim();
    if (s) s = s[0].toUpperCase ? s[0].toUpperCase() + s.slice(1) : s;
    return s;
  };
}

/* ---- G2P (लक्ष्य-वर्तनी → देवनागरी-उच्चारण) ----
   rules = [[pattern, dev], ...] क्रम से (लंबा/विशेष पहले लिखें); pattern पर
   lowercase-input; '#' = शब्द-सीमा चिह्न। अंक/विराम संभाले जाते हैं। ACR = बड़े-अक्षर टोकन। */
const ACR = { "UPI": "यूपीआई", "ATM": "एटीएम", "OTP": "ओटीपी", "PIN": "पिन", "SIM": "सिम", "ID": "आईडी", "GPS": "जीपीएस", "CV": "सीवी", "KYC": "केवाईसी", "PF": "पीएफ", "ESI": "ईएसआई", "GST": "जीएसटी", "QR": "क्यूआर", "OK": "ओके", "TV": "टीवी", "AC": "एसी", "SMS": "एसएमएस", "WIFI": "वाईफ़ाई", "WI-FI": "वाईफ़ाई", "IVR": "आईवीआर", "HR": "एचआर", "CCTV": "सीसीटीवी", "LPG": "एलपीजी", "EMI": "ईएमआई", "A": "ए", "B": "बी", "C": "सी", "D": "डी", "E": "ई", "S": "एस" };
const DIGIT_HI = { "0": "ज़ीरो", "1": "वन", "2": "टू", "3": "थ्री", "4": "फ़ोर", "5": "फ़ाइव", "6": "सिक्स", "7": "सेवन", "8": "एट", "9": "नाइन" };
function makeG2P(rules, opt) {
  opt = opt || {};
  const RR = rules.map(p => [p[0], p[1]]);
  function word(w0) {
    const w = w0.toLowerCase();
    if (ACR[w0.toUpperCase()] && w0 === w0.toUpperCase() && w0.length <= 5) return ACR[w0.toUpperCase()];
    let s = "#" + w + "#", out = "";
    outer: while (s.length) {
      if (s[0] === "#") { s = s.slice(1); continue; }
      for (let i = 0; i < RR.length; i++) {
        const [pat, dev] = RR[i];
        if (pat[0] === "#" ? ("#" + s).startsWith(pat) : s.startsWith(pat)) {
          out += dev; s = s.slice(pat[0] === "#" ? pat.length - 1 : pat.length); continue outer;
        }
      }
      /* अनजान अक्षर — fail-closed संकेत */
      out += "¿" + s[0] + "?"; s = s.slice(1);
    }
    /* मात्रा-joiner: व्यंजन्+स्वर → मात्रा-रूप */
    const MATRA = { "अ": "", "आ": "ा", "इ": "ि", "ई": "ी", "उ": "ु", "ऊ": "ू", "ए": "े", "ऐ": "ै", "ओ": "ो", "औ": "ौ", "ऑ": "ॉ" };
    out = out.replace(/्([अआइईउऊएऐओऔऑ])/g, (m, v) => MATRA[v]);
    if (!opt.keepFinalHalant) out = out.replace(/्$/, "");
    return out;
  }
  return function pron(s) {
    s = String(s);
    let out = "", tok = "";
    const flush = () => { if (tok) { out += word(tok); tok = ""; } };
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (new RegExp("[" + LCH + "]").test(c)) { tok += c; continue; }
      flush();
      if (/[0-9]/.test(c)) { out += c; continue; }
      if (c === ".") { out += (i === s.length - 1 || /\s|$/.test(s[i + 1] || " ")) ? "।" : "."; continue; }
      if (c === " ") { out += " "; continue; }
      if (c === "-") { out += "-"; continue; }
      out += c;
    }
    flush();
    return out.replace(/।(?=.)/g, "। ").replace(/\s{2,}/g, " ").trim();
  };
}

/* ---- फ़ेल-क्लोज़्ड नाप: dial के बाद pivot-के-जैसे बचे token ---- */
function makeAudit(L) {
  const shared = new Set((L.shared || []).map(w => w.toLowerCase()));
  const keepRe = new RegExp("^[" + LCH + "]+$");
  return function audit(src, out, bag) {
    const sTok = new Set(String(src).toLowerCase().match(new RegExp("[" + LCH + "]+", "g")) || []);
    (String(out).toLowerCase().match(new RegExp("[" + LCH + "]+", "g")) || []).forEach(t0 => {
      const t=t0.replace(/^['’‘]+|['’‘]+$/g,'');
      if (t && sTok.has(t) && !shared.has(t) && keepRe.test(t)) bag[t] = (bag[t] || 0) + 1;
    });
  };
}

module.exports = { fs, path, ROOT, OUT, ONLY, loadWin, M1, M2, loadPivot, wb, wbi, makeDialLat, makeG2P, makeAudit, ACR, LCH };
