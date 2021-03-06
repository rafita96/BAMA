const crypto = require('crypto');

const roles = {
    ROLE_ADMIN: 0,
    ROLE_PSI: 1,
    ROLE_PACIENTE: 2
};

const conf = {
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
  const cipher = crypto.createCipher(conf["session"]["algorithm"], conf["session"]["secret"])
  let encrypted = cipher.update(text,'utf8','hex')
  encrypted += cipher.final('hex');
  return encrypted;
}

exports.roles = roles;
exports.conf = conf;
