/* dev_kkb_leak_gate.js v2.0 (21-Oct) — असली-लिपि (Cyrillic) भाषा: kkb_ व kkb2_ की हर string-literal में
   (Cyrillic हो और देवनागरी न हो) → Latin शब्द (ब्रांड-सूची छोड़कर) या लगातार दोहराया शब्द = ❌।
   v1.0 सिर्फ़ 5-तत्व वाले वाक्य देखती थी — dialog/listen/test/tw की पंक्तियाँ छूट जाती थीं (v2.0 में बंद)।
   उपयोग: node generator/dev_kkb_leak_gate.js koi kv inh ... */
const fs=require("fs"); const codes=process.argv.slice(2); let fail=0;
const ALLOW=new Set("WhatsApp OTP UPI AI SIM ID email Aadhaar IMEI UTS IRCTC ACS".split(" "));
for(const c of codes){ let n=0,leak=0,dup=0; const ex=[];
  for(const f of ["kkb_","kkb2_"]){ const s=fs.readFileSync("assets/"+f+c+"_data.js","utf8");
    for(const m of s.matchAll(/"((?:[^"\\]|\\.)*)"/g)){ const t=m[1];
      if(!/[\u0400-\u04FF]/.test(t)||/[\u0900-\u097F]/.test(t)) continue; n++;
      const lw=(t.match(/[A-Za-z]{2,}/g)||[]).filter(w=>!ALLOW.has(w)); if(lw.length){leak++; if(ex.length<2)ex.push(t.slice(0,70));}
      if(/(^|\s)(\S+)\s+\2([\s.?!,]|$)/i.test(t.replace(/[.,?!]/g," "))){dup++; if(ex.length<2)ex.push(t.slice(0,70));} } }
  const bad=leak+dup; if(bad) fail=1;
  console.log((bad?"❌":"✅")+" "+c+": "+n+" Cyrillic-string · Latin-रिसाव "+leak+" · दोहराव "+dup+(ex.length?" | "+ex.join(" ‖ "):"")); }
console.log(fail?"❌ leak_gate FAIL":"🏁 leak_gate v2 पास"); process.exit(fail);
