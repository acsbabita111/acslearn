# -*- coding: utf-8 -*-
"""quiz_build.py — स्रोत (प्रश्न,सही,ग़लत×3) → assets/dca_quiz/dca_quiz_kNN.js (मशरूम-रूप q/o/a)
   सही का स्थान निर्धारित घुमाव से; लंबाई-पक्षपात दर्ज; जाँच dev_dca_quiz_check.js से।"""
import json,sys,importlib.util,re
PARTS=[(1,25),(26,50),(51,75),(76,105),(106,130),(131,161),(162,193),(194,213),(214,243),(244,263),(264,288),(289,313),(314,333),(334,348),(349,368),(369,388),(389,408),(409,428),(429,438),(439,458),(459,468),(469,498)]
TAILS=["— जैसा कई लोग मानते हैं","— यह बात अक्सर सुनने को मिलती है","— पुराने ज़माने में यही चलन था","— जैसा कुछ दुकानदार बताते हैं","— यह धारणा गाँव में आम है","— और यही ज़्यादातर लोग समझते हैं","— ऐसा बहुत लोग सोचते हैं","— यह पहली नज़र में सही लगता है","— जैसा विज्ञापन में दिखता है","— यह बात कई बार दोहराई जाती है","— और इसमें कोई शक नहीं होना चाहिए","— यही सबसे आसान रास्ता भी लगता है","— जैसा पड़ोसी अक्सर सलाह देते हैं","— यह तरीक़ा कई जगह अपनाया जाता है"]
def balance(n,i,c,ws):
    """सही अकेला-सबसे-लंबा हो तो किसी ग़लत को पूँछ देकर लंबा करो (लक्ष्य ~25%);
       साथ में कुछ सही उत्तरों पर भी पूँछ (पैटर्न-रोक)। निर्धारित (न्यूनतम बेतरतीबी नहीं)।"""
    h=(n*7+i*3)
    lens=[len(x) for x in ws]
    if len(c)>max(lens):
        if h%4!=0:   # 75% में सुधार → ~25% रह जाएँ
            j=lens.index(max(lens)); t=TAILS[h%len(TAILS)]
            ws[j]=ws[j]+" "+t
            if len(ws[j])<=len(c): ws[j]=ws[j]+" "+TAILS[(h+5)%len(TAILS)]
            if len(ws[j])<=len(c): ws[j]=ws[j]+" "+TAILS[(h+9)%len(TAILS)]
    else:
        if h%5==0: c=c+" "+TAILS[(h+2)%len(TAILS)]   # पूँछ सही पर भी
    return c,ws
def load(path):
    spec=importlib.util.spec_from_file_location("m",path); m=importlib.util.module_from_spec(spec); spec.loader.exec_module(m); return m.L
def build(k, srcs, out):
    L={}
    for p in srcs: L.update(load(p))
    a,b=PARTS[k-1]
    bank={}
    seq=[0,2,1,3,3,1,0,2,2,3,1,0,1,0,3,2]
    fails=[]
    for n in range(a,b+1):
        items=L.get(n)
        if not items: fails.append("पाठ-%d ग़ायब"%n); continue
        if len(items)!=5: fails.append("पाठ-%d में %d प्रश्न"%(n,len(items)))
        qs=[]
        for i,(q,c,w1,w2,w3) in enumerate(items):
            pos=seq[(n*5+i)%len(seq)]
            c,ws=balance(n,i,c,[w1,w2,w3])
            opts=list(ws); opts.insert(pos,c)
            qs.append({"q":q,"o":opts,"a":pos})
        bank[str(n)]=qs
    if fails: print("\n".join(fails)); 
    kk="%02d"%k
    js=('/* dca_quiz_k%s.js — DCA-2036 अभ्यास-प्रश्न · खंड-%d (पाठ %d-%d)\n'
        '   v1.0 · 16-Aug-2026 · हर पाठ 5 प्रश्न × 4 विकल्प · a = सही-क्रमांक (0-3)\n'
        '   मशरूम-रूप (msh_quiz) · लंबाई-संतुलन व स्थान-बँटवारा जन्म से (v5.2 सीख)\n'
        '   जाँच: node generator/dev_dca_quiz_check.js · गिनती मशीन से देखें */\n'
        '"use strict";\nvar DCA_QUIZ_K%s = %s;\n'
        'if (typeof module !== "undefined") module.exports = { DCA_QUIZ: DCA_QUIZ_K%s };\n')%(kk,k,a,b,kk,json.dumps(bank,ensure_ascii=False),kk)
    open(out,'w',encoding='utf-8').write(js)
    return bank
if __name__=="__main__":
    k=int(sys.argv[1]); srcs=sys.argv[2:]
    build(k,srcs,"/home/claude/work/repo/assets/dca_quiz/dca_quiz_k%02d.js"%k)
    print("built k%02d"%k)
