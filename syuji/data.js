/**
 * しゅうじ専用：個別設定対応データ (曜日別 extra 対応版)
 * 構文エラーを修正し、ネスト構造を整理したわよ。
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
          { text: "持ち物(鍵)", needsPhoto: true },
          { text: "持ち物(ハンカチ、ティッシュ)", needsPhoto: true },
        ],
        extra: {
          1: [{ text: "（月）パジャマを選択のかごに入れる！", needsPhoto: true }],
          3: [{ text: "（水）パジャマを選択のかごに入れる！", needsPhoto: true }],
          5: [{ text: "（金）パジャマを選択のかごに入れる！", needsPhoto: true }],
        },
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
          { text: "机の上にものはおいていないか？", needsPhoto: true },
        ],
        extra: {},
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
          { text: "マイクラのかごに入っているパジャマを使ったか", needsPhoto: true },
          { text: "机の上にものはおいていないか？", needsPhoto: true },
        ],
        extra: {},
      } // ここが evening の終わり
    }, // ここが weekday の終わり
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
          { text: "机の上にものはおいていないか？", needsPhoto: true },
        ],
        extra: {
          0: [
            { text: "爪は切った？", needsPhoto: true },
            { text: "（日）パジャマを選択のかごに入れる！", needsPhoto: true }
          ],
        },
      },
      afternoon: {
        label: "休日 / AFTERNOON",
        common: [
          { text: "うにの散歩にいった？", needsPhoto: true },
          { text: "ボンバー", needsPhoto: true },
        ],
        extra: {},
      },
      evening: {
        label: "休日 / EVENING",
        common: [
          { text: "うにの散歩にいった？", needsPhoto: false },
          { text: "うにのえさはやった？", needsPhoto: true },
          { text: "洗い物はやった？", needsPhoto: false },
          { text: "風呂には入った？", needsPhoto: false },
          { text: "歯は磨いた？", needsPhoto: false },
          { text: "薬は飲んだ？", needsPhoto: true },
          { text: "うにのシートはやった？", needsPhoto: true },
          { text: "うにの水はやった？", needsPhoto: true },
          { text: "机の上にものはおいていないか？", needsPhoto: true },
          { text: "マイクラのかごに入っているパジャマを使ったか", needsPhoto: true },
        ],
        extra: {},
      } // ここが weekend.evening の終わり
    } // ここが weekend の終わり
  } // ここが routineData の終わり
}; // ここが全体の終わり