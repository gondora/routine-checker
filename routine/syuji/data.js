window.userConfig = {
  userName: 'syuji',
  dbName: 'RoutineMissionDB_syuji',
  routineData: {
    weekday: {
      morning: {
        label: '平日 / MORNING',
        common: [
          { text: 'くすりは飲んだ？', needsPhoto: true },
          { text: '着替えはした？', needsPhoto: false },
          { text: '朝ごはんは食べた？', needsPhoto: false },
          { text: '歯磨きはした？', needsPhoto: false },
          { text: '顔は洗った？', needsPhoto: false },
          { text: '持ち物(給食セット)', needsPhoto: true },
          { text: '持ち物(鍵)', needsPhoto: true },
          { text: '持ち物(ハンカチ、ティッシュ)', needsPhoto: true },
          { text: '薬は塗った？（顔を洗った後）', needsPhoto: true },
        ],
        extra: {
          1: [
            { text: '（月）パジャマを洗濯のかごに入れる！', needsPhoto: true },
          ],
          3: [
            { text: '（水）パジャマを洗濯のかごに入れる！', needsPhoto: true },
          ],
          5: [
            { text: '（金）パジャマを洗濯のかごに入れる！', needsPhoto: true },
          ],
        },
      },
      afternoon: {
        label: '平日 / AFTERNOON',
        common: [
          { text: 'うにの散歩にいった？', needsPhoto: false },
          {
            text: '靴を一つしか出していないか？(靴はパパのものを前にしてきれいに並べる)ゆうとのものいがい',
            needsPhoto: true,
          },
          { text: '宿題はやった？', needsPhoto: true },
          { text: '給食セットは出した？', needsPhoto: true },
          { text: '鉛筆は削った？', needsPhoto: true },
          { text: '学校から出た手紙は出した？', needsPhoto: true },
          { text: '洗い物はした？', needsPhoto: true },
          { text: '洗濯をたたんだ？', needsPhoto: true },
          { text: 'タッチはやった？', needsPhoto: true },
          { text: '机の上にものはおいていないか？', needsPhoto: true },
        ],
        extra: {},
      },
      evening: {
        label: '平日 / EVENING',
        common: [
          { text: '腕立て伏せはした？(40回)', needsPhoto: false },
          { text: '洗い物はやった？', needsPhoto: true },
          { text: '風呂には入った？', needsPhoto: false },
          { text: '歯は磨いた？', needsPhoto: false },
          { text: '薬は飲んだ？', needsPhoto: true },
          { text: '薬は塗った？（お風呂上がり）', needsPhoto: true },
          {
            text: 'マイクラのかごに入っているパジャマを使ったか',
            needsPhoto: true,
          },
          { text: '机の上にものはおいていないか？', needsPhoto: true },
          {
            text: '靴は一つしか出していないか【靴はパパのものを前にして綺麗に並べる】ゆうとのもの以外',
            needsPhoto: true,
          },
        ],
        extra: {
          1: [
            { text: 'ウニの餌はやったか？', needsPhoto: true },
            { text: 'うにの水は交換した？', needsPhoto: true },
          ],
          2: [{ text: 'うにのシートはやった？', needsPhoto: true }],
          3: [
            { text: 'ウニの餌はやったか？', needsPhoto: true },
            { text: 'うにの水は交換した？', needsPhoto: true },
          ],
          4: [{ text: 'うにのシートはやった？', needsPhoto: true }],
          5: [
            { text: 'ウニの餌はやったか？', needsPhoto: true },
            { text: 'うにの水は交換した？', needsPhoto: true },
          ],
        },
      }, // ここが weekday.evening の終わり
    }, // ここが weekday の終わり

    weekend: {
      morning: {
        label: '休日 / MORNING',
        extraTop: {
          0: [{ text: 'bonb', needsPhoto: true }], // extraTop のカンマのつけ方を直したわよ
        },
        common: [
          { text: 'くすりは飲んだ？', needsPhoto: true },
          { text: 'うにの散歩', needsPhoto: false },
          { text: '着替えはした？', needsPhoto: false },
          { text: '朝ごはんは食べた？', needsPhoto: false },
          { text: '歯磨きはした？', needsPhoto: false },
          { text: '顔は洗った？', needsPhoto: false },
          { text: '洗濯物は畳んだ？', needsPhoto: true },
          { text: '洗い物はやった？', needsPhoto: true },
          { text: '机の上にものはおいていないか？', needsPhoto: true },
          { text: '薬は塗った？（顔を洗った後）', needsPhoto: true },
        ],
        extra: {
          0: [
            { text: '爪は切った？', needsPhoto: true },
            { text: '（日）パジャマを洗濯のかごに入れる！', needsPhoto: true },
            { text: '（日）ウニの餌はやったか？', needsPhoto: true },
          ],
        },
      },
      afternoon: {
        label: '休日 / AFTERNOON',
        common: [
          { text: 'うにの散歩にいった？', needsPhoto: false },
          { text: 'ボンバー', needsPhoto: false },
        ],
        extra: {},
      },
      evening: {
        label: '休日 / EVENING',
        common: [
          { text: 'うにのシートはやった？', needsPhoto: true },
          { text: 'うにの水はやった？', needsPhoto: true },
          { text: 'うにの散歩にいった？', needsPhoto: false },
          {
            text: '靴を一つしか出していないか？(靴はパパのものを前にしてきれいに並べる)ゆうとのものいがい',
            needsPhoto: true,
          },
          { text: '洗い物はやった？', needsPhoto: false },
          { text: '風呂には入った？', needsPhoto: false },
          { text: '歯は磨いた？', needsPhoto: false },
          { text: '薬は飲んだ？', needsPhoto: true },
          { text: '薬は塗った？（お風呂上がり）', needsPhoto: true },
          { text: '机の上にものはおいていないか？', needsPhoto: true },
          {
            text: 'マイクラのかごに入っているパジャマを使ったか',
            needsPhoto: true,
          },
        ],
        extra: {
          // ↓ アンタが外に書き漏らしていたやつは、ここに収納したわよ！
          // （ちなみに 0 は日曜日よ。月曜にしたいなら 1 にしなさい。）
          6: [{ text: 'うにのシートはやった？', needsPhoto: true }],
          0: [
            { text: 'ウニの餌はやったか？', needsPhoto: true },
            { text: 'うにの水は交換した？', needsPhoto: true },
          ],
        },
      }, // ここが weekend.evening の終わり
    }, // ここが weekend の終わり
  }, // ここが routineData の終わり
}; // ここが userConfig 全体の終わり
