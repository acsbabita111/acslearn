# -*- coding: utf-8 -*-
# ============================================================
# build_report_sample.py v1.0 (10-Nov-2026, खेप-1) · परत-4
# काम: career-पेज की "नमूना-रिपोर्ट" तस्वीर assets/career-report-sample-<कोड>.webp बनाना।
# पहले की 15 तस्वीरें हाथ/बाहर से बनी थीं, उनका स्रोत repo में नहीं था। यह generator:
#   साँचा  = assets/cert/report-sample-template.webp (उन्हीं 15 तस्वीरों से पाठ हटाकर बना)
#   लोगो   = /logo.png + /assets/cert/ffgpmt-logo.png (असली फ़ाइलें)
#   पाठ    = generator/data/report_sample_strings.json (हर भाषा का एक खाना)
#   छपाई   = Chromium (playwright) — जटिल लिपियाँ (तमिल/कन्नड़/गुजराती) व RTL सही जुड़ें।
# नमूना-पहचान सब भाषाओं में एक: Sanjay Kumar · ACS-2026-907642 · 09-11-2026 · APT-907642-17।
# फ़ॉन्ट: Noto परिवार; container में न हो तो github.com/notofonts से ~/.fonts।
# चलाना: python3 generator/build_report_sample.py ko he ta    (या --all)
# साँचा दोबारा: python3 generator/build_report_sample.py --make-template  (मूल 15 तस्वीरों से)
# ============================================================
import base64, json, os, sys, io, re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "generator", "data", "report_sample_strings.json")
TPL = os.path.join(ROOT, "assets", "cert", "report-sample-template.webp")
KEYS = ["pill", "aegis", "title", "subtitle", "name", "guardian_l", "guardian_v", "date_l",
        "strong_l", "sugg_l", "s0", "s1", "s2", "s3", "s4", "riasec", "auto",
        "rep_l", "ver_l", "iss_l", "sign", "qr", "scan", "watermark", "font", "dir"]

def b64(path, mime):
    return "data:%s;base64,%s" % (mime, base64.b64encode(open(path, "rb").read()).decode())

def esc(s):
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))

def html(L):
    f = "'Noto Sans','%s',sans-serif" % L["font"]
    d = L["dir"]
    chips = "".join('<span class="chip">%s</span>' % esc(L[k]) for k in ("s1", "s2", "s3", "s4"))
    return """<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{box-sizing:border-box;margin:0;padding:0}
body{width:1120px;height:783px;overflow:hidden}
#c{position:relative;width:1120px;height:783px;background:url(%(tpl)s) 0 0/1120px 783px;font-family:%(f)s;color:#0B1F3A}
.a{position:absolute;white-space:nowrap}
.cx{left:0;width:1120px;text-align:center}
.wm{left:0;top:250px;width:1120px;text-align:center;font-size:150px;font-weight:800;color:rgba(11,31,58,.07);transform:rotate(-26deg);transform-origin:560px 120px}
.pill{left:895px;top:128px;width:110px;height:30px;border-radius:15px;background:#F9A825;border:2px solid #0B1F3A;font-size:16px;font-weight:800;text-align:center;line-height:26px}
.brand{top:186px;font-size:26px;font-weight:800}
.aeg{top:221px;font-size:16px;font-weight:700;color:#1565C0}
.title{top:268px;font-size:48px;font-weight:800;letter-spacing:0}
.sub{top:328px;font-size:18px;font-weight:600;color:#1565C0}
.name{top:358px;font-size:42px;font-weight:800}
.ul{left:380px;top:414px;width:360px;height:3px;background:#F9A825}
.info{top:422px;font-size:18px;color:#33475b}.info b{color:#0B1F3A;font-weight:800}
.lab{top:452px;font-size:13px;font-weight:800;color:#33475b}
.row{left:0;top:470px;width:1120px;display:flex;justify-content:center;gap:16px;direction:ltr} /* पंक्ति सदा ltr: 'सबसे प्रबल' लेबल अपने chip के ऊपर रहे (RTL में भी) */
.strong{height:46px;padding:0 16px;border-radius:12px;background:#0B1F3A;border:3px solid #F9A825;color:#F9A825;font-size:20px;font-weight:800;line-height:40px}
.chip{height:44px;padding:0 16px;border-radius:13px;background:#fff;border:2px solid #0B1F3A;font-size:20px;font-weight:700;line-height:40px;margin-top:1px}
.ria{top:529px;font-size:17px;font-weight:800;color:#1565C0}
.auto{top:552px;font-size:14px;color:#5b6b7b}
.bl{left:130px;font-size:17px;color:#33475b;direction:%(d)s;text-align:left}.bl b{color:#0B1F3A;font-weight:800}
.sig{left:662px;top:635px;width:203px;height:2px;background:#0B1F3A}
.sign{left:662px;width:203px;top:645px;text-align:center;font-size:16px;font-weight:700}
.sorg{left:662px;width:203px;top:668px;text-align:center;font-size:12px;font-weight:800;color:#1565C0}
.qr{left:898px;top:578px;width:89px;height:89px;border:3px solid #0B1F3A;border-radius:8px;background:#fff;font-size:17px;font-weight:800;display:flex;align-items:center;justify-content:center;text-align:center;white-space:normal;line-height:1.1}
.scan{left:867px;width:150px;top:671px;text-align:center;font-size:13px;font-weight:700} /* QR के नीचे, रिबन से पहले */
.logo{position:absolute;border-radius:50%%}
</style></head><body><div id="c" dir="%(d)s">
<div class="a wm">%(watermark)s</div>
<div class="a pill">%(pill)s</div>
<img class="logo" src="%(acs)s" style="left:240px;top:170px;width:93px;height:93px">
<img class="logo" src="%(ffg)s" style="left:798px;top:175px;width:83px;height:83px">
<div class="a cx brand" dir="ltr">Applied Computer School&trade; (ACS)</div>
<div class="a cx aeg">%(aegis)s</div>
<div class="a cx title">%(title)s</div>
<div class="a cx sub">%(subtitle)s</div>
<div class="a cx name">%(name)s</div>
<div class="a ul"></div>
<div class="a cx info"><b>%(guardian_l)s</b> %(guardian_v)s &middot; <b><bdi dir="ltr">ACS ID</bdi>:</b> <bdi dir="ltr">ACS-2026-907642</bdi> &middot; <b>%(date_l)s</b> <bdi dir="ltr">09-11-2026</bdi></div>
<div class="a lab" id="lab1" style="text-align:center">%(strong_l)s</div>
<div class="a lab" id="lab2" style="text-align:center">%(sugg_l)s</div>
<div class="a row"><span class="strong">&#11088; %(s0)s</span>%(chips)s</div>
<div class="a cx ria">%(riasec)s</div>
<div class="a cx auto">%(auto)s</div>
<div class="a bl" style="top:604px"><b>%(rep_l)s</b> <bdi dir="ltr">APT-907642-17</bdi></div>
<div class="a bl" style="top:632px"><b>%(ver_l)s</b> <bdi dir="ltr">acslearn.com/verify</bdi></div>
<div class="a bl" style="top:660px"><b>%(iss_l)s</b> <bdi dir="ltr">FFGPMTrust &middot; ACS&trade;</bdi></div>
<div class="a sig"></div>
<div class="a sign">%(sign)s</div>
<div class="a sorg" dir="ltr">FFGPMTrust &middot; ACS&trade;</div>
<div class="a qr">%(qr)s</div>
<div class="a scan">%(scan)s</div>
</div></body></html>""" % dict(tpl=b64(TPL, "image/webp"), f=f, d=d, chips=chips,
        acs=b64(os.path.join(ROOT, "logo.png"), "image/png"),
        ffg=b64(os.path.join(ROOT, "assets", "cert", "ffgpmt-logo.png"), "image/png"),
        **{k: esc(L[k]) for k in KEYS if k not in ("font", "dir")})

ORIG15 = ["ar", "bn", "de", "en", "es", "fr", "hi", "id", "ja", "mr", "pt", "ru", "te", "ur", "zh"]

def make_template():
    """साँचा दोबारा बनाना: मूल 15 तस्वीरों का पिक्सेल-अधिकतम (भाषा-पाठ मिटे, सजावट बचे) →
    पाठ-क्षेत्रों में मुखौटा-धुंधलापन (परछाइयाँ साफ़) → निचले रिबन पर मध्य-मान (भाषा-पाठ की परछाईं नहीं)।"""
    import numpy as np
    from PIL import Image
    from scipy.ndimage import gaussian_filter
    ims = [np.asarray(Image.open(os.path.join(ROOT, "assets", "career-report-sample-%s.webp" % c)).convert("RGB"), dtype=np.float32) for c in ORIG15]
    stk = np.stack(ims)
    img = np.max(stk, axis=0)
    # निचला रिबन (कुछ भाषाओं का पाठ यहाँ था): अधिकतम रंग-मेल बनाता, इसलिए मध्य-मान — ज़्यादातर में साफ़ रिबन
    img[675:722, 560:1060] = np.median(stk[:, 675:722, 560:1060], axis=0)
    V = img.max(axis=2); mn = img.min(axis=2); S = np.where(V > 0, (V - mn) / np.maximum(V, 1), 0)
    box = np.zeros(V.shape, bool)
    for (x0, y0, x1, y1) in [(125, 158, 1000, 565), (95, 560, 430, 700), (640, 545, 1025, 715), (880, 118, 1015, 168)]:
        box[y0:y1, x0:x1] = True
    mask = box & (V > 150) & (S < 0.35); m = mask.astype(np.float32); den = gaussian_filter(m, 22) + 1e-6
    out = img.copy()
    for ch in range(3): out[:, :, ch] = np.where(mask, gaussian_filter(img[:, :, ch] * m, 22) / den, img[:, :, ch])
    out = np.clip(out, 0, 255).astype(np.uint8)
    Image.fromarray(out).save(TPL, "WEBP", quality=92)
    print("✅ साँचा → %s (%d bytes)" % (os.path.relpath(TPL, ROOT), os.path.getsize(TPL)))

def check(code, L):
    miss = [k for k in KEYS if not isinstance(L.get(k), str) or not L[k].strip()]
    if miss: raise SystemExit("⛔ %s: खाने ख़ाली/ग़ायब: %s" % (code, ",".join(miss)))
    if L["dir"] not in ("ltr", "rtl"): raise SystemExit("⛔ %s: dir ग़लत" % code)
    for k in KEYS:
        if re.search(r'[<>"]', L[k]) or u"\u2014" in L[k]: raise SystemExit("⛔ %s.%s: < > \" या em-dash" % (code, k))

def main(codes):
    from playwright.sync_api import sync_playwright
    D = json.load(io.open(DATA, encoding="utf-8"))
    if codes == ["--all"]: codes = [c for c in D if not c.startswith("_")]
    for c in codes:
        if c not in D: raise SystemExit("⛔ data में नहीं: " + c)
        check(c, D[c])
    from PIL import Image
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1120, "height": 783})
        for c in codes:
            pg.set_content(html(D[c])); pg.wait_for_timeout(400)
            # डिब्बे में फ़िट: लंबी भाषाओं (तमिल आदि) में बाहर जाए तो अक्षर-आकार घटे, न्यूनतम 10px
            pg.evaluate("""()=>{for(const sel of ['.sign','.scan','.qr','.sorg','.aeg','.sub','.info','.ria','.auto','.title','.name','.pill','.bl']){
                 for(const e of document.querySelectorAll(sel)){let f=parseFloat(getComputedStyle(e).fontSize);
                   const lim=(sel==='.cx'||e.classList.contains('cx'))?980:0;
                   const over=()=> lim ? (e.firstChild && (()=>{const r=document.createRange();r.selectNodeContents(e);return r.getBoundingClientRect().width>lim})())
                                       : (e.scrollWidth>e.clientWidth+1 || e.scrollHeight>e.clientHeight+1);
                   while(over() && f>10){f-=1; e.style.fontSize=f+'px';}}}}""")
            # ऊपर-नीचे टकराव (खेप-4, फ़ारसी से सीख): शीर्षक की असली स्याही उप-पंक्ति की स्याही पर, या नाम की स्याही
            # सुनहरी रेखा पर न चढ़े। सीमा: स्याही-टकराव 4px से अधिक (नाप 10-Nov: tr 1, ml 4 = आँख से साफ़; fa 10/12 = दिखता टकराव)। नाप canvas की असली स्याही (actualBoundingBox) से — अक्षर-डिब्बे (line-box) से नहीं,
            # इसलिए जहाँ टकराव नहीं (Latin/सिरिलिक आदि), वहाँ नियम कुछ नहीं बदलता।
            pg.evaluate("""()=>{const ink=(e)=>{const cs=getComputedStyle(e),c=document.createElement('canvas').getContext('2d');
                   c.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily; const m=c.measureText(e.textContent);
                   const r=document.createRange(); r.selectNodeContents(e); const R=r.getBoundingClientRect(), base=R.top+m.fontBoundingBoxAscent;
                   return {top:base-m.actualBoundingBoxAscent, bottom:base+m.actualBoundingBoxDescent};};
                 const lim=(b)=> (b.classList.contains('ul')||b.classList.contains('row')) ? b.getBoundingClientRect().top : ink(b).top;
                 for(const [a,b] of [['.title','.sub'],['.name','.ul'],['#lab1','.row'],['#lab2','.row']]){const A=document.querySelector(a),B=document.querySelector(b);
                   let f=parseFloat(getComputedStyle(A).fontSize);
                   while(ink(A).bottom>lim(B)+4 && f>(a[0]==='#'?10:26)){f-=1;A.style.fontSize=f+'px';}}}""")
            # chip-पंक्ति 880px से चौड़ी हो तो chips छोटे (किनारी की पत्तियों से दूर रहें)
            pg.evaluate("""()=>{const row=document.querySelector('.row'); const ks=[...row.children];
                 const wid=()=>{const a=ks[0].getBoundingClientRect(), b=ks[ks.length-1].getBoundingClientRect(); return b.right-a.left;};
                 let f=20, pad=16; while(wid()>880 && f>13){ f-=1; pad=Math.max(9,pad-1);
                   ks.forEach(k=>{k.style.fontSize=f+'px'; k.style.paddingLeft=k.style.paddingRight=pad+'px';}); row.style.gap='12px'; }}""")
            # लेबल अपने chip(s) के ठीक ऊपर — chip-पंक्ति की चौड़ाई भाषा से बदलती है
            pg.evaluate("""()=>{const put=(lab,l,r)=>{const c=(l+r)/2, w=Math.max(r-l, lab.scrollWidth+4);
                 lab.style.left=(c-w/2)+'px'; lab.style.width=w+'px';};
               const s=document.querySelector('.strong').getBoundingClientRect(); put(document.getElementById('lab1'),s.left,s.right);
               const ch=[...document.querySelectorAll('.chip')].map(e=>e.getBoundingClientRect());
               put(document.getElementById('lab2'),ch[0].left,ch[ch.length-1].right);}""")
            png = pg.screenshot(clip={"x": 0, "y": 0, "width": 1120, "height": 783})
            # कोई पंक्ति साँचे से बाहर न जाए: row-चौड़ाई जाँच
            w = pg.evaluate("(()=>{const k=[...document.querySelector('.row').children];return k[k.length-1].getBoundingClientRect().right-k[0].getBoundingClientRect().left})()")
            if w > 900: raise SystemExit("⛔ %s: क्षेत्र-पंक्ति बहुत चौड़ी (%dpx > 900)" % (c, w))
            spill = pg.evaluate("""[...document.querySelectorAll('.a')].filter(e=>{
              if (e.classList.contains('wm') || e.classList.contains('row')) return false;
              if (e.classList.contains('cx')) { const r=document.createRange(); r.selectNodeContents(e); return r.getBoundingClientRect().width>990; }
              return e.scrollWidth>e.clientWidth+2 || e.scrollHeight>e.clientHeight+2}).map(e=>e.className)""")
            if spill: raise SystemExit("⛔ %s: पाठ अपने डिब्बे से बाहर: %s" % (c, spill))
            clash = pg.evaluate("""(()=>{const ink=(e)=>{const cs=getComputedStyle(e),c=document.createElement('canvas').getContext('2d');
                   c.font=cs.fontWeight+' '+cs.fontSize+' '+cs.fontFamily; const m=c.measureText(e.textContent);
                   const r=document.createRange(); r.selectNodeContents(e); const R=r.getBoundingClientRect(), base=R.top+m.fontBoundingBoxAscent;
                   return {top:base-m.actualBoundingBoxAscent, bottom:base+m.actualBoundingBoxDescent};};
                 const lim=(b)=> (b.classList.contains('ul')||b.classList.contains('row')) ? b.getBoundingClientRect().top : ink(b).top;
              return [['.title','.sub'],['.name','.ul'],['#lab1','.row'],['#lab2','.row']].filter(([a,b])=>ink(document.querySelector(a)).bottom>lim(document.querySelector(b))+4).map(x=>x[0]);})()""")
            if clash: raise SystemExit("⛔ %s: ऊपर-नीचे टकराव बचा: %s" % (c, clash))
            out = os.path.join(ROOT, "assets", "career-report-sample-%s.webp" % c)
            Image.open(io.BytesIO(png)).convert("RGB").save(out, "WEBP", quality=88, method=6)
            print("✅ %s → %s (%d bytes)" % (c, os.path.relpath(out, ROOT), os.path.getsize(out)))
        b.close()

if __name__ == "__main__":
    if len(sys.argv) < 2: raise SystemExit("उपयोग: build_report_sample.py <कोड...> | --all | --make-template")
    if sys.argv[1] == "--make-template": make_template()
    else: main(sys.argv[1:])
