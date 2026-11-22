// 아이템 정의와 영향 범위 (명세서 8절). 보석은 아이템으로 망가지지 않는다.
export const ITEMS = {
  row:       { name: '가로 줄 다이너마이트', short: '가로 줄', target: true,  desc: '고른 칸의 가로 한 줄을 모두 부숴요.' },
  col:       { name: '세로 줄 다이너마이트', short: '세로 줄', target: true,  desc: '고른 칸의 세로 한 줄을 모두 부숴요.' },
  bomb:      { name: '3×3 폭탄',            short: '폭탄',    target: true,  desc: '고른 칸을 가운데로 3×3을 부숴요.' },
  radar:     { name: '탐지기',              short: '탐지기',  target: true,  desc: '고른 칸을 가운데로 3×3 안의 보석 칸 수를 알려 줘요. 부수지는 않아요.' },
  hourglass: { name: '모래시계',            short: '모래시계', target: false, desc: '제한 시간이 30초 늘어나요. 광차가 뒤로 밀려요.' },
  drill:     { name: '드릴',                short: '드릴',    target: false, desc: '다음 5번 타격은 바위도 한 번에 부숴요.' },
  // 1대1 대결 전용 방해 아이템 (명세서 14.4)
  dust:      { name: '흙먼지 가리기',        short: '흙먼지',  target: false, battle: true, desc: '상대 판의 3×3을 6초 동안 흙먼지로 가려요. 단서가 안 보여요.' },
  steal:     { name: '곡괭이 슬쩍',          short: '슬쩍',    target: false, battle: true, desc: '상대 곡괭이 1개를 빼앗아 내 것으로 만들어요.' },
  shield:    { name: '방패',                short: '방패',    target: false, battle: true, desc: '다음에 오는 낙석이나 방해 아이템 1번을 막아요.' },
};
export const ITEM_KINDS = Object.keys(ITEMS);

// 영향을 받는 칸 목록
export function itemCells(kind, i, cols, rows) {
  const c = i % cols, r = Math.floor(i / cols);
  const out = [];
  if (kind === 'row') for (let x = 0; x < cols; x++) out.push(r * cols + x);
  else if (kind === 'col') for (let y = 0; y < rows; y++) out.push(y * cols + c);
  else if (kind === 'bomb' || kind === 'radar') {
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const x = c + dx, y = r + dy;
      if (x >= 0 && y >= 0 && x < cols && y < rows) out.push(y * cols + x);
    }
  }
  return out;
}
