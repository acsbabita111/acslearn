# dev_pl0_codebox_build.py — "पहला कोड" के code-डिब्बे बनाने वाला (अध्याय 23-24 से)
# उपयोग:  python3 generator/dev_pl0_codebox_build.py generator/data/ch24b_codes.py
#   → हर डिब्बे का असली python3-नतीजा छापता है (data-out इसी से भरे गए थे; हाथ से कोई output नहीं)
# नियम: seed वाला डिब्बा = random — robot भी वही seed आगे जोड़कर चलाता है (dev_pl_code_check v1.5+)
#       html_* कुंजी = HTML-डिब्बा (चलता नहीं; robot tag-संतुलन और भीतरी CSS जाँचता है)
import sys, subprocess, html, json, importlib.util
def load(path):
    spec=importlib.util.spec_from_file_location('c',path); c=importlib.util.module_from_spec(spec); spec.loader.exec_module(c); return c.CODES
def run(code, seed, stdin):
    full = code if seed is None else f"import random\nrandom.seed({seed})\n" + code
    r=subprocess.run(['python3','-c',full],capture_output=True,text=True,input=stdin,timeout=5)
    assert r.returncode==0, r.stderr[-300:]
    return ' '.join(r.stdout.split())
def pre(CODES, key):
    code, seed, runs = CODES[key]
    if key.startswith('html_'):
        return '<pre class="pl-code" data-lang="html">'+html.escape(code,quote=False)+'</pre>'
    attrs=[] if seed is None else [f'data-seed="{seed}"']
    if runs is None:
        attrs.append(f'data-out="{html.escape(run(code,seed,""),quote=True)}"')
    else:
        for k,i in enumerate(runs):
            suf='' if k==0 else f'-{k+1}'
            attrs.append(f'data-in{suf}="{html.escape(i,quote=True)}" data-out{suf}="{html.escape(run(code,seed,i.replace("|",chr(10))+chr(10)),quote=True)}"')
    return '<pre class="pl-code" data-lang="py" '+' '.join(attrs)+'>'+html.escape(code,quote=False)+'</pre>'
if __name__=='__main__':
    CODES=load(sys.argv[1])
    for k,(code,seed,runs) in CODES.items():
        if k.startswith('html_'): print(k,'=> (HTML-डिब्बा)'); continue
        print(k,'=>',[run(code,seed,'' if runs is None else i.replace('|','\n')+'\n') for i in (runs or [None])])
