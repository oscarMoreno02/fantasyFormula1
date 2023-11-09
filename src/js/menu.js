export function crearMenu() {
    if (localStorage.getItem("menu") == "vertical") {
        crearMenuVertical();
    } else {
        crearMenuHorizontal();
    }
    crearListenerMenu();
    crearListenerTema();
}

export function cambiarMenu() {
    if (localStorage.getItem("menu") == "vertical") {
        localStorage.setItem("menu", "horizontal");
    } else {
        localStorage.setItem("menu", "vertical");
    }

    window.location.reload();
}

export function cambiarTema() {
    if (localStorage.getItem("tema") == "claro") {
        let menu = document.getElementById("menu");
        menu.setAttribute("class", "oscuro");
        let botonMenu = document.getElementById("btn-menu");
        botonMenu.setAttribute("class", "button-primary");
        let botonTema = document.getElementById("btn-tema");
        botonTema.setAttribute("class", "button-primary");

        localStorage.setItem("tema", "oscuro");
    } else {
        let menu = document.getElementById("menu");
        menu.setAttribute("class", "");
        let botonMenu = document.getElementById("btn-menu");
        botonMenu.setAttribute("class", "");
        let botonTema = document.getElementById("btn-tema");
        botonTema.setAttribute("class", "");

        localStorage.setItem("tema", "claro");
    }
}

function crearMenuHorizontal() {
    let menu = document.getElementById("menu");
    menu.innerHTML = "";
    let nav = document.createElement("nav");
    nav.innerHTML =
        "<ul class='row'>" +
        "<li class='two columns'><img id='logo' src='./assets/img/logoBlanco.svg'></li>" +
        "<li class='one column'><a href='home.html'>Home</a></li>" +
        "<li class='one column'><a href='pilotos.html'>Pilotos</a></li>" +
        "<li class='one column'><a href='perfil.html'>Perfil</a></li>" +
        "<li class='one column'><a href='administracion.html'>Administración</a></li>" +
        "<li class='one column'><a href='clasificacion.html'>Clasificación</a></li>" +
        "<li class='one column'><button id='btn-menu'>Cambiar menú</button></li>" +
        "<li class='one column'><button id='btn-tema'>Cambiar tema</button></li>" +
        "</ul>";
    menu.appendChild(nav);
}

export function crearMenuVertical() {
    let main = document.getElementsByTagName("main");
    main[0].setAttribute("class", "eight columns offset-by-one");

    let menu = document.getElementById("menu");
    menu.innerHTML = "";
    menu.setAttribute("class", "two columns izquierda");

    let nav = document.createElement("nav");
    nav.innerHTML =
        "<ul>" +
        "<li><img id='logo'src='./assets/img/logoBlanco.svg'></li>" +
        "<li><a href='home.html'>Home</a></li>" +
        "<li><a href='pilotos.html'>Pilotos</a></li>" +
        "<li><a href='perfil.html'>Perfil</a></li>" +
        "<li><a href='administracion.html'>Administración</a></li>" +
        "<li><a href='clasificacion.html'>Clasificación</a></li>" +
        "<li><button id='btn-menu''>Cambiar menú</button></li>" +
        "<li><button id='btn-tema''>Cambiar tema</button></li>" +
        "</ul>";
    menu.appendChild(nav);
}

function crearListenerMenu() {
    let boton = document.getElementById("btn-menu");

    boton.addEventListener("click", function () {
        cambiarMenu();
    });
}

function crearListenerTema() {
    let boton = document.getElementById("btn-tema");

    boton.addEventListener("click", function () {
        cambiarTema();
    });
}
