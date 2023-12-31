import { puntuaciones } from "./objetos.js";
import { Usuario } from "./clases.js";
import { crearMenu, cambiarTema } from "./menu.js";
import { crearPilotos, noDisputado } from "./comunes.js";

let usuario = new Usuario();

let datos = localStorage.getItem("usuario");
let grandesPremios = JSON.parse(localStorage.getItem("grandes-premios"));


if (datos != null) {
    let u = JSON.parse(datos);

    usuario = new Usuario(
        u.nombre,
        u.apellidos,
        u.email,
        u.nick,
        u.password,
        u.misPilotos,
        u.rivales
    );
} else {
    window.location.href = "index.html";
}
crearMenu();

const botonLanzarCarrera = document.getElementById("lanzar-carrera");

if (grandesPremios.find(noDisputado) == undefined) {
    botonLanzarCarrera.setAttribute("disabled", "true");
}

botonLanzarCarrera.addEventListener("click", function () {
    let carreras = disputarGranPremio(grandesPremios);
    actualizarPuntuaciones();
    localStorage.setItem("grandes-premios", JSON.stringify(carreras));
    window.location.href = "./home.html";
});
document.addEventListener('keydown', function(keyboardEvent) {
    if (keyboardEvent.key === 'Enter') {
        botonLanzarCarrera.click()
    }
});
function disputarGranPremio() {
    let carreras = grandesPremios;
    let pilotos = crearPilotos();

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
    let pilotos = crearPilotos();
    let carreras = grandesPremios;

    if (localStorage.getItem("grandes-premios")) {
        carreras = JSON.parse(localStorage.getItem("grandes-premios"));
    }

    for (let carrera of carreras) {
        for (let posicion of carrera.posiciones) {
            for (let piloto of pilotos) {
                if (piloto.id == posicion.idPiloto) {
                    if (puntuaciones[posicion.posicion - 1]) {
                        piloto.puntuacion +=
                            puntuaciones[posicion.posicion - 1];
                    }
                }
            }
        }
    }

    localStorage.setItem("pilotos", JSON.stringify(pilotos));
}
