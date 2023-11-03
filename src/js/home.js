import { crearMenu } from "./menu.js";
import { grandesPremios } from "./objetos.js";
import { Usuario } from "./clases.js";

crearMenu();
crearJugadores();

var nombreCarrera = document.getElementById("nombre-carrera");
var ubicacionCarrera = document.getElementById("ubicacion-carrera");
var descripcionCarrera = document.getElementById("descripcion-carrera");
var fotoCarrera = document.getElementById("foto-carrera");

cargarNoticias();

function cargarNoticias() {
    if (localStorage.getItem("grandes-premios")) {
        let grandesPremiosActualizados = JSON.parse(
            localStorage.getItem("grandes-premios")
        );

        var primerNoDisputado = grandesPremiosActualizados.find(noDisputado);
    } else {
        var primerNoDisputado = grandesPremios.find(noDisputado);
    }

    nombreCarrera.innerText = primerNoDisputado.nombre;
    ubicacionCarrera.innerText = primerNoDisputado.ubicacion;
    descripcionCarrera.innerText = primerNoDisputado.descripcion;
    fotoCarrera.setAttribute("src", primerNoDisputado.srcFoto);
}

function noDisputado(granPremio) {
    return granPremio.disputado === false;
}

function crearBot($numero) {
    return new Usuario("", "", "", "bot" + $numero, "");
}

function crearJugadores() {
    if (!localStorage.getItem("jugadores")) {
        let $jugador1 = localStorage.getItem("usuario");
        let $bot1 = crearBot(1);
        let $bot2 = crearBot(2);

        localStorage.setItem(
            "jugadores",
            JSON.stringify([$jugador1, $bot1, $bot2])
        );
    }
}
