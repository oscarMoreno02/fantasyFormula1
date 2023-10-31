export function crearMenu() {
    let div = document.getElementById("menu");

    let nav = document.createElement("nav");
    nav.innerHTML =
        "<ul>" +
        "<li><a href='home.html'>Home</a></li>" +
        "<li><a href='pilotos.html'>Pilotos</a></li>" +
        "<li><a href='perfil.html'>Perfil</a></li>" +
        "<li><a href='administracion.html'>Administración</a></li>" +
        "<li><a href='clasificacion.html'>Clasificación</a></li>" +
        "</ul>";
    div.appendChild(nav);
}
