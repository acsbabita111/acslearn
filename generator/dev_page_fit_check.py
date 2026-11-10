# -*- coding: utf-8 -*-
# ============================================================
# dev_page_fit_check.py v1.0 (10-Nov-2026, खेप-1 ऑडिट) · जाँच-यंत्र (सिर्फ़ पढ़ता है)
# सवाल: हर भाषा का होम और career-पेज फ़ोन से चौड़ा तो नहीं होता?
# कसौटी (ChatGPT-ऑडिट): 320 / 360 / 390 / 412 px पर document.scrollWidth == window.innerWidth।
# overflow-x:hidden से छिपाना पास नहीं — यह यंत्र असली चौड़ाई नापता है।
# भाषाएँ: hi + en + रजिस्टर (generator/data/mirror_home_strings.js) — नई भाषा अपने-आप।
# --widen : अक्षर 8% कृत्रिम चौड़े (चौड़े वैकल्पिक फ़ॉन्ट वाले फ़ोन की नक़ल)।
# ज़रूरत: python playwright + Chromium + भाषाओं के Noto फ़ॉन्ट (container/जाँच-मशीन; Founder-bat में नहीं)।
# चलाना: python3 generator/dev_page_fit_check.py [--widen] [कोड...]
# ============================================================
import sys, os, re, json, threading, http.server, functools, socketserver
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WIDTHS = (320, 360, 390, 412)

def langs():
    t = open(os.path.join(ROOT, "generator", "data", "mirror_home_strings.js"), encoding="utf-8").read()
    m = re.search(r"^var MIRROR_HOME = (\{[\s\S]*?\n\});$", t, re.M)
    return ["hi", "en"] + list(json.loads(m.group(1)).keys())

def pages(codes):
    out = []
    for c in codes:
        out += (["/", "/career.html"] if c == "hi" else ["/%s/" % c, "/%s/career.html" % c])
    return out

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    widen = "--widen" in sys.argv
    codes = args or langs()
    from playwright.sync_api import sync_playwright
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    socketserver.TCPServer.allow_reuse_address = True
    srv = socketserver.TCPServer(("127.0.0.1", 0), functools.partial(Q, directory=ROOT))
    port = srv.server_address[1]
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    bad = 0; n = 0
    with sync_playwright() as p:
        b = p.chromium.launch()
        for path in pages(codes):
            fails = []
            for W in WIDTHS:
                pg = b.new_page(viewport={"width": W, "height": 800})
                pg.goto("http://127.0.0.1:%d%s" % (port, path)); pg.wait_for_timeout(600)
                if widen: pg.add_style_tag(content="body *{letter-spacing:.08em!important}"); pg.wait_for_timeout(150)
                sw, iw = pg.evaluate("[document.documentElement.scrollWidth, window.innerWidth]")
                n += 1
                if sw != iw: fails.append("%d:%d" % (W, sw))
                pg.close()
            bad += len(fails)
            print(("✅ " if not fails else "❌ ") + path + ("" if not fails else "  " + " ".join(fails)))
        b.close()
    srv.shutdown()
    print("\nजाँचें: %d · FAIL %d%s" % (n, bad, " (अक्षर 8% चौड़े)" if widen else ""))
    print("🏁 dev_page_fit_check — सब पास" if not bad else "⛔ dev_page_fit_check FAIL")
    sys.exit(1 if bad else 0)

if __name__ == "__main__":
    main()
