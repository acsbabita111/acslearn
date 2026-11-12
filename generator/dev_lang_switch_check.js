#!/usr/bin/env node
/* ============================================================
   dev_lang_switch_check.js v1.1 (12-Nov-2026) : ऊपर के 🌐 "भाषा" बटन का स्थायी पहरा।
   जाँचता है: बटन दबे → पट्टी खुले → सूची में हर live भाषा (अभी 45) → नाम दबे → सही पता खुले।
   v1.1: acs-translate.js की भाषा-पहचान भी (हर भाषा-होम पर अपनी भाषा पहचानी और याद रखी जाए)।
   तरीक़ा: assets/acs-universal.js का भाषा-सूची वाला हिस्सा नक़ली पेज पर चलाया जाता है;
   "पेज बना है या नहीं" का जवाब repo की असली फ़ाइलों से आता है। browser नहीं चाहिए।
   चलाना: node generator/dev_lang_switch_check.js   (dev_registry_check.js इसे अपने-आप चलाता है)
   ============================================================ */
"use strict";
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const U = fs.readFileSync(path.join(ROOT, "assets/acs-universal.js"), "utf8");
let pass = 0, fail = 0;
function ck(name, ok, extra) { if (ok) pass++; else { fail++; console.log("❌ " + name + (extra ? "  (" + extra + ")" : "")); } }

const homes = (U.match(/var ACS_LANG_HOMES = \{[^}]*\};/) || [""])[0];
const names = (U.match(/var ACS_LANG_NAMES = \{[^\n]*?\};/) || [""])[0];
const a = U.indexOf("function acsLangCur("), b = U.indexOf("function acsLangToggle(");
const bEnd = U.indexOf("\n", U.indexOf("p.classList.toggle(\"open\"); }", b));
ck("universal में भाषा-घर तालिका", !!homes); ck("universal में भाषा-नाम तालिका", !!names); ck("universal में भाषा-सूची का code", a > -1 && b > a && bEnd > b);
if (fail) { console.log("\nजाँचें: पास " + pass + " · FAIL " + fail); process.exit(1); }
const CODE = homes + "\n" + names + "\n" + U.slice(a, bEnd);

function exists(u) { let p = u.split("?")[0]; if (p.endsWith("/")) p += "index.html"; return fs.existsSync(path.join(ROOT, p.replace(/^\//, ""))); }
function world(pathname) {
  const panel = { kids: [], attrs: {}, cls: {}, firstChild: null,
    getAttribute(k) { return this.attrs[k] || null; }, setAttribute(k, v) { this.attrs[k] = v; },
    insertBefore(n) { this.kids.unshift(n); }, classList: { toggle(c) { panel.cls[c] = !panel.cls[c]; } } };
  const loc = { pathname, href: null };
  const ctx = { location: loc, localStorage: { setItem() {} },
    document: { getElementById: id => id === "acsTranslatePanel" ? panel : null, head: { appendChild() {} },
      createElement: () => ({ setAttribute() {}, addEventListener() {}, innerHTML: "", className: "", textContent: "" }) },
    fetch: u => Promise.resolve({ ok: exists(u) }) };
  vm.createContext(ctx); vm.runInContext(CODE, ctx);
  return { ctx, panel, loc };
}
(async function () {
  /* 1) सूची: बटन दबे → पट्टी खुले → 45 नाम, हर नाम का होम बना हो, चालू भाषा चिह्नित */
  const w = world("/"); const H = Object.keys(w.ctx.ACS_LANG_HOMES || vm.runInContext("ACS_LANG_HOMES", w.ctx)), N = vm.runInContext("ACS_LANG_NAMES", w.ctx);
  const all = ["hi"].concat(H);
  ck("भाषाएँ कम-से-कम 45", all.length >= 45, String(all.length));
  ck("हर भाषा का अपना नाम", all.every(c => typeof N[c] === "string" && N[c].trim()), all.filter(c => !N[c]).join(","));
  ck("हर भाषा का होम-पेज बना है", all.every(c => exists(c === "hi" ? "/" : "/" + c + "/")), all.filter(c => !exists(c === "hi" ? "/" : "/" + c + "/")).join(","));
  vm.runInContext("acsLangToggle()", w.ctx);
  const html = (w.panel.kids[0] || {}).innerHTML || "";
  ck("बटन दबने पर पट्टी खुली", w.panel.cls.open === true);
  ck("सूची में उतने ही नाम जितनी भाषाएँ", (html.match(/<a /g) || []).length === all.length, String((html.match(/<a /g) || []).length));
  ck("चालू भाषा (हिंदी) चिह्नित", /data-lang="hi" class="on"/.test(html));
  ck("हर कड़ी का href उस भाषा का होम", all.every(c => html.indexOf('href="' + (c === "hi" ? "/" : "/" + c + "/") + '" lang="' + c + '"') > -1));
  vm.runInContext("acsLangToggle()", w.ctx);
  ck("दोबारा दबने पर पट्टी बंद, सूची दोबारा नहीं बनी", w.panel.cls.open === false && w.panel.kids.length === 1);
  /* 2) रास्ते: नाम दबे → सही पता */
  const CASES = [["/", "en", "/en/"], ["/", "te", "/te/"], ["/he/", "ta", "/ta/"], ["/th/", "hi", "/"], ["/ko/", "de", "/de/"],
    ["/te/career.html", "ko", "/ko/career.html"], ["/career.html", "te", "/te/career.html"], ["/en/career.html", "hi", "/career.html"],
    ["/hunar.html", "te", "/te/"], ["/courses/hi/", "zh", "/zh/"]];
  for (const [from, code, want] of CASES) {
    const x = world(from); vm.runInContext("acsLangGo('" + code + "')", x.ctx);
    await new Promise(r => setTimeout(r, 20));
    ck(from + " → " + code + " = " + want, x.loc.href === want, String(x.loc.href));
  }
  /* 3) हर भाषा से हर भाषा का होम (45 × 45) */
  let bad = 0;
  for (const f of all) for (const t of all) { const x = world(f === "hi" ? "/" : "/" + f + "/"); vm.runInContext("acsLangGo('" + t + "')", x.ctx); await new Promise(r => setImmediate(r)); await new Promise(r => setImmediate(r)); if (x.loc.href !== (t === "hi" ? "/" : "/" + t + "/")) bad++; }
  ck("हर होम से हर होम (" + all.length * all.length + " रास्ते)", bad === 0, bad + " ग़लत");
  /* 3-ख) acs-translate.js की भाषा-पहचान (v1.1): हर भाषा-होम पर वही भाषा पहचानी और याद रखी जाए, English नहीं */
  {
    const T = fs.readFileSync(path.join(ROOT, "assets/acs-translate.js"), "utf8");
    function tworld(pathname, withTable) {
      const store = {};
      const ctx = { window: { location: { pathname } }, navigator: { language: "en-US" },
        localStorage: { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = String(v); } },
        document: { addEventListener() {}, querySelectorAll: () => [], getElementById: () => null } };
      vm.createContext(ctx);
      if (withTable) vm.runInContext(homes + "\n" + names, ctx);
      vm.runInContext(T, ctx);
      const d = vm.runInContext("ACS_T.detectLang()", ctx); vm.runInContext("ACS_T.apply(ACS_T.detectLang())", ctx);
      return [d, store.acs_lang];
    }
    const wrong = H.filter(c => { const r = tworld("/" + c + "/", true); return r[0] !== c || r[1] !== c; });
    ck("भाषा-पहचान: हर भाषा-होम पर अपनी भाषा (" + H.length + ")", wrong.length === 0, wrong.join(","));
    const inner = tworld("/tr/career.html", true);
    ck("भाषा-पहचान: भीतरी पेज /tr/career.html = tr", inner[0] === "tr" && inner[1] === "tr", inner.join("/"));
    const oldp = tworld("/te/", false);
    ck("भाषा-पहचान: तालिका न हो तब भी पुरानी भाषाएँ चलें (/te/ = te)", oldp[0] === "te");
    ck("acs-translate.js में 17 भाषाओं वाला पुराना regex नहीं बचा", !/\(hi\|en\|kn\|mr\|bn/.test(T));
  }
  /* 4) हर होम-पेज में बटन, पट्टी और script मौजूद */
  const miss = all.filter(c => { const h = fs.readFileSync(path.join(ROOT, c === "hi" ? "index.html" : c + "/index.html"), "utf8");
    return !(/onclick="acsLangToggle\(\)"/.test(h) && /id="acsTranslatePanel"/.test(h) && /src="\/assets\/acs-universal\.js"/.test(h)); });
  ck("हर होम-पेज में बटन + पट्टी + script", miss.length === 0, miss.join(","));
  console.log("\nजाँचें: पास " + pass + " · FAIL " + fail);
  console.log(fail ? "⛔ dev_lang_switch_check रुका" : "🏁 dev_lang_switch_check v1.1 : भाषा-बटन पास (" + all.length + " भाषाएँ)");
  process.exit(fail ? 1 : 0);
})();
