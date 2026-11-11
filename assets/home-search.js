/* home-search.js v1.1 (12-Nov-2026) : होम-पेज की खोज।
   खोज-सूची (/assets/search_index.json) तभी उतरती है जब कोई खोज-बॉक्स को छुए : होम की रफ़्तार नहीं घटती।
   सारा दिखने वाला पाठ पेज के data-खानों से आता है (generator/data/home_strings.js) : इस फ़ाइल में कोई पाठ नहीं। ES5।
   v1.1: English शब्दों के अंत (ing / er / ers / s) हटाकर मिलान ("driving" और "driver" एक माने जाएँ);
   English होम पर जिस खाने का अपना English पता है (जैसे करियर टेस्ट), वही खुलता है। */
(function(){
  var form=document.getElementById("khojForm"),inp=document.getElementById("khojIn"),res=document.getElementById("khojRes");
  if(!form||!inp||!res)return;
  var D=res.dataset,EN=form.getAttribute("data-lang")==="en",IDX=null,loading=false,ORD={k:0,h:1,b:2,u:3};
  function norm(s){return String(s||"").toLowerCase().replace(/[\u093c\u200c\u200d]/g,"");}
  function stem(t){return (/^[a-z]{6,}$/.test(t))?t.replace(/(ing|ers|er|s)$/,""):t;}
  function words(s){return norm(s).split(/[\s\-\/.,()&:—]+/).filter(Boolean).map(stem);}
  function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");}
  function link(u,t){return '<a href="'+esc(u)+'">'+esc(t)+'</a>';}
  function load(){ if(IDX||loading)return; loading=true;
    fetch(form.getAttribute("data-idx")).then(function(r){return r.json();}).then(function(a){
      IDX=a.map(function(x){return {k:x[0],hi:x[1],en:x[2],u:(EN&&x[5])?x[5]:x[3],w:words(x[1]).concat(words(x[2]),words(x[4]||"")),n:norm(x[1]+" "+x[2]+" "+(x[4]||""))};});
      loading=false;show();
    }).catch(function(){loading=false;res.innerHTML='<div class="none">'+esc(D.fail)+' '+link(D.allUrl,D.allLabel)+'</div>';res.className="khoj-res on";}); }
  function show(){ var qs=words(inp.value); if(!qs.length){res.className="khoj-res";res.innerHTML="";return;}
    if(!IDX){load();return;}
    var got=[];
    for(var i=0;i<IDX.length;i++){var x=IDX[i],rank=0,ok=true;
      for(var j=0;j<qs.length&&ok;j++){var t=qs[j],r=9;
        for(var k=0;k<x.w.length;k++){ if(x.w[k].indexOf(t)===0){r=0;break;} }
        if(r===9&&t.length>=4&&x.n.replace(/[\s\-]/g,"").indexOf(t)>-1)r=2;
        if(r===9)ok=false; else rank=Math.max(rank,r); }
      if(ok)got.push([rank,ORD[x.k],i,x]); }
    got.sort(function(a,b){return a[0]-b[0]||a[1]-b[1]||a[2]-b[2];});
    if(!got.length){res.innerHTML='<div class="none">"'+esc(inp.value)+'" '+esc(D.none)+' '+link(D.testUrl,D.testLabel)+'</div>';}
    else res.innerHTML=got.slice(0,8).map(function(g){var x=g[3],a=(EN&&x.en)?x.en:x.hi,b=(EN&&x.en)?x.hi:x.en;
      return '<a class="r" href="'+esc(x.u)+'"><span class="kind '+x.k+'">'+esc(D[x.k])+'</span><span>'+esc(a)+((b&&x.k!=="h"&&x.k!=="k")?'<span class="sub">'+esc(b)+'</span>':'')+'</span></a>';}).join("");
    res.className="khoj-res on"; }
  inp.addEventListener("focus",load);
  inp.addEventListener("input",show);
  form.addEventListener("submit",function(e){e.preventDefault();show();inp.blur();});
})();
