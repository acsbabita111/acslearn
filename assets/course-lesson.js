/* ============================================================
   ACS course-lesson.js v1.4 — आवाज़ 🔊 + प्रगति-दर्ज + ⏱ घड़ी + twv-हीरो loader
   v1.4 · 03-Aug-2026 (Founder हीरो-आदेश): सिर्फ़ two-wheeler पाठों पर
   /assets/twv-hero.js load — बाक़ी कोर्सों पर शून्य असर, शून्य वज़न।
   v1.3 · 30-Jul-2026 (Founder हलचल-नियम): 10s हलचल-शून्य/छिपा-tab = ⏸;
   25s-दर्ज सक्रिय-सेकंड से; छत 30 मि/पेज; d.time-बचत; दो-घड़ी टकराव हटा।
   v1.2 · 30-Jul-2026 (Founder: "अंधा पेज") — हर पाठ पर तैरता timer:
   बीता-समय (ऊपर गिनता) + 25s उल्टी-गिनती + दर्ज होते ही हरा ✅ (+10)।
   v1.1-सार: पाठ "पढ़ा" = नीचे-तक या 25s — जो पहले (गिनती-ईमानदारी)।
   v1.0 · 17-Jul-2026 (काम-कोर्स-2) — आवाज़-सुविधा
   ------------------------------------------------------------
   browser की अपनी बोली-मशीन (Web Speech API, hi-IN) से —
   कोई server नहीं, कोई ख़र्च नहीं; Android के Chrome में हिंदी आवाज़ आती है।
   progressive: JS/आवाज़ न हो तो पेज वैसा ही पूरा रहता है।
   ============================================================ */
(function () {
  "use strict";
  if (!("speechSynthesis" in window)) return; /* आवाज़-मशीन ही नहीं — चुपचाप हट जाओ */

  var synth = window.speechSynthesis;
  var session = 0; /* रोको-सुधार: cancel के बाद onend अगला टुकड़ा न चलाए */
  var current = null; /* {btn, queue:[], i} */

  function textOf(el) {
    var clone = el.cloneNode(true);
    /* SVG/चित्र/बटन की लिखावट आवाज़ में नहीं */
    ["svg", "figure", "button", "details", "nav", "script", "style"].forEach(function (t) {
      var xs = clone.querySelectorAll(t);
      for (var i = 0; i < xs.length; i++) xs[i].remove();
    });
    return (clone.textContent || "").replace(/\s+/g, " ").trim();
  }

  function stopAll() {
    session++;
    synth.cancel();
    if (current && current.btn) markBtn(current.btn, false);
    document.querySelectorAll(".lsn-speakall").forEach(function (b) {
      b.textContent = "🔊 पूरा पाठ सुनो";
    });
    current = null;
  }

  function markBtn(btn, on) {
    btn.textContent = on ? "⏸ रोको" : "🔊 सुनो";
    btn.classList.toggle("speaking", !!on);
  }

  function speakChunks(chunks, btn, onDone) {
    /* लंबा text टुकड़ों में — कुछ फ़ोन लंबी बोली बीच में काट देते हैं */
    var i = 0, my = session; /* रोको दबते ही session बदलती है — यह कड़ी वहीं मर जाती है */
    function next() {
      if (my !== session) return;
      if (i >= chunks.length) { if (onDone) onDone(); return; }
      var u = new SpeechSynthesisUtterance(chunks[i++]);
      u.lang = "hi-IN"; u.rate = 0.95;
      u.onend = next;
      u.onerror = next;
      synth.speak(u);
    }
    next();
  }

  function chunkify(text) {
    var out = [], s = text;
    while (s.length > 180) {
      var cut = s.lastIndexOf("।", 180);
      if (cut < 60) cut = s.lastIndexOf(" ", 180);
      if (cut < 60) cut = 180;
      out.push(s.slice(0, cut + 1)); s = s.slice(cut + 1);
    }
    if (s.trim()) out.push(s);
    return out;
  }

  /* हर खंड (lsn-sec) पर 🔊 बटन */
  var secs = document.querySelectorAll(".lsn-sec");
  secs.forEach(function (sec) {
    var h2 = sec.querySelector("h2");
    if (!h2) return;
    var t = textOf(sec);
    if (t.length < 40) return;
    var btn = document.createElement("button");
    btn.type = "button"; btn.className = "lsn-speak"; btn.textContent = "🔊 सुनो";
    btn.setAttribute("aria-label", "यह खंड सुनो");
    btn.addEventListener("click", function () {
      if (current && current.btn === btn) { stopAll(); return; }
      stopAll();
      current = { btn: btn };
      markBtn(btn, true);
      speakChunks(chunkify(textOf(sec)), btn, function () { markBtn(btn, false); current = null; });
    });
    h2.appendChild(btn);
  });

  /* पूरा पाठ सुनो */
  document.querySelectorAll("[data-speakall]").forEach(function (big) {
    big.addEventListener("click", function () {
      if (current && current.btn === big) { stopAll(); return; }
      stopAll();
      current = { btn: big };
      big.textContent = "⏸ रोको (पूरा पाठ चल रहा है)";
      var all = [];
      secs.forEach(function (sec) {
        var h2 = sec.querySelector("h2");
        var head = h2 ? (h2.childNodes[0] && h2.childNodes[0].textContent || "") : "";
        var t = textOf(sec);
        if (t.length >= 40) all = all.concat(chunkify(head + "। " + t));
      });
      speakChunks(all, big, function () {
        big.textContent = "🔊 पूरा पाठ सुनो"; current = null;
      });
    });
  });

  /* पेज छोड़ते समय आवाज़ बंद */
  window.addEventListener("pagehide", function () { synth.cancel(); });
})();

/* ============================================================
   काम-9+ (18-Jul-2026): learner-progress — device-local (आपके फ़ोन में ही),
   शून्य-server, DPDP-सुरक्षित, offline-OK, ES5 (Android-8)। पाठ "पढ़ा" तभी
   गिनता है जब पढ़ने वाला नीचे तक पहुँचे या 25 सेकंड रुके (गिनती-ईमानदारी)।
   सिर्फ़ सकारात्मक feedback — कोई दबाव/leaderboard नहीं (हल्की gamification)।
   ============================================================ */
(function () {
  "use strict";
  try {
    if (location.pathname.indexOf("/courses/") < 0) return;
    var KEY = "acs_learn_progress", path = location.pathname;
    var d; try { d = JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { d = {}; }
    if (!d.read) d.read = {}; if (!d.days) d.days = {};
    var now = new Date();
    var ds = now.getFullYear() + "-" + ("0" + (now.getMonth() + 1)).slice(-2) + "-" + ("0" + now.getDate()).slice(-2);
    function box() {
      var b = document.getElementById("acsLsnProg");
      if (!b) {
        b = document.createElement("div"); b.id = "acsLsnProg"; b.className = "lsn-prog";
        var m = document.querySelector("main") || document.body; m.appendChild(b);
      }
      return b;
    }
    function count() { var n = 0, k; for (k in d.read) { if (d.read.hasOwnProperty(k)) n++; } return n; }
    function paint(justEarned) {
      var n = count();
      var head = justEarned ? "✓ यह पाठ पढ़ा — (+10 अंक)"
        : (d.read[path] ? "✓ यह पाठ आप पढ़ चुके हैं" : "📖 यह पाठ पढ़ते रहिए");
      box().innerHTML = "<b>" + head + "</b><br>आपके कुल अंक: " + (n * 10) + " · पाठ पढ़े: " + n +
        " &nbsp;<a href=\"/dashboard/\">📈 मेरी पूरी प्रगति</a>";
    }
    function mark() {
      if (d.read[path]) return;
      d.read[path] = Date.now(); d.days[ds] = 1;
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
      paint(true);
      flPaint();   /* (v1.2) तैरता ⏱ तुरंत हरा हो */
    }
    paint(false);
    /* ── (v1.2, Founder) तैरता ⏱ — "अंधा पेज" इलाज ──
       ऊपर: पेज पर बीता समय (हमेशा गिनता, दर्ज-बाद भी);
       नीचे: 25s उल्टी-गिनती/"नीचे तक" इशारा → दर्ज पर हरा ✅ (+10)।
       style JS से inject — CSS-कड़ी न भी हो तो चले (गूँगा-fallback निषेध)। */
    /* ── (v1.3, Founder हलचल-नियम) सक्रिय-सेकंड इंजन ──
       चले तभी: पिछली हलचल <10s + tab दिखता + बैठक-छत (30 मि) बाक़ी।
       हर 10 सक्रिय-सेकंड व पन्ना-छोड़ते समय d.time[कोर्स-घर] में बचत। */
    var home = path.slice(0, path.lastIndexOf("/") + 1);
    if (!d.time) d.time = {};
    var baseT = Number(d.time[home]) || 0;
    var sess = 0, accT = 0, lastAct = Date.now(), CAPS = 30 * 60;
    function poke(){ lastAct = Date.now(); }
    ["touchstart","mousemove","scroll","keydown","click"].forEach(function (ev) {
      window.addEventListener(ev, poke, { passive: true });
    });
    function flushT(){
      if (accT <= 0) return;
      d.time[home] = (Number(d.time[home]) || 0) + accT; accT = 0;
      try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
    }
    function two(n){ n = Math.floor(n) % 60; return (n < 10 ? "0" : "") + n; }
    function flBox(){
      var f = document.getElementById("acsLsnTimer");
      if (!f) {
        var st = document.createElement("style");
        st.textContent =
          "#acsLsnTimer{position:fixed;right:12px;bottom:12px;z-index:9999;" +
          "background:#0B1F3A;color:#F5F7FA;border:2px solid #F9A825;border-radius:16px;" +
          "padding:10px 14px;font-size:18px;font-weight:900;line-height:1.5;" +
          "box-shadow:0 4px 14px rgba(0,0,0,.35);text-align:center;max-width:78vw}" +
          "#acsLsnTimer .fl2{display:block;font-size:16px;font-weight:700;color:#F9A825}" +
          "#acsLsnTimer.done{background:#2E7D32;border-color:#66BB6A}" +
          "#acsLsnTimer.done .fl2{color:#F5F7FA}";
        document.head.appendChild(st);
        f = document.createElement("div"); f.id = "acsLsnTimer";
        document.body.appendChild(f);
      }
      return f;
    }
    function fmtT(sec){ var h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60);
      return h ? (h + " घं " + m + " मि") : (m + " मि"); }
    function flPaint(running){
      var f = flBox();
      var clock = "⏱ " + Math.floor(sess / 60) + ":" + two(sess) + (running ? "" : " ⏸");
      var total = '<span class="fl2">कोर्स कुल: ' + fmtT(baseT + sess) + "</span>";
      if (d.read[path]) {
        f.className = "done";
        f.innerHTML = clock + '<span class="fl2">✅ पाठ दर्ज (+10 अंक)</span>' + total;
      } else {
        var rem = Math.max(0, 25 - sess);
        f.className = "";
        f.innerHTML = clock + '<span class="fl2">📖 ' + rem + ' सेकंड (पढ़ते हुए) या नीचे तक — फिर दर्ज</span>' + total;
      }
    }
    var done = !!d.read[path];
    function chk() {
      if (done) return;
      if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 140)) { done = true; mark(); }
    }
    window.addEventListener("scroll", chk, false);
    setInterval(function () {
      var running = (Date.now() - lastAct) < 10000 &&
                    document.visibilityState !== "hidden" && sess < CAPS;
      if (running) {
        sess++; accT++;
        if (accT >= 10) flushT();
        if (!done && sess >= 25) { done = true; mark(); }
      }
      flPaint(running);
    }, 1000);
    document.addEventListener("visibilitychange", function () { if (document.hidden) flushT(); });
    window.addEventListener("pagehide", flushT);
    flPaint(true);
  } catch (e) {}
})();

/* ═══ (30-Jul तुरंत-2, Founder) हर पाठ-पन्ने पर वापसी-बटन — v4.0 वापसी-पता नियम का कोर्स-रूप ═══ */
(function(){
  try{
    if(document.getElementById("lsnBackHome")) return;
    var back="/dashboard/";
    try{ var b=localStorage.getItem("acs_back_home"); if(b && b.indexOf("/dashboard/")===0) back=b; }catch(e){}
    var a=document.createElement("a");
    a.id="lsnBackHome"; a.href=back; a.textContent="↩ मेरा पैनल";
    a.style.cssText="position:fixed;left:12px;bottom:12px;z-index:9999;background:#0B1F3A;color:#fff;"+
      "font-weight:800;font-size:17px;padding:10px 16px;border-radius:999px;text-decoration:none;"+
      "box-shadow:0 4px 12px rgba(0,0,0,.35);font-family:'Noto Sans Devanagari',sans-serif";
    document.body.appendChild(a);
  }catch(e){}
})();

/* ═══ (05-Aug, Founder-ऑडिट) नीचे-nav में "अध्याय-सूची" वापसी-बटन — सब कोर्सों पर।
   होल: पाठ के अंत में सिर्फ़ ←पिछला/अगला→ थे; सूची-वापसी कड़ी सिर्फ़ ऊपर थी।
   इलाज साझा-असेट से (v3.2-घ4) — कोई पाठ-HTML regen नहीं; './' = उसी कोर्स का index। ═══ */
(function(){
  try{
    if(document.getElementById("lsnBackList")) return;
    var nav=document.querySelector("nav.lsn-nav");
    if(!nav) return; /* पुराने ढाँचे के पाठ — उनका exit-nav अलग दर्ज होल */
    var a=document.createElement("a");
    a.id="lsnBackList"; a.href="./";
    a.className="lsn-navbtn";
    a.textContent="📚 अध्याय-सूची";
    a.style.cssText="background:#F9A825;color:#0B1F3A;font-weight:800";
    var nxt=nav.querySelector(".lsn-next");
    if(nxt){ nav.insertBefore(a,nxt); } else { nav.appendChild(a); }
  }catch(e){}
})();

/* ═══ (05-Aug, Founder) पाठ-अंत 5-प्रश्न quiz-इंजन v1.0 — साझा-असेट (v3.2-घ4)।
   प्रश्न परत-3 shards में: /assets/twv_quiz/twvq_ch(अध्याय).js — वही भंडार आगे
   120-प्रश्न परीक्षा का स्रोत (एक चीज़ = एक जगह)। shard न बना हो तो पेज चुपचाप
   पहले जैसा (ईमानदार-चुप); जवाब-जाँच device पर, कोई server नहीं। ═══ */
(function(){
  try{
    if(location.pathname.indexOf("/courses/hi/two-wheeler/")!==0) return;
    var m=location.pathname.match(/twv-([0-9]+[a-z]?)-/);
    if(!m) return;
    var ch=m[1], file=location.pathname.split("/").pop();
    var sc=document.createElement("script");
    sc.src="/assets/twv_quiz/twvq_ch"+ch+".js";
    sc.onload=function(){
      try{
        var bank=(window.TWV_QUIZ||{})["ch"+ch]; if(!bank) return;
        var qs=bank[file]; if(!qs||qs.length!==5) return;
        var nav=document.querySelector("nav.lsn-nav"); if(!nav||document.getElementById("twvQuiz")) return;
        var box=document.createElement("section");
        box.id="twvQuiz"; box.className="lsn-sec";
        box.style.cssText="border:2px solid #1565C0;border-radius:14px;background:#F5F7FA;padding:14px";
        var h=document.createElement("h2"); h.textContent="📝 पाठ-परीक्षा — 5 प्रश्न"; box.appendChild(h);
        var tip=document.createElement("p"); tip.style.fontSize="17px";
        tip.textContent="हर प्रश्न में सही उत्तर पर टच करें। यही प्रश्न आगे कोर्स की बड़ी परीक्षा में भी आ सकते हैं।";
        box.appendChild(tip);
        var score=0, done=0;
        function mkQ(idx,item){
          var wrap=document.createElement("div");
          wrap.style.cssText="margin:14px 0;padding:10px;border-radius:10px;background:#fff;border:1px solid rgba(11,31,58,.15)";
          var qp=document.createElement("p");
          qp.style.cssText="font-weight:800;font-size:18px;color:#0B1F3A;margin:0 0 8px";
          qp.textContent="प्रश्न-"+(idx+1)+": "+item.q; wrap.appendChild(qp);
          var locked=false;
          for(var j=0;j<item.o.length;j++){
            (function(j){
              var b=document.createElement("button");
              b.type="button"; b.textContent=item.o[j];
              b.style.cssText="display:block;width:100%;text-align:left;margin:6px 0;padding:10px 12px;"+
                "font-size:17px;border-radius:9px;border:1px solid #1565C0;background:#fff;color:#0B1F3A;"+
                "font-family:inherit;cursor:pointer";
              b.onclick=function(){
                if(locked) return; locked=true; done++;
                var kids=wrap.getElementsByTagName("button");
                for(var k=0;k<kids.length;k++){ kids[k].disabled=true; kids[k].style.cursor="default"; }
                if(j===item.a){ score++; b.style.background="#2E7D32"; b.style.color="#F5F7FA"; b.textContent="✅ "+item.o[j]; }
                else{
                  b.style.background="#8b1a1a"; b.style.color="#F5F7FA"; b.textContent="❌ "+item.o[j];
                  var c=kids[item.a]; c.style.background="#2E7D32"; c.style.color="#F5F7FA"; c.textContent="✅ "+item.o[item.a];
                }
                if(done===5){
                  var r=document.getElementById("twvQuizRes");
                  r.textContent=(score===5?"🏆 ":"")+"आपके अंक: "+score+" / 5"+(score<5?" — ग़लत वालों के खंड दोबारा पढ़ लें।":" — शाबाश!");
                  r.style.display="block";
                }
              };
              wrap.appendChild(b);
            })(j);
          }
          return wrap;
        }
        for(var i=0;i<5;i++){ box.appendChild(mkQ(i,qs[i])); }
        var res=document.createElement("p"); res.id="twvQuizRes";
        res.style.cssText="display:none;font-size:19px;font-weight:800;color:#0B1F3A;background:rgba(249,168,37,.25);"+
          "border-left:4px solid #F9A825;border-radius:8px;padding:10px 12px";
        box.appendChild(res);
        nav.parentNode.insertBefore(box,nav);
      }catch(e){}
    };
    sc.onerror=function(){}; /* shard अभी न बना हो — पेज वैसा ही */
    document.head.appendChild(sc);
  }catch(e){}
})();

/* ═══ (03-Aug, Founder) टू-व्हीलर हीरो-इमेज loader — साझा-असेट-लाभ नियम (v3.2-घ4):
   466 पाठ-HTML अछूते; चित्र-लाइब्रेरी सिर्फ़ इसी कोर्स के पेजों पर उतरती है। ═══ */
(function(){
  try{
    if(location.pathname.indexOf("/courses/hi/two-wheeler/")!==0) return;
    var sc=document.createElement("script");
    sc.src="/assets/twv-hero.js"; sc.defer=true;
    document.head.appendChild(sc);
  }catch(e){}
})();
