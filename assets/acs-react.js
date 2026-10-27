/* ============================================================
   ACS acs-react.js v1.0 (27-Oct-2026, Founder-आदेश) — साझा reaction-पट्टी
   👍👎💬🔗 किसी भी पेज पर: <div id="acsReactSlot"></div> + यह script।
   पसंद/नापसंद = device-local राय (DPDP; बेनाम गिनती server-दौर में) ·
   💬 = WhatsApp-सुझाव · 🔗 = navigator.share, fallback WhatsApp।
   CSS भीतर से inject — किसी css-फ़ाइल पर निर्भर नहीं। ES5।
   (पाठ-पेजों की पट्टी course-lesson.js v1.5 में अलग — वही रूप।)
   ============================================================ */
(function(){
  try{
    var slot=document.getElementById("acsReactSlot");
    if(!slot||document.getElementById("acsReactBar")) return;
    var st=document.createElement("style");
    st.textContent=".acs-react{text-align:center;margin:26px auto 10px;padding:16px 10px;background:#F5F7FA;border:2px solid #0B1F3A;border-radius:16px;max-width:760px}"+
    ".acs-react-q{font-size:19px;font-weight:800;color:#0B1F3A;margin:0 0 12px}"+
    ".acs-react-row{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}"+
    ".acs-rbtn{display:inline-flex;align-items:center;gap:7px;font-size:18px;font-weight:800;font-family:inherit;color:#0B1F3A;background:#fff;border:2px solid #0B1F3A;border-radius:999px;padding:10px 18px;cursor:pointer;text-decoration:none;line-height:1.2}"+
    ".acs-rbtn:active{transform:scale(.96)}"+
    ".acs-ron{background:#2E7D32;border-color:#2E7D32;color:#fff}"+
    ".acs-roff{background:#0B1F3A;color:#F9A825}"+
    ".acs-react-note{font-size:16px;color:#2E7D32;font-weight:700;margin:10px 0 0}";
    document.head.appendChild(st);
    var KEY="acsReact:"+location.pathname;
    var cur=""; try{ cur=localStorage.getItem(KEY)||""; }catch(e){}
    var ttl=(document.title||"ACS").split("|")[0].replace(/\s+$/,"");
    var url=location.origin+location.pathname;
    var WAPP="https://wa.me/919431210092?text=";
    var box=document.createElement("div");
    box.id="acsReactBar"; box.className="acs-react";
    box.innerHTML='<p class="acs-react-q">यह पेज कैसा लगा?</p>'+
      '<div class="acs-react-row">'+
      '<button type="button" id="arLike" class="acs-rbtn" aria-pressed="false">👍 <span>पसंद</span></button>'+
      '<button type="button" id="arDis" class="acs-rbtn" aria-pressed="false">👎 <span>नापसंद</span></button>'+
      '<a id="arCmt" class="acs-rbtn" target="_blank" rel="noopener" href="'+WAPP+
        encodeURIComponent("इस पेज पर मेरी बात/सवाल: "+ttl+" — "+url)+'">💬 <span>कमेंट</span></a>'+
      '<button type="button" id="arShare" class="acs-rbtn">🔗 <span>शेयर</span></button>'+
      '</div><p id="arNote" class="acs-react-note" style="display:none"></p>';
    slot.appendChild(box);
    var L=document.getElementById("arLike"),D=document.getElementById("arDis"),
        S=document.getElementById("arShare"),N=document.getElementById("arNote");
    function paint(){
      L.className="acs-rbtn"+(cur==="like"?" acs-ron":"");
      D.className="acs-rbtn"+(cur==="dis"?" acs-roff":"");
      L.setAttribute("aria-pressed",cur==="like"?"true":"false");
      D.setAttribute("aria-pressed",cur==="dis"?"true":"false");
    }
    function note(m){ N.textContent=m; N.style.display="block"; }
    function vote(v){
      cur=(cur===v)?"":v;
      try{ localStorage.setItem(KEY,cur); }catch(e){}
      paint();
      if(cur==="like") note("धन्यवाद! आपकी राय दर्ज हुई।");
      else if(cur==="dis") note("राय दर्ज। क्या सुधारें? 💬 कमेंट से बताइए — हम पढ़ते हैं।");
      else N.style.display="none";
    }
    L.onclick=function(){vote("like");};
    D.onclick=function(){vote("dis");};
    S.onclick=function(){
      var done=false;
      try{ if(navigator.share){ navigator.share({title:ttl,url:url}); done=true; } }catch(e){}
      if(!done){ try{ window.open(WAPP+encodeURIComponent(ttl+" — "+url),"_blank"); }catch(e){} }
    };
    paint();
  }catch(e){}
})();
