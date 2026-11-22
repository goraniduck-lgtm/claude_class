// 1대1 대결 대기실 화면 (명세서 14.1~14.2)
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const clean = (s) => String(s || '').replace(/[<>&"]/g, '').trim().slice(0, 8);

export function modeText(opts) {
  if (!opts) return '';
  const how = opts.mode === 'pick' ? '곡괭이 한정 (40개)' : `시간 대전 ${opts.minutes}분`;
  const crit = opts.crit === 'count' ? '보석 개수' : '보석 가치 합';
  return `${how} · ${crit} · 방해 아이템 ${opts.items ? '켬' : '끔'}`;
}

// 첫 화면: 별명 + 방 만들기 / 방 들어가기
export function lobbyHome(overlay, { nickname = '', netKind, netFallback = false, sfx }) {
  return new Promise((resolve) => {
    overlay.className = 'overlay';
    overlay.innerHTML = `<div class="card lobby-card">
      <h2>1대1 대결</h2>
      <p>같은 광산에서 동시에 캐요. 콤보와 미리 감정으로 상대 판에 <b>낙석</b>을 보내요!</p>
      <label class="lobby-label" for="lbNick">내 별명 <small>(실명 말고, 8글자까지)</small></label>
      <input id="lbNick" class="nick-in" maxlength="8" value="${esc(nickname)}" placeholder="예: 반짝 광부" autocomplete="off">
      <div class="row"><button class="big-btn" id="lbCreate">방 만들기</button><button class="big-btn" id="lbJoin">방 들어가기</button></div>
      <div class="row"><button class="big-btn alt" id="lbBack">돌아가기</button></div>
      ${netKind === 'local' ? (netFallback
        ? '<p class="note net-note">대결 서버에 연결하지 못해서 <b>시험 연결</b>로 바뀌었어요. 인터넷이 되는지 확인하고 돌아가기를 눌렀다가 다시 들어와 보세요.</p>'
        : '<p class="note net-note">지금은 <b>시험 연결</b>이에요. 같은 기기에서 창(탭)을 두 개 열어야 대결할 수 있어요. 태블릿 두 대로 하려면 Firebase 연결이 필요해요.</p>') : ''}
    </div>`;
    const nick = () => clean(overlay.querySelector('#lbNick').value) || '광부';
    overlay.querySelector('#lbCreate').addEventListener('click', () => { sfx.tap(); resolve({ action: 'create', nickname: nick() }); });
    overlay.querySelector('#lbJoin').addEventListener('click', () => { sfx.tap(); resolve({ action: 'join', nickname: nick() }); });
    overlay.querySelector('#lbBack').addEventListener('click', () => { sfx.tap(); resolve({ action: 'back' }); });
  });
}

// 방 만들기: 방식 · 승패 기준 · 방해 아이템
export function createOptions(overlay, { sfx }) {
  return new Promise((resolve) => {
    const opts = { mode: 'time', minutes: 5, crit: 'value', items: true };
    overlay.className = 'overlay';
    const seg = (name, items) => `<div class="seg" data-name="${name}">${items.map(([v, t]) => `<button class="seg-btn" data-v="${v}">${t}</button>`).join('')}</div>`;
    overlay.innerHTML = `<div class="card lobby-card">
      <h2>방 만들기</h2>
      <div class="opt-row"><span class="opt-name">방식</span>${seg('how', [['t3', '시간 3분'], ['t5', '시간 5분'], ['t7', '시간 7분'], ['pick', '곡괭이 40개']])}</div>
      <p class="note" id="howNote"></p>
      <div class="opt-row"><span class="opt-name">승패</span>${seg('crit', [['value', '보석 가치 합'], ['count', '보석 개수']])}</div>
      <div class="opt-row"><span class="opt-name">방해 아이템</span>${seg('items', [['1', '켬'], ['0', '끔']])}</div>
      <div class="row"><button class="big-btn" id="coOk">만들기</button><button class="big-btn alt" id="coBack">취소</button></div>
    </div>`;
    const refresh = () => {
      const how = opts.mode === 'pick' ? 'pick' : `t${opts.minutes}`;
      overlay.querySelectorAll('.seg').forEach((s) => s.querySelectorAll('.seg-btn').forEach((b) => {
        const v = b.dataset.v, n = s.dataset.name;
        b.classList.toggle('on', (n === 'how' && v === how) || (n === 'crit' && v === opts.crit) || (n === 'items' && v === (opts.items ? '1' : '0')));
      }));
      overlay.querySelector('#howNote').textContent = opts.mode === 'pick'
        ? '시작 5개를 포함해 곡괭이를 40개까지만 받아요. 둘 다 다 쓰거나 7분이 지나면 끝나요. 적게 파고 맞히는 사람이 유리해요.'
        : `${opts.minutes}분 동안 더 많이 캔 사람이 이겨요.`;
    };
    overlay.querySelectorAll('.seg-btn').forEach((b) => b.addEventListener('click', () => {
      sfx.tap();
      const n = b.parentElement.dataset.name, v = b.dataset.v;
      if (n === 'how') { if (v === 'pick') opts.mode = 'pick'; else { opts.mode = 'time'; opts.minutes = Number(v.slice(1)); } }
      if (n === 'crit') opts.crit = v;
      if (n === 'items') opts.items = v === '1';
      refresh();
    }));
    refresh();
    overlay.querySelector('#coOk').addEventListener('click', () => { sfx.tap(); resolve(opts); });
    overlay.querySelector('#coBack').addEventListener('click', () => { sfx.tap(); resolve(null); });
  });
}

// 방 들어가기: 4자리 코드 키패드
export function joinCode(overlay, { sfx, error = '' }) {
  return new Promise((resolve) => {
    let code = '';
    overlay.className = 'overlay';
    overlay.innerHTML = `<div class="card lobby-card">
      <h2>방 들어가기</h2>
      <p>친구 화면에 보이는 <b>방 코드 4자리</b>를 눌러요.</p>
      <div class="code-box" id="jcBox"></div>
      <p class="note bad-note">${esc(error)}</p>
      <div class="code-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => `<button class="key" data-k="${n}">${n}</button>`).join('')}<button class="key" data-k="del">지우기</button><button class="key" data-k="0">0</button><button class="key ok" data-k="ok">들어가기</button></div>
      <div class="row"><button class="big-btn alt" id="jcBack">취소</button></div>
    </div>`;
    const box = overlay.querySelector('#jcBox');
    const draw = () => { box.innerHTML = [0, 1, 2, 3].map((i) => `<span>${code[i] || ''}</span>`).join(''); };
    draw();
    overlay.querySelectorAll('.code-pad .key').forEach((b) => b.addEventListener('click', () => {
      sfx.tap();
      const k = b.dataset.k;
      if (k === 'del') code = code.slice(0, -1);
      else if (k === 'ok') { if (code.length === 4) resolve(code); return; }
      else if (code.length < 4) code += k;
      draw();
    }));
    overlay.querySelector('#jcBack').addEventListener('click', () => { sfx.tap(); resolve(null); });
  });
}

// 대기실: 방 코드, 두 사람, 시작 버튼 (방장만)
export function renderWaiting(overlay, { code, role, room, netKind }) {
  const p1 = room && room.players && room.players.p1;
  const p2 = room && room.players && room.players.p2;
  const both = p1 && p1.online && p2 && p2.online;
  const slot = (p, label, me) => `<div class="pl-slot ${p && p.online ? 'on' : ''}"><small>${label}${me ? ' (나)' : ''}</small><b>${p && p.online ? esc(p.name) : '기다리는 중…'}</b></div>`;
  overlay.className = 'overlay';
  overlay.innerHTML = `<div class="card lobby-card">
    <h2>대결 방</h2>
    <div class="room-code"><small>방 코드</small><b>${code}</b></div>
    <p class="note">${modeText(room && room.opts)}</p>
    <div class="pl-row">${slot(p1, '방장', role === 'p1')}<span class="vs">VS</span>${slot(p2, '도전자', role === 'p2')}</div>
    <p>${both ? (role === 'p1' ? '둘 다 들어왔어요. 시작을 눌러요!' : '방장이 시작하기를 기다려요.') : role === 'p1' ? '친구에게 방 코드를 알려 주세요.' : '방장을 기다려요.'}</p>
    <div class="row">${role === 'p1' ? `<button class="big-btn" id="wrStart" ${both ? '' : 'disabled'}>시작!</button>` : ''}<button class="big-btn alt" id="wrLeave">나가기</button></div>
    ${netKind === 'local' ? '<p class="note net-note">시험 연결: 같은 기기의 다른 창에서 방 들어가기를 눌러 코드를 넣어요.</p>' : ''}
  </div>`;
}
