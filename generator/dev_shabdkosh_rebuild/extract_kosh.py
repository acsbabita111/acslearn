# v6: zone-निकासी + 3-पास मिलान (word-forms क्रमबद्ध · sandwich-स्थिति · pron) — निर्धारक (deterministic)
import subprocess, sys, json, unicodedata as U, re
from collections import Counter
MARK=re.compile(r'^#{3}.*#{3}$')
BIDI=dict.fromkeys(map(ord,"\u200c\u200d\u200e\u200f\u202a\u202b\u202c\u202d\u202e\u2066\u2067\u2068\u2069\u0640"),None)
PUNCT=dict.fromkeys(map(ord,"\u06d4\u061f\u060c\u061b\u0964\u0965"),None)
def toks(pdf):
    r=subprocess.run(["pdftotext","-tsv",pdf,"-"],capture_output=True)
    out=[]
    for ln in r.stdout.decode("utf-8","ignore").splitlines()[1:]:
        p=ln.split("\t")
        if len(p)<12: continue
        t=p[11]
        if not t or MARK.match(t): continue
        try: out.append({"pg":int(p[1]),"x":float(p[6]),"y":float(p[7]),"w":float(p[8]),"h":float(p[9]),"t":t})
        except: pass
    return [t for t in out if t["pg"]>=2]
def yrows(T):
    rows=[]
    for pg in sorted(set(t["pg"] for t in T)):
        pts=sorted([t for t in T if t["pg"]==pg],key=lambda t:(t["y"],t["x"]))
        cur=[]; cy=None
        for t in pts:
            hh=min([t["h"]]+[a["h"] for a in cur]) if cur else t["h"]
            if cy is None or abs(t["y"]-cy)<=max(3,hh*0.5):
                cur.append(t); cy=t["y"] if cy is None else min(cy,t["y"])
            else:
                rows.append(sorted(cur,key=lambda a:a["x"])); cur=[t]; cy=t["y"]
        if cur: rows.append(sorted(cur,key=lambda a:a["x"]))
    return rows
def join(seg):
    if not seg: return ""
    med=sorted(t["h"] for t in seg)[len(seg)//2]
    out=seg[0]["t"]
    for a,b in zip(seg,seg[1:]):
        g=b["x"]-(a["x"]+a["w"])
        out+=("" if g<max(1.5,med*0.28) else " ")+b["t"]
    return out.translate(BIDI).strip()
def blocks_of(tokens):
    from collections import Counter as C
    c=C()
    for t in tokens[:400]:
        for ch in t[:3]:
            o=ord(ch)
            if o>=0x80: c[o>>8]+=1
    return {b for b,_ in c.most_common(3)}
def parse(pdf,wblocks=None):
    T=toks(pdf)
    c=Counter(round(t["x"]/2)*2 for t in T)
    tot=sum(c.values()); freq=sorted(x for x,n in c.items() if n>=tot*0.05)
    assert len(freq)>=2, "स्तंभ-सीध नहीं मिली"
    pronX,meanX=freq[-2],freq[-1]
    pb,mb=pronX-10,meanX-10
    pairs=[]; pend=None
    for seg in yrows(T):
        wc=[t for t in seg if t["x"]<pb]; pc=[]; mc=[t for t in seg if t["x"]>=mb]
        for t in seg:
            if pb<=t["x"]<mb:
                ch=t["t"][:1]
                if wblocks and ch and ord(ch)>=0x80 and (ord(ch)>>8) in wblocks and not (0x09<= (ord(ch)>>8) <=0x09):
                    wc.append(t)
                else: pc.append(t)
        wc=sorted(wc,key=lambda a:a["x"])
        txt="".join(t["t"] for t in seg).replace(" ","")
        if "कैसेबोलें" in txt or txt=="शब्द" or "शब्दकोश" in txt: continue
        w=join(wc); p=join(pc); m=join(mc)
        if wc and not pc and not mc: pend=(pend+w) if pend is not None else w; continue
        if mc and not wc and pend is not None: pairs.append((pend,m,p)); pend=None; continue
        if mc and wc: pairs.append((w,m,p)); pend=None; continue
        if mc and not wc and not pc and pairs:
            w0,m0,p0=pairs[-1]; pairs[-1]=(w0,(m0+" "+m).strip(),p0)
    return pairs
ALEFS=set("\u0627\u0622\u0623\u0625")
def revg(s):
    # समूह: base+संयोजी-चिह्न; लाम+अलिफ़ अटूट; समूह-सूची उलटो
    cl=[]
    for ch in s:
        if cl and U.category(ch)=="Mn": cl[-1]+=ch
        else: cl.append(ch)
    out=[]; i=0
    while i<len(cl):
        if cl[i][0]=="\u0644" and i+1<len(cl) and cl[i+1][0] in ALEFS:
            out.append(cl[i]+cl[i+1]); i+=2
        else: out.append(cl[i]); i+=1
    return "".join(reversed(out))
def runrev(s):
    # मिश्र-दिशा: ASCII-गुच्छे ज्यों-के-त्यों, बाक़ी गुच्छे भीतर-उलट, गुच्छों का क्रम उलटा
    runs=re.findall(r'[A-Za-z0-9]+|[^A-Za-z0-9]+',s)
    return "".join(r if r[:1].isascii() and r[:1].isalnum() else r[::-1] for r in reversed(runs))
def forms(s):
    s=s.translate(BIDI); out=[]
    nk=U.normalize("NFKC",s)
    for b in (s,s[::-1],nk[::-1],runrev(s),runrev(nk),revg(s),revg(nk)):
        for n in ("NFC","NFKC"):
            x=U.normalize(n,b)
            for v in (x,x.replace(" ","")):
                if v not in out: out.append(v)
    return out
def run(pdf,slug,ct):
    info=ct[slug]; tokens=info["tokens"]; tw=set(info["tw"]); dev=info.get("dev",{})
    wb=blocks_of(tokens)
    wb={b for b in wb if b!=0x09}  # देवनागरी-ब्लॉक word-overflow नियम से बाहर
    pairs=parse(pdf,wb)
    Tset={}
    for t in tokens: Tset.setdefault(U.normalize("NFC",t),t)
    loose={}
    for tr in (lambda k:k.translate(PUNCT), lambda k:k.translate(BIDI), lambda k:k.translate(PUNCT).translate(BIDI)):
        for k,v in Tset.items():
            kk=tr(k)
            if kk and kk not in Tset: loose.setdefault(kk,v)
    res={}; hits=[]
    for w,m,p in pairs:
        hit=None
        for cnd in forms(w):
            c2=U.normalize("NFC",cnd.lower())
            if c2 in Tset: hit=Tset[c2]; break
            if c2 in loose: hit=loose[c2]; break
            c3=c2.translate(PUNCT)
            if c3 in loose: hit=loose[c3]; break
        if hit is not None and hit not in res: res[hit]=m.strip()
        hits.append(hit)
    # पास-2: sandwich-स्थिति
    tidx={t:i for i,t in enumerate(tokens)}
    seq=[]
    for j,h in enumerate(hits):
        if h is not None:
            i=tidx[h]
            if not seq or i>seq[-1][1]: seq.append((j,i))
    for (j1,i1),(j2,i2) in zip(seq,seq[1:]):
        if j2-j1==i2-i1>1:
            for d in range(1,j2-j1):
                t=tokens[i1+d]
                if t not in res: res[t]=pairs[j1+d][1].strip()
    # पास-3: उच्चारण-मिलान (अनूठा हो तभी)
    pmap={}
    for j,pr in enumerate(pairs):
        if hits[j] is None:
            key=U.normalize("NFC",pr[2].replace(" ",""))
            if key: pmap.setdefault(key,[]).append(pr)
    for t in tokens:
        if t in res or t not in dev: continue
        key=U.normalize("NFC",dev[t].replace(" ",""))
        cand=pmap.get(key,[])
        if len(cand)==1: res[t]=cand[0][1].strip()
    # पास-4: क्रम-चाल — बचे tokens ↔ बचे pairs, पूर्ण pron-बराबरी
    leftP=[pr for j,pr in enumerate(pairs) if hits[j] is None]
    leftT2=[t for t in tokens if t not in res and dev.get(t)]
    pi=0
    for t in leftT2:
        key=U.normalize("NFC",dev[t].replace(" ",""))
        j=pi
        while j<len(leftP):
            pk=U.normalize("NFC",leftP[j][2].replace(" ",""))
            if pk==key:
                res[t]=leftP[j][1].strip(); pi=j+1; break
            j+=1
    # हाथ-मिलान (अंतिम): /tmp/handfix.json
    import os
    if os.path.exists("/tmp/handfix.json"):
        hf=json.load(open("/tmp/handfix.json")).get(slug,{})
        for t,m in hf.items():
            if t in Tset.values() or t in tokens:
                if t not in res: res[t]=m
    need=[t for t in tokens if t not in tw]
    cov=sum(1 for t in need if t in res)
    return pairs,res,need,cov
if __name__=="__main__":
    ct=json.load(open("/tmp/course_tokens.json"))
    pdf,slug=sys.argv[1],sys.argv[2]
    pairs,res,need,cov=run(pdf,slug,ct)
    left=[t for t in need if t not in res][:12]
    print(f"{slug}: पंक्ति={len(pairs)} | tw-बाहर={len(need)} ढके={cov} बाक़ी={len(need)-cov} {('उदा: '+' '.join(left)) if left else '✅'}")
    json.dump(res,open(f"/tmp/k_{slug}.json","w"),ensure_ascii=False)
