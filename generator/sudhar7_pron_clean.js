/* सुधार-7 खेप-4: उच्चारण-स्तंभ [1] की अक्षर-स्तरीय सफ़ाई — देवनागरी के बीच बचे ग़ैर-देवनागरी अक्षर/मात्राएँ
   (ɛ ɔ à è é ë ı · Cyrillic · Arabic-अवशेष · बांग्ला/गुजराती/तेलुगु भटके अक्षर) → देवनागरी; संदर्भ-नियम:
   व्यंजन (हलंत-रहित) के बाद = मात्रा, वरना = स्वतंत्र स्वर।  चलाना: node generator/sudhar7_pron_clean.js [--write] */
"use strict";
const fs=require("fs"); const WRITE=process.argv.includes("--write");
function load(f){const w={};new Function("window","self","module",fs.readFileSync(f,"utf8")+";")(w,w,{});return w.KKB_DATA||w.KKB2_DATA;}
function save(f,D,key){const s=fs.readFileSync(f,"utf8");const m=s.match(new RegExp("window\\."+key+"\\s*=\\s*"));fs.writeFileSync(f,s.slice(0,m.index)+m[0]+JSON.stringify(D,null,1)+";\n");}
const isBad=ch=>/[\p{L}\p{M}]/u.test(ch)&&!/[\u0900-\u097F\uA8E0-\uA8FF\u1CD0-\u1CFF]/.test(ch);
const VOW={"ɛ":["े","ए"],"ɔ":["ॉ","ऑ"],"à":["ा","आ"],"á":["ा","आ"],"è":["े","ए"],"é":["े","ए"],"ë":["े","ए"],"ò":["ो","ओ"],"ó":["ो","ओ"],"ì":["ि","इ"],"í":["ि","इ"],"ı":["ि","इ"],"ù":["ु","उ"],"ú":["ु","उ"],"α":["ा","आ"]};
const DROP=new Set(["\u0308","\u0303","ʼ"]);
const CYR={"а":"अ","б":"ब","в":"व","г":"ग","ғ":"ग़","д":"द","е":"ए","ё":"यो","ж":"झ़","з":"ज़","и":"इ","й":"य्","к":"क","қ":"क़","л":"ल","м":"म","н":"न","ң":"ङ","ӊ":"ङ","о":"ओ","ө":"ओ","п":"प","р":"र","с":"स","т":"त","у":"उ","ұ":"उ","ү":"ऊ","ф":"फ़","х":"ख़","һ":"ह","ц":"त्स","ч":"च","ш":"श","щ":"श्च","ъ":"","ы":"ई","і":"इ","ь":"","э":"ए","ю":"यु","я":"या","ә":"ॅ","ў":"व"};
const CYRV={"а":"ा","е":"े","и":"ि","о":"ो","ө":"ो","у":"ु","ұ":"ु","ү":"ू","ы":"ी","і":"ि","э":"े","ә":"ॅ","ё":"्यो","ю":"्यु","я":"्या"};
const ARB={"إ":"इ","ا":"आ","ج":"ज","و":"व","د":"द","س":"स"};
function isCons(ch){return ch&&/[\u0915-\u0939\u0958-\u095F]/.test(ch);}
function tailCons(o){const a=[...o];const l=a[a.length-1],l2=a[a.length-2];if(l==="\u094D"&&isCons(l2))return 2;if(isCons(l))return 1;return 0;}
function addVowel(o,v){const k=tailCons(o); if(k===2)return o.slice(0,-1)+v[0]; if(k===1)return o+v[0]; return o+v[1];}
const CYRVI={"а":["ा","अ"],"е":["े","ए"],"и":["ि","इ"],"о":["ो","ओ"],"ө":["ो","ओ"],"у":["ु","उ"],"ұ":["ु","उ"],"ү":["ू","ऊ"],"ы":["ी","ई"],"і":["ि","इ"],"э":["े","ए"],"ә":["ॅ","ऍ"],"ё":["्यो","यो"],"ю":["्यु","यु"],"я":["्या","या"]};
function cyrWord(w){let o="";for(const ch0 of w){const ch=ch0.toLowerCase();
  if(CYRVI[ch]){const v=CYRVI[ch];const k=tailCons(o);o=k===2?o.slice(0,-1)+v[0]:(k===1?o+v[0]:o+v[1]);continue;}
  const d=CYR[ch]; if(d===undefined){o+=ch0;continue;}
  if(d==="")continue; o+=/[\u0915-\u0939\u0958-\u095F]$/.test(d)?d+"\u094D":d; }
  return o.replace(/\u094D$/,"");}
function indicShift(ch){const c=ch.codePointAt(0);
  if(c>=0x0980&&c<=0x09FF)return String.fromCodePoint(c-0x80);  /* बांग्ला */
  if(c>=0x0A80&&c<=0x0AFF)return String.fromCodePoint(c-0x180); /* गुजराती */
  if(c>=0x0C00&&c<=0x0C7F)return String.fromCodePoint(c-0x300); /* तेलुगु */
  return null;}
function clean(s){ if(!s||![...s].some(isBad))return s;
  /* Cyrillic-शब्द पूरे-के-पूरे */
  let t=s.split(/(\s+)/).map(p=>/[\u0400-\u04FF]/.test(p)?p.replace(/[\u0400-\u04FF]+/g,cyrWord):p).join("");
  let o=""; const a=[...t];
  for(let i=0;i<a.length;i++){const ch=a[i];
    if(!isBad(ch)){o+=ch;continue;}
    if(DROP.has(ch))continue;
    const sh=indicShift(ch); if(sh){o+=sh;continue;}
    if(ARB[ch]){o+=ARB[ch];continue;}
    const v=VOW[ch]; if(v){o=addVowel(o,v); continue;}
    o+=ch; }
  return o;}
const codes=fs.readFileSync(__dirname+"/sudhar7_codes.txt","utf8").trim().split("\n").filter(c=>c!=="en"&&c!=="yue"); /* yue = अलग पुनर्लेखन-क़तार */
let T=0,left=[];
for(const c of codes){const F={L1:__dirname+"/../assets/kkb_"+c+"_data.js",L2:__dirname+"/../assets/kkb2_"+c+"_data.js"};
  for(const L of ["L1","L2"]){const D=load(F[L]);let n=0;
    const fx=(arr,i)=>{const nv=clean(arr[i]); if(nv!==arr[i]){arr[i]=nv;n++;} if(arr[i]&&[...arr[i]].some(isBad))left.push(c+" "+L+": "+arr[i]);};
    D.weeks.forEach(w=>{((w.test&&w.test.lines)||[]).forEach(l=>fx(l,1));w.days.forEach(d=>{d.items.forEach(it=>fx(it,1));(d.tw||[]).forEach(t=>fx(t,1));});});
    if(n){T+=n; if(WRITE)save(F[L],D,L==="L1"?"KKB_DATA":"KKB2_DATA");}}}
console.log("साफ़ की पंक्तियाँ:",T,WRITE?"(लिखा)":"(रिपोर्ट)","| बचे:",left.length); left.slice(0,30).forEach(x=>console.log("  "+x));
