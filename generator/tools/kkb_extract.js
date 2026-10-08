#!/usr/bin/env node
/**
 * kkb_extract.js — मास्टर (fr) से किसी भी week के वाक्य निकालना
 * इस्तेमाल: node kkb_extract.js <level:1|2> <weekNum 1-based>
 * उदाहरण: node kkb_extract.js 2 9   → L2 week-9 (बाज़ार/ख़रीदारी) दिखाएगा
 */
const fs = require("fs");
const path = require("path");
const ASSETS = path.join(__dirname, "..", "..", "assets");

function W(p) {
  const w = {};
  new Function("window", fs.readFileSync(p, "utf8"))(w);
  return w;
}

function main() {
  const level = parseInt(process.argv[2], 10);
  const weekNum = parseInt(process.argv[3], 10);
  if (!level || !weekNum) {
    console.log("इस्तेमाल: node kkb_extract.js <1|2> <weekNum>");
    process.exit(1);
  }
  const file = level === 1 ? "kkb_fr_data.js" : "kkb2_fr_data.js";
  const key = level === 1 ? "KKB_DATA" : "KKB2_DATA";
  const data = W(path.join(ASSETS, file))[key];
  const week = data.weeks[weekNum - 1];
  if (!week) {
    console.error("यह week मौजूद नहीं —", level === 1 ? "L1 में 5" : "L2 में 13", "सप्ताह हैं");
    process.exit(1);
  }
  console.log("=== title:", week.title, "| hi:", week.hi || week.title, "===");
  week.days.forEach((day, di) => {
    console.log(`\n=== day${di} (title: "${day.title}") — ${day.items.length} वाक्य ===`);
    day.items.forEach((it, i) => {
      console.log(i, JSON.stringify(it[0]), "|", JSON.stringify(it[2]));
    });
  });
}
main();
