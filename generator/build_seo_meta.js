/* ============================================================
   build_seo_meta.js v1.3 (परत-4, 12-Nov-2026) : पूरी साइट की "अंतिम SEO-परत"
   काम (हर बार वही नतीजा; दोबारा चलाने पर कुछ नहीं बदलता):
   1) सभी 8 पेज-प्रकार का title + description = lib_seo_meta.js का पाठ
      (<title>, og:title, meta description, og:description, schema का description)।
   2) चित्र-पुस्तक पेज: robots-निशान + schema (LearningResource + BreadcrumbList) जोड़ना।
   3) व्याकरण पेज: robots-निशान जोड़ना।
   4) चित्र-पुस्तक का मोबाइल-रूप (reader.html): canonical → मुख्य चित्र-पुस्तक पेज
      (दोनों में एक ही पढ़ाई है; Google को दोहराव न दिखे)।
   5) जुड़वाँ कोर्स (generator/data/seo_twins.js): canonical + og:url → मुख्य कोर्स।
   v1.1 में जुड़ा (ChatGPT की 8,602-पेज जाँच के सुधार; नियम lib_seo_hunar.js में):
   6) हुनर-कोर्स के पाठ (चार-पहिया, DCA, ई-कॉमर्स, मशरूम, टू-व्हीलर, वेल्डिंग): शीर्षक से लंबा
      कोर्स-नाम हटाकर छोटा नाम; नक़ल-जैसा या बहुत छोटा description पाठ के पहले अनुच्छेद से;
      attribute में उद्धरण-चिह्न (") की सही escape (पहले 60 से ज़्यादा पेजों पर टूटा था)।
   7) विषय-पेज (courses/hi/subject) जिन पर अभी सिर्फ़ "जल्द उपलब्ध" लिखा है: noindex
      (पेज live रहता है; Google की सूची और sitemap से बाहर)। असली पढ़ाई आते ही अपने-आप index।
   8) भाषा-वार नियम-पेज: <title> और meta-attribute के भीतर से <bdi> tag हटाना।
   9) जुड़वाँ पेज (data/seo_twin_pages.js): canonical + og:url मुख्य पेज पर।
   v1.2: 10) उद्यम-पेज: 80 अक्षर से लंबे शीर्षक छोटे (नियम lib_seo_hunar.js का udyamTitle)।
   v1.3: 11) पाठ-पेज के schema (LearningResource) का description = पेज का meta description।
         12) कोई पाठ-description "और / या / के / में…" जैसे अधूरे शब्द पर ख़त्म हो तो वह शब्द हटता है।
   कब चलाएँ: कोई भी भाषा-generator चलाने के बाद, sitemap से पहले। छहों generator
   इसे अंत में अपने-आप बुलाते हैं; जाँच-यंत्र dev_seo_check.js भी पहरा देता है।
   चलाना: node generator/build_seo_meta.js [--check]   (--check = सिर्फ़ जाँच, कुछ नहीं लिखता)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const SEO = require("./lib_seo_meta.js");
const TWINS = require("./data/seo_twins.js");
const HN = require("./lib_seo_hunar.js");
const TWIN_PAGES = require("./data/seo_twin_pages.js");
const ROOT = path.join(__dirname, "..");
const BASE = "https://acslearn.com/courses/hi/bhasha/";
const unesc = s => s.replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const jesc = s => JSON.stringify(s).slice(1, -1);

function fixPage(rel, s) {
  const k = SEO.typeOf(rel); if (!k) return { s };
  const tm = s.match(/<title>([\s\S]*?)<\/title>/), dm = s.match(/<meta name="description" content="([^"]*)"/);
  if (!tm || !dm) return { err: "title/description नहीं मिला" };
  const oldT = unesc(tm[1]), oldD = unesc(dm[1]);
  const v = SEO.parse(k.type, oldT, oldD);
  if (!v) return { err: "title का रूप पहचाना नहीं गया: " + oldT };
  v.slug = k.slug;
  const T = SEO.title(k.type, v), D = SEO.desc(k.type, v);
  let o = s;
  o = o.replace(/<title>[\s\S]*?<\/title>/, () => "<title>" + T + "</title>");
  o = o.replace(/(<meta property="og:title" content=")[^"]*(")/, (m, a, b) => a + T + b);
  o = o.replace(/(<meta name="description" content=")[^"]*(")/, (m, a, b) => a + D + b);
  o = o.replace(/(<meta property="og:description" content=")[^"]*(")/, (m, a, b) => a + D + b);
  if (oldD !== D) o = o.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, blk => blk.split(jesc(oldD)).join(jesc(D)));
  if (k.type === "vyakaran" && !/<meta name="robots"/.test(o))
    o = o.replace(/(<meta name="description" content="[^"]*">)/, (m, a) => a + "\n" + SEO.ROBOTS);
  if (k.type === "chitra" && !/application\/ld\+json/.test(o)) {
    const tag = '<meta property="og:image" content="https://acslearn.com/logo.png">';
    if (o.indexOf(tag) < 0) return { err: "चित्र-पुस्तक: og:image पंक्ति नहीं मिली" };
    o = o.replace(tag, () => tag + SEO.chitraHeadExtra({ hi: v.hi, slug: k.slug, akshar: v.akshar, desc: D }));
  }
  const tw = TWINS[k.slug];
  if (tw) {
    const sub = rel.replace(/\\/g, "/").replace(/^courses\/hi\/bhasha\/[^/]+\//, "");
    if (fs.existsSync(path.join(ROOT, "courses/hi/bhasha", tw, sub))) {
      const mine = BASE + k.slug + "/" + sub.replace(/index\.html$/, ""), main = BASE + tw + "/" + sub.replace(/index\.html$/, "");
      o = o.replace('<link rel="canonical" href="' + mine + '">', '<link rel="canonical" href="' + main + '">')
           .replace('<meta property="og:url" content="' + mine + '">', '<meta property="og:url" content="' + main + '">');
    }
  }
  return { s: o, type: k.type, T, D };
}
function fixReader(slug, s) {
  const self = '<link rel="canonical" href="' + BASE + slug + '/chitra-pustak/reader.html">';
  const main = '<link rel="canonical" href="' + BASE + slug + '/chitra-pustak/">';
  if (s.indexOf(main) > -1) return s;
  if (s.indexOf(self) < 0) return null;
  return s.replace(self, main);
}
/* ================= v1.1: हुनर / विषय / नियम-पेज / जुड़वाँ पेज ================= */
const SITE = "https://acslearn.com/";
const qAttr = s => s.replace(/"/g, "&quot;");
function metaRe(sel) { return new RegExp("(<meta " + sel + ' content=")([\\s\\S]*?)("\\s*/?>)(?=\\s*<)'); }
const RE_DESC = metaRe('name="description"'), RE_OGT = metaRe('property="og:title"'), RE_OGD = metaRe('property="og:description"'),
      RE_TWT = metaRe('name="twitter:title"'), RE_TWD = metaRe('name="twitter:description"');
function setMeta(o, re, val) { return re.test(o) ? o.replace(re, (m, a, b, c) => a + val + c) : o; }
function fixHunar(rel, s) {
  const F = HN.familyOf(rel); if (!F) return { s };
  const tm = s.match(/<title>([\s\S]*?)<\/title>/); if (!tm) return { err: "title नहीं मिला" };
  let o = s, T = tm[1];
  const nt = HN.title(F, T, rel);
  if (nt !== null && nt !== T) { T = nt; o = o.replace(/<title>[\s\S]*?<\/title>/, () => "<title>" + T + "</title>"); }
  if (nt !== null || /"/.test(T)) { o = setMeta(o, RE_OGT, qAttr(T)); o = setMeta(o, RE_TWT, qAttr(T)); }
  let D = "";
  const dm = o.match(RE_DESC);
  if (dm && !/\/index\.html$/.test(rel.replace(/\\/g, "/"))) {
    const raw = dm[2], broken = /"/.test(raw), old = HN.unesc(raw);
    const nd = HN.desc(F, old, s, broken, rel);
    let fin = nd === null ? old : nd;
    if (HN.DANGLE.test(fin)) { const t = HN.trimDangle(fin); if (HN.len(t) >= 40) fin = t; }   /* अधूरे शब्द पर ख़त्म नहीं */
    D = fin;
    if (nd !== null || fin !== old) {
      const a = HN.attr(fin);
      o = setMeta(o, RE_DESC, a); o = setMeta(o, RE_OGD, a); o = setMeta(o, RE_TWD, a);
    } else { const od = o.match(RE_OGD); if (od && /"/.test(od[2])) o = setMeta(o, RE_OGD, HN.attr(HN.unesc(dm[2]))); }
    /* schema का description = meta description (एक ही सच) */
    o = o.replace(/(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g, (m, a, blk, c) => {
      let j; try { j = JSON.parse(blk); } catch (e) { return m; }
      const plainStyle = JSON.stringify(j) === blk, escStyle = JSON.stringify(j).replace(/</g, "\\u003c") === blk;
      if (!plainStyle && !escStyle) return m;
      const arr = Array.isArray(j) ? j : (j["@graph"] || [j]); let ch = false;
      for (const x of arr) if (x && x["@type"] === "LearningResource" && x.description !== D) { x.description = D; ch = true; }
      if (!ch) return m;
      const out = JSON.stringify(j);
      return a + (plainStyle ? out : out.replace(/</g, "\\u003c")) + c;
    });
  }
  return { s: o, type: F.key, T, D };
}
function fixSubject(s) {   /* सिर्फ़ "जल्द उपलब्ध" वाले ख़ाली विषय-पेज */
  const dm = s.match(RE_DESC);
  if (!dm || !/जल्द उपलब्ध/.test(dm[2])) return s;
  return s.replace(/<meta name="robots" content="[^"]*">/, '<meta name="robots" content="noindex, follow">');
}
function fixConsentHead(s) {   /* <title> और <meta> पंक्तियों में <bdi> नहीं (build_learner_consent_lang.py का clean_head यही करता है) */
  const i = s.indexOf("</head>"); if (i < 0) return s;
  return s.slice(0, i).split("\n").map(l => /^\s*<(title>|meta )/.test(l) ? l.replace(/<\/?bdi[^>]*>/g, "") : l).join("\n") + s.slice(i);
}
function fixTwinPage(rel, s) {
  const main = TWIN_PAGES[rel]; if (!main) return s;
  const a = SITE + rel, b = SITE + main;
  return s.replace('<link rel="canonical" href="' + a + '">', '<link rel="canonical" href="' + b + '">').replace('<meta property="og:url" content="' + a + '">', '<meta property="og:url" content="' + b + '">');
}
function extra(errs, writes, stat) {
  const bump = (t, T, D, ch) => { const x = stat[t] = stat[t] || { n: 0, ch: 0, tmax: 0, dmax: 0 }; x.n++; if (ch) x.ch++; x.tmax = Math.max(x.tmax, SEO.len(T || "")); x.dmax = Math.max(x.dmax, SEO.len(D || "")); };
  for (const F of HN.FAMILIES) {
    const dir = path.join(ROOT, F.dir); if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).sort()) {
      if (!f.endsWith(".html")) continue;
      const rel = F.dir + "/" + f, full = path.join(dir, f), s = fs.readFileSync(full, "utf8");
      if (/http-equiv=["']refresh["']/i.test(s.slice(0, 20000))) continue;
      const r = fixHunar(rel, s);
      if (r.err) { errs.push(rel + " : " + r.err); continue; }
      const o = fixTwinPage(rel, r.s);
      bump(F.key, r.T, r.D, o !== s); if (o !== s) writes.push([full, o, rel]);
    }
  }
  const ud = path.join(ROOT, "udyam");
  if (fs.existsSync(ud)) for (const f of fs.readdirSync(ud).sort()) {
    if (!f.endsWith(".html") || f === "index.html") continue;
    const full = path.join(ud, f), s = fs.readFileSync(full, "utf8");
    const tm = s.match(/<title>([\s\S]*?)<\/title>/); if (!tm) continue;
    const nt = HN.udyamTitle(tm[1]); let o = s;
    if (nt !== null) {
      o = o.replace(/<title>[\s\S]*?<\/title>/, () => "<title>" + nt + "</title>");
      const og = o.match(RE_OGT);
      if (og) o = setMeta(o, RE_OGT, (/&amp;|&quot;/.test(og[2]) || !/[&"]/.test(og[2])) ? HN.attr(HN.unesc(nt)) : qAttr(nt));
    }
    bump("udyam", nt === null ? tm[1] : nt, "", o !== s); if (o !== s) writes.push([full, o, "udyam/" + f]);
  }
  const sd = path.join(ROOT, "courses/hi/subject");
  if (fs.existsSync(sd)) for (const f of fs.readdirSync(sd).sort()) {
    if (!f.endsWith(".html")) continue;
    const full = path.join(sd, f), s = fs.readFileSync(full, "utf8"), o = fixSubject(s);
    bump("subject", "", "", o !== s); if (o !== s) writes.push([full, o, "courses/hi/subject/" + f]);
  }
  for (const d of fs.readdirSync(ROOT)) {
    const full = path.join(ROOT, d, "rules-consent-learner.html");
    if (!/^[a-z]{2,3}$/.test(d) || !fs.existsSync(full)) continue;
    const s = fs.readFileSync(full, "utf8"), o = fixConsentHead(s);
    bump("consent", "", "", o !== s); if (o !== s) writes.push([full, o, d + "/rules-consent-learner.html"]);
  }
}
function run(opt) {
  opt = opt || {};
  const base = path.join(ROOT, "courses/hi/bhasha"), errs = [], writes = [], stat = {};
  for (const slug of fs.readdirSync(base).sort()) {
    const dir = path.join(base, slug); if (!fs.statSync(dir).isDirectory()) continue;
    for (const sub of ["", "brief", "bolo-workbook", "shabdkosh", "workbook", "lipi", "chitra-pustak", "vyakaran"]) {
      const rel = "courses/hi/bhasha/" + slug + "/" + (sub ? sub + "/" : "") + "index.html", f = path.join(ROOT, rel);
      if (!fs.existsSync(f)) continue;
      const s = fs.readFileSync(f, "utf8");
      if (/http-equiv=["']refresh["']/i.test(s.slice(0, 20000))) continue; /* पता-बदली पर्ची : छूना नहीं */
      const r = fixPage(rel, s);
      if (r.err) { errs.push(rel + " : " + r.err); continue; }
      stat[r.type] = stat[r.type] || { n: 0, ch: 0, tmax: 0, dmax: 0 };
      stat[r.type].n++; stat[r.type].tmax = Math.max(stat[r.type].tmax, SEO.len(r.T)); stat[r.type].dmax = Math.max(stat[r.type].dmax, SEO.len(r.D));
      if (r.s !== s) { stat[r.type].ch++; writes.push([f, r.s, rel]); }
    }
    const rf = path.join(dir, "chitra-pustak", "reader.html");
    if (fs.existsSync(rf)) {
      const s = fs.readFileSync(rf, "utf8"), o = fixReader(slug, s);
      if (o === null) errs.push("courses/hi/bhasha/" + slug + "/chitra-pustak/reader.html : canonical पंक्ति नहीं मिली");
      else if (o !== s) { stat.reader = stat.reader || { n: 0, ch: 0, tmax: 0, dmax: 0 }; stat.reader.ch++; writes.push([rf, o, "courses/hi/bhasha/" + slug + "/chitra-pustak/reader.html"]); }
    }
  }
  extra(errs, writes, stat);
  if (errs.length) { errs.slice(0, 30).forEach(e => console.log("❌ " + e)); throw new Error("build_seo_meta: " + errs.length + " पेज पहचाने नहीं गए : कुछ नहीं लिखा गया"); }
  if (opt.check) return { pending: writes.map(w => w[2]), stat };
  writes.forEach(w => fs.writeFileSync(w[0], w[1], "utf8"));
  if (!opt.quiet) {
    Object.keys(stat).forEach(t => console.log("  " + t + " : " + stat[t].n + " पेज, बदले " + stat[t].ch + ", सबसे लंबा title " + stat[t].tmax + ", description " + stat[t].dmax));
    console.log("🏁 build_seo_meta v1.3 : " + writes.length + " फ़ाइलें लिखीं");
  } else if (writes.length) console.log("  (SEO-परत: " + writes.length + " पेज अद्यतन)");
  return { pending: [], stat, written: writes.length };
}
module.exports = { run, fixPage, fixHunar, fixConsentHead };
if (require.main === module) {
  const chk = process.argv.includes("--check");
  const r = run({ check: chk });
  if (chk) { if (r.pending.length) { console.log("❌ SEO-परत लंबित: " + r.pending.length + " पेज (जैसे " + r.pending.slice(0, 3).join(", ") + ")"); process.exit(1); } console.log("🏁 SEO-परत: सब पेज पहले से सही"); }
}
