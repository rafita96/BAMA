var express = require('express');
var router = express.Router();
var path = require("path");

var userManager = require("./../controllers/usuarios");

router.use(function(req, res, next){
    if(req.path.match("/agregar") || req.path.match("/actual/") || req.session.pacienteId){
        return next();
    }else{
        return res.redirect('/');
    }
});

router.get('/perfil/', function(req, res){
    res.render('paciente/perfil');
});

router.post('/agregar/', function(req, res){
    userManager.agregar(req.body.data, function(error, message){
        if(error){
            req.flash('error', message);
            res.redirect('/');
        }else{
            req.flash('success', "El usuario se ha agregado éxitosamente.")
            res.redirect('/');
        }
    });
});

router.post('/actual', function(req, res){
    req.session.pacienteId = req.body.paciente;
    userManager.getUserInfo(req.body.paciente, function(data){
        if(data == null){
            res.status(200).jsonp({id: null});
        }else{
            res.status(200).jsonp(data);
        }
    });
});

router.get('/actual', function(req, res){
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

router.get('/evaluar', function(req, res){
    res.render('psicologo/evaluar');
});

router.post('/evaluar', function(req, res){
    userManager.evaluar(req.body.data, function(error){
        if(error){
            res.send('error');
        }else{
            res.render('paciente/perfil');
        }
    });
});

module.exports = router;