// Play.js file

// function to generate random string
function generateRandomString(length) {
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
}

// call generateRandomString function
const randomString = generateRandomString(7); 
console.log("Random string: " + randomString);
for (let i = 0; i < 7; i++) {
    console.log("Random character: " + randomString[i]);
    // retreive the element with id i
    var elem = document.getElementById(i);
    // display the element with id i
    elem.innerHTML = randomString.slice(i, i+1);
}

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

function retryButton() {
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
                //inValidKey = true;
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
