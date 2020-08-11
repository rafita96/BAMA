/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/*
    Rutas para la api
*/

const fs = require('fs');

var express = require('express');
var router = express.Router();
var path = require("path");

// Regresa el id del paciente seleccionado
router.get('/:name/audio', function(req, res){

    var path = '../../juegos/'+req.params.name+"/data/audio.mp3"
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            console.error(err);
            return res.status(404).jsonp({});
        }

        return res.status(200).jsonp({id:1});


    }); 
});

module.exports = router;