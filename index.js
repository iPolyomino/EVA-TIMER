let time = 1 * 60 * 1000;
let start = Date.now();

const updateTimeText = time => {
  let m = Math.floor(time / (1000 * 60));
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
    let diff = time - (now - start);
    if (diff > 0) {
      updateTimeText(diff);
      update();
    } else {
      updateTimeText(0);
    }
  }, 10);
};
update();
