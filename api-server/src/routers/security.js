const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const securityManager = require('../controllers/security');

router.post('/login', function(req, res){
	securityManager.login(req.body.username, req.body.password, function(err, valid){
		if(err){
			res.jsonp({status: 500, message: "Error en el servidor."});
		}else{
			if(valid){
				const payload = {
					user_id: valid._id,
					role: valid.role
				};

				const token = jwt.sign(payload, req.app.get('apiKey'), {
					expiresIn: '1d'
				});

				res.jsonp({status: 200, token: token, role: valid.role});
			}else{
				res.jsonp({status: 200, token: null, role: null});
			}
		}
	});
});

router.get('/logout', function(req, res){
	securityManager.logout(req, function(err, valid){
		if(err){
			res.jsonp({status: 500, message: "Error en el servidor"});
		}else{
			res.jsonp({status: 200, valid: valid});
		}
	});
});

module.exports = router;