// 보석 도감 (명세서 12.3): 보석 14종 + 가짜 원석 3종 + 슈퍼 보석
import { makeShape } from '../core/shapes.js';
import { makeRng } from '../core/rng.js';
import { diagonals } from '../core/geometry.js';
import { gemThumb, makeCanvas } from '../render/textures.js';
import { loadCodex } from '../core/save.js';
import { gemExplain } from './panel.js';
import { img } from '../assets/loader.js';

const SUPER_MAT = { id: 'super', name: '무지개', light: '#ffffff', base: '#ff7ad9', dark: '#5b2bd6', rainbow: true };
const LOCKED_MAT = { id: 'locked', name: '', light: '#6b5a4a', base: '#4a3a2c', dark: '#2a1e14' };

// 도감 칸 목록
export function codexEntries(gemData) {
  const list = gemData.kinds.map((k) => ({ ...k, type: 'gem' }));
  for (const f of gemData.fakes) list.push({ ...f, sides: 0, regular: false, type: 'fake', floor: 1 });
  list.push({ id: 'super', name: gemData.super.name, sides: 6, regular: true, value: gemData.super.value, type: 'super', floor: 4 });
  return list;
}

export function codexCount(gemData) {
  const c = loadCodex();
  const all = codexEntries(gemData);
  return { got: all.filter((e) => c.kinds[e.id] && c.kinds[e.id].n > 0).length, total: all.length };
}

// 도감용 보석 모양 (종류마다 늘 같은 모양)
function sampleGem(entry, mat) {
  let seed = 7;
  for (const ch of entry.id) seed = (seed * 31 + ch.charCodeAt(0)) >>> 0;
  const poly = makeShape(entry.id === 'super' ? 'super' : entry.id, makeRng(seed), { sides: 6 });
  return { kind: entry.id, name: entry.name, sides: entry.sides, regular: entry.regular, fake: entry.type === 'fake', super: entry.type === 'super', poly, material: mat };
}

export function showCodex(overlay, { gemData, lesson = 8, nameOf = (g) => g.name, onBack, sfx }) {
  const store = loadCodex();
  const entries = codexEntries(gemData);
  const matById = Object.fromEntries(gemData.materials.map((m) => [m.id, m]));
  const got = entries.filter((e) => store.kinds[e.id] && store.kinds[e.id].n > 0).length;
  const label = (e) => (e.type === 'gem' ? nameOf({ kind: e.id, name: e.name, sides: e.sides }) : e.name);

  overlay.className = 'overlay codex-ov';
  overlay.innerHTML = `<div class="codex">
    <div class="codex-head"><h2>보석 도감</h2><div class="codex-prog"><b>${got}</b> / ${entries.length}<span class="codex-bar"><i style="width:${(got / entries.length) * 100}%"></i></span></div>
      <button class="big-btn alt" id="codexBack">돌아가기</button></div>
    <div class="codex-body">
      <div class="codex-grid" id="codexGrid"></div>
      <div class="codex-detail" id="codexDetail"></div>
    </div>
  </div>`;
  const book = img('ui.codex');
  if (book) {
    // 펼친 책 그림: 왼쪽 쪽에 보석 칸, 오른쪽 쪽에 설명
    const el = overlay.querySelector('.codex');
    el.classList.add('book');
    el.style.backgroundImage = `url("${book.src}")`;
  }
  const grid = overlay.querySelector('#codexGrid');
  const cards = [];
  entries.forEach((e, idx) => {
    const rec = store.kinds[e.id];
    const have = rec && rec.n > 0;
    const mat = e.type === 'super' ? SUPER_MAT : have ? matById[rec.mats[rec.mats.length - 1]] || gemData.materials[0] : LOCKED_MAT;
    const b = document.createElement('button');
    b.className = 'codex-card' + (have ? '' : ' locked') + (e.type === 'fake' ? ' fake' : '') + (e.type === 'super' ? ' super' : '');
    const cv = makeCanvas(150, 112);
    gemThumb(cv, sampleGem(e, mat), 0);
    b.appendChild(cv);
    const nm = document.createElement('div');
    nm.className = 'cc-name';
    nm.textContent = have ? label(e) : '???';
    b.appendChild(nm);
    const ct = document.createElement('div');
    ct.className = 'cc-count';
    ct.textContent = have ? `${rec.n}개` : `지하 ${e.floor}층~`;
    b.appendChild(ct);
    b.addEventListener('click', () => { if (sfx) sfx.tap(); select(idx); });
    grid.appendChild(b);
    cards.push(b);
  });

  function select(idx) {
    cards.forEach((c, k) => c.classList.toggle('on', k === idx));
    const e = entries[idx];
    const rec = store.kinds[e.id];
    const have = rec && rec.n > 0;
    const det = overlay.querySelector('#codexDetail');
    const mat = e.type === 'super' ? SUPER_MAT : have ? matById[rec.mats[rec.mats.length - 1]] || gemData.materials[0] : LOCKED_MAT;
    const gem = sampleGem(e, mat);
    if (!have) {
      det.innerHTML = `<canvas id="cdBig" width="320" height="230"></canvas><h3>아직 못 찾았어요</h3>
        <p>${e.type === 'super' ? '최심층의 최후 스테이지에 묻혀 있어요.' : e.type === 'fake' ? '다각형이 아닌 원석이에요. 감정에서 가려내면 도감에 올라가요.' : `지하 ${e.floor}층부터 나와요.`}</p>`;
      gemThumb(det.querySelector('#cdBig'), gem, 0);
      return;
    }
    const name = label(e);
    let facts = '';
    if (e.type === 'fake') facts = '<li>다각형이 아니에요</li><li>굽은 선이 있어요</li>';
    else if (e.type === 'super') facts = '<li>정오각형·정육각형·정팔각형 중 하나로 나와요</li><li>몇 각형·정다각형·대각선 수를 모두 맞혀야 얻어요</li>';
    else {
      facts = `<li>변 <b>${e.sides}</b>개 · 꼭짓점 <b>${e.sides}</b>개 · 각 <b>${e.sides}</b>개</li><li>대각선 <b>${diagonals(e.sides)}</b>개</li>`;
      if (lesson >= 3) facts += `<li>정다각형: <b>${e.regular ? '예' : '아니요'}</b></li>`;
      facts += `<li>가치 <b>${e.value}</b></li>`;
    }
    const why = e.type === 'super' ? '변의 길이와 각의 크기가 모두 같은 정다각형이에요.' : gemExplain({ ...gem, sides: e.sides || 0 }, lesson, name);
    const mats = e.type === 'super' ? '' : `<div class="cd-mats">${rec.mats.map((m) => `<span title="${matById[m] ? matById[m].name : ''}" style="background:${matById[m] ? matById[m].base : '#999'}"></span>`).join('')}<small>${rec.mats.map((m) => (matById[m] ? matById[m].name : '')).join(', ')}</small></div>`;
    det.innerHTML = `<canvas id="cdBig" width="320" height="230"></canvas><h3>${name}</h3>${mats}<ul class="cd-facts">${facts}</ul><p class="cd-why">${why}</p><p class="cd-n">지금까지 ${rec.n}개 캤어요</p>`;
    gemThumb(det.querySelector('#cdBig'), gem, 0, e.type === 'gem' && e.sides >= 4 ? { diagonals: diagonals(e.sides) } : {});
  }

  const first = entries.findIndex((e) => store.kinds[e.id] && store.kinds[e.id].n > 0);
  select(first >= 0 ? first : 0);
  overlay.querySelector('#codexBack').addEventListener('click', () => { if (sfx) sfx.tap(); onBack(); });
}
