/* dhvani_yantra/ms.js v1.2 · 23-Nov-2026 (v1.1: स्तर-2 के तालिंग शब्द; v1.2: दो-वर्तनी वाले शब्द विक्षनरी के उच्चारण से तय; v1.0 उसी दिन) : मलय (रूमी लिपि) का उच्चारण-यंत्र, ध्वनि-कार्ड पन्ने के लिए (परत-4)
   काम: graphemes(शब्द) = शब्द के आवाज़-टुकड़े; word(शब्द) = देवनागरी उच्चारण, मलय कोर्स स्तर-1 की छपाई-रीति से।
   कोर्स स्तर-1 की रीति (29-Oct-2026 के नियम-आधारित यंत्र से छपी; 500 वाक्यों के 437 शब्दों से मिलाकर पक्की की):
     1) व्यंजन के बाद a = ा। पर शब्द के आख़िरी टुकड़े में a के बाद सिर्फ़ एक व्यंजन हो, तो a छोटा (अ) छपा है: datang = दातङ्।
     2) शब्द के अंत में i और u लंबे छपे हैं: lagi = लागी, satu = सातू। बाक़ी जगह छोटे।
     3) बिना स्वर का व्यंजन हलंत (्) के साथ: tidak = तिदक्।
     4) ng = ङ, ny = न्य, sy = श, kh = ख़, gh = ग़, c = च, j = ज, f = फ़।
   e की दो आवाज़ें (मलय की असली रीति): e पेपेत = अ (व्यंजन के बाद मात्रा नहीं); e तालिंग = ए।
     कौन-सा e तालिंग है, यह शब्द देखकर तय होता है। स्रोत: जावी (अरबी-लिपि मलय) वर्तनी, जहाँ तालिंग e के लिए
     "या" (ي) लिखा जाता है और पेपेत e नहीं लिखा जाता (rumi-jawi सूची, DBP शब्दकोशों से बनी)। सूची: TALING नीचे।
     जिन शब्दों की जावी वर्तनी दो तरह की मिली, उनकी आवाज़ विक्षनरी (Wiktionary) के उच्चारण से तय की (v1.2):
       तालिंग: belok /belok/, semak (जाँचना) जावी سيمق, merah /ˈmerah/ ميره। पेपेत: beri /bəˈri/, kena /kəˈna/, tenang /təˈnaŋ/।
     जो अब भी पक्का नहीं, वह SANDEH में है (pelan: दो अर्थ, दो आवाज़ें; कोर्स में नहीं): यंत्र पेपेत पढ़ता है, पर वह उदाहरण नहीं बनता।
   जोड़-स्वर ai, au, oi सिर्फ़ शब्द के अंत में, खुले टुकड़े में एक टुकड़ा हैं (kedai, atau)। बीच में a और i अलग स्वर हैं (baik = ba-ik),
     और एक-टुकड़े वाले शब्द में भी अलग (bau = ba-u)। स्रोत: विकिपीडिया "Malay phonology", जोड़-स्वर वाला हिस्सा।
   कोई Math.random नहीं। */
"use strict";
const TALING = {
  esok: "T", rehat: "T", stesen: "TT", telefon: "TT", beg: "T", teh: "T", boleh: "T", bolehkah: "T", tiket: "T", kereta: "PT",
  sewa: "T", elektrik: "TT", internet: "PT", mesin: "T", teksi: "T", keledar: "PT", lesen: "TT", mengecewakan: "PPT",
  helo: "T", menelefon: "PTT", meter: "TP", elektrod: "TT", topeng: "T", simen: "T",
  /* v1.1 (23-Nov-2026): कोर्स स्तर-2 के शब्द, उसी जावी-नियम से (बिना rumi-jawi प्रविष्टि वाले diperoleh, peroleh, letrik, tiketnya मूल शब्द से;
     daerah की जावी داءيره में "या" है)। letakkan की जावी-प्रविष्टि ليتقکن मूल letak (لتق, पेपेत) से उलटी है: मूल शब्द माना (पेपेत)। */
  bengkel: "TT", berbeza: "PT", berehat: "PT", berlesen: "PTT", cetakan: "T", daerah: "T", deposit: "T", destinasi: "T", dicetak: "T",
  diperoleh: "PT", dompet: "T", dozen: "T", ejaan: "T", ejen: "TT", hotel: "T", identiti: "T", imigresen: "TT", istimewa: "T", kamera: "T", kem: "T",
  kolej: "T", kriket: "T", letrik: "T", lewat: "T", loceng: "T", meja: "T", mekanik: "T", membebaskan: "PT", memori: "T", memperoleh: "PPT",
  mentol: "T", menu: "T", mereka: "PT", mesej: "TT", model: "T", november: "TP", paket: "T", pendek: "TT", peroleh: "PT", poket: "T", segel: "TT",
  serius: "T", set: "T", sewanya: "T", snek: "T", telefonnya: "TT", tempoh: "T", tengok: "T", tiketnya: "T", video: "T", web: "T", zebra: "T",
  /* v1.2 (23-Nov-2026): जावी में दो वर्तनी, विक्षनरी के उच्चारण में तालिंग (सबूत SABOOT में) */
  belok: "T", semak: "T", menyemak: "PT", merah: "T"
};
const SANDEH = ["pelan"];   /* अब भी पक्का नहीं: यंत्र पेपेत पढ़ता है, उदाहरण नहीं बनता (v1.1 में 8 शब्द थे; 7 विक्षनरी से तय) */
const DIG = ["ng", "ny", "sy", "kh", "gh"];
const VOW = { a: 1, e: 1, "é": 1, i: 1, o: 1, u: 1, ai: 1, au: 1, oi: 1 };
const CON = { b: "ब", c: "च", d: "द", f: "फ़", g: "ग", h: "ह", j: "ज", k: "क", l: "ल", m: "म", n: "न", p: "प", q: "क", r: "र", s: "स", t: "त", v: "व", w: "व", x: "क्स", y: "य", z: "ज़",
  ng: "ङ", ny: "न्य", sy: "श", kh: "ख़", gh: "ग़" };
const VD = { a: ["आ", "ा"], e: ["अ", ""], "é": ["ए", "े"], i: ["इ", "ि", "ई", "ी"], o: ["ओ", "ो"], u: ["उ", "ु", "ऊ", "ू"], ai: ["आइ", "ाइ", "आई", "ाई"], au: ["आउ", "ाउ", "आऊ", "ाऊ"], oi: ["ओइ", "ोइ", "ओई", "ोई"] };

function graphemes(w) {
  const s = String(w).toLowerCase();
  if (!/^[a-zé]+$/.test(s)) throw new Error("मलय-यंत्र: सिर्फ़ a-z अक्षर वाला एक शब्द दें: " + w);   /* é = शब्दकोश वाला तालिंग-निशान */
  const out = [];
  for (let i = 0; i < s.length;) {
    const two = s.slice(i, i + 2);
    if (DIG.indexOf(two) >= 0) { out.push(two); i += 2; continue; }
    if ((two === "ai" || two === "au" || two === "oi") && i + 2 === s.length && i > 0 && !VOW[s[i - 1]] && /[aeiou]/.test(s.slice(0, i))) { out.push(two); i += 2; continue; }
    out.push(s[i]); i++;
  }
  /* e: पेपेत (e) या तालिंग (é) */
  const pat = TALING[s] || ""; let k = 0;
  for (let i = 0; i < out.length; i++) if (out[i] === "e") { if (pat[k] === "T") out[i] = "é"; k++; }
  if (pat && k !== pat.length) throw new Error("मलय-यंत्र: TALING की e-गिनती शब्द से नहीं मिली: " + s);
  return out;
}

/* अकेली आवाज़ (कार्ड के लिए): शब्द की जगह वाली रीतियाँ (अंत में लंबा, अंत में छोटा a) नहीं लगतीं */
function unit(g) {
  if (VD[g]) return VD[g][0];
  if (CON[g]) return CON[g];
  throw new Error("मलय-यंत्र: अनजान आवाज़-टुकड़ा: " + g);
}

function word(w) {
  const t = graphemes(w); let o = "";
  for (let i = 0; i < t.length; i++) {
    const g = t[i], last = i === t.length - 1;
    if (VOW[g]) {
      const prevC = i > 0 && !VOW[t[i - 1]], v = VD[g];
      if (!prevC) o += last && v[2] ? v[2] : v[0];
      else if (g === "a" && t.length - i === 2 && !VOW[t[i + 1]]) o += "";          /* रीति 1 */
      else o += last && v[3] ? v[3] : v[1];                                               /* रीति 2 */
    } else {
      o += CON[g];
      if (!(i + 1 < t.length && VOW[t[i + 1]])) o += "्";                                 /* रीति 3 */
    }
  }
  return o;
}

module.exports = { graphemes: graphemes, word: word, unit: unit, TALING: TALING, SANDEH: SANDEH, VER: "1.2" };
