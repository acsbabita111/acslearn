#!/usr/bin/env node
/**
 * kkb_audit.js — किसी भी भाषा के पूरे कोर्स (L1+L2) की गहन-जाँच, एक कमांड में
 * इस्तेमाल: node kkb_audit.js <langCode> [foreignWord1,foreignWord2,...]
 * उदाहरण:   node kkb_audit.js szl franc,french
 *           node kkb_audit.js lij franc,french
 *
 * जाँचें (lij व szl के गहन-ऑडिट दौर से सीखी सभी):
 *  1. वाक्य-गिनती = 2150 (L1 500 + L2 1650)
 *  2. self-identity — 3 स्तर: item[0] (लिपि), item[2] (हिंदी), day.title, week.title
 *  3. ख़ाली-फ़ील्ड (item या title)
 *  4. pronoun-mismatch संदिग्ध (मैं/तुम की उलझन) — हिंदी "आप" vs पहले-व्यक्ति रूप का मेल
 *  5. दोहराव (वाक्य-स्तर) — रिपोर्ट करता है, ग़लत नहीं मानता (मास्टर-जाँच अलग से करें)
 *  6. pronunciation-column में लैटिन-टेक्स्ट छूटा तो नहीं
 *  7. square-bracket [ ]
 *  8. शब्दकोश-कवरेज (अगर lipi/<lang>_shabdkosh.js मिले)
 */
const fs = require("fs");
const path = require("path");
const ASSETS = path.join(__dirname, "..", "..", "assets");
const LIPI = path.join(__dirname, "..", "data", "lipi");

function W(p) {
  const w = {};
  new Function("window", fs.readFileSync(p, "utf8"))(w);
  return w;
}

function main() {
  const langCode = process.argv[2];
  const foreignWords = (process.argv[3] || "franc,french").split(",").map((s) => s.trim().toLowerCase());
  if (!langCode) {
    console.log("इस्तेमाल: node kkb_audit.js <langCode> [foreignWord1,foreignWord2]");
    process.exit(1);
  }

  const l1Path = path.join(ASSETS, `kkb_${langCode}_data.js`);
  const l2Path = path.join(ASSETS, `kkb2_${langCode}_data.js`);
  const hasL1 = fs.existsSync(l1Path);
  const hasL2 = fs.existsSync(l2Path);
  if (!hasL1 && !hasL2) {
    console.error("कोई फ़ाइल नहीं मिली:", l1Path, l2Path);
    process.exit(1);
  }
  const l1 = hasL1 ? W(l1Path).KKB_DATA : null;
  const l2 = hasL2 ? W(l2Path).KKB2_DATA : null;
  const sets = [l1, l2].filter(Boolean);

  console.log(`════ ${langCode} गहन-ऑडिट ════`);
  let allGood = true;

  // 1. वाक्य-गिनती
  const l1total = l1 ? l1.weeks.reduce((s, w) => s + w.days.reduce((s2, d) => s2 + d.items.length, 0), 0) : 0;
  const l2total = l2 ? l2.weeks.reduce((s, w) => s + w.days.reduce((s2, d) => s2 + d.items.length, 0), 0) : 0;
  const total = l1total + l2total;
  const expectTotal = (hasL1 ? 500 : 0) + (hasL2 ? 1650 : 0);
  const sentOk = total === expectTotal;
  console.log(`1. वाक्य: L1=${l1total} L2=${l2total} कुल=${total}/${expectTotal}`, sentOk ? "✅" : "⛔");
  if (!sentOk) allGood = false;

  // 1b. हर week के भीतर वाक्य-गिनती (L1: हर day 20, L2: week1-4=20/day, week5-11,13=30/day, week12=10/day)
  let perWeekBad = [];
  if (l1) {
    l1.weeks.forEach((w, wi) => {
      w.days.forEach((d, di) => {
        if (d.items.length !== 20) perWeekBad.push(`L1 w${wi + 1}d${di + 1}: ${d.items.length} (चाहिए 20)`);
      });
    });
  }
  if (l2) {
    l2.weeks.forEach((w, wi) => {
      const expectPerDay = wi < 4 ? 20 : wi === 11 ? 10 : 30;
      w.days.forEach((d, di) => {
        if (d.items.length !== expectPerDay)
          perWeekBad.push(`L2 w${wi + 1}d${di + 1}: ${d.items.length} (चाहिए ${expectPerDay})`);
      });
    });
  }
  console.log("1b. हर-day गिनती:", perWeekBad.length === 0 ? "✅" : "⛔ " + perWeekBad.join("; "));
  if (perWeekBad.length) allGood = false;

  // 2. self-identity — 3 स्तर
  const fRe = new RegExp(foreignWords.join("|"), "i");
  const hiRe = /फ्रेंच|फ़्रेंच|अंग्रेज़ी/;
  let selfIdBad = [];
  sets.forEach((d, di) => {
    const label = di === 0 && hasL1 ? "L1" : "L2";
    d.weeks.forEach((w, wi) => {
      if (fRe.test(w.title) || hiRe.test(w.title)) selfIdBad.push(`${label} week${wi + 1}.title: "${w.title}"`);
      w.days.forEach((day, dii) => {
        if (hiRe.test(day.title)) selfIdBad.push(`${label} w${wi + 1}d${dii + 1}.title: "${day.title}"`);
        day.items.forEach((it, ii) => {
          if (fRe.test(it[0]) || hiRe.test(it[2]))
            selfIdBad.push(`${label} w${wi + 1}d${dii + 1}i${ii}: ${JSON.stringify(it)}`);
        });
      });
    });
  });
  console.log("2. self-identity (item+day-title+week-title):", selfIdBad.length, selfIdBad.length === 0 ? "✅" : "⛔");
  selfIdBad.forEach((b) => console.log("   -", b));
  if (selfIdBad.length) allGood = false;

  // 2b. बिना-देवनागरी titles (सिर्फ़ franc/french नहीं — कोई भी अनअनुवादित अंग्रेज़ी title पकड़ना)
  let noDevBad = [];
  sets.forEach((d, di) => {
    const label = di === 0 && hasL1 ? "L1" : "L2";
    d.weeks.forEach((w, wi) => {
      if (!/[\u0900-\u097F]/.test(w.title)) noDevBad.push(`${label} week${wi + 1}.title बिना-देवनागरी: "${w.title}"`);
      w.days.forEach((day, dii) => {
        if (!/[\u0900-\u097F]/.test(day.title)) noDevBad.push(`${label} w${wi + 1}d${dii + 1}.title बिना-देवनागरी: "${day.title}"`);
      });
    });
  });
  console.log("2b. titles में देवनागरी मौजूद (कोई भी भूली-अंग्रेज़ी पकड़ना):", noDevBad.length, noDevBad.length === 0 ? "✅" : "⛔");
  noDevBad.forEach((b) => console.log("   -", b));
  if (noDevBad.length) allGood = false;

  // 3. ख़ाली-फ़ील्ड
  let emptyBad = [];
  sets.forEach((d, di) => {
    const label = di === 0 && hasL1 ? "L1" : "L2";
    d.weeks.forEach((w, wi) => {
      if (!w.title) emptyBad.push(`${label} week${wi + 1}.title ख़ाली`);
      w.days.forEach((day, dii) => {
        if (!day.title) emptyBad.push(`${label} w${wi + 1}d${dii + 1}.title ख़ाली`);
        day.items.forEach((it, ii) => {
          if (!it[0] || !it[1] || !it[2]) emptyBad.push(`${label} w${wi + 1}d${dii + 1}i${ii} ख़ाली-फ़ील्ड`);
        });
      });
    });
  });
  console.log("3. ख़ाली-फ़ील्ड:", emptyBad.length, emptyBad.length === 0 ? "✅" : "⛔");
  emptyBad.forEach((b) => console.log("   -", b));
  if (emptyBad.length) allGood = false;

  // 4. pronoun-mismatch संदिग्ध — सामान्य पैटर्न: "मैं-रूप" चिह्नित शब्द item[0] में हों पर हिंदी में "आप...सकते/करते हैं"
  // यह हर भाषा में अलग शब्द होंगे — सिर्फ़ चेतावनी है, langSpecificFirstPersonMarkers पास करने पर इस्तेमाल होगी
  console.log("4. pronoun-mismatch जाँच: भाषा-विशेष — अलग से manual spot-check सुझाया जाता है (देखें नोट नीचे)");

  // 5. दोहराव
  const seen = new Map();
  let dups = [];
  sets.forEach((d, di) => {
    const label = di === 0 && hasL1 ? "L1" : "L2";
    d.weeks.forEach((w, wi) =>
      w.days.forEach((day, dii) =>
        day.items.forEach((it, ii) => {
          const k = it[0].trim().toLowerCase();
          if (seen.has(k)) dups.push({ here: `${label} w${wi + 1}d${dii + 1}i${ii}`, first: seen.get(k), text: it[0], hi: it[2] });
          else seen.set(k, `${label} w${wi + 1}d${dii + 1}i${ii}`);
        })
      )
    );
  });
  console.log("5. दोहराव (वाक्य-स्तर, रिपोर्ट-मात्र — मास्टर से मिलाकर जाँचें):", dups.length);
  dups.forEach((d) => console.log(`   - ${d.here} == ${d.first} | "${d.text}"`));

  // 6. pronunciation-column लैटिन-टेक्स्ट
  let latinBad = [];
  sets.forEach((d, di) => {
    const label = di === 0 && hasL1 ? "L1" : "L2";
    d.weeks.forEach((w, wi) =>
      w.days.forEach((day, dii) =>
        day.items.forEach((it, ii) => {
          const latinLetters = (it[1].match(/[a-zA-Z]/g) || []).length;
          if (latinLetters > 3) latinBad.push(`${label} w${wi + 1}d${dii + 1}i${ii}: "${it[1]}"`);
        })
      )
    );
  });
  console.log("6. pronunciation-column लैटिन-टेक्स्ट:", latinBad.length, latinBad.length === 0 ? "✅" : "⛔");
  latinBad.forEach((b) => console.log("   -", b));
  if (latinBad.length) allGood = false;

  // 7. square-bracket
  let sqBad = [];
  sets.forEach((d, di) => {
    const label = di === 0 && hasL1 ? "L1" : "L2";
    d.weeks.forEach((w, wi) => {
      if (/\[|\]/.test(w.title)) sqBad.push(`${label} week${wi + 1}.title`);
      w.days.forEach((day, dii) => {
        if (/\[|\]/.test(day.title)) sqBad.push(`${label} w${wi + 1}d${dii + 1}.title`);
        day.items.forEach((it, ii) => {
          [0, 1, 2].forEach((ci) => {
            if (/\[|\]/.test(it[ci])) sqBad.push(`${label} w${wi + 1}d${dii + 1}i${ii} col${ci}`);
          });
        });
      });
    });
  });
  console.log("7. square-bracket:", sqBad.length, sqBad.length === 0 ? "✅" : "⛔");
  sqBad.forEach((b) => console.log("   -", b));
  if (sqBad.length) allGood = false;

  // 8. शब्दकोश-कवरेज
  const dictPath = path.join(LIPI, `${langCode}_shabdkosh.js`);
  if (fs.existsSync(dictPath)) {
    const dict = require(dictPath);
    const words = new Set();
    function clean(s) {
      return s.replace(/[.,?!"'।;:()_،؟۔!—–]/g, "").trim();
    }
    sets.forEach((d) =>
      d.weeks.forEach((w) =>
        w.days.forEach((day) =>
          day.items.forEach((it) => {
            clean(it[0])
              .split(/\s+/)
              .filter(Boolean)
              .forEach((x) => words.add(x.toLowerCase()));
          })
        )
      )
    );
    const missing = [...words].filter((x) => !dict[x]);
    console.log(`8. शब्दकोश-कवरेज: ${words.size - missing.length}/${words.size}`, missing.length === 0 ? "✅" : "⛔");
    if (missing.length) console.log("   छूटे शब्द:", missing.join(", "));
    if (missing.length) allGood = false;
  } else {
    console.log("8. शब्दकोश-फ़ाइल नहीं मिली:", dictPath, "(छोड़ा गया)");
  }

  console.log("");
  console.log(allGood ? "🏁 सभी जाँचें पास (नोट: दोहराव व pronoun-mismatch मैनुअल समीक्षा माँगते हैं)" : "⚠️ ऊपर की समस्याएँ ठीक करें");
  return allGood;
}

main();
