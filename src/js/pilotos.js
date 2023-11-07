import { pilotos,Usuario } from "./objetos.js";
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

    console.log(competidores);

    for (let piloto of competidores) {
        
        let div = document.createElement("div");
        div.setAttribute("class", "tarjeta");

        let nombre = document.createElement("h4");
        nombre.innerHTML = piloto.nombre + "<br>" + piloto.apellido;
        div.appendChild(nombre);

        let img = document.createElement("img");
        img.setAttribute("src", piloto.srcFoto);
        div.appendChild(img);

        let escuderia = document.createElement("h5");
        escuderia.textContent = piloto.escuderia;
        div.appendChild(escuderia);

        let puntos = document.createElement("p");
        puntos.innerHTML = "<b>Puntuación: </b>" + piloto.puntuacion;
        div.appendChild(puntos);

        let propiedad = document.createElement("p");
        propiedad.innerHTML = "<b>Rol: </b>" + piloto.rol;
        div.appendChild(propiedad);

        sectionPilotos.appendChild(div);
    }
}
