/* pl0_landing.js v1.0 · 26-Oct-2026 — "पहला कोड" का मुख्य पन्ना (landing / कोर्स-परिचय) · परत-4 का हिस्सा
   Founder-मानक (SE024 सत्र: "सूखा पहला पन्ना निराशाजनक है"): चित्र-बैनर · आँकड़ा-कार्ड · बड़े बटन · कौन करे · क्या चाहिए ·
   सफ़र-नक़्शा · पढ़कर क्या होगा · कहानी (साफ़-साफ़ काल्पनिक) · प्रमाणपत्र (ईमानदार) · सवाल-जवाब · पूरी पाठ-सूची।
   तथ्य कहाँ से (एक चीज़ = एक जगह): अवधि/पढ़ाई/पाठ-गिनती/स्तर → assets/courses_data.js (SE025) ·
   पन्ने के शब्द → PL0_COURSE.landing · अध्याय/पाठ → PL0_PARTS/PL0_LESSONS। यहाँ कोई कोर्स-तथ्य हाथ से नहीं।
   SEO: Course + FAQPage + BreadcrumbList (JSON-LD, @graph) · og/twitter · hreflang · og:image (1200×630) */
"use strict";
const fs = require("fs"), path = require("path");
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const attr = s => esc(s).replace(/"/g, "&quot;");
const ldSafe = o => JSON.stringify(o).replace(/</g, "\\u003c");
const EDU_HI = { none: "कोई डिग्री ज़रूरी नहीं", class5: "कक्षा 5", class6: "कक्षा 6", class8: "कक्षा 8", class10: "कक्षा 10", class12: "कक्षा 12", iti: "ITI", diploma: "डिप्लोमा", bachelor: "स्नातक" };

function loadSE(root, url) {
  const src = fs.readFileSync(path.join(root, "assets", "courses_data.js"), "utf8");
  const m = src.match(new RegExp('\\{"id": "[A-Z]+\\d+"[^{}]*"url": "' + url.replace(/[/.]/g, "\\$&") + '"[^{}]*\\}'));
  if (!m) throw new Error("courses_data.js में इस कोर्स की प्रविष्टि नहीं: " + url + " — landing के तथ्य वहीं से आते हैं");
  const se = JSON.parse(m[0]);
  for (const k of ["duration", "edu", "lessons", "level"]) if (se[k] === undefined) throw new Error("courses_data प्रविष्टि में '" + k + "' नहीं");
  return se;
}
/* {duration} {lessons} {lo} {hi} — तथ्य SE025/पाठों से, शब्दों में भरे जाएँ (हाथ से अंक नहीं) */
function fillCtx(s, x) { return String(s).replace(/\{(duration|lessons|lo|hi|chapters)\}/g, (m, k) => { if (x[k] === undefined) throw new Error("ctx में " + k + " नहीं"); return x[k]; }); }
function ctxOf(C, LS, se) { const mins = LS.map(l => String(l.minutes).split("-").map(Number)); return { duration: se.duration, lessons: String(se.lessons), lo: String(Math.min(...mins.map(m => m[0]))), hi: String(Math.max(...mins.map(m => m[m.length - 1]))), chapters: String(C.parts.length) }; }
function req(o, k) { if (o[k] === undefined) throw new Error("PL0_COURSE.landing." + k + " नहीं"); return o[k]; }

/* ---- चित्र (SVG) — ACS के 5 रंग ---- */
function heroSVG() {
  return `<svg class="ld-hero-svg" viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="गाँव का एक बच्चा फ़ोन पर पहला code लिखता है — फ़ोन से उसका अपना वेब-पन्ना बनता है, फिर Python का खेल, और रास्ता दुनिया की ओर जाता है">
<rect width="800" height="360" fill="#0B1F3A"/>
<circle cx="690" cy="70" r="34" fill="#F9A825"/>
<path d="M0 300 Q 200 250 400 290 T 800 270 L800 360 L0 360 Z" fill="#2E7D32"/>
<path d="M0 320 Q 220 285 420 315 T 800 300 L800 360 L0 360 Z" fill="#1565C0" opacity="0.55"/>
<g transform="translate(60,170)"><rect x="0" y="40" width="110" height="80" fill="#F5F7FA"/><polygon points="-10,42 55,-5 120,42" fill="#F9A825"/><rect x="42" y="78" width="26" height="42" fill="#1565C0"/><rect x="12" y="58" width="22" height="18" fill="#1565C0"/></g>
<text x="115" y="318" text-anchor="middle" font-size="18" fill="#F5F7FA" font-weight="bold">मेरा गाँव</text>
<g transform="translate(250,95)"><rect x="0" y="0" width="120" height="200" rx="18" fill="#F5F7FA" stroke="#F9A825" stroke-width="5"/><rect x="12" y="22" width="96" height="150" rx="6" fill="#0B1F3A"/>
<text x="20" y="52" font-size="16" fill="#F9A825" font-family="monospace">print(</text><text x="20" y="74" font-size="16" fill="#F5F7FA" font-family="monospace">"नमस्ते"</text><text x="20" y="96" font-size="16" fill="#F9A825" font-family="monospace">)</text>
<rect x="20" y="118" width="80" height="24" rx="5" fill="#2E7D32"/><text x="60" y="135" text-anchor="middle" font-size="16" fill="#F5F7FA" font-weight="bold">▶ चलाओ</text><circle cx="60" cy="186" r="7" fill="#1565C0"/></g>
<path d="M 380 190 L 450 190" stroke="#F9A825" stroke-width="5" fill="none"/><polygon points="458,190 444,182 444,198" fill="#F9A825"/>
<g transform="translate(468,120)"><rect x="0" y="0" width="150" height="110" rx="10" fill="#F5F7FA"/><rect x="0" y="0" width="150" height="24" rx="10" fill="#1565C0"/><text x="75" y="17" text-anchor="middle" font-size="16" fill="#F5F7FA" font-weight="bold">मेरा पन्ना</text>
<rect x="14" y="36" width="90" height="12" rx="4" fill="#0B1F3A"/><rect x="14" y="56" width="122" height="9" rx="4" fill="#94A3B8"/><rect x="14" y="72" width="104" height="9" rx="4" fill="#94A3B8"/><rect x="14" y="88" width="60" height="14" rx="4" fill="#2E7D32"/></g>
<path d="M 628 175 L 670 175" stroke="#F9A825" stroke-width="5" fill="none"/><polygon points="678,175 664,167 664,183" fill="#F9A825"/>
<g transform="translate(722,182)"><circle r="44" fill="#1565C0"/><ellipse rx="44" ry="17" fill="none" stroke="#F5F7FA" stroke-width="3"/><ellipse rx="17" ry="44" fill="none" stroke="#F5F7FA" stroke-width="3"/><line x1="-44" y1="0" x2="44" y2="0" stroke="#F5F7FA" stroke-width="3"/></g>
<text x="722" y="252" text-anchor="middle" font-size="18" fill="#F5F7FA" font-weight="bold">विश्व तक</text>
</svg>`;
}
function journeyHTML(bhag, parts) { /* फ़ोन पर पढ़ने योग्य रंगीन कार्ड (चौड़ा चित्र फ़ोन पर सिकुड़कर अपठनीय था) */
  const ic = ["🧠", "🌐", "🐍", "🪜"];
  const rng = b => { const a = parts.find(p => p.no === b.chFrom), z = parts.find(p => p.no === b.chTo); return "पाठ " + a.from + "-" + z.to + " · अध्याय " + b.chFrom + (b.chTo > b.chFrom ? "-" + b.chTo : ""); };
  return `<h2>🗺 सफ़र का नक़्शा — चार भाग, एक धागा</h2><div class="ld-road">` + bhag.map((b, i) =>
    `<div class="ld-step ld-s${i}"><span class="ld-sic">${ic[i]}</span><span class="ld-sn">${i + 1}. ${esc(b.name.split(" — ")[0])}</span><span class="ld-sd">${esc(b.name.split(" — ")[1] || "")}</span><span class="ld-sr">${esc(rng(b))}</span></div>`).join("") +
    `</div><p class="ld-note">सोच पहले, फिर पन्ने, फिर Python, फिर आगे की राहें — हर भाग अगले की नींव।</p>`;
}
function journeySVG(bhag, parts) {
  const col = ["#1565C0", "#2E7D32", "#F9A825", "#0B1F3A"], fg = ["#F5F7FA", "#F5F7FA", "#0B1F3A", "#F5F7FA"];
  const rng = b => { const a = parts.find(p => p.no === b.chFrom), z = parts.find(p => p.no === b.chTo); return "पाठ " + a.from + "-" + z.to; };
  const ic = ["🧠", "🌐", "🐍", "🪜"];
  let g = "";
  bhag.forEach((b, i) => {
    const x = 20 + i * 195;
    g += `<rect x="${x}" y="70" width="180" height="150" rx="16" fill="${col[i]}"/>` +
      `<text x="${x + 90}" y="112" text-anchor="middle" font-size="34">${ic[i]}</text>` +
      `<text x="${x + 90}" y="150" text-anchor="middle" font-size="19" font-weight="bold" fill="${fg[i]}">${esc(b.name.split(" — ")[0])}</text>` +
      `<text x="${x + 90}" y="176" text-anchor="middle" font-size="16" fill="${fg[i]}">${esc(rng(b))}</text>` +
      `<text x="${x + 90}" y="200" text-anchor="middle" font-size="16" fill="${fg[i]}">अध्याय ${b.chFrom}${b.chTo > b.chFrom ? "-" + b.chTo : ""}</text>`;
    if (i < bhag.length - 1) g += `<polygon points="${x + 184},145 ${x + 194},135 ${x + 194},155" fill="#F9A825"/>`;
  });
  const names = bhag.map(b => esc(b.name.split(" — ")[1] || "")).join(" · ");
  return `<svg class="ld-journey-svg" viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="सफ़र का नक़्शा: चार भाग — ${names}">
<rect width="800" height="260" rx="18" fill="#F5F7FA"/><text x="400" y="44" text-anchor="middle" font-size="22" font-weight="bold" fill="#0B1F3A">🗺 सफ़र का नक़्शा — चार भाग, एक धागा</text>${g}
<text x="400" y="246" text-anchor="middle" font-size="16" fill="#1565C0">सोच पहले, फिर पन्ने, फिर Python, फिर आगे की राहें</text></svg>`;
}

/* ---- पन्ना ---- */
function landingBody(C, LS, partSections, se, firstFile) {
  const L = C.landing; if (!L) throw new Error("PL0_COURSE.landing नहीं");
  const minEdu = EDU_HI[se.edu[0]] || se.edu[0];
  const mins = LS.map(l => String(l.minutes).split("-").map(Number)); const lo = Math.min(...mins.map(m => m[0])), hi = Math.max(...mins.map(m => m[m.length - 1]));
  const stat = (big, small) => `<div class="ld-stat"><span class="ld-big">${esc(big)}</span><span class="ld-small">${esc(small)}</span></div>`;
  const card = c => `<div class="ld-card"><span class="ld-ic">${c.icon}</span><b>${esc(c.t)}</b><span>${esc(c.d)}</span></div>`;
  const X = ctxOf(C, LS, se);
  const faq = req(L, "faq").map(([q, a]) => `<details class="ld-faq"><summary>${esc(q)}</summary><p>${esc(fillCtx(a, X))}</p></details>`).join("\n");
  return `
<article class="lsn-wrap ci-wrap ld-wrap" data-course-index="${C.slug}">
<header class="ld-hero">
<p class="lsn-crumb"><a href="/">होम</a> › <a href="/courses/hi/">कोर्स</a> › ${esc(C.title)}</p>
${heroSVG()}
<p class="ld-kicker">${esc(req(L, "kicker"))}</p>
<h1>${esc(C.title)}</h1>
<p class="ld-full">${esc(C.fullName.replace(/\s*\([^)]*\)/g, ""))}</p>
<p class="ld-tag">${esc(C.tagline)}</p>
<div class="ld-cta"><a class="ld-btn ld-go" href="${firstFile}">▶ पाठ-1 से मुफ़्त शुरू करें</a><a class="ld-btn ld-wb" href="workbook/">📘 अभ्यास-पुस्तिका (PDF)</a></div>
</header>

<section class="lsn-sec ld-stats">
${stat(String(se.lessons), "पाठ")}${stat(String(C.parts.length), C.partLabel)}${stat(se.duration, "लगभग (अपनी गति से)")}${stat("₹0", "ऑनलाइन पढ़ाई")}${stat(lo + "-" + hi, "मिनट हर पाठ")}${stat("📱", "फ़ोन काफ़ी")}
</section>

<section class="lsn-sec"><h2>👥 यह कोर्स किसके लिए है</h2>
<div class="ld-grid">${req(L, "audience").map(card).join("")}</div>
<p class="ld-note">${esc(req(L, "ageNote"))}</p></section>

<section class="lsn-sec"><h2>🎒 क्या चाहिए — और क्या नहीं</h2>
<div class="ld-two"><div class="ld-need"><h3>✅ बस इतना चाहिए</h3><ul>${["न्यूनतम पढ़ाई: " + minEdu + " — " + req(L, "readLevel")].concat(req(L, "need")).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
<div class="ld-noneed"><h3>❌ यह ज़रूरी नहीं</h3><ul>${req(L, "noNeed").map(x => `<li>${esc(x)}</li>`).join("")}</ul></div></div></section>

<section class="lsn-sec"><h2>⏳ कितने दिन का कोर्स है</h2>
<p>${esc(fillCtx(req(L, "pace"), X))}</p></section>

<section class="lsn-sec">${journeyHTML(C.bhag, C.parts)}</section>

<section class="lsn-sec"><h2>🎯 इसे पढ़कर क्या कर पाएँगे</h2>
<div class="ld-grid">${req(L, "outcomes").map(card).join("")}</div>
<p class="ld-honest">${esc(req(L, "honest"))}</p></section>

<section class="lsn-sec"><h2>🧩 हर पाठ में क्या मिलेगा</h2>
<div class="ld-chips">${req(L, "lessonParts").map(x => `<span>${esc(x)}</span>`).join("")}</div></section>

<section class="lsn-sec ld-story"><h2>📖 ${esc(req(L, "story").t)}</h2>
${L.story.p.map(p => `<p>${esc(p)}</p>`).join("")}
<p class="ld-note">${esc(L.story.label)}</p></section>

<section class="lsn-sec"><h2>🎓 प्रमाणपत्र</h2>
${req(L, "certificate").map(p => `<p>${esc(p)}</p>`).join("")}</section>

<section class="lsn-sec"><h2>❓ अक्सर पूछे जाने वाले सवाल</h2>
${faq}</section>

<section class="lsn-sec"><h2>📖 पूरी पाठ-सूची — ${C.parts.length} ${C.partLabel}, ${se.lessons} पाठ</h2>
<p>किसी भी पाठ पर सीधे जाइए — पढ़ाई मुफ़्त, बिना login।</p></section>
${partSections}
<section class="lsn-sec ld-end"><p class="ld-tag">${esc(req(L, "endLine"))}</p>
<div class="ld-cta"><a class="ld-btn ld-go" href="${firstFile}">▶ पाठ-1 से शुरू करें</a><a class="ld-btn ld-wb" href="workbook/">📘 अभ्यास-पुस्तिका</a></div></section>
</article>
`;
}
const LD_CSS = `<style>
.ld-hero{text-align:center}.ld-hero-svg,.ld-journey-svg{width:100%;height:auto;border-radius:16px;display:block}
.ld-kicker{display:inline-block;margin:14px 0 4px;font-size:17px;font-weight:700;color:#0B1F3A;background:#FFF5D6;border:2px solid #F9A825;border-radius:999px;padding:4px 14px}
.ld-hero h1{font-size:34px;line-height:1.25;margin:8px 0 4px;color:#0B1F3A}.ld-full{font-size:19px;color:#1565C0;font-weight:700;margin:4px 0}
.ld-tag{font-size:20px;color:#0B1F3A;margin:8px 0}
.ld-cta{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin:16px 0 6px}
.ld-btn{display:inline-block;font-size:20px;font-weight:800;text-decoration:none;border-radius:14px;padding:14px 22px}
.ld-go{background:#2E7D32;color:#F5F7FA}.ld-wb{background:#F5F7FA;color:#0B1F3A;border:3px solid #1565C0}
.ld-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px}
.ld-stat{background:#0B1F3A;color:#F5F7FA;border-radius:14px;padding:14px 10px;text-align:center}.ld-stat .ld-big{display:block;font-size:30px;font-weight:900;color:#F9A825;line-height:1.2}.ld-stat .ld-small{display:block;font-size:17px;color:#F5F7FA}
.ld-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:12px}
.ld-card{display:flex;flex-direction:column;gap:6px;background:#F5F7FA;border:2px solid #0B1F3A;border-left:8px solid #F9A825;border-radius:14px;padding:14px}
.ld-card b{font-size:19px;color:#0B1F3A}.ld-card span{font-size:17px;color:#0B1F3A;line-height:1.6}.ld-ic{font-size:34px}
.ld-two{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px}
.ld-need,.ld-noneed{border-radius:14px;padding:12px 16px}.ld-need{background:#E8F5E9;border:2px solid #2E7D32}.ld-noneed{background:#F5F7FA;border:2px solid #94A3B8}
.ld-need h3,.ld-noneed h3{font-size:20px;margin:4px 0 8px}.ld-need li,.ld-noneed li{font-size:18px;margin:6px 0}
.ld-chips{display:flex;flex-wrap:wrap;gap:10px}.ld-chips span{font-size:18px;background:#FFF5D6;border:2px solid #F9A825;border-radius:999px;padding:6px 14px}
.ld-honest{font-size:18px;background:#F5F7FA;border-left:6px solid #1565C0;border-radius:10px;padding:10px 14px;margin-top:12px}
.ld-note{font-size:16px;color:#334155}
.ld-story{background:#FFF5D6;border-radius:16px;padding:6px 16px}
.ld-faq{border:2px solid #0B1F3A;border-radius:12px;margin:10px 0;padding:10px 14px;background:#F5F7FA}.ld-faq summary{font-size:19px;font-weight:800;cursor:pointer}.ld-faq p{font-size:18px;margin:8px 0 0}
.ld-end{text-align:center}
.ld-road{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-top:8px}
.ld-step{border-radius:16px;padding:14px;text-align:center}.ld-step .ld-sic{font-size:38px;display:block}.ld-step .ld-sn{display:block;font-size:20px;font-weight:900;margin:4px 0}.ld-step .ld-sd{display:block;font-size:17px;line-height:1.5}.ld-step .ld-sr{display:block;font-size:16px;margin-top:6px;font-weight:700}
.ld-s0{background:#1565C0;color:#F5F7FA}.ld-s1{background:#2E7D32;color:#F5F7FA}.ld-s2{background:#F9A825;color:#0B1F3A}.ld-s3{background:#0B1F3A;color:#F5F7FA}
.ci-ch{margin:8px 0}.ci-ch>summary{cursor:pointer;list-style:none;font-size:19px;font-weight:800;color:#0B1F3A;background:#F5F7FA;border:2px solid #0B1F3A;border-radius:12px;padding:10px 14px}.ci-ch>summary::-webkit-details-marker{display:none}.ci-ch>summary::after{content:" ▾";color:#1565C0}.ci-ch[open]>summary::after{content:" ▴"}
@media (max-width:480px){.ld-hero h1{font-size:28px}.ld-btn{font-size:18px;padding:12px 16px;width:100%;text-align:center}}
</style>`;

/* ---- head: SEO ---- */
function landingHead(C, LS, se, canonical, ogImage) {
  const L = C.landing;
  const X = ctxOf(C, LS, se); const title = fillCtx(req(L, "seoTitle"), X), desc = fillCtx(req(L, "seoDesc"), X);
  const lessonsHours = Math.round(LS.reduce((a, l) => a + (+String(l.minutes).split("-").pop()), 0) / 60);
  const graph = { "@context": "https://schema.org", "@graph": [
    { "@type": "Course", "@id": canonical + "#course", "name": C.title, "alternateName": [C.fullName.replace(/\s*\([^)]*\)/g, ""), "First Code: Python — Start Python Programming in Hindi"],
      "description": desc, "url": canonical, "inLanguage": "hi", "isAccessibleForFree": true, "educationalLevel": "Beginner",
      "coursePrerequisites": req(L, "readLevel"), "teaches": req(L, "outcomes").map(o => o.t),
      "image": ogImage,
      "provider": { "@type": "Organization", "name": "Applied Computer School (ACS)", "url": "https://acslearn.com/", "logo": "https://acslearn.com/logo.png" },
      "offers": { "@type": "Offer", "price": 0, "priceCurrency": "INR", "category": "Free", "availability": "https://schema.org/InStock" },
      "hasCourseInstance": { "@type": "CourseInstance", "courseMode": "online", "courseWorkload": "PT" + lessonsHours + "H", "inLanguage": "hi" } },
    { "@type": "FAQPage", "mainEntity": req(L, "faq").map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": fillCtx(a, X) } })) },
    { "@type": "BreadcrumbList", "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://acslearn.com/" },
      { "@type": "ListItem", "position": 2, "name": "कोर्स", "item": "https://acslearn.com/courses/hi/" },
      { "@type": "ListItem", "position": 3, "name": C.title, "item": canonical } ] } ] };
  return { title, desc, extra:
    '<meta property="og:type" content="website">\n<meta property="og:title" content="' + attr(title) + '">\n<meta property="og:description" content="' + attr(desc) + '">\n' +
    '<meta property="og:url" content="' + canonical + '">\n<meta property="og:image" content="' + ogImage + '">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n' +
    '<meta property="og:image:alt" content="' + attr(C.title + " — " + C.tagline) + '">\n<meta property="og:locale" content="hi_IN">\n<meta property="og:site_name" content="Applied Computer School (ACS)">\n' +
    '<meta name="twitter:card" content="summary_large_image">\n<meta name="twitter:title" content="' + attr(title) + '">\n<meta name="twitter:description" content="' + attr(desc) + '">\n<meta name="twitter:image" content="' + ogImage + '">\n' +
    '<link rel="alternate" hreflang="hi" href="' + canonical + '">\n<link rel="alternate" hreflang="x-default" href="' + canonical + '">\n' +
    '<script type="application/ld+json">' + ldSafe(graph) + "</scr" + "ipt>\n" + LD_CSS + "\n" };
}
module.exports = { landingBody, landingHead, loadSE, heroSVG, fillCtx };
