// 무대 위에 뜨는 글자·날아가는 아이콘·흔들림
const layer = () => document.getElementById('fx');
let stageEl = null, scale = 1;

export function setStage(el, s) { stageEl = el; scale = s; }
export function toStage(x, y) {
  const r = stageEl.getBoundingClientRect();
  return { x: (x - r.left) / scale, y: (y - r.top) / scale };
}
export function centerOf(el) {
  const r = el.getBoundingClientRect();
  return toStage(r.left + r.width / 2, r.top + r.height / 2);
}

export function floatText(text, p, cls = '') {
  const d = document.createElement('div');
  d.className = 'float ' + cls;
  d.innerHTML = text;
  d.style.left = p.x + 'px'; d.style.top = p.y + 'px';
  layer().appendChild(d);
  setTimeout(() => d.remove(), 1100);
}

export function banner(text, ms = 1600) {
  const d = document.createElement('div');
  d.className = 'banner';
  d.textContent = text;
  layer().appendChild(d);
  setTimeout(() => d.remove(), ms);
}

export function countdown(n) {
  const d = document.createElement('div');
  d.className = 'countdown';
  d.textContent = n;
  layer().appendChild(d);
  setTimeout(() => d.remove(), 1000);
}

// from, to: 무대 좌표. html: 날아갈 모양
export function fly(html, from, to, { dur = 600, size = 40, delay = 0 } = {}) {
  return new Promise((resolve) => {
    const d = document.createElement('div');
    d.className = 'fly';
    d.style.width = d.style.height = size + 'px';
    d.style.margin = `${-size / 2}px 0 0 ${-size / 2}px`;
    d.innerHTML = html;
    d.style.left = from.x + 'px'; d.style.top = from.y + 'px';
    d.style.opacity = '0';
    layer().appendChild(d);
    const dx = to.x - from.x, dy = to.y - from.y;
    const anim = d.animate([
      { transform: 'translate(0,0) scale(.6)', opacity: 1 },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 80}px) scale(1.2)`, opacity: 1, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(.8)`, opacity: 1 },
    ], { duration: dur, delay, easing: 'ease-in-out', fill: 'forwards' });
    anim.onfinish = () => { d.remove(); resolve(); };
  });
}

export function shake(el, amp = 6, dur = 220) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const frames = [];
  for (let i = 0; i < 6; i++) frames.push({ transform: `translate(${(Math.random() - 0.5) * amp * 2}px, ${(Math.random() - 0.5) * amp * 2}px)` });
  frames.push({ transform: 'translate(0,0)' });
  el.animate(frames, { duration: dur, easing: 'linear' });
}

export const PICK_SVG = '<svg viewBox="0 0 48 48" width="100%" height="100%"><use href="#pickaxe"/></svg>';
