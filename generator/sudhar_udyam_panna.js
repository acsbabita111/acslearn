#!/usr/bin/env node
/* ============================================================
   sudhar_udyam_panna.js v1.0 (27-Nov-2026, खेप SEO-सफ़ाई v2) : उद्यम-पन्ने (/udyam/) के दो पुराने होल
   (1) पन्ना नीचे खिसकाने पर हर बार JavaScript की ग़लती होती थी: script "scrollTop" नाम का बटन ढूँढती थी,
       जो इस पन्ने में है ही नहीं। अब बटन न मिले, तो script चुप रहती है।
   (2) ऊपर का logo पुराने पते (acsbabita111.github.io) से आता था। अब साइट के अपने पते /logo.png से।
   उद्यम-पन्ना हाथ का बना है (कार्ड-सूची और पूरी सूची build_udyam_suchi.js से आती है)। इसलिए यह सुधार
   इस दर्ज यंत्र से है, हाथ से नहीं। पन्ने का कोई पाठ नहीं बदलता। दोबारा चलाना सुरक्षित है।
   चलाना: node generator/sudhar_udyam_panna.js [--check]
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const F = path.join(__dirname, "..", "udyam", "index.html"), CHECK = process.argv.includes("--check");
let s = fs.readFileSync(F, "utf8"); const s0 = s;
const PAIRS = [
  ["window.addEventListener('scroll',()=>document.getElementById('scrollTop').classList.toggle('show',window.scrollY>300));",
   "window.addEventListener('scroll',()=>{const b=document.getElementById('scrollTop');if(b)b.classList.toggle('show',window.scrollY>300);});"],
  ['<img src="https://acsbabita111.github.io/acslearn/logo.png" alt="ACS" class="hero-logo"/>',
   '<img src="/logo.png" alt="ACS" class="hero-logo"/>']
];
for (const [a, b] of PAIRS) {
  const na = s.split(a).length - 1, nb = s.split(b).length - 1;
  if (na + nb !== 1) throw new Error("sudhar_udyam_panna: ठीक एक जगह चाहिए (पुराना " + na + ", नया " + nb + "): " + a.slice(0, 60));
  if (na) s = s.replace(a, b);
}
if (/github\.io/.test(s)) throw new Error("sudhar_udyam_panna: पन्ने में github.io का पता अब भी है");
if (CHECK) { if (s !== s0) { console.log("❌ उद्यम-पन्ने के सुधार नहीं लगे : चलाएँ node generator/sudhar_udyam_panna.js"); process.exit(1); } console.log("🏁 sudhar_udyam_panna : दोनों सुधार लगे हैं"); }
else { if (s !== s0) fs.writeFileSync(F, s, "utf8"); console.log("✅ sudhar_udyam_panna v1.0 : " + (s !== s0 ? "पन्ना सुधरा" : "कोई बदलाव नहीं")); }
