#!/usr/bin/env node
/* ============================================================
   extract_server_msgs.js v1.2 (17-Nov-2026; v1.2 कक्षा-परत K-1b: bad("code", <संदेश>) भी पढ़ा जाता है; v1.1 15-Nov-2026, पैनल-3): server के वे हिंदी संदेश निकालना जो user को दिखते हैं।
   server की फ़ाइलें (functions\*.js) GitHub पर नहीं होतीं। इसलिए उनके संदेशों की सूची repo में अलग रखी जाती है:
     generator/data/panel_i18n/server_msgs.json   (सिर्फ़ संदेश; कोई कोड, कोई चाबी, कोई प्रश्न नहीं)
   English पैक का यंत्र (build_panel_i18n.js) इसी सूची से जाँचता है कि हर संदेश का English है।
   कौन-सी फ़ाइलें पढ़ी जाती हैं (v1.1): सिर्फ़ वे जो सचमुच server पर चलती हैं: index.js, और जो फ़ाइलें वह
     require("./...") से बुलाती है (और वे आगे जिन्हें बुलाएँ)। folder की बाक़ी फ़ाइलें (पुरानी backup प्रतियाँ,
     आज़माइश की फ़ाइलें) नहीं पढ़ी जातीं। प्रश्न-भंडार (*_bank.js) कभी नहीं पढ़ा जाता, बुलाया गया हो तब भी।
     (v1.0 folder की हर .js पढ़ता था: backup की पुरानी पंक्तियाँ गिन लेता था और भंडार-फ़ाइलें भी खोलता था।)
   क्या निकलता है: new HttpsError("...", <संदेश>) · bad("...", <संदेश>) · { msg: <संदेश> } · { refundNote: <संदेश> } · errors.push(<संदेश>)
   संदेश में जो हिस्सा बदलता है (संख्या, नाम, कारण), वह {0}, {1} ... बन जाता है।
   उपयोग:
     node generator/extract_server_msgs.js <functions folder>            : सूची छापता है (JSON)
     node generator/extract_server_msgs.js <functions folder> --write    : server_msgs.json लिखता है
     node generator/extract_server_msgs.js --merge <office की रिपोर्ट-फ़ाइल> <फ़ाइल1,फ़ाइल2>
         : office के laptop की रिपोर्ट (--check से बनी) के वे संदेश सूची में जोड़ता है जो गिनाई फ़ाइलों के हैं
           (जो server-फ़ाइलें यहाँ नहीं हैं, उनके संदेश ऐसे ही आते हैं)। ऐसे संदेश पर "from" लिखा रहता है,
           और --write उन्हें नहीं हटाता।
     node generator/extract_server_msgs.js <functions folder> --check [रिपोर्ट-फ़ाइल]
         : सिर्फ़ पढ़ता है। folder में कोई संदेश सूची से बाहर हो, तो उसे गिनाता है (और रिपोर्ट-फ़ाइल में लिखता है)।
           exit 0 = सब सूची में · exit 3 = कुछ संदेश सूची से बाहर · exit 1 = folder नहीं मिला
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const DEV = /[ऀ-ॿ]/;
const LIST = path.join(__dirname, "data", "panel_i18n", "server_msgs.json");

/* i पर खुला quote: उसके बंद होने के ठीक बाद का स्थान */
function skipStr(code, i) {
  const c = code[i], n = code.length; let j = i + 1;
  if (c === "`") { let d = 0;
    while (j < n) { if (code[j] === "\\") { j += 2; continue; }
      if (code[j] === "$" && code[j + 1] === "{") { d++; j += 2; continue; }
      if (d && code[j] === "{") d++; else if (d && code[j] === "}") d--; else if (!d && code[j] === "`") break; j++; }
    return j + 1; }
  while (j < n && code[j] !== c) { if (code[j] === "\\") j++; j++; }
  return j + 1;
}
/* start से: बराबर गहराई पर "," या बंद होते कोष्ठक तक का व्यंजक */
function readExpr(code, start, stopAtComma) {
  let i = start, dep = 0; const n = code.length;
  while (i < n) { const c = code[i];
    if (c === "'" || c === '"' || c === "`") { i = skipStr(code, i); continue; }
    if (c === "/" && code[i + 1] === "/") { const e = code.indexOf("\n", i); i = e < 0 ? n : e; continue; }
    if (c === "/" && code[i + 1] === "*") { const e = code.indexOf("*/", i + 2); i = e < 0 ? n : e + 2; continue; }
    if (c === "(" || c === "[" || c === "{") dep++;
    else if (c === ")" || c === "]" || c === "}") { if (!dep) break; dep--; }
    else if (c === "," && !dep && stopAtComma) break;
    else if (c === ";" && !dep) break;
    i++; }
  return { text: code.slice(start, i), end: i };
}
/* व्यंजक को ऊपरी स्तर के ? : || && पर तोड़ना (हर टुकड़ा एक संभव संदेश) */
function alternatives(expr) {
  const out = []; let i = 0, dep = 0, last = 0; const n = expr.length;
  while (i < n) { const c = expr[i];
    if (c === "'" || c === '"' || c === "`") { i = skipStr(expr, i); continue; }
    if (c === "(" || c === "[" || c === "{") dep++; else if (c === ")" || c === "]" || c === "}") dep--;
    else if (!dep && (c === "?" || c === ":" )) { if (!(c === "?" && expr[i + 1] === ".")) { out.push(expr.slice(last, i)); last = i + 1; } }
    else if (!dep && ((c === "|" && expr[i + 1] === "|") || (c === "&" && expr[i + 1] === "&"))) { out.push(expr.slice(last, i)); last = i + 2; i++; }
    i++; }
  out.push(expr.slice(last));
  /* कोष्ठक में लिपटा टुकड़ा ( a ? b : c ) : भीतर भी तोड़ो */
  const flat = [];
  for (let p of out) { p = p.trim(); if (/^\([\s\S]*\)$/.test(p) && p.indexOf("?") > -1 && balanced(p.slice(1, -1))) flat.push.apply(flat, alternatives(p.slice(1, -1))); else flat.push(p); }
  return flat;
}
function balanced(s) { let d = 0; for (let i = 0; i < s.length; i++) { const c = s[i]; if (c === "'" || c === '"' || c === "`") { i = skipStr(s, i) - 1; continue; } if (c === "(") d++; else if (c === ")") { d--; if (d < 0) return false; } } return d === 0; }
/* एक टुकड़े का संदेश: string जुड़ते हैं, बाक़ी सब {n} */
function template(expr) {
  let out = "", i = 0, k = 0; const n = expr.length;
  const dyn = () => { if (!/\{\d+\}$/.test(out)) out += "{" + (k++) + "}"; };
  while (i < n) { const c = expr[i];
    if (c === "'" || c === '"') { let j = i + 1; while (j < n && expr[j] !== c) { if (expr[j] === "\\") { out += (expr[j + 1] === "n" ? "\n" : expr[j + 1]); j += 2; continue; } out += expr[j]; j++; } i = j + 1; continue; }
    if (c === "`") { let j = i + 1;
      while (j < n && expr[j] !== "`") { if (expr[j] === "\\") { out += (expr[j + 1] === "n" ? "\n" : expr[j + 1]); j += 2; continue; }
        if (expr[j] === "$" && expr[j + 1] === "{") { let d = 1; j += 2; while (j < n && d) { if (expr[j] === "{") d++; else if (expr[j] === "}") d--; j++; } dyn(); continue; }
        out += expr[j]; j++; }
      i = j + 1; continue; }
    if (/[\s+]/.test(c)) { i++; continue; }
    let j = i, d = 0;
    while (j < n) { const x = expr[j]; if (x === "(" || x === "[") d++; else if (x === ")" || x === "]") { if (!d) break; d--; } else if (!d && (x === "+" || x === "'" || x === '"' || x === "`")) break; j++; }
    if (j === i) j++;
    dyn(); i = j; }
  return out.replace(/[ \t]+/g, " ").trim();
}
/* व्यंजक के ऊपरी स्तर के ( ... ) के भीतर का पाठ (string के बाहर) */
function parens(expr) {
  const out = []; let i = 0, dep = 0, st = -1; const n = expr.length;
  while (i < n) { const c = expr[i];
    if (c === "'" || c === '"' || c === "`") { i = skipStr(expr, i); continue; }
    if (c === "(") { if (!dep) st = i + 1; dep++; } else if (c === ")") { dep--; if (!dep && st > -1) { out.push(expr.slice(st, i)); st = -1; } }
    i++; }
  return out;
}
/* (v1.1) server पर सचमुच चलने वाली फ़ाइलें: index.js से शुरू, require("./...") के पीछे-पीछे। *_bank.js कभी नहीं। */
const BANK = /_bank(\.js)?$/;
function serverFiles(dir) {
  const seen = [], queue = ["index.js"];
  while (queue.length) {
    const f = queue.shift();
    if (seen.indexOf(f) > -1 || BANK.test(f) || !fs.existsSync(path.join(dir, f)) || !fs.statSync(path.join(dir, f)).isFile()) continue;
    seen.push(f);
    const code = fs.readFileSync(path.join(dir, f), "utf8"), re = /\brequire\(\s*["'`]\.\/([^"'`]+)["'`]\s*\)/g; let m;
    while ((m = re.exec(code))) { let r = path.posix.normalize(path.posix.join(path.posix.dirname(f), m[1])); if (!/\.js(on)?$/.test(r)) r += ".js"; if (/\.js$/.test(r) && r.indexOf("..") !== 0) queue.push(r); }
  }
  return seen.sort();
}
function extract(dir) {
  const map = new Map();
  const files = serverFiles(dir);
  for (const f of files) {
    const code = fs.readFileSync(path.join(dir, f), "utf8").replace(/\r\n/g, "\n");
    const spots = []; let m;
    const reA = /\bHttpsError\(/g; while ((m = reA.exec(code))) { const a = readExpr(code, m.index + m[0].length, true); if (code[a.end] === ",") spots.push(readExpr(code, a.end + 1, true).text); }
    const reB = /\b(?:msg|refundNote)\s*:/g; while ((m = reB.exec(code))) spots.push(readExpr(code, m.index + m[0].length, true).text);
    /* (v1.2, 17-Nov-2026) class_server.js अपने संदेश bad("code", <संदेश>, "KEY") से बनाती है (भीतर वही HttpsError) */
    const reD = /\bbad\(/g; while ((m = reD.exec(code))) { const a = readExpr(code, m.index + m[0].length, true); if (code[a.end] === ",") spots.push(readExpr(code, a.end + 1, true).text); }
    const reC = /\berrors\.push\(/g; while ((m = reC.exec(code))) spots.push(readExpr(code, m.index + m[0].length, true).text);
    const put = t => { if (!t || !DEV.test(t)) return; if (!map.has(t)) map.set(t, new Set()); map.get(t).add(f); };
    /* संदेश के भीतर कोष्ठक में चुना जाने वाला शब्द (जैसे (st === "requested" ? "निवेदन" : "प्रस्ताव")) भी user को दिखता है:
       वह {n} की जगह आता है, इसलिए अलग संदेश की तरह सूची में जाता है */
    const walk = (ex, depth) => { for (const alt of alternatives(ex)) { put(template(alt));
      if (depth < 3) for (const inner of parens(alt)) walk(inner, depth + 1); } };
    for (const ex of spots) walk(ex, 0);
  }
  return { files, msgs: Array.from(map.keys()).sort().map(hi => ({ hi, in: Array.from(map.get(hi)).sort() })) };
}
module.exports = { extract, template, alternatives, serverFiles };
if (require.main === module) {
  if (process.argv[2] === "--merge") {
    const rep = JSON.parse(fs.readFileSync(process.argv[3], "utf8")), want = String(process.argv[4] || "").split(",").filter(Boolean);
    const L = JSON.parse(fs.readFileSync(LIST, "utf8")), have = new Set(L.msgs.map(x => x.hi)); let n = 0;
    for (const x of rep.not_in_list || []) { const inn = x.in.filter(f => want.indexOf(f) > -1); if (!inn.length || have.has(x.hi)) continue;
      L.msgs.push({ hi: x.hi, in: inn.sort(), from: "office-report" }); have.add(x.hi); n++; }
    L.msgs.sort((a, b) => a.hi < b.hi ? -1 : a.hi > b.hi ? 1 : 0); L.count = L.msgs.length;
    L.files = Array.from(new Set(L.files.concat(want))).sort();
    fs.writeFileSync(LIST, JSON.stringify(L, null, 1) + "\n"); console.log("merged: " + n + " messages; list now " + L.count); process.exit(0);
  }
  const dir = process.argv[2], mode = process.argv[3] || "";
  if (!dir || !fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) { console.log("[STOP] functions folder not found: " + dir); process.exit(1); }
  if (!fs.existsSync(path.join(dir, "index.js"))) { console.log("[STOP] index.js not found in: " + dir); process.exit(1); }
  const R = extract(dir);
  if (mode === "--write") {
    const out = { _: "server_msgs.json: server (Firebase functions) के वे हिंदी संदेश जो user को दिखते हैं। मशीन-निकासी (generator/extract_server_msgs.js --write); हाथ से न बदलें। {0}, {1} = बदलने वाला हिस्सा। इसमें कोई कोड, चाबी या प्रश्न नहीं है।",
      files: R.files.slice(), count: R.msgs.length, msgs: R.msgs };
    /* office की रिपोर्ट से आए संदेश (जिनकी फ़ाइल इस folder में नहीं है) बने रहते हैं */
    if (fs.existsSync(LIST)) { const old = JSON.parse(fs.readFileSync(LIST, "utf8")), have = new Set(out.msgs.map(x => x.hi));
      for (const x of old.msgs) if (x.from && !have.has(x.hi) && x.in.every(f => R.files.indexOf(f) < 0)) { out.msgs.push(x); x.in.forEach(f => { if (out.files.indexOf(f) < 0) out.files.push(f); }); }
      out.msgs.sort((a, b) => a.hi < b.hi ? -1 : a.hi > b.hi ? 1 : 0); out.files.sort(); out.count = out.msgs.length; }
    fs.writeFileSync(LIST, JSON.stringify(out, null, 1) + "\n"); console.log("written: " + R.msgs.length + " messages from " + R.files.length + " files"); process.exit(0);
  }
  if (mode === "--check") {
    const have = new Set(JSON.parse(fs.readFileSync(LIST, "utf8")).msgs.map(x => x.hi));
    const extra = R.msgs.filter(x => !have.has(x.hi));
    const seen = new Set(R.msgs.map(x => x.hi)), gone = Array.from(have).filter(h => !seen.has(h));
    console.log("      Server files read (index.js and what it loads; question banks are never read): " + R.files.join(", "));
    console.log("      Server folder read: " + R.files.length + " files, " + R.msgs.length + " Hindi messages. In the English list: " + (R.msgs.length - extra.length) + ". Not in the list: " + extra.length + ". In the list but no longer on the server: " + gone.length + ".");
    if (process.argv[4]) fs.writeFileSync(process.argv[4], JSON.stringify({ files: R.files, not_in_list: extra, not_on_server: gone }, null, 1) + "\n");
    process.exit(extra.length ? 3 : 0);
  }
  console.log(JSON.stringify(R, null, 1));
}
