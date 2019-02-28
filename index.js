var word = require("./Word");
var inquirer = require("inquirer");
var randomWords = require("random-words");
var clear = require("clear");

var hiddenWord;
var lettersGuessed = [];
var remainingGuesses;


var startGame = function() {
    inquirer.prompt([
        {
        type: "confirm",
        message: "\n\rDo you want to start a new word guessing game?",
        name: "start game",
        default: "true",
        }
    ]).then(function(inquirerResponse) {
        if (inquirerResponse.confirm) {
            initGame();
            gameLogic();
        }
        else {
            console.log("\n\rWe're sad to not play with you but we understand. Come back anytime!");
            return;
        }
}

var initGame = function() {
    clear(); // clears screen
    lettersGuessed.length = 0; // clears the array of letters guessed
    remainingGuesses = 10; // resets remaining guesses
    hiddenWord = new Word(randomWords()); // selects new random word
    // print out hidden word as underscores and remaining guesses
    console.log("\n\rYou have 10 guesses. If you try to guess the entire word, you only have one try, and if you are wrong, you lose. Use your guesses wisely.\n\r");
}

var pickLetter = function() {
    inquirer.prompt([
        {
            type: "input",
            message: "Pick a letter (or word)",
            name: "letter"
        }
    ]).then(
        guess = inquirer.letter;
    )
}


function gameLogic() {
    pickLetter().then(
        // check guess against each letter and array of letters already used using Word functions

        //lettersGuessed.push(guess); add to array if letter not yet guessed
    )
    
    // print result

    if (remainingGuesses > 0 && guess.length > 1) { // checks word (not letter) guesses
        if (guess === hiddenWord) {
            console.log("\n\rYou are a certified genius! You win!");
            startGame();
        }
        else {
            console.log("\n\rYou ran out of guesses! Gosh you're such a loser :p");
            startGame();
        }
    }
    else if (remainingGuesses > 0 && ) { // good guess, word not guessed yet
        if () {
            console.log("\n\rYou guessed right! Remaining guesses: " + remainingGuesses);
        }
        else if () { // wrong guess, word not guessed yet
            remainingGuesses--;
            console.log("\n\rYou guessed WRONG :( Remaining guesses: " + remainingGuesses);
        }
        else if () { // reused a letter, word not guessed yet
            console.log("\n\rYou already used this letter, try again. Remaining guesses: " + remainingGuesses);
        }
    }
    else if (remainingGuesses >= 0 &&) { // word guessed
        console.log("\n\rYou win!");
        startGame();
    }
    else if (remainingGuesses = 0 &&) { // lose
        console.log("\n\rYou ran out of guesses! Gosh you're such a loser :p");
        startGame();
    }
    else if ()

}

function checkIfWordGuessed() {
    // checks to see if the entire word has already been guessed
    // returns true or false
}