# -*- coding: utf-8 -*-
"""Manding (ज्युला/बमबारा) Latin → देवनागरी उच्चारण। नियम पिछले dyu-डेटा की शैली से: ɔ→ॉ ɛ→ॅ, aa→ाअ, ɲ→न्य, ng→ङ्ग"""
import re,unicodedata
IND={'a':'अ','e':'ए','ɛ':'ऍ','i':'इ','o':'ओ','ɔ':'ऑ','u':'उ'}
MAT={'a':'ा','e':'े','ɛ':'ॅ','i':'ी','o':'ो','ɔ':'ॉ','u':'ू'}
CON={'b':'ब','c':'च','d':'द','f':'फ़','g':'ग','h':'ह','j':'ज','k':'क','l':'ल','m':'म','n':'न','p':'प','r':'र','s':'स','t':'त','v':'व','w':'व','y':'य','z':'ज़','ɲ':'न्य','ŋ':'ङ'}
VOW=set(IND)
H='्'
ACR={'UPI':'यूपीआई','ATM':'एटीएम','PIN':'पिन','SIM':'सिम','AC':'एसी','CFA':'सीएफ़ए','AI':'एआई','OTP':'ओटीपी','PNR':'पीएनआर','IMEI':'आईएमईआई'}
def word(w):
    if w in ACR: return ACR[w]
    w=unicodedata.normalize('NFC',w.lower())
    out=[];i=0;n=len(w);prev_cons=False;prev_vow=False
    # apostrophe: x'V -> merge (consonant + vowel)
    w=w.replace("’","").replace("'","")
    return _core(w)
def _core(w,start=True):
    out=[];i=0;n=len(w);last='none'   # none | cons(open: needs vowel/halant) | vow
    def put_cons(s,nxt_is_vowel):
        return s
    toks=[]
    while i<n:
        c=w[i]
        two=w[i:i+2]
        if two in('gb','kp','ny','sh') :
            toks.append(('C',{'gb':'ग्ब','kp':'क्प','ny':'न्य','sh':'श'}[two]));i+=2;continue
        if c=='n' and i+1<n and w[i+1]=='g' and i+2<n and w[i+2] in VOW:
            toks.append(('C','ङ्ग'));i+=2;continue
        if c in CON: toks.append(('C',CON[c]));i+=1;continue
        if c in VOW: toks.append(('V',c));i+=1;continue
        toks.append(('X',c));i+=1
    res='';k=0
    for idx,(t,v) in enumerate(toks):
        nxt=toks[idx+1] if idx+1<len(toks) else None
        if t=='C':
            res+=v
            if nxt and nxt[0]=='C':
                res+=H
            elif nxt is None and False:
                pass
            # word-final consonant keeps inherent vowel; lone n (no vowel anywhere) -> halant
            if nxt is None and len(toks)==1: res+=H
        elif t=='V':
            prev=toks[idx-1] if idx>0 else None
            if prev and prev[0]=='C': res+=MAT[v]
            elif prev and prev[0]=='V': res+=IND[v]
            else: res+=IND[v]
        else: res+=v
    return res
def sentence(s):
    s=s.replace('...','…')
    out=[];buf=''
    toks=re.split(r"(\s+|[.,!?;:()—-]|___)",s)
    for t in toks:
        if t is None or t=='' : continue
        if t.isspace(): out.append(' ');continue
        if t=='.': out.append('।');continue
        if t in ',!?;:()—-' : out.append(t);continue
        if t=='___': out.append('___');continue
        if re.fullmatch(r'[0-9]+',t): out.append(t);continue
        out.append(word(t))
    r=''.join(out)
    r=re.sub(r' +([,!?।])',r'\1',r)
    return r
if __name__=='__main__':
    for s in ["N bɛ Ɛndikan fɔ.","I bɔra yɔrɔ jumɛn na?","N nisɔndiyara k'i ye.","Kɔngɔ bɛ n na.","Nin sɔngɔ ye joli ye?","N ye sɔfɛri ye.","A fɔ dɔɔni dɔɔni.","Minnɔgɔ bɛ n na.","Aw ni sɔgɔma."]:
        print(s,'→',sentence(s))
