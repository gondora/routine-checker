/**
 * 【ここを自由に書き換えてね！】
 * 曜日と時間帯に合わせた質問リスト
 */
const routineData = {
  // 平日（月〜金）のリスト
  weekday: {
    morning: { label: "平日 / MORNING", questions: ["くすりは飲んだ？", "着替えはした？", "朝ごはんは食べた？", "歯磨きはした？", "顔は洗った？", "持ち物(給食セット)", "持ち物(手袋)", "持ち物(帽子)", "持ち物(鍵)", "持ち物(ハンカチ、ティッシュ)"] },
    afternoon: { label: "平日 / AFTERNOON", questions: ["ウニの散歩にいった？", "靴は乾かした？", "宿題はやった？", "給食セットは出した？", "鉛筆は削った？", "学校から出た手紙は出した？", "洗い物はした？", "洗濯をたたんだ？", "タッチはやった？"] },
    evening: { label: "平日 / EVENING", questions: ["腕立て伏せはした？", "ウニの餌はやった？", "風呂には入った？", "歯は磨いた？", "薬は飲んだ？", "ウニのシートはやった？", "ウニのシートはやった？", "ウニの水は交換した？", "靴は乾かした？"] },
  },
  // 休日（土・日）のリスト
  weekend: {
    morning: { label: "休日 / MORNING", questions: ["くすりは飲んだ？", "ウニの散歩", "着替えはした？", "朝ごはんは食べた？", "歯磨きはした？", "顔は洗った？"] },
    afternoon: { label: "休日 / AFTERNOON", questions: ["ウニの散歩にいった？", "ボンバー"] },
    evening: { label: "休日 / EVENING", questions: ["ウニの散歩にいった？", "腕立て伏せはした？", "うにのえさはやった？", "風呂には入った？", "歯は磨いた？", "薬は飲んだ？", "ウニのシートはやった？", "靴は乾かした？"] },
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
  const day = now.getDay(); // 0:日, 6:土
  const hour = now.getHours();
  const isWeekend = day === 0 || day === 6;
  const dayKey = isWeekend ? "weekend" : "weekday";

  let timeKey = "evening";
  if (hour >= 5 && hour < 11) timeKey = "morning";
  else if (hour >= 11 && hour < 17) timeKey = "afternoon";

  return routineData[dayKey][timeKey];
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
