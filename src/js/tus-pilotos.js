import { Usuario } from "./clases.js";
import { pilotos } from "./objetos.js";
import { crearMenu, cambiarTema } from "./menu.js";
import { mostrarPilotos } from "./comunes.js";

let divTusPilotos = document.getElementById("tus-pilotos");
let selectPilotos = document.getElementById("select-pilotos");
let btnAsignarTitular = document.getElementById("btn-asignar-titular");

crearMenu();
crearPilotos();

btnAsignarTitular.addEventListener("click", function () {
    cambiarTitular();
});

function crearPilotos() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let tusPilotos = usuario.pilotos;
    console.log(usuario);
    console.log(tusPilotos);

    mostrarPilotos(divTusPilotos, tusPilotos);

    for (let i = 0; i < tusPilotos.length; i++) {
        let option = document.createElement("option");
        option.innerText = tusPilotos[i].nombre;
        option.value = i;

        selectPilotos.appendChild(option);
    }
}

function cambiarTitular() {
    let seleccionado = selectPilotos.value;
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    let tusPilotos = usuario.pilotos;

    if (tusPilotos[seleccionado] != tusPilotos[0]) {
        let nuevoTitular = tusPilotos[seleccionado];
        tusPilotos[1] = tusPilotos[0];
        tusPilotos[0] = nuevoTitular;
    }
}
