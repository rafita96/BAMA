var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/';

exports.insertar = function(collection, data){
	mongo.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("volveraempezar");
			
		dbo.collection(collection).insertOne(data, function(err, res) {
		
			if (err) throw err;
			console.log("Insertado");
			db.close();
		});
	});
}
