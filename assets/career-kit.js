/* ACS career-kit.js — करियर-किट पेज का साझा तर्क (परत-1 असेट)।
   client-side, device-local (localStorage), शून्य-server, ES5 (Android-8)।
   सब functions ck-namespaced। फ़ोटो browser में ही छोटी होकर फ़ोन में रहती है —
   कहीं नहीं भेजी जाती (DPDP)। */
"use strict";
(function () {
  var RKEY = "acs_resume";
  var FIELDS = ["name", "phone", "email", "place", "obj", "skills", "edu", "cert", "exp", "lang", "hobby"];
  var ckPhoto = "";

  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function nl(s) { return esc(s).replace(/\n/g, "<br>"); }
  function block(t, v) { if (!v) return ""; return "<h3>" + esc(t) + "</h3><p>" + nl(v) + "</p>"; }
  function readForm() { var o = {}, i; for (i = 0; i < FIELDS.length; i++) { var el = $("ck_" + FIELDS[i]); o[FIELDS[i]] = el ? el.value : ""; } return o; }
  function collect() { var o = readForm(); o.photo = ckPhoto; return o; }

  function renderPhoto() {
    var box = $("ck-photo-prev"); if (!box) return;
    box.innerHTML = ckPhoto
      ? '<img src="' + ckPhoto + '" alt="फ़ोटो" class="ck-photo-img"><button type="button" class="ck-btn ghost" onclick="ckRemovePhoto()">फ़ोटो हटाएँ</button>'
      : "";
  }
  window.ckPickPhoto = function (inp) {
    try {
      var f = inp && inp.files && inp.files[0];
      if (!f) return;
      if (String(f.type).indexOf("image/") !== 0) { alert("कृपया कोई फ़ोटो (image) चुनें।"); return; }
      var fr = new FileReader();
      fr.onload = function (ev) {
        var img = new Image();
        img.onload = function () {
          var max = 320, w = img.width, h = img.height;
          if (w > h && w > max) { h = Math.round(h * max / w); w = max; }
          else if (h >= w && h > max) { w = Math.round(w * max / h); h = max; }
          try {
            var c = document.createElement("canvas"); c.width = w; c.height = h;
            c.getContext("2d").drawImage(img, 0, 0, w, h);
            ckPhoto = c.toDataURL("image/jpeg", 0.7);
          } catch (e) { ckPhoto = ev.target.result; }
          renderPhoto();
        };
        img.onerror = function () { alert("यह फ़ोटो नहीं खुली — दूसरी चुनें।"); };
        img.src = ev.target.result;
      };
      fr.readAsDataURL(f);
    } catch (e) {}
  };
  window.ckRemovePhoto = function () { ckPhoto = ""; renderPhoto(); var i = $("ck_photo"); if (i) i.value = ""; };

  window.ckShow = function (k) {
    var secs = ["resume", "prep", "mock"], i;
    for (i = 0; i < secs.length; i++) {
      var s = $("ck-sec-" + secs[i]); if (s) s.className = (secs[i] === k ? "" : "ck-hide");
      var t = $("ck-tab-" + secs[i]); if (t) t.className = (secs[i] === k ? "on" : "");
    }
    window.scrollTo(0, 0);
  };

  window.ckSave = function () {
    try { localStorage.setItem(RKEY, JSON.stringify(collect())); alert("आपका रिज़्यूमे इसी फ़ोन में सहेज लिया गया।"); }
    catch (e) { alert("सहेजा नहीं जा सका — फ़ोटो बहुत बड़ी हो सकती है, छोटी फ़ोटो चुनें।"); }
  };
  window.ckClear = function () {
    if (!confirm("भरी हुई जानकारी मिटा दें?")) return;
    var i; for (i = 0; i < FIELDS.length; i++) { var el = $("ck_" + FIELDS[i]); if (el) el.value = ""; }
    ckPhoto = ""; renderPhoto(); var pin = $("ck_photo"); if (pin) pin.value = "";
    try { localStorage.removeItem(RKEY); } catch (e) {}
  };
  function ckLoad() {
    try {
      var d = JSON.parse(localStorage.getItem(RKEY) || "{}"), i;
      for (i = 0; i < FIELDS.length; i++) { var el = $("ck_" + FIELDS[i]); if (el && d[FIELDS[i]]) el.value = d[FIELDS[i]]; }
      if (d.photo) { ckPhoto = d.photo; renderPhoto(); }
    } catch (e) {}
  }

  window.ckMake = function () {
    var d = collect();
    if (!d.name) { alert("कम-से-कम अपना नाम ज़रूर भरें।"); return; }
    try { localStorage.setItem(RKEY, JSON.stringify(d)); } catch (e) {}
    var contact = [];
    if (d.phone) contact.push("📞 " + esc(d.phone));
    if (d.email) contact.push("✉️ " + esc(d.email));
    if (d.place) contact.push("📍 " + esc(d.place));
    var photoTag = ckPhoto ? '<img src="' + ckPhoto + '" class="rphoto" alt="">' : "";
    var html = '<!DOCTYPE html><html lang="hi"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1"><title>रिज़्यूमे — ' + esc(d.name) + '</title><style>' +
      'body{font-family:\'Noto Sans Devanagari\',sans-serif;color:#0B1F3A;max-width:780px;margin:0 auto;padding:26px;font-size:16px;line-height:1.65}' +
      'h1{font-size:26px;margin:0 0 4px;border-bottom:3px solid #1565C0;padding-bottom:6px}' +
      '.c{font-size:16px;color:#334155;margin:0 0 14px}' +
      'h3{font-size:18px;color:#2E7D32;margin:16px 0 4px;border-bottom:1px solid #CBD5E1;padding-bottom:2px}' +
      'p{margin:4px 0}.rphoto{float:right;width:98px;height:auto;border:1px solid #CBD5E1;border-radius:6px;margin:0 0 8px 14px}' +
      '.pr{margin-top:22px;text-align:center;clear:both}' +
      '.pr button{font-size:18px;font-weight:800;padding:12px 20px;border:none;border-radius:10px;background:#1565C0;color:#fff;cursor:pointer}' +
      '@media print{.pr{display:none}}</style></head><body>' +
      photoTag +
      '<h1>' + esc(d.name) + '</h1>' +
      '<p class="c">' + contact.join(" &nbsp;·&nbsp; ") + '</p>' +
      block("उद्देश्य", d.obj) + block("हुनर / लूर", d.skills) + block("शिक्षा", d.edu) +
      block("प्रशिक्षण व प्रमाण पत्र", d.cert) + block("कार्य-अनुभव", d.exp) +
      block("भाषाएँ", d.lang) + block("रुचि", d.hobby) +
      '<div class="pr"><button onclick="window.print()">🖨️ प्रिंट करें / PDF सहेजें</button></div>' +
      '</body></html>';
    var w = window.open("", "_blank");
    if (!w) { alert("नई विंडो नहीं खुली — कृपया pop-up की अनुमति दें, फिर दोबारा दबाएँ।"); return; }
    w.document.open(); w.document.write(html); w.document.close();
  };

  var QB = {
    gen: ["अपने बारे में बताइए।", "आप यही काम क्यों करना चाहते हैं?", "आपकी सबसे बड़ी ताक़त क्या है?", "आपकी कोई कमज़ोरी बताइए।", "पाँच साल बाद ख़ुद को कहाँ देखते हैं?", "हमें आपको ही क्यों चुनना चाहिए?"],
    skill: ["अपने हुनर के बारे में बताइए।", "कोई मुश्किल काम जो आपने पूरा किया, बताइए।", "आप कौन-कौन से औज़ार या मशीन चला लेते हैं?", "आप काम में सुरक्षा-नियम कैसे मानते हैं?", "कोई ग़लती जिससे आपने कुछ सीखा?"],
    behav: ["टीम में मतभेद हो तो आप कैसे सुलझाते हैं?", "दबाव या जल्दी में आप कैसे काम करते हैं?", "अगर ग्राहक या मालिक नाराज़ हो जाए तो?", "कोई नई चीज़ आप कैसे सीखते हैं?", "समय पर काम पूरा न हो पा रहा हो तो क्या करेंगे?"]
  };
  var mTimer = null;
  function pick(cat) { var a = QB[cat] || QB.gen; return a[Math.floor(Math.random() * a.length)]; }
  window.ckNext = function () {
    var cat = $("ck_cat").value;
    $("ck-area").className = "";
    $("ck-q").textContent = pick(cat);
    var t = 60; $("ck-t").textContent = t;
    if (mTimer) clearInterval(mTimer);
    mTimer = setInterval(function () { t--; $("ck-t").textContent = t; if (t <= 0) clearInterval(mTimer); }, 1000);
  };
  window.ckSpeak = function () {
    try {
      var q = $("ck-q").textContent;
      if (!q || q === "—") { window.ckNext(); q = $("ck-q").textContent; }
      if (!("speechSynthesis" in window)) { alert("इस फ़ोन में आवाज़-सुविधा नहीं है।"); return; }
      var u = new SpeechSynthesisUtterance(q); u.lang = "hi-IN"; u.rate = 0.95;
      window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
    } catch (e) {}
  };
  window.addEventListener("pagehide", function () { try { window.speechSynthesis.cancel(); } catch (e) {} });

  if (document.getElementById("ck_name")) ckLoad();
})();
