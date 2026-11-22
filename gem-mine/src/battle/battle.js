// 1대1 대결 진행 (명세서 14.3~14.4): 낙석 공격·상쇄, 방해 아이템, 점수 주고받기
import { CONFIG } from '../config.js';

export class Battle {
  // hooks: onRoom(room), onIncoming(list), onFall(n), onDust(), onStealHit() → bool, onStolen(), onBlocked(kind, byMe), onOppGone()
  constructor({ net, code, role, hooks }) {
    this.net = net;
    this.code = code;
    this.role = role;
    this.opp = role === 'p1' ? 'p2' : 'p1';
    this.hooks = hooks;
    this.room = null;
    this.incoming = [];          // [{ n, fallAt }]
    this.immuneUntil = 0;
    this.lastSync = 0;
    this.pendingSync = null;
    this.sent = 0;               // 보낸 낙석 수 (결과 화면)
    this.received = 0;
    this.offRoom = net.watchRoom(code, (room) => { this.room = room; hooks.onRoom && hooks.onRoom(room); });
    this.offEv = null;
  }

  get oppState() { return (this.room && this.room.players && this.room.players[this.opp]) || null; }
  get meState() { return (this.room && this.room.players && this.room.players[this.role]) || null; }
  now() { return this.net.now(); }

  // 한 판을 시작할 때마다 새로 받는다 (이전 판의 사건은 무시)
  beginRound() {
    this.incoming = [];
    this.immuneUntil = 0;
    this.sent = 0;
    this.received = 0;
    if (this.offEv) this.offEv();
    this.offEv = this.net.watchEvents(this.code, (ev) => this.receive(ev));
  }

  // 공격: 먼저 내게 예고된 낙석을 지우고(상쇄), 남는 만큼 상대에게 보낸다
  attack(n) {
    let canceled = 0;
    while (n > 0 && this.incoming.length) {
      const first = this.incoming[0];
      const k = Math.min(n, first.n);
      first.n -= k; n -= k; canceled += k;
      if (first.n <= 0) this.incoming.shift();
    }
    if (n > 0) {
      this.sent += n;
      this.net.sendEvent(this.code, { type: 'rock', n, from: this.role, round: this.round() });
    }
    this.hooks.onIncoming && this.hooks.onIncoming(this.incoming);
    return { canceled, sent: n };
  }

  // 방해 아이템 보내기 (흙먼지·곡괭이 슬쩍)
  sendItem(kind) { this.net.sendEvent(this.code, { type: kind, from: this.role, round: this.round() }); }

  round() { return (this.room && this.room.round) || 0; }
  incomingTotal() { return this.incoming.reduce((s, x) => s + x.n, 0); }

  receive(ev) {
    if (!ev || ev.from === this.role || (ev.round || 0) !== this.round()) return;
    const h = this.hooks;
    const now = this.now();
    if (ev.type === 'rock') {
      if (h.useShield && h.useShield('rock')) { this.net.sendEvent(this.code, { type: 'blocked', what: 'rock', from: this.role, round: this.round() }); return; }
      this.incoming.push({ n: ev.n, fallAt: performance.now() + CONFIG.battle.rockDelay });
      h.onIncoming && h.onIncoming(this.incoming);
    } else if (ev.type === 'dust' || ev.type === 'steal') {
      // 방패가 있으면 막고, 방금 방해를 받았으면 잠깐 무시한다 (연속 괴롭힘 방지)
      if (now < this.immuneUntil || (h.useShield && h.useShield(ev.type))) {
        this.net.sendEvent(this.code, { type: 'blocked', what: ev.type, from: this.role, round: this.round() });
        return;
      }
      this.immuneUntil = now + CONFIG.battle.immuneMs;
      if (ev.type === 'dust') h.onDust && h.onDust();
      else {
        const ok = h.onStealHit ? h.onStealHit() : false;
        this.net.sendEvent(this.code, { type: ok ? 'stolen' : 'stealFail', from: this.role, round: this.round() });
      }
    } else if (ev.type === 'stolen') h.onStolen && h.onStolen();
    else if (ev.type === 'stealFail') h.onBlocked && h.onBlocked('empty', false);
    else if (ev.type === 'blocked') h.onBlocked && h.onBlocked(ev.what, false);
  }

  // 예고 시간이 지난 낙석을 떨어뜨린다
  tick() {
    const t = performance.now();
    let fell = 0;
    while (this.incoming.length && this.incoming[0].fallAt <= t) fell += this.incoming.shift().n;
    if (fell) {
      this.received += fell;
      this.hooks.onFall && this.hooks.onFall(fell);
      this.hooks.onIncoming && this.hooks.onIncoming(this.incoming);
    }
    if (this.pendingSync && t - this.lastSync > 350) this.flush();
  }

  // 내 점수·판 상태를 상대에게 (자주 바뀌므로 묶어서 보낸다)
  sync(state, force = false) {
    this.pendingSync = { ...(this.pendingSync || {}), ...state, seen: this.now() };
    if (force) this.flush();
  }
  flush() {
    if (!this.pendingSync) return;
    const s = this.pendingSync;
    this.pendingSync = null;
    this.lastSync = performance.now();
    this.net.updatePlayer(this.code, this.role, s);
  }

  async leave() {
    if (this.offRoom) this.offRoom();
    if (this.offEv) this.offEv();
    try { await this.net.leaveRoom(this.code, this.role); } catch { /* 이미 끊김 */ }
  }
}

// 승패: 기준(가치 합/보석 개수) → 미리 감정 성공 → 먼저 그 점수에 닿은 사람
export function judge(me, opp, crit) {
  const key = crit === 'count' ? 'gems' : 'value';
  const a = me || {}, b = opp || {};
  if ((a[key] || 0) !== (b[key] || 0)) return { res: (a[key] || 0) > (b[key] || 0) ? 'win' : 'lose', why: '' };
  if ((a.early || 0) !== (b.early || 0)) return { res: (a.early || 0) > (b.early || 0) ? 'win' : 'lose', why: '점수가 같아서 미리 감정에 더 많이 성공한 사람이 이겼어요.' };
  if ((a[key] || 0) > 0 && (a.scoreAt || 0) !== (b.scoreAt || 0)) return { res: (a.scoreAt || Infinity) < (b.scoreAt || Infinity) ? 'win' : 'lose', why: '점수와 미리 감정이 같아서 그 점수에 먼저 닿은 사람이 이겼어요.' };
  return { res: 'draw', why: '' };
}
