#!/usr/bin/env node
/* ============================================================
   build_moved_stubs.js v1.1 (परत-4) · 27-Nov-2026 (पहला रूप 10-Nov-2026)
   काम: पुराने (Google को याद) पतों पर redirect-पर्ची बनाना, ताकि खोज से आया
   व्यक्ति 404 पर न गिरे और Google पुराने पते की ताक़त नए पते को दे।
   data: generator/data/moved_pages.js (एकमात्र घर)।
   पर्ची v2 (14-Sep की AIDM-पर्ची से एक अंतर): noindex नहीं।
     कारण: Google noindex + canonical को "मिले-जुले संकेत" मानता है;
     AIDM की noindex-पर्चियाँ GSC में "noindex से बाहर" गिनी गईं, redirect नहीं।
     यहाँ सिर्फ़: तुरंत meta-refresh (0) + canonical नए पते पर + JS location.replace।
   सुरक्षा (fail-closed):
     (क) लक्ष्य-पेज मौजूद न हो = रुको।
     (ख) पर्ची की जगह कोई असली पेज पहले से हो (हमारा निशान न हो) = रुको, कभी न लिखो।
     (ग) दोबारा चलाना सुरक्षित: वही सामग्री = छुआ नहीं।
   पर्चियों में /assets/acs-universal.js नहीं, canonical पराया : इसलिए
   build_sitemap.js इन्हें sitemap में कभी नहीं लेता।
   v1.1 (27-Nov-2026, खेप SEO-सफ़ाई v2):
     (घ) exact_gsc: Google को याद, पर साइट से हटे पते। लक्ष्य पर्ची निकले, तो यंत्र रुकता है (ज़ंजीर नहीं)।
     (ङ) upgrade: पुरानी बनावट की पर्ची (जिस पर noindex था) को पर्ची v2 बनाना। पुरानी फ़ाइल तभी बदलती है,
         जब वह ख़ुद उसी लक्ष्य की पर्ची हो (meta-refresh का पता = हमारा लक्ष्य)। कोई असली पन्ना कभी नहीं मिटता।
     (च) --check: कुछ नहीं लिखता; कोई पर्ची बासी या ग़ायब हो, तो रुकता है।
   चलाना: node generator/build_moved_stubs.js [--check]
   ============================================================ */
"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const BASE = "https://acslearn.com";
const MARK = "<!-- ACS redirect-पर्ची v2 · build_moved_stubs.js · हाथ से न बदलें -->";
const M = require("./data/moved_pages.js");

function fileOf(url) { return path.join(ROOT, url.endsWith("/") ? url + "index.html" : url); }
function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function titleOf(url) {
  const f = fileOf(url);
  if (!fs.existsSync(f)) throw new Error("लक्ष्य-पेज नहीं मिला: " + url);
  const m = fs.readFileSync(f, "utf8").match(/<title>([^<]*)<\/title>/);
  if (!m) throw new Error("लक्ष्य-पेज में title नहीं: " + url);
  return m[1].split(" | ")[0].trim();
}
function stub(to, msg, title) {
  return "<!DOCTYPE html>\n" + MARK + "\n" +
    '<html lang="hi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    "<title>" + esc(title) + " | ACS</title>" +
    '<link rel="canonical" href="' + BASE + to + '">' +
    '<meta http-equiv="refresh" content="0; url=' + to + '">' +
    "<script>location.replace(" + JSON.stringify(to) + " + location.hash);</script>" +
    '</head><body style="font-family:sans-serif;font-size:19px;line-height:1.7;padding:24px">' +
    "<p>" + esc(msg) + ': <a href="' + to + '">' + esc(title) + "</a></p>" +
    '<p style="font-size:16px">मूल भाषा: हिंदी</p></body></html>\n';
}

const CHECK = process.argv.includes("--check");
const jobs = []; /* [fromUrl, toUrl, msg, mode] : mode "" = नई पर्ची · "up" = पुरानी बनावट की पर्ची को v2 बनाना */
/* (1) folder 1:1 */
for (const r of M.folder) {
  const toDir = path.join(ROOT, r.to);
  /* सिर्फ़ असली पेज: कोई redirect-पर्ची (हमारी या पुरानी) लक्ष्य नहीं बनती : पर्ची-से-पर्ची ज़ंजीर निषिद्ध */
  const names = fs.readdirSync(toDir).filter(f => f.endsWith(".html") &&
    !/http-equiv="refresh"/i.test(fs.readFileSync(path.join(toDir, f), "utf8"))).sort();
  if (names.length < 2) throw new Error("folder-लक्ष्य लगभग ख़ाली: " + r.to);
  for (const n of names) {
    const toUrl = n === "index.html" ? r.to : r.to + n;
    jobs.push([r.from + n, toUrl, "यह पाठ अब नए पते पर है"]);
  }
}
/* (2) पुराना संस्करण → उसी कोर्स का नया घर */
for (const r of M.old_edition) {
  for (const n of r.names) jobs.push([r.dir + n, r.to, "यह पुराना पाठ अब नए " + r.course + " कोर्स में है"]);
}
/* (3) exact */
for (const r of M.exact) jobs.push([r.from, r.to, "यह पन्ना अब नए पते पर है"]);

/* (4) Google को याद, पर हटे पते */
for (const r of (M.exact_gsc || [])) jobs.push([r[0], r[1], "यह पुराना पता अब यहाँ खुलता है"]);
/* (5) पुरानी बनावट की पर्ची → v2 */
for (const r of (M.upgrade || [])) jobs.push([r[0], r[1], /\/L\d+\.html$/.test(r[0]) ? "यह पाठ अब नए पते पर है" : "यह पन्ना अब नए पते पर है", "up"]);

/* (6) दोहरा पन्ना → पर्ची */
for (const r of (M.duplicate || [])) jobs.push([r[0], r[1], "यह पाठ अब इसी पते पर है", "dup"]);
/* <main> का दिखने वाला पाठ (दोहरे पन्ने की पहचान के लिए) */
function mainText(html) { const m = html.match(/<main\b[\s\S]*<\/main>/i); return (m ? m[0] : html).replace(/<script\b[\s\S]*?<\/script>/gi, " ").replace(/<style\b[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }

/* पुरानी पर्ची का लक्ष्य (meta-refresh का पता) */
function refreshTo(html) { const m = /http-equiv=["']refresh["'][^>]*content=["']\s*\d+\s*;\s*url=([^"']+)["']/i.exec(html); return m ? m[1].replace(BASE, "") : null; }

/* दोहराव-जाँच */
const seen = new Set();
for (const [from] of jobs) { if (seen.has(from)) throw new Error("दो बार: " + from); seen.add(from); }

let made = 0, same = 0, upgraded = 0;
const titles = {}, stale = [];
for (const [from, to, msg, mode] of jobs) {
  if (from === to) throw new Error("ख़ुद पर redirect: " + from);
  if (/http-equiv="refresh"/i.test(fs.readFileSync(fileOf(to), "utf8"))) throw new Error("लक्ष्य ख़ुद पर्ची है (ज़ंजीर): " + to);
  const t = titles[to] || (titles[to] = titleOf(to));
  const html = stub(to, msg, t);
  const f = fileOf(from);
  if (fs.existsSync(f)) {
    const old = fs.readFileSync(f, "utf8");
    if (old.indexOf(MARK) === -1) {
      if (mode === "dup") {
        const a = mainText(old), b = mainText(fs.readFileSync(fileOf(to), "utf8"));
        /* कोर्स की पाठ-सूची वाली पट्टी में "(यही)" का निशान दोनों में अलग जगह होता है; बाक़ी पाठ हूबहू एक होना चाहिए */
        if (a.length < 500 || a !== b) throw new Error("दोहरा बताया पन्ना मुख्य पन्ने जैसा नहीं है, इसलिए नहीं बदला: " + from);
      } else if (mode !== "up") throw new Error("असली पेज पहले से है, पर्ची नहीं लिखी: " + from);
      else if (refreshTo(old) !== to) throw new Error("पुरानी फ़ाइल इसी लक्ष्य की पर्ची नहीं है, इसलिए नहीं बदली: " + from + " (उसका लक्ष्य: " + refreshTo(old) + ")");
      if (mode === "up") upgraded++;
    }
    if (old.replace(/\r\n/g, "\n") === html) { same++; continue; }
  } else if (mode === "up" || mode === "dup") throw new Error("upgrade-सूची का पता मौजूद ही नहीं: " + from);
  if (CHECK) { stale.push(from); continue; }
  fs.mkdirSync(path.dirname(f), { recursive: true });
  fs.writeFileSync(f, html, "utf8");
  made++;
}
if (CHECK) {
  if (stale.length) { console.log("❌ " + stale.length + " पर्ची बासी या ग़ायब: " + stale.slice(0, 5).join(", ") + " : चलाएँ node generator/build_moved_stubs.js"); process.exit(1); }
  console.log("🏁 redirect-पर्चियाँ ताज़ा हैं: " + jobs.length);
} else console.log("✅ redirect-पर्चियाँ: " + jobs.length + " (नई/बदली " + made + " · अछूती " + same + (upgraded ? " · पुरानी बनावट से v2 बनीं " + upgraded : "") + ")");
