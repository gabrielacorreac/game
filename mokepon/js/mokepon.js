let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
  let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "none";

  let sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "none";

  let botonMascotaJugador = document.getElementById("boton-mascotas");
  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  let botonFuego = document.getElementById("boton-fuego");
  botonFuego.addEventListener("click", ataqueFuego);
  let botonAgua = document.getElementById("boton-agua");
  botonAgua.addEventListener("click", ataqueAgua);
  let botonTierra = document.getElementById("boton-tierra");
  botonTierra.addEventListener("click", ataqueTierra);

  let botonReiniciar = document.getElementById("boton-reiniciar");
  botonReiniciar.addEventListener("click", Reiniciarjuego);
}
function seleccionarMascotaJugador() {
  let sectionSeleccionarMascota = document.getElementById(
    "seleccionar-mascota"
  );
  sectionSeleccionarMascota.style.display = "none";

  let sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
  sectionSeleccionarAtaque.style.display = "flex";

  let inputHipodogue = document.getElementById("hipodoge");
  let inputCapipego = document.getElementById("capipego");
  let inputRatigueya = document.getElementById("ratigueya");
  let inputLangostelvis = document.getElementById("langostelvis");
  let inputTucapalma = document.getElementById("tucapalma");
  let inputPydos = document.getElementById("pydos");
  let spanMascotaJugador = document.getElementById("mascota-jugador");

  if (inputHipodogue.checked) {
    spanMascotaJugador.innerHTML = "Hipodogue";
  } else if (inputCapipego.checked) {
    spanMascotaJugador.innerHTML = "Capipego";
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = "Ratigueya";
  } else if (inputLangostelvis.checked) {
    spanMascotaJugador.innerHTML = "Langostelvis";
  } else if (inputTucapalma.checked) {
    spanMascotaJugador.innerHTML = "Tucapalma";
  } else if (inputPydos.checked) {
    spanMascotaJugador.innerHTML = "Pydos";
  } else {
    alert("Selecciona una mascota");
    Reiniciarjuego();
  }
  seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatorio = aleatorio(1, 6);
  let spanMascotaEnemigo = document.getElementById("mascota-enemigo");

  if (mascotaAleatorio == 1) {
    spanMascotaEnemigo.innerHTML = "Hipodogue";
  } else if (mascotaAleatorio == 2) {
    spanMascotaEnemigo.innerHTML = "Capipego";
  } else if (mascotaAleatorio == 3) {
    spanMascotaEnemigo.innerHTML = "Ratigueya";
  } else if (mascotaAleatorio == 4) {
    spanMascotaEnemigo.innerHTML = "Langostelvis";
  } else if (mascotaAleatorio == 5) {
    spanMascotaEnemigo.innerHTML = "Tucapalma";
  } else if (mascotaAleatorio == 6) {
    spanMascotaEnemigo.innerHTML = "Pydos";
  }
}

function ataqueFuego() {
  ataqueJugador = "FUEGO";
  ataqueAleatorioEnemigo();
}

function ataqueAgua() {
  ataqueJugador = "AGUA";
  ataqueAleatorioEnemigo();
}

function ataqueTierra() {
  ataqueJugador = "TIERRA";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "FUEGO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "AGUA";
  } else {
    ataqueEnemigo = "TIERRA";
  }
  combate();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
// COMBATE
function combate() {
  let spanVidasJugador = document.getElementById("vidas-jugador");
  let spanVidasEnemigo = document.getElementById("vidas-enemigo");

  if (ataqueJugador == ataqueEnemigo) {
    crearMensaje("¡EMPATE! 🤼");
  } else if (
    (ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") ||
    (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") ||
    (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA")
  ) {
    crearMensaje("Tu GANAS 🎉");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje("Tu Pierdes 😢");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }
  // Revisar vidas
  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("¡FELICITACIONES!  Ganaste 🎊🎉🎆");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("Lo siento, perdiste ☹");
  }
}

function crearMensaje(resultado) {
  let sectionMensajes = document.getElementById("resultado");
  let ataqueDelJugador = document.getElementById("ataque-del-jugador");
  let ataqueDelEnemigo = document.getElementById("ataque-del-enemigo");

  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  let sectionMensajes = document.getElementById("resultado");

  sectionMensajes.innerHTML = resultadoFinal;

  let botonFuego = document.getElementById("boton-fuego");
  botonFuego.disabled = true;
  let botonAgua = document.getElementById("boton-agua");
  botonAgua.disabled = true;
  let botonTierra = document.getElementById("boton-tierra");
  botonTierra.disabled = true;

  let sectionReiniciar = document.getElementById("reiniciar");
  sectionReiniciar.style.display = "block";
}

//fuego(1), agua(2), tierra(3). fuego gana tierra. agua gana fuego. tierra gana agua.

function Reiniciarjuego() {
  location.reload();
}

window.addEventListener("load", iniciarJuego);
