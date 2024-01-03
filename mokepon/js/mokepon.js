const sectionReiniciar = document.getElementById("reiniciar");
const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const botonReiniciar = document.getElementById("boton-reiniciar");
const botonMascotaJugador = document.getElementById("boton-mascotas");

const sectionSeleccionarMascota = document.getElementById(
  "seleccionar-mascota"
);
const pMascotaJugador = document.getElementById("mascota-jugador");

const pMascotaEnemigo = document.getElementById("mascota-enemigo");

const pVidasJugador = document.getElementById("vidas-jugador");
const pVidasEnemigo = document.getElementById("vidas-enemigo");

const sectionMensajes = document.getElementById("resultado");
const ataqueDelJugador = document.getElementById("ataque-del-jugador");
const ataqueDelEnemigo = document.getElementById("ataque-del-enemigo");
const contenerdorTarjetas = document.getElementById("contenerdor-tarjetas");
const contenedorAtaques = document.getElementById("contenedor-ataques");

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let ataques;
let mokepones = [];
let ataquesJugador = [];
let ataqueEnemigo = [];
let opcionDeMokepones;
let inputHipodogue;
let inputCapipego;
let inputRatigueya;
let inputLangostelvis;
let inputTucapalma;
let inputPydos;
let mascotaJugador;
let ataquesMokepon;
let ataquesMokeponEnemigo;
let botonFuego;
let botonAgua;
let botonTierra;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");

//AGREGAR PROPIEDAD DE TIPO ✓, VALIDARLOS ✓, INCLUIRLOS ✓. SI ES DE UN TIPO TIENE MÁS ATAQUES✓
class Mokepon {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.tipo = [];
    this.mapaFoto = new Image();
    this.mapaFoto.src = foto;
    this.x = 20;
    this.y = 30;
    this.ancho = 80;
    this.alto = 80;
  }
}

let hipodoge = new Mokepon(
  "Hipodogue",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  3,
  "AGUA"
);

let capipego = new Mokepon(
  "Capipego",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  3,
  "TIERRA"
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  3,
  "FUEGO"
);

let langostelvis = new Mokepon(
  "Langostelvis",
  "./assets/langostelvis.png",
  3,
  "AGUA Y FUEGO"
);

let tucapalma = new Mokepon(
  "Tucapalma",
  "./assets/tucapalma-removebg-preview.png",
  3,
  "AGUA Y TIERRA"
);

let pydos = new Mokepon("Pydos", "./assets/pydos.png", 3, "TIERRA Y FUEGO");

hipodoge.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);

capipego.ataques.push(
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
);

ratigueya.ataques.push(
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" }
);

langostelvis.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🌱", id: "boton-tierra" }
);

tucapalma.ataques.push(
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🔥", id: "boton-fuego" }
);

pydos.ataques.push(
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" }
);

hipodoge.tipo.push("AGUA");

capipego.tipo.push("TIERRA");

ratigueya.tipo.push("FUEGO");

langostelvis.tipo.push("AGUA Y FUEGO");

tucapalma.tipo.push("AGUA Y TIERRA");

pydos.tipo.push("TIERRA Y FUEGO");

mokepones.push(hipodoge, capipego, ratigueya, langostelvis, tucapalma, pydos);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";
  sectionReiniciar.style.display = "none";
  sectionVerMapa.style.display = "none";

  mokepones.forEach((mokepon) => {
    opcionDeMokepones = `
    <input type="radio" name="mascota" id=${mokepon.nombre}  />
    <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
        <p>${mokepon.nombre}</p>
        <img src=${mokepon.foto}  alt=${mokepon.nombre}/>
    </label>
    `;
    contenerdorTarjetas.innerHTML += opcionDeMokepones;

    inputHipodogue = document.getElementById("Hipodogue");
    inputCapipego = document.getElementById("Capipego");
    inputRatigueya = document.getElementById("Ratigueya");
    inputLangostelvis = document.getElementById("Langostelvis");
    inputTucapalma = document.getElementById("Tucapalma");
    inputPydos = document.getElementById("Pydos");
  });

  botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador);

  botonReiniciar.addEventListener("click", Reiniciarjuego);
}

function seleccionarMascotaJugador() {
  sectionSeleccionarMascota.style.display = "none";

  // sectionSeleccionarAtaque.style.display = "flex";

  sectionVerMapa.style.display = "flex";

  if (inputHipodogue.checked) {
    pMascotaJugador.innerHTML = inputHipodogue.id;
    mascotaJugador = inputHipodogue.id;
  } else if (inputCapipego.checked) {
    pMascotaJugador.innerHTML = inputCapipego.id;
    mascotaJugador = inputCapipego.id;
  } else if (inputRatigueya.checked) {
    pMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else if (inputLangostelvis.checked) {
    pMascotaJugador.innerHTML = inputLangostelvis.id;
    mascotaJugador = inputLangostelvis.id;
  } else if (inputTucapalma.checked) {
    pMascotaJugador.innerHTML = inputTucapalma.id;
    mascotaJugador = inputTucapalma.id;
  } else if (inputPydos.checked) {
    pMascotaJugador.innerHTML = inputPydos.id;
    mascotaJugador = inputPydos.id;
  } else {
    alert("Selecciona una mascota");
    Reiniciarjuego();
  }
  extraerAtaques(mascotaJugador);
  seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMokepon = ` <button class="boton-ataque" id=${ataque.id}> ${ataque.nombre} </button>
    `;
    contenedorAtaques.innerHTML += ataquesMokepon;
  });
  botonFuego = document.getElementById("boton-fuego");
  botonAgua = document.getElementById("boton-agua");
  botonTierra = document.getElementById("boton-tierra");
  botones = document.querySelectorAll(".boton-ataque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const content = e.target.textContent.trim();
      if (content === "🔥") {
        ataquesJugador.push("FUEGO");
        console.log(ataquesJugador);
      } else if (content === "💧") {
        ataquesJugador.push("AGUA");
        console.log(ataquesJugador);
      } else {
        ataquesJugador.push("TIERRA");
        console.log(ataquesJugador);
      }
      boton.style.backgroundColor = "rgba(255, 255, 255)";
      boton.disabled = true;
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarMascotaEnemigo() {
  let mascotaAleatorio = aleatorio(0, mokepones.length - 1);

  pMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre;
  ataquesMokeponEnemigo = mokepones[mascotaAleatorio].ataques;
  secuenciaAtaque();
}

//MEJORAR. PONERLE SOLO LOS ATAQUES DEL PERSONAJE. EXTRAER ATAQUES DEL ENEMIGO PARA USARLO
function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length - 1);
  let ataque = ataquesMokeponEnemigo[ataqueAleatorio].nombre;
  // ataquesMokeponEnemigo.splice(ataqueAleatorio, 1);

  if (ataque == "🔥") {
    ataqueEnemigo.push("FUEGO");
  } else if (ataque == "💧") {
    ataqueEnemigo.push("AGUA");
  } else if (ataque == "🌱") {
    ataqueEnemigo.push("TIERRA");
  }
  console.log(ataqueEnemigo);
  iniciarCombate();
}

//Aquí hay un error
function iniciarCombate() {
  if (ataquesJugador.length >= 1) {
    combate();
  }
}

//NO ENTIENDO
function indexDosOponentes(index) {
  indexAtaqueJugador = ataquesJugador[index];
  indexAtaqueEnemigo = ataqueEnemigo[index];
}
// COMBATE
function combate() {
  const lastJugador = ataquesJugador.at(-1);
  const lastIndex = ataquesJugador.length - 1;
  const lastEnemigo = ataqueEnemigo.at(-1);
  debugger;
  if (lastJugador === lastEnemigo) {
    indexDosOponentes(lastIndex);
    crearMensaje("EMPATE");
    victoriasJugador++;
    victoriasEnemigo++;
    pVidasJugador.innerHTML = victoriasJugador;
    pVidasEnemigo.innerHTML = victoriasEnemigo;
  } else if (
    (lastJugador == "FUEGO" && lastEnemigo == "TIERRA") ||
    (lastJugador == "AGUA" && lastEnemigo == "FUEGO") ||
    (lastJugador == "TIERRA" && lastEnemigo == "AGUA")
  ) {
    indexDosOponentes(lastIndex);
    crearMensaje("Tu GANAS 🎉");
    victoriasJugador++;
    //vidasEnemigo--;
    pVidasJugador.innerHTML = victoriasJugador;
  } else {
    indexDosOponentes(lastIndex);
    crearMensaje("Tu Pierdes 😢");
    victoriasEnemigo++;
    // vidasJugador--;
    pVidasEnemigo.innerHTML = victoriasEnemigo;
  }

  revisarVictorias();
  //aquí hay otro error
  function crearMensaje(resultado) {
    let nuevoAtaqueDelJugador = document.createElement("p");
    let nuevoAtaqueDelEnemigo = document.createElement("p");

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
  }

  function revisarVictorias() {
    if (
      ataquesJugador.length === ataques.length ||
      ataqueEnemigo.length === ataquesMokeponEnemigo.length
    ) {
      if (victoriasJugador === victoriasEnemigo) {
        crearMensajeFinal("EMPATASTE🤝");
      } else if (victoriasJugador > victoriasEnemigo) {
        crearMensajeFinal("¡FELICITACIONES!  Ganaste 🎊🎉🎆");
      } else if (victoriasJugador < victoriasEnemigo) {
        crearMensajeFinal("Lo siento, perdiste ☹");
      }
    }
  }
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;
  sectionReiniciar.style.display = "block";
}
//fuego gana tierra. agua gana fuego. tierra gana agua.

function Reiniciarjuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarPersonaje() {
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(
    capipego.mapaFoto,
    capipego.x,
    capipego.y,
    capipego.ancho,
    capipego.alto
  );
}

function moverCapipegoderecha() {
  capipego.x = capipego.x + 5;
  pintarPersonaje();
}

function moverCapipegoabajo(){
capipego.y = capipego.y + 5;
  pintarPersonaje();
}

window.addEventListener("load", iniciarJuego);
