var path = require("path");
var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/juegos/:name/', function (req, res){
	res.sendFile(path.join(__dirname + '/juegos/'+req.params.name+"/index.html"));
});

app.get('/juegos/:name/*', function (req, res){
	res.sendFile(path.join(__dirname+"/juegos/"+ req.params["name"] +"/"+req.params[0]));
});

app.use("/common", express.static(__dirname + "/common"));

app.listen(8080); 