// 다각형 보석 광산 — 화면과 흐름을 묶는 곳
import { CONFIG } from './config.js';
import { Game } from './core/game.js';
import { makeRng, randomSeed } from './core/rng.js';
import { makeQuizDeck, TYPE_INFO, NAMES } from './quiz/bank.js';
import { loadAssets } from './assets/loader.js';
import { BoardView } from './render/board.js';
import { MinerView } from './render/miner.js';
import { RailView } from './render/rail.js';
import { drawBackground, gemThumb, makeCanvas } from './render/textures.js';
import { Panel, gemExplain, diagHint } from './ui/panel.js';
import { runPuzzle } from './ui/puzzle.js';
import { diagonals } from './core/geometry.js';
import * as fx from './ui/fx.js';
import { sfx, initAudio, setSound, soundOn } from './audio/sfx.js';
import { centroid } from './core/geometry.js';
import { ITEMS, itemCells } from './core/items.js';
import { drawItemIcon } from './render/icons.js';
import { loadProgress, saveProgress, clearProgress, loadMeta, saveMeta, codexAdd } from './core/save.js';
import { showMap, elevatorRide } from './ui/map.js';
import { showCodex, codexCount } from './ui/codex.js';
import { askNickname, runCredits } from './ui/ending.js';
import { createNet } from './net/net.js';
import { Battle, judge } from './battle/battle.js';
import { lobbyHome, createOptions, joinCode, renderWaiting, modeText } from './ui/lobby.js';

const $ = (id) => document.getElementById(id);
const stageEl = $('stage');
const overlay = $('overlay');
const COMBO_NAMES = ['', '신나는 광부', '불꽃 곡괭이', '황금 곡괭이'];
const LESSONS = [[8, '단원 전체 (1~9차시)'], [2, '2차시까지: 다각형'], [3, '3차시까지: + 정다각형'], [4, '4차시까지: + 대각선'], [6, '6차시까지: + 모양 조각']];
const PUZZLES = { 2: 'tri3', 3: 'para42', 4: 'hex2' };
const PUZZLE_REWARD = 3;
const REC_KEY = 'gemMine.record.v1';

let game, deck, panel, boardView, minerView, railView;
let state = 'title';      // title | map | intro | play | clear | fail | ending
let paused = false;
let appraising = false;
let timeUp = false;
let swapping = false;
let lastSec = null;
let swapArmed = 0;
let startPick = 0;
let reading = 0;
let lesson = CONFIG.defaultLesson;
let targeting = null;     // 아이템 쓰기 중: { slot, kind, cell }
let itemSig = '';

async function boot(saved = {}) {
  const [gemData, stageData] = await Promise.all([
    fetch('data/gems.json').then((r) => r.json()),
    fetch('data/stages.json').then((r) => r.json()),
  ]);
  await loadAssets('assets/assets.json');
  if (document.fonts && document.fonts.ready) { try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]); } catch { /* 글꼴 없이 진행 */ } }

  game = new Game({ gemData, stageData, seed: randomSeed(), lesson });
  deck = makeQuizDeck(makeRng(randomSeed()), { lesson });
  boardView = new BoardView($('board'));
  minerView = new MinerView($('miner'));
  railView = new RailView($('rail'));
  panel = new Panel({ deck, sfx, onCorrect, onWrong, onSkip, onRead });

  drawBackground($('bg'));
  fit();
  addEventListener('resize', fit);
  document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'play') pause(true); });

  bindInput();
  game.startRun(0);
  boardView.setBoard(game.board);
  updateHud();
  if (location.hash === '#debug') window.__gm = { game, panel, boardView, onTap, openItem, confirmItem, showEnding, showMapScreen, showTitle, nextAfterClear, updateHud, battleAttack, endBattleNow: () => { battleEnd = net.now(); }, get battle() { return battle; }, get state() { return state; }, get targeting() { return targeting; }, get dust() { return dust; } };
  window.claude?.hot?.snapshot?.(() => ({ stageIndex: game.stageIndex }));
  showTitle(saved.stageIndex || 0);
  requestAnimationFrame(loop);
}

// ---------- 화면 맞추기 ----------
function fit() {
  const s = Math.min(innerWidth / CONFIG.stageW, innerHeight / CONFIG.stageH);
  stageEl.style.transform = `translate(${-CONFIG.stageW / 2 * s}px, ${-CONFIG.stageH / 2 * s}px) scale(${s})`;
  fx.setStage(stageEl, s);
  const pr = Math.max(1, Math.min(2.5, (devicePixelRatio || 1) * s));
  boardView.setPixelRatio(pr);
  minerView.resize(pr);
  railView.resize(pr);
}

// ---------- 입력 ----------
function bindInput() {
  const cv = $('board');
  cv.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    initAudio();
    const i = boardView.cellAt(e.clientX, e.clientY);
    if (i < 0) return;
    boardView.pressed = i;
    onTap(i);
  });
  const up = () => { boardView.pressed = -1; };
  cv.addEventListener('pointerup', up);
  cv.addEventListener('pointerleave', up);
  cv.addEventListener('pointercancel', up);

  $('soundBtn').addEventListener('click', () => {
    initAudio();
    setSound(!soundOn());
    $('soundBtn').classList.toggle('off', !soundOn());
  });
  $('pauseBtn').addEventListener('click', () => {
    if (game.mode === 'battle') { if (state === 'play') battleQuitAsk(); return; }
    if (state === 'play') pause(true);
  });
  $('swapBtn').addEventListener('click', onSwap);
}

function canPlay() { return state === 'play' && !paused && !appraising && !timeUp && !swapping && !reading; }

// 해설을 읽는 동안 시간이 멈춘다
function onRead(on) {
  reading = Math.max(0, reading + (on ? 1 : -1));
  updateHud();
}

function onTap(i) {
  if (targeting && canPlay()) {
    if (ITEMS[targeting.kind].target) { targeting.cell = i; sfx.tap(); renderItemBar(); return; }
    cancelTarget();
  }
  if (!canPlay()) {
    if (appraising) setHint('먼저 왼쪽 감정소에서 감정을 마쳐요.');
    else if (reading) setHint('해설을 다 읽고 버튼을 누르면 다시 캘 수 있어요.');
    return;
  }
  const r = game.tapCell(i);
  if (r.action === 'noPick') {
    sfx.wrong();
    fx.floatText('곡괭이가 없어요!', fx.toStage(boardView.cellCenterClient(i).x, boardView.cellCenterClient(i).y), 'small bad');
    fx.shake($('pickBox'), 5);
    setHint('곡괭이가 없어요. 왼쪽 문제를 풀어 곡괭이를 모아요.');
    return;
  }
  if (r.action === 'appraise') { startAppraisal(r.gem, r.mode); return; }
  if (r.action === 'dig') handleDig(r);
  updateHud();
}

// ---------- 아이템 ----------
function renderItems(newSlot = -1) {
  const sig = game.items.join(',') + '|' + (targeting ? targeting.slot : -1);
  if (sig === itemSig && newSlot < 0) return;
  itemSig = sig;
  const box = $('itemSlots');
  box.innerHTML = '';
  for (let k = 0; k < CONFIG.itemSlots; k++) {
    const kind = game.items[k];
    const b = document.createElement('button');
    b.className = 'slot' + (kind ? ' full' : '') + (targeting && targeting.slot === k ? ' on' : '') + (k === newSlot ? ' new' : '');
    if (kind) {
      const cv = document.createElement('canvas');
      cv.width = cv.height = 96;
      drawItemIcon(cv, kind);
      b.appendChild(cv);
      b.setAttribute('aria-label', ITEMS[kind].name);
      b.title = ITEMS[kind].name;
      b.addEventListener('click', () => { initAudio(); openItem(k); });
    } else { b.disabled = true; b.setAttribute('aria-label', '빈 칸'); }
    box.appendChild(b);
  }
}

function defaultCell() {
  const { cols, rows } = game.board;
  return Math.floor(rows / 2) * cols + Math.floor(cols / 2);
}

function openItem(slot) {
  if (targeting && targeting.slot === slot) { cancelTarget(); return; }
  if (!canPlay()) { if (appraising) setHint('감정을 마친 뒤에 아이템을 쓸 수 있어요.'); return; }
  const kind = game.items[slot];
  if (!kind) return;
  sfx.tap();
  targeting = { slot, kind, cell: targeting && targeting.cell >= 0 ? targeting.cell : defaultCell() };
  renderItemBar();
  renderItems();
  setHint(ITEMS[kind].target ? '판에서 칸을 눌러 위치를 옮기고, \'사용\'을 눌러요.' : '\'사용\'을 누르면 바로 효과가 나요.');
}

function renderItemBar() {
  if (!targeting) return;
  const { kind, cell } = targeting;
  const def = ITEMS[kind];
  let count = '';
  if (kind === 'row' || kind === 'col' || kind === 'bomb') {
    const n = itemCells(kind, cell, game.board.cols, game.board.rows).filter((c) => !game.board.tiles[c].broken).length;
    count = n ? `부서질 칸 <b>${n}</b>개` : '<span style="color:#ff9a8a">이미 다 부서진 곳이에요. 다른 칸을 눌러요.</span>';
  } else if (kind === 'radar') count = '가운데 칸에 보석 칸 수가 남아요';
  else if (kind === 'hourglass') count = `남은 시간 <b>+${CONFIG.hourglassSec}초</b>`;
  else if (kind === 'drill') count = `다음 <b>${CONFIG.drillHits}</b>번 타격`;
  const bar = $('itemBar');
  bar.className = 'item-bar';
  bar.innerHTML = `<canvas width="144" height="144" id="ibIcon"></canvas><div class="ib-text"><div class="ib-name">${def.name}</div><div class="ib-desc">${def.desc}</div><div class="ib-count">${count}</div></div>
    <div class="ib-btns"><button class="big-btn" id="ibUse">사용</button><button class="big-btn alt" id="ibCancel">취소</button></div>`;
  drawItemIcon($('ibIcon'), kind);
  $('ibUse').addEventListener('click', () => confirmItem());
  $('ibCancel').addEventListener('click', () => { sfx.tap(); cancelTarget(); });
}

function cancelTarget() {
  targeting = null;
  const bar = $('itemBar');
  if (bar) { bar.className = 'item-bar hidden'; bar.innerHTML = ''; }
  if (game) renderItems();
}

async function confirmItem() {
  if (!targeting || !canPlay()) return;
  const { slot, kind, cell } = targeting;
  if (['row', 'col', 'bomb'].includes(kind) && !itemCells(kind, cell, game.board.cols, game.board.rows).some((c) => !game.board.tiles[c].broken)) { sfx.wrong(); return; }
  const res = game.useItem(slot, ITEMS[kind].target ? cell : -1);
  cancelTarget();
  if (!res) return;
  minerView.setMood('cheer');
  if (kind === 'row' || kind === 'col' || kind === 'bomb') {
    sfx.boom(kind === 'bomb');
    fx.shake($('boardShake'), kind === 'bomb' ? 7 : 5, 260);
    const center = cell;
    const cc = center % game.board.cols, cr = Math.floor(center / game.board.cols);
    const order = res.broken.slice().sort((a, b) => {
      const da = Math.abs((a.i % game.board.cols) - cc) + Math.abs(Math.floor(a.i / game.board.cols) - cr);
      const db = Math.abs((b.i % game.board.cols) - cc) + Math.abs(Math.floor(b.i / game.board.cols) - cr);
      return da - db;
    });
    appraising = true; // 연출 동안 다른 입력을 막는다
    for (const b of order) {
      boardView.onHit(b.i, b.type, true);
      if (kind !== 'bomb') { sfx.break(b.type); await wait(55); }
    }
    appraising = false;
    for (const ch of res.chests) { const p = boardView.cellCenterClient(ch.i); itemGainFx(ch, fx.toStage(p.x, p.y)); }
    for (const g of res.revealed) { void g; sfx.reveal(); }
    if (res.revealed.length) setHint('보석이 보여요! 모양을 알 것 같으면 돋보기가 있는 칸을 눌러 미리 감정해요.');
    else setHint(`${res.broken.length}칸을 한꺼번에 부쉈어요.`);
    updateHud();
    if (res.completed.length) finalFlow(res.completed[0]);
  } else if (kind === 'radar') {
    sfx.radar();
    for (const c of res.cells) boardView.sparkleAt(c);
    const p = boardView.cellCenterClient(cell);
    fx.floatText(`보석 칸 ${res.count}개`, fx.toStage(p.x, p.y - 30), res.count ? 'good' : '');
    setHint(res.count ? `파란 숫자 둘레 3×3 안에 보석 칸이 ${res.count}개 있어요.` : '이 둘레 3×3에는 보석 칸이 없어요. 다른 곳을 파요.');
  } else if (kind === 'hourglass') {
    sfx.combo(2);
    fx.floatText(`+${res.added}초`, fx.centerOf($('timeText')), 'good');
    setHint('모래시계로 시간이 늘었어요. 광차가 뒤로 밀렸어요!');
  } else if (kind === 'dust' || kind === 'steal') {
    sfx.boom(false);
    battle && battle.sendItem(kind);
    const from = fx.centerOf($('itemBag')), to = fx.centerOf($('oppPanel'));
    const cv = document.createElement('canvas'); cv.width = cv.height = 96; drawItemIcon(cv, kind);
    fx.fly(`<img src="${cv.toDataURL()}" style="width:100%;height:100%" alt="">`, from, to, { dur: 650, size: 56 });
    setHint(kind === 'dust' ? '상대 판에 흙먼지를 뿌렸어요!' : '상대 곡괭이를 슬쩍하러 갔어요!');
  } else if (kind === 'shield') {
    sfx.combo(2);
    fx.floatText('방패 준비!', fx.centerOf($('itemBag')), 'good');
    setHint('다음에 오는 낙석이나 방해 아이템 1번을 막아요.');
  } else if (kind === 'drill') {
    sfx.combo(3);
    fx.floatText(`드릴 ${CONFIG.drillHits}번!`, fx.centerOf($('pickBox')), 'good');
    setHint(`다음 ${game.drill}번 타격은 어떤 타일이든 한 번에 부숴요.`);
  }
  updateHud();
}

// 아이템을 얻었을 때: 가방으로 날아간다. 가득 차면 못 얻는다
// from: 무대 좌표
function itemGainFx(got, from) {
  if (!got) return;
  if (!got.added) {
    fx.floatText('가방이 가득!', fx.centerOf($('itemBag')), 'small bad');
    setHint(`${ITEMS[got.kind].name}을(를) 찾았지만 아이템 칸이 가득 찼어요. 아이템을 먼저 써요.`);
    return;
  }
  sfx.itemGet();
  const cv = document.createElement('canvas'); cv.width = cv.height = 96; drawItemIcon(cv, got.kind);
  const slotIdx = game.items.length - 1;
  const slotEl = $('itemSlots').children[slotIdx] || $('itemBag');
  fx.fly(`<img src="${cv.toDataURL()}" style="width:100%;height:100%" alt="">`, from, fx.centerOf(slotEl), { dur: 750, size: 64 }).then(() => { itemSig = ''; renderItems(slotIdx); });
  fx.floatText(ITEMS[got.kind].name, { x: from.x, y: from.y - 34 }, 'small good');
}

function handleDig(r) {
  minerView.swing();
  boardView.onHit(r.i, r.type, r.broke);
  if (r.drilled) sfx.drill();
  if (r.chest) {
    sfx.combo(3);
    const p = boardView.cellCenterClient(r.i);
    fx.floatText('보물상자!', fx.toStage(p.x, p.y - 20), 'good');
    itemGainFx(r.chest, fx.toStage(p.x, p.y));
  }
  if (r.broke) { sfx.break(r.type); fx.shake($('boardShake'), 2.5, 140); }
  else if (r.type === 'dirt') sfx.hitDirt(); else sfx.hitStone();
  if (r.broke) {
    const junk = game.board.junk.find((j) => j.i === r.i);
    if (junk && r.revealed.length === 0 && Math.random() < 0.7) {
      const p = boardView.cellCenterClient(r.i);
      fx.floatText(JUNK_LINES[junk.type] || '꽝!', fx.toStage(p.x, p.y), 'small');
    }
  }
  for (const g of r.revealed) {
    boardView.sparkleAt(r.i);
    sfx.reveal();
    setHint(g.super ? '무지갯빛이 보여요! 슈퍼 보석이에요. 모양을 알면 그 칸을 눌러 감정해요.'
      : '보석이 보여요! 모양을 알 것 같으면 돋보기가 있는 칸을 눌러 미리 감정해요.');
  }
  for (const g of r.completed) { finalFlow(g); break; }
}

const JUNK_LINES = {
  skull: '해골이다! 보석은 아니야', bone: '뼈다귀…', boot: '낡은 장화다', can: '빈 깡통!',
  fish: '생선 뼈…', bottle: '빈 병이다', gear: '녹슨 톱니', sock: '냄새나는 양말!',
};

// ---------- 문제 ----------
function onCorrect(q, firstTry, el) {
  if (firstTry) recordQuiz(q.type, true);
  const r = game.answer(true, { level: q.level, firstTry });
  sfx.correct();
  const from = fx.centerOf(el);
  const to = fx.centerOf($('pickBox'));
  for (let k = 0; k < r.gain; k++) {
    fx.fly(fx.PICK_SVG, from, to, { dur: 650, delay: k * 90 }).then(() => {
      sfx.pick();
      const b = $('pickBox'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
    });
  }
  fx.floatText(`+${r.gain}`, { x: from.x, y: from.y - 30 }, 'good');
  if (r.levelUp) {
    sfx.combo(game.comboLevel);
    fx.banner(COMBO_NAMES[game.comboLevel] + '!', 1300);
    if (game.mode === 'battle') battleAttack(CONFIG.battle.comboRocks[game.comboLevel], `${game.combo}콤보!`);
  }
  if (game.mode === 'battle' && r.gain === 0 && game.picksLeftToEarn === 0) setHint('곡괭이 40개를 다 받았어요. 남은 곡괭이로 잘 골라 파요!');
  if (r.item) setTimeout(() => { fx.banner(`${game.combo}콤보 보상!`, 1000); itemGainFx(r.item, fx.centerOf($('comboTag'))); }, 500);
  minerView.setMood('cheer');
  setTimeout(updateHud, 700);
  updateHud();
}

function onWrong(q, attempts) {
  sfx.wrong();
  if (attempts === 1) {
    recordQuiz(q.type, false);
    const r = game.answer(false, { level: q.level, firstTry: false });
    if (r.comboBroke) { sfx.comboBreak(); minerView.setMood('oops'); } else minerView.setMood('scratch');
  }
  updateHud();
}

function onSkip() {
  const r = game.skip();
  if (r.comboBroke) { sfx.comboBreak(); minerView.setMood('oops'); }
  updateHud();
}

// ---------- 감정 ----------
const gemLabel = (gem) => (gem.fake ? gem.name : `${game.nameOf(gem)} ${gem.material.name}`);

async function startAppraisal(gem, mode) {
  if (mode === 'final') { finalFlow(gem); return; }
  if (!game.canEarly(gem)) {
    const need = gem.retryAt - game.brokenCover(gem);
    setHint(`이 보석은 칸을 ${need}개 더 파 본 뒤에 다시 감정할 수 있어요.`);
    sfx.wrong();
    return;
  }
  appraising = true;
  const sides = await panel.appraiseEarly(gem);
  if (sides === null) { appraising = false; panel.resumeQuiz(); afterAppraisal(); return; }
  const r = game.early(gem, sides);
  updateHud();
  if (r.ok) {
    sfx.appraiseOk();
    await panel.result({ stamp: '명감정사!', good: true, text: `${gem.fake ? '맞아요, 다각형이 아니에요.' : `맞아요, 변이 ${gem.sides}개인 ${NAMES[gem.sides]}!`} 남은 칸 ${r.remaining.length}개를 저절로 파요. 보너스 +${r.bonus}`, ms: 1300 });
    if (game.mode === 'battle') battleAttack(Math.min(CONFIG.battle.earlyRocksMax, r.remaining.length), '명감정!');
    for (const i of r.remaining) {
      const d = game.dig(i, true);
      boardView.onHit(i, d.type, true);
      sfx.break(d.type);
      minerView.swing();
      await wait(110);
    }
    if (r.bonus) {
      game.addValue(r.bonus);
      const c = centroid(gem.poly);
      const p = boardView.pointClient(c[0], c[1]);
      fx.floatText(`보너스 +${r.bonus}`, fx.toStage(p.x, p.y - 40), 'good');
    }
    updateHud();
    appraising = false;
    await finalFlow(gem);
    return;
  }
  sfx.appraiseBad();
  fx.floatText(`곡괭이 -${r.lost}`, fx.centerOf($('pickBox')), 'bad');
  await panel.result({ stamp: '감정 실패!', good: false, text: `곡괭이 ${r.lost}개를 잃었어요. 칸을 하나 더 파서 변과 꼭짓점을 더 살펴본 뒤 다시 감정해요.`, button: '계속 캐기' });
  appraising = false;
  panel.resumeQuiz();
  afterAppraisal();
}

async function finalFlow(gem) {
  if (appraising) return;
  appraising = true;
  const L = game.lesson;
  const name = game.nameOf(gem);
  const needAsk = !gem.earlyOk || game.asksRegular(gem);
  let ans = { sides: gem.earlyOk ? gem.sides : 0, regular: false };
  if (needAsk) ans = await panel.appraiseFinal(gem, { askSides: !gem.earlyOk, askRegular: game.asksRegular(gem), name });
  const res = game.final(gem, ans.sides, ans.regular);
  updateHud();
  if (res.retry) {
    sfx.appraiseBad();
    await panel.result({ gem, stamp: '다시 감정해요', good: false, text: `슈퍼 보석은 정확히 맞혀야 가져갈 수 있어요. 곡괭이 ${res.lost}개를 썼어요. 보석 칸을 다시 누르면 또 감정할 수 있어요.`, button: '알겠어요' });
    appraising = false; panel.resumeQuiz(); afterAppraisal(); return;
  }
  let dim = false;
  const why = gemExplain(gem, L, name);
  if (gem.fake) {
    if (res.ok) { sfx.appraiseOk(); await panel.result({ gem, stamp: '가짜 원석 발견!', good: true, text: `${why} 감정 성공 +${res.value}`, ms: 1800 }); }
    else { sfx.appraiseBad(); await panel.result({ gem, stamp: '앗, 가짜예요', good: false, text: why, button: '알겠어요' }); }
  } else if (res.ok) {
    sfx.gem();
    await panel.result({ gem, stamp: `${gemLabel(gem)} 획득!`, good: true, text: `+${res.value} · ${why}`, ms: 2000 });
  } else {
    dim = true;
    sfx.dimGem();
    await panel.result({ gem, stamp: '흐린 보석…', good: false, text: `정답은 <b>${name}</b>이에요. ${why} 값의 절반 +${res.value}만 받아요.`, button: '알겠어요' });
  }
  const bonus = await bonusFlow(gem, name);
  collectGem(gem, res.value, dim, res.ok);
  if (bonus) game.addValue(bonus);
  updateHud();
  appraising = false;
  panel.resumeQuiz();
  afterAppraisal(true);
}

// 보석을 얻은 뒤 보너스 문제: 정다각형은 대각선 수, 마름모·직사각형은 정다각형이 아닌 이유, 다른 사각형은 대각선 성질
async function bonusFlow(gem, name) {
  const kind = game.bonusKind(gem);
  if (!kind) return 0;
  for (;;) {
    let answer;
    if (kind === 'diag') answer = await panel.askDiag(gem);
    else if (kind === 'reason') answer = await panel.askReason(gem, name);
    else answer = await panel.askQuad(gem, gem._quad.prop);
    const d = game.bonus(gem, kind, answer);
    updateHud();
    if (d.ok) {
      sfx.correct();
      await panel.result({ gem, stamp: gem.super ? '감정 완료!' : `정답! +${d.bonus}`, good: true, ms: 900, prevOpts: kind === 'quad' ? { diagonals: 'dashed' } : kind === 'diag' ? { diagonals: diagonals(gem.sides) } : {} });
      return d.bonus || 0;
    }
    sfx.wrong();
    if (kind === 'diag') {
      await panel.result({ gem, stamp: `정답은 ${diagonals(gem.sides)}개`, good: false, text: `${diagHint(gem.sides)}${d.retry ? ` 곡괭이 ${d.lost}개를 썼어요. 다시 감정해요.` : ''}`, button: d.retry ? '다시 감정' : '알겠어요', prevOpts: { animateDiag: true } });
      if (d.retry) continue;
    } else if (kind === 'reason') {
      await panel.result({ gem, stamp: '아쉬워요', good: false, text: gemExplain(gem, 8, name), button: '알겠어요' });
    } else {
      const fact = gem._quad.prop === 'eq'
        ? (gem._quad.answer ? '두 대각선의 길이가 같아요.' : '두 대각선의 길이가 달라요. 길이가 같은 사각형은 직사각형과 정사각형이에요.')
        : (gem._quad.answer ? '두 대각선이 서로 수직으로 만나요.' : '두 대각선이 수직으로 만나지 않아요. 수직으로 만나는 사각형은 마름모와 정사각형이에요.');
      await panel.result({ gem, stamp: '아쉬워요', good: false, text: `점선으로 그린 두 대각선을 살펴봐요. ${fact}`, button: '알겠어요', prevOpts: { diagonals: 'dashed' } });
    }
    return 0;
  }
}

function collectGem(gem, value, dim, ok = true) {
  game.collect(gem, value, dim);
  // 도감: 가짜 원석은 가려냈을 때만 올라간다
  if (!gem.fake || ok) {
    const isNew = codexAdd(gem.super ? 'super' : gem.kind, gem.material && gem.material.id);
    if (isNew) setTimeout(() => { sfx.reveal(); fx.floatText('새 보석! 도감에 올렸어요', fx.centerOf($('trayGems')), 'good'); }, 900);
  }
  const c = centroid(gem.poly);
  const p = boardView.pointClient(c[0], c[1]);
  const from = fx.toStage(p.x, p.y);
  boardView.burst(c[0], c[1], gem.material.light || '#fff', 26);
  const thumb = makeCanvas(160, 130);
  gemThumb(thumb, gem, 0);
  const url = thumb.toDataURL();
  fx.fly(`<img src="${url}" style="width:100%;height:100%" alt="">`, from, cartPoint(), { dur: 800, size: 70 }).then(() => {
    railView.gems.push(gem.fake ? '#b9b0a3' : gem.material.base);
  });
  fx.floatText(`+${value}`, { x: from.x, y: from.y - 20 });
  addTray(gem, value, dim);
}

function cartPoint() {
  const r = $('rail').getBoundingClientRect();
  const prog = Math.min(1, 1 - game.timeLeft / game.stage.time);
  return fx.toStage(r.left + ((46 + 604 * prog) / 760) * r.width, r.top + (36 / 84) * r.height);
}

function addTray(gem, value, dim) {
  const box = $('trayGems');
  const d = document.createElement('div');
  d.className = 'tray-gem' + (dim ? ' dim' : '');
  const cv = makeCanvas(128, 112);
  gemThumb(cv, gem, 0);
  d.appendChild(cv);
  const label = document.createElement('div');
  label.textContent = `${gem.fake ? gem.name : game.nameOf(gem)} +${value}`;
  d.appendChild(label);
  box.appendChild(d);
  while (box.children.length > 6) box.firstChild.remove();
}

function afterAppraisal(collected = false) {
  if (state !== 'play') return;
  if (game.mode === 'battle') {
    battleSync();
    if (timeUp) { finishBattle(); return; }
  } else {
    if (game.stageCleared()) { stageClear(); return; }
    if (timeUp) { stageFail(); return; }
  }
  if (collected && game.boardCleared()) {
    if (game.mode === 'battle') battleAttack(CONFIG.battle.clearRocks, '판 정리!');
    swapping = true;
    fx.banner('새 타일판!', 1400);
    setTimeout(() => {
      game.newBoard();
      boardView.setBoard(game.board);
      sfx.board();
      swapping = false;
      setHint('새 타일판이에요. 보석을 찾아 캐요!');
      updateHud();
    }, 1300);
  }
}

function onSwap() {
  if (!canPlay() || !game.canSwap()) return;
  const now = performance.now();
  if (now - swapArmed > 2500) {
    swapArmed = now;
    $('swapBtn').innerHTML = `정말 바꿀까요?<small>한 번 더 누르면 곡괭이 ${CONFIG.swapCost}개</small>`;
    setTimeout(() => { if (performance.now() - swapArmed >= 2400) updateHud(); }, 2600);
    return;
  }
  swapArmed = 0;
  game.swap();
  boardView.setBoard(game.board);
  sfx.board();
  fx.floatText(`곡괭이 -${CONFIG.swapCost}`, fx.centerOf($('pickBox')), 'bad');
  setHint('새 타일판으로 바꿨어요.');
  updateHud();
}

// ---------- 흐름 ----------
function showOverlay(html, cls = '') {
  overlay.className = 'overlay ' + cls;
  overlay.innerHTML = html;
}
function hideOverlay() { overlay.className = 'overlay hidden'; overlay.innerHTML = ''; }

// 이번 게임 기록을 새로 시작한다 (학습 기록 '이번 게임')
function resetRun() {
  lesson = Number(($('lessonSel') && $('lessonSel').value) || lesson);
  game.lesson = lesson;
  game.rec = { quiz: {}, appr: {} };
  savedRun = { quiz: {}, appr: {} };
  deck = makeQuizDeck(makeRng(randomSeed()), { lesson });
  panel.deck = deck;
  panel.q = null;
  $('trayGems').innerHTML = '';
  railView.gems = [];
  overlay.style.background = '';
}

const stageName = (st) => (st.final ? '최후 스테이지' : st.id);
const fmtTime = (sec) => `${Math.floor(sec / 60)}분 ${Math.floor(sec % 60)}초`;

function saveStory() {
  if (game.mode !== 'story') return;
  saveProgress({ ...game.progress(), lesson });
}

// 선생님용 주소(…/#teacher)에서만 시험용 줄(바로 시작·모드 열기)을 보여 준다
const TEACHER = (() => { try { return location.hash === '#teacher'; } catch (e) { return false; } })();

function showTitle(preset = 0) {
  state = 'title';
  cancelTarget();
  const meta = loadMeta();
  const prog = loadProgress();
  if (prog && prog.lesson) lesson = prog.lesson;
  const st = prog ? game.stageData.stages[Math.min(prog.stageIndex, game.stageData.stages.length - 1)] : null;
  const floorOf = (s) => game.stageData.floors.find((f) => f.floor === s.floor).name;
  const cc = codexCount(game.gemData);
  const opts = game.stageData.stages.map((s, i) => `<option value="${i}" ${i === preset ? 'selected' : ''}>${s.final ? '4-3 최후 스테이지' : s.id}</option>`).join('');
  const lopts = LESSONS.map(([v, t]) => `<option value="${v}" ${v === lesson ? 'selected' : ''}>${t}</option>`).join('');
  const unlocked = meta.unlocked.endless;
  showOverlay(`<div class="card title-card">
    <h1>다각형 보석 광산</h1>
    <p class="sub">문제를 풀어 곡괭이를 모으고, 단서로 보석의 모양을 알아맞혀요!</p>
    <div class="title-main">
      ${prog ? `<button class="big-btn" id="contBtn">이어 하기<small>${floorOf(st)} · ${stageName(st)}</small></button>` : ''}
      <button class="big-btn ${prog ? 'alt' : ''}" id="newBtn">${prog ? '새로 하기' : '광산으로 출발'}</button>
    </div>
    ${unlocked ? `<div class="title-modes"><button class="big-btn glow" id="endlessBtn">무한 도전${meta.endlessBest ? `<small>최고 ${meta.endlessBest.stages}스테이지</small>` : ''}</button><button class="big-btn glow alt" id="duelBtn">1대1 대결<small>친구와 겨루기</small></button></div>` : ''}
    <div class="title-sub"><button class="ghost-btn" id="codexBtn">보석 도감 ${cc.got}/${cc.total}</button><button class="ghost-btn" id="recBtn">학습 기록</button></div>
    <div class="dev"><label for="lessonSel">문제 범위</label><select id="lessonSel">${lopts}</select></div>
    ${TEACHER ? `<div class="dev"><label for="startSel">시험용: 바로 시작</label><select id="startSel">${opts}</select><button class="ghost-btn" id="devGo">시작</button>${unlocked ? '' : '<button class="ghost-btn" id="devUnlock">모드 열기</button>'}</div>` : ''}
  </div>`, 'title');
  overlay.style.background = 'rgba(12,7,3,.78)';
  $('lessonSel').addEventListener('change', () => { lesson = Number($('lessonSel').value); game.lesson = lesson; });
  $('recBtn').addEventListener('click', () => { sfx.tap(); showRecord(() => showTitle(preset), 'all'); });
  $('codexBtn').addEventListener('click', () => { sfx.tap(); openCodex(() => showTitle(preset)); });
  if (prog) $('contBtn').addEventListener('click', () => {
    initAudio(); sfx.tap();
    resetRun();
    game.startRun(Math.min(prog.stageIndex, game.stageData.stages.length - 1), prog);
    showMapScreen();
  });
  $('newBtn').addEventListener('click', () => {
    initAudio(); sfx.tap();
    const go = () => { clearProgress(); resetRun(); game.startRun(0); saveStory(); showMapScreen(); };
    if (!prog) { go(); return; }
    showOverlay(`<div class="card"><h2>처음부터 할까요?</h2><p>지금까지의 진행(${floorOf(st)} · ${stageName(st)})과 곡괭이·아이템이 지워져요.</p><p class="note">보석 도감, 학습 기록, 열린 모드는 그대로 남아요.</p>
      <div class="row"><button class="big-btn" id="yesNew">처음부터</button><button class="big-btn alt" id="noNew">취소</button></div></div>`);
    $('yesNew').addEventListener('click', () => { sfx.tap(); go(); });
    $('noNew').addEventListener('click', () => { sfx.tap(); showTitle(preset); });
  });
  if (unlocked) {
    $('endlessBtn').addEventListener('click', () => { initAudio(); sfx.tap(); resetRun(); game.startEndless(); showIntro(); });
    $('duelBtn').addEventListener('click', () => { initAudio(); sfx.tap(); openBattleLobby(); });
  }
  if ($('devUnlock')) $('devUnlock').addEventListener('click', () => { sfx.tap(); saveMeta({ unlocked: { endless: true, duel: true } }); showTitle(preset); });
  if ($('devGo')) $('devGo').addEventListener('click', () => {
    initAudio(); sfx.tap();
    resetRun();
    game.startRun(Number($('startSel').value));
    showIntro();
  });
}

function openCodex(back) {
  showCodex(overlay, { gemData: game.gemData, lesson, nameOf: (g) => game.nameOf(g), onBack: back, sfx });
}

function showMapScreen() {
  state = 'map';
  cancelTarget();
  const prog = loadProgress();
  showMap(overlay, {
    stageData: game.stageData,
    progress: { stageIndex: game.stageIndex, maxIndex: prog ? prog.maxIndex : game.stageIndex },
    info: `곡괭이 <b>${game.pickaxes}</b>개 · 아이템 <b>${game.items.length}</b>개 · 총점 <b>${game.total}</b>`,
    onPick: (i) => { game.stageIndex = i; game.startStage(); showIntro(); },
    onBack: () => showTitle(game.stageIndex),
    sfx,
  });
}

function showIntro() {
  state = 'intro';
  timeUp = false;
  appraising = false;
  swapping = false;
  lastSec = null;
  cancelTarget();
  boardView.setBoard(game.board);
  $('trayGems').innerHTML = '';
  railView.gems = [];
  saveStory();
  const st = game.stage;
  const endless = game.mode === 'endless';
  const goal = st.final ? '<div><b>슈퍼 보석</b>찾아서 감정하기</div>' : `<div><b>${st.target}</b>목표 가치</div>`;
  const msg = st.final ? '최심층 깊은 곳에 슈퍼 보석이 묻혀 있어요. 단단한 바위를 뚫고 캐내요!'
    : endless ? `무한 도전 ${game.depth + 1}번째 스테이지예요. 한 번이라도 실패하면 끝나요!`
      : '광차가 출구에 닿기 전에 목표 가치를 채워요.';
  showOverlay(`<div class="card">
    <h2>${game.floorDef.name} · ${endless ? `무한 ${game.depth + 1}` : stageName(st)}</h2>
    <p>${msg}</p>
    <div class="intro-goal">${goal}<div><b>${Math.round(st.time / 60)}분</b>제한 시간</div><div><b>${game.pickaxes}</b>가진 곡괭이</div></div>
    <div class="row"><button class="big-btn" id="goBtn">출발!</button>${endless ? '' : '<button class="big-btn alt" id="mapBtn">광산 지도</button>'}</div>
  </div>`);
  if (!endless) $('mapBtn').addEventListener('click', () => { sfx.tap(); showMapScreen(); });
  $('goBtn').addEventListener('click', () => {
    sfx.tap();
    hideOverlay();
    state = 'play';
    startPick = game.pickaxes;
    setHint(st.final ? '무지갯빛 슈퍼 보석을 찾아요. 단단한 바위는 세 번 쳐야 부서져요.' : '문제를 풀어 곡괭이를 모으고, 타일을 눌러 부숴요.');
    if (!panel.q) panel.nextQuiz(); else panel.resumeQuiz();
    updateHud();
  });
  updateHud();
}

function stageClear() {
  if (state !== 'play' || game.mode === 'battle') return;
  state = 'clear';
  cancelTarget();
  sfx.clear();
  fx.banner(game.mode === 'endless' ? `${game.floorDef.name} 돌파!` : '스테이지 클리어!', 1500);
  const valueNow = game.stageValue;
  const timeLeft = Math.floor(game.timeLeft);
  const adv = game.advance();
  saveRecord();
  if (!adv.ending && !adv.endless) saveProgress({ ...game.progress(), stageIndex: game.stageIndex, lesson, pickaxes: game.pickaxes, items: [...game.items], drill: game.drill, total: game.total });
  const endless = !!adv.endless;
  const stageClearCard = () => {
    const next = endless ? `더 깊은 <b>지하 ${game.stage.floor}층</b>으로 내려가요. 목표 가치는 ${game.stage.target}!`
      : adv.floorChange ? `승강기를 타고 <b>${game.floorDef.name}</b>으로 내려가요. 더 단단한 바위와 변이 많은 보석이 기다려요!`
        : `다음은 ${stageName(game.stage)}예요.`;
    showOverlay(`<div class="card">
      <h2>${endless ? '돌파!' : '스테이지 클리어!'}</h2>
      <div class="stats">
        <div class="stat"><b>${valueNow}</b>모은 가치</div>
        <div class="stat"><b>+${adv.timeBonus}</b>남은 ${timeLeft}초 보너스</div>
        <div class="stat"><b>+${adv.picks}</b>곡괭이</div>
      </div>
      <p>${next}</p>
      <div class="row"><button class="big-btn" id="nextBtn">${adv.floorChange ? '승강기 타기' : '다음 스테이지'}</button>${endless ? '' : '<button class="big-btn alt" id="mapBtn">광산 지도</button>'}<button class="big-btn alt" id="recBtn">학습 기록</button></div>
    </div>`);
    $('recBtn').addEventListener('click', () => { sfx.tap(); saveRecord(); showRecord(() => stageClearCard(), 'run'); });
    if (!endless) $('mapBtn').addEventListener('click', () => { sfx.tap(); game.startStage(); showMapScreen(); });
    $('nextBtn').addEventListener('click', () => { sfx.tap(); nextAfterClear(adv); });
  };
  setTimeout(() => { if (adv.ending) showEnding(); else stageClearCard(); }, 1200);
}

// 층이 바뀌면 (모양 조각을 배웠을 때) 승강기 퍼즐 → 승강기 타고 내려가기
async function nextAfterClear(adv) {
  if (adv.floorChange && !adv.endless && lesson >= 6 && PUZZLES[game.stage.floor]) {
    showOverlay('');
    const r = await runPuzzle(overlay, PUZZLES[game.stage.floor], { sfx, reward: PUZZLE_REWARD });
    if (r.done) { game.pickaxes += PUZZLE_REWARD; game.recAppr('puzzleDone'); }
  }
  if (adv.floorChange) await elevatorRide(overlay, { toName: game.floorDef.name, sfx });
  game.startStage();
  showIntro();
}

function stageFail() {
  if (state !== 'play' || game.mode === 'battle') return;
  state = 'fail';
  cancelTarget();
  sfx.fail();
  saveRecord();
  if (game.mode === 'endless') { endlessOver(); return; }
  const card = () => {
    showOverlay(`<div class="card">
      <h2>광차가 출구에 도착했어요</h2>
      <p>${game.stage.final ? '슈퍼 보석을 캐지 못했어요.' : `목표 가치 ${game.stage.target} 중 <b>${game.stageValue}</b>를 모았어요.`}</p>
      <p>다시 도전하면 이 스테이지를 시작할 때의 곡괭이(${game.snapshot.pickaxes}개)와 아이템으로 처음부터 해요.</p>
      <div class="row"><button class="big-btn" id="retryBtn">다시 도전</button><button class="big-btn alt" id="mapBtn">광산 지도</button><button class="big-btn alt" id="recBtn">학습 기록</button></div>
    </div>`);
    $('retryBtn').addEventListener('click', () => { sfx.tap(); game.retryStage(); showIntro(); });
    $('mapBtn').addEventListener('click', () => { sfx.tap(); game.retryStage(); showMapScreen(); });
    $('recBtn').addEventListener('click', () => { sfx.tap(); showRecord(card, 'run'); });
  };
  card();
}

// 무한 도전은 한 번 실패하면 끝
function endlessOver() {
  const meta = loadMeta();
  const rec = { stages: game.depth, total: game.total, at: Date.now() };
  const best = meta.endlessBest;
  const isBest = !best || rec.stages > best.stages || (rec.stages === best.stages && rec.total > best.total);
  if (isBest) saveMeta({ endlessBest: rec });
  const card = () => {
    showOverlay(`<div class="card">
      <h2>무한 도전 끝!</h2>
      ${isBest ? '<div class="stamp-new">새 기록!</div>' : ''}
      <div class="stats">
        <div class="stat"><b>${rec.stages}</b>깬 스테이지</div>
        <div class="stat"><b>${rec.total}</b>모은 가치</div>
        <div class="stat"><b>${game.floorDef.name}</b>도착한 곳</div>
      </div>
      <p>${best && !isBest ? `최고 기록은 ${best.stages}스테이지 · ${best.total}점이에요.` : '이 태블릿의 최고 기록이에요!'}</p>
      <p class="note">광산 게시판(순위판)은 다음 업데이트에서 열려요.</p>
      <div class="row"><button class="big-btn" id="againBtn">다시 도전</button><button class="big-btn alt" id="homeBtn">처음 화면</button><button class="big-btn alt" id="recBtn">학습 기록</button></div>
    </div>`);
    $('againBtn').addEventListener('click', () => { sfx.tap(); resetRun(); game.startEndless(); showIntro(); });
    $('homeBtn').addEventListener('click', () => { sfx.tap(); game.mode = 'story'; showTitle(); });
    $('recBtn').addEventListener('click', () => { sfx.tap(); showRecord(card, 'run'); });
  };
  card();
}

async function showEnding() {
  state = 'ending';
  saveRecord();
  const s = game.stats;
  let meta = loadMeta();
  let nick = meta.nickname;
  if (!nick) {
    nick = await askNickname(overlay, { current: '', sfx });
    meta = saveMeta({ nickname: nick });
  }
  const cc = codexCount(game.gemData);
  const lines = [
    ['다각형 보석 광산'],
    ['만든 사람', CONFIG.creditMaker],
    ['광부', nick || '이름 없는 광부'],
    ['이번 모험'],
    ['총점', `${game.total}점`],
    ['걸린 시간', fmtTime(game.playTime)],
    ['캔 보석', `${s.gems}개`],
    ['미리 감정 성공', `${s.early}번`],
    ['최고 콤보', `${s.bestCombo}`],
    ['푼 문제', `${s.solved}개`],
    ['보석 도감', `${cc.got} / ${cc.total}`],
    ['고마워요!'],
    ['광부의 모험은 계속돼요…'],
  ];
  await runCredits(overlay, { lines, seen: meta.endingSeen, sfx });
  const firstTime = !meta.unlocked.endless;
  saveMeta({ endingSeen: (meta.endingSeen || 0) + 1, unlocked: { endless: true, duel: true } });
  saveProgress({ ...game.progress(), lesson, stageIndex: game.stageData.stages.length - 1, maxIndex: game.stageData.stages.length });
  const card = () => {
    showOverlay(`<div class="card unlock-card">
      <h2>${firstTime ? '새로운 길이 열렸어요!' : '다시 한 번 정복!'}</h2>
      <p>엔딩을 봤어요. 이제 끝없이 내려가는 무한 도전을 할 수 있어요.</p>
      <div class="title-modes"><button class="big-btn glow" id="endlessBtn">무한 도전</button><button class="big-btn glow alt" id="duelBtn">1대1 대결<small>친구와 겨루기</small></button></div>
      <div class="row"><button class="big-btn alt" id="homeBtn">처음 화면</button><button class="big-btn alt" id="recBtn">학습 기록</button></div>
    </div>`);
    $('endlessBtn').addEventListener('click', () => { sfx.tap(); resetRun(); game.startEndless(); showIntro(); });
    $('duelBtn').addEventListener('click', () => { initAudio(); sfx.tap(); openBattleLobby(); });
    $('homeBtn').addEventListener('click', () => { sfx.tap(); showTitle(0); });
    $('recBtn').addEventListener('click', () => { sfx.tap(); showRecord(card, 'run'); });
  };
  sfx.clear();
  card();
}

function pause(on) {
  paused = on;
  if (on) {
    cancelTarget();
    showOverlay(`<div class="card"><h2>잠깐 쉬어요</h2><p>문제와 타일판을 가렸어요.</p><div class="row"><button class="big-btn" id="resumeBtn">계속하기</button><button class="big-btn alt" id="codexBtn">보석 도감</button><button class="big-btn alt" id="recBtn">학습 기록</button></div></div>`);
    overlay.style.background = 'rgba(12,7,3,.96)';
    $('recBtn').addEventListener('click', () => { sfx.tap(); showRecord(() => pause(true), 'run'); });
    $('codexBtn').addEventListener('click', () => { sfx.tap(); openCodex(() => pause(true)); });
    $('resumeBtn').addEventListener('click', () => { sfx.tap(); overlay.style.background = ''; hideOverlay(); paused = false; });
  }
}

// ---------- HUD ----------
function setHint(t) { $('hint').textContent = t; }

function updateHud() {
  if (!game.board) return;
  const st = game.stage;
  $('stageLabel').textContent = `${game.floorDef.name} · ${st.final ? '최후' : game.mode === 'endless' ? `무한 ${game.depth + 1}` : st.id}`;
  const gauge = $('gauge');
  if (game.mode === 'battle') {
    $('stageLabel').textContent = '1대1 대결';
    const o = battle && battle.oppState;
    const crit = game.battleOpts.crit === 'count';
    const a = crit ? game.stats.gems : game.stageValue, b = o ? (crit ? o.gems || 0 : o.value || 0) : 0;
    $('gaugeFill').style.width = `${a + b ? (a / (a + b)) * 100 : 50}%`;
    $('gaugeText').textContent = `나 ${a} : ${b} 상대`;
    gauge.classList.add('vs');
    battleSync();
  } else if (st.final) {
    const got = game.board.gems.some((g) => g.super && g.collected);
    $('gaugeFill').style.width = got ? '100%' : '0%';
    $('gaugeText').textContent = got ? '슈퍼 보석 획득!' : '슈퍼 보석을 찾아라!';
    gauge.classList.toggle('full', got);
  } else {
    const pct = Math.min(100, (game.stageValue / st.target) * 100);
    $('gaugeFill').style.width = pct + '%';
    $('gaugeText').textContent = `${game.stageValue} / ${st.target}`;
    gauge.classList.toggle('full', pct >= 100);
  }
  if (game.mode !== 'battle') gauge.classList.remove('vs');
  $('pickCount').textContent = game.pickaxes;
  $('pickBox').classList.toggle('empty', game.pickaxes === 0 && state === 'play');
  const lv = game.comboLevel;
  const tag = $('comboTag');
  tag.className = 'combo-tag lv' + lv;
  tag.innerHTML = game.combo >= 2 ? `${game.combo} 콤보${lv ? `<small>${COMBO_NAMES[lv]}</small>` : ''}` : '';
  minerView.level = lv;
  const swap = $('swapBtn');
  if (performance.now() - swapArmed > 2500) swap.innerHTML = `판 바꾸기<small>곡괭이 ${CONFIG.swapCost}개</small>`;
  swap.disabled = !game.canSwap() || state !== 'play';
  swap.style.visibility = st.final ? 'hidden' : 'visible';
  $('leftInfo').textContent = `이 판에 남은 보석 ${game.realLeft()}개`;
  $('drillInfo').textContent = [game.drill > 0 ? `드릴 ${game.drill}번` : '', game.shield > 0 ? '방패 준비' : ''].filter(Boolean).join(' · ');
  renderItems();
}

// ---------- 매 프레임 ----------
let lastT = performance.now();
function loop(now) {
  const dt = Math.min(0.1, (now - lastT) / 1000);
  lastT = now;
  const t = now / 1000;
  if (state === 'play' && !paused) game.playTime += dt;
  if (game && game.mode === 'battle') battleTick();
  else if (state === 'play' && !paused && !timeUp && !reading) {
    game.timeLeft = Math.max(0, game.timeLeft - dt);
    const sec = Math.ceil(game.timeLeft);
    if (sec !== lastSec) {
      lastSec = sec;
      if (sec <= 10 && sec > 0) { fx.countdown(sec); sfx.tick(); }
      else if (sec <= 60 && sec % 2 === 0) sfx.tick();
    }
    if (game.timeLeft <= 0) {
      timeUp = true;
      if (!appraising) stageFail();
      else setHint('시간이 다 됐어요! 감정을 마치면 결과가 나와요.');
    }
  }
  if (game && game.board) {
    const mags = [];
    if (state === 'play') {
      for (const g of game.board.gems) {
        if (g.collected || !g.found) continue;
        let best = -1, bestA = CONFIG.revealThreshold;
        for (const [k, a] of Object.entries(g.coverMap)) {
          if (game.board.tiles[k].broken && a > bestA) { best = Number(k); bestA = a; }
        }
        if (best >= 0) mags.push({ cell: best, locked: !game.isFullyDug(g) && !game.canEarly(g) });
      }
    }
    const preview = targeting && ITEMS[targeting.kind].target && state === 'play'
      ? { kind: targeting.kind, center: targeting.cell, cells: itemCells(targeting.kind, targeting.cell, game.board.cols, game.board.rows) } : null;
    boardView.draw(t, { magnifiers: mags, preview, dust: dust && state === 'play' ? dust : null });
    minerView.draw(t);
    const st = game.stage;
    const prog = 1 - game.timeLeft / st.time;
    railView.draw(t, state === 'title' ? 0 : prog, game.timeLeft <= 60 && state === 'play');
    const m = Math.floor(game.timeLeft / 60), s = Math.floor(game.timeLeft % 60);
    const pausedNow = reading && state === 'play' && game.mode !== 'battle';
    $('timeText').textContent = pausedNow ? `${m}:${String(s).padStart(2, '0')} 멈춤` : `${m}:${String(s).padStart(2, '0')}`;
    $('timeText').classList.toggle('warn', game.timeLeft <= 60 && !pausedNow);
    $('timeText').classList.toggle('paused', !!pausedNow);
  }
  requestAnimationFrame(loop);
}

// ---------- 1대1 대결 (명세서 14절) ----------
let net = null;
let battle = null;
let battleRound = -1;
let battleEnd = 0;
let battleStartAt = 0;
let myDone = false;
let finishing = false;
let dust = null;            // { cells, until }
let scoreAt = 0, lastScoreKey = '';
const ROCK_SVG = '<svg viewBox="0 0 40 40" width="100%" height="100%"><path d="M6 28 L10 14 L20 7 L31 10 L36 22 L30 33 L14 35 Z" fill="#8a8f96" stroke="#2a2a2e" stroke-width="3" stroke-linejoin="round"/><path d="M12 16 L20 10 L27 12" stroke="#c9ced4" stroke-width="3" fill="none" stroke-linecap="round"/></svg>';

async function openBattleLobby() {
  state = 'lobby';
  cancelTarget();
  if (!net || (net.fallback && !battle)) {
    showOverlay('<div class="card"><h2>연결하는 중…</h2></div>');
    net = await createNet();
  }
  const meta = loadMeta();
  const home = await lobbyHome(overlay, { nickname: meta.nickname, netKind: net.kind, netFallback: !!net.fallback, sfx });
  if (home.action === 'back') { showTitle(); return; }
  saveMeta({ nickname: home.nickname });
  let code, role;
  try {
    if (home.action === 'create') {
      const opts = await createOptions(overlay, { sfx });
      if (!opts) { openBattleLobby(); return; }
      code = await net.createRoom(opts, { name: home.nickname });
      role = 'p1';
    } else {
      let err = '';
      for (;;) {
        const c = await joinCode(overlay, { sfx, error: err });
        if (!c) { openBattleLobby(); return; }
        try { await net.joinRoom(c, { name: home.nickname }); code = c; role = 'p2'; break; }
        catch (e) { err = e.message === 'FULL' ? '이미 두 사람이 들어간 방이에요.' : '그 코드의 방이 없어요. 코드를 다시 확인해요.'; }
      }
    }
  } catch (e) {
    showOverlay(`<div class="card"><h2>연결이 안 돼요</h2><p>잠시 뒤에 다시 해 봐요.</p><div class="row"><button class="big-btn" id="okBtn">확인</button></div></div>`);
    $('okBtn').addEventListener('click', () => openBattleLobby());
    return;
  }
  enterRoom(code, role);
}

function enterRoom(code, role) {
  state = 'room';
  battleRound = -1;
  battle = new Battle({
    net, code, role,
    hooks: {
      onRoom: onBattleRoom,
      onIncoming: () => {},
      onFall: onRocksFall,
      onDust: onDustHit,
      onStealHit,
      onStolen: () => {
        game.pickaxes++;
        sfx.itemGet();
        fx.floatText('곡괭이 슬쩍 성공! +1', fx.centerOf($('pickBox')), 'good');
        updateHud();
      },
      onBlocked: (what) => {
        fx.floatText(what === 'empty' ? '상대 곡괭이가 없었어요' : '상대가 방패로 막았어요!', fx.centerOf($('oppPanel')), 'small');
      },
      useShield: (what) => {
        if (!(game.shield > 0)) return false;
        game.shield--;
        sfx.combo(1);
        fx.banner(what === 'rock' ? '방패로 낙석을 막았어요!' : '방패로 방해를 막았어요!', 1100);
        updateHud();
        return true;
      },
    },
  });
}

function onBattleRoom(room) {
  if (!battle) return;
  if (!room) {
    if (state !== 'title' && state !== 'roomClosed') {
      state = 'roomClosed';
      cancelTarget();
      saveRecord();
      showOverlay('<div class="card"><h2>방이 닫혔어요</h2><p>방장이 대결에서 나갔어요.</p><div class="row"><button class="big-btn" id="okBtn">확인</button></div></div>');
      $('okBtn').addEventListener('click', () => leaveBattle());
    }
    return;
  }
  if (room.status === 'countdown' && room.round !== battleRound) { startBattleRound(room); return; }
  if (state === 'room') {
    renderWaiting(overlay, { code: battle.code, role: battle.role, room, netKind: net.kind });
    const st = $('wrStart');
    if (st) st.addEventListener('click', () => { sfx.tap(); hostStart(); });
    $('wrLeave').addEventListener('click', () => { sfx.tap(); leaveBattle(); });
  } else if (state === 'battleResult') {
    showBattleResult();
  }
  renderOpp();
}

function hostStart() {
  const room = battle.room;
  net.updateRoom(battle.code, { status: 'countdown', startAt: net.now() + 3500, round: (room.round || 0) + 1, seed: Math.floor(Math.random() * 2 ** 31) });
}

function startBattleRound(room) {
  battleRound = room.round;
  cancelTarget();
  game.lesson = lesson;
  game.rec = { quiz: {}, appr: {} };
  savedRun = { quiz: {}, appr: {} };
  deck = makeQuizDeck(makeRng((room.seed ^ 0x9e3779b9) >>> 0), { lesson }); // 같은 문제 순서
  panel.deck = deck;
  panel.q = null;
  game.startBattle(room.opts, room.seed);
  battle.beginRound();
  dust = null;
  myDone = false;
  finishing = false;
  scoreAt = 0; lastScoreKey = '';
  battleStartAt = room.startAt;
  battleEnd = room.startAt + game.stage.time * 1000;
  timeUp = false; appraising = false; swapping = false; lastSec = null;
  boardView.setBoard(game.board);
  $('trayGems').innerHTML = '';
  railView.gems = [];
  document.body.classList.add('battle');
  $('oppPanel').classList.remove('hidden');
  state = 'countdown';
  showOverlay('<div class="card countdown-card"><h2 id="cdText">준비!</h2><p>' + modeText(room.opts) + '</p></div>');
  battle.sync({ name: battle.meState ? battle.meState.name : '', value: 0, gems: 0, early: 0, picks: game.pickaxes, combo: 0, done: false, final: false, scoreAt: 0, broken: boardCode(), cols: game.board.cols, rows: game.board.rows, round: room.round }, true);
  updateHud();
}

// 판 상태를 짧은 글자로 (상대 미니 판): . 부서짐, 0 흙, 1 돌, 2 바위
function boardCode() {
  return game.board.tiles.map((t) => (t.broken ? '.' : t.type === 'rock' ? '2' : t.type === 'stone' ? '1' : '0')).join('');
}

function battleSync(force = false) {
  if (!battle || game.mode !== 'battle') return;
  const key = `${game.stageValue}|${game.stats.gems}`;
  if (key !== lastScoreKey) { lastScoreKey = key; scoreAt = net.now(); }
  battle.sync({ value: game.stageValue, gems: game.stats.gems, early: game.stats.early, picks: game.pickaxes, combo: game.combo, broken: boardCode(), cols: game.board.cols, rows: game.board.rows, done: myDone, scoreAt, sent: battle.sent }, force);
}

function battleAttack(n, why) {
  if (!battle || game.mode !== 'battle' || !n || state !== 'play') return;
  const r = battle.attack(n);
  if (r.canceled) fx.floatText(`낙석 ${r.canceled}개 상쇄!`, fx.centerOf($('rockWarn')), 'good');
  if (r.sent) {
    sfx.boom(false);
    const from = fx.centerOf($('boardBox'));
    const to = fx.centerOf($('oppPanel'));
    for (let k = 0; k < Math.min(r.sent, 6); k++) fx.fly(ROCK_SVG, from, to, { dur: 700, delay: k * 80, size: 34 });
    fx.floatText(`${why} 낙석 ${r.sent}개 공격!`, { x: from.x, y: from.y - 60 }, 'good');
  }
}

function onRocksFall(n) {
  if (game.mode !== 'battle' || state !== 'play') return;
  const cells = game.dropRocks(n);
  sfx.boom(true);
  fx.shake($('boardShake'), 6, 260);
  fx.banner(`낙석 ${n}개!`, 900);
  const top = fx.centerOf($('boardBox'));
  cells.forEach((i, k) => {
    const p = boardView.cellCenterClient(i);
    const to = fx.toStage(p.x, p.y);
    fx.fly(ROCK_SVG, { x: to.x, y: top.y - 260 }, to, { dur: 420, delay: k * 70, size: 46 }).then(() => { sfx.break('rock'); boardView.sparkleAt(i); });
  });
  setHint(cells.length ? '낙석이 떨어져 빈칸이 돌로 덮였어요. 콤보로 맞받아쳐요!' : '낙석이 떨어졌지만 덮을 칸이 없었어요.');
  if (targeting) renderItemBar();
  updateHud();
}

// 흙먼지: 단서가 가장 많이 드러난 3×3을 6초 동안 가린다
function onDustHit() {
  const { cols, rows, tiles } = game.board;
  let best = null, bestN = -1;
  for (let r = 1; r < rows - 1; r++) for (let c = 1; c < cols - 1; c++) {
    const cells = itemCells('bomb', r * cols + c, cols, rows);
    const n = cells.filter((i) => tiles[i].broken).length;
    if (n > bestN) { bestN = n; best = cells; }
  }
  dust = { cells: best, until: performance.now() + CONFIG.battle.dustMs };
  sfx.boom(false);
  fx.banner('흙먼지 공격! 6초 동안 가려져요', 1100);
}

function onStealHit() {
  if (game.pickaxes <= 0) return false;
  game.pickaxes--;
  sfx.comboBreak();
  fx.floatText('곡괭이 1개를 빼앗겼어요!', fx.centerOf($('pickBox')), 'bad');
  updateHud();
  return true;
}

function renderOpp() {
  if (!battle) return;
  const o = battle.oppState;
  const el = $('oppPanel');
  if (!el) return;
  const crit = game.battleOpts && game.battleOpts.crit === 'count';
  const gone = o && (!o.online || (o.seen && net.now() - o.seen > 15000 && state === 'play'));
  el.querySelector('.opp-name').textContent = o ? o.name || '상대' : '상대';
  el.querySelector('.opp-score').innerHTML = o ? `${crit ? `보석 <b>${o.gems || 0}</b>개` : `<b>${o.value || 0}</b>점`} · 곡괭이 ${o.picks ?? '-'}` : '기다리는 중';
  el.querySelector('.opp-state').textContent = gone ? '연결이 끊겼어요' : o && o.done ? (o.final ? '끝!' : '곡괭이를 다 썼어요') : o && o.combo >= 2 ? `${o.combo}콤보 중!` : '';
  const cv = el.querySelector('canvas');
  const g = cv.getContext('2d');
  g.clearRect(0, 0, cv.width, cv.height);
  if (!o || !o.broken) return;
  const cs = Math.min(cv.width / o.cols, cv.height / o.rows);
  const ox = (cv.width - cs * o.cols) / 2, oy = (cv.height - cs * o.rows) / 2;
  const col = { '.': '#2a1a10', 0: '#c9853e', 1: '#8a7a6a', 2: '#4a4549' };
  for (let i = 0; i < o.broken.length; i++) {
    const c = i % o.cols, r = Math.floor(i / o.cols);
    g.fillStyle = col[o.broken[i]] || '#c9853e';
    g.fillRect(ox + c * cs + 1, oy + r * cs + 1, cs - 2, cs - 2);
  }
}

// 시간이 끝나면 (열린 감정은 마친 뒤) 결과를 모은다
async function finishBattle() {
  if (finishing) return;
  finishing = true;
  myDone = true;
  state = 'battleEnd';
  cancelTarget();
  battleSync(true);
  battle.sync({ final: true, done: true }, true);
  sfx.clear();
  fx.banner('대결 끝!', 1300);
  showOverlay('<div class="card"><h2>대결 끝!</h2><p>상대 결과를 기다리는 중…</p></div>');
  saveRecord();
  const t0 = performance.now();
  while (performance.now() - t0 < 8000) {
    const o = battle && battle.oppState;
    if (!battle) return;
    if (o && (o.final || !o.online)) break;
    await wait(300);
  }
  state = 'battleResult';
  showBattleResult();
}

function showBattleResult() {
  if (!battle) return;
  const me = { ...(battle.meState || {}), value: game.stageValue, gems: game.stats.gems, early: game.stats.early, scoreAt };
  const o = battle.oppState || {};
  const crit = game.battleOpts.crit;
  const { res, why } = judge(me, o, crit);
  const host = battle.role === 'p1';
  const oppGone = !o.online;
  const title = res === 'win' ? '승리!' : res === 'lose' ? '아쉬워요!' : '무승부!';
  const row = (name, a, b, key) => `<tr class="${key === (crit === 'count' ? 'gems' : 'value') ? 'crit' : ''}"><th>${name}</th><td>${a}</td><td>${b}</td></tr>`;
  showOverlay(`<div class="card battle-result ${res}">
    <h2>${title}</h2>
    <p class="note">${modeText(game.battleOpts)}</p>
    <table class="vs-table"><thead><tr><th></th><th>나</th><th>${(o.name || '상대').replace(/[<>&"]/g, '')}</th></tr></thead><tbody>
      ${row('보석 가치 합', me.value || 0, o.value || 0, 'value')}
      ${row('캔 보석', `${me.gems || 0}개`, `${o.gems || 0}개`, 'gems')}
      ${row('미리 감정 성공', `${me.early || 0}번`, `${o.early || 0}번`)}
      ${row('보낸 낙석', `${battle.sent}개`, `${o.sent || 0}개`)}
    </tbody></table>
    ${why ? `<p class="note">${why}</p>` : ''}
    <p>${oppGone ? '상대가 나갔어요.' : host ? '한 판 더 하려면 다시 하기를 눌러요.' : '방장이 다시 하기를 누르면 바로 시작해요.'}</p>
    <div class="row">${host && !oppGone ? '<button class="big-btn" id="againBtn">다시 하기</button>' : ''}<button class="big-btn alt" id="leaveBtn">나가기</button><button class="big-btn alt" id="recBtn">학습 기록</button></div>
  </div>`);
  if ($('againBtn')) $('againBtn').addEventListener('click', () => {
    sfx.tap();
    const o2 = battle.oppState;
    if (!o2 || !o2.online) { fx.banner('상대가 나갔어요', 1200); return; }
    hostStart();
  });
  $('leaveBtn').addEventListener('click', () => { sfx.tap(); leaveBattle(); });
  $('recBtn').addEventListener('click', () => { sfx.tap(); showRecord(() => showBattleResult(), 'run'); });
}

// 대결 중 일시 정지 버튼: 시간은 멈추지 않고, 그만둘지만 묻는다
function battleQuitAsk() {
  const box = document.createElement('div');
  box.className = 'quit-ask';
  box.innerHTML = '<p>대결 중에는 시간이 멈추지 않아요.<br>그만두고 나갈까요?</p><div class="row"><button class="big-btn" id="qaStay">계속하기</button><button class="big-btn alt" id="qaQuit">그만두기</button></div>';
  stageEl.appendChild(box);
  box.querySelector('#qaStay').addEventListener('click', () => { sfx.tap(); box.remove(); });
  box.querySelector('#qaQuit').addEventListener('click', () => { sfx.tap(); box.remove(); leaveBattle(); });
}

async function leaveBattle() {
  const b = battle;
  battle = null;
  document.body.classList.remove('battle');
  $('oppPanel').classList.add('hidden');
  dust = null;
  game.mode = 'story';
  if (b) await b.leave();
  showTitle();
}

// 매 프레임: 대결 시계 (두 기기가 같은 시각을 본다)
function battleTick() {
  if (!battle || game.mode !== 'battle') return;
  const now = net.now();
  if (state === 'countdown') {
    const left = Math.ceil((battleStartAt - now) / 1000);
    const el = $('cdText');
    if (el) el.textContent = left > 0 ? String(left) : '시작!';
    if (now >= battleStartAt) {
      hideOverlay();
      state = 'play';
      startPick = game.pickaxes;
      setHint('문제를 풀어 곡괭이를 모으고, 콤보로 상대에게 낙석을 보내요!');
      panel.nextQuiz();
      sfx.combo(2);
      updateHud();
    }
    return;
  }
  if (state === 'play' || state === 'battleEnd') game.timeLeft = Math.max(0, (battleEnd - now) / 1000);
  if (state === 'play') {
    battle.tick();
    const sec = Math.ceil(game.timeLeft);
    if (sec !== lastSec) {
      lastSec = sec;
      if (sec <= 10 && sec > 0) { fx.countdown(sec); sfx.tick(); }
      renderOpp();
    }
    // 곡괭이 한정 대전: 더 받을 곡괭이도, 남은 곡괭이도, 부수는 아이템도 없으면 끝
    if (game.battleOpts.mode === 'pick' && !myDone && !appraising && game.picksLeftToEarn === 0 && game.pickaxes === 0 && !game.items.some((k) => ['row', 'col', 'bomb'].includes(k)) && !game.board.gems.some((x) => x.pendingFinal && !x.collected)) {
      myDone = true;
      setHint('곡괭이를 다 썼어요. 상대가 끝나기를 기다려요.');
      battleSync(true);
    }
    const o = battle.oppState;
    const bothDone = myDone && o && (o.done || !o.online);
    if (game.timeLeft <= 0 || bothDone) {
      if (!appraising) finishBattle();
      else if (!timeUp) { timeUp = true; setHint('시간이 다 됐어요! 감정을 마치면 결과가 나와요.'); }
      if (appraising && now - battleEnd > CONFIG.battle.finishGraceMs) finishBattle();
    }
  }
  // 예고된 낙석 막대
  const warn = $('rockWarn');
  const total = battle.incomingTotal();
  warn.classList.toggle('hidden', !total || state !== 'play');
  if (total) {
    const first = battle.incoming[0];
    const left = Math.max(0, first.fallAt - performance.now());
    warn.querySelector('.rw-text').textContent = `낙석 ${total}개가 ${Math.ceil(left / 1000)}초 뒤에 떨어져요! 콤보로 상쇄해요`;
    warn.querySelector('.rw-bar i').style.width = `${(left / CONFIG.battle.rockDelay) * 100}%`;
  }
  if (dust && performance.now() > dust.until) dust = null;
}

// ---------- 학습 기록 ----------
function recordQuiz(type, ok) { game.recQuiz(type, ok); }

function loadStore() {
  try { return JSON.parse(localStorage.getItem(REC_KEY)) || { quiz: {}, appr: {} }; } catch { return { quiz: {}, appr: {} }; }
}
let savedRun = { quiz: {}, appr: {} };
function saveRecord() {
  // 이번 게임 기록 중 아직 저장하지 않은 만큼만 누적에 더한다
  const store = loadStore();
  for (const [t, r] of Object.entries(game.rec.quiz)) {
    const prev = savedRun.quiz[t] || { n: 0, ok: 0 };
    const s = store.quiz[t] || (store.quiz[t] = { n: 0, ok: 0 });
    s.n += r.n - prev.n; s.ok += r.ok - prev.ok;
  }
  for (const [k, v] of Object.entries(game.rec.appr)) store.appr[k] = (store.appr[k] || 0) + v - (savedRun.appr[k] || 0);
  savedRun = JSON.parse(JSON.stringify(game.rec));
  try { localStorage.setItem(REC_KEY, JSON.stringify(store)); } catch { /* 저장이 안 되는 환경 */ }
}

const MISTAKES = [
  ['rhomAsRegular', '마름모를 정다각형이라고 함'],
  ['rectAsRegular', '직사각형을 정다각형이라고 함'],
  ['irregularAsRegular', '일반 다각형을 정다각형이라고 함'],
  ['regularMissed', '정다각형을 아니라고 함'],
  ['sidesWrong', '획득 감정에서 변의 수를 틀림'],
  ['earlyWrong', '미리 감정 실패'],
  ['fakeMissed', '곡선 원석을 다각형이라고 함'],
  ['diagWrong', '대각선 수 보너스 틀림'],
  ['reasonWrong', '정다각형이 아닌 이유 틀림'],
  ['quadWrong', '사각형 대각선 성질 틀림'],
];

function showRecord(back, which = 'run') {
  if (which === 'run') saveRecord();
  const data = which === 'run' ? game.rec : loadStore();
  const rows = Object.entries(TYPE_INFO).filter(([t]) => data.quiz[t] && data.quiz[t].n).map(([t, info]) => {
    const r = data.quiz[t], pct = Math.round((r.ok / r.n) * 100);
    return `<div class="rec-row"><span>${info.name}</span><span class="rec-bar"><i class="${pct >= 80 ? '' : pct >= 50 ? 'mid' : 'low'}" style="width:${pct}%"></i></span><span class="rec-num">${r.ok}/${r.n}</span></div>`;
  }).join('') || '<p>아직 푼 문제가 없어요.</p>';
  const mis = MISTAKES.map(([k, label]) => `<li><span>${label}</span><b>${data.appr[k] || 0}번</b></li>`).join('');
  const good = data.appr.finalOk || 0, early = data.appr.earlyOk || 0;
  showOverlay(`<div class="card rec-card">
    <h2>학습 기록</h2>
    <div class="rec-tabs"><button id="tabRun" class="${which === 'run' ? 'on' : ''}">이번 게임</button><button id="tabAll" class="${which === 'all' ? 'on' : ''}">이 태블릿 누적</button></div>
    <div class="rec-grid">
      <div><h3>문제 유형별 첫 시도 정답</h3>${rows}</div>
      <div><h3>감정에서 한 실수</h3><ul class="rec-mis">${mis}</ul><p class="rec-note">감정 성공 ${good}번 · 미리 감정 성공 ${early}번</p></div>
    </div>
    <p class="rec-note">선생님 확인용: 빨간 막대가 많은 유형과 자주 한 실수를 수업에서 다시 짚어 주세요.</p>
    <div class="row"><button class="big-btn" id="recBack">돌아가기</button></div>
  </div>`);
  $('tabRun').addEventListener('click', () => { sfx.tap(); showRecord(back, 'run'); });
  $('tabAll').addEventListener('click', () => { sfx.tap(); showRecord(back, 'all'); });
  $('recBack').addEventListener('click', () => { sfx.tap(); back(); });
}

function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

if (window.claude?.hot?.ready) window.claude.hot.ready(boot);
else boot(window.claude?.hot?.data ?? {});
