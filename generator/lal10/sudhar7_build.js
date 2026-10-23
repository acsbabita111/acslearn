/* सुधार-7 साझा-निर्माता: concept-समूह (मिज़ो-दौर से निकला हिंदी-रूप-परिवार) × भाषा का concept-मान → पूरा LEX।
   + साझा उधार-शब्द (sudhar7_loans) — एक चीज़ = एक जगह। */
"use strict";
module.exports=function(P,conceptFile){
  const G=require("./sudhar7_concept_groups.json"), C=require(conceptFile), LO=require("./sudhar7_loans.json");
  const LEX=Object.assign({},LO);
  for(const [rep,keys] of Object.entries(G)){ if(C[rep]===undefined) continue; for(const k of keys) LEX[k]=C[rep]; }
  for(const [k,v] of Object.entries(C)) if(!(k in G)) LEX[k]=v; /* समूह-बाहर अतिरिक्त प्रविष्टियाँ */
  P.LEX=Object.assign(LEX,P.LEX||{}); P.pre=require("./sudhar7_pre.js");
  return P;
};
