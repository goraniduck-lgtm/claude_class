// 다각형 계산: 넓이, 칸 자르기, 겹침 검사. 좌표 단위는 '칸'.

export function area(pts) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.abs(s) / 2;
}

export function centroid(pts) {
  let cx = 0, cy = 0;
  for (const [x, y] of pts) { cx += x; cy += y; }
  return [cx / pts.length, cy / pts.length];
}

export function transform(pts, angle, dx, dy) {
  const c = Math.cos(angle), s = Math.sin(angle);
  return pts.map(([x, y]) => [x * c - y * s + dx, x * s + y * c + dy]);
}

export function bounds(pts) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of pts) {
    if (x < x0) x0 = x; if (y < y0) y0 = y;
    if (x > x1) x1 = x; if (y > y1) y1 = y;
  }
  return { x0, y0, x1, y1, w: x1 - x0, h: y1 - y0 };
}

// 서덜랜드-호지먼: 다각형을 축에 나란한 사각형으로 자른다
export function clipRect(pts, x0, y0, x1, y1) {
  const edges = [
    (p) => p[0] >= x0, (p) => p[0] <= x1, (p) => p[1] >= y0, (p) => p[1] <= y1,
  ];
  const cut = [
    (a, b) => lerpAt(a, b, (x0 - a[0]) / (b[0] - a[0])),
    (a, b) => lerpAt(a, b, (x1 - a[0]) / (b[0] - a[0])),
    (a, b) => lerpAt(a, b, (y0 - a[1]) / (b[1] - a[1])),
    (a, b) => lerpAt(a, b, (y1 - a[1]) / (b[1] - a[1])),
  ];
  let out = pts;
  for (let e = 0; e < 4 && out.length; e++) {
    const inp = out;
    out = [];
    for (let i = 0; i < inp.length; i++) {
      const cur = inp[i], prev = inp[(i + inp.length - 1) % inp.length];
      const ci = edges[e](cur), pi = edges[e](prev);
      if (ci) {
        if (!pi) out.push(cut[e](prev, cur));
        out.push(cur);
      } else if (pi) {
        out.push(cut[e](prev, cur));
      }
    }
  }
  return out;
}

function lerpAt(a, b, t) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

// 칸(c, r)과 겹치는 넓이 비율 (칸 넓이 = 1)
export function cellCoverage(pts, c, r) {
  const piece = clipRect(pts, c, r, c + 1, r + 1);
  return piece.length >= 3 ? area(piece) : 0;
}

export function isConvex(pts) {
  let sign = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i], b = pts[(i + 1) % pts.length], c = pts[(i + 2) % pts.length];
    const cr = (b[0] - a[0]) * (c[1] - b[1]) - (b[1] - a[1]) * (c[0] - b[0]);
    if (Math.abs(cr) < 1e-9) continue;
    const s = Math.sign(cr);
    if (!sign) sign = s; else if (s !== sign) return false;
  }
  return true;
}

// 분리축 검사: 볼록다각형 두 개가 겹치는가
export function convexOverlap(a, b) {
  for (const poly of [a, b]) {
    for (let i = 0; i < poly.length; i++) {
      const p = poly[i], q = poly[(i + 1) % poly.length];
      const nx = q[1] - p[1], ny = p[0] - q[0];
      let aMin = Infinity, aMax = -Infinity, bMin = Infinity, bMax = -Infinity;
      for (const [x, y] of a) { const d = x * nx + y * ny; if (d < aMin) aMin = d; if (d > aMax) aMax = d; }
      for (const [x, y] of b) { const d = x * nx + y * ny; if (d < bMin) bMin = d; if (d > bMax) bMax = d; }
      if (aMax < bMin || bMax < aMin) return false;
    }
  }
  return true;
}

// 중심에서 바깥으로 d만큼 부풀린 근사 다각형
export function inflate(pts, d) {
  const [cx, cy] = centroid(pts);
  return pts.map(([x, y]) => {
    const vx = x - cx, vy = y - cy, len = Math.hypot(vx, vy) || 1;
    return [x + (vx / len) * d, y + (vy / len) * d];
  });
}

export function sideLengths(pts) {
  return pts.map((p, i) => {
    const q = pts[(i + 1) % pts.length];
    return Math.hypot(q[0] - p[0], q[1] - p[1]);
  });
}

// 내각(도)
export function interiorAngles(pts) {
  const n = pts.length;
  const ccw = signedArea(pts) > 0;
  return pts.map((b, i) => {
    const a = pts[(i + n - 1) % n], c = pts[(i + 1) % n];
    const v1 = [a[0] - b[0], a[1] - b[1]], v2 = [c[0] - b[0], c[1] - b[1]];
    let ang = Math.atan2(v1[0] * v2[1] - v1[1] * v2[0], v1[0] * v2[0] + v1[1] * v2[1]);
    ang = Math.abs(ang) * 180 / Math.PI;
    return ccw ? ang : ang;
  });
}

function signedArea(pts) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
}

export function pointInPolygon(x, y, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

export function diagonals(n) {
  return (n * (n - 3)) / 2;
}
