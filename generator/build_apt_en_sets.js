/* ============================================================
   generator/build_apt_en_sets.js — v1.0 (12-Nov-2026) · परत-4
   काम: जाँचे हुए English पुल-बैंक (generator/data/aptitude/en/bank/) से
   runtime के English प्रश्न-टुकड़े /assets/apt_sets_en/<shard>.js बनाना।
   हर टुकड़ा हिंदी टुकड़े /assets/apt_sets/<shard>.js का जोड़ीदार है: वही id,
   वही विकल्प-गिनती; इंजन हिंदी टुकड़ा पढ़ता है (band/mg/udy/अंक वहीं से) और
   English पन्ने पर सिर्फ़ दिखने वाला पाठ यहाँ से लेता है।
   fail-closed (एक भी दोष = कोई फ़ाइल नहीं लिखी जाती):
     - हर id दोनों तरफ़ हो; विकल्प-गिनती बराबर
     - बैंक की प्रविष्टि की स्थिति audited या frozen हो (draft से runtime नहीं बनता)
     - पहले बैंक का अपना पहरेदार चलता है (apt_en_bank.js check --complete --strict-endings):
       हिंदी की अंगुली-छाप, English की छाप, अंत-शब्दावली, ताले। वह फेल = यह भी फेल
     - English में देवनागरी शून्य
   चलाना: node generator/build_apt_en_sets.js [--check]   (--check = सिर्फ़ जाँच, लिखता नहीं)
   हाथ से /assets/apt_sets_en/ की कोई फ़ाइल न बदलें।
   ============================================================ */
"use strict";
var fs = require("fs"), path = require("path");
var ROOT = path.resolve(__dirname, "..");
var BANK = path.join(ROOT, "generator/data/aptitude/en/bank");
var HI = path.join(ROOT, "assets/apt_sets");
var OUT = path.join(ROOT, "assets/apt_sets_en");
var CHECK_ONLY = process.argv.indexOf("--check") > -1;
var DEV = /[\u0900-\u097F]/;
function hiPool(shard) {
  global.window = { APT_POOL: [] };
  var f = path.join(HI, shard + ".js"); delete require.cache[require.resolve(f)]; require(f);
  var all = []; global.window.APT_POOL.forEach(function (a) { all = all.concat(a); }); return all;
}
var pre = require("child_process").spawnSync(process.execPath, [path.join(__dirname, "apt_en_bank.js"), "check", "--complete", "--strict-endings"], { cwd: ROOT, encoding: "utf8" });
if (pre.status !== 0) { console.log("⛔ बैंक का पहरेदार फेल (apt_en_bank check): कोई फ़ाइल नहीं लिखी गई।"); process.exit(1); }
var shards = fs.readdirSync(BANK).filter(function (f) { return /^(broad|mg\d\d)\.js$/.test(f); }).map(function (f) { return f.replace(".js", ""); }).sort();
var fails = [], outs = {}, total = 0;
shards.forEach(function (sh) {
  var pool = hiPool(sh);
  var bf = path.join(BANK, sh + ".js"); delete require.cache[require.resolve(bf)];
  var E = require(bf).q, A = JSON.parse(fs.readFileSync(path.join(BANK, "_audit", sh + ".json"), "utf8"));
  var ids = {}, map = {};
  pool.forEach(function (q) {
    ids[q.id] = 1; var e = E[q.id], a = A[q.id];
    if (!e) { fails.push(sh + " " + q.id + ": English नहीं"); return; }
    if (!a || (a.audit_status !== "audited" && a.audit_status !== "frozen")) { fails.push(sh + " " + q.id + ": स्थिति " + (a && a.audit_status) + " (audited/frozen चाहिए)"); return; }
    var ho = (q.opts || []).length, eo = (e.opts || []).length;
    if (ho !== eo) { fails.push(sh + " " + q.id + ": विकल्प हिंदी " + ho + " / English " + eo); return; }
    if (DEV.test(e.text + (e.opts || []).join(" "))) { fails.push(sh + " " + q.id + ": English में देवनागरी"); return; }
    map[q.id] = eo ? [e.text, e.opts] : e.text; total++;
  });
  Object.keys(E).forEach(function (id) { if (!ids[id]) fails.push(sh + " " + id + ": बैंक में है, हिंदी टुकड़े में नहीं"); });
  outs[sh] = map;
});
console.log("build_apt_en_sets v1.0 : टुकड़े " + shards.length + " · प्रश्न " + total + " · दोष " + fails.length + " · बैंक-पहरेदार पास");
if (fails.length) { fails.slice(0, 20).forEach(function (f) { console.log("  ⛔ " + f); }); console.log("⛔ कोई फ़ाइल नहीं लिखी गई।"); process.exit(1); }
if (CHECK_ONLY) { console.log("🏁 जाँच पास (--check: कुछ नहीं लिखा)"); process.exit(0); }
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });
var bytes = 0;
shards.forEach(function (sh) {
  var body = "/* /assets/apt_sets_en/" + sh + ".js : English प्रश्न-पाठ (generator-निर्मित: build_apt_en_sets.js v1.0)\n" +
    "   स्रोत: generator/data/aptitude/en/bank/" + sh + ".js (जाँचा हुआ पुल-बैंक) · मूल भाषा: हिंदी · हाथ से न बदलें */\n" +
    "window.APT_EN=window.APT_EN||{};(function(M){var D=" + JSON.stringify(outs[sh]) + ";for(var k in D)M[k]=D[k];})(window.APT_EN);\n";
  fs.writeFileSync(path.join(OUT, sh + ".js"), body); bytes += Buffer.byteLength(body);
});
console.log("🏁 लिखा: " + shards.length + " फ़ाइलें · " + bytes + " बाइट → assets/apt_sets_en/");
