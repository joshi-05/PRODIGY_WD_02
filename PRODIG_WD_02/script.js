// Element references
const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const clearLapsBtn = document.getElementById("clear-laps-btn");
const lapsList = document.getElementById("laps-list");
const totalLapTimeDisplay = document.getElementById("total-lap-time");

// Timer variables
let timer = null;
let elapsedTime = 0;
let isRunning = false;
let laps = [];
let totalLapTime = 0;

// Format time to HH:MM:SS
function formatTime(ms) {
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60));
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Update the time display
function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

// Start button
startBtn.addEventListener("click", () => {
  if (!isRunning) {
    isRunning = true;
    const startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 100);
  }
});

// Pause button
pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    isRunning = false;
    clearInterval(timer);
  }
});

// Reset button
resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  laps = [];
  totalLapTime = 0;
  updateDisplay();
  lapsList.innerHTML = "";
  totalLapTimeDisplay.textContent = "Total Lap Time: 00:00:00";
});

// Lap button
lapBtn.addEventListener("click", () => {
  if (isRunning) {
    laps.push(elapsedTime);
    totalLapTime = laps.reduce((sum, lap) => sum + lap, 0);
    renderLaps();
    updateTotalLapTime();
  }
});

// Render lap times
function renderLaps() {
  lapsList.innerHTML = "";
  laps.forEach((lapTime, index) => {
    const li = document.createElement("li");
    li.textContent = Lap ${index + 1}: ${formatTime(lapTime)};
    lapsList.appendChild(li);
  });
}

// Update total lap time
function updateTotalLapTime() {
  totalLapTimeDisplay.textContent = Total Lap Time: ${formatTime(totalLapTime)};
}

// Clear laps button
clearLapsBtn.addEventListener("click", () => {
  laps = [];
  totalLapTime = 0;
  lapsList.innerHTML = "";
  totalLapTimeDisplay.textContent = "Total Lap Time: 00:00:00";
});