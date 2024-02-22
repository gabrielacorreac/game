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

let jugadorId = null;
let enemigoId = null;
let ataques;
let mokepones = [];
let mokeponesEnemigos = [];
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
let mascotaJugadorObjeto;
// let enemigo = [];
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
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mokemap.png";
let alturaNecesaria;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoMapa = 350;

if (anchoDelMapa > anchoMaximoMapa) {
  anchoDelMapa = anchoMaximoMapa - 20;
}

alturaNecesaria = (anchoDelMapa * 600) / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaNecesaria;

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10, id=null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.tipo = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }
  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  "Hipodogue",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  3,
  "./assets/hipodogecabeza.png"
);

let capipego = new Mokepon(
  "Capipego",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  3,
  "./assets/capipegocabeza.png"
);

let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  3,
  "./assets/ratigueyacabeza.png"
);

let langostelvis = new Mokepon(
  "Langostelvis",
  "./assets/langostelvis.png",
  3,
  "./assets/langosteviscabeza.png"
);

let tucapalma = new Mokepon(
  "Tucapalma",
  "./assets/tucapalma-removebg-preview.png",
  3,
  "./assets/tucapalmacabeza.png"
);

let pydos = new Mokepon(
  "Pydos",
  "./assets/pydos.png",
  3,
  "./assets/pydoscabeza.png"
);

const hipodoge_ataques = [ 
{ nombre: "💧", id: "boton-agua" },
{ nombre: "💧", id: "boton-agua" },
{ nombre: "🔥", id: "boton-fuego" },
{ nombre: "🌱", id: "boton-tierra" }
]

hipodoge.ataques.push(...hipodoge_ataques);
// hipodogeEnemigo.ataques.push(...hipodoge_ataques);

const capipego_ataques = [
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🔥", id: "boton-fuego" }
]

capipego.ataques.push(...capipego_ataques);
// capipegoEnemigo.ataques.push(...capipego_ataques);

const ratigueya_ataques = [
  { nombre: "🔥", id: "boton-fuego" },
{ nombre: "🔥", id: "boton-fuego" },
{ nombre: "🔥", id: "boton-fuego" },
{ nombre: "💧", id: "boton-agua" },
{ nombre: "🌱", id: "boton-tierra" }];

ratigueya.ataques.push(...ratigueya_ataques);
// ratigueyaEnemigo.ataques.push(...ratigueya_ataques);

const langostelvis_ataques = [
  { nombre: "💧", id: "boton-agua" },
{ nombre: "💧", id: "boton-agua" },
{ nombre: "🔥", id: "boton-fuego" },
{ nombre: "🔥", id: "boton-fuego" },
{ nombre: "🔥", id: "boton-fuego" },
{ nombre: "🌱", id: "boton-tierra" }
]

langostelvis.ataques.push(...langostelvis_ataques);
// langostelvisEnemigo.ataques.push(...langostelvis_ataques);

const tucapalma_ataques = [
  { nombre: "💧", id: "boton-agua" },
  { nombre: "💧", id: "boton-agua" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🔥", id: "boton-fuego" }
]

tucapalma.ataques.push(...tucapalma_ataques);
// tucapalmaEnemigo.ataques.push(...tucapalma_ataques);

const pydos_ataques = [
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🌱", id: "boton-tierra" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "🔥", id: "boton-fuego" },
  { nombre: "💧", id: "boton-agua" }
]


pydos.ataques.push(...pydos_ataques);
// pydosEnemigo.ataques.push(...pydos_ataques);

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

  botonReiniciar.addEventListener("click", reiniciarJuego);

  unirseAlJuego();
}

function unirseAlJuego() {
  fetch("http://localhost:8002/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (response) {
        console.log(response);
        jugadorId = response;
      });
    }
  });
}

function seleccionarMascotaJugador() {

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
    return;
  }
  sectionSeleccionarMascota.style.display = "none";

  seleccionarMokepon(mascotaJugador);

  extraerAtaques(mascotaJugador);

  sectionVerMapa.style.display = "flex";
  iniciarMapa();
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://localhost:8002/mokepon/${jugadorId}`, {
    method: "post",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify({
      mokepon: mascotaJugador,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la solicitud fetch");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
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
      if (ataquesJugador.length === 5) {
      enviarAtaques();
      }
    });
  });
}

function enviarAtaques() {
  fetch(`http://localhost:8002/mokepon/${jugadorId}/ataques`,{
    method: "post",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({
      ataques: ataquesJugador
    })
  })
  intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques(){
  fetch(`http://localhost:8002/mokepon/${enemigoId}/ataques`)
  .then(function (res) {
    if (res.ok) {
      res.json()
        .then(function ({atques}) {
        if(ataques.length === 5){
          ataqueEnemigo = ataques
          combate();
        }  
        })
    }
  })
}

function seleccionarMascotaEnemigo(enemigo) {
  pMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

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

function iniciarCombate() {
  if (ataquesJugador.length >= 1) {
    combate();
  }
}

function indexDosOponentes(index) {
  indexAtaqueJugador = ataquesJugador[index];
  indexAtaqueEnemigo = ataqueEnemigo[index];
}

function combate() {
  clearInterval(intervalo);

  const lastJugador = ataquesJugador.at(-1);
  const lastIndex = ataquesJugador.length - 1;
  const lastEnemigo = ataqueEnemigo.at(-1);
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

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  console.log(mascotaJugadorObjeto);

  mascotaJugadorObjeto.x =
    mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
  mascotaJugadorObjeto.y =
    mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);
  mascotaJugadorObjeto.pintarMokepon();

  enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y);

  mokeponesEnemigos.forEach(function (mokepon){
    mokepon.pintarMokepon();
    revisarColision(mokepon)
  });

  hipodogeEnemigo.pintarMokepon();
  capipegoEnemigo.pintarMokepon();
  ratigueyaEnemigo.pintarMokepon();
  langostelvisEnemigo.pintarMokepon();
  tucapalmaEnemigo.pintarMokepon();
  pydosEnemigo.pintarMokepon();
  if (
    mascotaJugadorObjeto.velocidadX !== 0 ||
    mascotaJugadorObjeto.velocidadY !== 0
  ) {
    revisarColision(hipodogeEnemigo);
    revisarColision(capipegoEnemigo);
    revisarColision(ratigueyaEnemigo);
    revisarColision(langostelvisEnemigo);
    revisarColision(tucapalmaEnemigo);
    revisarColision(pydosEnemigo);
  }
}

function enviarPosicion(x, y) {
  fetch(`http://192.168.20.14:8002/mokepon/${jugadorId}/posicion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      x,
      y,
    }),
  })
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
      throw new Error("Error en la solicitud fetch");
  })
  .then(function ({enemigos}){
          console.log("Enemigo recibidos", enemigos);
         mokeponesEnemigos = enemigos.map(function (enemigo) {
            let mokeponEnemigo = null;
            const mokeponNombre = enemigo.mokepon.nombre || ""; 
            if (mokeponNombre === "Hipodoge"){
              mokeponEnemigo = new Mokepon("Hipodogue","./assets/mokepons_mokepon_hipodoge_attack.png",  3, "./assets/hipodogecabeza.png", enemigo.id);
            } else if (mokeponNombre === "Capipego"){
              mokeponEnemigo = new Mokepon("Capipego", "./assets/mokepons_mokepon_capipepo_attack.png", 3, "./assets/capipegocabeza.png", enemigo.id);
            } else if (mokeponNombre === "Ratigueya"){
              mokeponEnemigo = new Mokepon("Ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png",3, "./assets/ratigueyacabeza.png", enemigo.id);
            } else if (mokeponNombre === "Langostelvis"){
              mokeponEnemigo = new Mokepon("Langostelvis","./assets/langostelvis.png",3, "./assets/langosteviscabeza.png", enemigo.id);
            } else if (mokeponNombre ==="Tucapalma"){
              mokeponEnemigo = new Mokepon("Tucapalma", "./assets/tucapalma-removebg-preview.png", 3,"./assets/tucapalmacabeza.png", enemigo.id);
            } else if (mokeponNombre ==="Pydos"){
              mokeponEnemigo = new Mokepon("Pydos",  "./assets/pydos.png", 3, "./assets/pydoscabeza.png", enemigo.id);
            }
            mokeponEnemigo.x = enemigo.x;
            mokeponEnemigo.y = enemigo.y;

            return mokeponEnemigo;
          })
          .catch((error) => {
            console.error("Error", error);
          })
        })
    }

function moverDerecha() {
  mascotaJugadorObjeto.velocidadX = 5;
}

function moverIzquierda() {
  mascotaJugadorObjeto.velocidadX = -5;
}

function moverAbajo() {
  mascotaJugadorObjeto.velocidadY = 5;
}

function moverArriba() {
  mascotaJugadorObjeto.velocidadY = -5;
}

function detenerMovimiento() {
  mascotaJugadorObjeto.velocidadX = 0;
  mascotaJugadorObjeto.velocidadY = 0;
}

function sePresionoOtraTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  mascotaJugadorObjeto = obtenerObjetoMasota(mascotaJugador);
  intervalo = setInterval(pintarCanvas, 200);

  window.addEventListener("keydown", sePresionoOtraTecla);

  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMasota() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador === mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMascota = mascotaJugadorObjeto.y;
  const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto;
  const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho;
  const izquierdaMascota = mascotaJugadorObjeto.x;

  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }

  detenerMovimiento();
  clearInterval(intervalo);
  console.log("se detecto una colision");

  enemigoId = enemigo.id;
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionarMascotaEnemigo(enemigo);
}

window.addEventListener("load", iniciarJuego);
