// Muestra el nombre del paciente actual
function mostrarPerfil(usuario){
    $("#paciente_actual").text(usuario["nombre"].capitalize()+" "+
                                usuario["aPaterno"].capitalize()+" "+
                                usuario["aMaterno"].capitalize());
}

function getPacienteActual(callback){

    Consulta.get('/paciente/actual/', function(data){
        if(data["id"] != null){
            callback(data);
        }else{
            callback(null);
        }
    });
}