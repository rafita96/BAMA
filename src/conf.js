/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/*
    En la parte de database se encuentra el nombre de la base de datos 'volveraempezar', 
    el host 'localhost' y el puerto '27017'.
    En la parte de session se encuentra el nombre de usuario 'admin', la contraseña 'psicologo', 
    la colección en donde se almacenan los administradores en la base de datos 'admins' y 
    el número de 'vueltas' que tiene que hacer el algoritmo de cifrado de contraseñas.

    Estos datos se pueden cambiar dependiendo del nombre de usuario y contraseña que se desee, 
    así como se pueden modificar los parámetros de la base de datos.
*/

// Permite cifrar la contraseña para luego compararla
var crypto = require('crypto');

var roles = {
    ROLE_ADMIN: 0,
    ROLE_PSI: 1,
    ROLE_PACIENTE: 2
}

var conf = {
    database: {
        name: 'volveraempezar',
        host: 'localhost',
        port: '27017'
    },

    session:{
        saltRounds: 10,
        collection: "admins",
        algorithm: 'aes-256-ctr',
        secret: 'volveraempezar'
    },

    users: [
        {
            username: "admin",
            password: "psicologo",
            role: roles["ROLE_ADMIN"]
        }
    ]
};

exports.encrypt = function (text){
  var cipher = crypto.createCipher(conf["session"]["algorithm"], conf["session"]["secret"])
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.roles = roles;
exports.conf = conf;