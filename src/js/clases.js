export class Usuario {
    constructor(nom, ape, email, nick, password) {
        this.nombre = nom;
        this.apellidos = ape;
        this.email = email;
        this.nick = nick;
        this.password = password;
    }
}
export class Credenciales {
    usuarios = [new Usuario("adm", "adm", "admin@dom.es", "adm", "123456")];
}
