if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require('body-parser');

const helmet = require('helmet');
// const session = require('express-session');
// const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const cors = require('cors')

const app = express();
const port = process.env.PORT;

const dbInit = require('./src/controllers/database');
const ratelimiter = require('./src/middleware/ratelimiter');
const auth = require('./src/middleware/auth');

const router = require('./src/routers/router');


app.use(cors());
app.use(cookieParser());
app.use(helmet());

app.set('apiKey', process.env.API_KEY);

app.use(auth); 
if(process.env.NODE_ENV === 'production'){
	app.use(ratelimiter);
	app.set('trust proxy', 1);
}
// app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/json'}));


app.use('/', router);

app.listen(port, () => {
	console.log(`Escuchando en http://localhost:${port}`);
	dbInit(function(){
		return;
	});
});
