var express = require('express');
var router = express.Router();
var path = require("path");

var userManager = require("./../controllers/usuarios");

router.use(function(req, res, next){
    if(req.path.match("/agregar") || req.path.match("/actual/") || req.session.pacienteId){
        return next();
    }else{
        req.flash('error', 'No has seleccionado un paciente.');
        return res.redirect('/');
    }
});

router.get('/perfil/', function(req, res){
    res.render('paciente/perfil', {
        titulo: "Perfil", 
        error: req.flash('error'),
        success: req.flash('success')
    });
});

router.post('/registrar/avance/', function (req, res){
    userManager.registrarAvance(req.body, function(error, message){
        if(error){
            res.jsonp({status: 500, message: message});
        }else{
            res.jsonp({status: 200});
        }
    });
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
    res.render('psicologo/evaluar', {titulo: "Nota Clínica"});
});

router.post('/evaluar', function(req, res){
    userManager.evaluar(req.body.data, function(error){
        if(error){
            res.send('error');
        }else{
            res.redirect('/paciente/perfil');
        }
    });
});

router.get('/editar', function(req, res){
    if(req.session.pacienteId){
        userManager.getUserInfo(req.session.pacienteId, function(data){
            if(data == null){
                req.flash('error', 'Error en base de datos.');
                res.redirect('/');
            }else{
                res.render('paciente/editar', {userData: data, titulo: "Editar"});
            }
        });
    }else{
        req.flash('error', 'No has seleccionado un paciente.');
        res.redirect('/');
    }
});

router.post('/editar', function(req,res){

    if(req.session.pacienteId){
        userManager.editar(req.session.pacienteId,req.body.data, function(error){
            if(error){
                req.flash('error', 'Error en base de datos.');
                res.redirect('/paciente/perfil');
            }else{
                req.flash('success', 'Paciente actualizado.');
                res.redirect('/paciente/perfil');
            }
        });
    }else{
        req.flash('error', 'No has seleccionado un paciente.');
        res.redirect('/');
    }
});


router.get('/record', function(req, res){
    if(req.session.pacienteId){
        userManager.getRecord(req.session.pacienteId, function(error, record){
            res.jsonp(record);
        });
    }
    else{
        req.flash('error', 'No has seleccionado un paciente.');
        res.redirect('/');
    }
});

module.exports = router;