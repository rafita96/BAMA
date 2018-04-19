import Main, {init} from './Main.jsx';

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
                init(data["id"], nombre, instrucciones);
            });
        }else{
            toastr("No has seleccionado un paciente");
        }
    });
}); 