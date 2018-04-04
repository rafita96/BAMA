$(document).ready(function(){
    Consulta.get('/paciente/actual/', function(data){
        if(data["id"] != null){
            mostrarPerfil(data);
        }else{
            windows.href('/');
        }
    });
});