/*
    Archivo de configuración para el módulo webpack.
    esto permite compilar los archivos que esten escritos en ReactJS
*/
module.exports = {
    module: {
        rules:[
            {
                test: /\.jsx?$/, 
                use:{
                    loader: 'babel-loader',
                    options: { presets: ["env", "react"] }
                },
                exclude: /node_modules/
            }
        ]
    }
}

// Para compilar 
// webpack --mode production ./juegos/puntosVista/public/js/index.jsx --output ./juegos/puntosVista/public/js/bundle.js