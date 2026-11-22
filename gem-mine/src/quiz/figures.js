// 문제 속 도형을 SVG로 그린다 (정확한 모양은 코드가 그린다).
import { bounds, transform, centroid } from '../core/geometry.js';

const INK = '#3a2412';
const FILL = '#fff3d6';

function fit(pts, size, pad) {
  const b = bounds(pts);
  const k = (size - pad * 2) / Math.max(b.w, b.h);
  const ox = (size - b.w * k) / 2 - b.x0 * k;
  const oy = (size - b.h * k) / 2 - b.y0 * k;
  return { map: ([x, y]) => [x * k + ox, y * k + oy], k };
}

const fmt = (p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`;
const txt = (x, y, s, { size = 17, color = '#b4320a', anchor = 'middle' } = {}) =>
  `<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="${anchor}" font-size="${size}" font-weight="700" fill="${color}" style="paint-order:stroke;stroke:#fffaf0;stroke-width:5px">${s}</text>`;

// opts: rotate, labels[{type:'side'|'angle', i, text}], segment, closed, sides(false면 변을 그리지 않음), diagonals('all'|'dashed'), dots
export function polygonSvg(pts, opts = {}) {
  const { size = 200, rotate = 0, labels = [], segment = null, closed = true, sides = true, diagonals = null, dots = true } = opts;
  const rp = rotate ? transform(pts, rotate, 0, 0) : pts;
  const pad = labels.length ? size * 0.2 : size * 0.13;
  const { map } = fit(rp, size, pad);
  const P = rp.map(map);
  let body = '';
  if (sides) {
    if (closed) body += `<polygon points="${P.map(fmt).join(' ')}" fill="${FILL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
    else body += `<polyline points="${P.map(fmt).join(' ')}" fill="none" stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>`;
  }
  if (diagonals) {
    const n = P.length;
    for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) {
      if (i === 0 && j === n - 1) continue;
      body += `<line x1="${P[i][0].toFixed(1)}" y1="${P[i][1].toFixed(1)}" x2="${P[j][0].toFixed(1)}" y2="${P[j][1].toFixed(1)}" stroke="${diagonals === 'dashed' ? '#2f6fd6' : INK}" stroke-width="${diagonals === 'dashed' ? 3 : 3.5}" ${diagonals === 'dashed' ? 'stroke-dasharray="7 5"' : ''} stroke-linecap="round"/>`;
    }
  }
  if (segment) {
    const a = map(segment[0]), b = map(segment[1]);
    body += `<line x1="${a[0].toFixed(1)}" y1="${a[1].toFixed(1)}" x2="${b[0].toFixed(1)}" y2="${b[1].toFixed(1)}" stroke="#e8251a" stroke-width="5" stroke-linecap="round"/>`;
  }
  if (closed && dots) for (const m of P) body += `<circle cx="${m[0].toFixed(1)}" cy="${m[1].toFixed(1)}" r="4.5" fill="${INK}"/>`;
  const c = centroid(P);
  for (const l of labels) {
    if (l.type === 'side') {
      const a = P[l.i], b = P[(l.i + 1) % P.length];
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
      const vx = mx - c[0], vy = my - c[1], len = Math.hypot(vx, vy) || 1;
      const tx = Math.min(size - 24, Math.max(24, mx + (vx / len) * 19));
      const ty = Math.min(size - 6, Math.max(18, my + (vy / len) * 19 + 6));
      body += txt(tx, ty, l.text);
    } else {
      const v = P[l.i];
      const vx = c[0] - v[0], vy = c[1] - v[1], len = Math.hypot(vx, vy) || 1;
      body += txt(v[0] + (vx / len) * 26, v[1] + (vy / len) * 26 + 6, l.text, { size: 15, color: '#1f4fa8' });
    }
  }
  if (segment == null && opts.segmentLabel) body += opts.segmentLabel;
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${body}</svg>`;
}

// 다각형이 아닌 도형들
export function nonPolygonSvg(kind, rng, size = 200) {
  const S = (inner) => `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
  if (kind === 'circle') {
    return S(`<ellipse cx="${size / 2}" cy="${size / 2}" rx="${size * 0.36}" ry="${size * rng.range(0.24, 0.36)}" fill="${FILL}" stroke="${INK}" stroke-width="4"/>`);
  }
  if (kind === 'semi') {
    const r = size * 0.36, cx = size / 2, cy = size * 0.62;
    return S(`<path d="M${cx - r} ${cy} A${r} ${r} 0 0 1 ${cx + r} ${cy} Z" fill="${FILL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`);
  }
  if (kind === 'open') {
    // 열린 도형: 한 변이 비어 있다
    const n = rng.pick([3, 4, 5]);
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (i * Math.PI * 2) / n + rng.range(-0.25, 0.25);
      pts.push([Math.cos(a) * rng.range(0.8, 1), Math.sin(a) * rng.range(0.8, 1)]);
    }
    return polygonSvg(pts, { size, closed: false });
  }
  // 한 변이 굽은 선인 도형
  const w = size * 0.62, h = size * 0.5, x0 = (size - w) / 2, y0 = (size - h) / 2 + size * 0.06;
  return S(`<path d="M${x0} ${y0 + h} L${x0 + w} ${y0 + h} L${x0 + w} ${y0} Q${x0 + w / 2} ${y0 - h * 0.5} ${x0} ${y0} Z" fill="${FILL}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`);
}

// 생활 속 다각형: 교통안전 표지판과 시계 (모양은 정다각형, 이름은 변의 수로)
export function lifeSvg(kind, size = 200) {
  const c = size / 2, R = size * 0.38;
  const reg = (n, start, r = R) => Array.from({ length: n }, (_, i) => {
    const a = start + (i * Math.PI * 2) / n; return [c + r * Math.cos(a), c + r * Math.sin(a)];
  });
  const poly = (pts, fill, stroke, w = 8) => `<polygon points="${pts.map(fmt).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round"/>`;
  const S = (inner) => `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
  const pole = `<rect x="${c - 5}" y="${c + R * 0.6}" width="10" height="${size}" fill="#8a8f96"/>`;
  switch (kind) {
    case 'stop': return S(pole + poly(reg(8, -Math.PI / 8), '#d8261c', '#fff', 6) + `<text x="${c}" y="${c + 12}" text-anchor="middle" font-size="34" font-weight="700" fill="#fff">정지</text>`);
    case 'warn': return S(pole + poly(reg(3, -Math.PI / 2, R * 1.1).map(([x, y]) => [x, y + 10]), '#ffd23a', '#d8261c', 9) + `<text x="${c}" y="${c + 26}" text-anchor="middle" font-size="48" font-weight="700" fill="#222">!</text>`);
    case 'child': {
      const w = R * 1.5, x0 = c - w / 2, top = c - R, mid = c - R * 0.35, bot = c + R * 0.8;
      return S(pole + `<polygon points="${c},${top} ${x0 + w},${mid} ${x0 + w},${bot} ${x0},${bot} ${x0},${mid}" fill="#ffd23a" stroke="#222" stroke-width="6" stroke-linejoin="round"/>` +
        `<text x="${c}" y="${c + 22}" text-anchor="middle" font-size="22" font-weight="700" fill="#222">어린이</text>`);
    }
    case 'square': return S(pole + poly([[c - R, c - R], [c + R, c - R], [c + R, c + R], [c - R, c + R]], '#2a5bd7', '#fff', 6) + `<text x="${c}" y="${c + 9}" text-anchor="middle" font-size="24" font-weight="700" fill="#fff">횡단보도</text>`);
    default: {
      const n = { clock5: 5, clock6: 6, clock8: 8 }[kind] || 6;
      const pts = reg(n, n === 8 ? -Math.PI / 8 : -Math.PI / 2);
      const nums = [[12, 0], [3, 90], [6, 180], [9, 270]].map(([t, deg]) => {
        const a = (deg - 90) * Math.PI / 180; return `<text x="${(c + Math.cos(a) * R * 0.66).toFixed(1)}" y="${(c + Math.sin(a) * R * 0.66 + 7).toFixed(1)}" text-anchor="middle" font-size="18" font-weight="700" fill="#3a2412">${t}</text>`;
      }).join('');
      return S(poly(pts, '#fff7e6', '#7a4e28', 9) + nums + `<line x1="${c}" y1="${c}" x2="${c}" y2="${c - R * 0.5}" stroke="#3a2412" stroke-width="5" stroke-linecap="round"/><line x1="${c}" y1="${c}" x2="${c + R * 0.38}" y2="${c + R * 0.12}" stroke="#3a2412" stroke-width="5" stroke-linecap="round"/><circle cx="${c}" cy="${c}" r="5" fill="#3a2412"/>`);
    }
  }
}
