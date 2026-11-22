// 게임 전체 설정값. 숫자는 시험 플레이 후 조정한다.
export const CONFIG = {
  stageW: 1280,
  stageH: 800,
  board: { cols: 8, rows: 6, maxW: 576, maxH: 432, frame: 24 },
  coverThreshold: 0.25,      // 칸 넓이의 25% 이상 겹치면 보석 칸
  revealThreshold: 0.02,     // 부순 칸에 이만큼 보이면 '발견됨'
  gemGap: 0.3,               // 보석끼리 띄우는 거리(칸)
  gemsPerBoard: [3, 4],
  fakeChance: 0.6,
  cellsMin: 3,
  cellsMax: 9,
  tileHp: { dirt: 1, stone: 2, rock: 3 },
  startPickaxes: 5,
  reward: { 1: 1, 2: 2, 3: 3 }, // 문제 난이도별 곡괭이
  retryReward: 1,
  comboBonus: 1,             // 콤보 보너스 곡괭이
  comboBonusFrom: 2,         // 콤보 2단계(불꽃)부터 보너스
  comboLevels: [0, 3, 5, 8], // 단계가 시작되는 연속 정답 수
  wrongLock: 3000,           // 첫 오답 잠김(ms)
  skipWait: 5000,
  earlyPenalty: 2,           // 미리 감정 오답 시 잃는 곡괭이
  earlyBonusPerCell: 10,
  diagBonus: 20,             // 보석 보너스 문제(대각선 수·이유·사각형 대각선) 점수
  stageClearPickaxes: 2,
  floorClearPickaxes: 3,
  swapCost: 3,               // 판 바꾸기 비용
  timeBonusPerSec: 1,
  defaultLesson: 8,          // 문제 범위: 2, 3, 4, 6, 8(단원 전체)
  // 아이템 (명세서 8절)
  itemSlots: 3,
  comboItems: { 3: 'line', 6: 'bomb', 10: 'radar' }, // 이 콤보에 닿으면 주는 아이템 (line = 가로/세로 줄 중 하나)
  comboItemEvery: 5,         // 10콤보 뒤로는 5콤보마다 무작위 아이템
  comboItemChance: 0.08,     // 콤보 2단계부터 정답마다 아이템이 나올 확률
  chestChance: 0.6,          // 판마다 보물상자 흙이 1개 묻혀 있을 확률
  hourglassSec: 30,
  drillHits: 5,
  // 무한 도전 (명세서 9.6)
  endless: { time: 240, target: 300, step: 30, startFloor: 5 },
  creditMaker: '우리 반 선생님',  // 엔딩 크레딧 '만든 사람'
  // 1대1 대결 (명세서 14절)
  battle: {
    floor: 2,                 // 이 층의 타일 비율과 보석으로 광산을 만든다
    pickCap: 40,              // 곡괭이 한정 대전: 받을 수 있는 곡괭이 총수 (시작 포함)
    pickMinutes: 7,           // 곡괭이 한정 대전의 제한 시간
    rockDelay: 3000,          // 낙석 예고 뒤 떨어지기까지
    comboRocks: { 1: 2, 2: 3, 3: 4 }, // 콤보 단계에 닿으면 보내는 낙석 수
    earlyRocksMax: 4,         // 미리 감정 성공: 남은 칸 수 (최대 4)
    clearRocks: 4,            // 판을 다 비우면
    dustMs: 6000,             // 흙먼지 가리기 시간
    immuneMs: 5000,           // 방해를 받은 뒤 다시 받지 않는 시간
    finishGraceMs: 15000,     // 시간이 끝났을 때 열린 감정을 마칠 수 있는 시간
  },
};
