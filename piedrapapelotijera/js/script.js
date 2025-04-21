const formulario = document.getElementById("formulario");
const nombreJugador = document.getElementById("nombre-user");
const nombreJugadorInput = document.getElementById("nombre");
const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaJuego = document.getElementById("pantalla-juego");
const containerPuntos = document.querySelector(".container-puntos");
const puntosUser = document.getElementById("puntos-user");
const puntosCompu = document.getElementById("puntos-compu");
const imagenUsuario = document.getElementById("mano-user");
const imagenComputador = document.getElementById("mano-compu");
const resultadoTexto = document.getElementById("lectura");
const botonesJugada = document.querySelectorAll(".manos img");
const botonReiniciar = document.querySelector(".reiniciar");

let triunfos = 0;
let perdidas = 0;
const limitePartidas = 3;

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nombre = nombreJugadorInput.value.trim();
    if (nombre === "") {
        alert("Por favor, ingresa tu nombre.");
        return;
    }
    nombreJugador.textContent = nombre; 
    pantallaInicio.style.display = "none";
    pantallaJuego.style.display = "block";
    containerPuntos.style.display = "flex";
    puntosUser.textContent =`${nombre}: 0`;
    puntosCompu.textContent = "Computador: 0";
    resultadoTexto.textContent = "Selecciona tu jugada";
    
    imagenUsuario.src = "./assets/po.png";
    imagenComputador.src = "./assets/po.png";
});


function eleccionComputador() {
    return Math.floor(Math.random() * 3) + 1;
}

function jugar(jugadaUsuario) {
    if (triunfos === limitePartidas || perdidas === limitePartidas) {
        return;
    }

    const jugadaCompu = eleccionComputador();

    imagenUsuario.src = `./assets/${obtenerNombreImagen(jugadaUsuario)}`;
    imagenComputador.src = `./assets/${obtenerNombreImagen(jugadaCompu)}`;

    if (jugadaUsuario === jugadaCompu) {
        resultadoTexto.textContent = "¡Empate!";
    } else if (
        (jugadaUsuario === 1 && jugadaCompu === 3) || 
        (jugadaUsuario === 2 && jugadaCompu === 1) || 
        (jugadaUsuario === 3 && jugadaCompu === 2)
    ) {
        resultadoTexto.textContent = "¡Ganaste!";
        triunfos++;
    } else {
        resultadoTexto.textContent = "¡Perdiste!";
        perdidas++;
    }

  
    puntosUser.textContent = `${nombreJugador.textContent}: ${triunfos}`;
    puntosCompu.textContent = `Computador: ${perdidas}`;

    if (triunfos === limitePartidas) {
        resultadoTexto.textContent = "¡Felicidades, ganaste el juego! 🎉";
    } else if (perdidas === limitePartidas) {
        resultadoTexto.textContent = "¡Perdiste el juego! 😢";
    }
}

function obtenerNombreImagen(jugada) {
    if (jugada === 1) return "icon-piedra.png";
    if (jugada === 2) return "icon-papel.png";
    if (jugada === 3) return "icon-tijera.png";
}

botonesJugada.forEach((boton, index) => {
    boton.addEventListener("click", () => {
        jugar(index + 1);
    });
});

botonReiniciar.addEventListener("click", () => {
    pantallaInicio.style.display = "block";
    pantallaJuego.style.display = "none";
    containerPuntos.style.display = "none";

    nombreJugadorInput.value = "";
    nombreJugador.textContent = "Tú";

    triunfos = 0;
    perdidas = 0;
});
