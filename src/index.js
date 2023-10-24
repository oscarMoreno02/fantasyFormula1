import { Usuario } from "./objetos.js"

const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");
const botonLogin = document.getElementById("login");
const botonRegistro = document.getElementById("btn-registro");

const exReEmail = /^\w{2,15}@[A-Za-z0-9]+\.[A-Za-z]{3,4}$/
const exRePassword = /^[A-Za-z0-9*#$]{6,12}$/

var datos=localStorage.getItem('usuario')
let user= new Usuario('','','','','')

if(datos!=null){
    var u=JSON.parse(datos)
   user= new Usuario(u.nombre,u.apellidos,u.email,u.nick,u.password)
    
}

botonLogin.addEventListener('click',function(){
let e=  document.getElementById("email").value
let p= document.getElementById("password").value
let msg={}
msg=validarInicio(e,p)

if(msg['valido']){
    window.location.href='inicio.html'

}else{
    console.log(msg)
}


})

botonRegistro.addEventListener('click', function(){
window.location.href='registro.html'


})

function validarInicio(email,password){

    let correcto ={}
    if(validarFormatoEmail(email) && validarFormatoPassword(password)){
       if (comprobarRegistro(email,password)){
        correcto['valido']=true
        correcto['mensaje']='Creedenciales correctas'
       }else{
        correcto['mensaje']='Email o contraseña incorrecta'
        correcto['valido']=false
       }

    }else{
        correcto['mensaje']='Formato de email o contraseña incorrecto'
        correcto['valido']=false
    }

return correcto
}

function comprobarRegistro(e,p){
    let correcto=true
    if(e!=user.email || p!=user.password){
        correcto=false
    }
    return correcto
}

function validarFormatoEmail(e){
    let c= exReEmail.test(e)
    return c
}

function validarFormatoPassword(p){
    let c= exRePassword.test(p)
    return c
}