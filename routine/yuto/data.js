/**
 * ゆうと専用：個別設定対応データ
 * 日曜日の「ピアノ」重複エラーを修正しておいたわよ。
 */
window.userConfig = {
  userName: 'yuto',
  dbName: 'RoutineMissionDB_yuto',
  routineData: {
    weekday: {
      morning: {
        label: '平日 / MORNING',
        common: [
          { text: '歯磨きはした？', needsPhoto: false },
          { text: '顔は洗った？', needsPhoto: false },
          { text: '持ち物(給食セット)', needsPhoto: true },
          { text: '持ち物(ハンカチ、ティッシュ)', needsPhoto: true },
          { text: '持ち物(鍵)', needsPhoto: true },
        ],
        extra: {
          5: [{ text: 'プールの準備はした？', needsPhoto: false }], // 5は金曜日
        },
      },
      afternoon: {
        label: '平日 / AFTERNOON',
        common: [
          { text: 'ウニの散歩にいった？', needsPhoto: false },
          { text: '宿題はやった？', needsPhoto: true },
          { text: '給食セットは出した？', needsPhoto: true },
          { text: '鉛筆は削った？', needsPhoto: true },
          { text: '学校から出た手紙は出した？', needsPhoto: true },
          { text: '洗濯をたたんだ？(ぜんたいをうつす)', needsPhoto: true },
          { text: 'ピアノはやった？', needsPhoto: true },
          { text: '机の上にものはおいていないか？', needsPhoto: true },
          {
            text: '靴を一つしか出していないか？(靴はパパのものを前にしてきれいに並べる)しゅうじのものいがい',
            needsPhoto: true,
          },
        ],
      },
      evening: {
        label: '平日 / EVENING',
        common: [
          { text: '風呂に入ったか', needsPhoto: false },
          { text: '歯は磨いた？', needsPhoto: false },
          { text: '机の上にものはおいていないか？', needsPhoto: true },
          {
            text: '靴を一つしか出していないか？(靴はパパのものを前にしてきれいに並べる)しゅうじのものいがい',
            needsPhoto: true,
          },
        ],
        extra: {
          1: [{ text: 'ウニシートはやったか？', needsPhoto: true }],
          2: [
            { text: 'ウニの餌はやったか？', needsPhoto: true },
            { text: 'ウニ水はやったか？', needsPhoto: true },
          ],
          3: [{ text: 'ウニのシートはやったか？', needsPhoto: true }],
          4: [
            { text: 'ウニの餌はやったか？', needsPhoto: true },
            { text: 'ウニの水はやったか？', needsPhoto: true },
          ],
          5: [{ text: 'ウニのシートはやったか？', needsPhoto: true }],
        },
      },
    },
    weekend: {
      morning: {
        label: '休日 / MORNING',
        common: [
          { text: '歯磨きはした？', needsPhoto: false },
          { text: '顔は洗った？', needsPhoto: false },
          { text: 'ウニの散歩にいった？', needsPhoto: false },
          { text: 'ピアノはやった？', needsPhoto: true }, // ここにあるから日曜のextraからは消したわ
        ],
        extra: {
          6: [{ text: '(土)ピアノの準備はした？', needsPhoto: true }], // 6は土曜日
          0: [
            { text: '爪は切った？', needsPhoto: true },
            // 重複していた「ピアノはやった？」は削除したわよ
          ], // 0は日曜日
        },
      },
      afternoon: {
        label: '休日 / AFTERNOON',
        common: [{ text: 'ウニの散歩にいった？', needsPhoto: false }],
      },
      evening: {
        label: '休日 / EVENING',
        common: [
          { text: 'ウニの散歩にいった？', needsPhoto: false },
          {
            text: '靴を一つしか出していないか？(靴はパパのものを前にしてきれいに並べる)しゅうじのものいがい',
            needsPhoto: true,
          },
          { text: '歯は磨いた？', needsPhoto: false },
          { text: '机の上にものはおいていないか？', needsPhoto: true },
        ],
        extra: {
          6: [
            { text: 'ウニの餌はやったか？', needsPhoto: true },
            { text: 'ウニの水はやったか？', needsPhoto: true },
          ],
          0: [{ text: 'ウニのシートはやったか？', needsPhoto: true }],
        },
      },
    },
  },
};
