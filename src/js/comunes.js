import { Usuario } from "./clases.js";
import { pilotos } from "./objetos.js";

export function mostrarPilotos(div, competidores) {
    for (let piloto of competidores) {
        let tarjeta = document.createElement("div");
        tarjeta.setAttribute("class", "tarjeta");

        let nombre = document.createElement("h4");
        nombre.innerHTML = piloto.nombre + "<br>" + piloto.apellido;
        tarjeta.appendChild(nombre);

        let img = document.createElement("img");
        img.setAttribute("src", piloto.srcFoto);
        tarjeta.appendChild(img);

        let escuderia = document.createElement("h5");
        escuderia.textContent = piloto.escuderia;
        tarjeta.appendChild(escuderia);

        let puntos = document.createElement("p");
        puntos.innerHTML = "<b>Puntuación: </b>" + piloto.puntuacion;
        tarjeta.appendChild(puntos);

        let rol = document.createElement("p");
        rol.innerHTML = "<b>Rol: </b>" + piloto.rol;
        tarjeta.appendChild(rol);

        let propiedad = document.createElement("p");
        propiedad.innerHTML = "<b>Dueño: </b>" + piloto.propiedadJugador;
        tarjeta.appendChild(propiedad);

        div.appendChild(tarjeta);
    }
}

export function crearBot($numero) {
    let bot = new Usuario("", "", "", "Bot" + $numero, [], []);
    bot.asignarPilotos();
    return bot;
}

export function crearPilotos() {
    let competidores = pilotos;

    if (localStorage.getItem("pilotos")) {
        competidores = JSON.parse(localStorage.getItem("pilotos"));
    }

    return competidores;
}
