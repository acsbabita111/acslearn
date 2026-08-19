# -*- coding: utf-8 -*-
"""wld_merge_bank.py — 24 wld_quiz shards → functions/wld_bank.js (server-निजी, dca_bank-रूप)
   चलाना: python3 generator/quiz_src/wld_merge_bank.py <repo-root> <output-path>
   ⚠️ output GitHub पर कभी नहीं — office-laptop functions/ में; deploy से पहले चलाओ।
   गिनती: मशीन से (assert नहीं — अभी 100 पाठ = 500; 300 पाठ पर 1,500)"""
import json,sys,os
root=sys.argv[1] if len(sys.argv)>1 else '.'
out=sys.argv[2] if len(sys.argv)>2 else 'wld_bank.js'
bank=[]; lessons=set()
for k in range(1,9):
    kk='%02d'%k
    p=os.path.join(root,'assets/wld_quiz/wld_quiz_k%s.js'%kk)
    if not os.path.exists(p): continue
    js=open(p,encoding='utf-8').read()
    key='var WLD_QUIZ_K%s = '%kk
    a=js.index(key)+len(key); b=js.index(';\nif (typeof module')
    obj=json.loads(js[a:b])
    for lesson,qs in sorted(obj.items(),key=lambda x:int(x[0])):
        lessons.add(int(lesson))
        for i,q in enumerate(qs):
            bank.append({"id":"wld-%03d-%d"%(int(lesson),i+1),"ch":k,"t":q["q"],"o":q["o"],"a":q["a"]})
hdr=('/* wld_bank.js — ACS वेल्डिंग व्यवसाय (SE021) server-निजी प्रश्न-बैंक · v1.0 · 18-Aug-2026\n'
 '   %d प्रश्न = %d पाठ × 5 · हिस्से (ch = हिस्सा-क्रमांक) · मशीन-मर्ज /assets/wld_quiz/ shards से\n'
 '   रूप: [{id, ch, t, o:[4], a:0-3}] — dca/twv/msh/ecom जैसा · GitHub पर कभी नहीं (office-निजी)\n'
 '   हाथ से सुधार नहीं — स्रोत shard सुधारो, फिर generator/quiz_src/wld_merge_bank.py चलाओ\n'
 '   परीक्षा: startCourseExam हर बार इस बैंक से 120 बेतरतीब चुने (pass 60%%, 10 चांस) */\n"use strict";\n')%(len(bank),len(lessons))
js=hdr+'const WLD_BANK = '+json.dumps(bank,ensure_ascii=False)+';\n/* export = सीधा array (index.js का BANKS_BY_COURSE bankArr.map चलाता है) + .BANK/.WLD_BANK props */\nmodule.exports = WLD_BANK; module.exports.BANK = WLD_BANK; module.exports.WLD_BANK = WLD_BANK;\n'
os.makedirs(os.path.dirname(os.path.abspath(out)),exist_ok=True)
open(out,'w',encoding='utf-8').write(js)
print("wld_bank.js:",len(bank),"प्रश्न,",len(lessons),"पाठ,",len(js)//1024,"KB →",out)
