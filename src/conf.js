const crypto = require('crypto');

var roles = {
    ROLE_ADMIN: 0,
    ROLE_PSI: 1,
    ROLE_PACIENTE: 2
}

var conf = {
    database: {
        name: 'volveraempezar',
        host: 'localhost',
        port: '27017'
    },

    session:{
        saltRounds: 10,
        collection: "admins",
        algorithm: 'aes-256-ctr',
        secret: 'volveraempezar'
    },

    users: [
        {
            username: "admin",
            password: "psicologo",
            role: roles["ROLE_ADMIN"]
        }
    ]
};

exports.encrypt = function (text){
  var cipher = crypto.createCipher(conf["session"]["algorithm"], conf["session"]["secret"])
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

exports.roles = roles;
exports.conf = conf;
