/* /assets/rules-gate.js : v1.0 (14-Nov-2026)
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
export function rulesGate(o) {
  return new Promise(function (resolve) {
    var status = o.httpsCallable(o.functions, "rulesStatus"), accept = o.httpsCallable(o.functions, "rulesAccept");
    var ov = document.getElementById("rulesGate");
    function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
    function show(inner) {
      if (!ov) {
        ov = document.createElement("div"); ov.id = "rulesGate"; ov.setAttribute("role", "dialog"); ov.setAttribute("aria-modal", "true");
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
        show('<h2 style="font-size:22px;margin:0 0 4px">📜 नियम-पत्र बदल गया है</h2>' +
          '<p style="' + EN + '">The rules letter has changed.</p>' +
          '<p style="margin:0">विद्यार्थी के नियम-पत्र का नया संस्करण लागू है: <b id="rulesGateVer">' + esc(st.current) + "</b>। फ़ीस और वापसी वाला भाग (नियम 6 और 7) बदला है।</p>" +
          '<p style="' + EN + '">A new version of the learner rules letter is in force. The part on fees and refunds (rules 6 and 7) has changed.</p>' +
          '<p style="margin:0 0 10px"><a id="rulesGateLink" href="/rules-consent-learner.html" target="_blank" rel="noopener" style="color:#1565C0;font-weight:800">नया नियम-पत्र पढ़ें ↗ (Read the new rules letter)</a></p>' +
          '<label style="display:flex;gap:10px;align-items:flex-start;margin:12px 0 6px"><input type="checkbox" id="rulesGateChk" style="width:24px;height:24px;flex:none;margin-top:5px">' +
          "<span>मैंने नियम-पत्र का यह संस्करण पढ़ लिया है और मैं इससे सहमत हूँ।<br><span style=\"color:#4a5a70;font-size:16px\">I have read this version of the rules letter and I agree to it.</span></span></label>" +
          '<div id="rulesGateMsg" style="color:#B71C1C;font-size:16px;min-height:24px"></div>' +
          '<button id="rulesGateOk" type="button" disabled style="' + BTN + 'background:#2E7D32;color:#fff;opacity:.5">आगे बढ़ें (Continue)</button>' + OUT);
        var chk = document.getElementById("rulesGateChk"), okb = document.getElementById("rulesGateOk"), msg = document.getElementById("rulesGateMsg");
        chk.onchange = function () { okb.disabled = !chk.checked; okb.style.opacity = chk.checked ? "1" : ".5"; };
        okb.onclick = function () {
          if (!chk.checked) return;
          okb.disabled = true; msg.textContent = "⏳";
          accept({ version: st.current }).then(done, function () {
            msg.textContent = "सहमति दर्ज नहीं हो पाई। इंटरनेट देखकर दोबारा दबाएँ। (Could not record your consent. Check the internet and press again.)"; okb.disabled = false;
          });
        };
      }, function () {
        show('<h2 style="font-size:22px;margin:0 0 4px">📜 नियम-पत्र की स्थिति नहीं जाँची जा सकी</h2>' +
          '<p style="' + EN + '">The rules letter status could not be checked.</p>' +
          '<p style="margin:0 0 6px">इंटरनेट देखकर दोबारा कोशिश करें। (Check the internet and try again.)</p>' +
          '<button id="rulesGateRetry" type="button" style="' + BTN + 'background:#1565C0;color:#fff">दोबारा कोशिश करें (Try again)</button>' + OUT);
        document.getElementById("rulesGateRetry").onclick = function () { ask(); };
      });
    }
    ask();
  });
}
