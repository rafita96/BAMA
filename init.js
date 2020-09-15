require('dotenv').config();
const appConfig = require('./src/conf').conf;
const dbManager = require('./src/controllers/database');
const {encrypt} = require("./src/conf");

const usr = appConfig.users[0];

dbManager.insertar(appConfig["session"]["collection"],
    {
        username: usr["username"],
        password: encrypt(usr["password"]),
        role: usr["role"]
    },
    (e) => {}
);
