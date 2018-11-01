var config;

var call = function(callback) {
	d3.json("./data/config.json", (error, data) => {
		if (error) {
			console.log(error);
		}
		config = data;
	});
}
call();

/**
 * Verifica que la respuesta sea correcta.
 * @param int 	   nivel     Indice del nivel de dificultad
 * @param int      pregunta  Indice de la pregunta dentro del nivel
 * @param array    respuesta Respuesta a comparar
 */
function Responder(nivel, pregunta, respuesta) {
	resp = config["niveles"][nivel][pregunta]["respuesta"];
	resp.sort();
	respuesta.sort();
	//en vez de que sea una secuencia solo se comparará la respuesta con la correcta
	//sort se utiliza para ordenar el conjunto de letras por lo tanto para hacerla individual
	//se va a retirar esto

	return JSON.stringify(resp) == JSON.stringify(respuesta);
}
