/* ============================================================
   generator/dev_lang_public_check.js : v1.0 (17-Nov-2026, कन्नड़ क-4) · जाँच-यंत्र
   काम: एक भाषा के तीन सार्वजनिक पन्ने (भाषा-घर, करियर, करियर टेस्ट) चलते हुए रूप में देखना।
   Founder का आदेश (16-Nov-2026): "कन्नड मे सब कुछ कन्नड मे ही हो। अंग्रेजी कहे को रहेगा।"
   यह यंत्र पन्ने को नक़ली browser (jsdom) में उसकी अपनी scripts के साथ खोलता है (links.js, acs-universal.js,
   करियर टेस्ट के इंजन), और देखता है:
     1. दिखने वाले पाठ और aria-label / title / alt / placeholder में देवनागरी शून्य।
     2. English शब्द शून्य: शब्द-नियम वही जो पैनल का है (generator/lib_lang_terms.js + data/panel_i18n/<भाषा>_terms.json),
        और नीचे की "दूसरों के नाम" सूची (PUBLIC_KEEP): दूसरी कंपनियों और उनके उत्पादों के नाम, विज्ञान के नाम।
     3. ऊपर का मेन्यू 10, नीचे का मेन्यू 10, नीति की 3 कड़ियाँ: सब इसी भाषा की लिपि में; "होम" इसी भाषा के घर पर।
     4. पन्ने में पहले से लिखे मेन्यू के नाम (करियर-तालिका से) = links.js के "labels" वाले नाम (एक ही शब्द, दो जगह नहीं बदलते)।
     5. करियर टेस्ट का द्वार: "Login / Dashboard" बटन इसी भाषा में।
     6. links.js के नाम सादे पाठ में (HTML का कोई चिह्न नहीं), सब खाने भरे।
   चलाना (repo की जड़ से):  ACS_JSDOM=<jsdom का पता> node generator/dev_lang_public_check.js kn
   jsdom न मिले, तो यह रुककर बताता है (चुपचाप पास नहीं होता)। यह website पर कुछ नहीं बदलता।
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, ".."), LG = (process.argv[2] || "").trim();
const LT = require("./lib_lang_terms.js");
if (!LG || !LT.has(LG)) { console.log("उपयोग: node generator/dev_lang_public_check.js <भाषा-कोड>   (जिस भाषा का शब्द-नियम बना है; अभी: kn)"); process.exit(1); }
function loadJsdom() {
  const c = [process.env.ACS_JSDOM, "jsdom"].filter(Boolean);
  for (const p of c) { try { return require(p); } catch (e) {} }
  console.log("⛔ jsdom नहीं मिला। ACS_JSDOM में उसका पता दें।"); process.exit(1);
}
const { JSDOM, ResourceLoader, VirtualConsole } = loadJsdom();
const T = LT.load(LG), OWN = T.own, DEV = /[ऀ-ॣ०-ॿ]/;
/* दूसरों के नाम: ये जैसे उनके मालिक लिखते हैं, वैसे ही रहते हैं (हिंदी पन्ने पर भी Latin में हैं) */
const PUBLIC_KEEP = ["RIASEC", "MBTI", "MAPP", "O*NET Interest Profiler", "Self-Directed Search", "Truity", "Gallup", "Mindler", "Coursera Plus", "Udemy Personal Plan",
  "Skillshare Membership", "LinkedIn Premium Career", "LinkedIn Learning", "John Holland", "Freedom Fighter Gangadhar Prasad Memorial Trust", "Career Interest Test",
  "welding, Japanese, DCA", "English →"];
const rd = f => fs.readFileSync(path.join(ROOT, f), "utf8");
let pass = 0, fail = 0;
function ck(name, ok, info) { if (ok) pass++; else { fail++; console.log("❌ " + name + (info ? "\n     " + String(info).slice(0, 700) : "")); } return !!ok; }
let RACE = 0;
process.on("uncaughtException", function (e) { const st = String(e && e.stack || e); if (e instanceof TypeError && /reading '_location'/.test(st) && /jsdom/.test(st)) { RACE++; return; } console.error(st); process.exit(1); });
class Loader extends ResourceLoader {
  fetch(url) {
    let u; try { u = new URL(url); } catch (e) { return Promise.resolve(Buffer.from("")); }
    if (u.hostname !== "acslearn.com") return Promise.resolve(Buffer.from(""));
    if (!/\.js$/.test(u.pathname)) return Promise.resolve(Buffer.from(""));
    const f = path.join(ROOT, decodeURIComponent(u.pathname));
    if (!fs.existsSync(f)) return Promise.reject(new Error("404 " + u.pathname));
    return Promise.resolve(fs.readFileSync(f));
  }
}
const wait = ms => new Promise(r => setTimeout(r, ms));
async function open(file) {
  const errors = [], vc = new VirtualConsole();
  vc.on("jsdomError", e => { const m = String(e && (e.message || e)); if (!/Not implemented|Could not load (link|img|iframe)|Could not parse CSS/.test(m)) errors.push(m.slice(0, 200)); });
  const dom = new JSDOM(rd(file), { url: "https://acslearn.com/" + file.replace(/index\.html$/, ""), runScripts: "dangerously", resources: new Loader(), pretendToBeVisual: true, virtualConsole: vc,
    beforeParse(w) { w.scrollTo = function () {}; w.Element.prototype.scrollIntoView = function () {}; w.alert = function () {}; w.open = function () { return null; };
      w.matchMedia = w.matchMedia || function () { return { matches: false, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }; };
      w.speechSynthesis = { cancel() {}, speak() {}, getVoices() { return []; } }; } });
  await new Promise(r => { if (dom.window.document.readyState === "complete") r(); else dom.window.addEventListener("load", r); setTimeout(r, 4000); });
  await wait(700);
  return { dom, w: dom.window, d: dom.window.document, errors };
}
function texts(c) {
  /* छोड़े जाते हैं: भाषा चुनने की सूची (हर भाषा का नाम उसकी अपनी लिपि में) और डाक-पता (#acsAddr: नियम से Latin में) */
  const out = [], SKIP = "script,style,noscript,template,#acsLangList,[data-lname],#acsAddr";
  const tw = c.d.createTreeWalker(c.d.body, c.w.NodeFilter.SHOW_TEXT); let n;
  while ((n = tw.nextNode())) { const t = n.nodeValue.replace(/\s+/g, " ").trim(); if (!t) continue; const e = n.parentElement; if (!e || e.closest(SKIP)) continue; out.push({ where: "पाठ", t }); }
  c.d.querySelectorAll("[aria-label],[title],[alt],[placeholder]").forEach(e => { if (e.closest(SKIP)) return; ["aria-label", "title", "alt", "placeholder"].forEach(a => { const v = e.getAttribute(a); if (v && v.trim()) out.push({ where: a, t: v.trim() }); }); });
  return out;
}
function english(t) { let x = " " + t + " "; PUBLIC_KEEP.forEach(k => { x = x.split(k).join(" "); }); return LT.scan(x, T, null); }
(async function () {
  const L = require(path.join(ROOT, "assets/links.js")), own = (L.labels || {})[LG];
  const KEYS = ["home", "mission", "salah", "udyam", "courses", "register", "verify", "network", "vani", "contact"], MORE = ["refund", "privacy", "terms", "top", "back", "menu", "close", "footer", "wa", "logo"];
  if (!ck("links.js : \"labels\" में " + LG + " की पंक्ति है", !!own)) { console.log("\nजाँचें: पास " + pass + " · फेल " + fail); process.exit(1); }
  ck("links.js : सब " + (KEYS.length + MORE.length) + " खाने भरे हैं", KEYS.concat(MORE).every(k => typeof own[k] === "string" && own[k].length > 0), KEYS.concat(MORE).filter(k => !own[k]).join(", "));
  ck("links.js : नाम सादे पाठ में (HTML का चिह्न नहीं), देवनागरी नहीं, English शब्द नहीं", KEYS.concat(MORE).every(k => !/[<>"&]/.test(own[k]) && !DEV.test(own[k]) && OWN.test(own[k]) && english(own[k]).length === 0), KEYS.concat(MORE).filter(k => /[<>"&]/.test(own[k]) || DEV.test(own[k]) || !OWN.test(own[k]) || english(own[k]).length).join(", "));
  ck("links.js : मेन्यू के 10 key वही हैं जो \"menu\" में हैं", JSON.stringify(L.menu.map(m => m.key)) === JSON.stringify(KEYS));
  for (const pg of ["index.html", "career.html", "aptitude-test.html"]) {
    const file = LG + "/" + pg, tag = "/" + file;
    if (!ck(tag + " : पन्ना है", fs.existsSync(path.join(ROOT, file)))) continue;
    const c = await open(file), all = texts(c);
    ck(tag + " : पन्ना बिना script-त्रुटि के खुला", c.errors.length === 0, c.errors.slice(0, 3).join(" | "));
    ck(tag + " : <html lang> = " + LG, (c.d.documentElement.getAttribute("lang") || "").indexOf(LG) === 0, c.d.documentElement.getAttribute("lang"));
    const dv = all.filter(x => DEV.test(x.t));
    ck(tag + " : देवनागरी शून्य (पाठ और नाम; " + all.length + " टुकड़े देखे)", dv.length === 0, dv.slice(0, 4).map(x => x.where + ": " + x.t.slice(0, 50)).join(" ‖ "));
    const en = all.map(x => ({ x, l: english(x.t) })).filter(y => y.l.length);
    ck(tag + " : English शब्द शून्य (छूट के बाहर)", en.length === 0, en.slice(0, 8).map(y => y.x.where + " [" + y.l.join(",") + "] " + y.x.t.slice(0, 60)).join(" ‖ "));
    const dl = Array.from(c.d.querySelectorAll("#acsMenuList a")), fm = Array.from(c.d.querySelectorAll("#acsFooterMenu a"));
    const labOwn = a => { const t = a.textContent; let i = 0; while (i < t.length && !OWN.test(t.charAt(i)) && !/[A-Za-z]/.test(t.charAt(i))) i++; return t.slice(i).trim(); };
    ck(tag + " : ऊपर का मेन्यू 10, नाम links.js वाले", dl.length === 10 && dl.every((a, i) => labOwn(a) === own[KEYS[i]]), dl.map(labOwn).join(" | "));
    ck(tag + " : नीचे का मेन्यू 10, नाम links.js वाले", fm.length === 10 && fm.every((a, i) => labOwn(a) === own[KEYS[i]]), fm.map(labOwn).join(" | "));
    ck(tag + " : दोनों मेन्यू में \"होम\" इसी भाषा के घर पर (/" + LG + "/)", dl.length > 0 && fm.length > 0 && dl[0].getAttribute("href") === "/" + LG + "/" && fm[0].getAttribute("href") === "/" + LG + "/", (dl[0] && dl[0].getAttribute("href")) + " | " + (fm[0] && fm[0].getAttribute("href")));
    const lg = Array.from(c.d.querySelectorAll(".acs-flegal a"));
    ck(tag + " : नीति की 3 कड़ियाँ इसी भाषा में, पते वही", lg.length === 3 && lg[0].textContent.indexOf(own.refund) >= 0 && lg[1].textContent.indexOf(own.privacy) >= 0 && lg[2].textContent.indexOf(own.terms) >= 0 && lg.map(a => a.getAttribute("href")).join(",") === "/refund.html,/privacy.html,/terms.html", lg.map(a => a.textContent + "→" + a.getAttribute("href")).join(" | "));
    const li = c.d.getElementById("acsLogin");
    ck(tag + " : लॉगिन की कड़ी इसी भाषा में, पता /dashboard/", !!li && OWN.test(li.textContent) && english(li.textContent).length === 0 && /^\/dashboard\//.test(li.getAttribute("href") || ""), li && li.textContent);
    { const fb = Array.from(c.d.querySelectorAll(".udy-float .udy-fbtn")), up = fb.filter(b => b.tagName === "BUTTON")[0], bk = fb.filter(b => b.tagName === "A")[0];
      ck(tag + " : गोल बटन: \"ऊपर\" का नाम इसी भाषा में" + (pg === "index.html" ? "; होम पर \"पीछे\" का बटन नहीं" : "; \"पीछे\" का नाम इसी भाषा में और पता /" + LG + "/"),
        !!up && up.getAttribute("aria-label") === own.top && up.title === own.top && (pg === "index.html" ? !bk : (!!bk && bk.getAttribute("aria-label") === own.back && bk.getAttribute("href") === "/" + LG + "/")), (up && up.getAttribute("aria-label")) + " | " + (bk && (bk.getAttribute("aria-label") + " → " + bk.getAttribute("href")))); }
    if (pg === "aptitude-test.html") {
      const gate = Array.from(c.d.querySelectorAll('a.apt-btn[href="/dashboard/"]'));
      ck(tag + " : परीक्षा के द्वार पर \"Login / Dashboard\" बटन इसी भाषा में (" + gate.length + ")", gate.length >= 1 && gate.every(a => OWN.test(a.textContent) && !/Login|Dashboard/.test(a.textContent)), gate.map(a => a.textContent).join(" | "));
      ck(tag + " : परीक्षा का पन्ना इसी भाषा का इंजन-पाठ लेता है (APT_LANG, APT_SX)", c.w.APT_LANG === LG && !!(c.w.APT_SX && c.w.APT_SX[LG] && c.w.APT_SX[LG]["@login"]), String(c.w.APT_LANG));
    }
    c.dom.window.close();
  }
  /* बाक़ी भाषा-घर: जिनकी पंक्ति "labels" में नहीं है, वहाँ पहले जैसा English (इस खेप से कोई असर नहीं) */
  { const other = fs.existsSync(path.join(ROOT, "te/index.html")) && !(L.labels || {}).te ? "te/index.html" : null;
    if (other) { const c = await open(other), fm = Array.from(c.d.querySelectorAll("#acsFooterMenu a")), lg = Array.from(c.d.querySelectorAll(".acs-flegal a"));
      ck("/" + other + " : जिस भाषा की पंक्ति नहीं है, वहाँ मेन्यू पहले जैसा English, \"Home\" → /en/", fm.length === 10 && /Home$/.test(fm[0].textContent) && fm[0].getAttribute("href") === "/en/" && lg.length === 3 && /Refund Policy/.test(lg[0].textContent), fm.slice(0, 2).map(a => a.textContent + "→" + a.getAttribute("href")).join(" | "));
      c.dom.window.close(); } }
  { const c = await open("index.html"), fm = Array.from(c.d.querySelectorAll("#acsFooterMenu a")), lg = Array.from(c.d.querySelectorAll(".acs-flegal a"));
    ck("/index.html (हिंदी होम) : मेन्यू और नीति की कड़ियाँ पहले जैसी हिंदी में", fm.length === 10 && /होम$/.test(fm[0].textContent) && fm[0].getAttribute("href") === "/" && lg.length === 3 && /रिफंड/.test(lg[0].textContent), fm.slice(0, 2).map(a => a.textContent + "→" + a.getAttribute("href")).join(" | "));
    c.dom.window.close(); }
  await wait(200);
  console.log("\nजाँचें: पास " + pass + " · फेल " + fail + (RACE ? " · (jsdom की बंद खिड़की वाली दौड़ " + RACE + " बार छोड़ी गई)" : ""));
  if (fail) { console.log("⛔ dev_lang_public_check v1.0 : " + LG + " के सार्वजनिक पन्ने ठीक नहीं"); process.exit(1); }
  console.log("🏁 dev_lang_public_check v1.0 : " + LG + " के तीन सार्वजनिक पन्ने पास");
  process.exit(0);
})().catch(function (e) { console.log("⛔ जाँच बीच में रुकी: " + (e && e.stack || e)); process.exit(1); });
