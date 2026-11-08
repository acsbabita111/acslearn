#!/usr/bin/env node
/* ============================================================================
   ACS DMT — STAGE-B v3.2 (release cutover) — v1.7-ऑडिट P0-2: crash-recovery · 08-Nov-2026
   v2 का P0-होल (v1.6 स्वतंत्र-ऑडिट): release-regen पहले चलता था — बाद की
   syntax-जाँच fail होने पर 110 पेज index-मोड में बदल चुके होते थे।
   v3 नियम: **हरी-बत्ती तक repo में शून्य-write।**
     चरण-A  preflight — सब read-only (पूरी वर्तमान courses_data syntax समेत)
     चरण-B  तीनों नई-सामग्री memory में + temp syntax-जाँच
     चरण-C  release-पेज candidate-फ़ोल्डर (.stageb-cand) में बनते हैं —
            generator v1.2 का DMT_OUT_DIR; असली pages-dir अछूता
     चरण-D  candidate-जाँच (110 · robots=index 110/110 · noindex=0)
     चरण-E  deploy: pages-dir → .stageb-bak (rename) · cand → pages ·
            तीनों assets write — किसी भी त्रुटि पर पूर्ण-बहाली
            (पेज .bak से वापस + लिखे assets मूल-buffer से), exit 1
   Founder-मुहर + content_sha256 द्वार generator --mode=release के भीतर
   (एकमात्र घर) — बासी मुहर = चरण-C पर ही रुकाव, कुछ नहीं लिखा।
   v3.1 नया: शुरू में crash-recovery — पिछली दौड़ का .stageb-bak मिले तो उसे
   कभी अंधाधुंध नहीं मिटाया जाता: pages ग़ायब ⇒ backup से बहाल कर आगे;
   दोनों मौजूद ⇒ मानवी-जाँच तक रुकाव (संदेश में बहाली-कदम)। deploy-catch में
   तीनों assets का unconditional-restore (written-सूची पर निर्भरता गई)।
   test-only envs (production में अनुपस्थित = निष्क्रिय):
   STAGEB_FAULT=sw ⇒ sw-write से पहले त्रुटि (rollback-परीक्षा);
   STAGEB_FAULT=crash-after-bak ⇒ pages→backup rename के ठीक बाद process.exit(88);
   STAGEB_FAULT=crash-after-swap ⇒ cand→pages rename के ठीक बाद process.exit(88)।
   चलाना (clone-रूट में STAGE-B फ़ोल्डर रखकर):  node STAGE-B\patch_stage_b.js
   ============================================================================ */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.resolve(__dirname, "..");
const P = {
  gen:  path.join(ROOT, "generator", "build_dmt_pages.js"),
  mf:   path.join(ROOT, "generator", "data", "dmt_release_manifest.json"),
  data: path.join(ROOT, "assets", "courses_data.js"),
  idx:  path.join(ROOT, "courses", "hi", "index.html"),
  sw:   path.join(ROOT, "sw.js"),
  tpl:  path.join(ROOT, "_TEMPLATE.html"),
};
const PAGES = path.join(ROOT, "courses", "hi", "digital-mitra-basic");
const CAND  = path.join(ROOT, ".stageb-cand");
const BAK   = PAGES + ".stageb-bak";
function die(m){ console.error("❌ STAGE-B रुका: " + m); process.exit(1); }

/* ---------------- चरण-A0: crash-recovery (पिछली अधूरी दौड़ की सफ़ाई/बहाली) ---------------- */
fs.rmSync(CAND, { recursive: true, force: true });  /* candidate हमेशा फेंकने-योग्य */
if (fs.existsSync(BAK)){
  if (!fs.existsSync(PAGES)){
    fs.renameSync(BAK, PAGES);
    console.log("♻️  crash-recovery: पिछली अधूरी दौड़ का backup मिला, pages ग़ायब थे — backup से बहाल");
  } else {
    die("पिछली अधूरी दौड़ के निशान: backup (" + BAK + ") और pages दोनों मौजूद — मानवी-जाँच चाहिए।\n" +
        "   पहचान: backup के पेज noindex (मूल preview) होने चाहिए। बहाली-कदम:\n" +
        "   1) pages फ़ोल्डर का नाम बदलकर अलग रखें (जाँच हेतु)\n" +
        "   2) backup का नाम digital-mitra-basic करें\n" +
        "   3) assets/courses_data.js · courses/hi/index.html · sw.js में SE026/v-बदलाव हो तो git checkout से मूल लाएँ\n" +
        "   4) तब STAGE-B दोबारा चलाएँ। backup को यह script कभी ख़ुद नहीं मिटाती।");
  }
}

/* ---------------- चरण-A: preflight (सब read-only) ---------------- */
for (const k in P) if (!fs.existsSync(P[k])) die("फ़ाइल नहीं: " + P[k]);
let M; try { M = JSON.parse(fs.readFileSync(P.mf, "utf8")); } catch(e){ die("manifest JSON टूटा: " + e.message); }
if (M.founder_approved !== true || M.metadata_verified !== true)
  die("Founder-मुहर नहीं (founder_approved/metadata_verified true चाहिए)");
{ const AO=String(M.approved_on||""), m=AO.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const d=m?new Date(Date.UTC(+m[1],+m[2]-1,+m[3])):null;
  const ok=d&&d.getUTCFullYear()===+m[1]&&d.getUTCMonth()===+m[2]-1&&d.getUTCDate()===+m[3];
  if(!ok) die("approved_on ख़ाली/अमान्य कैलेंडर-तारीख़ ("+AO+")");
  if(AO>new Date().toISOString().slice(0,10)) die("approved_on भविष्य की तारीख़ ("+AO+")"); }
if (!Array.isArray(M.lesson_ids) || M.lesson_ids.length !== 109) die("manifest lesson_ids ≠ 109");
if (!/^[0-9a-f]{64}$/.test(String(M.content_sha256||""))) die("manifest content_sha256 ख़ाली/अमान्य");

const data = fs.readFileSync(P.data, "utf8");
if (data.indexOf('"SE026"') >= 0 || data.indexOf("'SE026'") >= 0) die("courses_data में SE026 पहले से — दोहराव");
const ANCHOR = '"t2": ["पाइथन में प्रमाणपत्र","Certificate in Python"]}';  /* SE025-प्रविष्टि का अंत — SE026 इसके बाद */
if (data.split(ANCHOR).length !== 2) die("SE024 anchor ठीक-1× नहीं");
/* पूरी वर्तमान फ़ाइल की syntax — ऑडिट-fixture (SE024 के आगे SYNTAX=;) यहीं रुके, regen से पहले */
{ const t = P.data + ".stageb-precheck.tmp.js"; fs.copyFileSync(P.data, t);
  const c = cp.spawnSync(process.execPath, ["--check", t], { encoding: "utf8" });
  fs.rmSync(t, { force: true });
  if (c.status !== 0) die("मौजूदा courses_data.js की syntax ही टूटी है — पहले उसे सुधारें:\n" + c.stderr); }

const idx = fs.readFileSync(P.idx, "utf8");
if (idx.indexOf("'SE026'") >= 0 || idx.indexOf('"SE026"') >= 0) die("index READY में SE026 पहले से");
const RANCH = "const READY_IDS = ['";
if (idx.split(RANCH).length !== 2) die("READY_IDS anchor ठीक-1× नहीं");

const sw = fs.readFileSync(P.sw, "utf8");
const swm = sw.match(/const CACHE_VERSION = ['"]v(\d+)['"]/);
if (!swm) die("sw.js CACHE_VERSION pattern नहीं मिला");
console.log("✅ चरण-A preflight (read-only) पास");

/* ---------------- चरण-B: तीनों नई-सामग्री memory ---------------- */
const ENTRY = ANCHOR + ',\n  {"id": "SE026", "sector": 463, "name_hi": "ACS डिजिटल मित्र: बुनियादी कौशल में प्रमाणपत्र (ACS Certificate in Basic Skills for Digital Mitra)", "name_en": "ACS Certificate in Basic Skills for Digital Mitra", "mg": 7, "edu": ["class10","class12"], "duration": "3 माह", "level": "L1-L3", "online": "Free", "offline": "Paid", "lessons": 109, "url": "/courses/hi/digital-mitra-basic/", "seal": "💻", "t2": ["डिजिटल मित्र","Digital Mitra","KYP","कुशल युवा कार्यक्रम"]}';
const dataNew = data.replace(ANCHOR, ENTRY);
{ const t = P.data + ".stageb-new.tmp.js"; fs.writeFileSync(t, dataNew);
  const c = cp.spawnSync(process.execPath, ["--check", t], { encoding: "utf8" });
  fs.rmSync(t, { force: true });
  if (c.status !== 0) die("नई courses_data syntax fail:\n" + c.stderr); }
const idxNew = idx.replace(RANCH, RANCH + "SE026','");  /* v3.2: READY-insertion quote-सुधार */
if (idxNew.split("'SE026'").length !== 2) die("idxNew में SE026 ठीक-1× नहीं");
const swNew = sw.replace(swm[0], "const CACHE_VERSION = 'v" + (parseInt(swm[1],10)+1) + "'");
console.log("✅ चरण-B नई-सामग्री तैयार (sw v" + swm[1] + "→v" + (parseInt(swm[1],10)+1) + ") — अभी कुछ लिखा नहीं");

/* ---------------- चरण-C: candidate release-build (.stageb-cand) ---------------- */
fs.rmSync(CAND, { recursive: true, force: true });
const g = cp.spawnSync(process.execPath, [P.gen, "--mode=release"],
  { cwd: ROOT, encoding: "utf8", env: Object.assign({}, process.env, { DMT_OUT_DIR: CAND }), maxBuffer: 1024*1024*64 });
process.stdout.write(g.stdout || ""); process.stderr.write(g.stderr || "");
if (g.status !== 0){ fs.rmSync(CAND, { recursive: true, force: true }); die("release-build fail — repo में कुछ नहीं लिखा गया"); }

/* ---------------- चरण-D: candidate-जाँच ---------------- */
const files = fs.readdirSync(CAND).filter(f => f.endsWith(".html"));
if (files.length !== 110){ fs.rmSync(CAND,{recursive:true,force:true}); die("candidate में " + files.length + " HTML ≠ 110"); }
let noidx = 0, idxOk = 0;
for (const f of files){ const h = fs.readFileSync(path.join(CAND, f), "utf8");
  if (h.indexOf("noindex") >= 0) noidx++;
  if (h.indexOf('name="robots" content="index, follow, max-image-preview:large"') >= 0) idxOk++; }
if (noidx !== 0 || idxOk !== 110){ fs.rmSync(CAND,{recursive:true,force:true}); die("robots-जाँच fail (noindex=" + noidx + ", index=" + idxOk + "/110)"); }
console.log("✅ चरण-C/D candidate 110-पेज release-मोड सही — अब तक repo अछूता");

/* ---------------- चरण-E: deploy + किसी भी त्रुटि पर पूर्ण-बहाली ---------------- */
const orig = { data: fs.readFileSync(P.data), idx: fs.readFileSync(P.idx), sw: fs.readFileSync(P.sw) };
let pagesMoved = false;
try {
  if (fs.existsSync(BAK)) die("अनपेक्षित: deploy-क्षण पर backup पहले से मौजूद — चरण-A0 के बाद असंभव; मानवी-जाँच");
  fs.renameSync(PAGES, BAK); pagesMoved = true;
  if (process.env.STAGEB_FAULT === "crash-after-bak") process.exit(88);  /* kill-simulate: rollback-catch नहीं चलेगा */
  fs.renameSync(CAND, PAGES);
  if (process.env.STAGEB_FAULT === "crash-after-swap") process.exit(88);
  fs.writeFileSync(P.data, dataNew);
  fs.writeFileSync(P.idx,  idxNew);
  if (process.env.STAGEB_FAULT === "sw") throw new Error("STAGEB_FAULT=sw (जान-बूझकर परीक्षा-त्रुटि)");
  fs.writeFileSync(P.sw,   swNew);
} catch (e) {
  /* v3.1: तीनों assets unconditional-restore — orig-buffer हमेशा मौजूद, written-सूची पर निर्भरता नहीं */
  try { fs.writeFileSync(P.data, orig.data); } catch(_){}
  try { fs.writeFileSync(P.idx,  orig.idx);  } catch(_){}
  try { fs.writeFileSync(P.sw,   orig.sw);   } catch(_){}
  if (pagesMoved){ fs.rmSync(PAGES, { recursive: true, force: true });
    try { fs.renameSync(BAK, PAGES); } catch(_){ } }
  fs.rmSync(CAND, { recursive: true, force: true });
  die("deploy-त्रुटि (" + e.message + ") — पेज + तीनों assets मूल-रूप में बहाल");
}
fs.rmSync(BAK, { recursive: true, force: true });
console.log("🏁 STAGE-B v3 पूर्ण: 110 पेज release (index,follow) · SE026 जुड़ा · READY_IDS · sw v" + (parseInt(swm[1],10)+1));
console.log("   अब: git add -A → commit → push (Founder की अंतिम अनुमति से)।");
