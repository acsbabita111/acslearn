# -*- coding: utf-8 -*-
# dev_mirror_check v2.0 (10-Nov-2026, खेप-0 v1.1) — भाषा-होम की fail-closed जाँच (रजिस्टर-आधारित)
# v2.0: 09-Nov की पुरानी-प्रति (LIVE) से तुलनाएँ हटीं — अब स्थायी नियम; जाँच लिपि (script) से,
#       भाषा-नाम से नहीं (नेपाली = Deva भी पास); सब गिनतियाँ रजिस्टर से; sw = आधार v823 या नया।
# v2.1: लिपि-सीमाएँ generator/lib_lang_registry.js v1.1 के बराबर (दोनों बदलें तो साथ बदलें)।
# चलाना: repo-रूट से  python3 generator/dev_mirror_check.py
import io, re, sys, json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
fails = []
def ck(n, ok, info=""):
    print(("✅" if ok else "❌"), n, info)
    if not ok: fails.append(n)
def rd(p): return io.open(os.path.join(ROOT, p), encoding="utf-8").read()
def visible(s):
    s = re.sub(r"<script[\s\S]*?</script>", "", s)
    s = re.sub(r"<style[\s\S]*?</style>", "", s)
    return re.sub(r"<[^>]+>", " ", s)

_m = re.search(r"^var MIRROR_HOME = (\{[\s\S]*?\n\});$", rd("generator/data/mirror_home_strings.js"), re.M)
if not _m: print("❌ रजिस्टर का रूप टूटा (var MIRROR_HOME = कड़ा JSON)"); sys.exit(1)
D = json.loads(_m.group(1))
SCR = {"Latn":u"[A-Za-z\u00C0-\u024F\u0250-\u02AF\u02B0-\u02FF\u1E00-\u1EFF]","Cyrl":u"[\u0400-\u04FF\u0500-\u052F]","Grek":u"[\u0370-\u03FF]","Arab":u"[\u0600-\u06FF]",
       "Hebr":u"[\u0590-\u05FF]","Deva":u"[\u0900-\u097F]","Beng":u"[\u0980-\u09FF]","Guru":u"[\u0A00-\u0A7F]",
       "Gujr":u"[\u0A80-\u0AFF]","Orya":u"[\u0B00-\u0B7F]","Taml":u"[\u0B80-\u0BFF]","Telu":u"[\u0C00-\u0C7F]",
       "Knda":u"[\u0C80-\u0CFF]","Mlym":u"[\u0D00-\u0D7F]","Sinh":u"[\u0D80-\u0DFF]","Thai":u"[\u0E00-\u0E7F]",
       "Mymr":u"[\u1000-\u109F]","Khmr":u"[\u1780-\u17FF]","Ethi":u"[\u1200-\u139F]","Hang":u"[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]",
       "Hans":u"[\u4E00-\u9FFF]","Jpan":u"[\u3040-\u30FF\u4E00-\u9FFF]"}
SW_BASE = 823
ORDER = list(D.keys()); ALL = ["hi","en"] + ORDER; RTL = [c for c in ORDER if D[c]["dir"]=="rtl"]
ck("data: रजिस्टर में %d भाषाएँ (कम-से-कम 13)" % len(ORDER), len(ORDER) >= 13, ",".join(ORDER))
ck("data: हर भाषा का script-खाना", all(D[c].get("script") in SCR for c in ORDER), ",".join(c for c in ORDER if D[c].get("script") not in SCR))

def url(c): return "https://acslearn.com/" if c=="hi" else "https://acslearn.com/%s/" % c
EXPECT = set((c, url(c)) for c in ALL) | {("x-default","https://acslearn.com/")}
def hcheck(s, tag):
    got = set(re.findall(r'hreflang="([^"]+)" href="([^"]+)"', s))
    ck(tag+": hreflang %d सटीक" % (len(ALL)+1), got == EXPECT, str(len(got)))

en = rd("en/index.html"); root = rd("index.html")
hcheck(en, "en"); hcheck(root, "root")
ck("en: og:locale en_US", 'content="en_US"' in en and "hi_IN" not in en)
ck("en: og:desc उद्यम-अवसर", "950+ enterprise opportunities." in en and "950+ enterprises." not in en)
# v2.0: 09-Nov की LIVE-प्रति से byte-तुलनाएँ हटीं (एक-बार की देय-जाँच थी, स्थायी नियम नहीं)
en_hrefs = re.findall(r'class="btn[^"]*" href="([^"]+)"', en)
# v1.3 (10-Nov, Founder-फ़ैसला): 🧭 बटन = उसी भाषा का career-पेज; बाक़ी 3 बटन साझा
ck("en: 4 बटन-कड़ी", en_hrefs == ["/en/career.html","/bhasha.html","/hunar.html","/udyam-shuruat.html"])

dev = re.compile(u"[\u0900-\u0963\u0966-\u097F]")
titles = set()
for c in ORDER:
    # v2.2 (खेप-3): रजिस्टर की भाषा का होम ग़ायब हो तो crash नहीं — साफ़ FAIL, बाक़ी जाँच चलती रहे
    if not os.path.exists(os.path.join(ROOT, c, "index.html")):
        ck(c+": होम-पेज मौजूद (/"+c+"/index.html)", False); continue
    s = rd(c+"/index.html"); T = D[c]; t = c+": "
    if c in RTL: ck(t+"lang+rtl", ('<html lang="%s" dir="rtl">'%c) in s)
    else:        ck(t+"lang", ('<html lang="%s">'%c) in s and 'dir="rtl"' not in s)
    ck(t+"canonical+og:url", s.count('https://acslearn.com/%s/"'%c) >= 2)
    ck(t+"og:locale", ('content="%s"'%T["locale"]) in s)
    hcheck(s, t+"hreflang")
    hh = re.findall(r'class="btn[^"]*" href="([^"]+)"', s)
    ck(t+"🧭 बटन = अपना career-पेज", hh[:1] == ["/%s/career.html" % c] and os.path.isfile(os.path.join(ROOT, c, "career.html")))
    ck(t+"बाक़ी 3 बटन en-बराबर", hh[1:] == en_hrefs[1:])
    ck(t+"font-link", ("family="+T["gfam"] in s) if T["gfam"] not in ("KEEP","LATIN")
       else (("Noto+Sans+Devanagari" in s) if T["gfam"]=="KEEP" else ("family=Inter" in s and "Noto+Sans" not in s)))
    ck(t+"--font override", (":root{--font:'%s'" % T["font"]) in s)
    titles.add(re.search(r"<title>(.*?)</title>", s).group(1))
    v = visible(s)
    sc = D[c].get("script", "")
    if sc != "Latn" and sc in SCR: ck(t+"अपनी लिपि ("+sc+") दिखती", bool(re.search(SCR[sc], v)))
    if sc == "Deva": ck(t+"देवनागरी (लिपि Deva)", bool(dev.search(v)))
    else:
        m = dev.search(v); ck(t+"देवनागरी-रिसाव शून्य", not m, m.group(0) if m else "")
    ck(t+"em-dash सिर्फ़ विरासती पता", v.count("\u2014") == 1 and "Bihar — 851201" in s)
    # 12-Nov-2026: नए रूप वाले होम (खोज-बॉक्स + 6 कदम) में हीरो की "join" पंक्ति और पुराना लंबा विवरण नहीं रहते; बाक़ी 12 कुंजियाँ रहती हैं
    naya = 'class="rasta"' in s
    miss = [k for k in ["pill","join","btn1","btn2","btn3","btn4","tagline","orig","foottag","fbcert","fbcontact","login","ogdesc","desc"] if D[c][k] not in s and not (naya and k in ("join", "desc"))]   # नए रूप में विवरण छोटा और नया है
    ck(t+"data-पाठ 14-कुंजी", not miss, ",".join(miss))
    if c in RTL:
        ck(t+"bdi-बाड़ 9+", s.count('<bdi dir="ltr">') >= 11, str(s.count('<bdi dir="ltr">')))
        ck(t+"certline-bdi", '<bdi dir="ltr">ISO 9001:2015</bdi>' in s and '<bdi dir="ltr">ffgpmt.org</bdi>' in s)
    else:
        ck(t+"bdi अनावश्यक नहीं", "<bdi" not in s)
ck("%d title अलग-अलग" % len(ORDER), len(titles) == len(ORDER))

U = rd("assets/acs-universal.js")
_uv = re.search(r"v2\.(\d+)", U)
ck("universal: v2.2 या नया + तालिका", bool(_uv) and int(_uv.group(1)) >= 2 and "ACS_LANG_HOMES" in U)
tk = sorted(x.split(":")[0].strip() for x in re.search(r"var ACS_LANG_HOMES = \{([^}]+)\}", U).group(1).split(","))
ck("universal-तालिका == data+en", tk == sorted(["en"]+ORDER))
ck("universal: isHome भाषा-होम", "ACS_LANG_HOMES[segH]" in U)
ck("universal: mirror-skip", 'if(lang!=="mirror"){' in U and "mirror-skip बंद" in U)
_sv = re.search(r"CACHE_VERSION = 'v(\d+)'", rd("sw.js"))
ck("sw: आधार v%d या नया" % SW_BASE, bool(_sv) and int(_sv.group(1)) >= SW_BASE, _sv.group(0) if _sv else "")
sm = rd("sitemap-core.xml")
# v1.3 (10-Nov): कुल-गिनती हटी (sitemap बढ़ता रहता है: 62 → 78); घर = build_sitemap.js
ck("sitemap: %d/%d भाषा-होम ठीक एक बार" % (len(ORDER), len(ORDER)), all(sm.count("/%s/</loc>"%c) == 1 for c in ORDER))
ck("sitemap: %d/%d career-पेज ठीक एक बार" % (len(ORDER), len(ORDER)), all(sm.count("/%s/career.html</loc>"%c) == 1 for c in ORDER))
print(); print("कुल जाँचें:", "FAIL "+str(len(fails)) if fails else "सब पास 🏁")
sys.exit(1 if fails else 0)
