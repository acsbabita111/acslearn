import json,re
ex=json.load(open('extract.json',encoding='utf-8'))
P=json.load(open('parts.json',encoding='utf-8'))
def khand(n):
    for p in P:
        if p['from']<=n<=p['to']: return p['no']
def clean(t):
    t=re.sub(r'\*\*|\*|«|»','',t); t=re.sub(r'\[([^\]]+)\]\([^)]*\)',r'\1',t)
    t=t.replace('[','(').replace(']',')'); return re.sub(r'\s+',' ',t).strip().rstrip('।').strip()
def fixparen(t):
    while t.count('(')>t.count(')'):
        i=t.rfind('('); t=t[:i].strip().rstrip(',—–-;').strip()
    return t
def clause(t,mx=130):
    t=clean(t)
    if len(t)>mx:
        cut=None
        for sep in [' — ',' – ','; ',', ']:
            i=t.find(sep,45)
            if 45<=i<=mx: cut=t[:i].strip(); break
        if cut is None:
            c=t[:mx]; j=c.rfind(' '); cut=c[:j].strip() if j>40 else c
        t=cut
    return fixparen(t)
def toks(t): return [w for w in re.sub(r'[()?"\',.—–«»:-]',' ',t).split() if w]
pools={}
for n,d in ex.items():
    k=khand(int(n)); pools.setdefault(k,{'g':[],'s':[],'m':[],'t':[]})
    for g in d.get('galti',[]): pools[k]['g'].append((int(n),clause(g)))
    if d.get('suraksha'): pools[k]['s'].append((int(n),clause(d['suraksha'])))
    if d.get('mukhya'): pools[k]['m'].append((int(n),clause(d['mukhya'])))
    pools[k]['t'].append((int(n),clean(d['title'])))
gpool={'g':[],'s':[],'m':[],'t':[]}
for k in pools:
    for key in gpool: gpool[key]+=pools[k][key]
def pick(correct,pool,gp,n_self,mode,seed):
    cands=[]; seen={correct}
    for m,c in pool+gp:
        if m!=n_self and c not in seen: seen.add(c); cands.append(c)
    L=len(correct)
    if mode=='A':
        short=[c for c in cands if len(c)<L]
        short.sort(key=lambda c:(L-len(c),(hash(c)+seed)%997))
        if len(short)>=3: return short[:3]
    longer=[c for c in cands if len(c)>L]; longer.sort(key=lambda c:(len(c)-L,(hash(c)+seed)%997))
    rest=sorted(cands,key=lambda c:(abs(len(c)-L),(hash(c)+seed)%997))
    out=[]
    if longer: out.append(longer[0])
    for c in rest:
        if c not in out: out.append(c)
        if len(out)==3: break
    return out
S={}
def stems(n,T,tk,clue,a0):
    f4=' '.join(tk[:4]); l4=' '.join(tk[-4:]) if len(tk)>4 else f4; f3=' '.join(tk[:3]); l3=' '.join(tk[-3:]) if len(tk)>3 else f3
    return [
      ["पाठ-%d («%s») का सार क्या है?"%(n,f4), "«%s» (पाठ-%d) की मुख्य बात?"%(l4,n), "सार बताइए — पाठ-%d «%s»?"%(n,f3)],
      ["«%s» (पाठ-%d) की आम ग़लती क्या है?"%(f4,n), "पाठ-%d «%s» में आम ग़लती?"%(n,l4), "आम ग़लती — पाठ-%d («%s»)?"%(n,f3)],
      ["कौन-सी ग़लती «%s» वाले पाठ-%d में बताई गई?"%(l4,n), "पाठ-%d («%s») की एक और ग़लती?"%(n,f4), "दूसरी ग़लती कौन-सी — पाठ-%d «%s»?"%(n,l3)],
      ["«%s» (पाठ-%d) की सुरक्षा-सलाह क्या है?"%(f3,n), "पाठ-%d «%s» — सुरक्षा-पत्रक क्या कहता है?"%(n,l3), "सुरक्षा-सलाह — पाठ-%d («%s»)?"%(n,f4)],
      (["पाठ-%d («%s») में «%s» का क्या मतलब है?"%(n,f3,a0), "«%s» — पाठ-%d में इसका मतलब?"%(a0,n), "पाठ-%d: «%s» यानी?"%(n,a0)] if a0 else
       ["«%s» — किस पाठ की बात?"%clue, "पाठ-%d का शीर्षक क्या है?"%n, "पाठ-%d का नाम बताइए?"%n])
    ]
seen={}
def wins(q):
    w=toks(q); return [' '.join(w[i:i+6]) for i in range(len(w)-5)]
for n,d in sorted(ex.items(), key=lambda x:int(x[0])):
    n=int(n); k=khand(n); T=clean(d['title']); tk=toks(T)
    pk=pools[k]; qs=[]
    def mode(i): return 'A' if (n*5+i)%4==0 else 'B'
    c1=clause(d['mukhya']); w1=pick(c1,pk['m'],gpool['m'],n,mode(0),1)
    g=[clause(x) for x in d['galti']]
    while len(g)<4: g.append(g[-1])
    c2=g[0]; w2=pick(c2,pk['g'],gpool['g'],n,mode(1),3)
    c3=g[2] if g[2]!=g[0] else g[1]; w3=pick(c3,pk['g'],gpool['g'],n,mode(2),5)
    c4=clause(d['suraksha']); w4=pick(c4,pk['s'],gpool['s'],n,mode(3),7)
    a0=None; c5=None; w5=None
    for (h,items) in d.get('lists',[]):
        good=[(a,b) for a,b in items if b and len(b)>=15]
        if len(good)>=4:
            aa,b0=good[0]; cc=clause(b0,110); ws=[]
            for a,b in good[1:]:
                w=clause(b,110)
                if w!=cc and w not in ws: ws.append(w)
            if len(ws)>=3:
                if mode(4)=='A':
                    sh=[w for w in ws if len(w)<len(cc)]
                    if len(sh)>=3: ws=sh
                a0=clean(aa); c5=cc; w5=ws[:3]; break
    clue=clause(d['mukhya'],90)
    if a0 is None:
        c5=T; w5=pick(c5,pk['t'],gpool['t'],n,mode(4),9)
    ST=stems(n,T,tk,clue,a0)
    answers=[(c1,w1),(c2,w2),(c3,w3),(c4,w4),(c5,w5)]
    for i,(c,ws) in enumerate(answers):
        chosen=None
        for cand in ST[i]:
            ww=wins(cand)
            if all(x not in seen for x in ww): chosen=cand; break
        if chosen is None: chosen=ST[i][0]+" (पाठ %d)"%n  # अंतिम बचाव
        for x in wins(chosen): seen[x]=(n,i)
        assert len(ws)==3,(n,i)
        qs.append((chosen,c,ws))
    S[n]=qs
json.dump({str(k):v for k,v in S.items()},open('quiz_src.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
for p in P:
    k=p['no']; lines=['# -*- coding: utf-8 -*-',
     '"""ecom_quiz_k%02d_src.py — ACS ई-कॉमर्स मास्टरी अभ्यास-प्रश्न स्रोत · खंड-%d (पाठ %d-%d)'%(k,k,p['from'],p['to']),
     '   L[पाठ] = [(प्रश्न, सही, ग़लत-1, ग़लत-2, ग़लत-3) × 5] · v1.0 · 18-Aug-2026',
     '   पाठ-सामग्री (मुख्य-बात/आम-ग़लती/सुरक्षा-पत्रक/सूची) से बना; हाथ से सुधार यहीं करें → ecom_quiz_build.py दोबारा चलाएँ']
    if k<=5: lines.append('   ⚠️ खंड-1..5: पाठ-सामग्री लंबित — प्रश्न तभी बनेंगे')
    lines+=['"""','L={}']
    for n in range(p['from'],p['to']+1):
        if n in S:
            lines.append('L[%d]=['%n)
            for q,c,ws in S[n]:
                lines.append('  (%s,%s,%s,%s,%s),'%tuple(json.dumps(x,ensure_ascii=False) for x in [q,c]+ws))
            lines.append(']')
    open('out/generator/quiz_src/ecom_quiz_k%02d_src.py'%k,'w',encoding='utf-8').write('\n'.join(lines)+'\n')
print("ok",len(S))
