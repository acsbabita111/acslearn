#!/usr/bin/env node
/* ============================================================
   generator/portal_sync.js v1.0 (26-Nov-2026) : पूरा पोर्टल एक आदेश से ताज़ा
   Founder (26-Nov-2026): "पूरा पोर्टल एक ही भाषा बोले। कोई नया कोर्स आने पर समूचा पोर्टल अपने आप अपडेट हो ले।"

   नियम: सेक्टर, उद्यम-कार्ड और कोर्स के घर तीन ही हैं (एक चीज़ = एक जगह):
       assets/mg_names.js · assets/udyam_data.js · assets/courses_data.js
   बाक़ी सब जगह (पन्ने, फ़ॉर्म, भाषा-पैक, sitemap) इन्हीं से निकली हैं। यह आदेश हर निकली चीज़ दोबारा बनाता है।
   जो पहले से ताज़ा है, वह छुई नहीं जाती (हर generator वही बाइट दोबारा लिखता है)।

   चलाना (repo की जड़ से):
     node generator/portal_sync.js                 सब निकली चीज़ें बनाओ, फिर नियम जाँचो
     node generator/portal_sync.js --check         कुछ न लिखो; सिर्फ़ बताओ कि सब ताज़ा है या नहीं (बासी = exit 1)
     node generator/portal_sync.js --sw "कारण"      साथ में sw.js का CACHE_VERSION एक बढ़ाओ (तभी, जब assets/ की कोई फ़ाइल बदली हो)
     node generator/portal_sync.js --sw "कारण" --sw-always   assets/ न बदली हो तब भी बढ़ाओ (औज़ार sector_darj.js यही करता है)

   नया कोर्स आए तो कुल काम:
     1. कोर्स की पंक्ति assets/courses_data.js में, और उसके पन्ने उसके generator से।
     2. node generator/sector_darj.js course --id <कोड> --udyam <कार्ड का serial>
        (यही औज़ार अंत में यह sync अपने-आप चला देता है)।
   नया उद्यम-कार्ड: node generator/sector_darj.js card …  फिर उसका परिचय (generator/data/udyam_intro_mgNN.js) और
     अभिरुचि के भाषा-पैक में उसका नाम (generator/data/aptitude/<भाषा>/udyam.txt); क्या बाक़ी है, यह आदेश ख़ुद बताता है।

   क्रम (हर क़दम एक generator; --check में उसका अपना --check):
     1 build_suchi_index      assets/suchi_index.js (कार्ड → कोर्स, कोर्स-पता → कोड)
     2 build_udyam_intro_pages कार्ड के परिचय-पन्ने (कोर्स-बटन निकली सूची से)
     3 build_udyam_suchi      /udyam/ और /en/industries/ (25 बटन, गिनती, पूरी सूची, कार्ड की कोर्स-कड़ियाँ)
     4 build_sector_khana     assets/roles.js का सेक्टर-खाना (रजिस्ट्रेशन)
     5 build_panel_i18n       पैनल के भाषा-पैक (en, kn, bn)
     6 build_network          नेटवर्क के पन्ने और निवेदन-फ़ॉर्म की सूची
     7 build_apt_lang         अभिरुचि के भाषा-पैक (हर भाषा, जिसकी assets/apt_udyam_<भाषा>.js है)
     8 build_sitemap          sitemap
     9 build_search_index, build_home, build_mirror_homes   होम के खोज-बॉक्स की सूची (नया कोर्स और नया उद्यम खोज में अपने-आप), सब भाषा-घरों में
    10 lib_sector audit       नियम की पूरी जाँच (यही दरवाज़ा है)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..");
const A = process.argv.slice(2), CHECK = A.indexOf("--check") > -1, SW_ALWAYS = A.indexOf("--sw-always") > -1;
const SW_NOTE = (function () { const i = A.indexOf("--sw"); return i > -1 ? String(A[i + 1] || "").trim() : ""; })();
if (A.indexOf("--sw") > -1 && (!SW_NOTE || SW_NOTE.indexOf("--") === 0)) { console.log("❌ --sw के बाद कारण लिखें, जैसे: --sw \"नया कोर्स SE030 जुड़ा\""); process.exit(2); }

const has = (f) => fs.existsSync(path.join(ROOT, f));
const aptLangs = fs.readdirSync(path.join(ROOT, "assets")).map((f) => (/^apt_udyam_([a-z]{2,3})\.js$/.exec(f) || [])[1]).filter(Boolean).sort();
const panelLangs = ["en", "kn", "bn"].filter((l) => has("assets/i18n/panel_" + l + ".js"));

/* [नाम, फ़ाइल, तर्क, --check चलता है?] */
const STEPS = [
  ["निकली सूची", "build_suchi_index.js", [], true],
  ["कार्ड के परिचय-पन्ने", "build_udyam_intro_pages.js", [], false],          /* उद्यम-पन्ने से पहले: वह हर कार्ड का पन्ना जाँचता है */
  ["उद्यम-पन्ने (हिंदी, English)", "build_udyam_suchi.js", [], true],
  ["रजिस्ट्रेशन का सेक्टर-खाना", "build_sector_khana.js", [], true]
].concat(panelLangs.map((l) => ["पैनल का भाषा-पैक " + l, "build_panel_i18n.js", [l], true]))
 .concat([["नेटवर्क के पन्ने और निवेदन-सूची", "build_network.js", [], true]])
 .concat(aptLangs.map((l) => ["अभिरुचि का भाषा-पैक " + l, "build_apt_lang.js", [l], true]))
 .concat([["sitemap", "build_sitemap.js", [], false],
          ["होम की खोज-सूची", "build_search_index.js", [], true],       /* sitemap के बाद: खोज में वही जो sitemap में */
          ["होम के पन्ने (खोज-सूची की छाप)", "build_home.js", [], true],
          ["भाषा-घरों के होम (English होम की नक़ल)", "build_mirror_homes.js", [], false]]);   /* English होम बदले तो ये भी */

const hashAssets = () => { const out = {};
  (function walk(d) { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name);
    if (f.isDirectory()) { if (f.name !== "apt_sets" && f.name !== "chitra") walk(p); }
    else if (/\.(js|json|css)$/.test(f.name)) out[p] = require("crypto").createHash("sha1").update(fs.readFileSync(p)).digest("hex"); } })(path.join(ROOT, "assets"));
  return out; };

function run(file, args) {
  const r = cp.spawnSync(process.execPath, [path.join(__dirname, file)].concat(args), { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  const out = String(r.stdout || "") + String(r.stderr || "");
  return { ok: r.status === 0, last: out.trim().split("\n").filter(Boolean).slice(-1)[0] || "", out };
}

const before = CHECK ? null : hashAssets();
let bad = 0;
console.log(CHECK ? "पोर्टल की ताज़गी-जाँच (कुछ लिखा नहीं जाएगा)\n" : "पोर्टल sync: हर निकली चीज़ दोबारा बन रही है\n");
STEPS.forEach((st, i) => {
  const [name, file, args, canCheck] = st;
  if (CHECK && !canCheck) { console.log("  " + (i + 1) + ". – " + name + ": इसकी जाँच नीचे नियम-जाँच और SEO-यंत्र करते हैं"); return; }
  const r = run(file, args.concat(CHECK ? ["--check"] : []));
  if (!r.ok) { bad++; console.log("  " + (i + 1) + ". ❌ " + name + " (" + file + (args.length ? " " + args.join(" ") : "") + ")\n" + r.out.trim().split("\n").slice(-6).map((x) => "        " + x).join("\n")); }
  else console.log("  " + (i + 1) + ". ✅ " + name + ": " + r.last.replace(/^[🏁✅=\s]+/, "").slice(0, 110));
});

/* नियम की पूरी जाँच (दरवाज़ा) */
const LIB = require("./lib_sector.js");
let R = null; try { R = LIB.audit(ROOT); } catch (e) { bad++; console.log("\n  ❌ नियम-जाँच चल नहीं पाई: " + e.message); }
if (R) {
  const D = LIB.load(ROOT), X = LIB.derive(D);
  /* कार्ड के परिचय-पन्ने पर उसके कोर्स का बटन सचमुच है? (हल्की जाँच; पूरा पन्ना generator बनाता है) */
  const noBtn = [];
  Object.keys(X.card).map(Number).forEach((n) => { const e = X.card[n]; if (!e.u) return; let h = ""; try { h = fs.readFileSync(path.join(ROOT, e.u.replace(/^\//, "")), "utf8"); } catch (x) { return; }
    const need = e.l ? [e.l] : e.c.map((c) => c[3]);
    need.forEach((u) => { if (h.indexOf('href="' + u) === -1 && h.indexOf('href="' + u.replace(/\/$/, "/index.html")) === -1) noBtn.push("कार्ड " + n + " (" + e.u + ") पर कोर्स " + u + " का बटन नहीं"); }); });
  console.log("\n  " + (STEPS.length + 1) + ". " + (R.fail || noBtn.length ? "❌" : "✅") + " नियम की जाँच: " + (R.checks.length - R.fail) + "/" + R.checks.length + " पास · " + R.stats.cards + " कार्ड · " + R.stats.courses + " कोर्स (" + R.stats.live + " चालू; " + R.stats.waiting + " प्रतीक्षा में)");
  R.checks.filter((c) => !c.ok).forEach((c) => console.log("        ❌ " + c.name + "\n           → " + c.extra));
  noBtn.forEach((x) => console.log("        ❌ " + x + "। कार्ड का परिचय generator/data/udyam_intro_mgNN.js में है या नहीं, देखें।"));
  bad += R.fail + noBtn.length;
}

if (CHECK) {
  console.log(bad ? "\n❌ पोर्टल बासी है या नियम टूटा है (" + bad + ")। चलाएँ: node generator/portal_sync.js" : "\n🏁 पोर्टल ताज़ा है: हर निकली चीज़ आज के data से मेल खाती है।");
  process.exit(bad ? 1 : 0);
}

/* क्या assets/ की कोई फ़ाइल बदली? तब sw.js का संस्करण बढ़ना चाहिए (cache-first नियम) */
const after = hashAssets(), changed = Object.keys(after).filter((p) => before[p] !== after[p]).map((p) => path.relative(ROOT, p).replace(/\\/g, "/"));
if (changed.length) console.log("\n  assets/ में बदली फ़ाइलें (" + changed.length + "): " + changed.slice(0, 8).join(", ") + (changed.length > 8 ? " …" : ""));
if (SW_NOTE && (changed.length || SW_ALWAYS)) {
  const swP = path.join(ROOT, "sw.js"), clP = path.join(ROOT, "CHANGELOG-sw.md");
  let sw = fs.readFileSync(swP, "utf8"); const m = /^const CACHE_VERSION = 'v(\d+)';([^\n]*)$/m.exec(sw);
  if (!m) { console.log("  ❌ sw.js में CACHE_VERSION की पंक्ति नहीं मिली; संस्करण हाथ से बढ़ाएँ"); bad++; }
  else {
    const nv = Number(m[1]) + 1, d = new Date(), iso = d.toISOString().slice(0, 10);
    const mon = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][d.getUTCMonth()];
    const note = SW_NOTE.replace(/\s+/g, " ");
    sw = sw.replace(m[0], "const CACHE_VERSION = 'v" + nv + "';  // " + iso + " " + note + "\n// पिछला 'v" + m[1] + "'  " + m[2].trim());
    fs.writeFileSync(swP, sw);
    let cl = fs.readFileSync(clP, "utf8"); const k = cl.indexOf("\nv" + m[1] + " (");
    const line = "v" + nv + " (" + ("0" + d.getUTCDate()).slice(-2) + "-" + mon + "-" + d.getUTCFullYear() + "): " + note + (changed.length ? " बदली फ़ाइलें: " + changed.slice(0, 12).join(", ") + (changed.length > 12 ? " …" : "") + "।" : "") + "\n";
    if (k === -1) { console.log("  ⚠️ CHANGELOG-sw.md में v" + m[1] + " की पंक्ति नहीं मिली; नई पंक्ति फ़ाइल के अंत में जोड़ी"); cl += line; }
    else cl = cl.slice(0, k + 1) + line + cl.slice(k + 1);
    fs.writeFileSync(clP, cl);
    console.log("  ✅ sw.js: v" + m[1] + " → v" + nv + " (CHANGELOG-sw.md में पंक्ति जुड़ी)");
  }
} else if (changed.length && !SW_NOTE) {
  console.log("  ⚠️ assets/ की फ़ाइल बदली है: sw.js का CACHE_VERSION बढ़ाना ज़रूरी है। चलाएँ: node generator/portal_sync.js --sw \"कारण\" --sw-always");
}
console.log(bad ? "\n❌ sync पूरा नहीं: ऊपर लिखी " + bad + " बात ठीक करके यही आदेश दोबारा चलाएँ।" : "\n🏁 पोर्टल ताज़ा: हर निकली चीज़ आज के data से बनी है, और नियम की जाँच पास।");
process.exit(bad ? 1 : 0);
