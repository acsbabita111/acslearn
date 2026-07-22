/* ============================================================
   /assets/apt-pay.js — v1.0 (₹100/चांस भुगतान-द्वार · अभिरुचि-टेस्ट)
   22-Jul-2026 · मूल भाषा: हिंदी · Founder-निर्णय की अमल-परत
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

(function () {
  "use strict";

  function gateOK() {
    try {
      var g = JSON.parse(localStorage.getItem("acs_apt_gate_v1") || "null");
      return !!(g && g.until && Date.now() < g.until);
    } catch (e) { return false; }
  }
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
      s.onerror = function () { rej(new Error("भुगतान-पृष्ठ नहीं खुला — network जाँचें")); };
      document.body.appendChild(s);
    });
  }

  function setMsg(txt, cls) {
    var m = document.getElementById("apt-buy-msg");
    if (m) { m.textContent = txt; m.className = cls || ""; }
  }

  var checking = false;
  function refreshStatus(afterPay) {
    if (checking) return;
    checking = true;
    httpsCallable(functions, "checkAptitudeAttempt")({}).then(function (res) {
      checking = false;
      var d = (res && res.data) || {};
      if (d.available) {
        if (window.ACS_APT_SESSION && window.ACS_APT_SESSION.unlock) {
          window.ACS_APT_SESSION.unlock("attempt");
        }
      } else if (window.ACS_APT_SESSION && window.ACS_APT_SESSION.showBuy) {
        window.ACS_APT_SESSION.showBuy();
        wireBuyButton();
        if (afterPay) setMsg("भुगतान हुआ पर चांस नहीं दिखा — पन्ना दोबारा खोलें।", "msg err");
      }
    }).catch(function () {
      checking = false;
      if (window.ACS_APT_SESSION && window.ACS_APT_SESSION.showBuy) {
        window.ACS_APT_SESSION.showBuy();
        wireBuyButton();
      }
    });
  }

  var buying = false;
  function buyAttempt() {
    if (buying) return;
    var u = auth.currentUser;
    if (!u) {
      setMsg("पहले लॉगिन करें — नीचे 'Login / Dashboard' दबाएँ।", "msg err");
      return;
    }
    buying = true;
    setMsg("शुल्क तैयार किया जा रहा है…", "msg");
    httpsCallable(functions, "createAptitudeAttemptOrder")({}).then(function (res) {
      var o = (res && res.data) || {};
      if (!o.ok || !o.orderId) throw new Error("order नहीं बना");
      return loadRazorpay().then(function () {
        return new Promise(function (resolve, reject) {
          setMsg("भुगतान-पृष्ठ खुल रहा है…", "msg");
          var rzp = new window.Razorpay({
            key: o.keyId, order_id: o.orderId, amount: o.amount, currency: o.currency || "INR",
            name: o.name || "Applied Computer School",
            description: "अभिरुचि-टेस्ट — 1 पूरा चांस (₹100)",
            prefill: { email: (auth.currentUser && auth.currentUser.email) || "" },
            theme: { color: "#0B1F3A" },
            handler: function (r) { resolve(r); },
            modal: { ondismiss: function () { reject(new Error("भुगतान रद्द किया गया।")); } }
          });
          rzp.open();
        });
      });
    }).then(function (r) {
      if (!r) return;
      setMsg("भुगतान की पुष्टि हो रही है…", "msg");
      return httpsCallable(functions, "verifyAptitudeAttemptPayment")({
        razorpay_order_id: r.razorpay_order_id,
        razorpay_payment_id: r.razorpay_payment_id,
        razorpay_signature: r.razorpay_signature
      });
    }).then(function (v) {
      buying = false;
      if (v) { setMsg("✅ भुगतान सफल — टेस्ट खुल रहा है…", "msg ok"); refreshStatus(true); }
    }).catch(function (e) {
      buying = false;
      setMsg("नहीं हो पाया: " + (e && e.message ? e.message : e), "msg err");
    });
  }

  var wired = false;
  function wireBuyButton() {
    if (wired) return;
    var b = document.getElementById("apt-buy-attempt-btn");
    if (b) { wired = true; b.onclick = buyAttempt; }
  }

  /* ---------- ₹125 रिपोर्ट-सेव (badge-status से स्वतंत्र — हमेशा उपलब्ध) ----------
     apt-session.js का renderResult() इसे कॉल करता है; सफल होने पर Print/WhatsApp
     दिखाने का ज़िम्मा भी वहीं (apt-session.js) संभालता है — यह सिर्फ़ भुगतान करता है। */
  var savingReport = false;
  function saveReport(reportText, onDone) {
    if (savingReport) return;
    var u = auth.currentUser;
    if (!u) { onDone(new Error("पहले लॉगिन करें।")); return; }
    savingReport = true;
    httpsCallable(functions, "createAptitudeReportOrder")({ reportText: reportText }).then(function (res) {
      var o = (res && res.data) || {};
      if (!o.ok || !o.orderId) throw new Error("order नहीं बना");
      return loadRazorpay().then(function () {
        return new Promise(function (resolve, reject) {
          var rzp = new window.Razorpay({
            key: o.keyId, order_id: o.orderId, amount: o.amount, currency: o.currency || "INR",
            name: o.name || "Applied Computer School",
            description: "अभिरुचि-रिपोर्ट सेव (₹125)",
            prefill: { email: (auth.currentUser && auth.currentUser.email) || "" },
            theme: { color: "#0B1F3A" },
            handler: function (r) { resolve(r); },
            modal: { ondismiss: function () { reject(new Error("भुगतान रद्द किया गया।")); } }
          });
          rzp.open();
        });
      });
    }).then(function (r) {
      return httpsCallable(functions, "verifyAptitudeReportPayment")({
        razorpay_order_id: r.razorpay_order_id,
        razorpay_payment_id: r.razorpay_payment_id,
        razorpay_signature: r.razorpay_signature
      });
    }).then(function () {
      savingReport = false; onDone(null);
    }).catch(function (e) {
      savingReport = false; onDone(e);
    });
  }

  /* dashboard "सलाह" पैनल के लिए — सबसे नई सेव-रिपोर्ट लाओ */
  function fetchLatestReport(cb) {
    var u = auth.currentUser;
    if (!u) { cb(null); return; }
    httpsCallable(functions, "latestAptitudeReport")({}).then(function (res) {
      var d = (res && res.data) || {};
      cb(d.found ? d : null);
    }).catch(function () { cb(null); });
  }

  window.ACS_APT_PAY = {
    consume: function () {
      httpsCallable(functions, "consumeAptitudeAttempt")({}).catch(function (e) {
        /* चुपचाप — नतीजा already बन चुका है, यह सिर्फ़ हिसाब-बही अपडेट है */
        console && console.warn && console.warn("consumeAptitudeAttempt:", e && e.message);
      });
    },
    saveReport: saveReport,
    fetchLatestReport: fetchLatestReport,
    whenLoggedIn: function (cb) {
      if (auth.currentUser) { cb(auth.currentUser); return; }
      onAuthStateChanged(auth, function (u) { if (u) cb(u); });
    }
  };

  /* बैज पहले से सक्रिय हो तो ₹100/चांस-प्रवाह की ज़रूरत नहीं — सिर्फ़ वही हिस्सा रुके,
     साझा firebase-init व saveReport ऊपर हमेशा तैयार रहते हैं। */
  if (gateOK()) return;

  onAuthStateChanged(auth, function (user) {
    if (user) refreshStatus(false);
    else if (window.ACS_APT_SESSION && window.ACS_APT_SESSION.showBuy) {
      window.ACS_APT_SESSION.showBuy();
      wireBuyButton();
    }
  });
})();
