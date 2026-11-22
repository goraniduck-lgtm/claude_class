// 아이템 아이콘. assets.json에 item.* 이미지가 있으면 그 그림을, 없으면 코드로 그린 임시 그림을 쓴다.
import { img } from '../assets/loader.js';

export function drawItemIcon(canvas, kind) {
  const g = canvas.getContext('2d');
  const S = canvas.width;
  g.clearRect(0, 0, S, S);
  const asset = img(`item.${kind}`);
  if (asset) { g.drawImage(asset, 0, 0, S, S); return; }
  g.save();
  g.scale(S / 100, S / 100);
  g.lineJoin = 'round'; g.lineCap = 'round';
  const ink = '#2a160a';
  if (kind === 'row' || kind === 'col') {
    g.translate(50, 50);
    if (kind === 'col') g.rotate(Math.PI / 2);
    arrow(g, '#ffd34d', ink);
    // 다이너마이트
    g.fillStyle = '#d93b2b'; g.strokeStyle = ink; g.lineWidth = 4;
    g.beginPath(); g.roundRect(-30, -11, 56, 22, 6); g.fill(); g.stroke();
    g.fillStyle = '#f0e2c4'; g.fillRect(-10, -11, 8, 22); g.strokeRect(-10, -11, 8, 22);
    g.strokeStyle = '#6b4423'; g.lineWidth = 3;
    g.beginPath(); g.moveTo(26, 0); g.quadraticCurveTo(34, -10, 32, -18); g.stroke();
    spark(g, 32, -21);
  } else if (kind === 'bomb') {
    g.fillStyle = '#2b2b33'; g.strokeStyle = ink; g.lineWidth = 4;
    g.beginPath(); g.arc(46, 58, 28, 0, 7); g.fill(); g.stroke();
    g.fillStyle = 'rgba(255,255,255,.35)'; g.beginPath(); g.ellipse(36, 47, 8, 5, -0.6, 0, 7); g.fill();
    g.fillStyle = '#6b6b75'; g.beginPath(); g.roundRect(56, 24, 14, 12, 3); g.fill(); g.stroke();
    g.strokeStyle = '#a07040'; g.lineWidth = 3; g.beginPath(); g.moveTo(66, 26); g.quadraticCurveTo(74, 14, 82, 16); g.stroke();
    spark(g, 84, 14);
  } else if (kind === 'radar') {
    g.fillStyle = '#4a5560'; g.strokeStyle = ink; g.lineWidth = 4;
    g.beginPath(); g.roundRect(22, 14, 56, 74, 12); g.fill(); g.stroke();
    g.fillStyle = '#0f3b25'; g.beginPath(); g.arc(50, 44, 21, 0, 7); g.fill(); g.stroke();
    g.strokeStyle = '#4dff9a'; g.lineWidth = 2.5;
    for (const r of [7, 14]) { g.beginPath(); g.arc(50, 44, r, 0, 7); g.stroke(); }
    g.beginPath(); g.moveTo(50, 44); g.lineTo(65, 34); g.stroke();
    g.fillStyle = '#b6ffd6'; g.beginPath(); g.arc(58, 50, 3, 0, 7); g.fill();
    g.fillStyle = '#ffd34d'; g.beginPath(); g.arc(38, 76, 5, 0, 7); g.fill(); g.fillStyle = '#ff6a4d'; g.beginPath(); g.arc(62, 76, 5, 0, 7); g.fill();
  } else if (kind === 'hourglass') {
    g.fillStyle = '#9a6a3a'; g.strokeStyle = ink; g.lineWidth = 4;
    g.beginPath(); g.roundRect(24, 12, 52, 10, 4); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(24, 78, 52, 10, 4); g.fill(); g.stroke();
    g.fillStyle = 'rgba(220,240,255,.75)';
    g.beginPath(); g.moveTo(30, 22); g.lineTo(70, 22); g.quadraticCurveTo(70, 40, 52, 50); g.quadraticCurveTo(70, 60, 70, 78); g.lineTo(30, 78); g.quadraticCurveTo(30, 60, 48, 50); g.quadraticCurveTo(30, 40, 30, 22); g.closePath();
    g.fill(); g.stroke();
    g.fillStyle = '#f2b632';
    g.beginPath(); g.moveTo(37, 30); g.lineTo(63, 30); g.quadraticCurveTo(58, 42, 50, 47); g.quadraticCurveTo(42, 42, 37, 30); g.fill();
    g.beginPath(); g.moveTo(34, 76); g.quadraticCurveTo(50, 60, 66, 76); g.closePath(); g.fill();
    g.fillRect(49, 47, 2, 20);
    spark(g, 82, 26, 0.7);
  } else if (kind === 'drill') {
    g.fillStyle = '#e8641f'; g.strokeStyle = ink; g.lineWidth = 4;
    g.beginPath(); g.roundRect(12, 30, 46, 30, 10); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(22, 56, 18, 32, 6); g.fill(); g.stroke();
    g.fillStyle = '#c9d3dc';
    g.beginPath(); g.moveTo(58, 36); g.lineTo(92, 45); g.lineTo(58, 54); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle = '#6b7680'; g.lineWidth = 2.5;
    for (const x of [66, 74, 82]) { g.beginPath(); g.moveTo(x, 38 + (x - 58) * 0.26); g.lineTo(x - 5, 52 - (x - 58) * 0.26); g.stroke(); }
    g.fillStyle = 'rgba(255,255,255,.4)'; g.fillRect(18, 34, 30, 5);
    spark(g, 94, 30, 0.6);
  }
  else if (kind === 'dust') {
    // 흙먼지 구름
    const puff = (x, y, r, c) => { g.fillStyle = c; g.beginPath(); g.arc(x, y, r, 0, 7); g.fill(); g.stroke(); };
    g.strokeStyle = ink; g.lineWidth = 4;
    puff(34, 58, 20, '#b98a5a'); puff(56, 46, 24, '#c99a6a'); puff(70, 64, 18, '#b07e50'); puff(48, 70, 18, '#a87648');
    g.fillStyle = '#7a5434';
    [[30, 30], [78, 30], [84, 82], [20, 84]].forEach(([x, y]) => { g.beginPath(); g.arc(x, y, 4, 0, 7); g.fill(); });
  } else if (kind === 'steal') {
    // 곡괭이를 집어 가는 손
    g.save(); g.translate(52, 46); g.rotate(-0.6);
    g.fillStyle = '#8a5a2b'; g.strokeStyle = ink; g.lineWidth = 4;
    g.beginPath(); g.roundRect(-6, -8, 12, 52, 4); g.fill(); g.stroke();
    g.fillStyle = '#c9d3dc';
    g.beginPath(); g.moveTo(-34, -6); g.quadraticCurveTo(0, -26, 34, -6); g.lineTo(30, 2); g.quadraticCurveTo(0, -12, -30, 2); g.closePath(); g.fill(); g.stroke();
    g.restore();
    g.fillStyle = '#f2c79b'; g.strokeStyle = ink; g.lineWidth = 4;
    g.beginPath(); g.roundRect(46, 58, 40, 26, 12); g.fill(); g.stroke();
    g.beginPath(); g.roundRect(40, 50, 16, 22, 7); g.fill(); g.stroke();
    g.fillStyle = '#7a4fd6'; g.beginPath(); g.roundRect(78, 60, 18, 24, 5); g.fill(); g.stroke();
    spark(g, 22, 22, 0.7);
  } else if (kind === 'shield') {
    g.fillStyle = '#3f7fd8'; g.strokeStyle = ink; g.lineWidth = 4;
    g.beginPath(); g.moveTo(50, 10); g.lineTo(84, 22); g.quadraticCurveTo(84, 66, 50, 90); g.quadraticCurveTo(16, 66, 16, 22); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = '#ffd34d';
    g.beginPath(); g.moveTo(50, 24); g.lineTo(70, 31); g.quadraticCurveTo(70, 60, 50, 76); g.quadraticCurveTo(30, 60, 30, 31); g.closePath(); g.fill();
    g.fillStyle = 'rgba(255,255,255,.45)'; g.beginPath(); g.moveTo(50, 14); g.lineTo(50, 86); g.quadraticCurveTo(20, 64, 20, 25); g.closePath(); g.fill();
  }
  g.restore();
}

function arrow(g, fill, ink) {
  g.fillStyle = fill; g.strokeStyle = ink; g.lineWidth = 3.5;
  g.beginPath();
  g.moveTo(-46, 0); g.lineTo(-32, -16); g.lineTo(-32, -7); g.lineTo(32, -7); g.lineTo(32, -16); g.lineTo(46, 0);
  g.lineTo(32, 16); g.lineTo(32, 7); g.lineTo(-32, 7); g.lineTo(-32, 16); g.closePath();
  g.fill(); g.stroke();
}

function spark(g, x, y, k = 1) {
  g.save(); g.translate(x, y); g.scale(k, k);
  g.fillStyle = '#ffe066'; g.strokeStyle = '#d97706'; g.lineWidth = 2;
  g.beginPath();
  for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2, r = i % 2 ? 4 : 10; g.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
  g.closePath(); g.fill(); g.stroke();
  g.restore();
}
