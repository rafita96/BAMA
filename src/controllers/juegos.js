var fileManager = require('fs');
const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source =>
  readdirSync(source).map(name => join(source, name)).filter(isDirectory);


exports.getJuegos = function(callback) {
    var dirs = getDirectories("./juegos/");
    var info = {
        L: [],
        O: [],
        C: [],
        M: [],
        P: []
    };
    for(var i = 0; i < dirs.length; i++){
        var meta = JSON.parse((fileManager.readFileSync(dirs[i]+"/meta.json")));
        for(var j = 0; j < meta.categorias.length; j++){
            info[meta.categorias[j]].push({
                nombre: meta.nombre,
                img: meta.img,
                dir: dirs[i]
            });
        }
    }
    callback(info);
}