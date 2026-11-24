/* dhvani_yantra/de.js v1.0 · 24-Nov-2026 : जर्मन शब्द → देवनागरी उच्चारण (हिंदी पढ़ने वाले के लिए)।
   Founder (24-Nov-2026): "जर्मन कोर्स की देवनागरी विक्षनरी के उच्चारण से दोबारा बनाऊँ? - हाँ"।
   पहले: कोर्स की देवनागरी हाथ से, कई रीतियों में (gut = गुत, Arbeiter = आर्बाइटर; Freund = फ़्रोइन्त, freut = फ़्रोएत;
         ü कहीं उ, कहीं यु, कहीं यू; ö = ॉ; ich = इष़)।
   अब: हर शब्द का उच्चारण विक्षनरी (Wiktionary) के IPA से (german-ipa-dict, CC BY-SA; कोर्स के शब्दों की प्रति:
       generator/data/lipi/dhvani/de_ipa.js, generator/build_de_ipa.js से)। IPA से देवनागरी नीचे की एक तालिका से।
   रीति (एक ही, हर जगह):
     स्वर: a, aː = आ · ɪ, i = इ, iː = ई · ʊ, u = उ, uː = ऊ (बिना ː वाला i/u शब्द के अंत में लंबा: Taxi = टाक्सी) · ɛ, e, eː, ə = ए (जर्मन वर्तनी का e) · ɔ, o, oː = ओ ·
           ʏ = यु, yː = यू (ü) · œ, øː = ओ (ö) · aɪ̯ = आइ · aʊ̯ = आउ · ɔʏ̯ = ओइ · -er (ɐ) = अर (व्यंजन के बाद र; शब्द के बीच अगले व्यंजन से जुड़ता है: Eltern = एल्टर्न)।
     व्यंजन: t = ट, d = ड (FOUNDER_TD, नीचे) · t͡s (z) = त्स · p͡f = प्फ़ · ʃ = श · ç (ich) = श (FOUNDER_CH) · x (ach) = ख़ ·
           v = व · f = फ़ · z = ज़ · j = य · ʁ = र · ŋ = ङ, पर k/g से पहले अनुस्वार (danke = डांके)।
     अक्षरी-न (n̩) = एन (schweißen = श्वाइसेन)। i̯ = इय (Familie = फ़ामीलिये)।
     शब्द के अंत के व्यंजन पर हलंत नहीं (हिंदी की तरह पढ़ें); शब्द के बीच दो व्यंजन = हलंत से जुड़े।
   जो शब्द कोश में नहीं: पहले जोड़-शब्द तोड़कर (Schweiß + maschine), फिर नीचे HAATH (हाथ से IPA, स्रोत-सहित)।
   नाम, संक्षेप, अंग्रेज़ी और भारतीय शब्द: generator/sudhar_de_uchcharan.js की NAAM-तालिका।
   कोई Math.random नहीं। एक ही शब्द = हमेशा एक ही देवनागरी। */
"use strict";
const path = require("path");
/* Founder के दो फ़ैसले (24-Nov-2026 को पूछे, उसी दिन दोनों का जवाब "हाँ"): */
const FOUNDER_TD = "टड";   /* "टड" = t ट, d ड (Founder: हाँ) · "तद" = t त, d द */
const FOUNDER_CH = "श";    /* "श" = ich इश (Founder: हाँ) · "ष़" = पुराना रूप इष़ */

const V = { /* [अकेला, मात्रा] */
  "a": ["आ", "ा"], "aː": ["आ", "ा"], "ɑ": ["आ", "ा"], "ɑː": ["आ", "ा"],
  "ə": ["ए", "े"], "e": ["ए", "े"], "eː": ["ए", "े"], "ɛ": ["ए", "े"], "ɛː": ["ए", "े"], "æ": ["ए", "े"],
  "ɪ": ["इ", "ि"], "i": ["इ", "ि", "ई", "ी"], "iː": ["ई", "ी"],
  "ʊ": ["उ", "ु"], "u": ["उ", "ु", "ऊ", "ू"], "uː": ["ऊ", "ू"],
  "ɔ": ["ओ", "ो"], "ɔː": ["ओ", "ो"], "o": ["ओ", "ो"], "oː": ["ओ", "ो"],
  "ʏ": ["यु", "्यु"], "y": ["यु", "्यु", "यू", "्यू"], "yː": ["यू", "्यू"],
  "œ": ["ओ", "ो"], "ø": ["ओ", "ो"], "øː": ["ओ", "ो"],
  "aɪ̯": ["आइ", "ाइ"], "aʊ̯": ["आउ", "ाउ"], "ɔʏ̯": ["ओइ", "ोइ"], "ɔɪ̯": ["ओइ", "ोइ"], "eɪ̯": ["ए", "े"], "oʊ̯": ["ओ", "ो"],
  "ɑ̃": ["आं", "ां"], "ɑ̃ː": ["आं", "ां"], "ã": ["आं", "ां"], "ɛ̃": ["एं", "ें"], "ɛ̃ː": ["एं", "ें"],
  "ɔ̃": ["ओं", "ों"], "ɔ̃ː": ["ओं", "ों"], "õ": ["ओं", "ों"], "œ̃": ["एं", "ें"], "ʌ": ["अ", ""]
};
const TD = FOUNDER_TD === "तद" ? { t: "त", d: "द" } : { t: "ट", d: "ड" };
const C = { "p": "प", "b": "ब", "t": TD.t, "d": TD.d, "k": "क", "ɡ": "ग", "g": "ग",
  "t͡s": "त्स", "p͡f": "प्फ़", "t͡ʃ": "च", "d͡ʒ": "ज",   /* सिर्फ़ जोड़-चाप ͡ वाले एक आवाज़; बिना चाप t+ʃ अलग (Handschuhe = हान्ट्शूए) */
  "f": "फ़", "v": "व", "w": "व", "s": "स", "z": "ज़", "ʃ": "श", "ʒ": "झ़", "ç": FOUNDER_CH, "x": "ख़", "χ": "ख़", "h": "ह", "j": "य",
  "l": "ल", "m": "म", "n": "न", "ŋ": "ङ", "ʁ": "र", "r": "र", "ɹ": "र", "ɾ": "र", "θ": "थ", "ð": "द" };
const KEYS = Object.keys(V).concat(Object.keys(C)).sort((a, b) => b.length - a.length);
const SKIP = /[̥̺̝ʰʲ̊ˑ]/;

/* IPA → इकाइयाँ ({v:[अकेला,मात्रा]} या {c:"व्यंजन"}) */
function units(ipa) {
  const s = String(ipa).replace(/ɐ(?=[ˈˌ])/g, "Ɐ").replace(/[ˈˌʔ.‿|ˑ]/g, "").replace(/ɐ̯/g, "R").replace(/[̩̍]/g, "§").replace(/ɡ/g, "g");
  const U = []; let i = 0;
  while (i < s.length) {
    if (s[i] === "R") { U.push({ c: "र" }); i++; continue; }                     /* ɐ̯ (स्वर के बाद का r) = र */
    if (s.startsWith("i̯", i)) { U.push({ v: V["ɪ"] }); U.push({ c: "य" }); i += 2; continue; }   /* Familie = फ़ामीलिये */
    if (s.startsWith("u̯", i)) { U.push({ v: V["ʊ"] }); U.push({ c: "व" }); i += 2; continue; }
    if (s[i] === "ɐ" || s[i] === "Ɐ") { U.push(s[i] === "Ɐ" ? { er: 1, edge: 1 } : { er: 1 }); i++; continue; }   /* -er; Ɐ = जोड़-शब्द की सीमा पर -er (Computer|kurs) */
    if (s[i] === "§") { const last = U.pop(); if (!last || !last.c) throw new Error("अक्षरी-व्यंजन से पहले व्यंजन नहीं: " + ipa); U.push({ v: V["ə"] }); U.push(last); i++; continue; }
    if (SKIP.test(s[i])) { i++; continue; }
    const k = KEYS.find(x => s.startsWith(x, i));
    if (!k) throw new Error("अनजान IPA चिह्न '" + s[i] + "' (U+" + s.charCodeAt(i).toString(16) + ") in /" + ipa + "/");
    U.push(V[k] ? { v: V[k] } : { c: C[k] }); i += k.length;
  }
  return U;
}
/* IPA → देवनागरी */
function deva(ipa) {
  const U = units(ipa); let out = "";
  for (let j = 0; j < U.length; j++) {
    const u = U[j], prev = U[j - 1], next = U[j + 1];
    if (u.er) { out += prev && prev.c ? "र" : "अर"; if (next && next.c && !u.edge) out += "्"; continue; }   /* व्यंजन के बाद: उसी व्यंजन का अ + र (Vater = फ़ाटर); शब्द के बीच अगला व्यंजन जुड़ता है (Eltern = एल्टर्न, kümmert = क्युमर्ट), पर जोड़-शब्द की सीमा पर नहीं (Computerkurs = कोम्प्यूटरकुर्स) */
    if (u.v) { const lng = u.v.length === 4 && j === U.length - 1 ? 2 : 0; out += prev && prev.c ? u.v[lng + 1] : u.v[lng]; continue; }   /* बिना ː वाला i/u/y छोटा, शब्द के अंत में लंबा (Taxi = टाक्सी) */
    if (u.c === "ङ" && next && next.c && (next.c === "क" || next.c === "ग")) { out += "ं"; continue; }   /* danke = डांके */
    out += u.c;
    if (next && next.c) out += "्";
  }
  return out;
}

/* कोश में नहीं, जोड़ से भी नहीं: हाथ से IPA (हर एक का स्रोत/कारण) */
const HAATH = {
  "Toilette": ["toaˈlɛtə", "विक्षनरी de: Toilette /to̯aˈlɛtə/ (कोश-प्रति में नहीं)"],
  "Kricket": ["ˈkʁɪkət", "Cricket /ˈkʁɪkət/ (विक्षनरी) की जर्मन वर्तनी"],
  "unbezahlt": ["ˈʊnbət͡saːlt", "un- /ʊn/ + bezahlt /bəˈt͡saːlt/ (विक्षनरी)"],
  "Auftragnehmer": ["ˈaʊ̯ftʁaːkˌneːmɐ", "Auftrag /ˈaʊ̯fˌtʁaːk/ + Nehmer (nehmen /ˈneːmən/) (विक्षनरी)"],
  "Ölbeutel": ["ˈøːlˌbɔɪ̯tl̩", "Öl /øːl/ + Beutel /ˈbɔɪ̯tl̩/ (विक्षनरी)"]
};

let IPA = null;
function ipaTable() { if (!IPA) IPA = require(path.join(__dirname, "..", "data", "lipi", "dhvani", "de_ipa.js")).shabd; return IPA; }
/* शब्द → {ipa, srot} (कोर्स-प्रति में न हो तो null) */
function ipaOf(w) {
  const T = ipaTable();
  if (T[w]) return T[w];
  if (HAATH[w]) return { ipa: HAATH[w][0], srot: "haath", note: HAATH[w][1] };
  return null;
}
function word(w) { const r = ipaOf(w); return r ? deva(r.ipa) : null; }
module.exports = { word, deva, units, ipaOf, HAATH, FOUNDER_TD, FOUNDER_CH, VER: "1.0" };
