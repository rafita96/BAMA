// Sigue este!
function bloque(data){
    var div = document.createElement('div');
    div.setAttribute("class", "col-3")

    var img = document.createElement('img');
    img.src = "/"+data["dir"]+"/"+data["img"];

    div.appendChild(img);
    var text = document.createElement('h4');
    text.setAttribute("class", 'text-center');

    var a = document.createElement('a');
    a.setAttribute("class", "a-principal");
    a.href = "/"+data["dir"]+"/";
    a.innerHTML = data["nombre"];

    text.appendChild(a);

    div.appendChild(text);

    return div;
}

function showGames(div, juegos){
    for(var i = 0; i < juegos.length; i++){
        var juego = bloque(juegos[i]);
        div.append(juego);
    }
}

function createBigPapa(texto, juegos){
    var bigPapa = document.createElement("div");
    bigPapa.setAttribute("class", "card bg-principal text-white mt-3")

    var header = document.createElement("div");
    header.setAttribute("class", "card-header");

    var titulo = document.createElement("h3");
    titulo.setAttribute("class", "text-accent")
    titulo.innerHTML = texto;

    header.appendChild(titulo);
    bigPapa.appendChild(header);

    var cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    bigPapa.appendChild(cardBody);

    juegos.appendChild(bigPapa);

    return cardBody;
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
            var div = createBigPapa("Orientación", divJuegos);
            showGames(div, juegos["O"])
        }

        // Lenguaje
        if(juegos["L"].length != 0){
            var div = createBigPapa("Lenguaje", divJuegos);
            showGames(div, juegos["L"])
        }

        // Praxias
        if(juegos["P"].length != 0){
            var div = createBigPapa("Praxias", divJuegos);
            showGames(div, juegos["P"])
        }

        // Memoria
        if(juegos["M"].length != 0){
            var div = createBigPapa("Memoria", divJuegos);
            showGames(div, juegos["M"])
        }

        // Calculo
        if(juegos["C"].length != 0){
            var div = createBigPapa("Cálculo", divJuegos);
            showGames(div, juegos["C"])
        }
    });
});