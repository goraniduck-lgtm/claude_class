// 효과음 (배경음악 없음). 소리 파일 없이 WebAudio로 만든다.
let ctx = null;
let enabled = true;
let master = null;
let noiseBuf = null;

export function initAudio() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume().catch(() => {}); return; }
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0.5; master.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 0.6, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  } catch { ctx = null; }
}
export function setSound(on) { enabled = on; }
export function soundOn() { return enabled; }

function tone(freq, dur, { type = 'sine', vol = 0.3, at = 0, slide = 0 } = {}) {
  if (!ctx || !enabled) return;
  const t0 = ctx.currentTime + at;
  const o = ctx.createOscillator(), gn = ctx.createGain();
  o.type = type; o.frequency.setValueAtTime(freq, t0);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t0 + dur);
  gn.gain.setValueAtTime(0.0001, t0);
  gn.gain.exponentialRampToValueAtTime(vol, t0 + 0.01);
  gn.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  o.connect(gn); gn.connect(master); o.start(t0); o.stop(t0 + dur + 0.05);
}

function noise(dur, { freq = 800, q = 1, vol = 0.4, at = 0, type = 'lowpass' } = {}) {
  if (!ctx || !enabled) return;
  const t0 = ctx.currentTime + at;
  const src = ctx.createBufferSource(); src.buffer = noiseBuf;
  const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
  const gn = ctx.createGain();
  gn.gain.setValueAtTime(vol, t0); gn.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(f); f.connect(gn); gn.connect(master); src.start(t0); src.stop(t0 + dur + 0.05);
}

export const sfx = {
  hitDirt() { noise(0.12, { freq: 500, vol: 0.5 }); tone(110, 0.08, { type: 'triangle', vol: 0.25, slide: -40 }); },
  hitStone() { noise(0.08, { freq: 2500, type: 'bandpass', q: 3, vol: 0.4 }); tone(880 + Math.random() * 200, 0.12, { type: 'square', vol: 0.08 }); },
  break(type) {
    noise(0.35, { freq: type === 'dirt' ? 600 : 1400, vol: 0.55 });
    tone(type === 'rock' ? 70 : 90, 0.2, { type: 'triangle', vol: 0.35, slide: -30 });
  },
  reveal() { tone(1318, 0.18, { vol: 0.2 }); tone(1760, 0.3, { vol: 0.18, at: 0.08 }); },
  gem() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.22, { type: 'triangle', vol: 0.22, at: i * 0.07 })); },
  dimGem() { tone(523, 0.2, { type: 'triangle', vol: 0.2 }); tone(440, 0.3, { type: 'triangle', vol: 0.18, at: 0.12 }); },
  correct() { tone(988, 0.12, { type: 'triangle', vol: 0.25 }); tone(1319, 0.22, { type: 'triangle', vol: 0.25, at: 0.1 }); },
  wrong() { tone(220, 0.25, { type: 'sawtooth', vol: 0.12, slide: -60 }); },
  combo(lv) { [523, 659, 784, 1047].slice(0, lv + 1).forEach((f, i) => tone(f * 1.5, 0.15, { type: 'square', vol: 0.08, at: i * 0.06 })); },
  comboBreak() { tone(330, 0.1, { type: 'square', vol: 0.08 }); tone(247, 0.18, { type: 'square', vol: 0.08, at: 0.08 }); },
  appraiseOk() { [659, 784, 988, 1319, 1568].forEach((f, i) => tone(f, 0.2, { type: 'triangle', vol: 0.22, at: i * 0.06 })); },
  appraiseBad() { tone(196, 0.3, { type: 'sawtooth', vol: 0.12 }); tone(156, 0.4, { type: 'sawtooth', vol: 0.12, at: 0.15 }); },
  clear() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, i === 5 ? 0.6 : 0.16, { type: 'triangle', vol: 0.25, at: i * 0.12 })); },
  fail() { [392, 349, 311, 262].forEach((f, i) => tone(f, 0.3, { type: 'triangle', vol: 0.2, at: i * 0.18 })); },
  tick() { tone(1500, 0.04, { type: 'square', vol: 0.05 }); },
  board() { noise(0.4, { freq: 300, vol: 0.5 }); tone(60, 0.3, { type: 'sine', vol: 0.4, slide: -20 }); },
  tap() { tone(660, 0.05, { type: 'triangle', vol: 0.1 }); },
  pick() { tone(1046, 0.06, { type: 'square', vol: 0.06 }); },
  boom(big) { noise(big ? 0.7 : 0.45, { freq: big ? 220 : 380, vol: 0.7 }); tone(70, big ? 0.5 : 0.3, { type: 'sine', vol: 0.5, slide: -40 }); },
  radar() { [0, 0.18, 0.36].forEach((at) => tone(1320, 0.09, { type: 'sine', vol: 0.18, at })); },
  itemGet() { [880, 1175, 1568].forEach((f, i) => tone(f, 0.14, { type: 'triangle', vol: 0.2, at: i * 0.06 })); },
  drill() { noise(0.18, { freq: 3000, type: 'bandpass', q: 6, vol: 0.35 }); tone(180, 0.18, { type: 'sawtooth', vol: 0.06, slide: 60 }); },
  elevator() { tone(110, 1.4, { type: 'sawtooth', vol: 0.05, slide: -30 }); noise(1.2, { freq: 180, vol: 0.18 }); [0.2, 0.7, 1.2].forEach((at) => tone(600, 0.05, { type: 'square', vol: 0.05, at })); },
};
