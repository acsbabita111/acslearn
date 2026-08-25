"use strict";
const c=require("./common.js"); const L=c.officialList(); const M=c.loadData();
const lo=+process.argv[2]||421, hi=+process.argv[3]||630; let bad=0, miss=[];
for(let n=lo;n<=hi;n++){const l=M.WELDING_LESSONS.find(x=>x.num===n); if(!l){miss.push(n);continue;} const o=L[n]; if(o.title!==l.title||o.tag!==l.tag){bad++;console.log("बेमेल",n);} }
const slugs=new Set(M.WELDING_LESSONS.map(l=>l.slug)); 
console.log("जाँच "+lo+"-"+hi+": बेमेल "+bad+" · अनुपस्थित "+miss.length+(miss.length?" ("+miss[0]+"…"+miss[miss.length-1]+")":"")+" · कुल पाठ "+M.WELDING_LESSONS.length+" · slug-दोहराव "+(M.WELDING_LESSONS.length-slugs.size));
