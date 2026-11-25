/* ============================================================
   dev_seo_safai_check.js v1.0 (25-Nov-2026, खेप SEO-सफ़ाई) : साइट की सफ़ाई और कड़ियों का पहरा
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

console.log("== dev_seo_safai_check v1.0 · प्रकाशित फ़ाइलें " + PUB.length + " · पन्ने " + HTML.length);

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
  ck("कोई जीवित पन्ना पुराने-पते के नियम की ज़द में नहीं (नियम सिर्फ़ हटे folder पर)", live.length === 0, live.slice(0, 5).join(", "));
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
  const MD_OK = new Set(["courses/hi/digital-mitra-basic/img/SOURCES.md"]);   /* चित्रों के स्रोत और लाइसेंस का खाता */
  const md = PUB.filter((f) => /\.(md|markdown)$/i.test(f) && !MD_OK.has(f));
  ck("कोई .md फ़ाइल साइट पर नहीं (GitHub उसे अपने-आप एक बिना-canonical पन्ना बना देता है)", md.length === 0, md.slice(0, 6).join(", "));
  const priv = PUB.filter((f) => /(^|\/)(firestore\.rules|firebase\.json|\.firebaserc|package(-lock)?\.json)$/.test(f) || /\.(rules|env|pem|key)$/.test(f));
  ck("Firebase के नियम, .env और चाबी जैसी फ़ाइलें साइट पर नहीं", priv.length === 0, priv.join(", "));
  ck("_config.yml: generator, matrix, android बाहर ही हैं; दो नई पंक्तियाँ (CHANGELOG-sw.md, firestore.rules)", ["generator", "matrix", "android", "CHANGELOG-sw.md", "firestore.rules"].every((x) => EXC.includes(x)));
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
  const IDX_MAX = 8005;   /* 25-Nov-2026 की गिनती (हर कड़ी गिनी गई; 2,940 पाठ-पन्नों में 2 से 4 कड़ियाँ) */
  const newIdx = Object.keys(idx).filter((p) => !IDX_OK.has(p));
  ck("index.html वाली कड़ी सिर्फ़ 7 दर्ज कोर्स-घरों पर, और " + IDX_MAX + " से ज़्यादा नहीं (अभी " + idxN + "; दर्ज क़र्ज़)", newIdx.length === 0 && idxN <= IDX_MAX, "नए लक्ष्य: " + newIdx.slice(0, 5).join(", ") + " · गिनती " + idxN);
  const smSlip = sm.filter((f) => meta[f] && (meta[f].slip || meta[f].noindex));
  ck("sitemap में कोई पर्ची या noindex पन्ना नहीं", smSlip.length === 0, smSlip.slice(0, 5).join(", "));
}

console.log("जाँचें: पास " + pass + " · फेल " + fail);
if (fail) { console.log("⛔ dev_seo_safai_check रुका"); process.exit(1); }
console.log("🏁 dev_seo_safai_check v1.0 : साइट की सफ़ाई और कड़ियाँ पास");
