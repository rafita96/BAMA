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
        collection: "admins"
    }
};