const jwt = require('jsonwebtoken');

const permissions = {
	ROLE_ADMIN: {
		GET: ["/*"],
		POST: ["/*"],
		PUT: ["/*"],
		DELETE: ["/*"],
	},
	ROLE_USER: {
		GET: ["/pacients/profile/*", "/pacients/score"],
		POST: [],
		PUT: ["/pacients/self"],
		DELETE: [],
	},
	NO_ROLE: ["/login", "/logout"]
}

function auth(req, res, next){

	let isMatch = permissions.NO_ROLE.some(function(rx){
		return req.path.match(rx);
	});

	if(isMatch){
		return next();
	}else{
		const token = req.headers['access-token'];
		if(token){
			jwt.verify(token, req.app.get('apiKey'), (err, decoded) => {
				if(err){
					if(err instanceof jwt.TokenExpiredError){
						// console.log(err);
						return res.jsonp({status: 401, message: "TokenExpiredError"});
					}			
					return res.sendStatus(401);
				} else {
					req.user = decoded;

					isMatch = permissions[req.user.role][req.method].some(function(rx){
						return req.path.match(rx);
					});

					if(isMatch){
						return next();
					}else{
						res.sendStatus(401);
					}
				}
			});
		}else{
			return res.sendStatus(401);
		}
	}
}

module.exports = auth;