/* generator/dev_kkb_quiz_check.js — v1.0 (31-Aug-2026)
   KKB भाषा-परीक्षा बैंकों (ar/fr/es/ja/ko/de/ru) का स्थायी check-robot।
   चलाना: node generator/dev_kkb_quiz_check.js <code>   (repo-रूट से; functions/<code>_bank.js local हो)
   जाँचें: (1) बैंक ≥2,900 प्रश्न · हर प्रश्न {id,t,o(4),a(0-3)} · id "<code>-NNNN" व अनूठा
   (2) विकल्प-दोहराव शून्य · सही-उत्तर विकल्पों में · [ ] square-bracket शून्य
   (3) लंबाई-पक्षपात: अकेला-सबसे-लंबा=सही 15-35% (v5.2 होल)
   (4) ((AU:...)) निशान सिर्फ़ सुनो-प्रश्नों में — और हर AU-पाठ corpus के असली वाक्य का spoken-रूप
   (5) भाषा-नियम: ja के AU-पाठ में अंत-कोष्ठक (romaji) नहीं; ru v2.0: प्रश्न/विकल्प में सिरिलिक अनिवार्य (au-छूट)
   (6) client-द्वार: dashboard.js की SERVER_EXAM_COURSES में कोर्स-id + exam_data.js में प्रविष्टि (q ख़ाली)
   v2.0 (01-Sep): (6) बोलो-प्रश्न T15-17 — o ख़ाली, a=-1, sp corpus-हूबहू, ((MIC)); ≥250 प्रति बैंक (40/40/40 नियम)।
   fail = कोई भी upload/deploy नहीं। */
"use strict";
var fs = require("fs");
var CODE = (process.argv[2] || "").toLowerCase();
var PID = { uz: "PJ091", ug: "PJ096", tt: "PJ110", tg: "PJ094", sv: "PJ135", si: "PJ061", ro: "PJ129", qu: "PJ099", ps: "PJ062", prs: "PJ064", pcm: "PJ120", nl: "PJ130", myn: "PJ101", mt: "PJ140", mfe: "PJ122", ky: "PJ095", ku: "PJ090", kk: "PJ092", hy: "PJ145", hu: "PJ132", ht: "PJ097", gn: "PJ098", el: "PJ131", cs: "PJ133", brx: "PJ058", bg: "PJ136", be: "PJ134", bal: "PJ063", az: "PJ093", ay: "PJ100", arz: "PJ115", ary: "PJ118", arq: "PJ117", apd: "PJ116", apc: "PJ111", aec: "PJ119", acw: "PJ113", acm: "PJ112", ar: "PJ022", fr: "PJ086", es: "PJ021", ja: "PJ026", ko: "PJ031", de: "PJ125", ru: "PJ052", he: "PJ137", en: "PJ018",
  pt: "PJ024", kn: "PJ019", ta: "PJ029", te: "PJ028", bn: "PJ023", or: "PJ057", as: "PJ041", pa: "PJ039", gu: "PJ033", ml: "PJ056", ur: "PJ055", fa: "PJ035", sd: "PJ049", ks: "PJ046", mr: "PJ027", ne: "PJ047", sw: "PJ032", bho: "PJ038", zh: "PJ020", id: "PJ025", tr: "PJ030", mai: "PJ042", it: "PJ126", ms: "PJ070", vi: "PJ065", th: "PJ066", sa: "PJ147", pl: "PJ127", uk: "PJ128", hr: "PJ138", sr: "PJ139", lt: "PJ141", sk: "PJ143", fi: "PJ142", ka: "PJ144", awa: "PJ059", bgc: "PJ043", bhb: "PJ104", bjj: "PJ103", doi: "PJ050", gbm: "PJ053", kfy: "PJ054", hne: "PJ040", mag: "PJ060", gom: "PJ048", mwr: "PJ044", mni: "PJ051", skr: "PJ108", pnb: "PJ107", syl: "PJ109", tcy: "PJ105", gon: "PJ106", sat: "PJ045", anp: "PJ102", sjp: "PJ148", khr: "PJ149", sck: "PJ150", kyw: "PJ151", bns: "PJ152", bfy: "PJ153", bra: "PJ154", mal: "PJ155", nim: "PJ156", mtr: "PJ157", dhu: "PJ158", hdt: "PJ159", bgr: "PJ160", mtw: "PJ161", bsn: "PJ162", lri: "PJ163", pwr: "PJ164", gjr: "PJ165", lmn: "PJ166", kgr: "PJ167", mjl: "PJ168", cdh: "PJ169", gbk: "PJ170", cdj: "PJ171", bhd: "PJ172", hii: "PJ173", jns: "PJ174", srx: "PJ175", him: "PJ176", gwr: "PJ177", kru: "PJ178", uki: "PJ179", kff: "PJ180", kxv: "PJ181", kfa: "PJ182", kfj: "PJ183", kmj: "PJ184", kfb: "PJ185", nit: "PJ186", pci: "PJ187", gdb: "PJ188", peg: "PJ189", mha: "PJ190", grt: "PJ191", trp: "PJ192", kha: "PJ193", unr: "PJ194", hoc: "PJ195", biy: "PJ196", kfp: "PJ197", pbv: "PJ198", dis: "PJ199", lus: "PJ200", njo: "PJ201", njh: "PJ202", dzo: "PJ203", brh: "PJ204", dv: "PJ205", new: "PJ206", ccp: "PJ207", zum: "PJ208", afb: "PJ209", wuu: "PJ210", zha: "PJ211", hak: "PJ212", gan: "PJ213", cv: "PJ214",  ba: "PJ215",  sah: "PJ216",  bua: "PJ217",  udm: "PJ218",  mhr: "PJ219",  myv: "PJ220",  koi: "PJ221",  inh: "PJ222",  ava: "PJ223",  os: "PJ224",  tyv: "PJ225",  kjh: "PJ226",  xal: "PJ227",  yrk: "PJ228",  jje: "PJ229", ryu: "PJ230", ryn: "PJ231", mvi: "PJ232", rys: "PJ233", yoi: "PJ234", ain: "PJ235", ilo: "PJ236", hil: "PJ237", war: "PJ238", bcl: "PJ239", pam: "PJ240", pag: "PJ241", mrw: "PJ242", mdh: "PJ243", tsg: "PJ244", krj: "PJ245", ban: "PJ246", min: "PJ247", mad: "PJ248", ace: "PJ249", bbc: "PJ250", bug: "PJ251", bjn: "PJ252", mak: "PJ253", btx: "PJ254", iba: "PJ255", dtp: "PJ256", nod: "PJ257", njm: "PJ258", nkh: "PJ259", nbe: "PJ260", nbc: "PJ261", nsm: "PJ262", ksw: "PJ263", che: "PJ264", dar: "PJ265", lez: "PJ266", kbd: "PJ267", tuk: "PJ268", tet: "PJ269", tcz: "PJ270", pck: "PJ271", njz: "PJ272", apt: "PJ273", mtq: "PJ274", swb: "PJ275", crs: "PJ276", rcf: "PJ277", oon: "PJ278", tpi: "PJ279", fij: "PJ280", bis: "PJ281", pis: "PJ282", mri: "PJ283", smo: "PJ284", ton: "PJ285", hmo: "PJ286", pjt: "PJ287", dan: "PJ288", nob: "PJ289", isl: "PJ290", slv: "PJ291", est: "PJ292", lav: "PJ293", sqi: "PJ294", mkd: "PJ295", ltz: "PJ296", cat: "PJ297", eus: "PJ298", glg: "PJ299", cym: "PJ300", gle: "PJ301", gla: "PJ302", fao: "PJ303", kal: "PJ304", sme: "PJ305", niv: "PJ306", nav: "PJ307", crk: "PJ308", iku: "PJ309", oji: "PJ310", nah: "PJ311", haw: "PJ312", lkt: "PJ313", chr: "PJ314", guc: "PJ315", rap: "PJ316", srn: "PJ317", acu: "PJ318", gyn: "PJ319", fgc: "PJ320", trn: "PJ321", jiv: "PJ322", kea: "PJ323", pap: "PJ324", acf: "PJ325", cri: "PJ326", bjs: "PJ327", ch: "PJ328", pau: "PJ329", mh: "PJ330", chk: "PJ331", pon: "PJ332", kos: "PJ333", yap: "PJ334", gil: "PJ335", ty: "PJ336", rar: "PJ337", niu: "PJ338", tvl: "PJ339", tkl: "PJ340", dhv: "PJ341", grn: "PJ342", dcf: "PJ343", srm: "PJ344", djk: "PJ345", tdx: "PJ346", bhr: "PJ347", ln: "PJ348", kg: "PJ349", fuv: "PJ350", tn: "PJ351", bem: "PJ352", ts: "PJ353", mos: "PJ354", ee: "PJ355", kri: "PJ356", nd: "PJ357", sqt: "PJ358", gdq: "PJ359", aii: "PJ360", haz: "PJ362", shv: "PJ363", mid: "PJ364", lrc: "PJ365", rmt: "PJ366", ve: "PJ367", ss: "PJ368", luo: "PJ369", din: "PJ370", ki: "PJ371", zgh: "PJ372", tig: "PJ373", na: "PJ374", fud: "PJ375", wls: "PJ376", skg: "PJ377", bzc: "PJ378", ady: "PJ379", af: "PJ087", ha: "PJ036", so: "PJ082", wo: "PJ124", lg: "PJ088", rw: "PJ084", ny: "PJ089", sn: "PJ121", tw: "PJ085", om: "PJ081", bm: "PJ123", mg: "PJ083", am: "PJ080", ti: "PJ146", yo: "PJ076", ig: "PJ077", zu: "PJ078", xh: "PJ079", bo: "PJ075", ceb: "PJ073", jv: "PJ034", km: "PJ068", lo: "PJ069", mn: "PJ074", my: "PJ067", nan: "PJ037", su: "PJ072", tl: "PJ071", yue: "PJ114" }[CODE]; /* 10-Sep merge-दौर: + SE-एशिया 11 (bo/ceb/jv/km/lo/mn/my/nan/su/tl/yue) */ /* 07-Sep: + pl/uk पोलिश/यूक्रेनी */ /* 05-Sep: + sa संस्कृत */ /* 02-Sep: +10; + ur/fa/sd/ks (RTL-परिवार) */
if (!PID) { console.log("⛔ भाषा-code दीजिए: ar|fr|es|ja|ko|de|ru|he|pt|kn|ta|te|bn|or|as|pa|gu|ml"); process.exit(1); }
var fail = 0;
function ok(c, m) { if (!c) { console.log("⛔ " + m); fail++; } }
var BANK = require(process.cwd() + "/functions/" + (CODE === "en" ? "eng" : CODE) + "_bank.js");
ok(Array.isArray(BANK) && BANK.length >= 2900, "बैंक छोटा: " + BANK.length);

/* corpus (AU-पाठ के हूबहू-मिलान हेतु) */
global.window = {};
eval(fs.readFileSync(CODE === "en" ? "assets/kkb_data.js" : "assets/kkb_" + CODE + "_data.js", "utf8").replace("window.KKB_DATA", "global.window.KKB_DATA"));
eval(fs.readFileSync(CODE === "en" ? "assets/kkb2_data.js" : "assets/kkb2_" + CODE + "_data.js", "utf8"));
var SPOK = {};
function clean(t) { return String(t).replace(/^\((सुनो|बोलो)[^)]*\)\s*/, "").replace(/^\([^()\s]{1,8}\)\s*/, "").replace(/\s*\([^()]*[\u0900-\u097F][^()]*\)\s*$/, ""); } /* v2.0: (שמע)/(דבר)-जैसे लिपि-टैग व अंत का (देवनागरी-उच्चारण) भी हटे — listen-भंडारण-रूप */
function spokenT(t) { t = clean(t); if (CODE === "ja" || CODE === "zh" || CODE === "nan") t = t.replace(/\s*\([^()]*\)\s*$/, ""); return t; } /* 04-Sep: zh भी pinyin-कोष्ठक AU-टकराव-मुक्त */
[global.window.KKB_DATA, global.window.KKB2_DATA].forEach(function (D) {
  D.weeks.forEach(function (w) { w.days.forEach(function (d) { d.items.forEach(function (it) { SPOK[spokenT(it[0])] = 1; }); });
    (w.listen || []).forEach(function (p) { SPOK[spokenT(p[0])] = 1; SPOK[spokenT(p[1])] = 1; });   /* v2.0: T17 के सवाल-जवाब listen/dialog से */
    (w.dialog || []).forEach(function (d2) { SPOK[spokenT(d2[1])] = 1; }); });
});

var ids = {}, biased = 0, eligible = 0, au = 0, auBad = 0, sp = 0, CYR = /[\u0400-\u04FF]/;
BANK.forEach(function (Q, i) {
  ok(Q.id && Q.id.indexOf(CODE + "-") === 0, "id-prefix ग़लत: " + Q.id);
  ok(!ids[Q.id], "id-दोहराव: " + Q.id); ids[Q.id] = 1;
  ok(typeof Q.t === "string" && Q.t.length > 8, "प्रश्न-पाठ छोटा #" + i);
  if (Q.sp) { /* v2.0 (01-Sep, Founder-नियम 40/40/40): बोलो-प्रश्न — o ख़ाली, a=-1, sp = corpus का असली वाक्य, ((MIC)) निशान */
    sp++; ok(Array.isArray(Q.o) && Q.o.length === 0 && Q.a === -1, "बोलो-प्रश्न में विकल्प/उत्तर-सूचक #" + i);
    ok(typeof Q.sp === "string" && Q.sp.length > 1 && SPOK[Q.sp], "बोलो-प्रश्न का sp corpus में नहीं #" + i + ": " + Q.sp);
    ok(Q.t.indexOf("((MIC))") > -1, "बोलो-प्रश्न में ((MIC)) निशान नहीं #" + i);
    if (Q.typ === 17) ok(/\(\(AU:/.test(Q.t), "T17 में सुनो-निशान नहीं #" + i);
    return;
  }
  ok(Array.isArray(Q.o) && Q.o.length === 4, "4 विकल्प नहीं #" + i);
  ok(Q.a >= 0 && Q.a <= 3 && typeof Q.o[Q.a] === "string", "उत्तर-सूचक ग़लत #" + i);
  var seen = {};
  Q.o.forEach(function (t) { ok(!seen[t], "विकल्प-दोहराव #" + i); seen[t] = 1; });
  ok(!/[\[\]]/.test(Q.t + Q.o.join("")), "square-bracket #" + i);
  if (CODE === "ru") ok(CYR.test(Q.t + Q.o.join("")) || Q.au, "सिरिलिक-अनुपस्थित #" + i);
  if (CODE === "he") ok(/[\u0590-\u05FF]/.test(Q.t + Q.o.join("")) || Q.au, "हिब्रू-अनुपस्थित #" + i); /* 01-Sep: हिब्रू असली-लिपि अनिवार्य (au-छूट) */ /* v2.0 (31-Aug): सिरिलिक अनिवार्य (au-सुनो-प्रश्न छूट) */
  var m = /\(\(AU:([\s\S]*?)\)\)/.exec(Q.t);
  if (m) {
    au++;
    if (!SPOK[m[1]]) auBad++;
    if (CODE === "ja") ok(!/\([^()]*\)\s*$/.test(m[1]), "ja AU-पाठ में अंत-romaji #" + i);
  }
  var mx = -1, mi = -1, tie = false;
  Q.o.forEach(function (t, ix) { if (t.length > mx) { mx = t.length; mi = ix; tie = false; } else if (t.length === mx) tie = true; });
  if (!tie) { eligible++; if (mi === Q.a) biased++; }
});
ok(au >= 280, "सुनो-प्रश्न कम: " + au);
ok(sp >= 250, "बोलो-प्रश्न कम (40/40/40 नियम हेतु ≥250 चाहिए): " + sp);   /* v2.0 */
ok(auBad === 0, "AU-पाठ corpus से बाहर: " + auBad);
var rate = Math.round(biased * 1000 / eligible) / 10;
ok(rate >= 15 && rate <= 35, "लंबाई-पक्षपात " + rate + "%");

/* client-द्वार */
var dj = fs.readFileSync("assets/dashboard.js", "utf8");
ok(new RegExp(PID + ":\\s*true").test(dj), "dashboard SERVER_EXAM_COURSES में " + PID + " नहीं");
var ed = fs.readFileSync("assets/exam_data.js", "utf8");
ok(ed.indexOf('"' + PID + '"') >= 0, "exam_data में " + PID + " प्रविष्टि नहीं");

if (fail) { console.log("⛔ कुल fail: " + fail); process.exit(1); }
console.log("🏁 dev_kkb_quiz_check (" + CODE + "/" + PID + "): " + BANK.length + " प्रश्न · सुनो " + au + " · बोलो " + sp + " · लंबाई-दर " + rate + "% · द्वार ठीक — सब पास");
