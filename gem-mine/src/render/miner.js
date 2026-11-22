// 광부 (파츠 애니메이션: 몸 + 곡괭이 든 팔을 코드가 돌린다). 콤보 단계마다 곡괭이와 동작이 바뀐다.
import { img, meta } from '../assets/loader.js';

const PICK = [
  { head: '#9aa0a6', edge: '#5d636a', name: '나무' },
  { head: '#c9d3dc', edge: '#6b7680', name: '철' },
  { head: '#ff8a3c', edge: '#c2410c', name: '불꽃' },
  { head: '#ffd84a', edge: '#b8860b', name: '황금' },
];

export class MinerView {
  constructor(canvas) {
    this.canvas = canvas;
    this.g = canvas.getContext('2d');
    this.level = 0;
    this.swingAt = -1e9;
    this.mood = null; // {type, at}
    this.flames = [];
    this.pr = 2;
    this.resize(2);
  }
  resize(pr) {
    this.pr = Math.max(1, Math.min(2.5, pr));
    this.canvas.width = 200 * this.pr; this.canvas.height = 270 * this.pr;
  }
  swing() { this.swingAt = performance.now(); }
  setMood(type) { this.mood = { type, at: performance.now() }; }

  draw(t) {
    const { g } = this;
    const now = performance.now();
    g.setTransform(this.pr, 0, 0, this.pr, 0, 0);
    g.clearRect(0, 0, 200, 270);
    const lv = this.level;
    const speed = [1, 1.35, 1.7, 2.1][lv];
    const dur = 360 / speed;
    const st = (now - this.swingAt) / dur;
    let arm; // 팔 각도 (0 = 앞으로 수평)
    if (st < 0.35) arm = lerp(-0.4, -2.3, ease(st / 0.35));
    else if (st < 0.6) arm = lerp(-2.3, 0.75, ease((st - 0.35) / 0.25));
    else if (st < 1) arm = lerp(0.75, -0.4, ease((st - 0.6) / 0.4));
    else arm = -0.4 + Math.sin(t * 2 * speed) * 0.08;
    const bob = Math.sin(t * 3 * speed) * 2;
    let lean = st < 1 && st > 0.35 ? 0.08 : 0;
    let drop = 0;
    const mood = this.mood && now - this.mood.at < 900 ? this.mood.type : null;
    if (mood === 'oops') { arm = 1.2; drop = Math.min(1, (now - this.mood.at) / 500); }
    if (mood === 'scratch') { arm = -2.6 + Math.sin(t * 20) * 0.15; }
    let jump = 0;
    if (mood === 'cheer') { jump = -Math.abs(Math.sin(((now - this.mood.at) / 900) * Math.PI * 2)) * 14; arm = -2.4; }

    // 오라
    if (lv >= 3) {
      const gr = g.createRadialGradient(100, 150, 10, 100, 150, 110);
      gr.addColorStop(0, `rgba(255,220,80,${0.35 + 0.1 * Math.sin(t * 6)})`); gr.addColorStop(1, 'rgba(255,200,40,0)');
      g.fillStyle = gr; g.fillRect(0, 0, 200, 270);
    }
    // 바닥 그림자
    g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(95, 258, 52, 9, 0, 0, 7); g.fill();

    g.save();
    g.translate(-16, bob + jump);
    const bodyImg = img('miner.body');
    const shoulder = [112, 128];
    let armK = 100 / 256;
    if (bodyImg) {
      // 그림 비율을 지키며 발이 그림자 위에 오게 놓는다
      const m = meta('miner.body') || {};
      const w = m.w || bodyImg.width, h = m.h || bodyImg.height;
      const k = m.scale || 0.72;
      const feet = m.feet || [w / 2, h];
      const dx = 111 - feet[0] * k, dy = 256 - feet[1] * k;
      g.save(); g.translate(111, 256); g.rotate(lean * 0.6); g.translate(-111, -256);
      g.drawImage(bodyImg, dx, dy, w * k, h * k);
      g.restore();
      const at = m.attach || [w * 0.45, h * 0.5];
      shoulder[0] = dx + at[0] * k; shoulder[1] = dy + at[1] * k;
      armK = m.armScale || 0.44;
    } else {
      g.save(); g.translate(95, 190); g.rotate(lean); g.translate(-95, -190);
      // 다리
      g.fillStyle = '#2f4a7a';
      g.fillRect(70, 200, 22, 50); g.fillRect(100, 200, 22, 50);
      g.fillStyle = '#3a2416'; g.beginPath(); g.roundRect(64, 244, 32, 14, 6); g.fill(); g.beginPath(); g.roundRect(98, 244, 32, 14, 6); g.fill();
      // 몸 (멜빵바지)
      g.fillStyle = '#d9752b'; g.beginPath(); g.roundRect(64, 118, 64, 70, 16); g.fill();
      g.fillStyle = '#3566b8'; g.beginPath(); g.roundRect(66, 150, 60, 62, 12); g.fill();
      g.fillRect(74, 120, 8, 34); g.fillRect(110, 120, 8, 34);
      g.fillStyle = '#ffd34d'; g.beginPath(); g.arc(78, 156, 3.5, 0, 7); g.arc(114, 156, 3.5, 0, 7); g.fill();
      // 뒤쪽 팔
      g.fillStyle = '#c9662a'; g.beginPath(); g.roundRect(60, 124, 16, 46, 8); g.fill();
      // 머리
      g.fillStyle = '#f2c79b'; g.beginPath(); g.arc(96, 92, 30, 0, 7); g.fill();
      g.fillStyle = '#2a1a10';
      g.beginPath(); g.arc(106, 92, 3.6, 0, 7); g.fill();
      g.beginPath(); g.arc(90, 92, 3.6, 0, 7); g.fill();
      g.strokeStyle = '#7a3a1a'; g.lineWidth = 3; g.lineCap = 'round';
      g.beginPath();
      if (mood === 'oops' || mood === 'scratch') g.arc(99, 112, 6, Math.PI * 1.15, Math.PI * 1.85);
      else g.arc(99, 103, 8, Math.PI * 0.15, Math.PI * 0.85);
      g.stroke();
      g.fillStyle = 'rgba(230,110,90,.45)'; g.beginPath(); g.arc(115, 102, 5, 0, 7); g.arc(80, 102, 5, 0, 7); g.fill();
      // 헬멧과 램프
      g.fillStyle = '#ffc12e'; g.beginPath(); g.arc(96, 80, 33, Math.PI, 0); g.fill();
      g.fillRect(58, 76, 76, 8);
      g.fillStyle = '#e09a12'; g.fillRect(92, 50, 8, 28);
      g.fillStyle = '#fff6c8'; g.beginPath(); g.arc(122, 70, 7, 0, 7); g.fill();
      g.strokeStyle = '#8a5a12'; g.lineWidth = 2; g.stroke();
      if (lv >= 1) {
        const cone = g.createLinearGradient(122, 70, 190, 90);
        cone.addColorStop(0, 'rgba(255,240,170,.45)'); cone.addColorStop(1, 'rgba(255,240,170,0)');
        g.fillStyle = cone; g.beginPath(); g.moveTo(124, 66); g.lineTo(200, 40); g.lineTo(200, 120); g.lineTo(124, 74); g.closePath(); g.fill();
      }
      // 땀방울 (신남)
      if (lv >= 1 && st < 1.4) {
        g.fillStyle = '#9fd8ff';
        const k = (now % 600) / 600;
        g.beginPath(); g.ellipse(64 - k * 10, 78 + k * 16, 3, 5, 0.3, 0, 7); g.fill();
      }
      g.restore();
    }
    // 앞쪽 팔 + 곡괭이
    const armImg = img(`miner.arm.lv${lv}`);
    g.save();
    g.translate(shoulder[0], shoulder[1]);
    g.rotate(arm);
    if (armImg) {
      const m = meta(`miner.arm.lv${lv}`) || { w: 256, h: 128, pivot: [32, 64] };
      const k = armK;
      if (drop > 0) g.globalAlpha = Math.max(0.25, 1 - drop * 0.6);
      // flipY: 왼팔 그림을 위아래로 뒤집어 앞쪽(오른쪽) 어깨에 맞는 오른팔로 쓴다
      g.rotate(m.rot != null ? m.rot : 0.3); // 그림 팔은 쉬는 자세에서 얼굴을 가리지 않게 조금 내린다
      if (m.flipY) g.scale(1, -1);
      g.drawImage(armImg, -m.pivot[0] * k, -m.pivot[1] * k, m.w * k, m.h * k);
      g.globalAlpha = 1;
    } else {
      g.fillStyle = '#d9752b'; g.beginPath(); g.roundRect(-8, -9, 44, 18, 9); g.fill();
      g.fillStyle = '#f2c79b'; g.beginPath(); g.arc(40, 0, 9, 0, 7); g.fill();
      if (drop < 1) {
        g.save(); g.translate(40, drop * 60); g.rotate(drop * 2);
        drawPick(g, PICK[lv], lv, t);
        g.restore();
      }
    }
    g.restore();
    g.restore();

    // 불꽃 잔상
    if (lv >= 2) {
      if (Math.random() < 0.5) this.flames.push({ x: shoulder[0] - 16 + Math.cos(arm) * 96 + (Math.random() - 0.5) * 10, y: shoulder[1] + bob + Math.sin(arm) * 96, life: 1 });
      for (const f of this.flames) {
        f.y -= 1.2; f.life -= 0.05;
        g.fillStyle = lv >= 3 ? `rgba(255,220,80,${f.life})` : `rgba(255,${120 + f.life * 80},40,${f.life})`;
        g.beginPath(); g.arc(f.x, f.y, 4 * f.life + 1, 0, 7); g.fill();
      }
      this.flames = this.flames.filter((f) => f.life > 0);
    }
  }
}

function drawPick(g, p, lv, t) {
  // 자루
  g.fillStyle = '#8a5a2b'; g.fillRect(-4, -4, 62, 8);
  g.fillStyle = '#c48a4a'; g.fillRect(-4, -4, 62, 3);
  // 머리
  g.save(); g.translate(56, 0);
  if (lv >= 2) { g.shadowColor = p.head; g.shadowBlur = 14 + Math.sin(t * 10) * 4; }
  g.fillStyle = p.head; g.strokeStyle = p.edge; g.lineWidth = 2.5; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(-6, -34); g.quadraticCurveTo(14, -10, 8, 0); g.quadraticCurveTo(14, 10, -6, 34); g.quadraticCurveTo(4, 8, -8, 0); g.quadraticCurveTo(4, -8, -6, -34); g.closePath();
  g.fill(); g.stroke();
  g.restore();
}

function lerp(a, b, k) { return a + (b - a) * k; }
function ease(x) { return 1 - (1 - x) ** 3; }
