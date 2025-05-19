/*Play.js file*/

/* function to generate random sample string */
function generateRandomString(length) {
    let result = '';
    const usedChars = new Set();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; /* generate string with capital alphabet */

    while (result.length < length) {
        /* generate random character */
        const randomIndex = Math.floor(Math.random() * characters.length);
        const randomChar = characters.charAt(randomIndex);

        /* make sure to have a string with non-repeated characters */
        if (!usedChars.has(randomChar)) {
            result += randomChar;
            usedChars.add(randomChar);
        }
    }
    return result;
}

/* call generateRandomString function */
const randomString = generateRandomString(7); 
console.log("random string: " + randomString);
for (let i = 0; i < 7; i++) {
    console.log("random string: " + randomString[i]);
    /* retreive the element whose id = i in play.html */
    var elem = document.getElementById(i);
    /* display the element whose id = i */
    elem.innerHTML = randomString.slice(i, i+1);
}
