const express = require('express');
const router = express.Router();

const userManager = require("./../controllers/usuarios");

router.use(function (req, res, next) {
    const isAuthenticatedPatient = req.path.match("/agregar") || req.path.match("/actual/") || req.session.pacienteId;
    if (isAuthenticatedPatient) {
        return next();
    } else {
        req.flash('error', 'No has seleccionado un paciente.');
        return res.redirect('/');
    }
});

// TODO: Render from the server. It shouldn't render from client
router.get('/perfil/', function (req, res) {
    res.render('paciente/perfil', {
        titulo: "Perfil",
        error: req.flash('error'),
        success: req.flash('success')
    });
});


router.get('/sesiones/', function (req, res) {
    res.render('paciente/sesiones', {
        titulo: "Sesiones",
        error: req.flash('error'),
        success: req.flash('success')
    });
});

// Comunica el nombre de la carpeta del juego, el nivel, porcentaje de aciertos
router.post('/registrar/avance/', function (req, res) {
    userManager.registrarAvance(req.body, function (error, message) {
        if (error) {
            res.jsonp({status: 500, message: message});
        } else {
            res.jsonp({status: 200});
        }
    });
});

router.get('/agregar', function (req, res) {
    res.render('paciente/agregar', {titulo: "Agregar"});
});

router.post('/agregar/', function (req, res) {
    userManager.agregar(req.body.data, function (error, message) {
        if (error) {
            req.flash('error', message);
            res.redirect('/');
        } else {
            req.flash('success', "El usuario se ha agregado éxitosamente.")
            res.redirect('/');
        }
    });
});

// Define el paciente actual y lo guarda en la variable de sesión
router.post('/actual', function (req, res) {
    req.session.pacienteId = req.body.paciente;
    userManager.getUserInfo(req.body.paciente, function (data) {
        if (data == null) {
            res.status(200).jsonp({id: null});
        } else {
            res.status(200).jsonp(data);
        }
    });
});

// Regresa el id del paciente seleccionado
router.get('/actual', function (req, res) {
    if (req.session.pacienteId) {
        userManager.getUserInfo(req.session.pacienteId, function (data) {
            if (data == null) {
                res.status(200).jsonp({id: null});
            } else {
                res.status(200).jsonp(data);
            }
        });
    } else {
        res.status(200).jsonp({id: null});
    }
});

// Muestra la vista del formulario para hacer una nota clínica
router.get('/evaluar', function (req, res) {
    res.render('psicologo/evaluar', {titulo: "Agregar Nota Clínica"});
});

// Guarda una nota clínica en la base de datos
router.post('/evaluar', function (req, res) {
    userManager.evaluar(req.session.pacienteId, req.body.data, function (error) {
        if (error) {
            req.flash('error', 'No se pudo guardar la nota.');
            res.redirect('/');
        } else {
            req.flash('success', "La nota se ha registrado con exito.")
            res.redirect('/paciente/notas');
        }
    });
});

// Envía el formulario de edición de un paciente
router.get('/editar', function (req, res) {
    if (req.session.pacienteId) {
        userManager.getUserInfo(req.session.pacienteId, function (data) {
            if (data == null) {
                req.flash('error', 'Error en base de datos.');
                res.redirect('/');
            } else {
                res.render('paciente/editar', {userData: data, titulo: "Editar"});
            }
        });
    } else {
        req.flash('error', 'No has seleccionado un paciente.');
        res.redirect('/');
    }
});

// Registra la información editada de un paciente.
router.post('/editar', function (req, res) {

    if (req.session.pacienteId) {
        userManager.editar(req.session.pacienteId, req.body.data, function (error, mensaje) {
            if (error) {
                req.flash('error', mensaje);
                res.redirect('/paciente/perfil');
            } else {
                req.flash('success', 'Paciente actualizado.');
                res.redirect('/paciente/perfil');
            }
        });
    } else {
        req.flash('error', 'No has seleccionado un paciente.');
        res.redirect('/');
    }
});

// Regresa todos los puntajes en todos los juegos del paciente actual
router.get('/record', function (req, res) {
    if (req.session.pacienteId) {
        userManager.getRecord(req.session.pacienteId, function (error, record) {
            res.jsonp(record);
        });
    } else {
        req.flash('error', 'No has seleccionado un paciente.');
        res.redirect('/');
    }
});

// Muestra la vista de notas con todas las notas clínicas
router.get('/notas', function (req, res) {
    userManager.getNotas(req.session.pacienteId, function (notas) {
        res.render('psicologo/notas', {success: req.flash('success'), titulo: "Notas Clínicas", notas: notas});
    });
});

module.exports = router;
