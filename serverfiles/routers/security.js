var express = require('express');
var router = express.Router();

var path = require("path");

// define the home page route
router.get('/login/', function(req, res) {
    res.sendFile(path.join(__dirname+'/../../general/views/seguridad/login.html'));
});

// define the about route
router.post('/login/', function(req, res) {
    if(req.body.username == "administrador" && req.body.password == "gato"){
        req.session.userId = "GatosMortales";
        res.redirect('/');
    }else{
        res.redirect('/login/');
    }
});

router.get('/logout/', function(req, res){
    if(req.session){
        req.session.destroy(function(err){
            if(err){
                res.send(err);
            }else{
                res.redirect('/login/');
            }
        });
    }
});

module.exports = router;