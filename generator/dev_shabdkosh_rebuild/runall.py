import json, subprocess, sys, importlib
sys.path.insert(0,'/tmp')
import extract_kosh as EK
ct=json.load(open('/tmp/course_tokens.json'))
import os
NOSPACE={'japanese','mandarin','thai','tibetan','khmer','lao','burmese','minnan','cantonese'}
slugs=sorted(x[:-len('-shabdkosh.pdf')] for x in os.listdir('skpdf') if x.endswith('.pdf'))
rows=[]; allres={}
for s in slugs:
    if s in NOSPACE:
        rows.append((s,'tw-only',0,0,0)); continue
    try:
        pairs,res,need,cov=EK.run(f'skpdf/{s}-shabdkosh.pdf',s,ct)
        rows.append((s,'ok',len(need),cov,len(need)-cov)); allres[s]=res
    except Exception as e:
        rows.append((s,'ERR:'+str(e)[:40],0,0,-1))
json.dump(allres,open('/tmp/all_kosh.json','w'),ensure_ascii=False)
z=[r for r in rows if r[1]=='ok' and r[4]==0]
nz=[r for r in rows if r[1]=='ok' and r[4]>0]
er=[r for r in rows if r[1].startswith('ERR')]
ns=[r for r in rows if r[1]=='tw-only']
print(f"कुल {len(rows)} | शून्य-बाक़ी {len(z)} | बाक़ी>0 {len(nz)} | tw-only {len(ns)} | त्रुटि {len(er)}")
print("--- बाक़ी>0 ---")
for s,_,need,cov,left in sorted(nz,key=lambda r:-r[4]): print(f"{s}: {left}/{need}")
for r in er: print(r[0],r[1])
tot=sum(r[3] for r in rows if r[1]=='ok'); totn=sum(r[2] for r in rows if r[1]=='ok')
print(f"कुल अर्थ निकले: {tot}/{totn}")
