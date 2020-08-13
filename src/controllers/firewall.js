/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/*
    Evita el acceso a rutas sin una cuenta de administrador
*/

var roles = require('../conf').roles;

// Rutas que se pueden acceder sin tener cuenta de administrador
var allowFireWallPaths = [new RegExp('/login/*'), new RegExp('/common/*'),
                        new RegExp('/logout/*')];

var roleNotAllows = {
    0: {base: '/', paths: []},
    1: {base: '/', paths: []},
    2: {base: '/paciente/perfil', paths: [new RegExp('/')]}
}

// Verifica que una ruta se pueda acceder sin permisos
function firewall(path){
    // Solo recorre la lista de rutas permitidas
    for(var i = 0; i < allowFireWallPaths.length; i++){
        // y si alguno concuerda con la ruta regresa verdadero
        if(path.match(allowFireWallPaths[i])){
            return true;
        }
    }
    return false;
}

function isRoleAllow(path, rol){
    if(roleNotAllows.hasOwnProperty(rol)){

        for (var i = 0; i < roleNotAllows[rol]["paths"].length; i++) {
            if(path.match(roleNotAllows[rol]["paths"][i])){
                return false;
            }
        }
    }

    return true;
}

// Middleware que verifica si un usuario puede acceder a una ruta
exports.firewall = function(req, res, next){

    // Hace que funcionen las variables de sesión
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    // Si es una ruta permitida o si hay un usuario con credenciales
    // entonces puede entrar al sistema
    if (firewall(req.path) || (req.session && req.session.userId)) {
        // Si quiere entrar a la ruta de login pero tiene credenciales activas
        // entonces lo redirecciona la página de inicio.
        if(req.path.match(new RegExp('/login/*')) && (req.session && req.session.userId)){
            return res.redirect('/');
        }else{
            // Sino le permitimos entrar a la ruta que quiere entrar
            return next();
        }
    } else {
        // Cuando no tiene acceso a la ruta solicitada lo redireccionamos a la página
        // de login
        return res.redirect('/login/');
    }
};