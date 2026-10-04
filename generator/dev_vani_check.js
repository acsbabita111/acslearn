/* ═══════════════════════════════════════════════════════════════
   generator/dev_vani_check.js v1.1 — वाणी (assets/vani.js) का जाँच-यंत्र
   काम-acs-call-2 (04-Oct-2026) से जन्मा। चलाना:  node generator/dev_vani_check.js
   🏁 के बिना vani.js का कोई देय नहीं (v6.3-क3 🏁-द्वार नियम का वाणी-रूप)।
   भाग-1 static (फ़ाइल-पाठ): ICE_SERVERS एकमात्र-घर · TURN-प्रविष्टियाँ ·
     बासी "TURN अगला दौर" = 0 · v-talk2 ठीक 1 बार · पुराने रास्ते अछूते।
   भाग-2 runtime (नक़ली DOM+Firebase): boot चले · v-talk2 बने ·
     दोनों 🎙️ का handler एक ही function · click → साझा start() रास्ता चले।
   ═══════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs");
const path = require("path");
const FILE = path.join(__dirname, "..", "assets", "vani.js");
const src = fs.readFileSync(FILE, "utf8");
let fails = 0;
function chk(name, ok, extra){
  if(ok){ console.log("  ✅ " + name + (extra ? "  (" + extra + ")" : "")); }
  else  { console.log("  ❌ " + name + (extra ? "  (" + extra + ")" : "")); fails++; }
}
function count(hay, needle){ return hay.split(needle).length - 1; }

console.log("— भाग-1: static जाँचें —");

/* 1. ICE_SERVERS का एकमात्र घर */
chk("ICE_SERVERS घोषणा ठीक 1 बार", count(src, "const ICE_SERVERS=") === 1);

/* 2. newPc सिर्फ़ ICE_SERVERS से; पुराना inline-STUN newPc में नहीं */
chk("new RTC({iceServers:ICE_SERVERS}) ठीक 1 बार", count(src, "new RTC({iceServers:ICE_SERVERS})") === 1);
chk("पुराना inline iceServers (new RTC({iceServers:[) = 0", count(src, "new RTC({iceServers:[") === 0);

/* 3. ICE-सूची का असली ढाँचा — literal निकालकर eval से पार्स (मशीन-गिनती) */
const m = src.match(/const ICE_SERVERS=(\[[\s\S]*?\]);/);
let turnN = 0, credOk = false, stunOk = false;
if(m){
  const arr = eval(m[1]);
  for(const e of arr){
    const u = Array.isArray(e.urls) ? e.urls.join(" ") : String(e.urls);
    if(/^turn:/.test(u)){ turnN++; if(e.username && e.credential) credOk = true; else credOk = credOk && false; }
    if(/stun:/.test(u)) stunOk = true;
  }
  /* हर turn-प्रविष्टि पर username+credential अनिवार्य */
  credOk = arr.filter(e=>/^turn:/.test(String(e.urls))).every(e=>e.username && e.credential);
}
chk("ICE-सूची पार्स हुई", !!m);
chk("TURN-प्रविष्टियाँ ≥ 3 (80 · 443 · 443?tcp)", turnN >= 3, "मिलीं: " + turnN);
chk("हर TURN पर username+credential", credOk);
chk("STUN-रास्ता भी साथ (fallback)", stunOk);
chk("अपना metered-TURN (global.relay.metered.ca) ≥ 4", count(src, "global.relay.metered.ca") >= 4, String(count(src, "global.relay.metered.ca")));
chk("मरा सार्वजनिक Open Relay (openrelayproject) = 0", count(src, "openrelayproject") === 0);

/* 4. बासी-सत्य (static-पाठ) सुधार */
chk("बासी \"TURN अगला दौर\" = 0", count(src, "TURN अगला दौर") === 0);
chk("बासी \"बिना TURN जुड़ाव अनिश्चित\" header से गया", count(src, "बिना TURN जुड़ाव अनिश्चित") === 0);

/* 5. call-पट्टी 🎙️ बटन */
chk("v-talk2 बटन-HTML ठीक 1 बार", count(src, 'id="v-talk2"') === 1);
chk("tb2 पकड़ (const …, tb2=$(\"#v-talk2\")) 1 बार", count(src, 'tb2=$("#v-talk2")') === 1);
chk("handler-साझा पंक्ति (tb2.onclick=tb.onclick) 1 बार", count(src, "tb2.onclick=tb.onclick") === 1);
chk("असमर्थित-फ़ोन पर tb2 छिपाव", count(src, 'if(tb2) tb2.style.display="none"') === 1);

/* 6. पुराने रास्ते byte-स्तर पर मौजूद (अछूते-पन की गवाही) */
chk("पुराना v-talk बटन यथावत", count(src, 'id="v-talk"') === 1);
chk("vaniSpeak-बुलाहट यथावत 1 बार", count(src, '"vaniSpeak"') === 1);
chk("vaniRtc signaling यथावत (≥1 जगह)", count(src, '"vaniRtc"') >= 1, String(count(src, '"vaniRtc"')));
chk("mesh-इंजन (offerTo/answerTo/closePeer) यथावत",
    count(src, "function offerTo(") === 1 && count(src, "function answerTo(") === 1 && count(src, "function closePeer(") === 1);
chk("vaniOpen/vaniSay/vaniLeave रास्ते यथावत",
    count(src, '"vaniOpen"') >= 1 && count(src, '"vaniSay"') >= 1 && count(src, '"vaniLeave"') >= 1);
chk("संस्करण-पंक्ति v5.2", count(src, "vani.js v5.2") === 1);

/* ─────────── भाग-2: runtime (नक़ली DOM + नक़ली Firebase) ─────────── */
console.log("— भाग-2: runtime जाँचें —");

/* नक़ली-DOM: FakeEl + id-registry; panel.innerHTML लिखते ही सब id="…" बच्चे बनें */
const REG = {};
function FakeEl(tag){
  this.tagName = (tag || "div").toUpperCase();
  this.style = {}; this.children = []; this.dataset = {};
  this._text = ""; this._html = "";
  this.onclick = null; this.muted = false; this.value = "";
  this.autoplay = false; this.playsInline = false;
}
FakeEl.prototype.appendChild = function(c){ this.children.push(c); if(c && c.id) REG[c.id] = c; return c; };
FakeEl.prototype.setAttribute = function(k, v){ if(k === "id"){ this.id = v; REG[v] = this; } };
FakeEl.prototype.addEventListener = function(){};
FakeEl.prototype.remove = function(){};
FakeEl.prototype.querySelector = function(sel){
  if(sel && sel[0] === "#") return REG[sel.slice(1)] || null;
  return null;
};
Object.defineProperty(FakeEl.prototype, "innerHTML", {
  get(){ return this._html; },
  set(h){
    this._html = h;
    const re = /id="([^"]+)"/g; let mm;
    while((mm = re.exec(h))){
      if(!REG[mm[1]]){ const e = new FakeEl("div"); e.id = mm[1]; REG[mm[1]] = e; }
    }
  }
});
Object.defineProperty(FakeEl.prototype, "textContent", {
  get(){ return this._text; }, set(t){ this._text = String(t); }
});

const panel = new FakeEl("div"); panel.id = "pnl-vani"; REG["pnl-vani"] = panel;

const g = globalThis;
g.window = g;                      /* vani.js window.* इसी पर पढ़े */
g.document = {
  getElementById: id => REG[id] || null,
  createElement: tag => new FakeEl(tag)
};
g.sessionStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
g.AudioContext = function(){ this.sampleRate = 48000; };   /* 🎙️ रास्ता खुले */
Object.defineProperty(g, "navigator", { value: { mediaDevices: { getUserMedia: () => Promise.reject(new Error("नक़ली")) } }, configurable: true });
g.RTCPeerConnection = function(cfg){ g.__lastRtcCfg = cfg; this.close = () => {}; };
g.fetch = () => Promise.reject(new Error("नक़ली-जाल: network नहीं"));
/* SpeechRecognition/ speechSynthesis जान-बूझकर अनुपस्थित — guarded रास्ते जाँचें */

const fakeCtx = {
  app: {}, auth: {}, uid: "test-uid-1", lang: "hi",
  functions: {},
  httpsCallable: (fns, name) => (data) => { (g.__calls = g.__calls || []).push({ name, data }); return Promise.resolve({ data: {} }); },
  firestore: {
    getFirestore: () => ({}),
    collection: () => ({}), query: () => ({}), orderBy: () => ({}),
    onSnapshot: () => (() => {})
  }
};
g.__ACS_VANI = fakeCtx;            /* load से पहले सेट ⇒ boot तुरंत चले */

let bootOk = true, bootErr = "";
try { eval(src); } catch(e){ bootOk = false; bootErr = e && e.message; }
chk("boot बिना त्रुटि चला (नक़ली DOM/Firebase)", bootOk, bootErr);

const tb  = REG["v-talk"]  || null;
const tb2 = REG["v-talk2"] || null;
chk("runtime: v-talk2 पैनल में बना", !!tb2);
chk("runtime: v-talk (पुराना) भी बना", !!tb);
chk("runtime: दोनों 🎙️ का handler एक ही function",
    !!(tb && tb2 && typeof tb.onclick === "function" && tb.onclick === tb2.onclick));

/* click-जाँच: कमरा नहीं ⇒ साझा start() रास्ता v-talkst पर "पहले कमरा" लिखे */
let clickOk = false;
try {
  if(tb2 && tb2.onclick){ tb2.onclick(); }
  const ts = REG["v-talkst"];
  clickOk = !!(ts && /पहले कमरा/.test(ts.textContent));
} catch(e){ clickOk = false; }
chk("runtime: v-talk2 click → साझा vaniSpeak-रास्ता (\"पहले कमरा…\")", clickOk);

/* निचोड़ */
console.log("");
if(fails === 0) console.log("🏁 सब जाँचें पास — vani.js देय-योग्य।");
else { console.log("⛔ " + fails + " जाँच(ें) फेल — देय रोकें।"); process.exit(1); }
