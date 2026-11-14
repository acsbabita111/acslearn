# -*- coding: utf-8 -*-
# generator/build_learner_consent_lang.py v2.2 (परत-4)
# v2.2 (14-Nov-2026, खेप 4 भाग 2): संस्करण 1.2; दो नए लंगर R6X (नियम 6 में फ़ीस के नए वाक्य) और R7X (नियम 7 में वापसी के नए वाक्य)।
# v2.1 (13-Nov-2026): फीस वाली पंक्ति (F_S) का English लंगर नए नियम से मिलाया: Golden Pass में पूरा टेस्ट मुफ़्त, दिन में 2 बार तक।
# en साँचे (en/rules-consent-learner.html) + data/consent_learner_strings.py से
# 13 भाषा-पेज <कोड>/rules-consent-learner.html बनाता है।
# hi = क़ानूनी मूल (हाथ-रखरखाव); en = पुल-साँचा। चलाना:
#   python3 generator/build_learner_consent_lang.py            (repo-रूट से)
#   python3 build_learner_consent_lang.py SRC OUTDIR DATADIR   (वैकल्पिक paths)
import re,sys,os,importlib.util
HERE=os.path.dirname(os.path.abspath(__file__))
SRC   = sys.argv[1] if len(sys.argv)>1 else os.path.join(HERE,'..','en','rules-consent-learner.html')
OUT   = sys.argv[2] if len(sys.argv)>2 else os.path.join(HERE,'..')
DATA  = sys.argv[3] if len(sys.argv)>3 else os.path.join(HERE,'data','consent_learner_strings.py')
spec=importlib.util.spec_from_file_location('cls',DATA); _m=importlib.util.module_from_spec(spec); spec.loader.exec_module(_m)
LANGS=_m.LANGS
EN=open(SRC,encoding='utf-8').read()
L15=['hi','en','zh','es','ar','fr','bn','pt','ru','id','ur','de','ja','mr','te']
HREF=''.join('<link rel="alternate" hreflang="%s" href="https://acslearn.com/%srules-consent-learner.html"/>'%(c,('' if c=='hi' else c+'/')) for c in L15)+'<link rel="alternate" hreflang="x-default" href="https://acslearn.com/rules-consent-learner.html"/>'
FONT={'zh':("Noto+Sans+SC:wght@400;600;700;800","'Noto Sans SC',sans-serif"),
 'ja':("Noto+Sans+JP:wght@400;600;700;800","'Noto Sans JP',sans-serif"),
 'ar':("Noto+Sans+Arabic:wght@400;600;700;800","'Noto Sans Arabic',sans-serif"),
 'ur':("Noto+Nastaliq+Urdu:wght@400;600;700","'Noto Nastaliq Urdu',serif"),
 'bn':("Noto+Sans+Bengali:wght@400;600;700;800","'Noto Sans Bengali',sans-serif"),
 'te':("Noto+Sans+Telugu:wght@400;600;700;800","'Noto Sans Telugu',sans-serif"),
 'mr':("Noto+Sans+Devanagari:wght@400;600;700;800","'Noto Sans Devanagari',sans-serif")}
RTL={'ar','ur'}
# RTL-अलगाव नियम (ऑडिट-2, B1): data-* attributes व JS-strings में HTML <bdi> निषिद्ध —
# वहाँ Unicode LRI(U+2066)/PDI(U+2069); <bdi> सिर्फ़ दिखते HTML-body में।
ATTR_KEYS={'A_S','A_J','A_E','B_S','B_J','B_E','F_S','F_J','F_E','RF_S','RF_J','RF_E','RK_S','RK_J','RK_E'}
JS_SKIP={'CNT_JS','FIN_JS'}
UNI_KEYS=ATTR_KEYS|{'ALERT'}
LTOK=re.compile(r'(₹?[0-9][0-9,.%–-]*|ACS|FFGPMTrust|OTP|POCSO|DPDP|UNCITRAL|HQ Legal|ID|Password|L1-L15|Student|Job-seeker|Entrepreneur|Village|Town|Metro|Cloud Function|Brevo|Exam|Result|Certificate|Golden Pass|escrow)')
def bdi(t):return LTOK.sub(lambda m:'<bdi dir="ltr">'+m.group(0)+'</bdi>',t)
def uni(t):return LTOK.sub(lambda m:'\u2066'+m.group(0)+'\u2069',t)
K=dict(
 TITLE='<title>Rules &amp; Consent — Learner | ACS</title>',
 DESC='Rules &amp; Consent — Learner — the rules to read and accept before registering on ACS (Applied Computer School).',
 H1='Rules, Rights &amp; Duties — Learner',
 SUB='Original language: Hindi · role: learner (Student · Job-seeker · Entrepreneur)',
 VER='<b>Version: 1.2</b> · Effective date: 14 November 2026',
 R6X='. '+'Final online exam of a course: free with an active badge (Golden Pass or Verified Badge), otherwise ₹100 per exam; one ₹100 chance is used for the career test or for one course exam and stays valid for 30 days from payment; at most 2 exams in a day, all exams together. Course certificate: ₹125 after passing the exam; its online check runs for 5 years from the issue date, and ₹1000 adds 5 more years (after the valid-till date a late fee is added: ₹500 up to 1 year late, ₹1000 beyond that). The saved career report can be checked online for 5 years',
 R7X='The ₹100 chance is not refunded, except for a technical fault of ACS (not even if it is unused within 30 days). The ₹125 fee (certificate or career report), the certificate validity extension fee and the late fee are not refunded; if a technical error debits the money twice or wrongly, it is corrected after a check (payment correction). The 75% rule for death/disaster covers running services only (training, workshop, course fee, badge); it does not cover the ₹100 chance, the ₹125 fee, the extension fee or the late fee. Full rule: acslearn.com/refund.html',
 TN='🌐 This is an English translation provided for convenience. In case of any difference in meaning, the <a href="/rules-consent-learner.html" style="color:#1565C0;font-weight:700">Hindi original</a> is the legally authoritative text.',
 IDH='👤 Your details', L1='Name — in your own language', P1='e.g. Rajesh Kumar',
 L2='Name — in ROMAN CAPITALS', L3='Who are you?', OPT_S='>Student<', OPT_J='>Job-seeker<', OPT_E='>Entrepreneur<',
 L4='>Age<', P4='Enter your age',
 G1="Guardian's name (required for minors)", GP1="Guardian's full name",
 G2='Relationship to Guardian', GP2='e.g. father, mother, guardian',
 NOTE='🙏 Please read every rule carefully (minors should take their Guardian\'s help). <b>Ticking the green "Accept all at once" bar below accepts all the applicable rules above and the "Final confirmation" together — only then does the "Send OTP" button turn on.</b> If you prefer, you may also read and tick the rules one by one; in that case tick the "Final confirmation" separately at the end.',
 PA="Part A : ACS's core promise", PB='Part B : Age, entry &amp; rights', PC='Part C : Fees, Refunds &amp; risk disclaimer',
 PD='Part D : Safety &amp; conduct', PE='Part E : Joining, Login &amp; Records', PF='Part F : Rule changes, disputes &amp; supremacy',
 R1="ACS's five foundation principles — the basis of every dealing with you — (1) <b>Learner first</b>, (2) <b>Integrity</b>, (3) <b>Privacy protection</b>, (4) <b>Fairness</b>, (5) <b>Non-discrimination</b>. These are based on the ACS Global South Charter (already in force).",
 R2B='Age rule:',
 R3='Even without login you can view, free of charge: all courses, the list of 950 enterprise opportunities, and tools/training information.',
 R4B='Your main benefits:',
 R5='<b>Police verification (mandatory for Job-seekers only):</b> before contacting/applying to an employer for a real job, you must submit police verification. It will be verified by the HQ Legal Head. Until verification is complete, the employer-contact/apply facility will not be available.',
 R6A='Joining/viewing is always free;', R6Z='. Every fee will be clearly stated in advance.',
 R7B='Refund rules:', R8B='Risk disclaimer (must read):',
 R9='Child protection (POCSO) and protection of your personal data (DPDP) — both laws apply in full.',
 R10='Do not share your ID/Password with anyone; fill in only true and correct information at registration.',
 R11='Do not use the ACS platform for any political campaigning.',
 R12='Always behave respectfully with other Learners and the ACS team.',
 R13='<b>Certificate:</b> issued only through the genuine Exam → Result → Certificate flow — no shortcut will be given, to anyone.',
 R14='How joining works: fill the form → verify your email via OTP → <b>directly active</b> — no pending/waiting; you can start using it immediately.',
 R15='<b>Login rule (special for you):</b> every login needs only ID + Password — no OTP is asked again (this differs from other roles). You will be logged out automatically after 10 minutes of inactivity.',
 R16='For your safety and in case of any dispute, a digital record of logins and activity will be kept.',
 R17='Certificate records are kept permanently; other administrative records for at least 7 years.',
 R18='The Founder has the right to change the rules; you will be notified of changes within 7 days. No change will apply retroactively to fees already paid or services already taken.',
 R19='There will be two equal copies of this consent — one with you (and your Guardian, if applicable), one with ACS (HQ Legal).',
 R20='Any legal dispute shall be subject only to the jurisdiction of the <b>Khagaria (Bihar) court</b> or the competent civil court at Patna. For international matters, the UNCITRAL rules shall apply.',
 R21='<b>Country Annexure:</b> additional rules applicable outside India will be issued through the annexure of the country concerned.',
 R22="Above everything: ACS's most recently recorded rules and the Founder's directions shall be final.",
 R23="<b>ACS's special right:</b> in case of fraud, false information, or serious violation of the rules, your account may be suspended/terminated with immediate effect — digital notice will be given within 12 to 24 hours. Fees paid will be settled as per the Refund rules above (rule 7).",
 BULK='✅ Accept all at once: I have read all the rules above and I accept them all.',
 BULK2='(You may also tick the rules one by one if you prefer.)',
 CNT0='0 / 22 rules accepted (loading...)',
 FINB='<b>Final confirmation:</b> I (and my Guardian, if applicable) have read all the rules above and I accept them all.',
 OTPB='📩 Send OTP',
 FOOT='One copy stays with you, one with ACS. Original language: Hindi. Final legal approval rests with the HQ Legal Head.',
 # script
 A_S='Student — may join from age 10; Guardian consent is mandatory for ages 10-17.',
 A_J='Job-seeker — job preparation from age 16 (Guardian consent for 16-17); real job/apply/joining only at 18+.',
 A_E='Entrepreneur — minimum age 16; for the Industrial Tour, notarized Guardian permission is mandatory for ages 16-17.',
 B_S='After registration — aptitude test, counselling, centre courses, content in your own language, certificate.',
 B_J='View job information/opportunities; at 18+ contact employers directly from the dashboard; the platform fee goes directly to ACS — never separately to any employer/agent.',
 B_E='Bank-finance-ready reports for 950 enterprises, market research, tools lists, courses, the investment ladder (L1-L15), Industrial Tour packages.',
 F_S='money is charged only for these services: printable interest report ₹125 — 24-question preview free; full 120-question test ₹100 per attempt; with an active Golden Pass (₹300; date-of-birth discount under 18) the full test is free, up to 2 times a day · offline training · workshop apprenticeship · counsellor advice · foreign-agent connection',
 F_J='Verified Badge (optional — Village ₹300 · Town ₹600 · Metro ₹1000 · 365 days, flat)',
 F_E='Industrial Tour (if you take one)',
 RF_S='Interest test: the 24-question preview is free for everyone; the full test is ₹100 per attempt (free with an active Golden Pass); the printable report is ₹125 — take it only if you wish. Counselling: cancel at least 1 hour before the session = 90% refund (whether the Learner or the Counselor cancels). In case of death/disaster = 75% refund.',
 RF_J='Cancel before badge verification = 90% refund (10% processing); after the badge is issued = (full amount − 30%) × remaining days ÷ 365.',
 RF_E='Industrial Tour money stays in escrow; amounts already spent (visa/tickets/booking) are non-refundable, the rest is refunded.',
 RK_S='No course/training guarantees a job or income; a certificate is proof of ability, not an assurance of employment.',
 RK_J='No guarantee of success in jobs/placement; the final hiring decision rests with the employer; ACS is only an intermediary (platform).',
 RK_E='Risk is always part of enterprise. ACS, FFGPMTrust and Counselors are not liable for any loss/damage; investment and outcomes are entirely your own responsibility.',
 CNT_JS="' rules accepted'",
 FIN_JS="'<b>Final confirmation:</b> I (and my Guardian, if applicable) have read all ' + vb.length + ' rules above and I accept them all.'",
 ALERT='✅ (sample) The real page will send the OTP from here — via Cloud Function + Brevo.',
 EX_H='🏠 Home', EX_G='← Registration Guide',
)

def clean_head(s):
    # 11-Nov-2026 (SEO): <title> और <meta> पंक्तियों में HTML tag निषिद्ध. <bdi> सिर्फ़ दिखते body में.
    # (ar/ur में <bdi dir="ltr"> description-attribute को तोड़ रहा था.) यही काम build_seo_meta.js का fixConsentHead करता है.
    i=s.find('</head>')
    if i<0:return s
    return '\n'.join(re.sub(r'</?bdi[^>]*>','',l) if re.match(r'\s*<(title>|meta )',l) else l for l in s[:i].split('\n'))+s[i:]

def build(code,D,outdir):
    s=EN
    s=s.replace('<html lang="en">','<html lang="%s"%s>'%(code,' dir="rtl"' if code in RTL else ''))
    s=s.replace('https://acslearn.com/en/rules-consent-learner.html','https://acslearn.com/%s/rules-consent-learner.html'%code)
    m=re.search(r'(<link rel="alternate"[\s\S]*?x-default[^>]*/>)',s); s=s.replace(m.group(1),HREF)
    if code in FONT:
        s=s.replace("family=Inter:wght@400;600;700;800","family="+FONT[code][0]+"&family=Inter:wght@400;600;700")
        s=s.replace("font-family:'Inter',sans-serif;","font-family:%s;letter-spacing:0;"%FONT[code][1])
    if code=='ur': s=s.replace('line-height:1.8;','line-height:2.1;')
    if code in RTL: s=s.replace('body{font-family','body{direction:rtl;font-family')
    assert "'" not in D['ALERT'], code+" ALERT में ASCII-apostrophe (JS टूटेगी) — ’ उपयोग करें"
    for kname,v in D.items():
        k=K[kname]
        n=s.count(k); assert n>=1, code+" MISSING: "+kname+" :: "+k[:60]
        if code in RTL and kname not in JS_SKIP:
            v = uni(v) if kname in UNI_KEYS else bdi(v)
        s=s.replace(k,v)
    os.makedirs(outdir,exist_ok=True)
    s=clean_head(s)
    open(os.path.join(outdir,'rules-consent-learner.html'),'w',encoding='utf-8').write(s)
    return s
if __name__=='__main__':
    for code,D in LANGS.items():
        out=build(code,D,os.path.join(OUT,code))
        for probe in ('rules accepted','Final confirmation','Accept all at once','Guardian consent is mandatory','Send OTP','Your details','printable interest report'):
            assert probe not in out, code+' EN-LEAK: '+probe
        assert out.count('hreflang=')==16, code+' hreflang'
        assert out.count('Version: 1.0')==0 and re.search(r'1\.1(</bdi>)?</b>',out) is None and re.search(r'1\.2(</bdi>)?</b>',out), code+' version'
        if code in RTL:
            for mm in re.finditer(r'data-[sje]="([^"]*)"',out):
                assert '<' not in mm.group(1), code+' attr में HTML: '+mm.group(1)[:50]
        print(code,'OK',len(out))
    print('BUILD 13/13 OK')
