export function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i >= 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function choice(a){
    return a[Math.random() * a.length | 0];
}

/**
 * Verifica que la respuesta sea correcta.
 * @param int 	   nivel     Indice del nivel de dificultad
 * @param int      pregunta  Indice de la pregunta dentro del nivel
 * @param array    respuesta Respuesta a comparar
 */
export function Responder(config, nivel, pregunta, respuesta) {
	let resp = config[nivel][pregunta]["respuesta"];
	resp.sort();
	respuesta.sort();
	//en vez de que sea una secuencia solo se comparará la respuesta con la correcta
	//sort se utiliza para ordenar el conjunto de letras por lo tanto para hacerla individual
	//se va a retirar esto

	return JSON.stringify(resp) == JSON.stringify(respuesta);
}

export function degreesToRadians(degree){
    return degree*Math.PI/180;
}