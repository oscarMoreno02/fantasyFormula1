import { pilotos, puntuaciones, grandesPremios } from "./objetos.js";
import { crearMenu } from "./menu.js";

crearMenu();

const botonLanzarCarrera = document.getElementById("lanzar-carrera");

botonLanzarCarrera.addEventListener("click", function () {
    let carreras = disputarGranPremio(grandesPremios);
    actualizarPuntuaciones();
    localStorage.setItem("grandes-premios", JSON.stringify(carreras));
    window.location.href = "./home.html";
});

function disputarGranPremio() {
    let carreras = grandesPremios;

    if (localStorage.getItem("grandes-premios")) {
        carreras = JSON.parse(localStorage.getItem("grandes-premios"));
    }

    for (var i = 0; i < carreras.length; i++) {
        var granPremio = carreras[i];
        if (!granPremio.disputado) {
            granPremio.posiciones = generarPosiciones(pilotos);
            granPremio.disputado = true;
            break;
        }
    }

    return carreras;
}

function generarPosiciones(pilotos) {
    var posiciones = [];
    var posicionesAsignadas = new Set();

    for (var i = 0; i < pilotos.length; i++) {
        var piloto = pilotos[i];
        var posicionAleatoria;

        do {
            posicionAleatoria = Math.floor(Math.random() * pilotos.length) + 1;
        } while (posicionesAsignadas.has(posicionAleatoria));

        posicionesAsignadas.add(posicionAleatoria);
        posiciones.push({ idPiloto: piloto.id, posicion: posicionAleatoria });
    }

    return posiciones;
}

function actualizarPuntuaciones() {
    let competidores = pilotos;
    let carreras = grandesPremios;

    if (localStorage.getItem("pilotos")) {
        competidores = JSON.parse(localStorage.getItem("pilotos"));
    }
    if (localStorage.getItem("grandes-premios")) {
        carreras = JSON.parse(localStorage.getItem("grandes-premios"));
    }

    for (let carrera of carreras) {
        for (let posicion of carrera.posiciones) {
            for (let piloto of competidores) {
                if (piloto.id == posicion.idPiloto) {
                    if (puntuaciones[posicion.posicion - 1]) {
                        piloto.puntuacion +=
                            puntuaciones[posicion.posicion - 1];
                    }
                }
            }
        }
    }

    localStorage.setItem("pilotos", JSON.stringify(competidores));
}