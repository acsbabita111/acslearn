/* lipi.js v1.0 · 14-Sep-2026 — लिपि-परिचय: 🔊 अक्षर/शब्द का नाम सुनो (browser TTS, भाषा window.LIPI_TTS) · device-local, server शून्य · ES5 */
(function () {
  var lang = window.LIPI_TTS || "en-IN";
  function say(txt) {
    if (!("speechSynthesis" in window)) { alert("इस फ़ोन में आवाज़ नहीं है — अक्षर का नाम देवनागरी में पढ़ लो।"); return; }
    try { window.speechSynthesis.cancel(); var u = new SpeechSynthesisUtterance(txt); u.lang = lang; u.rate = 0.8;
      var vs = window.speechSynthesis.getVoices(); var v = null;
      for (var i = 0; i < vs.length; i++) { if (vs[i].lang && vs[i].lang.replace("_", "-").toLowerCase() === lang.toLowerCase()) { v = vs[i]; break; } }
      if (!v) for (var j = 0; j < vs.length; j++) { if (vs[j].lang && vs[j].lang.slice(0, 2).toLowerCase() === lang.slice(0, 2).toLowerCase()) { v = vs[j]; break; } }
      if (v) u.voice = v; window.speechSynthesis.speak(u); } catch (e) {}
  }
  window.lipiSay = function (el) { var t = el && el.getAttribute("data-say"); if (t) say(t); };
})();
