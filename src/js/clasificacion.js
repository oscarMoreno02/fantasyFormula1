import { Credenciales } from "./clases.js";
import { Usuario } from "./clases.js";
import { crearMenu, cambiarTema } from "./menu.js";

let sectionClasificacion = document.getElementById("section-clasificacion");

crearMenu();
actualizarClasificacion();
crearJugadores();

function crearJugadores() {
    let datos = JSON.parse(localStorage.getItem("usuario"));
    if (datos == null) {
        window.location.href = "index.html";
    }
    let usuario = new Usuario(
        datos.nombre,
        datos.apellidos,
        datos.email,
        datos.nick,
        datos.psw,
        datos.misPilotos,
        datos.rivales
    );
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
        puntos.innerHTML =
            "<b>Puntuación: </b>" +
            (jugadores[i].misPilotos[0].puntuacion +
                jugadores[i].misPilotos[1].puntuacion);
        tarjeta.appendChild(puntos);

        sectionClasificacion.appendChild(tarjeta);
    }
}

function ordenarJugadores(jugador1, jugador2, jugador3) {
    let jugadores = [jugador1, jugador2, jugador3];
    let i = 0;
    while (i < 2) {
        let puntuacion1 =
            jugadores[i].misPilotos[0].puntuacion +
            jugadores[i].misPilotos[1].puntuacion;
        let puntuacion2 =
            jugadores[i + 1].misPilotos[0].puntuacion +
            jugadores[i + 1].misPilotos[1].puntuacion;
        if (puntuacion1 < puntuacion2) {
            let j1 = jugadores[i];
            let j2 = jugadores[i + 1];
            jugadores[i] = j2;
            jugadores[i + 1] = j1;
            i = 0;
        } else {
            i++;
        }
    }

    return jugadores;
}

function actualizarClasificacion() {
    let datos = JSON.parse(localStorage.getItem("usuario"));

    let usuario = new Usuario(
        datos.nombre,
        datos.apellidos,
        datos.email,
        datos.nick,
        datos.psw,
        datos.misPilotos,
        datos.rivales
    );
    let bot1 = usuario.rivales[0];
    let bot2 = usuario.rivales[1];

    let jugadores = [bot1, bot2, usuario];
    let pilotos = JSON.parse(localStorage.getItem("pilotos"));

    for (let piloto of pilotos) {
        for (let jugador of jugadores) {
            for (let i = 0; i < jugador.misPilotos.length; i++) {
                if (jugador.misPilotos[i].id == piloto.id) {
                    jugador.misPilotos[i] = piloto;
                }
            }
        }
    }

    localStorage.setItem("usuario", JSON.stringify(usuario));
}
