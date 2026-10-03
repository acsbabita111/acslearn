/* ═══════════════════════════════════════════════════════════════
   /assets/vani.js v5.0 — वाणी mesh-बैठक (6 तक) + refresh-वापसी, 04-Oct-2026
   v5: 1↔1 → हर-से-हर mesh (join/offer-to/answer-to/leave) · किसी के निकलने पर
   सिर्फ़ उसकी खिड़की बंद (होल-3 बंद) · अपने 🎤/📷 + हर साथी पर 🔊 (होल-2 बंद) ·
   refresh पर कमरा auto-वापसी (sessionStorage; call दोबारा 📹 से) ·
   भाषा-नियम अब प्रति-साथी: उसकी भाषा ≠ मेरी ⇒ उसकी मूल आवाज़ default-चुप।
   signaling = vaniRtc → उसी messages-धारा में via:"rtc" (chat में अदृश्य)।
   सीमा दर्ज: अलग नेटवर्क पर बिना TURN जुड़ाव अनिश्चित — पहली जाँच एक WiFi पर।
   एकमात्र घर। हर dashboard में #pnl-vani पैनल इसी से जीता होता है।
   ----------------------------------------------------------------
   नियम-आधार:
     • dashboard का पहले से login user ही इस्तेमाल — कोई anonymous auth नहीं
       (v4 rules · dashboard.js में addDoc=0)।
     • लिखाई सिर्फ़ functions से: vaniOpen · vaniSay · vaniLeave।
     • पढ़ाई onSnapshot से (rules v5: login वाले को read खुला)।
     • call चलते वक़्त 10-मिनट auto-logout रुके (window.__acsKeepAwake)।
     • 🎙️ आवाज़-संदेश: बोलो → server vaniSpeak (भाषिणी ASR→अनुवाद→TTS) —
       श्रोता को उसकी भाषा की असली आवाज़; text-अनुवाद अभी MyMemory (fallback)।
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
      '    <button id="v-vid" style="background:#F9A825;color:#0B1F3A;border:none;border-radius:8px;padding:7px 12px;font-weight:800;min-height:38px">📹 विडियो</button>'+
      '    <button id="v-leave" style="background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);border-radius:8px;padding:7px 12px;font-weight:700;min-height:38px">छोड़ें</button>'+
      '  </div>'+
      '  <div id="v-stage" style="display:none;background:#000;border-radius:12px;overflow:hidden;margin-top:10px">'+
      '    <div id="v-grid" style="display:flex;flex-wrap:wrap;gap:4px;padding:4px;background:#000"></div>'+
      '    <div style="display:flex;gap:6px;align-items:center;background:#0B1F3A;padding:8px;flex-wrap:wrap">'+
      '      <button id="v-mic2" style="flex-shrink:0;width:46px;min-height:42px;border:none;border-radius:8px;background:#2E7D32;color:#fff;font-size:18px">🎤</button>'+
      '      <button id="v-cam"  style="flex-shrink:0;width:46px;min-height:42px;border:none;border-radius:8px;background:#2E7D32;color:#fff;font-size:18px">📷</button>'+
      '      <select id="v-clang" style="flex:1;min-width:110px;min-height:42px;padding:7px;border-radius:8px;border:2px solid #F9A825;background:#fff;font-size:15px;font-weight:700"></select>'+
      '      <button id="v-file" style="flex-shrink:0;background:#F9A825;color:#0B1F3A;border:none;border-radius:8px;padding:0 12px;font-weight:800;font-size:15px;min-height:42px">📎</button>'+
      '      <button id="v-hang" style="flex-shrink:0;background:#C62828;color:#fff;border:none;border-radius:8px;padding:0 12px;font-weight:800;font-size:15px;min-height:42px">⏹ निकलें</button>'+
      '      <input id="v-fin" type="file" accept="image/jpeg,image/png,image/webp,application/pdf" style="display:none"/>'+
      '    </div>'+
      '  </div>'+
      '  <div id="v-ring" style="display:none;background:#FFF6DC;border:1px solid #f3e3ad;border-radius:12px;padding:10px;margin-top:10px;text-align:center">'+
      '    <div id="v-ringtxt" style="font-weight:800;margin-bottom:8px">📹 विडियो-call…</div>'+
      '    <button id="v-accept" style="background:#2E7D32;color:#fff;border:none;border-radius:10px;padding:11px 20px;font-weight:800;min-height:46px">जुड़ें</button>'+
      '  </div>'+
      '  <div id="v-chat" style="min-height:180px;max-height:340px;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding:10px 2px"></div>'+
      '  <div id="v-talkrow" style="margin:0 0 8px">'+
      '    <button id="v-talk" style="width:100%;background:#0B1F3A;color:#F9A825;border:2px solid #F9A825;border-radius:12px;padding:14px;font-weight:800;font-size:17px;min-height:54px">🎙️ बोलो — दबाएँ, बोलें, फिर दबाएँ</button>'+
      '    <div id="v-talkst" style="font-size:13px;color:#607D8B;margin-top:4px;min-height:17px"></div>'+
      '  </div>'+
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

    let roomId=null, roomCode=null, unsub=null, seen=new Set(), langsSeen=new Set(), opening=false;

    function show(v){ $("#v-setup").style.display = v?"none":"block"; $("#v-live").style.display = v?"block":"none"; }
    function say(t){ $("#v-msg").textContent = t||""; }

    async function open(code){
      if(opening || roomId) return;
      opening=true;
      const cb=$("#v-create"), jb=$("#v-join"); if(cb)cb.disabled=true; if(jb)jb.disabled=true;
      say("");
      try{
        const r = await httpsCallable(functions,"vaniOpen")({ lang:myLang, code:code||"", type:"public" });
        const d = r.data;
        roomId = d.roomId; roomCode = d.code;
        $("#v-room").textContent = d.code;
        show(true); keepAwake(true); seen = new Set();
        sysline(code ? "कमरे में जुड़ गए।" : "कमरा बना — कोड बताएँ।");
        try{ sessionStorage.setItem("acs_vani_room", d.code); }catch(e){}
        listen();
      }catch(e){ say(niceErr(e)); }
      finally{ opening=false; if(cb)cb.disabled=false; if(jb)jb.disabled=false; }
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
    // ---- ✓/✓✓ (v4): अपने संदेश पर tick; सामने वाले के देखते ही हरा ----
    let ownTicks=[], seenSentAt=0;
    function tickSpan(){ const t=document.createElement("span");
      t.textContent="✓"; t.style.cssText="margin-left:6px;font-weight:900;color:#37474F";
      ownTicks.push(t); return t; }
    function markSeen(){ ownTicks.forEach(function(t){ t.textContent="✓✓"; t.style.color="#2E7D32"; }); }
    function sendSeen(){ if(!roomId) return; const now=Date.now();
      if(now-seenSentAt<2500) return; seenSentAt=now;
      httpsCallable(functions,"vaniRtc")({roomId, kind:"seen", lang:myLang}).catch(function(){}); }
    function renderFile(m, mine){
      const b=document.createElement("div");
      b.style.cssText = "max-width:85%;padding:10px 13px;border-radius:14px;font-size:16px;line-height:1.5;"+
        (mine ? "align-self:flex-end;background:#E3F2FD;border:1px solid #b9dcff" : "align-self:flex-start;background:#fff;border:1px solid #E8EDF5");
      const nm = m.byName ? esc(m.byName) : (mine?"आप":"सदस्य");
      const kb = m.size ? " · "+Math.max(1,Math.round(m.size/1024))+" KB" : "";
      b.innerHTML = '<div class="v-hdr" style="font-size:11px;font-weight:700;opacity:.65;margin-bottom:3px">📎 '+nm+'</div>'+
        '<div>📄 '+esc(m.name||"file")+kb+'</div>'+
        '<a href="'+(m.url||"#")+'" target="_blank" rel="noopener" style="display:inline-block;margin-top:6px;background:#1565C0;color:#fff;border-radius:8px;padding:7px 14px;font-weight:800;text-decoration:none">खोलें / सहेजें</a>';
      if(mine) b.querySelector(".v-hdr").appendChild(tickSpan());
      $("#v-chat").appendChild(b); sc();
      if(!mine) sendSeen();
    }
    function playUrl(u, fbTxt){
      try{ const a=new Audio(u); a.play().catch(function(){ if(fbTxt) speak(fbTxt, byc(myLang)[3]); }); }
      catch(e){ if(fbTxt) speak(fbTxt, byc(myLang)[3]); }
    }
    function renderVoice(m, mine){
      const b=document.createElement("div");
      b.style.cssText = "max-width:85%;padding:10px 13px;border-radius:14px;font-size:16px;line-height:1.5;"+
        (mine ? "align-self:flex-end;background:#E3F2FD;border:1px solid #b9dcff" : "align-self:flex-start;background:#FFF8E7;border:1px solid #f1e2b6");
      const nm = m.byName ? esc(m.byName) : (mine?"आप":"सदस्य");
      const my = (!mine && m.tr && m.tr[myLang]) ? m.tr[myLang] : null;
      const shown = (my && my.text) ? my.text : m.text;
      b.innerHTML = '<div style="font-size:11px;font-weight:700;opacity:.65;margin-bottom:3px">🎙️ '+nm+(mine?"":" · "+byc(m.srcLang)[2])+' <button class="v-spk" style="border:none;background:rgba(0,0,0,.05);border-radius:6px;padding:1px 6px;cursor:pointer">🔊</button></div>'+
                    '<div class="v-body">'+esc(shown)+'</div>';
      if(!mine && m.srcLang && m.srcLang!==myLang){
        const o=document.createElement("div"); o.style.cssText="font-size:12px;color:#607D8B;margin-top:4px";
        o.textContent="मूल ("+byc(m.srcLang)[2]+"): "+m.text; b.appendChild(o);
      }
      if(mine){ const h=b.querySelector("div"); if(h) h.appendChild(tickSpan()); }
      $("#v-chat").appendChild(b); sc();
      if(!mine) sendSeen();
      const url = (my && my.audio) || null;
      b.querySelector(".v-spk").onclick = function(){ if(url) playUrl(url, shown); else speak(shown, byc(myLang)[3]); };
      if(!mine){ if(url) playUrl(url, shown); else speak(shown, byc(myLang)[3]); }
    }
    async function render(m, mine){
      if(m.via==="rtc"){ handleRtc(m, mine); return; }
      if(m.srcLang) langsSeen.add(m.srcLang);
      if(m.via==="file"){ renderFile(m, mine); return; }
      if(m.via==="voice"){ renderVoice(m, mine); return; }
      const b=document.createElement("div");
      b.style.cssText = "max-width:85%;padding:10px 13px;border-radius:14px;font-size:16px;line-height:1.5;"+
        (mine ? "align-self:flex-end;background:#E3F2FD;border:1px solid #b9dcff" : "align-self:flex-start;background:#fff;border:1px solid #E8EDF5");
      const nm = m.byName ? esc(m.byName) : (mine?"आप":"सदस्य");
      const tag = mine ? "" : " · "+byc(m.srcLang)[2];
      b.innerHTML = '<div style="font-size:11px;font-weight:700;opacity:.65;margin-bottom:3px">'+nm+tag+' <button class="v-spk" style="border:none;background:rgba(0,0,0,.05);border-radius:6px;padding:1px 6px;cursor:pointer">🔊</button></div>'+
                    '<div class="v-body">'+esc(m.text)+'</div>';
      if(mine){ const h=b.querySelector("div"); if(h) h.appendChild(tickSpan()); }
      $("#v-chat").appendChild(b); sc();
      if(!mine) sendSeen();
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

    // ---- 📹 विडियो mesh-बैठक (v5: ≤6, हर-से-हर; signaling via:"rtc"+to) ----
    let inCall=false, myStream=null, pcs={}, tiles={}, peerLang={}, peerName={},
        pendingOffers={}, micOn=true, camOn=true;
    const vb=$("#v-vid"), stage=$("#v-stage"), grid=$("#v-grid"),
          ring=$("#v-ring"), ringtxt=$("#v-ringtxt"),
          micB=$("#v-mic2"), camB=$("#v-cam"), hangB=$("#v-hang"),
          clang=$("#v-clang"), fbtn=$("#v-file"), fin=$("#v-fin");
    const RTC = window.RTCPeerConnection;
    if(!RTC && vb) vb.style.display="none";
    function waitIce(p){ return new Promise(function(res){
      if(p.iceGatheringState==="complete") return res();
      const t=setTimeout(res,3000);
      p.addEventListener("icegatheringstatechange",function(){
        if(p.iceGatheringState==="complete"){ clearTimeout(t); res(); } });
    }); }
    function rtcSend(kind, extra){
      const d={roomId:roomId, kind:kind, lang:myLang};
      if(extra){ for(const k in extra) d[k]=extra[k]; }
      return httpsCallable(functions,"vaniRtc")(d).catch(function(){});
    }
    function mkTile(id, self){
      if(tiles[id]) return tiles[id];
      const w=document.createElement("div");
      w.style.cssText="position:relative;flex:1 1 46%;min-width:140px;background:#111;border-radius:8px;overflow:hidden";
      const v=document.createElement("video");
      v.autoplay=true; v.playsInline=true; v.setAttribute("playsinline","");
      if(self) v.muted=true;
      v.style.cssText="width:100%;height:100%;min-height:150px;object-fit:cover;background:#111;display:block";
      const lb=document.createElement("div");
      lb.style.cssText="position:absolute;left:4px;bottom:4px;background:rgba(11,31,58,.75);color:#fff;font-size:11px;padding:2px 7px;border-radius:7px;max-width:88%";
      const bd=document.createElement("div");
      bd.style.cssText="position:absolute;left:4px;top:4px;background:rgba(11,31,58,.75);color:#F9A825;font-size:10px;padding:2px 6px;border-radius:7px";
      w.appendChild(v); w.appendChild(lb); w.appendChild(bd);
      let sp=null;
      if(!self){
        sp=document.createElement("button");
        sp.style.cssText="position:absolute;right:4px;top:4px;background:rgba(255,255,255,.25);color:#fff;border:none;border-radius:7px;padding:4px 8px;font-size:13px";
        sp.onclick=function(){ v.muted=!v.muted; sp.textContent=v.muted?"🔇":"🔊"; };
        w.appendChild(sp);
      }
      grid.appendChild(w);
      tiles[id]={el:w, video:v, label:lb, badge:bd, spk:sp};
      refreshTile(id, self);
      return tiles[id];
    }
    function refreshTile(id, self){
      const t=tiles[id]; if(!t) return;
      t.label.textContent = (self?"आप":(peerName[id]||"सदस्य"))+" · "+byc(self?myLang:(peerLang[id]||"hi"))[2];
      if(self){ t.badge.textContent = (micOn?"":"🎤✖ ")+(camOn?"":"📷✖"); return; }
      const diff = peerLang[id] && peerLang[id]!==myLang;
      if(diff && t.spk && t.video.muted!==false){ /* default-चुप सिर्फ़ शुरुआत में */ }
      if(diff){ t.badge.textContent="🌐 अलग भाषा — 🎙️ अनुवाद-रास्ता";
        if(t.spk && t.spk.textContent===""){ t.video.muted=true; } }
      else t.badge.textContent="एक भाषा — सीधी आवाज़";
      if(t.spk && t.spk.textContent==="") t.spk.textContent = t.video.muted?"🔇":"🔊";
      else if(t.spk) t.spk.textContent = t.video.muted?"🔇":"🔊";
    }
    function newPc(id){
      const pc=new RTC({iceServers:[{urls:["stun:stun.l.google.com:19302","stun:stun1.l.google.com:19302"]}]});
      pc.ontrack=function(ev){ if(ev.streams&&ev.streams[0]){
        const t=mkTile(id,false); t.video.srcObject=ev.streams[0];
        if(peerLang[id] && peerLang[id]!==myLang){ t.video.muted=true; }
        refreshTile(id,false); } };
      pc.onconnectionstatechange=function(){
        if(pc.connectionState==="failed")
          sysline((peerName[id]||"सदस्य")+" से जुड़ाव नहीं बना — एक ही WiFi पर आज़माएँ (TURN अगला दौर)।");
      };
      myStream.getTracks().forEach(function(tr){ pc.addTrack(tr, myStream); });
      pcs[id]=pc; return pc;
    }
    function closePeer(id, tell){
      try{ pcs[id]&&pcs[id].close(); }catch(e){}
      delete pcs[id]; delete pendingOffers[id];
      if(tiles[id]){ try{ tiles[id].el.remove(); }catch(e){} delete tiles[id]; }
      if(tell) sysline((peerName[id]||"एक सदस्य")+" call से निकले — बाक़ी जुड़े रहें।");
    }
    async function ensureMedia(){
      if(myStream) return true;
      try{ myStream=await navigator.mediaDevices.getUserMedia({
        video:{width:{ideal:320},height:{ideal:240},frameRate:{ideal:12}},
        audio:{echoCancellation:true,noiseSuppression:true}}); }
      catch(e){ sysline("कैमरा/माइक की अनुमति नहीं मिली।"); return false; }
      const t=mkTile("__me",true); t.video.srcObject=myStream;
      stage.style.display="block"; keepAwake(true); return true;
    }
    async function enterCall(){
      if(inCall) return;
      if(!roomId){ sysline("पहले कमरा खोलें/जुड़ें।"); return; }
      if(!(await ensureMedia())) return;
      inCall=true; ring.style.display="none"; if(vb) vb.style.display="none";
      await rtcSend("join");
      for(const id in pendingOffers){ answerTo(id, pendingOffers[id]); delete pendingOffers[id]; }
    }
    async function offerTo(id){
      if(pcs[id] || id===uid) return;
      if(Object.keys(pcs).length>=5){ sysline("बैठक-सीमा (6) भर गई।"); return; }
      const pc=newPc(id);
      const off=await pc.createOffer(); await pc.setLocalDescription(off); await waitIce(pc);
      rtcSend("offer",{to:id, sdp:pc.localDescription.sdp});
    }
    async function answerTo(id, sdp){
      if(id===uid) return;
      if(Object.keys(pcs).length>=5){ sysline("बैठक-सीमा (6) भर गई।"); return; }
      const pc=pcs[id]||newPc(id);
      await pc.setRemoteDescription({type:"offer", sdp:sdp});
      const ans=await pc.createAnswer(); await pc.setLocalDescription(ans); await waitIce(pc);
      rtcSend("answer",{to:id, sdp:pc.localDescription.sdp});
    }
    function hangUp(tell){
      if(tell) rtcSend("leave");
      for(const id in pcs) closePeer(id,false);
      try{ myStream&&myStream.getTracks().forEach(function(t){t.stop();}); }catch(e){}
      myStream=null; inCall=false; pendingOffers={};
      if(tiles.__me){ try{ tiles.__me.el.remove(); }catch(e){} delete tiles.__me; }
      grid.innerHTML=""; tiles={};
      stage.style.display="none"; ring.style.display="none";
      micOn=true; camOn=true;
      if(micB){ micB.textContent="🎤"; micB.style.background="#2E7D32"; }
      if(camB){ camB.textContent="📷"; camB.style.background="#2E7D32"; }
      if(vb){ vb.style.display=""; vb.textContent="📹 विडियो"; }
    }
    function handleRtc(m, mine){
      const ts=(m.at&&m.at.toMillis)?m.at.toMillis():0;
      if(ts && Date.now()-ts>120000) return;
      if(m.by===uid) return;
      if(m.byName) peerName[m.by]=m.byName;
      if(m.srcLang) peerLang[m.by]=m.srcLang;
      if(m.kind==="seen"){ markSeen(); return; }
      if(m.kind==="lang"){ if(tiles[m.by]) refreshTile(m.by,false);
        if(inCall||tiles[m.by]) sysline((peerName[m.by]||"सदस्य")+" की भाषा अब: "+byc(m.srcLang)[2]); return; }
      if(m.kind==="join"){
        if(inCall){ offerTo(m.by); }
        else { ringtxt.textContent="📹 "+(peerName[m.by]||"सदस्य")+" ने विडियो-call शुरू की — जुड़ें?";
               ring.style.display="block"; }
        return; }
      if(m.kind==="offer"){ if(m.to && m.to!==uid) return;
        if(inCall) answerTo(m.by, m.sdp);
        else { pendingOffers[m.by]=m.sdp;
               ringtxt.textContent="📹 "+(peerName[m.by]||"सदस्य")+" ने विडियो-call शुरू की — जुड़ें?";
               ring.style.display="block"; }
        return; }
      if(m.kind==="answer"){ if(m.to && m.to!==uid) return;
        if(pcs[m.by]) pcs[m.by].setRemoteDescription({type:"answer", sdp:m.sdp})
          .then(function(){ refreshTile(m.by,false); })
          .catch(function(){ sysline("जुड़ाव-त्रुटि — दोनों निकलकर दोबारा जुड़ें।"); });
        return; }
      if(m.kind==="leave" || m.kind==="end"){
        closePeer(m.by, inCall||!!tiles[m.by]);
        if(!inCall && !Object.keys(tiles).length){ ring.style.display="none"; }
        return; }
    }
    if(vb) vb.onclick=enterCall;
    const ab=$("#v-accept"); if(ab) ab.onclick=enterCall;
    if(hangB) hangB.onclick=function(){ hangUp(true); sysline("आप call से निकल गए — बाक़ी की बैठक चलती रहे।"); };
    if(micB) micB.onclick=function(){ if(!myStream) return; micOn=!micOn;
      myStream.getAudioTracks().forEach(function(t){t.enabled=micOn;});
      micB.textContent=micOn?"🎤":"🎤✖"; micB.style.background=micOn?"#2E7D32":"#C62828"; refreshTile("__me",true); };
    if(camB) camB.onclick=function(){ if(!myStream) return; camOn=!camOn;
      myStream.getVideoTracks().forEach(function(t){t.enabled=camOn;});
      camB.textContent=camOn?"📷":"📷✖"; camB.style.background=camOn?"#2E7D32":"#C62828"; refreshTile("__me",true); };
    if(clang){ L.forEach(function(l){ const o=document.createElement("option");
        o.value=l[0]; o.textContent=l[2]; clang.appendChild(o); });
      clang.value=myLang;
      clang.onchange=function(){ myLang=clang.value; sel.value=myLang;
        for(const id in tiles){ if(id!=="__me") refreshTile(id,false); }
        refreshTile("__me",true);
        if(roomId) rtcSend("lang");
        sysline("आपकी भाषा अब: "+byc(myLang)[2]); };
    }
    sel.addEventListener("change", function(){ if(clang) clang.value=myLang;
      for(const id in tiles){ if(id!=="__me") refreshTile(id,false); } });
    if(fbtn && fin){
      fbtn.onclick=function(){ fin.click(); };
      fin.onchange=function(){
        const f=fin.files && fin.files[0]; fin.value=""; if(!f||!roomId) return;
        if(f.size>2*1024*1024){ sysline("फ़ाइल 2MB से बड़ी है — छोटी भेजें।"); return; }
        sysline("📎 भेज रहे हैं: "+f.name+" …");
        const rd=new FileReader();
        rd.onload=function(){
          const b64=String(rd.result).split(",")[1]||"";
          httpsCallable(functions,"vaniFile")({roomId:roomId, name:f.name, mime:f.type, dataB64:b64, lang:myLang})
            .catch(function(e){ sysline("फ़ाइल नहीं गई: "+niceErr(e)); });
        };
        rd.readAsDataURL(f);
      };
    }
    const oldLeave=$("#v-leave").onclick;
    $("#v-leave").onclick=async function(){ if(inCall) hangUp(true);
      try{ sessionStorage.removeItem("acs_vani_room"); }catch(e){}
      if(oldLeave) await oldLeave(); };

    // ---- 🎙️ असली आवाज़ — भाषिणी-रास्ता (vaniSpeak) ----
    (function(){
      const tb=$("#v-talk"), ts=$("#v-talkst"), row=$("#v-talkrow");
      const AC = window.AudioContext || window.webkitAudioContext;
      if(!tb) return;
      if(!AC || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
        row.style.display="none"; return;  // पुराना रास्ता चलता रहे — बात कभी न रुके
      }
      let ctx=null, src=null, proc=null, stream=null, bufs=[], on=false, t0=0, tick=null, rate=48000;
      function st(t){ ts.textContent=t||""; }
      function wavB64(){
        let len=0,i; for(i=0;i<bufs.length;i++) len+=bufs[i].length;
        const all=new Float32Array(len); let o=0;
        for(i=0;i<bufs.length;i++){ all.set(bufs[i],o); o+=bufs[i].length; }
        const ratio=rate/16000, n=Math.floor(all.length/ratio), pcm=new Int16Array(n);
        for(i=0;i<n;i++){ let v=all[Math.floor(i*ratio)]; v=Math.max(-1,Math.min(1,v)); pcm[i]=v<0?v*0x8000:v*0x7FFF; }
        const buf=new ArrayBuffer(44+pcm.length*2), dv=new DataView(buf);
        function ws(p,x){ for(let k=0;k<x.length;k++) dv.setUint8(p+k,x.charCodeAt(k)); }
        ws(0,"RIFF"); dv.setUint32(4,36+pcm.length*2,true); ws(8,"WAVE"); ws(12,"fmt ");
        dv.setUint32(16,16,true); dv.setUint16(20,1,true); dv.setUint16(22,1,true);
        dv.setUint32(24,16000,true); dv.setUint32(28,32000,true); dv.setUint16(32,2,true); dv.setUint16(34,16,true);
        ws(36,"data"); dv.setUint32(40,pcm.length*2,true);
        new Int16Array(buf,44).set(pcm);
        const u8=new Uint8Array(buf); let x="";
        for(i=0;i<u8.length;i+=0x8000) x+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));
        return btoa(x);
      }
      function teardown(){
        try{ proc&&proc.disconnect(); src&&src.disconnect(); }catch(e){}
        try{ stream&&stream.getTracks().forEach(function(t){t.stop();}); }catch(e){}
        try{ ctx&&ctx.close(); }catch(e){}
        if(tick){ clearInterval(tick); tick=null; }
        proc=src=stream=ctx=null; on=false;
        tb.textContent="🎙️ बोलो — दबाएँ, बोलें, फिर दबाएँ";
        tb.style.background="#0B1F3A"; tb.style.color="#F9A825";
      }
      async function start(){
        if(!roomId){ st("पहले कमरा खोलें/जुड़ें।"); return; }
        try{ stream = await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true}}); }
        catch(e){ st("माइक की अनुमति नहीं मिली — ऊपर Allow दबाएँ।"); return; }
        ctx=new AC(); rate=ctx.sampleRate||48000; bufs=[]; t0=Date.now(); on=true;
        src=ctx.createMediaStreamSource(stream);
        proc=ctx.createScriptProcessor(4096,1,1);
        proc.onaudioprocess=function(ev){ if(on) bufs.push(new Float32Array(ev.inputBuffer.getChannelData(0))); };
        src.connect(proc); proc.connect(ctx.destination);
        tb.textContent="⏺ बोल रहे हैं… रोकने के लिए फिर दबाएँ";
        tb.style.background="#C62828"; tb.style.color="#fff";
        tick=setInterval(function(){
          const sec=Math.floor((Date.now()-t0)/1000);
          st(sec+" सेकंड (अधिकतम 20)");
          if(sec>=20) stop(true);
        },500);
      }
      async function stop(sendIt){
        if(!on) return; on=false;
        const dur=(Date.now()-t0)/1000;
        const b64 = dur>=1 ? wavB64() : null;
        teardown();
        if(!sendIt || !b64){ st(b64?"":"बहुत छोटा — 1 सेकंड से ज़्यादा बोलें।"); return; }
        st("⏳ भाषिणी सुन-समझकर आवाज़ बना रही है…");
        const tgts=[]; langsSeen.forEach(function(x){ if(x && x!==myLang && tgts.length<5) tgts.push(x); });
        try{
          await httpsCallable(functions,"vaniSpeak")({ roomId, lang:myLang, audioB64:b64, mime:"wav", targetLangs:tgts });
          st("");
        }catch(e){ st("भेजा नहीं गया: "+niceErr(e)); }
      }
      tb.onclick=function(){ if(on) stop(true); else start(); };
    })();

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

    // ---- v5: refresh-वापसी — कमरा याद हो तो चुपचाप दोबारा जुड़ो (call दोबारा 📹 से) ----
    try{ const sv=sessionStorage.getItem("acs_vani_room");
      if(sv && /^\d{4}$/.test(sv)){ open(sv).then(function(){
        sysline("refresh के बाद कमरे में वापसी हो गई — call दोबारा 📹 से।"); }); } }catch(e){}

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

