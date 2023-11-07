import { Usuario } from "./objetos.js"
import {Credenciales} from "./objetos.js"

let user=localStorage.getItem("usuario")
if(user!=null){
    window.location.href="home.html"
}

const botonLogin = document.getElementById("login");
const botonRegistro = document.getElementById("btn-registro");
const alertaLogin = document.getElementById("alertaLogin");


const exReEmail = /^\w{2,15}@[A-Za-z0-9]+\.[A-Za-z]{3,4}$/
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



botonLogin.addEventListener('click',function(){
let e=  document.getElementById("email").value
let p= document.getElementById("password").value
let msg={}
msg=validarInicio(e,p)

if(msg['valido']){
   
 
    localStorage.setItem('usuario',JSON.stringify(msg['user']))
    window.location.href='home.html'
    

}else{
    alertaLogin.textContent=msg['mensaje']
}


})

botonRegistro.addEventListener('click', function(){
window.location.href='registro.html'


})

function validarInicio(email,password){

    let correcto ={}
    if(validarFormatoEmail(email) && validarFormatoPassword(password)){
        let info=comprobarRegistro(email,password)
        console.log(info)
       if (info['valido']){
        correcto['valido']=true
        correcto['user']=info['user']
       }else{
        correcto['mensaje']='Comprueba tu contraseña y correo electronico de cuenta e inténtalo de nuevo.'
        correcto['valido']=false
       }

    }else{
        correcto['mensaje']='Formato de email o contraseña incorrecto'
        correcto['valido']=false
    }

return correcto
}

function comprobarRegistro(e,p){
    let correcto=false
    let i=0
    let msg={}
    while(i<credenciales.usuarios.length && !correcto){
        let u=credenciales.usuarios[i]
        console.log(u)
    if( u && u.password && u.email){
        if(e==u.email && p==u.password){   
            msg['user']=new Usuario(u.nombre,u.apellidos,u.email,u.nick,u.password)
        correcto=true}
        
    }
    i++
}  
    msg['valido']=correcto
    return msg
}

function validarFormatoEmail(e){
    let c= exReEmail.test(e)
    return c
}

function validarFormatoPassword(p){
    let c= exRePassword.test(p)
    return c
}