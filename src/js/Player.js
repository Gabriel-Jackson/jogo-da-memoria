class Player {
  pontuacao = 0;

  placar = null;

  constructor(nome){
    this.nome = nome;
    let scoreWrapper = document.createElement("div");

    scoreWrapper.className = "player-score";

    let scoreTitle = document.createElement("h2");

    scoreTitle.innerText = this.nome;

    let score = document.createElement("p");

    score.innerText = this.pontuacao;

    this.placar = score;

    scoreWrapper.appendChild(scoreTitle);
    scoreWrapper.appendChild(score);

    this.wrapper = scoreWrapper;
    document.querySelector(".game-header").appendChild(scoreWrapper);
  }


  makePoint(){
    this.pontuacao ++;
    this.placar.innerText = this.pontuacao;
  }

  select(){
    document.querySelectorAll(".player-score.active").forEach((score)=> {
      score.classList.remove("active");
    })

    this.wrapper.classList.add("active");
  }

  reset(){
    this.pontuacao = 0;
    this.wrapper.classList.remove("active");
    this.placar.innerText = this.pontuacao;
  }
}
