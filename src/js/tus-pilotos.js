import { Usuario } from "./clases";
import { pilotos } from "./objetos";
import { crearMenu } from "./menu";
import { mostrarPilotos } from "./comunes.js";

let divTusPilotos = document.getElementById("tus-pilotos");
let selectPilotos = document.getElementById("select-pilotos");
let btnAsignarTitular = document.getElementById("btn-asignar-titular");

crearMenu();
crearPilotos();

function crearPilotos() {
    let credenciales = JSON.parse(localStorage.getItem("credenciales"));
    let tusPilotos = credenciales.usuarios[1].pilotos;
    console.log(tusPilotos);

    mostrarPilotos(divTusPilotos, tusPilotos);

    for (let piloto in tusPilotos) {
        let option = document.createElement("option");
        option.value = piloto.nombre;
        
        selectPilotos.appendChild(option);
    }
}
