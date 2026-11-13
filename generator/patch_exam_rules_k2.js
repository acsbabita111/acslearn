/* generator/patch_exam_rules_k2.js : v1.1 (13-Nov-2026) : खेप 2
   v1.1 (ऑडिट K2-H02): v1.0 से कुछ वाक्य छूट गए थे जो अब भी कहते थे कि परीक्षा मुफ़्त है, या कि पैसा सिर्फ़ प्रमाणपत्र का लगता है:
     डिजिटल मित्र के पेज के दो वाक्य, कैथी और तिरहुता के मुख्य पेज और पाठ 33, और 416 भाषा-कोर्स के मुख्य पेज तथा संस्था-पर्चे।
     ये सब अब जोड़े गए हैं। भाषा-कोर्स के पेज सूची से नहीं, फ़ोल्डर courses/hi/bhasha को छानकर बदले जाते हैं।
   कोर्स की अंतिम परीक्षा के नए नियम (Founder, 13-Nov-2026) पुराने वाक्यों में लिखता है:
   "10 चांस" वाली सीमा हट गई है; परीक्षा अब बैज वालों के लिए मुफ़्त और बाक़ी के लिए ₹100 प्रति परीक्षा है;
   3 खंड; एक दिन में 2 परीक्षाएँ; सबसे अच्छा अंक दर्ज।
   हर बदलाव दो जगह एक साथ होता है: स्रोत (generator की data-फ़ाइल) में और उससे बने पेज में, ताकि दोनों एक ही बात कहें।
   सटीक-हाल नियम: पुराना वाक्य गिनती के साथ मिले तभी बदलता है; नया पहले से हो तो छोड़ देता है; कुछ और मिले तो रुक जाता है।
   चलाना (repo की जड़ से): node generator/patch_exam_rules_k2.js */
"use strict";
var fs = require("fs"), path = require("path"), ROOT = path.join(__dirname, "..");
function count(h, n) { return h.split(n).length - 1; }
var BADGE = " परीक्षा बैज वालों के लिए मुफ़्त है; बैज न हो तो ₹100 प्रति परीक्षा लगते हैं।";
var TWO = "पैसा दो जगह लगता है: अंतिम परीक्षा में (बैज हो तो मुफ़्त, नहीं तो ₹100 प्रति परीक्षा)";
var LIPI_FAQ_OLD = "पैसा सिर्फ़ तब, जब आप अपनी मर्ज़ी से प्रमाणपत्र (₹125) लें।", LIPI_FAQ_NEW = TWO + " और प्रमाणपत्र में (₹125, मर्ज़ी से)।";
var PAPER_OLD_1 = "पैसा सिर्फ़ उस काग़ज़ का है जो आपकी मेहनत की ", PAPER_NEW_1 = TWO + ", और उस काग़ज़ में जो आपकी मेहनत की ";
var PAPER_OLD_2 = " दे — प्रमाणपत्र; और वह भी आपकी मर्ज़ी: लें तो, न लें तो पढ़ाई उतनी ही पूरी।", PAPER_NEW_2 = " दे, यानी प्रमाणपत्र (₹125)। दोनों आपकी मर्ज़ी से हैं: न लें, तो भी पढ़ाई उतनी ही पूरी।";
/* 416 भाषा-कोर्स: स्रोत generator/build_specials.js; पेज courses/hi/bhasha/<भाषा>/index.html और .../brief/index.html */
var KKB = [
  ["हाँ। पढ़ना, सुनना, बोलना, साप्ताहिक परीक्षा — सब मुफ़्त, बिना login। सिर्फ़ प्रमाणपत्र-PDF ₹125 का है, वह भी मर्ज़ी से।",
   "पढ़ाई पूरी तरह मुफ़्त है: पढ़ना, सुनना, बोलना और साप्ताहिक परीक्षा, बिना login। पैसा दो जगह लगता है: 90 दिन बाद की अंतिम परीक्षा में (बैज हो तो मुफ़्त, नहीं तो ₹100 प्रति परीक्षा) और प्रमाणपत्र-PDF में (₹125, मर्ज़ी से)।"],
  ["कोर्स मुफ़्त, प्रमाणपत्र ₹125", "कोर्स मुफ़्त; अंतिम परीक्षा बैज में मुफ़्त, नहीं तो ₹100; प्रमाणपत्र ₹125"],
  ["course free, certificate ₹125", "course free; final exam free with a learner badge, otherwise ₹100; certificate ₹125"]
];
var JOBS = [
  { name: "डिजिटल मित्र: फीस चार्ट", files: [["generator/build_dmt_pages.js", 1], ["courses/hi/digital-mitra-basic/index.html", 1]], rep: [
    ['ऑनलाइन परीक्षा (120 प्रश्न, 10 चांस तक)</td><td style="padding:10px;border:1px solid #c9d4e4"><b>₹0: मुफ़्त</b> (<a href="/dashboard/" style="color:#1565C0;font-weight:700;text-decoration:underline">ACS-ID से login</a> करके)</td>',
     'ऑनलाइन परीक्षा (120 प्रश्न, 3 खंडों में; एक दिन में 2 परीक्षाएँ तक)</td><td style="padding:10px;border:1px solid #c9d4e4"><b>बैज हो तो ₹0</b> (विद्यार्थी का गोल्डन बैज या नौकरी-इच्छुक का हरा बैज)।<br><b>बैज न हो तो ₹100</b> प्रति परीक्षा। (<a href="/dashboard/" style="color:#1565C0;font-weight:700;text-decoration:underline">ACS-ID से login</a> करके)</td>'],
    ['<b>₹125</b>: मर्ज़ी हो तो लें, न लें तो पढ़ाई व परीक्षा फिर भी मुफ़्त।', '<b>₹125</b>: मर्ज़ी हो तो लें। न लें, तो भी पढ़ाई मुफ़्त रहती है।'],
    ['📝 120-प्रश्न online परीक्षा: मुफ़्त', '📝 120-प्रश्न online परीक्षा: बैज में मुफ़्त, नहीं तो ₹100'],
    ['पैसा सिर्फ़ तब, जब आप प्रमाणपत्र-PDF या केंद्र की सेवा लें।', 'पैसा तीन जगह लगता है: बिना बैज परीक्षा देने पर (₹100 प्रति परीक्षा), प्रमाणपत्र-PDF लेने पर (₹125), और केंद्र की सेवा लेने पर।'] ] },
  { name: "पहला कोड: पाठ 203", files: [["generator/data/pl0_lessons_data.js", 1], ["courses/hi/first-code/pl0-203-shabashi-tum-programmer-ban-gaye-pramanpatra-dwar.html", 1]], rep: [
    ['पास के लिए 60%, कुल 10 चांस; शुल्क और नियम वहीं लिखे होते हैं, पहले से।',
     'पास के लिए 60%। परीक्षा 3 खंडों में होती है और दोबारा भी दी जा सकती है (एक दिन में 2 परीक्षाएँ तक); आपका सबसे अच्छा अंक दर्ज रहता है। शुल्क और नियम वहीं लिखे होते हैं, पहले से।'] ] },
  { name: "तिरहुता: पाठ 33", files: [["generator/data/tirhuta_lessons_data.js", 1], ["courses/hi/tirhuta-lipi/tir-033-pramanpatra-dwar-aage-ki-raah.html", 0]], rep: [
    ['और परीक्षा देने के <b>दस चांस</b> तक मिलते हैं। तो पहली ठोकर हार नहीं',
     'और परीक्षा <b>दोबारा भी</b> दी जा सकती है (एक दिन में 2 परीक्षाएँ तक); आपका सबसे अच्छा अंक ही दर्ज रहता है।' + BADGE + ' तो पहली ठोकर हार नहीं'],
    ['120 प्रश्न, 60 प्रतिशत, दस चांस समेत।', '120 प्रश्न, 60 प्रतिशत, और दोबारा देने का नियम समेत।'],
    ['हर बार 120 बेतरतीब प्रश्न, 60 प्रतिशत पर पास, दस चांस तक ·', 'हर बार 120 बेतरतीब प्रश्न, 60 प्रतिशत पर पास, दोबारा भी दे सकते हैं ·'],
    ['(120 प्रश्न, 60% पास, 10 चांस)', '(120 प्रश्न, 60% पास)'],
    [PAPER_OLD_1, PAPER_NEW_1], [PAPER_OLD_2, PAPER_NEW_2] ] },
  { name: "तिरहुता: मुख्य पेज", files: [["generator/data/tirhuta_lessons_data.js", 1], ["courses/hi/tirhuta-lipi/index.html", 2]], rep: [[LIPI_FAQ_OLD, LIPI_FAQ_NEW]] },
  { name: "कैथी: मुख्य पेज", files: [["generator/data/kaithi_lessons_data.js", 1], ["courses/hi/kaithi-lipi/index.html", 2]], rep: [[LIPI_FAQ_OLD, LIPI_FAQ_NEW]] },
  { name: "कैथी: पाठ 33", files: [["generator/data/kaithi_lessons_data.js", 1], ["courses/hi/kaithi-lipi/kth-033-kaithi-pramanpatra-dwar-aage-ki-raah.html", 0]], rep: [
    ['और परीक्षा के <b>दस चांस</b> तक मिलते हैं — तो पहली ठोकर हार नहीं',
     'और परीक्षा <b>दोबारा भी</b> दी जा सकती है (एक दिन में 2 परीक्षाएँ तक); आपका सबसे अच्छा अंक ही दर्ज रहता है।' + BADGE + ' इसलिए पहली ठोकर हार नहीं'],
    ['120 प्रश्न, 60 प्रतिशत पर पास, दस चांस)', '120 प्रश्न, 60 प्रतिशत पर पास, दोबारा भी दे सकते हैं)'],
    [PAPER_OLD_1, PAPER_NEW_1], [PAPER_OLD_2, PAPER_NEW_2] ] },
  { name: "वेल्डिंग: पाठ 626", files: [["generator/data/welding_lessons_data.js", 4], ["courses/hi/welding/wld-626-varkasha-pa-ke-bada-pariksha-ki-raha-dohara-tala.html", 4]], rep: [
    ['10 चांस', 'एक दिन में 2 परीक्षाएँ तक'], ['90-120 मिनट', '3 खंड, 60 से 120 मिनट'] ] }
];
var out = [], changed = 0, skipped = 0;
JOBS.forEach(function (job) {
  job.files.forEach(function (fc) {
    var f = path.join(ROOT, fc[0]), want = fc[1];
    if (!fs.existsSync(f)) { console.log("[STOP] फ़ाइल नहीं मिली: " + fc[0]); process.exit(1); }
    var s = fs.readFileSync(f, "utf8"), did = 0;
    job.rep.forEach(function (r) {
      var nOld = count(s, r[0]), nNew = count(s, r[1]);
      if (nOld === 0 && nNew > 0) { skipped++; return; }                    /* पहले से नया */
      if (nOld === 0) { console.log("[STOP] " + fc[0] + " में न पुराना वाक्य मिला, न नया: " + r[0].slice(0, 60)); process.exit(1); }
      if (want && nOld !== want) { console.log("[STOP] " + fc[0] + " में पुराना वाक्य " + nOld + " बार मिला, अपेक्षा " + want + ": " + r[0].slice(0, 60)); process.exit(1); }
      s = s.split(r[0]).join(r[1]); did += nOld;
    });
    if (did) { fs.writeFileSync(f, s); changed++; out.push(fc[0] + " (" + did + ")"); }
  });
});
/* ---- 416 भाषा-कोर्स ---- */
(function () {
  var f = path.join(ROOT, "generator", "build_specials.js"), s = fs.readFileSync(f, "utf8"), did = 0;
  KKB.forEach(function (r) {
    var nOld = count(s, r[0]), nNew = count(s, r[1]);
    if (nOld === 0 && nNew === 1) { skipped++; return; }
    if (nOld !== 1) { console.log("[STOP] generator/build_specials.js में पुराना वाक्य " + nOld + " बार मिला, अपेक्षा 1: " + r[0].slice(0, 50)); process.exit(1); }
    s = s.split(r[0]).join(r[1]); did++;
  });
  if (did) { fs.writeFileSync(f, s); changed++; out.push("generator/build_specials.js (" + did + ")"); }
  var base = path.join(ROOT, "courses", "hi", "bhasha"), nIdx = 0, nBrief = 0, bad = [];
  fs.readdirSync(base, { withFileTypes: true }).forEach(function (d) {
    if (!d.isDirectory()) return;
    [["index.html", [[KKB[0], 2]]], [path.join("brief", "index.html"), [[KKB[1], 1], [KKB[2], 1]]]].forEach(function (job) {
      var pf = path.join(base, d.name, job[0]);
      if (!fs.existsSync(pf)) return;
      var h = fs.readFileSync(pf, "utf8"), n = 0;
      job[1].forEach(function (x) {
        var r = x[0], want = x[1], nOld = count(h, r[0]), nNew = count(h, r[1]);
        if (nOld === 0 && nNew === want) return;                 /* पहले से नया */
        if (nOld === 0 && nNew === 0) return;                    /* इस पेज में यह वाक्य है ही नहीं (पुरानी पर्ची जैसा पेज) */
        if (nOld !== want) { bad.push("courses/hi/bhasha/" + d.name + "/" + job[0] + " : " + nOld + " बार, अपेक्षा " + want); return; }
        h = h.split(r[0]).join(r[1]); n += nOld;
      });
      if (n) { fs.writeFileSync(pf, h); if (job[0] === "index.html") nIdx++; else nBrief++; }
    });
  });
  if (bad.length) { console.log("[STOP] भाषा-कोर्स के कुछ पेजों में गिनती अलग मिली:\n  " + bad.slice(0, 8).join("\n  ")); process.exit(1); }
  if (nIdx || nBrief) { changed += nIdx + nBrief; out.push("भाषा-कोर्स के मुख्य पेज " + nIdx + " और संस्था-पर्चे " + nBrief); }
})();
console.log(changed ? "🏁 बदली फ़ाइलें " + changed + ": " + out.join(" · ") : "🏁 कुछ बदलना बाक़ी नहीं था (सब पहले से नए हाल में)");
