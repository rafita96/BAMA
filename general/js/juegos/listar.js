function bloque(data, bigPapa){
    var div = document.createElement('div');
    div.setAttribute("class", "col-2")

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

function showGames(div, juegos){
    for(var i = 0; i < juegos.length; i++){
        bloque(juegos[i], div);
    }
}

function createBigPapa(texto){
    var bigPapa = document.createElement("div");
    bigPapa.setAttribute("class", "bg-dark text-white p-2 m-3 rounded")

    var fondo = document.createElement("div");
    fondo.setAttribute("class", "text-center p-2");

    var titulo = document.createElement("h3");
    titulo.innerHTML = texto;

    fondo.appendChild(titulo);
    bigPapa.appendChild(fondo);
    return bigPapa;
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
        var divJuegos = document.getElementById('juegos');
        // Primero orientacion
        if(juegos["O"].length != 0){
            var div = createBigPapa("Orientación");
            showGames(div, juegos["O"])
            divJuegos.appendChild(div);
        }

        // Lenguaje
        if(juegos["L"].length != 0){
            var div = createBigPapa("Lenguaje");
            showGames(div, juegos["L"])
            divJuegos.appendChild(div);
        }

        // Praxias
        if(juegos["P"].length != 0){
            var div = createBigPapa("Praxias");
            showGames(div, juegos["P"])
            divJuegos.appendChild(div);
        }

        // Memoria
        if(juegos["M"].length != 0){
            var div = createBigPapa("Memoria");
            showGames(div, juegos["M"])
            divJuegos.appendChild(div);
        }

        // Calculo
        if(juegos["C"].length != 0){
            var div = createBigPapa("Cálculo");
            showGames(div, juegos["C"])
            divJuegos.appendChild(div);
        }
    });
});