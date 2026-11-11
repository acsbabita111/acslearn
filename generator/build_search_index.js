/* ============================================================
   build_search_index.js v1.1 (परत-4, 12-Nov-2026) : होम-पेज के खोज-बॉक्स की सूची
   बनाता है: /assets/search_index.json
   हर खाना: [क़िस्म, हिंदी नाम, English नाम, पता, अतिरिक्त खोज-शब्द, English होम के लिए पता (हो तो)]
   क़िस्म: b = भाषा-कोर्स · h = हुनर-कोर्स · u = उद्यम · k = करियर।
   स्रोत = sitemap (सिर्फ़ वही जो सचमुच live और खोज-योग्य है) + उन्हीं पेजों के अपने नाम।
   कुछ भी गढ़ा नहीं जाता; जो पेज sitemap में नहीं, वह खोज में नहीं।
   v1.1 (ChatGPT-ऑडिट, 12-Nov): (1) हुनर-कोर्स का English नाम assets/courses_data.js (name_en) से आता है,
   और कोर्स-पेज के अपने शीर्षक/विवरण के English शब्द अतिरिक्त खोज-शब्द बनते हैं : यहाँ कोई अलग हाथ-लिखी सूची नहीं।
   (2) हुनर-कोर्स का पता sitemap वाला canonical रूप (…/ पर ख़त्म), index.html वाला नहीं।
   (3) करियर टेस्ट का English पता (/en/career.html) अलग खाने में : English होम उसी पर भेजता है।
   कब चलाएँ: build_sitemap.js के बाद, build_home.js से पहले (होम में इस सूची की छाप जाती है)।
   चलाना: node generator/build_search_index.js [--check]   (--check = सिर्फ़ जाँच: सूची sitemap से मेल खाती है?)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), OUT = path.join(ROOT, "assets", "search_index.json");
const un = s => s.replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, " ").trim();
const locs = k => [...fs.readFileSync(path.join(ROOT, "sitemap-" + k + ".xml"), "utf8").matchAll(/<loc>https:\/\/acslearn\.com([^<]+)<\/loc>/g)].map(m => m[1]);
function allCourses() {   /* courses_data.js की हर सूची (नाम यहाँ नहीं लिखे : फ़ाइल से ही पढ़े जाते हैं) */
  const src = fs.readFileSync(path.join(ROOT, "assets", "courses_data.js"), "utf8");
  const names = [...src.matchAll(/^(?:const|var|let)\s+([A-Z_][A-Z0-9_]*)\s*=\s*\[/gm)].map(m => m[1]);
  const box = {}; new Function("window", src + ";window.__A=[].concat(" + names.join(",") + ");")(box);
  return box.__A.filter(c => c && c.id && c.url);
}
const latin = s => (String(s).match(/[A-Za-z][A-Za-z0-9+#-]{2,}/g) || []).join(" ");
function build() {
  const out = []; const n = { b: 0, h: 0, u: 0, k: 0 };
  for (const u of locs("bhasha")) {
    if (!/^\/courses\/hi\/bhasha\/[^\/]+\/$/.test(u)) continue;
    const h = fs.readFileSync(path.join(ROOT, u.slice(1), "index.html"), "utf8"), k = h.match(/window\.KKB2_META=(\{[^;]*\})/);
    if (!k) throw new Error("भाषा-कोर्स का नाम नहीं मिला: " + u);
    const j = JSON.parse(k[1]); out.push(["b", j.hi, j.en, u, "spoken learn सीखें बोलना कोर्स course"]); n.b++;
  }
  const hunarSet = new Set(locs("hunar")), COURSES = allCourses();
  const hn = fs.readFileSync(path.join(ROOT, "hunar.html"), "utf8"), b0 = hn.indexOf('<div id="hnList">'), box = hn.slice(b0, hn.indexOf("</div>", b0));
  if (b0 < 0) throw new Error("hunar.html में हुनर-सूची (hnList) नहीं मिली");
  for (const m of box.matchAll(/<a href="(\/courses\/[^"]+)"[^>]*>([\s\S]*?)<span/g)) {
    const canon = m[1].replace(/index\.html$/, "");
    if (!hunarSet.has(canon)) throw new Error("हुनर-कोर्स sitemap में नहीं: " + m[1]);
    const c = COURSES.find(x => x.url === m[1] || x.url === canon);
    if (!c || !c.name_en) throw new Error("हुनर-कोर्स का English नाम courses_data.js में नहीं: " + m[1]);
    const pg = fs.readFileSync(path.join(ROOT, canon.slice(1), "index.html"), "utf8");
    const ttl = un((pg.match(/<title>([\s\S]*?)<\/title>/) || [, ""])[1]).replace(/\s*\|\s*ACS\s*$/, ""), dsc = (pg.match(/<meta name="description" content="([^"]*)"/) || [, ""])[1];
    /* अतिरिक्त खोज-शब्द: पते के शब्द + English नाम (बिना hyphen) + कोर्स-पेज का अपना शीर्षक (हिंदी व English) + विवरण के English शब्द */
    const extra = [canon.split("/").filter(x => x && !/^(courses|hi)$/.test(x)).join(" ").replace(/-/g, " "), c.name_en.replace(/-/g, ""), ttl, latin(un(dsc)), "course कोर्स"].join(" ").replace(/\s+/g, " ").trim();
    out.push(["h", un(m[2]), c.name_en, canon, extra]); n.h++;
  }
  for (const u of locs("udyam")) {
    if (!/^\/udyam\/[^\/]+\.html$/.test(u)) continue;
    const h = fs.readFileSync(path.join(ROOT, u.slice(1)), "utf8"), t = un((h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [, ""])[1]);
    if (!t) throw new Error("उद्यम का नाम नहीं मिला: " + u);
    const pm = t.match(/\(([^()]*)\)/);
    out.push(["u", t.replace(/\s*\([^()]*\)/g, "").replace(/\s+—\s+.*$/, "").trim(), pm ? pm[1].split(" — ")[0] : "", u, ""]); n.u++;
  }
  if (!fs.existsSync(path.join(ROOT, "en/career.html"))) throw new Error("en/career.html नहीं मिला");
  out.push(["k", "करियर टेस्ट (अपनी रुचि पहचानो)", "Career Test", "/career.html", "career interest test aptitude अभिरुचि", "/en/career.html"]);
  out.push(["k", "करियर-किट (रिज़्यूमे और पोर्टफ़ोलियो)", "Career Kit", "/career-kit.html", "resume portfolio interview इंटरव्यू"]); n.k = 2;
  return { json: JSON.stringify(out), n };
}
function check() { const want = build().json; return fs.existsSync(OUT) && fs.readFileSync(OUT, "utf8") === want; }
module.exports = { build, check, OUT };
if (require.main === module) {
  if (process.argv.includes("--check")) { if (!check()) { console.log("❌ खोज-सूची बासी है (sitemap से मेल नहीं) : चलाएँ node generator/build_search_index.js, फिर build_home.js"); process.exit(1); } console.log("🏁 खोज-सूची sitemap से मेल खाती है"); }
  else { const r = build(); fs.writeFileSync(OUT, r.json, "utf8"); console.log("🏁 build_search_index v1.1 : भाषा " + r.n.b + " · हुनर " + r.n.h + " · उद्यम " + r.n.u + " · करियर " + r.n.k + " · " + Buffer.byteLength(r.json) + " बाइट"); }
}
