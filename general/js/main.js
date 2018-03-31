var users = [];
var actual = null;
$(document).ready(function() {
     
    // Obtiene todos los pacientes registrados
    Consulta.get('/database/get/users/{}', function(data){
        users = data;
        fillTable(data); 
    });

    // Si ya eligio un usuario anteriormente, entonces muestra que ya fue
    // seleccionado
    Consulta.get('/usuarios/paciente/actual/', function(data){
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
    $("#buscar")[0].addEventListener("keydown", function(){
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
        b.indice = i;
        b.addEventListener('click', function(){
            var indice = this.indice;
            Consulta.post('/usuarios/paciente/actual/', {paciente: this.userId}, function(res){
                mostrarPerfil(users[indice]);
            });
            if(actual == null){
                actual = this;
                this.disabled = true;
            }else if(actual === this){
                // do nothing
            }else{
                actual.disabled = false;
                actual = this;
                this.disabled = true;
            }
        });
        b.innerHTML = "Seleccionar";
        cell.appendChild(b);
    }
}

// busca el paciente que cumpla en el criterio de busqueda
function buscar(texto){
    var encontrados = [];
    if(texto == ""){
        fillTable(users);
    }else{
        for(var i = 0; i < users.length; i++){
            if(users[i].nombre.includes(texto)){
                encontrados.push(users[i]);
            }
        }
        fillTable(encontrados);
    }
}

