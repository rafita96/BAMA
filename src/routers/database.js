var express = require('express');
var router = express.Router();

var dbManager = require('./../controllers/database');

router.post('/insertar/', function(req, res){
    dbManager.insertar(req.body.collection, req.body.data, function(error){
        if(error){
            res.status(500).send('error');
        }else{
            if(req.body.redirect){
                res.redirect(req.body.redirect);
            }else{
                res.status(200).send('ok');
            }
        }
    });
});

router.delete('/eliminar/', function(req, res){
    dbManager.eliminar(req.body.collection, req.body.data, function(error){
        if(error){
            res.status(500).send('error');
        }else{
            if(req.body.redirect){
                res.redirect(req.body.redirect);
            }else{
                res.status(200).send('ok');
            }
        }
    })
});

router.put('/actualizar/', function(req, res){
    dbManager.actualizar(req.body.collection, req.body.query, req.body.data, function(error){
        if(error){
            res.status(500).send('error');
        }else{
            if(req.body.redirect){
                res.redirect(req.body.redirect);
            }else{
                res.status(200).send('ok');
            }
        }
    })
});

router.get('/get/:collection/:query', function(req, res){
    dbManager.find(req.params.collection, req.params.query, function(data){
        res.status(200).jsonp(data);
    });
});

module.exports = router;