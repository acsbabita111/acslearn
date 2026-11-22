/* ============================================================
   lib_xlsx.js v1.0 (परत-4 का साझा हिस्सा, 22-Nov-2026, खेप N-1) : Excel (.xlsx) की शीट पढ़ने का छोटा यंत्र
   किसी बाहरी package के बिना (सिर्फ़ Node का fs और zlib), ताकि office पर Excel को CSV में बदलना न पड़े।
   .xlsx = zip; उसके भीतर xl/workbook.xml (शीटों के नाम), xl/_rels/workbook.xml.rels (शीट की फ़ाइल),
   xl/sharedStrings.xml (साझा पाठ), xl/worksheets/sheetN.xml (cells)। सिर्फ़ पढ़ता है, कुछ नहीं लिखता।
   सीमा: सूत्र (formula) का सहेजा हुआ नतीजा ही पढ़ता है; तारीख़ें संख्या के रूप में आती हैं (नेटवर्क-data में तारीख़ नहीं)।
   ZIP64 (4 GB से बड़ी) फ़ाइलें नहीं।
   उपयोग:  const X = require("./lib_xlsx.js");  X.sheetNames(file)  ·  X.readSheet(file, "शीट का नाम") → [[cell, …], …]
   ============================================================ */
"use strict";
const fs = require("fs"), zlib = require("zlib");

function unzip(buf) {
  let e = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) if (buf.readUInt32LE(i) === 0x06054b50) { e = i; break; }
  if (e < 0) throw new Error("xlsx: zip का अंत-निशान नहीं मिला (फ़ाइल .xlsx नहीं, या टूटी है)");
  const n = buf.readUInt16LE(e + 10), cdOff = buf.readUInt32LE(e + 16);
  const files = {};
  let p = cdOff;
  for (let k = 0; k < n; k++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error("xlsx: zip-सूची टूटी");
    const method = buf.readUInt16LE(p + 10), csize = buf.readUInt32LE(p + 20), nlen = buf.readUInt16LE(p + 28),
          xlen = buf.readUInt16LE(p + 30), clen = buf.readUInt16LE(p + 32), lho = buf.readUInt32LE(p + 42);
    const name = buf.toString("utf8", p + 46, p + 46 + nlen);
    if (buf.readUInt32LE(lho) !== 0x04034b50) throw new Error("xlsx: zip-फ़ाइल का सिर टूटा: " + name);
    const start = lho + 30 + buf.readUInt16LE(lho + 26) + buf.readUInt16LE(lho + 28);
    const raw = buf.subarray(start, start + csize);
    files[name] = { method, raw };
    p += 46 + nlen + xlen + clen;
  }
  return (name) => {
    const f = files[name]; if (!f) return null;
    let x;
    if (f.method === 0) x = f.raw.toString("utf8");
    else if (f.method === 8) x = zlib.inflateRawSync(f.raw).toString("utf8");
    else throw new Error("xlsx: अनजान zip-दबाव " + f.method + " (" + name + ")");
    return x.replace(/<(\/?)[A-Za-z][\w.-]*:(?=[A-Za-z])/g, "<$1");   /* tag के namespace-उपसर्ग (<x:sheet → <sheet); attribute (r:id) अछूते */
  };
}
function unxml(s) {
  return s.replace(/&(#x[0-9a-fA-F]+|#\d+|amp|lt|gt|quot|apos);/g, (a, c) =>
    c[0] === "#" ? String.fromCodePoint(c[1] === "x" ? parseInt(c.slice(2), 16) : parseInt(c.slice(1), 10))
                 : { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" }[c]);
}
function texts(xml) { let out = ""; xml.replace(/<t(?:\s[^>]*)?>([\s\S]*?)<\/t>|<t(?:\s[^>]*)?\/>/g, (a, t) => { out += t ? unxml(t) : ""; return a; }); return out; }
function open(file) {
  const get = unzip(fs.readFileSync(file));
  const wb = get("xl/workbook.xml"); if (!wb) throw new Error("xlsx: xl/workbook.xml नहीं");
  const rels = get("xl/_rels/workbook.xml.rels") || "";
  const rel = {}; rels.replace(/<Relationship\b[^>]*>/g, (t) => { const id = (t.match(/\sId="([^"]+)"/) || [])[1], tg = (t.match(/\sTarget="([^"]+)"/) || [])[1]; if (id && tg) rel[id] = tg; return t; });
  const sheets = [];
  wb.replace(/<sheet\b[^>]*>/g, (t) => {
    const name = unxml((t.match(/\sname="([^"]*)"/) || [])[1] || ""), rid = (t.match(/\sr:id="([^"]+)"/) || [])[1];
    let tg = rel[rid] || ""; tg = tg.replace(/^\/?xl\//, "").replace(/^\//, "");
    sheets.push({ name, path: "xl/" + tg }); return t;
  });
  const ss = []; const sx = get("xl/sharedStrings.xml");
  if (sx) sx.replace(/<si>([\s\S]*?)<\/si>|<si\/>/g, (a, inner) => { ss.push(inner ? texts(inner) : ""); return a; });
  return { get, sheets, ss };
}
function colIndex(ref) { const m = /^([A-Z]+)/.exec(ref); let n = 0; for (const ch of m[1]) n = n * 26 + (ch.charCodeAt(0) - 64); return n - 1; }
function num(v) {
  if (/^-?\d+(\.\d+)?[eE][+-]?\d+$/.test(v)) { const x = Number(v); return Number.isInteger(x) ? String(x) : String(x); }
  return v;
}
function sheetNames(file) { return open(file).sheets.map((s) => s.name); }
function readSheet(file, name) {
  const X = open(file), sh = X.sheets.find((s) => s.name === name);
  if (!sh) throw new Error("xlsx: शीट नहीं मिली: \"" + name + "\" (हैं: " + X.sheets.map((s) => s.name).join(", ") + ")");
  const xml = X.get(sh.path); if (!xml) throw new Error("xlsx: शीट की फ़ाइल नहीं: " + sh.path);
  const rows = [];
  xml.replace(/<row\b([^>]*)>([\s\S]*?)<\/row>|<row\b([^>]*)\/>/g, (a, ra, inner, rb) => {
    const r = +(((ra || rb || "").match(/\sr="(\d+)"/) || [])[1] || rows.length + 1);
    const row = [];
    (inner || "").replace(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g, (b, ca, cin) => {
      const ref = (ca.match(/\sr="([A-Z]+\d+)"/) || [])[1], t = (ca.match(/\st="([^"]+)"/) || [])[1] || "n";
      let v = null;
      if (cin) {
        if (t === "inlineStr") v = texts((cin.match(/<is>([\s\S]*?)<\/is>/) || [, ""])[1]);
        else { const vm = cin.match(/<v>([\s\S]*?)<\/v>/); if (vm) { const raw = unxml(vm[1]); v = t === "s" ? X.ss[+raw] : t === "b" ? (raw === "1") : (t === "n" ? num(raw) : raw); } }
      }
      const ci = ref ? colIndex(ref) : row.length;
      while (row.length < ci) row.push(null);
      row[ci] = v;
      return b;
    });
    while (rows.length < r - 1) rows.push([]);
    rows[r - 1] = row;
    return a;
  });
  return rows;
}
module.exports = { sheetNames, readSheet };
