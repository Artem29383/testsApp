const path = require('path');

const isDev = process.env.APP_ENV === 'development';

module.exports = [
  {
    enforce: 'pre',
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'eslint',
    options: { failOnError: false },
  },
  {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel',
    options: {
      cacheDirectory: false,
    },
  },
  {
    test: /\.(woff2?|ttf|eot|gif|png|svg|jpe?g|webp|webm|mp4|otf)$/,
    loader: 'file-loader',
    options: { name: '[name].[hash:8].[ext]' },
  },
];
