// Play.js file

// Start or resume session
let sessionId = localStorage.getItem("session_id");
let letters = localStorage.getItem("letters");
let centerLetter = localStorage.getItem("center_letter");
//let letters = "";
//let centerLetter = "";

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
        //localStorage.setItem("letters", letters);   
        //localStorage.setItem("center_letter", centerLetter);
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
}

let length = letters.length;
for (let i = 0; i < length; i++) { 
    console.log("Random character: " + letters[i]);
    // retreive the element with id i
    var elem = document.getElementById(i);
    // display the element with id i
    elem.innerHTML = letters.slice(i, i+1);
}


/*console.log("Letters' length: ", length);
let elem = "";
let index = 0;
let indexLetter = "";
for (let i = 0; i < length; i++) {
    console.log("Random character: " + letters[i]);
    console.log("center letter: ", centerLetter);
    // retreive the element with id i
    //elem = document.getElementById(i);
    if (letters[i] == centerLetter) {
        index = i;
        console.log("What is index: ", index);
        indexLetter = letters[i];
        console.log("What is index letter: ", indexLetter);
    }
}

for (let i = 0; i < length; i++) {
    if (i == 3) {
        // retreive the element with id i
        elem = document.getElementById(index);
        // display the element with id i
        elem.innerHTML = letters.slice(index, index+1);
    }
    else if (i == index) {
        elem = document.getElementById(3);
        // display the element with id i
        elem.innerHTML = letters.slice(3, 3+1);
    }
    else {
        // retreive the element with id i
        elem = document.getElementById(i);
        // display the element with id i
        elem.innerHTML = letters.slice(i, i+1);
    }
}*/
    
    /*if (document.getElementById(i) == centerLetter) {
        index = i;
elem = document.getElementById(i);
if (document.getElementById(3) != centerLetter) {
    document.getElementById(index) = document.getElementById(3);
    document.getElementById(3) = centerLetter;
}

for (let i = 0; i < length; i++) {
    // display the element with id i
    
}*/

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

// Start or resume session
/*let sessionId = localStorage.getItem("session_id");
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
    const response = JSON.parse(xmlhttp.responseText);
    console.log("Session ID: " + response.session_id);
    console.log("Daily Letters: " + response.letters);
    console.log("Center Letter: " + response.center_letter);
    // stores session id
    localStorage.setItem("session_id", response.session_id);
    xmlhttp.catch(err => console.error("Error creating session", err));
    }
// send a request to a server
xmlhttp.send();
console.log("send a request to a server");
}
else {
    console.log("Resuming session:", sessionId);
    console.log("Daily letters:", letters);
    console.log("Center letter:", centerLetter);
}*/

// create XMLHttpRequest object "xmlhttp" to request data from a web server
/*const xmlhttp = new XMLHttpRequest();
// open the XMLHttpRequest object
xmlhttp.open("GET", "http://127.0.0.1:8001/create_session");

// xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// define a callback function
xmlhttp.onload = function () {
    console.log("response back from a server");
    // convert JSON response
    const response = JSON.parse(xmlhttp.responseText);
    console.log("Session ID: " + response.session_id);
    // stores session id
    localStorage.setItem("session_id", response.session_id);
}

// send a request to a server
xmlhttp.send();
console.log("send a request to a server");*/

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

fetch("http://127.0.0.1:8001/check_word", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    guessWord,
    session_id: sessionId,
    all_letters: letters,
    center_letter: centerLetter 
  })
})
  .then(res => res.json())
  .then(data => {
    console.log("Check result:", data);
  });

    }
    inputActive = true;
    guessWord = guessWord.slice(0, 0);
    displayString();
}

function wordCheck() {
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

// send a request to a server for word check (and rank?)
/*function requestWordCheck() {
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
        JSON.stringify({
            word,
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
        fetch("http://127.0.0.1:8001/restart_session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId })
    })
    .then(res => res.json())
    .then(data => {
    console.log("Game restarted:", data.message);
    guessWord = guessWord.slice(0, 0);
    displayString();
});
    } else {
    txt = "Cancel";
    }
}

// send a request to a server for word check (and rank?)
/*function requestRestartSession() {
    console.log("send to REST");
    // create XMLHttpRequest object "xmlhttp" to request data from a web server
    const xmlhttp = new XMLHttpRequest();
    // open the XMLHttpRequest object
    xmlhttp.open("GET", "http://localhost:8001/restart_session"); 

    //xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    // define a callback function
    xmlhttp.onload = function () {
        console.log("response received back from a server");
        //document.getElementById("id-name").innerHTML = this.responseText;
        /*const resObj = JSON.parse(this.responseText);
        console.log("response: ", resObj['myStuff']);
        stuff = resObj['myStuff']
        var elem = document.getElementById("");
        elem.innerHTML = stuff;*/
    /*}
    // send a request to a server
    xmlhttp.send();
    console.log("send a request to a server");
}*/