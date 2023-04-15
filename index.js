// Delveloped from https://www.programiz.com/javascript/examples/get-random-item
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
	messageGuess = decipher(cipher, keyGuess);
	
}

function pageLoad() {
	
	
	const keys = ["bench", "field", "doors"];
	
	key = getRandomElem(keys);
	key = "bench"; // Temporary
	message = getRandomElem(quotes);
	messageChars = removePunctuation(message);
	
	let cipher = encipher(messageChars, key);
	
	guessKey(cipher, "bench");
	
	
}

window.addEventListener("load", pageLoad, false);