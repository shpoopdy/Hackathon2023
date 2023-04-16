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


function getRandomElem(array) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

function removePunctuation(string) {
	return string.replace(/[.,-;]/g,"").replace(/\s/g,"").toLowerCase();
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
	
	//document.getElementById("message").innerHTML = message;
	
	return message;
}

function guessKey(e) {
	e.preventDefault();
	keyGuess = document.getElementById("keyInput").value.toLowerCase();
	keyGuesses.push(keyGuess);
	if (keyGuess.toLowerCase() == key) {
		document.getElementById("message").innerHTML = messageSpaces;
		createRow();
		setTimeout(() => alert("You Won!"), 0);
	}
	else if (words.includes(keyGuess)) {
		createRow();
		messageGuess = decipher(cipher, keyGuess);
		document.getElementById("message").innerHTML = messageGuess;
		attempts++;
	}
	else {
		alert("Guesses must be dictionary words");
	}

	if (attempts === 10) {
		setTimeout(() => alert("You LOSE!"), 0);
	}
}

function clickLetter(event) {
	let id = event.target.id;
	console.log(id)
	
	let index = Number(id[id.length - 1])
	let keyIndex = id[9]
	let keyGuess = keyGuesses[keyIndex]
	console.log("keyGuess", keyGuess)
	console.log("index",index)
	
	
	let letterCount = {};
	
	totalLetters = 0;
	
	alphabet = "abcdefghijklmnopqrstuvwxyz";
	substitution = decipher(alphabet, keyGuess[index]);
	
	cipherIndex = index;
	console.log(cipherIndex)
	while (cipherIndex < cipher.length) {
		console.log(cipherIndex)
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
		
		let col2 = parseFloat(letterCount[alphabet[i]] / totalLetters * 100).toFixed(2) + "%";
		if (isNaN(letterCount[alphabet[i]])) {
			col2 = "0.00%";
		}
		tdTwo.innerHTML = col2;
		tableRow.append(tdOne);
		tableRow.append(tdTwo);
		frequency.append(tableRow);
		
	}
}

function pageLoad() {
	const keys = ["bench", "field", "doors"];
	
	key = getRandomElem(keys);
	key = "bench"; // Temporary
	messageSpaces = getRandomElem(quotes);
	messageChars = removePunctuation(messageSpaces);
	
	cipher = encipher(messageChars, key);
	
}

function createRow() {
	//e.preventDefault();
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
