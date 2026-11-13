/* generator/dev_dash_gen_check.js : v1.0 (14-Nov-2026, खेप 3-ग "यंत्र-मिलान")
   जाँच: dashboard बनाने वाला यंत्र (build_dashboards.js) चलाने पर repo के 33 पन्ने हूबहू वही रहते हैं।
   यानी यंत्र और पन्ने एक-दूसरे के बराबर हैं; कोई पन्ना हाथ से बदला हुआ नहीं है।
   चलाना (repo के फ़ोल्डर में): node generator/dev_dash_gen_check.js
   ध्यान: यह यंत्र को सचमुच चलाता है। पन्ने अलग निकलें, तो वे बदले हुए रह जाते हैं (git से देखे जा सकते हैं)। */
"use strict";
var fs = require("fs"), path = require("path"), crypto = require("crypto"), cp = require("child_process");
var ROOT = path.resolve(__dirname, "..");
function list() {
  var out = ["join.html"];
  (function walk(rel) {
    fs.readdirSync(path.join(ROOT, rel), { withFileTypes: true }).forEach(function (e) {
      var r = rel + "/" + e.name;
      if (e.isDirectory()) walk(r); else if (e.name === "index.html") out.push(r);
    });
  })("dashboard");
  return out.sort();
}
function sums(files) { var m = {}; files.forEach(function (f) { m[f] = crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, f))).digest("hex"); }); return m; }
var files = list(), before = sums(files);
var r = cp.spawnSync(process.execPath, [path.join(ROOT, "generator", "build_dashboards.js")], { cwd: ROOT, encoding: "utf8" });
if (r.status !== 0) { console.log("⛔ यंत्र चला ही नहीं (exit " + r.status + "): " + String(r.stderr || r.stdout).slice(-300)); process.exit(1); }
var after = sums(list()), bad = [];
Object.keys(after).forEach(function (f) { if (before[f] !== after[f]) bad.push(f); });
if (files.length !== 33) bad.push("पन्नों की गिनती 33 नहीं, " + files.length + " है");
if (bad.length) { console.log("⛔ यंत्र चलाने पर " + bad.length + " पन्ने बदल गए (यंत्र और पन्ने बराबर नहीं):"); bad.slice(0, 12).forEach(function (x) { console.log("   - " + x); }); process.exit(1); }
console.log("🏁 यंत्र-मिलान: यंत्र चलाने पर 33 में से 33 पन्ने हूबहू वही रहे");
