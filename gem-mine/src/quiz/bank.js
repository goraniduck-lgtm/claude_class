// 문제 은행: YBM 4-2 6단원 다각형 (교과서·수학익힘·유사 문제)을 바탕으로 숫자와 도형을 바꿔 만든다.
// 문제 형식: { type, level, format: 'choice'|'number'|'figpick'|'multipick', prompt, figure, list, choices, answer, explain }
import { makeShape, regular, irregularPolygon } from '../core/shapes.js';
import { diagonals } from '../core/geometry.js';
import { polygonSvg, nonPolygonSvg, lifeSvg } from './figures.js';
import { PIECES, TARGETS, rotate, svgPoly, fitMap, pieceSvg, areaUnits } from './pattern.js';
import { EXTRA_QUESTIONS, EXTRA_TYPE_INFO } from './extra_questions.js';

export const NAMES = { 3: '삼각형', 4: '사각형', 5: '오각형', 6: '육각형', 7: '칠각형', 8: '팔각형', 9: '구각형', 10: '십각형', 11: '십일각형', 12: '십이각형' };
export const regName = (n) => '정' + NAMES[n];
export const KOR = ['가', '나', '다', '라', '마', '바'];
const MARKS = ['㉠', '㉡', '㉢'];
const KIDS = ['승민', '지혜', '민주', '영철', '희수', '덕현', '은채', '수호'];
const josa = (word, a, b) => {
  const ch = word.charCodeAt(word.length - 1) - 0xac00;
  return word + (ch >= 0 && ch % 28 !== 0 ? a : b);
};
const startOf = (n) => (n === 8 ? -Math.PI / 8 : n === 4 ? -Math.PI / 4 : -Math.PI / 2);
const regPts = (n) => regular(n, 1, startOf(n));
const ANG = { 3: 60, 4: 90, 5: 108, 6: 120, 8: 135 };

// 유형 정보: name = 기록 화면에 보이는 이름, lesson = 이 차시를 배운 뒤부터 나온다
export const TYPE_INFO = {
  P1: { name: '다각형 찾기', lesson: 2 },
  P2: { name: '다각형 이름', lesson: 2 },
  P3: { name: '변·꼭짓점·각의 수', lesson: 2 },
  P14: { name: '생활 속 다각형', lesson: 2 },
  P15: { name: '잘못 말한 친구 찾기', lesson: 2 },
  P16: { name: '가장 큰 수 찾기', lesson: 2 },
  P4: { name: '정다각형 찾기', lesson: 3 },
  P5: { name: '조건으로 이름 찾기', lesson: 3 },
  P8: { name: '모든 변의 길이의 합', lesson: 3 },
  P9: { name: '한 변·정다각형 이름', lesson: 3 },
  P13: { name: '정다각형 □ 안의 수', lesson: 3 },
  P6: { name: '대각선인지 알기', lesson: 4 },
  P7: { name: '대각선의 수', lesson: 4 },
  P10: { name: '사각형 대각선 성질', lesson: 4 },
  P11: { name: '대각선만 보고 처음 도형', lesson: 4 },
  P12: { name: '한 꼭짓점의 대각선', lesson: 4 },
  P17: { name: '모양 조각으로 채우기', lesson: 6 },
  P18: { name: '빈 곳에 알맞은 조각', lesson: 6 },
};

function others(rng, n, pool, k = 2) {
  return rng.shuffle(pool.filter((x) => x !== n)).slice(0, k);
}

// 대각선 수 규칙 표 (교과서 150~151쪽)
export function diagRule(n) {
  const seq = [];
  for (let m = 4; m <= Math.max(5, n); m++) seq.push(`${NAMES[m]} ${diagonals(m)}`);
  const steps = [];
  for (let m = 5; m <= Math.max(5, n); m++) steps.push(`+${m - 2}`);
  return `${seq.join(' → ')} (늘어나는 수: ${steps.join(', ')})`;
}

const GEN = {
  // P1 다각형 모두 찾기
  P1(rng) {
    const notVersion = rng.chance(0.35);
    const nPoly = rng.int(2, 3);
    const items = [];
    for (let i = 0; i < nPoly; i++) items.push({ svg: polygonSvg(irregularPolygon(rng, rng.int(3, 7)), { size: 110, rotate: rng.range(0, 6.28) }), poly: true });
    for (const k of rng.shuffle(['circle', 'open', 'curve', 'semi']).slice(0, 5 - nPoly)) items.push({ svg: nonPolygonSvg(k, rng, 110), poly: false, k });
    const choices = rng.shuffle(items).map((it, i) => ({ value: i, svg: it.svg, ok: notVersion ? !it.poly : it.poly }));
    return {
      type: 'P1', level: 1, format: 'multipick',
      prompt: notVersion ? '다각형이 <b>아닌</b> 것을 모두 고르세요.' : '다각형을 모두 고르세요.',
      choices, answer: choices.filter((c) => c.ok).map((c) => c.value),
      explain: '선분으로만 둘러싸인 도형이 다각형이에요. 굽은 선이 있거나, 선분으로 완전히 둘러싸여 있지 않은 도형은 다각형이 아니에요.',
    };
  },
  // P2 다각형 이름
  P2(rng) {
    const n = rng.chance(0.25) ? rng.int(9, 10) : rng.int(3, 8);
    const names = rng.shuffle([n, ...others(rng, n, [3, 4, 5, 6, 7, 8, 9, 10])]);
    return {
      type: 'P2', level: 1, format: 'choice',
      prompt: '이 다각형의 이름은 무엇일까요?',
      figure: polygonSvg(irregularPolygon(rng, n), { rotate: rng.range(0, 6.28) }),
      choices: names.map((x) => ({ value: x, label: NAMES[x] })), answer: n,
      explain: `변이 ${n}개인 다각형은 ${NAMES[n]}이에요. 꼭짓점을 하나씩 세어 보세요.`,
    };
  },
  // P3 변·꼭짓점·각의 수, 설명하는 도형의 이름
  P3(rng) {
    const n = rng.int(5, 10);
    if (rng.chance(0.4)) {
      const what = rng.pick(['꼭짓점', '변']);
      const names = rng.shuffle([n, ...others(rng, n, [4, 5, 6, 7, 8, 9, 10])]);
      return {
        type: 'P3', level: 1, format: 'choice',
        prompt: `선분으로만 둘러싸여 있고, ${what}의 수가 ${n}개인 도형의 이름은?`,
        choices: names.map((x) => ({ value: x, label: NAMES[x] })), answer: n,
        explain: `선분으로만 둘러싸인 도형은 다각형이고, ${what}의 수가 ${n}개이면 ${NAMES[n]}이에요.`,
      };
    }
    const what = rng.pick(['꼭짓점', '변', '각']);
    return {
      type: 'P3', level: 1, format: 'number', unit: '개',
      prompt: `${NAMES[n]}의 ${what}은 몇 개일까요?`,
      answer: n,
      explain: `${NAMES[n]}은 변이 ${n}개, 꼭짓점이 ${n}개, 각도 ${n}개예요.`,
    };
  },
  // P14 생활 속 다각형 (시계, 교통안전 표지판)
  P14(rng) {
    const pick = rng.pick([['stop', 8, '표지판'], ['warn', 3, '표지판'], ['child', 5, '표지판'], ['square', 4, '표지판'], ['clock5', 5, '시계'], ['clock6', 6, '시계'], ['clock8', 8, '시계']]);
    const [kind, n, what] = pick;
    const names = rng.shuffle([n, ...others(rng, n, [3, 4, 5, 6, 7, 8])]);
    return {
      type: 'P14', level: 1, format: 'choice',
      prompt: `이 ${what === '시계' ? '시계' : '교통안전 표지판'}의 모양은 무슨 다각형일까요?`,
      figure: lifeSvg(kind),
      choices: names.map((x) => ({ value: x, label: NAMES[x] })), answer: n,
      explain: `변의 수를 세면 ${n}개예요. 변의 수가 ${n}개인 다각형은 ${NAMES[n]}이에요.`,
    };
  },
  // P15 잘못 말한 친구 찾기
  P15(rng) {
    const n = rng.int(4, 8);
    const truths = [`변의 수가 ${n}개예요.`, `꼭짓점이 ${n}개예요.`, `각이 ${n}개예요.`, '선분으로만 둘러싸여 있어요.', `이름은 ${NAMES[n]}이에요.`];
    const lies = [`변의 수가 ${n + 1}개예요.`, `꼭짓점이 ${n - 1}개예요.`, `이름은 ${NAMES[n + 1]}이에요.`, '굽은 선이 있어요.', '다각형이 아니에요.'];
    const kids = rng.shuffle(KIDS).slice(0, 3);
    const lines = rng.shuffle([...rng.shuffle(truths).slice(0, 2).map((t) => ({ t, ok: true })), { t: rng.pick(lies), ok: false }]);
    const liar = kids[lines.findIndex((l) => !l.ok)];
    return {
      type: 'P15', level: 1, format: 'choice',
      prompt: '도형을 보고 <b>잘못</b> 말한 친구를 고르세요.',
      figure: polygonSvg(irregularPolygon(rng, n), { rotate: rng.range(0, 6.28), size: 170 }),
      list: lines.map((l, i) => `${kids[i]}: ${l.t}`),
      choices: kids.map((k) => ({ value: k, label: k })), answer: liar,
      explain: `이 도형은 변이 ${n}개인 ${NAMES[n]}이에요. ${liar}의 말이 틀렸어요.`,
    };
  },
  // P16 가장 큰 수 찾기
  P16(rng, lesson) {
    for (let t = 0; t < 50; t++) {
      const facts = [
        () => { const n = rng.int(3, 9); return { s: `${NAMES[n]}의 꼭짓점의 수`, v: n }; },
        () => { const n = rng.int(3, 9); return { s: `${NAMES[n]}의 변의 수`, v: n }; },
        () => { const n = rng.int(3, 9); return { s: `${NAMES[n]}의 각의 수`, v: n }; },
      ];
      if (lesson >= 4) facts.push(() => { const n = rng.int(4, 6); return { s: `${NAMES[n]}의 대각선의 수`, v: diagonals(n) }; });
      const items = [0, 1, 2].map(() => rng.pick(facts)());
      const max = Math.max(...items.map((i) => i.v));
      if (items.filter((i) => i.v === max).length !== 1) continue;
      if (new Set(items.map((i) => i.s)).size !== 3) continue;
      const k = items.findIndex((i) => i.v === max);
      return {
        type: 'P16', level: 2, format: 'choice',
        prompt: '가장 큰 수를 찾아 기호를 고르세요.',
        list: items.map((it, i) => `${MARKS[i]} ${it.s}`),
        choices: MARKS.map((m, i) => ({ value: i, label: m })), answer: k,
        explain: items.map((it, i) => `${MARKS[i]} ${it.v}개`).join(', ') + `이므로 가장 큰 것은 ${MARKS[k]}이에요.`,
      };
    }
    return GEN.P3(rng);
  },
  // P4 정다각형·변이 같은·각이 같은 다각형 모두 찾기 (교과서 138쪽 활동 1)
  P4(rng) {
    const ns = rng.shuffle([3, 4, 5, 6, 8]).slice(0, 2);
    const items = ns.map((n) => ({ pts: regPts(n), reg: true, sides: true, angles: true, rot: rng.range(-0.3, 0.3) }));
    items.push({ pts: makeShape('rhom', rng), reg: false, sides: true, angles: false });
    items.push({ pts: makeShape('rect', rng), reg: false, sides: false, angles: true });
    items.push({ pts: irregularPolygon(rng, rng.pick([3, 5, 6])), reg: false, sides: false, angles: false });
    const mode = rng.pick(['reg', 'reg', 'sides', 'angles']);
    const choices = rng.shuffle(items).map((it, i) => ({
      value: i, svg: polygonSvg(it.pts, { size: 110, rotate: it.rot ?? rng.range(0, 6.28) }), ok: it[mode === 'reg' ? 'reg' : mode],
    }));
    const prompt = { reg: '정다각형을 모두 고르세요.', sides: '변의 길이가 모두 같은 다각형을 모두 고르세요.', angles: '각의 크기가 모두 같은 다각형을 모두 고르세요.' }[mode];
    const explain = {
      reg: '정다각형은 변의 길이와 각의 크기가 모두 같아요. 마름모는 각의 크기가, 직사각형은 변의 길이가 모두 같지는 않아요.',
      sides: '정다각형과 마름모는 변의 길이가 모두 같아요. 직사각형은 변의 길이가 모두 같지는 않아요.',
      angles: '정다각형과 직사각형은 각의 크기가 모두 같아요. 마름모는 각의 크기가 모두 같지는 않아요.',
    }[mode];
    return { type: 'P4', level: 2, format: 'multipick', prompt, choices, answer: choices.filter((c) => c.ok).map((c) => c.value), explain };
  },
  // P5 조건으로 정다각형 이름
  P5(rng) {
    const n = rng.pick([3, 5, 6, 7, 8, 9, 10]);
    const other = n === 10 ? 9 : n + 1;
    const opts = rng.shuffle([regName(n), NAMES[n], regName(other)]);
    return {
      type: 'P5', level: 2, format: 'choice',
      prompt: `변이 ${n}개이고, 변의 길이와 각의 크기가 모두 같은 도형의 이름은?`,
      choices: opts.map((o) => ({ value: o, label: o })), answer: regName(n),
      explain: `변의 길이와 각의 크기가 모두 같은 다각형은 정다각형이에요. 변이 ${n}개이니 ${regName(n)}이에요.`,
    };
  },
  // P8 모든 변의 길이의 합
  P8(rng) {
    const n = rng.pick([3, 4, 5, 6, 8]);
    const a = rng.int(3, 12);
    return {
      type: 'P8', level: 2, format: 'number', unit: 'cm',
      prompt: `한 변이 ${a}cm인 ${regName(n)}의 모든 변의 길이의 합은 몇 cm일까요?`,
      figure: polygonSvg(regPts(n), { labels: [{ type: 'side', i: 0, text: `${a}cm` }] }),
      answer: a * n,
      explain: `${josa(regName(n), '은', '는')} ${n}개의 변의 길이가 모두 같아요. ${a} × ${n} = ${a * n}(cm)`,
    };
  },
  // P9 한 변의 길이 / 정다각형 이름 (유사 문제 139쪽)
  P9(rng) {
    if (rng.chance(0.5)) {
      const n = rng.pick([3, 4, 5, 6, 8]);
      const a = rng.int(3, 12);
      return {
        type: 'P9', level: 3, format: 'number', unit: 'cm',
        prompt: `모든 변의 길이의 합이 ${a * n}cm인 ${regName(n)}의 한 변은 몇 cm일까요?`,
        figure: polygonSvg(regPts(n), { labels: [{ type: 'side', i: 0, text: '?cm' }] }),
        answer: a,
        explain: `${josa(regName(n), '은', '는')} 변 ${n}개의 길이가 같아요. ${a * n} ÷ ${n} = ${a}(cm)`,
      };
    }
    const n = rng.pick([5, 6, 8, 9, 10, 12]);
    const a = rng.int(2, 9);
    const wrong = rng.shuffle([5, 6, 8, 9, 10, 12].filter((x) => x !== n)).slice(0, 1)[0];
    const opts = rng.shuffle([regName(n), regName(wrong), NAMES[n]]);
    return {
      type: 'P9', level: 3, format: 'choice',
      prompt: `한 변이 ${a}cm이고, 모든 변의 길이의 합이 ${a * n}cm인 정다각형의 이름은?`,
      choices: opts.map((o) => ({ value: o, label: o })), answer: regName(n),
      explain: `정다각형은 변의 길이가 모두 같아요. 변의 수는 ${a * n} ÷ ${a} = ${n}(개)이니 ${regName(n)}이에요.`,
    };
  },
  // P13 정다각형에서 □ 안에 알맞은 수 (수학익힘 83쪽)
  P13(rng) {
    if (rng.chance(0.5)) {
      const n = rng.pick([4, 5, 6]);
      const a = rng.int(3, 12), blank = rng.int(0, n - 1);
      const labels = Array.from({ length: n }, (_, i) => ({ type: 'side', i, text: i === blank ? '□cm' : `${a}cm` }));
      return {
        type: 'P13', level: 2, format: 'number', unit: 'cm',
        prompt: '정다각형이에요. □ 안에 알맞은 수는?',
        figure: polygonSvg(regPts(n), { labels }), answer: a,
        explain: `정다각형은 변의 길이가 모두 같아요. 그래서 □는 ${a}예요.`,
      };
    }
    const n = rng.pick([3, 4, 5, 6]);
    const blank = rng.int(0, n - 1);
    const labels = Array.from({ length: n }, (_, i) => ({ type: 'angle', i, text: i === blank ? '□°' : `${ANG[n]}°` }));
    return {
      type: 'P13', level: 2, format: 'number', unit: '°',
      prompt: '정다각형이에요. □ 안에 알맞은 수는?',
      figure: polygonSvg(regPts(n), { labels }), answer: ANG[n],
      explain: `정다각형은 각의 크기가 모두 같아요. 그래서 □는 ${ANG[n]}예요.`,
    };
  },
  // P6 대각선인지 알기
  P6(rng) {
    const n = rng.int(4, 7);
    const pts = rng.chance(0.5) ? regular(n, 1) : irregularPolygon(rng, n);
    const i = rng.int(0, n - 1);
    const mode = rng.pick(['diag', 'diag', 'side', 'mid']);
    let seg, ok, why;
    if (mode === 'diag') {
      const j = (i + rng.int(2, n - 2)) % n;
      seg = [pts[i], pts[j]]; ok = true; why = '서로 이웃하지 않는 두 꼭짓점을 이었으니 대각선이에요.';
    } else if (mode === 'side') {
      seg = [pts[i], pts[(i + 1) % n]]; ok = false; why = '이웃한 두 꼭짓점을 이은 선분은 변이에요. 대각선이 아니에요.';
    } else {
      const k = (i + 2) % n, l = (k + 1) % n;
      const mid = [(pts[k][0] + pts[l][0]) / 2, (pts[k][1] + pts[l][1]) / 2];
      seg = [pts[i], mid]; ok = false; why = '한쪽 끝이 꼭짓점이 아니라 변의 가운데예요. 대각선은 두 꼭짓점을 이어야 해요.';
    }
    return {
      type: 'P6', level: 2, format: 'choice',
      prompt: '빨간 선분은 대각선일까요?',
      figure: polygonSvg(pts, { segment: seg }),
      choices: [{ value: true, label: '예' }, { value: false, label: '아니요' }], answer: ok,
      explain: why,
    };
  },
  // P7 대각선의 수 (8차시 범위면 칠각형~십각형까지, 규칙 찾기)
  P7(rng, lesson) {
    const n = lesson >= 8 && rng.chance(0.6) ? rng.int(7, 10) : rng.int(4, 6);
    return {
      type: 'P7', level: 3, format: 'number', unit: '개',
      prompt: `${NAMES[n]}의 대각선은 모두 몇 개일까요?`,
      figure: polygonSvg(irregularPolygon(rng, n), { rotate: rng.range(0, 6.28) }),
      answer: diagonals(n),
      explain: n <= 6
        ? `서로 이웃하지 않는 두 꼭짓점을 모두 이어 보면 ${diagonals(n)}개예요. ${diagRule(6)}`
        : `규칙을 찾아요: ${diagRule(n)}. 그래서 ${NAMES[n]}은 ${diagonals(n)}개예요.`,
    };
  },
  // P10 사각형 대각선 성질 (교과서 141쪽, 수학익힘 85쪽)
  P10(rng) {
    const items = [
      { name: '정사각형', pts: makeShape('sq', rng), eq: true, perp: true },
      { name: '직사각형', pts: makeShape('rect', rng), eq: true, perp: false },
      { name: '마름모', pts: makeShape('rhom', rng), eq: false, perp: true },
      { name: '평행사변형', pts: makeShape('para', rng), eq: false, perp: false },
    ];
    const mode = rng.pick(['eq', 'perp']);
    const choices = rng.shuffle(items).map((it, i) => ({ value: i, svg: polygonSvg(it.pts, { size: 110, rotate: rng.range(-0.25, 0.25), diagonals: 'dashed' }), ok: it[mode], name: it.name }));
    return {
      type: 'P10', level: 3, format: 'multipick',
      prompt: mode === 'eq' ? '두 대각선의 길이가 같은 사각형을 모두 고르세요.' : '두 대각선이 서로 수직으로 만나는 사각형을 모두 고르세요.',
      choices, answer: choices.filter((c) => c.ok).map((c) => c.value),
      explain: mode === 'eq' ? '직사각형과 정사각형은 두 대각선의 길이가 같아요.' : '마름모와 정사각형은 두 대각선이 서로 수직으로 만나요.',
    };
  },
  // P11 대각선만 보고 처음 도형 (수학익힘 85쪽 5번)
  P11(rng, lesson) {
    const n = rng.int(4, lesson >= 8 ? 7 : 6);
    const pts = rng.chance(0.5) ? regular(n, 1, rng.range(0, 1)) : irregularPolygon(rng, n);
    const names = rng.shuffle([n, ...others(rng, n, [3, 4, 5, 6, 7, 8])]);
    return {
      type: 'P11', level: 3, format: 'choice',
      prompt: '어떤 다각형에 대각선을 모두 그었더니 이렇게 되었어요. 처음 다각형은?',
      figure: polygonSvg(pts, { sides: false, diagonals: 'all' }),
      choices: names.map((x) => ({ value: x, label: NAMES[x] })), answer: n,
      explain: `대각선의 양 끝은 다각형의 꼭짓점이에요. 꼭짓점이 ${n}개이니 처음 다각형은 ${NAMES[n]}이에요.`,
    };
  },
  // P12 한 꼭짓점에서 그을 수 있는 대각선
  P12(rng) {
    const n = rng.int(5, 10);
    return {
      type: 'P12', level: 2, format: 'number', unit: '개',
      prompt: `${NAMES[n]}의 한 꼭짓점에서 그을 수 있는 대각선은 몇 개일까요?`,
      figure: polygonSvg(regPts(n)),
      answer: n - 3,
      explain: `꼭짓점 ${n}개 중에서 자기 자신과 이웃한 꼭짓점 2개는 이을 수 없어요. ${n} - 3 = ${n - 3}(개)`,
    };
  },
  // P17 모양 조각으로 채우기 (교과서 145쪽, 수학익힘 88쪽)
  P17(rng) {
    const combos = [['hex1', 'tri'], ['hex1', 'rhom'], ['hex1', 'trap'], ['trap1', 'tri'], ['rhom1', 'tri'], ['tri2', 'tri'], ['tri3', 'tri']];
    const [tk, pk] = rng.pick(combos);
    const T = TARGETS[tk], P = PIECES[pk];
    const n = areaUnits(T.pts) / P.area;
    const W = 340, Hh = 170;
    const mapT = fitMap(T.pts, 170, 18);
    const mapP = fitMap(P.pts, 120, 26);
    const piece = P.pts.map(mapP).map(([x, y]) => [x + 205, y + 25]);
    const svg = `<svg viewBox="0 0 ${W} ${Hh}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${svgPoly(T.pts, mapT, '#fff7e6', '#3a2412')}
      <polygon points="${piece.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}" fill="${P.color}" stroke="${P.edge}" stroke-width="3" stroke-linejoin="round"/>
      <text x="265" y="160" text-anchor="middle" font-size="16" font-weight="700" fill="#3a2412">${P.name} 조각</text></svg>`;
    return {
      type: 'P17', level: 2, format: 'number', unit: '개',
      prompt: `왼쪽 ${T.name} 모양을 오른쪽 ${P.name} 조각으로만 채우려면 몇 개가 필요할까요?`,
      figure: svg, wide: true, answer: n,
      explain: `조각을 겹치지 않게 빈틈없이 이어 붙이면 ${P.name} 조각 ${n}개로 채울 수 있어요.`,
    };
  },
  // P18 빈 곳에 알맞은 모양 조각 (유사 문제 150쪽)
  P18(rng) {
    const parts = rng.pick([[3, 3], [3, 2, 1], [3, 1, 2], [2, 2, 2], [2, 2, 1, 1], [1, 2, 3], [2, 1, 1, 2]]);
    const start = rng.int(0, 5);
    const gap = rng.int(0, parts.length - 1);
    const typeOf = { 1: 'tri', 2: 'rhom', 3: 'trap' };
    const V = Array.from({ length: 6 }, (_, i) => [Math.cos((i * Math.PI) / 3), Math.sin((i * Math.PI) / 3)]);
    const map = fitMap(V, 170, 16);
    let s = start, svg = '';
    parts.forEach((len, idx) => {
      const pts = [[0, 0]];
      for (let k = 0; k <= len; k++) pts.push(V[(s + k) % 6]);
      const P = PIECES[typeOf[len]];
      svg += idx === gap ? svgPoly(pts, map, '#fffaf0', '#7a5a3e', 'stroke-dasharray="6 5"') : svgPoly(pts, map, P.color, P.edge);
      s += len;
    });
    const ans = typeOf[parts[gap]];
    const opts = rng.shuffle(['tri', 'rhom', 'trap', 'sq']);
    const choices = opts.map((t, i) => ({ value: i, svg: pieceSvg(t), ok: t === ans }));
    return {
      type: 'P18', level: 2, format: 'figpick',
      prompt: '정육각형을 모양 조각으로 채우려고 해요. 빈 곳에 알맞은 조각을 고르세요.',
      figure: `<svg viewBox="0 0 170 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${svg}</svg>`,
      choices, answer: choices.find((c) => c.ok).value,
      explain: `빈 곳은 정삼각형 조각 ${parts[gap]}개만큼의 크기예요. ${PIECES[ans].name} 조각이 꼭 맞아요.`,
    };
  },
};

// 추가 문제은행 P19~P32 (선생님이 교과서와 대조해 만든 168문항)
// - 차시에 맞는 문항만, 한 판(같은 rng) 안에서는 유형마다 다 나올 때까지 같은 문항을 다시 내지 않는다
// - 보기 순서는 섞는다 (보기가 가·나·다이면 가나다 순으로 둔다)
Object.assign(TYPE_INFO, EXTRA_TYPE_INFO);
const extraBags = new WeakMap();
for (const [type, items] of Object.entries(EXTRA_QUESTIONS)) {
  GEN[type] = (rng, lesson = 8) => {
    let bags = extraBags.get(rng);
    if (!bags) { bags = {}; extraBags.set(rng, bags); }
    const pool = items.filter((q) => (q.lesson || 0) <= lesson);
    const key = `${type}:${lesson}`;
    if (!bags[key] || !bags[key].length) bags[key] = rng.shuffle(pool.map((_, i) => i));
    const q = pool[bags[key].pop()];
    let choices = q.choices && q.choices.map((c) => ({ ...c }));
    if (choices) {
      if (choices.every((c) => /^[가-하]$/.test(c.label))) choices.sort((a, b) => a.label.localeCompare(b.label));
      else choices = rng.shuffle(choices);
    }
    const { lesson: _l, id, ...rest } = q;
    return choices ? { ...rest, qid: id, type, choices } : { ...rest, qid: id, type };
  };
}

export const TYPES = Object.keys(GEN);

export function typesFor(lesson) {
  return TYPES.filter((t) => TYPE_INFO[t].lesson <= lesson);
}

// 같은 유형이 3번 연속 나오지 않게, 틀린 유형은 몇 문제 뒤 다시
export function makeQuizDeck(rng, { lesson = 8 } = {}) {
  const types = typesFor(lesson);
  const history = [];
  const retry = [];
  return {
    lesson,
    next() {
      let type;
      const due = retry.findIndex((r) => r.after <= 0);
      if (due >= 0) { type = retry[due].type; retry.splice(due, 1); }
      else {
        for (let t = 0; t < 20; t++) {
          type = rng.pick(types);
          const last2 = history.slice(-2);
          if (!(last2.length === 2 && last2.every((h) => h === type))) break;
        }
      }
      retry.forEach((r) => r.after--);
      history.push(type);
      return GEN[type](rng, lesson);
    },
    missed(type) { retry.push({ type, after: 3 }); },
  };
}

export function generate(type, rng, lesson = 8) { return GEN[type](rng, lesson); }
