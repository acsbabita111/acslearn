#!/usr/bin/env python3
# dev_lipi_dhvani_browser.py v1.0 : 22-Nov-2026 : dhvani-card lipi page : real-browser checks (B01-B05)
# Run:  python3 generator/dev_lipi_dhvani_browser.py <code> [base-url]
#       base-url default http://localhost:8790  (start:  python3 -m http.server 8790  in the repo root)
# Needs: playwright + chromium. Writes generator/data/lipi/dhvani/<code>_browser.json ;
#        dev_lipi_dhvani_check.js reads that file and shows B01-B05 in the report.
# B01 voice: every listen button sends its own Devanagari text with lang hi-IN, in 5 phone states
# B02 speak: the practice box opens full width and its listen button also sends Devanagari
# B03 touch: every button / chip is at least 44px
# B05 cards per row: 1 on a phone, 2 on a wide screen, lone card centred, no text outside its box
# B04 print: A4 page count, no card taller than one page (limit 22 pages), cards set to not split; also no sideways scroll, no JS error, no text under 16px
import sys, json, re, asyncio, os
from playwright.async_api import async_playwright

CODE = sys.argv[1] if len(sys.argv) > 1 else "fgc"
BASE = sys.argv[2] if len(sys.argv) > 2 else "http://localhost:8790"
HERE = os.path.dirname(os.path.abspath(__file__))
SLUG = None
for line in open(os.path.join(HERE, "data", "lipi", "lipi_langs_latin.js"), encoding="utf8"):
    m = re.search(r'"code": "%s", "slug": "([^"]+)"' % re.escape(CODE), line)
    if m: SLUG = m.group(1)
if not SLUG: sys.exit("slug not found for " + CODE)
URL = "%s/courses/hi/bhasha/%s/lipi/" % (BASE, SLUG)
DEV = re.compile(r"[ऀ-ॿ]")

MOCK = """
(() => {
  const MODE = '%s';
  window.__utt = []; window.__alerts = 0; window.alert = function(){ window.__alerts++; };
  if (MODE === 'none') { try { delete Window.prototype.speechSynthesis; } catch(e){} try { delete window.speechSynthesis; } catch(e){}
    try { delete window.SpeechSynthesisUtterance; } catch(e){} window.SpeechSynthesisUtterance = undefined; return; }
  let voices = [];
  const HI = {lang:'hi-IN', name:'Hindi', default:false, localService:true, voiceURI:'hi'}, EN = {lang:'en-US', name:'English', default:true, localService:true, voiceURI:'en'};
  if (MODE === 'hi') voices = [EN, HI];
  if (MODE === 'en') voices = [EN];
  const L = [];
  const ss = { getVoices(){ return voices; }, cancel(){}, pause(){}, resume(){}, speaking:false, pending:false,
    speak(u){ window.__utt.push({text:u.text, lang:u.lang, voice:u.voice ? u.voice.lang : ''}); setTimeout(()=>{ try{ u.onstart && u.onstart({}); u.onend && u.onend({}); }catch(e){} }, 5); },
    addEventListener(t, f){ if (t === 'voiceschanged') L.push(f); }, removeEventListener(){} };
  Object.defineProperty(window, 'speechSynthesis', { configurable:true, get(){ return ss; } });
  window.SpeechSynthesisUtterance = function(t){ this.text = t; this.lang = ''; this.rate = 1; this.voice = null; };
  if (MODE === 'late') setTimeout(()=>{ voices = [EN, HI]; L.forEach(f => f({})); if (ss.onvoiceschanged) ss.onvoiceschanged({}); }, 400);
})();
"""

async def voice_run(browser, mode):
    ctx = await browser.new_context(viewport={"width": 390, "height": 844})
    pg = await ctx.new_page(); errs = []
    pg.on("pageerror", lambda e: errs.append(str(e)))
    await pg.add_init_script(MOCK % mode)
    await pg.goto(URL, wait_until="domcontentloaded"); await pg.wait_for_timeout(250 if mode != "late" else 50)
    btns = await pg.query_selector_all(".ld-sun")
    want = [await b.get_attribute("data-pron") for b in btns]
    first = None
    # first press: before the voice list has arrived (mode late / never)
    await btns[0].evaluate("b => b.click()"); await pg.wait_for_timeout(1500)
    first = await pg.evaluate("window.__utt.slice()")
    await pg.evaluate("window.__utt.length = 0")
    for b in btns:
        await b.evaluate("b => b.click()"); await pg.wait_for_timeout(75)
    await pg.wait_for_timeout(300)
    utt = await pg.evaluate("window.__utt.slice()")
    haal = await pg.evaluate("(document.getElementById('ld-awaz-haal')||{}).textContent||''")
    msgs = await pg.evaluate("document.querySelectorAll('.ld-msg').length")
    alerts = await pg.evaluate("window.__alerts")
    await ctx.close()
    return {"mode": mode, "buttons": len(btns), "want": want, "first": first, "utt": utt, "haal": haal, "msgs": msgs, "alerts": alerts, "errs": errs}

async def main():
    R = {}
    async with async_playwright() as p:
        b = await p.chromium.launch(args=["--use-fake-ui-for-media-stream", "--use-fake-device-for-media-stream"])
        # ---------- B01 ----------
        det = []; ok = True
        for mode in ["hi", "late", "never", "en", "none"]:
            r = await voice_run(b, mode); n = r["buttons"]
            if mode == "none":
                good = len(r["utt"]) == 0 and not r["errs"] and r["alerts"] == 0 and r["haal"] != "" and r["msgs"] > 0
                det.append("none: sent 0, message shown %s, alerts %d, js-errors %d" % (bool(r["haal"]), r["alerts"], len(r["errs"])))
            else:
                texts = [u["text"] for u in r["utt"]]
                same = texts == r["want"]
                alldev = all(DEV.search(u["text"]) and not re.search(r"[A-Za-z/]", u["text"]) and u["lang"] == "hi-IN" for u in r["utt"] + r["first"])
                firstok = len(r["first"]) == 1 and r["first"][0]["text"] == r["want"][0]
                msgok = (r["haal"] != "" and r["msgs"] > 0) if mode == "en" else True
                quiet = (r["haal"] == "") if mode in ("hi", "late") else True
                good = same and alldev and firstok and msgok and quiet and not r["errs"] and r["alerts"] == 0 and n > 0
                det.append("%s: %d/%d sent as written, first-press %s, all Devanagari+hi-IN %s, message %s" % (mode, sum(1 for a, c in zip(texts, r["want"]) if a == c), n, firstok, alldev, "yes" if r["haal"] else "no"))
            ok = ok and good
        R["B01"] = {"ok": ok, "msg": "आवाज़: हर 🔊 अपना देवनागरी उच्चारण हिंदी आवाज़ को भेजता है, पाँचों हालात में (हिंदी आवाज़ है · सूची देर से आई · सूची आई ही नहीं · सिर्फ़ अंग्रेज़ी आवाज़ · आवाज़ की सुविधा नहीं)", "detail": " | ".join(det)}

        # ---------- B02 ----------
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, permissions=["microphone"])
        pg = await ctx.new_page(); errs = []
        pg.on("pageerror", lambda e: errs.append(str(e)))
        await pg.add_init_script(MOCK % "hi")
        await pg.goto(URL, wait_until="networkidle")
        res = []
        for sel in [".ld-card .ld-btns .ld-bol", ".ld-card .ld-w .ld-bol", "#ld-milti .ld-w .ld-bol", "#ld-ank .ld-w .ld-bol"]:
            btn = await pg.query_selector(sel)
            pron = await btn.get_attribute("data-pron")
            await btn.evaluate("b => b.click()"); await pg.wait_for_timeout(900)
            info = await pg.evaluate("""(sel) => { const box = document.querySelector('.acs-bolo'); if (!box) return null;
                const host = box.parentNode, wrap = host.closest('.ld-card,.ld-mj,.lipi-sec'); const cs = getComputedStyle(wrap);
                const inner = wrap.getBoundingClientRect().width - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
                const say = box.querySelector('.ab-say'), lg = box.querySelector('.ab-lg'); return { w: box.getBoundingClientRect().width, inner: inner, say: say ? say.textContent : '', lg: lg ? lg.getBoundingClientRect().height : 0, tg: (box.querySelector('.ab-tg')||{}).textContent||'' }; }""", sel)
            await pg.evaluate("window.__utt.length = 0")
            say = await pg.query_selector(".acs-bolo .ab-say")
            if say: await say.evaluate("b => b.click()"); await pg.wait_for_timeout(300)
            utt = await pg.evaluate("window.__utt.slice()")
            good = bool(info) and info["w"] >= 0.85 * info["inner"] and "देवनागरी" in info["say"] and info["lg"] == 0 and len(utt) == 1 and utt[0]["text"] == pron and utt[0]["lang"] == "hi-IN"
            res.append((sel, good, info, utt))
            x = await pg.query_selector(".acs-bolo .ab-x")
            if x: await x.evaluate("b => b.click()")
        R["B02"] = {"ok": all(g for _, g, _, _ in res) and not errs, "msg": "बोलो: डिब्बा पूरी चौड़ाई में खुलता है, उसका सुनो-बटन देवनागरी उच्चारण बोलता है, और सही/ग़लत के रंगों वाली पंक्ति नहीं दिखती (कार्ड, शब्द, तुलना, अंक: चारों जगह)",
                    "detail": " | ".join("%s: width %d of %d, sent %s" % (s.split(" ")[0] + " " + s.split(" ")[-2], (i or {}).get("w", 0), (i or {}).get("inner", 0), (u[0]["text"] if u else "nothing")) for s, g, i, u in res)}

        # ---------- B03 + layout ----------
        small = await pg.evaluate("""() => { const out = []; document.querySelectorAll('.ld-wrap button, .ld-wrap a.ld-chip, .ld-wrap a.lipi-btn, .ld-wrap a.ld-nx, .ld-wrap a.ld-galat-a, .ld-wrap summary').forEach(e => { const r = e.getBoundingClientRect(); if (r.width === 0 && r.height === 0) return; if (Math.min(r.width, r.height) < 44) out.push((e.className || e.tagName) + ' ' + Math.round(r.width) + 'x' + Math.round(r.height)); }); return out; }""")
        total = await pg.evaluate("document.querySelectorAll('.ld-wrap button, .ld-wrap a.ld-chip, .ld-wrap a.lipi-btn, .ld-wrap a.ld-nx, .ld-wrap a.ld-galat-a, .ld-wrap summary').length")
        R["B03"] = {"ok": not small and total > 100, "msg": "छुअन: हर बटन, सूची-खाना और खुलने वाली पंक्ति कम से कम 44px", "detail": "%d में से छोटे %d %s" % (total, len(small), "; ".join(small[:5]))}
        tiny = await pg.evaluate("""() => { let n = 0; const w = document.createTreeWalker(document.querySelector('.ld-wrap'), NodeFilter.SHOW_TEXT); while (w.nextNode()) { const t = w.currentNode; if (!t.nodeValue.trim()) continue; const e = t.parentElement; if (!e || e.closest('svg,script,style')) continue; const r = e.getBoundingClientRect(); if (r.width === 0) continue; if (parseFloat(getComputedStyle(e).fontSize) < 16) n++; } return n; }""")
        over = {}
        for w in (320, 360, 390, 768, 1280):
            await pg.set_viewport_size({"width": w, "height": 800}); await pg.wait_for_timeout(120)
            over[w] = await pg.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
        # ---------- B05 : cards per row ----------
        COLS = """() => { const cs = Array.from(document.querySelectorAll('.ld-card')); const xs = {}; cs.forEach(c => { xs[Math.round(c.getBoundingClientRect().left)] = 1; });
            const out = cs.filter(c => Array.from(c.querySelectorAll('.ld-g,.ld-d,.ld-w,.ld-bt,.ld-wl')).some(e => e.scrollWidth > e.clientWidth + 1)).length;
            const lone = Array.from(document.querySelectorAll('.ld-grp')).filter(g => g.children.length % 2 === 1).map(g => { const c = g.lastElementChild.getBoundingClientRect(), r = g.getBoundingClientRect(); return Math.abs((c.left + c.width / 2) - (r.left + r.width / 2)); });
            return { cols: Object.keys(xs).length, w: Math.round(cs[0].getBoundingClientRect().width), out: out, lone: lone.length ? Math.max.apply(null, lone) : 0, h: document.documentElement.scrollHeight }; }"""
        cols = {}
        for w in (360, 390, 768, 1280):
            await pg.set_viewport_size({"width": w, "height": 800}); await pg.wait_for_timeout(150)
            cols[w] = await pg.evaluate(COLS)
        b5 = cols[360]["cols"] == 1 and cols[390]["cols"] == 1 and cols[768]["cols"] >= 2 and cols[1280]["cols"] >= 2 and all(c["out"] == 0 for c in cols.values()) and cols[768]["w"] >= 340 and cols[1280]["lone"] <= 2 and cols[768]["lone"] <= 2
        R["B05"] = {"ok": b5, "msg": "कार्ड प्रति पंक्ति: फ़ोन पर 1, चौड़ी स्क्रीन पर 2 (हर कार्ड कम से कम 340px चौड़ा); समूह का अकेला कार्ड बीच में; किसी कार्ड का पाठ डिब्बे से बाहर नहीं",
                    "detail": " | ".join("%dpx: %d प्रति पंक्ति, कार्ड %dpx, बाहर निकले %d, पन्ना %dpx" % (w, 1 if cols[w]["cols"] == 1 else 2, cols[w]["w"], cols[w]["out"], cols[w]["h"]) for w in (360, 390, 768, 1280))}
        await pg.set_viewport_size({"width": 390, "height": 844})
        height = await pg.evaluate("document.documentElement.scrollHeight")
        # ---------- B04 print ----------
        await pg.emulate_media(media="print"); await pg.set_viewport_size({"width": 703, "height": 1000}); await pg.wait_for_timeout(200)
        pr = await pg.evaluate("""() => { const cs = Array.from(document.querySelectorAll('.ld-card')); return { max: Math.max.apply(null, cs.map(c => c.getBoundingClientRect().height)), brk: cs.every(c => { const s = getComputedStyle(c); return s.breakInside === 'avoid' || s.pageBreakInside === 'avoid'; }), btn: Array.from(document.querySelectorAll('.ld-bt,.ld-ic')).filter(b => b.getBoundingClientRect().width > 0).length, bg: cs.filter(c => getComputedStyle(c).backgroundImage !== 'none').length }; }""")
        pdf = await pg.pdf(format="A4", print_background=True)
        pages = len(re.findall(rb"/Type\s*/Page[^s]", pdf))
        out_pdf = os.environ.get("LD_PDF")
        if out_pdf: open(out_pdf, "wb").write(pdf)
        await pg.emulate_media(media="screen")
        R["B04"] = {"ok": pages <= 22 and pr["max"] <= 400 and pr["brk"] and pr["btn"] == 0 and pr["bg"] == 0 and all(v <= 0 for v in over.values()) and tiny == 0 and not errs,
                    "msg": "छपाई और रूप: A4 पर 22 पन्नों के भीतर, कोई कार्ड एक पन्ने से लंबा नहीं और कटने से रोका गया, बटन और रंग नहीं छपते; आड़ा-scroll शून्य; 16px से छोटा पाठ शून्य; JS-त्रुटि शून्य",
                    "detail": "पन्ने %d · सबसे लंबा कार्ड %dpx (सीमा 400) · कटने से रोक %s · छपते बटन %d · रंगीन कार्ड %d · आड़ा-scroll %s · छोटा पाठ %d · JS-त्रुटि %d · मोबाइल-ऊँचाई %dpx" % (pages, pr["max"], pr["brk"], pr["btn"], pr["bg"], json.dumps(over), tiny, len(errs), height)}
        await ctx.close(); await b.close()
    out = {"yantra": "dev_lipi_dhvani_browser.py v1.0", "code": CODE, "jaanch": R}
    json.dump(out, open(os.path.join(HERE, "data", "lipi", "dhvani", CODE + "_browser.json"), "w", encoding="utf8"), ensure_ascii=False, indent=1)
    bad = [k for k in R if not R[k]["ok"]]
    for k in sorted(R): print(("OK  " if R[k]["ok"] else "FAIL") + " " + k + " :: " + R[k]["detail"])
    sys.exit(1 if bad else 0)
asyncio.run(main())
