import { Usuario } from "./clases";
import { pilotos } from "./objetos";
import { crearMenu } from "./menu";
import { mostrarPilotos } from "./comunes.js";

let divTusPilotos = document.getElementById("tus-pilotos");
let btnAsignarTitular = document.getElementById("btn-asignar-titular");

crearMenu();
crearPilotos();

function crearPilotos() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let tusPilotos = usuario.pilotos;

    mostrarPilotos(divTusPilotos, tusPilotos);
}
