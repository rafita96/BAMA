var path = require("path");
var express = require('express');
var bodyParser = require('body-parser');
var appConfig = require('./serverfiles/conf').conf;
var firewall = require('./serverfiles/firewall').firewall;

// var cookieParser = require('cookie-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var MongoStore = require('connect-mongo')(session);
// var redisSession = require('node-redis-session');

var security = require('./serverfiles/routers/security');
var database = require('./serverfiles/routers/database');

var app = express();

/** Url estatica para datos comunes**/
app.use("/common", express.static(__dirname + "/common"));
/**  **/

app.use(session({
	secret: 'keyboard god',
	resave: false,
	saveUninitialized: true,
	cookie: { secure: false },
	store: new MongoStore({
		url: 'mongodb://'+appConfig.database.host+':'+appConfig.database.port+'/'+appConfig.database.name,
	})
}));

app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

/** Manejo de sesion **/

// app.use(redisSession({
// 	redisOptions: [appConfig.database.port, appConfig.database.host+'/'+appConfig.database.name, {auth_pass: 'auth_pass'}]
// }));

app.use(firewall);
/**  **/

/** Manejo de sesion **/
app.use('/', security);
/**  **/


/** General **/
app.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/usuarios/agregar/', function (req, res) {
  res.sendFile(path.join(__dirname+'/general/views/usuario/agregar.html'));
});
/**  **/

/** Url para los juegos **/
app.get('/juegos/:name/', function (req, res){
	res.sendFile(path.join(__dirname + '/juegos/'+req.params.name+"/index.html"));
});

app.get('/juegos/:name/*', function (req, res){
	res.sendFile(path.join(__dirname+"/juegos/"+ req.params["name"] +"/"+req.params[0]));
});
/**  **/

/** Manejo de base de datos **/
app.use('/database', database);
/**  **/

app.listen(8080); 