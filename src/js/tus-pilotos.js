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
    let tusPilotos = usuario.misPilotos;

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
    let tusPilotos = usuario.misPilotos;

    if (tusPilotos[seleccionado].id != tusPilotos[0].id) {
        let nuevoTitular = tusPilotos[seleccionado];

        tusPilotos[1] = tusPilotos[0];
        tusPilotos[0] = nuevoTitular;
        tusPilotos[0].rol = " Titular";
        tusPilotos[1].rol = " Suplente";

        let listaPilotos = JSON.parse(localStorage.getItem("pilotos"));

        let continuar = 0;
        let i = 0;

        while (continuar < 1) {
            console.log(tusPilotos[0]);

            if (listaPilotos[i].id == tusPilotos[0].id) {
                console.log(tusPilotos[0]);
                console.log(listaPilotos[i]);
                listaPilotos[i].rol = " Titular";

                continuar++;
            }
            i++;
        }
        continuar = 0;
        i = 0;

        while (continuar < 1) {
            if (listaPilotos[i].id == tusPilotos[1].id) {
                console.log(tusPilotos[1]);
                console.log(listaPilotos[i]);
                listaPilotos[i].rol = " Suplente";

                continuar++;
            }
            i++;
        }

        localStorage.setItem("pilotos", JSON.stringify(listaPilotos));
        localStorage.setItem("usuario", JSON.stringify(usuario));
        window.location.reload();
    }
}
