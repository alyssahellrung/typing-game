const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const APIkey = "ov5ckzky5dky9lts0q3i56sikl0673wy1sjiei9e38chfrsw2"

// Init words
// let words = [];

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in local storage or medium
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";

// Set difficulty select value
difficultySelect.value = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : "medium";

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Get list of words from API
// async function getWordList() {
//   const res = await fetch("https://api.wordnik.com/v4/words.json/randomWords?limit=10&api_key="+APIkey);
//   const data = await res.json();
//   data.forEach(item => {
//     words.push(item.word);
//   });
  
//   return words;
// }

// Generate random word from array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
  if(words.length == 0) {
    youWin();
  } else {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
    words = words.filter(item => item !== randomWord)
    console.log(words);
  }
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = time + "s";

  if(time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

// Game over screen if user finishes all words in the array
function youWin() {
  clearInterval(timeInterval);
  score ++;
  endgameEl.innerHTML = `
    <h1>You won!</h1>
    <p>Your final score is ${score}</p>
    <button onclick="location.reload()">Reload</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event listeners

// Typing
text.addEventListener("input", e => {
  const insertedText = e.target.value;
  
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings button click
settingsBtn.addEventListener("click", () => 
settings.classList.toggle("hide"));

// Settings select
settingsForm.addEventListener("change", e => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
})