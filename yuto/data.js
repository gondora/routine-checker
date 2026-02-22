/**
 * ゆうと専用：個別設定対応データ
 * window.userConfig に格納して、共通の script.js から参照させるわよ。
 */
window.userConfig = {
  userName: "yuto",
  dbName: "RoutineMissionDB_yuto",
  routineData: {
    weekday: {
      morning: {
        label: "平日 / MORNING",
        common: [
          { text: "歯磨きはした？", needsPhoto: false },
          { text: "顔は洗った？", needsPhoto: false },
          { text: "持ち物(給食セット)", needsPhoto: true },
          { text: "持ち物(ハンカチ、ティッシュ)", needsPhoto: true },
          { text: "持ち物(鍵)", needsPhoto: true },
        ],
        extra: {
          5: [{ text: "プールの準備はした？", needsPhoto: false }], // 5は金曜日
        },
      },
      afternoon: {
        label: "平日 / AFTERNOON",
        common: [
          { text: "ウニの散歩にいった？", needsPhoto: false },
          { text: "宿題はやった？", needsPhoto: true },
          { text: "給食セットは出した？", needsPhoto: true },
          { text: "鉛筆は削った？", needsPhoto: true },
          { text: "学校から出た手紙は出した？", needsPhoto: true },
          { text: "洗濯をたたんだ？", needsPhoto: true },
          { text: "ピアノはやった？", needsPhoto: true },
          { text: "靴は乾かした？", needsPhoto: true },
        ],
      },
      evening: {
        label: "平日 / EVENING",
        common: [
          { text: "ウニの餌はやった？", needsPhoto: true },
          { text: "歯は磨いた？", needsPhoto: false },
          { text: "ウニのシートはやった？", needsPhoto: true },
          { text: "ウニの水は交換した？", needsPhoto: true },
        ],
      },
    },
    weekend: {
      morning: {
        label: "休日 / MORNING",
        common: [
          { text: "歯磨きはした？", needsPhoto: false },
          { text: "顔は洗った？", needsPhoto: false },
          { text: "ウニの散歩にいった？", needsPhoto: false },
          { text: "ピアノはやった？", needsPhoto: true },
        ],
        extra: {
          6: [{ text: "ピアノの準備はした？", needsPhoto: true }], // 6は土曜日
          0: [
            { text: "爪は切った？", needsPhoto: true },
            { text: "ピアノはやった？", needsPhoto: true },
          ], 
        },
      },
      afternoon: {
        label: "休日 / AFTERNOON",
        common: [{ text: "ウニの散歩にいった？", needsPhoto: false }],
      },
      evening: {
        label: "休日 / EVENING",
        common: [
          { text: "ウニの散歩にいった？", needsPhoto: false },
          { text: "ウニの餌はやった？", needsPhoto: true },
          { text: "歯は磨いた？", needsPhoto: false },
          { text: "ウニのシートはやった？", needsPhoto: true },
          { text: "ウニの水は交換した？", needsPhoto: true },
        ],
      },
    },
  },
};
