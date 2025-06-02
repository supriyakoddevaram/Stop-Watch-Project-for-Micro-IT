// CLOCK
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  const m = now.getMinutes().toString().padStart(2, '0');
  const s = now.getSeconds().toString().padStart(2, '0');
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  document.getElementById('clock').textContent = `${h.toString().padStart(2, '0')}:${m}:${s} ${ampm}`;
}
setInterval(updateClock, 1000);
updateClock();

// STOPWATCH
let stopwatchStart = 0, stopwatchElapsed = 0, stopwatchInterval, stopwatchRunning = false;

function updateStopwatch() {
  const time = Date.now() - stopwatchStart + stopwatchElapsed;
  const h = Math.floor(time / 3600000).toString().padStart(2, '0');
  const m = Math.floor((time % 3600000) / 60000).toString().padStart(2, '0');
  const s = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
  document.getElementById('stopwatch').textContent = `${h}:${m}:${s}`;
}

document.getElementById('startStopwatch').onclick = () => {
  if (!stopwatchRunning) {
    stopwatchStart = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 1000);
    stopwatchRunning = true;
  }
};

document.getElementById('stopStopwatch').onclick = () => {
  if (stopwatchRunning) {
    clearInterval(stopwatchInterval);
    stopwatchElapsed += Date.now() - stopwatchStart;
    stopwatchRunning = false;
  }
};

document.getElementById('resetStopwatch').onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchElapsed = 0;
  stopwatchRunning = false;
  document.getElementById('stopwatch').textContent = "00:00:00";
};

// TIMER
let timerTime = 0, timerInterval, timerRunning = false;

function updateTimerDisplay(time) {
  const h = Math.floor(time / 3600).toString().padStart(2, '0');
  const m = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(time % 60).toString().padStart(2, '0');
  document.getElementById('timer').textContent = `${h}:${m}:${s}`;
}

document.getElementById('startTimer').onclick = () => {
  if (!timerRunning) {
    const h = parseInt(document.getElementById('timerHours').value) || 0;
    const m = parseInt(document.getElementById('timerMinutes').value) || 0;
    const s = parseInt(document.getElementById('timerSeconds').value) || 0;
    timerTime = h * 3600 + m * 60 + s;

    if (timerTime <= 0) return;

    updateTimerDisplay(timerTime);
    timerRunning = true;

    timerInterval = setInterval(() => {
      timerTime--;
      updateTimerDisplay(timerTime);
      if (timerTime <= 0) {
        clearInterval(timerInterval);
        timerRunning = false;
        document.getElementById('alarmSound').play(); // 🔊 Sound
        alert("Time's up!");
      }
    }, 1000);
  }
};

document.getElementById('stopTimer').onclick = () => {
  clearInterval(timerInterval);
  timerRunning = false;
};

document.getElementById('resetTimer').onclick = () => {
  clearInterval(timerInterval);
  timerRunning = false;
  timerTime = 0;
  document.getElementById('timer').textContent = "00:00:00";
  document.getElementById('timerHours').value = '';
  document.getElementById('timerMinutes').value = '';
  document.getElementById('timerSeconds').value = '';
};
