/**
 * Artifact-Lab Routine App - Common Logic
 * 時間帯の切り替わりを検知して自動リセット
 */

// --- 1. 設定の同期 ---
const config = window.userConfig || {};
const routineData = config.routineData;
const CURRENT_USER = config.userName || "unknown";
const DB_NAME = config.dbName || "RoutineMissionDB_default";
const GAS_URL = "https://script.google.com/macros/s/AKfycbxxs0YhMz5NOsM7nhxB0xRT9_g0whbTMt71n6-6kpbojTnsXHNsmhJS2Ph1FdQCUNd6qQ/exec";

let currentQuestions = [];
let currentIndex = 0;
let timeKey = ""; // 前回の時間帯を保持
let db;

// --- 2. IndexedDBの準備 ---
const request = indexedDB.open(DB_NAME, 1);
request.onupgradeneeded = (e) => {
  e.target.result.createObjectStore("photos", { keyPath: "taskId" });
};
request.onsuccess = (e) => {
  db = e.target.result;
  initializeApp(); // DB接続後に初期化
  updateQuestion();
};

// --- 3. 初期化ロジック  ---
function initializeApp() {
  const data = getTargetData();

  // もし前回の時間帯と今の時間帯が違っていたら、進捗をリセット
  if (timeKey !== "" && timeKey !== data.timeKey) {
    currentIndex = 0; // 進捗を最初に戻す
  }

  currentQuestions = data.questions;
  timeKey = data.timeKey; // 現在の時間帯を保存

  const tLabel = document.getElementById("time-label");
  if (tLabel) tLabel.innerText = data.label;
}

// 今がいつか判定（共通 + 曜日別追加質問のマージ）
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

// --- 4. 質問更新 (UIリセット・復元) ---
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

    // --- 物理的なリセット処理 (引き継ぎ無くす) ---
    if (slot) {
      slot.innerHTML = `<span id="slot-placeholder">しゃしんがまだ無いよ</span>`;
      slot.style.border = "2px dashed #aaa";
    }

    if (currentQ.needsPhoto) {
      if (evidenceContainer) evidenceContainer.style.display = "block";
      if (captureBtn) captureBtn.style.display = "block";
      if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.classList.remove("next-btn");
      }
    } else {
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

    restoreSavedImage(); // 今の時間帯に撮った画像があれば出現
  } else {
    qText.innerText = "すべてのタスク完了！\nよくがんばったわね！";
    const controls = document.getElementById("controls");
    if (controls) controls.style.visibility = "hidden";
    triggerConfetti();
  }
}

// --- 5. カメラ・保存・送信 (外カメラ優先・左右反転なし) ---
async function startCapture() {
  const overlay = document.getElementById("camera-overlay");
  const video = document.getElementById("camera-preview");
  const timer = document.getElementById("timer");
  const taskId = `${timeKey}_${currentIndex}`;

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });
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
  if (evidenceContainer) evidenceContainer.style.display = "block";
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
    await fetch(GAS_URL, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify({ userId: CURRENT_USER, taskId: taskCategory, image: dataUrl }),
    });
  } catch (err) {
    console.error("Cloud Error:", err);
  }
}

// --- 6. ナビゲーション & 演出 ---
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
  if (confirm("リセットしますか？")) {
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
