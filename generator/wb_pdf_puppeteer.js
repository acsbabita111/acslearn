/* generator/wb_pdf_puppeteer.js — v1.0 (09-Oct-2026): build_workbook v1.3 का fallback PDF-इंजन
   पिन-नुस्ख़ा (Addendum v1.5): puppeteer-core@24.10.2 + @sparticuz/chromium@138.0.2 · headless:"shell" · setGraphicsMode=false
   modules NODE_PATH से (container: pdfeng/node_modules)। jobs.json = [[htmlPath,pdfPath],...] */
"use strict";
(async () => {
  const fs = require("fs");
  const jobs = JSON.parse(fs.readFileSync(process.argv[2], "utf8"));
  const chromium = require("@sparticuz/chromium"); chromium.setGraphicsMode = false;
  const pptr = require("puppeteer-core");
  const b = await pptr.launch({ executablePath: await chromium.executablePath(), args: chromium.args, headless: "shell" });
  const pg = await b.newPage();
  for (const [html, pdf] of jobs) {
    await pg.goto("file://" + html, { waitUntil: "load" });
    await pg.emulateMediaType("print");
    await pg.pdf({ path: pdf, format: "A4", printBackground: true, preferCSSPageSize: true });
  }
  await b.close(); console.log("ok", jobs.length);
})().catch(e => { console.error(e && e.message); process.exit(1); });
