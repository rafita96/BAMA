/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/**
	Servidor en NodeJS que integra todos los routers
*/
var path = require("path");				// Para poder acceder al directorio local
var express = require('express'); 		// Sirve para leer los encabezados http, como las url.
var cookieParser = require('cookie-parser') 	// Ayuda a mantener la sesión en una cookie
var flash = require('express-flash'); 			// Para mandar mensajes al front-end desde el servidor
var bodyParser = require('body-parser'); 		// Permite recibir contenido json enviado por encabezados http

// Archivo de configuración local
var appConfig = require('./src/conf').conf;
// Middleware que verifica que exista una cuenta activa 	
var firewall = require('./src/controllers/firewall').firewall;

// Permite manejar la sesión
var session = require('express-session');
// Con este se conecta a la base de datos de mongo
var MongoStore = require('connect-mongo')(session);

// Router que contiene todos los routers de nuestro sistema
var router = require('./src/router');

var app = express();
// Se define el directorio en el que se encuentran las vistas para plantillas
app.set('views', path.join(__dirname, '/src/views/'));
// Usamos el engine 'EJS' para plantillas de html
app.set('view engine', 'ejs');
/** Url estatica para datos comunes**/
app.use("/public", express.static(__dirname + "/public"));

// Esto sirve para mantener la sesión
app.use(cookieParser());
app.use(session({
	secret: 'keyboard god',
	resave: false,
	saveUninitialized: true,
	cookie: { 
		secure: false
	},
	store: new MongoStore({
		url: 'mongodb://'+appConfig.database.host+':'+appConfig.database.port+'/'+appConfig.database.name,
	})
}));

// Permite enviar formato json por medio de los encabezados http
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// Activa el Middleware para enviar mensajes del servidor al front-end
app.use(flash());

/** Manejo de sesion **/
// Middleware que evita acceso no autorizado
app.use(firewall);

// Permitimos que nuestro router maneje las rutas desde la raíz
app.use('/', router);
/**  **/

// Para acceder al sistema desde el navegador se hace mediante el puerto 8080
app.listen(8080); 