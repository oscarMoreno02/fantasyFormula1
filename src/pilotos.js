import { pilotos } from "./objetos.js";
import { crearMenu } from "./menu.js";

crearMenu();

let sectionPilotos = document.getElementById("section-pilotos");

crearPilotos();

function crearPilotos() {
    for (let piloto of pilotos) {
        let div = document.createElement("div");
        div.setAttribute("class", "tarjeta");

        let nombre = document.createElement("h4");
        nombre.textContent = piloto.nombre + " " + piloto.apellido;
        div.appendChild(nombre);

        let img = document.createElement("img");
        img.setAttribute("src", piloto.srcFoto);
        div.appendChild(img);

        let escuderia = document.createElement("h5");
        escuderia.textContent = piloto.escuderia;
        div.appendChild(escuderia);

        let puntos = document.createElement("p");
        puntos.textContent = piloto.puntuacion;
        div.appendChild(puntos);

        let propiedad = document.createElement("p");
        propiedad.textContent = piloto.rol;
        div.appendChild(propiedad);

        sectionPilotos.appendChild(div);
    }
}
