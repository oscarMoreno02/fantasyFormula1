export function mostrarPilotos(div, competidores) {
    for (let piloto of competidores) {
        let tarjeta = document.createElement("div");
        div.setAttribute("class", "tarjeta");

        let nombre = document.createElement("h4");
        nombre.textContent = piloto.nombre + " " + piloto.apellido;
        div.appendChild(nombre);

        let img = document.createElement("img");
        img.setAttribute("src", piloto.srcFoto);
        div.appendChild(img);

        let escuderia = document.createElement("h5");
        escuderia.textContent = piloto.escuderia;
        div.appendChild(escuderia);

        let puntos = document.createElement("p");
        puntos.innerHTML = "<b>Puntuación:</b>" + piloto.puntuacion;
        div.appendChild(puntos);

        let propiedad = document.createElement("p");
        propiedad.innerHTML = "<b>Rol:</b>" + piloto.rol;
        div.appendChild(propiedad);

        div.appendChild(tarjeta);
    }
}