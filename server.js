if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const path = require("path");
const express = require('express');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const generalConfig = require('./src/conf');
const firewall = require('./src/controllers/firewall').firewall;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const router = require('./src/router');

const app = express();

app.set('views', path.join(__dirname, '/src/views/'));
app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.use(cookieParser());
app.use(session({
    secret: 'keyboard god',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
    store: new MongoStore({
        url: process.env.DB_HOST + process.env.DB,
    })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(flash());

app.use(firewall);

app.use(function (req, res, next) {
    res.locals.roles = generalConfig.roles;
    res.locals.role = req.session.role;
    next();
});


app.use('/', router);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
