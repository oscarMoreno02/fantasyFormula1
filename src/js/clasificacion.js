import { Credenciales } from "./clases.js";
import { Usuario } from "./clases.js";
import { crearMenu } from "./menu.js";
import { mostrarPilotos } from "./comunes.js";

let sectionPilotos = document.getElementById("section-pilotos");

crearJugadores();
crearMenu();
function crearJugadores() {
    if (localStorage.getItem("jugadores")) {
        let jugadores = JSON.parse(localStorage.getItem("jugadores"));

        // TODO: HAY QUE ORDENAR LOS JUGADORES ANTES DE MOSTRARLOS

        for (let i = 0; i < jugadores.length; i++) {
            let pilotos = jugadores[i].pilotos;
            let div = document.createElement("div");
            let posicion = document.createElement("h2");
            posicion.innerText = i + "º";

            // TODO: CAMBIAR MOSTRAR PILOTOS POR MOSTRAR JUGADOR

            div.appendChild(posicion);
            mostrarPilotos(div, pilotos);
            sectionPilotos.appendChild(div);
        }
    }
}
