var dbManager = require('./database');
var ObjectId = require('mongodb').ObjectId; 

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
        problema:data.problema,
        subjetivo:data.subjetivo,
        objetivo:data.objetivo,
        analisis:data.analisis,
        plan:data.plan
    };
    dbManager.insertar('notas', info, function(error){
        callback(error);
    });
}