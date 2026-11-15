/* generator/build_rules_consent_en.js v1.0 (परत-4; 15-Nov-2026, पैनल-5)
   26 भूमिकाओं के नियम-पत्र (rules-consent-<भूमिका>.html, हिंदी = क़ानूनी मूल, हाथ-रखरखाव)
   + generator/data/rules_consent_en.json (हिंदी इकाई → English) से
   en/rules-consent-<भूमिका>.html बनाता है। learner का English पन्ना इस generator के दायरे में नहीं
   (वह en/rules-consent-learner.html पहले से अलग रास्ते से बनता है)।

   चलाना (repo की जड़ से):
     node generator/build_rules_consent_en.js           बनाओ
     node generator/build_rules_consent_en.js --check   सिर्फ़ जाँचो: disk की फ़ाइलें ताज़ा हैं या नहीं (बासी = exit 1)

   नियम (fail-closed):
   1) हिंदी फ़ाइल की हर देवनागरी इकाई का English तालिका में होना ज़रूरी है; एक भी न मिले = कुछ नहीं लिखा जाता।
   2) बने पन्ने में एक भी देवनागरी अक्षर नहीं।
   3) संस्करण की संख्या, नियमों की गिनती, हर नियम का क्रमांक और checkbox हिंदी मूल जैसे ही।
      हर इकाई में संख्याएँ (रक़म, दिन, प्रतिशत) और चिह्न (<b>, →, ₹, %, ·) हिंदी जितने ही।
   4) हिंदी फ़ाइलें कभी नहीं बदली जातीं। */
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..");
const CHECK = process.argv.includes("--check");
const DEV = /[ऀ-ॿ]/;
const sha = s => crypto.createHash("sha256").update(s.replace(/\r\n/g, "\n"), "utf8").digest("hex");
const norm = s => s.replace(/\s+/g, " ").trim();

const TABLE = {};
for (const r of JSON.parse(fs.readFileSync(path.join(__dirname, "data", "rules_consent_en.json"), "utf8"))) {
  const k = r.k + "\u0001" + r.hi;
  if (TABLE[k] !== undefined) { console.log("⛔ तालिका में दोहरी इकाई: " + r.hi.slice(0, 60)); process.exit(1); }
  if (DEV.test(r.en)) { console.log("⛔ तालिका के English में देवनागरी: " + r.en.slice(0, 60)); process.exit(1); }
  /* अर्थ का मशीन-पहरा: हर इकाई में संख्याएँ (रक़म, दिन, प्रतिशत, नियम-क्रमांक) और चिह्न हिंदी जितने ही */
  const nums = x => (x.replace(/<[^>]+>/g, " ").match(/\d+(?:[.,]\d+)*/g) || []).map(y => y.replace(/,/g, "")).sort().join(" ");
  const cnt = (x, re) => (x.match(re) || []).length;
  if (nums(r.hi) !== nums(r.en)) { console.log("⛔ तालिका: संख्याएँ हिंदी से अलग: " + r.en.slice(0, 70) + " | hi: " + nums(r.hi) + " | en: " + nums(r.en)); process.exit(1); }
  for (const re of [/<b>/g, /<\/b>/g, /→/g, /₹/g, /%/g, /<span/g, /<br/g, /·/g, /🟢/g, /🟡/g])
    if (cnt(r.hi, re) !== cnt(r.en, re)) { console.log("⛔ तालिका: चिह्न " + re.source + " की गिनती हिंदी से अलग: " + r.en.slice(0, 70)); process.exit(1); }
  if (/—|–/.test(r.en)) { console.log("⛔ तालिका के English में लंबा डैश: " + r.en.slice(0, 60)); process.exit(1); }
  TABLE[k] = r.en;
}
const used = new Set();
const FILES = fs.readdirSync(ROOT).filter(f => /^rules-consent-.*\.html$/.test(f) && f !== "rules-consent-learner.html").sort();
const verNum = h => { const m = /<b>Version: ([0-9.]+)/.exec(h); return m ? m[1] : null; };
const ruleNos = h => (h.match(/<div class="rule[^"]*"><input type="checkbox"><span class="no">\d+\.<\/span>/g) || []).map(x => /(\d+)\.<\/span>$/.exec(x)[1]).join(",");

function build(file) {
  const hi = fs.readFileSync(path.join(ROOT, file), "utf8").replace(/\r\n/g, "\n");
  const miss = [];
  const tr = (kind, raw) => {               /* आगे-पीछे की ख़ाली जगह जस की तस; बीच का पाठ तालिका से */
    const core = norm(raw); if (!DEV.test(core)) return raw;
    const k = kind + "\u0001" + core, en = TABLE[k];
    if (en === undefined) { miss.push(kind + ": " + core.slice(0, 90)); return raw; }
    used.add(k);
    return /^\s*/.exec(raw)[0] + en + /\s*$/.exec(raw)[0];
  };
  let h = hi.replace(/<!--[\s\S]*?-->/g, m => DEV.test(m) ? "" : m);      /* हिंदी टिप्पणियाँ English पन्ने में नहीं */
  const keep = [];
  const hold = s => { keep.push(s); return "\u0000" + (keep.length - 1) + "\u0000"; };
  h = h.replace(/<style>[\s\S]*?<\/style>/g, hold);
  h = h.replace(/<script>[\s\S]*?<\/script>/g, m => hold(m.replace(/"((?:[^"\\\n]|\\.)*)"|'((?:[^'\\\n]|\\.)*)'/g, (a, d, s) => {
    const q = a[0], body = d !== undefined ? d : s;
    if (!DEV.test(body)) return a;
    const en = tr("js", body); if (en === body) return a;
    return q + en.replace(/\\/g, "\\\\").split(q).join("\\" + q) + q;
  })));
  const BLOCK = [/<(title|h1|h3|label|option|button)\b([^>]*)>([\s\S]*?)<\/\1>/g, /<(div) (class="(?:part|sub|ver|note|count|org)"[^>]*)>([\s\S]*?)<\/div>/g,
    /<(p) (class="foot"[^>]*)>([\s\S]*?)<\/p>/g, /<(a)\b([^>]*)>([\s\S]*?)<\/a>/g];
  for (const re of BLOCK) h = h.replace(re, (m, tag, attrs, inner) => DEV.test(inner) ? "<" + tag + (attrs && attrs[0] !== " " ? " " : "") + attrs + ">" + tr("html", inner) + "</" + tag + ">" : m);
  h = h.replace(/\b(placeholder|content|title|alt|value)="([^"]*)"/g, (m, a, v) => DEV.test(v) ? a + '="' + tr("attr", v) + '"' : m);
  h = h.replace(/\u0000(\d+)\u0000/g, (m, i) => keep[+i]);
  if (miss.length) return { file, miss };
  /* पन्ने की पहचान: भाषा, canonical, hreflang, होम की कड़ी, अनुवाद की सूचना, स्रोत की छाप */
  const one = (a, b) => { if (h.split(a).length !== 2) throw new Error(file + ": ठीक एक बार नहीं मिला: " + a); h = h.replace(a, b); };
  one('<html lang="hi">', '<html lang="en">');
  one('<link rel="canonical" href="https://acslearn.com/' + file + '"/>',
    '<link rel="canonical" href="https://acslearn.com/en/' + file + '"/><link rel="alternate" hreflang="hi" href="https://acslearn.com/' + file + '"/><link rel="alternate" hreflang="en" href="https://acslearn.com/en/' + file + '"/><link rel="alternate" hreflang="x-default" href="https://acslearn.com/' + file + '"/>');
  h = h.split('<a href="/" style=').join('<a href="/en/" style=');
  const note = '\n\n  <div class="trnote" style="background:#EEF4FB;border:1.5px solid #1565C0;border-radius:10px;padding:10px 13px;font-size:16px;margin-bottom:12px;color:#0B1F3A">🌐 This is an English translation provided for convenience. In case of any difference in meaning, the <a href="/' + file + '" style="color:#1565C0;font-weight:700">Hindi original</a> is the legally authoritative text.</div>';
  const vm = /<div class="ver">[\s\S]*?<\/div>/.exec(h); if (!vm) throw new Error(file + ": संस्करण की पट्टी नहीं मिली");
  h = h.replace(vm[0], vm[0] + note);
  one("<head>", "<head>\n<!-- generated: generator/build_rules_consent_en.js v1.0 | source: /" + file + " | source-sha256: " + sha(hi) + " | do not edit by hand -->");
  /* जाँचें */
  const bad = [];
  if (DEV.test(h)) bad.push("देवनागरी बची: " + (h.match(/[^\n]{0,40}[ऀ-ॿ][^\n]{0,40}/) || [""])[0]);
  if (!verNum(hi) || verNum(hi) !== verNum(h)) bad.push("संस्करण नहीं मिला/अलग: " + verNum(hi) + " बनाम " + verNum(h));
  if (!ruleNos(hi) || ruleNos(hi) !== ruleNos(h)) bad.push("नियमों के क्रमांक अलग");
  for (const [nm, re] of [["checkbox", /type="checkbox"/g], ["id=", /\bid="[^"]+"/g], ["<div", /<div\b/g], ["<b>", /<b>/g], ["option value", /<option value="[^"]*"/g]])
    if ((hi.replace(/<!--[\s\S]*?-->/g, "").match(re) || []).join("|") !== (h.replace(note, "").match(re) || []).join("|")) bad.push(nm + " की गिनती/क्रम अलग");
  if (bad.length) return { file, bad };
  return { file, out: h };
}

let fail = 0; const outs = [];
for (const f of FILES) {
  const r = build(f);
  if (r.miss) { fail++; console.log("⛔ " + f + ": " + r.miss.length + " इकाइयों का English नहीं:"); r.miss.slice(0, 5).forEach(x => console.log("     " + x)); }
  else if (r.bad) { fail++; console.log("⛔ " + f + ": " + r.bad.join(" | ")); }
  else outs.push(r);
}
const unused = Object.keys(TABLE).filter(k => !used.has(k));
if (unused.length) { fail++; console.log("⛔ तालिका में " + unused.length + " बेकार इकाइयाँ (हिंदी मूल बदल गया?): " + unused[0].split("\u0001")[1].slice(0, 70)); }
if (FILES.length !== 26) { fail++; console.log("⛔ नियम-पत्र 26 होने चाहिए, मिले " + FILES.length); }
if (fail) { console.log("⛔ build_rules_consent_en: " + fail + " गड़बड़ी; कुछ नहीं लिखा गया।"); process.exit(1); }
let stale = 0;
for (const r of outs) {
  const p = path.join(ROOT, "en", r.file), cur = fs.existsSync(p) ? fs.readFileSync(p, "utf8").replace(/\r\n/g, "\n") : null;
  if (cur === r.out) continue;
  stale++;
  if (CHECK) console.log("⛔ बासी या ग़ायब: en/" + r.file); else fs.writeFileSync(p, r.out);
}
if (CHECK && stale) { console.log("⛔ " + stale + " English नियम-पत्र बासी हैं। चलाएँ: node generator/build_rules_consent_en.js"); process.exit(1); }
console.log("🏁 build_rules_consent_en v1.0: " + outs.length + " English नियम-पत्र " + (CHECK ? "ताज़ा हैं" : "(" + stale + " लिखे)") + " · तालिका " + Object.keys(TABLE).length + " इकाइयाँ · देवनागरी 0");
