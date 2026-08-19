import json,re
W=json.load(open('/home/claude/ecomrepo/wld.json',encoding='utf-8'))
def txt(h):
    h=re.sub(r'<svg[\s\S]*?</svg>','',h); h=re.sub(r'<br\s*/?>','\n',h); h=re.sub(r'</p>|</li>','\n',h); h=re.sub(r'<[^>]+>','',h)
    h=h.replace('&nbsp;',' ').replace('&amp;','&').replace('&lt;','<').replace('&gt;','>').replace('&quot;','"')
    return re.sub(r'[ \t]+',' ',h).strip()
def clean(t):
    t=t.replace('[','(').replace(']',')'); t=re.sub(r'\s+',' ',t).strip().rstrip('।').strip(); return t
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
def items(h):
    t=txt(h)
    parts=[x.strip() for x in re.split(r'\(\d+\)\s*',t) if x.strip()]
    if len(parts)>=3: return [clean(re.split(r'।\s',p)[0]) for p in parts if len(p)>15]
    lines=[l.strip() for l in t.split('\n') if len(l.strip())>15]
    return [clean(re.split(r'।\s',l)[0]) for l in lines]
ex={}
for n,x in W.items():
    d={'title':clean(x['title']),'mukhya':'','galti':[],'suraksha':'','tez':[],'saar':''}
    for s in x['secs']:
        t=s['t']; body=txt(s['h']); first=next((l for l in body.split('\n') if l.strip()),body)
        if t.startswith('मुख्य बात'): d['mukhya']=clean(re.split(r'।\s',first)[0])
        elif t.startswith('आम गलतियाँ'): d['galti']=items(s['h'])
        elif t.startswith('सावधानियाँ'): d['suraksha']=clean(re.split(r'।\s',first)[0])
        elif t.startswith('तेज़ दोहराव'): d['tez']=[clean(p) for p in re.split(r'\s[•·]\s',body) if len(clean(p))>=15]
        elif t.startswith('पाठ का सार'): d['saar']=clean(re.split(r'।\s',body)[0])
    ex[n]=d
json.dump(ex,open('/home/claude/ecomrepo/wld/extract.json','w',encoding='utf-8'),ensure_ascii=False,indent=1)
bad=[n for n,d in ex.items() if len(d['galti'])<2 or not d['suraksha'] or len(d['tez'])<2 or not d['mukhya']]
print(len(ex),"कमज़ोर:",bad[:20])
print(json.dumps(ex['25'],ensure_ascii=False)[:1000])
