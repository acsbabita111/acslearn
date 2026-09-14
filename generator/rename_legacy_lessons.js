/* rename_legacy_lessons.js v1.0 · 14-Sep-2026 — पुराने L001.html पन्नों को SEO-नाम + सवाल-शीर्षक (Founder 14-Sep)
   क्यों: printer (900) व AI-डिजिटल-मास्टर (150) के पते सिर्फ़ क्रमांक हैं — Google को न विषय दिखता है, न सवाल। DCA/ई-कॉमर्स पहले से "dca-001-slug" पर हैं।
   क्या: हर पाठ → (1) नया नाम `<code>-NNN-<सवाल-slug>.html` (Constitution SEO-नामकरण) (2) <title>/h1 = सवाल; पुराना शीर्षक h1 के नीचे उप-पंक्ति
        (3) meta description = सवाल + पुराना विवरण (4) canonical/og नया पता (5) prev/next कड़ियाँ (6) index.html के कार्ड + lesson-map (7) पुराना L###.html = redirect-पर्ची (noindex, canonical नया) — पुरानी कड़ियाँ/प्रगति न टूटे
   data: generator/data/legacy_questions_<course>.js (हाथ से — Claude-खेप) · slug: build_dca_pages का देवनागरी→Roman नुस्ख़ा (हूबहू)
   चलाओ: node generator/rename_legacy_lessons.js aidm   (या printer)  — दोबारा चलाने पर सुरक्षित (पहले से बदले पन्ने पहचानता है) */
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const COURSES = {
  aidm: { dir: "courses/hi/digital/ai-digital-master", code: "aidm", n: 150, brand: "AI डिजिटल मास्टर", data: "legacy_questions_aidm.js" },
  printer: { dir: "courses/hi/vocational/printer", code: "prn", n: 900, brand: "प्रिंटर रिपेयरिंग", data: "legacy_questions_printer.js" }
};
/* ---------- देवनागरी → Roman slug (build_dca_pages.js से हूबहू) ---------- */
const TR = { "क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"n","च":"ch","छ":"chh","ज":"j","झ":"jh","ञ":"n","ट":"t","ठ":"th","ड":"d","ढ":"dh","ण":"n","त":"t","थ":"th","द":"d","ध":"dh","न":"n","प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"sh","ष":"sh","स":"s","ह":"h","ळ":"l","क़":"q","ख़":"kh","ग़":"g","ज़":"z","ड़":"r","ढ़":"rh","फ़":"f","य़":"y","अ":"a","आ":"aa","इ":"i","ई":"ee","उ":"u","ऊ":"oo","ऋ":"ri","ए":"e","ऐ":"ai","ओ":"o","औ":"au","ा":"a","ि":"i","ी":"i","ु":"u","ू":"u","ृ":"ri","े":"e","ै":"ai","ो":"o","ौ":"au","ं":"n","ँ":"n","ः":"","्":"","़":"","ॐ":"om","ॉ":"o","ऑ":"o","ॅ":"e","ऍ":"e" }; /* ॉ/ॅ (शॉर्ट/कैंटीन) — DCA-नुस्ख़े में छूटे थे */
const CONS = "कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहळक़ख़ग़ज़ड़ढ़फ़य़", MATRA = "ािीुूृेैोौंँः्ॉॅ";
function slugify(t) {
  const chars = Array.from(t.normalize("NFC")); let s = "";
  for (let i = 0; i < chars.length; i++) { const ch = chars[i]; if (TR[ch] === undefined) { s += ch; continue; } s += TR[ch];
    if (CONS.indexOf(ch) >= 0) { const nx = chars[i + 1]; const wordEnd = (nx === undefined) || MATRA.indexOf(nx) < 0 && CONS.indexOf(nx) < 0 && TR[nx] === undefined;
      if (nx !== undefined && MATRA.indexOf(nx) < 0 && !wordEnd) s += "a"; else if (nx === "ं" || nx === "ँ") s += "a"; } }
  s = s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return (s || "paath").slice(0, 60).replace(/-$/, "");
}
const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
function stub(newRel, q) {
  return '<!DOCTYPE html>\n<!-- ACS redirect-पर्ची · rename_legacy_lessons.js · 14-Sep-2026: पुराना पता → नया SEO-पता (पुरानी कड़ियाँ/bookmark न टूटें) -->\n<html lang="hi"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>' + esc(q) + ' | ACS</title><meta name="robots" content="noindex, follow"><link rel="canonical" href="https://acslearn.com' + newRel + '"><meta http-equiv="refresh" content="0; url=' + newRel + '"><script>location.replace(' + JSON.stringify(newRel) + ' + location.hash);</script></head><body style="font-family:sans-serif;font-size:19px;padding:24px"><p>यह पाठ अब नए पते पर है: <a href="' + newRel + '">' + esc(q) + '</a></p><p style="font-size:16px">मूल भाषा: हिंदी</p></body></html>\n';
}
function run(key) {
  const C = COURSES[key]; if (!C) throw new Error("course? aidm|printer");
  const Q = require(path.join(__dirname, "data", C.data)); const dir = path.join(ROOT, C.dir);
  const ids = []; for (let i = 1; i <= C.n; i++) ids.push("L" + String(i).padStart(3, "0"));
  /* जाँच: सब सवाल मौजूद, '?' पर ख़त्म, दोहराव नहीं, ≤14 शब्द */
  const seen = new Set(); ids.forEach(id => { const q = Q[id]; if (!q) throw new Error("सवाल नहीं: " + id); if (!/\?$/.test(q)) throw new Error("'?' नहीं: " + id); if (q.split(/\s+/).length > 14) throw new Error(">14 शब्द: " + id); if (seen.has(q)) throw new Error("दोहराव: " + id); seen.add(q); });
  /* नाम-नक़्शा */
  const map = {}; const slugs = new Set();
  ids.forEach((id, i) => { let sl = slugify(Q[id]); let k = 2; while (slugs.has(sl)) sl = slugify(Q[id]).slice(0, 56) + "-" + (k++); slugs.add(sl); map[id] = C.code + "-" + String(i + 1).padStart(3, "0") + "-" + sl + ".html"; });
  let done = 0, skipped = 0;
  ids.forEach((id, i) => {
    const oldP = path.join(dir, id + ".html"), newP = path.join(dir, map[id]);
    let s;
    if (fs.existsSync(newP)) { s = fs.readFileSync(newP, "utf8"); skipped++; } /* दोबारा-चलाव: नया पहले से है — सिर्फ़ कड़ियाँ ताज़ा */
    else if (fs.existsSync(oldP)) { s = fs.readFileSync(oldP, "utf8"); } else throw new Error("न पुराना न नया: " + id);
    const q = Q[id]; const relNew = "/" + C.dir + "/" + map[id];
    if (!fs.existsSync(newP)) {
      const h1m = s.match(/<h1([^>]*)>([\s\S]*?)<\/h1>/); const oldTitle = h1m ? h1m[2].replace(/<[^>]+>/g, "").trim() : "";
      /* h1 = सवाल; पुराना शीर्षक उप-पंक्ति */
      if (h1m) s = s.replace(h1m[0], "<h1" + h1m[1] + ">" + esc(q) + "</h1>\n<p class=\"lsn-oldtitle\" style=\"font-size:18px;opacity:.85;margin:2px 0 10px\">पाठ " + (i + 1) + " · " + esc(oldTitle) + "</p>");
      s = s.replace(/<title>[\s\S]*?<\/title>/, "<title>" + esc(q) + " | " + C.brand + "</title>"); /* ≤65 अक्षर — Google ~60 के बाद काटता है; सवाल पहले */
      s = s.replace(/(<meta name="description" content=")([^"]*)(")/, (m, a, b, c) => { let d = q + " — " + b.replace(/&quot;/g, "'").replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'"); if (d.length > 156) { d = d.slice(0, 156); d = d.slice(0, d.lastIndexOf(" ")) + "…"; } return a + esc(d) + c; }); /* 150–158 अक्षर, शब्द-सीमा पर (Google कटाव ~160) */
      s = s.replace(/<meta property="og:title" content="[^"]*"/, '<meta property="og:title" content="' + esc(q) + '"');
      s = s.replace(/<meta property="og:url" content="[^"]*"/, '<meta property="og:url" content="https://acslearn.com' + relNew + '"');
      s = s.replace(/<link rel="canonical" href="[^"]*"/, '<link rel="canonical" href="https://acslearn.com' + relNew + '"');
      /* JSON-LD headline/name/url अगर हो */
      s = s.replace(/"headline":"[^"]*"/, '"headline":' + JSON.stringify(q) + ',"description":' + JSON.stringify(q + " — " + oldTitle) + ',"author":{"@type":"Organization","name":"Applied Computer School","url":"https://acslearn.com/"},"image":"https://acslearn.com/logo.png","isAccessibleForFree":true').replace(/"url":"https:\/\/acslearn\.com\/[^"]*L\d{3}\.html"/g, '"url":"https://acslearn.com' + relNew + '"');
    }
    /* दिखने वाला "L002"/"Lesson L002" → "पाठ 2" (कूट-नाम UI पर नहीं — नियम) */
    if (!fs.existsSync(newP)) { s = s.replace(new RegExp("Lesson " + id + "\\b", "g"), "पाठ " + (i + 1)).replace(new RegExp("(›|&rsaquo;|>)\\s*" + id + "\\s*<", "g"), "$1 पाठ " + (i + 1) + "<").replace(new RegExp("\\| " + C.brand + " " + id + "\\b", "g"), "| " + C.brand + " पाठ " + (i + 1)); }
    /* prev/next व अन्य L###.html कड़ियाँ → नए नाम (हर बार) */
    s = s.replace(/href="(L\d{3})\.html"/g, (m, lid) => map[lid] ? 'href="' + map[lid] + '"' : m);
    fs.writeFileSync(newP, s, "utf8");
    fs.writeFileSync(oldP, stub(relNew, q), "utf8"); /* पुराना पता = पर्ची */
    done++;
  });
  /* index.html: कार्ड-कड़ियाँ + lesson-map + कार्ड शीर्षक में सवाल */
  const ip = path.join(dir, "index.html"); let idx = fs.readFileSync(ip, "utf8");
  idx = idx.replace(/href="(L\d{3})\.html"/g, (m, lid) => map[lid] ? 'href="' + map[lid] + '"' : m);
  idx = idx.replace(/("\d+":\s*")(L\d{3})\.html(")/g, (m, a, lid, c) => map[lid] ? a + map[lid] + c : m);
  fs.writeFileSync(ip, idx, "utf8");
  /* कोर्स-स्थानीय sitemap.xml हो तो */
  const sp = path.join(dir, "sitemap.xml"); if (fs.existsSync(sp)) { let sm = fs.readFileSync(sp, "utf8"); sm = sm.replace(/\/(L\d{3})\.html/g, (m, lid) => map[lid] ? "/" + map[lid] : m); fs.writeFileSync(sp, sm, "utf8"); }
  fs.writeFileSync(path.join(__dirname, "data", "legacy_rename_map_" + key + ".json"), JSON.stringify(map, null, 0), "utf8");
  console.log("✅ " + key + ": " + done + " पाठ नए नाम पर (" + skipped + " पहले से) · " + ids.length + " redirect-पर्ची · index/lesson-map ताज़ा · नक़्शा data/legacy_rename_map_" + key + ".json");
}
run(process.argv[2]);
