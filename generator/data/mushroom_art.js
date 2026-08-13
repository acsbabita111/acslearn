/* ============================================================
   mushroom_art.js — मशरूम-कोर्स चित्र-भंडार (परत-3 कला-data)
   v1.0 · 13-Aug-2026 · शैली: aptitude_art.js परिवार
   ------------------------------------------------------------
   हर motif = 200×200 डिब्बे में हाथ-गढ़ा रंगीन रेखा-चित्र।
   रंग सिर्फ़ ACS-5 (+ सफ़ेद, हल्का-सोना #FFF8E1 पृष्ठ-छाया)।
   रेखा: #0B1F3A, गोल जोड़। उपयोग: build_mushroom_pages.js का hero-इंजन।
   ============================================================ */
"use strict";

const N = "#0B1F3A", B = "#1565C0", G = "#F9A825", GR = "#2E7D32", O = "#F5F7FA", W = "#FFFFFF", LG = "#FFF8E1";
const LN = 'stroke="' + N + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"';
const LN3 = 'stroke="' + N + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';

const MOTIFS = {

/* ---- मशरूम (बटन) — गुच्छा ---- */
mushroom: { name: "मशरूम (कवक)", kw: ["कवक","बटन","फ़सल","तुड़ाई के बाद","पहली फ़सल"], svg:
 '<ellipse cx="100" cy="180" rx="80" ry="14" fill="' + LG + '"/>' +
 '<path d="M60 168 Q58 128 76 122 L92 122 Q104 128 100 168 Z" fill="' + W + '" ' + LN + '/>' +
 '<path d="M38 126 Q40 84 78 82 Q118 84 118 124 Q118 136 104 136 L52 136 Q38 136 38 126 Z" fill="' + O + '" ' + LN + '/>' +
 '<path d="M46 118 Q52 96 74 90" fill="none" stroke="' + G + '" stroke-width="4" stroke-linecap="round"/>' +
 '<path d="M126 172 Q125 146 136 142 L148 142 Q158 146 156 172 Z" fill="' + W + '" ' + LN + '/>' +
 '<path d="M112 146 Q112 116 142 114 Q172 116 172 144 Q172 152 162 152 L122 152 Q112 152 112 146 Z" fill="' + O + '" ' + LN + '/>' +
 '<path d="M120 140 Q124 124 140 120" fill="none" stroke="' + G + '" stroke-width="4" stroke-linecap="round"/>'
},

/* ---- पौधा (धूप-मिट्टी वाला) ---- */
plant: { name: "पौधा", kw: ["पौधा","खेत","धूप","पत्ता","हरा"], svg:
 '<circle cx="160" cy="42" r="20" fill="' + G + '" ' + LN3 + '/>' +
 '<g ' + LN3 + '><line x1="160" y1="10" x2="160" y2="20"/><line x1="160" y1="64" x2="160" y2="74"/><line x1="128" y1="42" x2="138" y2="42"/><line x1="182" y1="42" x2="192" y2="42"/><line x1="138" y1="20" x2="145" y2="27"/><line x1="175" y1="57" x2="182" y2="64"/><line x1="182" y1="20" x2="175" y2="27"/></g>' +
 '<path d="M30 160 Q100 140 190 160 L190 200 L30 200 Z" fill="' + LG + '" ' + LN + '/>' +
 '<line x1="95" y1="158" x2="95" y2="86" stroke="' + GR + '" stroke-width="5" stroke-linecap="round"/>' +
 '<path d="M95 120 Q60 112 52 84 Q88 86 95 116 Z" fill="' + GR + '" ' + LN3 + '/>' +
 '<path d="M95 100 Q130 92 140 64 Q102 66 95 96 Z" fill="' + GR + '" ' + LN3 + '/>' +
 '<g stroke="' + N + '" stroke-width="3" stroke-dasharray="5 5" fill="none"><path d="M95 160 L70 190"/><path d="M95 160 L95 194"/><path d="M95 160 L122 190"/></g>'
},

/* ---- कवक-जाल (mycelium) ---- */
mycelium: { name: "कवक-जाल", kw: ["जाल","जाला","धागा","माइसीलियम","जीवन-चक्र","फैल"], svg:
 '<rect x="20" y="20" width="160" height="70" rx="10" fill="' + LG + '" ' + LN + '/>' +
 '<path d="M55 90 Q60 60 75 44 M100 90 Q100 52 100 36 M145 90 Q140 58 126 44" fill="none" ' + LN3 + '/>' +
 '<rect x="20" y="90" width="160" height="92" rx="10" fill="' + O + '" ' + LN + '/>' +
 '<g stroke="' + B + '" stroke-width="3" fill="none" stroke-linecap="round">' +
 '<path d="M100 96 Q70 110 46 118 M100 96 Q96 130 86 156 M100 96 Q128 112 152 120 M100 96 Q112 134 120 160"/>' +
 '<path d="M46 118 Q38 134 34 150 M46 118 Q60 132 58 152 M152 120 Q162 136 164 154 M152 120 Q140 138 142 160 M86 156 Q74 166 64 172 M120 160 Q132 168 144 174"/></g>' +
 '<circle cx="100" cy="96" r="7" fill="' + G + '" ' + LN3 + '/>'
},

/* ---- लटकता थैला (बैग-खेती) ---- */
bag: { name: "मशरूम-थैला", kw: ["थैला","बैग","बोरा","टाँग","लटका"], svg:
 '<line x1="20" y1="18" x2="180" y2="18" ' + LN + '/>' +
 '<path d="M100 18 L100 40" ' + LN + '/>' +
 '<path d="M64 46 Q100 30 136 46 L140 170 Q100 186 60 170 Z" fill="' + B + '" ' + LN + '/>' +
 '<path d="M64 46 Q100 62 136 46" fill="none" ' + LN3 + ' stroke="' + O + '"/>' +
 '<g fill="' + W + '" ' + LN3 + '>' +
 '<path d="M56 92 Q42 90 40 78 Q56 74 62 86 Z"/><path d="M146 108 Q160 106 162 94 Q146 90 140 102 Z"/>' +
 '<path d="M58 140 Q44 138 42 126 Q58 122 64 134 Z"/></g>' +
 '<circle cx="88" cy="96" r="4" fill="' + N + '"/><circle cx="116" cy="120" r="4" fill="' + N + '"/><circle cx="92" cy="148" r="4" fill="' + N + '"/>'
},

/* ---- कम्पोस्ट ढेर (भाप उठती) ---- */
compost: { name: "कम्पोस्ट", kw: ["कम्पोस्ट","खाद","ढेर","गोबर","पलटाई"], svg:
 '<path d="M20 176 Q30 120 70 108 Q100 70 140 100 Q176 108 182 176 Z" fill="' + LG + '" ' + LN + '/>' +
 '<g stroke="' + GR + '" stroke-width="4" fill="none" stroke-linecap="round">' +
 '<path d="M48 150 Q64 142 80 150 M92 132 Q108 124 124 132 M120 158 Q136 150 152 158 M62 168 Q78 160 94 168"/></g>' +
 '<g stroke="' + B + '" stroke-width="4" fill="none" stroke-linecap="round">' +
 '<path d="M70 92 Q62 76 70 60 Q78 46 72 32"/><path d="M104 84 Q96 68 104 52 Q112 38 106 24"/><path d="M138 92 Q130 76 138 60 Q146 46 140 32"/></g>'
},

/* ---- पुआल-गट्ठर ---- */
straw: { name: "पुआल", kw: ["पुआल","भूसा","सब्सट्रेट","बेड","कटाई"], svg:
 '<g stroke="' + G + '" stroke-width="6" stroke-linecap="round">' +
 '<line x1="30" y1="60" x2="170" y2="88"/><line x1="28" y1="84" x2="172" y2="100"/><line x1="30" y1="108" x2="170" y2="112"/>' +
 '<line x1="32" y1="132" x2="168" y2="124"/><line x1="34" y1="152" x2="166" y2="140"/></g>' +
 '<g ' + LN3 + ' fill="none"><line x1="30" y1="60" x2="170" y2="88"/><line x1="34" y1="152" x2="166" y2="140"/></g>' +
 '<ellipse cx="100" cy="106" rx="26" ry="52" fill="none" stroke="' + GR + '" stroke-width="5"/>' +
 '<line x1="100" y1="54" x2="100" y2="158" stroke="' + GR + '" stroke-width="4"/>'
},

/* ---- Spawn-जार (बीज) ---- */
jar: { name: "Spawn (बीज) जार", kw: ["स्पॉन","बीज","जार","बोतल","दाना"], svg:
 '<rect x="66" y="26" width="68" height="20" rx="6" fill="' + B + '" ' + LN + '/>' +
 '<path d="M60 46 L140 46 L146 70 L146 168 Q146 182 132 182 L68 182 Q54 182 54 168 L54 70 Z" fill="' + W + '" ' + LN + '/>' +
 '<rect x="62" y="96" width="76" height="78" rx="8" fill="' + LG + '"/>' +
 '<g fill="' + O + '" stroke="' + N + '" stroke-width="2">' +
 '<circle cx="76" cy="112" r="6"/><circle cx="96" cy="106" r="6"/><circle cx="118" cy="112" r="6"/><circle cx="86" cy="128" r="6"/><circle cx="108" cy="126" r="6"/><circle cx="126" cy="132" r="6"/><circle cx="74" cy="146" r="6"/><circle cx="96" cy="144" r="6"/><circle cx="118" cy="150" r="6"/><circle cx="84" cy="164" r="6"/><circle cx="106" cy="162" r="6"/></g>' +
 '<path d="M66 84 Q100 76 134 84" fill="none" stroke="' + B + '" stroke-width="3"/>'
},

/* ---- उगाई-कमरा (rack सहित) ---- */
room: { name: "उगाई-कमरा", kw: ["कमरा","झोपड़ी","रैक","ढाँचा","अंधेरा","जगह"], svg:
 '<path d="M24 86 L100 26 L176 86 Z" fill="' + G + '" ' + LN + '/>' +
 '<rect x="36" y="86" width="128" height="96" fill="' + O + '" ' + LN + '/>' +
 '<g ' + LN3 + '><line x1="52" y1="106" x2="148" y2="106"/><line x1="52" y1="136" x2="148" y2="136"/><line x1="52" y1="166" x2="148" y2="166"/>' +
 '<line x1="58" y1="98" x2="58" y2="176"/><line x1="142" y1="98" x2="142" y2="176"/></g>' +
 '<g fill="' + B + '"><rect x="70" y="112" width="16" height="20" rx="4"/><rect x="102" y="112" width="16" height="20" rx="4"/>' +
 '<rect x="70" y="142" width="16" height="20" rx="4"/><rect x="102" y="142" width="16" height="20" rx="4"/></g>'
},

/* ---- थर्मामीटर ---- */
thermo: { name: "तापमान", kw: ["तापमान","गर्मी","ठंडक","डिग्री","सर्दी","मौसम"], svg:
 '<rect x="84" y="20" width="32" height="120" rx="16" fill="' + W + '" ' + LN + '/>' +
 '<circle cx="100" cy="160" r="30" fill="' + G + '" ' + LN + '/>' +
 '<rect x="93" y="70" width="14" height="76" fill="' + G + '"/>' +
 '<g ' + LN3 + '><line x1="116" y1="44" x2="130" y2="44"/><line x1="116" y1="68" x2="130" y2="68"/><line x1="116" y1="92" x2="130" y2="92"/><line x1="116" y1="116" x2="130" y2="116"/></g>'
},

/* ---- नमी-बूँद ---- */
drop: { name: "नमी", kw: ["नमी","पानी","भिगा","गीला","सूखा"], svg:
 '<path d="M100 24 Q150 92 150 128 Q150 176 100 176 Q50 176 50 128 Q50 92 100 24 Z" fill="' + B + '" ' + LN + '/>' +
 '<path d="M78 130 Q78 152 98 158" fill="none" stroke="' + O + '" stroke-width="6" stroke-linecap="round"/>' +
 '<circle cx="72" cy="110" r="5" fill="' + O + '"/>'
},

/* ---- फुहारा (spray) ---- */
spray: { name: "फुहारा", kw: ["फुहारा","छिड़काव","स्प्रे","पानी देना"], svg:
 '<rect x="52" y="86" width="64" height="94" rx="12" fill="' + GR + '" ' + LN + '/>' +
 '<rect x="66" y="56" width="24" height="30" fill="' + O + '" ' + LN + '/>' +
 '<path d="M66 56 L110 56 L110 40 L134 40" fill="none" ' + LN + '/>' +
 '<rect x="128" y="30" width="18" height="20" rx="5" fill="' + B + '" ' + LN + '/>' +
 '<g fill="' + B + '"><circle cx="160" cy="26" r="4"/><circle cx="172" cy="38" r="4"/><circle cx="162" cy="52" r="4"/><circle cx="176" cy="62" r="4"/><circle cx="164" cy="74" r="4"/></g>' +
 '<path d="M62 112 Q84 104 106 112" fill="none" stroke="' + O + '" stroke-width="4" stroke-linecap="round"/>'
},

/* ---- हाथ-धुलाई/सफ़ाई ---- */
wash: { name: "सफ़ाई", kw: ["सफ़ाई","धो","साबुन","स्वच्छ","हाइजीन","जीवाणु"], svg:
 '<path d="M40 120 Q40 96 62 96 L96 96 L96 76 Q96 64 108 64 Q120 64 120 76 L120 120 Q120 168 84 176 Q40 168 40 120 Z" fill="' + LG + '" ' + LN + '/>' +
 '<g ' + LN3 + '><line x1="58" y1="96" x2="58" y2="128"/><line x1="74" y1="96" x2="74" y2="132"/><line x1="90" y1="96" x2="90" y2="132"/></g>' +
 '<g fill="' + B + '" opacity="0.9"><circle cx="140" cy="60" r="10"/><circle cx="162" cy="80" r="7"/><circle cx="146" cy="100" r="6"/><circle cx="168" cy="46" r="5"/><circle cx="150" cy="128" r="5"/></g>' +
 '<circle cx="140" cy="60" r="3" fill="' + W + '"/><circle cx="162" cy="80" r="2.5" fill="' + W + '"/>'
},

/* ---- चाकू-तुड़ाई ---- */
knife: { name: "तुड़ाई", kw: ["तुड़ाई","काट","चाकू","तोड़"], svg:
 '<path d="M40 168 Q38 140 52 136 L64 136 Q74 140 72 168 Z" fill="' + W + '" ' + LN + '/>' +
 '<path d="M24 140 Q26 104 58 102 Q90 104 90 138 Q90 146 80 146 L34 146 Q24 146 24 140 Z" fill="' + O + '" ' + LN + '/>' +
 '<rect x="118" y="30" width="20" height="52" rx="8" fill="' + GR + '" ' + LN + '/>' +
 '<path d="M122 82 Q112 140 128 172 Q148 150 142 82 Z" fill="' + O + '" ' + LN + '/>' +
 '<path d="M96 150 L114 158" stroke="' + G + '" stroke-width="6" stroke-linecap="round"/>'
},

/* ---- तराज़ू / तौल ---- */
scale: { name: "तौल", kw: ["तौल","वज़न","किलो","ग्राम","तराज़ू"], svg:
 '<rect x="36" y="130" width="128" height="46" rx="12" fill="' + B + '" ' + LN + '/>' +
 '<rect x="56" y="142" width="56" height="22" rx="6" fill="' + O + '" ' + LN3 + '/>' +
 '<circle cx="142" cy="153" r="9" fill="' + G + '" ' + LN3 + '/>' +
 '<rect x="46" y="112" width="108" height="18" rx="8" fill="' + O + '" ' + LN + '/>' +
 '<path d="M78 108 Q76 92 86 88 L94 88 Q102 92 100 108 Z" fill="' + W + '" ' + LN3 + '/>' +
 '<path d="M64 92 Q66 68 90 66 Q114 68 114 90 Q114 96 106 96 L72 96 Q64 96 64 92 Z" fill="' + O + '" ' + LN + '/>' +
 '<path d="M120 106 Q118 96 124 92 L130 92 Q136 96 134 106 Z" fill="' + W + '" ' + LN3 + '/>' +
 '<path d="M110 94 Q112 78 128 76 Q144 78 144 92 Q144 96 138 96 L116 96 Q110 96 110 94 Z" fill="' + O + '" ' + LN3 + '/>'
},

/* ---- पैकिंग-डिब्बा ---- */
box: { name: "पैकिंग", kw: ["पैक","डिब्बा","पन्नी","भरना","क्रेट"], svg:
 '<path d="M30 80 L100 52 L170 80 L170 160 L100 188 L30 160 Z" fill="' + G + '" ' + LN + '/>' +
 '<path d="M30 80 L100 108 L170 80 M100 108 L100 188" fill="none" ' + LN + '/>' +
 '<path d="M62 66 L132 94" fill="none" ' + LN3 + ' stroke="' + O + '"/>' +
 '<path d="M52 108 Q50 96 58 94 Q66 96 64 108 Q66 114 58 114 Q50 114 52 108 Z" fill="' + W + '" ' + LN3 + '/>' +
 '<path d="M78 120 Q76 108 84 106 Q92 108 90 120 Q92 126 84 126 Q76 126 78 120 Z" fill="' + W + '" ' + LN3 + '/>'
},

/* ---- हाट/दुकान ---- */
shop: { name: "बाज़ार", kw: ["बाज़ार","हाट","दुकान","बेच","ग्राहक","मंडी","होटल"], svg:
 '<rect x="30" y="96" width="140" height="84" fill="' + O + '" ' + LN + '/>' +
 '<path d="M20 96 L100 40 L180 96 Z" fill="' + GR + '" ' + LN + '/>' +
 '<g stroke="' + W + '" stroke-width="6"><line x1="58" y1="90" x2="76" y2="66"/><line x1="94" y1="90" x2="100" y2="58"/><line x1="130" y1="90" x2="122" y2="64"/></g>' +
 '<rect x="46" y="118" width="108" height="26" rx="8" fill="' + G + '" ' + LN3 + '/>' +
 '<g fill="' + W + '" stroke="' + N + '" stroke-width="2.5">' +
 '<path d="M60 118 Q58 108 66 106 Q74 108 72 118 Z"/><path d="M86 118 Q84 108 92 106 Q100 108 98 118 Z"/><path d="M112 118 Q110 108 118 106 Q126 108 124 118 Z"/><path d="M136 118 Q134 108 142 106 Q148 108 146 118 Z"/></g>' +
 '<rect x="84" y="152" width="32" height="28" fill="' + B + '" ' + LN3 + '/>'
},

/* ---- फ़ोन (डिजिटल बिक्री/AI) ---- */
phone: { name: "मोबाइल", kw: ["ऑनलाइन","डिजिटल","फ़ोन","मोबाइल","app","व्हाट्सएप","सोशल"], svg:
 '<rect x="60" y="20" width="80" height="160" rx="16" fill="' + N + '" ' + LN + '/>' +
 '<rect x="70" y="38" width="60" height="118" rx="6" fill="' + O + '"/>' +
 '<circle cx="100" cy="168" r="7" fill="' + O + '"/>' +
 '<rect x="78" y="50" width="44" height="26" rx="5" fill="' + B + '"/>' +
 '<rect x="78" y="84" width="44" height="10" rx="5" fill="' + G + '"/>' +
 '<rect x="78" y="100" width="30" height="10" rx="5" fill="' + G + '"/>' +
 '<path d="M84 132 L94 142 L116 118" fill="none" stroke="' + GR + '" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>'
},

/* ---- AI-सहायक ---- */
ai: { name: "AI-सहायक", kw: ["AI","सवाल","पूछ","chat","जवाब","सहायक"], svg:
 '<rect x="44" y="52" width="112" height="88" rx="18" fill="' + B + '" ' + LN + '/>' +
 '<circle cx="80" cy="92" r="12" fill="' + W + '"/><circle cx="120" cy="92" r="12" fill="' + W + '"/>' +
 '<circle cx="80" cy="92" r="5" fill="' + N + '"/><circle cx="120" cy="92" r="5" fill="' + N + '"/>' +
 '<path d="M78 118 Q100 130 122 118" fill="none" stroke="' + W + '" stroke-width="5" stroke-linecap="round"/>' +
 '<line x1="100" y1="52" x2="100" y2="34" ' + LN + '/><circle cx="100" cy="28" r="7" fill="' + G + '" ' + LN3 + '/>' +
 '<path d="M70 140 L64 166 L92 148" fill="' + B + '" ' + LN3 + '/>' +
 '<rect x="128" y="148" width="48" height="30" rx="10" fill="' + LG + '" ' + LN3 + '/>' +
 '<text x="152" y="170" font-size="20" font-weight="700" fill="' + N + '" text-anchor="middle">?</text>'
},

/* ---- रुपया / कमाई ---- */
money: { name: "कमाई", kw: ["पैसा","कमाई","दाम","लागत","मुनाफ़ा","भाव","रुपये","बचत"], svg:
 '<circle cx="76" cy="120" r="52" fill="' + G + '" ' + LN + '/>' +
 '<circle cx="76" cy="120" r="38" fill="none" ' + LN3 + '/>' +
 '<text x="76" y="138" font-size="52" font-weight="700" fill="' + N + '" text-anchor="middle">₹</text>' +
 '<circle cx="142" cy="88" r="34" fill="' + G + '" ' + LN + '/>' +
 '<circle cx="142" cy="88" r="23" fill="none" ' + LN3 + '/>' +
 '<text x="142" y="100" font-size="34" font-weight="700" fill="' + N + '" text-anchor="middle">₹</text>'
},

/* ---- हिसाब-किताब / रजिस्टर ---- */
book: { name: "हिसाब-किताब", kw: ["हिसाब","रजिस्टर","लिख","खाता","रिकॉर्ड","पत्र","सूची","योजना"], svg:
 '<path d="M100 44 Q60 28 28 40 L28 164 Q60 152 100 168 Q140 152 172 164 L172 40 Q140 28 100 44 Z" fill="' + O + '" ' + LN + '/>' +
 '<line x1="100" y1="44" x2="100" y2="168" ' + LN + '/>' +
 '<g stroke="' + B + '" stroke-width="4" stroke-linecap="round"><line x1="44" y1="66" x2="86" y2="60"/><line x1="44" y1="88" x2="86" y2="82"/><line x1="44" y1="110" x2="86" y2="104"/><line x1="114" y1="60" x2="156" y2="66"/><line x1="114" y1="82" x2="156" y2="88"/></g>' +
 '<path d="M114 118 L126 130 L152 100" fill="none" stroke="' + GR + '" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>' +
 '<path d="M150 150 L176 122 L184 130 L158 158 L148 160 Z" fill="' + G + '" ' + LN3 + '/>'
},

/* ---- ख़तरा-तिकोना ---- */
danger: { name: "सावधानी", kw: ["ख़तरा","सावधानी","जोखिम","ज़हर","बिजली","आग","रसायन","दवा"], svg:
 '<path d="M100 24 L184 172 L16 172 Z" fill="' + G + '" ' + LN + '/>' +
 '<rect x="92" y="70" width="16" height="56" rx="8" fill="' + N + '"/>' +
 '<circle cx="100" cy="148" r="10" fill="' + N + '"/>'
},

/* ---- जाँच-सूची ---- */
check: { name: "जाँच-सूची", kw: ["जाँच","परख","सही","गुणवत्ता","निशान","कसौटी"], svg:
 '<rect x="44" y="28" width="112" height="152" rx="14" fill="' + O + '" ' + LN + '/>' +
 '<rect x="76" y="16" width="48" height="24" rx="8" fill="' + B + '" ' + LN3 + '/>' +
 '<g fill="' + W + '" stroke="' + N + '" stroke-width="3"><rect x="58" y="60" width="22" height="22" rx="5"/><rect x="58" y="98" width="22" height="22" rx="5"/><rect x="58" y="136" width="22" height="22" rx="5"/></g>' +
 '<g fill="none" stroke="' + GR + '" stroke-width="5" stroke-linecap="round"><path d="M62 70 L68 78 L78 62"/><path d="M62 108 L68 116 L78 100"/></g>' +
 '<g stroke="' + B + '" stroke-width="4" stroke-linecap="round"><line x1="92" y1="71" x2="140" y2="71"/><line x1="92" y1="109" x2="140" y2="109"/><line x1="92" y1="147" x2="140" y2="147"/></g>'
},

/* ---- भाप-ड्रम (पाश्चुरीकरण) ---- */
steam: { name: "भाप-ड्रम", kw: ["भाप","उबाल","पाश्चुर","ड्रम","गरम पानी"], svg:
 '<rect x="52" y="76" width="96" height="104" rx="14" fill="' + B + '" ' + LN + '/>' +
 '<ellipse cx="100" cy="76" rx="48" ry="14" fill="' + O + '" ' + LN + '/>' +
 '<g stroke="' + O + '" stroke-width="4" stroke-linecap="round"><line x1="66" y1="104" x2="66" y2="150"/><line x1="134" y1="104" x2="134" y2="150"/></g>' +
 '<g stroke="' + N + '" stroke-width="5" fill="none" stroke-linecap="round"><path d="M72 60 Q64 46 72 32"/><path d="M100 56 Q92 42 100 26"/><path d="M128 60 Q120 46 128 32"/></g>' +
 '<path d="M40 128 L52 128 M148 128 L160 128" ' + LN + '/>'
},

/* ---- हवा / झरोखा ---- */
fan: { name: "हवा-आवाजाही", kw: ["हवा","झरोखा","खिड़की","घुटन","ताज़ा"], svg:
 '<rect x="36" y="36" width="128" height="128" rx="16" fill="' + O + '" ' + LN + '/>' +
 '<circle cx="100" cy="100" r="14" fill="' + B + '" ' + LN3 + '/>' +
 '<g fill="' + B + '" ' + LN3 + '>' +
 '<path d="M100 86 Q86 56 104 42 Q124 58 112 84 Z"/><path d="M114 100 Q144 86 158 104 Q142 124 116 112 Z"/>' +
 '<path d="M100 114 Q114 144 96 158 Q76 142 88 116 Z"/><path d="M86 100 Q56 114 42 96 Q58 76 84 88 Z"/></g>'
},

/* ---- किसान / लोग ---- */
people: { name: "किसान-परिवार", kw: ["किसान","महिला","परिवार","समूह","लोग","युवा","बहन"], svg:
 '<circle cx="70" cy="60" r="22" fill="' + LG + '" ' + LN + '/>' +
 '<path d="M40 56 Q52 30 84 38 Q100 44 96 58 Z" fill="' + G + '" ' + LN3 + '/>' +
 '<path d="M42 176 Q42 110 70 108 Q98 110 98 176 Z" fill="' + GR + '" ' + LN + '/>' +
 '<circle cx="138" cy="66" r="20" fill="' + LG + '" ' + LN + '/>' +
 '<path d="M118 62 Q120 40 138 40 Q158 40 158 66 L152 88 L124 88 Z" fill="' + N + '" fill-opacity="0.9"/>' +
 '<path d="M112 176 Q112 116 138 114 Q164 116 164 176 Z" fill="' + B + '" ' + LN + '/>' +
 '<circle cx="152" cy="106" r="5" fill="' + G + '"/>'
},

/* ---- बढ़त-चार्ट ---- */
chart: { name: "बढ़त", kw: ["बढ़","तरक़्क़ी","स्केल","बड़ा","विस्तार","स्तर","सीढ़ी"], svg:
 '<g ' + LN + '><line x1="36" y1="24" x2="36" y2="172"/><line x1="36" y1="172" x2="180" y2="172"/></g>' +
 '<rect x="52" y="128" width="26" height="44" fill="' + B + '" ' + LN3 + '/>' +
 '<rect x="90" y="96" width="26" height="76" fill="' + B + '" ' + LN3 + '/>' +
 '<rect x="128" y="60" width="26" height="112" fill="' + GR + '" ' + LN3 + '/>' +
 '<path d="M52 116 Q100 70 148 44" fill="none" stroke="' + G + '" stroke-width="6" stroke-linecap="round"/>' +
 '<path d="M148 44 L172 32 L162 58 Z" fill="' + G + '" ' + LN3 + '/>'
},

/* ---- कैलेंडर / दिन-चक्र ---- */
calendar: { name: "दिन-योजना", kw: ["दिन","हफ़्ता","चक्र","तारीख़","समय","रोज़"], svg:
 '<rect x="36" y="44" width="128" height="132" rx="14" fill="' + O + '" ' + LN + '/>' +
 '<rect x="36" y="44" width="128" height="34" rx="14" fill="' + B + '"/>' +
 '<g ' + LN + '><line x1="66" y1="30" x2="66" y2="58"/><line x1="134" y1="30" x2="134" y2="58"/></g>' +
 '<g fill="' + N + '"><circle cx="66" cy="102" r="7"/><circle cx="100" cy="102" r="7"/><circle cx="134" cy="102" r="7"/><circle cx="66" cy="132" r="7"/><circle cx="100" cy="132" r="7"/></g>' +
 '<circle cx="134" cy="132" r="12" fill="' + G + '" ' + LN3 + '/>' +
 '<circle cx="66" cy="158" r="7" fill="' + N + '"/>'
},

/* ---- गाड़ी / पहुँचाना ---- */
truck: { name: "पहुँचाना", kw: ["गाड़ी","ढुलाई","पहुँच","ट्रक","निर्यात","भेज"], svg:
 '<rect x="20" y="76" width="98" height="66" rx="10" fill="' + B + '" ' + LN + '/>' +
 '<path d="M118 96 L152 96 L172 120 L172 142 L118 142 Z" fill="' + O + '" ' + LN + '/>' +
 '<rect x="128" y="104" width="24" height="20" rx="4" fill="' + B + '"/>' +
 '<circle cx="56" cy="150" r="18" fill="' + N + '" ' + LN3 + '/><circle cx="56" cy="150" r="7" fill="' + O + '"/>' +
 '<circle cx="146" cy="150" r="18" fill="' + N + '" ' + LN3 + '/><circle cx="146" cy="150" r="7" fill="' + O + '"/>' +
 '<path d="M34 96 Q36 88 44 88 Q50 90 48 96 Q50 100 44 100 Q36 100 34 96 Z" fill="' + W + '" stroke="' + N + '" stroke-width="2.5"/>' +
 '<path d="M58 96 Q60 88 68 88 Q74 90 72 96 Q74 100 68 100 Q60 100 58 96 Z" fill="' + W + '" stroke="' + N + '" stroke-width="2.5"/>'
},

/* ---- केसिंग-ट्रे (मिट्टी-परत) ---- */
casing: { name: "केसिंग-परत", kw: ["केसिंग","परत","ट्रे","मिट्टी","बिछा"], svg:
 '<path d="M28 96 L172 96 L160 168 L40 168 Z" fill="' + B + '" ' + LN + '/>' +
 '<rect x="36" y="76" width="128" height="24" rx="8" fill="' + LG + '" ' + LN + '/>' +
 '<g fill="' + N + '"><circle cx="60" cy="88" r="3"/><circle cx="84" cy="86" r="3"/><circle cx="110" cy="88" r="3"/><circle cx="136" cy="86" r="3"/></g>' +
 '<g fill="' + W + '" stroke="' + N + '" stroke-width="2.5">' +
 '<path d="M62 76 Q60 64 68 62 Q76 64 74 76 Z"/><path d="M108 76 Q106 62 114 60 Q122 62 120 76 Z"/><path d="M142 76 Q140 66 148 64 Q154 66 152 76 Z"/></g>' +
 '<path d="M52 128 Q100 118 148 128" fill="none" stroke="' + O + '" stroke-width="4" stroke-linecap="round"/>'
},

/* ---- बल्ब (नई सोच) ---- */
bulb: { name: "नई सोच", kw: ["सोच","फ़ैसला","सपना","नवाचार","तरीक़ा","समझ"], svg:
 '<circle cx="100" cy="86" r="52" fill="' + G + '" ' + LN + '/>' +
 '<path d="M84 132 L116 132 L112 156 L88 156 Z" fill="' + O + '" ' + LN + '/>' +
 '<rect x="88" y="156" width="24" height="12" rx="5" fill="' + B + '" ' + LN3 + '/>' +
 '<path d="M86 96 Q92 76 108 72" fill="none" stroke="' + W + '" stroke-width="5" stroke-linecap="round"/>' +
 '<g ' + LN3 + '><line x1="100" y1="14" x2="100" y2="26"/><line x1="42" y1="40" x2="52" y2="48"/><line x1="158" y1="40" x2="148" y2="48"/><line x1="30" y1="86" x2="42" y2="86"/><line x1="158" y1="86" x2="170" y2="86"/></g>'
},

/* ---- खोज / जाँच-शीशा ---- */
search: { name: "पहचान-जाँच", kw: ["पहचान","देख","खोज","समस्या","कीड़ा","रोग","लक्षण"], svg:
 '<circle cx="86" cy="86" r="52" fill="' + O + '" ' + LN + '/>' +
 '<circle cx="86" cy="86" r="36" fill="' + LG + '" ' + LN3 + '/>' +
 '<path d="M124 124 L168 168" stroke="' + N + '" stroke-width="16" stroke-linecap="round"/>' +
 '<path d="M70 92 Q68 78 78 76 Q88 78 86 92 Q88 98 78 98 Q68 98 70 92 Z" fill="' + W + '" ' + LN3 + '/>' +
 '<path d="M96 86 Q104 70 112 82" fill="none" stroke="' + GR + '" stroke-width="4" stroke-linecap="round"/>'
}
};

if (typeof module !== "undefined") module.exports = { MOTIFS };
