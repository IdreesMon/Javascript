//build class for players

class Player{

    constructor(id)
    {
        this.name="idrees";
        this.score= 0;
        this.highScore= 0;
        this.pad=``
        console.log(id)
        this.score_count = document.querySelector("#"+id+"_score")
        return this;
    }

    updateScore = () => {
        this.score_count.innerText = this.score;
    }
}


