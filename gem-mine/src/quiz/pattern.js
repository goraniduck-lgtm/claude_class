// 모양 조각 (교과서 5·6차시). 정삼각형 한 개 = 넓이 1 단위인 삼각형 격자 위에서 움직인다.
const H = Math.sqrt(3) / 2;

export const PIECES = {
  tri:  { name: '정삼각형', color: '#3faa45', edge: '#1f6b2a', area: 1, pts: [[0, 0], [1, 0], [0.5, -H]] },
  rhom: { name: '마름모',   color: '#2f6fd6', edge: '#163f86', area: 2, pts: [[0, 0], [1, 0], [1.5, -H], [0.5, -H]] },
  trap: { name: '사다리꼴', color: '#e5412b', edge: '#8e2112', area: 3, pts: [[0, 0], [2, 0], [1.5, -H], [0.5, -H]] },
  hex:  { name: '정육각형', color: '#f5c518', edge: '#9a7a00', area: 6, pts: [[0, 0], [1, 0], [1.5, -H], [1, -2 * H], [0, -2 * H], [-0.5, -H]] },
  sq:   { name: '정사각형', color: '#f08a1c', edge: '#8a4a06', area: 0, pts: [[0, 0], [1, 0], [1, -1], [0, -1]] },
};

export function rotate(pts, k, ax = 0, ay = 0) {
  const a = (k * Math.PI) / 3, c = Math.cos(a), s = Math.sin(a);
  return pts.map(([x, y]) => [ax + x * c - y * s, ay + x * s + y * c]);
}

// 큰 모양(목표). 꼭짓점 좌표, 단위 = 정삼각형 한 변
export const TARGETS = {
  hex1: { name: '정육각형', pts: [[0, 0], [1, 0], [1.5, -H], [1, -2 * H], [0, -2 * H], [-0.5, -H]] },
  trap1: { name: '사다리꼴', pts: PIECES.trap.pts },
  rhom1: { name: '마름모', pts: PIECES.rhom.pts },
  tri2: { name: '큰 정삼각형', pts: [[0, 0], [2, 0], [1, -2 * H]] },
  tri3: { name: '큰 정삼각형', pts: [[0, 0], [3, 0], [1.5, -3 * H]] },
  para42: { name: '평행사변형', pts: [[0, 0], [4, 0], [5, -2 * H], [1, -2 * H]] },
  hex2: { name: '큰 정육각형', pts: [[0, 0], [2, 0], [3, -2 * H], [2, -4 * H], [0, -4 * H], [-1, -2 * H]] },
  trap3: { name: '큰 사다리꼴', pts: [[0, 0], [4, 0], [3, -2 * H], [1, -2 * H]] },
};

export function areaUnits(pts) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x1, y1] = pts[i], [x2, y2] = pts[(i + 1) % pts.length];
    s += x1 * y2 - x2 * y1;
  }
  return Math.round(Math.abs(s) / 2 / (H / 2));
}

export function svgPoly(pts, map, fill, stroke, extra = '') {
  return `<polygon points="${pts.map((p) => map(p).map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="3" stroke-linejoin="round" ${extra}/>`;
}

// 점들을 size 상자에 맞추는 변환
export function fitMap(allPts, size, pad = 16, span = 0) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [x, y] of allPts) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); }
  const k = (size - pad * 2) / (span || Math.max(x1 - x0, y1 - y0));
  const ox = (size - (x1 - x0) * k) / 2 - x0 * k, oy = (size - (y1 - y0) * k) / 2 - y0 * k;
  return (p) => [p[0] * k + ox, p[1] * k + oy];
}

// 보기 조각끼리 크기를 비교할 수 있게 같은 비율(가로 2칸 기준)로 그린다.
export function pieceSvg(type, size = 110) {
  const p = PIECES[type];
  const map = fitMap(p.pts, size, size * 0.1, 2);
  return `<svg viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg" aria-label="${p.name} 조각">${svgPoly(p.pts, map, p.color, p.edge)}</svg>`;
}
