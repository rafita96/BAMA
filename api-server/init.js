if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');

const readline = require("readline");

const dbInit = require('./src/controllers/database');
const User = require('./src/models/User');

const securityManager = require('./src/controllers/security');

function lookForAdmin(callback){
	User.findOne({role: 'ROLE_ADMIN'}).exec(callback);
}

function createAdmin(callback){
	console.log("Comienza el proceso para crear un administrador.");
	console.log("Para salir presione Ctrl+C");

	const rl = readline.createInterface({
	    input: process.stdin,
	    output: process.stdout
	});

	rl.on("close", function() {
	    console.log("\n Proceso terminado.");
	    process.exit(0);
	});

	let user = {};
	rl.question("Cuál es tu nombre? ", function(name) {
	    rl.question("Apellido paterno? ", function(first) {
	    	rl.question("Apellido materno? ", function(second) {
	    		rl.question("Nombre de usuario para acceder al sistema: ", function(username) {
	    			rl.question("Contraseña para acceder al sistema: ", function(password) {

	    				user.name = name;
	    				user.firstLastName = first;
	    				user.secondLastName = second;
	    				user.username = username;
	    				user.password = password;
	    				user.role = 'ROLE_ADMIN';

	    				securityManager.createUser(user, function(err, userdb){
	    					if(err){
	    						console.log(err);
	    						console.log("No se pudo crear el administrador.");
	    					}else{
	    						console.log("Administrador creado.");
	    					}
					        rl.close();
					        callback();
	    				});
	    			});
	    		});
	    	});
	    });
	});
}

dbInit(function(){
	lookForAdmin(async function(err, result){
		if(err){
			console.log("Hay un error");
			mongoose.disconnect();
		}else{
			if(result == null){
				console.log("No hay admin");
				createAdmin(function(){
					mongoose.disconnect();
				});
			}else{
				console.log(`El admin se llama ${result.name}`);
				mongoose.disconnect();
			}
		}
	});
});

