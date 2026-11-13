/* patch_career_hi_rules.js v1.2 (13-Nov-2026)
   career.html (हिंदी) की पाँच पंक्तियों को Founder के 13-Nov-2026 के परीक्षा-नियमों से मिलाता है:
   पूरे टेस्ट का समय 3 × 40 मिनट है (3 खंड, हर खंड अधिकतम 40 मिनट), और Golden Pass में "असीमित" की जगह "दिन में 2 बार तक"।
   v1.2: पेज वही कहे जो आज का code करता है। ₹125 की रिपोर्ट में अभी नाम, unique नंबर, QR और जाँच-पेज नहीं हैं
   (वे खेप 3 में प्रमाणपत्र के साथ आएँगे), इसलिए उनके दावे और नमूना-चित्र वाला हिस्सा हटाया गया; और
   "पूरे टेस्ट का नतीजा login पर अपने-आप server पर सेव होता है" वाली पंक्ति हटाई गई (अब वह सेव बंद है)।
   हर बदलाव exact-state है: पुराना पाठ ठीक एक बार मिले तो बदले; नया पाठ पहले से हो तो छोड़ दे; वरना FAIL।
   दोबारा चलाने पर एक भी byte नहीं बदलता। पेज का "report-sample v1.8" निशान जस का तस रहता है
   (build_career_lang.js उसी को देखता है)। चलाना: node generator/patch_career_hi_rules.js */
'use strict';
const fs = require('fs'), path = require('path');
const FILE = path.join(__dirname, '..', 'career.html');
let s = fs.readFileSync(FILE, 'utf8'); const before = s; let fails = 0, changed = 0;
function count(h, n) { return h.split(n).length - 1; }
function cut(label, oldStr, newStr) {   /* हटाने या छोटा करने वाला बदलाव: पुराना ठीक एक बार हो तो बदले; पुराना न हो तो पहले से हो चुका */
  const c = count(s, oldStr);
  if (c === 1) { s = s.split(oldStr).join(newStr); changed++; console.log('  \u2713 ' + label); return; }
  if (c === 0 && (newStr === '' || count(s, newStr) >= 1)) { console.log('  \u2713 (already) ' + label); return; }
  console.log('  \u2717 FAIL: ' + label + ' (old \u00d7' + c + ')'); fails++;
}
function op(label, oldStr, newStr) {
  const c = count(s, oldStr), n = count(s, newStr);
  if (c === 1 && n === 0) { s = s.split(oldStr).join(newStr); changed++; console.log('  \u2713 ' + label); return; }
  if (c === 0 && n === 1) { console.log('  \u2713 (already) ' + label); return; }
  console.log('  \u2717 FAIL: ' + label + ' (old \u00d7' + c + ', new \u00d7' + n + ')'); fails++;
}
op('समय 90 मिनट -> 3 × 40 मिनट', 'समय 90 मिनट का है।', 'समय 3 × 40 मिनट का है।');
op('असीमित बार -> दिन में 2 बार तक', '>असीमित बार<', '>दिन में 2 बार तक<');
op('जितनी बार चाहें -> दिन में 2 बार तक', 'साल भर जितनी बार चाहें दें;', 'साल भर दें, दिन में 2 बार तक;');
op('Golden Pass: चांस असीमित -> मुफ़्त, दिन में 2 बार तक', 'Active Golden Pass में पूरे टेस्ट के चांस असीमित हैं।', 'Active Golden Pass में पूरा टेस्ट मुफ़्त है, दिन में 2 बार तक।');
op('तुलना-पंक्ति: बैज-धारक को असीमित -> पास वालों को मुफ़्त, दिन में 2 बार तक', '· बैज-धारक को असीमित', '· पास वालों को मुफ़्त, दिन में 2 बार तक');
op('असीमित का चिह्न (\u267e) -> दिशा का चिह्न', 'cz-gppill">\u267e\ufe0f पूरा ', 'cz-gppill">\ud83e\udded पूरा ');
op('रिपोर्ट-कार्ड: नाम, unique नंबर और QR का दावा हटा', 'नतीजे के बाद उसी पेज से मिलती है। इस पर आपका नाम, unique नंबर और QR होता है। दुनिया में कहीं से असली-नक़ली जाँच हो जाती है। न लें तो भी नतीजा दिखता ही है।', 'नतीजे के बाद उसी पेज से मिलती है। न लें तो भी नतीजा दिखता ही है।');
cut('निजता-तालिका: "पूरे टेस्ट का नतीजा login पर अपने-आप server पर" वाली पंक्ति हटी', '<tr><td>पूरे टेस्ट का नतीजा-सार (login पर)</td><td>आपके ACS खाते में server पर, अपने-आप: ताकि फ़ोन बदलने पर भी पिछला नतीजा मिल जाए।</td></tr>', '');
cut('निजता-तालिका: ₹125 की पंक्ति से नाम, नंबर और QR-जाँच हटे', '<tr><td>₹125 रिपोर्ट का सार (नाम, टेस्ट-नाम, अंक-सार, नंबर)</td><td>ACS के server पर। QR-जाँच इसी से चलती है।</td></tr><tr><td>QR-जाँच में क्या दिखता है?</td><td>सिर्फ़ रिपोर्ट-नंबर और असली या नक़ली की स्थिति।</td></tr>', '<tr><td>₹125 रिपोर्ट का सार</td><td>ACS के server पर।</td></tr>');
(function () {   /* "125 रुपये की रिपोर्ट में क्या मिलेगा? नमूना देखिए" वाला पूरा हिस्सा (नमूना-चित्र समेत) */
  const mark = '📜 125 रुपये की रिपोर्ट में क्या मिलेगा? नमूना देखिए', c = count(s, mark), label = 'नमूना-रिपोर्ट वाला हिस्सा (QR, unique नंबर, 24 सेक्टर के अंक) हटा';
  if (c === 0 && count(s, 'career-report-sample-hi.webp') === 0) { console.log('  \u2713 (already) ' + label); return; }
  const i = s.indexOf(mark), a = s.lastIndexOf('<section', i), b = s.indexOf('</section>', i);
  if (c !== 1 || a < 0 || b < 0 || i - a > 300 || count(s.slice(a, b), '<section') !== 1 || count(s.slice(a, b), 'career-report-sample-hi.webp') !== 1) { console.log('  \u2717 FAIL: ' + label); fails++; return; }
  s = s.slice(0, a) + s.slice(b + '</section>'.length); changed++; console.log('  \u2713 ' + label);
})();
if (count(s, 'report-sample v1.8') !== 1) { console.log('  \u2717 FAIL: page is not v1.8'); fails++; }
if (/90 मिनट|असीमित|जितनी बार चाहें|\u267e|QR|unique नंबर|Unique नंबर|फ़ोन बदलने पर भी/.test(s)) { console.log('  \u2717 FAIL: पुराना दावा अब भी पेज पर है'); fails++; }
if (fails) { console.log('\u26d4 career.html नहीं बदली गई (' + fails + ' दोष)'); process.exit(1); }
if (s !== before) fs.writeFileSync(FILE, s);
console.log('\ud83c\udfc1 career.html: ' + changed + ' बदलाव' + (changed ? '' : ' (पहले से नई हालत में)'));
