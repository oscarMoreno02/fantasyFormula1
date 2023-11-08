export function mostrarPilotos(div, competidores) {
    for (let piloto of competidores) {
        let tarjeta = document.createElement("div");
        tarjeta.setAttribute("class", "tarjeta");

        let nombre = document.createElement("h4");
        nombre.innerHTML = piloto.nombre + "<br>" + piloto.apellido;
        tarjeta.appendChild(nombre);

        let img = document.createElement("img");
        img.setAttribute("src", piloto.srcFoto);
        tarjeta.appendChild(img);

        let escuderia = document.createElement("h5");
        escuderia.textContent = piloto.escuderia;
        tarjeta.appendChild(escuderia);

        let puntos = document.createElement("p");
        puntos.innerHTML = "<b>Puntuación:</b>" + piloto.puntuacion;
        tarjeta.appendChild(puntos);

        let propiedad = document.createElement("p");
        propiedad.innerHTML = "<b>Rol:</b>" + piloto.rol;
        tarjeta.appendChild(propiedad);

        div.appendChild(tarjeta);
    }
}
