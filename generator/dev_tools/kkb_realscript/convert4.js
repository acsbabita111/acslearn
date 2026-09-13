const fs=require('fs');const R=require('/home/claude/work/realscript.js');
const META={si:{script:'sinhala',tts:'si-LK',rtl:false,l1script:'sinhala'},ps:{script:'perso-arabic',tts:'ps-AF',rtl:true,l1script:'perso-arabic-native'},bal:{script:'perso-arabic',tts:'bal',rtl:true,l1script:'perso-arabic-native'},prs:{script:'perso-arabic',tts:'prs-AF',rtl:true,l1script:'perso-arabic-native'}};
for(const c of Object.keys(META)){
  for(const lvl of ['1','2']){
    const f=lvl==='1'?`assets/kkb_${c}_data.js`:`assets/kkb2_${c}_data.js`; const key=lvl==='1'?'KKB_DATA':'KKB2_DATA';
    const s=fs.readFileSync(f,'utf8'); const m=s.match(new RegExp('^window\\.'+key+'\\s*=\\s*','m')); const i=m.index; global.window={}; eval(s.slice(i)); const D=window[key];
    if(!D){console.log('⛔ load fail',f);process.exit(1);}
    const n=R.convertData(D,c,lvl==='2');
    D.lang.script=lvl==='1'?META[c].l1script:META[c].script; D.lang.tts=META[c].tts; D.lang.sr=META[c].tts; if(META[c].rtl)D.lang.rtl=true; else delete D.lang.rtl;
    let head=s.slice(0,i);
    if(lvl==='2') head=head.replace(/item\[0\]=देवनागरी \(⚠️ अस्थायी[^)]*\)/,'item[0]='+META[c].script+' असली लिपि (13-Sep: मशीन-लिप्यंतरण देवनागरी-उच्चारण से — hand-शब्दकोश + fa/ur-सीखा शब्दकोश + नियम; native-speaker पुष्टि आवश्यक)'+(META[c].rtl?' · RTL':''));
    else head=head.replace(/it\[0\]=[^,]*,/,'it[0]='+META[c].l1script+' असली लिपि (13-Sep: मशीन-लिप्यंतरण, native-speaker पुष्टि आवश्यक),');
    fs.writeFileSync(f,head+'window.'+key+'='+JSON.stringify(D)+';\n');
    console.log(c,'L'+lvl,'strings converted:',n,'| lang:',JSON.stringify(D.lang));
  }
  const st=R.STATS[c];const rw=Object.entries(st.ruleWords).sort((a,b)=>b[1]-a[1]);
  console.log('  stats hand',st.hand,'learned',st.learned,'rule',st.rule,'('+(100*st.rule/(st.hand+st.learned+st.rule)).toFixed(1)+'%) | unique rule-words',rw.length,'| top:',rw.slice(0,25).map(([w,n])=>w+'→'+R.convToken(w,c)+'('+n+')').join(' '));
}
