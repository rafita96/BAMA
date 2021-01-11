const mongoose = require('mongoose');
const User = require('../models/User');

const { SodiumPlus } = require('sodium-plus');
let sodium;

async function cypher(password){

    if (!sodium) sodium = await SodiumPlus.auto(); // Autoload the backend

    // Hashing...
    let hash = await sodium.crypto_pwhash_str(
        password,
        sodium.CRYPTO_PWHASH_OPSLIMIT_INTERACTIVE,
        sodium.CRYPTO_PWHASH_MEMLIMIT_INTERACTIVE
    );

    // You can safely store {hash} in a database.
    return hash;
}

async function decypher(password, hash){

    if (!sodium) sodium = await SodiumPlus.auto(); // Autoload the backend

    // Password verification
    let valid = await sodium.crypto_pwhash_str_verify(password, hash);
    return valid;
}

async function updateHash(userdb, password, callback){

    if (!sodium) sodium = await SodiumPlus.auto(); // Autoload the backend

    // Checking that a stored hash is still up to snuff...
    let stale = await sodium.crypto_pwhash_str_needs_rehash(
        userdb.password,
        sodium.CRYPTO_PWHASH_OPSLIMIT_INTERACTIVE,
        sodium.CRYPTO_PWHASH_MEMLIMIT_INTERACTIVE
    );

    if (stale) {
        hash = await cypher(password);
        User.findOneAndUpdate({username: userdb.username}, {password: hash}, function(err, res){
            if(err){
                callback(err, true);
            }else{
                callback(false, true);
            }
        });
    }else{
        
        callback(false, true);
    }
}

async function login(username, password, callback){
    // Consultar si el usuario existe:
    User.findOne({username: username}).exec(async function(err, user){

        if(err){
            callback(err, false);
        }else{
            if(user == null){
                callback(false, false);
            }else{
                // Luego buscar el hash
                valid = await decypher(password, user.password);
                if(valid){
                    updateHash(user, password, function(err){
                        callback(false, {_id: user._id, role: user.role});
                    });
                }else{
                    callback(false, false);
                }
            }
        }
    });
}

async function logout(req, callback){
    console.log("Invalidar token");
    callback(false, true);
}

async function createUser(user, callback){
    user.password = await cypher(user.password);
    
    const newUser = new User(user); 
    newUser.save(function(err, userdb){
        if(err){
            callback(err, null);
        }else{
            callback(false, userdb);
        }
    });
}

exports.createUser = createUser;
exports.login = login;
exports.logout = logout;