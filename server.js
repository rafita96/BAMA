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

var router = require('./serverfiles/router');

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

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

/** Manejo de sesion **/
app.use(firewall);
app.use('/', router);
/**  **/


/** General **/
app.get('/', function (req, res, next) {
	res.sendFile(path.join(__dirname+'/index.html'));
});
/**  **/


app.listen(8080); 