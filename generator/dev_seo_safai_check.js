/* ============================================================
   dev_seo_safai_check.js v2.0 (27-Nov-2026, खेप SEO-सफ़ाई v2; पहला रूप 25-Nov-2026) : साइट की सफ़ाई और कड़ियों का पहरा
   v2.0 में नया (Search Console, 27-Nov-2026 की 13 सूचियों से):
     उ) पर्चियाँ: build_moved_stubs ताज़ा; किसी पर्ची पर noindex नहीं; पर्ची से पर्ची की ज़ंजीर नहीं;
        Google को याद हटे पतों की पर्ची वहीं भेजती है, जहाँ 404-पन्ने का नक़्शा भेजता।
     ऊ) बदलाव-तारीख़: बही-खाते में हर पते की पाठ-छाप; sitemap की तारीख़ बही-खाते से मेल।
     ई) में कड़ा: index.html वाली भीतरी कड़ी अब शून्य (25-Nov का दर्ज क़र्ज़ 8,005 चुक गया)।
     इ) में कड़ा: कोई .md फ़ाइल साइट पर नहीं (चित्र-स्रोत का खाता भी नहीं)।
   क्यों: Google Search Console (25-Nov-2026) ने दिखाया कि
     (1) उद्यम के 951 पन्नों पर साइट से एक भी सीधी कड़ी नहीं थी (सूची JavaScript से, 50-50 में);
     (2) repo की जड़ में पुरानी नक़लें (courses_data.js, dashboard.js …), एक Excel फ़ाइल और
         एक पुराना sitemap साइट पर खुले पड़े थे;
     (3) बरसों पुराने पते 404 दे रहे थे और पढ़ने वाला कहीं नहीं पहुँचता था।
   यह यंत्र इन्हीं तीन बातों को दोबारा होने से रोकता है।
   चलाएँ:  node generator/dev_seo_safai_check.js
   जाँचें:
     अ) उद्यम की पूरी सूची: generator ताज़ा; हर उद्यम की कड़ी ठीक एक बार; 24 सेक्टर; गिनती data से मेल।
     आ) 404 का पुराना-पता नक़्शा: असली script चलाकर; हर लक्ष्य की फ़ाइल मौजूद; कोई चक्कर नहीं।
     इ) कूड़ा-पहरा: जड़ में सिर्फ़ जानी-पहचानी फ़ाइलें; assets/ की नक़ल जड़ में नहीं; Excel, zip, backup,
        SHA256-सूची, जड़ के बाहर sitemap, और अपने-आप पन्ना बन जाने वाली .md फ़ाइल नहीं।
     ई) कड़ियाँ: कोई मरी भीतरी कड़ी नहीं; sitemap के हर पन्ने तक कम से कम एक सीधी कड़ी (या भाषा-जोड़ी);
        index.html वाली कड़ियाँ सिर्फ़ दर्ज पुराने कोर्सों में, और बढ़ें नहीं।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
let pass = 0, fail = 0;
const ck = (name, ok, extra) => { if (ok) { pass++; console.log("  ✅ " + name); } else { fail++; console.log("  ❌ " + name + (extra ? "\n       " + String(extra).slice(0, 600) : "")); } };
const rd = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const has = (f) => fs.existsSync(path.join(ROOT, f));

/* ---------- प्रकाशित फ़ाइलें: _config.yml की exclude-सूची और _ या . से शुरू होने वाले नाम बाहर ---------- */
function excludes() {
  const out = []; let inx = false;
  for (const ln of rd("_config.yml").split(/\r?\n/)) {
    if (/^exclude:\s*$/.test(ln)) { inx = true; continue; }
    if (inx) { const m = /^\s+-\s+([^\s#]+)/.exec(ln); if (m) out.push(m[1]); else if (/^\S/.test(ln)) inx = false; }
  }
  return out;
}
const EXC = excludes();
function walk(dir, rel, out) {
  for (const n of fs.readdirSync(dir)) {
    if (n === ".git" || n === "node_modules") continue;
    const r = rel ? rel + "/" + n : n;
    if (n[0] === "_" || n[0] === ".") continue;
    if (EXC.includes(r)) continue;
    const p = path.join(dir, n), st = fs.statSync(p);
    if (st.isDirectory()) walk(p, r, out); else out.push(r);
  }
  return out;
}
const PUB = walk(ROOT, "", []), PUBSET = new Set(PUB);
const HTML = PUB.filter((f) => f.endsWith(".html"));

console.log("== dev_seo_safai_check v2.0 · प्रकाशित फ़ाइलें " + PUB.length + " · पन्ने " + HTML.length);

/* ================= अ) उद्यम की पूरी सूची ================= */
console.log("-- अ) उद्यम की पूरी सूची");
{
  const r = cp.spawnSync(process.execPath, [path.join(__dirname, "build_udyam_suchi.js"), "--check"], { encoding: "utf8" });
  ck("generator ताज़ा: build_udyam_suchi.js --check", r.status === 0, (r.stdout || "") + (r.stderr || ""));
  const A = new Function(rd("assets/udyam_data.js") + ";return ALL_SECTORS;")();
  const page = rd("udyam/index.html");
  const a = page.indexOf("UDYAM-SUCHI:START"), b = page.indexOf("UDYAM-SUCHI:END");
  const blk = a > -1 && b > a ? page.slice(a, b) : "";
  ck("सूची का हिस्सा ठीक एक बार (START/END)", page.split("UDYAM-SUCHI:START").length === 2 && page.split("UDYAM-SUCHI:END").length === 2);
  const hrefs = (blk.match(/<li><a href="([^"]+)"/g) || []).map((x) => x.slice(13, -1));
  const want = A.map((s) => s.intro), ws = new Set(want), hs = new Set(hrefs);
  ck("हर उद्यम की कड़ी ठीक एक बार (" + A.length + ")", hrefs.length === A.length && hs.size === hrefs.length && want.every((u) => hs.has(u)) && hrefs.every((u) => ws.has(u)),
    "कड़ियाँ " + hrefs.length + ", अलग " + hs.size + ", छूटे " + want.filter((u) => !hs.has(u)).slice(0, 3));
  const det = blk.split('<details class="us-d">').slice(1);
  const mgCount = {}; A.forEach((s) => { mgCount[s.mg] = (mgCount[s.mg] || 0) + 1; });
  ck("24 सेक्टर, और हर सेक्टर की लिखी गिनती = उसकी कड़ियाँ = data की गिनती",
    det.length === 24 && det.every((d, i) => { const m = /<span class="us-c">(\d+) उद्यम<\/span>/.exec(d); const n = (d.match(/<li><a href="/g) || []).length; return m && +m[1] === n && n === mgCount[i + 1]; }));
  ck("शीर्षक में असली गिनती (" + A.length + "), हाथ का अंक नहीं", blk.indexOf("सभी " + A.length + " उद्यमों की पूरी सूची") > -1);
  const files = fs.readdirSync(path.join(ROOT, "udyam")).filter((f) => f.endsWith(".html") && f !== "index.html" && f !== "wiki.html").map((f) => "/udyam/" + f);
  ck("udyam/ का हर पन्ना इस सूची में है (कोई पन्ना बिना कड़ी के नहीं)", files.every((u) => hs.has(u)), files.filter((u) => !hs.has(u)).slice(0, 5).join(", "));
  const vis = blk.replace(/<style>[\s\S]*?<\/style>/, "");
  ck("दिखने वाले पाठ में चौकोर कोष्ठक नहीं; कोई अक्षर 16px से छोटा नहीं", !/[\[\]]/.test(vis) && (blk.match(/font-size:\s*(\d+)px/g) || []).every((x) => +x.replace(/\D/g, "") >= 16));
  ck("सूची JavaScript के बिना पन्ने में ही है (script के भीतर नहीं)", a > -1 && !/<script[\s>]/.test(blk));
  ck("कार्डों से पहले \"पूरी सूची देखें\" की कड़ी (#puri-suchi) ठीक एक बार, असली गिनती के साथ", page.split("UDYAM-SUCHI-KADI:START").length === 2 && page.split('href="#puri-suchi"').length === 2
    && page.indexOf("सभी " + A.length + " उद्यमों की पूरी सूची देखें") > -1 && page.indexOf("UDYAM-SUCHI-KADI:START") < page.indexOf('id="sectorGrid"') && page.indexOf('id="puri-suchi"') > page.indexOf('id="sectorGrid"'));
}

/* ================= आ) 404 का पुराना-पता नक़्शा ================= */
console.log("-- आ) 404 का पुराना-पता नक़्शा");
{
  const page = rd("404.html");
  const m = /<script>(\(function\(\)\{var raw=location\.pathname[\s\S]*?\}\)\(\);)<\/script>/.exec(page);
  ck("404.html में पुराना-पता script है", !!m);
  const go = (p) => { let to = null; const loc = { pathname: p, search: "", hash: "", replace: (u) => { to = u; } }; vm.runInNewContext(m[1], { location: loc, RegExp }); return to; };
  const T = [
    ["/courses/hi/kaam-ki-bhasha/", "/courses/hi/bhasha/english/"], ["/courses/hi/kaam-ki-bhasha-arabic/index.html", "/courses/hi/bhasha/arabic/"],
    ["/hi/", "/"], ["/courses/", "/courses/hi/"], ["/contact", "/contact/hi/"],
    ["/courses/acs-ai-ecommerce-product-listing/hi/lesson-035-demo-to-paid.html", "/courses/hi/digital/ecom/lesson-035-demo-to-paid.html"],
    ["/courses/acs-ai-ecommerce-product-listing/hi/index.html", "/courses/hi/digital/ecom/"],
    ["/vc/ar/L023.html", "/courses/hi/digital/ai-digital-master/L023.html"], ["/vc/hi/level-4/l220a-ai-compliance-workflow.html", "/courses/hi/digital/ai-digital-master/"], ["/vc/index.html", "/courses/hi/digital/ai-digital-master/"],
    ["/level-1/l041-capcut-mobile-editing-master.html", "/courses/hi/digital/ai-digital-master/"], ["/layer-b-cybersecurity/cy001-strong-password.html", "/courses/hi/digital/ai-digital-master/"],
    ["/academy/hi/class-11-12.html", "/courses/hi/"], ["/academy-class-6-8.html", "/courses/hi/"], ["/courses/en/", "/courses/hi/"], ["/courses.html", "/courses/hi/"],
    ["/courses/hi/vocational.html", "/courses/hi/"], ["/courses/hi/art-culture.html", "/courses/hi/"], ["/courses/hi/agriculture.html", "/courses/hi/"], ["/courses/hi/digital.html", "/courses/hi/"],
    ["/counselors/hi/book.html", "/hi/salah.html"], ["/mentors/hi/index.html", "/hi/salah.html"], ["/career/hi/government-employment.html", "/career.html"],
    ["/students/hi/resume-builder.html", "/career-kit.html"], ["/employers/hi/index.html", "/hi/network.html"], ["/partners/hi/index.html", "/hi/network.html"],
    ["/workshops/hi/index.html", "/hi/network.html"], ["/help/hi/index.html", "/contact/hi/"], ["/gallery/hi/index.html", "/hi/mission.html"],
    ["/courses/hi/bhasha/chhattisgarhi/lipi/", "/courses/hi/bhasha/chhattisgarhi/"], ["/courses/hi/bhasha/bhojpuri/lipi/index.html", "/courses/hi/bhasha/bhojpuri/"],
    ["/courses/hi/bhasha/koi-nahin-hai/", "/bhasha.html"], ["/courses/hi/bhasha/koi-nahin-hai", "/bhasha.html"]
  ];
  const badT = m ? T.filter(([p, w]) => go(p) !== w).map(([p, w]) => p + " → " + go(p) + " (चाहिए " + w + ")") : ["script नहीं"];
  ck("पुराने पते सही जगह जाते हैं (" + T.length + " नमूने: पुराना नक़्शा, नए नियम, भाषा-कोर्स)", badT.length === 0, badT.join(" | "));
  const NO = ["/kuchh-bhi-nahin.html", "/payment/hi/index.html", "/shayari/", "/courses/hi/digital/ecom/lesson-999-nahin.html", "/courses/hi/digital/ai-digital-master/L999.html", "/udyam/nahin.html", "/bhasha.html"];
  ck("अनजान पते पर कोई भेजना नहीं (सादा 404), और नियम के लक्ष्य पर दोबारा नियम नहीं लगता (चक्कर नहीं)", !!m && NO.every((p) => go(p) === null), m ? NO.filter((p) => go(p) !== null).join(", ") : "");
  /* हर लक्ष्य की फ़ाइल मौजूद */
  const src = rd("generator/build_specials.js");
  const om = /const OLD_MAP = (\{[\s\S]*?\});/.exec(src), op = /const OLD_PREFIX = (\[[\s\S]*?\n\]);/.exec(src);
  const OLD_MAP = om ? new Function("return " + om[1])() : {}, OLD_PREFIX = op ? new Function("return " + op[1])() : [];
  const tfile = (u) => { const p = u.replace(/^\//, ""); return p === "" || p.endsWith("/") ? p + "index.html" : p; };
  const targets = Object.values(OLD_MAP).concat(OLD_PREFIX.map((r) => r[1]), ["/bhasha.html"]);
  ck("नक़्शे के हर लक्ष्य (" + targets.length + ") की फ़ाइल repo में है", targets.length > 20 && targets.every((u) => has(tfile(u))), targets.filter((u) => !has(tfile(u))).join(", "));
  ck("404.html में generator का नक़्शा हूबहू (हाथ से नहीं बदला)", !!m && page.indexOf("var R=" + JSON.stringify(OLD_PREFIX) + ";") > -1 && page.indexOf("var M=" + JSON.stringify(OLD_MAP) + ";") > -1);
  ck("404.html खोज में नहीं जाता (noindex)", /<meta name="robots" content="noindex/.test(page));
  /* नियम सिर्फ़ उन्हीं पतों पर लगें जो सच में नहीं हैं: किसी जीवित पन्ने का पता नियम की शुरुआत से न मिले */
  const live = HTML.filter((f) => OLD_PREFIX.some((r) => ("/" + f).indexOf(r[0]) === 0));
  /* v2.0: Google को याद पुराने पतों पर अब पर्ची है (generator/data/moved_pages.js का exact_gsc)। नियम की ज़द में
     पर्ची के सिवा कोई असली पन्ना नहीं होना चाहिए। */
  const MARK2 = "ACS redirect-पर्ची v2 · build_moved_stubs.js";
  const liveReal = live.filter((f) => rd(f).indexOf(MARK2) === -1);
  ck("पुराने-पते के नियम की ज़द में कोई असली पन्ना नहीं (सिर्फ़ पर्चियाँ: " + (live.length - liveReal.length) + ")", liveReal.length === 0, liveReal.slice(0, 5).join(", "));
  /* हर ऐसी पर्ची वहीं भेजे, जहाँ नक़्शा भेजता (नक़्शे का लक्ष्य ख़ुद पर्ची हो, तो उसके आगे का असली पन्ना) */
  const MP = require("./data/moved_pages.js");
  const refTo = (u) => { const t = rd(tfile(u)); const r = /http-equiv=["']refresh["'][^>]*content=["']\s*\d+\s*;\s*url=([^"'#]+)/i.exec(t.slice(0, 3000)); return r ? r[1] : null; };
  const fin = (u) => { for (let i = 0; i < 4 && u && has(tfile(u)); i++) { const n = refTo(u); if (!n) return u; u = n; } return null; };
  const badG = (MP.exact_gsc || []).filter(([from, to]) => { const g = m ? go(from) : null; return !g || fin(g) !== to; }).map((r) => r[0]);
  ck("Google को याद हटे पतों की हर पर्ची (" + (MP.exact_gsc || []).length + ") वहीं भेजती है, जहाँ 404-पन्ने का नक़्शा भेजता", (MP.exact_gsc || []).length > 100 && badG.length === 0, badG.slice(0, 4).join(", "));
  const rootMess = (MP.exact_gsc || []).filter(([from]) => !/^\/(courses|vc)\//.test(from)).map((r) => r[0]);
  ck("ऐसी पर्चियाँ सिर्फ़ /courses/ और /vc/ के भीतर (repo की जड़ में दर्जनों पुराने folder नहीं बनते)", rootMess.length === 0, rootMess.slice(0, 4).join(", "));
}

/* ================= इ) कूड़ा-पहरा ================= */
console.log("-- इ) कूड़ा-पहरा (प्रकाशित हिस्सा)");
{
  const rootFiles = PUB.filter((f) => f.indexOf("/") === -1);
  const ROOT_OK = new Set(["CNAME", "robots.txt", "manifest.json", "logo.png", "sw.js", "script.js", "style.css", "acs-style.css", "acs-universal.css",
    "sitemap.xml", "sitemap-core.xml", "sitemap-udyam.xml", "sitemap-bhasha.xml", "sitemap-hunar.xml", "sitemap-network.xml"]);
  const strange = rootFiles.filter((f) => !f.endsWith(".html") && !ROOT_OK.has(f));
  ck("जड़ में सिर्फ़ जानी-पहचानी फ़ाइलें (पन्ने, sitemap, sw.js, script.js, तीन CSS, logo …)", strange.length === 0, "अनजान: " + strange.join(", "));
  const twin = rootFiles.filter((f) => /\.(js|json)$/.test(f) && PUBSET.has("assets/" + f));
  ck("assets/ की किसी फ़ाइल की नक़ल जड़ में नहीं (जड़ में चढ़ी भूली फ़ाइल)", twin.length === 0, twin.join(", "));
  const junk = PUB.filter((f) => /\.(xlsx?|docx?|pptx?|zip|rar|7z|bak|orig|tmp|log|psd|swp)$/i.test(f) || /(^|\/)(SHA256|sha256)[^\/]*\.txt$/.test(f) || /~$/.test(f) || /(^|\/)(Thumbs\.db|desktop\.ini)$/i.test(f));
  ck("Excel, Word, zip, backup, log और SHA256-सूची जैसी फ़ाइलें साइट पर नहीं", junk.length === 0, junk.slice(0, 8).join(", "));
  const sm = PUB.filter((f) => /(^|\/)sitemap[^\/]*\.xml$/.test(f) && f.indexOf("/") > -1);
  ck("sitemap सिर्फ़ जड़ में (किसी folder में पुराना sitemap नहीं)", sm.length === 0, sm.join(", "));
  const MD_OK = new Set();   /* v2.0: चित्र-स्रोत का खाता (…/img/SOURCES.md) भी अब _config.yml से बाहर है */
  const md = PUB.filter((f) => /\.(md|markdown)$/i.test(f) && !MD_OK.has(f));
  ck("कोई .md फ़ाइल साइट पर नहीं (GitHub उसे अपने-आप एक बिना-canonical पन्ना बना देता है)", md.length === 0, md.slice(0, 6).join(", "));
  const priv = PUB.filter((f) => /(^|\/)(firestore\.rules|firebase\.json|\.firebaserc|package(-lock)?\.json)$/.test(f) || /\.(rules|env|pem|key)$/.test(f));
  ck("Firebase के नियम, .env और चाबी जैसी फ़ाइलें साइट पर नहीं", priv.length === 0, priv.join(", "));
  ck("_config.yml: generator, matrix, android, CHANGELOG-sw.md, firestore.rules और चित्र-स्रोत का खाता बाहर हैं", ["generator", "matrix", "android", "CHANGELOG-sw.md", "firestore.rules", "courses/hi/digital-mitra-basic/img/SOURCES.md"].every((x) => EXC.includes(x)));
  ck("चित्र-स्रोत का खाता repo में मौजूद है (सिर्फ़ साइट से बाहर)", has("courses/hi/digital-mitra-basic/img/SOURCES.md"));
}

/* ================= ई) कड़ियाँ ================= */
console.log("-- ई) कड़ियाँ (सब " + HTML.length + " पन्ने)");
{
  const A = /<a\b[^>]*?\bhref\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
  const ALT = /<link\b[^>]*?\brel\s*=\s*["']alternate["'][^>]*?\bhref\s*=\s*["']([^"']+)["']/gi;
  const dec = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  function resolve(src, href) {
    href = dec(href).trim();
    if (!href || /^(#|mailto:|tel:|javascript:|data:|whatsapp:|sms:|intent:|blob:)/i.test(href)) return null;
    if (/[`]|\$\{|['"]\s*\+|\+\s*['"]|\{\{/.test(href)) return null;                 /* JavaScript के भीतर बनती कड़ी */
    let p;
    const m = /^https?:\/\/([^\/?#]+)([^?#]*)/i.exec(href);
    if (m) { if (!/^(www\.)?acslearn\.com$/i.test(m[1])) return null; p = m[2] || "/"; }
    else if (/^[a-z][a-z0-9+.\-]*:/i.test(href) || href.indexOf("//") === 0) return null;
    else { p = href.split("#")[0].split("?")[0]; if (!p) return null; if (p[0] !== "/") p = path.posix.normalize("/" + path.posix.dirname(src) + "/" + p) + (/\/$/.test(p) && !/\/$/.test(path.posix.normalize(p)) ? "/" : ""); }
    try { p = decodeURIComponent(p); } catch (e) {}
    return p.replace(/\/+/g, "/");
  }
  const tf = (p) => { const x = p.replace(/^\//, ""); if (x === "" || x.endsWith("/")) return x + "index.html"; if (PUBSET.has(x)) return x; if (PUBSET.has(x + "/index.html")) return x + "/index.html"; return x; };
  const inb = new Map(), dead = [], idx = {}; let idxN = 0;
  const meta = {};
  for (const f of HTML) {
    const s = rd(f);
    meta[f] = { slip: /<meta\b[^>]*http-equiv\s*=\s*["']refresh["']/i.test(s), noindex: /<meta\b[^>]*name\s*=\s*["']robots["'][^>]*content\s*=\s*["'][^"']*noindex/i.test(s) };
    let m; const seen = new Set();
    A.lastIndex = 0;
    while ((m = A.exec(s))) {
      const p = resolve(f, m[1] !== undefined ? m[1] : m[2]); if (p === null) continue;
      const t = tf(p);
      if (!PUBSET.has(t)) { if (dead.length < 40) dead.push(f + " → " + p); else dead.push(""); continue; }
      if (/(^|\/)index\.html$/.test(p)) { idxN++; idx[p] = (idx[p] || 0) + 1; }
      if (t !== f && !seen.has(t)) { seen.add(t); inb.set(t, (inb.get(t) || 0) + 1); }
    }
    ALT.lastIndex = 0;
    while ((m = ALT.exec(s))) { const p = resolve(f, m[1]); if (p === null) continue; const t = tf(p); if (t !== f && PUBSET.has(t) && !seen.has(t)) { seen.add(t); inb.set(t, (inb.get(t) || 0) + 1); } }
  }
  ck("कोई मरी भीतरी कड़ी नहीं", dead.length === 0, dead.length + " मरी कड़ियाँ: " + dead.filter(Boolean).slice(0, 6).join(" | "));
  /* sitemap के हर पन्ने तक कम से कम एक कड़ी (सीधी कड़ी या भाषा-जोड़ी hreflang) */
  const sm = [];
  for (const x of fs.readdirSync(ROOT)) if (/^sitemap-.*\.xml$/.test(x)) for (const u of rd(x).match(/<loc>[^<]+<\/loc>/g) || []) sm.push(tf(u.slice(5, -6).replace("https://acslearn.com", "")));
  const orphan = sm.filter((f) => f !== "index.html" && !(inb.get(f) > 0));
  /* दर्ज क़र्ज़ (JavaScript से खुलते हैं, सीधी कड़ी अगले दौर में): नियम-पत्र (रजिस्ट्रेशन-फ़ॉर्म से),
     परीक्षा-ऐप का पन्ना (dashboard से), उद्यम-खोज का पन्ना (उद्यम-कार्ड से)। यह सूची बढ़े नहीं। */
  const DEBT_ONE = new Set(["exam-app.html", "udyam/wiki.html"]);
  const DEBT = (f) => /(^|\/)rules-consent-[a-z\-]+\.html$/.test(f) || DEBT_ONE.has(f);
  const real = orphan.filter((f) => !DEBT(f));
  ck("sitemap के हर पन्ने (" + sm.length + ") तक साइट से कम से कम एक कड़ी (दर्ज क़र्ज़: " + orphan.filter(DEBT).length + " पन्ने, ज़्यादातर नियम-पत्र)", real.length === 0 && orphan.filter(DEBT).length <= 55, real.length + " पन्ने बिना कड़ी: " + real.slice(0, 8).join(", "));
  ck("उद्यम के सब पन्नों तक कड़ी (पहले 951 में 0 पर थी)", sm.filter((f) => /^udyam\/[^\/]+\.html$/.test(f) && f !== "udyam/index.html" && f !== "udyam/wiki.html").every((f) => inb.get(f) > 0));
  /* index.html वाली कड़ियाँ: सिर्फ़ दर्ज पुराने कोर्स-घर; गिनती बढ़े नहीं (अगले कोर्स-दौर में घटेगी) */
  const IDX_OK = new Set(["/courses/hi/vocational/printer/index.html", "/courses/hi/mushroom-cultivation-marketing/index.html", "/courses/hi/digital/dca/index.html",
    "/courses/hi/four-wheeler-driver/index.html", "/courses/hi/digital/ecom/index.html", "/courses/hi/digital/ai-digital-master/index.html", "/courses/hi/index.html"]);
  const IDX_MAX = 0;      /* v2.0 (27-Nov-2026): 25-Nov का दर्ज क़र्ज़ (8,005 कड़ियाँ, 2,940 पाठ-पन्ने) चुक गया; अब एक भी नहीं */
  const newIdx = Object.keys(idx).filter((p) => !IDX_OK.has(p));
  ck("कोई भीतरी कड़ी \"…/index.html\" लिखकर नहीं जाती (अभी " + idxN + ")", idxN <= IDX_MAX, "लक्ष्य: " + Object.keys(idx).slice(0, 5).join(", ") + " · गिनती " + idxN);
  for (const g of ["sudhar_ghar_kadi.js", "sudhar_udyam_panna.js"]) { const r = cp.spawnSync(process.execPath, [path.join(__dirname, g), "--check"], { encoding: "utf8" }); ck("दर्ज सुधार लगा है: " + g + " --check", r.status === 0, (r.stdout || "") + (r.stderr || "")); }
  const gsrc = ["build_dca_pages.js", "build_ecom_pages.js", "build_mushroom_pages.js", "build_fwd_pages.js", "build_legacy_migrate.js"].filter((g) => rd("generator/" + g).indexOf('href="index.html"') > -1);
  ck("कोर्स के generator भी कोर्स-घर को \"./\" लिखते हैं (अगली बार बनने पर ग़लती न लौटे)", gsrc.length === 0, gsrc.join(", "));
  const smSlip = sm.filter((f) => meta[f] && (meta[f].slip || meta[f].noindex));
  ck("sitemap में कोई पर्ची या noindex पन्ना नहीं", smSlip.length === 0, smSlip.slice(0, 5).join(", "));
}

/* ================= उ) पर्चियाँ ================= */
console.log("-- उ) पर्चियाँ (पुराना पता → नया घर)");
{
  const r = cp.spawnSync(process.execPath, [path.join(__dirname, "build_moved_stubs.js"), "--check"], { encoding: "utf8" });
  ck("generator ताज़ा: build_moved_stubs.js --check", r.status === 0, (r.stdout || "") + (r.stderr || ""));
  const slips = [], noidx = [], chain = [], old = [];
  const tfile2 = (u) => { const p = u.replace(/^https:\/\/acslearn\.com/, "").replace(/^\//, "").split("#")[0]; return p === "" || p.endsWith("/") ? p + "index.html" : p; };
  for (const f of HTML) {
    const t = rd(f).slice(0, 4000), m = /<meta\b[^>]*http-equiv\s*=\s*["']refresh["'][^>]*content=["']\s*(\d+)\s*;\s*url=([^"']+)["']/i.exec(t);
    if (!m) continue;
    slips.push(f);
    if (/<meta\b[^>]*name\s*=\s*["']robots["'][^>]*noindex/i.test(t)) noidx.push(f);
    const to = tfile2(m[2]);
    if (!PUBSET.has(to)) chain.push(f + " → (नहीं है) " + m[2]);
    else if (/http-equiv\s*=\s*["']refresh["']/i.test(rd(to).slice(0, 4000))) chain.push(f + " → (पर्ची) " + m[2]);
    if (t.indexOf("ACS redirect-पर्ची v2 · build_moved_stubs.js") === -1) old.push(f);
  }
  ck("किसी पर्ची पर noindex नहीं (" + slips.length + " पर्चियाँ; noindex वाली पर्ची को Google \"पुराना पता, नया घर\" नहीं मानता)", slips.length > 1000 && noidx.length === 0, noidx.slice(0, 5).join(", "));
  ck("हर पर्ची का लक्ष्य मौजूद है और ख़ुद पर्ची नहीं (ज़ंजीर नहीं)", chain.length === 0, chain.slice(0, 4).join(" | "));
  /* जो पर्चियाँ build_moved_stubs की नहीं हैं: सिर्फ़ ये जानी-पहचानी (अपने-अपने generator की) */
  const OLD_OK = new Set(["courses/hi/bhasha/english/a2/index.html", "network/index.html", "network/bihar/index.html", "network/firm/index.html", "en/network/index.html", "en/network/bihar/index.html", "en/network/firm/index.html"]);
  const strange = old.filter((f) => !OLD_OK.has(f));
  ck("build_moved_stubs के बाहर की पर्चियाँ सिर्फ़ जानी-पहचानी (" + OLD_OK.size + "); पुरानी बनावट (rename_legacy_lessons, हाथ की) कोई नहीं बची", strange.length === 0, strange.slice(0, 5).join(", "));
  const TW = require("./data/seo_twin_pages.js");
  ck("दोहरा पन्ना (वही पाठ दो पतों पर) कोई नहीं बचा: मशरूम पाठ-368 का पुराना पता अब पर्ची है", Object.keys(TW).length === 0 && /http-equiv="refresh"/.test(rd("courses/hi/mushroom-cultivation-marketing/msh-368-thndi-kadai-cold-chain-ki-puri-janjir-aur-tapaman-ra.html")));
}

/* ================= ऊ) बदलाव-तारीख़ ================= */
console.log("-- ऊ) बदलाव-तारीख़ (sitemap का बही-खाता)");
{
  const L = JSON.parse(rd("generator/data/sitemap_ledger.json"));
  const keys = Object.keys(L).filter((k) => k[0] !== "#");
  const noT = keys.filter((k) => !L[k][2] || !/^[0-9a-f]{12}$/.test(L[k][2]));
  ck("बही-खाते के हर पते (" + keys.length + ") पर पाठ की छाप दर्ज है (तारीख़ पाठ बदलने पर ही बदले)", keys.length > 9000 && noT.length === 0, noT.slice(0, 4).join(", "));
  const src = rd("generator/build_sitemap.js");
  ck("build_sitemap.js तारीख़ पाठ की छाप से तय करता है (v2.8)", src.indexOf("function textHash(") > -1 && src.indexOf("old[2] === t ? old[1] : today") > -1);
  /* नमूना: पहले 400 पतों की पाठ-छाप आज की फ़ाइल से मिलती है (बही-खाता बासी नहीं) */
  const crypto = require("crypto");
  const th = (f) => { const x = rd(f).replace(/\r\n/g, "\n"); const t = (x.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [, ""])[1]; const d = (x.match(/<meta\b[^>]*name=["']description["'][^>]*>/i) || [""])[0];
    const mm = x.match(/<main\b[\s\S]*<\/main>/i) || x.match(/<body\b[\s\S]*<\/body>/i) || [x];
    const body = mm[0].replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ");
    return crypto.createHash("sha1").update((t + "\n" + d.replace(/^.*?content=["']/i, "").replace(/["'][^"']*$/, "") + "\n" + body).replace(/\s+/g, " ").trim(), "utf8").digest("hex").slice(0, 12); };
  const step = Math.max(1, Math.floor(keys.length / 400)), stale = [];
  for (let i = 0; i < keys.length; i += step) { const u = keys[i], f = u === "/" ? "index.html" : (u.endsWith("/") ? u.slice(1) + "index.html" : u.slice(1)); if (!has(f) || th(f) !== L[u][2]) stale.push(u); }
  ck("बही-खाता ताज़ा है (हर " + step + "वें पते की पाठ-छाप आज की फ़ाइल से मिली)", stale.length === 0, stale.slice(0, 4).join(", ") + " : चलाएँ node generator/build_sitemap.js");
}

console.log("जाँचें: पास " + pass + " · फेल " + fail);
if (fail) { console.log("⛔ dev_seo_safai_check रुका"); process.exit(1); }
console.log("🏁 dev_seo_safai_check v2.0 : साइट की सफ़ाई, कड़ियाँ, पर्चियाँ और बदलाव-तारीख़ पास");
