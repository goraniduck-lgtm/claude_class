// 추가 문제은행 P19~P32 (14세트 168문항) — 선생님이 YBM 4-2 6단원 교과서·수학익힘·유사문제와 대조해 만든 자료
// tools/build_extra_questions.py 로 만든 파일이에요. 직접 고치지 말고 원자료를 바꾼 뒤 다시 만드세요.
// 게임에 맞게 고친 점: '둘레' → '모든 변의 길이의 합', 2차시 문항의 '정다각형' 정리, 조건표·조각 그림 해설 보강

export const EXTRA_TYPE_INFO = {
 "P19": {
  "name": "다각형의 조건을 따져 보기",
  "lesson": 2
 },
 "P20": {
  "name": "변·꼭짓점·각의 수 퍼즐",
  "lesson": 2
 },
 "P21": {
  "name": "정다각형 조건 탐정",
  "lesson": 3
 },
 "P22": {
  "name": "모든 변의 길이의 합 추론",
  "lesson": 3
 },
 "P23": {
  "name": "대각선 기본 추리",
  "lesson": 4
 },
 "P24": {
  "name": "모양 조각 조합 퍼즐",
  "lesson": 6
 },
 "P25": {
  "name": "대각선 규칙 도전",
  "lesson": 8
 },
 "P26": {
  "name": "다각형 완성하기",
  "lesson": 2
 },
 "P27": {
  "name": "정다각형 조건표 판독",
  "lesson": 3
 },
 "P28": {
  "name": "대각선의 끝점 찾기",
  "lesson": 4
 },
 "P29": {
  "name": "대각선 수 비교와 결합",
  "lesson": 4
 },
 "P30": {
  "name": "그림 속 모양 조각 읽기",
  "lesson": 6
 },
 "P31": {
  "name": "모양 채우기 전략 비교",
  "lesson": 6
 },
 "P32": {
  "name": "대각선 증가 규칙표",
  "lesson": 8
 }
};

export const EXTRA_QUESTIONS = {
 "P19": [
  {
   "id": "P19-01",
   "level": 1,
   "format": "choice",
   "prompt": "다각형이 되기 위해 꼭 필요한 조건은 무엇인가요?",
   "choices": [
    {
     "value": 0,
     "label": "변의 길이가 모두 같아야 해요."
    },
    {
     "value": 1,
     "label": "곡선으로 둘러싸여야 해요."
    },
    {
     "value": 2,
     "label": "선분으로만 빈틈없이 둘러싸여야 해요."
    }
   ],
   "answer": 2,
   "explain": "다각형은 선분으로만 둘러싸인 평면도형이에요. 변의 길이가 모두 같을 필요는 없어요."
  },
  {
   "id": "P19-02",
   "level": 1,
   "format": "choice",
   "prompt": "선분 6개를 이어 그렸지만 처음 점과 끝 점이 만나지 않았어요. 이 도형에 대한 설명은?",
   "choices": [
    {
     "value": 0,
     "label": "육각형이에요."
    },
    {
     "value": 1,
     "label": "다각형이 아니에요."
    },
    {
     "value": 2,
     "label": "칠각형이에요."
    }
   ],
   "answer": 1,
   "explain": "선분으로만 그려도 닫히지 않으면 다각형이 아니에요."
  },
  {
   "id": "P19-03",
   "level": 1,
   "format": "choice",
   "prompt": "도형을 둘러싼 선 중 한 부분이 굽은 선이에요. 이 도형은 다각형일까요?",
   "choices": [
    {
     "value": 0,
     "label": "아니요, 굽은 선이 있기 때문이에요."
    },
    {
     "value": 1,
     "label": "예, 둘러싸여 있기만 하면 돼요."
    },
    {
     "value": 2,
     "label": "예, 꼭짓점이 하나라도 있으면 돼요."
    }
   ],
   "answer": 0,
   "explain": "다각형은 선분으로만 둘러싸여 있어야 해요. 굽은 선이 하나라도 있으면 다각형이 아니에요."
  },
  {
   "id": "P19-04",
   "level": 2,
   "format": "choice",
   "prompt": "안쪽으로 움푹 들어간 모양이지만 선분으로만 완전히 둘러싸여 있어요. 알맞은 말은?",
   "choices": [
    {
     "value": 0,
     "label": "다각형일 수 있어요."
    },
    {
     "value": 1,
     "label": "다각형은 무조건 볼록해야 해요."
    },
    {
     "value": 2,
     "label": "모든 변이 같지 않으면 다각형이 아니에요."
    }
   ],
   "answer": 0,
   "explain": "안쪽으로 들어간 부분이 있어도 선분으로만 둘러싸인 닫힌 도형이면 다각형이에요."
  },
  {
   "id": "P19-05",
   "level": 1,
   "format": "choice",
   "prompt": "변의 길이가 서로 다른 사각형은 다각형일까요?",
   "choices": [
    {
     "value": 0,
     "label": "예, 사각형도 다각형이에요."
    },
    {
     "value": 1,
     "label": "아니요, 길이가 같아야 해요."
    },
    {
     "value": 2,
     "label": "아니요, 삼각형만 다각형이에요."
    }
   ],
   "answer": 0,
   "explain": "사각형은 선분 네 개로 둘러싸인 다각형이에요. 네 변의 길이가 같을 필요는 없어요."
  },
  {
   "id": "P19-06",
   "level": 1,
   "format": "choice",
   "prompt": "선분 5개로 완전히 둘러싸인 도형의 이름은 무엇인가요?",
   "choices": [
    {
     "value": 0,
     "label": "사각형"
    },
    {
     "value": 1,
     "label": "오각형"
    },
    {
     "value": 2,
     "label": "육각형"
    }
   ],
   "answer": 1,
   "explain": "다각형의 이름은 변의 수로 정해요. 선분이 5개이면 오각형이에요."
  },
  {
   "id": "P19-07",
   "level": 2,
   "format": "choice",
   "prompt": "다각형이 아닌 모양을 골라야 해요. 가장 알맞은 설명은?",
   "choices": [
    {
     "value": 0,
     "label": "선분 3개로 둘러싸인 모양"
    },
    {
     "value": 1,
     "label": "둥근 원 모양"
    },
    {
     "value": 2,
     "label": "선분 8개로 둘러싸인 모양"
    }
   ],
   "answer": 1,
   "explain": "원은 굽은 선으로 둘러싸여 있으므로 다각형이 아니에요."
  },
  {
   "id": "P19-08",
   "level": 2,
   "format": "choice",
   "prompt": "선분 4개를 이어 그렸는데 마지막 선분이 처음 점에 닿지 않았어요. 무엇이 부족한가요?",
   "choices": [
    {
     "value": 0,
     "label": "꼭짓점의 색깔"
    },
    {
     "value": 1,
     "label": "변의 길이가 같다는 조건"
    },
    {
     "value": 2,
     "label": "처음 점과 끝 점이 만나는 조건"
    }
   ],
   "answer": 2,
   "explain": "선분들이 이어져 완전히 닫혀야 다각형이 돼요."
  },
  {
   "id": "P19-09",
   "level": 2,
   "format": "choice",
   "prompt": "다음 중 다각형이 될 수 있는 도형의 설명은?",
   "choices": [
    {
     "value": 0,
     "label": "기울어진 선분 7개로 닫혀 있어요."
    },
    {
     "value": 1,
     "label": "직선 5개가 서로 연결되지 않았어요."
    },
    {
     "value": 2,
     "label": "굽은 선이 한 군데 있어요."
    }
   ],
   "answer": 0,
   "explain": "모양이나 각의 크기에 관계없이 선분만으로 둘러싸여 닫히면 다각형이에요."
  },
  {
   "id": "P19-10",
   "level": 1,
   "format": "choice",
   "prompt": "선분 9개로 둘러싸인 도형의 이름은?",
   "choices": [
    {
     "value": 0,
     "label": "팔각형"
    },
    {
     "value": 1,
     "label": "십각형"
    },
    {
     "value": 2,
     "label": "구각형"
    }
   ],
   "answer": 2,
   "explain": "변이 9개인 다각형은 구각형이에요."
  },
  {
   "id": "P19-11",
   "level": 2,
   "format": "choice",
   "prompt": "네 변의 길이가 모두 다르더라도 선분 네 개로 둘러싸인 닫힌 도형이면?",
   "choices": [
    {
     "value": 0,
     "label": "사각형이에요."
    },
    {
     "value": 1,
     "label": "사각형이 될 수 없어요."
    },
    {
     "value": 2,
     "label": "항상 정사각형이에요."
    }
   ],
   "answer": 0,
   "explain": "변의 수가 4개인 다각형은 사각형이에요. 변의 길이는 달라도 돼요."
  },
  {
   "id": "P19-12",
   "level": 2,
   "format": "choice",
   "prompt": "다각형의 조건에 대한 바른 설명은 무엇인가요?",
   "choices": [
    {
     "value": 0,
     "label": "모든 다각형은 정다각형이에요."
    },
    {
     "value": 1,
     "label": "다각형의 변 길이가 모두 같을 필요는 없어요."
    },
    {
     "value": 2,
     "label": "다각형에는 곡선이 반드시 있어요."
    }
   ],
   "answer": 1,
   "explain": "변의 길이가 모두 같은 것은 정다각형의 조건 중 하나이지, 모든 다각형의 조건은 아니에요.",
   "lesson": 3
  }
 ],
 "P20": [
  {
   "id": "P20-01",
   "level": 1,
   "format": "number",
   "prompt": "오각형의 변 5개와 삼각형의 꼭짓점 3개를 합하면 모두 몇 개일까요?",
   "answer": 8,
   "unit": "개",
   "explain": "5 + 3 = 8(개)"
  },
  {
   "id": "P20-02",
   "level": 1,
   "format": "number",
   "prompt": "팔각형의 꼭짓점 수에서 오각형의 변의 수를 빼면 몇 개일까요?",
   "answer": 3,
   "unit": "개",
   "explain": "팔각형은 꼭짓점이 8개, 오각형은 변이 5개예요. 8 - 5 = 3(개)"
  },
  {
   "id": "P20-03",
   "level": 1,
   "format": "number",
   "prompt": "육각형의 각의 수와 사각형의 변의 수를 합하면 몇 개일까요?",
   "answer": 10,
   "unit": "개",
   "explain": "육각형의 각은 6개, 사각형의 변은 4개예요. 6 + 4 = 10(개)"
  },
  {
   "id": "P20-04",
   "level": 2,
   "format": "number",
   "prompt": "구각형의 변의 수에서 칠각형의 각의 수를 빼면 몇 개일까요?",
   "answer": 2,
   "unit": "개",
   "explain": "구각형은 변이 9개, 칠각형은 각이 7개예요. 9 - 7 = 2(개)"
  },
  {
   "id": "P20-05",
   "level": 2,
   "format": "number",
   "prompt": "팔각형의 변의 수와 칠각형의 꼭짓점 수의 합은 몇 개일까요?",
   "answer": 15,
   "unit": "개",
   "explain": "8 + 7 = 15(개)"
  },
  {
   "id": "P20-06",
   "level": 2,
   "format": "number",
   "prompt": "삼각형, 사각형, 오각형을 한 개씩 그렸어요. 꼭짓점은 모두 몇 개일까요?",
   "answer": 12,
   "unit": "개",
   "explain": "3 + 4 + 5 = 12(개)"
  },
  {
   "id": "P20-07",
   "level": 2,
   "format": "number",
   "prompt": "사각형, 오각형, 육각형을 한 개씩 그렸어요. 변은 모두 몇 개일까요?",
   "answer": 15,
   "unit": "개",
   "explain": "4 + 5 + 6 = 15(개)"
  },
  {
   "id": "P20-08",
   "level": 1,
   "format": "choice",
   "prompt": "육각형보다 변이 2개 더 많은 다각형은?",
   "choices": [
    {
     "value": 0,
     "label": "칠각형"
    },
    {
     "value": 1,
     "label": "구각형"
    },
    {
     "value": 2,
     "label": "팔각형"
    }
   ],
   "answer": 2,
   "explain": "육각형은 변이 6개예요. 6 + 2 = 8이므로 팔각형이에요."
  },
  {
   "id": "P20-09",
   "level": 1,
   "format": "choice",
   "prompt": "칠각형보다 꼭짓점이 1개 적은 다각형은?",
   "choices": [
    {
     "value": 0,
     "label": "육각형"
    },
    {
     "value": 1,
     "label": "팔각형"
    },
    {
     "value": 2,
     "label": "오각형"
    }
   ],
   "answer": 0,
   "explain": "칠각형은 꼭짓점이 7개이고, 1개 적으면 6개이므로 육각형이에요."
  },
  {
   "id": "P20-10",
   "level": 2,
   "format": "number",
   "prompt": "삼각형 2개와 사각형 1개의 변의 수를 모두 합하면 몇 개일까요?",
   "answer": 10,
   "unit": "개",
   "explain": "3 × 2 + 4 = 10(개)"
  },
  {
   "id": "P20-11",
   "level": 2,
   "format": "number",
   "prompt": "십각형의 각의 수와 사각형 2개의 꼭짓점 수를 합하면 몇 개일까요?",
   "answer": 18,
   "unit": "개",
   "explain": "10 + 4 × 2 = 18(개)"
  },
  {
   "id": "P20-12",
   "level": 3,
   "format": "number",
   "prompt": "팔각형 1개의 꼭짓점 수와 육각형 1개의 각의 수를 합하면 몇 개일까요?",
   "answer": 14,
   "unit": "개",
   "explain": "팔각형의 꼭짓점 8개와 육각형의 각 6개를 합하여 14개예요."
  }
 ],
 "P21": [
  {
   "id": "P21-01",
   "level": 1,
   "format": "choice",
   "prompt": "정다각형을 설명한 것으로 가장 알맞은 것은?",
   "choices": [
    {
     "value": 0,
     "label": "변의 길이만 모두 같은 다각형"
    },
    {
     "value": 1,
     "label": "각의 크기만 모두 같은 다각형"
    },
    {
     "value": 2,
     "label": "변의 길이와 각의 크기가 모두 같은 다각형"
    }
   ],
   "answer": 2,
   "explain": "정다각형은 모든 변의 길이와 모든 각의 크기가 각각 같은 다각형이에요."
  },
  {
   "id": "P21-02",
   "level": 2,
   "format": "choice",
   "prompt": "가로 7cm, 세로 4cm인 직사각형은 정다각형일까요?",
   "choices": [
    {
     "value": 0,
     "label": "예, 네 각이 같기 때문이에요."
    },
    {
     "value": 1,
     "label": "아니요, 네 변의 길이가 모두 같지 않아요."
    },
    {
     "value": 2,
     "label": "예, 변이 네 개이기 때문이에요."
    }
   ],
   "answer": 1,
   "explain": "각의 크기는 모두 같지만 변의 길이는 모두 같지 않으므로 정다각형이 아니에요."
  },
  {
   "id": "P21-03",
   "level": 2,
   "format": "choice",
   "prompt": "네 변의 길이가 같은 마름모인데, 각의 크기가 모두 같지는 않아요. 정다각형일까요?",
   "choices": [
    {
     "value": 0,
     "label": "아니요, 각의 크기가 달라요."
    },
    {
     "value": 1,
     "label": "예, 변의 길이만 같으면 돼요."
    },
    {
     "value": 2,
     "label": "예, 사각형이면 모두 정다각형이에요."
    }
   ],
   "answer": 0,
   "explain": "변의 길이와 각의 크기가 모두 같아야 정다각형이에요."
  },
  {
   "id": "P21-04",
   "level": 2,
   "format": "choice",
   "prompt": "오각형의 다섯 변 길이가 모두 6cm이고 다섯 각의 크기도 같아요. 이 도형은?",
   "choices": [
    {
     "value": 0,
     "label": "오각형이지만 정다각형은 아니에요."
    },
    {
     "value": 1,
     "label": "정오각형이에요."
    },
    {
     "value": 2,
     "label": "정육각형이에요."
    }
   ],
   "answer": 1,
   "explain": "다섯 변과 다섯 각이 모두 같으니 정오각형이에요."
  },
  {
   "id": "P21-05",
   "level": 2,
   "format": "choice",
   "prompt": "육각형의 변 여섯 개가 모두 같다는 사실만 알아요. 정육각형이라고 할 수 있을까요?",
   "choices": [
    {
     "value": 0,
     "label": "반드시 정육각형이에요."
    },
    {
     "value": 1,
     "label": "육각형이 아니에요."
    },
    {
     "value": 2,
     "label": "아직 알 수 없어요. 각의 크기도 확인해요."
    }
   ],
   "answer": 2,
   "explain": "변의 길이만으로는 판단할 수 없어요. 각의 크기도 모두 같은지 확인해야 해요."
  },
  {
   "id": "P21-06",
   "level": 2,
   "format": "choice",
   "prompt": "오각형의 각 다섯 개가 모두 같다는 사실만 알아요. 정오각형일까요?",
   "choices": [
    {
     "value": 0,
     "label": "반드시 정오각형이에요."
    },
    {
     "value": 1,
     "label": "변의 길이도 확인해야 알 수 있어요."
    },
    {
     "value": 2,
     "label": "오각형일 수 없어요."
    }
   ],
   "answer": 1,
   "explain": "각의 크기가 같아도 변의 길이가 다를 수 있으니 확인이 더 필요해요."
  },
  {
   "id": "P21-07",
   "level": 1,
   "format": "choice",
   "prompt": "정사각형에 대한 바른 설명은 무엇인가요?",
   "choices": [
    {
     "value": 0,
     "label": "정다각형이에요."
    },
    {
     "value": 1,
     "label": "다각형이 아니에요."
    },
    {
     "value": 2,
     "label": "네 각의 크기가 서로 달라요."
    }
   ],
   "answer": 0,
   "explain": "정사각형은 네 변의 길이가 같고 네 각의 크기도 같으므로 정다각형이에요."
  },
  {
   "id": "P21-08",
   "level": 2,
   "format": "choice",
   "prompt": "변이 7개이고 모든 변과 각이 각각 같은 다각형의 이름은?",
   "choices": [
    {
     "value": 0,
     "label": "정육각형"
    },
    {
     "value": 1,
     "label": "칠각형이 아닌 도형"
    },
    {
     "value": 2,
     "label": "정칠각형"
    }
   ],
   "answer": 2,
   "explain": "변이 7개인 정다각형이므로 정칠각형이에요."
  },
  {
   "id": "P21-09",
   "level": 2,
   "format": "choice",
   "prompt": "네 각이 모두 직각이지만 이웃한 두 변의 길이가 달라요. 올바른 판단은?",
   "choices": [
    {
     "value": 0,
     "label": "정다각형이 아니에요."
    },
    {
     "value": 1,
     "label": "반드시 정사각형이에요."
    },
    {
     "value": 2,
     "label": "네 변의 길이가 모두 같아요."
    }
   ],
   "answer": 0,
   "explain": "직사각형은 각이 같아도 네 변의 길이가 같지 않으면 정다각형이 아니에요."
  },
  {
   "id": "P21-10",
   "level": 1,
   "format": "number",
   "prompt": "정삼각형의 세 각은 모두 같아요. 한 각은 몇 도일까요?",
   "answer": 60,
   "unit": "°",
   "explain": "정삼각형의 세 각은 모두 60°예요."
  },
  {
   "id": "P21-11",
   "level": 1,
   "format": "number",
   "prompt": "정사각형의 네 각 중 한 각은 몇 도일까요?",
   "answer": 90,
   "unit": "°",
   "explain": "정사각형의 각은 모두 직각이므로 90°예요."
  },
  {
   "id": "P21-12",
   "level": 2,
   "format": "number",
   "prompt": "정육각형에서 한 각의 크기가 120°예요. 다른 한 각은 몇 도일까요?",
   "answer": 120,
   "unit": "°",
   "explain": "정다각형에서는 모든 각의 크기가 같으므로 120°예요."
  }
 ],
 "P22": [
  {
   "id": "P22-01",
   "level": 2,
   "format": "number",
   "prompt": "한 변이 5cm인 정칠각형의 모든 변의 길이의 합은 몇 cm일까요?",
   "answer": 35,
   "unit": "cm",
   "explain": "정칠각형은 변 7개가 같아요. 5 × 7 = 35(cm)"
  },
  {
   "id": "P22-02",
   "level": 2,
   "format": "number",
   "prompt": "한 변이 4cm인 정구각형의 모든 변의 길이의 합은 몇 cm일까요?",
   "answer": 36,
   "unit": "cm",
   "explain": "정구각형은 변 9개가 같아요. 4 × 9 = 36(cm)"
  },
  {
   "id": "P22-03",
   "level": 2,
   "format": "number",
   "prompt": "모든 변의 길이의 합이 36cm인 정사각형의 한 변은 몇 cm일까요?",
   "answer": 9,
   "unit": "cm",
   "explain": "정사각형은 변 4개가 같아요. 36 ÷ 4 = 9(cm)"
  },
  {
   "id": "P22-04",
   "level": 2,
   "format": "number",
   "prompt": "모든 변의 길이의 합이 45cm인 정오각형의 한 변은 몇 cm일까요?",
   "answer": 9,
   "unit": "cm",
   "explain": "정오각형은 변 5개가 같아요. 45 ÷ 5 = 9(cm)"
  },
  {
   "id": "P22-05",
   "level": 2,
   "format": "number",
   "prompt": "모든 변의 길이의 합이 56cm인 정팔각형의 한 변은 몇 cm일까요?",
   "answer": 7,
   "unit": "cm",
   "explain": "정팔각형은 변 8개가 같아요. 56 ÷ 8 = 7(cm)"
  },
  {
   "id": "P22-06",
   "level": 3,
   "format": "number",
   "prompt": "한 변이 8cm인 정삼각형과 모든 변의 길이의 합이 같은 정육각형이 있어요. 정육각형의 한 변은 몇 cm일까요?",
   "answer": 4,
   "unit": "cm",
   "explain": "정삼각형의 모든 변의 길이의 합은 8 × 3 = 24(cm)예요. 정육각형은 변이 6개이므로 한 변은 24 ÷ 6 = 4(cm)예요."
  },
  {
   "id": "P22-07",
   "level": 3,
   "format": "number",
   "prompt": "한 변이 9cm인 정사각형과 모든 변의 길이의 합이 같은 정삼각형이 있어요. 정삼각형의 한 변은 몇 cm일까요?",
   "answer": 12,
   "unit": "cm",
   "explain": "정사각형의 모든 변의 길이의 합은 9 × 4 = 36(cm)예요. 정삼각형은 변이 3개이므로 한 변은 36 ÷ 3 = 12(cm)예요."
  },
  {
   "id": "P22-08",
   "level": 3,
   "format": "number",
   "prompt": "한 변이 8cm인 정육각형과 한 변이 12cm인 정사각형이 있어요. 두 도형의 모든 변의 길이의 합은 몇 cm 차이가 날까요?",
   "answer": 0,
   "unit": "cm",
   "explain": "정육각형은 8 × 6 = 48(cm), 정사각형은 12 × 4 = 48(cm)이에요. 두 합이 같으므로 차이는 0cm예요."
  },
  {
   "id": "P22-09",
   "level": 2,
   "format": "number",
   "prompt": "한 변이 3cm인 정십각형의 모든 변의 길이의 합은 몇 cm일까요?",
   "answer": 30,
   "unit": "cm",
   "explain": "정십각형의 변은 10개예요. 3 × 10 = 30(cm)"
  },
  {
   "id": "P22-10",
   "level": 3,
   "format": "choice",
   "prompt": "한 변이 4cm이고 모든 변의 길이의 합이 40cm인 정다각형은?",
   "choices": [
    {
     "value": 0,
     "label": "정팔각형"
    },
    {
     "value": 1,
     "label": "정구각형"
    },
    {
     "value": 2,
     "label": "정십각형"
    }
   ],
   "answer": 2,
   "explain": "변의 수는 40 ÷ 4 = 10개이므로 정십각형이에요."
  },
  {
   "id": "P22-11",
   "level": 3,
   "format": "number",
   "prompt": "한 변이 5cm인 정오각형과 한 변이 7cm인 정오각형이 있어요. 두 도형의 모든 변의 길이의 합은 몇 cm 차이가 날까요?",
   "answer": 10,
   "unit": "cm",
   "explain": "5 × 5 = 25(cm), 7 × 5 = 35(cm)이므로 35 − 25 = 10(cm) 차이가 나요."
  },
  {
   "id": "P22-12",
   "level": 2,
   "format": "choice",
   "prompt": "한 변이 6cm인 정육각형과 한 변이 12cm인 정삼각형이 있어요. 두 도형의 모든 변의 길이의 합을 비교하면?",
   "choices": [
    {
     "value": 0,
     "label": "두 도형의 합이 같아요."
    },
    {
     "value": 1,
     "label": "정육각형의 합이 더 커요."
    },
    {
     "value": 2,
     "label": "정삼각형의 합이 더 커요."
    }
   ],
   "answer": 0,
   "explain": "정육각형은 6 × 6 = 36(cm), 정삼각형은 12 × 3 = 36(cm)이므로 두 합이 같아요."
  }
 ],
 "P23": [
  {
   "id": "P23-01",
   "level": 1,
   "format": "number",
   "prompt": "삼각형에는 대각선이 모두 몇 개일까요?",
   "answer": 0,
   "unit": "개",
   "explain": "삼각형의 모든 꼭짓점은 서로 이웃해요. 이웃하지 않는 꼭짓점을 이을 수 없으므로 0개예요."
  },
  {
   "id": "P23-02",
   "level": 1,
   "format": "number",
   "prompt": "사각형의 대각선은 모두 몇 개일까요?",
   "answer": 2,
   "unit": "개",
   "explain": "사각형은 이웃하지 않는 두 꼭짓점을 잇는 선분이 2개예요."
  },
  {
   "id": "P23-03",
   "level": 2,
   "format": "number",
   "prompt": "오각형의 대각선은 모두 몇 개일까요?",
   "answer": 5,
   "unit": "개",
   "explain": "오각형에서 대각선을 빠짐없이 그리면 5개예요."
  },
  {
   "id": "P23-04",
   "level": 2,
   "format": "number",
   "prompt": "육각형의 대각선은 모두 몇 개일까요?",
   "answer": 9,
   "unit": "개",
   "explain": "육각형에서 대각선을 모두 그리면 9개예요."
  },
  {
   "id": "P23-05",
   "level": 2,
   "format": "number",
   "prompt": "육각형의 대각선은 오각형보다 몇 개 더 많을까요?",
   "answer": 4,
   "unit": "개",
   "explain": "육각형 9개, 오각형 5개이므로 9 - 5 = 4(개)예요."
  },
  {
   "id": "P23-06",
   "level": 2,
   "format": "number",
   "prompt": "사각형 1개와 오각형 1개의 대각선 수를 합하면 몇 개일까요?",
   "answer": 7,
   "unit": "개",
   "explain": "사각형의 2개와 오각형의 5개를 합해 7개예요."
  },
  {
   "id": "P23-07",
   "level": 2,
   "format": "choice",
   "prompt": "한 꼭짓점에서 대각선을 2개 그을 수 있는 다각형은?",
   "choices": [
    {
     "value": 0,
     "label": "사각형"
    },
    {
     "value": 1,
     "label": "오각형"
    },
    {
     "value": 2,
     "label": "육각형"
    }
   ],
   "answer": 1,
   "explain": "한 꼭짓점에서 대각선을 2개 그을 수 있는 도형은 오각형이에요."
  },
  {
   "id": "P23-08",
   "level": 2,
   "format": "number",
   "prompt": "육각형의 한 꼭짓점에서 그을 수 있는 대각선은 몇 개일까요?",
   "answer": 3,
   "unit": "개",
   "explain": "자기 자신과 이웃한 두 꼭짓점은 제외해요. 6 - 3 = 3(개)"
  },
  {
   "id": "P23-09",
   "level": 1,
   "format": "choice",
   "prompt": "대각선의 뜻으로 가장 알맞은 것은?",
   "choices": [
    {
     "value": 0,
     "label": "서로 이웃하지 않는 두 꼭짓점을 이은 선분"
    },
    {
     "value": 1,
     "label": "이웃한 두 꼭짓점을 이은 선분"
    },
    {
     "value": 2,
     "label": "꼭짓점과 변의 가운데를 이은 선분"
    }
   ],
   "answer": 0,
   "explain": "대각선은 다각형에서 서로 이웃하지 않는 두 꼭짓점을 이은 선분이에요."
  },
  {
   "id": "P23-10",
   "level": 2,
   "format": "choice",
   "prompt": "꼭짓점과 마주 보는 변의 가운데를 이은 선분이 대각선이 아닌 까닭은?",
   "choices": [
    {
     "value": 0,
     "label": "길이가 너무 짧아서"
    },
    {
     "value": 1,
     "label": "선분이 곧지 않아서"
    },
    {
     "value": 2,
     "label": "양 끝이 모두 꼭짓점인 것은 아니라서"
    }
   ],
   "answer": 2,
   "explain": "대각선의 양 끝은 모두 꼭짓점이어야 해요."
  },
  {
   "id": "P23-11",
   "level": 2,
   "format": "choice",
   "prompt": "직사각형의 두 대각선에 대한 옳은 말은?",
   "choices": [
    {
     "value": 0,
     "label": "두 대각선의 길이는 항상 달라요."
    },
    {
     "value": 1,
     "label": "두 대각선의 길이는 같아요."
    },
    {
     "value": 2,
     "label": "두 대각선이 항상 서로 수직이에요."
    }
   ],
   "answer": 1,
   "explain": "직사각형의 두 대각선은 길이가 같아요."
  },
  {
   "id": "P23-12",
   "level": 3,
   "format": "choice",
   "prompt": "정사각형의 두 대각선에 대한 옳은 말은?",
   "choices": [
    {
     "value": 0,
     "label": "길이가 같고 서로 수직으로 만나요."
    },
    {
     "value": 1,
     "label": "길이가 다르고 서로 수직이 아니에요."
    },
    {
     "value": 2,
     "label": "한 대각선만 그을 수 있어요."
    }
   ],
   "answer": 0,
   "explain": "정사각형의 두 대각선은 길이가 같고 서로 수직으로 만나요."
  }
 ],
 "P24": [
  {
   "id": "P24-01",
   "level": 1,
   "format": "number",
   "prompt": "정육각형 하나를 같은 크기의 작은 정삼각형 조각으로 빈틈없이 채웠어요. 작은 정삼각형은 몇 개일까요?",
   "answer": 6,
   "unit": "개",
   "explain": "정육각형은 같은 크기의 정삼각형 조각 6개로 채울 수 있어요."
  },
  {
   "id": "P24-02",
   "level": 2,
   "format": "number",
   "prompt": "정육각형 하나를 정삼각형 2개만큼의 크기인 마름모 조각으로 채우면 몇 개가 필요할까요?",
   "answer": 3,
   "unit": "개",
   "explain": "정육각형은 정삼각형 조각 6개 크기이므로 6 ÷ 2 = 3(개)예요."
  },
  {
   "id": "P24-03",
   "level": 2,
   "format": "number",
   "prompt": "정육각형 하나를 정삼각형 3개만큼의 크기인 사다리꼴 조각으로 채우면 몇 개가 필요할까요?",
   "answer": 2,
   "unit": "개",
   "explain": "정육각형은 정삼각형 조각 6개 크기이므로 6 ÷ 3 = 2(개)예요."
  },
  {
   "id": "P24-04",
   "level": 2,
   "format": "number",
   "prompt": "정육각형 안에 마름모 조각 2개를 놓았어요. 마름모 1개는 작은 정삼각형 2개 크기라면, 남는 작은 정삼각형 자리는 몇 개일까요?",
   "answer": 2,
   "unit": "개",
   "explain": "정육각형의 6칸 중 마름모 두 개로 2 × 2 = 4칸을 채웠으므로 2칸 남아요."
  },
  {
   "id": "P24-05",
   "level": 3,
   "format": "number",
   "prompt": "정육각형 안에 사다리꼴 1개(정삼각형 3개 크기)와 마름모 1개(2개 크기)를 넣었어요. 작은 정삼각형 몇 개를 더 넣으면 될까요?",
   "answer": 1,
   "unit": "개",
   "explain": "정육각형은 정삼각형 6개 크기예요. 6 - 3 - 2 = 1(개)"
  },
  {
   "id": "P24-06",
   "level": 2,
   "format": "number",
   "prompt": "정육각형을 정삼각형 6개로 채울 수 있어요. 작은 정삼각형 4개를 이미 놓았다면 몇 개가 더 필요할까요?",
   "answer": 2,
   "unit": "개",
   "explain": "6 - 4 = 2(개)가 더 필요해요."
  },
  {
   "id": "P24-07",
   "level": 3,
   "format": "number",
   "prompt": "정육각형 안에 마름모 조각 1개(정삼각형 2개 크기)를 놓았어요. 나머지를 작은 정삼각형만으로 채우면 몇 개가 필요할까요?",
   "answer": 4,
   "unit": "개",
   "explain": "6 - 2 = 4(개)가 남아요."
  },
  {
   "id": "P24-08",
   "level": 2,
   "format": "number",
   "prompt": "작은 사다리꼴 조각 하나는 정삼각형 조각 3개로 만들 수 있어요. 사다리꼴 2개는 정삼각형 몇 개와 같은 크기일까요?",
   "answer": 6,
   "unit": "개",
   "explain": "3 × 2 = 6(개)예요."
  },
  {
   "id": "P24-09",
   "level": 2,
   "format": "number",
   "prompt": "마름모 조각 하나는 작은 정삼각형 2개로 만들 수 있어요. 마름모 3개는 정삼각형 몇 개와 같은 크기일까요?",
   "answer": 6,
   "unit": "개",
   "explain": "2 × 3 = 6(개)예요."
  },
  {
   "id": "P24-10",
   "level": 3,
   "format": "number",
   "prompt": "정육각형 안에 사다리꼴 1개(정삼각형 3개 크기)와 정삼각형 2개를 넣었어요. 남은 자리에 정삼각형 몇 개가 필요할까요?",
   "answer": 1,
   "unit": "개",
   "explain": "6 - 3 - 2 = 1(개)예요."
  },
  {
   "id": "P24-11",
   "level": 2,
   "format": "choice",
   "prompt": "정육각형을 겹치지 않고 빈틈없이 채우는 방법으로 알맞은 것은?",
   "choices": [
    {
     "value": 0,
     "label": "작은 정삼각형 5개"
    },
    {
     "value": 1,
     "label": "마름모 3개"
    },
    {
     "value": 2,
     "label": "사다리꼴 3개"
    }
   ],
   "answer": 1,
   "explain": "정육각형 하나는 작은 정삼각형 6개 또는 같은 크기의 마름모 3개로 채울 수 있어요."
  },
  {
   "id": "P24-12",
   "level": 3,
   "format": "number",
   "prompt": "작은 정삼각형 6개로 정육각형을 만들었어요. 이 중 4개를 마름모 조각 2개로 바꾸면 정삼각형 조각은 몇 개 남을까요?",
   "answer": 2,
   "unit": "개",
   "explain": "정삼각형 4개 크기를 마름모 2개로 바꿨으므로 남은 정삼각형은 6 - 4 = 2개예요."
  }
 ],
 "P25": [
  {
   "id": "P25-01",
   "level": 2,
   "format": "number",
   "prompt": "칠각형의 대각선은 모두 몇 개일까요?",
   "answer": 14,
   "unit": "개",
   "explain": "사각형 2개, 오각형 5개, 육각형 9개, 칠각형 14개로 늘어나요."
  },
  {
   "id": "P25-02",
   "level": 2,
   "format": "number",
   "prompt": "팔각형의 대각선은 모두 몇 개일까요?",
   "answer": 20,
   "unit": "개",
   "explain": "칠각형은 14개이고, 팔각형에서는 6개 늘어나 20개예요."
  },
  {
   "id": "P25-03",
   "level": 3,
   "format": "number",
   "prompt": "구각형의 대각선은 모두 몇 개일까요?",
   "answer": 27,
   "unit": "개",
   "explain": "팔각형 20개에서 7개 늘어나므로 구각형은 27개예요."
  },
  {
   "id": "P25-04",
   "level": 3,
   "format": "number",
   "prompt": "십각형의 대각선은 모두 몇 개일까요?",
   "answer": 35,
   "unit": "개",
   "explain": "구각형 27개에서 8개 늘어나므로 십각형은 35개예요."
  },
  {
   "id": "P25-05",
   "level": 2,
   "format": "number",
   "prompt": "대각선 수가 칠각형 14개, 팔각형 20개예요. 얼마나 늘어났을까요?",
   "answer": 6,
   "unit": "개",
   "explain": "20 - 14 = 6(개) 늘어났어요."
  },
  {
   "id": "P25-06",
   "level": 2,
   "format": "number",
   "prompt": "대각선 수가 팔각형 20개, 구각형 27개예요. 얼마나 늘어났을까요?",
   "answer": 7,
   "unit": "개",
   "explain": "27 - 20 = 7(개) 늘어났어요."
  },
  {
   "id": "P25-07",
   "level": 3,
   "format": "number",
   "prompt": "대각선 수가 구각형 27개, 십각형 35개예요. 얼마나 늘어났을까요?",
   "answer": 8,
   "unit": "개",
   "explain": "35 - 27 = 8(개) 늘어났어요."
  },
  {
   "id": "P25-08",
   "level": 3,
   "format": "number",
   "prompt": "팔각형의 대각선은 20개, 육각형의 대각선은 9개예요. 몇 개 차이 날까요?",
   "answer": 11,
   "unit": "개",
   "explain": "20 - 9 = 11(개)예요."
  },
  {
   "id": "P25-09",
   "level": 3,
   "format": "number",
   "prompt": "십각형의 한 꼭짓점에서 그을 수 있는 대각선은 몇 개일까요?",
   "answer": 7,
   "unit": "개",
   "explain": "자기 자신과 양옆의 꼭짓점 2개를 제외하므로 10 - 3 = 7(개)예요."
  },
  {
   "id": "P25-10",
   "level": 3,
   "format": "choice",
   "prompt": "오각형의 꼭짓점 5개에서 각각 대각선 2개를 세면 10번이에요. 실제 대각선은 5개인 이유는?",
   "choices": [
    {
     "value": 0,
     "label": "대각선을 다 그리지 않았기 때문에"
    },
    {
     "value": 1,
     "label": "오각형에는 대각선이 없기 때문에"
    },
    {
     "value": 2,
     "label": "같은 대각선을 양 끝에서 두 번씩 세기 때문에"
    }
   ],
   "answer": 2,
   "explain": "하나의 대각선을 양쪽 꼭짓점에서 한 번씩 세었기 때문에 두 번씩 세어진 거예요."
  },
  {
   "id": "P25-11",
   "level": 2,
   "format": "choice",
   "prompt": "대각선이 14개인 다각형의 이름은?",
   "choices": [
    {
     "value": 0,
     "label": "칠각형"
    },
    {
     "value": 1,
     "label": "육각형"
    },
    {
     "value": 2,
     "label": "팔각형"
    }
   ],
   "answer": 0,
   "explain": "사각형부터 대각선 수는 2, 5, 9, 14로 늘어나므로 칠각형이에요."
  },
  {
   "id": "P25-12",
   "level": 3,
   "format": "choice",
   "prompt": "정팔각형과 정다각형이 아닌 팔각형의 대각선 수를 비교하면?",
   "choices": [
    {
     "value": 0,
     "label": "정팔각형이 더 많아요."
    },
    {
     "value": 1,
     "label": "두 도형이 같아요."
    },
    {
     "value": 2,
     "label": "정다각형이 아닌 팔각형이 더 많아요."
    }
   ],
   "answer": 1,
   "explain": "대각선의 개수는 변과 꼭짓점의 수로 결정돼요. 모두 팔각형이므로 20개예요."
  }
 ],
 "P26": [
  {
   "id": "P26-01",
   "level": 1,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"삼각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>삼각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"120.00\" y1=\"34.00\" x2=\"180.62\" y2=\"139.00\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"59.38\" y1=\"139.00\" x2=\"120.00\" y2=\"34.00\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"120.0\" cy=\"34.0\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"120.0\" y=\"19.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"180.6\" cy=\"139.0\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"197.0\" y=\"152.4\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"59.4\" cy=\"139.0\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"43.0\" y=\"152.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㄷㄱ"
    },
    {
     "value": 1,
     "label": "선분 ㄴㄷ"
    },
    {
     "value": 2,
     "label": "선분 ㄱㄴ"
    }
   ],
   "answer": 1,
   "explain": "삼각형의 변 중 선분 ㄴㄷ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-02",
   "level": 1,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"사각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>사각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"189.41\" y1=\"113.07\" x2=\"110.93\" y2=\"173.41\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"110.93\" y1=\"173.41\" x2=\"50.59\" y2=\"94.93\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"50.59\" y1=\"94.93\" x2=\"129.07\" y2=\"34.59\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"129.1\" cy=\"34.6\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"131.5\" y=\"19.9\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"189.4\" cy=\"113.1\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"208.1\" y=\"119.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"110.9\" cy=\"173.4\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"108.5\" y=\"196.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"50.6\" cy=\"94.9\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"31.9\" y=\"96.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㄷㄹ"
    },
    {
     "value": 1,
     "label": "선분 ㄴㄷ"
    },
    {
     "value": 2,
     "label": "선분 ㄱㄴ"
    }
   ],
   "answer": 2,
   "explain": "사각형의 변 중 선분 ㄱㄴ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-03",
   "level": 1,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"오각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>오각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"138.00\" y1=\"36.35\" x2=\"189.90\" y2=\"100.21\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"189.90\" y1=\"100.21\" x2=\"145.20\" y2=\"169.31\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"65.68\" y1=\"148.15\" x2=\"61.22\" y2=\"65.98\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"61.22\" y1=\"65.98\" x2=\"138.00\" y2=\"36.35\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"138.0\" cy=\"36.4\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"142.9\" y=\"22.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"189.9\" cy=\"100.2\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"208.8\" y=\"103.2\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"145.2\" cy=\"169.3\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"152.0\" y=\"190.9\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"65.7\" cy=\"148.2\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"51.0\" y=\"164.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text><circle cx=\"61.2\" cy=\"66.0\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"45.4\" y=\"59.7\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅁ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㄱㄴ"
    },
    {
     "value": 1,
     "label": "선분 ㄹㅁ"
    },
    {
     "value": 2,
     "label": "선분 ㄷㄹ"
    }
   ],
   "answer": 2,
   "explain": "오각형의 변 중 선분 ㄷㄹ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-04",
   "level": 2,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"육각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>육각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"146.61\" y1=\"39.26\" x2=\"189.38\" y2=\"94.68\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"189.38\" y1=\"94.68\" x2=\"162.76\" y2=\"159.42\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"162.76\" y1=\"159.42\" x2=\"93.39\" y2=\"168.74\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"93.39\" y1=\"168.74\" x2=\"50.62\" y2=\"113.32\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"77.24\" y1=\"48.58\" x2=\"146.61\" y2=\"39.26\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"146.6\" cy=\"39.3\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"153.8\" y=\"25.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"189.4\" cy=\"94.7\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"208.1\" y=\"96.2\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"162.8\" cy=\"159.4\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"174.3\" y=\"178.4\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"93.4\" cy=\"168.7\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"86.2\" y=\"190.2\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text><circle cx=\"50.6\" cy=\"113.3\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"31.9\" y=\"119.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅁ</text><circle cx=\"77.2\" cy=\"48.6\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"65.7\" y=\"37.6\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅂ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㄷㄹ"
    },
    {
     "value": 1,
     "label": "선분 ㄹㅁ"
    },
    {
     "value": 2,
     "label": "선분 ㅁㅂ"
    }
   ],
   "answer": 2,
   "explain": "육각형의 변 중 선분 ㅁㅂ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-05",
   "level": 2,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"칠각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>칠각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"120.00\" y1=\"34.00\" x2=\"174.73\" y2=\"60.36\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"174.73\" y1=\"60.36\" x2=\"188.24\" y2=\"119.58\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"188.24\" y1=\"119.58\" x2=\"150.37\" y2=\"167.07\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"150.37\" y1=\"167.07\" x2=\"89.63\" y2=\"167.07\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"89.63\" y1=\"167.07\" x2=\"51.76\" y2=\"119.58\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"51.76\" y1=\"119.58\" x2=\"65.27\" y2=\"60.36\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"120.0\" cy=\"34.0\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"120.0\" y=\"19.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"174.7\" cy=\"60.4\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"189.5\" y=\"52.6\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"188.2\" cy=\"119.6\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"206.7\" y=\"127.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"150.4\" cy=\"167.1\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"158.6\" y=\"188.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text><circle cx=\"89.6\" cy=\"167.1\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"81.4\" y=\"188.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅁ</text><circle cx=\"51.8\" cy=\"119.6\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"33.3\" y=\"127.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅂ</text><circle cx=\"65.3\" cy=\"60.4\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"50.5\" y=\"52.6\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅅ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㅂㅅ"
    },
    {
     "value": 1,
     "label": "선분 ㅅㄱ"
    },
    {
     "value": 2,
     "label": "선분 ㄱㄴ"
    }
   ],
   "answer": 1,
   "explain": "칠각형의 변 중 선분 ㅅㄱ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-06",
   "level": 2,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"팔각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>팔각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"175.50\" y1=\"61.34\" x2=\"189.41\" y2=\"113.07\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"189.41\" y1=\"113.07\" x2=\"162.66\" y2=\"159.50\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"162.66\" y1=\"159.50\" x2=\"110.93\" y2=\"173.41\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"110.93\" y1=\"173.41\" x2=\"64.50\" y2=\"146.66\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"64.50\" y1=\"146.66\" x2=\"50.59\" y2=\"94.93\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"50.59\" y1=\"94.93\" x2=\"77.34\" y2=\"48.50\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"77.34\" y1=\"48.50\" x2=\"129.07\" y2=\"34.59\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"129.1\" cy=\"34.6\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"131.5\" y=\"19.9\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"175.5\" cy=\"61.3\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"190.5\" y=\"53.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"189.4\" cy=\"113.1\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"208.1\" y=\"119.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"162.7\" cy=\"159.5\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"174.2\" y=\"178.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text><circle cx=\"110.9\" cy=\"173.4\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"108.5\" y=\"196.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅁ</text><circle cx=\"64.5\" cy=\"146.7\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"49.5\" y=\"162.2\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅂ</text><circle cx=\"50.6\" cy=\"94.9\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"31.9\" y=\"96.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅅ</text><circle cx=\"77.3\" cy=\"48.5\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"65.8\" y=\"37.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅇ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㄷㄹ"
    },
    {
     "value": 1,
     "label": "선분 ㄱㄴ"
    },
    {
     "value": 2,
     "label": "선분 ㅅㅇ"
    }
   ],
   "answer": 1,
   "explain": "팔각형의 변 중 선분 ㄱㄴ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-07",
   "level": 1,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"오각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>오각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"138.00\" y1=\"36.35\" x2=\"189.90\" y2=\"100.21\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"189.90\" y1=\"100.21\" x2=\"145.20\" y2=\"169.31\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"145.20\" y1=\"169.31\" x2=\"65.68\" y2=\"148.15\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"65.68\" y1=\"148.15\" x2=\"61.22\" y2=\"65.98\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"138.0\" cy=\"36.4\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"142.9\" y=\"22.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"189.9\" cy=\"100.2\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"208.8\" y=\"103.2\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"145.2\" cy=\"169.3\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"152.0\" y=\"190.9\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"65.7\" cy=\"148.2\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"51.0\" y=\"164.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text><circle cx=\"61.2\" cy=\"66.0\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"45.4\" y=\"59.7\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅁ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㅁㄱ"
    },
    {
     "value": 1,
     "label": "선분 ㄱㄴ"
    },
    {
     "value": 2,
     "label": "선분 ㄷㄹ"
    }
   ],
   "answer": 0,
   "explain": "오각형의 변 중 선분 ㅁㄱ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-08",
   "level": 2,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"육각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>육각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"146.61\" y1=\"39.26\" x2=\"189.38\" y2=\"94.68\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"189.38\" y1=\"94.68\" x2=\"162.76\" y2=\"159.42\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"162.76\" y1=\"159.42\" x2=\"93.39\" y2=\"168.74\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"93.39\" y1=\"168.74\" x2=\"50.62\" y2=\"113.32\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"77.24\" y1=\"48.58\" x2=\"146.61\" y2=\"39.26\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"146.6\" cy=\"39.3\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"153.8\" y=\"25.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"189.4\" cy=\"94.7\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"208.1\" y=\"96.2\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"162.8\" cy=\"159.4\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"174.3\" y=\"178.4\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"93.4\" cy=\"168.7\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"86.2\" y=\"190.2\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text><circle cx=\"50.6\" cy=\"113.3\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"31.9\" y=\"119.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅁ</text><circle cx=\"77.2\" cy=\"48.6\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"65.7\" y=\"37.6\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅂ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㄹㅁ"
    },
    {
     "value": 1,
     "label": "선분 ㅂㄱ"
    },
    {
     "value": 2,
     "label": "선분 ㅁㅂ"
    }
   ],
   "answer": 2,
   "explain": "육각형의 변 중 선분 ㅁㅂ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-09",
   "level": 2,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"칠각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>칠각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"120.00\" y1=\"34.00\" x2=\"174.73\" y2=\"60.36\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"174.73\" y1=\"60.36\" x2=\"188.24\" y2=\"119.58\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"188.24\" y1=\"119.58\" x2=\"150.37\" y2=\"167.07\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"150.37\" y1=\"167.07\" x2=\"89.63\" y2=\"167.07\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"51.76\" y1=\"119.58\" x2=\"65.27\" y2=\"60.36\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"65.27\" y1=\"60.36\" x2=\"120.00\" y2=\"34.00\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"120.0\" cy=\"34.0\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"120.0\" y=\"19.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"174.7\" cy=\"60.4\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"189.5\" y=\"52.6\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"188.2\" cy=\"119.6\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"206.7\" y=\"127.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"150.4\" cy=\"167.1\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"158.6\" y=\"188.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text><circle cx=\"89.6\" cy=\"167.1\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"81.4\" y=\"188.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅁ</text><circle cx=\"51.8\" cy=\"119.6\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"33.3\" y=\"127.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅂ</text><circle cx=\"65.3\" cy=\"60.4\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"50.5\" y=\"52.6\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅅ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㅂㅅ"
    },
    {
     "value": 1,
     "label": "선분 ㄹㅁ"
    },
    {
     "value": 2,
     "label": "선분 ㅁㅂ"
    }
   ],
   "answer": 2,
   "explain": "칠각형의 변 중 선분 ㅁㅂ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-10",
   "level": 2,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"팔각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>팔각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"129.07\" y1=\"34.59\" x2=\"175.50\" y2=\"61.34\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"175.50\" y1=\"61.34\" x2=\"189.41\" y2=\"113.07\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"189.41\" y1=\"113.07\" x2=\"162.66\" y2=\"159.50\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"162.66\" y1=\"159.50\" x2=\"110.93\" y2=\"173.41\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"64.50\" y1=\"146.66\" x2=\"50.59\" y2=\"94.93\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"50.59\" y1=\"94.93\" x2=\"77.34\" y2=\"48.50\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"77.34\" y1=\"48.50\" x2=\"129.07\" y2=\"34.59\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"129.1\" cy=\"34.6\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"131.5\" y=\"19.9\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"175.5\" cy=\"61.3\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"190.5\" y=\"53.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"189.4\" cy=\"113.1\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"208.1\" y=\"119.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"162.7\" cy=\"159.5\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"174.2\" y=\"178.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text><circle cx=\"110.9\" cy=\"173.4\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"108.5\" y=\"196.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅁ</text><circle cx=\"64.5\" cy=\"146.7\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"49.5\" y=\"162.2\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅂ</text><circle cx=\"50.6\" cy=\"94.9\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"31.9\" y=\"96.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅅ</text><circle cx=\"77.3\" cy=\"48.5\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"65.8\" y=\"37.5\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅇ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㅁㅂ"
    },
    {
     "value": 1,
     "label": "선분 ㄱㄴ"
    },
    {
     "value": 2,
     "label": "선분 ㅇㄱ"
    }
   ],
   "answer": 0,
   "explain": "팔각형의 변 중 선분 ㅁㅂ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-11",
   "level": 1,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"사각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>사각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"138.00\" y1=\"36.35\" x2=\"187.65\" y2=\"122.00\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"187.65\" y1=\"122.00\" x2=\"102.00\" y2=\"171.65\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"102.00\" y1=\"171.65\" x2=\"52.35\" y2=\"86.00\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"138.0\" cy=\"36.4\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"142.9\" y=\"22.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"187.6\" cy=\"122.0\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"205.9\" y=\"130.9\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"102.0\" cy=\"171.6\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"97.1\" y=\"193.9\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"52.4\" cy=\"86.0\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"34.1\" y=\"85.1\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㄱㄴ"
    },
    {
     "value": 1,
     "label": "선분 ㄷㄹ"
    },
    {
     "value": 2,
     "label": "선분 ㄹㄱ"
    }
   ],
   "answer": 2,
   "explain": "사각형의 변 중 선분 ㄹㄱ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  },
  {
   "id": "P26-12",
   "level": 1,
   "format": "choice",
   "prompt": "그림을 보고 다각형을 완성하려고 해요. <b>빠져 있는 변</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"오각형을 완성하려고 그린 선분들, 한 변이 빠짐\"><title>오각형을 완성하려고 그린 선분들, 한 변이 빠짐</title><circle cx=\"120\" cy=\"104\" r=\"82\" fill=\"#f7fbff\"/><line x1=\"146.61\" y1=\"39.26\" x2=\"189.80\" y2=\"109.30\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"189.80\" y1=\"109.30\" x2=\"136.52\" y2=\"172.02\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"136.52\" y1=\"172.02\" x2=\"60.41\" y2=\"140.74\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"60.41\" y1=\"140.74\" x2=\"66.65\" y2=\"58.68\" stroke=\"#244b7a\" stroke-width=\"4\" stroke-linecap=\"round\"/><circle cx=\"146.6\" cy=\"39.3\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"153.8\" y=\"25.8\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄱ</text><circle cx=\"189.8\" cy=\"109.3\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"208.6\" y=\"114.7\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄴ</text><circle cx=\"136.5\" cy=\"172.0\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"141.0\" y=\"194.4\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄷ</text><circle cx=\"60.4\" cy=\"140.7\" r=\"4.8\" fill=\"#244b7a\"/><text x=\"44.3\" y=\"154.7\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㄹ</text><circle cx=\"66.6\" cy=\"58.7\" r=\"4.8\" fill=\"#e35b3f\"/><text x=\"52.2\" y=\"50.4\" font-size=\"20\" font-weight=\"700\" text-anchor=\"middle\" fill=\"#1f344b\">ㅁ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "선분 ㅁㄱ"
    },
    {
     "value": 1,
     "label": "선분 ㄷㄹ"
    },
    {
     "value": 2,
     "label": "선분 ㄴㄷ"
    }
   ],
   "answer": 0,
   "explain": "오각형의 변 중 선분 ㅁㄱ이 그려져 있지 않아요. 두 끝점을 선분으로 이으면 완성돼요."
  }
 ],
 "P27": [
  {
   "id": "P27-01",
   "level": 2,
   "format": "choice",
   "prompt": "조건표를 보고 정다각형을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "나"
    }
   ],
   "answer": 2,
   "explain": "나는 변의 길이도 모두 같고 각의 크기도 모두 같아요. 두 가지가 모두 같아야 정다각형이에요."
  },
  {
   "id": "P27-02",
   "level": 2,
   "format": "choice",
   "prompt": "조건표를 보고 <b>변의 길이만 모두 같은 도형</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "나"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "가"
    }
   ],
   "answer": 2,
   "explain": "가는 변의 길이는 모두 같지만 각의 크기는 모두 같지 않아요. 그래서 정다각형은 아니에요."
  },
  {
   "id": "P27-03",
   "level": 3,
   "format": "choice",
   "prompt": "조건표를 보고 <b>각의 크기만 모두 같은 도형</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "나"
    },
    {
     "value": 2,
     "label": "다"
    }
   ],
   "answer": 1,
   "explain": "나는 각의 크기는 모두 같지만 변의 길이는 모두 같지 않아요. 그래서 정다각형은 아니에요."
  },
  {
   "id": "P27-04",
   "level": 3,
   "format": "choice",
   "prompt": "조건표를 보고 <b>변의 길이도 모두 같지 않고 각의 크기도 모두 같지 않은 도형</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "나"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "가"
    }
   ],
   "answer": 0,
   "explain": "나는 변의 길이도, 각의 크기도 모두 같지 않아요."
  },
  {
   "id": "P27-05",
   "level": 2,
   "format": "choice",
   "prompt": "조건표를 보고 정다각형을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "나"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "가"
    }
   ],
   "answer": 1,
   "explain": "다는 변의 길이도 모두 같고 각의 크기도 모두 같아요. 두 가지가 모두 같아야 정다각형이에요."
  },
  {
   "id": "P27-06",
   "level": 2,
   "format": "choice",
   "prompt": "조건표를 보고 <b>변의 길이만 모두 같은 도형</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "나"
    }
   ],
   "answer": 0,
   "explain": "가는 변의 길이는 모두 같지만 각의 크기는 모두 같지 않아요. 그래서 정다각형은 아니에요."
  },
  {
   "id": "P27-07",
   "level": 3,
   "format": "choice",
   "prompt": "조건표를 보고 <b>각의 크기만 모두 같은 도형</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "나"
    },
    {
     "value": 2,
     "label": "다"
    }
   ],
   "answer": 2,
   "explain": "다는 각의 크기는 모두 같지만 변의 길이는 모두 같지 않아요. 그래서 정다각형은 아니에요."
  },
  {
   "id": "P27-08",
   "level": 3,
   "format": "choice",
   "prompt": "조건표를 보고 <b>변의 길이도 모두 같지 않고 각의 크기도 모두 같지 않은 도형</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "나"
    }
   ],
   "answer": 1,
   "explain": "다는 변의 길이도, 각의 크기도 모두 같지 않아요."
  },
  {
   "id": "P27-09",
   "level": 2,
   "format": "choice",
   "prompt": "조건표를 보고 정다각형을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "나"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "가"
    }
   ],
   "answer": 1,
   "explain": "다는 변의 길이도 모두 같고 각의 크기도 모두 같아요. 두 가지가 모두 같아야 정다각형이에요."
  },
  {
   "id": "P27-10",
   "level": 2,
   "format": "choice",
   "prompt": "조건표를 보고 <b>변의 길이만 모두 같은 도형</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "나"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "가"
    }
   ],
   "answer": 1,
   "explain": "다는 변의 길이는 모두 같지만 각의 크기는 모두 같지 않아요. 그래서 정다각형은 아니에요."
  },
  {
   "id": "P27-11",
   "level": 3,
   "format": "choice",
   "prompt": "조건표를 보고 <b>각의 크기만 모두 같은 도형</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "다"
    },
    {
     "value": 1,
     "label": "나"
    },
    {
     "value": 2,
     "label": "가"
    }
   ],
   "answer": 1,
   "explain": "나는 각의 크기는 모두 같지만 변의 길이는 모두 같지 않아요. 그래서 정다각형은 아니에요."
  },
  {
   "id": "P27-12",
   "level": 3,
   "format": "choice",
   "prompt": "조건표를 보고 <b>변의 길이도 모두 같지 않고 각의 크기도 모두 같지 않은 도형</b>을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 340 174\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표\"><title>도형 가 나 다의 변 길이와 각 크기가 같은지 나타낸 조건표</title><rect x=\"4\" y=\"4\" width=\"332\" height=\"164\" rx=\"11\" fill=\"#fff\" stroke=\"#abc2d5\" stroke-width=\"2\"/><rect x=\"5\" y=\"5\" width=\"330\" height=\"39\" rx=\"10\" fill=\"#e3edf8\"/><text x=\"56\" y=\"31\" text-anchor=\"middle\" font-size=\"16\" font-weight=\"700\" fill=\"#253d56\">도형</text><text x=\"169\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">변의 길이가</text><text x=\"169\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><text x=\"281\" y=\"22\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">각의 크기가</text><text x=\"281\" y=\"38\" text-anchor=\"middle\" font-size=\"14\" font-weight=\"700\" fill=\"#253d56\">모두</text><rect x=\"5\" y=\"44\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"70\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">가</text><text x=\"169\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"70\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"84\" x2=\"333\" y2=\"84\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"84\" width=\"330\" height=\"40\" fill=\"#fff\"/><text x=\"56\" y=\"110\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">나</text><text x=\"169\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><text x=\"281\" y=\"110\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같지 않음</text><line x1=\"8\" y1=\"124\" x2=\"333\" y2=\"124\" stroke=\"#e1e9f2\"/><rect x=\"5\" y=\"124\" width=\"330\" height=\"40\" fill=\"#f5f9fd\"/><text x=\"56\" y=\"150\" text-anchor=\"middle\" font-size=\"19\" font-weight=\"700\" fill=\"#164f86\">다</text><text x=\"169\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><text x=\"281\" y=\"150\" text-anchor=\"middle\" font-size=\"16\" fill=\"#243b55\">같음</text><line x1=\"8\" y1=\"164\" x2=\"333\" y2=\"164\" stroke=\"#e1e9f2\"/></svg>",
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "나"
    }
   ],
   "answer": 2,
   "explain": "나는 변의 길이도, 각의 크기도 모두 같지 않아요."
  }
 ],
 "P28": [
  {
   "id": "P28-01",
   "level": 2,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄴ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"사각형과 표시된 꼭짓점 ㄴ\"><title>사각형과 표시된 꼭짓점 ㄴ</title><polygon points=\"120.0,34.0 190.0,104.0 120.0,174.0 50.0,104.0\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"120.0\" cy=\"34.0\" r=\"4\" fill=\"#24567d\"/><text x=\"120.0\" y=\"18.4\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"190.0\" cy=\"104.0\" r=\"7\" fill=\"#ed6347\"/><text x=\"209.6\" y=\"108.0\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"120.0\" cy=\"174.0\" r=\"4\" fill=\"#24567d\"/><text x=\"120.0\" y=\"197.6\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"50.0\" cy=\"104.0\" r=\"4\" fill=\"#24567d\"/><text x=\"30.4\" y=\"108.0\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄷ"
    },
    {
     "value": 1,
     "label": "ㄱ"
    },
    {
     "value": 2,
     "label": "ㄹ"
    }
   ],
   "answer": 2,
   "explain": "ㄴ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄹ이므로 1개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-02",
   "level": 2,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄹ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"오각형과 표시된 꼭짓점 ㄹ\"><title>오각형과 표시된 꼭짓점 ㄹ</title><polygon points=\"125.6,34.2 188.1,87.8 156.5,163.7 74.5,157.2 55.4,77.1\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"125.6\" cy=\"34.2\" r=\"4\" fill=\"#24567d\"/><text x=\"127.2\" y=\"18.7\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"188.1\" cy=\"87.8\" r=\"4\" fill=\"#24567d\"/><text x=\"207.2\" y=\"87.2\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"156.5\" cy=\"163.7\" r=\"4\" fill=\"#24567d\"/><text x=\"166.7\" y=\"184.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"74.5\" cy=\"157.2\" r=\"7\" fill=\"#ed6347\"/><text x=\"61.7\" y=\"176.0\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"55.4\" cy=\"77.1\" r=\"4\" fill=\"#24567d\"/><text x=\"37.3\" y=\"73.6\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄱ, ㄷ"
    },
    {
     "value": 1,
     "label": "ㄱ"
    },
    {
     "value": 2,
     "label": "ㄱ, ㄴ"
    }
   ],
   "answer": 2,
   "explain": "ㄹ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄱ, ㄴ이므로 2개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-03",
   "level": 3,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㅂ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"육각형과 표시된 꼭짓점 ㅂ\"><title>육각형과 표시된 꼭짓점 ㅂ</title><polygon points=\"131.2,34.9 185.4,79.1 174.3,148.2 108.8,173.1 54.6,128.9 65.7,59.8\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"131.2\" cy=\"34.9\" r=\"4\" fill=\"#24567d\"/><text x=\"134.3\" y=\"19.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"185.4\" cy=\"79.1\" r=\"4\" fill=\"#24567d\"/><text x=\"203.7\" y=\"76.1\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"174.3\" cy=\"148.2\" r=\"4\" fill=\"#24567d\"/><text x=\"189.5\" y=\"164.6\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"108.8\" cy=\"173.1\" r=\"4\" fill=\"#24567d\"/><text x=\"105.7\" y=\"196.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"54.6\" cy=\"128.9\" r=\"4\" fill=\"#24567d\"/><text x=\"36.3\" y=\"139.9\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text><circle cx=\"65.7\" cy=\"59.8\" r=\"7\" fill=\"#ed6347\"/><text x=\"50.5\" y=\"51.4\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅂ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄴ, ㄷ"
    },
    {
     "value": 1,
     "label": "ㄴ, ㄷ, ㅁ"
    },
    {
     "value": 2,
     "label": "ㄴ, ㄷ, ㄹ"
    }
   ],
   "answer": 2,
   "explain": "ㅂ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄴ, ㄷ, ㄹ이므로 3개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-04",
   "level": 3,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄱ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"칠각형과 표시된 꼭짓점 ㄱ\"><title>칠각형과 표시된 꼭짓점 ㄱ</title><polygon points=\"120.0,34.0 174.7,60.4 188.2,119.6 150.4,167.1 89.6,167.1 51.8,119.6 65.3,60.4\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"120.0\" cy=\"34.0\" r=\"7\" fill=\"#ed6347\"/><text x=\"120.0\" y=\"18.4\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"174.7\" cy=\"60.4\" r=\"4\" fill=\"#24567d\"/><text x=\"190.1\" y=\"52.1\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"188.2\" cy=\"119.6\" r=\"4\" fill=\"#24567d\"/><text x=\"207.4\" y=\"127.9\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"150.4\" cy=\"167.1\" r=\"4\" fill=\"#24567d\"/><text x=\"158.9\" y=\"188.7\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"89.6\" cy=\"167.1\" r=\"4\" fill=\"#24567d\"/><text x=\"81.1\" y=\"188.7\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text><circle cx=\"51.8\" cy=\"119.6\" r=\"4\" fill=\"#24567d\"/><text x=\"32.6\" y=\"127.9\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅂ</text><circle cx=\"65.3\" cy=\"60.4\" r=\"4\" fill=\"#24567d\"/><text x=\"49.9\" y=\"52.1\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅅ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄷ, ㄹ, ㅁ"
    },
    {
     "value": 1,
     "label": "ㄷ, ㄹ, ㅁ, ㅅ"
    },
    {
     "value": 2,
     "label": "ㄷ, ㄹ, ㅁ, ㅂ"
    }
   ],
   "answer": 2,
   "explain": "ㄱ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄷ, ㄹ, ㅁ, ㅂ이므로 4개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-05",
   "level": 3,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄴ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"팔각형과 표시된 꼭짓점 ㄴ\"><title>팔각형과 표시된 꼭짓점 ㄴ</title><polygon points=\"125.6,34.2 173.3,58.6 189.8,109.6 165.4,157.3 114.4,173.8 66.7,149.4 50.2,98.4 74.6,50.7\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"125.6\" cy=\"34.2\" r=\"4\" fill=\"#24567d\"/><text x=\"127.2\" y=\"18.7\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"173.3\" cy=\"58.6\" r=\"7\" fill=\"#ed6347\"/><text x=\"188.2\" y=\"49.9\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"189.8\" cy=\"109.6\" r=\"4\" fill=\"#24567d\"/><text x=\"209.3\" y=\"115.2\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"165.4\" cy=\"157.3\" r=\"4\" fill=\"#24567d\"/><text x=\"178.1\" y=\"176.2\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"114.4\" cy=\"173.8\" r=\"4\" fill=\"#24567d\"/><text x=\"112.8\" y=\"197.3\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text><circle cx=\"66.7\" cy=\"149.4\" r=\"4\" fill=\"#24567d\"/><text x=\"51.8\" y=\"166.1\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅂ</text><circle cx=\"50.2\" cy=\"98.4\" r=\"4\" fill=\"#24567d\"/><text x=\"30.7\" y=\"100.8\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅅ</text><circle cx=\"74.6\" cy=\"50.7\" r=\"4\" fill=\"#24567d\"/><text x=\"61.9\" y=\"39.8\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅇ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄹ, ㅁ, ㅂ, ㅅ"
    },
    {
     "value": 1,
     "label": "ㄱ, ㄹ, ㅁ, ㅂ, ㅅ"
    },
    {
     "value": 2,
     "label": "ㄹ, ㅁ, ㅂ, ㅅ, ㅇ"
    }
   ],
   "answer": 2,
   "explain": "ㄴ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄹ, ㅁ, ㅂ, ㅅ, ㅇ이므로 5개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-06",
   "level": 2,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄴ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"오각형과 표시된 꼭짓점 ㄴ\"><title>오각형과 표시된 꼭짓점 ㄴ</title><polygon points=\"131.2,34.9 189.2,93.3 151.6,166.5 70.4,153.4 57.7,72.0\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"131.2\" cy=\"34.9\" r=\"4\" fill=\"#24567d\"/><text x=\"134.3\" y=\"19.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"189.2\" cy=\"93.3\" r=\"7\" fill=\"#ed6347\"/><text x=\"208.5\" y=\"94.2\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"151.6\" cy=\"166.5\" r=\"4\" fill=\"#24567d\"/><text x=\"160.4\" y=\"188.0\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"70.4\" cy=\"153.4\" r=\"4\" fill=\"#24567d\"/><text x=\"56.5\" y=\"171.2\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"57.7\" cy=\"72.0\" r=\"4\" fill=\"#24567d\"/><text x=\"40.3\" y=\"67.1\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄹ"
    },
    {
     "value": 1,
     "label": "ㄹ, ㅁ"
    },
    {
     "value": 2,
     "label": "ㄱ, ㄹ"
    }
   ],
   "answer": 1,
   "explain": "ㄴ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄹ, ㅁ이므로 2개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-07",
   "level": 3,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄴ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"육각형과 표시된 꼭짓점 ㄴ\"><title>육각형과 표시된 꼭짓점 ㄴ</title><polygon points=\"120.0,34.0 180.6,69.0 180.6,139.0 120.0,174.0 59.4,139.0 59.4,69.0\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"120.0\" cy=\"34.0\" r=\"4\" fill=\"#24567d\"/><text x=\"120.0\" y=\"18.4\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"180.6\" cy=\"69.0\" r=\"7\" fill=\"#ed6347\"/><text x=\"197.6\" y=\"63.2\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"180.6\" cy=\"139.0\" r=\"4\" fill=\"#24567d\"/><text x=\"197.6\" y=\"152.8\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"120.0\" cy=\"174.0\" r=\"4\" fill=\"#24567d\"/><text x=\"120.0\" y=\"197.6\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"59.4\" cy=\"139.0\" r=\"4\" fill=\"#24567d\"/><text x=\"42.4\" y=\"152.8\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text><circle cx=\"59.4\" cy=\"69.0\" r=\"4\" fill=\"#24567d\"/><text x=\"42.4\" y=\"63.2\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅂ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄹ, ㅁ, ㅂ"
    },
    {
     "value": 1,
     "label": "ㄱ, ㄹ, ㅁ"
    },
    {
     "value": 2,
     "label": "ㄹ, ㅁ"
    }
   ],
   "answer": 0,
   "explain": "ㄴ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄹ, ㅁ, ㅂ이므로 3개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-08",
   "level": 3,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄴ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"칠각형과 표시된 꼭짓점 ㄴ\"><title>칠각형과 표시된 꼭짓점 ㄴ</title><polygon points=\"125.6,34.2 178.0,64.9 186.8,125.0 145.2,169.3 84.7,164.4 50.7,114.1 68.9,56.1\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"125.6\" cy=\"34.2\" r=\"4\" fill=\"#24567d\"/><text x=\"127.2\" y=\"18.7\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"178.0\" cy=\"64.9\" r=\"7\" fill=\"#ed6347\"/><text x=\"194.3\" y=\"57.9\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"186.8\" cy=\"125.0\" r=\"4\" fill=\"#24567d\"/><text x=\"205.5\" y=\"134.9\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"145.2\" cy=\"169.3\" r=\"4\" fill=\"#24567d\"/><text x=\"152.3\" y=\"191.6\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"84.7\" cy=\"164.4\" r=\"4\" fill=\"#24567d\"/><text x=\"74.8\" y=\"185.4\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text><circle cx=\"50.7\" cy=\"114.1\" r=\"4\" fill=\"#24567d\"/><text x=\"31.3\" y=\"120.9\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅂ</text><circle cx=\"68.9\" cy=\"56.1\" r=\"4\" fill=\"#24567d\"/><text x=\"54.6\" y=\"46.7\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅅ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄹ, ㅁ, ㅂ"
    },
    {
     "value": 1,
     "label": "ㄱ, ㄹ, ㅁ, ㅂ"
    },
    {
     "value": 2,
     "label": "ㄹ, ㅁ, ㅂ, ㅅ"
    }
   ],
   "answer": 2,
   "explain": "ㄴ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄹ, ㅁ, ㅂ, ㅅ이므로 4개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-09",
   "level": 3,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄴ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"팔각형과 표시된 꼭짓점 ㄴ\"><title>팔각형과 표시된 꼭짓점 ㄴ</title><polygon points=\"131.2,34.9 176.8,63.0 189.1,115.2 161.0,160.8 108.8,173.1 63.2,145.0 50.9,92.8 79.0,47.2\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"131.2\" cy=\"34.9\" r=\"4\" fill=\"#24567d\"/><text x=\"134.3\" y=\"19.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"176.8\" cy=\"63.0\" r=\"7\" fill=\"#ed6347\"/><text x=\"192.6\" y=\"55.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"189.1\" cy=\"115.2\" r=\"4\" fill=\"#24567d\"/><text x=\"208.5\" y=\"122.3\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"161.0\" cy=\"160.8\" r=\"4\" fill=\"#24567d\"/><text x=\"172.5\" y=\"180.6\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"108.8\" cy=\"173.1\" r=\"4\" fill=\"#24567d\"/><text x=\"105.7\" y=\"196.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text><circle cx=\"63.2\" cy=\"145.0\" r=\"4\" fill=\"#24567d\"/><text x=\"47.4\" y=\"160.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅂ</text><circle cx=\"50.9\" cy=\"92.8\" r=\"4\" fill=\"#24567d\"/><text x=\"31.5\" y=\"93.7\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅅ</text><circle cx=\"79.0\" cy=\"47.2\" r=\"4\" fill=\"#24567d\"/><text x=\"67.5\" y=\"35.4\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅇ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄹ, ㅁ, ㅂ, ㅅ, ㅇ"
    },
    {
     "value": 1,
     "label": "ㄱ, ㄹ, ㅁ, ㅂ, ㅅ"
    },
    {
     "value": 2,
     "label": "ㄹ, ㅁ, ㅂ, ㅅ"
    }
   ],
   "answer": 0,
   "explain": "ㄴ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄹ, ㅁ, ㅂ, ㅅ, ㅇ이므로 5개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-10",
   "level": 2,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄹ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"사각형과 표시된 꼭짓점 ㄹ\"><title>사각형과 표시된 꼭짓점 ㄹ</title><polygon points=\"120.0,34.0 190.0,104.0 120.0,174.0 50.0,104.0\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"120.0\" cy=\"34.0\" r=\"4\" fill=\"#24567d\"/><text x=\"120.0\" y=\"18.4\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"190.0\" cy=\"104.0\" r=\"4\" fill=\"#24567d\"/><text x=\"209.6\" y=\"108.0\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"120.0\" cy=\"174.0\" r=\"4\" fill=\"#24567d\"/><text x=\"120.0\" y=\"197.6\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"50.0\" cy=\"104.0\" r=\"7\" fill=\"#ed6347\"/><text x=\"30.4\" y=\"108.0\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄷ"
    },
    {
     "value": 1,
     "label": "ㄱ"
    },
    {
     "value": 2,
     "label": "ㄴ"
    }
   ],
   "answer": 2,
   "explain": "ㄹ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄴ이므로 1개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-11",
   "level": 3,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄹ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"육각형과 표시된 꼭짓점 ㄹ\"><title>육각형과 표시된 꼭짓점 ㄹ</title><polygon points=\"125.6,34.2 183.2,74.0 177.6,143.7 114.4,173.8 56.8,134.0 62.4,64.3\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"125.6\" cy=\"34.2\" r=\"4\" fill=\"#24567d\"/><text x=\"127.2\" y=\"18.7\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"183.2\" cy=\"74.0\" r=\"4\" fill=\"#24567d\"/><text x=\"200.9\" y=\"69.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"177.6\" cy=\"143.7\" r=\"4\" fill=\"#24567d\"/><text x=\"193.8\" y=\"158.9\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"114.4\" cy=\"173.8\" r=\"7\" fill=\"#ed6347\"/><text x=\"112.8\" y=\"197.3\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"56.8\" cy=\"134.0\" r=\"4\" fill=\"#24567d\"/><text x=\"39.1\" y=\"146.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text><circle cx=\"62.4\" cy=\"64.3\" r=\"4\" fill=\"#24567d\"/><text x=\"46.2\" y=\"57.1\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅂ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄱ, ㄴ, ㄷ"
    },
    {
     "value": 1,
     "label": "ㄱ, ㄴ"
    },
    {
     "value": 2,
     "label": "ㄱ, ㄴ, ㅂ"
    }
   ],
   "answer": 2,
   "explain": "ㄹ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄱ, ㄴ, ㅂ이므로 3개의 대각선을 그을 수 있어요."
  },
  {
   "id": "P28-12",
   "level": 3,
   "format": "choice",
   "prompt": "<b>꼭짓점 ㄷ</b>에서 대각선을 그으려고 해요. 이을 수 있는 꼭짓점을 <b>빠짐없이</b> 적은 것을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 240 220\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"칠각형과 표시된 꼭짓점 ㄷ\"><title>칠각형과 표시된 꼭짓점 ㄷ</title><polygon points=\"131.2,34.9 181.0,69.6 184.9,130.3 139.9,171.1 80.0,161.4 50.1,108.5 72.9,52.2\" fill=\"#f0f7fe\" stroke=\"#2c557e\" stroke-width=\"3\"/><circle cx=\"131.2\" cy=\"34.9\" r=\"4\" fill=\"#24567d\"/><text x=\"134.3\" y=\"19.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄱ</text><circle cx=\"181.0\" cy=\"69.6\" r=\"4\" fill=\"#24567d\"/><text x=\"198.1\" y=\"64.0\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄴ</text><circle cx=\"184.9\" cy=\"130.3\" r=\"7\" fill=\"#ed6347\"/><text x=\"203.1\" y=\"141.6\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄷ</text><circle cx=\"139.9\" cy=\"171.1\" r=\"4\" fill=\"#24567d\"/><text x=\"145.5\" y=\"193.9\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㄹ</text><circle cx=\"80.0\" cy=\"161.4\" r=\"4\" fill=\"#24567d\"/><text x=\"68.8\" y=\"181.5\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅁ</text><circle cx=\"50.1\" cy=\"108.5\" r=\"4\" fill=\"#24567d\"/><text x=\"30.6\" y=\"113.8\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅂ</text><circle cx=\"72.9\" cy=\"52.2\" r=\"4\" fill=\"#24567d\"/><text x=\"59.7\" y=\"41.7\" font-size=\"20\" font-weight=\"700\" fill=\"#1e3853\" text-anchor=\"middle\">ㅅ</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "ㄱ, ㅁ, ㅂ, ㅅ"
    },
    {
     "value": 1,
     "label": "ㄱ, ㅁ, ㅂ"
    },
    {
     "value": 2,
     "label": "ㄱ, ㄴ, ㅁ, ㅂ"
    }
   ],
   "answer": 0,
   "explain": "ㄷ 자신과 양옆에 이웃한 꼭짓점은 제외해요. 나머지는 ㄱ, ㅁ, ㅂ, ㅅ이므로 4개의 대각선을 그을 수 있어요."
  }
 ],
 "P29": [
  {
   "id": "P29-01",
   "level": 2,
   "format": "number",
   "prompt": "오각형과 사각형에 대각선을 모두 그었어요. 두 도형의 대각선은 모두 몇 개일까요?",
   "answer": 7,
   "unit": "개",
   "explain": "오각형 5개 + 사각형 2개 = 7개예요."
  },
  {
   "id": "P29-02",
   "level": 2,
   "format": "number",
   "prompt": "육각형과 오각형에 대각선을 모두 그었어요. 두 도형의 대각선은 모두 몇 개일까요?",
   "answer": 14,
   "unit": "개",
   "explain": "육각형 9개 + 오각형 5개 = 14개예요."
  },
  {
   "id": "P29-03",
   "level": 1,
   "format": "number",
   "prompt": "삼각형 한 개와 육각형 한 개에 대각선을 모두 그었어요. 대각선은 모두 몇 개일까요?",
   "answer": 9,
   "unit": "개",
   "explain": "삼각형 0개 + 육각형 9개 = 9개예요."
  },
  {
   "id": "P29-04",
   "level": 2,
   "format": "number",
   "prompt": "육각형은 사각형보다 대각선이 몇 개 더 많을까요?",
   "answer": 7,
   "unit": "개",
   "explain": "육각형 9개 - 사각형 2개 = 7개예요."
  },
  {
   "id": "P29-05",
   "level": 2,
   "format": "number",
   "prompt": "육각형은 오각형보다 대각선이 몇 개 더 많을까요?",
   "answer": 4,
   "unit": "개",
   "explain": "육각형 9개 - 오각형 5개 = 4개예요."
  },
  {
   "id": "P29-06",
   "level": 2,
   "format": "number",
   "prompt": "오각형은 사각형보다 대각선이 몇 개 더 많을까요?",
   "answer": 3,
   "unit": "개",
   "explain": "오각형 5개 - 사각형 2개 = 3개예요."
  },
  {
   "id": "P29-07",
   "level": 3,
   "format": "number",
   "prompt": "사각형 2개와 오각형 1개의 대각선을 모두 그으면 총 몇 개일까요?",
   "answer": 9,
   "unit": "개",
   "explain": "사각형 2개에서 2×2=4개, 오각형에서 5개이므로 9개예요."
  },
  {
   "id": "P29-08",
   "level": 2,
   "format": "number",
   "prompt": "육각형 2개의 대각선을 모두 그으면 총 몇 개일까요?",
   "answer": 18,
   "unit": "개",
   "explain": "육각형 1개는 9개이므로 9×2=18개예요."
  },
  {
   "id": "P29-09",
   "level": 2,
   "format": "number",
   "prompt": "사각형 3개의 대각선을 모두 그으면 총 몇 개일까요?",
   "answer": 6,
   "unit": "개",
   "explain": "사각형 1개는 2개이므로 2×3=6개예요."
  },
  {
   "id": "P29-10",
   "level": 3,
   "format": "number",
   "prompt": "삼각형 2개와 오각형 2개의 대각선을 모두 그으면 몇 개일까요?",
   "answer": 10,
   "unit": "개",
   "explain": "삼각형은 0개, 오각형은 각 5개이므로 5×2=10개예요."
  },
  {
   "id": "P29-11",
   "level": 2,
   "format": "choice",
   "prompt": "대각선의 수가 가장 <b>많은</b> 다각형은?",
   "choices": [
    {
     "value": 0,
     "label": "오각형"
    },
    {
     "value": 1,
     "label": "육각형"
    },
    {
     "value": 2,
     "label": "삼각형"
    }
   ],
   "answer": 1,
   "explain": "삼각형 0개, 오각형 5개, 육각형 9개이므로 육각형이 가장 많아요."
  },
  {
   "id": "P29-12",
   "level": 1,
   "format": "choice",
   "prompt": "대각선을 <b>하나도 그을 수 없는</b> 다각형은?",
   "choices": [
    {
     "value": 0,
     "label": "오각형"
    },
    {
     "value": 1,
     "label": "사각형"
    },
    {
     "value": 2,
     "label": "삼각형"
    }
   ],
   "answer": 2,
   "explain": "삼각형에서는 모든 꼭짓점이 서로 이웃하기 때문에 대각선이 0개예요."
  }
 ],
 "P30": [
  {
   "id": "P30-01",
   "level": 2,
   "format": "number",
   "prompt": "그림에서 사용한 <b>모양 조각은 모두 몇 개</b>일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0\" fill=\"#ea6251\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,175.0 48.3,136.5 48.3,59.5 115.0,21.0\" fill=\"#ea6251\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 2,
   "unit": "개",
   "explain": "흰 선으로 나뉜 조각을 세어 보면 사다리꼴 2개예요."
  },
  {
   "id": "P30-02",
   "level": 2,
   "format": "number",
   "prompt": "그림에서 <b>파란색 마름모 조각</b>은 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5 181.7,136.5\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0 48.3,136.5\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5 115.0,21.0\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 3,
   "unit": "개",
   "explain": "그림은 마름모 3개로 채워져 있어요. 마름모 조각은 3개예요."
  },
  {
   "id": "P30-03",
   "level": 2,
   "format": "number",
   "prompt": "그림에서 <b>빨간색 사다리꼴 조각</b>은 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0\" fill=\"#ea6251\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 1,
   "unit": "개",
   "explain": "그림은 사다리꼴 1개, 마름모 1개, 정삼각형 1개로 채워져 있어요. 사다리꼴 조각은 1개예요."
  },
  {
   "id": "P30-04",
   "level": 2,
   "format": "number",
   "prompt": "그림에서 <b>초록색 정삼각형 조각</b>은 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5 181.7,136.5\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0 48.3,136.5\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 2,
   "unit": "개",
   "explain": "그림은 마름모 2개, 정삼각형 2개로 채워져 있어요. 정삼각형 조각은 2개예요."
  },
  {
   "id": "P30-05",
   "level": 3,
   "format": "number",
   "prompt": "그림의 파란색 마름모를 모두 정삼각형으로 바꾸면, 사용한 조각은 모두 몇 개가 될까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5 181.7,136.5\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,175.0 48.3,136.5 48.3,59.5 115.0,21.0\" fill=\"#ea6251\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 4,
   "unit": "개",
   "explain": "지금은 사다리꼴 1개, 마름모 1개, 정삼각형 1개로 모두 3개예요. 마름모 1개를 정삼각형 2개로 바꾸면 조각이 1개 늘어나서 3 + 1 = 4(개)가 돼요."
  },
  {
   "id": "P30-06",
   "level": 3,
   "format": "number",
   "prompt": "그림의 빨간색 사다리꼴을 모두 정삼각형으로 바꾸면, 사용한 조각은 모두 몇 개가 될까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0\" fill=\"#ea6251\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 6,
   "unit": "개",
   "explain": "지금은 사다리꼴 1개, 정삼각형 3개로 모두 4개예요. 사다리꼴 1개를 정삼각형 3개로 바꾸면 조각이 2개 늘어나서 4 + 2 = 6(개)가 돼요."
  },
  {
   "id": "P30-07",
   "level": 2,
   "format": "number",
   "prompt": "그림에서 사용한 <b>모양 조각은 모두 몇 개</b>일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 6,
   "unit": "개",
   "explain": "흰 선으로 나뉜 조각을 세어 보면 정삼각형 6개예요."
  },
  {
   "id": "P30-08",
   "level": 2,
   "format": "number",
   "prompt": "그림에서 <b>초록색 정삼각형 조각</b>은 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5 115.0,175.0\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5 115.0,21.0\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 2,
   "unit": "개",
   "explain": "그림은 마름모 2개, 정삼각형 2개로 채워져 있어요. 정삼각형 조각은 2개예요."
  },
  {
   "id": "P30-09",
   "level": 2,
   "format": "number",
   "prompt": "그림에서 <b>파란색 마름모 조각</b>은 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0 48.3,136.5\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5 115.0,21.0\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 2,
   "unit": "개",
   "explain": "그림은 마름모 2개, 정삼각형 2개로 채워져 있어요. 마름모 조각은 2개예요."
  },
  {
   "id": "P30-10",
   "level": 3,
   "format": "number",
   "prompt": "그림의 파란색 마름모를 모두 정삼각형으로 바꾸면, 사용한 조각은 모두 몇 개가 될까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5 181.7,136.5\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"#ea6251\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 4,
   "unit": "개",
   "explain": "지금은 사다리꼴 1개, 마름모 1개, 정삼각형 1개로 모두 3개예요. 마름모 1개를 정삼각형 2개로 바꾸면 조각이 1개 늘어나서 3 + 1 = 4(개)가 돼요."
  },
  {
   "id": "P30-11",
   "level": 2,
   "format": "number",
   "prompt": "그림에서 <b>빨간색 사다리꼴 조각</b>은 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5\" fill=\"#ea6251\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5 115.0,21.0\" fill=\"#3885df\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 1,
   "unit": "개",
   "explain": "그림은 사다리꼴 1개, 마름모 1개, 정삼각형 1개로 채워져 있어요. 사다리꼴 조각은 1개예요."
  },
  {
   "id": "P30-12",
   "level": 2,
   "format": "number",
   "prompt": "그림에서 사용한 <b>모양 조각은 모두 몇 개</b>일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림\"><title>정육각형을 색깔별 정삼각형 마름모 사다리꼴 조각으로 채운 그림</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0\" fill=\"#42b867\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,175.0 48.3,136.5 48.3,59.5 115.0,21.0\" fill=\"#ea6251\" stroke=\"#fff\" stroke-width=\"3.5\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><rect x=\"10\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#42b867\"/><text x=\"27\" y=\"214\" font-size=\"13\" fill=\"#34445a\">정삼각형</text><rect x=\"86\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#3885df\"/><text x=\"103\" y=\"214\" font-size=\"13\" fill=\"#34445a\">마름모</text><rect x=\"162\" y=\"204\" width=\"15\" height=\"11\" rx=\"2\" fill=\"#ea6251\"/><text x=\"179\" y=\"214\" font-size=\"13\" fill=\"#34445a\">사다리꼴</text></svg>",
   "answer": 4,
   "unit": "개",
   "explain": "흰 선으로 나뉜 조각을 세어 보면 사다리꼴 1개, 정삼각형 3개, 모두 4개예요."
  }
 ],
 "P31": [
  {
   "id": "P31-01",
   "level": 2,
   "format": "choice",
   "prompt": "정육각형을 <b>빈틈없이 겹치지 않게 채울 수 있는</b> 모양 조각의 조합을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"작은 정삼각형 6칸으로 나눈 정육각형\"><title>작은 정삼각형 6칸으로 나눈 정육각형</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><text x=\"115\" y=\"215\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"700\" fill=\"#5a4630\">작은 정삼각형 6칸 크기</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "정삼각형 3개, 마름모 1개"
    },
    {
     "value": 1,
     "label": "정삼각형 2개, 마름모 1개, 사다리꼴 1개"
    },
    {
     "value": 2,
     "label": "정삼각형 6개"
    }
   ],
   "answer": 2,
   "explain": "작은 정삼각형을 1칸으로 보면, 마름모는 2칸, 사다리꼴은 3칸이에요. 정육각형은 6칸이므로 정삼각형 6개로 채울 수 있어요."
  },
  {
   "id": "P31-02",
   "level": 2,
   "format": "choice",
   "prompt": "정육각형을 <b>빈틈없이 겹치지 않게 채울 수 있는</b> 모양 조각의 조합을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"작은 정삼각형 6칸으로 나눈 정육각형\"><title>작은 정삼각형 6칸으로 나눈 정육각형</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><text x=\"115\" y=\"215\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"700\" fill=\"#5a4630\">작은 정삼각형 6칸 크기</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "정삼각형 4개, 마름모 1개"
    },
    {
     "value": 1,
     "label": "정삼각형 5개"
    },
    {
     "value": 2,
     "label": "정삼각형 2개, 마름모 1개, 사다리꼴 1개"
    }
   ],
   "answer": 0,
   "explain": "작은 정삼각형을 1칸으로 보면, 마름모는 2칸, 사다리꼴은 3칸이에요. 정육각형은 6칸이므로 정삼각형 4개, 마름모 1개로 채울 수 있어요."
  },
  {
   "id": "P31-03",
   "level": 2,
   "format": "choice",
   "prompt": "정육각형을 <b>빈틈없이 겹치지 않게 채울 수 있는</b> 모양 조각의 조합을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"작은 정삼각형 6칸으로 나눈 정육각형\"><title>작은 정삼각형 6칸으로 나눈 정육각형</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><text x=\"115\" y=\"215\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"700\" fill=\"#5a4630\">작은 정삼각형 6칸 크기</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "정삼각형 2개, 마름모 2개"
    },
    {
     "value": 1,
     "label": "정삼각형 2개, 마름모 1개, 사다리꼴 1개"
    },
    {
     "value": 2,
     "label": "정삼각형 3개, 마름모 1개"
    }
   ],
   "answer": 0,
   "explain": "작은 정삼각형을 1칸으로 보면, 마름모는 2칸, 사다리꼴은 3칸이에요. 정육각형은 6칸이므로 정삼각형 2개, 마름모 2개로 채울 수 있어요."
  },
  {
   "id": "P31-04",
   "level": 2,
   "format": "choice",
   "prompt": "정육각형을 <b>빈틈없이 겹치지 않게 채울 수 있는</b> 모양 조각의 조합을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"작은 정삼각형 6칸으로 나눈 정육각형\"><title>작은 정삼각형 6칸으로 나눈 정육각형</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><text x=\"115\" y=\"215\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"700\" fill=\"#5a4630\">작은 정삼각형 6칸 크기</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "정삼각형 2개, 마름모 1개, 사다리꼴 1개"
    },
    {
     "value": 1,
     "label": "마름모 3개"
    },
    {
     "value": 2,
     "label": "정삼각형 5개"
    }
   ],
   "answer": 1,
   "explain": "작은 정삼각형을 1칸으로 보면, 마름모는 2칸, 사다리꼴은 3칸이에요. 정육각형은 6칸이므로 마름모 3개로 채울 수 있어요."
  },
  {
   "id": "P31-05",
   "level": 2,
   "format": "choice",
   "prompt": "정육각형을 <b>빈틈없이 겹치지 않게 채울 수 있는</b> 모양 조각의 조합을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"작은 정삼각형 6칸으로 나눈 정육각형\"><title>작은 정삼각형 6칸으로 나눈 정육각형</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><text x=\"115\" y=\"215\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"700\" fill=\"#5a4630\">작은 정삼각형 6칸 크기</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "정삼각형 3개, 사다리꼴 1개"
    },
    {
     "value": 1,
     "label": "정삼각형 2개, 마름모 1개, 사다리꼴 1개"
    },
    {
     "value": 2,
     "label": "정삼각형 3개, 마름모 1개"
    }
   ],
   "answer": 0,
   "explain": "작은 정삼각형을 1칸으로 보면, 마름모는 2칸, 사다리꼴은 3칸이에요. 정육각형은 6칸이므로 정삼각형 3개, 사다리꼴 1개로 채울 수 있어요."
  },
  {
   "id": "P31-06",
   "level": 2,
   "format": "choice",
   "prompt": "정육각형을 <b>빈틈없이 겹치지 않게 채울 수 있는</b> 모양 조각의 조합을 고르세요.",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 235 225\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"작은 정삼각형 6칸으로 나눈 정육각형\"><title>작은 정삼각형 6칸으로 나눈 정육각형</title><rect x=\"8\" y=\"5\" width=\"214\" height=\"191\" rx=\"16\" fill=\"#fbfaf5\"/><polygon points=\"115.0,98.0 115.0,21.0 181.7,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,59.5 181.7,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 181.7,136.5 115.0,175.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 115.0,175.0 48.3,136.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,136.5 48.3,59.5\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,98.0 48.3,59.5 115.0,21.0\" fill=\"#fff6dc\" stroke=\"#c9b48a\" stroke-width=\"2\" stroke-dasharray=\"5 4\" stroke-linejoin=\"round\"/><polygon points=\"115.0,21.0 181.7,59.5 181.7,136.5 115.0,175.0 48.3,136.5 48.3,59.5\" fill=\"none\" stroke=\"#33465b\" stroke-width=\"2.5\"/><text x=\"115\" y=\"215\" text-anchor=\"middle\" font-size=\"15\" font-weight=\"700\" fill=\"#5a4630\">작은 정삼각형 6칸 크기</text></svg>",
   "choices": [
    {
     "value": 0,
     "label": "정삼각형 1개, 마름모 1개, 사다리꼴 1개"
    },
    {
     "value": 1,
     "label": "정삼각형 5개"
    },
    {
     "value": 2,
     "label": "정삼각형 2개, 마름모 1개, 사다리꼴 1개"
    }
   ],
   "answer": 0,
   "explain": "작은 정삼각형을 1칸으로 보면, 마름모는 2칸, 사다리꼴은 3칸이에요. 정육각형은 6칸이므로 정삼각형 1개, 마름모 1개, 사다리꼴 1개로 채울 수 있어요."
  },
  {
   "id": "P31-07",
   "level": 3,
   "format": "choice",
   "prompt": "정육각형을 채우는 세 가지 방법이에요. <b>모양 조각을 가장 적은 개수</b>로 사용하는 방법은?",
   "list": [
    "가: 정삼각형 6개",
    "나: 마름모 3개",
    "다: 사다리꼴 2개"
   ],
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "나"
    }
   ],
   "answer": 1,
   "explain": "가, 나, 다 방법에서 사용하는 조각 수는 각각 6개, 3개, 2개예요. 따라서 다 방법이에요."
  },
  {
   "id": "P31-08",
   "level": 3,
   "format": "choice",
   "prompt": "정육각형을 채우는 세 가지 방법이에요. <b>모양 조각을 가장 많은 개수</b>로 사용하는 방법은?",
   "list": [
    "가: 정삼각형 4개, 마름모 1개",
    "나: 정삼각형 2개, 마름모 2개",
    "다: 마름모 3개"
   ],
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "나"
    }
   ],
   "answer": 0,
   "explain": "가, 나, 다 방법에서 사용하는 조각 수는 각각 5개, 4개, 3개예요. 따라서 가 방법이에요."
  },
  {
   "id": "P31-09",
   "level": 3,
   "format": "choice",
   "prompt": "정육각형을 채우는 세 가지 방법이에요. <b>모양 조각을 가장 많은 개수</b>로 사용하는 방법은?",
   "list": [
    "가: 사다리꼴 2개",
    "나: 정삼각형 1개, 마름모 1개, 사다리꼴 1개",
    "다: 정삼각형 2개, 마름모 2개"
   ],
   "choices": [
    {
     "value": 0,
     "label": "나"
    },
    {
     "value": 1,
     "label": "가"
    },
    {
     "value": 2,
     "label": "다"
    }
   ],
   "answer": 2,
   "explain": "가, 나, 다 방법에서 사용하는 조각 수는 각각 2개, 3개, 4개예요. 따라서 다 방법이에요."
  },
  {
   "id": "P31-10",
   "level": 3,
   "format": "choice",
   "prompt": "정육각형을 채우는 세 가지 방법이에요. <b>모양 조각을 가장 적은 개수</b>로 사용하는 방법은?",
   "list": [
    "가: 정삼각형 6개",
    "나: 정삼각형 4개, 마름모 1개",
    "다: 정삼각형 1개, 마름모 1개, 사다리꼴 1개"
   ],
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "나"
    }
   ],
   "answer": 1,
   "explain": "가, 나, 다 방법에서 사용하는 조각 수는 각각 6개, 5개, 3개예요. 따라서 다 방법이에요."
  },
  {
   "id": "P31-11",
   "level": 3,
   "format": "choice",
   "prompt": "정육각형을 채우는 세 가지 방법이에요. <b>모양 조각을 가장 적은 개수</b>로 사용하는 방법은?",
   "list": [
    "가: 정삼각형 2개, 마름모 2개",
    "나: 정삼각형 3개, 사다리꼴 1개",
    "다: 사다리꼴 2개"
   ],
   "choices": [
    {
     "value": 0,
     "label": "가"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "나"
    }
   ],
   "answer": 1,
   "explain": "가, 나, 다 방법에서 사용하는 조각 수는 각각 4개, 4개, 2개예요. 따라서 다 방법이에요."
  },
  {
   "id": "P31-12",
   "level": 3,
   "format": "choice",
   "prompt": "정육각형을 채우는 세 가지 방법이에요. <b>모양 조각을 가장 많은 개수</b>로 사용하는 방법은?",
   "list": [
    "가: 정삼각형 4개, 마름모 1개",
    "나: 정삼각형 6개",
    "다: 정삼각형 1개, 마름모 1개, 사다리꼴 1개"
   ],
   "choices": [
    {
     "value": 0,
     "label": "나"
    },
    {
     "value": 1,
     "label": "다"
    },
    {
     "value": 2,
     "label": "가"
    }
   ],
   "answer": 0,
   "explain": "가, 나, 다 방법에서 사용하는 조각 수는 각각 5개, 6개, 3개예요. 따라서 나 방법이에요."
  }
 ],
 "P32": [
  {
   "id": "P32-01",
   "level": 2,
   "format": "number",
   "prompt": "표에서 <b>□ 안에 들어갈 대각선의 수</b>는 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 294 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"290\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">사각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">오각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">육각형</text><rect x=\"242\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">칠각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#fff2c9\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">□</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">5</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">9</text><rect x=\"242\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">14</text></svg>",
   "answer": 2,
   "unit": "개",
   "explain": "다각형의 변이 1개씩 늘 때마다 늘어나는 대각선의 수가 1씩 커져요. 사각형에서 오각형이 되면 3개 늘어나므로 5 − 3 = 2(개)예요."
  },
  {
   "id": "P32-02",
   "level": 2,
   "format": "number",
   "prompt": "표에서 <b>□ 안에 들어갈 대각선의 수</b>는 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 294 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"290\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">사각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">오각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">육각형</text><rect x=\"242\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">칠각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">2</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#fff2c9\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">□</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">9</text><rect x=\"242\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">14</text></svg>",
   "answer": 5,
   "unit": "개",
   "explain": "다각형의 변이 1개씩 늘 때마다 늘어나는 대각선의 수가 1씩 커져요. 사각형 2개에서 3개 늘어나므로 2 + 3 = 5(개)예요."
  },
  {
   "id": "P32-03",
   "level": 2,
   "format": "number",
   "prompt": "표에서 <b>□ 안에 들어갈 대각선의 수</b>는 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 294 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"290\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">오각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">육각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">칠각형</text><rect x=\"242\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">팔각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">5</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#fff2c9\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">□</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">14</text><rect x=\"242\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">20</text></svg>",
   "answer": 9,
   "unit": "개",
   "explain": "다각형의 변이 1개씩 늘 때마다 늘어나는 대각선의 수가 1씩 커져요. 오각형 5개에서 4개 늘어나므로 5 + 4 = 9(개)예요."
  },
  {
   "id": "P32-04",
   "level": 3,
   "format": "number",
   "prompt": "표에서 <b>□ 안에 들어갈 대각선의 수</b>는 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 294 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"290\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">육각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">칠각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">팔각형</text><rect x=\"242\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">구각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">9</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#fff2c9\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">□</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">20</text><rect x=\"242\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">27</text></svg>",
   "answer": 14,
   "unit": "개",
   "explain": "다각형의 변이 1개씩 늘 때마다 늘어나는 대각선의 수가 1씩 커져요. 육각형 9개에서 5개 늘어나므로 9 + 5 = 14(개)예요."
  },
  {
   "id": "P32-05",
   "level": 3,
   "format": "number",
   "prompt": "표에서 <b>□ 안에 들어갈 대각선의 수</b>는 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 294 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"290\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">칠각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">팔각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">구각형</text><rect x=\"242\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">십각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">14</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#fff2c9\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">□</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">27</text><rect x=\"242\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">35</text></svg>",
   "answer": 20,
   "unit": "개",
   "explain": "다각형의 변이 1개씩 늘 때마다 늘어나는 대각선의 수가 1씩 커져요. 칠각형 14개에서 6개 늘어나므로 14 + 6 = 20(개)예요."
  },
  {
   "id": "P32-06",
   "level": 3,
   "format": "number",
   "prompt": "표에서 <b>□ 안에 들어갈 대각선의 수</b>는 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 294 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"290\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">칠각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">팔각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">구각형</text><rect x=\"242\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">십각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">14</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">20</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#fff2c9\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">□</text><rect x=\"242\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">35</text></svg>",
   "answer": 27,
   "unit": "개",
   "explain": "다각형의 변이 1개씩 늘 때마다 늘어나는 대각선의 수가 1씩 커져요. 팔각형 20개에서 7개 늘어나므로 20 + 7 = 27(개)예요."
  },
  {
   "id": "P32-07",
   "level": 3,
   "format": "number",
   "prompt": "표에서 <b>□ 안에 들어갈 대각선의 수</b>는 몇 개일까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 294 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"290\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">칠각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">팔각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">구각형</text><rect x=\"242\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">십각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">14</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">20</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">27</text><rect x=\"242\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#fff2c9\" stroke=\"#dce5ec\"/><text x=\"265.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">□</text></svg>",
   "answer": 35,
   "unit": "개",
   "explain": "다각형의 변이 1개씩 늘 때마다 늘어나는 대각선의 수가 1씩 커져요. 구각형 27개에서 8개 늘어나므로 27 + 8 = 35(개)예요."
  },
  {
   "id": "P32-08",
   "level": 2,
   "format": "number",
   "prompt": "사각형에서 오각형으로 바뀌면 <b>대각선은 몇 개 더</b> 많아질까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 243 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"239\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">사각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">오각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">육각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">2</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">5</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">9</text></svg>",
   "answer": 3,
   "unit": "개",
   "explain": "5 - 2 = 3개만큼 늘어나요."
  },
  {
   "id": "P32-09",
   "level": 2,
   "format": "number",
   "prompt": "육각형에서 칠각형으로 바뀌면 <b>대각선은 몇 개 더</b> 많아질까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 243 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"239\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">육각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">칠각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">팔각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">9</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">14</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">20</text></svg>",
   "answer": 5,
   "unit": "개",
   "explain": "14 - 9 = 5개만큼 늘어나요."
  },
  {
   "id": "P32-10",
   "level": 3,
   "format": "number",
   "prompt": "팔각형에서 구각형으로 바뀌면 <b>대각선은 몇 개 더</b> 많아질까요?",
   "figure": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 243 110\" font-family=\"Noto Sans CJK KR, NanumGothic, sans-serif\" role=\"img\" aria-label=\"각 다각형의 대각선 수를 나타낸 표\"><title>각 다각형의 대각선 수를 나타낸 표</title><rect x=\"2\" y=\"2\" width=\"239\" height=\"106\" fill=\"#fff\" rx=\"8\" stroke=\"#c8d9e8\"/><rect x=\"8\" y=\"16\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"39\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">도형</text><rect x=\"89\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">팔각형</text><rect x=\"140\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">구각형</text><rect x=\"191\" y=\"16\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"38\" text-anchor=\"middle\" font-size=\"11\" font-weight=\"700\" fill=\"#253d55\">십각형</text><rect x=\"8\" y=\"58\" width=\"76\" height=\"35\" rx=\"4\" fill=\"#dceaf8\"/><text x=\"46\" y=\"81\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"700\" fill=\"#234566\">대각선</text><rect x=\"89\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"112.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">20</text><rect x=\"140\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"163.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">27</text><rect x=\"191\" y=\"58\" width=\"47\" height=\"35\" rx=\"4\" fill=\"#f6f9fc\" stroke=\"#dce5ec\"/><text x=\"214.5\" y=\"80\" text-anchor=\"middle\" font-size=\"17\" font-weight=\"700\" fill=\"#253d55\">35</text></svg>",
   "answer": 7,
   "unit": "개",
   "explain": "27 - 20 = 7개만큼 늘어나요."
  },
  {
   "id": "P32-11",
   "level": 3,
   "format": "choice",
   "prompt": "사각형부터 대각선의 수가 <b>2, 5, 9, 14</b>로 늘어나요. 증가하는 수의 규칙으로 바른 것은?",
   "choices": [
    {
     "value": 0,
     "label": "4, 5, 6처럼 1씩 커져요."
    },
    {
     "value": 1,
     "label": "3, 4, 5처럼 1씩 커져요."
    },
    {
     "value": 2,
     "label": "3, 3, 3처럼 같아요."
    }
   ],
   "answer": 1,
   "explain": "2에서 5는 3개, 5에서 9는 4개, 9에서 14는 5개 늘어나므로 증가량이 1씩 커져요."
  },
  {
   "id": "P32-12",
   "level": 3,
   "format": "choice",
   "prompt": "육각형 대각선 9개 다음은 칠각형 14개, 팔각형 20개예요. 구각형은 어떤 방법으로 찾을까요?",
   "choices": [
    {
     "value": 0,
     "label": "20에서 7을 더해요."
    },
    {
     "value": 1,
     "label": "20에서 6을 더해요."
    },
    {
     "value": 2,
     "label": "20에 2를 곱해요."
    }
   ],
   "answer": 0,
   "explain": "육각형→칠각형 +5, 칠각형→팔각형 +6, 팔각형→구각형 +7이므로 20+7=27개예요."
  }
 ]
};
