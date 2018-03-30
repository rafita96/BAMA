var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/agregar/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../../general/views/usuario/agregar.html'));
});

router.post('/paciente/actual', function(req, res){
    req.session.pacienteId = req.body.paciente;
    res.status(200).jsonp('ok');
});

router.get('/paciente/actual', function(req, res){
    if(req.session.pacienteId){
        res.status(200).jsonp({paciente: req.session.pacienteId});
    }else{
        res.status(403).jsonp({});
    }
});

module.exports = router;