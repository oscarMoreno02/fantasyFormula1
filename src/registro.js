const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputEmail = document.getElementById("email");
const inputPassword1 = document.getElementById("password1");
const inputPassword2 = document.getElementById("password2");
const botonRegistro = document.getElementById("registro");

const exReEmail= /^\w{2,15}@[A-Za-z0-9]+\.[A-Za-z]{3,4}$/
const exReNoAp= /^.{2,20}$/
const exReNick= /^\w{4,10}$/
const exRePassword= /^[A-Za-z0-9*#$]{6,12}$/

