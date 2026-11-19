/* dev_net_khoj_check.js v1.0 (19-Nov-2026) : नेटवर्क पेज (/hi/network.html) की खोज का जाँच-यंत्र।
   असली पेज + असली /assets/net-khoj.js + असली /assets/geo/ jsdom में; server (searchPublicListings) की जगह नक़ली जवाब।
   चलाएँ:  node generator/dev_net_khoj_check.js      (jsdom कहीं और हो तो: ACS_JSDOM=<पता>/node_modules/jsdom)
   जाँचें: generator ताज़ा · पुराना हाथ का हिस्सा गया · गिनती असली · सूची में सिर्फ़ नाम, जगह, ACS नंबर, कोर्स और बैज ·
           श्रेणी, देश, राज्य, ज़िला और नाम की खोज server तक सही जाती है · 20 के बाद "और देखें" · server न मिले तो साफ़ संदेश ·
           अक्षर 16px से छोटे नहीं · चौकोर कोष्ठक नहीं। */
"use strict";
const fs = require("fs"), path = require("path"), cp = require("child_process");
const ROOT = path.join(__dirname, "..");
function loadJsdom() {
  const tries = [process.env.ACS_JSDOM, "jsdom", path.join(ROOT, "node_modules/jsdom")].filter(Boolean);
  for (const t of tries) { try { return require(t); } catch (e) {} }
  console.log("⛔ jsdom नहीं मिला। पहले चलाएँ:  npm i jsdom@24 --no-save   (या ACS_JSDOM=<jsdom का पता>)"); process.exit(2);
}
const { JSDOM, ResourceLoader, VirtualConsole } = loadJsdom();
let pass = 0, fail = 0;
function ck(name, ok, extra) { if (ok) { pass++; return true; } fail++; console.log("❌ " + name + (extra ? "\n     " + String(extra).slice(0, 700) : "")); return false; }
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rd = (p) => fs.readFileSync(path.join(ROOT, p), "utf8");

/* ── स्थिर जाँच ── */
const gen = cp.spawnSync(process.execPath, [path.join(ROOT, "generator/build_net_khoj.js"), "--check"], { encoding: "utf8" });
ck("generator: hi/network.html ताज़ा (build_net_khoj.js --check)", gen.status === 0, gen.stdout + gen.stderr);
const HTML = rd("hi/network.html");
ck("पुराना हाथ का हिस्सा गया: udyam_data.js, देश-सूची वाला script, \"00 रिज़ल्ट\" और TODO नहीं", !/udyam_data\.js|COUNTRY_GROUPS|SAARC_DATA|class="net-count"|TODO\(future\)/.test(HTML));
ck("नया हिस्सा ठीक एक बार: markers, geo/countries.js, net-khoj.js",
  HTML.split("NET-KHOJ:START").length === 2 && HTML.split("NET-KHOJ:END").length === 2 && HTML.split('src="/assets/geo/countries.js"').length === 2 && HTML.split('src="/assets/net-khoj.js"').length === 2);
ck("गिनती-पट्टी में पहले से लिखा झूठा 0 नहीं (बिना JS के \"—\")", !/class="net-n" id="n[A-Za-z]+">0</.test(HTML) && HTML.split('class="net-n"').length === 10);
const blk = HTML.slice(HTML.indexOf("NET-KHOJ:START"), HTML.indexOf("NET-KHOJ:END"));
const small = (blk.match(/font-size:\s*(\d+)px/g) || []).map((x) => +x.replace(/\D/g, "")).filter((n) => n < 16);
ck("खोज-हिस्से में कोई अक्षर 16px से छोटा नहीं", small.length === 0, small.join(","));
ck("खोज-हिस्से और net-khoj.js के हिंदी पाठ में चौकोर कोष्ठक नहीं", !/[\[\]]/.test(blk.replace(/<[^>]+>/g, "")) && !(rd("assets/net-khoj.js").match(/"[^"\n]*[ऀ-ॿ][^"\n]*"/g) || []).some((x) => /[\[\]]/.test(x)));
const NK = rd("assets/net-khoj.js");
ck("net-khoj.js: ES5 (Android 8): const/let/=>/`/class नहीं", !/\b(const|let|class)\s|=>|`/.test(NK.replace(/\/\*[\s\S]*?\*\//g, "")));
ck("net-khoj.js: project का नाम acs-config.js से, fallback साथ", /ACS_CONFIG/.test(NK) && /acslearn-platform/.test(NK) && /searchPublicListings/.test(NK));

/* ── नक़ली browser ── */
class Loader extends ResourceLoader {
  fetch(url) {
    let u; try { u = new URL(url); } catch (e) { return Promise.resolve(Buffer.from("")); }
    if (u.hostname === "acslearn.com") { const f = path.join(ROOT, decodeURIComponent(u.pathname));
      if (fs.existsSync(f) && fs.statSync(f).isFile()) return Promise.resolve(fs.readFileSync(f)); return Promise.reject(new Error("404 " + u.pathname)); }
    return Promise.resolve(Buffer.from(""));
  }
}
const ROW = (i, o) => Object.assign({ regNo: "ACS-CE-2026-1000" + String(i).padStart(2, "0"), role: "center", name: "नमूना केंद्र " + i, banner: true, country: "in", state: "bihar",
  district: "खगड़िया", badge: false, courses: ["कंप्यूटर ऑपरेटर"] }, o || {});
function fakeServer(rows, counts) {
  return function (d) {
    const L = rows.filter((x) => (!d.role || x.role === d.role) && (!d.country || x.country === d.country) && (!d.state || x.state === d.state)
      && (!d.district || x.district === d.district) && (!d.q || x.name.indexOf(d.q) > -1 || x.regNo.toLowerCase() === String(d.q).toLowerCase()));
    return { counts: counts, total: L.length, page: d.page || 0, pageSize: 20, items: L.slice((d.page || 0) * 20, ((d.page || 0) + 1) * 20) };
  };
}
async function openNet(serve) {
  const html = HTML.replace(/<script(?![^>]*src="\/assets\/(geo\/countries|net-khoj)\.js")[^>]*>[\s\S]*?<\/script>/g, "");
  const vc = new VirtualConsole(); const errors = []; vc.on("jsdomError", (e) => errors.push(String(e && e.message || e)));
  const calls = [];
  const dom = new JSDOM(html, { url: "https://acslearn.com/hi/network.html", runScripts: "dangerously", resources: new Loader(), virtualConsole: vc, pretendToBeVisual: true,
    beforeParse(w) {
      w.ACS_CONFIG = { firebase: { projectId: "acslearn-platform" } };
      w.fetch = function (url, o) {
        const body = JSON.parse(o.body); calls.push({ url: url, data: body.data });
        if (w.__DOWN) return Promise.reject(new Error("offline"));
        const res = serve(body.data);
        return Promise.resolve({ json: () => Promise.resolve({ result: res }) });
      };
    } });
  const c = { dom: dom, w: dom.window, d: dom.window.document, calls: calls, errors: errors };
  for (let i = 0; i < 60 && !/मिले:/.test(txt(c)); i++) await sleep(50);
  return c;
}
const txt = (c) => { const e = c.d.getElementById("netResult"); return e ? e.textContent : ""; };
const settle = async (c, f) => { for (let i = 0; i < 60; i++) { await sleep(40); if (!f || f()) break; } };
function pick(c, id, v) { const s = c.d.getElementById(id); s.value = v; s.dispatchEvent(new c.w.Event("change")); }

(async () => {
  const counts = { countries: 2, zonal: 3, regional: 7, center: 5, teacher: 4, counselor: 1, employer: 2, agent: 0, learner: 120 };
  const rows = [ROW(1, { badge: true, name: "ज्ञान ज्योति कंप्यूटर केंद्र", courses: ["कंप्यूटर ऑपरेटर", "डेटा एंट्री ऑपरेटर"], mobile: "9876543210", email: "x@y.in", authUid: "uX" }),
    ROW(2, { role: "workshop", name: "रहमान सिलाई वर्कशॉप", district: "भागलपुर", regNo: "ACS-WS-2026-200001" }),
    ROW(3, { role: "teacher", name: "शर्मा गणित कक्षा", regNo: "ACS-TE-2026-300001", courses: ["गणित की सरल पढ़ाई"] }),
    ROW(4, { role: "ustad", name: "रफ़ीक़ बढ़ईगीरी कक्षा", regNo: "ACS-US-2026-400001", state: "jharkhand", district: "रांची", courses: [] })];
  for (let i = 10; i < 32; i++) rows.push(ROW(i, { district: "पूर्णिया" }));
  let c = await openNet(fakeServer(rows, counts));
  const t0 = txt(c), first = c.calls[0] || { data: {} };
  ck("पेज खुलते ही एक खोज: देश भारत, बाक़ी ख़ाली, पन्ना 0", c.calls.length === 1 && first.data.country === "in" && !first.data.role && !first.data.state && first.data.page === 0
    && /cloudfunctions\.net\/searchPublicListings$/.test(first.url) && /^https:\/\/us-central1-acslearn-platform\./.test(first.url), JSON.stringify(c.calls));
  const n = (id) => c.d.getElementById(id).textContent;
  ck("गिनती-पट्टी में server की असली गिनती", n("nDesh") === "2" && n("nZonal") === "3" && n("nRegional") === "7" && n("nCentre") === "5" && n("nTeacher") === "4"
    && n("nCounselor") === "1" && n("nEmployer") === "2" && n("nAgent") === "0" && n("nLabharthi") === "120");
  const card1 = c.d.querySelector(".nk-card");
  ck("पहला कार्ड: बैनर-नाम, बैज, जगह (ज़िला और राज्य का नाम), ACS नंबर, कोर्स, जुड़ने का तरीक़ा", !!card1 && /ज्ञान ज्योति कंप्यूटर केंद्र/.test(card1.textContent)
    && /✔ सत्यापित बैज/.test(card1.textContent) && /खगड़िया, बिहार/.test(card1.textContent) && /ACS-CE-2026-100001/.test(card1.textContent)
    && /कंप्यूटर ऑपरेटर · डेटा एंट्री ऑपरेटर/.test(card1.textContent) && /ACS नंबर डालकर/.test(card1.textContent) && card1.className.indexOf("bdg") > -1, card1 && card1.textContent);
  ck("server कुछ और भी भेजे, तब भी फ़ोन, email या खाते की पहचान पेज पर कभी नहीं", !/9876543210|x@y\.in|uX/.test(c.d.getElementById("netResult").innerHTML));
  ck("पहली बार 20 कार्ड और \"⬇ और देखें\"; कुल मिले: 26", c.d.querySelectorAll(".nk-card").length === 20 && !!c.d.getElementById("nkMore") && /मिले:\s*26/.test(t0), t0.slice(0, 80));
  c.d.getElementById("nkMore").click(); await settle(c, () => c.d.querySelectorAll(".nk-card").length === 26);
  ck("\"और देखें\": अगला पन्ना (page 1), 26 कार्ड, बटन गया", c.calls[c.calls.length - 1].data.page === 1 && c.d.querySelectorAll(".nk-card").length === 26 && !c.d.getElementById("nkMore"));
  const catT = c.d.querySelector('.net-cat[data-cat="teacher"]'); catT.click(); await settle(c, () => /मिले:\s*1/.test(txt(c)));
  ck("श्रेणी \"शिक्षक की कक्षा\": server को role teacher, पन्ना 0; कार्ड पर online कक्षा का तरीक़ा", c.calls[c.calls.length - 1].data.role === "teacher" && c.calls[c.calls.length - 1].data.page === 0
    && /शर्मा गणित कक्षा/.test(txt(c)) && /शिक्षकों के online कोर्स/.test(txt(c)) && catT.getAttribute("aria-pressed") === "true");
  c.d.querySelector('.net-cat[data-cat=""]').click(); await settle(c, () => /मिले:\s*26/.test(txt(c)));
  pick(c, "fState", "bihar"); await settle(c, () => c.d.getElementById("fDistrict").options.length > 5);
  ck("राज्य चुनने पर उसी राज्य के ज़िले /assets/geo/ से आते हैं (बिहार के ज़िले हिंदी में)", c.d.getElementById("fDistrict").options.length > 30 && !c.d.getElementById("fDistrict").disabled
    && Array.from(c.d.getElementById("fDistrict").options).some((o) => o.value === "भागलपुर") && c.calls[c.calls.length - 1].data.state === "bihar");
  pick(c, "fDistrict", "भागलपुर"); await settle(c, () => /मिले:\s*1/.test(txt(c)));
  ck("ज़िला चुनने पर खोज उसी ज़िले से: एक वर्कशॉप", c.calls[c.calls.length - 1].data.district === "भागलपुर" && /रहमान सिलाई वर्कशॉप/.test(txt(c)));
  pick(c, "fState", ""); await settle(c, () => c.d.getElementById("fDistrict").disabled);
  const q = c.d.getElementById("fQ"); q.value = "  ज्योति  "; c.d.getElementById("fGo").click(); await settle(c, () => /मिले:\s*1/.test(txt(c)));
  ck("नाम से खोज (आगे-पीछे की ख़ाली जगह हटकर)", c.calls[c.calls.length - 1].data.q === "ज्योति" && /ज्ञान ज्योति/.test(txt(c)) && !c.calls[c.calls.length - 1].data.state);
  q.value = "रफ़ीक़"; q.dispatchEvent(new c.w.KeyboardEvent("keydown", { key: "Enter" })); await settle(c, () => /रफ़ीक़/.test(txt(c)));
  const cu = c.d.querySelector(".nk-card");
  ck("Enter दबाने पर भी खोज; दूसरे राज्य का नाम सही (झारखंड)", c.calls[c.calls.length - 1].data.q === "रफ़ीक़" && !!cu && /रांची, झारखंड/.test(cu.textContent), cu && cu.textContent);
  q.value = "कोई नहीं मिलेगा"; c.d.getElementById("fGo").click(); await settle(c, () => /मिले:\s*0/.test(txt(c)));
  ck("कुछ न मिले तो साफ़ संदेश", /कोई नाम नहीं मिला/.test(txt(c)) && !c.d.querySelector(".nk-card"));
  pick(c, "fCountry", "np"); await settle(c, () => c.calls[c.calls.length - 1].data.country === "np");
  ck("दूसरा देश (नेपाल): उसके राज्य /assets/geo/ से; ज़िला-सूची बंद", c.d.getElementById("fState").options.length > 2 && c.d.getElementById("fDistrict").disabled);
  c.w.__DOWN = true; c.d.getElementById("fGo").click(); await settle(c, () => !!c.d.getElementById("nkRetry"));
  ck("server न मिले तो साफ़ संदेश और \"🔄 फिर कोशिश करें\"", /सूची अभी नहीं खुली/.test(txt(c)) && !!c.d.getElementById("nkRetry"));
  c.w.__DOWN = false; c.d.getElementById("nkRetry").click(); await settle(c, () => /मिले:/.test(txt(c)));
  ck("\"🔄 फिर कोशिश करें\" दबाने पर वही खोज दोबारा जाती है", /मिले:\s*0/.test(txt(c)) && c.calls[c.calls.length - 1].data.country === "np" && !c.d.getElementById("nkRetry"));
  q.value = ""; pick(c, "fCountry", "in"); await settle(c, () => /मिले:\s*26/.test(txt(c)));
  ck("फिर कोशिश पर सूची लौट आती है", /मिले:\s*26/.test(txt(c)), txt(c).slice(0, 80));
  ck("पेज में कोई JS-त्रुटि नहीं", c.errors.length === 0, c.errors.join(" ‖ "));
  c.dom.window.close();
  c = await openNet(fakeServer([], { countries: 1, zonal: 0, regional: 0, center: 0, teacher: 0, counselor: 0, employer: 0, agent: 0, learner: 0 }));
  ck("अभी कोई स्वीकृत नाम न हो: गिनती 0 (असली), सूची में साफ़ संदेश", c.d.getElementById("nCentre").textContent === "0" && /कोई नाम नहीं मिला/.test(txt(c)));
  c.dom.window.close();
  console.log("जाँचें: पास " + pass + " · फेल " + fail);
  if (fail) { console.log("⛔ dev_net_khoj_check रुका"); process.exit(1); }
  console.log("🏁 dev_net_khoj_check v1.0 : नेटवर्क पेज की खोज पास");
  process.exit(0);
})().catch((e) => { console.error(e); process.exit(1); });
