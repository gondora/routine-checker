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
        { text: 'うにの散歩にいった？', needsPhoto: false },
          {
            text: '靴を一つしか出していないか?(靴はパパのものを前にしてきれいに並べる)ゆうとのものいがい',
            needsPhoto: true,
          },
          { text: '着替えはした？', needsPhoto: false },
          { text: '朝ごはんは食べた？', needsPhoto: false },
          { text: '歯磨きはした？', needsPhoto: false },
        { text: '宿題はやった？(今日の課題の宿題)', needsPhoto: true },
        { text: '洗い物はやったか', needsPhoto: true },
       { text: '洗濯をたたんだ？', needsPhoto: true },
       { text: '目の体操はやったか', needsPhoto: true },
      ],
        extra: {
          5: [{ text: 'プールの準備はした？', needsPhoto: false }], // 5は金曜日
        },
      },
      afternoon: {
        label: '平日 / AFTERNOON',
        common: [
  { text: 'ウニの散歩にいった？', needsPhoto: false },
  { text: '洗い物はやったか', needsPhoto: true } ,
   { text: '洗濯物はやった？', needsPhoto: false },
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
         { text: 'aaa風呂に入ったか', needsPhoto: false },
         { text: '歯は磨いたか', needsPhoto: false },
         { text: '机の上には何もおいていないか【全部キレイにする】', needsPhoto: true },
         { text: '靴は綺麗にしたか', needsPhoto:   true },
         { text: '薬は塗った？（お風呂上がり）', needsPhoto: true },
         { text: '靴は綺麗にしたか', needsPhoto:  true },
        { text: '目の体操はやったか', needsPhoto: true  },
        { text: '洗い物はやったか？', needsPhoto: true },
        
      ],
        extra: {
        1: [{ text: 'うにのシートはやった？1', needsPhoto: true }, { text: 'うにのシートはやった？2', needsPhoto: true }],
           2: [ { text: 'ウニの餌はやったか？', needsPhoto: true },
            { text: 'ウニの水はやったか？', needsPhoto: true },
          ],
         3: [{ text: 'うにのシートはやった？1', needsPhoto: true }, { text: 'うにのシートはやった？2', needsPhoto: true }],
          4: [
            { text: 'ウニの餌はやったか？', needsPhoto: true },
            { text: 'ウニの水はやったか？', needsPhoto: true },
          ],
          5: [{ text: 'うにのシートはやった？1', needsPhoto: true }, { text: 'うにのシートはやった？2', needsPhoto: true }],  
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
        { text: '宿題はやった？', needsPhoto: false },
        { text: '目の体操', needsPhoto: false }, 
    
      ],
        extra: {
          6: [ 
            { text: '（土）ウニの餌はやったか？', needsPhoto: true },
            { text: '(土)ピアノの準備はした？', needsPhoto: true },
          ], // 6は土曜日
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
      0: [{ text: 'うにのシートはやった？1', needsPhoto: true }, { text: 'うにのシートはやった？2', needsPhoto: true }],
      },
      },
    },
  },
};