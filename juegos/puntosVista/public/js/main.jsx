function getInfo(callback){
    d3.json("./data/info.json", function(error, instrucciones){
        d3.json("./meta.json", function(error, nombre){
            callback(nombre["nombre"], instrucciones);
        });
    });
}

$(document).ready(function(){
    Consulta.get('/paciente/actual/', function(data){
        if(data["id"] != null){
            mostrarPerfil(data);
            getInfo(function(nombre, instrucciones){

                ReactDOM.render(<Main
                    paciente={data["id"]}  
                    nombre={nombre} 
                    instrucciones={instrucciones["instrucciones"]}
                    parte2={instrucciones["parte2"]} />, document.getElementById('main'));
            });
        }else{
            toastr("No has seleccionado un paciente");
        }
    });
}); 