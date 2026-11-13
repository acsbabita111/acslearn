/* ============================================================
   build_dmt_pages.js: "ACS डिजिटल मित्र: बुनियादी कौशल में प्रमाणपत्र" (SE026) पेज-generator (परत-4)
   v2.4-dmt (08-Nov: तीन-बटन पंक्ति — सुनो|परिचय|सभी-पाठ बायाँ-केंद्र-दायाँ, jump अब dropdown; css v1.6d)। पहले का: v2.6-dmt (08-Nov: हरी meta-पंक्ति हटी + प्रमाणपत्र/फीस बटन-heading केंद्र + खंड dropdown)। पहले का: v2.5-dmt (08-Nov: index nav होम|पाठ-1|लॉगिन + फीस-तालिका login-कड़ी + ₹125-row रजिस्ट्रेशन-बटन)। पहले का: v2.2-dmt (08-Nov: 545 प्रश्न tap-रूप — loader quiz-निकासी 5-सख़्त + quizHTML + course-lesson v1.6 इंजन)। पहले का: v2.1-dmt (08-Nov: हर पाठ-पेज में hero-फ़ोटो img/<id>.webp + 109-फ़ोटो release-द्वार + promote में img-रक्षा)। पहले का: v2.0-dmt (08-Nov Founder-आदेश: AI-banner img/dmt-hero.webp = index का full-width hero, SVG-column हटा; alt=sealed नाम)। पहले का: v1.9-dmt (08-Nov Founder-टोक: hero-SVG सपाट आरेख था, "शानदार" नहीं — नया कथा-दृश्य hero: गाँव की झोपड़ी+पेड़ → राह → desk पर laptop पर सीखता युवा, सुनहरी चमक, 4 हुनर-icon की कक्षा (orbit), ऊपर प्रमाणपत्र+QR, नीचे सुनहरी पट्टी "गाँव से डिजिटल मित्र तक"; सिर्फ़ ACS 5-रंग)। पहले का: v1.8-dmt (08-Nov Founder-मुहर अ: नाम "ACS डिजिटल मित्र: बुनियादी कौशल में प्रमाणपत्र" + विराम-नियम: दिखने वाले content में लंबी रेखा वर्जित, जगह ":" या "।" + KYP सरकारी-नाम "KYP (कुशल युवा कार्यक्रम) डिजिटल मित्र" + index-robot में लंबी-रेखा द्वार)। पहले का: v1.7-dmt (08-Nov Founder-सुधार: slug digital-skills-basic→digital-mitra-basic (blunder-बंदी) + course.title मनमाना "तैयारी कोर्स"→sealed नाम दोनों रूप, hero में English-पंक्ति)। पहले का: v1.6-dmt (08-Nov Founder-आदेश: landing hero-पट्टी — gradient banner + hero-SVG + chips + 2 CTA + stat-पट्टी; header उसी में समाहित)। पहले का: v1.5-dmt (08-Nov ऑडिट-v2.0 सुधार: परीक्षा ₹0 व प्रमाणपत्र ₹125 अलग पंक्तियाँ · नमूना-संख्या ACS-CC · 120-अंक) — आधार v1.4-dmt · 08-Nov-2026 — Founder-आदेश: intro-पेज में प्रमाणपत्र-नमूना (SAMPLE-watermark SVG) + फीस-सूची। पहले का: v1.3-dmt — v1.7-ऑडिट P1: approved_on असली कैलेंडर-roundtrip + future-निषेध। पहले का: v1.2-dmt — v1.6-ऑडिट P0: DMT_OUT_DIR env (staging-candidate build, repo-write शून्य) ·
   swap-promote (पुराना dir पहले .bak-swap, rename-त्रुटि पर बहाली — rmSync-first बंद) ·
   release-मुहर content-binding (manifest.content_sha256 = 109MD+template+generator+robot का संयुक्त-hash,
   approved_on validated-date अनिवार्य)। पहले का: v1.1-dmt — fail-closed (स्वतंत्र-ऑडिट कार्यादेश P0): robot-gate अनिवार्य ·
   publish-flag सख़्ती · meta-escape · --mode=preview(noindex, default)|release(manifest-द्वार) ·
   temp-build → atomic promote (किसी भी fail पर पुराना output byte-अछूता)। आधार: v1.0-dmt / welding v1.3;
   स्रोत = generator/data/dmt_lessons_md/ के 109 robot-पास MD (परत-3, एकमात्र घर)
   v1.3 · 19-Aug-2026 (वेल्डिंग-पूर्ति: article पर data-lsn-num/data-course, index पर data-course-index + a.crs-lsn[data-num],
               course.progressJs हो तो <script> जुड़े — प्रगति-रंग व अभ्यास-प्रश्न के लिए; अछूते कोर्स byte-अछूते)। पहले का:
   v1.2 · 16-Jul-2026 (काम-कोर्स-2: + videoUrl/videoNote-खाना — प्रति-पाठ सत्यापित वीडियो;
              बिना-वीडियो पाठों में सत्यापित BharatSkills सरकारी-मंच कड़ी। पहले का:
   v1.1 · 16-Jul-2026 (+ कोर्स-परिचय पेज (index.html) निर्माण;
              पाठ-1 का पिछला-बटन अब कोर्स-परिचय पर। पाठ-पेजों का GEN_NOTE v1.0 ही —
              ताकि अछूते पाठ byte-अछूते रहें।)
   ------------------------------------------------------------
   लोहे का नियम: कोई पाठ-पेज हाथ से न बने — सिर्फ़ यह script।
   स्रोत:  /_TEMPLATE.html (परत-2 — root मास्टर टेम्पलेट, home वाला universal ढाँचा)
         + generator/data/welding_lessons_data.js (परत-3 — पाठ-सामग्री का एकमात्र घर)
   चलाना: repo-रूट से → node generator/build_course_pages.js
   नतीजा: /courses/hi/<course-slug>/<code>-<num>-<slug>.html (SEO-नामकरण नियम)

   check-robot (fail = पेज नहीं बनेगा):
   1. हर पाठ ≥ 1200 शब्द (Founder-नियम 15-Jul: 1200-1300 न्यूनतम)
   2. हर पाठ में ≥ 1 रेखा-चित्र (svg) — अनिवार्य
   3. दिखने वाले text में square bracket नहीं — सिर्फ़ गोल ( )
   4. कोई font-size 16px से नीचे नहीं
   5. कूट-नाम (course.code आदि) पेज के दिखने वाले text में नहीं
   ============================================================ */

"use strict";
const fs = require("fs");
const path = require("path");

/* ============ DMT data-loader (परत-3 MD → lesson-objects) ============ */
function escHtml(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}
function inlineMd(t){
  return t.replace(/`([^`\n]+)`/g,"<code>$1</code>")
          .replace(/\*\*([^*\n]+)\*\*/g,"<strong>$1</strong>")
          .replace(/(^|[\s(।—])\*([^*\n]+)\*(?=[\s).,।—]|$)/g,"$1<em>$2</em>");
}
function mdToSections(body){
  const svgs=[]; body=body.replace(/<svg[\s\S]*?<\/svg>/g,function(m){svgs.push(m);return "\u27E6SVG"+(svgs.length-1)+"\u27E7";});
  const lines=body.split("\n");
  const secs=[]; let cur=null; const lead=[]; let para=[], listBuf=null, tableBuf=null;
  function target(){return cur?cur.parts:lead;}
  function flushPara(){ if(para.length){ target().push("<p>"+inlineMd(escHtml(para.join(" ")))+"</p>"); para=[]; } }
  function flushList(){ if(listBuf){ target().push("<"+listBuf.tag+">"+listBuf.items.map(function(i){return "<li>"+inlineMd(escHtml(i))+"</li>";}).join("")+"</"+listBuf.tag+">"); listBuf=null; } }
  function flushTable(){ if(tableBuf){
      const rows=tableBuf.filter(function(r){return !/^\s*\|[\s\-|:]+\|\s*$/.test(r);});
      const html=rows.map(function(r,i){ const cells=r.replace(/^\s*\|/,"").replace(/\|\s*$/,"").split("|").map(function(c){return inlineMd(escHtml(c.trim()));});
        const tag=(i===0)?"th":"td"; return "<tr>"+cells.map(function(c){return "<"+tag+">"+c+"</"+tag+">";}).join("")+"</tr>"; }).join("");
      target().push('<div class="lsn-tblwrap" style="overflow-x:auto"><table class="lsn-tbl">'+html+"</table></div>"); tableBuf=null; } }
  function flushAll(){ flushPara(); flushList(); flushTable(); }
  for(const raw of lines){
    const t=raw.replace(/\s+$/,"");
    if(/^\u27E6SVG\d+\u27E7$/.test(t.trim())){ flushAll(); target().push(t.trim()); continue; }
    if(t.indexOf("# ")===0){ flushAll(); continue; }
    if(t.indexOf("## ")===0){ flushAll(); cur={t:inlineMd(escHtml(t.slice(3).trim())),parts:[]}; secs.push(cur); continue; }
    if(/^\s*\|/.test(t)){ flushPara(); flushList(); (tableBuf=tableBuf||[]).push(t); continue; }
    const lm=t.match(/^\s*([-*]|\d+[.)])\s+(.*)$/);
    if(lm){ flushPara(); flushTable(); const tag=/^[-*]$/.test(lm[1])?"ul":"ol";
      if(!listBuf||listBuf.tag!==tag){ flushList(); listBuf={tag:tag,items:[]}; }
      listBuf.items.push(lm[2]); continue; }
    if(!t.trim()){ flushAll(); continue; }
    flushTable(); flushList(); para.push(t.trim());
  }
  flushAll();
  function put(h){return h.replace(/\u27E6SVG(\d+)\u27E7/g,function(m,i){return svgs[+i];});}
  return { lead: put(lead.join("\n")),
           sections: secs.map(function(s){return {t:s.t,h:put(s.parts.join("\n"))};}) };
}
function loadDMT(){
  const dir=path.join(__dirname,"data","dmt_lessons_md");
  const files=fs.readdirSync(dir).filter(function(f){return /^dmt-\d+-\d+\.md$/.test(f);})
    .sort(function(a,b){const A=a.match(/dmt-(\d+)-(\d+)/),B=b.match(/dmt-(\d+)-(\d+)/);
      return (+A[1]-+B[1])||(+A[2]-+B[2]);});
  if(files.length!==109) throw new Error("MD-गिनती "+files.length+" (109 चाहिए)");
  const lessons=[]; let num=0;
  for(const f of files){
    const raw=fs.readFileSync(path.join(dir,f),"utf8");
    const fmm=raw.match(/^---([\s\S]*?)---/); if(!fmm) throw new Error("front-matter नहीं: "+f);
    const fm=fmm[1];
    function g(k){const m=fm.match(new RegExp('^'+k+':\\s*"?(.*?)"?\\s*$','m'));return m?m[1]:null;}
    const id=g("lesson_id"); const kp=id.match(/dmt-(\d+)\.(\d+)/);
    /* P0.2: publish-flag सख़्ती — दोनों सटीक false अनिवार्य (स्रोत-रोक), वरना पूरा build रुके */
    if (g("publish") !== "false" || g("seo_publish_ready") !== "false")
      throw new Error("publish-रोक टूटी (" + f + "): publish व seo_publish_ready दोनों false चाहिए");
    num++;
    /* v2.2: quiz-block निकासी — '**प्र-1.' से अगले ## तक; 5 प्रश्न सख़्त, parse-fail = build रुके */
    let body = raw.slice(fmm[0].length);
    const qi = body.indexOf("**प्र-1.");
    if (qi < 0) throw new Error("quiz नहीं मिला: " + f);
    let qseg = body.slice(qi);
    const qnx = qseg.search(/^## /m);
    if (qnx > -1) qseg = qseg.slice(0, qnx);
    body = body.slice(0, qi).replace(/^## .*5 प्रश्न.*$/m, "") + body.slice(qi + qseg.length);
    const qparts = qseg.split(/\*\*(?=प्र-\d+\.)/).filter(function(s){return /^प्र-\d+\./.test(s);});
    if (qparts.length !== 5) throw new Error("quiz में " + qparts.length + " प्रश्न (5 चाहिए): " + f);
    const LETTERS = ["क","ख","ग","घ"];
    const quiz = qparts.map(function(s){
      const m = s.match(/^प्र-(\d+)\.\*?\*?\s*([\s\S]*?)\s*\(क\)\s*([\s\S]*?)\s*\(ख\)\s*([\s\S]*?)\s*\(ग\)\s*([\s\S]*?)\s*\(घ\)\s*([\s\S]*?)\s*\*?\*?उत्तर:\s*\(([कखगघ])\)।?\*?\*?\s*(?:कारण:)?\s*([\s\S]*)$/);
      if (!m) throw new Error("quiz-साँचा टूटा (" + f + "): " + s.slice(0,40));
      return { n:+m[1], q:m[2].trim(), o:[m[3],m[4],m[5],m[6]].map(function(x){return x.trim().replace(/[\s*]+$/,"");}),
               ans:LETTERS.indexOf(m[7]), why:m[8].trim().replace(/[\s*]+$/,"") };
    });
    /* v2.2b: प्र-5 के कारण की पूँछ (ख़ाली-पंक्ति के बाद "अगला पाठ/खंड…" पंक्ति) quiz से बाहर */
    let quizTail = "";
    const w5 = quiz[4].why;
    const bl = w5.indexOf("\n\n");
    if (bl > -1){ quizTail = w5.slice(bl).trim(); quiz[4].why = w5.slice(0, bl).trim().replace(/[\s*]+$/,""); }
    const md=mdToSections(body);
    lessons.push({ num:num, id:id, disp:(+kp[1])+"."+(+kp[2]),
      title:escAttr(g("h1_hi")||g("title")), slug:g("slug"),
      metaTitle:escAttr(g("seo_title_hi")), metaDesc:escAttr(g("seo_description_hi")),
      minutes:"11-13", lead:md.lead, sections:md.sections, quiz:quiz, quizTail:quizTail, videoUrl:null });
  }
  const KH=["खंड-1: परिचय व बुनियाद","खंड-2: Word","खंड-3: Excel","खंड-4: PowerPoint","खंड-5: फ़ाइल, Email व Scanner","खंड-6: सुरक्षा व निजता","खंड-7: ग्राहक-सेवा व सरकारी portal","खंड-8: AI की समझ","खंड-9: रोज़गार-योग्यता"];
  const CNT=[8,16,16,10,14,12,12,10,11]; const parts=[]; let at=1;
  for(let i=0;i<9;i++){ parts.push({no:i+1,name:KH[i],from:at,to:at+CNT[i]-1}); at+=CNT[i]; }
  const course={ code:"dmt", lang:"hi", slug:"digital-mitra-basic",
    title:"ACS डिजिटल मित्र: बुनियादी कौशल में प्रमाणपत्र",
    titleEn:"ACS Certificate in Basic Skills for Digital Mitra",
    tagline:"ACS डिजिटल मित्र: बुनियादी कौशल में प्रमाणपत्र: Word, Excel, PowerPoint, Email, सुरक्षा, सरकारी portal, AI व रोज़गार-हुनर की पूरी मुफ़्त पढ़ाई",
    totalLessons:109, parts:parts, videoQuery:"कंप्यूटर बेसिक", govVideoHtml:"",
    introHtml:'<p>यह कोर्स उनके लिए है जो कंप्यूटर के बुनियादी हुनर (Word, Excel, PowerPoint, Email, फ़ाइल-सँभाल, ऑनलाइन सुरक्षा, सरकारी portal पर काम और AI की समझ) सीखकर काम-काज के लायक़ बनना चाहते हैं। पढ़ने के लिए कक्षा-6 तक की हिंदी काफ़ी है। कोई भी पाठ खोलिए, पढ़िए, और हर पाठ के अंत के 5 सवालों से ख़ुद को जाँचते चलिए।</p>\n<p><b>साफ़ बात:</b> यह ACS का अपना तैयारी-कोर्स है। यह बिहार सरकार के आधिकारिक कोर्स "KYP (कुशल युवा कार्यक्रम) डिजिटल मित्र" या BSDM का कोर्स नहीं है, और इससे कोई सरकारी प्रमाणपत्र नहीं मिलता। यह उस पढ़ाई की मज़बूत तैयारी कराता है।</p>\n<h2 style="text-align:center;border-left:0;padding-left:0;margin:34px 0 14px"><span style="display:inline-block;background:#0B1F3A;color:#F9A825;border:2px solid #F9A825;border-radius:999px;padding:10px 26px;font-size:20px;box-shadow:0 3px 10px rgba(11,31,58,.25)">📜 प्रमाणपत्र का नमूना</span></h2>\n<p>पूरा कोर्स पढ़कर ऑनलाइन परीक्षा पास करने पर ऐसा डिजिटल प्रमाणपत्र मिलेगा। इस पर आपका नाम, अंक, तारीख़ और जाँच (verify) के लिए अपना अलग नंबर व QR होगा। दुनिया में कहीं से भी असली-नक़ली जाँचा जा सकेगा। नीचे सिर्फ़ नमूना है।</p>\n<div style="max-width:760px;margin:14px auto;border:1px solid #c9d4e4;border-radius:10px;overflow:hidden;background:#fff">\n<svg viewBox="0 0 800 566" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="प्रमाणपत्र का नमूना (SAMPLE)" style="display:block;width:100%;height:auto">\n<rect x="0" y="0" width="800" height="566" fill="#F5F7FA"/>\n<rect x="14" y="14" width="772" height="538" fill="#ffffff" stroke="#0B1F3A" stroke-width="3"/>\n<rect x="24" y="24" width="752" height="518" fill="none" stroke="#F9A825" stroke-width="2"/>\n<text x="400" y="66" text-anchor="middle" font-size="22" font-weight="bold" fill="#0B1F3A">FFGPMTrust · Applied Computer School (ACS)</text>\n<text x="400" y="92" text-anchor="middle" font-size="16" fill="#1565C0">जारीकर्ता: FFGPMTrust · प्रशिक्षण-साझेदार: ACS (acslearn.com)</text>\n<text x="400" y="140" text-anchor="middle" font-size="26" font-weight="bold" fill="#0B1F3A">ACS डिजिटल मित्र: बुनियादी कौशल में प्रमाणपत्र</text>\n<text x="400" y="168" text-anchor="middle" font-size="17" fill="#0B1F3A">ACS Certificate in Basic Skills for Digital Mitra</text>\n<text x="400" y="212" text-anchor="middle" font-size="18" fill="#0B1F3A">प्रमाणित किया जाता है कि</text>\n<text x="400" y="248" text-anchor="middle" font-size="22" font-weight="bold" fill="#1565C0">__________ (विद्यार्थी का नाम) __________</text>\n<text x="400" y="286" text-anchor="middle" font-size="17" fill="#0B1F3A">ने 109 पाठों का यह कोर्स पूरा कर ऑनलाइन परीक्षा में ____ / 120 अंक (____%) पाए।</text>\n<text x="400" y="318" text-anchor="middle" font-size="16" fill="#2E7D32">परीक्षा-तारीख़: __-__-____ · प्रमाणपत्र-संख्या: ACS-CC-____-______</text>\n<text x="400" y="356" text-anchor="middle" font-size="16" fill="#0B1F3A">नोट: इन्होंने अभी तक प्रैक्टिकल (practical) नहीं किया है। यह online पढ़ाई का प्रमाणपत्र है।</text>\n<text x="400" y="390" text-anchor="middle" font-size="16" fill="#0B1F3A">आधार: SSC NASSCOM Q2212 + NIOS 632 पर आधारित/प्रेरित। यह सरकारी प्रमाणपत्र नहीं है।</text>\n<rect x="640" y="420" width="96" height="96" fill="none" stroke="#0B1F3A" stroke-width="2"/>\n<text x="688" y="474" text-anchor="middle" font-size="18" fill="#0B1F3A">QR</text>\n<text x="688" y="532" text-anchor="middle" font-size="16" fill="#0B1F3A">जाँच-QR (यहाँ)</text>\n<line x1="70" y1="492" x2="300" y2="492" stroke="#0B1F3A" stroke-width="2"/>\n<text x="185" y="516" text-anchor="middle" font-size="16" fill="#0B1F3A">अधिकृत हस्ताक्षर (FFGPMTrust)</text>\n<text x="400" y="330" text-anchor="middle" font-size="110" font-weight="bold" fill="#1565C0" opacity="0.14" transform="rotate(-24 400 300)">नमूना SAMPLE</text>\n</svg>\n</div>\n<p style="font-size:16px"><b>ध्यान:</b> ऊपर वाला चित्र सिर्फ़ नमूना (sample) है। यह किसी का असली प्रमाणपत्र नहीं है। असली प्रमाणपत्र परीक्षा पास करने पर ही बनता है।</p>\n<h2 id="dmt-fees" style="text-align:center;border-left:0;padding-left:0;margin:34px 0 14px"><span style="display:inline-block;background:#0B1F3A;color:#F9A825;border:2px solid #F9A825;border-radius:999px;padding:10px 26px;font-size:20px;box-shadow:0 3px 10px rgba(11,31,58,.25)">💰 फीस चार्ट</span></h2>\n<table style="width:100%;border-collapse:collapse;font-size:17px">\n<tr style="background:#0B1F3A;color:#fff"><th style="padding:10px;border:1px solid #c9d4e4;text-align:left">क्या</th><th style="padding:10px;border:1px solid #c9d4e4;text-align:left">फीस</th></tr>\n<tr><td style="padding:10px;border:1px solid #c9d4e4">सभी 109 पाठ online पढ़ना + हर पाठ के 5 अभ्यास-सवाल</td><td style="padding:10px;border:1px solid #c9d4e4"><b>₹0: पूरी तरह मुफ़्त</b>, बिना login भी</td></tr>\n<tr><td style="padding:10px;border:1px solid #c9d4e4">ऑनलाइन परीक्षा (120 प्रश्न, 3 खंडों में; एक दिन में 2 परीक्षाएँ तक)</td><td style="padding:10px;border:1px solid #c9d4e4"><b>बैज हो तो ₹0</b> (विद्यार्थी का गोल्डन बैज या नौकरी-इच्छुक का हरा बैज)।<br><b>बैज न हो तो ₹100</b> प्रति परीक्षा। (<a href="/dashboard/" style="color:#1565C0;font-weight:700;text-decoration:underline">ACS-ID से login</a> करके)</td></tr>\n<tr><td style="padding:10px;border:1px solid #c9d4e4">डिजिटल प्रमाणपत्र-PDF (ऊपर जैसा, QR-जाँच सहित), परीक्षा पास करने के बाद</td><td style="padding:10px;border:1px solid #c9d4e4"><b>₹125</b>: मर्ज़ी हो तो लें। न लें, तो भी पढ़ाई मुफ़्त रहती है।<br><b>रजिस्ट्रेशन ज़रूरी है।</b> रजिस्ट्रेशन के लिए <a href="/join.html" style="display:inline-block;margin-top:6px;background:#2E7D32;color:#fff;font-weight:700;border-radius:8px;padding:7px 14px;text-decoration:none">📝 यहाँ क्लिक / टच करें</a></td></tr>\n<tr><td style="padding:10px;border:1px solid #c9d4e4">केंद्र पर offline प्रशिक्षण (practical)</td><td style="padding:10px;border:1px solid #c9d4e4">Paid: राशि केंद्र की सूचना से (ACS-न्यूनतम नियम लागू)</td></tr>\n<tr><td style="padding:10px;border:1px solid #c9d4e4">KYP (कुशल युवा कार्यक्रम) की सरकारी परीक्षा/कोर्स फीस</td><td style="padding:10px;border:1px solid #c9d4e4">ACS तय नहीं करता। ताज़ा जानकारी BSDM के आधिकारिक portal पर देखें</td></tr>\n</table>\n<p style="font-size:16px">नियम सीधा है: <b>पढ़ना सबके लिए मुफ़्त</b>। पैसा तीन जगह लगता है: बिना बैज परीक्षा देने पर (₹100 प्रति परीक्षा), प्रमाणपत्र-PDF लेने पर (₹125), और केंद्र की सेवा लेने पर।</p>' };
  return { DMT_COURSE:course, DMT_LESSONS:lessons };
}


const ROOT = path.join(__dirname, "..");
/* ---- mode (P0.1): default = preview (noindex) ---- */
const ARGS = process.argv.slice(2);
let MODE = "preview";
for (const a of ARGS){
  if (a === "--mode=preview") MODE = "preview";
  else if (a === "--mode=release") MODE = "release";
  else if (a === "--print-digest") MODE = "digest";
  else { console.error("❌ अनजान argument: " + a + " (मान्य: --mode=preview | --mode=release | --print-digest)"); process.exit(1); }
}
function escAttr(t){return String(t||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}

const { DMT_COURSE, DMT_LESSONS } = loadDMT();

/* ---- P0.2 robot-gate: वही v2.5b robot, --bank, nonzero = कुछ नहीं लिखा ---- */
(function robotGate(){
  const cp = require("child_process");
  const dir = path.join(__dirname, "data", "dmt_lessons_md");
  const mds = fs.readdirSync(dir).filter(f=>/\.md$/.test(f)).sort().map(f=>path.join(dir,f));
  const robot = path.join(__dirname, "dev_dmt_check.js");
  if (!fs.existsSync(robot)){ console.error("❌ robot-gate: generator/dev_dmt_check.js नहीं मिला — बिना robot कोई build नहीं (fail-closed)"); process.exit(1); }
  const r = cp.spawnSync(process.execPath, [robot, "--bank", "--expected-lessons=109", "--expected-mcq=545"].concat(mds), {cwd: __dirname, encoding: "utf8", maxBuffer: 64*1024*1024});
  if (r.error || r.status !== 0){
    console.error("❌ robot-gate FAIL (exit " + (r.status===null?"spawn-error":r.status) + ") — कोई पेज नहीं बनेगा, पुराना output अछूता।");
    if (r.stdout) console.error(String(r.stdout).split("\n").slice(-12).join("\n"));
    if (r.error) console.error(String(r.error));
    process.exit(1);
  }
  console.log("🛡️ robot-gate PASS (v2.5b --bank 109/545) · mode=" + MODE + (MODE==="preview"?" (noindex)":""));
})();

/* ---- v1.2: स्वीकृत-सामग्री का संयुक्त-hash (source+template+generator+robot) ---- */
function contentDigest(){
  const crypto = require("crypto");
  const dir = path.join(__dirname, "data", "dmt_lessons_md");
  const parts = [];
  fs.readdirSync(dir).filter(function(f){return /^dmt-\d+-\d+\.md$/.test(f);}).sort()
    .forEach(function(f){ parts.push(f + ":" + crypto.createHash("sha256").update(fs.readFileSync(path.join(dir,f))).digest("hex")); });
  [["_TEMPLATE.html", path.join(ROOT,"_TEMPLATE.html")],
   ["build_dmt_pages.js", __filename],
   ["dev_dmt_check.js", path.join(__dirname,"dev_dmt_check.js")]].forEach(function(p){
    parts.push(p[0] + ":" + crypto.createHash("sha256").update(fs.readFileSync(p[1])).digest("hex")); });
  return crypto.createHash("sha256").update(parts.join("\n")).digest("hex");
}
if (ARGS.indexOf("--print-digest") >= 0){ console.log(contentDigest()); process.exit(0); }

/* ---- P0.1 release-manifest द्वार (Founder-मुहर यांत्रिक) ---- */
if (MODE === "release"){
  const mf = path.join(__dirname, "data", "dmt_release_manifest.json");
  if (!fs.existsSync(mf)){ console.error("❌ release-mode: data/dmt_release_manifest.json नहीं — Founder-मुहर के बिना release असंभव"); process.exit(1); }
  let M; try { M = JSON.parse(fs.readFileSync(mf,"utf8")); } catch(e){ console.error("❌ manifest JSON टूटा: "+e.message); process.exit(1); }
  if (M.founder_approved !== true || M.metadata_verified !== true){ console.error("❌ manifest: founder_approved व metadata_verified दोनों true चाहिए — release रुका"); process.exit(1); }
  const ids = DMT_LESSONS.map(function(l){return l.id;});
  assertLessonPhotos(ids);
  if (!Array.isArray(M.lesson_ids) || M.lesson_ids.length !== 109 || ids.some(function(x,i){return M.lesson_ids[i]!==x;})){
    console.error("❌ manifest lesson_ids 109-सूची से हूबहू मेल नहीं — release रुका"); process.exit(1); }
  const AO = String(M.approved_on||"");
  const aom = AO.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  const aod = aom ? new Date(Date.UTC(+aom[1], +aom[2]-1, +aom[3])) : null;
  const aoOk = aod && aod.getUTCFullYear()===+aom[1] && aod.getUTCMonth()===+aom[2]-1 && aod.getUTCDate()===+aom[3];
  if (!aoOk){
    console.error("❌ manifest approved_on ख़ाली/अमान्य कैलेंडर-तारीख़ (" + AO + ") — release रुका"); process.exit(1); }
  const todayUTC = new Date(); const tStr = todayUTC.toISOString().slice(0,10);
  if (AO > tStr){
    console.error("❌ manifest approved_on भविष्य की तारीख़ (" + AO + " > आज " + tStr + ") — release रुका"); process.exit(1); }
  const dg = contentDigest();
  if (M.content_sha256 !== dg){
    console.error("❌ मुहर बासी: स्वीकृति के बाद सामग्री/टेम्पलेट/generator बदला (content_sha256 बेमेल)");
    console.error("   manifest: " + String(M.content_sha256||"(ख़ाली)").slice(0,16) + "… · अभी: " + dg.slice(0,16) + "… — नई Founder-मुहर लें (tools/muhar_bharo.js)");
    process.exit(1); }
}

const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

const STAMP = "08-Nov-2026";
const GEN_NOTE =
  "<!-- ⚙️ यह पेज generator से बना है (generator/build_course_pages.js v1.0 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

/* ---------- सहायक ---------- */
function pad3(n){ return String(n).padStart(3, "0"); }

function fileName(course, l){
  /* SEO नियम: [code]-[num]-[slug].html · lowercase · hyphen · max 60 */
  const name = String(l.slug).toLowerCase(); /* v1.0-dmt: fm-slug = पूर्ण फ़ाइल-नाम (dmt-K-NN-...) — एकमात्र-घर */
  if (!/^[a-z0-9-]+$/.test(name)) throw new Error("slug-नियम टूटा: " + name);
  if (name.length > 60) throw new Error("slug 60 से लंबा: " + name);
  return name + ".html";
}

function visibleText(html){
  /* svg + tags हटाकर सिर्फ़ पढ़ा जाने वाला text */
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function wordCount(html){
  const t = visibleText(html);
  return t ? t.split(" ").length : 0;
}

/* ---------- check-robot ---------- */
function checkRobot(course, l, contentHtml){
  const holes = [];
  /* v3.1 नियम-11: हर पाठ पर हुनर-टैग; (R)-पाठ में disclaimer-पंक्ति अनिवार्य */
  if (course.requireTag && (!l.tag || !/^[KDPAR+]+$/.test(l.tag))) holes.push("हुनर-टैग नहीं/ग़लत: " + l.tag);
  if (l.tag && l.tag.split("+").indexOf("R") !== -1 && visibleText(contentHtml).indexOf("यह परिचय है") === -1)
    holes.push("(R)-पाठ में परिचय-disclaimer पंक्ति नहीं");
  const words = wordCount(contentHtml);
  /* शब्द-जाँच अब buildPage में coreHtml पर (24-Aug फ़िक्स) */
  if (!/<svg[\s>]/.test(contentHtml)) holes.push("रेखा-चित्र (svg) नहीं मिला");
  const vis = visibleText(contentHtml);
  if (/[\[\]]/.test(vis)) holes.push("दिखने वाले text में square bracket");
  const small = contentHtml.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || [];
  for (const m of small){
    const n = parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?px/i)[1], 10);
    if (n < 16) holes.push("font-size " + n + "px (< 16px): " + m.trim());
  }
  /* svg के font: shorthand भी जाँचो */
  const svgFonts = contentHtml.match(/font\s*:\s*[0-9]{3}\s+0*([0-9]{1,2})px/gi) || [];
  for (const m of svgFonts){
    const n = parseInt(m.match(/([0-9]{1,2})px/i)[1], 10);
    if (n < 16) holes.push("svg font " + n + "px (< 16px)");
  }
  /* svg font-size="NNpx" attribute-रूप भी जाँचो (20-Aug होल-फ़िक्स: पहले सिर्फ़ CSS-रूप देखता था) */
  const svgFontAttrs = contentHtml.match(/font-size\s*=\s*"0*([0-9]{1,2})px"/gi) || [];
  for (const m of svgFontAttrs){
    const n = parseInt(m.match(/([0-9]{1,2})px/i)[1], 10);
    if (n < 16) holes.push("svg font-size attribute " + n + "px (< 16px): " + m.trim());
  }
  const codeRe = new RegExp("\\b" + course.code + "\\b", "i");
  if (codeRe.test(vis)) holes.push("कूट-नाम (" + course.code + ") दिखने वाले text में");
  return { words, holes };
}

/* ---------- पाठ का content-HTML ---------- */
function loadMenu(){
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== \'undefined\') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं पढ़ा गया");
  return box.__L.menu;
}
const MENU = loadMenu();
const MENU_HTML = MENU.map(m =>
  '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>"
).join("\n");
const MENU_FALLBACK_JS =
  '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr' + 'ipt>';

function PART(num){ return DMT_COURSE.parts.find(p => num >= p.from && num <= p.to) || DMT_COURSE.parts[DMT_COURSE.parts.length-1]; }

function ALL_LESSON_LINKS(course, curNum){
  return DMT_LESSONS.map(x =>
    x.num === curNum
      ? '<span class="lsn-jumpcur">पाठ ' + (x.disp||x.num) + " (यही)</span>"
      : '<a href="' + fileName(course, x) + '">पाठ ' + (x.disp||x.num) + "</a>"
  ).join(" ");
}

function assertLessonPhotos(ids){
  const dir = path.join(ROOT, "courses", "hi", "digital-mitra-basic", "img");
  const miss = ids.filter(function(id){ return !fs.existsSync(path.join(dir, id.replace(".","-") + ".webp")); });
  if (miss.length) abortBuild("पाठ-फ़ोटो ग़ायब (" + miss.length + "): " + miss.slice(0,5).join(", ") + " … — img/ में 109 webp अनिवार्य");
  console.log("🖼️ पाठ-फ़ोटो द्वार: 109/109 मौजूद");
}
function qtxt(t){ return escAttr(t).replace(/\*\*(.+?)\*\*/g, "<b>$1</b>"); }
function quizHTML(l){
  const L = ["(क)","(ख)","(ग)","(घ)"];
  let h = '<section class="lsn-sec lsn-quiz" data-quiz>\n<h2>छोटा टेस्ट: 5 प्रश्न</h2>\n' +
    '<p style="font-size:16px;color:#444">हर प्रश्न में सही विकल्प छूकर जवाब दो। सही होने पर हरा, ग़लत पर लाल दिखेगा। बिना छुए जाँचना हो तो "उत्तर देखो" खोलो।</p>\n';
  l.quiz.forEach(function(q){
    h += '<div class="qz" data-ans="' + q.ans + '">\n<p class="qz-q"><strong>प्र-' + q.n + '.</strong> ' + qtxt(q.q) + '</p>\n';
    q.o.forEach(function(o,i){ h += '<div class="qz-opt">' + L[i] + ' ' + qtxt(o) + '</div>\n'; });
    h += '<details class="qz-ans"><summary>उत्तर देखो</summary><p><strong>उत्तर: ' + L[q.ans] + '।</strong> ' + qtxt(q.why) + '</p></details>\n</div>\n';
  });
  if (l.quizTail) h += '<p class="qz-next"><strong>' + qtxt(l.quizTail.replace(/\*\*/g,"")) + '</strong></p>\n';
  return h + '</section>\n\n';
}
function lessonBody(course, l, prevFile, nextFile){
  const secs = l.sections.map(s =>
    '<section class="lsn-sec">\n<h2>' + s.t + "</h2>\n" + s.h.trim() + "\n</section>"
  ).join("\n\n");

  const prev = prevFile
    ? '<a class="lsn-navbtn" href="' + prevFile + '">← पिछला पाठ</a>'
    : '<a class="lsn-navbtn" href="/courses/' + course.lang + '/' + course.slug + '/">← कोर्स-परिचय</a>';
  const next = nextFile
    ? '<a class="lsn-navbtn lsn-next" href="' + nextFile + '">अगला पाठ →</a>'
    : '<span class="lsn-navbtn lsn-soon">अगला पाठ: जल्द</span>';

  return '\n<article class="lsn-wrap" data-lsn-num="' + l.num + '" data-course="' + course.slug + '">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + course.title + " › " +
      PART(l.num).name + "</p>\n" +
    "<h1>पाठ " + (l.disp||l.num) + ": " + l.title + "</h1>\n" +
    '<p class="lsn-meta">पढ़ाई का समय: ' + l.minutes + " मिनट · पाठ " + l.num + " / " +
      course.totalLessons + " · पढ़ाई पूरी तरह मुफ़्त</p>\n" +
    '<div class="lsn-tools3"><button type="button" class="lsn-speakall" data-speakall>🔊 पूरा पाठ सुनो</button>' +
      '<a class="lsn-toolbtn" href="/courses/' + course.lang + "/" + course.slug + '/">📖 कोर्स-परिचय</a>' +
      '<details class="lsn-jump"><summary>📚 सभी पाठ</summary>\n<div class="lsn-jumplist">\n' +
      ALL_LESSON_LINKS(course, l.num) + "\n</div>\n</details></div>\n" +
    "</header>\n\n" +
    '<img class="lsn-photo" src="img/' + l.id.replace(".","-") + '.webp" alt="' + l.title + '" loading="lazy" style="display:block;width:100%;height:auto;border-radius:12px;margin:0 0 16px">\n' +
    (l.lead ? '<section class="lsn-sec lsn-lead">\n' + l.lead + "\n</section>\n\n" : "") + secs + "\n\n" + quizHTML(l) +
    '<section class="lsn-sec lsn-video">\n<h2>वीडियो (Video)</h2>\n' +
    (l.videoUrl
      ? '<p><a class="lsn-vidbtn" href="' + l.videoUrl + '" target="_blank" rel="noopener">▶ इस पाठ का जाँचा हुआ वीडियो देखें</a>' +
        (l.videoNote ? ": " + l.videoNote : "") + "</p>\n"
      : "<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक दो जीवित रास्ते:</p>\n") +
    '<p class="lsn-vidrow">' +
      '<a class="lsn-vidbtn" href="https://www.youtube.com/results?search_query=' +
        encodeURIComponent(course.videoQuery + " " + l.title + " हिंदी") +
        '" target="_blank" rel="noopener">🎬 YouTube पर इस पाठ के वीडियो खोजें</a> ' +
      (course.govVideoHtml || "") + '</p>\n' +
    '<p class="lsn-vidnote">(दोनों नई खिड़की में; वीडियो बिना भी पाठ पूरा। पढ़ाई कहीं नहीं रुकती।)</p>\n' +
    "</section>\n\n" +
    '<nav class="lsn-nav">' + prev + next + "</nav>\n" +
    "</article>\n";
}

/* ---------- टेम्पलेट में जड़ना ---------- */
function buildPage(course, l, prevFile, nextFile){
  const body = lessonBody(course, l, prevFile, nextFile);
  /* 24-Aug robot-फ़िक्स: शब्द-गिनती सिर्फ़ पाठ-सामग्री (sections) पर — jumplist/ढाँचा-पाठ गिनती से बाहर */
  const coreHtml = l.title + " " + (l.lead ? l.lead + " " : "") + l.sections.map(s => s.t + " " + s.h).join(" ") + " " + l.quiz.map(function(q){return "प्र-"+q.n+". "+q.q+" (क) "+q.o[0]+" (ख) "+q.o[1]+" (ग) "+q.o[2]+" (घ) "+q.o[3]+" उत्तर: । कारण: "+q.why;}).join(" ") + " " + (l.quizTail||"").replace(/\*/g,""); /* v2.2: quiz-पाठ भी सामग्री है */ /* v1.0-dmt: MD-h1 शीर्षक core-गिनती में (MD-robot से बराबरी) */
  const { holes } = checkRobot(course, l, body);
  const coreWords = wordCount(coreHtml);
  if (coreWords < 1200) holes.push("शब्द-गिनती (सिर्फ़ सामग्री) " + coreWords + " (< 1200)");
  if (holes.length){
    console.error("❌ पाठ-" + l.num + " check-robot fail:");
    holes.forEach(h => console.error("   • " + h));
    return null;
  }

  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं मिले");

  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);

  /* head: title/meta/canonical (SEO) + पाठ-CSS */
  const canonical = "https://acslearn.com/courses/" + course.lang + "/" + course.slug + "/" +
                    fileName(course, l);
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + l.metaTitle + "</title>\n" +
    '<meta name="description" content="' + l.metaDesc + '">\n' +
    '<meta name="robots" content="' + (MODE==="release" ? "index, follow, max-image-preview:large" : "noindex, nofollow") + '">\n' +
    '<link rel="canonical" href="' + canonical + '">');
  const ld = { "@context": "https://schema.org", "@type": "LearningResource",
    "name": "पाठ-" + l.num + ": " + l.title, "description": l.metaDesc,
    "inLanguage": "hi", "isAccessibleForFree": true, "learningResourceType": "Lesson",
    "url": canonical,
    "isPartOf": { "@type": "Course", "name": course.title, "description": course.tagline,
      "provider": { "@type": "Organization", "name": "Applied Computer School (ACS)", "url": "https://acslearn.com" } } };
  const bc = { "@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "होम", "item": "https://acslearn.com/" },
    { "@type": "ListItem", "position": 2, "name": "कोर्स", "item": "https://acslearn.com/courses/hi/" },
    { "@type": "ListItem", "position": 3, "name": course.title, "item": "https://acslearn.com/courses/" + course.lang + "/" + course.slug + "/" },
    { "@type": "ListItem", "position": 4, "name": "पाठ-" + l.num + ": " + l.title, "item": canonical } ] };
  page = page.replace("</head>",
    '<meta property="og:title" content="' + l.metaTitle + '">\n' +
    '<meta property="og:description" content="' + l.metaDesc + '">\n' +
    '<meta property="og:type" content="article">\n' +
    '<meta property="og:url" content="' + canonical + '">\n' +
    '<meta property="og:site_name" content="Applied Computer School (ACS)">\n' +
    '<script type="application/ld+json">' + JSON.stringify(ld) + "</scr" + "ipt>\n" +
    '<script type="application/ld+json">' + JSON.stringify(bc) + "</scr" + "ipt>\n" +
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n</head>');
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + '\n<script src="/assets/course-lesson.js" defer></scr' + 'ipt>' + (course.progressJs ? '\n<script src="' + course.progressJs + '" defer></scr' + 'ipt>' : '') + '\n</body>');
  /* ── (30-Jul स्थायी-नियम, Founder) घड़ी+प्रगति-इंजन का लोहे का पहरा ──
     भविष्य का हर कोर्स-पाठ इसी नियम पर: course-lesson.css+js अनिवार्य।
     टेम्पलेट-बदलाव से कड़ी छूटे = build यहीं fail (पेज बनेगा ही नहीं)।
     दायरा: सिर्फ़ पाठ-पन्ने — course-details/index जैसे मेटा-पन्ने बाहर
     (उन पर "पढ़ा"-दर्ज = पाठ-गिनती का झूठा फुलाव)। */
  if (page.indexOf('/assets/course-lesson.js') < 0 || page.indexOf('/assets/course-lesson.css') < 0)
    throw new Error("स्थायी-नियम भंग: course-lesson इंजन-कड़ी पाठ-पेज में नहीं — " + (l && l.id));

  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  return { page, words: coreWords };
}

/* ---------- मुख्य ---------- */
const finalDir = process.env.DMT_OUT_DIR ? path.resolve(process.env.DMT_OUT_DIR) : path.join(ROOT, "courses", DMT_COURSE.lang, DMT_COURSE.slug);
const outDir = finalDir + ".tmp-build";
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, fail = 0;
DMT_LESSONS.forEach((l, i) => {
  const prev = i > 0 ? fileName(DMT_COURSE, DMT_LESSONS[i-1]) : null;
  const next = i < DMT_LESSONS.length - 1 ? fileName(DMT_COURSE, DMT_LESSONS[i+1]) : null;
  const built = buildPage(DMT_COURSE, l, prev, next);
  if (!built){ fail++; return; }
  const f = fileName(DMT_COURSE, l);
  fs.writeFileSync(path.join(outDir, f), built.page, "utf8");
  console.log("✅ पाठ-" + l.num + " → courses/" + DMT_COURSE.lang + "/" +
    DMT_COURSE.slug + "/" + f + " (" + built.words + " शब्द)");
  ok++;
});

/* ---------- कोर्स-परिचय पेज (index.html) — SEO-नियम: /courses/[lang]/[slug]/index.html ---------- */
function buildCourseIndex(course, lessons){
  const GEN_NOTE_IDX =
    "<!-- ⚙️ यह पेज generator से बना है (generator/build_course_pages.js v1.1 · 16-Jul-2026) —\n" +
    "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

  function partBlock(pt){
    const inPart = lessons.filter(l => l.num >= pt.from && l.num <= pt.to);
    if (!inPart.length) return "";
    const items = inPart.map(l =>
      '<li class="ci-item"><a class="crs-lsn" data-num="' + l.num + '" href="' + fileName(course, l) + '">पाठ ' + (l.disp||l.num) + ": " + l.title +
      '</a><span class="ci-min">' + l.minutes + " मिनट</span></li>"
    ).join("\n");
    const last = inPart[inPart.length - 1].num;
    const soon = (last < pt.to)
      ? '<p class="ci-soon">बाक़ी पाठ जल्द जुड़ेंगे।</p>'
      : '<p class="ci-soon">यह खंड पूरा ✅</p>';
    return '<details class="ci-part">\n<summary><span>' + pt.name +
      '</span><span class="ci-cnt">' + inPart.length + ' पाठ</span></summary>\n' +
      '<ul class="ci-list">\n' + items + "\n</ul>\n" + soon + "\n</details>\n\n";
  }
  const partSections = course.parts.map(partBlock).join("");

  /* ---------- hero (v2.0: Founder-banner img/dmt-hero.webp मुख्य hero; नीचे का heroSvg अभी अप्रयुक्त, बदलाव-दिन काम आएगा) ---------- */
  const heroSvg =
    '<svg viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="कथा-चित्र: गाँव की झोपड़ी से राह निकलकर laptop पर सीखते युवा तक; चार हुनर-icon उसके चारों ओर, ऊपर प्रमाणपत्र" style="display:block;width:100%;max-width:360px;height:auto">' +
    '<defs>' +
    '<linearGradient id="dmtSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1F3A"/><stop offset="1" stop-color="#1565C0"/></linearGradient>' +
    '<radialGradient id="dmtGlow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#F9A825" stop-opacity="0.85"/><stop offset="1" stop-color="#F9A825" stop-opacity="0"/></radialGradient>' +
    '</defs>' +
    '<rect x="6" y="6" width="468" height="468" rx="24" fill="url(#dmtSky)" stroke="#F9A825" stroke-width="3"/>' +
    /* सूरज + किरणें */
    '<circle cx="404" cy="70" r="26" fill="#F9A825"/>' +
    '<g stroke="#F9A825" stroke-width="4" stroke-linecap="round"><path d="M404 30 v-12"/><path d="M404 110 v12"/><path d="M364 70 h-12"/><path d="M444 70 h12"/><path d="M376 42 l-9 -9"/><path d="M432 98 l9 9"/><path d="M432 42 l9 -9"/><path d="M376 98 l-9 9"/></g>' +
    /* तारे */
    '<g fill="#F5F7FA"><circle cx="60" cy="46" r="3"/><circle cx="118" cy="30" r="2.4"/><circle cx="170" cy="56" r="2"/><circle cx="330" cy="34" r="2.4"/></g>' +
    /* प्रमाणपत्र (ऊपर-बाएँ, तैरता) */
    '<g transform="rotate(-6 96 120)">' +
    '<rect x="42" y="84" width="112" height="78" rx="8" fill="#F5F7FA" stroke="#F9A825" stroke-width="3"/>' +
    '<rect x="54" y="98" width="62" height="7" rx="3.5" fill="#1565C0"/><rect x="54" y="113" width="46" height="6" rx="3" fill="#1565C0" opacity="0.55"/><rect x="54" y="127" width="52" height="6" rx="3" fill="#1565C0" opacity="0.55"/>' +
    '<g fill="#0B1F3A"><rect x="122" y="110" width="22" height="22" rx="2" fill="none" stroke="#0B1F3A" stroke-width="2.5"/><rect x="126" y="114" width="5" height="5"/><rect x="134" y="114" width="5" height="5"/><rect x="126" y="122" width="5" height="5"/><rect x="135" y="123" width="4" height="4"/></g>' +
    '<circle cx="66" cy="150" r="9" fill="#F9A825"/><path d="M62 156 l-5 12 7 -4 5 5 1 -13" fill="#F9A825"/>' +
    '</g>' +
    /* दूर की पहाड़ी + ज़मीन */
    '<path d="M6 352 q120 -40 240 -10 t228 -4 v112 a24 24 0 0 1 -24 24 h-420 a24 24 0 0 1 -24 -24 z" fill="#2E7D32" opacity="0.5"/>' +
    '<path d="M6 388 q150 -30 300 0 t168 6 v56 a24 24 0 0 1 -24 24 h-420 a24 24 0 0 1 -24 -24 z" fill="#2E7D32"/>' +
    /* गाँव: झोपड़ी + पेड़ (बाएँ) */
    '<g>' +
    '<path d="M34 332 h78 v46 h-78 z" fill="#F5F7FA" stroke="#0B1F3A" stroke-width="3"/>' +
    '<path d="M26 332 l47 -34 47 34 z" fill="#F9A825" stroke="#0B1F3A" stroke-width="3"/>' +
    '<rect x="62" y="348" width="22" height="30" fill="#0B1F3A"/>' +
    '<rect x="42" y="342" width="14" height="12" fill="#1565C0"/>' +
    '<rect x="132" y="322" width="9" height="52" fill="#0B1F3A"/>' +
    '<circle cx="136" cy="300" r="26" fill="#2E7D32" stroke="#0B1F3A" stroke-width="3"/><circle cx="118" cy="314" r="16" fill="#2E7D32" stroke="#0B1F3A" stroke-width="3"/><circle cx="156" cy="314" r="15" fill="#2E7D32" stroke="#0B1F3A" stroke-width="3"/>' +
    '</g>' +
    /* झोपड़ी से desk तक राह */
    '<path d="M96 382 Q 200 404 312 372" fill="none" stroke="#F5F7FA" stroke-width="7" stroke-linecap="round" stroke-dasharray="1 16"/>' +
    /* screen के पीछे सुनहरी चमक */
    '<circle cx="330" cy="252" r="104" fill="url(#dmtGlow)"/>' +
    /* desk + laptop + सीखता युवा */
    '<g>' +
    '<rect x="238" y="330" width="186" height="12" rx="6" fill="#0B1F3A"/>' +
    '<rect x="252" y="342" width="10" height="40" fill="#0B1F3A"/><rect x="404" y="342" width="10" height="40" fill="#0B1F3A"/>' +
    /* laptop */
    '<rect x="296" y="226" width="112" height="78" rx="6" fill="#F5F7FA" stroke="#0B1F3A" stroke-width="4"/>' +
    '<rect x="306" y="236" width="92" height="58" rx="3" fill="#0B1F3A"/>' +
    '<g><rect x="314" y="266" width="12" height="22" fill="#2E7D32"/><rect x="330" y="256" width="12" height="32" fill="#2E7D32"/><rect x="346" y="246" width="12" height="42" fill="#F9A825"/></g>' +
    '<path d="M368 282 l10 -12 9 6 11 -16" fill="none" stroke="#F5F7FA" stroke-width="3" stroke-linecap="round"/>' +
    '<path d="M286 304 h132 l12 14 h-156 z" fill="#1565C0" stroke="#0B1F3A" stroke-width="3"/>' +
    /* युवा (बाईं ओर बैठा, laptop की ओर) */
    '<circle cx="246" cy="236" r="20" fill="#F5F7FA" stroke="#0B1F3A" stroke-width="4"/>' +
    '<path d="M228 240 a20 20 0 0 1 10 -21 q14 -6 26 4 l-6 8 q-14 -8 -24 2 z" fill="#0B1F3A"/>' +
    '<path d="M246 256 q-22 10 -24 46 l8 28 h18 l-4 -30 q0 -22 14 -30 z" fill="#1565C0" stroke="#0B1F3A" stroke-width="3"/>' +
    '<path d="M252 272 q26 10 44 26" fill="none" stroke="#1565C0" stroke-width="12" stroke-linecap="round"/>' +
    '<circle cx="298" cy="300" r="7" fill="#F5F7FA" stroke="#0B1F3A" stroke-width="2.5"/>' +
    '</g>' +
    /* हुनर-कक्षा: orbit + 4 icon */
    '<ellipse cx="330" cy="250" rx="128" ry="92" fill="none" stroke="#F9A825" stroke-width="2.5" stroke-dasharray="2 10" opacity="0.9"/>' +
    /* W-दस्तावेज़ (ऊपर) */
    '<g><circle cx="330" cy="156" r="24" fill="#F5F7FA" stroke="#1565C0" stroke-width="4"/><rect x="321" y="145" width="18" height="24" rx="2" fill="#fff" stroke="#1565C0" stroke-width="2.5"/><path d="M325 152 h10 M325 158 h10 M325 164 h7" stroke="#1565C0" stroke-width="2"/></g>' +
    /* X-तालिका (दाएँ) */
    '<g><circle cx="452" cy="250" r="24" fill="#F5F7FA" stroke="#2E7D32" stroke-width="4"/><g stroke="#2E7D32" stroke-width="2.5"><rect x="441" y="239" width="22" height="22" fill="#fff"/><path d="M441 250 h22 M452 239 v22"/></g></g>' +
    /* ₹-सिक्का (नीचे) */
    '<g><circle cx="330" cy="344" r="24" fill="#F9A825" stroke="#0B1F3A" stroke-width="4"/><text x="330" y="354" text-anchor="middle" font-size="26" font-weight="bold" fill="#0B1F3A">₹</text></g>' +
    /* AI-चिंगारी (बाएँ-ऊपर) */
    '<g><circle cx="212" cy="176" r="24" fill="#0B1F3A" stroke="#F5F7FA" stroke-width="4"/><path d="M212 160 l5 11 11 5 -11 5 -5 11 -5 -11 -11 -5 11 -5 z" fill="#F9A825"/></g>' +
    /* नीचे सुनहरी कथा-पट्टी */
    '<rect x="64" y="422" width="352" height="38" rx="19" fill="#F9A825"/>' +
    '<text x="240" y="448" text-anchor="middle" font-size="22" font-weight="bold" fill="#0B1F3A">गाँव से डिजिटल मित्र तक</text>' +
    '</svg>';
  const heroChip = function(t){ return '<span style="display:inline-block;background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.45);color:#fff;border-radius:20px;padding:7px 14px;font-size:16px;margin:4px 6px 0 0">' + t + '</span>'; };
  const heroHtml =
    '<section style="background:linear-gradient(135deg,#0B1F3A 0%,#1565C0 100%);border-bottom:4px solid #F9A825;border-radius:14px;padding:26px 20px;margin:0 0 26px;color:#fff">\n' +
    '<p class="lsn-crumb" style="color:#cfe0f5;margin:0 0 10px"><a href="/courses/hi/" style="color:#F9A825">कोर्स</a> › ' + course.title + '</p>\n' +
    '<img src="img/dmt-hero.webp" alt="' + course.title + ' (' + course.titleEn + ')" style="display:block;width:100%;height:auto;border-radius:14px;margin:0 0 18px;box-shadow:0 6px 24px rgba(0,0,0,.35)">\n' +
    '<div style="display:flex;flex-wrap:wrap;gap:22px;align-items:center;justify-content:space-between">\n' +
    '<div style="flex:1 1 300px;min-width:260px">\n' +
    '<h1 style="color:#fff;margin:0 0 6px;line-height:1.35">' + course.title + '</h1>\n' +
    '<p style="font-size:17px;color:#cfe0f5;margin:0 0 10px">' + course.titleEn + '</p>\n' +
    '<p style="font-size:19px;color:#eaf2fc;margin:0 0 12px">गाँव के बच्चे से डिजिटल मित्र तक: Word (वर्ड), Excel (एक्सेल), UPI (यूपीआई) और AI (एआई) की पूरी तैयारी, कक्षा-6 की हिंदी में।</p>\n' +
    heroChip('📖 109 पाठ: पूरी तरह मुफ़्त') + heroChip('📝 120-प्रश्न online परीक्षा: बैज में मुफ़्त, नहीं तो ₹100') + heroChip('📜 प्रमाणपत्र ₹125: मर्ज़ी हो तो') + '\n' +
    '<p style="margin:18px 0 0">\n' +
    '<a href="' + fileName(course, lessons[0]) + '" style="display:inline-block;background:#F9A825;color:#0B1F3A;font-weight:bold;font-size:20px;border-radius:10px;padding:13px 22px;text-decoration:none;margin:0 10px 10px 0">🚀 पाठ-1 से पढ़ना शुरू करो</a>\n' +
    '<a href="#dmt-fees" style="display:inline-block;background:transparent;color:#fff;border:2px solid #fff;font-size:18px;border-radius:10px;padding:11px 18px;text-decoration:none;margin:0 0 10px">💰 फीस चार्ट देखो</a></p>\n' +
    '</div>\n' +
    '</div>\n' +
    '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-top:20px">\n' +
    ['9 खंड','109 पाठ','545 अभ्यास-सवाल','कक्षा-6 हिंदी · बिना login'].map(function(t){ return '<div style="flex:1 1 120px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.35);border-radius:10px;padding:10px;text-align:center;font-size:17px;font-weight:bold">' + t + '</div>'; }).join('\n') + '\n' +
    '</div>\n</section>\n';

  const body = '\n<article class="lsn-wrap ci-wrap" data-course-index="' + course.slug + '">\n' +
    heroHtml +
    '<section class="lsn-sec">\n<h2>यह कोर्स किसके लिए है</h2>\n' +
    course.introHtml +
    "</section>\n\n" +
    partSections +
    '<section class="lsn-sec">\n<h2>आगे के हिस्से</h2>\n' +
    "<p>पूरा कोर्स " + course.totalLessons + " पाठों का है, " + course.parts.length + " खंडों में। हर पाठ ऊपर की सूची से खुलता है।</p>\n</section>\n\n" +
    '<nav class="lsn-nav"><a class="lsn-navbtn" href="/">🏠 होम</a>' +
    '<a class="lsn-navbtn lsn-next" style="background:#F9A825;border-bottom-color:#c47f12;color:#0B1F3A" href="' +
      fileName(course, lessons[0]) + '">पाठ-1 से शुरू करें →</a>'+'<a class="lsn-navbtn" href="/dashboard/">🔑 लॉगिन</a></nav>\n' +
    "</article>\n";

  /* index की check-robot: bracket · font · कूट-नाम (शब्द-गिनती नियम पाठों का है, परिचय का नहीं) */
  const vis = visibleText(body);
  const holes = [];
  if (/[\[\]]/.test(vis)) holes.push("square bracket");
  if (vis.indexOf("\u2014") !== -1) holes.push("लंबी रेखा (वर्जित)");
  const small = body.match(/font(?:-size)?\s*:\s*0*([0-9]{1,2})(?:\.[0-9]+)?px/gi) || [];
  for (const m of small){
    const n = parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?px/i)[1], 10);
    if (n < 16) holes.push("font " + n + "px");
  }
  if (new RegExp("\\b" + course.code + "\\b", "i").test(vis)) holes.push("कूट-नाम दिखने वाले text में");
  if (holes.length){ console.error("❌ कोर्स-परिचय check-robot fail: " + holes.join(" · ")); return false; }

  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);
  const canonical = "https://acslearn.com/courses/" + course.lang + "/" + course.slug + "/";
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + course.title + " | मुफ़्त ऑनलाइन कोर्स | ACS</title>\n" +
    '<meta name="description" content="' + course.title + ' का पूरा मुफ़्त ऑनलाइन कोर्स सरल हिंदी में। सुरक्षा से हुनर तक, ' + course.totalLessons + ' पाठ। बिना login पढ़िए, अपनी गति से।">\n' +
    '<meta name="robots" content="' + (MODE==="release" ? "index, follow, max-image-preview:large" : "noindex, nofollow") + '">\n' +
    '<link rel="canonical" href="' + canonical + '">');
  page = page.replace("</head>",
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n' +
    "<style>.ci-list{list-style:none;padding:0;margin:12px 0}.ci-item{display:flex;justify-content:space-between;gap:10px;padding:12px 4px;border-bottom:1px solid #E2E8F0;font-size:18px}.ci-item a{color:#1565C0;text-decoration:none;font-weight:600}.ci-min{color:#2E7D32;font-size:16px;white-space:nowrap}.ci-soon{color:#0B1F3A;font-size:17px;font-weight:600;margin-top:10px}</style>\n</head>");
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>", MENU_FALLBACK_JS + (course.progressJs ? '\n<script src="' + course.progressJs + '" defer></scr' + 'ipt>' : "") + "\n</body>");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE_IDX);
  fs.writeFileSync(path.join(outDir, "index.html"), page, "utf8");
  console.log("✅ कोर्स-परिचय → courses/" + course.lang + "/" + course.slug + "/index.html");
  return true;
}
if (!buildCourseIndex(DMT_COURSE, DMT_LESSONS)) fail++;

/* ---- P0.2: post-build स्वतंत्र HTML-जाँच (tmp पर) + atomic promote ---- */
function abortBuild(msg){
  console.error("❌ " + msg + " — tmp हटाया, पुराना output byte-अछूता।");
  fs.rmSync(outDir, { recursive: true, force: true });
  process.exit(1);
}
if (fail) abortBuild("नतीजा: " + ok + " बने · " + fail + " fail");
(function postCheck(){
  const names = fs.readdirSync(outDir).filter(function(f){return /\.html$/.test(f);});
  if (names.length !== DMT_LESSONS.length + 1) abortBuild("पेज-गिनती " + names.length + " (" + (DMT_LESSONS.length+1) + " चाहिए)");
  const set = {}; names.forEach(function(n){set[n]=1;});
  for (const n of names){
    const h = fs.readFileSync(path.join(outDir, n), "utf8");
    const S = h.indexOf("<!-- PAGE-CONTENT-START -->"), E = h.indexOf("<!-- PAGE-CONTENT-END -->");
    if (S < 0 || E < 0) abortBuild(n + ": PAGE-CONTENT निशान नहीं");
    const bodyC = h.slice(S, E);
    if (/<script\b/i.test(bodyC)) abortBuild(n + ": PAGE-CONTENT क्षेत्र में <script>");
    if (/\son[a-z]+\s*=/i.test(bodyC)) abortBuild(n + ": on*-event attribute मिला");
    let mh; const hre = /href="(dmt-[^"]+\.html)"/g;
    while ((mh = hre.exec(bodyC)) !== null){ if (!set[mh[1]]) abortBuild(n + ": मरी-href " + mh[1]); }
    const wantRobots = (MODE === "release") ? "index, follow" : "noindex, nofollow";
    if (h.indexOf('name="robots" content="' + wantRobots) < 0) abortBuild(n + ": robots-meta mode से बेमेल");
  }
  console.log("🛡️ post-build जाँच PASS (" + names.length + " पेज · script/on*-attr/मरी-href शून्य · robots=" + (MODE==="release"?"index":"noindex") + ")");
})();
/* v1.2 swap-promote: पुराना dir मिटाने के बजाय पहले .bak-swap में; rename-त्रुटि पर पुराना बहाल */
const bak = finalDir + ".bak-swap";
fs.rmSync(bak, { recursive: true, force: true });
const hadOld = fs.existsSync(finalDir);
try {
  if (hadOld) fs.renameSync(finalDir, bak);
  fs.renameSync(outDir, finalDir);
} catch (e) {
  if (hadOld && !fs.existsSync(finalDir) && fs.existsSync(bak)) try { fs.renameSync(bak, finalDir); } catch(_){}
  abortBuild("promote-त्रुटि (" + e.message + ") — पुराना output बहाल");
}
const bakImg = path.join(bak, "img"), finImg = path.join(finalDir, "img");
if (fs.existsSync(bakImg) && !fs.existsSync(finImg)) fs.renameSync(bakImg, finImg);
fs.rmSync(bak, { recursive: true, force: true });
console.log("\n🏁 नतीजा: " + ok + " पाठ + परिचय — atomic promote → " + path.relative(ROOT, finalDir) + " (img/ सुरक्षित)");
