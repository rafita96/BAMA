const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const securityManager = require('./security');
// const Pacient = require('../models/Pacient');
const User = require('../models/User');

const select = {
		name: 1,
		firstLastName: 1,
		secondLastName: 1,
		pacient: 1
	};

async function createPacient(pacient, callback){

	const user = {
		name: pacient.name,
		firstLastName: pacient.firstLastName,
		secondLastName: pacient.secondLastName,
		username: pacient.noExp,
		password: pacient.noExp,
		pacient: {
			birthday: pacient.birthday
		}
	};


	securityManager.createUser(user, function(err, userdb){

		if(err){
			callback(err, null);
		}else{
			if(userdb == null){
				callback(false, null)
			}else{
				callback(false, userdb);
			}
		}

	});
}

async function deletePacient(id, callback){
	let _id = ObjectId(id);

	User.deleteOne({_id: _id}, function(err){
		if(err){
			callback(err);
		}else{
			callback(false);
		}
	});
}

async function updatePacient(pacient, callback){
	let _id = ObjectId(pacient._id);
	let info = {
		name: pacient.name,
		firstLastName: pacient.firstLastName,
		secondLastName: pacient.secondLastName,
		"pacient.birthday": pacient.birthday
	}

	User.updateOne({_id: _id}, info, function(err, userdb){
		if(err){
			callback(err);
		}else{
			callback(false);
		}
	});
}

async function addScore(id, score, callback){
	let _id = ObjectId(id);
	let _score = {
		initTime: score.initTime,
		finishTime: score.finishTime,
		score: score.score,
		game: score.game,
		gameType: score.gameType
	}

	User.findOneAndUpdate({_id: _id, pacient: {$ne: null}}, {$push: {"pacient.scores": _score} })
		.select(select)
		.exec(
			function(err, pacient){
				if(err){
					callback(err, null);
				}else{
					if(pacient == null){
						console.log("No se encuentra el paciente.");
						callback(err, null);
					}else{
						callback(false, true);
					}
				}
			}
		);
}

function getAllPacients(callback){

	const showSelect = {
		username: 1,
		name: 1,
		firstLastName: 1,
		secondLastName: 1,
		"pacient.birthday": 1
	};

	User.find({pacient:{$ne:null}, role: 'ROLE_USER'}).select(showSelect).exec(function(err, pacients){
		if(err){
			callback(err, null);
		}else{

			let newPacients = {};

			for (var i = 0; i < pacients.length; i++) {
				let p = {
					name: pacients[i].name,
					firstLastName: pacients[i].firstLastName,
					secondLastName: pacients[i].secondLastName,
					birthday: pacients[i].pacient.birthday,
					noExp: pacients[i].username
				}

				newPacients[pacients[i]._id.toString()] = p;
			}

			callback(false, newPacients);
		}
	});
}

function getPacient(id, callback){

	let _id = ObjectId(id);

	User.findById(_id).exec(function(err, pacient){
		if(err){
			callback(err, null);
		}else{
			if(pacient == null){
				callback("No se encuentra el paciente.", null);
			}else{
				if(pacient.pacient != null){
					let _pacient = {
						name: pacient.name,
						firstLastName: pacient.firstLastName,
						secondLastName: pacient.secondLastName,
						birthday: pacient.pacient.birthday,
						noExp: pacient.username.toString(),
						scores: pacient.pacient.scores
					}
					callback(false, _pacient);
				}else{
					callback("No se encuentra el paciente.", null);
				}
			}
		}
	});
}

exports.addScore = addScore;
exports.createPacient = createPacient;
exports.deletePacient = deletePacient;
exports.updatePacient = updatePacient;
exports.getAllPacients = getAllPacients;
exports.getPacient = getPacient;

// const dbInit = require('./database');

// dbInit(function(){
// 	const pacient = {
// 		name: 'Calirtos',
// 		firstLastName: 'Perez', 
// 		secondLastName: 'Juarez',
// 		noExp: '0005',
// 		password: '',
// 		birthday: new Date('1996-07-10')
// 	};
// 	createPacient(pacient, function(err, userdb){
// 		if(err){
// 			console.log(err);
// 			mongoose.disconnect();
// 		}else{
// 			const score = {
// 				initTime: new Date(),
// 				finishTime: new Date(),
// 				score: 57,
// 				game: "Hola",
// 				gameType: ["M"],
// 			};
// 			addScore(userdb, score, function(err, res){
// 				if(err){
// 					console.log(err);
// 				}else{
// 					console.log("Nuevo paciente");
// 				}
// 				mongoose.disconnect();
// 			});
// 		}
		
// 	});
// });


// const dbInit = require('./database');

// dbInit(function(){
// 	getAllPacients(function(err, pacients){
// 		console.log(pacients);
// 		mongoose.disconnect();
// 	});
// });