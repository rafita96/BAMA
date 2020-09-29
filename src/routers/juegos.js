const express = require('express');
const router = express.Router();
const path = require("path");
const juegosManager = require("./../controllers/juegos");

router.use(function (req, res, next) {
    if (req.session.pacienteId) {
        return next();
    } else {
        req.flash('error', 'No has seleccionado un paciente.');
        return res.redirect('/');
    }
});


// TODO: Esto no es eficiente y debe hacerse desde la base de datos.
router.get('/', function (req, res) {
    res.render('juegos/lista', {titulo: "Juegos"});
});

// Envia la lista de nombres de los juegos.
// Esto es necesario porque la vista de la lista de juegos se llena mediante
// javascript, si fuera eficiente no sería necesario, porque el servidor
// puede crear la vista completa utilizando las plantillas EJS
router.get('/todos/los/nombres', function (req, res) {
    juegosManager.getJuegos(function (juegos) {
        res.jsonp({juegos: juegos});
    });
});

// Accede al juego utilizando el nombre que tiene en la carpeta, por eso los nombres
// de las carpetas no deben tener espacios. Si el nombre del juego requiere de espacios
// eso se pone en el meta.json de cada juego.
// Cada juego debe tener su vista index.ejs para mantener la plantilla del sistema
// Suponemos que no son necesarias otras vistas para los juegos.
router.get('/:name/', function (req, res) {
    res.render('../../juegos/' + req.params.name + "/index");
});

// Permite acceder a los recursos de cada juego, por ejemplo los archivos js, css o imágenes
// por ejemplo: /juegos/espejo/public/js/main.js
// Cuando se llame un recurso local a cada juego anteponer un punto '.'
// por ejemplo: ./public/js/main.js
// El punto hace referencia a la carpeta actual. Si quieren usar recursos del 'common'
// no antepongan el punto. por ejemplo: /public/common/js/post.js
router.get('/:name/*', function (req, res) {
    res.sendFile(path.join(__dirname + "/../../juegos/" + req.params["name"] + "/" + req.params[0]));
});

module.exports = router;
