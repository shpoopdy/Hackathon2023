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
		let cipherCharCode = messageChars.charCodeAt(i);
		let cipherChar = String.fromCharCode((cipherCharCode - 97 - rotation + 26) % 26 + 97);
		cipher += cipherChar;
		keyIndex = (keyIndex + 1) % key.length;
	}
	
	return cipher;
}

function pageLoad() {
	const keys = ["bench", "field", "doors"];
	
	key = getRandomElem(keys);
	key = "bench"; // Temporary
	message = getRandomElem(quotes);
	messageChars = removePunctuation(message);
	
	cipher = encipher(messageChars, key)
}

window.addEventListener("load", pageLoad, false);