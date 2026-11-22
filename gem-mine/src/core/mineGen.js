// 타일판 생성: 보석을 실제 다각형으로 배치하고, 칸마다 겹치는 넓이로 보석 칸을 정한다.
import { CONFIG } from '../config.js';
import { transform, bounds, convexOverlap, inflate, cellCoverage } from './geometry.js';
import { makeShape } from './shapes.js';

const JUNK = ['skull', 'bone', 'boot', 'can', 'fish', 'bottle', 'gear', 'sock'];

export function generateBoard({ rng, gemData, floorDef, stageDef }) {
  const cols = stageDef.cols || CONFIG.board.cols;
  const rows = stageDef.rows || CONFIG.board.rows;
  for (let attempt = 0; attempt < 60; attempt++) {
    const board = tryBoard({ rng, gemData, floorDef, stageDef, cols, rows });
    if (board) return board;
  }
  throw new Error('타일판을 만들지 못했습니다');
}

function tryBoard({ rng, gemData, floorDef, stageDef, cols, rows }) {
  const kindsById = Object.fromEntries(gemData.kinds.map((k) => [k.id, k]));
  const wanted = [];
  if (stageDef.final) {
    wanted.push({ kind: 'super', super: true, sides: rng.pick(gemData.super.sidesChoices) });
  }
  const nGems = stageDef.final ? rng.int(2, 3) : rng.int(CONFIG.gemsPerBoard[0], CONFIG.gemsPerBoard[1]);
  const pool = rng.shuffle(floorDef.kinds);
  for (let i = 0; i < nGems && i < pool.length; i++) wanted.push({ kind: pool[i] });
  if (rng.chance(CONFIG.fakeChance)) wanted.push({ kind: rng.pick(gemData.fakes).id, fake: true });

  const placed = [];
  const materials = rng.shuffle(gemData.materials);
  for (const w of wanted) {
    const g = placeOne({ rng, w, cols, rows, placed, kindsById, gemData });
    if (!g) return null;
    g.material = w.super ? { id: 'super', name: '무지개', light: '#ffffff', base: '#ff7ad9', dark: '#5b2bd6', rainbow: true }
      : materials[placed.length % materials.length];
    placed.push(g);
  }

  // 타일
  const ratio = stageDef.tiles || floorDef.tiles;
  const tiles = [];
  const superGem = placed.find((g) => g.super);
  const nearSuper = new Set();
  if (superGem) {
    for (const i of superGem.cells) {
      const c = i % cols, r = Math.floor(i / cols);
      for (let dc = -1; dc <= 1; dc++) for (let dr = -1; dr <= 1; dr++) {
        const cc = c + dc, rr = r + dr;
        if (cc >= 0 && rr >= 0 && cc < cols && rr < rows) nearSuper.add(rr * cols + cc);
      }
    }
  }
  for (let i = 0; i < cols * rows; i++) {
    let type = pickTile(rng, ratio);
    if (nearSuper.has(i) && rng.chance(0.6)) type = 'rock';
    const hp = CONFIG.tileHp[type];
    tiles.push({ type, hp, maxHp: hp, broken: false, variant: rng.int(0, 3), hitAt: -1 });
  }

  // 잡동사니: 보석과 전혀 겹치지 않는 칸에만
  const free = [];
  for (let i = 0; i < cols * rows; i++) {
    if (!placed.some((g) => g.coverMap[i] > 0)) free.push(i);
  }
  const junk = rng.shuffle(free).slice(0, Math.min(free.length, rng.int(4, 6))).map((i) => ({
    i, type: rng.pick(JUNK), x: rng.range(0.3, 0.7), y: rng.range(0.35, 0.65), rot: rng.range(-0.6, 0.6), s: rng.range(0.42, 0.55),
  }));

  // 보물상자 흙: 판마다 0~1개, 흙 칸 중 보석·잡동사니가 없는 곳
  if (!stageDef.noChest && rng.chance(CONFIG.chestChance)) {
    const used = new Set(junk.map((j) => j.i));
    const spots = free.filter((i) => !used.has(i) && tiles[i].type === 'dirt');
    if (spots.length) tiles[rng.pick(spots)].chest = true;
  }

  placed.forEach((g, idx) => { g.id = idx; });
  return { cols, rows, tiles, gems: placed, junk };
}

function pickTile(rng, [d, s]) {
  const x = rng.next() * 100;
  if (x < d) return 'dirt';
  if (x < d + s) return 'stone';
  return 'rock';
}

function placeOne({ rng, w, cols, rows, placed, kindsById, gemData }) {
  const info = w.super
    ? { name: gemData.super.name, sides: w.sides, regular: true, value: gemData.super.value }
    : w.fake
      ? { ...gemData.fakes.find((f) => f.id === w.kind), sides: 0, regular: false }
      : kindsById[w.kind];
  const maxCells = w.super ? 40 : (info.maxCells || CONFIG.cellsMax);
  const margin = 0.12;
  for (let t = 0; t < 250; t++) {
    const local = makeShape(w.kind, rng, { sides: w.sides });
    const ang = rng.range(0, Math.PI * 2);
    const rot = transform(local, ang, 0, 0);
    const b = bounds(rot);
    if (b.w > cols - 2 * margin || b.h > rows - 2 * margin) continue;
    const cx = rng.range(margin - b.x0, cols - margin - b.x1);
    const cy = rng.range(margin - b.y0, rows - margin - b.y1);
    const poly = transform(local, ang, cx, cy);
    const grown = inflate(poly, CONFIG.gemGap);
    if (placed.some((p) => convexOverlap(grown, p.poly))) continue;
    const coverMap = {};
    const cells = [];
    const bb = bounds(poly);
    for (let r = Math.max(0, Math.floor(bb.y0)); r <= Math.min(rows - 1, Math.floor(bb.y1)); r++) {
      for (let c = Math.max(0, Math.floor(bb.x0)); c <= Math.min(cols - 1, Math.floor(bb.x1)); c++) {
        const a = cellCoverage(poly, c, r);
        if (a > 0.0005) {
          coverMap[r * cols + c] = a;
          if (a >= CONFIG.coverThreshold) cells.push(r * cols + c);
        }
      }
    }
    if (cells.length < CONFIG.cellsMin || cells.length > maxCells) continue;
    return {
      kind: w.kind,
      name: info.name,
      sides: info.sides,
      regular: !!info.regular,
      value: info.value,
      fake: !!w.fake,
      super: !!w.super,
      poly,
      coverMap,
      cells,
      found: false,
      collected: false,
      retryAt: 0,
    };
  }
  return null;
}
