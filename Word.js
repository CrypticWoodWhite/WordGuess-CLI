var letter = require("./Letter");


function Word(word) {
    this.letters = function(hiddenword) { // how to do this without using a function? Could put function outside of the constructor object
        arrayWord = hiddenWord.split("");
        var arrayLetters;
        for (var i=0; i<arrayWord.length; i++) {
            arrayLetters.push(new Letter(arrayWord[i]));
        }
        return arrayLetters;
    }

    this.stringHiddenWord = function(this) {
        var string = this.letters.join("");
    };

    this.guessEachLetter = function(character) {

    }
}