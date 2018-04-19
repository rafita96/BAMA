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