#!/usr/bin/env node
/* ============================================================================
   dev_vqr_player_check.js v2.0 · 25-Nov-2026 · डिजिटल मित्र वीडियो-player (VQR) + बाईं पाठ-सूची की जाँच
   असली Chromium (playwright) में असली पाठ-पन्ने खोलकर। अपना छोटा server, बाहर कुछ नहीं:
   - सूची (assets/vqr/SE026/*.json), YouTube का iframe_api, i.ytimg चित्र और wa.me
     सब नक़ली (route से)। असली YouTube यहाँ नहीं चलता: यह सच्ची सीमा है।
   - service worker बंद (route उसके पीछे न छिपे)।
   चलाना:  node generator/dev_vqr_player_check.js [--shots <folder>]
   आख़िरी पंक्ति: 🏁 PASS · N पास, 0 fail   (कोई fail = exit 1)
   v1.1: ChatGPT-ऑडिट P2 (आख़िरी वीडियो रिपोर्ट से छिपे, तब भी "वापस दिखाएँ") की 5 जाँचें।
   v2.0 (Founder, 25-Nov): वीडियो-हिस्सा टेस्ट से पहले (सब 109 पाठ, सूची हो या न हो) · वीडियो पाठ
        के बीच में (हर वीडियो का अपना डिब्बा; पहले दो पाठ के बीच, आख़िरी वीडियो-हिस्से में) ·
        डिब्बा हटे तो गिनती/खुलासा/पंक्ति फिर सच · छपाई में वीडियो का पता · laptop पर बाईं
        पाठ-सूची (course-toc.js) की पूरी जाँच · फ़ोन पर पाठ-सूची का data उतरता ही नहीं।
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
const OVR = { "/assets/vqr-player.js": process.env.VQR_PLAYER_FILE, "/assets/course-lesson.js": process.env.VQR_LOADER_FILE,
  "/assets/vqr-player.css": process.env.VQR_CSS_FILE, "/assets/course-toc.js": process.env.CTOC_JS_FILE, "/assets/course-toc.css": process.env.CTOC_CSS_FILE,
  "/assets/toc/SE026.json": process.env.CTOC_JSON_FILE };
function serve() {
  return new Promise(res => {
    const srv = http.createServer((req, rsp) => {
      let p = decodeURIComponent(req.url.split("?")[0]);
      if (p.endsWith("/")) p += "index.html";
      let f = path.normalize(path.join(ROOT, p));
      /* उलटी जाँच के लिए: बदली हुई player/loader/पाठ-सूची फ़ाइल (सिर्फ़ इस जाँच-server में; website पर नहीं) */
      const ovr = OVR[p];
      if (ovr) f = ovr;
      if (f.indexOf(ROOT + path.sep) !== 0 && f !== ovr) { rsp.writeHead(404); return rsp.end("404"); }
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

/* sc = { json: obj|string|null(=404)|"HANG"|fn(lessonId), apiFail, noThumb:[ids], toc: undefined(=असली)|null(=404)|obj|string,
          init: {localStorage की कुंजी: मान} } */
async function open(browser, base, url, sc, dev) {
  const ctx = await browser.newContext(Object.assign({ serviceWorkers: "block" }, dev || { viewport: { width: 1366, height: 900 } }));
  if (sc.init) await ctx.addInitScript(o => { try { for (const k in o) localStorage.setItem(k, o[k]); } catch (e) {} }, sc.init);
  const page = await ctx.newPage();
  page.setDefaultTimeout(5000);                                      /* ग़ायब बटन पर 30 सेकंड न अटके */
  const seen = { vqrJs: 0, vqrCss: 0, json: [], errors: [], popups: [], toc: 0, tocJs: 0 };
  page.on("pageerror", e => seen.errors.push(String(e && e.message)));
  page.on("request", r => { const u = r.url(); if (/\/assets\/vqr-player\.js/.test(u)) seen.vqrJs++; if (/\/assets\/vqr-player\.css/.test(u)) seen.vqrCss++;
    if (/\/assets\/course-toc\.js/.test(u)) seen.tocJs++; });
  ctx.on("page", p => { if (p !== page) seen.popups.push(p.url()); });
  await ctx.route("**/*", async route => {
    const u = route.request().url();
    if (u.startsWith(base)) {
      if (/\/assets\/vqr\/SE026\//.test(u)) {
        seen.json.push(u.slice(base.length));
        let j = sc.json;
        if (typeof j === "function") j = j((u.match(/\/(dmt-\d+\.\d+)\.json/) || [])[1]);
        if (j === "HANG") return;                                    /* कभी जवाब नहीं */
        if (j === null || j === undefined) return route.fulfill({ status: 404, body: "404" });
        return route.fulfill({ status: 200, contentType: "application/json", body: typeof j === "string" ? j : JSON.stringify(j) });
      }
      if (/\/assets\/toc\/SE026\.json/.test(u)) {
        seen.toc++;
        if (sc.toc === undefined) return route.continue();
        if (sc.toc === null) return route.fulfill({ status: 404, body: "404" });
        return route.fulfill({ status: 200, contentType: "application/json", body: typeof sc.toc === "string" ? sc.toc : JSON.stringify(sc.toc) });
      }
      if (sc.html && u.split("?")[0] === base + url) {                /* नमूना-पन्ना: असली पाठ में एक बदलाव (जाँच-server में ही) */
        const h = fs.readFileSync(path.join(ROOT, url), "utf8");
        return route.fulfill({ status: 200, contentType: "text/html; charset=utf-8", body: sc.html(h) });
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
/* पन्ने की हालत: वीडियो-हिस्सा, हर वीडियो-डिब्बा (slot), संदेश, खुलासा */
const state = page => page.evaluate(() => {
  const sec = document.querySelector("section.lsn-video"), quiz = document.querySelector("section.lsn-quiz");
  const intro = sec && [].slice.call(sec.querySelectorAll("p")).filter(p => !/lsn-vid(row|note)/.test(p.className))[0];
  const vis = e => !!(e && e.offsetParent !== null && e.getClientRects().length);
  const boxes = [].slice.call(document.querySelectorAll(".vqr-box"));
  const slots = boxes.map(b => ({ inSec: !!(sec && sec.contains(b)), mid: b.classList.contains("vqr-mid"), inArt: !!(sec && b.parentNode === sec.parentNode),
    lab: (b.querySelector(".vqr-lab") || {}).textContent || "", labShown: vis(b.querySelector(".vqr-lab")),
    disc: (b.querySelector(".vqr-disc") || {}).textContent || "", discShown: vis(b.querySelector(".vqr-disc")),
    cards: [].slice.call(b.querySelectorAll(".vqr-card")).map(c => c.getAttribute("data-id")),
    note: vis(b.querySelector(".vqr-note")) ? b.querySelector(".vqr-note").textContent : "",
    prev: b.previousElementSibling ? b.previousElementSibling.className : "", next: b.nextElementSibling ? b.nextElementSibling.className : "" }));
  const shownDiscs = slots.filter(x => x.discShown);
  return { ran: !!(sec && sec.getAttribute("data-vqr")), box: boxes.length > 0, nbox: boxes.length, slots: slots,
    cards: [].slice.call(document.querySelectorAll(".vqr-card")).map(c => c.getAttribute("data-id")),
    intro: intro ? intro.textContent : null, search: !!(sec && sec.querySelector("a.lsn-vidbtn[href^='https://www.youtube.com/results?search_query=']")),
    note: slots.map(x => x.note).filter(Boolean).join(" | "),
    disc: shownDiscs.length ? shownDiscs[shownDiscs.length - 1].disc : "",
    shown: ["vqr-grid", "vqr-note", "vqr-disc", "vqr-undo"].reduce((m, k) => { m[k] = [].some.call(document.querySelectorAll("." + k), vis); return m; }, {}),
    react: !!document.getElementById("lsnReact"), text: (sec ? sec.textContent : "") + boxes.map(b => b.textContent).join(" "),
    vidFirst: !!(sec && quiz && (sec.compareDocumentPosition(quiz) & 4)) };
});
const unchanged = s => s.ran && !s.box && s.cards.length === 0 && s.intro === ORIG_INTRO && s.search && s.vidFirst;
const labs = s => s.slots.filter(x => x.labShown).map(x => (x.lab.match(/वीडियो (\d+ \/ \d+)/) || [])[1]).join(",");

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
    t("सूची नहीं (404): player चला, वीडियो-हिस्सा टेस्ट से पहले, बाक़ी पन्ना वैसा ही, YouTube-खोज बटन बचा", unchanged(s) && o.seen.vqrJs === 1 && o.seen.vqrCss === 1, JSON.stringify(s).slice(0, 200));
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

    /* ---- 2. एक, दो, तीन, और 3 से ज़्यादा: हर वीडियो अपने डिब्बे में, पाठ के बीच ---- */
    const FULL = d => /ACS ने चुना है/.test(d) && /खोज-नतीजा नहीं/.test(d) && /देखा-सुना नहीं/.test(d) && /2026-11-25/.test(d);
    for (const n of [1, 2, 3, 5]) {
      o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE.slice(0, n), { show: 9 }) }); await settle(o.page); s = await state(o.page);
      const want = Math.min(n, 3);
      t(n + " वीडियो की सूची: " + want + " कार्ड (ऊपर के 3 से ज़्यादा कभी नहीं), क्रम वही", s.cards.length === want && s.cards.join() === FIVE.slice(0, want).map(v => v.id).join(), s.cards.join());
      const sl = s.slots;
      t(n + " वीडियो: " + want + " डिब्बे, हर डिब्बे में 1 वीडियो, गिनती " + Array.from({ length: want }, (_, i) => (i + 1) + "/" + want).join(" "),
        s.nbox === want && sl.every(x => x.cards.length === 1) && labs(s) === Array.from({ length: want }, (_, i) => (i + 1) + " / " + want).join(","), labs(s));
      t(n + " वीडियो: पहले " + (want - 1) + " डिब्बे पाठ के बीच (दो पाठ-हिस्सों के बीच), आख़िरी वीडियो-हिस्से में, वीडियो-हिस्सा टेस्ट से पहले",
        sl.slice(0, -1).every(x => !x.inSec && x.inArt && x.mid && /lsn-sec/.test(x.prev) && /lsn-sec/.test(x.next) && !/lsn-video|lsn-quiz|lsn-lead/.test(x.prev) && !/lsn-video|lsn-quiz/.test(x.next)) &&
        sl[sl.length - 1].inSec && !sl[sl.length - 1].mid && s.vidFirst, JSON.stringify(sl.map(x => [x.inSec, x.mid, x.prev, x.next])));
      t(n + " वीडियो: पूरा खुलासा (ACS ने चुना · खोज-नतीजा नहीं · देखा-सुना नहीं · जाँच-तारीख़) आख़िरी डिब्बे में; बाक़ी में छोटी पंक्ति",
        FULL(sl[sl.length - 1].disc) && sl.slice(0, -1).every(x => /खोज-नतीजा नहीं/.test(x.disc) && /पूरी बात नीचे आख़िरी वीडियो के साथ/.test(x.disc)), sl.map(x => x.disc).join(" | "));
      t(n + " वीडियो: ऊपर की पंक्ति सच बताए", s.search && (want === 1 ? s.intro === "नीचे का वीडियो ACS के रोबोट ने चुना है। और वीडियो चाहिए, तो YouTube पर खोजें।"
        : s.intro === "इस पाठ के बीच में ACS के रोबोट के चुने वीडियो लगे हैं। आख़िरी वीडियो यहीं नीचे है। और वीडियो चाहिए, तो YouTube पर खोजें।"), s.intro);
      if (n === 3) t("player छूने से पहले YouTube का कुछ नहीं उतरा (कम data)", (await o.page.evaluate(() => !window.YT && !document.querySelector("script[src*='youtube.com/iframe_api']"))));
      await o.ctx.close();
    }
    /* उलटी जाँच से पकड़ा (25-Nov): पाठ का आख़िरी हिस्सा बहुत लंबा हो, तब भी बीच वाला वीडियो वीडियो-हिस्से से सटे नहीं */
    const bigTail = h => { const i = h.indexOf('<section class="lsn-sec lsn-quiz"'), j = h.lastIndexOf("</section>", i);   /* HTML में टेस्ट पहले, वीडियो बाद: आख़िरी पाठ-हिस्सा = टेस्ट से ठीक पहले वाला */
      return h.slice(0, j) + "<p>" + "लंबा अभ्यास-पाठ ".repeat(2500) + "</p>" + h.slice(j); };
    o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE.slice(0, 3)), html: bigTail }); await settle(o.page); s = await state(o.page);
    const tailW = await o.page.evaluate(() => { const cs = document.querySelectorAll("article > section.lsn-sec:not(.lsn-lead):not(.lsn-quiz):not(.lsn-video)"), p = cs[cs.length - 1]; return p ? p.textContent.split(/\s+/).length : 0; });
    t("पाठ का आख़िरी हिस्सा बहुत लंबा (" + tailW + " शब्द): बीच के 2 वीडियो फिर भी दो पाठ-हिस्सों के बीच, वीडियो-हिस्से से सटे नहीं",
      tailW > 4000 && s.nbox === 3 && s.slots.slice(0, 2).every(x => !x.inSec && /lsn-sec/.test(x.next) && !/lsn-video/.test(x.next)) && s.slots[2].inSec && s.vidFirst, JSON.stringify(s.slots.map(x => [x.inSec, x.next])));
    await o.ctx.close();

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
    t("YouTube बोला 'नहीं है' (100): उसकी जगह अगला (चौथा), उसी डिब्बे में, बाक़ी जगह पर", s.cards.join() === [G(1), G(4), G(3)].join() && s.slots[1].cards.join() === G(4) && /अब नहीं चलता/.test(s.slots[1].note) && /अगला वीडियो लगा/.test(s.slots[1].note) && !s.slots[0].note && !s.slots[2].note, s.cards.join() + " | " + s.note);
    t("यह बात इस फ़ोन पर याद (acsVqrDead)", (await o.page.evaluate(() => JSON.parse(localStorage.getItem("acsVqrDead") || "{}").DEADvideo01)) !== undefined);
    await o.page.reload({ waitUntil: "load" }); await settle(o.page); s = await state(o.page);
    t("दोबारा खोलने पर हटा वीडियो नहीं दिखा", s.cards.join() === [G(1), G(3), G(4)].join(), s.cards.join());
    await o.ctx.close();
    o = await open(browser, base, L611, { json: list("dmt-6.11", [V(G(1), "पहला"), V("SOFTvideo01", "अभी अटका"), V(G(3), "तीसरा")]) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='SOFTvideo01'] .vqr-poster"); await settle(o.page, 500); s = await state(o.page);
    t("छोटी त्रुटि (5): बचा वीडियो न हो तो उसका डिब्बा हटा, पर फ़ोन पर हमेशा के लिए याद नहीं", s.cards.join() === [G(1), G(3)].join() && s.nbox === 2 && (await o.page.evaluate(() => !JSON.parse(localStorage.getItem("acsVqrDead") || "{}").SOFTvideo01)));
    t("डिब्बा हटा तो गिनती फिर सही: 1 / 2, 2 / 2", labs(s) === "1 / 2,2 / 2", labs(s));
    await o.ctx.close();
    o = await open(browser, base, L611, { json: list("dmt-6.11", [V("TWICEvideo1", "दो बार"), V(G(2), "दूसरा"), V(G(3), "तीसरा"), V(G(4), "चौथा")]) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='TWICEvideo1'] .vqr-poster"); await settle(o.page, 500); s = await state(o.page);
    t("YouTube दो बार त्रुटि भेजे: एक ही बार बदला (अगला लगा), कोई JS-त्रुटि नहीं", s.cards.join() === [G(4), G(2), G(3)].join() && o.seen.errors.length === 0, s.cards.join() + " " + o.seen.errors.join());
    await o.ctx.close();
    o = await open(browser, base, L611, { json: list("dmt-6.11", [V("DEADvideo01", "क"), V("DEADvideo02", "ख")]) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='DEADvideo01'] .vqr-poster"); await settle(o.page, 400);
    await o.page.click(".vqr-card[data-id='DEADvideo02'] .vqr-poster"); await settle(o.page, 400); s = await state(o.page);
    t("सब वीडियो हटे: सब डिब्बे गए, पुरानी पंक्ति और YouTube-खोज लौटे", !s.box && s.cards.length === 0 && s.intro === ORIG_INTRO && s.search, JSON.stringify(s).slice(0, 160));
    await o.ctx.close();
    /* आख़िरी (वीडियो-हिस्से वाला) डिब्बा हटा, बीच वाले बचे: गिनती, पूरा खुलासा और ऊपर की पंक्ति फिर सच */
    o = await open(browser, base, L611, { json: list("dmt-6.11", [V(G(1), "पहला"), V(G(2), "दूसरा"), V("DEADvideo03", "तीसरा")]) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='DEADvideo03'] .vqr-poster"); await settle(o.page, 500); s = await state(o.page);
    t("वीडियो-हिस्से का वीडियो हटा: बीच के 2 बचे, गिनती 1 / 2, 2 / 2", s.cards.join() === [G(1), G(2)].join() && s.nbox === 2 && s.slots.every(x => !x.inSec) && labs(s) === "1 / 2,2 / 2", labs(s) + " " + s.cards.join());
    t("पूरा खुलासा अब आख़िरी बचे डिब्बे में; 'पूरी बात नीचे' कहीं ख़ाली इशारा नहीं", FULL(s.slots[1].disc) && /पूरी बात नीचे आख़िरी वीडियो के साथ/.test(s.slots[0].disc), s.slots.map(x => x.disc).join(" | "));
    t("ऊपर की पंक्ति अब 'आख़िरी वीडियो यहीं नीचे' नहीं कहती", s.intro === "इस पाठ के बीच में ACS के रोबोट के चुने वीडियो लगे हैं। और वीडियो चाहिए, तो YouTube पर खोजें।", s.intro);
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
    t("'वापस दिखाएँ' दबाया: वीडियो लौटा, कार्ड-जगह व ACS-पंक्ति फिर दिखीं, संदेश गया", s.cards.join() === G(1) && s.shown["vqr-grid"] && s.shown["vqr-disc"] && !s.shown["vqr-note"] && /रोबोट ने चुना है/.test(s.intro) && (await o.page.evaluate(() => !JSON.parse(localStorage.getItem("acsVqrHide") || "{}")["GOODvideo01"])), JSON.stringify(s.shown) + " | " + s.cards.join());
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
    /* P2 बीच वाले डिब्बे पर: पाठ के बीच का वीडियो रिपोर्ट से छिपा (बचा वीडियो नहीं) */
    o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE.slice(0, 3)) }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='" + G(1) + "'] .vqr-rep"); await settle(o.page, 200);
    await o.page.click(".vqr-card[data-id='" + G(1) + "'] .vqr-why-a"); await settle(o.page, 500); s = await state(o.page);
    t("पाठ के बीच का वीडियो रिपोर्ट से छिपा: उसी जगह संदेश और 'वापस दिखाएँ', बाक़ी 2 की गिनती 1 / 2, 2 / 2",
      s.cards.join() === [G(2), G(3)].join() && s.nbox === 3 && !s.slots[0].inSec && /भेजें/.test(s.slots[0].note) && s.slots[0].cards.length === 0 && labs(s) === "1 / 2,2 / 2" && s.shown["vqr-undo"], labs(s) + " | " + JSON.stringify(s.slots[0]));
    await o.page.click(".vqr-undo"); await settle(o.page, 300); s = await state(o.page);
    t("'वापस दिखाएँ': तीनों डिब्बे अपनी जगह लौटे, गिनती 1 / 3, 2 / 3, 3 / 3, कोई JS-त्रुटि नहीं", s.cards.join() === [G(1), G(2), G(3)].join() && labs(s) === "1 / 3,2 / 3,3 / 3" && !s.slots[0].inSec && !s.slots[1].inSec && s.slots[2].inSec && !s.note && o.seen.errors.length === 0, labs(s) + " " + o.seen.errors.join());
    await o.ctx.close();

    /* ---- 7. YouTube न उतरे / चित्र न खुले ---- */
    o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE), apiFail: true }); await settle(o.page);
    await o.page.click(".vqr-card[data-id='" + G(1) + "'] .vqr-poster"); await settle(o.page, 800);
    const na = await o.page.evaluate(() => { const a = document.querySelector(".vqr-noapi a"); return a ? a.getAttribute("href") : ""; });
    t("YouTube का player न उतरा: साफ़ संदेश + YouTube पर खोलने की कड़ी", na === "https://www.youtube.com/watch?v=" + G(1));
    await o.ctx.close();
    o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE), noThumb: [G(2)] }); await settle(o.page, 400);
    await o.page.evaluate(id => document.querySelector(".vqr-card[data-id='" + id + "']").scrollIntoView(), G(2)); await settle(o.page, 900);   /* चित्र lazy हैं: दिखने पर उतरते */
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
    for (const [nm, dev] of [["फ़ोन (Pixel 5)", PHONE], ["laptop 1366", null], ["laptop 1024", { viewport: { width: 1024, height: 768 } }], ["छोटा फ़ोन 320", { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]]) {
      o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE) }, dev); await settle(o.page, 900);
      await o.page.click(".vqr-card[data-id='" + G(3) + "'] .vqr-rep"); await settle(o.page, 200);
      const lay = await o.page.evaluate(() => {
        const bad = [], small = [];
        document.querySelectorAll(".vqr-box *").forEach(e => {
          if ([].some.call(e.childNodes, n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 16) bad.push(e.className + ":" + getComputedStyle(e).fontSize);
        });
        document.querySelectorAll(".vqr-rep,.vqr-why-a,.vqr-why-no").forEach(e => { const r = e.getBoundingClientRect(); if (r.height < 44) small.push(e.className + ":" + r.height); });
        const art = document.querySelector("section.lsn-video").parentNode, aw = art.getBoundingClientRect().width;
        const cards = [].map.call(document.querySelectorAll(".vqr-card"), c => c.getBoundingClientRect());
        const aside = document.getElementById("ctoc"), ar = aside && aside.offsetParent !== null ? aside.getBoundingClientRect().right : 0;
        return { over: document.documentElement.scrollWidth - window.innerWidth, bad: bad, small: small, w: window.innerWidth, aside: ar,
                 rows: new Set(cards.map(r => Math.round(r.top))).size, wide: cards.every(r => r.width >= aw * 0.75),
                 inside: cards.every(r => r.left >= ar && r.right <= window.innerWidth + 1) };
      });
      t(nm + ": आड़ा scroll नहीं, कार्ड स्क्रीन के भीतर" + (lay.w >= 1024 ? " (बाईं पाठ-सूची के नीचे नहीं)" : ""), lay.over <= 0 && lay.inside && (lay.w >= 1024 ? lay.aside > 0 : lay.aside === 0), JSON.stringify(lay));
      t(nm + ": सब अक्षर 16px या बड़े", lay.bad.length === 0, lay.bad.join(" "));
      t(nm + ": बटन छूने लायक़ (44px)", lay.small.length === 0, lay.small.join(" "));
      t(nm + ": हर वीडियो अलग जगह, पाठ की पूरी चौड़ाई में", lay.rows === 3 && lay.wide, JSON.stringify(lay));
      if (SHOTS) {
        fs.mkdirSync(SHOTS, { recursive: true });
        await o.page.click(".vqr-card[data-id='" + G(3) + "'] .vqr-rep");      /* कारण-डिब्बा बंद करके फ़ोटो */
        const tag = lay.w >= 1300 ? "laptop" : lay.w >= 1000 ? "laptop-1024" : lay.w <= 320 ? "chhota-fon" : "fon";
        await (await o.page.$(".vqr-mid")).screenshot({ path: path.join(SHOTS, "vqr-" + tag + "-beech.png") });
        await (await o.page.$("section.lsn-video")).screenshot({ path: path.join(SHOTS, "vqr-" + tag + ".png") });
        if (lay.w >= 1000) { await o.page.evaluate(() => window.scrollTo(0, 0)); await o.page.screenshot({ path: path.join(SHOTS, "vqr-" + tag + "-upar.png") }); }
      }
      await o.ctx.close();
    }
    if (SHOTS) {
      o = await open(browser, base, L611, { json: null }, PHONE); await settle(o.page);
      await (await o.page.$("section.lsn-video")).screenshot({ path: path.join(SHOTS, "vqr-fon-suchi-nahin.png") });
      await o.ctx.close();
    }

    /* ---- 10. छपाई (PDF): player नहीं, वीडियो का नाम और पता; पाठ-सूची नहीं ---- */
    o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE) }); await settle(o.page, 900);
    await o.page.emulateMedia({ media: "print" });
    const pr = await o.page.evaluate(() => ({
      lines: [].map.call(document.querySelectorAll(".vqr-print"), e => getComputedStyle(e).display !== "none" ? e.textContent : ""),
      poster: [].some.call(document.querySelectorAll(".vqr-poster,.vqr-rep"), e => getComputedStyle(e).display !== "none"),
      aside: [].some.call(document.querySelectorAll(".ctoc,.ctoc-show"), e => getComputedStyle(e).display !== "none") }));
    t("छपाई: हर वीडियो का YouTube-पता छपे, चित्र/बटन नहीं, बाईं पाठ-सूची नहीं",
      pr.lines.join("|") === [G(1), G(2), G(3)].map(id => "YouTube पर: youtube.com/watch?v=" + id).join("|") && !pr.poster && !pr.aside, JSON.stringify(pr));
    await o.page.emulateMedia({ media: "screen" });
    t("स्क्रीन पर YouTube-पता वाली पंक्ति छिपी", (await o.page.evaluate(() => [].every.call(document.querySelectorAll(".vqr-print"), e => getComputedStyle(e).display === "none"))));
    await o.ctx.close();

    /* ---- 11. सब 109 पाठ: वीडियो-हिस्सा टेस्ट से पहले; 3 वीडियो कहाँ लगते हैं ----
       (उलटी जाँच तेज़ चले, इसलिए VQR_SAMPLE=N हो तो सिर्फ़ N के आसपास नमूना-पाठ; सामान्य दौड़ में सब 109) */
    const SAMPLE = +process.env.VQR_SAMPLE || 0, STEP = SAMPLE ? Math.ceil(pages.length / SAMPLE) : 1;
    const PICK = pages.filter((f, i) => i % STEP === 0 || i % 9 === 0 || i % 9 === 4), ALL = PICK.length === pages.length ? "सब 109 पाठ" : PICK.length + " नमूना-पाठ";
    {
      const ctx = await browser.newContext({ serviceWorkers: "block", viewport: { width: 1366, height: 900 } });
      let mode = 3; const errs = [];
      await ctx.route("**/*", route => { const u = route.request().url();
        if (u.startsWith(base)) {
          if (/\/assets\/vqr\/SE026\//.test(u)) { const id = (u.match(/\/(dmt-\d+\.\d+)\.json/) || [])[1];
            return mode ? route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(list(id, FIVE.slice(0, mode))) }) : route.fulfill({ status: 404, body: "404" }); }
          return route.continue(); }
        if (u.startsWith("https://i.ytimg.com/")) return route.fulfill({ status: 200, contentType: "image/png", body: PNG });
        return route.abort(); });
      const page = await ctx.newPage(); page.on("pageerror", e => errs.push(String(e && e.message)));
      const bad = { first: [], place: [], zero: [], share: [], two: [], one: [] }; let minShare = 1, minWho = "";
      const probe = () => page.evaluate(() => {
        const sec = document.querySelector("section.lsn-video"), quiz = document.querySelector("section.lsn-quiz"), art = sec.parentNode;
        const boxes = [].slice.call(document.querySelectorAll(".vqr-box"));
        const words = n => { const c = n.cloneNode(true); c.querySelectorAll("svg,figure,button").forEach(x => x.remove()); const t = c.textContent.replace(/\s+/g, " ").trim(); return t ? t.split(" ").length : 0; };
        const kids = [].slice.call(art.children), parts = [0]; let past = false;
        kids.forEach(k => { if (k === sec) past = true; if (past) return;
          if (k.classList.contains("vqr-box")) parts.push(0);
          else if (k.matches("section.lsn-sec") && !k.matches(".lsn-lead,.lsn-quiz")) parts[parts.length - 1] += words(k); });
        return { first: !!(quiz && (sec.compareDocumentPosition(quiz) & 4)), n: boxes.length,
          inSec: boxes.map(b => sec.contains(b)), adj: boxes.some(b => b.nextElementSibling && b.nextElementSibling.classList.contains("vqr-box")),
          prevOk: boxes.filter(b => !sec.contains(b)).every(b => b.parentNode === art && b.previousElementSibling.matches("section.lsn-sec:not(.lsn-lead)") && b.nextElementSibling.matches("section.lsn-sec:not(.lsn-video):not(.lsn-quiz)")),
          parts: parts };
      });
      for (const f of PICK) {
        const id = "dmt-" + (+f.match(/^dmt-(\d+)-(\d+)/)[1]) + "." + f.match(/^dmt-(\d+)-(\d+)/)[2], pi = pages.indexOf(f);
        for (const m of [3, 2, 1, 0]) {
          if (m === 2 && pi % 9) continue;                     /* 2 और 1 वीडियो: हर नौवाँ पाठ */
          if (m === 1 && pi % 9 !== 4) continue;
          mode = m;
          await page.goto(base + DMT + f, { waitUntil: "load" }); await page.waitForTimeout(m ? 450 : 250);
          const r = await probe();
          if (!r.first) bad.first.push(id + "/" + m);
          if (m === 0) { if (r.n) bad.zero.push(id); continue; }
          const okPlace = r.n === m && r.inSec.join() === Array.from({ length: m }, (_, i) => i === m - 1).join() && !r.adj && r.prevOk;
          if (!okPlace) (m === 3 ? bad.place : m === 2 ? bad.two : bad.one).push(id + ":" + JSON.stringify(r).slice(0, 120));
          if (m === 3) { const tot = r.parts.reduce((a, b) => a + b, 0), sh = Math.min.apply(null, r.parts) / tot; if (sh < minShare) { minShare = sh; minWho = id + " " + r.parts.join("/"); } if (sh < 0.12) bad.share.push(id + " " + r.parts.join("/")); }
        }
      }
      t(ALL + " (सूची हो या न हो): वीडियो-हिस्सा छोटे टेस्ट से पहले", bad.first.length === 0, bad.first.slice(0, 5).join(" "));
      t(ALL + ", सूची नहीं: कोई वीडियो-डिब्बा नहीं बना", bad.zero.length === 0, bad.zero.slice(0, 5).join(" "));
      t(ALL + ", 3 वीडियो: पहले दो पाठ के बीच (दो पाठ-हिस्सों के बीच, सटे नहीं), तीसरा वीडियो-हिस्से में", bad.place.length === 0, bad.place.slice(0, 3).join(" "));
      t(ALL + ", 3 वीडियो: पाठ लगभग बराबर हिस्सों में बँटा (हर हिस्सा कम से कम 12%) · सबसे छोटा " + Math.round(minShare * 100) + "% (" + minWho + ")", bad.share.length === 0, bad.share.slice(0, 5).join(" "));
      t("2 वीडियो (हर नौवाँ पाठ): पहला बीच में, दूसरा वीडियो-हिस्से में · 1 वीडियो: वीडियो-हिस्से में", bad.two.length === 0 && bad.one.length === 0, bad.two.concat(bad.one).slice(0, 3).join(" "));
      t(ALL + " में कोई JS-त्रुटि नहीं", errs.length === 0, errs.slice(0, 3).join(" "));
      await ctx.close();
    }

    /* ---- 12. laptop पर बाईं पाठ-सूची (course-toc) ---- */
    const tocFile = path.join(ROOT, "assets/toc/SE026.json");
    const chk = require("child_process").spawnSync(process.execPath, [path.join(ROOT, "generator/build_course_toc.js"), "--check"], { encoding: "utf8" });
    t("पाठ-सूची का data ताज़ा (build_course_toc.js --check)", chk.status === 0 && /✅ ताज़ा/.test(chk.stdout), (chk.stdout + chk.stderr).trim());
    const toc = JSON.parse(fs.readFileSync(process.env.CTOC_JSON_FILE || tocFile, "utf8"));
    const tocU = [].concat.apply([], toc.chapters.map(c => c.lessons.map(l => l.u)));
    t("पाठ-सूची: 9 खंड, 109 पाठ, हर पता असली पाठ-पन्ना, कोई पन्ना छूटा नहीं", toc.chapters.length === 9 && tocU.length === 109 && new Set(tocU).size === 109 &&
      pages.every(f => tocU.indexOf(DMT + f) >= 0) && tocU.every(u => fs.existsSync(path.join(ROOT, u))), toc.chapters.length + " " + tocU.length);
    const tocState = page => page.evaluate(() => {
      const a = document.getElementById("ctoc"), vis = e => !!(e && getComputedStyle(e).display !== "none" && e.getClientRects().length);   /* fixed बटन का offsetParent null होता है */
      const chs = [].slice.call(document.querySelectorAll(".ctoc-ch"));
      const cur = document.querySelector(".ctoc-cur");
      return { shown: vis(a), show: vis(document.querySelector(".ctoc-show")), n: chs.length,
        open: chs.map(c => vis(c.querySelector(".ctoc-list"))), exp: chs.map(c => c.querySelector(".ctoc-chbtn").getAttribute("aria-expanded")),
        cur: cur ? cur.getAttribute("href") : "", aria: cur ? cur.getAttribute("aria-current") : "", curVis: (() => { if (!cur || !vis(a)) return false; const r = cur.getBoundingClientRect(), q = a.getBoundingClientRect(); return r.top >= q.top && r.bottom <= q.bottom; })(),
        ok: [].map.call(document.querySelectorAll(".ctoc-ok"), e => e.parentNode.getAttribute("href")), sum: (document.querySelector(".ctoc-sum") || {}).textContent || "",
        lens: chs.map(c => c.querySelectorAll(".ctoc-ls").length), path: location.pathname,
        hideKey: (() => { try { return localStorage.getItem("acsTocHide"); } catch (e) { return "x"; } })() };
    });
    const chOf = u => toc.chapters.findIndex(c => c.lessons.some(l => l.u === u));
    o = await open(browser, base, L611, { json: null, init: { acs_learn_progress: JSON.stringify({ read: { [L101]: 1, [L210]: 1 } }) } }); await settle(o.page, 900);
    let ts = await tocState(o.page);
    t("laptop: बाईं पट्टी दिखी, 9 खंड, हर खंड में सही गिनती", ts.shown && ts.n === 9 && ts.lens.join() === toc.chapters.map(c => c.lessons.length).join(), JSON.stringify(ts.lens));
    t("अभी का पाठ (6.11) रंग से चिह्नित (aria-current), पट्टी में दिखता हुआ", ts.cur === L611 && ts.aria === "page" && ts.curVis, ts.cur + " " + ts.curVis);
    t("सिर्फ़ अभी के पाठ का खंड (6) खुला, बाक़ी 8 बंद", ts.open.join() === toc.chapters.map((c, i) => i === chOf(L611)).join() && ts.exp.join() === toc.chapters.map((c, i) => String(i === chOf(L611))).join(), ts.open.join());
    t("पढ़े पाठों पर ✓ और ऊपर 'पढ़े: 2' (इसी computer की प्रगति)", ts.ok.sort().join() === [L101, L210].sort().join() && /9 खंड · 109 पाठ · पढ़े: 2/.test(ts.sum), ts.ok.join() + " | " + ts.sum);
    t("पन्ने में कोई JS-त्रुटि नहीं; पाठ-सूची का data एक बार उतरा", o.seen.errors.length === 0 && o.seen.toc === 1, o.seen.errors.join() + " toc=" + o.seen.toc);
    await o.page.click(".ctoc-ch:nth-child(1) .ctoc-chbtn"); await settle(o.page, 150); ts = await tocState(o.page);
    t("खंड-1 छुआ: उसके 8 पाठ खुले (aria-expanded true), खंड-6 भी खुला रहा", ts.open[0] && ts.exp[0] === "true" && ts.open[chOf(L611)], ts.open.join());
    await o.page.click(".ctoc-ch:nth-child(1) .ctoc-chbtn"); await settle(o.page, 150); ts = await tocState(o.page);
    t("खंड-1 दोबारा छुआ: बंद", !ts.open[0] && ts.exp[0] === "false", ts.open.join());
    const L104 = DMT + pages.filter(f => /^dmt-1-04-/.test(f))[0];
    await o.page.click(".ctoc-ch:nth-child(1) .ctoc-chbtn"); await settle(o.page, 150);
    await Promise.all([o.page.waitForNavigation({ waitUntil: "load" }), o.page.click(".ctoc-ls[href='" + L104 + "']")]); await settle(o.page, 900); ts = await tocState(o.page);
    t("पाठ 1.4 छुआ: वही पाठ दाईं ओर खुला, सूची में वही चिह्नित, खंड-1 खुला", ts.path === L104 && ts.cur === L104 && ts.open[0] && ts.open.filter(Boolean).length === 1, ts.path + " " + ts.open.join());
    const geo = () => o.page.evaluate(() => { const a = document.getElementById("ctoc"), m = document.querySelector("main"), vis = e => !!(e && getComputedStyle(e).display !== "none" && e.getClientRects().length);
      const ar = vis(a) ? a.getBoundingClientRect() : null, fl = [].map.call(document.querySelectorAll(".udy-float,#lsnBackHome"), e => e.getBoundingClientRect().left);
      const bad = [], small = [];
      if (vis(a)) { a.querySelectorAll("*").forEach(e => { if ([].some.call(e.childNodes, n => n.nodeType === 3 && n.textContent.trim()) && parseFloat(getComputedStyle(e).fontSize) < 16) bad.push(e.className + ":" + getComputedStyle(e).fontSize); });
        a.querySelectorAll(".ctoc-ls,.ctoc-chbtn,.ctoc-hide,.ctoc-course").forEach(e => { if (vis(e) && e.getBoundingClientRect().height < 44 && !e.matches(".ctoc-course")) small.push(e.className + ":" + e.getBoundingClientRect().height); }); }
      const hd = document.querySelector("header.acs-nav");
      return { ar: ar && { l: ar.left, r: ar.right, t: ar.top, b: ar.bottom }, ml: m.getBoundingClientRect().left, fl: fl, over: document.documentElement.scrollWidth - innerWidth,
        bad: bad, small: small, hb: hd ? hd.getBoundingClientRect().bottom : 0, vh: innerHeight }; });
    let g = await geo();
    t("पट्टी पाठ को नहीं ढकती: पाठ पट्टी के दाएँ से; आड़ा scroll नहीं", g.ar && g.ml >= g.ar.r - 1 && g.over <= 0, JSON.stringify(g));
    t("तैरते बटन (⬆, ↩ मेरा पैनल) पट्टी के दाएँ, पाठ-नाम नहीं ढकते", g.fl.length >= 2 && g.fl.every(x => x >= g.ar.r), JSON.stringify(g.fl));
    t("पट्टी के सब अक्षर 16px या बड़े; पाठ/खंड/छिपाएँ बटन छूने लायक़ (44px)", g.bad.length === 0 && g.small.length === 0, g.bad.concat(g.small).slice(0, 5).join(" "));
    /* उलटी जाँच से पकड़ा (25-Nov): खंड-1 के सब पाठ-नाम दो पंक्ति के हैं, इसलिए छोटा बटन छिप जाता था; अब सब 9 खंड खोलकर सब 109 कड़ियाँ नापो */
    await o.page.$$eval(".ctoc-chbtn[aria-expanded='false']", bs => bs.forEach(b => b.click())); await settle(o.page, 200);
    const all109 = await o.page.evaluate(() => { const ls = [].slice.call(document.querySelectorAll("#ctoc .ctoc-ls")), small = [], bad = [];
      ls.forEach(a => { const r = a.getBoundingClientRect(); if (!r.height) bad.push(a.getAttribute("href")); else if (r.height < 44) small.push(a.textContent.slice(0, 20) + ":" + Math.round(r.height)); });
      return { n: ls.length, small: small, bad: bad }; });
    t("सब 9 खंड खोले: सब 109 पाठ-कड़ियाँ दिखीं, हर एक छूने लायक़ (44px)", all109.n === 109 && !all109.bad.length && !all109.small.length, JSON.stringify(all109).slice(0, 200));
    await o.page.evaluate(() => document.querySelector("section.lsn-quiz").scrollIntoView()); await settle(o.page, 300); g = await geo();
    t("पन्ना टेस्ट तक खिसका: पट्टी ऊपर की नीली पट्टी के ठीक नीचे टिकी, स्क्रीन के नीचे तक", g.ar && Math.abs(g.ar.t - g.hb) <= 2 && Math.abs(g.ar.b - g.vh) <= 2, JSON.stringify(g.ar) + " hb=" + g.hb);
    await o.page.click(".ctoc-hide"); await settle(o.page, 150); ts = await tocState(o.page);
    t("'◀ छिपाएँ': पट्टी छिपी, '📚 पाठ-सूची ▶' बटन दिखा, पसंद याद", !ts.shown && ts.show && ts.hideKey === "1", JSON.stringify(ts).slice(0, 120));
    g = await geo();
    t("पट्टी छिपी: तैरते बटन फिर बाएँ किनारे पर", g.fl.every(x => x < 40), JSON.stringify(g.fl));
    await o.page.reload({ waitUntil: "load" }); await settle(o.page, 900); ts = await tocState(o.page);
    t("दोबारा खोलने पर भी छिपी रही", !ts.shown && ts.show, "");
    await o.page.click(".ctoc-show"); await settle(o.page, 150); ts = await tocState(o.page);
    t("'📚 पाठ-सूची ▶': पट्टी लौटी, पसंद याद (0)", ts.shown && !ts.show && ts.hideKey === "0", "");
    await o.ctx.close();
    for (const [nm, dev] of [["laptop 1024", { viewport: { width: 1024, height: 700 } }], ["बड़ी स्क्रीन 1920", { viewport: { width: 1920, height: 1080 } }]]) {
      o = await open(browser, base, L611, { json: list("dmt-6.11", FIVE) }, dev); await settle(o.page, 900); g = await geo();
      t(nm + ": पट्टी दिखी, पाठ उसके दाएँ, आड़ा scroll नहीं", g.ar && g.ml >= g.ar.r - 1 && g.over <= 0, JSON.stringify(g).slice(0, 160));
      await o.ctx.close();
    }
    o = await open(browser, base, L611, { json: null }, PHONE); await settle(o.page, 900); ts = await tocState(o.page);
    t("फ़ोन: पट्टी नहीं, पाठ-सूची का data उतरा ही नहीं (कम data)", !ts.shown && o.seen.toc === 0 && o.seen.errors.length === 0, "toc=" + o.seen.toc);
    await o.ctx.close();
    o = await open(browser, base, L611, { json: null }, { viewport: { width: 800, height: 900 } }); await settle(o.page, 700);
    t("छोटी खिड़की (800): पट्टी नहीं, data नहीं", !(await tocState(o.page)).shown && o.seen.toc === 0, "");
    await o.page.setViewportSize({ width: 1280, height: 900 }); await settle(o.page, 900); ts = await tocState(o.page);
    t("खिड़की चौड़ी की (1280): पट्टी अपने-आप आई", ts.shown && ts.cur === L611 && o.seen.toc === 1, "toc=" + o.seen.toc);
    await o.ctx.close();
    const tocBad = [["data नहीं (404)", null], ["टूटा data", "{bad"], ["यह पाठ data में नहीं", { chapters: [{ name: "x", lessons: [{ n: "1.1", t: "y", u: L101 }] }] }],
      ["ख़तरनाक पता", { chapters: [{ name: "x", lessons: [{ n: "6.11", t: "y", u: L611 }, { n: "1", t: "z", u: "javascript:alert(1)" }] }] }],
      ["दूसरे कोर्स का पता", { chapters: [{ name: "x", lessons: [{ n: "6.11", t: "y", u: L611 }, { n: "1", t: "z", u: WLD }] }] }]];
    for (const [nm, bodyT] of tocBad) {
      o = await open(browser, base, L611, { json: null, toc: bodyT }); await settle(o.page, 900);
      const r = await o.page.evaluate(() => ({ aside: !!document.getElementById("ctoc"), lay: !!document.querySelector(".ctoc-lay"), main: !!document.querySelector("main article") }));
      t("पाठ-सूची " + nm + ": पट्टी नहीं, पाठ पहले जैसा, कोई JS-त्रुटि नहीं", !r.aside && !r.lay && r.main && o.seen.errors.length === 0, JSON.stringify(r) + o.seen.errors.join());
      await o.ctx.close();
    }
    o = await open(browser, base, L611, { json: null, toc: { title: "<img src=x onerror=window.__t=1>", intro: DMT, chapters: [{ name: "<b>खंड</b>", lessons: [{ n: "6.11", t: "<img src=x onerror=window.__t=2>", u: L611 }] }] } }); await settle(o.page, 900);
    t("data में HTML: सिर्फ़ अक्षर बने, कोड नहीं चला", (await o.page.evaluate(() => !!document.getElementById("ctoc") && !document.querySelector("#ctoc img,#ctoc b") && window.__t === undefined)), "");
    await o.ctx.close();
    for (const [u, nm] of [[INTRO, "डिजिटल मित्र परिचय-पन्ना"], [WLD, "वेल्डिंग पाठ"], [TWV, "टू-व्हीलर पाठ"]]) {
      o = await open(browser, base, u, { json: null }); await settle(o.page, 700);
      t(nm + " (laptop): पट्टी नहीं, पाठ-सूची की फ़ाइल उतरी ही नहीं", !(await o.page.$("#ctoc")) && o.seen.toc === 0 && (nm === "डिजिटल मित्र परिचय-पन्ना" ? true : o.seen.tocJs === 0) && o.seen.errors.length === 0, "tocJs=" + o.seen.tocJs);
      await o.ctx.close();
    }
    const artTxt = async (dev, tocOn) => { const x = await open(browser, base, L611, { json: null, toc: tocOn ? undefined : null }, dev); await settle(x.page, 900);
      const r = await x.page.evaluate(() => document.querySelector("article").textContent.replace(/\s+/g, " ").trim()); await x.ctx.close(); return r; };
    t("पट्टी आने से पाठ का एक भी अक्षर नहीं बदला", (await artTxt(null, true)) === (await artTxt(null, false)), "");
  } catch (e) { t("जाँच-यंत्र ख़ुद अटका: " + (e && e.message), false); }
  await browser.close(); srv.close();
  console.log("\n" + (fail ? "⛔ FAIL · " + pass + " पास, " + fail + " fail" : "🏁 PASS · " + pass + " पास, 0 fail") + " · vqr-player v1.1 · course-toc v1.0");
  process.exit(fail ? 1 : 0);
})();
