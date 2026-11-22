// 게임 규칙과 상태 (화면과 분리). 화면은 이 객체의 메서드를 부르고 결과를 받아 연출한다.
import { CONFIG } from '../config.js';
import { makeRng, randomSeed } from './rng.js';
import { generateBoard } from './mineGen.js';
import { diagonals } from './geometry.js';
import { ITEMS, itemCells } from './items.js';

const NAMES = { 3: '삼각형', 4: '사각형', 5: '오각형', 6: '육각형', 7: '칠각형', 8: '팔각형' };

export class Game {
  constructor({ gemData, stageData, seed = randomSeed(), lesson = CONFIG.defaultLesson }) {
    this.lesson = lesson;
    this.rec = { quiz: {}, appr: {} };
    this.gemData = gemData;
    this.stageData = stageData;
    this.seed = seed;
    this.boardCount = 0;
    this.stageIndex = 0;
    this.pickaxes = CONFIG.startPickaxes;
    this.total = 0;
    this.combo = 0;
    this.items = [];
    this.drill = 0;
    this.mode = 'story';      // story | endless
    this.depth = 0;           // 무한 도전에서 깬 스테이지 수
    this.playTime = 0;
    this.itemRng = makeRng((seed ^ 0x5bd1e995) >>> 0);
    this.stats = { solved: 0, correct: 0, gems: 0, early: 0, dim: 0, fails: 0, bestCombo: 0 };
  }

  get stage() {
    if (this.mode === 'battle') return this.battleStage;
    return this.mode === 'endless' ? this.endlessStage() : this.stageData.stages[this.stageIndex];
  }
  get floorDef() {
    if (this.mode === 'battle') {
      const f = this.stageData.floors.find((x) => x.floor === CONFIG.battle.floor) || this.stageData.floors[0];
      return { ...f, name: '대결 광산' };
    }
    if (this.mode === 'endless') {
      const deep = this.stageData.floors[this.stageData.floors.length - 1];
      return { ...deep, floor: this.stage.floor, name: `지하 ${this.stage.floor}층` };
    }
    return this.stageData.floors.find((f) => f.floor === this.stage.floor);
  }
  get isLastStage() { return this.mode === 'story' && this.stageIndex === this.stageData.stages.length - 1; }

  // ---------- 1대1 대결 ----------
  // opts: { mode: 'time'|'pick', minutes, crit: 'value'|'count', items: bool }. 두 기기가 같은 seed로 같은 광산을 만든다
  startBattle(opts, seed) {
    this.mode = 'battle';
    this.seed = seed >>> 0;
    this.boardCount = 0;
    this.battleOpts = opts;
    const minutes = opts.mode === 'pick' ? CONFIG.battle.pickMinutes : opts.minutes || 5;
    this.battleStage = { id: '대결', floor: CONFIG.battle.floor, time: minutes * 60, target: Infinity, battle: true, noChest: false };
    this.pickaxes = CONFIG.startPickaxes;
    this.picksEarned = this.pickaxes;
    this.items = [];
    this.drill = 0;
    this.shield = 0;
    this.total = 0;
    this.playTime = 0;
    this.itemRng = makeRng((this.seed ^ 0x2c1b3c6d) >>> 0);
    this.stats = { solved: 0, correct: 0, gems: 0, early: 0, dim: 0, fails: 0, bestCombo: 0 };
    this.startStage();
  }

  get picksLeftToEarn() {
    if (this.mode !== 'battle' || this.battleOpts.mode !== 'pick') return Infinity;
    return Math.max(0, CONFIG.battle.pickCap - this.picksEarned);
  }

  // 낙석: 부서진 빈칸(보석이 비치지 않는 칸)을 돌로 다시 덮는다. 빈칸이 모자라면 흙 타일이 돌로 바뀐다
  dropRocks(n, rng = this.itemRng) {
    const b = this.board;
    const touched = new Set();
    for (const g of b.gems) if (!g.collected) for (const [k, a] of Object.entries(g.coverMap)) if (a > CONFIG.revealThreshold) touched.add(Number(k));
    const empty = [], dirt = [];
    b.tiles.forEach((t, i) => {
      if (touched.has(i)) return;
      if (t.broken) empty.push(i);
      else if (t.type === 'dirt' && !t.chest) dirt.push(i);
    });
    const out = [];
    for (const pool of [empty, dirt]) {
      while (out.length < n && pool.length) {
        const i = pool.splice(Math.floor(rng.next() * pool.length), 1)[0];
        const t = b.tiles[i];
        Object.assign(t, { type: 'stone', hp: CONFIG.tileHp.stone, maxHp: CONFIG.tileHp.stone, broken: false, hitAt: 0 });
        out.push(i);
      }
    }
    if (b.radar) for (const i of out) delete b.radar[i];
    return out;
  }

  // 무한 도전: 지하 5층부터 끝없이. 목표 가치는 스테이지마다 오른다
  endlessStage() {
    const E = CONFIG.endless;
    return { id: `무한 ${this.depth + 1}`, floor: E.startFloor + this.depth, time: E.time, target: E.target + E.step * this.depth, endless: true };
  }

  startEndless() {
    this.mode = 'endless';
    this.depth = 0;
    this.pickaxes = CONFIG.startPickaxes;
    this.items = [];
    this.drill = 0;
    this.total = 0;
    this.playTime = 0;
    this.stats = { solved: 0, correct: 0, gems: 0, early: 0, dim: 0, fails: 0, bestCombo: 0 };
    this.startStage();
  }
  get comboLevel() {
    let lv = 0;
    CONFIG.comboLevels.forEach((th, i) => { if (this.combo >= th) lv = i; });
    return lv;
  }

  // saved: 저장된 진행 (곡괭이·아이템·점수·기록). 없으면 처음부터
  startRun(stageIndex = 0, saved = null) {
    this.mode = 'story';
    this.stageIndex = stageIndex;
    this.pickaxes = saved ? saved.pickaxes : CONFIG.startPickaxes;
    this.items = saved ? [...(saved.items || [])] : [];
    this.drill = saved ? saved.drill || 0 : 0;
    this.total = saved ? saved.total || 0 : 0;
    this.playTime = saved ? saved.playTime || 0 : 0;
    this.stats = saved && saved.stats ? { ...saved.stats } : { solved: 0, correct: 0, gems: 0, early: 0, dim: 0, fails: 0, bestCombo: 0 };
    this.startStage();
  }

  // 저장할 진행 상태 (스테이지를 시작할 때의 값)
  progress() {
    return { stageIndex: this.stageIndex, ...this.snapshot, stats: { ...this.stats }, playTime: this.playTime };
  }

  startStage() {
    this.snapshot = { pickaxes: this.pickaxes, total: this.total, items: [...this.items], drill: this.drill };
    this.timeLeft = this.stage.time;
    this.stageValue = 0;
    this.combo = 0;
    this.trayGems = [];
    this.hourglassGiven = false;
    this.newBoard();
  }

  retryStage() {
    this.pickaxes = this.snapshot.pickaxes;
    this.total = this.snapshot.total;
    this.items = [...this.snapshot.items];
    this.drill = this.snapshot.drill;
    this.stats.fails++;
    this.startStage();
  }

  newBoard() {
    const idx = this.mode === 'endless' ? 100 + this.depth : this.mode === 'battle' ? 300 : this.stageIndex;
    const rng = makeRng((this.seed + idx * 1009 + this.boardCount++ * 7919) >>> 0);
    this.board = generateBoard({ rng, gemData: this.gemData, floorDef: this.floorDef, stageDef: this.stage });
    this.board.radar = {};
  }

  // 판의 진짜 보석을 다 캤나
  boardCleared() { return this.board.gems.every((g) => g.fake || g.collected); }
  realLeft() { return this.board.gems.filter((g) => !g.fake && !g.collected).length; }

  brokenCover(gem) {
    return Object.keys(gem.coverMap).filter((i) => this.board.tiles[i].broken).length;
  }

  // 칸을 눌렀을 때: 부순 칸에 보석이 보이면 감정, 아니면 파기
  tapCell(i) {
    const tile = this.board.tiles[i];
    if (tile.broken) {
      const gem = this.gemAtBrokenCell(i);
      if (gem) return { action: 'appraise', gem, mode: this.isFullyDug(gem) ? 'final' : 'early' };
      return { action: 'none' };
    }
    if (this.pickaxes <= 0) return { action: 'noPick' };
    return this.dig(i);
  }

  gemAtBrokenCell(i) {
    let best = null, bestA = CONFIG.revealThreshold;
    for (const g of this.board.gems) {
      if (g.collected) continue;
      const a = g.coverMap[i] || 0;
      if (a > bestA) { best = g; bestA = a; }
    }
    return best;
  }

  isFullyDug(gem) { return gem.cells.every((i) => this.board.tiles[i].broken); }

  dig(i, free = false) {
    const tile = this.board.tiles[i];
    if (tile.broken) return { action: 'none' };
    if (!free) this.pickaxes--;
    let damage = free ? tile.hp : (this.comboLevel >= 3 ? 2 : 1);
    let drilled = false;
    if (!free && this.drill > 0) { damage = tile.hp; this.drill--; drilled = true; }
    tile.hp = Math.max(0, tile.hp - damage);
    tile.hitAt = typeof performance !== 'undefined' ? performance.now() : 1;
    const result = { action: 'dig', i, type: tile.type, broke: false, revealed: [], completed: [], drilled };
    if (tile.hp === 0) {
      tile.broken = true;
      result.broke = true;
      if (tile.chest) { tile.chest = false; result.chest = this.giveItem(this.randomItem(true)); }
      for (const g of this.board.gems) {
        if (g.collected) continue;
        if ((g.coverMap[i] || 0) > CONFIG.revealThreshold && !g.found) { g.found = true; result.revealed.push(g); }
        if (!g.pendingFinal && this.isFullyDug(g) && g.cells.includes(i)) { g.pendingFinal = true; result.completed.push(g); }
      }
    }
    return result;
  }

  // 감정 채점: sides = 0 은 '다각형이 아니에요'
  grade(gem, sides, regular) {
    if (gem.fake) return sides === 0;
    if (sides !== gem.sides) return false;
    return !!regular === !!gem.regular;
  }

  canEarly(gem) { return this.brokenCover(gem) >= gem.retryAt; }

  // 이 보석 이름 (정다각형을 배우기 전이면 변의 수로만 부른다)
  nameOf(gem) {
    if (this.lesson < 3 && ['pent_reg', 'hex_reg', 'oct_reg'].includes(gem.kind)) return NAMES[gem.sides];
    return gem.name;
  }

  // 미리 감정: 보이는 부분만으로는 정다각형인지 알 수 없으니 '몇 각형'만 맞힌다
  early(gem, sides) {
    const ok = gem.fake ? sides === 0 : sides === gem.sides;
    this.recAppr(ok ? 'earlyOk' : 'earlyWrong');
    if (ok) {
      const remaining = gem.cells.filter((i) => !this.board.tiles[i].broken);
      const bonus = remaining.length * CONFIG.earlyBonusPerCell;
      gem.earlyOk = true;
      gem.pendingFinal = true;
      this.stats.early++;
      return { ok, remaining, bonus };
    }
    const lost = Math.min(this.pickaxes, CONFIG.earlyPenalty);
    this.pickaxes -= lost;
    gem.retryAt = this.brokenCover(gem) + 1;
    return { ok, lost };
  }

  // 획득 감정서에서 정다각형인지 묻는가
  asksRegular(gem) { return !gem.fake && this.lesson >= 3; }

  // 획득 감정: 미리 감정으로 변의 수를 맞혔으면 정다각형인지만 본다
  final(gem, sides, regular) {
    const sidesOk = gem.earlyOk || (gem.fake ? sides === 0 : sides === gem.sides);
    const regularOk = !this.asksRegular(gem) || !sidesOk || !!regular === !!gem.regular;
    const ok = sidesOk && regularOk;
    if (!sidesOk) this.recAppr(gem.fake ? 'fakeMissed' : 'sidesWrong');
    else if (!regularOk) {
      this.recAppr(gem.kind === 'rhom' ? 'rhomAsRegular' : gem.kind === 'rect' ? 'rectAsRegular' : gem.regular ? 'regularMissed' : 'irregularAsRegular');
    } else this.recAppr('finalOk');
    if (gem.super && !ok) {
      const lost = Math.min(this.pickaxes, CONFIG.earlyPenalty);
      this.pickaxes -= lost;
      return { ok, lost, value: 0, retry: true };
    }
    const value = gem.fake ? (ok ? gem.value : 0) : ok ? gem.value : Math.floor(gem.value / 2);
    return { ok, value };
  }

  // 보석을 얻은 뒤의 보너스 문제 종류
  bonusKind(gem) {
    if (gem.fake) return null;
    if (gem.super) return this.lesson >= 4 ? 'diag' : null;
    if ((gem.kind === 'rhom' || gem.kind === 'rect') && this.lesson >= 3) return 'reason';
    if (['sq', 'para', 'trap'].includes(gem.kind) && this.lesson >= 4) return this.quadProperty(gem) ? 'quad' : null;
    if (gem.regular && gem.sides >= 5 && this.lesson >= 4) return 'diag';
    return null;
  }

  // 사각형 보석의 두 대각선: 길이가 같은가 / 수직으로 만나는가 (모양에서 계산해 분명한 것만 묻는다)
  quadProperty(gem) {
    if (gem._quad !== undefined) return gem._quad;
    const p = gem.poly;
    const d1 = [p[2][0] - p[0][0], p[2][1] - p[0][1]], d2 = [p[3][0] - p[1][0], p[3][1] - p[1][1]];
    const l1 = Math.hypot(...d1), l2 = Math.hypot(...d2);
    const eqGap = Math.abs(l1 - l2) / Math.max(l1, l2);
    const ang = Math.abs(Math.acos((d1[0] * d2[0] + d1[1] * d2[1]) / (l1 * l2)) * 180 / Math.PI - 90);
    const opts = [];
    if (eqGap < 0.01 || eqGap > 0.12) opts.push({ prop: 'eq', answer: eqGap < 0.01 });
    if (ang < 1 || ang > 12) opts.push({ prop: 'perp', answer: ang < 1 });
    gem._quad = opts.length ? opts[Math.floor(Math.random() * opts.length)] : null;
    return gem._quad;
  }

  bonus(gem, kind, answer) {
    let ok;
    if (kind === 'reason') ok = answer === (gem.kind === 'rhom' ? 'angle' : 'side');
    else if (kind === 'quad') ok = answer === gem._quad.answer;
    else ok = answer === diagonals(gem.sides);
    this.recAppr(ok ? 'bonusOk' : `${kind}Wrong`);
    if (gem.super && !ok) {
      const lost = Math.min(this.pickaxes, CONFIG.earlyPenalty);
      this.pickaxes -= lost;
      return { ok, lost, retry: true };
    }
    return { ok, bonus: ok && !gem.super ? CONFIG.diagBonus : 0 };
  }

  recAppr(key) { this.rec.appr[key] = (this.rec.appr[key] || 0) + 1; }
  recQuiz(type, firstOk) {
    const r = this.rec.quiz[type] || (this.rec.quiz[type] = { n: 0, ok: 0 });
    r.n++; if (firstOk) r.ok++;
  }

  diag(gem, n) {
    const ok = n === diagonals(gem.sides);
    if (gem.super && !ok) {
      const lost = Math.min(this.pickaxes, CONFIG.earlyPenalty);
      this.pickaxes -= lost;
      return { ok, lost, retry: true };
    }
    return { ok, bonus: ok && !gem.super ? CONFIG.diagBonus : 0 };
  }

  collect(gem, gained, dim = false) {
    gem.collected = true;
    this.addValue(gained);
    if (!gem.fake) { this.stats.gems++; if (dim) this.stats.dim++; }
    this.trayGems.push({ gem, value: gained, dim });
  }

  addValue(v) {
    this.stageValue += v;
    this.total += v;
  }

  stageCleared() {
    if (this.stage.final) return this.board.gems.some((g) => g.super && g.collected);
    return this.stageValue >= this.stage.target;
  }

  // 문제 결과: firstTry = 첫 시도에 맞혔나
  answer(correct, { level, firstTry }) {
    if (correct) {
      this.stats.solved++;
      if (firstTry) this.stats.correct++;
      const prevLv = this.comboLevel;
      if (firstTry) this.combo++;
      this.stats.bestCombo = Math.max(this.stats.bestCombo, this.combo);
      let gain = firstTry ? CONFIG.reward[level] : CONFIG.retryReward;
      if (firstTry && this.comboLevel >= CONFIG.comboBonusFrom) gain += CONFIG.comboBonus;
      gain = Math.min(gain, this.picksLeftToEarn); // 곡괭이 한정 대전
      this.picksEarned = (this.picksEarned || 0) + gain;
      this.pickaxes += gain;
      const item = firstTry ? this.comboItem() : null;
      return { gain, levelUp: this.comboLevel > prevLv, item };
    }
    const broke = this.combo >= CONFIG.comboLevels[1];
    this.combo = 0;
    return { gain: 0, comboBroke: broke };
  }

  skip() {
    const broke = this.combo >= CONFIG.comboLevels[1];
    this.combo = 0;
    return { comboBroke: broke };
  }

  canSwap() { return this.pickaxes >= CONFIG.swapCost && !this.stage.final; }
  swap() {
    if (!this.canSwap()) return false;
    this.pickaxes -= CONFIG.swapCost;
    this.newBoard();
    return true;
  }

  // ---------- 아이템 ----------
  // 콤보 보상: 3콤보 줄 다이너마이트, 6콤보 폭탄, 10콤보 탐지기, 그 뒤 5콤보마다 무작위. 2단계부터는 가끔 덤
  comboItem() {
    const c = this.combo;
    let kind = CONFIG.comboItems[c];
    if (!kind && c > 10 && (c - 10) % CONFIG.comboItemEvery === 0) kind = this.randomItem(false);
    if (!kind && this.comboLevel >= 2 && this.itemRng.chance(CONFIG.comboItemChance)) kind = this.randomItem(false);
    if (!kind) return null;
    if (kind === 'line') kind = this.itemRng.chance(0.5) ? 'row' : 'col';
    // 대결: 3콤보 보상에 방해 아이템이 섞여 나온다
    if (this.mode === 'battle' && this.battleOpts.items && c === 3 && this.itemRng.chance(0.5)) kind = this.itemRng.pick(['dust', 'steal', 'shield']);
    return this.giveItem(kind);
  }

  // 모래시계는 스테이지마다 한 번만 나온다
  randomItem(fromChest) {
    const pool = ['row', 'col', 'bomb', 'radar', 'drill'];
    if (this.mode === 'battle') {
      // 대결에서는 시간이 같이 흐르므로 모래시계 대신 방해 아이템
      if (this.battleOpts.items) pool.push('dust', 'steal', 'shield', 'dust', 'steal');
      return this.itemRng.pick(pool);
    }
    if (!this.hourglassGiven && !this.stage.final) pool.push('hourglass', 'hourglass');
    const kind = this.itemRng.pick(pool);
    if (kind === 'hourglass') this.hourglassGiven = true;
    return kind;
  }

  giveItem(kind) {
    if (this.items.length >= CONFIG.itemSlots) return { kind, added: false };
    this.items.push(kind);
    return { kind, added: true };
  }

  // 아이템 쓰기. i = 고른 칸 (범위 아이템만)
  useItem(slot, i = -1) {
    const kind = this.items[slot];
    if (!kind) return null;
    const res = { kind, broken: [], revealed: [], completed: [], chests: [] };
    if (ITEMS[kind].target && i < 0) return null;
    this.items.splice(slot, 1);
    const { cols, rows } = this.board;
    if (kind === 'row' || kind === 'col' || kind === 'bomb') {
      for (const c of itemCells(kind, i, cols, rows)) {
        const tile = this.board.tiles[c];
        if (tile.broken) continue;
        const d = this.dig(c, true);
        res.broken.push({ i: c, type: d.type });
        res.revealed.push(...d.revealed);
        res.completed.push(...d.completed);
        if (d.chest) res.chests.push({ i: c, ...d.chest });
      }
    } else if (kind === 'radar') {
      const cells = itemCells(kind, i, cols, rows);
      const gemCells = new Set();
      for (const g of this.board.gems) if (!g.collected) g.cells.forEach((c) => gemCells.add(c));
      res.count = cells.filter((c) => gemCells.has(c)).length;
      this.board.radar[i] = res.count;
      res.cells = cells;
    } else if (kind === 'hourglass') {
      res.before = this.timeLeft;
      this.timeLeft = Math.min(this.stage.time, this.timeLeft + CONFIG.hourglassSec);
      res.added = Math.round(this.timeLeft - res.before);
    } else if (kind === 'drill') {
      this.drill += CONFIG.drillHits;
    } else if (kind === 'shield') {
      this.shield = (this.shield || 0) + 1;
    }
    // dust·steal은 상대 기기에서 효과가 난다 (대결 화면이 보낸다)
    return res;
  }

  // 스테이지 클리어 보상, 다음 스테이지로
  advance() {
    const prevFloor = this.stage.floor;
    const timeBonus = Math.floor(this.timeLeft) * CONFIG.timeBonusPerSec;
    this.total += timeBonus;
    if (this.mode === 'endless') {
      this.depth++;
      this.pickaxes += CONFIG.stageClearPickaxes;
      return { timeBonus, picks: CONFIG.stageClearPickaxes, endless: true, floorChange: true };
    }
    if (this.isLastStage) return { timeBonus, ending: true };
    this.stageIndex++;
    const floorChange = this.stage.floor !== prevFloor;
    const picks = floorChange ? CONFIG.floorClearPickaxes : CONFIG.stageClearPickaxes;
    this.pickaxes += picks;
    return { timeBonus, picks, floorChange };
  }
}
