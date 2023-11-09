export function crearMenu() {
    let menu = document.getElementById("menu");
    menu.innerHTML = "";
    let nav = document.createElement("nav");
    nav.innerHTML =
        "<ul class='row'>" +
        "<li class='two columns'><img src='./assets/img/logoBlanco.svg'></li>" +
        "<li class='two columns'><a href='home.html'>Home</a></li>" +
        "<li class='two columns'><a href='pilotos.html'>Pilotos</a></li>" +
        "<li class='two columns'><a href='perfil.html'>Perfil</a></li>" +
        "<li class='two columns'><a href='administracion.html'>Administración</a></li>" +
        "<li class='two columns'><a href='clasificacion.html'>Clasificación</a></li>" +
        "</ul>";
    menu.appendChild(nav);
}

export function crearMenuAlternativo() {
    let main = document.getElementsByTagName("main");
    main[0].setAttribute("class", "ten columns");

    let menu = document.getElementById("menu");
    menu.innerHTML = "";
    menu.setAttribute("class", "two columns izquierda");

    let nav = document.createElement("nav");
    nav.innerHTML =
        "<ul'>" +
        "<li><img src='./assets/img/logoBlanco.svg'></li>" +
        "<li><a href='home.html'>Home</a></li>" +
        "<li><a href='pilotos.html'>Pilotos</a></li>" +
        "<li><a href='perfil.html'>Perfil</a></li>" +
        "<li><a href='administracion.html'>Administración</a></li>" +
        "<li><a href='clasificacion.html'>Clasificación</a></li>" +
        "</ul>";
    menu.appendChild(nav);
}
