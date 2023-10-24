
const emojis = [
  "😀",
  "😀",
  "🤑",
  "🤑",
  "🤡",
  "🤡",
  "😻",
  "😻",
  "🙈",
  "🙈",
  "🦁",
  "🦁",
  "🐯",
  "🐯",
  "🐭",
  "🐭"
];


let openCards = [];

const state = {
  view: {

  },
  values: {
    players : [],
    currentPlayerIndex: 0,
    currentPlayer: null
  },
}

function createPlayers (totalPlayers = 1){
  document.querySelector(".game-header").innerHTML = "";
  state.values.players = [];

  for(i=1; i <= totalPlayers; i ++){
    let player = new Player(`P#${i}`);

    state.values.players.push(player);
  }

  state.values.currentPlayer = state.values.players[0];

  state.values.currentPlayer.select();
}

function handleClick() {
  if(!this.classList.contains("boxOpen")){
    if(openCards.length < 2){
      this.classList.add("boxOpen");
      openCards.push(this);
    }
  }

  if(openCards.length == 2){
    setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  if(openCards[0].innerHTML === openCards[1].innerHTML){
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");

    state.values.currentPlayer.makePoint();
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");

    if(state.values.currentPlayerIndex < state.values.players.length - 1){
      state.values.currentPlayerIndex ++;
    } else{
      state.values.currentPlayerIndex = 0;
    }

    state.values.currentPlayer = state.values.players[state.values.currentPlayerIndex];

    state.values.currentPlayer.select();
  }

  openCards = [];

  if(document.querySelectorAll(".boxMatch").length === emojis.length){
    endGame();
  }
}

function endGame() {
  let finalScore = document.querySelector("#win .modal-body .final-score");

    finalScore.innerHTML = "";

    let bestPlayers = [state.values.currentPlayer];

    let bestScore = bestPlayers[0].pontuacao;

    state.values.players.forEach((player) => {
      let pointLine = document.createElement("h2");
      pointLine.className = "point-line";

      pointLine.innerHTML = `<span>${player.nome}</span> ${player.pontuacao}pts`;

      finalScore.appendChild(pointLine);

      if(player.pontuacao > bestScore){
        bestScore = player.pontuacao
        bestPlayers = [player];
      } else if(player.pontuacao === bestScore && !bestPlayers.includes(player)){
        bestPlayers.push(player);
      }
    });

    bestPlayers = bestPlayers.map((player) => player.nome);

    let winnerLine = document.createElement('h2');

    winnerLine.innerHTML = (bestPlayers.length > 1)? bestPlayers.join() + " empataram no topo": `${bestPlayers[0]} é o(a) vencedor(a)`;

    finalScore.appendChild(winnerLine);

    openModal("win");
}

function resetGame() {
  state.values.players.forEach((player) => {
    player.reset()
  });

  document.querySelectorAll(".boxMatch").forEach((box) => {
    box.classList.remove("boxMatch");
    box.classList.remove("boxOpen");
  });

  state.values.currentPlayer = state.values.players[0];
  state.values.currentPlayerIndex = 0;

  state.values.currentPlayer.select();

  setTimeout(shuffleBoard, 250)
}


function shuffleBoard() {
  document.querySelector(".game").innerHTML = "";

  let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5? 2: -1));

  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");

    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick = handleClick;
    document.querySelector(".game").appendChild(box)
  }
}

shuffleBoard();