function getInfo(callback){
    d3.json("./data/info.json", function(error, instrucciones) {
        d3.json("./meta.json", function(error, nombre) {
            d3.json("./data/config.json", function(error, config) {
                Consulta.get('/paciente/actual/', function(data) {
                    if (data["id"] != null) {
                        mostrarPerfil(data);
                        callback(data["id"], nombre["nombre"], instrucciones["instrucciones"], config["niveles"]);
                    } else {
                        toastr("No has seleccionado un paciente");
                    }
                });
            });
        });
    });
}

$(document).ready(() => {
	getInfo((paciente, nombre, instrucciones) => {
		ReactDOM.render(<Game
			nombre={nombre}
			paciente={paciente}
            config={config}
			instrucciones={instrucciones}/>, document.getElementById('main'));
	})
});