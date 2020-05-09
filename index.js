const time = 12 * 60 * 1000;
let remainingTime = time;
let startTime = null;
let timerId = null;
let isCountdownTimer = true;

const internalButton = document.getElementById("internal-button");
const externalButton = document.getElementById("external-button");
const startButton = document.getElementById("start-button");
const stopButton = document.getElementById("stop-button");
const resetButton = document.getElementById("reset-button");

const updateTimeText = time => {
  let m = Math.floor(time / (1000 * 60)) % 100;
  let s = Math.floor((time % (1000 * 60)) / 1000);
  let ms = time % 1000;

  m = `0${m}`.slice(-2);
  s = `0${s}`.slice(-2);
  ms = `00${ms}`.slice(-3).slice(0, 2);

  setTimer(m, s, ms);
};

const setTimer = (m, s, ms) => {
  document.getElementById("minute").textContent = m;
  document.getElementById("second").textContent = s;
  document.getElementById("millisecond").textContent = ms;
};

const update = () => {
  timerId = setTimeout(() => {
    const now = Date.now();
    if (isCountdownTimer) {
      remainingTime -= now - startTime;
    } else {
      remainingTime += now - startTime;
    }
    startTime = now;
    if (remainingTime > 0) {
      update();
    } else {
      remainingTime = 0;
    }
    updateTimeText(remainingTime);
  }, 10);
};

const internalAction = () => {
  isCountdownTimer = true;
  resetAction();
  internalButton.classList.remove("disabled");
  externalButton.classList.add("disabled");
};

const externalAction = () => {
  isCountdownTimer = false;
  resetAction();
  externalButton.classList.remove("disabled");
  internalButton.classList.add("disabled");
};

const startAction = () => {
  if (timerId !== null) return;

  startTime = Date.now();
  update();
  startButton.classList.remove("active-control");
  stopButton.classList.add("active-control");
};

const stopAction = () => {
  if (timerId === null) return;

  clearTimeout(timerId);
  timerId = null;
  stopButton.classList.remove("active-control");
  startButton.classList.add("active-control");
};

const resetAction = () => {
  if (isCountdownTimer) {
    remainingTime = time;
  } else {
    remainingTime = 0;
  }
  updateTimeText(remainingTime);
};

(() => {
  internalButton.addEventListener("click", internalAction);
  externalButton.addEventListener("click", externalAction);
  startButton.addEventListener("click", startAction);
  stopButton.addEventListener("click", stopAction);
  resetButton.addEventListener("click", resetAction);

  updateTimeText(time);
})();
