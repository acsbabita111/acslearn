/* ============================================================
   build_menu_lang.js v1.1 (परत-4, 21-Nov-2026, खेप M-1; v1.1 = 22-Nov खेप N-1: कड़ी का पूरा पता (? समेत) भी अनुवाद-फ़ाइल की LINKS से बदल सकता है; translate/linkMap export, ताकि नेटवर्क के गहरे पन्नों का English ढाँचा इसी यंत्र से बने; बाक़ी व्यवहार वही) : मेन्यू के पन्ने दूसरी भाषा में
   Founder का आदेश (21-Nov-2026): पैनल की चारों भाषाओं (हिंदी, English, कन्नड़, बांग्ला) में मेन्यू का हर
   आइटम उसी भाषा के पन्ने पर खुले, उसका पूरा पन्ना बने।

   स्रोत = हिंदी पन्ना (मूल)। अनुवाद = generator/data/menu_lang/<पन्ना>.<भाषा>.js (हिंदी टुकड़ा → अनुवाद)।
   कौन-सा पन्ना, किस भाषा में, कहाँ: generator/lib_menu_lang.js (पते links.js से)।

   टुकड़े (unit) तीन तरह के, हिंदी पन्ने में जैसे लिखे हैं हूबहू वैसे:
     (क) पाठ: दो tag के बीच का लिखा (आगे-पीछे की ख़ाली जगह छोड़कर)।
     (ख) attribute का मान (aria-label, placeholder, content, title, alt …)।
     (ग) script के भीतर की string ("…" या '…'), और JSON-LD की string।
   हिंदी वाली टिप्पणियाँ (HTML की <!-- -->, script की दोनों तरह की टिप्पणियाँ) भाषा-पन्ने में नहीं जातीं।

   fail-closed जाँच (कोई एक भी टूटे, तो पन्ना नहीं लिखा जाता):
     1. हर हिंदी टुकड़े का अनुवाद हो; अनुवाद-फ़ाइल में कोई बेकार (पुराना) टुकड़ा न हो।
     2. हर टुकड़े के अंक अनुवाद में भी हों (NUM_OK सूची की छूट को छोड़कर)।
     3. पूरे पन्ने में देवनागरी शून्य (बांग्ला का "।" छूट); भाषा की अपनी लिपि मौजूद।
     4. हर script दोबारा Node से जाँची जाती है (syntax); JSON-LD JSON.parse से।
     5. <html lang>, canonical, og:url, og:locale उसी भाषा के; hreflang का पूरा गुच्छा।
   मेन्यू के पन्नों की कड़ियाँ (हिंदी पता → उसी भाषा का पता) links.js से अपने-आप बदलती हैं।
   हिंदी पन्ने में भी hreflang का गुच्छा (हाथ के बने पन्नों पर यही यंत्र लिखता है; verify पर build_specials.js)।

   चलाएँ:  node generator/build_menu_lang.js            (सब पन्ने)
           node generator/build_menu_lang.js --check    (कुछ नहीं लिखता; बासी हो तो FAIL)
           node generator/build_menu_lang.js verify     (सिर्फ़ एक पन्ना)
           node generator/build_menu_lang.js --units <पन्ना>   (हिंदी टुकड़ों की सूची, अनुवाद-फ़ाइल बनाने के लिए)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const M = require("./lib_menu_lang.js");
const ROOT = M.ROOT;
const CHECK = process.argv.indexOf("--check") > -1;
const UI = process.argv.indexOf("--units");
const DEV = /[ऀ-ॿ]/;

/* ---------- script (JS) के टुकड़े: string, टिप्पणी, regex, template (`…${…}…`, भीतर फिर code), बाक़ी code ---------- */
function jsScan(code) { const r = scanJS(code, 0, false); return r.toks; }
function scanJS(code, i, inBrace) {
  const toks = []; let buf = "", prevSig = "", prevWord = "", depth = 0;
  const n = code.length;
  const flush = () => { if (buf) { toks.push({ k: "code", v: buf }); buf = ""; } };
  const reOK = () => prevSig === "" || "(,=:[!&|?{};+-*%<>~^".indexOf(prevSig) > -1 ||
    /^(return|typeof|case|in|of|else|void|delete|new|do|throw)$/.test(prevWord);
  while (i < n) {
    const c = code[i], d = code[i + 1];
    if (inBrace && c === "}" && depth === 0) { flush(); return { toks, i }; }
    if (c === "/" && d === "/") { flush(); let j = code.indexOf("\n", i); if (j < 0) j = n; toks.push({ k: "cmt", v: code.slice(i, j) }); i = j; continue; }
    if (c === "/" && d === "*") { flush(); let j = code.indexOf("*/", i + 2); if (j < 0) throw new Error("script: टिप्पणी बंद नहीं"); j += 2; toks.push({ k: "cmt", v: code.slice(i, j) }); i = j; continue; }
    if (c === '"' || c === "'") {
      flush(); let j = i + 1;
      while (j < n) { if (code[j] === "\\") { j += 2; continue; } if (code[j] === c) break; if (code[j] === "\n") throw new Error("script: string बंद नहीं"); j++; }
      if (j >= n) throw new Error("script: string बंद नहीं");
      toks.push({ k: "str", q: c, v: code.slice(i + 1, j) }); i = j + 1; prevSig = c; prevWord = ""; continue;
    }
    if (c === "`") {
      flush(); const parts = []; let j = i + 1, q = "";
      for (;;) {
        if (j >= n) throw new Error("script: template बंद नहीं");
        if (code[j] === "\\") { q += code[j] + code[j + 1]; j += 2; continue; }
        if (code[j] === "`") { parts.push({ k: "q", v: q }); j++; break; }
        if (code[j] === "$" && code[j + 1] === "{") { parts.push({ k: "q", v: q }); q = ""; const r = scanJS(code, j + 2, true); parts.push({ k: "x", toks: r.toks }); j = r.i + 1; continue; }
        q += code[j]; j++;
      }
      toks.push({ k: "tpl", parts }); i = j; prevSig = "`"; prevWord = ""; continue;
    }
    if (c === "/" && reOK()) {
      flush(); let j = i + 1, cls = false;
      while (j < n) { const e = code[j]; if (e === "\\") { j += 2; continue; } if (e === "\n") throw new Error("script: regex बंद नहीं"); if (cls) { if (e === "]") cls = false; } else if (e === "[") cls = true; else if (e === "/") break; j++; }
      j++; while (j < n && /[a-z]/i.test(code[j])) j++;
      toks.push({ k: "re", v: code.slice(i, j) }); i = j; prevSig = "/"; prevWord = ""; continue;
    }
    if (c === "{") depth++;
    else if (c === "}") depth--;
    buf += c;
    if (/\s/.test(c)) { /* खाली जगह: पिछला चिह्न वही */ }
    else if (/[A-Za-z0-9_$]/.test(c)) { prevWord = (/[A-Za-z0-9_$]/.test(prevSig) ? prevWord : "") + c; prevSig = c; }
    else { prevSig = c; prevWord = ""; }
    i++;
  }
  if (inBrace) throw new Error("script: ${…} बंद नहीं");
  flush();
  return { toks, i };
}
/* हर string/template-हिस्से पर fn चलाकर code दोबारा जोड़ना (fn = null: सिर्फ़ गिनना) */
function jsEach(toks, onStr) {
  let out = "";
  for (const t of toks) {
    if (t.k === "cmt") out += onStr ? (DEV.test(t.v) ? (t.v.startsWith("/*") ? " " : "") : t.v) : "";
    else if (t.k === "str") out += t.q + (onStr ? onStr(t.v, t.q) : (onStrCount(t.v), t.v)) + t.q;
    else if (t.k === "tpl") {
      out += "`";
      for (const p of t.parts) { if (p.k === "q") out += onStr ? onStr(p.v, "`") : (onStrCount(p.v), p.v); else out += "${" + jsEach(p.toks, onStr) + "}"; }
      out += "`";
    } else out += t.v;
  }
  return out;
}
let onStrCount = () => {};
function jsQuote(t, q, unit) {
  if (/\n/.test(t) && q !== "`") throw new Error("अनुवाद में नई पंक्ति (script string): " + unit.slice(0, 60));
  let out = "", bs = 0;
  for (const ch of t) {
    if (ch === q && bs % 2 === 0) out += "\\";
    out += ch; bs = ch === "\\" ? bs + 1 : 0;
  }
  if (q === "`" && /\$\{/.test(out)) throw new Error("template के अनुवाद में ${ नहीं लिख सकते: " + unit.slice(0, 60));
  return out;
}

/* ---------- HTML के हिस्से ---------- */
const SEG = /<script\b([^>]*)>([\s\S]*?)<\/script>|<style\b([^>]*)>([\s\S]*?)<\/style>|<!--([\s\S]*?)-->/g;
function segments(html) {
  const out = []; let last = 0, m;
  SEG.lastIndex = 0;
  while ((m = SEG.exec(html))) {
    if (m.index > last) out.push({ k: "mk", v: html.slice(last, m.index) });
    if (m[2] !== undefined) out.push({ k: /ld\+json/.test(m[1]) ? "json" : (/\ssrc=/.test(m[1]) ? "ext" : "js"), attrs: m[1], v: m[2], mod: /type="module"/.test(m[1]) });
    else if (m[4] !== undefined) out.push({ k: "css", attrs: m[3], v: m[4] });
    else out.push({ k: "cmt", v: m[5] });
    last = SEG.lastIndex;
  }
  if (last < html.length) out.push({ k: "mk", v: html.slice(last) });
  return out;
}
/* markup: tag और उनके बीच का पाठ */
function mkWalk(s, onText, onAttr) {
  let out = "", i = 0;
  while (i < s.length) {
    const lt = s.indexOf("<", i);
    if (lt < 0) { out += onText(s.slice(i)); break; }
    out += onText(s.slice(i, lt));
    let j = lt + 1, q = "";
    while (j < s.length) { const c = s[j]; if (q) { if (c === q) q = ""; } else if (c === '"' || c === "'") q = c; else if (c === ">") break; j++; }
    const tag = s.slice(lt, j + 1);
    out += tag.replace(/(\s[\w:.-]+\s*=\s*)(?:"([^"]*)"|'([^']*)')/g, function (all, pre, v1, v2) {
      const v = v1 !== undefined ? v1 : v2, q2 = v1 !== undefined ? '"' : "'";
      const r = onAttr(v, pre.trim().replace(/\s*=$/, ""));
      return pre + q2 + r + q2;
    });
    i = j + 1;
  }
  return out;
}
function textUnit(raw, fn) {
  if (!DEV.test(raw)) return raw;
  const m = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
  return m[1] + fn(m[2]) + m[3];
}

/* ---------- एक पन्ने के सारे हिंदी टुकड़े (क्रम से) ---------- */
function collectUnits(html) {
  const units = [], seen = new Set();
  const add = (u, kind) => { if (!seen.has(u)) { seen.add(u); units.push({ u, kind }); } };
  for (const sg of segments(html)) {
    if (sg.k === "mk") mkWalk(sg.v, t => textUnit(t, x => { add(x, "text"); return x; }), v => { if (DEV.test(v)) add(v, "attr"); return v; });
    else if (sg.k === "js") { onStrCount = v => { if (DEV.test(v)) add(v, "js"); }; jsEach(jsScan(sg.v), null); onStrCount = () => {}; }
    else if (sg.k === "json") sg.v.replace(/"((?:[^"\\]|\\.)*)"/g, (a, v) => { if (DEV.test(v)) add(v, "json"); return a; });
    else if (sg.k === "css") { const c = sg.v.replace(/\/\*[\s\S]*?\*\//g, ""); if (DEV.test(c)) throw new Error("style में हिंदी (टिप्पणी के बाहर): अभी यंत्र नहीं संभालता"); }
  }
  return units;
}

/* ---------- अनुवाद ---------- */
function translate(html, T, links, used) {
  const tr = (u) => { if (!Object.prototype.hasOwnProperty.call(T, u)) throw new Error("अनुवाद नहीं मिला: " + u.slice(0, 80)); used.add(u); return T[u]; };
  /* v1.1: पहले पूरा पता हूबहू (जैसे "/join.html?role=workshop"), फिर सिर्फ़ पथ (बाक़ी ?… #… जस-का-तस) */
  const link = (v) => { if (Object.prototype.hasOwnProperty.call(links, v)) return links[v]; const m = /^([^?#]*)(.*)$/.exec(v); return Object.prototype.hasOwnProperty.call(links, m[1]) ? links[m[1]] + m[2] : v; };
  let out = "";
  for (const sg of segments(html)) {
    if (sg.k === "mk") {
      out += mkWalk(sg.v, t => textUnit(t, tr), (v, name) => {
        if (DEV.test(v)) { const r = tr(v); if (/"/.test(r)) throw new Error("attribute के अनुवाद में \" चिह्न: " + v.slice(0, 60)); return r; }
        return /^(href|action|data-href|data-all-url|data-test-url)$/.test(name) ? link(v) : v;
      });
    } else if (sg.k === "cmt") {
      if (!DEV.test(sg.v)) out += "<!--" + sg.v + "-->";
    } else if (sg.k === "css") {
      out += "<style" + sg.attrs + ">" + sg.v.replace(/\/\*[\s\S]*?\*\//g, c => DEV.test(c) ? "" : c) + "</style>";
    } else if (sg.k === "ext") {
      out += "<script" + sg.attrs + ">" + sg.v + "</script>";
    } else if (sg.k === "json") {
      const v = sg.v.replace(/"((?:[^"\\]|\\.)*)"/g, (a, s) => {
        if (!DEV.test(s)) return a;
        return JSON.stringify(tr(s));   /* JSON-LD का अनुवाद सादा पाठ लिखा जाता है; यहाँ JSON के नियम से */
      });
      try { JSON.parse(v); } catch (e) { throw new Error("JSON-LD टूटा: " + e.message); }
      out += "<script" + sg.attrs + ">" + v + "</script>";
    } else if (sg.k === "js") {
      const code = jsEach(jsScan(sg.v), (v, q) => {
        if (DEV.test(v)) return jsQuote(tr(v), q, v);
        if (q !== "`" && v.length > 1 && v[0] === "/") return link(v);   /* सिर्फ़ पूरे पते ("/" अकेला नहीं: split("/") जैसे code) */
        return v;
      });
      const r = cp.spawnSync(process.execPath, ["--check", "--input-type=" + (sg.mod ? "module" : "commonjs")], { input: code, encoding: "utf8" });
      if (r.status !== 0) throw new Error("script का syntax टूटा: " + (r.stderr || "").split("\n").slice(0, 5).join(" | "));
      out += "<script" + sg.attrs + ">" + code + "</script>";
    }
  }
  return out;
}
function digits(s) { return (s.match(/\d[\d,.]*/g) || []).map(x => x.replace(/[,.]+$/, "").replace(/,/g, "")); }

/* ---------- head: भाषा, पता, गुच्छा, फ़ॉन्ट ---------- */
function headFix(page, key, lang, url, L) {
  const one = (re, to, label) => { const m = page.match(re); if (!m || page.split(m[0]).length !== 2) throw new Error(label + ": ठीक एक बार नहीं मिला"); page = page.replace(re, to); };
  one(/<html lang="hi"/, '<html lang="' + lang + '"', "<html lang>");
  one(/<link rel="canonical" href="[^"]*"\s*\/?>/, '<link rel="canonical" href="https://acslearn.com' + url + '">', "canonical");
  page = page.replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, '<meta property="og:url" content="https://acslearn.com' + url + '">');
  page = page.replace(/<meta property="og:locale" content="[^"]*"\s*\/?>/, '<meta property="og:locale" content="' + M.LANGS[lang].locale + '">');
  page = setCluster(page, M.hreflangLines(L, key));
  const LG = M.LANGS[lang];
  page = page.replace(/&family=Noto\+Sans\+Devanagari:wght@[0-9;]+/g, LG.font).replace(/family=Noto\+Sans\+Devanagari:wght@[0-9;]+&/g, LG.font ? LG.font.slice(1) + "&" : "");
  page = page.split("Noto Sans Devanagari").join(LG.fontCss);
  if (LG.style) page = page.replace("</head>", "<style>" + LG.style + "</style>\n</head>");
  return page;
}
/* hreflang: पुरानी सब alternate-पंक्तियाँ हटाकर पूरा गुच्छा canonical के ठीक बाद */
function setCluster(page, lines) {
  page = page.replace(/[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*\/?>[ \t]*\r?\n?/g, "");
  const m = page.match(/<link rel="canonical" href="[^"]*"\s*\/?>/);
  if (!m) throw new Error("canonical नहीं मिला (hreflang कहाँ लिखें?)");
  return page.replace(m[0], m[0] + "\n" + lines.join("\n"));
}

/* ---------- पन्ने में पहले से लिखा मेन्यू (build_specials.js का): नाम और पता links.js से उस भाषा के ----------
   हिंदी पन्ने के <a class="acs-mitem" href="…"> वाले आइटम पहले निशान बनते हैं (अनुवाद-फ़ाइल में इनकी ज़रूरत नहीं),
   फिर उस भाषा का नाम (English: label_en, भाषा-घर: links.js की labels पंक्ति) और पता भरा जाता है। */
const MITEM = /<a class="acs-mitem" href="([^"]*)"><span class="e">([^<]*)<\/span> ([^<]*)<\/a>/g;
function menuMark(src, L) {
  return src.replace(MITEM, (all, href, icon) => {
    const m = L.menu.find(x => x.href === href);
    if (!m) throw new Error("पन्ने के मेन्यू में अनजान पता: " + href);
    return '<a class="acs-mitem" href="@@MHREF:' + m.key + '@@"><span class="e">' + icon + '</span> @@MLBL:' + m.key + '@@</a>';
  });
}
function menuFill(page, L, lang) {
  return page.replace(/@@MHREF:(\w+)@@/g, (a, k) => M.hrefOf(L, k, lang) || M.item(L, k).href_en || M.item(L, k).href)
    .replace(/@@MLBL:(\w+)@@/g, (a, k) => {
      const v = lang === "en" ? M.item(L, k).label_en : (L.labels && L.labels[lang] && L.labels[lang][k]);
      if (!v) throw new Error("links.js में मेन्यू-नाम नहीं: " + k + " (" + lang + ")");
      return v;
    });
}

/* ---------- एक पन्ना, एक भाषा ---------- */
function linkMap(L, lang) {
  const map = {};
  for (const m of L.menu) { const to = M.hrefOf(L, m.key, lang); if (to && to !== m.href) map[m.href] = to; }
  map["/"] = lang === "hi" ? "/" : "/" + lang + "/";
  return map;
}
function buildOne(key, lang, L, stats) {
  const P = M.PAGES[key];
  const url = M.hrefOf(L, key, lang);
  if (!url) throw new Error(key + "/" + lang + ": links.js में इस भाषा का पता नहीं");
  const D = require("./data/menu_lang/" + key + "." + lang + ".js");
  /* साझा ढाँचा (ऊपर की पट्टी, नीचे का हिस्सा, लॉगिन-खिड़की): हर पन्ने पर एक जैसा, इसलिए एक ही फ़ाइल _chrome.<भाषा>.js।
     पन्ने की अपनी फ़ाइल में वही टुकड़ा हो, तो पन्ने वाला चलता है। बेकार-टुकड़े की जाँच सिर्फ़ पन्ने की फ़ाइल पर। */
  const CHF = require("./data/menu_lang/_chrome." + lang + ".js"), CH = CHF.T || {};
  const EMPTY_OK = (D.EMPTY_OK || []).concat(CHF.EMPTY_OK || []);
  const src = menuMark(fs.readFileSync(path.join(ROOT, P.src), "utf8").replace(/\r\n/g, "\n"), L);
  const units = collectUnits(src);
  const own = D.T || {}, T = Object.assign({}, CH, own);
  const miss = units.filter(x => !Object.prototype.hasOwnProperty.call(T, x.u));
  if (miss.length) throw new Error(key + "/" + lang + ": " + miss.length + " टुकड़ों का अनुवाद नहीं। पहला: " + miss[0].u.slice(0, 80));
  const unitSet = new Set(units.map(x => x.u));
  const stale = Object.keys(own).filter(k => !unitSet.has(k));
  if (stale.length) throw new Error(key + "/" + lang + ": अनुवाद-फ़ाइल में " + stale.length + " बेकार टुकड़े (हिंदी पन्ना बदला?). पहला: " + stale[0].slice(0, 80));
  const NUM_OK = new Set(D.NUM_OK || []);
  for (const x of units) {
    if (NUM_OK.has(x.u)) continue;
    const want = digits(x.u), got = digits(T[x.u]);
    for (const d of want) { const k = got.indexOf(d); if (k < 0) throw new Error(key + "/" + lang + ": अंक \"" + d + "\" अनुवाद में नहीं: " + x.u.slice(0, 70)); got.splice(k, 1); }
    if (!String(T[x.u]).trim() && EMPTY_OK.indexOf(x.u) < 0) throw new Error(key + "/" + lang + ": ख़ाली अनुवाद: " + x.u.slice(0, 70));
  }
  const links = Object.assign(linkMap(L, lang), D.LINKS || {});
  const used = new Set();
  let page = translate(src, T, links, used);
  page = menuFill(headFix(page, key, lang, url, L), L, lang);
  /* पन्ने की अपनी ज़रूरत का data (जैसे नेटवर्क पर भूगोल के नाम): अनुवाद-फ़ाइल का INJECT(lang) → {at, html}; at ठीक एक बार */
  if (D.INJECT) { const j = D.INJECT(lang), c = page.split(j.at).length - 1; if (c !== 1) throw new Error(key + "/" + lang + ": INJECT की जगह ×" + c); page = page.replace(j.at, j.html + "\n" + j.at); }
  if (D.SWAPS) for (const s of D.SWAPS) { const c = page.split(s.from).length - 1; if (c !== (s.n || 1)) throw new Error(key + "/" + lang + ": swap \"" + s.from.slice(0, 40) + "\" ×" + c); page = page.split(s.from).join(s.to); }
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n<!-- generated by generator/build_menu_lang.js (page=" + key + ", lang=" + lang + ", from /" + P.src + "; strings: generator/data/menu_lang/" + key + "." + lang + ".js) : do not edit by hand -->");
  /* अंतिम जाँच */
  const dev = page.match(lang === "bn" ? /[ऀ-ॣ०-ॿ]/g : /[ऀ-ॿ]/g);
  if (dev) throw new Error(key + "/" + lang + ": पन्ने में देवनागरी बची (" + dev.length + "): " + (page.match(/.{0,30}[ऀ-ॿ].{0,30}/) || [""])[0]);
  if (M.LANGS[lang].script) { const k = (page.match(M.LANGS[lang].script) || []).length; if (k < 200) throw new Error(key + "/" + lang + ": अपनी लिपि के अक्षर बहुत कम (" + k + ")"); }
  if (/�/.test(page)) throw new Error(key + "/" + lang + ": टूटा अक्षर (U+FFFD)");
  if (page.indexOf('<html lang="' + lang + '"') < 0) throw new Error(key + "/" + lang + ": <html lang> नहीं");
  const file = path.join(ROOT, M.fileOf(url));
  const old = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : null;
  if (old !== null && old.replace(/\r\n/g, "\n") === page) { stats.same++; return; }   /* Windows की CRLF-प्रति भी "वही" */
  if (CHECK) { stats.stale.push(M.fileOf(url)); return; }
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page, "utf8"); stats.wrote.push(M.fileOf(url));
}
/* हिंदी (और हाथ के बने भाषा-) पन्नों में hreflang का गुच्छा: verify का हिंदी पन्ना build_specials.js लिखता है */
function syncCluster(key, L, stats) {
  const P = M.PAGES[key], lines = M.hreflangLines(L, key);
  const files = [P.src];
  if (P.hiOwner) {
    const s = fs.readFileSync(path.join(ROOT, P.src), "utf8");
    for (const l of lines) if (s.indexOf(l) < 0) throw new Error(key + ": हिंदी पन्ने में hreflang अधूरा: पहले " + P.hiOwner + " चलाएँ (" + l + ")");
    files.length = 0;
  }
  for (const c of M.cluster(L, key)) { if (c[0] !== "hi" && P.make.indexOf(c[0]) < 0) files.push(M.fileOf(c[1])); }
  for (const f of files) {
    const full = path.join(ROOT, f), s = fs.readFileSync(full, "utf8"), crlf = /\r\n/.test(s);
    let t = setCluster(s.replace(/\r\n/g, "\n"), lines); if (crlf) t = t.replace(/\n/g, "\r\n");
    if (t === s) { stats.same++; continue; }
    if (CHECK) { stats.stale.push(f); continue; }
    fs.writeFileSync(full, t, "utf8"); stats.wrote.push(f);
  }
}

/* ---------- दूसरे यंत्रों के लिए (v1.1, 22-Nov-2026, खेप N-1): नेटवर्क के गहरे पन्नों (generator/build_network.js) का
   English ढाँचा इसी अनुवाद-यंत्र और _chrome.en.js से बनता है (ढाँचे का अनुवाद एक ही जगह) ---------- */
module.exports = { translate, linkMap, DEV };
if (require.main !== module) return;

/* ---------- चलाना ---------- */
if (UI > -1) {
  const key = process.argv[UI + 1], P = M.PAGES[key];
  if (!P) { console.log("पन्ना नहीं: " + key + " (हैं: " + Object.keys(M.PAGES).join(", ") + ")"); process.exit(1); }
  const units = collectUnits(menuMark(fs.readFileSync(path.join(ROOT, P.src), "utf8").replace(/\r\n/g, "\n"), M.readLinks()));
  console.log(JSON.stringify(units, null, 1)); process.exit(0);
}
const L = M.readLinks();
const stats = { wrote: [], stale: [], same: 0 };
try {
  const ONLY = process.argv.slice(2).filter(a => !a.startsWith("--") && M.PAGES[a]);   /* जाँच के लिए: सिर्फ़ ये पन्ने */
  for (const key of Object.keys(M.PAGES)) {
    if (ONLY.length && ONLY.indexOf(key) < 0) continue;
    syncCluster(key, L, stats);
    for (const lang of M.PAGES[key].make) buildOne(key, lang, L, stats);
  }
} catch (e) { console.log("⛔ " + e.message); process.exit(1); }
if (CHECK) {
  if (stats.stale.length) { console.log("⛔ बासी (generator दोबारा चलाएँ): " + stats.stale.join(", ")); process.exit(1); }
  console.log("🏁 build_menu_lang --check: सब पन्ने generator से मेल खाते हैं (" + stats.same + ")"); process.exit(0);
}
stats.wrote.forEach(f => console.log("✅ लिखा: " + f));
console.log("🏁 build_menu_lang v1.1 : लिखे " + stats.wrote.length + ", पहले जैसे " + stats.same);
