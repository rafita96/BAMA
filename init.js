/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/**
    Inserta en la base de datos un usuario administrador
*/
var crypto = require('crypto');         // Permite cifrar la contraseña
// Archivo local que contiene la información de la cuenta de administrador
var appConfig = require('./src/conf').conf;
// El manejador de la base de datos.
var dbManager = require('./src/controllers/database');

/* Cifra las contraseñas */
function encrypt(text){
  var cipher = crypto.createCipher(appConfig["session"]["algorithm"], appConfig["session"]["secret"])
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

/*
    Registra cada usuario predefinido a la base de datos
*/
for (var i = 0; i < appConfig.users.length; i++) {
    var usr = appConfig.users[i];

    // Se cifra la contraseña.
    var hash = encrypt(usr["password"]);

    // Busca en la base de datos si el usuario ya existe,
    // Si no existe entonces lo inserta en la collección, sino entonces
    // no hace algo.
    dbManager.find(appConfig["session"]["collection"],
                    {username: usr["username"]}, 
                        function (res) {
                            if(res.length == 0){
                                dbManager.insertar(appConfig["session"]["collection"],
                                    {
                                        username: usr["username"],
                                        password: hash,
                                        role: usr["role"]
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
}


