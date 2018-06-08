/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/*
	Controlador de la base de datos. Permite buscar un elemento, insertar,
	eliminar y editar en la base de datos.
	Para saber más sobre este controlador investiguen sobre el uso de Mongo
*/
var mongo = require('mongodb').MongoClient;
// Archivo de configuración que contiene los parametros de la base de datos
var appConfig = require('./../conf').conf["database"];
// Url que conecta a la base de datos
var url = 'mongodb://' + appConfig["host"] +':'+ appConfig["port"] +'/';

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

	// Hace la conexión a mongo
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		// La base de datos se llama volveraempezar, esto debería estar en el archivo
		// de configuración
		var dbo = db.db("volveraempezar");

		// Hace la búsqueda en la base de datos utilizando la query y la colección
		dbo.collection(collection).find(query).toArray(function(err, res) {
			if (err) throw err;
			// Envia el arreglo de objetos encontrados
			callback(res);
		});
		// Cierra la conexión
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
	// Hace la conexión a mongo
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		// La base de datos se llama volveraempezar, esto debería estar en el archivo
		// de configuración
		var dbo = db.db("volveraempezar");

		// Va a eliminar todos los objetos que concuerden con los parámetros de búsqueda
		dbo.collection(collection).deleteMany(query, function(err, res) {
			if (err) throw err;
			// Se regresa falso porque no hubo error.
			callback(false);
		});
		// Cierra la conexión a la base de datos
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
	// Hace la conexión a mongo
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		// La base de datos se llama volveraempezar, esto debería estar en el archivo
		// de configuración
		var dbo = db.db("volveraempezar");

		// Va a insertar un sólo elemento en la colección
		dbo.collection(collection).insertOne(data, function(err, res) {
		
			if (err) throw err;
			// Regresa falso porque no hubo error
			callback(false);
		});

		// Cierra la conexión a la base de datos
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
	// Hace la conexión a mongo
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		// La base de datos se llama volveraempezar, esto debería estar en el archivo
		// de configuración
		var dbo = db.db("volveraempezar");

		// Va a actualizar solamente uno de los elementos que se encuentre con los criterios
		// de búsqueda.
		dbo.collection(collection).updateOne(query, {$set: data}, function(err, res) {
		
			if (err) throw err;
			// Regresa falso porque no hubo error
			callback(false);
		});

		// Cierra la conexión a la base de datos
		db.close();
	});
}
