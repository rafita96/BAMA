const mongo = require('mongodb').MongoClient;
const appConfig = require('./../conf').conf["database"];
const url = 'mongodb://' + appConfig["host"] +':'+ appConfig["port"] +'/';

/*
 * 	Busca un elemento en la base de datos
 *
 * 	@param {string} 	collection 	- Nombre de la collección en la que se quiere buscar
 * 	@param {json}  		query 		- Objeto json refente a una búsqueda en Mongo
 * 	@param {function} 	callback 	- Es la función que se va a ejecutar cuando la consulta
 * 									a la base de datos termine.
 *
 */
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

/*
 * 	Elimina elementos de la base de datos
 *
 * 	@param 	{string} 	collection	- Nombre de la collección en la que se quiere eliminar
 * 	@param 	{json}		query 		- Objeto json refente a una búsqueda en Mongo
 * 	@param 	{function} 	callback 	- Es la función que se va a ejecutar cuando se eliminen los objetos.
 *
 */
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

/*
 * 	Inserta un elemento en la base de datos
 *
 * 	@param 	{string}	collection	- Nombre de la collección en la que se quiere insertar
 * 	@param 	{json} 		data 		- Objeto json refente a los datos que se quieren insertar
 * 	@param 	{function}	callback	- Es la función que se va a ejecutar cuando se termine de insertar
 *
 */
exports.insertar = function(collection, data, callback){
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("volveraempezar");
		dbo.collection(collection).insertOne(data, function(err, res) {
			if (err) throw err;
			callback(false);
		});
		db.close();
	});
}

/*
 * 	Inserta un elemento en la base de datos
 *
 * 	@param 	{string}	collection	- Nombre de la collección en la que se quiere actualizar un dato
 *	@param 	{json}		query		- Objeto json refente a una búsqueda en Mongo
 * 	@param 	{json}		data 		- Objeto json refente a los datos que se quieren actualizar
 * 	@param 	{function}	callback	- Es la función que se va a ejecutar cuando se termine de actualizar
 *
 */
exports.actualizar = function(collection, query, data, callback){
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("volveraempezar");
		dbo.collection(collection).updateOne(query, {$set: data}, function(err, res) {
			if (err) throw err;
			callback(false);
		});
		db.close();
	});
}
