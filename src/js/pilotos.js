import { Usuario } from "./clases.js";
import { crearMenu, cambiarTema } from "./menu.js";
import { crearPilotos, mostrarPilotos } from "./comunes.js";

let usuario = new Usuario();

let datos = localStorage.getItem("usuario");

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

let sectionPilotos = document.getElementById("section-pilotos");

crearMenu();
let pilotos = crearPilotos();

mostrarPilotos(sectionPilotos, pilotos);
