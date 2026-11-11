/* ============================================================
   build_seo_meta.js v1.0 (परत-4, 11-Nov-2026) : भाषा-कोर्स परिवार की "अंतिम SEO-परत"
   काम (हर बार वही नतीजा; दोबारा चलाने पर कुछ नहीं बदलता):
   1) सभी 8 पेज-प्रकार का title + description = lib_seo_meta.js का पाठ
      (<title>, og:title, meta description, og:description, schema का description)।
   2) चित्र-पुस्तक पेज: robots-निशान + schema (LearningResource + BreadcrumbList) जोड़ना।
   3) व्याकरण पेज: robots-निशान जोड़ना।
   4) चित्र-पुस्तक का मोबाइल-रूप (reader.html): canonical → मुख्य चित्र-पुस्तक पेज
      (दोनों में एक ही पढ़ाई है; Google को दोहराव न दिखे)।
   5) जुड़वाँ कोर्स (generator/data/seo_twins.js): canonical + og:url → मुख्य कोर्स।
   कब चलाएँ: कोई भी भाषा-generator चलाने के बाद, sitemap से पहले। छहों generator
   इसे अंत में अपने-आप बुलाते हैं; जाँच-यंत्र dev_seo_check.js भी पहरा देता है।
   चलाना: node generator/build_seo_meta.js [--check]   (--check = सिर्फ़ जाँच, कुछ नहीं लिखता)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const SEO = require("./lib_seo_meta.js");
const TWINS = require("./data/seo_twins.js");
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
  if (errs.length) { errs.slice(0, 30).forEach(e => console.log("❌ " + e)); throw new Error("build_seo_meta: " + errs.length + " पेज पहचाने नहीं गए : कुछ नहीं लिखा गया"); }
  if (opt.check) return { pending: writes.map(w => w[2]), stat };
  writes.forEach(w => fs.writeFileSync(w[0], w[1], "utf8"));
  if (!opt.quiet) {
    Object.keys(stat).forEach(t => console.log("  " + t + " : " + stat[t].n + " पेज, बदले " + stat[t].ch + ", सबसे लंबा title " + stat[t].tmax + ", description " + stat[t].dmax));
    console.log("🏁 build_seo_meta v1.0 : " + writes.length + " फ़ाइलें लिखीं");
  } else if (writes.length) console.log("  (SEO-परत: " + writes.length + " पेज अद्यतन)");
  return { pending: [], stat, written: writes.length };
}
module.exports = { run, fixPage };
if (require.main === module) {
  const chk = process.argv.includes("--check");
  const r = run({ check: chk });
  if (chk) { if (r.pending.length) { console.log("❌ SEO-परत लंबित: " + r.pending.length + " पेज (जैसे " + r.pending.slice(0, 3).join(", ") + ")"); process.exit(1); } console.log("🏁 SEO-परत: सब पेज पहले से सही"); }
}
