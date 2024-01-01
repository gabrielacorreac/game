// Corrección: Se eliminó el espacio adicional antes de la función aleatorio
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function eleccion(jugada) {
  let resultado = "";
  // INFORMANDO LA ELECCIÓN DEL JUGADOR
  if (jugada == 1) {
    resultado = "Piedra 🥌";
  } else if (jugada == 2) {
    resultado = "Papel 📄";
  } else if (jugada == 3) {
    resultado = "Tijera ✂️";
  } else {
    resultado = "Elegiste otra cosa, así no puedes jugar 😣";
  }
  return resultado;
}

// OBTENIENDO LA ELECCIÓN DEL COMPUTADOR

// DEFINIENDO TRIUNFOS Y PERDIDAS
let triunfos = 0;
let perdidas = 0;

while (triunfos < 3 && perdidas < 3) {
  let pc = aleatorio(1, 3);

  // OBTENIENDO LA ELECCIÓN DEL JUGADOR
  // 1 es piedra, 2 es papel, 3 es tijera
  let jugador = prompt("Elige: 1 para piedra, 2 para papel, 3 para tijera");
  // alert("Elegiste " + jugador);

  alert("Tu eliges: " + eleccion(jugador));
  alert("PC elige: " + eleccion(pc));

  // DECIDIENDO EL GANADOR
  if (jugador == pc) {
    alert("¡EMPATE! 🤼");
  } else if (jugador - pc == 1 || jugador - pc == -2) {
    alert("Tu GANAS 🎉");
    triunfos = triunfos + 1;
  } else {
    alert("Tu Pierdes 😢");
    perdidas = perdidas + 1;
  }
}
alert("Ganaste:" + triunfos + " veces. Perdiste:" + perdidas + "veces.");
