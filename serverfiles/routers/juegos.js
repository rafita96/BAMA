var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/:name/', function (req, res){
    res.sendFile(path.join(__dirname + '/../../juegos/'+req.params.name+"/index.html"));
});

router.get('/:name/*', function (req, res){
    res.sendFile(path.join(__dirname+"/../../juegos/"+ req.params["name"] +"/"+req.params[0]));
});

module.exports = router;