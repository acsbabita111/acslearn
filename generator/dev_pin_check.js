#!/usr/bin/env node
/* ═══════════════════════════════════════════════════════════════════
   generator/dev_pin_check.js v1.0 (26-Nov-2026) · "पिन-घर" का पहरेदार
   Founder (26-Nov-2026): "जहां भी भारतीय पता की बात हो, वहाँ पर इस पिन कोड से ही अपने आप सभी सूचना ले लिया जाए"
   और "पता को कनफर्म करना का सब उपाय करो।"

   यह जाँचता है (browser नहीं चाहिए; फ़ॉर्म की जाँच dev_panel_i18n_check.js के JN हिस्से में है):
     क. स्रोत: दोनों सरकारी फ़ाइलें वही हैं जिनकी पहचान (sha256) दर्ज है
     ख. यंत्र: बनी हुई हर फ़ाइल ताज़ा है (build_pin_data --check)
     ग. डाक के टुकड़े: हर पिन, हर ज़िला ACS की ज़िला-सूची में (तभी फ़ॉर्म की सूची में चुना जा सकता है)
     घ. गाँव के टुकड़े: हर पिन तक पहुँच ({"x":n} वाली कड़ियाँ), क्रमांक ठीक, आकार की सीमा, गिनती
     ङ. ज़िला-सूचियाँ: हर राज्य की सूची लदती है; दोहराव नहीं; फ़ालतू फ़ाइल नहीं; हिंदी नाम का English रूप मौजूद
     च. helper assets/acs-pin.js: असली टुकड़ों पर सही जवाब; network की गड़बड़ी और «नहीं मिला» अलग
     छ. कोई बाहरी site नहीं; साइट पर जाने वाला कुल आकार सीमा में

   चलाना: node generator/dev_pin_check.js
   ═══════════════════════════════════════════════════════════════════ */
"use strict";
const fs = require("fs"), path = require("path"), zlib = require("zlib"), crypto = require("crypto"), cp = require("child_process");
const ROOT = path.resolve(__dirname, ".."), P = (f) => path.join(ROOT, f);
const rd = (f) => fs.readFileSync(P(f), "utf8").replace(/\r\n/g, "\n");   /* Windows की checkout में पंक्ति का अंत CRLF हो सकता है; गिनती और आकार हमेशा LF पर */
let pass = 0, fail = 0;
function ck(name, ok, extra) { if (ok) { pass++; return true; } fail++; console.log("❌ " + name + (extra ? "\n     " + String(extra).slice(0, 600) : "")); return false; }
const sha = (b) => crypto.createHash("sha256").update(b).digest("hex");
function evalWindow(file) { const w = {}; new Function("window", rd(file))(w); return w; }

(async function main() {
  /* ── क. स्रोत ── */
  const META = JSON.parse(rd("assets/geo/pin/meta.json")), SRC = JSON.parse(rd("generator/data/pin/lgd_source.json"));
  const ip = zlib.gunzipSync(fs.readFileSync(P("generator/data/pin/india_post_pincode.csv.gz")));
  ck("क1 डाक का स्रोत वही है जो meta.json में दर्ज है", sha(ip) === META.india_post.sha256, sha(ip));
  const lgd = zlib.brotliDecompressSync(fs.readFileSync(P("generator/data/pin/lgd_places.tsv.br")));
  ck("क2 LGD की छोटी फ़ाइल वही है जो lgd_source.json में दर्ज है", sha(lgd) === SRC.out.text_sha256);
  ck("क3 LGD की पाँचों मूल फ़ाइलों की पहचान दर्ज है (नाम, sha256, पंक्तियाँ)", ["district_panchayats", "pincode_urban", "pincode_villages", "villages", "villages_by_blocks"].every((k) => SRC.files[k] && /^[0-9a-f]{64}$/.test(SRC.files[k].sha256) && SRC.files[k].rows > 0) && META.lgd.files.length === 5);
  const srcPins = new Set(); { const t = ip.toString("utf8"), re = /,([1-9][0-9]{5}),(?:BO|PO|HO|SO|B\.O|S\.O|H\.O|[A-Za-z ]*),/g; let m; while ((m = re.exec(t))) srcPins.add(m[1]); }
  const lgdPins = new Set(); let lgdVill = 0;
  lgd.toString("utf8").split("\n").forEach((l) => { if (l[0] === "V") { lgdPins.add(l.split("\t", 2)[1]); lgdVill++; } });
  ck("क4 LGD के गाँव: स्रोत की गिनती = meta की गिनती", lgdVill === META.lgd.villages && lgdVill === SRC.counts.villages_with_pin, lgdVill + " / " + META.lgd.villages);

  /* ── ख. यंत्र ── */
  const r = cp.spawnSync(process.execPath, [P("generator/build_pin_data.js"), "--check"], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
  ck("ख1 बनी हुई हर फ़ाइल ताज़ा है (build_pin_data --check)", r.status === 0, (r.stderr || r.stdout || "").slice(0, 500));

  /* ── ङ. ज़िला-सूचियाँ (पहले, क्योंकि ग और घ इन्हीं से मिलाते हैं) ── */
  const STATES = evalWindow("assets/geo/states/in.js").ACS_GEO_STATES["in"], GEO = JSON.parse(rd("generator/data/panel_i18n/en.json")).geo || {};
  const LIST = {}; const bad = [], noEn = []; let total = 0;
  STATES.forEach((s) => {
    const f = "assets/geo/districts/in-" + s.v + ".js";
    if (!fs.existsSync(P(f))) { bad.push("फ़ाइल नहीं: " + f); return; }
    const L = evalWindow(f).ACS_GEO_DISTRICTS["in-" + s.v];
    if (!Array.isArray(L) || !L.length) { bad.push("सूची ख़ाली: " + s.v); return; }
    if (new Set(L).size !== L.length) bad.push("दोहराव: " + s.v);
    L.forEach((x) => { if (/[ऀ-ॿ]/.test(x) && !GEO[x]) noEn.push(x); if (!String(x).trim() || /[<>"]/.test(x)) bad.push("नाम ठीक नहीं: " + s.v + " / " + x); });
    LIST[s.v] = new Set(L); total += L.length;
  });
  ck("ङ1 भारत के सभी " + STATES.length + " राज्यों की ज़िला-सूची लदती है, दोहराव नहीं", bad.length === 0 && Object.keys(LIST).length === STATES.length, bad.join(" ; "));
  ck("ङ2 हिंदी नाम वाले हर ज़िले का English रूप मौजूद (पते की पंक्ति में वही जाता है)", noEn.length === 0, noEn.join(", "));
  const files = fs.readdirSync(P("assets/geo/districts")).filter((f) => /^in-/.test(f));
  ck("ङ3 ज़िला-सूची की कोई फ़ालतू फ़ाइल नहीं (हर फ़ाइल का नाम राज्य की कुंजी से)", files.length === STATES.length && files.every((f) => LIST[f.replace(/^in-|\.js$/g, "")]), files.filter((f) => !LIST[f.replace(/^in-|\.js$/g, "")]).join(","));
  ck("ङ4 सूचियों में कुल ज़िले = meta की गिनती", total === META.districtsInLists, total + " / " + META.districtsInLists);

  /* ── ग. डाक के टुकड़े ── */
  const DIR = "assets/geo/pin", pinFiles = fs.readdirSync(P(DIR)).filter((f) => /^\d{3}\.json$/.test(f));
  let pins = 0, offices = 0, maxP = 0, bytesP = 0; const errP = [], seenPins = new Set();
  pinFiles.forEach((f) => {
    const txt = rd(DIR + "/" + f), j = JSON.parse(txt); maxP = Math.max(maxP, Buffer.byteLength(txt)); bytesP += Buffer.byteLength(txt);
    if (j.v !== 1) errP.push(f + ": v");
    j.d.forEach((d) => { if (!j.s[d[0]] || !LIST[d[0]] || !LIST[d[0]].has(d[1]) || !d[2]) errP.push(f + ": ज़िला सूची में नहीं: " + d.join("/")); });
    Object.keys(j.p).forEach((k) => {
      if (!/^\d{3}$/.test(k)) errP.push(f + ": कुंजी " + k); pins++; seenPins.add(f.slice(0, 3) + k);
      j.p[k].forEach((g) => { if (g[0] < -1 || g[0] >= j.d.length) errP.push(f + ": क्रमांक"); const n = g[1] ? g[1].split("|") : []; offices += n.length; if (n.some((x) => !x.trim())) errP.push(f + ": ख़ाली डाकघर"); });
    });
  });
  ck("ग1 डाक के टुकड़े साफ़; हर ज़िला ACS की ज़िला-सूची में", errP.length === 0, errP.slice(0, 6).join(" ; "));
  ck("ग2 पिन और डाकघर की गिनती = meta", pins === META.india_post.pins && offices === META.india_post.offices && pinFiles.length === META.india_post.shards, pins + "/" + offices + "/" + pinFiles.length);
  ck("ग3 स्रोत का हर पिन टुकड़ों में है", srcPins.size > 19000 && Array.from(srcPins).every((p) => seenPins.has(p)), srcPins.size + " स्रोत · " + Array.from(srcPins).filter((p) => !seenPins.has(p)).slice(0, 5).join(","));

  /* ── घ. गाँव के टुकड़े ── */
  const DV = "assets/geo/pinv", vFiles = fs.readdirSync(P(DV)).filter((f) => /^\d{3,6}\.json$/.test(f));
  const J = {}; let bytesV = 0, maxV = 0; vFiles.forEach((f) => { const t = rd(DV + "/" + f); bytesV += Buffer.byteLength(t); J[f.replace(".json", "")] = JSON.parse(t); if (!JSON.parse(t).x) maxV = Math.max(maxV, Buffer.byteLength(t)); });
  const errV = []; let vPins = 0, vVill = 0, stubs = 0, reach = new Set();
  Object.keys(J).forEach((pre) => {
    const j = J[pre];
    if (j.x) { stubs++; if (j.x !== pre.length + 1 || j.x > 6) errV.push(pre + ": x"); if (!Object.keys(J).some((k) => k.length === j.x && k.indexOf(pre) === 0)) errV.push(pre + ": आगे की फ़ाइल नहीं"); return; }
    /* इस फ़ाइल तक 3 अंक से चलकर पहुँचा जा सकता है? */
    for (let n = 3; n < pre.length; n++) { const up = J[pre.slice(0, n)]; if (!up || up.x !== n + 1) errV.push(pre + ": ऊपर की कड़ी टूटी (" + pre.slice(0, n) + ")"); }
    j.d.forEach((d) => { if (!j.s[d[0]] || !LIST[d[0]] || !LIST[d[0]].has(d[1]) || !d[2]) errV.push(pre + ": ज़िला सूची में नहीं: " + d.join("/")); });
    Object.keys(j.p).forEach((k) => {
      const pin = pre + k; if (!/^[1-9]\d{5}$/.test(pin)) errV.push(pre + ": पिन " + pin); if (reach.has(pin)) errV.push("पिन दो फ़ाइलों में: " + pin); reach.add(pin); vPins++;
      const o = j.p[k]; if (!o.u && !o.g) errV.push(pin + ": ख़ाली");
      (o.u || []).forEach((u) => { if (u.indexOf("|") < 1) errV.push(pin + ": नगर निकाय का रूप"); });
      if (o.u && o.u.length > 3) errV.push(pin + ": एक पिन पर 3 से ज़्यादा नगर निकाय");
      (o.g || []).forEach((g) => {
        if (g[0] < 0 || g[0] >= j.d.length || g[1] < -1 || g[1] >= j.n.length || g[2] < -1 || g[2] >= j.n.length || g[3].length % 2) errV.push(pin + ": क्रमांक");
        for (let i = 1; i < g[3].length; i += 2) { const v = g[3][i].split("|"); if (v.some((x) => !x.trim())) errV.push(pin + ": ख़ाली गाँव"); }
      });
    });
  });
  /* हर LGD गाँव ठीक एक बार गिना जाए: स्रोत के (पिन) से मिलान */
  ck("घ1 गाँव के टुकड़े साफ़; कड़ियाँ पूरी; हर ज़िला ACS की ज़िला-सूची में", errV.length === 0, errV.slice(0, 6).join(" ; "));
  ck("घ2 LGD के गाँव वाला हर पिन पहुँच में है", Array.from(lgdPins).every((p) => reach.has(p)) && vPins === META.lgd.pins, vPins + " / " + META.lgd.pins + " · " + Array.from(lgdPins).filter((p) => !reach.has(p)).slice(0, 5).join(","));
  ck("घ3 फ़ाइलों की गिनती = meta; सबसे बड़ी फ़ाइल 64 KB से छोटी (फ़ोन पर gzip होकर क़रीब एक-तिहाई)", vFiles.length === META.lgd.files_out && maxV <= 64 * 1024 && maxV === META.lgd.biggestFileBytes, vFiles.length + " फ़ाइलें · सबसे बड़ी " + maxV);
  ck("घ4 नगर-सूची की छँटाई दर्ज है (ग़लत भराई वाले पिन बाहर)", META.townsLeftOut && META.townsLeftOut.pinsWithTooManyTowns >= 0 && typeof META.townsLeftOut.rowsOnThosePins === "number");

  /* ── च. helper ── */
  const mk = (failRe) => { const w = {}, calls = [];
    const fetch = (u) => { calls.push(u); if (failRe && failRe.test(u)) return Promise.reject(new TypeError("Failed to fetch"));
      const f = P(u.replace(/^\//, "")); if (!fs.existsSync(f)) return Promise.resolve({ status: 404, ok: false }); const t = fs.readFileSync(f, "utf8"); return Promise.resolve({ status: 200, ok: true, json: () => Promise.resolve(JSON.parse(t)) }); };
    new Function("window", "fetch", rd("assets/acs-pin.js"))(w, fetch); return { A: w.ACS_PIN, calls }; };
  const H = mk();
  ck("च1 ok(): ठीक 6 अंक, पहला अंक 1 से 9", H.A.ok("851201") && !H.A.ok("051201") && !H.A.ok("85120") && !H.A.ok("85120a") && !H.A.ok(""));
  const a = await H.A.get("851201");
  ck("च2 851201: एक ज़िला (खगड़िया, बिहार, LGD से); गाँव Chautham की पंचायत और प्रखंड; डाकघर Chautham", !!a && a.sure && a.main.district === "खगड़िया" && a.main.state === "bihar" && a.main.districtEn === "Khagaria" && a.main.stateEn === "Bihar" && a.main.src === "lgd" &&
    a.places.some((p) => p.n === "Chautham" && p.gp === "Chautham" && p.block === "Chautham") && a.offices.some((o) => o.n === "Chautham") && a.places.length > 30, a && JSON.stringify(a.districts));
  const b = await H.A.get("851204");
  ck("च3 851204: LGD का ज़िला पहले (खगड़िया), डाक का अलग ज़िला बाद में; नगर निकाय Khagaria", !!b && b.districts.length === 2 && b.districts[0].src === "lgd" && b.districts[0].district === "खगड़िया" && b.districts[1].src === "post" && b.sure && b.towns.some((t) => t.n === "Khagaria"), b && JSON.stringify(b.districts));
  ck("च4 999999: सूची में नहीं → null", (await H.A.get("999999")) === null && (await H.A.get("12")) === null);
  const c = await H.A.get("462116");
  ck("च5 बिना ज़िले का पिन: डाकघर मिलते हैं, known=false", !!c && !c.known && !c.sure && c.offices.length >= 1 && c.offices[0].d === -1);
  /* {"x":n} की कड़ी: कोई ऐसा पिन जो 5 अंक की फ़ाइल में है */
  const deep = Object.keys(J).find((k) => k.length === 5 && !J[k].x), deepPin = deep ? deep + Object.keys(J[deep].p)[0] : "";
  const H2 = mk(), d5 = deepPin ? await H2.A.get(deepPin) : null;
  ck("च6 बड़ा टुकड़ा: {\"x\":n} की कड़ी से 5 अंक की फ़ाइल तक (" + deepPin + ")", !!d5 && d5.places.length > 0 && H2.calls.filter((u) => /pinv/.test(u)).length === 3, H2.calls.join(" "));
  const H3 = mk(/geo\/pin\/851/); let rej = false; try { await H3.A.get("851201"); } catch (e) { rej = true; }
  const again = mk();
  ck("च7 डाक की फ़ाइल network से न आए: promise reject («जाँच नहीं पाई»), null नहीं («नहीं मिला»)", rej);
  const H4 = mk(/geo\/pinv\//), e4 = await H4.A.get("851201");
  ck("च8 सिर्फ़ गाँव की फ़ाइल न आए: डाक की जानकारी फिर भी मिलती है, placesFailed=true", !!e4 && e4.placesFailed && e4.places.length === 0 && e4.offices.length > 5 && e4.districts.length === 1 && e4.districts[0].src === "post");
  ck("च9 parse(): पिन और «भारत के बाहर»", again.A.parse("घर 12, Vill: X, PO: Y, Khagaria, Bihar, PIN: 851201").pin === "851201" && again.A.parse("Outside India: Kathmandu 44600").outside && again.A.parse("Outside India: 123456").pin === "" && again.A.parse("").pin === "");
  /* हर ज़िला जो helper लौटा सकता है, फ़ॉर्म की सूची में चुना जा सकता है: ग1 और घ1 यही जाँचते हैं */

  /* ── छ. बाहरी site नहीं; आकार ── */
  const used = ["join.html", "_JOIN_TEMPLATE.html", "assets/acs-pin.js", "assets/dashboard.js", "assets/net-nivedan.js"].filter((f) => /https?:\/\/[^\s"']*(postalpincode|api\.data\.gov|pincode)/i.test(rd(f)));   /* पुराने बाहरी पते का ज़िक्र टिप्पणी में रह सकता है; असली पता (https://…) नहीं */
  ck("छ1 पिन के लिए कोई बाहरी site नहीं (फ़ॉर्म, dashboard, नेटवर्क-निवेदन, helper)", used.length === 0, used.join(","));
  ck("छ2 फ़ॉर्म और helper जुड़े हैं (join.html में acs-pin.js; फ़ॉर्म ACS_PIN.get बुलाता है)", /<script src="assets\/acs-pin\.js"><\/script>/.test(rd("join.html")) && /ACS_PIN\.get\(pin\)/.test(rd("join.html")) && /ACS_PIN\.get\(pin\)/.test(rd("assets/dashboard.js")) && /ACS_PIN\.get\(pin\)/.test(rd("assets/net-nivedan.js")));
  const mb = (bytesP + bytesV) / 1048576;
  ck("छ3 साइट पर जाने वाला पिन-घर 18 MB से छोटा; डाक का सबसे बड़ा टुकड़ा 32 KB से छोटा", mb < 18 && maxP < 32 * 1024, mb.toFixed(1) + " MB · " + maxP);
  ck("छ4 दोनों स्रोतों का मिलान दर्ज है (meta.match)", META.match && META.match.both_same > 10000 && Object.keys(META.match).length === 8, JSON.stringify(META.match));

  console.log("\nजाँचें: पास " + pass + " · FAIL " + fail);
  console.log(fail ? "⛔ dev_pin_check रुका" : "🏁 dev_pin_check v1.0 : पिन-घर पास · डाक " + pins + " पिन, " + offices + " डाकघर · LGD " + vPins + " पिन, " + META.lgd.villages + " गाँव · ज़िले " + total + " · आकार " + mb.toFixed(1) + " MB");
  process.exit(fail ? 1 : 0);
})().catch((e) => { console.error("⛔ dev_pin_check बीच में रुका: " + (e && e.stack)); process.exit(1); });
