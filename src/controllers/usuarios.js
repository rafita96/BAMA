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

exports.evaluar = function(data, callback){
    var info = {
        terapeuta:data.terapeuta,
        diagnostico:data.diagnostico,
        plan:data.plan
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

function getPromedio(data){
    var suma = 0;
    var total = 0;
    for(var j = 0; j < data.length; j++){
        for(var i = 0; i < data[j]["record"].length; i++){
            suma += data[j]["record"][i]["porcentaje"];
            total++;
        }
    }

    if(total != 0){
        suma = suma/total;
    }

    return suma;
}

function findRecord(id, callback){
    var record = {};
    dbManager.find("juegos", {paciente: id, categorias: "O"}, function(orientacion){
        record["O"] = getPromedio(orientacion);
        dbManager.find("juegos", {paciente: id, categorias: "L"}, function(lenguaje){
            record["L"] = getPromedio(lenguaje);
            dbManager.find("juegos", {paciente: id, categorias: "M"}, function(memoria){
                record["M"] = getPromedio(memoria);
                dbManager.find("juegos", {paciente: id, categorias: "C"}, function(calculo){
                    record["C"] = getPromedio(calculo);
                    dbManager.find("juegos", {paciente: id, categorias: "P"}, function(praxias){
                        record["P"] = getPromedio(praxias);
                        callback(record);
                    });
                });
            });
        });
    });
}