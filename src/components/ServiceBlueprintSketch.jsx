import { useEffect, useRef } from "react";
import "./ServiceBlueprintSketch.css";

/**
 * Animated hand-drawn service blueprint. Ported from a standalone SVG+JS
 * sketch (supplied as a finished asset) into a React component: the drawing
 * logic is unchanged, only the DOM entry points became refs instead of
 * getElementById, and every appended node + animation is torn down on
 * unmount so remounts (React StrictMode double-invokes effects in dev)
 * don't double-draw.
 */
function runSketch(ink, ink2) {
  const NS = "http://www.w3.org/2000/svg";
  const animations = [];

  /* ---- timing (ms) ---- */
  const SPEED = 2.0;
  const ROUGH = 1.9;
  const TIME_JITTER = 130;
  const CYCLE = 25000,
    FADE_S = 21800,
    FADE_E = 24400;

  /* ---- deterministic wobble ---- */
  let seed = 20260812;
  function rand() {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  }
  function j(a) {
    return (rand() * 2 - 1) * a;
  }

  const items = [];
  function layer() {
    return rand() < 0.5 ? ink : ink2;
  }
  function reg(el, s, e, kind, o) {
    const ss = Math.max(20, s + j(TIME_JITTER));
    const ee = Math.max(ss + 70, e + j(TIME_JITTER * 1.3));
    items.push({ el, s: ss * SPEED, e: ee * SPEED, kind, o });
    return el;
  }

  /* ---- geometry of a hand ---- */
  function smooth(p) {
    let d = "M" + p[0][0].toFixed(1) + "," + p[0][1].toFixed(1);
    for (let i = 0; i < p.length - 1; i++) {
      const p0 = p[i - 1] || p[i],
        p1 = p[i],
        p2 = p[i + 1],
        p3 = p[i + 2] || p2;
      const c1x = p1[0] + (p2[0] - p0[0]) / 6,
        c1y = p1[1] + (p2[1] - p0[1]) / 6;
      const c2x = p2[0] - (p3[0] - p1[0]) / 6,
        c2y = p2[1] - (p3[1] - p1[1]) / 6;
      d +=
        " C" +
        c1x.toFixed(1) +
        "," +
        c1y.toFixed(1) +
        " " +
        c2x.toFixed(1) +
        "," +
        c2y.toFixed(1) +
        " " +
        p2[0].toFixed(1) +
        "," +
        p2[1].toFixed(1);
    }
    return d;
  }
  function linePts(x1, y1, x2, y2, amp) {
    amp = (amp === undefined ? 1.1 : amp) * ROUGH;
    const dx = x2 - x1,
      dy = y2 - y1,
      len = Math.sqrt(dx * dx + dy * dy) || 1;
    const n = Math.max(2, Math.round(len / 22));
    const nx = -dy / len,
      ny = dx / len,
      pts = [];
    const bow = j(0.6 + len * 0.006) * ROUGH * 0.6;
    const lean = j(0.35) * ROUGH;
    for (let i = 0; i <= n; i++) {
      const t = i / n,
        edge = i === 0 || i === n ? 0.35 : 1;
      const o = j(amp) * edge + Math.sin(t * Math.PI) * bow + t * lean;
      pts.push([x1 + dx * t + nx * o + j(0.6 * ROUGH), y1 + dy * t + ny * o + j(0.6 * ROUGH)]);
    }
    return pts;
  }
  function boxPts(x, y, w, h, amp) {
    amp = amp === undefined ? 0.9 : amp;
    const start = 3 + rand() * 9 * ROUGH,
      over = 4 + rand() * 9 * ROUGH;
    const s2 = j(1.6 * ROUGH),
      s3 = j(1.6 * ROUGH),
      s4 = j(1.6 * ROUGH);
    let p = linePts(x + start, y, x + w + s2, y, amp);
    p = p.concat(linePts(x + w, y, x + w, y + h + s3, amp).slice(1));
    p = p.concat(linePts(x + w, y + h, x - s4, y + h, amp).slice(1));
    p = p.concat(linePts(x, y + h, x, y, amp).slice(1));
    p = p.concat(linePts(x, y, x + over, y + j(1.6 * ROUGH), amp).slice(1));
    return p;
  }
  function ovalPts(cx, cy, rx, ry, amp) {
    amp = (amp === undefined ? 1.4 : amp) * ROUGH;
    const pts = [],
      n = 30,
      a0 = -0.5 + rand() * 0.6;
    const sq = 0.94 + rand() * 0.13,
      tilt = j(0.06);
    for (let i = 0; i <= n + 4; i++) {
      const a = a0 + (i / n) * Math.PI * 2 * (1 + j(0.004));
      const wob = 1 + Math.sin(a * 2.3 + a0) * 0.03 * ROUGH;
      const px = Math.cos(a) * (rx * wob + j(amp)),
        py = Math.sin(a) * (ry * sq * wob + j(amp));
      pts.push([cx + px - py * tilt, cy + py + px * tilt]);
    }
    return pts;
  }

  function stroke(d, s, e, opt) {
    opt = opt || {};
    const p = document.createElementNS(NS, "path");
    p.setAttribute("d", d);
    p.setAttribute("pathLength", "1");
    p.setAttribute("stroke-dasharray", "1");
    p.setAttribute("stroke-dashoffset", "1");
    const w = (opt.w || 1.5 + rand() * 0.5) * (0.82 + rand() * 0.42);
    p.setAttribute("stroke-width", w.toFixed(2));
    if (opt.color) p.setAttribute("stroke", opt.color);
    else if (rand() < 0.28) p.setAttribute("stroke", rand() < 0.5 ? "var(--ink)" : "var(--ink)");
    layer().appendChild(p);
    const o = (opt.o === undefined ? 1 : opt.o) * (0.84 + rand() * 0.16);
    return reg(p, s, e, "draw", o);
  }
  function line(x1, y1, x2, y2, s, e, opt) {
    opt = opt || {};
    const p = stroke(smooth(linePts(x1, y1, x2, y2, opt.amp)), s, e, opt);
    if (opt.dbl !== false && rand() < 0.24) {
      const dur = e - s,
        k = 1.4 * ROUGH;
      stroke(
        smooth(linePts(x1 + j(k), y1 + j(k), x2 + j(k), y2 + j(k), (opt.amp || 1.1) * 1.15)),
        s + dur * 0.18,
        e + dur * 0.26,
        { w: 0.95, color: opt.color, o: (opt.o === undefined ? 1 : opt.o) * 0.34 }
      );
    }
    return p;
  }
  function box(x, y, w, h, s, e, opt) {
    opt = opt || {};
    const mx = x + w / 2,
      my = y + h / 2,
      rot = j(0.75 * ROUGH);
    const p = stroke(smooth(boxPts(x, y, w, h, opt.amp)), s, e, opt);
    p.setAttribute("transform", "rotate(" + rot.toFixed(2) + " " + mx.toFixed(1) + " " + my.toFixed(1) + ")");
    if (rand() < 0.3) {
      const dur = e - s;
      const q = stroke(
        smooth(boxPts(x + j(1.4), y + j(1.4), w, h, (opt.amp || 0.9) * 1.25)),
        s + dur * 0.16,
        s + dur * 0.22 + dur * 0,
        { w: 0.95, o: (opt.o === undefined ? 1 : opt.o) * 0.32 }
      );
      q.setAttribute(
        "transform",
        "rotate(" + (rot + j(0.6)).toFixed(2) + " " + mx.toFixed(1) + " " + my.toFixed(1) + ")"
      );
    }
    return p;
  }
  function oval(cx, cy, rx, ry, s, e, opt) {
    return stroke(smooth(ovalPts(cx, cy, rx, ry, opt && opt.amp)), s, e, opt);
  }

  function dashed(x1, y, x2, s, e, opt) {
    let d = "",
      x = x1;
    while (x < x2) {
      const seg = 6 + rand() * 13;
      const x2s = Math.min(x + seg, x2);
      const yy = y + j(1.1 * ROUGH);
      const pts = linePts(x, yy + j(0.5), x2s, yy + j(0.5), 0.35);
      d += smooth(pts) + " ";
      x = x2s + 4 + rand() * 9;
    }
    return stroke(d.trim(), s, e, opt);
  }

  function arrowHead(x, y, ang, s, e, size, opt) {
    size = (size || 8) * (0.8 + rand() * 0.5);
    const a1 = ang + 2.35 + j(0.28),
      a2 = ang - 2.35 + j(0.28);
    const d =
      smooth(linePts(x + Math.cos(a1) * size, y + Math.sin(a1) * size, x + j(1), y + j(1), 0.5)) +
      " " +
      smooth(linePts(x, y, x + Math.cos(a2) * size * (0.8 + rand() * 0.4), y + Math.sin(a2) * size, 0.5));
    return stroke(d, s, e, opt);
  }
  function arrow(x1, y1, x2, y2, s, e, opt) {
    const dur = e - s,
      k = 1.2 * ROUGH;
    line(x1 + j(k), y1 + j(k), x2 + j(k * 0.6), y2 + j(k * 0.6), s, s + dur * (0.66 + rand() * 0.12), opt);
    arrowHead(x2, y2, Math.atan2(y2 - y1, x2 - x1), s + dur * (0.6 + rand() * 0.12), e, 8, opt);
  }

  /* ---- type ---- */
  function label(str, x, y, s, e, opt) {
    opt = opt || {};
    const t = document.createElementNS(NS, "text");
    const xx = x + j(1.6 * ROUGH),
      yy = y + j(1.3 * ROUGH);
    t.setAttribute("x", xx.toFixed(1));
    t.setAttribute("y", yy.toFixed(1));
    t.setAttribute("class", opt.serif ? "ann" : "lbl");
    t.setAttribute("font-size", ((opt.size || 12.5) * (0.96 + rand() * 0.09)).toFixed(2));
    t.setAttribute("fill", opt.color || "var(--ink)");
    t.setAttribute("text-anchor", opt.anchor || "start");
    if (opt.track) t.setAttribute("letter-spacing", (opt.track * (0.9 + rand() * 0.22)).toFixed(2));
    t.setAttribute("transform", "rotate(" + j(0.85 * ROUGH).toFixed(2) + " " + xx.toFixed(1) + " " + yy.toFixed(1) + ")");
    t.setAttribute("opacity", "0");
    t.textContent = str;
    layer().appendChild(t);
    return reg(t, s, e, "fade", (opt.o === undefined ? 1 : opt.o) * (0.88 + rand() * 0.12));
  }

  function scribble(x, y, w, lines, s, e) {
    const per = (e - s) / lines;
    for (let i = 0; i < lines; i++) {
      const ww = w * (0.62 + rand() * 0.38);
      let d = "",
        cx = x;
      const yy = y + i * 11;
      while (cx < x + ww) {
        const seg = 5 + rand() * 7;
        d += smooth(linePts(cx, yy + j(1.4), cx + seg, yy + j(1.4), 0.9)) + " ";
        cx += seg + 2.5 + rand() * 2.5;
      }
      stroke(d.trim(), s + i * per, s + (i + 0.85) * per, { w: 1.05, color: "var(--ink-2)", o: 0.78 });
    }
  }

  /* =======================================================
     COMPOSITION
     ======================================================= */
  const GX = 214,
    GR = 1216,
    COLW = (GR - GX) / 5;
  const HEAD_Y = 176,
    BOT_Y = 682;
  const Y_INT = 300,
    Y_VIS = 430,
    Y_INT2 = 560;
  const stages = ["DISCOVER", "EVALUATE", "SIGN UP", "ONBOARD", "ADVOCATE"];
  const cust = ["sees the ad", "compares plans", "creates account", "completes first task", "refers a friend"];
  const front = ["landing page", "pricing page", "sign-up form", "welcome email", "referral link"];
  const back = ["campaign ops", "content CMS", "identity check", "lifecycle engine", "rewards ledger"];
  const supp = ["analytics", "", "KYC service", "CRM", "payments"];
  function bx(i) {
    return GX + i * COLW + 25;
  }
  const BW = 150;
  function cx(i) {
    return bx(i) + BW / 2;
  }

  label("SERVICE BLUEPRINT", 64, 70, 100, 700, { size: 23, track: 5.2, color: "var(--ink)" });
  line(64, 82, 306, 82, 250, 900, { w: 2.1 });
  line(64, 86, 232, 86, 500, 1050, { w: 1.1, o: 0.45 });
  label("customer onboarding · v0.3 · workshop draft", 64, 106, 620, 1150, { size: 12.5, serif: true, color: "var(--ink-3)" });

  line(GX, 132, GX, BOT_Y, 950, 1520, { w: 1.6 });
  line(GX, HEAD_Y, GR, HEAD_Y, 1050, 1720, { w: 1.9 });
  line(GX, HEAD_Y + 4, GR - 40, HEAD_Y + 4, 1250, 1880, { w: 1, o: 0.4 });
  for (let i2 = 1; i2 < 5; i2++) {
    const vx = GX + i2 * COLW;
    const st = 1180 + i2 * 90;
    let d = "",
      yy = 138;
    while (yy < BOT_Y) {
      const seg = 10 + rand() * 7;
      const y2 = Math.min(yy + seg, BOT_Y);
      d += smooth(linePts(vx + j(0.7), yy, vx + j(0.7), y2, 0.4)) + " ";
      yy = y2 + 7 + rand() * 4;
    }
    stroke(d.trim(), st, st + 560, { w: 1, color: "var(--ink-3)", o: 0.85 });
  }

  for (let g1 = 0; g1 < 11; g1++) {
    const tx = GX + rand() * (GR - GX),
      ty = 150 + rand() * 530;
    const tl = 4 + rand() * 7,
      ta = rand() * Math.PI;
    line(tx, ty, tx + Math.cos(ta) * tl, ty + Math.sin(ta) * tl, 500 + g1 * 70, 700 + g1 * 70, {
      w: 0.85,
      color: "var(--ink-3)",
      o: 0.4,
      dbl: false,
    });
  }

  for (let i3 = 0; i3 < 5; i3++) {
    label(stages[i3], cx(i3), 162, 1500 + i3 * 105, 1780 + i3 * 105, {
      size: 13,
      track: 2.6,
      anchor: "middle",
      color: "var(--ink)",
    });
  }

  label("CUSTOMER", 64, 226, 2100, 2380, { size: 11.5, track: 2.2, color: "var(--ink-2)" });
  label("ACTIONS", 64, 241, 2180, 2460, { size: 11.5, track: 2.2, color: "var(--ink-2)" });
  line(64, 252, 168, 252, 2260, 2620, { w: 1.2, color: "var(--ink-2)", o: 0.7 });
  for (let i4 = 0; i4 < 5; i4++) {
    box(bx(i4), 196, BW, 68, 2200 + i4 * 175, 2680 + i4 * 175, { w: 1.7 });
    label(cust[i4], cx(i4), 236, 2560 + i4 * 175, 2900 + i4 * 175, { size: 12.5, anchor: "middle", color: "var(--ink)" });
  }
  for (let i5 = 0; i5 < 4; i5++) {
    arrow(bx(i5) + BW + 8, 230, bx(i5 + 1) - 8, 230, 3320 + i5 * 130, 3560 + i5 * 130, { w: 1.4 });
  }

  dashed(GX, Y_INT, GR, 3820, 4260, { w: 1.35, color: "var(--ink-2)" });
  label("line of interaction", GR, Y_INT - 8, 4080, 4380, { size: 10.5, serif: true, anchor: "end", color: "var(--ink-3)" });

  label("FRONTSTAGE", 64, 350, 4200, 4480, { size: 11.5, track: 2.2, color: "var(--ink-2)" });
  label("visible to customer", 64, 366, 4280, 4560, { size: 10.5, serif: true, color: "var(--ink-3)" });
  for (let i6 = 0; i6 < 5; i6++) {
    box(bx(i6), 322, BW, 68, 4300 + i6 * 180, 4790 + i6 * 180, { w: 1.7 });
    label(front[i6], cx(i6), 362, 4680 + i6 * 180, 5020 + i6 * 180, { size: 12.5, anchor: "middle", color: "var(--ink)" });
  }

  dashed(GX, Y_VIS, GR, 5400, 5820, { w: 1.35, color: "var(--ink-2)" });
  label("line of visibility", GR, Y_VIS - 8, 5620, 5920, { size: 10.5, serif: true, anchor: "end", color: "var(--ink-3)" });

  label("BACKSTAGE", 64, 480, 5760, 6040, { size: 11.5, track: 2.2, color: "var(--ink-2)" });
  label("staff & systems", 64, 496, 5840, 6120, { size: 10.5, serif: true, color: "var(--ink-3)" });
  for (let i7 = 0; i7 < 5; i7++) {
    box(bx(i7), 452, BW, 68, 5820 + i7 * 175, 6300 + i7 * 175, { w: 1.7 });
    label(back[i7], cx(i7), 492, 6180 + i7 * 175, 6520 + i7 * 175, { size: 12.5, anchor: "middle", color: "var(--ink)" });
  }

  dashed(GX, Y_INT2, GR, 6900, 7300, { w: 1.35, color: "var(--ink-2)" });
  label("line of internal interaction", GR, Y_INT2 - 8, 7080, 7380, {
    size: 10.5,
    serif: true,
    anchor: "end",
    color: "var(--ink-3)",
  });
  label("SUPPORT", 64, 606, 7150, 7420, { size: 11.5, track: 2.2, color: "var(--ink-2)" });
  label("PROCESSES", 64, 621, 7220, 7500, { size: 11.5, track: 2.2, color: "var(--ink-2)" });
  for (let i8 = 0; i8 < 5; i8++) {
    if (!supp[i8]) continue;
    box(bx(i8) + 10, 580, BW - 20, 56, 7250 + i8 * 140, 7620 + i8 * 140, { w: 1.5, o: 0.9 });
    label(supp[i8], cx(i8), 613, 7520 + i8 * 140, 7840 + i8 * 140, { size: 12, anchor: "middle", color: "var(--ink-2)" });
  }
  line(GX, BOT_Y, GR, BOT_Y, 7700, 8140, { w: 1.3, o: 0.55 });

  for (let i9 = 0; i9 < 5; i9++) {
    arrow(cx(i9), 264, cx(i9), 320, 7620 + i9 * 95, 7880 + i9 * 95, { w: 1.35 });
    oval(cx(i9), Y_INT, 4.2, 4.2, 7760 + i9 * 95, 7960 + i9 * 95, { w: 1.5, amp: 0.5 });
  }
  const backLinks = [1, 2, 3, 4];
  for (let k = 0; k < backLinks.length; k++) {
    arrow(cx(backLinks[k]), 390, cx(backLinks[k]), 450, 8060 + k * 95, 8300 + k * 95, { w: 1.3, o: 0.9 });
  }
  const suppLinks = [2, 3, 4];
  for (let k2 = 0; k2 < suppLinks.length; k2++) {
    arrow(cx(suppLinks[k2]), 520, cx(suppLinks[k2]), 578, 8320 + k2 * 95, 8540 + k2 * 95, { w: 1.3, o: 0.85 });
  }
  const fbY = 545;
  line(cx(4) - 20, 520, cx(4) - 20, fbY, 8620, 8760, { w: 1.2, o: 0.8 });
  line(cx(4) - 20, fbY, cx(0) + 20, fbY, 8680, 8940, { w: 1.2, o: 0.8 });
  arrow(cx(0) + 20, fbY, cx(0) + 20, 522, 8880, 9040, { w: 1.2, o: 0.8 });
  label("re-entry loop", cx(2), fbY - 8, 8980, 9260, { size: 10.5, serif: true, anchor: "middle", color: "var(--ink-3)" });

  function icoCursor(x, y, s, e) {
    stroke(
      smooth([
        [x, y],
        [x, y + 13],
        [x + 3.4, y + 9.6],
        [x + 6, y + 14],
        [x + 8, y + 13],
        [x + 5.4, y + 8.8],
        [x + 9.6, y + 8.4],
        [x, y],
      ]),
      s,
      e,
      { w: 1.25, o: 0.85 }
    );
  }
  function icoDoc(x, y, s, e) {
    box(x, y, 11, 14, s, e - 60, { w: 1.25, o: 0.85, amp: 0.5 });
    stroke(
      smooth(linePts(x + 2.5, y + 5, x + 8.5, y + 5, 0.4)) + " " + smooth(linePts(x + 2.5, y + 9, x + 8.5, y + 9, 0.4)),
      s + 80,
      e,
      { w: 1, o: 0.7 }
    );
  }
  function icoForm(x, y, s, e) {
    let d = "";
    for (let q = 0; q < 3; q++) {
      d += smooth(linePts(x, y + q * 5, x + 2, y + q * 5, 0.3)) + " ";
      d += smooth(linePts(x + 5, y + q * 5, x + 13, y + q * 5, 0.4)) + " ";
    }
    stroke(d.trim(), s, e, { w: 1.2, o: 0.85 });
  }
  function icoMail(x, y, s, e) {
    box(x, y, 15, 11, s, e - 70, { w: 1.25, o: 0.85, amp: 0.5 });
    stroke(
      smooth([
        [x + 0.5, y + 0.8],
        [x + 7.5, y + 6.5],
        [x + 14.5, y + 0.8],
      ]),
      s + 90,
      e,
      { w: 1.15, o: 0.8 }
    );
  }
  function icoChat(x, y, s, e) {
    box(x, y, 15, 11, s, e - 70, { w: 1.25, o: 0.85, amp: 0.5 });
    stroke(
      smooth([
        [x + 3.5, y + 11],
        [x + 2.5, y + 15.5],
        [x + 8, y + 11],
      ]),
      s + 90,
      e,
      { w: 1.15, o: 0.8 }
    );
  }
  function icoGear(x, y, s, e) {
    oval(x, y, 6, 6, s, s + 180, { w: 1.2, o: 0.8, amp: 0.5 });
    let d = "";
    for (let q2 = 0; q2 < 6; q2++) {
      const a = q2 * (Math.PI / 3);
      d += smooth(linePts(x + Math.cos(a) * 6, y + Math.sin(a) * 6, x + Math.cos(a) * 9.5, y + Math.sin(a) * 9.5, 0.3)) + " ";
    }
    stroke(d.trim(), s + 150, e, { w: 1.1, o: 0.75 });
  }
  function icoDb(x, y, s, e) {
    oval(x, y, 8, 3.2, s, s + 150, { w: 1.2, o: 0.8, amp: 0.4 });
    stroke(
      smooth(linePts(x - 8, y, x - 8, y + 9, 0.3)) + " " + smooth(linePts(x + 8, y, x + 8, y + 9, 0.3)),
      s + 130,
      s + 260,
      { w: 1.1, o: 0.75 }
    );
    stroke(
      smooth([
        [x - 8, y + 9],
        [x - 4, y + 12],
        [x + 4, y + 12],
        [x + 8, y + 9],
      ]),
      s + 240,
      e,
      { w: 1.1, o: 0.75 }
    );
  }
  icoCursor(bx(0) + BW - 24, 332, 8320, 8560);
  icoDoc(bx(1) + BW - 24, 331, 8420, 8680);
  icoForm(bx(2) + BW - 26, 334, 8520, 8760);
  icoMail(bx(3) + BW - 27, 333, 8620, 8880);
  icoChat(bx(4) + BW - 27, 331, 8720, 8980);
  icoGear(bx(2) + BW - 20, 470, 8820, 9100);
  icoDb(bx(3) + BW - 22, 466, 8900, 9180);

  scribble(64, 716, 190, 3, 8750, 9250);
  line(bx(1) + 14, 470, bx(1) + BW - 18, 480, 8600, 8760, { w: 1.5, o: 0.75, amp: 0.7, dbl: false });
  line(bx(1) + 16, 481, bx(1) + BW - 20, 469, 8680, 8840, { w: 1.4, o: 0.7, amp: 0.7, dbl: false });
  label("→ headless CMS?", cx(1), 516, 8820, 9080, { size: 11.5, serif: true, anchor: "middle", color: "var(--ink-2)", o: 0.9 });
  for (let g2 = 0; g2 < 4; g2++) {
    const sx = 168 + rand() * 30,
      sy2 = 210 + rand() * 400;
    line(sx, sy2, sx + 5 + rand() * 5, sy2 - 3 - rand() * 5, 8900 + g2 * 130, 9050 + g2 * 130, {
      w: 1.1,
      color: "var(--ink-3)",
      o: 0.55,
      dbl: false,
    });
  }
  label("manual handoff — 42% drop out here", 452, 730, 8900, 9240, { size: 13.5, serif: true, color: "var(--ink)" });
  arrow(690, 726, 754, 646, 9100, 9380, { w: 1.35 });
  oval(cx(2), 356, 96, 50, 9180, 9620, { w: 1.8, amp: 1.9, o: 0.9 });
  oval(cx(2), 356, 100, 54, 9280, 9700, { w: 1.1, amp: 2.2, o: 0.4 });

  box(966, 706, 16, 12, 9100, 9280, { w: 1.3, o: 0.85, amp: 0.5 });
  label("touchpoint", 992, 717, 9200, 9440, { size: 11, serif: true, color: "var(--ink-3)" });
  dashed(1078, 712, 1122, 9200, 9400, { w: 1.2, color: "var(--ink-3)", o: 0.85 });
  label("boundary", 1132, 717, 9280, 9520, { size: 11, serif: true, color: "var(--ink-3)" });
  label("fig. 01 — end-to-end service blueprint", 1216, 760, 9420, 9760, {
    size: 11.5,
    serif: true,
    anchor: "end",
    color: "var(--ink-3)",
  });
  scribble(452, 748, 150, 2, 9350, 9700);

  const m = [
    [40, 40, 1],
    [1240, 40, -1],
    [40, 780, 1],
    [1240, 780, -1],
  ];
  for (let c = 0; c < 4; c++) {
    const mm = m[c],
      sy = c < 2 ? 1 : -1;
    line(mm[0], mm[1], mm[0] + 16 * mm[2], mm[1], 9500 + c * 70, 9700 + c * 70, { w: 1.2, o: 0.5 });
    line(mm[0], mm[1], mm[0], mm[1] + 16 * sy, 9560 + c * 70, 9780 + c * 70, { w: 1.2, o: 0.5 });
  }

  /* =======================================================
     PLAYBACK
     ======================================================= */
  const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    items.forEach((it) => {
      if (it.kind === "draw") it.el.setAttribute("stroke-dashoffset", "0");
      it.el.setAttribute("opacity", it.o);
    });
    return () => {
      ink.replaceChildren();
      ink2.replaceChildren();
    };
  }

  const t0 = document.timeline ? document.timeline.currentTime : 0;
  items.forEach((it, idx) => {
    const fs = FADE_S + (idx / items.length) * 420;
    const fe = fs + (FADE_E - FADE_S - 420);
    let kf;
    if (it.kind === "draw") {
      kf = [
        { strokeDashoffset: 1, opacity: it.o, offset: 0 },
        { strokeDashoffset: 1, opacity: it.o, offset: it.s / CYCLE, easing: "cubic-bezier(.32,.02,.28,1)" },
        { strokeDashoffset: 0, opacity: it.o, offset: it.e / CYCLE },
        { strokeDashoffset: 0, opacity: it.o, offset: fs / CYCLE },
        { strokeDashoffset: 0, opacity: 0, offset: fe / CYCLE },
        { strokeDashoffset: 0, opacity: 0, offset: 1 },
      ];
    } else {
      kf = [
        { opacity: 0, offset: 0 },
        { opacity: 0, offset: it.s / CYCLE, easing: "cubic-bezier(.3,0,.3,1)" },
        { opacity: it.o, offset: it.e / CYCLE },
        { opacity: it.o, offset: fs / CYCLE },
        { opacity: 0, offset: fe / CYCLE },
        { opacity: 0, offset: 1 },
      ];
    }
    if (!it.el.animate) return;
    const a = it.el.animate(kf, { duration: CYCLE, iterations: Infinity, easing: "linear" });
    try {
      a.startTime = t0;
    } catch {
      /* Safari sometimes disallows setting startTime before the animation is ready */
    }
    animations.push(a);
  });

  return () => {
    animations.forEach((a) => a.cancel());
    ink.replaceChildren();
    ink2.replaceChildren();
  };
}

export default function ServiceBlueprintSketch() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const ink = svg.querySelector("#bp-ink");
    const ink2 = svg.querySelector("#bp-ink2");
    if (!ink || !ink2) return;
    return runSketch(ink, ink2);
  }, []);

  return (
    <div className="bp-sketch" aria-hidden="true">
      <svg ref={svgRef} viewBox="0 0 1280 820" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="bp-wob" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="11" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="3.1" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id="bp-wob2" x="-4%" y="-4%" width="108%" height="108%" colorInterpolationFilters="sRGB">
            <feTurbulence type="fractalNoise" baseFrequency="0.041" numOctaves="3" seed="29" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <g id="bp-ink" filter="url(#bp-wob)" fill="none" stroke="var(--ink)" strokeLinecap="round" strokeLinejoin="round" />
        <g id="bp-ink2" filter="url(#bp-wob2)" fill="none" stroke="var(--ink)" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
