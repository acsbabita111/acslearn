#!/usr/bin/env node
/* ============================================================
   generator/build_suchi_index.js v1.0 (26-Nov-2026) : निकली सूची का generator (परत-4)
   बनाता है: assets/suchi_index.js  (कार्ड → उसके चालू कोर्स; कोर्स का पता → उसका «सेक्टर-कार्ड» कोड)
   स्रोत (एक चीज़ = एक जगह): assets/courses_data.js (mg, udyam) · assets/udyam_data.js · assets/mg_names.js
   नियम: यह फ़ाइल हाथ से कभी न बदलें। कोर्स का कोड बदलना हो तो: node generator/sector_darj.js course …
   चलाना:  node generator/build_suchi_index.js            (बनाओ)
           node generator/build_suchi_index.js --check    (सिर्फ़ जाँचो कि ताज़ा है; कुछ न लिखो)
   पूरा पोर्टल एक साथ: node generator/portal_sync.js
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const LIB = require("./lib_sector.js");
const ROOT = (function () { const i = process.argv.indexOf("--root"); return i > -1 ? path.resolve(process.argv[i + 1]) : path.join(__dirname, ".."); })();
const CHECK = process.argv.indexOf("--check") > -1;
const D = LIB.load(ROOT), want = LIB.indexText(D), f = path.join(ROOT, LIB.F_INDEX);
let now = null; try { now = fs.readFileSync(f, "utf8"); } catch (e) {}
const X = LIB.derive(D), nC = Object.keys(X.card).length, nU = Object.keys(X.url).length;
if (CHECK) {
  if (now === null || LIB.lf(now) !== LIB.lf(want)) { console.log("❌ --check: " + LIB.F_INDEX + " बासी है। चलाएँ: node generator/portal_sync.js"); process.exit(1); }
  console.log("🏁 --check पास: " + LIB.F_INDEX + " ताज़ा है (" + nU + " कोर्स-पते, " + nC + " कार्ड पर कोर्स)"); process.exit(0);
}
if (now !== null && LIB.lf(now) === LIB.lf(want)) console.log("= " + LIB.F_INDEX + " पहले से ताज़ा (" + nU + " कोर्स-पते, " + nC + " कार्ड पर कोर्स)");
else { fs.writeFileSync(f, want, "utf8"); console.log("✅ " + LIB.F_INDEX + " बनी (" + nU + " कोर्स-पते, " + nC + " कार्ड पर कोर्स)"); }
