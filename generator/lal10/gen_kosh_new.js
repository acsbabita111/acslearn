/* new नेवारी कोश-पूरक _3: workbook मतलब-रहित शब्दों का suffix-छील + V-उल्टा + हाथ-सूची।
   NEW-साँचे: pres/fut %Vइ · past %Vल · prog "%Vया च्वना" · imp "%V दिसँ" · neg म%Vइ ·
   can "%V फइ" · want "%V यः" — space-वाले हिस्से workbook में अलग-token बनते हैं। */
"use strict";
const fs=require("fs");
const {NEW}=require("./khep_lal10s_3.js");
const V=NEW.V, LEX=NEW.LEX;
const INV={}; Object.keys(V).forEach(k=>{ INV[V[k]]=k.replace(/-/g," "); });
const LINV={}; Object.keys(LEX).forEach(k=>{ if(LEX[k]&&!LINV[LEX[k]]) LINV[LEX[k]]=k; });
const IRR={"जाना":["गया","जाएगा","जाता है"],"आना":["आया","आएगा","आता है"],"देना":["दिया","देगा","देता है"],"लेना":["लिया","लेगा","लेता है"],"करना":["किया","करेगा","करता है"],"होना":["हुआ","होगा","होता है"],"पीना":["पिया","पिएगा","पीता है"],"सोना":["सोया","सोएगा","सोता है"]};
function hForm(base,kind){ // base=हिंदी inf "खाना"
  const ir=IRR[base]; const stem=base.replace(/ना$/,"");
  if(kind==="past") return ir?ir[0]:stem+"ा";
  if(kind==="fut") return ir?ir[1]:(/[\u093E-\u094C\u0902]$/.test(stem)?stem+"एगा":stem+"ेगा");
  if(kind==="pres") return ir?ir[2]:stem+"ता है";
  if(kind==="imp") return stem+"िए";
  if(kind==="neg") return "नहीं "+(ir?ir[2]:stem+"ता");
  if(kind==="prog") return stem+" रहा है";
  return base;
}
const HAND={"नेवाः":"नेवारी","नय्":"खाने (की)","मास्ति":"इच्छा","त्वने":"पीने (की)","न्यना":"सुनकर/पूछकर","घुमा":"मुड़","सःता":"बुला","स्वया":"देखकर","दिका":"रोक","मनइम्ह":"न खाने वाला","याइम्ह":"करने वाला","ज्वना":"पकड़कर","तया":"रखकर","याना":"करके","काया":"लेकर","बिया":"देकर","दय्का":"बनाकर","सिधा":"ख़त्म","चिला":"हट","झासँ":"जाइए (आदर)","वने":"जाने","नु":"चलें (सुझाव)","वा":"आओ/बारिश","हुँ":"जाओ","ममा":"माँ (बोलचाल)","मसीउ":"अनजान","स्यना":"सीख","लुमंका":"याद करके","पिकाया":"निकालकर","थुइका":"समझाकर","जाय्का":"भरकर","क्यना":"दिखाकर","ध्यना":"काटकर","चिना":"बाँधकर","पुना":"पहनकर","सिला":"धोकर","नापलाना":"मिलना","फ्वना":"माँगकर","मिहिनत":"मेहनत","दिसँ":"कीजिए (आदर)","दिसँइ":"कीजिए","फइइ":"सकेगा","मज्या":"काम नहीं","मखुइ":"नहीं होगा"};
function resolve(w){
  if(HAND[w]) return HAND[w];
  if(LINV[w]) return LINV[w];
  if(INV[w]) return INV[w];
  let neg=false,x=w;
  if(/^म/.test(x)&&!INV[x]&&!LINV[x]){ const t=x.slice(1); if(INV[t]||tryBase(t)){ neg=true; x=t; } }
  const SUF=[["या च्वना","prog"],["यल","past"],["लइ","fut"],["इइ","fut"],["ल","past"],["इ","pres"]];
  for(const [s,k] of SUF){
    if(x.length>s.length&&x.endsWith(s)){
      const b=x.slice(0,x.length-s.length);
      const hin=INV[b]||INV[b+"य"]; // वय→व-कटाव किनारा
      if(hin){ const f=hForm(hin.includes(" ")?hin.split(" ").pop():hin, k);
        const pre=hin.includes(" ")?hin.split(" ").slice(0,-1).join(" ")+" ":"";
        return (neg?"नहीं ":"")+pre+f; }
    }
  }
  if(INV[x]) return (neg?"नहीं ":"")+INV[x];
  return null;
}
function tryBase(t){ const SUF=["या च्वना","यल","लइ","इइ","ल","इ"]; if(INV[t])return true; for(const s of SUF){ if(t.endsWith(s)&&INV[t.slice(0,t.length-s.length)])return true; } return false; }

const miss=process.argv.slice(2);
const out={}; const left=[];
miss.forEach(w=>{ const m=resolve(w); if(m) out[w]=m; else left.push(w); });
// बचे = identity-रहित नहीं छोड़ते — देव-passthrough हिंदी-सिक्का मानकर वही
left.forEach(w=>{ out[w]=w; });
const body="/* new कोश-पूरक _3 — gen_kosh_new (suffix-छील+हाथ; बचे "+left.length+" passthrough) */\n"+
"var KKB_SHABDKOSH_3 = "+JSON.stringify(out,null,0)+";\n"+
"if (typeof module !== \"undefined\") module.exports = KKB_SHABDKOSH_3;\n"+
"if (typeof window !== \"undefined\") window.KKB_SHABDKOSH_3 = KKB_SHABDKOSH_3;\n";
fs.writeFileSync("generator/data/lipi/new_shabdkosh_3.js",body);
console.log("✅ _3 लिखा: "+Object.keys(out).length+" ("+left.length+" passthrough: "+left.slice(0,12).join(",")+")");
