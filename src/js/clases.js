import { pilotos } from "./objetos";

export class Usuario {
    puntuacion = this.calcularPuntuacion();

    constructor(nom, ape, email, nick, password) {
        this.nombre = nom;
        this.apellidos = ape;
        this.email = email;
        this.nick = nick;
        this.password = password;
        this.pilotos = this.asignarPilotos();
    }

    asignarPilotos() {
        let i = 0;
        let competidores = [];

        do {
            let idPilotoAleatoria =
                Math.floor(Math.random() * pilotos.length) + 1;

            for (let piloto in pilotos) {
                if (piloto.id == idPilotoAleatoria && piloto.rol == "") {
                    pilotos[i] = piloto;

                    i++;
                }
            }
        } while (i < 0);

        return competidores;
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
    usuarios = [new Usuario("adm", "adm", "admin@dom.es", "adm", "123456")];
}
