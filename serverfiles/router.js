var express = require('express');
var router = express.Router();

var security = require('./routers/security');
var database = require('./routers/database');
var juegos = require('./routers/juegos');
var usuarios = require('./routers/usuarios');

/** Manejo de sesion **/
router.use('/', security);
/**  **/

/** Manejo de usuarios **/
router.use('/paciente', usuarios);
/**  **/

/** Url para los juegos **/
router.use('/juegos', juegos);
/**  **/

/** Manejo de base de datos **/
router.use('/database', database);
/**  **/

module.exports = router;