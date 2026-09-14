/* dev_workbook_check.js v1.0 · 14-Sep-2026 — लिखो-workbook का check-robot (🏁-द्वार)
   जाँचें: 22 PDF मौजूद (18 सप्ताह + 3 महीना + शब्दकोश) · हर PDF >20 KB और %PDF-header · download-पेज generator-निशान/22 कड़ियाँ (download-attr)/[ ]/16px/मूल-भाषा/JSON-LD ·
   शब्दकोश-पूर्णता (missing-सूची "कोई नहीं") · बोलने-कोर्स पेज से कड़ी · sitemap में पेज */
const fs = require("fs"), path = require("path"); const ROOT = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(__dirname, "build_workbook.js"), "utf8");
const langs = require("child_process").execSync("node " + JSON.stringify(path.join(__dirname, "build_workbook.js")) + " --list", { encoding: "utf8" }).trim().split(" ").map(x => x.split(":")[0]).map(code => { const src2 = fs.readFileSync(path.join(__dirname, "build_specials.js"), "utf8"); const m = src2.match(new RegExp('\\{ code: "' + code + '", slug: "([a-z\\-]+)", en_name: "([^"]+)", hi_name: "([^"]+)"')); return { code, slug: m[1], en: m[2], hi: m[3] }; }).filter(l => fs.existsSync(path.join(ROOT, "courses/hi/bhasha", l.slug, "workbook", "index.html")));
let fail = 0; const ok = (c, m) => { console.log((c ? "  ✅ " : "  ❌ ") + m); if (!c) fail++; };
const only = process.argv[2]; const sm = fs.readFileSync(path.join(ROOT, "sitemap.xml"), "utf8");
for (const L of langs.filter(l => !only || l.code === only)) {
  console.log("— " + L.code + " (" + L.hi + ") —");
  const pageDir = path.join(ROOT, "courses/hi/bhasha", L.slug, "workbook"); const relDir = path.join(process.env.WB_OUT || path.join(ROOT, "..", "workbook-release"), L.slug);
  const dir = fs.existsSync(path.join(relDir, "week-01.pdf")) ? relDir : pageDir; console.log("  PDF-घर: " + (dir === relDir ? "release-folder (repo के बाहर)" : "repo"));
  const want = []; for (let w = 1; w <= 18; w++) want.push("week-" + String(w).padStart(2, "0") + ".pdf"); for (let m = 1; m <= 3; m++) want.push("month-" + m + ".pdf"); want.push("shabdkosh.pdf");
  let bad = 0; want.forEach(f => { const p = path.join(dir, f); if (!fs.existsSync(p) || fs.statSync(p).size < 20000 || fs.readFileSync(p).slice(0, 5).toString() !== "%PDF-") bad++; });
  ok(bad === 0, "22 PDF मौजूद/वैध (" + (22 - bad) + "/22)");
  const ip = path.join(pageDir, "index.html"); ok(fs.existsSync(ip), "download-पेज"); if (!fs.existsSync(ip)) continue;
  const s = fs.readFileSync(ip, "utf8");
  ok(/generator से बना \(build_workbook\.js/.test(s), "generator-निशान");
  ok((s.match(/\.pdf" download/g) || []).length === 22, "22 download-कड़ियाँ (" + (s.match(/\.pdf" download/g) || []).length + ")"); ok(dir === pageDir || /releases\/download\/workbook-/.test(s), "कड़ियाँ Releases-पते पर");
  const vis = s.replace(/<svg[\s\S]*?<\/svg>|<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>|<[^>]+>/g, " ");
  ok(!/[\[\]]/.test(vis), "square bracket शून्य"); ok(!(s.match(/font(?:-size)?\s*:\s*0*([0-9]|1[0-5])px/gi) || []).length, "<16px शून्य");
  ok(/मूल भाषा: हिंदी/.test(s), "मूल-भाषा निशान"); ok(/LearningResource/.test(s), "JSON-LD");
  const mp = path.join(__dirname, "data", "lipi", L.code + "_missing_words.txt"); const missTxt = fs.existsSync(mp) ? fs.readFileSync(mp, "utf8").trim() : ""; const missN = missTxt === "(कोई नहीं)" ? 0 : missTxt.split("\n").filter(Boolean).length;
  if (L.code === "en") ok(missN === 0, "शब्दकोश पूरा (मतलब-रहित शब्द शून्य)"); else console.log((missN ? "  ⚠️ " : "  ✅ ") + "शब्दकोश: मतलब-रहित " + missN + " (अर्थ-खेप बाक़ी; पेज पर ईमानदार पंक्ति)");
  ok(fs.readFileSync(path.join(ROOT, "courses/hi/bhasha", L.slug, "index.html"), "utf8").indexOf("/workbook/") >= 0, "बोलने-कोर्स पेज से कड़ी");
  ok(sm.indexOf("/courses/hi/bhasha/" + L.slug + "/workbook/") >= 0, "sitemap में");
}
console.log(fail ? "⛔ " + fail + " जाँच फेल" : "🏁 dev_workbook_check: सब पास"); process.exit(fail ? 1 : 0);
