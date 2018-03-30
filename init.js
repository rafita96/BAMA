var bcrypt = require('bcrypt');
var appConfig = require('./serverfiles/conf').conf["session"];
var dbManager = require('./serverfiles/database');

var hash = bcrypt.hashSync(appConfig["password"], appConfig["saltRounds"]);

dbManager.find(appConfig["collection"],
                {username: appConfig["username"]}, 
                    function (res) {
                        if(res.length == 0){
                            dbManager.insertar(appConfig["collection"],
                                {
                                    username: appConfig["username"],
                                    password: hash
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