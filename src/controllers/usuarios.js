/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/*
    Controlador de pacientes
*/
var dbManager = require('./database');      // Administrador de la base de datos
var path = require("path");
var ObjectId = require('mongodb').ObjectId;     // Permite buscar en la base de datos por ID
var fs = require('fs');

// Informacion para insertar en base de datos
var generalConf = require('./../conf');
var adminConf = generalConf.conf["session"];

/** 
*   Regresa la información del paciente
*
*   @param  {string}    id          - Identificar de la base de datos del paciente
*   @param  {function}  callback    - Función que recibe la información del paciente
*/
exports.getUserInfo = function(id, callback){
    // Busca en la base de datos el paciente
    dbManager.find("users", {_id: new ObjectId(id)}, function(data){
        // Si la encontró un paciente con el id, entonces
        if(data.length != 0){
            // Crea un objeto JSON con la información del paciente.
            var info = {
                id: data[0]["_id"],         // id de la base de datos
                nombre: data[0]["nombre"],      // Nombre del paciente
                aPaterno: data[0]["aPaterno"],  // Apellido paterno del paciente
                aMaterno: data[0]["aMaterno"],  // Apellido materno del paciente
                noExpediente: data[0]["noExpediente"],  // Número de expediente del paciente
                fechaNacimiento: data[0]["fechaNacimiento"] // Fecha de nacimiento del paciente (dd/mm/yyyy)
            };
            
            // Regresa el objeto a una función
            callback(info);
        }else{
            // Si no encuentra un paciente con ese id, entonces regresa null
            callback(null);
        }

    }); 
}

/**
*   Agrega un paciente a la base de datos
*
*   @param  {json}      data        - Objeto JSON con el nombre, aPaterno, aMaterno, fechaNacimiento
*                                   y noExpediente 
*   @param  {function}  callback    - función que verifica si el paciente fue guardado con éxito.   
*/
exports.agregar = function(data, callback){ 
    // Hace una busqueda en la base de datos para ver si existe un paciente con
    // ese mismo número de expediente.
    dbManager.find('users', {noExpediente: data.noExpediente}, function(consulta){
        dbManager.find(adminConf["collection"], {username: data.noExpediente}, function(consulta2){
            // Si no encuentra un paciente con el mismo número, entonces lo agrega
            if(consulta.length == 0 && consulta2.length == 0){
                // Se crea el objeto json con la información que debe contener un paciente
                // Esto se hace para evitar guardar información extra
                var info = {
                    nombre: data.nombre,    // Nombre del paciente
                    aPaterno: data.aPaterno,    // Apellido paterno del paciente
                    aMaterno: data.aMaterno,    // Apellido materno del paciente
                    fechaNacimiento: data.fechaNacimiento,  // Fecha de nacimiento del paciente (dd/mm/yyyy)
                    noExpediente: data.noExpediente     // Número de expediente del paciente
                };
                // Después lo guarda en la base de datos
                dbManager.insertar('users', info, function(error){
                    // Y si hay algún error entonces se notifica en la función de callback
                    if(error){
                        callback(error, "Error al insertar");
                    }else{

                        var userData = {
                            username: data.noExpediente,
                            password: generalConf.encrypt(""),
                            role: generalConf.roles["ROLE_PACIENTE"]
                        }
                        // Después registra el usuario
                        dbManager.insertar(adminConf["collection"], userData, function(error){
                            // Y si hay algún error entonces se notifica en la función de callback
                            if(error){
                                callback(error, "Error al insertar");
                            }else{
                                // Como no hay error entonces se envía false
                                callback(false);
                            }

                        });
                    }

                });

            }else{
                // Como encontró un paciente con el mismo número entonces envía un error
                callback(true, "Ese expediente ya está registrado.");
            }
        });
    });
}

/**
*   Edita la información de un paciente
*   
*   @param  {string}    id          - Identificador de la base de datos del paciente
*   @param  {json}      data        - Objeto json con la información nueva del paciente:
*                                   nombre, aPaterno, aMaterno, fechaNacimiento y noExpediente
*   @param  {function}  callback    - Función que se le avisa si hubo un error o no.                             
*/
exports.editar = function(id, data, callback){
    // Hace una busqueda en la base de datos para ver si existe un paciente con
    // ese mismo número de expediente.
    dbManager.find('users', { $and: [ 
                                { 
                                    noExpediente: data.noExpediente
                                }, 
                                { 
                                    _id: { $ne: new ObjectId(id) }
                                }
                                ]
                            }, function(consulta){
        // Si no lo encuentra lo actualiza
        if(consulta.length == 0){
            // Se crea el objeto json con la información que debe contener un paciente
            // Esto se hace para evitar guardar información extra
            var info = {
                nombre: data.nombre,    // Nombre del paciente
                aPaterno: data.aPaterno,    // Apellido paterno del paciente
                aMaterno: data.aMaterno,    // Apellido materno del paciente
                fechaNacimiento: data.fechaNacimiento  // Fecha de nacimiento del paciente (dd/mm/yyyy)
            };
            // Busca el paciente con el id correspondiente en la base de datos y lo
            // actualiza de acuerdo a la información.
            dbManager.actualizar('users',{_id: new ObjectId(id)}, info, function(error){
                // Avisa a la función que ya termino
                callback(error);
            });
        }else{
            // Como encontró un paciente con el mismo número entonces envía un error
            callback(true, "Ese expediente ya está registrado.");
        }
    });
}

/**
*   Agrega una nueva nota clínica a la base de datos
*   
*   @param  {string}    id          - Identificador del paciente en la base de datos.
*   @param  {json}      data        - Información que va a contener la nota clínica:
*                                   terapeuta, objetivo, subjetivo, diagnostico y plan.
*   @param  {function}  callback    - Función que se llama para avisar que ya termino.
*/
exports.evaluar = function(id, data, callback){
    // Se crea el objeto json con la información que debe contener una nota clínica
    // Esto se hace para evitar guardar información extra
    var info = {
        paciente: new ObjectId(id),     // Id de la base de datos correspondiente al paciente
        terapeuta:data.terapeuta,   // Nombre del paciente
        objetivo: data.objetivo,    // Diagnóstico objetivo
        subjetivo: data.subjetivo,  // Diagnóstico subjetivo
        diagnostico:data.diagnostico,   // Diagnóstico general
        plan:data.plan,     // Plan de tratamiento para la siguiente sesión
        fecha: new Date()
    };
    // Inserta en la base de datos
    dbManager.insertar('notas', info, function(error){
        // Avisa a la función que ya termino
        callback(error);
    });
}

/**
*   Busca las notas correspondientes a un paciente
*   
*   @param  {string}    id          - Identificador del paciente en la base de datos
*   @param  {function}  callback    - Función a la que se le envían las notas
*/
exports.getNotas = function(id, callback){
    // Busca en la base de datos la nota con el paciente correspondiente al id
    dbManager.find("notas", {paciente: new ObjectId(id)}, function(notas){
        // Envía las notas encontradas a la función de callback
        callback(notas);
    });
}

/**
*   Cuando un paciente termina un juego se debe registrar el resultado en la
*   base de datos
*
*   @param  {json}      data        - Objeto json con los resultados del juego:
*                                   paciente, juego, nivel, porcentaje, fechaInicio, fechaFin.
*   @param  {function}  callback    - Función que avisa que el resultado ya fue guardado.
*/
exports.registrarAvance = function(data, callback){
    // Busca en la base de datos en la colección 'juegos' si el paciente ya había tenido 
    // registrado un resultado en el juego.
    dbManager.find("juegos", {paciente: new ObjectId(data["paciente"]), juego: data["juego"]}, function(res){
        // Si es la primera vez que juega el juego
        if(res.length == 0){
            // Se identifica el archivo 'meta.json' que contiene las categorías a las que pertenece
            // el juego
            var fileDir = path.join(__dirname,'/../../juegos/'+data["juego"]+'/meta.json');
            
            // Lee el archivo 'meta.json'
            fs.readFile(fileDir, function (err, meta) {
                if (err) throw err;
                // Obtiene las categorías del archivo
                var categorias = JSON.parse(meta)["categorias"];

                // Construye la información que contiene el registro de resultados por primera vez
                info = {
                    paciente: new ObjectId(data["paciente"]),   // Id del paciente correspondiente a la base de datos     
                    juego: data["juego"],   // Nombre del juego (el nombre que tiene la carpeta)
                    categorias: categorias, // Categorías a las que pertenece el juego
                    record: [
                            {
                                nivel: data["nivel"],   // El nivel del juego en el que se obtuvieron los resultados
                                porcentaje: data["porcentaje"],     // Porcentaje de aciertos
                                fechaInicio: data["fechaInicio"],   // Fecha en que empezó el juego (formato por defecto al usar new Date())
                                fechaFin: data["fechaFin"]  // Fecha en que termino el juego (formato por defecto al usar new Date())
                            }
                        ]
                };

                // Inserta el resultado en la base de datos
                dbManager.insertar("juegos", info, function(error){
                    // Avisa a la función que ya termino
                    callback(error);
                });
            });
        }else{
            // Como el paciente ya ha jugado el juego anteriormente, agrega un nuevo elemento.
            var record = res[0]["record"];
            record.push({
                nivel: data["nivel"],       // Nivel del juego en que se obtuvieron los resultados
                porcentaje: data["porcentaje"],     // Porcentaje de aciertos
                fechaInicio: data["fechaInicio"],   // Fecha en que empezó el juego (formato por defecto al usar new Date())
                fechaFin: data["fechaFin"]  // Fecha en que termino el juego (formato por defecto al usar new Date())
            });

            // Agrega un resultado nuevo al registro que anteriormente se había creado
            dbManager.actualizar("juegos", {paciente: new ObjectId(data["paciente"]), juego: data["juego"]}, {record: record}, function(error){
                // Avisa a la función que ya termino
                callback(error);
            })
        }
    });
}

/**
*   Cálcula el porcentaje de aciertos en cada categoría
*
*   @param  {string}    id          - Identificador de la base de datos correspondiente al paciente
*   @param  {function}  callback    - Función a la que se le regresa la información.
*/
exports.getRecord = function(id, callback){
    // Categorías existentes [promedio, cantidad de juegos]
    var record = {  
        "O": [0,0],     // Orientación
        "L": [0,0],     // Lenguaje
        "P": [0,0],     // Praxias
        "C": [0,0],     // Cálculo
        "M": [0,0]      // Memoria
    };

    // Busca en la colección de juegos los registros correspondientes al paciente
    dbManager.find("juegos", {paciente: new ObjectId(id)}, function(juegos){
        // Para cada juego diferente que haya juegado el paciente
        for(var i = 0; i < juegos.length; i++){
            // Se calcula el promedio de aciertos en el juego
            var promedio = getPromedio(juegos[i]["record"]);

            // Para cada categoría del juego
            for(var j = 0; j < juegos[i]["categorias"].length; j++){
                // Suma el promedio anterior de la categoría correspondiente
                record[juegos[i]["categorias"][j]][0] += promedio;
                // Aumenta en 1 la cantidad de juegos con esa categoría
                record[juegos[i]["categorias"][j]][1] += 1;
            }
        }

        var newRecord = {};
        // Cálcula el porcentaje global para cada categoría
        for(categoria in record){
            // Divide el promedio que suman todos los resultados de los juegos
            // con esa categoría y lo divide sobre el número de juegos con esa categoría
            if(record[categoria][1] == 0){
                newRecord[categoria] = 0;
            }else{
                newRecord[categoria] = record[categoria][0]/record[categoria][1];
            }
        }

        // Envía los resultados generales de aciertos en cada categoría.
        callback(false, newRecord);
    });
    
}

/**
*   Cálcula el porcentaje de aciertos en un juego
*   
*   @param  {array} record  - lista de objetos json con los resultados en el juego
*/
function getPromedio(record){
    var promedio = 0;
    // Para cada resultado en el juego
    for(var j = 0; j < record.length; j++){
        // Se suma el porcentaje de aciertos de ese resultado
        promedio += record[j]["porcentaje"];
    }

    // Si el paciente tiene resultados del juego
    if(record.length != 0){
        // Entonces cálcula el promedio de aciertos dividiendo el total de porcentaje
        // de aciertos sobre el número de veces que ha jugado el juego.
        promedio /= record.length;
    }

    return promedio;
}