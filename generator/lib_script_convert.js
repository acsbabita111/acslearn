/* ============================================================
   lib_script_convert.js v1.0 (15-Nov-2026) · देवनागरी से दूसरी भारतीय लिपि (अनुवादक का औज़ार; पैनल-भाषा मशीन का हिस्सा)
   काम: जगहों के नाम (राज्य, जिले) का पहला मसौदा। यह अनुवाद नहीं, सिर्फ़ लिपि-बदल है: अक्षर-दर-अक्षर।
   नियम: (1) इसका नतीजा सीधे पैक में नहीं जाता: <भाषा>.json के "geo" खंड में लिखा जाता है और वहाँ हाथ से सुधरता है
         (जैसे कन्नड़ में "बेंगलुरु" का सही रूप, कर्नाटक के जिलों के अपने नाम)। build_panel_i18n.js का parity हर नाम जाँचता है।
         (2) तमिल में महाप्राण (ख, घ, छ ...) के अक्षर नहीं होते: वहाँ नतीजे में ख़ाली जगह वाले कोड आ सकते हैं, इसलिए तमिल के
         नाम हाथ से लिखे जाएँ (parity "पराई लिपि" या "अपनी लिपि नहीं" कहकर रोक देता है)।
         (3) नुक़्ता हटता है, चंद्रबिंदु अनुस्वार बनता है, शब्द के अंत का दीर्घ ई और ऊ ह्रस्व होता है (दक्षिण की लिपियों की रीति)।
   चलाना: node generator/lib_script_convert.js kn "खगड़िया"      (लिपि-कोड: kn te ml ta or bn gu pa)
   ============================================================ */
"use strict";
const BASE={kn:0x0C80,te:0x0C00,ml:0x0D00,ta:0x0B80,or:0x0B00,bn:0x0980,gu:0x0A80,pa:0x0A00};
const NUKTA={"क़":"क","ख़":"ख","ग़":"ग","ज़":"ज","ड़":"ड","ढ़":"ढ","फ़":"फ","य़":"य"};
function convert(script,s){
  const base=BASE[script]; if(!base) throw new Error("अनजान लिपि "+script);
  s=String(s).normalize("NFC").replace(/[क़-य़]/g,c=>NUKTA[c]).replace(/़/g,"")
    .replace(/ँ/g,"ं").replace(/ऑ/g,"आ").replace(/ॉ/g,"ा").replace(/ऍ/g,"ए").replace(/ॅ/g,"े");
  // नाम के अंत का दीर्घ ई/ऊ → ह्रस्व (दक्षिण की लिपियों की रीति)
  s=s.replace(/ी(?![ऀ-ॿ])/g,"ि").replace(/ू(?![ऀ-ॿ])/g,"ु");
  let o="";
  for(const ch of s){ const c=ch.codePointAt(0);
    if(c>=0x0900&&c<=0x097F){ if(c===0x0964||c===0x0965){o+=".";continue;} o+=String.fromCodePoint(c-0x0900+base); }
    else o+=ch; }
  return o;
}
module.exports={convert,BASE};
if(require.main===module) console.log(convert(process.argv[2],process.argv.slice(3).join(" ")));
