# generator/build_tirhuta_vyakaran_pdf.py — v1.0 (27-Oct-2026) — कैथी v2.1 साँचे का तिरहुता-दर्पण
# तिरहुता व्याकरण-पुस्तिका (A4) + वर्णमाला-चार्ट (A4) — दोनों PDF playwright-Chromium से।
# लोहे का नियम: लिपि-आकार (shaping) सिर्फ़ Chromium करे — फ़ॉन्ट NotoSansTirhuta ttf local embed।
# सामग्री-स्रोत: assets/tirhuta_lipi.js के नक़्शे + 18 पाठों के दर्ज तथ्य (मशीन-सिद्ध) — कुछ गढ़ा नहीं।
# चलाना: python3 generator/build_tirhuta_vyakaran_pdf.py   (repo-रूट से)
# देय: /home/claude/tirhuta/release/tirhuta-vyakaran-pustika.pdf + tirhuta-varnamala-chart.pdf
import json, os, subprocess, sys
sys.stdout.reconfigure(encoding="utf-8")
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = "/home/claude/tirhuta/release"
os.makedirs(OUT, exist_ok=True)
FONT = "/home/claude/fonts/NotoSansTirhuta-Regular.ttf"
assert os.path.exists(FONT), "फ़ॉन्ट नहीं"
LOGO = open("/tmp/logo_b64.txt").read()
QR_COURSE = open("/tmp/qr_tir_course_b64.txt").read()
QR_SITE = open("/tmp/qr_site_b64.txt").read()
QR_JOIN = open("/tmp/qr_join_b64.txt").read()

# ---- इंजन के नक़्शे node से निकालो (एक ही सच — tirhuta_lipi.js) ----
node_code = r'''
var vm=require("vm"),fs=require("fs");
var sb={window:{}};vm.createContext(sb);
vm.runInContext(fs.readFileSync(process.argv[1],"utf8"),sb);
var T=sb.window.TIRHUTA_LIPI,toT=T.devaToTirhuta;
var SW=["अ","आ","इ","ई","उ","ऊ","ऋ","ॠ","ऌ","ॡ","ए","ऐ","ओ","औ"];
var VY=["क","ख","ग","घ","ङ","च","छ","ज","झ","ञ","ट","ठ","ड","ढ","ण","त","थ","द","ध","न","प","फ","ब","भ","म","य","र","ल","व","श","ष","स","ह"];
var MT=["ा","ि","ी","ु","ू","ृ","े","ै","ो","ौ","ं"];
var BK=["क","ग","त","न","प","ब","म","र","ल","स"].map(function(c){return{c:c,row:MT.map(function(m){return toT(c+m)}),base:toT(c)}});
var WORDS=["मिथिला","विद्यापति","जनकपुर","दरभंगा","सौराठ","पोथी","पंजी","सोना","पानी","गुरु","कृपा","राम","शिव","गंगा","काका","नानी","दादा","माला","मेला","मोर","बैल","कौआ","माछ","पान","भात","दही","चूड़ा","थाली","घड़ी","लड़का","पढ़ाई","बूढ़ा","खेत","गाछ","घर","कलश","टोला","ठाकुर","ढोल","नदी"];
console.log(JSON.stringify({
 sw:SW.map(function(a){return[a,toT(a)]}),
 vy:VY.map(function(a){return[a,toT(a)]}),
 nk:[["ड़",toT("ड़")],["ढ़",toT("ढ़")]],
 mt:MT.map(function(m){return[m,toT("क"+m)]}),
 bk:BK, hal:toT("क्"),
 chn:[["कं",toT("कं")],["कँ",toT("कँ")],["कः",toT("कः")]],
 ank:Array.from(toT("०१२३४५६७८९")),
 tir:toT("तिरहुता"), mith:toT("मिथिला"), mlx:toT("मिथिलाक्षर"),
 cjOne:["क्ष","त्र","ज्ञ","श्र","स्त","द्य","द्ध","त्त","प्र","ग्र","क्त","न्त","न्द","न्य","त्य","ष्ट","ष्ण","ह्म"].map(function(a){return[a,toT(a)]}),
 cjHal:["स्थ","स्म","म्म","ज्ज","ल्ल","प्त"].map(function(a){return[a,toT(a)]}),
 cjRYV:[["धर्म",toT("धर्म")],["प्रकाश",toT("प्रकाश")],["व्यापार",toT("व्यापार")],["स्वर",toT("स्वर")]],
 fina:[["जगत्",toT("जगत्")],["अहम्",toT("अहम्")],["भगवान्",toT("भगवान्")]],
 vis:[["ॐ",toT("ॐ")],["ऽ",toT("ऽ")],["ल॰",toT("ल॰")]],
 words:WORDS.map(function(w){return[w,toT(w)]})
}));
'''
j = subprocess.run(["node", "-e", node_code, os.path.join(ROOT, "assets/tirhuta_lipi.js")],
                   capture_output=True, text=True, cwd=ROOT)
assert j.returncode == 0, j.stderr
D = json.loads(j.stdout)
import uharfbuzz as _hb
_f = _hb.Font(_hb.Face(open(FONT, "rb").read()))
def _gl(t):
    b = _hb.Buffer(); b.add_str(t); b.guess_segment_properties(); _hb.shape(_f, b, {})
    return [_f.glyph_to_string(i.codepoint) for i in b.glyph_infos]
for _d, _t in D["cjOne"]:
    assert len(_gl(_t)) == 1, "जोड़-रूप दावा ग़लत: " + _d
for _d, _t in D["cjHal"]:
    assert "virama_tirh" in _gl(_t), "दिखता-हलंत दावा ग़लत: " + _d
for _d, _t in D["fina"][:2]:
    assert any(g.endswith(".fina") for g in _gl(_t)), "अंत-रूप दावा ग़लत: " + _d

CSS = """
@font-face{font-family:'Tirhuta';src:url('file://__FONT__');}
@page{size:A4;margin:14mm 12mm 16mm 12mm;}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Noto Sans Devanagari','Tirhuta',sans-serif;color:#0B1F3A;font-size:20px;line-height:1.8}
.kai{font-family:'Tirhuta','Noto Sans Devanagari',sans-serif}
.pg{page-break-after:always;padding:2mm 0;display:flex;flex-direction:column;min-height:252mm}
.pg:last-child{page-break-after:auto}
h1{font-size:34px;color:#0B1F3A;border-bottom:4px solid #F9A825;padding-bottom:6px;margin-bottom:10px}
h2{font-size:26px;color:#1565C0;margin:14px 0 8px;border-left:6px solid #F9A825;padding-left:8px}
p{margin:6px 0;text-align:justify}
table{border-collapse:collapse;width:100%;margin:8px 0}
td,th{border:1.5px solid #0B1F3A;padding:7px 6px;text-align:center;font-size:20px}
th{background:#0B1F3A;color:#fff;font-size:19px}
.big{font-size:34px}.huge{font-size:44px}
.cell-k{font-size:44px}.cell-d{font-size:19px;color:#2E7D32}
.note{background:#F5F7FA;border:1.5px dashed #1565C0;border-radius:8px;padding:10px 12px;margin:10px 0;font-size:18px}
.warn{background:#fff7e0;border:1.5px solid #F9A825;border-radius:8px;padding:10px 12px;margin:10px 0;font-size:18px}
.hdr{display:flex;justify-content:space-between;align-items:baseline;border-bottom:2px solid #F9A825;margin-bottom:6px;padding-bottom:3px}
.hdr .l{font-weight:800;color:#0B1F3A}.hdr .r{font-size:14px;color:#1565C0}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}
.gcell{border:1.5px solid #0B1F3A;border-radius:8px;text-align:center;padding:5px 2px}
.gcell .k{font-size:32px;display:block}.gcell .d{font-size:15px;color:#2E7D32}
.brand{display:flex;align-items:center;gap:8px;border-bottom:none;padding:4px 0 6px}
.brand img{height:34px}
.brand .bn{font-weight:800;font-size:17px;color:#0B1F3A;line-height:1.2}
.brand .bt{font-size:12px;color:#1565C0}
.tiranga{height:6px;background:linear-gradient(90deg,#F9A825 0 33%,#fff 33% 66%,#2E7D32 66% 100%);border:1px solid #d8d8d8;border-radius:3px;margin-bottom:6px}
.bfoot{display:flex;justify-content:space-between;align-items:center;border-top:2px solid #F9A825;margin-top:auto;padding-top:5px;font-size:13.5px;color:#0B1F3A}
.bfoot .pg-no{background:#0B1F3A;color:#F9A825;border-radius:50%;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;font-weight:800}
.cover{background:#0B1F3A;color:#F5F7FA;margin:-14mm -12mm -16mm -12mm;padding:12mm 14mm;min-height:262mm;position:relative;flex:1}
.cover .wm{position:absolute;right:-6mm;bottom:10mm;font-size:260px;color:rgba(249,168,37,.08);line-height:1}
.gold-rule{height:3px;background:#F9A825;border:none;margin:10px 0}
.tc td{padding:2px 6px;font-size:17px;line-height:1.35}.tc .big{font-size:27px}.tc th{padding:4px}
.cell-k2{font-size:30px}.tk td{padding:3px 4px}.tk .cell-d{font-size:16px}
""".replace("__FONT__", FONT)

def hdr(t):
    return ('<div class="tiranga"></div>'
            '<div class="brand"><img src="data:image/png;base64,%s">'
            '<div><div class="bn">अप्लाइड कंप्यूटर स्कूल™ <span style="color:#1565C0">(Applied Computer School)</span></div>'
            '<div class="bt">From Village to World — 130 भाषाओं में मुफ़्त शिक्षा · acslearn.com</div></div>'
            '<div style="margin-left:auto;font-size:13px;color:#1565C0;font-weight:700">📜 तिरहुता व्याकरण-पुस्तिका</div></div>'
            '<div class="hdr"><span class="l">%s</span><span class="r">FFGPMTrust · ISO 9001:2015</span></div>') % (LOGO, t)
def bfoot(n):
    return ('<div class="bfoot"><span>📱 wa.me/919431210092</span>'
            '<span style="font-weight:800">📝 मुफ़्त रजिस्ट्रेशन: acslearn.com/join.html</span>'
            '<span>मुफ़्त 33-पाठ कोर्स: acslearn.com</span>'
            '<span class="pg-no">%d</span></div>') % n

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
<div class="wm kai">𑒞</div>
<div style="display:flex;align-items:center;gap:12px"><img src="data:image/png;base64,""" + LOGO + """" style="height:60px;background:#fff;border-radius:12px;padding:5px">
<div><div style="font-size:22px;font-weight:800;color:#F9A825">अप्लाइड कंप्यूटर स्कूल™</div>
<div style="font-size:14px;color:#F5F7FA">Applied Computer School · FFGPMTrust · स्थापना 2011 · ISO 9001:2015</div></div></div>
<hr class="gold-rule">
<div style="text-align:center;margin-top:22mm">
<div class="kai" style="font-size:110px;color:#F9A825">""" + D["tir"] + """</div>
<h1 style="border:none;font-size:42px;color:#fff;margin-top:6px">तिरहुता व्याकरण-पुस्तिका</h1>
<p style="text-align:center;font-size:19px;color:#F9A825">मिथिला की अपनी लिपि (मिथिलाक्षर) — वर्णमाला से पोथी तक, एक जगह</p>
<p style="text-align:center;font-size:16px;color:#F5F7FA">लिपि-नियम · 14 स्वर · 33 व्यंजन · मात्राएँ · बारहखड़ी · धोखेबाज़-तिकड़ी · अपने अंक · मिथिला-शब्द</p></div>
<div style="display:flex;justify-content:center;gap:14px;align-items:center;margin-top:18mm">
<img src="data:image/png;base64,""" + QR_COURSE + """" style="height:90px;border:4px solid #F9A825;border-radius:10px">
<div style="text-align:left;font-size:16px;color:#F5F7FA">📱 QR scan करें —<br><b style="color:#F9A825">मुफ़्त 33-पाठ कोर्स</b> तुरंत खुलेगा<br>acslearn.com/courses/hi/tirhuta-lipi/</div></div>
<p style="position:absolute;bottom:14mm;left:0;right:0;text-align:center;font-size:14px;color:#F5F7FA">"From Village to World" — 130 भाषाओं में मुफ़्त डिजिटल शिक्षा · खगड़िया, बिहार से विश्व तक</p>
</div></div>""")
# 1. लिपि-परिचय व 5 पक्के नियम
P.append('<div class="pg">' + hdr("1. लिपि के 5 पक्के नियम") + """
<h1>तिरहुता लिपि — 5 पक्के नियम</h1>
<p><b>नियम-1:</b> तिरहुता बाएँ से दाएँ लिखी जाती है — देवनागरी की ही दिशा; शिरोरेखा (माथे की छत) भी होती है।</p>
<p><b>नियम-2:</b> यह <b>बंगाली-असमिया परिवार</b> की बहन है, देवनागरी की नहीं — इसलिए कई अक्षर जाने-पहचाने लगकर धोखा देते हैं (पृष्ठ-6)।</p>
<p><b>नियम-3:</b> तिरहुता के <b>अपने अंक</b> हैं (पृष्ठ-10) — पोथी के पन्ना-नंबर इन्हीं में मिलते हैं।</p>
<p><b>नियम-4:</b> मात्राओं की जगहें ख़ास: इ और ए की मात्राएँ अक्षर से <b>पहले (बाएँ)</b> बैठती हैं; ओ-औ-ऐ अक्षर को <b>दोनों ओर से घेरती</b> हैं; उ-ऊ-ऋ नीचे <b>जुड़कर मिला रूप</b> बनाती हैं (पृष्ठ-5)।</p>
<p><b>नियम-5:</b> ड़ और ढ़ के लिए अपने अलग अक्षर नहीं — <b>ड/ढ के नीचे नुक़्ता</b> लगता है (पृष्ठ-4); दंड देवनागरी-जैसे ही: । ॥</p>
<div class="warn">⚠️ <b>महा-धोखेबाज़ तिकड़ी:</b> तिरहुता का <b>र</b> देवनागरी के <b>ब</b> जैसा, <b>व</b> देवनागरी के <b>र</b> जैसा और <b>ल</b> देवनागरी के <b>न</b> जैसा दिखता है — पढ़ने की सबसे आम ग़लती यहीं होती है। पूरी सूची पृष्ठ-6 पर।</div>
<div class="note">यह पुस्तिका ACS कोर्स के पाठों का निचोड़ है — संस्कृत-मैथिली पोथियों और पंजी-परंपरा की लिपि, विद्यापति की धरती की अपनी लिखावट। हर नियम वही है जो पाठों में मशीन-जाँच से सिखाया गया — नया कुछ नहीं।</div>
</div>""")
# 2. स्वर 14
P.append('<div class="pg">' + hdr("2. स्वर (14)") + "<h1>स्वर — 14 अक्षर</h1>" + tbl_pairs(D["sw"], 5) +
 '<p>हर खाने में ऊपर <b>तिरहुता रूप</b>, नीचे हरे रंग में <b>देवनागरी</b>। तिरहुता ने <b>ऋ-परिवार के चारों स्वर</b> (ऋ ॠ ऌ ॡ) सँभाले हैं — संस्कृत-पोथियों की लिपि होने की निशानी; रोज़ की मैथिली में कम, पोथी-पूजा में ख़ूब मिलेंगे।</p></div>')
# 3-4. व्यंजन 33 + नुक़्ता
vy = D["vy"]
P.append('<div class="pg">' + hdr("3. व्यंजन (भाग-1)") + "<h1>व्यंजन — क से न</h1>" + tbl_pairs(vy[:20], 5) + "</div>")
P.append('<div class="pg">' + hdr("4. व्यंजन (भाग-2) + नुक़्ता") + "<h1>व्यंजन — प से ह, और नुक़्ता-नियम</h1>" + tbl_pairs(vy[20:], 5) +
 '<p style="margin-top:8px"><b>नुक़्ता-नियम:</b> ड़ = ड + नीचे नन्हा बिंदु · ढ़ = ढ + नीचे नन्हा बिंदु — अपने अलग अक्षर नहीं:</p>' + tbl_pairs(D["nk"], 5) +
 '<div class="note">बिंदु <b>नन्हा</b> रहे — नीचे बैठने वाली उ-ऊ-ऋ मात्राओं (पृष्ठ-5) से क़द का यही फ़र्क़ पहचान है।</div></div>')
# 5. मात्राएँ 11 + हलंत
mt_names = ["आ की मात्रा — अक्षर के बाद, दाईं ओर",
 "इ की मात्रा — <b>अक्षर से पहले, बाईं ओर</b> (लिखो पहले, पढ़ो बाद में)",
 "ई की मात्रा — दाईं ओर",
 "उ की मात्रा — नीचे, <b>अक्षर से जुड़कर मिला रूप</b>",
 "ऊ की मात्रा — नीचे, मिला रूप",
 "ऋ की मात्रा — नीचे, मिला रूप (पोथी-शब्द: कृपा, कृष्ण)",
 "ए की मात्रा — <b>अक्षर से पहले, बाईं ओर</b>",
 "ऐ की मात्रा — घेरा-परिवार: आगे ए-निशान + ऊपर अपना निशान",
 "ओ की मात्रा — <b>पूरा घेरा: आगे ए-निशान + पीछे आ-निशान</b>",
 "औ की मात्रा — घेरा: आगे ए-निशान + पीछे अपना निशान",
 "अनुस्वार — ऊपर बिंदी"]
mt_rows = "".join('<tr><td style="font-size:22px">क%s</td><td class="kai" style="font-size:26px">%s</td><td style="text-align:left">%s</td></tr>'
                  % (d, k, nm) for (d, k), nm in zip(D["mt"], mt_names))
P.append('<div class="pg">' + hdr("5. मात्राएँ (11) + हलंत") + "<h1>मात्राएँ — क पर लगाकर</h1>" +
 '<table><tr><th>देवनागरी</th><th>तिरहुता</th><th>जगह / नियम (मशीन-जाँची)</th></tr>' + mt_rows +
 '<tr><td style="font-size:22px">क्</td><td class="kai" style="font-size:26px">%s</td><td style="text-align:left">हलंत — नीचे का चिह्न; स्वर काटना (जुड़े अक्षर: खंड-8)</td></tr></table></div>' % D["hal"])
# 6. धोखेबाज़-तिकड़ी
P.append('<div class="pg">' + hdr("6. धोखेबाज़-जोड़े") + """<h1>धोखेबाज़-तिकड़ी — आँख का धोखा</h1>
<p>ये तिरहुता अक्षर देवनागरी के <b>दूसरे</b> अक्षरों जैसे दिखते हैं — बंगाली-परिवार की बहन होने का असर। पढ़ते समय यहीं ग़लती होती है:</p>
<table><tr><th>तिरहुता अक्षर</th><th>असल में है</th><th>पर दिखता है (देवनागरी)</th></tr>""" +
 "".join('<tr><td class="kai" style="font-size:32px">%s</td><td style="font-size:20px"><b>%s</b></td><td style="font-size:20px;color:#b00">%s जैसा</td></tr>'
   % (dict(D["vy"])[a], a, b) for a, b in [("र","ब"),("व","र"),("ल","न"),("ब","व")]) +
 '</table><div class="warn">याद रखने का सूत्र (पाठ 12-13): तिकड़ी <b>र-व-ल</b> को निशानी-बैंक से पक्का करें — और गवाह <b>ध</b> को भी परखें, जो र का हल्का जुड़वाँ है। जहाँ ब-जैसा दिखे, पहले र सोचें।</div></div>')
# 7. विशेष चिह्न
P.append('<div class="pg">' + hdr("7. विशेष चिह्न") + "<h1>चिह्न, निशानियाँ और छोटी ए-ओ</h1>" +
 '<table class="tc"><tr><th>रूप</th><th>तिरहुता</th><th>काम</th></tr>' +
 "".join('<tr><td style="font-size:22px">%s</td><td class="kai big">%s</td><td style="text-align:left">%s</td></tr>' % (d, k, nm)
   for (d, k), nm in zip(D["chn"], ["अनुस्वार — ऊपर बिंदी (गंगा, पंडित की नाक-आवाज़)",
                                     "चंद्रबिंदु — ऊपर चाँद-बिंदी (आँगन की सँवली आवाज़)",
                                     "विसर्ग — आगे दो बिंदियाँ (नमः की साँस-फूँक)"])) +
 '<tr><td style="font-size:22px">क्</td><td class="kai big">%s</td><td style="text-align:left">हलंत — नीचे का चिह्न, स्वर काटता है</td></tr>' % D["hal"] +
 '<tr><td style="font-size:22px">। ॥</td><td class="kai big">। ॥</td><td style="text-align:left">दंड व दोहरा दंड — तिरहुता पोथियों में देवनागरी-जैसे ही</td></tr>' +
 '<tr><td style="font-size:20px">अंजी</td><td class="kai big">\U00011480</td><td style="text-align:left">शुभ-शुरुआत का निशान — बनाया जाता है, बोला नहीं</td></tr>' +
 '<tr><td style="font-size:22px">%s</td><td class="kai big">%s</td><td style="text-align:left">ओम — तिरहुता का अपना ओम-चिह्न</td></tr>' % tuple(D["vis"][0]) +
 '<tr><td style="font-size:20px">ग्वं</td><td class="kai big">\U000114C5</td><td style="text-align:left">वैदिक अनुस्वार — वेद-पाठ की नाक-आवाज़</td></tr>' +
 '<tr><td style="font-size:22px">%s</td><td class="kai big">%s</td><td style="text-align:left">अवग्रह — यहाँ अ लुप्त (सोऽहम्)</td></tr>' % tuple(D["vis"][1]) +
 '<tr><td style="font-size:22px">%s</td><td class="kai big">%s</td><td style="text-align:left">संक्षेप-चिह्न — शब्द छोटा किया (ल॰ सं॰)</td></tr>' % tuple(D["vis"][2]) +
 '<tr><td style="font-size:20px">क + छोटी ए</td><td class="kai big">\U0001148F\U000114BA</td><td style="text-align:left">मैथिली की छोटी ए — ऐ का ऊपरी टुकड़ा अकेला</td></tr>' +
 '<tr><td style="font-size:20px">क + छोटी ओ</td><td class="kai big">\U0001148F\U000114BD</td><td style="text-align:left">मैथिली की छोटी ओ — औ का दायाँ टुकड़ा अकेला</td></tr></table>' +
 '<div class="note">यूनिकोड-खाके का जोड़-गणित: ऐ = ए-निशान + छोटी-ए · ओ = ए-निशान + आ-निशान · औ = ए-निशान + छोटी-ओ (कोर्स पाठ-20)।</div></div>')
# 8. हलंत और जुड़े अक्षर (नया खंड — मशीन-जाँची सूचियाँ)
P.append('<div class="pg">' + hdr("8. हलंत और जुड़े अक्षर") + "<h1>जुड़े अक्षर — दो राहें</h1>" +
 '<p><b>राह-1 — जोड़-रूप:</b> दोनों अक्षर घुलकर नया एक चेहरा (मानक फ़ॉन्ट, मशीन-जाँचा):</p>' + tbl_pairs(D["cjOne"], 9, ("cell-k2 kai", "cell-d")).replace("<table>", '<table class="tk">', 1) +
 '<p><b>राह-2 — दिखता हलंत:</b> पहला अक्षर नीचे लकीर पहनकर बग़ल में:</p>' + tbl_pairs(D["cjHal"], 6, ("cell-k2 kai", "cell-d")).replace("<table>", '<table class="tk">', 1) +
 '<p><b>र, य, व के साथी</b> (धर्म — सिर पर रेफ · प्रकाश — साथ जुड़ा र · व्यापार — दाईं ओर य-टुकड़ा · स्वर — नीचे व-निशान) और <b>शब्द-अंत</b> (त् व म् के अपने अंत-रूप):</p>' + tbl_pairs(D["cjRYV"] + D["fina"], 7, ("cell-k2 kai", "cell-d")).replace("<table>", '<table class="tk">', 1) +
 '<div class="note">लिपि का पूरा नाम: <span class="kai" style="font-size:30px">%s</span> मिथिलाक्षर। पढ़ने का एक नियम — पहले की आधी आवाज़ + दूसरे की पूरी। पोथियों में लिखने वालों के जोड़-रूप फ़ॉन्ट से अलग भी हो सकते हैं (कोर्स पाठ 19, 22)।</div></div>' % D["mlx"])
# 8-9. बारहखड़ी
def bk_table(rows):
    h = "<tr><th>अक्षर</th>" + "".join("<th>%s</th>" % m for m, _ in D["mt"]) + "</tr>"
    b = "".join("<tr><td style='font-size:22px'><b>%s</b> <span class='kai'>%s</span></td>" % (r["c"], r["base"]) +
                "".join("<td class='kai' style='font-size:28px'>%s</td>" % c for c in r["row"]) + "</tr>" for r in rows)
    return "<table>%s%s</table>" % (h, b)
P.append('<div class="pg">' + hdr("9. बारहखड़ी (भाग-1)") + "<h1>बारहखड़ी — क से ब</h1>" + bk_table(D["bk"][:5]) + "</div>")
P.append('<div class="pg">' + hdr("10. बारहखड़ी (भाग-2)") + "<h1>बारहखड़ी — म से स</h1>" + bk_table(D["bk"][5:]) +
 '<div class="note">घेरे वाली ो-ौ-ै क़तार में साफ़ दिखती हैं — बीच का अक्षर पहचानो, आगे-पीछे के टुकड़े मिलाओ (पाठ-17 की दो-सवाल विधि)।</div></div>')
# 10. अंक
ank_pairs = list(zip(list("०१२३४५६७८९"), D["ank"]))
P.append('<div class="pg">' + hdr("11. तिरहुता के अपने अंक") + "<h1>अंक 0-9 — पोथी के पन्ना-नंबर की चाबी</h1>" + tbl_pairs(ank_pairs, 5) +
 '<p>तिरहुता के <b>अपने अंक</b> हैं — पुरानी पोथियों, पंजी-पत्रों और पन्ना-नंबरों में यही मिलते हैं। ऊपर तिरहुता अंक, नीचे देवनागरी।</p>' +
 '<div class="warn">अंक-धोखेबाज़ (मशीन-नापे, कोर्स पाठ-21): जुड़वाँ — ० और ४ देवनागरी जैसे; धोखा — तिरहुता का १ देवनागरी के ४ जैसा, ७ देवनागरी के ५ जैसा, ६ देवनागरी के ७ जैसा।</div></div>')
# 11-12. मिथिला-शब्द
wpairs = D["words"]
P.append('<div class="pg">' + hdr("12. मिथिला-शब्द (भाग-1)") + "<h1>मिथिला-जगत के शब्द तिरहुता में — 1</h1>" + tbl_pairs(wpairs[:20], 4) + "</div>")
P.append('<div class="pg">' + hdr("13. मिथिला-शब्द (भाग-2)") + "<h1>मिथिला-जगत के शब्द तिरहुता में — 2</h1>" + tbl_pairs(wpairs[20:], 4) +
 '<div class="note">हर शब्द की कहानी व अभ्यास कोर्स के पाठों में — पोथी, पंजी, सौराठ-सभा और विद्यापति की धरती के शब्द। परीक्षा-द्वार dashboard में।</div></div>')
# 13. आगे की राह
P.append('<div class="pg">' + hdr("14. आगे की राह — रजिस्ट्रेशन")
 + '<h1>पढ़ लिया? अब 3 कदम — प्रमाणपत्र तक</h1>'
 + '<table><tr><th style="width:18%">कदम</th><th>क्या करना है</th></tr>'
 + '<tr><td style="font-size:30px">1️⃣</td><td style="text-align:left">33 पाठ मुफ़्त पढ़ें — बिना login, बिना पैसा: <b>acslearn.com/courses/hi/tirhuta-lipi/</b></td></tr>'
 + '<tr><td style="font-size:30px">2️⃣</td><td style="text-align:left"><b>मुफ़्त रजिस्ट्रेशन करें</b> — नीचे QR scan करें या खोलें: <b>acslearn.com/join.html</b> (विद्यार्थी-कार्ड चुनें)</td></tr>'
 + '<tr><td style="font-size:30px">3️⃣</td><td style="text-align:left">Dashboard में 🎓 <b>प्रमाणपत्र-परीक्षा</b> दें — तिरहुता-पढ़ाई का प्रमाणपत्र पाएँ।</td></tr></table>'
 + '<div style="display:flex;gap:16px;align-items:center;justify-content:center;margin-top:14px">'
 + '<img src="data:image/png;base64,' + QR_JOIN + '" style="height:110px;border:4px solid #2E7D32;border-radius:10px">'
 + '<div style="font-size:20px"><b style="color:#2E7D32">📝 QR scan → सीधा रजिस्ट्रेशन-पेज</b><br>10 साल से ऊपर कोई भी — गाँव का हर बच्चा।<br>रजिस्ट्रेशन व पढ़ाई दोनों <b>पूरी तरह मुफ़्त</b>।</div></div>'
 + '<div class="warn">अपने दोस्तों को भी यह पुस्तिका भेजें — हर print/share से एक और बच्चे तक मिथिला की अपनी लिपि पहुँचेगी।</div>'
 + '</div>')

# हर content-पेज (cover छोड़) में brand-footer
for _i in range(1, len(P)):
    assert P[_i].rstrip().endswith("</div>")
    P[_i] = P[_i].rstrip()[:-6] + bfoot(_i + 1) + "</div>"
# back-cover
P.append(('<div class="pg"><div class="cover" style="min-height:280mm">'
 '<div class="wm kai">' + D["mith"][0] + '</div>'
 '<h1 style="border:none;color:#F9A825;font-size:34px;margin-top:20mm">ACS क्या है?</h1>'
 '<p style="font-size:18px;color:#F5F7FA;text-align:justify">अप्लाइड कंप्यूटर स्कूल™ (2011 से) — FFGPMTrust के अधीन, खगड़िया (बिहार) से चलने वाला मुफ़्त शिक्षा-मंच। 130 भाषाओं में कोर्स · 950 उद्यमों की जानकारी · अभिरुचि-टेस्ट · रोजगार-राह — सब गाँव के बच्चे के फ़ोन पर, मुफ़्त।</p>'
 '<hr class="gold-rule">'
 '<p style="font-size:17px;color:#F5F7FA">📚 तिरहुता के मुफ़्त पाठ · 🎓 प्रमाणपत्र-परीक्षा · 🔤 यह पुस्तिका + दीवार-चार्ट</p>'
 '<div style="display:flex;gap:16px;align-items:center;margin-top:12mm">'
 '<img src="data:image/png;base64,' + QR_SITE + '" style="height:85px;border:4px solid #F9A825;border-radius:10px">'
 '<div style="font-size:17px;color:#F5F7FA">🌐 acslearn.com<br>📝 <b style="color:#F9A825">मुफ़्त रजिस्ट्रेशन: acslearn.com/join.html</b><br>📱 WhatsApp: wa.me/919431210092<br>✉️ acs.chautham@gmail.com<br>📺 youtube.com/@AppliedComputerSchool</div></div>'
 '<p style="position:absolute;bottom:14mm;left:14mm;right:14mm;text-align:center;font-size:13px;color:#F5F7FA">© FFGPMTrust · Applied Computer School™ · मुफ़्त वितरण हेतु — बेचना मना · फ़ॉन्ट: Noto Sans Tirhuta (OFL) · Unicode U+11480-114DF</p>'
 '</div></div>'))
pustika = "<!doctype html><html lang='hi'><head><meta charset='utf-8'><style>%s</style></head><body>%s</body></html>" % (CSS, "".join(P))
open(os.path.join(OUT, "_pustika.html"), "w", encoding="utf-8").write(pustika)

# ================= वर्णमाला-चार्ट (1 पेज A4) =================
def gcells(pairs):
    return "".join('<div class="gcell"><span class="k kai">%s</span><span class="d">%s</span></div>' % (k, d) for d, k in pairs)
chart = """<!doctype html><html lang='hi'><head><meta charset='utf-8'><style>%s
h1{font-size:22px;text-align:center;border-bottom:3px solid #F9A825;margin-bottom:6px}
h2{font-size:17px;margin:5px 0 3px}
.gcell .k{font-size:26px}.gcell .d{font-size:14px}
.grid{gap:3px}.gcell{padding:2px 2px;border-radius:6px}
</style></head><body>
<div class="tiranga"></div>
<div class="brand" style="padding-bottom:2px"><img src="data:image/png;base64,__LOGO__">
<div><div class="bn">अप्लाइड कंप्यूटर स्कूल™ <span style="color:#1565C0">(Applied Computer School)</span></div>
<div class="bt">From Village to World · FFGPMTrust · acslearn.com</div></div>
<img src="data:image/png;base64,__QRC__" style="height:44px;margin-left:auto;border:2px solid #0B1F3A;border-radius:6px"></div>
<h1>📜 तिरहुता वर्णमाला-चार्ट <span class="kai">%s</span> — एक नज़र में</h1>
<h2>स्वर (14)</h2><div class="grid" style="grid-template-columns:repeat(14,1fr)">%s</div>
<h2>व्यंजन (33) + नुक़्ता (ड़ ढ़)</h2><div class="grid" style="grid-template-columns:repeat(9,1fr)">%s%s</div>
<h2>मात्राएँ — क पर (11) + हलंत</h2><div class="grid" style="grid-template-columns:repeat(12,1fr)">%s<div class="gcell"><span class="k kai">%s</span><span class="d">क्</span></div></div>
<h2>अंक (तिरहुता के अपने)</h2><div class="grid" style="grid-template-columns:repeat(10,1fr)">%s</div>
<p style="font-size:14.5px;margin-top:4px">⚠️ धोखेबाज़-तिकड़ी: तिरहुता <b>र</b> = देव-ब जैसा · <b>व</b> = देव-र जैसा · <b>ल</b> = देव-न जैसा · ि े <b>बाएँ</b> बैठती हैं · ो = े+ा का <b>घेरा</b> · ड़ = ड + नुक़्ता</p>
<div class="bfoot" style="margin-top:4px"><span>📱 wa.me/919431210092</span><span style="font-weight:800;color:#0B1F3A">📝 मुफ़्त रजिस्ट्रेशन: acslearn.com/join.html · print कर दीवार पर लगाएँ</span><span>acslearn.com</span></div>
</body></html>""" % (CSS, D["tir"], gcells(D["sw"]), gcells(D["vy"]), gcells(D["nk"]),
     "".join('<div class="gcell"><span class="k kai">%s</span><span class="d">क%s</span></div>' % (k, d) for d, k in D["mt"]),
     D["hal"],
     gcells(ank_pairs))
chart = chart.replace("__LOGO__", LOGO).replace("__QRC__", QR_COURSE)
open(os.path.join(OUT, "_chart.html"), "w", encoding="utf-8").write(chart)

# ================= PDF print =================
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page()
    for src, dst in [("_pustika.html", "tirhuta-vyakaran-pustika.pdf"), ("_chart.html", "tirhuta-varnamala-chart.pdf")]:
        pg.goto("file://" + os.path.join(OUT, src))
        pg.wait_for_timeout(400)
        pg.pdf(path=os.path.join(OUT, dst), format="A4", print_background=True)
        print("✅", dst, round(os.path.getsize(os.path.join(OUT, dst)) / 1024), "KB")
    b.close()
print("🏁 build_tirhuta_vyakaran_pdf पूर्ण")
