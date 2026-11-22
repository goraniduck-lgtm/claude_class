// 시간 = 레일 위 광차. 왼쪽 갱도에서 출발해 오른쪽 출구에 닿으면 시간 끝.
import { img } from '../assets/loader.js';

export class RailView {
  constructor(canvas) {
    this.canvas = canvas;
    this.g = canvas.getContext('2d');
    this.pr = 2;
    this.resize(2);
    this.gems = [];
    this.pushBack = 0;
  }
  resize(pr) {
    this.pr = Math.max(1, Math.min(2.5, pr));
    this.canvas.width = 760 * this.pr; this.canvas.height = 84 * this.pr;
  }
  draw(t, progress, warn) {
    const g = this.g;
    g.setTransform(this.pr, 0, 0, this.pr, 0, 0);
    g.clearRect(0, 0, 760, 84);
    const x0 = 46, x1 = 650, y = 64;
    // 갱도 입구 (어두움)
    g.fillStyle = '#120a05'; g.beginPath(); g.moveTo(4, 78); g.lineTo(4, 34); g.quadraticCurveTo(26, 12, 48, 34); g.lineTo(48, 78); g.fill();
    // 침목과 레일 (cart.rail 그림이 있으면 가로로 이어 붙인다)
    const railImg = img('cart.rail');
    if (railImg) {
      const rh = 12, rw = Math.round(railImg.width * (rh / railImg.height));
      for (let x = x0; x <= x1 + 40; x += rw - 1) g.drawImage(railImg, x, y - 5, rw, rh);
      if (warn && Math.sin(t * 10) > 0) { g.fillStyle = 'rgba(255,90,60,.45)'; g.fillRect(x0, y - 6, x1 + 50 - x0, 12); }
    } else {
      for (let x = x0; x <= x1 + 40; x += 18) { g.fillStyle = '#5e3a1c'; g.fillRect(x, y + 2, 10, 8); }
      g.strokeStyle = warn && Math.sin(t * 10) > 0 ? '#ff6a4a' : '#9aa3ad'; g.lineWidth = 3;
      g.beginPath(); g.moveTo(x0, y); g.lineTo(x1 + 50, y); g.stroke();
    }
    // 지나온 길 표시
    g.strokeStyle = 'rgba(255,201,60,.65)'; g.lineWidth = 3;
    const cx = x0 + (x1 - x0) * Math.min(1, progress);
    g.beginPath(); g.moveTo(x0, y - 3); g.lineTo(cx, y - 3); g.stroke();
    // 출구 터널 (햇빛)
    const exitImg = img('cart.exit');
    if (exitImg) g.drawImage(exitImg, x1 + 12, 6, 114, 76);
    else {
      const sun = g.createRadialGradient(x1 + 70, 50, 4, x1 + 70, 50, 50);
      sun.addColorStop(0, '#fffbe0'); sun.addColorStop(0.5, '#ffe58a'); sun.addColorStop(1, 'rgba(255,220,120,0)');
      g.fillStyle = sun; g.fillRect(x1 + 10, 0, 110, 84);
      g.strokeStyle = '#7a4e28'; g.lineWidth = 8;
      g.beginPath(); g.moveTo(x1 + 36, 78); g.lineTo(x1 + 36, 34); g.quadraticCurveTo(x1 + 70, 4, x1 + 104, 34); g.lineTo(x1 + 104, 78); g.stroke();
    }
    // 광차
    const shake = warn ? Math.sin(t * 40) * 1.2 : 0;
    g.save(); g.translate(cx, y - 4 + shake);
    const cartImg = img('cart.body');
    if (cartImg) {
      // 미니 광부가 광차 뒤에 타고, 캔 보석이 위로 쌓인다
      const mini = img('cart.miner_mini');
      if (mini) g.drawImage(mini, -4, -62, 38, 38);
      this.gems.slice(-6).forEach((col, i) => {
        g.fillStyle = col; g.strokeStyle = 'rgba(0,0,0,.5)'; g.lineWidth = 1;
        g.beginPath(); g.moveTo(-24 + i * 7, -30); g.lineTo(-18 + i * 7, -40); g.lineTo(-12 + i * 7, -30); g.closePath(); g.fill(); g.stroke();
      });
      g.drawImage(cartImg, -32, -40, 64, 45);
    } else {
      // 실린 보석
      this.gems.slice(-6).forEach((col, i) => {
        g.fillStyle = col; g.beginPath(); g.moveTo(-18 + i * 7, -26); g.lineTo(-12 + i * 7, -34); g.lineTo(-6 + i * 7, -26); g.closePath(); g.fill();
      });
      const mini = img('cart.miner_mini');
      if (mini) g.drawImage(mini, -14, -50, 28, 28);
      else {
        g.fillStyle = '#f2c79b'; g.beginPath(); g.arc(12, -32, 8, 0, 7); g.fill();
        g.fillStyle = '#ffc12e'; g.beginPath(); g.arc(12, -35, 9, Math.PI, 0); g.fill();
        g.fillStyle = '#2a1a10'; g.beginPath(); g.arc(15, -31, 1.6, 0, 7); g.fill();
      }
      g.fillStyle = '#6b4423'; g.strokeStyle = '#2e1b0e'; g.lineWidth = 2;
      g.beginPath(); g.moveTo(-26, -26); g.lineTo(26, -26); g.lineTo(20, -6); g.lineTo(-20, -6); g.closePath(); g.fill(); g.stroke();
      g.fillStyle = '#8f949a'; g.fillRect(-25, -20, 50, 3);
      g.fillStyle = '#2a2a2e';
      g.beginPath(); g.arc(-12, -3, 5, 0, 7); g.arc(12, -3, 5, 0, 7); g.fill();
    }
    g.restore();
  }
}
