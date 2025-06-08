// Start or resume session
let sessionId = localStorage.getItem("session_id");
let letters = localStorage.getItem("letters");
let center = localStorage.getItem("center_letter");
let elem = "";
let isValid = "";
let displayMessage = "";
let point = 0;
let score = localStorage.getItem("total_score");
let ranking = localStorage.getItem("rank");
let count = localStorage.getItem("words_found");
let guessWord = "";
let guessedWords;
try {
  guessedWords = JSON.parse(localStorage.getItem("guessed_words")) || [];
} catch (e) {
  guessedWords = [];
}
let list = JSON.parse(localStorage.getItem("list")) || [];
renderGuessedWords();

// function to display guessed valid word list
function renderGuessedWords() {
  const listContainer = document.getElementById("guessedWordsList");
  if (listContainer) {
    listContainer.innerHTML = "";
    guessedWords.forEach(word => {
      const li = document.createElement("li");
      li.textContent = word;
      listContainer.appendChild(li);
    });
  }
}

const xmlhttp = new XMLHttpRequest();
if (!sessionId) {
  xmlhttp.open("GET", "http://127.0.0.1:8001/create_session");
  xmlhttp.onload = function () {
    var data = JSON.parse(xmlhttp.responseText);
    sessionId = data.session_id;
    localStorage.setItem("session_id", sessionId);
    localStorage.setItem("letters", data.letters);
    localStorage.setItem("center_letter", data.center_letter);
    letters = data.letters;
    center = data.center_letter;

    document.getElementById("Beginner").innerHTML = 0;
    document.getElementById("rankString").innerHTML = "Beginner";
    document.getElementById("wordCount").innerHTML = 0;
    document.getElementById("wordColumn").innerHTML = [];

    renderLetters();
  };
  xmlhttp.onerror = function () {
    console.error("Error creating session");
  };
  xmlhttp.send();
} else {
  letters = localStorage.getItem("letters");
  center = localStorage.getItem("center_letter");
  score = localStorage.getItem("total_score");
  ranking = localStorage.getItem("rank");
  count = localStorage.getItem("words_found");
  list = JSON.parse(localStorage.getItem("list")) || [];

  displayScore(score);
  displayRank(ranking);
  displayCount(count);
  displayList();

  renderLetters();
}

// function to display center letter at center position
function renderLetters() {
  const index = letters.indexOf(center);
  for (let i = 0; i < letters.length; i++) {
    const box = document.getElementById(i);
    if (!box) continue;
    if (i === 3) {
      box.innerHTML = center;
    } else if (i === index) {
      document.getElementById(index).innerHTML = letters[3];
    } else {
      box.innerHTML = letters[i];
    }
  }
}

// function to display user input
function displayString() {
  document.getElementById("currentString").innerHTML = guessWord;
}

// function to display user input as a string
function addChar(i) {
  if (inputActive) {
    guessWord += document.getElementById(i).innerHTML;
    displayString();
  }
}

// function to delete user input one by one
function deleteButton() {
  if (inputActive) {
    guessWord = guessWord.slice(0, -1);
    displayString();
  }
}

let readyToSubmit = false;
let inputActive = true;

function enterButton() {
  inputActive = false;
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost:8001/check_word");
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.onload = function () {
    var data = JSON.parse(xmlhttp.responseText);
    if (data.valid) {
      guessedWords.push(guessWord);
      localStorage.setItem("guessed_words", JSON.stringify(guessedWords));
      localStorage.setItem("total_score", data.total_score);
      localStorage.setItem("rank", data.rank);
      localStorage.setItem("words_found", data.words_found);

      score = data.total_score;
      ranking = data.rank;
      count = data.words_found;
      list.push(guessWord);
      localStorage.setItem("list", JSON.stringify(list));

      displayList();
      displayScore(score);
      displayRank(ranking);
      displayCount(count);

      if (data.is_pangram) {
        displayPopup("Pangram!! +7 bonus points!");
      } else {
        displayPopup("Nice! Word accepted.");
      }
    } else {
      displayPopup(data.reason || "Invalid word.");
    }
    guessWord = "";
    displayString();
    inputActive = true;
  };
  xmlhttp.onerror = function () {
    console.error("Error message");
  };
  xmlhttp.send(JSON.stringify({
    word: guessWord,
    session_id: sessionId,
    all_letters: letters,
    center_letter: center,
    username: playerName
  }));
}

function keyPressed(event) {
  const key = event.key.toLowerCase();
  if (event.key === 'Enter') {
    enterButton();
  } else if (event.key === 'Backspace') {
    deleteButton();
  } else if (/^[a-z]$/.test(key)) {
    if (letters.includes(key)) {
      guessWord += key;
      displayString();
    }
  }
}

function clearButton() {
  console.log("Clear button was pressed");
  guessWord = "";
  displayString();
}

document.onkeydown = function(event) {
  const key = event.key.toLowerCase();
  if (event.key === 'Enter') {
    enterButton();
  } else if (event.key === 'Backspace') {
    deleteButton();
  } else if (/^[a-z]$/.test(key)) {
    if (letters.includes(key)) {
      guessWord += key;
      displayString();
    }
  }
};

function displayPopup(displayMessage) {
  const popup = document.getElementById('myPopup');
  const popupMessageElement = document.getElementById('popupMessage');
  popupMessageElement.textContent = displayMessage;
  popup.style.display = 'flex';

  setTimeout(() => {
    popup.style.display = 'none';
  }, 2000);
}

function closePopup() {
  const popup = document.getElementById('myPopup');
  popup.style.display = 'none';
}

function displayScore(score) {
  switch (true) {
    case score >= 0 && score < 10:
      elem = document.getElementById("Beginner");
      elem.innerHTML = score;
      break;
    case score >= 10 && score < 50:
      elem = document.getElementById("Good");
      document.getElementById("Beginner").innerHTML = "";
      elem.innerHTML = score;
      break;
    case score >= 50 && score < 75:
      elem = document.getElementById("Great");
      document.getElementById("Good").innerHTML = "";
      document.getElementById("Beginner").innerHTML = "";
            elem.innerHTML = score;
      break;
    case score >= 75 && score < 100:
      elem = document.getElementById("Amazing");
      document.getElementById("Great").innerHTML = "";
      document.getElementById("Good").innerHTML = "";
      document.getElementById("Beginner").innerHTML = "";
      elem.innerHTML = score;
      break;
    case score >= 100:
      elem = document.getElementById("Genius");
      document.getElementById("Amazing").innerHTML = "";
      document.getElementById("Great").innerHTML = "";
      document.getElementById("Good").innerHTML = "";
      document.getElementById("Beginner").innerHTML = "";
      elem.innerHTML = score;
      break;
  }
}

function displayRank(ranking) {
  elem = document.getElementById("rankString");
  elem.innerHTML = ranking;
}

function displayCount(count) {
  elem = document.getElementById("wordCount");
  elem.innerHTML = count;
}

// function to 
function displayList() {
  const wordColumn = document.getElementById("wordColumn");
  wordColumn.innerHTML = "";
  list.forEach(word => {
    const span = document.createElement("span");
    span.className = "word";
    span.textContent = word;
    wordColumn.appendChild(span);
  });
}

// function to restart the game
var txt = "";
function restart() {
  if (confirm("Are you sure to reset your score to 0?")) {
    txt = "OK";
    guessWord = "";
    localStorage.setItem("total_score", 0);
    localStorage.setItem("rank", "Beginner");
    localStorage.setItem("words_found", 0);
    localStorage.setItem("guessed_words", JSON.stringify([]));
    localStorage.setItem("list", JSON.stringify([]));
    ranking = localStorage.getItem("rank");
    score = localStorage.getItem("total_score");
    count = localStorage.getItem("words_found");
    guessedWords = [];
    list = [];
    elem = document.getElementById("Good");
    elem.innerHTML = "";
    elem = document.getElementById("Great");
    elem.innerHTML = "";
    document.getElementById("Amazing");
    elem.innerHTML = "";
    document.getElementById("Genius");
    elem.innerHTML = "";
    displayRank(ranking);
    displayScore(score);
    displayCount(count);
    displayList();
    const tempList = document.getElementById("guessedWordsList");
    tempList.innerHTML = "";
    requestRestartSession();
    displayString();
  } else {
    txt = "Cancel";
  }
}

function requestRestartSession() {
  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "http://localhost:8001/restart_session");
  xmlhttp.setRequestHeader("Content-type", "application/json");
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      var data = JSON.parse(xmlhttp.responseText);
      console.log("Game restarted:", data.message);
    }
  };
  xmlhttp.onerror = function () {
    console.error("Error missing session ID");
  };
  xmlhttp.send(JSON.stringify({ session_id: sessionId }));
}

function resetGameSession() {
  localStorage.clear();
  location.reload();
}
