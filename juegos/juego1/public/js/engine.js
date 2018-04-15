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

function Responder(nivel, pregunta, respuesta) {
	resp = config["niveles"][nivel][pregunta]["respuesta"];
	return resp == respuesta;
}