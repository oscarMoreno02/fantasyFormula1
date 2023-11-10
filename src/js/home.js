import { crearMenu, cambiarTema } from "./menu.js";
import { grandesPremios } from "./objetos.js";
import { Usuario } from "./clases.js";
import { noDisputado } from "./comunes.js";

let usuario = new Usuario();
let datos = localStorage.getItem("usuario");

console.log(datos);
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
        localStorage.setItem("grandes-premios", JSON.stringify(grandesPremios));
        var primerNoDisputado = grandesPremios.find(noDisputado);
        fotoCarrera.setAttribute(
            "src",
            "https://oscardespliegue.000webhostapp.com/fotosf1/assets/img/fin.jpg"
        );
    }

    if (primerNoDisputado) {
        nombreCarrera.innerText = primerNoDisputado.nombre;
        ubicacionCarrera.innerText = primerNoDisputado.ubicacion;
        descripcionCarrera.innerText = primerNoDisputado.descripcion;
        fotoCarrera.setAttribute("src", primerNoDisputado.srcFoto);
    } else {
        nombreCarrera.innerText = "El juego ha terminado.";
        ubicacionCarrera.innerText =
            "Comprueba tu puntuación en clasificación.";
    }
}
