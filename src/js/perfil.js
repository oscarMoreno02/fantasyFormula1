import { Usuario } from "./objetos.js";
import { Credenciales } from "./objetos.js";
import { crearMenu } from "./menu.js";

const inputNuevaPassword = document.getElementById("nueva-password");
const botonCambioPass = document.getElementById("btn-cambiar-password");
const botonCambioDatos = document.getElementById("btn-guardar-cambios")


const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");

const inputNick = document.getElementById("nick");

const exReEmail = /^\w{2,15}@[A-Za-z0-9]+\.[A-Za-z]{3,4}$/
const exReNoAp = /^.{2,20}$/
const exRePassword = /^[A-Za-z0-9*#$]{6,12}$/


let datos = localStorage.getItem('credenciales')

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
            element.password
        );
        lista.push(user);
    }
    credenciales.usuarios = lista;
}


let usuario = credenciales.usuarios[0]

 datos = localStorage.getItem('usuario')

if (datos != null) {
    let u = JSON.parse(datos)
    console.log(u)
    usuario = new Usuario(u.nombre,u.apellidos, u.email, u.nick, u.password)
}
console.log(usuario)

inputNombre.setAttribute('placeholder', usuario.nombre)
console.log(usuario.apellidos)
inputApellidos.setAttribute('placeholder', usuario.apellidos)
inputNick.setAttribute('placeholder', usuario.nick)
inputEmail.setAttribute('placeholder', usuario.email)
inputPassword.setAttribute('placeholder', 'Nueva contraseña')
inputNuevaPassword.setAttribute('placeholder', 'Confirme la nueva contraseña')


inputPassword.addEventListener("input", function () {
    let psw = inputPassword.value;
    let msg = validarPassword(psw);
    console.log(msg);
});
inputNuevaPassword.addEventListener("input", function () {
    let psw = inputPassword.value;
    let psw2 = inputNuevaPassword.value;
    let msg = validarPassword(psw2);
    console.log(msg);
    if (msg["valido"]) {
        msg = validarMismaPassword(psw, psw2);
        console.log(msg);
    }
});

botonCambioDatos.addEventListener('click', function () {
    console.log('hola')
    let contadorCambios = 0
    let nombre = document.getElementById("nombre").value
    let apellidos = document.getElementById("apellidos").value
    let email = document.getElementById("email").value

    let validaciones = [true]
    let mensaje = ''
    if (nombre) {
        contadorCambios++
        if (!exReNoAp.test(nombre)) {
            mensaje = mensaje + "Formato del nombre incorrecto \n";
            validaciones.push(false);
        }
    } else {
        nombre = document.getElementById("nombre").placeholder;
    }

    if (apellidos) {
        contadorCambios++
        if (!exReNoAp.test(apellidos)) {
            mensaje = mensaje + "Formato de los apellidos incorrecto \n";
            validaciones.push(false);
        }
    } else {
        apellidos = document.getElementById("apellidos").placeholder;
    }

    if (email) {
        contadorCambios++
        if (!exReEmail.test(email)) {
            mensaje = mensaje + "Formato de email incorrecto \n";
            validaciones.push(false);
        } else {
            if (email == usuario.email) {
                mensaje =
                    mensaje + "Debes introducir un email distinto al anterior";
                validaciones.push(false);
            } else {
                if (!comprobarRegistrados(email)) {
                    validaciones.push(false)
                    mensaje = mensaje + 'Email en uso \n'
                }
            }
        }
    } else {
        email = document.getElementById("email").placeholder;
    }
    if (validaciones.includes(false)) {
        console.log(mensaje)
    } else {
        if (contadorCambios > 0) {
            let newUser = new Usuario(nombre, apellidos, email, usuario.nick, usuario.psw)
            guardarNuevosDatos(newUser)
        }else{
            console.log('No se han realizado cambios')
        }
    }
})
botonCambioPass.addEventListener('click',function(){
    
    cambiarPassword()
})

function cambiarPassword() {
    let psw = document.getElementById("password").value
    let psw2 = document.getElementById("nueva-password").value

    let validaciones = [true]
    let mensaje = ''

    if (psw || psw2) {
        if (!validarPassword(psw)['valido'] ||
            !validarPassword(psw2)['valido'] ||
            !validarMismaPassword(psw, psw2)['valido']) {
            mensaje = mensaje + 'Contraseña mal introducida \n'
            validaciones.push(false)

        } else {
            if (psw == usuario.password) {
                mensaje = mensaje + 'La contraseña no puede ser la misma \n'
                validaciones.push(false)
            }
        }
        if (validaciones.includes(false)) {
            console.log(mensaje)
        } else {
            let newUser = new Usuario(usuario.nombre, usuario.apellidos, usuario.email, usuario.nick, psw)
            guardarNuevosDatos(newUser)
        }
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
function guardarNuevosDatos(user) {
    let t = false;
    let i = 0;
    while (!t) {
        console.log(credenciales.usuarios[0].nick)
        if (credenciales.usuarios[i].nick == usuario.nick) {
            credenciales.usuarios[i] = user
            let c = JSON.stringify(credenciales)
            localStorage.setItem('credenciales', c)
            let u = JSON.stringify(user)
            localStorage.setItem('usuario', u)
            t = true
        }
        i++;
    }
   refrescar()
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
function refrescar(){
    inputApellidos.value=''
    inputEmail.value=''
    inputNombre.value=''
    window.location.reload()
}

