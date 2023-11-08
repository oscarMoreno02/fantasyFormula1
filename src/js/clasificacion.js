import { Credenciales } from "./clases.js";
import { Usuario } from "./clases.js";
import { crearMenu } from "./menu.js";
import { mostrarPilotos } from "./comunes.js";

let sectionPilotos = document.getElementById("section-pilotos");

crearJugadores();
crearMenu();

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
