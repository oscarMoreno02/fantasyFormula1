import { pilotos } from "./objetos";
import { crearBot } from "./comunes.js";

export class Usuario {
    puntuacion = 0;
    misPilotos = [];
    rivales = [];

    constructor(nom, ape, email, nick, password, pil, rivales) {
        this.nombre = nom;
        this.apellidos = ape;
        this.email = email;
        this.nick = nick;
        this.password = password;
        this.misPilotos = pil;
        this.rivales = rivales;
    }

    asignarPilotos() {
        let i = 0;

        do {
            let idPilotoAleatoria =
                Math.floor(Math.random() * pilotos.length) + 1;

            for (let piloto of pilotos) {
                if (piloto.id == idPilotoAleatoria && piloto.rol == "") {
                    if (this.misPilotos.length == 0) {
                        piloto.rol = " Titular";
                    } else {
                        piloto.rol = " Suplente";
                    }
                    piloto.propiedadJugador = this.nick;
                    this.misPilotos.push(piloto);
                    i++;
                }
            }
        } while (i < 2);
        localStorage.setItem("pilotos", JSON.stringify(pilotos));
    }

    asignarRivales() {
        let bot1 = crearBot(1);
        let bot2 = crearBot(2);

        this.rivales = [bot1, bot2];
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
    usuarios = [
        new Usuario("adm", "adm", "admin@dom.es", "adm", "123456", [], []),
    ];
}
