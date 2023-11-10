import { Usuario, Credenciales } from "./clases.js";
let user = localStorage.getItem("usuario");
if (user != null) {
    window.location.href = "home.html";
}

const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputEmail = document.getElementById("email");
const inputPassword1 = document.getElementById("password1");
const inputPassword2 = document.getElementById("password2");
const botonRegistro = document.getElementById("btn-registro");
const inputNick = document.getElementById("nick");

const alertaNombre = document.getElementById("alertaNombre");
const alertaApellidos = document.getElementById("alertaApellidos");
const alertaNick = document.getElementById("alertaNick");
const alertaEmail = document.getElementById("alertaEmail");
const alertaPassword = document.getElementById("alertaPassword");
const alertaPassword2 = document.getElementById("alertaPassword2");
const alertaRegistro = document.getElementById("alertaRegistro");

const exReEmail = /^\w{2,15}@[A-Za-z0-9]+\.[A-Za-z]{3,4}$/;
const exReNoAp = /^.{2,20}$/;
const exReNick = /^\w{4,10}$/;
const exRePassword = /^[A-Za-z0-9*#$]{6,12}$/;

let datos = localStorage.getItem("credenciales");

let credenciales = new Credenciales();
if (datos != null) {
    let c = JSON.parse(datos);
    let lista = [];
    for (const element of c.usuarios) {
        let user = new Usuario(
            element.nombre,
            element.apellidos,
            element.email,
            element.nick,
            element.password,
            element.misPilotos,
            element.rivales
        );
        lista.push(user);
    }
    credenciales.usuarios = lista;
}

inputPassword1.addEventListener("input", function () {
    let psw = inputPassword1.value;
    let msg = validarPassword(psw);
    alertaPassword.textContent = msg["mensaje"];
});
inputPassword2.addEventListener("input", function () {
    let psw = inputPassword1.value;
    let psw2 = inputPassword2.value;
    let msg = validarPassword(psw2);
    alertaPassword2.textContent = msg["mensaje"];

    if (msg["valido"]) {
        msg = validarMismaPassword(psw, psw2);
        alertaPassword2.textContent = msg["mensaje"];
    }
});

botonRegistro.addEventListener("click", function () {
    let validaciones = [true];
    let mensaje = "";

    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let email = document.getElementById("email").value;
    let nick = document.getElementById("nick").value;
    let psw = document.getElementById("password1").value;
    let psw2 = document.getElementById("password2").value;

    if (!exReNoAp.test(nombre)) {
        alertaNombre.textContent = "Formato del nombre incorrecto \n";
        validaciones.push(false);
    } else {
        alertaNombre.textContent = "";
    }
    if (!exReNoAp.test(apellidos)) {
        alertaApellidos.textContent = "Formato de los apellidos incorrecto \n";
        validaciones.push(false);
    } else {
        alertaApellidos.textContent = "";
    }
    if (!exReNick.test(nick)) {
        alertaNick.textContent = "Formato del nick incorrecto \n";
        validaciones.push(false);
    } else {
        alertaNick.textContent = "";
    }
    if (!exReEmail.test(email)) {
        alertaEmail.textContent = "Formato de email incorrecto \n";
        validaciones.push(false);
    } else {
        alertaEmail.textContent = "";
    }
    if (
        !validarPassword(psw)["valido"] ||
        !validarPassword(psw2)["valido"] ||
        !validarMismaPassword(psw, psw2)["valido"]
    ) {
        alertaPassword2.textContent = "";
        alertaPassword.textContent = "Contraseña mal introducida \n";
        validaciones.push(false);
    }

    if (validaciones.includes(false)) {
        
    } else {
        let aux = comprobarRegistrados(email, nick);
        if (aux["valido"]) {
            let user = new Usuario(nombre, apellidos, email, nick, psw,[],[]);
            
            user.asignarPilotos();
            user.asignarRivales();
            guardarUsuarioCredenciales(user);
            window.location.href = "index.html";
        } else {
            alertaRegistro.textContent = aux["mensaje"];
        }
    }
});

function guardarUsuarioCredenciales(usuario) {
    credenciales.usuarios.push(usuario);
    localStorage.setItem("credenciales", JSON.stringify(credenciales));
}

function validarPassword(password) {
    let mensaje = {};

    if (password.length < 6) {
        mensaje["mensaje"] = "Tamaño incorrecto (mínimo 6 caracteres)";
        mensaje["valido"] = false;
    } else {
        if (password.length > 12) {
            mensaje["mensaje"] = "Tamaño incorrecto (máximo 12 caracteres)";
            mensaje["valido"] = false;
        } else {
            if (!exRePassword.test(password)) {
                mensaje["mensaje"] =
                    "La contraseña contiene caracteres no válidos";
                mensaje["valido"] = false;
            } else {
                mensaje["mensaje"] = "Contraseña correcta";
                mensaje["valido"] = true;
            }
        }
    }
    return mensaje;
}

function validarMismaPassword(password1, password2) {
    let auxiliar = {};
    if (password1 == password2) {
        auxiliar["valido"] = true;
        auxiliar["mensaje"] = "Ambas contraseñas coinciden";
    } else {
        auxiliar["valido"] = false;
        auxiliar["mensaje"] = "Las contraseñas no coinciden";
    }

    return auxiliar;
}
function comprobarRegistrados(email, nick) {
    let auxiliar = {};
    auxiliar["valido"] = true;
    auxiliar["mensaje"] = "";
    for (const i of credenciales.usuarios) {
        if (i.email == email) {
            auxiliar["valido"] = false;
            auxiliar["mensaje"] =
                auxiliar["mensaje"] + " Direccion de email en uso \n";
        }
        if (i.nick == nick) {
            auxiliar["valido"] = false;
            auxiliar["mensaje"] =
                auxiliar["mensaje"] + " Nick de usuario en uso \n";
        }
    }
    return auxiliar;
}
