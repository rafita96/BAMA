const crypto = require('crypto');
const appConfig = require('./src/conf').conf;
const dbManager = require('./src/controllers/database');

function encrypt(text){
    const cipher = crypto.createCipher(appConfig["session"]["algorithm"], appConfig["session"]["secret"])
    let crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
}

for (var i = 0; i < appConfig.users.length; i++) {
    var usr = appConfig.users[i];

    // Se cifra la contraseña.
    const hash = encrypt(usr["password"]);

    // Busca en la base de datos si el usuario ya existe,
    // Si no existe entonces lo inserta en la collección, sino entonces
    // no hace algo.
    dbManager.find(appConfig["session"]["collection"],
        {username: usr["username"]},
        function (res) {
            if(res.length == 0){
                dbManager.insertar(appConfig["session"]["collection"],
                    {
                        username: usr["username"],
                        password: hash,
                        role: usr["role"]
                    },

                    function(err){
                        if(err){
                            console.log("Error")
                        }
                    }

                );
            }
        }
    );
}
