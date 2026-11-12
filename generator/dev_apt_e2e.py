# generator/dev_apt_e2e.py — v1.0 (12-Nov-2026): असली Chromium (Playwright) में पूरी 120-प्रश्न परीक्षा, मोबाइल 390×844।
# English तीनों आयु-पट्टी + हिंदी एक; JS त्रुटि 0, भीतरी 4xx 0, English पन्ने पर देवनागरी 0, हिंदी पन्ना English फ़ाइल न माँगे।
# चलाना: python3 generator/dev_apt_e2e.py  (Playwright + Chromium चाहिए; CHADHAO.bat के gates में नहीं है)। कथा की 30-सेकंड रोक जाँच में तेज़ की जाती है।
import sys, json, re, subprocess, time, os
from playwright.sync_api import sync_playwright
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); PORT=8765; OUT=os.environ.get('APT_E2E_OUT','/tmp/e2e'); os.makedirs(OUT,exist_ok=True); DEV=re.compile(r'[\u0900-\u097F]')
srv=subprocess.Popen([sys.executable,'-m','http.server',str(PORT),'--bind','127.0.0.1'],cwd=ROOT,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL); time.sleep(1.2)
INIT="""
try{ localStorage.setItem('acs_apt_gate_v1', JSON.stringify({until: Date.now()+86400000, role:'jobseeker'})); }catch(e){}
(function(){ var _si=window.setInterval; window.setInterval=function(fn,ms){ var a=[].slice.call(arguments,2); return _si.apply(window,[fn, ms===1000?25:ms].concat(a)); }; })();
"""
def journey(pw, path, yob_age, shots=None):
    b=pw.chromium.launch(); ctx=b.new_context(viewport={'width':390,'height':844},device_scale_factor=2,locale='en-IN'); ctx.add_init_script(INIT)
    pg=ctx.new_page(); errs=[]; reqs=[]; bad=[]
    pg.on('pageerror',lambda e: errs.append(str(e)[:160])); pg.on('dialog',lambda d: d.accept())
    def route(r):
        u=r.request.url
        if u.startswith('http://127.0.0.1'): reqs.append(u.replace('http://127.0.0.1:%d'%PORT,'')); r.continue_()
        else: r.abort()
    pg.route('**/*',route)
    pg.on('response',lambda r: bad.append((r.status,r.url)) if r.url.startswith('http://127.0.0.1') and r.status>=400 else None)
    pg.goto('http://127.0.0.1:%d%s#apt-full'%(PORT,path),wait_until='domcontentloaded'); pg.wait_for_selector('#apt-go',timeout=20000)
    texts=[pg.inner_text('#apt-sess-box')]
    if shots: pg.screenshot(path=shots+'-1-start.png')
    yr=pg.evaluate("new Date().getFullYear()")-yob_age
    pg.select_option('#apt-yob',str(yr)); pg.click('#apt-go')
    steps=0; shot_q=False
    while steps<1500:
        steps+=1
        pg.wait_for_function("()=>{var b=document.getElementById('apt-sess-box'); return b && (b.querySelector('#apt-lock')||b.querySelector('#apt-next')||b.querySelector('#apt-skiporgo')||b.querySelector('#apt-retry'));}",timeout=30000)
        st=pg.evaluate("""()=>{var b=document.getElementById('apt-sess-box'); if(b.querySelector('#apt-lock')) return 'lock'; if(b.querySelector('#apt-retry')) return 'retry'; var n=b.querySelector('#apt-next'); if(n) return n.disabled?'wait':'next'; return 'q';}""")
        if st=='lock': break
        if st=='retry': raise Exception('प्रश्न-फ़ाइल नहीं उतरी (retry कार्ड)')
        if st=='wait': texts.append(pg.inner_text('#apt-sess-box')); pg.wait_for_function("()=>{var n=document.getElementById('apt-next'); return !n||!n.disabled;}",timeout=20000); continue
        if st=='next': pg.click('#apt-next'); continue
        texts.append(pg.inner_text('#apt-sess-box'))
        if shots and not shot_q and steps>6: pg.screenshot(path=shots+'-2-question.png'); shot_q=True
        prog=pg.inner_text('.apt-prog')
        kind=pg.evaluate("()=>{var b=document.getElementById('apt-sess-box'); if(b.querySelector('[data-v11]')) return 'scale'; return b.querySelectorAll('.apt-opt').length? (b.querySelector('.apt-hint')&&b.querySelectorAll('.apt-opt').length>2?'opts':'opts') : 'none';}")
        if kind=='scale': pg.locator('[data-v11]').nth(2 if steps%3 else 0).click()
        elif kind=='opts':
            n=pg.locator('.apt-opt').count(); pg.locator('.apt-opt').nth(0).click()
            if pg.locator('.apt-prog').count() and pg.inner_text('.apt-prog')==prog and pg.locator('.apt-opt').count()>1: pg.locator('.apt-opt').nth(pg.locator('.apt-opt').count()-1).click()
        else: raise Exception('प्रश्न में कोई बटन नहीं')
        try:
            if pg.locator('.apt-prog').count() and pg.inner_text('.apt-prog')==prog and pg.locator('#apt-skiporgo').count(): pg.click('#apt-skiporgo')
        except Exception: pass
    texts.append(pg.inner_text('#apt-sess-box'))
    got=pg.evaluate("()=>Object.keys(JSON.parse(localStorage.getItem('acs_apt_sess_v1')).cur.ans).length")
    pg.click('#apt-lock'); pg.wait_for_selector('#apt-again',timeout=30000); res=pg.inner_text('#apt-sess-box'); texts.append(res)
    if shots: pg.screenshot(path=shots+'-3-result.png',full_page=False)
    body=pg.inner_text('body'); b.close()
    return dict(got=got,steps=steps,errs=errs,reqs=reqs,bad=bad,texts=texts,res=res,body=body)
out=[]; ok=True
try:
    with sync_playwright() as pw:
        for path,lang in [('/en/aptitude-test.html','en'),('/aptitude-test.html','hi')]:
            for age,band in [(11,'10-13'),(15,'14-17'),(30,'18+')]:
                if lang=='hi' and band!='14-17': continue
                r=journey(pw,path,age,OUT+'/'+lang+'-'+band if (band=='14-17') else None)
                leak=[t for t in r['texts'] if DEV.search(t)] if lang=='en' else []
                en_sets=[u for u in r['reqs'] if '/assets/apt_sets_en/' in u]; en_any=[u for u in r['reqs'] if '_en' in u.split('/')[-1] or '/apt_sets_en/' in u]
                line=f"{lang} आयु {band}: जवाब {r['got']}/120 · कदम {r['steps']} · JS त्रुटियाँ {len(r['errs'])} · भीतरी 4xx/5xx {len(r['bad'])} · English टुकड़े {len(en_sets)} · परीक्षा-डिब्बे में देवनागरी वाले परदे {len(leak)}"
                if lang=='en':
                    bodyleak=[l.strip() for l in r['body'].split('\n') if DEV.search(l)]
                    line+=f" · पूरे पन्ने में देवनागरी पंक्तियाँ {len(bodyleak)}"+((' → '+' | '.join(bodyleak[:4])) if bodyleak else '')
                    if r['got']!=120 or r['errs'] or r['bad'] or not en_sets or leak: ok=False
                else:
                    line+=f" · हिंदी पन्ने ने English फ़ाइलें माँगीं {len(en_any)}"
                    if r['got']!=120 or r['errs'] or r['bad'] or en_any: ok=False
                out.append(line)
                if r['errs']: out.append('   त्रुटि: '+' | '.join(r['errs'][:3]))
                if r['bad']: out.append('   न खुलीं: '+' | '.join(str(x) for x in r['bad'][:4]))
                if leak: out.append('   रिसाव: '+leak[0][:200].replace('\n',' '))
                if band=='14-17': out.append('   नतीजा ('+lang+'): '+r['res'][:260].replace('\n',' ‖ '))
except Exception as e:
    ok=False; out.append('⛔ अपवाद: '+str(e)[:300])
finally:
    srv.terminate()
out.append('🏁 असली-browser जाँच पास' if ok else '⛔ असली-browser जाँच: दोष')
open(OUT+'/result.txt','w',encoding='utf-8').write('\n'.join(out)); sys.exit(0 if ok else 1)
