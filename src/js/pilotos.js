import { Usuario } from "./clases.js";
import { crearMenu, cambiarMenu } from "./menu.js";
import { crearPilotos, mostrarPilotos } from "./comunes.js";

let usuario = new Usuario();

let datos = localStorage.getItem("usuario");

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

let sectionPilotos = document.getElementById("section-pilotos");

crearMenu();
let pilotos = crearPilotos();
mostrarPilotos(sectionPilotos, pilotos);
