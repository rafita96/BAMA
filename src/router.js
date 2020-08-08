/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

var express = require('express');   // Se encarga de leer los encabezados http
var router = express.Router();      // va a estar al pendiente de una ruta

// Los routers de cada módulo
var security = require('./routers/security');
var juegos = require('./routers/juegos');
var usuarios = require('./routers/usuarios');

var dbManager = require('./controllers/database');

var roles = require('./conf').roles;

router.get('/', function(req, res){

	if(req.session.role == roles["ROLE_PACIENTE"]){
		res.redirect('/paciente/perfil');
	}else{
	    var users = dbManager.find('users',{}, function(data){
	        res.render('index', {
	            success: req.flash('success'), 
	            error: req.flash('error'), 
	            titulo: "Pacientes",
	            pacientes: data
	        });
	    });
	}

});

/** Manejo de sesion **/
router.use('/', security);
/**  **/

/** Manejo de usuarios **/
router.use('/paciente', usuarios);
/**  **/

/** Url para los juegos **/
router.use('/juegos', juegos);
/**  **/

module.exports = router;