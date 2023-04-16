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
