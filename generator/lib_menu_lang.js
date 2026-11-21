/* ============================================================
   lib_menu_lang.js v1.0 (परत-4 का साझा हिस्सा, 21-Nov-2026, खेप M-1)
   Founder का आदेश (21-Nov-2026): पैनल की चारों भाषाओं (हिंदी, English, कन्नड़, बांग्ला) में मेन्यू का हर
   आइटम उसी भाषा के पन्ने पर खुले। यह फ़ाइल बताती है: कौन-सा मेन्यू-पन्ना किस भाषा में कहाँ है।
   - पते का एकमात्र घर = assets/links.js (मेन्यू): href (हिंदी), href_en (English), href_lang.<कोड> (भाषा-घर)।
   - कौन-सा पन्ना यंत्र (build_menu_lang.js) बनाता है = नीचे की PAGES सूची (स्रोत = हिंदी पन्ना)।
   - hreflang का गुच्छा (cluster) सिर्फ़ यहीं से बनता है; build_specials.js (verify) और build_menu_lang.js
     दोनों यही पढ़ते हैं।
   पता-नियम v1.1: पते में /hi/ की जगह /कोड/; हिंदी का पता root पर हो, तो भाषा का घर /कोड/ (जैसे /verify/ → /kn/verify/)।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");

/* पैनल की भाषाएँ (हिंदी मूल है, उसका पन्ना कोई यंत्र अनुवाद नहीं करता) */
const LANGS = {
  en: { locale: "en_US", font: "", fontCss: "Inter", style: "" },
  kn: { locale: "kn_IN", font: "&family=Noto+Sans+Kannada:wght@400;600;700;800;900", fontCss: "Noto Sans Kannada",
        style: "body,button,input,textarea,select{font-family:'Noto Sans Kannada','Inter',sans-serif;letter-spacing:0}h1,h2,h3,h4{letter-spacing:0}",
        script: /[ಀ-೿]/g },
  bn: { locale: "bn_IN", font: "&family=Noto+Sans+Bengali:wght@400;600;700;800;900", fontCss: "Noto Sans Bengali",
        style: "body,button,input,textarea,select{font-family:'Noto Sans Bengali','Inter',sans-serif;letter-spacing:0}h1,h2,h3,h4{letter-spacing:0}",
        script: /[ঀ-৿]/g }
};

/* यंत्र से बनने वाले पन्ने: कुंजी = links.js की मेन्यू-कुंजी; src = हिंदी पन्ना; make = किन भाषाओं में यंत्र बनाता है
   (English के मिशन, सलाह, उद्यम, वाणी पहले से हाथ के बने हैं, इसलिए वहाँ en नहीं)। */
const PAGES = {
  verify:  { src: "verify/index.html",     make: ["en"], hiOwner: "build_specials.js" },   /* हिंदी पन्ना build_specials.js लिखता है */
  contact: { src: "contact/hi/index.html", make: ["en"] },
  network: { src: "hi/network.html",       make: ["en"] }
};

function readLinks() {
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से मेन्यू नहीं पढ़ा गया");
  return box.__L;
}
function item(L, key) { const m = L.menu.find(x => x.key === key); if (!m) throw new Error("links.js में मेन्यू-कुंजी नहीं: " + key); return m; }
/* मेन्यू-आइटम का पता उस भाषा में (उस भाषा का अपना पन्ना न हो, तो null) */
function hrefOf(L, key, lang) {
  const m = item(L, key);
  if (lang === "hi") return m.href;
  if (lang === "en") return m.href_en || null;
  return (m.href_lang && m.href_lang[lang]) || null;
}
function fileOf(url) { const u = url.split(/[?#]/)[0].replace(/^\//, ""); return (u === "" || u.endsWith("/")) ? u + "index.html" : u; }
function htmlLang(file) {
  const f = path.join(ROOT, file); if (!fs.existsSync(f)) return null;
  const m = fs.readFileSync(f, "utf8").match(/<html[^>]*\slang="([^"]+)"/); return m ? m[1] : null;
}
/* hreflang का गुच्छा: हिंदी + वे भाषाएँ जिनका अपना पन्ना है: यंत्र बनाता है (PAGES.make), या हाथ का बना पन्ना
   उसी भाषा का है (<html lang>)। इसलिए पहली दौड़ में भी गुच्छा पूरा बनता है, किसी क्रम पर निर्भर नहीं। */
function cluster(L, key) {
  const out = [["hi", hrefOf(L, key, "hi")]], P = PAGES[key];
  for (const lg of Object.keys(LANGS)) {
    const u = hrefOf(L, key, lg); if (!u) continue;
    const made = P && P.make.indexOf(lg) > -1;
    if (made || htmlLang(fileOf(u)) === lg) out.push([lg, u]);
  }
  return out;
}
function hreflangLines(L, key) {
  const c = cluster(L, key);
  return c.map(x => '<link rel="alternate" hreflang="' + x[0] + '" href="https://acslearn.com' + x[1] + '">')
    .concat(['<link rel="alternate" hreflang="x-default" href="https://acslearn.com' + c[0][1] + '">']);
}
module.exports = { ROOT, LANGS, PAGES, readLinks, item, hrefOf, fileOf, htmlLang, cluster, hreflangLines };
