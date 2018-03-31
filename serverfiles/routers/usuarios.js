var express = require('express');
var router = express.Router();
var path = require("path");

var userManager = require("./../controllers/usuarios");

router.get('/agregar/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../../general/views/usuario/agregar.html'));
});

router.post('/paciente/actual', function(req, res){
    req.session.pacienteId = req.body.paciente;
    userManager.getUserInfo(req.body.paciente, function(data){
        if(data == null){
            res.status(200).jsonp({id: null});
        }else{
            res.status(200).jsonp(data);
        }
    });
});

router.get('/paciente/actual', function(req, res){
    if(req.session.pacienteId){
        userManager.getUserInfo(req.session.pacienteId, function(data){
            if(data == null){
                res.status(200).jsonp({id: null});
            }else{
                res.status(200).jsonp(data);
            }
        });
    }else{
        res.status(200).jsonp({id: null});
    }
});

module.exports = router;