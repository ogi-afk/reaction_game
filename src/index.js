const time = document.querySelector(".js-time");
const timeInfo = document.querySelector(".js-time-info");
const resultInfo = document.querySelector(".js-result-info");
const resultSpan = document.querySelector(".js-result");
const startButton = document.querySelector(".js-start-button");
const playGround = document.querySelector(".js-play-ground");
const gameTimeInput = document.querySelector(".js-game-time-input");

let result = 0;

const gameTimeHandler = function (event) {
  time.textContent = new Number(event.target.value).toFixed(1);
};

const startGame = function () {
  console.log("startGame");
  startButton.classList.add("hide");
  playGround.style.border = "1px solid teal";
  gameTimeInput.setAttribute("disabled", true);

  if (
    !resultInfo.classList.contains("hide") &&
    timeInfo.classList.contains("hide")
  ) {
    timeInfo.classList.remove("hide");
    resultInfo.classList.add("hide");
  }

  const interval = setInterval(function () {
    const value = new Number(time.textContent);
    const newTime = (value - 0.1).toFixed(1);
    time.textContent = newTime;
  }, 100);

  const milliseconds = +gameTimeInput.value * 1000;
  setTimeout(function () {
    endGame();
    clearInterval(interval);
  }, milliseconds);
};

const endGame = function () {
  console.log("endGame");
  startButton.classList.remove("hide");
  playGround.style.border = "";
  gameTimeInput.removeAttribute("disabled");
  timeInfo.classList.add("hide");
  resultInfo.classList.remove("hide");

  resultSpan.textContent = result;
  time.textContent = new Number(gameTimeInput.value).toFixed(1);
};

startButton.addEventListener("click", startGame);
gameTimeInput.addEventListener("input", gameTimeHandler);
