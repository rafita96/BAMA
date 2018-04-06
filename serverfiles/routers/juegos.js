var express = require('express');
var router = express.Router();
var path = require("path");

var fs = require("fs");

var juegosManager = require("./../controllers/juegos");

router.use(function(req, res, next){
    if(req.session.pacienteId){
        return next();
    }else{
        return res.redirect('/');
    }
});

router.get('/', function(req, res){
    res.render('juegos/lista');
});

router.get('/todos/los/nombres', function(req, res){
    juegosManager.getJuegos(function(juegos){
        res.jsonp({juegos: juegos});
    });
});

router.get('/:name/', function (req, res){
    res.render('../../juegos/'+req.params.name+"/index");
});

router.get('/:name/*', function (req, res){
    res.sendFile(path.join(__dirname+"/../../juegos/"+ req.params["name"] +"/"+req.params[0]));
});

module.exports = router;