# gen_tirhuta_svg.py v1.1 · 27-Oct-2026 — तिरहुता-पाठ → SVG-path भंडार (परत-3, मशीन-जनित)
# पढ़ता: generator/data/tirhuta_need_words.json (build_tirhuta_pages.js fail-closed से बनी सूची)
# लिखता: generator/data/tirhuta_glyphs_data.js — मौजूदा भंडार में जोड़कर (merge, कभी घटाकर नहीं)
# फ़ॉन्ट: Noto Sans Tirhuta (OFL) — रूपरेखाएँ HarfBuzz-आकार देकर path में बेक; फ़ोन-निर्भरता शून्य
import json, os, re, sys
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

HERE = os.path.dirname(os.path.abspath(__file__))
FONT = os.environ.get("TIRHUTA_FONT", "/home/claude/fonts/NotoSansTirhuta-Regular.ttf")
NEED = os.path.join(HERE, "data", "tirhuta_need_words.json")
OUT  = os.path.join(HERE, "data", "tirhuta_glyphs_data.js")

blob = hb.Blob.from_file_path(FONT); face = hb.Face(blob); font = hb.Font(face)
tt = TTFont(FONT); gs = tt.getGlyphSet()
ASC = tt["hhea"].ascender; DESC = -tt["hhea"].descender

def shape_to_path(s):
    buf = hb.Buffer(); buf.add_str(s); buf.guess_segment_properties()
    hb.shape(font, buf)
    x = 0; parts = []
    for i, p in zip(buf.glyph_infos, buf.glyph_positions):
        gname = font.glyph_to_string(i.codepoint)
        pen = SVGPathPen(gs)
        tp = TransformPen(pen, Transform(1, 0, 0, -1, x + p.x_offset, -p.y_offset))
        gs[gname].draw(tp)
        d = pen.getCommands()
        if d: parts.append(d)
        x += p.x_advance
    # path में दशमलव घटाओ (फ़ाइल-वज़न)
    d = " ".join(parts)
    d = re.sub(r"(\d+)\.0\b", r"\1", d)
    return {"w": x, "d": d}

old = {}
if os.path.exists(OUT):
    t = open(OUT, encoding="utf-8").read()
    m = re.search(r"\{[\s\S]*\}", t[t.index('"map"')-1:]) if '"map"' in t else None
    j = re.search(r"module\.exports\s*=\s*(\{[\s\S]*\});", t)
    if j: old = json.loads(j.group(1)).get("map", {})

need = json.load(open(NEED, encoding="utf-8")) if os.path.exists(NEED) else []
added = 0
for k in need:
    if k not in old:
        old[k] = shape_to_path(k); added += 1

data = {"asc": ASC, "desc": DESC, "font": "Noto Sans Tirhuta (OFL) v" + str(tt["head"].fontRevision), "map": old}
js = ('"use strict";\n'
      "/* tirhuta_glyphs_data.js — मशीन-जनित (gen_tirhuta_svg.py) · हाथ से न बदलें ·\n"
      "   गिनती मशीन से देखें (build_tirhuta_pages.js) · Noto Sans Tirhuta रूपरेखाएँ (OFL — assets/fonts/OFL-NotoSansTirhuta.txt) */\n"
      "module.exports = " + json.dumps(data, ensure_ascii=False) + ";\n")
open(OUT, "w", encoding="utf-8").write(js)
print("भंडार:", len(old), "शब्द · नए जुड़े:", added, "· asc", ASC, "desc", DESC)
