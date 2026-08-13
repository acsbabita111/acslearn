/* ============================================================
   build_mushroom_pages.js — मशरूम-कोर्स पाठ-पेजों का generator (परत-4)
   v1.0 · 13-Aug-2026
   ------------------------------------------------------------
   लोहे का नियम: कोई पाठ-पेज हाथ से न बने — सिर्फ़ यह script।
   स्रोत:  /_TEMPLATE.html (परत-2 — root मास्टर टेम्पलेट)
         + generator/data/mushroom_course_data.js (परत-3 — meta)
         + generator/data/mushroom_lessons/paath-NNN.md (परत-3 — सामग्री)
   चलाना: repo-रूट से → node generator/build_mushroom_pages.js
          (नमूना: node generator/build_mushroom_pages.js --only 1)
   नतीजा: /courses/hi/mushroom-cultivation-marketing/msh-NNN-slug.html
          + index.html + kyon.html ("यह कोर्स क्यों" — भावनात्मक पेज)

   check-robot (fail = पेज बनेगा ही नहीं):
   1. हर पाठ ≥ 1150 शब्द
   2. हर पाठ में ≥ 1 रेखा-चित्र (svg)
   3. दिखने वाले text में square bracket नहीं — सिर्फ़ गोल ( )
   4. कोई font-size 16px से नीचे नहीं (svg समेत)
   5. कूट-नाम (msh) दिखने वाले text में नहीं
   6. अल्पविराम-घनत्व ≤ 12 प्रति 100 शब्द (अल्पविराम-रोग दोबारा न घुसे)
   7. योग्यता-जाँच के ≥ 3 checkbox बने हों
   8. course-lesson.css/js कड़ी अनिवार्य (30-Jul स्थायी-नियम)
   ============================================================ */

"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const { MUSHROOM_COURSE } = require(path.join(__dirname, "data", "mushroom_course_data.js"));
const C = MUSHROOM_COURSE;
/* पाठ-सामग्री: 12 खंड-shard फ़ाइलों से (एक चीज़ = एक जगह; upload-सुगम) */
const LESSON_SRC = {};
for (let k = 1; k <= 12; k++){
  const sh = require(path.join(__dirname, "data", "mushroom_lessons_k" + String(k).padStart(2, "0") + ".js"));
  Object.assign(LESSON_SRC, sh.LESSONS);
}
const TPL = fs.readFileSync(path.join(ROOT, "_TEMPLATE.html"), "utf8");

const STAMP = "13-Aug-2026";
const GEN_NOTE =
  "<!-- ⚙️ यह पेज generator से बना है (generator/build_mushroom_pages.js v1.0 · " + STAMP + ") —\n" +
  "     हाथ से न बदलें। बदलाव: data/टेम्पलेट में करके generator दोबारा चलाएँ (परत-4 नियम)। -->";

/* ---------- देवनागरी → Roman slug ---------- */
const TR = {
  "क":"k","ख":"kh","ग":"g","घ":"gh","ङ":"n","च":"ch","छ":"chh","ज":"j","झ":"jh","ञ":"n",
  "ट":"t","ठ":"th","ड":"d","ढ":"dh","ण":"n","त":"t","थ":"th","द":"d","ध":"dh","न":"n",
  "प":"p","फ":"ph","ब":"b","भ":"bh","म":"m","य":"y","र":"r","ल":"l","व":"v","श":"sh",
  "ष":"sh","स":"s","ह":"h","ळ":"l","क़":"q","ख़":"kh","ग़":"g","ज़":"z","ड़":"r","ढ़":"rh",
  "फ़":"f","य़":"y","अ":"a","आ":"aa","इ":"i","ई":"ee","उ":"u","ऊ":"oo","ऋ":"ri","ए":"e",
  "ऐ":"ai","ओ":"o","औ":"au","ा":"a","ि":"i","ी":"i","ु":"u","ू":"u","ृ":"ri","े":"e",
  "ै":"ai","ो":"o","ौ":"au","ं":"n","ँ":"n","ः":"","्":"","़":"","ॐ":"om"
};
const CONS = "कखगघङचछजझञटठडढणतथदधनपफबभमयरलवशषसहळक़ख़ग़ज़ड़ढ़फ़य़";
const MATRA = "ािीुूृेैोौंँः्";
function slugify(t){
  const chars = Array.from(t);
  let s = "";
  for (let i = 0; i < chars.length; i++){
    const ch = chars[i];
    if (TR[ch] === undefined){ s += ch; continue; }
    s += TR[ch];
    /* अंतर्निहित-अ: व्यंजन के बाद मात्रा/हलंत न हो और शब्द यहीं ख़त्म न हो → a */
    if (CONS.indexOf(ch) >= 0){
      const nx = chars[i+1];
      const wordEnd = (nx === undefined) || MATRA.indexOf(nx) < 0 && CONS.indexOf(nx) < 0 && TR[nx] === undefined;
      if (nx !== undefined && MATRA.indexOf(nx) < 0 && !wordEnd) s += "a";
    }
  }
  s = s.toLowerCase()
       .replace(/[^a-z0-9]+/g, "-")
       .replace(/-+/g, "-").replace(/^-|-$/g, "");
  return s || "paath";
}
function pad3(n){ return String(n).padStart(3, "0"); }
/* slug-पिन नियम (13-Aug ऑडिट-सीख): live हो चुका पता कभी न बदले —
   शीर्षक सुधरे तो भी फ़ाइल-नाम वही (SEO/कड़ी-स्थिरता)। */
const SLUG_PIN = { 368: "thndi-kadai-ki-puri-janjir-aur-tapaman-rajistar" };
function fileName(l){
  if (SLUG_PIN[l.num]) l.slug = SLUG_PIN[l.num];
  let base = C.code + "-" + pad3(l.num) + "-" + l.slug;
  if (base.length > 60) base = base.slice(0, 60).replace(/-$/, "");
  if (!/^[a-z0-9-]+$/.test(base)) throw new Error("slug-नियम टूटा: " + base);
  return base + ".html";
}

/* ---------- md पढ़ना व पार्स ---------- */
function esc(t){ return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"); }

function inline(t){
  /* पहले escape, फिर md-चिह्न वापस HTML में */
  t = esc(t);
  t = t.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
  t = t.replace(/\*([^*\n]+)\*/g, "<i>$1</i>");
  t = t.replace(/«([^»]+)»/g, "<b>«$1»</b>");
  t = t.replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>');
  t = t.replace(/\[([^\]]+)\]\((\/[^)]+)\)/g, '<a href="$2">$1</a>');
  return t;
}

function mdToHtml(body){
  /* Founder-नियम (13-Aug): एक पाठ = एक जान-चित्र — पुराने md-SVG हटें,
     चित्र सिर्फ़ hero-इंजन से (सच्चाई-नियम के साथ) */
  body = body.replace(/<svg[\s\S]*?<\/svg>/gi, "\n");
  const svgs = [];
  body = body.replace(/<svg[\s\S]*?<\/svg>/gi, m => { svgs.push(m); return "\n@@SVG" + (svgs.length-1) + "@@\n"; });

  const lines = body.split("\n");
  const out = [];
  let para = [], table = [], list = [], chks = [];
  function flushPara(){
    if (para.length){ out.push("<p>" + inline(para.join(" ")) + "</p>"); para = []; }
  }
  function flushTable(){
    if (!table.length) return;
    let h = '<div class="msh-tblwrap"><table class="msh-tbl">';
    table.forEach((row, i) => {
      if (/^\|[\s:-]+\|/.test(row.replace(/[|\s:-]/g,"") === "" ? row : "x")) {}
      const cells = row.replace(/^\||\|$/g, "").split("|").map(c => c.trim());
      if (cells.every(c => /^:?-{2,}:?$/.test(c))) return; /* विभाजक-पंक्ति */
      const tag = (i === 0) ? "th" : "td";
      h += "<tr>" + cells.map(c => "<" + tag + ">" + inline(c) + "</" + tag + ">").join("") + "</tr>";
    });
    h += "</table></div>";
    out.push(h); table = [];
  }
  function flushList(){
    if (list.length){ out.push("<ul>" + list.map(x => "<li>" + inline(x) + "</li>").join("") + "</ul>"); list = []; }
  }
  function flushChks(){
    if (chks.length){
      out.push('<div class="msh-chkbox">' + chks.map((x, i) =>
        '<label class="msh-chk"><input type="checkbox" class="msh-q" data-q="' + i + '"> <span>' + inline(x) + "</span></label>"
      ).join("") + "</div>");
      chks = [];
    }
  }
  function flushAll(){ flushPara(); flushTable(); flushList(); flushChks(); }

  for (let raw of lines){
    const ln = raw.replace(/\s+$/,"");
    const t = ln.trim();
    if (!t){ flushAll(); continue; }
    if (/^@@SVG\d+@@$/.test(t)){ flushAll(); out.push(t); continue; }
    if (/^---+$/.test(t)){ flushAll(); continue; }
    if (/^\|/.test(t)){ flushPara(); flushList(); flushChks(); table.push(t); continue; }
    flushTable();
    if (/^>\s?/.test(t)){ flushAll(); out.push("<blockquote>" + inline(t.replace(/^>\s?/,"")) + "</blockquote>"); continue; }
    if (/^☐\s?/.test(t) || /^- \[ \]\s?/.test(t)){
      flushPara(); flushList();
      chks.push(t.replace(/^☐\s?/,"").replace(/^- \[ \]\s?/,""));
      continue;
    }
    if (/^- /.test(t)){ flushPara(); flushChks(); list.push(t.replace(/^- /,"")); continue; }
    flushList(); flushChks();
    para.push(t);
  }
  flushAll();
  let html = out.join("\n");
  svgs.forEach((sv, i) => {
    html = html.replace("@@SVG" + i + "@@", '<figure class="lsn-fig">' + sv + "</figure>");
  });
  return html;
}

function parseLesson(n){
  const src = LESSON_SRC[String(n)];
  if (!src) throw new Error("पाठ-" + n + " shard में नहीं");
  const hm = src.match(/^# पाठ (\d+)\s*[—-]\s*(.+)$/m);
  if (!hm || parseInt(hm[1],10) !== n) throw new Error("पाठ-" + n + ": header बेमेल");
  const title = hm[2].trim();
  const mm = src.match(/पढ़ने का समय:\**\s*लगभग\s*(\d+)\s*मिनट/);
  const minutes = mm ? parseInt(mm[1],10) : 13;
  const sm = src.match(/\*\*सुरक्षा:\*\*\s*([^·\n]+)/);
  const safety = sm ? sm[1].trim() : "🟢 सामान्य";

  /* sections: ### से टूटें; header-block (### से पहले) छोड़ो */
  const parts = src.split(/^### /m).slice(1);
  const sections = parts.map(p => {
    const nl = p.indexOf("\n");
    return { t: p.slice(0, nl).trim(), body: p.slice(nl + 1) };
  });
  return { num: n, title, minutes, safety, sections, slug: slugify(title) };
}

/* ============================================================
   hero-इंजन (v5.1 शिक्षण-रेखा-चित्र नियम का मशरूम-रूप)
   एक पाठ = एक जान-चित्र · 800×800 वर्गाकार · सिर्फ़ ACS-5 रंग ·
   font ≥16 · legend-पट्टी · सच्चाई-नियम: हर पंक्ति पाठ के अपने
   मैटर से (गढ़ा कुछ नहीं; कटाई शब्द-सीमा पर, "…" जोड़ना निषिद्ध)
   ============================================================ */
const CLR = { navy:"#0B1F3A", blue:"#1565C0", gold:"#F9A825", green:"#2E7D32", off:"#F5F7FA" };

function xesc(t){ return String(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }

function stripMd(t){
  return t.replace(/\*\*([^*]+)\*\*/g,"$1").replace(/\*([^*\n]+)\*/g,"$1")
          .replace(/\[([^\]]+)\]\([^)]+\)/g,"$1").replace(/[«»`]/g,"")
          .replace(/\s+/g," ").trim();
}
/* शब्द-सीमा पर wrap; अधिकतम पंक्तियाँ — बची बात कटे (… नहीं जुड़ता) */
function wrap(t, maxCh, maxLines){
  const words = stripMd(t).split(" ");
  const lines = []; let cur = "";
  for (const w of words){
    if ((cur + " " + w).trim().length > maxCh){
      if (cur) lines.push(cur.trim());
      cur = w;
      if (lines.length === maxLines) break;
    } else cur = (cur + " " + w);
  }
  if (lines.length < maxLines && cur.trim()) lines.push(cur.trim());
  return lines.slice(0, maxLines);
}
function firstSentence(t){
  t = stripMd(t);
  const i = t.indexOf("।");
  return (i > 0 ? t.slice(0, i) : t).trim();
}
function secBody(l, namePart){
  const s = l.sections.find(x => x.t.indexOf(namePart) >= 0);
  if (!s) return "";
  /* पहली सार्थक पाठ-पंक्ति (svg/table/खाली छोड़कर) */
  for (const ln of s.body.replace(/<svg[\s\S]*?<\/svg>/gi," ").split("\n")){
    const t = ln.trim();
    if (!t || /^[|>#-]/.test(t) || /^---/.test(t) || /^☐/.test(t)) continue;
    return t;
  }
  return "";
}
function tspanLines(lines, x, y0, lh, extra){
  return lines.map((ln, i) =>
    '<text x="' + x + '" y="' + (y0 + i*lh) + '" ' + extra + '>' + xesc(ln) + '</text>'
  ).join("");
}

function secQuote(l){
  const s = l.sections.find(x => x.t.indexOf("मुख्य बात") >= 0);
  if (!s) return "";
  for (const ln of s.body.split("\n")){
    const t = ln.trim();
    if (/^>\s?/.test(t)) return t.replace(/^>\s?/, "");
  }
  return "";
}

const { MOTIFS } = require(path.join(__dirname, "data", "mushroom_art.js"));

/* motif-चुनाव: title(×3) + खंड-शीर्षक(×2) + मुख्य-बात(×1) में keyword-अंक */
function pickMotifs(l, mukhya, steps, want){
  const t1 = l.title, t2 = steps.join(" "), t3 = mukhya;
  const scores = [];
  for (const id in MOTIFS){
    let sc = 0, tHit = 0;
    for (const k of MOTIFS[id].kw){
      const forms = k.length > 3 ? [k, k.slice(0, -1)] : [k];
      let h1 = 0, h2 = 0, h3 = 0;
      for (const fm of forms){
        if (t1.indexOf(fm) >= 0) h1 = 1;
        if (t2.indexOf(fm) >= 0) h2 = 1;
        if (t3.indexOf(fm) >= 0) h3 = 1;
      }
      sc += h1 * 3 + h2 * 2 + h3 * 1;
      if (h1) tHit = 1;
    }
    if (sc) scores.push([tHit, sc, id]);
  }
  scores.sort((a,b) => (b[0]-a[0]) || (b[1]-a[1]));
  const out = scores.map(x => x[2]);
  /* कुछ न मिले तो कोर्स-सम्बद्ध default */
  const fallback = ["mushroom","bag","people","book","check","bulb"];
  for (const f of fallback){ if (out.length >= want) break; if (out.indexOf(f) < 0) out.push(f); }
  return out.slice(0, want);
}
function motifG(id, x, y, sc){
  return '<g transform="translate(' + x + ' ' + y + ') scale(' + sc + ')">' + MOTIFS[id].svg + '</g>';
}

function heroSVG(l){
  const pt = PART(l.num);
  const mukhya = secQuote(l) || firstSentence(secBody(l, "उद्देश्य"));
  const skipRe = /(उद्देश्य|मुख्य बात|आज का काम|नाप|सबूत|AI-सहायक|आम ग़लती|सुरक्षा-पत्रक|स्रोत|योग्यता-जाँच)/;
  const steps = l.sections.filter(s => !skipRe.test(s.t)).map(s => s.t.replace(/^\d+\.\s*/, ""));
  const titleL = wrap(l.title, 36, 2);
  const mukhyaL = wrap(mukhya, 62, 2);

  /* पाठ-प्रकार */
  const isCompare = /(नहीं|बनाम|फ़र्क़| या |कौन-सा)/.test(l.title);
  const isProcess = /(कैसे|तरीक़ा|तरीक़े|कदम|बनान|तैयार|विधि|सीढ़ी| से | तक )/.test(l.title);

  let s = '<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + xesc(l.title) + ' — पाठ-चित्र">';
  s += '<rect x="0" y="0" width="800" height="800" rx="22" fill="' + CLR.off + '"/>';
  s += '<defs><marker id="arM" markerUnits="userSpaceOnUse" markerWidth="34" markerHeight="30" refX="26" refY="15" orient="auto"><path d="M2,2 L30,15 L2,28 z" fill="' + CLR.gold + '" stroke="' + CLR.navy + '" stroke-width="3"/></marker></defs>';

  /* शीर्षक-पट्टी */
  const th = titleL.length > 1 ? 92 : 66;
  s += '<rect x="16" y="16" width="768" height="' + th + '" rx="16" fill="' + CLR.navy + '"/>';
  s += '<rect x="16" y="16" width="10" height="' + th + '" rx="5" fill="' + CLR.gold + '"/>';
  s += tspanLines(titleL, 400, titleL.length > 1 ? 50 : 52, 32,
       'font-size="27" font-weight="700" fill="' + CLR.off + '" text-anchor="middle"');
  s += '<text x="400" y="' + (16 + th - 12) + '" font-size="16" fill="' + CLR.gold + '" text-anchor="middle">पाठ ' + l.num + ' / ' + C.totalLessons + ' · खंड-' + pt.no + ': ' + xesc(pt.name) + '</text>';

  /* दृश्य-मंच */
  const cy = 16 + th + 14;
  const ch = 632 - th;                       /* मंच-ऊँचाई */
  s += '<rect x="16" y="' + cy + '" width="768" height="' + ch + '" rx="16" fill="#FFFFFF" stroke="' + CLR.blue + '" stroke-width="2"/>';

  function label(x, y, txt, w){
    const L = wrap(txt, Math.floor(w/11), 2);
    return '<rect x="' + (x - w/2) + '" y="' + y + '" width="' + w + '" height="' + (L.length > 1 ? 62 : 40) + '" rx="12" fill="' + CLR.off + '" stroke="' + CLR.blue + '"/>' +
      tspanLines(L, x, y + 27, 26, 'font-size="19" font-weight="700" fill="' + CLR.navy + '" text-anchor="middle"');
  }

  if (isCompare){
    const ids = pickMotifs(l, mukhya, steps, 2);
    const msc = 1.9, mh2 = 200 * msc;
    const my = cy + Math.floor((ch - mh2 - 66) / 2);
    s += '<line x1="400" y1="' + (cy + 24) + '" x2="400" y2="' + (cy + ch - 24) + '" stroke="' + CLR.blue + '" stroke-width="2" stroke-dasharray="7 7"/>';
    s += motifG(ids[1] || "plant",    205 - mh2/2, my, msc);
    s += motifG(ids[0] || "mushroom", 595 - mh2/2, my, msc);
    s += '<circle cx="400" cy="' + (my + mh2/2) + '" r="36" fill="' + CLR.gold + '" stroke="' + CLR.navy + '" stroke-width="4"/>';
    s += '<text x="400" y="' + (my + mh2/2 + 8) + '" font-size="20" font-weight="700" fill="' + CLR.navy + '" text-anchor="middle">बनाम</text>';
    s += label(205, my + mh2 + 16, MOTIFS[ids[1] || "plant"].name, 330);
    s += label(595, my + mh2 + 16, MOTIFS[ids[0] || "mushroom"].name, 330);
  } else if (isProcess){
    const ids = pickMotifs(l, mukhya, steps, 3);
    const msc = 1.32, mh2 = 200 * msc;
    const my = cy + Math.floor((ch - mh2 - 60) / 2) + 14;
    const cx = [140, 400, 660];
    ids.forEach((id, i) => {
      s += motifG(id, cx[i] - mh2/2, my, msc);
      s += '<circle cx="' + (cx[i] - mh2/2 + 4) + '" cy="' + (my - 6) + '" r="21" fill="' + CLR.blue + '"/>' +
           '<text x="' + (cx[i] - mh2/2 + 4) + '" y="' + (my + 1) + '" font-size="20" font-weight="700" fill="' + CLR.off + '" text-anchor="middle">' + (i+1) + '</text>';
      s += label(cx[i], my + mh2 + 14, MOTIFS[id].name, 236);
      if (i < ids.length - 1)
        s += '<line x1="' + (cx[i] + mh2/2 + 4) + '" y1="' + (my + mh2/2) + '" x2="' + (cx[i+1] - mh2/2 - 10) + '" y2="' + (my + mh2/2) + '" stroke="' + CLR.gold + '" stroke-width="6" marker-end="url(#arM)"/>';
    });
  } else {
    const ids = pickMotifs(l, mukhya, steps, 3);
    const msc = 1.5, mh2 = 200 * msc;            /* बीच वाला बड़ा */
    const ssc = 1.05, sh2 = 200 * ssc;
    const my = cy + Math.floor((ch - mh2 - 60) / 2) + 8;
    const sy = my + (mh2 - sh2) / 2;
    const mainL = 400 - mh2/2, mainR = 400 + mh2/2;
    s += motifG(ids[1] || "book",  120 - sh2/2, sy, ssc);
    s += motifG(ids[0],            mainL,       my, msc);
    s += motifG(ids[2] || "check", 680 - sh2/2, sy, ssc);
    const ay = my + mh2/2;
    /* तीर सिर्फ़ बीच की ख़ाली पट्टी में — हमेशा केंद्र की ओर */
    s += '<line x1="' + (mainL - 46) + '" y1="' + ay + '" x2="' + (mainL - 8) + '" y2="' + ay + '" stroke="' + CLR.gold + '" stroke-width="6" marker-end="url(#arM)"/>';
    s += '<line x1="' + (mainR + 46) + '" y1="' + ay + '" x2="' + (mainR + 8) + '" y2="' + ay + '" stroke="' + CLR.gold + '" stroke-width="6" marker-end="url(#arM)"/>';
    s += label(120, sy + sh2 + 14, MOTIFS[ids[1] || "book"].name, 220);
    s += label(400, my + mh2 + 14, MOTIFS[ids[0]].name, 260);
    s += label(680, sy + sh2 + 14, MOTIFS[ids[2] || "check"].name, 220);
  }

  /* मुख्य-बात पट्टी (सोना-किनारा) */
  const my2 = cy + ch + 12;
  s += '<rect x="16" y="' + my2 + '" width="768" height="' + (mukhyaL.length > 1 ? 78 : 54) + '" rx="14" fill="#FFF8E1" stroke="' + CLR.gold + '" stroke-width="3"/>';
  s += tspanLines(mukhyaL, 400, my2 + 33, 26, 'font-size="18" font-weight="600" fill="' + CLR.navy + '" text-anchor="middle"');

  /* नीचे की सोना-गोली (rx=27) */
  s += '<rect x="120" y="748" width="560" height="40" rx="27" fill="' + CLR.gold + '"/>';
  s += '<text x="400" y="774" font-size="17" font-weight="700" fill="' + CLR.navy + '" text-anchor="middle">सुरक्षा: ' + xesc(stripMd(l.safety)) + ' · पढ़ाई मुफ़्त — acslearn.com</text>';
  s += "</svg>";
  return s;
}


/* ---------- check-robot ---------- */
function visibleText(html){
  return html
    .replace(/<svg[\s\S]*?<\/svg>/g, " ")
    .replace(/<style[\s\S]*?<\/style>/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ").trim();
}
function wordCount(html){
  const t = visibleText(html);
  const m = t.match(/[\u0900-\u097FA-Za-z0-9]+/g);
  return m ? m.length : 0;
}
function checkRobot(l, contentHtml){
  const holes = [];
  const words = wordCount(contentHtml);
  if (words < 1150) holes.push("शब्द-गिनती " + words + " (< 1150)");
  if (!/<svg[\s>]/.test(contentHtml)) holes.push("रेखा-चित्र (svg) नहीं");
  const vis = visibleText(contentHtml);
  if (/[\[\]]/.test(vis)) holes.push("दिखने वाले text में square bracket");
  const commas = (vis.match(/,/g) || []).length;
  if (commas * 100 / Math.max(words,1) > 12)
    holes.push("अल्पविराम-रोग: " + Math.round(commas*100/words) + "/100 शब्द");
  const small = contentHtml.match(/font(?:-size)?\s*[:=]\s*["']?0*([0-9]{1,2})(?:\.[0-9]+)?(?:px)?["']?/gi) || [];
  for (const m of small){
    const num = parseInt(m.match(/([0-9]{1,2})(?:\.[0-9]+)?/)[1], 10);
    if (num < 16 && num > 4) holes.push("font-size " + num + " (< 16): " + m.trim());
  }
  const codeRe = new RegExp("\\b" + C.code + "\\b", "i");
  if (codeRe.test(vis)) holes.push("कूट-नाम दिखने वाले text में");
  const chkN = (contentHtml.match(/class="msh-q"/g) || []).length;
  if (chkN < 3) holes.push("योग्यता-जाँच checkbox " + chkN + " (< 3)");
  return { words, holes };
}

/* ---------- menu (links.js से) ---------- */
function loadMenu(){
  const src = fs.readFileSync(path.join(ROOT, "assets", "links.js"), "utf8");
  const box = {};
  new Function("window", src + "; window.__L = (typeof ACS_LINKS !== 'undefined') ? ACS_LINKS : null;")(box);
  if (!box.__L || !Array.isArray(box.__L.menu)) throw new Error("links.js से menu नहीं पढ़ा गया");
  return box.__L.menu;
}
const MENU_HTML = loadMenu().map(m =>
  '<a class="acs-mitem" href="' + m.href + '"><span class="e">' + m.icon + "</span> " + m.label + "</a>"
).join("\n");
const MENU_FALLBACK_JS =
  '<script>if(typeof acsOpenMenu!=="function"){window.acsOpenMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.add("open");if(s)s.classList.add("open");};window.acsCloseMenu=function(){var d=document.getElementById("acsDrawer"),s=document.getElementById("acsScrim");if(d)d.classList.remove("open");if(s)s.classList.remove("open");};window.acsLangToggle=window.acsLangToggle||function(){};}</scr' + 'ipt>';

function PART(num){ return C.parts.find(p => num >= p.from && num <= p.to) || C.parts[C.parts.length-1]; }

/* ---------- पाठ-body ---------- */
function jumpList(all, cur){
  const pt = PART(cur);
  const inPart = all.filter(x => x.num >= pt.from && x.num <= pt.to);
  return inPart.map(x =>
    x.num === cur
      ? '<span class="lsn-jumpcur">पाठ-' + x.num + " (यही)</span>"
      : '<a href="' + fileName(x) + '">पाठ-' + x.num + "</a>"
  ).join(" ") +
  ' <a href="index.html">📖 पूरी सूची (627 पाठ)</a>';
}

function lessonBody(l, all, prevFile, nextFile){
  const secs = l.sections.map(s =>
    '<section class="lsn-sec">\n<h2>' + esc(s.t) + "</h2>\n" + mdToHtml(s.body).trim() + "\n</section>"
  ).join("\n\n");

  const prev = prevFile
    ? '<a class="lsn-navbtn" href="' + prevFile + '">← पिछला पाठ</a>'
    : '<a class="lsn-navbtn" href="index.html">← कोर्स-परिचय</a>';
  const next = nextFile
    ? '<a class="lsn-navbtn lsn-next" href="' + nextFile + '" data-nextlsn>अगला पाठ →</a>'
    : '<a class="lsn-navbtn lsn-next" href="index.html">🎉 कोर्स-सूची पर लौटें</a>';
  const pt = PART(l.num);

  return '\n<article class="lsn-wrap" data-lsn-num="' + l.num + '">\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + " › " +
      "खंड-" + pt.no + ": " + esc(pt.name) + "</p>\n" +
    "<h1>पाठ-" + l.num + ": " + esc(l.title) + "</h1>\n" +
    '<p class="lsn-meta">पढ़ाई का समय: ' + l.minutes + " मिनट · सुरक्षा: " + esc(l.safety) +
      " · पाठ " + l.num + " / " + C.totalLessons + " · पढ़ाई पूरी तरह मुफ़्त</p>\n" +
    '<p class="lsn-tools"><button type="button" class="lsn-speakall" data-speakall>🔊 पूरा पाठ सुनो</button> ' +
      '<a class="lsn-toolbtn" href="index.html">📖 कोर्स-परिचय</a></p>\n' +
    "</header>\n\n" +
    '<details class="lsn-jump">\n<summary>📚 इस खंड के सब पाठ — किसी पर सीधे जाओ</summary>\n<div class="lsn-jumplist">\n' +
    jumpList(all, l.num) + "\n</div>\n</details>\n\n" +
    '<figure class="lsn-fig lsn-hero">\n' + heroSVG(l) +
    '\n<figcaption>पाठ-चित्र: ' + esc(l.title) + ' — एक नज़र में</figcaption>\n</figure>\n\n' +
    secs + "\n\n" +
    '<section class="lsn-sec lsn-video">\n<h2>वीडियो (Video)</h2>\n' +
    "<p>इस पाठ का जाँचा-परखा वीडियो जल्द यहीं जुड़ेगा। तब तक दो जीवित रास्ते —</p>\n" +
    '<p class="lsn-vidrow">' +
      '<a class="lsn-vidbtn" href="https://www.youtube.com/results?search_query=' +
        encodeURIComponent("मशरूम " + l.title + " हिंदी") +
        '" target="_blank" rel="noopener">🎬 YouTube पर इस पाठ के वीडियो खोजें</a> ' +
      '<a class="lsn-vidbtn lsn-vidgov" href="https://dmrsolan.res.in" target="_blank" rel="noopener">🏛️ DMR सोलन — सरकारी मशरूम अनुसंधान केंद्र</a></p>\n' +
    '<p class="lsn-vidnote">(दोनों नई खिड़की में; वीडियो बिना भी पाठ पूरा — पढ़ाई कहीं नहीं रुकती।)</p>\n' +
    "</section>\n\n" +
    '<nav class="lsn-nav">' + prev + next + "</nav>\n" +
    "</article>\n";
}

/* ---------- टेम्पलेट में जड़ना ---------- */
function assemble(body, meta){
  const S = "<!-- PAGE-CONTENT-START -->", E = "<!-- PAGE-CONTENT-END -->";
  const a = TPL.indexOf(S), b = TPL.indexOf(E);
  if (a < 0 || b < 0) throw new Error("_TEMPLATE.html में PAGE-CONTENT निशान नहीं");
  let page = TPL.slice(0, a + S.length) + "\n" + body + "\n" + TPL.slice(b);
  page = page.replace(/<title>[\s\S]*?<\/title>/,
    "<title>" + meta.title + "</title>\n" +
    '<meta name="description" content="' + meta.desc + '">\n' +
    '<meta name="robots" content="index, follow, max-image-preview:large">\n' +
    '<link rel="canonical" href="' + meta.canonical + '">');
  page = page.replace("</head>",
    '<meta property="og:title" content="' + meta.title + '">\n' +
    '<meta property="og:description" content="' + meta.desc + '">\n' +
    '<meta property="og:type" content="article">\n' +
    '<meta property="og:url" content="' + meta.canonical + '">\n' +
    '<meta property="og:site_name" content="Applied Computer School (ACS)">\n' +
    (meta.ld ? '<script type="application/ld+json">' + JSON.stringify(meta.ld) + "</scr" + "ipt>\n" : "") +
    '<link rel="stylesheet" href="/assets/course-lesson.css">\n</head>');
  page = page.replace('<div id="acsMenuList"></div>', '<div id="acsMenuList">\n' + MENU_HTML + "\n</div>");
  page = page.replace("</body>",
    MENU_FALLBACK_JS +
    '\n<script src="/assets/course-lesson.js" defer></scr' + 'ipt>' +
    '\n<script src="/assets/msh-progress.js" defer></scr' + 'ipt>\n</body>');
  if (page.indexOf('/assets/course-lesson.js') < 0 || page.indexOf('/assets/course-lesson.css') < 0)
    throw new Error("स्थायी-नियम भंग: course-lesson कड़ी नहीं");
  page = page.replace("<!DOCTYPE html>", "<!DOCTYPE html>\n" + GEN_NOTE);
  return page;
}

function buildLessonPage(l, all, i){
  const prevFile = i > 0 ? fileName(all[i-1]) : null;
  const nextFile = i < all.length - 1 ? fileName(all[i+1]) : null;
  const body = lessonBody(l, all, prevFile, nextFile);
  const { words, holes } = checkRobot(l, body);
  if (holes.length){
    console.error("❌ पाठ-" + l.num + " check-robot fail:");
    holes.forEach(h => console.error("   • " + h));
    return null;
  }
  const canonical = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/" + fileName(l);
  const ld = { "@context":"https://schema.org", "@type":"LearningResource",
    "name":"पाठ-"+l.num+": "+l.title,
    "description": l.title + " — " + C.title + " (मुफ़्त हिंदी पाठ)",
    "inLanguage":"hi","isAccessibleForFree":true,"learningResourceType":"Lesson","url":canonical,
    "isPartOf":{ "@type":"Course","name":C.title,"description":C.tagline,
      "provider":{ "@type":"Organization","name":"Applied Computer School (ACS)","url":"https://acslearn.com" } } };
  const page = assemble(body, {
    title: "पाठ-" + l.num + ": " + l.title + " | " + C.title + " | ACS",
    desc: l.title + " — मुफ़्त हिंदी पाठ, " + C.title + " (ACS)। कक्षा-6 स्तर की सरल भाषा में।",
    canonical, ld
  });
  return { page, words };
}

/* ---------- कोर्स-index (हरा/काला/लाल रंग-व्यवस्था msh-progress.js से) ---------- */
function buildIndex(all){
  function partBlock(pt){
    const items = all.filter(l => l.num >= pt.from && l.num <= pt.to).map(l =>
      '<li class="ci-item"><a class="msh-lsn" data-num="' + l.num + '" href="' + fileName(l) + '">पाठ-' + l.num + ": " + esc(l.title) +
      '</a><span class="ci-min">' + l.minutes + " मिनट</span></li>"
    ).join("\n");
    return '<section class="lsn-sec">\n<h2>खंड-' + pt.no + ": " + esc(pt.name) +
      " (पाठ " + pt.from + "-" + pt.to + ")</h2>\n" +
      '<ul class="ci-list">\n' + items + '\n</ul>\n<p class="ci-soon">खंड-' + pt.no + " पूरा ✅</p>\n</section>\n\n";
  }
  const body = '\n<article class="lsn-wrap ci-wrap" data-msh-index>\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + "</p>\n" +
    "<h1>" + esc(C.title) + "</h1>\n" +
    '<p class="lsn-meta">ऑनलाइन पढ़ाई पूरी तरह मुफ़्त · बिना login · अपनी गति से · कुल ' + C.totalLessons + " पाठ · 12 खंड</p>\n" +
    '<p class="lsn-tools"><a class="lsn-toolbtn" href="kyon.html">💛 पहले यह पढ़ें — यह कोर्स क्यों</a></p>\n' +
    "</header>\n\n" +
    '<section class="lsn-sec">\n<h2>यह कोर्स किसके लिए है</h2>\n' +
    "<p>यह कोर्स उनके लिए है जो मशरूम उगाकर कमाना चाहते हैं — किसान, युवा, घर से काम करने वाली महिलाएँ, और छोटे समूह। पढ़ने के लिए कक्षा-6 तक की हिंदी काफ़ी है। सभी 627 पाठ पढ़ना ज़रूरी नहीं — अपना रास्ता चुनिए।</p>\n" +
    "<p>पढ़ाई का रास्ता सीधा है — <b>पहले यहाँ मुफ़्त पढ़ो</b>, साथ-साथ छोटे-छोटे काम करते चलो। हर पाठ के अंत में योग्यता-जाँच के डिब्बे हैं — उन्हें टिक करते चलो।</p>\n" +
    '<p class="msh-legend"><b>रंग का मतलब:</b> <span class="lg lg-done">हरा = पढ़ा और जाँच पूरी</span> · <span class="lg lg-todo">काला = अभी बाक़ी</span> · <span class="lg lg-miss">लाल = छूट गया (आगे बढ़ गए पर यह अधूरा)</span></p>\n' +
    "</section>\n\n" +
    C.parts.map(partBlock).join("") +
    "</article>\n";
  const canonical = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/";
  return assemble(body, {
    title: C.title + " — मुफ़्त हिंदी कोर्स (627 पाठ) | ACS",
    desc: C.tagline + " कुल 627 पाठ, 12 खंड — पूरी तरह मुफ़्त, हिंदी में।",
    canonical,
    ld: { "@context":"https://schema.org","@type":"Course","name":C.title,"description":C.tagline,
      "inLanguage":"hi","isAccessibleForFree":true,"url":canonical,
      "provider":{ "@type":"Organization","name":"Applied Computer School (ACS)","url":"https://acslearn.com" } }
  });
}

/* ---------- "यह कोर्स क्यों" — भावनात्मक पेज ---------- */
function buildKyon(){
  const body = '\n<article class="lsn-wrap" data-msh-kyon>\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/courses/hi/">कोर्स</a> › ' + esc(C.title) + " › यह कोर्स क्यों</p>\n" +
    "<h1>यह कोर्स क्यों — शुरू करने से पहले दो मिनट</h1>\n" +
    '<p class="lsn-meta">पढ़ने का समय: 4 मिनट · यह पेज दिल से लिखा गया है</p>\n' +
    "</header>\n\n" +

    '<section class="lsn-sec">\n<h2>एक छोटी-सी कहानी</h2>\n' +
    "<p>गाँव में एक कमरा है। छोटा-सा, अँधेरा-सा। लोग कहते हैं — इसमें क्या रखा है। पर एक आदमी ने उसी कमरे में बाँस का ढाँचा खड़ा किया। ऊपर-नीचे थैले टाँगे। और कुछ हफ़्तों बाद उसी अँधेरे कमरे से सफ़ेद मोती जैसे मशरूम निकलने लगे।</p>\n" +
    "<p>वही मशरूम शहर के होटल में पनीर से महँगा बिकता है। और उसे उगाने के लिए न बड़ा खेत चाहिए, न ट्रैक्टर, न धूप। चाहिए तो बस — सही जानकारी, थोड़ा धीरज, और साफ़-सफ़ाई की आदत।</p>\n" +
    "<p>यह कोर्स वही जानकारी देता है। पूरी। मुफ़्त। आपकी अपनी भाषा में।</p>\n</section>\n\n" +

    '<section class="lsn-sec">\n<h2>यह कोर्स किसके सपने के लिए बना है</h2>\n' +
    "<p><b>उस किसान के लिए</b> — जिसके पास ज़मीन कम है, पर मेहनत पूरी है। मशरूम को खेत नहीं चाहिए — कमरा काफ़ी है।</p>\n" +
    "<p><b>उस बहन के लिए</b> — जो घर सँभालती है और सोचती है कि मैं भी कुछ कमाऊँ। मशरूम घर के भीतर का काम है — अपने समय पर, अपनी शर्त पर।</p>\n" +
    "<p><b>उस युवा के लिए</b> — जो शहर में धक्के खाकर लौटा है, या जाना ही नहीं चाहता। गाँव में रहकर भी धंधा खड़ा हो सकता है — यह कोर्स उसका पूरा नक़्शा है।</p>\n" +
    "<p><b>उस समूह के लिए</b> — जो मिलकर कुछ बड़ा करना चाहता है। कम्पोस्ट से लेकर बिक्री तक — हर कड़ी में काम है, हर हाथ के लिए जगह है।</p>\n</section>\n\n" +

    '<section class="lsn-sec">\n<h2>सच भी सुन लीजिए</h2>\n' +
    "<p>यह कोर्स आपसे झूठ नहीं बोलेगा। मशरूम रातों-रात अमीर बनाने की मशीन नहीं है। पहला चक्र सीखने का होता है — कमाने का नहीं। कभी फ़सल ख़राब भी होगी। कभी भाव गिरेगा भी।</p>\n" +
    "<p>पर फ़र्क़ यह है — जो बिना सीखे उतरता है, वह पहली ठोकर पर टूट जाता है। जो सीखकर उतरता है, वह ठोकर से भी सीखता है। इस कोर्स के 627 पाठ आपको वही मज़बूती देंगे — हर पाठ में काम, नाप, सबूत और सुरक्षा की बात साफ़-साफ़ लिखी है।</p>\n</section>\n\n" +

    '<section class="lsn-sec">\n<h2>आपसे एक वादा — और आपसे एक माँग</h2>\n' +
    "<p><b>हमारा वादा:</b> पूरी पढ़ाई मुफ़्त रहेगी। कोई पाठ आधा नहीं है। कोई बात छिपाई नहीं गई है। AI के ज़माने की नई तरकीबें भी इसी कोर्स में हैं — ताकि गाँव का आदमी भी उसी औज़ार से काम करे जिससे शहर की कंपनियाँ करती हैं।</p>\n" +
    "<p><b>हमारी माँग:</b> रोज़ थोड़ा पढ़िए। हर पाठ के अंत की जाँच टिक कीजिए। छोड़कर मत भागिए — छूटा पाठ सूची में लाल दिखेगा, वह आपको वापस बुलाएगा।</p>\n" +
    "<p>सपना आपका है। रास्ता यह कोर्स है। पहला क़दम — नीचे का बटन।</p>\n" +
    '<p class="lsn-tools"><a class="lsn-vidbtn" href="index.html">📖 कोर्स की पूरी सूची देखें</a> <a class="lsn-vidbtn" href="msh-001-' + "@FIRST@" + '.html">🚀 सीधे पाठ-1 से शुरू करें</a></p>\n</section>\n' +
    "</article>\n";
  const canonical = "https://acslearn.com/courses/" + C.lang + "/" + C.slug + "/kyon.html";
  return { body, canonical };
}

/* ---------- n-951 कोर्स-परिचय पेज (/udyam/) — स्रोत: mushroom_parichay.md ---------- */
function buildParichay(firstLessonFile){
  const md = fs.readFileSync(path.join(__dirname, "data", "mushroom_parichay.md"), "utf8");
  const parts = md.split(/^## /m);
  const head = parts[0];
  const secs = parts.slice(1).map(p => {
    const nl = p.indexOf("\n");
    let t = p.slice(0, nl).trim().replace(/^खंड-\d+\s*·\s*/, "");
    let body = p.slice(nl + 1).replace(/^### (.+)$/gm, "<h3>$1</h3>");
    return '<section class="lsn-sec">\n<h2>' + esc(t) + "</h2>\n" + mdToHtml(body).trim() + "\n</section>";
  }).join("\n\n");
  /* चित्र-पट्टी: मशरूम-दुनिया के तीन motif */
  let banner = '<svg viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="मशरूम-उद्यम">';
  banner += '<rect width="800" height="300" rx="18" fill="#FFFFFF" stroke="' + CLR.blue + '" stroke-width="2"/>';
  banner += motifG("people", 40, 50, 1.0) + motifG("mushroom", 300, 50, 1.0) + motifG("money", 560, 50, 1.0);
  banner += '<line x1="252" y1="150" x2="292" y2="150" stroke="' + CLR.gold + '" stroke-width="6" marker-end="url(#arM)"/>';
  banner += '<line x1="512" y1="150" x2="552" y2="150" stroke="' + CLR.gold + '" stroke-width="6" marker-end="url(#arM)"/>';
  banner += '<defs><marker id="arM" markerUnits="userSpaceOnUse" markerWidth="34" markerHeight="30" refX="26" refY="15" orient="auto"><path d="M2,2 L30,15 L2,28 z" fill="' + CLR.gold + '" stroke="' + CLR.navy + '" stroke-width="3"/></marker></defs>';
  banner += "</svg>";
  const courseHome = "/courses/" + C.lang + "/" + C.slug + "/";
  const body = '\n<article class="lsn-wrap" data-msh-parichay>\n' +
    '<header class="lsn-head">\n' +
    '<p class="lsn-crumb"><a href="/udyam/">उद्यम</a> › ' + esc(C.title) + "</p>\n" +
    "<h1>" + esc(C.title) + "</h1>\n" +
    '<p class="lsn-meta">उद्यम-परिचय · कृषि (MG-1) · ऑनलाइन पढ़ाई पूरी तरह मुफ़्त · मूल भाषा: हिंदी</p>\n' +
    "</header>\n\n" +
    '<figure class="lsn-fig">' + banner + "</figure>\n\n" + secs + "\n\n" +
    '<section class="lsn-sec">\n<h2>अभी शुरू कीजिए</h2>\n' +
    '<p class="lsn-vidrow"><a class="lsn-vidbtn" href="' + courseHome + 'kyon.html">💛 यह कोर्स क्यों — पहले यह पढ़ें</a> ' +
    '<a class="lsn-vidbtn" href="' + courseHome + '">📖 पूरी पाठ-सूची (627 पाठ)</a> ' +
    '<a class="lsn-vidbtn" href="' + courseHome + firstLessonFile + '">🚀 सीधे पाठ-1 से</a></p>\n' +
    '<p>अगर आपको यह कोर्स पसंद है तो हमें लिखें — <a href="https://wa.me/919431210092?text=' +
    encodeURIComponent("मुझे मशरूम-कोर्स पसंद है — आगे के पाठ/वर्कशॉप की जानकारी चाहिए") +
    '" target="_blank" rel="noopener">📱 WhatsApp पर संदेश भेजें</a></p>\n</section>\n' +
    "</article>\n";
  const canonical = "https://acslearn.com/udyam/mushroom-kheti-vyapar-udyamita.html";
  return assemble(body, {
    title: C.title + " — उद्यम-परिचय व मुफ़्त कोर्स | ACS",
    desc: "मशरूम-उद्यम का पूरा परिचय — बाज़ार, रास्ते, कमाई-सीढ़ी और 627 पाठ का मुफ़्त हिंदी कोर्स।",
    canonical
  });
}

/* ---------- मुख्य ---------- */
const args = process.argv.slice(2);
const onlyIdx = args.indexOf("--only");
const ONLY = onlyIdx >= 0 ? args[onlyIdx+1].split(",").map(Number) : null;

const ALL = [];
for (let n = 1; n <= C.totalLessons; n++) ALL.push(parseLesson(n));

/* slug-टकराव जाँच */
const seen = {};
ALL.forEach(l => {
  let f = fileName(l);
  if (seen[f]) { l.slug = l.slug + "-" + l.num; f = fileName(l); }
  seen[f] = 1;
});

const outDir = path.join(ROOT, "courses", C.lang, C.slug);
fs.mkdirSync(outDir, { recursive: true });

let ok = 0, fail = 0;
ALL.forEach((l, i) => {
  if (ONLY && ONLY.indexOf(l.num) < 0) return;
  const built = buildLessonPage(l, ALL, i);
  if (!built){ fail++; return; }
  fs.writeFileSync(path.join(outDir, fileName(l)), built.page, "utf8");
  console.log("✅ पाठ-" + l.num + " → " + fileName(l) + " (" + built.words + " शब्द)");
  ok++;
});

if (!ONLY){
  fs.writeFileSync(path.join(outDir, "index.html"), buildIndex(ALL), "utf8");
  console.log("✅ कोर्स-परिचय → index.html");
  const k = buildKyon();
  const kb = k.body.replace("msh-001-@FIRST@.html", fileName(ALL[0]));
  const kyonPage = assemble(kb, {
    title: "यह कोर्स क्यों — " + C.title + " | ACS",
    desc: "शुरू करने से पहले दो मिनट — यह मशरूम-कोर्स किसके सपने के लिए बना है, और आपसे क्या माँगता है।",
    canonical: k.canonical
  });
  fs.writeFileSync(path.join(outDir, "kyon.html"), kyonPage, "utf8");
  console.log("✅ यह-कोर्स-क्यों → kyon.html");
  fs.mkdirSync(path.join(ROOT, "udyam"), { recursive: true });
  fs.writeFileSync(path.join(ROOT, "udyam", "mushroom-kheti-vyapar-udyamita.html"),
    buildParichay(fileName(ALL[0])), "utf8");
  console.log("✅ n-951 उद्यम-परिचय → udyam/mushroom-kheti-vyapar-udyamita.html");
}
console.log("---- कुल: " + ok + " ✅ · " + fail + " ❌ ----");
if (fail) process.exit(1);
