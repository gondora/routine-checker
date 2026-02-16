/**
 * ゆうと専用：個別設定対応データ
 * text: 質問内容
 * needsPhoto: trueなら撮影必須、falseなら撮影なしで次へ進めるわ
 */
const routineData = {
  weekday: {
    morning: {
      label: "平日 / MORNING",
      common: [
        { text: "歯磨きはした？", needsPhoto: true },
        { text: "顔は洗った？", needsPhoto: true },
        { text: "持ち物(給食セット)", needsPhoto: true },
        { text: "持ち物(ハンカチ、ティッシュ)", needsPhoto: true },
        { text: "持ち物(鍵)", needsPhoto: true },
      ],
      extra: {
        5: [{ text: "プールの準備はした？", needsPhoto: true }], // 5は金曜日
      },
    },
    afternoon: {
      label: "平日 / AFTERNOON",
      common: [
        { text: "ウニの散歩にいった？", needsPhoto: true },
        { text: "靴は乾かした？", needsPhoto: true },
        { text: "宿題はやった？", needsPhoto: true },
        { text: "給食セットは出した？", needsPhoto: true },
        { text: "鉛筆は削った？", needsPhoto: true },
        { text: "学校から出た手紙は出した？", needsPhoto: true },
        { text: "洗濯をたたんだ？", needsPhoto: true },
        { text: "ピアノはやった？", needsPhoto: true },
      ],
    },
    evening: {
      label: "平日 / EVENING",
      common: [
        { text: "ウニの餌はやった？", needsPhoto: true },
        { text: "歯は磨いた？", needsPhoto: true },
        { text: "ウニのシートはやった？", needsPhoto: true },
        { text: "ウニの水は交換した？", needsPhoto: true },
      ],
    },
  },
  weekend: {
    morning: {
      label: "休日 / MORNING",
      common: [
        { text: "歯磨きはした？", needsPhoto: true },
        { text: "顔は洗った？", needsPhoto: true },
        { text: "ウニの散歩にいった？", needsPhoto: true },
        { text: "ピアノはやった？", needsPhoto: true },
      ],
      extra: {
        6: [{ text: "ピアノの準備はした？", needsPhoto: true }], // 6は土曜日
      },
    },
    afternoon: {
      label: "休日 / AFTERNOON",
      common: [{ text: "ウニの散歩にいった？", needsPhoto: true }],
    },
    evening: {
      label: "休日 / EVENING",
      common: [
        { text: "ウニの散歩にいった？", needsPhoto: true },
        { text: "ウニの餌はやった？", needsPhoto: true },
        { text: "歯は磨いた？", needsPhoto: true },
        { text: "ウニのシートはやった？", needsPhoto: true },
        { text: "ウニの水は交換した？", needsPhoto: true },
      ],
    },
  },
};

const GAS_URL = "https://script.google.com/macros/s/AKfycbxxs0YhMz5NOsM7nhxB0xRT9_g0whbTMt71n6-6kpbojTnsXHNsmhJS2Ph1FdQCUNd6qQ/exec";
const CURRENT_USER = "yuto";

let currentQuestions = [];
let currentIndex = 0;
let timeKey = "";
let db;

// --- 初期化 ---
function initializeApp() {
  const data = getTargetData();
  currentQuestions = data.questions;
  timeKey = data.timeKey;

  const tLabel = document.getElementById("time-label");
  if (tLabel) tLabel.innerText = data.label;
}

const request = indexedDB.open("RoutineMissionDB_yuto", 1);
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

  const data = routineData[dayKey][tKey];
  let finalQuestions = [...data.common];
  if (data.extra && data.extra[day]) {
    finalQuestions = finalQuestions.concat(data.extra[day]);
  }

  return { label: data.label, questions: finalQuestions, timeKey: tKey };
}

// --- 質問更新 (UIリセット・復元) ---
function updateQuestion() {
  const qText = document.getElementById("question-text");
  const slot = document.getElementById("evidence-slot");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const captureBtn = document.getElementById("capture-btn");
  const evidenceContainer = document.getElementById("evidence-container");

  if (!qText) return;

  if (currentIndex < currentQuestions.length) {
    const currentQ = currentQuestions[currentIndex];
    qText.innerText = currentQ.text;

    // 撮影要否によるUI制御
    if (currentQ.needsPhoto) {
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
      // 撮影不要ならスロットを隠して即解禁
      if (evidenceContainer) evidenceContainer.style.display = "none";
      if (captureBtn) captureBtn.style.display = "none";
      if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.classList.add("next-btn");
      }
    }

    if (prevBtn) {
      prevBtn.disabled = currentIndex === 0;
      prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1";
    }

    restoreSavedImage();
  } else {
    qText.innerText = "すべてのタスク完了！\nよくがんばったわね！";
    const controls = document.getElementById("controls");
    if (controls) controls.style.visibility = "hidden";
    triggerConfetti();
  }
}

// --- カメラ・保存関連 ---
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
  const evidenceContainer = document.getElementById("evidence-container");
  if (evidenceContainer) evidenceContainer.style.display = "block"; // 画像があるなら出す
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

window.onload = () => {
  /* IndexedDBの成功待ち */
};
