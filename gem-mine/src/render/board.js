// 타일판 캔버스: 바닥 → 잡동사니 → 보석(부순 칸으로만 보임) → 남은 타일 → 경계선 → 돋보기 → 파편
import { CONFIG } from '../config.js';
import { tileTexture, floorTexture, frameCanvas, drawCrack, drawJunk, drawGem } from './textures.js';
import { img } from '../assets/loader.js';

const DEBRIS = {
  dirt: ['#b07a43', '#8f5d2f', '#6a4020'],
  stone: ['#9d9183', '#74695c', '#5e5448'],
  rock: ['#4c4549', '#332d31', '#ffa64a'],
};

export class BoardView {
  constructor(canvas) {
    this.canvas = canvas;
    this.g = canvas.getContext('2d');
    this.particles = [];
    this.hitstopUntil = 0;
    this.pressed = -1;
    this.pr = 2;
  }

  setBoard(board) {
    this.board = board;
    const { cols, rows } = board;
    const cs = Math.floor(Math.min(CONFIG.board.maxW / cols, CONFIG.board.maxH / rows));
    this.cs = cs;
    this.F = CONFIG.board.frame;
    this.W = cols * cs + this.F * 2;
    this.H = rows * cs + this.F * 2;
    this.canvas.style.width = this.W + 'px';
    this.canvas.style.height = this.H + 'px';
    this.canvas.width = Math.round(this.W * this.pr);
    this.canvas.height = Math.round(this.H * this.pr);
    this.particles = [];
    this.drop = { start: performance.now() };
  }

  setPixelRatio(pr) {
    this.pr = Math.max(1, Math.min(2.5, pr));
    if (this.board) this.setBoard(this.board);
  }

  cellAt(clientX, clientY) {
    const r = this.canvas.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * this.W - this.F;
    const y = ((clientY - r.top) / r.height) * this.H - this.F;
    const c = Math.floor(x / this.cs), rr = Math.floor(y / this.cs);
    if (c < 0 || rr < 0 || c >= this.board.cols || rr >= this.board.rows) return -1;
    return rr * this.board.cols + c;
  }

  // 칸 가운데의 위치를 화면 좌표 비율로 (fx 레이어용)
  cellCenterClient(i) {
    const r = this.canvas.getBoundingClientRect();
    const c = i % this.board.cols, rr = Math.floor(i / this.board.cols);
    return {
      x: r.left + ((this.F + (c + 0.5) * this.cs) / this.W) * r.width,
      y: r.top + ((this.F + (rr + 0.5) * this.cs) / this.H) * r.height,
    };
  }

  pointClient(x, y) {
    const r = this.canvas.getBoundingClientRect();
    return { x: r.left + ((this.F + x * this.cs) / this.W) * r.width, y: r.top + ((this.F + y * this.cs) / this.H) * r.height };
  }

  onHit(i, type, broke, damage) {
    const c = i % this.board.cols, r = Math.floor(i / this.board.cols);
    const x = (c + 0.5) * this.cs, y = (r + 0.5) * this.cs;
    const cols = DEBRIS[type];
    const n = broke ? 18 : 6;
    if (broke) this.hitstopUntil = performance.now() + 45;
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2, sp = (broke ? 2.5 : 1.4) + Math.random() * (broke ? 4 : 2);
      this.particles.push({
        x: x + (Math.random() - 0.5) * this.cs * 0.6, y: y + (Math.random() - 0.5) * this.cs * 0.6,
        vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (broke ? 3 : 1.5),
        life: 1, decay: 0.022 + Math.random() * 0.02, size: (broke ? 4 : 2.5) + Math.random() * (broke ? 6 : 3),
        color: cols[Math.floor(Math.random() * cols.length)], kind: 'chunk', rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4,
      });
    }
    if (broke) {
      for (let k = 0; k < 8; k++) {
        this.particles.push({ x, y, vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 1.2, life: 1, decay: 0.03, size: this.cs * (0.2 + Math.random() * 0.25), color: 'rgba(210,180,140,', kind: 'dust' });
      }
    }
    if (type !== 'dirt' && !broke) {
      for (let k = 0; k < 6; k++) {
        const a = Math.random() * Math.PI * 2;
        this.particles.push({ x, y, vx: Math.cos(a) * 5, vy: Math.sin(a) * 5, life: 1, decay: 0.08, size: 2, color: '#ffe08a', kind: 'spark' });
      }
    }
  }

  sparkleAt(i) {
    const c = i % this.board.cols, r = Math.floor(i / this.board.cols);
    for (let k = 0; k < 10; k++) {
      this.particles.push({
        x: (c + Math.random()) * this.cs, y: (r + Math.random()) * this.cs, vx: 0, vy: -0.4 - Math.random() * 0.6,
        life: 1, decay: 0.02 + Math.random() * 0.02, size: 3 + Math.random() * 4, color: '#fffbe0', kind: 'star', rot: Math.random(),
      });
    }
  }

  burst(x, y, color, n = 30) {
    for (let k = 0; k < n; k++) {
      const a = Math.random() * Math.PI * 2, sp = 2 + Math.random() * 6;
      this.particles.push({ x: x * this.cs, y: y * this.cs, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, decay: 0.02 + Math.random() * 0.02, size: 3 + Math.random() * 4, color, kind: 'star', rot: Math.random() });
    }
  }

  draw(t, state) {
    const { g, board, cs, F, pr } = this;
    if (!board) return;
    const now = performance.now();
    const frozen = now < this.hitstopUntil;
    g.setTransform(pr, 0, 0, pr, 0, 0);
    g.clearRect(0, 0, this.W, this.H);
    const innerW = board.cols * cs, innerH = board.rows * cs;

    // 새 판이 위에서 내려오는 연출
    const dropT = Math.min(1, (now - this.drop.start) / 420);
    const dropY = (1 - easeOutBack(dropT)) * -60;
    g.globalAlpha = Math.min(1, dropT * 1.6);
    g.translate(0, dropY);

    g.drawImage(frameCanvas(this.W, this.H, F, pr), 0, 0, this.W, this.H);
    g.save();
    g.translate(F, F);
    g.drawImage(floorTexture(Math.round(innerW * pr), Math.round(innerH * pr)), 0, 0, innerW, innerH);

    // 잡동사니
    for (const j of board.junk) {
      const c = j.i % board.cols, r = Math.floor(j.i / board.cols);
      if (!board.tiles[j.i].broken) continue;
      drawJunk(g, j.type, (c + j.x) * cs, (r + j.y) * cs, cs * j.s * 1.4, j.rot);
    }

    // 보석: 부순 칸으로만 보인다
    g.save();
    g.beginPath();
    let any = false;
    board.tiles.forEach((tl, i) => {
      if (tl.broken) { any = true; g.rect((i % board.cols) * cs, Math.floor(i / board.cols) * cs, cs, cs); }
    });
    if (any) {
      g.clip();
      for (const gem of board.gems) if (!gem.collected && !gem.hidden) drawGem(g, gem, cs, t);
    }
    g.restore();

    // 남은 타일
    board.tiles.forEach((tl, i) => {
      if (tl.broken) return;
      const c = i % board.cols, r = Math.floor(i / board.cols);
      let ox = 0, oy = 0;
      const since = now - tl.hitAt;
      if (tl.hitAt > 0 && since < 160) {
        const k = (1 - since / 160) * 3.5;
        ox = Math.sin(since * 0.25) * k; oy = Math.cos(since * 0.31) * k * 0.6;
      }
      const x = c * cs + ox, y = r * cs + oy;
      const chestImg = tl.chest ? img('tile.chest') : null;
      g.drawImage(chestImg || tileTexture(tl.type, tl.variant, Math.round(cs * pr)), x, y, cs, cs);
      if (tl.chest && !chestImg) {
        // 보물상자 흙: 가끔 금빛이 반짝인다
        const ph = (t * 0.45 + i * 0.37) % 1;
        if (ph < 0.3) {
          const k = Math.sin((ph / 0.3) * Math.PI);
          const sx = x + cs * (0.3 + ((i * 7) % 5) * 0.1), sy = y + cs * (0.3 + ((i * 3) % 4) * 0.12);
          g.globalAlpha = k; star(g, sx, sy, cs * 0.11, '#ffe066'); star(g, sx + cs * 0.2, sy + cs * 0.15, cs * 0.06, '#fff6c8'); g.globalAlpha = 1;
        }
      }
      const dmg = tl.maxHp - tl.hp;
      if (dmg > 0) drawCrack(g, x, y, cs, tl.maxHp - dmg <= 1 && tl.maxHp > 1 ? 2 : 1, i);
      if (i === this.pressed) { g.fillStyle = 'rgba(255,240,180,.22)'; g.fillRect(x, y, cs, cs); }
    });

    // 경계선과 판 칸의 그림자
    g.lineWidth = 2;
    g.strokeStyle = '#2a170a';
    for (let c = 0; c <= board.cols; c++) { g.beginPath(); g.moveTo(c * cs, 0); g.lineTo(c * cs, innerH); g.stroke(); }
    for (let r = 0; r <= board.rows; r++) { g.beginPath(); g.moveTo(0, r * cs); g.lineTo(innerW, r * cs); g.stroke(); }
    board.tiles.forEach((tl, i) => {
      if (!tl.broken) return;
      const x = (i % board.cols) * cs, y = Math.floor(i / board.cols) * cs;
      const gr = g.createLinearGradient(x, y, x, y + cs * 0.22);
      gr.addColorStop(0, 'rgba(0,0,0,.45)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gr; g.fillRect(x, y, cs, cs * 0.22);
      const gl = g.createLinearGradient(x, y, x + cs * 0.16, y);
      gl.addColorStop(0, 'rgba(0,0,0,.3)'); gl.addColorStop(1, 'rgba(0,0,0,0)');
      g.fillStyle = gl; g.fillRect(x, y, cs * 0.16, cs);
    });

    // 탐지기 숫자
    for (const [k, n] of Object.entries(board.radar || {})) {
      const c = k % board.cols, r = Math.floor(k / board.cols);
      const x = (c + 0.5) * cs, y = (r + 0.5) * cs, rad = cs * 0.24;
      g.fillStyle = 'rgba(0,0,0,.4)'; g.beginPath(); g.arc(x + 2, y + 3, rad, 0, 7); g.fill();
      g.fillStyle = n ? '#2f6fd6' : '#5e6a78'; g.strokeStyle = '#e8f3ff'; g.lineWidth = 3;
      g.beginPath(); g.arc(x, y, rad, 0, 7); g.fill(); g.stroke();
      g.fillStyle = '#fff'; g.font = `${Math.round(cs * 0.3)}px 'Black Han Sans', sans-serif`; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText(String(n), x, y + 1);
    }

    // 흙먼지 가리기 (1대1 대결): 단서가 안 보이게 덮는다. 칸은 그대로 부술 수 있다
    if (state.dust && state.dust.cells) {
      const left = Math.max(0, state.dust.until - performance.now());
      const fade = Math.min(1, left / 600);
      for (const k of state.dust.cells) {
        const c = k % board.cols, r = Math.floor(k / board.cols);
        const x = c * cs, y = r * cs;
        g.fillStyle = `rgba(150,108,66,${0.94 * fade})`;
        g.fillRect(x, y, cs, cs);
        for (let j = 0; j < 5; j++) {
          const a = t * 1.5 + j * 1.3 + k;
          g.fillStyle = `rgba(${190 - j * 10},${150 - j * 8},${100 - j * 6},${0.75 * fade})`;
          g.beginPath(); g.arc(x + cs / 2 + Math.cos(a) * cs * 0.25, y + cs / 2 + Math.sin(a * 0.8) * cs * 0.22, cs * (0.22 + j * 0.03), 0, 7); g.fill();
        }
      }
    }

    // 아이템 영향 범위 미리보기
    const pv = state.preview;
    if (pv && pv.cells && pv.cells.length) {
      const radar = pv.kind === 'radar';
      const pulse = 0.28 + 0.1 * Math.sin(t * 6);
      g.fillStyle = radar ? `rgba(80,170,255,${pulse})` : `rgba(255,120,40,${pulse})`;
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const k of pv.cells) {
        const c = k % board.cols, r = Math.floor(k / board.cols);
        g.fillRect(c * cs, r * cs, cs, cs);
        x0 = Math.min(x0, c * cs); y0 = Math.min(y0, r * cs); x1 = Math.max(x1, (c + 1) * cs); y1 = Math.max(y1, (r + 1) * cs);
      }
      g.save();
      g.setLineDash([10, 7]); g.lineDashOffset = -t * 30;
      g.strokeStyle = radar ? '#bfe2ff' : '#ffe066'; g.lineWidth = 4;
      g.strokeRect(x0 + 2, y0 + 2, x1 - x0 - 4, y1 - y0 - 4);
      g.restore();
      if (pv.center >= 0) {
        const c = pv.center % board.cols, r = Math.floor(pv.center / board.cols);
        g.strokeStyle = '#fff'; g.lineWidth = 3; g.strokeRect(c * cs + 5, r * cs + 5, cs - 10, cs - 10);
      }
    }

    // 돋보기
    for (const m of state.magnifiers || []) {
      const c = m.cell % board.cols, r = Math.floor(m.cell / board.cols);
      drawMagnifier(g, (c + 0.78) * cs, (r + 0.24) * cs, cs * 0.17, m.locked, t);
    }
    g.restore();

    // 파편
    g.save();
    g.translate(F, F);
    for (const p of this.particles) {
      if (!frozen) {
        p.x += p.vx; p.y += p.vy;
        if (p.kind === 'chunk') { p.vy += 0.35; p.rot += p.vr; }
        if (p.kind === 'dust') { p.size *= 1.015; }
        if (p.kind === 'spark') { p.vx *= 0.9; p.vy *= 0.9; }
        p.life -= p.decay;
      }
      if (p.life <= 0) continue;
      g.globalAlpha = Math.max(0, p.life);
      if (p.kind === 'chunk') {
        g.save(); g.translate(p.x, p.y); g.rotate(p.rot);
        g.fillStyle = p.color; g.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.75);
        g.restore();
      } else if (p.kind === 'dust') {
        g.fillStyle = p.color + (0.35 * p.life) + ')';
        g.beginPath(); g.arc(p.x, p.y, p.size, 0, 7); g.fill();
      } else if (p.kind === 'spark') {
        g.fillStyle = p.color; g.fillRect(p.x - 1.5, p.y - 1.5, 3, 3);
      } else {
        star(g, p.x, p.y, p.size * (0.6 + 0.4 * Math.sin(t * 8 + p.rot * 10)), p.color);
      }
    }
    g.restore();
    this.particles = this.particles.filter((p) => p.life > 0);
    g.globalAlpha = 1;
  }
}

function easeOutBack(x) { const c1 = 1.4, c3 = c1 + 1; return 1 + c3 * (x - 1) ** 3 + c1 * (x - 1) ** 2; }

function star(g, x, y, s, color) {
  g.fillStyle = color;
  g.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2, r = i % 2 ? s * 0.35 : s;
    g.lineTo(x + Math.cos(a) * r, y + Math.sin(a) * r);
  }
  g.closePath(); g.fill();
}

function drawMagnifier(g, x, y, r, locked, t) {
  const bob = locked ? 0 : Math.sin(t * 4) * r * 0.12;
  g.save();
  g.translate(x, y + bob);
  g.globalAlpha = locked ? 0.55 : 1;
  g.fillStyle = 'rgba(0,0,0,.4)'; g.beginPath(); g.arc(1.5, 2.5, r * 1.25, 0, 7); g.fill();
  g.fillStyle = locked ? '#bba' : '#fff3c4'; g.strokeStyle = '#3a2210'; g.lineWidth = r * 0.28;
  g.beginPath(); g.arc(0, 0, r * 1.15, 0, 7); g.fill(); g.stroke();
  g.strokeStyle = '#3a2210'; g.lineWidth = r * 0.3;
  g.beginPath(); g.arc(-r * 0.12, -r * 0.12, r * 0.55, 0, 7); g.stroke();
  g.beginPath(); g.moveTo(r * 0.28, r * 0.28); g.lineTo(r * 0.72, r * 0.72); g.stroke();
  g.restore();
}
