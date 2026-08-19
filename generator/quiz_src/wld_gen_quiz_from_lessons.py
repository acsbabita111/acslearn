import json,re
ex=json.load(open('/home/claude/ecomrepo/wld/extract.json',encoding='utf-8'))
P=[{'no':1,'from':1,'to':20},{'no':2,'from':21,'to':50},{'no':3,'from':51,'to':80},{'no':4,'from':81,'to':140}]
def khand(n):
    for p in P:
        if p['from']<=n<=p['to']: return p['no']
def clean(t): return re.sub(r'\s+',' ',t.replace('[','(').replace(']',')')).strip().rstrip('।').strip()
def fixparen(t):
    while t.count('(')>t.count(')'):
        i=t.rfind('('); t=t[:i].strip().rstrip(',—–-;:').strip()
    return t
def clause(t,mx=130):
    t=clean(t)
    if len(t)>mx:
        cut=None
        for sep in [' — ',' – ','; ',', ',' · ']:
            i=t.find(sep,45)
            if 45<=i<=mx: cut=t[:i].strip(); break
        if cut is None:
            c=t[:mx]; j=c.rfind(' '); cut=c[:j].strip() if j>40 else c
        t=cut
    return fixparen(t)
def toks(t): return [w for w in re.sub(r'[()?"\',.—–«»:-]',' ',t).split() if w]
pools={}
for n,d in ex.items():
    k=khand(int(n)); pools.setdefault(k,{'g':[],'s':[],'m':[],'t':[],'z':[]})
    for g in d['galti']: pools[k]['g'].append((int(n),clause(g)))
    pools[k]['s'].append((int(n),clause(d['suraksha'])))
    pools[k]['m'].append((int(n),clause(d['saar'] or d['mukhya'])))
    pools[k]['t'].append((int(n),clean(d['title'])))
    for z in d['tez']: pools[k]['z'].append((int(n),clause(z,110)))
gp={'g':[],'s':[],'m':[],'t':[],'z':[]}
for k in pools:
    for key in gp: gp[key]+=pools[k][key]
def pick(correct,pool,g,n_self,mode,seed):
    cands=[]; seen={correct}
    for m,c in pool+g:
        if m!=n_self and c not in seen and len(c)>=10: seen.add(c); cands.append(c)
    L=len(correct)
    if mode=='A':
        short=[c for c in cands if len(c)<L]; short.sort(key=lambda c:(L-len(c),(hash(c)+seed)%997))
        if len(short)>=3: return short[:3]
    longer=[c for c in cands if len(c)>L]; longer.sort(key=lambda c:(len(c)-L,(hash(c)+seed)%997))
    rest=sorted(cands,key=lambda c:(abs(len(c)-L),(hash(c)+seed)%997))
    out=[]
    if longer: out.append(longer[0])
    for c in rest:
        if c not in out: out.append(c)
        if len(out)==3: break
    return out
seen={}
def wins(q):
    w=toks(q); return [' '.join(w[i:i+6]) for i in range(len(w)-5)]
def stems(n,tk):
    f4=' '.join(tk[:4]); l4=' '.join(tk[-4:]) if len(tk)>4 else f4; f3=' '.join(tk[:3]); l3=' '.join(tk[-3:]) if len(tk)>3 else f3
    return [
     ["पाठ-%d («%s») का सार क्या है?"%(n,f4),"«%s» (पाठ-%d) की मुख्य बात?"%(l4,n),"सार बताइए — पाठ-%d «%s»?"%(n,f3)],
     ["«%s» (पाठ-%d) की आम ग़लती क्या है?"%(f4,n),"पाठ-%d «%s» में आम ग़लती?"%(n,l4),"आम ग़लती — पाठ-%d («%s»)?"%(n,f3)],
     ["कौन-सी ग़लती «%s» वाले पाठ-%d में बताई गई?"%(l4,n),"पाठ-%d («%s») की एक और ग़लती?"%(n,f4),"दूसरी ग़लती कौन-सी — पाठ-%d «%s»?"%(n,l3)],
     ["«%s» (पाठ-%d) की सावधानी क्या है?"%(f3,n),"पाठ-%d «%s» — सावधानियाँ क्या कहती हैं?"%(n,l3),"सावधानी — पाठ-%d («%s»)?"%(n,f4)],
     ["तेज़-दोहराव: पाठ-%d («%s») का एक सूत्र?"%(n,f3),"पाठ-%d का दोहराव-सूत्र कौन-सा है?"%n,"«%s» (पाठ-%d) — दोहराव में क्या है?"%(l3,n)]]
S={}
for n,d in sorted(ex.items(),key=lambda x:int(x[0])):
    n=int(n); k=khand(n); tk=toks(d['title']); pk=pools[k]
    mode=lambda i:'A' if (n*5+i)%4==0 else 'B'
    g=[clause(x) for x in d['galti']]
    while len(g)<3: g.append(g[-1])
    z=[clause(x,110) for x in d['tez'] if len(clause(x,110))>=15]
    answers=[(clause(d['saar'] or d['mukhya']),pick(clause(d['saar'] or d['mukhya']),pk['m'],gp['m'],n,mode(0),1)),
             (g[0],pick(g[0],pk['g'],gp['g'],n,mode(1),3)),
             (g[2] if g[2]!=g[0] else g[1],pick(g[2] if g[2]!=g[0] else g[1],pk['g'],gp['g'],n,mode(2),5)),
             (clause(d['suraksha']),pick(clause(d['suraksha']),pk['s'],gp['s'],n,mode(3),7)),
             (z[0],pick(z[0],pk['z'],gp['z'],n,mode(4),9))]
    ST=stems(n,tk); qs=[]
    for i,(c,ws) in enumerate(answers):
        chosen=None
        for cand in ST[i]:
            if all(x not in seen for x in wins(cand)): chosen=cand; break
        if chosen is None: chosen=ST[i][0]+" (पाठ %d)"%n
        for x in wins(chosen): seen[x]=(n,i)
        assert len(ws)==3,(n,i,ws)
        qs.append((chosen,c,ws))
    S[n]=qs
json.dump({str(k):v for k,v in S.items()},open('/home/claude/ecomrepo/wld/quiz_src.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
print("ok",len(S)); print(json.dumps(S[25],ensure_ascii=False,indent=1)[:1600])
