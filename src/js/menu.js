export function crearMenu() {
    let div = document.getElementById("menu");

    let nav = document.createElement("nav");
    nav.innerHTML =
        "<ul class='row'>" +
        "<li class='two columns'><img src='./assets/img/logo.svg'></li>" +
        "<li class='two columns'><a href='home.html'>Home</a></li>" +
        "<li class='two columns'><a href='pilotos.html'>Pilotos</a></li>" +
        "<li class='two columns'><a href='perfil.html'>Perfil</a></li>" +
        "<li class='two columns'><a href='administracion.html'>Administración</a></li>" +
        "<li class='two columns'><a href='clasificacion.html'>Clasificación</a></li>" +
        "</ul>";
    div.appendChild(nav);
}
