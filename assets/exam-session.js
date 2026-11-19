/* ============================================================================
   /assets/exam-session.js : v1.6 (19-Nov-2026, खेप E-5: वेबसाइट पर भी कैमरे से चेहरे की जाँच) · v1.5 (19-Nov-2026, खेप E-4: वेबसाइट पर 3 चेतावनी, प्रमाणपत्र जाँच के बाद) · v1.4 (19-Nov-2026, खेप E-3: ऐप में चेहरे की जाँच) · v1.3 (19-Nov-2026, खेप E-2: ACS EXAM ऐप का ताला) · v1.2 (15-Nov-2026; v1.2 पैनल-4ख: प्रश्न/विकल्प भाषा-इंजन से सुरक्षित, विकल्प-अक्षर और कोर्स-नाम English पैनल में English; v1.1 13-Nov-2026)
   कोर्स की अंतिम परीक्षा का फ़ोन-इंजन (खेप 2)। dashboard.js इसे तभी लाता है जब विद्यार्थी "परीक्षा दें" दबाता है।
   Founder के नियम (13-Nov-2026): बैज या ₹100 · दिन में 2 परीक्षाएँ · 3 खंड x 40 प्रश्न · हर खंड 20 से 40 मिनट ·
   खंड 1 और 2 के बाद 1 से 5 मिनट का विराम · हर कोर्स में सबसे अच्छा अंक ही दर्ज · कोर्स के 5 हिस्सों का प्रतिशत, 7 दिन तक।
   प्रश्न, समय की सीमा और जाँच, तीनों server (functions/exam_server.js) तय करता है। यह फ़ाइल सिर्फ़ दिखाती है और जवाब भेजती है।
   फ़ोन में सिर्फ़ चालू खंड के जवाब रखे जाते हैं (localStorage: acs_exam_v1), ताकि पन्ना बंद होने पर भी वे न खोएँ।
   v1.1 (ऑडिट K2-H03, Founder का फ़ैसला 13-Nov-2026): ₹100 का चांस वापस नहीं होता, सिवाय हमारी तकनीकी ग़लती के। यह बात भुगतान के बटन के ठीक ऊपर लिखी है,
     और वापसी-नीति का पेज (refund.html) भी अब यही कहता है। 2 घंटे 15 मिनट वाला नियम (Founder की हाँ) द्वार पर लिखा है।
   v1.1 (ऑडिट K2-H01): 40 मिनट की सीमा पक्की है; सीमा के बाद पहुँचा जवाब server नहीं गिनता। इसलिए फ़ोन जवाब बीच-बीच में सहेजता है:
   5 बदलाव होते ही, नहीं तो 20 सेकंड में; आख़िरी मिनट में हर बदलाव के 1 सेकंड बाद; और सीमा से 8 सेकंड पहले एक आख़िरी बार।
   v1.3 (खेप E-2, Founder के फ़ैसले 19-Nov-2026): ACS EXAM ऐप में परीक्षा पर ताला। ऐप हो (window.ACSApp, lock 1 या नया), तो
     शुरू करने से पहले फ़ोन दो अनुमतियाँ माँगता है (कॉल रोकना, ऐप पिन करना); server ऐप की चाबी (akey) देता है जो हर माँग के साथ जाती है।
     ऐप छोड़ा, पिन हटाया, पर्दा बाँटा, कॉल उठाई या फ़ोन बंद होकर ऐप दोबारा खुला: ऐप बताता है (__acsAppEvent), और यह फ़ाइल
     परीक्षा को उसी कारण के साथ छोड़ देती है। पर्दा बंद होना, कॉल का बजना जैसी बातें सिर्फ़ दर्ज होती हैं (examAppEvent)।
     वेबसाइट पर (ऐप के बिना) परीक्षा पहले जैसी ही चलती है; ऐप में शुरू हुई परीक्षा वेबसाइट से सिर्फ़ छोड़ी जा सकती है।
     परीक्षा चलते समय dashboard का 10 मिनट वाला अपने-आप logout रुका रहता है (window.__acsExamActive)।
   v1.4 (खेप E-3, Founder के नियम 19-Nov-2026, सिर्फ़ कोर्स की अंतिम परीक्षा पर): ऐप में कैमरा हो (ACSApp.info().face 1),
     तो शुरू से पहले "📷 चेहरे की जाँच" (कैमरा खुलता है, कोने में छोटा गोल चित्र; एक ही चेहरा दिखे तभी आगे)।
     18 से कम उम्र (द्वार बताता है: minor) पर अभिभावक की सहमति वाला ✓ ज़रूरी। परीक्षा शुरू होते ही शुरू की फ़ोटो;
     फिर ऐप ख़ुद फ़ोटो देता है (चेहरा हटा, लौटा, या एक से ज़्यादा चेहरे)। यह फ़ाइल हर फ़ोटो server (examFace) को भेजती है,
     और पहुँचने पर ऐप को बताती है (faceAck)। internet न हो, तो फ़ोटो रुककर दोबारा जाती है। परीक्षा कभी नहीं रुकती।
   v1.5 (खेप E-4, Founder का फ़ैसला 13 और E-3 के चुने नियम "अ"): वेबसाइट पर (ऐप के ताले के बिना) खंड चलते समय पन्ना छोड़ा
     (दूसरा ऐप, दूसरा पन्ना, पर्दा बंद), तो लौटते ही server (examWebWarn) को बताया जाता है और चेतावनी दिखती है। 3 चेतावनी तक
     परीक्षा चलती है; चौथी बार परीक्षा वहीं ख़त्म (server बंद करता है)। विराम में और खंड शुरू होने से पहले यह नहीं गिना जाता।
     ऐप में चेहरे की जाँच में झंडा उठा हो, तो नतीजे पर "जाँच बाक़ी" दिखता है: प्रमाणपत्र जाँच के बाद मिलता है।
     Android 10 या नए फ़ोन पर वेबसाइट से खुलने पर ACS EXAM ऐप की सलाह दिखती है।
   v1.6 (खेप E-5, Founder के फ़ैसले 19-Nov-2026: 1-अ, 2-अ, 3-अ, 4-ब):
     4-ब: वेबसाइट की हर कोर्स-परीक्षा में भी कैमरे से चेहरे की जाँच (लैपटॉप, कंप्यूटर, टैबलेट, ऐप के बिना फ़ोन)। कैमरा /assets/face-web.js
       चलाता है (ऐप के FaceCam जैसा: कोने में गोल चित्र, शुरू की फ़ोटो, चेहरा हटा/लौटा/एक से ज़्यादा चेहरे)। कैमरा ज़रूरी है;
       server भी कैमरे के बिना वेबसाइट की परीक्षा शुरू नहीं करता। परीक्षा दोबारा खोलने पर कैमरा अपने-आप फिर चालू होता है।
       खंड चलते समय पन्ना खुला हो और कैमरा 10 सेकंड से ज़्यादा बंद रहे, तो server को "camoff" जाता है (झंडा; फ़ैसला इंसान का)।
     1-अ: लैपटॉप/कंप्यूटर (माउस वाला) पर दूसरी खिड़की में 2 सेकंड से ज़्यादा रहना भी "पन्ना छोड़ना" गिना जाता है।
       अपने ही पूछने वाले डिब्बे (confirm), माइक की अनुमति, और कैमरे की अनुमति पूछते समय यह नहीं गिना जाता।
     2-अ: बड़े Android टैबलेट (Chrome "कंप्यूटर वाली साइट" मोड में) को भी Android पहचाना जाता है: ऐप की सलाह दिखती है।
     3-अ: वेबसाइट पर "फ़ोन" की जगह हर device पर ठीक बैठने वाले शब्द; बोलो वाले प्रश्न की निजता-पंक्ति सच के मुताबिक़।
   खोलना: window.ACS_EXAM.open({ cid, call(name, data), tts, uid, loadRazorpay(), onClose(changed) })
   ============================================================================ */
(function () {
  "use strict";
  var LS = "acs_exam_v1", OPT = ["अ", "ब", "स", "द"], SAVE_EVERY = 5, SAVE_IDLE_MS = 20000, LAST_MS = 60000, FINAL_MS = 8000;
  var NOTE = { wait: "✍️ नए जवाब कुछ ही देर में सहेजे जाएँगे।", saving: "⏳ जवाब सहेजे जा रहे हैं…", ok: "✅ जवाब server पर सहेज लिए गए।",
    fail: "📶 जवाब अभी सहेजे नहीं जा सके। internet देखिए; पन्ना कोशिश करता रहेगा।", late: "⌛ समय पूरा हो चुका था, इसलिए ये जवाब नहीं गिने गए।" };
  var C = null;          /* open() की सेटिंग */
  var G = null;          /* द्वार का आख़िरी जवाब */
  var S = null;          /* चलती परीक्षा: { sid, cid, set, qs, ans, idx, deadline, releaseAt, name, pass, rules, dirty, changes, saving, note } */
  var tick = null, skew = 0, busy = false, changed = false;
  var APP = null, AK = "";   /* (v1.3) ऐप की जानकारी, और इस परीक्षा की ऐप-चाबी */
  var FACE = { cam: "", seen: -1, sid: "", ak: "", q: [], up: false, startAsk: 0, paint: null,   /* (v1.4) ऐप का कैमरा और फ़ोटो की क़तार */
    mode: "", wantStart: false, timer: null, offSince: 0, offSent: false };   /* (v1.6) mode: "app" या "web" (वेबसाइट का कैमरा) */

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
      ".xm-card details{margin-top:8px}.xm-card summary{cursor:pointer;font-weight:700}" +
      ".xm-chk{display:flex;gap:10px;align-items:flex-start;font-size:18px;font-weight:700;margin:12px 0 4px;cursor:pointer}.xm-chk input{width:24px;height:24px;flex:0 0 24px;margin-top:3px}" +
      ".xm-fst{font-size:19px;font-weight:800;padding:12px;border-radius:12px;background:#F5F7FA;margin:12px 0}.xm-fst.ok{background:#E4F2E5;color:#1B5E20}.xm-fst.bad{background:#FDECEA;color:#B71C1C}" +
      ".xm-fnote{position:fixed;left:10px;right:96px;bottom:14px;z-index:10000;background:#0B1F3A;color:#fff;border:2px solid #F9A825;border-radius:12px;padding:10px 12px;font-size:17px;line-height:1.5;display:none}";
    st.textContent += WW_CSS;   /* (v1.5) */
    document.head.appendChild(st);
  }
  /* (v1.5) वेबसाइट की चेतावनी का डिब्बा: परीक्षा के परदे के ऊपर */
  var WW_CSS = ".xm-ww{position:fixed;inset:0;z-index:2147483000;background:rgba(11,31,58,.55);display:flex;align-items:center;justify-content:center;padding:16px}" +
    ".xm-wwc{background:#fff;border-radius:16px;padding:20px;max-width:440px;width:100%;border-top:8px solid #B71C1C;box-shadow:0 10px 30px rgba(0,0,0,.25);color:#0B1F3A;font-size:18px;line-height:1.6}" +
    ".xm-wwc h2{margin:0 0 8px;color:#B71C1C;font-size:22px}.xm-wwc p{margin:8px 0}.xm-wwc .xm-btn{width:100%;margin-top:10px}";
  function box() {
    var ov = $("xmOverlay");
    if (!ov) { style(); ov = document.createElement("div"); ov.id = "xmOverlay"; ov.className = "xm-ov"; document.body.appendChild(ov); document.body.style.overflow = "hidden"; }
    return ov;
  }
  function frame(top, body) { stopTick(); try { speechSynthesis.cancel(); } catch (e) {} window.__acsExamActive = !!(S && S.sid) || locked(); var ov = box(); ov.innerHTML = '<div class="xm-top">' + top + '</div><div class="xm-wrap">' + body + "</div>"; ov.scrollTop = 0; }
  function close() {
    if (locked()) return;   /* (v1.3) ऐप के ताले में परीक्षा चलते समय परदा बंद नहीं होता */
    FACE.paint = null; faceOff();   /* (v1.4) चेहरे की जाँच बीच में छोड़ी: कैमरा बंद */
    stopTick(); try { speechSynthesis.cancel(); } catch (e) {} window.__acsExamActive = false;
    var ov = $("xmOverlay"); if (ov) ov.remove(); document.body.style.overflow = "";
    var cb = C && C.onClose, ch = changed; S = null; G = null; changed = false;
    if (cb) { try { cb(ch); } catch (e) {} }
  }
  /* (15-Nov-2026, पैनल-4ख) कोर्स का नाम: English पैनल में कोर्स-सूची का English नाम (dashboard अपना courseEn देता है) */
  function cname(t, cid) { var en = ""; try { en = (C && C.courseEn) ? (C.courseEn(cid || C.cid, t) || "") : ""; } catch (e) {} return "<span" + (en ? ' data-tr-en="' + esc(en) + '"' : "") + ">" + esc(t) + "</span>"; }
  function topBar(title, extra) { return "<b>" + cname(title) + "</b>" + (extra || "") + '<button class="xm-x" id="xmClose" type="button">✕ बंद करें</button>'; }
  function busyCard(t) { frame(topBar(G && G.course ? G.course.name : "कोर्स-परीक्षा"), '<div class="xm-card" id="xmState" data-st="busy" style="text-align:center">⏳ ' + esc(t) + "</div>"); wireClose(); }
  function errCard(t, retry) {
    frame(topBar(G && G.course ? G.course.name : "कोर्स-परीक्षा"), '<div class="xm-card" id="xmState" data-st="error"><h2>⚠️ काम पूरा नहीं हुआ</h2><p>' + esc(t) + '</p><div class="xm-nav">' +
      (retry ? '<button class="xm-btn blue" id="xmRetry" type="button">🔄 दोबारा कोशिश करें</button>' : "") + '<button class="xm-btn grey" id="xmBack" type="button">← वापस</button></div></div>');
    wireClose(); if (retry) $("xmRetry").onclick = retry; $("xmBack").onclick = function () { gate(); };
  }
  function wireClose() { var b = $("xmClose"); if (!b) return; if (locked()) { b.remove(); return; } b.onclick = function () { if (S && S.qs) save(); close(); }; }

  /* ---------- (v1.3, खेप E-2) ACS EXAM ऐप का ताला ---------- */
  function appInfo() { try { if (window.ACSApp && typeof window.ACSApp.info === "function") { var i = JSON.parse(window.ACSApp.info()); if (i && typeof i === "object") return i; } } catch (e) {} return null; }
  function appLock() { return !!(APP && Number(APP.lock) >= 1 && typeof window.ACSApp.lockPrepare === "function"); }
  function appState() { if (!appLock()) return null; try { return JSON.parse(window.ACSApp.examState() || "null"); } catch (e) { return null; } }
  function locked() { var st = appState(); return !!(st && st.active); }
  function akey(sid) { if (AK) return AK; var st = appState(); return (st && st.akey && (!sid || st.sid === sid)) ? st.akey : ""; }
  function K(o) { var k = akey(o.sid); if (k) o.akey = k; return o; }
  function appOff() { AK = ""; if (appLock()) { try { window.ACSApp.examOff(); } catch (e) {} } webCamOff(); }
  /* (v1.6) वेबसाइट का कैमरा: /assets/face-web.js (ज़रूरत पड़ने पर ही लाया जाता है) */
  var FW_LOAD = null;
  function fwLoad() {
    if (window.ACSFaceWeb) return Promise.resolve(true);
    if (!FW_LOAD) FW_LOAD = new Promise(function (res) {
      var sc = document.createElement("script"); sc.src = "/assets/face-web.js";
      sc.onload = function () { res(!!window.ACSFaceWeb); }; sc.onerror = function () { FW_LOAD = null; res(false); };
      document.head.appendChild(sc);
    });
    return FW_LOAD;
  }
  function webCamOff() { camWatch(false); FACE.wantStart = false; if (window.ACSFaceWeb) { try { window.ACSFaceWeb.close(); } catch (e) {} if (FACE.mode !== "app") { FACE.cam = ""; FACE.seen = -1; } } }
  function isPC() { try { return !!(window.matchMedia && window.matchMedia("(pointer: fine)").matches); } catch (e) { return false; } }
  function appPrepare() {
    return new Promise(function (res, rej) {
      window.__acsLockCb = function (r) { window.__acsLockCb = null; if (r && r.ok) res(r); else rej(r || {}); };
      try { window.ACSApp.lockPrepare(); } catch (e) { window.__acsLockCb = null; rej({ step: "app" }); }
    });
  }
  function lockMsg(r) {
    var st = r && r.step;
    if (st === "call") return "कॉल रोकने की अनुमति नहीं मिली। ऐप में परीक्षा के लिए यह ज़रूरी है। दोबारा कोशिश करें और फ़ोन पूछे तो ACS EXAM चुनें।";
    if (st === "pin") return "ऐप पिन नहीं हुआ। फ़ोन पूछे तो पिन करने की हाँ दें। फ़ोन न पूछे, तो फ़ोन की सेटिंग में ऐप पिन करना (App pinning) चालू करें।";
    if (st === "split") return "पर्दा दो हिस्सों में बँटा है। पूरा पर्दा करके दोबारा कोशिश करें।";
    return "ऐप का ताला नहीं लगा। दोबारा कोशिश करें।";
  }
  function lockCard() {
    var cam = faceApp();
    return '<div class="xm-card" id="xmLock"><h2>🔒 ऐप का ताला</h2>' +
      (cam ? "<p>परीक्षा शुरू करने से पहले फ़ोन तीन बातें पूछेगा।</p><ul><li>पहली: कैमरे की अनुमति (सिर्फ़ पहली बार)। तब अनुमति दें।</li>" +
        "<li>दूसरी: कॉल पहचानने वाला ऐप। तब ACS EXAM चुनें। इससे परीक्षा के समय अनजान नंबर की कॉल अपने-आप कट जाती है।</li>" +
        "<li>तीसरी: ऐप पिन करना। तब पिन करने की हाँ दें।</li></ul>"
      : "<p>परीक्षा शुरू करने से पहले फ़ोन दो बातें पूछेगा।</p>" +
      "<ul><li>पहली: कॉल पहचानने वाला ऐप। तब ACS EXAM चुनें। इससे परीक्षा के समय अनजान नंबर की कॉल अपने-आप कट जाती है।</li>" +
      "<li>दूसरी: ऐप पिन करना। तब पिन करने की हाँ दें।</li></ul>") +
      "<p>परीक्षा के समय सूचनाएँ नहीं दिखेंगी, और पर्दे की फ़ोटो नहीं खिंचेगी।</p>" +
      '<p><b>परीक्षा के बीच ऐप छोड़ा, पिन हटाया, पर्दा बाँटा, या कॉल उठाई, तो परीक्षा वहीं ख़त्म हो जाएगी।</b></p>' +
      "<p>तब कोई अंक दर्ज नहीं होगा, और ₹100 का चांस लगा हो तो वह वापस नहीं मिलेगा।</p>" +
      "<p>पर्दा बंद होने पर परीक्षा नहीं रुकती, सिर्फ़ यह बात दर्ज होती है।</p>" +
      "<p>शुरू करने से पहले फ़ोन चार्ज कर लें और अलार्म बंद कर दें।</p></div>";
  }
  var ABORT_TXT = {
    left: "परीक्षा के बीच ऐप छोड़ा गया।", unpin: "परीक्षा के बीच ऐप का पिन हटाया गया।", split: "परीक्षा के बीच पर्दा दो हिस्सों में बाँटा गया।",
    call: "परीक्षा के बीच कॉल उठाई गई।", restart: "परीक्षा के बीच फ़ोन बंद हुआ, या ऐप बंद होकर दोबारा खुला।", nav: "परीक्षा के बीच पन्ना बदल गया।"
  };
  /* ऐप ने बताया कि नियम टूटा: परीक्षा उसी कारण के साथ छोड़ी जाती है */
  function appAbort(reason) {
    var st = appState(), sid = (st && st.sid) || (S && S.sid) || "";
    if (!sid || !C) return;
    var key = AK || (st && st.akey) || "", why = ABORT_TXT[reason] ? reason : "left";
    stopTick(); busy = true; S = null; AK = "";
    frame("<b>❌</b>", '<div class="xm-card" id="xmState" data-st="appabort-wait" style="text-align:center">⏳ परीक्षा बंद की जा रही है…</div>');
    C.call("examFinish", { sid: sid, cancel: true, reason: why, akey: key }).then(done).catch(function (e) {
      if (codeOf(e) === "gone") return done();
      busy = false;
      frame("<b>❌</b>", '<div class="xm-card" id="xmState" data-st="appabort-fail"><h2>📶 server तक बात नहीं पहुँची</h2><p>' + esc(msgOf(e)) + "</p><p>internet चालू करके दोबारा दबाइए।</p>" +
        '<div class="xm-nav"><button class="xm-btn blue" id="xmRetry" type="button">🔄 दोबारा कोशिश करें</button></div></div>');
      $("xmRetry").onclick = function () { appAbort(why); };
    });
    function done() {
      busy = false; drop(); changed = true;
      try { window.ACSApp.abortDone(sid); } catch (e2) {}
      frame(topBar(G && G.course ? G.course.name : "कोर्स-परीक्षा"), '<div class="xm-card" id="xmState" data-st="appabort" data-why="' + why + '"><h2>❌ परीक्षा ख़त्म हो गई</h2>' +
        "<p>" + ABORT_TXT[why] + "</p><p>ऐप के नियम के अनुसार परीक्षा वहीं ख़त्म हो गई। कोई अंक दर्ज नहीं हुआ।</p>" +
        "<p>यह परीक्षा आज की गिनती में गिनी गई है। ₹100 का चांस लगा था, तो वह वापस नहीं मिलेगा।</p>" +
        '<div class="xm-nav"><button class="xm-btn blue" id="xmDone" type="button">ठीक है, बंद करें</button></div></div>');
      wireClose(); $("xmDone").onclick = close;
    }
  }
  /* ---------- (v1.4, खेप E-3) ऐप का कैमरा: चेहरे की जाँच और फ़ोटो ---------- */
  function faceApp() { return !!(appLock() && Number(APP.face) >= 1 && typeof window.ACSApp.faceOpen === "function"); }
  function faceOff() { if (faceApp()) { try { window.ACSApp.faceClose(); } catch (e) {} } else webCamOff(); }
  function camOpen(web) { if (web) { if (window.ACSFaceWeb) window.ACSFaceWeb.open(); else FACE.cam = "fail:support"; } else window.ACSApp.faceOpen(); }
  function fnote(t) {
    var el = $("xmFaceNote");
    if (!el) { el = document.createElement("div"); el.id = "xmFaceNote"; el.className = "xm-fnote"; document.body.appendChild(el); }
    el.textContent = t; el.style.display = "block";
    clearTimeout(fnote.t); fnote.t = setTimeout(function () { el.style.display = "none"; }, 7000);
  }
  function faceCard() {
    var web = !appLock();   /* (v1.6) वेबसाइट पर भी */
    return '<div class="xm-card" id="xmFaceRules"><h2>📷 चेहरे की जाँच</h2>' +
      (web ? "<p>वेबसाइट पर परीक्षा के समय कैमरा चालू रहेगा। कोने में आपका छोटा गोल चित्र दिखेगा।</p><p>कैमरा ज़रूरी है। कैमरे के बिना परीक्षा शुरू नहीं होती।</p>"
        : "<p>ऐप में परीक्षा के समय सामने वाला कैमरा चालू रहेगा। कोने में आपका छोटा गोल चित्र दिखेगा।</p>") +
      "<p>शुरू में आपकी एक फ़ोटो ली जाएगी। फिर फ़ोटो सिर्फ़ तब ली जाएगी, जब चेहरा कैमरे से हटे या लौटे, या एक से ज़्यादा चेहरे दिखें।</p>" +
      "<p>चेहरा हटना सिर्फ़ दर्ज होता है, परीक्षा नहीं रुकती। जाँच ACS का एक व्यक्ति करता है।</p>" +
      "<p>परीक्षा अकेले बैठकर दें। चेहरा साफ़ दिखे, और रोशनी सामने से हो।</p>" +
      (G && G.minor ? '<label class="xm-chk"><input type="checkbox" id="xmGuard"> <span>मेरे अभिभावक ने इस परीक्षा में कैमरे और फ़ोटो की सहमति दी है।</span></label>' +
        '<p style="font-size:16px">आपकी उम्र 18 साल से कम है, इसलिए यह सहमति ज़रूरी है।</p>' : "") + "</div>";
  }
  function faceState(web) {
    var c = FACE.cam;
    if (web) {   /* (v1.6) वेबसाइट का कैमरा */
      if (c === "fail:perm") return { cls: "bad", t: "❌ कैमरे की अनुमति नहीं मिली। परीक्षा के लिए कैमरा ज़रूरी है। browser में पते के पास कैमरे का निशान दबाकर अनुमति दें, फिर \"दोबारा\" दबाएँ।", re: true };
      if (c === "fail:nocam") return { cls: "bad", t: "❌ इस device में कैमरा नहीं मिला। परीक्षा के लिए कैमरा ज़रूरी है। कैमरा लगाएँ, या ACS EXAM ऐप वाले फ़ोन से परीक्षा दें।", re: true };
      if (c === "fail:support") return { cls: "bad", t: "❌ इस browser में कैमरा नहीं चलता। Chrome या Edge में परीक्षा दीजिए।", re: false };
      if (c === "fail:model") return { cls: "bad", t: "❌ चेहरे की जाँच का औज़ार नहीं खुला। internet देखकर \"दोबारा\" दबाएँ।", re: true };
      if (c.indexOf("fail:") === 0) return { cls: "bad", t: "❌ कैमरा नहीं खुला। कोई दूसरा ऐप या पन्ना कैमरा चला रहा हो, तो उसे बंद करें और \"दोबारा\" दबाएँ।", re: true };
      if (c !== "ok" || FACE.seen < 0) return { cls: "", t: "⏳ कैमरा खुल रहा है…", re: false };
      if (FACE.seen === 1) return { cls: "ok", t: "✅ आपका चेहरा दिख रहा है। अब आगे बढ़ें।", go: true };
      if (FACE.seen === 0) return { cls: "bad", t: "❌ चेहरा नहीं दिख रहा। कैमरे के सामने बैठें।", re: false };
      return { cls: "bad", t: "⚠️ एक से ज़्यादा चेहरे दिख रहे हैं। परीक्षा अकेले दें।", re: false };
    }
    if (c === "fail:perm") return { cls: "bad", t: "❌ कैमरे की अनुमति नहीं मिली। ऐप में परीक्षा के लिए कैमरा ज़रूरी है। नीचे \"दोबारा\" दबाएँ और अनुमति दें। फ़ोन न पूछे, तो फ़ोन की सेटिंग में ACS EXAM को कैमरे की अनुमति दें।", re: true };
    if (c === "fail:nofront") return { cls: "bad", t: "❌ इस फ़ोन में सामने वाला कैमरा नहीं मिला। यह परीक्षा वेबसाइट से दें।", re: false };
    if (c.indexOf("fail:") === 0) return { cls: "bad", t: "❌ कैमरा नहीं खुला। कोई दूसरा ऐप कैमरा चला रहा हो, तो उसे बंद करें और \"दोबारा\" दबाएँ।", re: true };
    if (c !== "ok" || FACE.seen < 0) return { cls: "", t: "⏳ कैमरा खुल रहा है…", re: false };
    if (FACE.seen === 1) return { cls: "ok", t: "✅ आपका चेहरा दिख रहा है। अब आगे बढ़ें।", go: true };
    if (FACE.seen === 0) return { cls: "bad", t: "❌ चेहरा नहीं दिख रहा। फ़ोन को चेहरे के सामने रखें।", re: false };
    return { cls: "bad", t: "⚠️ एक से ज़्यादा चेहरे दिख रहे हैं। परीक्षा अकेले दें।", re: false };
  }
  function faceCheck(next, web) {
    FACE.cam = ""; FACE.seen = -1;
    frame(topBar(G && G.course ? G.course.name : "कोर्स-परीक्षा"), '<div class="xm-card" id="xmState" data-st="facecheck"><h2>📷 चेहरे की जाँच</h2>' +
      (web ? "<p>ऊपर दाएँ कोने में आपका छोटा गोल चित्र दिखेगा। उसे उँगली या माउस से खिसका भी सकते हैं।</p>" +
        "<p>browser कैमरे की अनुमति माँगे, तो \"Allow\" (अनुमति दें) दबाएँ।</p>" +
        "<p>कैमरे के सामने बैठें, ताकि पूरा चेहरा दिखे। हरा घेरा = एक चेहरा, लाल = चेहरा नहीं, पीला = एक से ज़्यादा चेहरे।</p>"
      : "<p>ऊपर दाएँ कोने में आपका छोटा गोल चित्र दिखेगा। उसे उँगली से खिसका भी सकते हैं।</p>" +
      "<p>फ़ोन को चेहरे के सामने रखें, ताकि पूरा चेहरा दिखे। हरा घेरा = एक चेहरा, लाल = चेहरा नहीं, पीला = एक से ज़्यादा चेहरे।</p>") +
      '<p class="xm-fst" id="xmFaceSt">⏳ कैमरा खुल रहा है…</p>' +
      '<div class="xm-nav"><button class="xm-btn green" id="xmFaceGo" type="button" disabled>✅ आगे बढ़ें</button>' +
      '<button class="xm-btn blue" id="xmFaceRe" type="button" style="display:none">🔄 दोबारा</button>' +
      '<button class="xm-btn line" id="xmFaceNo" type="button">← रुकें</button></div></div>');
    wireClose();
    FACE.paint = function () {
      var el = $("xmFaceSt"), go = $("xmFaceGo"), re = $("xmFaceRe"); if (!el) { FACE.paint = null; return; }
      var f = faceState(web); el.textContent = f.t; el.className = "xm-fst" + (f.cls ? " " + f.cls : "");
      go.disabled = !f.go; re.style.display = f.re ? "" : "none";
    };
    $("xmFaceGo").onclick = function () { if ($("xmFaceGo").disabled) return; FACE.paint = null; next(); };
    $("xmFaceRe").onclick = function () { FACE.cam = ""; FACE.seen = -1; FACE.paint(); try { camOpen(web); } catch (e) {} };
    $("xmFaceNo").onclick = function () { FACE.paint = null; busy = false; faceOff(); gate(); };
    try { camOpen(web); } catch (e) { FACE.cam = web ? "fail:support" : "fail:app"; }
    FACE.paint();
  }
  /* फ़ोटो की क़तार: एक-एक करके server को; पहुँची तो ऐप को बताओ; internet न हो तो रुककर फिर */
  function faceAck(id) { if (FACE.mode === "web") return; try { window.ACSApp.faceAck(String(id)); } catch (e) {} }
  function faceUp() {
    if (FACE.up || !FACE.q.length || !C) return;
    var p = FACE.q[0];
    if (!FACE.sid || (FACE.mode !== "web" && !FACE.ak)) { FACE.q.shift(); faceAck(p.id); faceUp(); return; }
    FACE.up = true;
    var fd = FACE.mode === "web" ? { sid: FACE.sid, k: p.k, img: p.img } : { sid: FACE.sid, akey: FACE.ak, k: p.k, img: p.img };   /* (v1.6) वेबसाइट: कोई चाबी नहीं */
    C.call("examFace", fd).then(function (r) {
      FACE.up = false; FACE.q.shift(); faceAck(p.id);
      if (p.k === "start" && r && r.retake) {
        fnote(FACE.mode === "web" ? "📷 शुरू की फ़ोटो में चेहरा साफ़ नहीं दिखा। कैमरे के सामने बैठें। फ़ोटो फिर ली जाएगी।" : "📷 शुरू की फ़ोटो में चेहरा साफ़ नहीं दिखा। फ़ोन को चेहरे के सामने रखें। फ़ोटो फिर ली जाएगी।");
        setTimeout(faceStartPhoto, 5000);
      }
      faceUp();
    }).catch(function (e) {
      FACE.up = false;
      var c = codeOf(e), k = String((e && e.code) || "");
      if (c === "gone" || c === "appOnly" || c === "nocam" || c === "img" || c === "big" || k.indexOf("invalid-argument") >= 0 || k.indexOf("not-found") >= 0) { FACE.q.shift(); faceAck(p.id); faceUp(); return; }
      setTimeout(faceUp, 8000);
    });
  }
  function faceStartPhoto() {
    if (!FACE.sid || FACE.startAsk >= 3) return;
    FACE.startAsk++;
    try { if (FACE.mode === "web") { if (window.ACSFaceWeb) window.ACSFaceWeb.photo("start"); } else window.ACSApp.facePhoto("start"); } catch (e) {}
  }
  /* (v1.6) वेबसाइट: खंड चलते समय, पन्ना खुला हो और कैमरा 10 सेकंड से ज़्यादा बंद रहे, तो server को "camoff" (झंडा) */
  function camWatch(on) {
    if (FACE.timer) { clearInterval(FACE.timer); FACE.timer = null; }
    FACE.offSince = 0; FACE.offSent = false;
    if (!on) return;
    FACE.timer = setInterval(function () {
      if (FACE.mode !== "web" || !FACE.sid || !C) return;
      if (FACE.cam === "ok") {
        if (FACE.offSent) { FACE.offSent = false; C.call("examAppEvent", { sid: FACE.sid, k: "camon" }).catch(function () {}); }
        FACE.offSince = 0; return;
      }
      if (document.hidden || !webExam()) { FACE.offSince = 0; return; }
      if (!FACE.offSince) { FACE.offSince = Date.now(); return; }
      if (!FACE.offSent && Date.now() - FACE.offSince >= 10000) {
        FACE.offSent = true;
        fnote("📷 कैमरा नहीं चल रहा। परीक्षा जारी है, पर यह दर्ज हो रहा है। कैमरा फिर चालू करें।");
        C.call("examAppEvent", { sid: FACE.sid, k: "camoff" }).catch(function () {});
      }
    }, 2000);
  }
  function webCamStart(sid, fresh) {   /* (v1.6) वेबसाइट की परीक्षा शुरू या दोबारा खुली: कैमरा अपने-आप फ़ोटो लेगा */
    FACE.mode = "web"; FACE.sid = sid; FACE.ak = ""; FACE.q = []; FACE.startAsk = 0; FACE.up = false;
    camWatch(true);
    if (window.ACSFaceWeb) window.ACSFaceWeb.setAuto(true);
    if (fresh && FACE.cam === "ok") faceStartPhoto(); else FACE.wantStart = true;   /* कैमरा अभी खुल रहा है: "ok" आते ही शुरू की फ़ोटो (server पहले वाली हो, तो छोड़ देता है) */
  }
  window.__acsFace = function (kind, detail) {
    if (kind === "cam") {
      FACE.cam = String(detail || ""); if (FACE.cam.indexOf("fail:") === 0) FACE.seen = -1; if (FACE.paint) FACE.paint();
      if (FACE.cam === "ok" && FACE.wantStart && FACE.mode === "web") { FACE.wantStart = false; setTimeout(faceStartPhoto, 1500); }   /* (v1.6) */
      return;
    }
    if (kind === "seen") { FACE.seen = Number(detail); if (FACE.paint) FACE.paint(); return; }
    if (kind === "nophoto") { if (detail === "start") setTimeout(faceStartPhoto, 3000); return; }
    if (kind !== "photo") return;
    var p = null; try { p = JSON.parse(detail); } catch (e) {}
    if (!p || !p.id || !p.img) return;
    for (var i = 0; i < FACE.q.length; i++) if (FACE.q[i].id === p.id) return;
    FACE.q.push({ id: String(p.id), k: String(p.k || ""), img: String(p.img) });
    faceUp();
  };

  /* ऐप की घटनाएँ: "abort" = परीक्षा ख़त्म, "flag" = सिर्फ़ दर्ज */
  window.__acsAppEvent = function (kind, detail) {
    if (!C) return;
    if (kind === "abort") { appAbort(String(detail || "")); return; }
    if (kind !== "flag") return;
    var st = appState(), sid = (S && S.sid) || (st && st.sid);
    if (!sid) return;
    var p = String(detail || "").split(":"), k = p.shift();
    C.call("examAppEvent", K({ sid: sid, k: k, x: p.join(":") })).catch(function () {});
  };

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
      "<li>" + Math.round(r.maxSetSec / 60) + " मिनट पूरे होने के बाद दिया गया जवाब नहीं गिना जाता। परीक्षा का पन्ना आपके जवाब बीच-बीच में server पर सहेजता रहता है, इसलिए internet चालू रखिए।</li>" +
      "<li>पूरी परीक्षा शुरू होने के " + Math.floor(r.sessionSec / 3600) + " घंटे " + Math.round((r.sessionSec % 3600) / 60) + " मिनट के भीतर पूरी करनी है। नहीं तो वह रद्द मानी जाती है: कोई अंक दर्ज नहीं होता, पर वह दिन की गिनती में गिनी जाती है।</li>" +
      "<li>एक दिन में सब परीक्षाएँ मिलाकर " + r.dailyMax + " ही दी जा सकती हैं (करियर टेस्ट भी इसी गिनती में है)।</li></ul>";
  }
  function privacyHtml() {
    return '<div class="xm-note">🔒 इस परीक्षा की जाँच server करता है, इसलिए आपके जवाब server को जाते हैं। server जवाब को उसी समय जाँचता है और सिर्फ़ यह रखता है कि प्रश्न सही हुआ या ग़लत।' +
      '<details><summary>server क्या रखता है (पूरा ब्योरा)</summary>' +
      "<p>परीक्षा के दौरान server यह रिकॉर्ड रखता है: आपके खाते की पहचान, कोर्स, परीक्षा का रास्ता (बैज या ₹100, और ₹100 का order-नंबर), चुने गए 120 प्रश्नों के नंबर, हर प्रश्न के विकल्पों का क्रम, हर खंड के शुरू और पूरा होने का समय और समय-सीमाएँ, और जाँचे जा चुके हर प्रश्न का अंक। आज आपने कितनी परीक्षाएँ शुरू और पूरी कीं, इसकी गिनती भी रहती है।</p>" +
      "<p>बोलो वाले प्रश्न में आपकी आवाज़ ACS के server पर नहीं आती। आवाज़ को पाठ में आपका फ़ोन या browser बदलता है। इसके लिए फ़ोन या browser आवाज़ को Google की सेवा को भेज सकता है।</p>" +
      "<p>ACS के server को सिर्फ़ बना हुआ पाठ जाता है, जाँच के लिए। server उसे सेव नहीं करता।</p>" +
      "<p>परीक्षा पूरी होने, छोड़ने या समय निकलने पर यह रिकॉर्ड मिटा दिया जाता है। नतीजे में ये बातें दर्ज रहती हैं: आपका नाम और रजिस्ट्रेशन-नंबर, कोर्स, अंक, प्रतिशत, और पास या फेल। 5 हिस्सों का ब्योरा 7 दिन रहता है।</p>" +
      "<p>हर कोर्स में सिर्फ़ आपका सबसे अच्छा नतीजा दर्ज रहता है। भुगतान का रिकॉर्ड (जैसे ₹100 का चांस कब और किस परीक्षा में लगा) हिसाब के लिए रहता है।</p>" +
      "<p>📱 ACS EXAM ऐप से दी गई परीक्षा में server एक छोटा रिकॉर्ड और रखता है: ऐप का संस्करण, फ़ोन के Android का अंक, कॉल रोकने की अनुमति थी या नहीं, और परीक्षा के बीच की घटनाएँ (जैसे पर्दा बंद होना, कॉल का बजना, ऐप छोड़ना)।</p>" +
      "<p>फ़ोन में पर्दा पढ़ने वाली कोई सेवा (जैसे TalkBack) चालू हो, तो उसका नाम भी दर्ज होता है। यह रिकॉर्ड 30 दिन बाद अपने-आप मिट जाता है।</p>" +
      "<p>📷 ऐप में परीक्षा के समय सामने वाला कैमरा चालू रहता है। शुरू में आपकी एक फ़ोटो server को जाती है। फिर फ़ोटो सिर्फ़ तब जाती है, जब चेहरा कैमरे से हटे या लौटे, या एक से ज़्यादा चेहरे दिखें।</p>" +
      "<p>💻 वेबसाइट से दी गई परीक्षा में भी कैमरा चालू रहता है, और फ़ोटो ठीक ऐप की तरह जाती हैं। कैमरे की तस्वीर में चेहरे आपके ही device पर गिने जाते हैं। वह तस्वीर कहीं नहीं जाती।</p>" +
      "<p>वेबसाइट की परीक्षा का भी एक छोटा रिकॉर्ड रहता है: device का प्रकार (माउस वाला कंप्यूटर, या फ़ोन और टैबलेट), कैमरा बंद रहने की घटना, और पन्ना छोड़ने की चेतावनियाँ। यह रिकॉर्ड भी 30 दिन बाद अपने-आप मिट जाता है।</p>" +
      "<p>ACS का server शुरू वाली फ़ोटो को आपकी रजिस्ट्रेशन वाली फ़ोटो से मशीन से मिलाता है। यह मिलान ACS के अपने server पर होता है, कोई फ़ोटो बाहर नहीं जाती। मशीन फ़ैसला नहीं करती: शक हो, तो ACS का एक व्यक्ति फ़ोटो देखकर फ़ैसला करता है।</p>" +
      "<p>परीक्षा की फ़ोटो 7 दिन बाद मिट जाती हैं। पास होकर सबसे अच्छा अंक बने, तो शुरू वाली एक फ़ोटो प्रमाणपत्र के लिए रखी जाती है। चेहरे का गणित-नक़्शा कहीं सेव नहीं होता।</p></details></div>";
  }
  function bestHtml(b) {
    if (!b) return '<p>इस कोर्स में आपका कोई अंक अभी दर्ज नहीं है।</p>';
    var h = '<p><b>आपका दर्ज अंक: ' + b.pct + "% (" + b.score + " / " + b.total + ") " + (b.pass ? "✅ पास" : "❌ पास नहीं") + "</b></p>";
    if (b.parts) h += partsHtml(b.parts, b.partsN) + (b.certNo ? "" : '<p style="font-size:16px">यह ब्योरा ' + new Date(b.detailUntil).toLocaleDateString("hi-IN") + " तक दिखेगा। उसके बाद सिर्फ़ अंक दिखेगा।" + (b.pass ? " ₹125 का प्रमाणपत्र लेने पर ब्योरा नहीं मिटता।" : "") + "</p>");
    else h += '<p style="font-size:16px">5 हिस्सों वाला ब्योरा 7 दिन तक ही दिखता है।</p>';
    if (b.certNo) h += "<p>📜 इस नतीजे पर प्रमाणपत्र लिया जा चुका है: " + esc(b.certNo) + "</p>";
    else if (b.pass && b.face === "open") h += '<p id="xmFaceHold">⏳ इस परीक्षा में चेहरे की जाँच अभी बाक़ी है। जाँच पूरी होने के बाद प्रमाणपत्र ले सकेंगे।</p>';   /* (v1.5) */
    else if (b.pass) h += '<p>📜 प्रमाणपत्र ₹125 में मिलता है। उसे "मेरे कोर्स" की तालिका से लीजिए।</p>';
    return h;
  }
  function gate() {
    S = null; busyCard("जाँच हो रही है…");
    C.call("examGate", { courseId: C.cid }).then(function (d) {
      G = d; skew = (d.now || Date.now()) - Date.now();
      var r = d.rules, q = d.quota || {}, h = '<div class="xm-card" id="xmState" data-st="gate"><h2>🎓 ' + cname(d.course.name) + "</h2>" +
        "<p>पास होने के लिए " + d.course.pass + "% चाहिए।</p>" + rulesHtml(r) + "</div>" +
        '<div class="xm-card"><h2>📊 आपका नतीजा</h2>' + bestHtml(d.best) +
        (d.best ? '<p style="font-size:16px">नियम: हर कोर्स में सबसे अच्छा अंक ही दर्ज रहता है। नई परीक्षा का अंक तभी दर्ज होगा जब वह ' + d.best.pct + "% से ज़्यादा हो। कम या बराबर आए, तो " + d.best.pct + "% ही रहेगा।</p>" : "") + "</div>";
      var act = "", st0 = appState(), here = !!(d.open && st0 && st0.sid === d.open.sid && st0.active), lockNote = "", webFace = "";
      if (d.open && d.open.courseId === C.cid && d.open.via === "app" && !here) {
        act = "<h2>⏳ आपकी यह परीक्षा ACS EXAM ऐप में चल रही है</h2>" +
          (appLock() ? "<p>यह परीक्षा इस फ़ोन के ऐप में नहीं चल रही, इसलिए यहाँ आगे नहीं बढ़ सकती। आप इसे छोड़ सकते हैं।</p>"
            : "<p>इसे उसी फ़ोन के ऐप में ही जारी रखें। यहाँ से यह परीक्षा सिर्फ़ छोड़ी जा सकती है।</p>") +
          '<div class="xm-nav"><button class="xm-btn line" id="xmAbandon" type="button">❌ परीक्षा छोड़ें</button></div>';
      } else if (d.open && d.open.courseId === C.cid) {
        act = "<h2>⏳ आपकी यह परीक्षा चल रही है</h2><p>अभी खंड " + d.open.set + " चल रहा है। घड़ी चल रही है।</p>" +
          (d.open.via === "web" && d.open.warn > 0 ? '<p id="xmWarnCount"><span>अब तक मिली चेतावनी:</span> <b data-i18n-skip>' + d.open.warn + " / " + (d.open.warnMax || 3) + "</b></p>" : "") +   /* (v1.5) */
          '<div class="xm-nav"><button class="xm-btn green" id="xmResume" type="button">' + (appLock() && !here ? "🔒 ताला लगाकर जारी रखें" : "▶ जारी रखें") + '</button><button class="xm-btn line" id="xmAbandon" type="button">❌ परीक्षा छोड़ें</button></div>';
      } else if (d.open) {
        act = "<h2>⏳ आपकी एक और परीक्षा चल रही है</h2><p>" + cname(d.open.name, d.open.courseId) + "</p><p>एक समय में एक ही कोर्स-परीक्षा चल सकती है। पहले उसे पूरा कीजिए, या उसे छोड़ दीजिए।</p>" +
          '<div class="xm-nav"><button class="xm-btn line" id="xmAbandon" type="button">❌ वह परीक्षा छोड़ें</button></div>';
      } else if (!q.canStart) {
        act = "<h2>🌙 आज की सीमा पूरी</h2><p>आज की " + r.dailyMax + " परीक्षाएँ हो चुकी हैं। अगली परीक्षा कल रात 12 बजे के बाद दे सकेंगे।</p>";
      } else if (d.mode === "badge") {
        act = "<h2>✅ आपका बैज सक्रिय है</h2><p>यह परीक्षा आपके लिए मुफ़्त है।</p>" + '<div class="xm-nav"><button class="xm-btn green" id="xmStart" type="button">' + (appLock() ? "🔒 ताला लगाकर परीक्षा शुरू करें" : "🚀 परीक्षा शुरू करें") + "</button></div>";
        if (appLock()) lockNote = lockCard() + (faceApp() ? faceCard() : ""); else webFace = faceCard();
      } else if (d.mode === "attempt") {
        act = "<h2>✅ आपके पास ₹100 का एक चांस है</h2><p>परीक्षा शुरू करते ही यह चांस इस्तेमाल हो जाएगा। ₹100 का चांस वापस नहीं होता। सिर्फ़ हमारी तकनीकी ग़लती हो, तो पूरा पैसा वापस मिलता है।</p>" + '<div class="xm-nav"><button class="xm-btn green" id="xmStart" type="button">' + (appLock() ? "🔒 ताला लगाकर परीक्षा शुरू करें" : "🚀 परीक्षा शुरू करें") + "</button></div>";
        if (appLock()) lockNote = lockCard() + (faceApp() ? faceCard() : ""); else webFace = faceCard();
      } else {
        act = "<h2>🔑 परीक्षा के लिए बैज या ₹100</h2><p>विद्यार्थी का गोल्डन बैज या नौकरी-इच्छुक का हरा बैज हो, तो परीक्षा मुफ़्त है।</p><p>बैज न हो, तो ₹100 देकर एक परीक्षा दे सकते हैं। यह चांस भुगतान के बाद 30 दिन तक चलता है, और किसी भी एक परीक्षा में लगता है (किसी कोर्स की परीक्षा या करियर टेस्ट)।</p>" +
          '<div class="xm-nav"><button class="xm-btn gold" id="xmPay" type="button">₹100 देकर एक चांस लें</button></div>' +
          '<p style="font-size:17px;font-weight:700" id="xmRefund">₹100 का चांस वापस नहीं होता। सिर्फ़ हमारी तकनीकी ग़लती हो, तो पूरा पैसा वापस मिलता है।</p>' +
          '<p style="font-size:16px">पूरा नियम: <a href="/refund.html" target="_blank" rel="noopener">वापसी-नीति</a></p>';
      }
      if (APP && !appLock()) lockNote = '<div class="xm-card" id="xmAppOld"><p>📱 ACS EXAM ऐप का नया रूप आ गया है। उसमें परीक्षा पर ताला लगता है। नया ऐप acslearn.com/exam-app.html से लें।</p></div>';
      if (!appLock()) lockNote += webRuleHtml() + webFace;   /* (v1.5) वेबसाइट पर: 3 चेतावनी का नियम, और Android 10 या नए फ़ोन पर ऐप की सलाह; (v1.6) कैमरे का नियम */
      if (appLock() && !faceApp()) lockNote += '<div class="xm-card" id="xmAppOld"><p>📷 ACS EXAM ऐप का नया रूप आ गया है। उसमें परीक्षा के समय चेहरे की जाँच होती है। नया ऐप acslearn.com/exam-app.html से लें।</p></div>';
      frame(topBar(d.course.name), h + lockNote + '<div class="xm-card" id="xmAct">' + act + '<div class="xm-warn" id="xmMsg"></div></div>' + privacyHtml());
      wireClose();
      if ($("xmStart")) $("xmStart").onclick = start;
      if ($("xmResume")) $("xmResume").onclick = function () { resume(d.open); };
      if ($("xmAbandon")) $("xmAbandon").onclick = function () { abandon(d.open.sid); };
      if ($("xmPay")) $("xmPay").onclick = pay;
    }).catch(function (e) { errCard(msgOf(e), gate); });
  }
  /* ---------- (v1.5) वेबसाइट की परीक्षा: खंड चलते समय पन्ना छोड़ा, तो चेतावनी (Founder का फ़ैसला 13) ----------
     3 चेतावनी तक परीक्षा चलती है; चौथी बार server परीक्षा बंद कर देता है। ऐप के ताले में यह नहीं गिना जाता (वहाँ ऐप छोड़ना = परीक्षा ख़त्म)। */
  var WW = { on: false, away: 0, busy: false, blurT: null, dlg: false, mic: false };   /* (v1.6) dlg/mic: अपना डिब्बा या माइक की अनुमति खुली है */
  function isAndroid() {   /* (v1.6, फ़ैसला 2-अ) बड़े Android टैबलेट पर Chrome "कंप्यूटर वाली साइट" मोड में Linux बताता है: छूने वाला Linux = Android */
    var ua = String((navigator && navigator.userAgent) || "");
    if (/Android/i.test(ua)) return true;
    try { if (navigator.userAgentData && /Android/i.test(String(navigator.userAgentData.platform || ""))) return true; } catch (e) {}
    return /X11; Linux x86_64/.test(ua) && !/CrOS/.test(ua) && (Number(navigator.maxTouchPoints) || 0) > 1;
  }
  function webRuleHtml() {
    return '<div class="xm-card" id="xmWebRule"><h2>⚠️ वेबसाइट पर परीक्षा का नियम</h2>' +
      "<p>खंड चलते समय परीक्षा का पन्ना छोड़ा (दूसरा ऐप, दूसरा पन्ना, या पर्दा बंद), तो चेतावनी मिलेगी।</p>" +
      "<p>लैपटॉप या कंप्यूटर पर: किसी दूसरी खिड़की में 2 सेकंड से ज़्यादा रहे, तो भी चेतावनी मिलेगी।</p>" +
      "<p>3 चेतावनी तक परीक्षा चलती है। चौथी बार पन्ना छोड़ने पर परीक्षा वहीं ख़त्म हो जाती है: कोई अंक दर्ज नहीं होता, और ₹100 का चांस वापस नहीं होता।</p>" +
      "<p>विराम के समय पन्ना छोड़ना नहीं गिना जाता।</p>" +
      (isAndroid() && !APP ? '<p id="xmAppTip">📱 आपका फ़ोन या टैबलेट Android 10 या नया है, तो परीक्षा ACS EXAM ऐप से दें। ऐप में परीक्षा पर ताला लगता है। <a href="/exam-app.html" target="_blank" rel="noopener">ACS EXAM ऐप लें</a></p>' : "") +
      "</div>";
  }
  function webExam() {   /* सिर्फ़ खंड चलते समय (प्रश्न का परदा, या कम से कम समय का इंतज़ार); विराम में नहीं */
    var e = $("xmState"), st = e ? e.getAttribute("data-st") : "";
    return !!(S && S.sid && S.qs) && (st === "run" || st === "wait") && !locked();
  }
  function wwClose() { var w = document.getElementById("xmWebWarn"); if (w && w.parentNode) w.parentNode.removeChild(w); }
  function wwShow(n, max) {
    wwClose();
    var w = document.createElement("div"); w.id = "xmWebWarn"; w.className = "xm-ww"; w.setAttribute("role", "alertdialog");
    w.innerHTML = '<div class="xm-wwc"><h2><span>⚠️ चेतावनी</span> <b data-i18n-skip>' + n + " / " + max + "</b></h2>" +
      "<p>आपने परीक्षा के बीच परीक्षा का पन्ना छोड़ा।</p>" +
      (n >= max ? "<p><b>यह आख़िरी चेतावनी है। अब पन्ना छोड़ा, तो परीक्षा वहीं ख़त्म हो जाएगी।</b></p>"
        : "<p>परीक्षा का पन्ना न छोड़ें। 3 चेतावनी के बाद चौथी बार पन्ना छोड़ने पर परीक्षा ख़त्म हो जाती है।</p>") +
      '<button class="xm-btn green" id="xmWwOk" type="button">✅ समझ गया, परीक्षा जारी रखें</button></div>';
    document.body.appendChild(w);
    var b = document.getElementById("xmWwOk"); if (b) { b.onclick = wwClose; try { b.focus(); } catch (e) {} }
  }
  function webEnded() {
    wwClose(); stopTick(); drop(); changed = true; S = null; appOff();   /* (v1.6) कैमरा बंद */
    frame(topBar(G && G.course ? G.course.name : "कोर्स-परीक्षा"), '<div class="xm-card" id="xmState" data-st="webend"><h2>⛔ परीक्षा ख़त्म हो गई</h2>' +
      "<p>आपने 3 चेतावनी के बाद फिर परीक्षा का पन्ना छोड़ा। इसलिए यह परीक्षा वहीं ख़त्म हो गई।</p>" +
      "<p>इसका कोई अंक दर्ज नहीं हुआ। यह परीक्षा आज की गिनती में गिनी गई।</p>" +
      '<div class="xm-nav"><button class="xm-btn blue" id="xmBack" type="button">↩ परीक्षा के द्वार पर लौटें</button></div></div>');
    wireClose(); if ($("xmBack")) $("xmBack").onclick = gate;
  }
  function exempt() { return WW.dlg || WW.mic || !!(window.ACSFaceWeb && window.ACSFaceWeb.state().asking); }
  function ask(t) { WW.dlg = true; try { return window.confirm(t); } finally { setTimeout(function () { WW.dlg = false; }, 400); clearTimeout(WW.blurT); } }
  function webWarnInit() {
    if (WW.on) return; WW.on = true;
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) { clearTimeout(WW.blurT); if (webExam() && !WW.away) WW.away = Date.now(); return; }
      wwBack();
    });
    /* (v1.6, फ़ैसला 1-अ) लैपटॉप/कंप्यूटर: दूसरी खिड़की में 2 सेकंड से ज़्यादा */
    window.addEventListener("blur", function () {
      if (!isPC() || document.hidden || WW.away || !webExam() || exempt()) return;
      clearTimeout(WW.blurT);
      WW.blurT = setTimeout(function () { if (!document.hidden && !WW.away && webExam() && !exempt() && !document.hasFocus()) WW.away = Date.now(); }, 2000);
    });
    window.addEventListener("focus", function () { clearTimeout(WW.blurT); if (!document.hidden) wwBack(); });
  }
  function wwBack() {   /* पन्ने पर लौटे: छोड़ना गिना गया हो, तो server को बताओ */
    if (!WW.away) return;
    WW.away = 0;
    if (!webExam() || WW.busy || !C) return;
    WW.busy = true;
    C.call("examWebWarn", { sid: S.sid }).then(function (d) {
      WW.busy = false;
      if (!d || d.app) return;
      if (d.ended) { webEnded(); return; }
      wwShow(d.n, d.max || 3);
    }).catch(function (e) {
      WW.busy = false;
      if (codeOf(e) === "gone") { wwClose(); drop(); changed = true; S = null; appOff(); gate(); }
    });
  }
  function abandon(sid) {
    if (!ask("पक्का छोड़ें? यह परीक्षा दिन की गिनती में गिनी जाएगी, और इसका कोई अंक दर्ज नहीं होगा। ₹100 का चांस लगा हो, तो वह इस्तेमाल हो चुका है और वापस नहीं मिलेगा।")) return;
    busyCard("परीक्षा छोड़ी जा रही है…");
    C.call("examFinish", K({ sid: sid, cancel: true, reason: "user" })).then(function () { drop(); changed = true; appOff(); gate(); }).catch(function (e) { if (codeOf(e) === "gone") { drop(); appOff(); gate(); } else errCard(msgOf(e), gate); });
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
    if (busy) return;
    var guard0 = !!(G && G.minor);
    if (!appLock()) {   /* (v1.6, फ़ैसला 4-ब) वेबसाइट: पहले कैमरे से चेहरे की जाँच */
      if (guard0 && !($("xmGuard") && $("xmGuard").checked)) { var m0 = $("xmMsg"); if (m0) m0.textContent = "अभिभावक की सहमति वाले खाने पर ✓ लगाएँ।"; return; }
      busy = true; busyCard("कैमरा तैयार हो रहा है…");
      fwLoad().then(function (ok) {
        if (!ok) { busy = false; errCard("कैमरे वाला हिस्सा नहीं खुला। internet देखकर दोबारा कोशिश करें।", gate); return; }
        faceCheck(function () { startNow(null, guard0, true); }, true);
      });
      return;
    }
    var cam = faceApp(), guard = guard0;
    if (cam && guard && !($("xmGuard") && $("xmGuard").checked)) { var m = $("xmMsg"); if (m) m.textContent = "अभिभावक की सहमति वाले खाने पर ✓ लगाएँ।"; return; }
    busy = true;
    function lock() {
      busyCard("ऐप का ताला लग रहा है… फ़ोन जो पूछे, उसकी हाँ दें।");
      appPrepare().then(function (r) { startNow({ v: APP.version, code: APP.code, sdk: APP.sdk, call: !!r.call, face: cam }, cam && guard); })
        .catch(function (r) { busy = false; appOff(); errCard(lockMsg(r), gate); });
    }
    if (cam) faceCheck(lock); else lock();
  }
  function startNow(app, guardian, web) {
    busyCard("प्रश्न चुने जा रहे हैं…");
    var req = app ? { courseId: C.cid, app: app } : { courseId: C.cid };
    if (web) req.web = { face: true, dev: isPC() ? "pc" : "touch" };   /* (v1.6) */
    if (guardian) req.guardian = true;
    C.call("examStart", req).then(function (d) {
      busy = false; changed = true; drop();
      if (app) {
        var on = "bad"; try { on = window.ACSApp.examOn(d.sid, d.courseId || C.cid, d.akey || ""); } catch (e) {}
        AK = d.akey || "";
        if (on !== "ok") { S = { sid: d.sid }; appAbort(on === "split" ? "split" : "unpin"); return; }
        if (d.face && d.face.on) { FACE.mode = "app"; FACE.sid = d.sid; FACE.ak = AK; FACE.q = []; FACE.startAsk = 0; faceStartPhoto(); }
      } else if (web) webCamStart(d.sid, true);   /* (v1.6) */
      adopt(d);
    }).catch(function (e) {
      busy = false; appOff(); var c = codeOf(e);
      if (c === "open" || c === "limit" || c === "pay") gate();
      else if (c === "webcam") { faceOff(); errCard(msgOf(e), gate); }
      else if (c === "guardian") errCard("आपकी उम्र 18 साल से कम है। कैमरे वाली परीक्षा के लिए अभिभावक की सहमति ज़रूरी है। द्वार पर सहमति वाले खाने पर ✓ लगाएँ।", gate);
      else errCard(msgOf(e), gate);
    });
  }
  function resume(o) {
    var st = appState();
    if (appLock() && !(st && st.sid === o.sid && st.active)) {
      /* वेबसाइट पर शुरू हुई परीक्षा ऐप में: पहले ताला */
      if (busy) return; busy = true; busyCard("ऐप का ताला लग रहा है… फ़ोन जो पूछे, उसकी हाँ दें।");
      appPrepare().then(function () {
        var on = "bad"; try { on = window.ACSApp.examOn(o.sid, o.courseId, ""); } catch (e) {}
        busy = false;
        if (on !== "ok") { appOff(); errCard(lockMsg({ step: on === "split" ? "split" : "pin" }), function () { resume(o); }); return; }
        resumeNow(o);
      }).catch(function (r) { busy = false; appOff(); errCard(lockMsg(r), function () { resume(o); }); });
      return;
    }
    if (st && st.sid === o.sid) { AK = st.akey || ""; if (faceApp() && AK) { FACE.mode = "app"; FACE.sid = o.sid; FACE.ak = AK; } }
    if (!appLock() && o.face) {   /* (v1.6) वेबसाइट की कैमरे वाली परीक्षा दोबारा खुली: कैमरा फिर चालू */
      webCamStart(o.sid, false);
      fwLoad().then(function (ok) { if (!ok || FACE.sid !== o.sid) return; window.ACSFaceWeb.open(); window.ACSFaceWeb.setAuto(true); });
    }
    resumeNow(o);
  }
  function resumeNow(o) {
    if (o.done >= o.set && o.set < 3) { S = { sid: o.sid, cid: o.courseId, set: o.set, rules: G.rules, name: G.course.name }; pause(o.doneAt, o.breakFrom); return; }
    busyCard("परीक्षा खोली जा रही है…");
    C.call("examNext", K({ sid: o.sid, set: o.set })).then(adopt).catch(function (e) { if (codeOf(e) === "expired" || codeOf(e) === "gone") { drop(); appOff(); gate(); } else errCard(msgOf(e), gate); });
  }
  function isDone(a) { return (typeof a === "number" && a >= 0) || (typeof a === "string" && a.length > 0); }
  function countDone(a) { var n = 0; for (var i = 0; i < a.length; i++) if (isDone(a[i])) n++; return n; }
  function qHtml(q) {
    var t = String(q.t || ""), mic = /\(\(MIC\)\)/.test(t); t = t.replace(/\s*\(\(MIC\)\)/, "");
    var m = /\(\(AU:([\s\S]*?)\)\)/.exec(t), h;
    if (m) {
      h = "<span data-i18n-skip>" + esc(t.replace(m[0], "").replace(/\s+$/, "")) + '</span><div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">' +
        '<button type="button" class="xm-btn blue" style="flex:0 1 auto;font-size:18px" data-say="' + esc(m[1]) + '">🔊 वाक्य सुनिए</button>' +
        '<button type="button" class="xm-btn line" style="flex:0 1 auto;font-size:18px" data-say="' + esc(m[1]) + '" data-slow="1">🐢 धीरे सुनिए</button></div>';
    } else h = "<span data-i18n-skip>" + esc(t) + "</span>";   /* (पैनल-4ख) प्रश्न और विकल्प कोर्स की भाषा में: भाषा-इंजन इन्हें नहीं छूता */
    return { html: h, mic: mic || q.mic === 1 };
  }
  function clockText() { var left = S.deadline - now(); return "⏱ बचा समय: " + mmss(left); }
  function render() {
    var q = S.qs[S.idx], qq = qHtml(q), a = S.ans[S.idx], n = S.qs.length, done = countDone(S.ans), last = S.idx === n - 1;
    var h = '<div class="xm-card" id="xmState" data-st="run" data-set="' + S.set + '" data-idx="' + S.idx + '"><div style="font-size:17px;font-weight:700;color:#1565C0">खंड ' + S.set + " · प्रश्न " + (S.idx + 1) + " / " + n + " · जवाब दिए " + done + "</div>" +
      '<div class="xm-q">' + qq.html + "</div>";
    if (qq.mic) {
      h += '<div class="xm-mic"><button type="button" class="xm-btn blue" id="xmMic" style="width:100%">🎤 बोलिए</button><div id="xmMicOut" style="margin-top:8px">' +
        (typeof a === "string" && a ? '✅ सुना गया: <b dir="auto" data-i18n-skip>' + esc(a) + "</b>" : "माइक का बटन दबाकर ज़ोर से और साफ़ बोलिए।") + "</div></div>";
    } else {
      for (var j = 0; j < q.o.length; j++) h += '<button type="button" class="xm-opt' + (a === j ? " sel" : "") + '" data-o="' + j + '"><i data-tr-en="' + "ABCD".charAt(j) + '">' + OPT[j] + '</i><span dir="auto" data-i18n-skip>' + esc(q.o[j]) + "</span></button>";
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
    if (!("speechSynthesis" in window)) { var m = $("xmMsg"); if (m) m.textContent = "इस browser में आवाज़ नहीं चल रही। Chrome में खोलिए।"; return; }
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
    if (!SR) { out.innerHTML = '<span style="color:#B71C1C">इस browser में बोली की पहचान नहीं चलती। Chrome या Edge में परीक्षा दीजिए।</span>'; return; }
    try { speechSynthesis.cancel(); } catch (e) {}
    var r = new SR(), got = false; r.lang = C.tts || "en-IN"; r.interimResults = false; r.maxAlternatives = 1; r.continuous = false;
    b.disabled = true; b.textContent = "🎙️ सुन रहा हूँ… बोलिए"; out.innerHTML = '<span style="color:#1565C0">माइक चालू है। साफ़ बोलिए, फिर रुकिए।</span>';
    r.onresult = function (ev) {
      var t = ""; try { t = ev.results[0][0].transcript; } catch (e) {}
      if (!S || S.sid !== sidAt || S.set !== setAt) return;
      if (t && String(t).trim() && S.deadline - now() > 0) { got = true; S.ans[at] = String(t).trim().slice(0, 400); save(); markDirty(); if (S.idx === at && $("xmMicOut")) $("xmMicOut").innerHTML = '✅ सुना गया: <b dir="auto" data-i18n-skip>' + esc(t) + '</b><br><span style="font-size:16px">ठीक नहीं लगा? दोबारा बोल सकते हैं।</span>'; }
    };
    r.onstart = function () { WW.mic = false; };   /* (v1.6) माइक की अनुमति पूछी जा चुकी */
    r.onerror = function (ev) { WW.mic = false; if ($("xmMicOut")) $("xmMicOut").innerHTML = '<span style="color:#B71C1C">माइक नहीं चला (' + esc(ev.error || "") + ")। माइक की अनुमति दीजिए, फिर दोबारा दबाइए।</span>"; };
    r.onend = function () { WW.mic = false; var bb = $("xmMic"); if (bb) { bb.disabled = false; bb.textContent = "🎤 बोलिए"; } if (!got && $("xmMicOut") && !/माइक नहीं चला/.test($("xmMicOut").textContent)) $("xmMicOut").innerHTML = '<span style="color:#B71C1C">कुछ सुनाई नहीं दिया। दोबारा बोलिए।</span>'; };
    WW.mic = true; setTimeout(function () { WW.mic = false; }, 12000);
    try { r.start(); } catch (e) { WW.mic = false; b.disabled = false; b.textContent = "🎤 बोलिए"; }
  }
  /* जवाब server को भेजना। done=false: सिर्फ़ सहेजना (server उसी समय जाँचकर अंक रख लेता है)। done=true: खंड पूरा करना। */
  function send(done) {
    return S.set < 3 ? C.call("examNext", K({ sid: S.sid, set: S.set + 1, answers: S.ans, done: done }))
      : C.call("examFinish", K({ sid: S.sid, answers: S.ans, done: done }));
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
    if (blank > 0 && !ask(blank + " प्रश्न ख़ाली हैं। ख़ाली प्रश्न ग़लत गिने जाएँगे। क्या खंड अभी जमा करना है?")) return;
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
      if (d.cancelled) { drop(); appOff(); return gate(); }
      drop(); changed = true; appOff(); result(d);
    }).catch(function (e) {
      busy = false; if (S !== st) return;
      var c = codeOf(e);
      if (c === "expired" || c === "gone") { drop(); changed = true; appOff(); frame(topBar(S.name || "कोर्स-परीक्षा"), '<div class="xm-card" id="xmState" data-st="expired"><h2>⌛ परीक्षा का समय पूरा हो चुका है</h2><p>यह परीक्षा समय पर पूरी नहीं हुई, इसलिए इसका कोई अंक दर्ज नहीं हुआ। यह दिन की गिनती में गिनी गई है।</p><div class="xm-nav"><button class="xm-btn blue" id="xmBack" type="button">← वापस</button></div></div>'); wireClose(); $("xmBack").onclick = gate; return; }
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
      C.call("examNext", K({ sid: st.sid, set: nextSet })).then(function (d) { busy = false; adopt(d); }).catch(function (e) {
        busy = false; var c = codeOf(e);
        if (c === "early") { var w = (e.details.waitSec || 5) * 1000; min = now() + w; tick = setInterval(upd, 1000); return; }
        if (c === "expired" || c === "gone") { drop(); changed = true; appOff(); gate(); return; }
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
        (d.pass ? (d.face === "open" ? '<p id="xmFaceHold">⏳ इस परीक्षा में चेहरे की जाँच अभी बाक़ी है। जाँच पूरी होने के बाद प्रमाणपत्र ले सकेंगे।</p>'   /* (v1.5) */
          : '<p>📜 प्रमाणपत्र ₹125 में मिलता है। उसे "मेरे कोर्स" की तालिका से लीजिए। प्रमाणपत्र लेने पर यह ब्योरा नहीं मिटता।</p>') : "<p>फिर से पढ़कर दोबारा परीक्षा दे सकते हैं।</p>");
    } else {
      h += "<p>आपका पहले का अंक <b>" + d.best.pct + "%</b> " + (d.best.pct === d.pct ? "इससे बराबर है, इसलिए वही दर्ज रहेगा।" : "इससे ज़्यादा है, इसलिए वही दर्ज रहेगा।") + "</p>" +   /* (पैनल-2) पूरे वाक्य: भाषा-इंजन एक साथ बदले */
        "<p>इस परीक्षा का 5 हिस्सों वाला ब्योरा सिर्फ़ अभी दिख रहा है। यह पन्ना बंद करने के बाद वह दोबारा नहीं दिखेगा।</p>";
    }
    h += '<div class="xm-nav"><button class="xm-btn blue" id="xmDone" type="button">ठीक है, बंद करें</button></div></div>';
    frame(topBar(d.name || "कोर्स-परीक्षा"), h); wireClose(); $("xmDone").onclick = close; S = null;
  }

  window.ACS_EXAM = {
    version: "1.5",
    open: function (cfg) {
      if (!cfg || !cfg.cid || typeof cfg.call !== "function") return;
      C = cfg; changed = false; busy = false; APP = appInfo(); AK = ""; box(); webWarnInit();
      var st = appState();
      if (faceApp() && st && st.sid && st.akey) { FACE.sid = st.sid; FACE.ak = st.akey; try { window.ACSApp.facePending(); } catch (e) {} }   /* (v1.4) पहुँचने से रह गई फ़ोटो */
      if (st && st.pending) { appAbort(st.pending); return; }   /* ऐप पिछली बार परीक्षा के बीच बंद हुआ था: वह परीक्षा पहले बंद होती है */
      gate();
    }
  };
})();
