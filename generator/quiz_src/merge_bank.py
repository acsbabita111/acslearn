# -*- coding: utf-8 -*-
"""merge_bank.py — 22 dca_quiz shards → functions/dca_bank.js (server-निजी, TWV-रूप)
   चलाना: python3 generator/quiz_src/merge_bank.py <repo-root> <output-path>"""
import json,sys,os
root=sys.argv[1] if len(sys.argv)>1 else '.'
out=sys.argv[2] if len(sys.argv)>2 else 'dca_bank.js'
bank=[]
for k in range(1,23):
    kk='%02d'%k
    js=open(os.path.join(root,'assets/dca_quiz/dca_quiz_k%s.js'%kk),encoding='utf-8').read()
    key='var DCA_QUIZ_K%s = '%kk
    a=js.index(key)+len(key); b=js.index(';\nif (typeof module')
    obj=json.loads(js[a:b])
    for lesson,qs in sorted(obj.items(),key=lambda x:int(x[0])):
        for i,q in enumerate(qs):
            bank.append({"id":"dca-%03d-%d"%(int(lesson),i+1),"ch":k,"t":q["q"],"o":q["o"],"a":q["a"]})
assert len(bank)==2490, len(bank)
hdr=('/* dca_bank.js — DCA-2036 server-निजी प्रश्न-बैंक · v1.0 · 16-Aug-2026\n'
 '   2,490 प्रश्न = 498 पाठ × 5 · 22 खंड (ch = खंड-क्रमांक 1-22) · मशीन-मर्ज /assets/dca_quiz/ shards से\n'
 '   रूप: [{id, ch, t, o:[4], a:0-3}] — twv_bank/msh_bank जैसा · GitHub पर कभी नहीं (office-निजी)\n'
 '   हाथ से सुधार नहीं — स्रोत shard सुधारो, फिर generator/quiz_src/merge_bank.py चलाओ */\n"use strict";\n')
js=hdr+'const DCA_BANK = '+json.dumps(bank,ensure_ascii=False)+';\nmodule.exports = { DCA_BANK: DCA_BANK, BANK: DCA_BANK };\n'
os.makedirs(os.path.dirname(os.path.abspath(out)),exist_ok=True)
open(out,'w',encoding='utf-8').write(js)
print("dca_bank.js:",len(bank),"प्रश्न,",len(js)//1024,"KB →",out)
