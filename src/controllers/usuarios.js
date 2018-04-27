var dbManager = require('./database');
var path = require("path");
var ObjectId = require('mongodb').ObjectId; 
var fs = require('fs');

exports.getUserInfo = function(id, callback){
    dbManager.find("users", {_id: new ObjectId(id)}, function(data){
        if(data.length != 0){
            var info = {
                id: data[0]["_id"],
                nombre: data[0]["nombre"],
                aPaterno: data[0]["aPaterno"],
                aMaterno: data[0]["aMaterno"],
                noExpediente: data[0]["noExpediente"],
                fechaNacimiento: data[0]["fechaNacimiento"]
            };
            
            callback(info);
        }else{
            callback(null);
        }

    }); 
}

exports.agregar = function(data, callback){ 
    dbManager.find('users', {noExpediente: data.noExpediente}, function(consulta){
        var info = {
            nombre: data.nombre,
            aPaterno: data.aPaterno,
            aMaterno: data.aMaterno,
            fechaNacimiento: data.fechaNacimiento,
            noExpediente: data.noExpediente
        };

        if(consulta.length == 0){
            dbManager.insertar('users', info, function(error){
                if(error){
                    callback(error, "Error al insertar");
                }else{
                    callback(false);
                }
            });
        }else{
            callback(true, "Ese expediente ya está registrado.");
        }
    });
}

exports.evaluar = function(id, data, callback){
    var info = {
        paciente: id,
        terapeuta:data.terapeuta,
        objetivo: data.objetivo,
        subjetivo: data.subjetivo,
        diagnostico:data.diagnostico,
        plan:data.plan,
        fecha: new Date()
    };
    dbManager.insertar('notas', info, function(error){
        callback(error);
    });
}

exports.editar = function(id, data, callback){
    var info = {
        nombre: data.nombre,
        aPaterno: data.aPaterno,
        aMaterno: data.aMaterno,
        fechaNacimiento: data.fechaNacimiento,
        noExpediente: data.noExpediente
    };
    dbManager.actualizar('users',{_id: new ObjectId(id)}, info, function(error){
        callback(error);
    });
}

exports.registrarAvance = function(data, callback){
    dbManager.find("juegos", {paciente: data["paciente"], juego: data["juego"]}, function(res){
        if(res.length == 0){
            console.log("no existe");
            var fileDir = path.join(__dirname,'/../../juegos/'+data["juego"]+'/meta.json');
            
            fs.readFile(fileDir, function (err, meta) {
                if (err) throw err;
                var categorias = JSON.parse(meta)["categorias"];
                info = {
                    paciente: data["paciente"],
                    juego: data["juego"],
                    categorias: categorias,
                    record: [
                            {
                                nivel: data["nivel"],
                                porcentaje: data["porcentaje"],
                                fechaInicio: data["fechaInicio"],
                                fechaFin: data["fechaFin"]
                            }
                        ]
                };

                dbManager.insertar("juegos", info, function(error){
                    callback(error);
                });
            });
        }else{

            var record = res[0]["record"];
            record.push({
                nivel: data["nivel"],
                porcentaje: data["porcentaje"],
                fechaInicio: data["fechaInicio"],
                fechaFin: data["fechaFin"]
            });
            dbManager.actualizar("juegos", {paciente: data["paciente"], juego: data["juego"]}, {record: record}, function(error){
                callback(error);
            })
        }
    });
}

exports.getRecord = function(id, callback){
    // console.log("entra");
    findRecord(id, function(record){
        callback(false, record);
    });
}

function getPromedio(record){
    var promedio = 0;
    for(var j = 0; j < record.length; j++){
        promedio += record[j]["porcentaje"];
    }

    if(record.length != 0){
        promedio /= record.length;
    }

    return promedio;
}

function findRecord(id, callback){
    var record = {
        "O": [0,0],
        "L": [0,0],
        "P": [0,0],
        "C": [0,0],
        "M": [0,0]
    };
    dbManager.find("juegos", {paciente: id}, function(juegos){
        for(var i = 0; i < juegos.length; i++){
            var promedio = getPromedio(juegos[i]["record"]);


            for(var j = 0; j < juegos[i]["categorias"].length; j++){
                record[juegos[i]["categorias"][j]][0] += promedio;
                record[juegos[i]["categorias"][j]][1] += 1;
            }
        }

        var newRecord = {};
        for(categoria in record){
            newRecord[categoria] = record[categoria][0]/record[categoria][1];
        }

        callback(newRecord);
    });
}

exports.getNotas = function(id, callback){
    dbManager.find("notas", {paciente: id}, function(notas){
        callback(notas);
    });
}