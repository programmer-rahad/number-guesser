// Selector Function
const $ = (selector, areAll) => {
  const all = document.querySelectorAll(selector);
  const single = document.querySelector(selector);
  return areAll ? all : single;
};

// Game Values
let min = 1,
  max = 10,
  guessesLeft = 3,
  winningNum;

// UI Elements
const submitBtn = $("input[type=button]");
const guessInput = $("input");
const message = $(".message");

submitBtn.addEventListener("click", function () {
  winningNum = getWinningNum();
  const inputVal = parseInt(guessInput.value);
  if (inputVal < min || inputVal > max || isNaN(inputVal)) {
    showMessage(`Please insert a number between ${min} and ${max}`, "red");
    setTimeout(() => (guessInput.value = ""), 1000);
    return;
  }
  if (winningNum === inputVal) {
    gameOver();
    showMessage(`${inputVal} is correct, YOU WIN!`, "green");
  } else {
    guessesLeft--;
    if (!guessesLeft) {
      showMessage(
        `Game Over, you lost. The correct number was ${winningNum}`,
        "red"
      );
      gameOver();
      return;
    }
    setTimeout(() => (guessInput.value = ""), 1000);
    showMessage(
      `${inputVal} isn't correct, ${guessesLeft} guesses left`,
      "red"
    );
  }
});

const showMessage = (msg, color) => {
  message.textContent = msg;
  message.style.color = color;
  guessInput.style.borderColor = color;
};
const gameOver = () => {
  guessInput.disabled = true;
  submitBtn.value = "Play again";
  submitBtn.classList.add("play-again");
};
// Play again event listener
game.addEventListener("mousedown", function (e) {
  if (e.target.classList.contains("play-again")) {
    window.location.reload();
  }
});

// Get wining number
function getWinningNum() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}