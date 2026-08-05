// dev_twv_quiz_check.js v1.0 — टू-व्हीलर पाठ-प्रश्न भंडार की मशीन-जाँच
// चलाओ: repo-रूट से `node generator/dev_twv_quiz_check.js`
// जाँचें: (1) shard के अध्याय की हर disk-फ़ाइल की entry हो और entry की फ़ाइल disk पर हो
// (2) हर पाठ = ठीक 5 प्रश्न (3) हर प्रश्न: q भरा, 4 अलग-अलग विकल्प, a 0-3
// (4) बैंक-भर 6-शब्द खिड़की-दोहराव शून्य (5) चौकोर-कोष्ठक निषेध (6) a-फैलाव रिपोर्ट
var fs=require('fs'), path=require('path');
var QD='assets/twv_quiz', LD='courses/hi/two-wheeler';
var ok=true; function bad(m){ console.log('⛔ '+m); ok=false; }
global.window={};
var shards=fs.readdirSync(QD).filter(function(f){return /^twvq_ch[0-9a-z]+\.js$/.test(f);}).sort();
if(!shards.length) bad('कोई shard नहीं मिला');
shards.forEach(function(f){ try{ eval(fs.readFileSync(path.join(QD,f),'utf8')); }catch(e){ bad(f+' चलाने में त्रुटि: '+e.message); } });
var bank=global.window.TWV_QUIZ||{};
var total=0, aCnt=[0,0,0,0], winMap={}, dup=[];
function words(t){ return String(t).replace(/[^\u0900-\u097F0-9A-Za-z ]/g,' ').split(/\s+/).filter(Boolean); }
Object.keys(bank).sort().forEach(function(chKey){
  var pre=chKey.replace('ch',''); var qz=bank[chKey];
  var disk=fs.readdirSync(LD).filter(function(x){ return x.indexOf('twv-'+pre+'-')===0 && x!=='index.html'; });
  var chTot=0;
  disk.forEach(function(fn){ if(!qz[fn]) bad(chKey+': disk-फ़ाइल की entry नहीं — '+fn); });
  Object.keys(qz).forEach(function(fn){
    if(disk.indexOf(fn)===-1) bad(chKey+': entry की फ़ाइल disk पर नहीं — '+fn);
    var qs=qz[fn];
    if(!qs || qs.length!==5){ bad(chKey+'/'+fn+': प्रश्न '+(qs?qs.length:0)+' (चाहिए ठीक 5)'); return; }
    qs.forEach(function(it,qi){
      var tag=chKey+'/'+fn+' Q'+(qi+1);
      if(!it.q || !String(it.q).trim()) bad(tag+': q ख़ाली');
      if(!it.o || it.o.length!==4) bad(tag+': विकल्प '+(it.o?it.o.length:0)+' (चाहिए 4)');
      else{
        var seen={}; it.o.forEach(function(o){ if(seen[o]) bad(tag+': विकल्प दोहराया — '+o); seen[o]=1; });
      }
      if(typeof it.a!=='number' || it.a<0 || it.a>3) bad(tag+': a ग़लत ('+it.a+')');
      else aCnt[it.a]++;
      var all=[it.q].concat(it.o||[]).join(' ');
      if(/[\[\]]/.test(all)) bad(tag+': चौकोर-कोष्ठक मिला');
      var w=words(it.q);
      for(var i=0;i+6<=w.length;i++){
        var key=w.slice(i,i+6).join(' ');
        if(winMap[key] && winMap[key]!==tag){ dup.push(key+' ('+winMap[key]+' ↔ '+tag+')'); }
        winMap[key]=tag;
      }
      total++; chTot++;
    });
  });
  console.log('  '+chKey+': '+Object.keys(qz).length+' पाठ · '+chTot+' प्रश्न'+(disk.length===Object.keys(qz).length?' ✅':''));
});
if(dup.length){ bad('6-शब्द खिड़की-दोहराव: '+dup.length); dup.slice(0,5).forEach(function(d){console.log('   '+d);}); }
else console.log('मौलिकता (प्रश्न-पाठ 6-शब्द): शून्य-दोहराव ✅');
console.log('a-फैलाव: 0→'+aCnt[0]+' | 1→'+aCnt[1]+' | 2→'+aCnt[2]+' | 3→'+aCnt[3]);
var mx=Math.max.apply(null,aCnt);
if(total && mx>total*0.45) bad('a-फैलाव बिगड़ा — एक ही स्थान पर '+mx+'/'+total+' (>45%): विकल्प घुमाओ');
console.log('कुल प्रश्न: '+total+' | लक्ष्य-रेखा: 466×5 = 2330');
console.log(ok?'\n🏁 quiz-भंडार जाँच पास':'\n⛔ FAIL');
process.exit(ok?0:1);
