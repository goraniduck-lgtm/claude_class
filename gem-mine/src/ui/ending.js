// 엔딩 (명세서 9.5): 별명 → 일러스트 3장 + 크레딧 → 새 버튼 열림
import { drawScene, SCENES } from '../render/scenes.js';

// 말풍선: 그림 크기에 대한 비율 위치. 글자는 코드가 얹으므로 그림을 바꿔도 그대로다
const BUBBLES = {
  home: [{ x: 0.58, y: 0.08, text: '진짜 슈퍼 보석을 캐 왔어요!', tail: 'left' }, { x: 0.12, y: 0.42, text: '와아!', small: true }, { x: 0.8, y: 0.44, text: '대단해!', small: true }],
  fake: [{ x: 0.6, y: 0.06, text: '음… 이건 가짜 유리구슬이구먼!', tail: 'right' }, { x: 0.04, y: 0.2, text: '털썩…', small: true }],
  again: [{ x: 0.2, y: 0.1, text: '더 깊은 곳엔 진짜가 있을 거야!', tail: 'left' }],
};
const CAPTIONS = { home: '① 금의환향', fake: '② 감정 결과는…', again: '③ 다시 광산으로' };
const SCENE_MS = 6500;

export function askNickname(overlay, { current = '', sfx }) {
  return new Promise((resolve) => {
    overlay.className = 'overlay';
    overlay.innerHTML = `<div class="card">
      <h2>최심층 정복!</h2>
      <p>엔딩 크레딧에 올릴 <b>광부 별명</b>을 지어 주세요.</p>
      <p class="note">실명 말고 별명을 적어요. (8글자까지)</p>
      <input id="nickIn" class="nick-in" maxlength="8" value="${escapeHtml(current)}" placeholder="예: 반짝 광부" autocomplete="off">
      <div class="row"><button class="big-btn" id="nickOk">좋아요</button><button class="big-btn alt" id="nickSkip">그냥 볼래요</button></div>
    </div>`;
    const inp = overlay.querySelector('#nickIn');
    const done = (v) => { if (sfx) sfx.tap(); resolve(v); };
    overlay.querySelector('#nickOk').addEventListener('click', () => done(clean(inp.value)));
    overlay.querySelector('#nickSkip').addEventListener('click', () => done(current || ''));
    inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') done(clean(inp.value)); });
  });
}

// lines: 크레딧 줄 [['총점', '1234점'], …]. seen: 이미 엔딩을 본 횟수 (1번 이상이면 건너뛰기 가능)
export function runCredits(overlay, { lines, seen = 0, sfx }) {
  return new Promise((resolve) => {
    overlay.className = 'overlay ending-ov';
    const credit = lines.map(([a, b]) => (b === undefined ? `<div class="cr-title">${a}</div>` : `<div class="cr-row"><span>${a}</span><b>${escapeHtml(String(b))}</b></div>`)).join('');
    overlay.innerHTML = `<div class="ending">
      <div class="ending-art"><canvas id="endCv" width="1600" height="1000" aria-hidden="true"></canvas><div class="ending-bubbles" id="endBub"></div><div class="ending-cap" id="endCap"></div></div>
      <div class="ending-credits"><div class="cr-roll" id="crRoll">${credit}</div></div>
      <div class="ending-tip">화면을 누르면 빨리 넘어가요</div>
      ${seen > 0 ? '<button class="ghost-btn ending-skip" id="endSkip">건너뛰기</button>' : ''}
    </div>`;
    const cv = overlay.querySelector('#endCv');
    const g = cv.getContext('2d');
    const bub = overlay.querySelector('#endBub');
    const cap = overlay.querySelector('#endCap');
    const roll = overlay.querySelector('#crRoll');
    let idx = -1, sceneStart = 0, finished = false;
    const t0 = performance.now();
    const total = SCENE_MS * SCENES.length;

    const show = (k) => {
      idx = k;
      sceneStart = performance.now();
      const key = SCENES[k];
      cap.textContent = CAPTIONS[key];
      bub.innerHTML = BUBBLES[key].map((b) => `<div class="bubble ${b.small ? 'small' : ''} ${b.tail || ''}" style="left:${b.x * 100}%;top:${b.y * 100}%">${b.text}</div>`).join('');
      cv.classList.remove('fadein'); void cv.offsetWidth; cv.classList.add('fadein');
      if (sfx) (k === 1 ? sfx.appraiseBad : sfx.gem)();
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      resolve();
    };
    const next = () => { if (idx < SCENES.length - 1) show(idx + 1); else finish(); };
    overlay.querySelector('.ending').addEventListener('pointerdown', (e) => {
      if (e.target.id === 'endSkip') return;
      next();
    });
    const skip = overlay.querySelector('#endSkip');
    if (skip) skip.addEventListener('click', () => { if (sfx) sfx.tap(); finish(); });
    show(0);
    const frame = (now) => {
      if (finished) return;
      const t = (now - t0) / 1000;
      drawScene(g, SCENES[idx], cv.width, cv.height, t);
      // 크레딧은 장면 진행에 맞춰 올라간다
      const prog = Math.min(1, (idx * SCENE_MS + Math.min(SCENE_MS, now - sceneStart)) / total);
      const h = roll.scrollHeight, boxH = roll.parentElement.clientHeight;
      roll.style.transform = `translateY(${boxH - prog * (h + boxH * 0.15)}px)`;
      if (now - sceneStart > SCENE_MS) next();
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  });
}

function clean(s) { return String(s || '').replace(/[<>&"]/g, '').trim().slice(0, 8); }
function escapeHtml(s) { return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
