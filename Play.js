// Play.js file

// function to generate random string
function generateRandomString(length) {
    console.log("random string will be generated");
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

// function to output the element in the boxes
function displayElement(i) {
    console.log("character: " + document.getElementById(i).innerHTML + " was selected");
    if (inputActive)  {
        guessWord += document.getElementById(i).innerHTML;
        document.getElementById("currentString").innerHTML = guessWord;    
    }
}

// function to send the guessed word to API
function enterButton() {
    console.log("Enter button was pressed");
    inputActive = false;
    // sent the guessed word to REST
    // code from lab6 can be reused 
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




