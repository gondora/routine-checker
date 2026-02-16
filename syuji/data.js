/**
 * しゅうじ専用：個別設定対応データ (曜日別 extra 対応版)
 * window.userConfig に格納して、共通の script.js から参照させるわよ。
 */
window.userConfig = {
  userName: "syuji",
  dbName: "RoutineMissionDB_syuji",
  routineData: {
    weekday: {
      morning: {
        label: "平日 / MORNING",
        common: [
          { text: "くすりは飲んだ？", needsPhoto: true },
          { text: "着替えはした？", needsPhoto: false },
          { text: "朝ごはんは食べた？", needsPhoto: false },
          { text: "歯磨きはした？", needsPhoto: false },
          { text: "顔は洗った？", needsPhoto: false },
          { text: "持ち物(給食セット)", needsPhoto: true },
          { text: "持ち物(手袋)", needsPhoto: true },
          { text: "持ち物(帽子)", needsPhoto: true },
          { text: "持ち物(鍵)", needsPhoto: true },
          { text: "持ち物(ハンカチ、ティッシュ)", needsPhoto: true },
        ],
      },
      afternoon: {
        label: "平日 / AFTERNOON",
        common: [
          { text: "うにの散歩にいった？", needsPhoto: false },
          { text: "宿題はやった？", needsPhoto: true },
          { text: "給食セットは出した？", needsPhoto: true },
          { text: "鉛筆は削った？", needsPhoto: true },
          { text: "学校から出た手紙は出した？", needsPhoto: true },
          { text: "洗い物はした？", needsPhoto: true },
          { text: "洗濯をたたんだ？", needsPhoto: true },
          { text: "タッチはやった？", needsPhoto: true },
          { text: "靴は乾かした？(うにの散歩が終わったら実行)", needsPhoto: true },
        ],
        extra: {
          5: [{ text: "（金）週末の持ち帰り品を確認！", needsPhoto: true }],
        },
      },
      evening: {
        label: "平日 / EVENING",
        common: [
          { text: "腕立て伏せはした？", needsPhoto: false },
          { text: "うにの餌はやった？", needsPhoto: true },
          { text: "洗い物はやった？", needsPhoto: true },
          { text: "風呂には入った？", needsPhoto: false },
          { text: "歯は磨いた？", needsPhoto: false },
          { text: "薬は飲んだ？", needsPhoto: true },
          { text: "うにのシートはやった？", needsPhoto: true },
          { text: "うにの水は交換した？", needsPhoto: true },
          { text: "靴は乾かした？", needsPhoto: true },
        ],
      },
    },
    weekend: {
      morning: {
        label: "休日 / MORNING",
        common: [
          { text: "くすりは飲んだ？", needsPhoto: true },
          { text: "うにの散歩", needsPhoto: false },
          { text: "着替えはした？", needsPhoto: false },
          { text: "朝ごはんは食べた？", needsPhoto: false },
          { text: "歯磨きはした？", needsPhoto: false },
          { text: "顔は洗った？", needsPhoto: false },
          { text: "洗濯物は畳んだ？", needsPhoto: true },
          { text: "洗い物はやった？", needsPhoto: true },
          { text: "靴は乾かした？", needsPhoto: true },
        ],
        // --- ここに曜日別の追加質問を入れられるわよ ---
        extra: {
          0: [{ text: "爪は切った？", needsPhoto: true }],
          //   5: [{ text: "（金）給食着は持った？", needsPhoto: true }], // 5は金曜日
        },
      },
      afternoon: {
        label: "休日 / AFTERNOON",
        common: [
          { text: "うにの散歩にいった？", needsPhoto: true },
          { text: "ボンバー", needsPhoto: true },
        ],
      },
      evening: {
        label: "休日 / EVENING",
        common: [
          { text: "うにの散歩にいった？", needsPhoto: false },
          { text: "腕立て伏せはした？", needsPhoto: false },
          { text: "うにのえさはやった？", needsPhoto: true },
          { text: "洗い物はやった？", needsPhoto: false },
          { text: "風呂には入った？", needsPhoto: false },
          { text: "歯は磨いた？", needsPhoto: false },
          { text: "薬は飲んだ？", needsPhoto: true },
          { text: "うにのシートはやった？", needsPhoto: true },
          { text: "うにの水はやった？", needsPhoto: true },
          { text: "靴は乾かした？", needsPhoto: true },
        ],
      },
    },
  },
};
