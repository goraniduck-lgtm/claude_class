// 보석 모양 만들기. 결과는 중심이 (0,0)인 꼭짓점 목록(단위: 칸).
// 일반 다각형은 정다각형과 눈으로 구별되게 만든다.
import { centroid, isConvex, sideLengths, interiorAngles } from './geometry.js';

const TAU = Math.PI * 2;

function center(pts) {
  const [cx, cy] = centroid(pts);
  return pts.map(([x, y]) => [x - cx, y - cy]);
}

export function regular(n, R, start = -Math.PI / 2) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = start + (i * TAU) / n;
    pts.push([R * Math.cos(a), R * Math.sin(a)]);
  }
  return pts;
}

// 눈으로 정다각형과 구별되는가
function clearlyIrregular(pts) {
  const s = sideLengths(pts);
  const a = interiorAngles(pts);
  const sRatio = Math.max(...s) / Math.min(...s);
  const aSpread = Math.max(...a) - Math.min(...a);
  return sRatio >= 1.25 || aSpread >= 15;
}

function wellFormed(pts, minSide = 0.45, maxAngle = 165, minAngle = 28) {
  if (!isConvex(pts)) return false;
  const s = sideLengths(pts), a = interiorAngles(pts);
  return Math.min(...s) >= minSide && Math.max(...a) <= maxAngle && Math.min(...a) >= minAngle;
}

function irregularNgon(rng, n, Rlo, Rhi) {
  for (let t = 0; t < 400; t++) {
    const R = rng.range(Rlo, Rhi);
    const step = TAU / n;
    const pts = [];
    const start = rng.range(0, TAU);
    for (let i = 0; i < n; i++) {
      const ang = start + i * step + rng.range(-0.32, 0.32) * step;
      const r = R * rng.range(0.8, 1.0);
      pts.push([r * Math.cos(ang), r * Math.sin(ang)]);
    }
    if (wellFormed(pts) && clearlyIrregular(pts)) return center(pts);
  }
  return center(regular(n, Rhi)); // 거의 일어나지 않음
}

function triangle(rng) {
  for (let t = 0; t < 400; t++) {
    const R = rng.range(1.25, 1.7);
    const a0 = rng.range(0, TAU);
    const a1 = a0 + rng.range(1.4, 2.6);
    const a2 = a1 + rng.range(1.4, 2.6);
    if (a2 - a0 > TAU - 1.0) continue;
    const pts = [a0, a1, a2].map((a) => [R * Math.cos(a), R * Math.sin(a)]);
    if (wellFormed(pts, 0.9, 150, 30) && clearlyIrregular(pts)) return center(pts);
  }
  return center([[0, 0], [2.8, 0], [0.6, 2]]);
}

// 사다리꼴: 등변사다리꼴처럼 보이지 않게 윗변을 한쪽으로 치우친다
function trapezoid(rng) {
  const b = rng.range(2.6, 3.4);
  const t = rng.range(1.1, b * 0.6);
  const h = rng.range(1.4, 2.0);
  const half = (b - t) / 2;
  const shift = rng.range(0.3, 0.8) * half * (rng.chance(0.5) ? 1 : -1);
  const off = half + shift;
  return center([[0, h], [b, h], [off + t, 0], [off, 0]]);
}

function parallelogram(rng) {
  const b = rng.range(2.3, 3.0);
  const c = rng.range(1.4, Math.min(1.9, b * 0.75));
  const th = rng.range(55, 70) * Math.PI / 180;
  const dx = c * Math.cos(th), dy = c * Math.sin(th);
  return center([[0, dy], [b, dy], [b + dx, 0], [dx, 0]]);
}

function rectangle(rng) {
  const w = rng.range(2.5, 3.5);
  const ratio = rng.range(1.5, 2.0);
  const h = Math.max(1.3, w / ratio);
  return center([[0, 0], [w, 0], [w, h], [0, h]]);
}

function rhombus(rng) {
  const a = rng.range(1.7, 2.2);
  const th = rng.range(50, 68) * Math.PI / 180;
  const dx = a * Math.cos(th), dy = a * Math.sin(th);
  return center([[0, 0], [a, 0], [a + dx, dy], [dx, dy]]);
}

function square(rng) {
  const a = rng.range(1.7, 2.5);
  return center([[0, 0], [a, 0], [a, a], [0, a]]);
}

// 곡선 원석: 많은 점으로 근사 (그리기·넓이 계산 모두 이 점을 쓴다)
function circleStone(rng) {
  const r = rng.range(1.05, 1.4);
  const pts = [];
  for (let i = 0; i < 40; i++) {
    const a = (i * TAU) / 40;
    pts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  return pts;
}

function semiStone(rng) {
  const r = rng.range(1.35, 1.7);
  const pts = [];
  for (let i = 0; i <= 24; i++) {
    const a = Math.PI + (i * Math.PI) / 24;
    pts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  return center(pts);
}

function dropStone(rng) {
  const r = rng.range(0.95, 1.2);
  const tip = [0, -r * 2.1];
  const pts = [tip];
  // 접선이 만나는 각도
  const d = r * 2.1;
  const half = Math.acos(r / d);
  const startA = -Math.PI / 2 + half;
  const endA = -Math.PI / 2 - half + TAU;
  const steps = 28;
  for (let i = 0; i <= steps; i++) {
    const a = startA + ((endA - startA) * i) / steps;
    pts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  return center(pts);
}

const MAKERS = {
  tri: triangle,
  tri_reg: (rng) => regular(3, rng.range(1.2, 1.6)),
  trap: trapezoid,
  para: parallelogram,
  rect: rectangle,
  rhom: rhombus,
  sq: square,
  pent: (rng) => irregularNgon(rng, 5, 1.35, 1.7),
  pent_reg: (rng) => regular(5, rng.range(1.25, 1.6)),
  hex: (rng) => irregularNgon(rng, 6, 1.4, 1.75),
  hex_reg: (rng) => regular(6, rng.range(1.3, 1.65)),
  hept: (rng) => irregularNgon(rng, 7, 1.55, 1.85),
  oct: (rng) => irregularNgon(rng, 8, 1.6, 1.9),
  oct_reg: (rng) => regular(8, rng.range(1.55, 1.85), -Math.PI / 8),
  f_circle: circleStone,
  f_semi: semiStone,
  f_drop: dropStone,
};

export function makeShape(kind, rng, opts = {}) {
  if (kind === 'super') {
    const n = opts.sides || 6;
    return regular(n, rng.range(2.15, 2.4), n === 8 ? -Math.PI / 8 : -Math.PI / 2);
  }
  const fn = MAKERS[kind];
  if (!fn) throw new Error('unknown shape ' + kind);
  return fn(rng);
}

export const SHAPE_KINDS = Object.keys(MAKERS);

// 문제용: 변이 n개인 일반 다각형 (n = 3~12)
export function irregularPolygon(rng, n) {
  if (n === 3) return triangle(rng);
  if (n === 4) return rng.pick([trapezoid, parallelogram])(rng);
  return irregularNgon(rng, n, 1.4, 1.8);
}
