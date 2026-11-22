/* ============================================================
   /assets/net-sudhar.js v1.0 (22-Nov-2026, खेप N-1) : नेटवर्क के फ़र्म-पन्ने पर "सुधार का सुझाव" फ़ॉर्म
   पन्ना: /network/firm/<id>.html और /en/network/firm/<id>.html (generator/build_network.js से)।
   सुझाव सीधे सूची नहीं बदलता: वह server के submitContactMessage से ACS के संदेश-बक्से में जाता है
   ("[NET-SUDHAR] <ID> · <कारण> · <पता>" से शुरू), फिर ACS की जाँच के बाद ही सूची बदलती है।
   server App Check token माँगता है और एक मोबाइल से रोज़ की सीमा गिनता है (functions/contact_server.js)।
   key का घर: /assets/appcheck-config.js । Firebase सिर्फ़ "भेजें" दबाने पर load होता है (हल्का पन्ना)।
   यह module है: पुराना browser इसे नहीं चलाता, तब फ़ॉर्म छिपा रहता है और WhatsApp-बटन काम करता है।
   ============================================================ */
const box = document.getElementById("nwFix");
if (box) {
  const $ = (id) => document.getElementById(id);
  const D = box.dataset, res = $("nwRes");
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => "&#" + c.charCodeAt(0) + ";");
  const show = (cls, txt) => { res.innerHTML = '<div class="' + cls + '">' + esc(txt) + "</div>"; };
  const AC_KEY = String(window.ACS_APPCHECK_SITE_KEY || "");
  let callP = null;
  function getCall() {
    if (callP) return callP;
    callP = Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.0/firebase-functions.js"),
      import("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-check.js")
    ]).then(([A, F, C]) => {
      const cfg = { apiKey: "AIzaSyCpn4m76f-hIFgiWKoWAPYgD8lBmJaO-PM", authDomain: "acslearn-platform.firebaseapp.com", projectId: "acslearn-platform",
        storageBucket: "acslearn-platform.firebasestorage.app", messagingSenderId: "435395814481", appId: "1:435395814481:web:655f99452a90f8efbc4470" };
      const app = A.getApps().length ? A.getApp() : A.initializeApp(cfg);
      C.initializeAppCheck(app, { provider: new C.ReCaptchaEnterpriseProvider(AC_KEY), isTokenAutoRefreshEnabled: true });
      return F.httpsCallable(F.getFunctions(app, "us-central1"), "submitContactMessage");
    });
    callP.catch(() => { callP = null; });
    return callP;
  }
  if (AC_KEY) box.hidden = false;   /* key न हो तो फ़ॉर्म छिपा रहे: WhatsApp-बटन ही रास्ता */
  let busy = false;
  $("nwSend").addEventListener("click", async () => {
    if (busy) return;
    const why = $("nwWhy"), whyTxt = why.value ? why.options[why.selectedIndex].text : "";
    const name = $("nwName").value.trim(), mob = $("nwMob").value.replace(/\D/g, ""), note = $("nwNote").value.trim();
    if (!why.value || !name || name.length > 80 || !/^[0-9]{10}$/.test(mob)) { show("bad", D.fill); return; }
    const message = ("[NET-SUDHAR] " + D.id + " · " + whyTxt + " · " + D.url + (note ? "\n" + note : "")).slice(0, 1000);
    busy = true; show("wait", D.wait);
    try {
      const call = await getCall();
      await call({ name, mobile: mob, message, lang: (document.documentElement.lang || "hi").slice(0, 3) });
      show("ok", D.ok);
      why.value = ""; $("nwNote").value = ""; $("nwName").value = ""; $("nwMob").value = "";
    } catch (e) {
      show("bad", String((e && e.code) || "").indexOf("resource-exhausted") > -1 ? D.limit : D.err);
    }
    busy = false;
  });
}
