/**
 * 曜日と時間帯に合わせた質問リスト
 * needsPhoto: false にすると、撮影しなくても「次へ」が押せるようになるわ
 */
const routineData = {
  weekday: {
    morning: {
      label: "平日 / MORNING",
      questions: [
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
      questions: [
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
    },
    evening: {
      label: "平日 / EVENING",
      questions: [
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
      questions: [
        { text: "くすりは飲んだ？", needsPhoto: true },
        { text: "うにの散歩", needsPhoto: false },
        { text: "着替えはした？", needsPhoto: false },
        { text: "朝ごはんは食べた？", needsPhoto: false },
        { text: "歯磨きはした？", needsPhoto: false },
        { text: "顔は洗った？", needsPhoto: false },
        { text: "洗濯物は畳んだ？", needsPhoto: true },
        { text: "洗い物はやった？", needsPhoto: true },
        { text: "爪は切った？", needsPhoto: true },
        { text: "靴は乾かした？", needsPhoto: true },
      ],
    },
    afternoon: {
      label: "休日 / AFTERNOON",
      questions: [
        { text: "うにの散歩にいった？", needsPhoto: true },
        { text: "ボンバー", needsPhoto: true },
      ],
    },
    evening: {
      label: "休日 / EVENING",
      questions: [
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
};

const GAS_URL = "https://script.google.com/macros/s/AKfycbxxs0YhMz5NOsM7nhxB0xRT9_g0whbTMt71n6-6kpbojTnsXHNsmhJS2Ph1FdQCUNd6qQ/exec";
const CURRENT_USER = "syuji";

let currentQuestions = [];
let currentIndex = 0;
let timeKey = "";
let db;

function initializeApp() {
  const data = getTargetData();
  currentQuestions = data.questions;
  timeKey = data.key;
  const tLabel = document.getElementById("time-label");
  if (tLabel) tLabel.innerText = data.label;
}

const request = indexedDB.open("RoutineMissionDB", 1);
request.onupgradeneeded = (e) => {
  e.target.result.createObjectStore("photos", { keyPath: "taskId" });
};
request.onsuccess = (e) => {
  db = e.target.result;
  initializeApp();
  updateQuestion();
};

function getTargetData() {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const isWeekend = day === 0 || day === 6;
  const dayKey = isWeekend ? "weekend" : "weekday";
  let tKey = "evening";
  if (hour >= 5 && hour < 11) tKey = "morning";
  else if (hour >= 11 && hour < 17) tKey = "afternoon";
  return { label: routineData[dayKey][tKey].label, questions: routineData[dayKey][tKey].questions, key: tKey };
}

function updateQuestion() {
  const qText = document.getElementById("question-text");
  const slot = document.getElementById("evidence-slot");
  const nextBtn = document.getElementById("next-btn");
  const captureBtn = document.getElementById("capture-btn");

  // スロットの親コンテナも取得しなさい
  const evidenceContainer = document.getElementById("evidence-container");

  if (!qText) return;

  if (currentIndex < currentQuestions.length) {
    const currentQ = currentQuestions[currentIndex];
    qText.innerText = currentQ.text;

    // --- 撮影不要項目（needsPhoto: false）の時の処理 ---
    if (currentQ.needsPhoto) {
      // 撮影が必要な時：スロットを表示して初期化
      if (evidenceContainer) evidenceContainer.style.display = "block";
      if (slot) {
        slot.innerHTML = `<span id="slot-placeholder">証拠未提出</span>`;
        slot.style.border = "2px dashed #aaa";
      }
      if (captureBtn) captureBtn.style.display = "block";

      if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.classList.remove("next-btn");
      }
    } else {
      // 撮影が不要な時：スロットごと非表示にするわ！
      if (evidenceContainer) evidenceContainer.style.display = "none";
      if (captureBtn) captureBtn.style.display = "none";

      if (nextBtn) {
        // 最初から「次へ」を押せる状態にする
        nextBtn.disabled = false;
        nextBtn.classList.add("next-btn");
      }
    }

    // 過去の撮影データがあれば復元（不要項目でも、もし過去データがあれば表示されるわ）
    restoreSavedImage();
  } else {
    qText.innerText = "すべてのタスク完了！\nよくがんばったわね！";
    const controls = document.getElementById("controls");
    if (controls) controls.style.visibility = "hidden";
    triggerConfetti();
  }
}

async function startCapture() {
  const overlay = document.getElementById("camera-overlay");
  const video = document.getElementById("camera-preview");
  const timer = document.getElementById("timer");
  const taskId = `${timeKey}_${currentIndex}`;

  try {
    // const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
    video.srcObject = stream;
    overlay.style.display = "flex";

    let count = 3;
    timer.innerText = count;
    const interval = setInterval(() => {
      count--;
      timer.innerText = count > 0 ? count : "SHUTTER!";
      if (count <= 0) clearInterval(interval);
    }, 1000);

    setTimeout(async () => {
      const canvas = document.getElementById("shutter-canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.5);
      stream.getTracks().forEach((track) => track.stop());
      overlay.style.display = "none";

      renderImage(dataUrl);
      saveToLocal(taskId, dataUrl);
      sendToCloud(dataUrl, timeKey);

      // 撮影成功でボタンを解禁（アンタのCSSクラスを付与）
      const nextBtn = document.getElementById("next-btn");
      if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.add("next-btn");
      }
    }, 3500);
  } catch (err) {
    alert("カメラエラー: " + err);
  }
}

function renderImage(dataUrl) {
  const slot = document.getElementById("evidence-slot");
  if (slot) {
    slot.innerHTML = `<img src="${dataUrl}" style="width:100%; height:100%; object-fit:cover;">`;
    slot.style.border = "none";
  }
}

function saveToLocal(taskId, dataUrl) {
  if (!db) return;
  const transaction = db.transaction(["photos"], "readwrite");
  transaction.objectStore("photos").put({ taskId: taskId, image: dataUrl, date: new Date().toLocaleDateString() });
}

function restoreSavedImage() {
  if (!db) return;
  const taskId = `${timeKey}_${currentIndex}`;
  const transaction = db.transaction(["photos"], "readonly");
  const store = transaction.objectStore("photos");
  const getRequest = store.get(taskId);

  getRequest.onsuccess = () => {
    if (getRequest.result) {
      renderImage(getRequest.result.image);
      const nextBtn = document.getElementById("next-btn");
      if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.add("next-btn");
      }
    }
  };
}

async function sendToCloud(dataUrl, taskCategory) {
  try {
    await fetch(GAS_URL, { method: "POST", mode: "no-cors", body: JSON.stringify({ userId: CURRENT_USER, taskId: taskCategory, image: dataUrl }) });
  } catch (err) {
    console.error("Cloud Error:", err);
  }
}

function goToNextQuestion() {
  currentIndex++;
  updateQuestion();
}
function goToPrevQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    updateQuestion();
  }
}
function resetLocalData() {
  if (confirm("リセットするわよ？")) {
    const transaction = db.transaction(["photos"], "readwrite");
    transaction.objectStore("photos").clear().onsuccess = () => location.reload();
  }
}

function triggerConfetti() {
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    document.body.appendChild(confetti);
    const startX = Math.random() * 100;
    const endX = (Math.random() - 0.5) * 60;
    confetti.style.left = startX + "vw";
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
    confetti.style.animationDelay = Math.random() * 0.8 + "s";
    confetti.style.setProperty("--confetti-x", endX);
  }
}
