// Delveloped from https://www.programiz.com/javascript/examples/get-random-item
const submitBtn = document.querySelector('input[type="submit"]');
const tileDisplay = document.querySelector(".tile-container");
const phraseKey = document.querySelector("#keyInput");
const frequency = document.querySelector("#freq");
let cipher = "";
let messageSpaces = "";
let currentRow = 0;
let currentTile = 0;
let attempts = 0;
let keyGuesses = [];
let hasWon = false;


function getRandomElem(array) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

function removePunctuation(string) {
	return string.replace(/[.,-;'"]/g,"").replace(/\s/g,"").toLowerCase();
}

function encipher(messageChars, key) {
	keyIndex = 0;
	
	for (let i = 0; i < messageChars.length; i++) {
		let rotation = key.charCodeAt(keyIndex) - 97;
		let messageCharCode = messageChars.charCodeAt(i);
		let cipherChar = String.fromCharCode((messageCharCode - 97 - rotation + 26) % 26 + 97);
		cipher += cipherChar;
		keyIndex = (keyIndex + 1) % key.length;
	}
	
	document.getElementById("message").innerHTML = cipher;
	
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

function guessKey(e) {
	e.preventDefault();
	if (attempts === 10 || hasWon) {
		return;
	}
	keyGuess = document.getElementById("keyInput").value.toLowerCase(); //What is keyGuess? Should this be a let?
	
	if (keyGuess.toLowerCase() == key) {
		document.getElementById("message").innerHTML = messageSpaces;
		createRow();
		keyGuesses.push(keyGuess);
		setTimeout(() => alert("You Won!"), 0);
		hasWon = true;
	}
	else if (words.includes(keyGuess)) {
		createRow();
		messageGuess = decipher(cipher, keyGuess);
		document.getElementById("message").innerHTML = addSpaces(messageGuess, keyGuess.length);
		keyGuesses.push(keyGuess);
		attempts++;
	}
	else {
		alert("Guesses must be dictionary words");
	}

	if (attempts === 10) {
		setTimeout(() => alert("You LOSE! The correct key is " + key), 0);
	}
}

function addSpaces(messageGuess, keyLength) {
	messageGuessSpaces = "";
	let messageGuessList = messageGuess.split('');
	
	for (let i = 0; i < messageGuess.length; i += keyLength) {		
		let arrayCopy = messageGuessList.slice();
		slice = arrayCopy.slice(i, i + keyLength);
		messageGuessSpaces += slice.join('') + " ";
	}
	
	return messageGuessSpaces
}

function displayCipher(keyGuess, keyIndex) {
	messageGuess = decipher(cipher, keyGuess);
	messageGuessSpaces = addSpaces(messageGuess, keyGuess.length);
	
	let messageGuessDisplay = "";
	
	for (let i = 0; i < messageGuessSpaces.length; i++) {
		if (((i - keyIndex + 2*(keyGuess.length+1)) % (keyGuess.length + 1)) == 0) {
			messageGuessDisplay += "<span>" + messageGuessSpaces[i] + "</span>";
		}
		else {
			messageGuessDisplay += messageGuessSpaces[i];
		}
		
	}
	
	document.getElementById("message").innerHTML = messageGuessDisplay;
}

function clickLetter(event) {
	let id = event.target.id;
	element = document.getElementById(id);
	
	selectedElements = document.getElementsByClassName("selected");
	for (let i = 0; i < selectedElements.length; i++) {
		selectedElements[i].classList.remove("selected");
	}
	
	element.classList.add("selected");
	
	let index = Number(id[id.length - 1])
	let keyIndex = Number(id[9])
	let keyGuess = keyGuesses[keyIndex]
	
	displayCipher(keyGuess, index);
	
	let letterCount = {};
	totalLetters = 0;
	
	alphabet = "abcdefghijklmnopqrstuvwxyz";
	substitution = decipher(alphabet, keyGuess[index]);
	
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
	let tableRow = document.createElement("tr");
	frequency.innerHTML = "<tr><th id='tableHeader1'>Substitution</th><th>Frequency</th></tr>";
	for (let i = 0; i < alphabet.length; i++) {
		let tableRow = document.createElement("tr");
		let tdOne = document.createElement("td");
		let tdTwo = document.createElement("td");
		
		let col1 = alphabet[i] + "\u2192" + substitution[i];
		tdOne.innerHTML = col1;
		
		let col2 = parseFloat(letterCount[alphabet[i]] / totalLetters * 100).toFixed(2).padStart(5,"0") + "%";
		if (isNaN(letterCount[alphabet[i]])) {
			col2 = " 00.00%";
		}
		tdTwo.innerHTML = col2;
		tableRow.append(tdOne);
		tableRow.append(tdTwo);
		frequency.append(tableRow);
		
	}
}

function pageLoad() {
	const keys = ["bench", "field", "doors"];
	
	key = getRandomElem(words);
	console.log(key)
	messageSpaces = getRandomElem(quotes);
	messageChars = removePunctuation(messageSpaces);
	cipher = encipher(messageChars, key);
}

function createRow() {
	if (attempts === 10 || hasWon) {
		return;
	}
	let wordGuessed = phraseKey.value.toLowerCase();
	const rowArray = [];
	const rowElement = document.createElement("div");
	rowElement.setAttribute("id", "guessRow-" + currentRow);
	for (let i = 0; i < wordGuessed.length; i++) {
		const tileElement = document.createElement("div");
		tileElement.setAttribute("id", "guessRow-" + currentRow + "-tile-" + currentTile);
		tileElement.classList.add("tile");
		tileElement.innerHTML = wordGuessed[i];
		tileElement.addEventListener("click", clickLetter, false);
		rowElement.append(tileElement);
		currentTile++;
	}
	tileDisplay.append(rowElement);
	currentTile = 0;
	currentRow++;
	phraseKey.value = "";
}

window.addEventListener("load", pageLoad, false);
submitBtn.addEventListener("click", guessKey);
