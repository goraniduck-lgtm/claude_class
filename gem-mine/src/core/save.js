// 태블릿 브라우저에 저장하는 것들. 저장이 안 되는 환경이면 이번 판 동안만 기억한다.
const KEYS = { progress: 'gemMine.progress.v1', meta: 'gemMine.meta.v1', codex: 'gemMine.codex.v1' };
const memory = {};

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch { /* 저장소를 못 쓰면 메모리 값 */ }
  return memory[key] !== undefined ? JSON.parse(JSON.stringify(memory[key])) : fallback;
}
function write(key, value) {
  memory[key] = JSON.parse(JSON.stringify(value));
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* 메모리에만 */ }
}
function remove(key) {
  delete memory[key];
  try { localStorage.removeItem(key); } catch { /* 무시 */ }
}

// ---------- 본편 진행 ----------
// { stageIndex, maxIndex, pickaxes, items, drill, total, stats, playTime, lesson }
export function loadProgress() { return read(KEYS.progress, null); }
export function saveProgress(p) {
  const prev = loadProgress();
  const maxIndex = Math.max(p.stageIndex, p.maxIndex || 0, prev ? prev.maxIndex || 0 : 0);
  write(KEYS.progress, { ...p, maxIndex });
}
export function clearProgress() { remove(KEYS.progress); }

// ---------- 열린 모드·별명·무한 도전 기록 (새로 하기를 해도 남는다) ----------
export function loadMeta() {
  return { unlocked: { endless: false, duel: false }, endingSeen: 0, nickname: '', endlessBest: null, ...read(KEYS.meta, {}) };
}
export function saveMeta(patch) {
  const m = { ...loadMeta(), ...patch };
  write(KEYS.meta, m);
  return m;
}

// ---------- 보석 도감 ----------
// { kinds: { [kind]: { n, mats: [재질 id], at } } }
export function loadCodex() { return read(KEYS.codex, { kinds: {} }); }
// 보석을 얻으면 기록. 처음 얻은 종류면 true
export function codexAdd(kind, materialId) {
  const c = loadCodex();
  const k = c.kinds[kind] || (c.kinds[kind] = { n: 0, mats: [], at: Date.now() });
  const isNew = k.n === 0;
  k.n++;
  if (materialId && !k.mats.includes(materialId)) k.mats.push(materialId);
  write(KEYS.codex, c);
  return isNew;
}
