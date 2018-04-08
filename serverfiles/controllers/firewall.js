var dbManager = require('./database');

var allowFireWallPaths = [new RegExp('/login/*'), new RegExp('/common/*'),
                        new RegExp('/logout/*')];
function firewall(path){
    for(var i = 0; i < allowFireWallPaths.length; i++){
        if(path.match(allowFireWallPaths[i])){
            return true;
        }
    }
    return false;
}

exports.firewall = function(req, res, next){
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    if (firewall(req.path) || (req.session && req.session.userId)) {
        if(req.path.match(new RegExp('/login/*')) && (req.session && req.session.userId)){
            return res.redirect('/');
        }else{
            return next();
        }
    } else {
        return res.redirect('/login/');
    }
};