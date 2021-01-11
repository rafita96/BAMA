const express = require('express');
const router = express.Router();

const pacientManager = require('../controllers/pacient');

router.get('/', function(req,res){
	pacientManager.getAllPacients(function(err, pacients){
		if(err){
			console.log(err);
			res.jsonp({status: 500, message: "Error en servidor."});
		}else{
			res.jsonp({status: 200, pacients: pacients});
		}
	});
});

router.get('/home', function(req, res){
	pacientManager.getPacient(req.user.user_id, function(err, pacient){
		if(err){
			res.jsonp({status: 500, message: "Error en servidor."});
		}else{
			res.jsonp({status: 200, pacient: pacient});
		}
	});

});

router.get('/profile/:_id', function(req, res){
	pacientManager.getPacient(req.params._id, function(err, pacient){
		if(err){
			res.jsonp({status: 500, message: "Error en servidor."});
		}else{
			res.jsonp({status: 200, pacient: pacient});
		}
	});
});

router.post('/score', function(req, res){

	pacientManager.addScore(req.body._id, req.body.score, function(err, saved){
		if(err){
			res.jsonp({status: 500, message: "Error en el servidor."});
		}else{
			if(saved == null){
				res.jsonp({status: 200, message: "No se encontró el paciente."});
			}else{
				res.jsonp({status: 200, saved: saved});
			}
		}
	});
});

router.post('/', function(req, res){
	pacientManager.createPacient(req.body, function(err, pacientdb){
		if(err){
			if(err.code == 11000){
				res.jsonp({status: 200, message: "Ese usuario ya existe."});
			}else{
				console.log(err);
				res.jsonp({status: 500, message: "Error en el servidor."});
			}
		}else{
			res.jsonp({status: 200, pacient: pacientdb._id});
		}
	});
});

router.delete('/', function(req, res){
	// Probablemente falte borrar las notas. Si se llegaran a hacer notas.
	pacientManager.deletePacient(req.body._id, function(err){
		if(err){
			res.jsonp({status: 500, message: "Error en el servidor."});
		}else{
			res.jsonp({status: 200, message: "Paciente borrado."});
		}
	});
});

router.put('/', function(req, res){
	pacientManager.updatePacient(req.body, function(err){
		if(err){
			res.jsonp({status: 500, message: "Error en el servidor."});
		}else{
			res.jsonp({status: 200, message: "Paciente actualizado."});
		}
	});
});

router.put('/self', function(req, res){
	req.body._id = req.user.user_id;
	pacientManager.updatePacient(req.body, function(err){
		if(err){
			res.jsonp({status: 500, message: "Error en el servidor."});
		}else{
			res.jsonp({status: 200, message: "Paciente actualizado."});
		}
	});
});

module.exports = router;