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
            console.log("\n\rWe're sad to not play with you but we understand. Come back anytime!\n\r");
            return;
        }
        else {
            initGame();
        }
    })
}

// initialize game
function initGame() {
    clear(); // clears screen // why is this not working?
    lettersGuessed.length = 0; // clears the array of letters guessed
    remainingGuesses = 10; // resets remaining guesses
    hiddenWord = new Word(randomWords().toUpperCase()); // selects new random word and makes sure it's upper case
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
            message: "Pick a letter (or word) (or 'exit')",
            name: "letter"
        }
    ]).then(function(inquirerResponse) {
        guess = inquirerResponse.letter.toUpperCase(); // makes the guess upper case
        hiddenWord.guessEachLetter(guess);
        gameLogic(guess); // checks guess against the hidden word etc
    })
}

//working on this one
function gameLogic(xyz) {

    if (remainingGuesses > 1) {
    
        if (xyz === "exit") { // user wants to quit game before it's finished
            console.log("\r\nWHAT?! Why are you quitting now? You're making us cry :'-(\r\nEND GAME.\r\n");
            startGame();
        }

        else if (xyz.length > 1 && xyz != "exit") { // checks word (not letter) guesses
            if (xyz === hiddenWord.word) {
                console.log("\n\rWow! You are a certified genius! You win!\r\nEND GAME.\r\n");
                startGame();
            }
            else { // one wrong word guess and user loses
                console.log("You guessed wrong! LOSER :p The word is: " + hiddenWord.word + ".\r\nEND GAME.\r\n");
                startGame();
            }
        }

        else if (xyz.length === 1) { // checks letter guesses
            if (lettersGuessed.includes(xyz) === true) { // reused a letter, word not guessed yet
                remainingGuesses--;
                console.log("\n\rYou already used this letter, try again. Remaining guesses: " + remainingGuesses + ".\r\n");
            } // works up through this line

            else if (lettersGuessed.includes(xyz) === false) {

                    if (hiddenWord.word.includes(xyz) === true) { // good guess, word not guessed yet
                        console.log("\n\rYou guessed right! Remaining guesses: " + remainingGuesses + ".\r\n");
                    }
                    else if (hiddenWord.word.includes(xyz) === false) { // wrong guess, word not guessed yet
                        remainingGuesses--;
                        console.log("\n\rYou guessed WRONG, try again. Remaining guesses: " + remainingGuesses + ".\r\n");
                    }
                }

            if (lettersGuessed.includes(guess) === false && guess.length === 1) { // code works again starting here
                lettersGuessed.push(guess); // keeps track of letters already guessed
            }
            pickLetter(); 
        }
    }
    else { // user runs out of guesses before guessing word
        console.log("\n\rYou ran out of guesses! Gosh you're such a loser :p The word is: " + hiddenWord.word + ".\r\nEND GAME.\r\n");
        startGame();
    }
}

startGame();