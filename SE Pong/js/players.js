//build class for players

class Player {
    constructor(score_count) {
        this.name = "idrees";
        this.score = 0;
        this.highScore = 0;
        this.pad = ``
        this.score_count = score_count
        return this;
    }

    updateScore = () => {
        this.score_count.innerText = this.score;
    }
}


