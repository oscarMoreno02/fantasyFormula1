import { pilotos } from "./objetos.js";
import { crearMenu } from "./menu.js";
import { mostrarPilotos } from "./comunes.js";

crearMenu();

let sectionPilotos = document.getElementById("section-pilotos");

crearPilotos();

function crearPilotos() {
    let competidores = pilotos;

    if (localStorage.getItem("pilotos")) {
        competidores = JSON.parse(localStorage.getItem("pilotos"));
    }

    mostrarPilotos(sectionPilotos, competidores);
}
