/* ============================================================
   generator/lib_sector.js v1.2 (26-Nov-2026) : सेक्टर-नियम का एक ही घर (पढ़ना + जाँचना + दरवाज़ा)
   नियम: generator/data/sector_muhar.js के ऊपर लिखा है (Founder, 26-Nov-2026)।
   v1.1 में नया:
     25वाँ सेक्टर «उपरोक्त में कोई नहीं» (कूट 25, ख़ाली कार्ड) और हर सूची के नीचे का कार्ड (कोड 0)।
     कोई क़र्ज़-सूची नहीं: हर कोर्स और हर नेटवर्क-सेक्टर का सेक्टर लिखा है; जो «उपरोक्त में कोई नहीं» पर
       रुका है उसका नाम मुहर की प्रतीक्षा-सूची में है (data से हूबहू मिलान)।
     कार्ड की पहचान अटल (SN-02): खाते में serial के साथ पन्ना, नाम और सेक्टर तीनों दर्ज।
     कार्ड का पन्ना सचमुच मौजूद (SN-01): फ़ाइल और sitemap, दोनों में।
     कोर्स का कोड पक्का: generator/data/course_code_ledger.json (कोर्स → "सेक्टर-कार्ड")।
   v1.2 में नया (Founder: "पूरा पोर्टल एक ही भाषा बोले; नया कोर्स आए तो पोर्टल अपने-आप अपडेट हो"):
     निकली सूची: कार्ड → उसके चालू कोर्स, कोर्स का पता → कोड। assets/suchi_index.js इसी से बनती है और
       दरवाज़ा जाँचता है कि वह ताज़ा है। सब निकली चीज़ें एक आदेश से बनती हैं: node generator/portal_sync.js
     जहाँ-जहाँ कार्ड की सूची दोहराई जाती है (नेटवर्क का निवेदन-फ़ॉर्म, अभिरुचि के भाषा-पैक), वहाँ हर कार्ड मौजूद।
   कौन इसे चलाता है:
     generator/dev_sector_niyam_check.js  (जाँच-यंत्र; हर खेप में)
     generator/dev_seo_check.js           (जाँच-15; GitHub का द्वार भी इसे चलाता है)
     generator/sector_darj.js             (कार्ड और कोड बदलने का एकमात्र औज़ार)
     tools/acs-site-deploy.js             (zip का चढ़ाने वाला औज़ार: चढ़ाने से ठीक पहले `--door`)
   data के घर (एक चीज़ = एक जगह):
     सेक्टर के नाम   assets/mg_names.js            (मुहर: generator/data/sector_muhar.js)
     उद्यम-कार्ड     assets/udyam_data.js          (खाता: generator/data/udyam_serial_ledger.json)
     कोर्स          assets/courses_data.js        (mg = सेक्टर, udyam = कार्ड का कोड; खाता: course_code_ledger.json)
     नेटवर्क-सेक्टर   generator/data/network/taxonomy.js  (हर सेक्टर में: mg, udyam)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const DEF_ROOT = path.join(__dirname, "..");
const GROUPS = ["SELF_EMP_COURSES", "PRIVATE_JOB_COURSES", "ACADEMIC_COURSES", "GOVT_SCHOLAR_COURSES", "GOVT_JOB_COURSES"];
const F_LEDGER = "generator/data/udyam_serial_ledger.json";
const F_CLEDGER = "generator/data/course_code_ledger.json";

/* यंत्र में लिखे अटल मान: मुहर और mg_names.js इन्हीं से मिलने चाहिए */
const NONE_MG = 25, NONE_CARD = 0, NONE_NAME = "उपरोक्त में कोई नहीं";
const HARD_LIMIT = { courses: 3, network: 2 };

function load(ROOT) {
  ROOT = ROOT || DEF_ROOT;
  const rd = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
  const w = {}; new Function("window", rd("assets/mg_names.js"))(w);
  const MG = w.MG_NAMES || {};
  const CARDS = new Function(rd("assets/udyam_data.js") + ";return ALL_SECTORS;")();
  const cs = rd("assets/courses_data.js");
  const G = new Function("window", cs + ";return {" + GROUPS.map((g) => g + ":" + g).join(",") + "};")({});
  const COURSES = []; for (const g of GROUPS) for (const c of G[g]) COURSES.push(Object.assign({ _group: g }, c));
  const seal = (function () { const p = path.join(ROOT, "generator/data/sector_muhar.js"); delete require.cache[require.resolve(p)]; return require(p); })();
  const js = (f) => { const p = path.join(ROOT, f); return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")) : null; };
  const tp = path.join(ROOT, "generator/data/network/taxonomy.js"); delete require.cache[require.resolve(tp)];
  const NET = require(tp).SECTORS;
  return { ROOT, MG, MG_NONE: w.MG_NONE || null, UDYAM_NONE: w.UDYAM_NONE || null, CARDS, COURSES, seal, LEDGER: js(F_LEDGER), CLEDGER: js(F_CLEDGER), NET };
}

const okMg = (v) => Number.isInteger(v) && v >= 1 && v <= 24;            /* 24 असली सेक्टर */
const okMg25 = (v) => Number.isInteger(v) && v >= 1 && v <= NONE_MG;     /* 24 + «उपरोक्त में कोई नहीं» */
const normUrl = (u) => String(u || "").replace(/index\.html$/, "");
/* नाम की तुलना: कोष्ठक की शक्ल ([ ] या ( )) और ख़ाली जगह का फ़र्क़ नाम बदलना नहीं माना जाता */
const normName = (s) => String(s || "").replace(/[\[\(]/g, "(").replace(/[\]\)]/g, ")").replace(/\s+/g, " ").trim();
const codeOf = (mg, udyam) => mg + "-" + udyam;
const sectorName = (D, mg) => (mg === NONE_MG ? NONE_NAME : (D.MG[mg] ? D.MG[mg].n : "?"));

/* ════════ निकली सूची (v1.2, Founder 26-Nov-2026: "पूरा पोर्टल एक ही भाषा बोले; नया कोर्स आए तो पोर्टल अपने-आप अपडेट हो") ════════
   कार्ड → उसके चालू कोर्स, और कोर्स का पता → उसका कोड। यह सूची कहीं हाथ से नहीं लिखी जाती:
   हर बार assets/courses_data.js के कोड (mg, udyam) से निकलती है। इसी से बनते हैं:
     assets/suchi_index.js (कोर्स-घर की पट्टी, अभिरुचि का नतीजा) · उद्यम-पन्ने की कोर्स-कड़ियाँ · कार्ड के परिचय-पन्ने का कोर्स-बटन। */
const MANY = 12;                       /* एक कार्ड पर इससे ज़्यादा कोर्स हों तो नाम नहीं, सूची के पन्ने की कड़ी (मुहर: SUCHI_PANNA) */
const F_INDEX = "assets/suchi_index.js";
const roundBr = (s) => String(s || "").replace(/\[/g, "(").replace(/\]/g, ")");
const splitName = (s) => { const m = /^(.*?)\s*[\[\(]([^\]\)]*)[\]\)]\s*$/.exec(String(s || ""));
  return m ? { hi: m[1].trim(), en: m[2].split(/ — |: /)[0].trim() } : { hi: String(s || "").trim(), en: "" }; };
const shortHi = (s) => roundBr(s).replace(/\s*\([^()]*\)\s*$/, "").trim();      /* नाम के अंत का (English) हिस्सा हटाकर */
const lf = (s) => String(s || "").replace(/\r\n/g, "\n");                           /* Windows की पंक्ति-समाप्ति का फ़र्क़ फ़र्क़ नहीं */

function derive(D) {
  const byN = {}; D.CARDS.forEach((c) => { byN[c.n] = c; });
  const url = {}, own = {}, clash = [];
  for (const c of D.COURSES) {
    if (!c.url || !Number.isInteger(c.udyam) || !Number.isInteger(c.mg)) continue;
    const u = normUrl(c.url), code = codeOf(c.mg, c.udyam);
    if (url[u] === undefined) { url[u] = code; if (c.udyam > 0) (own[c.udyam] = own[c.udyam] || []).push(c); }
    else if (url[u] !== code) clash.push(c.id + " (" + code + ") और उसी पते का दूसरा कोर्स (" + url[u] + "): " + u);
  }
  const LP = D.seal.SUCHI_PANNA || {}, card = {}, many = [];
  Object.keys(own).map(Number).sort((a, b) => a - b).forEach((n) => {
    const c = byN[n]; if (!c) return;
    /* क्रम: कोर्स पर "top" लिखा हो तो बड़ा अंक पहले (कोर्स-सूची के पन्ने जैसा ही नियम); बाक़ी data के क्रम में */
    const nm = splitName(c.name), L = own[n].map((x, i) => ({ x, i })).sort((a, b) => ((b.x.top || 0) - (a.x.top || 0)) || (a.i - b.i)).map((o) => o.x);
    const e = { m: c.mg, h: roundBr(nm.hi), e: nm.en, u: c.intro || "", k: L.length, c: [] };
    if (L.length > MANY) { e.l = LP[n] || ""; if (!e.l) many.push(n); }
    else e.c = L.map((x) => [x.id, shortHi(x.name_hi), x.name_en || "", normUrl(x.url)]);
    card[n] = e;
  });
  return { url, card, own, clash, many, byN };
}
/* कार्ड का मुख्य कोर्स-पता: अपना कोर्स हो तो वह (कई हों तो पहला, बहुत हों तो सूची का पन्ना); न हो तो कार्ड पर लिखी "संबंधित कोर्स" कड़ी */
function mainCourseUrl(X, n) {
  const e = X.card[n]; if (e) return e.l || (e.c[0] ? e.c[0][3] : "");
  const c = X.byN[n]; return (c && c.course) ? c.course : "";
}

const INDEX_RUNTIME = [
  "  S.lagao = function (list) {",
  "    try { for (var i = 0; i < list.length; i++) { var e = S.card[list[i].n]; if (!e) continue;",
  "      var u = e.l || (e.c[0] ? e.c[0][3] : ''); if (u) list[i].course = u; list[i].courses = e.c; list[i].courseCount = e.k; } } catch (x) {}",
  "    return list;",
  "  };",
  "  S.patti = function () {",
  "    try {",
  "      var d = document, p = location.pathname.replace(/index\\.html$/, ''), code = S.url[p];",
  "      if (!code || d.getElementById('acsSuchiPatti')) return;",
  "      var a = code.split('-'), M = S.mg[a[0]], n = +a[1], c = n ? S.card[n] : null, main = d.querySelector('main');",
  "      if (!M || !main) return;",
  "      var en = String(d.documentElement.lang || 'hi').toLowerCase().indexOf('hi') !== 0, T = en ? S.t.en : S.t.hi;",
  "      var esc = function (s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\"/g, '&quot;'); };",
  "      var lk = 'color:#1565C0;font-weight:700;text-decoration:underline';",
  "      var h = '<b>' + T.h + '</b><br>' + T.s + ': ' + M[0] + ' ' + esc(en ? M[2] : M[1]) + '<br>' + T.u + ': ';",
  "      if (c) h += (c.u ? '<a href=\"' + c.u + '\" style=\"' + lk + '\">' + esc(en && c.e ? c.e : c.h) + '</a>' : esc(en && c.e ? c.e : c.h)) +",
  "        ' <span style=\"white-space:nowrap\">(U' + ('000' + n).slice(-4) + ')</span>';",
  "      else h += esc(T.w);",
  "      var box = d.createElement('div'); box.id = 'acsSuchiPatti';",
  "      box.setAttribute('style', 'margin:10px 12px;padding:10px 14px;background:#F5F7FA;border-left:5px solid #1565C0;border-radius:8px;color:#0B1F3A;font-size:17px;line-height:1.7;text-align:left');",
  "      box.innerHTML = h; main.insertBefore(box, main.firstChild);",
  "    } catch (x) {}",
  "  };"
];
function indexText(D) {
  const X = derive(D), q = (v) => JSON.stringify(v);
  const mg = []; for (let i = 1; i <= 24; i++) if (D.MG[i]) mg.push("    " + q(String(i)) + ": " + q([D.MG[i].e, D.MG[i].n, D.MG[i].en]));
  if (D.MG_NONE) mg.push("    " + q(String(NONE_MG)) + ": " + q([D.MG_NONE.e, D.MG_NONE.n, D.MG_NONE.en]));
  const cards = Object.keys(X.card).map(Number).sort((a, b) => a - b).map((n) => "    " + q(String(n)) + ": " + q(X.card[n]));
  const urls = Object.keys(X.url).sort().map((u) => "    " + q(u) + ": " + q(X.url[u]));
  return [
    "/* /assets/suchi_index.js : निकली सूची (कार्ड → उसके चालू कोर्स; कोर्स का पता → उसका «सेक्टर-कार्ड» कोड)",
    "   generator/build_suchi_index.js से बनी; हाथ से न बदलें। स्रोत: assets/courses_data.js के कोड (mg, udyam),",
    "   assets/udyam_data.js के कार्ड, assets/mg_names.js के नाम। कोर्स का कोड बदलना हो: node generator/sector_darj.js course …",
    "   उपयोग: कोर्स-घर की «सेक्टर और उद्यम» पट्टी (acs-universal.js), अभिरुचि-परीक्षा का नतीजा (apt-session.js)। */",
    "(function (w) {",
    "  var S = {",
    "  t: { hi: { h: " + q("यह कोर्स किस काम-धंधे का है") + ", s: " + q("सेक्टर") + ", u: " + q("उद्यम") + ", w: " + q("इसका कार्ड उद्यम-सूची में अभी जुड़ना बाक़ी है") + " },",
    "       en: { h: " + q("Which trade is this course for") + ", s: " + q("Sector") + ", u: " + q("Enterprise") + ", w: " + q("its card is not in the enterprise list yet") + " } },",
    "  mg: {", mg.join(",\n"), "  },",
    "  card: {", cards.join(",\n"), "  },",
    "  url: {", urls.join(",\n"), "  }",
    "  };"
  ].concat(INDEX_RUNTIME, ["  w.ACS_SUCHI = S;", "})(window);", ""]).join("\n");
}

/* पूरी जाँच। लौटाता है: { checks: [{name, ok, extra}], stats, fail } */
function audit(ROOT) {
  const D = load(ROOT), S = D.seal, out = [];
  const ck = (name, ok, extra) => out.push({ name, ok: !!ok, extra: ok ? "" : String(extra || "").slice(0, 700) });
  const byN = {}; D.CARDS.forEach((c) => { byN[c.n] = c; });
  const P = S.PRATIKSHA || { courses: [], network: [] }, LIM = S.LIMIT || {};

  /* ---- क) 24 सेक्टर अटल + 25वाँ «उपरोक्त में कोई नहीं» ---- */
  const mgKeys = Object.keys(D.MG).map(Number).sort((a, b) => a - b);
  ck("24 सेक्टर: assets/mg_names.js में कूट ठीक 1 से 24 (न कम, न ज़्यादा)", mgKeys.length === 24 && mgKeys.every((k, i) => k === i + 1), "मिले: " + mgKeys.join(","));
  ck("24 सेक्टर: मुहर की सूची भी ठीक 24, कूट 1 से 24", Array.isArray(S.SECTORS) && S.SECTORS.length === 24 && S.SECTORS.every((r, i) => r[0] === i + 1));
  const diffNames = (S.SECTORS || []).filter((r) => !D.MG[r[0]] || D.MG[r[0]].n !== r[1]).map((r) => r[0] + ":" + r[1] + "≠" + (D.MG[r[0]] ? D.MG[r[0]].n : "नहीं"));
  ck("24 सेक्टर: हर नाम मुहर से हूबहू (नाम बदलना = Founder का आदेश)", diffNames.length === 0, diffNames.join(" · "));
  const n25 = D.MG_NONE, n0 = D.UDYAM_NONE, s25 = S.NONE_SECTOR || [], s0 = S.NONE_CARD || [];
  ck("25वाँ सेक्टर एक ही: कूट 25, नाम «" + NONE_NAME + "» (mg_names.js और मुहर दोनों में वही)",
    !!n25 && n25.id === NONE_MG && n25.n === NONE_NAME && s25[0] === NONE_MG && s25[1] === NONE_NAME,
    "mg_names: " + JSON.stringify(n25) + " · मुहर: " + JSON.stringify(s25));
  ck("हर सूची के नीचे का कार्ड «" + NONE_NAME + "»: कोड 0 (mg_names.js और मुहर दोनों में वही)",
    !!n0 && n0.n === NONE_CARD && n0.name === NONE_NAME && s0[0] === NONE_CARD && s0[1] === NONE_NAME,
    "mg_names: " + JSON.stringify(n0) + " · मुहर: " + JSON.stringify(s0));
  const enOk = (v) => typeof v === "string" && /^[A-Za-z][A-Za-z &\-]{1,40}$/.test(v);
  const noEn = mgKeys.filter((k) => !enOk(D.MG[k].en)).map(String).concat(n25 && enOk(n25.en) ? [] : ["25"], n0 && enOk(n0.en) ? [] : ["0"]);
  ck("हर सेक्टर और «" + NONE_NAME + "» का English नाम भी लिखा है (पुल-भाषा: आगे की हर भाषा इसी से बनेगी)", noEn.length === 0, "English नाम नहीं: " + noEn.join(", "));

  /* ---- ख) उद्यम-कार्ड, serial और पहचान ---- */
  const ns = D.CARDS.map((c) => c.n);
  ck("उद्यम-कार्ड: serial 1 से " + ns.length + " तक लगातार, कोई दोहराव या छूट नहीं", ns.every((n, i) => n === i + 1), "पहली गड़बड़ी: " + ns.find((n, i) => n !== i + 1));
  const badCard = D.CARDS.filter((c) => !okMg(c.mg) || !c.name || !/^\/udyam\/[a-z0-9\-]+\.html$/.test(c.intro || ""));
  ck("उद्यम-कार्ड: हर कार्ड 24 में से एक सेक्टर में, नाम और अपने पन्ने के साथ (25वें सेक्टर में कोई कार्ड नहीं: वह ख़ाली कार्ड है)", badCard.length === 0, badCard.slice(0, 5).map((c) => "n" + c.n + " mg" + c.mg).join(", "));
  const perMg = {}; D.CARDS.forEach((c) => { perMg[c.mg] = (perMg[c.mg] || 0) + 1; });
  ck("उद्यम-कार्ड: 24 में से हर सेक्टर में कम से कम एक कार्ड", (S.SECTORS || []).every((r) => perMg[r[0]] > 0));
  const LG = D.LEDGER, lgOk = !!LG && Object.keys(LG).length > 0 && Object.keys(LG).every((k) => LG[k] && typeof LG[k] === "object" && typeof LG[k].u === "string" && typeof LG[k].n === "string" && Number.isInteger(LG[k].mg));
  ck("कार्ड का खाता मौजूद और पूरा (" + F_LEDGER + "): हर serial के साथ पन्ना, नाम और सेक्टर", lgOk, LG ? "खाता पुराने रूप में है या अधूरा है" : "फ़ाइल नहीं");
  if (lgOk) {
    const lk = Object.keys(LG).map(Number).sort((a, b) => a - b);
    const moved = lk.filter((n) => !byN[n] || byN[n].intro !== LG[n].u);
    ck("serial अटल: खाते का हर पुराना serial आज भी उसी उद्यम-पन्ने पर (कोई कार्ड हटा या नंबर बदला नहीं)", moved.length === 0, moved.slice(0, 6).map((n) => "n" + n + " खाता " + LG[n].u + " · आज " + (byN[n] ? byN[n].intro : "नहीं")).join(" | "));
    const idn = lk.filter((n) => byN[n] && (normName(byN[n].name) !== normName(LG[n].n) || byN[n].mg !== LG[n].mg));
    ck("कार्ड की पहचान अटल: हर serial का नाम और सेक्टर वही जो खाते में (नाम बदलना सिर्फ़ औज़ार से: sector_darj.js naam)", idn.length === 0,
      idn.slice(0, 5).map((n) => "n" + n + " खाता «" + LG[n].n + "» सेक्टर " + LG[n].mg + " · आज «" + byN[n].name + "» सेक्टर " + byN[n].mg).join(" | "));
    const notIn = D.CARDS.filter((c) => LG[c.n] === undefined);
    ck("हर कार्ड खाते में दर्ज (नया कार्ड सिर्फ़ sector_darj.js से, जो खाता भी लिखता है)", notIn.length === 0 && lk.length === D.CARDS.length, "खाते से बाहर: " + notIn.slice(0, 6).map((c) => "n" + c.n).join(", ") + " · खाता " + lk.length + ", कार्ड " + D.CARDS.length);
  }
  const smp = path.join(D.ROOT, "sitemap-udyam.xml"), sm = fs.existsSync(smp) ? fs.readFileSync(smp, "utf8") : "";
  const noPage = [], noMap = [];
  for (const c of D.CARDS) { if (!/^\/udyam\/[a-z0-9\-]+\.html$/.test(c.intro || "")) continue;
    const fp = path.join(D.ROOT, c.intro); let ok = false; try { ok = fs.statSync(fp).size >= 500; } catch (e) { ok = false; }
    if (!ok) noPage.push("n" + c.n + " " + c.intro); else if (sm.indexOf("https://acslearn.com" + c.intro + "<") === -1) noMap.push("n" + c.n + " " + c.intro); }
  ck("कार्ड का पन्ना सचमुच बना है: हर कार्ड की फ़ाइल मौजूद, और sitemap-udyam.xml में उसका पता", noPage.length === 0 && noMap.length === 0,
    (noPage.length ? "पन्ना नहीं: " + noPage.slice(0, 4).join(", ") + " · " : "") + (noMap.length ? "sitemap में नहीं: " + noMap.slice(0, 4).join(", ") : "") + " · इलाज: परिचय-पन्ना बनाएँ, फिर node generator/build_sitemap.js");

  /* ---- ग) कोर्स ---- */
  const ids = D.COURSES.map((c) => c.id), idSet = new Set(ids);
  ck("कोर्स: हर कोर्स का कोड अलग (" + ids.length + ")", idSet.size === ids.length);
  const noMg = D.COURSES.filter((c) => !okMg25(c.mg)).map((c) => c.id);
  ck("कोर्स: हर कोर्स का सेक्टर लिखा है (mg: 1 से 24, या 25 «" + NONE_NAME + "»)। बिना सेक्टर: 0", noMg.length === 0, "बिना सेक्टर: " + noMg.slice(0, 8).join(", ") + (noMg.length > 8 ? " … कुल " + noMg.length : ""));
  const live = D.COURSES.filter((c) => c.url);
  const cardBad = [], cardNone = [], waitC = [];
  for (const c of D.COURSES) {
    if (c.udyam === undefined) { if (c.url) cardNone.push(c.id); if (c.mg === NONE_MG) cardBad.push(c.id + ": सेक्टर 25 में है तो कार्ड-कोड 0 लिखना ज़रूरी"); continue; }
    if (!Number.isInteger(c.udyam) || c.udyam < 0) { cardBad.push(c.id + ": कार्ड-कोड " + c.udyam + " ग़लत"); continue; }
    if (c.udyam === NONE_CARD) { waitC.push(c.id); continue; }
    const k = byN[c.udyam];
    if (!k) cardBad.push(c.id + ": कार्ड " + c.udyam + " है ही नहीं");
    else if (c.mg === NONE_MG) cardBad.push(c.id + ": सेक्टर 25 ख़ाली कार्ड है; वहाँ सिर्फ़ कोड 0 चलता है");
    else if (k.mg !== c.mg) cardBad.push(c.id + ": कोर्स सेक्टर " + c.mg + ", कार्ड " + c.udyam + " सेक्टर " + k.mg);
  }
  ck("कोर्स: जहाँ भी कार्ड-कोड लिखा है, वह 0 है या उसी सेक्टर का मौजूद कार्ड (सेक्टर 25 में सिर्फ़ 0)", cardBad.length === 0, cardBad.slice(0, 6).join(" | "));
  ck("कोर्स: हर चालू कोर्स (" + live.length + ") पर उद्यम-कार्ड का कोड। बिना कोड: 0", cardNone.length === 0,
    "बिना कार्ड-कोड: " + cardNone.slice(0, 8).join(", ") + " · इलाज: node generator/sector_darj.js course --id <कोड> --udyam <serial>");
  const pc = P.courses || [], extraC = waitC.filter((id) => pc.indexOf(id) === -1), staleC = pc.filter((id) => waitC.indexOf(id) === -1);
  ck("कोर्स: «" + NONE_NAME + "» (कोड 0) पर वही कोर्स रुके हैं जिनके नाम मुहर की प्रतीक्षा-सूची में हैं (" + pc.length + ")", extraC.length === 0 && staleC.length === 0,
    (extraC.length ? "सूची से बाहर कोड 0 पर: " + extraC.slice(0, 6).join(", ") + " · " : "") + (staleC.length ? "सूची में है पर कोड 0 पर नहीं: " + staleC.slice(0, 6).join(", ") : ""));
  const CL = D.CLEDGER;
  if (!CL) ck("कोर्स के कोड का खाता मौजूद (" + F_CLEDGER + ")", false, "फ़ाइल नहीं");
  else {
    const coded = D.COURSES.filter((c) => c.udyam !== undefined), byId = {}; D.COURSES.forEach((c) => { byId[c.id] = c; });
    const diff = coded.filter((c) => CL[c.id] !== codeOf(c.mg, c.udyam)).map((c) => c.id + ": खाता " + (CL[c.id] === undefined ? "नहीं" : CL[c.id]) + " · आज " + codeOf(c.mg, c.udyam));
    const gone = Object.keys(CL).filter((id) => !byId[id] || byId[id].udyam === undefined);
    ck("कोर्स का कोड पक्का: हर कोर्स का «सेक्टर-कार्ड» कोड वही जो खाते में (" + Object.keys(CL).length + "); कोड बदलना सिर्फ़ औज़ार से", diff.length === 0 && gone.length === 0,
      (diff.length ? diff.slice(0, 5).join(" | ") + " · " : "") + (gone.length ? "खाते में है पर सूची से हटा या कोड मिटा: " + gone.slice(0, 6).join(", ") : "") + " · इलाज: node generator/sector_darj.js course …");
  }

  /* ---- घ) उद्यम-कार्ड की कोर्स-कड़ी ---- */
  const urls = new Set(live.map((c) => normUrl(c.url)));
  const badPtr = D.CARDS.filter((c) => c.course && !urls.has(normUrl(c.course)));
  ck("उद्यम-कार्ड: कार्ड पर लिखी कोर्स-कड़ी किसी दर्ज चालू कोर्स की ही है", badPtr.length === 0, badPtr.slice(0, 5).map((c) => "n" + c.n + " → " + c.course).join(" | "));

  /* ---- ङ) नेटवर्क के सेक्टर ---- */
  const nk = Object.keys(D.NET);
  const netMgBad = nk.filter((k) => !okMg25(D.NET[k].mg));
  ck("नेटवर्क: हर सेक्टर (" + nk.length + ") का सेक्टर लिखा है (1 से 24, या 25)", netMgBad.length === 0, netMgBad.join(", "));
  const netBad = [], waitN = [];
  for (const k of nk) { const s = D.NET[k];
    if (s.udyam === undefined) { netBad.push(k + ": कार्ड-कोड नहीं"); continue; }
    if (s.udyam === NONE_CARD) { waitN.push(k); continue; }
    const c = byN[s.udyam]; if (!c) netBad.push(k + ": कार्ड " + s.udyam + " नहीं"); else if (c.mg !== s.mg) netBad.push(k + ": सेक्टर " + s.mg + ", कार्ड सेक्टर " + c.mg); }
  const pn = P.network || [], extraN = waitN.filter((k) => pn.indexOf(k) === -1), staleN = pn.filter((k) => waitN.indexOf(k) === -1);
  ck("नेटवर्क: हर सेक्टर पर कार्ड-कोड (0 या उसी सेक्टर का कार्ड); कोड 0 पर वही जो प्रतीक्षा-सूची में (" + pn.length + ")", netBad.length === 0 && extraN.length === 0 && staleN.length === 0,
    netBad.concat(extraN.map((k) => k + ": सूची से बाहर कोड 0 पर"), staleN.map((k) => k + ": सूची में है पर कोड 0 पर नहीं")).join(" | "));
  const netCourse = nk.filter((k) => D.NET[k].course && !urls.has(normUrl(D.NET[k].course.url)));
  ck("नेटवर्क: सेक्टर पर लिखा कोर्स किसी दर्ज चालू कोर्स का ही है", netCourse.length === 0, netCourse.join(", "));

  /* ---- च) प्रतीक्षा-सूची की सीमा ---- */
  ck("प्रतीक्षा-सूची सीमा के भीतर (कोर्स ≤ " + HARD_LIMIT.courses + ", नेटवर्क ≤ " + HARD_LIMIT.network + ") और मुहर की सीमा यंत्र की सीमा से बड़ी नहीं",
    pc.length <= HARD_LIMIT.courses && pn.length <= HARD_LIMIT.network && LIM.courses <= HARD_LIMIT.courses && LIM.network <= HARD_LIMIT.network && pc.length <= LIM.courses && pn.length <= LIM.network
    && new Set(pc).size === pc.length && new Set(pn).size === pn.length,
    "कोर्स " + pc.length + "/" + LIM.courses + " · नेटवर्क " + pn.length + "/" + LIM.network);

  /* ---- छ) निकली सूची (v1.2): एक ही भाषा, अपने-आप अपडेट ---- */
  const X = derive(D);
  ck("एक पता, एक कोड: जिन कोर्सों का पन्ना एक ही है, उनका «सेक्टर-कार्ड» कोड भी एक ही है", X.clash.length === 0, X.clash.slice(0, 4).join(" | "));
  const LPn = Object.keys(S.SUCHI_PANNA || {}).map(Number);
  const lpBad = X.many.map((n) => "कार्ड " + n + " पर " + X.card[n].k + " कोर्स, पर सूची का पन्ना मुहर (SUCHI_PANNA) में नहीं")
    .concat(LPn.filter((n) => !byN[n]).map((n) => "SUCHI_PANNA: कार्ड " + n + " सूची में नहीं"))
    .concat(LPn.filter((n) => { const p = String(S.SUCHI_PANNA[n] || ""); return !/^\/[^\s]*$/.test(p) || !fs.existsSync(path.join(D.ROOT, p.replace(/^\//, "").replace(/\/$/, "/index.html"))); }).map((n) => "SUCHI_PANNA: कार्ड " + n + " का पन्ना " + S.SUCHI_PANNA[n] + " नहीं मिला"));
  ck("जिस कार्ड पर " + MANY + " से ज़्यादा कोर्स हैं, उसकी सूची का पन्ना मुहर में लिखा है और सचमुच है", lpBad.length === 0, lpBad.slice(0, 4).join(" | "));
  let idxNow = null; try { idxNow = fs.readFileSync(path.join(D.ROOT, F_INDEX), "utf8"); } catch (e) {}
  ck("निकली सूची ताज़ा है (" + F_INDEX + " आज के कोड से हूबहू)। बासी हो तो: node generator/portal_sync.js", idxNow !== null && lf(idxNow) === lf((function () { try { return indexText(D); } catch (e) { return ""; } })()),
    idxNow === null ? F_INDEX + " missing; run: node generator/portal_sync.js" : F_INDEX + " is stale; run: node generator/portal_sync.js");
  /* नेटवर्क की कोर्स-कड़ी उसी कार्ड के कोर्स की हो */
  const netLink = [];
  for (const k of nk) { const s = D.NET[k], e = s.udyam > 0 ? X.card[s.udyam] : null; if (!e || e.l) continue;
    const us = e.c.map((c) => c[3]);
    if (!s.course) netLink.push(k + ": कार्ड " + s.udyam + " पर कोर्स है, पर नेटवर्क-सेक्टर की कोर्स-कड़ी ख़ाली");
    else if (us.indexOf(normUrl(s.course.url)) === -1) netLink.push(k + ": कोर्स-कड़ी " + s.course.url + " कार्ड " + s.udyam + " के कोर्सों में नहीं"); }
  ck("नेटवर्क: जिस सेक्टर के कार्ड पर कोर्स है, उसकी कोर्स-कड़ी उसी कार्ड के कोर्स की है", netLink.length === 0, netLink.join(" | "));
  /* कार्ड की गिनती जहाँ-जहाँ दूसरी फ़ाइल में दोहराई जाती है, वहाँ पूरी हो */
  const twin = [];
  try { const nv = JSON.parse(fs.readFileSync(path.join(D.ROOT, "assets/network/nivedan_data.json"), "utf8")); const have = new Set((nv.u || []).map((r) => r[0])), missN = D.CARDS.filter((c) => !have.has(c.n)).length, cnt = (nv.u || []).length;
    if (cnt !== D.CARDS.length || missN) twin.push("assets/network/nivedan_data.json: " + cnt + " cards, list has " + D.CARDS.length + "; run portal_sync"); } catch (e) { twin.push("assets/network/nivedan_data.json unreadable"); }
  let aptLangs = []; try { aptLangs = fs.readdirSync(path.join(D.ROOT, "assets")).filter((f) => /^apt_udyam_[a-z]{2,3}\.js$/.test(f)); } catch (e) {}
  for (const f of aptLangs) { try { const w2 = {}; new Function("window", fs.readFileSync(path.join(D.ROOT, "assets", f), "utf8"))(w2);
      const T = (w2.APT_UDN && w2.APT_UDN.n) || {}; const miss = D.CARDS.filter((c) => !T[c.n] && !T[String(c.n)]).map((c) => c.n);
      if (miss.length) twin.push("assets/" + f + ": card name missing for " + miss.slice(0, 5).join(",") + "; add it in generator/data/aptitude/<lang>/udyam.txt and run portal_sync"); } catch (e) { twin.push("assets/" + f + " unreadable"); } }
  ck("कार्ड की सूची जहाँ-जहाँ दोहराई जाती है (नेटवर्क का निवेदन-फ़ॉर्म, अभिरुचि के " + aptLangs.length + " भाषा-पैक), वहाँ हर कार्ड मौजूद", twin.length === 0, twin.join(" | "));

  const stats = { sectors: mgKeys.length, cards: D.CARDS.length, courses: ids.length, live: live.length,
    withCard: D.COURSES.filter((c) => Number.isInteger(c.udyam) && c.udyam > 0).length, waiting: waitC.length,
    notLive: D.COURSES.filter((c) => !c.url && c.udyam === undefined).length, net: nk.length, netWaiting: waitN.length };
  return { checks: out, stats, fail: out.filter((c) => !c.ok).length };
}

module.exports = { derive, indexText, mainCourseUrl, shortHi, splitName, roundBr, lf, MANY, F_INDEX, load, audit, okMg, okMg25, normUrl, normName, codeOf, sectorName, GROUPS, NONE_MG, NONE_CARD, NONE_NAME, HARD_LIMIT, F_LEDGER, F_CLEDGER };

/* दरवाज़ा: चढ़ाने वाला औज़ार (tools/acs-site-deploy.js) इसे सीधे चलाता है:
     node generator/lib_sector.js --door
   नियम टूटा हो तो exit 1 और हर टूटी जाँच "FAIL " से शुरू होती पंक्ति में (औज़ार की खिड़की English/ASCII पढ़ती है,
   इसलिए यहाँ सिर्फ़ जाँच का क्रमांक और कूट जाते हैं; पूरा हिंदी ब्योरा: node generator/dev_sector_niyam_check.js)। */
if (require.main === module) {
  let r; try { r = audit(); } catch (e) { console.log("FAIL the sector check could not run: " + String(e.message).replace(/[^\x20-\x7E]/g, "?")); process.exit(1); }
  r.checks.forEach((c, i) => { if (!c.ok) console.log("FAIL check " + (i + 1) + " of " + r.checks.length + ": " + (c.extra.replace(/[^\x20-\x7E]+/g, " ").replace(/\s+/g, " ").trim() || "see dev_sector_niyam_check")); });
  if (r.fail) process.exit(1);
  console.log("DOOR OK " + r.checks.length + " checks; 24 sectors + none of the above, " + r.stats.cards + " enterprise cards, " + r.stats.courses + " courses, " + r.stats.live + " live, " + r.stats.withCard + " with card code, " + r.stats.waiting + " waiting at none");
}
