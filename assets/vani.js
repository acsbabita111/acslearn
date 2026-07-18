/* ═══════════════════════════════════════════════════════════════
   /assets/vani.js — वाणी साझा घटक (चरण-2)
   एकमात्र घर। हर dashboard में #pnl-vani पैनल इसी से जीता होता है।
   ----------------------------------------------------------------
   नियम-आधार:
     • dashboard का पहले से login user ही इस्तेमाल — कोई anonymous auth नहीं
       (v4 rules · dashboard.js में addDoc=0)।
     • लिखाई सिर्फ़ functions से: vaniOpen · vaniSay · vaniLeave।
     • पढ़ाई onSnapshot से (rules v5: login वाले को read खुला)।
     • call चलते वक़्त 10-मिनट auto-logout रुके (window.__acsKeepAwake)।
     • अनुवाद MyMemory (keyless) — भारतीय भाषाएं आगे Bhashini (चरण-3+)।
     • कोई heartbeat नहीं — presence कमरे के members से (पैमाना-होल बंद)।
   निर्भरता: dashboard.js पहले चला हो और window.__ACS_VANI सेट किया हो:
     { app, auth, functions, httpsCallable, firestore:{getFirestore,collection,
       query,orderBy,onSnapshot}, uid, lang }
   ═══════════════════════════════════════════════════════════════ */
(function(){
  "use strict";
  const PANEL_ID = "pnl-vani";

  function boot(ctx){
    const panel = document.getElementById(PANEL_ID);
    if(!panel || !ctx) return;
    const { functions, httpsCallable, firestore, uid } = ctx;
    const { getFirestore, collection, query, orderBy, onSnapshot } = firestore;
    const db = getFirestore(ctx.app);
    let myLang = ctx.lang || "hi";

    // ---- भाषाएं (साझा — संक्षिप्त; पूरी सूची चरण-3 में data-फ़ाइल से) ----
    const L = [
      ["hi","hi","हिंदी","hi-IN"],["bho","hi","भोजपुरी","hi-IN"],["bn","bn","বাংলা","bn-IN"],
      ["mr","mr","मराठी","mr-IN"],["kn","kn","ಕನ್ನಡ","kn-IN"],["ta","ta","தமிழ்","ta-IN"],
      ["te","te","తెలుగు","te-IN"],["gu","gu","ગુજરાતી","gu-IN"],["ml","ml","മലയാളം","ml-IN"],
      ["pa","pa","ਪੰਜਾਬੀ","pa-IN"],["or","or","ଓଡ଼ିଆ","or-IN"],["as","as","অসমীয়া","as-IN"],
      ["ur","ur","اردو","ur-IN"],["en","en","English","en-IN"],["ne","ne","नेपाली","ne-NP"],
      ["ar","ar","العربية","ar-SA"],["sw","sw","Kiswahili","sw-KE"],["fr","fr","Français","fr-FR"],
      ["es","es","Español","es-ES"],["pt","pt","Português","pt-BR"],["id","id","Bahasa","id-ID"]
    ];
    const byc = c => L.find(x=>x[0]===c) || L[0];

    // ---- auto-logout रोक: call चलते वक़्त ----
    function keepAwake(on){ try{ window.__acsVaniActive = !!on; }catch(e){} }

    // ---- पैनल का ढाँचा ----
    panel.innerHTML =
      '<h3 style="margin:0 0 4px">📱 वाणी — अपनी भाषा में बात</h3>'+
      '<p style="font-size:14px;color:#607D8B;margin:0 0 12px">कमरा बनाएँ या कोड डालकर जुड़ें — हर कोई अपनी भाषा में सुने/पढ़े।</p>'+
      '<div id="v-setup">'+
      '  <label style="font-weight:700;display:block;margin:6px 0 4px">मेरी भाषा</label>'+
      '  <select id="v-lang" style="width:100%;padding:11px;border:2px solid #1565C0;border-radius:10px;font-size:16px;min-height:48px"></select>'+
      '  <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">'+
      '    <button id="v-create" class="btn-out" style="flex:1;min-width:150px;background:#2E7D32;color:#fff;border:none;border-radius:10px;padding:13px;font-weight:800;font-size:16px;min-height:50px">➕ नया कमरा</button>'+
      '  </div>'+
      '  <div style="display:flex;gap:8px;margin-top:10px">'+
      '    <input id="v-code" inputmode="numeric" maxlength="4" placeholder="कोड" style="flex:1;text-align:center;letter-spacing:5px;font-size:22px;font-weight:800;padding:11px;border:2px solid #E8EDF5;border-radius:10px;min-height:48px"/>'+
      '    <button id="v-join" class="btn-out" style="background:#1565C0;color:#fff;border:none;border-radius:10px;padding:0 18px;font-weight:800;font-size:16px;min-height:48px">जुड़ें</button>'+
      '  </div>'+
      '  <div id="v-msg" style="font-size:13px;color:#a02020;margin-top:8px"></div>'+
      '</div>'+
      '<div id="v-live" style="display:none">'+
      '  <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;background:#0B1F3A;color:#fff;border-radius:12px;padding:10px 14px;flex-wrap:wrap">'+
      '    <div>कमरा <b id="v-room" style="color:#F9A825;font-size:20px;letter-spacing:2px">0000</b> <span id="v-who" style="font-size:13px;color:#cfd8e3"></span></div>'+
      '    <button id="v-leave" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);border-radius:8px;padding:7px 12px;font-weight:700;min-height:38px">छोड़ें</button>'+
      '  </div>'+
      '  <div id="v-chat" style="min-height:180px;max-height:340px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:10px 2px"></div>'+
      '  <div style="display:flex;gap:8px">'+
      '    <button id="v-mic" title="बोलें" style="flex-shrink:0;width:54px;background:#2E7D32;color:#fff;border:none;border-radius:10px;font-size:22px;min-height:50px">🎤</button>'+
      '    <input id="v-in" placeholder="अपनी भाषा में लिखें…" style="flex:1;font-size:16px;padding:12px;border:2px solid #E8EDF5;border-radius:10px;min-height:50px"/>'+
      '    <button id="v-send" style="flex-shrink:0;background:#1565C0;color:#fff;border:none;border-radius:10px;padding:0 16px;font-weight:800;min-height:50px">भेजें</button>'+
      '  </div>'+
      '  <div id="v-hint" style="font-size:12px;color:#607D8B;margin-top:6px"></div>'+
      '</div>';

    const $ = s => panel.querySelector(s);
    const sel = $("#v-lang");
    L.forEach(l=>{ const o=document.createElement("option"); o.value=l[0]; o.textContent=l[2]; sel.appendChild(o); });
    sel.value = myLang; sel.onchange = ()=> myLang = sel.value;

    let roomId=null, roomCode=null, unsub=null, seen=new Set();

    function show(v){ $("#v-setup").style.display = v?"none":"block"; $("#v-live").style.display = v?"block":"none"; }
    function say(t){ $("#v-msg").textContent = t||""; }

    async function open(code){
      say("");
      try{
        const r = await httpsCallable(functions,"vaniOpen")({ lang:myLang, code:code||"", type:"public" });
        const d = r.data;
        roomId = d.roomId; roomCode = d.code;
        $("#v-room").textContent = d.code;
        show(true); keepAwake(true); seen = new Set();
        sysline(code ? "कमरे में जुड़ गए।" : "कमरा बना — कोड बताएँ।");
        listen();
      }catch(e){ say(niceErr(e)); }
    }
    $("#v-create").onclick = ()=> open("");
    $("#v-join").onclick   = ()=>{ const c=($("#v-code").value||"").trim(); if(!/^\d{4}$/.test(c)){ say("कोड 4 अंकों का हो"); return; } open(c); };

    function listen(){
      const q = query(collection(db,"vani_rooms",roomId,"messages"), orderBy("at"));
      unsub = onSnapshot(q, snap=>{
        snap.docChanges().forEach(ch=>{
          if(ch.type!=="added") return;
          if(seen.has(ch.doc.id)) return; seen.add(ch.doc.id);
          const m = ch.doc.data(); if(!m) return;
          render(m, m.by===uid);
        });
      }, err=>{ $("#v-hint").innerHTML = '<span style="color:#a02020">पढ़ने में रुकावट — rules v5 publish हुए?</span>'; });
    }

    async function send(text){
      text=(text||"").trim(); if(!text||!roomId) return;
      $("#v-in").value="";
      try{ await httpsCallable(functions,"vaniSay")({ roomId, text, lang:myLang }); }
      catch(e){ sysline("भेजा नहीं गया: "+niceErr(e)); }
    }
    $("#v-send").onclick = ()=> send($("#v-in").value);
    $("#v-in").addEventListener("keydown", e=>{ if(e.key==="Enter") send(e.target.value); });

    $("#v-leave").onclick = async ()=>{
      if(unsub){ unsub(); unsub=null; }
      keepAwake(false);
      try{ if(roomId) await httpsCallable(functions,"vaniLeave")({ roomId }); }catch(e){}
      roomId=null; roomCode=null; $("#v-chat").innerHTML=""; show(false);
    };

    // ---- render + translate ----
    function sysline(t){ const d=document.createElement("div"); d.style.cssText="align-self:center;background:#FFF6DC;border:1px solid #f3e3ad;color:#7a5b00;font-size:12px;font-weight:700;padding:5px 12px;border-radius:16px"; d.textContent=t; $("#v-chat").appendChild(d); sc(); }
    async function render(m, mine){
      const b=document.createElement("div");
      b.style.cssText = "max-width:85%;padding:10px 13px;border-radius:14px;font-size:16px;line-height:1.5;"+
        (mine ? "align-self:flex-end;background:#E3F2FD;border:1px solid #b9dcff" : "align-self:flex-start;background:#fff;border:1px solid #E8EDF5");
      const nm = m.byName ? esc(m.byName) : (mine?"आप":"सदस्य");
      const tag = mine ? "" : " · "+byc(m.srcLang)[2];
      b.innerHTML = '<div style="font-size:11px;font-weight:700;opacity:.65;margin-bottom:3px">'+nm+tag+' <button class="v-spk" style="border:none;background:rgba(0,0,0,.05);border-radius:6px;padding:1px 6px;cursor:pointer">🔊</button></div>'+
                    '<div class="v-body">'+esc(m.text)+'</div>';
      $("#v-chat").appendChild(b); sc();
      let out = m.text;
      if(!mine && m.srcLang && m.srcLang!==myLang){
        out = await tr(m.text, byc(m.srcLang)[1], byc(myLang)[1]);
        b.querySelector(".v-body").textContent = out;
        const o=document.createElement("div"); o.style.cssText="font-size:12px;color:#607D8B;margin-top:4px"; o.textContent="मूल ("+byc(m.srcLang)[2]+"): "+m.text; b.appendChild(o);
      }
      b.querySelector(".v-spk").onclick = ()=> speak(b.querySelector(".v-body").textContent, byc(myLang)[3]);
      if(!mine) speak(out, byc(myLang)[3]);
    }
    async function tr(text,s,t){
      if(s===t) return text;
      try{ const r=await fetch("https://api.mymemory.translated.net/get?q="+encodeURIComponent(text)+"&langpair="+s+"|"+t);
        const d=await r.json(); const x=d&&d.responseData&&d.responseData.translatedText;
        if(x && !/MYMEMORY WARNING|INVALID/i.test(x)){ const ta=document.createElement("textarea"); ta.innerHTML=x; return ta.value; } }catch(e){}
      return text;
    }
    let voices=[]; function lv(){ voices=window.speechSynthesis?speechSynthesis.getVoices():[]; }
    if(window.speechSynthesis){ lv(); speechSynthesis.onvoiceschanged=lv; }
    function speak(t,bcp){ if(!window.speechSynthesis) return; speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(t); u.lang=bcp; const base=bcp.split("-")[0]; const v=voices.find(v=>v.lang===bcp)||voices.find(v=>v.lang&&v.lang.startsWith(base)); if(v)u.voice=v; u.rate=.95; speechSynthesis.speak(u); }
    function esc(s){ const d=document.createElement("div"); d.textContent=s; return d.innerHTML; }
    function sc(){ const c=$("#v-chat"); c.scrollTop=c.scrollHeight; }

    // ---- mic (best-effort) ----
    const SR = window.SpeechRecognition||window.webkitSpeechRecognition;
    const mic=$("#v-mic"), hint=$("#v-hint"); let rec=null, listening=false;
    if(SR){ hint.textContent="माइक दबाकर बोलें, या लिखकर भेजें।";
      mic.onclick=()=>{ if(listening){ rec&&rec.stop(); return; }
        rec=new SR(); rec.lang=byc(myLang)[3]; rec.interimResults=false;
        rec.onstart=()=>{ listening=true; mic.style.background="#C62828"; };
        rec.onresult=ev=> send(ev.results[0][0].transcript);
        rec.onerror=()=>{ hint.textContent="माइक नहीं चला — लिखकर भेजें।"; };
        rec.onend=()=>{ listening=false; mic.style.background="#2E7D32"; };
        rec.start(); }; }
    else { mic.style.display="none"; hint.textContent="इस फ़ोन में माइक नहीं — लिखकर भेजें।"; }

    function niceErr(e){ const c=(e&&e.code)||""; const m=(e&&e.message)||"त्रुटि";
      if(/unauthenticated/.test(c)) return "पहले login ज़रूरी।";
      if(/not-found/.test(c)) return "यह कमरा नहीं मिला।";
      if(/resource-exhausted/.test(c)) return m;
      if(/permission-denied/.test(c)) return m;
      return m; }
  }

  // dashboard.js तैयार होने पर context देता है; न मिले तो थोड़ा इंतज़ार
  let tries=0;
  (function wait(){
    if(window.__ACS_VANI){ boot(window.__ACS_VANI); return; }
    if(tries++ < 40){ setTimeout(wait, 150); return; }
    const p=document.getElementById("pnl-vani");
    if(p) p.innerHTML='<h3>📱 वाणी</h3><p style="color:#a02020">वाणी अभी लोड नहीं हो पाई — पेज दोबारा खोलें।</p>';
  })();
})();
