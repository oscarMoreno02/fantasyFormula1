import { Credenciales } from "./clases.js";
import { Usuario } from "./clases.js";
import { crearMenu } from "./menu.js";
import { mostrarPilotos } from "./comunes.js";

let sectionPilotos = document.getElementById("section-pilotos");

crearPilotos();
crearMenu();
function crearPilotos() {
    if (localStorage.getItem("jugadores")) {
        let jugadores = JSON.parse(localStorage.getItem("jugadores"));

        for (let i = 0; i < jugadores.length; i++) {
            let pilotos = jugadores[i].pilotos;
            let div = document.createElement("div");
            let posicion = document.createElement("h2");
            posicion.innerText = i + "º";

            div.appendChild(posicion);
            mostrarPilotos(div, pilotos);
            sectionPilotos.appendChild(div);
        }
    }
}
