"use strict";
/* ============================================================
   kaithi_lipi.js v1.0 · 27-Oct-2026 — देवनागरी ↔ कैथी यांत्रिक रूपांतरण (परत-3)
   एकमात्र घर: कैथी-लिपि का अक्षर-नक़्शा (Unicode 5.2 block U+11080–110CF, 68 अक्षर)
   स्रोत: Unicode Standard (Kaithi block) + Noto Sans Kaithi (OFL)
   नियम (स्प्रेडशीट v5_11, ऐतिहासिक-प्रशासनिक शीट): रूपांतरण यांत्रिक = robot 100%।
   नोट: कैथी के अपने अंक नहीं — अंक देवनागरी (०-९) ही रहते हैं।
   ऋ (स्वतंत्र) का कैथी-अक्षर Unicode में नहीं — परंपरा से "रि" लिखा जाता था;
   ृ (मात्रा) का चिह्न है (U+110C2)।
   ============================================================ */
var KAITHI_MAP = {
  /* स्वर */
  "अ":"\u{11083}","आ":"\u{11084}","इ":"\u{11085}","ई":"\u{11086}","उ":"\u{11087}","ऊ":"\u{11088}",
  "ए":"\u{11089}","ऐ":"\u{1108A}","ओ":"\u{1108B}","औ":"\u{1108C}",
  /* व्यंजन */
  "क":"\u{1108D}","ख":"\u{1108E}","ग":"\u{1108F}","घ":"\u{11090}","ङ":"\u{11091}",
  "च":"\u{11092}","छ":"\u{11093}","ज":"\u{11094}","झ":"\u{11095}","ञ":"\u{11096}",
  "ट":"\u{11097}","ठ":"\u{11098}","ड":"\u{11099}","ढ":"\u{1109B}","ण":"\u{1109D}",
  "त":"\u{1109E}","थ":"\u{1109F}","द":"\u{110A0}","ध":"\u{110A1}","न":"\u{110A2}",
  "प":"\u{110A3}","फ":"\u{110A4}","ब":"\u{110A5}","भ":"\u{110A6}","म":"\u{110A7}",
  "य":"\u{110A8}","र":"\u{110A9}","ल":"\u{110AA}","व":"\u{110AB}",
  "श":"\u{110AC}","ष":"\u{110AD}","स":"\u{110AE}","ह":"\u{110AF}",
  /* ड़/ढ़ नीचे devaToKaithi में सीधे बदलते हैं (U+1109A/U+1109C) — NFC में ये हमेशा
     बिखरे (ड+़) रहते हैं (Unicode composition-exclusion), इसलिए नक़्शे की कुंजी नहीं बनते */
  /* मात्राएँ */
  "ा":"\u{110B0}","ि":"\u{110B1}","ी":"\u{110B2}","ु":"\u{110B3}","ू":"\u{110B4}",
  "े":"\u{110B5}","ै":"\u{110B6}","ो":"\u{110B7}","ौ":"\u{110B8}","ृ":"\u{110C2}",
  /* चिह्न */
  "्":"\u{110B9}","़":"\u{110BA}","ं":"\u{11081}","ँ":"\u{11080}","ः":"\u{11082}",
  "।":"\u{110C0}","॥":"\u{110C1}"
};
/* ऋ स्वतंत्र → रि (ऐतिहासिक रिवाज़; Unicode में कैथी का स्वतंत्र-ऋ अक्षर नहीं) */
var KAITHI_SPECIAL = { "ऋ":"\u{110A9}\u{110B1}" };
var DEVA_MAP = {};           /* उल्टा नक़्शा — कैथी → देवनागरी */
(function(){ for (var k in KAITHI_MAP) DEVA_MAP[KAITHI_MAP[k]] = k;
  DEVA_MAP["\u{1109A}"] = "\u0921\u093C";   /* ड़ (NFC-रूप) */
  DEVA_MAP["\u{1109C}"] = "\u0922\u093C";   /* ढ़ (NFC-रूप) */ })();

function devaToKaithi(s){
  s = String(s).normalize("NFC");
  /* NFC में ड़/ढ़/क़… सब बिखरे रहते हैं — ड़/ढ़ के कैथी में अपने अक्षर हैं, सीधे बदलो;
     precomposed U+095C/U+095D इनपुट भी NFC से पहले ही बिखर चुका होता है */
  s = s.replace(/\u0921\u093C/g, "\u{1109A}").replace(/\u0922\u093C/g, "\u{1109C}");
  var out = "";
  for (var ch of s) out += KAITHI_MAP[ch] !== undefined ? KAITHI_MAP[ch]
                    : KAITHI_SPECIAL[ch] !== undefined ? KAITHI_SPECIAL[ch] : ch;
  return out;
}
function kaithiToDeva(s){
  var out = "";
  for (var ch of String(s)) out += DEVA_MAP[ch] !== undefined ? DEVA_MAP[ch] : ch;
  return out;
}
var API = { KAITHI_MAP: KAITHI_MAP, DEVA_MAP: DEVA_MAP, devaToKaithi: devaToKaithi, kaithiToDeva: kaithiToDeva };
if (typeof module !== "undefined" && module.exports) module.exports = API;
if (typeof window !== "undefined") window.KAITHI_LIPI = API;
