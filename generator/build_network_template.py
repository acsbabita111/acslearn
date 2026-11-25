# ============================================================
# build_network_template.py v1.2 (परत-4, 25-Nov-2026, खेप N-3) : नेटवर्क-सर्वे का Excel-साँचा
# v1.2: साँचे में सिर्फ़ वे सेक्टर (और उनकी श्रेणियाँ), जिनका ID-रूप idPattern है (TW, IT)। CSC सूची अपनी स्रोत-फ़ाइल से
#       आती है (batches.js का BIHAR-CSC-001, idRegex), साँचे से नहीं; इसलिए साँचा जस-का-तस।
# v1.1 (22-Nov, office-laptop पर पहली दौड़ की सीख):
#   (क) Windows पर pipe की console cp1252 होती है: 🏁/देवनागरी छापते ही UnicodeEncodeError से script गिरती थी,
#       साँचा ठीक होने पर भी --check FAIL। अब stdout/stderr हमेशा UTF-8।
#   (ख) --check अब पहले bytes मिलाता है; bytes अलग हों तो सामग्री मिलाता है (हर शीट के cell-मान, dropdown,
#       freeze, कॉलम-चौड़ाई, शीर्ष-पंक्ति का रूप)। openpyxl/zlib का संस्करण अलग होने से bytes बदलते हैं, सामग्री नहीं।
#       सामग्री वही हो तो फ़ाइल दोबारा नहीं लिखी जाती (बेवजह बदलाव नहीं)।
# नतीजा: generator/data/network/ACS-Network-Import-Template.xlsx
#   शीट "Firms"      : सिर्फ़ कॉलम-नाम (एक भी नमूना/नक़ली फ़र्म नहीं), कुछ कॉलम में चुनने की सूची (dropdown)
#   शीट "कॉलम"       : हर कॉलम का अर्थ, ज़रूरी है या नहीं, भीतरी (वेबसाइट पर नहीं छपता) या सार्वजनिक
#   शीट "मान्य मान"   : सेक्टर, श्रेणी, हुनर-टैग, व्यवसाय-प्रकार, स्रोत-प्रकार, ज़िले, जाँच-स्थिति
# कॉलम और अर्थ का एकमात्र घर: generator/data/network/batches.js (TEMPLATE_HELP); सूचियाँ: taxonomy.js, geo.js।
# भरी हुई फ़ाइल को import करें:  node generator/import_network.js <BATCH-ID> <फ़ाइल>  (batch पहले batches.js में, template: true)
# चलाएँ:  python3 generator/build_network_template.py            जाँच:  ... --check  (फ़ाइल बासी हो तो FAIL)
# ============================================================
import json, os, subprocess, sys, hashlib, io, zipfile
for _s in (sys.stdout, sys.stderr):
    try: _s.reconfigure(encoding="utf-8", errors="replace")
    except Exception: pass
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "generator", "data", "network", "ACS-Network-Import-Template.xlsx")
JS = r'''
const B=require("./generator/data/network/batches.js"),T=require("./generator/data/network/taxonomy.js"),G=require("./generator/data/network/geo.js");
console.log(JSON.stringify({help:B.TEMPLATE_HELP,cols:Object.values(B.TEMPLATE_COLS),internal:B.TEMPLATE_INTERNAL,
 sectors:Object.keys(T.SECTORS).filter(k=>T.SECTORS[k].idPattern).map(k=>({key:k,id:T.SECTORS[k].id,en:T.SECTORS[k].en,hi:T.SECTORS[k].hi,status:T.SECTORS[k].status,idPattern:T.SECTORS[k].idPattern})),
 cats:Object.fromEntries(Object.entries(T.CATEGORIES).filter(([k])=>T.SECTORS[k]&&T.SECTORS[k].idPattern)),skills:T.SKILL_TAGS,btypes:T.BUSINESS_TYPES,src:Object.keys(T.SOURCE_TYPES).map(k=>({id:k,en:T.SOURCE_TYPES[k].en,hi:T.SOURCE_TYPES[k].hi})),
 states:Object.values(G.STATES).map(s=>({en:s.en,hi:s.hi,prefix:s.idPrefix,districts:s.districts.map(d=>({en:d.en,hi:d.hi,code:d.code}))})),
 status:Object.keys(T.STATUS.internal)}));
'''
D = json.loads(subprocess.check_output(["node", "-e", JS], cwd=ROOT).decode("utf-8"))
REQUIRED = {"Record_ID", "Sector_ID", "State", "District", "Block", "Firm_Name", "Primary_Category"}
STATUS_TEXT = ["To Be Verified", "Verified", "Verified with correction", "Correction pending", "Identity review", "Not found", "Closed", "Rejected", "Hidden"]
NAVY, GOLD, OFF = "0B1F3A", "F9A825", "F5F7FA"

wb = Workbook()
ws = wb.active; ws.title = "Firms"
order = list(D["help"].keys())
for j, name in enumerate(order, 1):
    c = ws.cell(row=1, column=j, value=name)
    internal = name in D["internal"]
    c.font = Font(bold=True, color="FFFFFF" if not internal else NAVY)
    c.fill = PatternFill("solid", fgColor=(NAVY if not internal else GOLD))
    c.alignment = Alignment(horizontal="center", vertical="center", wrap_text=True)
    ws.column_dimensions[get_column_letter(j)].width = max(14, min(34, len(name) + 6))
ws.row_dimensions[1].height = 34
ws.freeze_panes = "B2"

# चुनने की सूचियाँ ("मान्य मान" शीट की श्रेणियों से)
lists = wb.create_sheet("मान्य मान")
def put_list(col, title, rows):
    lists.cell(row=1, column=col, value=title).font = Font(bold=True, color="FFFFFF")
    lists.cell(row=1, column=col).fill = PatternFill("solid", fgColor=NAVY)
    for i, r in enumerate(rows, 2):
        for k, v in enumerate(r):
            lists.cell(row=i, column=col + k, value=v)
    lists.column_dimensions[get_column_letter(col)].width = 30
    for k in range(1, len(rows[0]) if rows else 1):
        lists.column_dimensions[get_column_letter(col + k)].width = 30
    return (col, 2, 1 + len(rows))
spans = {}
spans["sector"] = put_list(1, "Sector_ID", [[s["id"], s["en"], s["hi"], s["idPattern"]] for s in D["sectors"]])
cat_rows = [[c["id"], c["en"], c["hi"]] for k in D["cats"] for c in D["cats"][k]]
spans["cat"] = put_list(6, "Primary_Category / Secondary_Categories", cat_rows)
st = D["states"]
spans["state"] = put_list(10, "State", [[s["en"], s["hi"], s["prefix"]] for s in st])
spans["district"] = put_list(14, "District (Bihar)", [[d["en"], d["hi"], d["code"]] for d in st[0]["districts"]])
bt_rows = [[b["en"], b["hi"], b["id"]] for k in D["btypes"] for b in D["btypes"][k]]
spans["btype"] = put_list(18, "Business_Type", bt_rows)
spans["src"] = put_list(22, "Source_Type", [[s["id"], s["en"], s["hi"]] for s in D["src"]])
spans["status"] = put_list(26, "Verification_Status / ACS_Status", [[s] for s in STATUS_TEXT])
spans["conf"] = put_list(28, "Confidence (भीतरी)", [["A"], ["B"], ["C"]])
sk_rows = [[t["en"], t["hi"], k.upper()] for k in D["skills"] for t in D["skills"][k]]
spans["skill"] = put_list(30, "Practical_Skill_Tags (; से अलग)", sk_rows)
lists.freeze_panes = "A2"

def dv(colname, span, allow_blank=True):
    col, r0, r1 = span
    L = get_column_letter(col)
    v = DataValidation(type="list", formula1="='मान्य मान'!$%s$%d:$%s$%d" % (L, r0, L, r1), allow_blank=allow_blank, showErrorMessage=True)
    v.error = "सूची में से चुनें (शीट: मान्य मान)"
    ws.add_data_validation(v)
    j = order.index(colname) + 1
    v.add("%s2:%s5000" % (get_column_letter(j), get_column_letter(j)))
dv("Sector_ID", spans["sector"]); dv("State", spans["state"]); dv("District", spans["district"])
dv("Primary_Category", spans["cat"]); dv("Business_Type", spans["btype"]); dv("Verification_Status", spans["status"])
dv("ACS_Status", spans["status"]); dv("Confidence", spans["conf"])
for n in ("Source_Type", "Source2_Type", "Source3_Type"): dv(n, spans["src"])

# कॉलम का अर्थ
hs = wb.create_sheet("कॉलम", 1)
for j, h in enumerate(["कॉलम (Column)", "ज़रूरी?", "वेबसाइट पर?", "अर्थ और नियम"], 1):
    c = hs.cell(row=1, column=j, value=h); c.font = Font(bold=True, color="FFFFFF"); c.fill = PatternFill("solid", fgColor=NAVY)
for i, name in enumerate(order, 2):
    hs.cell(row=i, column=1, value=name).font = Font(bold=True)
    hs.cell(row=i, column=2, value="हाँ" if name in REQUIRED else "")
    hs.cell(row=i, column=3, value="नहीं (भीतरी)" if name in D["internal"] else "हाँ")
    hs.cell(row=i, column=4, value=D["help"][name] or "ऊपर वाले स्रोत-कॉलम जैसा")
    hs.cell(row=i, column=4).alignment = Alignment(wrap_text=True, vertical="top")
n = len(order) + 3
for line in ["नियम: एक पंक्ति = एक जगह (शाखा अलग पंक्ति, Parent_Firm_ID से जुड़ी)। Record_ID कभी नहीं बदलता, कभी दोबारा नहीं।",
             "नियम: जो पता न हो, वह ख़ाली छोड़ें। अंदाज़े से फ़ोन, पता, निर्देशांक या वेबसाइट कभी न लिखें।",
             "नियम: Verified सिर्फ़ तब, जब RM की ज़मीनी जाँच का सबूत (Evidence_Ref) और तारीख़ हो। Confidence A का अर्थ Verified नहीं।",
             "नियम: सुनहरे कॉलम (Email, Confidence, Notes) भीतरी हैं: वेबसाइट पर कभी नहीं छपते।",
             "Import: node generator/import_network.js <BATCH-ID> <यह फ़ाइल>  (पहले generator/data/network/batches.js में batch जोड़ें)"]:
    hs.cell(row=n, column=1, value=line); n += 1
hs.column_dimensions["A"].width = 26; hs.column_dimensions["B"].width = 10; hs.column_dimensions["C"].width = 14; hs.column_dimensions["D"].width = 90
hs.freeze_panes = "A2"
wb.properties.creator = "Applied Computer School"; wb.properties.title = "ACS Network Import Template"

buf = io.BytesIO(); wb.save(buf)
# एक-सी फ़ाइल हर बार (zip की तारीख़ स्थिर), ताकि --check काम करे
src = zipfile.ZipFile(io.BytesIO(buf.getvalue()))
out = io.BytesIO(); z = zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED)
for info in sorted(src.infolist(), key=lambda x: x.filename):
    data = src.read(info.filename)
    if info.filename == "docProps/core.xml":
        import re
        data = re.sub(rb"<dcterms:(created|modified)[^>]*>[^<]*</dcterms:\1>", lambda m: m.group(0).split(b">")[0] + b">2026-11-22T00:00:00Z</dcterms:" + m.group(1) + b">", data)
    zi = zipfile.ZipInfo(info.filename, date_time=(2026, 11, 22, 0, 0, 0)); zi.compress_type = zipfile.ZIP_DEFLATED
    z.writestr(zi, data)
z.close(); blob = out.getvalue()
old = open(OUT, "rb").read() if os.path.exists(OUT) else None

def fingerprint(data):
    # संस्करण-निरपेक्ष सामग्री: हर शीट के cell-मान, शीर्ष-पंक्ति का रूप, dropdown, freeze, कॉलम-चौड़ाई
    from openpyxl import load_workbook
    w = load_workbook(io.BytesIO(data))
    fp = []
    for s in w.worksheets:
        cells = [(c.coordinate, c.value) for row in s.iter_rows() for c in row if c.value is not None]
        head = [(c.coordinate, bool(c.font.b), str(c.fill.fgColor.rgb)) for c in s[1] if c.value is not None] if s.max_row else []
        dvs = sorted((str(d.type), str(d.formula1), str(d.sqref), bool(d.allow_blank)) for d in s.data_validations.dataValidation)
        widths = sorted((k, round(v.width, 2)) for k, v in s.column_dimensions.items() if v.width)
        fp.append((s.title, cells, head, dvs, str(s.freeze_panes), widths))
    return fp

same_bytes = (old == blob)
same = same_bytes or (old is not None and fingerprint(old) == fingerprint(blob))
note = "" if same_bytes else " (bytes अलग: openpyxl/zlib का संस्करण अलग, सामग्री हूबहू वही)"
if "--check" in sys.argv:
    if not same: print("⛔ --check: ACS-Network-Import-Template.xlsx बासी है (चलाएँ: python3 generator/build_network_template.py)"); sys.exit(1)
    print("🏁 --check पास: Excel-साँचा ताज़ा है (" + str(len(order)) + " कॉलम)" + note); sys.exit(0)
if same: print("✅ Excel-साँचा पहले जैसा (कुछ नहीं बदला)" + note)
else:
    open(OUT, "wb").write(blob); print("✅ लिखा: generator/data/network/ACS-Network-Import-Template.xlsx (" + str(len(order)) + " कॉलम, " + str(len(blob)) + " bytes)")
print("🏁 build_network_template v1.1")
