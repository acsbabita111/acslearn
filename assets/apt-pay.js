/* /assets/apt-pay.js : v2.5 (14-Nov-2026; खेप 3-ख भाग 1: reportNumber जुड़ा, बाक़ी सब v2.4 जैसा) · v2.4 (13-Nov-2026)
   Founder के 13-Nov-2026 के नियम: द्वार अब server (aptGate) तय करता है; खंड के प्रश्न aptStart और aptNext से आते हैं;
   परीक्षा पूरी होने की सूचना aptFinish से जाती है। बिना ₹125 के नतीजा server पर नहीं भेजा जाता
   (पुराने saveAptitudeResult और latestAptitudeResult के रास्ते हटाए गए)। login होने पर मुफ़्त झलक छिप जाती है। */
/* ============================================================
   /assets/apt-pay.js — v1.2 (12-Nov-2026: भाषा-परत — संदेश L(…) में; हिंदी का व्यवहार वही)
     v1.1 (₹100/चांस भुगतान-द्वार + नतीजा-server-save)
   v1.1 · 30-Jul-2026 (होल-1, Founder-override v4.0-ख1): saveResult —
   final-submit पर नतीजे का सार खाते में (saveAptitudeResult, मुफ़्त);
   latestResult — नए फ़ोन पर खाते से पिछला नतीजा (latestAptitudeResult)।
   v1.0 · 22-Jul-2026 · मूल भाषा: हिंदी · Founder-निर्णय की अमल-परत
   ------------------------------------------------------------
   नियम:
   - badge-निशान (acs_apt_gate_v1) पहले से सक्रिय हो तो यह स्क्रिप्ट कुछ
     नहीं करती — apt-session.js ख़ुद 'badge' मोड से सीधे खुल चुका होता है।
   - बिना-badge: login ज़रूरी। login वाले का ₹100/चांस-status जाँचो
     (Cloud Function checkAptitudeAttempt) — unused+paid मिले तो सीधे
     unlock('attempt'); न मिले तो buy-card + बटन दिखाओ (apt-session.js से)।
   - ख़रीद-प्रवाह: createAptitudeAttemptOrder → Razorpay checkout →
     verifyAptitudeAttemptPayment → दोबारा-जाँच → unlock('attempt')।
   - रक़म कभी client तय नहीं करता — server (functions/index.js) से आती है।
   - Final-Submit पर apt-session.js ख़ुद window.ACS_APT_PAY.consume() बुलाता
     है (सिर्फ़ attempt-मोड में) — यहीं exposed।
   - गूँगा-fallback निषेध (v2.3): यह स्क्रिप्ट न लोड हो पाए तो apt-session.js
     का अपना 2.5s fallback-timer buy-card दिखा ही देगा — अटका हुआ नहीं रहेगा।
   ============================================================ */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-functions.js";

/* v1.2 भाषा-परत (12-Nov-2026): संदेश L(…) में। हिंदी पन्ने पर L() वही लौटाता है (व्यवहार वही)।
   दूसरी भाषा के पन्ने पर window.APT_SX[भाषा] से (/assets/apt_session_<भाषा>.js; apt-session.js वाली ही तालिका)।
   ध्यान: server (Cloud Functions) से आया त्रुटि-संदेश जैसा आता है वैसा दिखता है; उसका अनुवाद server-दौर का काम है। */
const APT_PAY_LANG = (typeof window.APT_LANG === "string" && window.APT_LANG) ? window.APT_LANG : "hi";
const APT_PAY_SX = (APT_PAY_LANG !== "hi" && window.APT_SX && window.APT_SX[APT_PAY_LANG]) || null;
function L(s) { return (APT_PAY_SX && Object.prototype.hasOwnProperty.call(APT_PAY_SX, s)) ? APT_PAY_SX[s] : s; }

(function () {
  "use strict";

  var app = initializeApp({
    apiKey: "AIzaSyCpn4m76f-hIFgiWKoWAPYgD8lBmJaO-PM",
    authDomain: "acslearn-platform.firebaseapp.com",
    projectId: "acslearn-platform",
    storageBucket: "acslearn-platform.firebasestorage.app",
    messagingSenderId: "435395814481",
    appId: "1:435395814481:web:655f99452a90f8efbc4470"
  });
  var auth = getAuth(app);
  var functions = getFunctions(app, "us-central1");

  function loadRazorpay() {
    return new Promise(function (res, rej) {
      if (window.Razorpay) { res(); return; }
      var s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = function () { res(); };
      s.onerror = function () { rej(new Error(L("भुगतान-पृष्ठ नहीं खुला — network जाँचें"))); };
      document.body.appendChild(s);
    });
  }

  function setMsg(txt, cls) {
    var m = document.getElementById("apt-buy-msg");
    if (m) { m.textContent = txt; m.className = cls || ""; }
  }

  /* server के जवाब की ग़लती को सादे रूप में बदलना */
  function callErr(e) {
    var d = (e && e.details) || {};
    return { message: (e && e.message) || String(e), code: d.code || "", waitSec: d.waitSec, sid: d.sid, exp: d.exp, quota: d.quota };
  }
  function call(name, data, cb) {
    httpsCallable(functions, name)(data || {}).then(function (res) { cb(null, (res && res.data) || {}); })
      .catch(function (e) { cb(callErr(e)); });
  }
  /* login होने पर मुफ़्त झलक नहीं दिखती (झलक बिना रजिस्ट्रेशन वालों के लिए है) */
  function previewHide(on) {
    try { if (on) localStorage.setItem("acs_apt_li", "1"); else localStorage.removeItem("acs_apt_li"); } catch (e) {}
    if (window.ACS_APT_PREVIEW) { if (on) window.ACS_APT_PREVIEW.hide(); else window.ACS_APT_PREVIEW.show(); }
  }

  /* द्वार: server से पूछकर इंजन को बताना कि क्या दिखाना है */
  var checking = false;
  function gate(afterPay) {
    if (checking) return;
    var SESS = window.ACS_APT_SESSION || {};
    if (!auth.currentUser) { if (SESS.showBuy) { SESS.showBuy(); wireBuyButton(); } return; }
    checking = true;
    call("aptGate", {}, function (err, r) {
      checking = false;
      if (err) { if (SESS.showError) SESS.showError(err); return; }
      if (!r.loggedIn) { if (SESS.showBuy) { SESS.showBuy(); wireBuyButton(); } return; }
      var loc = SESS.localSid ? SESS.localSid() : null;
      if (loc && (!r.openSid || r.openSid === loc)) { if (SESS.unlock) SESS.unlock("resume", r); return; }
      if (r.openSid) { if (SESS.showOpen) SESS.showOpen({ sid: r.openSid, exp: r.openExp }); return; }
      if (r.quota && !r.quota.canStart) { if (SESS.showLimit) SESS.showLimit(r.quota); return; }
      if (r.mode) { if (SESS.unlock) SESS.unlock(r.mode, r); return; }
      if (SESS.showBuy) {
        SESS.showBuy(); wireBuyButton();
        if (afterPay) setMsg(L("भुगतान हुआ पर चांस नहीं दिखा — पन्ना दोबारा खोलें।"), "msg err");
      }
    });
  }
  function refreshStatus(afterPay) { gate(afterPay); }

  var buying = false;
  function buyAttempt() {
    if (buying) return;
    var u = auth.currentUser;
    if (!u) {
      setMsg(L("पहले लॉगिन करें — नीचे 'Login / Dashboard' दबाएँ।"), "msg err");
      return;
    }
    buying = true;
    setMsg(L("शुल्क तैयार किया जा रहा है…"), "msg");
    httpsCallable(functions, "createAptitudeAttemptOrder")({}).then(function (res) {
      var o = (res && res.data) || {};
      if (!o.ok || !o.orderId) throw new Error(L("order नहीं बना"));
      return loadRazorpay().then(function () {
        return new Promise(function (resolve, reject) {
          setMsg(L("भुगतान-पृष्ठ खुल रहा है…"), "msg");
          var rzp = new window.Razorpay({
            key: o.keyId, order_id: o.orderId, amount: o.amount, currency: o.currency || "INR",
            name: o.name || "Applied Computer School",
            description: L("अभिरुचि-टेस्ट — 1 पूरा चांस (₹100)"),
            prefill: { email: (auth.currentUser && auth.currentUser.email) || "" },
            theme: { color: "#0B1F3A" },
            handler: function (r) { resolve(r); },
            modal: { ondismiss: function () { reject(new Error(L("भुगतान रद्द किया गया।"))); } }
          });
          rzp.open();
        });
      });
    }).then(function (r) {
      if (!r) return;
      setMsg(L("भुगतान की पुष्टि हो रही है…"), "msg");
      return httpsCallable(functions, "verifyAptitudeAttemptPayment")({
        razorpay_order_id: r.razorpay_order_id,
        razorpay_payment_id: r.razorpay_payment_id,
        razorpay_signature: r.razorpay_signature
      });
    }).then(function (v) {
      buying = false;
      if (v) { setMsg(L("✅ भुगतान सफल — टेस्ट खुल रहा है…"), "msg ok"); refreshStatus(true); }
    }).catch(function (e) {
      buying = false;
      setMsg(L("नहीं हो पाया: ") + (e && e.message ? e.message : e), "msg err");
    });
  }

  function wireBuyButton() {
    var b = document.getElementById("apt-buy-attempt-btn");
    if (b) b.onclick = buyAttempt;
  }

  /* ---- ₹125 में रिपोर्ट सेव (नतीजा तभी server पर जाता है) ---- */
  var savingReport = false, PEND = "acs_apt_rep_pend_v2";
  /* v2.3: रिपोर्ट का पाठ भुगतान पक्का होने के बाद ही server को जाता है, order बनाते समय नहीं।
     इसलिए भुगतान और सेव के बीच पाठ इसी फ़ोन में रखा जाता है (एक सूची में; हर order का अपना खाना: o, t, u, at, और भुगतान हो चुका हो तो p व s)।
     नियम (v2.4): कोई खाना अपने-आप सिर्फ़ एक ही हालत में मिटता है: जब server कह दे कि रिपोर्ट सेव हो गई (saved)।
     समय बीतने से, या server के "भुगतान नहीं हुआ" कहने से, कुछ नहीं मिटता: हो सकता है पैसा कट गया हो और पन्ना बीच में बंद हुआ हो।
     ऐसे में server ख़ुद Razorpay से पूछता है; पैसा आया हो तो रिपोर्ट अगली बार पन्ना खुलते ही सेव हो जाती है।
     जिस खाने में भुगतान का सबूत (p, s) है, वह हर बार पन्ना खुलने पर भेजा जाता है; बाक़ी पहले 3 बार तुरंत, फिर 6 घंटे में एक बार। */
  function pendAll() { try { var a = JSON.parse(localStorage.getItem(PEND) || "[]"); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function pendPut(list) { try { if (list.length) localStorage.setItem(PEND, JSON.stringify(list)); else localStorage.removeItem(PEND); } catch (e) {} }
  function pendUpsert(rec) { var l = pendAll().filter(function (x) { return x && x.o !== rec.o; }); l.push(rec); pendPut(l); }
  function pendDrop(o) { pendPut(pendAll().filter(function (x) { return x && x.o !== o; })); }
  function sendReport(p, cb) {
    httpsCallable(functions, "verifyAptitudeReportPayment")({
      razorpay_order_id: p.o, razorpay_payment_id: p.p || "", razorpay_signature: p.s || "", reportText: p.t
    }).then(function (res) {
      var d = (res && res.data) || {};
      if (d.ok && d.saved !== false) { pendDrop(p.o); cb(null); }
      else cb(new Error(L("भुगतान दर्ज हो गया है, पर रिपोर्ट अभी सेव नहीं हो पाई। पन्ना दोबारा खोलने पर यह अपने-आप सेव हो जाएगी।")));
    }).catch(function (e) { cb(e); });   /* यहाँ कुछ नहीं मिटाया जाता: फ़ोन का पाठ सिर्फ़ ऊपर, "saved" मिलने पर हटता है */
  }
  function due(p, now) {
    if (p.p && p.s) return true;
    return (p.n || 0) < 3 || now - (p.lt || 0) >= 6 * 3600000;
  }
  function retryPending() {
    var u = auth.currentUser, now = Date.now();
    if (!u || savingReport) return;
    pendAll().forEach(function (p) {
      if (!(p && p.o && p.t && p.u === u.uid) || !due(p, now)) return;
      if (!(p.p && p.s)) { p.n = (p.n || 0) + 1; p.lt = now; pendUpsert(p); }
      sendReport(p, function () {});
    });
  }
  try { window.addEventListener("online", retryPending); } catch (e) {}
  function saveReport(reportText, onDone) {
    if (savingReport) return;
    var u = auth.currentUser, made = false;
    if (!u) { onDone(new Error(L("पहले लॉगिन करें।"))); return; }
    savingReport = true;
    httpsCallable(functions, "createAptitudeReportOrder")({ v: 2 }).then(function (res) {
      var o = (res && res.data) || {};
      if (!o.ok || !o.orderId) throw new Error(L("order नहीं बना"));
      made = true;
      pendUpsert({ o: o.orderId, t: reportText, u: u.uid, at: Date.now() });
      return loadRazorpay().then(function () {
        return new Promise(function (resolve, reject) {
          var rzp = new window.Razorpay({
            key: o.keyId, order_id: o.orderId, amount: o.amount, currency: o.currency || "INR",
            name: o.name || "Applied Computer School",
            description: L("अभिरुचि-रिपोर्ट सेव (₹125)"),
            prefill: { email: (auth.currentUser && auth.currentUser.email) || "" },
            theme: { color: "#0B1F3A" },
            handler: function (r) { resolve(r); },
            modal: { ondismiss: function () { reject(new Error(L("भुगतान रद्द किया गया।"))); } }
          });
          rzp.open();
        });
      });
    }).then(function (r) {
      var p = pendAll().filter(function (x) { return x && x.o === r.razorpay_order_id; })[0] || { o: r.razorpay_order_id, t: reportText, u: u.uid, at: Date.now() };
      p.p = r.razorpay_payment_id; p.s = r.razorpay_signature; pendUpsert(p);
      return new Promise(function (resolve, reject) { sendReport(p, function (err) { if (err) reject(err); else resolve(); }); });
    }).then(function () {
      savingReport = false; onDone(null);
    }).catch(function (e) {
      savingReport = false;
      if (!made && e && /invalid-argument/.test(String(e.code || ""))) {   /* server अभी पुराने रूप में है */
        onDone(new Error(L("रिपोर्ट सेव करने की सुविधा कुछ ही देर में चालू होगी। थोड़ी देर बाद दोबारा दबाइए।"))); return;
      }
      onDone(e);
    });
  }


  /* dashboard "सलाह" पैनल के लिए — सबसे नई सेव-रिपोर्ट लाओ */
  function fetchLatestReport(cb) {
    var u = auth.currentUser;
    if (!u) { cb(null); return; }
    httpsCallable(functions, "latestAptitudeReport")({}).then(function (res) {
      var d = (res && res.data) || {};
      cb(d.found && d.reportText ? d : null);
    }).catch(function () { cb(null); });
  }

  window.ACS_APT_PAY = {
    gate: gate,
    start: function (a, cb) { call("aptStart", a, cb); },
    next: function (a, cb) { call("aptNext", a, cb); },
    finish: function (a, cb) { call("aptFinish", a, cb || function () {}); },
    wireBuy: wireBuyButton,
    saveReport: saveReport,
    fetchLatestReport: fetchLatestReport,
    /* (v2.5, खेप 3-ख भाग 1) सहेजी हुई रिपोर्ट का जाँच-नंबर और मान्य तिथि, server से */
    reportNumber: function (cb) {
      httpsCallable(functions, "reportNumber")({}).then(function (res) { cb(null, (res && res.data) || {}); }, function (e) { cb(e || new Error("fail")); });
    },
    whenLoggedIn: function (cb) {
      if (auth.currentUser) { cb(auth.currentUser); return; }
      onAuthStateChanged(auth, function (u) { if (u) cb(u); });
    }
  };

  /* login की हालत पता चलते ही: झलक छिपाना या दिखाना, और द्वार की जाँच */
  onAuthStateChanged(auth, function (user) {
    previewHide(!!user);
    if (user) { gate(false); retryPending(); }
    else if (window.ACS_APT_SESSION && window.ACS_APT_SESSION.showBuy) {
      window.ACS_APT_SESSION.showBuy();
      wireBuyButton();
    }
  });
})();
