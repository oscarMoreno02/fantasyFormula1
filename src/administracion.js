import {pilotos, puntuaciones, grandesPremios} from './objetos';

const botonLanzarCarrera = document.getElementById("lanzar-carrera");

botonLanzarCarrera.addEventListener('click', function() {
    disputarGranPremio(grandesPremios);
});

function disputarGranPremio(grandesPremios) {
	for (var i = 0; i < grandesPremios.length; i++) {
		var granPremio = grandesPremios[i];
		if (!granPremio.disputado) {
			granPremio.posiciones = generarPosiciones(pilotos);
			granPremio.disputado = true;
			break; 
		}
	}
}

function generarPosiciones(pilotos) {
	var posiciones = [];
	var posicionesAsignadas = new Set();

	for (var i = 0; i < pilotos.length; i++) {
		var piloto = pilotos[i];
		var posicionAleatoria;

		do {
			posicionAleatoria = Math.floor(Math.random() * pilotos.length) + 1;
		} while (posicionesAsignadas.has(posicionAleatoria));

		posicionesAsignadas.add(posicionAleatoria);
		posiciones.push({ idPiloto: piloto.id, posicion: posicionAleatoria });
	}

	return posiciones;
}