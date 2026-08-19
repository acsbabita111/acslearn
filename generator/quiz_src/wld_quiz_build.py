# -*- coding: utf-8 -*-
"""wld_quiz_build.py — ACS वेल्डिंग व्यवसाय: स्रोत (प्रश्न,सही,ग़लत×3) → assets/wld_quiz/wld_quiz_kNN.js
   v1.0 · 18-Aug-2026 · मशरूम-रूप q/o/a · सही का स्थान निर्धारित घुमाव से।
   लंबाई-नियम (v5.2 सीख, "समान-लंबाई चार उत्तर"): विकल्प नज़दीकी लंबाई के; सही अकेला-सबसे-लंबा
   सिर्फ़ 15-35% खिड़की में — जाँच dev_wld_quiz_check.js से।
   चलाना (repo-रूट से): python3 generator/quiz_src/wld_quiz_build.py            # सब 24 खंड
                        python3 generator/quiz_src/wld_quiz_build.py 21         # एक खंड
"""
import json, sys, os, importlib.util, re
HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
OUTDIR = os.path.join(ROOT, "assets", "wld_quiz")

def parts():
    # welding_lessons_data.js की parts-सूची (4 दर्ज; 300-पाठ पूरा होने पर 8)
    src = open(os.path.join(ROOT, "generator", "data", "welding_lessons_data.js"), encoding="utf-8").read()
    m = re.search(r"parts:\s*(\[[\s\S]*?\])\s*\n\s*\}", src)
    arr = json.loads(re.sub(r'(\w+):', r'"\1":', m.group(1)))
    return [(p["no"], p["from"], p["to"]) for p in arr]

def load(path):
    spec = importlib.util.spec_from_file_location("m", path); m = importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m.L

def build(k, a, b):
    srcp = os.path.join(HERE, "wld_quiz_k%02d_src.py" % k)
    L = load(srcp) if os.path.exists(srcp) else {}
    bank = {}
    seq = [0, 2, 1, 3, 3, 1, 0, 2, 2, 3, 1, 0, 1, 0, 3, 2]
    fails = []
    for n in range(a, b + 1):
        items = L.get(n)
        if not items: continue          # सामग्री लंबित (खंड-1..5) — चुपचाप छोड़ो, checker रिपोर्ट करेगा
        if len(items) != 5: fails.append("पाठ-%d में %d प्रश्न" % (n, len(items)))
        qs = []
        for i, (q, c, w1, w2, w3) in enumerate(items):
            pos = seq[(n * 5 + i) % len(seq)]
            opts = [w1, w2, w3]; opts.insert(pos, c)
            qs.append({"q": q, "o": opts, "a": pos})
        bank[str(n)] = qs
    if fails: print("\n".join(fails))
    kk = "%02d" % k
    js = ('/* wld_quiz_k%s.js — ACS वेल्डिंग व्यवसाय अभ्यास-प्रश्न · खंड-%d (पाठ %d-%d)\n'
          '   v1.0 · 18-Aug-2026 · हर पाठ 5 प्रश्न × 4 विकल्प · a = सही-क्रमांक (0-3)\n'
          '   मशरूम-रूप (msh_quiz) · लंबाई-संतुलन व स्थान-बँटवारा जन्म से (v5.2 सीख)\n'
          '   स्रोत: generator/quiz_src/wld_quiz_k%s_src.py → builder wld_quiz_build.py (हाथ से न बदलें)\n'
          '   जाँच: node generator/dev_wld_quiz_check.js · गिनती मशीन से देखें */\n'
          '"use strict";\nvar WLD_QUIZ_K%s = %s;\n'
          'if (typeof module !== "undefined") module.exports = { WLD_QUIZ: WLD_QUIZ_K%s };\n') % (kk, k, a, b, kk, kk, json.dumps(bank, ensure_ascii=False), kk)
    os.makedirs(OUTDIR, exist_ok=True)
    open(os.path.join(OUTDIR, "wld_quiz_k%s.js" % kk), "w", encoding="utf-8").write(js)
    return len(bank)

if __name__ == "__main__":
    only = int(sys.argv[1]) if len(sys.argv) > 1 else None
    tot = 0
    for (k, a, b) in parts():
        if only and k != only: continue
        n = build(k, a, b); tot += n
        print("built k%02d (%d पाठ)" % (k, n))
    print("कुल पाठ बैंक में:", tot)
