// 승강기 퍼즐: 모양 조각으로 주어진 모양을 겹치지 않게 빈틈없이 채운다 (교과서 6차시 모양 채우기).
// 삼각형 격자 위에서만 움직이므로 조각을 고르고 넣을 곳을 누르면 알맞게 들어간다.
import { PIECES, TARGETS, rotate, pieceSvg } from '../quiz/pattern.js';
import { pointInPolygon } from '../core/geometry.js';

const H = Math.sqrt(3) / 2;
const TYPES = ['hex', 'trap', 'rhom', 'tri'];

function insideConvex(pts, poly, eps = 1e-6) {
  // 모든 점이 볼록다각형 안(경계 포함)에 있는가
  const n = poly.length;
  let sign = 0;
  for (let i = 0; i < n; i++) {
    const a = poly[i], b = poly[(i + 1) % n];
    const cr = (b[0] - a[0]) * (poly[(i + 2) % n][1] - b[1]) - (b[1] - a[1]) * (poly[(i + 2) % n][0] - b[0]);
    if (Math.abs(cr) > 1e-9) { sign = Math.sign(cr); break; }
  }
  return pts.every(([x, y]) => {
    for (let i = 0; i < n; i++) {
      const a = poly[i], b = poly[(i + 1) % n];
      const cr = (b[0] - a[0]) * (y - a[1]) - (b[1] - a[1]) * (x - a[0]);
      if (cr * sign < -eps) return false;
    }
    return true;
  });
}

export function buildPuzzle(targetKey) {
  const target = TARGETS[targetKey];
  const xs = target.pts.map((p) => p[0]), ys = target.pts.map((p) => p[1]);
  const jMin = Math.floor(-Math.max(...ys) / H) - 1, jMax = Math.ceil(-Math.min(...ys) / H) + 1;
  const iMin = Math.floor(Math.min(...xs)) - jMax - 2, iMax = Math.ceil(Math.max(...xs)) + 2;
  const tris = [];
  for (let j = jMin; j <= jMax; j++) for (let i = iMin; i <= iMax; i++) {
    const bx = i + j / 2, by = -j * H;
    const up = [[bx, by], [bx + 1, by], [bx + 0.5, by - H]];
    const down = [[bx + 1, by], [bx + 1.5, by - H], [bx + 0.5, by - H]];
    for (const t of [up, down]) {
      const c = [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3];
      if (pointInPolygon(c[0], c[1], target.pts)) tris.push({ id: tris.length, pts: t, c });
    }
  }
  const placements = [];
  const seen = new Set();
  for (const type of TYPES) {
    const P = PIECES[type];
    for (let k = 0; k < 6; k++) for (let j = jMin; j <= jMax; j++) for (let i = iMin; i <= iMax; i++) {
      const ax = i + j / 2, ay = -j * H;
      const pts = rotate(P.pts, k).map(([x, y]) => [x + ax, y + ay]);
      if (!insideConvex(pts, target.pts)) continue;
      const cover = tris.filter((t) => pointInPolygon(t.c[0], t.c[1], pts)).map((t) => t.id);
      if (cover.length !== P.area) continue;
      const key = type + ':' + cover.sort((a, b) => a - b).join(',');
      if (seen.has(key)) continue;
      seen.add(key);
      const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
      placements.push({ type, pts, cover, c: [cx, cy] });
    }
  }
  return { target, tris, placements };
}

// 화면에 퍼즐을 띄운다. 끝나면 { done, counts } 로 풀린다
export function runPuzzle(container, targetKey, { sfx, reward }) {
  return new Promise((resolve) => {
    const pz = buildPuzzle(targetKey);
    const size = 420;
    const xs = pz.target.pts.map((p) => p[0]), ys = pz.target.pts.map((p) => p[1]);
    const w = Math.max(...xs) - Math.min(...xs), h = Math.max(...ys) - Math.min(...ys);
    const k = (size - 40) / Math.max(w, h);
    const ox = (size - w * k) / 2 - Math.min(...xs) * k, oy = (size - h * k) / 2 - Math.min(...ys) * k;
    const map = ([x, y]) => [x * k + ox, y * k + oy];
    const unmap = (x, y) => [(x - ox) / k, (y - oy) / k];
    const placed = [];
    const owner = new Map();
    let sel = 'trap';

    container.innerHTML = `<div class="card puzzle-card">
      <h2>승강기 문을 열어요!</h2>
      <p>모양 조각으로 <b>${pz.target.name}</b> 모양을 겹치지 않게 빈틈없이 채우면 곡괭이 +${reward}</p>
      <div class="pz-wrap">
        <svg id="pzSvg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" role="img" aria-label="채울 모양"></svg>
        <div class="pz-side">
          <div class="pz-pieces">${TYPES.map((t) => `<button class="pz-piece ${t === sel ? 'on' : ''}" data-t="${t}" aria-label="${PIECES[t].name}">${pieceSvg(t, 64)}<span>${PIECES[t].name}</span></button>`).join('')}</div>
          <p class="pz-help">조각을 고르고, 넣을 곳을 눌러요.<br>놓은 조각을 다시 누르면 빠져요.</p>
          <p class="pz-count" id="pzCount"></p>
          <div class="row"><button class="big-btn alt" id="pzReset">처음부터</button><button class="ghost-btn" id="pzSkip">건너뛰기</button></div>
        </div>
      </div></div>`;
    const svg = container.querySelector('#pzSvg');
    const poly = (pts, fill, stroke, w, extra = '') => `<polygon points="${pts.map(map).map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${w}" stroke-linejoin="round" ${extra}/>`;
    const draw = () => {
      let s = poly(pz.target.pts, '#fff7e6', '#3a2412', 5);
      for (const t of pz.tris) s += poly(t.pts, 'none', 'rgba(122,90,62,.25)', 1);
      for (const p of placed) s += poly(p.pts, PIECES[p.type].color, PIECES[p.type].edge, 3);
      svg.innerHTML = s;
      const counts = TYPES.map((t) => [t, placed.filter((p) => p.type === t).length]).filter(([, n]) => n);
      container.querySelector('#pzCount').textContent = counts.length ? counts.map(([t, n]) => `${PIECES[t].name} ${n}개`).join(', ') : '';
    };
    draw();

    container.querySelectorAll('.pz-piece').forEach((b) => b.addEventListener('click', () => {
      sel = b.dataset.t; sfx.tap();
      container.querySelectorAll('.pz-piece').forEach((x) => x.classList.toggle('on', x === b));
    }));
    container.querySelector('#pzReset').addEventListener('click', () => { placed.length = 0; owner.clear(); sfx.tap(); draw(); });
    container.querySelector('#pzSkip').addEventListener('click', () => { sfx.tap(); resolve({ done: false }); });

    svg.addEventListener('pointerdown', (e) => {
      const r = svg.getBoundingClientRect();
      const [x, y] = unmap(((e.clientX - r.left) / r.width) * size, ((e.clientY - r.top) / r.height) * size);
      const tri = pz.tris.find((t) => pointInPolygon(x, y, t.pts));
      if (!tri) return;
      if (owner.has(tri.id)) {
        const p = owner.get(tri.id);
        placed.splice(placed.indexOf(p), 1);
        p.cover.forEach((id) => owner.delete(id));
        sfx.tap(); draw(); return;
      }
      const cands = pz.placements.filter((p) => p.type === sel && p.cover.includes(tri.id) && p.cover.every((id) => !owner.has(id)));
      if (!cands.length) {
        sfx.wrong();
        svg.animate([{ transform: 'translateX(-6px)' }, { transform: 'translateX(6px)' }, { transform: 'translateX(0)' }], { duration: 220 });
        return;
      }
      cands.sort((a, b) => Math.hypot(a.c[0] - x, a.c[1] - y) - Math.hypot(b.c[0] - x, b.c[1] - y));
      const p = { ...cands[0] };
      placed.push(p);
      p.cover.forEach((id) => owner.set(id, p));
      sfx.hitDirt(); draw();
      if (owner.size === pz.tris.length) {
        sfx.appraiseOk();
        const counts = {};
        placed.forEach((q) => { counts[q.type] = (counts[q.type] || 0) + 1; });
        const how = Object.entries(counts).map(([t, n]) => `${PIECES[t].name} ${n}개`).join(', ');
        setTimeout(() => {
          container.querySelector('.pz-side').innerHTML = `<div class="stamp">다 채웠어요!</div><p class="pz-help">${how}로 채웠어요.<br>곡괭이 +${reward}</p><button class="big-btn" id="pzDone">승강기 타기</button>`;
          container.querySelector('#pzDone').addEventListener('click', () => { sfx.tap(); resolve({ done: true, counts }); });
        }, 400);
      }
    });
  });
}

// 모든 퍼즐이 풀 수 있는지 (자동 검사용)
export function solvable(targetKey) {
  const pz = buildPuzzle(targetKey);
  const n = pz.tris.length;
  const byTri = new Map();
  pz.placements.filter((p) => p.type === 'tri').forEach((p) => byTri.set(p.cover[0], p));
  return byTri.size === n;
}
