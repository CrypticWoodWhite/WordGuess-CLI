var Letter = require("./Letter.js");

function Word(hiddenWord) {

    this.letters = [];

    this.letterObjs = function() {
        var wordArray = hiddenWord.split("");
        for (var i=0; i<wordArray.length; i++) {
            var letterObject = new Letter(wordArray[i]);
            this.letters.push(letterObject);
        }
    };

    this.displayHiddenWord = function(guess) {
        var wordDisplayArray = [];
        var letterPlaceholder;
        var wordDisplay;
        for (var j=0; j<this.letters.length; j++) {
            letterPlaceholder = this.letters[j].checkLetter(guess);
            wordDisplayArray.push(letterPlaceholder);
        }        
        wordDisplay = wordDisplayArray.join(" ");
        console.log("\r\nGuess this word: " + wordDisplay + "\n\r");
    };

    this.guessEachLetter = function(guess) {
        for (var k=0; k<this.letters.length; k++) {
            this.letters[k].checkIfIsGuessed(guess);
        }
    };
}

module.exports = Word;