/* ════════════════════════════════════════════════════════════
   lib_panel_langs.js v1.0 · 15-Nov-2026 · पैनल की भाषाओं का घर (मशीन की तरफ़) + मिलान के नियम
   Founder का क्रम (15-Nov-2026): हिंदी मूल, English पूरा; फिर
     1 कन्नड़ · 2 बांग्ला · 3 ओड़िया · 4 तमिल · 5 मलयालम · 6 तेलुगु · 7 असमिया · 8 मराठी · 9 गुजराती · 10 पंजाबी · 11 उर्दू;
   उसके बाद लगभग 15 विदेशी भाषाएँ (नई भाषा = ORDER में एक कोड + generator/data/panel_i18n/<कोड>.json)।
   लिपि का घर यह फ़ाइल नहीं है: लिपि generator/lib_apt_langs.js (L) से पढ़ी जाती है, जो उसे भाषा-रजिस्टर से मिलाता है (एक चीज़ = एक जगह)।
   fail-closed: जो कोड ORDER में नहीं, या जिसकी लिपि lib_apt_langs.js में नहीं, उसका पैक बनता ही नहीं।
   parity(): हिंदी मूल और अनुवाद का मिलान। यह अर्थ नहीं जाँच सकता; यह वे भूलें पकड़ता है जो मशीन पकड़ सकती है:
     अंक, {0} {1}, चिह्न (₹ % → · ™ ©), emoji, रोमन में लिखे शब्द (login, OTP, ACS ...), अंत और शुरू का विराम,
     अपनी लिपि का अक्षर, पराई लिपि का अक्षर, लंबी रेखा, टूटा अक्षर।
   ═══════════════════════════════════════════════════════════ */
"use strict";
const APT=require("./lib_apt_langs.js");
const ORDER=["en","kn","bn","or","ta","ml","te","as","mr","gu","pa","ur"];
function info(code){
  if(ORDER.indexOf(code)<0) return null;
  const L=APT.L[code]; if(!L||!L.script) return null;
  return { code:code, script:L.script, hi:L.hi };
}
const emo=s=>(s.match(/[\u{1F000}-\u{1FAFF}\u2600-\u27BF\u2190-\u21FF\u2B00-\u2BFF]/gu)||[]).sort().join("");
const dig=s=>(s.replace(/\{\d+\}/g,"").match(/\d+/g)||[]).sort().join(",");
const ph=s=>(s.match(/\{\d+\}/g)||[]).sort().join(",");
const lat=s=>(s.match(/[A-Za-z][A-Za-z0-9.+@\/_-]*[A-Za-z0-9]|[A-Za-z]{2,}/g)||[]);
const sym=s=>(s.match(/[₹%→·™©]/g)||[]).sort().join("");
/* brand का नाम हर भाषा में रोमन में ही (Founder का स्थायी नियम, 09-Nov-2026): अपनी लिपि में लिखा या अनूदित brand-नाम नहीं */
const BRAND=[["अप्लाइड कंप्यूटर स्कूल","Applied Computer School"],["एसीएस","ACS"]];
const noBrand=s=>BRAND.reduce((x,b)=>x.split(b[1]).join(" "),String(s));
/* अनुवाद में दोष हों तो उनकी सूची (ख़ाली सूची = ठीक)। latinOk = वे रोमन शब्द जो अनुवाद में हो सकते हैं, भले हिंदी मूल में न हों */
/* (क-3) T = उस भाषा का शब्द-नियम (lib_lang_terms.js; हो तो): हिंदी मूल का रोमन शब्द तालिका में हो, तो अनुवाद में वह अपनी लिपि में
   जा सकता है; और अनुवाद में छूट-सूची के बाहर कोई English शब्द नहीं रह सकता। */
function parity(code, hi, tr, latinOk, T){
  const I=info(code), out=[]; if(!I) return ["अनजान भाषा-कोड "+code];
  const h=String(hi), t=String(tr), th=h.trim(), tt=t.trim();
  if(!tt) return ["ख़ाली अनुवाद"];
  if(/[\u2014\u2013]/.test(t)) out.push("लंबी रेखा (em dash या en dash)");
  if(t.indexOf("\uFFFD")>-1) out.push("टूटा अक्षर (U+FFFD)");
  if(dig(h)!==dig(t)) out.push("अंक अलग ("+dig(h)+" ≠ "+dig(t)+")");
  if(ph(h)!==ph(t)) out.push("{n} अलग");
  if(emo(h)!==emo(t)) out.push("emoji या तीर अलग");
  if(sym(h)!==sym(t)) out.push("चिह्न ₹ % → · ™ © अलग");
  const tl=t.toLowerCase(), hl=new Set(lat(h).map(w=>w.toLowerCase())), ok=new Set((latinOk||[]).map(w=>w.toLowerCase()));
  for(const b of BRAND) if(h.indexOf(b[0])>-1){ if(t.indexOf(b[1])<0) out.push("brand का नाम रोमन में नहीं (\""+b[1]+"\" चाहिए)"); else lat(b[1]).forEach(w=>ok.add(w.toLowerCase())); }
  for(const w of lat(h)) if(tl.indexOf(w.toLowerCase())<0){
    if(T && w.split(/[^A-Za-z]+/).every(function(x){ return !x || x.length<2 || tl.indexOf(x.toLowerCase())>-1 || T.termWords.has(x.toLowerCase()); })) continue;
    out.push("रोमन शब्द \""+w+"\" अनुवाद में नहीं"); }
  if(T){ const left=require("./lib_lang_terms.js").scan(t, T, h); if(left.length) out.push("English शब्द अपनी लिपि में नहीं: "+left.join(", ")); }
  if(I.script!=="Latn") for(const w of lat(t)){ const k=w.toLowerCase(); if(!hl.has(k)&&!ok.has(k)&&h.toLowerCase().indexOf(k)<0) out.push("रोमन शब्द \""+w+"\" हिंदी मूल में नहीं (अनुवाद छूटा?)"); }
  const e1=th.slice(-1), e2=tt.slice(-1);
  if(/[:?!,;(\[]/.test(e1)&&e1!==e2) out.push("अंत का चिह्न \""+e1+"\" नहीं");
  if(/^[,;:)\]\u0964.]/.test(th)&&th[0]!==tt[0]&&!(th[0]==="\u0964"&&tt[0]===".")) out.push("शुरू का चिह्न \""+th[0]+"\" नहीं");
  let own=false, i, cp, sc;
  for(i=0;i<t.length;i++){ cp=t.codePointAt(i); if(cp>0xFFFF) i++;
    sc=APT.scriptOf(cp); if(!sc) continue;
    if(sc===I.script){ own=true; continue; }
    if(sc!=="Latn"){ out.push("पराई लिपि ("+sc+"): "+String.fromCodePoint(cp)); break; } }
  if(I.script!=="Latn"&&!own&&/\p{L}/u.test(noBrand(t))) out.push("अपनी लिपि ("+I.script+") का एक भी अक्षर नहीं");
  if(I.script==="Deva"){ const m=APT.hindiMark(code,t); if(m) out.push(m); }
  return out;
}
module.exports={ ORDER:ORDER, info:info, parity:parity, noBrand:noBrand, BRAND:BRAND };
