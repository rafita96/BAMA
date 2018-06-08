/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/*
    Conttrolador de los juegos
*/
// Permite acceder al sistema de archivos
var fileManager = require('fs');
// Puede entrar de forma sincrona al sistema de archivos
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

// función que pregunta si la ruta es un directorio
const isDirectory = source => lstatSync(source).isDirectory();
// función que obtiene todos los directorios de una ruta
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory);

/*
*   Regresa la lista de juegos con su nombre, imágen y directorio.
*
*   @param  {function}  callback    - Función que es llamada cuando se consigue toda la 
*                                   información de los juegos
*/
exports.getJuegos = function(callback) {
    // Obtiene la lista de juegos en el directorio juegos
    var dirs = getDirectories("./juegos/");
    // Organiza los juegos por categoría
    // L: lenguaje, O: Orientación, C: Cálculo, M: Memoria, P: Praxias
    var info = {
        L: [],
        O: [],
        C: [],
        M: [],
        P: []
    };
    // Para cada juego en el directorio de juegos
    for(var i = 0; i < dirs.length; i++){
        // Se lee el archivo meta que contiene el nombre de juego
        // y el nombre de la imágen representativa del juego
        var meta = JSON.parse((fileManager.readFileSync(dirs[i]+"/meta.json")));

        // Un juego puede tener más de una categoría, por eso lo metemos 
        // varias veces
        for(var j = 0; j < meta.categorias.length; j++){
            // En la categoría correspondiente
            // metemos el nombre del juego, imágen y nombre del directorio
            info[meta.categorias[j]].push({
                nombre: meta.nombre, 
                img: meta.img,
                dir: dirs[i]
            });
        }
    }
    // Se llama la función de callback y se le envían los juegos
    callback(info);
}