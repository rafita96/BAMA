function bloque(data){
    var bigPapa = $("#juegos")[0];
    var div = document.createElement('div');
    div.setAttribute('class', 'col-2');

    var img = document.createElement('img');
    img.src = "/"+data["dir"]+"/"+data["img"];

    div.appendChild(img);
    var text = document.createElement('h4');
    text.setAttribute("class", 'text-center');

    var a = document.createElement('a');
    a.href = "/"+data["dir"]+"/";
    a.innerHTML = data["nombre"];

    text.appendChild(a);

    div.appendChild(text);

    bigPapa.appendChild(div);
}

$(document).ready(function() {
    // Si ya eligio un usuario anteriormente, entonces muestra que ya fue
    // seleccionado
    Consulta.get('/paciente/actual/', function(data){
        if(data["id"] != null){
            mostrarPerfil(data);
        }
    });

    Consulta.get('/juegos/todos/los/nombres', function(data){
        var juegos = data["juegos"];
        for(var i = 0; i < juegos.length; i++){
            bloque(juegos[i]);
        }
    });
});