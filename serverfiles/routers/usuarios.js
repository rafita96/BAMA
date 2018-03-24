var express = require('express');
var router = express.Router();
var path = require("path");

router.get('/agregar/', function (req, res) {
  res.sendFile(path.join(__dirname+'/../../general/views/usuario/agregar.html'));
});

module.exports = router;