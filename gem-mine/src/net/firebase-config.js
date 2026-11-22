// 1대1 대결용 Firebase 설정 (quiz-bomool 프로젝트).
// 이 게임은 실시간 데이터베이스의 gemMine 경로 밑에만 쓴다. 다른 수업 앱 데이터와 섞이지 않는다.
// 비워 두면(null) '시험 연결'로 돌아가서, 같은 기기의 두 창(탭)끼리만 대결할 수 있다.
export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyBO7Leif6VpWudYEUSIR3RrTuu0_zb3W4w',
  authDomain: 'quiz-bomool.firebaseapp.com',
  databaseURL: 'https://quiz-bomool-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'quiz-bomool',
  storageBucket: 'quiz-bomool.firebasestorage.app',
  messagingSenderId: '945779894656',
  appId: '1:945779894656:web:2c8b6628d247cfe4137965',
};

export const DB_ROOT = 'gemMine';
