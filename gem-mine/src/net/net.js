// 1대1 대결 연결 (명세서 14.1)
// 두 판은 각자 기기에서 따로 돌고, 방 정보·점수·공격만 주고받는다.
// - FirebaseNet: 실시간 데이터베이스 (태블릿 두 대)
// - LocalNet: 같은 기기의 두 창(탭)끼리 (Firebase 설정 전 시험용)
import { FIREBASE_CONFIG, DB_ROOT } from './firebase-config.js';

const ROOM_TTL = 2 * 60 * 60 * 1000; // 2시간이 지난 방 코드는 다시 쓴다
const randCode = () => String(1000 + Math.floor(Math.random() * 9000));

export async function createNet() {
  if (FIREBASE_CONFIG && FIREBASE_CONFIG.databaseURL) {
    try { return await FirebaseNet.create(FIREBASE_CONFIG); } catch (e) { console.warn('Firebase 연결 실패, 시험 연결로 바꿈', e); }
    const n = new LocalNet();
    n.fallback = true; // 설정은 있는데 연결이 안 됨 → 다음에 다시 시도
    return n;
  }
  return new LocalNet();
}

// ---------- 같은 기기 시험 연결 ----------
class LocalNet {
  constructor() {
    this.kind = 'local';
    this.listeners = new Set();
    window.addEventListener('storage', (e) => { if (e.key && e.key.startsWith('gmnet.')) this.emit(e.key); });
  }
  now() { return Date.now(); }
  emit(key) { for (const l of this.listeners) l(key); }
  read(k, d = null) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } }
  write(k, v) { localStorage.setItem(k, JSON.stringify(v)); this.emit(k); }
  roomKey(code) { return `gmnet.room.${code}`; }
  playerKey(code, role) { return `gmnet.room.${code}.${role}`; }
  evKey(code) { return `gmnet.ev.${code}`; }

  async createRoom(opts, player) {
    let code;
    for (let k = 0; k < 30; k++) {
      code = randCode();
      const r = this.read(this.roomKey(code));
      if (!r || Date.now() - r.createdAt > ROOM_TTL) break;
    }
    localStorage.removeItem(this.playerKey(code, 'p2'));
    localStorage.removeItem(this.evKey(code));
    this.write(this.roomKey(code), { opts, seed: Math.floor(Math.random() * 2 ** 31), status: 'waiting', createdAt: Date.now(), round: 0 });
    this.write(this.playerKey(code, 'p1'), { ...player, online: true, joinedAt: Date.now() });
    return code;
  }

  async joinRoom(code, player) {
    const r = this.read(this.roomKey(code));
    if (!r || Date.now() - r.createdAt > ROOM_TTL) throw new Error('NO_ROOM');
    const p2 = this.read(this.playerKey(code, 'p2'));
    if (p2 && p2.online) throw new Error('FULL');
    this.write(this.playerKey(code, 'p2'), { ...player, online: true, joinedAt: Date.now() });
    return r;
  }

  snapshot(code) {
    const r = this.read(this.roomKey(code));
    if (!r) return null;
    return { ...r, players: { p1: this.read(this.playerKey(code, 'p1')), p2: this.read(this.playerKey(code, 'p2')) } };
  }

  watchRoom(code, cb) {
    const prefix = this.roomKey(code);
    const l = (key) => { if (key.startsWith(prefix)) cb(this.snapshot(code)); };
    this.listeners.add(l);
    setTimeout(() => cb(this.snapshot(code)), 0);
    return () => this.listeners.delete(l);
  }

  async updateRoom(code, patch) { const r = this.read(this.roomKey(code)); if (r) this.write(this.roomKey(code), { ...r, ...patch }); }
  async updatePlayer(code, role, patch) { const p = this.read(this.playerKey(code, role), {}); this.write(this.playerKey(code, role), { ...p, ...patch }); }

  async sendEvent(code, ev) {
    const arr = this.read(this.evKey(code), []);
    arr.push({ ...ev, at: Date.now(), id: Math.random().toString(36).slice(2) });
    this.write(this.evKey(code), arr.slice(-200));
  }

  watchEvents(code, cb) {
    const key = this.evKey(code);
    const seen = new Set(this.read(key, []).map((e) => e.id));
    const l = (k) => {
      if (k !== key) return;
      for (const e of this.read(key, [])) if (!seen.has(e.id)) { seen.add(e.id); cb(e); }
    };
    this.listeners.add(l);
    return () => this.listeners.delete(l);
  }

  async leaveRoom(code, role) {
    await this.updatePlayer(code, role, { online: false });
    if (role === 'p1') localStorage.removeItem(this.roomKey(code));
  }
}

// ---------- Firebase 실시간 데이터베이스 ----------
const FB_VER = '10.12.2';
class FirebaseNet {
  static async create(config) {
    const appMod = await import(`https://www.gstatic.com/firebasejs/${FB_VER}/firebase-app.js`);
    const db = await import(`https://www.gstatic.com/firebasejs/${FB_VER}/firebase-database.js`);
    const net = new FirebaseNet();
    net.kind = 'firebase';
    net.m = db;
    const app = appMod.initializeApp(config, 'gemMine');
    net.db = db.getDatabase(app);
    net.offset = 0;
    db.onValue(db.ref(net.db, '.info/serverTimeOffset'), (s) => { net.offset = s.val() || 0; });
    // 연결 확인 (5초 안에 안 되면 실패)
    await new Promise((resolve, reject) => {
      const t = setTimeout(() => reject(new Error('timeout')), 5000);
      db.onValue(db.ref(net.db, '.info/connected'), (s) => { if (s.val() === true) { clearTimeout(t); resolve(); } });
    });
    return net;
  }
  now() { return Date.now() + this.offset; }
  r(path) { return this.m.ref(this.db, `${DB_ROOT}/${path}`); }

  async createRoom(opts, player) {
    const { runTransaction, set, onDisconnect, remove } = this.m;
    for (let k = 0; k < 20; k++) {
      const code = randCode();
      const now = this.now();
      const res = await runTransaction(this.r(`rooms/${code}`), (cur) => {
        if (cur && now - (cur.createdAt || 0) < ROOM_TTL) return undefined; // 쓰는 중인 코드
        return { opts, seed: Math.floor(Math.random() * 2 ** 31), status: 'waiting', createdAt: now, round: 0, players: { p1: { ...player, online: true, joinedAt: now } } };
      });
      if (res.committed) {
        await remove(this.r(`events/${code}`));
        onDisconnect(this.r(`rooms/${code}/players/p1/online`)).set(false);
        await set(this.r(`rooms/${code}/players/p1/online`), true);
        return code;
      }
    }
    throw new Error('NO_CODE');
  }

  async joinRoom(code, player) {
    const { get, runTransaction, onDisconnect } = this.m;
    const snap = await get(this.r(`rooms/${code}`));
    const room = snap.val();
    if (!room || this.now() - (room.createdAt || 0) > ROOM_TTL) throw new Error('NO_ROOM');
    const res = await runTransaction(this.r(`rooms/${code}/players/p2`), (cur) => {
      if (cur && cur.online) return undefined;
      return { ...player, online: true, joinedAt: this.now() };
    });
    if (!res.committed) throw new Error('FULL');
    onDisconnect(this.r(`rooms/${code}/players/p2/online`)).set(false);
    return room;
  }

  watchRoom(code, cb) { return this.m.onValue(this.r(`rooms/${code}`), (s) => cb(s.val())); }
  async updateRoom(code, patch) { await this.m.update(this.r(`rooms/${code}`), patch); }
  async updatePlayer(code, role, patch) { await this.m.update(this.r(`rooms/${code}/players/${role}`), patch); }
  async sendEvent(code, ev) { await this.m.push(this.r(`events/${code}`), { ...ev, at: this.m.serverTimestamp() }); }

  watchEvents(code, cb) {
    const { get, onChildAdded } = this.m;
    const ref = this.r(`events/${code}`);
    let off = () => {};
    let stopped = false;
    get(ref).then((snap) => {
      if (stopped) return;
      const seen = new Set();
      snap.forEach((c) => { seen.add(c.key); });
      off = onChildAdded(ref, (c) => { if (!seen.has(c.key)) cb(c.val()); });
    });
    return () => { stopped = true; off(); };
  }

  async leaveRoom(code, role) {
    const { update, remove, get } = this.m;
    await update(this.r(`rooms/${code}/players/${role}`), { online: false });
    const snap = await get(this.r(`rooms/${code}/players`));
    const ps = snap.val() || {};
    if (!Object.values(ps).some((p) => p && p.online)) { await remove(this.r(`rooms/${code}`)); await remove(this.r(`events/${code}`)); }
  }
}
