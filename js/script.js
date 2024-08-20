const display = document.getElementById('display');
const passLengthDiv = document.getElementById('pass-length-div');
const strengthLabel = document.getElementById('strength-label');
const generateButton = document.getElementById('generate');

const rangeInput = document.getElementById('range');
const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numbersCheckbox = document.getElementById('numbers');
const symbolsCheckbox = document.getElementById('symbols');

const strengthBars = document.getElementById('strength-bars')
let strengthLevel;

let passwordLength = 10;

let uppercaseLetters = '';
let lowercaseLetters = '';
let numbers = '';
let symbols = '';
let allCharacters = '';


function validate() {
	strengthLevel = 0;
	if (uppercaseCheckbox.checked) {
		uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		strengthLevel++;
	}
	if (lowercaseCheckbox.checked) {
		lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
		strengthLevel++;
	}
	if (numbersCheckbox.checked) {
		numbers = '1234567890';
		strengthLevel++;
	}
	if (symbolsCheckbox.checked) {
		symbols = '!@#$%&*?';
		strengthLevel++;
	}

	allCharacters = uppercaseLetters + lowercaseLetters + numbers + symbols;

	uppercaseLetters = '';
	lowercaseLetters = '';
	numbers = '';
	symbols = '';

	return allCharacters.length > 0;
}

function generate(characters, length) {
	let password = '';
	for (let i = 0; i < length; i++) {
		password += characters[Math.floor(Math.random() * characters.length)];
	}
	return password
}

function clearStrenghtBars() {
	strengthBars.classList.remove('too-weak');
	strengthBars.classList.remove('weak');
	strengthBars.classList.remove('medium');
	strengthBars.classList.remove('strong');
}

function strength() {
	clearStrenghtBars()
	switch (strengthLevel) {
		case 1:
			strengthBars.classList.add('too-weak');
			strengthLabel.textContent = 'Too Weak';
			break;
		case 2:
			strengthBars.classList.add('weak');
			strengthLabel.textContent = 'Weak';
			break;
		case 3:
			strengthBars.classList.add('medium');
			strengthLabel.textContent = 'Medium';
			break;
		case 4:
			strengthBars.classList.add('strong');
			strengthLabel.textContent = 'Strong';
			break;
	}
}

function main() {
	if (validate()) {
		const password = generate(allCharacters, passwordLength);
		display.textContent = password;
		strength();
	}
}


rangeInput.addEventListener('input', () => {
	passwordLength = Number(rangeInput.value);
	passLengthDiv.textContent = passwordLength;
});

generateButton.addEventListener('click', main)

main();
