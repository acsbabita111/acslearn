#!/usr/bin/env node
/* ============================================================================
   ACS DMT — मुहर-सहायक v1.2 (v1.7-ऑडिट P0-1: हर run पर पुरानी approval अनिवार्य-निरस्त) (tools/muhar_bharo.js) · 08-Nov-2026
   काम: generator/data/dmt_release_manifest.json में तीन यांत्रिक खाने भरना —
     lesson_ids (109, MD से) · content_sha256 (generator --print-digest से) ·
     approved_on (आज की तारीख़ YYYY-MM-DD)।
   जान-बूझकर NहीN भरता: founder_approved / metadata_verified — ये दोनों
     Founder हाथ से true करें (मुहर = मानव-कृत्य)।
   चलाना (clone-रूट से):  node tools\muhar_bharo.js
   ============================================================================ */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.resolve(__dirname, "..");
const GEN = path.join(ROOT, "generator", "build_dmt_pages.js");
const MF  = path.join(ROOT, "generator", "data", "dmt_release_manifest.json");
const MD  = path.join(ROOT, "generator", "data", "dmt_lessons_md");

const r = cp.spawnSync(process.execPath, [GEN, "--print-digest"], { encoding: "utf8" });
if (r.status !== 0){ console.error("❌ digest नहीं बना (robot-gate fail?) —\n" + (r.stderr||"")); process.exit(1); }
const digest = r.stdout.trim().split("\n").pop().trim();
if (!/^[0-9a-f]{64}$/.test(digest)){ console.error("❌ digest-आकार ग़लत: " + digest); process.exit(1); }

const files = fs.readdirSync(MD).filter(f => /^dmt-\d+-\d+\.md$/.test(f))
  .sort((a,b)=>{const A=a.match(/dmt-(\d+)-(\d+)/),B=b.match(/dmt-(\d+)-(\d+)/);
    return (+A[1]-+B[1])||(+A[2]-+B[2]);});
/* id = front-matter का lesson_id (generator का सत्य-स्रोत) — फ़ाइल-नाम नहीं */
const ids = files.map(f => {
  const m = fs.readFileSync(path.join(MD,f),"utf8").match(/^lesson_id:\s*"?(.*?)"?\s*$/m);
  if (!m){ console.error("❌ lesson_id नहीं मिला: " + f); process.exit(1); }
  return m[1];
});
if (ids.length !== 109){ console.error("❌ MD-गिनती " + ids.length + " ≠ 109"); process.exit(1); }

const M = JSON.parse(fs.readFileSync(MF, "utf8"));
M.lesson_ids = ids;
M.content_sha256 = digest;
/* v1.2: हर run पर पुरानी approval अनिवार्य-निरस्त — नया hash = नई मानवीय स्वीकृति चाहिए */
M.founder_approved = false;
M.metadata_verified = false;
M.approved_on = "";
console.log("⚠️  APPROVAL INVALIDATED — founder re-sign required");
fs.writeFileSync(MF, JSON.stringify(M, null, 2) + "\n");
console.log("✅ manifest भरा: 109 ids · content_sha256 " + digest.slice(0,16) + "…");
console.log("   अब Founder हाथ से तीन चीज़ें भरें: founder_approved=true · metadata_verified=true · approved_on=आज की तारीख़ (YYYY-MM-DD) — तभी release खुलेगा।");
console.log("   ध्यान: इसके बाद कोई MD/टेम्पलेट/generator बदला तो मुहर बासी — यह script दोबारा चलानी होगी।");
