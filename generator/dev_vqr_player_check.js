#!/usr/bin/env node
/* ============================================================================
   dev_vqr_player_check.js v1.1 · 25-Nov-2026 · डिजिटल मित्र वीडियो-player (VQR) की जाँच
   असली Chromium (playwright) में असली पाठ-पन्ने खोलकर। अपना छोटा server, बाहर कुछ नहीं:
   - सूची (assets/vqr/SE026/*.json), YouTube का iframe_api, i.ytimg चित्र और wa.me
     सब नक़ली (route से)। असली YouTube यहाँ नहीं चलता: यह सच्ची सीमा है।
   - service worker बंद (route उसके पीछे न छिपे)।
   चलाना:  node generator/dev_vqr_player_check.js [--shots <folder>]
   आख़िरी पंक्ति: 🏁 PASS · N पास, 0 fail   (कोई fail = exit 1)
   v1.1: ChatGPT-ऑडिट P2 (आख़िरी वीडियो रिपोर्ट से छिपे, तब भी "वापस दिखाएँ") की 5 जाँचें।
   ============================================================================ */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
const { chromium, devices } = require("playwright");

const ROOT = path.join(__dirname, "..");
const argv = process.argv.slice(2);
const SHOTS = argv.indexOf("--shots") >= 0 ? argv[argv.indexOf("--shots") + 1] : null;
const DMT = "/courses/hi/digital-mitra-basic/";
const pick = (dir, re) => { const f = fs.readdirSync(path.join(ROOT, dir)).filter(x => re.test(x)).sort()[0]; if (!f) throw new Error(dir + ": " + re); return "/" + dir + "/" + f; };
const L611 = pick("courses/hi/digital-mitra-basic", /^dmt-6-11-.*\.html$/);
const L101 = pick("courses/hi/digital-mitra-basic", /^dmt-1-01-.*\.html$/);
const L210 = pick("courses/hi/digital-mitra-basic", /^dmt-2-10-.*\.html$/);
const WLD = pick("courses/hi/welding", /^wld-001-.*\.html$/);
const TWV = pick("courses/hi/two-wheeler", /^twv-01-01-.*\.html$/);
const INTRO = DMT;
const ORIG_INTRO = "इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक एक जीवित रास्ता:";

let pass = 0, fail = 0;
function t(name, ok, extra) { if (ok) { pass++; console.log("  ✅ " + name); } else { fail++; console.log("  ❌ " + name + (extra ? "  ·  " + extra : "")); } }

/* ---- छोटा static server (सिर्फ़ repo के भीतर) ---- */
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "application/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".png": "image/png", ".webp": "image/webp", ".svg": "image/svg+xml", ".jpg": "image/jpeg", ".ico": "image/x-icon" };
function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      let p = decodeURIComponent(req.url.split("?")[0]);
      if (p.endsWith("/")) p += "index.html";
      let f = path.normalize(path.join(ROOT, p));
      /* उलटी जाँच के लिए: बदली हुई player/loader फ़ाइल (सिर्फ़ इस जाँच-server में; website पर नहीं) */
      if (p === "/assets/vqr-player.js" && process.env.VQR_PLAYER_FILE) f = process.env.VQR_PLAYER_FILE;
      if (p === "/assets/course-lesson.js" && process.env.VQR_LOADER_FILE) f = process.env.VQR_LOADER_FILE;
      if (p === "/assets/vqr-player.css" && process.env.VQR_CSS_FILE) f = process.env.VQR_CSS_FILE;
      if (f.indexOf(ROOT + path.sep) !== 0 && f !== process.env.VQR_PLAYER_FILE && f !== process.env.VQR_LOADER_FILE && f !== process.env.VQR_CSS_FILE) { rsp.writeHead(404); return rsp.end("404"); }
      if (!fs.existsSync(f) || !fs.statSync(f).isFile()) { rsp.writeHead(404); return rsp.end("404"); }
      rsp.writeHead(200, { "Content-Type": TYPES[path.extname(f)] || "application/octet-stream" });
      fs.createReadStream(f).pipe(rsp);
    });
    srv.listen(0, "127.0.0.1", () => res(srv));
  });
}

/* ---- नमूने ---- */
const FAR = "2099-01-01";
const V = (id, title, extra) => Object.assign({ id: id, title: title, channel: "नमूना चैनल", duration_sec: 312, made_for_kids: false }, extra || {});
function list(lesson, items, over) {
  return Object.assign({ course_id: "SE026", lesson_id: lesson, language: "hi", checked_on: "2026-11-25", expires_on: FAR, show: 3,
    source: "YouTube", robot_version: "vqr-core v0.4.1-pilot", check_basis: "metadata_only", order_by: "ACS",
    disclosure_hi: "यह सूची और इसका क्रम ACS ने चुना है। यह YouTube का खोज-नतीजा नहीं है। ACS के रोबोट ने वीडियो देखा-सुना नहीं, सिर्फ़ YouTube की दी लिखित जानकारी जाँची। वीडियो YouTube से चलते हैं।",
    list: items }, over || {});
}
const G = n => "GOODvideo0" + n;            /* 11 अक्षर */
const FIVE = [V(G(1), "नमूना वीडियो 1: UPI से सुरक्षित भुगतान"), V(G(2), "नमूना वीडियो 2: QR code की सच्चाई"),
  V(G(3), "नमूना वीडियो 3: ठगी हो तो 1930"), V(G(4), "नमूना वीडियो 4: PIN कब डालें"), V(G(5), "नमूना वीडियो 5: रसीद की आदत")];

const FAKE_YT = `window.YT={Player:function(el,o){(window.__yt=window.__yt||[]).push({id:o.videoId,host:o.host,pv:o.playerVars});
  var f=document.createElement("iframe");f.setAttribute("data-fake","1");f.title="fake "+o.videoId;el.parentNode.replaceChild(f,el);
  if(/^DEAD/.test(o.videoId))setTimeout(function(){o.events.onError({data:100})},40);
  if(/^SOFT/.test(o.videoId))setTimeout(function(){o.events.onError({data:5})},40);
  if(/^TWICE/.test(o.videoId)){setTimeout(function(){o.events.onError({data:100})},40);setTimeout(function(){o.events.onError({data:150})},80);}}};
  setTimeout(function(){window.onYouTubeIframeAPIReady&&window.onYouTubeIframeAPIReady()},10);`;
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADElEQVR42mMQ0tYDAAEMAI0q4D8wAAAAAElFTkSuQmCC", "base64");

/* sc = { json: obj|string|null(=404)|"HANG", apiFail, noThumb:[ids] } */
async function open(browser, base, url, sc, dev) {
  const ctx = await browser.newContext(Object.assign({ serviceWorkers: "block" }, dev || { viewport: { width: 1366, height: 900 } }));
  const page = await ctx.newPage();
  page.setDefaultTimeout(5000);                                      /* ग़ायब बटन पर 30 सेकंड न अटके */
  const seen = { vqrJs: 0, vqrCss: 0, json: [], errors: [], popups: [] };
  page.on("pageerror", e => seen.errors.push(String(e && e.message)));
  page.on("request", r => { const u = r.url(); if (/\/assets\/vqr-player\.js/.test(u)) seen.vqrJs++; if (/\/assets\/vqr-player\.css/.test(u)) seen.vqrCss++; });
  ctx.on("page", p => { if (p !== page) seen.popups.push(p.url()); });
  await ctx.route("**/*", async route => {
    const u = route.request().url();
    if (u.startsWith(base)) {
      if (/\/assets\/vqr\/SE026\//.test(u)) {
        seen.json.push(u.slice(base.length));
        if (sc.json === "HANG") return;                             /* कभी जवाब नहीं */
        if (sc.json === null || sc.json === undefined) return route.fulfill({ status: 404, body: "404" });
        return route.fulfill({ status: 200, contentType: "application/json", body: typeof sc.json === "string" ? sc.json : JSON.stringify(sc.json) });
      }
      return route.continue();
    }
    if (u === "https://www.youtube.com/iframe_api") return sc.apiFail ? route.abort() : route.fulfill({ status: 200, contentType: "application/javascript", body: FAKE_YT });
    if (u.startsWith("https://i.ytimg.com/vi/")) {
      const id = u.split("/")[4];
      return (sc.noThumb || []).indexOf(id) >= 0 ? route.fulfill({ status: 404, body: "" }) : route.fulfill({ status: 200, contentType: "image/png", body: PNG });
    }
    if (u.startsWith("https://wa.me/")) return route.fulfill({ status: 200, contentType: "text/html", body: "<p>wa</p>" });
    return route.abort();                                            /* बाक़ी बाहर का कुछ नहीं */
  });
  await page.goto(base + url, { waitUntil: "load" });
  return { ctx, page, seen };
}
const settle = (page, ms) => page.waitForTimeout(ms || 600);
const state = page => page.evaluate(() => {
  const sec = document.querySelector("section.lsn-video");
  const intro = sec && [].slice.call(sec.querySelectorAll("p")).filter(p => !/lsn-vid(row|note)/.test(p.className))[0];
  return { ran: !!(sec && sec.getAttribute("data-vqr")), box: !!document.querySelector(".vqr-box"),
    cards: [].slice.call(document.querySelectorAll(".vqr-card")).map(c => c.getAttribute("data-id")),
    intro: intro ? intro.textContent : null, search: !!(sec && sec.querySelector("a.lsn-vidbtn[href^='https://www.youtube.com/results?search_query=']")),
    note: (document.querySelector(".vqr-note") || {}).textContent || "", disc: (document.querySelector(".vqr-disc") || {}).textContent || "",
    shown: ["vqr-grid", "vqr-note", "vqr-disc", "vqr-undo"].reduce((m, k) => { const e = document.querySelector("." + k); m[k] = !!(e && e.offsetParent !== null && e.getClientRects().length); return m; }, {}),
    react: !!document.getElementById("lsnReact"), text: sec ? sec.textContent : "" };
});
const unchanged = s => s.ran && !s.box && s.cards.length === 0 && s.intro === ORIG_INTRO && s.search;

(async () => {
  const srv = await serve();
  const base = "http://127.0.0.1:" + srv.address().port;
  const browser = await chromium.launch();
  const PHONE = devices["Pixel 5"];
  let o, s;
  try {
    console.log("vqr-player जाँच · पाठ " + L611);

    /* ---- 0. बिना browser: पाठ-पते, loader का दायरा ---- */
    const dmtDir = path.join(ROOT, "courses/hi/digital-mitra-basic");
    const pages = fs.readdirSync(dmtDir).filter(f => /^dmt-\d{1,2}-\d{2}-[a-z0-9-]+\.html$/.test(f));
    const ids = pages.map(f => { const q = f.match(/^dmt-(\d{1,2})-(\d{2})-/); return "dmt-" + (+q[1]) + "." + q[2]; });
    const mdDir = path.join(ROOT, "generator/data/dmt_lessons_md");
    const mdIds = fs.readdirSync(mdDir).filter(f => /\.md$/.test(f)).map(f => (fs.readFileSync(path.join(mdDir, f), "utf8").match(/^lesson_id:\s*(\S+)/m) || [])[1]);
    t("109 पाठ-पन्ने, हर पते से बना पाठ-ID रोबोट के पाठ-ID से मिलता है", pages.length === 109 && new Set(ids).size === 109 && ids.every(x => mdIds.indexOf(x) >= 0) && mdIds.length === 109, pages.length + "/" + mdIds.length);
    const htmls = pages.map(f => fs.readFileSync(path.join(dmtDir, f), "utf8"));
    t("हर पाठ में वीडियो-हिस्सा और course-lesson.js", htmls.every(h => h.indexOf('<section class="lsn-sec lsn-video">') >= 0 && h.indexOf('<script src="/assets/course-lesson.js" defer></script>') >= 0));
    /* वही फ़ाइलें पढ़ो जो server दे रहा है (उलटी जाँच में बदली हुई प्रति) */
    const cl = fs.readFileSync(process.env.VQR_LOADER_FILE || path.join(ROOT, "assets/course-lesson.js"), "utf8"), pl = fs.readFileSync(process.env.VQR_PLAYER_FILE || path.join(ROOT, "assets/vqr-player.js"), "utf8");
    let lre = /^$NAHIN/;
    try { lre = new RegExp((cl.match(/if\(!\/(\^\\\/courses\\\/hi\\\/digital-mitra-basic[^\n]*?)\/\.test\(location\.pathname\)\) return;/) || [])[1] || "^$NAHIN"); } catch (e) { lre = /^$NAHIN/; }
    const all = [];
    (function walk(d, rel) { fs.readdirSync(d, { withFileTypes: true }).forEach(e => { if (e.name[0] === "." || e.name === "node_modules") return;
      const r = rel + "/" + e.name; if (e.isDirectory()) walk(path.join(d, e.name), r); else if (/\.html$/.test(e.name)) all.push(r); }); })(ROOT, "");
    const hit = all.filter(u => lre.test(u));
    t("loader सिर्फ़ इन 109 पाठ-पतों पर (repo के " + all.length + " HTML में से)", hit.length === 109 && hit.every(u => u.indexOf("/courses/hi/digital-mitra-basic/dmt-") === 0), hit.length + "");
    t("loader और player का पता-नियम एक", pl.indexOf("var PATH_RE = /^\\/courses\\/hi\\/digital-mitra-basic\\/dmt-(\\d{1,2})-(\\d{2})-[a-z0-9-]+\\.html$/;") >= 0 && String(lre) === "/^\\/courses\\/hi\\/digital-mitra-basic\\/dmt-\\d{1,2}-\\d{2}-[a-z0-9-]+\\.html$/");

    /* ---- 1. शून्य: सूची नहीं / टूटी / पुरानी / ग़लत → पन्ना वैसा ही ---- */
    o = await open(browser, base, L611, { json: null }); await settle(o.page); s = await state(o.page);
    t("सूची नहीं (404): player चला, पन्ना वैसा ही, YouTube-खोज बटन बचा", unchanged(s) && o.seen.vqrJs === 1 && o.seen.vqrCss === 1, JSON.stringify(s).slice(0, 200));
    t("सूची का पता: /assets/vqr/SE026/dmt-6.11.json?d=आज", o.seen.json.length === 1 && /^\/assets\/vqr\/SE026\/dmt-6\.11\.json\?d=\d{4}-\d{2}-\d{2}$/.test(o.seen.json[0]), o.seen.json.join());
    t("पुरानी सुविधाएँ चलती रहीं (👍👎 पट्टी) · कोई JS-त्रुटि नहीं", s.react && o.seen.errors.length === 0, o.seen.errors.join());
    await o.ctx.close();
    for (const [name, json] of [["टूटी सूची (JSON नहीं)", "{not json"], ["पुरानी सूची (expires_on बीता)", list("dmt-6.11", FIVE, { expires_on: "2020-01-01" })],
      ["दूसरे पाठ की सूची", list("dmt-6.12", FIVE)], ["दूसरे कोर्स की सूची", list("dmt-6.11", FIVE, { course_id: "SE022" })],
      ["list ग़ायब", list("dmt-6.11", FIVE, { list: "x" })], ["सब ID ग़लत (0 वीडियो)", list("dmt-6.11", [V("abc", "x"), V("<b>x</b>bad1", "y"), V("ABCDEFGHIJKL", "z"), V(G(1), "")])],
      ["ख़ाली list", list("dmt-6.11", [])], ["expires_on ग़लत रूप", list("dmt-6.11", FIVE, { expires_on: "kal" })]]) {
      o = await open(browser, base, L611, { json: json }); await settle(o.page); s = await state(o.page);
      t(name + ": पन्ना वैसा ही", unchanged(s) && o.seen.errors.length === 0, JSON.stringify(s).slice(0, 160) + o.seen.errors.join());
      await o.ctx.close();
    }
    o = await open(browser, base, L611, { json: "HANG" }); await o.page.waitForTimeout(9000); s = await state(o.page);
    t("सूची अटकी (8 सेकंड): पन्ना वैसा ही, पढ़ाई नहीं रुकी", unchanged(s) && s.react && o.seen.errors.length === 0);
    await o.ctx.close();

    /* ---- 2. एक, दो, तीन, और 3 से ज़्यादा ---- */
    for (const n of [1, 2, 3, 5]) {
      o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE.slice(0, n), { show: 9 }) }); await settle(o.page); s = await state(o.page);
      const want = Math.min(n, 3);
      t(n + " वीडियो की सूची: " + want + " कार्ड (ऊपर के 3 से ज़्यादा कभी नहीं), क्रम वही", s.cards.length === want && s.cards.join() === FIVE.slice(0, want).map(v => v.id).join(), s.cards.join());
      if (n === 3) {
        t("ऊपर की पंक्ति बदली: रोबोट के चुने वीडियो", /ACS के रोबोट ने चुने हैं/.test(s.intro) && s.search);
        t("खुलासा दिखा: ACS ने चुना, YouTube का खोज-नतीजा नहीं, देखा-सुना नहीं, जाँच-तारीख़", /ACS ने चुना है/.test(s.disc) && /खोज-नतीजा नहीं/.test(s.disc) && /देखा-सुना नहीं/.test(s.disc) && /2026-11-25/.test(s.disc));
        t("player छूने से पहले YouTube का कुछ नहीं उतरा (कम data)", (await o.page.evaluate(() => !window.YT && !document.querySelector("script[src*='youtube.com/iframe_api']"))));
      }
      await o.ctx.close();
    }

    /* ---- 3. ख़राब ID, ख़तरनाक शीर्षक, फ़ालतू खाने ---- */
    const mix = [V("bad", "x"), V("<script>x</s", "y"), V(G(1), '<img src=x onerror="window.__x=1">ठग शीर्षक', { shikshak: "ACS-2026-111111", total: 99 }), V(G(1), "दोहराया"),
      V("GOODvideo0" + "9", "  ", {}), V(G(2), "दूसरा", { channel: { a: 1 } }), V(G(3), "तीसरा", { duration_sec: "abc" })];
    o = await open(browser, base, L611, { json: list("dmt-6.11", mix, { api_key: "AIzaNAMUNA-KUNJI", shikshak_id: "ACS-2026-222222" }) }); await settle(o.page); s = await state(o.page);
    t("ग़लत/दोहराए/ख़ाली-शीर्षक ID छूटे: सिर्फ़ 3 सही", s.cards.join() === [G(1), G(2), G(3)].join(), s.cards.join());
    t("शीर्षक का HTML सिर्फ़ अक्षर बना (img नहीं बना, कोड नहीं चला)", (await o.page.evaluate(() => !document.querySelector(".vqr-title img") && window.__x === undefined)) && /<img src=x/.test(s.text));
    t("फ़ालतू खाने (शिक्षक-ID, कुंजी, अंक) पन्ने पर कहीं नहीं", !/ACS-2026-\d{6}/.test(s.text) && !/AIza/.test(s.text) && !/99/.test(s.text));
    await o.ctx.close();

    /* ---- 4. चलाना: YouTube का अपना player, youtube-nocookie ---- */
    o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='" + G(1) + "'] .vqr-poster"); await settle(o.page, 500);
    const yt = await o.page.evaluate(() => window.__yt || []);
    t("छूने पर YouTube का player: सही ID, youtube-nocookie, playsinline, rel 0", yt.length === 1 && yt[0].id === G(1) && yt[0].host === "https://www.youtube-nocookie.com" && yt[0].pv.playsinline === 1 && yt[0].pv.rel === 0, JSON.stringify(yt));
    t("player कार्ड के भीतर 16:9 में", (await o.page.evaluate(() => { const f = document.querySelector(".vqr-card iframe[data-fake]"); if (!f) return false; const r = f.getBoundingClientRect(); return Math.abs(r.width / r.height - 16 / 9) < 0.05; })));
    await o.page.click(".vqr-card[data-id='" + G(2) + "'] .vqr-poster"); await settle(o.page, 300);
    t("दूसरा वीडियो छूने पर API दोबारा नहीं उतरा", (await o.page.evaluate(() => document.querySelectorAll("script[src*='youtube.com/iframe_api']").length === 1 && window.__yt.length === 2)));
    await o.ctx.close();

    /* ---- 5. हटा वीडियो: उसकी जगह अगला; याद रहे ---- */
    const withDead = [V(G(1), "पहला"), V("DEADvideo01", "हटा हुआ"), V(G(3), "तीसरा"), V(G(4), "चौथा (बचा हुआ)")];
    o = await open(browser, base, L611, { json: list("dmt-6.11", withDead) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='DEADvideo01'] .vqr-poster"); await settle(o.page, 500); s = await state(o.page);
    t("YouTube बोला 'नहीं है' (100): उसकी जगह अगला (चौथा), बाक़ी जगह पर", s.cards.join() === [G(1), G(4), G(3)].join() && /अब नहीं चलता/.test(s.note) && /अगला वीडियो लगा/.test(s.note), s.cards.join() + " | " + s.note);
    t("यह बात इस फ़ोन पर याद (acsVqrDead)", (await o.page.evaluate(() => JSON.parse(localStorage.getItem("acsVqrDead") || "{}").DEADvideo01)) !== undefined);
    await o.page.reload({ waitUntil: "load" }); await settle(o.page); s = await state(o.page);
    t("दोबारा खोलने पर हटा वीडियो नहीं दिखा", s.cards.join() === [G(1), G(3), G(4)].join(), s.cards.join());
    await o.ctx.close();
    o = await open(browser, base, L611, { json: list("dmt-6.11", [V(G(1), "पहला"), V("SOFTvideo01", "अभी अटका"), V(G(3), "तीसरा")]) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='SOFTvideo01'] .vqr-poster"); await settle(o.page, 500); s = await state(o.page);
    t("छोटी त्रुटि (5): बचा वीडियो न हो तो कार्ड हटा, पर फ़ोन पर हमेशा के लिए याद नहीं", s.cards.join() === [G(1), G(3)].join() && (await o.page.evaluate(() => !JSON.parse(localStorage.getItem("acsVqrDead") || "{}").SOFTvideo01)));
    await o.ctx.close();
    o = await open(browser, base, L611, { json: list("dmt-6.11", [V("TWICEvideo1", "दो बार"), V(G(2), "दूसरा"), V(G(3), "तीसरा"), V(G(4), "चौथा")]) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='TWICEvideo1'] .vqr-poster"); await settle(o.page, 500); s = await state(o.page);
    t("YouTube दो बार त्रुटि भेजे: एक ही बार बदला (अगला लगा), कोई JS-त्रुटि नहीं", s.cards.join() === [G(4), G(2), G(3)].join() && o.seen.errors.length === 0, s.cards.join() + " " + o.seen.errors.join());
    await o.ctx.close();
    o = await open(browser, base, L611, { json: list("dmt-6.11", [V("DEADvideo01", "क"), V("DEADvideo02", "ख")]) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='DEADvideo01'] .vqr-poster"); await settle(o.page, 400);
    await o.page.click(".vqr-card[data-id='DEADvideo02'] .vqr-poster"); await settle(o.page, 400); s = await state(o.page);
    t("सब वीडियो हटे: डिब्बा गया, पुरानी पंक्ति और YouTube-खोज लौटे", !s.box && s.cards.length === 0 && s.intro === ORIG_INTRO && s.search, JSON.stringify(s).slice(0, 160));
    await o.ctx.close();

    /* ---- 6. रिपोर्ट: WhatsApp से ACS को; सूची नहीं बदलती; इस फ़ोन पर छिपे ---- */
    o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='" + G(2) + "'] .vqr-rep"); await settle(o.page, 200);
    const why = await o.page.$$eval(".vqr-card[data-id='" + G(2) + "'] .vqr-why-a", as => as.map(a => ({ t: a.textContent, h: a.getAttribute("href"), tg: a.target })));
    const txt = why.length ? decodeURIComponent(why[0].h.split("?text=")[1] || "") : "";
    t("⚑ पर 4 कारण, हर एक WhatsApp की कड़ी (ACS का नंबर, नई खिड़की)", why.length === 4 && why.every(w => w.h.indexOf("https://wa.me/919431210092?text=") === 0 && w.tg === "_blank"), JSON.stringify(why).slice(0, 200));
    t("संदेश में पाठ, वीडियो-ID, कारण और पन्ना; और कुछ नहीं", /पाठ: dmt-6\.11/.test(txt) && txt.indexOf("वीडियो: " + G(2)) >= 0 && /कारण: पाठ से मेल नहीं खाता/.test(txt) && /पन्ना: http/.test(txt) && txt.split("\n").length === 5, txt);
    await o.page.click(".vqr-card[data-id='" + G(2) + "'] .vqr-why-a"); await settle(o.page, 500); s = await state(o.page);
    t("कारण दबाया: WhatsApp खुला, वीडियो छिपा, अगला (चौथा) आया, 'भेजें दबाएँ' संदेश", o.seen.popups.some(u => u.indexOf("https://wa.me/") === 0) && s.cards.join() === [G(1), G(4), G(3)].join() && /भेजें/.test(s.note), s.cards.join() + " | " + s.note);
    t("रिपोर्ट ने कोई सूची नहीं बदली (सिर्फ़ GET, website पर कुछ नहीं भेजा)", (await o.page.evaluate(() => JSON.parse(localStorage.getItem("acsVqrHide") || "{}")))["GOODvideo02"] !== undefined && o.seen.json.length === 1);
    await o.page.click(".vqr-undo"); await settle(o.page, 300); s = await state(o.page);
    t("'वापस दिखाएँ': वीडियो लौटा, क्रम पहले जैसा", s.cards.join() === [G(1), G(2), G(3)].join() && (await o.page.evaluate(() => !JSON.parse(localStorage.getItem("acsVqrHide") || "{}").GOODvideo02)), s.cards.join());
    await o.page.click(".vqr-card[data-id='" + G(3) + "'] .vqr-rep"); await o.page.click(".vqr-card[data-id='" + G(3) + "'] .vqr-why-no"); s = await state(o.page);
    t("'रहने दें': कुछ नहीं छिपा", s.cards.join() === [G(1), G(2), G(3)].join() && (await o.page.$$(".vqr-why")).length === 0);
    await o.ctx.close();
    /* ChatGPT-ऑडिट P2 (25-Nov): आख़िरी वीडियो रिपोर्ट से छिपे, तब भी "वापस दिखाएँ" बचे */
    o = await open(browser, base, L611, { json: list("dmt-6.11", [V(G(1), "अकेला")]) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='" + G(1) + "'] .vqr-rep"); await settle(o.page, 200);
    await o.page.click(".vqr-card[data-id='" + G(1) + "'] .vqr-why-a"); await settle(o.page, 500); s = await state(o.page);
    t("आख़िरी वीडियो रिपोर्ट से छिपा: संदेश और 'वापस दिखाएँ' दिखते रहे", s.cards.length === 0 && s.shown["vqr-note"] && s.shown["vqr-undo"] && /भेजें/.test(s.note), JSON.stringify(s.shown) + " | " + s.note);
    t("उसी समय: ख़ाली कार्ड-जगह और ACS-पंक्ति छिपी, पुरानी पंक्ति और YouTube-खोज लौटे", !s.shown["vqr-grid"] && !s.shown["vqr-disc"] && s.intro === ORIG_INTRO && s.search, JSON.stringify(s.shown) + " | " + s.intro);
    if (await o.page.$(".vqr-undo")) { await o.page.click(".vqr-undo"); await settle(o.page, 300); }   /* बटन ही न हो तो अटको नहीं, अगली जाँचें fail बताएँ */
    s = await state(o.page);
    t("'वापस दिखाएँ' दबाया: वीडियो लौटा, कार्ड-जगह व ACS-पंक्ति फिर दिखीं, संदेश गया", s.cards.join() === G(1) && s.shown["vqr-grid"] && s.shown["vqr-disc"] && !s.shown["vqr-note"] && /रोबोट ने चुने/.test(s.intro) && (await o.page.evaluate(() => !JSON.parse(localStorage.getItem("acsVqrHide") || "{}")["GOODvideo01"])), JSON.stringify(s.shown) + " | " + s.cards.join());
    await o.page.reload({ waitUntil: "load" }); await settle(o.page); s = await state(o.page);
    t("दोबारा खोलने पर भी वीडियो दिखा (छिपाना सच में हटा), कोई JS-त्रुटि नहीं", s.cards.join() === G(1) && o.seen.errors.length === 0, s.cards.join() + " " + o.seen.errors.join());
    await o.ctx.close();
    /* छिपाकर पन्ना बंद किया, फिर खोला: इकलौता वीडियो छिपा है, तो पन्ना पहले जैसा (बटन का काम पूरा) */
    o = await open(browser, base, L611, { json: list("dmt-6.11", [V(G(1), "अकेला")]) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='" + G(1) + "'] .vqr-rep"); await settle(o.page, 200);
    await o.page.click(".vqr-card[data-id='" + G(1) + "'] .vqr-why-a"); await settle(o.page, 500);
    await o.page.reload({ waitUntil: "load" }); await settle(o.page); s = await state(o.page);
    t("रिपोर्ट के बाद पन्ना दोबारा खुला: छिपा वीडियो नहीं, पन्ना पहले जैसा", unchanged(s), JSON.stringify(s).slice(0, 160));
    await o.ctx.close();

    /* ---- 7. YouTube न उतरे / चित्र न खुले ---- */
    o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE), apiFail: true }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='" + G(1) + "'] .vqr-poster"); await settle(o.page, 800);
    const na = await o.page.evaluate(() => { const a = document.querySelector(".vqr-noapi a"); return a ? a.getAttribute("href") : ""; });
    t("YouTube का player न उतरा: साफ़ संदेश + YouTube पर खोलने की कड़ी", na === "https://www.youtube.com/watch?v=" + G(1));
    await o.ctx.close();
    o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE), noThumb: [G(2)] }); await settle(o.page, 400);
    await o.page.evaluate(() => document.querySelector(".vqr-box").scrollIntoView()); await settle(o.page, 900);   /* चित्र lazy हैं: दिखने पर उतरते */
    const fb = await o.page.evaluate(id => { const c = document.querySelector(".vqr-card[data-id='" + id + "']"); const f = c && c.querySelector(".vqr-fb"); return { img: !!(c && c.querySelector("img")), fb: f ? getComputedStyle(f).display : "" }; }, G(2));
    t("चित्र न खुला: ख़ाली नहीं, '▶ वीडियो' लिखा दिखा", !fb.img && fb.fb !== "none", JSON.stringify(fb));
    await o.ctx.close();

    /* ---- 8. पाठ-पते से सही सूची; दूसरे कोर्स और परिचय-पन्ने पर कुछ नहीं ---- */
    for (const [u, id] of [[L101, "dmt-1.01"], [L210, "dmt-2.10"]]) {
      o = await open(browser, base, u, { json: null }); await settle(o.page);
      t(id + " पाठ: सूची का सही पता", o.seen.json.length === 1 && o.seen.json[0].indexOf("/assets/vqr/SE026/" + id + ".json?d=") === 0, o.seen.json.join());
      await o.ctx.close();
    }
    for (const [u, nm] of [[WLD, "वेल्डिंग पाठ"], [TWV, "टू-व्हीलर पाठ"], [INTRO, "डिजिटल मित्र परिचय-पन्ना"]]) {
      o = await open(browser, base, u, { json: list("dmt-6.11", FIVE) }); await settle(o.page);
      const r = await o.page.evaluate(() => ({ box: !!document.querySelector(".vqr-box"), mark: !!document.querySelector("[data-vqr]"), react: !!document.getElementById("lsnReact") }));
      t(nm + ": player उतरा ही नहीं, सूची माँगी ही नहीं" + (nm === "डिजिटल मित्र परिचय-पन्ना" ? "" : ", पुरानी 👍👎 पट्टी चलती"),
        o.seen.vqrJs === 0 && o.seen.vqrCss === 0 && o.seen.json.length === 0 && !r.box && !r.mark && (nm === "डिजिटल मित्र परिचय-पन्ना" || r.react) && o.seen.errors.length === 0, JSON.stringify(r) + o.seen.errors.join());
      await o.ctx.close();
    }

    /* ---- 9. फ़ोन और laptop पर रूप ---- */
    for (const [nm, dev] of [["फ़ोन (Pixel 5)", PHONE], ["laptop 1366", null], ["छोटा फ़ोन 320", { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]]) {
      o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE) }, dev); await settle(o.page, 900);
      await o.page.click(".vqr-card[data-id='" + G(3) + "'] .vqr-rep"); await settle(o.page, 200);
      const lay = await o.page.evaluate(() => {
        const bad = [], small = [];
        document.querySelectorAll(".vqr-box *").forEach(e => {
          if ([].some.call(e.childNodes, n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 16) bad.push(e.className + ":" + getComputedStyle(e).fontSize);
        });
        document.querySelectorAll(".vqr-rep,.vqr-why-a,.vqr-why-no").forEach(e => { const r = e.getBoundingClientRect(); if (r.height < 44) small.push(e.className + ":" + r.height); });
        const cards = [].map.call(document.querySelectorAll(".vqr-card"), c => c.getBoundingClientRect());
        return { over: document.documentElement.scrollWidth - window.innerWidth, bad: bad, small: small, w: window.innerWidth,
                 cols: new Set(cards.map(r => Math.round(r.top))).size, inside: cards.every(r => r.left >= 0 && r.right <= window.innerWidth + 1) };
      });
      t(nm + ": आड़ा scroll नहीं, कार्ड स्क्रीन के भीतर", lay.over <= 0 && lay.inside, JSON.stringify(lay));
      t(nm + ": सब अक्षर 16px या बड़े", lay.bad.length === 0, lay.bad.join(" "));
      t(nm + ": बटन छूने लायक़ (44px)", lay.small.length === 0, lay.small.join(" "));
      t(nm + ": " + (lay.w >= 760 ? "3 कार्ड एक पंक्ति में" : "कार्ड एक के नीचे एक"), lay.w >= 760 ? lay.cols === 1 : lay.cols === 3, JSON.stringify(lay));
      if (SHOTS) {
        fs.mkdirSync(SHOTS, { recursive: true });
        await o.page.click(".vqr-card[data-id='" + G(3) + "'] .vqr-rep");      /* कारण-डिब्बा बंद करके फ़ोटो */
        const secEl = await o.page.$("section.lsn-video");
        await secEl.screenshot({ path: path.join(SHOTS, "vqr-" + (lay.w >= 760 ? "laptop" : lay.w <= 320 ? "chhota-fon" : "fon") + ".png") });
      }
      await o.ctx.close();
    }
    if (SHOTS) {
      o = await open(browser, base, L611, { json: null }, PHONE); await settle(o.page);
      await (await o.page.$("section.lsn-video")).screenshot({ path: path.join(SHOTS, "vqr-fon-suchi-nahin.png") });
      await o.ctx.close();
    }
  } catch (e) { t("जाँच-यंत्र ख़ुद अटका: " + (e && e.message), false); }
  await browser.close(); srv.close();
  console.log("\n" + (fail ? "⛔ FAIL · " + pass + " पास, " + fail + " fail" : "🏁 PASS · " + pass + " पास, 0 fail") + " · vqr-player v1.0.1");
  process.exit(fail ? 1 : 0);
})();
