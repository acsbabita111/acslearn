import re,json,sys
src=open("/home/claude/work/acs/generator/data/welding_lessons_data.js",encoding="utf8").read()
lo=int(sys.argv[1]) if len(sys.argv)>1 else 421
grams={}; dup=[]
def paras(h): return re.findall(r"<p>(.*?)</p>",h)
for line in src.split("\n"):
    if not line.startswith("{\"num\""): continue
    l=json.loads(line.rstrip(","))
    if l["num"]<lo: continue
    for s in l["sections"]:
        if not (s["t"].startswith("मुख्य बात") or s["t"].startswith("आज ही")): continue
        ps=paras(s["h"])
        # 421-525: only appended (<b>-led) paragraphs; 526+: all
        if l["num"]<=525: ps=[p for p in ps if p.startswith("<b>") and not re.match(r"<b>\(\d",p)]
        for p in ps:
            t=re.sub(r"<[^>]+>"," ",p); t=re.sub(r"\s+"," ",t).strip(); w=t.split(" ")
            for i in range(len(w)-7):
                g=" ".join(w[i:i+8])
                if g in grams and grams[g]!=l["num"]: dup.append((grams[g],l["num"],g))
                else: grams[g]=l["num"]
seen=set(); out=[]
for a,b,g in dup:
    if (a,b) in seen: continue
    seen.add((a,b)); out.append((a,b,g))
print("8-gram दोहराव (नई सामग्री, पाठ>=%d):"%lo,len(out))
for a,b,g in out[:40]: print(a,"<->",b,":",g)
