/* ═══════════════════════════════════════════════════════════════
   /assets/vani.js v3.0 — वाणी साझा घटक (चरण-2 + 🎙️ आवाज़-पुल + 📹 विडियो-call, 03-Oct-2026)
   📹 नियम: एक भाषा = सीधी आवाज़ (शून्य देरी) · अलग भाषा = मूल आवाज़ चुप,
   अनुवादित आवाज़ 🎙️ बोलो-रास्ते से 3-8 सेकंड में (UN-दुभाषिया शैली)।
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
      '  <div id="v-stage" style="display:none;position:relative;background:#000;border-radius:12px;overflow:hidden;margin-top:10px">'+
      '    <video id="v-remote" autoplay playsinline style="width:100%;max-height:300px;display:block;background:#000"></video>'+
      '    <video id="v-local" autoplay playsinline muted style="position:absolute;right:8px;bottom:8px;width:28%;max-width:120px;border:2px solid #fff;border-radius:8px;background:#222"></video>'+
      '    <div id="v-vhint" style="position:absolute;left:8px;top:8px;right:140px;background:rgba(11,31,58,.75);color:#fff;font-size:12px;padding:4px 8px;border-radius:8px"></div>'+
      '    <button id="v-vorig" style="position:absolute;left:8px;bottom:8px;background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.4);border-radius:8px;padding:5px 9px;font-size:12px;display:none">🔇 मूल आवाज़ बंद है</button>'+
      '  </div>'+
      '  <div id="v-ring" style="display:none;background:#FFF6DC;border:1px solid #f3e3ad;border-radius:12px;padding:10px;margin-top:10px;text-align:center">'+
      '    <div style="font-weight:800;margin-bottom:8px">📹 विडियो-call आ रही है…</div>'+
      '    <button id="v-accept" style="background:#2E7D32;color:#fff;border:none;border-radius:10px;padding:11px 20px;font-weight:800;min-height:46px">उठाएँ</button>'+
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
      $("#v-chat").appendChild(b); sc();
      const url = (my && my.audio) || null;
      b.querySelector(".v-spk").onclick = function(){ if(url) playUrl(url, shown); else speak(shown, byc(myLang)[3]); };
      if(!mine){ if(url) playUrl(url, shown); else speak(shown, byc(myLang)[3]); }
    }
    async function render(m, mine){
      if(m.via==="rtc"){ handleRtc(m, mine); return; }
      if(m.srcLang) langsSeen.add(m.srcLang);
      if(m.via==="voice"){ renderVoice(m, mine); return; }
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

    // ---- 📹 विडियो-call (WebRTC, 1↔1; signaling via:"rtc") ----
    let pc=null, localSt=null, isCaller=false, remoteLang=null, pendingOffer=null;
    const vb=$("#v-vid"), stage=$("#v-stage"), ring=$("#v-ring"),
          rv=$("#v-remote"), lv2=$("#v-local"), vh=$("#v-vhint"), vo=$("#v-vorig");
    const RTC = window.RTCPeerConnection;
    if(!RTC && vb) vb.style.display="none";
    function vhint(t){ if(vh) vh.textContent=t||""; }
    function waitIce(p){ return new Promise(function(res){
      if(p.iceGatheringState==="complete") return res();
      const t=setTimeout(res,3000);
      p.addEventListener("icegatheringstatechange",function f(){
        if(p.iceGatheringState==="complete"){ clearTimeout(t); res(); } });
    }); }
    function applyLangRule(){
      if(!rv) return;
      if(remoteLang && remoteLang!==myLang){
        rv.muted=true; vo.style.display="block"; vo.textContent="🔇 मूल आवाज़ बंद है — सुनने के लिए दबाएँ";
        vhint("अलग भाषा ("+byc(remoteLang)[2]+") — 🎙️ बोलो दबाकर बोलें; अनुवादित आवाज़ 3-8 सेकंड में बजेगी।");
      } else {
        rv.muted=false; vo.style.display="none";
        vhint("एक भाषा — सीधी आवाज़, शून्य देरी।");
      }
    }
    if(vo) vo.onclick=function(){ rv.muted=!rv.muted;
      vo.textContent = rv.muted ? "🔇 मूल आवाज़ बंद है — सुनने के लिए दबाएँ" : "🔊 मूल आवाज़ चालू — बंद करने के लिए दबाएँ"; };
    async function makePc(){
      pc=new RTC({iceServers:[{urls:["stun:stun.l.google.com:19302","stun:stun1.l.google.com:19302"]}]});
      pc.ontrack=function(ev){ if(ev.streams&&ev.streams[0]){ rv.srcObject=ev.streams[0]; applyLangRule(); } };
      pc.onconnectionstatechange=function(){
        if(pc && (pc.connectionState==="failed"||pc.connectionState==="disconnected"))
          vhint("जुड़ाव टूटा — एक ही WiFi पर दोबारा आज़माएँ (TURN अगला दौर)।");
      };
      try{ localSt=await navigator.mediaDevices.getUserMedia({
        video:{width:{ideal:320},height:{ideal:240},frameRate:{ideal:12}},
        audio:{echoCancellation:true,noiseSuppression:true}}); }
      catch(e){ sysline("कैमरा/माइक की अनुमति नहीं मिली।"); endCall(false); return false; }
      lv2.srcObject=localSt;
      localSt.getTracks().forEach(function(t){ pc.addTrack(t, localSt); });
      stage.style.display="block"; keepAwake(true); return true;
    }
    function endCall(tell){
      try{ pc&&pc.close(); }catch(e){}
      try{ localSt&&localSt.getTracks().forEach(function(t){t.stop();}); }catch(e){}
      pc=null; localSt=null; isCaller=false; remoteLang=null; pendingOffer=null;
      if(stage) stage.style.display="none"; if(ring) ring.style.display="none";
      if(rv) rv.srcObject=null; if(lv2) lv2.srcObject=null;
      if(vb){ vb.textContent="📹 विडियो"; }
      if(tell && roomId) httpsCallable(functions,"vaniRtc")({roomId, kind:"end", lang:myLang}).catch(function(){});
    }
    async function startCall(){
      if(pc){ endCall(true); sysline("विडियो-call समाप्त।"); return; }
      isCaller=true;
      if(!(await makePc())) return;
      vb.textContent="⏹ call बंद करें"; vhint("सामने वाले के उठाने की प्रतीक्षा…");
      const off=await pc.createOffer(); await pc.setLocalDescription(off); await waitIce(pc);
      try{ await httpsCallable(functions,"vaniRtc")({roomId, kind:"offer", sdp:pc.localDescription.sdp, lang:myLang}); }
      catch(e){ sysline("call नहीं लगी: "+niceErr(e)); endCall(false); }
    }
    async function acceptCall(){
      if(!pendingOffer) return;
      ring.style.display="none"; isCaller=false;
      remoteLang=pendingOffer.lang||null;
      if(!(await makePc())) return;
      vb.textContent="⏹ call बंद करें";
      await pc.setRemoteDescription({type:"offer", sdp:pendingOffer.sdp});
      const ans=await pc.createAnswer(); await pc.setLocalDescription(ans); await waitIce(pc);
      try{ await httpsCallable(functions,"vaniRtc")({roomId, kind:"answer", sdp:pc.localDescription.sdp, lang:myLang}); }
      catch(e){ sysline("उठा नहीं पाए: "+niceErr(e)); endCall(false); }
      pendingOffer=null; applyLangRule();
    }
    function handleRtc(m, mine){
      const ts = (m.at && m.at.toMillis) ? m.at.toMillis() : 0;
      if(ts && Date.now()-ts > 120000) return;           // बासी signaling छोड़ो
      if(mine) return;
      if(m.kind==="offer"){ pendingOffer={sdp:m.sdp, lang:m.srcLang};
        if(!pc){ ring.style.display="block"; } return; }
      if(m.kind==="answer"){ if(pc && isCaller){ remoteLang=m.srcLang||null;
        pc.setRemoteDescription({type:"answer", sdp:m.sdp}).then(applyLangRule)
          .catch(function(){ vhint("जुड़ाव-त्रुटि — दोनों call काटकर दोबारा।"); }); } return; }
      if(m.kind==="end"){ if(pc){ endCall(false); sysline("सामने वाले ने call समाप्त की।"); }
        ring.style.display="none"; pendingOffer=null; }
    }
    if(vb) vb.onclick=startCall;
    const ab=$("#v-accept"); if(ab) ab.onclick=acceptCall;
    const oldLeave=$("#v-leave").onclick;
    $("#v-leave").onclick=async function(){ endCall(true); if(oldLeave) await oldLeave(); };

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
