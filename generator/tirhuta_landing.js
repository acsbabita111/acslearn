/* tirhuta_landing.js v1.0 · 27-Oct-2026 — "तिरहुता लिपि" कोर्स का मुख्य पन्ना (landing) · परत-4 का हिस्सा
   आधार: kaithi_landing.js v1.0 (27-Oct) की तिरहुता-प्रति। Founder-मानक: चित्र-बैनर · आँकड़ा-कार्ड ·
   बड़े बटन · कौन करे · क्या चाहिए · सफ़र-नक़्शा · पढ़कर क्या होगा · कहानी (साफ़ काल्पनिक) · प्रमाणपत्र (ईमानदार) ·
   (खेप-5 में release-कड़ियाँ: download-खंड की ईमानदार-पंक्ति को workbook-tirhuta कड़ियों से बदलना है)
   सवाल-जवाब · शोध व संदर्भ-सूची (फ़ैसला #37) · पूरी पाठ-सूची।
   तथ्य: अवधि/पढ़ाई/पाठ-गिनती/स्तर → assets/courses_data.js (PJ434) · शब्द → TIR_COURSE.landing ·
   अध्याय/पाठ → TIR_COURSE.parts/TIR_LESSONS। यहाँ कोई कोर्स-तथ्य हाथ से नहीं।
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
function req(o, k) { if (o[k] === undefined) throw new Error("TIR_COURSE.landing." + k + " नहीं"); return o[k]; }

/* ---- चित्र (SVG) — ACS के 5 रंग ---- */
function heroSVG() {
  return `<svg class="ld-hero-svg" viewBox="0 0 800 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="मिथिला के घर की पुरानी पोथी तिरहुता लिपि में — एक पढ़ने वाला उसे समझता है, और रास्ता प्रमाणपत्र व काम तक जाता है">
<rect width="800" height="360" fill="#0B1F3A"/>
<circle cx="700" cy="64" r="32" fill="#F9A825"/>
<path d="M0 302 Q 200 252 400 292 T 800 272 L800 360 L0 360 Z" fill="#2E7D32"/>
<path d="M0 322 Q 220 287 420 317 T 800 302 L800 360 L0 360 Z" fill="#1565C0" opacity="0.55"/>
<g transform="translate(55,70)"><rect x="0" y="0" width="200" height="220" rx="8" fill="#F5F7FA" stroke="#F9A825" stroke-width="5"/>
<rect x="0" y="0" width="200" height="34" rx="8" fill="#1565C0"/><text x="100" y="24" text-anchor="middle" font-size="18" fill="#F5F7FA" font-weight="bold">पुरानी पोथी</text>
<rect x="16" y="48" width="168" height="12" rx="4" fill="#94A3B8"/><rect x="16" y="70" width="140" height="12" rx="4" fill="#94A3B8"/>
<rect x="16" y="92" width="168" height="12" rx="4" fill="#94A3B8"/><rect x="16" y="114" width="120" height="12" rx="4" fill="#94A3B8"/>
<rect x="16" y="140" width="168" height="2" fill="#0B1F3A"/>
<text x="100" y="172" text-anchor="middle" font-size="20" fill="#0B1F3A" font-weight="bold">तिरहुता लिपि में</text>
<text x="100" y="198" text-anchor="middle" font-size="18" fill="#1565C0">विद्यापति की परंपरा</text></g>
<path d="M 270 180 L 330 180" stroke="#F9A825" stroke-width="5" fill="none"/><polygon points="338,180 324,172 324,188" fill="#F9A825"/>
<g transform="translate(350,95)"><rect x="0" y="0" width="120" height="200" rx="18" fill="#F5F7FA" stroke="#F9A825" stroke-width="5"/>
<rect x="12" y="22" width="96" height="120" rx="6" fill="#0B1F3A"/>
<text x="60" y="58" text-anchor="middle" font-size="17" fill="#F9A825" font-weight="bold">अक्षर-दर-अक्षर</text>
<text x="60" y="84" text-anchor="middle" font-size="17" fill="#F5F7FA">पढ़ना</text>
<text x="60" y="110" text-anchor="middle" font-size="17" fill="#F5F7FA">सीखो</text>
<rect x="20" y="152" width="80" height="26" rx="6" fill="#2E7D32"/><text x="60" y="170" text-anchor="middle" font-size="16" fill="#F5F7FA" font-weight="bold">मुफ़्त पाठ</text></g>
<path d="M 478 190 L 538 190" stroke="#F9A825" stroke-width="5" fill="none"/><polygon points="546,190 532,182 532,198" fill="#F9A825"/>
<g transform="translate(558,110)"><rect x="0" y="0" width="170" height="130" rx="10" fill="#F5F7FA"/><rect x="0" y="0" width="170" height="28" rx="10" fill="#2E7D32"/>
<text x="85" y="20" text-anchor="middle" font-size="17" fill="#F5F7FA" font-weight="bold">अब मैं पढ़ लेता हूँ</text>
<text x="85" y="58" text-anchor="middle" font-size="18" fill="#0B1F3A">घर की पोथी</text>
<text x="85" y="84" text-anchor="middle" font-size="18" fill="#0B1F3A">दादा की पाती</text>
<circle cx="85" cy="108" r="12" fill="#F9A825"/><text x="85" y="114" text-anchor="middle" font-size="16" fill="#0B1F3A" font-weight="bold">✓</text></g>
<text x="643" y="270" text-anchor="middle" font-size="18" fill="#F5F7FA" font-weight="bold">गाँव से विश्व तक</text>
</svg>`;
}
function journeyHTML(bhag, parts) { /* फ़ोन पर पढ़ने योग्य रंगीन कार्ड (चौड़ा चित्र फ़ोन पर सिकुड़कर अपठनीय था) */
  const ic = ["📜", "🔤", "🧩", "🏛️"];
  const rng = b => { const a = parts.find(p => p.no === b.chFrom), z = parts.find(p => p.no === b.chTo); return "पाठ " + a.from + "-" + z.to + " · अध्याय " + b.chFrom + (b.chTo > b.chFrom ? "-" + b.chTo : ""); };
  return `<h2>🗺 सफ़र का नक़्शा — चार भाग, एक धागा</h2><div class="ld-road">` + bhag.map((b, i) =>
    `<div class="ld-step ld-s${i}"><span class="ld-sic">${ic[i]}</span><span class="ld-sn">${i + 1}. ${esc(b.name.split(" — ")[0])}</span><span class="ld-sd">${esc(b.name.split(" — ")[1] || "")}</span><span class="ld-sr">${esc(rng(b))}</span></div>`).join("") +
    `</div><p class="ld-note">पहले पहचान, फिर अक्षर-मात्रा, फिर शब्द, फिर असली दस्तावेज़ — हर भाग अगले की नींव।</p>`;
}
/* ---- पन्ना ---- */
function landingBody(C, LS, partSections, se, firstFile) {
  const L = C.landing; if (!L) throw new Error("TIR_COURSE.landing नहीं");
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
<div class="ld-cta"><a class="ld-btn ld-go" href="${firstFile}">▶ पाठ-1 से मुफ़्त शुरू करें</a><a class="ld-btn ld-wb" href="/aptitude-test.html">🧭 पहले अपनी रुचि जाँचो</a><a class="ld-btn" style="background:#2E7D32;color:#fff" href="/join.html">📝 मुफ़्त रजिस्ट्रेशन — परीक्षा व प्रमाणपत्र के लिए</a></div>
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

<section class="lsn-sec"><h2>📘 मुफ़्त डाउनलोड — पुस्तिका व चार्ट</h2>
<p><a class="ld-btn" href="https://github.com/acsbabita111/acslearn/releases/download/workbook-tirhuta/tirhuta-vyakaran-pustika.pdf">📘 तिरहुता व्याकरण-पुस्तिका (PDF)</a> <a class="ld-btn" href="https://github.com/acsbabita111/acslearn/releases/download/workbook-tirhuta/tirhuta-varnamala-chart.pdf">🔤 वर्णमाला-चार्ट — दीवार पर लगाने लायक (PDF)</a></p>
<p class="ld-note">बिल्कुल मुफ़्त — print कर पास रखें; चार्ट दीवार पर लगाएँ।</p></section>

<section class="lsn-sec"><h2>🎓 प्रमाणपत्र</h2>
${req(L, "certificate").map(p => `<p>${esc(p)}</p>`).join("")}</section>

<section class="lsn-sec"><h2>❓ अक्सर पूछे जाने वाले सवाल</h2>
${faq}</section>

<section class="lsn-sec"><h2>📚 शोध व संदर्भ-सूची</h2>
<p>इस कोर्स की हर ऐतिहासिक बात नीचे के खुले स्रोतों से मिलाकर लिखी गई है। कड़ी नई खिड़की में खुलती है — बाहरी site की जानकारी ख़ुद भी जाँच लें।</p>
<ul class="ld-src">${req(L, "sources").map(s => `<li><a href="${attr(s.u)}" target="_blank" rel="noopener">${esc(s.t)}</a> — ${esc(s.d)}</li>`).join("")}</ul>
<p class="ld-note">${esc(req(L, "checkedLine"))}</p></section>

<section class="lsn-sec"><h2>📖 पूरी पाठ-सूची — ${C.parts.length} ${C.partLabel}, ${se.lessons} पाठ</h2>
<p>किसी भी पाठ पर सीधे जाइए — पढ़ाई मुफ़्त, बिना login।</p></section>
${partSections}
<section class="lsn-sec ld-end"><p class="ld-tag">${esc(req(L, "endLine"))}</p>
<div class="ld-cta"><a class="ld-btn ld-go" href="${firstFile}">▶ पाठ-1 से शुरू करें</a></div></section>
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
.ld-src{padding-left:24px}.ld-src li{font-size:17px;margin:8px 0;line-height:1.7}.ld-src a{color:#1565C0;font-weight:700}
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
    { "@type": "Course", "@id": canonical + "#course", "name": C.title, "alternateName": [C.fullName.replace(/\s*\([^)]*\)/g, ""), req(L, "altName")],
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
