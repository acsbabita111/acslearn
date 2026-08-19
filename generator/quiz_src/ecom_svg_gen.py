# -*- coding: utf-8 -*-
"""ecom_svg_gen.py — ACS ई-कॉमर्स मास्टरी: पाठ-md से content-चालित शिक्षण-रेखा-चित्र (800×800 SVG)
   v1.0 · 19-Aug-2026 · Founder-फ़ैसला-1 (19-Aug): खंड 10-24 के पतले चित्रों का उन्नयन, v5.1 नियम के अनुसार
   लोहे के नियम: सिर्फ़ md का पाठ (गढ़ा कुछ नहीं, सिर्फ़ स्थिर label) · ACS 5-रंग · font ≥16 · square-bracket 0 ·
   देवनागरी width-guard (overflow नहीं) · legend + "खंड में जगह" पट्टी · XML-वैध।
   चलाना: python3 generator/quiz_src/ecom_svg_gen.py <lessons.json> <parts.json> <out.json> [n1,n2,...]
"""
import json, re, sys
from xml.sax.saxutils import escape as xesc

NAVY, BLUE, GOLD, GREEN, BG, WHITE = "#0B1F3A", "#1565C0", "#F9A825", "#2E7D32", "#F5F7FA", "#FFFFFF"

# ---------- देवनागरी चौड़ाई-अनुमान ----------
def tw(t, fs):
    cons = len(re.findall(r'[\u0904-\u0939\u0958-\u095F\u0966-\u096FA-Za-z0-9₹%()/·—–\-✓✗→•…:,;?!"\'।]', t))
    mat = len(re.findall(r'[\u093E-\u094D\u0901-\u0903\u0962\u0963\u0951\u0952]', t))
    sp = t.count(' ')
    return fs * (0.60 * cons + 0.20 * mat + 0.30 * sp)

def wrap(t, fs, width, maxlines):
    words = []
    for w in t.split():
        if tw(w, fs) > width:   # लंबे जुड़े-शब्द (क-ख-ग/…) को -,/,→ पर तोड़ो
            parts = re.split(r'(?<=[-/→·])', w)
            cur = ''
            for pt in parts:
                if tw(cur + pt, fs) <= width: cur += pt
                else:
                    if cur: words.append(cur)
                    cur = pt
            if cur: words.append(cur)
        else: words.append(w)
    lines, cur = [], ""
    for w in words:
        cand = (cur + " " + w).strip()
        if tw(cand, fs) <= width: cur = cand
        else:
            if cur: lines.append(cur)
            cur = w
            if len(lines) == maxlines: break
    if len(lines) < maxlines and cur: lines.append(cur)
    if len(lines) > maxlines or (len(lines) == maxlines and " ".join(lines) != t.strip() and len(words) > sum(len(l.split()) for l in lines)):
        lines = lines[:maxlines]
        last = lines[-1]
        while tw(last + "…", fs) > width and " " in last: last = last.rsplit(" ", 1)[0]
        lines[-1] = last.rstrip(",—–-;:") + "…"
    return lines

def clean(t):
    t = re.sub(r'\*\*|\*|«|»|`', '', t)
    t = re.sub(r'\[([^\]]+)\]\([^)]*\)', r'\1', t)
    t = t.replace('[', '(').replace(']', ')')
    t = re.sub(r'\s+', ' ', t).strip()
    return t

# ---------- md से सामग्री ----------
def sections(src):
    after = re.sub(r'^═+\n# पाठ-\d+:.*\n═+\n', '', src, flags=re.M)
    after = re.sub(r'^\*\(ई-कॉमर्स मास्टरी[^)]*\)\*\s*\n', '', after, flags=re.M)
    out = []
    for p in re.split(r'^## ', after, flags=re.M)[1:]:
        nl = p.find('\n'); out.append((p[:nl].strip(), p[nl + 1:]))
    return out

def first_sentence(b, mx=140):
    b = clean(re.sub(r'```svg.*?```', '', b, flags=re.S))
    s = re.split(r'।\s', b)[0]
    return s[:mx].rstrip()

def items_from(b):
    """bold-सूची "1. **नाम** — विवरण" → [(नाम, विवरण)]; नहीं तो "1. वाक्य" → [(वाक्य,'')]"""
    b2 = re.sub(r'```svg.*?```', '', b, flags=re.S)
    it = []
    for m in re.finditer(r'(?:\(?\d+\)?[.)]?\s*)\*\*([^*]+)\*\*\s*(?:—|-|:|\(|–)?\s*([^।]*?)(?=\s\(?\d+\)?[.)]?\s*\*\*|।|$)', b2, re.S):
        it.append((clean(m.group(1)), clean(m.group(2))))
    if len(it) >= 2: return it
    it = []
    for m in re.finditer(r'(?:^|\s)\(?(\d+)[.)]\s+([^।]+?)(?=\s\(?\d+[.)]\s|।|$)', b2, re.S):
        it.append((clean(m.group(2)), ''))
    return it if len(it) >= 2 else []

def extract(n, src):
    secs = sections(src)
    title = re.match(r'═+\n# पाठ-\d+: (.*)\n', src).group(1)
    d = {'n': n, 'title': clean(title), 'cols': [], 'galti': [], 'suraksha': '', 'aankh': '', 'mukhya': '', 'refs': [], 'kaam': ''}
    for t, b in secs:
        if t.startswith('2.'):
            m = re.search(r'\*\*(.+?)\*\*', b, re.S)
            d['mukhya'] = clean(m.group(1)) if m else first_sentence(b)
        elif t.startswith('3.'):
            d['kaam'] = first_sentence(b, 150)
        elif t.startswith('7.'):
            g = re.findall(r'(?:पहली|दूसरी|तीसरी|चौथी|पाँचवीं|छठी|सातवीं)(?:\s*आम\s*ग़लती)?\s*—\s*([^।]+)।', b)
            d['galti'] = [clean(x) for x in g]
        elif t.startswith('8.'):
            d['suraksha'] = first_sentence(b)
        elif t.startswith('सेवा-सहायक की आँख'):
            d['aankh'] = first_sentence(b)
        elif re.match(r'^(1|3|4|5|6|9|10)\.', t) or t.startswith('चित्र') or t.startswith('एक असली') or 'ग़लती और सुधार' in t or t.startswith('अभ्यास-परीक्षा') or t.startswith('कमज़ोर-कड़ी'):
            if 'ग़लती और सुधार' in t:
                g = re.findall(r'(?:पाँचवीं|छठी|सातवीं)\s*आम\s*ग़लती\s*—\s*([^।]+)।', b)
                d['galti'] += [clean(x) for x in g]
            continue
        else:
            d['cols'].append({'h': clean(t), 'items': items_from(b), 'lead': first_sentence(b, 120)})
    d['refs'] = sorted(set(int(x) for x in re.findall(r'पाठ-(\d{1,3})', src) if int(x) != n and 1 <= int(x) <= 326))[:10]
    return d

# ---------- SVG ----------
def T(x, y, t, fs=16, fill=NAVY, anchor=None, bold=False):
    a = ' text-anchor="%s"' % anchor if anchor else ''
    b = ' font-weight="bold"' if bold else ''
    return '<text x="%g" y="%g" font-size="%d" fill="%s"%s%s>%s</text>' % (x, y, fs, fill, a, b, xesc(t))

def R(x, y, w, h, fill, stroke, sw=3, rx=12):
    return '<rect x="%g" y="%g" width="%g" height="%g" rx="%d" fill="%s" stroke="%s" stroke-width="%d"/>' % (x, y, w, h, rx, fill, stroke, sw)

def arrow(x1, y, x2):
    return '<line x1="%g" y1="%g" x2="%g" y2="%g" stroke="%s" stroke-width="3"/><polygon points="%g,%g %g,%g %g,%g" fill="%s"/>' % (
        x1, y, x2 - 8, y, NAVY, x2, y, x2 - 10, y - 6, x2 - 10, y + 6, NAVY)

def build(d, part):
    n = d['n']; out = []
    out.append('<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" font-family="Noto Sans Devanagari, Inter">')
    out.append('<rect width="800" height="800" fill="%s"/>' % BG)
    # --- शीर्षक ---
    tl = wrap(d['title'], 24, 720, 2); y = 44
    for i, l in enumerate(tl): out.append(T(400, y + i * 30, l, 24, NAVY, 'middle', True))
    y = y + (len(tl) - 1) * 30 + 28
    sub = wrap(d['mukhya'], 16, 700, 1)
    if sub: out.append(T(400, y, sub[0], 16, BLUE, 'middle')); y += 18
    # --- मुख्य आरेख: 2-3 स्तंभ ---
    cols = [c for c in d['cols'] if c['h']][:3]
    topY = y + 14
    if cols:
        ncol = len(cols); gap = 24; cw = (720 - gap * (ncol - 1)) / ncol
        colH = 250
        for ci, c in enumerate(cols):
            x = 40 + ci * (cw + gap)
            fill = GOLD if ci == 0 else WHITE
            stroke = NAVY if ci < 2 else BLUE
            out.append(R(x, topY, cw, colH, fill, stroke, 4 if ci == 0 else 3))
            hl = wrap(c['h'], 17, cw - 24, 2); yy = topY + 30
            for l in hl: out.append(T(x + cw / 2, yy, l, 17, NAVY, 'middle', True)); yy += 22
            yy += 8
            items = c['items'][:4]
            if items:
                for k, (nm, ds) in enumerate(items):
                    line = ("%d. " % (k + 1)) + nm
                    ls = wrap(line, 16, cw - 24, 2)
                    for l in ls:
                        if yy > topY + colH - 14: break
                        out.append(T(x + 12, yy, l, 16, NAVY)); yy += 21
                    if ds and yy <= topY + colH - 36:
                        for l in wrap(ds, 16, cw - 36, 1):
                            out.append(T(x + 24, yy, l, 16, BLUE)); yy += 21
            else:
                for l in wrap(c['lead'], 16, cw - 24, 7):
                    if yy > topY + colH - 14: break
                    out.append(T(x + 12, yy, l, 16, NAVY)); yy += 21
            if ci < ncol - 1: out.append(arrow(x + cw + 3, topY + colH / 2, x + cw + gap - 3))
        y = topY + colH + 22
    # --- आम ग़लती → सुधार ---
    gl = [g for g in d['galti'] if g][:3]
    if gl:
        bh = 28 + 23 * len(gl)
        out.append(R(40, y, 720, bh, WHITE, NAVY, 2))
        out.append(T(54, y + 22, 'आम ग़लती — इनसे बचो', 16, NAVY, None, True))
        yy = y + 45
        for g in gl:
            for l in wrap('✗ ' + g, 16, 690, 1): out.append(T(54, yy, l, 16, NAVY)); yy += 23
        y += bh + 14
    # --- सुरक्षा + सेवा-सहायक की आँख ---
    if d['suraksha']:
        sl = wrap('🛡 ' + d['suraksha'], 16, 690, 2)
        bh = 16 + 22 * len(sl)
        out.append(R(40, y, 720, bh, WHITE, GREEN, 3))
        yy = y + 22
        for l in sl: out.append(T(54, yy, l, 16, GREEN)); yy += 22
        y += bh + 12
    if d['aankh'] and y < 668:
        al = wrap('सेवा-सहायक की आँख: ' + d['aankh'], 16, 690, 2)
        bh = 16 + 22 * len(al)
        if y + bh <= 700:
            out.append(R(40, y, 720, bh, GOLD, NAVY, 2))
            yy = y + 22
            for l in al: out.append(T(54, yy, l, 16, NAVY)); yy += 22
            y += bh + 12
    # --- जुड़े पाठ (chips) ---
    if d['refs'] and y < 700:
        chips = d['refs'][:8]; xx = 40
        out.append(T(xx, y + 16, 'जुड़े पाठ:', 16, NAVY, None, True)); xx += tw('जुड़े पाठ:', 16) + 14
        for r in chips:
            lab = 'पाठ-%d' % r; w = tw(lab, 16) + 18
            if xx + w > 760: break
            out.append(R(xx, y, w, 24, WHITE, BLUE, 2, 12)); out.append(T(xx + w / 2, y + 17, lab, 16, BLUE, 'middle')); xx += w + 8
        y += 38
    # --- आज का काम (जगह बचे तो) ---
    if d['kaam'] and y < 690:
        kl = wrap('आज का काम: ' + d['kaam'], 16, 690, 1)
        out.append(R(40, y, 720, 30, WHITE, GREEN, 2))
        out.append(T(54, y + 20, kl[0], 16, GREEN)); y += 40
    # --- legend + खंड में जगह (नीचे स्थिर पट्टी) ---
    ly = 724
    out.append('<rect x="40" y="%d" width="720" height="1" fill="%s"/>' % (ly - 10, NAVY))
    lx = 40
    for fill, stroke, lab in [(GOLD, NAVY, 'मुख्य'), (WHITE, NAVY, 'विवरण'), (WHITE, GREEN, 'सुरक्षा/नियम')]:
        out.append(R(lx, ly, 22, 16, fill, stroke, 2, 4)); out.append(T(lx + 30, ly + 14, lab, 16, NAVY)); lx += 30 + tw(lab, 16) + 22
    out.append(T(lx, ly + 14, '✗ = ग़लती', 16, NAVY)); 
    # dots
    total = part['to'] - part['from'] + 1; dy = ly + 38
    out.append(T(40, dy + 5, 'खंड-%d में जगह: पाठ %d/%d' % (part['no'], n, part['to']), 16, BLUE))
    dx0 = 40 + tw('खंड-%d में जगह: पाठ %d/%d' % (part['no'], n, part['to']), 16) + 16
    step = max(8, min(22, (700 - dx0) / max(1, total)))
    for i in range(total):
        cx = dx0 + 6 + i * step
        if cx > 700: break
        cur = (part['from'] + i == n)
        out.append('<circle cx="%g" cy="%g" r="%d" fill="%s" stroke="%s" stroke-width="1"/>' % (cx, dy, 6 if cur else 4, GOLD if cur else WHITE, NAVY))
    out.append(T(760, 792, 'पढ़ाई मुफ़्त — acslearn.com', 16, GREEN, 'end'))
    out.append('</svg>')
    return '\n'.join(out)

# ---------- ऑडिट ----------
def audit(sv):
    from xml.etree import ElementTree as ET
    holes = []
    try: ET.fromstring(sv)
    except Exception as e: holes.append('xml: ' + str(e)[:60])
    for m in re.finditer(r'font-size="(\d+)"', sv):
        if int(m.group(1)) < 16: holes.append('font<16')
    for c in set(re.findall(r'(?:fill|stroke)="([^"]+)"', sv)):
        if c not in (NAVY, BLUE, GOLD, GREEN, BG, WHITE, 'none'): holes.append('color ' + c)
    if re.search(r'>[^<]*[\[\]][^<]*<', sv): holes.append('square-bracket')
    # overflow: हर text की अनुमानित चौड़ाई बनाम viewBox
    for m in re.finditer(r'<text ([^>]*)>([^<]*)</text>', sv):
        attrs, t = m.group(1), m.group(2)
        x = float(re.search(r'\bx="([\d.]+)"', attrs).group(1)); fs = int(re.search(r'font-size="(\d+)"', attrs).group(1))
        am = re.search(r'text-anchor="(\w+)"', attrs); anc = am.group(1) if am else None
        w = tw(t, fs)
        if anc == 'middle' and (x - w / 2 < 20 or x + w / 2 > 780): holes.append('overflow-mid: ' + t[:30])
        elif anc == 'end' and x - w < 20: holes.append('overflow-end')
        elif not anc and x + w > 780: holes.append('overflow: ' + t[:30])
    texts = len(re.findall(r'<text', sv))
    if texts < 14: holes.append('thin (%d text)' % texts)
    return holes

if __name__ == '__main__':
    L = json.load(open(sys.argv[1], encoding='utf-8')); P = json.load(open(sys.argv[2], encoding='utf-8'))
    only = [int(x) for x in sys.argv[4].split(',')] if len(sys.argv) > 4 else None
    out = {}; fails = 0
    for n in range(1, 327):
        if only and n not in only: continue
        part = [p for p in P if p['from'] <= n <= p['to']][0]
        d = extract(n, L[str(n)]); sv = build(d, part); h = audit(sv)
        if h: fails += 1; print('❌ पाठ-%d: %s' % (n, '; '.join(h[:4])))
        out[str(n)] = sv
    json.dump(out, open(sys.argv[3], 'w', encoding='utf-8'), ensure_ascii=False)
    print('बने:', len(out), '| दोष:', fails)
