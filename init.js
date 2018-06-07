/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/**
    Inserta en la base de datos un usuario administrador
*/
var bcrypt = require('bcrypt');         // Permite cifrar la contraseña
// Archivo local que contiene la información de la cuenta de administrador
var appConfig = require('./src/conf').conf["session"];
// El manejador de la base de datos.
var dbManager = require('./src/controllers/database');

// Se cifra la contraseña.
var hash = bcrypt.hashSync(appConfig["password"], appConfig["saltRounds"]);

// Busca en la base de datos si el usuario ya existe,
// Si no existe entonces lo inserta en la collección, sino entonces
// no hace algo.
dbManager.find(appConfig["collection"],
                {username: appConfig["username"]}, 
                    function (res) {
                        if(res.length == 0){
                            dbManager.insertar(appConfig["collection"],
                                {
                                    username: appConfig["username"],
                                    password: hash
                                },

                            function(err){
                                if(err){
                                    console.log("Error")
                                }
                            }

                            );
                        }  
                    }
                );
