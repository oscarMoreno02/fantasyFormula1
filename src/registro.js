import { Usuario, Credenciales } from "./objetos.js"

const inputNombre = document.getElementById("nombre");
const inputApellidos = document.getElementById("apellidos");
const inputEmail = document.getElementById("email");
const inputPassword1 = document.getElementById("password1");
const inputPassword2 = document.getElementById("password2");
const botonRegistro = document.getElementById("btn-registro");
const inputNick=document.getElementById('nick')

const exReEmail = /^\w{2,15}@[A-Za-z0-9]+\.[A-Za-z]{3,4}$/
const exReNoAp = /^.{2,20}$/
const exReNick = /^\w{4,10}$/
const exRePassword = /^[A-Za-z0-9*#$]{6,12}$/

let datos=localStorage.getItem('credenciales')

let credenciales=new Credenciales()
if(datos!=null){
    let c=JSON.parse(datos)
   let lista=[]
    for(const element of c.usuarios){
       
        let user= 
        new Usuario(element.nombre,element.apellidos,element.email,element.nick,element.password)
        lista.push(user)
    }
    credenciales.usuarios=lista
}
console.log(credenciales)




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

botonRegistro.addEventListener('click',function(){
let validaciones=[true]
let mensaje=''

let nombre=document.getElementById("nombre").value
let apellidos=document.getElementById("apellidos").value
let email=document.getElementById("email").value
let nick=document.getElementById("nick").value
let psw=document.getElementById("password1").value
let psw2=document.getElementById("password2").value

if(!exReNoAp.test(nombre)){
    mensaje=mensaje + 'Formato del nombre incorrecto \n'
    validaciones.push(false)
}
if(!exReNoAp.test(apellidos)){
    mensaje=mensaje + 'Formato de los apellidos incorrecto \n'
    validaciones.push(false)
}
if(!exReNick.test(nick)){
    mensaje=mensaje + 'Formato del nick incorrecto \n'
    validaciones.push(false)
}
if(!exReEmail.test(email)){
    mensaje=mensaje + 'Formato de email incorrecto \n'
    validaciones.push(false)
}
if(!validarPassword(psw)['valido'] ||
!validarPassword(psw2)['valido'] ||
!validarMismaPassword(psw,psw2)['valido'] ){

    mensaje=mensaje + 'Contraseña mal introducida \n'
    validaciones.push(false)
}

if(validaciones.includes(false)){
    console.log(mensaje)
}else{
    
     if(comprobarRegistrados(email)){
        let user= new Usuario(nombre,apellidos,email,nick,psw)
        establecerUsuario(user)
        window.location.href='index.html'
     }else{
        console.log('email registrado')
    }
   
}
});


function establecerUsuario(usuario){
    credenciales.usuarios.push(usuario)
    let c=JSON.stringify(credenciales)
    localStorage.setItem('credenciales',c)
  }

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
function comprobarRegistrados(e){
    let c=true
    for(const i of credenciales.usuarios){
        if(i.email==e){
            c=false
        }
    }
    return c
}