# -*- coding: utf-8 -*-
"""ecom_merge_bank.py — 24 ecom_quiz shards → functions/ecom_bank.js (server-निजी, dca_bank-रूप)
   चलाना: python3 generator/quiz_src/ecom_merge_bank.py <repo-root> <output-path>
   ⚠️ output GitHub पर कभी नहीं — office-laptop functions/ में; deploy से पहले चलाओ।
   गिनती: मशीन से (assert नहीं — खंड-1..5 लंबित होने पर 1,265; पूरा होने पर 1,630)"""
import json,sys,os
root=sys.argv[1] if len(sys.argv)>1 else '.'
out=sys.argv[2] if len(sys.argv)>2 else 'ecom_bank.js'
bank=[]; lessons=set()
for k in range(1,25):
    kk='%02d'%k
    p=os.path.join(root,'assets/ecom_quiz/ecom_quiz_k%s.js'%kk)
    if not os.path.exists(p): continue
    js=open(p,encoding='utf-8').read()
    key='var ECOM_QUIZ_K%s = '%kk
    a=js.index(key)+len(key); b=js.index(';\nif (typeof module')
    obj=json.loads(js[a:b])
    for lesson,qs in sorted(obj.items(),key=lambda x:int(x[0])):
        lessons.add(int(lesson))
        for i,q in enumerate(qs):
            bank.append({"id":"ecm-%03d-%d"%(int(lesson),i+1),"ch":k,"t":q["q"],"o":q["o"],"a":q["a"]})
hdr=('/* ecom_bank.js — ACS ई-कॉमर्स मास्टरी (SE009) server-निजी प्रश्न-बैंक · v1.0 · 18-Aug-2026\n'
 '   %d प्रश्न = %d पाठ × 5 · 24 खंड (ch = खंड-क्रमांक 1-24) · मशीन-मर्ज /assets/ecom_quiz/ shards से\n'
 '   रूप: [{id, ch, t, o:[4], a:0-3}] — dca_bank/twv_bank/msh_bank जैसा · GitHub पर कभी नहीं (office-निजी)\n'
 '   हाथ से सुधार नहीं — स्रोत shard सुधारो, फिर generator/quiz_src/ecom_merge_bank.py चलाओ\n'
 '   परीक्षा: startCourseExam हर बार इस बैंक से 120 बेतरतीब चुने (pass 60%%, 10 चांस) */\n"use strict";\n')%(len(bank),len(lessons))
js=hdr+'const ECOM_BANK = '+json.dumps(bank,ensure_ascii=False)+';\nmodule.exports = { ECOM_BANK: ECOM_BANK, BANK: ECOM_BANK };\n'
os.makedirs(os.path.dirname(os.path.abspath(out)),exist_ok=True)
open(out,'w',encoding='utf-8').write(js)
print("ecom_bank.js:",len(bank),"प्रश्न,",len(lessons),"पाठ,",len(js)//1024,"KB →",out)
