var Word = require("./Word.js");
var inquirer = require("inquirer");
var randomWords = require("random-words");
var clear = require("clear");

var hiddenWord;
var lettersGuessed = [];
var remainingGuesses = 10;
var guess;

function startGame() {
    inquirer.prompt([
        {
        type: "confirm",
        message: "Do you want to start a new word guessing game?",
        name: "start",
        default: "true",
        }
    ]).then(function(inquirerResponse) {
        if (inquirerResponse.start === false) {
            console.log("\n\rWe're sad to not play with you but we understand. Come back anytime!");
            return;
        }
        else {
            initGame();
        }
    })
}

// initialize game
function initGame() {
    clear(); // clears screen
    lettersGuessed.length = 0; // clears the array of letters guessed
    remainingGuesses = 10; // resets remaining guesses
    hiddenWord = new Word(randomWords().toLowerCase()); // selects new random word and makes sure it's lower case
    hiddenWord.letterObjs();

    console.log("\n\rYou have " + remainingGuesses + " guesses. If you try to guess the entire word, you only have one try, and if you are wrong, you lose. Use your guesses wisely. You can quit at any time by typing in 'exit'.\n\r");

    pickLetter();
}

// prompts user to pick a letter
function pickLetter() {
    hiddenWord.displayHiddenWord();
    inquirer.prompt([
        {
            type: "input",
            message: "Pick a letter (or word)",
            name: "letter"
        }
    ]).then(function(inquirerResponse) {
        guess = inquirerResponse.letter.toLowerCase(); // makes the guess lower case
        if (lettersGuessed.includes(guess) === false && guess.length === 1) {
            lettersGuessed.push(guess);
        }
        gameLogic();
    }
    )
}

//working on this one
function gameLogic() {
    if (remainingGuesses > 0) {
    
        if (guess === "exit") { // user wants to quit game before it's finished
            console.log("\r\n\r\nWHAT?! Why are you quitting now? You're making us cry.");
            return;
        }
        else if (guess.length > 1 && guess != "exit") { // checks word (not letter) guesses
            // there's a scope problem with the var guess
            if (guess === hiddenWord) {
                console.log("\n\rYou are a certified genius! You win!");
                startGame();
            }
            else {
                console.log("\n\rYou ran out of guesses! Gosh you're such a loser :p");
                startGame();
            }
        }
        else if (guess.length = 1) { 
            if () { // good guess, word not guessed yet
                console.log("\n\rYou guessed right! Remaining guesses: " + remainingGuesses);
                pickLetter();
            }
            else if () { // wrong guess, word not guessed yet
                remainingGuesses--;
                console.log("\n\rYou guessed WRONG :( Remaining guesses: " + remainingGuesses);
                pickLetter();
            }
            else if (lettersGuessed.includes(guess) === true) { // reused a letter, word not guessed yet
                remainingGuesses--;
                console.log("\n\rYou already used this letter, try again. Remaining guesses: " + remainingGuesses);
                pickLetter();
            }
    }}

    else if if (remainingGuesses = 0 &&) { // lose
        console.log("\n\rYou ran out of guesses! Gosh you're such a loser :p");
        startGame();
    }
}}

startGame();