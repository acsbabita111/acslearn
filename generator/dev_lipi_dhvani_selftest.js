/* dev_lipi_dhvani_selftest.js v1.1 · 23-Nov-2026 (मलय के मामले जुड़े; fgc के मामले वैसे ही) · v1.0 22-Nov-2026 : जाँच-यंत्र की अपनी परीक्षा ("पहरेदार का पहरा")
   चलाओ: node generator/dev_lipi_dhvani_selftest.js <code>
   क्या करता है: असली data और असली पन्ने में जान-बूझकर एक-एक ग़लती डालता है (सिर्फ़ याददाश्त में; कोई फ़ाइल नहीं बदलती),
                 और देखता है कि dev_lipi_dhvani_check की सही जाँच फेल होती है या नहीं।
   कोई ग़लती बिना पकड़े निकल जाए = यह परीक्षा फेल। तब जाँच-यंत्र कमज़ोर है, और पहले उसे ठीक करना है। */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const LD = require("./lipi_dhvani.js"), CHK = require("./dev_lipi_dhvani_check.js");
const code = process.argv[2] || "fgc";
const L = require("./build_lipi_pages.js").LIPI_LANGS.find(l => l.code === code);
const page = fs.readFileSync(path.join(ROOT, "courses/hi/bhasha", L.slug, "lipi/index.html"), "utf8");
const clone = D => { const c = Object.assign({}, D); c.dhvani = D.dhvani.map(s => Object.assign({}, s)); c.milti = D.milti.map(m => Object.assign({}, m)); c.alag = D.alag.map(a => Object.assign({}, a)); c.ank = D.ank.slice(); c.samuh = D.samuh.map(g => Object.assign({}, g)); return c; };
const base = LD.load(code);
let pass = 0, fail = 0;
function expect(name, list, ids) {
  const failed = list.filter(x => !x.ok).map(x => x.id), hit = ids.filter(i => failed.indexOf(i) >= 0);
  if (hit.length === ids.length) { pass++; console.log("  ✅ पकड़ी: " + name + " → " + ids.join(", ")); }
  else { fail++; console.log("  ❌ नहीं पकड़ी: " + name + " · चाहिए " + ids.join(", ") + " · फेल हुईं " + (failed.join(", ") || "कोई नहीं")); }
}
const S = (D, g) => D.dhvani.find(s => s.g === g);
function modelCase(name, mut, ids, mutM) { const D = clone(base); mut(D); const M = LD.makeModel(L, D); if (mutM) mutM(M); expect(name, CHK.checkModel(L, D, M), ids); }

/* 0. बिना ग़लती के सब पास होना चाहिए */
{ const M = LD.makeModel(L, base); const a = CHK.checkModel(L, base, M).concat(CHK.checkContent(L, base, M, CHK.article(page)), CHK.checkFile(L, base, M, page)); const bad = a.filter(x => !x.ok);
  if (bad.length) { fail++; console.log("  ❌ बिना ग़लती के भी फेल: " + bad.map(x => x.id).join(", ")); } else { pass++; console.log("  ✅ बिना ग़लती: " + a.length + " जाँचें पास"); } }

console.log("— data में ग़लती —");
if (code === "fgc") {
modelCase("ou की आवाज़ ग़लत लिखी (उ की जगह ओ)", D => { S(D, "ou").dev = "ओ"; }, ["M02", "M03"]);
modelCase("j का IPA ग़लत लिखा (रूप वही)", D => { S(D, "j").ipa = "dʒ"; }, ["M02"]);
modelCase("è का स्रोत और रूप दोनों बदले (ऐ की जगह ए): कोर्स से टकराव", D => { S(D, "è").ipa = "e"; S(D, "è").dev = "ए"; }, ["M03", "M04"]);
modelCase("आवाज़ में दो रूप (आ / ए)", D => { S(D, "a").dev = "आ / ए"; }, ["M02", "M15"]);
modelCase("ch का कार्ड हटा दिया", D => { D.dhvani = D.dhvani.filter(s => s.g !== "ch"); D.milti = D.milti.filter(m => m.g.indexOf("ch") < 0); }, ["M05"]);
modelCase("h का कार्ड जोड़ दिया (अकेला आता ही नहीं)", D => { D.dhvani.push({ g: "h", ipa: "h", dev: "ह", grp: "ragad", src: ["omniglot"], hindi: "हाथ", kaise: "ह" }); }, ["M06", "M12"]);
modelCase("आवाज़ का स्रोत नहीं लिखा", D => { S(D, "r").src = []; }, ["M01"]);
modelCase("v और w का तुलना-कार्ड हटा दिया", D => { D.milti = D.milti.filter(m => !(m.g.indexOf("v") >= 0 && m.g.indexOf("w") >= 0)); }, ["M09"]);
modelCase("हिंदी में न होने वाली आवाज़ पर कोई चेतावनी नहीं", D => { S(D, "y").hindi = ""; S(D, "y").dhyan = ""; }, ["M10"]);
modelCase("अंक का नाम ग़लत (6 पर 7 का नाम)", D => { D.ank[6] = D.ank[7]; }, ["M11"]);
modelCase("झूठा दावा: e सिर्फ़ en में (अपवाद दर्ज नहीं)", D => { D.alag.find(a => a.l === "e").apvaad = []; }, ["M12"]);
modelCase("data में लंबी डैश", D => { S(D, "a").kaise = "मुँह खोलो — पूरा।"; }, ["M15"]);
}
if (code === "ms") {
const Y0 = base.yantra;
modelCase("तालिंग e की आवाज़ ग़लत लिखी (ए की जगह अ)", D => { S(D, "é").dev = "अ"; }, ["M02", "M03"]);
modelCase("ny का IPA ग़लत लिखा (रूप वही)", D => { S(D, "ny").ipa = "n"; }, ["M02"]);
modelCase("आख़िरी टुकड़े वाली छोटे a की रीति हटा दी", D => { D.riti = Object.assign({}, D.riti, { antBand: [] }); }, ["M04"]);
modelCase("शब्द के अंत का हलंत-नियम हटा दिया", D => { D.riti = Object.assign({}, D.riti, { antHalant: false }); }, ["M04"]);
modelCase("यंत्र की तालिंग-सूची से boleh छूटा (यंत्र अ पढ़े, कार्ड ए)", D => { D.yantra = Object.assign({}, Y0, { word: w => w === "boleh" ? "बोलह्" : Y0.word(w) }); }, ["M04", "M18"]);
modelCase("कोर्स-छपाई पुरानी रह गई (boleh = बोलह्)", D => { }, ["M13", "M18"], M => { M.chhapai.map["boleh"] = { forms: { "बोलह्": 20 }, n: 20 }; });
modelCase("कम-सूची बासी (ng कोर्स में बहुत शब्दों में है)", D => { D.kam = D.kam.concat(["ng"]); }, ["M06"]);
modelCase("आवाज़ का स्रोत नहीं लिखा", D => { S(D, "ai").src = []; }, ["M01"]);
modelCase("v और w का तुलना-कार्ड हटा दिया", D => { D.milti = D.milti.filter(m => !(m.g.indexOf("v") >= 0 && m.g.indexOf("w") >= 0)); }, ["M09"]);
modelCase("हिंदी में न होने वाली आवाज़ पर कोई चेतावनी नहीं", D => { S(D, "ng").hindi = ""; S(D, "ng").dhyan = ""; }, ["M10"]);
modelCase("अंक का नाम ग़लत (6 पर 7 का नाम)", D => { D.ank[6] = D.ank[7]; }, ["M11"]);
modelCase("झूठा दावा: n इस कोर्स में नहीं", D => { D.alag = D.alag.concat([{ l: "n", sirf: [], baat: "{n} नहीं है।" }]); }, ["M12"]);
modelCase("data में लंबी डैश", D => { S(D, "a").kaise = "मुँह खोलो — पूरा।"; }, ["M15"]);
}
modelCase("उदाहरण में संक्षेप घुसा", D => { }, ["M07"], M => { M.cards[0].shabd[0] = Object.assign({}, M.cards[0].shabd[0], { w: "UPI" }); });
modelCase("उदाहरण-शब्द का उच्चारण बदला", D => { }, ["M07"], M => { M.cards[3].shabd[0] = Object.assign({}, M.cards[3].shabd[0], { dev: "ग़लत" }); });
modelCase("एक शब्द दो कार्डों पर", D => { }, ["M08"], M => { M.cards[1].shabd[0] = M.cards[0].shabd[0]; });
modelCase("योजना में एक कार्ड छूटा", D => { }, ["M14"], M => { M.din[2].g.pop(); });

console.log("— पन्ने में ग़लती —");
const M0 = LD.makeModel(L, base), art = CHK.article(page);
const pageCase = (name, fn, ids) => { const h = fn(art); if (h === art) { fail++; console.log("  ❌ परीक्षा ख़ुद नहीं लगी: " + name); return; } expect(name, CHK.checkContent(L, base, M0, h), ids); };
const c7 = M0.byG["ou"] || M0.cards[6], c1 = M0.cards[0];
const h0has = g => art.indexOf('<b class="ld-hl">' + g + "</b>") >= 0;
pageCase("कार्ड का 🔊 किसी और आवाज़ पर", h => h.replace('ld-bt ld-sun" data-pron="' + c7.dev + '"', 'ld-bt ld-sun" data-pron="' + c1.dev + c1.dev + '"'), ["P02"]);
pageCase("🔊 को रोमन पाठ भेजा गया", h => h.replace('ld-ic ld-sun" data-pron="', 'ld-ic ld-sun" data-pron="Ayè '), ["P03"]);
pageCase("बटन का नाम हटा", h => h.replace(/(<button type="button" class="ld-ic ld-sun"[^>]*?) aria-label="[^"]*"/, "$1"), ["P04"]);
pageCase("ख़ाली पंक्ति: बटन दबाकर सुनो", h => h.replace("<h2>1. यह पन्ना कैसे पढ़ें</h2>", "<h2>1. यह पन्ना कैसे पढ़ें</h2><p>बटन दबाकर सुनो</p>"), ["P05"]);
pageCase("अंग्रेज़ी अक्षर-नाम एच", h => h.replace("<h2>1. यह पन्ना कैसे पढ़ें</h2>", "<h2>1. यह पन्ना कैसे पढ़ें</h2><p>नाम: एच</p>"), ["P06"]);
pageCase("उदाहरण में UPI", h => h.replace(/(<span class="notranslate ld-wl"[^>]*>)[^<]*/, "$1UPI"), ["P07", "P11"]);
pageCase("लक्ष्य-भाषा का शब्द बिना निशान के", h => h.replace("<h2>1. यह पन्ना कैसे पढ़ें</h2>", "<h2>1. यह पन्ना कैसे पढ़ें</h2><p>जैसे travay</p>"), ["P09"]);
pageCase("लंबी डैश", h => h.replace("हिंदी की तरह।", "हिंदी की तरह — बस।"), ["P08"]);
{ const jb = M0.cards.find(c => c.bahu && h0has(c.likha)) || M0.cards.find(c => c.bahu); const jl = Array.from(jb.likha);
pageCase("जोड़ा-अक्षर तोड़कर दिखाया (" + jl.join(" · ") + ")", h => h.replace('<b class="ld-hl">' + jb.likha + "</b>", jl[0] + '<i aria-hidden="true">·</i>' + jl.slice(1).join("")), ["P11"]); }
pageCase("अंक पर हिंदी नाम का उच्चारण", h => { const i = h.indexOf('id="ld-ank"'); return h.slice(0, i) + h.slice(i).replace('data-pron="' + M0.ank[2].dev + '"', 'data-pron="दो"').replace('data-pron="' + M0.ank[2].dev + '"', 'data-pron="दो"'); }, ["P12"]);
pageCase("लिखाई की आकृति ग़ायब", h => h.replace(/<path id="ldg-61"[^>]*\/>/, ""), ["P13"]);
pageCase("मूल-वक्ता जाँच का हाल एक कार्ड से हटा", h => h.replace(/<li>मूल-वक्ता की जाँच: [^<]*<\/li>/, ""), ["P15"]);
pageCase("ग़लती बताने की कड़ी में कार्ड-कोड नहीं", h => h.replace(new RegExp('(class="ld-galat-a" href="[^"]*?)' + c1.kod), "$1dkxx"), ["P16"]);
pageCase("बोलो-डिब्बे की जगहें हटीं", h => h.split('<div class="ld-host" data-bolo-host="1"></div>').join(""), ["P20"]);
pageCase("एक समूह का कार्ड-डिब्बा हटा (चौड़ी स्क्रीन पर 2 प्रति पंक्ति टूटेगा)", h => h.replace('<div class="ld-grp">', "<div>"), ["P20"]);
pageCase("टूटी भीतरी कड़ी", h => h.replace('href="/join.html"', 'href="/joinx.html"'), ["P21"]);
pageCase("सूची से एक कार्ड छूटा", h => h.replace(/<a class="ld-chip ld-sona" href="#dk-01"[\s\S]*?<\/a>/, ""), ["P22"]);
pageCase("अधूरा निशान {ou}", h => h.replace("हिंदी की तरह।", "हिंदी की तरह {ou}।"), ["P24"]);
pageCase("कार्ड का रंग समूह से अलग", h => h.replace('<section class="ld-card ld-sona" id="dk-01"', '<section class="ld-card ld-neela" id="dk-01"'), ["P25"]);
pageCase("data-t गुण (साझा अनुवाद-फ़ाइल बटन का पाठ बदल देगी)", h => h.replace('data-w="', 'data-t="'), ["P27"]);
if (base.sach) pageCase("आवाज़ की सच्ची पंक्ति हटी", h => h.replace(LD.esc(base.sach[0]), ""), ["P15"]);
if (base.rangBaat) pageCase("रंग का मतलब हटा", h => h.replace(LD.esc(base.rangBaat), ""), ["P25"]);

console.log("— पूरी फ़ाइल में ग़लती —");
const fileCase = (name, fn, ids) => { const s = fn(page); if (s === page) { fail++; console.log("  ❌ परीक्षा ख़ुद नहीं लगी: " + name); return; } expect(name, CHK.checkFile(L, base, M0, s), ids); };
fileCase("विवरण में दिन अलग (पन्ने पर " + M0.nDin + ")", s => s.split(M0.nDin + " दिन की योजना। मुफ़्त।").join("15 दिन की योजना। मुफ़्त।"), ["F03"]);
fileCase("पुरानी आवाज़-फ़ाइल जुड़ी", s => s.replace('<script src="/assets/lipi-dhvani.js" defer>', '<script src="/assets/lipi.js" defer></script><script src="/assets/lipi-dhvani.js" defer>'), ["F04"]);
fileCase("यंत्र का निशान नहीं", s => s.replace(/<!-- ⚠️ generator से बना[^>]*-->/, ""), ["F01"]);

console.log((fail ? "⛔ " + fail + " ग़लती बिना पकड़े निकली" : "🏁 dev_lipi_dhvani_selftest v1.1 (" + code + "): डाली गई हर ग़लती पकड़ी गई") + " · ✅ " + pass + " / " + (pass + fail));
process.exit(fail ? 1 : 0);
