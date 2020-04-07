const path = require('path');

module.exports = () => {
  require('asset-require-hook')({
    extensions: ['gif', 'jpg', 'jpeg', 'png', 'webp', 'webm', 'mp4'],
    publicPath: '/',
    limit: 10240,
    name: '[name].[hash:8].[ext]',
  });

  require('asset-require-hook')({
    extensions: ['woff', 'woff2', 'ttf', 'eot', 'svg'],
    publicPath: '/',
    limit: 10240,
    name: '[name].[hash:8].[ext]',
  });
};
