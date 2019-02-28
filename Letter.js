function Letter(abc) { // abc is the hidden letter
    this.character = abc;
    this.guessed = false;

    this.checkLetter = function(guess) { // guess is the letter guessed by the user
        var letterDisplay;
        process.stdout.write("Hidden word: ");
        if (guess === abc) {
            letterDisplay = abc;
            process.stdout.write(letterDisplay + " ");
        }
        else {
            letterDisplay = "_";
            process.stdout.write(letterDisplay + " ");
        }
        console.log("\n");
    };

    this.isGuessed = function(guess) {
        if (guess === abc) {
            this.guessed = true;
        }
        else {
            this.guessed = false;
        }
    };
}
