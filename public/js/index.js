// var users = [];
$(document).ready(function() {

    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        disableTouchKeyboard: true,
        language: 'es'
    });
    // Obtiene todos los pacientes registrados
    // Consulta.get('/database/get/users/{}', function(data){
    //     users = data;
    fillTable(users); 
    // });

    // Si ya eligio un usuario anteriormente, entonces muestra que ya fue
    // seleccionado
    Consulta.get('/paciente/actual/', function(data){
        if(data["id"] != null){
            mostrarPerfil(data);
        }
    });

    // Antes de que se envie el formulario de registro de un paciente
    // se convierte todo a minusculas para que se guarde en la base de datos.
    $( "#guardar" ).click(function() {
        $("form#target :input").each(function(){
            this.value = this.value.toLowerCase();;
        });
        $( "#target" ).submit();
    });

    // Cuando se escribe algo en la barra de busqueda se busca el paciente
    // que cumpla con el criterio de busqueda
    $("#buscar")[0].addEventListener("keyup", function(){
        buscar(this.value);
    });
});

// Dada una lista de pacientes, vacia y llena una tabla escribiendo sus nombres
function fillTable(data){
    var tabla = document.getElementById('pacientes');
    $(tabla).empty();
    for(var i = 0; i < data.length; i++){
        var row = document.createElement("div");
        row.setAttribute("class","row text-center border-bottom my-3");

        var cell = document.createElement("div");
        cell.setAttribute("class", "col-2 offset-1");

        var text = document.createTextNode(data[i].noExpediente);
        cell.appendChild(text);
        row.appendChild(cell);

        var cell = document.createElement("div");
        cell.setAttribute("class", "col-2");

        text = document.createTextNode(data[i].nombre.capitalize());
        cell.appendChild(text);
        row.appendChild(cell);

        var cell = document.createElement("div");
        cell.setAttribute("class", "col-2");
        text = document.createTextNode(data[i].aPaterno.capitalize());
        cell.appendChild(text);
        row.appendChild(cell);

        var cell = document.createElement("div");
        cell.setAttribute("class", "col-2");
        text = document.createTextNode(data[i].aMaterno.capitalize());
        cell.appendChild(text);
        row.appendChild(cell);

        var cell = document.createElement("div");
        cell.setAttribute("class", "col-2");
        var b = document.createElement('button');
        b.setAttribute('class', 'btn btn-principal');

        b.userId = data[i]._id;
        b.addEventListener('click', function(){
            Consulta.post('/paciente/actual/', {paciente: this.userId}, function(res){
                window.location.href = '/paciente/perfil/';
            });
        });
        b.innerHTML = "Seleccionar";
        cell.appendChild(b);
        row.appendChild(cell);

        tabla.appendChild(row);
    }
}

function seleccionarPaciente(id){
    Consulta.post('/paciente/actual/', {paciente: id}, function(res){
        window.location.href = '/paciente/perfil/';
    });
}

// busca el paciente que cumpla en el criterio de busqueda
function buscar(criterio){

    if(criterio == ""){
        fillTable(users);
    }else{
        criterio = criterio.split(" ");
        var encontrados = [];

        for(var i = 0; i < users.length; i++){
            var candidato = true;
            for(j in criterio){
                var texto = criterio[j].toLowerCase();
                candidato = candidato && (users[i].nombre.includes(texto) || 
                users[i].aPaterno.includes(texto) ||
                users[i].aMaterno.includes(texto) ||
                users[i].noExpediente.includes(texto));
            }

            if(candidato){
                encontrados.push(users[i]);
            }
        }
        fillTable(encontrados);
    }
}

