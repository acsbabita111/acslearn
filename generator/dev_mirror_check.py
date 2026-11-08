# -*- coding: utf-8 -*-
# dev_mirror_check v1.2 (09-Nov-2026) — 13 भाषा-होम + पैच की fail-closed जाँच
# चलाना: repo-रूट से  python3 generator/dev_mirror_check.py
# तुलना-स्रोत: live-प्रतियाँ उसी फ़ोल्डर में live_* नाम से रखें (नीचे LIVE)
import io, re, sys, json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIVE = os.environ.get("ACS_LIVE_DIR", "/tmp/live")
fails = []
def ck(n, ok, info=""):
    print(("✅" if ok else "❌"), n, info)
    if not ok: fails.append(n)
def rd(p): return io.open(os.path.join(ROOT, p), encoding="utf-8").read()
def rl(p): return io.open(os.path.join(LIVE, p), encoding="utf-8").read()
def visible(s):
    s = re.sub(r"<script[\s\S]*?</script>", "", s)
    s = re.sub(r"<style[\s\S]*?</style>", "", s)
    return re.sub(r"<[^>]+>", " ", s)

D = json.loads(re.search(r"var MIRROR_HOME = (\{[\s\S]*?\});", rd("generator/data/mirror_home_strings.js")).group(1))
ORDER = list(D.keys()); ALL = ["hi","en"] + ORDER; RTL = [c for c in ORDER if D[c]["dir"]=="rtl"]
ck("data: 13 भाषाएँ", len(ORDER) == 13, ",".join(ORDER))

def url(c): return "https://acslearn.com/" if c=="hi" else "https://acslearn.com/%s/" % c
EXPECT = set((c, url(c)) for c in ALL) | {("x-default","https://acslearn.com/")}
def hcheck(s, tag):
    got = set(re.findall(r'hreflang="([^"]+)" href="([^"]+)"', s))
    ck(tag+": hreflang 16 सटीक", got == EXPECT, str(len(got)))

en = rd("en/index.html"); root = rd("index.html")
hcheck(en, "en"); hcheck(root, "root")
ck("en: og:locale en_US", 'content="en_US"' in en and "hi_IN" not in en)
ck("en: og:desc उद्यम-अवसर", "950+ enterprise opportunities." in en and "950+ enterprises." not in en)
blk = "\n" + "\n".join(l for l in root.splitlines() if 'rel="alternate" hreflang' in l)
ck("root: hreflang के सिवा byte-अछूता", root.replace(blk, "") == rl("index.html"))
enl = rl("en/index.html")
en_rev = en.replace(blk, "").replace('content="en_US"','content="hi_IN"').replace("950+ enterprise opportunities.","950+ enterprises.")
ck("en: सिर्फ़ 3 गिने बदलाव", en_rev == enl)
en_hrefs = re.findall(r'class="btn[^"]*" href="([^"]+)"', en)
ck("en: 4 बटन-कड़ी", en_hrefs == ["/career.html","/bhasha.html","/hunar.html","/udyam-shuruat.html"])

dev = re.compile(u"[\u0900-\u0963\u0966-\u097F]")
titles = set()
for c in ORDER:
    s = rd(c+"/index.html"); T = D[c]; t = c+": "
    if c in RTL: ck(t+"lang+rtl", ('<html lang="%s" dir="rtl">'%c) in s)
    else:        ck(t+"lang", ('<html lang="%s">'%c) in s and 'dir="rtl"' not in s)
    ck(t+"canonical+og:url", s.count('https://acslearn.com/%s/"'%c) >= 2)
    ck(t+"og:locale", ('content="%s"'%T["locale"]) in s)
    hcheck(s, t+"hreflang")
    ck(t+"बटन en-बराबर", re.findall(r'class="btn[^"]*" href="([^"]+)"', s) == en_hrefs)
    ck(t+"font-link", ("family="+T["gfam"] in s) if T["gfam"] not in ("KEEP","LATIN")
       else (("Noto+Sans+Devanagari" in s) if T["gfam"]=="KEEP" else ("family=Inter" in s and "Noto+Sans" not in s)))
    ck(t+"--font override", (":root{--font:'%s'" % T["font"]) in s)
    titles.add(re.search(r"<title>(.*?)</title>", s).group(1))
    v = visible(s)
    if c == "mr": ck(t+"देवनागरी (मराठी)", bool(dev.search(v)))
    else:
        m = dev.search(v); ck(t+"देवनागरी-रिसाव शून्य", not m, m.group(0) if m else "")
    ck(t+"em-dash सिर्फ़ विरासती पता", v.count("\u2014") == 1 and "Bihar — 851201" in s)
    miss = [k for k in ["pill","join","btn1","btn2","btn3","btn4","tagline","orig","foottag","fbcert","fbcontact","login","ogdesc","desc"] if D[c][k] not in s]
    ck(t+"data-पाठ 14-कुंजी", not miss, ",".join(miss))
    if c in RTL:
        ck(t+"bdi-बाड़ 9+", s.count('<bdi dir="ltr">') >= 11, str(s.count('<bdi dir="ltr">')))
        ck(t+"certline-bdi", '<bdi dir="ltr">ISO 9001:2015</bdi>' in s and '<bdi dir="ltr">ffgpmt.org</bdi>' in s)
    else:
        ck(t+"bdi अनावश्यक नहीं", "<bdi" not in s)
ck("13 title अलग-अलग", len(titles) == 13)

U = rd("assets/acs-universal.js")
ck("universal: v2.2 + तालिका", "v2.2" in U and "ACS_LANG_HOMES" in U)
tk = sorted(x.split(":")[0].strip() for x in re.search(r"var ACS_LANG_HOMES = \{([^}]+)\}", U).group(1).split(","))
ck("universal-तालिका == data+en", tk == sorted(["en"]+ORDER))
ck("universal: isHome भाषा-होम", "ACS_LANG_HOMES[segH]" in U)
ck("universal: mirror-skip", 'if(lang!=="mirror"){' in U and "mirror-skip बंद" in U)
sw = rd("sw.js"); swl = rl("sw.js")
d = [1 for a,b in zip(sw.splitlines(), swl.splitlines()) if a != b]
ck("sw: v823 · सिर्फ़ 1 पंक्ति", len(d) == 1 and "'v823'" in sw)
sm = rd("sitemap-core.xml")
ck("sitemap: 62 URL · 13 नए", sm.count("<loc>") == 62 and all(("/%s/</loc>"%c) in sm for c in ORDER))
print(); print("कुल जाँचें:", "FAIL "+str(len(fails)) if fails else "सब पास 🏁")
sys.exit(1 if fails else 0)
