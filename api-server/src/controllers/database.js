const mongoose = require('mongoose');

function dbInit(callback){
	mongoose.connect(process.env.DB_HOST+process.env.DB, {
		useNewUrlParser: true, 
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true
	});

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function(){
		console.log("Conectado a Mongo");
		callback();
	});
}

module.exports = dbInit;