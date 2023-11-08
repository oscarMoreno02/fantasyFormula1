import { pilotos } from "./objetos";

export class Usuario {
    puntuacion = this.calcularPuntuacion();
    pilotos = [
        {
            id: 1,
            nombre: "",
            apellido: "",
            nacionalidad: "",
            escuderia: "",
            puntuacion: 0,
            propiedadJugador: "",
            rol: "",
            srcFoto: "",
        },

        {
            id: 2,
            nombre: "",
            nacionalidad: "",
            escuderia: "",
            puntuacion: 0,
            propiedadJugador: "",
            rol: "",
            srcFoto: "",
        },
    ];

    constructor(nom, ape, email, nick, password, pil) {
        this.nombre = nom;
        this.apellidos = ape;
        this.email = email;
        this.nick = nick;
        this.password = password;
        this.pilotos = pil;
    }

    asignarPilotos() {
        let i = 0;

        do {
            let idPilotoAleatoria =
                Math.floor(Math.random() * pilotos.length) + 1;

            for (let piloto of pilotos) {
                if (piloto.id == idPilotoAleatoria && piloto.rol == "") {
                    this.pilotos.push(piloto);
                    i++;
                }
            }
        } while (i < 2);
    }

    calcularPuntuacion() {
        let puntos = 0;

        for (let piloto in this.pilotos) {
            puntos += piloto.puntuacion;
        }

        return puntos;
    }
}
export class Credenciales {
    usuarios = [new Usuario("adm", "adm", "admin@dom.es", "adm", "123456", [])];
}
