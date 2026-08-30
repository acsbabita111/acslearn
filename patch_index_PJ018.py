# office-laptop: functions/index.js में PJ018-बैंक जोड़ना (एक पंक्ति)
# चलाना: functions/ के बग़ल (parent) फ़ोल्डर से — python patch_index_PJ018.py
import io,sys
p='functions/index.js'
s=io.open(p,encoding='utf-8').read()
if "eng_bank" in s: print("पहले से जुड़ा है — कुछ नहीं बदला।"); sys.exit(0)
cands=['SE023: require("./msh_bank.js")',"SE023: require('./msh_bank.js')",
       'SE023: require("./msh_bank")',"SE023: require('./msh_bank')"]
hit=[c for c in cands if s.count(c)==1]
if len(hit)!=1:
    print("⛔ SE023-पंक्ति नहीं मिली/एक-से-ज़्यादा। यह चलाकर नतीजा chatroom में भेजें:")
    print('   findstr /n "msh_bank SE023 BANKS" functions\\index.js')
    sys.exit(1)
o=hit[0]; n=o+o.replace('SE023','PJ018').replace('msh_bank','eng_bank').join(['',''])
n=o+", PJ018: require('./eng_bank.js')" if "'" in o else o+', PJ018: require("./eng_bank.js")'
s=s.replace(o,n,1)
io.open(p,'w',encoding='utf-8').write(s)
print("✅ PJ018: eng_bank जुड़ा — अब node --check functions/index.js फिर deploy।")
