// 엔딩 일러스트 3장. ending.* 이미지가 있으면 그 그림을, 없으면 코드로 그린 임시 그림을 쓴다.
// 말풍선 글자는 그림이 아니라 화면(ending.js)이 얹는다.
import { img } from '../assets/loader.js';

export const SCENES = ['home', 'fake', 'again'];

export function drawScene(g, key, W, H, t) {
  const asset = img(`ending.${key}`);
  if (asset) {
    g.drawImage(asset, 0, 0, W, H);
    sparkles(g, W, H, t, key);
    return;
  }
  g.save();
  g.scale(W / 1600, H / 1000);
  if (key === 'home') home(g, t);
  else if (key === 'fake') fake(g, t);
  else again(g, t);
  g.restore();
}

function sparkles(g, W, H, t, key) {
  if (key !== 'home') return;
  for (let i = 0; i < 40; i++) {
    const x = ((i * 137) % 100) / 100 * W, y = ((t * 0.08 + i * 0.071) % 1) * H;
    g.fillStyle = `hsl(${(i * 47) % 360} 90% 65%)`;
    g.fillRect(x, y, 10, 6);
  }
}

// ---------- ① 금의환향 ----------
function home(g, t) {
  const sky = g.createLinearGradient(0, 0, 0, 1000);
  sky.addColorStop(0, '#ffb36b'); sky.addColorStop(0.55, '#ffd9a0'); sky.addColorStop(1, '#fff0c8');
  g.fillStyle = sky; g.fillRect(0, 0, 1600, 1000);
  g.fillStyle = 'rgba(255,240,180,.8)'; g.beginPath(); g.arc(1300, 330, 90, 0, 7); g.fill();
  hills(g, '#b98a6a', 600, 0.6); hills(g, '#8fae5a', 700, 1.1);
  g.fillStyle = '#7da04a'; g.fillRect(0, 760, 1600, 240);
  // 마을 집
  [[120, 640, '#e9c79a', '#c0392b'], [330, 610, '#f2dcb0', '#8e44ad'], [1230, 620, '#efd2a8', '#2e86c1'], [1420, 650, '#e8c49a', '#c0392b']].forEach(([x, y, w, r]) => house(g, x, y, w, r));
  // 사람들
  const cols = ['#e74c3c', '#3498db', '#9b59b6', '#16a085', '#f39c12', '#e67e22', '#2c3e50'];
  for (let i = 0; i < 9; i++) {
    const x = i < 4 ? 240 + i * 110 : 980 + (i - 4) * 110, y = 880 + (i % 2) * 22;
    villager(g, x, y, cols[i % cols.length], t + i);
  }
  // 광부와 슈퍼 보석
  kid(g, 800, 890, 1.35, 'cheer', t);
  rainbowGem(g, 800, 440 + Math.sin(t * 2) * 8, 105, t, false);
  // 꽃가루
  for (let i = 0; i < 70; i++) {
    const x = (i * 211) % 1600, y = ((t * 90 + i * 53) % 1100) - 60;
    g.save(); g.translate(x, y); g.rotate(t * 2 + i);
    g.fillStyle = `hsl(${(i * 47) % 360} 85% 60%)`; g.fillRect(-7, -4, 14, 8);
    g.restore();
  }
}

// ---------- ② 가짜! ----------
function fake(g, t) {
  g.fillStyle = '#6e4a6e'; g.fillRect(0, 0, 1600, 1000);
  g.fillStyle = '#7d5680'; for (let x = 0; x < 1600; x += 80) g.fillRect(x, 0, 40, 700);
  // 선반
  g.fillStyle = '#5a3a1e';
  [260, 420].forEach((y) => { g.fillRect(900, y, 620, 18); });
  for (let i = 0; i < 8; i++) {
    const x = 940 + i * 72, y = i < 4 ? 228 : 388, xx = i < 4 ? x : x - 288;
    g.fillStyle = ['#e0243f', '#16b866', '#2367e8', '#f2c518'][i % 4];
    g.beginPath(); g.moveTo(xx, y + 30); g.lineTo(xx + 16, y); g.lineTo(xx + 32, y + 30); g.closePath(); g.fill();
  }
  // 바닥과 카운터
  g.fillStyle = '#8a5a30'; g.fillRect(0, 700, 1600, 300);
  g.fillStyle = '#6b4423'; g.fillRect(820, 560, 700, 260);
  g.fillStyle = '#9a6a3a'; g.fillRect(800, 540, 740, 40);
  // 감정사
  appraiser(g, 1180, 540, t);
  // 금 간 슈퍼 보석
  rainbowGem(g, 1000, 470, 70, t, true);
  // 털썩 주저앉은 광부
  kid(g, 420, 860, 1.25, 'kneel', t);
  // 땅바닥 충격선
  g.strokeStyle = 'rgba(255,255,255,.7)'; g.lineWidth = 6; g.lineCap = 'round';
  [[300, 880, 250, 900], [540, 880, 600, 900], [330, 830, 270, 810], [520, 830, 580, 805]].forEach(([a, b, c, d]) => { g.beginPath(); g.moveTo(a, b); g.lineTo(c, d); g.stroke(); });
}

// ---------- ③ 다시 광산으로 ----------
function again(g, t) {
  const sky = g.createLinearGradient(0, 0, 0, 1000);
  sky.addColorStop(0, '#8fd0f5'); sky.addColorStop(1, '#e8f7ff');
  g.fillStyle = sky; g.fillRect(0, 0, 1600, 1000);
  g.fillStyle = 'rgba(255,255,230,.9)'; g.beginPath(); g.arc(260, 300, 80, 0, 7); g.fill();
  hills(g, '#9aa9b4', 520, 0.7);
  // 산과 광산 입구
  g.fillStyle = '#8a6a4a';
  g.beginPath(); g.moveTo(820, 1000); g.lineTo(1250, 330); g.lineTo(1650, 640); g.lineTo(1650, 1000); g.closePath(); g.fill();
  g.fillStyle = '#2a170a'; g.beginPath(); g.moveTo(1180, 760); g.lineTo(1180, 640); g.quadraticCurveTo(1270, 560, 1360, 640); g.lineTo(1360, 760); g.closePath(); g.fill();
  g.strokeStyle = '#b07a43'; g.lineWidth = 22;
  g.beginPath(); g.moveTo(1180, 770); g.lineTo(1180, 630); g.lineTo(1360, 630); g.lineTo(1360, 770); g.stroke();
  g.fillStyle = '#7da04a'; g.fillRect(0, 760, 1600, 240);
  // 길
  g.fillStyle = '#d9b98a';
  g.beginPath(); g.moveTo(0, 1000); g.quadraticCurveTo(500, 860, 760, 900); g.quadraticCurveTo(1050, 940, 1270, 765); g.lineTo(1300, 765); g.quadraticCurveTo(1120, 960, 800, 980); g.quadraticCurveTo(400, 1000, 200, 1000); g.closePath(); g.fill();
  // 걸어가는 광부
  const step = t * 0.04 % 1;
  kid(g, 640 + step * 30, 925, 1.2, 'walk', t);
  // 새
  g.strokeStyle = '#3a2a20'; g.lineWidth = 5;
  for (let i = 0; i < 3; i++) { const x = 500 + i * 70 + Math.sin(t + i) * 10, y = 220 + i * 26; g.beginPath(); g.moveTo(x - 18, y); g.quadraticCurveTo(x - 8, y - 12, x, y); g.quadraticCurveTo(x + 8, y - 12, x + 18, y); g.stroke(); }
}

// ---------- 그림 조각 ----------
function hills(g, color, y, k) {
  g.fillStyle = color;
  g.beginPath(); g.moveTo(0, 1000); g.lineTo(0, y);
  for (let x = 0; x <= 1600; x += 100) g.lineTo(x, y - Math.sin(x * 0.004 * k + k) * 70 - 30);
  g.lineTo(1600, 1000); g.closePath(); g.fill();
}

function house(g, x, y, wall, roof) {
  g.fillStyle = wall; g.fillRect(x - 80, y, 160, 140);
  g.fillStyle = roof; g.beginPath(); g.moveTo(x - 100, y + 4); g.lineTo(x, y - 80); g.lineTo(x + 100, y + 4); g.closePath(); g.fill();
  g.fillStyle = '#6b4423'; g.fillRect(x - 20, y + 70, 40, 70);
  g.fillStyle = '#9fd8ff'; g.fillRect(x + 30, y + 30, 32, 28); g.fillRect(x - 62, y + 30, 32, 28);
}

function villager(g, x, y, color, t) {
  const wave = Math.sin(t * 6) * 0.4;
  g.fillStyle = color; g.beginPath(); g.roundRect(x - 26, y - 110, 52, 90, 20); g.fill();
  g.fillStyle = '#3a2a20'; g.fillRect(x - 20, y - 26, 14, 30); g.fillRect(x + 6, y - 26, 14, 30);
  g.fillStyle = '#f2c79b'; g.beginPath(); g.arc(x, y - 136, 28, 0, 7); g.fill();
  g.fillStyle = '#3a2a20'; g.beginPath(); g.arc(x - 9, y - 138, 3.5, 0, 7); g.arc(x + 9, y - 138, 3.5, 0, 7); g.fill();
  g.strokeStyle = '#7a3a1a'; g.lineWidth = 3; g.beginPath(); g.arc(x, y - 128, 9, 0.1, Math.PI - 0.1); g.stroke();
  g.strokeStyle = color; g.lineWidth = 14; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 22, y - 96); g.lineTo(x - 52, y - 150 + wave * 20); g.moveTo(x + 22, y - 96); g.lineTo(x + 52, y - 150 - wave * 20); g.stroke();
}

function appraiser(g, x, y, t) {
  g.fillStyle = '#4a2a5a'; g.beginPath(); g.roundRect(x - 80, y - 170, 160, 190, 40); g.fill();
  g.fillStyle = '#f2c79b'; g.beginPath(); g.arc(x, y - 230, 62, 0, 7); g.fill();
  g.fillStyle = '#ffffff';
  g.beginPath(); g.moveTo(x - 55, y - 215); g.quadraticCurveTo(x, y - 110, x + 55, y - 215); g.quadraticCurveTo(x, y - 180, x - 55, y - 215); g.fill();
  g.fillStyle = '#e8e8e8'; g.beginPath(); g.arc(x - 58, y - 252, 18, 0, 7); g.arc(x + 58, y - 252, 18, 0, 7); g.fill();
  // 눈과 돋보기
  g.fillStyle = '#2a1a10'; g.beginPath(); g.arc(x + 20, y - 242, 6, 0, 7); g.fill();
  g.strokeStyle = '#2a1a10'; g.lineWidth = 6; g.beginPath(); g.moveTo(x + 6, y - 262); g.lineTo(x + 36, y - 256); g.stroke();
  g.fillStyle = 'rgba(200,230,255,.6)'; g.strokeStyle = '#c9a23a'; g.lineWidth = 8;
  g.beginPath(); g.arc(x - 26, y - 242, 26, 0, 7); g.fill(); g.stroke();
  g.fillStyle = '#2a1a10'; g.beginPath(); g.arc(x - 26, y - 242, 9 + Math.sin(t * 3) * 1.5, 0, 7); g.fill();
  // 팔
  g.strokeStyle = '#4a2a5a'; g.lineWidth = 26; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - 60, y - 120); g.lineTo(x - 140, y - 70); g.stroke();
  g.fillStyle = '#f2c79b'; g.beginPath(); g.arc(x - 146, y - 66, 16, 0, 7); g.fill();
}

function rainbowGem(g, cx, cy, r, t, cracked) {
  const pts = [];
  for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 3; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); }
  const path = () => { g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.closePath(); };
  g.save();
  if (!cracked) { g.shadowColor = '#ff9af0'; g.shadowBlur = 50; }
  const gr = g.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  [0, 50, 110, 190, 260, 320].forEach((h, i) => gr.addColorStop(i / 5, `hsl(${(h + t * 60) % 360} 90% 64%)`));
  path(); g.fillStyle = gr; g.fill();
  g.shadowBlur = 0;
  g.lineWidth = r * 0.07; g.strokeStyle = '#fff'; g.stroke();
  g.fillStyle = 'rgba(255,255,255,.3)';
  g.beginPath(); pts.forEach((p, i) => { const q = [cx + (p[0] - cx) * 0.55, cy + (p[1] - cy) * 0.55]; if (i) g.lineTo(...q); else g.moveTo(...q); }); g.closePath(); g.fill();
  if (cracked) {
    // 금 사이로 보이는 회색 유리
    g.fillStyle = '#9aa3a8';
    g.beginPath(); g.moveTo(cx - r * 0.1, cy - r * 0.9); g.lineTo(cx + r * 0.2, cy - r * 0.2); g.lineTo(cx - r * 0.05, cy + r * 0.25); g.lineTo(cx + r * 0.25, cy + r * 0.9); g.lineTo(cx - r * 0.2, cy + r * 0.3); g.lineTo(cx + r * 0.02, cy - r * 0.2); g.closePath(); g.fill();
    g.strokeStyle = '#2a1a10'; g.lineWidth = 4; g.stroke();
  }
  g.restore();
}

// 광부 아이 (pose: cheer 두 팔 들기 / kneel 털썩 / walk 곡괭이 메고 걷기)
function kid(g, x, y, s, pose, t) {
  g.save();
  g.translate(x, y); g.scale(s, s);
  const skin = '#f2c79b', shirt = '#d9752b', overall = '#3566b8', helmet = '#ffc12e', ink = '#2a1a10';
  g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(0, 4, 70, 14, 0, 0, 7); g.fill();
  if (pose === 'kneel') {
    // 무릎 꿇고 고개 숙임
    g.fillStyle = '#2f4a7a'; g.beginPath(); g.roundRect(-50, -40, 100, 40, 14); g.fill();
    g.fillStyle = '#3a2416'; g.beginPath(); g.roundRect(-70, -18, 34, 18, 7); g.fill(); g.beginPath(); g.roundRect(36, -18, 34, 18, 7); g.fill();
    g.save(); g.translate(0, -40); g.rotate(0.35);
    g.fillStyle = shirt; g.beginPath(); g.roundRect(-34, -95, 68, 80, 18); g.fill();
    g.fillStyle = overall; g.beginPath(); g.roundRect(-32, -60, 64, 60, 12); g.fill();
    g.strokeStyle = shirt; g.lineWidth = 18; g.lineCap = 'round';
    g.beginPath(); g.moveTo(-26, -80); g.lineTo(-40, -10); g.moveTo(26, -80); g.lineTo(44, -12); g.stroke();
    g.fillStyle = skin; g.beginPath(); g.arc(0, -125, 34, 0, 7); g.fill();
    g.fillStyle = ink;
    g.fillRect(-16, -122, 10, 3); g.fillRect(6, -122, 10, 3);
    g.fillStyle = '#9fd8ff'; g.beginPath(); g.ellipse(-12, -108 + (t * 40 % 30), 4, 7, 0, 0, 7); g.fill();
    g.strokeStyle = '#7a3a1a'; g.lineWidth = 3; g.beginPath(); g.arc(0, -100, 8, Math.PI * 1.15, Math.PI * 1.85); g.stroke();
    g.fillStyle = helmet; g.beginPath(); g.arc(0, -138, 37, Math.PI, 0); g.fill(); g.fillRect(-42, -141, 84, 9);
    g.restore();
    // 떨어진 곡괭이
    g.save(); g.translate(120, -8); g.rotate(-0.15);
    g.fillStyle = '#8a5a2b'; g.fillRect(-60, -5, 110, 10);
    g.fillStyle = '#9aa0a6'; g.beginPath(); g.moveTo(44, -40); g.quadraticCurveTo(66, -10, 58, 0); g.quadraticCurveTo(66, 10, 44, 40); g.quadraticCurveTo(56, 6, 40, 0); g.quadraticCurveTo(56, -6, 44, -40); g.fill();
    g.restore();
    g.restore();
    return;
  }
  const walk = pose === 'walk';
  const sw = walk ? Math.sin(t * 6) * 0.35 : 0;
  // 다리
  g.fillStyle = '#2f4a7a';
  g.save(); g.translate(-14, -60); g.rotate(sw); g.fillRect(-11, 0, 22, 56); g.fillStyle = '#3a2416'; g.beginPath(); g.roundRect(-14, 50, 32, 14, 6); g.fill(); g.restore();
  g.fillStyle = '#2f4a7a';
  g.save(); g.translate(14, -60); g.rotate(-sw); g.fillRect(-11, 0, 22, 56); g.fillStyle = '#3a2416'; g.beginPath(); g.roundRect(-14, 50, 32, 14, 6); g.fill(); g.restore();
  // 몸
  g.fillStyle = shirt; g.beginPath(); g.roundRect(-34, -140, 68, 78, 18); g.fill();
  g.fillStyle = overall; g.beginPath(); g.roundRect(-32, -110, 64, 56, 12); g.fill();
  g.fillRect(-24, -138, 8, 30); g.fillRect(16, -138, 8, 30);
  g.fillStyle = '#ffd34d'; g.beginPath(); g.arc(-20, -106, 4, 0, 7); g.arc(20, -106, 4, 0, 7); g.fill();
  // 팔
  g.strokeStyle = shirt; g.lineWidth = 18; g.lineCap = 'round';
  if (pose === 'cheer') {
    g.beginPath(); g.moveTo(-28, -128); g.lineTo(-58, -230); g.moveTo(28, -128); g.lineTo(58, -230); g.stroke();
    g.fillStyle = skin; g.beginPath(); g.arc(-60, -238, 12, 0, 7); g.arc(60, -238, 12, 0, 7); g.fill();
  } else {
    g.beginPath(); g.moveTo(-26, -126); g.lineTo(-40 - sw * 30, -70); g.stroke();
    g.beginPath(); g.moveTo(26, -126); g.lineTo(44, -150); g.stroke();
    // 어깨에 멘 곡괭이: 손잡이는 앞쪽 아래, 곡괭이 머리는 머리 뒤쪽 위
    g.save(); g.translate(44, -150); g.rotate(-2.45);
    g.fillStyle = '#8a5a2b'; g.fillRect(-40, -5, 140, 10);
    g.translate(100, 0);
    g.fillStyle = '#c9d3dc'; g.strokeStyle = '#6b7680'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(-6, -42); g.quadraticCurveTo(16, -12, 8, 0); g.quadraticCurveTo(16, 12, -6, 42); g.quadraticCurveTo(6, 8, -8, 0); g.quadraticCurveTo(6, -8, -6, -42); g.closePath(); g.fill(); g.stroke();
    g.restore();
    g.fillStyle = skin; g.beginPath(); g.arc(46, -154, 11, 0, 7); g.fill();
  }
  // 머리
  g.fillStyle = skin; g.beginPath(); g.arc(0, -172, 36, 0, 7); g.fill();
  g.fillStyle = ink; g.beginPath(); g.arc(-12, -172, 4.5, 0, 7); g.arc(14, -172, 4.5, 0, 7); g.fill();
  g.strokeStyle = '#7a3a1a'; g.lineWidth = 4;
  g.beginPath();
  if (pose === 'cheer') { g.fillStyle = '#7a2a1a'; g.arc(2, -156, 11, 0, Math.PI); g.fill(); }
  else { g.arc(2, -160, 10, 0.15 * Math.PI, 0.85 * Math.PI); g.stroke(); }
  g.fillStyle = 'rgba(230,110,90,.45)'; g.beginPath(); g.arc(-24, -160, 6, 0, 7); g.arc(26, -160, 6, 0, 7); g.fill();
  g.fillStyle = helmet; g.beginPath(); g.arc(0, -186, 39, Math.PI, 0); g.fill(); g.fillRect(-46, -190, 92, 10);
  g.fillStyle = '#fff6c8'; g.beginPath(); g.arc(0, -212, 9, 0, 7); g.fill();
  g.restore();
}
