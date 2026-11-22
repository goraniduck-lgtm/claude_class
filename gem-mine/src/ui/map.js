// 광산 지도 (명세서 3절 화면 흐름) + 층 이동 승강기 연출
import { img, meta } from '../assets/loader.js';

const LOCK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="currentColor"/><path d="M8 11V8a4 4 0 0 1 8 0v3" stroke="currentColor" stroke-width="2.5" fill="none"/></svg>';
const CHECK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';

// 지도 그림 위 스테이지 표시 위치 (그림 크기에 대한 비율). assets.json의 ui.map에 rows·cols를 적으면 바뀐다
function layout() {
  const m = meta('ui.map') || {};
  return { rows: m.rows || [0.24, 0.44, 0.64, 0.84], cols: m.cols || [0.38, 0.58, 0.78], label: m.labelX || 0.215 };
}

// progress: { stageIndex, maxIndex }
export function showMap(overlay, { stageData, progress, info, onPick, onBack, sfx }) {
  const L = layout();
  const stages = stageData.stages;
  const cur = progress.stageIndex;
  const max = Math.max(progress.maxIndex || 0, cur);
  overlay.className = 'overlay map-ov';
  const nodes = stages.map((s, i) => {
    const fl = s.floor - 1;
    const col = stages.slice(0, i).filter((x) => x.floor === s.floor).length;
    const x = L.cols[Math.min(col, L.cols.length - 1)], y = L.rows[Math.min(fl, L.rows.length - 1)];
    const st = i < max ? 'done' : i === max ? 'open' : 'locked';
    const isCur = i === cur;
    return `<button class="map-node ${st} ${s.final ? 'final' : ''} ${isCur ? 'cur' : ''}" data-i="${i}" style="left:${x * 100}%;top:${y * 100}%" ${st === 'locked' ? 'disabled' : ''} aria-label="${s.final ? '최후 스테이지' : s.id} ${st === 'done' ? '깸' : st === 'open' ? '열림' : '잠김'}">
      <span class="mn-id">${s.final ? '최후' : s.id}</span>${st === 'done' ? `<i class="mn-ok">${CHECK_SVG}</i>` : st === 'locked' ? `<i class="mn-lock">${LOCK_SVG}</i>` : ''}
    </button>`;
  }).join('');
  const labels = stageData.floors.map((f, k) => `<span class="map-floor" style="left:${L.label * 100}%;top:${L.rows[k] * 100}%">${f.name}</span>`).join('');
  overlay.innerHTML = `<div class="map-wrap">
    <div class="map-head"><h2>광산 지도</h2><div class="map-info">${info}</div><button class="big-btn alt" id="mapBack">처음 화면</button></div>
    <div class="map-box"><canvas id="mapCv" width="1920" height="1200" aria-hidden="true"></canvas>${labels}${nodes}<div class="map-miner" id="mapMiner"></div></div>
    <p class="map-tip">반짝이는 스테이지를 눌러 출발해요. 깬 스테이지는 다시 할 수 있어요.</p>
  </div>`;
  drawMap(overlay.querySelector('#mapCv'));
  const curNode = overlay.querySelector(`.map-node[data-i="${Math.min(cur, max)}"]`);
  const mm = overlay.querySelector('#mapMiner');
  if (curNode) { mm.style.left = curNode.style.left; mm.style.top = curNode.style.top; }
  overlay.querySelectorAll('.map-node:not([disabled])').forEach((b) => b.addEventListener('click', () => { if (sfx) sfx.tap(); onPick(Number(b.dataset.i)); }));
  overlay.querySelector('#mapBack').addEventListener('click', () => { if (sfx) sfx.tap(); onBack(); });
}

// 코드로 그린 광산 단면 지도 (ui.map 그림이 있으면 그 그림)
function drawMap(cv) {
  const g = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const asset = img('ui.map');
  if (asset) { g.drawImage(asset, 0, 0, W, H); return; }
  const L = layout();
  // 하늘과 풀
  const sky = g.createLinearGradient(0, 0, 0, H * 0.12);
  sky.addColorStop(0, '#7cc6f2'); sky.addColorStop(1, '#cdeefc');
  g.fillStyle = sky; g.fillRect(0, 0, W, H * 0.12);
  g.fillStyle = '#7a8f9e';
  g.beginPath(); g.moveTo(W * 0.35, H * 0.12); g.lineTo(W * 0.5, H * 0.02); g.lineTo(W * 0.62, H * 0.12); g.fill();
  g.fillStyle = '#93a6b3';
  g.beginPath(); g.moveTo(W * 0.55, H * 0.12); g.lineTo(W * 0.72, H * 0.04); g.lineTo(W * 0.9, H * 0.12); g.fill();
  // 흙 (깊을수록 어둡게)
  const soil = g.createLinearGradient(0, H * 0.12, 0, H);
  soil.addColorStop(0, '#8a5a30'); soil.addColorStop(0.45, '#5c3a1e'); soil.addColorStop(1, '#2a1a10');
  g.fillStyle = soil; g.fillRect(0, H * 0.12, W, H);
  g.fillStyle = '#5ea83a'; g.fillRect(0, H * 0.11, W, H * 0.025);
  // 돌과 수정
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  for (let k = 0; k < 160; k++) {
    const x = rnd() * W, y = H * 0.15 + rnd() * H * 0.85, r = 6 + rnd() * 18;
    g.fillStyle = `rgba(${120 + rnd() * 60},${100 + rnd() * 40},${80 + rnd() * 30},${0.25 + rnd() * 0.25})`;
    g.beginPath(); g.ellipse(x, y, r, r * 0.7, rnd() * 3, 0, 7); g.fill();
  }
  const crystal = (x, y, s, hue) => {
    g.save(); g.translate(x, y);
    g.shadowColor = `hsl(${hue} 90% 70%)`; g.shadowBlur = 24;
    g.fillStyle = `hsl(${hue} 80% 65%)`;
    for (const [dx, h, w] of [[-s * 0.5, s * 1.4, s * 0.5], [0, s * 2, s * 0.6], [s * 0.55, s * 1.2, s * 0.45]]) {
      g.beginPath(); g.moveTo(dx - w / 2, 0); g.lineTo(dx, -h); g.lineTo(dx + w / 2, 0); g.closePath(); g.fill();
    }
    g.restore();
  };
  [[W * 0.95, H * 0.3, 26, 200], [W * 0.05, H * 0.55, 22, 280], [W * 0.92, H * 0.72, 30, 190], [W * 0.3, H * 0.98, 24, 300], [W * 0.5, H * 0.35, 16, 210]].forEach((c) => crystal(...c));
  // 갱도
  const tunnelH = H * 0.11;
  const x0 = W * 0.13, x1 = W * 0.93;
  L.rows.forEach((ry, k) => {
    const cy = H * ry;
    g.fillStyle = '#1d120a';
    g.beginPath(); g.roundRect(x0, cy - tunnelH * 0.62, x1 - x0, tunnelH, 30); g.fill();
    const fl = g.createLinearGradient(0, cy - tunnelH * 0.62, 0, cy + tunnelH * 0.38);
    fl.addColorStop(0, '#3a2414'); fl.addColorStop(1, '#4d311b');
    g.fillStyle = fl; g.beginPath(); g.roundRect(x0 + 6, cy - tunnelH * 0.56, x1 - x0 - 12, tunnelH - 12, 24); g.fill();
    // 레일
    g.strokeStyle = '#6b4423'; g.lineWidth = 8;
    for (let x = x0 + 30; x < x1 - 20; x += 34) { g.beginPath(); g.moveTo(x, cy + tunnelH * 0.26); g.lineTo(x + 14, cy + tunnelH * 0.26); g.stroke(); }
    g.strokeStyle = '#9aa0a6'; g.lineWidth = 5;
    g.beginPath(); g.moveTo(x0 + 20, cy + tunnelH * 0.22); g.lineTo(x1 - 20, cy + tunnelH * 0.22); g.stroke();
    // 지지대
    for (let x = x0 + 70; x < x1 - 40; x += 210) {
      g.fillStyle = '#9a6a3a'; g.fillRect(x, cy - tunnelH * 0.6, 16, tunnelH * 0.95);
      g.fillStyle = '#b07a43'; g.fillRect(x - 20, cy - tunnelH * 0.62, 56, 14);
    }
    // 등불 (스테이지 표시 사이)
    const lx = W * (k % 2 ? 0.68 : 0.48);
    g.fillStyle = 'rgba(255,200,90,.16)'; g.beginPath(); g.arc(lx, cy - tunnelH * 0.3, 50, 0, 7); g.fill();
    g.fillStyle = '#ffd34d'; g.beginPath(); g.arc(lx, cy - tunnelH * 0.36, 8, 0, 7); g.fill();
  });
  // 승강기 통로
  const sx = W * 0.075, sw = W * 0.06;
  g.fillStyle = '#1d120a'; g.fillRect(sx, H * 0.08, sw, H * L.rows[L.rows.length - 1] - H * 0.08 + tunnelH * 0.38);
  g.strokeStyle = '#6b4423'; g.lineWidth = 10;
  for (let y = H * 0.1; y < H * 0.9; y += 70) { g.beginPath(); g.moveTo(sx, y); g.lineTo(sx + sw, y + 30); g.stroke(); }
  g.strokeStyle = '#c9a36b'; g.lineWidth = 4;
  g.beginPath(); g.moveTo(sx + sw * 0.35, H * 0.06); g.lineTo(sx + sw * 0.35, H * 0.3); g.moveTo(sx + sw * 0.65, H * 0.06); g.lineTo(sx + sw * 0.65, H * 0.3); g.stroke();
  g.fillStyle = '#8a5a2e'; g.strokeStyle = '#3a2210'; g.lineWidth = 5;
  g.beginPath(); g.roundRect(sx + 8, H * 0.3, sw - 16, 80, 6); g.fill(); g.stroke();
  // 입구
  g.fillStyle = '#2a170a'; g.beginPath(); g.arc(sx + sw / 2, H * 0.115, sw * 0.75, Math.PI, 0); g.fill();
  g.strokeStyle = '#9a6a3a'; g.lineWidth = 14; g.beginPath(); g.arc(sx + sw / 2, H * 0.115, sw * 0.8, Math.PI, 0); g.stroke();
  // 보물 방
  const tx = W * 0.62, ty = H * 0.955;
  const glow = g.createRadialGradient(tx, ty, 10, tx, ty, 180);
  glow.addColorStop(0, 'rgba(255,160,240,.65)'); glow.addColorStop(0.5, 'rgba(140,120,255,.25)'); glow.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = glow; g.fillRect(tx - 200, ty - 200, 400, 300);
  g.fillStyle = '#1d120a'; g.beginPath(); g.ellipse(tx, ty + 10, 150, 46, 0, Math.PI, 0); g.fill();
  const hues = [0, 50, 110, 190, 260, 310];
  hues.forEach((h, i) => { g.fillStyle = `hsl(${h} 90% 65%)`; g.beginPath(); g.moveTo(tx - 40 + i * 16, ty); g.lineTo(tx - 32 + i * 16, ty - 34 - (i % 2) * 12); g.lineTo(tx - 24 + i * 16, ty); g.fill(); });
}

// 승강기를 타고 내려가는 짧은 화면 전환
export function elevatorRide(overlay, { toName, sfx }) {
  return new Promise((resolve) => {
    overlay.className = 'overlay elev-ov';
    overlay.innerHTML = `<div class="elev"><canvas id="elevCv" width="760" height="520" aria-hidden="true"></canvas><div class="elev-text">${toName}으로 내려가요</div></div>`;
    const cv = overlay.querySelector('#elevCv');
    const g = cv.getContext('2d');
    const W = cv.width, H = cv.height;
    const cage = img('cart.elevator');
    const t0 = performance.now(), dur = 1700;
    if (sfx && sfx.elevator) sfx.elevator();
    const frame = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const off = (now - t0) * 0.6;
      g.fillStyle = '#2a1a10'; g.fillRect(0, 0, W, H);
      // 흘러 올라가는 벽
      for (let y = -(off % 120); y < H; y += 120) {
        g.fillStyle = '#3d2716'; g.fillRect(0, y, 170, 60); g.fillRect(W - 170, y + 60, 170, 60);
        g.strokeStyle = '#6b4423'; g.lineWidth = 12; g.beginPath(); g.moveTo(170, y); g.lineTo(170, y + 120); g.moveTo(W - 170, y); g.lineTo(W - 170, y + 120); g.stroke();
      }
      g.fillStyle = 'rgba(0,0,0,.35)'; g.fillRect(170, 0, W - 340, H);
      // 줄과 승강기
      const cx = W / 2, cy = H * 0.52 + Math.sin(now / 90) * 3;
      g.strokeStyle = '#c9a36b'; g.lineWidth = 5;
      g.beginPath(); g.moveTo(cx - 60, 0); g.lineTo(cx - 60, cy - 120); g.moveTo(cx + 60, 0); g.lineTo(cx + 60, cy - 120); g.stroke();
      if (cage) g.drawImage(cage, cx - 140, cy - 140, 280, 280);
      else {
        g.fillStyle = '#8a5a2e'; g.strokeStyle = '#2a160a'; g.lineWidth = 6;
        g.beginPath(); g.roundRect(cx - 130, cy - 120, 260, 230, 10); g.fill(); g.stroke();
        g.fillStyle = '#ffd98a'; g.fillRect(cx - 110, cy - 100, 220, 170);
        g.strokeStyle = '#4a4f55'; g.lineWidth = 6;
        for (let x = cx - 100; x <= cx + 100; x += 40) { g.beginPath(); g.moveTo(x, cy - 100); g.lineTo(x, cy + 70); g.stroke(); }
        g.fillStyle = '#6b4423'; g.fillRect(cx - 130, cy + 70, 260, 40);
        // 광부 머리
        g.fillStyle = '#f2c79b'; g.beginPath(); g.arc(cx, cy - 20, 34, 0, 7); g.fill();
        g.fillStyle = '#ffc12e'; g.beginPath(); g.arc(cx, cy - 32, 37, Math.PI, 0); g.fill(); g.fillRect(cx - 42, cy - 36, 84, 9);
        g.fillStyle = '#2a1a10'; g.beginPath(); g.arc(cx - 11, cy - 16, 4, 0, 7); g.arc(cx + 11, cy - 16, 4, 0, 7); g.fill();
      }
      if (k < 1) requestAnimationFrame(frame);
      else resolve();
    };
    requestAnimationFrame(frame);
  });
}
