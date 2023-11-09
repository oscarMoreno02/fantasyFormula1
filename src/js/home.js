import { crearMenu, cambiarTema } from "./menu.js";
import { grandesPremios } from "./objetos.js";
import { Usuario } from "./clases.js";

let usuario = new Usuario();
let datos = localStorage.getItem("usuario");

console.log(datos);
if (datos != null) {
    let u = JSON.parse(datos);
    console.log(u);
    usuario = new Usuario(
        u.nombre,
        u.apellidos,
        u.email,
        u.nick,
        u.password,
        u.pil,
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
        var primerNoDisputado = grandesPremios.find(noDisputado);
    }

    nombreCarrera.innerText = primerNoDisputado.nombre;
    ubicacionCarrera.innerText = primerNoDisputado.ubicacion;
    descripcionCarrera.innerText = primerNoDisputado.descripcion;
    fotoCarrera.setAttribute("src", primerNoDisputado.srcFoto);
    if (primerNoDisputado.fotoCarrera) {
        fotoCarrera.setAttribute("src", "srcFoto");
    }
}

function noDisputado(granPremio) {
    return granPremio.disputado === false;
}
