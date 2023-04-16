// Delveloped from https://www.programiz.com/javascript/examples/get-random-item
const tileDisplay = document.querySelector(".tile-container");
const phraseKey = document.querySelector("#keyInput");


function getRandomElem(array) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

function removePunctuation(string) {
	return string.replace(/[.,-;]/g,"").replace(/\s/g,"").toLowerCase();
}

function encipher(messageChars, key) {
	let cipher = "";
	
	keyIndex = 0;
	
	for (let i = 0; i < messageChars.length; i++) {
		let rotation = key.charCodeAt(keyIndex) - 97;
		let messageCharCode = messageChars.charCodeAt(i);
		let cipherChar = String.fromCharCode((messageCharCode - 97 - rotation + 26) % 26 + 97);
		cipher += cipherChar;
		keyIndex = (keyIndex + 1) % key.length;
	}
	
	return cipher;
}

function decipher(cipherChars, keyGuess) {
	let message = "";
	
	keyIndex = 0;
	
	for (let i = 0; i < cipherChars.length; i++) {
		let rotation = keyGuess.charCodeAt(keyIndex) - 97;
		let cipherCharCode = cipherChars.charCodeAt(i);
		let messageChar = String.fromCharCode((cipherCharCode - 97 + rotation) % 26 + 97);
		message += messageChar;
		keyIndex = (keyIndex + 1) % keyGuess.length;
	}
	
	return message;
}

function guessKey(cipher, keyGuess) {
	if (keyGuess.toLowerCase() == key) {
		alert("You Won!");
	}
	
	if (words.includes(keyGuess)) {
		messageGuess = decipher(cipher, keyGuess);
		console.log(messageGuess);
	}
	else {
		alert("Guesses must be dictionary words");
	}
}

function clickLetter(cipher, keyGuess, index) {
	let letterCount = {};
	letterCount['a'] = 5
	
	totalLetters = 0;
	
	alphabet = "abcdefghijklmnopqrstuvwxyz";
	substitution = decipher(alphabet, keyGuess);
	
	cipherIndex = index;
	while (cipherIndex < cipher.length) {
		totalLetters += 1;
		if (cipher[cipherIndex] in letterCount) {
			letterCount[cipher[cipherIndex]] += 1;
		}
		else {
			letterCount[cipher[cipherIndex]] = 1;
		}
		
		cipherIndex += keyGuess.length;
	}
	
	for (let i = 0; i < alphabet.length; i++) {
		let col1 = alphabet[i] + String.fromCharCode(26) + substitution[i];
		console.log(col1);
		let col2 = parseFloat(letterCount[alphabet[i]] / totalLetters * 100).toFixed(2) + "%";
		console.log(col2);
	}
}

function pageLoad() {
	const keys = ["bench", "field", "doors"];
	
	key = getRandomElem(keys);
	key = "bench"; // Temporary
	message = getRandomElem(quotes);
	messageChars = removePunctuation(message);
	
	let cipher = encipher(messageChars, key);
	
	guessKey(cipher, "bench"); // temp
	
	clickLetter(cipher, "bench", 0) //temp
}

const guessRows = [
	["","","","",""],
	["","","","",""],
	["","","","",""],
	["","","","",""],
	["","","","",""],
	["","","","",""],
	["","","","",""],
	["","","","",""],
	["","","","",""],
	["","","","",""]
]

guessRows.forEach((guessRow, guessRowIndex) => {
	const rowElement = document.createElement("div");
	rowElement.setAttribute("id", "guessRow-" + guessRowIndex);
	guessRow.forEach((guess, guessIndex) => {
		const tileElement = document.createElement("div");
		tileElement.setAttribute("id", "guessRow-" + guessRowIndex + "-tile-" + guessIndex);
		tileElement.classList.add("tile");
		rowElement.append(tileElement);
	})

	tileDisplay.append(rowElement);
})


/*function addLetter(e) {
	const tile = document.getElementById("guessRow-" + currentRow + "-tile-" +currentTile);
	if (e.key === "Enter") {
		console.log(phraseKey.value);
	}
	
	//tile.textContent = letter;
} */

let currentRow = 0;
let currentTile = 0;

document.addEventListener("keypress", function(event) {
	let tile = document.getElementById("guessRow-" + currentRow + "-tile-" + currentTile);
	if (event.key === "Enter") {
		let wordGuessed = phraseKey.value;
		for (let i = 0; i < wordGuessed.length; i++) {
			console.log(wordGuessed[i]);
			tile.textContent = wordGuessed[i];
			currentTile++;
			tile = document.getElementById("guessRow-" + currentRow + "-tile-" + currentTile);
		}
		currentTile = 0;
		currentRow++;
	}
});
window.addEventListener("load", pageLoad, false);
