/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/*
    Se encarga de las rutas de login y logout
*/
var express = require('express');
var router = express.Router();

var path = require("path");
// Manejador de la base de datos
var dbManager = require('./../controllers/database');

// Archivo de configuración en donde se encuentra
// el nombre de la collección en donde se encuentran los administradores
var generalConf = require('./../conf');
var adminConf = generalConf.conf["session"];

// Permite cifrar la contraseña para luego compararla
var crypto = require('crypto');

var ObjectID = require('mongodb').ObjectID;

// Cifra la contraseña
function encrypt(text){
  var cipher = crypto.createCipher(adminConf["algorithm"], adminConf["secret"])
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

// Vista del login
router.get('/login/', function(req, res) {
    res.render('seguridad/login', {
        error: req.flash('error')
    });
});

// Cuando se envían las credenciales de login
router.post('/login/', function(req, res) {

    // Consulta por el usuario
    dbManager.find(adminConf["collection"], {username: req.body.username},
        function(users){
            if(users.length == 0){
                // Cuando el nombre del usuario no se encuentra en la base de datos
                req.flash('error', 'Usuario o contraseña incorrectos');
                res.redirect('/login/');
            }else{
                let compare = encrypt(req.body.password);
                if(compare == users[0]["password"]){
                    // Si las contraseñas coinciden entonces registramos el id del
                    // administrador en la variable de sesión
                    req.flash('success', 'Bienvenido');
                    req.session.userId = users[0]["_id"];
                    req.session.username = users[0]['username'];
                    req.session.role = users[0]['role'];

                    if(generalConf.roles["ROLE_PACIENTE"] == users[0]['role']){
                        dbManager.find("users", {noExpediente: req.body.username},
                            function(users){
                                if(users.length != 0){
                                    req.session.pacienteId = users[0]._id;
                                    res.redirect('/paciente/perfil');
                                }
                            });
                    }else{
                    // Y lo enviamos a la página principal
                        res.redirect('/');
                    }
                }else{
                    // La contraseña no es correcta
                    req.flash('error', 'Usuario o contraseña incorrectos');
                    // Entonces lo regresamos a la vista de login
                    res.redirect('/login/');
                }
            }
        });
});

router.get('/administradores', function(req, res) {
    // Consulta por el usuario
    dbManager.find(adminConf["collection"], { }, function(users){
        res.render('seguridad/administradores/lista', {
            'titulo': 'Terapeutas',
            'users': users,
            'username' : req.session.username
        });
    });
});

router.get('/administradores/registrar', function(req, res) {
    res.render('seguridad/administradores/registrar', {
        'titulo': 'Registrar administrador'
    });
});

router.post('/administradores/registrar', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var role = generalConf.roles["ROLE_PSI"];

    dbManager.find(adminConf["collection"], { 'username': username }, function(users){
        if (users.length > 0) {
            res.render('seguridad/administradores/registrar', {
                titulo: 'Registrar administrador',
                error: 'El usuario ' + username + ' ya existe'
            });
        } else {
            dbManager.insertar(adminConf["collection"], {
                username: username,
                password: encrypt(password),
                role: role
            }, function() {
                res.redirect('/administradores')
            });
        }
    });
});

router.post('/administradores/borrar/:admin', function(req, res) {
    dbManager.eliminar(adminConf['collection'], { '_id': new ObjectID(req.params.admin) }, function() {
        res.redirect('/administradores')
    });
});

// Elimina la variable de sesión para que no pueda seguir entrando al sistema
router.get('/logout/', function(req, res){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                res.send(err);
            }else{
                // Como no hay error lo enviamos a la vista del login
                res.redirect('/login/');
            }
        });
    }
});

module.exports = router;
