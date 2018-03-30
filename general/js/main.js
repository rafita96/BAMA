var users = [];
$(document).ready(function() {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    Consulta.get('/database/get/users/{}', function(data){
        users = data;
        fillTable(data); 
    });

    $( "#guardar" ).click(function() {
        $("form#target :input").each(function(){
            this.value = this.value.toLowerCase();;
        });
        $( "#target" ).submit();
    });


    $("#buscar")[0].addEventListener("keydown", function(){
        buscar(this.value);
    });
});

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
            alert(this.userId);
        });
        b.innerHTML = "Seleccionar";
        cell.appendChild(b);
    }
}

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

