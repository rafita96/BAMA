const compose = require('next-compose');
module.exports = compose([
  {
    webpack(config, options) {
      config.module.rules.push({
        test: /\.mp3$/,
        use: {
          loader: 'file-loader',
        },
      });

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2
              },
              jsx: false
            }
          }
        ]
      });

      return config;
    },
  
  },
]);