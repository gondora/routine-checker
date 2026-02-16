/**
 * 【ここを自由に書き換えてね！】
 * 曜日と時間帯に合わせた質問リスト
 */
const routineData = {
  weekday: {
    morning: {
      label: "平日 / MORNING",
      common: ["歯磨きはした？", "顔は洗った？", "持ち物(給食セット)", "持ち物(ハンカチ、ティッシュ)", "持ち物(鍵)"],
      extra: {
        5: ["プールの準備はした？"], // 5は金曜日
      },
    },
    afternoon: {
      label: "平日 / AFTERNOON",
      common: ["ウニの散歩にいった？", "靴は乾かした？", "宿題はやった？", "給食セットは出した？", "鉛筆は削った？", "学校から出た手紙は出した？", "洗濯をたたんだ？", "ピアノはやった？"],
      // extra: {
      //   5: ["（金）週末の持ち帰り品は確認した？"], // 5は金曜日
      // },
    },
    evening: {
      label: "平日 / EVENING",
      common: ["ウニの餌はやった？", "歯は磨いた？", "ウニのシートはやった？", "ウニのシートはやった？", "ウニの水は交換した？"],
      // extra: {
      //   5: ["（金）週末の持ち帰り品は確認した？"], // 5は金曜日
      // },
    },
  },
  weekend: {
    morning: {
      label: "休日 / MORNING",
      common: ["歯磨きはした？", "顔は洗った？", "ウニの散歩にいった？", "ピアノはやった？"],
      extra: {
        6: ["ピアノの準備はした？"], // 6は土曜日
      },
    },
    afternoon: {
      label: "休日 / AFTERNOON",
      common: ["ウニの散歩にいった？"],
      // extra: {
      //   6: ["（土）上履きは洗った？"], // 6は土曜日
      // },
    },
    evening: {
      label: "休日 / EVENING",
      common: ["ウニの散歩にいった？", "ウニの餌はやった？", "歯は磨いた？", "ウニのシートはやった？", "ウニのシートはやった？", "ウニの水は交換した？"],
      // extra: {
      //   6: ["（土）上履きは洗った？"], // 6は土曜日
      // },
    },
  },
};
let currentQuestions = [];
let currentIndex = 0;

const qText = document.getElementById("question-text");
const msg = document.getElementById("message");
const tLabel = document.getElementById("time-label");

// 今が「いつ」なのかを判定する関数
function getTargetData() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();

  const isWeekend = day === 0 || day === 6;
  const dayKey = isWeekend ? "weekend" : "weekday";

  let timeKey = "evening";
  if (hour >= 5 && hour < 11) timeKey = "morning";
  else if (hour >= 11 && hour < 17) timeKey = "afternoon";

  const data = routineData[dayKey][timeKey];

  // --- ここで質問を合体---
  // まずは共通の質問をコピー
  let finalQuestions = [...data.common];

  // もし今の曜日（day）専用の追加質問があれば、合体させる
  if (data.extra && data.extra[day]) {
    finalQuestions = finalQuestions.concat(data.extra[day]);
  }

  return {
    label: data.label,
    questions: finalQuestions,
  };
}

// 質問を更新する関数
function updateQuestion() {
  if (currentIndex < currentQuestions.length) {
    qText.innerText = currentQuestions[currentIndex];
    msg.innerText = "";
  } else {
    // 全問正解時の処理
    qText.innerText = "すべてのタスク完了！\nよくがんばったわね！";
    msg.innerText = "おめでとう！";
    document.getElementById("controls").style.visibility = "hidden";
    triggerConfetti(); // 紙吹雪演出
  }
}

// ボタンが押された時の処理
function handleAnswer(isYes) {
  if (isYes) {
    currentIndex++;
    updateQuestion();
  } else {
    msg.innerText = "やりましょう！\n終わるまで次には進めないよ。";
  }
}

// 紙吹雪を降らせる演出
function triggerConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    document.body.appendChild(confetti);

    const startX = Math.random() * 100;
    const endX = (Math.random() - 0.5) * 60; // 左右への散らばり具合

    confetti.style.left = startX + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confetti.style.animationDelay = Math.random() * 0.8 + "s";
    confetti.style.setProperty("--confetti-x", endX);
  }
}

// ページが読み込まれたらスタート
window.onload = () => {
  const data = getTargetData();
  currentQuestions = data.questions;
  tLabel.innerText = data.label;
  updateQuestion();
};
