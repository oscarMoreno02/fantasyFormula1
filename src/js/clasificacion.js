import { Credenciales } from "./clases.js";
import { Usuario } from "./clases.js";
import { crearMenu, cambiarTema } from "./menu.js";

let sectionPilotos = document.getElementById("section-pilotos");

crearMenu();
actualizarClasificacion();
crearJugadores();

function crearJugadores() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let bot1 = usuario.rivales[0];
    let bot2 = usuario.rivales[1];

    let jugadores = ordenarJugadores(usuario, bot1, bot2);

    for (let i = 0; i < jugadores.length; i++) {
        let tarjeta = document.createElement("div");
        tarjeta.setAttribute("class", "tarjeta");

        let posicion = document.createElement("h2");
        let puesto = i + 1;
        posicion.innerText = puesto + "º";
        tarjeta.appendChild(posicion);

        let nick = document.createElement("h3");
        nick.innerText = jugadores[i].nick;
        tarjeta.appendChild(nick);

        let puntos = document.createElement("p");
        puntos.innerHTML = "<b>Puntuación: </b>" + jugadores[i].puntuacion;
        tarjeta.appendChild(puntos);

        sectionPilotos.appendChild(tarjeta);
    }
}

function ordenarJugadores(jugador1, jugador2, jugador3) {
    let jugadores = [jugador1, jugador2, jugador3];

    jugadores.sort((a, b) => b.puntuacion - a.puntuacion);

    return jugadores;
}

function actualizarClasificacion() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let bot1 = usuario.rivales[0];
    let bot2 = usuario.rivales[1];

    let jugadores = [bot1, bot2, usuario];
    let pilotos = JSON.parse(localStorage.getItem("pilotos"));

    console.log(usuario);
    console.log(pilotos);

    for (let piloto of pilotos) {
        for (let jugador of jugadores) {
            for (let i = 0; i < jugador.pilotos.length; i++) {
                if (jugador.pilotos[i].id === piloto.id) {
                    jugador.pilotos[i] = piloto;
                }
            }
        }
    }

    localStorage.setItem("usuario", JSON.stringify(usuario));
}
