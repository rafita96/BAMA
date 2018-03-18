var path = require("path");
var express = require('express');
var bodyParser = require('body-parser')
var dbManager = require('./serverfiles/database')

var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

/** General **/
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/usuarios/agregar/', function (req, res) {
  res.sendFile(path.join(__dirname+'/general/views/usuario/agregar.html'));
});
/**  **/

/** Url para los juegos **/
app.get('/juegos/:name/', function (req, res){
	res.sendFile(path.join(__dirname + '/juegos/'+req.params.name+"/index.html"));
});

app.get('/juegos/:name/*', function (req, res){
	res.sendFile(path.join(__dirname+"/juegos/"+ req.params["name"] +"/"+req.params[0]));
});
/**  **/

/** Base de datos **/
app.post('/database/insertar/', function(req, res){
	var error = dbManager.insertar(req.body.collection, req.body.data);
	
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
/**  **/

/** Url estatica para datos comunes**/
app.use("/common", express.static(__dirname + "/common"));
/**  **/

app.listen(8080); 