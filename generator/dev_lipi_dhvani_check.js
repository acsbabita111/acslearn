/* dev_lipi_dhvani_check.js v1.0 · 22-Nov-2026 : ध्वनि-कार्ड वाले लिपि-परिचय का जाँच-यंत्र (🏁-द्वार) और ग़लत-आवाज़ पकड़ने की युक्ति
   चलाओ: node generator/dev_lipi_dhvani_check.js <code>      (जैसे fgc)
   यही जाँचें पन्ना बनते समय भी चलती हैं (build_lipi_pages.js → must)। एक भी फेल = पन्ना नहीं बनता।

   ग़लत आवाज़ पकड़ने के चार ताले:
   1. स्रोत-ताला (M01, M02): हर आवाज़ का IPA किसी छपे स्रोत से लिखा हो, और कार्ड का देवनागरी रूप साझा तालिका ipa_deva.js से वही निकले।
   2. कोर्स-ताला (M03, M04): कार्ड-तालिका से बना स्वतंत्र जोड़-यंत्र कोर्स के हर शब्द का वही देवनागरी उच्चारण बनाए जो कोर्स में छपा है।
      एक भी शब्द न मिले = कार्ड और कोर्स अलग बातें सिखा रहे हैं।
   3. जुड़वाँ-ताला (M09, M10): दो आवाज़ों का देवनागरी रूप एक हो, या रूप सिर्फ़ लगभग हो, तो यह बात कार्ड पर लिखी होनी चाहिए।
   4. मानव-ताला (P15, P16): हर कार्ड पर "मूल-वक्ता की जाँच" का हाल और "ग़लत लगी? बताओ" की कड़ी (कार्ड-कोड के साथ)।
      समीक्षा-पत्र <code>_samiksha.csv भी यहीं से बनता है।
   जो यह यंत्र नहीं जान सकता: स्रोत ख़ुद सही है या नहीं, और असली वक्ता कैसे बोलते हैं। इसीलिए ताला 4 है।

   निकास: generator/data/lipi/dhvani/<code>_jaanch.md (कमी-बही की आज की हालत + सब जाँचें) और <code>_samiksha.csv। */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const LD = require("./lipi_dhvani.js");
const IPA = LD.IPA;
const VER = "1.0";
const DEV = /[ऀ-ॿ]/;
/* रोमन शब्द जो लक्ष्य-भाषा के खाने के बाहर आ सकते हैं (सब देवनागरी के साथ लिखे जाते हैं) */
const ROMAN_OK = ["ACS", "AI", "PDF", "IPA", "WhatsApp", "Latin", "Noto", "Sans", "Sound", "Cards", "GEREC", "CNRS", "APiCS", "Omniglot"];

function T(list, id, ok, msg, detail) { list.push({ id: id, ok: !!ok, msg: msg, detail: detail || "" }); }
function must(name, list) { const bad = list.filter(x => !x.ok); if (bad.length) throw new Error("❌ " + name + " ध्वनि-जाँच फेल: " + bad.map(x => x.id + " " + x.msg + (x.detail ? " (" + x.detail + ")" : "")).join(" · ")); }
function visible(html) { return html.replace(/<svg[\s\S]*?<\/svg>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim(); }
function strings(o, out) { if (typeof o === "string") out.push(o); else if (Array.isArray(o)) o.forEach(x => strings(x, out)); else if (o && typeof o === "object" && typeof o !== "function") Object.keys(o).forEach(k => strings(o[k], out)); return out; }

/* स्वतंत्र जोड़-यंत्र: कार्ड-तालिका + साझा IPA-तालिका से शब्द का देवनागरी रूप (कोर्स के यंत्र का code इस्तेमाल नहीं करता) */
function jodo(tk, byG, D) {
  let out = "";
  for (let i = 0; i < tk.length; i++) {
    const c = byG[tk[i]]; if (!c) return null;
    const V = IPA.V[c.ipa];
    if (V) {
      const p = i > 0 ? byG[tk[i - 1]] : null, prevC = !!(p && !IPA.V[p.ipa]), last = i === tk.length - 1;
      out += !prevC ? V.d : (last && D.riti && D.riti.antLamba.indexOf(c.g) >= 0 && V.ml ? V.ml : V.m);
    } else {
      out += IPA.C[c.ipa];
      const nx = tk[i + 1] && byG[tk[i + 1]];
      if (i !== tk.length - 1 && !(nx && IPA.V[nx.ipa])) out += "्";
    }
  }
  return out;
}

/* ================= मॉडल की जाँच (M) ================= */
function checkModel(L, D, M) {
  const R = [], Y = D.yantra, byG = M.byG;
  const dataOnly = Object.assign({}, D, { yantra: null, lex: null, naam: null });
  /* M01 स्रोत */
  { const bad = M.cards.filter(c => !c.src.length || c.src.some(s => !D.srot[s])); T(R, "M01", !bad.length, "हर आवाज़ का छपा स्रोत", bad.map(c => c.g).join(",")); }
  /* M02 स्रोत-ताला */
  { const bad = M.cards.filter(c => { const v = IPA.V[c.ipa], k = IPA.C[c.ipa]; return (v ? v.d : k) !== c.dev; }); T(R, "M02", !bad.length, "स्रोत-ताला: IPA से निकला देवनागरी रूप = कार्ड का रूप", bad.map(c => c.g + ":" + c.ipa + "≠" + c.dev).join(",")); }
  /* M03 कोर्स-ताला, इकाई */
  { const inv = {}; Object.keys(D.gmap || {}).forEach(k => inv[D.gmap[k]] = k);
    const bad = M.cards.filter(c => { let w; try { w = Y.word(c.g); } catch (e) { w = "✗"; } return w !== c.dev; }); T(R, "M03", !bad.length, "कोर्स-ताला: कोर्स का यंत्र अकेली इकाई को वही रूप देता है", bad.map(c => c.g).join(",")); }
  /* M04 कोर्स-ताला, हर शब्द */
  { let n = 0; const bad = [];
    M.words.forEach(w => { const tk = M.GR[w]; if (!tk || !tk.every(g => byG[g])) return; n++; const a = jodo(tk, byG, D), b = Y.word(w); if (a !== b) bad.push(w + ":" + a + "≠" + b); });
    M._m04 = { n: n, bad: bad.length };
    T(R, "M04", !bad.length && n > 0, "कोर्स-ताला: कार्ड-तालिका से बना रूप कोर्स के " + n + " शब्दों में से हर एक से मिलता है", bad.slice(0, 8).join(" ")); }
  /* M05 कवरेज */
  { const mat = {}; (D.mat || []).forEach(w => mat[w] = 1);
    const bad = M.beCard.filter(b => b.shabd >= 2 || !b.list.every(w => mat[w])); T(R, "M05", !bad.length, "कोर्स की हर आवाज़-इकाई का कार्ड है (जो छूटीं, वे दर्ज अपवाद हैं)", bad.map(b => b.g + "×" + b.shabd).join(",")); }
  /* M06 बिना कोर्स-शब्द का कार्ड नहीं */
  { const bad = M.cards.filter(c => c.nShabd < 2); T(R, "M06", !bad.length, "हर कार्ड की आवाज़ कोर्स के कम से कम 2 शब्दों में है", bad.map(c => c.g).join(",")); }
  /* M07 उदाहरण-शब्द */
  { const bad = []; const mat = {}; (D.mat || []).forEach(w => mat[w] = 1);
    M.cards.forEach(c => { if (c.shabd.length < 2) bad.push(c.g + ":शब्द<2");
      c.shabd.forEach(x => { const tk = M.GR[x.w];
        if (D.lex[x.w] === undefined) bad.push(x.w + ":सूची में नहीं");
        else if (D.naam[x.w] || mat[x.w] || /^[A-Z0-9]{2,}$/.test(x.w)) bad.push(x.w + ":नाम/संक्षेप/रोका हुआ");
        else if (!tk || tk.indexOf(c.g) < 0) bad.push(x.w + ":" + c.g + " इकाई नहीं");
        else if (!tk.every(g => byG[g])) bad.push(x.w + ":बिना कार्ड की आवाज़");
        else if (x.dev !== Y.word(x.w)) bad.push(x.w + ":उच्चारण अलग");
        else { const i = tk.indexOf(c.g), p = tk.length === 1 ? "A" : i === 0 ? "S" : i === tk.length - 1 ? "E" : "M"; if (p !== x.pos) bad.push(x.w + ":जगह " + x.pos + "≠" + p); } }); });
    T(R, "M07", !bad.length, "उदाहरण-शब्द: कोर्स के असली शब्द, सही इकाई, सही जगह, सही उच्चारण", bad.slice(0, 8).join(" ")); }
  /* M08 दोहराव */
  { const seen = {}, dup = []; M.cards.forEach(c => c.shabd.forEach(x => { if (seen[x.w]) dup.push(x.w); seen[x.w] = 1; })); T(R, "M08", !dup.length, "एक शब्द एक ही कार्ड का उदाहरण", dup.join(",")); }
  /* M09 जुड़वाँ-ताला */
  { const by = {}; M.cards.forEach(c => (by[c.dev] = by[c.dev] || []).push(c.g)); const bad = [];
    Object.keys(by).forEach(d => { if (by[d].length > 1 && !M.milti.some(m => by[d].every(g => m.g.indexOf(g) >= 0))) bad.push(d + ":" + by[d].join("+")); });
    M.milti.forEach(m => { m.g.forEach(g => { if (!byG[g]) bad.push("बिना कार्ड: " + g); }); if (!m.jode.length && m.ek.filter(Boolean).length < m.g.length) bad.push(m.g.join("/") + ": शब्द नहीं"); });
    T(R, "M09", !bad.length, "जुड़वाँ-ताला: एक जैसे देवनागरी रूप वाली आवाज़ें तुलना-कार्ड में साथ हैं", bad.join(" ")); }
  /* M10 लगभग-ताला */
  { const bad = M.cards.filter(c => (IPA.LAGBHAG[c.ipa] && !c.lagbhag) || (!c.hindi && !c.lagbhag && !c.dhyan)); T(R, "M10", !bad.length, "लगभग-ताला: जो रूप सिर्फ़ लगभग है या हिंदी में नहीं है, वहाँ यह बात लिखी है", bad.map(c => c.g).join(",")); }
  /* M11 अंक */
  { const bad = M.ank.filter((a, i) => !a.dev || !DEV.test(a.dev) || a.arth.indexOf(LD.HINAME[i]) < 0); T(R, "M11", M.ank.length === 10 && !bad.length, "अंक 0 से 9: भाषा के नाम कोर्स की शब्द-सूची में हैं और अर्थ मिलता है", bad.map(a => a.d + ":" + a.w).join(",")); }
  /* M12 अकेले न आने वाले अक्षर */
  { const bad = []; M.alag.forEach(a => { const extra = a.bahar.filter(w => a.apvaad.indexOf(w) < 0); if (extra.length) bad.push(a.l + " बाहर भी: " + extra.slice(0, 4).join(",")); if (a.sirf.length && !a.andar) bad.push(a.l + ": भीतर भी नहीं"); if (byG[a.l]) bad.push(a.l + ": कार्ड भी है"); });
    T(R, "M12", !bad.length, "अकेले न आने वाले अक्षरों का हर दावा कोर्स की गिनती से सही", bad.join(" ")); }
  /* M13 नाक-नियम के उदाहरण */
  { const bad = M.naak ? M.naak.udaharan.filter(x => D.lex[x.w] === undefined || !M.GR[x.w]) : []; T(R, "M13", !bad.length, "नियम के उदाहरण कोर्स के शब्द हैं", bad.map(x => x.w).join(",")); }
  /* M14 योजना */
  { const seen = {}; let dup = 0, empty = 0; const known = {}; let und = 0;
    M.din.forEach(d => { d.g.forEach(g => { if (seen[g]) dup++; seen[g] = 1; known[g] = 1; }); if (!d.shabd.length) empty++; d.shabd.forEach(x => { if (!x.tukde.every(g => known[g])) und++; }); });
    const all = M.cards.every(c => seen[c.g]);
    T(R, "M14", all && !dup && !und && empty <= 1, "योजना: हर कार्ड ठीक एक बार; हर दिन के शब्द अब तक सीखी आवाज़ों से ही बने हैं", "दोहराव " + dup + " · अनसीखी " + und + " · बिना शब्द के दिन " + empty); }
  /* M15 data का पाठ */
  { const ss = strings(dataOnly, []); const bad = ss.filter(s => /[—–\[\]]/.test(s)); const sl = M.cards.filter(c => /[\/\s]/.test(c.dev));
    T(R, "M15", !bad.length && !sl.length, "data में लंबी डैश और चौकोर कोष्ठक नहीं; आवाज़ में / नहीं", bad.slice(0, 3).join(" | ") + sl.map(c => c.g).join(",")); }
  /* M16 स्रोत-पते */
  { const bad = Object.keys(D.srot).filter(k => !/^https:\/\//.test(D.srot[k].url) || !D.srot[k].naam); T(R, "M16", !bad.length, "हर स्रोत का नाम और https पता", bad.join(",")); }
  /* M17 समूह */
  { const ids = {}; D.samuh.forEach(g => ids[g.id] = 1); const bad = D.dhvani.filter(s => !ids[s.grp]); const dupG = D.dhvani.map(s => s.g).filter((g, i, a) => a.indexOf(g) !== i);
    T(R, "M17", !bad.length && !dupG.length, "हर आवाज़ एक समूह में, और कोई आवाज़ दो बार नहीं", bad.map(s => s.g).concat(dupG).join(",")); }
  return R;
}

/* ================= पन्ने के बीच के हिस्से की जाँच (P) ================= */
function checkContent(L, D, M, html) {
  const R = [], vis = visible(html);
  const css = fs.readFileSync(path.join(ROOT, "assets/lipi-dhvani.css"), "utf8"), js = fs.readFileSync(path.join(ROOT, "assets/lipi-dhvani.js"), "utf8");
  const cardSeg = c => { const i = html.indexOf('id="' + c.id + '"'); if (i < 0) return ""; const j = html.indexOf('<section class="ld-card', i + 1); const k = html.indexOf('id="ld-milti"', i); return html.slice(i, j > 0 && j < k ? j : k); };
  /* P01 */
  { const n = (html.match(/<section class="ld-card /g) || []).length; const bad = M.cards.filter(c => html.split('id="' + c.id + '"').length !== 2 || cardSeg(c).indexOf('data-pron="' + LD.esc(c.dev) + '"') < 0);
    T(R, "P01", n === M.cards.length && !bad.length, "कार्ड " + M.cards.length + ": हर आवाज़ का एक कार्ड, और कार्ड पर वही आवाज़", "मिले " + n + " · " + bad.map(c => c.g).join(",")); }
  /* P02 */
  { const bad = M.cards.filter(c => { const s = cardSeg(c), m = s.match(/<div class="ld-btns">([\s\S]*?)<\/div>/); if (!m) return true; const ps = (m[1].match(/data-pron="([^"]*)"/g) || []); return ps.length !== 2 || ps.some(p => p !== 'data-pron="' + LD.esc(c.dev) + '"'); });
    T(R, "P02", !bad.length, "हर कार्ड का 🔊 और 🎙️ उसी कार्ड की आवाज़ बोलता है", bad.map(c => c.g).join(",")); }
  /* P03 */
  { const ps = (html.match(/data-pron="([^"]*)"/g) || []).map(x => x.slice(11, -1)); const bad = ps.filter(p => !p || /[A-Za-z\/]/.test(p) || !DEV.test(p) || p.length > 24);
    T(R, "P03", ps.length > 0 && !bad.length, "बोलने को भेजा जाने वाला हर पाठ (" + ps.length + ") छोटा देवनागरी उच्चारण है; रोमन या / कभी नहीं", bad.slice(0, 5).join(",")); }
  /* P04 */
  { const bs = html.match(/<button\b[^>]*>/g) || []; const bad = bs.filter(b => /class="[^"]*ld-(sun|bol)/.test(b) && !/aria-label="[^"]{4,}"/.test(b)); const chips = (html.match(/<a class="ld-chip[^>]*>/g) || []).filter(a => !/aria-label="[^"]{4,}"/.test(a));
    T(R, "P04", !bad.length && !chips.length, "हर आवाज़-बटन और सूची-खाने का नाम (aria-label) है", "बटन " + bad.length + " · खाने " + chips.length); }
  /* P05 */
  { const bad = ["बटन दबाकर सुनो", "डाउनलोड", "Edge", "असली आवाज़ से पहचाना"].filter(x => vis.indexOf(x) >= 0); T(R, "P05", !bad.length, "झूठी या ख़ाली पंक्तियाँ नहीं", bad.join(",")); }
  /* P06 */
  { const NAMES = ["एच", "वाइ", "वाई", "डब्ल्यू", "एक्स", "क्यू", "ज़ेड", "जेड", "एफ़", "एल", "एम", "एन", "एस", "आर", "ओ यू"]; const words = vis.split(/[\s,.;:()।·=→]+/); const bad = NAMES.filter(n => n.indexOf(" ") < 0 ? words.indexOf(n) >= 0 : vis.indexOf(" " + n + " ") >= 0);
    T(R, "P06", !bad.length && vis.indexOf("अक्षरों के नाम यहाँ नहीं दिए") >= 0, "अंग्रेज़ी अक्षर-नाम नहीं; और साफ़ लिखा है कि नाम नहीं दिए गए", bad.join(",")); }
  /* P07, P09: लक्ष्य-भाषा के खाने */
  const spans = (html.match(/<span class="notranslate[^"]*" lang="[^"]*" translate="no"[^>]*>[\s\S]*?<\/span>/g) || []);
  { const bad = spans.map(s => s.replace(/<[^>]+>/g, "")).filter(t => /(^|[^A-Za-z])[A-Z]{2,}([^A-Za-z]|$)/.test(t)); T(R, "P07", !bad.length, "लक्ष्य-भाषा के खानों में संक्षेप (UPI जैसे) नहीं", bad.slice(0, 5).join(",")); }
  { const out = html.replace(/<span class="notranslate[^"]*" lang="[^"]*" translate="no"[^>]*>[\s\S]*?<\/span>/g, " "); const v2 = visible(out); const lat = (v2.match(/[A-Za-zÀ-ɏ][A-Za-zÀ-ɏ'-]*/g) || []);
    const ok = {}; ROMAN_OK.concat(String(L.en).split(/\s+/)).forEach(w => ok[w] = 1); const bad = lat.filter(w => !ok[w]);
    const wrongLang = spans.filter(s => s.indexOf('lang="' + D.bcp47 + '"') < 0 && s.indexOf('lang="und-fonipa"') < 0);
    T(R, "P09", !bad.length && !wrongLang.length && spans.length > 100, "लक्ष्य-भाषा का हर टुकड़ा भाषा-निशान और अनुवाद-रोक वाले खाने में (" + spans.length + " खाने); बाहर सिर्फ़ तय रोमन शब्द", bad.slice(0, 8).join(",")); }
  /* P08 */
  { const bad = []; if (/[—–]/.test(vis)) bad.push("लंबी डैश"); if (/[\[\]]/.test(vis)) bad.push("चौकोर कोष्ठक");
    (html.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || []).forEach(m => { if (parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?px/)[1], 10) < 16) bad.push(m); });
    T(R, "P08", !bad.length, "लंबी डैश नहीं, चौकोर कोष्ठक नहीं, 16px से छोटा पाठ नहीं", bad.join(",")); }
  /* P11 टुकड़े */
  { const ws = html.match(/<span class="notranslate ld-wl"[^>]*>([^<]*)<\/span><span class="notranslate ld-ws"[^>]*>([\s\S]*?)<\/span><span class="ld-wd">/g) || []; const bad = [];
    ws.forEach(s => { const m = s.match(/ld-wl"[^>]*>([^<]*)<\/span><span class="notranslate ld-ws"[^>]*>([\s\S]*?)<\/span><span class="ld-wd">/); const w = m[1], parts = m[2].replace(/<i[^>]*>·<\/i>/g, "\u0001").replace(/<[^>]+>/g, "").split("\u0001");
      if (parts.join("") !== w) bad.push(w + ":जोड़ अलग"); else if (!parts.every(p => M.byG[p])) bad.push(w + ":" + parts.join("|")); else if (M.GR[w] && M.GR[w].join("\u0001") !== parts.join("\u0001")) bad.push(w + ":यंत्र से अलग"); });
    T(R, "P11", ws.length >= M.cards.length * 2 && !bad.length, "शब्द के टुकड़े (" + ws.length + " शब्द) आवाज़-इकाइयों से बने हैं; जोड़े-अक्षर टूटते नहीं", bad.slice(0, 6).join(" ")); }
  /* P12 अंक */
  { const seg = html.slice(html.indexOf('id="ld-ank"'), html.indexOf('id="ld-bade"')); const bad = M.ank.filter(a => seg.indexOf('<span class="ld-num">' + a.d + "</span>") < 0 || seg.indexOf(">" + a.w + "</span>") < 0 || seg.indexOf('data-pron="' + LD.esc(a.dev) + '"') < 0);
    T(R, "P12", !bad.length, "अंक: हर अंक के साथ भाषा का नाम, और 🔊 उसी नाम का उच्चारण बोलता है", bad.map(a => a.d).join(",")); }
  /* P13 लिखाई */
  { const defs = {}; (html.match(/<path id="(ldg-[0-9a-f]+)"/g) || []).forEach(x => defs[x.slice(10, -1)] = 1); const uses = (html.match(/<use href="#(ldg-[0-9a-f]+)"/g) || []).map(x => x.slice(12, -1)); const miss = uses.filter(u => !defs[u]);
    const few = M.cards.filter(c => (cardSeg(c).match(/class="ld-gl g-dot"/g) || []).length < 3);
    T(R, "P13", uses.length > 0 && !miss.length && !few.length, "लिखाई: हर कार्ड पर कम से कम 3 बिंदुदार रूप, और हर आकृति मौजूद", "छूटी आकृति " + miss.length + " · कम बिंदु " + few.map(c => c.g).join(",")); }
  /* P14 */
  { const reg = (html.match(/class="lipi-reg"[^>]*>[\s\S]*?href="\/join\.html"/g) || []).length; const ext = html.match(/<a href="https:\/\/[^"]*"[^>]*>/g) || []; const badExt = ext.filter(a => !/target="_blank"/.test(a) || !/rel="noopener"/.test(a));
    T(R, "P14", /मूल भाषा: हिंदी/.test(html) && reg >= 3 && html.indexOf("आवाज़ों का स्रोत:") >= 0 && !badExt.length && vis.indexOf("बाहरी साइटें हैं") >= 0, "मूल-भाषा निशान, स्रोत-पंक्ति, बाहरी कड़ी नई खिड़की में, रजिस्ट्रेशन-अपील 3 जगह", "अपील " + reg + " · बाहरी कड़ी दोष " + badExt.length); }
  /* P15 सच्चा हाल */
  { const n = (html.match(/मूल-वक्ता की जाँच: /g) || []).length; T(R, "P15", vis.indexOf("इस भाषा की मशीन-आवाज़ किसी फ़ोन में नहीं है") >= 0 && n === M.cards.length && vis.indexOf("मूल-वक्ता की जाँच अभी बाक़ी है") >= 0, "मानव-ताला: सच्ची आवाज़-पंक्ति, और हर कार्ड पर मूल-वक्ता जाँच का हाल", "हाल-पंक्तियाँ " + n); }
  /* P16 ग़लत लगे तो बताओ */
  { const wa = (fs.readFileSync(path.join(ROOT, "assets/acs-config.js"), "utf8").match(/whatsapp:\s*"(https:\/\/wa\.me\/\d+)"/) || [])[1]; const bad = M.cards.filter(c => { const s = cardSeg(c), m = s.match(/class="ld-galat-a" href="([^"]*)"/); return !m || m[1].indexOf(wa + "?text=") !== 0 || decodeURIComponent(m[1].replace(/&amp;/g, "&")).indexOf(c.kod) < 0; });
    T(R, "P16", !!wa && !bad.length, "मानव-ताला: हर कार्ड पर ग़लती बताने की कड़ी, कार्ड-कोड और एसीएस के नंबर के साथ", bad.map(c => c.g).join(",")); }
  /* P18 CSS */
  { const bad = []; if (!/\.ld-ic\{[^}]*width:48px;height:48px/.test(css)) bad.push("छोटा बटन 48px नहीं"); if (!/\.ld-bt\{[^}]*min-height:5\dpx/.test(css)) bad.push("बड़ा बटन"); if (!/break-inside:avoid/.test(css)) bad.push("कार्ड कट सकता है"); if (!/\.ld-words\{display:grid;grid-template-columns:repeat\(2,/.test(css)) bad.push("2 प्रति पंक्ति नहीं");
    if (!/@media print\{[\s\S]*background:#fff!important/.test(css)) bad.push("छपाई में रंग");
    if (!/@media screen and \(min-width:760px\)\{\s*\.ld-grp\{display:grid;grid-template-columns:repeat\(2,/.test(css) || css.indexOf(".ld-grp>.ld-card:last-child:nth-child(odd){grid-column:1/-1;justify-self:center") < 0) bad.push("चौड़ी स्क्रीन पर 2 कार्ड प्रति पंक्ति (अकेला बीच में) का नियम नहीं");
    if (css.indexOf(".ld-wrap .acs-bolo .ab-lg{display:none}") < 0) bad.push("बोलो-डिब्बे में सही/ग़लत के रंगों वाली पंक्ति दिखेगी");
    (css.match(/font-size:\s*([0-9.]+)px/g) || []).forEach(m => { if (parseFloat(m.replace(/[^0-9.]/g, "")) < 16) bad.push(m); });
    T(R, "P18", !bad.length, "रूप-फ़ाइल: बटन 48px या बड़े, एक पंक्ति में 2 शब्द, चौड़ी स्क्रीन पर 2 बड़े कार्ड, कार्ड छपाई में कटता नहीं, छपाई सफ़ेद, 16px से छोटा कुछ नहीं", bad.join(",")); }
  /* P19 JS */
  { const bad = []; if (!/u\.lang = "hi-IN"/.test(js)) bad.push("हिंदी आवाज़"); if (!/voiceschanged/.test(js)) bad.push("आवाज़-सूची का इंतज़ार"); if (/data-say|LIPI_TTS|alert\(/.test(js)) bad.push("पुराना रास्ता या alert"); if (!/forceRec: true/.test(js) || !/onSay:/.test(js)) bad.push("बोलो-रास्ता"); if (!/host: host/.test(js)) bad.push("पूरी चौड़ाई"); if (/डाउनलोड/.test(js)) bad.push("झूठी सलाह");
    T(R, "P19", !bad.length, "आवाज़-फ़ाइल: सिर्फ़ देवनागरी, हिंदी आवाज़ से; सूची का इंतज़ार; बोलो = रिकॉर्ड और मिलाओ, पूरी चौड़ाई में", bad.join(",")); }
  /* P20 खंड */
  { const ids = ["ld-kaise", "ld-suchi", "ld-cards", "ld-milti", "ld-niyam", "ld-ank", "ld-bade", "ld-abhyas", "ld-yojana", "ld-aage"]; const bad = ids.filter(i => html.indexOf('id="' + i + '"') < 0); const hosts = (html.match(/class="ld-host" data-bolo-host="1"/g) || []).length;
    const grp = (html.match(/<div class="ld-grp">/g) || []).length;
    T(R, "P20", !bad.length && grp === D.samuh.filter(g => M.cards.some(c => c.grp.id === g.id)).length && hosts >= M.cards.length * 2 && (html.match(/class="ld-mj"/g) || []).length === M.milti.length, "सब 10 खंड, हर समूह का कार्ड-डिब्बा, हर तुलना-कार्ड, और बोलो-डिब्बे की पूरी चौड़ाई वाली जगहें", bad.join(",") + " जगहें " + hosts); }
  /* P21 भीतरी कड़ियाँ */
  { const hrefs = (html.match(/href="(\/[^"#]*)"/g) || []).map(h => h.slice(6, -1)); const bad = hrefs.filter(h => { const p = path.join(ROOT, h.replace(/^\//, "")); return !(fs.existsSync(p) && (fs.statSync(p).isFile() || fs.existsSync(path.join(p, "index.html")))); });
    const want = ["chitra-pustak", "workbook", "shabdkosh", "vyakaran"].filter(x => fs.existsSync(path.join(ROOT, "courses/hi/bhasha", L.slug, x, "index.html"))); const miss = want.filter(x => html.indexOf('href="/courses/hi/bhasha/' + L.slug + "/" + x + '/"') < 0);
    T(R, "P21", !bad.length && !miss.length, "भीतरी कड़ियाँ सब मौजूद; बने हुए हर साथी-पन्ने की कड़ी है", bad.concat(miss).join(",")); }
  /* P22 सूची */
  { const seg = html.slice(html.indexOf('id="ld-suchi"'), html.indexOf('id="ld-cards"')); const bad = M.cards.filter(c => seg.indexOf('class="ld-chip ld-' + c.grp.rang + '" href="#' + c.id + '"') < 0); T(R, "P22", !bad.length, "सूची: हर कार्ड तक एक छुअन", bad.map(c => c.g).join(",")); }
  /* P23 id */
  { const ids = (html.match(/\sid="([^"]+)"/g) || []).map(x => x.slice(5, -1)); const dup = ids.filter((x, i) => ids.indexOf(x) !== i); T(R, "P23", !dup.length, "कोई id दो बार नहीं", dup.slice(0, 5).join(",")); }
  /* P24 */
  { T(R, "P24", !/[{}]/.test(vis) && vis.indexOf("undefined") < 0 && vis.indexOf("null") < 0 && vis.indexOf("NaN") < 0, "अधूरे निशान या ख़ाली मान नहीं", ""); }
  /* P25 रंग का मतलब */
  { const bad = M.cards.filter(c => html.indexOf('<section class="ld-card ld-' + c.grp.rang + '" id="' + c.id + '"') < 0 || cardSeg(c).indexOf('<span class="ld-tag">' + LD.esc(c.grp.naam) + "</span>") < 0);
    T(R, "P25", !bad.length && vis.indexOf("सुनहरा = खुले स्वर") >= 0, "रंग का मतलब लिखा है, वही रंग कार्ड पर है, और समूह का नाम भी छपा है", bad.map(c => c.g).join(",")); }
  /* P27 साझा फ़ाइलों से टकराव */
  { const bad = (html.match(/\sdata-(t|tp|say)="/g) || []).length; T(R, "P27", !bad, "data-t, data-tp, data-say गुण नहीं (साझा अनुवाद-फ़ाइल और पुरानी आवाज़-फ़ाइल इन्हें पकड़कर पाठ बदल देती हैं)", "मिले " + bad); }
  /* P26 वज़न */
  { const kb = Math.round(Buffer.byteLength(html, "utf8") / 1024), gz = Math.round(require("zlib").gzipSync(html).length / 1024); T(R, "P26", gz <= 45 && kb <= 450, "वज़न: भेजते समय " + gz + " KB (सीमा 45), खुला " + kb + " KB (सीमा 450)", ""); }
  return R;
}

/* ================= पूरी फ़ाइल की जाँच (F) ================= */
function checkFile(L, D, M, s) {
  const R = [], SEO = require("./lib_seo_meta.js");
  T(R, "F01", /generator से बना \(build_lipi_pages\.js v[0-9.]+ \+ lipi_dhvani\.js v/.test(s), "यंत्र का निशान (हाथ से नहीं बना)", "");
  T(R, "F02", /application\/ld\+json/.test(s) && /LearningResource/.test(s) && s.indexOf('<link rel="canonical" href="https://acslearn.com/courses/hi/bhasha/' + L.slug + '/lipi/">') >= 0, "JSON-LD और canonical", "");
  { const want = SEO.desc("lipi", { hi: L.hi, en: L.en, dhvani: M.cards.length, days: M.nDin }); const e = LD.esc(want); const n = s.split(e).length - 1; const h2 = s.indexOf("<h2>9. " + M.nDin + " दिन की योजना</h2>") >= 0;
    let ld = false; try { const m = s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/); ld = JSON.parse(m[1])[0].description === want; } catch (e2) {}
    T(R, "F03", n >= 2 && h2 && ld, "खोज-विवरण, साझा-विवरण और JSON-LD में वही कार्ड-गिनती (" + M.cards.length + ") और वही दिन (" + M.nDin + ") जो पन्ने पर", "विवरण " + n + " जगह · शीर्षक " + h2 + " · JSON-LD " + ld); }
  T(R, "F04", s.indexOf('href="/assets/lipi-dhvani.css"') >= 0 && s.indexOf('src="/assets/lipi-dhvani.js"') >= 0 && s.indexOf('src="/assets/acs-bolo.js"') >= 0 && s.indexOf('src="/assets/acs-raay.js"') >= 0 && s.indexOf('src="/assets/lipi.js"') < 0 && s.indexOf("LIPI_TTS") < 0, "नई रूप-फ़ाइल और आवाज़-फ़ाइल जुड़ी हैं; पुरानी lipi.js नहीं", "");
  { const smP = path.join(ROOT, "sitemap-bhasha.xml"); const sm = fs.existsSync(smP) ? fs.readFileSync(smP, "utf8") : ""; const TW = require("./data/seo_twins.js");
    T(R, "F05", !!TW[L.slug] || sm.indexOf("/courses/hi/bhasha/" + L.slug + "/lipi/") >= 0, "साइटमैप में है", ""); }
  T(R, "F06", fs.readFileSync(path.join(ROOT, "courses/hi/bhasha", L.slug, "index.html"), "utf8").indexOf("/lipi/") >= 0, "कोर्स-पन्ने से कड़ी", "");
  T(R, "F07", s.indexOf('class="acs-raay" data-page="ACS-LD-' + L.code + '"') >= 0, "राय के बटन", "");
  { const a = s.indexOf("<!-- PAGE-CONTENT-START -->"), b = s.indexOf("<!-- PAGE-CONTENT-END -->"); T(R, "F08", a > 0 && b > a, "पन्ना साझा टेम्पलेट के भीतर है", ""); }
  return R;
}

function article(s) { const a = s.indexOf("<!-- PAGE-CONTENT-START -->"), b = s.indexOf("<!-- PAGE-CONTENT-END -->"); return s.slice(a + 27, b).trim(); }

/* ================= रिपोर्ट ================= */
function report(L, D, M, all, browser) {
  const BAHI = require(path.join(__dirname, "data", "lipi", "dhvani", "kami_bahi.js"));
  const st = {}; all.forEach(x => st[x.id] = x.ok); if (browser) Object.keys(browser.jaanch || {}).forEach(k => st[k] = browser.jaanch[k].ok);
  const STAR = { g: "गंभीर", m: "मध्यम", c: "छोटी" };
  let band = 0, aankh = 0, khuli = 0;
  const rows = BAHI.map(k => { let hal;
    if (!k.pahra.length) { hal = "🟡 " + (k.tippani || "आँख से जाँच"); aankh++; }
    else { const miss = k.pahra.filter(p => st[p] === undefined), fail = k.pahra.filter(p => st[p] === false);
      if (fail.length) { hal = "🔴 पहरा फेल: " + fail.join(", "); khuli++; } else if (miss.length) { hal = "🟡 बंद; पर " + miss.join(", ") + " (ब्राउज़र-जाँच) इस बार नहीं चली"; aankh++; } else { hal = "✅ बंद"; band++; } }
    return "| " + k.id + " | " + STAR[k.star] + " | " + k.kami + " | " + k.saboot + " | " + k.sudhar + " | " + (k.pahra.join(", ") || "नहीं") + " | " + hal + " |"; });
  let o = "# ध्वनि-कार्ड जाँच-रिपोर्ट : " + L.hi + " (" + L.code + ")\n\n";
  o += "यह फ़ाइल यंत्र ने लिखी है (dev_lipi_dhvani_check.js v" + VER + ")। हाथ से न बदलें।\n\n";
  o += "## 1. सार\n\n";
  o += "- कार्ड: " + M.cards.length + " · कोर्स के वाक्य: " + M.nVakya + " · कोर्स के शब्द: " + M.nShabd + " · योजना: " + M.nDin + " दिन\n";
  o += "- जाँचें: " + all.length + " में से " + all.filter(x => x.ok).length + " पास" + (browser ? " · ब्राउज़र-जाँच: " + Object.keys(browser.jaanch).filter(k => browser.jaanch[k].ok).length + " / " + Object.keys(browser.jaanch).length + " पास" : " · ब्राउज़र-जाँच: इस बार नहीं चली") + "\n";
  o += "- कोर्स-ताला: कार्ड-तालिका से बना उच्चारण कोर्स के " + (M._m04 ? M._m04.n : "?") + " शब्दों में से " + (M._m04 ? M._m04.n - M._m04.bad : "?") + " से मिला\n";
  o += "- कमी-बही: " + BAHI.length + " कमियाँ · ✅ बंद " + band + " · 🟡 आँख से या अधूरी " + aankh + " · 🔴 खुली " + khuli + "\n";
  o += "- मूल-वक्ता की जाँच: " + M.cards.filter(c => c.jaanch).length + " / " + M.cards.length + " कार्ड\n\n";
  o += "## 2. कमी-बही: कमी → सबूत → सुधार → पहरा → आज का हाल\n\n| कोड | स्तर | कमी | सबूत | सुधार | पहरा | हाल |\n|---|---|---|---|---|---|---|\n" + rows.join("\n") + "\n\n";
  o += "## 3. हर कार्ड का सबूत\n\n| कोड | अक्षर | आवाज़ | IPA | स्रोत | कोर्स में शब्द | कोर्स में बार | उदाहरण | हिंदी में है? | मूल-वक्ता जाँच |\n|---|---|---|---|---|---|---|---|---|---|\n";
  o += M.cards.map(c => "| " + c.kod + " | " + c.g + " | " + c.dev + " | " + c.ipa + " | " + c.src.join(", ") + " | " + c.nShabd + " | " + c.nBaar + " | " + c.shabd.map(x => x.w + " = " + x.dev).join("; ") + " | " + (c.hindi || "नहीं") + " | " + (c.jaanch ? "हो गई" : "बाक़ी") + " |").join("\n") + "\n\n";
  o += "## 4. सब जाँचें\n\n| कोड | हाल | जाँच | ब्योरा |\n|---|---|---|---|\n" + all.map(x => "| " + x.id + " | " + (x.ok ? "✅" : "🔴") + " | " + x.msg + " | " + (x.detail || "") + " |").join("\n") + "\n";
  if (browser) o += Object.keys(browser.jaanch).map(k => "| " + k + " | " + (browser.jaanch[k].ok ? "✅" : "🔴") + " | " + browser.jaanch[k].msg + " | " + (browser.jaanch[k].detail || "") + " |").join("\n") + "\n";
  o += "\n## 5. दर्ज क़र्ज़ (यंत्र ने पकड़ा, पन्ने ने छिपाया नहीं)\n\n";
  M.beCard.forEach(b => { o += "- इकाई `" + b.g + "` का कार्ड नहीं: " + b.shabd + " शब्द (" + b.list.join(", ") + ")। यह शब्द बाहर का है या कोर्स की वर्तनी जाँचनी है।\n"; });
  M.baaki.forEach(b => { o += "- `" + b.g + "` (IPA " + b.ipa + "): स्रोत इसे एक आवाज़ बताते हैं; कोर्स का उच्चारण-यंत्र इसे अभी दो टुकड़ों में लिखता है (" + b.shabd.map(w => w + " = " + D.yantra.word(w)).join(", ") + ")। सुधार कोर्स के उच्चारण को बदलेगा, इसलिए अलग फ़ैसले से होगा।\n"; });
  M.cards.filter(c => c.matbhed).forEach(c => { o += "- `" + c.g + "`: " + c.matbhed.replace(/[{}]/g, "") + "\n"; });
  o += "- मशीन की आवाज़: इस भाषा की आवाज़ किसी फ़ोन में नहीं। 🔊 देवनागरी उच्चारण हिंदी आवाज़ में बोलता है; r, j, w जैसी आवाज़ें वह हिंदी ढंग से बोलेगी।\n";
  o += "- मूल-वक्ता की जाँच सब " + M.cards.length + " कार्डों पर बाक़ी है। समीक्षा-पत्र: `" + L.code + "_samiksha.csv`।\n";
  return o;
}
function samiksha(L, M) {
  const q = s => '"' + String(s).replace(/"/g, '""') + '"';
  const rows = [["कार्ड-कोड", "अक्षर", "आवाज़ (देवनागरी)", "IPA", "कैसे बोलें", "उदाहरण-शब्द", "शब्द का उच्चारण", "शब्द का अर्थ", "आवाज़ सही? (हाँ/नहीं)", "सही रूप क्या हो", "जाँचने वाले का नाम", "तारीख़"]];
  M.cards.forEach(c => { rows.push([c.kod, c.g, c.dev, c.ipa, c.kaise.replace(/[{}]/g, ""), "", "", "", "", "", "", ""]); c.shabd.forEach(x => rows.push([c.kod, c.g, "", "", "", x.w, x.dev, x.arth, "", "", "", ""])); });
  return "﻿" + rows.map(r => r.map(q).join(",")).join("\r\n") + "\r\n";
}

function run(code, opt) {
  opt = opt || {};
  const ENG = require("./build_lipi_pages.js"); const L = ENG.LIPI_LANGS.find(l => l.code === code);
  if (!L) throw new Error("भाषा-सूची में नहीं: " + code);
  if (!LD.has(code)) throw new Error("ध्वनि-data नहीं: generator/data/lipi/dhvani/" + code + ".js");
  const D = LD.load(code), M = LD.makeModel(L, D);
  let all = checkModel(L, D, M);
  const p = path.join(ROOT, "courses/hi/bhasha", L.slug, "lipi/index.html");
  if (!fs.existsSync(p)) all.push({ id: "F00", ok: false, msg: "पन्ना मौजूद नहीं", detail: p });
  else { const s = fs.readFileSync(p, "utf8"); all = all.concat(checkContent(L, D, M, article(s)), checkFile(L, D, M, s)); }
  const bp = path.join(__dirname, "data", "lipi", "dhvani", code + "_browser.json");
  const browser = fs.existsSync(bp) ? JSON.parse(fs.readFileSync(bp, "utf8")) : null;
  if (!opt.noWrite) {
    fs.writeFileSync(path.join(__dirname, "data", "lipi", "dhvani", code + "_jaanch.md"), report(L, D, M, all, browser), "utf8");
    fs.writeFileSync(path.join(__dirname, "data", "lipi", "dhvani", code + "_samiksha.csv"), samiksha(L, M), "utf8");
  }
  return { L: L, D: D, M: M, all: all, browser: browser };
}

module.exports = { VER: VER, checkModel: checkModel, checkContent: checkContent, checkFile: checkFile, must: must, run: run, jodo: jodo, article: article };
if (require.main === module) {
  const code = process.argv[2];
  if (!code) { console.log("चलाओ: node generator/dev_lipi_dhvani_check.js <code>"); process.exit(2); }
  const r = run(code), bad = r.all.filter(x => !x.ok);
  r.all.forEach(x => { if (!x.ok) console.log("  ❌ " + x.id + " " + x.msg + (x.detail ? " : " + x.detail : "")); });
  const bbad = r.browser ? Object.keys(r.browser.jaanch).filter(k => !r.browser.jaanch[k].ok) : [];
  bbad.forEach(k => console.log("  ❌ " + k + " " + r.browser.jaanch[k].msg + " : " + (r.browser.jaanch[k].detail || "")));
  console.log((bad.length || bbad.length ? "⛔ " + (bad.length + bbad.length) + " जाँच फेल" : "🏁 dev_lipi_dhvani_check v" + VER + " (" + code + "): सब पास") + " · ✅ " + r.all.filter(x => x.ok).length + " / " + r.all.length + " जाँचें" + (r.browser ? " · ब्राउज़र " + (Object.keys(r.browser.jaanch).length - bbad.length) + " / " + Object.keys(r.browser.jaanch).length : " · ब्राउज़र-जाँच इस बार नहीं चली"));
  console.log("   रिपोर्ट: generator/data/lipi/dhvani/" + code + "_jaanch.md · समीक्षा-पत्र: " + code + "_samiksha.csv");
  process.exit(bad.length || bbad.length ? 1 : 0);
}
