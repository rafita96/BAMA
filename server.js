var path = require("path");
var express = require('express');
var bodyParser = require('body-parser')
var mongo = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27017/';
var app = express();

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
})); 

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

// Base de datos
app.post('/database/crear/', function(req, res){
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("volveraempezar");
			
		dbo.createCollection(req.body.collection, function(err, res) {
		
			if (err) throw err;
			console.log("Collection created!");
			db.close();
		});
	});

	res.status(200).send('ok');
});