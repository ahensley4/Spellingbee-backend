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
console.log("random string: " + randomString);
for (let i = 0; i < 7; i++) {
    console.log("random character: " + randomString[i]);
    // retreive the element with id i
    var elem = document.getElementById(i);
    // display the element with id i
    elem.innerHTML = randomString.slice(i, i+1);
}

let guessWord = '';
let inputActive = true;

// function to display current guess word
function displayString() {
    document.getElementById("currentString").innerHTML = guessWord;
    console.log("Current string: " + guessWord);
}

// function to append character to guess word
function addChar(i) {
    console.log("selected character: " + document.getElementById(i).innerHTML);
    if (inputActive) {
        // keep appending characters until the enter button is clicked
        guessWord += document.getElementById(i).innerHTML;
        displayString();
    }
}

// function to delete last character
function deleteButton() {
    console.log("Delete button was pressed");
    if (inputActive && guessWord.length > 1) {
        guessWord = guessWord.slice(0, -1);
        displayString();
    }
}

//function to submit guess word
function enterButton() {
    inputActive = false;
    console.log("Enter button was pressed");
    //send guessed word to REST
}


// keyPressed() function
/*document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("Guess word: ", guessWord);
    } else {
        guessWord += event.key;
        console.log("Current word: ", guessWord);
    }
})*/




