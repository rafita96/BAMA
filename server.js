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

app.delete('/database/eliminar/', function(req, res){
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

app.put('/database/actualizar/', function(req, res){
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

app.get('/database/get/:collection/:query', function(req, res){
	dbManager.find(req.params.collection, req.params.query, function(data){
		res.status(200).jsonp(data);
	});
});
/**  **/

/** Url estatica para datos comunes**/
app.use("/common", express.static(__dirname + "/common"));
/**  **/

app.listen(8080); 