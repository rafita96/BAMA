var path = require("path");
var express = require('express');
var bodyParser = require('body-parser')
var dbManager = require('./serverfiles/database')

var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

/** Url para los juegos **/
app.get('/juegos/:name/', function (req, res){
	res.sendFile(path.join(__dirname + '/juegos/'+req.params.name+"/index.html"));
});

app.get('/juegos/:name/*', function (req, res){
	res.sendFile(path.join(__dirname+"/juegos/"+ req.params["name"] +"/"+req.params[0]));
});
/**  **/

/** Url estatica para datos comunes**/
app.use("/common", express.static(__dirname + "/common"));
/**  **/

app.listen(8080); 

/** Base de datos **/
app.post('/database/insertar/', function(req, res){
	dbManager.insertar(req.body.collection, req.body.data);
	
	res.status(200).send('ok');
});
/**  **/