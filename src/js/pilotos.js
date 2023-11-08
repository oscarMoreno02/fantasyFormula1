import { pilotos } from "./objetos.js";
import { Usuario } from "./clases.js";
import { crearMenu} from "./menu.js";

let usuario = new Usuario();

let datos = localStorage.getItem("usuario");
console.log(datos)
if (datos != null) {
    let u = JSON.parse(datos);
    console.log(u);
    usuario = new Usuario(u.nombre, u.apellidos, u.email, u.nick, u.password);
}else{
    window.location.href="index.html"
}

let sectionPilotos = document.getElementById("section-pilotos");

crearPilotos();
crearMenu();
function crearPilotos() {
    let competidores = pilotos;

    if (localStorage.getItem("pilotos")) {
        competidores = JSON.parse(localStorage.getItem("pilotos"));
    }

    mostrarPilotos(sectionPilotos, competidores);
}
