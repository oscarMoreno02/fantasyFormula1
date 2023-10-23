const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputEmail = document.getElementById("email");
const inputPassword1 = document.getElementById("password1");
const inputPassword2 = document.getElementById("password2");
const botonRegistro = document.getElementById("registro");

const exReEmail = /^\w{2,15}@[A-Za-z0-9]+\.[A-Za-z]{3,4}$/
const exReNoAp = /^.{2,20}$/
const exReNick = /^\w{4,10}$/
const exRePassword = /^[A-Za-z0-9*#$]{6,12}$/


let validacionPassword=false
// let validacionGeneral=false

inputPassword1.addEventListener('input', function () {
    let psw = inputPassword1.value
    let msg = validarPassword(psw)
    console.log(msg)

});
inputPassword2.addEventListener('input', function () {
    let psw = inputPassword1.value
    let psw2 = inputPassword2.value
    let msg = validarPassword(psw2)
    console.log(msg)
    if(msg['valido']){
        msg=validarMismaPassword(psw,psw2)
        console.log(msg)
    }
});



function validarPassword(password) {
    let mensaje ={}

    if (password.length < 6) {
        mensaje['mensaje'] ='Tamaño incorrecto (mínimo 6 caracteres)'
        mensaje['valido']=false
    } else {

        if (password.length > 12) {
            mensaje = 'Tamaño incorrecto (máximo 12 caracteres)'
            mensaje['valido']=false
        } else {

            if (!exRePassword.test(password)) {
                mensaje['mensaje']= 'La contraseña contiene caracteres no válidos'
                mensaje['valido']=false
            }else{
                mensaje['mensaje']='Contraseña correcta'
                mensaje['valido']=true
            }
        }
    }
    return mensaje
}


function validarMismaPassword(p1,p2){
   let m={}
   if(p1==p2){
    m['valido']=true
    m['mensaje']='Ambas contraseñas coinciden'
   }else{
    m['valido']=false
    m['mensaje']='Las contraseñas no coinciden'
   }
   
    return m
}