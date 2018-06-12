/**
* @author   Rafael Peralta Blanco <rafael.peralta.blanco@gmail.com>
*/

/*
    En la parte de database se encuentra el nombre de la base de datos 'volveraempezar', 
    el host 'localhost' y el puerto '27017'.
    En la parte de session se encuentra el nombre de usuario 'admin', la contraseña 'psicologo', 
    la colección en donde se almacenan los administradores en la base de datos 'admins' y 
    el número de 'vueltas' que tiene que hacer el algoritmo de cifrado de contraseñas.

    Estos datos se pueden cambiar dependiendo del nombre de usuario y contraseña que se desee, 
    así como se pueden modificar los parámetros de la base de datos.
*/
exports.conf = {
    database: {
        name: 'volveraempezar',
        host: 'localhost',
        port: '27017'
    },

    session:{
        saltRounds: 10,
        username: "admin",
        password: "psicologo",
        collection: "admins",
        algorithm: 'aes-256-ctr',
        secret: 'volveraempezar'
    }
};