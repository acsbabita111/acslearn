/* /assets/rules-gate.js : v1.3 (16-Nov-2026)
   v1.3 (कन्नड़ क-1 v1.2, Founder के आदेश 16-Nov-2026): (1) पैनल (login, dashboard) हिंदी और English के अलावा किसी भाषा में हो, तो परदा
     उसी भाषा में (GATE_HI के वाक्य पैनल के पैक से; कोई वाक्य पैक में न मिले, तो पूरा परदा English में): हिंदी कहीं नहीं।
     नियम-पत्र की कड़ी: उस भाषा का पत्र हो तो वही, वरना English पत्र (दोनों में वही संस्करण-जाँच)।
     (2) हर ग़ैर-हिंदी परदे पर साफ़ लिखा है कि क़ानूनन हिंदी नियम-पत्र ही मान्य है, और हिंदी नियम-पत्र की कड़ी है।
     हिंदी परदा और करियर टेस्ट के पन्नों (जहाँ पैनल का भाषा-इंजन नहीं) का बर्ताव वही।
   v1.2 (पैनल-1, ChatGPT-ऑडिट सुधार): English परदे की कड़ी English नियम-पत्र (/en/rules-consent-learner.html) पर।
     पर सिर्फ़ तब, जब उस फ़ाइल का संस्करण वही हो जिस पर सहमति माँगी जा रही है ("<b>Version: X</b>")।
     फ़ाइल न मिले या संस्करण पुराना हो, तो कड़ी हिंदी मूल पर, साथ में साफ़ सूचना। हिंदी परदा पहले जैसा।
     सहमति के साथ language भी भेजी जाती है (जिस भाषा का नियम-पत्र खोला गया); server इसे पैनल-4 से दर्ज करेगा।
   v1.1 (पैनल-1): पैनल की भाषा English हो, तो परदा सिर्फ़ English में (हिंदी पंक्तियाँ नहीं)।
   भाषा का पता: पैनल-इंजन (ACS_PANEL_I18N) → पन्ने का html lang → dashboard में चुनी भाषा (acs_dash_lang)।
   बाक़ी हर भाषा में पहले जैसा: हिंदी और नीचे English। परदा data-i18n-skip है: अनुवाद-इंजन इसे नहीं छूता।
   खेप 4, भाग 2 (v1.1) : नियम-पत्र बदलने पर दोबारा सहमति का परदा (Founder का फ़ैसला 2-ब)।
   एक ही परदा तीन जगह से बुलाया जाता है: login का पन्ना, dashboard, और करियर टेस्ट का पन्ना।

   काम:
     1. server (rulesStatus) से पूछता है कि इस खाते से दोबारा सहमति चाहिए या नहीं।
     2. चाहिए हो, तो पूरा परदा ढक देता है: नया नियम-पत्र पढ़ने की कड़ी, सहमति का निशान, "आगे बढ़ें" और "Logout"।
        निशान लगाए बिना "आगे बढ़ें" नहीं चलता। सहमति server (rulesAccept) पर दर्ज होती है।
     3. server से जवाब न मिले, तो भी परदा लगता है: "दोबारा कोशिश करें" और "Logout" के साथ (बिना जाँच आगे नहीं)।
   परदा हटा देने से कुछ नहीं मिलता: सेवाएँ server पर भी इसी जाँच से रुकी हैं (rules_server.js का requireCurrent)।

   बुलाना: rulesGate({ functions, httpsCallable, logout }) : Promise; सहमति हो जाने या ज़रूरत न होने पर पूरा होता है।
   पाठ हिंदी में है और नीचे English में, ताकि हर भाषा के पन्ने पर समझ आए। */
/* (v1.3) परदे के वाक्य, हिंदी में: पैनल का भाषा-इंजन इन्हें चुनी भाषा में बदलता है (build_panel_i18n.js की पहुँच-जाँच इस तालिका को पढ़ती है) */
var GATE_HI = {
  h: "📜 नियम-पत्र बदल गया है",
  p1: "विद्यार्थी के नियम-पत्र का नया संस्करण लागू है:",
  p2: "फ़ीस और वापसी वाला भाग (नियम 6 और 7) बदला है।",
  rd: "नियम-पत्र पढ़ें ↗",
  rdEn: "नियम-पत्र पढ़ें (English में) ↗",
  legal: "क़ानूनी रूप से हिंदी नियम-पत्र ही मान्य है।",
  hiLink: "हिंदी नियम-पत्र खोलें ↗",
  agree: "मैंने नियम-पत्र का यह संस्करण पढ़ लिया है और मैं इससे सहमत हूँ।",
  go: "आगे बढ़ें",
  err: "सहमति दर्ज नहीं हो पाई। इंटरनेट देखकर दोबारा दबाएँ।",
  fh: "📜 नियम-पत्र की स्थिति नहीं जाँची जा सकी",
  fp: "इंटरनेट देखकर दोबारा कोशिश करें।",
  retry: "दोबारा कोशिश करें"
};
/* पैनल की भाषा हिंदी और English के अलावा हो, तो उस भाषा के वाक्य; एक भी वाक्य पैक में न मिले (देवनागरी बचे), तो null (तब English परदा) */
function gateOwn() {
  try {
    var I = window.ACS_PANEL_I18N; if (!I || !I.active || !I.lang || !I.tr) return null;
    var l = I.lang(); if (l === "hi" || l === "en") return null;
    var o = { lang: l }, k, t;
    for (k in GATE_HI) { t = I.tr(GATE_HI[k]); if (/[\u0900-\u097F]/.test(t)) return null; o[k] = t; }
    return o;
  } catch (e) { return null; }
}
function gateLang() {
  try { var I = window.ACS_PANEL_I18N; if (I && I.lang) return I.lang() === "hi" ? "hi" : "en"; } catch (e) {}   /* (v1.3) पैनल की हर ग़ैर-हिंदी भाषा: हिंदी वाला परदा नहीं */
  var dl = String(document.documentElement.getAttribute("lang") || "").toLowerCase();
  if (dl.indexOf("en") === 0) return "en";
  try { if (/\/dashboard\//.test(location.pathname) && localStorage.getItem("acs_dash_lang") && localStorage.getItem("acs_dash_lang") !== "hi") return "en"; } catch (e) {}
  return "hi";
}
export function rulesGate(o) {
  return new Promise(function (resolve) {
    var status = o.httpsCallable(o.functions, "rulesStatus"), accept = o.httpsCallable(o.functions, "rulesAccept");
    var ov = document.getElementById("rulesGate");
    var EO = gateLang() === "en";
    var KO = EO ? gateOwn() : null;   /* (v1.3) पैनल की अपनी भाषा के वाक्य (हिंदी और English के अलावा) */
    var HIL = 'href="/rules-consent-learner.html" target="_blank" rel="noopener" style="color:#1565C0;font-weight:700"';   /* हिंदी नियम-पत्र (क़ानूनी मूल) की कड़ी */
    function T(hi, en) { return EO ? en : hi; }
    function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
    function show(inner) {
      if (!ov) {
        ov = document.createElement("div"); ov.id = "rulesGate"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true"); ov.setAttribute("data-i18n-skip", "1");
        ov.style.cssText = "position:fixed;inset:0;z-index:2147483000;background:rgba(11,31,58,.96);display:flex;align-items:flex-start;justify-content:center;padding:16px;overflow:auto";
        document.body.appendChild(ov);
      }
      ov.innerHTML = '<div style="background:#fff;color:#0B1F3A;border-radius:14px;max-width:560px;width:100%;padding:20px;margin:24px 0;font-size:18px;line-height:1.7;font-family:inherit">' + inner + "</div>";
      var out = document.getElementById("rulesGateOut"); if (out) out.onclick = function () { if (o.logout) o.logout(); };
    }
    function done() { if (ov) { ov.remove(); ov = null; } resolve(true); }
    var BTN = "font-size:20px;padding:12px 18px;margin:8px 8px 0 0;border-radius:10px;border:2px solid #0B1F3A;cursor:pointer;";
    var OUT = '<button id="rulesGateOut" type="button" style="' + BTN + 'background:#fff;color:#0B1F3A;font-size:18px">Logout</button>';
    var EN = "color:#4a5a70;font-size:16px;margin:0 0 10px";
    function ask() {
      status({}).then(function (r) {
        var st = (r && r.data) || {};
        if (!st.applies || !st.need) { done(); return; }
        if (KO) show('<h2 style="font-size:22px;margin:0 0 8px">' + esc(KO.h) + '</h2>' +
          '<p style="margin:0 0 10px">' + esc(KO.p1) + ' <b id="rulesGateVer">' + esc(st.current) + "</b>. " + esc(KO.p2) + "</p>" +
          '<p style="margin:0 0 10px"><a id="rulesGateLink" href="/en/rules-consent-learner.html" target="_blank" rel="noopener" style="color:#1565C0;font-weight:800">' + esc(KO.rdEn) + '</a><br><span id="rulesGateNote" style="' + EN + '">' + esc(KO.legal) + ' <a id="rulesGateHi" ' + HIL + ">" + esc(KO.hiLink) + "</a></span></p>" +
          '<label style="display:flex;gap:10px;align-items:flex-start;margin:12px 0 6px"><input type="checkbox" id="rulesGateChk" style="width:24px;height:24px;flex:none;margin-top:5px">' +
          "<span>" + esc(KO.agree) + "</span></label>" +
          '<div id="rulesGateMsg" style="color:#B71C1C;font-size:16px;min-height:24px"></div>' +
          '<button id="rulesGateOk" type="button" disabled style="' + BTN + 'background:#2E7D32;color:#fff;opacity:.5">' + esc(KO.go) + "</button>" + OUT);
        else if (EO) show('<h2 style="font-size:22px;margin:0 0 8px">📜 The rules letter has changed</h2>' +
          '<p style="margin:0 0 10px">A new version of the learner rules letter is in force: <b id="rulesGateVer">' + esc(st.current) + "</b>. The part on fees and refunds (rules 6 and 7) has changed.</p>" +
          '<p style="margin:0 0 10px"><a id="rulesGateLink" href="/en/rules-consent-learner.html" target="_blank" rel="noopener" style="color:#1565C0;font-weight:800">Read the English version of the rules letter ↗</a><br><span id="rulesGateNote" style="' + EN + '">Only the Hindi rules letter is legally valid. <a id="rulesGateHi" ' + HIL + '>Open the Hindi rules letter ↗</a></span></p>' +
          '<label style="display:flex;gap:10px;align-items:flex-start;margin:12px 0 6px"><input type="checkbox" id="rulesGateChk" style="width:24px;height:24px;flex:none;margin-top:5px">' +
          "<span>I have read this version of the rules letter and I agree to it.</span></label>" +
          '<div id="rulesGateMsg" style="color:#B71C1C;font-size:16px;min-height:24px"></div>' +
          '<button id="rulesGateOk" type="button" disabled style="' + BTN + 'background:#2E7D32;color:#fff;opacity:.5">Continue</button>' + OUT);
        else show('<h2 style="font-size:22px;margin:0 0 4px">📜 नियम-पत्र बदल गया है</h2>' +
          '<p style="' + EN + '">The rules letter has changed.</p>' +
          '<p style="margin:0">विद्यार्थी के नियम-पत्र का नया संस्करण लागू है: <b id="rulesGateVer">' + esc(st.current) + "</b>। फ़ीस और वापसी वाला भाग (नियम 6 और 7) बदला है।</p>" +
          '<p style="' + EN + '">A new version of the learner rules letter is in force. The part on fees and refunds (rules 6 and 7) has changed.</p>' +
          '<p style="margin:0 0 10px"><a id="rulesGateLink" href="/rules-consent-learner.html" target="_blank" rel="noopener" style="color:#1565C0;font-weight:800">नया नियम-पत्र पढ़ें ↗ (Read the new rules letter)</a></p>' +
          '<label style="display:flex;gap:10px;align-items:flex-start;margin:12px 0 6px"><input type="checkbox" id="rulesGateChk" style="width:24px;height:24px;flex:none;margin-top:5px">' +
          "<span>मैंने नियम-पत्र का यह संस्करण पढ़ लिया है और मैं इससे सहमत हूँ।<br><span style=\"color:#4a5a70;font-size:16px\">I have read this version of the rules letter and I agree to it.</span></span></label>" +
          '<div id="rulesGateMsg" style="color:#B71C1C;font-size:16px;min-height:24px"></div>' +
          '<button id="rulesGateOk" type="button" disabled style="' + BTN + 'background:#2E7D32;color:#fff;opacity:.5">आगे बढ़ें (Continue)</button>' + OUT);
        var chk = document.getElementById("rulesGateChk"), okb = document.getElementById("rulesGateOk"), msg = document.getElementById("rulesGateMsg");
        var readLang = EO ? "en" : "hi";
        if (EO) {
          /* English नियम-पत्र तभी, जब वह मिले और उसका संस्करण यही हो; वरना हिंदी मूल (बिना internet के कड़ी जैसी है वैसी रहती है) */
          var toHindi = function () {
            var a = document.getElementById("rulesGateLink"), n = document.getElementById("rulesGateNote"); if (!a) return;
            a.href = "/rules-consent-learner.html"; a.textContent = "Read the rules letter (in Hindi) ↗";
            if (n) n.textContent = "The English version of this rules letter is not ready yet. The Hindi text is the legal original.";
            readLang = "hi";
          };
          var fresh = function (path) {   /* वह पत्र मौजूद है और उसका संस्करण यही है? */
            return fetch(path + "?v=" + Date.now(), { cache: "no-store" }).then(function (r) {
              if (!r.ok) return false;
              return r.text().then(function (h) { return h.indexOf("<b>Version: " + st.current + "</b>") > -1; });
            });
          };
          try {
            if (KO) {
              /* (v1.3) पहले पैनल की भाषा का अपना पत्र; वह न हो या बासी हो, तो English पत्र; वह भी नहीं, तो हिंदी मूल की साफ़ सूचना */
              fresh("/" + KO.lang + "/rules-consent-learner.html").then(function (ok) {
                var a = document.getElementById("rulesGateLink"); if (!a) return;
                if (ok) { a.href = "/" + KO.lang + "/rules-consent-learner.html"; a.textContent = KO.rd; readLang = KO.lang; return; }
                return fresh("/en/rules-consent-learner.html").then(function (ok2) { if (!ok2) toHindi(); });
              }, function () {});
            } else fresh("/en/rules-consent-learner.html").then(function (ok) { if (!ok) toHindi(); }, function () {});
          } catch (e) {}
        }
        chk.onchange = function () { okb.disabled = !chk.checked; okb.style.opacity = chk.checked ? "1" : ".5"; };
        okb.onclick = function () {
          if (!chk.checked) return;
          okb.disabled = true; msg.textContent = "⏳";
          accept({ version: st.current, language: readLang }).then(done, function () {
            msg.textContent = KO ? KO.err : T("सहमति दर्ज नहीं हो पाई। इंटरनेट देखकर दोबारा दबाएँ। (Could not record your consent. Check the internet and press again.)", "Could not record your consent. Check the internet and press again."); okb.disabled = false;
          });
        };
      }, function () {
        if (KO) show('<h2 style="font-size:22px;margin:0 0 8px">' + esc(KO.fh) + '</h2>' +
          '<p style="margin:0 0 6px">' + esc(KO.fp) + '</p>' +
          '<button id="rulesGateRetry" type="button" style="' + BTN + 'background:#1565C0;color:#fff">' + esc(KO.retry) + '</button>' + OUT);
        else if (EO) show('<h2 style="font-size:22px;margin:0 0 8px">📜 The rules letter status could not be checked</h2>' +
          '<p style="margin:0 0 6px">Check the internet and try again.</p>' +
          '<button id="rulesGateRetry" type="button" style="' + BTN + 'background:#1565C0;color:#fff">Try again</button>' + OUT);
        else show('<h2 style="font-size:22px;margin:0 0 4px">📜 नियम-पत्र की स्थिति नहीं जाँची जा सकी</h2>' +
          '<p style="' + EN + '">The rules letter status could not be checked.</p>' +
          '<p style="margin:0 0 6px">इंटरनेट देखकर दोबारा कोशिश करें। (Check the internet and try again.)</p>' +
          '<button id="rulesGateRetry" type="button" style="' + BTN + 'background:#1565C0;color:#fff">दोबारा कोशिश करें (Try again)</button>' + OUT);
        document.getElementById("rulesGateRetry").onclick = function () { ask(); };
      });
    }
    ask();
  });
}
