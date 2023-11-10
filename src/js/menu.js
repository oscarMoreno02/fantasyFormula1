export function crearMenu() {
    if (localStorage.getItem("menu") == "vertical") {
        crearMenuVertical();
    } else {
        crearMenuHorizontal();
    }
    crearListenerMenu();
    crearListenerTema();
    crearListenerSesion();
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
        menu.className += " oscuro";
        let footer = document.getElementsByTagName("footer");
        footer[0].className += " oscuro";
        let botonMenu = document.getElementById("btn-menu");
        botonMenu.setAttribute("class", "button-primary");
        let botonTema = document.getElementById("btn-tema");
        botonTema.setAttribute("class", "button-primary");

        localStorage.setItem("tema", "oscuro");
    } else {
        let menu = document.getElementById("menu");
        menu.classList.remove("oscuro");
        let footer = document.getElementsByTagName("footer");
        footer.classList.remove("oscuro");
        let botonMenu = document.getElementById("btn-menu");
        botonMenu.classList.remove("button-primary");
        let botonTema = document.getElementById("btn-tema");
        botonTema.classList.remove("button-primary");

        localStorage.setItem("tema", "claro");
    }
}

function crearMenuHorizontal() {
    let menu = document.getElementById("menu");
    menu.innerHTML = "";

    let footer = document.getElementsByTagName("footer");
    footer[0].setAttribute("display", "none");

    let nav = document.createElement("nav");
    nav.innerHTML =
        "<ul class='row'>" +
        "<li class='two columns'><img id='logo' src='https://oscardespliegue.000webhostapp.com/fotosf1/assets/img/logoBlanco.svg'></li>" +
        "<li class='one column'><a href='home.html'>Home</a></li>" +
        "<li class='one column'><a href='pilotos.html'>Pilotos</a></li>" +
        "<li class='one column'><a href='perfil.html'>Perfil</a></li>" +
        "<li class='one column'><a href='administracion.html'>Administración</a></li>" +
        "<li class='one column'><a href='clasificacion.html'>Clasificación</a></li>" +
        "<li class='one column'><button id='btn-menu'>Cambiar menú</button></li>" +
        "<li class='one column'><button id='btn-tema'>Cambiar tema</button></li>" +
        "<li class='one column'><button id='btn-sesion'>Cerrar sesión</button></li>" +
        "</ul>";
    menu.appendChild(nav);
}

export function crearMenuVertical() {
    let main = document.getElementsByTagName("main");
    main[0].setAttribute("class", "eight columns offset-by-one");

    let footer = document.getElementsByTagName("footer");
    footer[0].setAttribute("display", "block");

    let menu = document.getElementById("menu");
    menu.innerHTML = "";
    menu.setAttribute("class", "two columns izquierda");

    let nav = document.createElement("nav");
    nav.innerHTML =
        "<ul>" +
        "<li><img id='logo'src='https://oscardespliegue.000webhostapp.com/fotosf1/assets/img/logoBlanco.svg'></li>" +
        "<li><a href='home.html'>Home</a></li>" +
        "<li><a href='pilotos.html'>Pilotos</a></li>" +
        "<li><a href='perfil.html'>Perfil</a></li>" +
        "<li><a href='administracion.html'>Administración</a></li>" +
        "<li><a href='clasificacion.html'>Clasificación</a></li>" +
        "<li><button id='btn-menu'>Cambiar menú</button></li>" +
        "<li><button id='btn-tema'>Cambiar tema</button></li>" +
        "<li class='one column'><button id='btn-sesion'>Cerrar sesión</button></li>" +
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

function crearListenerSesion() {
    let boton = document.getElementById("btn-sesion");

    boton.addEventListener("click", function () {
        localStorage.removeItem("usuario");
        window.location.reload();
    });
}
