/* ============================================================================
   /assets/exam-session.js : v1.1 (13-Nov-2026)
   कोर्स की अंतिम परीक्षा का फ़ोन-इंजन (खेप 2)। dashboard.js इसे तभी लाता है जब विद्यार्थी "परीक्षा दें" दबाता है।
   Founder के नियम (13-Nov-2026): बैज या ₹100 · दिन में 2 परीक्षाएँ · 3 खंड x 40 प्रश्न · हर खंड 20 से 40 मिनट ·
   खंड 1 और 2 के बाद 1 से 5 मिनट का विराम · हर कोर्स में सबसे अच्छा अंक ही दर्ज · कोर्स के 5 हिस्सों का प्रतिशत, 7 दिन तक।
   प्रश्न, समय की सीमा और जाँच, तीनों server (functions/exam_server.js) तय करता है। यह फ़ाइल सिर्फ़ दिखाती है और जवाब भेजती है।
   फ़ोन में सिर्फ़ चालू खंड के जवाब रखे जाते हैं (localStorage: acs_exam_v1), ताकि पन्ना बंद होने पर भी वे न खोएँ।
   v1.1 (ऑडिट K2-H03, Founder का फ़ैसला 13-Nov-2026): ₹100 का चांस वापस नहीं होता, सिवाय हमारी तकनीकी ग़लती के। यह बात भुगतान के बटन के ठीक ऊपर लिखी है,
     और वापसी-नीति का पेज (refund.html) भी अब यही कहता है। 2 घंटे 15 मिनट वाला नियम (Founder की हाँ) द्वार पर लिखा है।
   v1.1 (ऑडिट K2-H01): 40 मिनट की सीमा पक्की है; सीमा के बाद पहुँचा जवाब server नहीं गिनता। इसलिए फ़ोन जवाब बीच-बीच में सहेजता है:
   5 बदलाव होते ही, नहीं तो 20 सेकंड में; आख़िरी मिनट में हर बदलाव के 1 सेकंड बाद; और सीमा से 8 सेकंड पहले एक आख़िरी बार।
   खोलना: window.ACS_EXAM.open({ cid, call(name, data), tts, uid, loadRazorpay(), onClose(changed) })
   ============================================================================ */
(function () {
  "use strict";
  var LS = "acs_exam_v1", OPT = ["अ", "ब", "स", "द"], SAVE_EVERY = 5, SAVE_IDLE_MS = 20000, LAST_MS = 60000, FINAL_MS = 8000;
  var NOTE = { wait: "✍️ नए जवाब कुछ ही देर में सहेजे जाएँगे।", saving: "⏳ जवाब सहेजे जा रहे हैं…", ok: "✅ जवाब server पर सहेज लिए गए।",
    fail: "📶 जवाब अभी सहेजे नहीं जा सके। internet देखिए; फ़ोन कोशिश करता रहेगा।", late: "⌛ समय पूरा हो चुका था, इसलिए ये जवाब नहीं गिने गए।" };
  var C = null;          /* open() की सेटिंग */
  var G = null;          /* द्वार का आख़िरी जवाब */
  var S = null;          /* चलती परीक्षा: { sid, cid, set, qs, ans, idx, deadline, releaseAt, name, pass, rules, dirty, changes, saving, note } */
  var tick = null, skew = 0, busy = false, changed = false;

  function esc(s) { return String(s === undefined || s === null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
  function now() { return Date.now() + skew; }
  function mmss(ms) { var s = Math.max(0, Math.ceil(ms / 1000)), m = Math.floor(s / 60); s = s % 60; return m + " मिनट " + (s < 10 ? "0" : "") + s + " सेकंड"; }
  function load() { try { return JSON.parse(localStorage.getItem(LS) || "null"); } catch (e) { return null; } }
  function save() { if (!S) return; try { localStorage.setItem(LS, JSON.stringify({ sid: S.sid, cid: S.cid, set: S.set, ans: S.ans, idx: S.idx, u: C.uid })); } catch (e) {} }
  function drop() { try { localStorage.removeItem(LS); } catch (e) {} }
  function codeOf(e) { return (e && e.details && e.details.code) || ""; }
  function msgOf(e) { return String((e && e.message) || e || "").replace(/^(internal|failed-precondition|unavailable)\s*:?\s*/i, ""); }
  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }
  function $(id) { return document.getElementById(id); }

  /* ---------- रूप ---------- */
  function style() {
    if ($("xmStyle")) return;
    var st = document.createElement("style"); st.id = "xmStyle";
    st.textContent =
      ".xm-ov{position:fixed;inset:0;z-index:9999;background:#e9eef5;overflow:auto;-webkit-overflow-scrolling:touch;font-family:inherit;color:#0B1F3A}" +
      ".xm-top{position:sticky;top:0;z-index:2;background:#0B1F3A;color:#F5F7FA;padding:10px 14px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px}" +
      ".xm-top b{font-size:17px}.xm-clock{font-size:17px;font-weight:800;color:#F9A825}.xm-clock.low{color:#fff;background:#B71C1C;border-radius:8px;padding:2px 8px}" +
      ".xm-x{background:#fff;color:#0B1F3A;border:2px solid #F9A825;border-radius:10px;font-size:16px;font-weight:800;padding:6px 12px;cursor:pointer}" +
      ".xm-wrap{max-width:760px;margin:0 auto;padding:14px 12px 70px}" +
      ".xm-card{background:#fff;border-radius:16px;box-shadow:0 2px 0 #0B1F3A,0 10px 22px rgba(11,31,58,.18);padding:18px 16px;margin:10px 0 18px;font-size:18px;line-height:1.7}" +
      ".xm-card h2{font-size:22px;margin:0 0 8px;line-height:1.4}.xm-card p{margin:8px 0}.xm-card ul{margin:8px 0 8px 22px;padding:0}.xm-card li{margin:4px 0}" +
      ".xm-q{font-size:clamp(22px,calc(1.2vw + 18px),32px);font-weight:800;line-height:1.5;margin:6px 0 16px;word-break:break-word}" +
      ".xm-opt{display:flex;align-items:center;gap:12px;width:100%;text-align:left;background:#fff;border:2px solid #cfd8e3;border-radius:16px;padding:13px 14px;margin:0 0 10px;cursor:pointer;font-size:19px;line-height:1.5;color:#0B1F3A;font-family:inherit}" +
      ".xm-opt.sel{border-color:#1565C0;background:#EAF2FE}.xm-opt i{flex:0 0 36px;height:36px;border-radius:50%;background:#0B1F3A;color:#fff;display:flex;align-items:center;justify-content:center;font-style:normal;font-weight:800;font-size:17px}" +
      ".xm-opt.sel i{background:#F9A825;color:#0B1F3A}" +
      ".xm-nav{display:flex;gap:10px;margin-top:14px}.xm-btn{flex:1;border:0;border-radius:14px;padding:15px 10px;font-size:19px;font-weight:800;cursor:pointer;font-family:inherit;line-height:1.3}" +
      ".xm-btn:disabled{opacity:.45;cursor:default}.xm-btn.blue{background:#1565C0;color:#fff}.xm-btn.green{background:#2E7D32;color:#fff}.xm-btn.gold{background:#F9A825;color:#0B1F3A}" +
      ".xm-btn.grey{background:#E9EDF3;color:#0B1F3A}.xm-btn.red{background:#B71C1C;color:#fff}.xm-btn.line{background:#fff;color:#0B1F3A;border:2px solid #0B1F3A}" +
      ".xm-note{font-size:16px;line-height:1.7;background:#F5F7FA;border:2px dashed #9db4d3;border-radius:12px;padding:10px 12px;margin:12px 0}" +
      ".xm-warn{font-size:17px;font-weight:700;color:#B71C1C;margin:8px 0;min-height:1em}" +
      ".xm-pal{display:flex;flex-wrap:wrap;gap:6px;margin:14px 0 0}.xm-pal button{width:40px;height:40px;border-radius:10px;border:2px solid #cfd8e3;background:#fff;font-size:16px;font-weight:800;color:#0B1F3A;cursor:pointer;font-family:inherit}" +
      ".xm-pal button.d{background:#E4F2E5;border-color:#2E7D32}.xm-pal button.c{border-color:#1565C0;box-shadow:0 0 0 2px #1565C0}" +
      ".xm-part{display:flex;align-items:center;gap:10px;margin:8px 0;font-size:17px}.xm-part span{flex:0 0 96px;font-weight:800}.xm-part em{flex:0 0 58px;text-align:right;font-style:normal;font-weight:800}" +
      ".xm-bar{flex:1;height:16px;background:#E9EDF3;border-radius:8px;overflow:hidden}.xm-bar i{display:block;height:100%;background:#2E7D32}.xm-bar i.low{background:#B71C1C}.xm-bar i.mid{background:#F9A825}" +
      ".xm-big{font-size:44px;font-weight:900;text-align:center;margin:4px 0}.xm-mic{margin-top:6px;padding:12px;border:2px dashed #1565C0;border-radius:14px;background:#F5F7FA;font-size:17px;line-height:1.6}" +
      ".xm-card details{margin-top:8px}.xm-card summary{cursor:pointer;font-weight:700}";
    document.head.appendChild(st);
  }
  function box() {
    var ov = $("xmOverlay");
    if (!ov) { style(); ov = document.createElement("div"); ov.id = "xmOverlay"; ov.className = "xm-ov"; document.body.appendChild(ov); document.body.style.overflow = "hidden"; }
    return ov;
  }
  function frame(top, body) { stopTick(); try { speechSynthesis.cancel(); } catch (e) {} var ov = box(); ov.innerHTML = '<div class="xm-top">' + top + '</div><div class="xm-wrap">' + body + "</div>"; ov.scrollTop = 0; }
  function close() {
    stopTick(); try { speechSynthesis.cancel(); } catch (e) {}
    var ov = $("xmOverlay"); if (ov) ov.remove(); document.body.style.overflow = "";
    var cb = C && C.onClose, ch = changed; S = null; G = null; changed = false;
    if (cb) { try { cb(ch); } catch (e) {} }
  }
  function topBar(title, extra) { return "<b>" + esc(title) + "</b>" + (extra || "") + '<button class="xm-x" id="xmClose" type="button">✕ बंद करें</button>'; }
  function busyCard(t) { frame(topBar(G && G.course ? G.course.name : "कोर्स-परीक्षा"), '<div class="xm-card" id="xmState" data-st="busy" style="text-align:center">⏳ ' + esc(t) + "</div>"); wireClose(); }
  function errCard(t, retry) {
    frame(topBar(G && G.course ? G.course.name : "कोर्स-परीक्षा"), '<div class="xm-card" id="xmState" data-st="error"><h2>⚠️ काम पूरा नहीं हुआ</h2><p>' + esc(t) + '</p><div class="xm-nav">' +
      (retry ? '<button class="xm-btn blue" id="xmRetry" type="button">🔄 दोबारा कोशिश करें</button>' : "") + '<button class="xm-btn grey" id="xmBack" type="button">← वापस</button></div></div>');
    wireClose(); if (retry) $("xmRetry").onclick = retry; $("xmBack").onclick = function () { gate(); };
  }
  function wireClose() { var b = $("xmClose"); if (b) b.onclick = function () { if (S && S.qs) save(); close(); }; }

  /* ---------- द्वार ---------- */
  function partsHtml(parts, n) {
    if (!parts) return "";
    var h = "";
    for (var k = 0; k < parts.length; k++) {
      var p = parts[k]; if (p < 0) continue;
      h += '<div class="xm-part"><span>हिस्सा ' + (k + 1) + '</span><div class="xm-bar"><i class="' + (p < 40 ? "low" : (p < 60 ? "mid" : "")) + '" style="width:' + Math.max(3, p) + '%"></i></div><em>' + p + "%</em></div>";
    }
    return h + '<p style="font-size:16px">हिस्सा 1 कोर्स की शुरुआत है और हिस्सा 5 कोर्स का आख़िर। जिस हिस्से का प्रतिशत कम है, उसके पाठ दोबारा पढ़िए।</p>';
  }
  function rulesHtml(r) {
    return "<ul><li>कुल " + (r.perSet * r.sets) + " प्रश्न, " + r.sets + " खंडों में। हर खंड में " + r.perSet + " प्रश्न।</li>" +
      "<li>हर खंड के लिए अधिकतम " + Math.round(r.maxSetSec / 60) + " मिनट और कम से कम " + Math.round(r.minSetSec / 60) + " मिनट हैं।</li>" +
      "<li>पहले और दूसरे खंड के बाद " + Math.round(r.pauseMinSec / 60) + " से " + Math.round(r.pauseMaxSec / 60) + " मिनट का विराम मिलता है।</li>" +
      "<li>घड़ी शुरू होने के बाद रुकती नहीं है, पन्ना बंद करने पर भी नहीं।</li>" +
      "<li>समय पूरा होते ही खंड अपने-आप जमा हो जाता है। ख़ाली छूटे प्रश्न ग़लत गिने जाते हैं।</li>" +
      "<li>" + Math.round(r.maxSetSec / 60) + " मिनट पूरे होने के बाद दिया गया जवाब नहीं गिना जाता। फ़ोन आपके जवाब बीच-बीच में server पर सहेजता रहता है, इसलिए internet चालू रखिए।</li>" +
      "<li>पूरी परीक्षा शुरू होने के " + Math.floor(r.sessionSec / 3600) + " घंटे " + Math.round((r.sessionSec % 3600) / 60) + " मिनट के भीतर पूरी करनी है। नहीं तो वह रद्द मानी जाती है: कोई अंक दर्ज नहीं होता, पर वह दिन की गिनती में गिनी जाती है।</li>" +
      "<li>एक दिन में सब परीक्षाएँ मिलाकर " + r.dailyMax + " ही दी जा सकती हैं (करियर टेस्ट भी इसी गिनती में है)।</li></ul>";
  }
  function privacyHtml() {
    return '<div class="xm-note">🔒 इस परीक्षा की जाँच server करता है, इसलिए आपके जवाब server को जाते हैं। server जवाब को उसी समय जाँचता है और सिर्फ़ यह रखता है कि प्रश्न सही हुआ या ग़लत।' +
      '<details><summary>server क्या रखता है (पूरा ब्योरा)</summary>' +
      "<p>परीक्षा के दौरान server यह रिकॉर्ड रखता है: आपके खाते की पहचान, कोर्स, परीक्षा का रास्ता (बैज या ₹100, और ₹100 का order-नंबर), चुने गए 120 प्रश्नों के नंबर, हर प्रश्न के विकल्पों का क्रम, हर खंड के शुरू और पूरा होने का समय और समय-सीमाएँ, और जाँचे जा चुके हर प्रश्न का अंक। आज आपने कितनी परीक्षाएँ शुरू और पूरी कीं, इसकी गिनती भी रहती है।</p>" +
      "<p>बोलो वाले प्रश्न में आपकी आवाज़ कहीं नहीं जाती। फ़ोन आवाज़ को पाठ में बदलता है, और सिर्फ़ वह पाठ जाँच के लिए server को जाता है। server उसे सेव नहीं करता।</p>" +
      "<p>परीक्षा पूरी होने, छोड़ने या समय निकलने पर यह रिकॉर्ड मिटा दिया जाता है। नतीजे में ये बातें दर्ज रहती हैं: आपका नाम और रजिस्ट्रेशन-नंबर, कोर्स, अंक, प्रतिशत, और पास या फेल। 5 हिस्सों का ब्योरा 7 दिन रहता है।</p>" +
      "<p>हर कोर्स में सिर्फ़ आपका सबसे अच्छा नतीजा दर्ज रहता है। भुगतान का रिकॉर्ड (जैसे ₹100 का चांस कब और किस परीक्षा में लगा) हिसाब के लिए रहता है।</p></details></div>";
  }
  function bestHtml(b) {
    if (!b) return '<p>इस कोर्स में आपका कोई अंक अभी दर्ज नहीं है।</p>';
    var h = '<p><b>आपका दर्ज अंक: ' + b.pct + "% (" + b.score + " / " + b.total + ") " + (b.pass ? "✅ पास" : "❌ पास नहीं") + "</b></p>";
    if (b.parts) h += partsHtml(b.parts, b.partsN) + (b.certNo ? "" : '<p style="font-size:16px">यह ब्योरा ' + new Date(b.detailUntil).toLocaleDateString("hi-IN") + " तक दिखेगा। उसके बाद सिर्फ़ अंक दिखेगा।" + (b.pass ? " ₹125 का प्रमाणपत्र लेने पर ब्योरा नहीं मिटता।" : "") + "</p>");
    else h += '<p style="font-size:16px">5 हिस्सों वाला ब्योरा 7 दिन तक ही दिखता है।</p>';
    if (b.certNo) h += "<p>📜 इस नतीजे पर प्रमाणपत्र लिया जा चुका है: " + esc(b.certNo) + "</p>";
    else if (b.pass) h += '<p>📜 प्रमाणपत्र ₹125 में मिलता है। उसे "मेरे कोर्स" की तालिका से लीजिए।</p>';
    return h;
  }
  function gate() {
    S = null; busyCard("जाँच हो रही है…");
    C.call("examGate", { courseId: C.cid }).then(function (d) {
      G = d; skew = (d.now || Date.now()) - Date.now();
      var r = d.rules, q = d.quota || {}, h = '<div class="xm-card" id="xmState" data-st="gate"><h2>🎓 ' + esc(d.course.name) + "</h2>" +
        "<p>पास होने के लिए " + d.course.pass + "% चाहिए।</p>" + rulesHtml(r) + "</div>" +
        '<div class="xm-card"><h2>📊 आपका नतीजा</h2>' + bestHtml(d.best) +
        (d.best ? '<p style="font-size:16px">नियम: हर कोर्स में सबसे अच्छा अंक ही दर्ज रहता है। नई परीक्षा का अंक तभी दर्ज होगा जब वह ' + d.best.pct + "% से ज़्यादा हो। कम या बराबर आए, तो " + d.best.pct + "% ही रहेगा।</p>" : "") + "</div>";
      var act = "";
      if (d.open && d.open.courseId === C.cid) {
        act = "<h2>⏳ आपकी यह परीक्षा चल रही है</h2><p>अभी खंड " + d.open.set + " चल रहा है। घड़ी चल रही है।</p>" +
          '<div class="xm-nav"><button class="xm-btn green" id="xmResume" type="button">▶ जारी रखें</button><button class="xm-btn line" id="xmAbandon" type="button">❌ परीक्षा छोड़ें</button></div>';
      } else if (d.open) {
        act = "<h2>⏳ आपकी एक और परीक्षा चल रही है</h2><p>" + esc(d.open.name) + "</p><p>एक समय में एक ही कोर्स-परीक्षा चल सकती है। पहले उसे पूरा कीजिए, या उसे छोड़ दीजिए।</p>" +
          '<div class="xm-nav"><button class="xm-btn line" id="xmAbandon" type="button">❌ वह परीक्षा छोड़ें</button></div>';
      } else if (!q.canStart) {
        act = "<h2>🌙 आज की सीमा पूरी</h2><p>आज की " + r.dailyMax + " परीक्षाएँ हो चुकी हैं। अगली परीक्षा कल रात 12 बजे के बाद दे सकेंगे।</p>";
      } else if (d.mode === "badge") {
        act = "<h2>✅ आपका बैज सक्रिय है</h2><p>यह परीक्षा आपके लिए मुफ़्त है।</p>" + '<div class="xm-nav"><button class="xm-btn green" id="xmStart" type="button">🚀 परीक्षा शुरू करें</button></div>';
      } else if (d.mode === "attempt") {
        act = "<h2>✅ आपके पास ₹100 का एक चांस है</h2><p>परीक्षा शुरू करते ही यह चांस इस्तेमाल हो जाएगा। ₹100 का चांस वापस नहीं होता। सिर्फ़ हमारी तकनीकी ग़लती हो, तो पूरा पैसा वापस मिलता है।</p>" + '<div class="xm-nav"><button class="xm-btn green" id="xmStart" type="button">🚀 परीक्षा शुरू करें</button></div>';
      } else {
        act = "<h2>🔑 परीक्षा के लिए बैज या ₹100</h2><p>विद्यार्थी का गोल्डन बैज या नौकरी-इच्छुक का हरा बैज हो, तो परीक्षा मुफ़्त है।</p><p>बैज न हो, तो ₹100 देकर एक परीक्षा दे सकते हैं। यह चांस भुगतान के बाद 30 दिन तक चलता है, और किसी भी एक परीक्षा में लगता है (किसी कोर्स की परीक्षा या करियर टेस्ट)।</p>" +
          '<div class="xm-nav"><button class="xm-btn gold" id="xmPay" type="button">₹100 देकर एक चांस लें</button></div>' +
          '<p style="font-size:17px;font-weight:700" id="xmRefund">₹100 का चांस वापस नहीं होता। सिर्फ़ हमारी तकनीकी ग़लती हो, तो पूरा पैसा वापस मिलता है।</p>' +
          '<p style="font-size:16px">पूरा नियम: <a href="/refund.html" target="_blank" rel="noopener">वापसी-नीति</a></p>';
      }
      frame(topBar(d.course.name), h + '<div class="xm-card" id="xmAct">' + act + '<div class="xm-warn" id="xmMsg"></div></div>' + privacyHtml());
      wireClose();
      if ($("xmStart")) $("xmStart").onclick = start;
      if ($("xmResume")) $("xmResume").onclick = function () { resume(d.open); };
      if ($("xmAbandon")) $("xmAbandon").onclick = function () { abandon(d.open.sid); };
      if ($("xmPay")) $("xmPay").onclick = pay;
    }).catch(function (e) { errCard(msgOf(e), gate); });
  }
  function abandon(sid) {
    if (!window.confirm("पक्का छोड़ें? यह परीक्षा दिन की गिनती में गिनी जाएगी, और इसका कोई अंक दर्ज नहीं होगा। ₹100 का चांस लगा हो, तो वह इस्तेमाल हो चुका है और वापस नहीं मिलेगा।")) return;
    busyCard("परीक्षा छोड़ी जा रही है…");
    C.call("examFinish", { sid: sid, cancel: true }).then(function () { drop(); changed = true; gate(); }).catch(function (e) { if (codeOf(e) === "gone") { drop(); gate(); } else errCard(msgOf(e), gate); });
  }
  function pay() {
    if (busy) return; busy = true; var m = $("xmMsg"); if (m) m.textContent = "⏳ भुगतान की तैयारी…";
    C.call("createAptitudeAttemptOrder", {}).then(function (o) {
      return C.loadRazorpay().then(function () {
        return new Promise(function (res, rej) {
          var rz = new window.Razorpay({ key: o.keyId, order_id: o.orderId, amount: o.amount, currency: o.currency || "INR", name: "Applied Computer School", description: "एक परीक्षा का चांस ₹100",
            handler: function (rsp) { C.call("verifyAptitudeAttemptPayment", { razorpay_order_id: rsp.razorpay_order_id, razorpay_payment_id: rsp.razorpay_payment_id, razorpay_signature: rsp.razorpay_signature }).then(res, rej); },
            modal: { ondismiss: function () { rej({ message: "भुगतान पूरा नहीं हुआ।" }); } } });
          rz.open();
        });
      });
    }).then(function () { busy = false; gate(); }).catch(function (e) { busy = false; var m2 = $("xmMsg"); if (m2) m2.textContent = msgOf(e); });
  }

  /* ---------- परीक्षा ---------- */
  function adopt(d) {
    skew = (d.now || Date.now()) - Date.now();
    var old = load(), ans = [];
    for (var k = 0; k < d.questions.length; k++) ans.push(-1);
    if (old && old.sid === d.sid && old.set === d.set && old.u === C.uid && Array.isArray(old.ans) && old.ans.length === ans.length) ans = old.ans;
    S = { sid: d.sid, cid: d.courseId || C.cid, set: d.set, qs: d.questions, ans: ans, idx: (old && old.sid === d.sid && old.set === d.set && old.idx < ans.length) ? (old.idx || 0) : 0,
      deadline: d.deadline, releaseAt: d.releaseAt, name: d.name, pass: d.pass, rules: d.rules,
      dirty: false, changes: 0, saving: false, again: false, saveTimer: null, saveAt: 0, note: "" };
    save(); render();
    if (countDone(ans) > 0) { S.dirty = true; planSave(1500); }   /* फ़ोन में रखे जवाब (पन्ना बंद होने से पहले के) server पर भी पहुँचा दिए जाते हैं */
  }
  function start() {
    if (busy) return; busy = true; busyCard("प्रश्न चुने जा रहे हैं…");
    C.call("examStart", { courseId: C.cid }).then(function (d) { busy = false; changed = true; drop(); adopt(d); })
      .catch(function (e) { busy = false; var c = codeOf(e); if (c === "open" || c === "limit" || c === "pay") gate(); else errCard(msgOf(e), gate); });
  }
  function resume(o) {
    if (o.done >= o.set && o.set < 3) { S = { sid: o.sid, cid: o.courseId, set: o.set, rules: G.rules, name: G.course.name }; pause(o.doneAt, o.breakFrom); return; }
    busyCard("परीक्षा खोली जा रही है…");
    C.call("examNext", { sid: o.sid, set: o.set }).then(adopt).catch(function (e) { if (codeOf(e) === "expired" || codeOf(e) === "gone") { drop(); gate(); } else errCard(msgOf(e), gate); });
  }
  function isDone(a) { return (typeof a === "number" && a >= 0) || (typeof a === "string" && a.length > 0); }
  function countDone(a) { var n = 0; for (var i = 0; i < a.length; i++) if (isDone(a[i])) n++; return n; }
  function qHtml(q) {
    var t = String(q.t || ""), mic = /\(\(MIC\)\)/.test(t); t = t.replace(/\s*\(\(MIC\)\)/, "");
    var m = /\(\(AU:([\s\S]*?)\)\)/.exec(t), h;
    if (m) {
      h = esc(t.replace(m[0], "").replace(/\s+$/, "")) + '<div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' +
        '<button type="button" class="xm-btn blue" style="flex:0 1 auto;font-size:18px" data-say="' + esc(m[1]) + '">🔊 वाक्य सुनिए</button>' +
        '<button type="button" class="xm-btn line" style="flex:0 1 auto;font-size:18px" data-say="' + esc(m[1]) + '" data-slow="1">🐢 धीरे सुनिए</button></div>';
    } else h = esc(t);
    return { html: h, mic: mic || q.mic === 1 };
  }
  function clockText() { var left = S.deadline - now(); return "⏱ बचा समय: " + mmss(left); }
  function render() {
    var q = S.qs[S.idx], qq = qHtml(q), a = S.ans[S.idx], n = S.qs.length, done = countDone(S.ans), last = S.idx === n - 1;
    var h = '<div class="xm-card" id="xmState" data-st="run" data-set="' + S.set + '" data-idx="' + S.idx + '"><div style="font-size:17px;font-weight:700;color:#1565C0">खंड ' + S.set + " · प्रश्न " + (S.idx + 1) + " / " + n + " · जवाब दिए " + done + "</div>" +
      '<div class="xm-q">' + qq.html + "</div>";
    if (qq.mic) {
      h += '<div class="xm-mic"><button type="button" class="xm-btn blue" id="xmMic" style="width:100%">🎤 बोलिए</button><div id="xmMicOut" style="margin-top:8px">' +
        (typeof a === "string" && a ? '✅ फ़ोन ने सुना: <b dir="auto">' + esc(a) + "</b>" : "माइक का बटन दबाकर ज़ोर से और साफ़ बोलिए।") + "</div></div>";
    } else {
      for (var j = 0; j < q.o.length; j++) h += '<button type="button" class="xm-opt' + (a === j ? " sel" : "") + '" data-o="' + j + '"><i>' + OPT[j] + '</i><span dir="auto">' + esc(q.o[j]) + "</span></button>";
    }
    h += '<div class="xm-warn" id="xmMsg"></div><div id="xmSave" style="font-size:16px;min-height:1.6em;margin:6px 0">' + esc(S.note ? NOTE[S.note] : "") + '</div><div class="xm-nav"><button class="xm-btn grey" id="xmPrev" type="button"' + (S.idx === 0 ? " disabled" : "") + ">← पिछला</button>" +
      (last ? '<button class="xm-btn green" id="xmSubmit" type="button">📨 खंड ' + S.set + " जमा करें</button>" : '<button class="xm-btn blue" id="xmNext" type="button">आगे →</button>') + "</div>" +
      '<div class="xm-pal" id="xmPal">';
    for (var k = 0; k < n; k++) h += '<button type="button" data-go="' + k + '" class="' + (isDone(S.ans[k]) ? "d" : "") + (k === S.idx ? " c" : "") + '">' + (k + 1) + "</button>";
    h += '</div><p style="font-size:16px;margin-top:10px">हरे खाने वाले प्रश्नों का जवाब दिया जा चुका है। किसी भी नंबर को दबाकर उस प्रश्न पर जा सकते हैं।</p>' +
      (last ? "" : '<div class="xm-nav"><button class="xm-btn line" id="xmSubmit" type="button">📨 खंड ' + S.set + " अभी जमा करें</button></div>") + "</div>";
    frame("<b>खंड " + S.set + " / 3</b>" + '<span class="xm-clock" id="xmClock">' + clockText() + "</span>" + '<button class="xm-x" id="xmQuit" type="button">❌ परीक्षा छोड़ें</button>', h);
    var ov = box();
    ov.querySelectorAll("[data-o]").forEach(function (b) { b.onclick = function () { if (S.deadline - now() <= 0) return; S.ans[S.idx] = Number(b.getAttribute("data-o")); save(); markDirty(); if (S.idx < S.qs.length - 1) { S.idx++; save(); } render(); }; });
    ov.querySelectorAll("[data-go]").forEach(function (b) { b.onclick = function () { S.idx = Number(b.getAttribute("data-go")); save(); render(); }; });
    ov.querySelectorAll("[data-say]").forEach(function (b) { b.onclick = function () { say(b.getAttribute("data-say"), !!b.getAttribute("data-slow")); }; });
    if ($("xmPrev")) $("xmPrev").onclick = function () { if (S.idx > 0) { S.idx--; save(); render(); } };
    if ($("xmNext")) $("xmNext").onclick = function () { S.idx++; save(); render(); };
    ov.querySelectorAll("#xmSubmit").forEach(function (b) { b.onclick = askSubmit; });
    if ($("xmMic")) $("xmMic").onclick = mic;
    $("xmQuit").onclick = function () { abandon(S.sid); };
    tick = setInterval(function () {
      var left = S.deadline - now(), c = $("xmClock");
      if (c) { c.textContent = clockText(); c.className = "xm-clock" + (left < 5 * 60000 ? " low" : ""); }
      if (left <= LAST_MS && left > 0 && $("xmMsg") && !$("xmMsg").textContent) $("xmMsg").textContent = "आख़िरी मिनट चल रहा है। समय पूरा होने के बाद दिया गया जवाब नहीं गिना जाएगा।";
      if (left <= FINAL_MS && left > 0 && S.dirty && !S.saving) doSave();     /* सीमा से पहले एक आख़िरी बार सहेजना */
      if (left <= 0) { stopTick(); submit(true); }
    }, 1000);
  }
  function say(text, slow) {
    if (!("speechSynthesis" in window)) { var m = $("xmMsg"); if (m) m.textContent = "इस फ़ोन में आवाज़ नहीं चल रही। Chrome में खोलिए।"; return; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text), TL = C.tts || "en-IN", TB = TL.split("-")[0].toLowerCase();
    u.lang = TL; u.rate = slow ? 0.65 : 0.9;
    var vs = speechSynthesis.getVoices();
    var v = vs.filter(function (x) { return x.lang === TL || x.lang === TL.replace("-", "_"); })[0] || vs.filter(function (x) { return x.lang && x.lang.replace("_", "-").toLowerCase().indexOf(TB) === 0; })[0];
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }
  function mic() {
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition, out = $("xmMicOut"), b = $("xmMic"), at = S.idx, sidAt = S.sid, setAt = S.set;
    if (!SR) { out.innerHTML = '<span style="color:#B71C1C">इस browser में बोली की पहचान नहीं चलती। Chrome (Android) में परीक्षा दीजिए।</span>'; return; }
    try { speechSynthesis.cancel(); } catch (e) {}
    var r = new SR(), got = false; r.lang = C.tts || "en-IN"; r.interimResults = false; r.maxAlternatives = 1; r.continuous = false;
    b.disabled = true; b.textContent = "🎙️ सुन रहा हूँ… बोलिए"; out.innerHTML = '<span style="color:#1565C0">माइक चालू है। साफ़ बोलिए, फिर रुकिए।</span>';
    r.onresult = function (ev) {
      var t = ""; try { t = ev.results[0][0].transcript; } catch (e) {}
      if (!S || S.sid !== sidAt || S.set !== setAt) return;
      if (t && String(t).trim() && S.deadline - now() > 0) { got = true; S.ans[at] = String(t).trim().slice(0, 400); save(); markDirty(); if (S.idx === at && $("xmMicOut")) $("xmMicOut").innerHTML = '✅ फ़ोन ने सुना: <b dir="auto">' + esc(t) + '</b><br><span style="font-size:16px">ठीक नहीं लगा? दोबारा बोल सकते हैं।</span>'; }
    };
    r.onerror = function (ev) { if ($("xmMicOut")) $("xmMicOut").innerHTML = '<span style="color:#B71C1C">माइक नहीं चला (' + esc(ev.error || "") + ")। माइक की अनुमति दीजिए, फिर दोबारा दबाइए।</span>"; };
    r.onend = function () { var bb = $("xmMic"); if (bb) { bb.disabled = false; bb.textContent = "🎤 बोलिए"; } if (!got && $("xmMicOut") && !/माइक नहीं चला/.test($("xmMicOut").textContent)) $("xmMicOut").innerHTML = '<span style="color:#B71C1C">कुछ सुनाई नहीं दिया। दोबारा बोलिए।</span>'; };
    try { r.start(); } catch (e) { b.disabled = false; b.textContent = "🎤 बोलिए"; }
  }
  /* जवाब server को भेजना। done=false: सिर्फ़ सहेजना (server उसी समय जाँचकर अंक रख लेता है)। done=true: खंड पूरा करना। */
  function send(done) {
    return S.set < 3 ? C.call("examNext", { sid: S.sid, set: S.set + 1, answers: S.ans, done: done })
      : C.call("examFinish", { sid: S.sid, answers: S.ans, done: done });
  }
  /* ---- बीच-बीच में सहेजना: server उसी समय जाँचकर इस खंड के अंक रख लेता है ---- */
  function setNote(k) { if (!S) return; S.note = k; var e = $("xmSave"); if (e) e.textContent = NOTE[k] || ""; }
  function planSave(ms) {
    var st = S, at = Date.now() + ms;
    if (st.saveTimer && st.saveAt <= at && st.saveAt >= Date.now() - 50) return;   /* पहले से लगी घंटी इससे पहले बजेगी (और बीती हुई नहीं है): उसे रहने दो */
    if (st.saveTimer) clearTimeout(st.saveTimer);
    st.saveAt = at; st.saveTimer = setTimeout(function () { st.saveTimer = null; if (S === st) doSave(); }, ms);
  }
  function markDirty() {
    S.dirty = true; S.changes++; setNote("wait");
    if (S.deadline - now() < LAST_MS) planSave(1000);
    else if (S.changes >= SAVE_EVERY) planSave(0);
    else planSave(SAVE_IDLE_MS);
  }
  function doSave() {
    var st = S; if (!st || !st.qs || !st.dirty) return;
    if (st.saving) { st.again = true; return; }
    st.saving = true; st.dirty = false; st.changes = 0; setNote("saving");
    send(false).then(function (d) {
      st.saving = false; if (S !== st) return;
      setNote(d && d.saved === false ? "late" : "ok");
      if (st.again || st.dirty) { st.again = false; st.dirty = true; planSave(st.deadline - now() < LAST_MS ? 800 : 3000); }
    }).catch(function () { st.saving = false; if (S !== st) return; st.dirty = true; setNote("fail"); planSave(5000); });
  }
  function askSubmit() {
    var blank = S.qs.length - countDone(S.ans);
    if (blank > 0 && !window.confirm(blank + " प्रश्न ख़ाली हैं। ख़ाली प्रश्न ग़लत गिने जाएँगे। क्या खंड अभी जमा करना है?")) return;
    submit(false);
  }
  function submit(auto) {
    if (busy) return; busy = true; stopTick(); save();
    if (S.saveTimer) { clearTimeout(S.saveTimer); S.saveTimer = null; }
    var st = S;
    frame("<b>खंड " + S.set + " / 3</b>", '<div class="xm-card" id="xmState" data-st="sending" style="text-align:center">⏳ ' + (auto ? "समय पूरा हुआ। खंड जमा हो रहा है…" : "खंड जमा हो रहा है…") + "</div>");
    send(true).then(function (d) {
      busy = false; if (S !== st) return;
      skew = (d.now || Date.now()) - Date.now();
      if (d.early) return waitMin(d.waitSec);
      if (d.pause) { drop(); return pause(d.doneAt, d.breakFrom); }
      if (d.cancelled) { drop(); return gate(); }
      drop(); changed = true; result(d);
    }).catch(function (e) {
      busy = false; if (S !== st) return;
      var c = codeOf(e);
      if (c === "expired" || c === "gone") { drop(); changed = true; frame(topBar(S.name || "कोर्स-परीक्षा"), '<div class="xm-card" id="xmState" data-st="expired"><h2>⌛ परीक्षा का समय पूरा हो चुका है</h2><p>यह परीक्षा समय पर पूरी नहीं हुई, इसलिए इसका कोई अंक दर्ज नहीं हुआ। यह दिन की गिनती में गिनी गई है।</p><div class="xm-nav"><button class="xm-btn blue" id="xmBack" type="button">← वापस</button></div></div>'); wireClose(); $("xmBack").onclick = gate; return; }
      frame("<b>खंड " + S.set + " / 3</b>", '<div class="xm-card" id="xmState" data-st="sendfail"><h2>📶 खंड जमा नहीं हो पाया</h2><p>' + esc(msgOf(e)) + "</p><p>जो जवाब पहले सहेजे जा चुके हैं, वे server पर सुरक्षित हैं और गिने जाएँगे। internet देखकर दोबारा दबाइए। घड़ी चल रही है।</p>" +
        '<div class="xm-nav"><button class="xm-btn blue" id="xmRetry" type="button">🔄 दोबारा जमा करें</button></div></div>');
      $("xmRetry").onclick = function () { submit(auto); };
    });
  }
  /* कम से कम समय बाक़ी है: जवाब server पर सहेजे जा चुके हैं; समय पूरा होते ही खंड अपने-आप जमा होगा */
  function waitMin(sec) {
    var end = Date.now() + sec * 1000;
    frame("<b>खंड " + S.set + " / 3</b>" + '<span class="xm-clock" id="xmClock"></span>', '<div class="xm-card" id="xmState" data-st="wait"><h2>⏳ इस खंड का कम से कम समय अभी बाक़ी है</h2>' +
      "<p>हर खंड पर कम से कम " + Math.round(S.rules.minSetSec / 60) + " मिनट देना ज़रूरी है। आपके जवाब सहेज लिए गए हैं।</p>" +
      '<p class="xm-big" id="xmLeft"></p><p>समय पूरा होते ही खंड अपने-आप जमा हो जाएगा। तब तक आप अपने जवाब दोबारा देख सकते हैं।</p>' +
      '<div class="xm-nav"><button class="xm-btn line" id="xmReview" type="button">← जवाब दोबारा देखें</button></div></div>');
    $("xmReview").onclick = function () { render(); };
    function upd() { var left = end - Date.now(); if ($("xmLeft")) $("xmLeft").textContent = mmss(left); if (left <= 0) { stopTick(); submit(true); } }
    upd(); tick = setInterval(upd, 1000);
  }
  /* doneAt: खंड का समय कब ख़त्म माना गया (5 मिनट की सीमा यहीं से); breakFrom: खंड सचमुच कब जमा हुआ (1 मिनट का विराम यहीं से) */
  function pause(doneAt, breakFrom) {
    var r = S.rules, min = Math.max(doneAt, breakFrom || 0) + r.pauseMinSec * 1000, max = Math.max(doneAt + r.pauseMaxSec * 1000, min + 1500), nextSet = S.set + 1, st = S;
    frame("<b>विराम</b>", '<div class="xm-card" id="xmState" data-st="pause" data-next="' + nextSet + '"><h2>☕ विराम: खंड ' + S.set + " पूरा हुआ</h2>" +
      "<p>पानी पी लीजिए। अगला खंड " + Math.round(r.pauseMinSec / 60) + " मिनट बाद शुरू किया जा सकता है।</p>" +
      '<p class="xm-big" id="xmLeft"></p><p id="xmPauseNote"></p>' +
      '<div class="xm-nav"><button class="xm-btn green" id="xmGo" type="button" disabled>▶ खंड ' + nextSet + " शुरू करें</button></div>" +
      '<div class="xm-warn" id="xmMsg"></div></div>');
    function go() {
      if (busy) return; busy = true; stopTick(); if ($("xmGo")) $("xmGo").disabled = true;
      C.call("examNext", { sid: st.sid, set: nextSet }).then(function (d) { busy = false; adopt(d); }).catch(function (e) {
        busy = false; var c = codeOf(e);
        if (c === "early") { var w = (e.details.waitSec || 5) * 1000; min = now() + w; tick = setInterval(upd, 1000); return; }
        if (c === "expired" || c === "gone") { drop(); changed = true; gate(); return; }
        if ($("xmMsg")) $("xmMsg").textContent = msgOf(e) + " दोबारा दबाइए।"; if ($("xmGo")) $("xmGo").disabled = false; tick = setInterval(upd, 1000);
      });
    }
    function upd() {
      var t = now(), b = $("xmGo");
      if (t < min + 1500) { if ($("xmLeft")) $("xmLeft").textContent = mmss(min + 1500 - t); if ($("xmPauseNote")) $("xmPauseNote").textContent = "इतनी देर बाद अगला खंड शुरू कर सकेंगे।"; }
      else { if (b) b.disabled = false; if ($("xmLeft")) $("xmLeft").textContent = mmss(max - t); if ($("xmPauseNote")) $("xmPauseNote").textContent = "इतनी देर में अगला खंड अपने-आप शुरू हो जाएगा। इससे ज़्यादा रुकने पर वह देरी अगले खंड के समय से कटती है।"; }
      if (t >= max) go();
    }
    $("xmGo").onclick = go; upd(); tick = setInterval(upd, 1000);
  }
  function result(d) {
    var h = '<div class="xm-card" id="xmState" data-st="result" data-pct="' + d.pct + '" data-best="' + (d.isBest ? 1 : 0) + '"><h2 style="text-align:center">' + (d.pass ? "🎉 पास!" : "😔 इस बार पास नहीं हुए") + "</h2>" +
      '<p class="xm-big">' + d.pct + "%</p><p style=\"text-align:center\">" + d.score + " / " + d.total + " सही · पास के लिए " + d.passPct + "% चाहिए</p>" +
      (d.counted3 === false ? '<p class="xm-warn">खंड 3 के जवाब समय पर नहीं पहुँचे, इसलिए वे नहीं गिने गए।</p>' : "") + "</div>" +
      '<div class="xm-card"><h2>📊 कोर्स के 5 हिस्सों में आपका प्रतिशत</h2>' + partsHtml(d.parts, d.partsN) + "</div>" +
      '<div class="xm-card" id="xmKept"><h2>📌 क्या दर्ज हुआ</h2>';
    if (d.isBest) {
      h += "<p>यह आपका अब तक का सबसे अच्छा अंक है, इसलिए यही दर्ज हुआ: <b>" + d.pct + "%</b>।</p>" +
        "<p>ऊपर वाला 5 हिस्सों का ब्योरा " + new Date(d.detailUntil).toLocaleDateString("hi-IN") + " तक दिखेगा। उसके बाद सिर्फ़ अंक दिखेगा।</p>" +
        (d.pass ? '<p>📜 प्रमाणपत्र ₹125 में मिलता है। उसे "मेरे कोर्स" की तालिका से लीजिए। प्रमाणपत्र लेने पर यह ब्योरा नहीं मिटता।</p>' : "<p>फिर से पढ़कर दोबारा परीक्षा दे सकते हैं।</p>");
    } else {
      h += "<p>आपका पहले का अंक <b>" + d.best.pct + "%</b> इससे " + (d.best.pct === d.pct ? "बराबर" : "ज़्यादा") + " है, इसलिए वही दर्ज रहेगा।</p>" +
        "<p>इस परीक्षा का 5 हिस्सों वाला ब्योरा सिर्फ़ अभी दिख रहा है। यह पन्ना बंद करने के बाद वह दोबारा नहीं दिखेगा।</p>";
    }
    h += '<div class="xm-nav"><button class="xm-btn blue" id="xmDone" type="button">ठीक है, बंद करें</button></div></div>';
    frame(topBar(d.name || "कोर्स-परीक्षा"), h); wireClose(); $("xmDone").onclick = close; S = null;
  }

  window.ACS_EXAM = {
    version: "1.1",
    open: function (cfg) {
      if (!cfg || !cfg.cid || typeof cfg.call !== "function") return;
      C = cfg; changed = false; busy = false; box(); gate();
    }
  };
})();
