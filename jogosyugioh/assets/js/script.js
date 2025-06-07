let turno = 1;
let cartaJogador1 = null;
let cartaJogador2 = null;

function jogarCarta(elemento) {
  const player = parseInt(elemento.dataset.player);

  if (turno !== player) {
    alert(`É a vez do Jogador ${turno}`);
    return;
  }

  if (elemento.classList.contains("flipped")) return;

  elemento.classList.add("flipped");

  const ataque = parseInt(elemento.dataset.attack);

  if (player === 1) {
    cartaJogador1 = ataque;
    turno = 2;
    document.getElementById("turnoInfo").textContent = "Vez do Jogador 2";
  } else {
    cartaJogador2 = ataque;
    turno = 0;
    document.getElementById("turnoInfo").textContent = "Duelo em andamento...";
    verificarVencedor();
  }
}

function verificarVencedor() {
  let resultado = "";

  if (cartaJogador1 > cartaJogador2) {
    resultado = "Jogador 1 venceu!";
  } else if (cartaJogador2 > cartaJogador1) {
    resultado = "Jogador 2 venceu!";
  } else {
    resultado = "Empate!";
  }

  document.getElementById("resultado").textContent = resultado;
}
