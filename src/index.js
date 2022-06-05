const time = document.querySelector(".js-time");
const timeInfo = document.querySelector(".js-time-info");
const resultInfo = document.querySelector(".js-result-info");
const resultSpan = document.querySelector(".js-result");
const startButton = document.querySelector(".js-start-button");
const playGround = document.querySelector(".js-play-ground");
const gameTimeInput = document.querySelector(".js-game-time-input");

const HIDE_CLASS = "hide";
const INTERVAL_TIME = 100;
const BOX_CLASS = "box";

let result = 0;

const gameTimeHandler = function (event) {
  time.textContent = new Number(event.target.value).toFixed(1);
};

const startGame = function () {
  console.log("startGame");
  result = 0;
  startButton.classList.add(HIDE_CLASS);
  playGround.style.border = "1px solid teal";
  gameTimeInput.setAttribute("disabled", true);

  addBox();

  if (
    !resultInfo.classList.contains(HIDE_CLASS) &&
    timeInfo.classList.contains(HIDE_CLASS)
  ) {
    timeInfo.classList.remove(HIDE_CLASS);
    resultInfo.classList.add(HIDE_CLASS);
  }

  const interval = setInterval(function () {
    const value = new Number(time.textContent);
    const newTime = (value - 0.1).toFixed(1);
    time.textContent = newTime;
  }, INTERVAL_TIME);

  const milliseconds = +gameTimeInput.value * 1000;
  setTimeout(function () {
    endGame();
    clearInterval(interval);
  }, milliseconds);
};

const endGame = function () {
  console.log("endGame");
  startButton.classList.remove(HIDE_CLASS);
  playGround.style.border = "";
  gameTimeInput.removeAttribute("disabled");
  timeInfo.classList.add(HIDE_CLASS);
  resultInfo.classList.remove(HIDE_CLASS);

  resultSpan.textContent = result;
  time.textContent = new Number(gameTimeInput.value).toFixed(1);

  playGround.innerHTML = "";
};

const getRandomNumber = function (max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const addBox = function () {
  const size = getRandomNumber(50, 10);

  const colors = [
    "blue",
    "black",
    "pink",
    "grey",
    "indigo",
    "yellow",
    "violet",
  ];

  const color = colors[getRandomNumber(colors.length - 1)];
  const box = document.createElement("div");
  box.classList.add(BOX_CLASS);
  box.style.cssText = `
  height:${size}px;
  width:${size}px;
  background-color:${color};
  position: absolute;
  top:${getRandomNumber(playGround.clientHeight - size)}px;
  left:${getRandomNumber(playGround.clientWidth - size)}px;
  `;
  playGround.appendChild(box);
};

const playGroundHandler = function (event) {
  const target = event.target;
  if (target.classList.contains(BOX_CLASS)) {
    result++;
    target.remove();
    addBox();
  }
};

startButton.addEventListener("click", startGame);
gameTimeInput.addEventListener("input", gameTimeHandler);
playGround.addEventListener("click", playGroundHandler);
