/* ACS EXAM app : speech for pages inside the app  v1.0 (batch E-2, 19-Nov-2026)
   Android's WebView has no speechSynthesis and no SpeechRecognition (the web speech API is switched off there).
   So inside the ACS EXAM app every "listen" and "speak" button of acslearn.com would be dead.
   This small file gives the page the same two objects, backed by the phone's own voice engine (TextToSpeech)
   and its own speech recogniser (SpeechRecognizer), through window.ACSApp. The page's code does not change.
   It runs only on acslearn.com, only inside the app, and only if the browser has no speech of its own.
   Old JavaScript (ES5) on purpose: it runs before the page's own scripts. */
(function () {
  "use strict";
  var W = window, A = W.ACSApp;
  if (W.__acsSpeechPoly || !A || typeof A.ttsSpeak !== "function") return;
  W.__acsSpeechPoly = 1;
  var seq = 0;
  function listeners(o) { o._l = o._l || {}; return o._l; }
  function on(o, t, f) { var L = listeners(o); (L[t] = L[t] || []).push(f); }
  function off(o, t, f) { var a = listeners(o)[t] || [], i = a.indexOf(f); if (i >= 0) a.splice(i, 1); }
  function fire(o, t, e) {
    e.type = t; e.target = o; e.currentTarget = o;
    try { if (typeof o["on" + t] === "function") o["on" + t](e); } catch (x) { setTimeout(function () { throw x; }, 0); }
    var a = (listeners(o)[t] || []).slice();
    for (var i = 0; i < a.length; i++) { try { a[i].call(o, e); } catch (x2) { setTimeout(function () { throw x2; }, 0); } }
  }
  function J(s) { try { return JSON.parse(s || "null"); } catch (x) { return null; } }

  /* ---------- speechSynthesis ---------- */
  if (!("speechSynthesis" in W)) {
    var live = {}, count = 0, voices = [];
    var Utt = function (text) {
      this.text = text === undefined || text === null ? "" : String(text);
      this.lang = ""; this.voice = null; this.rate = 1; this.pitch = 1; this.volume = 1;
      this.onstart = null; this.onend = null; this.onerror = null; this.onpause = null; this.onresume = null; this.onboundary = null; this.onmark = null;
    };
    Utt.prototype.addEventListener = function (t, f) { on(this, t, f); };
    Utt.prototype.removeEventListener = function (t, f) { off(this, t, f); };
    var synth = {
      speaking: false, pending: false, paused: false, onvoiceschanged: null,
      speak: function (u) {
        if (!u) return;
        var id = "u" + (++seq);
        live[id] = u; count++; synth.pending = true;
        var vn = u.voice && u.voice.name ? String(u.voice.name) : "";
        var lang = String(u.lang || (u.voice && u.voice.lang) || "");
        A.ttsSpeak(id, String(u.text || ""), lang, Number(u.rate) || 1, Number(u.pitch) || 1, vn);
      },
      cancel: function () { A.ttsStop(); },
      pause: function () {}, resume: function () {},
      getVoices: function () { return voices.slice(); },
      addEventListener: function (t, f) { on(synth, t, f); },
      removeEventListener: function (t, f) { off(synth, t, f); }
    };
    function setVoices(list) {
      voices = [];
      (list || []).forEach(function (v) { voices.push({ name: v.name, lang: v.lang, voiceURI: v.name, localService: !!v.local, "default": false }); });
    }
    W.__acsTts = function (id, kind, code) {
      var u = live[id]; if (!u) return;
      if (kind === "start") { synth.speaking = true; synth.pending = count > 1; fire(u, "start", { utterance: u, charIndex: 0, elapsedTime: 0, name: "" }); return; }
      delete live[id]; count = Math.max(0, count - 1); synth.speaking = count > 0; synth.pending = count > 1;
      if (kind === "error") fire(u, "error", { utterance: u, error: code || "synthesis-failed", charIndex: 0, elapsedTime: 0 });
      else fire(u, "end", { utterance: u, charIndex: 0, elapsedTime: 0, name: "" });
    };
    W.__acsVoices = function (json) { setVoices(J(json)); fire(synth, "voiceschanged", {}); };
    setVoices(J(A.ttsVoices && A.ttsVoices()));
    W.SpeechSynthesisUtterance = Utt;
    W.speechSynthesis = synth;
  }

  /* ---------- SpeechRecognition ---------- */
  if (!W.SpeechRecognition && !W.webkitSpeechRecognition && typeof A.srStart === "function") {
    var recs = {};
    var Rec = function () {
      this.lang = ""; this.continuous = false; this.interimResults = false; this.maxAlternatives = 1; this.grammars = null;
      this.onstart = null; this.onend = null; this.onerror = null; this.onresult = null; this.onnomatch = null;
      this.onaudiostart = null; this.onaudioend = null; this.onsoundstart = null; this.onsoundend = null; this.onspeechstart = null; this.onspeechend = null;
      this._id = null;
    };
    Rec.prototype.addEventListener = function (t, f) { on(this, t, f); };
    Rec.prototype.removeEventListener = function (t, f) { off(this, t, f); };
    Rec.prototype.start = function () {
      var id = "r" + (++seq); this._id = id; recs[id] = this;
      A.srStart(id, String(this.lang || document.documentElement.lang || ""), !!this.interimResults, Math.max(1, Number(this.maxAlternatives) || 1));
    };
    Rec.prototype.stop = function () { if (this._id) A.srStop(this._id); };
    Rec.prototype.abort = function () { if (this._id) A.srAbort(this._id); };
    W.__acsSr = function (id, kind, json) {
      var r = recs[id]; if (!r) return;
      var d = J(json) || {};
      if (kind === "start") { fire(r, "start", {}); fire(r, "audiostart", {}); return; }
      if (kind === "speech") { fire(r, "soundstart", {}); fire(r, "speechstart", {}); return; }
      if (kind === "result") {
        var alts = d.alts || [], conf = d.conf || [], list = [];
        for (var i = 0; i < alts.length; i++) list.push({ transcript: String(alts[i]), confidence: Number(conf[i]) || 0 });
        list.isFinal = !!d.fin; list.item = function (k) { return this[k]; };
        var res = [list]; res.item = function (k) { return this[k]; };
        fire(r, "result", { results: res, resultIndex: 0 });
        return;
      }
      if (kind === "error") { fire(r, "error", { error: d.error || "aborted", message: "" }); return; }
      if (kind === "end") { delete recs[id]; r._id = null; fire(r, "audioend", {}); fire(r, "end", {}); }
    };
    W.webkitSpeechRecognition = Rec;
    W.SpeechRecognition = Rec;
  }
})();
