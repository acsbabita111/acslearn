# generator/build_kaithi_vyakaran_pdf.py — v2.0 (27-Oct-2026) — ब्रांड-परत: तिरंगा-header हर पेज · logo · QR · cover/back-cover (Founder-आदेश)
# कैथी व्याकरण-पुस्तिका (A4) + वर्णमाला-चार्ट (A4) — दोनों PDF playwright-Chromium से।
# लोहे का नियम (v1.5): लिपि-आकार (shaping) सिर्फ़ Chromium करे — फ़ॉन्ट NotoSansKaithi ttf local embed।
# सामग्री-स्रोत: assets/kaithi_lipi.js के नक़्शे + 33 पाठों के दर्ज तथ्य — कुछ गढ़ा नहीं।
# चलाना: python3 generator/build_kaithi_vyakaran_pdf.py   (repo-रूट से)
# देय: /home/claude/kaithi/release/kaithi-vyakaran-pustika.pdf + kaithi-varnamala-chart.pdf
import json, os, re, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = "/home/claude/kaithi/release"
os.makedirs(OUT, exist_ok=True)
FONT = "/home/claude/fonts/NotoSansKaithi-Regular.ttf"
assert os.path.exists(FONT), "फ़ॉन्ट नहीं"
LOGO = open("/tmp/logo_b64.txt").read()
QR_COURSE = open("/tmp/qr_course_b64.txt").read()
QR_SITE = open("/tmp/qr_site_b64.txt").read()

# ---- इंजन के नक़्शे node से निकालो (एक ही सच — kaithi_lipi.js) ----
node_code = r'''
var vm=require("vm"),fs=require("fs");
var sb={window:{}};vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1],"utf8"),sb);
var K=sb.window.KAITHI_LIPI,toK=K.devaToKaithi;
var SW=["अ","आ","इ","ई","उ","ऊ","ए","ऐ","ओ","औ"];
var VY=["क","ख","ग","घ","च","छ","ज","झ","ट","ठ","ड","ढ","ण","त","थ","द","ध","न","प","फ","ब","भ","म","य","र","ल","व","श","ष","स","ह","ड़","ढ़"];
var MT=["ा","ि","ी","ु","ू","े","ै","ो","ौ","ं"];
var MTK=MT.map(function(m){return toK("क"+m)});
var BK=["क","ग","त","न","प","ब","म","र","ल","स"].map(function(c){return{c:c,row:MT.map(function(m){return toK(c+m)}),base:toK(c)}});
var WORDS=["राम","गाँव","बिहार","खतियान","जमाबंदी","बैनामा","खेसरा","लगान","मौजा","रकबा","चौहद्दी","पूरब","पच्छिम","उत्तर","दक्खिन","वल्द","साकिन","मिति","नकल","डीह","परती","धनहर","भीठ","रैयत","बनाम","लिखितं","गवाह","थाना","परगना","जिला","खाता","दखल","हिंदी","भोजपुरी","मगही","कैथी","पटना","खगड़िया","सोना","पानी"];
console.log(JSON.stringify({
 sw:SW.map(function(a){return[a,toK(a)]}),
 vy:VY.map(function(a){return[a,toK(a)]}),
 mt:MT.map(function(m,i){return[m,MTK[i]]}),
 bk:BK, hal:toK("क्"), samy:[["क्ष",toK("क्ष")],["त्र",toK("त्र")],["ज्ञ",toK("ज्ञ")],["स्त",toK("स्त")],["प्र",toK("प्र")]],
 words:WORDS.map(function(w){return[w,toK(w)]}),
 danda:[toK("।"),toK("॥")]
}));
'''
j = subprocess.run(["node", "-e", node_code, os.path.join(ROOT, "assets/kaithi_lipi.js")],
                   capture_output=True, text=True, cwd=ROOT)
assert j.returncode == 0, j.stderr
D = json.loads(j.stdout)

CSS = """
@font-face{font-family:'Kaithi';src:url('file://__FONT__');}
@page{size:A4;margin:14mm 12mm 16mm 12mm;}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Noto Sans Devanagari','Kaithi',sans-serif;color:#0B1F3A;font-size:17px;line-height:1.7}
.kai{font-family:'Kaithi','Noto Sans Devanagari',sans-serif}
.pg{page-break-after:always;padding:2mm 0}
.pg:last-child{page-break-after:auto}
h1{font-size:30px;color:#0B1F3A;border-bottom:4px solid #F9A825;padding-bottom:6px;margin-bottom:10px}
h2{font-size:23px;color:#1565C0;margin:14px 0 8px;border-left:6px solid #F9A825;padding-left:8px}
p{margin:6px 0;text-align:justify}
table{border-collapse:collapse;width:100%;margin:8px 0}
td,th{border:1.5px solid #0B1F3A;padding:5px 7px;text-align:center;font-size:17px}
th{background:#0B1F3A;color:#fff;font-size:16px}
.big{font-size:34px}.huge{font-size:44px}
.cell-k{font-size:30px}.cell-d{font-size:16px;color:#2E7D32}
.note{background:#F5F7FA;border:1.5px dashed #1565C0;border-radius:8px;padding:8px 10px;margin:8px 0;font-size:16px}
.warn{background:#fff7e0;border:1.5px solid #F9A825;border-radius:8px;padding:8px 10px;margin:8px 0;font-size:16px}
.hdr{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #F9A825;margin-bottom:6px;padding-bottom:3px}
.hdr .l{font-weight:800;color:#0B1F3A}.hdr .r{font-size:14px;color:#1565C0}
.foot{font-size:13px;color:#555;text-align:center;margin-top:8px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}
.gcell{border:1.5px solid #0B1F3A;border-radius:8px;text-align:center;padding:5px 2px}
.gcell .k{font-size:32px;display:block}.gcell .d{font-size:15px;color:#2E7D32}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}

/* ===== ब्रांड-परत v2.0 ===== */
.brand{display:flex;align-items:center;gap:8px;border-bottom:none;padding:4px 0 6px}
.brand img{height:34px}
.brand .bn{font-weight:800;font-size:17px;color:#0B1F3A;line-height:1.2}
.brand .bt{font-size:12px;color:#1565C0}
.tiranga{height:6px;background:linear-gradient(90deg,#F9A825 0 33%,#fff 33% 66%,#2E7D32 66% 100%);border:1px solid #d8d8d8;border-radius:3px;margin-bottom:6px}
.bfoot{display:flex;justify-content:space-between;align-items:center;border-top:2px solid #F9A825;margin-top:10px;padding-top:4px;font-size:12.5px;color:#0B1F3A}
.bfoot .pg-no{background:#0B1F3A;color:#F9A825;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-weight:800}
.secno{display:inline-flex;width:30px;height:30px;border-radius:50%;background:#F9A825;color:#0B1F3A;font-weight:800;align-items:center;justify-content:center;margin-right:8px;font-size:17px}
.cover{background:#0B1F3A;color:#F5F7FA;margin:-14mm -12mm -16mm -12mm;padding:16mm 14mm;min-height:297mm;position:relative}
.cover .wm{position:absolute;right:-6mm;bottom:10mm;font-size:260px;color:rgba(249,168,37,.08);line-height:1}
.gold-rule{height:3px;background:#F9A825;border:none;margin:10px 0}
""".replace("__FONT__", FONT)

PGNO = {"n": 1}
def hdr(t):
    PGNO["n"] += 1
    return ('<div class="tiranga"></div>'
            '<div class="brand"><img src="data:image/png;base64,%s">'
            '<div><div class="bn">अप्लाइड कंप्यूटर स्कूल™ <span style="color:#1565C0">(Applied Computer School)</span></div>'
            '<div class="bt">From Village to World — 130 भाषाओं में मुफ़्त शिक्षा · acslearn.com</div></div>'
            '<div style="margin-left:auto;font-size:13px;color:#1565C0;font-weight:700">🏛️ कैथी व्याकरण-पुस्तिका</div></div>'
            '<div class="hdr"><span class="l">%s</span><span class="r">FFGPMTrust · ISO 9001:2015</span></div>') % (LOGO, t)
def bfoot():
    return ('<div class="bfoot"><span>📱 WhatsApp: wa.me/919431210092 · acs.chautham@gmail.com</span>'
            '<span>मुफ़्त 33-पाठ कैथी कोर्स: acslearn.com</span>'
            '<span class="pg-no">%d</span></div>') % PGNO["n"]

def tbl_pairs(pairs, perrow=6, kdcls=("cell-k kai", "cell-d")):
    rows, cells = [], []
    for d, k in pairs:
        cells.append('<td><span class="%s">%s</span><br><span class="%s">%s</span></td>' % (kdcls[0], k, kdcls[1], d))
        if len(cells) == perrow:
            rows.append("<tr>" + "".join(cells) + "</tr>"); cells = []
    if cells:
        rows.append("<tr>" + "".join(cells) + ('<td style="border:none"></td>' * (perrow - len(cells))) + "</tr>")
    return "<table>%s</table>" % "".join(rows)

# ================= पुस्तिका =================
P = []
# आवरण
P.append("""<div class="pg"><div class="cover">
<div class="wm kai">𑂍</div>
<div style="display:flex;align-items:center;gap:12px"><img src="data:image/png;base64,""" + LOGO + """" style="height:60px;background:#fff;border-radius:12px;padding:5px">
<div><div style="font-size:22px;font-weight:800;color:#F9A825">अप्लाइड कंप्यूटर स्कूल™</div>
<div style="font-size:14px;color:#F5F7FA">Applied Computer School · FFGPMTrust · स्थापना 2011 · ISO 9001:2015</div></div></div>
<hr class="gold-rule">
<div style="text-align:center;margin-top:22mm">
<div class="kai" style="font-size:120px;color:#F9A825">𑂍𑂶𑂟𑂲</div>
<h1 style="border:none;font-size:42px;color:#fff;margin-top:6px">कैथी व्याकरण-पुस्तिका</h1>
<p style="text-align:center;font-size:19px;color:#F9A825">बिहार-यूपी की पुरानी दफ़्तरी लिपि — वर्णमाला से खतियान तक, एक जगह</p>
<p style="text-align:center;font-size:16px;color:#F5F7FA">लिपि-नियम · वर्णमाला · मात्राएँ · बारहखड़ी · धोखेबाज़-जोड़े · सन-गणित · दफ़्तरी शब्द</p></div>
<div style="display:flex;justify-content:center;gap:14px;align-items:center;margin-top:18mm">
<img src="data:image/png;base64,""" + QR_COURSE + """" style="height:90px;border:4px solid #F9A825;border-radius:10px">
<div style="text-align:left;font-size:16px;color:#F5F7FA">📱 QR scan करें —<br><b style="color:#F9A825">मुफ़्त 33-पाठ कोर्स</b> तुरंत खुलेगा<br>acslearn.com/courses/hi/kaithi-lipi/</div></div>
<p style="position:absolute;bottom:14mm;left:0;right:0;text-align:center;font-size:14px;color:#F5F7FA">"From Village to World" — 130 भाषाओं में मुफ़्त डिजिटल शिक्षा · खगड़िया, बिहार से विश्व तक</p>
</div></div>""")
# 1. लिपि-परिचय व नियम
P.append('<div class="pg">' + hdr("1. लिपि के 5 पक्के नियम") + """
<h1>कैथी लिपि — 5 पक्के नियम</h1>
<p><b>नियम-1:</b> कैथी बाएँ से दाएँ लिखी जाती है — देवनागरी की ही दिशा।</p>
<p><b>नियम-2:</b> देवनागरी जैसी <b>लगातार शिरोरेखा (माथे की रेखा) नहीं</b> होती। हर अक्षर अलग खड़ा दिखता है।</p>
<p><b>नियम-3:</b> अंक <b>देवनागरी अंकों जैसे ही</b> (१ २ ३ …) — कैथी के अपने अलग अंक नहीं।</p>
<p><b>नियम-4:</b> मात्राएँ देवनागरी की तरह अक्षर के आगे-पीछे-ऊपर-नीचे लगती हैं — कुल 10 मुख्य मात्राएँ + हलंत।</p>
<p><b>नियम-5:</b> वाक्य का अंत दंड <span class="kai big">%s</span> से, बड़े हिस्से का अंत दोहरे दंड <span class="kai big">%s</span> से।</p>
<div class="warn">⚠️ <b>महा-धोखेबाज़ अक्षर:</b> कैथी का <b>च</b> देखने में देवनागरी के <b>य</b> जैसा लगता है — यही सबसे आम पढ़ने की ग़लती है। धोखेबाज़-जोड़ों की पूरी सूची पृष्ठ-6 पर।</div>
<div class="note">यह पुस्तिका ACS कोर्स के 33 पाठों का निचोड़ है। हर नियम वही है जो पाठों में सिखाया गया — नया कुछ नहीं।</div>
</div>""" % (D["danda"][0], D["danda"][1]))
# 2. स्वर
P.append('<div class="pg">' + hdr("2. स्वर (10)") + "<h1>स्वर — 10 अक्षर</h1>" + tbl_pairs(D["sw"], 5) +
 '<p>हर खाने में ऊपर <b>कैथी रूप</b>, नीचे हरे रंग में <b>देवनागरी</b>। ऋ कैथी में अलग अक्षर नहीं — शब्दों में "रि" से काम चलता है (पाठ-5)।</p></div>')
# 3-4. व्यंजन
vy = D["vy"]
P.append('<div class="pg">' + hdr("3. व्यंजन (भाग-1)") + "<h1>व्यंजन — क से न</h1>" + tbl_pairs(vy[:18], 6) + "</div>")
P.append('<div class="pg">' + hdr("4. व्यंजन (भाग-2)") + "<h1>व्यंजन — प से ढ़</h1>" + tbl_pairs(vy[18:], 6) +
 '<div class="note">ड़ और ढ़ कैथी के <b>अपने अलग अक्षर</b> हैं (U+1109A, U+1109C) — ड/ढ के नीचे बिंदी नहीं लगती (पाठ-10)।</div></div>')
# 5. मात्राएँ
mt_rows = "".join('<tr><td style="font-size:22px">क%s</td><td class="kai" style="font-size:30px">%s</td><td>%s</td></tr>'
                  % (d, k, nm) for (d, k), nm in zip(D["mt"], ["आ की मात्रा","इ की मात्रा — <b>माथे से बाईं ओर निकली रेखा</b> (पाठ-6 का ख़ास नियम)","ई की मात्रा","उ की मात्रा","ऊ की मात्रा","ए की मात्रा","ऐ की मात्रा","ओ की मात्रा","औ की मात्रा","अनुस्वार (बिंदी)"]))
P.append('<div class="pg">' + hdr("5. मात्राएँ (10) + हलंत") + "<h1>मात्राएँ — क पर लगाकर</h1>" +
 '<table><tr><th>देवनागरी</th><th>कैथी</th><th>नाम / नियम</th></tr>' + mt_rows +
 '<tr><td style="font-size:22px">क्</td><td class="kai" style="font-size:30px">%s</td><td>हलंत — स्वर काटना (संयुक्ताक्षर की चाबी)</td></tr></table></div>' % D["hal"])
# 6. धोखेबाज़-जोड़े
P.append('<div class="pg">' + hdr("6. धोखेबाज़-जोड़े") + """<h1>धोखेबाज़-जोड़े — आँख का धोखा</h1>
<p>ये कैथी अक्षर देवनागरी के <b>दूसरे</b> अक्षरों जैसे दिखते हैं। पढ़ते समय यहीं ग़लती होती है:</p>
<table><tr><th>कैथी अक्षर</th><th>असल में है</th><th>पर दिखता है (देवनागरी)</th></tr>""" +
 "".join('<tr><td class="kai" style="font-size:32px">%s</td><td style="font-size:20px"><b>%s</b></td><td style="font-size:20px;color:#b00">%s जैसा</td></tr>'
   % (dict(D["vy"])[a], a, b) for a, b in [("च","य"),("ब","व"),("र","स"),("भ","मा"),("ध","घ")]) +
 '</table><div class="warn">याद रखने का सूत्र (पाठ-7): "कैथी का <b>च</b>, देवनागरी का <b>य</b> बनकर आता है" — जब भी य-जैसा दिखे, पहले च सोचें।</div></div>')
# 7. संयुक्ताक्षर
P.append('<div class="pg">' + hdr("7. संयुक्ताक्षर") + "<h1>जुड़े अक्षर — हलंत से</h1>" +
 '<p>कैथी में संयुक्त अक्षर हलंत-जोड़ से बनते हैं (पहला अक्षर + हलंत + दूसरा):</p>' + tbl_pairs(D["samy"], 5) +
 '<div class="note">खतियान में सबसे आम जोड़: <b>स्त</b> (दस्तख़त), <b>प्र</b> (प्रमाण) — इन्हें बार-बार लिखकर पक्का करें।</div></div>')
# 8-9. बारहखड़ी
def bk_table(rows):
    h = "<tr><th>अक्षर</th>" + "".join("<th>%s</th>" % m for m, _ in D["mt"]) + "</tr>"
    b = "".join("<tr><td style='font-size:20px'><b>%s</b> <span class='kai'>%s</span></td>" % (r["c"], r["base"]) +
                "".join("<td class='kai' style='font-size:24px'>%s</td>" % c for c in r["row"]) + "</tr>" for r in rows)
    return "<table>%s%s</table>" % (h, b)
P.append('<div class="pg">' + hdr("8. बारहखड़ी (भाग-1)") + "<h1>बारहखड़ी — क से ब</h1>" + bk_table(D["bk"][:5]) + "</div>")
P.append('<div class="pg">' + hdr("9. बारहखड़ी (भाग-2)") + "<h1>बारहखड़ी — म से स</h1>" + bk_table(D["bk"][5:]) + "</div>")
# 10. चिह्न + सन-गणित
P.append('<div class="pg">' + hdr("10. चिह्न व सन-गणित") + """<h1>दफ़्तरी चिह्न + तीन घड़ी-सूत्र</h1>
<table><tr><th>चिह्न</th><th>काम</th></tr>
<tr><td class="kai big">%s</td><td>दंड — वाक्य पूरा</td></tr>
<tr><td class="kai big">%s</td><td>दोहरा दंड — बड़ा हिस्सा/पाठ पूरा</td></tr>
<tr><td class="kai big">&#x110BB;</td><td>संक्षेप-गोला — छोटा किया गया शब्द (जैसे नं॰)</td></tr></table>
<h2>तीन घड़ी-सूत्र (पाठ-21)</h2>
<p><b>फसली सन → ईस्वी:</b> फसली + 593 ≈ ईस्वी। (जैसे 1333 फसली ≈ 1926 ईस्वी)</p>
<p><b>विक्रम संवत → ईस्वी:</b> संवत − 57 = ईस्वी। (जैसे 1990 संवत = 1933 ईस्वी)</p>
<p><b>आना-गणित (पाठ-17/23):</b> 16 आना = पूरा · 8 आना = आधा · 4 आना = चौथाई। ज़मीन-नाप: 1 एकड़ = 100 डिसमिल · 1 कट्ठा ≈ सवा 3 डिसमिल।</p>
<div class="note">ये सूत्र <b>अंदाज़-नियम</b> हैं — पुराने काग़ज़ों पर महीना-भेद से 1 साल इधर-उधर हो सकता है; पक्की तारीख़ दस्तावेज़ के पूरे संदर्भ से मिलाएँ।</div>
</div>""" % (D["danda"][0], D["danda"][1]))
# 11-12. दफ़्तरी शब्द
wpairs = D["words"]
P.append('<div class="pg">' + hdr("11. दफ़्तरी शब्द (भाग-1)") + "<h1>खतियान-शब्द कैथी में — 1</h1>" + tbl_pairs(wpairs[:20], 4) + "</div>")
P.append('<div class="pg">' + hdr("12. दफ़्तरी शब्द (भाग-2)") + "<h1>खतियान-शब्द कैथी में — 2</h1>" + tbl_pairs(wpairs[20:], 4) +
 '<div class="note">हर शब्द का अर्थ व असली-पन्ना अभ्यास कोर्स के पाठ 22-30 में। परीक्षा-द्वार dashboard में — 120 प्रश्न, पास 60%.</div>'
 '</div>')

# हर content-पेज (cover छोड़) में brand-footer
for _i in range(1, len(P)):
    assert P[_i].rstrip().endswith("</div>")
    P[_i] = P[_i].rstrip()[:-6] + bfoot() + "</div>"
# back-cover
P.append(('<div class="pg"><div class="cover" style="min-height:280mm">'
 '<div class="wm kai">\U000110B2</div>'
 '<h1 style="border:none;color:#F9A825;font-size:34px;margin-top:20mm">ACS क्या है?</h1>'
 '<p style="font-size:18px;color:#F5F7FA;text-align:justify">अप्लाइड कंप्यूटर स्कूल™ (2011 से) — FFGPMTrust के अधीन, खगड़िया (बिहार) से चलने वाला मुफ़्त शिक्षा-मंच। 130 भाषाओं में कोर्स · 950 उद्यमों की जानकारी · अभिरुचि-टेस्ट · रोजगार-राह — सब गाँव के बच्चे के फ़ोन पर, मुफ़्त।</p>'
 '<hr class="gold-rule">'
 '<p style="font-size:17px;color:#F5F7FA">📚 कैथी के 33 मुफ़्त पाठ · 🎓 120-प्रश्न प्रमाणपत्र-परीक्षा · 🔤 यह पुस्तिका + दीवार-चार्ट</p>'
 '<div style="display:flex;gap:16px;align-items:center;margin-top:12mm">'
 '<img src="data:image/png;base64,' + QR_SITE + '" style="height:85px;border:4px solid #F9A825;border-radius:10px">'
 '<div style="font-size:16px;color:#F5F7FA">🌐 acslearn.com<br>📱 WhatsApp: wa.me/919431210092<br>✉️ acs.chautham@gmail.com<br>📺 youtube.com/@AppliedComputerSchool</div></div>'
 '<p style="position:absolute;bottom:14mm;left:14mm;right:14mm;text-align:center;font-size:13px;color:#F5F7FA">© FFGPMTrust · Applied Computer School™ · मुफ़्त वितरण हेतु — बेचना मना · फ़ॉन्ट: Noto Sans Kaithi (OFL) · Unicode U+11080-110CF</p>'
 '</div></div>'))
pustika = "<!doctype html><html lang='hi'><head><meta charset='utf-8'><style>%s</style></head><body>%s</body></html>" % (CSS, "".join(P))
open(os.path.join(OUT, "_pustika.html"), "w", encoding="utf-8").write(pustika)

# ================= वर्णमाला-चार्ट (1 पेज A4) =================
def gcells(pairs):
    return "".join('<div class="gcell"><span class="k kai">%s</span><span class="d">%s</span></div>' % (k, d) for d, k in pairs)
chart = """<!doctype html><html lang='hi'><head><meta charset='utf-8'><style>%s
h1{font-size:26px;text-align:center;border-bottom:3px solid #F9A825;margin-bottom:6px}
h2{font-size:18px;margin:7px 0 4px}
.gcell .k{font-size:27px}.gcell .d{font-size:13px}
.grid{gap:4px}.gcell{padding:3px 2px;border-radius:6px}
</style></head><body>
<div class="tiranga"></div>
<div class="brand" style="padding-bottom:2px"><img src="data:image/png;base64,__LOGO__">
<div><div class="bn">अप्लाइड कंप्यूटर स्कूल™ <span style="color:#1565C0">(Applied Computer School)</span></div>
<div class="bt">From Village to World · FFGPMTrust · acslearn.com</div></div>
<img src="data:image/png;base64,__QRC__" style="height:52px;margin-left:auto;border:2px solid #0B1F3A;border-radius:6px"></div>
<h1>🏛️ कैथी वर्णमाला-चार्ट <span class="kai">𑂍𑂶𑂟𑂲</span> — एक नज़र में</h1>
<h2>स्वर (10)</h2><div class="grid" style="grid-template-columns:repeat(10,1fr)">%s</div>
<h2>व्यंजन (32)</h2><div class="grid" style="grid-template-columns:repeat(8,1fr)">%s</div>
<h2>मात्राएँ — क पर (10) + हलंत</h2><div class="grid" style="grid-template-columns:repeat(11,1fr)">%s<div class="gcell"><span class="k kai">%s</span><span class="d">क्</span></div></div>
<h2>चिह्न व सूत्र</h2>
<p style="font-size:15px"><span class="kai" style="font-size:22px">%s</span> वाक्य-अंत · <span class="kai" style="font-size:22px">%s</span> बड़ा-अंत · अंक = देवनागरी जैसे · फसली+593 ≈ ईस्वी · संवत−57 = ईस्वी · 16 आना = पूरा</p>
<div class="bfoot" style="margin-top:4px"><span>📱 wa.me/919431210092</span><span style="font-weight:800;color:#0B1F3A">QR scan → मुफ़्त 33-पाठ कोर्स · print कर दीवार पर लगाएँ</span><span>acslearn.com</span></div>
</body></html>""" % (CSS, gcells(D["sw"]), gcells(D["vy"]),
     "".join('<div class="gcell"><span class="k kai">%s</span><span class="d">क%s</span></div>' % (k, d) for d, k in D["mt"]),
     D["hal"], D["danda"][0], D["danda"][1])
chart = chart.replace("__LOGO__", LOGO).replace("__QRC__", QR_COURSE)
open(os.path.join(OUT, "_chart.html"), "w", encoding="utf-8").write(chart)

# ================= PDF print =================
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    for src, dst in [("_pustika.html", "kaithi-vyakaran-pustika.pdf"), ("_chart.html", "kaithi-varnamala-chart.pdf")]:
        pg.goto("file://" + os.path.join(OUT, src))
        pg.wait_for_timeout(400)
        pg.pdf(path=os.path.join(OUT, dst), format="A4", print_background=True)
        print("✅", dst, round(os.path.getsize(os.path.join(OUT, dst)) / 1024), "KB")
    b.close()
print("🏁 build_kaithi_vyakaran_pdf पूर्ण")
