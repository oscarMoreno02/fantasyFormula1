import { Usuario } from "./clases.js";
import { Credenciales } from "./clases.js";
import { crearMenu } from "./menu.js";

crearMenu();

const inputNuevaPassword = document.getElementById("nueva-password");
const botonCambioPass = document.getElementById("btn-cambiar-password");
const botonCambioDatos = document.getElementById("btn-guardar-cambios");

const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

const inputNick = document.getElementById("nick");

const alertaNombre = document.getElementById("alertaNombre");
const alertaApellidos = document.getElementById("alertaApellidos");
const alertaNick = document.getElementById("alertaNick");
const alertaEmail = document.getElementById("alertaEmail");
const alertaPassword = document.getElementById("alertaPassword");
const alertaPassword2 = document.getElementById("alertaPassword2");
const alertaCambioDatos = document.getElementById("alertaCambioDatos");
const alertaCambioPassword = document.getElementById("alertaCambioPassword");

const exReEmail = /^\w{2,15}@[A-Za-z0-9]+\.[A-Za-z]{3,4}$/;
const exReNoAp = /^.{2,20}$/;
const exRePassword = /^[A-Za-z0-9*#$]{6,12}$/;

let usuario = new Usuario();

let datos = localStorage.getItem("usuario");
console.log(datos);
if (datos != null) {
    let u = JSON.parse(datos);
    console.log(u);
    usuario = new Usuario(
        u.nombre,
        u.apellidos,
        u.email,
        u.nick,
        u.password,
        u.pil
    );
} else {
    window.location.href = "index.html";
}

datos = localStorage.getItem("credenciales");

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
            element.pil
        );
        lista.push(user);
    }
    credenciales.usuarios = lista;
}

inputNombre.setAttribute("placeholder", usuario.nombre);
console.log(usuario.apellidos);
inputApellidos.setAttribute("placeholder", usuario.apellidos);
inputNick.setAttribute("placeholder", usuario.nick);
inputEmail.setAttribute("placeholder", usuario.email);
inputPassword.setAttribute("placeholder", "Nueva contraseña");
inputNuevaPassword.setAttribute("placeholder", "Confirme la nueva contraseña");

inputPassword.addEventListener("input", function () {
    let psw = inputPassword.value;
    let msg = validarPassword(psw);
    alertaPassword.textContent = msg["mensaje"];
});
inputNuevaPassword.addEventListener("input", function () {
    let psw = inputPassword.value;
    let psw2 = inputNuevaPassword.value;
    let msg = validarPassword(psw2);
    alertaPassword2.textContent = msg["mensaje"];

    if (msg["valido"]) {
        msg = validarMismaPassword(psw, psw2);
        alertaPassword2.textContent = msg["mensaje"];
    }
});

botonCambioDatos.addEventListener("click", function () {
    let contadorCambios = 0;
    let nombre = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellidos").value;
    let email = document.getElementById("email").value;

    let validaciones = [true];

    if (nombre) {
        contadorCambios++;
        if (!exReNoAp.test(nombre)) {
            alertaNombre.textContent = "Formato del nombre incorrecto \n";
            inputNombre.style.border = "1px solid red";
            validaciones.push(false);
        }
    } else {
        nombre = document.getElementById("nombre").placeholder;
    }

    if (apellidos) {
        contadorCambios++;
        if (!exReNoAp.test(apellidos)) {
            alertaApellidos.textContent =
                "Formato de los apellidos incorrecto \n";
            inputApellidos.style.border = "1px solid red";
            validaciones.push(false);
        }
    } else {
        apellidos = document.getElementById("apellidos").placeholder;
    }

    if (email) {
        contadorCambios++;
        if (!exReEmail.test(email)) {
            alertaEmail.textContent = "Formato de email incorrecto \n";
            inputEmail.style.border = "1px solid red";
            validaciones.push(false);
        } else {
            if (email == usuario.email) {
                alertaEmail.textContent =
                    "Debes introducir un email distinto al anterior";
                validaciones.push(false);
            } else {
                if (!comprobarRegistrados(email)) {
                    validaciones.push(false);
                    alertaEmail.textContent = "Email en uso \n";
                }
            }
        }
    } else {
        email = document.getElementById("email").placeholder;
    }
    if (validaciones.includes(false)) {
    } else {
        if (contadorCambios > 0) {
            let newUser = new Usuario(
                nombre,
                apellidos,
                email,
                usuario.nick,
                usuario.psw,
                usuario.pil
            );
            cambiarDatosUsuario(newUser);
        } else {
            restablecerInputYAlertas();
            alertaCambioDatos.textContent = "No se han realizado cambios";
        }
    }
});
botonCambioPass.addEventListener("click", function () {
    cambiarPassword();
});

function cambiarPassword() {
    let psw = document.getElementById("password").value;
    let psw2 = document.getElementById("nueva-password").value;

    let validaciones = [true];
    let mensaje = "";

    if (psw || psw2) {
        if (
            !validarPassword(psw)["valido"] ||
            !validarPassword(psw2)["valido"] ||
            !validarMismaPassword(psw, psw2)["valido"]
        ) {
            alertaPassword.textContent = "Contraseña mal introducida \n";
            alertaPassword2.textContent = "";
            inputPassword.style.border = "1px solid red";
            inputNuevaPassword.style.border = "1px solid red";
            validaciones.push(false);
        } else {
            if (psw == usuario.password) {
                alertaPassword.textContent =
                    "La contraseña no puede ser la misma \n";
                alertaPassword2.textContent = "";
                validaciones.push(false);
            }
        }
        if (validaciones.includes(false)) {
        } else {
            let newUser = new Usuario(
                usuario.nombre,
                usuario.apellidos,
                usuario.email,
                usuario.nick,
                psw,
                usuario.pil
            );
            cambiarDatosUsuario(newUser);
        }
    } else {
        alertaCambioPassword.textContent = "No se han realizado cambios";
        alertaCambioDatos.textContent = "";
        restablecerInputYAlertas();
    }
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

function validarMismaPassword(p1, p2) {
    let m = {};
    if (p1 == p2) {
        m["valido"] = true;
        m["mensaje"] = "Ambas contraseñas coinciden";
    } else {
        m["valido"] = false;
        m["mensaje"] = "Las contraseñas no coinciden";
    }

    return m;
}

function cambiarDatosUsuario(user) {
    let continuar = false;
    let indice = 0;
    while (!continuar) {
        if (credenciales.usuarios[indice].nick == usuario.nick) {
            credenciales.usuarios[indice] = user;
            localStorage.setItem("credenciales", JSON.stringify(credenciales));
            localStorage.setItem("usuario", JSON.stringify(user));
            continuar = true;
        }
        indice++;
    }

    refrescar();
    alert("Datos guardados correctamente");
}

function comprobarRegistrados(e) {
    let c = true;
    for (const i of credenciales.usuarios) {
        if (i.email == e) {
            c = false;
        }
    }
    return c;
}

function refrescar() {
    inputApellidos.value = "";
    inputEmail.value = "";
    inputNombre.value = "";
    inputPassword.value = "";
    inputNuevaPassword.value = "";
    window.location.reload();
}

function restablecerInputYAlertas() {
    inputApellidos.style.border = "";
    inputNombre.style.border = "";
    inputEmail.style.border = "";
    inputPassword.style.border = "";
    inputNuevaPassword.style.border = "";

    inputApellidos.value = "";
    inputNombre.style.value = "";
    inputEmail.style.value = "";
    inputPassword.style.value = "";
    inputNuevaPassword.style.value = "";

    alertaNombre.textContent = "";
    alertaApellidos.textContent = "";
    alertaEmail.textContent = "";
    alertaPassword.textContent = "";
    alertaPassword2.textContent = "";
}
