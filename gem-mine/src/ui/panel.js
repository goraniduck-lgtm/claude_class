// 왼쪽 패널: 평소에는 문제, 보석을 감정할 때는 감정소가 된다.
import { CONFIG } from '../config.js';
import { NAMES, KOR, diagRule } from '../quiz/bank.js';
import { gemThumb } from '../render/textures.js';
import { diagonals } from '../core/geometry.js';

const LEVEL = { 1: '쉬움', 2: '보통', 3: '어려움' };
const $ = (id) => document.getElementById(id);
const sameSet = (a, b) => a.length === b.length && [...a].sort().join() === [...b].sort().join();

export class Panel {
  constructor({ deck, onCorrect, onWrong, onSkip, onRead, sfx }) {
    this.deck = deck;
    this.onCorrect = onCorrect;
    this.onWrong = onWrong;
    this.onSkip = onSkip;
    this.onRead = onRead || (() => {});
    this.sfx = sfx;
    this.body = $('pBody');
    this.title = $('pTitle');
    this.chip = $('pChip');
    this.skipBtn = $('skipBtn');
    this.mode = 'quiz';
    this.skipBtn.addEventListener('click', () => this.skip());
  }

  // ---------- 문제 ----------
  nextQuiz() {
    this.q = this.deck.next();
    this.attempts = 0;
    this.disabled = new Set();
    this.renderQuiz();
  }

  renderQuiz() {
    const q = this.q;
    this.mode = 'quiz';
    this.busy = false;
    this.title.textContent = '문제';
    this.chip.className = 'chip l' + q.level;
    this.chip.textContent = `${LEVEL[q.level]} · 곡괭이 +${CONFIG.reward[q.level]}`;
    this.skipBtn.disabled = false;
    let html = '';
    const compact = q.list || q.format === 'multipick';
    if (q.figure) html += `<div class="fig ${q.list || q.format === 'figpick' ? 'short' : ''}">${q.figure}</div>`;
    html += `<div class="prompt">${q.prompt}</div>`;
    if (q.list) html += `<ul class="qlist">${q.list.map((l) => `<li>${l}</li>`).join('')}</ul>`;
    if (q.format === 'number') {
      html += `<div class="numrow"><div class="numdisp" id="numDisp"><span id="numVal"></span>${q.unit ? `<span class="unit">${q.unit}</span>` : ''}</div></div>`;
      html += keypad();
    } else if (q.format === 'figpick' || q.format === 'multipick') {
      const multi = q.format === 'multipick';
      html += `<div class="choices ${multi ? 'multi' : ''}">` + q.choices.map((c, i) => `<button class="ans figans" data-v="${c.value}" aria-label="${KOR[i]}"><span class="tag">${KOR[i]}</span>${c.svg}</button>`).join('') + '</div>';
      if (multi) html += '<button class="big-btn multi-go" id="multiGo">다 골랐어요</button>';
    } else {
      const cls = q.choices.length === 3 && !compact ? 'choices three' : 'choices';
      html += `<div class="${cls}">` + q.choices.map((c, i) => `<button class="ans" data-i="${i}">${c.label}</button>`).join('') + '</div>';
    }
    this.body.innerHTML = html;
    this.typed = '';
    if (q.format === 'number') {
      this.body.querySelectorAll('.key').forEach((b) => b.addEventListener('click', () => this.key(b.dataset.k)));
    } else if (q.format === 'multipick') {
      this.picked = new Set();
      this.body.querySelectorAll('.ans').forEach((b) => b.addEventListener('click', () => {
        if (this.busy) return;
        this.sfx.tap();
        const v = Number(b.dataset.v);
        if (this.picked.has(v)) { this.picked.delete(v); b.classList.remove('sel'); } else { this.picked.add(v); b.classList.add('sel'); }
      }));
      $('multiGo').addEventListener('click', () => { if (this.picked.size) this.submit([...this.picked], $('multiGo')); });
    } else if (q.format === 'figpick') {
      this.body.querySelectorAll('.ans').forEach((b) => {
        if (this.disabled.has(b.dataset.v)) { b.classList.add('no'); b.disabled = true; }
        b.addEventListener('click', () => this.submit(Number(b.dataset.v), b));
      });
    } else {
      this.body.querySelectorAll('.ans').forEach((b) => {
        if (this.disabled.has(b.dataset.i)) { b.classList.add('no'); b.disabled = true; }
        b.addEventListener('click', () => this.submit(q.choices[Number(b.dataset.i)].value, b));
      });
    }
  }

  key(k) {
    if (this.busy) return;
    this.sfx.tap();
    if (k === 'del') this.typed = this.typed.slice(0, -1);
    else if (k === 'ok') { if (this.typed) this.submit(Number(this.typed), $('numDisp')); return; }
    else if (this.typed.length < 3) this.typed += k;
    $('numVal').textContent = this.typed;
  }

  submit(value, el) {
    if (this.busy || this.mode !== 'quiz') return;
    const q = this.q;
    const ok = q.format === 'multipick' ? sameSet(value, q.answer) : value === q.answer;
    if (ok) {
      el.classList.add('ok');
      this.busy = true;
      this.onCorrect(q, this.attempts === 0, el);
      setTimeout(() => { this.busy = false; if (this.mode === 'quiz') this.nextQuiz(); }, 500);
      return;
    }
    this.attempts++;
    if (q.format === 'multipick') {
      this.body.querySelectorAll('.ans.sel').forEach((b) => b.classList.add('no'));
    } else {
      el.classList.add('no');
      if (el.dataset) { if (el.dataset.i != null) this.disabled.add(el.dataset.i); if (el.dataset.v != null) this.disabled.add(el.dataset.v); }
    }
    el.classList.remove('shake-x'); void el.offsetWidth; el.classList.add('shake-x');
    this.onWrong(q, this.attempts);
    if (this.attempts === 1) {
      this.lock(CONFIG.wrongLock, '다시 생각해 봐요', () => {
        if (q.format === 'number') { this.typed = ''; $('numVal').textContent = ''; el.classList.remove('no'); }
        if (q.format === 'multipick') { this.picked.clear(); this.body.querySelectorAll('.ans').forEach((b) => b.classList.remove('sel', 'no')); }
      });
    } else {
      this.deck.missed(q.type);
      this.showExplain(q.explain);
    }
  }

  lock(ms, text, done) {
    this.busy = true;
    const d = document.createElement('div');
    d.className = 'lock';
    this.body.appendChild(d);
    const end = performance.now() + ms;
    const tick = () => {
      if (!d.isConnected) { this.busy = false; return; }
      const left = Math.ceil((end - performance.now()) / 1000);
      if (left <= 0) { d.remove(); this.busy = false; done && done(); return; }
      d.innerHTML = `<div>${text}<b>${left}</b></div>`;
      requestAnimationFrame(tick);
    };
    tick();
  }

  answerText(q) {
    if (q.format === 'number') return `${q.answer}${q.unit || ''}`;
    if (q.format === 'multipick') return q.answer.map((v) => KOR[q.choices.findIndex((c) => c.value === v)]).join(', ');
    if (q.format === 'figpick') return KOR[q.choices.findIndex((c) => c.value === q.answer)];
    return q.choices.find((c) => c.value === q.answer).label;
  }

  // 두 번 틀리면 해설 (읽는 동안 시간이 멈춘다)
  showExplain(text) {
    this.busy = true;
    this.skipBtn.disabled = true;
    this.onRead(true);
    const q = this.q;
    this.body.innerHTML = `${q.figure ? `<div class="fig short">${q.figure}</div>` : ''}
      <div class="explain"><h3>정답: ${this.answerText(q)}</h3>${text}</div>
      <p class="appr-note">해설을 읽는 동안 광차가 멈춰요.</p>
      <button class="big-btn" id="nextQ">다음 문제</button>`;
    $('nextQ').addEventListener('click', () => { this.onRead(false); this.busy = false; this.nextQuiz(); });
  }

  skip() {
    if (this.busy || this.mode !== 'quiz') return;
    this.onSkip();
    this.skipBtn.disabled = true;
    this.lock(CONFIG.skipWait, '다음 문제를 준비해요', () => this.nextQuiz());
  }

  resumeQuiz() {
    if (this.q) this.renderQuiz(); else this.nextQuiz();
  }

  // ---------- 감정소 ----------
  enterAppraise(gem, chip) {
    this.mode = 'appraise';
    this.busy = false;
    this.title.textContent = gem.super ? '슈퍼 보석 감정' : '보석 감정소';
    this.chip.className = 'chip';
    this.chip.textContent = chip;
    this.skipBtn.disabled = true;
  }

  // 미리 감정: 몇 각형만 묻는다. 결과: sides(0 = 다각형이 아님) 또는 null(취소)
  appraiseEarly(gem) {
    return new Promise((resolve) => {
      this.enterAppraise(gem, '미리 감정');
      this.body.innerHTML = `<p class="appr-note">판에 보이는 변과 꼭짓점을 보고 몇 각형인지 맞혀요. 맞히면 남은 칸을 저절로 파고 보너스! 틀리면 곡괭이 ${CONFIG.earlyPenalty}개를 잃어요.</p>
        <div class="prompt">몇 각형일까요?</div>${sidesButtons()}<button class="ghost-btn" id="apprCancel">취소</button>`;
      $('apprCancel').addEventListener('click', () => { this.sfx.tap(); resolve(null); });
      this.body.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => { this.sfx.tap(); resolve(Number(b.dataset.s)); }));
    });
  }

  // 획득 감정서: askSides(변의 수를 아직 모름), askRegular(정다각형을 배웠음)
  appraiseFinal(gem, { askSides, askRegular, name }) {
    return new Promise((resolve) => {
      this.enterAppraise(gem, '획득 감정서');
      const prev = '<div class="gem-prev"><canvas id="gemPrev" width="440" height="300"></canvas></div>';
      const askReg = (sides) => {
        if (!askRegular || sides === 0) { resolve({ sides, regular: false }); return; }
        this.body.innerHTML = `${prev}<div class="prompt">${josaIra(NAMES[sides])}.<br>정다각형일까요?</div>
          <div class="choices"><button class="ans" data-r="1">예, 정다각형</button><button class="ans" data-r="0">아니요</button></div>
          <p class="appr-note">변의 길이와 각의 크기가 모두 같은지 살펴봐요.</p>`;
        this.drawPrev(gem);
        this.body.querySelectorAll('[data-r]').forEach((rb) => rb.addEventListener('click', () => { this.sfx.tap(); resolve({ sides, regular: rb.dataset.r === '1' }); }));
      };
      if (!askSides) { askReg(gem.sides); return; }
      this.body.innerHTML = `${prev}<div class="prompt">캐낸 보석은 몇 각형일까요?</div>${sidesButtons()}`;
      this.drawPrev(gem);
      this.body.querySelectorAll('[data-s]').forEach((b) => b.addEventListener('click', () => { this.sfx.tap(); askReg(Number(b.dataset.s)); }));
      void name;
    });
  }

  drawPrev(gem, opts = {}) {
    const c = $('gemPrev');
    if (!c) return;
    const start = performance.now();
    const total = diagonals(gem.sides || 3);
    const loop = () => {
      if (!c.isConnected) return;
      const el = (performance.now() - start) / 1000;
      let d = opts.diagonals;
      if (opts.animateDiag) {
        d = Math.min(total, Math.floor(el / 0.45));
        const cnt = $('diagCount');
        if (cnt) cnt.textContent = `대각선 ${d}개${d === total ? ' — 다 그었어요!' : ''}`;
      }
      gemThumb(c, gem, el, { diagonals: d });
      requestAnimationFrame(loop);
    };
    loop();
  }

  // 결과 카드. button이 있으면 누를 때까지(읽는 동안 시간 멈춤), 없으면 ms 뒤에 끝난다
  result({ gem, stamp, good, text, button, ms = 1300, prevOpts }) {
    return new Promise((resolve) => {
      this.mode = 'appraise';
      const prev = gem ? '<div class="gem-prev"><canvas id="gemPrev" width="440" height="300"></canvas></div>' : '';
      const counter = prevOpts && prevOpts.animateDiag ? '<div class="diag-count" id="diagCount"></div>' : '';
      this.body.innerHTML = `${prev}${counter}<div class="stamp ${good ? '' : 'bad'}">${stamp}</div>
        ${text ? `<div class="explain ${good ? 'good' : ''}">${text}</div>` : ''}
        ${button ? `<p class="appr-note">읽는 동안 광차가 멈춰요.</p><button class="big-btn" id="resBtn">${button}</button>` : ''}`;
      if (gem) this.drawPrev(gem, prevOpts);
      if (button) {
        this.onRead(true);
        $('resBtn').addEventListener('click', () => { this.sfx.tap(); this.onRead(false); resolve(); });
      } else setTimeout(resolve, ms);
    });
  }

  // 보너스: 대각선 수
  askDiag(gem) {
    return new Promise((resolve) => {
      this.mode = 'appraise';
      this.chip.textContent = gem.super ? '슈퍼 보석 ③' : `보너스 +${CONFIG.diagBonus}`;
      this.body.innerHTML = `<div class="gem-prev"><canvas id="gemPrev" width="440" height="300"></canvas></div>
        <div class="prompt">${gem.super ? '마지막! ' : '보너스! '}이 보석의 대각선은 모두 몇 개일까요?</div>
        <div class="numrow"><div class="numdisp" id="numDisp"><span id="numVal"></span><span class="unit">개</span></div></div>${keypad()}`;
      this.drawPrev(gem);
      let typed = '';
      this.body.querySelectorAll('.key').forEach((b) => b.addEventListener('click', () => {
        this.sfx.tap();
        const k = b.dataset.k;
        if (k === 'del') typed = typed.slice(0, -1);
        else if (k === 'ok') { if (typed) resolve(Number(typed)); return; }
        else if (typed.length < 2) typed += k;
        $('numVal').textContent = typed;
      }));
    });
  }

  // 보너스: 마름모·직사각형이 정다각형이 아닌 이유 (교과서 139·149쪽)
  askReason(gem, name) {
    return new Promise((resolve) => {
      this.mode = 'appraise';
      this.chip.textContent = `보너스 +${CONFIG.diagBonus}`;
      this.body.innerHTML = `<div class="gem-prev"><canvas id="gemPrev" width="440" height="300"></canvas></div>
        <div class="prompt">보너스! ${josaUn(name)} 왜 정다각형이 아닐까요?</div>
        <div class="choices one"><button class="ans" data-a="side">변의 길이가 모두 같지는 않아서</button><button class="ans" data-a="angle">각의 크기가 모두 같지는 않아서</button></div>`;
      this.drawPrev(gem);
      this.body.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', () => { this.sfx.tap(); resolve(b.dataset.a); }));
    });
  }

  // 보너스: 사각형 두 대각선의 성질 (교과서 141쪽)
  askQuad(gem, prop) {
    return new Promise((resolve) => {
      this.mode = 'appraise';
      this.chip.textContent = `보너스 +${CONFIG.diagBonus}`;
      const q = prop === 'eq' ? '이 보석의 두 대각선은 길이가 같을까요?' : '이 보석의 두 대각선은 서로 수직으로 만날까요?';
      this.body.innerHTML = `<div class="gem-prev"><canvas id="gemPrev" width="440" height="300"></canvas></div>
        <div class="prompt">보너스! ${q}</div>
        <div class="choices"><button class="ans" data-a="1">예</button><button class="ans" data-a="0">아니요</button></div>`;
      this.drawPrev(gem, { diagonals: 'dashed' });
      this.body.querySelectorAll('[data-a]').forEach((b) => b.addEventListener('click', () => { this.sfx.tap(); resolve(b.dataset.a === '1'); }));
    });
  }
}

function keypad() {
  return '<div class="keypad">' + [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((n) => `<button class="key" data-k="${n}">${n}</button>`).join('') +
    '<button class="key del" data-k="del">지우기</button><button class="key go" data-k="ok">확인</button></div>';
}

function sidesButtons() {
  return '<div class="choices">' + [3, 4, 5, 6, 7, 8].map((n) => `<button class="ans small" data-s="${n}">${NAMES[n]}</button>`).join('')
    + '<button class="ans small" data-s="0" style="grid-column:span 2">다각형이 아니에요</button></div>';
}

function hasBatchim(word) {
  const ch = word.charCodeAt(word.length - 1) - 0xac00;
  return ch >= 0 && ch % 28 !== 0;
}
const josaIra = (w) => w + (hasBatchim(w) ? '이에요' : '예요');
const josaUn = (w) => w + (hasBatchim(w) ? '은' : '는');

// 감정 해설 (정다각형을 배우기 전이면 변의 수만 설명)
export function gemExplain(gem, lesson = 8, name = gem.name) {
  const n = gem.sides;
  if (gem.fake) return `${name}에는 굽은 선이 있어요. 선분으로만 둘러싸인 도형이어야 다각형이에요.`;
  if (lesson < 3) return `변이 ${n}개라서 ${NAMES[n]}이에요.`;
  if (gem.super) return `변 ${n}개의 길이와 각 ${n}개의 크기가 모두 같은 정${NAMES[n]}이에요.`;
  if (gem.regular) return `변 ${n}개의 길이와 각 ${n}개의 크기가 모두 같아서 ${name}이에요.`;
  switch (gem.kind) {
    case 'rhom': return '마름모는 네 변의 길이가 모두 같지만 네 각의 크기가 모두 같지는 않아서 정다각형이 아니에요.';
    case 'rect': return '직사각형은 네 각의 크기가 모두 같지만 네 변의 길이가 모두 같지는 않아서 정다각형이 아니에요.';
    case 'trap': case 'para': return `${josaUn(name)} 변이 4개인 사각형이에요. 변의 길이와 각의 크기가 모두 같지는 않아서 정다각형이 아니에요.`;
    case 'tri': return '변이 3개라서 삼각형이에요. 세 변의 길이와 세 각의 크기가 모두 같지는 않아서 정삼각형이 아니에요.';
    default: return `변이 ${n}개라서 ${NAMES[n]}이에요. 변의 길이와 각의 크기가 모두 같지는 않아서 정다각형이 아니에요.`;
  }
}

export function diagHint(n) {
  return `서로 이웃하지 않는 두 꼭짓점을 모두 이어 세어 봐요. 규칙: ${diagRule(n)}`;
}
