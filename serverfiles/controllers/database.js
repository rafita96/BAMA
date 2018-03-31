var mongo = require('mongodb').MongoClient;
var appConfig = require('./../conf').conf["database"];
var url = 'mongodb://' + appConfig["host"] +':'+ appConfig["port"] +'/';

exports.find = function(collection, query, callback){

	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("volveraempezar");

		dbo.collection(collection).find(query).toArray(function(err, res) {
			if (err) throw err;
			callback(res);
		});
		db.close();
	});
}


exports.eliminar = function(collection, query, callback){
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("volveraempezar");

		dbo.collection(collection).deleteMany(query, function(err, res) {
			if (err) throw err;
			callback(false);
		});
		db.close();
	});
}

exports.insertar = function(collection, data, callback){

	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("volveraempezar");

		dbo.collection(collection).insertOne(data, function(err, res) {
		
			if (err) throw err;
			console.log("Insertado");
			callback(false);
		});
		db.close();
	
	});
}

exports.actualizar = function(collection, query, data, callback){

	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("volveraempezar");

		dbo.collection(collection).updateOne(query, {$set: data}, function(err, res) {
		
			if (err) throw err;
			console.log("Actualizado");
			callback(false);
		});
		db.close();
	
	});
}
