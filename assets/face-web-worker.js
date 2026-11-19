/* ============================================================================
   /assets/face-web-worker.js : v1.0 (19-Nov-2026, खेप E-5: वेबसाइट की परीक्षा में कैमरे से चेहरे की जाँच)
   Founder का फ़ैसला 4-ब (19-Nov-2026): लैपटॉप (और हर वेबसाइट-परीक्षा) में भी कैमरे से चेहरे की जाँच।

   यह फ़ाइल browser के अलग धागे (Web Worker) में चलती है, ताकि परीक्षा का पन्ना धीमा न हो।
   काम सिर्फ़ एक: कैमरे की छोटी तस्वीर में कितने चेहरे हैं (0, 1, या ज़्यादा)। चेहरों का मिलान यहाँ नहीं होता;
   मिलान सिर्फ़ ACS के server पर होता है (functions/face_match.js)।
   तस्वीर कहीं नहीं जाती और कहीं सेव नहीं होती। यह धागा सिर्फ़ गिनती लौटाता है।

   औज़ार: YuNet (face_detection_yunet_2023mar.onnx), MIT लाइसेंस, OpenCV Zoo से (assets/face/LICENSE-yunet.txt)।
   यह वही मॉडल-फ़ाइल है जो server पर चलती है (SHA-256 8f2383e4…52fa4)।
   इसे चलाने का गणित इसी फ़ाइल में है (कोई बाहरी library नहीं): Conv, Relu, MaxPool, Resize, Add, Sigmoid।
   गणित server वाले इंजन (onnxruntime) से मिलाकर जाँचा गया (generator/dev_face_web_check.js)।
   अंक = sqrt(cls x obj); 0.6 से कम छोड़ो; NMS 0.3 (server जैसा)।
   ============================================================================ */
(function () {
  "use strict";
  var MODEL_URL = "/assets/face/face_detection_yunet_2023mar.onnx";
  var MODEL_SHA = "8f2383e4dd3cfbb4553ea8718107fc0423210dc964f9f4280604804ed2552fa4";
  var SCORE_MIN = 0.6, NMS = 0.3;

  /* ---------- ONNX फ़ाइल पढ़ना (protobuf, सिर्फ़ ज़रूरी खाने) ---------- */
  function Reader(u8) { this.u = u8; this.dv = new DataView(u8.buffer, u8.byteOffset, u8.byteLength); }
  Reader.prototype.varint = function (st) {
    var r = 0, s = 1, b, u = this.u;
    do { b = u[st.p++]; r += (b & 0x7f) * s; s *= 128; } while (b & 0x80);
    return r;
  };
  Reader.prototype.fields = function (start, end) {
    var st = { p: start }, out = [];
    while (st.p < end) {
      var tag = this.varint(st), f = Math.floor(tag / 8), w = tag & 7, v;
      if (w === 0) v = this.varint(st);
      else if (w === 1) { v = { s: st.p, e: st.p + 8 }; st.p += 8; }
      else if (w === 2) { var n = this.varint(st); v = { s: st.p, e: st.p + n }; st.p += n; }
      else if (w === 5) { v = { s: st.p, e: st.p + 4 }; st.p += 4; }
      else throw new Error("onnx");
      out.push([f, w, v]);
    }
    return out;
  };
  Reader.prototype.str = function (v) {
    var s = "", u = this.u;
    for (var i = v.s; i < v.e; i++) s += String.fromCharCode(u[i]);
    return s;
  };
  Reader.prototype.packed = function (v) {   /* packed varints */
    var st = { p: v.s }, out = [];
    while (st.p < v.e) { var x = this.varint(st); out.push(x > 9007199254740991 ? x - 18446744073709551616 : x); }
    return out;
  };
  function parseOnnx(u8) {
    var R = new Reader(u8), top = R.fields(0, u8.length), gv = null;
    for (var i = 0; i < top.length; i++) if (top[i][0] === 7) gv = top[i][2];
    if (!gv) throw new Error("onnx");
    var g = R.fields(gv.s, gv.e), nodes = [], inits = {};
    function tensor(v) {
      var t = R.fields(v.s, v.e), dims = [], dt = 0, name = "", raw = null, fl = [];
      for (var k = 0; k < t.length; k++) {
        var f = t[k][0], w = t[k][1], x = t[k][2];
        if (f === 1) { if (w === 0) dims.push(x); else dims = dims.concat(R.packed(x)); }
        else if (f === 2) dt = x;
        else if (f === 8) name = R.str(x);
        else if (f === 9) raw = x;
        else if (f === 4) { for (var q = x.s; q < x.e; q += 4) fl.push(R.dv.getFloat32(q, true)); }
      }
      var data = null;
      if (dt === 1) {
        if (raw) { data = new Float32Array((raw.e - raw.s) / 4); for (var j = 0; j < data.length; j++) data[j] = R.dv.getFloat32(raw.s + j * 4, true); }
        else data = new Float32Array(fl);
      }
      return { name: name, dims: dims, dt: dt, data: data };
    }
    function attr(v) {
      var a = R.fields(v.s, v.e), o = {};
      for (var k = 0; k < a.length; k++) {
        var f = a[k][0], w = a[k][1], x = a[k][2];
        if (f === 1) o.name = R.str(x);
        else if (f === 2) o.f = R.dv.getFloat32(x.s, true);
        else if (f === 3) o.i = x;
        else if (f === 4) o.s = R.str(x);
        else if (f === 8) { o.ints = o.ints || []; if (w === 0) o.ints.push(x); else o.ints = o.ints.concat(R.packed(x)); }
      }
      return o;
    }
    for (var n = 0; n < g.length; n++) {
      var f0 = g[n][0], x0 = g[n][2];
      if (f0 === 1) {
        var nf = R.fields(x0.s, x0.e), node = { op: "", inp: [], out: [], at: {} };
        for (var m = 0; m < nf.length; m++) {
          var ff = nf[m][0], xx = nf[m][2];
          if (ff === 1) node.inp.push(R.str(xx));
          else if (ff === 2) node.out.push(R.str(xx));
          else if (ff === 4) node.op = R.str(xx);
          else if (ff === 5) { var at = attr(xx); node.at[at.name] = at; }
        }
        nodes.push(node);
      } else if (f0 === 5) { var tt = tensor(x0); inits[tt.name] = tt; }
    }
    return { nodes: nodes, inits: inits };
  }

  /* ---------- जाल (network) तैयार करना ---------- */
  var KNOWN = { Conv: 1, Relu: 1, MaxPool: 1, Resize: 1, Add: 1, Transpose: 1, Reshape: 1, Sigmoid: 1 };
  function ints(n, k, d) { return n.at[k] && n.at[k].ints ? n.at[k].ints : d; }
  function build(m) {
    var ops = [], uses = {};
    m.nodes.forEach(function (n) {
      if (!KNOWN[n.op]) throw new Error("op " + n.op);
      var o = { op: n.op, x: n.inp[0], y: n.out[0] };
      if (n.op === "Conv") {
        var W = m.inits[n.inp[1]], B = n.inp[2] ? m.inits[n.inp[2]] : null, ks = ints(n, "kernel_shape", [W.dims[2], W.dims[3]]);
        var st = ints(n, "strides", [1, 1]), pd = ints(n, "pads", [0, 0, 0, 0]), dl = ints(n, "dilations", [1, 1]);
        if (ks[0] !== ks[1] || st[0] !== st[1] || pd[0] !== pd[1] || pd[0] !== pd[2] || pd[0] !== pd[3] || dl[0] !== 1 || dl[1] !== 1) throw new Error("conv");
        o.w = W.data; o.b = B ? B.data : null; o.co = W.dims[0]; o.cig = W.dims[1]; o.k = ks[0]; o.s = st[0]; o.p = pd[0];
        o.g = n.at.group ? n.at.group.i : 1;
      } else if (n.op === "MaxPool") {
        var k2 = ints(n, "kernel_shape", [2, 2]), s2 = ints(n, "strides", [2, 2]), p2 = ints(n, "pads", [0, 0, 0, 0]);
        if (k2[0] !== 2 || k2[1] !== 2 || s2[0] !== 2 || s2[1] !== 2 || p2.some(function (v) { return v !== 0; })) throw new Error("pool");
      } else if (n.op === "Resize") {
        var sc = m.inits[n.inp[2]];
        if (!sc || !sc.data || sc.data[2] !== 2 || sc.data[3] !== 2 || !n.at.mode || n.at.mode.s !== "nearest") throw new Error("resize");
      } else if (n.op === "Add") {
        o.x2 = n.inp[1];
      } else if (n.op === "Transpose") {
        var pm = ints(n, "perm", []);
        if (pm.join(",") !== "0,2,3,1") throw new Error("perm");
      }
      [o.x, o.x2].forEach(function (k) { if (k) uses[k] = (uses[k] || 0) + 1; });
      ops.push(o);
    });
    return { ops: ops, uses: uses };
  }

  /* ---------- गणित ---------- */
  function conv(t, o) {
    var Ci = t.c, H = t.h, Wd = t.w, k = o.k, s = o.s, p = o.p, g = o.g, cig = o.cig, co = o.co, cog = co / g;
    if (cig * g !== Ci) throw new Error("ch");
    var Ho = Math.floor((H + 2 * p - k) / s) + 1, Wo = Math.floor((Wd + 2 * p - k) / s) + 1, HWo = Ho * Wo, HW = H * Wd;
    var out = new Float32Array(co * HWo), x = t.d, w = o.w, b = o.b;
    for (var c = 0; c < co; c++) {
      var ob = c * HWo, bv = b ? b[c] : 0, grp = Math.floor(c / cog);
      for (var i = 0; i < HWo; i++) out[ob + i] = bv;
      for (var ci = 0; ci < cig; ci++) {
        var xb = (grp * cig + ci) * HW, wb = (c * cig + ci) * k * k;
        if (k === 1 && s === 1 && p === 0) {
          var wv0 = w[wb];
          for (var j = 0; j < HW; j++) out[ob + j] += wv0 * x[xb + j];
          continue;
        }
        for (var ky = 0; ky < k; ky++) {
          for (var kx = 0; kx < k; kx++) {
            var wv = w[wb + ky * k + kx];
            if (wv === 0) continue;
            var oxa = Math.max(0, Math.ceil((p - kx) / s)), oxb = Math.min(Wo - 1, Math.floor((Wd - 1 + p - kx) / s));
            for (var oy = 0; oy < Ho; oy++) {
              var iy = oy * s - p + ky;
              if (iy < 0 || iy >= H) continue;
              var ro = ob + oy * Wo, ri = xb + iy * Wd - p + kx;
              if (s === 1) { for (var ox = oxa; ox <= oxb; ox++) out[ro + ox] += wv * x[ri + ox]; }
              else { for (var ox2 = oxa; ox2 <= oxb; ox2++) out[ro + ox2] += wv * x[ri + ox2 * s]; }
            }
          }
        }
      }
    }
    return { c: co, h: Ho, w: Wo, d: out };
  }
  function relu(t) { var d = new Float32Array(t.d.length); for (var i = 0; i < d.length; i++) { var v = t.d[i]; d[i] = v > 0 ? v : 0; } return { c: t.c, h: t.h, w: t.w, d: d }; }
  function sigm(t) { var d = new Float32Array(t.d.length); for (var i = 0; i < d.length; i++) d[i] = 1 / (1 + Math.exp(-t.d[i])); return { c: t.c, h: t.h, w: t.w, d: d, hwc: t.hwc }; }
  function pool(t) {
    var Ho = Math.floor(t.h / 2), Wo = Math.floor(t.w / 2), d = new Float32Array(t.c * Ho * Wo), x = t.d;
    for (var c = 0; c < t.c; c++) {
      for (var y = 0; y < Ho; y++) {
        for (var xx = 0; xx < Wo; xx++) {
          var i = c * t.h * t.w + 2 * y * t.w + 2 * xx;
          var a = x[i], b = x[i + 1], e = x[i + t.w], f = x[i + t.w + 1];
          d[c * Ho * Wo + y * Wo + xx] = Math.max(Math.max(a, b), Math.max(e, f));
        }
      }
    }
    return { c: t.c, h: Ho, w: Wo, d: d };
  }
  function up2(t) {   /* nearest, asymmetric, floor: बाहर (y, x) = अंदर (y/2, x/2) */
    var H = t.h * 2, Wd = t.w * 2, d = new Float32Array(t.c * H * Wd), x = t.d;
    for (var c = 0; c < t.c; c++) for (var y = 0; y < H; y++) for (var xx = 0; xx < Wd; xx++) d[c * H * Wd + y * Wd + xx] = x[c * t.h * t.w + (y >> 1) * t.w + (xx >> 1)];
    return { c: t.c, h: H, w: Wd, d: d };
  }
  function add(a, b) {
    if (a.d.length !== b.d.length) throw new Error("add");
    var d = new Float32Array(a.d.length); for (var i = 0; i < d.length; i++) d[i] = a.d[i] + b.d[i];
    return { c: a.c, h: a.h, w: a.w, d: d };
  }
  function nhwc(t) {   /* Transpose 0,2,3,1: हर जगह के सब खाने साथ */
    var HW = t.h * t.w, d = new Float32Array(t.d.length);
    for (var c = 0; c < t.c; c++) for (var p = 0; p < HW; p++) d[p * t.c + c] = t.d[c * HW + p];
    return { c: t.c, h: t.h, w: t.w, d: d, hwc: true };
  }
  function runNet(net, inp, H, W) {
    var env = { input: { c: 3, h: H, w: W, d: inp } }, left = {};
    for (var k in net.uses) left[k] = net.uses[k];
    net.ops.forEach(function (o) {
      var t = env[o.x], r;
      if (!t) throw new Error("tensor " + o.x);
      if (o.op === "Conv") r = conv(t, o);
      else if (o.op === "Relu") r = relu(t);
      else if (o.op === "MaxPool") r = pool(t);
      else if (o.op === "Resize") r = up2(t);
      else if (o.op === "Add") r = add(t, env[o.x2]);
      else if (o.op === "Transpose") r = nhwc(t);
      else if (o.op === "Reshape") r = t;
      else r = sigm(t);
      env[o.y] = r;
      [o.x, o.x2].forEach(function (kk) { if (kk && --left[kk] === 0 && kk !== "input") delete env[kk]; });
    });
    return env;
  }
  function iou(a, b) {
    var x1 = Math.max(a.x, b.x), y1 = Math.max(a.y, b.y), x2 = Math.min(a.x + a.w, b.x + b.w), y2 = Math.min(a.y + a.h, b.y + b.h);
    var inter = Math.max(0, x2 - x1) * Math.max(0, y2 - y1), u = a.w * a.h + b.w * b.h - inter;
    return u > 0 ? inter / u : 0;
  }
  /* rgba: चौड़ाई W x ऊँचाई H (दोनों 32 के गुणज), तस्वीर ऊपर-बाएँ, बाक़ी काला। लौटता है: चेहरों की सूची (बड़े अंक पहले) */
  function detect(net, rgba, W, H) {
    if (W % 32 || H % 32) throw new Error("size");
    var plane = W * H, inp = new Float32Array(3 * plane);
    for (var i = 0; i < plane; i++) { inp[i] = rgba[i * 4 + 2]; inp[plane + i] = rgba[i * 4 + 1]; inp[2 * plane + i] = rgba[i * 4]; }   /* BGR */
    var out = runNet(net, inp, H, W), all = [];
    [8, 16, 32].forEach(function (st) {
      var cols = W / st, rows = H / st, cls = out["cls_" + st].d, obj = out["obj_" + st].d, bb = out["bbox_" + st].d;
      for (var r = 0; r < rows; r++) {
        for (var c = 0; c < cols; c++) {
          var j = r * cols + c, cs = Math.min(1, Math.max(0, cls[j])), os = Math.min(1, Math.max(0, obj[j])), score = Math.sqrt(cs * os);
          if (score < SCORE_MIN) continue;
          var cx = (c + bb[j * 4]) * st, cy = (r + bb[j * 4 + 1]) * st, w = Math.exp(bb[j * 4 + 2]) * st, h = Math.exp(bb[j * 4 + 3]) * st;
          all.push({ x: cx - w / 2, y: cy - h / 2, w: w, h: h, score: score });
        }
      }
    });
    all.sort(function (a, b) { return b.score - a.score; });
    var keep = [];
    for (var a = 0; a < all.length && keep.length < 20; a++) {
      var ok = true;
      for (var q = 0; q < keep.length; q++) if (iou(all[a], keep[q]) > NMS) { ok = false; break; }
      if (ok) keep.push(all[a]);
    }
    return keep;
  }

  var API = { parseOnnx: parseOnnx, build: build, runNet: runNet, detect: detect, MODEL_SHA: MODEL_SHA, SCORE_MIN: SCORE_MIN };

  /* ---------- Worker का काम: पन्ना छोटी तस्वीर भेजता है, यह चेहरों की गिनती लौटाता है ---------- */
  if (typeof module !== "undefined" && module.exports) { module.exports = API; return; }
  var NET = null, FAIL = "";
  function hex(buf) { var u = new Uint8Array(buf), s = ""; for (var i = 0; i < u.length; i++) s += (u[i] < 16 ? "0" : "") + u[i].toString(16); return s; }
  function load() {
    return fetch(MODEL_URL, { cache: "force-cache" }).then(function (r) { if (!r.ok) throw new Error("http " + r.status); return r.arrayBuffer(); })
      .then(function (ab) {
        var chk = (self.crypto && self.crypto.subtle) ? self.crypto.subtle.digest("SHA-256", ab).then(function (h) { if (hex(h) !== MODEL_SHA) throw new Error("sha"); }) : Promise.resolve();
        return chk.then(function () { NET = build(parseOnnx(new Uint8Array(ab))); });
      });
  }
  var ready = null;
  self.onmessage = function (ev) {
    var m = ev.data || {};
    if (m.t === "init") {
      if (!ready) ready = load().catch(function (e) { FAIL = String((e && e.message) || e); ready = null; throw e; });
      ready.then(function () { self.postMessage({ t: "ready" }); }, function () { self.postMessage({ t: "fail", why: FAIL || "model" }); });
      return;
    }
    if (m.t === "frame") {
      if (!NET) { self.postMessage({ t: "res", id: m.id, n: -1 }); return; }
      var t0 = Date.now(), faces;
      try { faces = detect(NET, new Uint8ClampedArray(m.buf), m.w, m.h); }
      catch (e) { self.postMessage({ t: "res", id: m.id, n: -1 }); return; }
      var minW = m.vw ? m.vw * (m.minFrac || 0.06) : 0, n = 0;
      for (var i = 0; i < faces.length; i++) if (faces[i].w >= minW) n++;
      self.postMessage({ t: "res", id: m.id, n: n, ms: Date.now() - t0 });
    }
  };
})();
