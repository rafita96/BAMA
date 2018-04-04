var users = [];
$(document).ready(function() {
    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',
        disableTouchKeyboard: true,
        language: 'es'
    });
    // Obtiene todos los pacientes registrados
    Consulta.get('/database/get/users/{}', function(data){
        users = data;
        fillTable(data); 
    });

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
    var tabla = document.getElementById('pacientes').getElementsByTagName('tbody')[0];
    $(tabla).empty();
    for(var i = 0; i < data.length; i++){
        var row = tabla.insertRow(tabla.rows.length);

        var cell = row.insertCell(0);
        var text = document.createTextNode(data[i].nombre.capitalize());
        cell.appendChild(text);

        cell = row.insertCell(1);
        text = document.createTextNode(data[i].aPaterno.capitalize());
        cell.appendChild(text);

        cell = row.insertCell(2);
        text = document.createTextNode(data[i].aMaterno.capitalize());
        cell.appendChild(text);

        cell = row.insertCell(3);
        var b = document.createElement('button');
        b.setAttribute('class', 'btn btn-primary');

        b.userId = data[i]._id;
        b.addEventListener('click', function(){
            Consulta.post('/paciente/actual/', {paciente: this.userId}, function(res){
                window.location.href = '/paciente/perfil/';
            });
        });
        b.innerHTML = "Seleccionar";
        cell.appendChild(b);
    }
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
                users[i].aMaterno.includes(texto));
            }

            if(candidato){
                encontrados.push(users[i]);
            }
        }
        fillTable(encontrados);
    }
}

