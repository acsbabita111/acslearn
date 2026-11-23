/* lipi_dhvani.js v1.1 · 23-Nov-2026 (पहला रूप v1.0 · 22-Nov-2026) : ध्वनि-कार्ड वाला लिपि-परिचय : साझा यंत्र (परत-4)
   क्यों बना: पुराना लिपि-पन्ना अक्षर-दर-अक्षर चलता था और आवाज़ शब्दों के पहले टुकड़े से ख़ुद निकालता था।
              उससे 27 में 17 कार्ड की आवाज़ ग़लत छपी, और जोड़े-अक्षर (ou, ch, an …) सिखाए ही नहीं गए (ऑडिट 22-Nov-2026, 43 कमियाँ)।
   नया ढाँचा: हर आवाज़ का अपना बड़ा कार्ड। कार्ड पर: अक्षर = आवाज़ (देवनागरी), कैसे बोलें, उसी आवाज़ वाले शब्द, लिखाई, सबूत।
   शोध-आधार: "ध्वनि-दीवार" (आवाज़ के हिसाब से सजावट, अक्षर-क्रम से नहीं) · अक्षर-आवाज़ जोड़ सिखाने की रीति (पहले आवाज़, नाम बाद में;
              एक आवाज़ 1 से 3 अक्षरों से लिखी जा सकती है; शब्द वही जो सीखी आवाज़ों से पढ़े जा सकें) · सिर्फ़ एक आवाज़ के फ़र्क़ वाले शब्द-जोड़े।
              यह इन रीतियों पर आधारित/प्रेरित है; किसी संस्था का पाठ्यक्रम नहीं।
   चलता कैसे है: build_lipi_pages.js में जिस भाषा की फ़ाइल generator/data/lipi/dhvani/<code>.js हो, उसका पन्ना यहाँ से बनता है।
                 बाक़ी भाषाएँ पुराने रास्ते पर, byte-दर-byte जैसी थीं वैसी।
   नई भाषा जोड़ना: dhvani/<code>.js बनाओ (आवाज़-तालिका + स्रोत + कोर्स का उच्चारण-यंत्र)। जाँच: node generator/dev_lipi_dhvani_check.js <code>
   पहरा: बनते समय dev_lipi_dhvani_check की सब जाँचें चलती हैं। एक भी फेल = पन्ना नहीं बनता।
   कोई Math.random नहीं: वही data = वही पन्ना, हर बार।
   v1.1 · 23-Nov-2026 (चरण-2, मलय से): बाक़ी भाषाओं के लिए खुला किया। सब नए खाने वैकल्पिक हैं; जो data इन्हें नहीं देता (fgc),
         उसका पन्ना पहले जैसा ही बनता है। नए खाने: likha (टुकड़ा → लिखा रूप, जैसे मलय का तालिंग e), chinh (कार्ड की छोटी पहचान),
         kam (1 ही कोर्स-शब्द वाली आवाज़), demo, ekRoopBaat, sach, rangBaat, alagSheershak, niyam (याद रखने के नियम),
         chhapai ("L1" = उदाहरण सिर्फ़ वे शब्द जिनकी कोर्स-छपाई यंत्र से हूबहू मिले), riti.antLambaSwatantra, riti.antBand, riti.antHalant। */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const VER = "1.1";
const DIR = path.join(__dirname, "data", "lipi", "dhvani");
const IPA = require(path.join(__dirname, "data", "lipi", "ipa_deva.js"));
const HINAME = ["शून्य", "एक", "दो", "तीन", "चार", "पाँच", "छह", "सात", "आठ", "नौ"];
const POS = { S: "शुरू में", M: "बीच में", E: "अंत में", A: "अकेला शब्द" };

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const two = n => (n < 10 ? "0" : "") + n;
const num = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

function has(code) { return fs.existsSync(path.join(DIR, code + ".js")); }
function load(code) { return require(path.join(DIR, code + ".js")); }

/* ---- कोर्स के सब वाक्य पढ़ो (लक्ष्य-भाषा, देवनागरी, हिंदी के तिकड़े) ---- */
function corpus(code) {
  const out = [];
  for (const f of ["kkb_" + code + "_data.js", "kkb2_" + code + "_data.js"]) {
    const p = path.join(ROOT, "assets", f); if (!fs.existsSync(p)) continue;
    const w = {}; new Function("window", "self", "module", fs.readFileSync(p, "utf8") + ";")(w, w, {});
    const D = w.KKB2_DATA || w.KKB_DATA; if (!D || !D.weeks) continue;
    D.weeks.forEach(wk => (wk.days || []).forEach(d => Object.keys(d).forEach(k => {
      const v = d[k]; if (!Array.isArray(v)) return;
      v.forEach(it => { if (Array.isArray(it) && typeof it[0] === "string" && typeof it[1] === "string" && /[ऀ-ॿ]/.test(it[1])) out.push(it[0]); });
    })));
  }
  return out;
}

/* ---- कोर्स स्तर-1 की छपाई: शब्द → कोर्स में छपा देवनागरी रूप (वाक्य और देवनागरी के शब्द गिनती में बराबर हों तभी) ---- */
function chhapai(code) {
  const p = path.join(ROOT, "assets", "kkb_" + code + "_data.js"); const map = {}; let nVakya = 0, nMila = 0;
  if (!fs.existsSync(p)) return { map: map, nVakya: 0, nMila: 0 };
  const w = {}; new Function("window", "self", "module", fs.readFileSync(p, "utf8") + ";")(w, w, {});
  const D = w.KKB_DATA; const pairs = [];
  (D.weeks || []).forEach(wk => { (wk.days || []).forEach(d => Object.keys(d).forEach(k => { const v = d[k]; if (Array.isArray(v)) v.forEach(it => { if (Array.isArray(it)) pairs.push(it); }); }));
    ((wk.test && wk.test.lines) || []).forEach(it => { if (Array.isArray(it)) pairs.push(it); }); });
  const P = /[.,!?;:"“”()।…]+/g;
  pairs.forEach(it => {
    if (typeof it[0] !== "string" || typeof it[1] !== "string" || !/[ऀ-ॿ]/.test(it[1])) return;
    nVakya++;
    const a = it[0].replace(P, " ").trim().split(/\s+/), b = it[1].replace(P, " ").trim().split(/\s+/);
    if (a.length !== b.length) return;
    nMila++;
    a.forEach((x, i) => { const xa = x.split("-"), xb = b[i].split("-"); if (xa.length !== xb.length) return;
      xa.forEach((y, j) => { const k = y.toLowerCase(); if (!/^\p{L}+$/u.test(k)) return; const e = map[k] = map[k] || { forms: {}, n: 0 }; e.n++; e.forms[xb[j]] = (e.forms[xb[j]] || 0) + 1; }); });
  });
  return { map: map, nVakya: nVakya, nMila: nMila };
}

/* ---- data + कोर्स → मॉडल (पन्ना और जाँच, दोनों इसी एक मॉडल से) ---- */
function makeModel(L, D) {
  const Y = D.yantra, gm = x => (D.gmap && D.gmap[x]) || x;
  const show = g => (D.likha && D.likha[g]) || g;                       /* टुकड़ा → लिखा हुआ रूप */
  const CH = D.chhapai === "L1" ? chhapai(L.code) : null;
  const printOk = w => !CH || (!!CH.map[w] && Object.keys(CH.map[w].forms).every(f => f === Y.word(w)));
  const kamS = {}; (D.kam || []).forEach(g => kamS[g] = 1);
  const lines = corpus(L.code);
  const freq = {};
  lines.forEach(s => String(s).split(/[^\p{L}\p{M}]+/u).forEach(t => {
    if (!t || D.naam[t] || D.naam[t.toLowerCase()]) return;
    const l = t.toLowerCase(); if (D.lex[l] !== undefined) freq[l] = (freq[l] || 0) + 1;
  }));
  const words = Object.keys(freq).sort();
  const GR = {}; const bad = [];
  words.forEach(w => { try { GR[w] = Y.graphemes(w).map(gm); } catch (e) { bad.push(w); } });
  const mat = {}; (D.mat || []).forEach(w => mat[w] = 1);
  const cardOf = {}; D.dhvani.forEach(s => cardOf[s.g] = s);
  /* गिनती: हर इकाई कितने शब्दों में, कितनी बार */
  const stat = {};
  words.forEach(w => { if (!GR[w]) return; const seen = {};
    GR[w].forEach(g => { const st = stat[g] = stat[g] || { shabd: 0, baar: 0, list: [] }; st.baar += freq[w]; if (!seen[g]) { seen[g] = 1; st.shabd++; st.list.push(w); } }); });
  const meaning = w => String(D.lex[w]);
  const okMeaning = w => { const m = meaning(w); return m.length <= 22 && m.charAt(0) !== "(" && !/[A-Za-z]/.test(m); };
  const usable = w => GR[w] && !mat[w] && /^[\p{L}\p{M}]+$/u.test(w) && GR[w].every(g => cardOf[g]) && printOk(w);
  const posOf = (w, g) => { const a = GR[w]; if (a.length === 1) return "A"; const i = a.indexOf(g); return i === 0 ? "S" : i === a.length - 1 ? "E" : "M"; };
  const mk = (w, g) => ({ w: w, dev: Y.word(w), arth: meaning(w), tukde: GR[w].slice(), pos: g ? posOf(w, g) : "", baar: freq[w] });

  /* हर कार्ड के शब्द: शुरू / बीच / अंत से एक-एक, फिर सबसे ज़्यादा आने वाला। कम शब्दों वाली आवाज़ पहले चुनती है (दोहराव कम)। */
  const used = {}; const pick = {};
  const order = D.dhvani.slice().sort((a, b) => ((stat[a.g] || { shabd: 0 }).shabd - (stat[b.g] || { shabd: 0 }).shabd) || (a.g < b.g ? -1 : 1));
  order.forEach(s => {
    const all = ((stat[s.g] || { list: [] }).list).filter(w => usable(w)).sort((a, b) => (freq[b] - freq[a]) || (a < b ? -1 : 1));
    const cand = all.filter(w => GR[w].length <= 6);
    const good = cand.filter(okMeaning), chosen = [];
    const take = (pool, pos) => { const w = pool.find(x => !chosen.includes(x) && !used[x] && (!pos || posOf(x, s.g) === pos)); if (w) chosen.push(w); return !!w; };
    ["A", "S", "M", "E"].forEach(p => { if (chosen.length < 4) take(good, p); });
    while (chosen.length < 4 && take(good, null)) { /* भरते रहो */ }
    if (chosen.length < 2) { const loose = pool => { const w = pool.find(x => !chosen.includes(x)); if (w) chosen.push(w); return !!w; }; while (chosen.length < 4 && loose(good)) { } while (chosen.length < 2 && loose(cand)) { } while (chosen.length < 2 && loose(all)) { } }
    chosen.forEach(w => used[w] = 1);
    const rank = { A: 0, S: 1, M: 2, E: 3 };
    pick[s.g] = chosen.map(w => mk(w, s.g)).sort((a, b) => rank[a.pos] - rank[b.pos] || (b.baar - a.baar));
  });

  /* कार्ड-सूची: समूह-क्रम से, कोड dk01… */
  const cards = []; let n = 0;
  D.samuh.forEach(gp => D.dhvani.filter(s => s.grp === gp.id).forEach(s => {
    n++; const st = stat[s.g] || { shabd: 0, baar: 0 };
    cards.push({ g: s.g, cap: show(s.g).charAt(0).toUpperCase() + show(s.g).slice(1), dev: s.dev, likha: show(s.g), chinh: s.chinh || "", kam: !!kamS[s.g], ipa: s.ipa, grp: gp, src: s.src || [], kaise: s.kaise, dhyan: s.dhyan || "", hindi: s.hindi || "", matbhed: s.matbhed || "",
      jaanch: s.jaanch || null, kod: "dk" + two(n), id: "dk-" + two(n), shabd: pick[s.g] || [], nShabd: st.shabd, nBaar: st.baar,
      lagbhag: IPA.LAGBHAG[s.ipa] || "", bahu: Array.from(show(s.g)).length > 1 });
  }));
  const byG = {}; cards.forEach(c => byG[c.g] = c);

  /* मिलती-जुलती आवाज़ें: सिर्फ़ एक आवाज़ के फ़र्क़ वाले शब्द-जोड़े (कोर्स से ख़ुद खोजे) */
  const index = {}; /* "टुकड़े जिनमें i-वाँ ख़ाली" → {आवाज़: शब्द} */
  words.forEach(w => { if (!usable(w) || !okMeaning(w)) return; const a = GR[w]; if (a.length > 6) return;
    a.forEach((g, i) => { const k = a.slice(0, i).join("\u0001") + "\u0002" + a.slice(i + 1).join("\u0001") + "\u0003" + a.length; (index[k] = index[k] || {})[g] = (index[k][g] && freq[index[k][g]] >= freq[w]) ? index[k][g] : w; }); });
  const milti = (D.milti || []).map(m => {
    const jode = [];
    for (let i = 0; i < m.g.length; i++) for (let j = i + 1; j < m.g.length; j++) {
      let best = null;
      Object.keys(index).forEach(k => { const e = index[k]; if (e[m.g[i]] && e[m.g[j]]) { const sc = Math.min(freq[e[m.g[i]]], freq[e[m.g[j]]]); if (!best || sc > best.sc || (sc === best.sc && e[m.g[i]] < best.a)) best = { sc: sc, a: e[m.g[i]], b: e[m.g[j]] }; } });
      if (best) jode.push([mk(best.a, m.g[i]), mk(best.b, m.g[j])]);
    }
    return { g: m.g, farq: m.farq, cards: m.g.map(g => byG[g]), jode: jode.slice(0, 2),
      ek: m.g.map(g => (byG[g] && byG[g].shabd[0]) || null) };
  });

  /* नाक-नियम के उदाहरण */
  const naak = D.naakNiyam ? { baat: D.naakNiyam.baat, udaharan: D.naakNiyam.udaharan.map(w => mk(w, null)) } : null;
  const niyam = (D.niyam || []).map(n => ({ sheershak: n.sheershak, baat: n.baat, udaharan: (n.udaharan || []).map(w => mk(w, null)) }));

  /* अकेले न आने वाले अक्षर: कोर्स के शब्दों से गिनती (कार्ड-इकाइयों के बाहर वह अक्षर कितने शब्दों में) */
  const alag = (D.alag || []).map(a => {
    const bahar = []; let andar = 0;
    words.forEach(w => { if (!GR[w]) return; GR[w].forEach(g => { if (g.indexOf(a.l) < 0) return; if (a.sirf.indexOf(g) >= 0) andar += freq[w]; else if (bahar.indexOf(w) < 0) bahar.push(w); }); });
    return { l: a.l, sirf: a.sirf, baat: a.baat, src: a.src || [], apvaad: a.apvaad || [], bahar: bahar, andar: andar };
  });

  /* जिन इकाइयों का कार्ड नहीं */
  const beCard = Object.keys(stat).filter(g => !cardOf[g]).map(g => ({ g: g, shabd: stat[g].shabd, baar: stat[g].baar, list: stat[g].list.slice(0, 6) }));

  /* अंक */
  const ank = (D.ank || []).map((w, i) => ({ d: String(i), w: w, dev: D.lex[w] !== undefined ? Y.word(w) : "", arth: D.lex[w] !== undefined ? meaning(w) : "", hi: HINAME[i], tukde: GR[w] || [] }));

  /* रोज़ की योजना: हर दिन 2 आवाज़ें, इस तरह कि हर दिन नए असली शब्द पढ़े जा सकें */
  const known = {}; const left = cards.map(c => c.g); const din = [];
  const decodable = w => usable(w) && okMeaning(w) && GR[w].every(g => known[g]);
  const gain = g => { let t = 0; known[g] = 1; words.forEach(w => { if (GR[w] && GR[w].indexOf(g) >= 0 && decodable(w)) t += freq[w]; }); delete known[g]; return t; };
  while (left.length) {
    const today = [];
    for (let k = 0; k < 2 && left.length; k++) {
      let bi = 0, bs = -1;
      left.forEach((g, i) => { const sc = gain(g) * 1000 + (stat[g] ? stat[g].baar : 0) / 100; if (sc > bs) { bs = sc; bi = i; } });
      const g = left.splice(bi, 1)[0]; known[g] = 1; today.push(g);
    }
    const ws = words.filter(w => decodable(w) && today.some(g => GR[w].indexOf(g) >= 0)).sort((a, b) => (freq[b] - freq[a]) || (a < b ? -1 : 1)).slice(0, 3).map(w => mk(w, null));
    din.push({ g: today, shabd: ws });
  }

  /* अभ्यास के शब्द: जोड़े-अक्षर वाले, 3 से 5 टुकड़े, कार्ड पर न छपे हों */
  const multi = w => GR[w].some(g => Array.from(g).length > 1);
  const exPool = words.filter(w => usable(w) && okMeaning(w) && GR[w].length >= 3 && GR[w].length <= 5 && multi(w) && !used[w])
    .sort((a, b) => (freq[b] - freq[a]) || (a < b ? -1 : 1));
  const todo = exPool.filter((w, i) => i % 2 === 0).slice(0, 8).map(w => mk(w, null));
  const jodo = exPool.filter((w, i) => i % 2 === 1).slice(0, 8).map(w => mk(w, null));

  /* अक्षर-रूपों का हिसाब */
  const chars = {}; cards.forEach(c => Array.from(show(c.g)).forEach(ch => chars[ch] = 1));
  const saade = Object.keys(chars).filter(ch => /^[a-z]$/.test(ch)).sort();
  const nishan = Object.keys(chars).filter(ch => !/^[a-z]$/.test(ch)).sort((a, b) => a.localeCompare(b, "fr"));
  nishan.forEach(ch => { const base = ch.normalize("NFD").charAt(0); if (/^[a-z]$/.test(base) && saade.indexOf(base) < 0) saade.push(base); });
  saade.sort();

  return { ver: VER, code: L.code, cards: cards, byG: byG, GR: GR, freq: freq, words: words, stat: stat, milti: milti, naak: naak, niyam: niyam, alag: alag, beCard: beCard, ank: ank,
    show: show, chhapai: CH, printOk: printOk,
    din: din, todo: todo, jodo: jodo, saade: saade, nishan: nishan, nVakya: lines.length, nShabd: words.length, bad: bad, used: used,
    nDin: din.length + 3, baaki: D.baaki || [] };
}

/* ---- अक्षर-आकृति (SVG): आकृति एक बार <defs> में, हर जगह <use> से। पन्ना हल्का रहता है। ---- */
function glyphKit(G) {
  const used = {};
  const gid = ch => "ldg-" + ch.codePointAt(0).toString(16);
  function svg(str, mode, size) {
    const H = G.asc - G.desc, sc = size / H, y = v => ((G.asc - v) * sc).toFixed(1);
    let x = 70, uses = "";
    Array.from(str).forEach(ch => { const g = G.glyphs[ch]; if (!g) throw new Error("अक्षर-आकृति नहीं: " + ch); used[ch] = 1;
      uses += '<use href="#' + gid(ch) + '" transform="translate(' + (x * sc).toFixed(1) + "," + (G.asc * sc).toFixed(1) + ") scale(" + sc.toFixed(4) + ",-" + sc.toFixed(4) + ')"/>'; x += g.w; });
    const W = Math.round(Math.max(x + 70, 420) * sc), Hh = Math.round(H * sc);
    const guides = [[G.capHeight, "l-top"], [G.xHeight, "l-mid"], [0, "l-base"], [G.desc, "l-bot"]].map(l => '<line x1="0" x2="' + W + '" y1="' + y(l[0]) + '" y2="' + y(l[0]) + '" class="' + l[1] + '"/>').join("");
    return '<svg class="ld-gl g-' + mode + '" viewBox="0 0 ' + W + " " + Hh + '" width="' + W + '" height="' + Hh + '" aria-hidden="true" focusable="false">' + guides + uses + "</svg>";
  }
  function trace(str, n, size) { let s = svg(str, "faint", size); for (let i = 0; i < n; i++) s += svg(str, "dot", size); return '<div class="ld-trace">' + s + '<div class="ld-blank" style="height:' + size + 'px"></div></div>'; }
  function defs() { return '<svg class="ld-defs" width="0" height="0" aria-hidden="true" focusable="false"><defs>' + Object.keys(used).sort().map(ch => '<path id="' + gid(ch) + '" d="' + G.glyphs[ch].d + '" vector-effect="non-scaling-stroke"/>').join("") + "</defs></svg>"; }
  return { svg: svg, trace: trace, defs: defs, used: used };
}

function waNumber() {
  const m = fs.readFileSync(path.join(ROOT, "assets", "acs-config.js"), "utf8").match(/whatsapp:\s*"(https:\/\/wa\.me\/\d+)"/);
  if (!m) throw new Error("acs-config.js में WhatsApp नंबर नहीं मिला");
  return m[1];
}

/* ---- पन्ने का बीच का हिस्सा ---- */
/* रजिस्ट्रेशन की अपील: 3 जगह (ब्रांड-नियम 27-Oct)। पुराने यंत्र के डिब्बे जैसा ही रूप, पर पाठ में लंबी डैश नहीं। */
function regBox(L, where) {
  const t = where === "top" ? "यह पन्ना मुफ़्त है, और " + L.hi + " बोलने का पूरा कोर्स भी मुफ़्त है।"
    : where === "mid" ? "स्वर पहचान लिए? रजिस्ट्रेशन कर लो, ताकि पढ़ाई और परीक्षा का हिसाब तुम्हारे नाम से रहे।"
    : "सब आवाज़ें देख लीं। अब " + L.hi + " बोलना सीखो और परीक्षा देकर प्रमाणपत्र लो।";
  return '<div class="lipi-reg" style="background:#F5F7FA;color:#0B1F3A;border:2px solid #2E7D32;border-radius:12px;padding:12px 14px;margin:14px 0;font-size:18px;line-height:1.7">📝 <b>' + esc(t) + '</b> रजिस्ट्रेशन मुफ़्त है। <a href="/join.html" style="color:#2E7D32;font-weight:800">मुफ़्त रजिस्ट्रेशन करो →</a></div>';
}

function buildContent(L, G, D, M) {
  const K = glyphKit(G), WA = waNumber(), base = "/courses/hi/bhasha/" + L.slug + "/", url = "https://acslearn.com" + base + "lipi/";
  const cr = (t, cls) => '<span class="notranslate' + (cls ? " " + cls : "") + '" lang="' + D.bcp47 + '" translate="no">' + esc(t) + "</span>";
  const fmt = t => esc(t).replace(/\{([^}]+)\}/g, (m0, x) => cr(x));   /* data में {ou} = क्रियोल टुकड़ा */
  const srcLinks = ids => ids.map(id => { const s = D.srot[id]; return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.naam) + "</a>"; }).join(" · ");
  const show = M.show;
  const split = (tk, hl) => { let done = false; return tk.map(g => { if (g === hl && !done) { done = true; return '<b class="ld-hl">' + esc(show(g)) + "</b>"; } return esc(show(g)); }).join('<i aria-hidden="true">·</i>'); };
  const sun = (pron, label, cls) => '<button type="button" class="' + (cls || "ld-ic") + ' ld-sun" data-pron="' + esc(pron) + '" aria-label="' + esc(label) + '">🔊' + (cls ? " सुनो" : "") + "</button>";
  const bol = (t, pron, label, cls) => '<button type="button" class="' + (cls || "ld-ic") + ' ld-bol" data-w="' + esc(t) + '" data-pron="' + esc(pron) + '" aria-label="' + esc(label) + '">🎙️' + (cls ? " बोलो" : "") + "</button>";
  const wordTile = (x, hl) => '<div class="ld-w">' + (x.pos ? '<span class="ld-pos">' + POS[x.pos] + "</span>" : "") +
    cr(x.w, "ld-wl") + '<span class="notranslate ld-ws" lang="' + D.bcp47 + '" translate="no" aria-hidden="true">' + split(x.tukde, hl) + "</span>" +
    '<span class="ld-wd">' + esc(x.dev) + '</span><span class="ld-wm">' + esc(x.arth) + '</span><span class="ld-wb">' +
    sun(x.dev, "शब्द " + x.w + " सुनो: " + x.dev) + bol(x.w, x.dev, "शब्द " + x.w + " बोलकर देखो") + "</span></div>";
  const wa = (kod, line) => WA + "?text=" + encodeURIComponent("🔎 ACS ध्वनि-कार्ड जाँच\nभाषा: " + L.hi + " (" + L.code + ")\nकार्ड: " + kod + " : " + line + "\nपता: " + url + "\nमुझे यह ग़लत लगा: ");
  const nC = M.cards.length, nBahu = M.cards.filter(c => c.bahu).length;
  const maxL = Math.max.apply(null, M.cards.map(c => Array.from(c.likha).length)), do3 = maxL >= 3 ? "2 या 3" : "2";
  let h = "";
  h += '<article class="lipi-wrap ld-wrap" data-dhvani="' + VER + '" data-lang="' + esc(L.code) + '">';

  /* --- शीर्ष --- */
  h += '<header class="lipi-head"><p class="lipi-crumb"><a href="/courses/hi/">कोर्स</a> › <a href="' + base + '">' + L.hi + " बोलने का कोर्स</a> › लिपि-परिचय</p>";
  h += "<h1>" + L.hi + " की आवाज़ें और अक्षर: ध्वनि-कार्ड (" + L.en + " Sound Cards)</h1>";
  h += '<p class="lipi-lead">यहाँ हर आवाज़ का अपना बड़ा कार्ड है। कार्ड पर अक्षर है, उसकी आवाज़ देवनागरी में है, और उसी आवाज़ वाले शब्द हैं।</p>';
  h += '<ol class="ld-steps"><li><b>देखो</b> अक्षर और उसकी आवाज़।</li><li><b>सुनो</b> 🔊 दबाकर।</li><li><b>बोलो</b> 🎙️ दबाकर, और अपनी आवाज़ मिलाओ।</li><li><b>लिखो</b> बिंदुओं पर कलम फेरकर।</li></ol>';
  h += '<p class="lipi-lead">कुल ' + nC + " कार्ड हैं। रोज़ 2 कार्ड करो। " + M.nDin + " दिन में पूरी लिखाई पढ़ने लगोगे।</p>";
  h += '<div class="lipi-actions"><a class="lipi-btn" href="#ld-suchi">📇 सब आवाज़ें देखो</a><button type="button" class="lipi-btn ld-btn3" onclick="window.print()">🖨️ छापो या पीडीएफ़ (PDF) बनाओ</button><a class="lipi-btn lipi-btn2" href="' + base + '">🗣️ बोलने का कोर्स</a></div>';
  h += '<p class="lipi-note">मूल भाषा: हिंदी।</p>';
  h += '<p class="lipi-note">आवाज़ों का स्रोत: ' + srcLinks(Object.keys(D.srot)) + "। ये बाहरी साइटें हैं: जानकारी ख़ुद भी जाँच लें।</p>";
  h += '<p class="lipi-note">देवनागरी रूप एसीएस (ACS) ने बनाए हैं। यह एआई (AI) की मदद से बना मसौदा है: मूल-वक्ता की जाँच अभी बाक़ी है। जानकारी जाँची: ' + esc(D.jaanchi) + "।</p></header>" + regBox(L, "top");

  /* --- 1. कैसे पढ़ें --- */
  const demo = (D.demo && M.byG[D.demo]) || M.byG[(M.cards.find(c => c.bahu && c.grp.id === "swar") || M.cards.find(c => c.bahu) || M.cards[0]).g];
  h += '<section class="lipi-sec" id="ld-kaise"><h2>1. यह पन्ना कैसे पढ़ें</h2>';
  h += "<p>इस लिखाई में एक आवाज़ कभी 1 अक्षर से लिखी जाती है, कभी " + do3 + " अक्षरों से। जैसे " + cr(demo.likha) + " दो अक्षर हैं, पर आवाज़ एक है: " + esc(demo.dev) + "।</p>";
  h += "<p>इसलिए यहाँ अक्षर-क्रम (" + cr("A, B, C") + ") नहीं है। यहाँ आवाज़ों का क्रम है। " + nC + " आवाज़ों में से " + nBahu + " आवाज़ें " + do3 + " अक्षरों से लिखी जाती हैं।</p>";
  h += "<p>यह लिखाई रोमन लिपि (Latin) में है, यानी वही अक्षर-रूप जिनसे अंग्रेज़ी लिखी जाती है। इसमें " + M.saade.length + " सादे अक्षर काम आते हैं" + (M.nishan.length ? ", और " + M.nishan.length + " रूप ऊपर निशान वाले हैं: " + M.nishan.map(x => cr(x)).join(", ") : "") + "।</p>";
  h += "<p>" + (D.ekRoopBaat ? fmt(D.ekRoopBaat) : "यह बाएँ से दाएँ लिखी जाती है, हिंदी की तरह। हर अक्षर हमेशा एक ही तरह बोला जाता है। अंग्रेज़ी की तरह आवाज़ बदलती नहीं।") + "</p>";
  h += "<p>अक्षरों के नाम यहाँ नहीं दिए हैं। पढ़ने के लिए आवाज़ चाहिए, नाम नहीं।</p>";
  h += '<div class="ld-sach" role="note"><p><b>🔊 की सच्ची बात</b></p>' + (D.sach ? D.sach.map(t => "<p>" + fmt(t) + "</p>").join("") : '<p>इस भाषा की मशीन-आवाज़ किसी फ़ोन में नहीं है।</p><p>🔊 दबाने पर देवनागरी उच्चारण हिंदी आवाज़ में सुनाई देता है। यह असली ' + L.hi + ' आवाज़ नहीं है।</p><p>इसे सहारा मानो। हर कार्ड की "कैसे बोलें" पंक्ति पढ़कर बोलो।</p><p>अकेला व्यंजन सुनते समय पीछे हल्का अ सुनाई देगा, जैसे क। शब्द के भीतर वह अ नहीं बोलना है।</p>') + '<p id="ld-awaz-haal" aria-live="polite"></p></div>';
  h += "</section>";

  /* --- 2. सूची --- */
  h += '<section class="lipi-sec" id="ld-suchi"><h2>2. सब आवाज़ें एक नज़र में</h2><p>किसी आवाज़ को छुओ, उसका कार्ड खुल जाएगा। रंग समूह बताता है: ' + esc(D.rangBaat || "सुनहरा = खुले स्वर, हरा = नाक वाले स्वर, नीला = बाक़ी आवाज़ें।") + '</p>';
  D.samuh.forEach(gp => { const cs = M.cards.filter(c => c.grp.id === gp.id); if (!cs.length) return;
    h += '<h3 class="ld-gh">' + esc(gp.naam) + " (" + cs.length + ')</h3><div class="ld-chips">' + cs.map(c => '<a class="ld-chip ld-' + gp.rang + '" href="#' + c.id + '" aria-label="' + esc(c.likha + " की आवाज़ " + c.dev + ", कार्ड " + c.kod.slice(2)) + '">' + cr(c.likha, "ld-cg") + '<span class="ld-cd">' + esc(c.dev) + "</span></a>").join("") + "</div>"; });
  h += "</section>";

  /* --- 3. कार्ड --- */
  h += '<section class="lipi-sec" id="ld-cards"><h2>3. ध्वनि-कार्ड</h2>';
  D.samuh.forEach((gp, gi) => { const cs = M.cards.filter(c => c.grp.id === gp.id); if (!cs.length) return;
    /* हर समूह के कार्ड एक डिब्बे (ld-grp) में: चौड़ी स्क्रीन पर एक पंक्ति में 2 कार्ड, अकेला बचा कार्ड बीच में; फ़ोन पर 1 कार्ड */
    h += '<h3 class="ld-gh" id="ld-g-' + gp.id + '">' + esc(gp.naam) + '</h3><p class="ld-gb">' + fmt(gp.baat) + '</p><div class="ld-grp">';
    cs.forEach(c => {
      h += '<section class="ld-card ld-' + gp.rang + '" id="' + c.id + '" data-kod="' + c.kod + '" data-g="' + esc(c.g) + '" data-pron="' + esc(c.dev) + '" aria-label="' + esc("कार्ड " + c.kod.slice(2) + ": " + c.likha + " की आवाज़ " + c.dev) + '">';
      h += '<p class="ld-top"><span class="ld-tag">' + esc(gp.naam) + '</span><span class="ld-kod">कार्ड ' + c.kod.slice(2) + " / " + two(nC) + "</span></p>";
      h += '<div class="ld-eq"><div class="ld-g">' + cr(c.likha, "ld-big") + '<span class="ld-sm">' + (c.bahu ? Array.from(c.likha).length + " अक्षर, 1 आवाज़" : "अक्षर") + "</span>" + (c.chinh ? '<span class="ld-sm">' + esc(c.chinh) + "</span>" : "") + '<span class="ld-sm">बड़ा रूप: ' + cr(c.cap) + '</span></div><div class="ld-barabar" aria-hidden="true">=</div><div class="ld-d"><span class="ld-big">' + esc(c.dev) + '</span><span class="ld-sm">आवाज़</span></div></div>';
      h += '<div class="ld-btns">' + sun(c.dev, c.likha + " की आवाज़ सुनो: " + c.dev, "ld-bt") + bol(c.likha, c.dev, c.likha + " की आवाज़ बोलकर देखो", "ld-bt") + "</div>";
      h += '<div class="ld-host" data-bolo-host="1"></div>';
      h += '<p class="ld-kaise"><b>कैसे बोलें:</b> ' + fmt(c.kaise) + (c.hindi ? " हिंदी में यह आवाज़ <b>" + esc(c.hindi) + "</b> शब्द में है।" : " हिंदी में यह आवाज़ नहीं है।") + "</p>";
      if (c.dhyan) h += '<p class="ld-dhyan"><b>ध्यान:</b> ' + fmt(c.dhyan) + "</p>";
      if (c.lagbhag) h += '<p class="ld-lag"><b>लगभग:</b> ' + fmt(c.lagbhag) + "।</p>";
      h += '<h4 class="ld-h4">इस आवाज़ वाले शब्द</h4><div class="ld-words">' + c.shabd.map(x => wordTile(x, c.g)).join("") + "</div>";
      if (c.shabd.length === 1) h += '<p class="ld-lag">कोर्स में यह आवाज़ अभी सिर्फ़ एक शब्द में है।</p>';
      h += '<div class="ld-host" data-bolo-host="1"></div>';
      h += '<h4 class="ld-h4">लिखो: पहले हल्के रूप पर, फिर बिंदुओं पर, फिर ख़ाली जगह में</h4>' + K.trace(c.likha, 3, 72);
      h += '<details class="ld-saboot"><summary>सबूत और जाँच देखो</summary><ul>';
      h += '<li>अंतरराष्ट्रीय ध्वनि-चिह्न (IPA): <span class="notranslate ld-ipa" lang="und-fonipa" translate="no">' + esc(c.ipa) + "</span></li>";
      h += "<li>स्रोत: " + srcLinks(c.src) + "</li>";
      h += "<li>कोर्स में यह आवाज़ " + num(c.nShabd) + " शब्दों में है, और कुल " + num(c.nBaar) + " बार आई है।</li>";
      h += "<li>यंत्र की जाँच: स्रोत से निकला रूप और कोर्स का रूप, दोनों " + esc(c.dev) + " हैं।</li>";
      if (c.matbhed) h += "<li>स्रोतों में फ़र्क़: " + fmt(c.matbhed) + "</li>";
      h += "<li>मूल-वक्ता की जाँच: " + (c.jaanch ? "हो गई (" + esc(c.jaanch.kisne) + ", " + esc(c.jaanch.kab) + ")।" : "अभी बाक़ी है।") + "</li></ul></details>";
      h += '<p class="ld-galat"><a class="ld-galat-a" href="' + esc(wa(c.kod, c.likha + " = " + c.dev)) + '" target="_blank" rel="noopener">⚠️ यह आवाज़ ग़लत लगी? व्हाट्सऐप (WhatsApp) पर बताओ</a></p>';
      h += "</section>";
    });
    h += "</div>";
    if (gi === 1) h += regBox(L, "mid");
  });
  h += "</section>";

  /* --- 4. मिलती-जुलती --- */
  h += '<section class="lipi-sec" id="ld-milti"><h2>4. मिलती-जुलती आवाज़ें: फ़र्क़ पहचानो</h2><p>इन्हें साथ-साथ सुनो और बोलो। फ़र्क़ कान में बैठ जाएगा।</p>';
  M.milti.forEach((m, i) => {
    const dupL = c => m.cards.filter(x => x.likha === c.likha).length > 1;   /* एक ही अक्षर की दो आवाज़ें (मलय का e): शीर्षक में आवाज़ भी */
    h += '<div class="ld-mj" id="ld-mj-' + (i + 1) + '"><h3>' + m.cards.map(c => cr(c.likha) + (dupL(c) ? " (" + esc(c.dev) + ")" : "")).join(" · ") + '</h3><div class="ld-mj-row">' + m.cards.map(c => '<a class="ld-chip ld-' + c.grp.rang + '" href="#' + c.id + '" aria-label="' + esc(c.likha + " की आवाज़ " + c.dev) + '">' + cr(c.likha, "ld-cg") + '<span class="ld-cd">' + esc(c.dev) + "</span></a>").join("") + "</div>";
    h += '<p class="ld-farq"><b>फ़र्क़:</b> ' + fmt(m.farq) + "</p>";
    if (m.jode.length) h += '<p class="ld-h4">सिर्फ़ एक आवाज़ का फ़र्क़:</p>' + m.jode.map(j => '<div class="ld-words ld-jodi">' + wordTile(Object.assign({}, j[0], { pos: "" }), m.g.find(g => j[0].tukde.indexOf(g) >= 0 && j[1].tukde.indexOf(g) < 0) || "") + wordTile(Object.assign({}, j[1], { pos: "" }), m.g.find(g => j[1].tukde.indexOf(g) >= 0 && j[0].tukde.indexOf(g) < 0) || "") + "</div>").join("");
    else h += '<p class="ld-h4">हर आवाज़ का एक शब्द:</p><div class="ld-words">' + m.ek.filter(Boolean).map((x, k) => wordTile(Object.assign({}, x, { pos: "" }), m.cards[k].g)).join("") + "</div>";
    h += '<div class="ld-host" data-bolo-host="1"></div></div>';
  });
  h += "</section>";

  /* --- 5. नियम --- */
  /* खंड 5: याद रखने वाली बातें। गिनती और क्रम data से (fgc: नाक-नियम, अकेले न आने वाले अक्षर, ज़ोर, पक्की नहीं = चार) */
  const NB = [], niyamBlock = (t, baat, ud) => ({ t: t, h: "<ul class=\"lipi-plan\">" + baat.map(b => "<li>" + fmt(b) + "</li>").join("") + '</ul><div class="ld-words">' + ud.map(x => wordTile(Object.assign({}, x, { pos: "" }), "")).join("") + '</div><div class="ld-host" data-bolo-host="1"></div>' });
  if (M.naak) NB.push(niyamBlock("नाक वाला स्वर कब बनता है", M.naak.baat, M.naak.udaharan));
  M.niyam.forEach(n => NB.push(niyamBlock(fmt(n.sheershak), n.baat, n.udaharan)));
  NB.push({ t: esc(D.alagSheershak || "ये अक्षर अकेले नहीं आते"), h: "<ul class=\"lipi-plan\">" + M.alag.map(a => "<li>" + fmt(a.baat) + "</li>").join("") + "</ul>" });
  if (D.zor) NB.push({ t: "ज़ोर कहाँ पड़ता है", h: "<p>" + fmt(D.zor) + "</p>" });
  if (M.baaki.length) NB.push({ t: "एक बात अभी पक्की नहीं", h: M.baaki.map(b => '<p class="ld-lag">' + fmt(b.baat) + "</p>").join("") });
  const KRAM = ["क", "ख", "ग", "घ", "ङ", "च", "छ", "ज"];
  h += '<section class="lipi-sec" id="ld-niyam"><h2>5. ' + HINAME[NB.length] + " बातें जो याद रखनी हैं</h2>";
  NB.forEach((b, i) => { h += "<h3>" + KRAM[i] + ") " + b.t + "</h3>" + b.h; });
  h += "</section>";

  /* --- 6. अंक --- */
  h += '<section class="lipi-sec" id="ld-ank"><h2>6. अंक 0 से 9</h2><p>अंकों का रूप वही है जो आप रोज़ देखते हैं। नाम ' + L.hi + ' के हैं, इसी कोर्स से।</p><div class="ld-words ld-ank">';
  h += M.ank.map(a => '<div class="ld-w"><span class="ld-num">' + a.d + "</span>" + cr(a.w, "ld-wl") + '<span class="notranslate ld-ws" lang="' + D.bcp47 + '" translate="no" aria-hidden="true">' + split(a.tukde, "") + '</span><span class="ld-wd">' + esc(a.dev) + '</span><span class="ld-wm">' + esc(a.hi) + '</span><span class="ld-wb">' + sun(a.dev, "अंक " + a.d + " का नाम सुनो: " + a.dev) + bol(a.w, a.dev, "अंक " + a.d + " का नाम बोलकर देखो") + "</span></div>").join("");
  h += '</div><div class="ld-host" data-bolo-host="1"></div></section>';

  /* --- 7. बड़े अक्षर --- */
  const forms = M.saade.concat(M.nishan);
  h += '<section class="lipi-sec" id="ld-bade"><h2>7. बड़े अक्षर लिखो</h2><p>हर अक्षर के दो रूप होते हैं: छोटा और बड़ा। बड़ा रूप वाक्य के पहले शब्द में और नामों में आता है। आवाज़ वही रहती है।</p><div class="ld-caps">';
  h += forms.map(ch => '<div class="ld-cap"><p class="ld-capn">' + cr(ch.toUpperCase() + " " + ch) + "</p>" + K.trace(ch.toUpperCase(), 2, 64) + "</div>").join("");
  h += "</div></section>";

  /* --- 8. अभ्यास --- */
  const ekRoop = c => M.cards.filter(x => x.dev === c.dev).length === 1;   /* जिस देवनागरी रूप के दो अक्षर हों (व), वह सवाल नहीं बनता */
  const ask = M.cards.filter(c => ekRoop(c) && (c.bahu || c.lagbhag || !/^[a-z]$/.test(c.g))).slice(0, 12);
  h += '<section class="lipi-sec" id="ld-abhyas"><h2>8. अभ्यास</h2>';
  h += "<h3>क) आवाज़ देखो, उसके अक्षर लिखो</h3><div class=\"lipi-ex\">" + ask.map(c => '<span class="lipi-exi">' + esc(c.dev) + ' → <span class="lipi-box ld-box"></span></span>').join("") + "</div>";
  h += '<details class="ld-uttar"><summary>उत्तर देखो</summary><p>' + ask.map(c => esc(c.dev) + " = " + cr(c.likha)).join(" · ") + "</p></details>";
  h += "<h3>ख) शब्द को आवाज़ों में तोड़ो</h3><p>हर डिब्बे में एक आवाज़ लिखो। जोड़े-अक्षर एक ही डिब्बे में जाएँगे।</p><div class=\"lipi-ex\">" + M.todo.map(x => '<span class="lipi-exi">' + cr(x.w) + " → " + x.tukde.map(() => '<span class="lipi-box ld-box"></span>').join("") + "</span>").join("") + "</div>";
  h += '<details class="ld-uttar"><summary>उत्तर देखो</summary><ul>' + M.todo.map(x => "<li>" + cr(x.w) + " = " + cr(x.tukde.map(show).join(" · ")) + " = " + esc(x.dev) + " (" + esc(x.arth) + ")</li>").join("") + "</ul></details>";
  h += "<h3>ग) आवाज़ें जोड़कर शब्द पढ़ो</h3><p>पहले हर आवाज़ अलग बोलो, फिर सबको मिलाकर एक साँस में बोलो।</p><div class=\"lipi-ex\">" + M.jodo.map(x => '<span class="lipi-exi">' + cr(x.tukde.map(show).join(" · ")) + ' → <span class="lipi-box ld-box ld-box2"></span></span>').join("") + "</div>";
  h += '<details class="ld-uttar"><summary>उत्तर देखो</summary><ul>' + M.jodo.map(x => "<li>" + cr(x.tukde.map(show).join(" · ")) + " = " + cr(x.w) + " = " + esc(x.dev) + " (" + esc(x.arth) + ")</li>").join("") + "</ul></details>";
  h += "<h3>घ) अपना नाम लिखो</h3><p>इस लिखाई में ख, घ, ठ, ड़ जैसी हिंदी आवाज़ों के अक्षर नहीं हैं।</p><p>इसलिए अपना नाम वैसे ही लिखो, जैसे आधार या पासपोर्ट पर रोमन अक्षरों में लिखा है। जैसे: " + (D.naamLikho || []).map(nm => cr(nm)).join(", ") + '।</p><p>नीचे 3 बार लिखो।</p><div class="ld-blank ld-line"></div><div class="ld-blank ld-line"></div><div class="ld-blank ld-line"></div>';
  h += "</section>";

  /* --- 9. योजना --- */
  h += '<section class="lipi-sec" id="ld-yojana"><h2>9. ' + M.nDin + ' दिन की योजना</h2><p>रोज़ 2 आवाज़ें। क्रम ऐसा है कि पहले दिन से ही असली शब्द पढ़े जा सकें।</p><ol class="ld-din">';
  M.din.forEach(d => { h += "<li><b>" + d.g.map(g => '<a href="#' + M.byG[g].id + '">' + cr(show(g)) + " (" + esc(M.byG[g].dev) + ")</a>").join(" और ") + "</b>" + (d.shabd.length ? "<br>आज पढ़ो: " + d.shabd.map(x => cr(x.w) + " (" + esc(x.arth) + ")").join(", ") : "") + "</li>"; });
  h += '<li><b>मिलती-जुलती आवाज़ें</b><br>खंड 4 के सब जोड़े सुनो और बोलो।</li><li><b>अंक और बड़े अक्षर</b><br>खंड 6 और 7 करो।</li><li><b>दोहराओ</b><br>सब कार्ड बिना देखे बोलो, और खंड 8 का अभ्यास करो।</li></ol>';
  h += '<p>इसके बाद सीधे <a href="' + base + '">' + L.hi + " बोलने का कोर्स</a> दिन 1 से शुरू करो।</p></section>";

  /* --- 10. आगे --- */
  const nxt = [["chitra-pustak", "🖼️ चित्र-पुस्तक", "चित्र देखकर शब्द सीखो"], ["workbook", "✍️ लिखो-वर्कबुक", "वाक्य लिखने की किताब"], ["shabdkosh", "📖 शब्दकोश", "हर शब्द का अर्थ"], ["vyakaran", "📐 पहला व्याकरण", "वाक्य कैसे बनता है"]]
    .filter(x => fs.existsSync(path.join(ROOT, "courses/hi/bhasha", L.slug, x[0], "index.html")));
  h += '<section class="lipi-sec" id="ld-aage"><h2>10. इसके बाद क्या</h2><div class="ld-next">' + nxt.map(x => '<a class="ld-nx" href="' + base + x[0] + '/"><b>' + x[1] + "</b><span>" + x[2] + "</span></a>").join("") + "</div>";
  h += '<p class="lipi-note">यह पन्ना मुफ़्त है। इसका प्रमाणपत्र नहीं है। प्रमाणपत्र बोलने के कोर्स की परीक्षा से मिलता है।</p>';
  h += '<p class="lipi-note">पढ़ाने का ढंग "आवाज़ के हिसाब से सजावट" और "पहले आवाज़, फिर अक्षर" वाली रीति पर आधारित/प्रेरित है। यह किसी सरकारी पाठ्यक्रम का हिस्सा नहीं है।</p>';
  h += '<p class="lipi-note">अक्षरों का रूप नोटो सैन्स (Noto Sans) नाम के खुले फ़ॉन्ट से लिया गया है।</p></section>';
  h += regBox(L, "end");
  h += '<div class="acs-raay" data-page="ACS-LD-' + esc(L.code) + '" data-title="ध्वनि-कार्ड: ' + esc(L.hi) + '"></div>';
  h += K.defs();
  h += "</article>";
  return { html: h, count: nC, days: M.nDin, glyphs: Object.keys(K.used) };
}

module.exports = { VER: VER, has: has, load: load, makeModel: makeModel, buildContent: buildContent, corpus: corpus, chhapai: chhapai, IPA: IPA, HINAME: HINAME, esc: esc };
