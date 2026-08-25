# -*- coding: utf-8 -*-
"""wld_gen_all.py — ACS वेल्डिंग (SE021): 630 पाठों से अभ्यास-प्रश्न स्रोत (wld_quiz_kNN_src.py) बनाना
   v2.0 · 25-Aug-2026 · चलाना (repo-root से): python3 generator/quiz_src/wld_gen_all.py [k-से] [k-तक]
   पुराने wld_extract_from_lessons.py + wld_gen_quiz_from_lessons.py (absolute-path, 4 हिस्से) का 12-हिस्सा repo-रूप।
   हर पाठ 5 प्रश्न: सार · आम-ग़लती-1 · आम-ग़लती-2 (या 'छोटी परीक्षा' का असली प्रश्न) · सावधानी · तेज़-दोहराव (या असली प्रश्न)।
   distractor = उसी हिस्से/कोर्स के दूसरे पाठों की उसी तरह की पंक्तियाँ; लंबाई-संतुलन (v5.2) A/B मोड से।
   6-शब्द मौलिकता: पहले से बने shards (k01…) के प्रश्न-वाक्यांश पहले 'seen' में — टकराव नहीं।
   फिर: python3 generator/quiz_src/wld_quiz_build.py  →  node generator/dev_wld_quiz_check.js
"""
import json, re, os, sys, subprocess
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
DATA = os.path.join(ROOT, "generator", "data", "welding_lessons_data.js")
K_FROM = int(sys.argv[1]) if len(sys.argv) > 1 else 1
K_TO = int(sys.argv[2]) if len(sys.argv) > 2 else 99

# ---- पाठ-data node से JSON में ----
dump = subprocess.run(["node", "-e", """
const {WELDING_COURSE:C,WELDING_LESSONS:L}=require(process.argv[1]);
process.stdout.write(JSON.stringify({parts:C.parts, lessons:L.map(l=>({num:l.num,title:l.title,secs:l.sections.map(s=>({t:s.t,h:s.h}))}))}));
""", DATA], capture_output=True, text=True, check=True).stdout
D = json.loads(dump); PARTS = D["parts"]; LESSONS = D["lessons"]

def khand(n):
    for p in PARTS:
        if p["from"] <= n <= p["to"]: return p["n"]
def txt(h):
    h = re.sub(r"<svg[\s\S]*?</svg>", "", h); h = re.sub(r"<br\s*/?>", "\n", h); h = re.sub(r"</p>|</li>", "\n", h); h = re.sub(r"<[^>]+>", "", h)
    h = h.replace("&nbsp;", " ").replace("&amp;", "&").replace("&lt;", "<").replace("&gt;", ">").replace("&quot;", '"')
    return re.sub(r"[ \t]+", " ", h).strip()
def clean(t): return re.sub(r"\s+", " ", t.replace("[", "(").replace("]", ")")).strip().rstrip("।").strip()
def fixparen(t):
    while t.count("(") > t.count(")"):
        i = t.rfind("("); t = t[:i].strip().rstrip(",—–-;:").strip()
    return t
def clause(t, mx=130):
    t = clean(t)
    if len(t) > mx:
        cut = None
        for sep in [" — ", " – ", "; ", ", ", " · "]:
            i = t.find(sep, 45)
            if 45 <= i <= mx: cut = t[:i].strip(); break
        if cut is None:
            c = t[:mx]; j = c.rfind(" "); cut = c[:j].strip() if j > 40 else c
        t = cut
    return fixparen(t)
def first_sentence(body):
    first = next((l for l in body.split("\n") if l.strip()), body)
    return clean(re.split(r"।", first)[0])
def items(h):
    t = txt(h)
    parts = [x.strip() for x in re.split(r"\(\d+\)\s*", t) if x.strip()]
    if len(parts) >= 3: return [clean(re.split(r"।", p)[0]) for p in parts if len(p) > 15]
    lines = [l.strip() for l in t.split("\n") if len(l.strip()) > 15]
    return [clean(re.split(r"।", l)[0]) for l in lines]
def quiz_pairs(h):
    t = txt(h); out = []; i = 0
    while True:
        j = t.find("(उत्तर:", i)
        if j < 0: break
        # प्रश्न = पिछले "(N)" चिह्न के बाद का पाठ
        pre = t[:j]; m = list(re.finditer(r"\(\d+\)\s*", pre))
        q = clean(pre[m[-1].end():]) if m else ""
        # उत्तर = संतुलित कोष्ठक तक
        depth = 0; k = j
        while k < len(t):
            if t[k] == "(": depth += 1
            elif t[k] == ")":
                depth -= 1
                if depth == 0: break
            k += 1
        a = clean(t[j + len("(उत्तर:"):k]); i = k + 1
        if q.endswith("?") and 12 <= len(q) <= 140 and 8 <= len(a) <= 130: out.append((q, fixparen(a)))
    return out

EX = {}
for x in LESSONS:
    d = {"title": clean(x["title"]), "mukhya": "", "galti": [], "suraksha": "", "tez": [], "saar": "", "quiz": []}
    for s in x["secs"]:
        t = s["t"]; body = txt(s["h"])
        if t.startswith("मुख्य बात"): d["mukhya"] = first_sentence(body)
        elif t.startswith("आम गलतियाँ") or t.startswith("आम ग़लतियाँ"): d["galti"] = items(s["h"])
        elif t.startswith("सावधानियाँ") or t.startswith("सावधानी"): d["suraksha"] = first_sentence(body)
        elif t.startswith("तेज़ दोहराव"): d["tez"] = [clean(p) for p in re.split(r"\s[•·]\s", body) if len(clean(p)) >= 15]
        elif t.startswith("पाठ का सार"): d["saar"] = clean(re.split(r"।", body)[0])
        elif t.startswith("छोटी परीक्षा"): d["quiz"] = quiz_pairs(s["h"])
    EX[x["num"]] = d

def toks(t): return [w for w in re.sub(r"[()?\"',.—–«»:-]", " ", t).split() if w]
def wins(q):
    w = toks(q); return [" ".join(w[i:i+6]) for i in range(len(w) - 5)]

# ---- पहले से बने shards के प्रश्न 'seen' में (k < K_FROM) ----
seen = {}
for p in PARTS:
    k = p["n"]
    if k >= K_FROM: continue
    f = os.path.join(ROOT, "assets", "wld_quiz", "wld_quiz_k%02d.js" % k)
    if not os.path.exists(f): continue
    js = open(f, encoding="utf-8").read(); key = "var WLD_QUIZ_K%02d = " % k
    obj = json.loads(js[js.index(key) + len(key): js.index(";\nif (typeof module")])
    for n, qs in obj.items():
        for i, q in enumerate(qs):
            for w in wins(q["q"]): seen[w] = (int(n), i)

pools = {}
for n, d in EX.items():
    k = khand(n); pk = pools.setdefault(k, {"g": [], "s": [], "m": [], "z": [], "q": []})
    for g in d["galti"]: pk["g"].append((n, clause(g)))
    pk["s"].append((n, clause(d["suraksha"])))
    pk["m"].append((n, clause(d["saar"] or d["mukhya"])))
    for z in d["tez"]: pk["z"].append((n, clause(z, 110)))
    for q, a in d["quiz"]: pk["q"].append((n, a))
gp = {key: [] for key in ["g", "s", "m", "z", "q"]}
for k in pools:
    for key in gp: gp[key] += pools[k][key]

def pick(correct, pool, g, n_self, mode, seed):
    cands = []; sn = {correct}
    for m, c in pool + g:
        if m != n_self and c not in sn and len(c) >= 10: sn.add(c); cands.append(c)
    L = len(correct)
    if mode == "A":
        short = [c for c in cands if len(c) < L]; short.sort(key=lambda c: (L - len(c), (hash(c) + seed) % 997))
        if len(short) >= 3: return short[:3]
    longer = [c for c in cands if len(c) > L]; longer.sort(key=lambda c: (len(c) - L, (hash(c) + seed) % 997))
    rest = sorted(cands, key=lambda c: (abs(len(c) - L), (hash(c) + seed) % 997))
    out = []
    if longer: out.append(longer[0])
    for c in rest:
        if c not in out: out.append(c)
        if len(out) == 3: break
    return out

def stems(n, tk):
    f4 = " ".join(tk[:4]); l4 = " ".join(tk[-4:]) if len(tk) > 4 else f4; f3 = " ".join(tk[:3]); l3 = " ".join(tk[-3:]) if len(tk) > 3 else f3
    return [
        ["पाठ-%d («%s») का सार क्या है?" % (n, f4), "«%s» (पाठ-%d) की मुख्य बात?" % (l4, n), "सार बताइए — पाठ-%d «%s»?" % (n, f3)],
        ["«%s» (पाठ-%d) की आम ग़लती क्या है?" % (f4, n), "पाठ-%d «%s» में आम ग़लती?" % (n, l4), "आम ग़लती — पाठ-%d («%s»)?" % (n, f3)],
        ["कौन-सी ग़लती «%s» वाले पाठ-%d में बताई गई?" % (l4, n), "पाठ-%d («%s») की एक और ग़लती?" % (n, f4), "दूसरी ग़लती कौन-सी — पाठ-%d «%s»?" % (n, l3)],
        ["«%s» (पाठ-%d) की सावधानी क्या है?" % (f3, n), "पाठ-%d «%s» — सावधानियाँ क्या कहती हैं?" % (n, l3), "सावधानी — पाठ-%d («%s»)?" % (n, f4)],
        ["तेज़-दोहराव: पाठ-%d («%s») का एक सूत्र?" % (n, f3), "पाठ-%d का दोहराव-सूत्र कौन-सा है?" % n, "«%s» (पाठ-%d) — दोहराव में क्या है?" % (l3, n)]]

OUT = {}; used_quiz = 0
for x in LESSONS:
    n = x["num"]; k = khand(n)
    if not (K_FROM <= k <= K_TO): continue
    d = EX[n]; tk = toks(d["title"]); pk = pools[k]
    mode = lambda i: "A" if (n * 5 + i) % 4 == 0 else "B"
    g = [clause(v) for v in d["galti"]]
    while len(g) < 3: g.append(g[-1] if g else clause(d["mukhya"]))
    z = [clause(v, 110) for v in d["tez"] if len(clause(v, 110)) >= 15]
    if not z: z = [clause(d["saar"] or d["mukhya"], 110)]
    qz = [(q, a) for q, a in d["quiz"] if all(w not in seen for w in wins(q))]
    answers = [(clause(d["saar"] or d["mukhya"]), pick(clause(d["saar"] or d["mukhya"]), pk["m"], gp["m"], n, mode(0), 1), None),
               (g[0], pick(g[0], pk["g"], gp["g"], n, mode(1), 3), None)]
    if len(qz) >= 1:
        q, a = qz[0]; answers.append((a, pick(a, pk["q"], gp["q"] + gp["z"], n, mode(2), 5), "पाठ-%d: %s" % (n, q))); used_quiz += 1
    else:
        c = g[2] if g[2] != g[0] else g[1]; answers.append((c, pick(c, pk["g"], gp["g"], n, mode(2), 5), None))
    answers.append((clause(d["suraksha"]), pick(clause(d["suraksha"]), pk["s"], gp["s"], n, mode(3), 7), None))
    if len(qz) >= 2:
        q, a = qz[1]; answers.append((a, pick(a, pk["q"], gp["q"] + gp["z"], n, mode(4), 9), "पाठ-%d: %s" % (n, q))); used_quiz += 1
    else:
        answers.append((z[0], pick(z[0], pk["z"], gp["z"], n, mode(4), 9), None))
    ST = stems(n, tk); qs = []
    for i, (c, ws, fixed) in enumerate(answers):
        chosen = None
        cands = ([fixed] if fixed else []) + ST[i]
        for cand in cands:
            if all(w not in seen for w in wins(cand)): chosen = cand; break
        if chosen is None: chosen = ST[i][0] + " (पाठ %d)" % n
        for w in wins(chosen): seen[w] = (n, i)
        assert len(ws) == 3, (n, i, ws)
        qs.append((chosen, c, ws[0], ws[1], ws[2]))
    OUT.setdefault(k, {})[n] = qs

for k, L in OUT.items():
    p = [q for q in PARTS if q["n"] == k][0]
    body = ["# -*- coding: utf-8 -*-",
            "# wld_quiz_k%02d_src.py — ACS वेल्डिंग व्यवसाय अभ्यास-प्रश्न स्रोत · हिस्सा-%d (पाठ %d-%d)" % (k, k, p["from"], p["to"]),
            "# v2.0 · 25-Aug-2026 · generator/quiz_src/wld_gen_all.py से बना (हाथ से न बदलें) · प्रति पाठ 5 × (प्रश्न, सही, ग़लत-1, ग़लत-2, ग़लत-3)",
            "L = {"]
    for n in sorted(L):
        body.append("  %d: [" % n)
        for t in L[n]: body.append("    " + json.dumps(list(t), ensure_ascii=False) + ",")
        body.append("  ],")
    body.append("}\n")
    open(os.path.join(HERE, "wld_quiz_k%02d_src.py" % k), "w", encoding="utf-8").write("\n".join(body))
    print("src k%02d: %d पाठ" % (k, len(L)))
print("कुल पाठ:", sum(len(v) for v in OUT.values()), "· असली 'छोटी परीक्षा' प्रश्न प्रयुक्त:", used_quiz)
