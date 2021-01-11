const express = require('express');
var router = express.Router();

var pacient = require('./pacient');
var security = require('./security');

router.use('/pacients', pacient);
router.use('/', security);

router.use('/', function(req, res){
	res.jsonp({status: 200, message: "Servidor listo."});
});

module.exports = router;

