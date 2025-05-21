// Play.js file

// tell browser to assign keyPressed anytime someone presses down a key
// document.onkeydown = keyPressed;

// function to generate random sample string
/*function generateRandomString(length) {
    let result = '';
    const usedChars = new Set();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; *//* generate string with capital alphabet */
    /*const vowel = 'AEIOU';*/

    /*while (result.length < length) {
        /* generate random character */
        /*const randomIndex = Math.floor(Math.random() * characters.length);
        const randomChar = characters.charAt(randomIndex);*/
        /*const randomVowel = vowel.charAt(randomIndex);*/

        /* make sure to have a string with non-repeated characters */
        /*if (!usedChars.has(randomChar)) {
            result += randomChar;
            usedChars.add(randomChar);
        }*/
        /*if ((result.length == (length - 1) && !usedChars.has(vowel)) && !usedChars.has(randomChar)) {
            result += randomVowel;
            usedChars.add(randomVowel);
        }
    }
    return result;
}*/

// function to generate random string
function generateRandomString(length) {
    const vowel = 'AEIOU';
    const consonant = 'BCDFGHJKLMNPQRSTVWXYZ';
    const allChar = vowel + consonant;
    
    if (length < 1) return '';

    // make sure to include at least one vowel
    const guaranteedVowel = vowel[Math.floor(Math.random() * vowel.length)];

    // Initialize result with a vowel
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
    console.log("random string: " + randomString[i]);
    /* retreive the element whose id = i in play.html */
    var elem = document.getElementById(i);
    /* display the element whose id = i */
    elem.innerHTML = randomString.slice(i, i+1);
}

/* function to output the element in the boxes */
function displayElement(i) {
    document.getElementById("display").innerHTML = document.getElementById(i).innerHTML;
}



