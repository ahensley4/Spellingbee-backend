// Play.js file

// Start or resume session
let sessionId = localStorage.getItem("session_id");
let letters = localStorage.getItem("letters");
let centerLetter = localStorage.getItem("center_letter");

// create XMLHttpRequest object "xmlhttp" to request data from a web server
    const xmlhttp = new XMLHttpRequest();
// start new session
if (!sessionId) {
    // open the XMLHttpRequest object
    xmlhttp.open("GET", "http://127.0.0.1:8001/create_session");

    // define a callback function
    xmlhttp.onload = function () {
    console.log("response back from a server");
    // convert JSON response
    var data = JSON.parse(xmlhttp.responseText);
    sessionId = data.session_id;
    console.log("New session: ", sessionId);
    console.log("Daily Letters: ", data.letters);
    console.log("Center Letter: ", data.center_letter);
    // stores session id
    localStorage.setItem("session_id", data.session_id);
    localStorage.setItem("letters, " ,data.letters);
    localStorage.setItem("centerLetter, ", data.center_letter);
    xmlhttp.onerror = function () {
        console.error("Error creating session", err);
    }
    //xmlhttp.catch(err => console.error("Error creating session", err));
    }
// send a request to a server
xmlhttp.send();
console.log("send a request to a server");
}
else {
    console.log("Resuming session:", sessionId);
    console.log("Daily letters:", letters);
    console.log("Center letter:", centerLetter);
}

// Start or resume session: fetch version
/*let sessionId = localStorage.getItem("session_id");
let letters = localStorage.getItem("letters");
let centerLetter = localStorage.getItem("center_letter");

// start new session
if (!sessionId) {
    fetch("http://127.0.0.1:8001/create_session")
    // convert to JSON string
    .then(res => res.json())
    .then(data => {
        sessionId = data.session_id;
        letters = data.letters;
        centerLetter = data.center_letter;
        // store data within user's browser: data available after browser is closed and reopened
        localStorage.setItem("session_id", sessionId);
        localStorage.setItem("letters", letters);   
        localStorage.setItem("center_letter", centerLetter);
        console.log("New session:", sessionId);
        console.log("Daily letters:", letters);
        console.log("Center letter:", centerLetter);
    })
    .catch(err => console.error("Error creating session", err));
    // resume session
    } else {
        console.log("Resuming session:", sessionId);
        console.log("Daily letters:", letters);
        console.log("Center letter:", centerLetter);
}*/

let length = letters.length;

// display the center letter in center position 
console.log("Letters' length: ", length);
let elem = "";
let index = 0;
let indexLetter = "";
console.log("Center letter: ", centerLetter);
for (let i = 0; i < length; i++) {
    console.log("Random character: ", letters[i]);
    if (letters[i] == centerLetter) {
        index = i;
        indexLetter = letters[i];
    }
}

for (let i = 0; i < length; i++) {
    if (i == 3) {
        elem = document.getElementById(index);
        // display the element with id i
        elem.innerHTML = letters.slice(i, i+1);
    }
    else if(i == index) {
        elem = document.getElementById(3);
        // display the element with id i
        elem.innerHTML = letters.slice(index, index+1);
    }
    else {
        // retreive the element with id i
        elem = document.getElementById(i);
        // display the element with id i
        elem.innerHTML = letters.slice(i, i+1);
    }
}

// call generateRandomString function
/*const randomString = generateRandomString(7); 
console.log("Random string: " + randomString);
for (let i = 0; i < 7; i++) {
    console.log("Random character: " + randomString[i]);
    // retreive the element with id i
    var elem = document.getElementById(i);
    // display the element with id i
    elem.innerHTML = randomString.slice(i, i+1);
}*/

// function to generate random string
/*function generateRandomString(length) {
    const vowel = 'AEIOU';
    const consonant = 'BCDFGHJKLMNPQRSTVWXYZ';
    const allChar = vowel + consonant;
    
    if (length < 1) return '';

    // make sure to include at least one vowel
    const guaranteedVowel = vowel[Math.floor(Math.random() * vowel.length)];

    // initialize result with a vowel
    const usedChar = new Set();
    usedChar.add(guaranteedVowel);

    // add random non-repeating characters
    while (usedChar.size < length) {
        const randomChar = allChar[Math.floor(Math.random() * allChar.length)];
        // make sure not to include same character
        usedChar.add(randomChar); 
    }
    // shuffle the characters
    const resultArray = Array.from(usedChar);
    for (let i = resultArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resultArray[i], resultArray[j]] = [resultArray[j], resultArray[i]];
    }
    return resultArray.join('');
}*/

let guessWord = "";

// function to display current guess word
function displayString() {
    document.getElementById("currentString").innerHTML = guessWord;
    console.log("Current string: " + guessWord);
}

// function to append character to guess word
function addChar(i) {
    console.log("Selected character: " + document.getElementById(i).innerHTML);
    if (inputActive) {
        // keep appending characters until the enter button is clicked
        guessWord += document.getElementById(i).innerHTML;
        displayString();
    }
}

// function to delete last character
function deleteButton() {
    console.log("Delete button was clicked");
    if (inputActive) {
        guessWord = guessWord.slice(0, -1);
        displayString();
    }
}

let readyToSubmit = false;
let inputActive = true;

//function to submit guess word
function enterButton() {
    inputActive = false;
    console.log("Enter button was pressed");
    readyToSubmit = wordCheck();
    if (readyToSubmit) {
        console.log("Send the word to the REST API to check");
        //requestWordCheck();
        //popup message if not a valid word 
        //popupInvalid()
    } 
     console.log("Minimum Requirement Check");
    // if word doesn’t contain at least 4 letters
    if (guessWord.length < 4) {
        // popup message: too short
        popupShort(); 
    }
    // if word is more than 4 letters
    else
    {
        // check if the guessed word contains key word
        for (let i = 0; i < guessWord.length; i++) {
            // return true only when the guessed word contains key word
            if ((guessWord[i]) == document.getElementById(3).innerHTML) { 
                return true;
            }
        }
        // popup message: no key word
        popupNoKey();
    }
    return readyToSubmit;
}

function clearButton() {
    console.log("Retry button was pressed");
    guessWord = guessWord.slice(0, 0);
    displayString();
}

// function to popup: tooshort
function popupShort() {
    var popup = document.getElementById("tooShort");
    console.log("word is too short");
    popup.classList.add("show"); 
    // set up timer to fade out the popup in 2sec
    setTimeout(() => {
      popup.classList.remove("show");
    }, 1500);
}

function popupNoKey() {
    const popup = document.getElementById("noKey");
    console.log("key word is not used");
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 1500);
}

document.onkeydown = keyPressed;

let inValidKey = true;

function keyPressed(event) {
    inValidKey = false;
    const char = event.code.slice(3,4);
    const key = event.key;
    if (event.code == 'Enter') {
        console.log("user pressed code: " + event.code);
        enterButton();
    }
    else if (event.code == 'Backspace') {
        console.log("user pressed code: " + event.code);
        deleteButton();
    }
    else if (/^[a-zA-Z]$/.test(key)) {
        console.log("pressed character: " + char);
        for (let i = 0; i < 7; i++) {
            if (char == document.getElementById(i).innerHTML) {
                inValidKey = true;
                guessWord += document.getElementById(i).innerHTML;
                displayString();
                console.log("Status check: " + inValidKey);
                return;
            } 
        } 
    }
    else {
        console.log("Status check: " + inValidKey);
        displayString();
    }
}

function popupMessage() {
    const popup = document.getElementById("fromServer");
    console.log("message: " );
    popup.classList.add("show");
    setTimeout(() => {
      popup.classList.remove("show");
    }, 1500);
}

/*let isvalid = localStorage.getItem(valid);
let displayMessage = localStorage.getItem(message);
let point = localStorage.getItem(points_awarded); 
let score = localStorage.getItem(total_score);
let ranking = localStorage.getItem(rank);
let count = localStorage.getItem(words_found);

// send a request to a server for word check (and rank?)
function requestWordCheck() {
    console.log("send to REST");
    // create XMLHttpRequest object "xmlhttp" to request data from a web server
    const xmlhttp = new XMLHttpRequest();
    // open the XMLHttpRequest object
    xmlhttp.open("POST", "http://localhost:8001/check_word"); 

    //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.setRequestHeader("Content-type", "application/json");
    // define a callback function
    xmlhttp.onload = function () {
        console.log("response received back from a server");
        // convert JSON into string
        JSON.stringify({
            guessWord,
            session_id: sessionId,
            all_letters: letters,
            center_letter: centerLetter 
        })
    
  .then(res => res.json())
  .then(data => {
    console.log("Check result:", data);
  });
    }
    // send a request to a server
    xmlhttp.send();
    console.log("send a request to a server");
}*/


/*function popupBadLetter() {
    if (!inValidKey) {
        const popup = document.getElementById("badLetter");
        console.log("badLetter");
        popup.classList.add("show");
        setTimeout(() => {
            popup.classList.remove("show");
        }, 1500);
    }
}*/

function restart() {
    var txt = "";
    if (confirm("Are you sure to reset your score to 0?")) {
        txt = "OK";
        requestRestartSession();

    guessWord = guessWord.slice(0, 0);
    displayString();
    } 
    else {
    txt = "Cancel";
    }
}

// send a request to a server for word check (and rank?)
function requestRestartSession() {
    console.log("send to REST");
    // create XMLHttpRequest object "xmlhttp" to request data from a web server
    const xmlhttp = new XMLHttpRequest();
    // open the XMLHttpRequest object
    xmlhttp.open("POST", "http://localhost:8001/restart_session"); 
    // set request header for JSON content
    xmlhttp.setRequestHeader("Content-type", "application/json");
    // define a callback function
    xmlhttp.onlonreadystatechange = function () {
        console.log("response received back from a server");
        if (xmlhttp.readyState === 4 && xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            console.log("Game restarted:", data.message);
        }
    };
    xmlhttp.send(JSON.stringify({ session_id: sessionId }));
}