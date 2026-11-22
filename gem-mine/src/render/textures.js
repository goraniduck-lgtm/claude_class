// 코드로 그린 임시 그림. assets.json에 이미지가 있으면 그 이미지를 쓴다.
import { makeRng } from '../core/rng.js';
import { img, meta } from '../assets/loader.js';
import { centroid, bounds } from '../core/geometry.js';

const cache = new Map();
export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.round(w)); c.height = Math.max(1, Math.round(h));
  return c;
}
function cached(key, fn) {
  if (!cache.has(key)) cache.set(key, fn());
  return cache.get(key);
}

const TILE_COL = {
  dirt: { a: '#b07a43', b: '#8f5d2f', speck: ['#c99560', '#7a4c24', '#6a4020'] },
  stone: { a: '#93877a', b: '#74695c', speck: ['#a89c8e', '#625849'] },
  rock: { a: '#4c4549', b: '#332d31', speck: ['#5e565b', '#2a2427'] },
};

export function tileTexture(type, variant, size) {
  return cached(`t:${type}:${variant}:${size}`, () => {
    const c = makeCanvas(size, size), g = c.getContext('2d');
    const asset = img(`tile.${type}`);
    if (asset) { g.drawImage(asset, 0, 0, size, size); bevel(g, size); return c; }
    const rng = makeRng(1000 + variant * 97 + type.length * 13);
    const col = TILE_COL[type];
    const grad = g.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, col.a); grad.addColorStop(1, col.b);
    g.fillStyle = grad; g.fillRect(0, 0, size, size);
    const s = size / 72;
    if (type === 'dirt') {
      for (let i = 0; i < 70; i++) {
        g.fillStyle = rng.pick(col.speck); g.globalAlpha = rng.range(0.25, 0.6);
        g.beginPath(); g.arc(rng.range(0, size), rng.range(0, size), rng.range(0.8, 2.4) * s, 0, 7); g.fill();
      }
      g.globalAlpha = 1;
      for (let i = 0; i < 3; i++) pebble(g, rng, rng.range(8, size - 8), rng.range(8, size - 8), rng.range(3, 6) * s, '#9a8a76');
    } else if (type === 'stone') {
      for (let i = 0; i < 9; i++) {
        const x = rng.range(4, size - 4), y = rng.range(4, size - 4), r = rng.range(8, 15) * s;
        pebble(g, rng, x, y, r, rng.pick(['#9d9183', '#8a7e70', '#a69a8c']));
      }
    } else {
      // 단단한 바위: 금처럼 보이지 않게 결은 아주 옅게, 광맥은 작은 반점으로
      for (let i = 0; i < 6; i++) {
        const x = rng.range(6, size - 6), y = rng.range(6, size - 6), r = rng.range(9, 16) * s;
        g.fillStyle = rng.chance(0.5) ? 'rgba(255,255,255,.06)' : 'rgba(0,0,0,.14)';
        g.beginPath(); g.moveTo(x, y - r); g.lineTo(x + r, y - r * 0.2); g.lineTo(x + r * 0.5, y + r); g.lineTo(x - r * 0.8, y + r * 0.6); g.lineTo(x - r, y - r * 0.3); g.closePath(); g.fill();
      }
      g.save();
      g.shadowColor = '#ff8a1c'; g.shadowBlur = 5 * s;
      g.fillStyle = '#ffb05a';
      for (let i = 0; i < 4; i++) {
        g.beginPath(); g.ellipse(rng.range(10, size - 10), rng.range(10, size - 10), rng.range(1.5, 3) * s, rng.range(1, 2) * s, rng.range(0, 3), 0, 7); g.fill();
      }
      g.restore();
    }
    bevel(g, size);
    return c;
  });
}

function pebble(g, rng, x, y, r, color) {
  g.save();
  g.fillStyle = 'rgba(0,0,0,.28)';
  g.beginPath(); g.ellipse(x + r * 0.15, y + r * 0.2, r, r * 0.78, 0, 0, 7); g.fill();
  g.fillStyle = color;
  g.beginPath(); g.ellipse(x, y, r, r * 0.78, rng.range(-0.5, 0.5), 0, 7); g.fill();
  g.fillStyle = 'rgba(255,255,255,.22)';
  g.beginPath(); g.ellipse(x - r * 0.3, y - r * 0.3, r * 0.42, r * 0.25, -0.5, 0, 7); g.fill();
  g.restore();
}

function bevel(g, size) {
  const w = Math.max(2, size / 24);
  g.fillStyle = 'rgba(255,255,255,.16)';
  g.fillRect(0, 0, size, w); g.fillRect(0, 0, w, size);
  g.fillStyle = 'rgba(0,0,0,.22)';
  g.fillRect(0, size - w, size, w); g.fillRect(size - w, 0, w, size);
}

export function floorTexture(w, h) {
  return cached(`floor:${w}:${h}`, () => {
    const c = makeCanvas(w, h), g = c.getContext('2d');
    const asset = img('board.floor');
    if (asset) {
      const pat = g.createPattern(asset, 'repeat'); g.fillStyle = pat; g.fillRect(0, 0, w, h); return c;
    }
    const rng = makeRng(77);
    const grad = g.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#3e2817'); grad.addColorStop(1, '#2c1b0f');
    g.fillStyle = grad; g.fillRect(0, 0, w, h);
    for (let i = 0; i < w * h / 60; i++) {
      g.fillStyle = rng.chance(0.5) ? 'rgba(0,0,0,.25)' : 'rgba(120,80,45,.25)';
      g.fillRect(rng.range(0, w), rng.range(0, h), rng.range(1, 3), rng.range(1, 3));
    }
    for (let i = 0; i < w * h / 4000; i++) pebble(g, rng, rng.range(0, w), rng.range(0, h), rng.range(2, 5), '#5a4634');
    return c;
  });
}

export function frameCanvas(W, H, F, pr) {
  return cached(`frame:${W}:${H}:${F}:${pr}`, () => {
    const c = makeCanvas(W * pr, H * pr), g = c.getContext('2d');
    g.scale(pr, pr);
    const asset = img('frame.wood');
    if (asset) {
      const s = (meta('frame.wood') || {}).slice || 48;
      nineSlice(g, asset, s, 0, 0, W, H, F);
      return c;
    }
    const beam = (x, y, w, h, horiz) => {
      const gr = horiz ? g.createLinearGradient(0, y, 0, y + h) : g.createLinearGradient(x, 0, x + w, 0);
      gr.addColorStop(0, '#a8743f'); gr.addColorStop(0.5, '#8a5a2b'); gr.addColorStop(1, '#5e3a1a');
      g.fillStyle = gr; g.fillRect(x, y, w, h);
      g.strokeStyle = 'rgba(60,32,12,.45)'; g.lineWidth = 1.2;
      const rng = makeRng(Math.round(x * 7 + y * 13));
      for (let i = 0; i < 4; i++) {
        g.beginPath();
        if (horiz) { const yy = y + rng.range(3, h - 3); g.moveTo(x, yy); g.bezierCurveTo(x + w * .3, yy + rng.range(-3, 3), x + w * .7, yy + rng.range(-3, 3), x + w, yy); }
        else { const xx = x + rng.range(3, w - 3); g.moveTo(xx, y); g.bezierCurveTo(xx + rng.range(-3, 3), y + h * .3, xx + rng.range(-3, 3), y + h * .7, xx, y + h); }
        g.stroke();
      }
      g.strokeStyle = '#3a2210'; g.lineWidth = 2; g.strokeRect(x + 1, y + 1, w - 2, h - 2);
    };
    beam(F, 0, W - 2 * F, F, true);
    beam(F, H - F, W - 2 * F, F, true);
    beam(0, 0, F, H, false);
    beam(W - F, 0, F, H, false);
    const bolt = (x, y) => {
      g.fillStyle = '#2a2a2e'; g.beginPath(); g.arc(x, y, F * 0.22, 0, 7); g.fill();
      g.fillStyle = '#9aa3ad'; g.beginPath(); g.arc(x - 1, y - 1, F * 0.15, 0, 7); g.fill();
    };
    for (const [x, y] of [[F / 2, F / 2], [W - F / 2, F / 2], [F / 2, H - F / 2], [W - F / 2, H - F / 2], [W / 2, F / 2], [W / 2, H - F / 2], [F / 2, H / 2], [W - F / 2, H / 2]]) bolt(x, y);
    // 모서리 꺾쇠
    g.fillStyle = 'rgba(70,74,82,.9)';
    for (const [x, y, sx, sy] of [[0, 0, 1, 1], [W, 0, -1, 1], [0, H, 1, -1], [W, H, -1, -1]]) {
      g.beginPath(); g.moveTo(x, y); g.lineTo(x + sx * F * 1.6, y); g.lineTo(x + sx * F * 1.6, y + sy * 5); g.lineTo(x + sx * 5, y + sy * 5); g.lineTo(x + sx * 5, y + sy * F * 1.6); g.lineTo(x, y + sy * F * 1.6); g.closePath(); g.fill();
    }
    return c;
  });
}

function nineSlice(g, im, s, x, y, w, h, F) {
  const iw = im.width, ih = im.height;
  const src = [[0, s], [s, iw - 2 * s], [iw - s, s]];
  const srcY = [[0, s], [s, ih - 2 * s], [ih - s, s]];
  const dst = [[x, F], [x + F, w - 2 * F], [x + w - F, F]];
  const dstY = [[y, F], [y + F, h - 2 * F], [y + h - F, F]];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    if (r === 1 && c === 1) continue;
    g.drawImage(im, src[c][0], srcY[r][0], src[c][1], srcY[r][1], dst[c][0], dstY[r][0], dst[c][1], dstY[r][1]);
  }
}

export function drawCrack(g, x, y, s, level, seed) {
  const key = level === 1 ? 'tile.crack1' : 'tile.crack2';
  const asset = img(key);
  if (asset) { g.drawImage(asset, x, y, s, s); return; }
  const rng = makeRng(seed * 31 + level);
  g.save();
  g.strokeStyle = 'rgba(20,10,4,.85)'; g.lineWidth = Math.max(1.5, s / 30); g.lineCap = 'round'; g.lineJoin = 'round';
  const cx = x + s * rng.range(0.4, 0.6), cy = y + s * rng.range(0.4, 0.6);
  const branches = level === 1 ? 3 : 6;
  for (let i = 0; i < branches; i++) {
    let a = rng.range(0, 6.28), px = cx, py = cy;
    g.beginPath(); g.moveTo(px, py);
    const steps = level === 1 ? 2 : 3;
    for (let k = 0; k < steps; k++) {
      a += rng.range(-0.6, 0.6);
      const len = s * rng.range(0.1, 0.2);
      px = Math.min(x + s - 2, Math.max(x + 2, px + Math.cos(a) * len));
      py = Math.min(y + s - 2, Math.max(y + 2, py + Math.sin(a) * len));
      g.lineTo(px, py);
    }
    g.stroke();
  }
  g.restore();
}

// 잡동사니 (무채색, 둥근 실루엣: 보석 단서와 헷갈리지 않게)
export function drawJunk(g, type, x, y, size, rot) {
  const asset = img(`junk.${type}`);
  g.save(); g.translate(x, y); g.rotate(rot);
  if (asset) { g.drawImage(asset, -size / 2, -size / 2, size, size); g.restore(); return; }
  const s = size / 2;
  g.lineWidth = Math.max(1.5, s / 9); g.strokeStyle = '#2a2018'; g.lineJoin = 'round'; g.lineCap = 'round';
  const fill = (c) => { g.fillStyle = c; g.fill(); g.stroke(); };
  g.globalAlpha = 0.9;
  switch (type) {
    case 'skull':
      g.beginPath(); g.ellipse(0, -s * 0.15, s * 0.7, s * 0.62, 0, 0, 7); fill('#d8d0bf');
      g.beginPath(); g.roundRect(-s * 0.38, s * 0.3, s * 0.76, s * 0.4, s * 0.12); fill('#d8d0bf');
      g.fillStyle = '#2a2018';
      g.beginPath(); g.ellipse(-s * 0.26, -s * 0.12, s * 0.17, s * 0.2, 0, 0, 7); g.fill();
      g.beginPath(); g.ellipse(s * 0.26, -s * 0.12, s * 0.17, s * 0.2, 0, 0, 7); g.fill();
      break;
    case 'bone':
      g.beginPath(); g.roundRect(-s * 0.7, -s * 0.13, s * 1.4, s * 0.26, s * 0.1); fill('#d8d0bf');
      for (const sx of [-1, 1]) for (const sy of [-1, 1]) { g.beginPath(); g.arc(sx * s * 0.72, sy * s * 0.16, s * 0.2, 0, 7); fill('#d8d0bf'); }
      break;
    case 'boot':
      g.beginPath(); g.moveTo(-s * 0.3, -s * 0.7); g.lineTo(s * 0.15, -s * 0.7); g.lineTo(s * 0.18, s * 0.15); g.quadraticCurveTo(s * 0.75, s * 0.2, s * 0.75, s * 0.55); g.lineTo(-s * 0.35, s * 0.55); g.closePath(); fill('#6e5a48');
      break;
    case 'can':
      g.beginPath(); g.roundRect(-s * 0.4, -s * 0.55, s * 0.8, s * 1.1, s * 0.15); fill('#8c949c');
      g.beginPath(); g.moveTo(-s * 0.4, -s * 0.15); g.lineTo(s * 0.4, -s * 0.15); g.stroke();
      break;
    case 'fish':
      g.beginPath(); g.moveTo(-s * 0.7, 0); g.lineTo(s * 0.45, 0); g.stroke();
      for (let i = -2; i <= 2; i++) { g.beginPath(); g.moveTo(i * s * 0.18, -s * 0.28); g.lineTo(i * s * 0.18, s * 0.28); g.stroke(); }
      g.beginPath(); g.moveTo(s * 0.45, 0); g.lineTo(s * 0.75, -s * 0.25); g.lineTo(s * 0.75, s * 0.25); g.closePath(); fill('#c8c0b0');
      g.beginPath(); g.arc(-s * 0.72, 0, s * 0.16, 0, 7); fill('#c8c0b0');
      break;
    case 'bottle':
      g.beginPath(); g.roundRect(-s * 0.3, -s * 0.2, s * 0.6, s * 0.8, s * 0.15); fill('#7f9a86');
      g.beginPath(); g.roundRect(-s * 0.12, -s * 0.65, s * 0.24, s * 0.5, s * 0.06); fill('#7f9a86');
      break;
    case 'gear':
      g.beginPath();
      for (let i = 0; i < 16; i++) { const a = (i / 16) * 6.283, r = i % 2 ? s * 0.48 : s * 0.62; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
      g.closePath(); fill('#8a7f74');
      g.beginPath(); g.arc(0, 0, s * 0.18, 0, 7); g.fillStyle = '#3e2817'; g.fill(); g.stroke();
      break;
    default: // sock
      g.beginPath(); g.moveTo(-s * 0.25, -s * 0.7); g.lineTo(s * 0.2, -s * 0.7); g.lineTo(s * 0.22, s * 0.1); g.quadraticCurveTo(s * 0.7, s * 0.15, s * 0.55, s * 0.6); g.quadraticCurveTo(-s * 0.1, s * 0.75, -s * 0.25, s * 0.2); g.closePath(); fill('#a89a8a');
      g.beginPath(); g.moveTo(-s * 0.25, -s * 0.45); g.lineTo(s * 0.2, -s * 0.45); g.stroke();
  }
  g.restore();
}

// 보석 그리기: 정확한 모양은 코드가, 색과 질감은 재질 정보(또는 질감 이미지)가 맡는다
export function drawGem(g, gem, cs, t = 0, opts = {}) {
  const pts = gem.poly.map(([x, y]) => [x * cs, y * cs]);
  const m = gem.material;
  const b = bounds(pts);
  const [cx, cy] = centroid(pts);
  g.save();
  if (opts.alpha != null) g.globalAlpha = opts.alpha;
  const path = () => { g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.closePath(); };
  if (opts.glow) { g.shadowColor = m.rainbow ? '#ff9af0' : m.light; g.shadowBlur = opts.glow; }
  path();
  let fillStyle;
  const tex = img(m.rainbow ? 'gem.tex.super' : `gem.tex.${m.id}`);
  if (tex) {
    // 질감 그림은 보석 크기에 맞춰 줄여 깎은 면이 여러 개 보이게 한다
    fillStyle = g.createPattern(tex, 'repeat');
    const span = Math.max(b.x1 - b.x0, b.y1 - b.y0) || 100;
    const k = Math.min(1, (span * 1.1) / tex.width);
    if (fillStyle && fillStyle.setTransform) fillStyle.setTransform(new DOMMatrix().translate(b.x0, b.y0).scale(k));
  } else if (m.rainbow) {
    const gr = g.createLinearGradient(b.x0, b.y0, b.x1, b.y1);
    const hues = [0, 45, 90, 160, 210, 270, 320];
    hues.forEach((h, i) => gr.addColorStop(i / (hues.length - 1), `hsl(${(h + t * 60) % 360} 90% 62%)`));
    fillStyle = gr;
  } else {
    const gr = g.createLinearGradient(b.x0, b.y0, b.x1, b.y1);
    gr.addColorStop(0, m.light); gr.addColorStop(0.45, m.base); gr.addColorStop(1, m.dark);
    fillStyle = gr;
  }
  g.fillStyle = fillStyle; g.fill();
  g.shadowBlur = 0;
  g.save(); path(); g.clip();
  if (!gem.fake) {
    // 면 나눔: 바깥 띠를 변마다 밝기를 달리해 깎은 면처럼
    const inner = pts.map(([x, y]) => [cx + (x - cx) * 0.55, cy + (y - cy) * 0.55]);
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], bb = pts[(i + 1) % pts.length], ia = inner[i], ib = inner[(i + 1) % pts.length];
      const nx = (a[1] + bb[1]) / 2 - cy, ny = -((a[0] + bb[0]) / 2 - cx);
      const lit = (-(a[0] + bb[0]) / 2 + cx) * 0.7 + (-(a[1] + bb[1]) / 2 + cy) * 0.7;
      const k = lit / (Math.hypot(nx, ny) || 1);
      g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(bb[0], bb[1]); g.lineTo(ib[0], ib[1]); g.lineTo(ia[0], ia[1]); g.closePath();
      g.fillStyle = k > 0 ? `rgba(255,255,255,${Math.min(0.32, k * 0.3)})` : `rgba(0,0,0,${Math.min(0.28, -k * 0.25)})`;
      g.fill();
    }
    g.beginPath(); inner.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.closePath();
    g.fillStyle = 'rgba(255,255,255,.18)'; g.fill();
    g.strokeStyle = 'rgba(255,255,255,.35)'; g.lineWidth = Math.max(1, cs / 50);
    for (let i = 0; i < pts.length; i++) { g.beginPath(); g.moveTo(pts[i][0], pts[i][1]); g.lineTo(inner[i][0], inner[i][1]); g.stroke(); }
    g.stroke();
  } else {
    // 곡선 원석: 매끈한 광택
    const gr = g.createRadialGradient(cx - b.w * 0.18, cy - b.h * 0.22, 2, cx, cy, Math.max(b.w, b.h) * 0.6);
    gr.addColorStop(0, 'rgba(255,255,255,.55)'); gr.addColorStop(0.35, 'rgba(255,255,255,.05)'); gr.addColorStop(1, 'rgba(0,0,0,.25)');
    g.fillStyle = gr; g.fillRect(b.x0, b.y0, b.w, b.h);
  }
  g.restore();
  // 윤곽선: 어두운 바깥선 + 밝은 안쪽선 (변의 방향이 잘 보이게)
  path();
  g.lineJoin = gem.fake ? 'round' : 'miter';
  g.strokeStyle = 'rgba(20,10,4,.9)'; g.lineWidth = Math.max(2, cs / 22); g.stroke();
  g.strokeStyle = 'rgba(255,255,255,.95)'; g.lineWidth = Math.max(1.2, cs / 40); g.stroke();
  // 꼭짓점 반짝임
  if (!gem.fake && opts.vertices !== false) {
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const tw = 0.6 + 0.4 * Math.sin(t * 3 + i * 1.7);
      g.fillStyle = `rgba(255,255,255,${0.75 * tw + 0.25})`;
      g.beginPath(); g.arc(p[0], p[1], Math.max(2, cs / 22), 0, 7); g.fill();
    }
  }
  g.restore();
}

// 보석 하나를 작은 캔버스에 맞춰 그린다 (감정소·캔 보석 칸용)
// opts.diagonals: 그을 대각선 수(숫자) 또는 'dashed'(두 대각선을 점선으로)
export function gemThumb(canvas, gem, t = 0, opts = {}) {
  const g = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  g.clearRect(0, 0, W, H);
  const b = bounds(gem.poly);
  const k = Math.min((W * 0.82) / b.w, (H * 0.82) / b.h);
  g.save();
  g.translate(W / 2 - ((b.x0 + b.x1) / 2) * k, H / 2 - ((b.y0 + b.y1) / 2) * k);
  drawGem(g, gem, k, t, { glow: 10 });
  if (opts.diagonals != null && !gem.fake) {
    const P = gem.poly.map(([x, y]) => [x * k, y * k]);
    const n = P.length;
    const pairs = [];
    for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) if (!(i === 0 && j === n - 1)) pairs.push([i, j]);
    const count = opts.diagonals === 'dashed' ? pairs.length : Math.min(pairs.length, opts.diagonals);
    g.save();
    g.lineCap = 'round';
    if (opts.diagonals === 'dashed') g.setLineDash([10, 7]);
    for (let q = 0; q < count; q++) {
      const [i, j] = pairs[q];
      g.strokeStyle = 'rgba(20,10,4,.85)'; g.lineWidth = 6;
      g.beginPath(); g.moveTo(P[i][0], P[i][1]); g.lineTo(P[j][0], P[j][1]); g.stroke();
      g.strokeStyle = q === count - 1 && opts.diagonals !== 'dashed' ? '#ffe066' : '#ffffff'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(P[i][0], P[i][1]); g.lineTo(P[j][0], P[j][1]); g.stroke();
    }
    g.restore();
  }
  g.restore();
}

// 광산 벽 배경
export function drawBackground(canvas) {
  const g = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const asset = img('bg.main');
  if (asset) { g.drawImage(asset, 0, 0, W, H); return; }
  const rng = makeRng(2026);
  const gr = g.createLinearGradient(0, 0, 0, H);
  gr.addColorStop(0, '#2e1d10'); gr.addColorStop(1, '#170e07');
  g.fillStyle = gr; g.fillRect(0, 0, W, H);
  for (let i = 0; i < 70; i++) {
    const x = rng.range(0, W), y = rng.range(0, H), r = rng.range(20, 70);
    g.fillStyle = rng.chance(0.5) ? 'rgba(80,56,36,.35)' : 'rgba(10,6,3,.35)';
    g.beginPath(); g.ellipse(x, y, r, r * rng.range(0.5, 0.8), rng.range(0, 3), 0, 7); g.fill();
  }
  const crystal = (x, y, s, hue) => {
    g.save(); g.shadowColor = `hsl(${hue} 90% 60%)`; g.shadowBlur = 24;
    for (let i = 0; i < 4; i++) {
      const a = -Math.PI / 2 + rng.range(-0.8, 0.8), h = s * rng.range(0.6, 1.2), w = s * 0.22;
      g.save(); g.translate(x + rng.range(-s * 0.4, s * 0.4), y); g.rotate(a + Math.PI / 2);
      g.fillStyle = `hsl(${hue} 85% ${rng.range(55, 72)}%)`;
      g.beginPath(); g.moveTo(-w, 0); g.lineTo(-w, -h * 0.75); g.lineTo(0, -h); g.lineTo(w, -h * 0.75); g.lineTo(w, 0); g.closePath(); g.fill();
      g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.moveTo(-w, -h * 0.75); g.lineTo(0, -h); g.lineTo(0, 0); g.lineTo(-w, 0); g.closePath(); g.fill();
      g.restore();
    }
    g.restore();
  };
  crystal(60, 790, 70, 190); crystal(1230, 795, 80, 280); crystal(1240, 120, 50, 190); crystal(410, 100, 34, 280); crystal(1054, 98, 30, 160);
  // 공룡 화석 (코믹)
  g.save(); g.strokeStyle = 'rgba(230,214,180,.28)'; g.lineWidth = 5; g.lineCap = 'round';
  g.translate(640, 760);
  g.beginPath(); g.moveTo(-260, 0); g.quadraticCurveTo(-120, -60, 0, -40); g.quadraticCurveTo(140, -20, 260, -70); g.stroke();
  for (let i = -6; i <= 6; i++) { g.beginPath(); g.moveTo(i * 30, -40 + Math.abs(i) * 2); g.lineTo(i * 30 + 8, -2); g.stroke(); }
  g.beginPath(); g.ellipse(290, -84, 34, 20, -0.4, 0, 7); g.stroke();
  g.restore();
}
