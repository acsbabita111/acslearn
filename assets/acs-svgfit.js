/* acs-svgfit.js v1.0 (10-Nov-2026, खेप-4)
   काम: पेज के चित्र (SVG) के भीतर का कोई वाक्य चित्र के किनारे से बाहर कटे नहीं।
   कारण: अनुवाद की लंबाई भाषा-भाषा में अलग; SVG अपने किनारे पर पाठ काट देता है और पेज नहीं खिसकता,
         इसलिए यह दोष चुपचाप रहता था (es नतीजा-कार्ड 102px कटा, खेप-0 से live — 10-Nov की खोज)।
   तरीक़ा: असली फ़ोन पर, असली फ़ॉन्ट लगने के बाद, स्क्रीन पर नापो; जो वाक्य बाहर जाए उसका अक्षर-आकार
           4% क़दमों में घटाओ (न्यूनतम मूल का 55%)। चित्र का अनुपात स्थिर रहता है, इसलिए एक बार काफ़ी।
   सुरक्षा: सिर्फ़ <svg> के भीतर के <text>; छोटे चिह्न-SVG (<60px) अछूते; JS बंद हो तो पेज पहले जैसा। ES5। */
(function () {
  'use strict';
  function fitAll() {
    var svgs = document.querySelectorAll('svg');
    for (var i = 0; i < svgs.length; i++) {
      var S = svgs[i].getBoundingClientRect();
      if (!S.width || S.width < 60) continue;
      var ts = svgs[i].querySelectorAll('text');
      for (var j = 0; j < ts.length; j++) {
        var t = ts[j], R = t.getBoundingClientRect();
        if (!R.width) continue;
        var base = parseFloat(t.getAttribute('data-fs0'));
        if (!base) { base = parseFloat(window.getComputedStyle(t).fontSize) || 16; t.setAttribute('data-fs0', String(base)); }
        var fs = parseFloat(t.style.fontSize) || base, k = 0;
        while ((R.left < S.left - 1 || R.right > S.right + 1) && fs > base * 0.55 && k < 25) {
          fs = fs * 0.96; t.style.fontSize = fs.toFixed(2) + 'px'; R = t.getBoundingClientRect(); k++;
        }
      }
    }
  }
  function run() { try { fitAll(); } catch (e) { /* कुछ भी हो, पेज चलता रहे */ } }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  window.addEventListener('load', run);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(run);
})();
