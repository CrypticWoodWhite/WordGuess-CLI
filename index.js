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
    clear(); // clears screen // why is this not working?
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
            lettersGuessed.push(guess); // keeps track of letters already guessed
        }
        hiddenWord.guessEachLetter(guess);
        hiddenWord.displayHiddenWord();
        gameLogic(guess); // checks guess against the hidden word etc
    })
}

//working on this one
function gameLogic(xyz) {

    if (remainingGuesses > 0) { // tried using a while loop but then it just gets stuck forever
    
        if (xyz === "exit") { // user wants to quit game before it's finished // this works
            console.log("\r\nWHAT?! Why are you quitting now? You're making us cry :'-(\r\n");
            startGame();
        }
        else if (xyz.length > 1 && xyz != "exit") { // checks word (not letter) guesses // this presumably works
            if (xyz === hiddenWord) {
                console.log("\n\rYou are a certified genius! You win!\r\n");
                startGame();
            }
            else { // one wrong word guess and user loses // this works
                console.log("You guessed wrong! Gosh you're such a loser :p\r\n");
                startGame();
            }
        }
        else if (xyz.length === 1) { 
             console.log("guess is a letter"); // works up til this part

            for (var l=0; l<hiddenWord.length; l++) { // there's a problem with this for loop. Maybe shouldn't use a for loop

                if (hiddenWord.letters[l].character === xyz && lettersGuessed.includes(xyz) === false) { // good guess, word not guessed yet
                    console.log("\n\rYou guessed right! Remaining guesses: " + remainingGuesses);
                }
                else if (hiddenWord.letters[l].character != xyz && lettersGuessed.includes(xyz) === false) { // wrong guess, word not guessed yet
                    remainingGuesses--;
                    console.log("\n\rYou guessed WRONG, try again. Remaining guesses: " + remainingGuesses);
                }
                else if (lettersGuessed.includes(xyz) === true) { // reused a letter, word not guessed yet
                    remainingGuesses--;
                    console.log("\n\rYou already used this letter, try again. Remaining guesses: " + remainingGuesses);
                    
                }
            }
            pickLetter();
        }
    }

    else if (remainingGuesses === 0) { // lose // this does not work either
        console.log("\n\rYou ran out of guesses! Gosh you're such a loser :p\r\n");
        startGame();
    }


}

startGame();