/* ============================================================================
   generator/dev_face_web_check.js : v1.0 (19-Nov-2026, खेप E-5)
   वेबसाइट की परीक्षा का चेहरा-गिनने वाला गणित (assets/face-web-worker.js) server वाले इंजन (onnxruntime) से मिलाकर जाँचता है।
   जाँच:
     1. assets/face/face_detection_yunet_2023mar.onnx की छाप (SHA-256) वही है जो worker में लिखी है (8f2383e4…52fa4)।
     2. worker की फ़ाइल मॉडल को पढ़कर जाल बना पाती है (सिर्फ़ जाने-पहचाने 8 गणित-काम)।
     3. (अगर server वाला folder दिया) onnxruntime-web से उसी इनपुट पर सब 12 नतीजे मिलाए जाते हैं: अंतर 0.001 से कम।
        इनपुट: तय बीज से बनी 3 तस्वीरें (640 x 640)। server folder की मॉडल-फ़ाइल की छाप भी वही हो।
     4. 320 x 256 और 640 x 640, दोनों आकार पर जाल चलता है (worker 320 x 256 पर चलता है)।
   चलाना (repo की जड़ से):
     node generator/dev_face_web_check.js                         (1, 2, 4)
     node generator/dev_face_web_check.js <functions folder>      (1 से 4; उस folder में node_modules/onnxruntime-web और face_models/)
   exit 0 = सब पास।
   ============================================================================ */
"use strict";
const fs = require("fs"), path = require("path"), crypto = require("crypto");
const ROOT = path.join(__dirname, "..");
const FW = require(path.join(ROOT, "assets/face-web-worker.js"));
let pass = 0, fail = 0;
function ok(c, m) { if (c) { pass++; console.log("  ✅ " + m); } else { fail++; console.log("  ❌ " + m); } }
const MODEL = path.join(ROOT, "assets/face/face_detection_yunet_2023mar.onnx");
const sha = b => crypto.createHash("sha256").update(b).digest("hex");

(async function () {
  console.log("1. मॉडल-फ़ाइल");
  const buf = fs.readFileSync(MODEL);
  ok(sha(buf) === FW.MODEL_SHA, "assets/face की मॉडल-फ़ाइल की छाप worker में लिखी छाप से मिलती है");
  ok(fs.existsSync(path.join(ROOT, "assets/face/LICENSE-yunet.txt")) && /MIT License/.test(fs.readFileSync(path.join(ROOT, "assets/face/LICENSE-yunet.txt"), "utf8")), "लाइसेंस-फ़ाइल (MIT) साथ में है");

  console.log("2. जाल बनना");
  const net = FW.build(FW.parseOnnx(new Uint8Array(buf)));
  const ops = {}; net.ops.forEach(o => { ops[o.op] = (ops[o.op] || 0) + 1; });
  ok(net.ops.length === 106 && ops.Conv === 53 && ops.Resize === 2 && ops.MaxPool === 4, "106 काम: Conv 53, MaxPool 4, Resize 2 (" + JSON.stringify(ops) + ")");

  console.log("3. server वाले इंजन से मिलान");
  const dir = process.argv[2];
  if (!dir) console.log("  (server folder नहीं दिया: यह हिस्सा छोड़ा)");
  else {
    const ORT = require(path.resolve(dir, "node_modules/onnxruntime-web"));
    ORT.env.wasm.numThreads = 1; ORT.env.logLevel = "error";
    const om = path.resolve(dir, "face_models/face_detection_yunet_2023mar.onnx");
    ok(fs.existsSync(om) && sha(fs.readFileSync(om)) === FW.MODEL_SHA, "server की मॉडल-फ़ाइल भी वही है");
    const sess = await ORT.InferenceSession.create(buf, { logSeverityLevel: 3 });
    let seed = 12345; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
    let worst = 0;
    for (let k = 0; k < 3; k++) {
      const S = 640, inp = new Float32Array(3 * S * S);
      for (let i = 0; i < inp.length; i++) inp[i] = Math.floor(rnd() * 256);
      const mine = FW.runNet(net, inp, S, S), ref = await sess.run({ input: new ORT.Tensor("float32", inp, [1, 3, S, S]) });
      for (const key of Object.keys(ref)) { const a = ref[key].data, b = mine[key].d; if (a.length !== b.length) { worst = Infinity; break; } for (let i = 0; i < a.length; i++) worst = Math.max(worst, Math.abs(a[i] - b[i])); }
    }
    ok(worst < 1e-3, "12 नतीजे, 3 तस्वीरें: सबसे बड़ा अंतर " + worst.toExponential(2));
  }

  console.log("4. worker वाला आकार");
  const rg = new Uint8ClampedArray(320 * 256 * 4).fill(40);
  let faces = null; try { faces = FW.detect(net, rg, 320, 256); } catch (e) { faces = e; }
  ok(Array.isArray(faces) && faces.length === 0, "320 x 256 की सादी तस्वीर: जाल चला, चेहरा 0");
  let bad = null; try { FW.detect(net, rg, 300, 256); } catch (e) { bad = e; }
  ok(!!bad, "32 का गुणज न हो तो worker मना करता है");

  console.log("\n🏁 वेबसाइट का चेहरा-गिनना: पास " + pass + " · फेल " + fail);
  process.exit(fail ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
