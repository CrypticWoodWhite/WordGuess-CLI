function Letter(abc) { // abc is one letter of the hidden word
    this.character = abc;
    this.isGuessed = false;

    this.checkLetter = function(guess) { // guess is the letter guessed by the user
        var letterDisplay;
        if (guess === abc) {
            letterDisplay = abc;
        }
        else {
            letterDisplay = "_";
        }
        return letterDisplay;
    };

    this.checkIfIsGuessed = function(guess) {
        if (guess === abc) {
            this.isGuessed = true;
        }
    };
}

module.exports = Letter;