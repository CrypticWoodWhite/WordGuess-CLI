function Letter(abc) { // abc is one letter of the hidden word
    this.character = abc;
    this.isGuessed = false;

    this.checkLetter = function(guess) { // guess is the letter guessed by the user
        var letterDisplay;
        if (guess === this.character || this.isGuessed === true)  {
            letterDisplay = this.character;
        }
        else {
            letterDisplay = "_";
        }
        return letterDisplay;
    };

    this.checkIfIsGuessed = function(guess) {
        if (guess === this.character) {
            this.isGuessed = true;
        }
    };
}

module.exports = Letter;